import { mergeAttributes } from "@tiptap/core";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";

/** Read CKEditor / Trilium-style `list-style-type` from inline style */
function parseStyleListType(element) {
  const raw = (element.style && element.style.listStyleType && element.style.listStyleType.trim()) || "";
  if (raw) return raw;
  return null;
}

/** Map HTML <ol type> to CSS list-style-type (CKEditor may emit either) */
const OL_TYPE_TO_STYLE = {
  1: null,
  a: "lower-latin",
  A: "upper-latin",
  i: "lower-roman",
  I: "upper-roman",
};

/**
 * Bullet lists with Trilium / CKEditor list-style-type on <ul>
 * (disc, circle, square).
 */
export const TriliumBulletList = BulletList.extend({
  addAttributes() {
    return {
      listStyleType: {
        default: null,
        parseHTML: (element) => parseStyleListType(element),
        renderHTML: (attributes) => {
          const v = attributes.listStyleType;
          if (!v) return {};
          return { style: `list-style-type: ${v}` };
        },
      },
    };
  },
});

/**
 * Ordered lists with list-style-type on <ol>, plus preserved `start`.
 * Drops separate `type` attr in favour of style (matches CKEditor list properties).
 */
export const TriliumOrderedList = OrderedList.extend({
  addAttributes() {
    return {
      start: {
        default: 1,
        parseHTML: (element) =>
          element.hasAttribute("start") ? parseInt(element.getAttribute("start") || "", 10) : 1,
      },
      listStyleType: {
        default: null,
        parseHTML: (element) => {
          const fromStyle = parseStyleListType(element);
          if (fromStyle) return fromStyle;
          const t = element.getAttribute("type");
          if (t != null && Object.prototype.hasOwnProperty.call(OL_TYPE_TO_STYLE, t)) {
            return OL_TYPE_TO_STYLE[t];
          }
          return null;
        },
        renderHTML: (attributes) => {
          const v = attributes.listStyleType;
          if (!v) return {};
          return { style: `list-style-type: ${v}` };
        },
      },
    };
  },
  renderHTML({ HTMLAttributes }) {
    const { start, ...attributesWithoutStart } = HTMLAttributes;
    return start === 1
      ? ["ol", mergeAttributes(this.options.HTMLAttributes, attributesWithoutStart), 0]
      : ["ol", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
});
