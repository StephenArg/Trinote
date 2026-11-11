import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-quad-arrow-icon.tsx
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
			"d": "M15 4L13 4L13 7L16 7L16 4.8L20 10L16 15.2L16 13L13 13L13 16L15 16L10 20L5 16L7 16L7 13L4 13L4 15.2L0 10L4 4.8L4 7L7 7L7 4L5 4L10 0ZM8.6 3.2547L8.6 8.6L3.0989 8.6L2.022 10L3.0989 11.4L8.6 11.4L8.6 16.7453L10 17.8653L11.4 16.7453L11.4 11.4L16.9011 11.4L17.978 10L16.9011 8.6L11.4 8.6L11.4 3.2547L10 2.1347Z",
			"fillRule": "evenodd"
		}
	}]
};
const ShapeQuadArrowIcon = forwardRef(function ShapeQuadArrowIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-quad-arrow-icon",
		ref,
		icon: element
	}));
});
ShapeQuadArrowIcon.displayName = "ShapeQuadArrowIcon";
//#endregion
export { ShapeQuadArrowIcon, ShapeQuadArrowIcon as default };
