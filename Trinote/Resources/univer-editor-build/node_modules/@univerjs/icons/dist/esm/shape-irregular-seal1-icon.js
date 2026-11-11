import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-irregular-seal1-icon.tsx
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
			"d": "M12.667 5.5176L18 4.8271L14 8.9658L20 11.2139L14 12.4141L18 18.6211L10.667 15.1729L10 20L7.333 15.8623L4 20L4 14.4824L0 14.1787L4 10.5L0 6.207L5.333 6.207L5.333 0.6895L9.6543 5.6416L12.667 0ZM6.933 7.807L3.677 7.807L6.2686 10.5874L3.793 12.8621L5.6 12.9996L5.6 15.4617L7.4775 13.1324L9.0051 15.5024L9.3793 12.7992L13.6347 14.7987L11.3819 11.305L14.1861 10.7426L11.1541 9.6078L12.852 7.8512L13.6495 7.0029L10.5254 7.4071L9.9738 8.4408L6.933 4.9568Z",
			"fillRule": "evenodd"
		}
	}]
};
const ShapeIrregularSeal1Icon = forwardRef(function ShapeIrregularSeal1Icon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-irregular-seal1-icon",
		ref,
		icon: element
	}));
});
ShapeIrregularSeal1Icon.displayName = "ShapeIrregularSeal1Icon";
//#endregion
export { ShapeIrregularSeal1Icon, ShapeIrregularSeal1Icon as default };
