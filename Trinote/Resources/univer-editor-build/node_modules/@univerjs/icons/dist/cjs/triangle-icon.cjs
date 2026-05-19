Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
let react = require("react");
let ts_base_js = require("./base.js");
//#region ts/triangle-icon.tsx
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
			"d": "M7.35127 2.31778C7.61335 1.86074 8.27331 1.86074 8.53539 2.31778L14.0808 11.9898C14.3423 12.4459 14.0131 13.0147 13.4877 13.0147H2.399C1.87354 13.0147 1.54441 12.4459 1.80595 11.9898L7.35127 2.31778Z"
		}
	}]
};
const TriangleIcon = (0, react.forwardRef)(function TriangleIcon(props, ref) {
	return (0, react.createElement)(ts_base_js.IconBase, Object.assign({}, props, {
		id: "triangle-icon",
		ref,
		icon: element
	}));
});
TriangleIcon.displayName = "TriangleIcon";
//#endregion
exports.TriangleIcon = TriangleIcon;
exports.default = TriangleIcon;
