import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/quote-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 16 16",
		"width": "1em",
		"height": "1em"
	},
	"children": [{
		"tag": "path",
		"attrs": {
			"fill": "currentColor",
			"d": "M4.2 4.2H6.7C7.2 4.2 7.6 4.6 7.6 5.1V7.3C7.6 9.5 6.4 11.2 4.4 12.2C4.1 12.4 3.7 12.2 3.6 11.9C3.4 11.6 3.5 11.2 3.8 11C5.1 10.2 5.8 9.3 5.9 8.2H4.2C3.7 8.2 3.3 7.8 3.3 7.3V5.1C3.3 4.6 3.7 4.2 4.2 4.2Z"
		}
	}, {
		"tag": "path",
		"attrs": {
			"fill": "currentColor",
			"d": "M10.1 4.2H12.6C13.1 4.2 13.5 4.6 13.5 5.1V7.3C13.5 9.5 12.3 11.2 10.3 12.2C10 12.4 9.6 12.2 9.5 11.9C9.3 11.6 9.4 11.2 9.7 11C11 10.2 11.7 9.3 11.8 8.2H10.1C9.6 8.2 9.2 7.8 9.2 7.3V5.1C9.2 4.6 9.6 4.2 10.1 4.2Z"
		}
	}]
};
const QuoteIcon = forwardRef(function QuoteIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "quote-icon",
		ref,
		icon: element
	}));
});
QuoteIcon.displayName = "QuoteIcon";
//#endregion
export { QuoteIcon, QuoteIcon as default };
