import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/formula-radical-icon.tsx
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
				"d": "M521 112C506 93 481 60 447 60C433 60 428 68 428 79C428 91 430 103 430 103L487 334C490 348 496 382 496 408C496 444 481 479 430 479C312 479 227 334 185 259H177L227 476H205L66 465V438C66 438 86 440 99 440C122 440 131 430 131 413C131 398 128 380 128 380L47 0H129L165 158C197 227 307 407 380 407C403 407 410 390 410 367C410 347 403 319 403 319L344 88C343 83 339 65 339 49C339 19 354 -10 404 -10C476 -10 516 60 542 97Z",
				"transform": "matrix(.0072 0 0 -.0072 1.1 5.5)"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "none",
				"stroke": "currentColor",
				"d": "M3.1 7.6L4.1 6.9L6.1 12.4L8.2 2.5",
				"strokeLinecap": "square",
				"strokeWidth": 1.05
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M7.9 2.5H15.6",
				"strokeWidth": .72
			}
		},
		{
			"tag": "path",
			"attrs": {
				"d": "M315 298H312L300 349C286 403 267 447 243 475H228L89 459V429C89 429 104 432 120 432C186 433 203 406 230 322L258 231L186 126C147 70 129 69 125 69C108 69 84 82 62 82C38 82 23 60 23 40C23 15 38 -9 81 -9C141 -9 174 38 206 90L270 194H274L299 93C313 28 335 -10 381 -10C449 -10 491 58 520 102L499 118C472 82 453 62 427 62C396 62 376 99 348 191L327 259L388 356C405 384 419 398 442 398C455 398 478 388 494 388C521 388 540 411 540 435C540 463 528 479 490 479C431 479 391 430 364 382Z",
				"transform": "matrix(.0135 0 0 -.017 8.5 12.8)"
			}
		}
	]
};
const FormulaRadicalIcon = forwardRef(function FormulaRadicalIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "formula-radical-icon",
		ref,
		icon: element
	}));
});
FormulaRadicalIcon.displayName = "FormulaRadicalIcon";
//#endregion
export { FormulaRadicalIcon, FormulaRadicalIcon as default };
