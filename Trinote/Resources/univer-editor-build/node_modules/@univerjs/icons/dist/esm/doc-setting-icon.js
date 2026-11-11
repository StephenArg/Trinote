import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/doc-setting-icon.tsx
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
				"d": "M6.18958 14.085H4.0929C2.98833 14.085 2.0929 13.1895 2.0929 12.085V3.5918C2.0929 2.48723 2.98833 1.5918 4.0929 1.5918H10.5031C11.6077 1.5918 12.5031 2.48723 12.5031 3.5918V6.41602",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.33
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M4.73547 4.57324H9.96594M4.73547 7.08105H7.91614",
				"strokeLinecap": "round",
				"strokeWidth": 1.33
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M10.0255 9.17969H11.9572L13.7687 11.7939L11.9572 14.4082H10.0255L8.21399 11.7939L10.0255 9.17969Z",
				"strokeLinejoin": "round",
				"strokeWidth": 1.33
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M10.9913 11.7939H10.9914",
				"strokeLinecap": "round",
				"strokeWidth": 1.83
			}
		}
	]
};
const DocSettingIcon = forwardRef(function DocSettingIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "doc-setting-icon",
		ref,
		icon: element
	}));
});
DocSettingIcon.displayName = "DocSettingIcon";
//#endregion
export { DocSettingIcon, DocSettingIcon as default };
