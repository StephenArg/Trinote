import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/sequence-collection-lifeline-icon.tsx
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
				"d": "M6.1 4.6c0-1.447 1.248-2.5 2.633-2.5h9.534c1.385 0 2.633 1.053 2.633 2.5v4.8c0 1.447-1.248 2.5-2.633 2.5H18v.1a2 2 0 0 1-2 2h-3.7v1.5h-1.8V14H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h.1zm12.167 5.5H18V7a2 2 0 0 0-2-2H7.9v-.4c0-.32.304-.7.833-.7h9.534c.53 0 .833.38.833.7v4.8c0 .32-.304.7-.833.7M16 6.8H6a.2.2 0 0 0-.2.2v5c0 .11.09.2.2.2h10a.2.2 0 0 0 .2-.2V7a.2.2 0 0 0-.2-.2",
				"transform": "scale(.83333)",
				"fillRule": "evenodd",
				"clipRule": "evenodd"
			}
		}, {
			"tag": "path",
			"attrs": {
				"d": "M10.5 17v1.5h1.8V17zM10.5 20v1.5a.9.9 0 1 0 1.8 0V20z",
				"transform": "scale(.83333)"
			}
		}]
	}]
};
const SequenceCollectionLifelineIcon = forwardRef(function SequenceCollectionLifelineIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "sequence-collection-lifeline-icon",
		ref,
		icon: element
	}));
});
SequenceCollectionLifelineIcon.displayName = "SequenceCollectionLifelineIcon";
//#endregion
export { SequenceCollectionLifelineIcon, SequenceCollectionLifelineIcon as default };
