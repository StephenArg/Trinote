import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/sequence-magnetic-disk-lifeline-icon.tsx
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
				"d": "M19 5.5a1.8 1.8 0 0 0-.12-.647C18.275 3.23 15.425 2 12 2S5.726 3.23 5.12 4.853A1.8 1.8 0 0 0 5 5.6v4.999l.001.001.002.001q.02.333.157.647.149.338.42.648c.363.418.886.794 1.53 1.108l.007.004c1.036.504 2.383.85 3.883.957V15.5h1.8v-1.523c1.58-.09 3.001-.443 4.083-.969.647-.315 1.172-.692 1.538-1.112a2.5 2.5 0 0 0 .42-.65q.136-.313.156-.645h.001l.002-.002V5.5m-12.2.094.001-.047V5.51l.001-.006c.016-.048.139-.413 1.053-.87.968-.484 2.43-.835 4.145-.835s3.177.351 4.145.835c.914.457 1.037.822 1.053.87l.002.006-.001.036v.047l.001.006v.185l-.873.484c-.953.529-2.491.931-4.327.931s-3.374-.402-4.327-.931L6.8 5.785v-.191m9.295 5.796c.942-.459 1.084-.84 1.103-.89l.002-.006v-2.65a8.3 8.3 0 0 1-1.8.716c-1.007.28-2.166.44-3.4.44s-2.393-.16-3.4-.44a8.4 8.4 0 0 1-1.8-.717v2.651l.002.006c.02.05.161.431 1.103.89.97.471 2.412.81 4.095.81s3.126-.339 4.095-.81",
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
const SequenceMagneticDiskLifelineIcon = forwardRef(function SequenceMagneticDiskLifelineIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "sequence-magnetic-disk-lifeline-icon",
		ref,
		icon: element
	}));
});
SequenceMagneticDiskLifelineIcon.displayName = "SequenceMagneticDiskLifelineIcon";
//#endregion
export { SequenceMagneticDiskLifelineIcon, SequenceMagneticDiskLifelineIcon as default };
