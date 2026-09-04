import SwiftUI
import UIKit

/// Full-screen confirmation that the Trilium JS Backend handoff note exists before Safari SSO.
struct SSOSetupWarningView: View {
    let onContinue: (_ skipFutureWarnings: Bool) -> Void
    let onCancel: () -> Void

    @State private var hasAcknowledgedSetup = false
    @State private var skipFutureWarnings = false
    @State private var didCopySetup = false

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    header
                    requirementCallout
                    setupSteps
                    copyScriptButton
                }
                .padding()
                .padding(.bottom, 8)
            }
            .safeAreaInset(edge: .bottom, spacing: 0) {
                confirmationFooter
            }
            .navigationTitle(String(localized: "Sign in with SSO", comment: "SSO setup warning title"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(String(localized: "Cancel", comment: "SSO setup warning cancel"), action: onCancel)
                }
            }
        }
    }

    private var header: some View {
        VStack(spacing: 12) {
            Image(systemName: "exclamationmark.triangle.fill")
                .font(.system(size: 40))
                .foregroundStyle(.orange)
                .accessibilityHidden(true)
            Text(String(localized: "Set up Trilium first", comment: "SSO setup warning headline"))
                .font(.title2.bold())
                .multilineTextAlignment(.center)
            Text(String(localized: "SSO only works after you add a one-time JS Backend script on your Trilium server. Without it, Safari cannot hand your session back to Trinote.", comment: "SSO setup warning intro"))
                .font(.subheadline)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .padding(.top, 8)
    }

    private var requirementCallout: some View {
        HStack(alignment: .top, spacing: 10) {
            Image(systemName: "lock.shield")
                .foregroundStyle(.tint)
                .accessibilityHidden(true)
            Text(String(localized: "Do this in the Trilium web or desktop app before you continue. Identity-provider settings (Authelia, Authentik, Keycloak, and similar) do not replace this handler.", comment: "SSO setup warning callout"))
                .font(.footnote)
                .foregroundStyle(.secondary)
        }
        .padding(12)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(.orange.opacity(0.12), in: RoundedRectangle(cornerRadius: 12))
    }

    private var setupSteps: some View {
        VStack(alignment: .leading, spacing: 14) {
            Text(String(localized: "On your Trilium server", comment: "SSO setup warning steps heading"))
                .font(.headline)

            labeledStep(
                number: 1,
                text: String(localized: "Create a new note and set its type to JS Backend.", comment: "SSO setup step 1")
            )
            VStack(alignment: .leading, spacing: 6) {
                labeledStep(
                    number: 2,
                    text: String(localized: "Add this label to the note:", comment: "SSO setup step 2")
                )
                Text("#customRequestHandler=trinote-sso-handoff")
                    .font(.footnote.monospaced())
                    .textSelection(.enabled)
                    .padding(.leading, 36)
            }
            labeledStep(
                number: 3,
                text: String(localized: "Paste the handler script into that note and save.", comment: "SSO setup step 3")
            )
        }
    }

    private func labeledStep(number: Int, text: String) -> some View {
        HStack(alignment: .top, spacing: 12) {
            Text("\(number)")
                .font(.caption.weight(.bold))
                .foregroundStyle(.white)
                .frame(width: 24, height: 24)
                .background(.tint, in: Circle())
                .accessibilityHidden(true)
            Text(text)
                .font(.subheadline)
                .frame(maxWidth: .infinity, alignment: .leading)
        }
        .accessibilityElement(children: .combine)
    }

    private var copyScriptButton: some View {
        Button {
            UIPasteboard.general.string = TriliumSSOHandoff.handlerNoteSource
            didCopySetup = true
        } label: {
            Label(
                didCopySetup
                    ? String(localized: "Copied handler script", comment: "SSO setup copied")
                    : String(localized: "Copy handler script", comment: "SSO copy setup"),
                systemImage: didCopySetup ? "checkmark.circle.fill" : "doc.on.doc"
            )
            .frame(maxWidth: .infinity)
        }
        .buttonStyle(.bordered)
        .accessibilityHint(String(localized: "Copies the JS Backend script to paste into Trilium", comment: "VoiceOver"))
    }

    private var confirmationFooter: some View {
        VStack(alignment: .leading, spacing: 12) {
            Button {
                hasAcknowledgedSetup.toggle()
            } label: {
                Label(
                    String(localized: "I added the JS Backend handler on Trilium first", comment: "SSO setup acknowledgement"),
                    systemImage: hasAcknowledgedSetup ? "checkmark.circle.fill" : "circle"
                )
                .font(.subheadline.weight(.medium))
                .frame(maxWidth: .infinity, alignment: .leading)
                .contentShape(Rectangle())
            }
            .buttonStyle(.plain)
            .foregroundStyle(hasAcknowledgedSetup ? Color.accentColor : Color.primary)
            .accessibilityAddTraits(hasAcknowledgedSetup ? [.isSelected, .isButton] : .isButton)

            Toggle(
                String(localized: "Don't show this warning again", comment: "SSO setup skip future warnings"),
                isOn: $skipFutureWarnings
            )
            .font(.subheadline)

            Text(String(localized: "You can also turn this off later in Settings.", comment: "SSO setup warning settings hint"))
                .font(.caption)
                .foregroundStyle(.secondary)

            Button {
                onContinue(skipFutureWarnings)
            } label: {
                Text(String(localized: "Continue to Safari", comment: "SSO setup warning continue"))
                    .fontWeight(.semibold)
                    .frame(maxWidth: .infinity, minHeight: 44)
            }
            .buttonStyle(.borderedProminent)
            .controlSize(.large)
            .disabled(!hasAcknowledgedSetup)
            .accessibilityHint(
                hasAcknowledgedSetup
                    ? String(localized: "Opens Safari to continue SSO", comment: "VoiceOver")
                    : String(localized: "Confirm you added the Trilium handler before continuing", comment: "VoiceOver")
            )
        }
        .padding(.horizontal)
        .padding(.top, 12)
        .padding(.bottom, 8)
        .background(.bar)
    }
}

#Preview {
    SSOSetupWarningView(onContinue: { _ in }, onCancel: {})
}
