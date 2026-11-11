import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/sequence-alternative-fragment-icon.tsx
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
				"d": "M5.7 13h1.8v-1.8H5.7zM9.3 13h1.8v-1.8H9.3zM12.9 13h1.8v-1.8h-1.8zM16.5 13h1.8v-1.8h-1.8z",
				"transform": "scale(.83333)"
			}
		}, {
			"tag": "path",
			"attrs": {
				"d": "M22 5.882C22 4.842 21.186 4 20.182 4H3.818C2.814 4 2 4.843 2 5.882v12.236C2 19.158 2.814 20 3.818 20h16.364C21.186 20 22 19.157 22 18.118zm-1.818-.188H11.09v1.837c0 .15-.058.293-.16.4L9.432 9.48a.54.54 0 0 1-.385.166h-5.41V11.2H3.9V13h-.264v5.118c0 .104.082.188.182.188h16.364c.1 0 .182-.084.182-.188V13H20.1v-1.8h.264V5.882a.185.185 0 0 0-.182-.188m-16.364 0h5.637v1.369l-.86.89H3.636v-2.07c0-.105.082-.189.182-.189",
				"transform": "scale(.83333)",
				"fillRule": "evenodd",
				"clipRule": "evenodd"
			}
		}]
	}]
};
const SequenceAlternativeFragmentIcon = forwardRef(function SequenceAlternativeFragmentIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "sequence-alternative-fragment-icon",
		ref,
		icon: element
	}));
});
SequenceAlternativeFragmentIcon.displayName = "SequenceAlternativeFragmentIcon";
//#endregion
export { SequenceAlternativeFragmentIcon, SequenceAlternativeFragmentIcon as default };
