var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/separator.tsx
import * as React from "react";
import { Primitive } from "@radix-ui/react-primitive";
import { jsx } from "react/jsx-runtime";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator = /* @__PURE__ */ React.forwardRef(
  /* @__PURE__ */ __name(function Separator2(props, forwardedRef) {
    const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
    const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
    const ariaOrientation = orientation === "vertical" ? orientation : void 0;
    const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
    return /* @__PURE__ */ jsx(
      Primitive.div,
      {
        "data-orientation": orientation,
        ...semanticProps,
        ...domProps,
        ref: forwardedRef
      }
    );
  }, "Separator")
);
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
__name(isValidOrientation, "isValidOrientation");
var Root = Separator;
export {
  Root,
  Separator
};
//# sourceMappingURL=index.mjs.map
