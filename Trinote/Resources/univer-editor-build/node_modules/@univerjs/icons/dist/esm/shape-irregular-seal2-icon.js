import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-irregular-seal2-icon.tsx
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
		"tag": "path",
		"attrs": {
			"fill": "currentColor",
			"d": "M14.8447 4.8271L17.0254 2.7588L17.0254 5.5176L19.9092 7.4971L17.5 9.5L20 13.1035L15.6836 13.1035L19.0381 18.6211L12.3301 15.1729L12.0566 17.9307L8.3057 17.2412L4.2813 20L4.2813 15.8623L0 15.8623L2.9394 11.7246L0 8.9658L4.5 8.5L2.9394 5.1348L7.6348 5.5176L7.5 2L11 4.5L12.0566 0ZM5.8812 16.9632L7.9455 15.5482L10.6351 16.0421L10.7378 15.0152L10.9699 12.6743L13.0615 13.7495L14.7206 14.5989L12.8391 11.5035L16.9433 11.5035L15.3492 9.207L16.4776 8.2693L17.2598 7.6172L16.1199 6.8362L15.5005 6.4107L14.4744 7.3849L12.6911 4.2967L12.0116 7.1891L9.2217 5.1962L9.3024 7.258L5.5447 6.9517L5.9516 7.8266L6.8946 9.8609L4.6654 10.0914L3.6472 10.1942L5.0519 11.5129L3.0993 14.2623L5.8812 14.2623Z",
			"fillRule": "evenodd"
		}
	}]
};
const ShapeIrregularSeal2Icon = forwardRef(function ShapeIrregularSeal2Icon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-irregular-seal2-icon",
		ref,
		icon: element
	}));
});
ShapeIrregularSeal2Icon.displayName = "ShapeIrregularSeal2Icon";
//#endregion
export { ShapeIrregularSeal2Icon, ShapeIrregularSeal2Icon as default };
