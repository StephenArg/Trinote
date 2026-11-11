//#region src/locale/function-list/array/zh-TW.ts
const locale$14 = {
	ARRAY_CONSTRAIN: {
		description: "限制特定大小的陣列結果。",
		abstract: "限制特定大小的陣列結果。",
		links: [{
			title: "教導",
			url: "https://support.google.com/docs/answer/3267036?hl=zh-Hant"
		}],
		functionParameter: {
			inputRange: {
				name: "陣列",
				detail: "限制的範圍。"
			},
			numRows: {
				name: "列數",
				detail: "結果所包含的列數。"
			},
			numCols: {
				name: "欄數",
				detail: "結果所包含的欄數。"
			}
		}
	},
	FLATTEN: {
		description: "將一或多個範圍中的所有值合併至單一欄。",
		abstract: "將一或多個範圍中的所有值合併至單一欄。",
		links: [{
			title: "教導",
			url: "https://support.google.com/docs/answer/10307761?hl=zh-Hant"
		}],
		functionParameter: {
			range1: {
				name: "範圍1",
				detail: "第一個要合併的範圍。"
			},
			range2: {
				name: "範圍2",
				detail: "[選用] 可重複 其他要合併的範圍。"
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/compatibility/zh-TW.ts
const locale$13 = {
	BETADIST: {
		description: "傳回累加 beta 機率密度函數。 beta 分配常用來研究不同樣本之間的變異程度百分比，例如研究大眾每日花在看電視的部分時間。",
		abstract: "傳回累加 beta 機率密度函數。 beta 分配常用來研究不同樣本之間的變異程度百分比，例如研究大眾每日花在看電視的部分時間。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/betadist-function"
		}],
		functionParameter: {
			x: {
				name: "值",
				detail: "需要 X 。 為 A 與 B 之間的一個數值，用以評估該函數。"
			},
			alpha: {
				name: "alpha",
				detail: "必須。 這是分配的參數。"
			},
			beta: {
				name: "beta",
				detail: "必須。 這是分配的參數。"
			},
			A: {
				name: "下限",
				detail: "可選的。 這是 x 區間下限。"
			},
			B: {
				name: "上限",
				detail: "選。 這是 x 區間上限。"
			}
		}
	},
	BETAINV: {
		description: "傳回指定 beta 分配之累加 beta 機率密度函數的反函數值。 也就是說，若 probability = BETADIST(x,...)，則 BETAINV(probability,...) = x。 在專案規劃中可使用 beta 分配，以特定的預期完成時間及變化來模擬可能的完成時間。",
		abstract: "傳回指定 beta 分配之累加 beta 機率密度函數的反函數值。 也就是說，若 probability = BETADIST(x,...)，則 BETAINV(probability,...) = x。 在專案規劃中可使用 beta 分配，以特定的預期完成時間及變化來模擬可能的完成時間。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/betainv-function"
		}],
		functionParameter: {
			probability: {
				name: "機率",
				detail: "必須。 這是 beta 分配的相關機率。"
			},
			alpha: {
				name: "alpha",
				detail: "必須。 這是分配的參數。"
			},
			beta: {
				name: "beta",
				detail: "必須。 這是分配的參數。"
			},
			A: {
				name: "下限",
				detail: "可選的。 這是 x 區間下限。"
			},
			B: {
				name: "上限",
				detail: "選。 這是 x 區間上限。"
			}
		}
	},
	BINOMDIST: {
		description: "傳回在特定次數的二項分配實驗中，實驗成功的機率。 若實驗的結果不是成功就是失敗，並且任何實驗都是獨立的，同時在整個實驗中，成功的機率是常數，便可使用 BINOMDIST 函數來解決固定實驗次數的問題。 例如，BINOMDIST 可以計算下三胎中有兩男的機率。",
		abstract: "傳回在特定次數的二項分配實驗中，實驗成功的機率。 若實驗的結果不是成功就是失敗，並且任何實驗都是獨立的，同時在整個實驗中，成功的機率是常數，便可使用 BINOMDIST 函數來解決固定實驗次數的問題。 例如，BINOMDIST 可以計算下三胎中有兩男的機率。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/binomdist-function"
		}],
		functionParameter: {
			numberS: {
				name: "成功次數",
				detail: "必須。 為實驗的成功次數。"
			},
			trials: {
				name: "實驗次數",
				detail: "必須。 為獨立實驗的次數。"
			},
			probabilityS: {
				name: "成功機率",
				detail: "必須。 每一次實驗的成功機率。"
			},
			cumulative: {
				name: "累積",
				detail: "必須。 這是決定函數形式的邏輯值。 如果 cumulative 為 TRUE，則 BINOMDIST 會傳回累加分配函數，最多有 number_s 次成功的機率；如果為 FALSE，則會傳回機率質量函數，有 number_s 次成功的機率。"
			}
		}
	},
	CHIDIST: {
		description: "傳回卡方分配的右尾機率值。 χ2 分配與 χ2 檢定相關聯。 使用 χ2 檢定可以比較觀察值與預期值。 例如，遺傳學實驗可能會假設植物的下一代會顯出一組特定的顏色。 藉由比較觀查結果與預期結果，您可以判定原先的假設是否有效。",
		abstract: "傳回卡方分配的右尾機率值。 χ2 分配與 χ2 檢定相關聯。 使用 χ2 檢定可以比較觀察值與預期值。 例如，遺傳學實驗可能會假設植物的下一代會顯出一組特定的顏色。 藉由比較觀查結果與預期結果，您可以判定原先的假設是否有效。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/chidist-function"
		}],
		functionParameter: {
			x: {
				name: "值",
				detail: "需要 X 。 這是用來評估分配的值。"
			},
			degFreedom: {
				name: "自由度",
				detail: "必須。 這是自由度。"
			}
		}
	},
	CHIINV: {
		description: "傳回卡方分配之右尾機率的反函數值。 若 probability = CHIDIST(x,...)，則 CHIINV(probability,...) = x。 使用此函數比較觀查結果和預期結果，用以判斷原始的假設是否有效。",
		abstract: "傳回卡方分配之右尾機率的反函數值。 若 probability = CHIDIST(x,...)，則 CHIINV(probability,...) = x。 使用此函數比較觀查結果和預期結果，用以判斷原始的假設是否有效。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/chiinv-function"
		}],
		functionParameter: {
			probability: {
				name: "機率",
				detail: "必須。 這是與卡方分配相關聯的機率。"
			},
			degFreedom: {
				name: "自由度",
				detail: "必須。 這是自由度。"
			}
		}
	},
	CHITEST: {
		description: "傳回獨立性檢定的結果。 CHITEST 會根據統計量及適當的自由度傳回卡方 (χ2) 分配的值。 您可以使用 χ2 檢定來判斷實驗結果是否符合原先的假設。",
		abstract: "傳回獨立性檢定的結果。 CHITEST 會根據統計量及適當的自由度傳回卡方 (χ2) 分配的值。 您可以使用 χ2 檢定來判斷實驗結果是否符合原先的假設。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/chitest-function"
		}],
		functionParameter: {
			actualRange: {
				name: "觀察範圍",
				detail: "必須。 這是觀察值範圍，用來檢定預期值。"
			},
			expectedRange: {
				name: "預期範圍",
				detail: "必須。 這是資料範圍，其內容為各欄總和乘各列總和後的值，再除以全部值總和的比率。"
			}
		}
	},
	CONFIDENCE: {
		description: "使用常態分配，傳回母體平均數的信賴區間。",
		abstract: "使用常態分配，傳回母體平均數的信賴區間。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/confidence-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "必須。 用以推算信賴等級的顯著水準。 信賴等級等於 100*(1 - alpha)%，換言之，0.05 的 alpha 值所指的是百分之 95 的信賴等級。"
			},
			standardDev: {
				name: "總體標準差",
				detail: "必須。 這是資料範圍的母體標準差，且假定為已知。"
			},
			size: {
				name: "樣本大小",
				detail: "必須。 這是樣本大小。"
			}
		}
	},
	COVAR: {
		description: "回傳協方差，即兩組資料中每個資料點對偏差乘積的平均值。",
		abstract: "回傳協方差，即兩組資料中每個資料點對偏差乘積的平均值。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/covar-function"
		}],
		functionParameter: {
			array1: {
				name: "陣列1",
				detail: "必須。 第一個整數的儲存格範圍。"
			},
			array2: {
				name: "陣列2",
				detail: "必須。 第二個整數的儲存格範圍。"
			}
		}
	},
	CRITBINOM: {
		description: "傳回累加二項分配函數大於或等於臨界值的最小數值。 此函數可用於品質保證應用程式中。 例如，使用 CRITBINOM 來決定我們在無需放棄整批產品的條件下，允許生產線上生產瑕疵品的最大數目。",
		abstract: "傳回累加二項分配函數大於或等於臨界值的最小數值。 此函數可用於品質保證應用程式中。 例如，使用 CRITBINOM 來決定我們在無需放棄整批產品的條件下，允許生產線上生產瑕疵品的最大數目。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/critbinom-function"
		}],
		functionParameter: {
			trials: {
				name: "實驗次數",
				detail: "必須。 為二項分配之測試個數。"
			},
			probabilityS: {
				name: "成功機率",
				detail: "必須。 每一次實驗的成功機率。"
			},
			alpha: {
				name: "目標機率",
				detail: "必須。 這是臨界值。"
			}
		}
	},
	EXPONDIST: {
		description: "傳回指數分配函數。 使用 EXPONDIST 來建立兩事件間的時間模式，例如銀行自動櫃員機在提款時所花費的時間。 例如，您可以使用 EXPONDIST 來判定該程序最多花一分鐘的機率。",
		abstract: "傳回指數分配函數。 使用 EXPONDIST 來建立兩事件間的時間模式，例如銀行自動櫃員機在提款時所花費的時間。 例如，您可以使用 EXPONDIST 來判定該程序最多花一分鐘的機率。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/expondist-function"
		}],
		functionParameter: {
			x: {
				name: "值",
				detail: "需要 X 。 這是函數的值。"
			},
			lambda: {
				name: "lambda",
				detail: "必須。 這是參數值。"
			},
			cumulative: {
				name: "累積",
				detail: "必須。 這是指出要提供何種指數函數形式的邏輯值。 如果 cumulative 為 TRUE，則 EXPONDIST 會傳回累加分配函數；如果為 FALSE，則會傳回機率密度函數。"
			}
		}
	},
	FDIST: {
		description: "會傳回兩組資料的 (右尾) F 機率分配 (散佈程度)。 您也可以使用此函數來判定兩組資料的散佈程度是否不同。 例如，您可以檢查男生和女生的高中入學考試成績，以判斷女生成績的變異性是否與男生不同。",
		abstract: "會傳回兩組資料的 (右尾) F 機率分配 (散佈程度)。 您也可以使用此函數來判定兩組資料的散佈程度是否不同。 例如，您可以檢查男生和女生的高中入學考試成績，以判斷女生成績的變異性是否與男生不同。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/fdist-function"
		}],
		functionParameter: {
			x: {
				name: "值",
				detail: "需要 X 。 這是用於評估函數的值。"
			},
			degFreedom1: {
				name: "分子自由度",
				detail: "必須。 這是分子的自由度。"
			},
			degFreedom2: {
				name: "分母自由度",
				detail: "必須。 這是分母的自由度。"
			}
		}
	},
	FINV: {
		description: "傳回 (右尾) F 機率分配的反函數值。 如果 p = FDIST(x,...)，則 FINV(p,...) = x。",
		abstract: "傳回 (右尾) F 機率分配的反函數值。 如果 p = FDIST(x,...)，則 FINV(p,...) = x。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/finv-function"
		}],
		functionParameter: {
			probability: {
				name: "機率",
				detail: "必須。 這是與 F 累加分配相關的機率。"
			},
			degFreedom1: {
				name: "分子自由度",
				detail: "必須。 這是分子的自由度。"
			},
			degFreedom2: {
				name: "分母自由度",
				detail: "必須。 這是分母的自由度。"
			}
		}
	},
	FTEST: {
		description: "傳回 F 檢定的結果。 F 檢定會傳回 array1 及 array2 中變異數沒有顯著差異的雙尾機率值。 使用此函數來判斷兩個樣本是否有不同的變異數。 例如，對特定的公私立學校的測驗成績，您可以測試這些學校的測試成績是否具有不同的變異程度。",
		abstract: "傳回 F 檢定的結果。 F 檢定會傳回 array1 及 array2 中變異數沒有顯著差異的雙尾機率值。 使用此函數來判斷兩個樣本是否有不同的變異數。 例如，對特定的公私立學校的測驗成績，您可以測試這些學校的測試成績是否具有不同的變異程度。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/ftest-function"
		}],
		functionParameter: {
			array1: {
				name: "陣列1",
				detail: "必須。 這是第一個陣列或資料範圍。"
			},
			array2: {
				name: "陣列2",
				detail: "必須。 這是第二個陣列或資料範圍。"
			}
		}
	},
	GAMMADIST: {
		description: "傳回伽瑪分配。 您可使用此函數來研究可能有偏態分配的變數。 伽瑪分配通常用於佇列分析。",
		abstract: "傳回伽瑪分配。 您可使用此函數來研究可能有偏態分配的變數。 伽瑪分配通常用於佇列分析。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/gammadist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "需要 X 。 這是用來評估分配的值。"
			},
			alpha: {
				name: "alpha",
				detail: "必須。 這是分配的參數。"
			},
			beta: {
				name: "beta",
				detail: "必須。 這是分配的參數。 若 beta = 1，則 GAMMADIST 會傳回標準的伽瑪分配。"
			},
			cumulative: {
				name: "累積",
				detail: "必須。 這是決定函數形式的邏輯值。 如果 cumulative 為 TRUE，GAMMADIST 會傳回累加分配函數；如果為 FALSE，則會傳回機率密度函數。"
			}
		}
	},
	GAMMAINV: {
		description: "傳回伽瑪累加分配的反函數值。 如果 p = GAMMADIST(x,...)，則 GAMMAINV(p,...) = x。 您可以使用此函數來研究可能是偏態分配的變數。",
		abstract: "傳回伽瑪累加分配的反函數值。 如果 p = GAMMADIST(x,...)，則 GAMMAINV(p,...) = x。 您可以使用此函數來研究可能是偏態分配的變數。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/gammainv-function"
		}],
		functionParameter: {
			probability: {
				name: "機率",
				detail: "必須。 這是與伽瑪分配關聯的機率。"
			},
			alpha: {
				name: "alpha",
				detail: "必須。 這是分配的參數。"
			},
			beta: {
				name: "beta",
				detail: "必須。 這是分配的參數。 若 beta = 1，則 GAMMAINV 會傳回標準的伽瑪分配。"
			}
		}
	},
	HYPGEOMDIST: {
		description: "傳回超幾何分配。 HYPGEOMDIST 會傳回指定之樣本成功個數、樣本大小、母體成功個數及母體大小等的機率。 HYPGEOMDIST 可用以解決有限母體的問題，例如每次觀察成功或失敗，和每一個有同樣大小的子集合發生機會均等時適用。",
		abstract: "傳回超幾何分配。 HYPGEOMDIST 會傳回指定之樣本成功個數、樣本大小、母體成功個數及母體大小等的機率。 HYPGEOMDIST 可用以解決有限母體的問題，例如每次觀察成功或失敗，和每一個有同樣大小的子集合發生機會均等時適用。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/hypgeomdist-function"
		}],
		functionParameter: {
			sampleS: {
				name: "樣本成功次數",
				detail: "必須。 這是樣本中的成功個數。"
			},
			numberSample: {
				name: "樣本大小",
				detail: "必須。 這是樣本的大小。"
			},
			populationS: {
				name: "總體成功次數",
				detail: "必須。 這是母體中的成功個數。"
			},
			numberPop: {
				name: "總體大小",
				detail: "必須。 這是母體的大小。"
			}
		}
	},
	LOGINV: {
		description: "傳回 x 的對數常態累加分配函數的反函數，其中 ln(x) 以 mean 和 standard_dev 參數進行常態分配。 如果 p = LOGNORMDIST(x,...)，則 LOGINV(p,...) = x。",
		abstract: "傳回 x 的對數常態累加分配函數的反函數，其中 ln(x) 以 mean 和 standard_dev 參數進行常態分配。 如果 p = LOGNORMDIST(x,...)，則 LOGINV(p,...) = x。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/loginv-function"
		}],
		functionParameter: {
			probability: {
				name: "機率",
				detail: "必須。 這是與對數常態分配相關的機率。"
			},
			mean: {
				name: "平均值",
				detail: "必須。 這是 ln(x) 的平均值。"
			},
			standardDev: {
				name: "標準差",
				detail: "必須。 這是 ln(x) 的標準差。"
			}
		}
	},
	LOGNORMDIST: {
		description: "傳回 x 的累加對數常態分配，其中 ln(x) 以 mean 和 standard_dev 參數進行常態分配。 請使用此函數來分析對數轉換的資料。",
		abstract: "傳回 x 的累加對數常態分配，其中 ln(x) 以 mean 和 standard_dev 參數進行常態分配。 請使用此函數來分析對數轉換的資料。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/lognormdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "需要 X 。 這是用於評估函數的值。"
			},
			mean: {
				name: "平均值",
				detail: "必須。 這是 ln(x) 的平均值。"
			},
			standardDev: {
				name: "標準差",
				detail: "必須。 這是 ln(x) 的標準差。"
			}
		}
	},
	MODE: {
		description: "假設你想知道在關鍵濕地30年期間，鳥類普查樣本中最常見的鳥類數量，或想知道非尖峰時段電話支援中心最常接到的電話數量。 要計算一組數字的模態，請使用 MODE 函數。",
		abstract: "假設你想知道在關鍵濕地30年期間，鳥類普查樣本中最常見的鳥類數量，或想知道非尖峰時段電話支援中心最常接到的電話數量。 要計算一組數字的模態，請使用 MODE 函數。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/mode-function"
		}],
		functionParameter: {
			number1: {
				name: "數值 1",
				detail: "必須。 這是您要計算眾數的第一個數字引數。"
			},
			number2: {
				name: "數值 2",
				detail: "可選的。 這是要計算眾數的第 2 個到第 255 個數字引數。 您也可以使用單一陣列或陣列參照來取代以逗點分隔的引數。"
			}
		}
	},
	NEGBINOMDIST: {
		description: "傳回負二項分配。 當成功常數機率為 probability_s 時，NEGBINOMDIST 會傳回 number_s 成功之前有 number_f 次失敗的機率。 此函數類似於二項分配，不過成功次數是固定的，而試驗的次數是變動的。 如同二項分配，也會假定每次試驗都是獨立的。",
		abstract: "傳回負二項分配。 當成功常數機率為 probability_s 時，NEGBINOMDIST 會傳回 number_s 成功之前有 number_f 次失敗的機率。 此函數類似於二項分配，不過成功次數是固定的，而試驗的次數是變動的。 如同二項分配，也會假定每次試驗都是獨立的。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/negbinomdist-function"
		}],
		functionParameter: {
			numberF: {
				name: "失敗次數",
				detail: "必須。 這是失敗的次數。"
			},
			numberS: {
				name: "成功次數",
				detail: "必須。 這是成功的閥值數目。"
			},
			probabilityS: {
				name: "成功機率",
				detail: "必須。 這是成功的機率。"
			}
		}
	},
	NORMDIST: {
		description: "NORMDIST 函數回傳指定平均值與標準差的常態分布。 此函數在統計學中有廣泛的應用，包括假設檢定。",
		abstract: "NORMDIST 函數回傳指定平均值與標準差的常態分布。 此函數在統計學中有廣泛的應用，包括假設檢定。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/normdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "需要 X 。 你想要分配的價值"
			},
			mean: {
				name: "平均值",
				detail: "必須。 分布的算術平均值"
			},
			standardDev: {
				name: "標準差",
				detail: "必須。 分布的標準差"
			},
			cumulative: {
				name: "累積",
				detail: "必須。 這是決定函數形式的邏輯值。 若累積值為真，NORMDIST 會回傳累積分布函數;若累積為假，則回傳機率質量函數。"
			}
		}
	},
	NORMINV: {
		description: "傳回指定之平均值和標準差的常態累加分配之反函數值。",
		abstract: "傳回指定之平均值和標準差的常態累加分配之反函數值。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/norminv-function"
		}],
		functionParameter: {
			probability: {
				name: "機率",
				detail: "必須。 這是對應到常態分配的機率。"
			},
			mean: {
				name: "平均值",
				detail: "必須。 這是分配的算術平均值。"
			},
			standardDev: {
				name: "標準差",
				detail: "必須。 這是分配的標準差。"
			}
		}
	},
	NORMSDIST: {
		description: "傳回標準常態累加分配函數。 此分配的平均值為 0 (零)，標準差為 1。 使用此函數可代替標準常態曲線區域的表格。",
		abstract: "傳回標準常態累加分配函數。 此分配的平均值為 0 (零)，標準差為 1。 使用此函數可代替標準常態曲線區域的表格。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/normsdist-function"
		}],
		functionParameter: { z: {
			name: "z",
			detail: "Z 必須。 這是您要找出分配的數值。"
		} }
	},
	NORMSINV: {
		description: "傳回標準常態累加分配的反函數值。 此分配的平均值為 0，標準差為 1。",
		abstract: "傳回標準常態累加分配的反函數值。 此分配的平均值為 0，標準差為 1。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/normsinv-function"
		}],
		functionParameter: { probability: {
			name: "機率",
			detail: "必須。 這是對應到常態分配的機率。"
		} }
	},
	PERCENTILE: {
		description: "傳回範圍中第 K 個百分位數的值。 您可以使用這個函數來建立可接受的臨界值。 例如，只接受分數在百分之九十以上的候選者。",
		abstract: "傳回範圍中第 K 個百分位數的值。 您可以使用這個函數來建立可接受的臨界值。 例如，只接受分數在百分之九十以上的候選者。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/percentile-function"
		}],
		functionParameter: {
			array: {
				name: "陣列",
				detail: "必須。 用以定義相對位置的陣列或資料範圍。"
			},
			k: {
				name: "k",
				detail: "必須 。 在 0 到 1 範圍內 (包括 0 與 1) 的百分位數。"
			}
		}
	},
	PERCENTRANK: {
		description: "PERCENTRANK 函數回傳資料集中某個值的排名，作為該數值在整個資料集中的百分比——本質上，就是該值在整個資料集中中的相對地位。 例如，你可以使用 PERCENTRANK 來判斷個人在所有測驗分數欄位中的排名。",
		abstract: "PERCENTRANK 函數回傳資料集中某個值的排名，作為該數值在整個資料集中的百分比——本質上，就是該值在整個資料集中中的相對地位。 例如，你可以使用 PERCENTRANK 來判斷個人在所有測驗分數欄位中的排名。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/percentrank-function"
		}],
		functionParameter: {
			array: {
				name: "陣列",
				detail: "必須。 資料範圍 (或預先定義的陣列) 數值，百分比排名就在其中決定。"
			},
			x: {
				name: "x",
				detail: "需要 X 。 你想知道陣列中排名的值。"
			},
			significance: {
				name: "有效位數",
				detail: "可選的。 用以識別傳回百分比值的最高有效位數之數值。 如果省略，PERCENTRANK 會使用三位小數 (0.xxx)。"
			}
		}
	},
	POISSON: {
		description: "傳回波式分配。 波氏分配的一般應用，在於預測特定時間內事件發生的次數，例如，一分鐘內經過收費站的汽車數。",
		abstract: "傳回波式分配。 波氏分配的一般應用，在於預測特定時間內事件發生的次數，例如，一分鐘內經過收費站的汽車數。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/poisson-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "需要 X 。 這是事件的數目。"
			},
			mean: {
				name: "平均值",
				detail: "必須。 這是期望值。"
			},
			cumulative: {
				name: "累積",
				detail: "必須。 這是邏輯值，用來決定機率分配所傳回的形式。 如果 cumulative 為 TRUE，POISSON 則會隨機事件發生次數在 0 到 x 次 (含) 之間的累加波氏機率；如果為 FALSE，則會傳回事件的數目正好是 x 的波氏機率密度函數。"
			}
		}
	},
	QUARTILE: {
		description: "傳回資料集的四分位數。 四分位數通常用於銷售和市場調查資料中，將母體分成不同的群組。 例如，您可以使用 QUARTILE 來找出母體中前 25% 的收入。",
		abstract: "傳回資料集的四分位數。 四分位數通常用於銷售和市場調查資料中，將母體分成不同的群組。 例如，您可以使用 QUARTILE 來找出母體中前 25% 的收入。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/quartile-function"
		}],
		functionParameter: {
			array: {
				name: "陣列",
				detail: "必須。 這是要找出四分位數之數值的陣列或儲存格範圍。"
			},
			quart: {
				name: "四分位值",
				detail: "必須。 指出要傳回的數值。"
			}
		}
	},
	RANK: {
		description: "傳回數字在一數列中的排名。 數字的排名是它相對於列表中其他值的大小。 (如果你要排序這個清單，該數字的排名就是它的位置。)",
		abstract: "傳回數字在一數列中的排名。 數字的排名是它相對於列表中其他值的大小。 (如果你要排序這個清單，該數字的排名就是它的位置。)",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/rank-function"
		}],
		functionParameter: {
			number: {
				name: "數值",
				detail: "必須。 這是要找出其排名的數字。"
			},
			ref: {
				name: "數字清單",
				detail: "必須。 指的是一串數字。 會忽略 ref 中的非數值。"
			},
			order: {
				name: "排列方式",
				detail: "可選的。 這是指定排列數值方式的數字。 如果 order 為 0 (零) 或被省略，則 Microsoft Excel 把 ref 當成以遞減順序排序的數列來為 number 排名。 如果 order 不是 0，則 Microsoft Excel 會將 ref 當成以遞增順序排序的數列來來為 number 排名。"
			}
		}
	},
	STDEV: {
		description: "根據樣本來估算標準差。 標準差是用來衡量值與平均值 (平均數) 之間的離散程度。",
		abstract: "根據樣本來估算標準差。 標準差是用來衡量值與平均值 (平均數) 之間的離散程度。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/stdev-function"
		}],
		functionParameter: {
			number1: {
				name: "數值 1",
				detail: "必須。 這是對應至母體樣本的第一個數字引數。"
			},
			number2: {
				name: "數值 2",
				detail: "可選的。 這是對應至母體樣本的第 2 個到第 255 個數字引數。 您也可以使用單一陣列或陣列參照來取代以逗點分隔的引數。"
			}
		}
	},
	STDEVP: {
		description: "根據指定為引數的整個母體來計算標準差。 標準差是用來衡量值與平均值 (平均數) 之間的離散程度。",
		abstract: "根據指定為引數的整個母體來計算標準差。 標準差是用來衡量值與平均值 (平均數) 之間的離散程度。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/stdevp-function"
		}],
		functionParameter: {
			number1: {
				name: "數值 1",
				detail: "必須。 這是對應至母體的第一個數字引數。"
			},
			number2: {
				name: "數值 2",
				detail: "可選的。 這是對應至母體的第 2 個到第 255 個數字引數。 您也可以使用單一陣列或陣列參照來取代以逗點分隔的引數。"
			}
		}
	},
	TDIST: {
		description: "傳回 Student T 分配的「百分比點」(機率)，其中數值 (x) 為 T 的計算結果值，該值是以「百分比點」來計算。 T 分配用於小樣本資料集的假設檢定。 使用此函數可取代 T 分配的臨界值表格。",
		abstract: "傳回 Student T 分配的「百分比點」(機率)，其中數值 (x) 為 T 的計算結果值，該值是以「百分比點」來計算。 T 分配用於小樣本資料集的假設檢定。 使用此函數可取代 T 分配的臨界值表格。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/tdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "需要 X 。 這是要評估分配的數值。"
			},
			degFreedom: {
				name: "自由度",
				detail: "必須。 這是指出自由度的整數值。"
			},
			tails: {
				name: "尾部特性",
				detail: "必須。 這是指定要傳回之分配尾數。 如果 Tails = 1，TDIST 會傳回單尾分配。 如果 Tails = 2，TDIST 會傳回雙尾分配。"
			}
		}
	},
	TINV: {
		description: "傳回 Student t 分配的雙尾反函數。",
		abstract: "傳回 Student t 分配的雙尾反函數。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/tinv-function"
		}],
		functionParameter: {
			probability: {
				name: "機率",
				detail: "必須。 這是與雙尾 Student t 分配相關的機率。"
			},
			degFreedom: {
				name: "自由度",
				detail: "必須。 這是用來說明分配特性的自由度。"
			}
		}
	},
	TTEST: {
		description: "傳回與 Student 氏 T 檢定相關的機率。 使用 TTEST 可以判斷兩個樣本是否可能來自平均值相同的兩個相同基礎母體。",
		abstract: "傳回與 Student 氏 T 檢定相關的機率。 使用 TTEST 可以判斷兩個樣本是否可能來自平均值相同的兩個相同基礎母體。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/ttest-function"
		}],
		functionParameter: {
			array1: {
				name: "陣列1",
				detail: "必須。 這是第一個資料集。"
			},
			array2: {
				name: "陣列2",
				detail: "必須。 這是第二個資料集。"
			},
			tails: {
				name: "尾部特性",
				detail: "必須。 指定分配的尾數。 如果 tails = 1，TTEST 會使用單尾分配。 如果 tails = 2，TTEST 會使用雙尾分配。"
			},
			type: {
				name: "檢定類型",
				detail: "必須。 這是要執行的 t 檢定種類。"
			}
		}
	},
	VAR: {
		description: "根據樣本來估計變異數。",
		abstract: "根據樣本來估計變異數。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/var-function"
		}],
		functionParameter: {
			number1: {
				name: "數值 1",
				detail: "必須。 這是對應至母體樣本的第一個數字引數。"
			},
			number2: {
				name: "數值 2",
				detail: "可選的。 這是對應至母體樣本的第 2 個到第 255 個數字引數。"
			}
		}
	},
	VARP: {
		description: "根據整個母體來計算變異數。",
		abstract: "根據整個母體來計算變異數。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/varp-function"
		}],
		functionParameter: {
			number1: {
				name: "數值 1",
				detail: "必須。 這是對應至母體的第一個數字引數。"
			},
			number2: {
				name: "數值 2",
				detail: "可選的。 這是對應至母體的第 2 個到第 254 個數字引數。"
			}
		}
	},
	WEIBULL: {
		description: "傳回 Weibull 分配。 您可以使用此分配進行信賴度分析，例如，用以計算設備損壞的平均時間。",
		abstract: "傳回 Weibull 分配。 您可以使用此分配進行信賴度分析，例如，用以計算設備損壞的平均時間。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/weibull-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "需要 X 。 這是用於評估函數的值。"
			},
			alpha: {
				name: "alpha",
				detail: "必須。 這是分配的參數。"
			},
			beta: {
				name: "beta",
				detail: "必須。 這是分配的參數。"
			},
			cumulative: {
				name: "累積",
				detail: "必須。 決定此函數的形式。"
			}
		}
	},
	ZTEST: {
		description: "傳回 Z 檢定的單尾機率值。 對於特定的假設母體平均值 μ0，ZTEST 會傳回樣本平均值可能大於資料集 (陣列) 之觀察平均值 (也就是觀察的樣本平均值) 的機率。",
		abstract: "傳回 Z 檢定的單尾機率值。 對於特定的假設母體平均值 μ0，ZTEST 會傳回樣本平均值可能大於資料集 (陣列) 之觀察平均值 (也就是觀察的樣本平均值) 的機率。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/ztest-function"
		}],
		functionParameter: {
			array: {
				name: "陣列",
				detail: "必須。 這是用來檢定 x 的陣列或資料範圍。"
			},
			x: {
				name: "x",
				detail: "需要 X 。 這是要檢定的值。"
			},
			sigma: {
				name: "標準差",
				detail: "可選的。 這是母體 (已知) 的標準差。 如果省略，會使用樣本標準差。"
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/cube/zh-TW.ts
const locale$12 = {
	CUBEKPIMEMBER: {
		description: "傳回關鍵效能指標 (KPI) 屬性，並在儲存格中顯示 KPI 名稱。 KPI 是一個可量化的度量，例如用來監控組織績效的每月毛利或每季員工流動率。",
		abstract: "傳回關鍵效能指標 (KPI) 屬性，並在儲存格中顯示 KPI 名稱。 KPI 是一個可量化的度量，例如用來監控組織績效的每月毛利或每季員工流動率。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/cubekpimember-function"
		}],
		functionParameter: {
			connection: {
				name: "連結",
				detail: "必須。 連線到 Cube 之連線名稱的文字字串。"
			},
			kpiName: {
				name: "Kpi_name",
				detail: "必須。 Cube 中 KPI 名稱的文字字串。"
			},
			kpiProperty: {
				name: "Kpi_property",
				detail: "必須。 傳回的 KPI 元件，可以為下列其中一項："
			},
			caption: {
				name: "說明",
				detail: "可選的。 取代 kpi_name 及 kpi_property 而顯示在儲存格中的文字字串。"
			}
		}
	},
	CUBEMEMBER: {
		description: "傳回 Cube 中的成員或 Tuple。 用來驗證 Cube 中有成員或 Tuple 存在。",
		abstract: "傳回 Cube 中的成員或 Tuple。 用來驗證 Cube 中有成員或 Tuple 存在。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/cubemember-function"
		}],
		functionParameter: {
			connection: {
				name: "連結",
				detail: "必須。 連線到 Cube 之連線名稱的文字字串。"
			},
			memberExpression: {
				name: "Member_expression",
				detail: "必須。 多維度運算式 (MDX) 的文字字串，會估算出 Cube 中的唯一成員。 member_expression 也可以是指定為儲存格範圍或常數陣列的 Tuple。"
			},
			caption: {
				name: "說明",
				detail: "可選的。 取代 Cube 中的標題 (如果已定義) 而顯示在儲存格中的文字字串。 當傳回 Tuple 時，所使用的標題是 Tuple 中最後一個成員的標題。"
			}
		}
	},
	CUBEMEMBERPROPERTY: {
		description: "CUBEMEMBERPROPERTY 函式是 Excel 中的 立方體函式 之一，會從立方體回傳成員屬性的值。 使用它來驗證成員名稱是否存在於該立方體內，並傳回此成員的指定屬性。",
		abstract: "CUBEMEMBERPROPERTY 函式是 Excel 中的 立方體函式 之一，會從立方體回傳成員屬性的值。 使用它來驗證成員名稱是否存在於該立方體內，並傳回此成員的指定屬性。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/cubememberproperty-function"
		}],
		functionParameter: {
			connection: {
				name: "連結",
				detail: "必須。 連線到 Cube 之連線名稱的文字字串。"
			},
			memberExpression: {
				name: "Member_expression",
				detail: "必須。 Cube 內成員的多維度運算式 (MDX) 文字字串。"
			},
			property: {
				name: "財產",
				detail: "必須。 傳回之屬性名稱的文字字串，或包含屬性名稱之儲存格的參照。"
			}
		}
	},
	CUBERANKEDMEMBER: {
		description: "傳回一個集合中的第 N 個或已排序的成員。 用來傳回集合中的一個或多個元素，例如最頂尖的銷售人員或前 10 名的學生。",
		abstract: "傳回一個集合中的第 N 個或已排序的成員。 用來傳回集合中的一個或多個元素，例如最頂尖的銷售人員或前 10 名的學生。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/cuberankedmember-function"
		}],
		functionParameter: {
			connection: {
				name: "連結",
				detail: "必須。 連線到 Cube 之連線名稱的文字字串。"
			},
			setExpression: {
				name: "Set_expression",
				detail: "必須。 這是一組運算式的文字字串，如 \"{[Item1].兒童}\"。 Set_expression 也可以是 CUBESET 函數，或包含 CUBESET 函數之儲存格的參照。"
			},
			rank: {
				name: "軍階",
				detail: "必須。 這是指定要傳回之頂端數值的整數值。 如果 rank 值是 1，會傳回頂端值；如果 rank 值是 2，則會傳回第二位頂端數值，依此類推。 若要傳回頂端的 5 個數值，請使用 CUBERANKEDMEMBER 五次，每次指定從 1 到 5 的不同排名。"
			},
			caption: {
				name: "說明",
				detail: "可選的。 取代 Cube 中的標題 (如果已定義) 而顯示在儲存格中的文字字串。"
			}
		}
	},
	CUBESET: {
		description: "將集合運算式傳送至伺服器上的 Cube，藉以定義成員或 Tuple 的已計算集合，從而建立集合，然後將該集合傳回給 Microsoft Excel。",
		abstract: "將集合運算式傳送至伺服器上的 Cube，藉以定義成員或 Tuple 的已計算集合，從而建立集合，然後將該集合傳回給 Microsoft Excel。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/cubeset-function"
		}],
		functionParameter: {
			connection: {
				name: "連結",
				detail: "必須。 連線到 Cube 之連線名稱的文字字串。"
			},
			setExpression: {
				name: "Set_expression",
				detail: "必須。 會產生一組成員或 Tuple 之集合運算式的文字字串。 Set_expression 也可以是包含該集合中一個或多個成員、Tuple 或集合之 Excel 範圍的儲存格參照。"
			},
			caption: {
				name: "說明",
				detail: "可選的。 取代 Cube 中的標題 (如果已定義) 而顯示在儲存格中的文字字串。"
			},
			sortOrder: {
				name: "Sort_order",
				detail: "可選的。 要執行的排序類型 (如果有的話)，並且可以為下列其中一項："
			},
			sortBy: {
				name: "Sort_by",
				detail: "可選的。 排序依據之值的文字字串。 例如，若要計算出銷售量最高的縣市，set_expression 應為一組縣市，而 sort_by 則應為銷售量值。 或者，若要計算出人口最多的縣市，set_expression 應為一組縣市，而 sort_by 則應為人口量值。 如果 sort_order 需要 sort_by，而已省略 sort_by，則 CUBESET 會傳回 #VALUE! 錯誤訊息。"
			}
		}
	},
	CUBESETCOUNT: {
		description: "傳回集合中的項目數。",
		abstract: "傳回集合中的項目數。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/cubesetcount-function"
		}],
		functionParameter: { set: {
			name: "場景",
			detail: "必須。 這是 Microsoft Excel 運算式的文字字串，會估算出 CUBESET 函數所定義的集合。 Set 也可以是 CUBESET 函數，或包含 CUBESET 函數之儲存格的參照。"
		} }
	},
	CUBEVALUE: {
		description: "會從 Cube 傳回彙總值。",
		abstract: "會從 Cube 傳回彙總值。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/cubevalue-function"
		}],
		functionParameter: {
			connection: {
				name: "連結",
				detail: "必須。 連線到 Cube 之連線名稱的文字字串。"
			},
			memberExpression: {
				name: "Member_expression",
				detail: "可選的。 多維度運算式 (MDX) 的文字字串，會估算出 Cube 中的成員或 Tuple。 member_expression 也可以是以 CUBESET 函數定義的集合。 使用 member_expression 做為交叉分析篩選器以定義會傳回其彙總值之 Cube 的一部分。 如果沒有在 member_expression 中指定量值，則會使用該 Cube 的預設量值。"
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/database/zh-TW.ts
const locale$11 = {
	DAVERAGE: {
		description: "計算出清單或資料庫的記錄欄位 (欄) 中，符合您所指定條件的平均數值。",
		abstract: "計算出清單或資料庫的記錄欄位 (欄) 中，符合您所指定條件的平均數值。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/daverage-function"
		}],
		functionParameter: {
			database: {
				name: "資料庫",
				detail: "是指組成清單或資料庫的儲存格範圍。 資料庫是相關資料的清單，其中相關資訊列為記錄，資料欄則為欄位。 清單的第一列會包含每一個資料欄的標籤。"
			},
			field: {
				name: "欄位",
				detail: "表示函式中使用的欄位。 輸入以雙引號括住的欄標籤，如 \"樹齡\" 或 \"收益\"，或是代表欄在清單中所在位置的號碼 (無雙引號)，如 1 代表第一欄，2 代表第二欄，依此類推。"
			},
			criteria: {
				name: "條件",
				detail: "是包含你指定條件的儲存格範圍。 您可以使用任何的範圍做為準則引數，但範圍之中至少需含有一個欄標籤，而欄標籤之下至少需有一個儲存格，以指定該欄的準則。"
			}
		}
	},
	DCOUNT: {
		description: "計算清單或資料庫的記錄欄位 (欄) 中，符合您所指定條件之含有數值的儲存格。",
		abstract: "計算清單或資料庫的記錄欄位 (欄) 中，符合您所指定條件之含有數值的儲存格。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/dcount-function"
		}],
		functionParameter: {
			database: {
				name: "資料庫",
				detail: "必須。 這是組成清單或資料庫的儲存格範圍。 資料庫是相關資料的清單，其中相關資訊列為記錄，資料欄則為欄位。 清單的第一列會包含每一個資料欄的標籤。"
			},
			field: {
				name: "欄位",
				detail: "必須。 指出函數中所使用的資料欄。 輸入以雙引號括住的欄標籤，如 \"樹齡\" 或 \"收益\"，或是代表欄在清單中所在位置的號碼 (無雙引號)，如 1 代表第一欄，2 代表第二欄，依此類推。"
			},
			criteria: {
				name: "條件",
				detail: "必須。 這是含有您指定條件的儲存格範圍。 您可以使用任何的範圍做為準則引數，但引數之中至少需含有一個欄標籤，而欄標籤之下至少需有一個儲存格，以指定該欄的準則。"
			}
		}
	},
	DCOUNTA: {
		description: "計算清單或資料庫的記錄欄位 (欄) 中，符合您所指定條件的非空白儲存格。",
		abstract: "計算清單或資料庫的記錄欄位 (欄) 中，符合您所指定條件的非空白儲存格。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/dcounta-function"
		}],
		functionParameter: {
			database: {
				name: "資料庫",
				detail: "必須。 這是組成清單或資料庫的儲存格範圍。 資料庫是相關資料的清單，其中相關資訊列為記錄，資料欄則為欄位。 清單的第一列會包含每一個資料欄的標籤。"
			},
			field: {
				name: "欄位",
				detail: "可選的。 指出函數中所使用的資料欄。 輸入以雙引號括住的欄標籤，如 \"樹齡\" 或 \"收益\"，或是代表欄在清單中所在位置的號碼 (無雙引號)，如 1 代表第一欄，2 代表第二欄，依此類推。"
			},
			criteria: {
				name: "條件",
				detail: "必須。 這是含有您指定條件的儲存格範圍。 您可以使用任何的範圍做為準則引數，但範圍之中至少需含有一個欄標籤，而欄標籤之下至少需有一個儲存格，以指定該欄的準則。"
			}
		}
	},
	DGET: {
		description: "擷取清單或資料庫中欄內符合指定條件的單一值。",
		abstract: "擷取清單或資料庫中欄內符合指定條件的單一值。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/dget-function"
		}],
		functionParameter: {
			database: {
				name: "資料庫",
				detail: "必須。 這是組成清單或資料庫的儲存格範圍。 資料庫是相關資料的清單，其中相關資訊列為記錄，資料欄則為欄位。 清單的第一列會包含每一個資料欄的標籤。"
			},
			field: {
				name: "欄位",
				detail: "必須。 指出函數中所使用的資料欄。 輸入以雙引號括住的欄標籤，如 \"樹齡\" 或 \"收益\"，或是代表欄在清單中所在位置的號碼 (無雙引號)，如 1 代表第一欄，2 代表第二欄，依此類推。"
			},
			criteria: {
				name: "條件",
				detail: "必須。 這是含有您指定條件的儲存格範圍。 您可以使用任何的範圍做為準則引數，但範圍之中至少需含有一個欄標籤，而欄標籤之下至少需有一個儲存格，以指定該欄的準則。"
			}
		}
	},
	DMAX: {
		description: "傳回清單或資料庫的記錄欄位 (欄) 中，符合您所指定條件的最大值。",
		abstract: "傳回清單或資料庫的記錄欄位 (欄) 中，符合您所指定條件的最大值。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/dmax-function"
		}],
		functionParameter: {
			database: {
				name: "資料庫",
				detail: "必須。 這是組成清單或資料庫的儲存格範圍。 資料庫是相關資料的清單，其中相關資訊列為記錄，資料欄則為欄位。 清單的第一列會包含每一個資料欄的標籤。"
			},
			field: {
				name: "欄位",
				detail: "必須。 指出函數中所使用的資料欄。 輸入以雙引號括住的欄標籤，如 \"樹齡\" 或 \"收益\"，或是代表欄在清單中所在位置的號碼 (無雙引號)，如 1 代表第一欄，2 代表第二欄，依此類推。"
			},
			criteria: {
				name: "條件",
				detail: "必須。 這是含有您指定條件的儲存格範圍。 您可以使用任何的範圍做為準則引數，但範圍之中至少需含有一個欄標籤，而欄標籤之下至少需有一個儲存格，以指定該欄的準則。"
			}
		}
	},
	DMIN: {
		description: "傳回清單或資料庫的記錄欄位 (欄) 中，符合您所指定條件的最小值。",
		abstract: "傳回清單或資料庫的記錄欄位 (欄) 中，符合您所指定條件的最小值。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/dmin-function"
		}],
		functionParameter: {
			database: {
				name: "資料庫",
				detail: "必須。 這是組成清單或資料庫的儲存格範圍。 資料庫是相關資料的清單，其中相關資訊列為記錄，資料欄則為欄位。 清單的第一列會包含每一個資料欄的標籤。"
			},
			field: {
				name: "欄位",
				detail: "必須。 指出函數中所使用的資料欄。 輸入以雙引號括住的欄標籤，如 \"樹齡\" 或 \"收益\"，或是代表欄在清單中所在位置的號碼 (無雙引號)，如 1 代表第一欄，2 代表第二欄，依此類推。"
			},
			criteria: {
				name: "條件",
				detail: "必須。 這是含有您指定條件的儲存格範圍。 您可以使用任何的範圍做為準則引數，但範圍之中至少需含有一個欄標籤，而欄標籤之下至少需有一個儲存格，以指定該欄的準則。"
			}
		}
	},
	DPRODUCT: {
		description: "將清單或資料庫的記錄欄位 (欄) 中，符合您所指定條件的值相乘。",
		abstract: "將清單或資料庫的記錄欄位 (欄) 中，符合您所指定條件的值相乘。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/dproduct-function"
		}],
		functionParameter: {
			database: {
				name: "資料庫",
				detail: "必須。 這是組成清單或資料庫的儲存格範圍。 資料庫是相關資料的清單，其中相關資訊列為記錄，資料欄則為欄位。 清單的第一列會包含每一個資料欄的標籤。"
			},
			field: {
				name: "欄位",
				detail: "必須。 指出函數中所使用的資料欄。 輸入以雙引號括住的欄標籤，如 \"樹齡\" 或 \"收益\"，或是代表欄在清單中所在位置的號碼 (無雙引號)，如 1 代表第一欄，2 代表第二欄，依此類推。"
			},
			criteria: {
				name: "條件",
				detail: "必須。 這是含有您指定條件的儲存格範圍。 您可以使用任何的範圍做為準則引數，但範圍之中至少需含有一個欄標籤，而欄標籤之下至少需有一個儲存格，以指定該欄的準則。"
			}
		}
	},
	DSTDEV: {
		description: "使用清單或資料庫的記錄欄位 (欄) 中符合指定條件的數字，根據範例估算母體的標準差。",
		abstract: "使用清單或資料庫的記錄欄位 (欄) 中符合指定條件的數字，根據範例估算母體的標準差。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/dstdev-function"
		}],
		functionParameter: {
			database: {
				name: "資料庫",
				detail: "必須。 這是組成清單或資料庫的儲存格範圍。 資料庫是相關資料的清單，其中相關資訊列為記錄，資料欄則為欄位。 清單的第一列會包含每一個資料欄的標籤。"
			},
			field: {
				name: "欄位",
				detail: "必須。 指出函數中所使用的資料欄。 輸入以雙引號括住的欄標籤，如 \"樹齡\" 或 \"收益\"，或是代表欄在清單中所在位置的號碼 (無雙引號)，如 1 代表第一欄，2 代表第二欄，依此類推。"
			},
			criteria: {
				name: "條件",
				detail: "必須。 這是含有您指定條件的儲存格範圍。 您可以使用任何的範圍做為準則引數，但範圍之中至少需含有一個欄標籤，而欄標籤之下至少需有一個儲存格，以指定該欄的準則。"
			}
		}
	},
	DSTDEVP: {
		description: "使用清單或資料庫的記錄欄位 (欄) 中符合指定條件的數字，根據整個母體來計算母體的標準差。",
		abstract: "使用清單或資料庫的記錄欄位 (欄) 中符合指定條件的數字，根據整個母體來計算母體的標準差。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/dstdevp-function"
		}],
		functionParameter: {
			database: {
				name: "資料庫",
				detail: "必須。 這是組成清單或資料庫的儲存格範圍。 資料庫是相關資料的清單，其中相關資訊列為記錄，資料欄則為欄位。 清單的第一列會包含每一個資料欄的標籤。"
			},
			field: {
				name: "欄位",
				detail: "必須。 指出函數中所使用的資料欄。 輸入以雙引號括住的欄標籤，如 \"樹齡\" 或 \"收益\"，或是代表欄在清單中所在位置的號碼 (無雙引號)，如 1 代表第一欄，2 代表第二欄，依此類推。"
			},
			criteria: {
				name: "條件",
				detail: "必須。 這是含有您指定條件的儲存格範圍。 您可以使用任何的範圍做為準則引數，但範圍之中至少需含有一個欄標籤，而欄標籤之下至少需有一個儲存格，以指定該欄的準則。"
			}
		}
	},
	DSUM: {
		description: "在清單或資料庫中，DSUM 提供欄位 (欄位) 符合你指定條件的紀錄數字總和。",
		abstract: "在清單或資料庫中，DSUM 提供欄位 (欄位) 符合你指定條件的紀錄數字總和。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/dsum-function"
		}],
		functionParameter: {
			database: {
				name: "資料庫",
				detail: "必須。 這是組成清單或資料庫的儲存格範圍。 資料庫是一個相關資料的清單，其中相關資訊的列是 記錄 ，資料的欄位是 欄位 。 清單的第一列包含該列的標籤。"
			},
			field: {
				name: "欄位",
				detail: "必須。 這會指定函數中使用哪一欄。 例如，請指定雙引號包圍的欄位標籤，例如「年齡」或「讓出」。 或者，你也可以指定一個不加引號的 (，) 代表該欄在列表中的位置：例如，第一欄用 1 ，第二列用 2 ，依此類推。"
			},
			criteria: {
				name: "條件",
				detail: "必須。 這是包含你指定條件的儲存格範圍。 您可以使用任何的範圍做為準則引數，但範圍之中至少需含有一個欄標籤，而欄標籤之下至少需有一個儲存格，以指定該欄的準則。"
			}
		}
	},
	DVAR: {
		description: "使用清單或資料庫的記錄欄位 (欄) 中符合指定條件的數字，根據範例估算母體的變異數。",
		abstract: "使用清單或資料庫的記錄欄位 (欄) 中符合指定條件的數字，根據範例估算母體的變異數。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/dvar-function"
		}],
		functionParameter: {
			database: {
				name: "資料庫",
				detail: "必須。 這是組成清單或資料庫的儲存格範圍。 資料庫是相關資料的清單，其中相關資訊列為記錄，資料欄則為欄位。 清單的第一列會包含每一個資料欄的標籤。"
			},
			field: {
				name: "欄位",
				detail: "必須。 指出函數中所使用的資料欄。 輸入以雙引號括住的欄標籤，如 \"樹齡\" 或 \"收益\"，或是代表欄在清單中所在位置的號碼 (無雙引號)，如 1 代表第一欄，2 代表第二欄，依此類推。"
			},
			criteria: {
				name: "條件",
				detail: "必須。 這是含有您指定條件的儲存格範圍。 您可以使用任何的範圍做為準則引數，但範圍之中至少需含有一個欄標籤，而欄標籤之下至少需有一個儲存格，以指定該欄的準則。"
			}
		}
	},
	DVARP: {
		description: "使用清單或資料庫的記錄欄位 (欄) 中符合指定條件的數字，根據整個母體計算母體的變異數。",
		abstract: "使用清單或資料庫的記錄欄位 (欄) 中符合指定條件的數字，根據整個母體計算母體的變異數。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/dvarp-function"
		}],
		functionParameter: {
			database: {
				name: "資料庫",
				detail: "必須。 這是組成清單或資料庫的儲存格範圍。 資料庫是相關資料的清單，其中相關資訊列為記錄，資料欄則為欄位。 清單的第一列會包含每一個資料欄的標籤。"
			},
			field: {
				name: "欄位",
				detail: "必須。 指出函數中所使用的資料欄。 輸入以雙引號括住的欄標籤，如 \"樹齡\" 或 \"收益\"，或是代表欄在清單中所在位置的號碼 (無雙引號)，如 1 代表第一欄，2 代表第二欄，依此類推。"
			},
			criteria: {
				name: "條件",
				detail: "必須。 這是含有您指定條件的儲存格範圍。 您可以使用任何的範圍做為準則引數，但範圍之中至少需含有一個欄標籤，而欄標籤之下至少需有一個儲存格，以指定該欄的準則。"
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/date/zh-TW.ts
const locale$10 = {
	DATE: {
		description: "採用三個單獨的值並將它們合併為一個日期。 ",
		abstract: "傳回特定日期的序號",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/date-function"
		}],
		functionParameter: {
			year: {
				name: "年",
				detail: "可以包含 1 到 4 位數字。 Excel 會根據電腦使用的日期系統解釋 year 參數。 預設情況下，Univer 使用 1900 日期系統，這表示第一個日期是 1900 年 1 月 1 日。 "
			},
			month: {
				name: "月",
				detail: "一個正整數或負整數，表示一年中從 1 月至 12 月（一月到十二月）的各個月。 "
			},
			day: {
				name: "日",
				detail: "一個正整數或負整數，表示一月中從 1 日到 31 日的各天。 "
			}
		}
	},
	DATEDIF: {
		description: "計算兩個日期之間的天數、月數或年數。 此函數在用於計算年齡的公式中很有用。 ",
		abstract: "計算兩個日期之間的天數、月數或年數。 此函數在用於計算年齡的公式中很有用。 ",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/datedif-function"
		}],
		functionParameter: {
			startDate: {
				name: "開始日期",
				detail: "代表某一時期的第一個或起始日期的日期。 日期可以以引號內的文字字串輸入，例如「2001/1/30」 () ，序號 (例如36921（代表2001年1月30日），如果你使用1900日期系統) ，也可以作為其他公式或函式的結果，例如DATEVALUE (「2001/1/30」) ) (。"
			},
			endDate: {
				name: "結束日期",
				detail: "代表該時期的最後或結束日期的日期。"
			},
			unit: {
				name: "Unit",
				detail: "您希望回傳的資訊類型，其中： 單位****回傳 「 Y 」「該期間的完整年數。」 M 「該期間內的完整月份數。」 D 「該期間的天數。」 MD：「 start_date和end_date天的差別。 日期中的月和年都會被忽略。 重要： 我們不建議使用「多元醫學博士」這個論點，因為已知有其限制。 請參考下方已知問題章節。」 YM 「start_date月和end_date月的差異。 日期的日期和年份被忽略」「 YD 」start_date日與end_date日的差異。 日期中的年會被忽略。"
			}
		}
	},
	DATEVALUE: {
		description: "將文字格式的日期轉換為序號。 ",
		abstract: "將文字格式的日期轉換為序號",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/datevalue-function"
		}],
		functionParameter: { dateText: {
			name: "日期文字",
			detail: "表示 Excel 日期格式的日期的文字，或對包含表示 Excel 日期格式的日期的文字的儲存格的引用。 例如，「1/30/2008」或「30-Jan-2008」是表示日期的引號內的文字字串。 \n使用 Microsoft Excel for Windows 中的預設日期系統， date_text 參數必須表示 1900 年 1 月 1 日至 9999 年 12 月 31 日的日期。 DATEVALUE 函數回傳 #VALUE！ 如果 date_text 參數的值超出此範圍，則為 error 值。 \n如果省略參數 date_text 中的年份部分，則 DATEVALUE 函數會使用電腦內建時鐘的目前年份。 參數 date_text 中的時間資訊將被忽略。 "
		} }
	},
	DAY: {
		description: "傳回以序列數表示的某日期的天數。天數是介於 1 到 31 之間的整數。 ",
		abstract: "將序號轉換為月份日期",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/day-function"
		}],
		functionParameter: { serialNumber: {
			name: "日期序號",
			detail: "要找的日期。 應使用 DATE 函數輸入日期，或將日期輸入為其他公式或函數的結果。 例如，使用函數 DATE(2008,5,23) 輸入 2008 年 5 月 23 日。 "
		} }
	},
	DAYS: {
		description: "傳回兩個日期之間的天數",
		abstract: "傳回兩個日期之間的天數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/days-function"
		}],
		functionParameter: {
			endDate: {
				name: "結束日期",
				detail: "為欲求其相距天數的兩個日期。"
			},
			startDate: {
				name: "開始日期",
				detail: "為欲求其相距天數的兩個日期。"
			}
		}
	},
	DAYS360: {
		description: "以一年 360 天為基準計算兩個日期間的天數",
		abstract: "以一年 360 天為基準計算兩個日期間的天數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/days360-function"
		}],
		functionParameter: {
			startDate: {
				name: "開始日期",
				detail: "為欲求其相距天數的兩個日期。"
			},
			endDate: {
				name: "結束日期",
				detail: "為欲求其相距天數的兩個日期。"
			},
			method: {
				name: "方法",
				detail: "用來指定是否要使用美制 或歐制之計算方法的邏輯值。"
			}
		}
	},
	EDATE: {
		description: "傳回表示某個日期的序號，該日期與指定日期 (start_date) 相隔（之前或之後）所指示的月份數。 使用函數 EDATE 可以計算與發行日處於一月中同一天的到期日的日期。 ",
		abstract: "傳回用於表示開始日期之前或之後月數的日期的序號",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/edate-function"
		}],
		functionParameter: {
			startDate: {
				name: "開始日期",
				detail: "一個代表開始日期的日期。 應使用 DATE 函數輸入日期，或將日期輸入為其他公式或函數的結果。 例如，使用函數 DATE(2008,5,23) 輸入 2008 年 5 月 23 日。 "
			},
			months: {
				name: "月份數",
				detail: "Start Date 之前或之後的月份數。 Months 為正值將產生未來日期；為負值將產生過去日期。 "
			}
		}
	},
	EOMONTH: {
		description: "傳回指定月數之前或之後的月份的最後一天的序號",
		abstract: "傳回指定月數之前或之後的月份的最後一天的序號",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/eomonth-function"
		}],
		functionParameter: {
			startDate: {
				name: "開始日期",
				detail: "此為代表開始日期的日期。"
			},
			months: {
				name: "月份數",
				detail: "開始日期之前或之後的月份數。"
			}
		}
	},
	EPOCHTODATE: {
		description: "將 Unix Epoch 紀元時間戳記 (以秒、毫秒或微秒為單位) 轉換為世界標準時間 (UTC) 的日期時間格式。",
		abstract: "將 Unix Epoch 紀元時間戳記 (以秒、毫秒或微秒為單位) 轉換為世界標準時間 (UTC) 的日期時間格式。",
		links: [{
			title: "教導",
			url: "https://support.google.com/docs/answer/13193461?hl=zh-Hant"
		}],
		functionParameter: {
			timestamp: {
				name: "時間戳記",
				detail: "EPOCHTODATE(1655908429662,2)"
			},
			unit: {
				name: "時間單位",
				detail: "EPOCHTODATE(1655906710)"
			}
		}
	},
	HOUR: {
		description: "將序號轉換為小時",
		abstract: "將序號轉換為小時",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/hour-function"
		}],
		functionParameter: { serialNumber: {
			name: "日期序號",
			detail: "要找的日期。 應使用 DATE 函數輸入日期，或將日期輸入為其他公式或函數的結果。 例如，使用函數 DATE(2008,5,23) 輸入 2008 年 5 月 23 日。 "
		} }
	},
	ISOWEEKNUM: {
		description: "返回給定日期在全年中的 ISO 週數",
		abstract: "返回給定日期在全年中的 ISO 週數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/isoweeknum-function"
		}],
		functionParameter: { date: {
			name: "日期",
			detail: "用於日期和時間計算的日期時間代碼。"
		} }
	},
	MINUTE: {
		description: "傳回時間值的分鐘數。 分鐘必須以整數指定，範圍從 0 到 59。",
		abstract: "傳回時間值的分鐘數。 分鐘必須以整數指定，範圍從 0 到 59。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/minute-function"
		}],
		functionParameter: { serialNumber: {
			name: "日期序號",
			detail: "必須。 這是包含要尋找之分鐘的時間。 時間可以在引號之內以文字字串輸入 (例如，\"6:45 PM\")，或以小數輸入 (例如 0.78125，表示 6:45 PM)，也能夠以其他公式或函數的結果輸入 (例如，TIMEVALUE(\"6:45 PM\"))。"
		} }
	},
	MONTH: {
		description: "傳回以序號代表的日期月份。 月份數必須以整數指定，範圍從 1 (1 月) 到 12 (12 月)。",
		abstract: "傳回以序號代表的日期月份。 月份數必須以整數指定，範圍從 1 (1 月) 到 12 (12 月)。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/month-function"
		}],
		functionParameter: { serialNumber: {
			name: "日期序號",
			detail: "必須。 這是您要嘗試尋找的月份日期。 日期應該使用 DATE 函數來輸入，或是從其他公式或函數導出。 例如，使用 DATE(2008,5,23) 表示 2008 年 5 月 23 日。 如果 以文字格式輸入日期 ，則可能發生問題。"
		} }
	},
	NETWORKDAYS: {
		description: "傳回 start_date 與 end_date 間的全部工作日數。 工作天不包括週末與任何假日。 使用 NETWORKDAYS，根據某段期間內的工作天數來計算員工累積的酬勞。",
		abstract: "傳回 start_date 與 end_date 間的全部工作日數。 工作天不包括週末與任何假日。 使用 NETWORKDAYS，根據某段期間內的工作天數來計算員工累積的酬勞。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/networkdays-function"
		}],
		functionParameter: {
			startDate: {
				name: "開始日期",
				detail: "必須。 這是代表開始日期的日期。"
			},
			endDate: {
				name: "結束日期",
				detail: "必須。 這是代表結束日期的日期。"
			},
			holidays: {
				name: "假日",
				detail: "可選的。 這是要從工作行事曆中排除之一個或多個日期的選擇性範圍，例如州假日和聯邦假日以及彈性假日。 此清單可以是包含日期的儲存格範圍，或是代表日期之序列值的陣列常數。"
			}
		}
	},
	NETWORKDAYS_INTL: {
		description: "使用參數指出哪幾天和多少天是週末，以傳回兩個日期之間的所有工作日數。 週末和指定為假日的任何日子都不視為工作日。",
		abstract: "使用參數指出哪幾天和多少天是週末，以傳回兩個日期之間的所有工作日數。 週末和指定為假日的任何日子都不視為工作日。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/networkdays-intl-function"
		}],
		functionParameter: {
			startDate: {
				name: "開始日期",
				detail: "代表開始日期的日期。"
			},
			endDate: {
				name: "結束日期",
				detail: "代表結束日期的日期。"
			},
			weekend: {
				name: "週末",
				detail: "是指定何時是週末的數字或字串。"
			},
			holidays: {
				name: "假日",
				detail: "要從工作行事曆中排除之一個或多個日期的選擇性範圍。"
			}
		}
	},
	NOW: {
		description: "傳回目前日期和時間的序列值。 如果在輸入函數之前，儲存格格式為 [通用格式] ，則 Excel 會將儲存格格式變更為符合地區選項的日期與時間格式。 您可以使用功能區上 [常用] 索引標籤 [數值] 群組中的命令來變更儲存格的日期和時間格式。",
		abstract: "傳回目前日期和時間的序列值。 如果在輸入函數之前，儲存格格式為 [通用格式] ，則 Excel 會將儲存格格式變更為符合地區選項的日期與時間格式。 您可以使用功能區上 [常用] 索引標籤 [數值] 群組中的命令來變更儲存格的日期和時間格式。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/now-function"
		}],
		functionParameter: {}
	},
	SECOND: {
		description: "傳回時間值的秒數。 秒是介於 0 (零) 到 59 之間的整數。",
		abstract: "傳回時間值的秒數。 秒是介於 0 (零) 到 59 之間的整數。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/second-function"
		}],
		functionParameter: { serialNumber: {
			name: "日期序號",
			detail: "必須。 這是包含要尋找之秒鐘的時間。 時間可以在引號之內以文字字串輸入 (例如，\"6:45 PM\")，或以小數輸入 (例如 0.78125，表示 6:45 PM)，也能夠以其他公式或函數的結果輸入 (例如，TIMEVALUE(\"6:45 PM\"))。"
		} }
	},
	TIME: {
		description: "傳回特定時間的序號。 ",
		abstract: "傳回特定時間的序號",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/time-function"
		}],
		functionParameter: {
			hour: {
				name: "小時",
				detail: "0（零）到 32767 之間的數字，代表小時。 任何大於 23 的值都會除以 24，餘數將作為小時值。 例如，TIME(27,0,0) = TIME(3,0,0) = .125 或 3:00 AM。 "
			},
			minute: {
				name: "分鐘",
				detail: " 0 到 32767 之間的數字，代表分鐘。 任何大於 59 的值將轉換為小時和分鐘。 例如，TIME(0,750,0) = TIME(12,30,0) = .520833 或 12:30 PM。 "
			},
			second: {
				name: "秒",
				detail: "0 到 32767 之間的數字，代表秒。 任何大於 59 的值將轉換為小時、分鐘和秒。 例如，TIME(0,0,2000) = TIME(0,33,22) = .023148 或 12:33:20 AM。 "
			}
		}
	},
	TIMEVALUE: {
		description: "將文字格式的時間轉換為序號。 ",
		abstract: "將文字格式的時間轉換為序號",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/timevalue-function"
		}],
		functionParameter: { timeText: {
			name: "時間文字",
			detail: "以任何一種時間格式表示的文字字串；例如，\"6:45 PM\" 和 \"18:45\"，引號中的文字字串表示時間。"
		} }
	},
	TO_DATE: {
		description: "將指定數字轉換成日期。",
		abstract: "將指定數字轉換成日期。",
		links: [{
			title: "教導",
			url: "https://support.google.com/docs/answer/3094239?hl=zh-Hant"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "要轉換成日期的引數或儲存格參照。 日期 IF 值 is a number or a reference to a cell containing a numeric value, TO_DATE returns 值 converted to a date, 解讀中… 值 as number of days since 30 December, Negative values are interpreted as days before this date, and fractional values indicate time of day past midnight. IF 值 is not a number or a reference to a cell containing a numeric value, TO_DATE returns 值 without modification."
		} }
	},
	TODAY: {
		description: "傳回今天日期的序號",
		abstract: "傳回今天日期的序號",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/today-function"
		}],
		functionParameter: {}
	},
	WEEKDAY: {
		description: "將序號轉換為星期日期",
		abstract: "將序號轉換為星期日期",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/weekday-function"
		}],
		functionParameter: {
			serialNumber: {
				name: "日期序列值",
				detail: "代表要尋找之該天日期的序列值。"
			},
			returnType: {
				name: "傳回值類型",
				detail: "決定傳回值類型的數字。"
			}
		}
	},
	WEEKNUM: {
		description: "將序號轉換為代表該星期為一年中第幾週的數字",
		abstract: "將序號轉換為代表該星期為一年中第幾週的數字",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/weeknum-function"
		}],
		functionParameter: {
			serialNumber: {
				name: "日期序列值",
				detail: "一週中的日期。"
			},
			returnType: {
				name: "傳回值類型",
				detail: "決定一週從星期幾開始的數字。 預設值為 1。"
			}
		}
	},
	WORKDAY: {
		description: "傳回指定的若干個工作天之前或之後的日期的序號",
		abstract: "傳回指定的若干個工作天之前或之後的日期的序號",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/workday-function"
		}],
		functionParameter: {
			startDate: {
				name: "開始日期",
				detail: "代表開始日期的日期。"
			},
			days: {
				name: "天數",
				detail: "開始日期之前或之後的非週末和非假日的天數。正值代表未來的日期；負值代表過去的日期。"
			},
			holidays: {
				name: "假日",
				detail: "要從工作行事曆中排除之一個或多個日期的選擇性範圍。"
			}
		}
	},
	WORKDAY_INTL: {
		description: "傳回日期在指定的工作日天數之前或之後的序號（使用參數指明週末有幾天並指明是哪幾天）",
		abstract: "返回日期在指定的工作日天數之前或之後的序號（使用參數指明週末有幾天並指明是哪幾天）",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/workday-intl-function"
		}],
		functionParameter: {
			startDate: {
				name: "開始日期",
				detail: "代表開始日期的日期。"
			},
			days: {
				name: "天數",
				detail: "開始日期之前或之後的非週末和非假日的天數。正值代表未來的日期；負值代表過去的日期。"
			},
			weekend: {
				name: "週末",
				detail: "是指定何時是週末的數字或字串。"
			},
			holidays: {
				name: "假日",
				detail: "要從工作行事曆中排除之一個或多個日期的選擇性範圍。"
			}
		}
	},
	YEAR: {
		description: "傳回對應於某個日期的年份。 Year 以 1900 - 9999 之間的整數傳回。 ",
		abstract: "將序號轉換為年",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/year-function"
		}],
		functionParameter: { serialNumber: {
			name: "日期序號",
			detail: "要找的年份的日期。 應使用 DATE 函數輸入日期，或將日期輸入為其他公式或函數的結果。 例如，使用函數 DATE(2008,5,23) 輸入 2008 年 5 月 23 日。 "
		} }
	},
	YEARFRAC: {
		description: "傳回代表 start_date 和 end_date 之間整天天數的年分數",
		abstract: "傳回代表 start_date 和 end_date 之間整天天數的年分數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/yearfrac-function"
		}],
		functionParameter: {
			startDate: {
				name: "開始日期",
				detail: "代表開始日期的日期。"
			},
			endDate: {
				name: "結束日期",
				detail: "代表結束日期的日期。"
			},
			basis: {
				name: "基礎類型",
				detail: "要使用的日計數基礎類型。"
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/engineering/zh-TW.ts
const locale$9 = {
	BESSELI: {
		description: "傳回修正的貝賽耳函數 In(x)",
		abstract: "傳回修正的貝賽耳函數 In(x)",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/besseli-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "用於評估函數的值。"
			},
			n: {
				name: "N",
				detail: "Bessel函數的順序。如果n不是整數，則會取至整數。"
			}
		}
	},
	BESSELJ: {
		description: "傳回貝賽耳函數 Jn(x)",
		abstract: "返回貝賽耳函數 Jn(x)",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/besselj-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "用於評估函數的值。"
			},
			n: {
				name: "N",
				detail: "Bessel函數的順序。如果n不是整數，則會取至整數。"
			}
		}
	},
	BESSELK: {
		description: "傳回修正的貝賽耳函數 Kn(x)",
		abstract: "返回修正的貝賽耳函數 Kn(x)",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/besselk-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "用於評估函數的值。"
			},
			n: {
				name: "N",
				detail: "Bessel函數的順序。如果n不是整數，則會取至整數。"
			}
		}
	},
	BESSELY: {
		description: "傳回貝賽耳函數 Yn(x)",
		abstract: "返回貝賽耳函數 Yn(x)",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/bessely-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "用於評估函數的值。"
			},
			n: {
				name: "N",
				detail: "Bessel函數的順序。如果n不是整數，則會取至整數。"
			}
		}
	},
	BIN2DEC: {
		description: "將二進位數轉換為十進位數",
		abstract: "將二進位數轉換為十進位數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/bin2dec-function"
		}],
		functionParameter: { number: {
			name: "二進位數",
			detail: "要轉換的二進位數。"
		} }
	},
	BIN2HEX: {
		description: "將二進位數轉換為十六進位數",
		abstract: "將二進位數轉換為十六進位數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/bin2hex-function"
		}],
		functionParameter: {
			number: {
				name: "二進位數",
				detail: "要轉換的二進位數。"
			},
			places: {
				name: "字元數",
				detail: "要使用的字元數。"
			}
		}
	},
	BIN2OCT: {
		description: "將二進位數字轉換成八進位。",
		abstract: "將二進位數字轉換成八進位。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/bin2oct-function"
		}],
		functionParameter: {
			number: {
				name: "二進位數",
				detail: "必要。 您要轉換的二進位數字。 Number 不能包含超過 10 個字元 (10 個位元)。 Number 最高有效位元是正負號位元。 其餘的 9 個位元則為量級位元。 負數是使用 2 的補數表示法來表示。"
			},
			places: {
				name: "字元數",
				detail: "可選的。 這是要使用的字元數。 如果省略 places，BIN2OCT 會使用所需字元數的最小值。 當您要使用前置 0 (零) 來填補傳回值時，places 非常有用。"
			}
		}
	},
	BITAND: {
		description: "傳回兩個數的「位元與」",
		abstract: "傳回兩數的「位元與」",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/bitand-function"
		}],
		functionParameter: {
			number1: {
				name: "數值1",
				detail: "必須是十進位格式，且大於或等於 0。"
			},
			number2: {
				name: "數值2",
				detail: "必須是十進位格式，且大於或等於 0。"
			}
		}
	},
	BITLSHIFT: {
		description: "傳回左移 shift_amount 位的計算值接收數",
		abstract: "傳回左移 shift_amount 位元的計算值接收數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/bitlshift-function"
		}],
		functionParameter: {
			number: {
				name: "數值",
				detail: "必須是大於或等於 0 的整數。"
			},
			shiftAmount: {
				name: "移位量",
				detail: "必須是整數。"
			}
		}
	},
	BITOR: {
		description: "傳回兩個數的「位元或」",
		abstract: "傳回兩個數字的「位元或」",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/bitor-function"
		}],
		functionParameter: {
			number1: {
				name: "數值1",
				detail: "必須是十進位格式，且大於或等於 0。"
			},
			number2: {
				name: "數值2",
				detail: "必須是十進位格式，且大於或等於 0。"
			}
		}
	},
	BITRSHIFT: {
		description: "傳回右移 shift_amount 位元的計算值接收數",
		abstract: "返回右移 shift_amount 位元的計算值接收數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/bitrshift-function"
		}],
		functionParameter: {
			number: {
				name: "數值",
				detail: "必須是大於或等於 0 的整數。"
			},
			shiftAmount: {
				name: "移位量",
				detail: "必須是整數。"
			}
		}
	},
	BITXOR: {
		description: "傳回兩個數的位元「異或」",
		abstract: "傳回兩數的位元「異或」",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/bitxor-function"
		}],
		functionParameter: {
			number1: {
				name: "數值1",
				detail: "必須是十進位格式，且大於或等於 0。"
			},
			number2: {
				name: "數值2",
				detail: "必須是十進位格式，且大於或等於 0。"
			}
		}
	},
	COMPLEX: {
		description: "將實係數和虛係數轉換為複數",
		abstract: "將實係數和虛係數轉換為複數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/complex-function"
		}],
		functionParameter: {
			realNum: {
				name: "實係數",
				detail: "複數的實係數。"
			},
			iNum: {
				name: "虛係數",
				detail: "複數的虛係數。"
			},
			suffix: {
				name: "字尾",
				detail: "複數虛數元件的字尾。如果省略，會將字尾假設為 \"i\"。"
			}
		}
	},
	CONVERT: {
		description: "將數字從一種度量系統轉換為另一種度量系統",
		abstract: "將數字從一種度量系統轉換為另一種度量系統",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/convert-function"
		}],
		functionParameter: {
			number: {
				name: "數值",
				detail: "要轉換的值。"
			},
			fromUnit: {
				name: "轉換前單位",
				detail: "數值的單位。"
			},
			toUnit: {
				name: "轉換后單位",
				detail: "結果的單位。"
			}
		}
	},
	DEC2BIN: {
		description: "將十進位數轉換為二進位數",
		abstract: "將十進位數轉換為二進位數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/dec2bin-function"
		}],
		functionParameter: {
			number: {
				name: "十進位數",
				detail: "要轉換的十進位數。"
			},
			places: {
				name: "字元數",
				detail: "要使用的字元數。"
			}
		}
	},
	DEC2HEX: {
		description: "將十進位數轉換為十六進位數",
		abstract: "將十進位數轉換為十六進位數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/dec2hex-function"
		}],
		functionParameter: {
			number: {
				name: "十進位數",
				detail: "要轉換的十進位數。"
			},
			places: {
				name: "字元數",
				detail: "要使用的字元數。"
			}
		}
	},
	DEC2OCT: {
		description: "將十進位數轉換為八進位數",
		abstract: "將十進位數轉換為八進位數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/dec2oct-function"
		}],
		functionParameter: {
			number: {
				name: "十進位數",
				detail: "要轉換的十進位數。"
			},
			places: {
				name: "字元數",
				detail: "要使用的字元數。"
			}
		}
	},
	DELTA: {
		description: "檢驗兩個值是否相等",
		abstract: "檢驗兩個值是否相等",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/delta-function"
		}],
		functionParameter: {
			number1: {
				name: "數值1",
				detail: "第一個數值。"
			},
			number2: {
				name: "數值2",
				detail: "第二個數值。如果省略，會將數值2假設為零。"
			}
		}
	},
	ERF: {
		description: "返回誤差函數",
		abstract: "返回誤差函數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/erf-function"
		}],
		functionParameter: {
			lowerLimit: {
				name: "下限",
				detail: "整合ERF的下限。"
			},
			upperLimit: {
				name: "上限",
				detail: "整合ERF的上限。如果省略，ERF會在零和下限之間整合。"
			}
		}
	},
	ERF_PRECISE: {
		description: "返回誤差函數",
		abstract: "返回誤差函數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/erf-precise-function"
		}],
		functionParameter: { x: {
			name: "下限",
			detail: "整合ERF.PRECISE的下限。"
		} }
	},
	ERFC: {
		description: "返回互補誤差函數",
		abstract: "返回互補誤差函數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/erfc-function"
		}],
		functionParameter: { x: {
			name: "下限",
			detail: "整合ERFC的下限。"
		} }
	},
	ERFC_PRECISE: {
		description: "傳回從 x 到無窮大積分的互補 ERF 函數",
		abstract: "傳回從 x 到無窮大積分的互補 ERF 函數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/erfc-precise-function"
		}],
		functionParameter: { x: {
			name: "下限",
			detail: "整合ERFC.PRECISE的下限。"
		} }
	},
	GESTEP: {
		description: "檢驗數字是否大於門檻",
		abstract: "檢驗數字是否大於門檻",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/gestep-function"
		}],
		functionParameter: {
			number: {
				name: "數值",
				detail: "要檢定閾值的值。"
			},
			step: {
				name: "閾值",
				detail: "閾值。如果省略閾值的值，GESTEP 會使用零。"
			}
		}
	},
	HEX2BIN: {
		description: "將十六進位數轉換為二進位數",
		abstract: "將十六進位數轉換為二進位數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/hex2bin-function"
		}],
		functionParameter: {
			number: {
				name: "十六進位數",
				detail: "要轉換的十六進位數。"
			},
			places: {
				name: "字元數",
				detail: "要使用的字元數。"
			}
		}
	},
	HEX2DEC: {
		description: "將十六進位數轉換為十進位數",
		abstract: "將十六進位數轉換為十進位數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/hex2dec-function"
		}],
		functionParameter: { number: {
			name: "十六進位數",
			detail: "要轉換的十六進位數。"
		} }
	},
	HEX2OCT: {
		description: "將十六進位數轉換為八進位數",
		abstract: "將十六進位數轉換為八進位數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/hex2oct-function"
		}],
		functionParameter: {
			number: {
				name: "十六進位數",
				detail: "要轉換的十六進位數。"
			},
			places: {
				name: "字元數",
				detail: "要使用的字元數。"
			}
		}
	},
	IMABS: {
		description: "傳回複數的絕對值（模數）",
		abstract: "傳回複數的絕對值（模）",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/imabs-function"
		}],
		functionParameter: { inumber: {
			name: "複數",
			detail: "要求得絕對值的複數。"
		} }
	},
	IMAGINARY: {
		description: "傳回複數的虛係數",
		abstract: "傳回複數的虛係數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/imaginary-function"
		}],
		functionParameter: { inumber: {
			name: "複數",
			detail: "要求得虛係數的複數。"
		} }
	},
	IMARGUMENT: {
		description: "傳回參數 theta，即以弧度表示的角",
		abstract: "傳回參數 theta，即以弧度表示的角",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/imargument-function"
		}],
		functionParameter: { inumber: {
			name: "複數",
			detail: "要求自變數 theta 的複數。"
		} }
	},
	IMCONJUGATE: {
		description: "傳回複數的共軛複數",
		abstract: "傳回複數的共軛複數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/imconjugate-function"
		}],
		functionParameter: { inumber: {
			name: "複數",
			detail: "要求得共軛的複數。"
		} }
	},
	IMCOS: {
		description: "傳回複數的餘弦",
		abstract: "傳回複數的餘弦",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/imcos-function"
		}],
		functionParameter: { inumber: {
			name: "複數",
			detail: "要求得餘弦值的複數。"
		} }
	},
	IMCOSH: {
		description: "傳回複數的雙曲餘弦值",
		abstract: "傳回複數的雙曲餘弦值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/imcosh-function"
		}],
		functionParameter: { inumber: {
			name: "複數",
			detail: "要求得雙曲餘弦值的複數。"
		} }
	},
	IMCOT: {
		description: "傳回複數的餘切值",
		abstract: "傳回複數的餘切值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/imcot-function"
		}],
		functionParameter: { inumber: {
			name: "複數",
			detail: "要求得餘切值的複數。"
		} }
	},
	IMCOTH: {
		description: "IMCOTH 函式會傳回指定複數的雙曲餘切值。 例如，指定值為複數「x+yi」，就會傳回「coth(x+yi)」。",
		abstract: "IMCOTH 函式會傳回指定複數的雙曲餘切值。 例如，指定值為複數「x+yi」，就會傳回「coth(x+yi)」。",
		links: [{
			title: "教学",
			url: "https://support.google.com/docs/answer/9366256?hl=zh-Hant"
		}],
		functionParameter: { inumber: {
			name: "複數",
			detail: "要計算雙曲餘切值的複數。 此引數可以是 COMPLEX 函式得出的值，也可以是實數 (視為虛部等於 0 的複數) 或格式為「x+yi」的字串，其中 x 和 y 為數字。"
		} }
	},
	IMCSC: {
		description: "傳回複數的餘割值",
		abstract: "傳回複數的餘割值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/imcsc-function"
		}],
		functionParameter: { inumber: {
			name: "複數",
			detail: "要求得餘割值的複數。"
		} }
	},
	IMCSCH: {
		description: "傳回複數的雙曲餘割值",
		abstract: "傳回複數的雙曲餘割值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/imcsch-function"
		}],
		functionParameter: { inumber: {
			name: "複數",
			detail: "要求得雙曲餘割值的複數。"
		} }
	},
	IMDIV: {
		description: "傳回文字格式為 x + yi 或 x + yj 的兩個複數的商數。",
		abstract: "傳回文字格式為 x + yi 或 x + yj 的兩個複數的商數。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/imdiv-function"
		}],
		functionParameter: {
			inumber1: {
				name: "複數分子",
				detail: "必須。 這是複數分子或被除數。"
			},
			inumber2: {
				name: "複數分母",
				detail: "必須。 這是複數分母或除數。"
			}
		}
	},
	IMEXP: {
		description: "傳回複數的指數",
		abstract: "傳回複數的指數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/imexp-function"
		}],
		functionParameter: { inumber: {
			name: "複數",
			detail: "要求得指數的複數。"
		} }
	},
	IMLN: {
		description: "傳回複數的自然對數",
		abstract: "傳回複數的自然對數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/imln-function"
		}],
		functionParameter: { inumber: {
			name: "複數",
			detail: "要求得自然對數的複數。"
		} }
	},
	IMLOG: {
		description: "IMLOG 函式會傳回指定複數的對數 (根據特定底數)。",
		abstract: "IMLOG 函式會傳回指定複數的對數 (根據特定底數)。",
		links: [{
			title: "教導",
			url: "https://support.google.com/docs/answer/9366486?hl=zh-Hant"
		}],
		functionParameter: {
			inumber: {
				name: "複數",
				detail: "對數函式的輸入值。 可以輸入 1 這樣的純數字，系統會將此解析為一個實數。 也可以輸入引用文字，同時指定實數和複數係數。"
			},
			base: {
				name: "底數",
				detail: "計算對數時所用的底數。 必須是正實數。"
			}
		}
	},
	IMLOG10: {
		description: "傳回複數的以 10 為底的對數",
		abstract: "傳回複數的以 10 為底的對數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/imlog10-function"
		}],
		functionParameter: { inumber: {
			name: "複數",
			detail: "要求得常用對數的複數。"
		} }
	},
	IMLOG2: {
		description: "傳回複數的以 2 為底的對數",
		abstract: "傳回複數的以 2 為底的對數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/imlog2-function"
		}],
		functionParameter: { inumber: {
			name: "複數",
			detail: "要求得底數為 2 之對數的複數。"
		} }
	},
	IMPOWER: {
		description: "傳回複數的整數冪",
		abstract: "傳回複數的整數冪",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/impower-function"
		}],
		functionParameter: {
			inumber: {
				name: "複數",
				detail: "要遞增至乘冪的複數。"
			},
			number: {
				name: "數值",
				detail: "要遞增至複數的乘冪。"
			}
		}
	},
	IMPRODUCT: {
		description: "傳回多個複數的乘積",
		abstract: "傳回多個複數的乘積",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/improduct-function"
		}],
		functionParameter: {
			inumber1: {
				name: "複數1",
				detail: "1 到 255 個要乘以的複數。"
			},
			inumber2: {
				name: "複數2",
				detail: "1 到 255 個要乘以的複數。"
			}
		}
	},
	IMREAL: {
		description: "傳回複數的實係數",
		abstract: "傳回複數的實係數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/imreal-function"
		}],
		functionParameter: { inumber: {
			name: "複數",
			detail: "要求得實係數的複數。"
		} }
	},
	IMSEC: {
		description: "傳回複數的正割值",
		abstract: "傳回複數的正割值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/imsec-function"
		}],
		functionParameter: { inumber: {
			name: "複數",
			detail: "要求得正割值的複數。"
		} }
	},
	IMSECH: {
		description: "傳回複數的雙曲正割值",
		abstract: "傳回複數的雙曲正割值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/imsech-function"
		}],
		functionParameter: { inumber: {
			name: "複數",
			detail: "要求得雙曲正割值的複數。"
		} }
	},
	IMSIN: {
		description: "傳回複數的正弦",
		abstract: "傳回複數的正弦",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/imsin-function"
		}],
		functionParameter: { inumber: {
			name: "複數",
			detail: "要求得正弦值的複數。"
		} }
	},
	IMSINH: {
		description: "傳回複數的雙曲正弦值",
		abstract: "傳回複數的雙曲正弦值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/imsinh-function"
		}],
		functionParameter: { inumber: {
			name: "複數",
			detail: "要求得雙曲正弦值的複數。"
		} }
	},
	IMSQRT: {
		description: "傳回複數的平方根",
		abstract: "傳回複數的平方根",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/imsqrt-function"
		}],
		functionParameter: { inumber: {
			name: "複數",
			detail: "要求得平方根的複數。"
		} }
	},
	IMSUB: {
		description: "傳回兩個複數的差",
		abstract: "傳回兩個複數的差",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/imsub-function"
		}],
		functionParameter: {
			inumber1: {
				name: "複數1",
				detail: "複數1。"
			},
			inumber2: {
				name: "複數2",
				detail: "複數2。"
			}
		}
	},
	IMSUM: {
		description: "傳回多個複數的和",
		abstract: "傳回多個複數的和",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/imsum-function"
		}],
		functionParameter: {
			inumber1: {
				name: "複數1",
				detail: "1 到 255 個要相加的複數。"
			},
			inumber2: {
				name: "複數2",
				detail: "1 到 255 個要相加的複數。"
			}
		}
	},
	IMTAN: {
		description: "傳回複數的正切值",
		abstract: "傳回複數的正切值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/imtan-function"
		}],
		functionParameter: { inumber: {
			name: "複數",
			detail: "要求得正切值的複數。"
		} }
	},
	IMTANH: {
		description: "IMTANH 函式會傳回指定複數的雙曲正切值。 例如，指定值為複數「x+yi」，就會傳回「tanh(x+yi)」。",
		abstract: "IMTANH 函式會傳回指定複數的雙曲正切值。 例如，指定值為複數「x+yi」，就會傳回「tanh(x+yi)」。",
		links: [{
			title: "教導",
			url: "https://support.google.com/docs/answer/9366655?hl=zh-Hant"
		}],
		functionParameter: { inumber: {
			name: "複數",
			detail: "要計算雙曲正切值的複數。 此引數可以是 COMPLEX 函式得出的數值，也可以是實數 (視為虛部等於 0 的複數) 或格式為「x+yi」的字串，其中 x 和 y 為數字。"
		} }
	},
	OCT2BIN: {
		description: "將八進位數轉換為二進位數",
		abstract: "將八進位數轉換為二進位數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/oct2bin-function"
		}],
		functionParameter: {
			number: {
				name: "八進位數",
				detail: "要轉換的八進位數。"
			},
			places: {
				name: "字元數",
				detail: "要使用的字元數。"
			}
		}
	},
	OCT2DEC: {
		description: "將八進位數轉換為十進位數",
		abstract: "將八進位數轉換為十進位數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/oct2dec-function"
		}],
		functionParameter: { number: {
			name: "八進位數",
			detail: "要轉換的八進位數。"
		} }
	},
	OCT2HEX: {
		description: "將八進位數轉換為十六進位數",
		abstract: "將八進位數轉換為十六進位數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/oct2hex-function"
		}],
		functionParameter: {
			number: {
				name: "八進位數",
				detail: "要轉換的八進位數。"
			},
			places: {
				name: "字元數",
				detail: "要使用的字元數。"
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/financial/zh-TW.ts
const locale$8 = {
	ACCRINT: {
		description: "返回定期支付利息的債券的應計利息",
		abstract: "返回定期支付利息的債券的應計利息",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/accrint-function"
		}],
		functionParameter: {
			issue: {
				name: "發行日",
				detail: "證券的發行日期。"
			},
			firstInterest: {
				name: "首次計息日",
				detail: "證券的第一個利率日期。"
			},
			settlement: {
				name: "到期日",
				detail: "證券的到期日期。"
			},
			rate: {
				name: "利率",
				detail: "證券的年度票息率。"
			},
			par: {
				name: "面值",
				detail: "證券的票面價值。"
			},
			frequency: {
				name: "頻次",
				detail: "每年票息付款的次數。"
			},
			basis: {
				name: "基礎",
				detail: "要使用的日計數基礎類型。"
			},
			calcMethod: {
				name: "計算方法",
				detail: "是一個邏輯值：從發行日期開始的應計利息 = TRUE 或忽略；從最後票據支付日期開始計算 = FALSE。"
			}
		}
	},
	ACCRINTM: {
		description: "返回在到期日支付利息的債券的應計利息",
		abstract: "返回在到期日支付利息的債券的應計利息",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/accrintm-function"
		}],
		functionParameter: {
			issue: {
				name: "發行日",
				detail: "證券的發行日期。"
			},
			settlement: {
				name: "到期日",
				detail: "證券的到期日期。"
			},
			rate: {
				name: "利率",
				detail: "證券的年度票息率。"
			},
			par: {
				name: "面值",
				detail: "證券的票面價值。"
			},
			basis: {
				name: "基礎",
				detail: "要使用的日計數基礎類型。"
			}
		}
	},
	AMORDEGRC: {
		description: "使用折舊係數傳回每個記帳期間的折舊值",
		abstract: "使用折舊係數傳回每個記帳期間的折舊值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/amordegrc-function"
		}],
		functionParameter: {
			cost: {
				name: "成本",
				detail: "資產的成本。"
			},
			datePurchased: {
				name: "購買日期",
				detail: "資產的購買日期。"
			},
			firstPeriod: {
				name: "首個週期",
				detail: "第一個週期結束的日期。"
			},
			salvage: {
				name: "殘值",
				detail: "資產耐用年限終了時的殘餘價值。"
			},
			period: {
				name: "週期",
				detail: "週期。"
			},
			rate: {
				name: "折舊率",
				detail: "折舊率。"
			},
			basis: {
				name: "基礎",
				detail: "要使用的年計數基礎。"
			}
		}
	},
	AMORLINC: {
		description: "傳回每個記帳期間的折舊值",
		abstract: "傳回每個記帳期間的折舊值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/amorlinc-function"
		}],
		functionParameter: {
			cost: {
				name: "成本",
				detail: "資產的成本。"
			},
			datePurchased: {
				name: "購買日期",
				detail: "資產的購買日期。"
			},
			firstPeriod: {
				name: "首個週期",
				detail: "第一個週期結束的日期。"
			},
			salvage: {
				name: "殘值",
				detail: "資產耐用年限終了時的殘餘價值。"
			},
			period: {
				name: "週期",
				detail: "週期。"
			},
			rate: {
				name: "折舊率",
				detail: "折舊率。"
			},
			basis: {
				name: "基礎",
				detail: "要使用的年計數基礎。"
			}
		}
	},
	COUPDAYBS: {
		description: "傳回從票息期間開始到結算日之間的天數",
		abstract: "傳回從票息期間開始到結算日之間的天數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/coupdaybs-function"
		}],
		functionParameter: {
			settlement: {
				name: "結算日期",
				detail: "證券的結算日期。"
			},
			maturity: {
				name: "到期日期",
				detail: "證券的到期日期。"
			},
			frequency: {
				name: "頻次",
				detail: "每年票息付款的次數。"
			},
			basis: {
				name: "基礎",
				detail: "要使用的日計數基礎類型。"
			}
		}
	},
	COUPDAYS: {
		description: "傳回包含結算日的票息期天數",
		abstract: "傳回包含結算日的票息期天數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/coupdays-function"
		}],
		functionParameter: {
			settlement: {
				name: "結算日期",
				detail: "證券的結算日期。"
			},
			maturity: {
				name: "到期日期",
				detail: "證券的到期日期。"
			},
			frequency: {
				name: "頻次",
				detail: "每年票息付款的次數。"
			},
			basis: {
				name: "基礎",
				detail: "要使用的日計數基礎類型。"
			}
		}
	},
	COUPDAYSNC: {
		description: "傳回從結算日到下一票息支付日之間的天數",
		abstract: "傳回從結算日到下一票息支付日之間的天數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/coupdaysnc-function"
		}],
		functionParameter: {
			settlement: {
				name: "結算日期",
				detail: "證券的結算日期。"
			},
			maturity: {
				name: "到期日期",
				detail: "證券的到期日期。"
			},
			frequency: {
				name: "頻次",
				detail: "每年票息付款的次數。"
			},
			basis: {
				name: "基礎",
				detail: "要使用的日計數基礎類型。"
			}
		}
	},
	COUPNCD: {
		description: "返回結算日之後的下一個票息支付日",
		abstract: "返回結算日之後的下一個票息支付日",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/coupncd-function"
		}],
		functionParameter: {
			settlement: {
				name: "結算日期",
				detail: "證券的結算日期。"
			},
			maturity: {
				name: "到期日期",
				detail: "證券的到期日期。"
			},
			frequency: {
				name: "頻次",
				detail: "每年票息付款的次數。"
			},
			basis: {
				name: "基礎",
				detail: "要使用的日計數基礎類型。"
			}
		}
	},
	COUPNUM: {
		description: "返回結算日與到期日之間可支付的票息數",
		abstract: "返回結算日與到期日之間可支付的票息數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/coupnum-function"
		}],
		functionParameter: {
			settlement: {
				name: "結算日期",
				detail: "證券的結算日期。"
			},
			maturity: {
				name: "到期日期",
				detail: "證券的到期日期。"
			},
			frequency: {
				name: "頻次",
				detail: "每年票息付款的次數。"
			},
			basis: {
				name: "基礎",
				detail: "要使用的日計數基礎類型。"
			}
		}
	},
	COUPPCD: {
		description: "返回結算日之前的上一票息支付日",
		abstract: "返回結算日之前的上一票息支付日",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/couppcd-function"
		}],
		functionParameter: {
			settlement: {
				name: "結算日期",
				detail: "證券的結算日期。"
			},
			maturity: {
				name: "到期日期",
				detail: "證券的到期日期。"
			},
			frequency: {
				name: "頻次",
				detail: "每年票息付款的次數。"
			},
			basis: {
				name: "基礎",
				detail: "要使用的日計數基礎類型。"
			}
		}
	},
	CUMIPMT: {
		description: "傳回兩個付款期間之間累積支付的利息",
		abstract: "返回兩個付款期之間累積支付的利息",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/cumipmt-function"
		}],
		functionParameter: {
			rate: {
				name: "利率",
				detail: "利率。"
			},
			nper: {
				name: "總期數",
				detail: "總付款期數。"
			},
			pv: {
				name: "現值",
				detail: "現值。"
			},
			startPeriod: {
				name: "首期",
				detail: "計算中的第一個週期。付款週期的編號由1開始。"
			},
			endPeriod: {
				name: "末期",
				detail: "計算中的最後一個週期。"
			},
			type: {
				name: "類型",
				detail: "付款的時機。"
			}
		}
	},
	CUMPRINC: {
		description: "返回兩個付款期之間為貸款累積支付的本金",
		abstract: "返回兩個付款期之間為貸款累積支付的本金",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/cumprinc-function"
		}],
		functionParameter: {
			rate: {
				name: "利率",
				detail: "利率。"
			},
			nper: {
				name: "總期數",
				detail: "總付款期數。"
			},
			pv: {
				name: "現值",
				detail: "現值。"
			},
			startPeriod: {
				name: "首期",
				detail: "計算中的第一個週期。付款週期的編號由1開始。"
			},
			endPeriod: {
				name: "末期",
				detail: "計算中的最後一個週期。"
			},
			type: {
				name: "類型",
				detail: "付款的時機。"
			}
		}
	},
	DB: {
		description: "使用固定餘額遞減法，傳回一筆資產在給定期間內的折舊值",
		abstract: "使用固定餘額遞減法，傳回一筆資產在給定期間內的折舊值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/db-function"
		}],
		functionParameter: {
			cost: {
				name: "成本",
				detail: "資產的原始成本。"
			},
			salvage: {
				name: "殘值",
				detail: "折舊最後的值 (有時稱為資產的殘餘價值)。"
			},
			life: {
				name: "使用年限",
				detail: "資產折舊的期數 (有時稱為資產的使用年限)。"
			},
			period: {
				name: "期間",
				detail: "要計算折舊的期間。"
			},
			month: {
				name: "月份",
				detail: "第一年的月份數。如果省略 month，則假設其值為12。"
			}
		}
	},
	DDB: {
		description: "使用雙倍餘額遞減法或其他指定方法，傳回一筆資產在給定期間內的折舊值",
		abstract: "使用雙倍餘額遞減法或其他指定方法，傳回一筆資產在給定期間內的折舊值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/ddb-function"
		}],
		functionParameter: {
			cost: {
				name: "成本",
				detail: "資產的原始成本。"
			},
			salvage: {
				name: "殘值",
				detail: "折舊最後的值 (有時稱為資產的殘餘價值)。"
			},
			life: {
				name: "使用年限",
				detail: "資產折舊的期數 (有時稱為資產的使用年限)。"
			},
			period: {
				name: "期間",
				detail: "要計算折舊的期間。"
			},
			factor: {
				name: "速率",
				detail: "餘額遞減的速率。如果省略factor，將假設其值為2(倍率遞減法)。"
			}
		}
	},
	DISC: {
		description: "返回債券的折現率",
		abstract: "返回債券的折現率",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/disc-function"
		}],
		functionParameter: {
			settlement: {
				name: "結算日期",
				detail: "證券的結算日期。"
			},
			maturity: {
				name: "到期日期",
				detail: "證券的到期日期。"
			},
			pr: {
				name: "價格",
				detail: "證券每$100面額的價格。"
			},
			redemption: {
				name: "贖回價",
				detail: "證券每$100面額的贖回價值。"
			},
			basis: {
				name: "基礎",
				detail: "要使用的日計數基礎類型。"
			}
		}
	},
	DOLLARDE: {
		description: "將以分數表示的價格轉換為以小數表示的價格",
		abstract: "將以分數表示的價格轉換為以小數表示的價格",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/dollarde-function"
		}],
		functionParameter: {
			fractionalDollar: {
				name: "分數",
				detail: "以整數部分和分數部分表示，並以小數點符號分隔的數字。"
			},
			fraction: {
				name: "分母",
				detail: "用於分數之分母的整數。"
			}
		}
	},
	DOLLARFR: {
		description: "將以小數表示的價格轉換為以分數表示的價格",
		abstract: "將以小數表示的價格轉換為以分數表示的價格",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/dollarfr-function"
		}],
		functionParameter: {
			decimalDollar: {
				name: "小數",
				detail: "小數。"
			},
			fraction: {
				name: "分母",
				detail: "用於分數之分母的整數。"
			}
		}
	},
	DURATION: {
		description: "返回定期支付利息的債券的每​​年期限",
		abstract: "返回定期支付利息的債券的每​​年期限",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/duration-function"
		}],
		functionParameter: {
			settlement: {
				name: "結算日期",
				detail: "證券的結算日期。"
			},
			maturity: {
				name: "到期日期",
				detail: "證券的到期日期。"
			},
			coupon: {
				name: "年度票息率",
				detail: "證券的年度票息率。"
			},
			yld: {
				name: "年收益率",
				detail: "證券的年收益。"
			},
			frequency: {
				name: "頻次",
				detail: "每年票息付款的次數。"
			},
			basis: {
				name: "基礎",
				detail: "要使用的日計數基礎類型。"
			}
		}
	},
	EFFECT: {
		description: "返回年度有效利率",
		abstract: "返回年有效利率",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/effect-function"
		}],
		functionParameter: {
			nominalRate: {
				name: "名義利率",
				detail: "名義利率。"
			},
			npery: {
				name: "期數",
				detail: "每年以複利計算之期數。"
			}
		}
	},
	FV: {
		description: "傳回一筆投資的未來值",
		abstract: "傳回一筆投資的未來值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/fv-function"
		}],
		functionParameter: {
			rate: {
				name: "利率",
				detail: "各期的利率。"
			},
			nper: {
				name: "總期數",
				detail: "年金的總付款期數。"
			},
			pmt: {
				name: "金額",
				detail: "各期給付的金額；不得在年金期限內變更。"
			},
			pv: {
				name: "現值",
				detail: "一系列未來付款的現值或目前總額。"
			},
			type: {
				name: "類型",
				detail: "數字0或1，指出付款期限。"
			}
		}
	},
	FVSCHEDULE: {
		description: "傳回初始資金在套用一系列複利率之後的未來值。 使用 FVSCHEDULE 以變動或可調整的利率來計算投資的未來值。",
		abstract: "傳回初始資金在套用一系列複利率之後的未來值。 使用 FVSCHEDULE 以變動或可調整的利率來計算投資的未來值。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/fvschedule-function"
		}],
		functionParameter: {
			principal: {
				name: "初始資金",
				detail: "必須。 這是現值。"
			},
			schedule: {
				name: "利率陣列",
				detail: "必須。 這是要套用的利率陣列。"
			}
		}
	},
	INTRATE: {
		description: "傳回完整投資證券的利率。",
		abstract: "傳回完整投資證券的利率。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/intrate-function"
		}],
		functionParameter: {
			settlement: {
				name: "結算日期",
				detail: "必須。 這是證券的結算日期。 證券結算日期是證券交割給買方後的次日。"
			},
			maturity: {
				name: "到期日期",
				detail: "必須。 這是證券的到期日期。 到期日期為證券到期的日期。"
			},
			investment: {
				name: "投資額",
				detail: "必須。 這是證券的投資額。"
			},
			redemption: {
				name: "贖回價",
				detail: "必須。 這是到期時收回的金額。"
			},
			basis: {
				name: "基礎",
				detail: "可選的。 這是要使用的日計數基礎類型。"
			}
		}
	},
	IPMT: {
		description: "返回一筆投資在給定期間內支付的利息",
		abstract: "返回一筆投資在給定期間內支付的利息",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/ipmt-function"
		}],
		functionParameter: {
			rate: {
				name: "利率",
				detail: "各期的利率。"
			},
			per: {
				name: "期數",
				detail: "求算利息的期次，其值必須介於1到nper之間。"
			},
			nper: {
				name: "總期數",
				detail: "年金的總付款期數。"
			},
			pv: {
				name: "現值",
				detail: "一系列未來付款的現值或目前總額。"
			},
			fv: {
				name: "餘額",
				detail: "最後一次付款完成後，所能獲得的未來值或現金餘額。"
			},
			type: {
				name: "類型",
				detail: "數字0或1，指出付款期限。"
			}
		}
	},
	IRR: {
		description: "返回一系列現金流的內部收益率",
		abstract: "返回一系列現金流的內部收益率",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/irr-function"
		}],
		functionParameter: {
			values: {
				name: "現金流",
				detail: "陣列或儲存格參照，其中包含要計算內部報酬率的數字。\n1.Values 必須至少包含一個正數和一個負數，以計算內部報酬率。\n2.IRR 使用 values 的順序來表示現金流量的順序。 請務必依所要的順序輸入支出及收入的值。\n3.如果陣列或參照引數中包含文字、邏輯值或空白儲存格，則這些值將會略過。"
			},
			guess: {
				name: "猜測值",
				detail: "猜測接近 IRR 結果的數字。"
			}
		}
	},
	ISPMT: {
		description: "計算特定投資期間內要支付的利息",
		abstract: "計算特定投資期間內要支付的利息",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/ispmt-function"
		}],
		functionParameter: {
			rate: {
				name: "利率",
				detail: "投資的利率。"
			},
			per: {
				name: "期數",
				detail: "要尋找利息的期間，其值必須介於1到Nper之間。"
			},
			nper: {
				name: "總期數",
				detail: "投資的總付款期數。"
			},
			pv: {
				name: "現值",
				detail: "投資的現值。若為貸款，Pv為貸款金額。"
			}
		}
	},
	MDURATION: {
		description: "傳回假設面值為 ￥100 的有價證券的 Macauley 修正期限",
		abstract: "傳回假設面值為 ￥100 的有價證券的 Macauley 修正期限",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/mduration-function"
		}],
		functionParameter: {
			settlement: {
				name: "結算日期",
				detail: "證券的結算日期。"
			},
			maturity: {
				name: "到期日期",
				detail: "證券的到期日期。"
			},
			coupon: {
				name: "年度票息率",
				detail: "證券的年度票息率。"
			},
			yld: {
				name: "年收益率",
				detail: "證券的年收益。"
			},
			frequency: {
				name: "頻次",
				detail: "每年票息付款的次數。"
			},
			basis: {
				name: "基礎",
				detail: "要使用的日計數基礎類型。"
			}
		}
	},
	MIRR: {
		description: "返回正和負現金流以不同利率進行計算的內部收益率",
		abstract: "返回正和負現金流以不同利率進行計算的內部收益率",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/mirr-function"
		}],
		functionParameter: {
			values: {
				name: "現金流",
				detail: "陣列或儲存格參照，其中包含數字。 這些數字代表定期發生的一系列支出 (負值) 和收入 (正值)。\n1.Values 必須至少包含一個正值和一個負值，以計算經修改的內部報酬率。 否則，MIRR 會傳回 #DIV/0! 的錯誤值。\n2.如果陣列或參照引數包含文字、邏輯值或空白儲存格，則忽略這些數值；但包含零值儲存格。"
			},
			financeRate: {
				name: "融資利率",
				detail: "投入資金的融資利率。"
			},
			reinvestRate: {
				name: "轉投資報酬率",
				detail: "各期收入淨額的轉投資報酬率。"
			}
		}
	},
	NOMINAL: {
		description: "返回年度的名目利率",
		abstract: "返回年度的名目利率",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/nominal-function"
		}],
		functionParameter: {
			effectRate: {
				name: "實質利率",
				detail: "實質利率。"
			},
			npery: {
				name: "期數",
				detail: "每年以複利計算之期數。"
			}
		}
	},
	NPER: {
		description: "返回投資的期數",
		abstract: "返回投資的期數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/nper-function"
		}],
		functionParameter: {
			rate: {
				name: "利率",
				detail: "各期的利率。"
			},
			pmt: {
				name: "金額",
				detail: "各期給付的金額；不得在年金期限內變更。"
			},
			pv: {
				name: "現值",
				detail: "一系列未來付款的現值或目前總額。"
			},
			fv: {
				name: "餘額",
				detail: "最後一次付款完成後，所能獲得的未來值或現金餘額。"
			},
			type: {
				name: "類型",
				detail: "數字0或1，指出付款期限。"
			}
		}
	},
	NPV: {
		description: "傳回以一系列定期的現金流量和折現率計算的投資的淨現值",
		abstract: "傳回以一系列定期的現金流量和折現率計算的投資的淨現值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/npv-function"
		}],
		functionParameter: {
			rate: {
				name: "貼現率",
				detail: "一段期間內的貼現率。"
			},
			value1: {
				name: "現金流1",
				detail: "1 到 254 個代表支出和收入的引數。"
			},
			value2: {
				name: "現金流2",
				detail: "1 到 254 個代表支出和收入的引數。"
			}
		}
	},
	ODDFPRICE: {
		description: "返回每張票面為 ￥100 且第一期為奇數的債券的現價",
		abstract: "返回每張票面為 ￥100 且第一期為奇數的債券的現價",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/oddfprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "結算日期",
				detail: "證券的結算日期。"
			},
			maturity: {
				name: "到期日期",
				detail: "證券的到期日期。"
			},
			issue: {
				name: "發行日期",
				detail: "證券的發行日期。"
			},
			firstCoupon: {
				name: "首次付息日期",
				detail: "證券的首次付息日期。"
			},
			rate: {
				name: "利率",
				detail: "證券的年度票息率。"
			},
			yld: {
				name: "年收益率",
				detail: "證券的年收益。"
			},
			redemption: {
				name: "贖回價",
				detail: "證券到期時的贖回價值。"
			},
			frequency: {
				name: "頻次",
				detail: "每年票息付款的次數。"
			},
			basis: {
				name: "基礎",
				detail: "要使用的日計數基礎類型。"
			}
		}
	},
	ODDFYIELD: {
		description: "傳回第一期為奇數的債券的收益",
		abstract: "返回第一期為奇數的債券的收益",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/oddfyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "結算日期",
				detail: "證券的結算日期。"
			},
			maturity: {
				name: "到期日期",
				detail: "證券的到期日期。"
			},
			issue: {
				name: "發行日期",
				detail: "證券的發行日期。"
			},
			firstCoupon: {
				name: "首次付息日期",
				detail: "證券的首次付息日期。"
			},
			rate: {
				name: "利率",
				detail: "證券的年度票息率。"
			},
			pr: {
				name: "價格",
				detail: "證券的價格。"
			},
			redemption: {
				name: "贖回價",
				detail: "證券到期時的贖回價值。"
			},
			frequency: {
				name: "頻次",
				detail: "每年票息付款的次數。"
			},
			basis: {
				name: "基礎",
				detail: "要使用的日計數基礎類型。"
			}
		}
	},
	ODDLPRICE: {
		description: "返回每張票面為 ￥100 且最後一期為奇數的債券的現價",
		abstract: "返回每張票面為 ￥100 且最後一期為奇數的債券的現價",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/oddlprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "結算日期",
				detail: "證券的結算日期。"
			},
			maturity: {
				name: "到期日期",
				detail: "證券的到期日期。"
			},
			lastInterest: {
				name: "最後票息日期",
				detail: "證券的最後票息日期。"
			},
			rate: {
				name: "利率",
				detail: "證券的年度票息率。"
			},
			yld: {
				name: "年收益率",
				detail: "證券的年收益。"
			},
			redemption: {
				name: "贖回價",
				detail: "證券到期時的贖回價值。"
			},
			frequency: {
				name: "頻次",
				detail: "每年票息付款的次數。"
			},
			basis: {
				name: "基礎",
				detail: "要使用的日計數基礎類型。"
			}
		}
	},
	ODDLYIELD: {
		description: "傳回最後一期為奇數的債券的收益",
		abstract: "返回最後一期為奇數的債券的收益",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/oddlyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "結算日期",
				detail: "證券的結算日期。"
			},
			maturity: {
				name: "到期日期",
				detail: "證券的到期日期。"
			},
			lastInterest: {
				name: "最後票息日期",
				detail: "證券的最後票息日期。"
			},
			rate: {
				name: "利率",
				detail: "證券的年度票息率。"
			},
			pr: {
				name: "價格",
				detail: "證券的價格。"
			},
			redemption: {
				name: "贖回價",
				detail: "證券到期時的贖回價值。"
			},
			frequency: {
				name: "頻次",
				detail: "每年票息付款的次數。"
			},
			basis: {
				name: "基礎",
				detail: "要使用的日計數基礎類型。"
			}
		}
	},
	PDURATION: {
		description: "傳回投資到達指定值所需的期數",
		abstract: "返回投資到達指定值所需的期數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/pduration-function"
		}],
		functionParameter: {
			rate: {
				name: "利率",
				detail: "每期的利率。"
			},
			pv: {
				name: "現值",
				detail: "投資的現值。"
			},
			fv: {
				name: "未來價值",
				detail: "投資所需的未來值。"
			}
		}
	},
	PMT: {
		description: "返回年金的定期支付金額",
		abstract: "返回年金的定期支付金額",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/pmt-function"
		}],
		functionParameter: {
			rate: {
				name: "利率",
				detail: "各期的利率。"
			},
			nper: {
				name: "總期數",
				detail: "年金的總付款期數。"
			},
			pv: {
				name: "現值",
				detail: "一系列未來付款的現值或目前總額。"
			},
			fv: {
				name: "餘額",
				detail: "最後一次付款完成後，所能獲得的未來值或現金餘額。"
			},
			type: {
				name: "類型",
				detail: "數字0或1，指出付款期限。"
			}
		}
	},
	PPMT: {
		description: "返回一筆投資在給定期間內償還的本金",
		abstract: "返回一筆投資在給定期間內償還的本金",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/ppmt-function"
		}],
		functionParameter: {
			rate: {
				name: "利率",
				detail: "各期的利率。"
			},
			per: {
				name: "期數",
				detail: "求算利息的期次，其值必須介於1到nper之間。"
			},
			nper: {
				name: "總期數",
				detail: "年金的總付款期數。"
			},
			pv: {
				name: "現值",
				detail: "一系列未來付款的現值或目前總額。"
			},
			fv: {
				name: "餘額",
				detail: "最後一次付款完成後，所能獲得的未來值或現金餘額。"
			},
			type: {
				name: "類型",
				detail: "數字0或1，指出付款期限。"
			}
		}
	},
	PRICE: {
		description: "返回每張票面為 ￥100 且定期支付利息的債券的現價",
		abstract: "返回每張票面為 ￥100 且定期支付利息的債券的現價",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/price-function"
		}],
		functionParameter: {
			settlement: {
				name: "結算日期",
				detail: "證券的結算日期。"
			},
			maturity: {
				name: "到期日期",
				detail: "證券的到期日期。"
			},
			rate: {
				name: "利率",
				detail: "證券的年度票息率。"
			},
			yld: {
				name: "年收益率",
				detail: "證券的年收益。"
			},
			redemption: {
				name: "贖回價",
				detail: "證券到期時的贖回價值。"
			},
			frequency: {
				name: "頻次",
				detail: "每年票息付款的次數。"
			},
			basis: {
				name: "基礎",
				detail: "要使用的日計數基礎類型。"
			}
		}
	},
	PRICEDISC: {
		description: "返回每張票面為 ￥100 的已折現債券的現價",
		abstract: "返回每張票面為 ￥100 的已折現債券的現價",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/pricedisc-function"
		}],
		functionParameter: {
			settlement: {
				name: "結算日期",
				detail: "證券的結算日期。"
			},
			maturity: {
				name: "到期日期",
				detail: "證券的到期日期。"
			},
			discount: {
				name: "貼現率",
				detail: "證券的貼現率。"
			},
			redemption: {
				name: "贖回價",
				detail: "證券到期時的贖回價值。"
			},
			basis: {
				name: "基礎",
				detail: "要使用的日計數基礎類型。"
			}
		}
	},
	PRICEMAT: {
		description: "返回每張票面為 ￥100 且在到期日支付利息的債券的現價",
		abstract: "返回每張票面為 ￥100 且在到期日支付利息的債券的現價",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/pricemat-function"
		}],
		functionParameter: {
			settlement: {
				name: "結算日期",
				detail: "證券的結算日期。"
			},
			maturity: {
				name: "到期日期",
				detail: "證券的到期日期。"
			},
			issue: {
				name: "發行日期",
				detail: "證券的發行日期。"
			},
			rate: {
				name: "利率",
				detail: "證券的年度票息率。"
			},
			yld: {
				name: "年收益率",
				detail: "證券的年收益。"
			},
			basis: {
				name: "基礎",
				detail: "要使用的日計數基礎類型。"
			}
		}
	},
	PV: {
		description: "返回投資的現值",
		abstract: "返回投資的現值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/pv-function"
		}],
		functionParameter: {
			rate: {
				name: "利率",
				detail: "各期的利率。"
			},
			nper: {
				name: "總期數",
				detail: "年金的總付款期數。"
			},
			pmt: {
				name: "金額",
				detail: "各期給付的金額；不得在年金期限內變更。"
			},
			fv: {
				name: "餘額",
				detail: "最後一次付款完成後，所能獲得的未來值或現金餘額。"
			},
			type: {
				name: "類型",
				detail: "數字0或1，指出付款期限。"
			}
		}
	},
	RATE: {
		description: "返回年金的各期利率",
		abstract: "返回年金的各期利率",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/rate-function"
		}],
		functionParameter: {
			nper: {
				name: "總期數",
				detail: "年金的總付款期數。"
			},
			pmt: {
				name: "金額",
				detail: "各期給付的金額；不得在年金期限內變更。"
			},
			pv: {
				name: "現值",
				detail: "一系列未來付款的現值或目前總額。"
			},
			fv: {
				name: "餘額",
				detail: "最後一次付款完成後，所能獲得的未來值或現金餘額。"
			},
			type: {
				name: "類型",
				detail: "數字0或1，指出付款期限。"
			},
			guess: {
				name: "猜測值",
				detail: "對利率的猜測值。"
			}
		}
	},
	RECEIVED: {
		description: "返回完全投資型債券在到期日收回的金額",
		abstract: "返回完全投資型債券在到期日收回的金額",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/received-function"
		}],
		functionParameter: {
			settlement: {
				name: "結算日期",
				detail: "證券的結算日期。"
			},
			maturity: {
				name: "到期日期",
				detail: "證券的到期日期。"
			},
			investment: {
				name: "投資額",
				detail: "證券的投資額。"
			},
			discount: {
				name: "貼現率",
				detail: "證券的貼現率。"
			},
			basis: {
				name: "基礎",
				detail: "要使用的日計數基礎類型。"
			}
		}
	},
	RRI: {
		description: "返回某項投資成長的等效利率",
		abstract: "返回某項投資成長的等效利率",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/rri-function"
		}],
		functionParameter: {
			nper: {
				name: "總期數",
				detail: "投資的期數。"
			},
			pv: {
				name: "現值",
				detail: "投資的現值。"
			},
			fv: {
				name: "未來值",
				detail: "投資的未來值。"
			}
		}
	},
	SLN: {
		description: "傳回固定資產的每期線性折舊費",
		abstract: "返回固定資產的每期線性折舊費",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/sln-function"
		}],
		functionParameter: {
			cost: {
				name: "資產原始成本",
				detail: "資產的原始成本。"
			},
			salvage: {
				name: "資產殘餘價值",
				detail: "折舊最後的值 (有時稱為資產的殘餘價值)。"
			},
			life: {
				name: "資產使用年限",
				detail: "固定資產折舊的期數 (有時稱為固定資產的使用年限)。"
			}
		}
	},
	SYD: {
		description: "傳回某項固定資產以年限總和折舊法計算的每期折舊金額",
		abstract: "返回某項固定資產以年限總和折舊法計算的每期折舊金額",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/syd-function"
		}],
		functionParameter: {
			cost: {
				name: "資產原始成本",
				detail: "資產的原始成本。"
			},
			salvage: {
				name: "資產殘餘價值",
				detail: "折舊最後的值 (有時稱為資產的殘餘價值)。"
			},
			life: {
				name: "資產使用年限",
				detail: "固定資產折舊的期數 (有時稱為固定資產的使用年限)。"
			},
			per: {
				name: "週期",
				detail: "週期。"
			}
		}
	},
	TBILLEQ: {
		description: "返回國庫券的等價債券收益",
		abstract: "返回國庫券的等價債券收益",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/tbilleq-function"
		}],
		functionParameter: {
			settlement: {
				name: "結算日期",
				detail: "國庫券的結算日期。"
			},
			maturity: {
				name: "到期日期",
				detail: "國庫券的到期日期。"
			},
			discount: {
				name: "貼現率",
				detail: "國庫券的貼現率。"
			}
		}
	},
	TBILLPRICE: {
		description: "傳回面額 ￥100 的國庫券的價格",
		abstract: "傳回面額 ￥100 的國庫券的價格",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/tbillprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "結算日期",
				detail: "國庫券的結算日期。"
			},
			maturity: {
				name: "到期日期",
				detail: "國庫券的到期日期。"
			},
			discount: {
				name: "貼現率",
				detail: "國庫券的貼現率。"
			}
		}
	},
	TBILLYIELD: {
		description: "返回國庫券的收益率",
		abstract: "返回國庫券的收益率",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/tbillyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "結算日期",
				detail: "國庫券的結算日期。"
			},
			maturity: {
				name: "到期日期",
				detail: "國庫券的到期日期。"
			},
			pr: {
				name: "價格",
				detail: "國庫債券每 $100 美元面額的價格。"
			}
		}
	},
	VDB: {
		description: "使用餘額遞減法，傳回一筆資產在給定期間或部分期間內的折舊值",
		abstract: "使用餘額遞減法，傳回一筆資產在給定期間或部分期間內的折舊值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/vdb-function"
		}],
		functionParameter: {
			cost: {
				name: "成本",
				detail: "資產的原始成本。"
			},
			salvage: {
				name: "殘值",
				detail: "折舊最後的值 (有時稱為資產的殘餘價值)。"
			},
			life: {
				name: "使用年限",
				detail: "資產折舊的期數 (有時稱為資產的使用年限)。"
			},
			startPeriod: {
				name: "開始期間",
				detail: "要計算折舊的開始期間。"
			},
			endPeriod: {
				name: "結束期間",
				detail: "要計算折舊的結束期間。"
			},
			factor: {
				name: "速率",
				detail: "餘額遞減的速率。如果省略factor，將假設其值為2(倍率遞減法)。"
			},
			noSwitch: {
				name: "不切換",
				detail: "用於指定當折舊大於遞減餘額計算時，是否切換到直線折舊法的邏輯值。"
			}
		}
	},
	XIRR: {
		description: "返回一組現金流的內部收益率，這些現金流不一定會定期發生",
		abstract: "返回一組現金流的內部收益率，這些現金流不一定會定期發生",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/xirr-function"
		}],
		functionParameter: {
			values: {
				name: "現金流",
				detail: "一系列與 dates 的付款日期對應的現金流。第一次付款是選擇性的，而且與投資開始時的成本和付款對應。如果第一個值是成本或付款，則它必須是負值。而之後的付款都會以一年 365 天為基礎來折算。序列值必須至少包括一個正值和一個負值。"
			},
			dates: {
				name: "日期表",
				detail: "一系列與現金流對應的付款日期。日期可能會以任何順序發生。"
			},
			guess: {
				name: "猜測值",
				detail: "所猜測接近 XIRR 結果的數字。"
			}
		}
	},
	XNPV: {
		description: "傳回一組現金流的淨現值，這些現金流不一定會定期發生",
		abstract: "傳回一組現金流的淨現值，這些現金流不一定會定期發生",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/xnpv-function"
		}],
		functionParameter: {
			rate: {
				name: "貼現率",
				detail: "要套用到現金流的貼現率。"
			},
			values: {
				name: "現金流",
				detail: "一系列與 dates 的付款日期對應的現金流。第一次付款是選擇性的，而且與投資開始時的成本和付款對應。如果第一個值是成本或付款，則它必須是負值。而之後的付款都會以一年 365 天為基礎來折算。序列值必須至少包括一個正值和一個負值。"
			},
			dates: {
				name: "日期表",
				detail: "一系列與現金流對應的付款日期。日期可能會以任何順序發生。"
			}
		}
	},
	YIELD: {
		description: "返回定期支付利息的債券的收益",
		abstract: "返回定期支付利息的債券的收益",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/yield-function"
		}],
		functionParameter: {
			settlement: {
				name: "結算日期",
				detail: "證券的結算日期。"
			},
			maturity: {
				name: "到期日期",
				detail: "證券的到期日期。"
			},
			rate: {
				name: "利率",
				detail: "證券的年度票息率。"
			},
			pr: {
				name: "價格",
				detail: "證券每 $100 面額的價格。"
			},
			redemption: {
				name: "贖回價",
				detail: "證券到期時的贖回價值。"
			},
			frequency: {
				name: "頻次",
				detail: "每年票息付款的次數。"
			},
			basis: {
				name: "基礎",
				detail: "要使用的日計數基礎類型。"
			}
		}
	},
	YIELDDISC: {
		description: "返回已折現債券的年收益；例如，短期國庫券",
		abstract: "返回已折現債券的年收益；例如，短期國庫券",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/yielddisc-function"
		}],
		functionParameter: {
			settlement: {
				name: "結算日期",
				detail: "證券的結算日期。"
			},
			maturity: {
				name: "到期日期",
				detail: "證券的到期日期。"
			},
			pr: {
				name: "價格",
				detail: "證券每 $100 面額的價格。"
			},
			redemption: {
				name: "贖回價",
				detail: "證券到期時的贖回價值。"
			},
			basis: {
				name: "基礎",
				detail: "要使用的日計數基礎類型。"
			}
		}
	},
	YIELDMAT: {
		description: "返回在到期日支付利息的債券的年收益",
		abstract: "返回在到期日支付利息的債券的年收益",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/yieldmat-function"
		}],
		functionParameter: {
			settlement: {
				name: "結算日期",
				detail: "證券的結算日期。"
			},
			maturity: {
				name: "到期日期",
				detail: "證券的到期日期。"
			},
			issue: {
				name: "發行日期",
				detail: "證券的發行日期。"
			},
			rate: {
				name: "利率",
				detail: "證券的年度票息率。"
			},
			pr: {
				name: "價格",
				detail: "證券每 $100 面額的價格。"
			},
			basis: {
				name: "基礎",
				detail: "要使用的日計數基礎類型。"
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/information/zh-TW.ts
const locale$7 = {
	CELL: {
		description: "傳回有關儲存格格式、位置或內容的資訊",
		abstract: "傳回有關儲存格格式、位置或內容的資訊",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/cell-function"
		}],
		functionParameter: {
			infoType: {
				name: "資訊類型",
				detail: "指定所要傳回何種儲存格資訊類型的文字值。"
			},
			reference: {
				name: "參考",
				detail: "要取得其相關資訊的儲存格。"
			}
		}
	},
	ERROR_TYPE: {
		description: "傳回對應於錯誤類型的數字",
		abstract: "傳回對應於錯誤類型的數字",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/error-type-function"
		}],
		functionParameter: { errorVal: {
			name: "錯誤值",
			detail: "要尋找之識別數字的錯誤值。"
		} }
	},
	INFO: {
		description: "傳回有關目前操作環境的資訊",
		abstract: "傳回目前操作環境的資訊",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/info-function"
		}],
		functionParameter: { typeText: {
			name: "類型文字",
			detail: "指定要傳回資訊類型的文字。"
		} }
	},
	ISBETWEEN: {
		description: "檢查提供的數字是否介於另外兩個值之間 (無論是否包含這兩個值)。",
		abstract: "檢查提供的數字是否介於另外兩個值之間 (無論是否包含這兩個值)。",
		links: [{
			title: "教導",
			url: "https://support.google.com/docs/answer/10538337?hl=zh-Hant"
		}],
		functionParameter: {
			valueToCompare: {
				name: "比較值",
				detail: "要比較的值，以查看該值是否介於「lower_value」和「upper_value」之間。"
			},
			lowerValue: {
				name: "最小值",
				detail: "範圍的下限值，「value_to_compare」可能落在這個範圍內。"
			},
			upperValue: {
				name: "最大值",
				detail: "範圍的上限值，「value_to_compare」可能落在這個範圍內。"
			},
			lowerValueIsInclusive: {
				name: "包括最小值",
				detail: "用於指定「lower_value」這個值是否包含在範圍中 (預設是 TRUE)"
			},
			upperValueIsInclusive: {
				name: "包括最大值",
				detail: "用於指定「upper_value」這個值是否包含在範圍中 (預設是 TRUE)"
			}
		}
	},
	ISBLANK: {
		description: "這些函數統稱為 IS 函數，每個函數都會檢查指定的值，並根據結果傳回 TRUE 或 FALSE。 例如，如果數值引數為空白儲存格的參照， ISBLANK 函數就會傳回邏輯值 TRUE；否則便傳回 FALSE。",
		abstract: "這些函數統稱為 IS 函數，每個函數都會檢查指定的值，並根據結果傳回 TRUE 或 FALSE。 例如，如果數值引數為空白儲存格的參照， ISBLANK 函數就會傳回邏輯值 TRUE；否則便傳回 FALSE。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "必須。 這是要檢定的值。 Value 引數可以是空的 (空白儲存格)、錯誤、邏輯值、文字、數字，或參照值，或是上述任何項目的名稱。"
		} }
	},
	ISDATE: {
		description: "ISDATE 函式會針對特定值是否可轉換為日期傳回結果。",
		abstract: "ISDATE 函式會針對特定值是否可轉換為日期傳回結果。",
		links: [{
			title: "教導",
			url: "https://support.google.com/docs/answer/9061381?hl=zh-Hant"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "要驗證是否為日期的值。"
		} }
	},
	ISEMAIL: {
		description: "如要檢查值是否為有效的電子郵件地址，請使用 ISEMAIL 函式。這項檢查會確認值是否符合一般接受的電子郵件地址格式，但不會驗證該地址是否存在。",
		abstract: "如要檢查值是否為有效的電子郵件地址，請使用 ISEMAIL 函式。這項檢查會確認值是否符合一般接受的電子郵件地址格式，但不會驗證該地址是否存在。",
		links: [{
			title: "教導",
			url: "https://support.google.com/docs/answer/3256503?hl=zh-Hant"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "ISEMAIL(\"johndoe@yourname.com\")"
		} }
	},
	ISERR: {
		description: "這些函數統稱為 IS 函數，每個函數都會檢查指定的值，並根據結果傳回 TRUE 或 FALSE。 例如，如果數值引數為空白儲存格的參照， ISBLANK 函數就會傳回邏輯值 TRUE；否則便傳回 FALSE。",
		abstract: "這些函數統稱為 IS 函數，每個函數都會檢查指定的值，並根據結果傳回 TRUE 或 FALSE。 例如，如果數值引數為空白儲存格的參照， ISBLANK 函數就會傳回邏輯值 TRUE；否則便傳回 FALSE。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "必須。 這是要檢定的值。 Value 引數可以是空的 (空白儲存格)、錯誤、邏輯值、文字、數字，或參照值，或是上述任何項目的名稱。"
		} }
	},
	ISERROR: {
		description: "這些函數統稱為 IS 函數，每個函數都會檢查指定的值，並根據結果傳回 TRUE 或 FALSE。 例如，如果數值引數為空白儲存格的參照， ISBLANK 函數就會傳回邏輯值 TRUE；否則便傳回 FALSE。",
		abstract: "這些函數統稱為 IS 函數，每個函數都會檢查指定的值，並根據結果傳回 TRUE 或 FALSE。 例如，如果數值引數為空白儲存格的參照， ISBLANK 函數就會傳回邏輯值 TRUE；否則便傳回 FALSE。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "必須。 這是要檢定的值。 Value 引數可以是空的 (空白儲存格)、錯誤、邏輯值、文字、數字，或參照值，或是上述任何項目的名稱。"
		} }
	},
	ISEVEN: {
		description: "若數字為偶數，則傳回 TRUE",
		abstract: "若數字為偶數，則傳回 TRUE",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/iseven-function"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "要測試的值。如果值不是整數，將被截尾取整。"
		} }
	},
	ISFORMULA: {
		description: "檢查是否有參照包含公式的儲存格，並傳回 TRUE 或 FALSE。",
		abstract: "檢查是否有參照包含公式的儲存格，並傳回 TRUE 或 FALSE。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/isformula-function"
		}],
		functionParameter: { reference: {
			name: "參照",
			detail: "必須。 參考是指你想測試的儲存格。 參考可以是儲存格參考、公式，或是指向儲存格的名稱。"
		} }
	},
	ISLOGICAL: {
		description: "這些函數統稱為 IS 函數，每個函數都會檢查指定的值，並根據結果傳回 TRUE 或 FALSE。 例如，如果數值引數為空白儲存格的參照， ISBLANK 函數就會傳回邏輯值 TRUE；否則便傳回 FALSE。",
		abstract: "這些函數統稱為 IS 函數，每個函數都會檢查指定的值，並根據結果傳回 TRUE 或 FALSE。 例如，如果數值引數為空白儲存格的參照， ISBLANK 函數就會傳回邏輯值 TRUE；否則便傳回 FALSE。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "必須。 這是要檢定的值。 Value 引數可以是空的 (空白儲存格)、錯誤、邏輯值、文字、數字，或參照值，或是上述任何項目的名稱。"
		} }
	},
	ISNA: {
		description: "這些函數統稱為 IS 函數，每個函數都會檢查指定的值，並根據結果傳回 TRUE 或 FALSE。 例如，如果數值引數為空白儲存格的參照， ISBLANK 函數就會傳回邏輯值 TRUE；否則便傳回 FALSE。",
		abstract: "這些函數統稱為 IS 函數，每個函數都會檢查指定的值，並根據結果傳回 TRUE 或 FALSE。 例如，如果數值引數為空白儲存格的參照， ISBLANK 函數就會傳回邏輯值 TRUE；否則便傳回 FALSE。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "必須。 這是要檢定的值。 Value 引數可以是空的 (空白儲存格)、錯誤、邏輯值、文字、數字，或參照值，或是上述任何項目的名稱。"
		} }
	},
	ISNONTEXT: {
		description: "這些函數統稱為 IS 函數，每個函數都會檢查指定的值，並根據結果傳回 TRUE 或 FALSE。 例如，如果數值引數為空白儲存格的參照， ISBLANK 函數就會傳回邏輯值 TRUE；否則便傳回 FALSE。",
		abstract: "這些函數統稱為 IS 函數，每個函數都會檢查指定的值，並根據結果傳回 TRUE 或 FALSE。 例如，如果數值引數為空白儲存格的參照， ISBLANK 函數就會傳回邏輯值 TRUE；否則便傳回 FALSE。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "必須。 這是要檢定的值。 Value 引數可以是空的 (空白儲存格)、錯誤、邏輯值、文字、數字，或參照值，或是上述任何項目的名稱。"
		} }
	},
	ISNUMBER: {
		description: "這些函數統稱為 IS 函數，每個函數都會檢查指定的值，並根據結果傳回 TRUE 或 FALSE。 例如，如果數值引數為空白儲存格的參照， ISBLANK 函數就會傳回邏輯值 TRUE；否則便傳回 FALSE。",
		abstract: "這些函數統稱為 IS 函數，每個函數都會檢查指定的值，並根據結果傳回 TRUE 或 FALSE。 例如，如果數值引數為空白儲存格的參照， ISBLANK 函數就會傳回邏輯值 TRUE；否則便傳回 FALSE。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "必須。 這是要檢定的值。 Value 引數可以是空的 (空白儲存格)、錯誤、邏輯值、文字、數字，或參照值，或是上述任何項目的名稱。"
		} }
	},
	ISODD: {
		description: "若數字為奇數，則傳回 TRUE",
		abstract: "若數字為奇數，則傳回 TRUE",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/isodd-function"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "要測試的值。如果值不是整數，將被截尾取整。"
		} }
	},
	ISOMITTED: {
		description: "檢查 LAMBDA 中的值是否缺失，並傳回 TRUE 或 FALSE",
		abstract: "檢查 LAMBDA 中的值是否缺失，並傳回 TRUE 或 FALSE",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/isomitted-function"
		}],
		functionParameter: { argument: {
			name: "引數",
			detail: "要檢查是否省略的值，例如 LAMBDA 參數。"
		} }
	},
	ISREF: {
		description: "這些函數統稱為 IS 函數，每個函數都會檢查指定的值，並根據結果傳回 TRUE 或 FALSE。 例如，如果數值引數為空白儲存格的參照， ISBLANK 函數就會傳回邏輯值 TRUE；否則便傳回 FALSE。",
		abstract: "這些函數統稱為 IS 函數，每個函數都會檢查指定的值，並根據結果傳回 TRUE 或 FALSE。 例如，如果數值引數為空白儲存格的參照， ISBLANK 函數就會傳回邏輯值 TRUE；否則便傳回 FALSE。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "必須。 這是要檢定的值。 Value 引數可以是空的 (空白儲存格)、錯誤、邏輯值、文字、數字，或參照值，或是上述任何項目的名稱。"
		} }
	},
	ISTEXT: {
		description: "這些函數統稱為 IS 函數，每個函數都會檢查指定的值，並根據結果傳回 TRUE 或 FALSE。 例如，如果數值引數為空白儲存格的參照， ISBLANK 函數就會傳回邏輯值 TRUE；否則便傳回 FALSE。",
		abstract: "這些函數統稱為 IS 函數，每個函數都會檢查指定的值，並根據結果傳回 TRUE 或 FALSE。 例如，如果數值引數為空白儲存格的參照， ISBLANK 函數就會傳回邏輯值 TRUE；否則便傳回 FALSE。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "必須。 這是要檢定的值。 Value 引數可以是空的 (空白儲存格)、錯誤、邏輯值、文字、數字，或參照值，或是上述任何項目的名稱。"
		} }
	},
	ISURL: {
		description: "檢查特定值是否為有效的網址。",
		abstract: "檢查特定值是否為有效的網址。",
		links: [{
			title: "教導",
			url: "https://support.google.com/docs/answer/3256501?hl=zh-Hant"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "要驗證是否為網址的值。"
		} }
	},
	N: {
		description: "返回轉換為數字的值",
		abstract: "返回轉換為數字的值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/n-function"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "要轉換的值。"
		} }
	},
	NA: {
		description: "傳回錯誤值 #N/A",
		abstract: "傳回錯誤值 #N/A",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/na-function"
		}],
		functionParameter: {}
	},
	SHEET: {
		description: "傳回引用工作表的工作表編號",
		abstract: "傳回引用工作表的工作表編號",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/sheet-function"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "要輸入工作表編號的工作表名稱或參照。 如果省略，SHEET 會傳回包含該函數的工作表編號。"
		} }
	},
	SHEETS: {
		description: "傳回工作簿中的工作表數",
		abstract: "傳回工作簿中的工作表數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/sheets-function"
		}],
		functionParameter: {}
	},
	TYPE: {
		description: "傳回表示值的資料型別的數字",
		abstract: "傳回表示值的資料型別的數字",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/type-function"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "這可以是任何值，如數字、文字、邏輯值等。"
		} }
	}
};

//#endregion
//#region src/locale/function-list/logical/zh-TW.ts
const locale$6 = {
	AND: {
		description: "如果其所有參數均為 TRUE，則傳回 TRUE",
		abstract: "如果其所有參數均為 TRUE，則傳回 TRUE",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/and-function"
		}],
		functionParameter: {
			logical1: {
				name: "邏輯值 1",
				detail: "第一個想要測試且計算結果可為 TRUE 或 FALSE 的條件。 "
			},
			logical2: {
				name: "邏輯值 2",
				detail: "其他想要測試且計算結果可為 TRUE 或 FALSE 的條件（最多 255 個條件）。 "
			}
		}
	},
	BYCOL: {
		description: "將 LAMBDA 套用至每個欄位並傳回結果陣列",
		abstract: "將 LAMBDA 套用至每個欄位並傳回結果陣列",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/bycol-function"
		}],
		functionParameter: {
			array: {
				name: "陣列",
				detail: "以欄分隔的陣列。"
			},
			lambda: {
				name: "lambda",
				detail: "採用欄作為單一參數並計算一個結果的 LAMBDA。LAMBDA 採用單一參數：陣列中的欄位。"
			}
		}
	},
	BYROW: {
		description: "將 LAMBDA 套用到每一列，並傳回結果陣列。",
		abstract: "將 LAMBDA 套用到每一列，並傳回結果陣列。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/byrow-function"
		}],
		functionParameter: {
			array: {
				name: "陣列",
				detail: "以列分隔的陣列。"
			},
			lambda: {
				name: "lambda",
				detail: "採用資料列作為單一參數並計算一個結果的 LAMBDA。 LAMBDA 接受單一參數：陣列中的一列。"
			}
		}
	},
	FALSE: {
		description: "傳回邏輯值 FALSE",
		abstract: "傳回邏輯值 FALSE",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/false-function"
		}],
		functionParameter: {}
	},
	IF: {
		description: "指定要執行的邏輯檢測",
		abstract: "指定要執行的邏輯偵測",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/if-function"
		}],
		functionParameter: {
			logicalTest: {
				name: "布林表達式",
				detail: "要測試的條件。 "
			},
			valueIfTrue: {
				name: "如果值為 true",
				detail: "logical_test 的結果為 TRUE 時，希望傳回的值。 "
			},
			valueIfFalse: {
				name: "如果值為 false",
				detail: "logical_test 的結果為 FALSE 時，希望傳回的值。 "
			}
		}
	},
	IFERROR: {
		description: "如果公式的計算結果錯誤，則傳回指定的值；否則傳回公式的結果",
		abstract: "如果公式的計算結果錯誤，則傳回指定的值；否則傳回公式的結果",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/iferror-function"
		}],
		functionParameter: {
			value: {
				name: "值",
				detail: " 檢查是否有錯誤的參數。 "
			},
			valueIfError: {
				name: "錯誤時傳回值",
				detail: "公式計算結果為錯誤時要傳回的值。 評估以下錯誤類型：#N/A、#VALUE!、#REF!、#DIV/0!、#NUM!、#NAME? 或 #NULL!。 "
			}
		}
	},
	IFNA: {
		description: "如果該表達式解析為 #N/A，則傳回指定值；否則傳回該表達式的結果",
		abstract: "如果該表達式解析為 #N/A，則傳回指定值；否則傳回該表達式的結果",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/ifna-function"
		}],
		functionParameter: {
			value: {
				name: "值",
				detail: "已核取 #N/A 錯誤值的自變數。"
			},
			valueIfNa: {
				name: "如果為#N/A的值",
				detail: "如果公式評估為 #N/A 錯誤值，要傳回的值。"
			}
		}
	},
	IFS: {
		description: " 檢查是否符合一個或多個條件，是否傳回與第一個 TRUE 條件對應的值。 ",
		abstract: " 檢查是否滿足一個或多個條件，是否傳回與第一個 TRUE 條件對應的值。 ",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/ifs-function"
		}],
		functionParameter: {
			logicalTest1: {
				name: "條件1",
				detail: "要評估的第一個條件，可以是布林值、數值、陣列或指向這些值的參考。"
			},
			valueIfTrue1: {
				name: "值1",
				detail: "“條件1”為“TRUE”的情況下傳回的值。"
			},
			logicalTest2: {
				name: "條件2",
				detail: "之前的條件為“FALSE”的情況下，要評估的其他條件。"
			},
			valueIfTrue2: {
				name: "值2",
				detail: "對應條件為“TRUE”的情況下傳回的其他值。"
			}
		}
	},
	LAMBDA: {
		description: "使用 LAMBDA 函數建立可重複使用的自訂函數，並使用易記名稱呼叫它們。 新函數在整個工作簿中可用，其呼叫類似本機 Excel 函數。 ",
		abstract: "建立自訂、可重用的函數，並透過友善名稱呼叫它們",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/lambda-function"
		}],
		functionParameter: {
			parameter: {
				name: "參數",
				detail: "要傳遞給函數的值，例如儲存格參考、字串或數字。 最多可以輸入 253 個參數。 此參數可選。 "
			},
			calculation: {
				name: "計算",
				detail: "要作為函數結果執行並傳回的公式。 其必須為最後一個參數，且必須傳回結果。 此參數是必需項。 "
			}
		}
	},
	LET: {
		description: "將名稱分配給計算結果",
		abstract: "將名稱分配給計算結果",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/let-function"
		}],
		functionParameter: {
			name1: {
				name: "名稱1",
				detail: "第一個指派的名稱。必須以字母開頭。不能是公式的輸出結果，或與範圍語法衝突。"
			},
			nameValue1: {
				name: "值1",
				detail: "指派給名稱1(name 1)的值。"
			},
			calculationOrName2: {
				name: "計算或名稱2",
				detail: "下列其中一項：\n1.使用 LET 函數中所有名稱的計算。這必須是 LET 函數中的最後一個引數。\n2.指派給第二個 name_value 的第二個名稱。若有指定名稱，則必須要有 name_value2 和 calculation_ 或 _name3。"
			},
			nameValue2: {
				name: "值2",
				detail: "指派給 calculation_or_name2 的值。"
			},
			calculationOrName3: {
				name: "計算或名稱3",
				detail: "下列其中一項：\n1.使用 LET 函數中所有名稱的計算。LET 函數中的最後一個引數必須是計算。\n2.指派給第三個 name_value 的第三個名稱。若有指定名稱，則必須要有 name_value3 和 calculation_ 或 _name4。"
			}
		}
	},
	MAKEARRAY: {
		description: "透過應用 LAMBDA 傳回指定列和欄大小的計算陣列",
		abstract: "透過應用 LAMBDA 傳回指定列和欄大小的計算陣列",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/makearray-function"
		}],
		functionParameter: {
			number1: {
				name: "列數",
				detail: "陣列中的列數。 必須大於零"
			},
			number2: {
				name: "欄數",
				detail: "陣列中的欄數。 必須大於零"
			},
			value3: {
				name: "lambda",
				detail: "呼叫 LAMBDA 來建立陣列。 LAMBDA 接受兩個參數:row陣列的列索引, col陣列的欄索引"
			}
		}
	},
	MAP: {
		description: "透過套用 LAMBDA 建立新值，傳回將陣列中每個值對應到新值所形成的陣列。",
		abstract: "透過套用 LAMBDA 建立新值，傳回將陣列中每個值對應到新值所形成的陣列。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/map-function"
		}],
		functionParameter: {
			array1: {
				name: "陣列1",
				detail: "要對應的陣列1。"
			},
			array2: {
				name: "陣列2",
				detail: "要對應的陣列2。"
			},
			lambda: {
				name: "lambda",
				detail: "LAMBDA 必須是最後一個引數，也必須為每個陣列傳遞一個參數。"
			}
		}
	},
	NOT: {
		description: "對其參數的邏輯求反",
		abstract: "對其參數的邏輯求反",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/not-function"
		}],
		functionParameter: { logical: {
			name: "邏輯表達式",
			detail: "要反轉邏輯的條件，可評估為 TRUE 或 FALSE。"
		} }
	},
	OR: {
		description: "如果 OR 函數的任意參數計算為 TRUE，則其傳回 TRUE；如果其所有參數均計算機為 FALSE，則傳回 FALSE。 ",
		abstract: "若任一參數為 TRUE，則傳回 TRUE",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/or-function"
		}],
		functionParameter: {
			logical1: {
				name: "邏輯表達式 1",
				detail: "第一個想要測試且計算結果可為 TRUE 或 FALSE 的條件。 "
			},
			logical2: {
				name: "邏輯表達式 2",
				detail: "其他想要測試且計算結果可為 TRUE 或 FALSE 的條件（最多 255 個條件）。 "
			}
		}
	},
	REDUCE: {
		description: "透過將 LAMBDA 套用至每個值並傳回累加器中的總值，將陣列減少為累積值",
		abstract: "透過將 LAMBDA 套用至每個值並傳回累加器中的總值，將陣列減少為累積值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/reduce-function"
		}],
		functionParameter: {
			initialValue: {
				name: "起始值",
				detail: "設定累計值的起始值。"
			},
			array: {
				name: "陣列",
				detail: "要縮減的陣列。"
			},
			lambda: {
				name: "lambda",
				detail: "呼叫用於縮減陣列的 LAMBDA。 LAMBDA 需要三個參數：1.值已加總且傳回為最終結果。2.陣列的目前值。3.計算套用至陣列中每個元素。"
			}
		}
	},
	SCAN: {
		description: "透過將 LAMBDA 應用於每個值來掃描陣列，並傳回具有每個中間值的陣列",
		abstract: "透過將 LAMBDA 套用至每個值來掃描陣列，並傳回具有每個中間值的陣列",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/scan-function"
		}],
		functionParameter: {
			initialValue: {
				name: "起始值",
				detail: "設定累計值的起始值。"
			},
			array: {
				name: "陣列",
				detail: "要掃描的陣列。"
			},
			lambda: {
				name: "lambda",
				detail: "呼叫用於掃描陣列的 LAMBDA。 LAMBDA 需要三個參數：1.值已加總且傳回為最終結果。2.陣列的目前值。3.計算套用至陣列中每個元素。"
			}
		}
	},
	SWITCH: {
		description: "根據值列表計算表達式，並傳回與第一個匹配值對應的結果。 如果不匹配，則可能傳回可選預設值。 ",
		abstract: "根據值列表計算表達式，並傳回與第一個符合值對應的結果。 如果不匹配，則可能傳回可選預設值。 ",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/switch-function"
		}],
		functionParameter: {
			expression: {
				name: "表達式",
				detail: "表達式是將要與 值1…值126 進行比較的值（例如數字、日期或一些文字）。"
			},
			value1: {
				name: "值1",
				detail: "值N 是將要與表達式進行比較的值。"
			},
			result1: {
				name: "結果1",
				detail: "結果N 是對應的值N 參數與表達式匹配時要傳回的值。必須為每個對應的值N 參數提供結果N。"
			},
			defaultOrValue2: {
				name: "預設或值2",
				detail: "預設是在值N 表達式中找不到匹配項時要傳回的值。預設參數透過沒有對應的結果N 表達式來識別（請參閱範例）。預設必須是函數中的最後一個參數。"
			},
			result2: {
				name: "結果2",
				detail: "結果N 是對應的值N 參數與表達式匹配時要傳回的值。必須為每個對應的值N 參數提供結果N。"
			}
		}
	},
	TRUE: {
		description: "傳回邏輯值 TRUE",
		abstract: "傳回邏輯值 TRUE",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/true-function"
		}],
		functionParameter: {}
	},
	XOR: {
		description: "傳回所有參數的邏輯「異或」值",
		abstract: "傳回所有參數的邏輯「異或」值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/xor-function"
		}],
		functionParameter: {
			logical1: {
				name: "邏輯表達式 1",
				detail: "第一個想要測試且計算結果可為 TRUE 或 FALSE 的條件。 "
			},
			logical2: {
				name: "邏輯表達式 2",
				detail: "其他想要測試且計算結果可為 TRUE 或 FALSE 的條件（最多 255 個條件）。 "
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/lookup/zh-TW.ts
const locale$5 = {
	ADDRESS: {
		description: "根據指定列號和欄號獲得工作表中的某個儲存格的位址。 例如，ADDRESS(2,3) 傳回 $C$2。 再例如，ADDRESS(77,300) 回傳 $KN$77。 可以使用其他函數（如 ROW 和 COLUMN 函數）為 ADDRESS 函數提供列號和欄號參數。 ",
		abstract: "以文字形式將參考值傳回工作表的單一儲存格",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/address-function"
		}],
		functionParameter: {
			row_num: {
				name: "列號",
				detail: "一個數值，指定要使用儲存格的列號。 "
			},
			column_num: {
				name: "欄號",
				detail: "一個數值，指定要在儲存格參考中使用的欄號。 "
			},
			abs_num: {
				name: "引用型別",
				detail: "一個數值，指定要傳回的參考型別。 "
			},
			a1: {
				name: "引用樣式",
				detail: "一個邏輯值，指定 A1 或 R1C1 引用樣式。 在 A1 樣式中，欄和列將分別按字母和數字順序新增標籤。 在 R1C1 引用樣式中，欄和列均會依數字順序新增標籤。 如果參數 A1 為 TRUE 或省略，則 ADDRESS 函數傳回 A1 樣式參考；如果為 FALSE，則 ADDRESS 函數傳回 R1C1 樣式參考。 "
			},
			sheet_text: {
				name: "工作表名稱",
				detail: "一個文字值，指定要用作外部參考的工作表的名稱。 例如，公式=ADDRESS (1，1,,,\"Sheet2\") 回傳 Sheet2！ $A$1。 如果 sheet_text 參數，則不使用工作表名稱，函數傳回的位址會引用目前工作表上的儲存格。 "
			}
		}
	},
	AREAS: {
		description: "傳回引用中涉及的區域個數",
		abstract: "傳回引用中涉及的區域數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/areas-function"
		}],
		functionParameter: { reference: {
			name: "引用",
			detail: "儲存格或儲存格範圍的參照，而且可參照多個區域。"
		} }
	},
	CHOOSE: {
		description: "從值的清單中選擇值。 ",
		abstract: "從值的清單中選擇值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/choose-function"
		}],
		functionParameter: {
			indexNum: {
				name: "索引",
				detail: "用於指定所選取的數值參數。 index_num 必須是介於 1 到 254 之間的數字，或是包含 1 到 254 之間的數字的公式或儲存格參考。 \n如果 index_num 為 1，則 CHOOSE 傳回 value1；如果為 2，則 CHOOSE 傳回 value2，以此類推。 \n如果 index_num 小於 1 或大於清單中最後一個值的索引號，則 CHOOSE 傳回 #VALUE! 錯誤值。 \n如果 index_num 為小數，則在使用前會被截尾取整。 "
			},
			value1: {
				name: "值 1",
				detail: "CHOOSE 將根據 index_num 從中選擇一個數值或一項要執行的操作。 參數可以是數字、儲存格引用、定義的名稱、公式、函數或文字。 "
			},
			value2: {
				name: "值 2",
				detail: "1 到 254 個值參數。 "
			}
		}
	},
	CHOOSECOLS: {
		description: "傳回數組中的指定列",
		abstract: "傳回數組中的指定列",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/choosecols-function"
		}],
		functionParameter: {
			array: {
				name: "陣列",
				detail: "包含要在新陣列中傳回之欄的陣列。"
			},
			colNum1: {
				name: "欄數1",
				detail: "要返回的第一欄。"
			},
			colNum2: {
				name: "欄數2",
				detail: "要返回的其他欄。"
			}
		}
	},
	CHOOSEROWS: {
		description: "傳回數組中的指定行",
		abstract: "傳回數組中的指定行",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/chooserows-function"
		}],
		functionParameter: {
			array: {
				name: "陣列",
				detail: "包含要在新陣列中傳回之欄的陣列。"
			},
			rowNum1: {
				name: "列數1",
				detail: "要返回的第一列數。"
			},
			rowNum2: {
				name: "列數2",
				detail: "要返回的其他列數。"
			}
		}
	},
	COLUMN: {
		description: "傳回給定儲存格引用的欄號。 ",
		abstract: "傳回引用的欄號",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/column-function"
		}],
		functionParameter: { reference: {
			name: "引用",
			detail: "要傳回其欄號的儲存格或儲存格範圍。 "
		} }
	},
	COLUMNS: {
		description: "傳回陣列或引用的欄數。 ",
		abstract: "傳回引用中包含的欄數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/columns-function"
		}],
		functionParameter: { array: {
			name: "陣列",
			detail: "要計算欄數的陣列、陣列公式或是對儲存格區域的參考。 "
		} }
	},
	DROP: {
		description: "從陣列的開頭或結尾排除指定數量的行或列",
		abstract: "從陣列的開頭或結尾排除指定數量的行或列",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/drop-function"
		}],
		functionParameter: {
			array: {
				name: "陣列",
				detail: "要排除列或欄的陣列。"
			},
			rows: {
				name: "列數",
				detail: "要排除的列數。負值會從陣列結尾排除。"
			},
			columns: {
				name: "欄數",
				detail: "要排除的欄數。負值會從陣列結尾排除。"
			}
		}
	},
	EXPAND: {
		description: "將陣列展開或填入指定的行和列維度",
		abstract: "將陣列展開或填入指定的行和列維度",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/expand-function"
		}],
		functionParameter: {
			array: {
				name: "陣列",
				detail: "要展開的陣列。"
			},
			rows: {
				name: "列數",
				detail: "展開陣列中的列數。 如果遺失，將不會展開列。"
			},
			columns: {
				name: "欄數",
				detail: "展開陣列中的欄數。 如果遺失，欄將不會展開。"
			},
			padWith: {
				name: "填塞值",
				detail: "要填塞的值。 預設值為 #N/A。"
			}
		}
	},
	FILTER: {
		description: "FILTER 函數可以基於定義的條件篩選一系列資料。 ",
		abstract: "FILTER 函數可以基於定義的條件篩選一系列資料。 ",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/filter-function"
		}],
		functionParameter: {
			array: {
				name: "陣列",
				detail: "要篩選的區域或陣列。"
			},
			include: {
				name: "布林值數組",
				detail: "布林值數組，其中 TRUE 表示要保留的一行或一列。"
			},
			ifEmpty: {
				name: "空值返回",
				detail: "如果未保留任何項，則傳回。"
			}
		}
	},
	FORMULATEXT: {
		description: "將給定引用的公式傳回為文字",
		abstract: "將給定引用的公式傳回為文字",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/formulatext-function"
		}],
		functionParameter: { reference: {
			name: "引用",
			detail: "單元格或儲存格範圍的參照。"
		} }
	},
	GETPIVOTDATA: {
		description: "GETPIVOTDATA 函數會傳回樞紐分析表中的可見資料。",
		abstract: "GETPIVOTDATA 函數會傳回樞紐分析表中的可見資料。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/getpivotdata-function"
		}],
		functionParameter: {
			dataField: {
				name: "dataField",
				detail: "樞紐分析表欄位名稱，該欄位包含您要擷取的資料。 這必須以引號括住。 範例： =GETPIVOTDATA (「銷售」，A3) 。 這裡，「銷售」是我們想要取得的價值欄位。 由於未指定其他欄位，GETPIVOTDATA 會回傳總銷售金額。"
			},
			pivotTable: {
				name: "pivotTable",
				detail: "這是樞紐分析表中之任何儲存格、儲存格範圍或已命名儲存格範圍的參照。 此資訊是用來判斷哪個樞紐分析表含有所要擷取的資料。 範例： =GETPIVOTDATA (「銷售」，A3) 。 這裡，A3 是樞紐分析表內的參考，並告訴公式該使用哪個樞紐分析表。"
			},
			field1: {
				name: "field1",
				detail: "這是 1 至 126 對的欄位名稱和項目名稱，用以描述所要擷取的資料。 這些配對組合可以依任意次序排列。 欄位名稱以及非日期和數字的項目名稱都必須以引號括住。 範例： =GETPIVOTDATA (「銷售」、A3、「月份」、「三月」) 。 這裡，「月份」是欄位，「Mar」是項目。 若要指定欄位中的多個項目，請將它們包圍在捲括 (例如：{“Mar”， “Apr”}) 。 若是 OLAP 樞紐分析表 ，項目可以包含維度的來源名稱，也可以包含項目的來源名稱。 OLAP 樞紐分析表的欄位和項目配對看起來可能像這樣： \"[產品]\",\"[產品].[所有產品].[食物].[烘培食物]\""
			},
			item1: {
				name: "item1",
				detail: "這是 1 至 126 對的欄位名稱和項目名稱，用以描述所要擷取的資料。 這些配對組合可以依任意次序排列。 欄位名稱以及非日期和數字的項目名稱都必須以引號括住。 範例： =GETPIVOTDATA (「銷售」、A3、「月份」、「三月」) 。 這裡，「月份」是欄位，「Mar」是項目。 若要指定欄位中的多個項目，請將它們包圍在捲括 (例如：{“Mar”， “Apr”}) 。 若是 OLAP 樞紐分析表 ，項目可以包含維度的來源名稱，也可以包含項目的來源名稱。 OLAP 樞紐分析表的欄位和項目配對看起來可能像這樣： \"[產品]\",\"[產品].[所有產品].[食物].[烘培食物]\""
			}
		}
	},
	HLOOKUP: {
		description: "在表格的首列或數值陣列中搜尋值，然後傳回表格或陣列中指定列的所在欄中的值。 ",
		abstract: "找出陣列的首列，並傳回指定儲存格的值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/hlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "查找值",
				detail: "要尋找的值。 要尋找的值必須位於 table_array 參數中指定的儲存格區域的第一列中。 "
			},
			tableArray: {
				name: "範圍",
				detail: "VLOOKUP 在其中搜尋 lookup_value 和傳回值的儲存格區域。在其中尋找資料的資訊表。 使用區域或區域名稱的引用。 "
			},
			rowIndexNum: {
				name: "列號",
				detail: "列號table_array符合值將傳回的列號（row_index_num為 1，則傳回 table_array 中的第一列值，row_index_num 2 傳回 table_array 中的第二列值）。 "
			},
			rangeLookup: {
				name: "查詢類型",
				detail: "指定希望查找精確匹配值還是近似匹配值：預設近似匹配 - 1/TRUE, 完全匹配 - 0/FALSE"
			}
		}
	},
	HSTACK: {
		description: "水平並按順序附加陣列，以傳回較大的陣列。",
		abstract: "水平並按順序附加陣列，以傳回較大的陣列。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/hstack-function"
		}],
		functionParameter: {
			array1: {
				name: "陣列",
				detail: "每個陣列參數的列數最大值。"
			},
			array2: {
				name: "陣列",
				detail: "每個陣列參數中所有欄位的總和。"
			}
		}
	},
	HYPERLINK: {
		description: "在儲存格內建立超連結。",
		abstract: "在儲存格內建立超連結。",
		links: [{
			title: "教導",
			url: "https://support.google.com/docs/answer/3093313?hl=zh-Hant"
		}],
		functionParameter: {
			url: {
				name: "網址",
				detail: "連結位置的完整網址 (括在引號中)，或是包含這類網址的儲存格參照。"
			},
			linkLabel: {
				name: "連結標籤",
				detail: "要顯示在儲存格中做為連結的文字，括在引號中，或者為包含此標籤的儲存格參照。"
			}
		}
	},
	IMAGE: {
		description: "從給定來源返回圖像",
		abstract: "從給定來源返回映像",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/image-function"
		}],
		functionParameter: {
			source: {
				name: "source",
				detail: "使用 「HTTP」 通訊協定之影像檔案的 URL 路徑。"
			},
			altText: {
				name: "alt_text",
				detail: "描述協助工具影像的替代文字。"
			},
			sizing: {
				name: "sizing",
				detail: "指定影像維度。"
			},
			height: {
				name: "height",
				detail: "影像的自訂高度 (像素)。"
			},
			width: {
				name: "width",
				detail: "影像的自訂寬度 (像素)。"
			}
		}
	},
	INDEX: {
		description: "傳回指定的列與欄交叉處的儲存格參考。 如果引用由不連續的選取區域組成，可以選擇某一選取區域。 ",
		abstract: "使用索引從引用或陣列中選擇值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/index-function"
		}],
		functionParameter: {
			reference: {
				name: "引用",
				detail: "對一個或多個儲存格區域的引用。"
			},
			rowNum: {
				name: "列號",
				detail: "引用中某列的列號，函數從該列傳回一個引用。 "
			},
			columnNum: {
				name: "欄號",
				detail: "引用中某欄的欄標，函數從該欄傳回一個引用。 "
			},
			areaNum: {
				name: "區域編號",
				detail: "選擇要傳回列號和欄號的交叉點的參考區域。"
			}
		}
	},
	INDIRECT: {
		description: "傳回由文字字串指定的引用。 此函數立即對引用進行計算，並顯示其內容。 ",
		abstract: "傳回由文字值指定的參考",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/indirect-function"
		}],
		functionParameter: {
			refText: {
				name: "引用文字",
				detail: "對包含 A1 樣式引用、R1C1 樣式引用、定義為引用的名稱或作為文字字串引用的儲存格的引用的引用。"
			},
			a1: {
				name: "引用類型",
				detail: "一個邏輯值，用於指定包含在儲存格引用文字中的引用的類型。"
			}
		}
	},
	LOOKUP: {
		description: "當需要查詢一行或一列並查找另一行或列中的相同位置的值時使用",
		abstract: "在向量或陣列中找出值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/lookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "查找值",
				detail: "在第一個向量中搜尋的值。可以是數字、文字、邏輯值、名稱或對值的引用。 "
			},
			lookupVectorOrArray: {
				name: "查詢範圍或陣列",
				detail: "只包含一行或一列的區域。 "
			},
			resultVector: {
				name: "結果範圍",
				detail: " 只包含一行或一列的區域。參數必須與 lookup_vector 參數大小相同。 其大小必須相同。 "
			}
		}
	},
	MATCH: {
		description: "使用 MATCH 函數在 範圍 儲存格中搜尋特定的項，然後傳回該項在此區域中的相對位置。",
		abstract: "在參考或陣列中尋找值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/match-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "尋找值",
				detail: "要在 lookup_array 中符合的值。"
			},
			lookupArray: {
				name: "搜尋區域",
				detail: "要搜尋的儲存格區域。"
			},
			matchType: {
				name: "符合類型",
				detail: "數字 -1、0 或 1。"
			}
		}
	},
	OFFSET: {
		description: "從給定參考傳回引用偏移量",
		abstract: "從給定引用返回引用偏移",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/offset-function"
		}],
		functionParameter: {
			reference: {
				name: "引用",
				detail: "要基於偏移量的參考。"
			},
			rows: {
				name: "列數",
				detail: "需要左上角儲存格引用的向上或向下列數。"
			},
			cols: {
				name: "欄數",
				detail: "需要結果的左上角儲存格引用的從左到右的欄數。"
			},
			height: {
				name: "列高",
				detail: "需要傳回的引用的列高。列高必須為正數。"
			},
			width: {
				name: "欄寬",
				detail: "需要傳回的引用的欄寬。欄寬必須為正數。"
			}
		}
	},
	ROW: {
		description: "傳回給定儲存格引用的列號。 ",
		abstract: "傳回引用的列號",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/row-function"
		}],
		functionParameter: { reference: {
			name: "引用",
			detail: "需要取得其列號的儲存格或儲存格區域。 "
		} }
	},
	ROWS: {
		description: "傳回陣列或引用的列數。 ",
		abstract: "傳回引用中的列數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/rows-function"
		}],
		functionParameter: { array: {
			name: "陣列",
			detail: "需要取得其列數的陣列、陣列公式或對儲存格區域的參考。 "
		} }
	},
	RTD: {
		description: "從支援 COM 自動化的程式中擷取即時資料",
		abstract: "從支援 COM 自動化的程式中擷取即時資料",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/rtd-function"
		}],
		functionParameter: {
			progId: {
				name: "程式識別碼",
				detail: "本機安裝之 COM 自動化增益集的程式識別碼。"
			},
			server: {
				name: "伺服器",
				detail: "執行增益集的伺服器名稱；本機伺服器請使用空字串。"
			},
			topic1: {
				name: "主題 1",
				detail: "指定要擷取之即時資料的第一個文字。"
			},
			topic2: {
				name: "主題 2",
				detail: "選用。指定即時資料的其他文字。"
			}
		}
	},
	SORT: {
		description: "將區域或陣列的內容排序",
		abstract: "將區域或陣列的內容排序",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/sort-function"
		}],
		functionParameter: {
			array: {
				name: "陣列",
				detail: "要排序的範圍或陣列。"
			},
			sortIndex: {
				name: "排序索引",
				detail: "表示排序依據(按列或按欄)的數字。"
			},
			sortOrder: {
				name: "排序順序",
				detail: "表示所需排序順序的數字；1表示順序(預設)，-1表示降序。"
			},
			byCol: {
				name: "排序方向",
				detail: "表示所需排序方向的邏輯值；FALSE指依列排序(預設)，TRUE指依欄排序。"
			}
		}
	},
	SORTBY: {
		description: "根據對應區域或陣列中的值對區域或陣列的內容進行排序",
		abstract: "根據對應區域或陣列中的值對區域或陣列的內容進行排序",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/sortby-function"
		}],
		functionParameter: {
			array: {
				name: "陣列",
				detail: "要排序的範圍或陣列。"
			},
			byArray1: {
				name: "排序數組1",
				detail: "若要基於其進行排序的範圍或陣列。"
			},
			sortOrder1: {
				name: "排序順序1",
				detail: "表示所需排序順序的數字；1表示順序(預設)，-1表示降序。"
			},
			byArray2: {
				name: "排序數組2",
				detail: "若要基於其進行排序的範圍或陣列。"
			},
			sortOrder2: {
				name: "排序順序2",
				detail: "表示所需排序順序的數字；1表示順序(預設)，-1表示降序。"
			}
		}
	},
	TAKE: {
		description: "從陣列的開頭或結尾傳回指定數量的連續行或列",
		abstract: "從陣列的開頭或結尾傳回指定數量的連續行或列",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/take-function"
		}],
		functionParameter: {
			array: {
				name: "陣列",
				detail: "要取用列或欄的陣列。"
			},
			rows: {
				name: "列數",
				detail: "要取用的列數。負值會從陣列結尾取用。"
			},
			columns: {
				name: "欄數",
				detail: "要取用的欄數。負值會從陣列結尾取用。"
			}
		}
	},
	TOCOL: {
		description: "傳回單一欄中的陣列。",
		abstract: "傳回單一欄中的陣列。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/tocol-function"
		}],
		functionParameter: {
			array: {
				name: "陣列",
				detail: "要以欄返回的陣列或參照。"
			},
			ignore: {
				name: "忽略值",
				detail: "是否要忽略特定類型的值。 根據預設，不會忽略任何值。 指定下列其中一項動作：\n0 保留所有值 (預設)\n1 略過空白\n2 略過錯誤\n3 略過空白和錯誤"
			},
			scanByColumn: {
				name: "依欄掃描陣列",
				detail: "依欄掃描陣列。 根據預設，陣列會以列掃描。 掃描會決定值是依列或欄排序。"
			}
		}
	},
	TOROW: {
		description: "傳回單一列中的陣列。",
		abstract: "傳回單一列中的陣列。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/torow-function"
		}],
		functionParameter: {
			array: {
				name: "陣列",
				detail: "要以列返回的陣列或參照。"
			},
			ignore: {
				name: "忽略值",
				detail: "是否要忽略特定類型的值。 根據預設，不會忽略任何值。 指定下列其中一項動作：\n0 保留所有值 (預設)\n1 略過空白\n2 略過錯誤\n3 略過空白和錯誤"
			},
			scanByColumn: {
				name: "依欄掃描陣列",
				detail: "依欄掃描陣列。 根據預設，陣列會以列掃描。 掃描會決定值是依列或欄排序。"
			}
		}
	},
	TRANSPOSE: {
		description: "傳回數組的轉置",
		abstract: "傳回陣列的轉置",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/transpose-function"
		}],
		functionParameter: { array: {
			name: "陣列",
			detail: "工作表中的儲存格區域或陣列。"
		} }
	},
	UNIQUE: {
		description: "傳回清單或區域的唯一值清單",
		abstract: "傳回清單或區域的唯一值清單",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/unique-function"
		}],
		functionParameter: {
			array: {
				name: "陣列",
				detail: "從中傳回唯一行或列的範圍或陣列。"
			},
			byCol: {
				name: "依據列",
				detail: "是一個邏輯值：將行彼此比較並傳回唯一值 = FALSE，或已省略；將列彼此比較並傳回唯一值 = TRUE。"
			},
			exactlyOnce: {
				name: "僅一次",
				detail: "是邏輯值：從陣列傳回只出現一次的行或列 = TRUE；從陣列傳回所有不同的行或列 = FALSE，或已省略。"
			}
		}
	},
	VLOOKUP: {
		description: "需要在表格或區域中按列查找內容時，請使用 VLOOKUP。 例如，按零件號碼找出汽車零件的價格，或根據員工 ID 尋找員工姓名。 ",
		abstract: "在陣列第一欄中查找，然後在列之間移動以返回儲存格的值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/vlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "查找值",
				detail: "要尋找的值。 要尋找的值必須位於 table_array 參數中指定的儲存格區域的第一欄。 "
			},
			tableArray: {
				name: "範圍",
				detail: "VLOOKUP 在其中搜尋 lookup_value 和傳回值的儲存格區域。 可以使用命名區域或表，並且可以在參數中使用名稱，而不是儲存格參考。 "
			},
			colIndexNum: {
				name: "欄號",
				detail: "其中包含傳回值的儲存格的編號（table_array 最左側儲存格為 1 開始編號）。 "
			},
			rangeLookup: {
				name: "查詢類型",
				detail: "一個邏輯值，該值指定希望 VLOOKUP 查找近似匹配還是精確匹配：近似匹配 - 1/TRUE, 完全匹配 - 0/FALSE"
			}
		}
	},
	VSTACK: {
		description: "依序垂直追加陣列以傳回更大的陣列",
		abstract: "依序垂直追加陣列以傳回更大的陣列",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/vstack-function"
		}],
		functionParameter: {
			array1: {
				name: "陣列",
				detail: "要附加的陣列。"
			},
			array2: {
				name: "陣列",
				detail: "要附加的陣列。"
			}
		}
	},
	WRAPCOLS: {
		description: "在指定的元素數之後，將提供的列或欄的值以欄換行，以形成新陣列。",
		abstract: "在指定的元素數之後，將提供的列或欄的值以欄換行，以形成新陣列。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/wrapcols-function"
		}],
		functionParameter: {
			vector: {
				name: "向量",
				detail: "要換行的向量或參照。"
			},
			wrapCount: {
				name: "換行數目",
				detail: "每一欄的最大值數目。"
			},
			padWith: {
				name: "填塞值",
				detail: "要填塞的值。 預設值為 #N/A。"
			}
		}
	},
	WRAPROWS: {
		description: "在指定的元素數之後，將提供的列或欄的值以列換行，以形成新陣列。",
		abstract: "在指定的元素數之後，將提供的列或欄的值以列換行，以形成新陣列。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/wraprows-function"
		}],
		functionParameter: {
			vector: {
				name: "向量",
				detail: "要換行的向量或參照。"
			},
			wrapCount: {
				name: "換行數目",
				detail: "每一列的最大值數目。"
			},
			padWith: {
				name: "填塞值",
				detail: "要填塞的值。 預設值為 #N/A。"
			}
		}
	},
	XLOOKUP: {
		description: "函數搜尋區域或數組，然後傳回與它找到的第一個匹配項對應的項。 如果不存在匹配項，則 XLOOKUP 可以傳回最接近的 (近似) 匹配項",
		abstract: "搜尋區域或陣列，並傳回與之找到的第一個符合項目對應的項目。 ",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/xlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "查找值",
				detail: "要搜尋的值，如果省略，XLOOKUP 將會傳回在 lookup_array 中找到的空白儲存格。 "
			},
			lookupArray: {
				name: "搜尋區域",
				detail: "要搜尋的陣列或區域"
			},
			returnArray: {
				name: "傳回區域",
				detail: "要傳回的陣列或區域"
			},
			ifNotFound: {
				name: "預設顯示值",
				detail: "如果未找到有效的匹配項，則返回你提供的 [if_not_found] 文本，否則返回#N/A "
			},
			matchMode: {
				name: "符合類型",
				detail: "指定符合類型： 0 - 完全符合。 如果未找到，則傳回 #N/A。預設選項。 -1 - 完全匹配。 如果沒有找到，則傳回下一個較小的項。 1 - 完全匹配。 如果沒有找到，則傳回下一個較大的項。 2 - 萬用字元匹配，其中 *, ? 和 ~ 有特殊意義。 "
			},
			searchMode: {
				name: "搜尋模式",
				detail: "指定要使用的搜尋模式：1 從第一項開始執行搜索，預設選項。 -1 從最後一項開始執行反向搜尋。 2 執行依賴 lookup_array 按升序排序的二進位搜尋, -2執行依賴於 lookup_array 按降序排序的二進位搜尋"
			}
		}
	},
	XMATCH: {
		description: "在陣列或儲存格區域中搜尋指定項，然後傳回項的相對位置。 ",
		abstract: "傳回項目在陣列或儲存格區域中的相對位置。 ",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/xmatch-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "找值",
				detail: "找值"
			},
			lookupArray: {
				name: "搜尋區域",
				detail: "要搜尋的陣列或區域"
			},
			matchMode: {
				name: "匹配類型",
				detail: "指定匹配類型：\n0 - 完全匹配（預設值）\n-1 - 完全匹配或下一個最小項\n1 - 完全匹配或下一個最大項\n2 - 萬用字元匹配，其中*, ? 和~ 有特殊意義。 "
			},
			searchMode: {
				name: "搜尋類型",
				detail: "指定搜尋類型：\n1 - 搜尋從第一到最後一個（預設值）\n-1 - 搜尋從最後到第一個（反向搜尋）。 \n2 - 執行依賴 lookup_array 按升序排序的二進位搜尋。 如果未排序，將傳回無效結果。 \n2 - 執行依賴 lookup_array 按降序排序的二進位搜尋。 如果未排序，將傳回無效結果。 "
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/math/zh-TW.ts
const locale$4 = {
	ABS: {
		description: "傳回數字的絕對值。一個數字的絕對值是該數字不帶其符號的形式。 ",
		abstract: "傳回數字的絕對值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/abs-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "需要計算其絕對值的實數。 "
		} }
	},
	ACOS: {
		description: "傳回數字的反餘弦值。 反餘弦值是指餘弦值為 number 的角度。 傳回的角度以弧度表示，弧度值在 0（零）到 pi 之間。 ",
		abstract: "傳回數字的反餘弦值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/acos-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "所求角度的餘弦值，必須介於 -1 到 1 之間。 "
		} }
	},
	ACOSH: {
		description: "傳回數字的反雙曲餘弦值。 該數字必須大於或等於 1。 反雙曲餘弦值是指雙曲餘弦值為 number 的值，因此 ACOSH(COSH(number)) 等於 number。 ",
		abstract: "傳回數字的反雙曲餘弦值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/acosh-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "大於或等於 1 的任意實數。 "
		} }
	},
	ACOT: {
		description: "傳回數字的反餘切值的主值。 ",
		abstract: "傳回一個數的反餘切值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/acot-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "數字是需要的角度的正切值。 這必須是實數。 "
		} }
	},
	ACOTH: {
		description: "傳回一個數的雙曲反餘切值",
		abstract: "傳回一個數的雙曲反餘切值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/acoth-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "數字的絕對值必須大於 1。"
		} }
	},
	AGGREGATE: {
		description: "傳回清單或資料庫中的聚合",
		abstract: "傳回清單或資料庫中的聚合",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/aggregate-function"
		}],
		functionParameter: {
			functionNum: {
				name: "function_num",
				detail: "數字 1 到 19，指定要使用哪一個函數。"
			},
			options: {
				name: "options",
				detail: "一個數值，決定函數的評估範圍中要忽略哪些值。"
			},
			ref1: {
				name: "ref1",
				detail: "接受多個數值引數之函數的第一個數值引數，這是您要計算彙總值的引數。"
			},
			ref2: {
				name: "ref2",
				detail: "這是您要計算彙總值的第 2 個到第 253 個數值引數。"
			}
		}
	},
	ARABIC: {
		description: "將羅馬數字轉換為阿拉伯數字",
		abstract: "將羅馬數字轉換為阿拉伯數字",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/arabic-function"
		}],
		functionParameter: { text: {
			name: "文字",
			detail: "以引弧括住的字串、空字串 (“) ，或包含文字的單元格參照。"
		} }
	},
	ASIN: {
		description: "傳回數字的反正弦值",
		abstract: "傳回數字的反正弦值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/asin-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "欲求角度的正弦值，其值必須介於 -1 到 1。"
		} }
	},
	ASINH: {
		description: "傳回數字的反雙曲正弦值",
		abstract: "傳回數字的反雙曲正弦值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/asinh-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "任意實數。"
		} }
	},
	ATAN: {
		description: "傳回數字的反正切值",
		abstract: "傳回數字的反正切值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/atan-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "欲求角度的正切值。"
		} }
	},
	ATAN2: {
		description: "傳回指定 X 和 Y 座標的反正切值 (正切值的倒數)。 反正切是從 X 軸到穿過原點 (0, 0) 和和一個座標點 (x_num, y_num) 之線段的角度。 該角度是以弧度表示，有效範圍是 -pi 和 pi 之間 (不含 -pi)。",
		abstract: "傳回指定 X 和 Y 座標的反正切值 (正切值的倒數)。 反正切是從 X 軸到穿過原點 (0, 0) 和和一個座標點 (x_num, y_num) 之線段的角度。 該角度是以弧度表示，有效範圍是 -pi 和 pi 之間 (不含 -pi)。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/atan2-function"
		}],
		functionParameter: {
			xNum: {
				name: "x 座標",
				detail: "必須。 這是點的 X 座標。"
			},
			yNum: {
				name: "y 座標",
				detail: "必須。 這是點的 Y 座標。"
			}
		}
	},
	ATANH: {
		description: "傳回數值的反雙曲線正切值。 數值必須介於 -1 和 1 (不含 -1 和 1) 之間。 反雙曲線正切是一個值，其雙曲線正切是一個 數字 ，所以 ATANH(TANH(number)) 等於 數字 。",
		abstract: "傳回數值的反雙曲線正切值。 數值必須介於 -1 和 1 (不含 -1 和 1) 之間。 反雙曲線正切是一個值，其雙曲線正切是一個 數字 ，所以 ATANH(TANH(number)) 等於 數字 。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/atanh-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "必要。 這是任何介於 1 和 -1 之間的實數。"
		} }
	},
	BASE: {
		description: "將一個數轉換為具有給定基數的文字表示",
		abstract: "將一個數轉換為具有給定基數的文字表示",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/base-function"
		}],
		functionParameter: {
			number: {
				name: "數值",
				detail: "要轉換的數位。必須是大於或等於 0 且小於 2^53 的整數。"
			},
			radix: {
				name: "基數",
				detail: "要將數字轉換為底數的基數。必須是大於或等於 2 且小於或等於 36 的整數。"
			},
			minLength: {
				name: "最小長度",
				detail: "傳回之字串的最小長度。必須是大於或等於 0 的整數。"
			}
		}
	},
	CEILING: {
		description: "將數字舍入為最接近的整數或最接近的指定基數的倍數",
		abstract: "將數字舍入為最接近的整數或最接近的指定基數的倍數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/ceiling-function"
		}],
		functionParameter: {
			number: {
				name: "數值",
				detail: "要捨位的數值。"
			},
			significance: {
				name: "倍數",
				detail: "要捨位的倍數。"
			}
		}
	},
	CEILING_MATH: {
		description: "將數字向上捨入為最接近的整數或最接近的指定基數的倍數",
		abstract: "將數字向上捨入為最接近的整數或最接近的指定基數的倍數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/ceiling-math-function"
		}],
		functionParameter: {
			number: {
				name: "數值",
				detail: "要捨位的數值。"
			},
			significance: {
				name: "倍數",
				detail: "要捨位的倍數。"
			},
			mode: {
				name: "眾數",
				detail: "對於負數，請控制數位是否趨於或背離於零。"
			}
		}
	},
	CEILING_PRECISE: {
		description: "將數字舍入為最接近的整數或最接近的指定基數的倍數。 無論該數字的符號為何，該數字都向上捨入。 ",
		abstract: "將數字捨去為最接近的整數或最接近的指定基數的倍數。 無論該數字的符號為何，該數字都向上捨入。 ",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/ceiling-precise-function"
		}],
		functionParameter: {
			number: {
				name: "數值",
				detail: "要捨位的數值。"
			},
			significance: {
				name: "倍數",
				detail: "要捨位的倍數。"
			}
		}
	},
	COMBIN: {
		description: "傳回給定數目物件的組合數",
		abstract: "傳回給定數目物件的組合數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/combin-function"
		}],
		functionParameter: {
			number: {
				name: "總數",
				detail: "項目數。"
			},
			numberChosen: {
				name: "樣品數量",
				detail: "每個組合中的項目數。"
			}
		}
	},
	COMBINA: {
		description: "傳回給定數目物件具有重複項的組合數",
		abstract: "傳回給定數目物件具有重複項的組合數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/combina-function"
		}],
		functionParameter: {
			number: {
				name: "總數",
				detail: "項目數。"
			},
			numberChosen: {
				name: "樣品數量",
				detail: "每個組合中的項目數。"
			}
		}
	},
	COS: {
		description: "傳回數字的餘弦值",
		abstract: "傳回數字的餘弦值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/cos-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "欲求算其餘弦值的角度，以弧度表示。"
		} }
	},
	COSH: {
		description: "傳回數字的雙曲餘弦值",
		abstract: "傳回數字的雙曲餘弦值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/cosh-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "欲求得其雙曲線餘弦值的任意實數。"
		} }
	},
	COT: {
		description: "返回角度的餘弦值",
		abstract: "返回角度的餘弦值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/cot-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "欲求餘切值的角度，以弧度表示。"
		} }
	},
	COTH: {
		description: "傳回數字的雙曲餘切值",
		abstract: "傳回數字的雙曲餘切值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/coth-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "想要求雙曲餘切的任意實數。"
		} }
	},
	CSC: {
		description: "傳回角度的餘割值",
		abstract: "傳回角度的餘值值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/csc-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "想要求餘割的角度，以弧度表示。"
		} }
	},
	CSCH: {
		description: "返回角度的雙曲餘割值",
		abstract: "返回角度的雙曲餘割值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/csch-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "想要求雙曲餘割值的角度，以弧度表示。"
		} }
	},
	DECIMAL: {
		description: "將給定基數內的數的文字表示轉換為十進制數",
		abstract: "將給定基數內的數的文字表示轉換為十進制數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/decimal-function"
		}],
		functionParameter: {
			text: {
				name: "字串",
				detail: "字串長度必須小於或等於 255 個字元。"
			},
			radix: {
				name: "基數",
				detail: "要將數字轉換為底數的基數。 必須是大於或等於 2 且小於或等於 36 的整數。"
			}
		}
	},
	DEGREES: {
		description: "將弧度轉換為度",
		abstract: "將弧度轉換為度",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/degrees-function"
		}],
		functionParameter: { angle: {
			name: "角度",
			detail: "要轉換的角度，以弧度表示。"
		} }
	},
	EVEN: {
		description: "將數字向上捨入到最接近的偶數",
		abstract: "將數字向上捨入到最接近的偶數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/even-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "要捨入的數值。"
		} }
	},
	EXP: {
		description: "返回e的 n 次方",
		abstract: "返回e的 n 次方",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/exp-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "套用至基數 e 的指數。"
		} }
	},
	FACT: {
		description: "傳回數字的階乘",
		abstract: "傳回數字的階乘",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/fact-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "要階乘的非負數數字。 如果數字不是整數，則只會取整數。"
		} }
	},
	FACTDOUBLE: {
		description: "傳回數字的雙倍階乘",
		abstract: "傳回數字的雙倍階乘",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/factdouble-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "要雙倍階乘的非負數數字。 如果數字不是整數，則只會取整數。"
		} }
	},
	FLOOR: {
		description: "向絕對值減小的方向舍入數字",
		abstract: "向絕對值減小的方向捨去數字",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/floor-function"
		}],
		functionParameter: {
			number: {
				name: "數值",
				detail: "要捨位的數值。"
			},
			significance: {
				name: "倍數",
				detail: "要捨位的倍數。"
			}
		}
	},
	FLOOR_MATH: {
		description: "將數字向下捨去為最接近的整數或最接近的指定基數的倍數",
		abstract: "將數字向下捨去為最接近的整數或最接近的指定基數的倍數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/floor-math-function"
		}],
		functionParameter: {
			number: {
				name: "數值",
				detail: "要捨位的數值。"
			},
			significance: {
				name: "倍數",
				detail: "要捨位的倍數。"
			},
			mode: {
				name: "眾數",
				detail: "對於負數，請控制數位是否趨於或背離於零。"
			}
		}
	},
	FLOOR_PRECISE: {
		description: "將數字向下捨去為最接近的整數或最接近的指定基數的倍數。 無論該數字的符號為何，該數字都向下捨去。 ",
		abstract: "將數字向下捨去為最接近的整數或最接近的指定基數的倍數。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/floor-precise-function"
		}],
		functionParameter: {
			number: {
				name: "數值",
				detail: "要捨位的數值。"
			},
			significance: {
				name: "倍數",
				detail: "要捨位的倍數。"
			}
		}
	},
	GCD: {
		description: "傳回最大公約數",
		abstract: "傳回最大公約數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/gcd-function"
		}],
		functionParameter: {
			number1: {
				name: "數值1",
				detail: "用於計算的第一項數值或範圍。"
			},
			number2: {
				name: "數值2",
				detail: "用於計算的其他數值或範圍。"
			}
		}
	},
	INT: {
		description: "將數字向下捨去到最接近的整數",
		abstract: "將數字向下捨去到最接近的整數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/int-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "要將數字向下捨去到最接近的整數的實數。"
		} }
	},
	ISO_CEILING: {
		description: "傳回一個數字，該數字向上捨入為最接近的整數或最接近的有效位的倍數",
		abstract: "傳回一個數字，該數字向上捨入為最接近的整數或最接近的有效位的倍數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/iso-ceiling-function"
		}],
		functionParameter: {
			number: {
				name: "數值",
				detail: "要捨位的數值。"
			},
			significance: {
				name: "倍數",
				detail: "要捨位的倍數。"
			}
		}
	},
	LCM: {
		description: "傳回最小公倍數",
		abstract: "傳回最小公倍數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/lcm-function"
		}],
		functionParameter: {
			number1: {
				name: "數值1",
				detail: "用於計算的第一項數值或範圍。"
			},
			number2: {
				name: "數值2",
				detail: "用於計算的其他數值或範圍。"
			}
		}
	},
	LN: {
		description: "傳回數字的自然對數",
		abstract: "傳回數字的自然對數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/ln-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "要求得自然對數的正實數。"
		} }
	},
	LOG: {
		description: "傳回數字的以指定底為底的對數",
		abstract: "傳回數字的以指定底為底的對數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/log-function"
		}],
		functionParameter: {
			number: {
				name: "數值",
				detail: "要求得對數的正實數。"
			},
			base: {
				name: "底數",
				detail: "對數的底數。 如果省略 base，則假設其值為 10。"
			}
		}
	},
	LOG10: {
		description: "傳回數字的以 10 為底的對數",
		abstract: "傳回數字的以 10 為底的對數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/log10-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "要求得底數為 10 之對數的正實數。"
		} }
	},
	MDETERM: {
		description: "傳回陣列的矩陣行列式的值",
		abstract: "傳回陣列的矩陣行列式的值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/mdeterm-function"
		}],
		functionParameter: { array: {
			name: "陣列",
			detail: "具有相同列數與欄數的數值陣列。"
		} }
	},
	MINVERSE: {
		description: "傳回陣列的逆矩陣",
		abstract: "傳回陣列的逆矩陣",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/minverse-function"
		}],
		functionParameter: { array: {
			name: "陣列",
			detail: "具有相同列數與欄數的數值陣列。"
		} }
	},
	MMULT: {
		description: "傳回兩個陣列的矩陣乘積",
		abstract: "傳回兩個陣列的矩陣乘積",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/mmult-function"
		}],
		functionParameter: {
			array1: {
				name: "陣列1",
				detail: "要相乘的陣列。"
			},
			array2: {
				name: "陣列2",
				detail: "要相乘的陣列。"
			}
		}
	},
	MOD: {
		description: "傳回兩數相除的餘數。 結果的符號與除數相同。 ",
		abstract: "傳回除法的餘數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/mod-function"
		}],
		functionParameter: {
			number: {
				name: "數值",
				detail: "要計算餘數的被除數"
			},
			divisor: {
				name: "除數",
				detail: "除數"
			}
		}
	},
	MROUND: {
		description: "傳回一個捨入到所需倍數的數字",
		abstract: "傳回一個捨去到所需倍數的數字",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/mround-function"
		}],
		functionParameter: {
			number: {
				name: "數值",
				detail: "要捨入的數值。"
			},
			multiple: {
				name: "倍數",
				detail: "要捨入數字的倍數。"
			}
		}
	},
	MULTINOMIAL: {
		description: "傳回一組數字的多項式",
		abstract: "傳回一組數字的多項式",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/multinomial-function"
		}],
		functionParameter: {
			number1: {
				name: "數值1",
				detail: "用於計算的第一項數值或範圍。"
			},
			number2: {
				name: "數值2",
				detail: "用於計算的其他數值或範圍。"
			}
		}
	},
	MUNIT: {
		description: "返回單位矩陣或指定維度",
		abstract: "返回單位矩陣或指定維度",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/munit-function"
		}],
		functionParameter: { dimension: {
			name: "维度",
			detail: "是指定要傳回之單位矩陣維度的整數。 它會傳回陣列。 維度必須大於零。"
		} }
	},
	ODD: {
		description: "將數字向上捨入為最接近的奇數",
		abstract: "將數字向上捨入為最接近的奇數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/odd-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "要捨入的數值。"
		} }
	},
	PI: {
		description: "傳回 pi 的值",
		abstract: "傳回 pi 的值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/pi-function"
		}],
		functionParameter: {}
	},
	POWER: {
		description: "傳回數字乘冪的結果。 ",
		abstract: "回傳數的乘冪",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/power-function"
		}],
		functionParameter: {
			number: {
				name: "數值",
				detail: "基數。可為任意實數。"
			},
			power: {
				name: "指數",
				detail: "基數乘冪運算的指數。"
			}
		}
	},
	PRODUCT: {
		description: "將作為參數提供的所有數字相乘，並傳回乘積。 ",
		abstract: "將其參數相乘",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/product-function"
		}],
		functionParameter: {
			number1: {
				name: "數值 1",
				detail: "要相乘的第一個數字或範圍。"
			},
			number2: {
				name: "數值 2",
				detail: "要相乘的其他數字或儲存格區域，最多可以使用 255 個參數。"
			}
		}
	},
	QUOTIENT: {
		description: "傳回除法的整數部分",
		abstract: "傳回除法的整數部分",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/quotient-function"
		}],
		functionParameter: {
			numerator: {
				name: "分子",
				detail: "被除數。"
			},
			denominator: {
				name: "分母",
				detail: "除數。"
			}
		}
	},
	RADIANS: {
		description: "將度轉換為弧度",
		abstract: "將度轉換為弧度",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/radians-function"
		}],
		functionParameter: { angle: {
			name: "角度",
			detail: "要轉換的角度 (以度數為單位)。"
		} }
	},
	RAND: {
		description: "傳回 0 和 1 之間的一個隨機數",
		abstract: "傳回 0 和 1 之間的隨機數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/rand-function"
		}],
		functionParameter: {}
	},
	RANDARRAY: {
		description: "RANDARRAY 函數傳回 0 和 1 之間的隨機數字陣列。但是，你可以指定要填滿的列數和欄數、最小值和最大值，以及是否會傳回整個數字或小數值。",
		abstract: "RANDARRAY 函數傳回 0 和 1 之間的隨機數字陣列。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/randarray-function"
		}],
		functionParameter: {
			rows: {
				name: "列數",
				detail: "要傳回的列數"
			},
			columns: {
				name: "欄數",
				detail: "要傳回的欄數"
			},
			min: {
				name: "最小值",
				detail: "想要傳回的最小數字"
			},
			max: {
				name: "最大值",
				detail: "想要傳回的最大數字"
			},
			wholeNumber: {
				name: "整數",
				detail: "傳回整數或小數數值"
			}
		}
	},
	RANDBETWEEN: {
		description: "傳回位於兩個指定數之間的一個隨機數",
		abstract: "傳回位於兩個指定數之間的一個隨機數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/randbetween-function"
		}],
		functionParameter: {
			bottom: {
				name: "最小值",
				detail: "會傳回的最小整數。"
			},
			top: {
				name: "最大值",
				detail: "會傳回的最大整數。"
			}
		}
	},
	ROMAN: {
		description: "將阿拉伯數字轉換為文本式羅馬數字",
		abstract: "將阿拉伯數字轉換為文本式羅馬數字",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/roman-function"
		}],
		functionParameter: {
			number: {
				name: "數值",
				detail: "這是要轉換的阿拉伯數字。"
			},
			form: {
				name: "形式",
				detail: "這是指定所需羅馬數字類型的數字。羅馬數位風格從經典到簡化，隨著形式值的增加而變得更加簡潔。"
			}
		}
	},
	ROUND: {
		description: "將數字按指定位數舍入",
		abstract: "將數字依指定位數捨去",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/round-function"
		}],
		functionParameter: {
			number: {
				name: "數值",
				detail: "要四捨五入的數字。"
			},
			numDigits: {
				name: "位數",
				detail: "要對數字引數進位的位數。"
			}
		}
	},
	ROUNDBANK: {
		description: "依照「四舍六入五成雙」舍入數字",
		abstract: "依照「四舍六入五成雙」舍入數字",
		links: [{
			title: "教導",
			url: ""
		}],
		functionParameter: {
			number: {
				name: "數值",
				detail: "要「四舍六入五成雙」的數字。"
			},
			numDigits: {
				name: "位數",
				detail: "要進行「四舍六入五成雙」運算的位數。"
			}
		}
	},
	ROUNDDOWN: {
		description: "向絕對值減小的方向舍入數字",
		abstract: "向絕對值減小的方向捨去數字",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/rounddown-function"
		}],
		functionParameter: {
			number: {
				name: "數值",
				detail: "要四捨五入的數字。"
			},
			numDigits: {
				name: "位數",
				detail: "要對數字引數進位的位數。"
			}
		}
	},
	ROUNDUP: {
		description: "向絕對值增大的方向舍入數字",
		abstract: "向絕對值增大的方向舍入數字",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/roundup-function"
		}],
		functionParameter: {
			number: {
				name: "數值",
				detail: "要四捨五入的數字。"
			},
			numDigits: {
				name: "位數",
				detail: "要對數字引數進位的位數。"
			}
		}
	},
	SEC: {
		description: "傳回角度的正割值",
		abstract: "返回角度的正割值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/sec-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "數值是要求得正割值的角度，以弧度表示。"
		} }
	},
	SECH: {
		description: "返回角度的雙曲正割值",
		abstract: "返回角度的雙曲正割值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/sech-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "數值是要求得雙曲正割值的角度，以弧度表示。"
		} }
	},
	SERIESSUM: {
		description: "傳回基於公式的冪級數的和",
		abstract: "傳回基於公式的冪級數的和",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/seriessum-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "冪級數的輸入值。"
			},
			n: {
				name: "n",
				detail: "要增加 x 的初始乘冪。"
			},
			m: {
				name: "m",
				detail: "要將級數中的每一項增加 n 所用的間距。"
			},
			coefficients: {
				name: "係數集",
				detail: "一組由 x 的每一個連續乘冪相乘的係數集。"
			}
		}
	},
	SEQUENCE: {
		description: "SEQUENCE 函數可在陣列中產生一系列連續數字，例如，1、2、3、4。 ",
		abstract: "SEQUENCE 函數可在陣列中產生一系列連續數字，例如，1、2、3、4。 ",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/sequence-function"
		}],
		functionParameter: {
			rows: {
				name: "列數",
				detail: "要傳回的列數。"
			},
			columns: {
				name: "欄數",
				detail: "要傳回的欄數。"
			},
			start: {
				name: "起始數字",
				detail: "連續值的第一個數字。"
			},
			step: {
				name: "遞增量",
				detail: "陣列中每個連續值遞增的量。"
			}
		}
	},
	SIGN: {
		description: "傳回數字的符號",
		abstract: "傳回數字的符號",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/sign-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "任意實數。"
		} }
	},
	SIN: {
		description: "傳回給定角度的正弦值",
		abstract: "傳回給定角度的正弦值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/sin-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "要求出正弦值的角度，以弧度表示。"
		} }
	},
	SINH: {
		description: "傳回數字的雙曲正弦值",
		abstract: "傳回數字的雙曲正弦值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/sinh-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "任意實數。"
		} }
	},
	SQRT: {
		description: "返回正平方根",
		abstract: "返回正平方根",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/sqrt-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "要求得平方根的數字。"
		} }
	},
	SQRTPI: {
		description: "傳回某數與 pi 的乘積的平方根",
		abstract: "傳回某數與 pi 的乘積的平方根",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/sqrtpi-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "要乘以 pi 的數值。"
		} }
	},
	SUBTOTAL: {
		description: "傳回清單或資料庫中的分類總計。 ",
		abstract: "傳回清單或資料庫中的分類總和",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/subtotal-function"
		}],
		functionParameter: {
			functionNum: {
				name: "函數編號",
				detail: "數字 1-11 或 101-111，用於指定要為分類總和所使用的函數。 如果使用 1-11，將包括手動隱藏的列，如果使用 101-111，則排除手動隱藏的列；始終排除已篩選掉的儲存格。 "
			},
			ref1: {
				name: "引用1",
				detail: "要對其進行分類總和計算的第一個命名區域或引用。 "
			},
			ref2: {
				name: "引用2",
				detail: "要對其進行分類匯總計算的第 2 個至第 254 個命名區域或引用。 "
			}
		}
	},
	SUM: {
		description: "將單一值、儲存格引用或是區域相加，或將三者的組合相加。 ",
		abstract: "求參數的和",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/sum-function"
		}],
		functionParameter: {
			number1: {
				name: "數值 1",
				detail: "要相加的第一個數字。 該數字可以是 4 之類的數字，B6 之類的單元格引用或 B2:B8 之類的單元格範圍。 "
			},
			number2: {
				name: "數值 2",
				detail: "第二個要相加的數字。 可以按照這種方式指定最多 255 個數字。 "
			}
		}
	},
	SUMIF: {
		description: "範圍中符合指定條件的值求和。 ",
		abstract: "按給定條件對指定儲存格求和",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/sumif-function"
		}],
		functionParameter: {
			range: {
				name: "範圍",
				detail: "要根據條件進行偵測的範圍。 "
			},
			criteria: {
				name: "條件",
				detail: "以數字、表達式、儲存格引用、文字或函數的形式來定義將要新增哪些儲存格。可包含的萬用字元 - 問號（？）以匹配任意單個字符，星號（*）以匹配任意字符序列。 如果要尋找實際的問號或星號，請在該字元前鍵入波形符號（~）。 "
			},
			sumRange: {
				name: "求和範圍",
				detail: "要新增的實際儲存格，如果要新增在範圍參數指定以外的其他儲存格。 如果省略sum_range參數，Excel就會加入範圍參數中指定的儲存格（與套用標準的儲存格相同）。 "
			}
		}
	},
	SUMIFS: {
		description: "會加總符合多項準則的所有引數。",
		abstract: "會加總符合多項準則的所有引數。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/sumifs-function"
		}],
		functionParameter: {
			sumRange: {
				name: "求和範圍",
				detail: "要求和的儲存格區域。 "
			},
			criteriaRange1: {
				name: "條件範圍 1",
				detail: "使用條件 1 測試的區域。條件範圍 1 和條件 1 設定用於搜尋某個區域是否符合特定條件的搜尋對。 一旦在該區域中找到了項，將計算求和範圍中的相應值的總和。 "
			},
			criteria1: {
				name: "條件 1",
				detail: "定義將計算條件範圍 1 中的哪些儲存格的和的條件。 例如，條件可以輸入為 32、\">32\"、B4、\"蘋果\" 或 \"32\"。 "
			},
			criteriaRange2: {
				name: "條件範圍 2",
				detail: "附加的區域，最多可以輸入 127 個區域。 "
			},
			criteria2: {
				name: "條件 2",
				detail: "附加的關聯條件，最多可以輸入 127 個條件。 "
			}
		}
	},
	SUMPRODUCT: {
		description: "傳回對應的陣列元素的乘積和",
		abstract: "傳回對應的陣列元素的乘積和",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/sumproduct-function"
		}],
		functionParameter: {
			array1: {
				name: "陣列",
				detail: "要求元素乘積和的第一個陣列引數。"
			},
			array2: {
				name: "陣列",
				detail: "要求元素乘積和的第 2 個到第 255 個陣列引數。"
			}
		}
	},
	SUMSQ: {
		description: "傳回參數的平方和",
		abstract: "傳回參數的平方和",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/sumsq-function"
		}],
		functionParameter: {
			number1: {
				name: "數值1",
				detail: "要求出平方總和的第1個數字。也可以使用單一陣列或陣列參照來取代以逗點分隔的引數。"
			},
			number2: {
				name: "數值2",
				detail: "要求出平方總和的第2個數字。可以按照這種方式指定最多 255 個數字。"
			}
		}
	},
	SUMX2MY2: {
		description: "傳回兩陣列中對應值平方差之和",
		abstract: "傳回兩陣列中對應值平方差之和",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/sumx2my2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "值陣列1",
				detail: "第一個值陣列或範圍。"
			},
			arrayY: {
				name: "值陣列2",
				detail: "第二個值陣列或範圍。"
			}
		}
	},
	SUMX2PY2: {
		description: "傳回兩陣列中對應值的平方和總和",
		abstract: "傳回兩陣列中對應值的平方和總和",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/sumx2py2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "值陣列1",
				detail: "第一個值陣列或範圍。"
			},
			arrayY: {
				name: "值陣列2",
				detail: "第二個值陣列或範圍。"
			}
		}
	},
	SUMXMY2: {
		description: "傳回兩個陣列中對應值差的平方和",
		abstract: "傳回兩個陣列中對應值差的平方和",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/sumxmy2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "值陣列1",
				detail: "第一個值陣列或範圍。"
			},
			arrayY: {
				name: "值陣列2",
				detail: "第二個值陣列或範圍。"
			}
		}
	},
	TAN: {
		description: "傳回數字的正切值",
		abstract: "傳回數字的正切值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/tan-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "要求出正切值的角度，以弧度表示。"
		} }
	},
	TANH: {
		description: "傳回數字的雙曲正切值",
		abstract: "傳回數字的雙曲正切值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/tanh-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "任意實數。"
		} }
	},
	TRUNC: {
		description: "將數字截尾取整",
		abstract: "將數字截尾取整",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/trunc-function"
		}],
		functionParameter: {
			number: {
				name: "數值",
				detail: "要取至整數的數字。"
			},
			numDigits: {
				name: "位數",
				detail: "指定要捨去之精確位數的數字。其預設值為 0 (零)。"
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/statistical/zh-TW.ts
const locale$3 = {
	AVEDEV: {
		description: "傳回資料點與它們的平均值的絕對偏差平均值。 ",
		abstract: "返回資料點與它們的平均值的絕對偏差平均值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/avedev-function"
		}],
		functionParameter: {
			number1: {
				name: "數值 1",
				detail: "要計算平均值的第一個數字、儲存格參考或儲存格區域。 "
			},
			number2: {
				name: "數值 2",
				detail: "要計算平均值的其他數字、儲存格參考或儲存格區域，最多可包含 255 個。 "
			}
		}
	},
	AVERAGE: {
		description: "傳回參數的平均值（算術平均值）。 ",
		abstract: "傳回其參數的平均值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/average-function"
		}],
		functionParameter: {
			number1: {
				name: "數值 1",
				detail: "要計算平均值的第一個數字、儲存格參考或儲存格區域。 "
			},
			number2: {
				name: "數值 2",
				detail: "要計算平均值的其他數字、儲存格參考或儲存格區域，最多可包含 255 個。 "
			}
		}
	},
	AVERAGE_WEIGHTED: {
		description: "AVERAGE.WEIGHTED 函數會根據一組數值及其對應的權重，計算這些數值的加權平均值。",
		abstract: "AVERAGE.WEIGHTED 函數會根據一組數值及其對應的權重，計算這些數值的加權平均值。",
		links: [{
			title: "教導",
			url: "https://support.google.com/docs/answer/9084098?hl=zh-Hant"
		}],
		functionParameter: {
			values: {
				name: "值",
				detail: "要計算平均值的數值。 可以是參照儲存格的範圍，也可以是數值本身。"
			},
			weights: {
				name: "權重",
				detail: "要套用的權重對應清單。 可以是參照儲存格的範圍，也可以是權重本身。 雖然權重不得為負數，但可以為零。 至少要有一個權重為正數。 如果使用特定儲存格範圍，這段範圍的欄數和列數必須與數值範圍的欄數和列數相同。"
			},
			additionalValues: {
				name: "其他值",
				detail: "要計算平均值的其他值。 其他值為選填。"
			},
			additionalWeights: {
				name: "其他權重",
				detail: "要套用的其他權重。 其他權重為選填，但每個 [其他值] 的後面都必須加上一個 [其他權重] 。"
			}
		}
	},
	AVERAGEA: {
		description: "傳回其參數的平均值，包括數字、文字和邏輯值。 ",
		abstract: "傳回其參數的平均值，包括數字、文字和邏輯值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/averagea-function"
		}],
		functionParameter: {
			value1: {
				name: "值 1",
				detail: "要計算平均值的第一個數字、儲存格參考或儲存格區域。 "
			},
			value2: {
				name: "值 2",
				detail: "要計算平均值的其他數字、儲存格參考或儲存格區域，最多可包含 255 個。 "
			}
		}
	},
	AVERAGEIF: {
		description: "返回區域中滿足給定條件的所有儲存格的平均值（算術平均值）。 ",
		abstract: "返回區域中滿足給定條件的所有儲存格的平均值（算術平均值）",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/averageif-function"
		}],
		functionParameter: {
			range: {
				name: "範圍",
				detail: "要計算平均值的一個或多個儲存格，其中包含數字或包含數字的名稱、陣列或參考。 "
			},
			criteria: {
				name: "條件",
				detail: "形式為數字、表達式、儲存格引用或文字的條件，用來定義將計算平均值的儲存格。 例如，條件可以表示為 32、\"32\"、\">32\"、\"蘋果\" 或 B4。 "
			},
			averageRange: {
				name: "平均範圍",
				detail: "計算平均值的實際儲存格組。 如果省略，則使用 range。 "
			}
		}
	},
	AVERAGEIFS: {
		description: "傳回滿足多個條件的所有儲存格的平均值（算術平均值）。 ",
		abstract: "返回所有滿足多個條件的儲存格的平均值（算術平均值）",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/averageifs-function"
		}],
		functionParameter: {
			averageRange: {
				name: "平均值範圍",
				detail: "要計算平均值的一個或多個儲存格，其中包含數字或包含數字的名稱、陣列或引用。 "
			},
			criteriaRange1: {
				name: "條件範圍 1",
				detail: "是一組用於條件計算的儲存格。 "
			},
			criteria1: {
				name: "條件 1",
				detail: "用來定義將計算平均值的儲存格。 例如，條件可以表示為 32、\"32\"、\">32\"、\"蘋果\" 或 B4"
			},
			criteriaRange2: {
				name: "條件範圍 2",
				detail: "附加區域。 最多可輸入 127 個區域。 "
			},
			criteria2: {
				name: "條件 2",
				detail: "附加關聯條件。 最多可以輸入 127 個條件。 "
			}
		}
	},
	BETA_DIST: {
		description: "傳回 beta 累積分佈函數",
		abstract: "傳回 beta 累積分佈函數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/beta-dist-function"
		}],
		functionParameter: {
			x: {
				name: "值",
				detail: "用來計算其函數的值，介於下限值和上限值之間。"
			},
			alpha: {
				name: "alpha",
				detail: "分佈的第一個參數。"
			},
			beta: {
				name: "beta",
				detail: "分佈的第二個參數。"
			},
			cumulative: {
				name: "累積",
				detail: "決定函數形式的邏輯值。如果為 TRUE，則 BETA.DIST 傳回累積分佈函數；如果為 FALSE，則傳回機率密度函數。"
			},
			A: {
				name: "下限",
				detail: "函數的下限，預設值為 0。"
			},
			B: {
				name: "上限",
				detail: "函數的上限，預設值為 1。"
			}
		}
	},
	BETA_INV: {
		description: "傳回指定 beta 分佈的累積分佈函數的反函數",
		abstract: "傳回指定 beta 分佈的累積分佈函數的反函數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/beta-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "機率",
				detail: "beta 分佈的相關機率。"
			},
			alpha: {
				name: "alpha",
				detail: "分佈的第一個參數。"
			},
			beta: {
				name: "beta",
				detail: "分佈的第二個參數。"
			},
			A: {
				name: "下限",
				detail: "函數的下限，預設值為 0。"
			},
			B: {
				name: "上限",
				detail: "函數的上限，預設值為 1。"
			}
		}
	},
	BINOM_DIST: {
		description: "傳回一元二項式分佈的機率",
		abstract: "傳回一元二項式分佈的機率",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/binom-dist-function"
		}],
		functionParameter: {
			numberS: {
				name: "成功次數",
				detail: "為實驗的成功次數。"
			},
			trials: {
				name: "實驗次數",
				detail: "為獨立實驗的次數。"
			},
			probabilityS: {
				name: "成功機率",
				detail: "每一次實驗的成功機率。"
			},
			cumulative: {
				name: "累積",
				detail: "決定函數形式的邏輯值。如果為 TRUE，則 BINOM.DIST 傳回累積分佈函數；如果為 FALSE，則傳回機率密度函數。"
			}
		}
	},
	BINOM_DIST_RANGE: {
		description: "使用二項式分佈傳回試驗結果的機率",
		abstract: "使用二項式分佈返回試驗結果的機率",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/binom-dist-range-function"
		}],
		functionParameter: {
			trials: {
				name: "實驗次數",
				detail: "為獨立實驗的次數。"
			},
			probabilityS: {
				name: "成功機率",
				detail: "每一次實驗的成功機率。"
			},
			numberS: {
				name: "成功次數",
				detail: "為實驗的成功次數。"
			},
			numberS2: {
				name: "最大成功次數",
				detail: "如果提供，會傳回成功試驗次數落在 成功次數 和 最大成功次數 之間的機率。"
			}
		}
	},
	BINOM_INV: {
		description: "傳回使累積二項式分佈小於或等於臨界值的最小值",
		abstract: "傳回使累積二項式分佈小於或等於臨界值的最小值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/binom-inv-function"
		}],
		functionParameter: {
			trials: {
				name: "實驗次數",
				detail: "伯努利實驗的次數。"
			},
			probabilityS: {
				name: "成功機率",
				detail: "每一次實驗的成功機率。"
			},
			alpha: {
				name: "目標機率",
				detail: "臨界值。"
			}
		}
	},
	CHISQ_DIST: {
		description: "傳回 χ2 分佈的左尾機率。",
		abstract: "傳回 χ2 分佈的左尾機率。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/chisq-dist-function"
		}],
		functionParameter: {
			x: {
				name: "值",
				detail: "用來評估分佈的值。"
			},
			degFreedom: {
				name: "自由度",
				detail: "自由度。"
			},
			cumulative: {
				name: "累積",
				detail: "決定函數形式的邏輯值。 如果為 TRUE，CHISQ.DIST 會傳回累積分佈函數；如果為 FALSE，則會傳回機率密度函數。"
			}
		}
	},
	CHISQ_DIST_RT: {
		description: "傳回 χ2 分佈的右尾機率。",
		abstract: "傳回 χ2 分佈的右尾機率。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/chisq-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "值",
				detail: "用來評估分佈的值。"
			},
			degFreedom: {
				name: "自由度",
				detail: "自由度。"
			}
		}
	},
	CHISQ_INV: {
		description: "傳回 χ2 分佈的左尾機率的反函數值。",
		abstract: "傳回 χ2 分佈的左尾機率的反函數值。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/chisq-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "機率",
				detail: "與 χ2 分佈相關聯的機率。"
			},
			degFreedom: {
				name: "自由度",
				detail: "自由度。"
			}
		}
	},
	CHISQ_INV_RT: {
		description: "傳回 χ2 分佈的右尾機率的反函數值。",
		abstract: "傳回 χ2 分佈的右尾機率的反函數值。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/chisq-inv-rt-function"
		}],
		functionParameter: {
			probability: {
				name: "機率",
				detail: "與 χ2 分佈相關聯的機率。"
			},
			degFreedom: {
				name: "自由度",
				detail: "自由度。"
			}
		}
	},
	CHISQ_TEST: {
		description: "返回獨立性檢驗值",
		abstract: "返回獨立性檢驗值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/chisq-test-function"
		}],
		functionParameter: {
			actualRange: {
				name: "觀察範圍",
				detail: "觀察值範圍，用來檢定預期值。"
			},
			expectedRange: {
				name: "預期範圍",
				detail: "資料範圍，其內容為各欄總和乘各列總和後的值，再除以全部值總和的比率。"
			}
		}
	},
	CONFIDENCE_NORM: {
		description: "使用常態分佈傳回總體平均值的置信區間。",
		abstract: "使用常態分佈傳回總體平均值的置信區間。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/confidence-norm-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "用於計算置信水準的顯著水準。置信水準等於 100*(1 - alpha)%，換句話說，alpha 0.05 表示信賴水準為 95%。"
			},
			standardDev: {
				name: "總體標準差",
				detail: "假設資料範圍的總體標準差已知。"
			},
			size: {
				name: "樣本大小",
				detail: "樣本大小。"
			}
		}
	},
	CONFIDENCE_T: {
		description: "傳回總體平均值的置信區間（使用學生 t-分佈）",
		abstract: "傳回總體平均值的置信區間（使用學生 t-分佈）",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/confidence-t-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "用於計算置信水準的顯著水準。置信水準等於 100*(1 - alpha)%，換句話說，alpha 0.05 表示信賴水準為 95%。"
			},
			standardDev: {
				name: "總體標準差",
				detail: "假設資料範圍的總體標準差已知。"
			},
			size: {
				name: "樣本大小",
				detail: "樣本大小。"
			}
		}
	},
	CORREL: {
		description: "傳回兩個資料集之間的相關係數",
		abstract: "傳回兩個資料集之間的相關係數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/correl-function"
		}],
		functionParameter: {
			array1: {
				name: "陣列1",
				detail: "第一個儲存格值範圍。"
			},
			array2: {
				name: "陣列2",
				detail: "第二個儲存格值範圍。"
			}
		}
	},
	COUNT: {
		description: "計算包含數字的儲存格數以及參數列表中數字的個數。 ",
		abstract: "計算參數清單中數字的個數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/count-function"
		}],
		functionParameter: {
			value1: {
				name: "值 1",
				detail: "要計算其中數字的數量的第一項、儲存格引用或區域。 "
			},
			value2: {
				name: "值 2",
				detail: "要計算其中數字的個數的其他項目、儲存格參考或區域，最多可包含 255 個。 "
			}
		}
	},
	COUNTA: {
		description: `計算包含任何類型的資訊（包括錯誤值和空白文字 ("")）的儲存格
 如果不需要對邏輯值、文字或錯誤值進行計數（換句話說，只希望對包含數字的儲存格進行計數），請使用 COUNT 函數。 `,
		abstract: "計算參數清單中值的個數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/counta-function"
		}],
		functionParameter: {
			value1: {
				name: "值 1",
				detail: "要計算平均值的第一個數字、儲存格參考或儲存格區域。 "
			},
			value2: {
				name: "值 2",
				detail: "要計算平均值的其他數字、儲存格參考或儲存格區域，最多可包含 255 個。 "
			}
		}
	},
	COUNTBLANK: {
		description: "計算區域內空白儲存格的數量。 ",
		abstract: "計算區域內空白儲存格的數量",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/countblank-function"
		}],
		functionParameter: { range: {
			name: "範圍",
			detail: "需要計算其中空白儲存格數的區域。 "
		} }
	},
	COUNTIF: {
		description: "計算區域內符合給定條件的儲存格的數量。 ",
		abstract: "計算區域內符合給定條件的儲存格的數量",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/use-the-countif-function-in-microsoft-excel"
		}],
		functionParameter: {
			range: {
				name: "範圍",
				detail: "要進行計數的儲存格組。 區域可以包括數字、陣列、命名區域或包含數字的引用。 空白和文字值將被忽略。 "
			},
			criteria: {
				name: "條件",
				detail: "用來決定要統計哪些儲存格的數量的數字、表達式、儲存格參考或文字字串。 \n例如，可以使用 32 之類數字，「>32」之類比較，B4 之類儲存格，或「蘋果」之類單字。 \nCOUNTIF 只使用一個條件。 如果要使用多個條件，請使用 COUNTIFS。 "
			}
		}
	},
	COUNTIFS: {
		description: "計算區域內符合多個條件的儲存格的數量。 ",
		abstract: "計算區域內符合多個條件的儲存格的數量",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/countifs-function"
		}],
		functionParameter: {
			criteriaRange1: {
				name: "條件範圍 1",
				detail: "在其中計算關聯條件的第一個區域。 "
			},
			criteria1: {
				name: "條件 1",
				detail: "條件的形式為數字、表達式、儲存格引用或文本，它定義了要計數的儲存格範圍。 例如，條件可以表示為 32、\">32\"、B4、\"apples\"或 \"32\"。 "
			},
			criteriaRange2: {
				name: "條件範圍 2",
				detail: "附加區域。 最多可輸入 127 個區域。 "
			},
			criteria2: {
				name: "條件 2",
				detail: "附加關聯條件。 最多可以輸入 127 個條件。 "
			}
		}
	},
	COVARIANCE_P: {
		description: "傳回總體協方差，即兩個資料集中每對資料點的偏差乘積的平均值。",
		abstract: "傳回總體協方差",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/covariance-p-function"
		}],
		functionParameter: {
			array1: {
				name: "陣列1",
				detail: "第一個儲存格值範圍。"
			},
			array2: {
				name: "陣列2",
				detail: "第二個儲存格值範圍。"
			}
		}
	},
	COVARIANCE_S: {
		description: "傳回樣本協方差，即兩個資料集中每對資料點的偏差乘積的平均值。",
		abstract: "傳回樣本協方差",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/covariance-s-function"
		}],
		functionParameter: {
			array1: {
				name: "陣列1",
				detail: "第一個儲存格值範圍。"
			},
			array2: {
				name: "陣列2",
				detail: "第二個儲存格值範圍。"
			}
		}
	},
	DEVSQ: {
		description: "傳回偏差的平方和",
		abstract: "傳回偏差的平方和",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/devsq-function"
		}],
		functionParameter: {
			number1: {
				name: "數值1",
				detail: "要計算平方差之總和的第 1 個引數。"
			},
			number2: {
				name: "數值2",
				detail: "要計算平方差之總和的第 2 到 255 個引數。"
			}
		}
	},
	EXPON_DIST: {
		description: "傳回指數分佈",
		abstract: "傳回指數分佈",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/expon-dist-function"
		}],
		functionParameter: {
			x: {
				name: "值",
				detail: "用來評估分佈的值。"
			},
			lambda: {
				name: "lambda",
				detail: "參數值。"
			},
			cumulative: {
				name: "累積",
				detail: "決定函數形式的邏輯值。 如果為 TRUE，EXPON.DIST 會傳回累積分佈函數；如果為 FALSE，則會傳回機率密度函數。"
			}
		}
	},
	F_DIST: {
		description: "傳回 F 機率分佈",
		abstract: "傳回 F 機率分佈",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/f-dist-function"
		}],
		functionParameter: {
			x: {
				name: "值",
				detail: "用於評估函數的值。"
			},
			degFreedom1: {
				name: "分子自由度",
				detail: "分子的自由度。"
			},
			degFreedom2: {
				name: "分母自由度",
				detail: "分母的自由度。"
			},
			cumulative: {
				name: "累積",
				detail: "決定函數形式的邏輯值。 如果為 TRUE，F.DIST 會傳回累積分佈函數；如果為 FALSE，則會傳回機率密度函數。"
			}
		}
	},
	F_DIST_RT: {
		description: "傳回 F 機率分佈（右尾）",
		abstract: "傳回 F 機率分佈（右尾）",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/f-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "值",
				detail: "用於評估函數的值。"
			},
			degFreedom1: {
				name: "分子自由度",
				detail: "分子的自由度。"
			},
			degFreedom2: {
				name: "分母自由度",
				detail: "分母的自由度。"
			}
		}
	},
	F_INV: {
		description: "傳回 F 機率分佈的反函數",
		abstract: "傳回 F 機率分佈的反函數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/f-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "機率",
				detail: "F 累積分佈相關的機率"
			},
			degFreedom1: {
				name: "分子自由度",
				detail: "分子的自由度。"
			},
			degFreedom2: {
				name: "分母自由度",
				detail: "分母的自由度。"
			}
		}
	},
	F_INV_RT: {
		description: "傳回 F 機率分佈（右尾）的反函數",
		abstract: "傳回 F 機率分佈（右尾）的反函數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/f-inv-rt-function"
		}],
		functionParameter: {
			probability: {
				name: "機率",
				detail: "F 累積分佈相關的機率"
			},
			degFreedom1: {
				name: "分子自由度",
				detail: "分子的自由度。"
			},
			degFreedom2: {
				name: "分母自由度",
				detail: "分母的自由度。"
			}
		}
	},
	F_TEST: {
		description: "傳回 F 檢驗的結果",
		abstract: "傳回 F 檢驗的結果",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/f-test-function"
		}],
		functionParameter: {
			array1: {
				name: "陣列1",
				detail: "第一個陣列或資料範圍。"
			},
			array2: {
				name: "陣列2",
				detail: "第二個陣列或資料範圍。"
			}
		}
	},
	FISHER: {
		description: "傳回 Fisher 變換值",
		abstract: "傳回 Fisher 變換值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/fisher-function"
		}],
		functionParameter: { x: {
			name: "數值",
			detail: "要轉換的數值。"
		} }
	},
	FISHERINV: {
		description: "傳回 Fisher 變換的反函數",
		abstract: "傳回 Fisher 變換的反函數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/fisherinv-function"
		}],
		functionParameter: { y: {
			name: "數值",
			detail: "要執行反轉換的數值。"
		} }
	},
	FORECAST: {
		description: "返回線性趨勢值",
		abstract: "返回線性趨勢值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/forecast-and-forecast-linear-functions"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "要預測值的資料點。"
			},
			knownYs: {
				name: "陣列_y",
				detail: "代表因變數資料的陣列或矩陣的範圍。"
			},
			knownXs: {
				name: "陣列_x",
				detail: "代表自變數資料的陣列或矩陣的範圍。"
			}
		}
	},
	FORECAST_ETS: {
		description: "透過使用指數平滑 (ETS) 演算法的 AAA 版本，傳回基於現有（歷史）值的未來值",
		abstract: "透過使用指數平滑 (ETS) 演算法的 AAA 版本，傳回基於現有（歷史）值的未來值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/forecast-ets-function"
		}],
		functionParameter: {
			targetDate: {
				name: "目標日期",
				detail: "要預測其值的資料點。"
			},
			values: {
				name: "值",
				detail: "用於預測的歷史值。"
			},
			timeline: {
				name: "時間軸",
				detail: "由固定間距的數值日期或時間組成的獨立範圍或陣列。"
			},
			seasonality: {
				name: "季節性",
				detail: "選用。1 表示自動偵測，0 表示無季節性。"
			},
			dataCompletion: {
				name: "資料補全",
				detail: "選用。1 表示插補遺漏點，0 表示將遺漏點視為零。"
			},
			aggregation: {
				name: "彙總",
				detail: "選用。以 1 到 7 指定重複時間戳記的彙總方式。"
			}
		}
	},
	FORECAST_ETS_CONFINT: {
		description: "傳回指定目標日期預測值的置信區間",
		abstract: "傳回指定目標日期預測值的置信區間",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/forecast-ets-confint-function"
		}],
		functionParameter: {
			targetDate: {
				name: "目標日期",
				detail: "要預測其值的資料點。"
			},
			values: {
				name: "值",
				detail: "用於預測的歷史值。"
			},
			timeline: {
				name: "時間軸",
				detail: "由固定間距的數值日期或時間組成的獨立範圍或陣列。"
			},
			confidenceLevel: {
				name: "信賴水準",
				detail: "選用。0 到 1 之間的數字，預設值為 0.95。"
			},
			seasonality: {
				name: "季節性",
				detail: "選用。1 表示自動偵測，0 表示無季節性。"
			},
			dataCompletion: {
				name: "資料補全",
				detail: "選用。1 表示插補遺漏點，0 表示將遺漏點視為零。"
			},
			aggregation: {
				name: "彙總",
				detail: "選用。以 1 到 7 指定重複時間戳記的彙總方式。"
			}
		}
	},
	FORECAST_ETS_SEASONALITY: {
		description: "傳回 Excel 針對指定時間系列偵測到的重複模式的長度",
		abstract: "傳回 Excel 針對指定時間系列偵測到的重複模式的長度",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/forecast-ets-seasonality-function"
		}],
		functionParameter: {
			values: {
				name: "值",
				detail: "用於預測的歷史值。"
			},
			timeline: {
				name: "時間軸",
				detail: "由固定間距的數值日期或時間組成的獨立範圍或陣列。"
			},
			dataCompletion: {
				name: "資料補全",
				detail: "選用。1 表示插補遺漏點，0 表示將遺漏點視為零。"
			},
			aggregation: {
				name: "彙總",
				detail: "選用。以 1 到 7 指定重複時間戳記的彙總方式。"
			}
		}
	},
	FORECAST_ETS_STAT: {
		description: "傳回作為時間序列預測的結果的統計值。 ",
		abstract: "傳回作為時間序列預測的結果的統計值。 ",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/forecast-ets-stat-function"
		}],
		functionParameter: {
			values: {
				name: "值",
				detail: "用於預測的歷史值。"
			},
			timeline: {
				name: "時間軸",
				detail: "由固定間距的數值日期或時間組成的獨立範圍或陣列。"
			},
			statisticType: {
				name: "統計類型",
				detail: "以 1 到 8 指定要傳回的預測統計值。"
			},
			seasonality: {
				name: "季節性",
				detail: "選用。1 表示自動偵測，0 表示無季節性。"
			},
			dataCompletion: {
				name: "資料補全",
				detail: "選用。1 表示插補遺漏點，0 表示將遺漏點視為零。"
			},
			aggregation: {
				name: "彙總",
				detail: "選用。以 1 到 7 指定重複時間戳記的彙總方式。"
			}
		}
	},
	FORECAST_LINEAR: {
		description: "傳回基於現有值的未來值",
		abstract: "傳回基於現有值的未來值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/forecast-and-forecast-linear-functions"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "要預測值的資料點。"
			},
			knownYs: {
				name: "陣列_y",
				detail: "代表因變數資料的陣列或矩陣的範圍。"
			},
			knownXs: {
				name: "陣列_x",
				detail: "代表自變數資料的陣列或矩陣的範圍。"
			}
		}
	},
	FREQUENCY: {
		description: "以垂直數組的形式傳回頻率分佈",
		abstract: "以垂直數組的形式傳回頻率分佈",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/frequency-function"
		}],
		functionParameter: {
			dataArray: {
				name: "資料陣列",
				detail: "所要計算頻率的一組數值的陣列或參照。 如果 data_array 沒有值，FREQUENCY 會傳回零陣列。"
			},
			binsArray: {
				name: "區間陣列",
				detail: "區間的陣列或參照，用以將 data_array 中的值分組。 如果 bins_array 沒有值，FREQUENCY 會傳回 data_array 中的元素個數。"
			}
		}
	},
	GAMMA: {
		description: "傳回 γ 函數值",
		abstract: "傳回 γ 函數值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/gamma-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "伽瑪函數的輸入值。"
		} }
	},
	GAMMA_DIST: {
		description: "傳回 γ 分佈",
		abstract: "傳回 γ 分佈",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/gamma-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "要找出分佈的數值。"
			},
			alpha: {
				name: "alpha",
				detail: "分佈的第一個參數。"
			},
			beta: {
				name: "beta",
				detail: "分佈的第二個參數。"
			},
			cumulative: {
				name: "累積",
				detail: "決定函數形式的邏輯值。如果為 TRUE，則 GAMMA.DIST 傳回累積分佈函數；如果為 FALSE，則傳回機率密度函數。"
			}
		}
	},
	GAMMA_INV: {
		description: "傳回 γ 累積分佈函數的反函數",
		abstract: "傳回 γ 累積分佈函數的反函數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/gamma-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "機率",
				detail: "與伽瑪分佈的相關機率。"
			},
			alpha: {
				name: "alpha",
				detail: "分佈的第一個參數。"
			},
			beta: {
				name: "beta",
				detail: "分佈的第二個參數。"
			}
		}
	},
	GAMMALN: {
		description: "傳回 γ 函數的自然對數，Γ(x)",
		abstract: "傳回 γ 函數的自然對數，Γ(x)",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/gammaln-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "要計算 GAMMALN 的值。"
		} }
	},
	GAMMALN_PRECISE: {
		description: "傳回 γ 函數的自然對數，Γ(x)",
		abstract: "傳回 γ 函數的自然對數，Γ(x)",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/gammaln-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "要計算 GAMMALN.PRECISE 的值。"
		} }
	},
	GAUSS: {
		description: "傳回小於標準常態累積分佈 0.5 的值",
		abstract: "傳回小於標準常態累積分佈 0.5 的值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/gauss-function"
		}],
		functionParameter: { z: {
			name: "z",
			detail: "要找出分佈的數值。"
		} }
	},
	GEOMEAN: {
		description: "返回幾何平均值",
		abstract: "返回幾何平均",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/geomean-function"
		}],
		functionParameter: {
			number1: {
				name: "數值 1",
				detail: "要計算幾何平均值的第一個數字、儲存格參考或儲存格區域。 "
			},
			number2: {
				name: "數值 2",
				detail: "要計算幾何平均值的其他數字、儲存格參考或儲存格區域，最多可包含 255 個。 "
			}
		}
	},
	GROWTH: {
		description: "返回指數趨勢值",
		abstract: "返回指數趨勢值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/growth-function"
		}],
		functionParameter: {
			knownYs: {
				name: "已知資料_y",
				detail: "在 y = b*m^x 關係中一組已知的 y 值。"
			},
			knownXs: {
				name: "已知資料_x",
				detail: "在 y = b*m^x 關係中一組已知的 x 值。"
			},
			newXs: {
				name: "新資料_x",
				detail: "要 GROWTH 傳回對應 y 值的新 x 值。"
			},
			constb: {
				name: "b",
				detail: "指定是否強迫常數 b 等於 1 的邏輯值。"
			}
		}
	},
	HARMEAN: {
		description: "返回調和平均值",
		abstract: "返回調和平均",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/harmean-function"
		}],
		functionParameter: {
			number1: {
				name: "數值 1",
				detail: "要計算調和平均值的第一個數字、儲存格參考或儲存格區域。 "
			},
			number2: {
				name: "數值 2",
				detail: "要計算調和平均值的其他數字、儲存格參考或儲存格區域，最多可包含 255 個。 "
			}
		}
	},
	HYPGEOM_DIST: {
		description: "返回超幾何分佈",
		abstract: "返回超幾何分佈",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/hypgeom-dist-function"
		}],
		functionParameter: {
			sampleS: {
				name: "樣本成功次數",
				detail: "樣本中成功的次數。"
			},
			numberSample: {
				name: "樣本大小",
				detail: "樣本大小。"
			},
			populationS: {
				name: "總體成功次數",
				detail: "總體中成功的次數。"
			},
			numberPop: {
				name: "總體大小",
				detail: "總體大小。"
			},
			cumulative: {
				name: "累積",
				detail: "決定函數形式的邏輯值。如果為 TRUE，則 HYPGEOM.DIST 傳回累積分佈函數；如果為 FALSE，則傳回機率密度函數。"
			}
		}
	},
	INTERCEPT: {
		description: "傳回線性迴歸線的截距",
		abstract: "返回線性迴歸線的截距",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/intercept-function"
		}],
		functionParameter: {
			knownYs: {
				name: "陣列_y",
				detail: "代表因變數資料的陣列或矩陣的範圍。"
			},
			knownXs: {
				name: "陣列_x",
				detail: "代表自變數資料的陣列或矩陣的範圍。"
			}
		}
	},
	KURT: {
		description: "傳回資料集的峰值",
		abstract: "返回資料集的峰值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/kurt-function"
		}],
		functionParameter: {
			number1: {
				name: "數值 1",
				detail: "要計算峰值的第一個數字、儲存格參考或儲存格區域。 "
			},
			number2: {
				name: "數值 2",
				detail: "要計算峰值的其他數字、儲存格參考或儲存格區域，最多可包含 255 個。 "
			}
		}
	},
	LARGE: {
		description: "返回資料集中第 k 個最大值",
		abstract: "返回資料集中第 k 個最大值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/large-function"
		}],
		functionParameter: {
			array: {
				name: "陣列",
				detail: "要判斷第 k 個最大值的陣列或資料範圍。"
			},
			k: {
				name: "k",
				detail: "要傳回之資料陣列或儲存格範圍中的位置 (由最大起算)。"
			}
		}
	},
	LINEST: {
		description: "傳回線性趨勢的參數",
		abstract: "返回線性趨勢的參數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/linest-function"
		}],
		functionParameter: {
			knownYs: {
				name: "已知資料_y",
				detail: "在 y = m*x+b 關係中一組已知的 y 值。"
			},
			knownXs: {
				name: "已知資料_x",
				detail: "在 y = m*x+b 關係中一組已知的 x 值。"
			},
			constb: {
				name: "b",
				detail: "指定是否強迫常數 b 等於 0 的邏輯值。"
			},
			stats: {
				name: "統計",
				detail: "指定是否要傳回額外迴歸統計值的邏輯值。"
			}
		}
	},
	LOGEST: {
		description: "傳回指數趨勢的參數",
		abstract: "傳回指數趨勢的參數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/logest-function"
		}],
		functionParameter: {
			knownYs: {
				name: "已知資料_y",
				detail: "在 y = b*m^x 關係中一組已知的 y 值。"
			},
			knownXs: {
				name: "已知資料_x",
				detail: "在 y = b*m^x 關係中一組已知的 x 值。"
			},
			constb: {
				name: "b",
				detail: "指定是否強迫常數 b 等於 1 的邏輯值。"
			},
			stats: {
				name: "統計",
				detail: "指定是否要傳回額外迴歸統計值的邏輯值。"
			}
		}
	},
	LOGNORM_DIST: {
		description: "傳回對數常態累積分佈",
		abstract: "傳回對數常態累積分佈",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/lognorm-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "要找出分佈的數值。"
			},
			mean: {
				name: "平均值",
				detail: "分佈的算術平均值。"
			},
			standardDev: {
				name: "標準差",
				detail: "分佈的標準差。"
			},
			cumulative: {
				name: "累積",
				detail: "決定函數形式的邏輯值。 如果為 TRUE，LOGNORM.DIST 會傳回累積分佈函數；如果為 FALSE，則會傳回機率密度函數。"
			}
		}
	},
	LOGNORM_INV: {
		description: "傳回對數常態累積分佈的反函數",
		abstract: "傳回對數常態累積分佈的反函數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/lognorm-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "機率",
				detail: "對應到對數常態分佈的機率。"
			},
			mean: {
				name: "平均值",
				detail: "分佈的算術平均值。"
			},
			standardDev: {
				name: "標準差",
				detail: "分佈的標準差。"
			}
		}
	},
	MARGINOFERROR: {
		description: "這個函式會計算特定值範圍和信賴水準的誤差範圍。",
		abstract: "這個函式會計算特定值範圍和信賴水準的誤差範圍。",
		links: [{
			title: "教導",
			url: "https://support.google.com/docs/answer/12487850?hl=zh-Hant"
		}],
		functionParameter: {
			range: {
				name: "範圍",
				detail: "MARGINOFERROR(A1:C3, 0.99)"
			},
			confidence: {
				name: "信賴水準",
				detail: "想要的信賴水準介於 (0, 1) 之間。"
			}
		}
	},
	MAX: {
		description: "傳回一組值中的最大值。 ",
		abstract: "傳回參數清單中的最大值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/max-function"
		}],
		functionParameter: {
			number1: {
				name: "數值 1",
				detail: "要計算最大值的第一個數字、儲存格參考或儲存格區域。 "
			},
			number2: {
				name: "數值 2",
				detail: "若要計算最大值的其他數字、儲存格參考或儲存格區域，最多可包含 255 個。 "
			}
		}
	},
	MAXA: {
		description: "傳回參數清單中的最大值，包括數字、文字和邏輯值。 ",
		abstract: "傳回參數清單中的最大值，包括數字、文字和邏輯值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/maxa-function"
		}],
		functionParameter: {
			value1: {
				name: "值 1",
				detail: "要從中找出最大值的第一個數值參數。 "
			},
			value2: {
				name: "值 2",
				detail: "要從中找出最大值的 2 到 255 個數值參數。 "
			}
		}
	},
	MAXIFS: {
		description: "傳回一組給定條件或標準指定的儲存格之間的最大值",
		abstract: "傳回一組給定條件或標準指定的儲存格之間的最大值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/maxifs-function"
		}],
		functionParameter: {
			maxRange: {
				name: "最大值範圍",
				detail: "確定最大值的實際儲存格區域。 "
			},
			criteriaRange1: {
				name: "條件範圍 1",
				detail: "是一組用於條件計算的儲存格。 "
			},
			criteria1: {
				name: "條件 1",
				detail: "用來決定哪些儲存格是最大值的條件，格式為數字、表達式或文字。 一組相同的條件適用於 MINIFS、SUMIFS 和 AVERAGEIFS 函數。 "
			},
			criteriaRange2: {
				name: "條件範圍 2",
				detail: "附加區域。 最多可輸入 127 個區域。 "
			},
			criteria2: {
				name: "條件 2",
				detail: "附加關聯條件。 最多可以輸入 127 個條件。 "
			}
		}
	},
	MEDIAN: {
		description: "傳回給定數值集合的中位數",
		abstract: "傳回給定數值集合的中位數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/median-function"
		}],
		functionParameter: {
			number1: {
				name: "數值 1",
				detail: "要計算中位數的第一個數字、儲存格參考或儲存格區域。 "
			},
			number2: {
				name: "數值 2",
				detail: "要計算中位數的其他數字、儲存格參考或儲存格區域，最多可包含 255 個。 "
			}
		}
	},
	MIN: {
		description: "傳回一組值中的最小值。 ",
		abstract: "傳回參數清單中的最小值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/min-function"
		}],
		functionParameter: {
			number1: {
				name: "數值 1",
				detail: "要計算最小值的第一個數字、儲存格參考或儲存格區域。 "
			},
			number2: {
				name: "數值 2",
				detail: "要計算最小值的其他數字、儲存格參考或儲存格區域，最多可包含 255 個。 "
			}
		}
	},
	MINA: {
		description: "傳回參數清單中的最小值，包括數字、文字和邏輯值。 ",
		abstract: "傳回參數清單中的最小值，包括數字、文字和邏輯值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/mina-function"
		}],
		functionParameter: {
			value1: {
				name: "值 1",
				detail: "要計算最小值的第一個數字、儲存格參考或儲存格區域。 "
			},
			value2: {
				name: "值 2",
				detail: "其他要計算最小值的數字、儲存格參考或儲存格區域，最多可包含 255 個。 "
			}
		}
	},
	MINIFS: {
		description: "傳回一組給定條件或標準指定的儲存格之間的最小值。 ",
		abstract: "傳回一組給定條件或標準指定的儲存格之間的最小值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/minifs-function"
		}],
		functionParameter: {
			minRange: {
				name: "最小值範圍",
				detail: "確定最小值的實際儲存格區域。 "
			},
			criteriaRange1: {
				name: "條件範圍 1",
				detail: "是一組用於條件計算的儲存格。 "
			},
			criteria1: {
				name: "條件 1",
				detail: "用來決定哪些儲存格是最小值的條件，格式為數字、表達式或文字。 一組相同的條件適用於 MAXIFS、SUMIFS 和 AVERAGEIFS 函數。 "
			},
			criteriaRange2: {
				name: "條件範圍 2",
				detail: "附加區域。 最多可輸入 127 個區域。 "
			},
			criteria2: {
				name: "條件 2",
				detail: "附加關聯條件。 最多可以輸入 127 個條件。 "
			}
		}
	},
	MODE_MULT: {
		description: "傳回一組資料或資料區域中出現頻率最高或重複出現的數值的垂直陣列",
		abstract: "傳回一組資料或資料區域中出現頻率最高或重複出現的數值的垂直陣列",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/mode-mult-function"
		}],
		functionParameter: {
			number1: {
				name: "數值 1",
				detail: "要計算眾數的第一個數字、儲存格參考或儲存格區域。 "
			},
			number2: {
				name: "數值 2",
				detail: "要計算眾數的其他數字、儲存格參考或儲存格區域，最多可包含 255 個。 "
			}
		}
	},
	MODE_SNGL: {
		description: "傳回在資料集內出現次數最多的值",
		abstract: "傳回在資料集內出現次數最多的值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/mode-sngl-function"
		}],
		functionParameter: {
			number1: {
				name: "數值 1",
				detail: "要計算眾數的第一個數字、儲存格參考或儲存格區域。 "
			},
			number2: {
				name: "數值 2",
				detail: "要計算眾數的其他數字、儲存格參考或儲存格區域，最多可包含 255 個。 "
			}
		}
	},
	NEGBINOM_DIST: {
		description: "傳回負二項式分佈",
		abstract: "返回負二項式分佈",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/negbinom-dist-function"
		}],
		functionParameter: {
			numberF: {
				name: "失敗次數",
				detail: "失敗的次數。"
			},
			numberS: {
				name: "成功次數",
				detail: "成功的閥值數目。"
			},
			probabilityS: {
				name: "成功機率",
				detail: "成功的機率。"
			},
			cumulative: {
				name: "累積",
				detail: "決定函數形式的邏輯值。 如果為 TRUE，NEGBINOM.DIST 會傳回累積分佈函數；如果為 FALSE，則會傳回機率密度函數。"
			}
		}
	},
	NORM_DIST: {
		description: "傳回常態累積分佈",
		abstract: "返回常態累積分佈",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/norm-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "要找出分佈的數值。"
			},
			mean: {
				name: "平均值",
				detail: "分佈的算術平均值。"
			},
			standardDev: {
				name: "標準差",
				detail: "分佈的標準差。"
			},
			cumulative: {
				name: "累積",
				detail: "決定函數形式的邏輯值。 如果為 TRUE，NORM.DIST 會傳回累積分佈函數；如果為 FALSE，則會傳回機率密度函數。"
			}
		}
	},
	NORM_INV: {
		description: "傳回常態累積分佈的反函數",
		abstract: "傳回常態累積分佈的反函數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/norm-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "機率",
				detail: "對應到常態分佈的機率。"
			},
			mean: {
				name: "平均值",
				detail: "分佈的算術平均值。"
			},
			standardDev: {
				name: "標準差",
				detail: "分佈的標準差。"
			}
		}
	},
	NORM_S_DIST: {
		description: "傳回標準常態累積分佈",
		abstract: "傳回標準常態累積分佈",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/norm-s-dist-function"
		}],
		functionParameter: {
			z: {
				name: "z",
				detail: "要找出分佈的數值。"
			},
			cumulative: {
				name: "累積",
				detail: "決定函數形式的邏輯值。 如果為 TRUE，NORM.DIST 會傳回累積分佈函數；如果為 FALSE，則會傳回機率密度函數。"
			}
		}
	},
	NORM_S_INV: {
		description: "傳回標準常態累積分佈函數的反函數",
		abstract: "傳回標準常態累積分佈函數的反函數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/norm-s-inv-function"
		}],
		functionParameter: { probability: {
			name: "機率",
			detail: "對應到常態分佈的機率。"
		} }
	},
	PEARSON: {
		description: "傳回 Pearson 乘積矩相關係數",
		abstract: "傳回 Pearson 乘積矩相關係數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/pearson-function"
		}],
		functionParameter: {
			array1: {
				name: "陣列1",
				detail: "代表因變數資料的陣列或矩陣的範圍。"
			},
			array2: {
				name: "陣列2",
				detail: "代表自變數資料的陣列或矩陣的範圍。"
			}
		}
	},
	PERCENTILE_EXC: {
		description: "傳回資料集中第 k 個百分點的值 (不包括 0 與 1)",
		abstract: "傳回資料集中第 k 個百分點的值 (不包括 0 與 1)",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/percentile-exc-function"
		}],
		functionParameter: {
			array: {
				name: "陣列",
				detail: "用以定義相對位置的陣列或資料範圍。"
			},
			k: {
				name: "k",
				detail: "在 0 到 1 範圍內 (不包括 0 與 1) 的百分位數。"
			}
		}
	},
	PERCENTILE_INC: {
		description: "傳回資料集中第 k 個百分點的值 (包括 0 與 1)",
		abstract: "傳回資料集中第 k 個百分點的值 (包括 0 與 1)",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/percentile-inc-function"
		}],
		functionParameter: {
			array: {
				name: "陣列",
				detail: "用以定義相對位置的陣列或資料範圍。"
			},
			k: {
				name: "k",
				detail: "在 0 到 1 範圍內 (包括 0 與 1) 的百分位數。"
			}
		}
	},
	PERCENTRANK_EXC: {
		description: "傳回資料集中值的百分比排位 (不包括 0 與 1)",
		abstract: "傳回資料集中值的百分比排位 (不包括 0 與 1)",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/percentrank-exc-function"
		}],
		functionParameter: {
			array: {
				name: "陣列",
				detail: "用以定義相對位置的陣列或資料範圍。"
			},
			x: {
				name: "x",
				detail: "想要知道排名的數值。"
			},
			significance: {
				name: "有效位數",
				detail: "用以識別傳回百分比值的最高有效位數之數值。 如果省略，PERCENTRANK.EXC 會使用三位小數 (0.xxx)。"
			}
		}
	},
	PERCENTRANK_INC: {
		description: "傳回資料集中值的百分比排位 (包括 0 與 1)",
		abstract: "傳回資料集中值的百分比排位 (包括 0 與 1)",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/percentrank-inc-function"
		}],
		functionParameter: {
			array: {
				name: "陣列",
				detail: "用以定義相對位置的陣列或資料範圍。"
			},
			x: {
				name: "x",
				detail: "想要知道排名的數值。"
			},
			significance: {
				name: "有效位數",
				detail: "用以識別傳回百分比值的最高有效位數之數值。 如果省略，PERCENTRANK.INC 會使用三位小數 (0.xxx)。"
			}
		}
	},
	PERMUT: {
		description: "傳回給定數目物件的排列數",
		abstract: "傳回給定數目物件的排列數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/permut-function"
		}],
		functionParameter: {
			number: {
				name: "總數",
				detail: "項目數。"
			},
			numberChosen: {
				name: "樣品數量",
				detail: "每個排列中的項目數。"
			}
		}
	},
	PERMUTATIONA: {
		description: "傳回可從總計物件中選取的給定數目物件（含重複）的排列數",
		abstract: "傳回可從總計物件中選取的給定數目物件（含重複）的排列數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/permutationa-function"
		}],
		functionParameter: {
			number: {
				name: "總數",
				detail: "項目數。"
			},
			numberChosen: {
				name: "樣品數量",
				detail: "每個排列中的項目數。"
			}
		}
	},
	PHI: {
		description: "傳回標準常態分佈的密度函數值",
		abstract: "傳回標準常態分佈的密度函數值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/phi-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "X 是要求標準常態分佈密度的數位。"
		} }
	},
	POISSON_DIST: {
		description: "返回泊松分佈",
		abstract: "返回泊松分佈",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/poisson-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "要找出分佈的數值。"
			},
			mean: {
				name: "平均值",
				detail: "分佈的算術平均值。"
			},
			cumulative: {
				name: "累積",
				detail: "決定函數形式的邏輯值。 如果為 TRUE，POISSON.DIST 會傳回累積分佈函數；如果為 FALSE，則會傳回機率密度函數。"
			}
		}
	},
	PROB: {
		description: "傳回區域中的數值落在指定區間內的機率",
		abstract: "傳回區域中的數值落在指定區間內的機率",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/prob-function"
		}],
		functionParameter: {
			xRange: {
				name: "數值",
				detail: "具有各自對應機率值的數值區域。"
			},
			probRange: {
				name: "機率",
				detail: "與數值相關聯的一組機率值。"
			},
			lowerLimit: {
				name: "下界",
				detail: "要計算其機率的數值下界。"
			},
			upperLimit: {
				name: "上界",
				detail: "要計算其機率的數值上界。"
			}
		}
	},
	QUARTILE_EXC: {
		description: "傳回資料集的四分位數 (不包括 0 與 1)",
		abstract: "傳回資料集的四分位數 (不包括 0 與 1)",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/quartile-exc-function"
		}],
		functionParameter: {
			array: {
				name: "陣列",
				detail: "要求得四分位數值的陣列或資料範圍。"
			},
			quart: {
				name: "四分位值",
				detail: "要傳回的四分位數值。"
			}
		}
	},
	QUARTILE_INC: {
		description: "傳回資料集的四分位數 (包括 0 與 1)",
		abstract: "傳回資料集的四分位數 (包括 0 與 1)",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/quartile-inc-function"
		}],
		functionParameter: {
			array: {
				name: "陣列",
				detail: "要求得四分位數值的陣列或資料範圍。"
			},
			quart: {
				name: "四分位值",
				detail: "要傳回的四分位數值。"
			}
		}
	},
	RANK_AVG: {
		description: "傳回一列數字的數字排位",
		abstract: "傳回一列數字的數字排位",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/rank-avg-function"
		}],
		functionParameter: {
			number: {
				name: "數值",
				detail: "要找出其排名的數字。"
			},
			ref: {
				name: "數位清單",
				detail: "數位清單的參照。會忽略 ref 中的非數值。"
			},
			order: {
				name: "排列方式",
				detail: "指定排列數值方式的數字。0 或省略為遞減順序排序，非 0 為遞增順序排序。"
			}
		}
	},
	RANK_EQ: {
		description: "傳回一列數字的數字排位",
		abstract: "傳回一列數字的數字排位",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/rank-eq-function"
		}],
		functionParameter: {
			number: {
				name: "數值",
				detail: "要找出其排名的數字。"
			},
			ref: {
				name: "數位清單",
				detail: "數位清單的參照。會忽略 ref 中的非數值。"
			},
			order: {
				name: "排列方式",
				detail: "指定排列數值方式的數字。0 或省略為遞減順序排序，非 0 為遞增順序排序。"
			}
		}
	},
	RSQ: {
		description: "傳回 Pearson 乘積矩相關係數的平方",
		abstract: "傳回 Pearson 積矩相關係數的平方",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/rsq-function"
		}],
		functionParameter: {
			knownYs: {
				name: "陣列_y",
				detail: "代表因變數資料的陣列或矩陣的範圍。"
			},
			knownXs: {
				name: "陣列_x",
				detail: "代表自變數資料的陣列或矩陣的範圍。"
			}
		}
	},
	SKEW: {
		description: "傳回分佈的偏斜度",
		abstract: "傳回分佈的偏斜度",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/skew-function"
		}],
		functionParameter: {
			number1: {
				name: "數值 1",
				detail: "要計算偏斜度的第一個數字、儲存格參考或儲存格區域。 "
			},
			number2: {
				name: "數值 2",
				detail: "要計算偏斜度的其他數字、儲存格參考或儲存格區域，最多可包含 255 個。 "
			}
		}
	},
	SKEW_P: {
		description: "傳回基於樣本總體的分佈的偏斜度",
		abstract: "傳回基於樣本總體的分佈的偏斜度",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/skew-p-function"
		}],
		functionParameter: {
			number1: {
				name: "數值 1",
				detail: "要計算偏斜度的第一個數字、儲存格參考或儲存格區域。 "
			},
			number2: {
				name: "數值 2",
				detail: "要計算偏斜度的其他數字、儲存格參考或儲存格區域，最多可包含 255 個。 "
			}
		}
	},
	SLOPE: {
		description: "傳回線性迴歸線的斜率",
		abstract: "傳回線性迴歸線的斜率",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/slope-function"
		}],
		functionParameter: {
			knownYs: {
				name: "陣列_y",
				detail: "代表因變數資料的陣列或矩陣的範圍。"
			},
			knownXs: {
				name: "陣列_x",
				detail: "代表自變數資料的陣列或矩陣的範圍。"
			}
		}
	},
	SMALL: {
		description: "傳回資料集中的第 k 個最小值",
		abstract: "傳回資料集中的第 k 個最小值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/small-function"
		}],
		functionParameter: {
			array: {
				name: "陣列",
				detail: "要判斷第 k 個最小值的陣列或資料範圍。"
			},
			k: {
				name: "k",
				detail: "要傳回之資料陣列或儲存格範圍中的位置 (由最小起算)。"
			}
		}
	},
	STANDARDIZE: {
		description: "返回常態化數值",
		abstract: "返回常態化數值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/standardize-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "要找出常態化的數值。"
			},
			mean: {
				name: "平均值",
				detail: "分佈的算術平均值。"
			},
			standardDev: {
				name: "標準差",
				detail: "分佈的標準差。"
			}
		}
	},
	STDEV_P: {
		description: "計算基於以參數形式給出的整個樣本總體的標準偏差（忽略邏輯值和文本）。 ",
		abstract: "基於整個樣本總體計算標準差",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/stdev-p-function"
		}],
		functionParameter: {
			number1: {
				name: "數值 1",
				detail: "對應於總體的第一個數值參數。 "
			},
			number2: {
				name: "數值 2",
				detail: "對應於總體的 2 到 254 個數值參數。 也可以用單一數組或對某個數組的引用來代替用逗號分隔的參數。 "
			}
		}
	},
	STDEV_S: {
		description: "基於樣本估算標準差（忽略樣本中的邏輯值和文字）。 ",
		abstract: "基於樣本估算標準差",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/stdev-s-function"
		}],
		functionParameter: {
			number1: {
				name: "數值 1",
				detail: "對應於總體樣本的第一個數值參數。 也可以用單一數組或對某個數組的引用來代替用逗號分隔的參數。 "
			},
			number2: {
				name: "數值 2",
				detail: "對應於總體樣本的 2 到 254 個數值參數。 也可以用單一數組或對某個數組的引用來代替用逗號分隔的參數。 "
			}
		}
	},
	STDEVA: {
		description: "基於樣本（包括數字、文字和邏輯值）估算標準差。 ",
		abstract: "基於樣本（包括數字、文字和邏輯值）估算標準差",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/stdeva-function"
		}],
		functionParameter: {
			value1: {
				name: "值 1",
				detail: "對應於總體樣本的第一個值參數。 也可以用單一數組或對某個數組的引用來代替用逗號分隔的參數。 "
			},
			value2: {
				name: "值 2",
				detail: "對應於總體樣本的 2 到 254 個值參數。 也可以用單一數組或對某個數組的引用來代替用逗號分隔的參數。 "
			}
		}
	},
	STDEVPA: {
		description: "根據作為參數（包括文字和邏輯值）給定的整個總體計算標準偏差。 ",
		abstract: "基於樣本總體（包括數字、文本和邏輯值）計算標準偏差",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/stdevpa-function"
		}],
		functionParameter: {
			value1: {
				name: "值 1",
				detail: "對應於總體的第一個值參數。 "
			},
			value2: {
				name: "值 2",
				detail: "對應於總體的 2 到 254 個值參數。 也可以用單一數組或對某個數組的引用來代替用逗號分隔的參數。 "
			}
		}
	},
	STEYX: {
		description: "傳回透過線性迴歸法預測每個 x 的 y 值時所產生的標準誤差",
		abstract: "返回透過線性迴歸法預測每個 x 的 y 值時所產生的標準誤差",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/steyx-function"
		}],
		functionParameter: {
			knownYs: {
				name: "陣列_y",
				detail: "代表因變數資料的陣列或矩陣的範圍。"
			},
			knownXs: {
				name: "陣列_x",
				detail: "代表自變數資料的陣列或矩陣的範圍。"
			}
		}
	},
	T_DIST: {
		description: "傳回學生的 t 機率分佈",
		abstract: "傳回學生的 t 機率分佈",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/t-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "需要計算分佈的數值。"
			},
			degFreedom: {
				name: "自由度",
				detail: "一個表示自由度數的整數。"
			},
			cumulative: {
				name: "累積",
				detail: "決定函數形式的邏輯值。 如果為 TRUE，T.DIST 會傳回累積分佈函數；如果為 FALSE，則會傳回機率密度函數。"
			}
		}
	},
	T_DIST_2T: {
		description: "傳回學生的 t 機率分佈 (雙尾)",
		abstract: "傳回學生的 t 機率分佈 (雙尾)",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/t-dist-2t-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "需要計算分佈的數值。"
			},
			degFreedom: {
				name: "自由度",
				detail: "一個表示自由度數的整數。"
			}
		}
	},
	T_DIST_RT: {
		description: "傳回學生的 t 機率分佈 (右尾)",
		abstract: "傳回學生的 t 機率分佈 (右尾)",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/t-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "需要計算分佈的數值。"
			},
			degFreedom: {
				name: "自由度",
				detail: "一個表示自由度數的整數。"
			}
		}
	},
	T_INV: {
		description: "傳回學生的 t 機率分佈的反函數",
		abstract: "傳回學生的 t 機率分佈的反函數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/t-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "機率",
				detail: "與學生的 t 分佈相關的機率。"
			},
			degFreedom: {
				name: "自由度",
				detail: "一個表示自由度數的整數。"
			}
		}
	},
	T_INV_2T: {
		description: "傳回學生的 t 機率分佈的反函數 (雙尾)",
		abstract: "傳回學生的 t 機率分佈的反函數 (雙尾)",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/t-inv-2t-function"
		}],
		functionParameter: {
			probability: {
				name: "機率",
				detail: "與學生的 t 分佈相關的機率。"
			},
			degFreedom: {
				name: "自由度",
				detail: "一個表示自由度數的整數。"
			}
		}
	},
	T_TEST: {
		description: "傳回與學生 t-檢定相關的機率",
		abstract: "返回與學生 t-檢定相關的機率",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/t-test-function"
		}],
		functionParameter: {
			array1: {
				name: "陣列1",
				detail: "第一個陣列或資料範圍。"
			},
			array2: {
				name: "陣列2",
				detail: "第二個陣列或資料範圍。"
			},
			tails: {
				name: "尾部特性",
				detail: "指定分佈的尾數。 如果 tails = 1，T.TEST 會使用單尾分佈。 如果 tails = 2，T.TEST 會使用雙尾分佈。"
			},
			type: {
				name: "檢定類型",
				detail: "要執行的 t 檢定類型。"
			}
		}
	},
	TREND: {
		description: "返回線性趨勢值",
		abstract: "返回線性趨勢值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/trend-function"
		}],
		functionParameter: {
			knownYs: {
				name: "已知資料_y",
				detail: "在 y = m*x+b 關係中一組已知的 y 值。"
			},
			knownXs: {
				name: "已知資料_x",
				detail: "在 y = m*x+b 關係中一組已知的 x 值。"
			},
			newXs: {
				name: "新資料_x",
				detail: "要 TREND 傳回對應 y 值的新 x 值。"
			},
			constb: {
				name: "b",
				detail: "指定是否強迫常數 b 等於 0 的邏輯值。"
			}
		}
	},
	TRIMMEAN: {
		description: "傳回資料集的內部平均值",
		abstract: "傳回資料集的內部平均值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/trimmean-function"
		}],
		functionParameter: {
			array: {
				name: "陣列",
				detail: "要求得內部平均值的陣列或資料範圍。"
			},
			percent: {
				name: "排除比例",
				detail: "從計算中排除資料點的百分比值。"
			}
		}
	},
	VAR_P: {
		description: "計算基於整個樣本總體的變異數（忽略樣本總體中的邏輯值和文字）。 ",
		abstract: "計算以樣本總體為基礎的變異數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/var-p-function"
		}],
		functionParameter: {
			number1: {
				name: "數值 1",
				detail: "對應於總體的第一個數值參數。 "
			},
			number2: {
				name: "數值 2",
				detail: "對應於總體的 2 到 254 個數值參數。 "
			}
		}
	},
	VAR_S: {
		description: "估算以樣本為基礎的變異數（忽略樣本中的邏輯值和文字）。 ",
		abstract: "基於樣本估算變異數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/var-s-function"
		}],
		functionParameter: {
			number1: {
				name: "數值 1",
				detail: "對應於總體樣本的第一個數值參數。 "
			},
			number2: {
				name: "數值 2",
				detail: "對應於總體樣本的 2 到 254 個數值參數。 "
			}
		}
	},
	VARA: {
		description: "基於樣本（包括數字、文字和邏輯值）估算變異數",
		abstract: "以樣本為基礎（包括數字、文字和邏輯值）估算變異數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/vara-function"
		}],
		functionParameter: {
			value1: {
				name: "值 1",
				detail: "對應於總體樣本的第一個值參數。 "
			},
			value2: {
				name: "值 2",
				detail: "對應於總體樣本的 2 到 254 個值參數"
			}
		}
	},
	VARPA: {
		description: "基於樣本總體（包括數字、文本和邏輯值）計算標準差",
		abstract: "基於樣本總體（包括數字、文本和邏輯值）計算標準偏差",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/varpa-function"
		}],
		functionParameter: {
			value1: {
				name: "值 1",
				detail: "對應於總體的第一個值參數。 "
			},
			value2: {
				name: "值 2",
				detail: "對應於總體的 2 到 254 個值參數"
			}
		}
	},
	WEIBULL_DIST: {
		description: "傳回 Weibull 分佈",
		abstract: "傳回 Weibull 分佈",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/weibull-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "要找出分佈的數值。"
			},
			alpha: {
				name: "alpha",
				detail: "分佈的第一個參數。"
			},
			beta: {
				name: "beta",
				detail: "分佈的第二個參數。"
			},
			cumulative: {
				name: "累積",
				detail: "決定函數形式的邏輯值。如果為 TRUE，則 WEIBULL.DIST 傳回累積分佈函數；如果為 FALSE，則傳回機率密度函數。"
			}
		}
	},
	Z_TEST: {
		description: "傳回 z 檢定的單尾機率值",
		abstract: "傳回 z 檢定的單尾機率值",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/z-test-function"
		}],
		functionParameter: {
			array: {
				name: "陣列",
				detail: "用來檢定 x 的陣列或資料範圍。"
			},
			x: {
				name: "x",
				detail: "要檢定的值。"
			},
			sigma: {
				name: "標準差",
				detail: "總體（已知）標準差。如果省略，則使用樣本標準差。"
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/text/zh-TW.ts
const locale$2 = {
	ASC: {
		description: "將字串中的全角（雙位元組）英文字母或片假名改為半角（單字節）字元",
		abstract: "將字串中的全角（雙位元組）英文字母或片假名更改為半角（單字節）字元",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/asc-function"
		}],
		functionParameter: { text: {
			name: "文字",
			detail: "文字或儲存格參照，其中包含所要變更的文字。 如果文字中不包含任何全形字母，則文字不會變更。"
		} }
	},
	ARRAYTOTEXT: {
		description: "ARRAYTOTEXT 函數傳回任意指定區域內的文字值的陣列。 ",
		abstract: "ARRAYTOTEXT 函數傳回任意指定區域內的文字值的陣列。 ",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/arraytotext-function"
		}],
		functionParameter: {
			array: {
				name: "陣列",
				detail: "要傳回做為文字的陣列。"
			},
			format: {
				name: "資料格式",
				detail: "傳回資料的格式。它可以是兩個值的其中之一：\n0 預設。 易於閱讀的精簡格式。\n1 包含逸出字元和列分隔符號的限定格式。 產生可在輸入至資料編輯列時進行剖析的字串。 封裝會以引號傳回字串，除了布林值、數字和錯誤以外。"
			}
		}
	},
	BAHTTEXT: {
		description: "使用 ß（泰銖）貨幣格式將數字轉換為文本",
		abstract: "使用 ß（泰銖）貨幣格式將數字轉換為文本",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/bahttext-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "為要轉換成文字的數字，或包含數字的儲存格參照，或結果為數字的公式。"
		} }
	},
	CHAR: {
		description: "傳回由代碼數字指定的字元",
		abstract: "傳回由代碼數字指定的字元",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/char-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "介於 1 和 255 之間的數字，用以指定所需的字元。"
		} }
	},
	CLEAN: {
		description: "刪除文字中所有非列印字元",
		abstract: "刪除文字中所有非列印字元",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/clean-function"
		}],
		functionParameter: { text: {
			name: "文字",
			detail: "要從中移除無法列印之字元的任何工作表資訊。"
		} }
	},
	CODE: {
		description: "傳回文字字串中第一個字元的數字代碼",
		abstract: "傳回文字字串中第一個字元的數字代碼",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/code-function"
		}],
		functionParameter: { text: {
			name: "文字",
			detail: "欲求其第一個字元代碼的文字。"
		} }
	},
	CONCAT: {
		description: "將多個區域和/或字串的文字組合起來，但不提供分隔符號或 IgnoreEmpty 參數。 ",
		abstract: "將多個區域和/或字串的文字組合起來，但不提供分隔符號或 IgnoreEmpty 參數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/concat-function"
		}],
		functionParameter: {
			text1: {
				name: "文字 1",
				detail: "要聯結的文字項目。 字串或字串陣列，如儲存格範圍。 "
			},
			text2: {
				name: "文字 2",
				detail: "要聯結的其他文字項目。 文本項最多可以有 253 個文字參數。 每個參數可以是一個字串或字串陣列，如儲存格範圍。 "
			}
		}
	},
	CONCATENATE: {
		description: "將幾個文​​本項合併為一個文本項",
		abstract: "將幾個文​​本項合併為一個文本項",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/concatenate-function"
		}],
		functionParameter: {
			text1: {
				name: "文字 1",
				detail: "要聯結的第一個項目。 項目可以是文字值、數字或儲存格引用。 "
			},
			text2: {
				name: "文字 2",
				detail: "要聯結的其他文字項目。 最多可以有 255 個項目，總共最多支援 8,192 個字元。 "
			}
		}
	},
	DBCS: {
		description: "將字串中的半角（單字節）英文字母或片假名更改為全角（雙字節）字元",
		abstract: "將字串中的半角（單字節）英文字母或片假名更改為全角（雙字節）字元",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/dbcs-function"
		}],
		functionParameter: { text: {
			name: "文字",
			detail: "文字或儲存格參照，其中包含所要變更的文字。 如果文字中不包含任何半形英文字母或片假名，文字就不會變更。"
		} }
	},
	DOLLAR: {
		description: "使用貨幣格式將數字轉換為文本",
		abstract: "使用貨幣格式將數字轉換為文本",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/dollar-function"
		}],
		functionParameter: {
			number: {
				name: "數值",
				detail: "一個數字、一個含有數字之儲存格的參照，或一個評估為數字的公式。"
			},
			decimals: {
				name: "小數位數",
				detail: "小數點右邊的小數位數。 如果是負數，則會將數位四捨五入到小數點的左邊。 如果省略 decimals，則假設為 2。"
			}
		}
	},
	EXACT: {
		description: "檢查兩個文字值是否相同",
		abstract: "檢查兩個文字值是否相同",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/exact-function"
		}],
		functionParameter: {
			text1: {
				name: "文字1",
				detail: "第一個文字字串。"
			},
			text2: {
				name: "文字2",
				detail: "第二個文字字串。"
			}
		}
	},
	FIND: {
		description: "在一個文字值中找另一個文字值（區分大小寫）",
		abstract: "在一個文字值中找另一個文字值（區分大小寫）",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/this-article-has-been-retired"
		}],
		functionParameter: {
			findText: {
				name: "搜尋字串",
				detail: "要在“要搜尋的文字”中尋找的字串。"
			},
			withinText: {
				name: "要搜尋的文字",
				detail: "要搜尋“搜尋字串”的首次出現的文字。"
			},
			startNum: {
				name: "開始位置",
				detail: "要在“要搜尋的文字”中開始搜尋的字元位置。若省略則假定其值為 1。"
			}
		}
	},
	FINDB: {
		description: "在一個文字值中找另一個文字值（區分大小寫）",
		abstract: "在一個文字值中找另一個文字值（區分大小寫）",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/this-article-has-been-retired"
		}],
		functionParameter: {
			findText: {
				name: "搜尋字串",
				detail: "要在“要搜尋的文字”中尋找的字串。"
			},
			withinText: {
				name: "要搜尋的文字",
				detail: "要搜尋“搜尋字串”的首次出現的文字。"
			},
			startNum: {
				name: "開始位置",
				detail: "要在“要搜尋的文字”中開始搜尋的字元位置。若省略則假定其值為 1。"
			}
		}
	},
	FIXED: {
		description: "將數字格式設定為具有固定小數位數的文字",
		abstract: "將數字格式設定為具有固定小數位數的文字",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/fixed-function"
		}],
		functionParameter: {
			number: {
				name: "數值",
				detail: "要四捨五入並轉換為文字的數字。"
			},
			decimals: {
				name: "小數位數",
				detail: "小數點右邊的小數位數。 如果是負數，則會將數位四捨五入到小數點的左邊。 如果省略 decimals，則假設為 2。"
			},
			noCommas: {
				name: "禁用分隔符",
				detail: "邏輯值，如果為 TRUE，會阻止 FIXED 在傳回的文字中包含逗號。"
			}
		}
	},
	LEFT: {
		description: "傳回文字值中最左邊的字元",
		abstract: "傳回文字值中最左邊的字元",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/left-function"
		}],
		functionParameter: {
			text: {
				name: "文字",
				detail: "包含想擷取之字元的文字字串。"
			},
			numChars: {
				name: "字元數",
				detail: "指定要 LEFT 擷取的字元數目。"
			}
		}
	},
	LEFTB: {
		description: "傳回文字值中最左邊的字元",
		abstract: "傳回文字值中最左邊的字元",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/left-function"
		}],
		functionParameter: {
			text: {
				name: "文字",
				detail: "包含想擷取之字元的文字字串。"
			},
			numBytes: {
				name: "字節數",
				detail: "指定要 LEFTB 擷取的字元數目，以位元組為單位。"
			}
		}
	},
	LEN: {
		description: "傳回文字字串中的字元數",
		abstract: "傳回文字字串中的字元數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/len-function"
		}],
		functionParameter: { text: {
			name: "文字",
			detail: "要找出其長度的文字。 空格將作為字元進行計數。"
		} }
	},
	LENB: {
		description: "傳回文字字串中用於代表字元的位元組數。 ",
		abstract: "返回文字字串中用於代表字元的位元組數",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/len-function"
		}],
		functionParameter: { text: {
			name: "文字",
			detail: "要找出其長度的文字。 空格將作為字元進行計數。"
		} }
	},
	LOWER: {
		description: "將文字轉換為小寫。",
		abstract: "將文字轉換為小寫",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/lower-function"
		}],
		functionParameter: { text: {
			name: "文字",
			detail: "要轉換成小寫的文字。"
		} }
	},
	MID: {
		description: "從文字字串中的指定位置起傳回特定個數的字元",
		abstract: "從文字字串中的指定位置起傳回特定個數的字元",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/mid-function"
		}],
		functionParameter: {
			text: {
				name: "文字",
				detail: "包含想擷取之字元的文字字串。"
			},
			startNum: {
				name: "開始位置",
				detail: "要在文字中擷取之第一個字元的位置。"
			},
			numChars: {
				name: "字元數",
				detail: "指定要 MID 擷取的字元數目。"
			}
		}
	},
	MIDB: {
		description: "從文字字串中的指定位置起傳回特定個數的字元",
		abstract: "從文字字串中的指定位置起傳回特定個數的字元",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/mid-function"
		}],
		functionParameter: {
			text: {
				name: "文字",
				detail: "包含想擷取之字元的文字字串。"
			},
			startNum: {
				name: "開始位置",
				detail: "要在文字中擷取之第一個字元的位置。"
			},
			numBytes: {
				name: "字節數",
				detail: "指定要 MIDB 擷取的字元數目，以位元組為單位。"
			}
		}
	},
	NUMBERSTRING: {
		description: "將數字轉換為中文字符串",
		abstract: "將數字轉換為中文字符串",
		links: [{
			title: "教導",
			url: "https://www.wps.cn/learning/course/detail/id/340.html?chan=pc_kdocs_function"
		}],
		functionParameter: {
			number: {
				name: "數值",
				detail: "被轉換為中文字符串的數值。"
			},
			type: {
				name: "類型",
				detail: "傳回結果的類型。\n1. 漢字小寫 \n2. 漢字大寫 \n3. 漢字讀寫"
			}
		}
	},
	NUMBERVALUE: {
		description: "以與區域設定無關的方式將文字轉換為數字",
		abstract: "以與區域設定無關的方式將文字轉換為數字",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/numbervalue-function"
		}],
		functionParameter: {
			text: {
				name: "文字",
				detail: "要轉換成數位的文字。"
			},
			decimalSeparator: {
				name: "小數分隔符",
				detail: "用來分隔結果整數和小數部分的字元。"
			},
			groupSeparator: {
				name: "群組分隔符",
				detail: "用來分隔數位群組的字元。"
			}
		}
	},
	PHONETIC: {
		description: "提取文字字串中的拼音（漢字注音）字元",
		abstract: "提取文字字串中的拼音（漢字註音）字元",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/phonetic-function"
		}],
		functionParameter: { reference: {
			name: "參照",
			detail: "包含要擷取之注音文字的文字、範圍或參照。"
		} }
	},
	PROPER: {
		description: "將文字值的每個字的首字母大寫",
		abstract: "將文字值的每個字的首字母大寫",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/proper-function"
		}],
		functionParameter: { text: {
			name: "文字",
			detail: "以引號括住的文字、傳回文字的公式，或包含要將部分變為大寫之文字的儲存格參照。"
		} }
	},
	REGEXEXTRACT: {
		description: "根據規則運算式擷取第一個符合規則的子字串。",
		abstract: "根據規則運算式擷取第一個符合規則的子字串。",
		links: [{
			title: "教導",
			url: "https://support.google.com/docs/answer/3098244?hl=zh-Hant"
		}],
		functionParameter: {
			text: {
				name: "文字",
				detail: "輸入文字。"
			},
			regularExpression: {
				name: "規則運算式",
				detail: "指定規則運算式，系統就會傳回 text 中第一個符合此運算式的子字串。"
			}
		}
	},
	REGEXMATCH: {
		description: "某段文字是否符合規則運算式。",
		abstract: "某段文字是否符合規則運算式。",
		links: [{
			title: "教導",
			url: "https://support.google.com/docs/answer/3098292?hl=zh-Hant"
		}],
		functionParameter: {
			text: {
				name: "文字",
				detail: "系統會根據規則運算式測試此文字。"
			},
			regularExpression: {
				name: "規則運算式",
				detail: "用來測試文字的規則運算式。"
			}
		}
	},
	REGEXREPLACE: {
		description: "利用規則運算式將文字字串的一部分取代成其他文字字串。",
		abstract: "利用規則運算式將文字字串的一部分取代成其他文字字串。",
		links: [{
			title: "教導",
			url: "https://support.google.com/docs/answer/3098245?hl=zh-Hant"
		}],
		functionParameter: {
			text: {
				name: "文字",
				detail: "系統會取代這段文字的部分區段。"
			},
			regularExpression: {
				name: "規則運算式",
				detail: "規則運算式。系統將替換 text 中所有相符的項目。"
			},
			replacement: {
				name: "取代文字",
				detail: "系統會將這段文字插入原來的文字。"
			}
		}
	},
	REPLACE: {
		description: "替換文字中的字元",
		abstract: "替換文字中的字元",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/replace-function"
		}],
		functionParameter: {
			oldText: {
				name: "舊文字",
				detail: "要替換其中某些字元的文字。"
			},
			startNum: {
				name: "開始位置",
				detail: "要在文字中替換的第一個字元的位置。"
			},
			numChars: {
				name: "字元數",
				detail: "指定要 REPLACE 替換的字元數目。"
			},
			newText: {
				name: "替換文字",
				detail: "在舊文字中要替換字元的文字。"
			}
		}
	},
	REPLACEB: {
		description: "替換文字中的字元",
		abstract: "替換文字中的字元",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/replace-function"
		}],
		functionParameter: {
			oldText: {
				name: "舊文字",
				detail: "要替換其中某些字元的文字。"
			},
			startNum: {
				name: "開始位置",
				detail: "要在文字中替換的第一個字元的位置。"
			},
			numBytes: {
				name: "字節數",
				detail: "指定要 REPLACEB 替換的字元數目，以位元組為單位。"
			},
			newText: {
				name: "替換文字",
				detail: "在舊文字中要替換字元的文字。"
			}
		}
	},
	REPT: {
		description: "按給定次數重複文字",
		abstract: "按給定次數重複文字",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/rept-function"
		}],
		functionParameter: {
			text: {
				name: "文字",
				detail: "要重複的文字。"
			},
			numberTimes: {
				name: "重複次數",
				detail: "指定文字重複次數的正數。"
			}
		}
	},
	RIGHT: {
		description: "傳回文字值中最右邊的字元",
		abstract: "傳回文字值中最右邊的字元",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/right-function"
		}],
		functionParameter: {
			text: {
				name: "文字",
				detail: "包含想擷取之字元的文字字串。"
			},
			numChars: {
				name: "字元數",
				detail: "指定要 RIGHT 擷取的字元數目。"
			}
		}
	},
	RIGHTB: {
		description: "傳回文字值中最右邊的字元",
		abstract: "傳回文字值中最右邊的字元",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/right-function"
		}],
		functionParameter: {
			text: {
				name: "文字",
				detail: "包含想擷取之字元的文字字串。"
			},
			numBytes: {
				name: "字節數",
				detail: "指定要 RIGHTB 擷取的字元數目，以位元組為單位。"
			}
		}
	},
	SEARCH: {
		description: "在一個文字值中找另一個文字值（不區分大小寫）",
		abstract: "在一個文字值中找另一個文字值（不區分大小寫）",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/search-function"
		}],
		functionParameter: {
			findText: {
				name: "搜尋字串",
				detail: "要在“要搜尋的文字”中尋找的字串。"
			},
			withinText: {
				name: "要搜尋的文字",
				detail: "要搜尋“搜尋字串”的首次出現的文字。"
			},
			startNum: {
				name: "開始位置",
				detail: "要在“要搜尋的文字”中開始搜尋的字元位置。若省略則假定其值為 1。"
			}
		}
	},
	SEARCHB: {
		description: "在一個文字值中找另一個文字值（不區分大小寫）",
		abstract: "在一個文字值中找另一個文字值（不區分大小寫）",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/search-function"
		}],
		functionParameter: {
			findText: {
				name: "搜尋字串",
				detail: "要在“要搜尋的文字”中尋找的字串。"
			},
			withinText: {
				name: "要搜尋的文字",
				detail: "要搜尋“搜尋字串”的首次出現的文字。"
			},
			startNum: {
				name: "開始位置",
				detail: "要在“要搜尋的文字”中開始搜尋的字元位置。若省略則假定其值為 1。"
			}
		}
	},
	SUBSTITUTE: {
		description: "在文字字符串中以新文字取代舊文字",
		abstract: "在文字字串中用新文字取代舊文字",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/substitute-function"
		}],
		functionParameter: {
			text: {
				name: "文字",
				detail: "包含要以字元取代文字的文字或參照。"
			},
			oldText: {
				name: "搜尋文字",
				detail: "要取代的文字。"
			},
			newText: {
				name: "取代文字",
				detail: "要用來取代 old_text 的文字。"
			},
			instanceNum: {
				name: "指定取代對象",
				detail: "指定要將第幾個 old_text 取代為 new_text。 如果指定 instance_num，則只會取代該 old_text。 否則，text 中的每一個 old_text 都會變更為 new_text。"
			}
		}
	},
	T: {
		description: "將參數轉換為文字",
		abstract: "將參數轉換為文字",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/t-function"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "要檢定的值。"
		} }
	},
	TEXT: {
		description: "設定數字格式並將其轉換為文字",
		abstract: "設定數字格式並將其轉換為文字",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/text-function"
		}],
		functionParameter: {
			value: {
				name: "值",
				detail: "要轉換為文字的數值。 "
			},
			formatText: {
				name: "數字格式",
				detail: "一個文字字串，定義要套用於所提供值的格式。 "
			}
		}
	},
	TEXTAFTER: {
		description: "傳回給定字元或字串之後出現的文字",
		abstract: "傳回給定字元或字串之後出現的文字",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/textafter-function"
		}],
		functionParameter: {
			text: {
				name: "文字",
				detail: "在此搜尋的文字。不允許萬用字元。"
			},
			delimiter: {
				name: "分隔符號",
				detail: "標記要擷取之點之後的文字。"
			},
			instanceNum: {
				name: "實例編號",
				detail: "要解壓縮文字的分隔符號實例。"
			},
			matchMode: {
				name: "匹配模式",
				detail: "判斷文字搜尋是否區分大小寫。預設值會區分大小寫。"
			},
			matchEnd: {
				name: "結尾匹配",
				detail: "將文字結尾視為分隔符號。根據預設，文字是完全相符項目。"
			},
			ifNotFound: {
				name: "未匹配到的值",
				detail: "找不到相符項目時傳回的值。根據預設，會傳回 #N/A。"
			}
		}
	},
	TEXTBEFORE: {
		description: "傳回出現在給定字元或字串之前的文字",
		abstract: "傳回出現在給定字元或字串之前的文字",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/textbefore-function"
		}],
		functionParameter: {
			text: {
				name: "文字",
				detail: "在此搜尋的文字。不允許萬用字元。"
			},
			delimiter: {
				name: "分隔符號",
				detail: "標記要擷取之點之後的文字。"
			},
			instanceNum: {
				name: "實例編號",
				detail: "要解壓縮文字的分隔符號實例。"
			},
			matchMode: {
				name: "匹配模式",
				detail: "判斷文字搜尋是否區分大小寫。預設值會區分大小寫。"
			},
			matchEnd: {
				name: "結尾匹配",
				detail: "將文字結尾視為分隔符號。根據預設，文字是完全相符項目。"
			},
			ifNotFound: {
				name: "未匹配到的值",
				detail: "找不到相符項目時傳回的值。根據預設，會傳回 #N/A。"
			}
		}
	},
	TEXTJOIN: {
		description: "合併來自多個區域和/或字串的文字",
		abstract: "合併來自多個區域和/或字串的文字",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/textjoin-function"
		}],
		functionParameter: {
			delimiter: {
				name: "分隔符號",
				detail: "文字字串，可以是空白、雙引號括起來的一或多個字元，或是有效文字字串的參照。"
			},
			ignoreEmpty: {
				name: "忽略空白",
				detail: "如果為 TRUE，則會忽略空白儲存格。"
			},
			text1: {
				name: "文字1",
				detail: "要加入的文字項目。 文字字串或字串陣列，例如儲存格範圍。"
			},
			text2: {
				name: "文字2",
				detail: "要加入的其他文字項目。 文字項目最多可有 252 個文字引數，包含 text1。 每個項目可以是文字字串或字串陣列，例如儲存格範圍。"
			}
		}
	},
	TEXTSPLIT: {
		description: "使用欄分隔符號和列分隔符號拆分文字字串",
		abstract: "使用欄分隔符號和列分隔符號拆分文字字串",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/textsplit-function"
		}],
		functionParameter: {
			text: {
				name: "文字",
				detail: "要拆分的文字。"
			},
			colDelimiter: {
				name: "欄分隔符",
				detail: "若要拆分欄依據的字元或字串。"
			},
			rowDelimiter: {
				name: "列分隔符",
				detail: "若要拆分列依據的字元或字串。"
			},
			ignoreEmpty: {
				name: "忽略空白儲存格",
				detail: "是否忽略空白儲存格。預設為 FALSE。"
			},
			matchMode: {
				name: "匹配模式",
				detail: "搜尋文字中的分隔符號匹配。預設情況下，會進行區分大小寫的匹配。"
			},
			padWith: {
				name: "填充值",
				detail: "用於填充的值。預設情況下，使用 #N/A。"
			}
		}
	},
	TRIM: {
		description: "刪除文字的所有空格，僅保留單字之間的單個空格。",
		abstract: "刪除文字中的空格",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/trim-function"
		}],
		functionParameter: { text: {
			name: "文字",
			detail: "要從中刪除空格的文字。"
		} }
	},
	UNICHAR: {
		description: "傳回給定數值所引用的 Unicode 字元",
		abstract: "傳回給定數值所引用的 Unicode 字元",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/unichar-function"
		}],
		functionParameter: { number: {
			name: "數值",
			detail: "是代表字元的 Unicode 數位。"
		} }
	},
	UNICODE: {
		description: "傳回對應於文字的第一個字元的數字（代碼點）",
		abstract: "傳回對應於文字的第一個字元的數字（代碼點）",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/unicode-function"
		}],
		functionParameter: { text: {
			name: "文字",
			detail: "是要使用 Unicode 值的字元。"
		} }
	},
	UPPER: {
		description: "將文字轉換為大寫形式",
		abstract: "將文字轉換為大寫形式",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/upper-function"
		}],
		functionParameter: { text: {
			name: "文字",
			detail: "要轉換成大寫的文字。"
		} }
	},
	VALUE: {
		description: "將文字參數轉換為數字",
		abstract: "將文字參數轉換為數字",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/value-function"
		}],
		functionParameter: { text: {
			name: "文字",
			detail: "以引號括住的文字或包含要轉換之文字的儲存格參照。"
		} }
	},
	VALUETOTEXT: {
		description: "從任意指定值返回文字",
		abstract: "從任意指定值返回文字",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/valuetotext-function"
		}],
		functionParameter: {
			value: {
				name: "值",
				detail: "要以文字格式返回的值。"
			},
			format: {
				name: "資料格式",
				detail: "傳回資料的格式。它可以是兩個值的其中之一：\n0 預設。 易於閱讀的精簡格式。\n1 包含逸出字元和列分隔符號的限定格式。 產生可在輸入至資料編輯列時進行剖析的字串。 封裝會以引號傳回字串，除了布林值、數字和錯誤以外。"
			}
		}
	},
	CALL: {
		description: "呼叫動態連結函式庫或程式碼來源中的過程",
		abstract: "呼叫動態連結函式庫或程式碼來源中的過程",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/call-function"
		}],
		functionParameter: {
			moduleText: {
				name: "模組文字",
				detail: "包含程序的動態連結程式庫 (DLL) 名稱。"
			},
			procedure: {
				name: "程序",
				detail: "DLL 中的程序名稱或序號。"
			},
			typeText: {
				name: "類型文字",
				detail: "指定引數與傳回值資料類型的文字。"
			},
			argument1: {
				name: "引數 1",
				detail: "選用。傳遞給程序的第一個引數。"
			}
		}
	},
	EUROCONVERT: {
		description: "用於將數字轉換為歐元形式，將數字由歐元形式轉換為歐元成員國貨幣形式，或利用歐元作為中間貨幣將數字由某一歐元成員國貨幣轉化為另一歐元成員國貨幣形式（三角轉換關係）",
		abstract: "用於將數字轉換為歐元形式，將數字由歐元形式轉換為歐元成員國貨幣形式，或利用歐元作為中間貨幣將數字由某一歐元成員國貨幣轉化為另一歐元成員國貨幣形式（三角轉換關係）",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/euroconvert-function"
		}],
		functionParameter: {
			number: {
				name: "數字",
				detail: "要換算的貨幣值。"
			},
			source: {
				name: "來源貨幣",
				detail: "來源貨幣代碼。"
			},
			target: {
				name: "目標貨幣",
				detail: "目標貨幣代碼。"
			},
			fullPrecision: {
				name: "完整精確度",
				detail: "控制是否依貨幣特定規則四捨五入的邏輯值。"
			},
			triangulationPrecision: {
				name: "三角換算精確度",
				detail: "選用。透過歐元進行中間換算時使用的有效位數。"
			}
		}
	},
	REGISTER_ID: {
		description: "傳回已註冊過的指定動態連結程式庫 (DLL) 或程式碼來源的註冊號碼",
		abstract: "傳回已註冊的指定動態連結程式庫 (DLL) 或程式碼來源的註冊號碼",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/register-id-function"
		}],
		functionParameter: {
			moduleText: {
				name: "模組文字",
				detail: "包含程序的 DLL 或程式碼資源名稱。"
			},
			procedure: {
				name: "程序",
				detail: "程序名稱或序號。"
			},
			typeText: {
				name: "類型文字",
				detail: "選用。指定引數與傳回值資料類型的文字。"
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/univer/zh-TW.ts
const locale$1 = {};

//#endregion
//#region src/locale/function-list/web/zh-TW.ts
const locale = {
	ENCODEURL: {
		description: "ENCODEURL 函式會回傳一個 URL 編碼的字串，將某些非字母數字字元替換為百分比符號 (%) 並以十六進位數字表示。",
		abstract: "ENCODEURL 函式會回傳一個 URL 編碼的字串，將某些非字母數字字元替換為百分比符號 (%) 並以十六進位數字表示。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/encodeurl-function"
		}],
		functionParameter: { text: {
			name: "文字",
			detail: "一個要編碼為 URL 的字串"
		} }
	},
	FILTERXML: {
		description: "FILTERXML 函式透過指定的 xpath 從 XML 內容中回傳特定資料。",
		abstract: "FILTERXML 函式透過指定的 xpath 從 XML 內容中回傳特定資料。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/filterxml-function"
		}],
		functionParameter: {
			xml: {
				name: "xml",
				detail: "有效 XML 格式的字串。"
			},
			xpath: {
				name: "xpath",
				detail: "標準 XPath 格式的字串。"
			}
		}
	},
	WEBSERVICE: {
		description: "WEBSERVICE 函式會回傳來自網際網路或內聯網網路上的網路服務資料。",
		abstract: "WEBSERVICE 函式會回傳來自網際網路或內聯網網路上的網路服務資料。",
		links: [{
			title: "教導",
			url: "https://support.microsoft.com/zh-tw/excel/functions/webservice-function"
		}],
		functionParameter: { url: {
			name: "url",
			detail: "網頁服務的 URL。"
		} }
	}
};

//#endregion
export { locale$4 as a, locale$7 as c, locale$10 as d, locale$11 as f, locale$14 as h, locale$3 as i, locale$8 as l, locale$13 as m, locale$1 as n, locale$5 as o, locale$12 as p, locale$2 as r, locale$6 as s, locale as t, locale$9 as u };