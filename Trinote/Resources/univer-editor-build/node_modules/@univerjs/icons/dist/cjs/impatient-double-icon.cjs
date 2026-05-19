Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
let react = require("react");
let ts_base_js = require("./base.js");
//#region ts/impatient-double-icon.tsx
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
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M4.9 5.4L6.7 6.15",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M11.1 5.4L9.3 6.15",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "circle",
			"attrs": {
				"cx": 5.75,
				"cy": 7.2,
				"r": .65,
				"fill": "currentColor"
			}
		},
		{
			"tag": "circle",
			"attrs": {
				"cx": 10.25,
				"cy": 7.2,
				"r": .65,
				"fill": "currentColor"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M5 11.25C5.7 10.05 6.7 9.45 8 9.45C9.3 9.45 10.3 10.05 11 11.25",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		}
	]
};
const ImpatientDoubleIcon = (0, react.forwardRef)(function ImpatientDoubleIcon(props, ref) {
	return (0, react.createElement)(ts_base_js.IconBase, Object.assign({}, props, {
		id: "impatient-double-icon",
		ref,
		icon: element
	}));
});
ImpatientDoubleIcon.displayName = "ImpatientDoubleIcon";
//#endregion
exports.ImpatientDoubleIcon = ImpatientDoubleIcon;
exports.default = ImpatientDoubleIcon;
