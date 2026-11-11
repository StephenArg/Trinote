import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/sequence-fragment-icon.tsx
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
			"d": "M20.182 4C21.186 4 22 4.843 22 5.882v12.236c0 1.04-.814 1.882-1.818 1.882H3.818C2.814 20 2 19.157 2 18.118V5.882C2 4.842 2.814 4 3.818 4zM11.09 5.694h9.09c.101 0 .183.084.183.188v12.236a.185.185 0 0 1-.182.188H3.818a.185.185 0 0 1-.182-.188v-8.47h5.41c.145 0 .284-.06.386-.166l1.5-1.552a.57.57 0 0 0 .159-.4zm-1.636 0H3.818c-.1 0-.182.084-.182.188v2.07h4.959l.86-.889z",
			"transform": "scale(.83333)",
			"fillRule": "evenodd",
			"clipRule": "evenodd"
		}
	}]
};
const SequenceFragmentIcon = forwardRef(function SequenceFragmentIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "sequence-fragment-icon",
		ref,
		icon: element
	}));
});
SequenceFragmentIcon.displayName = "SequenceFragmentIcon";
//#endregion
export { SequenceFragmentIcon, SequenceFragmentIcon as default };
