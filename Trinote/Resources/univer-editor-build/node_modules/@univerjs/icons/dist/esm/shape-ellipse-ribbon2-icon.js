import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-ellipse-ribbon2-icon.tsx
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
				"d": "M10 2C12.3755 2 16 4 16 4V13C16 13 12.3755 11.5 10 11.5C7.6245 11.5 4 13 4 13V4C4 4 7.6245 2 10 2ZM9.99087 3.16696C9.23117 3.16696 8.1813 3.509 7 4C6.6811 4.1325 5.7611 4.47933 5.5 4.60143V11C6.667 10.5563 8.6536 10 10 10C11.3464 10 13.333 10.5563 14.5 11V4.7354C14.2389 4.6133 13.3189 4.1325 13 4C11.8187 3.509 10.7506 3.16696 9.99087 3.16696Z"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M16 11.5V16H11V10.5L16 11.5ZM12.5 14.5H14.5V12.5L12.5 12V14.5Z",
				"fillRule": "evenodd",
				"clipRule": "evenodd"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M4 11.5L4 16L9 16L9 10.5L4 11.5ZM7.5 14.5L5.5 14.5L5.5 12.5L7.5 12L7.5 14.5Z",
				"fillRule": "evenodd",
				"clipRule": "evenodd"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M16.5 6.5C17.5041 6.5 19.5 7 19.5 7L17.5 11.5L19.5 16.5C19.5 16.5 17.5754 16 16.5713 16L16.5 14.5C16.6341 14.5 16.9031 14.4864 17.0381 14.5L16.1709 11.4346L17.4033 8.1973C17.2766 8.1596 17.1541 8.1243 17.0381 8.0947C16.7039 8.0097 16.5633 8.0001 16.5713 8H16V14.5H16.5L16.5713 16H14.5V11V6.5H16.5Z"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M3.5 6.5C2.49588 6.5 0.5 7 0.5 7L2.5 11.5L0.5 16.5C0.5 16.5 2.42459 16 3.42871 16L3.5 14.5C3.36588 14.5 3.09687 14.4864 2.96191 14.5L3.8291 11.4346L2.59668 8.1973C2.72342 8.1596 2.84589 8.1243 2.96191 8.0947C3.29605 8.0097 3.43669 8.0001 3.42871 8H4V14.5H3.5L3.42871 16H5.5V11V6.5H3.5Z"
			}
		}
	]
};
const ShapeEllipseRibbon2Icon = forwardRef(function ShapeEllipseRibbon2Icon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-ellipse-ribbon2-icon",
		ref,
		icon: element
	}));
});
ShapeEllipseRibbon2Icon.displayName = "ShapeEllipseRibbon2Icon";
//#endregion
export { ShapeEllipseRibbon2Icon, ShapeEllipseRibbon2Icon as default };
