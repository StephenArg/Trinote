import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/sequence-entity-lifeline-icon.tsx
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
				"d": "M18 8a6 6 0 0 1-2.608 4.95H18a.9.9 0 1 1 0 1.8h-5.2V16H11v-1.25H6a.9.9 0 0 1 0-1.8h2.608A6 6 0 1 1 18 8m-6 4.2a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4",
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
const SequenceEntityLifelineIcon = forwardRef(function SequenceEntityLifelineIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "sequence-entity-lifeline-icon",
		ref,
		icon: element
	}));
});
SequenceEntityLifelineIcon.displayName = "SequenceEntityLifelineIcon";
//#endregion
export { SequenceEntityLifelineIcon, SequenceEntityLifelineIcon as default };
