Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
let react = require("react");
let ts_base_js = require("./base.js");
//#region ts/signal-0-double-icon.tsx
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
				"fill": "colorChannel1",
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
				"fill": "colorChannel1",
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
				"fill": "colorChannel1",
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
				"fill": "colorChannel1",
				"rx": .65
			}
		}
	]
};
const Signal0DoubleIcon = (0, react.forwardRef)(function Signal0DoubleIcon(props, ref) {
	return (0, react.createElement)(ts_base_js.IconBase, Object.assign({}, props, {
		id: "signal-0-double-icon",
		ref,
		icon: element
	}));
});
Signal0DoubleIcon.displayName = "Signal0DoubleIcon";
//#endregion
exports.Signal0DoubleIcon = Signal0DoubleIcon;
exports.default = Signal0DoubleIcon;
