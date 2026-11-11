import { createElement, forwardRef } from "react";
import { IconBase } from "./base.js";
//#region ts/entity-relationship-entity-icon.tsx
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
			"d": "M3.8 9.1V6c0-.11.09-.2.2-.2h16c.11 0 .2.09.2.2v3.1zm0 1.8V18c0 .11.09.2.2.2h16a.2.2 0 0 0 .2-.2v-7.1zM4 20a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2z",
			"transform": "scale(.83333)",
			"fillRule": "evenodd",
			"clipRule": "evenodd"
		}
	}]
};
const EntityRelationshipEntityIcon = forwardRef(function EntityRelationshipEntityIcon(props, ref) {
	return createElement(IconBase, Object.assign({}, props, {
		id: "entity-relationship-entity-icon",
		ref,
		icon: element
	}));
});
EntityRelationshipEntityIcon.displayName = "EntityRelationshipEntityIcon";
//#endregion
export { EntityRelationshipEntityIcon, EntityRelationshipEntityIcon as default };
