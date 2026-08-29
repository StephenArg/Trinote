var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/use-is-hydrated.tsx
import * as React2 from "react";

// src/use-is-hydrated-legacy.ts
import * as React from "react";
var _isHydrated = false;
function useIsHydrated() {
  const [isHydrated, setIsHydrated] = React.useState(_isHydrated);
  React.useEffect(() => {
    if (!_isHydrated) {
      _isHydrated = true;
      setIsHydrated(true);
    }
  }, []);
  return isHydrated;
}
__name(useIsHydrated, "useIsHydrated");

// src/use-is-hydrated.tsx
var useReactSyncExternalStore = React2[" useSyncExternalStore ".trim().toString()];
function subscribe() {
  return () => {
  };
}
__name(subscribe, "subscribe");
function useIsHydratedModern() {
  return useReactSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
__name(useIsHydratedModern, "useIsHydratedModern");
var useIsHydrated2 = typeof useReactSyncExternalStore === "function" ? useIsHydratedModern : useIsHydrated;
export {
  useIsHydrated2 as useIsHydrated
};
//# sourceMappingURL=index.mjs.map
