import SwiftUI
import UIKit
import XCTest
@testable import Trinote

final class TriliumNoteColorMapperTests: XCTestCase {

    func testNilAndEmptyReturnNil() {
        XCTAssertNil(TriliumNoteColorMapper.swiftUIColor(for: nil))
        XCTAssertNil(TriliumNoteColorMapper.swiftUIColor(for: ""))
        XCTAssertNil(TriliumNoteColorMapper.swiftUIColor(for: "   "))
    }

    func testUnknownNameReturnsNil() {
        XCTAssertNil(TriliumNoteColorMapper.swiftUIColor(for: "not_a_real_trilium_color_token"))
    }

    func testNamedRed() {
        let c = TriliumNoteColorMapper.swiftUIColor(for: "red")
        XCTAssertNotNil(c)
        assertRGB(c!, 231, 76, 60)
    }

    func testHexRRGGBBWithHash() {
        let c = TriliumNoteColorMapper.swiftUIColor(for: "#00FF40")
        XCTAssertNotNil(c)
        assertRGB(c!, 0, 255, 64)
    }

    func testHexRGBExpanded() {
        let c = TriliumNoteColorMapper.swiftUIColor(for: "#f0a")
        XCTAssertNotNil(c)
        assertRGB(c!, 255, 0, 170)
    }

    func testHexRRGGBBAAUsesRGBOnly() {
        let c = TriliumNoteColorMapper.swiftUIColor(for: "#11223344")
        XCTAssertNotNil(c)
        assertRGB(c!, 17, 34, 51)
    }

    func testColorLabelValueOnNoteItem() {
        let attr = AttributeItem(
            attributeId: "a1",
            noteId: "n1",
            type: .label,
            name: "color",
            value: "blue",
            position: 0,
            isInheritable: false
        )
        let note = NoteItem(
            noteId: "n1",
            title: "Hi",
            type: .text,
            mime: "text/html",
            isProtected: false,
            dateCreated: "",
            dateModified: "",
            parentNoteIds: [],
            childNoteIds: [],
            parentBranchIds: [],
            childBranchIds: [],
            attributes: [attr]
        )
        XCTAssertEqual(note.colorLabelValue, "blue")
        let mapped = TriliumNoteColorMapper.swiftUIColor(for: note.colorLabelValue)
        XCTAssertNotNil(mapped)
        assertRGB(mapped!, 52, 152, 219)
    }

    func testColorLabelCaseInsensitiveName() {
        let attr = AttributeItem(
            attributeId: "a1",
            noteId: "n1",
            type: .label,
            name: "Color",
            value: "green",
            position: 0,
            isInheritable: false
        )
        let note = NoteItem(
            noteId: "n1",
            title: "Hi",
            type: .text,
            mime: "text/html",
            isProtected: false,
            dateCreated: "",
            dateModified: "",
            parentNoteIds: [],
            childNoteIds: [],
            parentBranchIds: [],
            childBranchIds: [],
            attributes: [attr]
        )
        XCTAssertEqual(note.colorLabelValue, "green")
    }

    // MARK: - Helpers

    private func assertRGB(_ color: Color, _ r: Int, _ g: Int, _ b: Int, file: StaticString = #filePath, line: UInt = #line) {
        let t = rgb(color)
        XCTAssertEqual(t.0, r, file: file, line: line)
        XCTAssertEqual(t.1, g, file: file, line: line)
        XCTAssertEqual(t.2, b, file: file, line: line)
    }

    private func rgb(_ color: Color) -> (Int, Int, Int) {
        let u = UIColor(color)
        var r: CGFloat = 0
        var g: CGFloat = 0
        var b: CGFloat = 0
        var a: CGFloat = 0
        u.getRed(&r, green: &g, blue: &b, alpha: &a)
        return (Int(round(r * 255)), Int(round(g * 255)), Int(round(b * 255)))
    }
}
