import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/fountain-pen-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 16 16",
		"width": "1em",
		"height": "1em"
	},
	"children": [
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M9 3.5L4.00389 5.99805C4.00141 5.99929 3.99956 6.00151 3.99877 6.00418L1.50517 14.4824C1.50294 14.49 1.51 14.4971 1.51759 14.4948L9.99582 12.0012C9.99849 12.0004 10.0007 11.9986 10.0019 11.9961L12.5 7",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M1.5 14.5L4.5 11.5M1.5 14.5H14.5",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "circle",
			"attrs": {
				"cx": 6.5,
				"cy": 9.5,
				"r": .5,
				"stroke": "currentColor",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M8.35355 2.85355C8.15829 2.65829 8.15829 2.34171 8.35355 2.14645L9.14645 1.35355C9.34171 1.15829 9.65829 1.15829 9.85355 1.35355L14.6464 6.14645C14.8417 6.34171 14.8417 6.65829 14.6464 6.85355L13.8536 7.64645C13.6583 7.84171 13.3417 7.84171 13.1464 7.64645L8.35355 2.85355Z",
				"strokeLinejoin": "round",
				"strokeWidth": 1.2
			}
		}
	]
};
const FountainPenIcon = forwardRef(function FountainPenIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "fountain-pen-icon",
		ref,
		icon: element
	}));
});
FountainPenIcon.displayName = "FountainPenIcon";
//#endregion
export { FountainPenIcon, FountainPenIcon as default };
