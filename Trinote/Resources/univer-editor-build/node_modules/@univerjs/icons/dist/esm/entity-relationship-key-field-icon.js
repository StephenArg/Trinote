import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/entity-relationship-key-field-icon.tsx
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
			"d": "M3.8 6v3.1h16.4V6a.2.2 0 0 0-.2-.2H4a.2.2 0 0 0-.2.2m0 12v-7.1h3.4v7.3H4a.2.2 0 0 1-.2-.2m5.2.2h11a.2.2 0 0 0 .2-.2v-7.1H9zM2 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z",
			"transform": "scale(.83333)",
			"fillRule": "evenodd",
			"clipRule": "evenodd"
		}
	}]
};
const EntityRelationshipKeyFieldIcon = forwardRef(function EntityRelationshipKeyFieldIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "entity-relationship-key-field-icon",
		ref,
		icon: element
	}));
});
EntityRelationshipKeyFieldIcon.displayName = "EntityRelationshipKeyFieldIcon";
//#endregion
export { EntityRelationshipKeyFieldIcon, EntityRelationshipKeyFieldIcon as default };
