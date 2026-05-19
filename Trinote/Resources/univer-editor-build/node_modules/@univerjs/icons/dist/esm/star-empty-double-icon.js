import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/star-empty-double-icon.tsx
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
			"fill": "colorChannel1",
			"d": "M8 1.8L9.73075 5.30631L13.6 5.86863L10.8 8.59897L11.4615 12.4526L8 10.632L4.53853 12.4526L5.2 8.59897L2.4 5.86863L6.26927 5.30631L8 1.8Z"
		}
	}]
};
const StarEmptyDoubleIcon = forwardRef(function StarEmptyDoubleIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "star-empty-double-icon",
		ref,
		icon: element
	}));
});
StarEmptyDoubleIcon.displayName = "StarEmptyDoubleIcon";
//#endregion
export { StarEmptyDoubleIcon, StarEmptyDoubleIcon as default };
