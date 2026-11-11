import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-curved-up-arrow-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 19 18",
		"width": "1em",
		"height": "1em"
	},
	"children": [{
		"tag": "path",
		"attrs": {
			"fill": "currentColor",
			"d": "M8.66518 15.56944C6.54997 15.46709 5.5 14.24853 5.5 12.16667L5.5 9.25L5.5 9.10092L5.5 9.02855L5.5 3.8468L1.5 3.8468L2 10.5118C2.2003 13.62756 5.38081 16.05556 8.5918 16.05556C8.66075 16.05556 8.59674 15.57167 8.66518 15.56944ZM8.5918 18C4.32466 18 0.79254 14.77386 0.52637 10.63333L0 2.4444L7 2.4444L7 12.16667C7 13.24055 7.89543 14.11111 9 14.11111C10.1046 14.11111 11.5 13.24055 11.5 12.16667L13 12.16667C13 13.72842 12.0526 15.07423 10.6865 15.69287C12.8423 14.92301 14.7903 12.99938 15 10.65612L15.2865 5.4523L15.2969 5.3611L14.2754 3.8468L13 5.4523L13 12.16667L11.5 12.16667L11.5 7.3056L9.5 7.3056L14.4072 0.5L19 7.3056L16.957 7.3056L16.6416 10.82416C16.2785 14.88383 12.7832 17.99983 8.5918 18Z"
		}
	}]
};
const ShapeCurvedUpArrowIcon = forwardRef(function ShapeCurvedUpArrowIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-curved-up-arrow-icon",
		ref,
		icon: element
	}));
});
ShapeCurvedUpArrowIcon.displayName = "ShapeCurvedUpArrowIcon";
//#endregion
export { ShapeCurvedUpArrowIcon, ShapeCurvedUpArrowIcon as default };
