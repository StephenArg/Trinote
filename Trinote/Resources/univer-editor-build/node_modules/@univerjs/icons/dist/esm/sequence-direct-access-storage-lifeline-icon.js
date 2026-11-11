import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/sequence-direct-access-storage-lifeline-icon.tsx
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
				"d": "M17 14q.346-.002.67-.15C19.006 13.24 20 10.853 20 8s-.995-5.24-2.33-5.85A1.6 1.6 0 0 0 17 2H7a1.6 1.6 0 0 0-.66.146 2.1 2.1 0 0 0-.469.293c-.374.304-.711.756-.992 1.318C4.336 4.843 4 6.343 4 8s.336 3.157.879 4.243l.002.004c.28.56.617 1.01.99 1.314q.226.183.469.293A1.6 1.6 0 0 0 7 14h4v1.5h1.8V14zm-.063-10.2h-.075l-.388.792c-.387.789-.674 1.99-.674 3.408s.287 2.62.674 3.408l.388.792h.075c.056-.03.28-.174.574-.762.394-.787.689-2 .689-3.438s-.295-2.65-.689-3.438c-.294-.588-.518-.732-.574-.762m-2.08 8.4a8 8 0 0 1-.607-1.8C14.09 9.665 14 8.853 14 8s.09-1.665.25-2.4a8 8 0 0 1 .608-1.8H7.063l-.03.018c-.085.057-.288.232-.544.744-.394.787-.689 2-.689 3.438s.295 2.65.689 3.438c.294.588.518.732.574.762z",
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
const SequenceDirectAccessStorageLifelineIcon = forwardRef(function SequenceDirectAccessStorageLifelineIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "sequence-direct-access-storage-lifeline-icon",
		ref,
		icon: element
	}));
});
SequenceDirectAccessStorageLifelineIcon.displayName = "SequenceDirectAccessStorageLifelineIcon";
//#endregion
export { SequenceDirectAccessStorageLifelineIcon, SequenceDirectAccessStorageLifelineIcon as default };
