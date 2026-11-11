import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-quad-arrow-callout-icon.tsx
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
			"d": "M14 4L13 4L13 5L15 5L15 7L16 7L16 5.8037L20 10L16 14.1963L16 13L15 13L15 15L13 15L13 16L14 16L9.8037 20L5.6074 16L7 16L7 15L5 15L5 13L4 13L4 14.1963L0 10L4 5.8037L4 7L5 7L5 5L7 5L7 4L5.6074 4L9.8037 0ZM8.6 3.3569L8.6 6.6L6.6 6.6L6.6 8.6L3.5445 8.6L2.2101 10L3.5445 11.4L6.6 11.4L6.6 13.4L8.6 13.4L8.6 16.6429L9.8038 17.7911L11.4 16.2679L11.4 13.4L13.4 13.4L13.4 11.4L16.4554 11.4L17.7912 10L16.4554 8.6L13.4 8.6L13.4 6.6L11.4 6.6L11.4 3.732L9.8038 2.2101Z",
			"fillRule": "evenodd"
		}
	}]
};
const ShapeQuadArrowCalloutIcon = forwardRef(function ShapeQuadArrowCalloutIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-quad-arrow-callout-icon",
		ref,
		icon: element
	}));
});
ShapeQuadArrowCalloutIcon.displayName = "ShapeQuadArrowCalloutIcon";
//#endregion
export { ShapeQuadArrowCalloutIcon, ShapeQuadArrowCalloutIcon as default };
