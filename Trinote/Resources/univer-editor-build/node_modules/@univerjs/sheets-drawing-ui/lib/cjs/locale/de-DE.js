
//#region src/locale/de-DE.ts
const locale = { "sheets-drawing-ui": {
	title: "Bild",
	upload: {
		float: "Schwebendes Bild",
		cell: "Zellenbild"
	},
	panel: { title: "Bild bearbeiten" },
	save: {
		title: "Zellenbilder speichern",
		menuLabel: "Zellenbilder speichern",
		imageCount: "Bildanzahl",
		fileNameConfig: "Dateiname",
		useRowCol: "Zellenadresse verwenden (A1, B2...)",
		useColumnValue: "Spaltenwert verwenden",
		selectColumn: "Spalte auswählen",
		cancel: "Abbrechen",
		confirm: "Speichern",
		saving: "Speichern...",
		error: "Zellenbilder konnten nicht gespeichert werden"
	},
	"image-popup": {
		replace: "Ersetzen",
		delete: "Löschen",
		edit: "Bearbeiten",
		crop: "Zuschneiden",
		reset: "Größe zurücksetzen",
		flipH: "Horizontal spiegeln",
		flipV: "Vertikal spiegeln"
	},
	"update-status": {
		exceedMaxSize: "Bildgröße überschreitet das Limit, Limit ist {0}M",
		invalidImageType: "Ungültiger Bildtyp",
		exceedMaxCount: "Es können nur {0} Bilder gleichzeitig hochgeladen werden",
		invalidImage: "Ungültiges Bild"
	},
	"drawing-anchor": {
		title: "Anker-Eigenschaften",
		both: "Mit Zellen verschieben und skalieren",
		position: "Mit Zellen verschieben, aber nicht skalieren",
		none: "Weder verschieben noch skalieren mit Zellen"
	},
	"cell-image": {
		pasteTitle: "Als Zellenbild einfügen",
		pasteContent: "Das Einfügen eines Zellenbilds überschreibt den bestehenden Inhalt der Zelle, mit dem Einfügen fortfahren?",
		pasteError: "Kopieren und Einfügen von Zellenbildern wird in dieser Einheit nicht unterstützt"
	},
	permission: { dialog: { editErr: "Der Bereich ist geschützt, und Sie haben keine Bearbeitungsberechtigung. Um zu bearbeiten, wenden Sie sich bitte an den Ersteller." } },
	shortcut: {
		"drawing-view": "Zeichnungsansicht",
		"drawing-move-down": "Zeichnung nach unten verschieben",
		"drawing-move-up": "Zeichnung nach oben verschieben",
		"drawing-move-left": "Zeichnung nach links verschieben",
		"drawing-move-right": "Zeichnung nach rechts verschieben",
		"drawing-delete": "Zeichnung löschen"
	}
} };

//#endregion
module.exports = locale;