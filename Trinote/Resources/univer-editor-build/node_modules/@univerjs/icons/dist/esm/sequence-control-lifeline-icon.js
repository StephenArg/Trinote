import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/sequence-control-lifeline-icon.tsx
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
		"tag": "g",
		"attrs": { "fill": "currentColor" },
		"children": [{
			"tag": "path",
			"attrs": {
				"d": "M18 8.577c0-2.62-1.68-4.85-4.022-5.667l.85-.85A.9.9 0 1 0 13.557.786L11.76 2.582a6 6 0 0 0-.725 11.918H11V16h1.8v-1.476A6 6 0 0 0 18 8.577m-1.8 0a4.2 4.2 0 1 1-4.877-4.146l.92 2.757a.9.9 0 1 0 1.707-.569l-.683-2.047A4.2 4.2 0 0 1 16.2 8.577",
				"transform": "scale(.83333)",
				"fillRule": "evenodd",
				"clipRule": "evenodd"
			}
		}, {
			"tag": "path",
			"attrs": {
				"d": "M11 17.5V19h1.8v-1.5zM11 20.5V22a.9.9 0 1 0 1.8 0v-1.5z",
				"transform": "scale(.83333)"
			}
		}]
	}]
};
const SequenceControlLifelineIcon = forwardRef(function SequenceControlLifelineIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "sequence-control-lifeline-icon",
		ref,
		icon: element
	}));
});
SequenceControlLifelineIcon.displayName = "SequenceControlLifelineIcon";
//#endregion
export { SequenceControlLifelineIcon, SequenceControlLifelineIcon as default };
