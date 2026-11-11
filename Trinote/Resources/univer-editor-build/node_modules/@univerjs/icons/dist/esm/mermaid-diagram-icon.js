import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/mermaid-diagram-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 20 20",
		"width": "1em",
		"height": "1em"
	},
	"children": [
		{
			"tag": "rect",
			"attrs": {
				"width": 4.6,
				"height": 3.4,
				"x": 7.7,
				"y": 2.6,
				"stroke": "currentColor",
				"rx": .6,
				"strokeLinejoin": "round",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 4.6,
				"height": 3.4,
				"x": 2.6,
				"y": 14,
				"stroke": "currentColor",
				"rx": .6,
				"strokeLinejoin": "round",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "rect",
			"attrs": {
				"width": 4.6,
				"height": 3.4,
				"x": 12.8,
				"y": 14,
				"stroke": "currentColor",
				"rx": .6,
				"strokeLinejoin": "round",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M10 6V10.2",
				"strokeLinecap": "round",
				"strokeWidth": 1.6
			}
		},
		{
			"tag": "path",
			"attrs": {
				"stroke": "currentColor",
				"d": "M4.9 14V10.2H15.1V14",
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"strokeWidth": 1.6
			}
		}
	]
};
const MermaidDiagramIcon = forwardRef(function MermaidDiagramIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "mermaid-diagram-icon",
		ref,
		icon: element
	}));
});
MermaidDiagramIcon.displayName = "MermaidDiagramIcon";
//#endregion
export { MermaidDiagramIcon, MermaidDiagramIcon as default };
