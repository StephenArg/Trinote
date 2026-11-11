import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/formula-integral-icon.tsx
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
				"d": "M578 671C558 653 548 634 548 610C548 581 563 566 587 566C617 566 654 591 654 642C654 699 611 727 562 727C383 727 322 461 282 246C241 29 217 -187 128 -187C111 -187 104 -181 104 -181V-174C117 -155 127 -139 127 -111C127 -86 114 -69 88 -69C57 -69 30 -95 30 -141C30 -182 58 -226 129 -226C264 -226 342 -2 395 292C426 465 452 683 544 683C569 683 578 677 578 677Z",
				"transform": "matrix(.015 0 0 -.0162 .45 12.25)"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"d": "M315 298H312L300 349C286 403 267 447 243 475H228L89 459V429C89 429 104 432 120 432C186 433 203 406 230 322L258 231L186 126C147 70 129 69 125 69C108 69 84 82 62 82C38 82 23 60 23 40C23 15 38 -9 81 -9C141 -9 174 38 206 90L270 194H274L299 93C313 28 335 -10 381 -10C449 -10 491 58 520 102L499 118C472 82 453 62 427 62C396 62 376 99 348 191L327 259L388 356C405 384 419 398 442 398C455 398 478 388 494 388C521 388 540 411 540 435C540 463 528 479 490 479C431 479 391 430 364 382Z",
				"transform": "matrix(.0082 0 0 -.0082 10.2 5.15)"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"d": "M658 225V293H62V225Z",
				"transform": "matrix(.0041 0 0 -.0052 8.25 15.2)"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"d": "M315 298H312L300 349C286 403 267 447 243 475H228L89 459V429C89 429 104 432 120 432C186 433 203 406 230 322L258 231L186 126C147 70 129 69 125 69C108 69 84 82 62 82C38 82 23 60 23 40C23 15 38 -9 81 -9C141 -9 174 38 206 90L270 194H274L299 93C313 28 335 -10 381 -10C449 -10 491 58 520 102L499 118C472 82 453 62 427 62C396 62 376 99 348 191L327 259L388 356C405 384 419 398 442 398C455 398 478 388 494 388C521 388 540 411 540 435C540 463 528 479 490 479C431 479 391 430 364 382Z",
				"transform": "matrix(.0082 0 0 -.0082 10.8 15.3)"
			}
		}
	]
};
const FormulaIntegralIcon = forwardRef(function FormulaIntegralIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "formula-integral-icon",
		ref,
		icon: element
	}));
});
FormulaIntegralIcon.displayName = "FormulaIntegralIcon";
//#endregion
export { FormulaIntegralIcon, FormulaIntegralIcon as default };
