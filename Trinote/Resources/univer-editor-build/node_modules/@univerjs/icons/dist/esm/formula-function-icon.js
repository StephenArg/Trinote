import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/formula-function-icon.tsx
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
				"d": "M39 164 42 -8H63L84 15H86C112 4 142 -11 200 -11C290 -11 368 25 368 119C368 193 319 230 228 278C144 321 111 346 111 385C111 430 146 451 192 451C253 451 290 422 312 327H339L336 480H316L299 459H298C273 471 243 485 193 485C107 485 40 441 40 359C40 285 81 250 172 204C265 158 284 139 284 92C284 45 248 26 198 26C124 26 86 61 65 164Z",
				"transform": "matrix(1.04 0 0 1 -.32 0) matrix(.0091 0 0 -.0105 .25 11.2)"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"d": "M257 28C190 28 185 43 185 101V482H159L33 454V425C33 425 44 427 58 427C87 427 102 423 102 380V101C102 44 99 28 32 28V0H257ZM145 673C110 673 88 647 88 617C88 586 111 560 145 560C180 560 202 586 202 617C202 647 180 673 145 673Z",
				"transform": "matrix(1.04 0 0 1 -.32 0) matrix(.0091 0 0 -.0105 3.84 11.2)"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"d": "M481 307C481 422 438 485 347 485C284 485 240 449 186 401H182L183 482H160L33 453V424C33 424 43 426 60 426C87 426 102 418 102 382V101C102 45 99 28 32 28V0H261V28C189 28 185 45 185 101V358C215 385 252 421 306 421C351 421 398 402 398 282V101C398 45 395 28 324 28V0H555V28C488 28 481 45 481 101Z",
				"transform": "matrix(1.04 0 0 1 -.32 0) matrix(.0091 0 0 -.0105 6.44 11.2)"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"d": "M497 474C497 619 453 717 358 717C195 717 55 482 55 208C55 53 121 -14 210 -14C366 -14 497 170 497 474ZM230 73C177 73 109 109 109 250C109 276 111 313 114 338H439C412 149 326 73 230 73ZM338 630C416 630 448 544 448 450C448 432 447 410 446 391H124C159 541 253 630 338 630Z",
				"transform": "matrix(1.04 0 0 1 -.32 0) matrix(.0085 0 0 -.0088 11.2 11.25)"
			}
		}
	]
};
const FormulaFunctionIcon = forwardRef(function FormulaFunctionIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "formula-function-icon",
		ref,
		icon: element
	}));
});
FormulaFunctionIcon.displayName = "FormulaFunctionIcon";
//#endregion
export { FormulaFunctionIcon, FormulaFunctionIcon as default };
