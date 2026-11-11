import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-cloud-icon.tsx
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
		"tag": "clipPath",
		"attrs": { "id": "shape-cloud-icon-clip" },
		"children": [{
			"tag": "path",
			"attrs": { "d": "M8 2C9.2853 2 10.457 2.42475 11.3428 3.12207C11.8615 2.96265 12.419 2.875 13 2.875C15.7614 2.875 18 4.83375 18 7.25C18 7.97779 17.7949 8.66285 17.4355 9.2666C18.9353 9.84364 20 11.297 20 13C20 15.2091 18.2091 17 16 17C15.5108 17 15.0426 16.9107 14.6094 16.75C13.8013 17.5234 12.7069 18 11.5 18C10.4258 18 9.43972 17.6232 8.66602 16.9951C7.77055 17.627 6.67928 18 5.5 18C2.46243 18 0 15.5376 0 12.5C0 10.2946 1.29808 8.39235 3.17188 7.51562C3.05993 7.15196 3 6.76961 3 6.375C3 3.95875 5.23858 2 8 2Z" }
		}]
	}, {
		"tag": "path",
		"attrs": {
			"stroke": "currentColor",
			"d": "M8 2C9.2853 2 10.457 2.42475 11.3428 3.12207C11.8615 2.96265 12.419 2.875 13 2.875C15.7614 2.875 18 4.83375 18 7.25C18 7.97779 17.7949 8.66285 17.4355 9.2666C18.9353 9.84364 20 11.297 20 13C20 15.2091 18.2091 17 16 17C15.5108 17 15.0426 16.9107 14.6094 16.75C13.8013 17.5234 12.7069 18 11.5 18C10.4258 18 9.43972 17.6232 8.66602 16.9951C7.77055 17.627 6.67928 18 5.5 18C2.46243 18 0 15.5376 0 12.5C0 10.2946 1.29808 8.39235 3.17188 7.51562C3.05993 7.15196 3 6.76961 3 6.375C3 3.95875 5.23858 2 8 2Z",
			"strokeWidth": 3.2,
			"clipPath": "url(#shape-cloud-icon-clip)"
		}
	}]
};
const ShapeCloudIcon = forwardRef(function ShapeCloudIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-cloud-icon",
		ref,
		icon: element
	}));
});
ShapeCloudIcon.displayName = "ShapeCloudIcon";
//#endregion
export { ShapeCloudIcon, ShapeCloudIcon as default };
