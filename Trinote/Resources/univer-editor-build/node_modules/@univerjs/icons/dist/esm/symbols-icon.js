import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/symbols-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 24 24",
		"width": "1em",
		"height": "1em"
	},
	"children": [{
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M3 20H7.5A.5.5 0 0 0 8 19.5V19.218A.52.52 0 0 0 7.753 18.781A8 8 0 1 1 16.247 18.78A.52.52 0 0 0 16 19.218V19.5A.5.5 0 0 0 16.5 20H21",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 2
		}
	}]
};
const SymbolsIcon = forwardRef(function SymbolsIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "symbols-icon",
		ref,
		icon: element
	}));
});
SymbolsIcon.displayName = "SymbolsIcon";
//#endregion
export { SymbolsIcon, SymbolsIcon as default };
