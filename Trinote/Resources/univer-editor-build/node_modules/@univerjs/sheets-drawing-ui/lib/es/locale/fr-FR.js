//#region src/locale/fr-FR.ts
const locale = { "sheets-drawing-ui": {
	title: "Image",
	upload: {
		float: "Image flottante",
		cell: "Image de cellule"
	},
	panel: { title: "Modifier l'image" },
	save: {
		title: "Enregistrer les images de cellule",
		menuLabel: "Enregistrer les images de cellule",
		imageCount: "Nombre d'images",
		fileNameConfig: "Nom du fichier",
		useRowCol: "Utiliser l'adresse de cellule (A1, B2...)",
		useColumnValue: "Utiliser la valeur de la colonne",
		selectColumn: "Sélectionner la colonne",
		cancel: "Annuler",
		confirm: "Enregistrer",
		saving: "Enregistrement...",
		error: "Échec de l'enregistrement des images de cellule"
	},
	"image-popup": {
		replace: "Remplacer",
		delete: "Supprimer",
		edit: "Éditer",
		crop: "Rogner",
		reset: "Réinitialiser la taille",
		flipH: "Retournement horizontal",
		flipV: "Retournement vertical"
	},
	"update-status": {
		exceedMaxSize: "La taille de l'image dépasse la limite, la limite est de {0}M",
		invalidImageType: "Type d'image invalide",
		exceedMaxCount: "Seulement {0} images peuvent être téléchargées à la fois",
		invalidImage: "Image invalide"
	},
	"drawing-anchor": {
		title: "Propriétés de l'ancre",
		both: "Déplacer et redimensionner avec les cellules",
		position: "Déplacer mais ne pas redimensionner avec les cellules",
		none: "Ne pas déplacer ni redimensionner avec les cellules"
	},
	"cell-image": {
		pasteTitle: "Coller comme image de cellule",
		pasteContent: "Coller une image de cellule écrasera le contenu existant de la cellule, continuer le collage",
		pasteError: "Le copier-coller d'image de cellule n'est pas pris en charge dans cette unité"
	},
	permission: { dialog: { editErr: "La plage est protégée, et vous n'avez pas la permission de modifier. Pour modifier, veuillez contacter le créateur." } },
	shortcut: {
		"drawing-view": "Vue du dessin",
		"drawing-move-down": "Déplacer le dessin vers le bas",
		"drawing-move-up": "Déplacer le dessin vers le haut",
		"drawing-move-left": "Déplacer le dessin vers la gauche",
		"drawing-move-right": "Déplacer le dessin vers la droite",
		"drawing-delete": "Supprimer le dessin"
	}
} };

//#endregion
export { locale as default };