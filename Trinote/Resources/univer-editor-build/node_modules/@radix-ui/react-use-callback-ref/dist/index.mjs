var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/use-callback-ref.tsx
import { useLayoutEffect } from "@radix-ui/react-use-layout-effect";
import * as React from "react";
var useReactInsertionEffect = React[" useInsertionEffect ".trim().toString()];
function useCallbackRef(callback) {
  const callbackRef = React.useRef(callback);
  if (typeof useReactInsertionEffect === "function") {
    useReactInsertionEffect(() => {
      callbackRef.current = callback;
    });
  } else {
    useLayoutEffect(() => {
      callbackRef.current = callback;
    });
  }
  return React.useMemo(() => ((...args) => callbackRef.current?.(...args)), []);
}
__name(useCallbackRef, "useCallbackRef");
export {
  useCallbackRef
};
//# sourceMappingURL=index.mjs.map
