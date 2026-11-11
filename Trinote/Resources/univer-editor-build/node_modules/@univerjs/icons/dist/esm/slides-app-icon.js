import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/slides-app-icon.tsx
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
			"d": "M4.24365 4.2458H10.1562C11.0398 4.2458 11.7562 4.96215 11.7562 5.8458V11.7583H5.84365C4.96 11.7583 4.24365 11.042 4.24365 10.1583V4.2458ZM5.44365 5.4458V10.1583C5.44365 10.3792 5.62274 10.5583 5.84365 10.5583H10.5562V5.8458C10.5562 5.62489 10.3771 5.4458 10.1562 5.4458H5.44365ZM6.18 6.62H9.82V9.42H6.18V6.62Z",
			"fillRule": "evenodd",
			"clipRule": "evenodd"
		}
	}, {
		"tag": "path",
		"attrs": {
			"fill": "currentColor",
			"d": "M1.90107 0.578613C1.45925 0.578613 1.10107 0.936785 1.10107 1.37861V11.8216C1.10107 13.8098 2.71285 15.4216 4.70107 15.4216H14.0987C14.5406 15.4216 14.8987 15.0634 14.8987 14.6216V4.17861C14.8987 2.19039 13.287 0.578613 11.2987 0.578613H1.90107ZM2.30107 11.8216V1.77861H11.2987C12.6242 1.77861 13.6987 2.85313 13.6987 4.17861V14.2216H4.70107C3.37559 14.2216 2.30107 13.1471 2.30107 11.8216Z",
			"fillRule": "evenodd",
			"clipRule": "evenodd"
		}
	}]
};
const SlidesAppIcon = forwardRef(function SlidesAppIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "slides-app-icon",
		ref,
		icon: element
	}));
});
SlidesAppIcon.displayName = "SlidesAppIcon";
//#endregion
export { SlidesAppIcon, SlidesAppIcon as default };
