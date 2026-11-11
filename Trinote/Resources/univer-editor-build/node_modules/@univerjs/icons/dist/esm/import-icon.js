import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/import-icon.tsx
const element = {
	"tag": "svg",
	"attrs": {
		"xmlns": "http://www.w3.org/2000/svg",
		"fill": "none",
		"viewBox": "0 0 16 16",
		"width": "1em",
		"height": "1em"
	},
	"children": [{
		"tag": "path",
		"attrs": {
			"fill": "currentColor",
			"d": "M8.66203 10C8.66203 10.3673 8.3643 10.665 7.99703 10.665C7.62976 10.665 7.33203 10.3673 7.33203 10V2.94159L5.47019 4.80343C5.21049 5.06313 4.78943 5.06313 4.52973 4.80343C4.27004 4.54373 4.27004 4.12267 4.52973 3.86298L7.49155 0.901153C7.61015 0.762628 7.78475 0.673322 7.9803 0.668506C8.15698 0.663335 8.33534 0.728097 8.47019 0.862978L11.4702 3.86298C11.7299 4.12267 11.7299 4.54373 11.4702 4.80343C11.2105 5.06313 10.7894 5.06313 10.5297 4.80343L8.66203 2.93572V10Z"
		}
	}, {
		"tag": "path",
		"attrs": {
			"fill": "currentColor",
			"d": "M14 7.33496C14.3672 7.33496 14.665 7.63269 14.665 7.99996V11C14.665 13.0241 13.0241 14.665 11 14.665H4.99996C2.97584 14.665 1.33496 13.0241 1.33496 11V8.00273C1.33496 7.63546 1.63269 7.33773 1.99996 7.33773C2.36723 7.33773 2.66496 7.63546 2.66496 8.00273V11C2.66496 12.2895 3.71038 13.335 4.99996 13.335H11C12.2895 13.335 13.335 12.2895 13.335 11V7.99996C13.335 7.63269 13.6327 7.33496 14 7.33496Z"
		}
	}]
};
const ImportIcon = forwardRef(function ImportIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "import-icon",
		ref,
		icon: element
	}));
});
ImportIcon.displayName = "ImportIcon";
//#endregion
export { ImportIcon, ImportIcon as default };
