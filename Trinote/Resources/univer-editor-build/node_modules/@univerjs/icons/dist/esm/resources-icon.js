import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/resources-icon.tsx
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
			"d": "M3.48256 2.14178C2.69945 2.14178 2.06461 2.77663 2.06461 3.55974V10.5584L4.97543 7.88934C5.4593 7.44577 6.19819 7.43344 6.69657 7.86065L9.06228 9.88839L10.6918 8.25883C11.1492 7.80147 11.8733 7.75006 12.3907 8.1381L13.935 9.29634V3.55974C13.935 2.77663 13.3002 2.14178 12.517 2.14178H3.48256ZM0.849805 3.55974C0.849805 2.10568 2.02851 0.926971 3.48256 0.926971H12.517C13.9711 0.926971 15.1498 2.10568 15.1498 3.55974V12.4404C15.1498 13.8944 13.9711 15.0731 12.517 15.0731H3.48256C2.02851 15.0731 0.849805 13.8944 0.849805 12.4404V3.55974ZM2.06461 12.1967V12.4404C2.06461 13.2235 2.69945 13.8583 3.48256 13.8583H12.517C13.3002 13.8583 13.935 13.2235 13.935 12.4404V10.8158L11.6618 9.11193C11.6258 9.0849 11.5754 9.08852 11.5436 9.12029L9.99146 10.6725L11.2145 11.7206C11.469 11.9388 11.4985 12.3215 11.2804 12.5761C11.0622 12.8306 10.6795 12.8601 10.4249 12.642L5.90596 8.7686C5.87127 8.73887 5.8198 8.73972 5.78611 8.7706L2.06461 12.1967Z",
			"fillRule": "evenodd",
			"clipRule": "evenodd"
		}
	}, {
		"tag": "circle",
		"attrs": {
			"cx": 5.37,
			"cy": 4.23,
			"r": 1.08,
			"fill": "currentColor"
		}
	}]
};
const ResourcesIcon = forwardRef(function ResourcesIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "resources-icon",
		ref,
		icon: element
	}));
});
ResourcesIcon.displayName = "ResourcesIcon";
//#endregion
export { ResourcesIcon, ResourcesIcon as default };
