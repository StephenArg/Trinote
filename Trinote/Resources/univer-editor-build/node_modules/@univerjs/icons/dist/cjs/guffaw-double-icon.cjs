Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
let react = require("react");
let ts_base_js = require("./base.js");
//#region ts/guffaw-double-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 16 16",
		"width": "1em",
		"height": "1em"
	},
	"children": [
		{
			"tag": "circle",
			"attrs": {
				"cx": 8,
				"cy": 8,
				"r": 6.4,
				"fill": "colorChannel1",
				"stroke": "currentColor",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "circle",
			"attrs": {
				"cx": 5.75,
				"cy": 6.3,
				"r": .75,
				"fill": "currentColor"
			}
		},
		{
			"tag": "circle",
			"attrs": {
				"cx": 10.25,
				"cy": 6.3,
				"r": .75,
				"fill": "currentColor"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M4.8 9.15C5.25 11.25 6.5 12.55 8 12.55C9.5 12.55 10.75 11.25 11.2 9.15H4.8Z"
			}
		}
	]
};
const GuffawDoubleIcon = (0, react.forwardRef)(function GuffawDoubleIcon(props, ref) {
	return (0, react.createElement)(ts_base_js.IconBase, Object.assign({}, props, {
		id: "guffaw-double-icon",
		ref,
		icon: element
	}));
});
GuffawDoubleIcon.displayName = "GuffawDoubleIcon";
//#endregion
exports.GuffawDoubleIcon = GuffawDoubleIcon;
exports.default = GuffawDoubleIcon;
