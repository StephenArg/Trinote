Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
let react = require("react");
let ts_base_js = require("./base.js");
//#region ts/cell-100-double-icon.tsx
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
				"width": 3.2,
				"height": 3.2,
				"x": 3.4,
				"y": 9.4,
				"fill": "white",
				"stroke": "currentColor",
				"rx": .55,
				"strokeWidth": .8
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 3.2,
				"height": 3.2,
				"x": 9.4,
				"y": 9.4,
				"fill": "white",
				"stroke": "currentColor",
				"rx": .55,
				"strokeWidth": .8
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 3.2,
				"height": 3.2,
				"x": 3.4,
				"y": 3.4,
				"fill": "white",
				"stroke": "currentColor",
				"rx": .55,
				"strokeWidth": .8
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 3.2,
				"height": 3.2,
				"x": 9.4,
				"y": 3.4,
				"fill": "white",
				"stroke": "currentColor",
				"rx": .55,
				"strokeWidth": .8
			}
		}
	]
};
const Cell100DoubleIcon = (0, react.forwardRef)(function Cell100DoubleIcon(props, ref) {
	return (0, react.createElement)(ts_base_js.IconBase, Object.assign({}, props, {
		id: "cell-100-double-icon",
		ref,
		icon: element
	}));
});
Cell100DoubleIcon.displayName = "Cell100DoubleIcon";
//#endregion
exports.Cell100DoubleIcon = Cell100DoubleIcon;
exports.default = Cell100DoubleIcon;
