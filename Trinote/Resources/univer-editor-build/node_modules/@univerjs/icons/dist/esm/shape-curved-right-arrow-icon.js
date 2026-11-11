import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-curved-right-arrow-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 18 19",
		"width": "1em",
		"height": "1em"
	},
	"children": [{
		"tag": "path",
		"attrs": {
			"fill": "currentColor",
			"d": "M2.43056 10.33482C2.53291 12.45003 3.75147 13.5 5.83333 13.5L8.75 13.5L8.89908 13.5L8.97145 13.5L14.1532 13.5L14.1532 17.5L7.4882 17C4.37244 16.7997 1.94444 13.61919 1.94444 10.4082C1.94444 10.33925 2.42833 10.40326 2.43056 10.33482ZM0 10.4082C0 14.67534 3.22614 18.20746 7.36667 18.47363L15.5556 19L15.5556 12L5.83333 12C4.75945 12 3.88889 11.10457 3.88889 10C3.88889 8.8954 4.75945 7.5 5.83333 7.5L5.83333 6C4.27158 6 2.92577 6.9474 2.30713 8.3135C3.07699 6.1577 5.00062 4.2097 7.34388 4L12.5477 3.7135L12.6389 3.7031L14.1532 4.7246L12.5477 6L5.83333 6L5.83333 7.5L10.6944 7.5L10.6944 9.5L17.5 4.5928L10.6944 0L10.6944 2.043L7.17584 2.3584C3.11617 2.7215 0.00018 6.2168 0 10.4082Z"
		}
	}]
};
const ShapeCurvedRightArrowIcon = forwardRef(function ShapeCurvedRightArrowIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-curved-right-arrow-icon",
		ref,
		icon: element
	}));
});
ShapeCurvedRightArrowIcon.displayName = "ShapeCurvedRightArrowIcon";
//#endregion
export { ShapeCurvedRightArrowIcon, ShapeCurvedRightArrowIcon as default };
