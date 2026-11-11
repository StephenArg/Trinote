import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/comment-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 17 17",
		"width": "1em",
		"height": "1em"
	},
	"children": [{
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M2.43993 3.31861H15.0381V12.5611H8.65676L5.75498 14.069V12.5611H2.43993V3.31861Z",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.2
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M5.83725 7.50706V8.41159M8.73904 7.50706V8.41159M11.6408 7.50706V8.41159",
			"strokeLinecap": "round",
			"strokeWidth": 1.39
		}
	}]
};
const CommentIcon = forwardRef(function CommentIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "comment-icon",
		ref,
		icon: element
	}));
});
CommentIcon.displayName = "CommentIcon";
//#endregion
export { CommentIcon, CommentIcon as default };
