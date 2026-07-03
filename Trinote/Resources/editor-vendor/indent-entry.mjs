import { Extension } from "@tiptap/core";

/**
 * Block-level indentation for paragraphs and headings, stored as an inline
 * `margin-left` style so it round-trips with Trilium / CKEditor 5, whose
 * "block indent" feature emits `style="margin-left:40px"` on block elements.
 */
const INDENT_STEP = 40; // px — matches CKEditor 5 indentBlock default offset
const MAX_INDENT = INDENT_STEP * 12;

function parseMarginLeftPx(element) {
  const raw = (element.style && element.style.marginLeft) || element.getAttribute?.("data-indent") || "";
  if (!raw) return 0;
  const px = parseInt(String(raw), 10);
  return Number.isNaN(px) || px <= 0 ? 0 : px;
}

export const Indent = Extension.create({
  name: "indent",

  addOptions() {
    return {
      types: ["paragraph", "heading"],
      step: INDENT_STEP,
      max: MAX_INDENT,
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            default: 0,
            parseHTML: (element) => parseMarginLeftPx(element),
            renderHTML: (attributes) => {
              if (!attributes.indent) return {};
              return { style: `margin-left: ${attributes.indent}px` };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    const applyIndent = (delta) => ({ state, dispatch }) => {
      const { from, to } = state.selection;
      const step = this.options.step;
      const max = this.options.max;
      const types = this.options.types;
      let tr = state.tr;
      let changed = false;

      state.doc.nodesBetween(from, to, (node, pos) => {
        if (!types.includes(node.type.name)) return;
        const current = node.attrs.indent || 0;
        let next = current + delta * step;
        if (next < 0) next = 0;
        if (next > max) next = max;
        if (next !== current) {
          tr = tr.setNodeMarkup(pos, undefined, { ...node.attrs, indent: next });
          changed = true;
        }
      });

      if (changed && dispatch) dispatch(tr.scrollIntoView());
      return changed;
    };

    return {
      indent: () => applyIndent(1),
      outdent: () => applyIndent(-1),
    };
  },
});

export default Indent;
