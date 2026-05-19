(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ?  factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global["@wendellhu/redi"] = {})));
})(this, function(exports) {

//#region src/dependencyIdentifier.ts
const IdentifierDecoratorSymbol = Symbol("$$IDENTIFIER_DECORATOR");
function isIdentifierDecorator(thing) {
	return thing && thing[IdentifierDecoratorSymbol] === true;
}

//#endregion
//#region src/dependencyItem.ts
/**
* Type guard to check if a value is a constructor function.
*
* @param thing - The value to check.
* @returns `true` if the value is a function (constructor), `false` otherwise.
*/
function isCtor(thing) {
	return typeof thing === "function";
}
/**
* Type guard to check if a value is a ClassDependencyItem.
*
* @param thing - The value to check.
* @returns `true` if the value has a `useClass` property.
*/
function isClassDependencyItem(thing) {
	if (thing && typeof thing.useClass !== "undefined") return true;
	return false;
}
/**
* Type guard to check if a value is a FactoryDependencyItem.
*
* @param thing - The value to check.
* @returns `true` if the value has a `useFactory` property.
*/
function isFactoryDependencyItem(thing) {
	if (thing && typeof thing.useFactory !== "undefined") return true;
	return false;
}
/**
* Type guard to check if a value is a ValueDependencyItem.
*
* @param thing - The value to check.
* @returns `true` if the value has a `useValue` property.
*/
function isValueDependencyItem(thing) {
	if (thing && typeof thing.useValue !== "undefined") return true;
	return false;
}
function isExistingDependencyItem(thing) {
	if (thing && typeof thing.useExisting !== "undefined") return true;
	return false;
}
/**
* Type guard to check if a value is an AsyncDependencyItem.
*
* @param thing - The value to check.
* @returns `true` if the value has a `useAsync` property.
*/
function isAsyncDependencyItem(thing) {
	if (thing && typeof thing.useAsync !== "undefined") return true;
	return false;
}
const AsyncHookSymbol = Symbol("AsyncHook");
/**
* Type guard to check if a value is an AsyncHook.
*
* @param thing - The value to check.
* @returns `true` if the value is an AsyncHook.
*/
function isAsyncHook(thing) {
	if (thing && thing.__symbol === AsyncHookSymbol) return true;
	return false;
}
function prettyPrintIdentifier(id) {
	return isCtor(id) && !id[IdentifierDecoratorSymbol] ? id.name : id.toString();
}

//#endregion
//#region src/error.ts
/**
* Base error class for all errors thrown by redi.
*
* All error messages are prefixed with `[redi]:` for easy identification.
*
* @example
* ```typescript
* try {
*   injector.get(UnregisteredService);
* } catch (error) {
*   if (error instanceof RediError) {
*     console.error('Redi error:', error.message);
*   }
* }
* ```
*/
var RediError = class extends Error {
	constructor(message) {
		super(`[redi]: ${message}`);
	}
};

//#endregion
//#region src/types.ts
/**
* Specifies how many instances of a dependency should be retrieved.
*
* - `REQUIRED`: Exactly one instance must exist (default behavior)
* - `OPTIONAL`: Zero or one instance, returns `null` if not found
* - `MANY`: All registered instances as an array
*/
let Quantity = /* @__PURE__ */ function(Quantity$1) {
	/** Retrieve all registered instances as an array. */
	Quantity$1["MANY"] = "many";
	/** Retrieve zero or one instance. Returns `null` if not registered. */
	Quantity$1["OPTIONAL"] = "optional";
	/** Exactly one instance must be registered (default). Throws if not found. */
	Quantity$1["REQUIRED"] = "required";
	return Quantity$1;
}({});
/**
* Specifies which injectors should be searched when resolving a dependency.
*
* - `SELF`: Only search the current injector
* - `SKIP_SELF`: Skip the current injector, start from parent
*/
let LookUp = /* @__PURE__ */ function(LookUp$1) {
	/** Only search in the current injector, do not look in parent injectors. */
	LookUp$1["SELF"] = "self";
	/** Skip the current injector and start searching from the parent injector. */
	LookUp$1["SKIP_SELF"] = "skipSelf";
	return LookUp$1;
}({});

//#endregion
//#region src/decorators.ts
const TARGET = Symbol("$$TARGET");
const DEPENDENCIES = Symbol("$$DEPENDENCIES");
var DependencyDescriptorNotFoundError = class extends RediError {
	constructor(index, target) {
		const msg = `Could not find dependency registered on the ${index} (indexed) parameter of the constructor of "${prettyPrintIdentifier(target)}".`;
		super(msg);
	}
};
var RequiredDecoratorMisusedError = class extends RediError {
	constructor(target, index) {
		const msg = `It seems that you forgot to provide a parameter to @Required() on the ${index}th parameter of "${prettyPrintIdentifier(target)}"`;
		super(msg);
	}
};
var IdentifierUndefinedError = class extends RediError {
	constructor(target, index) {
		const msg = `It seems that you register "undefined" as dependency on the ${index}th parameter of "${prettyPrintIdentifier(target)}". Please make sure that there is not cyclic dependency among your TypeScript files, or consider using "forwardRef". For more info please visit our website https://redi.wendell.fun/docs/faq#could-not-find-dependency-registered-on`;
		super(msg);
	}
};
/**
* @internal
*/
function getDependencies(registerTarget) {
	const target = registerTarget;
	return target[DEPENDENCIES] || [];
}
/**
* @internal
*/
function getDependencyByIndex(registerTarget, index) {
	const allDependencies = getDependencies(registerTarget);
	const dep = allDependencies.find((descriptor) => descriptor.paramIndex === index);
	if (!dep) throw new DependencyDescriptorNotFoundError(index, registerTarget);
	return dep;
}
/**
* @internal
*/
function setDependency(registerTarget, identifier, paramIndex, quantity = Quantity.REQUIRED, lookUp) {
	const descriptor = {
		paramIndex,
		identifier,
		quantity,
		lookUp,
		withNew: false
	};
	if (typeof identifier === "undefined") throw new IdentifierUndefinedError(registerTarget, paramIndex);
	const target = registerTarget;
	if (target[TARGET] === target) target[DEPENDENCIES].push(descriptor);
	else {
		target[DEPENDENCIES] = [descriptor];
		target[TARGET] = target;
	}
}
const knownIdentifiers = /* @__PURE__ */ new Set();
const cachedIdentifiers = /* @__PURE__ */ new Map();
/**
* Create a dependency identifier for interface-based injection.
*
* Since TypeScript interfaces are erased at runtime, you cannot use them directly
* as injection tokens. This function creates a unique identifier that can be used
* to register and retrieve dependencies that implement an interface.
*
* The returned identifier can also be used as a decorator.
*
* @param id - A unique string name for the identifier. Should be unique across your application.
* @returns An identifier that can be used both as a dependency token and as a parameter decorator.
*
* @example
* ```typescript
* interface ILogger {
*   log(message: string): void;
* }
*
* const ILogger = createIdentifier<ILogger>('ILogger');
*
* class ConsoleLogger implements ILogger {
*   log(message: string) { console.log(message); }
* }
*
* // Use as decorator
* class MyService {
*   constructor(@ILogger private logger: ILogger) {}
* }
*
* // Register in injector
* const injector = new Injector([[ILogger, { useClass: ConsoleLogger }]]);
* ```
*/
function createIdentifier(id) {
	if (knownIdentifiers.has(id)) {
		console.error(`Identifier "${id}" already exists. Returning the cached identifier decorator.`);
		return cachedIdentifiers.get(id);
	}
	const decorator = function(registerTarget, _key, index) {
		setDependency(registerTarget, decorator, index);
	};
	decorator.decoratorName = id;
	decorator.toString = () => decorator.decoratorName;
	decorator[IdentifierDecoratorSymbol] = true;
	knownIdentifiers.add(id);
	cachedIdentifiers.set(id, decorator);
	return decorator;
}

//#endregion
//#region src/dependencyLookUp.ts
function changeLookup(target, index, lookUp) {
	const descriptor = getDependencyByIndex(target, index);
	descriptor.lookUp = lookUp;
}
function lookupDecoratorFactoryProducer(lookUp) {
	return function DecoratorFactory() {
		if (this instanceof DecoratorFactory) return this;
		return function(target, _key, index) {
			changeLookup(target, index, lookUp);
		};
	};
}
/**
* A parameter decorator that instructs the injector to skip the current
* injector when resolving this dependency, and start the lookup from
* the parent injector.
*
* This is useful when you want to get a dependency from a parent injector
* even if the current injector has the same dependency registered.
*
* @example
* ```typescript
* class ChildService {
*   constructor(
*     @SkipSelf() @Inject(IConfig) private parentConfig: IConfig
*   ) {}
* }
* ```
*/
const SkipSelf = lookupDecoratorFactoryProducer(LookUp.SKIP_SELF);
/**
* A parameter decorator that instructs the injector to only look for
* this dependency in the current injector, without searching parent injectors.
*
* If the dependency is not found in the current injector, an error will be thrown
* (or `null` will be returned if used with `@Optional()`).
*
* @example
* ```typescript
* class MyService {
*   constructor(
*     @Self() @Inject(ILocalConfig) private localConfig: ILocalConfig
*   ) {}
* }
*
* // With optional - returns null if not found locally
* class MyService {
*   constructor(
*     @Self() @Optional(ILocalCache) private cache: ILocalCache | null
*   ) {}
* }
* ```
*/
const Self = lookupDecoratorFactoryProducer(LookUp.SELF);

//#endregion
//#region src/dependencyQuantity.ts
function mapQuantityToNumber(quantity) {
	if (quantity === Quantity.OPTIONAL) return "0 or 1";
	else return "1";
}
var QuantityCheckError = class extends RediError {
	constructor(id, quantity, actual) {
		let msg = `Expect ${mapQuantityToNumber(quantity)} dependency item(s) for id "${prettyPrintIdentifier(id)}" but get ${actual}.`;
		if (actual === 0) msg += " Did you forget to register it?";
		if (actual > 1) msg += " You register it more than once.";
		super(msg);
		this.quantity = quantity;
		this.actual = actual;
	}
};
function checkQuantity(id, quantity, length) {
	if (quantity === Quantity.OPTIONAL && length > 1 || quantity === Quantity.REQUIRED && length !== 1) throw new QuantityCheckError(id, quantity, length);
}
function retrieveQuantity(quantity, arr) {
	if (quantity === Quantity.MANY) return arr;
	else return arr[0];
}
function changeQuantity(target, index, quantity) {
	const descriptor = getDependencyByIndex(target, index);
	descriptor.quantity = quantity;
}
function quantifyDecoratorFactoryProducer(quantity) {
	return function decoratorFactory(id) {
		if (this instanceof decoratorFactory) return this;
		return function(registerTarget, _key, index) {
			if (id) setDependency(registerTarget, id, index, quantity);
			else {
				if (quantity === Quantity.REQUIRED) throw new RequiredDecoratorMisusedError(registerTarget, index);
				changeQuantity(registerTarget, index, quantity);
			}
		};
	};
}
/**
* A parameter decorator that indicates the dependency should be resolved
* as an array containing all registered instances of the dependency.
*
* Use this when multiple implementations are registered for the same identifier
* and you want to receive all of them.
*
* @param id - Optional dependency identifier. If not provided, must be used
*   after `@Inject()` decorator.
*
* @example
* ```typescript
* // Register multiple handlers
* const injector = new Injector([
*   [IHandler, { useClass: LoggingHandler }],
*   [IHandler, { useClass: ValidationHandler }],
*   [IHandler, { useClass: AuthHandler }],
* ]);
*
* class EventProcessor {
*   constructor(@Many(IHandler) private handlers: IHandler[]) {
*     // handlers contains all three registered handlers
*   }
* }
* ```
*/
const Many = quantifyDecoratorFactoryProducer(Quantity.MANY);
/**
* A parameter decorator that marks a dependency as optional.
*
* If the dependency is not registered, `null` will be injected instead
* of throwing an error.
*
* @param id - Optional dependency identifier. If not provided, must be used
*   after `@Inject()` decorator.
*
* @example
* ```typescript
* class MyService {
*   constructor(
*     @Optional(ICacheService) private cache: ICacheService | null
*   ) {
*     // cache will be null if ICacheService is not registered
*   }
* }
*
* // Or with @Inject
* class MyService {
*   constructor(
*     @Optional() @Inject(ICacheService) private cache: ICacheService | null
*   ) {}
* }
* ```
*/
const Optional = quantifyDecoratorFactoryProducer(Quantity.OPTIONAL);
/**
* A parameter decorator that declares a required dependency to be injected.
*
* This is the primary way to declare dependencies when using decorators.
* The dependency must be registered in the injector or its parent injectors,
* otherwise an error will be thrown.
*
* @param id - The dependency identifier (class, string, or identifier created by `createIdentifier`).
*
* @example
* ```typescript
* class UserService {
*   constructor(
*     @Inject(AuthService) private auth: AuthService,
*     @Inject(ILogger) private logger: ILogger
*   ) {}
* }
*
* // The dependency will be injected automatically
* const injector = new Injector([[AuthService], [ILogger, { useClass: ConsoleLogger }]]);
* const userService = injector.get(UserService);
* ```
*/
const Inject = quantifyDecoratorFactoryProducer(Quantity.REQUIRED);

//#endregion
//#region src/dependencyDescriptor.ts
function normalizeFactoryDeps(deps, startIndex = 0) {
	if (!deps) return [];
	return deps.map((dep, index) => {
		index += startIndex;
		if (!Array.isArray(dep)) return {
			paramIndex: index,
			identifier: dep,
			quantity: Quantity.REQUIRED,
			withNew: false
		};
		const modifiers = dep.slice(0, dep.length - 1);
		const identifier = dep[dep.length - 1];
		let lookUp;
		let quantity = Quantity.REQUIRED;
		let withNew = false;
		modifiers.forEach((modifier) => {
			if (modifier instanceof Self) lookUp = LookUp.SELF;
			else if (modifier instanceof SkipSelf) lookUp = LookUp.SKIP_SELF;
			else if (modifier instanceof Optional) quantity = Quantity.OPTIONAL;
			else if (modifier instanceof Many) quantity = Quantity.MANY;
			else withNew = true;
		});
		return {
			paramIndex: index,
			identifier,
			quantity,
			lookUp,
			withNew
		};
	});
}

//#endregion
//#region src/dependencyDeclare.ts
/**
* Register dependencies on a class without using decorators.
*
* This is useful when you cannot use decorators (e.g., in plain JavaScript)
* or when you need to define dependencies programmatically.
*
* @param registerTarget - The target class constructor to register dependencies on.
* @param deps - An array of dependencies. Each dependency can be:
*   - A simple identifier (class, string, or identifier created by `createIdentifier`)
*   - An array with modifiers like `[Optional, SomeService]` or `[Many, SomeService]`
* @param startIndex - The starting parameter index for dependencies. Default is 0.
*   Use this when your constructor has custom parameters before the injected dependencies.
*
* @example
* ```typescript
* class MyService {
*   constructor(customParam, authService, loggerService) {}
* }
*
* // Register dependencies starting at index 1 (after customParam)
* setDependencies(MyService, [AuthService, LoggerService], 1);
*
* // With optional dependency
* setDependencies(MyService, [[Optional, CacheService], LoggerService], 1);
* ```
*/
function setDependencies(registerTarget, deps, startIndex = 0) {
	const normalizedDescriptors = normalizeFactoryDeps(deps, startIndex);
	normalizedDescriptors.forEach((descriptor) => {
		setDependency(registerTarget, descriptor.identifier, descriptor.paramIndex, descriptor.quantity, descriptor.lookUp);
	});
}

//#endregion
//#region src/dependencyForwardRef.ts
/**
* Create a forward reference to a class that may not be defined yet.
*
* This is useful when you have circular dependencies between files.
* Instead of directly referencing a class (which may be undefined due to
* the order of ES module initialization), you wrap it in a function that
* will be called later when the class is definitely available.
*
* @param wrapper - A function that returns the class constructor.
* @returns A ForwardRef object that can be used as a dependency identifier.
*
* @example
* ```typescript
* // fileA.ts
* import { forwardRef } from '@wendellhu/redi';
* import type { ServiceB } from './fileB';
*
* class ServiceA {
*   constructor(@Inject(forwardRef(() => ServiceB)) private b: ServiceB) {}
* }
*
* // fileB.ts
* import { ServiceA } from './fileA';
*
* class ServiceB {
*   constructor(@Inject(ServiceA) private a: ServiceA) {}
* }
* ```
*/
function forwardRef(wrapper) {
	return { unwrap: wrapper };
}
function isForwardRef(thing) {
	return !!thing && typeof thing.unwrap === "function";
}
function normalizeForwardRef(id) {
	if (isForwardRef(id)) return id.unwrap();
	return id;
}

//#endregion
//#region src/dependencyWithNew.ts
function changeToSelf(target, index, withNew) {
	const descriptor = getDependencyByIndex(target, index);
	descriptor.withNew = withNew;
}
function withNewDecoratorFactoryProducer(withNew) {
	return function DecoratorFactory() {
		if (this instanceof DecoratorFactory) return this;
		return function(target, _key, index) {
			changeToSelf(target, index, withNew);
		};
	};
}
/**
* A parameter decorator that instructs the injector to always create
* a new instance of the dependency instead of returning the cached singleton.
*
* By default, dependencies are singletons within an injector. Using `@WithNew()`
* will create a fresh instance each time it's injected.
*
* @example
* ```typescript
* class RequestHandler {
*   constructor(
*     // Each RequestHandler gets its own RequestContext
*     @WithNew() @Inject(RequestContext) private context: RequestContext
*   ) {}
* }
*
* // Without @WithNew, all RequestHandlers would share the same context
* ```
*/
const WithNew = withNewDecoratorFactoryProducer(true);

//#endregion
//#region src/dispose.ts
/**
* Type guard to check if a value implements the IDisposable interface.
*
* @param thing - The value to check.
* @returns `true` if the value has a `dispose` method.
*/
function isDisposable(thing) {
	return !!thing && typeof thing.dispose === "function";
}

//#endregion
//#region src/dependencyCollection.ts
function isBareClassDependency(thing) {
	return thing.length === 1;
}
const ResolvingStack = [];
function pushResolvingStack(id) {
	ResolvingStack.push(id);
}
function popupResolvingStack() {
	ResolvingStack.pop();
}
function clearResolvingStack() {
	ResolvingStack.length = 0;
}
var DependencyNotFoundForModuleError = class extends RediError {
	constructor(toInstantiate, id, index) {
		const msg = `Cannot find "${prettyPrintIdentifier(id)}" registered by any injector. It is the ${index}th param of "${isIdentifierDecorator(toInstantiate) ? prettyPrintIdentifier(toInstantiate) : toInstantiate.name}".`;
		super(msg);
	}
};
var DependencyNotFoundError = class extends RediError {
	constructor(id) {
		const msg = `Cannot find "${prettyPrintIdentifier(id)}" registered by any injector. The stack of dependencies is: "${ResolvingStack.map((id$1) => prettyPrintIdentifier(id$1)).join(" -> ")}".`;
		super(msg);
		clearResolvingStack();
	}
};
/**
* Store unresolved dependencies in an injector.
*
* @internal
*/
var DependencyCollection = class {
	dependencyMap = /* @__PURE__ */ new Map();
	constructor(dependencies) {
		this.normalizeDependencies(dependencies).map((pair) => this.add(pair[0], pair[1]));
	}
	add(ctorOrId, val) {
		if (typeof val === "undefined") val = {
			useClass: ctorOrId,
			lazy: false
		};
		let arr = this.dependencyMap.get(ctorOrId);
		if (typeof arr === "undefined") {
			arr = [];
			this.dependencyMap.set(ctorOrId, arr);
		}
		arr.push(val);
	}
	delete(id) {
		this.dependencyMap.delete(id);
	}
	get(id, quantity) {
		const ret = this.dependencyMap.get(id);
		checkQuantity(id, quantity, ret.length);
		return retrieveQuantity(quantity, ret);
	}
	has(id) {
		return this.dependencyMap.has(id);
	}
	dispose() {
		this.dependencyMap.clear();
	}
	/**
	* normalize dependencies to `DependencyItem`
	*/
	normalizeDependencies(dependencies) {
		return dependencies.map((dependency) => {
			const id = dependency[0];
			let val;
			if (isBareClassDependency(dependency)) val = {
				useClass: dependency[0],
				lazy: false
			};
			else val = dependency[1];
			return [id, val];
		});
	}
};
/**
* Store resolved dependencies.
*
* @internal
*/
var ResolvedDependencyCollection = class {
	resolvedDependencies = /* @__PURE__ */ new Map();
	add(id, val) {
		let arr = this.resolvedDependencies.get(id);
		if (typeof arr === "undefined") {
			arr = [];
			this.resolvedDependencies.set(id, arr);
		}
		arr.push(val);
	}
	has(id) {
		return this.resolvedDependencies.has(id);
	}
	get(id, quantity) {
		const ret = this.resolvedDependencies.get(id);
		if (!ret) throw new DependencyNotFoundError(id);
		checkQuantity(id, quantity, ret.length);
		if (quantity === Quantity.MANY) return ret;
		else return ret[0];
	}
	dispose() {
		Array.from(this.resolvedDependencies.values()).forEach((items) => {
			items.forEach((item) => isDisposable(item) ? item.dispose() : void 0);
		});
		this.resolvedDependencies.clear();
	}
};

//#endregion
//#region src/idleValue.ts
/**
* this run the callback when CPU is idle. Will fallback to setTimeout if
* the browser doesn't support requestIdleCallback
*/
let runWhenIdle;
(function() {
	/* istanbul ignore next -- @preserve */
	if (typeof requestIdleCallback !== "undefined" && typeof cancelIdleCallback !== "undefined") runWhenIdle = (runner, timeout) => {
		const handle = requestIdleCallback(runner, typeof timeout === "number" ? { timeout } : void 0);
		let disposed = false;
		return () => {
			if (disposed) return;
			disposed = true;
			cancelIdleCallback(handle);
		};
	};
	else {
		const dummyIdle = Object.freeze({
			didTimeout: true,
			timeRemaining() {
				return 15;
			}
		});
		runWhenIdle = (runner) => {
			const handle = setTimeout(() => runner(dummyIdle));
			let disposed = false;
			return () => {
				if (disposed) return;
				disposed = true;
				clearTimeout(handle);
			};
		};
	}
})();
/**
* a wrapper of a executor so it can be evaluated when it's necessary or the CPU is idle
*
* the type of the returned value of the executor would be T
*/
var IdleValue = class {
	executor;
	disposeIdleCallback;
	didRun = false;
	value;
	error;
	constructor(executor) {
		this.executor = () => {
			try {
				this.value = executor();
			} catch (err) {
				this.error = err;
			} finally {
				this.didRun = true;
			}
		};
		this.disposeIdleCallback = runWhenIdle(() => this.executor());
	}
	hasRun() {
		return this.didRun;
	}
	dispose() {
		this.disposeIdleCallback();
	}
	getValue() {
		if (!this.didRun) {
			this.disposeIdleCallback();
			this.executor();
		}
		if (this.error) throw this.error;
		return this.value;
	}
};

//#endregion
//#region src/injector.ts
const MAX_RESOLUTIONS_QUEUED = 300;
const NotInstantiatedSymbol = Symbol("$$NOT_INSTANTIATED_SYMBOL");
var CircularDependencyError = class extends RediError {
	constructor(id) {
		super(`Detecting cyclic dependency. The last identifier is "${prettyPrintIdentifier(id)}".`);
	}
};
var InjectorAlreadyDisposedError = class extends RediError {
	constructor() {
		super("Injector cannot be accessed after it was disposed.");
	}
};
var AsyncItemReturnAsyncItemError = class extends RediError {
	constructor(id) {
		super(`Async item "${prettyPrintIdentifier(id)}" returns another async item.`);
	}
};
var GetAsyncItemFromSyncApiError = class extends RediError {
	constructor(id) {
		super(`Cannot get async item "${prettyPrintIdentifier(id)}" from sync api.`);
	}
};
var AddDependencyAfterResolutionError = class extends RediError {
	constructor(id) {
		super(`Cannot add dependency "${prettyPrintIdentifier(id)}" after it is already resolved.`);
	}
};
var DeleteDependencyAfterResolutionError = class extends RediError {
	constructor(id) {
		super(`Cannot delete dependency "${prettyPrintIdentifier(id)}" when it is already resolved.`);
	}
};
/**
* The dependency injection container that manages dependency registration and resolution.
*
* The Injector is the core of redi's dependency injection system. It stores
* dependency registrations and creates instances when requested.
*
* Features:
* - **Hierarchical injection**: Child injectors can inherit from parent injectors
* - **Lazy instantiation**: Dependencies are created only when first requested
* - **Singleton by default**: Each dependency is instantiated once per injector
* - **Lifecycle management**: Automatically disposes dependencies implementing IDisposable
*
* @example
* ```typescript
* // Basic usage
* const injector = new Injector([
*   [AuthService],
*   [ILogger, { useClass: ConsoleLogger }],
*   ['API_URL', { useValue: 'https://api.example.com' }],
* ]);
*
* const auth = injector.get(AuthService);
* const logger = injector.get(ILogger);
*
* // Hierarchical injectors
* const childInjector = injector.createChild([
*   [ILogger, { useClass: FileLogger }], // Override parent's logger
* ]);
*
* // Clean up when done
* injector.dispose();
* ```
*/
var Injector = class Injector {
	dependencyCollection;
	resolvedDependencyCollection;
	children = [];
	resolutionOngoing = 0;
	disposingCallbacks = /* @__PURE__ */ new Set();
	disposed = false;
	/**
	* Create a new `Injector` instance.
	*
	* @param dependencies - An array of dependencies to register with this injector.
	*   Each dependency can be:
	*   - `[ClassName]` - Register a class as its own identifier
	*   - `[Identifier, DependencyItem]` - Register with a specific identifier and configuration
	* @param parent - Optional parent injector for hierarchical injection.
	*   Child injectors inherit dependencies from their parent.
	*
	* @example
	* ```typescript
	* // Root injector
	* const rootInjector = new Injector([
	*   [AuthService],
	*   [ILogger, { useClass: ConsoleLogger }],
	* ]);
	*
	* // Child injector with parent
	* const childInjector = new Injector(
	*   [[ICache, { useClass: MemoryCache }]],
	*   rootInjector
	* );
	* ```
	*/
	constructor(dependencies, parent = null) {
		this.parent = parent;
		this.dependencyCollection = new DependencyCollection(dependencies || []);
		this.resolvedDependencyCollection = new ResolvedDependencyCollection();
		if (parent) parent.children.push(this);
	}
	/**
	* Register a callback to be called when this injector is disposed.
	*
	* Use this to perform cleanup tasks or release external resources
	* when the injector lifecycle ends.
	*
	* **Note:** When your callback is invoked, the injector is already disposed
	* and you cannot interact with it anymore.
	*
	* @param callback - The function to call when the injector is disposed.
	* @returns A disposable that removes the callback when disposed.
	*
	* @example
	* ```typescript
	* const cleanup = injector.onDispose(() => {
	*   console.log('Injector disposed, cleaning up...');
	* });
	*
	* // Later, remove the callback if no longer needed
	* cleanup.dispose();
	* ```
	*/
	onDispose(callback) {
		this.disposingCallbacks.add(callback);
		return { dispose: () => this.disposingCallbacks.delete(callback) };
	}
	/**
	* Create a child injector that inherits from this injector.
	*
	* The child injector can:
	* - Access all dependencies registered in parent injectors
	* - Override parent dependencies with its own registrations
	* - Have its own scoped dependencies
	*
	* When the parent injector is disposed, all child injectors are disposed first.
	*
	* @param dependencies - Dependencies to register with the child injector.
	* @returns The newly created child injector.
	*
	* @example
	* ```typescript
	* const rootInjector = new Injector([[ILogger, { useClass: ConsoleLogger }]]);
	*
	* const requestInjector = rootInjector.createChild([
	*   [RequestContext, { useClass: RequestContext }],
	* ]);
	*
	* // requestInjector can access both RequestContext and ILogger
	* ```
	*/
	createChild(dependencies) {
		this._ensureInjectorNotDisposed();
		return new Injector(dependencies, this);
	}
	/**
	* Dispose the injector and release all resources.
	*
	* This method:
	* 1. Recursively disposes all child injectors first
	* 2. Calls `dispose()` on all instantiated dependencies that implement `IDisposable`
	* 3. Clears all internal collections
	* 4. Detaches from parent injector
	* 5. Invokes all registered `onDispose` callbacks
	*
	* After disposal, the injector cannot be used anymore.
	*
	* @example
	* ```typescript
	* const injector = new Injector([[DatabaseService]]);
	* const db = injector.get(DatabaseService);
	*
	* // When done with the injector
	* injector.dispose(); // DatabaseService.dispose() is called automatically
	* ```
	*/
	dispose() {
		this.children.forEach((c) => c.dispose());
		this.children.length = 0;
		this.dependencyCollection.dispose();
		this.resolvedDependencyCollection.dispose();
		this.deleteSelfFromParent();
		this.disposed = true;
		this.disposingCallbacks.forEach((callback) => callback());
		this.disposingCallbacks.clear();
	}
	deleteSelfFromParent() {
		if (this.parent) {
			const index = this.parent.children.indexOf(this);
			this.parent.children.splice(index, 1);
		}
	}
	/**
	* Add a dependency or pre-created instance to the injector at runtime.
	*
	* This allows dynamic registration of dependencies after the injector is created.
	* Throws an error if the dependency has already been instantiated.
	*
	* @param dependency - A tuple containing:
	*   - `[Ctor]` - A class to register as its own identifier
	*   - `[Identifier, DependencyItem]` - An identifier with its configuration
	*   - `[Identifier, Instance]` - An identifier with a pre-created instance
	*
	* @throws {AddDependencyAfterResolutionError} If the dependency is already resolved.
	*
	* @example
	* ```typescript
	* const injector = new Injector();
	*
	* // Add a class
	* injector.add([MyService]);
	*
	* // Add with configuration
	* injector.add([ILogger, { useClass: ConsoleLogger }]);
	*
	* // Add a pre-created instance
	* const config = { apiUrl: 'https://api.example.com' };
	* injector.add([IConfig, config]);
	* ```
	*/
	add(dependency) {
		this._ensureInjectorNotDisposed();
		const identifierOrCtor = dependency[0];
		const item = dependency[1];
		if (this.resolvedDependencyCollection.has(identifierOrCtor)) throw new AddDependencyAfterResolutionError(identifierOrCtor);
		if (typeof item === "undefined") this.dependencyCollection.add(identifierOrCtor);
		else if (isAsyncDependencyItem(item) || isClassDependencyItem(item) || isValueDependencyItem(item) || isFactoryDependencyItem(item)) this.dependencyCollection.add(identifierOrCtor, item);
		else this.resolvedDependencyCollection.add(identifierOrCtor, item);
	}
	/**
	* Replace an existing dependency registration.
	*
	* Use this to swap out an implementation, typically for testing purposes.
	* Throws an error if the dependency has already been instantiated.
	*
	* @param dependency - A tuple of `[Identifier, DependencyItem]` to replace the existing registration.
	*
	* @throws {AddDependencyAfterResolutionError} If the dependency is already resolved.
	*
	* @example
	* ```typescript
	* // In tests, replace a real service with a mock
	* injector.replace([IHttpClient, { useClass: MockHttpClient }]);
	* ```
	*/
	replace(dependency) {
		this._ensureInjectorNotDisposed();
		const identifier = dependency[0];
		if (this.resolvedDependencyCollection.has(identifier)) throw new AddDependencyAfterResolutionError(identifier);
		this.dependencyCollection.delete(identifier);
		this.dependencyCollection.add(identifier, dependency[1]);
	}
	/**
	* Remove a dependency registration from the injector.
	*
	* Throws an error if the dependency has already been instantiated.
	*
	* @param identifier - The identifier of the dependency to remove.
	*
	* @throws {DeleteDependencyAfterResolutionError} If the dependency is already resolved.
	*
	* @example
	* ```typescript
	* injector.delete(ITemporaryService);
	* ```
	*/
	delete(identifier) {
		this._ensureInjectorNotDisposed();
		if (this.resolvedDependencyCollection.has(identifier)) throw new DeleteDependencyAfterResolutionError(identifier);
		this.dependencyCollection.delete(identifier);
	}
	/**
	* Execute a function with controlled access to the injector.
	*
	* The callback receives an `IAccessor` that provides limited access to
	* the injector's `get` and `has` methods. This is useful for service locator
	* patterns or when you need to resolve dependencies dynamically.
	*
	* @param cb - The function to execute. Receives an accessor and any additional arguments.
	* @param args - Additional arguments to pass to the callback.
	* @returns The return value of the callback function.
	*
	* @example
	* ```typescript
	* const result = injector.invoke((accessor, multiplier) => {
	*   const calc = accessor.get(ICalculator);
	*   return calc.compute() * multiplier;
	* }, 2);
	* ```
	*/
	invoke(cb, ...args) {
		this._ensureInjectorNotDisposed();
		const accessor = {
			get: (id, quantityOrLookup, lookUp) => {
				return this._get(id, quantityOrLookup, lookUp);
			},
			has: (id) => {
				return this.has(id);
			}
		};
		return cb(accessor, ...args);
	}
	/**
	* Check if a dependency is registered in this injector or any parent injector.
	*
	* @param id - The identifier of the dependency to check.
	* @returns `true` if the dependency is registered, `false` otherwise.
	*
	* @example
	* ```typescript
	* if (injector.has(IOptionalFeature)) {
	*   const feature = injector.get(IOptionalFeature);
	*   feature.enable();
	* }
	* ```
	*/
	has(id) {
		return this.dependencyCollection.has(id) || this.parent?.has(id) || false;
	}
	/**
	* Retrieve a dependency instance from the injector.
	*
	* The dependency will be instantiated on first access and cached for subsequent requests.
	* If the dependency is not found and not optional, an error is thrown.
	*
	* @param id - The identifier of the dependency to retrieve.
	* @param quantityOrLookup - Either a {@link Quantity} specifying how many instances to get,
	*   or a {@link LookUp} specifying where to search.
	* @param lookUp - A {@link LookUp} specifying where to search (if first param is Quantity).
	* @returns The dependency instance, an array of instances (for `Quantity.MANY`),
	*   or `null` (for `Quantity.OPTIONAL` when not found).
	*
	* @throws {DependencyNotFoundError} If the dependency is not registered and not optional.
	* @throws {GetAsyncItemFromSyncApiError} If trying to get an async dependency synchronously.
	*
	* @example
	* ```typescript
	* // Get a required dependency
	* const logger = injector.get(ILogger);
	*
	* // Get an optional dependency
	* const cache = injector.get(ICache, Quantity.OPTIONAL);
	*
	* // Get all registered handlers
	* const handlers = injector.get(IHandler, Quantity.MANY);
	*
	* // Only search current injector
	* const localService = injector.get(IService, LookUp.SELF);
	* ```
	*/
	get(id, quantityOrLookup, lookUp) {
		this._ensureInjectorNotDisposed();
		const newResult = this._get(id, quantityOrLookup, lookUp);
		if (Array.isArray(newResult) && newResult.some((r) => isAsyncHook(r)) || isAsyncHook(newResult)) throw new GetAsyncItemFromSyncApiError(id);
		return newResult;
	}
	_get(id, quantityOrLookup, lookUp, withNew) {
		let quantity = Quantity.REQUIRED;
		if (quantityOrLookup === Quantity.REQUIRED || quantityOrLookup === Quantity.OPTIONAL || quantityOrLookup === Quantity.MANY) quantity = quantityOrLookup;
		else lookUp = quantityOrLookup;
		if (!withNew) {
			const cachedResult = this.getValue(id, quantity, lookUp);
			if (cachedResult !== NotInstantiatedSymbol) return cachedResult;
		}
		const shouldCache = !withNew;
		return this.createDependency(id, quantity, lookUp, shouldCache);
	}
	/**
	* Get a dependency in the async way.
	*/
	getAsync(id) {
		this._ensureInjectorNotDisposed();
		const cachedResult = this.getValue(id, Quantity.REQUIRED);
		if (cachedResult !== NotInstantiatedSymbol) return Promise.resolve(cachedResult);
		const newResult = this.createDependency(id, Quantity.REQUIRED);
		if (!isAsyncHook(newResult)) return Promise.resolve(newResult);
		return newResult.whenReady();
	}
	/**
	* Create an instance of a class with its dependencies injected.
	*
	* Unlike `get()`, the created instance is NOT cached by the injector.
	* Each call creates a new instance. You can also pass custom arguments
	* that will be passed before the injected dependencies.
	*
	* @param ctor - The class constructor to instantiate.
	* @param customArgs - Custom arguments to pass before injected dependencies.
	* @returns A new instance of the class.
	*
	* @example
	* ```typescript
	* class RequestHandler {
	*   constructor(
	*     requestId: string,           // Custom arg
	*     @Inject(ILogger) logger: ILogger  // Injected
	*   ) {}
	* }
	*
	* // Create instance with custom requestId
	* const handler = injector.createInstance(RequestHandler, 'req-123');
	* ```
	*/
	createInstance(ctor, ...customArgs) {
		this._ensureInjectorNotDisposed();
		return this._resolveClassImpl({ useClass: ctor }, ...customArgs);
	}
	_resolveDependency(id, item, shouldCache = true) {
		let result;
		pushResolvingStack(id);
		try {
			if (isValueDependencyItem(item)) result = this._resolveValueDependency(id, item);
			else if (isFactoryDependencyItem(item)) result = this._resolveFactory(id, item, shouldCache);
			else if (isClassDependencyItem(item)) result = this._resolveClass(id, item, shouldCache);
			else if (isExistingDependencyItem(item)) result = this._resolveExisting(id, item);
			else result = this._resolveAsync(id, item);
			popupResolvingStack();
		} catch (e) {
			popupResolvingStack();
			throw e;
		}
		return result;
	}
	_resolveExisting(id, item) {
		const thing = this.get(item.useExisting);
		this.resolvedDependencyCollection.add(id, thing);
		return thing;
	}
	_resolveValueDependency(id, item) {
		const thing = item.useValue;
		this.resolvedDependencyCollection.add(id, thing);
		return thing;
	}
	_resolveClass(id, item, shouldCache) {
		let thing;
		if (item.lazy) {
			const idle = new IdleValue(() => {
				this._ensureInjectorNotDisposed();
				return this._resolveClassImpl(item);
			});
			thing = new Proxy(Object.create(null), {
				get(target, key) {
					if (key in target) return target[key];
					const thing$1 = idle.getValue();
					let property = thing$1[key];
					if (typeof property !== "function") return property;
					property = property.bind(thing$1);
					target[key] = property;
					return property;
				},
				set(_target, key, value) {
					idle.getValue()[key] = value;
					return true;
				}
			});
		} else thing = this._resolveClassImpl(item);
		if (id && shouldCache) this.resolvedDependencyCollection.add(id, thing);
		return thing;
	}
	_resolveClassImpl(item, ...extraParams) {
		const Ctor = item.useClass;
		this.markNewResolution(Ctor);
		const declaredDependencies = getDependencies(Ctor).sort((a, b) => a.paramIndex - b.paramIndex).map((descriptor) => ({
			...descriptor,
			identifier: normalizeForwardRef(descriptor.identifier)
		}));
		const resolvedArgs = [];
		for (const dep of declaredDependencies) try {
			const thing$1 = this._get(dep.identifier, dep.quantity, dep.lookUp, dep.withNew);
			resolvedArgs.push(thing$1);
		} catch (error) {
			if (error instanceof DependencyNotFoundError || error instanceof QuantityCheckError && error.actual === 0) throw new DependencyNotFoundForModuleError(Ctor, dep.identifier, dep.paramIndex);
			throw error;
		}
		let args = [...extraParams];
		const firstDependencyArgIndex = declaredDependencies.length > 0 ? declaredDependencies[0].paramIndex : args.length;
		if (args.length !== firstDependencyArgIndex) {
			console.warn(`[redi]: Expect ${firstDependencyArgIndex} custom parameter(s) of ${prettyPrintIdentifier(Ctor)} but get ${args.length}.`);
			const delta = firstDependencyArgIndex - args.length;
			if (delta > 0) args = [...args, ...Array.from({ length: delta }).fill(void 0)];
			else args = args.slice(0, firstDependencyArgIndex);
		}
		const thing = new Ctor(...args, ...resolvedArgs);
		item?.onInstantiation?.(thing);
		this.markResolutionCompleted();
		return thing;
	}
	_resolveFactory(id, item, shouldCache) {
		this.markNewResolution(id);
		const declaredDependencies = normalizeFactoryDeps(item.deps);
		const resolvedArgs = [];
		for (const dep of declaredDependencies) try {
			const thing$1 = this._get(dep.identifier, dep.quantity, dep.lookUp, dep.withNew);
			resolvedArgs.push(thing$1);
		} catch (error) {
			if (error instanceof DependencyNotFoundError || error instanceof QuantityCheckError && error.actual === 0) throw new DependencyNotFoundForModuleError(id, dep.identifier, dep.paramIndex);
			throw error;
		}
		const thing = item.useFactory.apply(null, resolvedArgs);
		if (shouldCache) this.resolvedDependencyCollection.add(id, thing);
		this.markResolutionCompleted();
		item?.onInstantiation?.(thing);
		return thing;
	}
	_resolveAsync(id, item) {
		const asyncLoader = {
			__symbol: AsyncHookSymbol,
			whenReady: () => this._resolveAsyncImpl(id, item)
		};
		return asyncLoader;
	}
	_resolveAsyncImpl(id, item) {
		return item.useAsync().then((thing) => {
			const resolvedCheck = this.getValue(id);
			if (resolvedCheck !== NotInstantiatedSymbol) return resolvedCheck;
			let ret;
			if (Array.isArray(thing)) {
				const item$1 = thing[1];
				if (isAsyncDependencyItem(item$1)) throw new AsyncItemReturnAsyncItemError(id);
				else ret = this._resolveDependency(id, item$1);
			} else if (isCtor(thing)) ret = this._resolveClassImpl({
				useClass: thing,
				onInstantiation: item.onInstantiation
			});
			else ret = thing;
			this.resolvedDependencyCollection.add(id, ret);
			return ret;
		});
	}
	getValue(id, quantity = Quantity.REQUIRED, lookUp) {
		const onSelf = () => {
			if (this.dependencyCollection.has(id) && !this.resolvedDependencyCollection.has(id)) return NotInstantiatedSymbol;
			return this.resolvedDependencyCollection.get(id, quantity);
		};
		const onParent = () => {
			if (this.parent) return this.parent.getValue(id, quantity);
			else {
				if (quantity === Quantity.OPTIONAL) return null;
				else if (quantity === Quantity.MANY) return [];
				throw new QuantityCheckError(id, Quantity.REQUIRED, 0);
			}
		};
		if (lookUp === LookUp.SKIP_SELF) return onParent();
		if (id === Injector) return this;
		if (lookUp === LookUp.SELF) return onSelf();
		if (this.resolvedDependencyCollection.has(id) || this.dependencyCollection.has(id)) return onSelf();
		return onParent();
	}
	createDependency(id, quantity, lookUp, shouldCache = true) {
		const onSelf = () => {
			const registrations = this.dependencyCollection.get(id, quantity);
			let ret = null;
			if (Array.isArray(registrations)) ret = registrations.map((dependencyItem) => this._resolveDependency(id, dependencyItem, shouldCache));
			else ret = this._resolveDependency(id, registrations, shouldCache);
			return ret;
		};
		const onParent = () => {
			if (this.parent) return this.parent.createDependency(id, quantity, void 0, shouldCache);
			else {
				if (quantity === Quantity.OPTIONAL) return null;
				else if (quantity === Quantity.MANY) return [];
				pushResolvingStack(id);
				throw new DependencyNotFoundError(id);
			}
		};
		if (lookUp === LookUp.SKIP_SELF) return onParent();
		if (this.dependencyCollection.has(id)) return onSelf();
		return onParent();
	}
	markNewResolution(id) {
		this.resolutionOngoing += 1;
		if (this.resolutionOngoing >= MAX_RESOLUTIONS_QUEUED) throw new CircularDependencyError(id);
	}
	markResolutionCompleted() {
		this.resolutionOngoing -= 1;
	}
	_ensureInjectorNotDisposed() {
		if (this.disposed) throw new InjectorAlreadyDisposedError();
	}
};

//#endregion
//#region src/injectSelf.ts
/**
* A parameter decorator that injects the current Injector instance itself.
*
* This allows a class to access the injector that created it, which can be
* useful for dynamic dependency resolution or creating child injectors.
*
* The injector is looked up with `LookUp.SELF`, meaning only the current
* injector (not parent injectors) will be returned.
*
* @example
* ```typescript
* class ServiceFactory {
*   constructor(@InjectSelf() private injector: Injector) {}
*
*   createService<T>(id: DependencyIdentifier<T>): T {
*     return this.injector.createInstance(id);
*   }
*
*   createChildScope(deps: Dependency[]): Injector {
*     return this.injector.createChild(deps);
*   }
* }
* ```
*/
const InjectSelf = function InjectSelf$1() {
	return function(registerTarget, _key, index) {
		setDependency(registerTarget, Injector, index, Quantity.REQUIRED, LookUp.SELF);
	};
};

//#endregion
//#region src/publicApi.ts
const globalObject = typeof globalThis !== "undefined" && globalThis || typeof window !== "undefined" && window || typeof global !== "undefined" && global;
const __REDI_GLOBAL_LOCK__ = "REDI_GLOBAL_LOCK";
const isNode = typeof process !== "undefined" && process.versions != null && process.versions.node != null;
if (globalObject[__REDI_GLOBAL_LOCK__]) {
	if (!isNode) console.error(`[redi]: You are loading scripts of redi more than once! This may cause undesired behavior in your application.
Maybe your dependencies added redi as its dependency and bundled redi to its dist files. Or you import different versions of redi.
For more info please visit our website: https://redi.wendell.fun/en-US/docs/faq#import-scripts-of-redi-more-than-once`);
} else globalObject[__REDI_GLOBAL_LOCK__] = true;

//#endregion
exports.Inject = Inject;
exports.InjectSelf = InjectSelf;
exports.Injector = Injector;
exports.LookUp = LookUp;
exports.Many = Many;
exports.Optional = Optional;
exports.Quantity = Quantity;
exports.RediError = RediError;
exports.Self = Self;
exports.SkipSelf = SkipSelf;
exports.WithNew = WithNew;
exports.createIdentifier = createIdentifier;
exports.forwardRef = forwardRef;
exports.isAsyncDependencyItem = isAsyncDependencyItem;
exports.isAsyncHook = isAsyncHook;
exports.isClassDependencyItem = isClassDependencyItem;
exports.isCtor = isCtor;
exports.isDisposable = isDisposable;
exports.isFactoryDependencyItem = isFactoryDependencyItem;
exports.isValueDependencyItem = isValueDependencyItem;
exports.setDependencies = setDependencies;
});
//# sourceMappingURL=index.js.map