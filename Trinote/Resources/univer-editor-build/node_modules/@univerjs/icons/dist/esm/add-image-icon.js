import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/add-image-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 16 16",
		"width": "1em",
		"height": "1em"
	},
	"children": [
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M7.9998 1.65005H3.64981C2.54524 1.65005 1.6498 2.54548 1.6498 3.65005V12.35C1.6498 13.4546 2.54523 14.35 3.6498 14.35H12.3498C13.4544 14.35 14.3498 13.4546 14.3498 12.3501V8.00005",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M1.6498 11.2148L5.43408 8.29588L10.711 12.0198",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M9.46559 10.1621L10.9774 8.65032C11.2042 8.42344 11.5634 8.39794 11.8201 8.59045L14.3498 10.4877",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M11.8097 1.74783V6.24167M9.6603 3.897H14.1541",
				"strokeLinecap": "round",
				"strokeWidth": 1.2
			}
		}
	]
};
const AddImageIcon = forwardRef(function AddImageIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "add-image-icon",
		ref,
		icon: element
	}));
});
AddImageIcon.displayName = "AddImageIcon";
//#endregion
export { AddImageIcon, AddImageIcon as default };
