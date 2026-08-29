//#region src/locale/ar-SA.ts
const locale = { "sheets-drawing-ui": {
	title: "صورة",
	upload: {
		float: "صورة عائمة",
		cell: "صورة خلية"
	},
	panel: { title: "تحرير الصورة" },
	save: {
		title: "حفظ صور الخلايا",
		menuLabel: "حفظ صور الخلايا",
		imageCount: "عدد الصور",
		fileNameConfig: "اسم الملف",
		useRowCol: "استخدام عنوان الخلية (A1، B2...)",
		useColumnValue: "استخدام قيمة العمود",
		selectColumn: "تحديد العمود",
		cancel: "إلغاء",
		confirm: "حفظ",
		saving: "جارٍ الحفظ...",
		error: "فشل في حفظ صور الخلايا"
	},
	"image-popup": {
		replace: "استبدال",
		delete: "حذف",
		edit: "تحرير",
		crop: "قص",
		reset: "إعادة تعيين الحجم",
		flipH: "قلب أفقي",
		flipV: "قلب عمودي"
	},
	"update-status": {
		exceedMaxSize: "حجم الصورة يتجاوز الحد، الحد هو {0}م",
		invalidImageType: "نوع الصورة غير صالح",
		exceedMaxCount: "يمكن رفع {0} صور فقط في المرة الواحدة",
		invalidImage: "صورة غير صالحة"
	},
	"drawing-anchor": {
		title: "خصائص المرساة",
		both: "النقل والتحجيم مع الخلايا",
		position: "النقل دون التحجيم مع الخلايا",
		none: "عدم النقل أو التحجيم مع الخلايا"
	},
	"cell-image": {
		pasteTitle: "لصق كصورة خلية",
		pasteContent: "سيؤدي لصق صورة خلية إلى استبدال المحتوى الموجود في الخلية، هل تريد المتابعة؟",
		pasteError: "نسخ ولصق صورة خلية الورقة غير مدعوم في هذه الوحدة"
	},
	permission: { dialog: { editErr: "النطاق محمي، وليس لديك إذن التحرير. للتحرير، يرجى التواصل مع المنشئ." } },
	shortcut: {
		"drawing-view": "عرض الرسم",
		"drawing-move-down": "نقل الرسم لأسفل",
		"drawing-move-up": "نقل الرسم لأعلى",
		"drawing-move-left": "نقل الرسم لليسار",
		"drawing-move-right": "نقل الرسم لليمين",
		"drawing-delete": "حذف الرسم"
	}
} };

//#endregion
export { locale as default };