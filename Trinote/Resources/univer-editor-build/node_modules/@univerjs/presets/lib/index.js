import { IAuthzIoService, IMentionIOService, IUndoRedoService, LogLevel, Univer } from "@univerjs/core";
import { FUniver } from "@univerjs/core/facade";

export * from "@univerjs/core"

export * from "@univerjs/core/facade"

export * from "@univerjs/themes"

//#region src/preset.ts
function createUniver(options) {
	const { presets, plugins, collaboration, override = [], ...univerOptions } = options;
	if (collaboration) {
		override.push([IUndoRedoService, null]);
		override.push([IAuthzIoService, null]);
		override.push([IMentionIOService, null]);
	}
	const univer = new Univer({
		logLevel: LogLevel.WARN,
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
		univerAPI: FUniver.newAPI(univer)
	};
}

//#endregion
export { createUniver };