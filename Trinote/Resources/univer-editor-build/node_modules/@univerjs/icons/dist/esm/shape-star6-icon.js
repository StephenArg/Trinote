import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-star6-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 20 20",
		"width": "1em",
		"height": "1em"
	},
	"children": [{
		"tag": "path",
		"attrs": {
			"fill": "currentColor",
			"d": "M12.9844 5L19 5L13.9697 10L19 15L12.9844 15L10 20L7.0156 15L1 15L6.0303 10L1 5L7.0156 5L10 0ZM7.9233 6.6L4.8799 6.6L8.2998 10L4.8799 13.4L7.9234 13.4L10 16.8768L12.0766 13.4L15.1201 13.4L11.7001 10L15.1201 6.6L12.0766 6.6L10 3.1221Z",
			"fillRule": "evenodd"
		}
	}]
};
const ShapeStar6Icon = forwardRef(function ShapeStar6Icon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-star6-icon",
		ref,
		icon: element
	}));
});
ShapeStar6Icon.displayName = "ShapeStar6Icon";
//#endregion
export { ShapeStar6Icon, ShapeStar6Icon as default };
