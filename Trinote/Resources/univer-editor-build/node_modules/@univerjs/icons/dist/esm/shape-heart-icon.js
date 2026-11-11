import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-heart-icon.tsx
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
			"d": "M10.0713 18L3 11C1.7859 10.0868 1 8.6356 1 7C1 4.2386 3.2386 2 6 2C7.6357 2 9.0878 2.7857 10 4C10.9122 2.7857 12.3642 2 14 2C16.7614 2 19 4.2386 19 7C19 8.6358 18.2134 10.0868 16.999 10.9991L17 11L10.0713 18ZM10.0713 15.74L4.05 9.78C3.2 9.15 2.7 8.16 2.7 7C2.7 5.1775 4.1775 3.7 6 3.7C7.0781 3.7 8.0603 4.2108 8.6821 5.0624L10 6.856L11.3179 5.0624C11.9397 4.2108 12.9219 3.7 14 3.7C15.8225 3.7 17.3 5.1775 17.3 7C17.3 8.1601 16.7989 9.1506 15.9506 9.7781L10.0713 15.74Z",
			"fillRule": "evenodd"
		}
	}]
};
const ShapeHeartIcon = forwardRef(function ShapeHeartIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-heart-icon",
		ref,
		icon: element
	}));
});
ShapeHeartIcon.displayName = "ShapeHeartIcon";
//#endregion
export { ShapeHeartIcon, ShapeHeartIcon as default };
