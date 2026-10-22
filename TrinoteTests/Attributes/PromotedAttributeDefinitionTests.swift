import XCTest
@testable import Trinote

/// Cases from Trilium's `promoted_attribute_definition_parser.spec.ts`, so both apps read and write definitions alike.
final class PromotedAttributeDefinitionTests: XCTestCase {

    private func parse(_ value: String) -> PromotedAttributeDefinition {
        PromotedAttributeDefinition(parsing: value)
    }

    func testParsesFlagTypeAndMultiplicityTrimmingWhitespace() {
        XCTAssertTrue(parse("promoted").isPromoted)
        let definition = parse(" promoted , number , single ")
        XCTAssertTrue(definition.isPromoted)
        XCTAssertEqual(definition.labelType, .number)
        XCTAssertEqual(definition.multiplicity, .single)
    }

    func testAcceptsEveryLabelTypeAndMultiplicity() {
        for type in TriliumLabelType.allCases {
            XCTAssertEqual(parse(type.rawValue).labelType, type)
        }
        for multiplicity in PromotedAttributeDefinition.Multiplicity.allCases {
            XCTAssertEqual(parse(multiplicity.rawValue).multiplicity, multiplicity)
        }
    }

    func testParsesPrecisionLikeParseInt() {
        XCTAssertEqual(parse("precision=2").numberPrecision, 2)
        XCTAssertEqual(parse("precision=0").numberPrecision, 0)
        XCTAssertEqual(parse("precision=3px").numberPrecision, 3)
        // Trilium reads NaN here, which its consumers treat as unset.
        XCTAssertNil(parse("precision").numberPrecision)
    }

    func testParsesOptionsDroppingBlanksAndDecodingEscapes() {
        XCTAssertEqual(parse("options=Todo;In progress;Done").selectOptions, ["Todo", "In progress", "Done"])
        XCTAssertEqual(parse("options=1%2C5 kg;a%3Bb;100%25").selectOptions, ["1,5 kg", "a;b", "100%"])
        XCTAssertEqual(parse("options=a;;b;").selectOptions, ["a", "b"])
        XCTAssertEqual(parse("options=").selectOptions, [])
        XCTAssertEqual(parse("options").selectOptions, [])
    }

    func testAliasKeepsEverythingAfterTheFirstEquals() {
        XCTAssertEqual(parse("alias=My Label").promotedAlias, "My Label")
        XCTAssertEqual(parse("alias=").promotedAlias, "")
        XCTAssertNil(parse("alias").promotedAlias)
        XCTAssertEqual(parse("alias=a=b").promotedAlias, "a=b")
        XCTAssertEqual(parse("alias====").promotedAlias, "===")
    }

    func testInverseRelationIsFilteredToAValidName() {
        XCTAssertEqual(parse("inverse=isParentOf").inverseRelation, "isParentOf")
        XCTAssertEqual(parse("inverse=is:parent_of2").inverseRelation, "is:parent_of2")
        XCTAssertEqual(parse("inverse=is parent-of!").inverseRelation, "isparentof")
        XCTAssertEqual(parse("inverse").inverseRelation, "")
    }

    func testLaterTokensWinAndUnknownTokensAreSkipped() {
        let definition = parse("promoted,single,text,precision=4,alias=Foo")
        XCTAssertEqual(definition.labelType, .text)
        XCTAssertEqual(definition.numberPrecision, 4)
        XCTAssertEqual(definition.promotedAlias, "Foo")
        XCTAssertEqual(parse("text,number").labelType, .number)
        XCTAssertEqual(parse("single,multi").multiplicity, .multi)
        XCTAssertTrue(parse("bogus,promoted").isPromoted)
        XCTAssertEqual(parse(""), PromotedAttributeDefinition())
        XCTAssertTrue(parse("promoted,").isPromoted)
    }

    func testSerializesTheWayTriliumDoes() {
        var definition = PromotedAttributeDefinition()
        XCTAssertEqual(definition.serialized(for: .label), "single,text")
        XCTAssertEqual(definition.serialized(for: .relation), "single")

        definition.isPromoted = true
        definition.promotedAlias = "Foo"
        XCTAssertEqual(definition.serialized(for: .label), "promoted,alias=Foo,single,text")

        var number = PromotedAttributeDefinition()
        number.labelType = .number
        number.numberPrecision = 0
        XCTAssertEqual(number.serialized(for: .label), "single,number,precision=0")
        number.labelType = .text
        XCTAssertEqual(number.serialized(for: .label), "single,text")

        var select = PromotedAttributeDefinition()
        select.labelType = .select
        select.selectOptions = ["1,5 kg", "a;b", "100%"]
        XCTAssertEqual(select.serialized(for: .label), "single,select,options=1%2C5 kg;a%3Bb;100%25")
        select.selectOptions = []
        XCTAssertEqual(select.serialized(for: .label), "single,select")

        var relation = PromotedAttributeDefinition()
        relation.multiplicity = .multi
        relation.inverseRelation = "is parent"
        XCTAssertEqual(relation.serialized(for: .relation), "multi,inverse=isparent")
        relation.inverseRelation = "  "
        XCTAssertEqual(relation.serialized(for: .relation), "multi")
    }

    func testRoundTrips() {
        for value in [
            "promoted,alias=Due date,single,date",
            "promoted,multi,select,options=Todo;In progress;1%2C5",
            "promoted,single,number,precision=2",
            "promoted,multi,inverse=children",
        ] {
            let type: AttributeItem.AttributeKind = value.contains("inverse") ? .relation : .label
            XCTAssertEqual(parse(value).serialized(for: type), value)
        }
    }
}
