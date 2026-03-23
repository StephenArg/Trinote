import { Mark, mergeAttributes } from "@tiptap/core";

/** Trilium / CKEditor 5 font sizes: classes on <span>, default = no class */
const SIZES = ["tiny", "small", "big", "huge"];

export const TriliumFontSize = Mark.create({
  name: "triliumFontSize",

  inclusive: true,

  addAttributes() {
    return {
      size: {
        default: null,
        parseHTML: (element) => {
          for (const s of SIZES) {
            if (element.classList && element.classList.contains(`text-${s}`)) return s;
          }
          return null;
        },
        renderHTML: (attributes) => {
          const s = attributes.size;
          if (!s || !SIZES.includes(s)) return {};
          return { class: `text-${s}` };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (el) => {
          for (const s of SIZES) {
            if (el.classList.contains(`text-${s}`)) return { size: s };
          }
          return false;
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setTriliumFontSize:
        (size) =>
        ({ commands }) => {
          if (!SIZES.includes(size)) return false;
          return commands.setMark(this.name, { size });
        },
      unsetTriliumFontSize:
        () =>
        ({ commands }) =>
        commands.unsetMark(this.name),
    };
  },
});
