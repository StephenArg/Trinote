//#region src/locale/pt-BR.ts
const locale = { "sheets-data-validation-ui": {
	title: "Validação de dados",
	ribbon: {
		setCheckbox: "Definir caixa de seleção",
		clearCheckbox: "Limpar caixa de seleção",
		dropdownPresetTitle: "Aplicar predefinição:",
		editDropdown: "Editar opções",
		clearDropdown: "Limpar lista suspensa",
		dateTime: "Data e hora",
		presets: {
			yes: "Sim",
			no: "Não",
			notStarted: "Não iniciado",
			inProgress: "Em andamento",
			completed: "Concluído",
			option1: "Opção 1",
			option2: "Opção 2"
		}
	},
	operators: { legal: "é tipo válido" },
	validFail: { formulaError: "O intervalo de referência contém dados invisíveis, ajuste o intervalo" },
	panel: {
		title: "Gerenciamento de validação de dados",
		addTitle: "Criar nova validação de dados",
		removeAll: "Remover tudo",
		add: "Adicionar regra",
		range: "Intervalos",
		type: "Tipo",
		options: "Opções avançadas",
		operator: "Operador",
		removeRule: "Remover",
		done: "Concluir",
		formulaPlaceholder: "Insira um valor ou fórmula",
		valuePlaceholder: "Insira um valor",
		formulaAnd: "e",
		invalid: "Inválido",
		showWarning: "Mostrar aviso",
		rejectInput: "Rejeitar entrada",
		messageInfo: "Mensagem de ajuda",
		showInfo: "Mostrar texto de ajuda para uma célula selecionada",
		rangeError: "Os intervalos não são válidos",
		allowBlank: "Permitir valores em branco"
	},
	date: { title: "Data" },
	list: {
		title: "Lista suspensa",
		add: "Adicionar",
		options: "Opções",
		customOptions: "Personalizado",
		refOptions: "De um intervalo",
		edit: "Editar"
	},
	checkbox: {
		title: "Caixa de seleção",
		tips: "Use valores personalizados dentro das células",
		checked: "Valor selecionado",
		unchecked: "Valor não selecionado"
	},
	alert: {
		title: "Erro",
		ok: "OK"
	},
	error: { title: "Inválido:" },
	renderMode: {
		arrow: "Seta",
		chip: "Chip",
		text: "Texto simples",
		label: "Estilo de exibição"
	},
	showTime: { label: "Mostrar seletor de hora" },
	permission: { dialog: { setStyleErr: "O intervalo está protegido e você não tem permissão para definir estilos. Para definir estilos, entre em contato com o criador." } }
} };

//#endregion
export { locale as default };