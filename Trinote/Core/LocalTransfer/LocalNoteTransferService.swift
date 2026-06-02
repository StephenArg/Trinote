import Foundation
import MultipeerConnectivity
import Observation
import UIKit

enum LocalNoteTransferPhase: Equatable, Sendable {
    case idle
    case browsing
    case connecting
    case awaitingOfferResponse
    case sendingPayload
    case awaitingTransferAck
    case receivingPayload
    case completed
    case failed(String)
}

@Observable
@MainActor
final class LocalNoteTransferService: NSObject {
    private(set) var receiveModeEnabled = false
    private(set) var isBrowsing = false
    private(set) var discoveredPeers: [LocalTransferPeer] = []
    private(set) var selectedPeer: LocalTransferPeer?
    private(set) var connectedPeerName: String?
    private(set) var incomingOffer: LocalNoteOffer?
    private(set) var phase: LocalNoteTransferPhase = .idle
    private(set) var statusMessage: String?
    private(set) var lastImportedNoteId: String?
    private(set) var successNotification: String?
    private(set) var showParentPicker = false

    @ObservationIgnored private var successNotificationTask: Task<Void, Never>?
    @ObservationIgnored private var senderAckTimeoutTask: Task<Void, Never>?

    private var session: MCSession?
    @ObservationIgnored nonisolated(unsafe) private var invitationSession: MCSession?
    private var advertiser: MCNearbyServiceAdvertiser?
    private var browser: MCNearbyServiceBrowser?
    private var myPeerID: MCPeerID?
    private var pendingOfferId: UUID?
    private var pendingBundle: NoteTransferBundle?
    private var pendingOutgoingTransferId: UUID?
    private var pendingIncomingTransferId: UUID?
    private var pendingImportParentNoteId: String?
    private var stagedOfferForAcceptance: LocalNoteOffer?
    private var queuedIncomingOffer: LocalNoteOffer?
    private var serverInfoProvider: (() -> LocalTransferServerInfo?)?
    private weak var appStateRef: AppState?

    private var displayName: String { UIDevice.current.name }

    private var trinoteAppVersion: String {
        Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? "0"
    }

    func configure(appState: AppState) {
        appStateRef = appState
        serverInfoProvider = { [weak appState] in
            guard let info = appState?.serverAppInfo else { return nil }
            return LocalTransferServerInfo(from: info)
        }
    }

    func setReceiveMode(_ enabled: Bool) {
        receiveModeEnabled = enabled
        if enabled {
            startAdvertising()
        } else {
            stopAdvertising()
            incomingOffer = nil
        }
    }

    func startBrowsing() {
        guard !isBrowsing else { return }
        ensureSession()
        discoveredPeers = []
        selectedPeer = nil
        if case .failed = phase {
            phase = .idle
        } else if phase != .awaitingTransferAck && phase != .sendingPayload && phase != .receivingPayload {
            phase = .browsing
        }
        statusMessage = nil

        let browser = MCNearbyServiceBrowser(peer: myPeerID!, serviceType: LocalNoteTransferConstants.serviceType)
        browser.delegate = self
        browser.startBrowsingForPeers()
        self.browser = browser
        isBrowsing = true
    }

    func stopBrowsing() {
        browser?.stopBrowsingForPeers()
        browser = nil
        isBrowsing = false
        if phase == .browsing || phase == .connecting {
            phase = .idle
        }
    }

    func selectPeer(_ peer: LocalTransferPeer) {
        selectedPeer = peer
    }

    func connectToSelectedPeer() async {
        guard let peer = selectedPeer,
              let session,
              let browser
        else { return }

        phase = .connecting
        statusMessage = String(localized: "Connecting…", comment: "Local transfer status")

        if let mcPeer = session.connectedPeers.first(where: { $0.displayName == peer.displayName }) {
            connectedPeerName = mcPeer.displayName
            await sendPeerHello(to: mcPeer)
            return
        }

        guard let found = browserFoundPeer(named: peer.displayName) else {
            failTransfer(String(localized: "Peer not found.", comment: "Local transfer"), recoverSession: false)
            return
        }
        browser.invitePeer(found, to: session, withContext: nil, timeout: 30)
    }

    /// Waits until the named peer is connected in the current session, inviting if needed.
    func ensureConnected(to peerName: String, timeout: TimeInterval = 20) async -> Bool {
        if session?.connectedPeers.contains(where: { $0.displayName == peerName }) == true {
            connectedPeerName = peerName
            return true
        }

        if selectedPeer?.displayName == peerName || connectedPeerName == nil {
            await connectToSelectedPeer()
        }

        let deadline = Date().addingTimeInterval(timeout)
        while Date() < deadline {
            if session?.connectedPeers.contains(where: { $0.displayName == peerName }) == true {
                connectedPeerName = peerName
                if let peer = resolvedPeer(named: peerName, in: session!) {
                    await sendPeerHello(to: peer)
                }
                return true
            }
            try? await Task.sleep(nanoseconds: 200_000_000)
        }

        let connected = session?.connectedPeers.contains(where: { $0.displayName == peerName }) == true
        if connected {
            connectedPeerName = peerName
        }
        return connected
    }

    func sendOffer(for note: NoteItem, bundle: NoteTransferBundle) async {
        guard let session else {
            failTransfer(String(localized: "Not connected to a peer.", comment: "Local transfer"), recoverSession: true)
            return
        }

        let peerName = connectedPeerName ?? selectedPeer?.displayName
        guard let peerName else {
            failTransfer(String(localized: "Not connected to a peer.", comment: "Local transfer"), recoverSession: true)
            return
        }

        guard await ensureConnected(to: peerName) else {
            failTransfer(String(localized: "Could not connect to the receiver.", comment: "Local transfer connect timeout"), recoverSession: true)
            return
        }

        clearActiveTransferState()
        pendingBundle = bundle
        let offerId = UUID()
        pendingOfferId = offerId
        phase = .awaitingOfferResponse

        let wire = LocalTransferWireMessage.noteOffer(
            LocalTransferNoteOffer(
                offerId: offerId,
                title: note.title,
                noteType: note.type.rawValue,
                mime: note.mime,
                contentByteCount: bundle.totalByteCount
            )
        )

        for attempt in 1...3 {
            guard let activePeer = resolvedPeer(named: peerName, in: session) else { break }
            if await send(wire: wire, to: activePeer) { return }
            if attempt < 3 {
                try? await Task.sleep(nanoseconds: 500_000_000)
                _ = await ensureConnected(to: peerName, timeout: 5)
            }
        }

        failTransfer(String(localized: "Could not deliver the offer to the receiver.", comment: "Local transfer offer failed"), recoverSession: true)
    }

    func acceptIncomingOffer(parentNoteId: String) async {
        showParentPicker = false
        guard let offer = stagedOfferForAcceptance ?? incomingOffer,
              let session,
              let peer = resolvedPeer(named: offer.senderDisplayName, in: session)
        else {
            failTransfer(String(localized: "Lost connection to sender.", comment: "Local transfer accept failed"), recoverSession: true)
            return
        }

        storePendingImportParent(parentNoteId)
        let response = LocalTransferWireMessage.offerResponse(
            LocalTransferOfferResponse(offerId: offer.id, accepted: true, parentNoteId: parentNoteId)
        )
        await send(wire: response, to: peer)
        stagedOfferForAcceptance = nil
        incomingOffer = nil
        phase = .receivingPayload
        statusMessage = String(localized: "Receiving note…", comment: "Local transfer status")
    }

    func declineIncomingOffer() async {
        showParentPicker = false
        let offer = stagedOfferForAcceptance ?? incomingOffer
        stagedOfferForAcceptance = nil
        pendingImportParentNoteId = nil
        incomingOffer = nil

        guard let offer,
              let session,
              let peer = resolvedPeer(named: offer.senderDisplayName, in: session)
        else {
            clearActiveTransferState()
            phase = .idle
            return
        }

        let response = LocalTransferWireMessage.offerResponse(
            LocalTransferOfferResponse(offerId: offer.id, accepted: false, parentNoteId: nil)
        )
        await send(wire: response, to: peer)
        clearActiveTransferState()
        phase = .idle
        drainQueuedIncomingOfferIfNeeded()
    }

    func beginAcceptanceFlow() {
        stagedOfferForAcceptance = incomingOffer
        incomingOffer = nil
        showParentPicker = true
    }

    func parentPickerWasDismissedWithoutSelection() async {
        guard showParentPicker else { return }
        showParentPicker = false
        if stagedOfferForAcceptance != nil {
            await declineIncomingOffer()
        }
    }

    func parentPickerDidSelect(_ parentNoteId: String) async {
        showParentPicker = false
        await acceptIncomingOffer(parentNoteId: parentNoteId)
    }

    func cancelStagedIncomingOffer() {
        stagedOfferForAcceptance = nil
        pendingImportParentNoteId = nil
        showParentPicker = false
    }

    func storePendingImportParent(_ parentNoteId: String) {
        pendingImportParentNoteId = parentNoteId
    }

    func onBackground() {
        setReceiveMode(false)
        stopBrowsing()
        disconnectSession()
    }

    func disconnectSession() {
        showParentPicker = false
        senderAckTimeoutTask?.cancel()
        session?.disconnect()
        session = nil
        invitationSession = nil
        connectedPeerName = nil
        selectedPeer = nil
        clearActiveTransferState()
        phase = .idle
    }

    func showSuccessNotification(_ message: String) {
        successNotification = message
        successNotificationTask?.cancel()
        successNotificationTask = Task { @MainActor in
            try? await Task.sleep(nanoseconds: 4_000_000_000)
            guard !Task.isCancelled else { return }
            successNotification = nil
        }
    }

    // MARK: - Private

    private var foundPeers: [MCPeerID: [String: String]?] = [:]

    private func browserFoundPeer(named name: String) -> MCPeerID? {
        foundPeers.keys.first { $0.displayName == name }
    }

    private func resolvedPeer(named name: String, in session: MCSession) -> MCPeerID? {
        session.connectedPeers.first { $0.displayName == name } ?? session.connectedPeers.first
    }

    private var isActivelyTransferringPayload: Bool {
        phase == .receivingPayload || phase == .sendingPayload || phase == .awaitingTransferAck
    }

    private func prepareForIncomingOffer() {
        stagedOfferForAcceptance = nil
        showParentPicker = false
        pendingIncomingTransferId = nil
        if case .completed = phase { phase = .idle }
        if case .failed = phase { phase = .idle }
    }

    private func presentIncomingOffer(_ wire: LocalTransferNoteOffer, from peer: MCPeerID) {
        let offer = LocalNoteOffer(
            id: wire.offerId,
            title: wire.title,
            noteType: wire.noteType,
            mime: wire.mime,
            contentByteCount: wire.contentByteCount,
            senderDisplayName: peer.displayName
        )

        if isActivelyTransferringPayload {
            queuedIncomingOffer = offer
            Log.api.info("Local transfer queued incoming offer while payload transfer is active")
            return
        }

        prepareForIncomingOffer()
        incomingOffer = offer
        Log.api.info("Local transfer presenting incoming offer: \(wire.title)")
    }

    private func drainQueuedIncomingOfferIfNeeded() {
        guard !isActivelyTransferringPayload, incomingOffer == nil, stagedOfferForAcceptance == nil else { return }
        guard let queued = queuedIncomingOffer else { return }
        queuedIncomingOffer = nil
        incomingOffer = queued
    }

    private func ensureSession() {
        if session != nil, myPeerID != nil { return }
        let peerID = MCPeerID(displayName: displayName)
        myPeerID = peerID
        let session = MCSession(peer: peerID, securityIdentity: nil, encryptionPreference: .required)
        session.delegate = self
        self.session = session
        invitationSession = session
    }

    private func recreateSessionForRecovery() {
        let shouldAdvertise = receiveModeEnabled
        let shouldBrowse = isBrowsing
        session?.disconnect()
        session = nil
        invitationSession = nil
        myPeerID = nil
        ensureSession()
        if shouldAdvertise { startAdvertising() }
        if shouldBrowse {
            browser?.stopBrowsingForPeers()
            browser = nil
            isBrowsing = false
            startBrowsing()
        }
    }

    private func clearActiveTransferState() {
        senderAckTimeoutTask?.cancel()
        pendingOfferId = nil
        pendingBundle = nil
        pendingOutgoingTransferId = nil
        pendingIncomingTransferId = nil
        stagedOfferForAcceptance = nil
        pendingImportParentNoteId = nil
        queuedIncomingOffer = nil
    }

    private func failTransfer(_ message: String, recoverSession: Bool) {
        Log.api.error("Local transfer failed: \(message)")
        phase = .failed(message)
        clearActiveTransferState()
        if recoverSession {
            recreateSessionForRecovery()
        }
    }

    private func startAdvertising() {
        ensureSession()
        stopAdvertising()

        var discoveryInfo: [String: String] = [
            LocalNoteTransferConstants.discoveryReceiveModeKey: "1",
        ]
        if let info = serverInfoProvider?() {
            discoveryInfo[LocalNoteTransferConstants.discoveryAppVersionKey] = info.appVersion
        }

        let advertiser = MCNearbyServiceAdvertiser(
            peer: myPeerID!,
            discoveryInfo: discoveryInfo,
            serviceType: LocalNoteTransferConstants.serviceType
        )
        advertiser.delegate = self
        advertiser.startAdvertisingPeer()
        self.advertiser = advertiser
    }

    private func stopAdvertising() {
        advertiser?.stopAdvertisingPeer()
        advertiser = nil
    }

    private func sendPeerHello(to peer: MCPeerID) async {
        let serverInfo = serverInfoProvider?() ?? LocalTransferServerInfo(
            from: AppInfoResponse(
                appVersion: "unknown",
                dbVersion: nil,
                syncVersion: nil,
                buildDate: nil,
                buildRevision: nil,
                dataDirectory: nil,
                clipperProtocolVersion: nil,
                utcDateTime: nil
            )
        )
        let hello = LocalTransferWireMessage.peerHello(
            LocalTransferPeerHello(
                protocolVersion: LocalNoteTransferConstants.transferProtocolVersion,
                trinoteAppVersion: trinoteAppVersion,
                serverInfo: serverInfo
            )
        )
        await send(wire: hello, to: peer)
    }

    @discardableResult
    private func send(wire message: LocalTransferWireMessage, to peer: MCPeerID) async -> Bool {
        guard let session else { return false }
        do {
            let data = try LocalNoteTransferCodec.encode(message)
            try session.send(data, toPeers: [peer], with: .reliable)
            return true
        } catch {
            failTransfer(error.localizedDescription, recoverSession: true)
            return false
        }
    }

    private func sendBundle(_ bundle: NoteTransferBundle, to peer: MCPeerID) async {
        phase = .sendingPayload
        let transferId = UUID()
        pendingOutgoingTransferId = transferId

        do {
            let payload = try LocalNoteTransferCodec.encodeBundle(bundle)
            let tempURL = FileManager.default.temporaryDirectory
                .appendingPathComponent("trinote-xfer-\(transferId.uuidString).json")

            try payload.write(to: tempURL, options: .atomic)

            guard await send(
                wire: .payloadBegin(
                    LocalTransferPayloadBegin(
                        transferId: transferId,
                        byteCount: payload.count,
                        title: bundle.title
                    )
                ),
                to: peer
            ) else {
                try? FileManager.default.removeItem(at: tempURL)
                return
            }

            let sendError: Error? = await withCheckedContinuation { continuation in
                session?.sendResource(
                    at: tempURL,
                    withName: LocalNoteTransferConstants.resourceName(for: transferId),
                    toPeer: peer
                ) { error in
                    continuation.resume(returning: error)
                }
            }
            try? FileManager.default.removeItem(at: tempURL)

            if let sendError {
                failTransfer(sendError.localizedDescription, recoverSession: true)
                return
            }

            guard await send(
                wire: .payloadComplete(LocalTransferPayloadComplete(transferId: transferId)),
                to: peer
            ) else { return }

            phase = .awaitingTransferAck
            statusMessage = String(localized: "Waiting for receiver…", comment: "Local transfer awaiting ack")
            startSenderAckTimeout(for: transferId, peer: peer)
        } catch {
            failTransfer(error.localizedDescription, recoverSession: true)
        }
    }

    private func startSenderAckTimeout(for transferId: UUID, peer: MCPeerID) {
        senderAckTimeoutTask?.cancel()
        senderAckTimeoutTask = Task { @MainActor in
            let seconds = LocalNoteTransferConstants.senderAckTimeoutSeconds
            try? await Task.sleep(nanoseconds: UInt64(seconds * 1_000_000_000))
            guard !Task.isCancelled else { return }
            guard pendingOutgoingTransferId == transferId, phase == .awaitingTransferAck else { return }
            await send(
                wire: .error(String(localized: "Transfer timed out waiting for receiver.", comment: "Local transfer timeout")),
                to: peer
            )
            failTransfer(
                String(localized: "The receiver did not confirm the transfer.", comment: "Local transfer ack timeout"),
                recoverSession: true
            )
        }
    }

    private func handleOfferResponse(_ response: LocalTransferOfferResponse) {
        guard response.offerId == pendingOfferId else { return }
        guard response.accepted else {
            failTransfer(String(localized: "The receiver declined the note.", comment: "Local transfer declined"), recoverSession: false)
            pendingBundle = nil
            return
        }
        guard let bundle = pendingBundle,
              let session,
              let peerName = connectedPeerName ?? selectedPeer?.displayName,
              let peer = resolvedPeer(named: peerName, in: session)
        else {
            failTransfer(String(localized: "Lost connection to receiver.", comment: "Local transfer send failed"), recoverSession: true)
            return
        }
        Task { await sendBundle(bundle, to: peer) }
    }

    private func handlePayloadBegin(_ begin: LocalTransferPayloadBegin) {
        pendingIncomingTransferId = begin.transferId
        if phase != .receivingPayload {
            phase = .receivingPayload
        }
        statusMessage = String(localized: "Receiving note…", comment: "Local transfer status")
    }

    private func importReceivedBundle(_ bundle: NoteTransferBundle, transferId: UUID, from peer: MCPeerID) async {
        do {
            guard let appState = appStateRef,
                  let profileId = appState.activeProfile?.id
            else {
                throw LocalNoteTransferImporter.ImportError.noActiveProfile
            }
            let noteId = try LocalNoteTransferImporter.importBundle(
                bundle,
                parentNoteId: pendingImportParentNoteId ?? TriliumTreeConstants.rootNoteId,
                persistence: PersistenceManager.shared,
                serverProfileId: profileId
            )
            lastImportedNoteId = noteId
            appState.backgroundSyncPendingChanges()
            NotificationCenter.default.post(name: .trinoteTreeShouldRefresh, object: nil)

            pendingImportParentNoteId = nil
            pendingIncomingTransferId = nil
            phase = .completed

            await send(
                wire: .transferAck(
                    LocalTransferTransferAck(
                        transferId: transferId,
                        success: true,
                        errorMessage: nil,
                        noteTitle: bundle.title
                    )
                ),
                to: peer
            )

            showSuccessNotification(
                String(
                    format: String(
                        localized: "“%1$@” received successfully.",
                        comment: "Local transfer receiver success. %1$@ note title."
                    ),
                    bundle.title
                )
            )
            queuedIncomingOffer = nil
            setReceiveMode(false)
        } catch {
            let message = error.localizedDescription
            pendingImportParentNoteId = nil
            pendingIncomingTransferId = nil
            await send(
                wire: .transferAck(
                    LocalTransferTransferAck(
                        transferId: transferId,
                        success: false,
                        errorMessage: message,
                        noteTitle: bundle.title
                    )
                ),
                to: peer
            )
            failTransfer(message, recoverSession: true)
        }
    }

    private func handleTransferAck(_ ack: LocalTransferTransferAck) {
        guard ack.transferId == pendingOutgoingTransferId else { return }
        senderAckTimeoutTask?.cancel()
        pendingOutgoingTransferId = nil
        pendingBundle = nil
        pendingOfferId = nil

        if ack.success {
            phase = .completed
            let title = ack.noteTitle ?? String(localized: "Note", comment: "Generic note title")
            showSuccessNotification(
                String(
                    format: String(
                        localized: "“%1$@” sent successfully.",
                        comment: "Local transfer sender success. %1$@ note title."
                    ),
                    title
                )
            )
        } else {
            failTransfer(
                ack.errorMessage ?? String(localized: "The receiver could not import the note.", comment: "Local transfer import failed on receiver"),
                recoverSession: true
            )
        }
    }

    private func handleReceived(_ data: Data, from peer: MCPeerID) {
        guard data.first == UInt8(ascii: "{") else {
            Log.api.warning("Local transfer ignored non-JSON control data (\(data.count) bytes)")
            return
        }
        do {
            let message = try LocalNoteTransferCodec.decode(data)
            switch message.kind {
            case .peerHello:
                if let hello = message.peerHello {
                    updatePeerServerInfo(name: peer.displayName, info: hello.serverInfo)
                    connectedPeerName = peer.displayName
                    if phase == .connecting {
                        phase = .browsing
                        statusMessage = nil
                    }
                }
            case .noteOffer:
                if let offer = message.noteOffer {
                    presentIncomingOffer(offer, from: peer)
                }
            case .offerResponse:
                if let response = message.offerResponse {
                    handleOfferResponse(response)
                }
            case .payloadBegin:
                if let begin = message.payloadBegin {
                    handlePayloadBegin(begin)
                }
            case .payloadComplete:
                break
            case .transferAck:
                if let ack = message.transferAck {
                    handleTransferAck(ack)
                }
            case .error:
                if let err = message.error {
                    failTransfer(err.message, recoverSession: true)
                }
            }
        } catch {
            Log.api.error("Local transfer decode failed: \(error)")
            if phase == .sendingPayload || phase == .awaitingTransferAck || phase == .receivingPayload {
                failTransfer(
                    String(localized: "Transfer failed due to a communication error.", comment: "Local transfer decode error"),
                    recoverSession: true
                )
            }
        }
    }

    private func updatePeerServerInfo(name: String, info: LocalTransferServerInfo) {
        if let idx = discoveredPeers.firstIndex(where: { $0.displayName == name }) {
            discoveredPeers[idx].serverInfo = info
        } else {
            discoveredPeers.append(LocalTransferPeer(displayName: name, serverInfo: info))
        }
    }

    private func upsertDiscoveredPeer(name: String, discoveryInfo: [String: String]?) {
        guard discoveryInfo?[LocalNoteTransferConstants.discoveryReceiveModeKey] == "1" else { return }
        if !discoveredPeers.contains(where: { $0.displayName == name }) {
            var info: LocalTransferServerInfo?
            if let av = discoveryInfo?[LocalNoteTransferConstants.discoveryAppVersionKey] {
                info = LocalTransferServerInfo(
                    from: AppInfoResponse(
                        appVersion: av,
                        dbVersion: nil,
                        syncVersion: nil,
                        buildDate: nil,
                        buildRevision: nil,
                        dataDirectory: nil,
                        clipperProtocolVersion: nil,
                        utcDateTime: nil
                    )
                )
            }
            discoveredPeers.append(LocalTransferPeer(displayName: name, serverInfo: info))
        }
    }
}

// MARK: - MCSessionDelegate

extension LocalNoteTransferService: MCSessionDelegate {
    nonisolated func session(_ session: MCSession, peer peerID: MCPeerID, didChange state: MCSessionState) {
        Task { @MainActor in
            switch state {
            case .connected:
                connectedPeerName = peerID.displayName
                await sendPeerHello(to: peerID)
            case .notConnected:
                if connectedPeerName == peerID.displayName {
                    connectedPeerName = nil
                }
                if phase == .sendingPayload || phase == .awaitingTransferAck || phase == .receivingPayload {
                    failTransfer(
                        String(localized: "Connection to the other device was lost.", comment: "Local transfer disconnected"),
                        recoverSession: true
                    )
                }
            case .connecting:
                break
            @unknown default:
                break
            }
        }
    }

    nonisolated func session(_ session: MCSession, didReceive data: Data, fromPeer peerID: MCPeerID) {
        Task { @MainActor in
            handleReceived(data, from: peerID)
        }
    }

    nonisolated func session(_ session: MCSession, didReceive stream: InputStream, withName streamName: String, fromPeer peerID: MCPeerID) {}

    nonisolated func session(_ session: MCSession, didStartReceivingResourceWithName resourceName: String, fromPeer peerID: MCPeerID, with progress: Progress) {
        Task { @MainActor in
            guard let transferId = LocalNoteTransferConstants.transferId(fromResourceName: resourceName) else { return }
            pendingIncomingTransferId = transferId
            phase = .receivingPayload
        }
    }

    nonisolated func session(
        _ session: MCSession,
        didFinishReceivingResourceWithName resourceName: String,
        fromPeer peerID: MCPeerID,
        at localURL: URL?,
        withError error: Error?
    ) {
        Task { @MainActor in
            guard let transferId = LocalNoteTransferConstants.transferId(fromResourceName: resourceName) else { return }

            if let error {
                await send(
                    wire: .transferAck(
                        LocalTransferTransferAck(
                            transferId: transferId,
                            success: false,
                            errorMessage: error.localizedDescription,
                            noteTitle: nil
                        )
                    ),
                    to: peerID
                )
                failTransfer(error.localizedDescription, recoverSession: true)
                return
            }

            guard let localURL else {
                let message = String(localized: "Received an empty note payload.", comment: "Local transfer empty resource")
                await send(
                    wire: .transferAck(
                        LocalTransferTransferAck(
                            transferId: transferId,
                            success: false,
                            errorMessage: message,
                            noteTitle: nil
                        )
                    ),
                    to: peerID
                )
                failTransfer(message, recoverSession: true)
                return
            }

            defer { try? FileManager.default.removeItem(at: localURL) }

            do {
                let data = try Data(contentsOf: localURL)
                let bundle = try LocalNoteTransferCodec.decodeBundle(data)
                await importReceivedBundle(bundle, transferId: transferId, from: peerID)
            } catch {
                await send(
                    wire: .transferAck(
                        LocalTransferTransferAck(
                            transferId: transferId,
                            success: false,
                            errorMessage: error.localizedDescription,
                            noteTitle: nil
                        )
                    ),
                    to: peerID
                )
                failTransfer(error.localizedDescription, recoverSession: true)
            }
        }
    }
}

// MARK: - MCNearbyServiceAdvertiserDelegate

extension LocalNoteTransferService: MCNearbyServiceAdvertiserDelegate {
    nonisolated func advertiser(
        _ advertiser: MCNearbyServiceAdvertiser,
        didReceiveInvitationFromPeer peerID: MCPeerID,
        withContext context: Data?,
        invitationHandler: @escaping (Bool, MCSession?) -> Void
    ) {
        if let invitationSession {
            invitationHandler(true, invitationSession)
        } else {
            Task { @MainActor in
                ensureSession()
                invitationHandler(true, invitationSession)
            }
        }
    }

    nonisolated func advertiser(_ advertiser: MCNearbyServiceAdvertiser, didNotStartAdvertisingPeer error: any Error) {
        Task { @MainActor in
            receiveModeEnabled = false
            statusMessage = error.localizedDescription
            Log.api.error("Local transfer advertise failed: \(error)")
        }
    }
}

// MARK: - MCNearbyServiceBrowserDelegate

extension LocalNoteTransferService: MCNearbyServiceBrowserDelegate {
    nonisolated func browser(_ browser: MCNearbyServiceBrowser, foundPeer peerID: MCPeerID, withDiscoveryInfo info: [String: String]?) {
        Task { @MainActor in
            foundPeers[peerID] = info
            upsertDiscoveredPeer(name: peerID.displayName, discoveryInfo: info)
        }
    }

    nonisolated func browser(_ browser: MCNearbyServiceBrowser, lostPeer peerID: MCPeerID) {
        Task { @MainActor in
            foundPeers.removeValue(forKey: peerID)
            discoveredPeers.removeAll { $0.displayName == peerID.displayName }
            if selectedPeer?.displayName == peerID.displayName {
                selectedPeer = nil
            }
        }
    }

    nonisolated func browser(_ browser: MCNearbyServiceBrowser, didNotStartBrowsingForPeers error: any Error) {
        Task { @MainActor in
            isBrowsing = false
            failTransfer(error.localizedDescription, recoverSession: true)
        }
    }
}
