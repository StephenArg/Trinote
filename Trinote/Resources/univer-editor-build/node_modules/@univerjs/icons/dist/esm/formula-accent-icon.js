import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/formula-accent-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "currentColor",
		"viewBox": "0 0 16 16",
		"width": "1em",
		"height": "1em"
	},
	"children": [
		{
			"tag": "path",
			"attrs": {
				"d": "M502 472H449L413 426H409C388 456 358 479 305 479C174 479 49 341 49 159C49 43 100 -12 172 -12C229 -12 288 22 339 85H346C343 67 339 53 339 38C339 5 359 -10 395 -10C455 -10 497 33 539 97L519 112C506 95 477 60 445 60C429 60 425 68 425 81C425 96 430 118 430 118ZM389 344C389 313 378 240 358 181C329 96 285 54 218 54C168 54 138 77 138 169C138 303 202 441 302 441C358 441 389 397 389 344Z",
				"transform": "matrix(.025 0 0 -.024 1.3 15)"
			}
		},
		{
			"tag": "circle",
			"attrs": {
				"cx": 5.9,
				"cy": 1,
				"r": 1
			}
		},
		{
			"tag": "circle",
			"attrs": {
				"cx": 10.1,
				"cy": 1,
				"r": 1
			}
		}
	]
};
const FormulaAccentIcon = forwardRef(function FormulaAccentIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "formula-accent-icon",
		ref,
		icon: element
	}));
});
FormulaAccentIcon.displayName = "FormulaAccentIcon";
//#endregion
export { FormulaAccentIcon, FormulaAccentIcon as default };
