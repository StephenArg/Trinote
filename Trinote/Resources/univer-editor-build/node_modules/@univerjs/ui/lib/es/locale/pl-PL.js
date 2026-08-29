//#region src/locale/pl-PL.ts
const locale = { ui: {
	toolbar: { heading: {
		normal: "Normalny",
		title: "Tytuł",
		subTitle: "Podtytuł",
		1: "Nagłówek 1",
		2: "Nagłówek 2",
		3: "Nagłówek 3",
		4: "Nagłówek 4",
		5: "Nagłówek 5",
		6: "Nagłówek 6",
		tooltip: "Ustaw nagłówek"
	} },
	ribbon: {
		start: "Start",
		startDesc: "Zainicjuj arkusz i ustaw podstawowe parametry.",
		insert: "Wstaw",
		insertDesc: "Wstaw wiersze, kolumny, wykresy i inne elementy.",
		formulas: "Formuły",
		formulasDesc: "Użyj funkcji i formuł do obliczeń danych.",
		data: "Dane",
		dataDesc: "Zarządzaj danymi, w tym import, sortowanie i filtrowanie.",
		view: "Widok",
		viewDesc: "Przełączaj tryby widoku i dostosowuj efekt wyświetlania.",
		others: "Inne",
		othersDesc: "Inne funkcje i ustawienia.",
		more: "Więcej"
	},
	fontFamily: {
		"not-supported": "Nie znaleziono takiej czcionki w systemie, używana jest czcionka domyślna.",
		arial: "Arial",
		"times-new-roman": "Times New Roman",
		tahoma: "Tahoma",
		verdana: "Verdana",
		"microsoft-yahei": "Microsoft YaHei",
		simsun: "SimSun",
		simhei: "SimHei",
		kaiti: "Kaiti",
		fangsong: "FangSong",
		nsimsun: "NSimSun",
		stxinwei: "STXinwei",
		stxingkai: "STXingkai",
		stliti: "STLiti"
	},
	"shortcut-panel": { title: "Skróty klawiszowe" },
	shortcut: {
		undo: "Cofnij",
		redo: "Ponów",
		cut: "Wytnij",
		copy: "Kopiuj",
		paste: "Wklej",
		"shortcut-panel": "Przełącz panel skrótów"
	},
	"common-edit": "Skróty do częstej edycji",
	"toggle-shortcut-panel": "Przełącz panel skrótów",
	clipboard: { authentication: {
		title: "Brak uprawnień",
		content: "Zezwól Univer na dostęp do schowka."
	} },
	textEditor: {
		formulaError: "Wprowadź prawidłową formułę, np. =SUMA(A1)",
		rangeError: "Wprowadź prawidłowy zakres, np. A1:B10"
	},
	rangeSelector: {
		title: "Wybierz zakres danych",
		addAnotherRange: "Dodaj zakres",
		buttonTooltip: "Wybierz zakres danych",
		placeHolder: "Wybierz zakres lub wpisz.",
		confirm: "Potwierdź",
		cancel: "Anuluj"
	},
	"global-shortcut": "Globalny skrót klawiszowy",
	"zoom-slider": { resetTo: "Resetuj do" },
	row: "Wiersz",
	column: "Kolumna"
} };

//#endregion
export { locale as default };