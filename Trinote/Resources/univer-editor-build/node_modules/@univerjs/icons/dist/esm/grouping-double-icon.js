import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/grouping-double-icon.tsx
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
				"fill": "currentColor",
				"d": "M7.05 1C6.38726 1 5.85 1.53726 5.85 2.2V13.8C5.85 14.4627 6.38726 15 7.05 15H13.4C14.0627 15 14.6 14.4627 14.6 13.8V2.2C14.6 1.53726 14.0627 1 13.4 1H7.05ZM7.05 2.2H13.4V4.05H7.05V2.2ZM7.05 5.25H13.4V7.4H7.05V5.25ZM13.4 8.6H7.05V10.75H13.4V8.6ZM7.05 11.95H13.4V13.8H7.05V11.95Z",
				"fillRule": "evenodd",
				"clipRule": "evenodd"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M2.9 4.8V3.65H5.95M2.9 11.2V12.35H5.95",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "colorChannel1",
				"d": "M2.9 6C3.25899 6 3.55 6.29101 3.55 6.65V7.35H4.25C4.60899 7.35 4.9 7.64101 4.9 8C4.9 8.35899 4.60899 8.65 4.25 8.65H3.55V9.35C3.55 9.70899 3.25899 10 2.9 10C2.54101 10 2.25 9.70899 2.25 9.35V8.65H1.55C1.19101 8.65 0.9 8.35899 0.9 8C0.9 7.64101 1.19101 7.35 1.55 7.35H2.25V6.65C2.25 6.29101 2.54101 6 2.9 6Z"
			}
		}
	]
};
const GroupingDoubleIcon = forwardRef(function GroupingDoubleIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "grouping-double-icon",
		ref,
		icon: element
	}));
});
GroupingDoubleIcon.displayName = "GroupingDoubleIcon";
//#endregion
export { GroupingDoubleIcon, GroupingDoubleIcon as default };
