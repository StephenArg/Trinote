import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-folder-corner-icon.tsx
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
			"tag": "defs",
			"attrs": {},
			"children": [{
				"tag": "clipPath",
				"attrs": { "id": "shape-folder-corner-icon_shape-folder-corner-icon-clip-0" },
				"children": [{
					"tag": "path",
					"attrs": { "d": "M17 3H3V20C1.89543 20 1 19.1046 1 18V3C1 1.89543 1.89543 1 3 1H17C18.1046 1 19 1.89543 19 3V13L12 20H3V18H11.1719L17 12.1719V3Z" }
				}]
			}, {
				"tag": "clipPath",
				"attrs": { "id": "shape-folder-corner-icon_shape-folder-corner-icon-clip-1" },
				"children": [{
					"tag": "path",
					"attrs": { "d": "M12 14C12 13.4477 12.4477 13 13 13H18V11H13C11.3431 11 10 12.3431 10 14V19H12V14Z" }
				}]
			}]
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M17 3H3V20C1.89543 20 1 19.1046 1 18V3C1 1.89543 1.89543 1 3 1H17C18.1046 1 19 1.89543 19 3V13L12 20H3V18H11.1719L17 12.1719V3Z",
				"strokeWidth": 3.2,
				"clipPath": "url(#shape-folder-corner-icon_shape-folder-corner-icon-clip-0)"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M12 14C12 13.4477 12.4477 13 13 13H18V11H13C11.3431 11 10 12.3431 10 14V19H12V14Z",
				"strokeWidth": 3.2,
				"clipPath": "url(#shape-folder-corner-icon_shape-folder-corner-icon-clip-1)"
			}
		}
	],
	"defIds": ["shape-folder-corner-icon_shape-folder-corner-icon-clip-0", "shape-folder-corner-icon_shape-folder-corner-icon-clip-1"]
};
const ShapeFolderCornerIcon = forwardRef(function ShapeFolderCornerIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-folder-corner-icon",
		ref,
		icon: element
	}));
});
ShapeFolderCornerIcon.displayName = "ShapeFolderCornerIcon";
//#endregion
export { ShapeFolderCornerIcon, ShapeFolderCornerIcon as default };
