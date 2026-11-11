import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/link-icon.tsx
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
			"stroke": "currentColor",
			"d": "M7.30999 8.71386C6.39955 7.80343 6.37922 6.34731 7.26629 5.45772L10.313 2.41112C11.2111 1.51303 12.6799 1.51258 13.5691 2.45476C14.4811 3.36679 14.4798 4.84384 13.6128 5.71094L10.9677 8.35604",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.22
		}
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M5.0456 7.66774L2.4005 10.3128C1.50242 11.2109 1.50197 12.6798 2.44413 13.5691C3.35615 14.4811 4.8332 14.4798 5.70033 13.6127L8.747 10.566C9.65743 9.65558 9.67776 8.19945 8.7905 7.30999",
			"strokeLinecap": "round",
			"strokeLinejoin": "round",
			"strokeWidth": 1.22
		}
	}]
};
const LinkIcon = forwardRef(function LinkIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "link-icon",
		ref,
		icon: element
	}));
});
LinkIcon.displayName = "LinkIcon";
//#endregion
export { LinkIcon, LinkIcon as default };
