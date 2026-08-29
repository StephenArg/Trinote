//#region src/locale/id-ID.ts
const locale = { "sheets-drawing-ui": {
	title: "Gambar",
	upload: {
		float: "Gambar Mengambang",
		cell: "Gambar Sel"
	},
	panel: { title: "Edit Gambar" },
	save: {
		title: "Simpan Gambar Sel",
		menuLabel: "Simpan Gambar Sel",
		imageCount: "Jumlah Gambar",
		fileNameConfig: "Nama File",
		useRowCol: "Gunakan Alamat Sel (A1, B2...)",
		useColumnValue: "Gunakan Nilai Kolom",
		selectColumn: "Pilih Kolom",
		cancel: "Batal",
		confirm: "Simpan",
		saving: "Menyimpan...",
		error: "Gagal menyimpan gambar sel"
	},
	"image-popup": {
		replace: "Ganti",
		delete: "Hapus",
		edit: "Edit",
		crop: "Pangkas",
		reset: "Atur Ulang Ukuran",
		flipH: "Balik Horizontal",
		flipV: "Balik Vertikal"
	},
	"update-status": {
		exceedMaxSize: "Ukuran gambar melebihi batas, batasnya adalah {0}M",
		invalidImageType: "Tipe gambar tidak valid",
		exceedMaxCount: "Hanya {0} gambar yang dapat diunggah dalam satu waktu",
		invalidImage: "Gambar tidak valid"
	},
	"drawing-anchor": {
		title: "Properti Jangkar",
		both: "Pindah dan ukur bersama sel",
		position: "Pindah tapi tidak ukur bersama sel",
		none: "Jangan pindah atau ukur bersama sel"
	},
	"cell-image": {
		pasteTitle: "Tempel sebagai gambar sel",
		pasteContent: "Menempel gambar sel akan menimpa konten yang ada di sel, lanjutkan menempel",
		pasteError: "Salin tempel gambar sel lembar kerja tidak didukung dalam unit ini"
	},
	permission: { dialog: { editErr: "Rentang ini dilindungi, dan Anda tidak memiliki izin edit. Untuk mengedit, silakan hubungi pembuatnya." } },
	shortcut: {
		"drawing-view": "Tampilan Gambar",
		"drawing-move-down": "Pindahkan Gambar ke Bawah",
		"drawing-move-up": "Pindahkan Gambar ke Atas",
		"drawing-move-left": "Pindahkan Gambar ke Kiri",
		"drawing-move-right": "Pindahkan Gambar ke Kanan",
		"drawing-delete": "Hapus Gambar"
	}
} };

//#endregion
export { locale as default };