Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
let react = require("react");
let ts_base_js = require("./base.js");
//#region ts/up-icon.tsx
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
		"tag": "path",
		"attrs": {
			"fill": "currentColor",
			"d": "M7.48861 4.23829C7.75558 3.87976 8.29238 3.87976 8.55935 4.23829L12.9614 10.1507C13.2907 10.5929 12.975 11.2223 12.4236 11.2223H3.62432C3.07292 11.2223 2.75722 10.5929 3.08649 10.1507L7.48861 4.23829Z"
		}
	}]
};
const UpIcon = (0, react.forwardRef)(function UpIcon(props, ref) {
	return (0, react.createElement)(ts_base_js.IconBase, Object.assign({}, props, {
		id: "up-icon",
		ref,
		icon: element
	}));
});
UpIcon.displayName = "UpIcon";
//#endregion
exports.UpIcon = UpIcon;
exports.default = UpIcon;
