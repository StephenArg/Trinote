"use strict";
"use client";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Anchor: () => PopoverAnchor,
  Arrow: () => PopoverArrow,
  Close: () => PopoverClose,
  Content: () => PopoverContent,
  Description: () => PopoverDescription,
  Popover: () => Popover,
  PopoverAnchor: () => PopoverAnchor,
  PopoverArrow: () => PopoverArrow,
  PopoverClose: () => PopoverClose,
  PopoverContent: () => PopoverContent,
  PopoverDescription: () => PopoverDescription,
  PopoverPortal: () => PopoverPortal,
  PopoverTitle: () => PopoverTitle,
  PopoverTrigger: () => PopoverTrigger,
  Portal: () => PopoverPortal,
  Root: () => Popover,
  Title: () => PopoverTitle,
  Trigger: () => PopoverTrigger,
  createPopoverScope: () => createPopoverScope
});
module.exports = __toCommonJS(index_exports);

// src/popover.tsx
var React = __toESM(require("react"));
var import_react_use_layout_effect = require("@radix-ui/react-use-layout-effect");
var import_primitive = require("@radix-ui/primitive");
var import_react_compose_refs = require("@radix-ui/react-compose-refs");
var import_react_context = require("@radix-ui/react-context");
var import_react_dismissable_layer = require("@radix-ui/react-dismissable-layer");
var import_react_focus_guards = require("@radix-ui/react-focus-guards");
var import_react_focus_scope = require("@radix-ui/react-focus-scope");
var import_react_id = require("@radix-ui/react-id");
var PopperPrimitive = __toESM(require("@radix-ui/react-popper"));
var import_react_popper = require("@radix-ui/react-popper");
var import_react_portal = require("@radix-ui/react-portal");
var import_react_presence = require("@radix-ui/react-presence");
var import_react_primitive = require("@radix-ui/react-primitive");
var import_react_slot = require("@radix-ui/react-slot");
var import_react_use_controllable_state = require("@radix-ui/react-use-controllable-state");
var import_aria_hidden = require("aria-hidden");
var import_react_remove_scroll = require("react-remove-scroll");
var import_jsx_runtime = require("react/jsx-runtime");
var POPOVER_NAME = "Popover";
var [createPopoverContext, createPopoverScope] = (0, import_react_context.createContextScope)(POPOVER_NAME, [
  import_react_popper.createPopperScope
]);
var usePopperScope = (0, import_react_popper.createPopperScope)();
var [PopoverProvider, usePopoverContext] = createPopoverContext(POPOVER_NAME);
var Popover = /* @__PURE__ */ __name((props) => {
  const {
    __scopePopover,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    modal = false
  } = props;
  const popperScope = usePopperScope(__scopePopover);
  const triggerRef = React.useRef(null);
  const [hasCustomAnchor, setHasCustomAnchor] = React.useState(false);
  const [titleCount, setTitleCount] = React.useState(0);
  const [descriptionCount, setDescriptionCount] = React.useState(0);
  const [open, setOpen] = (0, import_react_use_controllable_state.useControllableState)({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: POPOVER_NAME
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopperPrimitive.Root, { ...popperScope, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    PopoverProvider,
    {
      scope: __scopePopover,
      contentId: (0, import_react_id.useId)(),
      titleId: (0, import_react_id.useId)(),
      descriptionId: (0, import_react_id.useId)(),
      titlePresent: titleCount > 0,
      descriptionPresent: descriptionCount > 0,
      setTitleCount,
      setDescriptionCount,
      triggerRef,
      open,
      onOpenChange: setOpen,
      onOpenToggle: React.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
      hasCustomAnchor,
      onCustomAnchorAdd: React.useCallback(() => setHasCustomAnchor(true), []),
      onCustomAnchorRemove: React.useCallback(() => setHasCustomAnchor(false), []),
      modal,
      children
    }
  ) });
}, "Popover");
var ANCHOR_NAME = "PopoverAnchor";
var PopoverAnchor = /* @__PURE__ */ React.forwardRef(
  /* @__PURE__ */ __name(function PopoverAnchor2(props, forwardedRef) {
    const { __scopePopover, ...anchorProps } = props;
    const context = usePopoverContext(ANCHOR_NAME, __scopePopover);
    const popperScope = usePopperScope(__scopePopover);
    const { onCustomAnchorAdd, onCustomAnchorRemove } = context;
    React.useEffect(() => {
      onCustomAnchorAdd();
      return () => onCustomAnchorRemove();
    }, [onCustomAnchorAdd, onCustomAnchorRemove]);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopperPrimitive.Anchor, { ...popperScope, ...anchorProps, ref: forwardedRef });
  }, "PopoverAnchor")
);
var TRIGGER_NAME = "PopoverTrigger";
var PopoverTrigger = /* @__PURE__ */ React.forwardRef(
  /* @__PURE__ */ __name(function PopoverTrigger2(props, forwardedRef) {
    const { __scopePopover, ...triggerProps } = props;
    const context = usePopoverContext(TRIGGER_NAME, __scopePopover);
    const popperScope = usePopperScope(__scopePopover);
    const composedTriggerRef = (0, import_react_compose_refs.useComposedRefs)(forwardedRef, context.triggerRef);
    const trigger = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_react_primitive.Primitive.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": context.open,
        "aria-controls": context.open ? context.contentId : void 0,
        "data-state": getState(context.open),
        ...triggerProps,
        ref: composedTriggerRef,
        onClick: (0, import_primitive.composeEventHandlers)(props.onClick, context.onOpenToggle)
      }
    );
    return context.hasCustomAnchor ? trigger : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopperPrimitive.Anchor, { asChild: true, ...popperScope, children: trigger });
  }, "PopoverTrigger")
);
var PORTAL_NAME = "PopoverPortal";
var [PortalProvider, usePortalContext] = createPopoverContext(PORTAL_NAME, {
  forceMount: void 0
});
var PopoverPortal = /* @__PURE__ */ __name((props) => {
  const { __scopePopover, forceMount, children, container } = props;
  const context = usePopoverContext(PORTAL_NAME, __scopePopover);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalProvider, { scope: __scopePopover, forceMount, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_presence.Presence, { present: forceMount || context.open, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_portal.Portal, { asChild: true, container, children }) }) });
}, "PopoverPortal");
var CONTENT_NAME = "PopoverContent";
var PopoverContent = /* @__PURE__ */ React.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ __name(function PopoverContent2(props, forwardedRef) {
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopePopover);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = usePopoverContext(CONTENT_NAME, props.__scopePopover);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_presence.Presence, { present: forceMount || context.open, children: context.modal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContentNonModal, { ...contentProps, ref: forwardedRef }) });
  }, "PopoverContent")
);
var Slot = (0, import_react_slot.createSlot)("PopoverContent.RemoveScroll");
var PopoverContentModal = /* @__PURE__ */ React.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ __name(function PopoverContentModal2(props, forwardedRef) {
    const context = usePopoverContext(CONTENT_NAME, props.__scopePopover);
    const contentRef = React.useRef(null);
    const composedRefs = (0, import_react_compose_refs.useComposedRefs)(forwardedRef, contentRef);
    const isRightClickOutsideRef = React.useRef(false);
    const { nodes: branchNodes, registry: branchRegistry } = (0, import_react_focus_scope.useFocusScopeBranchRegistry)();
    React.useEffect(() => {
      const content = contentRef.current;
      if (content) return (0, import_aria_hidden.hideOthers)(content);
    }, []);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_react_remove_scroll.RemoveScroll,
      {
        as: Slot,
        allowPinchZoom: true,
        shards: React.useMemo(
          () => [contentRef, ...branchNodes.map((node) => ({ current: node }))],
          [contentRef, branchNodes]
        ),
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          PopoverContentImpl,
          {
            ...props,
            ref: composedRefs,
            branchNodes,
            branchRegistry,
            trapFocus: context.open,
            disableOutsidePointerEvents: true,
            onCloseAutoFocus: (0, import_primitive.composeEventHandlers)(props.onCloseAutoFocus, (event) => {
              event.preventDefault();
              if (!isRightClickOutsideRef.current) context.triggerRef.current?.focus();
            }),
            onPointerDownOutside: (0, import_primitive.composeEventHandlers)(
              props.onPointerDownOutside,
              (event) => {
                const originalEvent = event.detail.originalEvent;
                const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
                const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
                isRightClickOutsideRef.current = isRightClick;
              },
              { checkForDefaultPrevented: false }
            ),
            onFocusOutside: (0, import_primitive.composeEventHandlers)(
              props.onFocusOutside,
              (event) => event.preventDefault(),
              { checkForDefaultPrevented: false }
            )
          }
        )
      }
    );
  }, "PopoverContentModal")
);
var PopoverContentNonModal = /* @__PURE__ */ React.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ __name(function PopoverContentNonModal2(props, forwardedRef) {
    const context = usePopoverContext(CONTENT_NAME, props.__scopePopover);
    const hasInteractedOutsideRef = React.useRef(false);
    const hasPointerDownOutsideRef = React.useRef(false);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      PopoverContentImpl,
      {
        ...props,
        ref: forwardedRef,
        trapFocus: false,
        disableOutsidePointerEvents: false,
        onCloseAutoFocus: (event) => {
          props.onCloseAutoFocus?.(event);
          if (!event.defaultPrevented) {
            if (!hasInteractedOutsideRef.current) context.triggerRef.current?.focus();
            event.preventDefault();
          }
          hasInteractedOutsideRef.current = false;
          hasPointerDownOutsideRef.current = false;
        },
        onInteractOutside: (event) => {
          props.onInteractOutside?.(event);
          if (!event.defaultPrevented) {
            hasInteractedOutsideRef.current = true;
            if (event.detail.originalEvent.type === "pointerdown") {
              hasPointerDownOutsideRef.current = true;
            }
          }
          const target = event.target;
          const targetIsTrigger = context.triggerRef.current?.contains(target);
          if (targetIsTrigger) event.preventDefault();
          if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
            event.preventDefault();
          }
        }
      }
    );
  }, "PopoverContentNonModal")
);
var PopoverContentImpl = /* @__PURE__ */ React.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ __name(function PopoverContentImpl2(props, forwardedRef) {
    const {
      __scopePopover,
      trapFocus,
      onOpenAutoFocus,
      onCloseAutoFocus,
      disableOutsidePointerEvents,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      "aria-describedby": ariaDescribedby,
      branchNodes,
      branchRegistry,
      ...contentProps
    } = props;
    const context = usePopoverContext(CONTENT_NAME, __scopePopover);
    const popperScope = usePopperScope(__scopePopover);
    const [contentNode, setContentNode] = React.useState(null);
    const composedRefs = (0, import_react_compose_refs.useComposedRefs)(forwardedRef, setContentNode);
    (0, import_react_focus_scope.useFocusScopeBranch)(contentNode);
    (0, import_react_focus_guards.useFocusGuards)();
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_focus_scope.FocusScopeBranchProvider, { registry: branchRegistry, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_react_focus_scope.FocusScope,
      {
        asChild: true,
        loop: true,
        trapped: trapFocus,
        branches: branchNodes,
        onMountAutoFocus: onOpenAutoFocus,
        onUnmountAutoFocus: onCloseAutoFocus,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_react_dismissable_layer.DismissableLayer,
          {
            asChild: true,
            disableOutsidePointerEvents,
            onInteractOutside,
            onEscapeKeyDown,
            onPointerDownOutside,
            onFocusOutside,
            onDismiss: () => context.onOpenChange(false),
            deferPointerDownOutside: true,
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              PopperPrimitive.Content,
              {
                "data-state": getState(context.open),
                role: "dialog",
                id: context.contentId,
                "aria-labelledby": context.titlePresent ? context.titleId : void 0,
                "aria-describedby": context.descriptionPresent ? concatAriaDescribedby(ariaDescribedby, context.descriptionId) : ariaDescribedby,
                ...popperScope,
                ...contentProps,
                ref: composedRefs,
                style: {
                  ...contentProps.style,
                  // re-namespace exposed content custom properties
                  ...{
                    "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
                    "--radix-popover-content-available-width": "var(--radix-popper-available-width)",
                    "--radix-popover-content-available-height": "var(--radix-popper-available-height)",
                    "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
                    "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
                  }
                }
              }
            )
          }
        )
      }
    ) });
  }, "PopoverContentImpl")
);
var PopoverTitle = /* @__PURE__ */ React.forwardRef(
  /* @__PURE__ */ __name(function PopoverTitle2(props, forwardedRef) {
    const { __scopePopover, ...titleProps } = props;
    const context = usePopoverContext("PopoverTitle", __scopePopover);
    const { setTitleCount } = context;
    (0, import_react_use_layout_effect.useLayoutEffect)(() => {
      setTitleCount((count) => count + 1);
      return () => setTitleCount((count) => count - 1);
    }, [setTitleCount]);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_primitive.Primitive.h2, { id: context.titleId, ...titleProps, ref: forwardedRef });
  }, "PopoverTitle")
);
var PopoverDescription = /* @__PURE__ */ React.forwardRef(/* @__PURE__ */ __name(function PopoverDescription2(props, forwardedRef) {
  const { __scopePopover, ...descriptionProps } = props;
  const context = usePopoverContext("PopoverDescription", __scopePopover);
  const { setDescriptionCount } = context;
  (0, import_react_use_layout_effect.useLayoutEffect)(() => {
    setDescriptionCount((count) => count + 1);
    return () => setDescriptionCount((count) => count - 1);
  }, [setDescriptionCount]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_primitive.Primitive.p, { id: context.descriptionId, ...descriptionProps, ref: forwardedRef });
}, "PopoverDescription"));
var CLOSE_NAME = "PopoverClose";
var PopoverClose = /* @__PURE__ */ React.forwardRef(
  /* @__PURE__ */ __name(function PopoverClose2(props, forwardedRef) {
    const { __scopePopover, ...closeProps } = props;
    const context = usePopoverContext(CLOSE_NAME, __scopePopover);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_react_primitive.Primitive.button,
      {
        type: "button",
        ...closeProps,
        ref: forwardedRef,
        onClick: (0, import_primitive.composeEventHandlers)(props.onClick, () => context.onOpenChange(false))
      }
    );
  }, "PopoverClose")
);
var PopoverArrow = /* @__PURE__ */ React.forwardRef(
  /* @__PURE__ */ __name(function PopoverArrow2(props, forwardedRef) {
    const { __scopePopover, ...arrowProps } = props;
    const popperScope = usePopperScope(__scopePopover);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopperPrimitive.Arrow, { ...popperScope, ...arrowProps, ref: forwardedRef });
  }, "PopoverArrow")
);
function getState(open) {
  return open ? "open" : "closed";
}
__name(getState, "getState");
function concatAriaDescribedby(...values) {
  const ids = /* @__PURE__ */ new Set();
  for (const value of values) {
    if (typeof value !== "string") continue;
    for (const id of String(value).trim().split(/\s+/)) {
      if (id) ids.add(id);
    }
  }
  return ids.size > 0 ? Array.from(ids).join(" ") : void 0;
}
__name(concatAriaDescribedby, "concatAriaDescribedby");
//# sourceMappingURL=index.js.map
