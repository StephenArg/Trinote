Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
let react = require("react");
let ts_base_js = require("./base.js");
//#region ts/roundness-icon.tsx
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
			"r": 6.5,
			"fill": "currentColor"
		}
	}]
};
const RoundnessIcon = (0, react.forwardRef)(function RoundnessIcon(props, ref) {
	return (0, react.createElement)(ts_base_js.IconBase, Object.assign({}, props, {
		id: "roundness-icon",
		ref,
		icon: element
	}));
});
RoundnessIcon.displayName = "RoundnessIcon";
//#endregion
exports.RoundnessIcon = RoundnessIcon;
exports.default = RoundnessIcon;
