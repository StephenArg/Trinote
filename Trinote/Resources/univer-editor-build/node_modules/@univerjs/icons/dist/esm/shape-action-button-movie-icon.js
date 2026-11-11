import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-action-button-movie-icon.tsx
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
			"stroke": "currentColor",
			"d": "M1.8 1.8H18.2V18.2H1.8z",
			"strokeWidth": 1.6
		}
	}, {
		"tag": "path",
		"attrs": {
			"fill": "currentColor",
			"d": "M4.7061 11L3.5 11L3.5 6L5 6L5 5L14 5L14 6L14.5879 6L15.2939 5L16 5L16 13L15.2939 13L14.5879 12L14 12L14 15L4.7061 15ZM6.306 13.4L12.4 13.4L12.4 10.4L14.4 10.4L14.4 7.6L12.4 7.6L12.4 6.6L6.6 6.6L6.6 7.6L5.1 7.6L5.1 9.4L6.306 9.4Z",
			"fillRule": "evenodd"
		}
	}]
};
const ShapeActionButtonMovieIcon = forwardRef(function ShapeActionButtonMovieIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-action-button-movie-icon",
		ref,
		icon: element
	}));
});
ShapeActionButtonMovieIcon.displayName = "ShapeActionButtonMovieIcon";
//#endregion
export { ShapeActionButtonMovieIcon, ShapeActionButtonMovieIcon as default };
