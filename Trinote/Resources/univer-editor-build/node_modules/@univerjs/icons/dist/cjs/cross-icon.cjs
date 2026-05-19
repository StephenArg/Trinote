Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
let react = require("react");
let ts_base_js = require("./base.js");
//#region ts/cross-icon.tsx
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
		"tag": "rect",
		"attrs": {
			"width": 10,
			"height": 2,
			"x": 3,
			"y": 7,
			"fill": "currentColor",
			"rx": .75
		}
	}]
};
const CrossIcon = (0, react.forwardRef)(function CrossIcon(props, ref) {
	return (0, react.createElement)(ts_base_js.IconBase, Object.assign({}, props, {
		id: "cross-icon",
		ref,
		icon: element
	}));
});
CrossIcon.displayName = "CrossIcon";
//#endregion
exports.CrossIcon = CrossIcon;
exports.default = CrossIcon;
