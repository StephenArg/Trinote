import SwiftUI

/// Narrow icon strip down the left edge of the iPad layout, like Trilium desktop's launcher bar.
/// Picks what the sidebar shows; tapping the current section again hides or shows the sidebar.
struct LauncherRail: View {
    let selection: LauncherSection
    let isSidebarVisible: Bool
    let onSelect: (LauncherSection) -> Void
    let onToggleSidebar: () -> Void
    let onSettings: () -> Void

    static let width: CGFloat = 56

    var body: some View {
        VStack(spacing: 6) {
            railButton(
                systemImage: "sidebar.left",
                label: isSidebarVisible
                    ? String(localized: "Hide Sidebar", comment: "iPad launcher rail: hide the tree sidebar")
                    : String(localized: "Show Sidebar", comment: "iPad launcher rail: show the tree sidebar"),
                isSelected: false,
                action: onToggleSidebar
            )
            .padding(.bottom, 6)

            ForEach(LauncherSection.allCases) { section in
                railButton(
                    systemImage: section.icon,
                    label: section.title,
                    isSelected: isSidebarVisible && section == selection,
                    action: { onSelect(section) }
                )
            }

            Spacer(minLength: 0)

            railButton(
                systemImage: "gearshape.fill",
                label: String(localized: "Settings", comment: "Main tab"),
                isSelected: false,
                action: onSettings
            )
        }
        .padding(.vertical, 10)
        .frame(width: Self.width)
        .frame(maxHeight: .infinity)
        .background(Color(.secondarySystemBackground).ignoresSafeArea())
    }

    private func railButton(
        systemImage: String,
        label: String,
        isSelected: Bool,
        action: @escaping () -> Void
    ) -> some View {
        Button(action: action) {
            Image(systemName: systemImage)
                .font(.system(size: 19, weight: .medium))
                .frame(width: 42, height: 42)
                .foregroundStyle(isSelected ? Color.accentColor : Color.secondary)
                .background {
                    RoundedRectangle(cornerRadius: 10, style: .continuous)
                        .fill(isSelected ? Color.accentColor.opacity(0.15) : Color.clear)
                }
                .contentShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
        }
        .buttonStyle(.plain)
        .hoverEffect(.highlight)
        .accessibilityLabel(label)
        .accessibilityAddTraits(isSelected ? .isSelected : [])
    }
}
