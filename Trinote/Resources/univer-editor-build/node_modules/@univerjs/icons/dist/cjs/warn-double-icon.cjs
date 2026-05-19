Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
let react = require("react");
let ts_base_js = require("./base.js");
//#region ts/warn-double-icon.tsx
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
				"r": 7,
				"fill": "currentColor"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "colorChannel1",
				"d": "M7.4 4.4335C7.4 4.10213 7.66863 3.8335 8 3.8335C8.33137 3.8335 8.6 4.10213 8.6 4.4335V9.36683C8.6 9.6982 8.33137 9.96683 8 9.96683C7.66863 9.96683 7.4 9.6982 7.4 9.36683V4.4335Z"
			}
		},
		{
			"tag": "circle",
			"attrs": {
				"cx": 8,
				"cy": 11.53,
				"r": .83,
				"fill": "colorChannel1"
			}
		}
	]
};
const WarnDoubleIcon = (0, react.forwardRef)(function WarnDoubleIcon(props, ref) {
	return (0, react.createElement)(ts_base_js.IconBase, Object.assign({}, props, {
		id: "warn-double-icon",
		ref,
		icon: element
	}));
});
WarnDoubleIcon.displayName = "WarnDoubleIcon";
//#endregion
exports.WarnDoubleIcon = WarnDoubleIcon;
exports.default = WarnDoubleIcon;
