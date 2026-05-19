Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
let react = require("react");
let ts_base_js = require("./base.js");
//#region ts/signal-100-double-icon.tsx
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
			"tag": "rect",
			"attrs": {
				"width": 1.8,
				"height": 3,
				"x": 1.6,
				"y": 11,
				"fill": "currentColor",
				"rx": .65
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 1.8,
				"height": 6,
				"x": 5.6,
				"y": 8,
				"fill": "currentColor",
				"rx": .65
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 1.8,
				"height": 9,
				"x": 9.6,
				"y": 5,
				"fill": "currentColor",
				"rx": .65
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 1.8,
				"height": 12,
				"x": 13.6,
				"y": 2,
				"fill": "currentColor",
				"rx": .65
			}
		}
	]
};
const Signal100DoubleIcon = (0, react.forwardRef)(function Signal100DoubleIcon(props, ref) {
	return (0, react.createElement)(ts_base_js.IconBase, Object.assign({}, props, {
		id: "signal-100-double-icon",
		ref,
		icon: element
	}));
});
Signal100DoubleIcon.displayName = "Signal100DoubleIcon";
//#endregion
exports.Signal100DoubleIcon = Signal100DoubleIcon;
exports.default = Signal100DoubleIcon;
