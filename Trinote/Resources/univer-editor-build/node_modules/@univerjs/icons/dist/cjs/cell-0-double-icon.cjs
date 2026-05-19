Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
let react = require("react");
let ts_base_js = require("./base.js");
//#region ts/cell-0-double-icon.tsx
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
				"width": 4,
				"height": 4,
				"x": 3,
				"y": 9,
				"fill": "colorChannel1",
				"rx": .8
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 4,
				"height": 4,
				"x": 9,
				"y": 9,
				"fill": "colorChannel1",
				"rx": .8
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 4,
				"height": 4,
				"x": 3,
				"y": 3,
				"fill": "colorChannel1",
				"rx": .8
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 4,
				"height": 4,
				"x": 9,
				"y": 3,
				"fill": "colorChannel1",
				"rx": .8
			}
		}
	]
};
const Cell0DoubleIcon = (0, react.forwardRef)(function Cell0DoubleIcon(props, ref) {
	return (0, react.createElement)(ts_base_js.IconBase, Object.assign({}, props, {
		id: "cell-0-double-icon",
		ref,
		icon: element
	}));
});
Cell0DoubleIcon.displayName = "Cell0DoubleIcon";
//#endregion
exports.Cell0DoubleIcon = Cell0DoubleIcon;
exports.default = Cell0DoubleIcon;
