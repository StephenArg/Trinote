import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/sequence-actor-lifeline-icon.tsx
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
				"d": "M12 1.2c-1.99 0-3.657 1.557-3.657 3.545 0 1.714 1.24 3.108 2.857 3.46v.475H7a.8.8 0 1 0 0 1.6h4.2v2.537l-3.917 2.51a.8.8 0 1 0 .863 1.347L11 14.845v.655h1.8v-.843l3.436 2.032a.8.8 0 1 0 .814-1.378L12.8 12.8V10.28H17a.8.8 0 0 0 0-1.6h-4.2v-.476c1.617-.35 2.857-1.745 2.857-3.459C15.657 2.757 13.99 1.2 12 1.2M9.943 4.745c0-1.044.89-1.945 2.057-1.945s2.057.9 2.057 1.945S13.167 6.69 12 6.69s-2.057-.9-2.057-1.945",
				"transform": "scale(.83333)",
				"fillRule": "evenodd",
				"clipRule": "evenodd"
			}
		}, {
			"tag": "path",
			"attrs": {
				"d": "M11 17v1.5h1.8V17zM11 20v1.5a.9.9 0 0 0 1.8 0V20z",
				"transform": "scale(.83333)"
			}
		}]
	}]
};
const SequenceActorLifelineIcon = forwardRef(function SequenceActorLifelineIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "sequence-actor-lifeline-icon",
		ref,
		icon: element
	}));
});
SequenceActorLifelineIcon.displayName = "SequenceActorLifelineIcon";
//#endregion
export { SequenceActorLifelineIcon, SequenceActorLifelineIcon as default };
