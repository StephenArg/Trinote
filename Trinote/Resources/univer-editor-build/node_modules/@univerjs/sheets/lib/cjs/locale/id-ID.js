
//#region src/locale/id-ID.ts
const locale = { sheets: {
	tabs: {
		sheetCopy: "(Salin{0})",
		sheet: "Lembar"
	},
	info: {
		overlappingSelections: "Tidak dapat menggunakan perintah tersebut pada pilihan yang tumpang tindih",
		acrossMergedCell: "Melintasi sel gabungan",
		partOfCell: "Hanya sebagian sel gabungan yang dipilih",
		hideSheet: "Tidak ada lembar yang terlihat setelah Anda menyembunyikan ini"
	},
	definedName: {
		nameEmpty: "Nama tidak boleh kosong",
		nameDuplicate: "Nama sudah ada",
		nameInvalid: "Nama tidak valid",
		nameSheetConflict: "Nama bertentangan dengan nama lembar",
		formulaOrRefStringEmpty: "Rumus atau string referensi tidak boleh kosong",
		nameConflict: "Nama bertentangan dengan nama fungsi",
		defaultName: "NamaTerdefinisi"
	},
	permission: { dialog: {
		autoFillErr: "Rentang dilindungi, dan Anda tidak memiliki izin untuk pengisian otomatis. Untuk menggunakan pengisian otomatis, silakan hubungi pembuatnya.",
		editErr: "Rentang dilindungi, dan Anda tidak memiliki izin edit. Untuk mengedit, silakan hubungi pembuatnya.",
		formulaErr: "Rentang atau rentang yang direferensikan dilindungi, dan Anda tidak memiliki izin edit. Untuk mengedit, silakan hubungi pembuatnya.",
		insertOrDeleteMoveRangeErr: "Rentang yang disisipkan atau dihapus berpotongan dengan rentang yang dilindungi, dan operasi ini belum didukung.",
		insertRowColErr: "Rentang dilindungi, dan Anda tidak memiliki izin untuk menyisipkan baris dan kolom. Untuk menyisipkan baris dan kolom, silakan hubungi pembuatnya.",
		moveRangeErr: "Rentang dilindungi, dan Anda tidak memiliki izin untuk memindahkan pilihan. Untuk memindahkan pilihan, silakan hubungi pembuatnya.",
		moveRowColErr: "Rentang dilindungi, dan Anda tidak memiliki izin untuk memindahkan baris dan kolom. Untuk memindahkan baris dan kolom, silakan hubungi pembuatnya.",
		operatorSheetErr: "Lembar kerja dilindungi, dan Anda tidak memiliki izin untuk mengoperasikan lembar kerja. Untuk mengoperasikan lembar kerja, silakan hubungi pembuatnya.",
		removeRowColErr: "Rentang dilindungi, dan Anda tidak memiliki izin untuk menghapus baris dan kolom. Untuk menghapus baris dan kolom, silakan hubungi pembuatnya.",
		setRowColStyleErr: "Rentang dilindungi, dan Anda tidak memiliki izin untuk mengatur gaya baris dan kolom. Untuk mengatur gaya baris dan kolom, silakan hubungi pembuatnya.",
		setStyleErr: "Rentang dilindungi, dan Anda tidak memiliki izin untuk mengatur gaya. Untuk mengatur gaya, silakan hubungi pembuatnya."
	} },
	autoFill: {
		copy: "Salin Sel",
		series: "Isi Seri",
		formatOnly: "Hanya Format",
		noFormat: "Tanpa Format"
	},
	merge: { confirm: {
		title: "Melanjutkan penggabungan hanya akan menyimpan nilai sel kiri atas, membuang nilai lainnya. Apakah Anda yakin ingin melanjutkan?",
		cancel: "Batalkan penggabungan",
		confirm: "Lanjutkan penggabungan",
		warning: "Peringatan",
		dismantleMergeCellWarning: "Ini akan menyebabkan beberapa sel gabungan terpisah. Apakah Anda ingin melanjutkan?"
	} }
} };

//#endregion
module.exports = locale;