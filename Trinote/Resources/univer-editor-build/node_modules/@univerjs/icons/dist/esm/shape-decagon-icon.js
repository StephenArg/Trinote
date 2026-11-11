import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-decagon-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 20 20",
		"width": "1em",
		"height": "1em"
	},
	"children": [
		{
			"tag": "clipPath",
			"attrs": { "id": "shape-decagon-icon-frame-clip" },
			"children": [{
				"tag": "path",
				"attrs": { "d": "M6.2721 1L13.7279 1L19 6.2721L19 13.7279L13.7279 19L6.2721 19L1 13.7279L1 6.2721Z" }
			}]
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M6.2721 1L13.7279 1L19 6.2721L19 13.7279L13.7279 19L6.2721 19L1 13.7279L1 6.2721Z",
				"strokeWidth": 3.2,
				"clipPath": "url(#shape-decagon-icon-frame-clip)"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M11.7902 5.992C12.7142 5.992 13.4292 6.377 13.9352 7.158C14.3972 7.884 14.6282 8.852 14.6282 10.073C14.6282 11.283 14.3972 12.262 13.9352 12.988C13.4292 13.758 12.7142 14.154 11.7902 14.154C10.8662 14.154 10.1512 13.758 9.64524 12.988C9.18324 12.262 8.95224 11.294 8.95224 10.073C8.95224 8.841 9.18324 7.873 9.64524 7.158C10.1512 6.377 10.8662 5.992 11.7902 5.992ZM11.7902 7.004C11.1412 7.004 10.6902 7.356 10.4262 8.071C10.2282 8.555 10.1402 9.226 10.1402 10.073C10.1402 10.909 10.2282 11.58 10.4262 12.075C10.6902 12.779 11.1412 13.142 11.7902 13.142C12.4282 13.142 12.8902 12.779 13.1542 12.075C13.3412 11.58 13.4402 10.909 13.4402 10.073C13.4402 9.226 13.3412 8.555 13.1542 8.071C12.8902 7.356 12.4282 7.004 11.7902 7.004Z"
			}
		},
		{
			"tag": "path",
			"attrs": {
				"fill": "currentColor",
				"d": "M6.90365 6.33995C7.03232 6.22121 7.19758 6.146 7.37267 6.146C7.71913 6.146 8 6.42686 8 6.77333V13.4005C8 13.7316 7.73159 14 7.4005 14C7.06941 14 6.801 13.7316 6.801 13.4005V7.587C6.48979 7.88374 6.12143 8.12809 5.69906 8.32007C5.35797 8.4751 4.997 8.20342 4.997 7.82875C4.997 7.5703 5.17444 7.34822 5.41575 7.2557C5.63756 7.17064 5.86665 7.06108 6.108 6.927C6.41215 6.74113 6.67737 6.54877 6.90365 6.33995Z"
			}
		}
	]
};
const ShapeDecagonIcon = forwardRef(function ShapeDecagonIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-decagon-icon",
		ref,
		icon: element
	}));
});
ShapeDecagonIcon.displayName = "ShapeDecagonIcon";
//#endregion
export { ShapeDecagonIcon, ShapeDecagonIcon as default };
