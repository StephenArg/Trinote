type AnyFunction = (...args: any[]) => any;
/**
 * A custom hook that converts a callback to a ref to avoid triggering
 * re-renders when passed as a prop or avoid re-executing effects when passed as
 * a dependency.
 */
declare function useCallbackRef<T extends AnyFunction>(callback: T | undefined): T;

export { useCallbackRef };
