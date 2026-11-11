import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/shape-star5-icon.tsx
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
			"d": "M12.3606 7.2578L20 7.2578L13.8197 11.7432L16.1803 19L10 14.5146L3.8197 19L6.1803 11.7432L0 7.2578L7.6394 7.2578L10 0ZM8.8767 8.9584L5.2405 8.9584L8.1824 11.093L7.0591 14.545L9.9999 12.4127L12.9394 14.545L11.8175 11.0931L14.7595 8.9584L11.1232 8.9584L10 5.5051Z",
			"fillRule": "evenodd"
		}
	}]
};
const ShapeStar5Icon = forwardRef(function ShapeStar5Icon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "shape-star5-icon",
		ref,
		icon: element
	}));
});
ShapeStar5Icon.displayName = "ShapeStar5Icon";
//#endregion
export { ShapeStar5Icon, ShapeStar5Icon as default };
