Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
let react = require("react");
let ts_base_js = require("./base.js");
//#region ts/star-full-double-icon.tsx
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
			"d": "M8 1.8L9.73075 5.30631L13.6 5.86863L10.8 8.59897L11.4615 12.4526L8 10.632L4.53853 12.4526L5.2 8.59897L2.4 5.86863L6.26927 5.30631L8 1.8Z"
		}
	}]
};
const StarFullDoubleIcon = (0, react.forwardRef)(function StarFullDoubleIcon(props, ref) {
	return (0, react.createElement)(ts_base_js.IconBase, Object.assign({}, props, {
		id: "star-full-double-icon",
		ref,
		icon: element
	}));
});
StarFullDoubleIcon.displayName = "StarFullDoubleIcon";
//#endregion
exports.StarFullDoubleIcon = StarFullDoubleIcon;
exports.default = StarFullDoubleIcon;
