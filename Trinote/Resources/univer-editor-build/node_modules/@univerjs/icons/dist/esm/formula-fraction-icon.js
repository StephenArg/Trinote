import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/formula-fraction-icon.tsx
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
				"d": "M315 298H312L300 349C286 403 267 447 243 475H228L89 459V429C89 429 104 432 120 432C186 433 203 406 230 322L258 231L186 126C147 70 129 69 125 69C108 69 84 82 62 82C38 82 23 60 23 40C23 15 38 -9 81 -9C141 -9 174 38 206 90L270 194H274L299 93C313 28 335 -10 381 -10C449 -10 491 58 520 102L499 118C472 82 453 62 427 62C396 62 376 99 348 191L327 259L388 356C405 384 419 398 442 398C455 398 478 388 494 388C521 388 540 411 540 435C540 463 528 479 490 479C431 479 391 430 364 382Z",
				"transform": "matrix(.9 0 0 1.04 .8 -.32) matrix(.0112 0 0 -.0112 4.9 5.9)"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M3.3 7.125H12.7",
				"transform": "matrix(.9 0 0 1.04 .8 -.32)",
				"strokeWidth": .75
			}
		},
		{
			"tag": "path",
			"attrs": {
				"d": "M251 325C239 405 232 437 210 475H195L53 464V435C53 435 74 437 88 437C149 437 154 388 161 343L220 -9C192 -52 112 -165 93 -165C71 -165 60 -112 22 -112C-1 -112 -17 -125 -17 -155C-17 -192 18 -220 60 -220C136 -220 197 -112 289 15C341 87 398 173 452 268C484 322 496 367 496 406C496 449 470 482 433 482C404 482 389 464 389 443C389 405 438 377 438 351C438 327 429 303 405 264L290 79H284L275 179Z",
				"transform": "matrix(.9 0 0 1.04 .8 -.32) matrix(.0104 0 0 -.0104 5.15 13.25)"
			}
		}
	]
};
const FormulaFractionIcon = forwardRef(function FormulaFractionIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "formula-fraction-icon",
		ref,
		icon: element
	}));
});
FormulaFractionIcon.displayName = "FormulaFractionIcon";
//#endregion
export { FormulaFractionIcon, FormulaFractionIcon as default };
