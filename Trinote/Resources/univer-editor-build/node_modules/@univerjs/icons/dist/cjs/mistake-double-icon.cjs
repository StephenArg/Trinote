Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
let react = require("react");
let ts_base_js = require("./base.js");
//#region ts/mistake-double-icon.tsx
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
			"r": 7,
			"fill": "currentColor"
		}
	}, {
		"tag": "path",
		"attrs": {
			"fill": "colorChannel1",
			"d": "M5.69014 5.69014C5.45583 5.92445 5.45583 6.30435 5.69014 6.53867L7.15137 7.9999L5.6899 9.46137C5.45558 9.69569 5.45558 10.0756 5.6899 10.3099C5.92421 10.5442 6.30411 10.5442 6.53842 10.3099L7.9999 8.84843L9.46137 10.3099C9.69569 10.5442 10.0756 10.5442 10.3099 10.3099C10.5442 10.0756 10.5442 9.69569 10.3099 9.46137L8.84843 7.9999L10.3097 6.53867C10.544 6.30435 10.544 5.92445 10.3097 5.69014C10.0753 5.45583 9.69544 5.45583 9.46113 5.69014L7.9999 7.15137L6.53867 5.69014C6.30435 5.45583 5.92445 5.45583 5.69014 5.69014Z"
		}
	}]
};
const MistakeDoubleIcon = (0, react.forwardRef)(function MistakeDoubleIcon(props, ref) {
	return (0, react.createElement)(ts_base_js.IconBase, Object.assign({}, props, {
		id: "mistake-double-icon",
		ref,
		icon: element
	}));
});
MistakeDoubleIcon.displayName = "MistakeDoubleIcon";
//#endregion
exports.MistakeDoubleIcon = MistakeDoubleIcon;
exports.default = MistakeDoubleIcon;
