import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/sequence-object-lifeline-icon.tsx
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
				"d": "M3 4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-6.101l.001.048v.837h-1.8v-.837l.001-.048H5a2 2 0 0 1-2-2zm2-.2h14c.11 0 .2.09.2.2v6a.2.2 0 0 1-.2.2H5a.2.2 0 0 1-.2-.2V4c0-.11.09-.2.2-.2",
				"transform": "scale(.83333)",
				"fillRule": "evenodd",
				"clipRule": "evenodd"
			}
		}, {
			"tag": "path",
			"attrs": {
				"d": "M11.1 14.56v1.674h1.8V14.56zM11.1 17.91v1.674h1.8v-1.675zM11.1 21.258v.838a.9.9 0 1 0 1.8 0v-.838z",
				"transform": "scale(.83333)"
			}
		}]
	}]
};
const SequenceObjectLifelineIcon = forwardRef(function SequenceObjectLifelineIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "sequence-object-lifeline-icon",
		ref,
		icon: element
	}));
});
SequenceObjectLifelineIcon.displayName = "SequenceObjectLifelineIcon";
//#endregion
export { SequenceObjectLifelineIcon, SequenceObjectLifelineIcon as default };
