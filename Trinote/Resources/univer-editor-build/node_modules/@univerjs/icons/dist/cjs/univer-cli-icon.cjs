Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
let react = require("react");
let ts_base_js = require("./base.js");
//#region ts/univer-cli-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 20 20",
		"width": "1em",
		"height": "1em"
	},
	"children": [
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M6.674 9.781C6.674 9.862 6.623 9.934 6.548 9.961L0.009 12.338V15.524L8.635 12.179C9.204 11.96 9.58 11.413 9.58 10.803V0.016H6.674V9.781L6.674 9.781Z"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M19.992 12.338V15.524L11.191 12.179C10.622 11.96 10.246 11.413 10.246 10.803V8.715C10.246 8.105 10.622 7.557 11.191 7.338L19.992 4.012V7.475L13.217 9.76C13.178 9.773 13.153 9.809 13.153 9.849C13.153 9.889 13.178 9.924 13.215 9.938L19.992 12.338V12.338Z"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M9.58 13.196V19.999H6.674L6.675 13.952C6.675 13.76 6.793 13.589 6.972 13.52L8.953 12.764C9.256 12.648 9.58 12.871 9.58 13.196V13.196Z"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M5.495 9.465L0.009 7.221V3.994L5.774 6.354C5.913 6.411 6.004 6.546 6.004 6.696L6.005 9.122C6.005 9.386 5.739 9.565 5.495 9.465H5.495Z"
			}
		}
	]
};
const UniverCliIcon = (0, react.forwardRef)(function UniverCliIcon(props, ref) {
	return (0, react.createElement)(ts_base_js.IconBase, Object.assign({}, props, {
		id: "univer-cli-icon",
		ref,
		icon: element
	}));
});
UniverCliIcon.displayName = "UniverCliIcon";
//#endregion
exports.UniverCliIcon = UniverCliIcon;
exports.default = UniverCliIcon;
