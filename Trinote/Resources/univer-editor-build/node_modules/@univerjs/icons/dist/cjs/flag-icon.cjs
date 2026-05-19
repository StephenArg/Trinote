Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
let react = require("react");
let ts_base_js = require("./base.js");
//#region ts/flag-icon.tsx
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
			"d": "M3.25 2.5C3.25 2.08579 3.58579 1.75 4 1.75C4.41421 1.75 4.75 2.08579 4.75 2.5V13.5C4.75 13.9142 4.41421 14.25 4 14.25C3.58579 14.25 3.25 13.9142 3.25 13.5V2.5Z"
		}
	}, {
		"tag": "path",
		"attrs": {
			"fill": "currentColor",
			"d": "M4.75 3.088C6.02367 2.7469 7.00972 2.7044 7.8443 2.81465C8.70544 2.92841 9.37774 3.19906 10.0279 3.46147L10.0668 3.47718C11.004 3.85549 11.9397 4.21307 13.4603 3.8373C13.8931 3.73034 14.3125 4.05801 14.3125 4.50387V10.1091C14.3125 10.4232 14.0992 10.697 13.7946 10.774C11.8986 11.2535 10.6411 10.7813 9.51441 10.3265L9.47546 10.3108C8.82531 10.0484 8.153 9.77774 7.29186 9.66398C6.62487 9.5759 5.84983 9.58567 4.75 9.84134V3.088Z"
		}
	}]
};
const FlagIcon = (0, react.forwardRef)(function FlagIcon(props, ref) {
	return (0, react.createElement)(ts_base_js.IconBase, Object.assign({}, props, {
		id: "flag-icon",
		ref,
		icon: element
	}));
});
FlagIcon.displayName = "FlagIcon";
//#endregion
exports.FlagIcon = FlagIcon;
exports.default = FlagIcon;
