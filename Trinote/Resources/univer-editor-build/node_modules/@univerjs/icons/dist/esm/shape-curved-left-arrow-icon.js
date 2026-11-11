import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-curved-left-arrow-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 18 19",
		"width": "1em",
		"height": "1em"
	},
	"children": [{
		"tag": "path",
		"attrs": {
			"fill": "currentColor",
			"d": "M15.56944 8.66518C15.46709 6.54997 14.24853 5.5 12.16667 5.5L9.25 5.5L9.10092 5.5L9.02855 5.5L3.8468 5.5L3.8468 1.5L10.5118 2C13.62756 2.2003 16.05556 5.38081 16.05556 8.5918C16.05556 8.66075 15.57167 8.59674 15.56944 8.66518ZM18 8.5918C18 4.32466 14.77386 0.79254 10.63333 0.52637L2.4444 0L2.4444 7L12.16667 7C13.24055 7 14.11111 7.89543 14.11111 9C14.11111 10.1046 13.24055 11.5 12.16667 11.5L12.16667 13C13.72842 13 15.07423 12.0526 15.69287 10.6865C14.92301 12.8423 12.99938 14.7903 10.65612 15L5.4523 15.2865L5.3611 15.2969L3.8468 14.2754L5.4523 13L12.16667 13L12.16667 11.5L7.3056 11.5L7.3056 9.5L0.5 14.4072L7.3056 19L7.3056 16.957L10.82416 16.6416C14.88383 16.2785 17.99983 12.7832 18 8.5918Z"
		}
	}]
};
const ShapeCurvedLeftArrowIcon = forwardRef(function ShapeCurvedLeftArrowIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-curved-left-arrow-icon",
		ref,
		icon: element
	}));
});
ShapeCurvedLeftArrowIcon.displayName = "ShapeCurvedLeftArrowIcon";
//#endregion
export { ShapeCurvedLeftArrowIcon, ShapeCurvedLeftArrowIcon as default };
