Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
let react = require("react");
let ts_base_js = require("./base.js");
//#region ts/univer-sdk-multi-icon.tsx
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
		"tag": "defs",
		"attrs": {},
		"children": [{
			"tag": "linearGradient",
			"attrs": {
				"id": "univer-sdk-multi-icon_univer-sdk-multi-icon",
				"x1": 3.2,
				"x2": 13.14,
				"y1": 4.92,
				"y2": 11.29,
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
	}, {
		"tag": "path",
		"attrs": {
			"fill": "url(#univer-sdk-multi-icon_univer-sdk-multi-icon)",
			"d": "m2.41,11.54c-0.03-.02-0.06-0.04-0.08-0.07-0.62-0.72-0.72-1.75-0.25-2.58l3.35-5.8c0.09-0.15,0.28-0.2,0.43-0.12,0.15,0.09,0.2,0.28,0.12,0.43l-3.35,5.8c-0.34,0.59-0.27,1.33,0.18,1.85,0.11,0.13,0.1,0.33-0.03,0.44-0.1,0.09-0.25,0.1-0.36,0.04Zm-0.68-3.09L5.16,2.5c0.12-0.21,0.28-0.38,0.47-0.53,0.09-0.07,0.11-0.2,0.05-0.29-0.07-0.09-0.2-0.11-0.29-0.05-0.24,0.18-0.44,0.4-0.59,0.65L1.36,8.24c-0.06,0.1-.02,0.23,0.08,0.29s0.23 .02,0.29-0.08Zm5.11,2.62l1.24-2.15c0.15-0.25,0.06-0.57-0.19-0.72-0.25-0.15-0.57-0.06-0.72,0.19l-1.24,2.15c-0.23,0.4-0.75,0.54-1.15,0.31-0.4-0.23-0.54-0.75-0.31-1.15l2.73-4.73c0.15-0.25,0.06-0.57-0.19-0.72-0.25-0.15-0.57-0.06-0.72,0.19l-2.73,4.73c-0.52,0.9-0.21,2.06,0.69,2.59,0.9,0.52,2.06,0.21,2.59-0.69Zm6.39-6.58c-0.13,0.11-0.15,0.31-0.03,0.44,0.45,0.52,0.52,1.26,0.18,1.85l-3.35,5.8c-0.09,0.15-0.04,0.34,0.12,0.43,0.15,0.09,0.34,0.04,0.43-0.12l3.35-5.8c0.48-0.82,0.38-1.86-0.25-2.58-.02-0.03-0.05-0.05-0.08-0.07-0.11-0.07-0.26-0.06-0.36,0.04Zm1.04,3.05l-3.44,5.95c-0.12,0.21-0.28,0.38-0.47,0.53-0.09,0.07-0.11,0.2-0.05,0.29,0.07,0.09,0.2,0.11,0.29,0.05,0.24-0.18,0.44-0.4,0.59-0.65l3.44-5.95c0.06-0.1 .02-0.23-0.08-0.29-0.1-0.06-0.23-.02-0.29,0.08Zm-5.11-2.62l-1.24,2.15c-0.15,0.25-0.06,0.57,0.19,0.72,0.25,0.15,0.57,0.06,0.72-0.19l1.24-2.15c0.23-0.4,0.75-0.54,1.15-0.31,0.4,0.23,0.54,0.75,0.31,1.15l-2.73,4.73c-0.15,0.25-0.06,0.57,0.19,0.72,0.25,0.15,0.57,0.06,0.72-0.19l2.73-4.73c0.52-0.9,0.21-2.06-0.69-2.59-0.9-0.52-2.06-0.21-2.59,0.69Z"
		}
	}],
	"defIds": ["univer-sdk-multi-icon_univer-sdk-multi-icon"]
};
const UniverSdkMultiIcon = (0, react.forwardRef)(function UniverSdkMultiIcon(props, ref) {
	return (0, react.createElement)(ts_base_js.IconBase, Object.assign({}, props, {
		id: "univer-sdk-multi-icon",
		ref,
		icon: element
	}));
});
UniverSdkMultiIcon.displayName = "UniverSdkMultiIcon";
//#endregion
exports.UniverSdkMultiIcon = UniverSdkMultiIcon;
exports.default = UniverSdkMultiIcon;
