import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/ai-assistant-multi-icon.tsx
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
			"fill": "url(#ai-assistant-multi-icon_paint0_linear_236_415)",
			"d": "M9.18035 2.34502C9.21605 2.15386 9.31749 1.9812 9.46709 1.85695C9.6167 1.7327 9.80504 1.66469 9.99951 1.66469C10.194 1.66469 10.3823 1.7327 10.5319 1.85695C10.6815 1.9812 10.783 2.15386 10.8187 2.34502L11.6945 6.97669C11.7567 7.30598 11.9167 7.60887 12.1537 7.84583C12.3907 8.08279 12.6936 8.24282 13.0228 8.30502L17.6545 9.18085C17.8457 9.21656 18.0183 9.318 18.1426 9.4676C18.2668 9.6172 18.3348 9.80555 18.3348 10C18.3348 10.1945 18.2668 10.3828 18.1426 10.5324C18.0183 10.682 17.8457 10.7835 17.6545 10.8192L13.0228 11.695C12.6936 11.7572 12.3907 11.9172 12.1537 12.1542C11.9167 12.3912 11.7567 12.6941 11.6945 13.0234L10.8187 17.655C10.783 17.8462 10.6815 18.0188 10.5319 18.1431C10.3823 18.2673 10.194 18.3353 9.99951 18.3353C9.80504 18.3353 9.6167 18.2673 9.46709 18.1431C9.31749 18.0188 9.21605 17.8462 9.18035 17.655L8.30451 13.0234C8.24231 12.6941 8.08228 12.3912 7.84532 12.1542C7.60836 11.9172 7.30547 11.7572 6.97618 11.695L2.34451 10.8192C2.15335 10.7835 1.98069 10.682 1.85645 10.5324C1.7322 10.3828 1.66418 10.1945 1.66418 10C1.66418 9.80555 1.7322 9.6172 1.85645 9.4676C1.98069 9.318 2.15335 9.21656 2.34451 9.18085L6.97618 8.30502C7.30547 8.24282 7.60836 8.08279 7.84532 7.84583C8.08228 7.60887 8.24231 7.30598 8.30451 6.97669L9.18035 2.34502Z"
		}
	}, {
		"tag": "defs",
		"attrs": {},
		"children": [{
			"tag": "linearGradient",
			"attrs": {
				"id": "ai-assistant-multi-icon_paint0_linear_236_415",
				"x1": 1.66,
				"x2": 18.18,
				"y1": 7.09,
				"y2": 6.77,
				"gradientUnits": "userSpaceOnUse"
			},
			"children": [
				{
					"tag": "stop",
					"attrs": {
						"offset": 0,
						"stopColor": "#0b00d0"
					}
				},
				{
					"tag": "stop",
					"attrs": {
						"offset": .49,
						"stopColor": "#0492ed"
					}
				},
				{
					"tag": "stop",
					"attrs": {
						"offset": .65,
						"stopColor": "#029dce"
					}
				},
				{
					"tag": "stop",
					"attrs": {
						"offset": .88,
						"stopColor": "#00aba6"
					}
				},
				{
					"tag": "stop",
					"attrs": {
						"offset": 1,
						"stopColor": "#00b197"
					}
				}
			]
		}]
	}],
	"defIds": ["ai-assistant-multi-icon_paint0_linear_236_415"]
};
const AiAssistantMultiIcon = forwardRef(function AiAssistantMultiIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "ai-assistant-multi-icon",
		ref,
		icon: element
	}));
});
AiAssistantMultiIcon.displayName = "AiAssistantMultiIcon";
//#endregion
export { AiAssistantMultiIcon, AiAssistantMultiIcon as default };
