Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
let react = require("react");
let ts_base_js = require("./base.js");
//#region ts/point-color-double-icon.tsx
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
		"tag": "circle",
		"attrs": {
			"cx": 8,
			"cy": 8,
			"r": 8,
			"fill": "colorChannel1"
		}
	}, {
		"tag": "path",
		"attrs": {
			"fill": "currentColor",
			"d": "M8.92204 11.2255C8.43208 11.779 7.56829 11.779 7.07833 11.2255L4.13584 7.9017C3.43246 7.10716 3.99655 5.85442 5.0577 5.85442L10.9427 5.85442C12.0038 5.85442 12.5679 7.10716 11.8645 7.9017L8.92204 11.2255Z"
		}
	}]
};
const PointColorDoubleIcon = (0, react.forwardRef)(function PointColorDoubleIcon(props, ref) {
	return (0, react.createElement)(ts_base_js.IconBase, Object.assign({}, props, {
		id: "point-color-double-icon",
		ref,
		icon: element
	}));
});
PointColorDoubleIcon.displayName = "PointColorDoubleIcon";
//#endregion
exports.PointColorDoubleIcon = PointColorDoubleIcon;
exports.default = PointColorDoubleIcon;
