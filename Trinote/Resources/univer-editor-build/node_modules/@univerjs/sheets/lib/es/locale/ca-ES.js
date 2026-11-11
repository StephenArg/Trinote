//#region src/locale/ca-ES.ts
const locale = { sheets: {
	tabs: {
		sheetCopy: "(Còpia{0})",
		sheet: "Full"
	},
	info: {
		overlappingSelections: "No es pot utilitzar aquesta ordre en seleccions superposades",
		acrossMergedCell: "A través d'una cel·la combinada",
		partOfCell: "Només una part d'una cel·la combinada està seleccionada",
		hideSheet: "No hi ha fulls visibles després d'ocultar aquest"
	},
	definedName: {
		nameEmpty: "El nom no pot estar buit",
		nameDuplicate: "El nom ja existeix",
		nameInvalid: "El nom no és vàlid",
		nameSheetConflict: "El nom entra en conflicte amb el nom del full de càlcul",
		formulaOrRefStringEmpty: "La fórmula o la cadena de referència no pot estar buida",
		nameConflict: "El nom entra en conflicte amb el nom d'una funció",
		defaultName: "NomDefinit"
	},
	permission: { dialog: {
		autoFillErr: "L'interval està protegit i no teniu permís per a l'emplenament automàtic. Per utilitzar l'emplenament automàtic, contacteu amb el creador.",
		editErr: "L'interval està protegit i no teniu permís d'edició. Per editar, contacteu amb el creador.",
		formulaErr: "L'interval o l'interval referenciat està protegit, i no teniu permís d'edició. Per editar, contacteu amb el creador.",
		insertOrDeleteMoveRangeErr: "L'interval inserit o suprimit s'interseca amb l'interval protegit, i aquesta operació no és compatible per ara.",
		insertRowColErr: "L'interval està protegit i no teniu permís per inserir files i columnes. Per inserir files i columnes, contacteu amb el creador.",
		moveRangeErr: "L'interval està protegit i no teniu permís per moure la selecció. Per moure la selecció, contacteu amb el creador.",
		moveRowColErr: "L'interval està protegit i no teniu permís per moure files i columnes. Per moure files i columnes, contacteu amb el creador.",
		operatorSheetErr: "El full de càlcul està protegit i no teniu permís per operar-hi. Per operar al full de càlcul, contacteu amb el creador.",
		removeRowColErr: "L'interval està protegit i no teniu permís per suprimir files i columnes. Per suprimir files i columnes, contacteu amb el creador.",
		setRowColStyleErr: "L'interval està protegit i no teniu permís per establir estils de fila i columna. Per establir estils de fila i columna, contacteu amb el creador.",
		setStyleErr: "L'interval està protegit i no teniu permís per establir estils. Per establir estils, contacteu amb el creador."
	} },
	autoFill: {
		copy: "Copia les cel·les",
		series: "Omple la sèrie",
		formatOnly: "Només el format",
		noFormat: "Sense format"
	},
	merge: { confirm: {
		title: "Continuar la fusió només conservarà el valor de la cel·la superior esquerra, descartant els altres valors. Estàs segur de continuar?",
		cancel: "Cancel·lar fusió",
		confirm: "Continuar fusió",
		warning: "Avís"
	} }
} };

//#endregion
export { locale as default };