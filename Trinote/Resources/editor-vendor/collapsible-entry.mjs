import { Node, mergeAttributes } from "@tiptap/core";
import { Fragment } from "@tiptap/pm/model";

/**
 * TriliumNext / CKEditor collapsible blocks:
 *   <details class="trilium-collapsible" open><summary>…</summary>…blocks…</details>
 *
 * Nested collapsibles are allowed. The `open` attribute is persisted.
 * Editor chrome (chevron vs title-edit) lives in the NodeView; saved HTML stays native details/summary.
 */

export const CollapsibleSummary = Node.create({
  name: "collapsibleSummary",
  content: "inline*",
  defining: true,
  isolating: true,
  selectable: false,
  parseHTML() {
    return [{ tag: "summary" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["summary", mergeAttributes(HTMLAttributes), 0];
  },
});

export const Collapsible = Node.create({
  name: "collapsible",
  group: "block",
  content: "collapsibleSummary block+",
  defining: true,
  isolating: true,
  allowGapCursor: false,
  addAttributes() {
    return {
      open: {
        default: true,
        parseHTML: (el) => el.hasAttribute("open"),
        renderHTML: (attributes) => {
          if (!attributes.open) return {};
          return { open: "" };
        },
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: "details",
        getAttrs: (el) => {
          if (!(el instanceof HTMLElement)) return false;
          return { open: el.hasAttribute("open") };
        },
      },
    ];
  },
  renderHTML({ node, HTMLAttributes }) {
    const attrs = mergeAttributes(HTMLAttributes, { class: "trilium-collapsible" });
    if (node.attrs.open) attrs.open = "";
    else delete attrs.open;
    return ["details", attrs, 0];
  },
  addCommands() {
    return {
      insertCollapsible:
        () =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs: { open: true },
            content: [{ type: "collapsibleSummary" }, { type: "paragraph" }],
          }),
      wrapInCollapsible:
        () =>
        ({ state, dispatch }) => {
          const collapsible = state.schema.nodes.collapsible;
          const summary = state.schema.nodes.collapsibleSummary;
          if (!collapsible || !summary) return false;
          const { empty, $from, $to } = state.selection;
          if (empty) return false;
          const range = $from.blockRange($to);
          if (!range) return false;
          const body = state.doc.slice(range.start, range.end).content;
          if (!body.size) return false;
          const wrapped = collapsible.create(
            { open: true },
            Fragment.from(summary.create()).append(body)
          );
          if (!collapsible.validContent(wrapped.content)) return false;
          if (dispatch) {
            dispatch(state.tr.replaceRangeWith(range.start, range.end, wrapped).scrollIntoView());
          }
          return true;
        },
      toggleCollapsibleOpen:
        () =>
        ({ state, dispatch }) => {
          const { $from } = state.selection;
          for (let d = $from.depth; d > 0; d--) {
            const node = $from.node(d);
            if (node.type.name !== this.name) continue;
            if (dispatch) {
              dispatch(
                state.tr.setNodeMarkup($from.before(d), undefined, {
                  ...node.attrs,
                  open: !node.attrs.open,
                })
              );
            }
            return true;
          }
          return false;
        },
    };
  },
  addNodeView() {
    return ({ node, getPos, editor }) => {
      const details = document.createElement("details");
      details.className = "trilium-collapsible";
      details.open = !!node.attrs.open;

      const toggleOpen = (next) => {
        const pos = typeof getPos === "function" ? getPos() : null;
        if (pos == null) return;
        const current = editor.state.doc.nodeAt(pos);
        if (!current || current.type.name !== "collapsible") return;
        if (!!current.attrs.open === next) return;
        editor.view.dispatch(
          editor.state.tr.setNodeMarkup(pos, undefined, { ...current.attrs, open: next })
        );
      };

      const onClick = (e) => {
        const sum = e.target.closest("summary");
        if (!sum || sum.parentElement !== details) return;
        // Keep title editing from toggling; only the left chevron gutter toggles.
        e.preventDefault();
        e.stopPropagation();
        const rect = sum.getBoundingClientRect();
        if (e.clientX - rect.left < 36) {
          toggleOpen(!details.open);
        }
      };
      details.addEventListener("click", onClick, true);

      return {
        dom: details,
        contentDOM: details,
        ignoreMutation: (mutation) =>
          mutation.type === "attributes" && mutation.attributeName === "open",
        update: (updated) => {
          if (updated.type.name !== "collapsible") return false;
          if (details.open !== !!updated.attrs.open) details.open = !!updated.attrs.open;
          return true;
        },
        destroy: () => {
          details.removeEventListener("click", onClick, true);
        },
      };
    };
  },
});
