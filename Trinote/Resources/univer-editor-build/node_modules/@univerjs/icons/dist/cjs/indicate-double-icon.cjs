Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
let react = require("react");
let ts_base_js = require("./base.js");
//#region ts/indicate-double-icon.tsx
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
			"width": 12,
			"height": 12,
			"x": 2,
			"y": 2,
			"fill": "currentColor",
			"rx": 2.4
		}
	}, {
		"tag": "circle",
		"attrs": {
			"cx": 8,
			"cy": 8,
			"r": 3.75,
			"fill": "colorChannel1"
		}
	}]
};
const IndicateDoubleIcon = (0, react.forwardRef)(function IndicateDoubleIcon(props, ref) {
	return (0, react.createElement)(ts_base_js.IconBase, Object.assign({}, props, {
		id: "indicate-double-icon",
		ref,
		icon: element
	}));
});
IndicateDoubleIcon.displayName = "IndicateDoubleIcon";
//#endregion
exports.IndicateDoubleIcon = IndicateDoubleIcon;
exports.default = IndicateDoubleIcon;
