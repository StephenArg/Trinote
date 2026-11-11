import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/won-icon.tsx
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
			"d": "M14.8 9.4486H12.955L11.8883 13.2829H10.5477L9.4811 9.4486H6.5189L5.4378 13.2829H4.0108L2.9874 9.4486H1.2V8.4685H2.7351L2.4541 7.409H1.2V6.436H2.1946L1.2 2.7171H2.6342L3.4919 6.436H6.1153L7.182 2.7171H8.8613L9.9135 6.436H12.4649L13.3802 2.7171H14.8L13.7622 6.436H14.8V7.409H13.5099L13.2144 8.4685H14.8V9.4486ZM8.645 6.436Q8.0757 4.3676 7.9892 4Q7.8667 4.6342 7.3261 6.436H8.645ZM12.2414 7.409H10.209L10.5045 8.4685H11.9748L12.2414 7.409ZM9.2144 8.4685L8.9189 7.409H7.0739L6.7856 8.4685H9.2144ZM5.8559 7.409H3.7297L3.9748 8.4685H5.5604L5.8559 7.409ZM11.7586 9.4486H10.7351Q11.0955 11.1063 11.1964 11.8054L11.7586 9.4486ZM5.2937 9.4486H4.1838Q4.573 11.1063 4.7027 11.8054Q4.955 10.7315 5.2937 9.4486Z"
		}
	}]
};
const WonIcon = forwardRef(function WonIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "won-icon",
		ref,
		icon: element
	}));
});
WonIcon.displayName = "WonIcon";
//#endregion
export { WonIcon, WonIcon as default };
