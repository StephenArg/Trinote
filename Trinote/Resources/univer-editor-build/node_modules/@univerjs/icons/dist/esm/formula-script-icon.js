import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/formula-script-icon.tsx
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
			"d": "M357 122C317 72 262 57 216 57C149 57 112 88 112 189V202C228 211 404 262 404 390C404 467 339 479 296 479C139 479 28 319 28 164C28 84 58 -12 177 -12C243 -12 315 17 375 107ZM114 231C133 330 202 448 276 448C306 448 318 428 318 393C318 298 227 238 114 231Z",
			"transform": "matrix(.0255 0 0 -.024 .2 15)"
		}
	}, {
		"tag": "path",
		"attrs": {
			"d": "M315 298H312L300 349C286 403 267 447 243 475H228L89 459V429C89 429 104 432 120 432C186 433 203 406 230 322L258 231L186 126C147 70 129 69 125 69C108 69 84 82 62 82C38 82 23 60 23 40C23 15 38 -9 81 -9C141 -9 174 38 206 90L270 194H274L299 93C313 28 335 -10 381 -10C449 -10 491 58 520 102L499 118C472 82 453 62 427 62C396 62 376 99 348 191L327 259L388 356C405 384 419 398 442 398C455 398 478 388 494 388C521 388 540 411 540 435C540 463 528 479 490 479C431 479 391 430 364 382Z",
			"transform": "matrix(.0085 0 0 -.0105 11 5.2)"
		}
	}]
};
const FormulaScriptIcon = forwardRef(function FormulaScriptIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "formula-script-icon",
		ref,
		icon: element
	}));
});
FormulaScriptIcon.displayName = "FormulaScriptIcon";
//#endregion
export { FormulaScriptIcon, FormulaScriptIcon as default };
