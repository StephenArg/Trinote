import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-bent-up-arrow-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 18 17",
		"width": "1em",
		"height": "1em"
	},
	"children": [{
		"tag": "mask",
		"attrs": {
			"id": "mask0_1_36",
			"width": 18,
			"height": 17,
			"x": 0,
			"y": 0,
			"maskUnits": "userSpaceOnUse"
		},
		"children": [{
			"tag": "path",
			"attrs": {
				"fill": "white",
				"d": "M17.083 6H15V17H0V11H9V6H7.08301L12.083 0L17.083 6Z"
			}
		}]
	}, {
		"tag": "g",
		"attrs": { "mask": "url(#mask0_1_36)" },
		"children": [{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M17.083 6V8H21.3531L18.6194 4.71963L17.083 6ZM15 6V4H13.5V6H15ZM15 17V19H17V17H15ZM0 17H-2V19H0V17ZM0 11V9H-2V11H0ZM9 11V12.5H10.5V11H9ZM9 6H10.5V4H9V6ZM7.08301 6L5.54657 4.71963L2.81292 8H7.08301V6ZM12.083 2.38419e-07L13.6195 -1.28037L12.083 -3.1241L10.5466 -1.28037L12.083 2.38419e-07ZM17.083 6V4H15V6V8H17.083V6ZM15 6H13.5V17H15H17V6H15ZM15 17V15.5H0V17V19H15V17ZM0 17H1.5V14V12.5L1.41699 11H0H-2V17H0ZM0 11V12.5H9V11V9H0V11ZM9 11H10.5V8.5V6H9H7V11H9ZM9 6V4H7.08301V6V8H9V6ZM7.08301 6L8.33913 7L13.3391 1L12.083 2.38419e-07L10.5466 -1.28037L5.54657 4.71963L7.08301 6ZM12.083 2.38419e-07L10.6217 1L16.0322 7L17.083 6L18.6194 4.71963L13.6195 -1.28037L12.083 2.38419e-07Z"
			}
		}]
	}]
};
const ShapeBentUpArrowIcon = forwardRef(function ShapeBentUpArrowIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-bent-up-arrow-icon",
		ref,
		icon: element
	}));
});
ShapeBentUpArrowIcon.displayName = "ShapeBentUpArrowIcon";
//#endregion
export { ShapeBentUpArrowIcon, ShapeBentUpArrowIcon as default };
