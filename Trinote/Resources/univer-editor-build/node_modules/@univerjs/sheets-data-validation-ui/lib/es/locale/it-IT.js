//#region src/locale/it-IT.ts
const locale = { "sheets-data-validation-ui": {
	title: "Convalida dati",
	ribbon: {
		setCheckbox: "Imposta casella di controllo",
		clearCheckbox: "Cancella casella di controllo",
		dropdownPresetTitle: "Applica una preimpostazione:",
		editDropdown: "Modifica opzioni",
		clearDropdown: "Cancella elenco a discesa",
		dateTime: "Data e ora",
		presets: {
			yes: "Sì",
			no: "No",
			notStarted: "Non iniziato",
			inProgress: "In corso",
			completed: "Completato",
			option1: "Opzione 1",
			option2: "Opzione 2"
		}
	},
	operators: { legal: "è un tipo valido" },
	validFail: { formulaError: "L'intervallo di riferimento contiene dati invisibili, riadatta l'intervallo" },
	panel: {
		title: "Gestione convalida dati",
		addTitle: "Crea nuova convalida dati",
		removeAll: "Rimuovi Tutto",
		add: "Aggiungi Regola",
		range: "Intervalli",
		type: "Tipo",
		options: "Opzioni avanzate",
		operator: "Operatore",
		removeRule: "Rimuovi",
		done: "Fatto",
		formulaPlaceholder: "Inserisci valore o formula",
		valuePlaceholder: "Inserisci valore",
		formulaAnd: "e",
		invalid: "Non valido",
		showWarning: "Mostra avviso",
		rejectInput: "Rifiuta input",
		messageInfo: "Messaggio di aiuto",
		showInfo: "Mostra testo di aiuto per una cella selezionata",
		rangeError: "Gli intervalli non sono validi",
		allowBlank: "Consenti valori vuoti"
	},
	date: { title: "Data" },
	list: {
		title: "Menu a discesa",
		add: "Aggiungi",
		options: "Opzioni",
		customOptions: "Personalizzato",
		refOptions: "Da un intervallo",
		edit: "Modifica"
	},
	checkbox: {
		title: "Casella di controllo",
		tips: "Usa valori personalizzati all'interno delle celle",
		checked: "Valore selezionato",
		unchecked: "Valore deselezionato"
	},
	alert: {
		title: "Errore",
		ok: "OK"
	},
	error: { title: "Non valido:" },
	renderMode: {
		arrow: "Freccia",
		chip: "Chip",
		text: "Testo semplice",
		label: "Stile di visualizzazione"
	},
	showTime: { label: "Mostra TimePicker" },
	permission: { dialog: { setStyleErr: "L'intervallo è protetto e non hai l'autorizzazione per impostare gli stili. Per impostare gli stili, contatta il creatore." } }
} };

//#endregion
export { locale as default };