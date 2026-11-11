import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/places-icon.tsx
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
			"d": "M12.6 6.7C12.6 10.1 8 14.1 8 14.1C8 14.1 3.4 10.1 3.4 6.7C3.4 4.2 5.5 2.1 8 2.1C10.5 2.1 12.6 4.2 12.6 6.7Z",
			"strokeLinejoin": "round",
			"strokeWidth": 1.3
		}
	}, {
		"tag": "circle",
		"attrs": {
			"cx": 8,
			"cy": 6.7,
			"r": 1.6,
			"stroke": "currentColor",
			"strokeWidth": 1.3
		}
	}]
};
const PlacesIcon = forwardRef(function PlacesIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "places-icon",
		ref,
		icon: element
	}));
});
PlacesIcon.displayName = "PlacesIcon";
//#endregion
export { PlacesIcon, PlacesIcon as default };
