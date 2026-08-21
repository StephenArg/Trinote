import Photos
import SwiftUI
import UIKit

struct PhotoLibraryPickerView: View {
    let onComplete: ([PhotoLibraryImage]) -> Void
    let onCancel: () -> Void

    private static let maxSelectionCount = 20
    private static let gridSpacing: CGFloat = 2
    private static let columns = Array(
        repeating: GridItem(.flexible(), spacing: gridSpacing),
        count: 4
    )

    @Environment(\.scenePhase) private var scenePhase
    @State private var access: PhotoLibraryAccess = PhotoLibraryAuthorization.current()
    @State private var store = PhotoLibraryAssetStore()
    @State private var isSelecting = false
    // Assets, not identifiers: library-change reloads and album switches replace `store.assets`,
    // and re-looking-up by identifier there silently dropped part of the selection.
    @State private var selectedAssets: [PHAsset] = []
    @State private var isInserting = false
    @State private var showLimitedPicker = false
    @State private var showLoadFailure = false

    var body: some View {
        NavigationStack {
            Group {
                switch access {
                case .notDetermined:
                    ProgressView()
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                case .denied:
                    deniedView
                case .authorized, .limited:
                    libraryView
                }
            }
            .background {
                LimitedLibraryPickerHost(isPresented: $showLimitedPicker)
                    .accessibilityHidden(true)
            }
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(String(localized: "Cancel", comment: "Dismiss photo picker")) {
                        onCancel()
                    }
                    .disabled(isInserting)
                }
            }
            .navigationBarTitleDisplayMode(.inline)
        }
        .interactiveDismissDisabled()
        .task { await requestAccessIfNeeded() }
        .onChange(of: scenePhase) { _, phase in
            guard phase == .active else { return }
            let status = PhotoLibraryAuthorization.current()
            access = status
            if status == .authorized || status == .limited {
                store.reload()
            }
        }
        .onChange(of: showLimitedPicker) { _, presented in
            if !presented, access == .limited || access == .authorized {
                access = PhotoLibraryAuthorization.current()
                store.reload()
            }
        }
        .onDisappear { store.stop() }
        .alert(
            String(localized: "Couldn't Load Photos", comment: "Photo insert failure title"),
            isPresented: $showLoadFailure
        ) {
            Button(String(localized: "OK", comment: "Dismiss alert")) {}
        } message: {
            Text(
                String(
                    localized: "These photos couldn't be read from your library. They may still be downloading from iCloud.",
                    comment: "Photo insert failure message"
                )
            )
        }
    }

    private var libraryView: some View {
        VStack(spacing: 0) {
            header
            if access == .limited {
                limitedBanner
            }
            grid
            if isSelecting {
                insertBar
            }
        }
        .overlay {
            if isInserting {
                ZStack {
                    Color.black.opacity(0.25).ignoresSafeArea()
                    ProgressView()
                        .controlSize(.large)
                        .padding(20)
                        .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 12))
                }
            }
        }
    }

    private var header: some View {
        HStack(spacing: 12) {
            Menu {
                ForEach(store.albums) { album in
                    Button {
                        store.selectAlbum(album)
                    } label: {
                        if album.id == store.selectedAlbumID {
                            Label(album.title, systemImage: "checkmark")
                        } else {
                            Text(album.title)
                        }
                    }
                }
            } label: {
                HStack(spacing: 6) {
                    Text(store.selectedAlbumTitle)
                        .font(.title2.weight(.bold))
                        .foregroundStyle(.primary)
                    Image(systemName: "chevron.down")
                        .font(.caption.weight(.semibold))
                        .foregroundStyle(.secondary)
                }
            }
            .accessibilityLabel(store.selectedAlbumTitle)

            Spacer(minLength: 8)

            Button {
                isSelecting.toggle()
                if !isSelecting {
                    selectedAssets = []
                }
            } label: {
                HStack(spacing: 6) {
                    Image(systemName: isSelecting ? "xmark.circle" : "square.on.square")
                    Text(
                        isSelecting
                            ? String(localized: "Cancel", comment: "Exit photo multi-select")
                            : String(localized: "Select", comment: "Enter photo multi-select")
                    )
                }
                .font(.subheadline.weight(.semibold))
                .padding(.horizontal, 12)
                .padding(.vertical, 8)
                .background(Color(.secondarySystemFill), in: Capsule())
            }
            .buttonStyle(.plain)
            .disabled(isInserting)
            .accessibilityLabel(
                isSelecting
                    ? String(localized: "Cancel selection", comment: "Exit photo multi-select")
                    : String(localized: "Select", comment: "Enter photo multi-select")
            )
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 10)
    }

    private var limitedBanner: some View {
        HStack(alignment: .center, spacing: 12) {
            Text(
                String(
                    localized: "You've given Trinote access to a select number of photos.",
                    comment: "Limited photo library banner"
                )
            )
            .font(.subheadline)
            .foregroundStyle(.secondary)
            .frame(maxWidth: .infinity, alignment: .leading)

            Menu {
                Button {
                    showLimitedPicker = true
                } label: {
                    Label(
                        String(localized: "Select More Photos", comment: "Limited library: pick more"),
                        systemImage: "photo.on.rectangle.angled"
                    )
                }
                Button {
                    PhotoLibraryAuthorization.openSettings()
                } label: {
                    Label(
                        String(localized: "Allow Access to All Photos", comment: "Limited library: open Settings"),
                        systemImage: "gear"
                    )
                }
            } label: {
                Text(String(localized: "Manage", comment: "Limited photo library manage"))
                    .font(.subheadline.weight(.semibold))
            }
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 10)
    }

    private var grid: some View {
        ScrollView {
            if store.assets.isEmpty, !store.isLoading {
                ContentUnavailableView(
                    String(localized: "No Photos", comment: "Empty photo album"),
                    systemImage: "photo",
                    description: Text(String(localized: "This album has no photos.", comment: "Empty photo album detail"))
                )
                .frame(maxWidth: .infinity)
                .padding(.top, 80)
            } else {
                LazyVGrid(columns: Self.columns, spacing: Self.gridSpacing) {
                    ForEach(store.assets, id: \.localIdentifier) { asset in
                        PhotoAssetCell(
                            asset: asset,
                            store: store,
                            isSelecting: isSelecting,
                            selectionIndex: selectionIndex(for: asset.localIdentifier)
                        )
                        .aspectRatio(1, contentMode: .fill)
                        .clipped()
                        .contentShape(Rectangle())
                        .onTapGesture { handleTap(asset) }
                        .accessibilityLabel(String(localized: "Photo", comment: "Photo grid cell"))
                        .accessibilityAddTraits(.isButton)
                    }
                }
            }
        }
        .background(Color(.systemBackground))
    }

    private var insertBar: some View {
        let count = selectedAssets.count
        return Button {
            Task { await insertSelected() }
        } label: {
            Text(
                count == 0
                    ? String(localized: "Insert", comment: "Insert selected photos")
                    : String(localized: "Insert (\(count))", comment: "Insert n selected photos")
            )
            .font(.body.weight(.semibold))
            .frame(maxWidth: .infinity)
            .padding(.vertical, 14)
        }
        .buttonStyle(.borderedProminent)
        .disabled(count == 0 || isInserting)
        .padding(.horizontal, 16)
        .padding(.vertical, 10)
        .background(.bar)
    }

    private var deniedView: some View {
        VStack(spacing: 16) {
            ContentUnavailableView(
                String(localized: "Photo Access Needed", comment: "Photo permission denied title"),
                systemImage: "photo.on.rectangle.angled",
                description: Text(
                    String(
                        localized: "Allow photo access in Settings to insert pictures into notes.",
                        comment: "Photo permission denied message"
                    )
                )
            )
            Button(String(localized: "Open Settings", comment: "Open Settings for photo access")) {
                PhotoLibraryAuthorization.openSettings()
            }
            .buttonStyle(.bordered)
        }
        .padding()
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }

    private func selectionIndex(for id: String) -> Int? {
        guard isSelecting,
              let idx = selectedAssets.firstIndex(where: { $0.localIdentifier == id })
        else { return nil }
        return idx + 1
    }

    private func handleTap(_ asset: PHAsset) {
        guard !isInserting else { return }
        if isSelecting {
            toggleSelection(asset)
        } else {
            Task { await insertAssets([asset]) }
        }
    }

    private func toggleSelection(_ asset: PHAsset) {
        if let idx = selectedAssets.firstIndex(where: { $0.localIdentifier == asset.localIdentifier }) {
            selectedAssets.remove(at: idx)
            return
        }
        guard selectedAssets.count < Self.maxSelectionCount else { return }
        selectedAssets.append(asset)
    }

    private func insertSelected() async {
        await insertAssets(selectedAssets)
    }

    private func insertAssets(_ assets: [PHAsset]) async {
        guard !assets.isEmpty else { return }
        isInserting = true
        defer { isInserting = false }
        var images: [PhotoLibraryImage] = []
        images.reserveCapacity(min(assets.count, Self.maxSelectionCount))
        for asset in assets.prefix(Self.maxSelectionCount) {
            if let image = await store.loadImage(for: asset) {
                images.append(image)
            }
        }
        guard !images.isEmpty else {
            showLoadFailure = true
            return
        }
        onComplete(images)
    }

    private func requestAccessIfNeeded() async {
        var status = PhotoLibraryAuthorization.current()
        if status == .notDetermined {
            status = await PhotoLibraryAuthorization.request()
        }
        access = status
        if status == .authorized || status == .limited {
            store.start()
        }
    }
}

private struct PhotoAssetCell: View {
    let asset: PHAsset
    let store: PhotoLibraryAssetStore
    let isSelecting: Bool
    let selectionIndex: Int?

    @State private var image: UIImage?
    @State private var requestID: PHImageRequestID?

    var body: some View {
        GeometryReader { geo in
            ZStack(alignment: .topTrailing) {
                Group {
                    if let image {
                        Image(uiImage: image)
                            .resizable()
                            .scaledToFill()
                    } else {
                        Color(.secondarySystemFill)
                    }
                }
                .frame(width: geo.size.width, height: geo.size.height)
                .clipped()

                if isSelecting {
                    selectionBadge
                        .padding(6)
                }
            }
            .onAppear {
                requestThumbnail(size: geo.size)
            }
            .onDisappear {
                if let requestID {
                    store.cancelThumbnailRequest(requestID)
                    self.requestID = nil
                }
            }
            .onChange(of: geo.size) { _, newSize in
                requestThumbnail(size: newSize)
            }
        }
    }

    @ViewBuilder
    private var selectionBadge: some View {
        if let selectionIndex {
            Text("\(selectionIndex)")
                .font(.caption2.weight(.bold))
                .foregroundStyle(.white)
                .frame(width: 22, height: 22)
                .background(Color.accentColor, in: Circle())
        } else {
            Circle()
                .strokeBorder(.white, lineWidth: 1.5)
                .background(Circle().fill(Color.black.opacity(0.18)))
                .frame(width: 22, height: 22)
        }
    }

    private func requestThumbnail(size: CGSize) {
        guard size.width > 0, size.height > 0 else { return }
        if let requestID {
            store.cancelThumbnailRequest(requestID)
        }
        let scale = UIScreen.main.scale
        let pixelSize = CGSize(width: size.width * scale, height: size.height * scale)
        requestID = store.requestThumbnail(for: asset, size: pixelSize) { uiImage in
            if let uiImage {
                image = uiImage
            }
        }
    }
}
