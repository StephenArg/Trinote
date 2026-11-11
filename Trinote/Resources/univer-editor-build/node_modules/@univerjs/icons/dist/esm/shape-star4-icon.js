import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-star4-icon.tsx
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
			"d": "M12.7012 7.2988L20 10L12.7012 12.7012L10 20L7.2988 12.7012L0 10L7.2988 7.2988L10 0ZM8.5442 8.5442L4.6102 10L8.5442 11.4558L10 15.3885L11.4558 11.4558L15.3885 10L11.4558 8.5442L10 4.6102Z",
			"fillRule": "evenodd"
		}
	}]
};
const ShapeStar4Icon = forwardRef(function ShapeStar4Icon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-star4-icon",
		ref,
		icon: element
	}));
});
ShapeStar4Icon.displayName = "ShapeStar4Icon";
//#endregion
export { ShapeStar4Icon, ShapeStar4Icon as default };
