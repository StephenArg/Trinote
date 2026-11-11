import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-diag-stripe-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 20 20",
		"width": "1em",
		"height": "1em"
	},
	"children": [{
		"tag": "path",
		"attrs": {
			"fill": "currentColor",
			"d": "M1 19L1 8L8 1L19 1ZM2.6 8.6624L2.6 15.1376L15.1376 2.6L8.6634 2.6Z",
			"fillRule": "evenodd"
		}
	}]
};
const ShapeDiagStripeIcon = forwardRef(function ShapeDiagStripeIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-diag-stripe-icon",
		ref,
		icon: element
	}));
});
ShapeDiagStripeIcon.displayName = "ShapeDiagStripeIcon";
//#endregion
export { ShapeDiagStripeIcon, ShapeDiagStripeIcon as default };
