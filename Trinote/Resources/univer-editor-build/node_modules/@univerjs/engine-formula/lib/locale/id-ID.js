//#region src/locale/function-list/array/id-ID.ts
const locale$15 = {
	ARRAY_CONSTRAIN: {
		description: "Membatasi hasil array ke ukuran yang ditentukan.",
		abstract: "Membatasi hasil array ke ukuran yang ditentukan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.google.com/docs/answer/3267036?hl=id"
		}],
		functionParameter: {
			inputRange: {
				name: "rentang_input",
				detail: "Rentang yang akan dibatasi."
			},
			numRows: {
				name: "jumlah_baris",
				detail: "Jumlah baris yang harus dimuat dalam hasil."
			},
			numCols: {
				name: "jumlah_kolom",
				detail: "Jumlah kolom yang harus dimuat dalam hasil."
			}
		}
	},
	FLATTEN: {
		description: "Meratakan semua nilai dari satu atau beberapa rentang menjadi satu kolom.",
		abstract: "Meratakan semua nilai dari satu atau beberapa rentang menjadi satu kolom.",
		links: [{
			title: "Petunjuk",
			url: "https://support.google.com/docs/answer/10307761?hl=id"
		}],
		functionParameter: {
			range1: {
				name: "rentang1",
				detail: "Rentang pertama yang akan diratakan."
			},
			range2: {
				name: "rentang2",
				detail: "[opsional, dapat diulang] Rentang tambahan yang akan diratakan."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/compatibility/id-ID.ts
const locale$14 = {
	BETADIST: {
		description: "Mengembalikan fungsi kerapatan probabilitas beta kumulatif. Distribusi beta umumnya digunakan untuk mengkaji variasi dalam persentase sesuatu lintas sampel, seperti pecahan hari yang dihabiskan orang untuk menonton televisi.",
		abstract: "Mengembalikan fungsi kerapatan probabilitas beta kumulatif. Distribusi beta umumnya digunakan untuk mengkaji variasi dalam persentase sesuatu lintas sampel, seperti pecahan hari yang dihabiskan orang untuk menonton televisi.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/betadist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Diperlukan. Nilai antara A dan B untuk mengevaluasi fungsi."
			},
			alpha: {
				name: "alpha",
				detail: "Diperlukan. Parameter distribusi."
			},
			beta: {
				name: "beta",
				detail: "Diperlukan. Parameter distribusi."
			},
			A: {
				name: "A",
				detail: "Batas bawah pada interval x."
			},
			B: {
				name: "B",
				detail: "Opsional. Batas atas pada interval x."
			}
		}
	},
	BETAINV: {
		description: "Mengembalikan inversi fungsi kerapatan probabilitas beta kumulatif untuk distribusi beta yang ditentukan. Yakni, jika probabilitas = BETADIST(x,...), maka BETAINV(probabilitas,...) = x. Distribusi beta dapat digunakan dalam perencanaan proyek untuk membuat model waktu penyelesaian yang mungkin dengan waktu penyelesaian yang diharapkan dan variabilitas.",
		abstract: "Mengembalikan inversi fungsi kerapatan probabilitas beta kumulatif untuk distribusi beta yang ditentukan. Yakni, jika probabilitas = BETADIST(x,...), maka BETAINV(probabilitas,...) = x. Distribusi beta dapat digunakan dalam perencanaan proyek untuk membuat model waktu penyelesaian yang mungkin dengan waktu penyelesaian yang diharapkan dan variabilitas.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/betainv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Diperlukan. Probabilitas yang dikaitkan dengan distribusi beta."
			},
			alpha: {
				name: "alpha",
				detail: "Diperlukan. Parameter distribusi."
			},
			beta: {
				name: "beta",
				detail: "Diperlukan. Parameter terhadap distribusi."
			},
			A: {
				name: "A",
				detail: "Batas bawah pada interval x."
			},
			B: {
				name: "B",
				detail: "Opsional. Batas atas pada interval x."
			}
		}
	},
	BINOMDIST: {
		description: "Mengembalikan probabilitas distribusi binomial individual. Gunakan BINOMDIST dalam soal dengan angka uji atau percobaan tetap, ketika hasil percobaan hanya berhasil atau gagal, ketika percobaan bersifat independen, dan ketika probabilitas keberhasilan adalah konstan selama eksperimen tersebut. Misalnya, BINOMDIST dapat menghitung probabilitas bahwa dua dari tiga bayi yang lahir berikutnya adalah laki-laki.",
		abstract: "Mengembalikan probabilitas distribusi binomial individual. Gunakan BINOMDIST dalam soal dengan angka uji atau percobaan tetap, ketika hasil percobaan hanya berhasil atau gagal, ketika percobaan bersifat independen, dan ketika probabilitas keberhasilan adalah konstan selama eksperimen tersebut. Misalnya, BINOMDIST dapat menghitung probabilitas bahwa dua dari tiga bayi yang lahir berikutnya adalah laki-laki.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/binomdist-function"
		}],
		functionParameter: {
			numberS: {
				name: "number_s",
				detail: "Diperlukan. Jumlah keberhasilan dalam percobaan."
			},
			trials: {
				name: "trials",
				detail: "Diperlukan. Jumlah percobaan independen."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Diperlukan. Probabilitas keberhasilan pada setiap percobaan."
			},
			cumulative: {
				name: "cumulative",
				detail: "Diperlukan. Nilai logika yang menentukan formulir fungsi. Jika cumulative adalah TRUE, maka BINOMDIST mengembalikan fungsi distribusi kumulatif, yakni probabilitas bahwa paling banyak terdapat number_s keberhasilan; jika FALSE, mengembalikan fungsi massa probabilitas, yakni probabilitas bahwa terdapat number_s keberhasilan."
			}
		}
	},
	CHIDIST: {
		description: "Mengembalikan probabilitas arah kanan distribusi khi-kuadrat. Distribusi χ2 dikaitkan dengan uji χ2. Gunakan uji χ2 untuk membandingkan nilai yang diamati dan yang diharapkan. Misalnya, eksperimen genetik mungkin membuat hipotesis bahwa generasi tumbuhan berikutnya akan menunjukkan kumpulan warna tertentu. Dengan membandingkan hasil yang diamati dengan hasil yang diharapkan, Anda dapat memutuskan apakah hipotesis awal Anda valid.",
		abstract: "Mengembalikan probabilitas arah kanan distribusi khi-kuadrat. Distribusi χ2 dikaitkan dengan uji χ2. Gunakan uji χ2 untuk membandingkan nilai yang diamati dan yang diharapkan. Misalnya, eksperimen genetik mungkin membuat hipotesis bahwa generasi tumbuhan berikutnya akan menunjukkan kumpulan warna tertentu. Dengan membandingkan hasil yang diamati dengan hasil yang diharapkan, Anda dapat memutuskan apakah hipotesis awal Anda valid.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/chidist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Diperlukan. Nilai yang ingin digunakan untuk mengevaluasi distribusi."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Diperlukan. Angka derajat kebebasan."
			}
		}
	},
	CHIINV: {
		description: "Mengembalikan inversi probabilitas arah kanan distribusi khi-kuadrat. Jika probabilitas = CHIDIST(x,...), maka CHIINV(probabilitas,...) = x. Gunakan fungsi ini untuk membandingkan hasil yang diamati dengan hasil yang diharapkan untuk memutuskan apakah hipotesis awal Anda valid.",
		abstract: "Mengembalikan inversi probabilitas arah kanan distribusi khi-kuadrat. Jika probabilitas = CHIDIST(x,...), maka CHIINV(probabilitas,...) = x. Gunakan fungsi ini untuk membandingkan hasil yang diamati dengan hasil yang diharapkan untuk memutuskan apakah hipotesis awal Anda valid.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/chiinv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Diperlukan. Probabilitas yang dikaitkan dengan distribusi khi-kuadrat."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Diperlukan. Angka derajat kebebasan."
			}
		}
	},
	CHITEST: {
		description: "Mengembalikan uji untuk independensi. CHITEST mengembalikan nilai dari distribusi khi kuadrat (χ2) untuk statistik dan derajat kebebasan yang tepat. Anda dapat menggunakan uji χ2 untuk menentukan apakah hasil yang dihipotesis diverifikasi oleh eksperimen.",
		abstract: "Mengembalikan uji untuk independensi. CHITEST mengembalikan nilai dari distribusi khi kuadrat (χ2) untuk statistik dan derajat kebebasan yang tepat. Anda dapat menggunakan uji χ2 untuk menentukan apakah hasil yang dihipotesis diverifikasi oleh eksperimen.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/chitest-function"
		}],
		functionParameter: {
			actualRange: {
				name: "actual_range",
				detail: "Diperlukan. Rentang data yang berisi observasi untuk menguji nilai-nilai yang diharapkan."
			},
			expectedRange: {
				name: "expected_range",
				detail: "Diperlukan. Rentang data yang berisi rasio produk dari total baris dan total kolom dengan total keseluruhan."
			}
		}
	},
	CONFIDENCE: {
		description: "Mengembalikan interval kepercayaan untuk rata-rata populasi, menggunakan distribusi normal.",
		abstract: "Mengembalikan interval kepercayaan untuk rata-rata populasi, menggunakan distribusi normal.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/confidence-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "Diperlukan. Tingkat signifikansi yang digunakan untuk menghitung tingkat kepercayaan. Tingkat kepercayaan sama dengan 100*(1 - alpha)%, atau dengan kata lain, alpha dari 0,05 menunjukkan tingkat kepercayaan 95 persen."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Diperlukan. Simpangan baku populasi untuk rentang data tersebut dan diasumsikan telah diketahui."
			},
			size: {
				name: "size",
				detail: "Diperlukan. Ukuran sampel."
			}
		}
	},
	COVAR: {
		description: "Mengembalikan kovarians, rata-rata produk simpangan untuk setiap pasangan titik data dalam dua rangkaian data.",
		abstract: "Mengembalikan kovarians, rata-rata produk simpangan untuk setiap pasangan titik data dalam dua rangkaian data.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/covar-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Diperlukan. Rentang sel pertama bilangan bulat."
			},
			array2: {
				name: "array2",
				detail: "Diperlukan. Rentang sel kedua bilangan bulat."
			}
		}
	},
	CRITBINOM: {
		description: "Mengembalikan nilai terkecil di mana distribusi binomial kumulatifnya lebih besar dari atau sama dengan nilai kriteria. Gunakan fungsi ini untuk aplikasi jaminan kualitas. Misalnya, gunakan CRITBINOM untuk menentukan angka terbesar dari komponen-komponen rusak yang diperbolehkan untuk dilepas dari jalur perakitan yang dijalankan tanpa menolak keseluruhan rangkaian.",
		abstract: "Mengembalikan nilai terkecil di mana distribusi binomial kumulatifnya lebih besar dari atau sama dengan nilai kriteria. Gunakan fungsi ini untuk aplikasi jaminan kualitas. Misalnya, gunakan CRITBINOM untuk menentukan angka terbesar dari komponen-komponen rusak yang diperbolehkan untuk dilepas dari jalur perakitan yang dijalankan tanpa menolak keseluruhan rangkaian.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/critbinom-function"
		}],
		functionParameter: {
			trials: {
				name: "trials",
				detail: "Diperlukan. Jumlah percobaan Bernoulli."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Diperlukan. Probabilitas keberhasilan pada setiap percobaan."
			},
			alpha: {
				name: "alpha",
				detail: "Diperlukan. Nilai kriteria."
			}
		}
	},
	EXPONDIST: {
		description: "Mengembalikan distribusi eksponensial. Gunakan EXPONDIST untuk membuat model waktu antara peristiwa, seperti berapa lama waktu yang diperlukan anjungan tunai mandiri (ATM) untuk mengeluarkan uang tunai. Misalnya, Anda dapat menggunakan EXPONDIST untuk menetapkan probabilitas bahwa proses itu memerlukan paling lama 1 menit.",
		abstract: "Mengembalikan distribusi eksponensial. Gunakan EXPONDIST untuk membuat model waktu antara peristiwa, seperti berapa lama waktu yang diperlukan anjungan tunai mandiri (ATM) untuk mengeluarkan uang tunai. Misalnya, Anda dapat menggunakan EXPONDIST untuk menetapkan probabilitas bahwa proses itu memerlukan paling lama 1 menit.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/expondist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Diperlukan. Nilai fungsi."
			},
			lambda: {
				name: "lambda",
				detail: "Diperlukan. Nilai parameter."
			},
			cumulative: {
				name: "cumulative",
				detail: "Diperlukan. Nilai logika yang menunjukkan formulir fungsi eksponensial mana yang akan diberikan. Jika cumulative adalah TRUE, EXPONDIST akan mengembalikan fungsi distribusi kumulatif; jika FALSE, mengembalikan fungsi kerapatan probabilitas."
			}
		}
	},
	FDIST: {
		description: "Mengembalikan distribusi probabilitas F (arah kanan) (derajat keragaman) untuk dua unit data. Anda dapat menggunakan fungsi ini untuk menentukan apakah dua unit data memiliki derajat keragaman berbeda. Misalnya, Anda bisa memeriksa nilai ujian laki-laki dan perempuan yang masuk sekolah menengah dan menentukan apakah keragaman pada nilai perempuan berbeda dari yang ditemukan pada laki-laki.",
		abstract: "Mengembalikan distribusi probabilitas F (arah kanan) (derajat keragaman) untuk dua unit data. Anda dapat menggunakan fungsi ini untuk menentukan apakah dua unit data memiliki derajat keragaman berbeda. Misalnya, Anda bisa memeriksa nilai ujian laki-laki dan perempuan yang masuk sekolah menengah dan menentukan apakah keragaman pada nilai perempuan berbeda dari yang ditemukan pada laki-laki.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/fdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Diperlukan. Nilai untuk mengevaluasi fungsi."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Diperlukan. Derajat kebebasan pembilang"
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Diperlukan. Derajat kebebasan penyebut."
			}
		}
	},
	FINV: {
		description: "Mengembalikan inversi distribusi probabilitas F (arah kanan). Jika p = F.FDIST(x,...), maka F.FINV(p,...) = x.",
		abstract: "Mengembalikan inversi distribusi probabilitas F (arah kanan). Jika p = F.FDIST(x,...), maka F.FINV(p,...) = x.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/finv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Diperlukan. Probabilitas yang dikaitkan dengan distribusi kumulatif F."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Diperlukan. Derajat kebebasan pembilang"
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Diperlukan. Derajat kebebasan penyebut."
			}
		}
	},
	FTEST: {
		description: "Mengembalikan hasil uji-F. Uji-F mengembalikan probabilitas dua sisi bahwa varians di array1 dan array2 tidak berbeda secara signifikan. Gunakan fungsi ini untuk menentukan apakah kedua sampel memiliki varians yang berbeda. Misalnya, dengan adanya nilai ujian dari sekolah negeri dan swasta, Anda dapat menguji apakah sekolah-sekolah tersebut memiliki tingkat nilai ujian yang berbeda.",
		abstract: "Mengembalikan hasil uji-F. Uji-F mengembalikan probabilitas dua sisi bahwa varians di array1 dan array2 tidak berbeda secara signifikan. Gunakan fungsi ini untuk menentukan apakah kedua sampel memiliki varians yang berbeda. Misalnya, dengan adanya nilai ujian dari sekolah negeri dan swasta, Anda dapat menguji apakah sekolah-sekolah tersebut memiliki tingkat nilai ujian yang berbeda.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/ftest-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Diperlukan. Array atau rentang data pertama."
			},
			array2: {
				name: "array2",
				detail: "Diperlukan. Array atau rentang data kedua."
			}
		}
	},
	GAMMADIST: {
		description: "Mengembalikan distribusi gamma. Anda dapat menggunakan fungsi ini untuk mempelajari variabel yang mungkin memiliki distribusi condong. Distribusi gamma biasa digunakan dalam analisis antrian.",
		abstract: "Mengembalikan distribusi gamma. Anda dapat menggunakan fungsi ini untuk mempelajari variabel yang mungkin memiliki distribusi condong. Distribusi gamma biasa digunakan dalam analisis antrian.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/gammadist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Diperlukan. Nilai yang ingin digunakan untuk mengevaluasi distribusi."
			},
			alpha: {
				name: "alpha",
				detail: "Diperlukan. Parameter untuk distribusi."
			},
			beta: {
				name: "beta",
				detail: "Diperlukan. Parameter terhadap distribusi. Jika beta = 1, GAMMADIST mengembalikan distribusi gamma standar."
			},
			cumulative: {
				name: "cumulative",
				detail: "Diperlukan. Nilai logika yang menentukan formulir fungsi. Jika kumulatif TRUE, GAMMADIST mengembalikan fungsi distribusi kumulatif; jika FALSE, fungsi mengembalikan fungsi kerapatan probabilitas."
			}
		}
	},
	GAMMAINV: {
		description: "Mengembalikan inversi dari distribusi kumulatif gamma. Jika p = GAMMADIST(x,...), maka GAMMAINV(p,...) = x. Anda dapat menggunakan fungsi ini untuk mempelajari variabel yang distribusinya mungkin condong.",
		abstract: "Mengembalikan inversi dari distribusi kumulatif gamma. Jika p = GAMMADIST(x,...), maka GAMMAINV(p,...) = x. Anda dapat menggunakan fungsi ini untuk mempelajari variabel yang distribusinya mungkin condong.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/gammainv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Diperlukan. Probabilitas terkait dengan distribusi gamma."
			},
			alpha: {
				name: "alpha",
				detail: "Diperlukan. Parameter untuk distribusi."
			},
			beta: {
				name: "beta",
				detail: "Diperlukan. Parameter terhadap distribusi. Jika beta = 1, GAMMAINV mengembalikan distribusi gamma standar."
			}
		}
	},
	HYPGEOMDIST: {
		description: "Mengembalikan distribusi hipergeometrik. HYPGEOMDIST mengembalikan probabilitas sejumlah sampel keberhasilan tertentu, ukuran sampel tertentu, keberhasilan populasi, dan ukuran populasi. Gunakan HYPGEOMDIST untuk masalah-masalah dengan populasi terbatas, di mana setiap observasi bisa berhasil atau gagal, dan di mana setiap subkumpulan dari ukuran tertentu dipilih dengan kemungkinan yang sama.",
		abstract: "Mengembalikan distribusi hipergeometrik. HYPGEOMDIST mengembalikan probabilitas sejumlah sampel keberhasilan tertentu, ukuran sampel tertentu, keberhasilan populasi, dan ukuran populasi. Gunakan HYPGEOMDIST untuk masalah-masalah dengan populasi terbatas, di mana setiap observasi bisa berhasil atau gagal, dan di mana setiap subkumpulan dari ukuran tertentu dipilih dengan kemungkinan yang sama.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/hypgeomdist-function"
		}],
		functionParameter: {
			sampleS: {
				name: "sample_s",
				detail: "Diperlukan. Jumlah keberhasilan di dalam sampel."
			},
			numberSample: {
				name: "number_sample",
				detail: "Diperlukan. Ukuran sampel."
			},
			populationS: {
				name: "population_s",
				detail: "Diperlukan. Jumlah keberhasilan di dalam populasi."
			},
			numberPop: {
				name: "number_pop",
				detail: "Diperlukan. Ukuran populasi."
			}
		}
	},
	LOGINV: {
		description: "Mengembalikan inversi dari fungsi distribusi kumulatif lognormal x, di mana ln(x) normalnya didistribusikan dengan parameter mean dan standard_dev. Jika p = LOGNORMDIST(x,...) maka LOGINV(p,...) = x.",
		abstract: "Mengembalikan inversi dari fungsi distribusi kumulatif lognormal x, di mana ln(x) normalnya didistribusikan dengan parameter mean dan standard_dev. Jika p = LOGNORMDIST(x,...) maka LOGINV(p,...) = x.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/loginv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Diperlukan. Sebuah probabilitas yang dikaitkan dengan distribusi lognormal."
			},
			mean: {
				name: "mean",
				detail: "Diperlukan. Rata-rata dari ln(x)."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Diperlukan. Simpangan baku dari ln(x)."
			}
		}
	},
	LOGNORMDIST: {
		description: "Mengembalikan distribusi kumulatif lognormal x, di mana ln(x) normalnya didistribusikan dengan parameter mean dan standard_dev. Gunakan fungsi ini untuk menganalisis data yang telah ditransformasi secara logaritmik.",
		abstract: "Mengembalikan distribusi kumulatif lognormal x, di mana ln(x) normalnya didistribusikan dengan parameter mean dan standard_dev. Gunakan fungsi ini untuk menganalisis data yang telah ditransformasi secara logaritmik.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/lognormdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Diperlukan. Nilai untuk mengevaluasi fungsi."
			},
			mean: {
				name: "mean",
				detail: "Diperlukan. Rata-rata dari ln(x)."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Diperlukan. Simpangan baku dari ln(x)."
			}
		}
	},
	MODE: {
		description: "Katakanlah Anda ingin mengetahui jumlah spesies burung yang paling umum terlihat dalam sampel jumlah burung di lahan basah kritis selama periode waktu 30 tahun, atau Anda ingin mencari tahu jumlah panggilan telepon yang paling sering terjadi di pusat dukungan telepon selama jam sibuk. Untuk menghitung mode sekelompok angka, gunakan fungsi MODE .",
		abstract: "Katakanlah Anda ingin mengetahui jumlah spesies burung yang paling umum terlihat dalam sampel jumlah burung di lahan basah kritis selama periode waktu 30 tahun, atau Anda ingin mencari tahu jumlah panggilan telepon yang paling sering terjadi di pusat dukungan telepon selama jam sibuk. Untuk menghitung mode sekelompok angka, gunakan fungsi MODE .",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/mode-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Diperlukan. Argumen angka pertama yang ingin Anda hitung modusnya."
			},
			number2: {
				name: "number2",
				detail: "Opsional. Argumen angka 2 sampai 255 yang ingin Anda hitung modusnya. Anda juga bisa menggunakan array tunggal atau array referensi ketimbang argumen yang dipisahkan oleh koma."
			}
		}
	},
	NEGBINOMDIST: {
		description: "Mengembalikan distribusi binomial negatif. NEGBINOMDIST mengembalikan probabilitas bahwa akan ada kegagalan number_f sebelum keberhasilan number_s-th, ketika konstanta probabilitas keberhasilan adalah probability_s. Fungsi ini mirip dengan distribusi binomial, hanya saja jumlah keberhasilannya tetap, dan jumlah percobaannya bervariasi. Seperti binomial, percobaan diasumsikan bebas.",
		abstract: "Mengembalikan distribusi binomial negatif. NEGBINOMDIST mengembalikan probabilitas bahwa akan ada kegagalan number_f sebelum keberhasilan number_s-th, ketika konstanta probabilitas keberhasilan adalah probability_s. Fungsi ini mirip dengan distribusi binomial, hanya saja jumlah keberhasilannya tetap, dan jumlah percobaannya bervariasi. Seperti binomial, percobaan diasumsikan bebas.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/negbinomdist-function"
		}],
		functionParameter: {
			numberF: {
				name: "number_f",
				detail: "Diperlukan. Jumlah kegagalan."
			},
			numberS: {
				name: "number_s",
				detail: "Diperlukan. Jumlah ambang batas keberhasilan."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Diperlukan. Probabilitas keberhasilan."
			}
		}
	},
	NORMDIST: {
		description: "Fungsi NORMDIST mengembalikan distribusi normal untuk rata-rata dan simpangan baku yang ditentukan. Fungsi ini memiliki berbagai aplikasi dalam statistik, termasuk pengujian hipotesis.",
		abstract: "Fungsi NORMDIST mengembalikan distribusi normal untuk rata-rata dan simpangan baku yang ditentukan. Fungsi ini memiliki berbagai aplikasi dalam statistik, termasuk pengujian hipotesis.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/normdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Diperlukan. Nilai yang Anda inginkan distribusinya"
			},
			mean: {
				name: "mean",
				detail: "Diperlukan. Rata-rata aritmetika distribusi"
			},
			standardDev: {
				name: "standard_dev",
				detail: "Diperlukan. Simpangan baku distribusi"
			},
			cumulative: {
				name: "cumulative",
				detail: "Diperlukan. Nilai logika yang menentukan formulir fungsi. Jika kumulatif TRUE, maka NORMDIST mengembalikan fungsi distribusi kumulatif; jika kumulatif FALSE, maka mengembalikan fungsi massa probabilitas."
			}
		}
	},
	NORMINV: {
		description: "Mengembalikan inversi distribusi kumulatif normal untuk rata-rata dan simpangan baku tertentu.",
		abstract: "Mengembalikan inversi distribusi kumulatif normal untuk rata-rata dan simpangan baku tertentu.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/norminv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Diperlukan. Sebuah probabilitas yang dikaitkan dengan distribusi normal."
			},
			mean: {
				name: "mean",
				detail: "Diperlukan. Rata-rata aritmetika distribusi."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Diperlukan. Simpangan baku distribusi."
			}
		}
	},
	NORMSDIST: {
		description: "Mengembalikan fungsi distribusi kumulatif normal standar. Distribusi memiliki rata-rata 0 (nol) dan simpangan baku satu. Gunakan fungsi ini di tempat tabel area kurva normal standar.",
		abstract: "Mengembalikan fungsi distribusi kumulatif normal standar. Distribusi memiliki rata-rata 0 (nol) dan simpangan baku satu. Gunakan fungsi ini di tempat tabel area kurva normal standar.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/normsdist-function"
		}],
		functionParameter: { z: {
			name: "z",
			detail: "Diperlukan. Nilai yang Anda inginkan distribusinya."
		} }
	},
	NORMSINV: {
		description: "Mengembalikan inversi dari distribusi kumulatif normal standar. Distribusi memiliki rata-rata nol dan simpangan baku dari satu.",
		abstract: "Mengembalikan inversi dari distribusi kumulatif normal standar. Distribusi memiliki rata-rata nol dan simpangan baku dari satu.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/normsinv-function"
		}],
		functionParameter: { probability: {
			name: "probability",
			detail: "Diperlukan. Sebuah probabilitas yang dikaitkan dengan distribusi normal."
		} }
	},
	PERCENTILE: {
		description: "Mengembalikan persentil nilai ke-k dalam satu rentang. Anda bisa menggunakan fungsi ini untuk menghitung ambang penerimaan. Misalnya, Anda dapat memutuskan untuk memeriksa para kandidat yang mencapai skor di atas persentil ke-90.",
		abstract: "Mengembalikan persentil nilai ke-k dalam satu rentang. Anda bisa menggunakan fungsi ini untuk menghitung ambang penerimaan. Misalnya, Anda dapat memutuskan untuk memeriksa para kandidat yang mencapai skor di atas persentil ke-90.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/percentile-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Diperlukan. Array atau rentang data yang menentukan posisi relatif."
			},
			k: {
				name: "k",
				detail: "Diperlukan. Nilai persentil dalam rentang 0..1, inklusif."
			}
		}
	},
	PERCENTRANK: {
		description: "Fungsi PERCENTRANK mengembalikan peringkat nilai dalam kumpulan data sebagai persentase dari kumpulan data -- pada dasarnya, posisi relatif dari sebuah nilai di dalam seluruh kumpulan data. Misalnya, Anda dapat menggunakan PERCENTRANK untuk menentukan posisi skor uji individu di antara bidang semua skor untuk ujian yang sama.",
		abstract: "Fungsi PERCENTRANK mengembalikan peringkat nilai dalam kumpulan data sebagai persentase dari kumpulan data -- pada dasarnya, posisi relatif dari sebuah nilai di dalam seluruh kumpulan data. Misalnya, Anda dapat menggunakan PERCENTRANK untuk menentukan posisi skor uji individu di antara bidang semua skor untuk ujian yang sama.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/percentrank-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Diperlukan. Rentang data (atau array yang ditentukan sebelumnya) dari nilai numerik di mana peringkat persen ditentukan."
			},
			x: {
				name: "x",
				detail: "Diperlukan. Nilai yang ingin Anda ketahui peringkatnya dalam array."
			},
			significance: {
				name: "significance",
				detail: "Opsional. Nilai yang menentukan jumlah digit signifikan untuk nilai persentase yang dikembalikan. Jika tidak disertakan, PERCENTRANK menggunakan tiga angka (0.xxx)."
			}
		}
	},
	POISSON: {
		description: "Mengembalikan distribusi Poisson. Aplikasi umum distribusi Poisson adalah meramalkan sejumlah peristiwa selama waktu tertentu, seperti jumlah mobil yang datang di sebuah gerbang tol dalam 1 menit.",
		abstract: "Mengembalikan distribusi Poisson. Aplikasi umum distribusi Poisson adalah meramalkan sejumlah peristiwa selama waktu tertentu, seperti jumlah mobil yang datang di sebuah gerbang tol dalam 1 menit.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/poisson-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Diperlukan. Jumlah peristiwa."
			},
			mean: {
				name: "mean",
				detail: "Diperlukan. Nilai numerik yang diinginkan."
			},
			cumulative: {
				name: "cumulative",
				detail: "Diperlukan. Nilai logika yang menentukan bentuk distribusi probabilitas yang dikembalikan. Jika kumulatif TRUE, maka POISSON mengembalikan probabilitas kumulatif Poisson bahwa sejumlah kejadian acak akan terjadi antara nol dan x inklusif; jika FALSE, maka mengembalikan fungsi massa probabilitas Poisson bahwa peristiwa yang terjadi akan tepat sejumlah x."
			}
		}
	},
	QUARTILE: {
		description: "Mengembalikan kuartil dari sekelompok data. Kuartil sering digunakan dalam data penjualan dan survei untuk membagi populasi ke dalam berbagai kelompok. Misalnya, Anda dapat menggunakan QUARTILE untuk menemukan 25 persen pendapatan teratas dalam sebuah populasi.",
		abstract: "Mengembalikan kuartil dari sekelompok data. Kuartil sering digunakan dalam data penjualan dan survei untuk membagi populasi ke dalam berbagai kelompok. Misalnya, Anda dapat menggunakan QUARTILE untuk menemukan 25 persen pendapatan teratas dalam sebuah populasi.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/quartile-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Diperlukan. Array atau rentang sel nilai numerik yang ingin Anda cari nilai kuartilnya."
			},
			quart: {
				name: "quart",
				detail: "Diperlukan. Menunjukkan nilai mana yang harus dikembalikan."
			}
		}
	},
	RANK: {
		description: "Mengembalikan peringkat sebuah angka dalam satu daftar angka. Peringkat sebuah angka adalah besarnya angka tersebut yang relatif terhadap nilai lain di daftar. (Jika Anda mengurutkan daftar, peringkat sebuah angka adalah posisinya.)",
		abstract: "Mengembalikan peringkat sebuah angka dalam satu daftar angka. Peringkat sebuah angka adalah besarnya angka tersebut yang relatif terhadap nilai lain di daftar. (Jika Anda mengurutkan daftar, peringkat sebuah angka adalah posisinya.)",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/rank-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. Angka yang peringkatnya ingin Anda temukan."
			},
			ref: {
				name: "ref",
				detail: "Diperlukan. Referensi ke daftar angka. Nilai nonnumerik di ref diabaikan."
			},
			order: {
				name: "order",
				detail: "Opsional. Angka yang menentukan cara menetapkan peringkat. Jika urutan adalah 0 (nol) atau dihilangkan, Microsoft Excel menetapkan peringkat angka seolah-olah ref adalah daftar yang diurutkan dalam urutan turun. Jika urutan adalah nilai bukan nol, Microsoft Excel menetapkan peringkat seolah-olah ref adalah daftar yang diurutkan dalam urutan naik."
			}
		}
	},
	STDEV: {
		description: "Memperkirakan simpangan baku berdasarkan satu sampel. Simpangan baku adalah pengukuran seberapa lebar suatu nilai tersebar dari nilai rata-rata (nilai tengahnya).",
		abstract: "Memperkirakan simpangan baku berdasarkan satu sampel. Simpangan baku adalah pengukuran seberapa lebar suatu nilai tersebar dari nilai rata-rata (nilai tengahnya).",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/stdev-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Diperlukan. Argumen angka pertama yang berkaitan dengan sampel populasi."
			},
			number2: {
				name: "number2",
				detail: "Opsional. Argumen angka 2 sampai 255 berkaitan dengan satu sampel populasi. Anda juga bisa menggunakan array tunggal atau array referensi ketimbang argumen yang dipisahkan oleh koma."
			}
		}
	},
	STDEVP: {
		description: "Menghitung simpangan baku berdasarkan seluruh populasi yang diberikan sebagai argumen. Simpangan baku adalah pengukuran seberapa lebar suatu nilai tersebar dari nilai rata-rata (nilai tengahnya).",
		abstract: "Menghitung simpangan baku berdasarkan seluruh populasi yang diberikan sebagai argumen. Simpangan baku adalah pengukuran seberapa lebar suatu nilai tersebar dari nilai rata-rata (nilai tengahnya).",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/stdevp-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Diperlukan. Argumen angka pertama yang bersesuaian dengan populasi."
			},
			number2: {
				name: "number2",
				detail: "Opsional. Argumen angka 2 sampai 255 terkait dengan satu populasi. Anda juga bisa menggunakan array tunggal atau array referensi ketimbang argumen yang dipisahkan oleh koma."
			}
		}
	},
	TDIST: {
		description: "Mengembalikan Titik Persentase (probabilitas) untuk distribusi-t Student di mana nilai numerik (x) adalah nilai terhitung dari t, yang digunakan untuk menghitung Titik Persentase. Distribusi-t digunakan dalam pengujian hipotesis kumpulan data sampel kecil. Gunakan fungsi ini di tabel nilai kritis untuk distribusi-t.",
		abstract: "Mengembalikan Titik Persentase (probabilitas) untuk distribusi-t Student di mana nilai numerik (x) adalah nilai terhitung dari t, yang digunakan untuk menghitung Titik Persentase. Distribusi-t digunakan dalam pengujian hipotesis kumpulan data sampel kecil. Gunakan fungsi ini di tabel nilai kritis untuk distribusi-t.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/tdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Diperlukan. Nilai numerik yang ingin digunakan untuk mengevaluasi distribusi."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Diperlukan. Bilangan bulat yang menunjukkan angka derajat kebebasan."
			},
			tails: {
				name: "tails",
				detail: "Diperlukan. Menentukan angka arah distribusi yang dikembalikan. Jika Tails = 1, TDIST mengembalikan distribusi satu arah. Jika Tails = 2, TDIST mengembalikan distribusi dua arah."
			}
		}
	},
	TINV: {
		description: "Mengembalikan inversi dua arah dari distribusi-t Student.",
		abstract: "Mengembalikan inversi dua arah dari distribusi-t Student.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/tinv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Diperlukan. Probabilitas terkait dengan distribusi-t Student dua arah."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Diperlukan. Jumlah derajat kebebasan yang digunakan untuk mencirikan distribusi."
			}
		}
	},
	TTEST: {
		description: "Mengembalikan probabilitas terkait Uji-t Student. Gunakan TTEST untuk menentukan apakah dua sampel berasal dari dua populasi sama yang mendasari yang nilai rata-ratanya sama.",
		abstract: "Mengembalikan probabilitas terkait Uji-t Student. Gunakan TTEST untuk menentukan apakah dua sampel berasal dari dua populasi sama yang mendasari yang nilai rata-ratanya sama.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/ttest-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Diperlukan. Kumpulan data pertama."
			},
			array2: {
				name: "array2",
				detail: "Diperlukan. Kumpulan data kedua."
			},
			tails: {
				name: "tails",
				detail: "Diperlukan. Menentukan jumlah arah distribusi. Jika arah = 1, TTEST menggunakan distribusi satu arah. Jika arah = 2, TTEST menggunakan distribusi dua arah."
			},
			type: {
				name: "type",
				detail: "Diperlukan. Tipe Uji-t yang dilakukan."
			}
		}
	},
	VAR: {
		description: "Memperkirakan varians berdasarkan sampel.",
		abstract: "Memperkirakan varians berdasarkan sampel.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/var-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Diperlukan. Argumen angka pertama yang mewakili sampel populasi."
			},
			number2: {
				name: "number2",
				detail: "Opsional. Argumen angka ke-2 hingga ke-255 yang mewakili sampel populasi."
			}
		}
	},
	VARP: {
		description: "Menghitung varians berdasarkan populasi keseluruhan.",
		abstract: "Menghitung varians berdasarkan populasi keseluruhan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/varp-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Diperlukan. Argumen angka pertama yang bersesuaian dengan populasi."
			},
			number2: {
				name: "number2",
				detail: "Opsional. Argumen angka 2 sampai 255 terkait dengan satu populasi."
			}
		}
	},
	WEIBULL: {
		description: "Mengembalikan distribusi Weilbull. Gunakan distribusi ini dalam analisis keandalan, misalnya menghitung waktu rata-rata perangkat hingga gagal.",
		abstract: "Mengembalikan distribusi Weilbull. Gunakan distribusi ini dalam analisis keandalan, misalnya menghitung waktu rata-rata perangkat hingga gagal.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/weibull-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Diperlukan. Nilai untuk mengevaluasi fungsi."
			},
			alpha: {
				name: "alpha",
				detail: "Diperlukan. Parameter untuk distribusi."
			},
			beta: {
				name: "beta",
				detail: "Diperlukan. Parameter untuk distribusi."
			},
			cumulative: {
				name: "cumulative",
				detail: "Diperlukan. Menentukan format fungsi."
			}
		}
	},
	ZTEST: {
		description: "Mengembalikan nilai probabilitas satu-arah uji-z. Untuk hipotesis rata-rata populasi yang diberikan, μ0, ZTEST mengembalikan probabilitas bahwa rata-rata sampel akan lebih besar dari rata-rata pengamatan dalam kumpulan data (array) tersebut— yaitu, rata-rata sampel yang diamati.",
		abstract: "Mengembalikan nilai probabilitas satu-arah uji-z. Untuk hipotesis rata-rata populasi yang diberikan, μ0, ZTEST mengembalikan probabilitas bahwa rata-rata sampel akan lebih besar dari rata-rata pengamatan dalam kumpulan data (array) tersebut— yaitu, rata-rata sampel yang diamati.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/ztest-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Diperlukan. Array atau rentang data yang akan digunakan untuk menguji x."
			},
			x: {
				name: "x",
				detail: "Diperlukan. Nilai untuk menguji."
			},
			sigma: {
				name: "sigma",
				detail: "Opsional. Simpangan baku populasi (yang diketahui). Jika dihilangkan, maka simpangan baku sampel yang digunakan."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/cube/id-ID.ts
const locale$13 = {
	CUBEKPIMEMBER: {
		description: "Mengembalikan properti indikator kinerja utama (KPI, Key Performance Indicator) dan menampilkan nama KPI dalam sel. KPI merupakan pengukuran yang dapat dihitung, seperti laba kotor bulanan atau pergantian karyawan per kuartal, yang digunakan untuk memantau kinerja organisasi.",
		abstract: "Mengembalikan properti indikator kinerja utama (KPI, Key Performance Indicator) dan menampilkan nama KPI dalam sel. KPI merupakan pengukuran yang dapat dihitung, seperti laba kotor bulanan atau pergantian karyawan per kuartal, yang digunakan untuk memantau kinerja organisasi.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/cubekpimember-function"
		}],
		functionParameter: {
			connection: {
				name: "Koneksi",
				detail: "Diperlukan. String teks nama koneksi ke kubus."
			},
			kpiName: {
				name: "Kpi_name",
				detail: "Diperlukan. String teks nama KPI dalam kubus."
			},
			kpiProperty: {
				name: "Kpi_property",
				detail: "Diperlukan. Komponen KPI dikembalikan dan dapat berupa salah satu dari yang berikut:"
			},
			caption: {
				name: "Caption",
				detail: "Opsional. String teks alternatif yang ditampilkan dalam sel sebagai ganti kpi_name dan kpi_property."
			}
		}
	},
	CUBEMEMBER: {
		description: "Mengembalikan anggota atau rangkap dari kubus. Gunakan untuk memvalidasi bahwa anggota atau rangkap ada di dalam kubus.",
		abstract: "Mengembalikan anggota atau rangkap dari kubus. Gunakan untuk memvalidasi bahwa anggota atau rangkap ada di dalam kubus.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/cubemember-function"
		}],
		functionParameter: {
			connection: {
				name: "Koneksi",
				detail: "Diperlukan. String teks nama koneksi ke kubus."
			},
			memberExpression: {
				name: "Member_expression",
				detail: "Diperlukan. Sebuah string teks ekspresi multidimensi (MDX, multidimensional expression) yang mengevaluasi anggota unik dalam kubus. Alternatifnya, member_expression dapat berupa rangkap, yang ditentukan sebagai rentang sel atau konstanta array."
			},
			caption: {
				name: "Caption",
				detail: "Opsional. Sebuah string teks akan ditampilkan dalam sel sebagai ganti keterangan, jika ada, dari kubus. Bila rangkap dikembalikan, keterangan yang digunakan adalah keterangan untuk anggota terakhir dalam rangkap."
			}
		}
	},
	CUBEMEMBERPROPERTY: {
		description: "Fungsi CUBEMEMBERPROPERTY , salah satu fungsi Kubus di Excel, mengembalikan nilai properti anggota dari kubus. Gunakan untuk memvalidasi bahwa nama anggota ada di dalam kubus dan untuk mengembalikan properti tertentu untuk anggota tersebut.",
		abstract: "Fungsi CUBEMEMBERPROPERTY , salah satu fungsi Kubus di Excel, mengembalikan nilai properti anggota dari kubus. Gunakan untuk memvalidasi bahwa nama anggota ada di dalam kubus dan untuk mengembalikan properti tertentu untuk anggota tersebut.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/cubememberproperty-function"
		}],
		functionParameter: {
			connection: {
				name: "Koneksi",
				detail: "Diperlukan. String teks nama koneksi ke kubus."
			},
			memberExpression: {
				name: "Member_expression",
				detail: "Diperlukan. Sebuah string teks ekspresi multidimensi (MDX, multidimensional expression) dari anggota dalam kubik."
			},
			property: {
				name: "Properti",
				detail: "Diperlukan. Sebuah string teks berupa nama properti yang dikembalikan atau referensi ke sel yang berisi nama properti."
			}
		}
	},
	CUBERANKEDMEMBER: {
		description: "Mengembalikan nilai ke-n, atau rangking, anggota di dalam suatu kumpuln. Gunakan untuk mengembalikan satu atau beberapa elemen dalam sebuah kumpulan, seperti tenaga penjualan paling berprestasi atau 10 siswa terbaik.",
		abstract: "Mengembalikan nilai ke-n, atau rangking, anggota di dalam suatu kumpuln. Gunakan untuk mengembalikan satu atau beberapa elemen dalam sebuah kumpulan, seperti tenaga penjualan paling berprestasi atau 10 siswa terbaik.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/cuberankedmember-function"
		}],
		functionParameter: {
			connection: {
				name: "Koneksi",
				detail: "Diperlukan. String teks nama koneksi ke kubus."
			},
			setExpression: {
				name: "Set_expression",
				detail: "Diperlukan. String teks dari sebuah ekspresi set, seperti \"{[Item1].children}\". Set_expression juga bisa berupa fungsi CUBESET, atau referensi ke sel yang memuat fungsi CUBESET."
			},
			rank: {
				name: "Peringkat",
				detail: "Diperlukan. Bilangan bulat yang menentukan nilai teratas untuk dikembalikan. Jika peringkat berupa nilai 1, maka akan mengembalikan nilai teratas, jika peringkat berupa nilai 2, maka akan mengembalikan nilai teratas kedua, dan seterusnya. Untuk mengembalikan 5 nilai teratas, gunakan CUBERANKEDMEMBER lima kali, yang masing-masing menentukan peringkat yang berbeda, dari 1 sampai 5."
			},
			caption: {
				name: "Caption",
				detail: "Opsional. Sebuah string teks akan ditampilkan dalam sel sebagai ganti keterangan, jika ada, dari kubus."
			}
		}
	},
	CUBESET: {
		description: "Menentukan set terhitung dari anggota atau rangkap dengan mengirim ekspresi set ke kubus pada server, yang membuat set itu, lalu mengembalikan set itu ke Microsoft Excel.",
		abstract: "Menentukan set terhitung dari anggota atau rangkap dengan mengirim ekspresi set ke kubus pada server, yang membuat set itu, lalu mengembalikan set itu ke Microsoft Excel.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/cubeset-function"
		}],
		functionParameter: {
			connection: {
				name: "Koneksi",
				detail: "Diperlukan. String teks nama koneksi ke kubus."
			},
			setExpression: {
				name: "Set_expression",
				detail: "Diperlukan. String teks dari sebuah ekspresi set yang mengembalikan set anggota atau rangkap. Set_expression juga dapat menjadi referensi sel bagi sebuah rentang Excel yang memuat satu atau beberapa anggota, rangkap, atau beberapa set yang dimasukkan dalam set tersebut."
			},
			caption: {
				name: "Caption",
				detail: "Opsional. Sebuah string teks ditampilkan dalam sel sebagai ganti keterangan, jika ditentukan dari kubus."
			},
			sortOrder: {
				name: "Sort_order",
				detail: "Opsional. Tipe pengurutan, jika ada, untuk dijalankan dapat berupa salah satu dari yang berikut:"
			},
			sortBy: {
				name: "Sort_by",
				detail: "Opsional. Sebuah string teks nilai untuk mengurutkan. Misalnya, untuk mendapatkan kota dengan penjualan tertinggi, set_expression berupa serangkaian kota, dan sort_by berupa ukuran penjualan. Misalnya, untuk mendapatkan kota dengan populasi tertinggi, set_expression berupa serangkaian kota, dan sort_by berupa ukuran populasi. Jika sort_order mensyaratkan sort_by, dan sort_by dikosongkan, maka CUBESET mengembalikan pesan kesalahan #VALUE! ."
			}
		}
	},
	CUBESETCOUNT: {
		description: "Mengembalikan jumlah item dalam sebuah kumpulan.",
		abstract: "Mengembalikan jumlah item dalam sebuah kumpulan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/cubesetcount-function"
		}],
		functionParameter: { set: {
			name: "Set",
			detail: "Diperlukan. Sebuah string teks ekspresi Microsoft Excel yang mengevaluasi sebuah kumpulan yang ditentukan oleh fungsi CUBESET. Set juga bisa berupa fungsi CUBESET, atau referensi ke sel yang memuat fungsi CUBESET."
		} }
	},
	CUBEVALUE: {
		description: "Mengembalikan nilai agregat dari kubus.",
		abstract: "Mengembalikan nilai agregat dari kubus.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/cubevalue-function"
		}],
		functionParameter: {
			connection: {
				name: "Koneksi",
				detail: "Diperlukan. String teks nama koneksi ke kubus."
			},
			memberExpression: {
				name: "Member_expression",
				detail: "Opsional. Sebuah string teks ekspresi multidimensi (MDX, multidimensional expression) yang mengevaluasi anggota atau rangkap dalam kubus. Alternatifnya, member_expression dapat berupa sebuah set yang ditentukan dengan fungsi CUBESET. Gunakan member_expression sebagai pemotong untuk menentukan bagian kubus di mana nilai agregat dikembalikan. Jika tidak ada ukuran yang ditentukan dalam member_expression, maka ukuran default untuk kubus tersebut akan digunakan."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/database/id-ID.ts
const locale$12 = {
	DAVERAGE: {
		description: "Menghitung rata-rata nilai dalam bidang (kolom) rekaman dalam daftar atau database yang cocok dengan kondisi yang ditentukan.",
		abstract: "Menghitung rata-rata nilai dalam bidang (kolom) rekaman dalam daftar atau database yang cocok dengan kondisi yang ditentukan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/daverage-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "adalah rentang sel yang membentuk daftar atau database. Database adalah daftar dari data yang terkait di mana baris-baris informasi terkait adalah rekaman, dan kolom-kolom data adalah bidang. Baris pertama daftar tersebut berisi label untuk masing-masing kolom."
			},
			field: {
				name: "field",
				detail: "menunjukkan kolom mana yang digunakan dalam fungsi. Masukkan label kolom yang dimasukkan di antara dua tanda kutip ganda, seperti \"Umur\" atau \"Hasil,\" atau angka (tanpa tanda kutip) yang menyatakan posisi kolom di dalam daftar: 1 untuk kolom pertama, 2 untuk kolom kedua, dan seterusnya."
			},
			criteria: {
				name: "criteria",
				detail: "adalah rentang sel yang berisi kondisi yang Anda tentukan. Anda dapat menggunakan rentang untuk argumen kriteria, selama meliputi setidaknya satu label kolom dan setidaknya satu sel di bawah label kolom di mana Anda menentukan kondisi untuk kolom tersebut."
			}
		}
	},
	DCOUNT: {
		description: "Menghitung sel-sel yang berisi angka dalam bidang (kolom) rekaman dalam daftar atau database yang cocok dengan syarat yang ditentukan.",
		abstract: "Menghitung sel-sel yang berisi angka dalam bidang (kolom) rekaman dalam daftar atau database yang cocok dengan syarat yang ditentukan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/dcount-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Diperlukan. Rentang sel yang membentuk daftar atau database. Database adalah daftar dari data yang terkait di mana baris-baris informasi terkait adalah rekaman, dan kolom-kolom data adalah bidang. Baris pertama daftar tersebut berisi label untuk masing-masing kolom."
			},
			field: {
				name: "field",
				detail: "Diperlukan. Mengindikasikan kolom yang digunakan dalam fungsi tersebut. Masukkan label kolom yang dimasukkan di antara dua tanda kutip ganda, seperti \"Umur\" atau \"Hasil,\" atau angka (tanpa tanda kutip) yang menyatakan posisi kolom di dalam daftar: 1 untuk kolom pertama, 2 untuk kolom kedua, dan seterusnya."
			},
			criteria: {
				name: "criteria",
				detail: "Diperlukan. Rentang sel berisi kondisi yang Anda tentukan. Anda dapat menggunakan rentang untuk argumen kriteria, selama argumen meliputi setidaknya satu label kolom dan setidaknya satu sel di bawah label kolom di mana Anda menentukan kondisi untuk kolom tersebut."
			}
		}
	},
	DCOUNTA: {
		description: "Menghitung sel-sel yang tidak kosong dalam bidang (kolom) rekaman dalam daftar atau database yang cocok dengan kondisi yang Anda tentukan.",
		abstract: "Menghitung sel-sel yang tidak kosong dalam bidang (kolom) rekaman dalam daftar atau database yang cocok dengan kondisi yang Anda tentukan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/dcounta-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Diperlukan. Rentang sel yang membentuk daftar atau database. Database adalah daftar dari data yang terkait di mana baris-baris informasi terkait adalah rekaman, dan kolom-kolom data adalah bidang. Baris pertama daftar tersebut berisi label untuk masing-masing kolom."
			},
			field: {
				name: "field",
				detail: "Opsional. Mengindikasikan kolom yang digunakan dalam fungsi tersebut. Masukkan label kolom yang dimasukkan di antara dua tanda kutip ganda, seperti \"Umur\" atau \"Hasil,\" atau angka (tanpa tanda kutip) yang menyatakan posisi kolom di dalam daftar: 1 untuk kolom pertama, 2 untuk kolom kedua, dan seterusnya."
			},
			criteria: {
				name: "criteria",
				detail: "Diperlukan. Rentang sel berisi kondisi yang Anda tentukan. Anda dapat menggunakan rentang untuk argumen kriteria, selama meliputi setidaknya satu label kolom dan setidaknya satu sel di bawah label kolom di mana Anda menentukan kondisi untuk kolom tersebut."
			}
		}
	},
	DGET: {
		description: "Mengekstrak nilai tunggal dari kolom suatu daftar atau database yang cocok dengan syarat yang Anda tentukan.",
		abstract: "Mengekstrak nilai tunggal dari kolom suatu daftar atau database yang cocok dengan syarat yang Anda tentukan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/dget-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Diperlukan. Rentang sel yang membentuk daftar atau database. Database adalah daftar dari data yang terkait di mana baris-baris informasi terkait adalah rekaman, dan kolom-kolom data adalah bidang. Baris pertama daftar tersebut berisi label untuk masing-masing kolom."
			},
			field: {
				name: "field",
				detail: "Diperlukan. Mengindikasikan kolom yang digunakan dalam fungsi tersebut. Masukkan label kolom yang dimasukkan di antara dua tanda kutip ganda, seperti \"Umur\" atau \"Hasil,\" atau angka (tanpa tanda kutip) yang menyatakan posisi kolom di dalam daftar: 1 untuk kolom pertama, 2 untuk kolom kedua, dan seterusnya."
			},
			criteria: {
				name: "criteria",
				detail: "Diperlukan. Rentang sel berisi kondisi yang Anda tentukan. Anda dapat menggunakan rentang untuk argumen kriteria, selama meliputi setidaknya satu label kolom dan setidaknya satu sel di bawah label kolom di mana Anda menentukan kondisi untuk kolom tersebut."
			}
		}
	},
	DMAX: {
		description: "Mengembalikan angka terbesar dalam bidang (kolom) rekaman dalam daftar atau database yang cocok dengan syarat yang ditentukan.",
		abstract: "Mengembalikan angka terbesar dalam bidang (kolom) rekaman dalam daftar atau database yang cocok dengan syarat yang ditentukan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/dmax-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Diperlukan. Rentang sel yang membentuk daftar atau database. Database adalah daftar dari data yang terkait di mana baris-baris informasi terkait adalah rekaman, dan kolom-kolom data adalah bidang. Baris pertama daftar tersebut berisi label untuk masing-masing kolom."
			},
			field: {
				name: "field",
				detail: "Diperlukan. Mengindikasikan kolom yang digunakan dalam fungsi tersebut. Masukkan label kolom yang dimasukkan di antara dua tanda kutip ganda, seperti \"Umur\" atau \"Hasil,\" atau angka (tanpa tanda kutip) yang menyatakan posisi kolom di dalam daftar: 1 untuk kolom pertama, 2 untuk kolom kedua, dan seterusnya."
			},
			criteria: {
				name: "criteria",
				detail: "Diperlukan. Rentang sel berisi kondisi yang Anda tentukan. Anda dapat menggunakan rentang untuk argumen kriteria, selama meliputi setidaknya satu label kolom dan setidaknya satu sel di bawah label kolom di mana Anda menentukan kondisi untuk kolom tersebut."
			}
		}
	},
	DMIN: {
		description: "Mengembalikan angka terkecil dalam bidang (kolom) rekaman dalam daftar atau database yang cocok dengan dengan kondisi yang Anda tentukan.",
		abstract: "Mengembalikan angka terkecil dalam bidang (kolom) rekaman dalam daftar atau database yang cocok dengan dengan kondisi yang Anda tentukan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/dmin-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Diperlukan. Rentang sel yang membentuk daftar atau database. Database adalah daftar dari data yang terkait di mana baris-baris informasi terkait adalah rekaman, dan kolom-kolom data adalah bidang. Baris pertama daftar tersebut berisi label untuk masing-masing kolom."
			},
			field: {
				name: "field",
				detail: "Diperlukan. Mengindikasikan kolom yang digunakan dalam fungsi tersebut. Masukkan label kolom yang dimasukkan di antara dua tanda kutip ganda, seperti \"Umur\" atau \"Hasil,\" atau angka (tanpa tanda kutip) yang menyatakan posisi kolom di dalam daftar: 1 untuk kolom pertama, 2 untuk kolom kedua, dan seterusnya."
			},
			criteria: {
				name: "criteria",
				detail: "Diperlukan. Rentang sel berisi kondisi yang Anda tentukan. Anda dapat menggunakan rentang untuk argumen kriteria, selama meliputi setidaknya satu label kolom dan setidaknya satu sel di bawah label kolom di mana Anda menentukan kondisi untuk kolom tersebut."
			}
		}
	},
	DPRODUCT: {
		description: "Mengalikan nilai dalam bidang (kolom) rekaman dalam daftar atau database yang cocok dengan kondisi yang Anda tentukan.",
		abstract: "Mengalikan nilai dalam bidang (kolom) rekaman dalam daftar atau database yang cocok dengan kondisi yang Anda tentukan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/dproduct-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Diperlukan. Rentang sel yang membentuk daftar atau database. Database adalah daftar dari data yang terkait di mana baris-baris informasi terkait adalah rekaman, dan kolom-kolom data adalah bidang. Baris pertama daftar tersebut berisi label untuk masing-masing kolom."
			},
			field: {
				name: "field",
				detail: "Diperlukan. Mengindikasikan kolom yang digunakan dalam fungsi tersebut. Masukkan label kolom yang dimasukkan di antara dua tanda kutip ganda, seperti \"Umur\" atau \"Hasil,\" atau angka (tanpa tanda kutip) yang menyatakan posisi kolom di dalam daftar: 1 untuk kolom pertama, 2 untuk kolom kedua, dan seterusnya."
			},
			criteria: {
				name: "criteria",
				detail: "Diperlukan. Rentang sel berisi kondisi yang Anda tentukan. Anda dapat menggunakan rentang untuk argumen kriteria, selama meliputi setidaknya satu label kolom dan setidaknya satu sel di bawah label kolom di mana Anda menentukan kondisi untuk kolom tersebut."
			}
		}
	},
	DSTDEV: {
		description: "Memperkirakan simpangan baku populasi berdasarkan sampel dengan menggunakan angka dalam bidang (kolom) rekaman dalam daftar atau database yang cocok dengan kondisi yang Anda tentukan.",
		abstract: "Memperkirakan simpangan baku populasi berdasarkan sampel dengan menggunakan angka dalam bidang (kolom) rekaman dalam daftar atau database yang cocok dengan kondisi yang Anda tentukan.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/dstdev-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Diperlukan. Rentang sel yang membentuk daftar atau database. Database adalah daftar dari data yang terkait di mana baris-baris informasi terkait adalah rekaman, dan kolom-kolom data adalah bidang. Baris pertama daftar tersebut berisi label untuk masing-masing kolom."
			},
			field: {
				name: "field",
				detail: "Diperlukan. Mengindikasikan kolom yang digunakan dalam fungsi tersebut. Masukkan label kolom yang dimasukkan di antara dua tanda kutip ganda, seperti \"Umur\" atau \"Hasil,\" atau angka (tanpa tanda kutip) yang menyatakan posisi kolom di dalam daftar: 1 untuk kolom pertama, 2 untuk kolom kedua, dan seterusnya."
			},
			criteria: {
				name: "criteria",
				detail: "Diperlukan. Rentang sel berisi kondisi yang Anda tentukan. Anda dapat menggunakan rentang untuk argumen kriteria, selama meliputi setidaknya satu label kolom dan setidaknya satu sel di bawah label kolom di mana Anda menentukan kondisi untuk kolom tersebut."
			}
		}
	},
	DSTDEVP: {
		description: "Menghitung simpangan baku populasi berdasarkan populasi keseluruhan dengan menggunakan angka dalam bidang (kolom) rekaman dalam daftar atau database yang cocok dengan kondisi yang Anda tentukan.",
		abstract: "Menghitung simpangan baku populasi berdasarkan populasi keseluruhan dengan menggunakan angka dalam bidang (kolom) rekaman dalam daftar atau database yang cocok dengan kondisi yang Anda tentukan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/dstdevp-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Diperlukan. Rentang sel yang membentuk daftar atau database. Database adalah daftar dari data yang terkait di mana baris-baris informasi terkait adalah rekaman, dan kolom-kolom data adalah bidang. Baris pertama daftar tersebut berisi label untuk masing-masing kolom."
			},
			field: {
				name: "field",
				detail: "Diperlukan. Mengindikasikan kolom yang digunakan dalam fungsi tersebut. Masukkan label kolom yang dimasukkan di antara dua tanda kutip ganda, seperti \"Umur\" atau \"Hasil,\" atau angka (tanpa tanda kutip) yang menyatakan posisi kolom di dalam daftar: 1 untuk kolom pertama, 2 untuk kolom kedua, dan seterusnya."
			},
			criteria: {
				name: "criteria",
				detail: "Diperlukan. Rentang sel berisi kondisi yang Anda tentukan. Anda dapat menggunakan rentang untuk argumen kriteria, selama meliputi setidaknya satu label kolom dan setidaknya satu sel di bawah label kolom di mana Anda menentukan kondisi untuk kolom tersebut."
			}
		}
	},
	DSUM: {
		description: "Dalam daftar atau database, DSUM menyediakan jumlah angka dalam bidang (kolom) rekaman yang cocok dengan kondisi tertentu.",
		abstract: "Dalam daftar atau database, DSUM menyediakan jumlah angka dalam bidang (kolom) rekaman yang cocok dengan kondisi tertentu.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/dsum-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Diperlukan. Ini adalah rentang sel yang membentuk daftar atau database. Database adalah daftar data terkait di mana baris informasi terkait adalah rekaman , dan kolom data adalah bidang . Baris pertama daftar berisi label untuk setiap kolom di dalamnya."
			},
			field: {
				name: "field",
				detail: "Diperlukan. Ini menentukan kolom mana yang digunakan dalam fungsi. Tentukan label kolom yang diapit antara tanda kutip ganda, seperti \"Usia\" atau \"Hasil,\" misalnya. Alternatifnya, Anda dapat menentukan angka (tanpa tanda kutip) yang mewakili posisi kolom dalam daftar: misalnya 1 untuk kolom pertama, 2 untuk kolom kedua, dan seterusnya."
			},
			criteria: {
				name: "criteria",
				detail: "Diperlukan. Ini adalah rentang sel yang berisi kondisi yang Anda tentukan. Anda dapat menggunakan rentang untuk argumen kriteria, selama meliputi setidaknya satu label kolom dan setidaknya satu sel di bawah label kolom di mana Anda menentukan kondisi untuk kolom tersebut."
			}
		}
	},
	DVAR: {
		description: "Memperkirakan varians populasi berdasarkan sampel dengan menggunakan angka dalam bidang (kolom) rekaman dalam daftar atau database yang cocok dengan kondisi yang Anda tentukan.",
		abstract: "Memperkirakan varians populasi berdasarkan sampel dengan menggunakan angka dalam bidang (kolom) rekaman dalam daftar atau database yang cocok dengan kondisi yang Anda tentukan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/dvar-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Diperlukan. Rentang sel yang membentuk daftar atau database. Database adalah daftar dari data yang terkait di mana baris-baris informasi terkait adalah rekaman, dan kolom-kolom data adalah bidang. Baris pertama daftar tersebut berisi label untuk masing-masing kolom."
			},
			field: {
				name: "field",
				detail: "Diperlukan. Mengindikasikan kolom yang digunakan dalam fungsi tersebut. Masukkan label kolom yang dimasukkan di antara dua tanda kutip ganda, seperti \"Umur\" atau \"Hasil,\" atau angka (tanpa tanda kutip) yang menyatakan posisi kolom di dalam daftar: 1 untuk kolom pertama, 2 untuk kolom kedua, dan seterusnya."
			},
			criteria: {
				name: "criteria",
				detail: "Diperlukan. Rentang sel berisi kondisi yang Anda tentukan. Anda dapat menggunakan rentang untuk argumen kriteria, selama meliputi setidaknya satu label kolom dan setidaknya satu sel di bawah label kolom di mana Anda menentukan kondisi untuk kolom tersebut."
			}
		}
	},
	DVARP: {
		description: "Menghitung varians populasi berdasarkan populasi keseluruhan dengan menggunakan angka dalam bidang (kolom) rekaman dalam daftar atau database yang cocok dengan kondisi yang Anda tentukan.",
		abstract: "Menghitung varians populasi berdasarkan populasi keseluruhan dengan menggunakan angka dalam bidang (kolom) rekaman dalam daftar atau database yang cocok dengan kondisi yang Anda tentukan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/dvarp-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Diperlukan. Rentang sel yang membentuk daftar atau database. Database adalah daftar dari data yang terkait di mana baris-baris informasi terkait adalah rekaman, dan kolom-kolom data adalah bidang. Baris pertama daftar tersebut berisi label untuk masing-masing kolom."
			},
			field: {
				name: "field",
				detail: "Diperlukan. Mengindikasikan kolom yang digunakan dalam fungsi tersebut. Masukkan label kolom yang dimasukkan di antara dua tanda kutip ganda, seperti \"Umur\" atau \"Hasil,\" atau angka (tanpa tanda kutip) yang menyatakan posisi kolom di dalam daftar: 1 untuk kolom pertama, 2 untuk kolom kedua, dan seterusnya."
			},
			criteria: {
				name: "criteria",
				detail: "Diperlukan. Rentang sel berisi kondisi yang Anda tentukan. Anda dapat menggunakan rentang untuk argumen kriteria, selama meliputi setidaknya satu label kolom dan setidaknya satu sel di bawah label kolom di mana Anda menentukan kondisi untuk kolom tersebut."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/date/id-ID.ts
const locale$11 = {
	DATE: {
		description: "Fungsi DATE mengembalikan nomor seri berurutan yang mewakili tanggal tertentu.",
		abstract: "Fungsi DATE mengembalikan nomor seri berurutan yang mewakili tanggal tertentu.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/date-function"
		}],
		functionParameter: {
			year: {
				name: "year",
				detail: "Nilai argumen tahun dapat berisi satu hingga empat digit. Excel menafsirkannya sesuai sistem tanggal komputer; secara default Univer menggunakan sistem tanggal 1900."
			},
			month: {
				name: "month",
				detail: "Bilangan bulat positif atau negatif yang mewakili bulan dalam tahun dari 1 hingga 12, Januari hingga Desember."
			},
			day: {
				name: "day",
				detail: "Bilangan bulat positif atau negatif yang mewakili hari dalam bulan dari 1 hingga 31."
			}
		}
	},
	DATEDIF: {
		description: "Menghitung jumlah hari, bulan, atau tahun di antara dua tanggal.",
		abstract: "Menghitung jumlah hari, bulan, atau tahun di antara dua tanggal.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/datedif-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Tanggal yang menunjukkan tanggal pertama, atau tanggal mulai periode tertentu. Tanggal mungkin dimasukkan sebagai string teks di dalam tanda kutip (misalnya, \"2001/1/30\"), sebagai nomor seri (misalnya, 36921, yang menyatakan 30 Januari 2001, jika Anda menggunakan sistem tanggal 1900), atau seperti hasil dari rumus atau fungsi lain (misalnya, DATEVALUE(\"2001/1/30\"))."
			},
			endDate: {
				name: "end_date",
				detail: "Tanggal yang menunjukkan tanggal terakhir, atau tanggal berakhirnya periode."
			},
			unit: {
				name: "Satuan",
				detail: "Tipe informasi yang ingin Anda kembalikan, di mana: Unit****Mengembalikan \" Y \"Jumlah tahun yang lengkap dalam periode.\" M \"Jumlah bulan lengkap dalam periode.\" D \"Jumlah hari dalam periode.\" MD \"Perbedaan antara hari dalam start_date dan end_date. Bulan dan tahun dari tanggal diabaikan. Penting: Kami tidak menyarankan menggunakan argumen \"MD\", karena ada batasan yang diketahui dengan argumen tersebut. Lihat bagian masalah yang diketahui di bawah ini.\" YM \"Perbedaan antara bulan dalam start_date dan end_date. Hari dan tahun dari tanggal diabaikan\" YD \"Perbedaan antara hari-hari start_date dan end_date. Tahun dari tanggal diabaikan."
			}
		}
	},
	DATEVALUE: {
		description: "Fungsi DATEVALUE mengonversi tanggal yang disimpan sebagai teks ke nomor seri yang dikenali Excel sebagai tanggal. Misalnya, rumus =DATEVALUE(\"1/1/2008\") mengembalikan 39448, nomor seri tanggal 1/1/2008. Akan tetapi, ingatlah bahwa pengaturan tanggal sistem komputer Anda mungkin menyebabkan hasil fungsi DATEVALUE berbeda dari contoh ini.",
		abstract: "Fungsi DATEVALUE mengonversi tanggal yang disimpan sebagai teks ke nomor seri yang dikenali Excel sebagai tanggal. Misalnya, rumus =DATEVALUE(\"1/1/2008\") mengembalikan 39448, nomor seri tanggal 1/1/2008. Akan tetapi, ingatlah bahwa pengaturan tanggal sistem komputer Anda mungkin menyebabkan hasil fungsi DATEVALUE berbeda dari contoh ini.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/datevalue-function"
		}],
		functionParameter: { dateText: {
			name: "date_text",
			detail: "Diperlukan. Teks yang menyatakan tanggal dalam format tanggal Excel, atau referensi ke sel berisi teks yang menyatakan tanggal dalam format tanggal Excel. Misalnya, \"1/30/2008\" atau \"30-Jan-2008\" adalah string teks dalam tanda kutip yang menyatakan tanggal. Menggunakan sistem tanggal default di Microsoft Excel untuk Windows, argumen date_text harus menunjukkan tanggal antara 1 Januari 1900 dan 31 Desember 9999. Fungsi DATEVALUE mengembalikan nilai kesalahan #VALUE!. jika nilai argumen date_text berada di luar rentang ini. Jika bagian tahun dari argumen date_text dihilangkan, fungsi DATEVALUE menggunakan tahun saat ini dari jam bawaan komputer Anda. Informasi waktu dalam argumen date_text diabaikan."
		} }
	},
	DAY: {
		description: "Mengembalikan tanggal, yang dinyatakan dengan nomor seri. Hari diberikan sebagai bilangan bulat dengan rentang dari 1 sampai 31.",
		abstract: "Mengembalikan tanggal, yang dinyatakan dengan nomor seri. Hari diberikan sebagai bilangan bulat dengan rentang dari 1 sampai 31.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/day-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Diperlukan. Tanggal yang Anda coba temukan. Tanggal harus dimasukkan menggunakan fungsi DATE, atau sebagai hasil dari rumus atau fungsi lain. Misalnya, gunakan DATE(2008,5,23) untuk tanggal 23 Mei 2008. Masalah dapat terjadi jika tanggal dimasukkan sebagai teks ."
		} }
	},
	DAYS: {
		description: "Mengembalikan jumlah hari antara dua tanggal.",
		abstract: "Mengembalikan jumlah hari antara dua tanggal.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/days-function"
		}],
		functionParameter: {
			endDate: {
				name: "end_date",
				detail: "Diperlukan. Start_date dan End_date adalah dua tanggal yang ingin Anda ketahui jumlah hari di antara keduanya."
			},
			startDate: {
				name: "start_date",
				detail: "Diperlukan. Start_date dan End_date adalah dua tanggal yang ingin Anda ketahui jumlah hari di antara keduanya."
			}
		}
	},
	DAYS360: {
		description: "Fungsi DAYS360 mengembalikan jumlah hari antara dua tanggal berdasarkan tahun dengan 360 hari per tahun (dua belas bulan dengan 30 hari per bulan), yang digunakan dalam beberapa perhitungan akuntansi. Gunakan fungsi ini untuk membantu menghitung pembayaran jika sistem akuntansi Anda berdasarkan pada dua belas bulan dengan 30 hari per bulan.",
		abstract: "Fungsi DAYS360 mengembalikan jumlah hari antara dua tanggal berdasarkan tahun dengan 360 hari per tahun (dua belas bulan dengan 30 hari per bulan), yang digunakan dalam beberapa perhitungan akuntansi. Gunakan fungsi ini untuk membantu menghitung pembayaran jika sistem akuntansi Anda berdasarkan pada dua belas bulan dengan 30 hari per bulan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/days360-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Dua tanggal yang ingin diketahui jumlah hari di antaranya."
			},
			endDate: {
				name: "end_date",
				detail: "Dua tanggal yang ingin diketahui jumlah hari di antaranya."
			},
			method: {
				name: "method",
				detail: "Nilai logika yang menentukan apakah menggunakan metode AS atau Eropa dalam perhitungan."
			}
		}
	},
	EDATE: {
		description: "Mengembalikan nomor seri yang mewakili tanggal sejumlah bulan tertentu sebelum atau sesudah tanggal yang ditentukan (start_date). Gunakan EDATE untuk menghitung tanggal jatuh tempo yang berada pada hari yang sama dalam bulan dengan tanggal penerbitan.",
		abstract: "Mengembalikan nomor seri tanggal sejumlah bulan tertentu sebelum atau sesudah tanggal mulai.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/edate-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Tanggal yang mewakili tanggal mulai. Tanggal sebaiknya dimasukkan dengan fungsi DATE atau sebagai hasil rumus atau fungsi lain."
			},
			months: {
				name: "months",
				detail: "Jumlah bulan sebelum atau sesudah start_date. Nilai positif menghasilkan tanggal mendatang; nilai negatif menghasilkan tanggal lampau."
			}
		}
	},
	EOMONTH: {
		description: "Mengembalikan nomor seri untuk hari terakhir bulan yang merupakan nomor indikasi dari bulan sebelum atau setelah start_date. Gunakan EOMONTH untuk menghitung tanggal jatuh tempo yang jatuh pada hari terakhir bulan tersebut.",
		abstract: "Mengembalikan nomor seri untuk hari terakhir bulan yang merupakan nomor indikasi dari bulan sebelum atau setelah start_date. Gunakan EOMONTH untuk menghitung tanggal jatuh tempo yang jatuh pada hari terakhir bulan tersebut.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/eomonth-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Diperlukan. Tanggal yang mewakili tanggal mulai. Tanggal harus dimasukkan menggunakan fungsi DATE, atau sebagai hasil dari rumus atau fungsi lain. Misalnya, gunakan DATE(2008,5,23) untuk tanggal 23 Mei 2008. Masalah dapat terjadi jika tanggal dimasukkan sebagai teks ."
			},
			months: {
				name: "months",
				detail: "Diperlukan. Jumlah bulan sebelum atau setelah start_date. Nilai positif untuk bulan menghasilkan tanggal masa mendatang; nilai negatif menghasilkan tanggal lampau. Catatan Jika bulan bukan bilangan bulat, maka dipotong."
			}
		}
	},
	EPOCHTODATE: {
		description: "Mengonversi cap waktu epoch Unix dalam detik, milidetik, atau mikrodetik menjadi tanggal dan waktu dalam Waktu Universal Terkoordinasi (UTC).",
		abstract: "Mengonversi cap waktu epoch Unix dalam detik, milidetik, atau mikrodetik menjadi tanggal dan waktu dalam Waktu Universal Terkoordinasi (UTC).",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/13193461?hl=id"
		}],
		functionParameter: {
			timestamp: {
				name: "timestamp",
				detail: "Cap waktu epoch Unix dalam detik, milidetik, atau mikrodetik."
			},
			unit: {
				name: "unit",
				detail: "[OPSIONAL — 1 secara default]: satuan waktu yang digunakan untuk menyatakan cap waktu."
			}
		}
	},
	HOUR: {
		description: "Mengembalikan jam dari satu nilai waktu. Jam diberikan sebagai bilangan bulat, mulai dari 0 (12:00 A.M.) hingga 23 (11:00 P.M.).",
		abstract: "Mengembalikan jam dari satu nilai waktu. Jam diberikan sebagai bilangan bulat, mulai dari 0 (12:00 A.M.) hingga 23 (11:00 P.M.).",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/hour-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Diperlukan. Waktu yang berisi jam yang ingin Anda temukan. Waktu bisa dimasukkan sebagai string teks dengan tanda kutip (contoh, \"6:45 PM\"), sebagai angka desimal (contoh, 0,78125, yang menyatakan 6:45 PM), atau sebagai hasil dari rumus atau fungsi lain (contoh, TIMEVALUE(\"6:45 PM\"))."
		} }
	},
	ISOWEEKNUM: {
		description: "Mengembalikan jumlah angka minggu ISO dalam tahun untuk tanggal yang ditentukan.",
		abstract: "Mengembalikan jumlah angka minggu ISO dalam tahun untuk tanggal yang ditentukan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/isoweeknum-function"
		}],
		functionParameter: { date: {
			name: "date",
			detail: "Diperlukan. Date adalah kode tanggal-waktu yang digunakan oleh Excel untuk perhitungan tanggal dan waktu."
		} }
	},
	MINUTE: {
		description: "Mengembalikan menit dari nilai waktu. Menit ditentukan sebagai bilangan bulat, rentangnya antara 0 sampai 59.",
		abstract: "Mengembalikan menit dari nilai waktu. Menit ditentukan sebagai bilangan bulat, rentangnya antara 0 sampai 59.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/minute-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Diperlukan. Waktu yang memuat menit yang ingin Anda temukan. Waktu bisa dimasukkan sebagai string teks dengan tanda kutip (contoh, \"6:45 PM\"), sebagai angka desimal (contoh, 0,78125, yang menyatakan 6:45 PM), atau sebagai hasil dari rumus atau fungsi lain (contoh, TIMEVALUE(\"6:45 PM\"))."
		} }
	},
	MONTH: {
		description: "Mengembalikan bulan dari sebuah tanggal yang dinyatakan oleh nomor seri. Bulan ditentukan sebagai bilangan bulat, rentangnya antara 1 (Januari) sampai 12 (Desember).",
		abstract: "Mengembalikan bulan dari sebuah tanggal yang dinyatakan oleh nomor seri. Bulan ditentukan sebagai bilangan bulat, rentangnya antara 1 (Januari) sampai 12 (Desember).",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/month-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Diperlukan. Tanggal yang ingin Anda cari bulannya. Tanggal harus dimasukkan menggunakan fungsi DATE, atau sebagai hasil dari rumus atau fungsi lain. Misalnya, gunakan DATE(2008,5,23) untuk tanggal 23 Mei 2008. Masalah dapat terjadi jika tanggal dimasukkan sebagai teks ."
		} }
	},
	NETWORKDAYS: {
		description: "Mengembalikan jumlah semua hari kerja di antara start_date dan end_date. Hari kerja tidak termasuk akhir pekan dan tanggal-tanggal yang ditentukan sebagai hari libur. Gunakan NETWORKDAYS untuk menghitung tunjangan karyawan yang dibayar berdasarkan jumlah hari kerja selama masa tertentu.",
		abstract: "Mengembalikan jumlah semua hari kerja di antara start_date dan end_date. Hari kerja tidak termasuk akhir pekan dan tanggal-tanggal yang ditentukan sebagai hari libur. Gunakan NETWORKDAYS untuk menghitung tunjangan karyawan yang dibayar berdasarkan jumlah hari kerja selama masa tertentu.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/networkdays-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Diperlukan. Tanggal yang menunjukkan tanggal mulai."
			},
			endDate: {
				name: "end_date",
				detail: "Diperlukan. Tanggal yang menunjukkan tanggal akhir."
			},
			holidays: {
				name: "holidays",
				detail: "Opsional. Rentang opsional yang terdiri dari satu atau lebih tanggal untuk dikecualikan dari kalender kerja, seperti hari libur nasional dan jatah cuti. Daftarnya bisa berupa rentang sel yang berisi tanggal atau konstanta array nomor seri yang menunjukkan tanggal."
			}
		}
	},
	NETWORKDAYS_INTL: {
		description: "Mengembalikan jumlah semua hari kerja di antara dua tanggal dengan menggunakan parameter untuk menunjukkan yang mana dan berapa hari yang merupakan akhir pekan. Hari-hari akhir pekan dan hari yang ditentukan sebagai hari libur tidak dianggap hari kerja.",
		abstract: "Mengembalikan jumlah semua hari kerja di antara dua tanggal dengan menggunakan parameter untuk menunjukkan yang mana dan berapa hari yang merupakan akhir pekan. Hari-hari akhir pekan dan hari yang ditentukan sebagai hari libur tidak dianggap hari kerja.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/networkdays-intl-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Tanggal yang mewakili tanggal mulai."
			},
			endDate: {
				name: "end_date",
				detail: "Tanggal yang mewakili tanggal akhir."
			},
			weekend: {
				name: "weekend",
				detail: "Angka atau teks yang menentukan kapan akhir pekan terjadi."
			},
			holidays: {
				name: "holidays",
				detail: "Rentang opsional satu atau beberapa tanggal yang dikecualikan dari kalender kerja, seperti hari libur nasional, daerah, atau bergerak."
			}
		}
	},
	NOW: {
		description: "Mengembalikan nomor seri tanggal dan waktu saat ini. Jika sebelum fungsi dimasukkan format selnya Umum , Excel mengubah sel format sehingga cocok dengan format tanggal dan waktu pengaturan regional Anda. Anda dapat mengubah format tanggal dan waktu dalam grup Angka di tab Beranda di Pita.",
		abstract: "Mengembalikan nomor seri tanggal dan waktu saat ini. Jika sebelum fungsi dimasukkan format selnya Umum , Excel mengubah sel format sehingga cocok dengan format tanggal dan waktu pengaturan regional Anda. Anda dapat mengubah format tanggal dan waktu dalam grup Angka di tab Beranda di Pita.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/now-function"
		}],
		functionParameter: {}
	},
	SECOND: {
		description: "Mengembalikan detik dari satu nilai waktu. Detik diberikan sebagai bilangan bulat dalam rentang 0 (nol) sampai 59.",
		abstract: "Mengembalikan detik dari satu nilai waktu. Detik diberikan sebagai bilangan bulat dalam rentang 0 (nol) sampai 59.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/second-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Diperlukan. Waktu yang memuat detik yang ingin Anda temukan. Waktu bisa dimasukkan sebagai string teks dengan tanda kutip (contoh, \"6:45 PM\"), sebagai angka desimal (contoh, 0,78125, yang menyatakan 6:45 PM), atau sebagai hasil dari rumus atau fungsi lain (contoh, TIMEVALUE(\"6:45 PM\"))."
		} }
	},
	TIME: {
		description: "Mengembalikan angka desimal untuk waktu tertentu. Jika format sel adalah Umum sebelum fungsi dimasukkan, hasil diformat sebagai tanggal.",
		abstract: "Mengembalikan angka desimal untuk waktu tertentu. Jika format sel adalah Umum sebelum fungsi dimasukkan, hasil diformat sebagai tanggal.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/time-function"
		}],
		functionParameter: {
			hour: {
				name: "hour",
				detail: "Diperlukan. Angka dari 0 (nol) sampai 32767 yang menyatakan jam. Nilai apa pun yang lebih besar dari 23 akan dibagi dengan 24 dan sisanya akan dianggap sebagai nilai jam. Sebagai contoh, TIME(27,0,0) = TIME(3,0,0) = 0,125 atau 3:00 AM."
			},
			minute: {
				name: "minute",
				detail: "Diperlukan. Angka dari 0 sampai 32767 yang menyatakan menit. Nilai apa pun yang lebih besar dari 59 akan dikonversi menjadi jam dan menit. Sebagai contoh, TIME(0,750,0) = TIME(12,30,0) = 0,520833 atau 12:30 PM."
			},
			second: {
				name: "second",
				detail: "Diperlukan. Angka dari 0 sampai 32767 yang menyatakan detik. Nilai apa pun yang lebih besar dari 59 akan dikonversi menjadi jam, menit, dan detik. Sebagai contoh, TIME(0,0,2000) = TIME(0,33,22) = 0,023148 atau 12:33:20 AM"
			}
		}
	},
	TIMEVALUE: {
		description: "Mengembalikan angka desimal dari waktu yang dinyatakan oleh string teks. Angka desimal adalah nilai dimulai dari 0 (nol) sampai 0,99988426, menyatakan waktu dari jam 0:00:00 (12:00:00 AM) sampai jam 23:59:59 (11:59:59 P.M.).",
		abstract: "Mengembalikan angka desimal dari waktu yang dinyatakan oleh string teks. Angka desimal adalah nilai dimulai dari 0 (nol) sampai 0,99988426, menyatakan waktu dari jam 0:00:00 (12:00:00 AM) sampai jam 23:59:59 (11:59:59 P.M.).",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/timevalue-function"
		}],
		functionParameter: { timeText: {
			name: "time_text",
			detail: "Diperlukan. String teks yang menyatakan waktu dalam salah satu format waktu Microsoft Excel; sebagai contoh, string teks \"6:45 PM\" dan \"18:45\" di dalam tanda kutip ganda yang menyatakan waktu."
		} }
	},
	TO_DATE: {
		description: "Mengonversi angka yang diberikan menjadi tanggal.",
		abstract: "Mengonversi angka yang diberikan menjadi tanggal.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3094239?hl=id"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Argumen atau referensi sel yang akan dikonversi menjadi tanggal. Jika berupa angka, nilai ditafsirkan sebagai jumlah hari sejak 30 Desember 1899; nilai negatif adalah hari sebelumnya dan pecahan menunjukkan waktu setelah tengah malam. Nilai nonnumerik dikembalikan tanpa perubahan."
		} }
	},
	TODAY: {
		description: "Fungsi TODAY mengembalikan nomor seri tanggal saat ini. Nomor seri adalah kode tanggal-waktu yang digunakan oleh Excel untuk perhitungan tanggal dan waktu. Jika format sel adalah Umum sebelum fungsi dimasukkan, Excel mengganti format sel ke Tanggal . Jika Anda ingin melihat nomor serinya, Anda harus mengganti format sel ke Umum atau Angka .",
		abstract: "Fungsi TODAY mengembalikan nomor seri tanggal saat ini. Nomor seri adalah kode tanggal-waktu yang digunakan oleh Excel untuk perhitungan tanggal dan waktu. Jika format sel adalah Umum sebelum fungsi dimasukkan, Excel mengganti format sel ke Tanggal . Jika Anda ingin melihat nomor serinya, Anda harus mengganti format sel ke Umum atau Angka .",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/today-function"
		}],
		functionParameter: {}
	},
	WEEKDAY: {
		description: "Mengembalikan hari yang tekait dengan sebuah tanggal. Hari diberikan sebagai bilangan bulat, yang berkisar dari 1 (Minggu) sampai 7 (Sabtu), secara default.",
		abstract: "Mengembalikan hari yang tekait dengan sebuah tanggal. Hari diberikan sebagai bilangan bulat, yang berkisar dari 1 (Minggu) sampai 7 (Sabtu), secara default.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/weekday-function"
		}],
		functionParameter: {
			serialNumber: {
				name: "serial_number",
				detail: "Diperlukan. Nomor berurutan yang menunjukkan tanggal dari hari yang akan dicari. Tanggal harus dimasukkan dengan menggunakan fungsi DATE, atau sebagai hasil dari rumus atau fungsi lain. Contoh, gunakan DATE(2008,5,23) untuk tanggal 23 Mei 2008. Masalah bisa muncul jika tanggal dimasukkan sebagai teks."
			},
			returnType: {
				name: "return_type",
				detail: "Opsional. Angka yang menentukan tipe nilai yang dikembalikan."
			}
		}
	},
	WEEKNUM: {
		description: "Mengembalikan nomor minggu tanggal tertentu. Misalnya, minggu yang berisi tanggal 1 Januari adalah minggu pertama dalam setahun, dan diberi nomor minggu 1.",
		abstract: "Mengembalikan nomor minggu tanggal tertentu. Misalnya, minggu yang berisi tanggal 1 Januari adalah minggu pertama dalam setahun, dan diberi nomor minggu 1.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/weeknum-function"
		}],
		functionParameter: {
			serialNumber: {
				name: "serial_number",
				detail: "Diperlukan. Tanggal dalam minggu. Tanggal harus dimasukkan dengan menggunakan fungsi DATE, atau sebagai hasil dari rumus atau fungsi lain. Contoh, gunakan DATE(2008,5,23) untuk tanggal 23 Mei 2008. Masalah bisa muncul jika tanggal dimasukkan sebagai teks."
			},
			returnType: {
				name: "return_type",
				detail: "Opsional. Angka yang menentukan pada hari apa minggu dimulai. Nilai default adalah 1."
			}
		}
	},
	WORKDAY: {
		description: "Mengembalikan angka yang menyatakan tanggal yang merupakan indikasi jumlah hari kerja sebelum atau sesudah sebuah tanggal (tanggal mulai). Hari kerja tidak termasuk akhir pekan dan tanggal yang ditetapkan sebagai hari libur. Gunakan WORKDAY untuk mengecualikan akhir pekan atau hari libur ketika menghitung tanggal jatuh tempo faktur, perkiraan tanggal pengiriman, atau jumlah hari pekerjaan yang telah dilakukan.",
		abstract: "Mengembalikan angka yang menyatakan tanggal yang merupakan indikasi jumlah hari kerja sebelum atau sesudah sebuah tanggal (tanggal mulai). Hari kerja tidak termasuk akhir pekan dan tanggal yang ditetapkan sebagai hari libur. Gunakan WORKDAY untuk mengecualikan akhir pekan atau hari libur ketika menghitung tanggal jatuh tempo faktur, perkiraan tanggal pengiriman, atau jumlah hari pekerjaan yang telah dilakukan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/workday-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Diperlukan. Tanggal yang menunjukkan tanggal mulai."
			},
			days: {
				name: "days",
				detail: "Diperlukan. Jumlah hari nonakhir pekan dan nonhari libur sebelum atau setelah start_date. Nilai positif untuk hari mengembalikan tanggal mendatang, nilai negatif mengembalikan tanggal lampau."
			},
			holidays: {
				name: "holidays",
				detail: "Opsional. Daftar opsional yang terdiri dari satu atau lebih tanggal untuk dikecualikan dari kalender kerja, seperti hari libur nasional dan jatah cuti. Daftarnya bisa berupa rentang sel yang berisi tanggal atau konstanta array nomor seri yang menunjukkan tanggal."
			}
		}
	},
	WORKDAY_INTL: {
		description: "Fungsi ini mengembalikan nomor seri tanggal sebelum atau sesudah jumlah hari kerja tertentu dengan parameter akhir pekan kustom. Parameter Weekend opsional dapat menunjukkan hari mana dan berapa hari yang merupakan akhir pekan. Perhatikan bahwa Hari akhir pekan dan hari apa pun yang ditentukan sebagai hari libur tidak dianggap sebagai hari kerja.",
		abstract: "Fungsi ini mengembalikan nomor seri tanggal sebelum atau sesudah jumlah hari kerja tertentu dengan parameter akhir pekan kustom. Parameter Weekend opsional dapat menunjukkan hari mana dan berapa hari yang merupakan akhir pekan. Perhatikan bahwa Hari akhir pekan dan hari apa pun yang ditentukan sebagai hari libur tidak dianggap sebagai hari kerja.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/workday-intl-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Diperlukan. Tanggal mulai, dipotong menjadi bilangan bulat."
			},
			days: {
				name: "days",
				detail: "Diperlukan. Jumlah hari kerja sebelum atau setelah start_date. Nilai positif menghasilkan tanggal yang akan datang; nilai negatif menghasilkan tanggal sebelumnya; nilai nol menghasilkan start_date yang sudah ditentukan . Day-offset dipotok menjadi bilangan bulat."
			},
			weekend: {
				name: "weekend",
				detail: "Opsional. Jika digunakan, ini menunjukkan hari dalam seminggu yang merupakan hari akhir pekan dan tidak dianggap hari kerja. Argumen akhir pekan adalah angka akhir pekan atau string yang menentukan kapan akhir pekan terjadi. Nilai jumlah akhir pekan menunjukkan hari akhir pekan seperti yang diperlihatkan di bawah ini."
			},
			holidays: {
				name: "holidays",
				detail: "Ini adalah argumen opsional di akhir sintaks. Ini menentukan sekumpulan opsional dari satu atau beberapa tanggal yang akan dikecualikan dari kalender hari kerja. Hari libur harus berupa rentang sel yang berisi tanggal -- atau konstanta array dari nilai seri yang mewakili tanggal tersebut. Urutan tanggal atau nilai seri dalam hari libur dapat berubah-ubah."
			}
		}
	},
	YEAR: {
		description: "Mengembalikan tahun yang terkait dengan satu tanggal. Tahun dikembalikan sebagai bilangan bulat dalam rentang 1900-9999.",
		abstract: "Mengembalikan tahun yang terkait dengan satu tanggal. Tahun dikembalikan sebagai bilangan bulat dalam rentang 1900-9999.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/year-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Diperlukan. Tanggal dari tahun yang akan dicari. Tanggal harus dimasukkan dengan menggunakan fungsi DATE, atau sebagai hasil dari rumus atau fungsi lain. Misalnya, gunakan DATE(2025,5,23) untuk hari ke-23 Mei 2025. Masalah bisa muncul jika tanggal dimasukkan sebagai teks."
		} }
	},
	YEARFRAC: {
		description: "YEARFRAC menghitung pecahan tahun yang dinyatakan oleh jumlah hari penuh antara dua tanggal (the start_date dan end_date ). Sebagai contoh, Anda dapat menggunakan YEARFRAC untuk mengidentifikasi proporsi tunjangan atau kewajiban pembayaran setahun dalam jangka waktu tertentu.",
		abstract: "YEARFRAC menghitung pecahan tahun yang dinyatakan oleh jumlah hari penuh antara dua tanggal (the start_date dan end_date ). Sebagai contoh, Anda dapat menggunakan YEARFRAC untuk mengidentifikasi proporsi tunjangan atau kewajiban pembayaran setahun dalam jangka waktu tertentu.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/yearfrac-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Tanggal yang mewakili tanggal mulai."
			},
			endDate: {
				name: "end_date",
				detail: "Tanggal yang mewakili tanggal akhir."
			},
			basis: {
				name: "basis",
				detail: "Jenis basis penghitungan hari yang akan digunakan."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/engineering/id-ID.ts
const locale$10 = {
	BESSELI: {
		description: "Mengembalikan fungsi Bessel yang dimodifikasi, yang setara dengan fungsi Bessel yang dievaluasi untuk argumen imajiner murni.",
		abstract: "Mengembalikan fungsi Bessel yang dimodifikasi, yang setara dengan fungsi Bessel yang dievaluasi untuk argumen imajiner murni.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/besseli-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "Diperlukan. Nilai untuk mengevaluasi fungsi."
			},
			n: {
				name: "N",
				detail: "Diperlukan. Urutan fungsi Bessel. Jika n bukan bilangan bulat, maka dipotong."
			}
		}
	},
	BESSELJ: {
		description: "Mengembalikan fungsi Bessel.",
		abstract: "Mengembalikan fungsi Bessel.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/besselj-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "Diperlukan. Nilai untuk mengevaluasi fungsi."
			},
			n: {
				name: "N",
				detail: "Diperlukan. Urutan fungsi Bessel. Jika n bukan bilangan bulat, maka dipotong."
			}
		}
	},
	BESSELK: {
		description: "Mengembalikan fungsi Bessel yang dimodifikasi, yang setara dengan fungsi Bessel yang dievaluasi untuk argumen imajiner murni.",
		abstract: "Mengembalikan fungsi Bessel yang dimodifikasi, yang setara dengan fungsi Bessel yang dievaluasi untuk argumen imajiner murni.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/besselk-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "Diperlukan. Nilai untuk mengevaluasi fungsi."
			},
			n: {
				name: "N",
				detail: "Diperlukan. Urutan fungsi. Jika n bukan bilangan bulat, maka dipotong."
			}
		}
	},
	BESSELY: {
		description: "Mengembalikan fungsi Bessel, yang disebut juga fungsi Weber atau fungsi Neumann.",
		abstract: "Mengembalikan fungsi Bessel, yang disebut juga fungsi Weber atau fungsi Neumann.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/bessely-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "Diperlukan. Nilai untuk mengevaluasi fungsi."
			},
			n: {
				name: "N",
				detail: "Diperlukan. Urutan fungsi. Jika n bukan bilangan bulat, maka dipotong."
			}
		}
	},
	BIN2DEC: {
		description: "Mengonversi bilangan biner ke desimal.",
		abstract: "Mengonversi bilangan biner ke desimal.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/bin2dec-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan. Bilangan biner yang ingin Anda konversi. Number tidak dapat berisi lebih dari 10 karakter (10 bit). Bit angka paling signifikan adalah bit tanda. Sisa 9 bit adalah bit besaran. Angka negatif dinyatakan dengan menggunakan notasi dua pelengkap."
		} }
	},
	BIN2HEX: {
		description: "Mengonversi bilangan biner menjadi heksadesimal.",
		abstract: "Mengonversi bilangan biner menjadi heksadesimal.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/bin2hex-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Bilangan biner yang ingin Anda konversi."
			},
			places: {
				name: "places",
				detail: "Jumlah karakter yang akan digunakan."
			}
		}
	},
	BIN2OCT: {
		description: "Mengonversi bilangan biner ke oktal.",
		abstract: "Mengonversi bilangan biner ke oktal.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/bin2oct-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. Bilangan biner yang ingin Anda konversi. Number tidak dapat berisi lebih dari 10 karakter (10 bit). Bit angka paling signifikan adalah bit tanda. Sisa 9 bit adalah bit besaran. Angka negatif dinyatakan dengan menggunakan notasi dua pelengkap."
			},
			places: {
				name: "places",
				detail: "Opsional. Jumlah karakter yang digunakan. Jika places dihilangkan, BIN2OCT menggunakan jumlah minimum karakter yang diperlukan. Places berguna untuk mengisi nilai hasil dengan jarak antar baris 0 (nol)."
			}
		}
	},
	BITAND: {
		description: "Mengembalikan sebuah 'AND' dari dua angka pada tingkat bit.",
		abstract: "Mengembalikan sebuah 'AND' dari dua angka pada tingkat bit.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/bitand-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Diperlukan. Harus dalam bentuk desimal yang lebih besar dari atau sama dengan 0."
			},
			number2: {
				name: "number2",
				detail: "Diperlukan. Harus dalam bentuk desimal yang lebih besar dari atau sama dengan 0."
			}
		}
	},
	BITLSHIFT: {
		description: "Mengembalikan angka yang digeser ke kiri oleh jumlah bit yang ditentukan.",
		abstract: "Mengembalikan angka yang digeser ke kiri oleh jumlah bit yang ditentukan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/bitlshift-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. Angka harus berupa bilangan bulat yang lebih besar atau sama dengan 0."
			},
			shiftAmount: {
				name: "shift_amount",
				detail: "Diperlukan. Shift_amount harus berupa bilangan bulat."
			}
		}
	},
	BITOR: {
		description: "Mengembalikan sebuah 'OR' dari dua angka pada tingkat bit.",
		abstract: "Mengembalikan sebuah 'OR' dari dua angka pada tingkat bit.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/bitor-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Diperlukan. Harus dalam bentuk desimal yang lebih besar dari atau sama dengan 0."
			},
			number2: {
				name: "number2",
				detail: "Diperlukan. Harus dalam bentuk desimal yang lebih besar dari atau sama dengan 0."
			}
		}
	},
	BITRSHIFT: {
		description: "Mengembalikan nilai yang digeser ke kanan sebanyak shift_amount bit.",
		abstract: "Mengembalikan nilai yang digeser ke kanan sebanyak shift_amount bit.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/bitrshift-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Angka harus berupa bilangan bulat yang lebih besar dari atau sama dengan 0."
			},
			shiftAmount: {
				name: "shift_amount",
				detail: "Shift_amount harus berupa bilangan bulat."
			}
		}
	},
	BITXOR: {
		description: "Mengembalikan sebuah 'XOR' dari dua angka pada tingkat bit.",
		abstract: "Mengembalikan sebuah 'XOR' dari dua angka pada tingkat bit.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/bitxor-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Diperlukan. Harus lebih besar dari atau sama dengan 0."
			},
			number2: {
				name: "number2",
				detail: "Diperlukan. Harus lebih besar dari atau sama dengan 0."
			}
		}
	},
	COMPLEX: {
		description: "Mengonversi koefisien riil dan imajiner ke dalam bilangan kompleks dari bentuk x + yi atau x + yj.",
		abstract: "Mengonversi koefisien riil dan imajiner ke dalam bilangan kompleks dari bentuk x + yi atau x + yj.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/complex-function"
		}],
		functionParameter: {
			realNum: {
				name: "real_num",
				detail: "Diperlukan. Koefisien riil dari bilangan kompleks tersebut."
			},
			iNum: {
				name: "i_num",
				detail: "Diperlukan. Koefisien imajiner dari bilangan kompleks tersebut."
			},
			suffix: {
				name: "suffix",
				detail: "Opsional. Akhiran komponen imajiner dari bilangan kompleks tersebut. Jika dihilangkan, akhiran diasumsikan sebagai \"i\"."
			}
		}
	},
	CONVERT: {
		description: "Mengonversi angka dari satu sistem pengukuran ke sistem lain. Misalnya, CONVERT dapat menerjemahkan tabel jarak dalam mil ke tabel jarak dalam kilometer.",
		abstract: "Mengonversi angka dari satu sistem pengukuran ke sistem lain. Misalnya, CONVERT dapat menerjemahkan tabel jarak dalam mil ke tabel jarak dalam kilometer.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/convert-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Nilai dalam from_unit yang akan dikonversi."
			},
			fromUnit: {
				name: "from_unit",
				detail: "Satuan untuk number."
			},
			toUnit: {
				name: "to_unit",
				detail: "Satuan untuk hasil."
			}
		}
	},
	DEC2BIN: {
		description: "Mengonversi bilangan desimal ke biner.",
		abstract: "Mengonversi bilangan desimal ke biner.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/dec2bin-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. Bilangan bulat desimal yang ingin Anda konversi. Jika bilangannya negatif, nilai tempat valid diabaikan dan DEC2BIN mengembalikan bilangan biner 10 karakter (10 bit) yang bit paling signifikan adalah bit tanda. Sisa 9 bit adalah bit besaran. Angka negatif dinyatakan dengan menggunakan notasi dua pelengkap."
			},
			places: {
				name: "places",
				detail: "Opsional. Jumlah karakter yang digunakan. Jika places dihilangkan, DEC2BIN menggunakan jumlah minimal karakter yang diperlukan. Places berguna untuk mengisi nilai hasil dengan awalan 0 (nol)."
			}
		}
	},
	DEC2HEX: {
		description: "Mengonversi bilangan desimal ke heksadesimal.",
		abstract: "Mengonversi bilangan desimal ke heksadesimal.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/dec2hex-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. Bilangan bulat desimal yang ingin Anda konversi. Jika angkanya negatif, tempat diabaikan dan DEC2HEX mengembalikan angka heksadesimal 10 karakter (40 bit) yang bit paling signifikan adalah bit tanda. Sisa 39 bit adalah bit besaran. Angka negatif dinyatakan dengan menggunakan notasi dua pelengkap."
			},
			places: {
				name: "places",
				detail: "Opsional. Jumlah karakter yang digunakan. Jika tempat dihilangkan, DEC2HEX menggunakan jumlah minimal karakter yang diperlukan. Places berguna untuk mengisi nilai hasil dengan awalan 0 (nol)."
			}
		}
	},
	DEC2OCT: {
		description: "Mengonversi bilangan desimal ke oktal.",
		abstract: "Mengonversi bilangan desimal ke oktal.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/dec2oct-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. Bilangan bulat desimal yang ingin Anda konversi. Jika bilangannya negatif, tempat diabaikan dan DEC2OCT mengembalikan bilangan oktal 10 karakter (30 bit) yang bit paling signifikan adalah bit tanda. Ke-29 bit sisanya adalah bit yang besar. Angka negatif dinyatakan dengan menggunakan notasi dua pelengkap."
			},
			places: {
				name: "places",
				detail: "Opsional. Jumlah karakter yang digunakan. Jika tempat dihilangkan, DEC2OCT menggunakan jumlah minimal karakter yang diperlukan. Places berguna untuk mengisi nilai hasil dengan awalan 0 (nol)."
			}
		}
	},
	DELTA: {
		description: "Menguji apakah dua nilai adalah sama. Mengembalikan 1 jika number1 = number2; jika tidak, mengembalikan 0. Gunakan fungsi ini untuk memfilter sekumpulan nilai. Misalnya, dengan merangkum beberapa fungsi DELTA, Anda menghitung perhitungan pasangan setara. Fungsi ini juga dikenal sebagai fungsi Kronecker Delta.",
		abstract: "Menguji apakah dua nilai adalah sama. Mengembalikan 1 jika number1 = number2; jika tidak, mengembalikan 0. Gunakan fungsi ini untuk memfilter sekumpulan nilai. Misalnya, dengan merangkum beberapa fungsi DELTA, Anda menghitung perhitungan pasangan setara. Fungsi ini juga dikenal sebagai fungsi Kronecker Delta.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/delta-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Diperlukan. Angka pertama."
			},
			number2: {
				name: "number2",
				detail: "Opsional. Angka kedua. Jika dihilangkan, angka2 diasumsikan sebagai nol."
			}
		}
	},
	ERF: {
		description: "Mengembalikan fungsi kesalahan yang terintegrasi antara lower_limit dan upper_limit.",
		abstract: "Mengembalikan fungsi kesalahan yang terintegrasi antara lower_limit dan upper_limit.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/erf-function"
		}],
		functionParameter: {
			lowerLimit: {
				name: "lower_limit",
				detail: "Diperlukan. Batas bawah untuk mengintegrasikan ERF."
			},
			upperLimit: {
				name: "upper_limit",
				detail: "Opsional. Batas atas untuk mengintegrasikan ERF. Jika dihilangkan, ERF berintegrasi antara nol dan lower_limit."
			}
		}
	},
	ERF_PRECISE: {
		description: "Mengembalikan fungsi kesalahan.",
		abstract: "Mengembalikan fungsi kesalahan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/erf-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Diperlukan. Batas bawah untuk mengintegrasikan ERF.PRECISE."
		} }
	},
	ERFC: {
		description: "Mengembalikan fungsi ERF komplementer yang terintegrasi antara x dan tak terhingga.",
		abstract: "Mengembalikan fungsi ERF komplementer yang terintegrasi antara x dan tak terhingga.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/erfc-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Diperlukan. Batas bawah untuk mengintegrasikan ERFC."
		} }
	},
	ERFC_PRECISE: {
		description: "Mengembalikan fungsi ERF komplementer yang terintegrasi antara x dan tak terhingga.",
		abstract: "Mengembalikan fungsi ERF komplementer yang terintegrasi antara x dan tak terhingga.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/erfc-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Diperlukan. Batas bawah untuk mengintegrasikan ERFC.PRECISE."
		} }
	},
	GESTEP: {
		description: "Mengembalikan 1 jika angka ≥ langkah; mengembalikan 0 (zero) jika sebaliknya. Gunakan fungsi ini untuk memfilter sekumpulan nilai. Misalnya, dengan menjumlahkan beberapa fungsi GESTEP, Anda menghitung jumlah nilai yang melebihi ambang batas.",
		abstract: "Mengembalikan 1 jika angka ≥ langkah; mengembalikan 0 (zero) jika sebaliknya. Gunakan fungsi ini untuk memfilter sekumpulan nilai. Misalnya, dengan menjumlahkan beberapa fungsi GESTEP, Anda menghitung jumlah nilai yang melebihi ambang batas.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/gestep-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. Nilai untuk diuji berdasarkan langkah."
			},
			step: {
				name: "step",
				detail: "Opsional. Nilai ambang batas. Jika sebuah nilai untuk angka dihilangkan, GESTEP menggunakan nol."
			}
		}
	},
	HEX2BIN: {
		description: "Mengonversi angka heksadesimal ke biner.",
		abstract: "Mengonversi angka heksadesimal ke biner.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/hex2bin-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. Angka heksadesimal yang ingin dikonversi. Angka tidak boleh berisi lebih dari 10 karakter. Bit angka yang paling signifikan adalah sign bit (bit ke-40 dari kanan). Sisa 9 bit adalah bit besaran. Angka negatif dinyatakan dengan menggunakan notasi dua pelengkap."
			},
			places: {
				name: "places",
				detail: "Opsional. Jumlah karakter yang digunakan. Jika tempat dihilangkan, HEX2BIN menggunakan jumlah minimum karakter yang diperlukan. Tempat berguna untuk mengisi nilai pengembalian dengan jarak antar baris 0 (nol)."
			}
		}
	},
	HEX2DEC: {
		description: "Mengonversi angka heksadesimal ke desimal.",
		abstract: "Mengonversi angka heksadesimal ke desimal.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/hex2dec-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan. Angka heksadesimal yang ingin dikonversi. Angka tidak boleh berisi lebih dari 10 karakter (40 bit). Bit angka yang paling penting adalah bit tanda. Sisa 39 bit adalah bit besaran. Angka negatif dinyatakan dengan menggunakan notasi dua pelengkap."
		} }
	},
	HEX2OCT: {
		description: "Mengonversi angka heksadesimal ke oktal.",
		abstract: "Mengonversi angka heksadesimal ke oktal.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/hex2oct-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. Angka heksadesimal yang ingin dikonversi. Angka tidak boleh berisi lebih dari 10 karakter. Bit angka yang paling penting adalah bit tanda. Sisa 39 bit adalah bit besaran. Angka negatif dinyatakan dengan menggunakan notasi dua pelengkap."
			},
			places: {
				name: "places",
				detail: "Opsional. Jumlah karakter yang digunakan. Jika tempat dihilangkan, HEX2OCT menggunakan jumlah minimum karakter yang diperlukan. Tempat berguna untuk mengisi nilai pengembalian dengan jarak antar baris 0 (nol)."
			}
		}
	},
	IMABS: {
		description: "Mengembalikan nilai mutlak (modulus) bilangan kompleks dalam format teks x + yi atau x + yj.",
		abstract: "Mengembalikan nilai mutlak (modulus) bilangan kompleks dalam format teks x + yi atau x + yj.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/imabs-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Diperlukan. Bilangan kompleks yang ingin Anda dapatkan nilai mutlaknya."
		} }
	},
	IMAGINARY: {
		description: "Mengembalikan koefisien imajiner bilangan kompleks dalam format teks x + yi atau x + yj.",
		abstract: "Mengembalikan koefisien imajiner bilangan kompleks dalam format teks x + yi atau x + yj.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/imaginary-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Diperlukan. Bilangan kompleks yang ingin Anda dapatkan koefisien imajinernya."
		} }
	},
	IMARGUMENT: {
		description: "Mengembalikan argumen (theta), sudut yang dinyatakan dalam radian, seperti:",
		abstract: "Mengembalikan argumen (theta), sudut yang dinyatakan dalam radian, seperti:",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/imargument-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Diperlukan. Bilangan kompleks yang Anda inginkan untuk argumen ."
		} }
	},
	IMCONJUGATE: {
		description: "Mengembalikan konjugasi kompleks bilangan kompleks dalam format teks x + yi atau x + yj.",
		abstract: "Mengembalikan konjugasi kompleks bilangan kompleks dalam format teks x + yi atau x + yj.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/imconjugate-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Diperlukan. Bilangan kompleks yang Anda inginkan konjugasinya."
		} }
	},
	IMCOS: {
		description: "Mengembalikan kosinus bilangan kompleks dalam format teks x + yi atau x + yj.",
		abstract: "Mengembalikan kosinus bilangan kompleks dalam format teks x + yi atau x + yj.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/imcos-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Diperlukan. Bilangan kompleks yang Anda inginkan kosinusnya."
		} }
	},
	IMCOSH: {
		description: "Mengembalikan kosinus hiperbolik bilangan kompleks dalam format teks x+yi atau x+yj.",
		abstract: "Mengembalikan kosinus hiperbolik bilangan kompleks dalam format teks x+yi atau x+yj.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/imcosh-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Diperlukan. Bilangan kompleks yang Anda inginkan kosinus hiperboliknya."
		} }
	},
	IMCOT: {
		description: "Mengembalikan kotangen bilangan kompleks dalam format teks x+yi atau x+yj.",
		abstract: "Mengembalikan kotangen bilangan kompleks dalam format teks x+yi atau x+yj.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/imcot-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Bilangan kompleks yang ingin Anda cari kotangennya."
		} }
	},
	IMCOTH: {
		description: "Fungsi IMCOTH mengembalikan kotangen hiperbolik dari bilangan kompleks yang diberikan. Misalnya, untuk bilangan kompleks \"x+yi\", fungsi ini mengembalikan \"coth(x+yi)\".",
		abstract: "Fungsi IMCOTH mengembalikan kotangen hiperbolik dari bilangan kompleks yang diberikan. Misalnya, untuk bilangan kompleks \"x+yi\", fungsi ini mengembalikan \"coth(x+yi)\".",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9366256?hl=id"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Bilangan kompleks yang ingin Anda cari kotangen hiperboliknya. Nilai ini dapat berupa hasil fungsi COMPLEX, bilangan riil yang ditafsirkan sebagai bilangan kompleks dengan bagian imajiner 0, atau teks berformat “x+yi”, dengan x dan y berupa angka."
		} }
	},
	IMCSC: {
		description: "Mengembalikan kosekan bilangan kompleks dalam format teks x+yi atau x+yj.",
		abstract: "Mengembalikan kosekan bilangan kompleks dalam format teks x+yi atau x+yj.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/imcsc-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Diperlukan. Bilangan kompleks yang Anda inginkan kosekannya."
		} }
	},
	IMCSCH: {
		description: "Mengembalikan kosekan hiperbolik dari bilangan kompleks dalam format teks x+yi atau x+yj.",
		abstract: "Mengembalikan kosekan hiperbolik dari bilangan kompleks dalam format teks x+yi atau x+yj.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/imcsch-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Diperlukan. Bilangan kompleks yang ingin Anda dapatkan kosekan hiperboliknya."
		} }
	},
	IMDIV: {
		description: "Mengembalikan hasil bagi dua bilangan kompleks dalam format teks x + yi atau x + yj.",
		abstract: "Mengembalikan hasil bagi dua bilangan kompleks dalam format teks x + yi atau x + yj.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/imdiv-function"
		}],
		functionParameter: {
			inumber1: {
				name: "inumber1",
				detail: "Diperlukan. Pembilang kompleks atau dividen."
			},
			inumber2: {
				name: "inumber2",
				detail: "Diperlukan. Penyebut kompleks atau pembagi."
			}
		}
	},
	IMEXP: {
		description: "Mengembalikan eksponensial bilangan kompleks dalam format teks x + yi atau x + yj.",
		abstract: "Mengembalikan eksponensial bilangan kompleks dalam format teks x + yi atau x + yj.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/imexp-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Diperlukan. Bilangan kompleks yang Anda inginkan ekponensialnya."
		} }
	},
	IMLN: {
		description: "Mengembalikan logaritma natural bilangan kompleks dalam format teks x + yi atau x + yj.",
		abstract: "Mengembalikan logaritma natural bilangan kompleks dalam format teks x + yi atau x + yj.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/imln-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Diperlukan. Bilangan kompleks yang ingin Anda dapatkan logaritma naturalnya."
		} }
	},
	IMLOG: {
		description: "Fungsi IMLOG mengembalikan logaritma bilangan kompleks untuk basis yang ditentukan.",
		abstract: "Fungsi IMLOG mengembalikan logaritma bilangan kompleks untuk basis yang ditentukan.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9366486?hl=id"
		}],
		functionParameter: {
			inumber: {
				name: "inumber",
				detail: "Nilai masukan fungsi logaritma. Angka dapat ditulis sebagai angka biasa, misalnya 1, untuk ditafsirkan sebagai bilangan riil, atau sebagai teks dalam tanda kutip untuk menentukan koefisien riil dan imajiner."
			},
			base: {
				name: "base",
				detail: "Basis yang digunakan untuk menghitung logaritma. Harus berupa bilangan riil positif."
			}
		}
	},
	IMLOG10: {
		description: "Mengembalikan logaritma umum (dasar 10) bilangan kompleks dalam format teks x + yi atau x + yj.",
		abstract: "Mengembalikan logaritma umum (dasar 10) bilangan kompleks dalam format teks x + yi atau x + yj.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/imlog10-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Diperlukan. Bilangan kompleks yang ingin Anda dapatkan logaritma umumnya."
		} }
	},
	IMLOG2: {
		description: "Mengembalikan logaritma basis 2 dari sebuah bilangan kompleks dalam format teks x + yi atau x + yj.",
		abstract: "Mengembalikan logaritma basis 2 dari sebuah bilangan kompleks dalam format teks x + yi atau x + yj.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/imlog2-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Diperlukan. Bilangan kompleks yang ingin Anda dapatkan logaritma basis 2-nya."
		} }
	},
	IMPOWER: {
		description: "Mengembalikan bilangan kompleks dalam format teks x + yi atau x + yj yang dinaikkan menjadi pangkat.",
		abstract: "Mengembalikan bilangan kompleks dalam format teks x + yi atau x + yj yang dinaikkan menjadi pangkat.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/impower-function"
		}],
		functionParameter: {
			inumber: {
				name: "inumber",
				detail: "Diperlukan. Bilangan kompleks yang ingin Anda jadikan pangkat."
			},
			number: {
				name: "number",
				detail: "Diperlukan. Angka yang ingin Anda pangkatkan ke bilangan kompleks."
			}
		}
	},
	IMPRODUCT: {
		description: "Mengembalikan hasil kali bilangan kompleks dari 1 sampai 255 dalam format teks x + yi atau x + yj.",
		abstract: "Mengembalikan hasil kali bilangan kompleks dari 1 sampai 255 dalam format teks x + yi atau x + yj.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/improduct-function"
		}],
		functionParameter: {
			inumber1: {
				name: "inumber1",
				detail: "1 hingga 255 bilangan kompleks yang akan dikalikan."
			},
			inumber2: {
				name: "inumber2",
				detail: "Bilangan kompleks berikutnya yang akan dikalikan."
			}
		}
	},
	IMREAL: {
		description: "Mengembalikan koefisien riil bilangan kompleks dalam format teks x + yi atau x + yj.",
		abstract: "Mengembalikan koefisien riil bilangan kompleks dalam format teks x + yi atau x + yj.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/imreal-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Diperlukan. Bilangan kompleks yang ingin Anda dapatkan koefisien riilnya."
		} }
	},
	IMSEC: {
		description: "Mengembalikan sekan bilangan kompleks dalam format teks x+yi atau x+yj.",
		abstract: "Mengembalikan sekan bilangan kompleks dalam format teks x+yi atau x+yj.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/imsec-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Diperlukan. Bilangan kompleks yang ingin Anda dapatkan sekannya."
		} }
	},
	IMSECH: {
		description: "Mengembalikan sekan hiperbolik bilangan kompleks dalam format teks x+yi atau x+yj.",
		abstract: "Mengembalikan sekan hiperbolik bilangan kompleks dalam format teks x+yi atau x+yj.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/imsech-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Diperlukan. Bilangan kompleks yang ingin Anda dapatkan sekan hiperboliknya."
		} }
	},
	IMSIN: {
		description: "Mengembalikan sinus dari bilangan kompleks.",
		abstract: "Mengembalikan sinus dari bilangan kompleks.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/imsin-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Bilangan kompleks yang ingin Anda cari sinusnya."
		} }
	},
	IMSINH: {
		description: "Mengembalikan sinus hiperbolik dari bilangan kompleks.",
		abstract: "Mengembalikan sinus hiperbolik dari bilangan kompleks.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/imsinh-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Bilangan kompleks yang ingin Anda cari sinus hiperboliknya."
		} }
	},
	IMSQRT: {
		description: "Mengembalikan akar kuadrat dari bilangan kompleks dalam format teks x + yi atau x + yj.",
		abstract: "Mengembalikan akar kuadrat dari bilangan kompleks dalam format teks x + yi atau x + yj.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/imsqrt-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Diperlukan. Bilangan kompleks yang ingin Anda dapatkan akar kuadratnya."
		} }
	},
	IMSUB: {
		description: "Mengembalikan selisih dari dua bilangan kompleks dalam format teks x + yi atau x + yj.",
		abstract: "Mengembalikan selisih dari dua bilangan kompleks dalam format teks x + yi atau x + yj.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/imsub-function"
		}],
		functionParameter: {
			inumber1: {
				name: "inumber1",
				detail: "Diperlukan. Bilangan kompleks yang ingin Anda kurangi dengan inumber2."
			},
			inumber2: {
				name: "inumber2",
				detail: "Diperlukan. Bilangan kompleks untuk mengurangi inumber1."
			}
		}
	},
	IMSUM: {
		description: "Mengembalikan jumlah dari dua bilangan kompleks dalam format teks x + yi atau x + yj.",
		abstract: "Mengembalikan jumlah dari dua bilangan kompleks dalam format teks x + yi atau x + yj.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/imsum-function"
		}],
		functionParameter: {
			inumber1: {
				name: "inumber1",
				detail: "1 hingga 255 bilangan kompleks yang akan dijumlahkan."
			},
			inumber2: {
				name: "inumber2",
				detail: "Bilangan kompleks berikutnya yang akan dijumlahkan."
			}
		}
	},
	IMTAN: {
		description: "Mengembalikan tangen bilangan kompleks dalam format teks x+yi atau x+yj.",
		abstract: "Mengembalikan tangen bilangan kompleks dalam format teks x+yi atau x+yj.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/imtan-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Diperlukan. Bilangan kompleks yang ingin Anda dapatkan tangennya."
		} }
	},
	IMTANH: {
		description: "Fungsi IMTANH mengembalikan tangen hiperbolik dari bilangan kompleks yang diberikan. Misalnya, untuk bilangan kompleks \"x+yi\", fungsi ini mengembalikan \"tanh(x+yi)\".",
		abstract: "Fungsi IMTANH mengembalikan tangen hiperbolik dari bilangan kompleks yang diberikan. Misalnya, untuk bilangan kompleks \"x+yi\", fungsi ini mengembalikan \"tanh(x+yi)\".",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9366655?hl=id"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Bilangan kompleks yang ingin Anda cari tangen hiperboliknya. Nilai ini dapat berupa hasil fungsi COMPLEX, bilangan riil yang ditafsirkan sebagai bilangan kompleks dengan bagian imajiner 0, atau teks berformat “x+yi”, dengan x dan y berupa angka."
		} }
	},
	OCT2BIN: {
		description: "Mengonversi angka oktal ke biner.",
		abstract: "Mengonversi angka oktal ke biner.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/oct2bin-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. Angka oktal yang ingin Anda konversikan. Angka tidak boleh berisi lebih dari 10 karakter. Bit angka paling signifikan adalah bit tanda. Ke-29 bit sisanya adalah bit yang besar. Angka negatif dinyatakan dengan menggunakan notasi dua pelengkap."
			},
			places: {
				name: "places",
				detail: "Opsional. Jumlah karakter yang digunakan. Jika places dihilangkan, OCT2BIN menggunakan jumlah minimum karakter yang diperlukan. Places berguna untuk mengisi nilai hasil dengan awalan 0 (nol)."
			}
		}
	},
	OCT2DEC: {
		description: "Mengonversi angka oktal ke desimal.",
		abstract: "Mengonversi angka oktal ke desimal.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/oct2dec-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan. Angka oktal yang ingin Anda konversikan. Angka tidak boleh berisi lebih dari 10 karakter oktal (30 bit). Bit angka paling signifikan adalah bit tanda. Ke-29 bit sisanya adalah bit yang besar. Angka negatif dinyatakan dengan menggunakan notasi dua pelengkap."
		} }
	},
	OCT2HEX: {
		description: "Mengonversi angka oktal ke heksadesimal.",
		abstract: "Mengonversi angka oktal ke heksadesimal.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/oct2hex-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. Angka oktal yang ingin Anda konversikan. Angka tidak boleh berisi lebih dari 10 karakter oktal (30 bit). Bit angka paling signifikan adalah bit tanda. Ke-29 bit sisanya adalah bit yang besar. Angka negatif dinyatakan dengan menggunakan notasi dua pelengkap."
			},
			places: {
				name: "places",
				detail: "Opsional. Jumlah karakter yang digunakan. Jika tempat dikosongkan, OCT2HEX menggunakan jumlah minimum karakter yang diperlukan. Places berguna untuk mengisi nilai hasil dengan awalan 0 (nol)."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/financial/id-ID.ts
const locale$9 = {
	ACCRINT: {
		description: "Mengembalikan bunga akrual untuk sekuritas yang membayar bunga secara berkala.",
		abstract: "Mengembalikan bunga akrual untuk sekuritas yang membayar bunga secara berkala.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/accrint-function"
		}],
		functionParameter: {
			issue: {
				name: "issue",
				detail: "Diperlukan. Tanggal penerbitan sekuritas."
			},
			firstInterest: {
				name: "first_interest",
				detail: "Diperlukan. Tanggal bunga pertama sekurangan."
			},
			settlement: {
				name: "settlement",
				detail: "Diperlukan. Tanggal penyelesaian sekuritas. Tanggal penyelesaian sekuritas adalah tanggal setelah tanggal terbit saat sekuritas diperdagangkan kepada pembeli."
			},
			rate: {
				name: "rate",
				detail: "Diperlukan. Suku bunga kupon tahunan sekuritas."
			},
			par: {
				name: "par",
				detail: "Diperlukan. Nilai nominal sekuritas. Jika Anda menghapus par, ACCRINT menggunakan $1.000."
			},
			frequency: {
				name: "frequency",
				detail: "Diperlukan. Jumlah kupon pembayaran per tahun. Untuk pembayaran tahunan, frekuensi = 1; untuk semi tahunan, frekuensi = 2; untuk triwulan, frekuensi = 4."
			},
			basis: {
				name: "basis",
				detail: "Opsional. Tipe basis perhitungan hari untuk digunakan."
			},
			calcMethod: {
				name: "calc_method",
				detail: "Opsional. Nilai logika yang menentukan cara menghitung total bunga akrual ketika tanggal penyelesaian lebih lambat dari tanggal first_interest. Nilai TRUE (1) mengembalikan total bunga akrual dari penerbitan ke penyelesaian. Nilai FALSE (0) mengembalikan bunga akrual dari first_interest ke penyelesaian. Jika Anda tidak memasukkan argumen, maka argumen akan menjadi TRUE secara default."
			}
		}
	},
	ACCRINTM: {
		description: "Mengembalikan bunga akrual untuk sekuritas yang membayar bunga pada saat jatuh tempo.",
		abstract: "Mengembalikan bunga akrual untuk sekuritas yang membayar bunga pada saat jatuh tempo.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/accrintm-function"
		}],
		functionParameter: {
			issue: {
				name: "issue",
				detail: "Diperlukan. Tanggal penerbitan sekuritas."
			},
			settlement: {
				name: "settlement",
				detail: "Diperlukan. Tanggal jatuh tempo sekuritas."
			},
			rate: {
				name: "rate",
				detail: "Diperlukan. Suku bunga kupon tahunan sekuritas."
			},
			par: {
				name: "par",
				detail: "Diperlukan. Nilai nominal sekuritas. Jika Anda menghapus par, ACCRINTM menggunakan $1.000."
			},
			basis: {
				name: "basis",
				detail: "Opsional. Tipe basis perhitungan hari untuk digunakan."
			}
		}
	},
	AMORDEGRC: {
		description: "Mengembalikan depresiasi untuk setiap periode akuntansi. Fungsi ini diberikan untuk sistem akuntansi Prancis. Jika aset dibeli dalam pertengahan masa akuntansi, depresiasi prorata diperhitungkan. Fungsi tersebut mirip dengan AMORLINC, kecuali bahwa koefisien depresiasi diterapkan dalam perhitungan yang bergantung pada umur aset tersebut.",
		abstract: "Mengembalikan depresiasi untuk setiap periode akuntansi. Fungsi ini diberikan untuk sistem akuntansi Prancis. Jika aset dibeli dalam pertengahan masa akuntansi, depresiasi prorata diperhitungkan. Fungsi tersebut mirip dengan AMORLINC, kecuali bahwa koefisien depresiasi diterapkan dalam perhitungan yang bergantung pada umur aset tersebut.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/amordegrc-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Diperlukan. Biaya aset."
			},
			datePurchased: {
				name: "date_purchased",
				detail: "Diperlukan. Tanggal pembelian aset."
			},
			firstPeriod: {
				name: "first_period",
				detail: "Diperlukan. Tanggal berakhirnya periode pertama."
			},
			salvage: {
				name: "salvage",
				detail: "Diperlukan. Nilai sisa di akhir umur pakai aset."
			},
			period: {
				name: "period",
				detail: "Diperlukan. Periode."
			},
			rate: {
				name: "rate",
				detail: "Diperlukan. Tingkat depresiasi."
			},
			basis: {
				name: "basis",
				detail: "Opsional. Basis tahun yang digunakan."
			}
		}
	},
	AMORLINC: {
		description: "Mengembalikan depresiasi untuk setiap periode akuntansi. Fungsi ini diberikan untuk sistem akuntansi Prancis. Jika aset dibeli dalam pertengahan periode akuntansi, depresiasi prorata diperhitungkan.",
		abstract: "Mengembalikan depresiasi untuk setiap periode akuntansi. Fungsi ini diberikan untuk sistem akuntansi Prancis. Jika aset dibeli dalam pertengahan periode akuntansi, depresiasi prorata diperhitungkan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/amorlinc-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Diperlukan. Biaya aset."
			},
			datePurchased: {
				name: "date_purchased",
				detail: "Diperlukan. Tanggal pembelian aset."
			},
			firstPeriod: {
				name: "first_period",
				detail: "Diperlukan. Tanggal berakhirnya periode pertama."
			},
			salvage: {
				name: "salvage",
				detail: "Diperlukan. Nilai sisa di akhir umur pakai aset."
			},
			period: {
				name: "period",
				detail: "Diperlukan. Periode."
			},
			rate: {
				name: "rate",
				detail: "Diperlukan. Tingkat depresiasi."
			},
			basis: {
				name: "basis",
				detail: "Opsional. Basis tahun yang digunakan."
			}
		}
	},
	COUPDAYBS: {
		description: "Fungsi COUPDAYBS mengembalikan jumlah hari dari awal periode kupon sampai tanggal penyelesaian.",
		abstract: "Fungsi COUPDAYBS mengembalikan jumlah hari dari awal periode kupon sampai tanggal penyelesaian.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/coupdaybs-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Diperlukan. Tanggal penyelesaian sekuritas. Tanggal penyelesaian sekuritas adalah tanggal setelah tanggal terbit saat sekuritas diperdagangkan kepada pembeli."
			},
			maturity: {
				name: "maturity",
				detail: "Diperlukan. Tanggal jatuh tempo sekuritas. Tanggal jatuh tempo adalah tanggal ketika sekuritas telah kedaluwarsa."
			},
			frequency: {
				name: "frequency",
				detail: "Diperlukan. Jumlah kupon pembayaran per tahun. Untuk pembayaran tahunan, frekuensi = 1; untuk semi tahunan, frekuensi = 2; untuk triwulan, frekuensi = 4."
			},
			basis: {
				name: "basis",
				detail: "Opsional. Tipe basis perhitungan hari untuk digunakan."
			}
		}
	},
	COUPDAYS: {
		description: "Mengembalikan jumlah hari dalam periode kupon yang berisi tanggal penyelesaian.",
		abstract: "Mengembalikan jumlah hari dalam periode kupon yang berisi tanggal penyelesaian.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/coupdays-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Diperlukan. Tanggal penyelesaian sekuritas. Tanggal penyelesaian sekuritas adalah tanggal setelah tanggal terbit saat sekuritas diperdagangkan kepada pembeli."
			},
			maturity: {
				name: "maturity",
				detail: "Diperlukan. Tanggal jatuh tempo sekuritas. Tanggal jatuh tempo adalah tanggal ketika sekuritas telah kedaluwarsa."
			},
			frequency: {
				name: "frequency",
				detail: "Diperlukan. Jumlah kupon pembayaran per tahun. Untuk pembayaran tahunan, frekuensi = 1; untuk semi tahunan, frekuensi = 2; untuk triwulan, frekuensi = 4."
			},
			basis: {
				name: "basis",
				detail: "Opsional. Tipe basis perhitungan hari untuk digunakan."
			}
		}
	},
	COUPDAYSNC: {
		description: "Mengembalikan jumlah hari sejak tanggal penyelesaian sampai tanggal kupon berikutnya.",
		abstract: "Mengembalikan jumlah hari sejak tanggal penyelesaian sampai tanggal kupon berikutnya.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/coupdaysnc-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Diperlukan. Tanggal penyelesaian sekuritas. Tanggal penyelesaian sekuritas adalah tanggal setelah tanggal terbit saat sekuritas diperdagangkan kepada pembeli."
			},
			maturity: {
				name: "maturity",
				detail: "Diperlukan. Tanggal jatuh tempo sekuritas. Tanggal jatuh tempo adalah tanggal ketika sekuritas telah kedaluwarsa."
			},
			frequency: {
				name: "frequency",
				detail: "Diperlukan. Jumlah kupon pembayaran per tahun. Untuk pembayaran tahunan, frekuensi = 1; untuk semi tahunan, frekuensi = 2; untuk triwulan, frekuensi = 4."
			},
			basis: {
				name: "basis",
				detail: "Opsional. Tipe basis perhitungan hari untuk digunakan."
			}
		}
	},
	COUPNCD: {
		description: "Mengembalikan angka yang menyatakan tanggal kupon berikutnya setelah tanggal penyelesaian.",
		abstract: "Mengembalikan angka yang menyatakan tanggal kupon berikutnya setelah tanggal penyelesaian.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/coupncd-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Diperlukan. Tanggal penyelesaian sekuritas. Tanggal penyelesaian sekuritas adalah tanggal setelah tanggal terbit saat sekuritas diperdagangkan kepada pembeli."
			},
			maturity: {
				name: "maturity",
				detail: "Diperlukan. Tanggal jatuh tempo sekuritas. Tanggal jatuh tempo adalah tanggal ketika sekuritas telah kedaluwarsa."
			},
			frequency: {
				name: "frequency",
				detail: "Diperlukan. Jumlah kupon pembayaran per tahun. Untuk pembayaran tahunan, frekuensi = 1; untuk semi tahunan, frekuensi = 2; untuk triwulan, frekuensi = 4."
			},
			basis: {
				name: "basis",
				detail: "Opsional. Tipe basis perhitungan hari untuk digunakan."
			}
		}
	},
	COUPNUM: {
		description: "Mengembalikan jumlah kupon yang harus dibayar antara tanggal penyelesaian dan tanggal jatuh tempo, yang dibulatkan ke atas ke kupon utuh terdekat.",
		abstract: "Mengembalikan jumlah kupon yang harus dibayar antara tanggal penyelesaian dan tanggal jatuh tempo, yang dibulatkan ke atas ke kupon utuh terdekat.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/coupnum-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Diperlukan. Tanggal penyelesaian sekuritas. Tanggal penyelesaian sekuritas adalah tanggal setelah tanggal terbit saat sekuritas diperdagangkan kepada pembeli."
			},
			maturity: {
				name: "maturity",
				detail: "Diperlukan. Tanggal jatuh tempo sekuritas. Tanggal jatuh tempo adalah tanggal ketika sekuritas telah kedaluwarsa."
			},
			frequency: {
				name: "frequency",
				detail: "Diperlukan. Jumlah kupon pembayaran per tahun. Untuk pembayaran tahunan, frekuensi = 1; untuk semi tahunan, frekuensi = 2; untuk triwulan, frekuensi = 4."
			},
			basis: {
				name: "basis",
				detail: "Opsional. Tipe basis perhitungan hari untuk digunakan."
			}
		}
	},
	COUPPCD: {
		description: "Mengembalikan angka yang menyatakan tanggal kupon sebelumnya sebelum tanggal pelunasan.",
		abstract: "Mengembalikan angka yang menyatakan tanggal kupon sebelumnya sebelum tanggal pelunasan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/couppcd-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Diperlukan. Tanggal penyelesaian sekuritas. Tanggal penyelesaian sekuritas adalah tanggal setelah tanggal terbit saat sekuritas diperdagangkan kepada pembeli."
			},
			maturity: {
				name: "maturity",
				detail: "Diperlukan. Tanggal jatuh tempo sekuritas. Tanggal jatuh tempo adalah tanggal ketika sekuritas telah kedaluwarsa."
			},
			frequency: {
				name: "frequency",
				detail: "Diperlukan. Jumlah kupon pembayaran per tahun. Untuk pembayaran tahunan, frekuensi = 1; untuk semi tahunan, frekuensi = 2; untuk triwulan, frekuensi = 4."
			},
			basis: {
				name: "basis",
				detail: "Opsional. Tipe basis perhitungan hari untuk digunakan."
			}
		}
	},
	CUMIPMT: {
		description: "Mengembalikan bunga kumulatif yang dibayarkan pada pinjaman antara start_period dan end_period.",
		abstract: "Mengembalikan bunga kumulatif yang dibayarkan pada pinjaman antara start_period dan end_period.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/cumipmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Diperlukan. Suku bunga."
			},
			nper: {
				name: "nper",
				detail: "Diperlukan. Total jumlah periode pembayaran."
			},
			pv: {
				name: "pv",
				detail: "Diperlukan. Nilai saat ini."
			},
			startPeriod: {
				name: "start_period",
				detail: "Diperlukan. Periode pertama dalam perhitungan. Periode pembayaran dinomori mulai dari 1."
			},
			endPeriod: {
				name: "end_period",
				detail: "Diperlukan. Periode terakhir dalam perhitungan."
			},
			type: {
				name: "type",
				detail: "Diperlukan. Waktu pembayaran."
			}
		}
	},
	CUMPRINC: {
		description: "Mengembalikan pokok kumulatif yang dibayarkan pada pinjaman antara start_period dan end_period.",
		abstract: "Mengembalikan pokok kumulatif yang dibayarkan pada pinjaman antara start_period dan end_period.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/cumprinc-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Diperlukan. Suku bunga."
			},
			nper: {
				name: "nper",
				detail: "Diperlukan. Total jumlah periode pembayaran."
			},
			pv: {
				name: "pv",
				detail: "Diperlukan. Nilai saat ini."
			},
			startPeriod: {
				name: "start_period",
				detail: "Diperlukan. Periode pertama dalam perhitungan. Periode pembayaran dinomori mulai dari 1."
			},
			endPeriod: {
				name: "end_period",
				detail: "Diperlukan. Periode terakhir dalam perhitungan."
			},
			type: {
				name: "type",
				detail: "Diperlukan. Waktu pembayaran."
			}
		}
	},
	DB: {
		description: "Mengembalikan depresiasi aset untuk periode yang ditentukan dengan menggunakan metode neraca menurun-tetap.",
		abstract: "Mengembalikan depresiasi aset untuk periode yang ditentukan dengan menggunakan metode neraca menurun-tetap.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/db-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Diperlukan. Biaya awal aset."
			},
			salvage: {
				name: "salvage",
				detail: "Diperlukan. Nilai di akhir depresiasi (kadang-kadang disebut nilai sisa aset)."
			},
			life: {
				name: "life",
				detail: "Diperlukan. Jumlah periode selama aset disusutkan (kadang-kadang disebut umur manfaat aset)."
			},
			period: {
				name: "period",
				detail: "Diperlukan. Periode saat Anda ingin menghitung depresiasi. Periode harus menggunakan unit yang sama seperti umur pakai."
			},
			month: {
				name: "month",
				detail: "Opsional. Jumlah bulan dalam tahun pertama. Jika bulan dihilangkan, diasumsikan sebagai 12."
			}
		}
	},
	DDB: {
		description: "Mengembalikan depresiasi aset untuk periode yang ditentukan dengan menggunakan metode neraca menurun-ganda atau metode lain yang Anda tentukan.",
		abstract: "Mengembalikan depresiasi aset untuk periode yang ditentukan dengan menggunakan metode neraca menurun-ganda atau metode lain yang Anda tentukan.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/ddb-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Diperlukan. Biaya awal aset."
			},
			salvage: {
				name: "salvage",
				detail: "Diperlukan. Nilai di akhir depresiasi (kadang-kadang disebut nilai sisa aset). Nilai ini dapat berupa 0."
			},
			life: {
				name: "life",
				detail: "Diperlukan. Jumlah periode selama aset disusutkan (kadang-kadang disebut umur manfaat aset)."
			},
			period: {
				name: "period",
				detail: "Diperlukan. Periode saat Anda ingin menghitung depresiasi. Periode harus menggunakan unit yang sama seperti umur pakai."
			},
			factor: {
				name: "factor",
				detail: "Opsional. Kecepatan penurunan saldo. Jika faktor diabaikan, maka diasumsikan sebagai 2 (metode saldo menurun-ganda)."
			}
		}
	},
	DISC: {
		description: "Mengembalikan tingkat diskon sekuritas.",
		abstract: "Mengembalikan tingkat diskon sekuritas.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/disc-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Diperlukan. Tanggal penyelesaian sekuritas. Tanggal penyelesaian sekuritas adalah tanggal setelah tanggal terbit saat sekuritas diperdagangkan kepada pembeli."
			},
			maturity: {
				name: "maturity",
				detail: "Diperlukan. Tanggal jatuh tempo sekuritas. Tanggal jatuh tempo adalah tanggal ketika sekuritas telah kedaluwarsa."
			},
			pr: {
				name: "pr",
				detail: "Diperlukan. Harga sekuritas per nilai nominal $100."
			},
			redemption: {
				name: "redemption",
				detail: "Diperlukan. Nilai penebusan sekuritas per nilai nominal $100."
			},
			basis: {
				name: "basis",
				detail: "Opsional. Tipe basis perhitungan hari untuk digunakan."
			}
		}
	},
	DOLLARDE: {
		description: "Mengonversi harga dolar yang dinyatakan sebagai bagian bilangan bulat dan bagian pecahan, seperti 1,02, ke dalam harga dolar yang dinyatakan dalam bilangan desimal. Angka dolar pecahan kadang-kadang digunakan untuk harga sekuritas.",
		abstract: "Mengonversi harga dolar yang dinyatakan sebagai bagian bilangan bulat dan bagian pecahan, seperti 1,02, ke dalam harga dolar yang dinyatakan dalam bilangan desimal. Angka dolar pecahan kadang-kadang digunakan untuk harga sekuritas.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/dollarde-function"
		}],
		functionParameter: {
			fractionalDollar: {
				name: "fractional_dollar",
				detail: "Diperlukan. Angka yang dinyatakan sebagai bagian bilangan bulat dan bagian pecahan, yang dipisahkan oleh simbol desimal."
			},
			fraction: {
				name: "fraction",
				detail: "Diperlukan. Bilangan bulat yang akan digunakan dalam denominator pecahan."
			}
		}
	},
	DOLLARFR: {
		description: "Gunakan DOLLARFR untuk mengonversi bilangan desimal ke angka dolar pecahan, seperti harga saham.",
		abstract: "Gunakan DOLLARFR untuk mengonversi bilangan desimal ke angka dolar pecahan, seperti harga saham.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/dollarfr-function"
		}],
		functionParameter: {
			decimalDollar: {
				name: "decimal_dollar",
				detail: "Diperlukan. Bilangan desimal."
			},
			fraction: {
				name: "fraction",
				detail: "Diperlukan. Bilangan bulat yang akan digunakan dalam denominator pecahan."
			}
		}
	},
	DURATION: {
		description: "Fungsi DURATION , salah satu fungsi Financial, mengembalikan durasi Macauley untuk nilai par yang diasumsikan sebesar $100. Durasi didefinisikan sebagai rata-rata tertimbang dari nilai arus kas saat ini, dan digunakan sebagai ukuran respons harga obligasi terhadap perubahan hasil.",
		abstract: "Fungsi DURATION , salah satu fungsi Financial, mengembalikan durasi Macauley untuk nilai par yang diasumsikan sebesar $100. Durasi didefinisikan sebagai rata-rata tertimbang dari nilai arus kas saat ini, dan digunakan sebagai ukuran respons harga obligasi terhadap perubahan hasil.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/duration-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Diperlukan. Tanggal penyelesaian sekuritas. Tanggal penyelesaian sekuritas adalah tanggal setelah tanggal terbit saat sekuritas diperdagangkan kepada pembeli."
			},
			maturity: {
				name: "maturity",
				detail: "Diperlukan. Tanggal jatuh tempo sekuritas. Tanggal jatuh tempo adalah tanggal ketika sekuritas telah kedaluwarsa."
			},
			coupon: {
				name: "coupon",
				detail: "Diperlukan. Suku bunga kupon tahunan sekuritas."
			},
			yld: {
				name: "yld",
				detail: "Diperlukan. Laba tahunan sekuritas."
			},
			frequency: {
				name: "frequency",
				detail: "Diperlukan. Jumlah kupon pembayaran per tahun. Untuk pembayaran tahunan, frekuensi = 1; untuk semi tahunan, frekuensi = 2; untuk triwulan, frekuensi = 4."
			},
			basis: {
				name: "basis",
				detail: "Opsional. Tipe basis perhitungan hari untuk digunakan."
			}
		}
	},
	EFFECT: {
		description: "Mengembalikan suku bunga tahunan efektif, dengan suku bunga nominal tahunan dan jumlah periode bunga majemuk per tahun.",
		abstract: "Mengembalikan suku bunga tahunan efektif, dengan suku bunga nominal tahunan dan jumlah periode bunga majemuk per tahun.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/effect-function"
		}],
		functionParameter: {
			nominalRate: {
				name: "nominal_rate",
				detail: "Diperlukan. Suku bunga nominal."
			},
			npery: {
				name: "npery",
				detail: "Diperlukan. Jumlah periode bunga majemuk per tahun."
			}
		}
	},
	FV: {
		description: "FV , salah satu fungsi keuangan , menghitung nilai investasi di masa depan berdasarkan suku bunga tetap. Anda bisa menggunakan FV dengan pembayaran berkala, tetap atau pembayaran sekaligus.",
		abstract: "FV , salah satu fungsi keuangan , menghitung nilai investasi di masa depan berdasarkan suku bunga tetap. Anda bisa menggunakan FV dengan pembayaran berkala, tetap atau pembayaran sekaligus.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/fv-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Diperlukan. Suku bunga tiap periode."
			},
			nper: {
				name: "nper",
				detail: "Diperlukan. Total jumlah periode pembayaran dalam satu anuitas."
			},
			pmt: {
				name: "pmt",
				detail: "Diperlukan. Pembayaran dilakukan tiap periode dan tidak dapat diganti selama anuitas belum berakhir. Umumnya, pmt mencakup biaya pokok dan bunga tetapi tidak ada biaya lain atau pajak. Jika pmt dihilangkan, Anda harus menyertakan argumen pv."
			},
			pv: {
				name: "pv",
				detail: "Opsional. Nilai saat ini, atau jumlah total harga sekarang dari serangkaian pembayaran di masa mendatang. Jika pv dihilangkan, maka dianggap 0 (nol), dan Anda harus menyertakan argumen pmt."
			},
			type: {
				name: "type",
				detail: "Opsional. Angka 0 atau 1 dan menunjukkan bahwa pembayaran telah jatuh tempo. Jika tipe dihilangkan, maka dianggap sebagai 0."
			}
		}
	},
	FVSCHEDULE: {
		description: "Mengembalikan nilai masa mendatang biaya pokok awal setelah menerapkan serangkaian campuran suku bunga. Gunakan FVSCHEDULE untuk menghitung nilai masa depan sebuah investasi dengan variabel atau suku bunga yang dapat disesuaikan.",
		abstract: "Mengembalikan nilai masa mendatang biaya pokok awal setelah menerapkan serangkaian campuran suku bunga. Gunakan FVSCHEDULE untuk menghitung nilai masa depan sebuah investasi dengan variabel atau suku bunga yang dapat disesuaikan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/fvschedule-function"
		}],
		functionParameter: {
			principal: {
				name: "principal",
				detail: "Diperlukan. Nilai saat ini."
			},
			schedule: {
				name: "schedule",
				detail: "Diperlukan. Array suku bunga yang diterapkan."
			}
		}
	},
	INTRATE: {
		description: "Mengembalikan suku bunga sekuritas investasi penuh.",
		abstract: "Mengembalikan suku bunga sekuritas investasi penuh.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/intrate-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Diperlukan. Tanggal penyelesaian sekuritas. Tanggal penyelesaian sekuritas adalah tanggal setelah tanggal terbit saat sekuritas diperdagangkan kepada pembeli."
			},
			maturity: {
				name: "maturity",
				detail: "Diperlukan. Tanggal jatuh tempo sekuritas. Tanggal jatuh tempo adalah tanggal ketika sekuritas telah kedaluwarsa."
			},
			investment: {
				name: "investment",
				detail: "Diperlukan. Jumlah yang diinvestasikan dalam sekuritas."
			},
			redemption: {
				name: "redemption",
				detail: "Diperlukan. Jumlah yang diterima pada saat jatuh tempo."
			},
			basis: {
				name: "basis",
				detail: "Opsional. Tipe basis perhitungan hari untuk digunakan."
			}
		}
	},
	IPMT: {
		description: "Mengembalikan pembayaran bunga untuk periode tertentu untuk investasi berdasarkan pembayaran berkala dan konstan serta suku bunga konstan.",
		abstract: "Mengembalikan pembayaran bunga untuk periode tertentu untuk investasi berdasarkan pembayaran berkala dan konstan serta suku bunga konstan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/ipmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Diperlukan. Suku bunga tiap periode."
			},
			per: {
				name: "per",
				detail: "Diperlukan. Periode yang ingin Anda cari bunganya dan harus berada dalam rentang 1 sampai nper."
			},
			nper: {
				name: "nper",
				detail: "Diperlukan. Total jumlah periode pembayaran dalam satu anuitas."
			},
			pv: {
				name: "pv",
				detail: "Diperlukan. Nilai saat ini, atau jumlah total harga sekarang dari serangkaian pembayaran di masa mendatang."
			},
			fv: {
				name: "fv",
				detail: "Opsional. Nilai masa mendatang, atau keseimbangan kas yang ingin Anda capai setelah pembayaran terakhir dilakukan. Jika fv dikosongkan, maka diasumsikan sebagai 0 (misalnya, nilai masa depan sebuah pinjaman adalah 0)."
			},
			type: {
				name: "type",
				detail: "Opsional. Angka 0 atau 1 dan menunjukkan bahwa pembayaran telah jatuh tempo. Jika tipe dihilangkan, maka dianggap sebagai 0."
			}
		}
	},
	IRR: {
		description: "Mengembalikan tingkat pengembalian internal untuk serangkaian arus kas yang dinyatakan oleh angka dalam nilai. Arus kas ini tidak harus genap, karena akan genap dengan sendirinya untuk satu anuitas. Walau demikian, arus kas harus terjadi pada interval rutin, seperti bulanan atau tahunan. Laba atas investasi internal adalah suku bunga yang diterima untuk investasi yang terdiri dari pembayaran (nilai negatif) dan pendapatan (nilai positif) yang terjadi dalam periode rutin.",
		abstract: "Mengembalikan tingkat pengembalian internal untuk serangkaian arus kas yang dinyatakan oleh angka dalam nilai. Arus kas ini tidak harus genap, karena akan genap dengan sendirinya untuk satu anuitas. Walau demikian, arus kas harus terjadi pada interval rutin, seperti bulanan atau tahunan. Laba atas investasi internal adalah suku bunga yang diterima untuk investasi yang terdiri dari pembayaran (nilai negatif) dan pendapatan (nilai positif) yang terjadi dalam periode rutin.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/irr-function"
		}],
		functionParameter: {
			values: {
				name: "values",
				detail: "Array atau referensi sel yang berisi angka untuk menghitung tingkat pengembalian internal. Harus berisi setidaknya satu nilai positif dan satu negatif; teks, nilai logika, dan sel kosong diabaikan."
			},
			guess: {
				name: "guess",
				detail: "Angka yang Anda perkirakan mendekati hasil IRR."
			}
		}
	},
	ISPMT: {
		description: "Menghitung bunga yang dibayarkan (atau diterima) untuk periode pinjaman (atau investasi) tertentu dengan pembayaran pokok genap.",
		abstract: "Menghitung bunga yang dibayarkan (atau diterima) untuk periode pinjaman (atau investasi) tertentu dengan pembayaran pokok genap.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/ispmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Diperlukan. Suku bunga untuk investasi."
			},
			per: {
				name: "per",
				detail: "Diperlukan. Periode yang ingin Anda cari bunganya, dan harus antara 1 dan Nper."
			},
			nper: {
				name: "nper",
				detail: "Diperlukan. Total jumlah periode pembayaran untuk investasi."
			},
			pv: {
				name: "pv",
				detail: "Diperlukan. Nilai investasi saat ini. Untuk pinjaman, Pv adalah jumlah pinjaman."
			}
		}
	},
	MDURATION: {
		description: "Mengembalikan durasi Macauley yang dimodifikasi untuk sekuritas dengan nilai par yang diasumsikan sebesar $100.",
		abstract: "Mengembalikan durasi Macauley yang dimodifikasi untuk sekuritas dengan nilai par yang diasumsikan sebesar $100.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/mduration-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Diperlukan. Tanggal penyelesaian sekuritas. Tanggal penyelesaian sekuritas adalah tanggal setelah tanggal terbit saat sekuritas diperdagangkan kepada pembeli."
			},
			maturity: {
				name: "maturity",
				detail: "Diperlukan. Tanggal jatuh tempo sekuritas. Tanggal jatuh tempo adalah tanggal ketika sekuritas telah kedaluwarsa."
			},
			coupon: {
				name: "coupon",
				detail: "Diperlukan. Suku bunga kupon tahunan sekuritas."
			},
			yld: {
				name: "yld",
				detail: "Diperlukan. Laba tahunan sekuritas."
			},
			frequency: {
				name: "frequency",
				detail: "Diperlukan. Jumlah kupon pembayaran per tahun. Untuk pembayaran tahunan, frekuensi = 1; untuk semi tahunan, frekuensi = 2; untuk triwulan, frekuensi = 4."
			},
			basis: {
				name: "basis",
				detail: "Opsional. Tipe basis perhitungan hari untuk digunakan."
			}
		}
	},
	MIRR: {
		description: "Mengembalikan laba atas investasi internal yang dimodifikasi untuk serangkaian arus kas periodik. MIRR mempertimbangkan baik biaya investasi maupun bunga yang diterima dari penginvestasian kembali kas.",
		abstract: "Mengembalikan laba atas investasi internal yang dimodifikasi untuk serangkaian arus kas periodik. MIRR mempertimbangkan baik biaya investasi maupun bunga yang diterima dari penginvestasian kembali kas.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/mirr-function"
		}],
		functionParameter: {
			values: {
				name: "values",
				detail: "Diperlukan. Sebuah array atau referensi ke sel-sel yang berisi angka. Angka-angka ini menunjukkan serangkaian pembayaran (nilai negatif) dan pemasukan (nilai positif) yang terjadi dalam periode rutin. Nilai harus berisi setidaknya satu nilai positif dan satu nilai negatif untuk menghitung tingkat pengembalian internal yang dimodifikasi. Jika tidak, MIRR mengembalikan #DIV/0! nilai kesalahan. Jika sebuah argumen array atau referensi mencakup teks, nilai logika, atau sel kosong, maka nilai-nilai itu diabaikan; akan tetapi sel-sel dengan nilai nol dimasukkan."
			},
			financeRate: {
				name: "finance_rate",
				detail: "Diperlukan. Suku bunga yang Anda bayar atas uang yang digunakan dalam arus kas."
			},
			reinvestRate: {
				name: "reinvest_rate",
				detail: "Diperlukan. Suku bunga yang Anda terima dari arus kas karena Anda menginvestasikannya kembali."
			}
		}
	},
	NOMINAL: {
		description: "Mengembalikan suku bunga tahunan nominal, dengan suku bunga efektif dan jumlah periode bunga majemuk per tahun.",
		abstract: "Mengembalikan suku bunga tahunan nominal, dengan suku bunga efektif dan jumlah periode bunga majemuk per tahun.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/nominal-function"
		}],
		functionParameter: {
			effectRate: {
				name: "effect_rate",
				detail: "Diperlukan. Suku bunga efektif."
			},
			npery: {
				name: "npery",
				detail: "Diperlukan. Jumlah periode bunga majemuk per tahun."
			}
		}
	},
	NPER: {
		description: "Mengembalikan jumlah periode untuk sebuah investasi berdasarkan pembayaran berkala dan terus menerus serta tingkat bunga tetap.",
		abstract: "Mengembalikan jumlah periode untuk sebuah investasi berdasarkan pembayaran berkala dan terus menerus serta tingkat bunga tetap.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/nper-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Diperlukan. Suku bunga tiap periode."
			},
			pmt: {
				name: "pmt",
				detail: "Diperlukan. Pembayaran dilakukan tiap periode dan tidak dapat diganti selama anuitas belum berakhir. Umumnya, pmt mencakup biaya pokok dan bunga tetapi tidak ada biaya lain atau pajak."
			},
			pv: {
				name: "pv",
				detail: "Diperlukan. Nilai saat ini, atau jumlah total harga sekarang dari serangkaian pembayaran di masa mendatang."
			},
			fv: {
				name: "fv",
				detail: "Opsional. Nilai masa mendatang, atau keseimbangan kas yang ingin Anda capai setelah pembayaran terakhir dilakukan. Jika fv dikosongkan, maka diasumsikan sebagai 0 (misalnya, nilai masa depan sebuah pinjaman adalah 0)."
			},
			type: {
				name: "type",
				detail: "Opsional. Angka 0 atau 1 dan menunjukkan kapan pembayaran jatuh tempo."
			}
		}
	},
	NPV: {
		description: "Menghitung nilai bersih saat ini dari sebuah investasi dengan menggunakan tingkat diskon dan serangkaian pembayaran yang akan datang (nilai negatif) dan pendapatan (nilai positif).",
		abstract: "Menghitung nilai bersih saat ini dari sebuah investasi dengan menggunakan tingkat diskon dan serangkaian pembayaran yang akan datang (nilai negatif) dan pendapatan (nilai positif).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/npv-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Diperlukan. Tingkat diskon selama satu periode."
			},
			value1: {
				name: "value1",
				detail: "Value1 diperlukan, nilai berikutnya opsional. Argumen 1 hingga 254 yang menunjukkan pembayaran dan pendapatan. Value1, value2, ... harus diberi jarak waktu yang sama dan terjadi pada akhir setiap periode. NPV menggunakan urutan value1, value2, ... untuk menerjemahkan urutan arus kas. Pastikan Anda memasukkan nilai pembayaran dan pendapatan dalam urutan yang tepat. Argumen yang berupa sel kosong, nilai logika, atau teks representasi angka, nilai kesalahan, atau teks yang tidak dapat diterjemahkan menjadi angka diabaikan. Jika argumen berupa array atau referensi, hanya angka dalam array atau referensi itu yang dihitung. Sel kosong, nilai logika, teks, atau nilai kesalahan dalam array atau referensi diabaikan."
			},
			value2: {
				name: "value2",
				detail: "Value1 diperlukan, nilai berikutnya opsional. Argumen 1 hingga 254 yang menunjukkan pembayaran dan pendapatan. Value1, value2, ... harus diberi jarak waktu yang sama dan terjadi pada akhir setiap periode. NPV menggunakan urutan value1, value2, ... untuk menerjemahkan urutan arus kas. Pastikan Anda memasukkan nilai pembayaran dan pendapatan dalam urutan yang tepat. Argumen yang berupa sel kosong, nilai logika, atau teks representasi angka, nilai kesalahan, atau teks yang tidak dapat diterjemahkan menjadi angka diabaikan. Jika argumen berupa array atau referensi, hanya angka dalam array atau referensi itu yang dihitung. Sel kosong, nilai logika, teks, atau nilai kesalahan dalam array atau referensi diabaikan."
			}
		}
	},
	ODDFPRICE: {
		description: "Mengembalikan harga per nilai nominal $100 dari sekuritas dengan periode pertama yang tidak teratur.",
		abstract: "Mengembalikan harga per nilai nominal $100 dari sekuritas dengan periode pertama yang tidak teratur.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/oddfprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Tanggal penyelesaian sekuritas."
			},
			maturity: {
				name: "maturity",
				detail: "Tanggal jatuh tempo sekuritas."
			},
			issue: {
				name: "issue",
				detail: "Tanggal penerbitan sekuritas."
			},
			firstCoupon: {
				name: "first_coupon",
				detail: "Tanggal kupon pertama sekuritas."
			},
			rate: {
				name: "rate",
				detail: "Suku bunga sekuritas."
			},
			yld: {
				name: "yld",
				detail: "Hasil tahunan sekuritas."
			},
			redemption: {
				name: "redemption",
				detail: "Nilai penebusan sekuritas per nilai nominal $100."
			},
			frequency: {
				name: "frequency",
				detail: "Jumlah pembayaran kupon per tahun: 1 untuk tahunan, 2 untuk semesteran, dan 4 untuk triwulanan."
			},
			basis: {
				name: "basis",
				detail: "Jenis basis penghitungan hari yang akan digunakan."
			}
		}
	},
	ODDFYIELD: {
		description: "Mengembalikan hasil sekuritas yang mempunyai periode pertama ganjil (pendek atau panjang).",
		abstract: "Mengembalikan hasil sekuritas yang mempunyai periode pertama ganjil (pendek atau panjang).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/oddfyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Diperlukan. Tanggal penyelesaian sekuritas. Tanggal penyelesaian sekuritas adalah tanggal setelah tanggal terbit saat sekuritas diperdagangkan kepada pembeli."
			},
			maturity: {
				name: "maturity",
				detail: "Diperlukan. Tanggal jatuh tempo sekuritas. Tanggal jatuh tempo adalah tanggal ketika sekuritas telah kedaluwarsa."
			},
			issue: {
				name: "issue",
				detail: "Diperlukan. Tanggal penerbitan sekuritas."
			},
			firstCoupon: {
				name: "first_coupon",
				detail: "Diperlukan. Tanggal kupon pertama sekuritas."
			},
			rate: {
				name: "rate",
				detail: "Diperlukan. Suku bunga sekuritas."
			},
			pr: {
				name: "pr",
				detail: "Diperlukan. Harga sekuritas."
			},
			redemption: {
				name: "redemption",
				detail: "Diperlukan. Nilai penebusan sekuritas per nilai nominal $100."
			},
			frequency: {
				name: "frequency",
				detail: "Diperlukan. Jumlah kupon pembayaran per tahun. Untuk pembayaran tahunan, frekuensi = 1; untuk semi tahunan, frekuensi = 2; untuk triwulan, frekuensi = 4."
			},
			basis: {
				name: "basis",
				detail: "Opsional. Tipe basis perhitungan hari untuk digunakan."
			}
		}
	},
	ODDLPRICE: {
		description: "Mengembalikan harga per nilai nominal $100 dari sekuritas yang memiliki periode kupon akhir ganjil (pendek atau panjang).",
		abstract: "Mengembalikan harga per nilai nominal $100 dari sekuritas yang memiliki periode kupon akhir ganjil (pendek atau panjang).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/oddlprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Diperlukan. Tanggal penyelesaian sekuritas. Tanggal penyelesaian sekuritas adalah tanggal setelah tanggal terbit saat sekuritas diperdagangkan kepada pembeli."
			},
			maturity: {
				name: "maturity",
				detail: "Diperlukan. Tanggal jatuh tempo sekuritas. Tanggal jatuh tempo adalah tanggal ketika sekuritas telah kedaluwarsa."
			},
			lastInterest: {
				name: "last_interest",
				detail: "Diperlukan. Tanggal kupon akhir sekuritas."
			},
			rate: {
				name: "rate",
				detail: "Diperlukan. Suku bunga sekuritas."
			},
			yld: {
				name: "yld",
				detail: "Diperlukan. Laba tahunan sekuritas."
			},
			redemption: {
				name: "redemption",
				detail: "Diperlukan. Nilai penebusan sekuritas per nilai nominal $100."
			},
			frequency: {
				name: "frequency",
				detail: "Diperlukan. Jumlah kupon pembayaran per tahun. Untuk pembayaran tahunan, frekuensi = 1; untuk semi tahunan, frekuensi = 2; untuk triwulan, frekuensi = 4."
			},
			basis: {
				name: "basis",
				detail: "Opsional. Tipe basis perhitungan hari untuk digunakan."
			}
		}
	},
	ODDLYIELD: {
		description: "Mengembalikan hasil sekuritas yang mempunyai periode akhir ganjil (pendek atau panjang).",
		abstract: "Mengembalikan hasil sekuritas yang mempunyai periode akhir ganjil (pendek atau panjang).",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/oddlyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Diperlukan. Tanggal penyelesaian sekuritas. Tanggal penyelesaian sekuritas adalah tanggal setelah tanggal terbit saat sekuritas diperdagangkan kepada pembeli."
			},
			maturity: {
				name: "maturity",
				detail: "Diperlukan. Tanggal jatuh tempo sekuritas. Tanggal jatuh tempo adalah tanggal ketika sekuritas telah kedaluwarsa."
			},
			lastInterest: {
				name: "last_interest",
				detail: "Diperlukan. Tanggal kupon akhir sekuritas."
			},
			rate: {
				name: "rate",
				detail: "Diperlukan. Suku bunga sekuritas."
			},
			pr: {
				name: "pr",
				detail: "Diperlukan. Harga sekuritas."
			},
			redemption: {
				name: "redemption",
				detail: "Diperlukan. Nilai penebusan sekuritas per nilai nominal $100."
			},
			frequency: {
				name: "frequency",
				detail: "Diperlukan. Jumlah kupon pembayaran per tahun. Untuk pembayaran tahunan, frekuensi = 1; untuk semi tahunan, frekuensi = 2; untuk triwulan, frekuensi = 4."
			},
			basis: {
				name: "basis",
				detail: "Opsional. Tipe basis perhitungan hari untuk digunakan."
			}
		}
	},
	PDURATION: {
		description: "Mengembalikan jumlah periode yang diperlukan investasi untuk mencapai nilai yang ditentukan.",
		abstract: "Mengembalikan jumlah periode yang diperlukan investasi untuk mencapai nilai yang ditentukan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/pduration-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Diperlukan. Rate adalah suku bunga tiap periode."
			},
			pv: {
				name: "pv",
				detail: "Diperlukan. Pv adalah nilai investasi saat ini."
			},
			fv: {
				name: "fv",
				detail: "Diperlukan. Fv adalah nilai investasi masa depan yang diinginkan."
			}
		}
	},
	PMT: {
		description: "PMT , salah satu Fungsi keuangan . menghitung pembayaran untuk pinjaman berdasarkan pembayaran berkala dan terus menerus serta suku bunga tetap.",
		abstract: "PMT , salah satu Fungsi keuangan . menghitung pembayaran untuk pinjaman berdasarkan pembayaran berkala dan terus menerus serta suku bunga tetap.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/pmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Diperlukan. Suku bunga untuk pinjaman."
			},
			nper: {
				name: "nper",
				detail: "Diperlukan. Total jumlah periode pembayaran untuk pinjaman."
			},
			pv: {
				name: "pv",
				detail: "Diperlukan. Nilai saat ini, atau jumlah total harga saat ini dari serangkaian pembayaran masa depan; yang juga dikenal sebagai pinjaman pokok."
			},
			fv: {
				name: "fv",
				detail: "Opsional. Nilai masa mendatang, atau keseimbangan kas yang ingin Anda capai setelah pembayaran terakhir dilakukan. Jika fv dikosongkan, maka diasumsikan sebagai 0 (nol), yaitu, nilai pinjaman yang akan datang adalah 0."
			},
			type: {
				name: "type",
				detail: "Opsional. Angka 0 (nol) atau 1 dan menunjukkan bahwa pembayaran telah jatuh tempo."
			}
		}
	},
	PPMT: {
		description: "Mengembalikan pembayaran pinjaman pokok untuk periode tertentu untuk investasi berdasarkan pembayaran berkala dan terus menerus serta suku bunga tetap.",
		abstract: "Mengembalikan pembayaran pinjaman pokok untuk periode tertentu untuk investasi berdasarkan pembayaran berkala dan terus menerus serta suku bunga tetap.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/ppmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Diperlukan. Suku bunga tiap periode."
			},
			per: {
				name: "per",
				detail: "Diperlukan. Menentukan periode dan harus berada pada rentang 1 hingga nper."
			},
			nper: {
				name: "nper",
				detail: "Diperlukan. Total jumlah periode pembayaran dalam satu anuitas."
			},
			pv: {
				name: "pv",
				detail: "Diperlukan. Nilai saat ini — jumlah total harga hari ini dari serangkaian pembayaran yang akan datang."
			},
			fv: {
				name: "fv",
				detail: "Opsional. Nilai masa mendatang, atau keseimbangan kas yang ingin Anda capai setelah pembayaran terakhir dilakukan. Jika fv dikosongkan, maka diasumsikan sebagai 0 (nol), yaitu, nilai pinjaman yang akan datang adalah 0."
			},
			type: {
				name: "type",
				detail: "Opsional. Angka 0 atau 1 dan menunjukkan kapan pembayaran jatuh tempo."
			}
		}
	},
	PRICE: {
		description: "Mengembalikan harga dari setiap nilai nominal $100 sebuah sekuritas yang membayar bunga berkala.",
		abstract: "Mengembalikan harga dari setiap nilai nominal $100 sebuah sekuritas yang membayar bunga berkala.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/price-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Diperlukan. Tanggal penyelesaian sekuritas. Tanggal penyelesaian sekuritas adalah tanggal setelah tanggal terbit saat sekuritas diperdagangkan kepada pembeli."
			},
			maturity: {
				name: "maturity",
				detail: "Diperlukan. Tanggal jatuh tempo sekuritas. Tanggal jatuh tempo adalah tanggal ketika sekuritas telah kedaluwarsa."
			},
			rate: {
				name: "rate",
				detail: "Diperlukan. Suku bunga kupon tahunan sekuritas."
			},
			yld: {
				name: "yld",
				detail: "Diperlukan. Laba tahunan sekuritas."
			},
			redemption: {
				name: "redemption",
				detail: "Diperlukan. Nilai penebusan sekuritas per nilai nominal $100."
			},
			frequency: {
				name: "frequency",
				detail: "Diperlukan. Jumlah kupon pembayaran per tahun. Untuk pembayaran tahunan, frekuensi = 1; untuk semi tahunan, frekuensi = 2; untuk triwulan, frekuensi = 4."
			},
			basis: {
				name: "basis",
				detail: "Opsional. Tipe basis perhitungan hari untuk digunakan."
			}
		}
	},
	PRICEDISC: {
		description: "Mengembalikan harga untuk setiap nilai $100 sebuah sekuritas didiskon.",
		abstract: "Mengembalikan harga untuk setiap nilai $100 sebuah sekuritas didiskon.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/pricedisc-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Diperlukan. Tanggal penyelesaian sekuritas. Tanggal penyelesaian sekuritas adalah tanggal setelah tanggal terbit saat sekuritas diperdagangkan kepada pembeli."
			},
			maturity: {
				name: "maturity",
				detail: "Diperlukan. Tanggal jatuh tempo sekuritas. Tanggal jatuh tempo adalah tanggal ketika sekuritas telah kedaluwarsa."
			},
			discount: {
				name: "discount",
				detail: "Diperlukan. Diskon sekuritas."
			},
			redemption: {
				name: "redemption",
				detail: "Diperlukan. Nilai penebusan sekuritas per nilai nominal $100."
			},
			basis: {
				name: "basis",
				detail: "Opsional. Tipe basis perhitungan hari untuk digunakan."
			}
		}
	},
	PRICEMAT: {
		description: "Mengembalikan harga nilai nominal $100 sebuah sekuritas yang membayar bunga saat jatuh tempo.",
		abstract: "Mengembalikan harga nilai nominal $100 sebuah sekuritas yang membayar bunga saat jatuh tempo.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/pricemat-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Diperlukan. Tanggal penyelesaian sekuritas. Tanggal penyelesaian sekuritas adalah tanggal setelah tanggal terbit saat sekuritas diperdagangkan kepada pembeli."
			},
			maturity: {
				name: "maturity",
				detail: "Diperlukan. Tanggal jatuh tempo sekuritas. Tanggal jatuh tempo adalah tanggal ketika sekuritas telah kedaluwarsa."
			},
			issue: {
				name: "issue",
				detail: "Diperlukan. Tanggal terbit sekuritas, diekspresikan sebagai nomor seri tanggal."
			},
			rate: {
				name: "rate",
				detail: "Diperlukan. Suku bunga sekuritas pada tanggal terbit."
			},
			yld: {
				name: "yld",
				detail: "Diperlukan. Laba tahunan sekuritas."
			},
			basis: {
				name: "basis",
				detail: "Opsional. Tipe basis perhitungan hari untuk digunakan."
			}
		}
	},
	PV: {
		description: "PV , salah satu fungsi keuangan , menghitung nilai pinjaman atau investasi saat ini, berdasarkan suku bunga tetap. Anda bisa menggunakan PV dengan pembayaran berkala, tetap (seperti pinjaman hipotek atau lainnya), atau nilai hasil investasi di masa depan.",
		abstract: "PV , salah satu fungsi keuangan , menghitung nilai pinjaman atau investasi saat ini, berdasarkan suku bunga tetap. Anda bisa menggunakan PV dengan pembayaran berkala, tetap (seperti pinjaman hipotek atau lainnya), atau nilai hasil investasi di masa depan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/pv-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Diperlukan. Suku bunga tiap periode. Misalnya, jika Anda mengambil kredit mobil dengan bunga tahunan 10 persen dan melakukan pembayaran bulanan, maka suku bunga per bulan Anda adalah 10%/12, atau 0.83%. Anda akan memasukkan 10%/12, atau 0.83%, atau 0.0083, ke dalam rumus sebagai suku bunga."
			},
			nper: {
				name: "nper",
				detail: "Diperlukan. Total jumlah periode pembayaran dalam satu anuitas. Misalnya, jika Anda mendapatkan kredit mobil selama empat tahun dan membuat pembayaran bulanan, pinjaman Anda memiliki periode 4*12 (atau 48). Anda akan memasukkan 48 ke dalam rumus nper."
			},
			pmt: {
				name: "pmt",
				detail: "Diperlukan. Pembayaran yang dilakukan setiap periode dan tidak bisa berubah sepanjang hidup anuitas. Umumnya, pmt mencakup pokok pinjaman dan bunga tanpa biaya lain dan pajak. Misalnya, pembayaran bulanan kredit mobil sebesar $10.000 selama empat tahun dengan bunga 12 persen adalah $263.33. Anda akan memasukkan -263.33 ke dalam rumus sebagai pmt. Jika pmt dihilangkan, Anda harus menyertakan argumen fv."
			},
			fv: {
				name: "fv",
				detail: "Opsional. Nilai masa mendatang atau saldo kas yang ingin Anda capai setelah pembayaran terakhir dilakukan. Jika fv dikosongkan, maka diasumsikan sebagai 0 (misalnya, nilai masa depan sebuah pinjaman adalah 0). Misalnya, jika Anda ingin menabung $50.000 untuk membayar sebuah proyek khusus dalam waktu 18 tahun, maka $50.000 adalah nilai masa depan. Setelah itu Anda dapat membuat perkiraan konservatif terhadap suku bunga dan menentukan berapa banyak yang harus Anda tabung setiap bulan. Jika pmt dikosongkan, Anda harus memasukkan argumen pmt."
			},
			type: {
				name: "type",
				detail: "Opsional. Angka 0 atau 1 dan menunjukkan kapan pembayaran jatuh tempo."
			}
		}
	},
	RATE: {
		description: "Mengembalikan suku bunga per periode anuitas. RATE dihitung dengan perulangan dan dapat memiliki nol atau lebih solusi. Jika hasil rate tidak berurut ke dalam 0,0000001 setelah 20 perulangan, RATE mengembalikan #NUM! nilai kesalahan.",
		abstract: "Mengembalikan suku bunga per periode anuitas. RATE dihitung dengan perulangan dan dapat memiliki nol atau lebih solusi. Jika hasil rate tidak berurut ke dalam 0,0000001 setelah 20 perulangan, RATE mengembalikan #NUM! nilai kesalahan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/rate-function"
		}],
		functionParameter: {
			nper: {
				name: "nper",
				detail: "Diperlukan. Total jumlah periode pembayaran dalam satu anuitas."
			},
			pmt: {
				name: "pmt",
				detail: "Diperlukan. Pembayaran yang dilakukan setiap periode dan tidak bisa berubah sepanjang hidup anuitas. Umumnya, pmt mencakup pokok pinjaman dan bunga tanpa biaya lain dan pajak. Jika pmt dikosongkan, Anda harus memasukkan argumen fv."
			},
			pv: {
				name: "pv",
				detail: "Diperlukan. Nilai saat ini — jumlah total harga hari ini dari serangkaian pembayaran yang akan datang."
			},
			fv: {
				name: "fv",
				detail: "Opsional. Nilai masa mendatang, atau keseimbangan kas yang ingin Anda capai setelah pembayaran terakhir dilakukan. Jika fv dikosongkan, maka diasumsikan sebagai 0 (misalnya, nilai masa depan sebuah pinjaman adalah 0). Jika dikosongkan, Anda harus menyertakan argumen pmt."
			},
			type: {
				name: "type",
				detail: "Opsional. Angka 0 atau 1 dan menunjukkan kapan pembayaran jatuh tempo."
			},
			guess: {
				name: "guess",
				detail: "Opsional. Perkiraan Anda mengenai besarnya suku bunga. Jika Anda menghilangkan perkiraan, suka bunga akan dianggap 10 persen. Jika RATE tidak diperoleh, coba nilai lain untuk perkiraan. RATE biasanya diperoleh jika perkiraan di antara 0 dan 1."
			}
		}
	},
	RECEIVED: {
		description: "Mengembalikan jumlah yang diterima saat jatuh tempo untuk sekuritas yang diinvestasikan secara penuh.",
		abstract: "Mengembalikan jumlah yang diterima saat jatuh tempo untuk sekuritas yang diinvestasikan secara penuh.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/received-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Diperlukan. Tanggal penyelesaian sekuritas. Tanggal penyelesaian sekuritas adalah tanggal setelah tanggal terbit saat sekuritas diperdagangkan kepada pembeli."
			},
			maturity: {
				name: "maturity",
				detail: "Diperlukan. Tanggal jatuh tempo sekuritas. Tanggal jatuh tempo adalah tanggal ketika sekuritas telah kedaluwarsa."
			},
			investment: {
				name: "investment",
				detail: "Diperlukan. Jumlah yang diinvestasikan dalam sekuritas."
			},
			discount: {
				name: "discount",
				detail: "Diperlukan. Diskon sekuritas."
			},
			basis: {
				name: "basis",
				detail: "Opsional. Tipe basis perhitungan hari untuk digunakan."
			}
		}
	},
	RRI: {
		description: "Mengembalikan suku bunga yang sama untuk pertumbuhan investasi.",
		abstract: "Mengembalikan suku bunga yang sama untuk pertumbuhan investasi.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/rri-function"
		}],
		functionParameter: {
			nper: {
				name: "nper",
				detail: "Diperlukan. Nper adalah jumlah periode untuk investasi."
			},
			pv: {
				name: "pv",
				detail: "Diperlukan. Pv adalah nilai investasi saat ini."
			},
			fv: {
				name: "fv",
				detail: "Diperlukan. Fv adalah nilai investasi di masa depan."
			}
		}
	},
	SLN: {
		description: "Mengembalikan nilai depresiasi aset secara lurus untuk satu periode.",
		abstract: "Mengembalikan nilai depresiasi aset secara lurus untuk satu periode.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/sln-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Diperlukan. Biaya awal aset."
			},
			salvage: {
				name: "salvage",
				detail: "Diperlukan. Nilai di akhir depresiasi (kadang-kadang disebut nilai sisa aset)."
			},
			life: {
				name: "life",
				detail: "Diperlukan. Jumlah periode depresiasi aset (kadang disebut umur berguna dari aset)."
			}
		}
	},
	SYD: {
		description: "Mengembalikan jumlah dari depresiasi digit tahun dari aset untuk periode tertentu.",
		abstract: "Mengembalikan jumlah dari depresiasi digit tahun dari aset untuk periode tertentu.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/syd-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Diperlukan. Biaya awal aset."
			},
			salvage: {
				name: "salvage",
				detail: "Diperlukan. Nilai di akhir depresiasi (kadang-kadang disebut nilai sisa aset)."
			},
			life: {
				name: "life",
				detail: "Diperlukan. Jumlah periode depresiasi aset (kadang disebut umur berguna dari aset)."
			},
			per: {
				name: "per",
				detail: "Diperlukan. Periode dan harus menggunakan satuan yang sama dengan life."
			}
		}
	},
	TBILLEQ: {
		description: "Mengembalikan hasil yang sepadan dengan obligasi untuk Surat Perbendaharaan Negara.",
		abstract: "Mengembalikan hasil yang sepadan dengan obligasi untuk Surat Perbendaharaan Negara.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/tbilleq-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Diperlukan. Tanggal penyelesaian Surat Perbendaharaan Negara. Tanggal penyelesaian sekuritas adalah tanggal setelah tanggal terbit saat Surat Perbendaharaan Negara diperdagangkan kepada pembeli."
			},
			maturity: {
				name: "maturity",
				detail: "Diperlukan. Tanggal jatuh tempo Surat Perbendaharaan Negara. Tanggal jatuh tempo adalah tanggal ketika Surat Perbendaharaan Negara telah kedaluwarsa."
			},
			discount: {
				name: "discount",
				detail: "Diperlukan. Tarif diskon Surat Perbendaharaan Negara."
			}
		}
	},
	TBILLPRICE: {
		description: "Mengembalikan harga per nilai nominal $100 untuk Surat Perbendaharaan Negara.",
		abstract: "Mengembalikan harga per nilai nominal $100 untuk Surat Perbendaharaan Negara.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/tbillprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Diperlukan. Tanggal penyelesaian Surat Perbendaharaan Negara. Tanggal penyelesaian sekuritas adalah tanggal setelah tanggal terbit saat Surat Perbendaharaan Negara diperdagangkan kepada pembeli."
			},
			maturity: {
				name: "maturity",
				detail: "Diperlukan. Tanggal jatuh tempo Surat Perbendaharaan Negara. Tanggal jatuh tempo adalah tanggal ketika Surat Perbendaharaan Negara telah kedaluwarsa."
			},
			discount: {
				name: "discount",
				detail: "Diperlukan. Tarif diskon Surat Perbendaharaan Negara."
			}
		}
	},
	TBILLYIELD: {
		description: "Mengembalikan hasil untuk Surat Perbendaharaan Negara.",
		abstract: "Mengembalikan hasil untuk Surat Perbendaharaan Negara.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/tbillyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Diperlukan. Tanggal penyelesaian Surat Perbendaharaan Negara. Tanggal penyelesaian sekuritas adalah tanggal setelah tanggal terbit saat Surat Perbendaharaan Negara diperdagangkan kepada pembeli."
			},
			maturity: {
				name: "maturity",
				detail: "Diperlukan. Tanggal jatuh tempo Surat Perbendaharaan Negara. Tanggal jatuh tempo adalah tanggal ketika Surat Perbendaharaan Negara telah kedaluwarsa."
			},
			pr: {
				name: "pr",
				detail: "Diperlukan. Harga Surat Perbendaharaan Negara per nilai nominal $100."
			}
		}
	},
	VDB: {
		description: "Mengembalikan depresiasi aset untuk periode yang ditentukan, termasuk periode parsial, menggunakan metode saldo menurun-ganda atau metode lain yang Anda tentukan. VDB adalah singkatan dari variable declining balance (saldo menurun variabel).",
		abstract: "Mengembalikan depresiasi aset untuk periode yang ditentukan, termasuk periode parsial, menggunakan metode saldo menurun-ganda atau metode lain yang Anda tentukan. VDB adalah singkatan dari variable declining balance (saldo menurun variabel).",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/vdb-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Diperlukan. Biaya awal aset."
			},
			salvage: {
				name: "salvage",
				detail: "Diperlukan. Nilai di akhir depresiasi (kadang-kadang disebut nilai sisa aset). Nilai ini dapat berupa 0."
			},
			life: {
				name: "life",
				detail: "Diperlukan. Jumlah periode depresiasi aset (kadang disebut umur berguna dari aset)."
			},
			startPeriod: {
				name: "start_period",
				detail: "Diperlukan. Periode awal yang akan dihitung depresiasinya. Start_period harus menggunakan satuan yang sama dengan masa pakai."
			},
			endPeriod: {
				name: "end_period",
				detail: "Diperlukan. Periode akhir yang akan dihitung depresiasinya. Periode_akhir harus menggunakan satuan yang sama dengan masa pakai."
			},
			factor: {
				name: "factor",
				detail: "Opsional. Kecepatan penurunan saldo. Jika faktor diabaikan, maka diasumsikan sebagai 2 (metode saldo menurun-ganda). Ubah faktor jika Anda tidak ingin menggunakan metode saldo menurun-ganda. Untuk deskripsi metode saldo menurun-ganda, lihat DDB."
			},
			noSwitch: {
				name: "no_switch",
				detail: "Opsional. Nilai logika yang menetapkan apakah akan beralih ke depresiasi garis-lurus apabila depresiasi lebih besar dari perhitungan saldo menurun. Jika no_switch TRUE, Microsoft Excel tidak akan beralih ke depresiasi garis-lurus bahkan apabila depresiasi lebih besar dari perhitungan saldo menurun. Jika no_switch FALSE atau diabaikan, Excel akan beralih ke depresiasi garis-lurus apabila depresiasi lebih besar dari perhitungan saldo menurun."
			}
		}
	},
	XIRR: {
		description: "Mengembalikan tingkat pengembalian internal untuk aliran kas yang jadwalnya tidak berkala. Untuk menghitung tingkat pengembalian internal serangkaian aliran kas berkala, gunakan fungsi IRR.",
		abstract: "Mengembalikan tingkat pengembalian internal untuk aliran kas yang jadwalnya tidak berkala. Untuk menghitung tingkat pengembalian internal serangkaian aliran kas berkala, gunakan fungsi IRR.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/xirr-function"
		}],
		functionParameter: {
			values: {
				name: "values",
				detail: "Diperlukan. Serangkaian aliran kas yang terkait dengan jadwal pembayaran dalam tanggal. Pembayaran pertama opsional dan terkait dengan biaya pembayaran yang terjadi di awal investasi. Jika nilai pertama adalah biaya atau pembayaran, maka nilainya harus negatif. Semua pembayaran berikutnya didiskon berdasarkan 365 hari dalam setahun. Rangkaian nilai harus berisi sedikitnya satu nilai positif dan satu negatif."
			},
			dates: {
				name: "dates",
				detail: "Diperlukan. Jadwal tanggal pembayaran yang terkait dengan pembayaran aliran kas. Urutan tanggal tidak harus sama. Tanggal harus dimasukkan dengan menggunakan fungsi DATE, atau sebagai hasil dari rumus atau fungsi lain. Contoh, gunakan DATE(2008,5,23) untuk tanggal 23 Mei 2008. Masalah bisa muncul jika tanggal dimasukkan sebagai teks. ."
			},
			guess: {
				name: "guess",
				detail: "Opsional. Angka yang Anda perkirakan mendekati hasil XIRR."
			}
		}
	},
	XNPV: {
		description: "Mengembalikan nilai bersih saat ini untuk jadwal aliran kas yang tidak selalu berkala. Untuk menghitung nilai bersih saat ini untuk serangkaian aliran kas berkala, gunakan fungsi NPV.",
		abstract: "Mengembalikan nilai bersih saat ini untuk jadwal aliran kas yang tidak selalu berkala. Untuk menghitung nilai bersih saat ini untuk serangkaian aliran kas berkala, gunakan fungsi NPV.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/xnpv-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Diperlukan. Tingkat diskon yang akan diterapkan untuk aliran kas."
			},
			values: {
				name: "values",
				detail: "Diperlukan. Serangkaian aliran kas yang terkait dengan jadwal pembayaran dalam tanggal. Pembayaran pertama opsional dan terkait dengan biaya pembayaran yang terjadi di awal investasi. Jika nilai pertama adalah biaya atau pembayaran, maka nilainya harus negatif. Semua pembayaran berikutnya didiskon berdasarkan 365 hari dalam setahun. Rangkaian nilai harus berisi sedikitnya satu nilai positif dan satu nilai negatif."
			},
			dates: {
				name: "dates",
				detail: "Diperlukan. Jadwal tanggal pembayaran yang terkait dengan pembayaran aliran kas. Tanggal pembayaran pertama menunjukkan awal jadwal pembayaran. Semua tanggal lainnya harus setelah tanggal ini, tetapi tidak harus urut."
			}
		}
	},
	YIELD: {
		description: "Mengembalikan hasil sekuritas yang membayar bunga berkala. Gunakan YIELD untuk menghitung hasil obligasi.",
		abstract: "Mengembalikan hasil sekuritas yang membayar bunga berkala. Gunakan YIELD untuk menghitung hasil obligasi.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/yield-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Diperlukan. Tanggal penyelesaian sekuritas. Tanggal penyelesaian sekuritas adalah tanggal setelah tanggal terbit saat sekuritas diperdagangkan kepada pembeli."
			},
			maturity: {
				name: "maturity",
				detail: "Diperlukan. Tanggal jatuh tempo sekuritas. Tanggal jatuh tempo adalah tanggal ketika sekuritas telah kedaluwarsa."
			},
			rate: {
				name: "rate",
				detail: "Diperlukan. Suku bunga kupon tahunan sekuritas."
			},
			pr: {
				name: "pr",
				detail: "Diperlukan. Harga sekuritas per nilai nominal $100."
			},
			redemption: {
				name: "redemption",
				detail: "Diperlukan. Nilai penebusan sekuritas per nilai nominal $100."
			},
			frequency: {
				name: "frequency",
				detail: "Diperlukan. Jumlah kupon pembayaran per tahun. Untuk pembayaran tahunan, frekuensi = 1; untuk semi tahunan, frekuensi = 2; untuk triwulan, frekuensi = 4."
			},
			basis: {
				name: "basis",
				detail: "Opsional. Tipe basis perhitungan hari untuk digunakan."
			}
		}
	},
	YIELDDISC: {
		description: "Mengembalikan hasil tahunan untuk sekuritas yang didiskon.",
		abstract: "Mengembalikan hasil tahunan untuk sekuritas yang didiskon.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/yielddisc-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Diperlukan. Tanggal penyelesaian sekuritas. Tanggal penyelesaian sekuritas adalah tanggal setelah tanggal terbit saat sekuritas diperdagangkan kepada pembeli."
			},
			maturity: {
				name: "maturity",
				detail: "Diperlukan. Tanggal jatuh tempo sekuritas. Tanggal jatuh tempo adalah tanggal ketika sekuritas telah kedaluwarsa."
			},
			pr: {
				name: "pr",
				detail: "Diperlukan. Harga sekuritas per nilai nominal $100."
			},
			redemption: {
				name: "redemption",
				detail: "Diperlukan. Nilai penebusan sekuritas per nilai nominal $100."
			},
			basis: {
				name: "basis",
				detail: "Opsional. Tipe basis perhitungan hari untuk digunakan."
			}
		}
	},
	YIELDMAT: {
		description: "Mengembalikan hasil tahunan sekuritas yang membayar bunga pada saat jatuh tempo.",
		abstract: "Mengembalikan hasil tahunan sekuritas yang membayar bunga pada saat jatuh tempo.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/yieldmat-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Diperlukan. Tanggal penyelesaian sekuritas. Tanggal penyelesaian sekuritas adalah tanggal setelah tanggal terbit saat sekuritas diperdagangkan kepada pembeli."
			},
			maturity: {
				name: "maturity",
				detail: "Diperlukan. Tanggal jatuh tempo sekuritas. Tanggal jatuh tempo adalah tanggal ketika sekuritas telah kedaluwarsa."
			},
			issue: {
				name: "issue",
				detail: "Diperlukan. Tanggal terbit sekuritas, diekspresikan sebagai nomor seri tanggal."
			},
			rate: {
				name: "rate",
				detail: "Diperlukan. Suku bunga sekuritas pada tanggal terbit."
			},
			pr: {
				name: "pr",
				detail: "Diperlukan. Harga sekuritas per nilai nominal $100."
			},
			basis: {
				name: "basis",
				detail: "Opsional. Tipe basis perhitungan hari untuk digunakan."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/information/id-ID.ts
const locale$8 = {
	CELL: {
		description: "Fungsi CELL mengembalikan informasi tentang pemformatan, lokasi, atau konten sel. Misalnya, jika ingin melakukan verifikasi bahwa sebuah sel berisi nilai numerik dan bukan teks sebelum Anda melakukan kalkulasi, gunakan rumus berikut:",
		abstract: "Fungsi CELL mengembalikan informasi tentang pemformatan, lokasi, atau konten sel. Misalnya, jika ingin melakukan verifikasi bahwa sebuah sel berisi nilai numerik dan bukan teks sebelum Anda melakukan kalkulasi, gunakan rumus berikut:",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/cell-function"
		}],
		functionParameter: {
			infoType: {
				name: "info_type",
				detail: "Nilai teks yang menentukan tipe informasi sel apa yang ingin Anda hasilkan. Daftar berikut menampilkan kemungkinan nilai argumen Info_type dan hasil-hasil terkait."
			},
			reference: {
				name: "reference",
				detail: "Sel yang Anda inginkan informasinya. Jika dihilangkan, informasi yang ditentukan dalam argumen info_type dikembalikan untuk sel yang dipilih pada saat penghitungan. Jika argumen referensi adalah rentang sel, fungsi CELL mengembalikan informasi untuk sel aktif dalam rentang yang dipilih. Penting: Meskipun referensi teknis bersifat opsional, termasuk referensi dalam rumus Anda didorong, kecuali Anda memahami efek ketidakhadirannya pada hasil rumus Anda dan menginginkan efek tersebut di tempatnya. Menghilangkan argumen referensi tidak menghasilkan informasi tentang sel tertentu dengan andal, karena alasan berikut: Dalam mode penghitungan otomatis, ketika sel diubah oleh pengguna, penghitungan mungkin dipicu sebelum atau setelah pemilihan berlangsung, tergantung pada platform yang Anda gunakan untuk Excel. Misalnya, Excel untuk Windows saat ini memicu penghitungan sebelum perubahan pilihan, tetapi Excel untuk web memicunya sesudahnya. Ketika Co-Authoring dengan pengguna lain yang melakukan pengeditan, fungsi ini akan melaporkan sel aktif Anda daripada editor. Perhitungan ulang apa pun, misalnya menekan F9, akan menyebabkan fungsi mengembalikan hasil baru meskipun tidak ada pengeditan sel yang terjadi."
			}
		}
	},
	ERROR_TYPE: {
		description: "Mengembalikan angka yang terkait ke salah satu nilai kesalahan dalam Microsoft Excel atau akan mengembalikan kesalahan #N/A jika tidak ada kesalahan. Anda dapat menggunakan ERROR.TYPE dalam fungsi IF untuk menguji nilai kesalahan dan mengembalikan string teks, seperti pesan, bukan nilai kesalahan.",
		abstract: "Mengembalikan angka yang terkait ke salah satu nilai kesalahan dalam Microsoft Excel atau akan mengembalikan kesalahan #N/A jika tidak ada kesalahan. Anda dapat menggunakan ERROR.TYPE dalam fungsi IF untuk menguji nilai kesalahan dan mengembalikan string teks, seperti pesan, bukan nilai kesalahan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/error-type-function"
		}],
		functionParameter: { errorVal: {
			name: "error_val",
			detail: "Diperlukan. Nilai kesalahan yang angka pengidentifikasinya ingin Anda temukan. Meskipun error_val dapat menjadi nilai kesalahan aktual, biasanya nilai kesalahan itu akan menjadi referensi ke sel berisi rumus yang ingin Anda uji."
		} }
	},
	INFO: {
		description: "Mengembalikan informasi tentang lingkungan operasi saat ini.",
		abstract: "Mengembalikan informasi tentang lingkungan operasi saat ini.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/info-function"
		}],
		functionParameter: { typeText: {
			name: "Type_text",
			detail: "Diperlukan. Teks yang menentukan tipe informasi apa yang Anda inginkan dikembalikan."
		} }
	},
	ISBETWEEN: {
		description: "Memeriksa apakah angka yang diberikan berada di antara dua angka lain, secara inklusif atau eksklusif.",
		abstract: "Memeriksa apakah angka yang diberikan berada di antara dua angka lain, secara inklusif atau eksklusif.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/10538337?hl=id"
		}],
		functionParameter: {
			valueToCompare: {
				name: "value_to_compare",
				detail: "Nilai yang diuji apakah berada di antara `lower_value` dan `upper_value`."
			},
			lowerValue: {
				name: "lower_value",
				detail: "Batas bawah rentang nilai yang dapat memuat `value_to_compare`."
			},
			upperValue: {
				name: "upper_value",
				detail: "Batas atas rentang nilai yang dapat memuat `value_to_compare`."
			},
			lowerValueIsInclusive: {
				name: "lower_value_is_inclusive",
				detail: "Menentukan apakah rentang nilai mencakup `lower_value`. Secara default bernilai TRUE."
			},
			upperValueIsInclusive: {
				name: "upper_value_is_inclusive",
				detail: "Menentukan apakah rentang nilai mencakup `upper_value`. Secara default bernilai TRUE."
			}
		}
	},
	ISBLANK: {
		description: "Masing-masing fungsi ini, secara kolektif disebut fungsi IS , memeriksa nilai tertentu dan mengembalikan TRUE atau FALSE bergantung pada hasilnya. Misalnya, fungsi ISBLANK mengembalikan nilai logika TRUE jika argumen nilainya merupakan referensi ke sel kosong; jika tidak maka fungsi ini mengembalikan FALSE.",
		abstract: "Masing-masing fungsi ini, secara kolektif disebut fungsi IS , memeriksa nilai tertentu dan mengembalikan TRUE atau FALSE bergantung pada hasilnya. Misalnya, fungsi ISBLANK mengembalikan nilai logika TRUE jika argumen nilainya merupakan referensi ke sel kosong; jika tidak maka fungsi ini mengembalikan FALSE.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Diperlukan. Nilai yang ingin Anda uji. Argumen nilai dapat berupa kesalahan, nilai logika, teks, angka, atau nilai referensi kosong (sel kosong), atau nama yang merujuk ke salah satu dari ini."
		} }
	},
	ISDATE: {
		description: "Fungsi ISDATE mengembalikan apakah suatu nilai adalah tanggal.",
		abstract: "Fungsi ISDATE mengembalikan apakah suatu nilai adalah tanggal.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9061381?hl=id"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Nilai yang akan diverifikasi sebagai tanggal."
		} }
	},
	ISEMAIL: {
		description: "Fungsi ISEMAIL memeriksa apakah suatu nilai merupakan alamat email yang valid. Fungsi ini memeriksa apakah nilai mengikuti format alamat email yang umum diterima, tetapi tidak memverifikasi keberadaannya.",
		abstract: "Fungsi ISEMAIL memeriksa apakah suatu nilai merupakan alamat email yang valid. Fungsi ini memeriksa apakah nilai mengikuti format alamat email yang umum diterima, tetapi tidak memverifikasi keberadaannya.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3256503?hl=id"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Nilai yang akan diverifikasi sebagai alamat email."
		} }
	},
	ISERR: {
		description: "Masing-masing fungsi ini, secara kolektif disebut fungsi IS , memeriksa nilai tertentu dan mengembalikan TRUE atau FALSE bergantung pada hasilnya. Misalnya, fungsi ISBLANK mengembalikan nilai logika TRUE jika argumen nilainya merupakan referensi ke sel kosong; jika tidak maka fungsi ini mengembalikan FALSE.",
		abstract: "Masing-masing fungsi ini, secara kolektif disebut fungsi IS , memeriksa nilai tertentu dan mengembalikan TRUE atau FALSE bergantung pada hasilnya. Misalnya, fungsi ISBLANK mengembalikan nilai logika TRUE jika argumen nilainya merupakan referensi ke sel kosong; jika tidak maka fungsi ini mengembalikan FALSE.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Diperlukan. Nilai yang ingin Anda uji. Argumen nilai dapat berupa kesalahan, nilai logika, teks, angka, atau nilai referensi kosong (sel kosong), atau nama yang merujuk ke salah satu dari ini."
		} }
	},
	ISERROR: {
		description: "Masing-masing fungsi ini, secara kolektif disebut fungsi IS , memeriksa nilai tertentu dan mengembalikan TRUE atau FALSE bergantung pada hasilnya. Misalnya, fungsi ISBLANK mengembalikan nilai logika TRUE jika argumen nilainya merupakan referensi ke sel kosong; jika tidak maka fungsi ini mengembalikan FALSE.",
		abstract: "Masing-masing fungsi ini, secara kolektif disebut fungsi IS , memeriksa nilai tertentu dan mengembalikan TRUE atau FALSE bergantung pada hasilnya. Misalnya, fungsi ISBLANK mengembalikan nilai logika TRUE jika argumen nilainya merupakan referensi ke sel kosong; jika tidak maka fungsi ini mengembalikan FALSE.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Diperlukan. Nilai yang ingin Anda uji. Argumen nilai dapat berupa kesalahan, nilai logika, teks, angka, atau nilai referensi kosong (sel kosong), atau nama yang merujuk ke salah satu dari ini."
		} }
	},
	ISEVEN: {
		description: "Mengembalikan TRUE jika bilangannya genap, atau FALSE jika bilangannya ganjil.",
		abstract: "Mengembalikan TRUE jika bilangannya genap, atau FALSE jika bilangannya ganjil.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/iseven-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Diperlukan. Nilai untuk menguji. Jika bilangannya bukan bilangan bulat, maka bilangan tersebut dipotong."
		} }
	},
	ISFORMULA: {
		description: "Memeriksa apakah ada referensi ke sel yang berisi rumus, dan mengembalikan TRUE atau FALSE.",
		abstract: "Memeriksa apakah ada referensi ke sel yang berisi rumus, dan mengembalikan TRUE atau FALSE.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/isformula-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "Diperlukan. Reference adalah referensi ke sel yang ingin Anda uji. Referensi dapat berupa referensi sel, rumus, atau nama yang merujuk pada suatu sel."
		} }
	},
	ISLOGICAL: {
		description: "Masing-masing fungsi ini, secara kolektif disebut fungsi IS , memeriksa nilai tertentu dan mengembalikan TRUE atau FALSE bergantung pada hasilnya. Misalnya, fungsi ISBLANK mengembalikan nilai logika TRUE jika argumen nilainya merupakan referensi ke sel kosong; jika tidak maka fungsi ini mengembalikan FALSE.",
		abstract: "Masing-masing fungsi ini, secara kolektif disebut fungsi IS , memeriksa nilai tertentu dan mengembalikan TRUE atau FALSE bergantung pada hasilnya. Misalnya, fungsi ISBLANK mengembalikan nilai logika TRUE jika argumen nilainya merupakan referensi ke sel kosong; jika tidak maka fungsi ini mengembalikan FALSE.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Diperlukan. Nilai yang ingin Anda uji. Argumen nilai dapat berupa kesalahan, nilai logika, teks, angka, atau nilai referensi kosong (sel kosong), atau nama yang merujuk ke salah satu dari ini."
		} }
	},
	ISNA: {
		description: "Masing-masing fungsi ini, secara kolektif disebut fungsi IS , memeriksa nilai tertentu dan mengembalikan TRUE atau FALSE bergantung pada hasilnya. Misalnya, fungsi ISBLANK mengembalikan nilai logika TRUE jika argumen nilainya merupakan referensi ke sel kosong; jika tidak maka fungsi ini mengembalikan FALSE.",
		abstract: "Masing-masing fungsi ini, secara kolektif disebut fungsi IS , memeriksa nilai tertentu dan mengembalikan TRUE atau FALSE bergantung pada hasilnya. Misalnya, fungsi ISBLANK mengembalikan nilai logika TRUE jika argumen nilainya merupakan referensi ke sel kosong; jika tidak maka fungsi ini mengembalikan FALSE.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Diperlukan. Nilai yang ingin Anda uji. Argumen nilai dapat berupa kesalahan, nilai logika, teks, angka, atau nilai referensi kosong (sel kosong), atau nama yang merujuk ke salah satu dari ini."
		} }
	},
	ISNONTEXT: {
		description: "Masing-masing fungsi ini, secara kolektif disebut fungsi IS , memeriksa nilai tertentu dan mengembalikan TRUE atau FALSE bergantung pada hasilnya. Misalnya, fungsi ISBLANK mengembalikan nilai logika TRUE jika argumen nilainya merupakan referensi ke sel kosong; jika tidak maka fungsi ini mengembalikan FALSE.",
		abstract: "Masing-masing fungsi ini, secara kolektif disebut fungsi IS , memeriksa nilai tertentu dan mengembalikan TRUE atau FALSE bergantung pada hasilnya. Misalnya, fungsi ISBLANK mengembalikan nilai logika TRUE jika argumen nilainya merupakan referensi ke sel kosong; jika tidak maka fungsi ini mengembalikan FALSE.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Diperlukan. Nilai yang ingin Anda uji. Argumen nilai dapat berupa kesalahan, nilai logika, teks, angka, atau nilai referensi kosong (sel kosong), atau nama yang merujuk ke salah satu dari ini."
		} }
	},
	ISNUMBER: {
		description: "Masing-masing fungsi ini, secara kolektif disebut fungsi IS , memeriksa nilai tertentu dan mengembalikan TRUE atau FALSE bergantung pada hasilnya. Misalnya, fungsi ISBLANK mengembalikan nilai logika TRUE jika argumen nilainya merupakan referensi ke sel kosong; jika tidak maka fungsi ini mengembalikan FALSE.",
		abstract: "Masing-masing fungsi ini, secara kolektif disebut fungsi IS , memeriksa nilai tertentu dan mengembalikan TRUE atau FALSE bergantung pada hasilnya. Misalnya, fungsi ISBLANK mengembalikan nilai logika TRUE jika argumen nilainya merupakan referensi ke sel kosong; jika tidak maka fungsi ini mengembalikan FALSE.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Diperlukan. Nilai yang ingin Anda uji. Argumen nilai dapat berupa kesalahan, nilai logika, teks, angka, atau nilai referensi kosong (sel kosong), atau nama yang merujuk ke salah satu dari ini."
		} }
	},
	ISODD: {
		description: "Mengembalikan TRUE jika bilangannya ganjil, atau FALSE jika bilangannya genap.",
		abstract: "Mengembalikan TRUE jika bilangannya ganjil, atau FALSE jika bilangannya genap.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/isodd-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Diperlukan. Nilai untuk menguji. Jika bilangan bukan bilangan bulat, maka bilangan tersebut dipotong."
		} }
	},
	ISOMITTED: {
		description: "Memeriksa apakah nilai dalam LAMBDA hilang dan mengembalikan TRUE atau FALSE.",
		abstract: "Memeriksa apakah nilai dalam LAMBDA hilang dan mengembalikan TRUE atau FALSE.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/isomitted-function"
		}],
		functionParameter: { argument: {
			name: "Argumen",
			detail: "Nilai yang ingin Anda uji, seperti parameter LAMBDA."
		} }
	},
	ISREF: {
		description: "Masing-masing fungsi ini, secara kolektif disebut fungsi IS , memeriksa nilai tertentu dan mengembalikan TRUE atau FALSE bergantung pada hasilnya. Misalnya, fungsi ISBLANK mengembalikan nilai logika TRUE jika argumen nilainya merupakan referensi ke sel kosong; jika tidak maka fungsi ini mengembalikan FALSE.",
		abstract: "Masing-masing fungsi ini, secara kolektif disebut fungsi IS , memeriksa nilai tertentu dan mengembalikan TRUE atau FALSE bergantung pada hasilnya. Misalnya, fungsi ISBLANK mengembalikan nilai logika TRUE jika argumen nilainya merupakan referensi ke sel kosong; jika tidak maka fungsi ini mengembalikan FALSE.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Diperlukan. Nilai yang ingin Anda uji. Argumen nilai dapat berupa kesalahan, nilai logika, teks, angka, atau nilai referensi kosong (sel kosong), atau nama yang merujuk ke salah satu dari ini."
		} }
	},
	ISTEXT: {
		description: "Masing-masing fungsi ini, secara kolektif disebut fungsi IS , memeriksa nilai tertentu dan mengembalikan TRUE atau FALSE bergantung pada hasilnya. Misalnya, fungsi ISBLANK mengembalikan nilai logika TRUE jika argumen nilainya merupakan referensi ke sel kosong; jika tidak maka fungsi ini mengembalikan FALSE.",
		abstract: "Masing-masing fungsi ini, secara kolektif disebut fungsi IS , memeriksa nilai tertentu dan mengembalikan TRUE atau FALSE bergantung pada hasilnya. Misalnya, fungsi ISBLANK mengembalikan nilai logika TRUE jika argumen nilainya merupakan referensi ke sel kosong; jika tidak maka fungsi ini mengembalikan FALSE.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Diperlukan. Nilai yang ingin Anda uji. Argumen nilai dapat berupa kesalahan, nilai logika, teks, angka, atau nilai referensi kosong (sel kosong), atau nama yang merujuk ke salah satu dari ini."
		} }
	},
	ISURL: {
		description: "Memeriksa apakah suatu nilai adalah URL yang valid.",
		abstract: "Memeriksa apakah suatu nilai adalah URL yang valid.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3256501?hl=id"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Nilai yang akan diverifikasi sebagai URL."
		} }
	},
	N: {
		description: "Mengembalikan nilai yang dikonversikan menjadi angka.",
		abstract: "Mengembalikan nilai yang dikonversikan menjadi angka.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/n-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Diperlukan. Nilai yang ingin Anda konversikan. N mengonversikan nilai yang terdapat dalam tabel berikut ini."
		} }
	},
	NA: {
		description: "Mengembalikan nilai kesalahan #N/A. #N/A adalah nilai kesalahan yang berarti \"tidak ada nilai yang tersedia.\" Gunakan NA untuk menandai sel kosong. Dengan memasukkan #N/A di sel tempat Anda kehilangan informasi, Anda bisa menghindari masalah tanpa sengaja menyertakan sel kosong dalam perhitungan Anda. (Saat rumus merujuk ke sel yang berisi #N/A, rumus mengembalikan nilai kesalahan #N/A.)",
		abstract: "Mengembalikan nilai kesalahan #N/A. #N/A adalah nilai kesalahan yang berarti \"tidak ada nilai yang tersedia.\" Gunakan NA untuk menandai sel kosong. Dengan memasukkan #N/A di sel tempat Anda kehilangan informasi, Anda bisa menghindari masalah tanpa sengaja menyertakan sel kosong dalam perhitungan Anda. (Saat rumus merujuk ke sel yang berisi #N/A, rumus mengembalikan nilai kesalahan #N/A.)",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/na-function"
		}],
		functionParameter: {}
	},
	SHEET: {
		description: "Fungsi SHEET mengembalikan nomor lembar lembar atau referensi lain yang ditentukan.",
		abstract: "Fungsi SHEET mengembalikan nomor lembar lembar atau referensi lain yang ditentukan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/sheet-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Argumen opsional. Gunakan ini untuk menentukan nama lembar atau referensi yang ingin Anda dapatkan nomor lembarnya. Jika tidak, fungsi akan mengembalikan jumlah lembar yang berisi fungsi SHEET."
		} }
	},
	SHEETS: {
		description: "Mengembalikan jumlah lembar dalam sebuah referensi.",
		abstract: "Mengembalikan jumlah lembar dalam sebuah referensi.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/sheets-function"
		}],
		functionParameter: {}
	},
	TYPE: {
		description: "Mengembalikan tipe nilai. Gunakan TYPE saat perilaku fungsi lain bergantung pada tipe nilai di sel tertentu.",
		abstract: "Mengembalikan tipe nilai. Gunakan TYPE saat perilaku fungsi lain bergantung pada tipe nilai di sel tertentu.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/type-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Diperlukan. Bisa berupa nilai Microsoft Excel apa pun, seperti angka, teks, nilai logika, dan lain-lain."
		} }
	}
};

//#endregion
//#region src/locale/function-list/logical/id-ID.ts
const locale$7 = {
	AND: {
		description: "Fungsi AND mengembalikan TRUE jika semua argumennya mengevaluasi ke TRUE, dan mengembalikan FALSE jika satu atau beberapa argumen mengevaluasi ke FALSE.",
		abstract: "Fungsi AND mengembalikan TRUE jika semua argumennya mengevaluasi ke TRUE, dan mengembalikan FALSE jika satu atau beberapa argumen mengevaluasi ke FALSE.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/and-function"
		}],
		functionParameter: {
			logical1: {
				name: "logical1",
				detail: "Kondisi pertama yang ingin diuji, yang dapat mengevaluasi ke TRUE atau FALSE."
			},
			logical2: {
				name: "logical2",
				detail: "Kondisi tambahan yang ingin diuji, yang dapat mengevaluasi ke TRUE atau FALSE, hingga maksimum 255 kondisi."
			}
		}
	},
	BYCOL: {
		description: "Menerapkan LAMBDA ke setiap kolom dan mengembalikan larik hasil. Misalnya, jika array asli adalah 3 kolom kali 2 baris, array yang dikembalikan adalah 3 kolom kali 1 baris.",
		abstract: "Menerapkan LAMBDA ke setiap kolom dan mengembalikan larik hasil. Misalnya, jika array asli adalah 3 kolom kali 2 baris, array yang dikembalikan adalah 3 kolom kali 1 baris.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/bycol-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Array yang akan dipisahkan berdasarkan kolom."
			},
			lambda: {
				name: "lambda",
				detail: "LAMBDA yang menerima satu kolom sebagai parameter tunggal dan menghitung satu hasil. Parameternya adalah kolom dari array."
			}
		}
	},
	BYROW: {
		description: "Menerapkan LAMBDA ke setiap baris dan mengembalikan larik hasil. Misalnya, jika array asli adalah 3 kolom kali 2 baris, array yang dikembalikan adalah 1 kolom kali 2 baris.",
		abstract: "Menerapkan LAMBDA ke setiap baris dan mengembalikan larik hasil. Misalnya, jika array asli adalah 3 kolom kali 2 baris, array yang dikembalikan adalah 1 kolom kali 2 baris.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/byrow-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Array yang akan dipisahkan berdasarkan baris."
			},
			lambda: {
				name: "lambda",
				detail: "LAMBDA yang menerima satu baris sebagai parameter tunggal dan menghitung satu hasil. Parameternya adalah baris dari array."
			}
		}
	},
	FALSE: {
		description: "Mengembalikan nilai logis FALSE.",
		abstract: "Mengembalikan nilai logis FALSE.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/false-function"
		}],
		functionParameter: {}
	},
	IF: {
		description: "Sebagai contoh, =IF(C2=”Ya”,1,2) artinya JIKA(C2 = Ya, maka berikan 1, jika tidak berikan 2).",
		abstract: "Sebagai contoh, =IF(C2=”Ya”,1,2) artinya JIKA(C2 = Ya, maka berikan 1, jika tidak berikan 2).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/if-function"
		}],
		functionParameter: {
			logicalTest: {
				name: "logical_test",
				detail: "Kondisi yang ingin Anda uji."
			},
			valueIfTrue: {
				name: "value_if_true",
				detail: "Nilai yang ingin Anda kembalikan jika hasil logical_test adalah TRUE."
			},
			valueIfFalse: {
				name: "value_if_false",
				detail: "Nilai yang ingin Anda kembalikan jika hasil dari logical_test adalah FALSE."
			}
		}
	},
	IFERROR: {
		description: "Anda dapat menggunakan fungsi IFERROR untuk menangani kesalahan dalam rumus. IFERROR mengembalikan nilai yang Anda tentukan jika rumus mengevaluasi kesalahan; jika tidak, rumus akan mengembalikan hasil rumus.",
		abstract: "Anda dapat menggunakan fungsi IFERROR untuk menangani kesalahan dalam rumus. IFERROR mengembalikan nilai yang Anda tentukan jika rumus mengevaluasi kesalahan; jika tidak, rumus akan mengembalikan hasil rumus.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/iferror-function"
		}],
		functionParameter: {
			value: {
				name: "value",
				detail: "Diperlukan. Argumen yang diperiksa apakah ada kesalahan."
			},
			valueIfError: {
				name: "value_if_error",
				detail: "Diperlukan. Nilai yang dikembalikan jika rumus mengevaluasi ke kesalahan. Jenis-jenis kesalahan berikut ini dievaluasi : #N/A, #VALUE!, #REF!, #DIV/0!, #NUM!, #NAME?, atau #NULL!."
			}
		}
	},
	IFNA: {
		description: "Fungsi IFNA mengembalikan nilai yang Anda tentukan jika rumus mengembalikan nilai kesalahan #N/A; jika tidak, rumus akan mengembalikan hasil rumus.",
		abstract: "Fungsi IFNA mengembalikan nilai yang Anda tentukan jika rumus mengembalikan nilai kesalahan #N/A; jika tidak, rumus akan mengembalikan hasil rumus.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/ifna-function"
		}],
		functionParameter: {
			value: {
				name: "value",
				detail: "Argumen yang diperiksa ada tidaknya nilai kesalahan #N/A."
			},
			valueIfNa: {
				name: "value_if_na",
				detail: "Nilai yang harus dikembalikan jika rumus mengevaluasi dengan nilai kesalahan #N/A."
			}
		}
	},
	IFS: {
		description: "Fungsi IFS memeriksa apakah satu atau beberapa kondisi terpenuhi dan mengembalikan nilai yang sesuai dengan kondisi TRUE pertama. IFS dapat menggantikan beberapa pernyataan IF yang bertumpuk, dan jauh lebih mudah dibaca dengan beberapa kondisi.",
		abstract: "Fungsi IFS memeriksa apakah satu atau beberapa kondisi terpenuhi dan mengembalikan nilai yang sesuai dengan kondisi TRUE pertama. IFS dapat menggantikan beberapa pernyataan IF yang bertumpuk, dan jauh lebih mudah dibaca dengan beberapa kondisi.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/ifs-function"
		}],
		functionParameter: {
			logicalTest1: {
				name: "logical_test1",
				detail: "Kondisi yang mengevaluasi ke TRUE atau FALSE."
			},
			valueIfTrue1: {
				name: "value_if_true1",
				detail: "Hasil yang dikembalikan jika logical_test1 mengevaluasi ke TRUE. Dapat kosong."
			},
			logicalTest2: {
				name: "logical_test2",
				detail: "Kondisi yang mengevaluasi ke TRUE atau FALSE."
			},
			valueIfTrue2: {
				name: "value_if_true2",
				detail: "Hasil yang dikembalikan jika logical_testN mengevaluasi ke TRUE. Setiap value_if_trueN sesuai dengan kondisi logical_testN dan dapat kosong."
			}
		}
	},
	LAMBDA: {
		description: "Anda dapat membuat fungsi untuk rumus yang umum digunakan, menghilangkan kebutuhan untuk menyalin dan menempelkan rumus ini (yang mungkin rentan terhadap kesalahan), dan secara efektif menambahkan fungsi Anda sendiri ke pustaka fungsi Asli Excel. Selain itu, fungsi LAMBDA tidak memerlukan VBA, makro, atau JavaScript, sehingga non-programmer juga dapat memanfaatkan penggunaannya.",
		abstract: "Anda dapat membuat fungsi untuk rumus yang umum digunakan, menghilangkan kebutuhan untuk menyalin dan menempelkan rumus ini (yang mungkin rentan terhadap kesalahan), dan secara efektif menambahkan fungsi Anda sendiri ke pustaka fungsi Asli Excel. Selain itu, fungsi LAMBDA tidak memerlukan VBA, makro, atau JavaScript, sehingga non-programmer juga dapat memanfaatkan penggunaannya.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/lambda-function"
		}],
		functionParameter: {
			parameter: {
				name: "parameter",
				detail: "Nilai yang ingin Anda berikan ke fungsi, seperti referensi sel, string, atau angka. Anda dapat memasukkan hingga 253 parameter. Argumen ini bersifat opsional."
			},
			calculation: {
				name: "calculation",
				detail: "Rumus yang ingin Anda jalankan dan kembalikan sebagai hasil dari fungsi. Argumen harus berupa argumen terakhir dan harus mengembalikan hasil. Argumen ini diperlukan."
			}
		}
	},
	LET: {
		description: "Fungsi menetapkan LET nama untuk hasil penghitungan. Ini memungkinkan penyimpanan penghitungan, nilai, atau penentuan nama menengah di dalam rumus. Nama ini hanya berlaku dalam lingkup LET fungsi. Mirip dengan variabel dalam pemrograman, LET dicapai melalui sintaks rumus asli Excel.",
		abstract: "Fungsi menetapkan LET nama untuk hasil penghitungan. Ini memungkinkan penyimpanan penghitungan, nilai, atau penentuan nama menengah di dalam rumus. Nama ini hanya berlaku dalam lingkup LET fungsi. Mirip dengan variabel dalam pemrograman, LET dicapai melalui sintaks rumus asli Excel.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/let-function"
		}],
		functionParameter: {
			name1: {
				name: "name1",
				detail: "Nama pertama yang akan ditetapkan. Harus dimulai dengan huruf dan tidak boleh merupakan hasil rumus atau berbenturan dengan sintaks rentang."
			},
			nameValue1: {
				name: "name_value1",
				detail: "Nilai yang ditetapkan ke name1."
			},
			calculationOrName2: {
				name: "calculation_or_name2",
				detail: "Penghitungan yang menggunakan semua nama dalam LET dan harus menjadi argumen terakhir, atau nama kedua yang ditetapkan ke name_value2."
			},
			nameValue2: {
				name: "name_value2",
				detail: "Nilai yang ditetapkan ke calculation_or_name2."
			},
			calculationOrName3: {
				name: "calculation_or_name3",
				detail: "Penghitungan yang menggunakan semua nama dalam LET dan harus menjadi argumen terakhir, atau nama ketiga yang ditetapkan ke name_value3."
			}
		}
	},
	MAKEARRAY: {
		description: "Mengembalikan array terhitung dari ukuran baris dan kolom yang ditentukan, dengan menerapkan fungsi LAMBDA .",
		abstract: "Mengembalikan array terhitung dari ukuran baris dan kolom yang ditentukan, dengan menerapkan fungsi LAMBDA .",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/makearray-function"
		}],
		functionParameter: {
			number1: {
				name: "rows",
				detail: "Jumlah baris dalam array. Harus lebih besar dari nol."
			},
			number2: {
				name: "cols",
				detail: "Jumlah kolom dalam array. Harus lebih besar dari nol."
			},
			value3: {
				name: "lambda",
				detail: "LAMBDA yang dipanggil untuk membuat array. Menerima dua parameter: row, indeks baris array, dan col, indeks kolom array."
			}
		}
	},
	MAP: {
		description: "Mengembalikan array yang dibentuk dengan memetakan setiap nilai dalam array ke nilai baru dengan menerapkan LAMBDA untuk membuat nilai baru.",
		abstract: "Mengembalikan array yang dibentuk dengan memetakan setiap nilai dalam array ke nilai baru dengan menerapkan LAMBDA untuk membuat nilai baru.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/map-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Array pertama yang akan dipetakan."
			},
			array2: {
				name: "array2",
				detail: "Array kedua yang akan dipetakan."
			},
			lambda: {
				name: "lambda",
				detail: "LAMBDA yang harus menjadi argumen terakhir dan memiliki parameter untuk setiap array yang diteruskan."
			}
		}
	},
	NOT: {
		description: "Fungsi NOT membalikkan nilai argumennya.",
		abstract: "Fungsi NOT membalikkan nilai argumennya.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/not-function"
		}],
		functionParameter: { logical: {
			name: "logical",
			detail: "Kondisi yang logikanya ingin dibalik, yang dapat mengevaluasi ke TRUE atau FALSE."
		} }
	},
	OR: {
		description: "Fungsi OR mengembalikan TRUE jika semua argumennya mengevaluasi ke TRUE, dan mengembalikan FALSE jika semua argumennya mengevaluasi ke FALSE.",
		abstract: "Fungsi OR mengembalikan TRUE jika semua argumennya mengevaluasi ke TRUE, dan mengembalikan FALSE jika semua argumennya mengevaluasi ke FALSE.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/or-function"
		}],
		functionParameter: {
			logical1: {
				name: "logical1",
				detail: "Kondisi pertama yang ingin diuji, yang dapat mengevaluasi ke TRUE atau FALSE."
			},
			logical2: {
				name: "logical2",
				detail: "Kondisi tambahan yang ingin diuji, yang dapat mengevaluasi ke TRUE atau FALSE, hingga maksimum 255 kondisi."
			}
		}
	},
	REDUCE: {
		description: "Mengurangi array ke nilai akumulasi dengan menerapkan LAMBDA ke setiap nilai dan mengembalikan nilai total dalam akumulator.",
		abstract: "Mengurangi array ke nilai akumulasi dengan menerapkan LAMBDA ke setiap nilai dan mengembalikan nilai total dalam akumulator.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/reduce-function"
		}],
		functionParameter: {
			initialValue: {
				name: "initial_value",
				detail: "Menetapkan nilai awal untuk akumulator."
			},
			array: {
				name: "array",
				detail: "Array yang akan direduksi."
			},
			lambda: {
				name: "lambda",
				detail: "LAMBDA yang dipanggil untuk mereduksi array. Menerima nilai akumulasi, nilai saat ini dari array, dan penghitungan yang diterapkan ke setiap elemen."
			}
		}
	},
	SCAN: {
		description: "Memindai array dengan menerapkan LAMBDA ke setiap nilai dan mengembalikan array yang memiliki setiap nilai menengah.",
		abstract: "Memindai array dengan menerapkan LAMBDA ke setiap nilai dan mengembalikan array yang memiliki setiap nilai menengah.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/scan-function"
		}],
		functionParameter: {
			initialValue: {
				name: "initial_value",
				detail: "Mengatur nilai awal untuk akumulator."
			},
			array: {
				name: "array",
				detail: "Array yang akan dipindai."
			},
			lambda: {
				name: "lambda",
				detail: "LAMBDA yang disebut untuk mengurangi array. LAMBDA mengambil tiga parameter: Akumulator Nilai dijumlahkan dan dikembalikan sebagai hasil akhir. Nilai Nilai saat ini dari array. Tubuh Penghitungan yang diterapkan ke setiap elemen dalam array."
			}
		}
	},
	SWITCH: {
		description: "Fungsi SWITCH mengevaluasi satu nilai (disebut ekspresi ) terhadap daftar nilai, dan mengembalikan hasil yang terkait dengan nilai cocok pertama. Jika tidak terdapat kecocokan, nilai default opsional mungkin akan dikembalikan.",
		abstract: "Fungsi SWITCH mengevaluasi satu nilai (disebut ekspresi ) terhadap daftar nilai, dan mengembalikan hasil yang terkait dengan nilai cocok pertama. Jika tidak terdapat kecocokan, nilai default opsional mungkin akan dikembalikan.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/switch-function"
		}],
		functionParameter: {
			expression: {
				name: "expression",
				detail: "Nilai, misalnya angka, tanggal, atau teks, yang akan dibandingkan dengan value1 hingga value126."
			},
			value1: {
				name: "value1",
				detail: "Nilai yang akan dibandingkan dengan expression."
			},
			result1: {
				name: "result1",
				detail: "Nilai yang dikembalikan saat argumen valueN yang sesuai cocok dengan expression. Harus disediakan untuk setiap valueN."
			},
			defaultOrValue2: {
				name: "default_or_value2",
				detail: "Nilai yang dikembalikan bila tidak ada kecocokan pada ekspresi valueN. Harus menjadi argumen terakhir fungsi."
			},
			result2: {
				name: "result2",
				detail: "Nilai yang dikembalikan saat argumen valueN yang sesuai cocok dengan expression. Harus disediakan untuk setiap valueN."
			}
		}
	},
	TRUE: {
		description: "Mengembalikan nilai logika TRUE. Anda bisa menggunakan fungsi ini saat Anda ingin mengembalikan nilai TRUE berdasarkan kondisi. Misalnya:",
		abstract: "Mengembalikan nilai logika TRUE. Anda bisa menggunakan fungsi ini saat Anda ingin mengembalikan nilai TRUE berdasarkan kondisi. Misalnya:",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/true-function"
		}],
		functionParameter: {}
	},
	XOR: {
		description: "Fungsi XOR mengembalikan logika Exclusive Or dari semua argumen.",
		abstract: "Fungsi XOR mengembalikan logika Exclusive Or dari semua argumen.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/xor-function"
		}],
		functionParameter: {
			logical1: {
				name: "logical1",
				detail: "Kondisi pertama yang ingin diuji, yang dapat mengevaluasi ke TRUE atau FALSE."
			},
			logical2: {
				name: "logical2",
				detail: "Kondisi tambahan yang ingin diuji, yang dapat mengevaluasi ke TRUE atau FALSE, hingga maksimum 255 kondisi."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/lookup/id-ID.ts
const locale$6 = {
	ADDRESS: {
		description: "Anda dapat menggunakan fungsi ADDRESS untuk memperoleh alamat sebuah sel dalam lembar kerja, jika diberikan nomor baris dan kolom yang ditentukan. Misalnya, ADDRESS(2,3) mengembalikan $C$2 . Sebagai contoh lain, ADDRESS(77,300) mengembalikan $KN$77 . Anda dapat menggunakan fungsi-fungsi lain, seperti fungsi ROW dan COLUMN , untuk memberikan argumen kepada nomor baris dan kolom untuk fungsi ADDRESS .",
		abstract: "Anda dapat menggunakan fungsi ADDRESS untuk memperoleh alamat sebuah sel dalam lembar kerja, jika diberikan nomor baris dan kolom yang ditentukan. Misalnya, ADDRESS(2,3) mengembalikan $C$2 . Sebagai contoh lain, ADDRESS(77,300) mengembalikan $KN$77 . Anda dapat menggunakan fungsi-fungsi lain, seperti fungsi ROW dan COLUMN , untuk memberikan argumen kepada nomor baris dan kolom untuk fungsi ADDRESS .",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/address-function"
		}],
		functionParameter: {
			row_num: {
				name: "row number",
				detail: "Diperlukan. Nilai numerik yang menentukan nomor baris yang akan digunakan dalam referensi sel."
			},
			column_num: {
				name: "column number",
				detail: "Diperlukan. Nilai numerik yang menentukan nomor kolom yang akan digunakan dalam referensi sel."
			},
			abs_num: {
				name: "type of reference",
				detail: "Opsional. Nilai numerik yang menentukan tipe referensi yang akan dihasilkan."
			},
			a1: {
				name: "style of reference",
				detail: "Opsional. Nilai logika yang menentukan gaya referensi A1 atau R1C1. Dalam gaya A1, kolom diberi label menurut abjad, dan baris diberi label menurut angka. Dalam gaya referensi R1C1, baik kolom maupun baris diberi label menurut angka. Jika argumen A1 adalah TRUE atau dihilangkan, fungsi ADDRESS akan mengembalikan referensi gaya A1; jika FALSE, fungsi ADDRESS akan mengembalikan referensi gaya R1C1. Catatan Untuk mengubah gaya referensi yang digunakan Excel, klik tab File , klik Opsi , lalu klik Rumus . Di bawah Bekerja dengan rumus , pilih atau kosongkan kotak centang gaya referensi R1C1 ."
			},
			sheet_text: {
				name: "worksheet name",
				detail: "Opsional. Nilai teks yang menentukan nama lembar kerja untuk digunakan sebagai referensi eksternal. Misalnya, rumus =ADDRESS(1,1,,,\"Sheet2\") mengembalikan Sheet2!$A$1 . Jika argumen sheet_text dihilangkan, tidak ada nama lembar yang digunakan, dan alamat yang dikembalikan oleh fungsi merujuk ke sel pada lembar saat ini."
			}
		}
	},
	AREAS: {
		description: "Mengembalikan jumlah area dalam sebuah referensi. Area adalah rentang sel berdekatan atau sel tunggal.",
		abstract: "Mengembalikan jumlah area dalam sebuah referensi. Area adalah rentang sel berdekatan atau sel tunggal.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/areas-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "Diperlukan. Referensi ke suatu sel atau rentang sel dan dapat merujuk ke beberapa area. Jika Anda ingin menentukan beberapa referensi sebagai argumen tunggal, maka Anda harus memasukkan seperangkat tanda kurung tambahan sehingga Microsoft Excel tidak akan menginterpretasikan koma sebagai pemisah bidang. Lihat contoh berikut."
		} }
	},
	CHOOSE: {
		description: "Menggunakan index_num untuk mengembalikan nilai dari daftar argumen nilai. Gunakan CHOOSE untuk memilih satu dari hingga 254 nilai berdasarkan jumlah indeks. Misalnya, jika nilai1 sampai nilai7 adalah hari-hari dari minggu tersebut, CHOOSE mengembalikan salah satu hari ketika angka antara 1 dan 7 digunakan sebagai index_num.",
		abstract: "Menggunakan index_num untuk mengembalikan nilai dari daftar argumen nilai. Gunakan CHOOSE untuk memilih satu dari hingga 254 nilai berdasarkan jumlah indeks. Misalnya, jika nilai1 sampai nilai7 adalah hari-hari dari minggu tersebut, CHOOSE mengembalikan salah satu hari ketika angka antara 1 dan 7 digunakan sebagai index_num.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/choose-function"
		}],
		functionParameter: {
			indexNum: {
				name: "index_num",
				detail: "Menentukan argumen nilai yang dipilih. Harus berupa angka antara 1 dan 254, rumus, atau referensi ke sel yang berisi angka tersebut."
			},
			value1: {
				name: "value1",
				detail: "Nilai atau tindakan yang dipilih berdasarkan index_num. Argumen dapat berupa angka, referensi sel, nama yang ditentukan, rumus, fungsi, atau teks."
			},
			value2: {
				name: "value2",
				detail: "Dari 1 hingga 254 argumen nilai."
			}
		}
	},
	CHOOSECOLS: {
		description: "Mengembalikan kolom yang ditentukan dari larik.",
		abstract: "Mengembalikan kolom yang ditentukan dari larik.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/choosecols-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Array yang berisi kolom yang akan dikembalikan dalam array baru. Diperlukan."
			},
			colNum1: {
				name: "col_num1",
				detail: "Kolom pertama yang akan dikembalikan. Diperlukan."
			},
			colNum2: {
				name: "col_num2",
				detail: "Kolom tambahan yang akan dikembalikan. Opsional."
			}
		}
	},
	CHOOSEROWS: {
		description: "Mengembalikan baris tertentu dari array.",
		abstract: "Mengembalikan baris tertentu dari array.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/chooserows-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Array yang berisi kolom yang akan dikembalikan dalam array baru. Diperlukan."
			},
			rowNum1: {
				name: "row_num1",
				detail: "Nomor baris pertama yang akan dikembalikan. Diperlukan."
			},
			rowNum2: {
				name: "row_num2",
				detail: "Nomor baris tambahan yang akan dikembalikan. Opsional."
			}
		}
	},
	COLUMN: {
		description: "Fungsi COLUMN mengembalikan nomor kolom referensi sel tertentu. Misalnya, rumus =COLUMN(D10) mengembalikan 4, karena kolom D adalah kolom keempat.",
		abstract: "Fungsi COLUMN mengembalikan nomor kolom referensi sel tertentu. Misalnya, rumus =COLUMN(D10) mengembalikan 4, karena kolom D adalah kolom keempat.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/column-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "Sel atau rentang sel yang nomor kolomnya ingin Anda kembalikan."
		} }
	},
	COLUMNS: {
		description: "Mengembalikan jumlah kolom dalam array atau referensi.",
		abstract: "Mengembalikan jumlah kolom dalam array atau referensi.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/columns-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "Diperlukan. Rumus array atau array, atau referensi ke rentang sel yang anda inginkan jumlah kolomnya."
		} }
	},
	DROP: {
		description: "Tidak termasuk jumlah baris atau kolom tertentu dari awal atau akhir larik. Anda mungkin merasa fungsi ini berguna untuk menghapus header dan footer dalam laporan Excel untuk mengembalikan data saja.",
		abstract: "Tidak termasuk jumlah baris atau kolom tertentu dari awal atau akhir larik. Anda mungkin merasa fungsi ini berguna untuk menghapus header dan footer dalam laporan Excel untuk mengembalikan data saja.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/drop-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Array tempat baris atau kolom diletakkan."
			},
			rows: {
				name: "rows",
				detail: "Jumlah baris yang akan dijatuhkan. Nilai negatif turun dari akhir array."
			},
			columns: {
				name: "columns",
				detail: "Jumlah kolom yang akan dikecualikan. Nilai negatif turun dari akhir array."
			}
		}
	},
	EXPAND: {
		description: "Memperluas atau mengayuh array ke dimensi baris dan kolom yang ditentukan.",
		abstract: "Memperluas atau mengayuh array ke dimensi baris dan kolom yang ditentukan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/expand-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Array untuk diperluas."
			},
			rows: {
				name: "rows",
				detail: "Jumlah baris dalam array yang diperluas. Jika hilang, baris tidak akan diperluas."
			},
			columns: {
				name: "columns",
				detail: "Jumlah kolom dalam array yang diperluas. Jika hilang, kolom tidak akan diperluas."
			},
			padWith: {
				name: "pad_with",
				detail: "Nilai yang akan diisi dengan tombol angka. Defaultnya adalah #N/A."
			}
		}
	},
	FILTER: {
		description: "Dalam contoh berikut, kami menggunakan rumus =FILTER(A5:D20,C5:C20=H2,\"\") untuk mengembalikan semua rekaman untuk Apple, seperti yang dipilih di sel H2, dan jika tidak ada apel, kembalikan string kosong (\"\").",
		abstract: "Dalam contoh berikut, kami menggunakan rumus =FILTER(A5:D20,C5:C20=H2,\"\") untuk mengembalikan semua rekaman untuk Apple, seperti yang dipilih di sel H2, dan jika tidak ada apel, kembalikan string kosong (\"\").",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/filter-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Larik atau rentang yang ingin difilter"
			},
			include: {
				name: "include",
				detail: "Larik Boolean dengan tinggi atau lebar yang sama seperti larik"
			},
			ifEmpty: {
				name: "if_empty",
				detail: "Nilai yang dikembalikan jika semua nilai dalam larik yang disertakan kosong (filter tidak mengembalikan apa pun)"
			}
		}
	},
	FORMULATEXT: {
		description: "Mengembalikan rumus sebagai string.",
		abstract: "Mengembalikan rumus sebagai string.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/formulatext-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "Diperlukan. Referensi ke satu sel atau rentang sel."
		} }
	},
	GETPIVOTDATA: {
		description: "Cuplikan layar di bawah ini memperlihatkan tata letak PivotTable yang digunakan di bagian berikutnya. Dalam contoh ini, =GETPIVOTDATA(\"Sales\",A3) mengembalikan jumlah total penjualan:",
		abstract: "Cuplikan layar di bawah ini memperlihatkan tata letak PivotTable yang digunakan di bagian berikutnya. Dalam contoh ini, =GETPIVOTDATA(\"Sales\",A3) mengembalikan jumlah total penjualan:",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/getpivotdata-function"
		}],
		functionParameter: {
			dataField: {
				name: "dataField",
				detail: "Nama bidang PivotTable yang berisi data yang ingin Anda ambil. Ini harus dalam tanda kutip. Contoh: =GETPIVOTDATA(\"Sales\", A3). Di sini, \"Penjualan\" adalah bidang Nilai yang ingin kami ambil. Karena tidak ada bidang lain yang ditentukan, GETPIVOTDATA mengembalikan jumlah total penjualan."
			},
			pivotTable: {
				name: "pivotTable",
				detail: "Referensi ke sel, rentang sel, atau rentang sel bernama dalam PivotTable. Informasi ini digunakan untuk menentukan PivotTable yang berisi data yang ingin diambil. Contoh: =GETPIVOTDATA(\"Sales\", A3). Di sini, A3 adalah referensi di dalam PivotTable dan memberi tahu rumus yang digunakan PivotTable."
			},
			field1: {
				name: "field1",
				detail: "1 hingga 126 pasang nama bidang dan nama item yang menguraikan data yang ingin diambil. Pasangan ini tidak memiliki urutan tertentu. Nama bidang dan nama untuk item selain tanggal dan angka perlu dimasukkan dalam tanda kutip. Contoh: =GETPIVOTDATA(\"Sales\", A3, \"Month\", \"Mar\"). Di sini, \"Bulan\" adalah bidang dan \"Mar\" adalah item. Untuk menentukan beberapa item untuk bidang, apit item dalam kurung kurawal (misalnya: {\"Mar\", \"Apr\"}). Untuk PivotTable OLAP , item bisa berisi nama sumber dimensi dan juga nama sumber item. Pasangan bidang dan item untuk OLAP PivotTable mungkin terlihat seperti ini: \"[Produk]\",\"[Produk].[Semua Produk].[Makanan].[Makanan Panggang]\""
			},
			item1: {
				name: "item1",
				detail: "1 hingga 126 pasang nama bidang dan nama item yang menguraikan data yang ingin diambil. Pasangan ini tidak memiliki urutan tertentu. Nama bidang dan nama untuk item selain tanggal dan angka perlu dimasukkan dalam tanda kutip. Contoh: =GETPIVOTDATA(\"Sales\", A3, \"Month\", \"Mar\"). Di sini, \"Bulan\" adalah bidang dan \"Mar\" adalah item. Untuk menentukan beberapa item untuk bidang, apit item dalam kurung kurawal (misalnya: {\"Mar\", \"Apr\"}). Untuk PivotTable OLAP , item bisa berisi nama sumber dimensi dan juga nama sumber item. Pasangan bidang dan item untuk OLAP PivotTable mungkin terlihat seperti ini: \"[Produk]\",\"[Produk].[Semua Produk].[Makanan].[Makanan Panggang]\""
			}
		}
	},
	HLOOKUP: {
		description: "Mencari nilai di baris atas tabel atau array nilai, lalu mengembalikan nilai dalam kolom yang sama dari baris yang Anda tentukan dalam tabel atau array. Gunakan HLOOKUP jika nilai perbandingan terletak di sebuah baris di bagian atas tabel data, dan Anda ingin mencari ke beberapa baris tertentu di bawahnya. Gunakan VLOOKUP jika nilai perbandingan terletak di kolom sebelah kiri data yang ingin dicari.",
		abstract: "Mencari nilai di baris atas tabel atau array nilai, lalu mengembalikan nilai dalam kolom yang sama dari baris yang Anda tentukan dalam tabel atau array. Gunakan HLOOKUP jika nilai perbandingan terletak di sebuah baris di bagian atas tabel data, dan Anda ingin mencari ke beberapa baris tertentu di bawahnya. Gunakan VLOOKUP jika nilai perbandingan terletak di kolom sebelah kiri data yang ingin dicari.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/hlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "Diperlukan. Nilai yang dicari di baris pertama tabel. Lookup_value bisa berupa nilai, referensi, atau string teks."
			},
			tableArray: {
				name: "table_array",
				detail: "Diperlukan. Tabel informasi tempat data dicari. Gunakan referensi ke sebuah rentang atau nama rentang. Nilai di baris pertama table_array bisa berupa teks, angka, atau nilai logika. Jika range_lookup TRUE, nilai di baris pertama table_array harus diletakkan dalam urutan naik: ...-2, -1, 0, 1, 2,... , A-Z, FALSE, TRUE; jika tidak, HLOOKUP tidak akan memberi nilai yang benar. Jika range_lookup FALSE, table_array tidak perlu diurutkan. Teks huruf besar dan huruf kecil sama. Urutkan nilai dengan urutan naik, kiri ke kanan. Untuk informasi selengkapnya, lihat Mengurutkan data dalam rentang atau tabel ."
			},
			rowIndexNum: {
				name: "row_index_num",
				detail: "Diperlukan. Nomor baris dalam table_array dari mana nilai yang cocok akan dikembalikan. Row_index_num 1 mengembalikan nilai baris pertama dalam table_array, row_index_num 2 mengembalikan nilai baris kedua dalam table_array, dan seterusnya. Jika row_index_num lebih kecil dari 1, HLOOKUP mengembalikan #VALUE! nilai kesalahan; jika row_index_num lebih besar dari jumlah baris di table_array, HLOOKUP mengembalikan #REF! nilai kesalahan."
			},
			rangeLookup: {
				name: "range_lookup",
				detail: "Opsional. Nilai logika yang menentukan apakah Anda ingin HLOOKUP mencari kecocokan persis atau kecocokan yang mendekati. Jika TRUE atau dihilangkan, dikembalikan sebuah kecocokan yang mendekati. Dengan kata lain, jika kecocokan persis ditemukan, dihasillkan nilai terbesar berikutnya yang kurang dari lookup_value. Jika FALSE, HLOOKUP akan menemukan kecocokan persis. Jika tidak ditemukan, dikembalikan nilai kesalahan #N/A."
			}
		}
	},
	HSTACK: {
		description: "Menambahkan larik secara horizontal dan berurutan untuk mengembalikan larik yang lebih besar.",
		abstract: "Menambahkan larik secara horizontal dan berurutan untuk mengembalikan larik yang lebih besar.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/hstack-function"
		}],
		functionParameter: {
			array1: {
				name: "array",
				detail: "Array yang akan ditambahkan."
			},
			array2: {
				name: "array",
				detail: "Array yang akan ditambahkan."
			}
		}
	},
	HYPERLINK: {
		description: "Membuat hyperlink di dalam sel.",
		abstract: "Membuat hyperlink di dalam sel.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3093313?hl=id"
		}],
		functionParameter: {
			url: {
				name: "url",
				detail: "URL lengkap lokasi tautan dalam tanda kutip atau referensi ke sel yang memuat URL tersebut. Hanya protokol tertentu yang diizinkan; jika tidak ditentukan, http:// digunakan."
			},
			linkLabel: {
				name: "link_label",
				detail: "[OPSIONAL — url secara default] Teks yang ditampilkan dalam sel sebagai tautan, dalam tanda kutip atau referensi ke sel yang memuat label tersebut."
			}
		}
	},
	IMAGE: {
		description: "Fungsi IMAGE menyisipkan gambar ke dalam sel dari lokasi sumber bersama dengan teks alternatif. Anda kemudian bisa memindahkan dan mengubah ukuran sel, mengurutkan dan memfilter, dan bekerja dengan gambar di dalam tabel Excel. Gunakan fungsi ini untuk menyempurnakan daftar data secara visual seperti inventaris, game, karyawan, dan konsep matematika.",
		abstract: "Fungsi IMAGE menyisipkan gambar ke dalam sel dari lokasi sumber bersama dengan teks alternatif. Anda kemudian bisa memindahkan dan mengubah ukuran sel, mengurutkan dan memfilter, dan bekerja dengan gambar di dalam tabel Excel. Gunakan fungsi ini untuk menyempurnakan daftar data secara visual seperti inventaris, game, karyawan, dan konsep matematika.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/image-function"
		}],
		functionParameter: {
			source: {
				name: "source",
				detail: "Jalur URL file gambar yang menggunakan protokol \"https\"."
			},
			altText: {
				name: "alt_text",
				detail: "Teks alternatif yang menjelaskan gambar untuk aksesibilitas."
			},
			sizing: {
				name: "sizing",
				detail: "Menentukan dimensi gambar."
			},
			height: {
				name: "height",
				detail: "Tinggi gambar kustom dalam piksel."
			},
			width: {
				name: "width",
				detail: "Lebar gambar kustom dalam piksel."
			}
		}
	},
	INDEX: {
		description: "Mengembalikan nilai elemen dalam tabel atau array, yang dipilih oleh indeks angka baris dan kolom.",
		abstract: "Mengembalikan nilai elemen dalam tabel atau array, yang dipilih oleh indeks angka baris dan kolom.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/index-function"
		}],
		functionParameter: {
			reference: {
				name: "reference",
				detail: "Referensi ke satu atau beberapa rentang sel."
			},
			rowNum: {
				name: "row_num",
				detail: "Nomor baris dalam referensi yang menjadi sumber pengembalian referensi."
			},
			columnNum: {
				name: "column_num",
				detail: "Nomor kolom dalam referensi yang menjadi sumber pengembalian referensi."
			},
			areaNum: {
				name: "area_num",
				detail: "Memilih rentang dalam referensi untuk mengembalikan perpotongan row_num dan column_num."
			}
		}
	},
	INDIRECT: {
		description: "Mengembalikan referensi yang ditentukan oleh string teks. Referensi langsung dievaluasi untuk menampilkan isinya. Gunakan INDIRECT saat Anda ingin mengubah referensi ke sebuah sel di dalam rumus tanpa mengubah rumusnya.",
		abstract: "Mengembalikan referensi yang ditentukan oleh string teks. Referensi langsung dievaluasi untuk menampilkan isinya. Gunakan INDIRECT saat Anda ingin mengubah referensi ke sebuah sel di dalam rumus tanpa mengubah rumusnya.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/indirect-function"
		}],
		functionParameter: {
			refText: {
				name: "ref_text",
				detail: "Diperlukan. Referensi ke sel yang berisi referensi gaya A1, referensi gaya R1C1, nama yang ditentukan sebagai referensi, atau referensi ke sel sebagai string teks. Jika ref_text bukan referensi sel yang valid, MAKA INDIRECT mengembalikan #REF! nilai kesalahan. Jika ref_text merujuk ke buku kerja lain (referensi eksternal), buku kerja lain harus terbuka. Jika buku kerja sumber tidak terbuka, INDIRECT mengembalikan #REF! nilai kesalahan. Catatan Referensi eksternal tidak didukung di Excel Web App. Jika ref_text merujuk ke rentang sel di luar batas baris 1.048.576 atau batas kolom 16.384 (XFD), MAKA INDIRECT mengembalikan #REF! ."
			},
			a1: {
				name: "a1",
				detail: "Opsional. Sebuah nilai logika yang menentukan jenis referensi apa yang terdapat di dalam ref_text. Jika a1 TRUE atau dikosongkan, maka ref_text diterjemahkan sebagai referensi gaya A1. Jika a1 FALSE atau dikosongkan, maka ref_text diterjemahkan sebagai referensi gaya R1C1."
			}
		}
	},
	LOOKUP: {
		description: "Formulir vektor LOOKUP mencari sebuah nilai dalam rentang satu baris atau satu kolom (yang disebut vektor) dan mengembalikan nilai dari posisi yang sama dalam rentang satu baris atau satu kolom kedua",
		abstract: "Formulir vektor LOOKUP mencari sebuah nilai dalam rentang satu baris atau satu kolom (yang disebut vektor) dan mengembalikan nilai dari posisi yang sama dalam rentang satu baris atau satu kolom kedua",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/lookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "Nilai yang dicari LOOKUP dalam vektor pertama. Dapat berupa angka, teks, nilai logika, nama, atau referensi ke nilai."
			},
			lookupVectorOrArray: {
				name: "lookup_vectorOrArray",
				detail: "Rentang yang hanya berisi satu baris atau satu kolom."
			},
			resultVector: {
				name: "result_vector",
				detail: "Rentang yang hanya berisi satu baris atau kolom dan harus berukuran sama dengan lookup_vector."
			}
		}
	},
	MATCH: {
		description: "Fungsi MATCH mencari item yang ditentukan dalam rentang sel, kemudian mengembalikan posisi relatif item tersebut dalam rentang. Sebagai contoh, jika rentang A1:A3 berisi nilai 5, 25, dan 38, rumus =MATCH(25,A1:A3,0) akan mengembalikan angka 2, karena 25 merupakan item kedua dalam rentang tersebut.",
		abstract: "Fungsi MATCH mencari item yang ditentukan dalam rentang sel, kemudian mengembalikan posisi relatif item tersebut dalam rentang. Sebagai contoh, jika rentang A1:A3 berisi nilai 5, 25, dan 38, rumus =MATCH(25,A1:A3,0) akan mengembalikan angka 2, karena 25 merupakan item kedua dalam rentang tersebut.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/match-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "MATCH menemukan nilai terbesar yang kurang dari atau sama dengan lookup_value . Nilai dalam argumen lookup_array harus diletakkan dalam urutan naik, misalnya: ...-2, -1, 0, 1, 2, ..., A-Z, FALSE, TRUE."
			},
			lookupArray: {
				name: "lookup_array",
				detail: "MATCH menemukan nilai pertama yang sama persis dengan lookup_value . Nilai dalam argumen lookup_array bisa dalam urutan apa pun."
			},
			matchType: {
				name: "match_type",
				detail: "MATCH menemukan nilai terkecil yang lebih besar dari atau sama dengan lookup_value . Nilai dalam argumen lookup_array harus ditempatkan dalam urutan menurun, misalnya: TRUE, FALSE, Z-A, ... 2, 1, 0, -1, -2, ..., dan seterunya."
			}
		}
	},
	OFFSET: {
		description: "Mengembalikan referensi ke rentang yang merupakan jumlah baris dan kolom tertentu dari sel atau rentang sel. Referensi yang dikembalikan dapat berupa sel tunggal atau rentang sel. Anda dapat menentukan jumlah baris dan jumlah kolom yang dikembalikan.",
		abstract: "Mengembalikan referensi ke rentang yang merupakan jumlah baris dan kolom tertentu dari sel atau rentang sel. Referensi yang dikembalikan dapat berupa sel tunggal atau rentang sel. Anda dapat menentukan jumlah baris dan jumlah kolom yang dikembalikan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/offset-function"
		}],
		functionParameter: {
			reference: {
				name: "reference",
				detail: "Diperlukan. Referensi dari mana Anda ingin mendasarkan offset. Referensi harus merujuk ke sel atau rentang sel yang berdekatan; jika tidak, OFFSET mengembalikan #VALUE! nilai kesalahan."
			},
			rows: {
				name: "rows",
				detail: "Diperlukan. Jumlah baris, ke atas atau ke bawah, yang Anda inginkan untuk dirujuk oleh sel kiri atas. Menggunakan 5 sebagai argumen baris menentukan bahwa sel kiri atas dalam referensi adalah lima baris di bawah referensi. Baris bisa berupa positif (yang berarti di bawah referensi awal) atau negatif (yang berarti di atas referensi awal)."
			},
			cols: {
				name: "columns",
				detail: "Diperlukan. Jumlah kolom, ke kiri atau ke kanan, yang Anda inginkan untuk dirujuk oleh sel kiri atas. Menggunakan 5 sebagai argumen cols menentukan bahwa sel kiri atas dalam referensi adalah lima kolom ke kanan referensi. Cols bisa berupa positif (yang berarti ke kanan referensi awal) atau negatif (yang berarti ke kiri referensi awal)."
			},
			height: {
				name: "height",
				detail: "Opsional. Tinggi, dalam jumlah baris, yang merupakan hasil yang Anda inginkan. Tinggi harus berupa bilangan positif."
			},
			width: {
				name: "width",
				detail: "Opsional. Lebar, dalam jumlah kolom, yang merupakan hasil yang Anda inginkan. Lebar harus berupa bilangan positif."
			}
		}
	},
	ROW: {
		description: "Mengembalikan jumlah baris referensi.",
		abstract: "Mengembalikan jumlah baris referensi.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/row-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "Opsional. Sel atau rentang sel yang ingin Anda dapatkan nomor barisnya. Jika referensi dihilangkan, maka akan dianggap sebagai referensi sel di mana fungsi ROW muncul. Jika referensi adalah rentang sel, dan jika ROW dimasukkan sebagai array vertikal, ROW mengembalikan nomor baris referensi sebagai array vertikal. Referensi tidak bisa mengacu ke banyak area."
		} }
	},
	ROWS: {
		description: "Mengembalikan jumlah baris dalam referensi atau array.",
		abstract: "Mengembalikan jumlah baris dalam referensi atau array.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/rows-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "Diperlukan. Array, rumus array, atau referensi ke rentang sel yang anda inginkan jumlah barisnya."
		} }
	},
	RTD: {
		description: "Mengambil data real time dari program yang mendukung otomatisasi COM.",
		abstract: "Mengambil data real time dari program yang mendukung otomatisasi COM.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/rtd-function"
		}],
		functionParameter: {
			progId: {
				name: "progId",
				detail: "Diperlukan. Nama ProgID add-in otomatisasi COM terdaftar yang telah diinstal di komputer lokal. Masukkan nama dalam tanda kutip."
			},
			server: {
				name: "server",
				detail: "Diperlukan. Nama server di mana add-in harus dijalankan. Jika tidak ada server, dan program dijalankan secara lokal, kosongkan argumen. Jika tidak, masukkan tanda kutip (\"\") di sekitar nama server. Saat menggunakan RTD dalam Visual Basic for Applications (VBA), tanda kutip ganda atau properti NullString VBA diperlukan untuk server, sekalipun server berjalan secara lokal."
			},
			topic1: {
				name: "topic1",
				detail: "Topik1 diperlukan, topik berikutnya bersifat opsional. 1 sampai 253 parameter yang bersama-sama menyatakan sebuah data real time yang unik."
			},
			topic2: {
				name: "topic2",
				detail: "Topik1 diperlukan, topik berikutnya bersifat opsional. 1 sampai 253 parameter yang bersama-sama menyatakan sebuah data real time yang unik."
			}
		}
	},
	SORT: {
		description: "Dalam contoh ini, kami mengurutkan menurut Kawasan, Staf Penjualan, dan Produk secara individual dengan =SORT(A2:A17), yang disalin dalam sel F2, H2, dan J2.",
		abstract: "Dalam contoh ini, kami mengurutkan menurut Kawasan, Staf Penjualan, dan Produk secara individual dengan =SORT(A2:A17), yang disalin dalam sel F2, H2, dan J2.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/sort-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Rentang, atau larik yang akan diurutkan"
			},
			sortIndex: {
				name: "sort_index",
				detail: "Angka yang menunjukkan baris atau kolom untuk dasar pengurutan"
			},
			sortOrder: {
				name: "sort_order",
				detail: "Angka yang menunjukkan urutan pengurutan yang diinginkan; 1 untuk urutan naik (default), -1 untuk urutan menurun"
			},
			byCol: {
				name: "by_col",
				detail: "Nilai logika yang menunjukkan arah pengurutan yang diinginkan; FALSE untuk mengurutkan menurut baris (default), TRUE untuk mengurutkan menurut kolom"
			}
		}
	},
	SORTBY: {
		description: "Dalam contoh ini, kami mengurutkan daftar nama orang menurut usia mereka, dalam urutan naik.",
		abstract: "Dalam contoh ini, kami mengurutkan daftar nama orang menurut usia mereka, dalam urutan naik.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/sortby-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Larik atau rentang yang ingin diurutkan"
			},
			byArray1: {
				name: "by_array1",
				detail: "Larik atau rentang yang digunakan untuk mengurutkan"
			},
			sortOrder1: {
				name: "sort_order1",
				detail: "Urutan yang ingin digunakan. 1 untuk naik, -1 untuk turun. Defaultnya adalah naik."
			},
			byArray2: {
				name: "by_array2",
				detail: "Larik atau rentang yang digunakan untuk mengurutkan"
			},
			sortOrder2: {
				name: "sort_order2",
				detail: "Urutan yang ingin digunakan. 1 untuk naik, -1 untuk turun. Defaultnya adalah naik."
			}
		}
	},
	TAKE: {
		description: "Mengembalikan jumlah baris atau kolom yang berdampingan tertentu dari awal atau akhir array.",
		abstract: "Mengembalikan jumlah baris atau kolom yang berdampingan tertentu dari awal atau akhir array.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/take-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Array yang akan diambil baris atau kolomnya."
			},
			rows: {
				name: "rows",
				detail: "Jumlah baris yang akan diambil. Nilai negatif diambil dari akhir array."
			},
			columns: {
				name: "columns",
				detail: "Jumlah kolom yang akan diambil. Nilai negatif diambil dari akhir array."
			}
		}
	},
	TOCOL: {
		description: "Mengembalikan array dalam satu kolom.",
		abstract: "Mengembalikan array dalam satu kolom.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/tocol-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Array atau referensi yang dikembalikan sebagai kolom."
			},
			ignore: {
				name: "ignore",
				detail: "Menentukan apakah jenis nilai tertentu diabaikan. Secara default tidak ada nilai yang diabaikan: 0 mempertahankan semua, 1 mengabaikan kosong, 2 mengabaikan kesalahan, 3 mengabaikan keduanya."
			},
			scanByColumn: {
				name: "scan_by_column",
				detail: "Memindai array berdasarkan kolom. Secara default array dipindai berdasarkan baris; pemindaian menentukan urutan nilai menurut baris atau kolom."
			}
		}
	},
	TOROW: {
		description: "Mengembalikan array dalam satu baris.",
		abstract: "Mengembalikan array dalam satu baris.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/torow-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Array atau referensi yang dikembalikan sebagai baris."
			},
			ignore: {
				name: "ignore",
				detail: "Menentukan apakah jenis nilai tertentu diabaikan. Secara default tidak ada nilai yang diabaikan: 0 mempertahankan semua, 1 mengabaikan kosong, 2 mengabaikan kesalahan, 3 mengabaikan keduanya."
			},
			scanByColumn: {
				name: "scan_by_column",
				detail: "Memindai array berdasarkan kolom. Secara default array dipindai berdasarkan baris; pemindaian menentukan urutan nilai menurut baris atau kolom."
			}
		}
	},
	TRANSPOSE: {
		description: "Terkadang Anda perlu memindahkan atau memutar sel. Anda dapat melakukannya dengan menyalin, menempelkan, dan menggunakan opsi Transpose . Namun, melakukannya akan membuat duplikat data. Jika tidak menginginkannya, Anda dapat mengetikkan rumus, bukan menggunakan fungsi TRANSPOSE. Misalnya, dalam gambar berikut ini, rumus =TRANSPOSE(A1:B4) terletak di sel A1 hingga B4 dan mengaturnya secara horizontal.",
		abstract: "Terkadang Anda perlu memindahkan atau memutar sel. Anda dapat melakukannya dengan menyalin, menempelkan, dan menggunakan opsi Transpose . Namun, melakukannya akan membuat duplikat data. Jika tidak menginginkannya, Anda dapat mengetikkan rumus, bukan menggunakan fungsi TRANSPOSE. Misalnya, dalam gambar berikut ini, rumus =TRANSPOSE(A1:B4) terletak di sel A1 hingga B4 dan mengaturnya secara horizontal.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/transpose-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "Rentang sel atau array dalam lembar kerja."
		} }
	},
	UNIQUE: {
		description: "Menghasilkan nama unik dari daftar nama",
		abstract: "Menghasilkan nama unik dari daftar nama",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/unique-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Rentang atau array yang akan mengembalikan baris atau kolom unik"
			},
			byCol: {
				name: "by_col",
				detail: "Argumen by_col adalah nilai logika yang menunjukkan cara membandingkan. TRUE akan membandingkan kolom satu sama lain dan mengembalikan kolom unik FALSE (atau dihilangkan) akan membandingkan baris satu sama lain dan mengembalikan baris unik"
			},
			exactlyOnce: {
				name: "exactly_once",
				detail: "Argumen exactly_once adalah nilai logika yang akan mengembalikan baris atau kolom yang muncul persis sekali dalam rentang atau array. Ini adalah konsep database yang unik. TRUE akan mengembalikan semua baris atau kolom berbeda yang muncul persis sekali dari rentang atau array FALSE (atau dihilangkan) akan mengembalikan semua baris atau kolom yang berbeda dari rentang atau array"
			}
		}
	},
	VLOOKUP: {
		description: "Gunakan fungsi VLOOKUP untuk mencari nilai dalam tabel.",
		abstract: "Gunakan fungsi VLOOKUP untuk mencari nilai dalam tabel.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/vlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "Nilai yang ingin dicari. Nilai tersebut harus berada di kolom pertama rentang sel yang ditentukan dalam table_array."
			},
			tableArray: {
				name: "table_array",
				detail: "Rentang sel tempat VLOOKUP mencari lookup_value dan nilai yang dikembalikan. Anda dapat menggunakan rentang bernama atau tabel."
			},
			colIndexNum: {
				name: "col_index_num",
				detail: "Nomor kolom, dimulai dari 1 untuk kolom paling kiri table_array, yang berisi nilai yang dikembalikan."
			},
			rangeLookup: {
				name: "range_lookup",
				detail: "Nilai logika yang menentukan apakah VLOOKUP mencari kecocokan perkiraan (1/TRUE) atau tepat (0/FALSE)."
			}
		}
	},
	VSTACK: {
		description: "Menambahkan larik secara vertikal dan berurutan untuk mengembalikan larik yang lebih besar.",
		abstract: "Menambahkan larik secara vertikal dan berurutan untuk mengembalikan larik yang lebih besar.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/vstack-function"
		}],
		functionParameter: {
			array1: {
				name: "array",
				detail: "Array yang akan ditambahkan."
			},
			array2: {
				name: "array",
				detail: "Array yang akan ditambahkan."
			}
		}
	},
	WRAPCOLS: {
		description: "Membungkus baris atau kolom nilai yang disediakan menurut kolom setelah jumlah elemen tertentu untuk membentuk array baru.",
		abstract: "Membungkus baris atau kolom nilai yang disediakan menurut kolom setelah jumlah elemen tertentu untuk membentuk array baru.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/wrapcols-function"
		}],
		functionParameter: {
			vector: {
				name: "vector",
				detail: "Vektor atau referensi untuk membungkus."
			},
			wrapCount: {
				name: "wrap_count",
				detail: "Jumlah nilai maksimum untuk setiap kolom."
			},
			padWith: {
				name: "pad_with",
				detail: "Nilai yang akan diisi dengan tombol angka. Defaultnya adalah #N/A."
			}
		}
	},
	WRAPROWS: {
		description: "Membungkus baris atau kolom nilai yang disediakan menurut baris setelah jumlah elemen tertentu untuk membentuk array baru.",
		abstract: "Membungkus baris atau kolom nilai yang disediakan menurut baris setelah jumlah elemen tertentu untuk membentuk array baru.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/wraprows-function"
		}],
		functionParameter: {
			vector: {
				name: "vector",
				detail: "Vektor atau referensi untuk membungkus."
			},
			wrapCount: {
				name: "wrap_count",
				detail: "Jumlah nilai maksimum untuk setiap baris."
			},
			padWith: {
				name: "pad_with",
				detail: "Nilai yang akan diisi dengan tombol angka. Defaultnya adalah #N/A."
			}
		}
	},
	XLOOKUP: {
		description: "Gunakan fungsi XLOOKUP untuk menemukan berbagai hal dalam tabel atau rentang menurut baris. Misalnya, cari harga komponen otomotif berdasarkan nomor komponen, atau temukan nama karyawan berdasarkan ID karyawan mereka. Dengan XLOOKUP, Anda bisa mencari dalam satu kolom untuk istilah pencarian dan mengembalikan hasil dari baris yang sama di kolom lain, terlepas dari sisi mana kolom yang dikembalikan berada.",
		abstract: "Gunakan fungsi XLOOKUP untuk menemukan berbagai hal dalam tabel atau rentang menurut baris. Misalnya, cari harga komponen otomotif berdasarkan nomor komponen, atau temukan nama karyawan berdasarkan ID karyawan mereka. Dengan XLOOKUP, Anda bisa mencari dalam satu kolom untuk istilah pencarian dan mengembalikan hasil dari baris yang sama di kolom lain, terlepas dari sisi mana kolom yang dikembalikan berada.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/xlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "Nilai yang akan dicari *Jika dihilangkan, XLOOKUP mengembalikan sel kosong yang ditemukan di lookup_array ."
			},
			lookupArray: {
				name: "lookup_array",
				detail: "Array atau rentang untuk dicari"
			},
			returnArray: {
				name: "return_array",
				detail: "Array atau rentang yang akan dikembalikan"
			},
			ifNotFound: {
				name: "if_not_found",
				detail: "Jika kecocokan valid tidak ditemukan, kembalikan teks [if_not_found] yang Anda masukkan. Jika kecocokan valid tidak ditemukan, dan [if_not_found] hilang, #N/A dikembalikan."
			},
			matchMode: {
				name: "match_mode",
				detail: "Tentukan tipe yang cocok: 0 - Persis cocok. Jika tidak ditemukan, kembalikan #N/A. Ini adalah pengaturan default. -1 - Persis cocok. Jika tidak ada yang ditemukan, kembalikan item berikutnya yang lebih kecil. 1 - Persis sama. Jika tidak ditemukan, kembalikan item berikutnya yang lebih besar. 2 - A wildcard match where *, ?, and ~ have special meaning ."
			},
			searchMode: {
				name: "search_mode",
				detail: "Tentukan mode pencarian yang akan digunakan: 1 - Melakukan pencarian dimulai dari item pertama. Ini adalah pengaturan default. -1 - Melakukan pencarian terbalik dimulai dari item terakhir. 2 - Melakukan pencarian biner yang bergantung pada lookup_array diurutkan dalam urutan naik . Jika tidak diurutkan, hasil yang tidak valid akan dikembalikan. -2 - Melakukan pencarian biner yang mengandalkan lookup_array diurutkan dalam urutan menurun . Jika tidak diurutkan, hasil yang tidak valid akan dikembalikan."
			}
		}
	},
	XMATCH: {
		description: "Asumsikan kami memiliki daftar produk di sel C3 hingga C7 dan kami ingin menentukan di mana dalam daftar produk dari sel E3 berada. Di sini, kami akan menggunakan XMATCH untuk menentukan posisi item dalam daftar.",
		abstract: "Asumsikan kami memiliki daftar produk di sel C3 hingga C7 dan kami ingin menentukan di mana dalam daftar produk dari sel E3 berada. Di sini, kami akan menggunakan XMATCH untuk menentukan posisi item dalam daftar.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/xmatch-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "Nilai pencarian"
			},
			lookupArray: {
				name: "lookup_array",
				detail: "Array atau rentang untuk dicari"
			},
			matchMode: {
				name: "match_mode",
				detail: "Tentukan tipe yang cocok: 0 - Kecocokan persis (default) -1 - Sama persis atau item terkecil berikutnya 1 - Kecocokan persis atau item terbesar berikutnya 2 - A wildcard match where *, ?, and ~ have special meaning ."
			},
			searchMode: {
				name: "search_mode",
				detail: "Tentukan tipe pencarian: 1 - Cari dari awal hingga akhir (default) -1 - Cari last-to-first (reverse search). 2 - Melakukan pencarian biner yang bergantung pada lookup_array diurutkan dalam urutan naik . Jika tidak diurutkan, hasil yang tidak valid akan dikembalikan. -2 - Melakukan pencarian biner yang mengandalkan lookup_array diurutkan dalam urutan menurun . Jika tidak diurutkan, hasil yang tidak valid akan dikembalikan."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/math/id-ID.ts
const locale$5 = {
	ABS: {
		description: "Mengembalikan nilai absolut dari suatu angka. Nilai mutlak suatu angka adalah angka tanpa tanda.",
		abstract: "Mengembalikan nilai absolut dari suatu angka. Nilai mutlak suatu angka adalah angka tanpa tanda.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/abs-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan. Bilangan riil yang Anda inginkan nilai mutlaknya."
		} }
	},
	ACOS: {
		description: "Mengembalikan arka kosinus, atau kosinus inversi, dari suatu angka. Arka kosinus adalah sudut yang kosinusnya adalah angka . Sudut yang dikembalikan diberikan dalam satuan radian dalam rentang 0 (nol) hingga pi.",
		abstract: "Mengembalikan arka kosinus, atau kosinus inversi, dari suatu angka. Arka kosinus adalah sudut yang kosinusnya adalah angka . Sudut yang dikembalikan diberikan dalam satuan radian dalam rentang 0 (nol) hingga pi.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/acos-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan. Kosinus sudut yang Anda inginkan dan harus bernilai mulai -1 sampai 1."
		} }
	},
	ACOSH: {
		description: "Mengembalikan nilai inversi kosinus hiperbolik dari bilangan. Bilangan harus lebih besar dari atau sama dengan 1. Nilai inversi kosinus hiperbolik adalah nilai dengan kosinus hiperbolik berupa bilangan , sehingga ACOSH(COSH(bilangan)) sama dengan bilangan .",
		abstract: "Mengembalikan nilai inversi kosinus hiperbolik dari bilangan. Bilangan harus lebih besar dari atau sama dengan 1. Nilai inversi kosinus hiperbolik adalah nilai dengan kosinus hiperbolik berupa bilangan , sehingga ACOSH(COSH(bilangan)) sama dengan bilangan .",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/acosh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan. Bilangan riil sama dengan atau lebih dari 1."
		} }
	},
	ACOT: {
		description: "Mengembalikan nilai utama arka kotangen, atau balikan kotangen dari suatu angka.",
		abstract: "Mengembalikan nilai utama arka kotangen, atau balikan kotangen dari suatu angka.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/acot-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan. Angka adalah kotangen dari sudut yang Anda inginkan. Nilai ini harus berupa bilangan riil."
		} }
	},
	ACOTH: {
		description: "Mengembalikan kotangen hiperbolik balikan dari suatu angka.",
		abstract: "Mengembalikan kotangen hiperbolik balikan dari suatu angka.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/acoth-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Nilai absolut angka harus lebih besar dari 1."
		} }
	},
	AGGREGATE: {
		description: "Mengembalikan agregat dalam daftar atau database. Fungsi AGGREGATE dapat menerapkan fungsi-fungsi agregat lain ke daftar atau database dengan opsi untuk mengabaikan baris tersembunyi dan nilai kesalahan.",
		abstract: "Mengembalikan agregat dalam daftar atau database. Fungsi AGGREGATE dapat menerapkan fungsi-fungsi agregat lain ke daftar atau database dengan opsi untuk mengabaikan baris tersembunyi dan nilai kesalahan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/aggregate-function"
		}],
		functionParameter: {
			functionNum: {
				name: "function_num",
				detail: "Diperlukan. Angka 1 sampai 19 yang menentukan fungsi yang akan digunakan."
			},
			options: {
				name: "options",
				detail: "Diperlukan. Nilai numerik yang menetapkan nilai yang akan diabaikan dalam rentang evaluasi bagi fungsi tersebut. Catatan Fungsi tidak akan mengabaikan baris tersembunyi, subtotal bertumpuk, atau agregat bertumpuk jika argumen array menyertakan penghitungan, misalnya: =AGGREGATE(14,3,A1:A100*(A1:A100>0),1)"
			},
			ref1: {
				name: "ref1",
				detail: "Diperlukan. Argumen numerik pertama untuk fungsi-fungsi yang mengambil beberapa argumen numerik yang Anda inginkan nilai agregatnya."
			},
			ref2: {
				name: "ref2",
				detail: "Opsional. Argumen numerik 2 sampai 253 yang Anda inginkan nilai agregatnya. Untuk fungsi-fungsi yang mengambil array, ref1 adalah array, rumus array, atau referensi ke rentang sel yang Anda inginkan nilai agregatnya. Ref2 adalah argumen kedua yang diperlukan bagi fungsi-fungsi tertentu. Fungsi-fungsi berikut memerlukan argumen ref2:"
			}
		}
	},
	ARABIC: {
		description: "Mengonversi angka Romawi ke angka Arab.",
		abstract: "Mengonversi angka Romawi ke angka Arab.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/arabic-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Diperlukan. String yang dimasukkan dalam tanda kutip, string kosong (\"\"), atau referensi ke sel berisi teks."
		} }
	},
	ASIN: {
		description: "Mengembalikan arka sinus, atau nilai inversi sinus, dari bilangan. Arka sinus adalah sudut yang sinusnya adalah angka . Sudut yang dikembalikan diberikan dalam satuan radian dalam rentang -pi/2 sampai pi/2.",
		abstract: "Mengembalikan arka sinus, atau nilai inversi sinus, dari bilangan. Arka sinus adalah sudut yang sinusnya adalah angka . Sudut yang dikembalikan diberikan dalam satuan radian dalam rentang -pi/2 sampai pi/2.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/asin-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan. Sinus sudut yang Anda inginkan dan harus bernilai mulai -1 sampai 1."
		} }
	},
	ASINH: {
		description: "Mengembalikan nilai inversi sinus hiperbolik bilangan. Nilai inversi sinus hiperbolik adalah nilai yang sinus hiperboliknya berupa angka , sehingga ASINH(SINH(angka)) sama dengan angka .",
		abstract: "Mengembalikan nilai inversi sinus hiperbolik bilangan. Nilai inversi sinus hiperbolik adalah nilai yang sinus hiperboliknya berupa angka , sehingga ASINH(SINH(angka)) sama dengan angka .",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/asinh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan. Setiap bilangan riil."
		} }
	},
	ATAN: {
		description: "Mengembalikan arka tangen, atau inversi tangen dari sebuah bilangan. Arka tangen adalah sudut yang tangennya adalah angka . Sudut yang dikembalikan diberikan dalam radian dalam rentang -pi/2 sampai pi/2.",
		abstract: "Mengembalikan arka tangen, atau inversi tangen dari sebuah bilangan. Arka tangen adalah sudut yang tangennya adalah angka . Sudut yang dikembalikan diberikan dalam radian dalam rentang -pi/2 sampai pi/2.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/atan-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan. Tangen dari sudut yang Anda inginkan."
		} }
	},
	ATAN2: {
		description: "Mengembalikan arka tangen, atau inversi tangen, dari koordinat x dan y yang ditentukan. Arka tangen adalah sudut dari sumbu-x ke garis yang berisi asal (0,0) dan titik dengan koordinat (angka_x, angka_y). Sudut diberikan dalam radian antara -pi dan pi, tidak termasuk -pi.",
		abstract: "Mengembalikan arka tangen, atau inversi tangen, dari koordinat x dan y yang ditentukan. Arka tangen adalah sudut dari sumbu-x ke garis yang berisi asal (0,0) dan titik dengan koordinat (angka_x, angka_y). Sudut diberikan dalam radian antara -pi dan pi, tidak termasuk -pi.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/atan2-function"
		}],
		functionParameter: {
			xNum: {
				name: "x_num",
				detail: "Diperlukan. Koordinat x titik tersebut."
			},
			yNum: {
				name: "y_num",
				detail: "Diperlukan. Koordinat y titik tersebut."
			}
		}
	},
	ATANH: {
		description: "Mengembalikan inversi tangen hiperbolik dari bilangan. Angka harus bernilai antara -1 dan 1 (tidak termasuk -1 dan 1). Inversi tangen hiperbolik adalah nilai yang tangen hiperboliknya berupa angka , sehingga ATANH(TANH(angka)) sama dengan angka .",
		abstract: "Mengembalikan inversi tangen hiperbolik dari bilangan. Angka harus bernilai antara -1 dan 1 (tidak termasuk -1 dan 1). Inversi tangen hiperbolik adalah nilai yang tangen hiperboliknya berupa angka , sehingga ATANH(TANH(angka)) sama dengan angka .",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/atanh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan. Bilangan riil berapa pun antara 1 dan -1."
		} }
	},
	BASE: {
		description: "Mengonversi angka menjadi representasi teks beserta bilangan pokoknya (basis).",
		abstract: "Mengonversi angka menjadi representasi teks beserta bilangan pokoknya (basis).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/base-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. Bilangan yang ingin Anda konversi. Harus berupa bilangan bulat yang lebih besar dari atau sama dengan 0 dan kurang dari 2^53."
			},
			radix: {
				name: "radix",
				detail: "Diperlukan. Bilangan pokok basis yang merupakan hasil konversi bilangan. Harus berupa bilangan bulat yang lebih besar dari atau sama dengan 2 dan kurang dari atau sama dengan 36."
			},
			minLength: {
				name: "min_length",
				detail: "Opsional. Panjang minimum string yang dikembalikan. Harus berupa bilangan bulat yang lebih besar dari atau sama dengan 0."
			}
		}
	},
	CEILING: {
		description: "Mengembalikan angka yang dibulatkan ke atas, menjauh dari nol, ke kelipatan signifikansi terdekat. Misalnya, jika Anda ingin menghindari penggunaan sen dalam harga Anda dan produk Anda dihargai $4,42, gunakan rumus =CEILING(4.42,0.05) untuk membulatkan harga ke atas ke nikel terdekat.",
		abstract: "Mengembalikan angka yang dibulatkan ke atas, menjauh dari nol, ke kelipatan signifikansi terdekat. Misalnya, jika Anda ingin menghindari penggunaan sen dalam harga Anda dan produk Anda dihargai $4,42, gunakan rumus =CEILING(4.42,0.05) untuk membulatkan harga ke atas ke nikel terdekat.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/ceiling-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. Nilai yang ingin Anda bulatkan."
			},
			significance: {
				name: "significance",
				detail: "Diperlukan. Kelipatan yang menjadi tujuan pembulatan."
			}
		}
	},
	CEILING_MATH: {
		description: "LANGIT-LANGIT. Fungsi MATH membulatkan angka ke atas ke bilangan bulat terdekat atau, secara opsional, ke kelipatan signifikansi terdekat.",
		abstract: "LANGIT-LANGIT. Fungsi MATH membulatkan angka ke atas ke bilangan bulat terdekat atau, secara opsional, ke kelipatan signifikansi terdekat.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/ceiling-math-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. (harus antara -2,229E-308.dan 9.99E+307.)"
			},
			significance: {
				name: "significance",
				detail: "Opsional. Ini adalah jumlah digit signifikan setelah koma desimal di mana angka akan dibulatkan."
			},
			mode: {
				name: "mode",
				detail: "Opsional. Ini mengontrol apakah angka negatif dibulatkan ke arah atau menjauh dari nol."
			}
		}
	},
	CEILING_PRECISE: {
		description: "Mengembalikan angka yang dibulatkan ke atas ke bilangan bulat terdekat atau ke kelipatan signifikansi terdekat. Tanpa memperhatikan lambang angkanya, bilangan itu dibulatkan ke atas. Akan tetapi, jika angka signifikansinya nol, maka hasilnya nol.",
		abstract: "Mengembalikan angka yang dibulatkan ke atas ke bilangan bulat terdekat atau ke kelipatan signifikansi terdekat. Tanpa memperhatikan lambang angkanya, bilangan itu dibulatkan ke atas. Akan tetapi, jika angka signifikansinya nol, maka hasilnya nol.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/ceiling-precise-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. Nilai yang akan dibulatkan."
			},
			significance: {
				name: "significance",
				detail: "Opsional. Kelipatan yang menjadi tujuan pembulatan number. Jika signifikansi dikosongkan, maka nilai default adalah 1."
			}
		}
	},
	COMBIN: {
		description: "Mengembalikan jumlah kombinasi untuk jumlah item tertentu. Gunakan COMBIN untuk menentukan total jumlah grup yang memungkinkan untuk jumlah item tertentu.",
		abstract: "Mengembalikan jumlah kombinasi untuk jumlah item tertentu. Gunakan COMBIN untuk menentukan total jumlah grup yang memungkinkan untuk jumlah item tertentu.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/combin-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. Jumlah item."
			},
			numberChosen: {
				name: "number_chosen",
				detail: "Diperlukan. Jumlah item dalam setiap kombinasi."
			}
		}
	},
	COMBINA: {
		description: "Mengembalikan jumlah kombinasi (dengan perulangan) untuk sejumlah item tertentu.",
		abstract: "Mengembalikan jumlah kombinasi (dengan perulangan) untuk sejumlah item tertentu.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/combina-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. Harus lebih besar atau sama dengan 0, dan lebih besar atau sama dengan Number_chosen. Nilai yang bukan bilangan bulat dipotong."
			},
			numberChosen: {
				name: "number_chosen",
				detail: "Diperlukan. Harus lebih besar dari atau sama dengan 0. Nilai yang bukan bilangan bulat dipotong."
			}
		}
	},
	COS: {
		description: "Mengembalikan kosinus dari sudut tertentu.",
		abstract: "Mengembalikan kosinus dari sudut tertentu.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/cos-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan. Sudut dalam radian yang Anda inginkan kosinusnya."
		} }
	},
	COSH: {
		description: "Mengembalikan kosinus hiperbolik dari suatu angka.",
		abstract: "Mengembalikan kosinus hiperbolik dari suatu angka.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/cosh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan. Setiap bilangan riil yang ingin Anda temukan kosinus hiperboliknya."
		} }
	},
	COT: {
		description: "Mengembalikan kotangen sebuah sudut yang ditentukan dalam radian.",
		abstract: "Mengembalikan kotangen sebuah sudut yang ditentukan dalam radian.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/cot-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan. Sudut dalam radian yang Anda inginkan untuk kotangen."
		} }
	},
	COTH: {
		description: "Mengembalikan kotangen hiperbolik dari sudut hiperbolik.",
		abstract: "Mengembalikan kotangen hiperbolik dari sudut hiperbolik.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/coth-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan."
		} }
	},
	CSC: {
		description: "Mengembalikan kosekan sebuah sudut yang ditentukan dalam radian.",
		abstract: "Mengembalikan kosekan sebuah sudut yang ditentukan dalam radian.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/csc-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan."
		} }
	},
	CSCH: {
		description: "Mengembalikan kosekan hiperbolik sebuah sudut yang ditentukan dalam radian.",
		abstract: "Mengembalikan kosekan hiperbolik sebuah sudut yang ditentukan dalam radian.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/csch-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan."
		} }
	},
	DECIMAL: {
		description: "Mengonversi representasi teks dari sebuah basis tertentu ke dalam bilangan desimal.",
		abstract: "Mengonversi representasi teks dari sebuah basis tertentu ke dalam bilangan desimal.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/decimal-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Diperlukan."
			},
			radix: {
				name: "radix",
				detail: "Diperlukan. Bilangan pokok harus berupa bilangan bulat."
			}
		}
	},
	DEGREES: {
		description: "Mengonversi radian ke dalam derajat.",
		abstract: "Mengonversi radian ke dalam derajat.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/degrees-function"
		}],
		functionParameter: { angle: {
			name: "angle",
			detail: "Diperlukan. Sudut dalam radian yang ingin Anda konversi."
		} }
	},
	EVEN: {
		description: "Mengembalikan angka yang dibulatkan ke atas ke bilangan bulat genap terdekat. Anda dapat menggunakan fungsi ini untuk memproses item yang disusun dua-dua. Misalnya, peti kemas dari kayu menampung satu atau dua baris item. Peti tersebut penuh ketika jumlah item, yang dibulatkan ke kelipatan dua terdekat, sesuai dengan kapasitas peti.",
		abstract: "Mengembalikan angka yang dibulatkan ke atas ke bilangan bulat genap terdekat. Anda dapat menggunakan fungsi ini untuk memproses item yang disusun dua-dua. Misalnya, peti kemas dari kayu menampung satu atau dua baris item. Peti tersebut penuh ketika jumlah item, yang dibulatkan ke kelipatan dua terdekat, sesuai dengan kapasitas peti.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/even-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan. Nilai yang akan dibulatkan."
		} }
	},
	EXP: {
		description: "Mengembalikan e yang dinaikkan ke pangkat angka. Konstanta e sama dengan 2,71828182845904, bilangan dasar logaritma natural.",
		abstract: "Mengembalikan e yang dinaikkan ke pangkat angka. Konstanta e sama dengan 2,71828182845904, bilangan dasar logaritma natural.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/exp-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan. Pangkat yang diterapkan ke bilangan dasar e."
		} }
	},
	FACT: {
		description: "Mengembalikan faktorial dari suatu angka. Faktorial suatu angka sama dengan 1*2*3*...* angka.",
		abstract: "Mengembalikan faktorial dari suatu angka. Faktorial suatu angka sama dengan 1*2*3*...* angka.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/fact-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan. Angka nonnegatif yang Anda inginkan faktorialnya. Jika angka bukan bilangan bulat, maka dipotong."
		} }
	},
	FACTDOUBLE: {
		description: "Mengembalikan faktorial ganda dari suatu angka.",
		abstract: "Mengembalikan faktorial ganda dari suatu angka.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/factdouble-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan. Nilai untuk mengembalikan faktorial ganda. Jika angka bukan bilangan bulat, maka dipotong."
		} }
	},
	FLOOR: {
		description: "Fungsi FLOOR di Excel membulatkan angka tertentu ke kelipatan signifikansi yang ditentukan terdekat. Angka negatif dibulatkan ke bawah (negatif lebih lanjut) ke kelipatan terdekat di bawah nol.",
		abstract: "Fungsi FLOOR di Excel membulatkan angka tertentu ke kelipatan signifikansi yang ditentukan terdekat. Angka negatif dibulatkan ke bawah (negatif lebih lanjut) ke kelipatan terdekat di bawah nol.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/floor-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. Nilai numerik yang ingin Anda bulatkan."
			},
			significance: {
				name: "significance",
				detail: "Diperlukan. Kelipatan yang menjadi tujuan pembulatan."
			}
		}
	},
	FLOOR_MATH: {
		description: "Membulatkan angka ke bawah, sampai ke bilangan bulat terdekat atau ke kelipatan signifikansi terdekat.",
		abstract: "Membulatkan angka ke bawah, sampai ke bilangan bulat terdekat atau ke kelipatan signifikansi terdekat.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/floor-math-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. Angka yang akan dibulatkan ke bawah."
			},
			significance: {
				name: "significance",
				detail: "Opsional. Kelipatan yang menjadi tujuan pembulatan."
			},
			mode: {
				name: "mode",
				detail: "Opsional. Arah (mendekati atau menjauhi 0) untuk membulatkan bilangan negatif."
			}
		}
	},
	FLOOR_PRECISE: {
		description: "Mengembalikan angka yang dibulatkan ke bawah ke bilangan bulat terdekat atau ke kelipatan signifikansi terdekat. Tanpa memperhatikan tanda angka, angka dibulatkan ke bawah. Akan tetapi, jika angka signifikansi adalah nol, maka nol dikembalikan.",
		abstract: "Mengembalikan angka yang dibulatkan ke bawah ke bilangan bulat terdekat atau ke kelipatan signifikansi terdekat. Tanpa memperhatikan tanda angka, angka dibulatkan ke bawah. Akan tetapi, jika angka signifikansi adalah nol, maka nol dikembalikan.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/floor-precise-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. Nilai yang akan dibulatkan."
			},
			significance: {
				name: "significance",
				detail: "Opsional. Kelipatan yang menjadi tujuan pembulatan number. Jika signifikansi dikosongkan, maka nilai default adalah 1."
			}
		}
	},
	GCD: {
		description: "Mengembalikan faktor persekutuan terbesar dari dua atau lebih bilangan bulat. Faktor persekutuan terbesar adalah bilangan bulat terbesar yang dapat membagi habis number1 and number2.",
		abstract: "Mengembalikan faktor persekutuan terbesar dari dua atau lebih bilangan bulat. Faktor persekutuan terbesar adalah bilangan bulat terbesar yang dapat membagi habis number1 and number2.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/gcd-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Number1 diperlukan, angka berikutnya bersifat opsional. nilai 1 hingga 255. Jika nilai bukan bilangan bulat, akan terpotong."
			},
			number2: {
				name: "number2",
				detail: "Number1 diperlukan, angka berikutnya bersifat opsional. nilai 1 hingga 255. Jika nilai bukan bilangan bulat, akan terpotong."
			}
		}
	},
	INT: {
		description: "Membulatkan angka ke bawah ke bilangan bulat terdekat.",
		abstract: "Membulatkan angka ke bawah ke bilangan bulat terdekat.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/int-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan. Bilangan riil yang ingin Anda bulatkan ke bawah ke bilangan bulat."
		} }
	},
	ISO_CEILING: {
		description: "Mengembalikan angka yang dibulatkan ke atas ke bilangan bulat terdekat atau ke kelipatan signifikansi terdekat. Tanpa memperhatikan lambang angkanya, bilangan itu dibulatkan ke atas. Akan tetapi, jika angka signifikansinya nol, maka hasilnya nol.",
		abstract: "Mengembalikan angka yang dibulatkan ke atas ke bilangan bulat terdekat atau ke kelipatan signifikansi terdekat. Tanpa memperhatikan lambang angkanya, bilangan itu dibulatkan ke atas. Akan tetapi, jika angka signifikansinya nol, maka hasilnya nol.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/iso-ceiling-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. Nilai yang akan dibulatkan."
			},
			significance: {
				name: "significance",
				detail: "Opsional. Kelipatan yang menjadi tujuan pembulatan number. Jika signifikansi dikosongkan, maka nilai default adalah 1."
			}
		}
	},
	LCM: {
		description: "Mengembalikan kelipatan persekutuan terkecil (KPK) bilangan bulat. KPK adalah bilangan bulat paling kecil yang merupakan kelipatan dari semua argumen bilangan bulat number1, number2, dan seterusnya. Gunakan LCM untuk menambahkan pecahan dengan penyebut yang berbeda.",
		abstract: "Mengembalikan kelipatan persekutuan terkecil (KPK) bilangan bulat. KPK adalah bilangan bulat paling kecil yang merupakan kelipatan dari semua argumen bilangan bulat number1, number2, dan seterusnya. Gunakan LCM untuk menambahkan pecahan dengan penyebut yang berbeda.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/lcm-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Number1 diperlukan, angka berikutnya bersifat opsional. Nilai 1 sampai 255 yang ingin Anda cari KPK-nya. Jika nilai bukan bilangan bulat, maka bilangan tersebut dipotong."
			},
			number2: {
				name: "number2",
				detail: "Number1 diperlukan, angka berikutnya bersifat opsional. Nilai 1 sampai 255 yang ingin Anda cari KPK-nya. Jika nilai bukan bilangan bulat, maka bilangan tersebut dipotong."
			}
		}
	},
	LN: {
		description: "Mengembalikan logaritma natural dari sebuah bilangan. Logaritma natural didasarkan pada konstanta e (2,71828182845904).",
		abstract: "Mengembalikan logaritma natural dari sebuah bilangan. Logaritma natural didasarkan pada konstanta e (2,71828182845904).",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/ln-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan. Bilangan riil positif yang ingin Anda dapatkan logaritma naturalnya."
		} }
	},
	LOG: {
		description: "Mengembalikan logaritma dari bilangan dengan basis tertentu.",
		abstract: "Mengembalikan logaritma dari bilangan dengan basis tertentu.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/log-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. Bilangan riil positif yang ingin Anda dapatkan logaritmanya."
			},
			base: {
				name: "base",
				detail: "Opsional. Basis dari logaritma. Jika basis dikosongkan, maka diasumsikan sebagai 10."
			}
		}
	},
	LOG10: {
		description: "Mengembalikan bilangan logaritma berbasis 10.",
		abstract: "Mengembalikan bilangan logaritma berbasis 10.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/log10-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan. Bilangan riil positif yang ingin Anda dapatkan logaritma berbasis 10."
		} }
	},
	MDETERM: {
		description: "Mengembalikan determinan matriks sebuah array.",
		abstract: "Mengembalikan determinan matriks sebuah array.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/mdeterm-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "Diperlukan. Sebuah array numerik dengan jumlah baris dan kolom yang sama."
		} }
	},
	MINVERSE: {
		description: "Fungsi MINVERSE mengembalikan matriks inversi untuk matriks yang disimpan dalam array.",
		abstract: "Fungsi MINVERSE mengembalikan matriks inversi untuk matriks yang disimpan dalam array.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/minverse-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "Diperlukan. Sebuah array numerik dengan jumlah baris dan kolom yang sama."
		} }
	},
	MMULT: {
		description: "Fungsi MMULT mengembalikan produk matriks dari dua array. Hasilnya adalah sebuah array dengan jumlah baris yang sama dengan array1 dan jumlah kolom yang sama dengan array2.",
		abstract: "Fungsi MMULT mengembalikan produk matriks dari dua array. Hasilnya adalah sebuah array dengan jumlah baris yang sama dengan array1 dan jumlah kolom yang sama dengan array2.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/mmult-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Array yang ingin Anda kalikan."
			},
			array2: {
				name: "array2",
				detail: "Array yang ingin Anda kalikan."
			}
		}
	},
	MOD: {
		description: "Mengembalikan sisa setelah angka dibagi oleh divisor. Hasilnya memiliki lambang yang sama dengan divisor.",
		abstract: "Mengembalikan sisa setelah angka dibagi oleh divisor. Hasilnya memiliki lambang yang sama dengan divisor.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/mod-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. Angka yang ingin Anda cari sisanya."
			},
			divisor: {
				name: "divisor",
				detail: "Diperlukan. Angka untuk membagi angka."
			}
		}
	},
	MROUND: {
		description: "MROUND mengembalikan angka yang dibulatkan ke kelipatan yang diinginkan.",
		abstract: "MROUND mengembalikan angka yang dibulatkan ke kelipatan yang diinginkan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/mround-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. Nilai yang akan dibulatkan."
			},
			multiple: {
				name: "multiple",
				detail: "Diperlukan. Kelipatan yang dituju saat membulatkan angka."
			}
		}
	},
	MULTINOMIAL: {
		description: "Mengembalikan rasio faktorial jumlah nilai terhadap hasil kali faktorial.",
		abstract: "Mengembalikan rasio faktorial jumlah nilai terhadap hasil kali faktorial.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/multinomial-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Number1 diperlukan, angka berikutnya bersifat opsional. Nilai dari 1 sampai 255 yang Anda ingin cari multinomialnya."
			},
			number2: {
				name: "number2",
				detail: "Number1 diperlukan, angka berikutnya bersifat opsional. Nilai dari 1 sampai 255 yang Anda ingin cari multinomialnya."
			}
		}
	},
	MUNIT: {
		description: "Fungsi MUNIT mengembalikan matriks unit untuk dimensi yang ditentukan.",
		abstract: "Fungsi MUNIT mengembalikan matriks unit untuk dimensi yang ditentukan.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/munit-function"
		}],
		functionParameter: { dimension: {
			name: "dimension",
			detail: "Bilangan bulat yang menentukan dimensi matriks unit yang ingin dikembalikan. Mengembalikan array dan dimensinya harus lebih besar dari nol."
		} }
	},
	ODD: {
		description: "Mengembalikan angka yang dibulatkan ke atas ke bilangan bulat ganjil terdekat.",
		abstract: "Mengembalikan angka yang dibulatkan ke atas ke bilangan bulat ganjil terdekat.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/odd-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan. Nilai yang akan dibulatkan."
		} }
	},
	PI: {
		description: "Mengembalikan angka 3,14159265358979, konstanta matematika pi, akurat sampai 15 digit.",
		abstract: "Mengembalikan angka 3,14159265358979, konstanta matematika pi, akurat sampai 15 digit.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/pi-function"
		}],
		functionParameter: {}
	},
	POWER: {
		description: "Mengembalikan sebuah angka yang dipangkatkan.",
		abstract: "Mengembalikan sebuah angka yang dipangkatkan.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/power-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. Bilangan basis. Bisa berupa bilangan riil berapa pun."
			},
			power: {
				name: "power",
				detail: "Diperlukan. Eksponen untuk menaikkan bilangan basis."
			}
		}
	},
	PRODUCT: {
		description: "Fungsi PRODUCT mengalikan semua angka yang diberikan sebagai argumen dan mengembalikan hasil kali. Misalnya, jika sel A1 dan A2 berisi angka, Anda dapat menggunakan rumus =PRODUCT(A1, A2) untuk mengalikan kedua angka tersebut bersama-sama. Anda juga dapat melakukan operasi yang sama dengan menggunakan operator matematika perkalian ( * ); misalnya, =A1 * A2 .",
		abstract: "Fungsi PRODUCT mengalikan semua angka yang diberikan sebagai argumen dan mengembalikan hasil kali. Misalnya, jika sel A1 dan A2 berisi angka, Anda dapat menggunakan rumus =PRODUCT(A1, A2) untuk mengalikan kedua angka tersebut bersama-sama. Anda juga dapat melakukan operasi yang sama dengan menggunakan operator matematika perkalian ( * ); misalnya, =A1 * A2 .",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/product-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Diperlukan. Angka atau rentang pertama yang ingin Anda kalikan."
			},
			number2: {
				name: "number2",
				detail: "Opsional. Angka atau rentang tambahan yang ingin Anda kalikan, maksimum sampai 255 argumen."
			}
		}
	},
	QUOTIENT: {
		description: "Mengembalikan bilangan bulat dari sebuah pembagian. Gunakan fungsi saat Anda ingin menghapus sisa dari sebuah pembagian.",
		abstract: "Mengembalikan bilangan bulat dari sebuah pembagian. Gunakan fungsi saat Anda ingin menghapus sisa dari sebuah pembagian.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/quotient-function"
		}],
		functionParameter: {
			numerator: {
				name: "numerator",
				detail: "Diperlukan. Dividen."
			},
			denominator: {
				name: "denominator",
				detail: "Diperlukan. Pembagi."
			}
		}
	},
	RADIANS: {
		description: "Mengonversi derajat menjadi radian.",
		abstract: "Mengonversi derajat menjadi radian.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/radians-function"
		}],
		functionParameter: { angle: {
			name: "angle",
			detail: "Diperlukan. Sudut dalam derajat yang ingin Anda konversi."
		} }
	},
	RAND: {
		description: "RAND mengembalikan bilangan riil acak yang terdistribusi secara merata yang lebih besar atau sama dengan 0 dan kurang dari 1. Bilangan riil acak akan dikembalikan setiap kali lembar kerja dihitung.",
		abstract: "RAND mengembalikan bilangan riil acak yang terdistribusi secara merata yang lebih besar atau sama dengan 0 dan kurang dari 1. Bilangan riil acak akan dikembalikan setiap kali lembar kerja dihitung.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/rand-function"
		}],
		functionParameter: {}
	},
	RANDARRAY: {
		description: "Dalam contoh berikut, kami membuat larik dengan tinggi 5 baris dan lebar 3 kolom. Contoh pertama mengembalikan rangkaian nilai antara 0 dan 1, yang adalah perilaku default RANDARRAY. Contoh berikutnya mengembalikan rangkaian nilai desimal acak antara 1 dan 100. Terakhir, contoh ketiga mengembalikan rangkaian bilangan bulat acak antara 1 dan 100.",
		abstract: "Dalam contoh berikut, kami membuat larik dengan tinggi 5 baris dan lebar 3 kolom. Contoh pertama mengembalikan rangkaian nilai antara 0 dan 1, yang adalah perilaku default RANDARRAY. Contoh berikutnya mengembalikan rangkaian nilai desimal acak antara 1 dan 100. Terakhir, contoh ketiga mengembalikan rangkaian bilangan bulat acak antara 1 dan 100.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/randarray-function"
		}],
		functionParameter: {
			rows: {
				name: "rows",
				detail: "Jumlah baris yang akan dihasilkan"
			},
			columns: {
				name: "columns",
				detail: "Jumlah kolom yang akan dihasilkan"
			},
			min: {
				name: "min",
				detail: "Angka minimum yang dikembalikan"
			},
			max: {
				name: "max",
				detail: "Angka maksimum yang dikembalikan"
			},
			wholeNumber: {
				name: "whole_number",
				detail: "Mengembalikan bilangan bulat atau nilai desimal TRUE untuk bilangan bulat FALSE untuk angka desimal"
			}
		}
	},
	RANDBETWEEN: {
		description: "Mengembalikan angka bilangan bulat acak di antara angka-angka yang Anda tentukan. Bilangan bulat acak baru akan dikembalikan setiap kali lembar kerja dihitung.",
		abstract: "Mengembalikan angka bilangan bulat acak di antara angka-angka yang Anda tentukan. Bilangan bulat acak baru akan dikembalikan setiap kali lembar kerja dihitung.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/randbetween-function"
		}],
		functionParameter: {
			bottom: {
				name: "bottom",
				detail: "Diperlukan. RANDBETWEEN akan mengembalikan bilangan bulat terkecil."
			},
			top: {
				name: "top",
				detail: "Diperlukan. RANDBETWEEN akan mengembalikan bilangan bulat terbesar."
			}
		}
	},
	ROMAN: {
		description: "Mengonversi angka Arab ke Romawi, sebagai teks.",
		abstract: "Mengonversi angka Arab ke Romawi, sebagai teks.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/roman-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. Angka Arab yang ingin Anda konversikan."
			},
			form: {
				name: "form",
				detail: "Opsional. Angka yang menentukan tipe angka Romawi yang Anda inginkan. Gaya angka Romawi beragam dari Klasik sampai Sederhana, menjadi lebih singkat seiring nilai dari formulir meningkat. Lihat contoh berikut ROMAN(499,0) di bawah."
			}
		}
	},
	ROUND: {
		description: "Fungsi ROUND membulatkan angka ke jumlah digit yang ditentukan. Sebagai contoh, jika sel A1 berisi 23,7825, dan Anda ingin membulatkan nilai itu ke dua tempat desimal, Anda bisa menggunakan rumus berikut:",
		abstract: "Fungsi ROUND membulatkan angka ke jumlah digit yang ditentukan. Sebagai contoh, jika sel A1 berisi 23,7825, dan Anda ingin membulatkan nilai itu ke dua tempat desimal, Anda bisa menggunakan rumus berikut:",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/round-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. Angka yang ingin Anda bulatkan."
			},
			numDigits: {
				name: "num_digits",
				detail: "Diperlukan. Jumlah digit pembulatan yang Anda ingin terapkan pada angka."
			}
		}
	},
	ROUNDBANK: {
		description: "Membulatkan angka dengan metode pembulatan bankir.",
		abstract: "Membulatkan angka dengan metode pembulatan bankir.",
		links: [{
			title: "Instruction",
			url: ""
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Angka yang ingin Anda bulatkan dengan pembulatan bankir."
			},
			numDigits: {
				name: "num_digits",
				detail: "Jumlah digit tujuan pembulatan dengan metode pembulatan bankir."
			}
		}
	},
	ROUNDDOWN: {
		description: "Membulatkan angka ke bawah, mendekati nol.",
		abstract: "Membulatkan angka ke bawah, mendekati nol.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/rounddown-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. Setiap bilangan riil yang ingin Anda bulatkan ke bawah."
			},
			numDigits: {
				name: "num_digits",
				detail: "Diperlukan. Jumlah digit pembulatan yang ingin Anda terapkan pada angka."
			}
		}
	},
	ROUNDUP: {
		description: "Membulatkan angka ke atas, menjauhi 0 (nol).",
		abstract: "Membulatkan angka ke atas, menjauhi 0 (nol).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/roundup-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. Setiap bilangan riil yang ingin Anda bulatkan ke atas."
			},
			numDigits: {
				name: "num_digits",
				detail: "Diperlukan. Jumlah digit pembulatan yang ingin Anda terapkan pada angka."
			}
		}
	},
	SEC: {
		description: "Mengembalikan nilai sekan dari suatu sudut.",
		abstract: "Mengembalikan nilai sekan dari suatu sudut.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/sec-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Sudut dalam radian yang ingin dicari nilai sekannya."
		} }
	},
	SECH: {
		description: "Mengembalikan nilai sekan hiperbolik dari suatu sudut.",
		abstract: "Mengembalikan nilai sekan hiperbolik dari suatu sudut.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/sech-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Sudut dalam radian yang ingin dicari nilai sekan hiperboliknya."
		} }
	},
	SERIESSUM: {
		description: "Banyak fungsi dapat diperkirakan oleh pengembangan deret pangkat.",
		abstract: "Banyak fungsi dapat diperkirakan oleh pengembangan deret pangkat.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/seriessum-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Diperlukan. Nilai input deret pangkat."
			},
			n: {
				name: "n",
				detail: "Diperlukan. Pangkat awal yang ingin Anda terapkan untuk menaikkan x."
			},
			m: {
				name: "m",
				detail: "Diperlukan. Langkah untuk meningkatkan n untuk setiap item dalam deret."
			},
			coefficients: {
				name: "coefficients",
				detail: "Diperlukan. Sekumpulan koefisien di mana setiap pangkat dari x yang berurutan dilipatkan. Jumlah nilai dalam koefisien menentukan jumlah item di deret pangkat. Sebagai contoh, jika ada tiga nilai di koefisien, maka ada tiga item di deret pangkat."
			}
		}
	},
	SEQUENCE: {
		description: "Dalam contoh berikut, kami membuat larik dengan tinggi 4 baris dan lebar 5 kolom menggunakan =SEQUENCE(4,5) .",
		abstract: "Dalam contoh berikut, kami membuat larik dengan tinggi 4 baris dan lebar 5 kolom menggunakan =SEQUENCE(4,5) .",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/sequence-function"
		}],
		functionParameter: {
			rows: {
				name: "rows",
				detail: "Jumlah baris yang ingin dihasilkan"
			},
			columns: {
				name: "columns",
				detail: "Jumlah kolom yang ingin dihasilkan"
			},
			start: {
				name: "start",
				detail: "Angka pertama dalam urutan"
			},
			step: {
				name: "step",
				detail: "Jumlah yang perlu ditambahkan pada setiap nilai berikutnya dalam larik"
			}
		}
	},
	SIGN: {
		description: "Mengembalikan lambang angka. Mengembalikan 1 jika angkanya positif, nol (0) jika angkanya adalah 0, dan -1 jika angkanya negatif.",
		abstract: "Mengembalikan lambang angka. Mengembalikan 1 jika angkanya positif, nol (0) jika angkanya adalah 0, dan -1 jika angkanya negatif.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/sign-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan. Setiap bilangan riil."
		} }
	},
	SIN: {
		description: "Mengembalikan sinus sudut tertentu.",
		abstract: "Mengembalikan sinus sudut tertentu.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/sin-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan. Sudut dalam radian yang ingin Anda dapatkan sinusnya."
		} }
	},
	SINH: {
		description: "Mengembalikan sinus hiperbolik sebuah angka.",
		abstract: "Mengembalikan sinus hiperbolik sebuah angka.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/sinh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan. Setiap bilangan riil."
		} }
	},
	SQRT: {
		description: "Mengembalikan akar kuadrat positif.",
		abstract: "Mengembalikan akar kuadrat positif.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/sqrt-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan. Angka yang ingin Anda dapatkan akar kuadratnya."
		} }
	},
	SQRTPI: {
		description: "Mengembalikan akar kuadrat dari (angka * pi).",
		abstract: "Mengembalikan akar kuadrat dari (angka * pi).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/sqrtpi-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan. Angka yang dikalikan dengan pi."
		} }
	},
	SUBTOTAL: {
		description: "Menghasilkan subtotal dalam daftar atau database. Umumnya lebih muda membuat daftar dengan subtotal dengan menggunakan perintah Subtotal di grup Kerangka di tab Data di aplikasi desktop Excel. Setelah daftar subtotal dibuat, Anda bisa mengubahnya dengan mengedit fungsi SUBTOTAL.",
		abstract: "Menghasilkan subtotal dalam daftar atau database. Umumnya lebih muda membuat daftar dengan subtotal dengan menggunakan perintah Subtotal di grup Kerangka di tab Data di aplikasi desktop Excel. Setelah daftar subtotal dibuat, Anda bisa mengubahnya dengan mengedit fungsi SUBTOTAL.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/subtotal-function"
		}],
		functionParameter: {
			functionNum: {
				name: "function_num",
				detail: "Diperlukan. Angka 1-11 atau 101-111 yang menentukan fungsi yang akan digunakan untuk subtotal. 1-11 menyertakan baris yang disembunyikan secara manual, sementara 101-111, sel yang difilter selalu dikecualikan."
			},
			ref1: {
				name: "ref1",
				detail: "Diperlukan. Rentang atau referensi yang pertama kali dinamai yang ingin Anda dapatkan subtotalnya.."
			},
			ref2: {
				name: "ref2",
				detail: "Opsional. Rentang atau referensi yang dinamai 2 sampai 254 yang ingin Anda dapatkan subtotalnya."
			}
		}
	},
	SUM: {
		description: "Fungsi SUM menambahkan nilai. Anda dapat menambahkan nilai individual, referensi sel atau rentang, atau campuran ketiganya.",
		abstract: "Fungsi SUM menambahkan nilai. Anda dapat menambahkan nilai individual, referensi sel atau rentang, atau campuran ketiganya.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/sum-function"
		}],
		functionParameter: {
			number1: {
				name: "Number 1",
				detail: "Angka pertama yang ingin Anda tambahkan. Angkanya bisa seperti 4, referensi sel seperti B6, atau rentang sel seperti B2:B8."
			},
			number2: {
				name: "Number 2",
				detail: "Inilah angka kedua yang ingin Anda tambahkan. Anda dapat menentukan hingga 255 angka dengan cara ini."
			}
		}
	},
	SUMIF: {
		description: "Anda menggunakan fungsi SUMIF untuk menjumlahkan nilai dalam rentang yang memenuhi kriteria yang Anda tentukan. Sebagai contoh, di dalam kolom yang berisi angka, Anda hanya ingin menjumlahkan nilai-nilai yang lebih besar dari 5. Anda dapat menggunakan rumus berikut: =SUMIF(B2:B25,\">5\")",
		abstract: "Anda menggunakan fungsi SUMIF untuk menjumlahkan nilai dalam rentang yang memenuhi kriteria yang Anda tentukan. Sebagai contoh, di dalam kolom yang berisi angka, Anda hanya ingin menjumlahkan nilai-nilai yang lebih besar dari 5. Anda dapat menggunakan rumus berikut: =SUMIF(B2:B25,\">5\")",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/sumif-function"
		}],
		functionParameter: {
			range: {
				name: "range",
				detail: "Diperlukan. Rentang sel yang akan Anda evaluasi menurut kriteria. Sel di setiap rentang harus merupakan angka atau nama, array, atau referensi yang berisi angka. Sel kosong atau nilai teks diabaikan. Rentang yang dipilih dapat berisi tanggal dalam format Excel standar (contoh di bawah)."
			},
			criteria: {
				name: "criteria",
				detail: "Diperlukan. Kriteria dalam bentuk angka, ekspresi, referensi sel, teks, atau fungsi yang menentukan sel mana yang akan ditambahkan. Karakter wildcard dapat disertakan - tanda tanya (?) untuk mencocokkan karakter tunggal apa pun, tanda bintang (*) untuk mencocokkan urutan karakter apa pun. Jika Anda ingin menemukan tanda tanya atau tanda bintang aktual, ketikkan tilde ( ~ ) sebelum karakter. Misalnya, kriteria dapat dinyatakan sebagai 32, \">32\", B5, \"3?\", \"apple*\", \"*~?\", atau TODAY(). Penting Kriteria teks atau kriteria apa pun yang mencakup simbol logika atau matematika harus disertakan dalam tanda kutip ganda ( \" ). Jika kriteria adalah numerik, tanda kutip ganda tidak diperlukan."
			},
			sumRange: {
				name: "sum_range",
				detail: "Opsional. Sel aktual untuk ditambahkan, jika Anda ingin menambahkan sel selain sel yang ditentukan dalam argumen rentang . Jika argumen sum_range dihilangkan, Excel menambahkan sel yang ditentukan dalam argumen rentang (sel yang sama dengan tempat kriteria diterapkan). Sum_range harus memiliki ukuran dan bentuk yang sama dengan rentang . Jika tidak, kinerja mungkin menderita, dan rumus akan menjumlahkan rentang sel yang dimulai dengan sel pertama di sum_range tetapi memiliki dimensi yang sama seperti rentang . Misalnya: rentang sum_range Sel yang dijumlahkan aktual A1:A5 B1:B5 B1:B5 A1:A5 B1:K5 B1:B5"
			}
		}
	},
	SUMIFS: {
		description: "Fungsi SUMIFS, salah satu dari fungsi matematika dan trigonometri , menambahkan semua argumennya yang memenuhi beberapa kriteria. Sebagai contoh, gunakan SUMIFS untuk menjumlahkan jumlah pengecer di negara yang (1) berada dalam satu kode pos dan (2) yang labanya melebihi nilai dolar tertentu.",
		abstract: "Fungsi SUMIFS, salah satu dari fungsi matematika dan trigonometri , menambahkan semua argumennya yang memenuhi beberapa kriteria. Sebagai contoh, gunakan SUMIFS untuk menjumlahkan jumlah pengecer di negara yang (1) berada dalam satu kode pos dan (2) yang labanya melebihi nilai dolar tertentu.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/sumifs-function"
		}],
		functionParameter: {
			sumRange: {
				name: "sum_range",
				detail: "Rentang sel untuk dijumlahkan."
			},
			criteriaRange1: {
				name: "criteria_range1",
				detail: "Rentang yang diuji menggunakan Criteria1 . Criteria_range1 dan Criteria1 menyiapkan pasangan pencarian di mana rentang dicari untuk kriteria tertentu. Setelah item dalam rentang ditemukan, nilai terkaitnya dalam Sum_range ditambahkan."
			},
			criteria1: {
				name: "criteria1",
				detail: "Kriteria yang menentukan sel mana di Criteria_range1 yang akan ditambahkan. Misalnya, kriteria dapat dimasukkan sebagai 32 , \">32\" , B4 , \"apel\" , atau \"32\" ."
			},
			criteriaRange2: {
				name: "criteriaRange2",
				detail: "Rentang tambahan dan kriteria yang terkait. Anda bisa memasukkan hingga 127 pasang rentang/kriteria."
			},
			criteria2: {
				name: "criteria2",
				detail: "Rentang tambahan dan kriteria yang terkait. Anda bisa memasukkan hingga 127 pasang rentang/kriteria."
			}
		}
	},
	SUMPRODUCT: {
		description: "Fungsi SUMPRODUCT mengembalikan jumlah produk rentang atau array terkait. Operasi default adalah perkalian, tetapi penambahan, pengurangan, dan pembagian juga dimungkinkan.",
		abstract: "Fungsi SUMPRODUCT mengembalikan jumlah produk rentang atau array terkait. Operasi default adalah perkalian, tetapi penambahan, pengurangan, dan pembagian juga dimungkinkan.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/sumproduct-function"
		}],
		functionParameter: {
			array1: {
				name: "array",
				detail: "Argumen array pertama yang komponen-komponennya ingin Anda kalikan lalu tambahkan."
			},
			array2: {
				name: "array",
				detail: "Argumen array 2 sampai 255 yang komponen-komponennya ingin Anda kalikan lalu tambahkan."
			}
		}
	},
	SUMSQ: {
		description: "Mengembalikan jumlah kuadrat dari argumen.",
		abstract: "Mengembalikan jumlah kuadrat dari argumen.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/sumsq-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Number1 diperlukan. Angka berikutnya bersifat opsional. Bisa ada sebanyak 255 argumen yang Anda inginkan jumlah kuadratnya."
			},
			number2: {
				name: "number2",
				detail: "Number1 diperlukan. Angka berikutnya bersifat opsional. Bisa ada sebanyak 255 argumen yang Anda inginkan jumlah kuadratnya."
			}
		}
	},
	SUMX2MY2: {
		description: "Fungsi Excel ini mengembalikan jumlah selisih kuadrat dari nilai terkait dalam dua array.",
		abstract: "Fungsi Excel ini mengembalikan jumlah selisih kuadrat dari nilai terkait dalam dua array.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/sumx2my2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "array_x",
				detail: "Diperlukan. Array atau rentang nilai pertama."
			},
			arrayY: {
				name: "array_y",
				detail: "Diperlukan. Array atau rentang nilai kedua."
			}
		}
	},
	SUMX2PY2: {
		description: "Mengembalikan jumlah dari jumlah kuadrat dari nilai yang terkait dalam dua array. Jumlah dari jumlah kuadrat adalah istilah yang umum dalam banyak perhitungan statistik.",
		abstract: "Mengembalikan jumlah dari jumlah kuadrat dari nilai yang terkait dalam dua array. Jumlah dari jumlah kuadrat adalah istilah yang umum dalam banyak perhitungan statistik.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/sumx2py2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "array_x",
				detail: "Diperlukan. Array atau rentang nilai pertama."
			},
			arrayY: {
				name: "array_y",
				detail: "Diperlukan. Array atau rentang nilai kedua."
			}
		}
	},
	SUMXMY2: {
		description: "Fungsi SUMXMY2 mengembalikan jumlah kuadrat selisih nilai terkait dalam dua array.",
		abstract: "Fungsi SUMXMY2 mengembalikan jumlah kuadrat selisih nilai terkait dalam dua array.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/sumxmy2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "array_x",
				detail: "Array atau rentang nilai pertama. Diperlukan."
			},
			arrayY: {
				name: "array_y",
				detail: "Array atau rentang nilai kedua. Diperlukan."
			}
		}
	},
	TAN: {
		description: "Mengembalikan tangen dari sudut yang diberikan.",
		abstract: "Mengembalikan tangen dari sudut yang diberikan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/tan-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan. Sudut dalam radian yang ingin Anda dapatkan tangennya."
		} }
	},
	TANH: {
		description: "Mengembalikan tangen hiperbolik dari sebuah angka.",
		abstract: "Mengembalikan tangen hiperbolik dari sebuah angka.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/tanh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan. Setiap bilangan riil."
		} }
	},
	TRUNC: {
		description: "Fungsi TRUNC memotong angka menjadi bilangan bulat dengan menghapus bagian pecahan dari angka.",
		abstract: "Fungsi TRUNC memotong angka menjadi bilangan bulat dengan menghapus bagian pecahan dari angka.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/trunc-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. Angka yang ingin Anda potong."
			},
			numDigits: {
				name: "num_digits",
				detail: "Opsional. Angka yang menentukan presisi dari pemotongan. Nilai default untuk num_digits adalah 0 (nol)."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/statistical/id-ID.ts
const locale$4 = {
	AVEDEV: {
		description: "Mengembalikan rata-rata simpangan mutlak titik data dari nilai rata-ratanya. AVEDEV adalah ukuran variabilitas dalam sekumpulan data.",
		abstract: "Mengembalikan rata-rata simpangan mutlak titik data dari nilai rata-ratanya. AVEDEV adalah ukuran variabilitas dalam sekumpulan data.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/avedev-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Number1 diperlukan, angka berikutnya bersifat opsional. Argumen 1 sampai 255 yang ingin Anda dapatkan rata-rata simpangan mutlaknya. Anda juga dapat menggunakan array tunggal atau referensi ke array daripada argumen-argumen yang dipisahkan oleh koma."
			},
			number2: {
				name: "number2",
				detail: "Number1 diperlukan, angka berikutnya bersifat opsional. Argumen 1 sampai 255 yang ingin Anda dapatkan rata-rata simpangan mutlaknya. Anda juga dapat menggunakan array tunggal atau referensi ke array daripada argumen-argumen yang dipisahkan oleh koma."
			}
		}
	},
	AVERAGE: {
		description: "Mengembalikan rata-rata (rata-rata aritmetika) argumen. Misalnya, jika rentang A1:A20 berisi angka, rumus =AVERAGE(A1:A20) mengembalikan rata-rata angka tersebut.",
		abstract: "Mengembalikan rata-rata (rata-rata aritmetika) argumen. Misalnya, jika rentang A1:A20 berisi angka, rumus =AVERAGE(A1:A20) mengembalikan rata-rata angka tersebut.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/average-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Diperlukan. Angka pertama, referensi sel, atau rentang yang anda inginkan rata-ratanya."
			},
			number2: {
				name: "number2",
				detail: "Opsional. Angka tambahan, referensi sel, atau rentang yang Anda inginkan rata-ratanya, hingga maksimum 255."
			}
		}
	},
	AVERAGE_WEIGHTED: {
		description: "Fungsi AVERAGE.WEIGHTED menghitung rata-rata tertimbang dari sekumpulan nilai menggunakan nilai dan bobotnya masing-masing.",
		abstract: "Fungsi AVERAGE.WEIGHTED menghitung rata-rata tertimbang dari sekumpulan nilai menggunakan nilai dan bobotnya masing-masing.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9084098?hl=id"
		}],
		functionParameter: {
			values: {
				name: "nilai",
				detail: "Nilai yang akan dihitung rata-ratanya. Dapat berupa rentang sel atau nilai itu sendiri."
			},
			weights: {
				name: "bobot",
				detail: "Daftar bobot terkait yang akan diterapkan. Bobot boleh nol tetapi tidak boleh negatif, dan setidaknya satu bobot harus positif. Rentang bobot harus memiliki jumlah baris dan kolom yang sama dengan rentang nilai."
			},
			additionalValues: {
				name: "nilai_tambahan",
				detail: "Nilai tambahan opsional yang akan dihitung rata-ratanya."
			},
			additionalWeights: {
				name: "bobot_tambahan",
				detail: "Bobot tambahan opsional. Setiap nilai_tambahan harus diikuti tepat satu bobot_tambahan."
			}
		}
	},
	AVERAGEA: {
		description: "Menghitung rata-rata (rata-rata aritmatika) dari nilai-nilai di daftar argumen.",
		abstract: "Menghitung rata-rata (rata-rata aritmatika) dari nilai-nilai di daftar argumen.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/averagea-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Value1 diperlukan, nilai berikutnya opsional. Sel 1 hingga 255, rentang sel, atau nilai yang ingin Anda ketahui rata-ratanya."
			},
			value2: {
				name: "value2",
				detail: "Value1 diperlukan, nilai berikutnya opsional. Sel 1 hingga 255, rentang sel, atau nilai yang ingin Anda ketahui rata-ratanya."
			}
		}
	},
	AVERAGEIF: {
		description: "Mengembalikan nilai rata-rata (nilai rata-rata aritmatika) dari semua sel dalam range yang memenuhi kriteria.",
		abstract: "Mengembalikan nilai rata-rata (nilai rata-rata aritmatika) dari semua sel dalam range yang memenuhi kriteria.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/averageif-function"
		}],
		functionParameter: {
			range: {
				name: "range",
				detail: "Diperlukan. Satu atau beberapa sel yang akan dihitung rata-ratanya, termasuk angka atau nama, array, atau referensi yang berisi angka."
			},
			criteria: {
				name: "criteria",
				detail: "Diperlukan. Kriteria dalam bentuk angka, ekspresi, referensi sel, atau teks menentukan sel mana yang akan dihitung rata-ratanya. Misalnya, kriteria dapat dinyatakan sebagai 32, \"32\", \">32\", \"apel\", atau B4."
			},
			averageRange: {
				name: "average_range",
				detail: "Opsional. Kumpulan sel sesungguhnya yang akan dihitung rata-ratanya. Jika dikosongkan, maka range digunakan."
			}
		}
	},
	AVERAGEIFS: {
		description: "Mengembalikan rata-rata (rata-rata aritmatika) untuk semua sel yang memenuhi beberapa kriteria.",
		abstract: "Mengembalikan rata-rata (rata-rata aritmatika) untuk semua sel yang memenuhi beberapa kriteria.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/averageifs-function"
		}],
		functionParameter: {
			averageRange: {
				name: "average_range",
				detail: "Diperlukan. Satu atau beberapa sel yang akan dihitung rata-ratanya, termasuk angka atau nama, array, atau referensi yang berisi angka."
			},
			criteriaRange1: {
				name: "criteria_range1",
				detail: "Criteria_range1 diperlukan, criteria_range berikutnya opsional. 1 hingga 127 rentang yang digunakan untuk mengevaluasi kriteria terkait."
			},
			criteria1: {
				name: "criteria1",
				detail: "Criteria1 diperlukan, kriteria berikutnya bersifat opsional. 1 hingga 127 kriteria dalam bentuk angka, ekspresi, referensi sel, atau teks yang menentukan sel yang akan dihitung rata-ratanya. Misalnya, kriteria dapat dinyatakan sebagai 32, \"32\", \">32\", \"apel\", atau B4."
			},
			criteriaRange2: {
				name: "criteria_range2",
				detail: "Criteria_range1 diperlukan, criteria_range berikutnya opsional. 1 hingga 127 rentang yang digunakan untuk mengevaluasi kriteria terkait."
			},
			criteria2: {
				name: "criteria2",
				detail: "Criteria1 diperlukan, kriteria berikutnya bersifat opsional. 1 hingga 127 kriteria dalam bentuk angka, ekspresi, referensi sel, atau teks yang menentukan sel yang akan dihitung rata-ratanya. Misalnya, kriteria dapat dinyatakan sebagai 32, \"32\", \">32\", \"apel\", atau B4."
			}
		}
	},
	BETA_DIST: {
		description: "Distribusi beta umumnya digunakan untuk mengkaji variasi dalam persentase sesuatu lintas sampel, seperti pecahan hari yang dihabiskan orang untuk menonton televisi.",
		abstract: "Distribusi beta umumnya digunakan untuk mengkaji variasi dalam persentase sesuatu lintas sampel, seperti pecahan hari yang dihabiskan orang untuk menonton televisi.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/beta-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Diperlukan. Nilai antara A dan B untuk mengevaluasi fungsi"
			},
			alpha: {
				name: "alpha",
				detail: "Diperlukan. Parameter distribusi."
			},
			beta: {
				name: "beta",
				detail: "Diperlukan. Parameter distribusi."
			},
			cumulative: {
				name: "cumulative",
				detail: "Diperlukan. Nilai logika yang menentukan formulir fungsi. Jika secara kumulatif adalah TRUE, BETA.DIST mengembalikan fungsi distribusi kumulatif; jika FALSE, mengembalikan fungsi kepadatan probabilitas."
			},
			A: {
				name: "A",
				detail: "Batas bawah pada interval x."
			},
			B: {
				name: "B",
				detail: "Opsional. Batas atas pada interval x."
			}
		}
	},
	BETA_INV: {
		description: "Jika probabilitas = BETA.DIST(x,...TRUE), maka BETA.INV(probability,...) = x. Distribusi beta dapat digunakan dalam perencanaan proyek untuk membuat model waktu penyelesaian yang mungkin dengan waktu penyelesaian yang diharapkan dan variabilitas.",
		abstract: "Jika probabilitas = BETA.DIST(x,...TRUE), maka BETA.INV(probability,...) = x. Distribusi beta dapat digunakan dalam perencanaan proyek untuk membuat model waktu penyelesaian yang mungkin dengan waktu penyelesaian yang diharapkan dan variabilitas.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/beta-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Diperlukan. Probabilitas yang dikaitkan dengan distribusi beta."
			},
			alpha: {
				name: "alpha",
				detail: "Diperlukan. Parameter distribusi."
			},
			beta: {
				name: "beta",
				detail: "Diperlukan. Parameter terhadap distribusi."
			},
			A: {
				name: "A",
				detail: "Batas bawah pada interval x."
			},
			B: {
				name: "B",
				detail: "Opsional. Batas atas pada interval x."
			}
		}
	},
	BINOM_DIST: {
		description: "Mengembalikan probabilitas distribusi binomial individual. Gunakan BINOM.DIST dalam soal dengan angka uji atau percobaan tetap, ketika hasil percobaan hanya berhasil atau gagal, ketika percobaan bersifat independen, dan ketika probabilitas keberhasilan adalah konstan selama eksperimen tersebut. Misalnya, BINOM.DIST dapat menghitung probabilitas bahwa dua dari tiga bayi yang lahir berikutnya adalah laki-laki.",
		abstract: "Mengembalikan probabilitas distribusi binomial individual. Gunakan BINOM.DIST dalam soal dengan angka uji atau percobaan tetap, ketika hasil percobaan hanya berhasil atau gagal, ketika percobaan bersifat independen, dan ketika probabilitas keberhasilan adalah konstan selama eksperimen tersebut. Misalnya, BINOM.DIST dapat menghitung probabilitas bahwa dua dari tiga bayi yang lahir berikutnya adalah laki-laki.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/binom-dist-function"
		}],
		functionParameter: {
			numberS: {
				name: "number_s",
				detail: "Diperlukan. Jumlah keberhasilan dalam percobaan."
			},
			trials: {
				name: "trials",
				detail: "Diperlukan. Jumlah percobaan independen."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Diperlukan. Probabilitas keberhasilan pada setiap percobaan."
			},
			cumulative: {
				name: "cumulative",
				detail: "Diperlukan. Nilai logika yang menentukan formulir fungsi. Jika cumulative adalah TRUE, maka BINOM.DIST mengembalikan fungsi distribusi kumulatif, yakni probabilitas bahwa terdapat sebagian besar keberhasilan number_s; jika FALSE, mengembalikan fungsi massa probabilitas, yakni probabilitas bahwa terdapat number_s keberhasilan."
			}
		}
	},
	BINOM_DIST_RANGE: {
		description: "Mengembalikan probabilitas hasil percobaan menggunakan distribusi binomial.",
		abstract: "Mengembalikan probabilitas hasil percobaan menggunakan distribusi binomial.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/binom-dist-range-function"
		}],
		functionParameter: {
			trials: {
				name: "trials",
				detail: "Diperlukan. Jumlah percobaan independen. Harus lebih besar dari atau sama dengan 0."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Diperlukan. Probabilitas keberhasilan di setiap percobaan. Harus lebih besar dari atau sama dengan 0 dan kurang dari atau sama dengan 1."
			},
			numberS: {
				name: "number_s",
				detail: "Diperlukan. Jumlah keberhasilan dalam percobaan. Harus lebih besar dari atau sama dengan 0 dan kurang dari atau sama dengan Percobaan."
			},
			numberS2: {
				name: "number_s2",
				detail: "Opsional. Jika ada, mengembalikan probabilitas jumlah percobaan yang berhasil dalam rentang antara Number_s dan number_s2. Harus lebih besar dari atau sama dengan Number_s dan kurang dari atau sama dengan Trials."
			}
		}
	},
	BINOM_INV: {
		description: "Mengembalikan nilai terkecil di mana distribusi binomial kumulatifnya lebih besar dari atau sama dengan nilai kriteria.",
		abstract: "Mengembalikan nilai terkecil di mana distribusi binomial kumulatifnya lebih besar dari atau sama dengan nilai kriteria.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/binom-inv-function"
		}],
		functionParameter: {
			trials: {
				name: "trials",
				detail: "Diperlukan. Jumlah percobaan Bernoulli."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Diperlukan. Probabilitas keberhasilan pada setiap percobaan."
			},
			alpha: {
				name: "alpha",
				detail: "Diperlukan. Nilai kriteria."
			}
		}
	},
	CHISQ_DIST: {
		description: "Mengembalikan distribusi khi-kuadrat.",
		abstract: "Mengembalikan distribusi khi-kuadrat.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/chisq-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Diperlukan. Nilai yang ingin digunakan untuk mengevaluasi distribusi."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Diperlukan. Angka derajat kebebasan."
			},
			cumulative: {
				name: "cumulative",
				detail: "Diperlukan. Nilai logika yang menentukan formulir fungsi. Jika secara kumulatif adalah TRUE, CHISQ.DIST mengembalikan fungsi distribusi kumulatif; jika FALSE, mengembalikan fungsi kerapatan probabilitas."
			}
		}
	},
	CHISQ_DIST_RT: {
		description: "Distribusi χ2 dikaitkan dengan uji χ2. Gunakan uji χ2 untuk membandingkan nilai yang diamati dan yang diharapkan. Misalnya, eksperimen genetik mungkin membuat hipotesis bahwa generasi tumbuhan berikutnya akan menunjukkan kumpulan warna tertentu. Dengan membandingkan hasil yang diamati dengan hasil yang diharapkan, Anda dapat memutuskan apakah hipotesis awal Anda valid.",
		abstract: "Distribusi χ2 dikaitkan dengan uji χ2. Gunakan uji χ2 untuk membandingkan nilai yang diamati dan yang diharapkan. Misalnya, eksperimen genetik mungkin membuat hipotesis bahwa generasi tumbuhan berikutnya akan menunjukkan kumpulan warna tertentu. Dengan membandingkan hasil yang diamati dengan hasil yang diharapkan, Anda dapat memutuskan apakah hipotesis awal Anda valid.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/chisq-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Diperlukan. Nilai yang ingin digunakan untuk mengevaluasi distribusi."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Diperlukan. Angka derajat kebebasan."
			}
		}
	},
	CHISQ_INV: {
		description: "Distribusi khi-kuadrat umumnya digunakan untuk mengkaji variasi dalam persentase sesuatu lintas sampel, seperti pecahan hari yang dihabiskan orang untuk menonton televisi.",
		abstract: "Distribusi khi-kuadrat umumnya digunakan untuk mengkaji variasi dalam persentase sesuatu lintas sampel, seperti pecahan hari yang dihabiskan orang untuk menonton televisi.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/chisq-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Diperlukan. Probabilitas yang dikaitkan dengan distribusi khi-kuadrat."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Diperlukan. Angka derajat kebebasan."
			}
		}
	},
	CHISQ_INV_RT: {
		description: "Jika probabilitas = CHISQ.DIST.RT(x,...), maka CHISQ.INV.RT(probabilitas,...) = x. Gunakan fungsi ini untuk membandingkan hasil yang diamati dengan hasil yang diharapkan untuk memutuskan apakah hipotesis awal Anda valid.",
		abstract: "Jika probabilitas = CHISQ.DIST.RT(x,...), maka CHISQ.INV.RT(probabilitas,...) = x. Gunakan fungsi ini untuk membandingkan hasil yang diamati dengan hasil yang diharapkan untuk memutuskan apakah hipotesis awal Anda valid.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/chisq-inv-rt-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Diperlukan. Probabilitas yang dikaitkan dengan distribusi khi-kuadrat."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Diperlukan. Angka derajat kebebasan."
			}
		}
	},
	CHISQ_TEST: {
		description: "Mengembalikan uji untuk independensi. CHISQ.TEST mengembalikan nilai dari distribusi khi kuadrat (χ2) untuk statistik dan derajat kebebasan yang tepat. Anda dapat menggunakan uji χ2 untuk menentukan apakah hasil yang dihipotesis diverifikasi oleh eksperimen.",
		abstract: "Mengembalikan uji untuk independensi. CHISQ.TEST mengembalikan nilai dari distribusi khi kuadrat (χ2) untuk statistik dan derajat kebebasan yang tepat. Anda dapat menggunakan uji χ2 untuk menentukan apakah hasil yang dihipotesis diverifikasi oleh eksperimen.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/chisq-test-function"
		}],
		functionParameter: {
			actualRange: {
				name: "actual_range",
				detail: "Diperlukan. Rentang data yang berisi observasi untuk menguji nilai-nilai yang diharapkan."
			},
			expectedRange: {
				name: "expected_range",
				detail: "Diperlukan. Rentang data yang berisi rasio produk dari total baris dan total kolom dengan total keseluruhan."
			}
		}
	},
	CONFIDENCE_NORM: {
		description: "Interval kepercayaan adalah suatu rentang nilai. Rata-rata sampel Anda, x, berada di tengah rentang ini dan rentangnya x ± CONFIDENCE.NORM. Misalnya, jika x adalah rata-rata sampel waktu pengiriman untuk produk yang dipesan melalui email, x ± CONFIDENCE. NORM adalah rentang sarana populasi. Untuk rata-rata populasi, μ0, dalam rentang ini, probabilitas memperoleh rata-rata sampel yang lebih jauh dari μ0 daripada x adalah lebih besar dari alpha; untuk rata-rata populasi, μ0, bukan dalam rentang ini, probabilitas memperoleh rata-rata sampel yang lebih jauh dari μ0 daripada x adalah kurang dari alpha. Dengan kata lain, asumsikan bahwa kita menggunakan x, standard_dev, dan size untuk membuat uji dua arah pada alpha tingkat signifikansi hipotesis bahwa rata-rata populasi adalah μ0. Maka kita tidak akan menolak hipotesis jika μ0 berada dalam interval kepercayaan tersebut dan akan menolak hipotesis itu jika μ0 tidak dalam interval kepercayaan tersebut. Interval kepercayaan membuat kita tidak dapat menyimpulkan bahwa terdapat probabilitas 1 – alpha bahwa paket berikutnya akan memerlukan waktu pengiriman yang berada dalam interval kepercayaan.",
		abstract: "Interval kepercayaan adalah suatu rentang nilai. Rata-rata sampel Anda, x, berada di tengah rentang ini dan rentangnya x ± CONFIDENCE.NORM. Misalnya, jika x adalah rata-rata sampel waktu pengiriman untuk produk yang dipesan melalui email, x ± CONFIDENCE. NORM adalah rentang sarana populasi. Untuk rata-rata populasi, μ0, dalam rentang ini, probabilitas memperoleh rata-rata sampel yang lebih jauh dari μ0 daripada x adalah lebih besar dari alpha; untuk rata-rata populasi, μ0, bukan dalam rentang ini, probabilitas memperoleh rata-rata sampel yang lebih jauh dari μ0 daripada x adalah kurang dari alpha. Dengan kata lain, asumsikan bahwa kita menggunakan x, standard_dev, dan size untuk membuat uji dua arah pada alpha tingkat signifikansi hipotesis bahwa rata-rata populasi adalah μ0. Maka kita tidak akan menolak hipotesis jika μ0 berada dalam interval kepercayaan tersebut dan akan menolak hipotesis itu jika μ0 tidak dalam interval kepercayaan tersebut. Interval kepercayaan membuat kita tidak dapat menyimpulkan bahwa terdapat probabilitas 1 – alpha bahwa paket berikutnya akan memerlukan waktu pengiriman yang berada dalam interval kepercayaan.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/confidence-norm-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "Diperlukan. Tingkat signifikansi yang digunakan untuk menghitung tingkat kepercayaan. Tingkat kepercayaan sama dengan 100*(1 - alpha)%, atau dengan kata lain, alpha dari 0,05 menunjukkan tingkat kepercayaan 95 persen."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Diperlukan. Simpangan baku populasi untuk rentang data tersebut dan diasumsikan telah diketahui."
			},
			size: {
				name: "size",
				detail: "Diperlukan. Ukuran sampel."
			}
		}
	},
	CONFIDENCE_T: {
		description: "Mengembalikan interval kepercayaan untuk rata-rata populasi, menggunakan distribusi t Student.",
		abstract: "Mengembalikan interval kepercayaan untuk rata-rata populasi, menggunakan distribusi t Student.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/confidence-t-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "Diperlukan. Tingkat signifikansi yang digunakan untuk menghitung tingkat kepercayaan. Tingkat kepercayaan sama dengan 100*(1 - alpha)%, atau dengan kata lain, alpha dari 0,05 menunjukkan tingkat kepercayaan 95 persen."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Diperlukan. Simpangan baku populasi untuk rentang data tersebut dan diasumsikan telah diketahui."
			},
			size: {
				name: "size",
				detail: "Diperlukan. Ukuran sampel."
			}
		}
	},
	CORREL: {
		description: "Fungsi CORREL mengembalikan koefisien korlasi dari dua rentang sel. Gunakan koefisien korelasi untuk menetapkan hubungan antara dua properti. Misalnya, Anda bisa memeriksa hubungan antara suhu rata-rata suatu lokasi dan penggunaan AC.",
		abstract: "Fungsi CORREL mengembalikan koefisien korlasi dari dua rentang sel. Gunakan koefisien korelasi untuk menetapkan hubungan antara dua properti. Misalnya, Anda bisa memeriksa hubungan antara suhu rata-rata suatu lokasi dan penggunaan AC.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/correl-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Diperlukan. Rentang nilai sel."
			},
			array2: {
				name: "array2",
				detail: "Diperlukan. Rentang nilai sel kedua."
			}
		}
	},
	COUNT: {
		description: "Fungsi COUNT menghitung jumlah sel yang berisi angka, dan menghitung angka dalam daftar argumen. Gunakan fungsi COUNT untuk mendapatkan jumlah entri di bidang angka yang ada dalam rentang atau larik angka. Misalnya, Anda bisa memasukkan rumus berikut untuk menghitung angka dalam rentang A1:A20: =COUNT(A1:A20) . Dalam contoh ini, jika ada lima sel dalam rentang berisikan angka, hasilnya adalah 5 .",
		abstract: "Fungsi COUNT menghitung jumlah sel yang berisi angka, dan menghitung angka dalam daftar argumen. Gunakan fungsi COUNT untuk mendapatkan jumlah entri di bidang angka yang ada dalam rentang atau larik angka. Misalnya, Anda bisa memasukkan rumus berikut untuk menghitung angka dalam rentang A1:A20: =COUNT(A1:A20) . Dalam contoh ini, jika ada lima sel dalam rentang berisikan angka, hasilnya adalah 5 .",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/count-function"
		}],
		functionParameter: {
			value1: {
				name: "value 1",
				detail: "Diperlukan. Item pertama, referensi sel, atau rentang yang ingin Anda hitung angkanya."
			},
			value2: {
				name: "value 2",
				detail: "Opsional. Hingga 255 item tambahan, referensi sel, atau rentang yang ingin Anda hitung angkanya."
			}
		}
	},
	COUNTA: {
		description: "Fungsi COUNTA menghitung jumlah sel yang tidak kosong dalam rentang.",
		abstract: "Fungsi COUNTA menghitung jumlah sel yang tidak kosong dalam rentang.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/counta-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Value1 diperlukan, nilai berikutnya opsional. Sel 1 hingga 255, rentang sel, atau nilai yang ingin Anda ketahui rata-ratanya."
			},
			value2: {
				name: "value2",
				detail: "Value1 diperlukan, nilai berikutnya opsional. Sel 1 hingga 255, rentang sel, atau nilai yang ingin Anda ketahui rata-ratanya."
			}
		}
	},
	COUNTBLANK: {
		description: "Gunakan fungsi COUNTBLANK , salah satu fungsi Statistik , untuk menghitung jumlah sel kosong dalam rentang sel.",
		abstract: "Gunakan fungsi COUNTBLANK , salah satu fungsi Statistik , untuk menghitung jumlah sel kosong dalam rentang sel.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/countblank-function"
		}],
		functionParameter: { range: {
			name: "range",
			detail: "Diperlukan. Rentang yang ingin Anda hitung sel kosongnya."
		} }
	},
	COUNTIF: {
		description: "Gunakan COUNTIF, salah satu fungsi statistik , untuk menghitung jumlah sel yang memenuhi kriteria; misalnya, untuk menghitung berapa kali kota tertentu muncul dalam daftar pelanggan.",
		abstract: "Gunakan COUNTIF, salah satu fungsi statistik , untuk menghitung jumlah sel yang memenuhi kriteria; misalnya, untuk menghitung berapa kali kota tertentu muncul dalam daftar pelanggan.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/use-the-countif-function-in-microsoft-excel"
		}],
		functionParameter: {
			range: {
				name: "range",
				detail: "Kelompok sel yang ingin Anda hitung. Rentang bisa berisi angka, array, rentang bernama, atau referensi yang berisi angka. Nilai kosong dan nilai teks diabaikan. Pelajari cara memilih rentang di lembar kerja ."
			},
			criteria: {
				name: "criteria",
				detail: "Angka, ekspresi, referensi sel, atau string teks yang menentukan sel yang akan dihitung. Misalnya, Anda dapat menggunakan angka seperti 32, perbandingan seperti \">32\", sel seperti B4, atau kata seperti \"apel\". COUNTIF hanya menggunakan kriteria tunggal. Gunakan COUNTIFS jika Anda ingin menggunakan beberapa kriteria."
			}
		}
	},
	COUNTIFS: {
		description: "Fungsi COUNTIFS menerapkan kriteria untuk sel di beberapa rentang dan menghitung berapa kali semua kriteria terpenuhi.",
		abstract: "Fungsi COUNTIFS menerapkan kriteria untuk sel di beberapa rentang dan menghitung berapa kali semua kriteria terpenuhi.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/countifs-function"
		}],
		functionParameter: {
			criteriaRange1: {
				name: "criteria_range1",
				detail: "Diperlukan. Rentang pertama untuk mengevaluasi kriteria yang terkait."
			},
			criteria1: {
				name: "criteria1",
				detail: "Diperlukan. Kriteria dalam bentuk angka, ekspresi, referensi sel, atau teks yang menentukan sel mana yang akan dihitung. Misalnya, kriteria dapat dinyatakan sebagai 32, \">32\", B4, \"apel\", atau \"32\"."
			},
			criteriaRange2: {
				name: "criteria_range2",
				detail: "Opsional. Rentang tambahan dan kriteria yang terkait. Hingga 127 pasangan rentang/kriteria yang diperbolehkan."
			},
			criteria2: {
				name: "criteria2",
				detail: "Opsional. Rentang tambahan dan kriteria yang terkait. Hingga 127 pasangan rentang/kriteria yang diperbolehkan."
			}
		}
	},
	COVARIANCE_P: {
		description: "Mengembalikan kovarians populasi, rata-rata produk deviasi untuk masing-masing pasangan titik data dalam dua set data. Gunakan kovarians untuk menentukan hubungan antara dua set data. Misalnya, Anda dapat memeriksa apakah pendapatan yang lebih besar menyertai tingkat pendidikan yang lebih tinggi.",
		abstract: "Mengembalikan kovarians populasi, rata-rata produk deviasi untuk masing-masing pasangan titik data dalam dua set data. Gunakan kovarians untuk menentukan hubungan antara dua set data. Misalnya, Anda dapat memeriksa apakah pendapatan yang lebih besar menyertai tingkat pendidikan yang lebih tinggi.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/covariance-p-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Diperlukan. Rentang sel pertama bilangan bulat."
			},
			array2: {
				name: "array2",
				detail: "Diperlukan. Rentang sel kedua bilangan bulat."
			}
		}
	},
	COVARIANCE_S: {
		description: "Mengembalikan kovarians sampel, rata-rata hasil kali simpangan untuk setiap pasangan titik data dalam dua set data.",
		abstract: "Mengembalikan kovarians sampel, rata-rata hasil kali simpangan untuk setiap pasangan titik data dalam dua set data.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/covariance-s-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Diperlukan. Rentang sel pertama bilangan bulat."
			},
			array2: {
				name: "array2",
				detail: "Diperlukan. Rentang sel kedua bilangan bulat."
			}
		}
	},
	DEVSQ: {
		description: "Mengembalikan jumlah kuadrat simpangan titik data dari nilai tengah sampelnya.",
		abstract: "Mengembalikan jumlah kuadrat simpangan titik data dari nilai tengah sampelnya.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/devsq-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Number1 diperlukan, angka berikutnya bersifat opsional. Argumen 1 sampai 255 tempat Anda ingin menghitung jumlah simpangan kuadrat. Anda juga dapat menggunakan array tunggal atau referensi ke array daripada argumen-argumen yang dipisahkan oleh koma."
			},
			number2: {
				name: "number2",
				detail: "Number1 diperlukan, angka berikutnya bersifat opsional. Argumen 1 sampai 255 tempat Anda ingin menghitung jumlah simpangan kuadrat. Anda juga dapat menggunakan array tunggal atau referensi ke array daripada argumen-argumen yang dipisahkan oleh koma."
			}
		}
	},
	EXPON_DIST: {
		description: "Mengembalikan distribusi eksponensial. Gunakan EXPON.DIST untuk membuat model waktu antara peristiwa, seperti berapa lama waktu yang diperlukan anjungan tunai mandiri (ATM) untuk mengeluarkan uang tunai. Misalnya, Anda dapat menggunakan EXPON.DIST untuk menetapkan probabilitas bahwa proses itu memerlukan paling lama 1 menit.",
		abstract: "Mengembalikan distribusi eksponensial. Gunakan EXPON.DIST untuk membuat model waktu antara peristiwa, seperti berapa lama waktu yang diperlukan anjungan tunai mandiri (ATM) untuk mengeluarkan uang tunai. Misalnya, Anda dapat menggunakan EXPON.DIST untuk menetapkan probabilitas bahwa proses itu memerlukan paling lama 1 menit.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/expon-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Diperlukan. Nilai fungsi."
			},
			lambda: {
				name: "lambda",
				detail: "Diperlukan. Nilai parameter."
			},
			cumulative: {
				name: "cumulative",
				detail: "Diperlukan. Nilai logika yang menunjukkan formulir fungsi eksponensial mana yang akan diberikan. Jika secara kumulatif adalah TRUE, EXPON.DIST akan mengembalikan fungsi distribusi kumulatif; jika FALSE, mengembalikan fungsi kerapatan probabilitas."
			}
		}
	},
	F_DIST: {
		description: "Mengembalikan distribusi probabilitas F. Anda dapat menggunakan fungsi ini untuk menentukan apakah dua unit data memiliki derajat keragaman berbeda. Misalnya, Anda dapat memeriksa nilai ujian pria dan wanita yang memasuki sekolah menengah, dan menentukan apakah varianabilitas pada wanita berbeda dari yang ditemukan pada laki-laki.",
		abstract: "Mengembalikan distribusi probabilitas F. Anda dapat menggunakan fungsi ini untuk menentukan apakah dua unit data memiliki derajat keragaman berbeda. Misalnya, Anda dapat memeriksa nilai ujian pria dan wanita yang memasuki sekolah menengah, dan menentukan apakah varianabilitas pada wanita berbeda dari yang ditemukan pada laki-laki.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/f-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Diperlukan. Nilai untuk mengevaluasi fungsi."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Diperlukan. Derajat kebebasan pembilang"
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Diperlukan. Derajat kebebasan penyebut."
			},
			cumulative: {
				name: "cumulative",
				detail: "Diperlukan. Nilai logika yang menentukan formulir fungsi. Jika cumulative adalah TRUE, F.DIST mengembalikan fungsi distribusi kumulatif; jika FALSE, mengembalikan fungsi kerapatan probabilitas."
			}
		}
	},
	F_DIST_RT: {
		description: "Mengembalikan distribusi probabilitas F (arah kanan) (derajat keragaman) untuk dua unit data. Anda dapat menggunakan fungsi ini untuk menentukan apakah dua unit data memiliki derajat keragaman berbeda. Misalnya, Anda bisa memeriksa nilai ujian laki-laki dan perempuan yang masuk sekolah menengah dan menentukan apakah keragaman pada nilai perempuan berbeda dari yang ditemukan pada laki-laki.",
		abstract: "Mengembalikan distribusi probabilitas F (arah kanan) (derajat keragaman) untuk dua unit data. Anda dapat menggunakan fungsi ini untuk menentukan apakah dua unit data memiliki derajat keragaman berbeda. Misalnya, Anda bisa memeriksa nilai ujian laki-laki dan perempuan yang masuk sekolah menengah dan menentukan apakah keragaman pada nilai perempuan berbeda dari yang ditemukan pada laki-laki.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/f-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Diperlukan. Nilai untuk mengevaluasi fungsi."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Diperlukan. Derajat kebebasan pembilang"
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Diperlukan. Derajat kebebasan penyebut."
			}
		}
	},
	F_INV: {
		description: "Mengembalikan inversi distribusi probabilitas F. Jika p = F.DIST(x,...), maka F.INV(p,...) = x. Distribusi F dapat digunakan dalam uji F yang membandingkan derajat keragaman dalam dua unit data. Misalnya, Anda dapat menganalisis distribusi pendapatan di Amerika Serikat dan Kanada untuk menentukan apakah dua negara tersebut memiliki derajat keragaman pendapatan yang mirip.",
		abstract: "Mengembalikan inversi distribusi probabilitas F. Jika p = F.DIST(x,...), maka F.INV(p,...) = x. Distribusi F dapat digunakan dalam uji F yang membandingkan derajat keragaman dalam dua unit data. Misalnya, Anda dapat menganalisis distribusi pendapatan di Amerika Serikat dan Kanada untuk menentukan apakah dua negara tersebut memiliki derajat keragaman pendapatan yang mirip.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/f-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Diperlukan. Probabilitas yang dikaitkan dengan distribusi kumulatif F."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Diperlukan. Derajat kebebasan pembilang"
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Diperlukan. Derajat kebebasan penyebut."
			}
		}
	},
	F_INV_RT: {
		description: "Mengembalikan inversi distribusi probabilitas F (arah kanan). Jika p = F.DIST.RT(x,...), maka F.INV.RT(p,...) = x. Distribusi F dapat digunakan dalam uji F yang membandingkan derajat keragaman dalam dua unit data. Misalnya, Anda dapat menganalisis distribusi pendapatan di Amerika Serikat dan Kanada untuk menentukan apakah dua negara tersebut memiliki derajat keragaman pendapatan yang mirip.",
		abstract: "Mengembalikan inversi distribusi probabilitas F (arah kanan). Jika p = F.DIST.RT(x,...), maka F.INV.RT(p,...) = x. Distribusi F dapat digunakan dalam uji F yang membandingkan derajat keragaman dalam dua unit data. Misalnya, Anda dapat menganalisis distribusi pendapatan di Amerika Serikat dan Kanada untuk menentukan apakah dua negara tersebut memiliki derajat keragaman pendapatan yang mirip.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/f-inv-rt-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Diperlukan. Probabilitas yang dikaitkan dengan distribusi kumulatif F."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Diperlukan. Derajat kebebasan pembilang"
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Diperlukan. Derajat kebebasan penyebut."
			}
		}
	},
	F_TEST: {
		description: "Gunakan fungsi ini untuk menentukan apakah kedua sampel memiliki varians yang berbeda. Misalnya, dengan adanya nilai ujian dari sekolah negeri dan swasta, Anda dapat menguji apakah sekolah-sekolah tersebut memiliki tingkat nilai ujian yang berbeda.",
		abstract: "Gunakan fungsi ini untuk menentukan apakah kedua sampel memiliki varians yang berbeda. Misalnya, dengan adanya nilai ujian dari sekolah negeri dan swasta, Anda dapat menguji apakah sekolah-sekolah tersebut memiliki tingkat nilai ujian yang berbeda.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/f-test-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Diperlukan. Array atau rentang data pertama."
			},
			array2: {
				name: "array2",
				detail: "Diperlukan. Array atau rentang data kedua."
			}
		}
	},
	FISHER: {
		description: "Mengembalikan transformasi Fisher pada x. Transformasi ini mengembalikan fungsi yang didistribusikan secara normal dan tidak condong. Gunakan fungsi ini untuk melakukan pengujian hipotesis pada koefisien korelasi.",
		abstract: "Mengembalikan transformasi Fisher pada x. Transformasi ini mengembalikan fungsi yang didistribusikan secara normal dan tidak condong. Gunakan fungsi ini untuk melakukan pengujian hipotesis pada koefisien korelasi.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/fisher-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Diperlukan. Nilai numerik yang Anda inginkan untuk transformasi."
		} }
	},
	FISHERINV: {
		description: "Mengembalikan inversi dari transformasi Fisher. Gunakan transformasi ini saat menganalisis korelasi antara rentang atau array data. Jika y = FISHER(x), maka FISHERINV(y) = x.",
		abstract: "Mengembalikan inversi dari transformasi Fisher. Gunakan transformasi ini saat menganalisis korelasi antara rentang atau array data. Jika y = FISHER(x), maka FISHERINV(y) = x.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/fisherinv-function"
		}],
		functionParameter: { y: {
			name: "y",
			detail: "Diperlukan. Nilai yang ingin Anda gunakan untuk melakukan inversi dari transformasi tersebut."
		} }
	},
	FORECAST: {
		description: "Hitung, atau prediksi, nilai masa mendatang dengan menggunakan nilai yang sudah ada. Nilai masa depan adalah nilai y untuk nilai x tertentu. Nilai yang sudah ada adalah nilai x dan nilai y yang diketahui, dan nilai masa depan diprediksi dengan menggunakan regresi linear. Anda dapat menggunakan fungsi ini untuk memprediksi tren penjualan, persediaan, atau tren konsumen di masa mendatang.",
		abstract: "Hitung, atau prediksi, nilai masa mendatang dengan menggunakan nilai yang sudah ada. Nilai masa depan adalah nilai y untuk nilai x tertentu. Nilai yang sudah ada adalah nilai x dan nilai y yang diketahui, dan nilai masa depan diprediksi dengan menggunakan regresi linear. Anda dapat menggunakan fungsi ini untuk memprediksi tren penjualan, persediaan, atau tren konsumen di masa mendatang.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/forecast-and-forecast-linear-functions"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "ya Poin data yang ingin Anda prediksikan nilainya."
			},
			knownYs: {
				name: "known_y's",
				detail: "ya Array atau rentang data terikat."
			},
			knownXs: {
				name: "known_x's",
				detail: "ya Array atau rentang data bebas."
			}
		}
	},
	FORECAST_ETS: {
		description: "Anda selalu dapat bertanya kepada pakar dalam Komunitas Teknologi Excel atau mendapatkan dukungan di Komunitas .",
		abstract: "Anda selalu dapat bertanya kepada pakar dalam Komunitas Teknologi Excel atau mendapatkan dukungan di Komunitas .",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/forecast-ets-function"
		}],
		functionParameter: {
			targetDate: {
				name: "Tanggal target",
				detail: "Titik data yang nilainya ingin diprediksi."
			},
			values: {
				name: "Nilai",
				detail: "Nilai historis yang digunakan untuk prakiraan."
			},
			timeline: {
				name: "Garis waktu",
				detail: "Rentang atau array independen berisi tanggal atau waktu numerik dengan langkah konstan."
			},
			seasonality: {
				name: "Musiman",
				detail: "Opsional. Panjang musim; 1 untuk deteksi otomatis dan 0 untuk tanpa musim."
			},
			dataCompletion: {
				name: "Penyelesaian data",
				detail: "Opsional. Gunakan 1 untuk interpolasi titik yang hilang atau 0 untuk menganggapnya nol."
			},
			aggregation: {
				name: "Agregasi",
				detail: "Opsional. Nilai 1 sampai 7 menentukan cara mengagregasi cap waktu duplikat."
			}
		}
	},
	FORECAST_ETS_CONFINT: {
		description: "Anda selalu dapat bertanya kepada pakar dalam Komunitas Teknologi Excel atau mendapatkan dukungan di Komunitas .",
		abstract: "Anda selalu dapat bertanya kepada pakar dalam Komunitas Teknologi Excel atau mendapatkan dukungan di Komunitas .",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/forecast-ets-confint-function"
		}],
		functionParameter: {
			targetDate: {
				name: "Tanggal target",
				detail: "Titik data yang nilainya ingin diprediksi."
			},
			values: {
				name: "Nilai",
				detail: "Nilai historis yang digunakan untuk prakiraan."
			},
			timeline: {
				name: "Garis waktu",
				detail: "Rentang atau array independen berisi tanggal atau waktu numerik dengan langkah konstan."
			},
			confidenceLevel: {
				name: "Tingkat keyakinan",
				detail: "Opsional. Angka antara 0 dan 1; default-nya 0,95."
			},
			seasonality: {
				name: "Musiman",
				detail: "Opsional. Panjang musim; 1 untuk deteksi otomatis dan 0 untuk tanpa musim."
			},
			dataCompletion: {
				name: "Penyelesaian data",
				detail: "Opsional. Gunakan 1 untuk interpolasi titik yang hilang atau 0 untuk menganggapnya nol."
			},
			aggregation: {
				name: "Agregasi",
				detail: "Opsional. Nilai 1 sampai 7 menentukan cara mengagregasi cap waktu duplikat."
			}
		}
	},
	FORECAST_ETS_SEASONALITY: {
		description: "Anda selalu dapat bertanya kepada pakar dalam Komunitas Teknologi Excel atau mendapatkan dukungan di Komunitas .",
		abstract: "Anda selalu dapat bertanya kepada pakar dalam Komunitas Teknologi Excel atau mendapatkan dukungan di Komunitas .",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/forecast-ets-seasonality-function"
		}],
		functionParameter: {
			values: {
				name: "Nilai",
				detail: "Nilai historis yang digunakan untuk prakiraan."
			},
			timeline: {
				name: "Garis waktu",
				detail: "Rentang atau array independen berisi tanggal atau waktu numerik dengan langkah konstan."
			},
			dataCompletion: {
				name: "Penyelesaian data",
				detail: "Opsional. Gunakan 1 untuk interpolasi titik yang hilang atau 0 untuk menganggapnya nol."
			},
			aggregation: {
				name: "Agregasi",
				detail: "Opsional. Nilai 1 sampai 7 menentukan cara mengagregasi cap waktu duplikat."
			}
		}
	},
	FORECAST_ETS_STAT: {
		description: "Anda selalu dapat bertanya kepada pakar dalam Komunitas Teknologi Excel atau mendapatkan dukungan di Komunitas .",
		abstract: "Anda selalu dapat bertanya kepada pakar dalam Komunitas Teknologi Excel atau mendapatkan dukungan di Komunitas .",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/forecast-ets-stat-function"
		}],
		functionParameter: {
			values: {
				name: "Nilai",
				detail: "Nilai historis yang digunakan untuk prakiraan."
			},
			timeline: {
				name: "Garis waktu",
				detail: "Rentang atau array independen berisi tanggal atau waktu numerik dengan langkah konstan."
			},
			statisticType: {
				name: "Jenis statistik",
				detail: "Nilai 1 sampai 8 menentukan statistik prakiraan yang dikembalikan."
			},
			seasonality: {
				name: "Musiman",
				detail: "Opsional. Panjang musim; 1 untuk deteksi otomatis dan 0 untuk tanpa musim."
			},
			dataCompletion: {
				name: "Penyelesaian data",
				detail: "Opsional. Gunakan 1 untuk interpolasi titik yang hilang atau 0 untuk menganggapnya nol."
			},
			aggregation: {
				name: "Agregasi",
				detail: "Opsional. Nilai 1 sampai 7 menentukan cara mengagregasi cap waktu duplikat."
			}
		}
	},
	FORECAST_LINEAR: {
		description: "Hitung, atau prediksi, nilai masa mendatang dengan menggunakan nilai yang sudah ada. Nilai masa depan adalah nilai y untuk nilai x tertentu. Nilai yang sudah ada adalah nilai x dan nilai y yang diketahui, dan nilai masa depan diprediksi dengan menggunakan regresi linear. Anda dapat menggunakan fungsi ini untuk memprediksi tren penjualan, persediaan, atau tren konsumen di masa mendatang.",
		abstract: "Hitung, atau prediksi, nilai masa mendatang dengan menggunakan nilai yang sudah ada. Nilai masa depan adalah nilai y untuk nilai x tertentu. Nilai yang sudah ada adalah nilai x dan nilai y yang diketahui, dan nilai masa depan diprediksi dengan menggunakan regresi linear. Anda dapat menggunakan fungsi ini untuk memprediksi tren penjualan, persediaan, atau tren konsumen di masa mendatang.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/forecast-and-forecast-linear-functions"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "ya Poin data yang ingin Anda prediksikan nilainya."
			},
			knownYs: {
				name: "known_y's",
				detail: "ya Array atau rentang data terikat."
			},
			knownXs: {
				name: "known_x's",
				detail: "ya Array atau rentang data bebas."
			}
		}
	},
	FREQUENCY: {
		description: "Fungsi FREQUENCY menghitung frekuensi kemunculan nilai dalam rentang nilai, lalu mengembalikan array vertikal angka. Misalnya, gunakan FREQUENCY untuk menghitung jumlah skor ujian dalam rentang skor. Karena FREQUENCY mengembalikan array, maka harus dimasukkan sebagai rumus array.",
		abstract: "Fungsi FREQUENCY menghitung frekuensi kemunculan nilai dalam rentang nilai, lalu mengembalikan array vertikal angka. Misalnya, gunakan FREQUENCY untuk menghitung jumlah skor ujian dalam rentang skor. Karena FREQUENCY mengembalikan array, maka harus dimasukkan sebagai rumus array.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/frequency-function"
		}],
		functionParameter: {
			dataArray: {
				name: "data_array",
				detail: "Diperlukan. Array atau referensi ke sekumpulan nilai yang ingin dihitung frekuensinya. Jika data_array tidak berisi nilai, FREQUENCY mengembalikan array nol."
			},
			binsArray: {
				name: "bins_array",
				detail: "Diperlukan. Array atau referensi ke interval untuk mengelompokkan nilai dalam data_array. Jika bins_array tidak berisi nilai, FREQUENCY mengembalikan jumlah elemen dalam data_array."
			}
		}
	},
	GAMMA: {
		description: "Mengembalikan nilai fungsi gamma.",
		abstract: "Mengembalikan nilai fungsi gamma.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/gamma-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan. Mengembalikan angka."
		} }
	},
	GAMMA_DIST: {
		description: "Mengembalikan distribusi gamma. Anda dapat menggunakan fungsi ini untuk mempelajari variabel yang mungkin memiliki distribusi condong. Distribusi gamma biasa digunakan dalam analisis antrian.",
		abstract: "Mengembalikan distribusi gamma. Anda dapat menggunakan fungsi ini untuk mempelajari variabel yang mungkin memiliki distribusi condong. Distribusi gamma biasa digunakan dalam analisis antrian.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/gamma-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Diperlukan. Nilai yang ingin digunakan untuk mengevaluasi distribusi."
			},
			alpha: {
				name: "alpha",
				detail: "Diperlukan. Parameter untuk distribusi."
			},
			beta: {
				name: "beta",
				detail: "Diperlukan. Parameter terhadap distribusi. Jika beta = 1, GAMMA.DIST mengembalikan distribusi gamma standar."
			},
			cumulative: {
				name: "cumulative",
				detail: "Diperlukan. Nilai logika yang menentukan formulir fungsi. Jika kumulatif TRUE, GAMMA.DIST mengembalikan fungsi distribusi kumulatif; jika FALSE, fungsi mengembalikan fungsi kerapatan probabilitas."
			}
		}
	},
	GAMMA_INV: {
		description: "Mengembalikan inversi dari distribusi kumulatif gamma. Jika p = GAMMA.DIST(x,...), maka GAMMA.INV(p,...) = x. Anda dapat menggunakan fungsi ini untuk mempelajari variabel yang distribusinya mungkin condong.",
		abstract: "Mengembalikan inversi dari distribusi kumulatif gamma. Jika p = GAMMA.DIST(x,...), maka GAMMA.INV(p,...) = x. Anda dapat menggunakan fungsi ini untuk mempelajari variabel yang distribusinya mungkin condong.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/gamma-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Diperlukan. Probabilitas terkait dengan distribusi gamma."
			},
			alpha: {
				name: "alpha",
				detail: "Diperlukan. Parameter untuk distribusi."
			},
			beta: {
				name: "beta",
				detail: "Diperlukan. Parameter terhadap distribusi. Jika beta = 1, GAMMA.INV mengembalikan distribusi gamma standar."
			}
		}
	},
	GAMMALN: {
		description: "Mengembalikan logaritma natural fungsi gamma, Γ(x).",
		abstract: "Mengembalikan logaritma natural fungsi gamma, Γ(x).",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/gammaln-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Diperlukan. Nilai yang ingin digunakan untuk menghitung GAMMALN."
		} }
	},
	GAMMALN_PRECISE: {
		description: "Mengembalikan logaritma natural fungsi gamma, Γ(x).",
		abstract: "Mengembalikan logaritma natural fungsi gamma, Γ(x).",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/gammaln-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Diperlukan. Nilai yang ingin digunakan untuk menghitung GAMMALN.PRECISE."
		} }
	},
	GAUSS: {
		description: "Menghitung probabilitas bahwa anggota populasi normal standar akan masuk di antara rata-rata dan z simpangan baku dari rata-rata.",
		abstract: "Menghitung probabilitas bahwa anggota populasi normal standar akan masuk di antara rata-rata dan z simpangan baku dari rata-rata.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/gauss-function"
		}],
		functionParameter: { z: {
			name: "z",
			detail: "Diperlukan. Mengembalikan angka."
		} }
	},
	GEOMEAN: {
		description: "Mengembalikan rata-rata geometrik sebuah array atau rentang data positif. Misalnya, Anda dapat menggunakan GEOMEAN untuk menghitung rata-rata angka pertumbuhan dari campuran bunga dengan angka variabel.",
		abstract: "Mengembalikan rata-rata geometrik sebuah array atau rentang data positif. Misalnya, Anda dapat menggunakan GEOMEAN untuk menghitung rata-rata angka pertumbuhan dari campuran bunga dengan angka variabel.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/geomean-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Number1 diperlukan, angka berikutnya bersifat opsional. 1 sampai 255 argumen sebagai tujuan menghitung rata-rata. Anda juga bisa menggunakan array tunggal atau array referensi daripada argumen yang dipisahkan oleh koma."
			},
			number2: {
				name: "number2",
				detail: "Number1 diperlukan, angka berikutnya bersifat opsional. 1 sampai 255 argumen sebagai tujuan menghitung rata-rata. Anda juga bisa menggunakan array tunggal atau array referensi daripada argumen yang dipisahkan oleh koma."
			}
		}
	},
	GROWTH: {
		description: "Menghitung prediksi pertumbuhan eksponensial menggunakan data yang ada. GROWTH mengembalikan nilai-y untuk serangkaian nilai-x baru yang Anda tentukan menggunakan nilai-x dan nilai-y yang ada. Anda juga dapat menggunakan fungsi lembar kerja GROWTH untuk menyesuaikan kurva eksponensial dengan nilai-x dan nilai-y yang ada.",
		abstract: "Menghitung prediksi pertumbuhan eksponensial menggunakan data yang ada. GROWTH mengembalikan nilai-y untuk serangkaian nilai-x baru yang Anda tentukan menggunakan nilai-x dan nilai-y yang ada. Anda juga dapat menggunakan fungsi lembar kerja GROWTH untuk menyesuaikan kurva eksponensial dengan nilai-x dan nilai-y yang ada.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/growth-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Diperlukan. Set nilai-y sudah Anda ketahui dalam hubungan y = b*m^x. Jika array known_y's berada dalam kolom tunggal, maka setiap kolom known_x's diinterpretasikan sebagai variabel terpisah. Jika array known_y's berada dalam baris tunggal, maka setiap baris known_x's diinterpretasikan sebagai variabel terpisah. Jika salah satu angka dalam known_y adalah 0 atau negatif, GROWTH mengembalikan #NUM! nilai kesalahan."
			},
			knownXs: {
				name: "known_x's",
				detail: "Opsional. Set nilai-x opsional mungkin sudah Anda ketahui di hubungan y = b*m^x. Array known_x's dapat mencakup satu atau lebih kumpulan variabel. Jika hanya satu variabel yang digunakan, known_y's dan known_x's bisa berupa rentang dalam bentuk apa pun, selama memiliki dimensi yang sama. Jika lebih dari satu variabel yang digunakan, known_y's harus berupa vektor (yaitu, rentang dengan tinggi satu baris atau lebar satu kolom). Jika known_x's dihilangkan, maka diasumsikan sebagai array {1,2,3,...} yang berukuran sama dengan known_y's."
			},
			newXs: {
				name: "new_x's",
				detail: "Opsional. Adalah nilai-x baru yang akan diisi dengan nilai-y terkait yang dikembalikan GROWTH. New_x's harus mencakup satu kolom (atau baris) untuk setiap variabel independen, seperti halnya known_x's. Jadi, jika known_y's berada di satu kolom, known_x's dan new_x's harus memiliki jumlah kolom yang sama. Jika known_y's berada di satu baris, known_x's dan new_x's harus memiliki jumlah baris yang sama. Jika new_x's dihilangkan, maka dianggap sama dengan known_x's. Jika known_x's dan new_x's dihilangkan, maka dianggap array {1,2,3,...} yang berukuran sama dengan known_y's."
			},
			constb: {
				name: "const",
				detail: "Opsional. Nilai logika yang menentukan perlunya mendorong konstanta b agar sama dengan 1. Jika const TRUE atau dihilangkan, b dihitung secara normal. Jika const FALSE, b disetel sama dengan 1 dan nilai-m disesuaikan sehingga y = m^x."
			}
		}
	},
	HARMEAN: {
		description: "Mengembalikan rata-rata harmonik kumpulan data. Rata-rata harmonik adalah resiprokal dari rata-rata aritmatika resiprokal.",
		abstract: "Mengembalikan rata-rata harmonik kumpulan data. Rata-rata harmonik adalah resiprokal dari rata-rata aritmatika resiprokal.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/harmean-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Number1 diperlukan, angka berikutnya bersifat opsional. 1 sampai 255 argumen sebagai tujuan menghitung rata-rata. Anda juga bisa menggunakan array tunggal atau array referensi daripada argumen yang dipisahkan oleh koma."
			},
			number2: {
				name: "number2",
				detail: "Number1 diperlukan, angka berikutnya bersifat opsional. 1 sampai 255 argumen sebagai tujuan menghitung rata-rata. Anda juga bisa menggunakan array tunggal atau array referensi daripada argumen yang dipisahkan oleh koma."
			}
		}
	},
	HYPGEOM_DIST: {
		description: "Mengembalikan distribusi hipergeometrik. HYPGEOM.DIST mengembalikan probabilitas sejumlah sampel keberhasilan tertentu, ukuran sampel tertentu, keberhasilan populasi, dan ukuran populasi. Gunakan HYPGEOM.DIST untuk masalah-masalah dengan populasi terbatas, di mana setiap observasi bisa berhasil atau gagal, dan di mana setiap subkumpulan dari ukuran tertentu dipilih dengan kemungkinan yang sama.",
		abstract: "Mengembalikan distribusi hipergeometrik. HYPGEOM.DIST mengembalikan probabilitas sejumlah sampel keberhasilan tertentu, ukuran sampel tertentu, keberhasilan populasi, dan ukuran populasi. Gunakan HYPGEOM.DIST untuk masalah-masalah dengan populasi terbatas, di mana setiap observasi bisa berhasil atau gagal, dan di mana setiap subkumpulan dari ukuran tertentu dipilih dengan kemungkinan yang sama.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/hypgeom-dist-function"
		}],
		functionParameter: {
			sampleS: {
				name: "sample_s",
				detail: "Diperlukan. Jumlah keberhasilan di dalam sampel."
			},
			numberSample: {
				name: "number_sample",
				detail: "Diperlukan. Ukuran sampel."
			},
			populationS: {
				name: "population_s",
				detail: "Diperlukan. Jumlah keberhasilan di dalam populasi."
			},
			numberPop: {
				name: "number_pop",
				detail: "Diperlukan. Ukuran populasi."
			},
			cumulative: {
				name: "cumulative",
				detail: "Diperlukan. Nilai logika yang menentukan formulir fungsi. Jika kumulatif TRUE, maka HYPGEOM.DIST mengembalikan fungsi distribusi kumulatif; jika FALSE, maka HYPGEOM.DIST mengembalikan fungsi massa probabilitas."
			}
		}
	},
	INTERCEPT: {
		description: "Menghitung titik tempat sebuah garis akan mengiris sumbu y dengan menggunakan nilai x dan nilai y. Titik potong didasarkan pada garis regresi paling pas yang diplot melalui nilai x dan nilai y yang diketahui. Gunakan fungsi INTERCEPT ketika Anda ingin menentukan nilai variabel tidak bebas saat variabel bebasnya 0 (nol). Misalnya, Anda dapat menggunakan fungsi INTERCEPT untuk memprakirakan resistansi listrik logam pada suhu 0°C ketika titik-titik data Anda diambil pada suhu ruangan dan lebih tinggi lagi.",
		abstract: "Menghitung titik tempat sebuah garis akan mengiris sumbu y dengan menggunakan nilai x dan nilai y. Titik potong didasarkan pada garis regresi paling pas yang diplot melalui nilai x dan nilai y yang diketahui. Gunakan fungsi INTERCEPT ketika Anda ingin menentukan nilai variabel tidak bebas saat variabel bebasnya 0 (nol). Misalnya, Anda dapat menggunakan fungsi INTERCEPT untuk memprakirakan resistansi listrik logam pada suhu 0°C ketika titik-titik data Anda diambil pada suhu ruangan dan lebih tinggi lagi.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/intercept-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Diperlukan. Unit observasi atau data tidak bebas."
			},
			knownXs: {
				name: "known_x's",
				detail: "Diperlukan. Unit observasi atau data bebas."
			}
		}
	},
	KURT: {
		description: "Mengembalikan kurtosis dari satu unit data. Kurtosis mencirikan keruncingan atau kedataran relatif sebuah distribusi dibandingkan dengan distribusi normal. Kurtosis positif menandakan distribusi yang relatif runcing. Kurtosis negatif menandakan distribusi yang relatif datar.",
		abstract: "Mengembalikan kurtosis dari satu unit data. Kurtosis mencirikan keruncingan atau kedataran relatif sebuah distribusi dibandingkan dengan distribusi normal. Kurtosis positif menandakan distribusi yang relatif runcing. Kurtosis negatif menandakan distribusi yang relatif datar.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/kurt-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Number1 diperlukan, angka berikutnya bersifat opsional. Argumen 1 sampai 255 yang ingin Anda pakai untuk menghitung kurtosis. Anda juga dapat menggunakan array tunggal atau referensi ke sebuah array dan bukannya beberapa argumen yang dipisahkan oleh koma."
			},
			number2: {
				name: "number2",
				detail: "Number1 diperlukan, angka berikutnya bersifat opsional. Argumen 1 sampai 255 yang ingin Anda pakai untuk menghitung kurtosis. Anda juga dapat menggunakan array tunggal atau referensi ke sebuah array dan bukannya beberapa argumen yang dipisahkan oleh koma."
			}
		}
	},
	LARGE: {
		description: "Mengembalikan nilai ke-k paling besar dalam sekumpulan data. Anda dapat menggunakan fungsi ini untuk memilih nilai berdasarkan posisi relatifnya. Misalnya, Anda dapat menggunakan LARGE untuk mengembalikan skor yang paling tinggi, kedua atau ketiga.",
		abstract: "Mengembalikan nilai ke-k paling besar dalam sekumpulan data. Anda dapat menggunakan fungsi ini untuk memilih nilai berdasarkan posisi relatifnya. Misalnya, Anda dapat menggunakan LARGE untuk mengembalikan skor yang paling tinggi, kedua atau ketiga.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/large-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Diperlukan. Array atau rentang data yang ingin Anda tentukan nilai terbesar ke-k-nya."
			},
			k: {
				name: "k",
				detail: "Diperlukan. Posisi (dari yang paling besar) dalam array atau rentang sel data untuk dikembalikan."
			}
		}
	},
	LINEST: {
		description: "Fungsi LINEST menghitung statistik untuk sebuah garis dengan menggunakan metode \"kuadrat terkecil\" untuk menghitung garis lurus yang paling cocok dengan data Anda, dan kemudian mengembalikan array yang menguraikan garis tersebut. Anda juga dapat mengombinasikan LINEST dengan fungsi-fungsi lainnya untuk menghitung statistik untuk tipe model lain yang linear dalam parameter yang tidak diketahui, termasuk polinomial, logaritmik, eksponensial, dan serangkaian pangkat. Karena fungsi ini mengembalikan sebuah array nilai, maka harus dimasukkan sebagai rumus array. Petunjuk mengikuti contoh-contoh dalam artikel ini.",
		abstract: "Fungsi LINEST menghitung statistik untuk sebuah garis dengan menggunakan metode \"kuadrat terkecil\" untuk menghitung garis lurus yang paling cocok dengan data Anda, dan kemudian mengembalikan array yang menguraikan garis tersebut. Anda juga dapat mengombinasikan LINEST dengan fungsi-fungsi lainnya untuk menghitung statistik untuk tipe model lain yang linear dalam parameter yang tidak diketahui, termasuk polinomial, logaritmik, eksponensial, dan serangkaian pangkat. Karena fungsi ini mengembalikan sebuah array nilai, maka harus dimasukkan sebagai rumus array. Petunjuk mengikuti contoh-contoh dalam artikel ini.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/linest-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Diperlukan. Serangkaian nilai y yang sudah Anda ketahui dalam hubungan y = mx + b. Jika rentang known_y berada dalam satu kolom, setiap kolom known_x diinterpretasikan sebagai variabel terpisah. Jika rentang known_y dimuat dalam satu baris, setiap baris known_x diinterpretasikan sebagai variabel terpisah."
			},
			knownXs: {
				name: "known_x's",
				detail: "Opsional. Serangkaian nilai x yang mungkin sudah Anda ketahui dalam hubungan y = mx + b. Rentang known_x dapat menyertakan satu atau beberapa kumpulan variabel. Jika hanya satu variabel yang digunakan, known_y dan known_x dapat berupa rentang bentuk apa pun, selama mereka memiliki dimensi yang sama. Jika lebih dari satu variabel digunakan, known_y harus vektor (yaitu, rentang dengan tinggi satu baris atau lebar satu kolom). Jika known_x dihilangkan , maka diasumsikan sebagai array {1,2,3,...} yang berukuran sama dengan known_y ."
			},
			constb: {
				name: "const",
				detail: "Opsional. Nilai logika yang menentukan perlunya mendorong konstanta b agar sama dengan 0. Jika const TRUE atau dihilangkan, b dihitung secara normal. Jika const FALSE, b diatur sama dengan 0 dan nilai m disesuaikan agar pas dengan y = mx."
			},
			stats: {
				name: "stats",
				detail: "Opsional. Nilai logika yang menentukan apakah akan mengembalikan regresi statistik tambahan. Jika stats TRUE, LINEST mengembalikan statistik regresi tambahan; sebagai hasilnya, array yang dikembalikan adalah {mn,mn-1,...,m1,b; sen,sen-1,...,se1,seb; r 2,sey ; F,df; ssreg,ssresid} . Jika stats FALSE atau dihilangkan, LINEST hanya mengembalikan koefisien m dan konstanta b. Regresi statistik tambahannya adalah sebagai berikut."
			}
		}
	},
	LOGEST: {
		description: "Persamaan untuk kurva adalah:",
		abstract: "Persamaan untuk kurva adalah:",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/logest-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Diperlukan. Set nilai-y sudah Anda ketahui dalam hubungan y = b*m^x. Jika array known_y's berada dalam kolom tunggal, maka setiap kolom known_x's diinterpretasikan sebagai variabel terpisah. Jika array known_y's berada dalam baris tunggal, maka setiap baris known_x's diinterpretasikan sebagai variabel terpisah."
			},
			knownXs: {
				name: "known_x's",
				detail: "Opsional. Set nilai-x opsional mungkin sudah Anda ketahui di hubungan y = b*m^x. Array known_x's dapat mencakup satu atau lebih kumpulan variabel. Jika hanya satu variabel yang digunakan, maka known_y's dan known_x's dapat berupa rentang berbentuk apa saja, selama memiliki dimensi yang sama. Jika lebih dari satu variabel yang digunakan, maka known_y's harus berupa rentang sel dengan tinggi satu baris atau lebar satu kolom (yang juga disebut vektor). Jika known_x's dikosongkan, maka diasumsikan sebagai array {1,2,3,...} yang memiliki ukuran sama dengan known_y's."
			},
			constb: {
				name: "const",
				detail: "Opsional. Nilai logika yang menentukan perlunya mendorong konstanta b agar sama dengan 1. Jika const TRUE atau dihilangkan, b dihitung secara normal. Jika const FALSE, maka b diatur agar sama dengan 1, dan nilai m disesuaikan agar pas dengan y = m^x."
			},
			stats: {
				name: "stats",
				detail: "Opsional. Nilai logika yang menentukan apakah akan mengembalikan regresi statistik tambahan. Jika stats TRUE, maka LOGEST mengembalikan statistik regresi tambahan, jadi array yang dikembalikan adalah {mn,mn-1,...,m1,b;sen,sen-1,...,se1,seb;r 2,sey; F,df;ssreg,ssresid}. Jika stats FALSE atau dikosongkan, maka LOGEST hanya mengembalikan koefisien m dan konstanta b."
			}
		}
	},
	LOGNORM_DIST: {
		description: "Gunakan fungsi ini untuk menganalisis data yang telah ditransformasi secara logaritmik.",
		abstract: "Gunakan fungsi ini untuk menganalisis data yang telah ditransformasi secara logaritmik.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/lognorm-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Diperlukan. Nilai untuk mengevaluasi fungsi."
			},
			mean: {
				name: "mean",
				detail: "Diperlukan. Rata-rata dari ln(x)."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Diperlukan. Simpangan baku dari ln(x)."
			},
			cumulative: {
				name: "cumulative",
				detail: "Diperlukan. Nilai logika yang menentukan formulir fungsi. Jika kumulatif TRUE, maka LOGNORM.DIST mengembalikan fungsi distribusi kumulatif; jika FALSE, maka LOGNORM.DIST mengembalikan fungsi probabilitas densitas."
			}
		}
	},
	LOGNORM_INV: {
		description: "Mengembalikan inversi dari fungsi distribusi kumulatif lognormal x, di mana ln(x) normalnya didistribusikan dengan parameter Mean dan Standard_dev. Jika p = LOGNORM.DIST(x,...) maka LOGNORM.INV(p,...) = x.",
		abstract: "Mengembalikan inversi dari fungsi distribusi kumulatif lognormal x, di mana ln(x) normalnya didistribusikan dengan parameter Mean dan Standard_dev. Jika p = LOGNORM.DIST(x,...) maka LOGNORM.INV(p,...) = x.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/lognorm-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Diperlukan. Sebuah probabilitas yang dikaitkan dengan distribusi lognormal."
			},
			mean: {
				name: "mean",
				detail: "Diperlukan. Rata-rata dari ln(x)."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Diperlukan. Simpangan baku dari ln(x)."
			}
		}
	},
	MARGINOFERROR: {
		description: "Fungsi ini menghitung margin galat dari rentang nilai dan tingkat keyakinan.",
		abstract: "Fungsi ini menghitung margin galat dari rentang nilai dan tingkat keyakinan.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/12487850?hl=id"
		}],
		functionParameter: {
			range: {
				name: "range",
				detail: "Rentang nilai yang digunakan untuk menghitung margin galat."
			},
			confidence: {
				name: "confidence",
				detail: "Tingkat keyakinan yang diinginkan antara 0 dan 1."
			}
		}
	},
	MAX: {
		description: "Mengembalikan nilai terbesar dalam sekumpulan nilai.",
		abstract: "Mengembalikan nilai terbesar dalam sekumpulan nilai.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/max-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Number1 diperlukan, angka berikutnya bersifat opsional. Bilangan 1 sampai 255 yang ingin Anda cari nilai maksimumnya."
			},
			number2: {
				name: "number2",
				detail: "Number1 diperlukan, angka berikutnya bersifat opsional. Bilangan 1 sampai 255 yang ingin Anda cari nilai maksimumnya."
			}
		}
	},
	MAXA: {
		description: "Mengembalikan nilai terbesar dalam daftar argumen.",
		abstract: "Mengembalikan nilai terbesar dalam daftar argumen.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/maxa-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Diperlukan. Angka 1 sampai 255 yang ingin Anda cari nilai terbesarnya."
			},
			value2: {
				name: "value2",
				detail: "Opsional. Jumlah argumen 2 sampai 255 yang ingin Anda cari nilai terbesarnya."
			}
		}
	},
	MAXIFS: {
		description: "Fungsi MAXIFS mengembalikan nilai maksimal di antara sel yang ditentukan oleh kumpulan persyaratan atau kriteria tertentu.",
		abstract: "Fungsi MAXIFS mengembalikan nilai maksimal di antara sel yang ditentukan oleh kumpulan persyaratan atau kriteria tertentu.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/maxifs-function"
		}],
		functionParameter: {
			maxRange: {
				name: "sum_range",
				detail: "Rentang sel aktual tempat nilai maksimum akan ditentukan."
			},
			criteriaRange1: {
				name: "criteria_range1",
				detail: "Adalah kumpulan sel yang akan dievaluasi dengan kriteria."
			},
			criteria1: {
				name: "criteria1",
				detail: "Adalah kriteria dalam bentuk angka, ekspresi, atau teks yang menentukan sel mana yang akan dievaluasi sebagai kondisi maksimum. Kumpulan kriteria yang sama dapat digunakan dengan fungsi MINIFS , SUMIFS , dan AVERAGEIFS ."
			},
			criteriaRange2: {
				name: "criteriaRange2",
				detail: "Rentang tambahan dan kriteria yang terkait. Anda bisa memasukkan hingga 126 pasang rentang/kriteria."
			},
			criteria2: {
				name: "criteria2",
				detail: "Rentang tambahan dan kriteria yang terkait. Anda bisa memasukkan hingga 126 pasang rentang/kriteria."
			}
		}
	},
	MEDIAN: {
		description: "Mengembalikan median dari angka tertentu. Median adalah angka yang berada di tengah serangkaian angka.",
		abstract: "Mengembalikan median dari angka tertentu. Median adalah angka yang berada di tengah serangkaian angka.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/median-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Number1 diperlukan, angka berikutnya bersifat opsional. Angka dari 1 sampai 255 yang Anda inginkan mediannya."
			},
			number2: {
				name: "number2",
				detail: "Number1 diperlukan, angka berikutnya bersifat opsional. Angka dari 1 sampai 255 yang Anda inginkan mediannya."
			}
		}
	},
	MIN: {
		description: "Mengembalikan angka terkecil dalam serangkaian nilai.",
		abstract: "Mengembalikan angka terkecil dalam serangkaian nilai.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/min-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Number1 bersifat opsional, angka berikutnya bersifat opsional. Angka 1 sampai 255 yang ingin Anda cari nilai minimumnya."
			},
			number2: {
				name: "number2",
				detail: "Number1 bersifat opsional, angka berikutnya bersifat opsional. Angka 1 sampai 255 yang ingin Anda cari nilai minimumnya."
			}
		}
	},
	MINA: {
		description: "Mengembalikan nilai terkecil dalam daftar argumen.",
		abstract: "Mengembalikan nilai terkecil dalam daftar argumen.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/mina-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Value1 diperlukan, nilai berikutnya opsional. Angka 1 sampai 255 yang ingin Anda cari nilai minimumnya."
			},
			value2: {
				name: "value2",
				detail: "Value1 diperlukan, nilai berikutnya opsional. Angka 1 sampai 255 yang ingin Anda cari nilai minimumnya."
			}
		}
	},
	MINIFS: {
		description: "Fungsi MINIFS mengembalikan nilai minimal di antara sel yang ditentukan oleh kumpulan persyaratan atau kriteria tertentu.",
		abstract: "Fungsi MINIFS mengembalikan nilai minimal di antara sel yang ditentukan oleh kumpulan persyaratan atau kriteria tertentu.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/minifs-function"
		}],
		functionParameter: {
			minRange: {
				name: "min_range",
				detail: "Rentang sel aktual tempat nilai minimum akan ditentukan."
			},
			criteriaRange1: {
				name: "criteria_range1",
				detail: "Adalah kumpulan sel yang akan dievaluasi dengan kriteria."
			},
			criteria1: {
				name: "criteria1",
				detail: "Adalah kriteria dalam bentuk angka, ekspresi, atau teks yang menentukan sel mana yang akan dievaluasi sebagai kondisi minimum. Kumpulan kriteria yang sama dapat digunakan dengan fungsi MAXIFS , SUMIFS , dan AVERAGEIFS ."
			},
			criteriaRange2: {
				name: "criteria_range2",
				detail: "Rentang tambahan dan kriteria yang terkait. Anda bisa memasukkan hingga 126 pasang rentang/kriteria."
			},
			criteria2: {
				name: "criteria2",
				detail: "Rentang tambahan dan kriteria yang terkait. Anda bisa memasukkan hingga 126 pasang rentang/kriteria."
			}
		}
	},
	MODE_MULT: {
		description: "Ini akan mengembalikan lebih dari satu hasil jika ada beberapa modus. Karena fungsi ini mengembalikan array nilai, maka harus dimasukkan sebagai rumus array.",
		abstract: "Ini akan mengembalikan lebih dari satu hasil jika ada beberapa modus. Karena fungsi ini mengembalikan array nilai, maka harus dimasukkan sebagai rumus array.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/mode-mult-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Diperlukan. Argumen angka pertama yang ingin Anda hitung modusnya."
			},
			number2: {
				name: "number2",
				detail: "Opsional. Argumen angka 2 sampai 254 yang ingin Anda hitung modusnya. Anda juga bisa menggunakan array tunggal atau array referensi ketimbang argumen yang dipisahkan oleh koma."
			}
		}
	},
	MODE_SNGL: {
		description: "Mengembalikan nilai yang paling sering berulang, atau repetitif, dalam array atau rentang data.",
		abstract: "Mengembalikan nilai yang paling sering berulang, atau repetitif, dalam array atau rentang data.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/mode-sngl-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Diperlukan. Argumen pertama yang ingin Anda hitung modusnya."
			},
			number2: {
				name: "number2",
				detail: "Opsional. Argumen 2 sampai 254 yang ingin Anda hitung modusnya. Anda juga bisa menggunakan array tunggal atau array referensi ketimbang argumen yang dipisahkan oleh koma."
			}
		}
	},
	NEGBINOM_DIST: {
		description: "Mengembalikan distribusi binomial negatif, probabilitasnya adalah akan ada kegagalan Number_f sebelum keberhasilan Number_s-th, dengan probabilitas keberhasilan Probability_s.",
		abstract: "Mengembalikan distribusi binomial negatif, probabilitasnya adalah akan ada kegagalan Number_f sebelum keberhasilan Number_s-th, dengan probabilitas keberhasilan Probability_s.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/negbinom-dist-function"
		}],
		functionParameter: {
			numberF: {
				name: "number_f",
				detail: "Diperlukan. Jumlah kegagalan."
			},
			numberS: {
				name: "number_s",
				detail: "Diperlukan. Jumlah ambang batas keberhasilan."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Diperlukan. Probabilitas keberhasilan."
			},
			cumulative: {
				name: "cumulative",
				detail: "Diperlukan. Nilai logika yang menentukan formulir fungsi. Jika kumulatif TRUE, maka NEGBINOM.DIST mengembalikan fungsi distribusi kumulatif; jika FALSE, maka NEGBINOM.DIST mengembalikan fungsi kerapatan probabilitas."
			}
		}
	},
	NORM_DIST: {
		description: "Mengembalikan distribusi normal untuk rata-rata dan simpangan baku tertentu. Penerapan fungsi ini dalam statistik luas sekali, termasuk pengujian hipotesis.",
		abstract: "Mengembalikan distribusi normal untuk rata-rata dan simpangan baku tertentu. Penerapan fungsi ini dalam statistik luas sekali, termasuk pengujian hipotesis.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/norm-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Diperlukan. Nilai yang Anda inginkan distribusinya."
			},
			mean: {
				name: "mean",
				detail: "Diperlukan. Rata-rata aritmetika distribusi."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Diperlukan. Simpangan baku distribusi."
			},
			cumulative: {
				name: "cumulative",
				detail: "Diperlukan. Nilai logika yang menentukan formulir fungsi. Jika kumulatif TRUE, MAKA NORM. DIST mengembalikan fungsi distribusi kumulatif; jika FALSE, maka mengembalikan fungsi kerapatan probabilitas."
			}
		}
	},
	NORM_INV: {
		description: "Mengembalikan inversi distribusi kumulatif normal untuk rata-rata dan simpangan baku tertentu.",
		abstract: "Mengembalikan inversi distribusi kumulatif normal untuk rata-rata dan simpangan baku tertentu.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/norm-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Diperlukan. Sebuah probabilitas yang dikaitkan dengan distribusi normal."
			},
			mean: {
				name: "mean",
				detail: "Diperlukan. Rata-rata aritmetika distribusi."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Diperlukan. Simpangan baku distribusi."
			}
		}
	},
	NORM_S_DIST: {
		description: "The NORM. Fungsi S.DIST di Excel mengembalikan distribusi normal standar ( misalnya, memiliki rata-rata nol dan simpangan baku satu ). Anda dapat menggunakan fungsi ini sebagai ganti menggunakan tabel area kurva normal standar.",
		abstract: "The NORM. Fungsi S.DIST di Excel mengembalikan distribusi normal standar ( misalnya, memiliki rata-rata nol dan simpangan baku satu ). Anda dapat menggunakan fungsi ini sebagai ganti menggunakan tabel area kurva normal standar.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/norm-s-dist-function"
		}],
		functionParameter: {
			z: {
				name: "z",
				detail: "Diperlukan. Ini adalah nilai yang Anda inginkan distribusinya."
			},
			cumulative: {
				name: "cumulative",
				detail: "Diperlukan. Argumen kumulatif bisa berupa TRUE atau FALSE . Nilai logika ini menentukan bentuk fungsi. Jika kumulatif TRUE maka NORM. S.DIST mengembalikan fungsi distribusi kumulatif . Jika FALSE, maka mengembalikan fungsi massa probabilitas ."
			}
		}
	},
	NORM_S_INV: {
		description: "Mengembalikan inversi dari distribusi kumulatif normal standar. Distribusi memiliki rata-rata nol dan simpangan baku dari satu.",
		abstract: "Mengembalikan inversi dari distribusi kumulatif normal standar. Distribusi memiliki rata-rata nol dan simpangan baku dari satu.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/norm-s-inv-function"
		}],
		functionParameter: { probability: {
			name: "probability",
			detail: "Diperlukan. Sebuah probabilitas yang dikaitkan dengan distribusi normal."
		} }
	},
	PEARSON: {
		description: "Mengembalikan koefisien korelasi momen-produk Pearson, r, indeks tak berdimensi -1,0 sampai 1,0 inklusif dan mencerminkan jauhnya hubungan linear antara kedua rangkaian data.",
		abstract: "Mengembalikan koefisien korelasi momen-produk Pearson, r, indeks tak berdimensi -1,0 sampai 1,0 inklusif dan mencerminkan jauhnya hubungan linear antara kedua rangkaian data.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/pearson-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Diperlukan. Satu set nilai independen."
			},
			array2: {
				name: "array2",
				detail: "Diperlukan. Satu set nilai dependen"
			}
		}
	},
	PERCENTILE_EXC: {
		description: "The PERCENTILE. Fungsi EXC mengembalikan persentil k-th dari nilai dalam rentang, di mana k berada dalam rentang 0..1, tidak termasuk 0..1.",
		abstract: "The PERCENTILE. Fungsi EXC mengembalikan persentil k-th dari nilai dalam rentang, di mana k berada dalam rentang 0..1, tidak termasuk 0..1.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/percentile-exc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Diperlukan. Array atau rentang data yang menentukan posisi relatif."
			},
			k: {
				name: "k",
				detail: "Diperlukan. Nilai persentil dalam rentang 0 < k < 1."
			}
		}
	},
	PERCENTILE_INC: {
		description: "Mengembalikan persentil k-th dari nilai dalam rentang, di mana k berada dalam rentang 0 sampai 1, inklusif.",
		abstract: "Mengembalikan persentil k-th dari nilai dalam rentang, di mana k berada dalam rentang 0 sampai 1, inklusif.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/percentile-inc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Diperlukan. Array atau rentang data yang menentukan posisi relatif."
			},
			k: {
				name: "k",
				detail: "Diperlukan. Nilai persentil dalam rentang 0 sampai 1, inklusif."
			}
		}
	},
	PERCENTRANK_EXC: {
		description: "Mengembalikan peringkat sebuah nilai dalam sekelompok data sebagai persentase sekelompok data (0..1, tidak termasuk 0 dan 1).",
		abstract: "Mengembalikan peringkat sebuah nilai dalam sekelompok data sebagai persentase sekelompok data (0..1, tidak termasuk 0 dan 1).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/percentrank-exc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Diperlukan. Array atau rentang data dengan nilai numerik yang menjabarkan posisi relatifnya."
			},
			x: {
				name: "x",
				detail: "Diperlukan. Angka yang ingin Anda cari peringkatnya."
			},
			significance: {
				name: "significance",
				detail: "Opsional. Nilai yang menentukan jumlah digit signifikan untuk nilai persentase yang dikembalikan. Jika dihilangkan, maka PERCENTRANK. EXC menggunakan tiga digit (0.xxx)."
			}
		}
	},
	PERCENTRANK_INC: {
		description: "Mengembalikan peringkat persentase suatu nilai dalam set data (termasuk 0 dan 1).",
		abstract: "Mengembalikan peringkat persentase suatu nilai dalam set data (termasuk 0 dan 1).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/percentrank-inc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Array atau rentang data yang menentukan kedudukan relatif."
			},
			x: {
				name: "x",
				detail: "Nilai yang peringkatnya ingin diketahui."
			},
			significance: {
				name: "significance",
				detail: "Nilai yang menentukan jumlah digit signifikan untuk nilai persentase yang dikembalikan. Jika dihilangkan, PERCENTRANK.INC menggunakan tiga digit (0.xxx)."
			}
		}
	},
	PERMUT: {
		description: "Mengembalikan jumlah permutasi untuk sejumlah objek tertentu yang bisa dipilih dari jumlah objek. Permutasi adalah sekelompok atau sub-kelompok objek atau peristiwa di mana urutan internal penting. Permutasi berbeda dari kombinasi, yang urutan internalnya tidak penting. Gunakan fungsi ini untuk perhitungan probabilitas dengan gaya lotre.",
		abstract: "Mengembalikan jumlah permutasi untuk sejumlah objek tertentu yang bisa dipilih dari jumlah objek. Permutasi adalah sekelompok atau sub-kelompok objek atau peristiwa di mana urutan internal penting. Permutasi berbeda dari kombinasi, yang urutan internalnya tidak penting. Gunakan fungsi ini untuk perhitungan probabilitas dengan gaya lotre.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/permut-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. Sebuah bilangan bulat yang menerangkan jumlah objek."
			},
			numberChosen: {
				name: "number_chosen",
				detail: "Diperlukan. Sebuah bilangan bulat yang menerangkan jumlah objek dalam masing-masing permutasi."
			}
		}
	},
	PERMUTATIONA: {
		description: "Mengembalikan jumlah permutasi untuk sejumlah objek (dengan perulangan) yang bisa dipilih dari objek total.",
		abstract: "Mengembalikan jumlah permutasi untuk sejumlah objek (dengan perulangan) yang bisa dipilih dari objek total.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/permutationa-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. Sebuah bilangan bulat yang menerangkan total jumlah objek."
			},
			numberChosen: {
				name: "number_chosen",
				detail: "Diperlukan. Sebuah bilangan bulat yang menerangkan jumlah objek dalam masing-masing permutasi."
			}
		}
	},
	PHI: {
		description: "Mengembalikan nilai fungsi kerapatan untuk distribusi normal standar.",
		abstract: "Mengembalikan nilai fungsi kerapatan untuk distribusi normal standar.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/phi-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Diperlukan. X adalah angka kerapatan distribusi normal standar yang Anda inginkan."
		} }
	},
	POISSON_DIST: {
		description: "Mengembalikan distribusi Poisson. Aplikasi umum distribusi Poisson adalah meramalkan sejumlah kejadian selama waktu tertentu, seperti jumlah mobil yang datang di sebuah gerbang tol dalam 1 menit.",
		abstract: "Mengembalikan distribusi Poisson. Aplikasi umum distribusi Poisson adalah meramalkan sejumlah kejadian selama waktu tertentu, seperti jumlah mobil yang datang di sebuah gerbang tol dalam 1 menit.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/poisson-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Diperlukan. Jumlah peristiwa."
			},
			mean: {
				name: "mean",
				detail: "Diperlukan. Nilai numerik yang diinginkan."
			},
			cumulative: {
				name: "cumulative",
				detail: "Diperlukan. Nilai logika yang menentukan bentuk distribusi probabilitas yang dikembalikan. Jika kumulatif TRUE, maka POISSON.DIST mengembalikan probabilitas kumulatif Poisson bahwa sejumlah kejadian acak akan terjadi antara nol dan x inklusif; jika FALSE, maka mengembalikan fungsi massa probabilitas Poisson bahwa peristiwa yang terjadi akan tepat sejumlah x."
			}
		}
	},
	PROB: {
		description: "Mengembalikan probabilitas sehingga nilai-nilai dalam rentang berada di antara dua batas. Jika upper_limit tidak diberikan, maka mengembalikan probabilitas sehingga nilai-nilai dalam x_range sama dengan lower_limit.",
		abstract: "Mengembalikan probabilitas sehingga nilai-nilai dalam rentang berada di antara dua batas. Jika upper_limit tidak diberikan, maka mengembalikan probabilitas sehingga nilai-nilai dalam x_range sama dengan lower_limit.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/prob-function"
		}],
		functionParameter: {
			xRange: {
				name: "x_range",
				detail: "Diperlukan. Rentang nilai numerik x yang memiliki kaitan dengan probabilitas."
			},
			probRange: {
				name: "prob_range",
				detail: "Diperlukan. Serangkaian probabilitas yang dikaitkan dengan nilai-nilai dalam x_range."
			},
			lowerLimit: {
				name: "lower_limit",
				detail: "Opsional. Batas bawah pada nilai yang Anda inginkan probabilitasnya."
			},
			upperLimit: {
				name: "upper_limit",
				detail: "Opsional. Batas atas nilai yang Anda inginkan probabilitasnya."
			}
		}
	},
	QUARTILE_EXC: {
		description: "Mengembalikan kuartil rangkaian data, berdasarkan nilai persentil dari 0 sampai 1, tidak termasuk 0 sampai 1.",
		abstract: "Mengembalikan kuartil rangkaian data, berdasarkan nilai persentil dari 0 sampai 1, tidak termasuk 0 sampai 1.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/quartile-exc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Diperlukan. Array atau rentang sel nilai numerik yang ingin Anda cari nilai kuartilnya."
			},
			quart: {
				name: "quart",
				detail: "Diperlukan. Menunjukkan nilai mana yang harus dikembalikan."
			}
		}
	},
	QUARTILE_INC: {
		description: "Kuartil sering digunakan dalam data penjualan dan survei untuk membagi populasi ke dalam berbagai kelompok. Sebagai contoh, Anda dapat menggunakan QUARTILE.INC untuk menemukan 25 persen dari pendapatan tertinggi dalam satu populasi.",
		abstract: "Kuartil sering digunakan dalam data penjualan dan survei untuk membagi populasi ke dalam berbagai kelompok. Sebagai contoh, Anda dapat menggunakan QUARTILE.INC untuk menemukan 25 persen dari pendapatan tertinggi dalam satu populasi.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/quartile-inc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Diperlukan. Array atau rentang sel nilai numerik yang ingin Anda cari nilai kuartilnya."
			},
			quart: {
				name: "quart",
				detail: "Diperlukan. Menunjukkan nilai mana yang harus dikembalikan."
			}
		}
	},
	RANK_AVG: {
		description: "Mengembalikan peringkat angka dalam daftar angka: ukurannya relatif terhadap nilai lain dalam daftar. Jika lebih dari satu nilai memiliki peringkat yang sama, peringkat rata-rata akan dikembalikan.",
		abstract: "Mengembalikan peringkat angka dalam daftar angka: ukurannya relatif terhadap nilai lain dalam daftar. Jika lebih dari satu nilai memiliki peringkat yang sama, peringkat rata-rata akan dikembalikan.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/rank-avg-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. Angka yang peringkatnya ingin Anda temukan."
			},
			ref: {
				name: "ref",
				detail: "Diperlukan. Sebuah array dari, atau referensi ke, daftar angka. Nilai nonnumerik di Ref diabaikan."
			},
			order: {
				name: "order",
				detail: "Opsional. Angka yang menentukan cara menetapkan peringkat."
			}
		}
	},
	RANK_EQ: {
		description: "Mengembalikan peringkat sebuah angka dalam daftar angka.",
		abstract: "Mengembalikan peringkat sebuah angka dalam daftar angka.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/rank-eq-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Angka yang peringkatnya ingin ditemukan."
			},
			ref: {
				name: "ref",
				detail: "Referensi ke daftar angka. Nilai nonnumerik dalam ref diabaikan."
			},
			order: {
				name: "order",
				detail: "Angka yang menentukan cara memberi peringkat pada number. Jika 0 atau dihilangkan, urutannya menurun; nilai selain nol menggunakan urutan menaik."
			}
		}
	},
	RSQ: {
		description: "Mengembalikan kuadrat dari koefisien korelasi momen produk Pearson melalui titik data di known_y's dan known_x's. Untuk informasi selengkapnya, lihat fungsi PEARSON . Nilai r-kuadrat bisa diinterpretasikan sebagai proporsi dari varians di y yang disebabkan oleh varians di x.",
		abstract: "Mengembalikan kuadrat dari koefisien korelasi momen produk Pearson melalui titik data di known_y's dan known_x's. Untuk informasi selengkapnya, lihat fungsi PEARSON . Nilai r-kuadrat bisa diinterpretasikan sebagai proporsi dari varians di y yang disebabkan oleh varians di x.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/rsq-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Diperlukan. Array atau rentang sel dari titik data yang bergantung pada angka."
			},
			knownXs: {
				name: "known_x's",
				detail: "Diperlukan. Kumpulan titik data independen."
			}
		}
	},
	SKEW: {
		description: "Mengembalikan nilai kecondongan distribusi. Kecondongan mencirikan derajat asimetris dari distribusi di sekitar nilai rata-ratanya. Kecondongan positif menunjukkan distribusi dengan arah asimetris yang meluas menuju nilai yang lebih positif. Kecondongan negatif menunjukkan distribusi dengan arah asimetris yang meluas menuju nilai yang lebih negatif.",
		abstract: "Mengembalikan nilai kecondongan distribusi. Kecondongan mencirikan derajat asimetris dari distribusi di sekitar nilai rata-ratanya. Kecondongan positif menunjukkan distribusi dengan arah asimetris yang meluas menuju nilai yang lebih positif. Kecondongan negatif menunjukkan distribusi dengan arah asimetris yang meluas menuju nilai yang lebih negatif.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/skew-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Number1 diperlukan, angka berikutnya bersifat opsional. 1 hingga 255 argumen yang ingin dihitung nilai kecondongannya. Anda juga bisa menggunakan array tunggal atau array referensi daripada argumen yang dipisahkan oleh koma."
			},
			number2: {
				name: "number2",
				detail: "Number1 diperlukan, angka berikutnya bersifat opsional. 1 hingga 255 argumen yang ingin dihitung nilai kecondongannya. Anda juga bisa menggunakan array tunggal atau array referensi daripada argumen yang dipisahkan oleh koma."
			}
		}
	},
	SKEW_P: {
		description: "Mengembalikan kemencengan distribusi berdasarkan populasi.",
		abstract: "Mengembalikan kemencengan distribusi berdasarkan populasi.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/skew-p-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Angka, referensi sel, atau rentang pertama yang kemencengannya ingin dihitung."
			},
			number2: {
				name: "number2",
				detail: "Angka, referensi sel, atau rentang tambahan yang kemencengannya ingin dihitung, hingga maksimum 255."
			}
		}
	},
	SLOPE: {
		description: "Mengembalikan kemiringan garis regresi linear melalui titik data dalam known_y's dan known_x's. Kemiringan adalah jarak vertikal dibagi dengan jarak horizontal di antara dua titik pada garis, yang merupakan tingkat perubahan di sepanjang garis regresi.",
		abstract: "Mengembalikan kemiringan garis regresi linear melalui titik data dalam known_y's dan known_x's. Kemiringan adalah jarak vertikal dibagi dengan jarak horizontal di antara dua titik pada garis, yang merupakan tingkat perubahan di sepanjang garis regresi.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/slope-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Diperlukan. Array atau rentang sel dari titik data yang bergantung pada angka."
			},
			knownXs: {
				name: "known_x's",
				detail: "Diperlukan. Kumpulan titik data independen."
			}
		}
	},
	SMALL: {
		description: "Mengembalikan nilai k-th yang paling kecil dalam rangkaian data. Gunakan fungsi ini untuk mengembalikan nilai dengan posisi relatif tertentu dalam kumpulan data.",
		abstract: "Mengembalikan nilai k-th yang paling kecil dalam rangkaian data. Gunakan fungsi ini untuk mengembalikan nilai dengan posisi relatif tertentu dalam kumpulan data.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/small-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Diperlukan. Array atau rentang data angka yang ingin Anda dapatkan nilai k-th yang paling kecil di dalamnya."
			},
			k: {
				name: "k",
				detail: "Diperlukan. Posisi (dari yang paling kecil) di dalam array atau rentang data yang ingin dikembalikan."
			}
		}
	},
	STANDARDIZE: {
		description: "Mengembalikan nilai yang dinormalkan dari suatu distribusi yang dikarakterisasi oleh rata-rata dan simpangan baku.",
		abstract: "Mengembalikan nilai yang dinormalkan dari suatu distribusi yang dikarakterisasi oleh rata-rata dan simpangan baku.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/standardize-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Diperlukan. Nilai yang ingin Anda normalkan."
			},
			mean: {
				name: "mean",
				detail: "Diperlukan. Rata-rata aritmetika distribusi."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Diperlukan. Simpangan baku distribusi."
			}
		}
	},
	STDEV_P: {
		description: "Simpangan baku adalah pengukuran seberapa lebar suatu nilai tersebar dari nilai rata-rata (nilai tengahnya).",
		abstract: "Simpangan baku adalah pengukuran seberapa lebar suatu nilai tersebar dari nilai rata-rata (nilai tengahnya).",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/stdev-p-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Diperlukan. Argumen angka pertama yang bersesuaian dengan populasi."
			},
			number2: {
				name: "number2",
				detail: "Opsional. Argumen angka 2 sampai 254 yang berkaitan dengan populasi. Anda juga bisa menggunakan array tunggal atau array referensi ketimbang argumen yang dipisahkan oleh koma."
			}
		}
	},
	STDEV_S: {
		description: "Simpangan baku adalah pengukuran seberapa lebar suatu nilai tersebar dari nilai rata-rata (nilai tengahnya).",
		abstract: "Simpangan baku adalah pengukuran seberapa lebar suatu nilai tersebar dari nilai rata-rata (nilai tengahnya).",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/stdev-s-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Diperlukan. Argumen angka pertama yang berkaitan dengan sampel populasi. Anda juga bisa menggunakan array tunggal atau array referensi ketimbang argumen yang dipisahkan oleh koma."
			},
			number2: {
				name: "number2",
				detail: "Opsional. Argumen angka 2 sampai 254 yang berkaitan dengan sampel populasi. Anda juga bisa menggunakan array tunggal atau array referensi ketimbang argumen yang dipisahkan oleh koma."
			}
		}
	},
	STDEVA: {
		description: "Memperkirakan simpangan baku berdasarkan satu sampel. Simpangan baku adalah pengukuran seberapa lebar suatu nilai tersebar dari nilai rata-rata (nilai tengahnya).",
		abstract: "Memperkirakan simpangan baku berdasarkan satu sampel. Simpangan baku adalah pengukuran seberapa lebar suatu nilai tersebar dari nilai rata-rata (nilai tengahnya).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/stdeva-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Value1 diperlukan, nilai berikutnya opsional. Nilai 1 sampai 255 berhubungan dengan sampel populasi. Anda juga bisa menggunakan array tunggal atau array referensi daripada argumen yang dipisahkan oleh koma."
			},
			value2: {
				name: "value2",
				detail: "Value1 diperlukan, nilai berikutnya opsional. Nilai 1 sampai 255 berhubungan dengan sampel populasi. Anda juga bisa menggunakan array tunggal atau array referensi daripada argumen yang dipisahkan oleh koma."
			}
		}
	},
	STDEVPA: {
		description: "Menghitung simpangan baku berdasarkan seluruh populasi yang diberikan sebagai argumen, termasuk teks dan nilai logika. Simpangan baku adalah pengukuran seberapa lebar suatu nilai tersebar dari nilai rata-ratanya.",
		abstract: "Menghitung simpangan baku berdasarkan seluruh populasi yang diberikan sebagai argumen, termasuk teks dan nilai logika. Simpangan baku adalah pengukuran seberapa lebar suatu nilai tersebar dari nilai rata-ratanya.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/stdevpa-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Value1 diperlukan, nilai berikutnya opsional. Nilai 1 sampai 255 berhubungan dengan population. Anda juga bisa menggunakan array tunggal atau array referensi daripada argumen yang dipisahkan oleh koma."
			},
			value2: {
				name: "value2",
				detail: "Value1 diperlukan, nilai berikutnya opsional. Nilai 1 sampai 255 berhubungan dengan population. Anda juga bisa menggunakan array tunggal atau array referensi daripada argumen yang dipisahkan oleh koma."
			}
		}
	},
	STEYX: {
		description: "Mengembalikan galat standar nilai y yang diprediksi untuk setiap x dalam regresi.",
		abstract: "Mengembalikan galat standar nilai y yang diprediksi untuk setiap x dalam regresi.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/steyx-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Array atau rentang data dependen."
			},
			knownXs: {
				name: "known_x's",
				detail: "Array atau rentang data independen."
			}
		}
	},
	T_DIST: {
		description: "Mengembalikan distribusi-t arah kiri Student. Distribusi-t digunakan dalam pengujian hipotesis kumpulan data sampel kecil. Gunakan fungsi ini di tabel nilai kritis untuk distribusi-t.",
		abstract: "Mengembalikan distribusi-t arah kiri Student. Distribusi-t digunakan dalam pengujian hipotesis kumpulan data sampel kecil. Gunakan fungsi ini di tabel nilai kritis untuk distribusi-t.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/t-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Diperlukan. Nilai numerik yang ingin digunakan untuk mengevaluasi distribusi"
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Diperlukan. Bilangan bulat yang menunjukkan angka derajat kebebasan."
			},
			cumulative: {
				name: "cumulative",
				detail: "Diperlukan. Nilai logika yang menentukan formulir fungsi. Jika kumulatif adalah TRUE, T.DIST mengembalikan fungsi distribusi kumulatif; jika FALSE, mengembalikan fungsi kepadatan probabilitas."
			}
		}
	},
	T_DIST_2T: {
		description: "Distribusi-t Student digunakan dalam pengujian hipotesis kumpulan data sampel kecil. Gunakan fungsi ini di tabel nilai kritis untuk distribusi-t.",
		abstract: "Distribusi-t Student digunakan dalam pengujian hipotesis kumpulan data sampel kecil. Gunakan fungsi ini di tabel nilai kritis untuk distribusi-t.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/t-dist-2t-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Diperlukan. Nilai numerik yang ingin digunakan untuk mengevaluasi distribusi."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Diperlukan. Bilangan bulat yang menunjukkan angka derajat kebebasan."
			}
		}
	},
	T_DIST_RT: {
		description: "Distribusi-t digunakan dalam pengujian hipotesis kumpulan data sampel kecil. Gunakan fungsi ini di tabel nilai kritis untuk distribusi-t.",
		abstract: "Distribusi-t digunakan dalam pengujian hipotesis kumpulan data sampel kecil. Gunakan fungsi ini di tabel nilai kritis untuk distribusi-t.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/t-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Diperlukan. Nilai numerik yang ingin digunakan untuk mengevaluasi distribusi."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Diperlukan. Bilangan bulat yang menunjukkan angka derajat kebebasan."
			}
		}
	},
	T_INV: {
		description: "Mengembalikan inversi arah kiri dari distribusi-t Student.",
		abstract: "Mengembalikan inversi arah kiri dari distribusi-t Student.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/t-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Diperlukan. Probabilitas terkait dengan distribusi-t Student."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Diperlukan. Jumlah derajat kebebasan yang digunakan untuk mencirikan distribusi."
			}
		}
	},
	T_INV_2T: {
		description: "Mengembalikan inversi dua arah dari distribusi-t Student.",
		abstract: "Mengembalikan inversi dua arah dari distribusi-t Student.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/t-inv-2t-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Diperlukan. Probabilitas terkait dengan distribusi-t Student."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Diperlukan. Jumlah derajat kebebasan yang digunakan untuk mencirikan distribusi."
			}
		}
	},
	T_TEST: {
		description: "Mengembalikan probabilitas terkait Uji-t Siswa. Gunakan T.TEST untuk menentukan apakah dua sampel berasal dari dua populasi yang mendasari yang sama di mana nilai tengahnya sama.",
		abstract: "Mengembalikan probabilitas terkait Uji-t Siswa. Gunakan T.TEST untuk menentukan apakah dua sampel berasal dari dua populasi yang mendasari yang sama di mana nilai tengahnya sama.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/t-test-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Diperlukan. Kumpulan data pertama."
			},
			array2: {
				name: "array2",
				detail: "Diperlukan. Kumpulan data kedua."
			},
			tails: {
				name: "tails",
				detail: "Diperlukan. Menentukan jumlah ekor distribusi. Jika ekor = 1, T.TEST menggunakan distribusi satu ekor. Jika ekor = 2, T.TEST menggunakan distribusi dua ekor."
			},
			type: {
				name: "type",
				detail: "Diperlukan. Tipe Uji-t yang dilakukan."
			}
		}
	},
	TREND: {
		description: "Fungsi TREND mengembalikan nilai di sepanjang tren linear. Ini pas dengan garis lurus (menggunakan metode kuadrat paling sedikit) ke array known_y dan known_x. TREND mengembalikan nilai y di sepanjang baris tersebut untuk array new_x yang Anda tentukan.",
		abstract: "Fungsi TREND mengembalikan nilai di sepanjang tren linear. Ini pas dengan garis lurus (menggunakan metode kuadrat paling sedikit) ke array known_y dan known_x. TREND mengembalikan nilai y di sepanjang baris tersebut untuk array new_x yang Anda tentukan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/trend-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Kumpulan nilai y yang sudah Anda ketahui dalam hubungan y = mx + b Jika array known_y's berada dalam kolom tunggal, maka setiap kolom known_x's diinterpretasikan sebagai variabel terpisah. Jika array known_y's berada dalam baris tunggal, maka setiap baris known_x's diinterpretasikan sebagai variabel terpisah."
			},
			knownXs: {
				name: "known_x's",
				detail: "Sekumpulan nilai x opsional yang mungkin sudah Anda ketahui dalam hubungan y = mx + b Array known_x's dapat mencakup satu atau lebih kumpulan variabel. Jika hanya satu variabel yang digunakan, known_y's dan known_x's bisa berupa rentang dalam bentuk apa pun, selama memiliki dimensi yang sama. Jika lebih dari satu variabel yang digunakan, known_y's harus berupa vektor (yaitu, rentang dengan tinggi satu baris atau lebar satu kolom). Jika known_x's dihilangkan, maka diasumsikan sebagai array {1,2,3,...} yang berukuran sama dengan known_y's."
			},
			newXs: {
				name: "new_x's",
				detail: "Nilai-x baru yang ingin Anda gunakan untuk mengembalikan nilai-y yang terkait New_x's harus mencakup satu kolom (atau baris) untuk setiap variabel independen, seperti halnya known_x's. Jadi, jika known_y's berada di satu kolom, known_x's dan new_x's harus memiliki jumlah kolom yang sama. Jika known_y's berada di satu baris, known_x's dan new_x's harus memiliki jumlah baris yang sama. Jika Anda menghilangkan new_x's, akan diasumsikan sama dengan known_x's. Jika Anda menghilangkan kedua known_x's dan new_x's, akan dianggap sebagai array {1,2,3,...} yang berukuran sama dengan known_y's."
			},
			constb: {
				name: "const",
				detail: "Nilai logika yang menentukan apakah memaksa konstanta b sama dengan 0 Jika const TRUE atau dihilangkan, b dihitung secara normal. Jika const FALSE, b diatur sama dengan 0 (nol) dan nilai-m disesuaikan sehingga y = mx."
			}
		}
	},
	TRIMMEAN: {
		description: "Mengembalikan rata-rata dari bagian dalam dari rangkaian data. TRIMMEAN menghitung rata-rata yang diambil dengan mengecualikan persentase titik data dari arah atas dan bawah suatu rangkaian data. Anda bisa menggunakan fungsi ini saat Anda ingin mengecualikan data terluar dari analisis Anda.",
		abstract: "Mengembalikan rata-rata dari bagian dalam dari rangkaian data. TRIMMEAN menghitung rata-rata yang diambil dengan mengecualikan persentase titik data dari arah atas dan bawah suatu rangkaian data. Anda bisa menggunakan fungsi ini saat Anda ingin mengecualikan data terluar dari analisis Anda.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/trimmean-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Diperlukan. Array atau rentang nilai yang akan dipangkas dan dihitung rata-ratanya."
			},
			percent: {
				name: "percent",
				detail: "Diperlukan. Jumlah pecahan titik data yang akan dikecualikan dari perhitungan. Sebagai contoh, jika persen = 0,2, 4 titik dipangkas dari rangkaian data 20 titik (20 x 0,2): 2 dari atas dan 2 dari bawah rangkaian data tersebut."
			}
		}
	},
	VAR_P: {
		description: "Menghitung varians berdasarkan seluruh populasi (mengabaikan nilai logika dan teks dalam populasi).",
		abstract: "Menghitung varians berdasarkan seluruh populasi (mengabaikan nilai logika dan teks dalam populasi).",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/var-p-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Diperlukan. Argumen angka pertama yang bersesuaian dengan populasi."
			},
			number2: {
				name: "number2",
				detail: "Opsional. Argumen angka 2 sampai 254 terkait dengan satu populasi."
			}
		}
	},
	VAR_S: {
		description: "Memperkirakan varians berdasarkan satu sampel (mengabaikan nilai logika dan teks dalam sampel).",
		abstract: "Memperkirakan varians berdasarkan satu sampel (mengabaikan nilai logika dan teks dalam sampel).",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/var-s-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Diperlukan. Argumen angka pertama yang berkaitan dengan sampel populasi."
			},
			number2: {
				name: "number2",
				detail: "Opsional. Argumen angka 2 sampai 254 yang berkaitan dengan sampel populasi."
			}
		}
	},
	VARA: {
		description: "Memperkirakan varians berdasarkan satu sampel.",
		abstract: "Memperkirakan varians berdasarkan satu sampel.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/vara-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Value1 diperlukan, nilai berikutnya opsional. Argumen nilai 1 sampai 255 terkait dengan satu sampel populasi."
			},
			value2: {
				name: "value2",
				detail: "Value1 diperlukan, nilai berikutnya opsional. Argumen nilai 1 sampai 255 terkait dengan satu sampel populasi."
			}
		}
	},
	VARPA: {
		description: "Menghitung varians berdasarkan populasi keseluruhan.",
		abstract: "Menghitung varians berdasarkan populasi keseluruhan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/varpa-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Value1 diperlukan, nilai berikutnya opsional. Nilai argumen 1 sampai 255 terkait dengan satu sampel populasi."
			},
			value2: {
				name: "value2",
				detail: "Value1 diperlukan, nilai berikutnya opsional. Nilai argumen 1 sampai 255 terkait dengan satu sampel populasi."
			}
		}
	},
	WEIBULL_DIST: {
		description: "Mengembalikan distribusi Weilbull. Gunakan distribusi ini dalam analisis keandalan, misalnya menghitung waktu rata-rata perangkat hingga gagal.",
		abstract: "Mengembalikan distribusi Weilbull. Gunakan distribusi ini dalam analisis keandalan, misalnya menghitung waktu rata-rata perangkat hingga gagal.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/weibull-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Diperlukan. Nilai untuk mengevaluasi fungsi."
			},
			alpha: {
				name: "alpha",
				detail: "Diperlukan. Parameter untuk distribusi."
			},
			beta: {
				name: "beta",
				detail: "Diperlukan. Parameter untuk distribusi."
			},
			cumulative: {
				name: "cumulative",
				detail: "Diperlukan. Menentukan format fungsi."
			}
		}
	},
	Z_TEST: {
		description: "Untuk melihat bagaimana Z.TEST dapat digunakan dalam rumus untuk menghitung nilai probabilitas dua-arah, lihat bagian Keterangan di bawah.",
		abstract: "Untuk melihat bagaimana Z.TEST dapat digunakan dalam rumus untuk menghitung nilai probabilitas dua-arah, lihat bagian Keterangan di bawah.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/z-test-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Diperlukan. Array atau rentang data yang akan digunakan untuk menguji x."
			},
			x: {
				name: "x",
				detail: "Diperlukan. Nilai untuk menguji."
			},
			sigma: {
				name: "sigma",
				detail: "Opsional. Simpangan baku populasi (yang diketahui). Jika dihilangkan, maka simpangan baku sampel yang digunakan."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/text/id-ID.ts
const locale$3 = {
	ASC: {
		description: "Untuk bahasa Perangkat karakter bit ganda (DBCS, Double-byte character set), fungsi tersebut mengubah karakter lebar penuh (bit ganda) menjadi lebar setengah (bit tunggal).",
		abstract: "Untuk bahasa Perangkat karakter bit ganda (DBCS, Double-byte character set), fungsi tersebut mengubah karakter lebar penuh (bit ganda) menjadi lebar setengah (bit tunggal).",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/asc-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Diperlukan. Teks atau referensi ke suatu sel yang berisi teks yang ingin Anda ubah. Jika teks tidak berisi huruf lebar penuh, teks tidak diubah."
		} }
	},
	ARRAYTOTEXT: {
		description: "Fungsi ARRAYTOTEXT mengembalikan array nilai teks dari rentang tertentu. Ini melewati nilai teks tidak berubah, dan mengonversi nilai non-teks menjadi teks.",
		abstract: "Fungsi ARRAYTOTEXT mengembalikan array nilai teks dari rentang tertentu. Ini melewati nilai teks tidak berubah, dan mengonversi nilai non-teks menjadi teks.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/arraytotext-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Array untuk dikembalikan sebagai teks. Diperlukan."
			},
			format: {
				name: "format",
				detail: "Format data yang dikembalikan. Opsional. Ini bisa menjadi salah satu dari dua nilai: 0 Default. Format ringkas yang mudah dibaca. Teks yang dikembalikan akan sama seperti teks yang disajikan dalam sel yang memiliki pemformatan umum yang diterapkan. 1 Format ketat yang menyertakan karakter escape dan pemisah baris. Menghasilkan string yang dapat diurai ketika dimasukkan ke bilah rumus. Enkapsulasi mengembalikan string dalam tanda petik kecuali untuk Boolean, Angka, dan Kesalahan."
			}
		}
	},
	BAHTTEXT: {
		description: "Mengonversi angka menjadi teks bahasa Thailand dan menambahkan akhiran \"Baht.\"",
		abstract: "Mengonversi angka menjadi teks bahasa Thailand dan menambahkan akhiran \"Baht.\"",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/bahttext-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan. Angka yang ingin Anda konversi menjadi teks, atau referensi ke sel berisi angka atau rumus yang mengevaluasi ke sebuah angka."
		} }
	},
	CHAR: {
		description: "Mengembalikan karakter yang ditentukan oleh nomor kode.",
		abstract: "Mengembalikan karakter yang ditentukan oleh nomor kode.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/char-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Angka antara 1 dan 255 yang menentukan karakter yang Anda inginkan. Karakter berasal dari kumpulan karakter yang digunakan komputer Anda."
		} }
	},
	CLEAN: {
		description: "Menghapus semua karakter tak dapat dicetak dari teks. Gunakan CLEAN pada teks yang diimpor dari aplikasi lain yang berisi karakter yang mungkin tidak tercetak pada sistem operasi Anda. Misalnya, Anda dapat menggunakan CLEAN untuk menghapus suatu kode komputer tingkat rendah yang sering berada di awal dan akhir file data dan tidak dapat dicetak.",
		abstract: "Menghapus semua karakter tak dapat dicetak dari teks. Gunakan CLEAN pada teks yang diimpor dari aplikasi lain yang berisi karakter yang mungkin tidak tercetak pada sistem operasi Anda. Misalnya, Anda dapat menggunakan CLEAN untuk menghapus suatu kode komputer tingkat rendah yang sering berada di awal dan akhir file data dan tidak dapat dicetak.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/clean-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Diperlukan. Informasi lembar kerja yang karakter tak dapat dicetaknya ingin Anda hapus ."
		} }
	},
	CODE: {
		description: "Mengembalikan kode numerik untuk karakter pertama dalam string teks.",
		abstract: "Mengembalikan kode numerik untuk karakter pertama dalam string teks.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/code-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Teks yang karakter pertamanya ingin Anda ketahui kodenya."
		} }
	},
	CONCAT: {
		description: "Fungsi CONCAT menggabungkan teks dari beberapa rentang dan/atau string, tetapi tidak menyediakan argumen pemisah atau IgnoreEmpty.",
		abstract: "Fungsi CONCAT menggabungkan teks dari beberapa rentang dan/atau string, tetapi tidak menyediakan argumen pemisah atau IgnoreEmpty.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/concat-function"
		}],
		functionParameter: {
			text1: {
				name: "text1",
				detail: "Item teks yang akan digabungkan. String, atau larik string, seperti rentang sel."
			},
			text2: {
				name: "text2",
				detail: "Item teks tambahan yang akan digabungkan. Bisa ada maksimum 253 argumen teks untuk item teks. Masing-masing dapat berupa string atau larik string, seperti rentang sel."
			}
		}
	},
	CONCATENATE: {
		description: "Gunakan CONCATENATE , salah satu dari fungsi teks , untuk menggabungkan dua atau beberapa string teks menjadi satu string.",
		abstract: "Gunakan CONCATENATE , salah satu dari fungsi teks , untuk menggabungkan dua atau beberapa string teks menjadi satu string.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/concatenate-function"
		}],
		functionParameter: {
			text1: {
				name: "text1",
				detail: "Item pertama yang akan digabungkan. Item dapat berupa nilai teks, angka, atau referensi sel."
			},
			text2: {
				name: "text2",
				detail: "Item teks tambahan yang akan digabungkan. Anda dapat memiliki hingga 255 item dengan total hingga 8.192 karakter."
			}
		}
	},
	DBCS: {
		description: "Fungsi yang diuraikan dalam topik Bantuan ini mengonversi huruf kecil (bit tunggal) di dalam sebuah string karakter menjadi huruf besar (bit ganda). Nama fungsi (dan karakter yang dikonversikan) bergantung pada pengaturan bahasa Anda.",
		abstract: "Fungsi yang diuraikan dalam topik Bantuan ini mengonversi huruf kecil (bit tunggal) di dalam sebuah string karakter menjadi huruf besar (bit ganda). Nama fungsi (dan karakter yang dikonversikan) bergantung pada pengaturan bahasa Anda.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/dbcs-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Diperlukan. Teks atau referensi ke sel yang berisi teks yang ingin Anda ubah. Jika teks tidak berisi huruf Latin atau katakana kecil, maka teks tidak berubah."
		} }
	},
	DOLLAR: {
		description: "Fungsi DOLLAR , salah satu fungsi TEXT , mengonversi angka menjadi teks menggunakan format mata uang, dengan desimal yang dibulatkan ke jumlah tempat yang Anda tentukan. DOLLAR menggunakan $#,##0.00_); ($#,##0.00) format angka, meskipun simbol mata uang yang diterapkan bergantung pada pengaturan bahasa lokal Anda.",
		abstract: "Fungsi DOLLAR , salah satu fungsi TEXT , mengonversi angka menjadi teks menggunakan format mata uang, dengan desimal yang dibulatkan ke jumlah tempat yang Anda tentukan. DOLLAR menggunakan $#,##0.00_); ($#,##0.00) format angka, meskipun simbol mata uang yang diterapkan bergantung pada pengaturan bahasa lokal Anda.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/dollar-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. Angka, atau referensi ke sel berisi angka atau rumus yang mengevaluasi ke sebuah angka."
			},
			decimals: {
				name: "decimals",
				detail: "Opsional. Jumlah digit di sebelah kanan koma desimal. Jika ini negatif, angka dibulatkan ke sebelah kiri koma desimal. Jika Anda menghilangkan desimal, diasumsikan menjadi 2."
			}
		}
	},
	EXACT: {
		description: "Membandingkan dua string teks dan akan mengembalikan TRUE jika kedua string itu sama persis, jika tidak akan mengembalikan FALSE. EXACT peka huruf besar kecil tapi mengabaikan perbedaan pemformatan. Gunakan EXACT untuk menguji teks yang dimasukkan ke dalam dokumen.",
		abstract: "Membandingkan dua string teks dan akan mengembalikan TRUE jika kedua string itu sama persis, jika tidak akan mengembalikan FALSE. EXACT peka huruf besar kecil tapi mengabaikan perbedaan pemformatan. Gunakan EXACT untuk menguji teks yang dimasukkan ke dalam dokumen.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/exact-function"
		}],
		functionParameter: {
			text1: {
				name: "text1",
				detail: "Diperlukan. String teks pertama."
			},
			text2: {
				name: "text2",
				detail: "Diperlukan. String teks kedua."
			}
		}
	},
	FIND: {
		description: "Menemukan satu nilai teks di dalam nilai teks lain dengan membedakan huruf besar dan kecil.",
		abstract: "Menemukan satu nilai teks di dalam nilai teks lain dengan membedakan huruf besar dan kecil.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/this-article-has-been-retired"
		}],
		functionParameter: {
			findText: {
				name: "find_text",
				detail: "Teks yang ingin Anda temukan."
			},
			withinText: {
				name: "within_text",
				detail: "Teks yang berisi teks yang ingin Anda temukan."
			},
			startNum: {
				name: "start_num",
				detail: "Menentukan karakter untuk memulai pencarian. Jika start_num dihilangkan, nilainya dianggap 1."
			}
		}
	},
	FINDB: {
		description: "Menemukan satu nilai teks di dalam nilai teks lain dengan membedakan huruf besar dan kecil.",
		abstract: "Menemukan satu nilai teks di dalam nilai teks lain dengan membedakan huruf besar dan kecil.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/this-article-has-been-retired"
		}],
		functionParameter: {
			findText: {
				name: "find_text",
				detail: "Teks yang ingin Anda temukan."
			},
			withinText: {
				name: "within_text",
				detail: "Teks yang berisi teks yang ingin Anda temukan."
			},
			startNum: {
				name: "start_num",
				detail: "Menentukan karakter untuk memulai pencarian. Jika start_num dihilangkan, nilainya dianggap 1."
			}
		}
	},
	FIXED: {
		description: "Membulatkan angka ke jumlah desimal yang ditentukan, memformat angka dalam format desimal dengan menggunakan titik dan koma, dan mengembalikan hasil sebagai teks.",
		abstract: "Membulatkan angka ke jumlah desimal yang ditentukan, memformat angka dalam format desimal dengan menggunakan titik dan koma, dan mengembalikan hasil sebagai teks.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/fixed-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Diperlukan. Angka yang ingin Anda bulatkan dan konversikan menjadi teks."
			},
			decimals: {
				name: "decimals",
				detail: "Opsional. Jumlah digit di sebelah kanan koma desimal."
			},
			noCommas: {
				name: "no_commas",
				detail: "Opsional. Nilai logika yang, jika TRUE, mencegah agar FIXED tidak memasukkan koma ke dalam teks yang dikembalikan."
			}
		}
	},
	LEFT: {
		description: "Mengembalikan karakter paling kiri dari nilai teks.",
		abstract: "Mengembalikan karakter paling kiri dari nilai teks.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/left-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "String teks yang berisi karakter yang ingin Anda ekstrak."
			},
			numChars: {
				name: "num_chars",
				detail: "Menentukan jumlah karakter yang ingin diekstrak LEFT."
			}
		}
	},
	LEFTB: {
		description: "Mengembalikan karakter paling kiri dari nilai teks.",
		abstract: "Mengembalikan karakter paling kiri dari nilai teks.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/left-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "String teks yang berisi karakter yang ingin Anda ekstrak."
			},
			numBytes: {
				name: "num_bytes",
				detail: "Menentukan jumlah karakter yang ingin diekstrak LEFTB berdasarkan byte."
			}
		}
	},
	LEN: {
		description: "Mengembalikan jumlah karakter dalam string teks.",
		abstract: "Mengembalikan jumlah karakter dalam string teks.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/len-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Teks yang panjangnya ingin Anda temukan. Spasi dihitung sebagai karakter."
		} }
	},
	LENB: {
		description: "Mengembalikan jumlah byte yang digunakan untuk merepresentasikan karakter dalam string teks.",
		abstract: "Mengembalikan jumlah byte yang digunakan untuk merepresentasikan karakter dalam string teks.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/len-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Teks yang panjangnya ingin Anda temukan. Spasi dihitung sebagai karakter."
		} }
	},
	LOWER: {
		description: "Mengonversi teks menjadi huruf kecil.",
		abstract: "Mengonversi teks menjadi huruf kecil.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/lower-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Teks yang ingin Anda konversi menjadi huruf kecil."
		} }
	},
	MID: {
		description: "Mengembalikan sejumlah karakter tertentu dari string teks mulai dari posisi yang ditentukan.",
		abstract: "Mengembalikan sejumlah karakter tertentu dari string teks mulai dari posisi yang ditentukan.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/mid-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "String teks yang berisi karakter yang ingin Anda ekstrak."
			},
			startNum: {
				name: "start_num",
				detail: "Posisi karakter pertama dalam teks yang ingin Anda ekstrak."
			},
			numChars: {
				name: "num_chars",
				detail: "Menentukan jumlah karakter yang ingin diekstrak MID."
			}
		}
	},
	MIDB: {
		description: "Mengembalikan sejumlah karakter tertentu dari string teks mulai dari posisi yang ditentukan.",
		abstract: "Mengembalikan sejumlah karakter tertentu dari string teks mulai dari posisi yang ditentukan.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/mid-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "String teks yang berisi karakter yang ingin Anda ekstrak."
			},
			startNum: {
				name: "start_num",
				detail: "Posisi karakter pertama dalam teks yang ingin Anda ekstrak."
			},
			numBytes: {
				name: "num_bytes",
				detail: "Menentukan jumlah karakter yang ingin diekstrak MIDB berdasarkan byte."
			}
		}
	},
	NUMBERSTRING: {
		description: "Mengonversi angka menjadi string bahasa Mandarin.",
		abstract: "Mengonversi angka menjadi string bahasa Mandarin.",
		links: [{
			title: "Instruction",
			url: "https://www.wps.cn/learning/course/detail/id/340.html?chan=pc_kdocs_function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Nilai yang dikonversi menjadi string bahasa Mandarin."
			},
			type: {
				name: "type",
				detail: "Jenis hasil yang dikembalikan. \n1. Huruf kecil bahasa Mandarin \n2. Huruf besar bahasa Mandarin \n3. Karakter Mandarin untuk membaca dan menulis"
			}
		}
	},
	NUMBERVALUE: {
		description: "Mengonversi teks menjadi angka secara lokal independen.",
		abstract: "Mengonversi teks menjadi angka secara lokal independen.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/numbervalue-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Diperlukan. Teks yang akan dikonversi menjadi angka."
			},
			decimalSeparator: {
				name: "decimal_separator",
				detail: "Opsional. Karakter yang digunakan untuk memisahkan bilangan bulat dan bagian pecahan dari hasil."
			},
			groupSeparator: {
				name: "group_separator",
				detail: "Opsional. Karakter yang digunakan untuk memisahkan pengelompokan angka, seperti ribuan dari ratusan dan jutaan dari ribuan."
			}
		}
	},
	PHONETIC: {
		description: "Mengekstrak karakter fonetik (furigana) dari string teks.",
		abstract: "Mengekstrak karakter fonetik (furigana) dari string teks.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/phonetic-function"
		}],
		functionParameter: { reference: {
			name: "Referensi",
			detail: "Diperlukan. String teks atau referensi ke sel tunggal atau rangkaian sel yang berisi string teks furigana."
		} }
	},
	PROPER: {
		description: "Menjadikan huruf besar untuk huruf pertama dalam string teks dan huruf-huruf lain dalam teks yang mengikuti karakter selain huruf. Mengonversi semua huruf lain menjadi huruf kecil.",
		abstract: "Menjadikan huruf besar untuk huruf pertama dalam string teks dan huruf-huruf lain dalam teks yang mengikuti karakter selain huruf. Mengonversi semua huruf lain menjadi huruf kecil.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/proper-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Diperlukan. Teks yang berada di dalam tanda kutip, rumus yang mengembalikan teks, atau referensi ke sel yang berisi teks yang sebagiannya ingin Anda jadikan huruf besar."
		} }
	},
	REGEXEXTRACT: {
		description: "Mengekstrak substring pertama yang cocok berdasarkan ekspresi reguler.",
		abstract: "Mengekstrak substring pertama yang cocok berdasarkan ekspresi reguler.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3098244?hl=id"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Teks masukan."
			},
			regularExpression: {
				name: "regular_expression",
				detail: "Bagian pertama teks yang cocok dengan ekspresi ini akan dikembalikan."
			}
		}
	},
	REGEXMATCH: {
		description: "Menentukan apakah suatu teks cocok dengan ekspresi reguler.",
		abstract: "Menentukan apakah suatu teks cocok dengan ekspresi reguler.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3098292?hl=id"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Teks yang akan diuji terhadap ekspresi reguler."
			},
			regularExpression: {
				name: "regular_expression",
				detail: "Ekspresi reguler untuk menguji teks."
			}
		}
	},
	REGEXREPLACE: {
		description: "Mengganti bagian dari string teks dengan string teks lain menggunakan ekspresi reguler.",
		abstract: "Mengganti bagian dari string teks dengan string teks lain menggunakan ekspresi reguler.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3098245?hl=id"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Teks yang sebagian isinya akan diganti."
			},
			regularExpression: {
				name: "regular_expression",
				detail: "Ekspresi reguler. Semua bagian teks yang cocok akan diganti."
			},
			replacement: {
				name: "replacement",
				detail: "Teks yang akan disisipkan ke dalam teks asli."
			}
		}
	},
	REPLACE: {
		description: "Mengganti karakter dalam teks.",
		abstract: "Mengganti karakter dalam teks.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/replace-function"
		}],
		functionParameter: {
			oldText: {
				name: "old_text",
				detail: "Teks yang beberapa karakternya ingin Anda ganti."
			},
			startNum: {
				name: "start_num",
				detail: "Posisi karakter dalam old_text yang ingin Anda ganti dengan new_text."
			},
			numChars: {
				name: "num_chars",
				detail: "Jumlah karakter dalam old_text yang ingin diganti REPLACE dengan new_text."
			},
			newText: {
				name: "new_text",
				detail: "Teks yang akan menggantikan karakter dalam old_text."
			}
		}
	},
	REPLACEB: {
		description: "Mengganti karakter dalam teks.",
		abstract: "Mengganti karakter dalam teks.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/replace-function"
		}],
		functionParameter: {
			oldText: {
				name: "old_text",
				detail: "Teks yang beberapa karakternya ingin Anda ganti."
			},
			startNum: {
				name: "start_num",
				detail: "Posisi karakter dalam old_text yang ingin Anda ganti dengan new_text."
			},
			numBytes: {
				name: "num_bytes",
				detail: "Jumlah byte dalam old_text yang ingin diganti REPLACEB dengan new_text."
			},
			newText: {
				name: "new_text",
				detail: "Teks yang akan menggantikan karakter dalam old_text."
			}
		}
	},
	REPT: {
		description: "Mengulang teks sebanyak jumlah tertentu. Gunakan REPT untuk mengisi sel dengan jumlah item string teks.",
		abstract: "Mengulang teks sebanyak jumlah tertentu. Gunakan REPT untuk mengisi sel dengan jumlah item string teks.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/rept-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Diperlukan. Teks yang ingin Anda ulang."
			},
			numberTimes: {
				name: "number_times",
				detail: "Diperlukan. Angka positif yang menentukan berapa kali teks diulang."
			}
		}
	},
	RIGHT: {
		description: "Mengembalikan karakter paling kanan dari nilai teks.",
		abstract: "Mengembalikan karakter paling kanan dari nilai teks.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/right-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "String teks yang berisi karakter yang ingin Anda ekstrak."
			},
			numChars: {
				name: "num_chars",
				detail: "Menentukan jumlah karakter yang ingin diekstrak RIGHT."
			}
		}
	},
	RIGHTB: {
		description: "Mengembalikan karakter paling kanan dari nilai teks.",
		abstract: "Mengembalikan karakter paling kanan dari nilai teks.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/right-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "String teks yang berisi karakter yang ingin Anda ekstrak."
			},
			numBytes: {
				name: "num_bytes",
				detail: "Menentukan jumlah karakter yang ingin diekstrak RIGHTB berdasarkan byte."
			}
		}
	},
	SEARCH: {
		description: "Menemukan satu nilai teks di dalam nilai teks lain tanpa membedakan huruf besar dan kecil.",
		abstract: "Menemukan satu nilai teks di dalam nilai teks lain tanpa membedakan huruf besar dan kecil.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/search-function"
		}],
		functionParameter: {
			findText: {
				name: "find_text",
				detail: "Teks yang ingin Anda temukan."
			},
			withinText: {
				name: "within_text",
				detail: "Teks yang berisi teks yang ingin Anda temukan."
			},
			startNum: {
				name: "start_num",
				detail: "Menentukan karakter untuk memulai pencarian. Jika start_num dihilangkan, nilainya dianggap 1."
			}
		}
	},
	SEARCHB: {
		description: "Menemukan satu nilai teks di dalam nilai teks lain tanpa membedakan huruf besar dan kecil.",
		abstract: "Menemukan satu nilai teks di dalam nilai teks lain tanpa membedakan huruf besar dan kecil.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/search-function"
		}],
		functionParameter: {
			findText: {
				name: "find_text",
				detail: "Teks yang ingin Anda temukan."
			},
			withinText: {
				name: "within_text",
				detail: "Teks yang berisi teks yang ingin Anda temukan."
			},
			startNum: {
				name: "start_num",
				detail: "Menentukan karakter untuk memulai pencarian. Jika start_num dihilangkan, nilainya dianggap 1."
			}
		}
	},
	SUBSTITUTE: {
		description: "Mengganti old_text dengan new_text di string teks. Gunakan SUBSTITUTE saat Anda ingin mengganti teks tertentu dalam string teks; gunakan REPLACE saat Anda ingin mengganti teks apa pun yang muncul di lokasi tertentu dalam string teks.",
		abstract: "Mengganti old_text dengan new_text di string teks. Gunakan SUBSTITUTE saat Anda ingin mengganti teks tertentu dalam string teks; gunakan REPLACE saat Anda ingin mengganti teks apa pun yang muncul di lokasi tertentu dalam string teks.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/substitute-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Diperlukan. Teks atau referensi sel berisi teks yang ingin Anda ganti karakternya."
			},
			oldText: {
				name: "old_text",
				detail: "Diperlukan. Teks yang ingin Anda ganti."
			},
			newText: {
				name: "new_text",
				detail: "Diperlukan. Teks yang ingin Anda gunakan untuk mengganti old_text."
			},
			instanceNum: {
				name: "instance_num",
				detail: "Opsional. Menentukan kemunculan old_text yang ingin Anda ganti dengan new_text. Jika Anda menentukan instance_num, hanya old_text itu yang diganti. Jika tidak, setiap kemunculan old_text dalam text diganti ke new_text."
			}
		}
	},
	T: {
		description: "Mengembalikan teks yang dirujuk oleh nilai.",
		abstract: "Mengembalikan teks yang dirujuk oleh nilai.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/t-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Diperlukan. Nilai yang ingin Anda uji."
		} }
	},
	TEXT: {
		description: "Fungsi TEXT memungkinkan Anda untuk mengubah cara angka muncul dengan menerapkan pemformatan ke dalamnya dengan kode format . Hal ini bermanfaat ketika Anda ingin menampilkan angka dalam format yang lebih mudah dibaca, atau ketika ingin menggabungkan angka dengan teks atau simbol.",
		abstract: "Fungsi TEXT memungkinkan Anda untuk mengubah cara angka muncul dengan menerapkan pemformatan ke dalamnya dengan kode format . Hal ini bermanfaat ketika Anda ingin menampilkan angka dalam format yang lebih mudah dibaca, atau ketika ingin menggabungkan angka dengan teks atau simbol.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/text-function"
		}],
		functionParameter: {
			value: {
				name: "value",
				detail: "Nilai angka yang ingin Anda konversi menjadi teks."
			},
			formatText: {
				name: "format_text",
				detail: "String teks yang menentukan pemformatan yang ingin diterapkan pada nilai yang diberikan."
			}
		}
	},
	TEXTAFTER: {
		description: "Mengembalikan teks yang muncul setelah karakter atau string tertentu. Fungsi ini merupakan kebalikan dari fungsi TEXTBEFORE .",
		abstract: "Mengembalikan teks yang muncul setelah karakter atau string tertentu. Fungsi ini merupakan kebalikan dari fungsi TEXTBEFORE .",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/textafter-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Teks tempat Anda melakukan pencarian. Karakter wildcard tidak diperbolehkan."
			},
			delimiter: {
				name: "delimiter",
				detail: "Teks yang menandai titik setelah teks yang ingin Anda ekstrak."
			},
			instanceNum: {
				name: "instance_num",
				detail: "Kemunculan pemisah setelahnya teks akan diekstrak."
			},
			matchMode: {
				name: "match_mode",
				detail: "Menentukan apakah pencarian teks peka huruf besar/kecil. Default-nya peka huruf besar/kecil."
			},
			matchEnd: {
				name: "match_end",
				detail: "Memperlakukan akhir teks sebagai pemisah. Secara default, teks harus cocok persis."
			},
			ifNotFound: {
				name: "if_not_found",
				detail: "Nilai yang dikembalikan jika tidak ditemukan kecocokan. Secara default, #N/A dikembalikan."
			}
		}
	},
	TEXTBEFORE: {
		description: "Mengembalikan teks yang muncul sebelum karakter atau string tertentu. Fungsi ini merupakan kebalikan dari fungsi TEXTAFTER .",
		abstract: "Mengembalikan teks yang muncul sebelum karakter atau string tertentu. Fungsi ini merupakan kebalikan dari fungsi TEXTAFTER .",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/textbefore-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Teks tempat Anda melakukan pencarian. Karakter wildcard tidak diperbolehkan."
			},
			delimiter: {
				name: "delimiter",
				detail: "Teks yang menandai titik sebelum teks yang ingin Anda ekstrak."
			},
			instanceNum: {
				name: "instance_num",
				detail: "Kemunculan pemisah sebelumnya teks akan diekstrak."
			},
			matchMode: {
				name: "match_mode",
				detail: "Menentukan apakah pencarian teks peka huruf besar/kecil. Default-nya peka huruf besar/kecil."
			},
			matchEnd: {
				name: "match_end",
				detail: "Memperlakukan awal teks sebagai pemisah. Secara default, teks harus cocok persis."
			},
			ifNotFound: {
				name: "if_not_found",
				detail: "Nilai yang dikembalikan jika tidak ditemukan kecocokan. Secara default, #N/A dikembalikan."
			}
		}
	},
	TEXTJOIN: {
		description: "Fungsi TEXTJOIN menggabungkan teks dari beberapa rentang dan/atau string, serta menyertakan pemisah yang Anda tentukan antara tiap nilai teks yang akan digabungkan. Jika pemisah adalah string teks kosong, fungsi ini akan secara efektif menggabungkan rentang.",
		abstract: "Fungsi TEXTJOIN menggabungkan teks dari beberapa rentang dan/atau string, serta menyertakan pemisah yang Anda tentukan antara tiap nilai teks yang akan digabungkan. Jika pemisah adalah string teks kosong, fungsi ini akan secara efektif menggabungkan rentang.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/id-id/excel/functions/textjoin-function"
		}],
		functionParameter: {
			delimiter: {
				name: "delimiter",
				detail: "String teks, salah satu kosong, atau satu atau beberapa karakter diapit oleh tanda kutip ganda, atau referensi ke sebuah string teks yang valid. Jika angka dimasukkan, maka akan dianggap sebagai teks."
			},
			ignoreEmpty: {
				name: "ignore_empty",
				detail: "Jika TRUE, sel kosong diabaikan."
			},
			text1: {
				name: "text1",
				detail: "Item teks yang digabungkan. String teks, atau larik string, seperti rentang sel."
			},
			text2: {
				name: "text2",
				detail: "Item teks tambahan untuk digabungkan. Bisa ada maksimum 252 argumen teks untuk item teks, termasuk text1 . Setiap argumen dapat berupa string teks, atau larik string, seperti rentang sel."
			}
		}
	},
	TEXTSPLIT: {
		description: "Fungsi TEXTSPLIT berfungsi sama seperti Wizard Teks-ke-Kolom , tetapi dalam bentuk rumus. Fungsi ini memungkinkan Anda memisahkan menurut kolom atau ke bawah menurut baris. Ini adalah kebalikan dari fungsi TEXTJOIN .",
		abstract: "Fungsi TEXTSPLIT berfungsi sama seperti Wizard Teks-ke-Kolom , tetapi dalam bentuk rumus. Fungsi ini memungkinkan Anda memisahkan menurut kolom atau ke bawah menurut baris. Ini adalah kebalikan dari fungsi TEXTJOIN .",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/textsplit-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Teks yang ingin Anda pisahkan. Diperlukan."
			},
			colDelimiter: {
				name: "col_delimiter",
				detail: "Teks yang menandai titik tempat untuk menumpahkan teks di seluruh kolom."
			},
			rowDelimiter: {
				name: "row_delimiter",
				detail: "Teks yang menandai titik tempat untuk menumpahkan teks ke bawah baris. Opsional."
			},
			ignoreEmpty: {
				name: "ignore_empty",
				detail: "Tentukan TRUE untuk mengabaikan pemisah berurutan. Default ke FALSE, yang membuat sel kosong. Opsional."
			},
			matchMode: {
				name: "match_mode",
				detail: "Tentukan 1 untuk melakukan kecocokan yang tidak peka huruf besar kecil. Default ke 0, yang melakukan kecocokan peka huruf besar kecil. Opsional."
			},
			padWith: {
				name: "pad_with",
				detail: "Nilai untuk mengalihkan hasil. Defaultnya adalah #N/A."
			}
		}
	},
	TRIM: {
		description: "Menghapus semua spasi dari teks kecuali spasi tunggal di antara kata. Gunakan TRIM pada teks yang Anda terima dari aplikasi lain yang mungkin memiliki penspasian tak tentu.",
		abstract: "Menghapus semua spasi dari teks kecuali spasi tunggal di antara kata. Gunakan TRIM pada teks yang Anda terima dari aplikasi lain yang mungkin memiliki penspasian tak tentu.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/trim-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Teks yang ingin Anda hapus spasinya. Teks harus dimuat dalam tanda petik."
		} }
	},
	UNICHAR: {
		description: "Mengembalikan karakter Unicode yang dirujuk oleh nilai numerik yang diberikan.",
		abstract: "Mengembalikan karakter Unicode yang dirujuk oleh nilai numerik yang diberikan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/unichar-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Diperlukan. Angka adalah angka Unicode yang menyatakan karakter tersebut."
		} }
	},
	UNICODE: {
		description: "Mengembalikan angka (titik kode) yang terkait dengan karakter pertama dari teks.",
		abstract: "Mengembalikan angka (titik kode) yang terkait dengan karakter pertama dari teks.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/unicode-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Diperlukan. Teks adalah karakter yang Anda inginkan nilai Unicode-nya."
		} }
	},
	UPPER: {
		description: "Mengonversi teks menjadi huruf besar.",
		abstract: "Mengonversi teks menjadi huruf besar.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/upper-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Diperlukan. Teks yang ingin Anda konversi ke huruf besar. Teks dapat berupa referensi atau string teks."
		} }
	},
	VALUE: {
		description: "Mengonversi string teks yang menyatakan angka menjadi angka.",
		abstract: "Mengonversi string teks yang menyatakan angka menjadi angka.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/value-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Diperlukan. Teks dalam tanda kutip atau referensi ke sel yang berisi teks yang akan dikonversi."
		} }
	},
	VALUETOTEXT: {
		description: "Fungsi VALUETOTEXT mengembalikan teks dari nilai tertentu. Ini melewati nilai teks tidak berubah, dan mengonversi nilai non-teks menjadi teks.",
		abstract: "Fungsi VALUETOTEXT mengembalikan teks dari nilai tertentu. Ini melewati nilai teks tidak berubah, dan mengonversi nilai non-teks menjadi teks.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/valuetotext-function"
		}],
		functionParameter: {
			value: {
				name: "value",
				detail: "Nilai untuk dikembalikan sebagai teks. Diperlukan."
			},
			format: {
				name: "format",
				detail: "Format data yang dikembalikan. Opsional. Ini bisa menjadi salah satu dari dua nilai: 0 Default. Format ringkas yang mudah dibaca. Teks yang dikembalikan akan sama seperti teks yang disajikan dalam sel yang memiliki pemformatan umum yang diterapkan. 1 Format ketat yang menyertakan karakter escape dan pemisah baris. Menghasilkan string yang dapat diurai ketika dimasukkan ke bilah rumus. Enkapsulasi mengembalikan string dalam tanda petik kecuali untuk Boolean, Angka, dan Kesalahan."
			}
		}
	},
	CALL: {
		description: "Memanggil prosedur dalam pustaka link dinamis atau sumber daya kode. Terdapat dua bentuk sintaks fungsi ini. Gunakan sintaks 1 hanya dengan sumber daya kode yang terdaftar sebelumnya, yang menggunakan argumen dari fungsi REGISTER. Gunakan sintaks 2a atau 2b pada daftar secara bersamaan dan memanggil sumber daya kode.",
		abstract: "Memanggil prosedur dalam pustaka link dinamis atau sumber daya kode. Terdapat dua bentuk sintaks fungsi ini. Gunakan sintaks 1 hanya dengan sumber daya kode yang terdaftar sebelumnya, yang menggunakan argumen dari fungsi REGISTER. Gunakan sintaks 2a atau 2b pada daftar secara bersamaan dan memanggil sumber daya kode.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/call-function"
		}],
		functionParameter: {
			moduleText: {
				name: "Module_text",
				detail: "Diperlukan. Teks kutipan yang menentukan nama pustaka link dinamis (DLL) yang berisi prosedur di Microsoft Excel untuk Windows."
			},
			procedure: {
				name: "Prosedur",
				detail: "Diperlukan. Teks yang menentukan nama fungsi dalam DLL di Microsoft Excel untuk Windows. Anda juga dapat menggunakan nilai ordinal fungsi dari pernyataan EXPORTS dalam file definisi modul (.DEF). Nilai ordinal harus dalam bentuk teks."
			},
			typeText: {
				name: "Type_text",
				detail: "Diperlukan. Teks yang menyatakan tipe data dari nilai yang dikembalikan dan tipe data dari semua argumen pada DLL atau sumber daya kode. Huruf pertama type_text menyatakan nilai yang dikembalikan. Kode yang Anda gunakan untuk type_text diuraikan secara detail dalam Penggunaan fungsi CALL dan REGISTER . Untuk DLL atau sumber daya kode (XLL) yang berdiri sendiri, Anda dapat menghapus argumen ini."
			},
			argument1: {
				name: "Argumen1,...",
				detail: "Opsional. Argumen yang akan dikirim ke prosedur."
			}
		}
	},
	EUROCONVERT: {
		description: "Mengonversi angka ke euro, mengonversi angka dari euro ke mata uang anggota euro, atau mengonversi angka dari satu mata uang anggota euro ke mata uang lain dengan menggunakan euro sebagai perantara (triangulasi). Mata uang yang tersedia untuk dikonversi adalah mata uang negara-negara anggota Uni Eropa (UE) yang telah mengadopsi euro. Fungsi ini menggunakan nilai konversi tetap yang dibuat oleh UE.",
		abstract: "Mengonversi angka ke euro, mengonversi angka dari euro ke mata uang anggota euro, atau mengonversi angka dari satu mata uang anggota euro ke mata uang lain dengan menggunakan euro sebagai perantara (triangulasi). Mata uang yang tersedia untuk dikonversi adalah mata uang negara-negara anggota Uni Eropa (UE) yang telah mengadopsi euro. Fungsi ini menggunakan nilai konversi tetap yang dibuat oleh UE.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/euroconvert-function"
		}],
		functionParameter: {
			number: {
				name: "Angka",
				detail: "Diperlukan. Nilai mata uang yang ingin Anda konversi, atau referensi ke sebuah sel yang berisi nilai tersebut."
			},
			source: {
				name: "Sumber",
				detail: "Diperlukan. String tiga huruf, atau referensi ke sel yang berisi string tersebut, yang terkait kode ISO untuk mata uang sumber. Kode mata uang berikut tersedia dalam fungsi EUROCONVERT:"
			},
			target: {
				name: "Target",
				detail: "Diperlukan. String tiga huruf, atau referensi sel, yang terkait dengan kode ISO mata uang hasil konversi angka. Lihat tabel Sumber sebelumnya untuk melihat kode ISO."
			},
			fullPrecision: {
				name: "Full_precision",
				detail: "Diperlukan. Sebuah nilai logika (TRUE atau FALSE), atau ekspresi yang mengevaluasi sebuah nilai sebagai TRUE atau FALSE, yang menentukan cara menampilkan hasilnya."
			},
			triangulationPrecision: {
				name: "Triangulation_precision",
				detail: "Diperlukan. Sebuah bilangan bulat sama dengan atau lebih dari 3 yang menentukan jumlah digit signifikan yang akan digunakan untuk nilai euro langsung ketika mengonversi antara dua mata uang anggota euro. Jika Anda menghilangkan argumen ini, Excel tidak membulatkan nilai euro perantara tersebut. Jika Anda memasukkan argumen ini ketika mengonversi dari suatu mata uang anggota euro ke euro, Excel menghitung nilai euro perantara yang kemudian dapat dikonversi ke mata uang anggota euro."
			}
		}
	},
	REGISTER_ID: {
		description: "Mengembalikan ID pendaftaran dari pustaka link dinamis (DLL, Dynamic Link Library) yang ditentukan atau sumber daya kode yang telah didaftarkan sebelumnya. Jika DLL atau sumber daya kode belum didaftarkan, fungsi ini mendaftarkan DLL atau sumber daya kode lalu mengembalikan ID pendaftaran.",
		abstract: "Mengembalikan ID pendaftaran dari pustaka link dinamis (DLL, Dynamic Link Library) yang ditentukan atau sumber daya kode yang telah didaftarkan sebelumnya. Jika DLL atau sumber daya kode belum didaftarkan, fungsi ini mendaftarkan DLL atau sumber daya kode lalu mengembalikan ID pendaftaran.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/register-id-function"
		}],
		functionParameter: {
			moduleText: {
				name: "Module_text",
				detail: "Diperlukan. Teks yang menyatakan nama DLL yang memuat fungsi dalam Microsoft Excel untuk Windows."
			},
			procedure: {
				name: "Prosedur",
				detail: "Diperlukan. Teks yang menentukan nama fungsi dalam DLL di Microsoft Excel untuk Windows. Anda juga dapat menggunakan nilai ordinal fungsi dari pernyataan EXPORTS dalam file definisi modul (.DEF). Nilai ordinal atau nomor ID sumber daya tidak boleh dalam bentuk teks."
			},
			typeText: {
				name: "Type_text",
				detail: "Opsional. Teks yang menyatakan tipe data nilai yang dikembalikan dan tipe data semua argumen ke DLL. Huruf pertama type_text menyatakan nilai yang dikembalikan. Jika fungsi atau sumber daya kode sudah didaftarkan, Anda dapat menghilangkan argumen ini."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/univer/id-ID.ts
const locale$2 = {};

//#endregion
//#region src/locale/function-list/web/id-ID.ts
const locale$1 = {
	ENCODEURL: {
		description: "Fungsi ENCODEURL mengembalikan string berkode URL, mengganti karakter non-alfanumerik tertentu dengan simbol persentase (%) dan angka heksadesimal.",
		abstract: "Fungsi ENCODEURL mengembalikan string berkode URL, mengganti karakter non-alfanumerik tertentu dengan simbol persentase (%) dan angka heksadesimal.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/encodeurl-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "String yang akan dikodekan dengan URL"
		} }
	},
	FILTERXML: {
		description: "Fungsi FILTERXML mengembalikan data tertentu dari konten XML menggunakan xpath yang ditentukan.",
		abstract: "Fungsi FILTERXML mengembalikan data tertentu dari konten XML menggunakan xpath yang ditentukan.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/filterxml-function"
		}],
		functionParameter: {
			xml: {
				name: "xml",
				detail: "String dalam format XML yang valid."
			},
			xpath: {
				name: "xpath",
				detail: "String dalam format XPath standar."
			}
		}
	},
	WEBSERVICE: {
		description: "Fungsi WEBSERVICE mengembalikan data dari layanan web di Internet atau Intranet.",
		abstract: "Fungsi WEBSERVICE mengembalikan data dari layanan web di Internet atau Intranet.",
		links: [{
			title: "Petunjuk",
			url: "https://support.microsoft.com/id-id/excel/functions/webservice-function"
		}],
		functionParameter: { url: {
			name: "url",
			detail: "URL layanan web."
		} }
	}
};

//#endregion
//#region src/locale/id-ID.ts
const locale = { "engine-formula": { functionList: {
	...locale$15,
	...locale$14,
	...locale$13,
	...locale$12,
	...locale$11,
	...locale$10,
	...locale$9,
	...locale$8,
	...locale$7,
	...locale$6,
	...locale$5,
	...locale$4,
	...locale$3,
	...locale$2,
	...locale$1
} } };

//#endregion
export { locale as default };