import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/rating-icon.tsx
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
		"tag": "rect",
		"attrs": {
			"width": 13,
			"height": 13,
			"x": 1.5,
			"y": 1.5,
			"stroke": "currentColor",
			"rx": 1.5,
			"strokeWidth": 1.2
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M8 4L9.19 6.42L11.85 6.81L9.93 8.68L10.38 11.33L8 10.08L5.62 11.33L6.07 8.68L4.15 6.81L6.81 6.42L8 4Z",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.2
		}
	}]
};
const RatingIcon = forwardRef(function RatingIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "rating-icon",
		ref,
		icon: element
	}));
});
RatingIcon.displayName = "RatingIcon";
//#endregion
export { RatingIcon, RatingIcon as default };
