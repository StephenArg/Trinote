import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/boards-multi-icon.tsx
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
				"fill": "#8B5CF6",
				"d": "M3.4535 1.12549C2.7002 1.12549 2.08954 1.73615 2.08954 2.48945V13.5104C2.08954 14.2637 2.7002 14.8744 3.4535 14.8744H12.5465C13.2998 14.8744 13.9105 14.2637 13.9105 13.5104V5.0992L10.0091 1.12549H3.4535Z"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "#6D3FE8",
				"d": "M10.0075 1.12549L13.9104 5.09842H10.6742C10.306 5.09842 10.0075 4.79994 10.0075 4.43175V1.12549Z"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "white",
				"d": "M5 7.45H10.8V11.65H5V7.45ZM5.8 8.25V10.85H10V8.25H5.8Z",
				"fillRule": "evenodd",
				"clipRule": "evenodd"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "white",
				"d": "M5.8 6.25H7.25V7H5.8V6.25Z"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "white",
				"d": "M8.55 6.25H10V7H8.55V6.25Z"
			}
		}
	]
};
const BoardsMultiIcon = forwardRef(function BoardsMultiIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "boards-multi-icon",
		ref,
		icon: element
	}));
});
BoardsMultiIcon.displayName = "BoardsMultiIcon";
//#endregion
export { BoardsMultiIcon, BoardsMultiIcon as default };
