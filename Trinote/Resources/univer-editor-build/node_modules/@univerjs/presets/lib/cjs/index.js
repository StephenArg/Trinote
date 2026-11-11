Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
let _univerjs_core = require("@univerjs/core");
let _univerjs_core_facade = require("@univerjs/core/facade");

//#region src/preset.ts
function createUniver(options) {
	const { presets, plugins, collaboration, override = [], ...univerOptions } = options;
	if (collaboration) {
		override.push([_univerjs_core.IUndoRedoService, null]);
		override.push([_univerjs_core.IAuthzIoService, null]);
		override.push([_univerjs_core.IMentionIOService, null]);
	}
	const univer = new _univerjs_core.Univer({
		logLevel: _univerjs_core.LogLevel.WARN,
		...univerOptions,
		override
	});
	const pluginsMap = /* @__PURE__ */ new Map();
	presets === null || presets === void 0 || presets.forEach((preset) => {
		const { plugins } = Array.isArray(preset) ? preset[0] : preset;
		plugins.forEach((p) => {
			const [realPlugin, pluginConfig] = Array.isArray(p) ? [p[0], p[1]] : [p];
			if (pluginsMap.has(realPlugin.pluginName)) pluginsMap.delete(realPlugin.pluginName);
			pluginsMap.set(realPlugin.pluginName, {
				plugin: realPlugin,
				options: pluginConfig
			});
		});
	});
	plugins === null || plugins === void 0 || plugins.forEach((plugin) => {
		const [realPlugin, pluginConfig] = Array.isArray(plugin) ? [plugin[0], plugin[1]] : [plugin];
		if (pluginsMap.has(realPlugin.pluginName)) throw new Error(`Plugin ${realPlugin.pluginName} already registered by presets or other ways! Repeated registration may cause potential problems, please check your code.`);
		pluginsMap.set(realPlugin.pluginName, {
			plugin: realPlugin,
			options: pluginConfig
		});
	});
	pluginsMap.forEach(({ plugin, options }) => {
		univer.registerPlugin(plugin, options);
	});
	return {
		univer,
		univerAPI: _univerjs_core_facade.FUniver.newAPI(univer)
	};
}

//#endregion
exports.createUniver = createUniver;
Object.keys(_univerjs_core).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return _univerjs_core[k]; }
  });
});

var _univerjs_themes = require("@univerjs/themes");
Object.keys(_univerjs_themes).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return _univerjs_themes[k]; }
  });
});

Object.keys(_univerjs_core_facade).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return _univerjs_core_facade[k]; }
  });
});
