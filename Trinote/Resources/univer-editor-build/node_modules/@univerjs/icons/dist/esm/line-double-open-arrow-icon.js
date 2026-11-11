import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/line-double-open-arrow-icon.tsx
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
			"d": "M15.833 4.25C16.248 4.25 16.583 4.586 16.583 5V10C16.583 10.414 16.248 10.75 15.833 10.75C15.419 10.75 15.083 10.414 15.083 10V6.811L5.53 16.363C5.237 16.656 4.762 16.656 4.469 16.363C4.176 16.07 4.176 15.596 4.469 15.303L14.023 5.75H10.833C10.419 5.75 10.083 5.414 10.083 5C10.083 4.586 10.419 4.25 10.833 4.25H15.833Z"
		}
	}, {
		"tag": "path",
		"attrs": {
			"fill": "currentColor",
			"d": "M5.75 10.833C5.75 10.419 5.414 10.083 5 10.083C4.586 10.083 4.25 10.419 4.25 10.833V15.833C4.25 16.248 4.586 16.583 5 16.583H10C10.414 16.583 10.75 16.248 10.75 15.833C10.75 15.419 10.414 15.083 10 15.083H5.75V10.833Z"
		}
	}]
};
const LineDoubleOpenArrowIcon = forwardRef(function LineDoubleOpenArrowIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "line-double-open-arrow-icon",
		ref,
		icon: element
	}));
});
LineDoubleOpenArrowIcon.displayName = "LineDoubleOpenArrowIcon";
//#endregion
export { LineDoubleOpenArrowIcon, LineDoubleOpenArrowIcon as default };
