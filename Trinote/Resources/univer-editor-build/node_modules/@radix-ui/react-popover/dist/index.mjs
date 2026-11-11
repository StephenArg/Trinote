"use client";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/popover.tsx
import * as React from "react";
import { useLayoutEffect } from "@radix-ui/react-use-layout-effect";
import { composeEventHandlers } from "@radix-ui/primitive";
import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { createContextScope } from "@radix-ui/react-context";
import { DismissableLayer } from "@radix-ui/react-dismissable-layer";
import { useFocusGuards } from "@radix-ui/react-focus-guards";
import {
  FocusScope,
  FocusScopeBranchProvider,
  useFocusScopeBranch,
  useFocusScopeBranchRegistry
} from "@radix-ui/react-focus-scope";
import { useId } from "@radix-ui/react-id";
import * as PopperPrimitive from "@radix-ui/react-popper";
import { createPopperScope } from "@radix-ui/react-popper";
import { Portal as PortalPrimitive } from "@radix-ui/react-portal";
import { Presence } from "@radix-ui/react-presence";
import { Primitive } from "@radix-ui/react-primitive";
import { createSlot } from "@radix-ui/react-slot";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { hideOthers } from "aria-hidden";
import { RemoveScroll } from "react-remove-scroll";
import { jsx } from "react/jsx-runtime";
var POPOVER_NAME = "Popover";
var [createPopoverContext, createPopoverScope] = createContextScope(POPOVER_NAME, [
  createPopperScope
]);
var usePopperScope = createPopperScope();
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
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: POPOVER_NAME
  });
  return /* @__PURE__ */ jsx(PopperPrimitive.Root, { ...popperScope, children: /* @__PURE__ */ jsx(
    PopoverProvider,
    {
      scope: __scopePopover,
      contentId: useId(),
      titleId: useId(),
      descriptionId: useId(),
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
    return /* @__PURE__ */ jsx(PopperPrimitive.Anchor, { ...popperScope, ...anchorProps, ref: forwardedRef });
  }, "PopoverAnchor")
);
var TRIGGER_NAME = "PopoverTrigger";
var PopoverTrigger = /* @__PURE__ */ React.forwardRef(
  /* @__PURE__ */ __name(function PopoverTrigger2(props, forwardedRef) {
    const { __scopePopover, ...triggerProps } = props;
    const context = usePopoverContext(TRIGGER_NAME, __scopePopover);
    const popperScope = usePopperScope(__scopePopover);
    const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
    const trigger = /* @__PURE__ */ jsx(
      Primitive.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": context.open,
        "aria-controls": context.open ? context.contentId : void 0,
        "data-state": getState(context.open),
        ...triggerProps,
        ref: composedTriggerRef,
        onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
      }
    );
    return context.hasCustomAnchor ? trigger : /* @__PURE__ */ jsx(PopperPrimitive.Anchor, { asChild: true, ...popperScope, children: trigger });
  }, "PopoverTrigger")
);
var PORTAL_NAME = "PopoverPortal";
var [PortalProvider, usePortalContext] = createPopoverContext(PORTAL_NAME, {
  forceMount: void 0
});
var PopoverPortal = /* @__PURE__ */ __name((props) => {
  const { __scopePopover, forceMount, children, container } = props;
  const context = usePopoverContext(PORTAL_NAME, __scopePopover);
  return /* @__PURE__ */ jsx(PortalProvider, { scope: __scopePopover, forceMount, children: /* @__PURE__ */ jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsx(PortalPrimitive, { asChild: true, container, children }) }) });
}, "PopoverPortal");
var CONTENT_NAME = "PopoverContent";
var PopoverContent = /* @__PURE__ */ React.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ __name(function PopoverContent2(props, forwardedRef) {
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopePopover);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = usePopoverContext(CONTENT_NAME, props.__scopePopover);
    return /* @__PURE__ */ jsx(Presence, { present: forceMount || context.open, children: context.modal ? /* @__PURE__ */ jsx(PopoverContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ jsx(PopoverContentNonModal, { ...contentProps, ref: forwardedRef }) });
  }, "PopoverContent")
);
var Slot = createSlot("PopoverContent.RemoveScroll");
var PopoverContentModal = /* @__PURE__ */ React.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ __name(function PopoverContentModal2(props, forwardedRef) {
    const context = usePopoverContext(CONTENT_NAME, props.__scopePopover);
    const contentRef = React.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    const isRightClickOutsideRef = React.useRef(false);
    const { nodes: branchNodes, registry: branchRegistry } = useFocusScopeBranchRegistry();
    React.useEffect(() => {
      const content = contentRef.current;
      if (content) return hideOthers(content);
    }, []);
    return /* @__PURE__ */ jsx(
      RemoveScroll,
      {
        as: Slot,
        allowPinchZoom: true,
        shards: React.useMemo(
          () => [contentRef, ...branchNodes.map((node) => ({ current: node }))],
          [contentRef, branchNodes]
        ),
        children: /* @__PURE__ */ jsx(
          PopoverContentImpl,
          {
            ...props,
            ref: composedRefs,
            branchNodes,
            branchRegistry,
            trapFocus: context.open,
            disableOutsidePointerEvents: true,
            onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
              event.preventDefault();
              if (!isRightClickOutsideRef.current) context.triggerRef.current?.focus();
            }),
            onPointerDownOutside: composeEventHandlers(
              props.onPointerDownOutside,
              (event) => {
                const originalEvent = event.detail.originalEvent;
                const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
                const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
                isRightClickOutsideRef.current = isRightClick;
              },
              { checkForDefaultPrevented: false }
            ),
            onFocusOutside: composeEventHandlers(
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
    return /* @__PURE__ */ jsx(
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
    const composedRefs = useComposedRefs(forwardedRef, setContentNode);
    useFocusScopeBranch(contentNode);
    useFocusGuards();
    return /* @__PURE__ */ jsx(FocusScopeBranchProvider, { registry: branchRegistry, children: /* @__PURE__ */ jsx(
      FocusScope,
      {
        asChild: true,
        loop: true,
        trapped: trapFocus,
        branches: branchNodes,
        onMountAutoFocus: onOpenAutoFocus,
        onUnmountAutoFocus: onCloseAutoFocus,
        children: /* @__PURE__ */ jsx(
          DismissableLayer,
          {
            asChild: true,
            disableOutsidePointerEvents,
            onInteractOutside,
            onEscapeKeyDown,
            onPointerDownOutside,
            onFocusOutside,
            onDismiss: () => context.onOpenChange(false),
            deferPointerDownOutside: true,
            children: /* @__PURE__ */ jsx(
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
    useLayoutEffect(() => {
      setTitleCount((count) => count + 1);
      return () => setTitleCount((count) => count - 1);
    }, [setTitleCount]);
    return /* @__PURE__ */ jsx(Primitive.h2, { id: context.titleId, ...titleProps, ref: forwardedRef });
  }, "PopoverTitle")
);
var PopoverDescription = /* @__PURE__ */ React.forwardRef(/* @__PURE__ */ __name(function PopoverDescription2(props, forwardedRef) {
  const { __scopePopover, ...descriptionProps } = props;
  const context = usePopoverContext("PopoverDescription", __scopePopover);
  const { setDescriptionCount } = context;
  useLayoutEffect(() => {
    setDescriptionCount((count) => count + 1);
    return () => setDescriptionCount((count) => count - 1);
  }, [setDescriptionCount]);
  return /* @__PURE__ */ jsx(Primitive.p, { id: context.descriptionId, ...descriptionProps, ref: forwardedRef });
}, "PopoverDescription"));
var CLOSE_NAME = "PopoverClose";
var PopoverClose = /* @__PURE__ */ React.forwardRef(
  /* @__PURE__ */ __name(function PopoverClose2(props, forwardedRef) {
    const { __scopePopover, ...closeProps } = props;
    const context = usePopoverContext(CLOSE_NAME, __scopePopover);
    return /* @__PURE__ */ jsx(
      Primitive.button,
      {
        type: "button",
        ...closeProps,
        ref: forwardedRef,
        onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
      }
    );
  }, "PopoverClose")
);
var PopoverArrow = /* @__PURE__ */ React.forwardRef(
  /* @__PURE__ */ __name(function PopoverArrow2(props, forwardedRef) {
    const { __scopePopover, ...arrowProps } = props;
    const popperScope = usePopperScope(__scopePopover);
    return /* @__PURE__ */ jsx(PopperPrimitive.Arrow, { ...popperScope, ...arrowProps, ref: forwardedRef });
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
export {
  PopoverAnchor as Anchor,
  PopoverArrow as Arrow,
  PopoverClose as Close,
  PopoverContent as Content,
  PopoverDescription as Description,
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverPortal,
  PopoverTitle,
  PopoverTrigger,
  PopoverPortal as Portal,
  Popover as Root,
  PopoverTitle as Title,
  PopoverTrigger as Trigger,
  createPopoverScope
};
//# sourceMappingURL=index.mjs.map
