import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/formula-matrix-icon.tsx
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
				"fill": "none",
				"stroke": "currentColor",
				"d": "M2.2 .5H.6V15.5H2.2M13.8 .5H15.4V15.5H13.8",
				"transform": "matrix(1.03 0 0 1.02 -.24 -.16)",
				"strokeWidth": .75
			}
		},
		{
			"tag": "path",
			"attrs": {
				"d": "M426 0V28C334 28 297 46 297 95V639H268L74 584V551C105 561 156 567 176 567C201 567 209 553 209 518V95C209 45 174 28 80 28V0Z",
				"transform": "matrix(1.03 0 0 1.02 -.24 -.16) matrix(.0078 0 0 -.0078 3.32 7.2)"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"d": "M468 317C468 523 378 642 249 642C104 642 27 510 27 320C27 143 86 -11 247 -11C404 -11 468 146 468 317ZM371 311C371 119 326 25 247 25C167 25 123 121 123 315C123 513 167 608 246 608C328 608 371 514 371 311Z",
				"transform": "matrix(1.03 0 0 1.02 -.24 -.16) matrix(.0078 0 0 -.0078 8.82 7.2)"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"d": "M468 317C468 523 378 642 249 642C104 642 27 510 27 320C27 143 86 -11 247 -11C404 -11 468 146 468 317ZM371 311C371 119 326 25 247 25C167 25 123 121 123 315C123 513 167 608 246 608C328 608 371 514 371 311Z",
				"transform": "matrix(1.03 0 0 1.02 -.24 -.16) matrix(.0078 0 0 -.0078 3.32 14.3)"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"d": "M426 0V28C334 28 297 46 297 95V639H268L74 584V551C105 561 156 567 176 567C201 567 209 553 209 518V95C209 45 174 28 80 28V0Z",
				"transform": "matrix(1.03 0 0 1.02 -.24 -.16) matrix(.0078 0 0 -.0078 8.82 14.3)"
			}
		}
	]
};
const FormulaMatrixIcon = forwardRef(function FormulaMatrixIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "formula-matrix-icon",
		ref,
		icon: element
	}));
});
FormulaMatrixIcon.displayName = "FormulaMatrixIcon";
//#endregion
export { FormulaMatrixIcon, FormulaMatrixIcon as default };
