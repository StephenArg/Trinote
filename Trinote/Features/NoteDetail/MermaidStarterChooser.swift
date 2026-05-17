import SwiftUI

/// A starter-template chooser shown in `MermaidEditorView` when the note body is empty.
/// Tapping a chip writes the template into `editableContent`; once content is non-empty
/// the chooser is replaced by the live preview pane (mirrors Trilium desktop v0.103+ UX).
///
/// Templates are ported from upstream `apps/client/src/widgets/type_widgets/mermaid/sample_diagrams.ts`
/// in `TriliumNext/Trilium` v0.103.0 so a note created from the chip and synced back to desktop
/// renders identically there.
struct MermaidStarterChooser: View {
    /// Invoked with the raw Mermaid source when the user taps a template.
    let onSelect: (String) -> Void

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 14) {
                header

                MermaidStarterFlowLayout(spacing: 8, lineSpacing: 8) {
                    ForEach(MermaidSampleDiagram.all) { sample in
                        Button {
                            onSelect(sample.content)
                        } label: {
                            chipLabel(sample)
                        }
                        .buttonStyle(.plain)
                        .accessibilityLabel(sample.name)
                        .accessibilityHint(String(
                            localized: "Inserts a sample \(sample.name) diagram into the editor.",
                            comment: "Mermaid starter chooser chip a11y hint"
                        ))
                    }
                }
            }
            .padding(16)
        }
        .background(Color(.systemBackground))
    }

    @ViewBuilder
    private var header: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(String(localized: "Start with a template", comment: "Mermaid starter chooser title"))
                .font(.headline)
            Text(String(
                localized: "Tap a diagram type to insert a sample you can edit. The preview will replace this panel once there's content.",
                comment: "Mermaid starter chooser subtitle"
            ))
            .font(.caption)
            .foregroundStyle(.secondary)
            .fixedSize(horizontal: false, vertical: true)
        }
    }

    @ViewBuilder
    private func chipLabel(_ sample: MermaidSampleDiagram) -> some View {
        HStack(spacing: 6) {
            Image(systemName: sample.iconName)
                .font(.caption.weight(.semibold))
                .foregroundStyle(.tint)
            Text(sample.name)
                .font(.subheadline.weight(.medium))
                .foregroundStyle(.primary)
                .lineLimit(1)
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 8)
        .background(
            Capsule(style: .continuous)
                .fill(Color(.secondarySystemBackground))
        )
        .overlay(
            Capsule(style: .continuous)
                .strokeBorder(Color(.separator), lineWidth: 0.5)
        )
    }
}

// MARK: - Sample diagrams

struct MermaidSampleDiagram: Identifiable, Sendable {
    let id: String
    let name: String
    let iconName: String
    let content: String

    init(id: String, name: String, iconName: String, content: String) {
        self.id = id
        self.name = name
        self.iconName = iconName
        self.content = content
    }
}

extension MermaidSampleDiagram {
    /// Sample sources ordered to roughly match Trilium desktop's panel layout, leading with the
    /// types most users reach for first. Sources are kept verbatim from upstream so round-tripping
    /// between Trinote and Trilium desktop never reformats the diagram.
    static let all: [MermaidSampleDiagram] = [
        MermaidSampleDiagram(
            id: "flowchart",
            name: String(localized: "Flowchart", comment: "Mermaid sample diagram name"),
            iconName: "arrow.triangle.branch",
            content: """
            flowchart TD
                A[Christmas] -->|Get money| B(Go shopping)
                B --> C{Let me think}
                C -->|One| D[Laptop]
                C -->|Two| E[iPhone]
                C -->|Three| F[fa:fa-car Car]
            """
        ),
        MermaidSampleDiagram(
            id: "sequence",
            name: String(localized: "Sequence", comment: "Mermaid sample diagram name"),
            iconName: "arrow.left.arrow.right",
            content: """
            sequenceDiagram
                Alice->>+John: Hello John, how are you?
                Alice->>+John: John, can you hear me?
                John-->>-Alice: Hi Alice, I can hear you!
                John-->>-Alice: I feel great!
            """
        ),
        MermaidSampleDiagram(
            id: "class",
            name: String(localized: "Class", comment: "Mermaid sample diagram name"),
            iconName: "square.stack.3d.up",
            content: """
            classDiagram
                Animal <|-- Duck
                Animal <|-- Fish
                Animal <|-- Zebra
                Animal : +int age
                Animal : +String gender
                Animal: +isMammal()
                Animal: +mate()
                class Duck{
                    +String beakColor
                    +swim()
                    +quack()
                }
                class Fish{
                    -int sizeInFeet
                    -canEat()
                }
                class Zebra{
                    +bool is_wild
                    +run()
                }
            """
        ),
        MermaidSampleDiagram(
            id: "state",
            name: String(localized: "State", comment: "Mermaid sample diagram name"),
            iconName: "circle.dotted",
            content: """
            stateDiagram-v2
                [*] --> Still
                Still --> [*]
                Still --> Moving
                Moving --> Still
                Moving --> Crash
                Crash --> [*]
            """
        ),
        MermaidSampleDiagram(
            id: "er",
            name: String(localized: "Entity Relationship", comment: "Mermaid sample diagram name"),
            iconName: "tablecells",
            content: """
            erDiagram
                CUSTOMER ||--o{ ORDER : places
                ORDER ||--|{ ORDER_ITEM : contains
                PRODUCT ||--o{ ORDER_ITEM : includes
                CUSTOMER {
                    string id
                    string name
                    string email
                }
                ORDER {
                    string id
                    date orderDate
                    string status
                }
                PRODUCT {
                    string id
                    string name
                    float price
                }
                ORDER_ITEM {
                    int quantity
                    float price
                }
            """
        ),
        MermaidSampleDiagram(
            id: "pie",
            name: String(localized: "Pie", comment: "Mermaid sample diagram name"),
            iconName: "chart.pie",
            content: """
            pie title Pets adopted by volunteers
                "Dogs" : 386
                "Cats" : 85
                "Rats" : 15
            """
        ),
        MermaidSampleDiagram(
            id: "mindmap",
            name: String(localized: "Mind Map", comment: "Mermaid sample diagram name"),
            iconName: "brain",
            content: """
            mindmap
                root((mindmap))
                    Origins
                        Long history
                        ::icon(fa fa-book)
                        Popularisation
                            British popular psychology author Tony Buzan
                    Research
                        On effectiveness and features
                        On Automatic creation
                    Uses
                        Creative techniques
                        Strategic planning
                        Argument mapping
                    Tools
                        Pen and paper
                        Mermaid
            """
        ),
        MermaidSampleDiagram(
            id: "gantt",
            name: String(localized: "Gantt", comment: "Mermaid sample diagram name"),
            iconName: "calendar.badge.clock",
            content: """
            gantt
                title A Gantt Diagram
                dateFormat YYYY-MM-DD
                section Section
                A task           :a1, 2014-01-01, 30d
                Another task     :after a1 , 20d
                section Another
                Task in sec      :2014-01-12 , 12d
                another task     : 24d
            """
        ),
        MermaidSampleDiagram(
            id: "timeline",
            name: String(localized: "Timeline", comment: "Mermaid sample diagram name"),
            iconName: "clock",
            content: """
            timeline
                title History of Social Media Platform
                2002 : LinkedIn
                2004 : Facebook
                     : Google
                2005 : YouTube
                2006 : Twitter
            """
        ),
        MermaidSampleDiagram(
            id: "kanban",
            name: String(localized: "Kanban", comment: "Mermaid sample diagram name"),
            iconName: "rectangle.split.3x1",
            content: """
            ---
            config:
              kanban:
                ticketBaseUrl: 'https://github.com/mermaid-js/mermaid/issues/#TICKET#'
            ---
            kanban
                Todo
                    [Create Documentation]
                    docs[Create Blog about the new diagram]
                [In progress]
                    id6[Create renderer so that it works in all cases. We also add some extra text here for testing purposes. And some more just for the extra flare.]
                id9[Ready for deploy]
                    id8[Design grammar]@{ assigned: 'knsv' }
                id10[Ready for test]
                    id4[Create parsing tests]@{ ticket: 2038, assigned: 'K.Sveidqvist', priority: 'High' }
                    id66[last item]@{ priority: 'Very Low', assigned: 'knsv' }
                id11[Done]
                    id5[define getData]
                    id2[Title of diagram is more than 100 chars when user duplicates diagram with 100 char]@{ ticket: 2036, priority: 'Very High'}
                    id3[Update DB function]@{ ticket: 2037, assigned: knsv, priority: 'High' }

                id12[Can't reproduce]
                    id3[Weird flickering in Firefox]
            """
        ),
        MermaidSampleDiagram(
            id: "git",
            name: String(localized: "Git Graph", comment: "Mermaid sample diagram name"),
            iconName: "point.3.connected.trianglepath.dotted",
            content: """
            gitGraph
                commit
                branch develop
                checkout develop
                commit
                commit
                checkout main
                merge develop
                commit
                branch feature
                checkout feature
                commit
                commit
                checkout main
                merge feature
            """
        ),
        MermaidSampleDiagram(
            id: "user-journey",
            name: String(localized: "User Journey", comment: "Mermaid sample diagram name"),
            iconName: "figure.walk",
            content: """
            journey
                title My working day
                section Go to work
                    Make tea: 5: Me
                    Go upstairs: 3: Me
                    Do work: 1: Me, Cat
                section Go home
                    Go downstairs: 5: Me
                    Sit down: 5: Me
            """
        ),
        MermaidSampleDiagram(
            id: "quadrant",
            name: String(localized: "Quadrant", comment: "Mermaid sample diagram name"),
            iconName: "square.split.2x2",
            content: """
            quadrantChart
                title Reach and engagement of campaigns
                x-axis Low Reach --> High Reach
                y-axis Low Engagement --> High Engagement
                quadrant-1 We should expand
                quadrant-2 Need to promote
                quadrant-3 Re-evaluate
                quadrant-4 May be improved
                Campaign A: [0.3, 0.6]
                Campaign B: [0.45, 0.23]
                Campaign C: [0.57, 0.69]
                Campaign D: [0.78, 0.34]
                Campaign E: [0.40, 0.34]
                Campaign F: [0.35, 0.78]
            """
        ),
        MermaidSampleDiagram(
            id: "xy",
            name: String(localized: "XY Chart", comment: "Mermaid sample diagram name"),
            iconName: "chart.xyaxis.line",
            content: """
            xychart-beta
                title "Sales Revenue"
                x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]
                y-axis "Revenue (in $)" 4000 --> 11000
                bar [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]
                line [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]
            """
        ),
        MermaidSampleDiagram(
            id: "sankey",
            name: String(localized: "Sankey", comment: "Mermaid sample diagram name"),
            iconName: "arrow.right.to.line.compact",
            content: """
            ---
            config:
              sankey:
                showValues: false
            ---
            sankey-beta

            Agricultural 'waste',Bio-conversion,124.729
            Bio-conversion,Liquid,0.597
            Bio-conversion,Losses,26.862
            Bio-conversion,Solid,280.322
            Bio-conversion,Gas,81.144
            Biofuel imports,Liquid,35
            Biomass imports,Solid,35
            Coal imports,Coal,11.606
            Coal reserves,Coal,63.965
            Coal,Solid,75.571
            District heating,Industry,10.639
            District heating,Heating and cooling - commercial,22.505
            District heating,Heating and cooling - homes,46.184
            Electricity grid,Over generation / exports,104.453
            Electricity grid,Heating and cooling - homes,113.726
            """
        ),
        MermaidSampleDiagram(
            id: "treemap",
            name: String(localized: "Treemap", comment: "Mermaid sample diagram name"),
            iconName: "square.grid.2x2",
            content: """
            treemap-beta
            "Section 1"
                "Leaf 1.1": 12
                "Section 1.2"
                    "Leaf 1.2.1": 12
            "Section 2"
                "Leaf 2.1": 20
                "Leaf 2.2": 25
            """
        ),
        MermaidSampleDiagram(
            id: "treeview",
            name: String(localized: "Tree View", comment: "Mermaid sample diagram name"),
            iconName: "list.bullet.indent",
            content: """
            treeView-beta
                "src"
                    "components"
                        "Button.tsx"
                        "Modal.tsx"
                    "services"
                        "api.ts"
                        "utils.ts"
                    "index.ts"
                "package.json"
                "README.md"
            """
        ),
        MermaidSampleDiagram(
            id: "venn",
            name: String(localized: "Venn", comment: "Mermaid sample diagram name"),
            iconName: "circle.circle",
            content: """
            venn-beta
                title Web Dev
                set Frontend
                    text React
                    text shadcn-ui
                    text Firebase
                set Backend
                    text Hono
                    text PostgreSQL
                    text S3
                    text Lambda
                union Frontend,Backend["APIs"]
            """
        ),
        MermaidSampleDiagram(
            id: "ishikawa",
            name: String(localized: "Ishikawa", comment: "Mermaid sample diagram name"),
            iconName: "fish",
            content: """
            ishikawa-beta
                Blurry Photo
                    Process
                        Out of focus
                        Shutter speed too slow
                        Protective film not removed
                        Beautification filter applied
                    User
                        Shaky hands
                    Equipment
                        LENS
                            Inappropriate lens
                            Damaged lens
                            Dirty lens
                        SENSOR
                            Damaged sensor
                            Dirty sensor
                    Environment
                        Subject moved too quickly
                        Too dark
            """
        ),
        MermaidSampleDiagram(
            id: "wardley",
            name: String(localized: "Wardley", comment: "Mermaid sample diagram name"),
            iconName: "map",
            content: """
            wardley-beta
                title Tea Shop

                anchor Customers [0.95, 0.63]
                anchor Business [0.95, 0.27]

                component Cup of Tea [0.79, 0.61]
                component Tea [0.63, 0.81]
                component Cup [0.57, 0.46]
                component Water [0.52, 0.89]
                component Kettle [0.47, 0.53]
                component Power [0.36, 0.72]

                Customers -> Cup of Tea
                Business -> Cup of Tea
                Cup of Tea -> Tea
                Cup of Tea -> Cup
                Cup of Tea -> Water
                Water -> Kettle
                Kettle -> Power
            """
        ),
        MermaidSampleDiagram(
            id: "architecture",
            name: String(localized: "Architecture", comment: "Mermaid sample diagram name"),
            iconName: "building.2",
            content: """
            architecture-beta
                group api(cloud)[API]

                service db(database)[Database] in api
                service disk1(disk)[Storage] in api
                service disk2(disk)[Storage] in api
                service server(server)[Server] in api

                db:L -- R:server
                disk1:T -- B:server
                disk2:T -- B:db
            """
        ),
        MermaidSampleDiagram(
            id: "block",
            name: String(localized: "Block", comment: "Mermaid sample diagram name"),
            iconName: "rectangle.stack",
            content: """
            block-beta
            columns 1
                db(("DB"))
                blockArrowId6<["   "]>(down)
                block:ID
                    A
                    B["A wide one in the middle"]
                    C
                end
                space
                D
                ID --> D
                C --> D
                style B fill:#969,stroke:#333,stroke-width:4px
            """
        ),
        MermaidSampleDiagram(
            id: "c4",
            name: String(localized: "C4 Context", comment: "Mermaid sample diagram name"),
            iconName: "building.columns",
            content: """
            C4Context
                title System Context diagram for Internet Banking System
                Enterprise_Boundary(b0, "BankBoundary0") {
                    Person(customerA, "Banking Customer A", "A customer of the bank, with personal bank accounts.")
                    Person(customerB, "Banking Customer B")
                    Person_Ext(customerC, "Banking Customer C", "desc")

                    Person(customerD, "Banking Customer D", "A customer of the bank, with personal bank accounts.")

                    System(SystemAA, "Internet Banking System", "Allows customers to view information about their bank accounts, and make payments.")

                    Enterprise_Boundary(b1, "BankBoundary") {
                        SystemDb_Ext(SystemE, "Mainframe Banking System", "Stores all of the core banking information about customers, accounts, transactions, etc.")

                        System_Boundary(b2, "BankBoundary2") {
                            System(SystemA, "Banking System A")
                            System(SystemB, "Banking System B", "A system of the bank, with personal bank accounts. next line.")
                        }

                        System_Ext(SystemC, "E-mail system", "The internal Microsoft Exchange e-mail system.")
                        SystemDb(SystemD, "Banking System D Database", "A system of the bank, with personal bank accounts.")

                        Boundary(b3, "BankBoundary3", "boundary") {
                            SystemQueue(SystemF, "Banking System F Queue", "A system of the bank.")
                            SystemQueue_Ext(SystemG, "Banking System G Queue", "A system of the bank, with personal bank accounts.")
                        }
                    }
                }

                BiRel(customerA, SystemAA, "Uses")
                BiRel(SystemAA, SystemE, "Uses")
                Rel(SystemAA, SystemC, "Sends e-mails", "SMTP")
                Rel(SystemC, customerA, "Sends e-mails to")
            """
        ),
        MermaidSampleDiagram(
            id: "radar",
            name: String(localized: "Radar", comment: "Mermaid sample diagram name"),
            iconName: "scope",
            content: """
            ---
            title: "Grades"
            ---
            radar-beta
                axis m["Math"], s["Science"], e["English"]
                axis h["History"], g["Geography"], a["Art"]
                curve a["Alice"]{85, 90, 80, 70, 75, 90}
                curve b["Bob"]{70, 75, 85, 80, 90, 85}

                max 100
                min 0
            """
        ),
        MermaidSampleDiagram(
            id: "packet",
            name: String(localized: "Packet", comment: "Mermaid sample diagram name"),
            iconName: "rectangle.grid.1x2",
            content: """
            ---
            title: "TCP Packet"
            ---
            packet
            0-15: "Source Port"
            16-31: "Destination Port"
            32-63: "Sequence Number"
            64-95: "Acknowledgment Number"
            96-99: "Data Offset"
            100-105: "Reserved"
            106: "URG"
            107: "ACK"
            108: "PSH"
            109: "RST"
            110: "SYN"
            111: "FIN"
            112-127: "Window"
            128-143: "Checksum"
            144-159: "Urgent Pointer"
            160-191: "(Options and Padding)"
            192-255: "Data (variable length)"
            """
        ),
        MermaidSampleDiagram(
            id: "requirement",
            name: String(localized: "Requirement", comment: "Mermaid sample diagram name"),
            iconName: "checklist",
            content: """
            requirementDiagram

                requirement test_req {
                    id: 1
                    text: the test text.
                    risk: high
                    verifymethod: test
                }

                element test_entity {
                    type: simulation
                }

                test_entity - satisfies -> test_req
            """
        ),
    ]
}

// MARK: - Flow layout for chips

/// Minimal flow layout: places children left-to-right and wraps to a new row when the next child
/// would overflow the proposed width. Keeps the chooser usable on iPhone widths without resorting
/// to a fixed-column grid (which would either truncate long names or waste horizontal space).
private struct MermaidStarterFlowLayout: Layout {
    var spacing: CGFloat
    var lineSpacing: CGFloat

    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        let maxWidth = proposal.width ?? .infinity
        let rows = computeRows(subviews: subviews, maxWidth: maxWidth)
        let height = rows.reduce(0) { acc, row in
            let rowHeight = row.map(\.size.height).max() ?? 0
            return acc + rowHeight
        } + CGFloat(max(0, rows.count - 1)) * lineSpacing
        let width = rows.map { row in
            row.reduce(0) { $0 + $1.size.width } + CGFloat(max(0, row.count - 1)) * spacing
        }.max() ?? 0
        return CGSize(width: width, height: height)
    }

    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        let maxWidth = bounds.width
        let rows = computeRows(subviews: subviews, maxWidth: maxWidth)
        var y = bounds.minY
        for row in rows {
            let rowHeight = row.map(\.size.height).max() ?? 0
            var x = bounds.minX
            for entry in row {
                subviews[entry.index].place(
                    at: CGPoint(x: x, y: y),
                    anchor: .topLeading,
                    proposal: ProposedViewSize(entry.size)
                )
                x += entry.size.width + spacing
            }
            y += rowHeight + lineSpacing
        }
    }

    private struct Entry {
        let index: Int
        let size: CGSize
    }

    private func computeRows(subviews: Subviews, maxWidth: CGFloat) -> [[Entry]] {
        var rows: [[Entry]] = [[]]
        var currentRowWidth: CGFloat = 0
        for (i, sub) in subviews.enumerated() {
            let size = sub.sizeThatFits(.unspecified)
            let neededWidth = size.width + (rows[rows.count - 1].isEmpty ? 0 : spacing)
            if currentRowWidth + neededWidth > maxWidth, !rows[rows.count - 1].isEmpty {
                rows.append([])
                currentRowWidth = 0
            }
            rows[rows.count - 1].append(Entry(index: i, size: size))
            currentRowWidth += size.width + (rows[rows.count - 1].count > 1 ? spacing : 0)
        }
        return rows
    }
}
