# Vendored web assets

These files are bundled inside the iOS app and loaded from `editor.html`,
`mermaid-viewer.html`, `mermaid-editor.html`, `mindmap-*.html`,
`geomap-*.html`, etc.

The directory is added to the Xcode target as a **folder reference**
(`type: folder` in `project.yml`), so the relative paths used inside the
HTML files (`vendor/<file>`) work both in the simulator and on device.

## `mermaid.min.js`

Tracks the version of Mermaid that the latest tested Trilium release ships,
so notes that adopt new diagram types (Venn, Ishikawa, Tree View, Wardley
Maps, etc. introduced in Mermaid 11.x) render the same way as in the
desktop / web client.

| Trilium release | Mermaid version | Source URL |
|-----------------|-----------------|------------|
| v0.105.0        | 11.16.1         | `https://cdn.jsdelivr.net/npm/mermaid@11.16.1/dist/mermaid.min.js` |
| v0.103.0        | 11.15.0         | `https://cdn.jsdelivr.net/npm/mermaid@11.15.0/dist/mermaid.min.js` |
| v0.102.x        | 10.9.3          | `https://cdn.jsdelivr.net/npm/mermaid@10.9.3/dist/mermaid.min.js` |

To upgrade:

```bash
Scripts/bump_vendor.sh mermaid <VERSION>
```

The bundle declares `globalThis.mermaid = …` at the end, which is what
the HTML files consume via `window.mermaid.initialize`, `.run`, `.render`.

## `MindElixir.iife.js` / `MindElixir.css`

Vendored MindElixir runtime for mind-map notes (`mindmap-editor.html`,
`mindmap-viewer.html`). The IIFE and CSS must be bumped together.

| Trilium release | MindElixir version | Source URL |
|-----------------|--------------------|------------|
| v0.105.0        | 5.15.1             | `https://cdn.jsdelivr.net/npm/mind-elixir@5.15.1/dist/MindElixir.iife.js` |
| v0.103.x        | 5.10.0             | `https://cdn.jsdelivr.net/npm/mind-elixir@5.10.0/dist/MindElixir.iife.js` |

To upgrade (IIFE + CSS):

```bash
Scripts/bump_vendor.sh mind-elixir <VERSION>
```

The IIFE assigns `MindElixir.default` (constructor) plus `DARK_THEME` /
`SIDE`. Editor/viewer HTML uses `mind.container`, `mind.move(dx, dy)`,
`mind.getData()`, and `mind.bus`. Node photos from Trilium desktop are
relative `api/attachments|images/{id}/…` URLs; both HTML shells pass
`imageProxy: trinoteMindMapImageProxy` (in `mindmap-gestures.js`) so
`<img src>` becomes `trinote-img://…` without rewriting saved JSON.

## `mindmap-node-menu.js` / `mindmap-node-menu.css`

Custom node panel for `mindmap-editor.html`. MindElixir 5’s `nodeMenu`
constructor flag does nothing without `@mind-elixir/node-menu`; this
panel is the iOS stand-in (size, text/background/branch color, icons,
image, link, tags, note) and writes the same NodeObj fields Trilium
v0.105 stores. Installed via `installMindMapNodeMenu(mind)` after
`mind.init()`.

## `leaflet.js` / `leaflet.css` (removed)

Replaced by MapLibre GL for geo-map notes (see below).

## `maplibre-gl.js` / `maplibre-gl.css`

MapLibre GL **5.24.0** for geo-map editor/viewer (`geomap-*.html`). Matches Trilium v0.105 desktop.

```bash
curl -sSfL -o Trinote/Resources/vendor/maplibre-gl.js \
  https://unpkg.com/maplibre-gl@5.24.0/dist/maplibre-gl.js
curl -sSfL -o Trinote/Resources/vendor/maplibre-gl.css \
  https://unpkg.com/maplibre-gl@5.24.0/dist/maplibre-gl.css
```

## `geomap-core.js` / `geomap-marker-images.js` / `gpx.js`

Shared MapLibre map engine, rasterized marker pins (colour + Boxicons glyph), and GPX parsing for `geomap-editor.html` / `geomap-viewer.html`.

## `geomap-styles/`

VersaTiles Colorful vector style JSON (`versatiles-colorful.json`), copied from Trilium v0.105. Tile URLs point at `https://tiles.versatiles.org/`.

## `katex/`

Vendored KaTeX assets for inline math in HTML and mermaid notes.

## `images/`

Static images used by HTML viewers (placeholders, fallbacks).

## Device QA (mermaid + mind map)

After bumping Mermaid or MindElixir, verify on a physical device against a
Trilium v0.105 server. Spreadsheet / geo-map QA lives in those vendors' own
READMEs.

### Mermaid

- Light/dark appearance toggle still re-themes the diagram
- Wide diagrams (Gantt, sequence) scroll horizontally instead of squashing
- Beta types (venn, ishikawa, wardley, radar) render
- Include-note cards still pre-render via `MermaidRenderer`
- Starter templates in the mermaid editor still compile

### Mind map

- Create a map on iOS → open on Trilium desktop v0.105; color, font, icon,
  image, and memo survive the round-trip
- A desktop-uploaded node photo (`api/attachments/…`) renders on iOS; saving
  on iOS keeps the original URL (MindElixir `imageProxy` + `trinote-img://`)
- A desktop-edited styled node renders on iOS
- Tapping a node opens the style panel; X closes it; canvas tap dismisses it
- Pinch/pan (including pinch+pan via `mindmap-gestures.js`), context menu,
  arrow-link removal, and the save chip still work
