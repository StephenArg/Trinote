//#region src/locale/es-ES.ts
const locale = { "sheets-data-validation-ui": {
	title: "Validación de datos",
	ribbon: {
		setCheckbox: "Establecer casilla de verificación",
		clearCheckbox: "Borrar casilla de verificación",
		dropdownPresetTitle: "Aplicar un preajuste:",
		editDropdown: "Editar opciones",
		clearDropdown: "Borrar lista desplegable",
		dateTime: "Fecha y hora",
		presets: {
			yes: "Sí",
			no: "No",
			notStarted: "No iniciado",
			inProgress: "En curso",
			completed: "Completado",
			option1: "Opción 1",
			option2: "Opción 2"
		}
	},
	operators: { legal: "es tipo legal" },
	validFail: { formulaError: "El rango de referencia contiene datos invisibles, ajusta el rango" },
	panel: {
		title: "Gestión de validación de datos",
		addTitle: "Crear nueva validación de datos",
		removeAll: "Eliminar todo",
		add: "Añadir regla",
		range: "Rangos",
		type: "Tipo",
		options: "Opciones avanzadas",
		operator: "Operador",
		removeRule: "Eliminar",
		done: "Hecho",
		formulaPlaceholder: "Por favor, introduce valor o fórmula",
		valuePlaceholder: "Por favor, introduce valor",
		formulaAnd: "y",
		invalid: "Inválido",
		showWarning: "Mostrar advertencia",
		rejectInput: "Rechazar entrada",
		messageInfo: "Mensaje de ayuda",
		showInfo: "Mostrar texto de ayuda para la celda seleccionada",
		rangeError: "Los rangos no son válidos",
		allowBlank: "Permitir valores en blanco"
	},
	date: { title: "Fecha" },
	list: {
		title: "Desplegable",
		add: "Añadir",
		options: "Opciones",
		customOptions: "Personalizado",
		refOptions: "De un rango",
		edit: "Editar"
	},
	checkbox: {
		title: "Casilla de verificación",
		tips: "Usa valores personalizados dentro de las celdas",
		checked: "Valor seleccionado",
		unchecked: "Valor no seleccionado"
	},
	alert: {
		title: "Error",
		ok: "OK"
	},
	error: { title: "Inválido:" },
	renderMode: {
		arrow: "Flecha",
		chip: "Chip",
		text: "Texto plano",
		label: "Estilo de visualización"
	},
	showTime: { label: "Mostrar selector de hora" },
	permission: { dialog: { setStyleErr: "El rango está protegido y no tienes permiso para establecer estilos. Para establecer estilos, contacta al creador." } }
} };

//#endregion
export { locale as default };