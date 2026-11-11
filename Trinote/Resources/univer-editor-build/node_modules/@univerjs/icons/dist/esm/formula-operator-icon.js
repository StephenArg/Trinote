import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/formula-operator-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "currentColor",
		"viewBox": "0 0 16 16",
		"width": "1em",
		"height": "1em"
	},
	"children": [{
		"tag": "path",
		"attrs": {
			"d": "M1136 -130 587 830 36 -130ZM1019 -63H152L587 694Z",
			"transform": "matrix(1 0 0 1.1 0 -.8) matrix(.0094 0 0 -.0094 2.8 8.7)"
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M.3 12H15.7M.3 13.55H15.7",
			"transform": "matrix(1 0 0 1.1 0 -.8)",
			"strokeWidth": .75
		}
	}]
};
const FormulaOperatorIcon = forwardRef(function FormulaOperatorIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "formula-operator-icon",
		ref,
		icon: element
	}));
});
FormulaOperatorIcon.displayName = "FormulaOperatorIcon";
//#endregion
export { FormulaOperatorIcon, FormulaOperatorIcon as default };
