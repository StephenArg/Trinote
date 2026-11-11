import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/zloty-icon.tsx
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
			"d": "M10.092 14.8H1.3716V13.4548L7.6428 6.2652Q6.5389 6.3302 5.7596 6.3302H1.7334V4.9572H9.7858V6.0426L4.4516 12.2767Q4.2939 12.4715 3.6352 13.1858Q3.4775 13.3342 3.4218 13.4363Q4.3774 13.3528 5.5277 13.3528H10.092V14.8ZM14.6284 6.9888L13.376 8.0557V14.8H11.7247V9.4843L10.5094 10.4862V9.0205L11.7247 8.0186V1.2H13.376V6.5899L14.6284 5.5323V6.9888Z"
		}
	}]
};
const ZlotyIcon = forwardRef(function ZlotyIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "zloty-icon",
		ref,
		icon: element
	}));
});
ZlotyIcon.displayName = "ZlotyIcon";
//#endregion
export { ZlotyIcon, ZlotyIcon as default };
