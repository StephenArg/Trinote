(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ?  factory(exports, require('@wendellhu/redi'), require('react'), require('react/jsx-runtime')) :
  typeof define === 'function' && define.amd ? define(['exports', '@wendellhu/redi', 'react', 'react/jsx-runtime'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global["@wendellhu/redi/react-bindings"] = {}), global["@wendellhu/redi"],global.React,global.React));
})(this, function(exports, __wendellhu_redi, react, react_jsx_runtime) {
//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion
__wendellhu_redi = __toESM(__wendellhu_redi);
react = __toESM(react);
react_jsx_runtime = __toESM(react_jsx_runtime);

//#region src/react-bindings/reactContext.tsx
/**
* React Context for dependency injection.
*
* This context provides access to the Injector instance throughout
* the React component tree. Use `RediProvider` to provide an injector,
* and `useDependency`/`useInjector` hooks to consume dependencies.
*
* For most use cases, prefer using `connectInjector` or `connectDependencies`
* instead of using this context directly.
*
* @example
* ```tsx
* // Direct usage (advanced)
* const injector = new Injector([[MyService]]);
*
* function App() {
*   return (
*     <RediContext.Provider value={{ injector }}>
*       <MyComponent />
*     </RediContext.Provider>
*   );
* }
* ```
*/
const RediContext = (0, react.createContext)({ injector: null });
RediContext.displayName = "RediContext";
/**
* Provider component for RediContext.
*
* Use this to provide an Injector to the component tree.
* Prefer using `connectInjector` or `connectDependencies` for simpler usage.
*/
const RediProvider = RediContext.Provider;
/**
* Consumer component for RediContext.
*
* Use this to access the injector in class components or render props patterns.
* For functional components, prefer using `useInjector` hook instead.
*/
const RediConsumer = RediContext.Consumer;

//#endregion
//#region src/react-bindings/reactComponent.tsx
function RediInjector(props) {
	const { children, dependencies } = props;
	const childInjectorRef = (0, react.useRef)(null);
	(0, react.useEffect)(() => () => childInjectorRef.current?.dispose(), []);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RediConsumer, { children: (context) => {
		let childInjector;
		/* istanbul ignore next -- @preserve */
		if (childInjectorRef.current) childInjector = childInjectorRef.current;
		else {
			childInjector = context.injector ? context.injector.createChild(dependencies) : new __wendellhu_redi.Injector(dependencies);
			childInjectorRef.current = childInjector;
		}
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RediProvider, {
			value: { injector: childInjector },
			children
		});
	} });
}
/**
* Connect a React component to a specific Injector instance.
*
* Wraps the component with a RediProvider, making the injector available
* to all child components via `useDependency` and `useInjector` hooks.
*
* Use this when you have an existing Injector instance that you want
* to make available to a React component tree.
*
* @param Comp - The React component to wrap.
* @param injector - The Injector instance to provide.
* @returns A new component that provides the injector via context.
*
* @example
* ```tsx
* const injector = new Injector([[UserService], [ILogger, { useClass: ConsoleLogger }]]);
*
* const App = connectInjector(MyApp, injector);
*
* // Now MyApp and all its children can use useDependency
* ReactDOM.render(<App />, document.getElementById('root'));
* ```
*/
function connectInjector(Comp, injector) {
	return function ComponentWithInjector(props) {
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RediProvider, {
			value: { injector },
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Comp, { ...props })
		});
	};
}
/**
* Connect a React component with a set of dependencies.
*
* Creates a new Injector (or child injector if inside an existing context)
* with the specified dependencies, and provides it to the component tree.
*
* The injector is automatically disposed when the component unmounts.
*
* @param Comp - The React component to wrap.
* @param dependencies - An array of dependencies to register.
* @returns A new component that provides the dependencies via context.
*
* @example
* ```tsx
* const App = connectDependencies(MyApp, [
*   [UserService],
*   [ILogger, { useClass: ConsoleLogger }],
*   [IConfig, { useValue: { apiUrl: 'https://api.example.com' } }],
* ]);
*
* // MyApp and children can now use these dependencies
* function MyApp() {
*   const userService = useDependency(UserService);
*   return <div>{userService.getCurrentUser().name}</div>;
* }
* ```
*/
function connectDependencies(Comp, dependencies) {
	return function ComponentWithInjector(props) {
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RediInjector, {
			dependencies,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Comp, { ...props })
		});
	};
}

//#endregion
//#region src/react-bindings/reactDecorators.ts
var ClassComponentNotInRediContextError = class extends __wendellhu_redi.RediError {
	constructor(component) {
		super(`You should make "RediContext" as ${component.constructor.name}'s default context type. If you want to use multiple context, please check this on React doc site. https://reactjs.org/docs/context.html#classcontexttype`);
	}
};
/**
* A property decorator for React class components that injects a dependency.
*
* This decorator creates a getter that lazily retrieves the dependency
* from the component's context. The component must have `RediContext`
* set as its `contextType`.
*
* For functional components, use the `useDependency` hook instead.
*
* @param id - The dependency identifier.
* @param quantity - Optional quantity (REQUIRED, OPTIONAL, or MANY).
* @param lookUp - Optional lookup strategy (SELF or SKIP_SELF).
*
* @example
* ```tsx
* class MyComponent extends React.Component {
*   static contextType = RediContext;
*
*   @WithDependency(UserService)
*   private userService!: UserService;
*
*   @WithDependency(ICache, Quantity.OPTIONAL)
*   private cache!: ICache | null;
*
*   render() {
*     return <div>{this.userService.getCurrentUser().name}</div>;
*   }
* }
* ```
*/
function WithDependency(id, quantity, lookUp) {
	return function() {
		return { get() {
			const thisComponent = this;
			const context = thisComponent.context;
			if (!context || !context.injector) throw new ClassComponentNotInRediContextError(thisComponent);
			const injector = context.injector;
			const thing = injector.get(id, quantity || __wendellhu_redi.Quantity.REQUIRED, lookUp);
			return thing;
		} };
	};
}

//#endregion
//#region src/react-bindings/reactHooks.tsx
var HooksNotInRediContextError = class extends __wendellhu_redi.RediError {
	constructor() {
		super("Using dependency injection outside of a RediContext.");
	}
};
/**
* A React hook that returns the current Injector from the RediContext.
*
* Use this hook when you need direct access to the injector for
* dynamic dependency resolution or advanced use cases.
*
* @returns The current Injector instance.
* @throws {HooksNotInRediContextError} If used outside of a RediContext.
*
* @example
* ```tsx
* function MyComponent() {
*   const injector = useInjector();
*
*   const handleClick = () => {
*     // Dynamic resolution
*     const service = injector.get(SomeService);
*     service.doSomething();
*   };
*
*   return <button onClick={handleClick}>Click</button>;
* }
* ```
*/
function useInjector() {
	const injectionContext = (0, react.useContext)(RediContext);
	if (!injectionContext.injector) throw new HooksNotInRediContextError();
	return injectionContext.injector;
}
function useDependency(id, quantityOrLookUp, lookUp) {
	const injector = useInjector();
	return (0, react.useMemo)(() => injector.get(id, quantityOrLookUp, lookUp), [
		id,
		quantityOrLookUp,
		lookUp
	]);
}

//#endregion
//#region src/react-bindings/reactRx.tsx
function unwrap(o) {
	if (typeof o === "function") return o();
	return o;
}
/**
* Subscribe to an observable and return its value. The component will re-render when the observable emits a new value.
*
* @param observable An observable or a function that returns an observable
* @param defaultValue The default value of the observable. It the `observable` can omit an initial value, this value will be neglected.
* @param shouldHaveSyncValue If the observable should have a sync value. If it does not have a sync value, an error will be thrown.
* @param deps A dependency array to decide if we should re-subscribe when the `observable` is a function.
* @returns Value or null.
*/
function useObservable(observable, defaultValue, shouldHaveSyncValue, deps) {
	if (typeof observable === "function" && !deps) throw new __wendellhu_redi.RediError("Expected deps to be provided when observable is a function!");
	const destObservable = (0, react.useMemo)(() => observable, [...typeof deps !== "undefined" ? deps : [observable]]);
	const observableRef = (0, react.useRef)(void 0);
	const subscriptionRef = (0, react.useRef)(null);
	const syncReceivedValueRef = (0, react.useRef)(false);
	const [_, setRenderCounter] = (0, react.useState)(0);
	const valueRef = (0, react.useRef)(defaultValue ?? void 0);
	if (observableRef.current !== destObservable) {
		if (subscriptionRef.current) {
			subscriptionRef.current.unsubscribe();
			subscriptionRef.current = null;
		}
		observableRef.current = destObservable;
		if (destObservable) subscriptionRef.current = unwrap(destObservable).subscribe((value) => {
			valueRef.current = value;
			if (syncReceivedValueRef.current === false) syncReceivedValueRef.current = true;
			else setRenderCounter((prev) => (prev + 1) % Number.MAX_SAFE_INTEGER);
		});
	}
	if (shouldHaveSyncValue && !syncReceivedValueRef.current) throw new Error("[redi]: Expect `shouldHaveSyncValue` but not getting a sync value!");
	syncReceivedValueRef.current = true;
	return valueRef.current;
}
/**
* A React hook that re-renders the component when an Observable emits.
*
* This is useful when you have external state managed by RxJS and want
* to trigger a re-render whenever that state changes, without using
* the emitted value directly.
*
* @param update$ - An Observable that emits when the component should re-render.
*
* @example
* ```tsx
* function StatusIndicator() {
*   const statusService = useDependency(StatusService);
*
*   // Re-render whenever status changes
*   useUpdateBinder(statusService.statusChanged$);
*
*   return <div>{statusService.getCurrentStatus()}</div>;
* }
* ```
*/
function useUpdateBinder(update$) {
	const [, dumpSet] = (0, react.useState)(0);
	(0, react.useEffect)(() => {
		const subscription = update$.subscribe(() => dumpSet((prev) => prev + 1));
		return () => subscription.unsubscribe();
	}, []);
}

//#endregion
//#region src/react-bindings/publicApi.ts
const __REDI_CONTEXT_LOCK__ = "REDI_CONTEXT_LOCK";
const isNode = typeof process !== "undefined" && process.versions != null && process.versions.node != null;
const globalObject = typeof globalThis !== "undefined" && globalThis || typeof window !== "undefined" && window || typeof global !== "undefined" && global;
if (!globalObject[__REDI_CONTEXT_LOCK__]) globalObject[__REDI_CONTEXT_LOCK__] = true;
else if (!isNode) console.error("[redi]: \"RediContext\" is already created. You may import \"RediContext\" from different paths. Use \"import { RediContext } from '@wendellhu/redi/react-bindings'; instead.\"");

//#endregion
exports.RediConsumer = RediConsumer;
exports.RediContext = RediContext;
exports.RediProvider = RediProvider;
exports.WithDependency = WithDependency;
exports.connectDependencies = connectDependencies;
exports.connectInjector = connectInjector;
exports.useDependency = useDependency;
exports.useInjector = useInjector;
exports.useObservable = useObservable;
exports.useUpdateBinder = useUpdateBinder;
});
//# sourceMappingURL=index.js.map