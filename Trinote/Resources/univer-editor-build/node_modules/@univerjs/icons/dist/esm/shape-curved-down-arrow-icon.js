import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-curved-down-arrow-icon.tsx
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
			"d": "M8.66518 2.43056C6.54997 2.53291 5.5 3.75147 5.5 5.83333V8.75V8.89908V8.97145V14.1532H1.5L2 7.4882C2.2003 4.37244 5.38081 1.94444 8.5918 1.94444C8.66075 1.94444 8.59674 2.42833 8.66518 2.43056ZM8.5918 0C4.32466 0 0.79254 3.22614 0.52637 7.36667L0 15.5556H7V5.83333C7 4.75945 7.89543 3.88889 9 3.88889C10.1046 3.88889 11.5 4.75945 11.5 5.83333H13C13 4.27158 12.0526 2.92577 10.6865 2.30713C12.8423 3.07699 14.7903 5.00062 15 7.34388L15.2865 12.5477L15.2969 12.6389L14.2754 14.1532L13 12.5477V5.83333H11.5V10.6944H9.5L14.4072 17.5L19 10.6944H16.957L16.6416 7.17584C16.2785 3.11617 12.7832 0.000175 8.5918 0Z"
		}
	}]
};
const ShapeCurvedDownArrowIcon = forwardRef(function ShapeCurvedDownArrowIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-curved-down-arrow-icon",
		ref,
		icon: element
	}));
});
ShapeCurvedDownArrowIcon.displayName = "ShapeCurvedDownArrowIcon";
//#endregion
export { ShapeCurvedDownArrowIcon, ShapeCurvedDownArrowIcon as default };
