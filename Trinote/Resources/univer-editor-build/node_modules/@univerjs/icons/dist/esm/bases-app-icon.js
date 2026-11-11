import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/bases-app-icon.tsx
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
			"d": "M8 4.2458C6.0794 4.2458 4.52365 4.90195 4.52365 5.71124V10.2929C4.52365 11.1022 6.0794 11.7583 8 11.7583C9.92061 11.7583 11.4764 11.1022 11.4764 10.2929V5.71124C11.4764 4.90195 9.92061 4.2458 8 4.2458ZM5.72365 7.11384V8.07361C6.28591 8.34369 7.10175 8.51603 8 8.51603C8.89825 8.51603 9.7141 8.34369 10.2764 8.07361V7.11384C9.6268 7.3462 8.80685 7.47669 8 7.47669C7.19316 7.47669 6.3732 7.3462 5.72365 7.11384ZM10.2764 9.33647C9.6268 9.56883 8.80685 9.69932 8 9.69932C7.19316 9.69932 6.3732 9.56883 5.72365 9.33647V10.1612C5.88069 10.2929 6.66899 10.5583 8 10.5583C9.33101 10.5583 10.1193 10.2929 10.2764 10.1612V9.33647ZM8 5.4458C6.66899 5.4458 5.88069 5.71123 5.72365 5.84289C5.88069 5.97456 6.66899 6.23998 8 6.23998C9.33101 6.23998 10.1193 5.97456 10.2764 5.84289C10.1193 5.71123 9.33101 5.4458 8 5.4458Z",
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
const BasesAppIcon = forwardRef(function BasesAppIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "bases-app-icon",
		ref,
		icon: element
	}));
});
BasesAppIcon.displayName = "BasesAppIcon";
//#endregion
export { BasesAppIcon, BasesAppIcon as default };
