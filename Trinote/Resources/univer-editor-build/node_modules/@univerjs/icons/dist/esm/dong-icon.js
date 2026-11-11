import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/dong-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 16 16",
		"width": "1em",
		"height": "1em"
	},
	"children": [{
		"tag": "path",
		"attrs": {
			"fill": "currentColor",
			"d": "M12.2058 3.459H11.2416V12.6604H9.6438V11.6962Q8.9091 12.844 7.4858 12.844Q5.8971 12.844 4.8456 11.6686Q3.7942 10.4932 3.7942 8.5739Q3.7942 6.5904 4.7814 5.4471Q5.7685 4.3038 7.4031 4.3038Q8.9183 4.3038 9.5887 5.3415V3.459H7.5041V2.1091H9.5887V1.2H11.2416V2.1091H12.2058V3.459ZM7.6143 11.4941Q8.5234 11.4941 9.0744 10.8008Q9.6254 10.1075 9.6254 8.7484Q9.6254 5.6629 7.5592 5.6629Q6.5491 5.6629 6.0211 6.4297Q5.493 7.1965 5.493 8.5923Q5.493 11.4941 7.6143 11.4941ZM11.2416 14.8H4.0421V13.4501H11.2416V14.8Z"
		}
	}]
};
const DongIcon = forwardRef(function DongIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "dong-icon",
		ref,
		icon: element
	}));
});
DongIcon.displayName = "DongIcon";
//#endregion
export { DongIcon, DongIcon as default };
