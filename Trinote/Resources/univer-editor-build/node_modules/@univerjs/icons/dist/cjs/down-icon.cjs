Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
let react = require("react");
let ts_base_js = require("./base.js");
//#region ts/down-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 16 16",
		"width": "1em",
		"height": "1em"
	},
	"children": [{
		"tag": "path",
		"attrs": {
			"fill": "currentColor",
			"d": "M8.55935 11.7617C8.29238 12.1202 7.75558 12.1202 7.48861 11.7617L3.08649 5.84931C2.75722 5.40708 3.07292 4.77771 3.62432 4.77771H12.4236C12.975 4.77771 13.2907 5.40708 12.9614 5.84931L8.55935 11.7617Z"
		}
	}]
};
const DownIcon = (0, react.forwardRef)(function DownIcon(props, ref) {
	return (0, react.createElement)(ts_base_js.IconBase, Object.assign({}, props, {
		id: "down-icon",
		ref,
		icon: element
	}));
});
DownIcon.displayName = "DownIcon";
//#endregion
exports.DownIcon = DownIcon;
exports.default = DownIcon;
