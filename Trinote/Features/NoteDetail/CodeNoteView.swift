import SwiftUI
import UIKit

private enum CodeNoteTextWidthKey: PreferenceKey {
    static var defaultValue: CGFloat = 0
    static func reduce(value: inout CGFloat, nextValue: () -> CGFloat) {
        value = nextValue()
    }
}

struct CodeNoteView: View {
    let content: String
    let mime: String
    var findControl: FindOnPageControl?

    @State private var bodyWidth: CGFloat = 0
    @State private var viewportHeight: CGFloat = 160

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack {
                Text(languageLabel)
                    .font(.caption.weight(.medium))
                    .foregroundStyle(.secondary)
                Spacer()
                Button {
                    UIPasteboard.general.string = content
                } label: {
                    Label("Copy", systemImage: "doc.on.doc")
                        .font(.caption)
                }
                .buttonStyle(.bordered)
                .controlSize(.mini)
                .accessibilityLabel("Copy code to clipboard")
            }
            .padding(.horizontal)
            .padding(.vertical, 8)

            CodeReadonlyTextView(
                text: content,
                findControl: findControl
            )
            .frame(maxWidth: .infinity)
            .frame(height: viewportHeight)
            .background {
                GeometryReader { g in
                    Color.clear.preference(key: CodeNoteTextWidthKey.self, value: g.size.width)
                }
            }
            .background(Color(.secondarySystemGroupedBackground))
        }
        .onPreferenceChange(CodeNoteTextWidthKey.self) { w in
            bodyWidth = w
            viewportHeight = CodeNoteView.naturalCodeBodyHeight(text: content, availableWidth: w)
        }
        .onChange(of: content) { _, new in
            viewportHeight = CodeNoteView.naturalCodeBodyHeight(text: new, availableWidth: bodyWidth)
        }
    }

    private var languageLabel: String {
        let lang = mime
            .replacingOccurrences(of: "text/x-", with: "")
            .replacingOccurrences(of: "text/", with: "")
            .replacingOccurrences(of: "application/", with: "")
            .replacingOccurrences(of: "x-", with: "")

        if lang.isEmpty || lang == "plain" {
            return "Plain Text"
        }
        return lang.capitalized
    }

    /// Width from `GeometryReader` is often `0` on the first pass; using that for measurement forces a ~`minH` frame until a second pass, which can never arrive. Fall back to screen width (minus a typical inset) for **measurement** only; the real width still applies once layout settles.
    private static func widthForTextMeasurement(geometryWidth: CGFloat) -> CGFloat {
        if geometryWidth > 1 {
            return geometryWidth
        }
        let screen = UIScreen.main.bounds.width
        return max(280, screen - 64)
    }

    /// Read-only code body height. Uses `UITextView`’s `sizeThatFits` to match `CodeReadonlyTextView` (NSString `boundingRect` often over-estimates and leaves a blank band at the bottom).
    private static func naturalCodeBodyHeight(text: String, availableWidth: CGFloat) -> CGFloat {
        let minH: CGFloat = 120
        let w = widthForTextMeasurement(geometryWidth: availableWidth)
        let h = textViewMeasureHeight(matching: text, width: w)
        return max(minH, h)
    }

    private static func textViewMeasureHeight(matching text: String, width: CGFloat) -> CGFloat {
        let tv = UITextView()
        tv.isScrollEnabled = false
        tv.isEditable = false
        tv.font = UIFont.monospacedSystemFont(ofSize: 17, weight: .regular)
        tv.textContainer.lineFragmentPadding = 0
        tv.textContainerInset = UIEdgeInsets(top: 12, left: 12, bottom: 12, right: 12)
        tv.text = text
        let sz = tv.sizeThatFits(CGSize(width: width, height: .greatestFiniteMagnitude))
        return ceil(sz.height)
    }
}

// MARK: - Read-only monospaced text with optional in-page find

private struct CodeReadonlyTextView: UIViewRepresentable {
    let text: String
    var findControl: FindOnPageControl?

    func makeCoordinator() -> Coordinator {
        Coordinator()
    }

    func makeUIView(context: Context) -> UITextView {
        let tv = UITextView()
        tv.isEditable = false
        tv.isSelectable = true
        tv.font = .monospacedSystemFont(ofSize: 17, weight: .regular)
        tv.backgroundColor = UIColor.secondarySystemGroupedBackground
        tv.textContainerInset = UIEdgeInsets(top: 12, left: 12, bottom: 12, right: 12)
        tv.textContainer.lineFragmentPadding = 0
        tv.isScrollEnabled = true
        tv.alwaysBounceVertical = false
        tv.showsVerticalScrollIndicator = false
        tv.showsHorizontalScrollIndicator = true
        tv.textColor = .label
        tv.text = text
        context.coordinator.lastText = text
        context.coordinator.textView = tv
        findControl?.registerCodeTextView(tv, plainText: text)
        return tv
    }

    func updateUIView(_ uiView: UITextView, context: Context) {
        context.coordinator.textView = uiView
        findControl?.registerCodeTextView(uiView, plainText: text)

        if text != context.coordinator.lastText {
            context.coordinator.lastText = text
            let font = UIFont.monospacedSystemFont(ofSize: 17, weight: .regular)
            uiView.attributedText = NSAttributedString(
                string: text,
                attributes: [
                    .font: font,
                    .foregroundColor: UIColor.label
                ]
            )
            if let fc = findControl, !fc.query.isEmpty {
                fc.applyQueryFromFieldChange()
            }
        }
    }

    final class Coordinator {
        weak var textView: UITextView?
        var lastText: String = ""
    }
}

#Preview {
    CodeNoteView(content: """
    func hello() {
        print("Hello, world!")
    }
    """, mime: "text/x-swift")
}
