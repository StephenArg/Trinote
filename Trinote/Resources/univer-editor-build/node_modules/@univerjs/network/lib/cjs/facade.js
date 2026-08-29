let _univerjs_core_facade = require("@univerjs/core/facade");
let _univerjs_network = require("@univerjs/network");
let _univerjs_core = require("@univerjs/core");

//#region \0@oxc-project+runtime@0.133.0/helpers/esm/decorateParam.js
function __decorateParam(paramIndex, decorator) {
	return function(target, key) {
		decorator(target, key, paramIndex);
	};
}

//#endregion
//#region \0@oxc-project+runtime@0.133.0/helpers/esm/decorate.js
function __decorate(decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
}

//#endregion
//#region src/facade/f-network.ts
let FNetwork = class FNetwork extends _univerjs_core_facade.FBase {
	constructor(_injector, _httpService) {
		super();
		this._injector = _injector;
		this._httpService = _httpService;
	}
	/**
	* Send a GET request to the server.
	* @param {string} url - The requested URL.
	* @param {IRequestParams} [params] - Query parameters.
	* @returns {Promise<HTTPResponse>} Network response.
	*/
	get(url, params) {
		return this._httpService.get(url, params);
	}
	/**
	* Send a POST request to the server.
	* @param {string} url - The requested URL.
	* @param {IPostRequestParams} [params] - Query parameters.
	* @returns {Promise<HTTPResponse>} Network response.
	*/
	post(url, params) {
		return this._httpService.post(url, params);
	}
	/**
	* Send a PUT request to the server.
	* @param {string} url - The requested URL
	* @param {IPostRequestParams} [params] - Query parameters
	* @returns {Promise<HTTPResponse>} Network response
	*/
	put(url, params) {
		return this._httpService.put(url, params);
	}
	/**
	* Send DELETE request to the server.
	* @param {string} url - The requested URL
	* @param {IRequestParams} [params] - Query parameters
	* @returns {Promise<HTTPResponse>} Network response
	*/
	delete(url, params) {
		return this._httpService.delete(url, params);
	}
	/**
	* Send PATCH request to the server.
	* @param {string} url - The requested URL
	* @param {IPostRequestParams} [params] - Query parameters
	* @returns {Promise<HTTPResponse>} Network response
	*/
	patch(url, params) {
		return this._httpService.patch(url, params);
	}
	/**
	* Request for a stream of server-sent events. Instead of a single response, the server sends a stream of responses,
	* Univer wraps the stream in an [`Observable`](https://rxjs.dev/guide/observable) which you can call `subscribe` on.
	* @param {HTTPRequestMethod} method - HTTP request method
	* @param {string} url - The requested URL
	* @param {IPostRequestParams} [params] - params Query parameters
	* @returns {Observable<HTTPEvent>} An observable that emits the network response.
	*/
	getSSE(method, url, params) {
		return this._httpService.getSSE(method, url, params);
	}
};
FNetwork = __decorate([__decorateParam(0, (0, _univerjs_core.Inject)(_univerjs_core.Injector)), __decorateParam(1, (0, _univerjs_core.Inject)(_univerjs_network.HTTPService))], FNetwork);

//#endregion
//#region src/facade/f-univer.ts
var FUniverNetworkMixin = class extends _univerjs_core_facade.FUniver {
	getNetwork() {
		return this._injector.createInstance(FNetwork);
	}
	createSocket(url) {
		const ws = this._injector.createInstance(_univerjs_network.WebSocketService).createSocket(url);
		if (!ws) throw new Error("[WebSocketService]: failed to create socket!");
		return ws;
	}
};
_univerjs_core_facade.FUniver.extend(FUniverNetworkMixin);

//#endregion