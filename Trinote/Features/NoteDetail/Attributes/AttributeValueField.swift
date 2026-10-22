import SwiftUI
import UIKit

/// The input a label's value is typed into, chosen by the kind of value it holds (Trilium's label types): a menu of
/// choices, a switch, a date or colour picker, or text with the matching keyboard. Used by the attribute form and by
/// promoted fields on notes. Values are written in Trilium's formats (`true`/`false`, `YYYY-MM-DD`,
/// `YYYY-MM-DDTHH:mm`, `HH:mm`).
struct AttributeValueField: View {
    /// `nil` for plain text.
    let labelType: TriliumLabelType?
    @Binding var value: String
    var selectOptions: [String] = []
    /// Values the label already has elsewhere, offered for plain text.
    var suggestions: [String] = []
    /// Masked until shown (`#shareCredentials`).
    var isSecret = false
    var placeholder = ""
    /// The text beside a switch.
    var toggleTitle = ""
    var isDisabled = false
    /// The value is finished: return, leaving the field, or any pick from a control.
    var onCommit: () -> Void = {}
    /// For a select: an option the user typed. The caller adds it (promoted fields add it to their definition) and
    /// picks it.
    var onCreateOption: ((String) -> Void)?

    @FocusState private var isFocused: Bool
    @State private var revealsSecret = false
    @State private var isAddingOption = false
    @State private var newOption = ""

    var body: some View {
        content
            .disabled(isDisabled)
    }

    @ViewBuilder
    private var content: some View {
        switch labelType {
        case .select:
            selectField
        case .boolean:
            Toggle(isOn: Binding(
                get: { value == "true" },
                set: { value = $0 ? "true" : "false"; onCommit() }
            )) {
                Text(verbatim: toggleTitle)
            }
        case .date, .datetime, .time:
            dateField(labelType ?? .date)
        case .color:
            colorField
        case .textarea:
            TextField(placeholder, text: $value, axis: .vertical)
                .lineLimit(2...8)
                .focused($isFocused)
                .onChange(of: isFocused) { _, focused in if !focused { onCommit() } }
        case .number:
            textField(keyboard: .decimalPad)
        case .url:
            HStack {
                textField(keyboard: .URL)
                if let url = Self.openableURL(value) {
                    Link(destination: url) {
                        Image(systemName: "arrow.up.right.square")
                    }
                    .accessibilityLabel(String(localized: "Open Link", comment: "Attribute value: open URL"))
                }
            }
        case .email:
            HStack {
                textField(keyboard: .emailAddress)
                if let url = Self.mailURL(value) {
                    Link(destination: url) {
                        Image(systemName: "envelope")
                    }
                    .accessibilityLabel(String(localized: "Send Email", comment: "Attribute value: write to the address"))
                }
            }
        case .phone:
            HStack {
                textField(keyboard: .phonePad)
                if let url = Self.phoneURL(value) {
                    Link(destination: url) {
                        Image(systemName: "phone")
                    }
                    .accessibilityLabel(String(localized: "Call", comment: "Attribute value: call the number"))
                }
            }
        case .text, .none:
            HStack {
                if isSecret, !revealsSecret {
                    SecureField(placeholder, text: $value)
                        .focused($isFocused)
                        .onSubmit(onCommit)
                        .onChange(of: isFocused) { _, focused in if !focused { onCommit() } }
                } else {
                    textField(keyboard: .default)
                }
                if isSecret {
                    Button {
                        revealsSecret.toggle()
                    } label: {
                        Image(systemName: revealsSecret ? "eye.slash" : "eye")
                    }
                    .buttonStyle(.borderless)
                    .accessibilityLabel(revealsSecret
                        ? String(localized: "Hide", comment: "Hide a secret attribute value")
                        : String(localized: "Show", comment: "Show a secret attribute value"))
                } else if !suggestions.isEmpty {
                    Menu {
                        ForEach(suggestions.prefix(50), id: \.self) { suggestion in
                            Button {
                                value = suggestion
                                onCommit()
                            } label: {
                                Text(verbatim: suggestion)
                            }
                        }
                    } label: {
                        Image(systemName: "chevron.down.circle")
                    }
                    .accessibilityLabel(String(localized: "Values in Use", comment: "Attribute value suggestions menu"))
                }
            }
        }
    }

    private func textField(keyboard: UIKeyboardType) -> some View {
        TextField(placeholder, text: $value)
            .keyboardType(keyboard)
            .textInputAutocapitalization(keyboard == .default ? .sentences : .never)
            .autocorrectionDisabled(keyboard != .default)
            .focused($isFocused)
            .onSubmit(onCommit)
            .onChange(of: isFocused) { _, focused in if !focused { onCommit() } }
    }

    // MARK: Select

    private var selectField: some View {
        let options = selectOptions + (value.isEmpty || selectOptions.contains(value) ? [] : [value])
        return HStack {
            Picker(selection: Binding(get: { value }, set: { value = $0; onCommit() })) {
                Text(String(localized: "Not Set", comment: "Attribute value: no choice made")).tag("")
                ForEach(options, id: \.self) { option in
                    Text(verbatim: option).tag(option)
                }
            } label: {
                EmptyView()
            }
            .pickerStyle(.menu)
            .labelsHidden()
            Spacer(minLength: 0)
            if onCreateOption != nil {
                Button {
                    newOption = ""
                    isAddingOption = true
                } label: {
                    Image(systemName: "plus.circle")
                }
                .buttonStyle(.borderless)
                .accessibilityLabel(String(localized: "New Option…", comment: "Promoted select field: add a choice"))
            }
        }
        .alert(String(localized: "New Option", comment: "Promoted select field: add a choice"), isPresented: $isAddingOption) {
            TextField(String(localized: "Option", comment: "Promoted select field: new choice"), text: $newOption)
            Button(String(localized: "Add", comment: "Add")) {
                let option = newOption.trimmingCharacters(in: .whitespacesAndNewlines)
                guard !option.isEmpty else { return }
                onCreateOption?(option)
            }
            Button(String(localized: "Cancel", comment: "Dismiss sheet"), role: .cancel) {}
        }
    }

    // MARK: Dates

    @ViewBuilder
    private func dateField(_ type: TriliumLabelType) -> some View {
        if value.isEmpty {
            Button(String(localized: "Set", comment: "Attribute value: give an empty date or time a value")) {
                value = AttributeDateValue.string(from: Date(), type: type)
                onCommit()
            }
        } else if let date = AttributeDateValue.date(from: value, type: type) {
            HStack {
                DatePicker(
                    selection: Binding(
                        get: { date },
                        set: { value = AttributeDateValue.string(from: $0, type: type); onCommit() }
                    ),
                    displayedComponents: type == .date ? [.date] : type == .time ? [.hourAndMinute] : [.date, .hourAndMinute]
                ) {
                    EmptyView()
                }
                .labelsHidden()
                Spacer(minLength: 0)
                Button {
                    value = ""
                    onCommit()
                } label: {
                    Image(systemName: "xmark.circle.fill")
                        .foregroundStyle(.secondary)
                }
                .buttonStyle(.borderless)
                .accessibilityLabel(String(localized: "Clear", comment: "Appearance picker clear"))
            }
        } else {
            // A value in another format is kept as text rather than lost.
            textField(keyboard: .numbersAndPunctuation)
        }
    }

    // MARK: Colour

    private var colorField: some View {
        HStack {
            textField(keyboard: .asciiCapable)
            ColorPicker(
                selection: Binding(
                    get: { AttributeColorValue.color(from: value) ?? .gray },
                    set: { value = AttributeColorValue.hex(from: $0); onCommit() }
                ),
                supportsOpacity: false
            ) {
                EmptyView()
            }
            .labelsHidden()
        }
    }

    // MARK: Opening values (only plain web, mail and phone links, never custom schemes)

    static func openableURL(_ value: String) -> URL? {
        guard let url = URL(string: value.trimmingCharacters(in: .whitespaces)),
              let scheme = url.scheme?.lowercased(), scheme == "http" || scheme == "https",
              url.host() != nil else { return nil }
        return url
    }

    static func mailURL(_ value: String) -> URL? {
        let address = value.trimmingCharacters(in: .whitespaces)
        guard address.contains("@"), !address.contains(where: { $0.isWhitespace || "/?#:".contains($0) }),
              let encoded = address.addingPercentEncoding(withAllowedCharacters: .urlUserAllowed) else { return nil }
        return URL(string: "mailto:\(encoded)")
    }

    static func phoneURL(_ value: String) -> URL? {
        let digits = value.filter { $0.isASCII && ($0.isNumber || $0 == "+") }
        guard digits.contains(where: \.isNumber) else { return nil }
        return URL(string: "tel:\(digits)")
    }
}

/// Trilium's date, date-and-time and time label formats (the HTML `date`, `datetime-local` and `time` inputs).
enum AttributeDateValue {
    private static func formatter(_ type: TriliumLabelType) -> DateFormatter {
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.calendar = Calendar(identifier: .gregorian)
        formatter.timeZone = .current
        switch type {
        case .datetime: formatter.dateFormat = "yyyy-MM-dd'T'HH:mm"
        case .time: formatter.dateFormat = "HH:mm"
        default: formatter.dateFormat = "yyyy-MM-dd"
        }
        return formatter
    }

    static func date(from value: String, type: TriliumLabelType) -> Date? {
        formatter(type).date(from: value.trimmingCharacters(in: .whitespaces))
    }

    static func string(from date: Date, type: TriliumLabelType) -> String {
        formatter(type).string(from: date)
    }
}

/// `#rrggbb` values for colour labels (`#color`, promoted colour fields).
enum AttributeColorValue {
    static func color(from value: String) -> Color? {
        var hex = value.trimmingCharacters(in: .whitespaces)
        guard hex.hasPrefix("#") else { return nil }
        hex.removeFirst()
        if hex.count == 3 {
            hex = hex.map { "\($0)\($0)" }.joined()
        }
        guard hex.count == 6, let rgb = UInt32(hex, radix: 16) else { return nil }
        return Color(
            red: Double((rgb >> 16) & 0xFF) / 255,
            green: Double((rgb >> 8) & 0xFF) / 255,
            blue: Double(rgb & 0xFF) / 255
        )
    }

    static func hex(from color: Color) -> String {
        var red: CGFloat = 0
        var green: CGFloat = 0
        var blue: CGFloat = 0
        UIColor(color).getRed(&red, green: &green, blue: &blue, alpha: nil)
        func component(_ value: CGFloat) -> Int { Int((min(max(value, 0), 1) * 255).rounded()) }
        return String(format: "#%02x%02x%02x", component(red), component(green), component(blue))
    }
}
