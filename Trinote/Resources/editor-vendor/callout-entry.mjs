import { Node, mergeAttributes } from "@tiptap/core";

const ADMONITION_TYPES = ["note", "tip", "important", "caution", "warning"];

/**
 * Matches TriliumNext / CKEditor admonition HTML:
 *   <aside class="admonition note">...</aside>
 * (see packages/ckeditor5-admonition in TriliumNext/Notes)
 *
 * Also parses legacy Trinote markup: <div data-callout-type="note">...</div>
 */
export const Callout = Node.create({
  name: "callout",
  group: "block",
  content: "block+",
  defining: true,
  isolating: false,
  addAttributes() {
    return {
      type: {
        default: "note",
        rendered: false,
        parseHTML: (el) => {
          const dt = el.getAttribute("data-callout-type");
          if (dt && ADMONITION_TYPES.includes(dt)) return dt;
          const classes = (el.getAttribute("class") || "").split(/\s+/).filter(Boolean);
          for (const t of ADMONITION_TYPES) {
            if (classes.includes(t)) return t;
          }
          return "note";
        },
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: "aside",
        getAttrs: (el) => {
          if (!el.classList || !el.classList.contains("admonition")) return false;
          for (const t of ADMONITION_TYPES) {
            if (el.classList.contains(t)) return { type: t };
          }
          return { type: "note" };
        },
      },
      { tag: "div[data-callout-type]" },
    ];
  },
  renderHTML({ node }) {
    const t = node.attrs.type || "note";
    const safe = ADMONITION_TYPES.includes(t) ? t : "note";
    return ["aside", mergeAttributes({ class: `admonition ${safe}` }), 0];
  },
  addCommands() {
    return {
      insertCallout:
        (type) =>
        ({ commands }) => {
          const t = ADMONITION_TYPES.includes(type) ? type : "note";
          return commands.insertContent({
            type: this.name,
            attrs: { type: t },
            content: [{ type: "paragraph" }],
          });
        },
      wrapInCallout:
        (type) =>
        ({ commands }) => {
          const t = ADMONITION_TYPES.includes(type) ? type : "note";
          return commands.wrapIn(this.name, { type: t });
        },
      setCalloutType:
        (type) =>
        ({ commands }) => {
          const t = ADMONITION_TYPES.includes(type) ? type : "note";
          return commands.updateAttributes(this.name, { type: t });
        },
    };
  },
});
