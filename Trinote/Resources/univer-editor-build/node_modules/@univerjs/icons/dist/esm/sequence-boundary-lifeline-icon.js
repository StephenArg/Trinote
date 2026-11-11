import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/sequence-boundary-lifeline-icon.tsx
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
		"tag": "g",
		"attrs": { "fill": "currentColor" },
		"children": [{
			"tag": "path",
			"attrs": {
				"d": "M13.8 13.993a6 6 0 1 0-6.237-6.868A1 1 0 0 0 7.35 7.1H6.3V2.9a.9.9 0 0 0-1.8 0v10.2a.9.9 0 1 0 1.8 0V8.9h1.05a1 1 0 0 0 .213-.025A6.01 6.01 0 0 0 12 13.81V15.5h1.8zM17.7 8a4.2 4.2 0 1 1-8.4 0 4.2 4.2 0 0 1 8.4 0",
				"transform": "scale(.83333)",
				"fillRule": "evenodd",
				"clipRule": "evenodd"
			}
		}, {
			"tag": "path",
			"attrs": {
				"d": "M12 17v1.5h1.8V17zM12 20v1.5a.9.9 0 1 0 1.8 0V20z",
				"transform": "scale(.83333)"
			}
		}]
	}]
};
const SequenceBoundaryLifelineIcon = forwardRef(function SequenceBoundaryLifelineIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "sequence-boundary-lifeline-icon",
		ref,
		icon: element
	}));
});
SequenceBoundaryLifelineIcon.displayName = "SequenceBoundaryLifelineIcon";
//#endregion
export { SequenceBoundaryLifelineIcon, SequenceBoundaryLifelineIcon as default };
