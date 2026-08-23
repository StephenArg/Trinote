import SwiftUI

private enum NoteAppearanceTab: String, CaseIterable, Identifiable {
    case icon
    case color

    var id: String { rawValue }

    var title: String {
        switch self {
        case .icon:
            return String(localized: "Icon", comment: "Note appearance tab")
        case .color:
            return String(localized: "Color", comment: "Note appearance tab")
        }
    }
}

/// Tabbed sheet for choosing a note’s Trilium `#iconClass` and `#color` labels.
struct NoteAppearancePickerSheet: View {
    let currentIconClass: String?
    let currentColorLabel: String?
    let onSelectIcon: (String?) -> Void
    let onSelectColor: (String?) -> Void

    @Environment(\.dismiss) private var dismiss
    @State private var tab: NoteAppearanceTab = .icon

    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                Picker(String(localized: "Appearance", comment: "Note appearance tab picker"), selection: $tab) {
                    ForEach(NoteAppearanceTab.allCases) { item in
                        Text(item.title).tag(item)
                    }
                }
                .pickerStyle(.segmented)
                .padding(.horizontal)
                .padding(.top, 8)
                .padding(.bottom, 4)

                switch tab {
                case .icon:
                    NoteIconPickerContent(currentIconClass: currentIconClass) { iconClass in
                        onSelectIcon(iconClass)
                        dismiss()
                    }
                case .color:
                    NoteColorPickerContent(currentColorLabel: currentColorLabel) { colorLabel in
                        onSelectColor(colorLabel)
                        dismiss()
                    }
                }
            }
            .navigationTitle(String(localized: "Appearance", comment: "Note appearance picker title"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(String(localized: "Cancel", comment: "Appearance picker")) { dismiss() }
                }
                ToolbarItem(placement: .destructiveAction) {
                    Button(String(localized: "Clear", comment: "Appearance picker clear")) {
                        switch tab {
                        case .icon:
                            onSelectIcon(nil)
                        case .color:
                            onSelectColor(nil)
                        }
                        dismiss()
                    }
                }
            }
        }
    }
}

// MARK: - Icon tab

private enum NoteIconPackFilter: String, CaseIterable, Identifiable {
    case all
    case regular
    case solid
    case brands

    var id: String { rawValue }

    var title: String {
        switch self {
        case .all: return String(localized: "All", comment: "Icon picker filter")
        case .regular: return String(localized: "Outline", comment: "Icon picker filter")
        case .solid: return String(localized: "Solid", comment: "Icon picker filter")
        case .brands: return String(localized: "Brands", comment: "Icon picker filter")
        }
    }

    func matches(_ iconKey: String) -> Bool {
        switch self {
        case .all: return true
        case .regular: return iconKey.hasPrefix("bx-")
        case .solid: return iconKey.hasPrefix("bxs-")
        case .brands: return iconKey.hasPrefix("bxl-")
        }
    }
}

private struct NoteIconPickerContent: View {
    private static let iconsPerRow = 5
    private static let iconCellSize: CGFloat = 58
    private static let gridSpacing: CGFloat = 10

    let currentIconClass: String?
    let onSelect: (String?) -> Void

    @State private var search = ""
    @State private var packFilter: NoteIconPackFilter = .all

    private var selectedKey: String? {
        BoxiconsResolver.iconKey(from: currentIconClass)
    }

    private var filteredIcons: [String] {
        let query = search.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        return BoxiconsCatalog.allIconClasses.filter { key in
            guard packFilter.matches(key) else { return false }
            if query.isEmpty { return true }
            return key.lowercased().contains(query)
        }
    }

    private var columns: [GridItem] {
        Array(repeating: GridItem(.flexible(), spacing: Self.gridSpacing), count: Self.iconsPerRow)
    }

    var body: some View {
        VStack(spacing: 0) {
            Picker(String(localized: "Icon pack", comment: "Icon picker filter"), selection: $packFilter) {
                ForEach(NoteIconPackFilter.allCases) { filter in
                    Text(filter.title).tag(filter)
                }
            }
            .pickerStyle(.segmented)
            .padding(.horizontal)
            .padding(.bottom, 8)

            ScrollView {
                if filteredIcons.isEmpty {
                    ContentUnavailableView(
                        String(localized: "No Icons", comment: "Icon picker empty"),
                        systemImage: "magnifyingglass",
                        description: Text(String(localized: "Try a different search or filter.", comment: "Icon picker empty hint"))
                    )
                    .padding(.top, 40)
                } else {
                    LazyVGrid(columns: columns, spacing: Self.gridSpacing) {
                        ForEach(filteredIcons, id: \.self) { iconKey in
                            let iconClass = BoxiconsResolver.triliumIconClass(for: iconKey)
                            Button {
                                onSelect(iconClass)
                            } label: {
                                NoteIconView(
                                    iconClass: iconClass,
                                    fallbackNoteType: .text,
                                    size: .picker,
                                    foregroundStyle: selectedKey == iconKey ? Color.accentColor : Color.primary
                                )
                                .frame(width: Self.iconCellSize, height: Self.iconCellSize)
                                .background(
                                    RoundedRectangle(cornerRadius: 10)
                                        .fill(selectedKey == iconKey ? Color.accentColor.opacity(0.15) : Color.clear)
                                )
                            }
                            .buttonStyle(.plain)
                            .accessibilityLabel(iconKey)
                        }
                    }
                    .padding()
                }
            }
        }
        .searchable(text: $search, prompt: String(localized: "Search icons", comment: "Icon picker search"))
    }
}

// MARK: - Color tab

private struct NoteColorPickerContent: View {
    let currentColorLabel: String?
    let onSelect: (String?) -> Void

    private var columns: [GridItem] {
        [GridItem(.adaptive(minimum: 48, maximum: 64), spacing: 10)]
    }

    var body: some View {
        ScrollView {
            LazyVGrid(columns: columns, spacing: 12) {
                ForEach(TriliumNoteColorMapper.pickerPalette, id: \.self) { name in
                    colorButton(name: name)
                }
            }
            .padding()
        }
    }

    @ViewBuilder
    private func colorButton(name: String) -> some View {
        let isSelected = TriliumNoteColorMapper.colorLabelsMatch(current: currentColorLabel, option: name)
        let swatch = TriliumNoteColorMapper.swiftUIColor(for: name) ?? .secondary
        let displayName = TriliumNoteColorMapper.pickerDisplayName(for: name)

        Button {
            onSelect(name)
        } label: {
            VStack(spacing: 6) {
                Circle()
                    .fill(swatch)
                    .frame(width: 36, height: 36)
                    .overlay {
                        Circle()
                            .strokeBorder(isSelected ? Color.accentColor : Color.secondary.opacity(0.35), lineWidth: isSelected ? 3 : 1)
                    }
                Text(displayName)
                    .font(.caption2)
                    .foregroundStyle(isSelected ? Color.accentColor : Color.secondary)
                    .lineLimit(1)
                    .minimumScaleFactor(0.8)
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 4)
            .background(
                RoundedRectangle(cornerRadius: 10)
                    .fill(isSelected ? Color.accentColor.opacity(0.12) : Color.clear)
            )
        }
        .buttonStyle(.plain)
        .accessibilityLabel(displayName)
        .accessibilityAddTraits(isSelected ? .isSelected : [])
    }
}
