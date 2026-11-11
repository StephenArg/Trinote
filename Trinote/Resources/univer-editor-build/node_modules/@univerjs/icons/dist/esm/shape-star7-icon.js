import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-star7-icon.tsx
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
			"d": "M12.7002 5.0137L19.0449 5.0137L14.8457 9.627L20 14.54L15.6416 14.54L15.4766 20L10 14.54L4.5234 20L4.8857 14.54L0 14.54L5.1543 9.627L0.9551 5.0137L7.2998 5.0137L10 0ZM8.2552 6.6137L4.5754 6.6137L7.3902 9.7058L3.9966 12.94L6.595 12.94L6.4818 14.6444L6.3939 15.8745L9.9999 12.2797L13.9871 16.2561L14.0424 14.4918L14.0893 12.94L16.0034 12.94L12.6098 9.7058L15.4245 6.6137L11.7448 6.6137L10 3.373Z",
			"fillRule": "evenodd"
		}
	}]
};
const ShapeStar7Icon = forwardRef(function ShapeStar7Icon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-star7-icon",
		ref,
		icon: element
	}));
});
ShapeStar7Icon.displayName = "ShapeStar7Icon";
//#endregion
export { ShapeStar7Icon, ShapeStar7Icon as default };
