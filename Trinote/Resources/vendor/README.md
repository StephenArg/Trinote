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
| v0.103.0        | 11.15.0         | `https://cdn.jsdelivr.net/npm/mermaid@11.15.0/dist/mermaid.min.js` |
| v0.102.x        | 10.9.3          | `https://cdn.jsdelivr.net/npm/mermaid@10.9.3/dist/mermaid.min.js` |

To upgrade:

```bash
curl -sSfL -o Trinote/Resources/vendor/mermaid.min.js \
    https://cdn.jsdelivr.net/npm/mermaid@<VERSION>/dist/mermaid.min.js
```

The bundle declares `globalThis.mermaid = …` at the end, which is what
the HTML files consume via `window.mermaid.initialize`, `.run`, `.render`.

## `MindElixir.iife.js` / `MindElixir.css`

Vendored runtime for mind-map notes; pinned independently of Trilium.

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
