import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-ellipse-ribbon-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 20 20",
		"width": "1em",
		"height": "1em"
	},
	"children": [
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M10 18C7.62453 18 4 16 4 16V7C4 7 7.62453 8.5 10 8.5C12.3755 8.5 16 7 16 7V16C16 16 12.3755 18 10 18ZM10.0091 16.833C10.7688 16.833 11.8187 16.491 13 16C13.3189 15.8675 14.2389 15.5207 14.5 15.3986V9C13.333 9.4437 11.3464 10 10 10C8.65361 10 6.66698 9.4437 5.5 9V15.2646C5.76114 15.3867 6.68111 15.8675 7 16C8.18134 16.491 9.24939 16.833 10.0091 16.833Z"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M4 8.5V4H9V9.5L4 8.5ZM7.5 5.5H5.5V7.5L7.5 8V5.5Z",
				"fillRule": "evenodd",
				"clipRule": "evenodd"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M16 8.5L16 4L11 4L11 9.5L16 8.5ZM12.5 5.5L14.5 5.5L14.5 7.5L12.5 8L12.5 5.5Z",
				"fillRule": "evenodd",
				"clipRule": "evenodd"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M3.5 13.5C2.49588 13.5 0.5 13 0.5 13L2.5 8.5L0.5 3.5C0.5 3.5 2.42459 4 3.42871 4L3.5 5.5C3.36588 5.5 3.09687 5.51359 2.96191 5.5L3.8291 8.56543L2.59668 11.8027C2.72342 11.8404 2.84589 11.8757 2.96191 11.9053C3.29605 11.9903 3.43669 11.9999 3.42871 12H4V5.5H3.5L3.42871 4H5.5V9V13.5H3.5Z"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M16.5 13.5C17.5041 13.5 19.5 13 19.5 13L17.5 8.5L19.5 3.5C19.5 3.5 17.5754 4 16.5713 4L16.5 5.5C16.6341 5.5 16.9031 5.51359 17.0381 5.5L16.1709 8.56543L17.4033 11.8027C17.2766 11.8404 17.1541 11.8757 17.0381 11.9053C16.7039 11.9903 16.5633 11.9999 16.5713 12H16V5.5H16.5L16.5713 4H14.5V9V13.5H16.5Z"
			}
		}
	]
};
const ShapeEllipseRibbonIcon = forwardRef(function ShapeEllipseRibbonIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-ellipse-ribbon-icon",
		ref,
		icon: element
	}));
});
ShapeEllipseRibbonIcon.displayName = "ShapeEllipseRibbonIcon";
//#endregion
export { ShapeEllipseRibbonIcon, ShapeEllipseRibbonIcon as default };
