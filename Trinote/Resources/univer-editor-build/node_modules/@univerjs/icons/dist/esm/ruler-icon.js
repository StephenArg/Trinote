import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/ruler-icon.tsx
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
				"d": "M1.9169 10.8901L10.8899 1.9172C11.2171 1.5899 11.7476 1.5899 12.0749 1.9172L14.0829 3.9252C14.4102 4.2525 14.4102 4.783 14.0829 5.1103L5.11 14.0832C4.7828 14.4104 4.2522 14.4104 3.9249 14.0832L1.9169 12.0752C1.5897 11.7479 1.5897 11.2173 1.9169 10.8901Z",
				"strokeLinejoin": "round",
				"strokeWidth": 1.2
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M8.2805 4.9296L9.3553 6.0044",
				"strokeLinecap": "round",
				"strokeWidth": 1.1
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M6.6682 6.5419L7.743 7.6167",
				"strokeLinecap": "round",
				"strokeWidth": 1.1
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M5.0559 8.1545L6.1307 9.2293",
				"strokeLinecap": "round",
				"strokeWidth": 1.1
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M9.8929 3.3173L11.505 4.9295",
				"strokeLinecap": "round",
				"strokeWidth": 1.1
			}
		}
	]
};
const RulerIcon = forwardRef(function RulerIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "ruler-icon",
		ref,
		icon: element
	}));
});
RulerIcon.displayName = "RulerIcon";
//#endregion
export { RulerIcon, RulerIcon as default };
