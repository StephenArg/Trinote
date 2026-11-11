import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/formula-bracket-icon.tsx
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
				"d": "M25 245C72 240 115 233 115 173C115 126 96 8 96 -52C96 -167 184 -197 282 -197V-165C225 -165 170 -150 170 -64C170 -13 185 68 185 129C185 212 144 247 93 267V273C144 293 185 328 185 411C185 472 170 552 170 603C170 689 225 704 282 704V736C184 736 96 706 96 591C96 531 115 414 115 367C115 307 72 300 25 295Z",
				"transform": "matrix(1.04 0 0 1 -.32 0) matrix(.0116 0 0 -.0097 .1 10.62)"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"d": "M45 270C45 47 150 -112 311 -196L327 -170C181 -71 127 66 127 270C127 474 181 611 327 710L311 736C150 652 45 493 45 270Z",
				"transform": "matrix(1.04 0 0 1 -.32 0) matrix(.0116 0 0 -.0097 3.9 10.62)"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"d": "M312 270C312 493 207 652 46 736L30 710C176 611 230 474 230 270C230 66 176 -71 30 -170L46 -196C207 -112 312 47 312 270Z",
				"transform": "matrix(1.04 0 0 1 -.32 0) matrix(.0116 0 0 -.0097 8.03 10.62)"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"d": "M302 295C255 300 212 307 212 367C212 414 231 531 231 591C231 706 143 736 45 736V704C102 704 157 689 157 603C157 552 142 472 142 411C142 328 183 293 234 273V267C183 247 142 212 142 129C142 68 157 -13 157 -64C157 -150 102 -165 45 -165V-197C143 -197 231 -167 231 -52C231 8 212 126 212 173C212 233 255 240 302 245Z",
				"transform": "matrix(1.04 0 0 1 -.32 0) matrix(.0116 0 0 -.0097 12.18 10.62)"
			}
		}
	]
};
const FormulaBracketIcon = forwardRef(function FormulaBracketIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "formula-bracket-icon",
		ref,
		icon: element
	}));
});
FormulaBracketIcon.displayName = "FormulaBracketIcon";
//#endregion
export { FormulaBracketIcon, FormulaBracketIcon as default };
