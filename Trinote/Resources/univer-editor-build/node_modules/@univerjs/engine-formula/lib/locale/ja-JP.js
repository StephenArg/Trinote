//#region src/locale/function-list/array/ja-JP.ts
const locale$15 = {
	ARRAY_CONSTRAIN: {
		description: "配列の結果を指定したサイズに抑えます。",
		abstract: "配列の結果を指定したサイズに抑えます。",
		links: [{
			title: "指導",
			url: "https://support.google.com/docs/answer/3267036?hl=ja"
		}],
		functionParameter: {
			inputRange: {
				name: "配列",
				detail: "ARRAY_CONSTRAIN(SORT(A1:F100, 1, TRUE), 10, 6)"
			},
			numRows: {
				name: "行の数",
				detail: "結果に含める行の数です。"
			},
			numCols: {
				name: "列の数",
				detail: "結果に含める列の数です。"
			}
		}
	},
	FLATTEN: {
		description: "1 つ以上の範囲に含まれるすべての値を、単一の列にフラット化します。",
		abstract: "1 つ以上の範囲に含まれるすべての値を、単一の列にフラット化します。",
		links: [{
			title: "指導",
			url: "https://support.google.com/docs/answer/10307761?hl=ja"
		}],
		functionParameter: {
			range1: {
				name: "範囲1",
				detail: "フラット化する最初の範囲です。"
			},
			range2: {
				name: "範囲2",
				detail: "[省略可] 反復可能 フラット化する追加の範囲です。"
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/compatibility/ja-JP.ts
const locale$14 = {
	BETADIST: {
		description: "累積β確率密度関数の値を返します。 β分布は、複数の標本を対象に割合の変化を分析する場合などに使用します (たとえば、複数の人が 1 日のうちにテレビを見ている時間の割合を算出するときは、この関数を使用します)。",
		abstract: "累積β確率密度関数の値を返します。 β分布は、複数の標本を対象に割合の変化を分析する場合などに使用します (たとえば、複数の人が 1 日のうちにテレビを見ている時間の割合を算出するときは、この関数を使用します)。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/betadist-function"
		}],
		functionParameter: {
			x: {
				name: "値",
				detail: "必須。 区間 A ～ B の範囲内で、関数を評価する時点を指定します。"
			},
			alpha: {
				name: "alpha",
				detail: "必須。 確率分布のパラメーターを指定します。"
			},
			beta: {
				name: "beta",
				detail: "必須。 確率分布のパラメーターを指定します。"
			},
			A: {
				name: "下限",
				detail: "。 x の区間の下限を指定します。"
			},
			B: {
				name: "上限",
				detail: "省略可能。 x の区間の上限を指定します。"
			}
		}
	},
	BETAINV: {
		description: "指定されたβ分布の累積β確率密度関数の逆関数の値を返します。 つまり、確率 = BETADIST(x,...) の場合は、BETAINV(確率,...) = x となります。 β分布は、プロジェクト計画などで、期待される完了時間と公差を指定して予想完了時間をモデル化する場合に使用できます。",
		abstract: "指定されたβ分布の累積β確率密度関数の逆関数の値を返します。 つまり、確率 = BETADIST(x,...) の場合は、BETAINV(確率,...) = x となります。 β分布は、プロジェクト計画などで、期待される完了時間と公差を指定して予想完了時間をモデル化する場合に使用できます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/betainv-function"
		}],
		functionParameter: {
			probability: {
				name: "確率",
				detail: "必須。 β分布における確率を指定します。"
			},
			alpha: {
				name: "alpha",
				detail: "必須。 確率分布のパラメーターを指定します。"
			},
			beta: {
				name: "beta",
				detail: "必須。 確率分布のパラメーターを指定します。"
			},
			A: {
				name: "下限",
				detail: "。 x の区間の下限を指定します。"
			},
			B: {
				name: "上限",
				detail: "省略可能。 x の区間の上限を指定します。"
			}
		}
	},
	BINOMDIST: {
		description: "単一項の二項分布確率を返します。 BINOMDIST 関数は、テストや試行の回数が固定されている問題で、どの試行の結果も成功または失敗のみで表される場合、各試行が独立している場合、および試行全体をとおして成功の確率が一定である場合に使用します。 たとえば、二男一女が生まれてくる確率などを BINOMDIST で計算できます。",
		abstract: "単一項の二項分布確率を返します。 BINOMDIST 関数は、テストや試行の回数が固定されている問題で、どの試行の結果も成功または失敗のみで表される場合、各試行が独立している場合、および試行全体をとおして成功の確率が一定である場合に使用します。 たとえば、二男一女が生まれてくる確率などを BINOMDIST で計算できます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/binomdist-function"
		}],
		functionParameter: {
			numberS: {
				name: "成功数",
				detail: "必須。 試行における成功数を指定します。"
			},
			trials: {
				name: "試行回数",
				detail: "必須。 独立試行の回数を指定します。"
			},
			probabilityS: {
				name: "成功率",
				detail: "必須。 各試行が成功する確率を指定します。"
			},
			cumulative: {
				name: "累積",
				detail: "必須。 計算に使用する関数の形式を論理値で指定します。 関数形式に TRUE を指定した場合、BINOM.DIST 関数の戻り値は累積分布関数となり、0 ～成功数回の範囲で成功が得られる確率が計算されます。FALSE の場合は、確率質量関数となり、成功数回の成功が得られる確率が計算されます。"
			}
		}
	},
	CHIDIST: {
		description: "カイ 2 乗分布の右側確率の値を返します。 χ2 分布は χ2 検定と関連しています。 χ2 検定は、実測値と期待値を比較するときに使用します。 たとえば、ある植物の遺伝子実験で、次の世代の花には一定の色の組み合わせが発生するという仮説を立てたとします。 ここで、予測された色と観察の結果を比較することにより、仮説の妥当性を検定することができます。",
		abstract: "カイ 2 乗分布の右側確率の値を返します。 χ2 分布は χ2 検定と関連しています。 χ2 検定は、実測値と期待値を比較するときに使用します。 たとえば、ある植物の遺伝子実験で、次の世代の花には一定の色の組み合わせが発生するという仮説を立てたとします。 ここで、予測された色と観察の結果を比較することにより、仮説の妥当性を検定することができます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/chidist-function"
		}],
		functionParameter: {
			x: {
				name: "値",
				detail: "必須。 分布の評価に使用する値を指定します。"
			},
			degFreedom: {
				name: "自由度",
				detail: "必須。 自由度を表す数値を指定します。"
			}
		}
	},
	CHIINV: {
		description: "カイ 2 乗分布の右側確率の逆関数の値を返します。 つまり、確率 = CHIDIST(x,...) の場合は、CHIINV(確率,...) = x となります。 この関数は、実測値と期待値を比較して、仮説の妥当性を検定するために使います。",
		abstract: "カイ 2 乗分布の右側確率の逆関数の値を返します。 つまり、確率 = CHIDIST(x,...) の場合は、CHIINV(確率,...) = x となります。 この関数は、実測値と期待値を比較して、仮説の妥当性を検定するために使います。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/chiinv-function"
		}],
		functionParameter: {
			probability: {
				name: "確率",
				detail: "必須。 カイ 2 乗分布における確率を指定します。"
			},
			degFreedom: {
				name: "自由度",
				detail: "必須。 自由度を表す数値を指定します。"
			}
		}
	},
	CHITEST: {
		description: "カイ 2 乗 (χ2) 検定を行います。 CHITEST は、統計と適切な自由度に対するカイ 2 乗 (χ2) 分布の値を返します。 χ2 検定を使用して、仮説による結果が実験によって検証されるかどうかを判断できます。",
		abstract: "カイ 2 乗 (χ2) 検定を行います。 CHITEST は、統計と適切な自由度に対するカイ 2 乗 (χ2) 分布の値を返します。 χ2 検定を使用して、仮説による結果が実験によって検証されるかどうかを判断できます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/chitest-function"
		}],
		functionParameter: {
			actualRange: {
				name: "実測値範囲",
				detail: "必須。 期待値に対する検定の実測値が入力されているデータ範囲を指定します。"
			},
			expectedRange: {
				name: "期待値範囲",
				detail: "必須。 期待値が入力されているデータ範囲を指定します。実測値と期待値では、行方向の値の合計と列方向の値の合計がそれぞれ等しくなっている必要があります。"
			}
		}
	},
	CONFIDENCE: {
		description: "正規分布を使用して、母集団の平均に対する信頼区間を求めます。",
		abstract: "正規分布を使用して、母集団の平均に対する信頼区間を求めます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/confidence-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "必須。 信頼度を計算するために使用する有意水準を指定します。 信頼度は 100*(1- α)% で計算されます。つまり、α が 0.05 であるとき、信頼度は 95% になります。"
			},
			standardDev: {
				name: "標準偏差",
				detail: "必須。 データ範囲の母標準偏差を指定します。これは既知の値であると仮定されます。"
			},
			size: {
				name: "標本数",
				detail: "必須。 標本数を指定します。"
			}
		}
	},
	COVAR: {
		description: "共分散 (2 つのデータ セット内の各データ ポイント ペアの偏差積の平均) を返します。",
		abstract: "共分散 (2 つのデータ セット内の各データ ポイント ペアの偏差積の平均) を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/covar-function"
		}],
		functionParameter: {
			array1: {
				name: "配列1",
				detail: "必須。 整数のデータが入力されている一方のセル範囲を指定します。"
			},
			array2: {
				name: "配列2",
				detail: "必須。 整数のデータが入力されているもう一方のセル範囲を指定します。"
			}
		}
	},
	CRITBINOM: {
		description: "累積二項分布が基準値以上になる最小値を返します。 この関数は、品質保証アプリケーションに使用します。 たとえば、CRITBINOM 関数を使用して、ロット全体は不合格にせずに作業工程から除外できる欠陥部品の最大数を決定できます。",
		abstract: "累積二項分布が基準値以上になる最小値を返します。 この関数は、品質保証アプリケーションに使用します。 たとえば、CRITBINOM 関数を使用して、ロット全体は不合格にせずに作業工程から除外できる欠陥部品の最大数を決定できます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/critbinom-function"
		}],
		functionParameter: {
			trials: {
				name: "試行回数",
				detail: "必須。 ベルヌーイ試行の回数を指定します。"
			},
			probabilityS: {
				name: "成功率",
				detail: "必須。 各試行が成功する確率を指定します。"
			},
			alpha: {
				name: "目標確率",
				detail: "必須。 基準値を指定します。"
			}
		}
	},
	EXPONDIST: {
		description: "指数分布を返します。 EXPONDIST 関数を使用すると、銀行の ATM 機から現金が出てくるまでの時間など、イベント間隔をモデル化できます。 たとえば、EXPONDIST 関数を使用して、この処理が 1 分以内に終了する確率を算出できます。",
		abstract: "指数分布を返します。 EXPONDIST 関数を使用すると、銀行の ATM 機から現金が出てくるまでの時間など、イベント間隔をモデル化できます。 たとえば、EXPONDIST 関数を使用して、この処理が 1 分以内に終了する確率を算出できます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/expondist-function"
		}],
		functionParameter: {
			x: {
				name: "値",
				detail: "必須。 関数に代入する値を指定します。"
			},
			lambda: {
				name: "lambda",
				detail: "必須。 パラメーターの値を指定します。"
			},
			cumulative: {
				name: "累積",
				detail: "必須。 使用する指数関数の形式を示す論理値を指定します。 累積が TRUE の場合は、EXPONDIST によって累積分布関数が返されます。FALSE の場合は、確率密度関数が返されます。"
			}
		}
	},
	FDIST: {
		description: "2 組のデータの (右側) F 分布の確率関数の値 (ばらつき) を返します。 この関数を使用すると、2 組のデータを比較してばらつきに差異があるかどうかを判断できます。 たとえば、高校入試で男子と女子の点数を調べ、男子と女子で点数のばらつきが異なるかどうかを判断できます。",
		abstract: "2 組のデータの (右側) F 分布の確率関数の値 (ばらつき) を返します。 この関数を使用すると、2 組のデータを比較してばらつきに差異があるかどうかを判断できます。 たとえば、高校入試で男子と女子の点数を調べ、男子と女子で点数のばらつきが異なるかどうかを判断できます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/fdist-function"
		}],
		functionParameter: {
			x: {
				name: "値",
				detail: "必須。 関数に代入する値を指定します。"
			},
			degFreedom1: {
				name: "自由度の分子",
				detail: "必須。 自由度の分子を指定します。"
			},
			degFreedom2: {
				name: "自由度の分母",
				detail: "必須。 自由度の分母を指定します。"
			}
		}
	},
	FINV: {
		description: "(右側) F 分布の確率関数の逆関数値を返します。 確率 = FDIST(x,...) であるとき、FINV(確率,...) = x という関係が成り立ちます。",
		abstract: "(右側) F 分布の確率関数の逆関数値を返します。 確率 = FDIST(x,...) であるとき、FINV(確率,...) = x という関係が成り立ちます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/finv-function"
		}],
		functionParameter: {
			probability: {
				name: "確率",
				detail: "必須。 F 累積分布における確率を指定します。"
			},
			degFreedom1: {
				name: "自由度の分子",
				detail: "必須。 自由度の分子を指定します。"
			},
			degFreedom2: {
				name: "自由度の分母",
				detail: "必須。 自由度の分母を指定します。"
			}
		}
	},
	FTEST: {
		description: "F 検定の結果を返します。 F 検定は、配列 1 と配列 2 とのデータのばらつきに有意な差が認められない両側確率を返します。 この関数を使用すると、2 組のサンプルを比較してばらつきに差異があるかどうかを判断できます。 たとえば、公立高校と私立高校の生徒のテストの点数を調べ、これらの高校の間でテストの点数のばらつきに差異があるかどうかを判断できます。",
		abstract: "F 検定の結果を返します。 F 検定は、配列 1 と配列 2 とのデータのばらつきに有意な差が認められない両側確率を返します。 この関数を使用すると、2 組のサンプルを比較してばらつきに差異があるかどうかを判断できます。 たとえば、公立高校と私立高校の生徒のテストの点数を調べ、これらの高校の間でテストの点数のばらつきに差異があるかどうかを判断できます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/ftest-function"
		}],
		functionParameter: {
			array1: {
				name: "配列1",
				detail: "必須。 比較対象となる一方のデータを含む配列またはセル範囲を指定します。"
			},
			array2: {
				name: "配列2",
				detail: "必須。 比較対象となるもう一方のデータを含む配列またはセル範囲を指定します。"
			}
		}
	},
	GAMMADIST: {
		description: "ガンマ分布関数の値を返します。 この関数を使うと、正規分布に従わないと見られる変数の分析を行うことができます。 ガンマ分布は待ち行列分析などでよく使用されます。",
		abstract: "ガンマ分布関数の値を返します。 この関数を使うと、正規分布に従わないと見られる変数の分析を行うことができます。 ガンマ分布は待ち行列分析などでよく使用されます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/gammadist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "必須。 分布の評価に使用する値を指定します。"
			},
			alpha: {
				name: "alpha",
				detail: "必須。 分布に対するパラメーターを指定します。"
			},
			beta: {
				name: "beta",
				detail: "必須。 分布に対するパラメーターを指定します。 β = 1 の場合、標準ガンマ分布の値が返されます。"
			},
			cumulative: {
				name: "累積",
				detail: "必須。 計算に使用する関数の形式を論理値で指定します。 累積が TRUE の場合は、GAMMADIST によって累積分布関数が返されます。FALSE の場合は、確率密度関数が返されます。"
			}
		}
	},
	GAMMAINV: {
		description: "ガンマ分布の累積分布関数の逆関数の値を返します。 p = GAMMADIST(x,...) の場合、GAMMAINV(p,...) = x になります。 この関数は、正規分布に従わないと見られる変数を分析する場合に使います。",
		abstract: "ガンマ分布の累積分布関数の逆関数の値を返します。 p = GAMMADIST(x,...) の場合、GAMMAINV(p,...) = x になります。 この関数は、正規分布に従わないと見られる変数を分析する場合に使います。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/gammainv-function"
		}],
		functionParameter: {
			probability: {
				name: "確率",
				detail: "必須。 ガンマ分布における確率を指定します。"
			},
			alpha: {
				name: "alpha",
				detail: "必須。 分布に対するパラメーターを指定します。"
			},
			beta: {
				name: "beta",
				detail: "必須。 分布に対するパラメーターを指定します。 β =1 の場合、標準ガンマ分布の値が返されます。"
			}
		}
	},
	HYPGEOMDIST: {
		description: "超幾何分布を返します。 HYPGEOMDIST は、指定された標本の成功数、指定された標本数、母集団の成功数、母集団の大きさの確率を返します。 有限母集団に関する問題に対しては HYPGEOMDIST を使用します。ここでは、各観測は成功または失敗のいずれかです。また、指定された大きさの各サブセットは等尤度で選択されます。",
		abstract: "超幾何分布を返します。 HYPGEOMDIST は、指定された標本の成功数、指定された標本数、母集団の成功数、母集団の大きさの確率を返します。 有限母集団に関する問題に対しては HYPGEOMDIST を使用します。ここでは、各観測は成功または失敗のいずれかです。また、指定された大きさの各サブセットは等尤度で選択されます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/hypgeomdist-function"
		}],
		functionParameter: {
			sampleS: {
				name: "標本の成功数",
				detail: "必須。 標本内で成功する数を指定します。"
			},
			numberSample: {
				name: "標本数",
				detail: "必須。 標本数を指定します。"
			},
			populationS: {
				name: "母集団の成功数",
				detail: "必須。 母集団内で成功する数を指定します。"
			},
			numberPop: {
				name: "母集団の大きさ",
				detail: "必須。 母集団全体の数を指定します。"
			}
		}
	},
	LOGINV: {
		description: "x の対数正規型の累積分布関数の逆関数を返します。ln(x) は、引数平均と標準偏差による正規型分布です。 p = LOGNORMDIST(x,...) の場合は、LOGINV(p,...) = x です。",
		abstract: "x の対数正規型の累積分布関数の逆関数を返します。ln(x) は、引数平均と標準偏差による正規型分布です。 p = LOGNORMDIST(x,...) の場合は、LOGINV(p,...) = x です。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/loginv-function"
		}],
		functionParameter: {
			probability: {
				name: "確率",
				detail: "必須。 対数正規型分布に伴う確率を指定します。"
			},
			mean: {
				name: "平均",
				detail: "必須。 ln(x) の平均値を指定します。"
			},
			standardDev: {
				name: "標準偏差",
				detail: "必須。 ln(x) の標準偏差を指定します。"
			}
		}
	},
	LOGNORMDIST: {
		description: "x の対数正規分布の分布関数の値を返します。ln(x) は、引数平均と標準偏差による正規型分布です。 この関数は、対数的に変換されたデータを分析する場合に使用します。",
		abstract: "x の対数正規分布の分布関数の値を返します。ln(x) は、引数平均と標準偏差による正規型分布です。 この関数は、対数的に変換されたデータを分析する場合に使用します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/lognormdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "必須。 関数に代入する値を指定します。"
			},
			mean: {
				name: "平均",
				detail: "必須。 ln(x) の平均値を指定します。"
			},
			standardDev: {
				name: "標準偏差",
				detail: "必須。 ln(x) の標準偏差を指定します。"
			}
		}
	},
	MODE: {
		description: "たとえば、30 年間に重要な湿原で鳥の数のサンプルで観察された最も一般的な鳥種の数を調べるか、ピーク時以外に電話サポート センターで最も頻繁に発生する電話の数を調べる必要があるとします。 数値のグループのモードを計算するには、 MODE 関数を使用します。",
		abstract: "たとえば、30 年間に重要な湿原で鳥の数のサンプルで観察された最も一般的な鳥種の数を調べるか、ピーク時以外に電話サポート センターで最も頻繁に発生する電話の数を調べる必要があるとします。 数値のグループのモードを計算するには、 MODE 関数を使用します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/mode-function"
		}],
		functionParameter: {
			number1: {
				name: "数値 1",
				detail: "必須。 モードの計算の対象となる最初の数値引数を指定します。"
			},
			number2: {
				name: "数値 2",
				detail: "オプション。 モードの計算の対象となる 2 ～ 255 個の数値引数を指定できます。 また、半角のカンマ (,) で区切られた引数の代わりに、単一配列や、配列への参照を指定することもできます。"
			}
		}
	},
	NEGBINOMDIST: {
		description: "負の二項分布の確率関数値を返します。 NEGBINOMDIST 関数を利用すると、試行の成功率が一定のとき、成功数で指定した回数の試行が成功する前に、失敗数で指定した回数の試行が失敗する確率を計算できます。 この関数は二項分布を計算する関数に似ていますが、試行の成功数が定数で試行回数が変数である点が異なります。 さらに、二項分布の場合と同様に、対象となる試行は独立試行であると見なされます。",
		abstract: "負の二項分布の確率関数値を返します。 NEGBINOMDIST 関数を利用すると、試行の成功率が一定のとき、成功数で指定した回数の試行が成功する前に、失敗数で指定した回数の試行が失敗する確率を計算できます。 この関数は二項分布を計算する関数に似ていますが、試行の成功数が定数で試行回数が変数である点が異なります。 さらに、二項分布の場合と同様に、対象となる試行は独立試行であると見なされます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/negbinomdist-function"
		}],
		functionParameter: {
			numberF: {
				name: "失敗数",
				detail: "必須。 試行が失敗する回数を指定します。"
			},
			numberS: {
				name: "成功数",
				detail: "必須。 分析のしきい値となる、試行が成功する回数を指定します。"
			},
			probabilityS: {
				name: "成功率",
				detail: "必須。 試行が成功する確率を指定します。"
			}
		}
	},
	NORMDIST: {
		description: "NORMDIST 関数は、指定された平均と標準偏差の正規分布を返します。 この関数には、仮説検定を含む、統計の幅広いアプリケーションがあります。",
		abstract: "NORMDIST 関数は、指定された平均と標準偏差の正規分布を返します。 この関数には、仮説検定を含む、統計の幅広いアプリケーションがあります。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/normdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "必須。 分布が必要な値"
			},
			mean: {
				name: "平均",
				detail: "必須。 分布の算術平均"
			},
			standardDev: {
				name: "標準偏差",
				detail: "必須。 分布の標準偏差"
			},
			cumulative: {
				name: "累積",
				detail: "必須。 計算に使用する関数の形式を論理値で指定します。 累積が TRUE の場合、NORMDIST は累積分布関数を返します。累積が FALSE の場合、確率質量関数が返されます。"
			}
		}
	},
	NORMINV: {
		description: "指定した平均と標準偏差に対する正規分布の累積分布関数の逆関数の値を返します。",
		abstract: "指定した平均と標準偏差に対する正規分布の累積分布関数の逆関数の値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/norminv-function"
		}],
		functionParameter: {
			probability: {
				name: "確率",
				detail: "必須。 正規分布における確率を指定します。"
			},
			mean: {
				name: "平均",
				detail: "必須。 対象となる分布の算術平均 (相加平均) を指定します。"
			},
			standardDev: {
				name: "標準偏差",
				detail: "必須。 対象となる分布の標準偏差を指定します。"
			}
		}
	},
	NORMSDIST: {
		description: "標準正規分布の累積分布関数の値を返します。 この分布は、平均が 0 (ゼロ) で標準偏差が 1 である正規分布に対応します。 標準正規分布表の代わりにこの関数を使用することができます。",
		abstract: "標準正規分布の累積分布関数の値を返します。 この分布は、平均が 0 (ゼロ) で標準偏差が 1 である正規分布に対応します。 標準正規分布表の代わりにこの関数を使用することができます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/normsdist-function"
		}],
		functionParameter: { z: {
			name: "z",
			detail: "必須。 関数に代入する値を指定します。"
		} }
	},
	NORMSINV: {
		description: "標準正規分布の累積分布関数の逆関数の値を返します。 この分布は、平均が 0 で標準偏差が 1 である正規分布に対応します。",
		abstract: "標準正規分布の累積分布関数の逆関数の値を返します。 この分布は、平均が 0 で標準偏差が 1 である正規分布に対応します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/normsinv-function"
		}],
		functionParameter: { probability: {
			name: "確率",
			detail: "必須。 正規分布における確率を指定します。"
		} }
	},
	PERCENTILE: {
		description: "配列のデータの中で、百分率で率に位置する値を返します。 この関数を使用して、合否のしきい値を指定することができます。 たとえば、成績が上位 10% の志願者を合格にすることなどを決定できます。",
		abstract: "配列のデータの中で、百分率で率に位置する値を返します。 この関数を使用して、合否のしきい値を指定することができます。 たとえば、成績が上位 10% の志願者を合格にすることなどを決定できます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/percentile-function"
		}],
		functionParameter: {
			array: {
				name: "配列",
				detail: "必須。 相対的な位置を決定するデータの配列またはセル範囲を指定します。"
			},
			k: {
				name: "k",
				detail: "必須。 0 ～ 1 の範囲で、目的の百分位の値を指定します。"
			}
		}
	},
	PERCENTRANK: {
		description: "PERCENTRANK 関数は、データセット内の値のランクをデータセットのパーセンテージとして返します。基本的には、データセット全体内の値の相対的な順位です。 たとえば、PERCENTRANK を使用して、同じテストのすべてのスコアのフィールド間で個人のテスト スコアの順位を判断できます。",
		abstract: "PERCENTRANK 関数は、データセット内の値のランクをデータセットのパーセンテージとして返します。基本的には、データセット全体内の値の相対的な順位です。 たとえば、PERCENTRANK を使用して、同じテストのすべてのスコアのフィールド間で個人のテスト スコアの順位を判断できます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/percentrank-function"
		}],
		functionParameter: {
			array: {
				name: "配列",
				detail: "必須。 パーセントランクが決定される数値のデータ (または事前に定義された配列) の範囲。"
			},
			x: {
				name: "x",
				detail: "必須。 配列内のランクを知りたい値。"
			},
			significance: {
				name: "有効桁数",
				detail: "オプション。 計算結果として返される百分率の有効桁数を指定します。 有効桁数を省略すると、小数点以下第 3 位 (0.xxx) まで計算されます。"
			}
		}
	},
	POISSON: {
		description: "ポアソン確率の値を返します。 通常、ポアソン分布は一定の時間内に起きる事象の数を予測するために利用されます。たとえば、ポアソン分布を使って、高速道路の料金所を 1 分間に通過する自動車の台数を予測することができます。",
		abstract: "ポアソン確率の値を返します。 通常、ポアソン分布は一定の時間内に起きる事象の数を予測するために利用されます。たとえば、ポアソン分布を使って、高速道路の料金所を 1 分間に通過する自動車の台数を予測することができます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/poisson-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "必須。 生じる事象の数を指定します。"
			},
			mean: {
				name: "平均",
				detail: "必須。 一定の時間内に起きる事象の平均値を指定します。"
			},
			cumulative: {
				name: "累積",
				detail: "必須。 計算結果として返される確率関数値の形式を、論理値で指定します。 関数形式に TRUE を指定した場合、ランダムに発生するイベントの数が 0 以上 x 以下である累積ポアソン確率を返します。FALSE の場合は、発生するイベントの数が確実に x となる、ポワソン確率質量関数を返します。"
			}
		}
	},
	QUARTILE: {
		description: "配列に含まれるデータから四分位数を抽出します。 四分位数は、市場調査などのデータで、母集団を複数のグループに分割するために利用されます。 たとえば、母集団の中から所得金額が全体の上位 25% を占めるグループを選び出すことができます。",
		abstract: "配列に含まれるデータから四分位数を抽出します。 四分位数は、市場調査などのデータで、母集団を複数のグループに分割するために利用されます。 たとえば、母集団の中から所得金額が全体の上位 25% を占めるグループを選び出すことができます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/quartile-function"
		}],
		functionParameter: {
			array: {
				name: "配列",
				detail: "必須。 対象となる数値データを含む配列またはセル範囲を指定します。"
			},
			quart: {
				name: "四分位値",
				detail: "必須。 戻り値として返される四分位数の内容を、0 ～ 4 までの数値で指定します。"
			}
		}
	},
	RANK: {
		description: "数値のリスト内の数値のランクを返します。 数値のランクは、リスト内の他の値に対する相対的なサイズです。 (リストを並べ替える場合、数値のランクはその位置になります)。",
		abstract: "数値のリスト内の数値のランクを返します。 数値のランクは、リスト内の他の値に対する相対的なサイズです。 (リストを並べ替える場合、数値のランクはその位置になります)。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/rank-function"
		}],
		functionParameter: {
			number: {
				name: "数値",
				detail: "必須。 範囲内での順位 (位置) を調べる数値を指定します。"
			},
			ref: {
				name: "数値範囲",
				detail: "必須。 数値の一覧への参照。 参照に含まれる数値以外の値は無視されます。"
			},
			order: {
				name: "順序",
				detail: "オプション。 範囲内の数値を並べる方法を指定します。 順序に 0 を指定するか、順序を省略すると、範囲内の数値が ...3、2、1 のように降順に並べ替えられます。 順序に 0 以外の数値を指定すると、範囲内の数値が 1、2、3、... のように昇順で並べ替えられます。"
			}
		}
	},
	STDEV: {
		description: "標本に基づいて標準偏差の推定値を計算します。 標準偏差とは、統計的な対象となる値がその平均からどれだけ広い範囲に分布しているかを計測したものです。",
		abstract: "標本に基づいて標準偏差の推定値を計算します。 標準偏差とは、統計的な対象となる値がその平均からどれだけ広い範囲に分布しているかを計測したものです。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/stdev-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "必須。 母集団の標本に対応する最初の数値引数を指定します。"
			},
			number2: {
				name: "number2",
				detail: "オプション。 母集団のサンプルに対応する引数 2 から 255 の数値。 また、半角のカンマ (,) で区切られた引数の代わりに、単一配列や、配列への参照を指定することもできます。"
			}
		}
	},
	STDEVP: {
		description: "引数を母集団全体であると見なして、母集団の標準偏差を計算します。 標準偏差とは、統計的な対象となる値がその平均からどれだけ広い範囲に分布しているかを計測したものです。",
		abstract: "引数を母集団全体であると見なして、母集団の標準偏差を計算します。 標準偏差とは、統計的な対象となる値がその平均からどれだけ広い範囲に分布しているかを計測したものです。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/stdevp-function"
		}],
		functionParameter: {
			number1: {
				name: "数値 1",
				detail: "必須。 母集団に対応する最初の数値引数を指定します。"
			},
			number2: {
				name: "数値 2",
				detail: "オプション。 母集団に対応する引数 2 ~ 255 を数える。 また、半角のカンマ (,) で区切られた引数の代わりに、単一配列や、配列への参照を指定することもできます。"
			}
		}
	},
	TDIST: {
		description: "スチューデントの t 分布のパーセンテージ (確率) を返します。数値 (x) は t の計算値で、この t に対してパーセンテージが計算されます。 t 分布は、比較的少数の標本から成るデータを対象に仮説検定を行うときに使われます。 この関数は、t 分布表の代わりに使用することができます。",
		abstract: "スチューデントの t 分布のパーセンテージ (確率) を返します。数値 (x) は t の計算値で、この t に対してパーセンテージが計算されます。 t 分布は、比較的少数の標本から成るデータを対象に仮説検定を行うときに使われます。 この関数は、t 分布表の代わりに使用することができます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/tdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "必須。 t 分布を計算する数値を指定します。"
			},
			degFreedom: {
				name: "自由度",
				detail: "必須。 分布の自由度を整数で指定します。"
			},
			tails: {
				name: "尾部の特性",
				detail: "必須。 片側分布を計算するか、両側分布を計算するかを、数値で指定します。 尾部に 1 を指定すると片側分布の値が計算されます。 尾部に 2 を指定すると両側分布の値が計算されます。"
			}
		}
	},
	TINV: {
		description: "スチューデントの t 分布の両側逆関数の値を返します。",
		abstract: "スチューデントの t 分布の両側逆関数の値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/tinv-function"
		}],
		functionParameter: {
			probability: {
				name: "確率",
				detail: "必須。 スチューデントの両側 t 分布に従う確率を指定します。"
			},
			degFreedom: {
				name: "自由度",
				detail: "必須。 分布の自由度を指定します。"
			}
		}
	},
	TTEST: {
		description: "スチューデントの t 検定における確率を返します。 TTEST 関数を利用して、2 つの標本が平均値の等しい 2 つの母集団から抽出されたと見なせるかどうかを調べます。",
		abstract: "スチューデントの t 検定における確率を返します。 TTEST 関数を利用して、2 つの標本が平均値の等しい 2 つの母集団から抽出されたと見なせるかどうかを調べます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/ttest-function"
		}],
		functionParameter: {
			array1: {
				name: "配列1",
				detail: "必須。 対象となる一方のデータ。"
			},
			array2: {
				name: "配列2",
				detail: "必須。 対象となるもう一方のデータ。"
			},
			tails: {
				name: "尾部の特性",
				detail: "必須。 片側分布を計算するか、両側分布を計算するかを、数値で指定します。 尾部に 1 を指定すると、片側分布の値が使用されます。 尾部に 2 を指定すると、両側分布の値が使用されます。"
			},
			type: {
				name: "検定の種類",
				detail: "必須。 実行する t 検定の種類を数値で指定します。"
			}
		}
	},
	VAR: {
		description: "標本に基づいて母集団の分散の推定値 (不偏分散) を返します。",
		abstract: "標本に基づいて母集団の分散の推定値 (不偏分散) を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/var-function"
		}],
		functionParameter: {
			number1: {
				name: "数値 1",
				detail: "必須。 母集団の標本に対応する最初の数値引数を指定します。"
			},
			number2: {
				name: "数値 2",
				detail: "オプション。 母集団のサンプルに対応する引数 2 から 255 の数値。"
			}
		}
	},
	VARP: {
		description: "母集団全体に基づいて分散を計算します。",
		abstract: "母集団全体に基づいて分散を計算します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/varp-function"
		}],
		functionParameter: {
			number1: {
				name: "数値 1",
				detail: "必須。 母集団に対応する最初の数値引数を指定します。"
			},
			number2: {
				name: "数値 2",
				detail: "オプション。 母集団に対応する引数 2 ~ 255 を数える。"
			}
		}
	},
	WEIBULL: {
		description: "ワイブル分布の値を返します。 この分布は、機械が故障するまでの平均時間のような信頼性の分析に使用されます。",
		abstract: "ワイブル分布の値を返します。 この分布は、機械が故障するまでの平均時間のような信頼性の分析に使用されます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/weibull-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "必須。 関数に代入する値を指定します。"
			},
			alpha: {
				name: "alpha",
				detail: "必須。 分布に対するパラメーターを指定します。"
			},
			beta: {
				name: "beta",
				detail: "必須。 分布に対するパラメーターを指定します。"
			},
			cumulative: {
				name: "累積",
				detail: "必須。 関数の形式を指定します。"
			}
		}
	},
	ZTEST: {
		description: "z 検定の片側 P 値を返します。 ZTEST 関数は、指定した仮説の母集団平均 μ0 について、配列で指定されたデータの観測値平均 (観測された標本平均) よりも標本平均が大きくなる確率を返します。",
		abstract: "z 検定の片側 P 値を返します。 ZTEST 関数は、指定した仮説の母集団平均 μ0 について、配列で指定されたデータの観測値平均 (観測された標本平均) よりも標本平均が大きくなる確率を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/ztest-function"
		}],
		functionParameter: {
			array: {
				name: "配列",
				detail: "必須。 x の検定対象となるデータを含む数値配列またはセル範囲を指定します。"
			},
			x: {
				name: "x",
				detail: "必須。 検定する値を指定します。"
			},
			sigma: {
				name: "標準偏差",
				detail: "オプション。 母集団全体に基づく標準偏差を指定します。 省略すると、標本に基づく標準偏差が使用されます。"
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/cube/ja-JP.ts
const locale$13 = {
	CUBEKPIMEMBER: {
		description: "主要業績評価指標 (KPI) のプロパティを返し、KPI 名をセルに表示します。 KPI は、月間粗利益や四半期従業員退職率など、定量化が可能な測定値であり、組織の業績をモニタリングするために使用されます。",
		abstract: "主要業績評価指標 (KPI) のプロパティを返し、KPI 名をセルに表示します。 KPI は、月間粗利益や四半期従業員退職率など、定量化が可能な測定値であり、組織の業績をモニタリングするために使用されます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/cubekpimember-function"
		}],
		functionParameter: {
			connection: {
				name: "接続",
				detail: "必須。 キューブへの接続名を表す文字列です。"
			},
			kpiName: {
				name: "Kpi_name",
				detail: "必須。 キューブ内の KPI の名前を表す文字列です。"
			},
			kpiProperty: {
				name: "Kpi_property",
				detail: "必須。 返される KPI コンポーネントです。次のいずれかを指定できます。"
			},
			caption: {
				name: "キャプション",
				detail: "オプション。 KPI 名および KPI のプロパティの代わりにセルに表示される代替テキストです。"
			}
		}
	},
	CUBEMEMBER: {
		description: "キューブのメンバーまたは組を返します。 キューブ内にメンバーまたは組が存在することを確認するために使用します。",
		abstract: "キューブのメンバーまたは組を返します。 キューブ内にメンバーまたは組が存在することを確認するために使用します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/cubemember-function"
		}],
		functionParameter: {
			connection: {
				name: "接続",
				detail: "必須。 キューブへの接続名を表す文字列です。"
			},
			memberExpression: {
				name: "Member_expression",
				detail: "必須。 キューブの一意のメンバーを表す多次元式 (MDX) の文字列です。 セル範囲または配列定数として指定された組をメンバー式に指定できます。"
			},
			caption: {
				name: "キャプション",
				detail: "オプション。 定義されている場合、キューブのキャプションの代わりにセルに表示される文字列です。 組が返される場合、組の最後のメンバーのキャプションが使用されます。"
			}
		}
	},
	CUBEMEMBERPROPERTY: {
		description: "Excel の Cube 関数の 1 つである CUBEMEMBERPROPERTY 関数 は、キューブからメンバー プロパティの値を返します。 メンバー名がキューブ内に存在することを確認し、このメンバーの特定のプロパティを取得するために使用します。",
		abstract: "Excel の Cube 関数の 1 つである CUBEMEMBERPROPERTY 関数 は、キューブからメンバー プロパティの値を返します。 メンバー名がキューブ内に存在することを確認し、このメンバーの特定のプロパティを取得するために使用します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/cubememberproperty-function"
		}],
		functionParameter: {
			connection: {
				name: "接続",
				detail: "必須。 キューブへの接続名を表す文字列です。"
			},
			memberExpression: {
				name: "Member_expression",
				detail: "必須。 キューブのメンバーを表す多次元式 (MDX) の文字列です。"
			},
			property: {
				name: "プロパティ",
				detail: "必須。 返されるプロパティ名を表す文字列またはプロパティ名を含むセルへの参照を指定します。"
			}
		}
	},
	CUBERANKEDMEMBER: {
		description: "セット内の n 番目の (ランクされている) メンバーを返します。 売り上げトップの販売員、成績上位 10 位までの生徒など、セット内の 1 つ以上の要素を取得するために使用します。",
		abstract: "セット内の n 番目の (ランクされている) メンバーを返します。 売り上げトップの販売員、成績上位 10 位までの生徒など、セット内の 1 つ以上の要素を取得するために使用します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/cuberankedmember-function"
		}],
		functionParameter: {
			connection: {
				name: "接続",
				detail: "必須。 キューブへの接続名を表す文字列です。"
			},
			setExpression: {
				name: "Set_expression",
				detail: "必須。 \"{[アイテム 1].子供}\" などのセット式を表す文字列です。 CUBESET 関数、または CUBESET 関数を格納するセルへの参照も指定できます。"
			},
			rank: {
				name: "ランク",
				detail: "必須。 返される 1 番上の値を指定する整数値です。 ランクの値が 1 の場合、1 番上の値が返されます。ランクの値が 2 の場合、上から 2 番目の値が返されます。 上位 5 番目までの値を返す場合は、CUBERANKEDMEMBER 関数を 5 回使い、それぞれに 1 から 5 の異なるランクを指定します。"
			},
			caption: {
				name: "キャプション",
				detail: "オプション。 定義されている場合、キューブのキャプションの代わりにセルに表示される文字列です。"
			}
		}
	},
	CUBESET: {
		description: "セット式をサーバー上のキューブに送信して、計算されたメンバーまたは組のセットを定義します。サーバー上のキューブによってセットが作成され、Microsoft Excel に返されます。",
		abstract: "セット式をサーバー上のキューブに送信して、計算されたメンバーまたは組のセットを定義します。サーバー上のキューブによってセットが作成され、Microsoft Excel に返されます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/cubeset-function"
		}],
		functionParameter: {
			connection: {
				name: "接続",
				detail: "必須。 キューブへの接続名を表す文字列です。"
			},
			setExpression: {
				name: "Set_expression",
				detail: "必須。 メンバーまたは組のセットを表すセット式の文字列です。 セット内の 1 つ以上のメンバー、組、またはセットを含む Excel 範囲へのセル参照を指定することもできます。"
			},
			caption: {
				name: "キャプション",
				detail: "オプション。 定義されている場合、キューブのキャプションの代わりにセルに表示される文字列です。"
			},
			sortOrder: {
				name: "Sort_order",
				detail: "オプション。 実行する並べ替えの種類です (存在する場合)。次のいずれかを指定できます。"
			},
			sortBy: {
				name: "Sort_by",
				detail: "オプション。 並べ替えの基準となる値を表す文字列です。 たとえば、最も販売額の多い都市を見つけるには、セット式を都市のセットに設定し、並べ替えキーを販売メジャーに設定します。 最も人口の多い都市を見つけるには、セット式を都市のセットに設定し、並べ替えキーを人口メジャーに設定します。 並べ替え順序に並べ替えキーが必要で、並べ替えキーが省略されている場合は、エラー値 #VALUE! が返されます。"
			}
		}
	},
	CUBESETCOUNT: {
		description: "セット内のアイテムの数を返します。",
		abstract: "セット内のアイテムの数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/cubesetcount-function"
		}],
		functionParameter: { set: {
			name: "設定",
			detail: "必須。 CUBESET 関数で定義されたセットを表す Microsoft Office Excel の式を表す文字列です。 CUBESET 関数、または CUBESET 関数を格納するセルへの参照も指定できます。"
		} }
	},
	CUBEVALUE: {
		description: "キューブの集計値を返します。",
		abstract: "キューブの集計値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/cubevalue-function"
		}],
		functionParameter: {
			connection: {
				name: "接続",
				detail: "必須。 キューブへの接続名を表す文字列です。"
			},
			memberExpression: {
				name: "Member_expression",
				detail: "オプション。 キューブ内のメンバーまたは組を表す多次元式 (MDX) の文字列です。 または、メンバー式は CUBESET 関数で定義したセットでもかまいません。 メンバー式をスライサーとして使用して、合計値が返されるキューブの部分を定義します。 メンバー式でメジャーが指定されない場合は、そのキューブの既定のメジャーが使用されます。"
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/database/ja-JP.ts
const locale$12 = {
	DAVERAGE: {
		description: "リストまたはデータベースのレコードで指定されたフィールド (列) を検索し、条件を満たすレコードの平均値を返します。",
		abstract: "リストまたはデータベースのレコードで指定されたフィールド (列) を検索し、条件を満たすレコードの平均値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/daverage-function"
		}],
		functionParameter: {
			database: {
				name: "データベース",
				detail: "は、リストまたはデータベースを構成するセル範囲です。 データベースは、行 (レコード) と列 (フィールド) にデータを関連付けたリストです。 リストの先頭の行には、各列の見出しが入力されている必要があります。"
			},
			field: {
				name: "フィールド",
				detail: "は、関数で使用される列を示します。 フィールドには、半角の二重引用符 (\") で囲んだ \"樹齢\" や \"歩どまり\" などのような文字列、またはリストでの列の位置を示す引用符なしの番号 (1 番目の列を示す場合は 1、2 番目の列を示す場合は 2) を指定します。"
			},
			criteria: {
				name: "検索条件",
				detail: "は、指定した条件を含むセルの範囲です。 列見出しと検索条件を指定するセルが少なくとも 1 つずつ含まれている場合は、検索条件に任意のセル範囲を指定できます。"
			}
		}
	},
	DCOUNT: {
		description: "リストまたはデータベースのレコードで指定されたフィールド (列) を検索し、条件を満たすレコードの中で数値が入力されているセルの個数を返します。",
		abstract: "リストまたはデータベースのレコードで指定されたフィールド (列) を検索し、条件を満たすレコードの中で数値が入力されているセルの個数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/dcount-function"
		}],
		functionParameter: {
			database: {
				name: "データベース",
				detail: "必須。 リストまたはデータベースを構成するセル範囲を指定します。 データベースは、行 (レコード) と列 (フィールド) にデータを関連付けたリストです。 リストの先頭の行には、各列の見出しが入力されている必要があります。"
			},
			field: {
				name: "フィールド",
				detail: "必須。 関数の中で使用する列を指定します。 フィールドには、半角の二重引用符 (\") で囲んだ \"樹齢\" や \"歩どまり\" などのような文字列、またはリストでの列の位置を示す引用符なしの番号 (1 番目の列を示す場合は 1、2 番目の列を示す場合は 2) を指定します。"
			},
			criteria: {
				name: "検索条件",
				detail: "必須。 指定した条件が設定されているセル範囲を指定します。 列見出しと検索条件を指定するセルが少なくとも 1 つずつ含まれている場合は、検索条件に任意のセル範囲を指定できます。"
			}
		}
	},
	DCOUNTA: {
		description: "リストまたはデータベースのレコードで指定されたフィールド (列) を検索し、条件を満たすレコードの中の空白でないセルの個数を返します。",
		abstract: "リストまたはデータベースのレコードで指定されたフィールド (列) を検索し、条件を満たすレコードの中の空白でないセルの個数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/dcounta-function"
		}],
		functionParameter: {
			database: {
				name: "データベース",
				detail: "必須。 リストまたはデータベースを構成するセル範囲を指定します。 データベースは、行 (レコード) と列 (フィールド) にデータを関連付けたリストです。 リストの先頭の行には、各列の見出しが入力されている必要があります。"
			},
			field: {
				name: "フィールド",
				detail: "オプション。 関数の中で使用する列を指定します。 フィールドには、半角の二重引用符 (\") で囲んだ \"樹齢\" や \"歩どまり\" などのような文字列、またはリストでの列の位置を示す引用符なしの番号 (1 番目の列を示す場合は 1、2 番目の列を示す場合は 2) を指定します。"
			},
			criteria: {
				name: "検索条件",
				detail: "必須。 指定した条件が設定されているセル範囲を指定します。 列見出しと検索条件を指定するセルが少なくとも 1 つずつ含まれている場合は、検索条件に任意のセル範囲を指定できます。"
			}
		}
	},
	DGET: {
		description: "リストまたはデータベースの列から指定された条件を満たす 1 つの値を抽出します。",
		abstract: "リストまたはデータベースの列から指定された条件を満たす 1 つの値を抽出します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/dget-function"
		}],
		functionParameter: {
			database: {
				name: "データベース",
				detail: "必須。 リストまたはデータベースを構成するセル範囲を指定します。 データベースは、行 (レコード) と列 (フィールド) にデータを関連付けたリストです。 リストの先頭の行には、各列の見出しが入力されている必要があります。"
			},
			field: {
				name: "フィールド",
				detail: "必須。 関数の中で使用する列を指定します。 フィールドには、半角の二重引用符 (\") で囲んだ \"樹齢\" や \"歩どまり\" などのような文字列、またはリストでの列の位置を示す引用符なしの番号 (1 番目の列を示す場合は 1、2 番目の列を示す場合は 2) を指定します。"
			},
			criteria: {
				name: "検索条件",
				detail: "必須。 指定した条件が設定されているセル範囲を指定します。 列見出しと検索条件を指定するセルが少なくとも 1 つずつ含まれている場合は、検索条件に任意のセル範囲を指定できます。"
			}
		}
	},
	DMAX: {
		description: "リストまたはデータベースのレコードで指定されたフィールド (列) を検索し、条件を満たすレコードの最大値を返します。",
		abstract: "リストまたはデータベースのレコードで指定されたフィールド (列) を検索し、条件を満たすレコードの最大値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/dmax-function"
		}],
		functionParameter: {
			database: {
				name: "データベース",
				detail: "必須。 リストまたはデータベースを構成するセル範囲を指定します。 データベースは、行 (レコード) と列 (フィールド) にデータを関連付けたリストです。 リストの先頭の行には、各列の見出しが入力されている必要があります。"
			},
			field: {
				name: "フィールド",
				detail: "必須。 関数の中で使用する列を指定します。 フィールドには、半角の二重引用符 (\") で囲んだ \"樹齢\" や \"歩どまり\" などのような文字列、またはリストでの列の位置を示す引用符なしの番号 (1 番目の列を示す場合は 1、2 番目の列を示す場合は 2) を指定します。"
			},
			criteria: {
				name: "検索条件",
				detail: "必須。 指定した条件が設定されているセル範囲を指定します。 列見出しと検索条件を指定するセルが少なくとも 1 つずつ含まれている場合は、検索条件に任意のセル範囲を指定できます。"
			}
		}
	},
	DMIN: {
		description: "リストまたはデータベースのレコードで指定されたフィールド (列) を検索し、条件を満たすレコードの最小値を返します。",
		abstract: "リストまたはデータベースのレコードで指定されたフィールド (列) を検索し、条件を満たすレコードの最小値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/dmin-function"
		}],
		functionParameter: {
			database: {
				name: "データベース",
				detail: "必須。 リストまたはデータベースを構成するセル範囲を指定します。 データベースは、行 (レコード) と列 (フィールド) にデータを関連付けたリストです。 リストの先頭の行には、各列の見出しが入力されている必要があります。"
			},
			field: {
				name: "フィールド",
				detail: "必須。 関数の中で使用する列を指定します。 フィールドには、半角の二重引用符 (\") で囲んだ \"樹齢\" や \"歩どまり\" などのような文字列、またはリストでの列の位置を示す引用符なしの番号 (1 番目の列を示す場合は 1、2 番目の列を示す場合は 2) を指定します。"
			},
			criteria: {
				name: "検索条件",
				detail: "必須。 指定した条件が設定されているセル範囲を指定します。 列見出しと検索条件を指定するセルが少なくとも 1 つずつ含まれている場合は、検索条件に任意のセル範囲を指定できます。"
			}
		}
	},
	DPRODUCT: {
		description: "リストまたはデータベースのレコードで指定されたフィールド (列) を検索し、条件を満たすレコードの積を返します。",
		abstract: "リストまたはデータベースのレコードで指定されたフィールド (列) を検索し、条件を満たすレコードの積を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/dproduct-function"
		}],
		functionParameter: {
			database: {
				name: "データベース",
				detail: "必須。 リストまたはデータベースを構成するセル範囲を指定します。 データベースは、行 (レコード) と列 (フィールド) にデータを関連付けたリストです。 リストの先頭の行には、各列の見出しが入力されている必要があります。"
			},
			field: {
				name: "フィールド",
				detail: "必須。 関数の中で使用する列を指定します。 フィールドには、半角の二重引用符 (\") で囲んだ \"樹齢\" や \"歩どまり\" などのような文字列、またはリストでの列の位置を示す引用符なしの番号 (1 番目の列を示す場合は 1、2 番目の列を示す場合は 2) を指定します。"
			},
			criteria: {
				name: "検索条件",
				detail: "必須。 指定した条件が設定されているセル範囲を指定します。 列見出しと検索条件を指定するセルが少なくとも 1 つずつ含まれている場合は、検索条件に任意のセル範囲を指定できます。"
			}
		}
	},
	DSTDEV: {
		description: "リストまたはデータベースのレコードで指定されたフィールド (列) を検索し、条件を満たすレコードを標本と見なして、母集団の標準偏差を返します。",
		abstract: "リストまたはデータベースのレコードで指定されたフィールド (列) を検索し、条件を満たすレコードを標本と見なして、母集団の標準偏差を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/dstdev-function"
		}],
		functionParameter: {
			database: {
				name: "データベース",
				detail: "必須。 リストまたはデータベースを構成するセル範囲を指定します。 データベースは、行 (レコード) と列 (フィールド) にデータを関連付けたリストです。 リストの先頭の行には、各列の見出しが入力されている必要があります。"
			},
			field: {
				name: "フィールド",
				detail: "必須。 関数の中で使用する列を指定します。 フィールドには、半角の二重引用符 (\") で囲んだ \"樹齢\" や \"歩どまり\" などのような文字列、またはリストでの列の位置を示す引用符なしの番号 (1 番目の列を示す場合は 1、2 番目の列を示す場合は 2) を指定します。"
			},
			criteria: {
				name: "検索条件",
				detail: "必須。 指定した条件が設定されているセル範囲を指定します。 列見出しと検索条件を指定するセルが少なくとも 1 つずつ含まれている場合は、検索条件に任意のセル範囲を指定できます。"
			}
		}
	},
	DSTDEVP: {
		description: "リストまたはデータベースのレコードで指定されたフィールド (列) を検索し、条件を満たすレコードを母集団全体と見なして、母集団の標準偏差を返します。",
		abstract: "リストまたはデータベースのレコードで指定されたフィールド (列) を検索し、条件を満たすレコードを母集団全体と見なして、母集団の標準偏差を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/dstdevp-function"
		}],
		functionParameter: {
			database: {
				name: "データベース",
				detail: "必須。 リストまたはデータベースを構成するセル範囲を指定します。 データベースは、行 (レコード) と列 (フィールド) にデータを関連付けたリストです。 リストの先頭の行には、各列の見出しが入力されている必要があります。"
			},
			field: {
				name: "フィールド",
				detail: "必須。 関数の中で使用する列を指定します。 フィールドには、半角の二重引用符 (\") で囲んだ \"樹齢\" や \"歩どまり\" などのような文字列、またはリストでの列の位置を示す引用符なしの番号 (1 番目の列を示す場合は 1、2 番目の列を示す場合は 2) を指定します。"
			},
			criteria: {
				name: "検索条件",
				detail: "必須。 指定した条件が設定されているセル範囲を指定します。 列見出しと検索条件を指定するセルが少なくとも 1 つずつ含まれている場合は、検索条件に任意のセル範囲を指定できます。"
			}
		}
	},
	DSUM: {
		description: "リストまたはデータベースでは、DSUM は、指定した条件に一致するレコードのフィールド (列) 内の数値の合計を提供します。",
		abstract: "リストまたはデータベースでは、DSUM は、指定した条件に一致するレコードのフィールド (列) 内の数値の合計を提供します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/dsum-function"
		}],
		functionParameter: {
			database: {
				name: "データベース",
				detail: "必須。 これは、リストまたはデータベースを構成するセル範囲です。 データベースは、関連する情報の行が レコード であり、データの列が フィールド である関連データの一覧です。 リストの最初の行には、その中の各列のラベルが含まれています。"
			},
			field: {
				name: "フィールド",
				detail: "必須。 これは、関数で使用される列を指定します。 たとえば、\"Age\" や \"Yield\" などの二重引用符で囲まれた列ラベルを指定します。 または、リスト内の列の位置を表す数値 (引用符なし) を指定することもできます。たとえば、最初の列には 1 、2 番目の列には 2 などです。"
			},
			criteria: {
				name: "検索条件",
				detail: "必須。 これは、指定した条件を含むセル範囲です。 列見出しと検索条件を指定するセルが少なくとも 1 つずつ含まれている場合は、検索条件に任意のセル範囲を指定できます。"
			}
		}
	},
	DVAR: {
		description: "リストまたはデータベースのレコードで指定されたフィールド (列) を検索し、条件を満たすレコードを標本と見なして、母集団の分散を返します。",
		abstract: "リストまたはデータベースのレコードで指定されたフィールド (列) を検索し、条件を満たすレコードを標本と見なして、母集団の分散を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/dvar-function"
		}],
		functionParameter: {
			database: {
				name: "データベース",
				detail: "必須。 リストまたはデータベースを構成するセル範囲を指定します。 データベースは、行 (レコード) と列 (フィールド) にデータを関連付けたリストです。 リストの先頭の行には、各列の見出しが入力されている必要があります。"
			},
			field: {
				name: "フィールド",
				detail: "必須。 関数の中で使用する列を指定します。 フィールドには、半角の二重引用符 (\") で囲んだ \"樹齢\" や \"歩どまり\" などのような文字列、またはリストでの列の位置を示す引用符なしの番号 (1 番目の列を示す場合は 1、2 番目の列を示す場合は 2) を指定します。"
			},
			criteria: {
				name: "検索条件",
				detail: "必須。 指定した条件が設定されているセル範囲を指定します。 列見出しと検索条件を指定するセルが少なくとも 1 つずつ含まれている場合は、検索条件に任意のセル範囲を指定できます。"
			}
		}
	},
	DVARP: {
		description: "リストまたはデータベースのレコードで指定されたフィールド (列) を検索し、条件を満たすレコードを母集団全体と見なして、母集団の分散を返します。",
		abstract: "リストまたはデータベースのレコードで指定されたフィールド (列) を検索し、条件を満たすレコードを母集団全体と見なして、母集団の分散を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/dvarp-function"
		}],
		functionParameter: {
			database: {
				name: "データベース",
				detail: "必須。 リストまたはデータベースを構成するセル範囲を指定します。 データベースは、行 (レコード) と列 (フィールド) にデータを関連付けたリストです。 リストの先頭の行には、各列の見出しが入力されている必要があります。"
			},
			field: {
				name: "フィールド",
				detail: "必須。 関数の中で使用する列を指定します。 フィールドには、半角の二重引用符 (\") で囲んだ \"樹齢\" や \"歩どまり\" などのような文字列、またはリストでの列の位置を示す引用符なしの番号 (1 番目の列を示す場合は 1、2 番目の列を示す場合は 2) を指定します。"
			},
			criteria: {
				name: "検索条件",
				detail: "必須。 指定した条件が設定されているセル範囲を指定します。 列見出しと検索条件を指定するセルが少なくとも 1 つずつ含まれている場合は、検索条件に任意のセル範囲を指定できます。"
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/date/ja-JP.ts
const locale$11 = {
	DATE: {
		description: "指定された日付に対応するシリアル値を返します。",
		abstract: "指定された日付に対応するシリアル値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/date-function"
		}],
		functionParameter: {
			year: {
				name: "年",
				detail: "year 引数の値 には 、1 ~ 4 桁の数字を指定できます。 Excel は、コンピューター が使用 している日付システムに応じて年の引数を解釈します。 既定では、Univer では 1900 年の日付システムが使用されます。つまり、最初の日付は 1900 年 1 月 1 日です。"
			},
			month: {
				name: "月",
				detail: "1 ~ 12 (1 月から 12 月) の月を表す正または負の整数です。"
			},
			day: {
				name: "日",
				detail: "1 ~ 31 の月の日を表す正または負の整数です。"
			}
		}
	},
	DATEDIF: {
		description: "2 つの日付間の日数、月数、年数を計算します。 この関数は、年齢を計算する数式に使うと便利です。",
		abstract: "2 つの日付間の日数、月数、年数を計算します。 この関数は、年齢を計算する数式に使うと便利です。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/datedif-function"
		}],
		functionParameter: {
			startDate: {
				name: "開始日",
				detail: "指定した期間の最初の日付または開始日を表す日付。 日付は、引用符 (\"2001/1/30\" など) 内のテキスト文字列として、シリアル番号 (たとえば、1900 年 1 月 30 日を表す 36921 など) として、または他の数式または関数の結果として入力できます (例: DATEVALUE(\"2001/1/30\")。"
			},
			endDate: {
				name: "終了日",
				detail: "期間の最後の日付または終了日を表す日付。"
			},
			unit: {
				name: "単位",
				detail: "返される情報の種類。ここで: Unit****Returns \" Y \"期間の完全な年数。 M \"期間の完了した月の数\" D \"期間の日数\" MD \"start_dateとend_dateの日数の違い。 日付の月数および年数は無視されます。 大事な： \"MD\" 引数には既知の制限があるため、使用することはお勧めしません。 以下の既知の問題に関するセクションを参照してください。 YM \"start_dateとend_dateの月の違い。 日付の日数と年は無視されます\" YD \"start_date日とend_date日の違い。 日付の年数は無視されます。"
			}
		}
	},
	DATEVALUE: {
		description: "日付を表す文字列をシリアル値に変換します。",
		abstract: "日付を表す文字列をシリアル値に変換します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/datevalue-function"
		}],
		functionParameter: { dateText: {
			name: "日付文字列",
			detail: "Excel の日付形式で日付を表すテキスト、または Excel の日付形式で日付を表すテキストを含むセルへの参照。 たとえば、\"1/30/2008\" や \"30-Jan-2008\" は、日付を表す引用符内のテキスト文字列です。\nWindows 版 Excel の標準の日付システムを使用する場合、日付文字列の引数には、1900 年 1 月 1 日～ 9999 年 12 月 31 日までの間の日付を指定する必要があります。 DATEVALUE 関数は、#VALUE を返します。 が返されます。\n日付文字列 引数の年の部分を省略すると、DATEVALUE 関数はコンピューターのシステム時計による現在の年を使用します。 日付文字列引数に時刻の情報が含まれていても無視されます。"
		} }
	},
	DAY: {
		description: "シリアル番号で表された、日付の日情報を返します。日情報は 1 ～ 31 の範囲内の整数で示されます。",
		abstract: "シリアル値を日付に変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/day-function"
		}],
		functionParameter: { serialNumber: {
			name: "シリアル値",
			detail: "検索する日付を指定します。 日付は、DATE 関数を使って入力するか、他の数式または他の関数の結果を指定します。 たとえば、2008 年 5 月 23 日を入力する場合は、DATE(2008,5,23) を使用します。"
		} }
	},
	DAYS: {
		description: "2 つの日付間の日数を返します。",
		abstract: "2 つの日付間の日数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/days-function"
		}],
		functionParameter: {
			endDate: {
				name: "終了日",
				detail: "開始日と終了日を指定し、その間の日数を求めます。"
			},
			startDate: {
				name: "開始日",
				detail: "開始日と終了日を指定し、その間の日数を求めます。"
			}
		}
	},
	DAYS360: {
		description: "1 年を 360 日 (30 日 x 12) として、支払いの計算などに使用される 2 つの日付の間の日数を返します。",
		abstract: "1 年を 360 日 (30 日 x 12) として、支払いの計算などに使用される 2 つの日付の間の日数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/days360-function"
		}],
		functionParameter: {
			startDate: {
				name: "開始日",
				detail: "開始日と終了日を指定し、その間の日数を求めます。"
			},
			endDate: {
				name: "終了日",
				detail: "開始日と終了日を指定し、その間の日数を求めます。"
			},
			method: {
				name: "方法",
				detail: "計算に米国方式とヨーロッパ方式のどちらを採用するかを、論理値で指定します。"
			}
		}
	},
	EDATE: {
		description: "開始日から起算して、指定された月数だけ前または後の日付に対応するシリアル値を返します。 この関数を使用すると、伝票の発行日と同じ日に当たる支払日や満期日の日付を計算することができます。",
		abstract: "開始日から起算して、指定した月数だけ前または後の日付に対応するシリアル値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/edate-function"
		}],
		functionParameter: {
			startDate: {
				name: "開始日",
				detail: "起算日を表す日付を指定します。 日付は、DATE 関数を使って入力するか、他の数式または他の関数の結果を指定します。 たとえば、2008 年 5 月 23 日を入力する場合は、DATE(2008,5,23) を使用します。 日付を文字列として入力した場合、エラーが発生することがあります。"
			},
			months: {
				name: "月",
				detail: "開始日から起算した月数を指定します。 \"月\" に正の数を指定すると起算日より後の日付を返し、負の数を指定すると起算日より前の日付を返します。"
			}
		}
	},
	EOMONTH: {
		description: "開始日から起算して、指定した月数だけ前または後の月の最終日に対応するシリアル値を返します。",
		abstract: "開始日から起算して、指定した月数だけ前または後の月の最終日に対応するシリアル値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/eomonth-function"
		}],
		functionParameter: {
			startDate: {
				name: "開始日",
				detail: "起算日を表す日付を指定します。"
			},
			months: {
				name: "月",
				detail: "開始日から起算した月数を指定します。"
			}
		}
	},
	EPOCHTODATE: {
		description: "Unix エポック タイムスタンプ（秒、ミリ秒、またはマイクロ秒）を協定世界時（UTC）の日時に変換します。",
		abstract: "Unix エポック タイムスタンプ（秒、ミリ秒、またはマイクロ秒）を協定世界時（UTC）の日時に変換します。",
		links: [{
			title: "指導",
			url: "https://support.google.com/docs/answer/13193461?hl=ja"
		}],
		functionParameter: {
			timestamp: {
				name: "タイムスタンプ",
				detail: "EPOCHTODATE(1655908429662,2)"
			},
			unit: {
				name: "時間の単位",
				detail: "EPOCHTODATE(1655906710)"
			}
		}
	},
	HOUR: {
		description: "シリアル値を時刻に変換します。",
		abstract: "シリアル値を時刻に変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/hour-function"
		}],
		functionParameter: { serialNumber: {
			name: "シリアル値",
			detail: "検索する日付を指定します。 日付は、DATE 関数を使って入力するか、他の数式または他の関数の結果を指定します。 たとえば、2008 年 5 月 23 日を入力する場合は、DATE(2008,5,23) を使用します。"
		} }
	},
	ISOWEEKNUM: {
		description: "指定された日付のその年における ISO 週番号を返します。",
		abstract: "指定された日付のその年における ISO 週番号を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/isoweeknum-function"
		}],
		functionParameter: { date: {
			name: "日付",
			detail: "必須。 日付とは、Excel で日付や時刻の計算に使用されるコードのことです。"
		} }
	},
	MINUTE: {
		description: "時刻の分を返します。 戻り値は 0 (分) ～ 59 (分) の範囲の整数となります。",
		abstract: "時刻の分を返します。 戻り値は 0 (分) ～ 59 (分) の範囲の整数となります。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/minute-function"
		}],
		functionParameter: { serialNumber: {
			name: "シリアル値",
			detail: "必須。 検索する分が含まれている時刻を指定します。 時刻には、半角の二重引用符 (\") で囲んだ文字列 (\"6:45 PM\" など)、小数 (6:45 PM を表す 0.78125)、または他の数式や関数の結果 (TIMEVALUE(\"6:45 PM\") など) を指定します。"
		} }
	},
	MONTH: {
		description: "データに含まれる月をシリアル値で返します。 戻り値は 1 (月) ～ 12 (月) の範囲の整数となります。",
		abstract: "データに含まれる月をシリアル値で返します。 戻り値は 1 (月) ～ 12 (月) の範囲の整数となります。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/month-function"
		}],
		functionParameter: { serialNumber: {
			name: "シリアル値",
			detail: "必須。 検索する月の日付を指定します。 日付は、DATE 関数を使って入力するか、他の数式または他の関数の結果として指定します。 たとえば、2008 年 5 月 23 日を入力する場合は、DATE(2008,5,23) を使用します。 日付を文字列として入力 した場合、エラーが発生することがあります。"
		} }
	},
	NETWORKDAYS: {
		description: "開始日から終了日までの期間に含まれる稼動日の日数を返します。 稼働日とは、土曜、日曜、および指定された休日を除く日のことです。 この関数は、特定期間内の稼動日数を基準にして従業員の給与を計算するときに使用します。",
		abstract: "開始日から終了日までの期間に含まれる稼動日の日数を返します。 稼働日とは、土曜、日曜、および指定された休日を除く日のことです。 この関数は、特定期間内の稼動日数を基準にして従業員の給与を計算するときに使用します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/networkdays-function"
		}],
		functionParameter: {
			startDate: {
				name: "開始日",
				detail: "必須。 起算日を表す日付を指定します。"
			},
			endDate: {
				name: "終了日",
				detail: "必須。 対象期間の最終日を表す日付を指定します。"
			},
			holidays: {
				name: "休日",
				detail: "オプション。 国民の祝日や変動休日など、稼働日数の計算から除外する日付のリストを指定します。 日付を含む一連のセルか、日付を示すシリアル値の配列定数で指定できます。"
			}
		}
	},
	NETWORKDAYS_INTL: {
		description: "週末がどの曜日で何日間あるかを示すパラメーターを使用して、開始日と終了日の間にある稼働日の日数を返します。",
		abstract: "週末がどの曜日で何日間あるかを示すパラメーターを使用して、開始日と終了日の間にある稼働日の日数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/networkdays-intl-function"
		}],
		functionParameter: {
			startDate: {
				name: "開始日",
				detail: "起算日を表す日付を指定します。"
			},
			endDate: {
				name: "終了日",
				detail: "対象期間の最終日を表す日付を指定します。"
			},
			weekend: {
				name: "週末",
				detail: "は、週末を示す週末番号または文字列で指定します。"
			},
			holidays: {
				name: "休日",
				detail: "国民の祝日や変動休日など、稼働日数の計算から除外する日付のリストを指定します。"
			}
		}
	},
	NOW: {
		description: "現在の日付と時刻に対応するシリアル値を返します。 関数が入力される前に、セルの表示形式が [ 標準 ] であった場合、セルの書式は、地域の設定の日付と時刻の書式に合わせて変更されます。 リボンの [ ホーム ] タブにある [ 数値 ] のコマンドを使用して、セルの日付と時刻の書式を変更できます。",
		abstract: "現在の日付と時刻に対応するシリアル値を返します。 関数が入力される前に、セルの表示形式が [ 標準 ] であった場合、セルの書式は、地域の設定の日付と時刻の書式に合わせて変更されます。 リボンの [ ホーム ] タブにある [ 数値 ] のコマンドを使用して、セルの日付と時刻の書式を変更できます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/now-function"
		}],
		functionParameter: {}
	},
	SECOND: {
		description: "時刻の秒を返します。 戻り値は 0 (秒) ～ 59 (秒) の範囲の整数となります。",
		abstract: "時刻の秒を返します。 戻り値は 0 (秒) ～ 59 (秒) の範囲の整数となります。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/second-function"
		}],
		functionParameter: { serialNumber: {
			name: "シリアル値",
			detail: "必須。 検索する秒が含まれている時刻を指定します。 時刻には、半角の二重引用符 (\") で囲んだ文字列 (\"6:45 PM\" など)、小数 (6:45 PM を表す 0.78125)、または他の数式や関数の結果 (TIMEVALUE(\"6:45 PM\") など) を指定します。"
		} }
	},
	TIME: {
		description: "指定した時刻に対応する小数を返します。 この関数を挿入する前のセルの表示形式が [ 標準 ] であった場合、結果は日付形式になります。",
		abstract: "指定した時刻に対応する小数を返します。 この関数を挿入する前のセルの表示形式が [ 標準 ] であった場合、結果は日付形式になります。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/time-function"
		}],
		functionParameter: {
			hour: {
				name: "時",
				detail: "必須。 時間を表す 0 (ゼロ) から 32767 までの数値。 23 より大きい値は 24 で割られ、残りは時間値として扱われます。 たとえば、TIME(27,0,0) = TIME(3,0,0) = .125 または 3:00 AM。"
			},
			minute: {
				name: "分",
				detail: "必須。 分を表す 0 から 32767 までの数値。 59 より大きい値は、時間と分に変換されます。 たとえば、TIME(0,750,0) = TIME(12,30,0) = .520833 または 12:30 PM。"
			},
			second: {
				name: "秒",
				detail: "必須。 2 番目を表す 0 から 32767 までの数値。 59 を超える値は、時間、分、秒に変換されます。 たとえば、TIME(0,0,2000) = TIME(0,33,22) = .023148 または 12:33:20 AM"
			}
		}
	},
	TIMEVALUE: {
		description: "時刻を表す文字列をシリアル値に変換します。",
		abstract: "時刻を表す文字列をシリアル値に変換します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/timevalue-function"
		}],
		functionParameter: { timeText: {
			name: "時刻文字列",
			detail: "Microsoft Excel のいずれかの時刻形式で時刻を表すテキスト文字列。たとえば、\"6:45 PM\" と \"18:45\" のテキスト文字列は、時間を表す引用符で囲みます。"
		} }
	},
	TO_DATE: {
		description: "指定された数値を日付に変換します。",
		abstract: "指定された数値を日付に変換します。",
		links: [{
			title: "指導",
			url: "https://support.google.com/docs/answer/3094239?hl=ja"
		}],
		functionParameter: { value: {
			name: "値",
			detail: "TO_DATE(A2)"
		} }
	},
	TODAY: {
		description: "現在の日付に対応するシリアル値を返します。",
		abstract: "現在の日付に対応するシリアル値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/today-function"
		}],
		functionParameter: {}
	},
	WEEKDAY: {
		description: "シリアル値を曜日に変換します。",
		abstract: "シリアル値を曜日に変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/weekday-function"
		}],
		functionParameter: {
			serialNumber: {
				name: "シリアル値",
				detail: "検索する日付のシリアル値を指定します。"
			},
			returnType: {
				name: "週の基準",
				detail: "戻り値の種類を数値で指定します。"
			}
		}
	},
	WEEKNUM: {
		description: "シリアル値をその年の何週目に当たるかを示す値に変換します。",
		abstract: "シリアル値をその年の何週目に当たるかを示す値に変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/weeknum-function"
		}],
		functionParameter: {
			serialNumber: {
				name: "シリアル値",
				detail: "日付を指定します。"
			},
			returnType: {
				name: "週の基準",
				detail: " 週の始まりを何曜日とするかを数値で指定します。 既定値は 1 です。"
			}
		}
	},
	WORKDAY: {
		description: "開始日から起算して、指定した稼動日数だけ前または後の日付に対応するシリアル値を返します。",
		abstract: "開始日から起算して、指定した稼動日数だけ前または後の日付に対応するシリアル値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/workday-function"
		}],
		functionParameter: {
			startDate: {
				name: "開始日",
				detail: "起算日を表す日付を指定します。"
			},
			days: {
				name: "日数",
				detail: "開始日から起算して、週末や祭日を除く週日の日数を指定します。 日数に正の数を指定すると、起算日より後の日付となり、負の数を指定すると、起算日より前の日付となります。"
			},
			holidays: {
				name: "休日",
				detail: "国民の祝日や変動休日など、稼働日数の計算から除外する日付のリストを指定します。"
			}
		}
	},
	WORKDAY_INTL: {
		description: "週末がどの曜日で何日間あるかを示すパラメーターを使用して、開始日から起算して指定した稼働日数だけ前または後の日付に対応するシリアル値を返します。",
		abstract: "週末がどの曜日で何日間あるかを示すパラメーターを使用して、開始日から起算して指定した稼働日数だけ前または後の日付に対応するシリアル値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/workday-intl-function"
		}],
		functionParameter: {
			startDate: {
				name: "開始日",
				detail: "起算日を表す日付を指定します。"
			},
			days: {
				name: "日数",
				detail: "開始日から起算して、週末や祭日を除く週日の日数を指定します。 日数に正の数を指定すると、起算日より後の日付となり、負の数を指定すると、起算日より前の日付となります。"
			},
			weekend: {
				name: "週末",
				detail: "は、週末を示す週末番号または文字列で指定します。"
			},
			holidays: {
				name: "休日",
				detail: "国民の祝日や変動休日など、稼働日数の計算から除外する日付のリストを指定します。"
			}
		}
	},
	YEAR: {
		description: "日付に対応する年を返します。 戻り値は、1900 (年) ～ 9999 (年) の範囲の整数となります。",
		abstract: "シリアル値を年に変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/year-function"
		}],
		functionParameter: { serialNumber: {
			name: "シリアル値",
			detail: "検索する年の日付を指定します。 日付は、DATE 関数を使って入力するか、他の数式または他の関数の結果として指定します。 たとえば、2008 年 5 月 23 日を入力する場合は、DATE(2008,5,23) を使用します。 日付を文字列として入力した場合、エラーが発生することがあります。"
		} }
	},
	YEARFRAC: {
		description: "開始日と終了日を指定して、その間の期間が 1 年間に対して占める割合を返します。",
		abstract: "開始日と終了日を指定して、その間の期間が 1 年間に対して占める割合を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/yearfrac-function"
		}],
		functionParameter: {
			startDate: {
				name: "開始日",
				detail: "起算日を表す日付を指定します。"
			},
			endDate: {
				name: "終了日",
				detail: "対象期間の最終日を表す日付を指定します。"
			},
			basis: {
				name: "基準",
				detail: "計算に使用する基準日数を示す数値を指定します。"
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/engineering/ja-JP.ts
const locale$10 = {
	BESSELI: {
		description: "修正ベッセル関数 In(x) を返します。",
		abstract: "修正ベッセル関数 In(x) を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/besseli-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "関数に代入する値を指定します。"
			},
			n: {
				name: "N",
				detail: "ベッセル関数の次数を指定します。n に整数以外の値を指定すると、小数点以下が切り捨てられます。"
			}
		}
	},
	BESSELJ: {
		description: "ベッセル関数 Jn(x) を返します。",
		abstract: "ベッセル関数 Jn(x) を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/besselj-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "関数に代入する値を指定します。"
			},
			n: {
				name: "N",
				detail: "ベッセル関数の次数を指定します。n に整数以外の値を指定すると、小数点以下が切り捨てられます。"
			}
		}
	},
	BESSELK: {
		description: "修正ベッセル関数 Kn(x) を返します。",
		abstract: "修正ベッセル関数 Kn(x) を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/besselk-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "関数に代入する値を指定します。"
			},
			n: {
				name: "N",
				detail: "ベッセル関数の次数を指定します。n に整数以外の値を指定すると、小数点以下が切り捨てられます。"
			}
		}
	},
	BESSELY: {
		description: "ベッセル関数 Yn(x) を返します。",
		abstract: "ベッセル関数 Yn(x) を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/bessely-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "関数に代入する値を指定します。"
			},
			n: {
				name: "N",
				detail: "ベッセル関数の次数を指定します。n に整数以外の値を指定すると、小数点以下が切り捨てられます。"
			}
		}
	},
	BIN2DEC: {
		description: "2 進数を 10 進数に変換します。",
		abstract: "2 進数を 10 進数に変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/bin2dec-function"
		}],
		functionParameter: { number: {
			name: "2 進数",
			detail: "変換する 2 進数を指定します。"
		} }
	},
	BIN2HEX: {
		description: "2 進数を 16 進数に変換します。",
		abstract: "2 進数を 16 進数に変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/bin2hex-function"
		}],
		functionParameter: {
			number: {
				name: "2 進数",
				detail: "変換する 2 進数を指定します。"
			},
			places: {
				name: "桁数",
				detail: "使用する文字数を指定します。"
			}
		}
	},
	BIN2OCT: {
		description: "2 進数を 8 進数に変換します。",
		abstract: "2 進数を 8 進数に変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/bin2oct-function"
		}],
		functionParameter: {
			number: {
				name: "2 進数",
				detail: "必ず指定します。 変換する 2 進数を指定します。 数値に指定できる文字数は 10 文字 (10 ビット) までです。 数値の最上位のビットは符号を表します。 残りの 9 ビットは数値の大きさを表します。 負の数は 2 の補数を使って表します。"
			},
			places: {
				name: "桁数",
				detail: "オプション。 使用する文字数を指定します。 桁数を省略すると、必要最小限の桁数で結果が返されます。 桁数は、戻り値が桁数に満たないときに 0 (ゼロ) を前に付加して桁を埋める場合に役立ちます。"
			}
		}
	},
	BITAND: {
		description: "2 つの数値の 'ビット単位の And' を返します。",
		abstract: "2 つの数値の 'ビット単位の And' を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/bitand-function"
		}],
		functionParameter: {
			number1: {
				name: "数値1",
				detail: "小数点の表示形式になっている必要があります。 0 以上の数値を指定します。"
			},
			number2: {
				name: "数値2",
				detail: "小数点の表示形式になっている必要があります。 0 以上の数値を指定します。"
			}
		}
	},
	BITLSHIFT: {
		description: "shift_amount ビットだけ左へシフトした数値を返します。",
		abstract: "shift_amount ビットだけ左へシフトした数値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/bitlshift-function"
		}],
		functionParameter: {
			number: {
				name: "数値",
				detail: "数値は、0 以上の整数である必要があります。"
			},
			shiftAmount: {
				name: "シフト量",
				detail: "は整数である必要があります。"
			}
		}
	},
	BITOR: {
		description: "2 つの数値のビット単位の OR を返します。",
		abstract: "2 つの数値のビット単位の OR を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/bitor-function"
		}],
		functionParameter: {
			number1: {
				name: "数値1",
				detail: "小数点の表示形式になっている必要があります。 0 以上の数値を指定します。"
			},
			number2: {
				name: "数値2",
				detail: "小数点の表示形式になっている必要があります。 0 以上の数値を指定します。"
			}
		}
	},
	BITRSHIFT: {
		description: "shift_amount ビットだけ右へシフトした数値を返します。",
		abstract: "shift_amount ビットだけ右へシフトした数値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/bitrshift-function"
		}],
		functionParameter: {
			number: {
				name: "数値",
				detail: "数値は、0 以上の整数である必要があります。"
			},
			shiftAmount: {
				name: "シフト量",
				detail: "は整数である必要があります。"
			}
		}
	},
	BITXOR: {
		description: "2 つの数値のビット単位の 'Exclusive Or' を返します。",
		abstract: "2 つの数値のビット単位の 'Exclusive Or' を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/bitxor-function"
		}],
		functionParameter: {
			number1: {
				name: "数値1",
				detail: "小数点の表示形式になっている必要があります。 0 以上の数値を指定します。"
			},
			number2: {
				name: "数値2",
				detail: "小数点の表示形式になっている必要があります。 0 以上の数値を指定します。"
			}
		}
	},
	COMPLEX: {
		description: "実数係数および虚数係数を 'x+yi' または 'x+yj' の形式の複素数に変換します。",
		abstract: "実数係数および虚数係数を 'x+yi' または 'x+yj' の形式の複素数に変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/complex-function"
		}],
		functionParameter: {
			realNum: {
				name: "実数",
				detail: "複素数の実数係数を指定します。"
			},
			iNum: {
				name: "虚数",
				detail: "複素数の虚数係数を指定します。"
			},
			suffix: {
				name: "虚数単位",
				detail: "複素数の虚数部分の単位を指定します。省略すると、\"i\" を指定したと見なされます。"
			}
		}
	},
	CONVERT: {
		description: "数値の単位を変換します。",
		abstract: "数値の単位を変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/convert-function"
		}],
		functionParameter: {
			number: {
				name: "数値",
				detail: "変換する値を指定します。"
			},
			fromUnit: {
				name: "変換前単位",
				detail: "数値の単位を指定します。"
			},
			toUnit: {
				name: "変換後単位",
				detail: "結果の単位を指定します。"
			}
		}
	},
	DEC2BIN: {
		description: "10 進数を 2 進数に変換します。",
		abstract: "10 進数を 2 進数に変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/dec2bin-function"
		}],
		functionParameter: {
			number: {
				name: "10 進数",
				detail: "変換する 10 進数を指定します。"
			},
			places: {
				name: "桁数",
				detail: "使用する文字数を指定します。"
			}
		}
	},
	DEC2HEX: {
		description: "10 進数を 16 進数に変換します。",
		abstract: "10 進数を 16 進数に変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/dec2hex-function"
		}],
		functionParameter: {
			number: {
				name: "10 進数",
				detail: "変換する 10 進数を指定します。"
			},
			places: {
				name: "桁数",
				detail: "使用する文字数を指定します。"
			}
		}
	},
	DEC2OCT: {
		description: "10 進数を 8 進数に変換します。",
		abstract: "10 進数を 8 進数に変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/dec2oct-function"
		}],
		functionParameter: {
			number: {
				name: "10 進数",
				detail: "変換する 10 進数を指定します。"
			},
			places: {
				name: "桁数",
				detail: "使用する文字数を指定します。"
			}
		}
	},
	DELTA: {
		description: "2 つの値が等しいかどうかを調べます。",
		abstract: "2 つの値が等しいかどうかを調べます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/delta-function"
		}],
		functionParameter: {
			number1: {
				name: "数値1",
				detail: "一方の数値を指定します。"
			},
			number2: {
				name: "数値2",
				detail: "もう一方の数値を指定します。数値 2 を省略すると、0 を指定したと見なされます。"
			}
		}
	},
	ERF: {
		description: "誤差関数の積分値を返します。",
		abstract: "誤差関数の積分値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/erf-function"
		}],
		functionParameter: {
			lowerLimit: {
				name: "下限",
				detail: "誤差関数を積分するときの下限値を指定します。"
			},
			upperLimit: {
				name: "上限",
				detail: "誤差関数を積分するときの上限値を指定します。上限を省略すると、0 ～下限の範囲で積分が行われます。"
			}
		}
	},
	ERF_PRECISE: {
		description: "誤差関数の積分値を返します。",
		abstract: "誤差関数の積分値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/erf-precise-function"
		}],
		functionParameter: { x: {
			name: "下限",
			detail: "誤差関数を積分するときの下限値を指定します。"
		} }
	},
	ERFC: {
		description: "相補誤差関数の積分値を返します。",
		abstract: "相補誤差関数の積分値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/erfc-function"
		}],
		functionParameter: { x: {
			name: "下限",
			detail: "相補誤差関数を積分するときの下限値を指定します。"
		} }
	},
	ERFC_PRECISE: {
		description: "x ～無限大の範囲で、相補誤差関数の積分値を返します。",
		abstract: "x ～無限大の範囲で、相補誤差関数の積分値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/erfc-precise-function"
		}],
		functionParameter: { x: {
			name: "下限",
			detail: "相補誤差関数を積分するときの下限値を指定します。"
		} }
	},
	GESTEP: {
		description: "数値がしきい値以上であるかどうかを調べます。",
		abstract: "数値がしきい値以上であるかどうかを調べます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/gestep-function"
		}],
		functionParameter: {
			number: {
				name: "数値",
				detail: "しきい値に対して判定する値を指定します。"
			},
			step: {
				name: "しきい値",
				detail: "しきい値にする値を指定します。しきい値を省略すると、0 が使用されます。"
			}
		}
	},
	HEX2BIN: {
		description: "16 進数を 2 進数に変換します。",
		abstract: "16 進数を 2 進数に変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/hex2bin-function"
		}],
		functionParameter: {
			number: {
				name: "16 進数",
				detail: "変換する 16 進数を指定します。"
			},
			places: {
				name: "桁数",
				detail: "使用する文字数を指定します。"
			}
		}
	},
	HEX2DEC: {
		description: "16 進数を 10 進数に変換します。",
		abstract: "16 進数を 10 進数に変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/hex2dec-function"
		}],
		functionParameter: { number: {
			name: "16 進数",
			detail: "変換する 16 進数を指定します。"
		} }
	},
	HEX2OCT: {
		description: "16 進数を 8 進数に変換します。",
		abstract: "16 進数を 8 進数に変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/hex2oct-function"
		}],
		functionParameter: {
			number: {
				name: "16 進数",
				detail: "変換する 16 進数を指定します。"
			},
			places: {
				name: "桁数",
				detail: "使用する文字数を指定します。"
			}
		}
	},
	IMABS: {
		description: "指定した複素数の絶対値を返します。",
		abstract: "指定した複素数の絶対値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/imabs-function"
		}],
		functionParameter: { inumber: {
			name: "複素数",
			detail: "絶対値を求める複素数を指定します。"
		} }
	},
	IMAGINARY: {
		description: "文字列 \"x+yi\" または \"x+yj\" の形式で指定された複素数の虚数係数を返します。",
		abstract: "文字列 \"x+yi\" または \"x+yj\" の形式で指定された複素数の虚数係数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/imaginary-function"
		}],
		functionParameter: { inumber: {
			name: "複素数",
			detail: "必須。 虚数係数を求める複素数を指定します。"
		} }
	},
	IMARGUMENT: {
		description: "引数シータ (ラジアンで表した角度) を返します。",
		abstract: "引数シータ (ラジアンで表した角度) を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/imargument-function"
		}],
		functionParameter: { inumber: {
			name: "複素数",
			detail: "引数を theta する複素数。"
		} }
	},
	IMCONJUGATE: {
		description: "複素数の複素共役を返します。",
		abstract: "複素数の複素共役を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/imconjugate-function"
		}],
		functionParameter: { inumber: {
			name: "複素数",
			detail: "共役を求める複素数を指定します。"
		} }
	},
	IMCOS: {
		description: "複素数のコサインを返します。",
		abstract: "複素数のコサインを返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/imcos-function"
		}],
		functionParameter: { inumber: {
			name: "複素数",
			detail: "コサインを求める複素数を指定します。"
		} }
	},
	IMCOSH: {
		description: "複素数の双曲線余弦を返します。",
		abstract: "複素数の双曲線余弦を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/imcosh-function"
		}],
		functionParameter: { inumber: {
			name: "複素数",
			detail: "双曲線余弦を求めたい複素数。"
		} }
	},
	IMCOT: {
		description: "複素数の余接を返します。",
		abstract: "複素数の余接を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/imcot-function"
		}],
		functionParameter: { inumber: {
			name: "複素数",
			detail: "余接を求める複素数を指定します。"
		} }
	},
	IMCOTH: {
		description: "IMCOTH 関数は、指定された複素数の双曲線余接を返します。 たとえば、「x+yi」形式で複素数を指定すると「coth(x+yi)」が返されます。",
		abstract: "IMCOTH 関数は、指定された複素数の双曲線余接を返します。 たとえば、「x+yi」形式で複素数を指定すると「coth(x+yi)」が返されます。",
		links: [{
			title: "指導",
			url: "https://support.google.com/docs/answer/9366256?hl=ja"
		}],
		functionParameter: { inumber: {
			name: "複素数",
			detail: "双曲線コタンジェントを求める複素数です。 COMPLEX 関数の結果の 0 の虚数部を持つ複素数として解釈される実数、または「x+yi」形式の文字列（x と y は数値）を指定できます。"
		} }
	},
	IMCSC: {
		description: "複素数の余割を返します。",
		abstract: "複素数の余割を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/imcsc-function"
		}],
		functionParameter: { inumber: {
			name: "複素数",
			detail: "余割を求める複素数を指定します。"
		} }
	},
	IMCSCH: {
		description: "複素数の双曲線余割を返します。",
		abstract: "複素数の双曲線余割を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/imcsch-function"
		}],
		functionParameter: { inumber: {
			name: "複素数",
			detail: "双曲線余割を求める複素数を指定します。"
		} }
	},
	IMDIV: {
		description: "2 つの複素数の商を返します。",
		abstract: "2 つの複素数の商を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/imdiv-function"
		}],
		functionParameter: {
			inumber1: {
				name: "複素数分子",
				detail: "割り算の分子または被除数となる複素数を指定します。"
			},
			inumber2: {
				name: "複素数分母",
				detail: "割り算の分母または除数となる複素数を指定します。"
			}
		}
	},
	IMEXP: {
		description: "文字列 \"x+yi\" または \"x+yj\" の形式で指定された複素数のべき乗を返します。",
		abstract: "文字列 \"x+yi\" または \"x+yj\" の形式で指定された複素数のべき乗を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/imexp-function"
		}],
		functionParameter: { inumber: {
			name: "複素数",
			detail: "必須。 べき乗を求める複素数を指定します。"
		} }
	},
	IMLN: {
		description: "複素数の自然対数を返します。",
		abstract: "複素数の自然対数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/imln-function"
		}],
		functionParameter: { inumber: {
			name: "複素数",
			detail: "自然対数を求める複素数を指定します。"
		} }
	},
	IMLOG: {
		description: "IMLOG 関数は、指定された値を底とする複素数の対数を返します。",
		abstract: "IMLOG 関数は、指定された値を底とする複素数の対数を返します。",
		links: [{
			title: "指導",
			url: "https://support.google.com/docs/answer/9366486?hl=ja"
		}],
		functionParameter: {
			inumber: {
				name: "複素数",
				detail: "対数関数の入力値です。 数値は、実数として解釈されるように、通常の数値（1 など）を記述できます。 数値は、文字を引用符で囲んで記述して、実数係数と複素係数の両方を指定できます。"
			},
			base: {
				name: "底",
				detail: "対数を求めるときに使用する底です。 正の実数を指定してください。"
			}
		}
	},
	IMLOG10: {
		description: "複素数の 10 を底とする対数を返します。",
		abstract: "複素数の 10 を底とする対数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/imlog10-function"
		}],
		functionParameter: { inumber: {
			name: "複素数",
			detail: "常用対数を求める複素数を指定します。"
		} }
	},
	IMLOG2: {
		description: "複素数の 2 を底とする対数を返します。",
		abstract: "複素数の 2 を底とする対数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/imlog2-function"
		}],
		functionParameter: { inumber: {
			name: "複素数",
			detail: "2 を底とする対数を求める複素数を指定します。"
		} }
	},
	IMPOWER: {
		description: "複素数の整数乗を返します。",
		abstract: "複素数の整数乗を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/impower-function"
		}],
		functionParameter: {
			inumber: {
				name: "複素数",
				detail: "べき乗を求める複素数を指定します。"
			},
			number: {
				name: "数値",
				detail: "複素数を底とするべき乗の指数です。"
			}
		}
	},
	IMPRODUCT: {
		description: "複素数の積を返します",
		abstract: "複素数の積を返します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/improduct-function"
		}],
		functionParameter: {
			inumber1: {
				name: "複素数1",
				detail: "積を求める複素数を 1 ～ 255 個まで指定します。"
			},
			inumber2: {
				name: "複素数2",
				detail: "積を求める複素数を 1 ～ 255 個まで指定します。"
			}
		}
	},
	IMREAL: {
		description: "複素数の実数係数を返します。",
		abstract: "複素数の実数係数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/imreal-function"
		}],
		functionParameter: { inumber: {
			name: "複素数",
			detail: "実数係数を求める複素数を指定します。"
		} }
	},
	IMSEC: {
		description: "複素数の正割を返します。",
		abstract: "複素数の正割を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/imsec-function"
		}],
		functionParameter: { inumber: {
			name: "複素数",
			detail: "正割を求める複素数。"
		} }
	},
	IMSECH: {
		description: "複素数の双曲線正割を返します。",
		abstract: "複素数の双曲線正割を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/imsech-function"
		}],
		functionParameter: { inumber: {
			name: "複素数",
			detail: "双曲線正割を求める複素数。"
		} }
	},
	IMSIN: {
		description: "複素数のサインを返します。",
		abstract: "複素数のサインを返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/imsin-function"
		}],
		functionParameter: { inumber: {
			name: "複素数",
			detail: "サインを求める複素数を指定します。"
		} }
	},
	IMSINH: {
		description: "複素数の双曲線正弦を返します。",
		abstract: "複素数の双曲線正弦を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/imsinh-function"
		}],
		functionParameter: { inumber: {
			name: "複素数",
			detail: "双曲線正弦を求める複素数を指定します。"
		} }
	},
	IMSQRT: {
		description: "複素数の平方根を返します。",
		abstract: "複素数の平方根を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/imsqrt-function"
		}],
		functionParameter: { inumber: {
			name: "複素数",
			detail: "平方根を求める複素数を指定します。"
		} }
	},
	IMSUB: {
		description: "2 つの複素数の差を返します。",
		abstract: "2 つの複素数の差を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/imsub-function"
		}],
		functionParameter: {
			inumber1: {
				name: "複素数1",
				detail: "複素数1。"
			},
			inumber2: {
				name: "複素数2",
				detail: "複素数2。"
			}
		}
	},
	IMSUM: {
		description: "複素数の和を返します。",
		abstract: "複素数の和を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/imsum-function"
		}],
		functionParameter: {
			inumber1: {
				name: "複素数1",
				detail: "和を求める複素数を 1 ～ 255 個まで指定します。"
			},
			inumber2: {
				name: "複素数2",
				detail: "和を求める複素数を 1 ～ 255 個まで指定します。"
			}
		}
	},
	IMTAN: {
		description: "複素数の正接を返します。",
		abstract: "複素数の正接を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/imtan-function"
		}],
		functionParameter: { inumber: {
			name: "複素数",
			detail: "正接を求める接線を指定します。"
		} }
	},
	IMTANH: {
		description: "IMTANH 関数は、指定された複素数の双曲線正接を返します。 たとえば、複素数「x+yi」を指定すると「tanh(x+yi)」が返されます。",
		abstract: "IMTANH 関数は、指定された複素数の双曲線正接を返します。 たとえば、複素数「x+yi」を指定すると「tanh(x+yi)」が返されます。",
		links: [{
			title: "指導",
			url: "https://support.google.com/docs/answer/9366655?hl=ja"
		}],
		functionParameter: { inumber: {
			name: "複素数",
			detail: "双曲線正接を求める複素数です。 COMPLEX 関数の結果、0 の虚数部を持つ複素数として解釈される実数、「x+yi」形式の文字列（x と y は数値）を指定できます。"
		} }
	},
	OCT2BIN: {
		description: "8 進数を 2 進数に変換します。",
		abstract: "8 進数を 2 進数に変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/oct2bin-function"
		}],
		functionParameter: {
			number: {
				name: "8 進数",
				detail: "変換する 8 進数を指定します。"
			},
			places: {
				name: "桁数",
				detail: "使用する文字数を指定します。"
			}
		}
	},
	OCT2DEC: {
		description: "8 進数を 10 進数に変換します。",
		abstract: "8 進数を 10 進数に変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/oct2dec-function"
		}],
		functionParameter: { number: {
			name: "8 進数",
			detail: "変換する 8 進数を指定します。"
		} }
	},
	OCT2HEX: {
		description: "8 進数を 16 進数に変換します。",
		abstract: "8 進数を 16 進数に変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/oct2hex-function"
		}],
		functionParameter: {
			number: {
				name: "8 進数",
				detail: "変換する 8 進数を指定します。"
			},
			places: {
				name: "桁数",
				detail: "使用する文字数を指定します。"
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/financial/ja-JP.ts
const locale$9 = {
	ACCRINT: {
		description: "定期的に利息が支払われる証券の未収利息額を返します。",
		abstract: "定期的に利息が支払われる証券の未収利息額を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/accrint-function"
		}],
		functionParameter: {
			issue: {
				name: "発行日",
				detail: "証券の発行日を指定します。"
			},
			firstInterest: {
				name: "初回利払日",
				detail: "証券の利息が最初に支払われる日付を指定します。"
			},
			settlement: {
				name: "受渡日",
				detail: "証券の満期日を指定します。"
			},
			rate: {
				name: "利率",
				detail: "証券の年利を指定します。"
			},
			par: {
				name: "額面",
				detail: "証券の額面価格を指定します。"
			},
			frequency: {
				name: "頻度",
				detail: "年間の利息支払回数を指定します。"
			},
			basis: {
				name: "基準",
				detail: "計算に使用する基準日数を示す数値を指定します。"
			},
			calcMethod: {
				name: "計算方式",
				detail: "論理値です: 発行日からの未払い利息 = TRUE、または最後のクーポン支払日から計算 = FALSE。"
			}
		}
	},
	ACCRINTM: {
		description: "満期日に利息が支払われる証券の未収利息額を返します。",
		abstract: "満期日に利息が支払われる証券の未収利息額を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/accrintm-function"
		}],
		functionParameter: {
			issue: {
				name: "発行日",
				detail: "証券の発行日を指定します。"
			},
			settlement: {
				name: "受渡日",
				detail: "証券の満期日を指定します。"
			},
			rate: {
				name: "利率",
				detail: "証券の年利を指定します。"
			},
			par: {
				name: "額面",
				detail: "証券の額面価格を指定します。"
			},
			basis: {
				name: "基準",
				detail: "計算に使用する基準日数を示す数値を指定します。"
			}
		}
	},
	AMORDEGRC: {
		description: "減価償却係数を使用して、各会計期における減価償却費を返します。",
		abstract: "減価償却係数を使用して、各会計期における減価償却費を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/amordegrc-function"
		}],
		functionParameter: {
			cost: {
				name: "取得価額",
				detail: "資産を購入した時点での価格を指定します。"
			},
			datePurchased: {
				name: "購入日",
				detail: "資産を購入した日付を指定します。"
			},
			firstPeriod: {
				name: "開始期",
				detail: "最初の会計期が終了する日付を指定します。"
			},
			salvage: {
				name: "残存価額",
				detail: "耐用年数が終了した時点での資産の価格を指定します。"
			},
			period: {
				name: "期",
				detail: "会計期 (会計年度) を指定します。"
			},
			rate: {
				name: "率",
				detail: "減価償却率を指定します。"
			},
			basis: {
				name: "基準",
				detail: "1 年を何日として計算するかを表す数値を指定します。"
			}
		}
	},
	AMORLINC: {
		description: "各会計期における減価償却費を返します。",
		abstract: "各会計期における減価償却費を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/amorlinc-function"
		}],
		functionParameter: {
			cost: {
				name: "取得価額",
				detail: "資産を購入した時点での価格を指定します。"
			},
			datePurchased: {
				name: "購入日",
				detail: "資産を購入した日付を指定します。"
			},
			firstPeriod: {
				name: "開始期",
				detail: "最初の会計期が終了する日付を指定します。"
			},
			salvage: {
				name: "残存価額",
				detail: "耐用年数が終了した時点での資産の価格を指定します。"
			},
			period: {
				name: "期",
				detail: "会計期 (会計年度) を指定します。"
			},
			rate: {
				name: "率",
				detail: "減価償却率を指定します。"
			},
			basis: {
				name: "基準",
				detail: "1 年を何日として計算するかを表す数値を指定します。"
			}
		}
	},
	COUPDAYBS: {
		description: "利払期間の第 1 日目から受渡日までの日数を返します。",
		abstract: "利払期間の第 1 日目から受渡日までの日数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/coupdaybs-function"
		}],
		functionParameter: {
			settlement: {
				name: "受渡日",
				detail: "証券の受渡日を指定します。"
			},
			maturity: {
				name: "満期日",
				detail: "証券の満期日を指定します。"
			},
			frequency: {
				name: "頻度",
				detail: "年間の利息支払回数を指定します。"
			},
			basis: {
				name: "基準",
				detail: "計算に使用する基準日数を示す数値を指定します。"
			}
		}
	},
	COUPDAYS: {
		description: "受渡日を含む利払期間内の日数を返します。",
		abstract: "受渡日を含む利払期間内の日数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/coupdays-function"
		}],
		functionParameter: {
			settlement: {
				name: "受渡日",
				detail: "証券の受渡日を指定します。"
			},
			maturity: {
				name: "満期日",
				detail: "証券の満期日を指定します。"
			},
			frequency: {
				name: "頻度",
				detail: "年間の利息支払回数を指定します。"
			},
			basis: {
				name: "基準",
				detail: "計算に使用する基準日数を示す数値を指定します。"
			}
		}
	},
	COUPDAYSNC: {
		description: "受渡日から次の利払日までの日数を返します。",
		abstract: "受渡日から次の利払日までの日数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/coupdaysnc-function"
		}],
		functionParameter: {
			settlement: {
				name: "受渡日",
				detail: "証券の受渡日を指定します。"
			},
			maturity: {
				name: "満期日",
				detail: "証券の満期日を指定します。"
			},
			frequency: {
				name: "頻度",
				detail: "年間の利息支払回数を指定します。"
			},
			basis: {
				name: "基準",
				detail: "計算に使用する基準日数を示す数値を指定します。"
			}
		}
	},
	COUPNCD: {
		description: "受領日後の次の利息支払日を返します。",
		abstract: "受領日後の次の利息支払日を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/coupncd-function"
		}],
		functionParameter: {
			settlement: {
				name: "受渡日",
				detail: "証券の受渡日を指定します。"
			},
			maturity: {
				name: "満期日",
				detail: "証券の満期日を指定します。"
			},
			frequency: {
				name: "頻度",
				detail: "年間の利息支払回数を指定します。"
			},
			basis: {
				name: "基準",
				detail: "計算に使用する基準日数を示す数値を指定します。"
			}
		}
	},
	COUPNUM: {
		description: "受領日と満期日の間に利息が支払われる回数を返します。",
		abstract: "受領日と満期日の間に利息が支払われる回数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/coupnum-function"
		}],
		functionParameter: {
			settlement: {
				name: "受渡日",
				detail: "証券の受渡日を指定します。"
			},
			maturity: {
				name: "満期日",
				detail: "証券の満期日を指定します。"
			},
			frequency: {
				name: "頻度",
				detail: "年間の利息支払回数を指定します。"
			},
			basis: {
				name: "基準",
				detail: "計算に使用する基準日数を示す数値を指定します。"
			}
		}
	},
	COUPPCD: {
		description: "受領日の直前の利息支払日を返します。",
		abstract: "受領日の直前の利息支払日を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/couppcd-function"
		}],
		functionParameter: {
			settlement: {
				name: "受渡日",
				detail: "証券の受渡日を指定します。"
			},
			maturity: {
				name: "満期日",
				detail: "証券の満期日を指定します。"
			},
			frequency: {
				name: "頻度",
				detail: "年間の利息支払回数を指定します。"
			},
			basis: {
				name: "基準",
				detail: "計算に使用する基準日数を示す数値を指定します。"
			}
		}
	},
	CUMIPMT: {
		description: "指定した期間に、貸付金に対して支払われる利息の累計を返します。",
		abstract: "指定した期間に、貸付金に対して支払われる利息の累計を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/cumipmt-function"
		}],
		functionParameter: {
			rate: {
				name: "利率",
				detail: "貸付期間を通じて一定の利率を指定します。"
			},
			nper: {
				name: "期間内支払回数",
				detail: "貸付期間全体での支払回数の合計を指定します。"
			},
			pv: {
				name: "現在価値",
				detail: "現在の貸付額、つまり将来行われる一連の支払いを、現時点で一括支払いした場合の合計金額を指定します。"
			},
			startPeriod: {
				name: "開始期",
				detail: "計算の対象となる最初の期を指定します。 最初の期から順に、1 から始まる番号が割り当てられます。"
			},
			endPeriod: {
				name: "終了期",
				detail: "計算の対象となる最後の期を指定します。"
			},
			type: {
				name: "支払期日",
				detail: "支払いがいつ行われるかを、数値の 0 または 1 で指定します。"
			}
		}
	},
	CUMPRINC: {
		description: "指定した期間に、貸付金に対して支払われる元金の累計を返します。",
		abstract: "指定した期間に、貸付金に対して支払われる元金の累計を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/cumprinc-function"
		}],
		functionParameter: {
			rate: {
				name: "利率",
				detail: "貸付期間を通じて一定の利率を指定します。"
			},
			nper: {
				name: "期間内支払回数",
				detail: "貸付期間全体での支払回数の合計を指定します。"
			},
			pv: {
				name: "現在価値",
				detail: "現在の貸付額、つまり将来行われる一連の支払いを、現時点で一括支払いした場合の合計金額を指定します。"
			},
			startPeriod: {
				name: "開始期",
				detail: "計算の対象となる最初の期を指定します。 最初の期から順に、1 から始まる番号が割り当てられます。"
			},
			endPeriod: {
				name: "終了期",
				detail: "計算の対象となる最後の期を指定します。"
			},
			type: {
				name: "支払期日",
				detail: "支払いがいつ行われるかを、数値の 0 または 1 で指定します。"
			}
		}
	},
	DB: {
		description: "定率法 (Fixed-declining Balance Method) を使用して、特定の期における資産の減価償却費を返します。",
		abstract: "定率法 (Fixed-declining Balance Method) を使用して、特定の期における資産の減価償却費を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/db-function"
		}],
		functionParameter: {
			cost: {
				name: "取得価額",
				detail: "資産を購入した時点での価格を指定します。"
			},
			salvage: {
				name: "残存価額",
				detail: "耐用年数が終了した時点での資産の価格 (資産の救済価額) を指定します。"
			},
			life: {
				name: "耐用年数",
				detail: "資産を使用できる年数 (資産の寿命年数) を指定します。"
			},
			period: {
				name: "期間",
				detail: "減価償却費を計算する期間を指定します。"
			},
			month: {
				name: "月",
				detail: "資産を購入した期 (年度) の月数を指定します。 省略すると、12 を指定したと見なされます。"
			}
		}
	},
	DDB: {
		description: "倍額定率法 (Double-declining Balance Method) を使用して、特定の期における資産の減価償却費を返します。",
		abstract: "倍額定率法 (Double-declining Balance Method) を使用して、特定の期における資産の減価償却費を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/ddb-function"
		}],
		functionParameter: {
			cost: {
				name: "取得価額",
				detail: "資産を購入した時点での価格を指定します。"
			},
			salvage: {
				name: "残存価額",
				detail: "耐用年数が終了した時点での資産の価格 (資産の救済価額) を指定します。"
			},
			life: {
				name: "耐用年数",
				detail: "資産を使用できる年数 (資産の寿命年数) を指定します。"
			},
			period: {
				name: "期間",
				detail: "減価償却費を計算する期間を指定します。"
			},
			factor: {
				name: "率",
				detail: "減価償却率を指定します。率を省略すると、2 を指定したと見なされ、倍額定率法で計算が行われます。"
			}
		}
	},
	DISC: {
		description: "証券に対する割引率を返します。",
		abstract: "証券に対する割引率を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/disc-function"
		}],
		functionParameter: {
			settlement: {
				name: "受渡日",
				detail: "証券の受渡日を指定します。"
			},
			maturity: {
				name: "満期日",
				detail: "証券の満期日を指定します。"
			},
			pr: {
				name: "現在価値",
				detail: "額面 $100 に対する証券の価値を指定します。"
			},
			redemption: {
				name: "償還価額",
				detail: "額面 $100 に対する証券の償還額を指定します。"
			},
			basis: {
				name: "基準",
				detail: "計算に使用する基準日数を示す数値を指定します。"
			}
		}
	},
	DOLLARDE: {
		description: "分数で表されたドル単位の価格を、小数表示に変換します。",
		abstract: "分数で表されたドル単位の価格を、小数表示に変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/dollarde-function"
		}],
		functionParameter: {
			fractionalDollar: {
				name: "分数表現",
				detail: "整数部と小数部を小数点で区切って表現した数値です。"
			},
			fraction: {
				name: "分母",
				detail: "分数の分母となる整数を指定します。"
			}
		}
	},
	DOLLARFR: {
		description: "小数で表されたドル単位の価格を、分数表示に変換します。",
		abstract: "小数で表されたドル単位の価格を、分数表示に変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/dollarfr-function"
		}],
		functionParameter: {
			decimalDollar: {
				name: "小数値",
				detail: "小数で表された数値を指定します。"
			},
			fraction: {
				name: "分母",
				detail: "分数の分母となる整数を指定します。"
			}
		}
	},
	DURATION: {
		description: "定期的に利子が支払われる証券の年間のマコーレー デュレーションを返します。",
		abstract: "定期的に利子が支払われる証券の年間のマコーレー デュレーションを返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/duration-function"
		}],
		functionParameter: {
			settlement: {
				name: "受渡日",
				detail: "証券の受渡日を指定します。"
			},
			maturity: {
				name: "満期日",
				detail: "証券の満期日を指定します。"
			},
			coupon: {
				name: "年利率",
				detail: "証券の年利を指定します。"
			},
			yld: {
				name: "利回り",
				detail: "証券の年間配当を指定します。"
			},
			frequency: {
				name: "頻度",
				detail: "年間の利息支払回数を指定します。"
			},
			basis: {
				name: "基準",
				detail: "計算に使用する基準日数を示す数値を指定します。"
			}
		}
	},
	EFFECT: {
		description: "実効年利率を返します。",
		abstract: "実効年利率を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/effect-function"
		}],
		functionParameter: {
			nominalRate: {
				name: "名目利率",
				detail: "名目年利率を指定します。"
			},
			npery: {
				name: "複利計算回数",
				detail: "1 年あたりの複利計算回数を指定します。"
			}
		}
	},
	FV: {
		description: "財務関数 の 1 つである FV は、一定の利率を基に投資の将来価値を計算します。 定期支払い、定額支払い、一括支払いのいずれかに FV を使うことができます。",
		abstract: "財務関数 の 1 つである FV は、一定の利率を基に投資の将来価値を計算します。 定期支払い、定額支払い、一括支払いのいずれかに FV を使うことができます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/fv-function"
		}],
		functionParameter: {
			rate: {
				name: "利率",
				detail: "必須。 投資期間を通じて一定の利率を指定します。"
			},
			nper: {
				name: "期間内支払回数",
				detail: "必須。 投資期間全体での支払回数の合計を指定します。"
			},
			pmt: {
				name: "定期支払額",
				detail: "必須。 各期間に行われた支払い。それは年金の生活の中で変わることはできません。 通常、pmt には元金と利息が含まれますが、その他の手数料や税金は含まれていません。 pmt を省略する場合は、pv 引数を含める必要があります。"
			},
			pv: {
				name: "現在価値",
				detail: "オプション。 投資の現在価値、つまり将来行われる一連の支払いを、現時点で一括払いした場合の合計金額を指定します。 現在価値を省略した場合は 0 (ゼロ) を指定したと見なされ、定期支払額を指定する必要があります。"
			},
			type: {
				name: "支払期日",
				detail: "オプション。 いつ支払いが行われるかを、数値の 0 または 1 で指定します。 支払期日を省略すると、0 を指定したと見なされます。"
			}
		}
	},
	FVSCHEDULE: {
		description: "投資期間内の一連の金利を複利計算することにより、初期投資の元金の将来価値を返します。 FVSCHEDULE 関数を使用して、変動または調整可能な利率による投資の将来価値を計算します。",
		abstract: "投資期間内の一連の金利を複利計算することにより、初期投資の元金の将来価値を返します。 FVSCHEDULE 関数を使用して、変動または調整可能な利率による投資の将来価値を計算します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/fvschedule-function"
		}],
		functionParameter: {
			principal: {
				name: "元金",
				detail: "必須。 現在の貸付額、つまり将来行われる一連の支払いを、現時点で一括支払いした場合の合計金額を指定します。"
			},
			schedule: {
				name: "利率配列",
				detail: "必須。 投資期間内の変動金利を配列として指定します。"
			}
		}
	},
	INTRATE: {
		description: "全額投資された証券の利率を返します。",
		abstract: "全額投資された証券の利率を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/intrate-function"
		}],
		functionParameter: {
			settlement: {
				name: "受渡日",
				detail: "必須。 証券の受渡日を指定します。 受渡日とは、発行日以降に証券が買い手に引き渡される日付です。"
			},
			maturity: {
				name: "満期日",
				detail: "必須。 証券の満期日を指定します。 満期日とは、証券の支払期日です。"
			},
			investment: {
				name: "投資額",
				detail: "必須。 証券への投資額を指定します。"
			},
			redemption: {
				name: "償還価額",
				detail: "必須。 満期日における証券の償還額を指定します。"
			},
			basis: {
				name: "基準",
				detail: "オプション。 計算に使用する基準日数を示す数値を指定します。"
			}
		}
	},
	IPMT: {
		description: "投資期間内の指定された期に支払われる金利を返します。",
		abstract: "投資期間内の指定された期に支払われる金利を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/ipmt-function"
		}],
		functionParameter: {
			rate: {
				name: "利率",
				detail: "投資期間を通じて一定の利率を指定します。"
			},
			per: {
				name: "期",
				detail: "金利支払額を求める期を 1 ～ \"期間\" の範囲で指定します。"
			},
			nper: {
				name: "期間",
				detail: "投資期間全体での支払回数の合計を指定します。"
			},
			pv: {
				name: "現在価値",
				detail: "投資の現在価値、つまり将来行われる一連の支払いを、現時点で一括払いした場合の合計金額を指定します。"
			},
			fv: {
				name: "将来価値",
				detail: "投資の将来価値、つまり最後の支払いを行った後に残る現金の収支を指定します。"
			},
			type: {
				name: "支払期日",
				detail: "いつ支払いが行われるかを、数値の 0 または 1 で指定します。"
			}
		}
	},
	IRR: {
		description: "一連の定期的なキャッシュ フローに対する内部利益率を返します。",
		abstract: "一連の定期的なキャッシュ フローに対する内部利益率を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/irr-function"
		}],
		functionParameter: {
			values: {
				name: "キャッシュフロー",
				detail: "内部収益率を計算する数値を含む配列またはセルへの参照。\n1.内部利益率を計算するには、正の値と負の値が範囲に少なくとも 1 つずつ含まれている必要があります。\n2.IRR 関数では、値の順序がキャッシュ フローの順序であると見なされます。 支払額と収益額を入力する際は、その順序に注意してください。\n3.範囲に文字列、論理値、または空白セルが含まれる場合、これらは無視されます。"
			},
			guess: {
				name: "推測値",
				detail: "IRR 関数の計算結果に近いと思われる数値を指定します。"
			}
		}
	},
	ISPMT: {
		description: "投資期間内の指定された期に支払われる金利を返します。",
		abstract: "投資期間内の指定された期に支払われる金利を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/ispmt-function"
		}],
		functionParameter: {
			rate: {
				name: "利率",
				detail: "投資の利率を指定します。"
			},
			per: {
				name: "期",
				detail: "関心を見つける期間であり、1 から Nper の間である必要があります。"
			},
			nper: {
				name: "期間",
				detail: "投資期間全体での支払回数の合計を指定します。"
			},
			pv: {
				name: "現在価値",
				detail: "投資の現在価値を指定します。ローンの場合、Pv はローン金額です。"
			}
		}
	},
	MDURATION: {
		description: "額面価格を $100 と仮定して、証券に対する修正マコーレー デュレーションを返します。",
		abstract: "額面価格を $100 と仮定して、証券に対する修正マコーレー デュレーションを返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/mduration-function"
		}],
		functionParameter: {
			settlement: {
				name: "受渡日",
				detail: "証券の受渡日を指定します。"
			},
			maturity: {
				name: "満期日",
				detail: "証券の満期日を指定します。"
			},
			coupon: {
				name: "年利率",
				detail: "証券の年利を指定します。"
			},
			yld: {
				name: "利回り",
				detail: "証券の年間配当を指定します。"
			},
			frequency: {
				name: "頻度",
				detail: "年間の利息支払回数を指定します。"
			},
			basis: {
				name: "基準",
				detail: "計算に使用する基準日数を示す数値を指定します。"
			}
		}
	},
	MIRR: {
		description: "定期的に発生する一連の支払い (負の値) と収益 (正の値) に基づいて、修正内部利益率を返します。",
		abstract: "定期的に発生する一連の支払い (負の値) と収益 (正の値) に基づいて、修正内部利益率を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/mirr-function"
		}],
		functionParameter: {
			values: {
				name: "キャッシュフロー",
				detail: "数値を含む配列またはセル参照を指定します。 これらの数値は、定期的に発生する一連の支払い (負の値) とその収益 (正の値) を表しています。\n1.修正内部収益率を計算するには、正の値と負の値が範囲に少なくとも 1 つずつ含まれている必要があります。 そうでない場合は、エラー値 #DIV/0! が返されます。\n2.引数として指定した配列またはセル範囲に文字列、論理値、空白セルが含まれている場合、これらは無視されます。ただし、数値として 0 (ゼロ) を含むセルは計算の対象となります。"
			},
			financeRate: {
				name: "融資利率",
				detail: "支払額 (負のキャッシュ フロー) に対する利率を指定します。"
			},
			reinvestRate: {
				name: "再投資収益率",
				detail: "収益額 (正のキャッシュ フロー) に対する利率を指定します。"
			}
		}
	},
	NOMINAL: {
		description: "名目年利率を返します。",
		abstract: "名目年利率を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/nominal-function"
		}],
		functionParameter: {
			effectRate: {
				name: "実効利率",
				detail: "実効年利率を指定します。"
			},
			npery: {
				name: "複利計算回数",
				detail: "1 年あたりの複利計算回数を指定します。"
			}
		}
	},
	NPER: {
		description: "投資に必要な期間を返します。",
		abstract: "投資に必要な期間を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/nper-function"
		}],
		functionParameter: {
			rate: {
				name: "利率",
				detail: "投資期間を通じて一定の利率を指定します。"
			},
			pmt: {
				name: "定期支払額",
				detail: "各期間に行われた支払い。それは年金の生活の中で変わることはできません"
			},
			pv: {
				name: "現在価値",
				detail: "投資の現在価値、つまり将来行われる一連の支払いを、現時点で一括払いした場合の合計金額を指定します。"
			},
			fv: {
				name: "将来価値",
				detail: "投資の将来価値、つまり最後の支払いを行った後に残る現金の収支を指定します。"
			},
			type: {
				name: "支払期日",
				detail: "いつ支払いが行われるかを、数値の 0 または 1 で指定します。"
			}
		}
	},
	NPV: {
		description: "定期的に発生する一連の支払い (負の値) と収益 (正の値)、および割引率を指定して、投資の正味現在価値を算出します。",
		abstract: "定期的に発生する一連の支払い (負の値) と収益 (正の値)、および割引率を指定して、投資の正味現在価値を算出します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/npv-function"
		}],
		functionParameter: {
			rate: {
				name: "割引率",
				detail: "投資期間を通じて一定の利率を指定します。"
			},
			value1: {
				name: "キャッシュフロー1",
				detail: "支払いと収入を表す 1 から 254 の引数。"
			},
			value2: {
				name: "キャッシュフロー2",
				detail: "支払いと収入を表す 1 から 254 の引数。"
			}
		}
	},
	ODDFPRICE: {
		description: "1 期目の日数が半端な証券に対して、額面 $100 あたりの価格を返します。",
		abstract: "1 期目の日数が半端な証券に対して、額面 $100 あたりの価格を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/oddfprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "受渡日",
				detail: "証券の受渡日を指定します。"
			},
			maturity: {
				name: "満期日",
				detail: "証券の満期日を指定します。"
			},
			issue: {
				name: "発行日",
				detail: "証券の発行日を指定します。"
			},
			firstCoupon: {
				name: "初回利払日",
				detail: "証券の最初の利払日を指定します。"
			},
			rate: {
				name: "利率",
				detail: "証券の利率を指定します。"
			},
			yld: {
				name: "利回り",
				detail: "証券の年間配当を指定します。"
			},
			redemption: {
				name: "償還価額",
				detail: "額面 $100 に対する証券の償還額を指定します。"
			},
			frequency: {
				name: "頻度",
				detail: "年間の利息支払回数を指定します。 年 1 回の場合は頻度 = 1、年 2 回の場合は頻度 = 2、四半期ごとの場合は頻度 = 4 を指定します。"
			},
			basis: {
				name: "基準",
				detail: "計算に使用する基準日数を示す数値を指定します。"
			}
		}
	},
	ODDFYIELD: {
		description: "1 期目の日数が半端な証券の利回りを返します。",
		abstract: "1 期目の日数が半端な証券の利回りを返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/oddfyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "受渡日",
				detail: "証券の受渡日を指定します。"
			},
			maturity: {
				name: "満期日",
				detail: "証券の満期日を指定します。"
			},
			issue: {
				name: "発行日",
				detail: "証券の発行日を指定します。"
			},
			firstCoupon: {
				name: "初回利払日",
				detail: "証券の最初の利払日を指定します。"
			},
			rate: {
				name: "利率",
				detail: "証券の利率を指定します。"
			},
			pr: {
				name: "価格",
				detail: "証券の価格を指定します。"
			},
			redemption: {
				name: "償還価額",
				detail: "額面 $100 に対する証券の償還額を指定します。"
			},
			frequency: {
				name: "頻度",
				detail: "年間の利息支払回数を指定します。 年 1 回の場合は頻度 = 1、年 2 回の場合は頻度 = 2、四半期ごとの場合は頻度 = 4 を指定します。"
			},
			basis: {
				name: "基準",
				detail: "計算に使用する基準日数を示す数値を指定します。"
			}
		}
	},
	ODDLPRICE: {
		description: "最終期の日数が半端な証券に対して、額面 $100 あたりの価格を返します。",
		abstract: "最終期の日数が半端な証券に対して、額面 $100 あたりの価格を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/oddlprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "受渡日",
				detail: "証券の受渡日を指定します。"
			},
			maturity: {
				name: "満期日",
				detail: "証券の満期日を指定します。"
			},
			lastInterest: {
				name: "最終利払日",
				detail: "証券の最後の利払日を指定します。"
			},
			rate: {
				name: "利率",
				detail: "証券の利率を指定します。"
			},
			yld: {
				name: "利回り",
				detail: "証券の年間配当を指定します。"
			},
			redemption: {
				name: "償還価額",
				detail: "額面 $100 に対する証券の償還額を指定します。"
			},
			frequency: {
				name: "頻度",
				detail: "年間の利息支払回数を指定します。 年 1 回の場合は頻度 = 1、年 2 回の場合は頻度 = 2、四半期ごとの場合は頻度 = 4 を指定します。"
			},
			basis: {
				name: "基準",
				detail: "計算に使用する基準日数を示す数値を指定します。"
			}
		}
	},
	ODDLYIELD: {
		description: "最終期の日数が半端な証券の利回りを返します。",
		abstract: "最終期の日数が半端な証券の利回りを返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/oddlyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "受渡日",
				detail: "証券の受渡日を指定します。"
			},
			maturity: {
				name: "満期日",
				detail: "証券の満期日を指定します。"
			},
			lastInterest: {
				name: "最終利払日",
				detail: "証券の最後の利払日を指定します。"
			},
			rate: {
				name: "利率",
				detail: "証券の利率を指定します。"
			},
			pr: {
				name: "価格",
				detail: "証券の価格を指定します。"
			},
			redemption: {
				name: "償還価額",
				detail: "額面 $100 に対する証券の償還額を指定します。"
			},
			frequency: {
				name: "頻度",
				detail: "年間の利息支払回数を指定します。 年 1 回の場合は頻度 = 1、年 2 回の場合は頻度 = 2、四半期ごとの場合は頻度 = 4 を指定します。"
			},
			basis: {
				name: "基準",
				detail: "計算に使用する基準日数を示す数値を指定します。"
			}
		}
	},
	PDURATION: {
		description: "投資が指定した価値に達するまでの投資に必要な期間を返します。",
		abstract: "投資が指定した価値に達するまでの投資に必要な期間を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/pduration-function"
		}],
		functionParameter: {
			rate: {
				name: "利率",
				detail: "利率は投資の利率を指定します。"
			},
			pv: {
				name: "現在価値",
				detail: "投資の現在価値を指定します。"
			},
			fv: {
				name: "将来価値",
				detail: "投資の目標とする将来価値を指定します。"
			}
		}
	},
	PMT: {
		description: "定期支払額を算出します。",
		abstract: "定期支払額を算出します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/pmt-function"
		}],
		functionParameter: {
			rate: {
				name: "利率",
				detail: "投資期間を通じて一定の利率を指定します。"
			},
			nper: {
				name: "期間内支払回数",
				detail: "投資期間全体での支払回数の合計を指定します。"
			},
			pv: {
				name: "現在価値",
				detail: "投資の現在価値、つまり将来行われる一連の支払いを、現時点で一括払いした場合の合計金額を指定します。"
			},
			fv: {
				name: "将来価値",
				detail: "投資の将来価値、つまり最後の支払いを行った後に残る現金の収支を指定します。"
			},
			type: {
				name: "支払期日",
				detail: "いつ支払いが行われるかを、数値の 0 または 1 で指定します。"
			}
		}
	},
	PPMT: {
		description: "指定した期に支払われる元金を返します。",
		abstract: "指定した期に支払われる元金を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/ppmt-function"
		}],
		functionParameter: {
			rate: {
				name: "利率",
				detail: "投資期間を通じて一定の利率を指定します。"
			},
			per: {
				name: "期",
				detail: "金利支払額を求める期を 1 ～ \"期間\" の範囲で指定します。"
			},
			nper: {
				name: "期間",
				detail: "投資期間全体での支払回数の合計を指定します。"
			},
			pv: {
				name: "現在価値",
				detail: "投資の現在価値、つまり将来行われる一連の支払いを、現時点で一括払いした場合の合計金額を指定します。"
			},
			fv: {
				name: "将来価値",
				detail: "投資の将来価値、つまり最後の支払いを行った後に残る現金の収支を指定します。"
			},
			type: {
				name: "支払期日",
				detail: "いつ支払いが行われるかを、数値の 0 または 1 で指定します。"
			}
		}
	},
	PRICE: {
		description: "定期的に利息が支払われる証券に対して、額面 $100 あたりの価格を返します。",
		abstract: "定期的に利息が支払われる証券に対して、額面 $100 あたりの価格を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/price-function"
		}],
		functionParameter: {
			settlement: {
				name: "受渡日",
				detail: "証券の受渡日を指定します。"
			},
			maturity: {
				name: "満期日",
				detail: "証券の満期日を指定します。"
			},
			rate: {
				name: "利率",
				detail: "証券の利率を指定します。"
			},
			yld: {
				name: "利回り",
				detail: "証券の年間配当を指定します。"
			},
			redemption: {
				name: "償還価額",
				detail: "額面 $100 に対する証券の償還額を指定します。"
			},
			frequency: {
				name: "頻度",
				detail: "年間の利息支払回数を指定します。 年 1 回の場合は頻度 = 1、年 2 回の場合は頻度 = 2、四半期ごとの場合は頻度 = 4 を指定します。"
			},
			basis: {
				name: "基準",
				detail: "計算に使用する基準日数を示す数値を指定します。"
			}
		}
	},
	PRICEDISC: {
		description: "割引証券の額面 $100 あたりの価格を返します。",
		abstract: "割引証券の額面 $100 あたりの価格を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/pricedisc-function"
		}],
		functionParameter: {
			settlement: {
				name: "受渡日",
				detail: "証券の受渡日を指定します。"
			},
			maturity: {
				name: "満期日",
				detail: "証券の満期日を指定します。"
			},
			discount: {
				name: "割引率",
				detail: "証券の割引率を指定します。"
			},
			redemption: {
				name: "償還価額",
				detail: "額面 $100 に対する証券の償還額を指定します。"
			},
			basis: {
				name: "基準",
				detail: "計算に使用する基準日数を示す数値を指定します。"
			}
		}
	},
	PRICEMAT: {
		description: "満期日に利息が支払われる証券に対して、額面 $100 あたりの価格を返します。",
		abstract: "満期日に利息が支払われる証券に対して、額面 $100 あたりの価格を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/pricemat-function"
		}],
		functionParameter: {
			settlement: {
				name: "受渡日",
				detail: "証券の受渡日を指定します。"
			},
			maturity: {
				name: "満期日",
				detail: "証券の満期日を指定します。"
			},
			issue: {
				name: "発行日",
				detail: "証券の発行日を指定します。"
			},
			rate: {
				name: "利率",
				detail: "証券の利率を指定します。"
			},
			yld: {
				name: "利回り",
				detail: "証券の年間配当を指定します。"
			},
			basis: {
				name: "基準",
				detail: "計算に使用する基準日数を示す数値を指定します。"
			}
		}
	},
	PV: {
		description: "投資の現在価値を返します。",
		abstract: "投資の現在価値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/pv-function"
		}],
		functionParameter: {
			rate: {
				name: "利率",
				detail: "投資期間を通じて一定の利率を指定します。"
			},
			nper: {
				name: "期間内支払回数",
				detail: "投資期間全体での支払回数の合計を指定します。"
			},
			pmt: {
				name: "定期支払額",
				detail: "各期間に行われた支払い。それは年金の生活の中で変わることはできません"
			},
			fv: {
				name: "将来価値",
				detail: "投資の将来価値、つまり最後の支払いを行った後に残る現金の収支を指定します。"
			},
			type: {
				name: "支払期日",
				detail: "いつ支払いが行われるかを、数値の 0 または 1 で指定します。"
			}
		}
	},
	RATE: {
		description: "投資の利率を返します。",
		abstract: "投資の利率を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/rate-function"
		}],
		functionParameter: {
			nper: {
				name: "期間内支払回数",
				detail: "投資期間全体での支払回数の合計を指定します。"
			},
			pmt: {
				name: "定期支払額",
				detail: "各期間に行われた支払い。それは年金の生活の中で変わることはできません"
			},
			pv: {
				name: "現在価値",
				detail: "投資の現在価値、つまり将来行われる一連の支払いを、現時点で一括払いした場合の合計金額を指定します。"
			},
			fv: {
				name: "将来価値",
				detail: "投資の将来価値、つまり最後の支払いを行った後に残る現金の収支を指定します。"
			},
			type: {
				name: "支払期日",
				detail: "いつ支払いが行われるかを、数値の 0 または 1 で指定します。"
			},
			guess: {
				name: "推定値",
				detail: "利率がおよそどれくらいになるかを推定した値を指定します。"
			}
		}
	},
	RECEIVED: {
		description: "全額投資された証券に対して、満期日に支払われる金額を返します。",
		abstract: "全額投資された証券に対して、満期日に支払われる金額を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/received-function"
		}],
		functionParameter: {
			settlement: {
				name: "受渡日",
				detail: "証券の受渡日を指定します。"
			},
			maturity: {
				name: "満期日",
				detail: "証券の満期日を指定します。"
			},
			investment: {
				name: "投資額",
				detail: "証券への投資額を指定します。"
			},
			discount: {
				name: "割引率",
				detail: "証券の割引率を指定します。"
			},
			basis: {
				name: "基準",
				detail: "計算に使用する基準日数を示す数値を指定します。"
			}
		}
	},
	RRI: {
		description: "投資の成長に対する等価利率を返します。",
		abstract: "投資の成長に対する等価利率を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/rri-function"
		}],
		functionParameter: {
			nper: {
				name: "期間",
				detail: "投資期間の期間数を指定します。"
			},
			pv: {
				name: "現在価値",
				detail: "投資の現在価値を指定します。"
			},
			fv: {
				name: "将来価値",
				detail: "Fvは投資の将来価値です。"
			}
		}
	},
	SLN: {
		description: "定額法 (Straight-line Method) を使用して、資産の 1 期あたりの減価償却費を返します。",
		abstract: "定額法 (Straight-line Method) を使用して、資産の 1 期あたりの減価償却費を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/sln-function"
		}],
		functionParameter: {
			cost: {
				name: "取得価額",
				detail: "資産を購入した時点での価格を指定します。"
			},
			salvage: {
				name: "残存価額",
				detail: "耐用年数が終了した時点での資産の価格 (資産の救済価額) を指定します。"
			},
			life: {
				name: "耐用年数",
				detail: "資産を使用できる年数、つまり償却の対象となる資産の寿命年数を指定します。"
			}
		}
	},
	SYD: {
		description: "級数法 (Sum-of-Year's Digits Method) を使用して、特定の期における減価償却費を返します。",
		abstract: "級数法 (Sum-of-Year's Digits Method) を使用して、特定の期における減価償却費を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/syd-function"
		}],
		functionParameter: {
			cost: {
				name: "取得価額",
				detail: "資産を購入した時点での価格を指定します。"
			},
			salvage: {
				name: "残存価額",
				detail: "耐用年数が終了した時点での資産の価格 (資産の救済価額) を指定します。"
			},
			life: {
				name: "耐用年数",
				detail: "資産を使用できる年数、つまり償却の対象となる資産の寿命年数を指定します。"
			},
			per: {
				name: "期間",
				detail: "期間 と は、有効期間と同じ単位を使用する必要があります。"
			}
		}
	},
	TBILLEQ: {
		description: "米国財務省短期証券 (TB) の債券換算利回りを返します。",
		abstract: "米国財務省短期証券 (TB) の債券換算利回りを返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/tbilleq-function"
		}],
		functionParameter: {
			settlement: {
				name: "受渡日",
				detail: "財務省証券の受渡日を指定します。"
			},
			maturity: {
				name: "満期日",
				detail: "財務省証券の満期日を指定します。"
			},
			discount: {
				name: "割引率",
				detail: "財務省証券の割引率を指定します。"
			}
		}
	},
	TBILLPRICE: {
		description: "米国財務省短期証券 (TB) の額面 $100 あたりの価格を返します。",
		abstract: "米国財務省短期証券 (TB) の額面 $100 あたりの価格を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/tbillprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "受渡日",
				detail: "財務省証券の受渡日を指定します。"
			},
			maturity: {
				name: "満期日",
				detail: "財務省証券の満期日を指定します。"
			},
			discount: {
				name: "割引率",
				detail: "財務省証券の割引率を指定します。"
			}
		}
	},
	TBILLYIELD: {
		description: "米国財務省短期証券 (TB) の利回りを返します。",
		abstract: "米国財務省短期証券 (TB) の利回りを返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/tbillyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "受渡日",
				detail: "財務省証券の受渡日を指定します。"
			},
			maturity: {
				name: "満期日",
				detail: "財務省証券の満期日を指定します。"
			},
			pr: {
				name: "価値",
				detail: "額面 $100 に対する財務省証券の価値を指定します。"
			}
		}
	},
	VDB: {
		description: "倍額定率法または指定した方法を使用して、指定した期間における資産の減価償却費を返します。",
		abstract: "倍額定率法または指定した方法を使用して、指定した期間における資産の減価償却費を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/vdb-function"
		}],
		functionParameter: {
			cost: {
				name: "取得価額",
				detail: "資産を購入した時点での価格を指定します。"
			},
			salvage: {
				name: "残存価額",
				detail: "耐用年数が終了した時点での資産の価格 (資産の救済価額) を指定します。"
			},
			life: {
				name: "耐用年数",
				detail: "資産を使用できる年数 (資産の寿命年数) を指定します。"
			},
			startPeriod: {
				name: "開始期",
				detail: "減価償却費の計算の対象となる最初の期を指定します。"
			},
			endPeriod: {
				name: "終了期",
				detail: "減価償却費の計算の対象となる最後の期を指定します。"
			},
			factor: {
				name: "率",
				detail: "減価償却率を指定します。率を省略すると、2 を指定したと見なされ、倍額定率法で計算が行われます。"
			},
			noSwitch: {
				name: "切り替えなし",
				detail: "減価償却費が定率法による計算の結果より大きくなったときに、自動的に定額法に切り替えるかどうかを、論理値で指定します。"
			}
		}
	},
	XIRR: {
		description: "定期的でないキャッシュ フローに対する内部利益率を返します。",
		abstract: "定期的でないキャッシュ フローに対する内部利益率を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/xirr-function"
		}],
		functionParameter: {
			values: {
				name: "キャッシュフロー",
				detail: "収支明細表の日付に対応する一覧のキャッシュ フローを指定します。 最初の支払いは投資の最初に発生する原価や支払いに対応し、省略できます。 最初のキャッシュ フローが原価や支払いの場合、負の値を指定する必要があります。 それ以降の支払いは、1 年の日数を 365 日として割り引かれます。 値には、正の値と負の値が少なくとも 1 つずつ含まれている必要があります。"
			},
			dates: {
				name: "日付テーブル",
				detail: "キャッシュ フローに対応する一連の支払日を指定します。 指定順序は自由です。"
			},
			guess: {
				name: "推測値",
				detail: "XIRR 関数の計算結果に近いと思われる数値を指定します。"
			}
		}
	},
	XNPV: {
		description: "定期的でないキャッシュ フローに対する正味現在価値を返します。",
		abstract: "定期的でないキャッシュ フローに対する正味現在価値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/xnpv-function"
		}],
		functionParameter: {
			rate: {
				name: "割引率",
				detail: "対象となるキャッシュ フローに適用する割引率を指定します。"
			},
			values: {
				name: "キャッシュフロー",
				detail: "収支明細表の日付に対応する一覧のキャッシュ フローを指定します。 最初の支払いは投資の最初に発生する原価や支払いに対応し、省略できます。 最初のキャッシュ フローが原価や支払いの場合、負の値を指定する必要があります。 それ以降の支払いは、1 年の日数を 365 日として割り引かれます。 値には、正の値と負の値が少なくとも 1 つずつ含まれている必要があります。"
			},
			dates: {
				name: "日付テーブル",
				detail: "キャッシュ フローに対応する一連の支払日を指定します。 指定順序は自由です。"
			}
		}
	},
	YIELD: {
		description: "利息が定期的に支払われる証券の利回りを返します。",
		abstract: "利息が定期的に支払われる証券の利回りを返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/yield-function"
		}],
		functionParameter: {
			settlement: {
				name: "受渡日",
				detail: "証券の受渡日を指定します。"
			},
			maturity: {
				name: "満期日",
				detail: "証券の満期日を指定します。"
			},
			rate: {
				name: "利率",
				detail: "証券の利率を指定します。"
			},
			pr: {
				name: "価格",
				detail: "額面 $100 に対する証券の価値を指定します。"
			},
			redemption: {
				name: "償還価額",
				detail: "額面 $100 に対する証券の償還額を指定します。"
			},
			frequency: {
				name: "頻度",
				detail: "年間の利息支払回数を指定します。 年 1 回の場合は頻度 = 1、年 2 回の場合は頻度 = 2、四半期ごとの場合は頻度 = 4 を指定します。"
			},
			basis: {
				name: "基準",
				detail: "計算に使用する基準日数を示す数値を指定します。"
			}
		}
	},
	YIELDDISC: {
		description: "米国財務省短期証券 (TB) などの割引債の年利回りを返します。",
		abstract: "米国財務省短期証券 (TB) などの割引債の年利回りを返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/yielddisc-function"
		}],
		functionParameter: {
			settlement: {
				name: "受渡日",
				detail: "証券の受渡日を指定します。"
			},
			maturity: {
				name: "満期日",
				detail: "証券の満期日を指定します。"
			},
			pr: {
				name: "価格",
				detail: "額面 $100 に対する証券の価値を指定します。"
			},
			redemption: {
				name: "償還価額",
				detail: "額面 $100 に対する証券の償還額を指定します。"
			},
			basis: {
				name: "基準",
				detail: "計算に使用する基準日数を示す数値を指定します。"
			}
		}
	},
	YIELDMAT: {
		description: "満期日に利息が支払われる証券の利回りを返します。",
		abstract: "満期日に利息が支払われる証券の利回りを返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/yieldmat-function"
		}],
		functionParameter: {
			settlement: {
				name: "受渡日",
				detail: "証券の受渡日を指定します。"
			},
			maturity: {
				name: "満期日",
				detail: "証券の満期日を指定します。"
			},
			issue: {
				name: "発行日",
				detail: "証券の発行日を指定します。"
			},
			rate: {
				name: "利率",
				detail: "証券の利率を指定します。"
			},
			pr: {
				name: "価格",
				detail: "額面 $100 に対する証券の価値を指定します。"
			},
			basis: {
				name: "基準",
				detail: "計算に使用する基準日数を示す数値を指定します。"
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/information/ja-JP.ts
const locale$8 = {
	CELL: {
		description: "セルの書式、位置、内容についての情報を返します。",
		abstract: "セルの書式、位置、内容についての情報を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/cell-function"
		}],
		functionParameter: {
			infoType: {
				name: "検査の種類",
				detail: "返すセル情報の種類を指定するテキスト値。"
			},
			reference: {
				name: "範囲",
				detail: "情報が必要なセルを指定します。"
			}
		}
	},
	ERROR_TYPE: {
		description: "エラーの種類に対応する数値を返します。",
		abstract: "エラーの種類に対応する数値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/error-type-function"
		}],
		functionParameter: { errorVal: {
			name: "エラー値",
			detail: "評価するエラー値を指定します。"
		} }
	},
	INFO: {
		description: "現在の操作環境についての情報を返します。",
		abstract: "現在の操作環境についての情報を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/info-function"
		}],
		functionParameter: { typeText: {
			name: "検査の種類",
			detail: "返す情報の種類を指定する文字列です。"
		} }
	},
	ISBETWEEN: {
		description: "指定した値が他の 2 つの値の範囲内にあるかどうかを確認します（両端の値を含むかどうかを選択可能）。",
		abstract: "指定した値が他の 2 つの値の範囲内にあるかどうかを確認します（両端の値を含むかどうかを選択可能）。",
		links: [{
			title: "指導",
			url: "https://support.google.com/docs/answer/10538337?hl=ja"
		}],
		functionParameter: {
			valueToCompare: {
				name: "比較する値",
				detail: "'最小値' と '最大値' の範囲内にあるかどうかを確認する値です。"
			},
			lowerValue: {
				name: "最小値",
				detail: "’比較する値' が含まれる可能性のある値の範囲の下限を指定します。"
			},
			upperValue: {
				name: "最大値",
				detail: "’比較する値' が含まれる可能性のある値の範囲の上限を指定します。"
			},
			lowerValueIsInclusive: {
				name: "最小値を含む",
				detail: "値の範囲に '最小値' を含めるかどうかを指定します（デフォルトは TRUE）。"
			},
			upperValueIsInclusive: {
				name: "最大値を含む",
				detail: "値の範囲に '最大値' を含めるかどうかを指定します（デフォルトは TRUE）。"
			}
		}
	},
	ISBLANK: {
		description: "これらの各関数は、まとめて IS 関数と呼ばれ、指定された値をチェックして、その結果に従って TRUE または FALSE を返します。 たとえば、 ISBLANK 関数は、引数値が空白セルへの参照の場合に論理値 TRUE を返し、それ以外の場合に FALSE を返します。",
		abstract: "これらの各関数は、まとめて IS 関数と呼ばれ、指定された値をチェックして、その結果に従って TRUE または FALSE を返します。 たとえば、 ISBLANK 関数は、引数値が空白セルへの参照の場合に論理値 TRUE を返し、それ以外の場合に FALSE を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "値",
			detail: "必須。 テストする値を指定します。 テストの対象引数には、空白セル、エラー、論理値、文字列、数値、参照値、または対象となるデータを参照する名前を指定することができます。"
		} }
	},
	ISDATE: {
		description: "ISDATE 関数は、値が日付かどうかを返します。",
		abstract: "ISDATE 関数は、値が日付かどうかを返します。",
		links: [{
			title: "指導",
			url: "https://support.google.com/docs/answer/9061381?hl=ja"
		}],
		functionParameter: { value: {
			name: "値",
			detail: "日付であるかを検証する値です。"
		} }
	},
	ISEMAIL: {
		description: "値が有効なメールアドレスかどうかを確認するには、ISEMAIL 関数を使用します。この関数は、値が一般的に受け入れられているメールアドレスの形式に準拠しているかどうかを確認しますが、実在するメールアドレスかどうかは検証しません。",
		abstract: "値が有効なメールアドレスかどうかを確認するには、ISEMAIL 関数を使用します。この関数は、値が一般的に受け入れられているメールアドレスの形式に準拠しているかどうかを確認しますが、実在するメールアドレスかどうかは検証しません。",
		links: [{
			title: "指導",
			url: "https://support.google.com/docs/answer/3256503?hl=ja"
		}],
		functionParameter: { value: {
			name: "値",
			detail: "ISEMAIL(\"johndoe@yourname.com\")"
		} }
	},
	ISERR: {
		description: "これらの各関数は、まとめて IS 関数と呼ばれ、指定された値をチェックして、その結果に従って TRUE または FALSE を返します。 たとえば、 ISBLANK 関数は、引数値が空白セルへの参照の場合に論理値 TRUE を返し、それ以外の場合に FALSE を返します。",
		abstract: "これらの各関数は、まとめて IS 関数と呼ばれ、指定された値をチェックして、その結果に従って TRUE または FALSE を返します。 たとえば、 ISBLANK 関数は、引数値が空白セルへの参照の場合に論理値 TRUE を返し、それ以外の場合に FALSE を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "値",
			detail: "必須。 テストする値を指定します。 テストの対象引数には、空白セル、エラー、論理値、文字列、数値、参照値、または対象となるデータを参照する名前を指定することができます。"
		} }
	},
	ISERROR: {
		description: "これらの各関数は、まとめて IS 関数と呼ばれ、指定された値をチェックして、その結果に従って TRUE または FALSE を返します。 たとえば、 ISBLANK 関数は、引数値が空白セルへの参照の場合に論理値 TRUE を返し、それ以外の場合に FALSE を返します。",
		abstract: "これらの各関数は、まとめて IS 関数と呼ばれ、指定された値をチェックして、その結果に従って TRUE または FALSE を返します。 たとえば、 ISBLANK 関数は、引数値が空白セルへの参照の場合に論理値 TRUE を返し、それ以外の場合に FALSE を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "値",
			detail: "必須。 テストする値を指定します。 テストの対象引数には、空白セル、エラー、論理値、文字列、数値、参照値、または対象となるデータを参照する名前を指定することができます。"
		} }
	},
	ISEVEN: {
		description: "数値が偶数のときに TRUE を返します。",
		abstract: "数値が偶数のときに TRUE を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/iseven-function"
		}],
		functionParameter: { value: {
			name: "値",
			detail: "検定する値を指定します。数値が整数でない場合は、小数点以下が切り捨てられます。"
		} }
	},
	ISFORMULA: {
		description: "数式が含まれるセルへの参照がある場合に TRUE を返します。",
		abstract: "数式が含まれるセルへの参照がある場合に TRUE を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/isformula-function"
		}],
		functionParameter: { reference: {
			name: "範囲",
			detail: "参照とは、テストするセルへの参照のことです。"
		} }
	},
	ISLOGICAL: {
		description: "これらの各関数は、まとめて IS 関数と呼ばれ、指定された値をチェックして、その結果に従って TRUE または FALSE を返します。 たとえば、 ISBLANK 関数は、引数値が空白セルへの参照の場合に論理値 TRUE を返し、それ以外の場合に FALSE を返します。",
		abstract: "これらの各関数は、まとめて IS 関数と呼ばれ、指定された値をチェックして、その結果に従って TRUE または FALSE を返します。 たとえば、 ISBLANK 関数は、引数値が空白セルへの参照の場合に論理値 TRUE を返し、それ以外の場合に FALSE を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "値",
			detail: "必須。 テストする値を指定します。 テストの対象引数には、空白セル、エラー、論理値、文字列、数値、参照値、または対象となるデータを参照する名前を指定することができます。"
		} }
	},
	ISNA: {
		description: "これらの各関数は、まとめて IS 関数と呼ばれ、指定された値をチェックして、その結果に従って TRUE または FALSE を返します。 たとえば、 ISBLANK 関数は、引数値が空白セルへの参照の場合に論理値 TRUE を返し、それ以外の場合に FALSE を返します。",
		abstract: "これらの各関数は、まとめて IS 関数と呼ばれ、指定された値をチェックして、その結果に従って TRUE または FALSE を返します。 たとえば、 ISBLANK 関数は、引数値が空白セルへの参照の場合に論理値 TRUE を返し、それ以外の場合に FALSE を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "値",
			detail: "必須。 テストする値を指定します。 テストの対象引数には、空白セル、エラー、論理値、文字列、数値、参照値、または対象となるデータを参照する名前を指定することができます。"
		} }
	},
	ISNONTEXT: {
		description: "これらの各関数は、まとめて IS 関数と呼ばれ、指定された値をチェックして、その結果に従って TRUE または FALSE を返します。 たとえば、 ISBLANK 関数は、引数値が空白セルへの参照の場合に論理値 TRUE を返し、それ以外の場合に FALSE を返します。",
		abstract: "これらの各関数は、まとめて IS 関数と呼ばれ、指定された値をチェックして、その結果に従って TRUE または FALSE を返します。 たとえば、 ISBLANK 関数は、引数値が空白セルへの参照の場合に論理値 TRUE を返し、それ以外の場合に FALSE を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "値",
			detail: "必須。 テストする値を指定します。 テストの対象引数には、空白セル、エラー、論理値、文字列、数値、参照値、または対象となるデータを参照する名前を指定することができます。"
		} }
	},
	ISNUMBER: {
		description: "これらの各関数は、まとめて IS 関数と呼ばれ、指定された値をチェックして、その結果に従って TRUE または FALSE を返します。 たとえば、 ISBLANK 関数は、引数値が空白セルへの参照の場合に論理値 TRUE を返し、それ以外の場合に FALSE を返します。",
		abstract: "これらの各関数は、まとめて IS 関数と呼ばれ、指定された値をチェックして、その結果に従って TRUE または FALSE を返します。 たとえば、 ISBLANK 関数は、引数値が空白セルへの参照の場合に論理値 TRUE を返し、それ以外の場合に FALSE を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "値",
			detail: "必須。 テストする値を指定します。 テストの対象引数には、空白セル、エラー、論理値、文字列、数値、参照値、または対象となるデータを参照する名前を指定することができます。"
		} }
	},
	ISODD: {
		description: "数値が奇数のときに TRUE を返します。",
		abstract: "数値が奇数のときに TRUE を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/isodd-function"
		}],
		functionParameter: { value: {
			name: "値",
			detail: "検定する値を指定します。数値が整数でない場合は、小数点以下が切り捨てられます。"
		} }
	},
	ISOMITTED: {
		description: "LAMBDA の値が見つからないかどうかを確認し、TRUE または FALSE を返します",
		abstract: "LAMBDA の値が見つからないかどうかを確認し、TRUE または FALSE を返します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/isomitted-function"
		}],
		functionParameter: { argument: {
			name: "引数",
			detail: "LAMBDA のパラメーターなど、引数が省略されているかどうかを検査する値です。"
		} }
	},
	ISREF: {
		description: "これらの各関数は、まとめて IS 関数と呼ばれ、指定された値をチェックして、その結果に従って TRUE または FALSE を返します。 たとえば、 ISBLANK 関数は、引数値が空白セルへの参照の場合に論理値 TRUE を返し、それ以外の場合に FALSE を返します。",
		abstract: "これらの各関数は、まとめて IS 関数と呼ばれ、指定された値をチェックして、その結果に従って TRUE または FALSE を返します。 たとえば、 ISBLANK 関数は、引数値が空白セルへの参照の場合に論理値 TRUE を返し、それ以外の場合に FALSE を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "値",
			detail: "必須。 テストする値を指定します。 テストの対象引数には、空白セル、エラー、論理値、文字列、数値、参照値、または対象となるデータを参照する名前を指定することができます。"
		} }
	},
	ISTEXT: {
		description: "これらの各関数は、まとめて IS 関数と呼ばれ、指定された値をチェックして、その結果に従って TRUE または FALSE を返します。 たとえば、 ISBLANK 関数は、引数値が空白セルへの参照の場合に論理値 TRUE を返し、それ以外の場合に FALSE を返します。",
		abstract: "これらの各関数は、まとめて IS 関数と呼ばれ、指定された値をチェックして、その結果に従って TRUE または FALSE を返します。 たとえば、 ISBLANK 関数は、引数値が空白セルへの参照の場合に論理値 TRUE を返し、それ以外の場合に FALSE を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "値",
			detail: "必須。 テストする値を指定します。 テストの対象引数には、空白セル、エラー、論理値、文字列、数値、参照値、または対象となるデータを参照する名前を指定することができます。"
		} }
	},
	ISURL: {
		description: "値が有効な URL であるかどうかを検証します。",
		abstract: "値が有効な URL であるかどうかを検証します。",
		links: [{
			title: "指導",
			url: "https://support.google.com/docs/answer/3256501?hl=ja"
		}],
		functionParameter: { value: {
			name: "値",
			detail: "ISURL(\"www.google.com\")"
		} }
	},
	N: {
		description: "値を数値に変換します。",
		abstract: "値を数値に変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/n-function"
		}],
		functionParameter: { value: {
			name: "値",
			detail: "変換する値を指定します。"
		} }
	},
	NA: {
		description: "エラー値 #N/A を返します。",
		abstract: "エラー値 #N/A を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/na-function"
		}],
		functionParameter: {}
	},
	SHEET: {
		description: "参照されるシートのシート番号を返します。",
		abstract: "参照されるシートのシート番号を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/sheet-function"
		}],
		functionParameter: { value: {
			name: "値",
			detail: "シート番号を求めるシートまたは参照の名前を指定します。 値を省略すると、この関数を含むシートの番号が返されます。"
		} }
	},
	SHEETS: {
		description: "ワークブック内のシート数を返します",
		abstract: "ワークブック内のシート数を返します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/sheets-function"
		}],
		functionParameter: {}
	},
	TYPE: {
		description: "データ型を表す数値を返します。",
		abstract: "データ型を表す数値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/type-function"
		}],
		functionParameter: { value: {
			name: "値",
			detail: "数値、文字列、論理値など、の任意の値を指定です。"
		} }
	}
};

//#endregion
//#region src/locale/function-list/logical/ja-JP.ts
const locale$7 = {
	AND: {
		description: "すべての引数が TRUE のときに TRUE を返します。",
		abstract: "すべての引数が TRUE のときに TRUE を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/and-function"
		}],
		functionParameter: {
			logical1: {
				name: "論理式 1",
				detail: "TRUE または FALSE に評価できるテスト対象の 1 つ目の条件。"
			},
			logical2: {
				name: "論理式 2",
				detail: " 最大 255 個の条件まで、TRUE または FALSE のいずれかに評価できるテストする追加の条件。"
			}
		}
	},
	BYCOL: {
		description: "各列に LAMBDA を適用し、結果の配列を返します",
		abstract: "各列に LAMBDA を適用し、結果の配列を返します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/bycol-function"
		}],
		functionParameter: {
			array: {
				name: "配列",
				detail: "列で区切られる配列。"
			},
			lambda: {
				name: "lambda",
				detail: "列を 1 つのパラメーターとして受け取り、1 つの結果を計算する LAMBDA。LAMBDA は以下のシングル パラメーターを取ります: 配列からの列。"
			}
		}
	},
	BYROW: {
		description: "各行に LAMBDA を適用し、結果の配列を返します",
		abstract: "各行に LAMBDA を適用し、結果の配列を返します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/byrow-function"
		}],
		functionParameter: {
			array: {
				name: "配列",
				detail: "行で区切られる配列。"
			},
			lambda: {
				name: "lambda",
				detail: "行を 1 つのパラメーターとして受け取り、1 つの結果を計算する LAMBDA。 LAMBDA は以下のシングル パラメーターを取ります: 配列からの行。"
			}
		}
	},
	FALSE: {
		description: "論理値 FALSE を返します。",
		abstract: "論理値 FALSE を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/false-function"
		}],
		functionParameter: {}
	},
	IF: {
		description: "値または数式が条件を満たしているかどうかを判定します。",
		abstract: "値または数式が条件を満たしているかどうかを判定します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/if-function"
		}],
		functionParameter: {
			logicalTest: {
				name: "論理式",
				detail: "テストする条件"
			},
			valueIfTrue: {
				name: "値が真の場合",
				detail: "logical_test の結果が TRUE の場合に返す値"
			},
			valueIfFalse: {
				name: "値が偽の場合",
				detail: "logical_test の結果が FALSE の場合に返す値"
			}
		}
	},
	IFERROR: {
		description: "数式の結果がエラーの場合は指定した値を返し、それ以外の場合は数式の結果を返します。",
		abstract: "数式の結果がエラーの場合は指定した値を返し、それ以外の場合は数式の結果を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/iferror-function"
		}],
		functionParameter: {
			value: {
				name: "値",
				detail: "エラーかどうかをチェックする引数です。"
			},
			valueIfError: {
				name: "エラー時の戻り値",
				detail: "数式がエラー値と評価された場合に返す値を指定します。 次のエラーの種類はが評価されます: #N/A、#VALUE!、#REF!、#DIV/0!、#NUM!、#NAME?、#NULL!。"
			}
		}
	},
	IFNA: {
		description: "式の結果が #N/A になる場合に指定した値を返し、それ以外の場合は式の結果を返します",
		abstract: "式の結果が #N/A になる場合に指定した値を返し、それ以外の場合は式の結果を返します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/ifna-function"
		}],
		functionParameter: {
			value: {
				name: "値",
				detail: "エラー値 #N/A があるかどうかを確認する引数。"
			},
			valueIfNa: {
				name: "値_if_na",
				detail: "式が #N/A エラー値と評価された場合に返される値。"
			}
		}
	},
	IFS: {
		description: "1 つ以上の条件が満たされているかどうかを確認し、最初の TRUE 条件に対応する値を返します。",
		abstract: "1 つ以上の条件が満たされているかどうかを確認し、最初の TRUE 条件に対応する値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/ifs-function"
		}],
		functionParameter: {
			logicalTest1: {
				name: "論理1",
				detail: "評価される最初の条件。ブール値、数値、配列、またはこれらの値のいずれかへの参照を指定できます。"
			},
			valueIfTrue1: {
				name: "値1",
				detail: "“条件1”が“TRUE”の場合に返される値。"
			},
			logicalTest2: {
				name: "論理2",
				detail: "前の条件の前に評価される他の条件は FALSE です。"
			},
			valueIfTrue2: {
				name: "値2",
				detail: "対応する条件が“TRUE”の場合に返される追加の値。"
			}
		}
	},
	LAMBDA: {
		description: "LAMBDA 関数を使用して、再利用可能なカスタム関数を作成し、フレンドリ名で呼び出します。 新しい関数はブック全体で使用でき、ネイティブ Excel 関数と同様に呼び出されます。",
		abstract: "カスタムで再利用可能な関数を作成し、フレンドリ名で呼び出す",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/lambda-function"
		}],
		functionParameter: {
			parameter: {
				name: "パラメーター",
				detail: "セル参照、文字列、数値などの関数に渡す値。 最大 253 個のパラメーターを入力できます。 この引数は省略可能です。"
			},
			calculation: {
				name: "計算",
				detail: "関数の結果として実行して返す数式。 最後の引数である必要性があり、結果を返す必要があります。 この引数は必須です。"
			}
		}
	},
	LET: {
		description: "計算結果に名前を割り当てます",
		abstract: "計算結果に名前を割り当てます",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/let-function"
		}],
		functionParameter: {
			name1: {
				name: "名前1",
				detail: "最初に割り当てる名前。文字で始まる必要があります。数式の出力であったり、範囲の構文と競合していたりしてはなりません。"
			},
			nameValue1: {
				name: "値1",
				detail: "name1 に割り当てられている値。"
			},
			calculationOrName2: {
				name: "計算または名前2",
				detail: "以下のいずれかになります。\n1.LET 関数内のすべての名前を使用する計算。LET 関数の最後の引数でなければなりません。\n2.2 番目の name_value に割り当てる 2 番目の名前。名前が指定されている場合、name_value2 と calculation_or_name3 が必須です。"
			},
			nameValue2: {
				name: "値2",
				detail: "calculation_or_name2 に割り当てられている値。"
			},
			calculationOrName3: {
				name: "計算または名前3",
				detail: "以下のいずれかになります。\n1.LET 関数内のすべての名前を使用する計算。LET 関数の最後の引数は計算でなければなりません。\n2.3 番目の name_value に割り当てる 3 番目の名前。名前が指定されている場合、name_value3 と calculation_or_name4 が必須です。"
			}
		}
	},
	MAKEARRAY: {
		description: "LAMBDA を適用して、指定した行と列のサイズの計算された配列を返します",
		abstract: "LAMBDA を適用して、指定した行と列のサイズの計算された配列を返します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/makearray-function"
		}],
		functionParameter: {
			number1: {
				name: "行",
				detail: "配列内の行数。 ゼロより大きい値にする必要があります。"
			},
			number2: {
				name: "列",
				detail: "配列内の列数。 ゼロより大きい値にする必要があります。"
			},
			value3: {
				name: "lambda",
				detail: "配列を作成するために呼び出される LAMBDA。 LAMBDA は 2 つのパラメーターを取ります: 行 (配列の行インデックス), 列 (配列の列インデックス)"
			}
		}
	},
	MAP: {
		description: "LAMBDA を適用して新しい値を作成することにより、配列内の各値を新しい値にマッピングして形成された配列を返します。",
		abstract: "LAMBDA を適用して新しい値を作成することにより、配列内の各値を新しい値にマッピングして形成された配列を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/map-function"
		}],
		functionParameter: {
			array1: {
				name: "配列1",
				detail: "マップする配列1。"
			},
			array2: {
				name: "配列2",
				detail: "マップする配列2。"
			},
			lambda: {
				name: "lambda",
				detail: "LAMBDAは最後の引数でなければならず、渡される配列ごとにパラメータを持つ必要があります。"
			}
		}
	},
	NOT: {
		description: "引数の論理を反転します。",
		abstract: "引数の論理を反転します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/not-function"
		}],
		functionParameter: { logical: {
			name: "論理式",
			detail: "論理を反転する条件。TRUE または FALSE に評価されます。"
		} }
	},
	OR: {
		description: "OR 関数は、いずれかの引数が TRUE と評価された場合は TRUE を返し、すべての引数が FALSE と評価された場合は FALSE を返します。",
		abstract: "いずれかの引数が TRUE のときに TRUE を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/or-function"
		}],
		functionParameter: {
			logical1: {
				name: "論理式 1",
				detail: "TRUE または FALSE に評価できるテスト対象の 1 つ目の条件。"
			},
			logical2: {
				name: "論理式 2",
				detail: "最大 255 個の条件まで、TRUE または FALSE のいずれかに評価できるテストする追加の条件。"
			}
		}
	},
	REDUCE: {
		description: "各値に LAMBDA を適用し、アキュムレータの合計値を返すことで、配列を累積値に減らします。",
		abstract: "各値に LAMBDA を適用し、アキュムレータの合計値を返すことで、配列を累積値に減らします。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/reduce-function"
		}],
		functionParameter: {
			initialValue: {
				name: "開始値",
				detail: "アキュムレーターの開始値を設定します。"
			},
			array: {
				name: "配列",
				detail: "減らす配列。"
			},
			lambda: {
				name: "lambda",
				detail: "配列を減らすために呼び出される LAMBDA。 LAMBDA は、次の 3 つのパラメーターを受け取ります。1.値が合計され、最終結果として返されました。2.配列の現在の値。3.配列内の各要素に適用される計算。"
			}
		}
	},
	SCAN: {
		description: "各値に LAMBDA を適用して配列をスキャンし、各中間値を持つ配列を返します",
		abstract: "各値に LAMBDA を適用して配列をスキャンし、各中間値を持つ配列を返します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/scan-function"
		}],
		functionParameter: {
			initialValue: {
				name: "開始値",
				detail: "アキュムレーターの開始値を設定します。"
			},
			array: {
				name: "配列",
				detail: "スキャンする配列。"
			},
			lambda: {
				name: "lambda",
				detail: "配列をスキャンする呼び出される LAMBDA。 LAMBDA は、次の 3 つのパラメーターを受け取ります。1.値が合計され、最終結果として返されました。2.配列の現在の値。3.配列内の各要素に適用される計算。"
			}
		}
	},
	SWITCH: {
		description: "式を値のリストと比較し、最初に一致する値に対応する結果を返します。一致する値がない場合は、オプションで既定値が返される場合があります。",
		abstract: "式を値のリストと比較し、最初に一致する値に対応する結果を返します。一致する値がない場合は、オプションで既定値が返される場合があります。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/switch-function"
		}],
		functionParameter: {
			expression: {
				name: "式",
				detail: "式は、値1...値126 と比較される値です（数値、日付、テキストなど）。"
			},
			value1: {
				name: "値1",
				detail: "値N は式と比較される値です。"
			},
			result1: {
				name: "結果1",
				detail: "結果N は対応する値N 引数が式と一致した場合に返される値です。結果N は対応する値N 引数ごとに提供する必要があります。"
			},
			defaultOrValue2: {
				name: "デフォルトまたは値2",
				detail: "既定は、値N 式で一致するものが見つからなかった場合に返される値です。既定の引数は、対応する結果N 式がないことで識別されます（例を参照）。既定は関数の最後の引数でなければなりません。"
			},
			result2: {
				name: "結果2",
				detail: "結果N は対応する値N 引数が式と一致した場合に返される値です。結果N は対応する値N 引数ごとに提供する必要があります。"
			}
		}
	},
	TRUE: {
		description: "論理値 TRUE を返します。",
		abstract: "論理値 TRUE を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/true-function"
		}],
		functionParameter: {}
	},
	XOR: {
		description: "引数のうち奇数個の条件が TRUE の場合に TRUE を返し、偶数個の条件が TRUE の場合に FALSE を返します。",
		abstract: "引数のうち奇数個の条件が TRUE の場合に TRUE を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/xor-function"
		}],
		functionParameter: {
			logical1: {
				name: "論理式 1",
				detail: "TRUE または FALSE に評価できるテスト対象の 1 つ目の条件。"
			},
			logical2: {
				name: "論理式 2",
				detail: "最大 255 個の条件まで、TRUE または FALSE のいずれかに評価できるテストする追加の条件。"
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/lookup/ja-JP.ts
const locale$6 = {
	ADDRESS: {
		description: "ADDRESS 関数を使うと、行番号と列番号を指定して、ワークシート内のセルのアドレスを取得できます。 たとえば、ADDRESS(2,3) は $C$2 を返します。 また、ADDRESS(77,300) は $KN$77 を返します。 ROW 関数や COLUMN 関数などの他の関数を使って、ADDRESS 関数の行番号と列番号の引数を指定できます。",
		abstract: "ワークシート上のセル参照を文字列として返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/address-function"
		}],
		functionParameter: {
			row_num: {
				name: "行番号",
				detail: "セル参照に使用する行番号を指定する数値。"
			},
			column_num: {
				name: "列番号",
				detail: "セル参照に使用する列番号を指定する数値。"
			},
			abs_num: {
				name: "参照の型",
				detail: "返される参照の種類を指定する数値。"
			},
			a1: {
				name: "参照形式",
				detail: "A1 または R1C1 参照スタイルを指定する論理値。 A1 スタイルでは、列はアルファベット順にラベル付けされ、行は数値でラベル付けされます。 R1C1 参照スタイルでは、列と行の両方に数値ラベルが付けされます。 A1 引数が TRUE または省略された場合 、ADDRESS 関数は A1 スタイルの参照を返します。FALSE の場合 、ADDRESS 関数 は R1C1 スタイルの参照を返します。"
			},
			sheet_text: {
				name: "ワークシート名",
				detail: "外部参照として使用するワークシートの名前を指定するテキスト値。 たとえば、数式 =ADDRESS(1,1,,,\"Sheet2\") は Sheet2!$A $1 を返します。 sheet_text 引数 を 省略した場合、シート名は使用されません。関数によって返されるアドレスは、現在のシート上のセルを参照します。"
			}
		}
	},
	AREAS: {
		description: "指定された範囲に含まれる領域の個数を返します。",
		abstract: "指定された範囲に含まれる領域の個数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/areas-function"
		}],
		functionParameter: { reference: {
			name: "範囲",
			detail: "セルまたはセル範囲への参照であり、複数の領域を参照できます。"
		} }
	},
	CHOOSE: {
		description: "引数リストの値の中から特定の値を 1 つ選択します。",
		abstract: "引数リストの値の中から特定の値を 1 つ選択します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/choose-function"
		}],
		functionParameter: {
			indexNum: {
				name: "インデックス",
				detail: "どの値引数が選択されるかを指定します。 インデックスには 1 ～ 254 の数値、または 1 ～ 254 の数値を返す数式またはセル参照を指定します。\nインデックスが 1 の場合は、値 1 が返され、2 の場合は値 2 が返されます (以下同様)。\nインデックスが 1 未満またはリスト内の最後の値の数値よりも大きい場合は、エラー値 #VALUE! が返されます。\nインデックスに小数部がある場合は、使用される前に切り捨てられて、整数値が使用されます。"
			},
			value1: {
				name: "値 1",
				detail: "CHOOSE 関数はこれらの引数から、インデックスに基づいて 1 つの値または実行する動作を選択します。 引数には、数値、セル参照、定義名、数式、関数、または文字列を指定できます。"
			},
			value2: {
				name: "値 2",
				detail: " 1 ～ 254 個の値引数を指定します。"
			}
		}
	},
	CHOOSECOLS: {
		description: "配列から指定された列を返します",
		abstract: "配列から指定された列を返します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/choosecols-function"
		}],
		functionParameter: {
			array: {
				name: "配列",
				detail: "新しい配列で返される列を含む配列。"
			},
			colNum1: {
				name: "列番号1",
				detail: "返される最初の列。"
			},
			colNum2: {
				name: "列番号2",
				detail: "返される追加の列。"
			}
		}
	},
	CHOOSEROWS: {
		description: "配列から指定された行を返します",
		abstract: "配列から指定された行を返します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/chooserows-function"
		}],
		functionParameter: {
			array: {
				name: "配列",
				detail: "新しい配列で返される行を含む配列。"
			},
			rowNum1: {
				name: "行番号1",
				detail: "返される最初の行番号。"
			},
			rowNum2: {
				name: "行番号2",
				detail: "返される追加の行番号。"
			}
		}
	},
	COLUMN: {
		description: "指定された セル参照の列番号を返します。",
		abstract: "セル参照の列番号を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/column-function"
		}],
		functionParameter: { reference: {
			name: "範囲",
			detail: "列番号を調べるセルまたは範囲を指定します。"
		} }
	},
	COLUMNS: {
		description: "配列またはセル参照の列数を返します。",
		abstract: "セル参照の列数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/columns-function"
		}],
		functionParameter: { array: {
			name: "配列",
			detail: "列数を計算する配列、配列数式、またはセル範囲の参照を指定します。"
		} }
	},
	DROP: {
		description: "配列の先頭または末尾から指定した数の行または列を削除します",
		abstract: "配列の先頭または末尾から指定した数の行または列を削除します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/drop-function"
		}],
		functionParameter: {
			array: {
				name: "配列",
				detail: "行または列を削除する配列。"
			},
			rows: {
				name: "行の数",
				detail: "削除する行の数。 負の値は配列の末尾から削除されます。"
			},
			columns: {
				name: "列の数",
				detail: "削除する列の数。 負の値は配列の末尾から削除されます。"
			}
		}
	},
	EXPAND: {
		description: "指定した行と列のディメンションに配列を展開または埋め込みます",
		abstract: "指定した行と列のディメンションに配列を展開または埋め込みます",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/expand-function"
		}],
		functionParameter: {
			array: {
				name: "配列",
				detail: "展開する配列。"
			},
			rows: {
				name: "行の数",
				detail: "展開された配列内の行数。 存在しない場合、行は展開されません。"
			},
			columns: {
				name: "列の数",
				detail: "展開された配列内の列の数。 存在しない場合、列は展開されません。"
			},
			padWith: {
				name: "埋め込む値",
				detail: "埋め込む値。 既定値は #N/A です。"
			}
		}
	},
	FILTER: {
		description: "フィルターは定義した条件に基づいたデータ範囲です。",
		abstract: "フィルターは定義した条件に基づいたデータ範囲です。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/filter-function"
		}],
		functionParameter: {
			array: {
				name: "配列",
				detail: "フィルターする範囲または配列。"
			},
			include: {
				name: "ブール配列",
				detail: "ブール値の配列。TRUE は保持する行または列を示します。"
			},
			ifEmpty: {
				name: "空の値を返す",
				detail: "アイテムが保持されていない場合に返されます。"
			}
		}
	},
	FORMULATEXT: {
		description: "指定された参照の位置にある数式をテキストとして返します。",
		abstract: "指定された参照の位置にある数式をテキストとして返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/formulatext-function"
		}],
		functionParameter: { reference: {
			name: "参照",
			detail: "セルまたはセル範囲を参照します。"
		} }
	},
	GETPIVOTDATA: {
		description: "ピボットテーブル レポートに格納されているデータを返します。",
		abstract: "ピボットテーブル レポートに格納されているデータを返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/getpivotdata-function"
		}],
		functionParameter: {
			dataField: {
				name: "データ フィールド",
				detail: "取得するデータを含むデータ フィールドの名前です。"
			},
			pivotTable: {
				name: "ピボットテーブル",
				detail: "ピボットテーブル内のセル、範囲、または名前付き範囲への参照です。"
			},
			field1: {
				name: "フィールド 1",
				detail: "省略可能。データを表す最初のフィールド名です。"
			},
			item1: {
				name: "アイテム 1",
				detail: "省略可能。フィールド内の最初のアイテム名です。"
			}
		}
	},
	HLOOKUP: {
		description: "テーブルの最初の行または値の配列の値を検索し、テーブルまたは配列で指定した行から同じ列の値を返します。 HLOOKUP 関数は、比較する値がデータ テーブルの上端行にあり、指定した行数分だけ下を参照する場合に使用します。 比較する値が検索データの左側の列にある場合は、VLOOKUP 関数を使用してください。",
		abstract: "テーブルの最初の行または値の配列の値を検索し、テーブルまたは配列で指定した行から同じ列の値を返します。 HLOOKUP 関数は、比較する値がデータ テーブルの上端行にあり、指定した行数分だけ下を参照する場合に使用します。 比較する値が検索データの左側の列にある場合は、VLOOKUP 関数を使用してください。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/hlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "検索値",
				detail: "必須。 テーブルの上端行で検索する値を指定します。 検索値には、値、参照、または文字列を指定します。"
			},
			tableArray: {
				name: "範囲",
				detail: "必須。 データを検索する情報のテーブルです。 セル範囲への参照またはセル範囲名を使用します。 範囲の上端行の列のデータは、文字列、数値、論理値のいずれでもかまいません。 検索の型に TRUE を指定した場合、範囲の上端行の列のデータは、昇順で配置しておく必要があります。つまりは、～-2、-1、0、1、2～、A～Z、FALSE から TRUE の順となります。その他の場合、HLOOKUP では正しい値を得られない場合があります。 検索の型に FALSE を指定した場合、範囲を並べ替える必要はありません。 英字の大文字と小文字は区別されません。 値を昇順に、左から右に並べ替えます。 詳細については、「 範囲またはテーブルのデータを並べ替える 」を参照してください。"
			},
			rowIndexNum: {
				name: "行番号",
				detail: "必須。 一致する値を返す、範囲内の行番号。 行番号に 1 を指定すると、範囲の最初の行の値が返され、行番号に 2 を指定すると、範囲の 2 番目の行の値が返され、以降同様に処理されます。 行番号が 1 より小さい場合、エラー値 #VALUE! が返され、行番号が範囲の行数より大きい場合は、エラー値 #REF! が返されます。"
			},
			rangeLookup: {
				name: "検索の型",
				detail: "オプション。 HLOOKUP を使用して検索値と完全に一致する値だけを検索するか、その近似値を含めて検索するかを指定する論理値です。 TRUE を指定するか省略した場合、近似値が返されます。 つまり、完全に一致する値が見つからない場合は、検索値未満の最大値が使用されます。 FALSE を指定した場合、HLOOKUP では完全に一致する値が検索されます。 完全に一致する値が見つからない場合は、エラー値 #N/A が返されます。"
			}
		}
	},
	HSTACK: {
		description: "配列を水平方向に順番に追加して、より大きな配列を返します。",
		abstract: "配列を水平方向に順番に追加して、より大きな配列を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/hstack-function"
		}],
		functionParameter: {
			array1: {
				name: "配列",
				detail: "各配列引数からの行数の最大値。"
			},
			array2: {
				name: "配列",
				detail: "各配列引数のすべての列の合計カウント。"
			}
		}
	},
	HYPERLINK: {
		description: "セル内にハイパーリンクを作成します。",
		abstract: "セル内にハイパーリンクを作成します。",
		links: [{
			title: "指導",
			url: "https://support.google.com/docs/answer/3093313?hl=ja"
		}],
		functionParameter: {
			url: {
				name: "URL",
				detail: "リンクの場所の完全な URL を二重引用符で囲んで指定します。または、URL を含むセルの参照を指定します。 使用できるリンク タイプは、 http:// 、 https:// 、 mailto: 、 aim: 、 ftp:// 、 gopher:// 、 telnet:// 、 news:// のみで、その他のタイプは明示的に禁止されています。別のプロトコルを指定すると、セルに リンクラベル は表示されますが、ハイパーリンクされません。 プロトコルを何も指定しない場合は、 http:// が URL の先頭に追加されます。"
			},
			linkLabel: {
				name: "リンクラベル",
				detail: "[ 省略可 - デフォルトは URL ] - セルにリンクとして表示するテキストを二重引用符で囲んで指定します。または、ラベルを含むセルの参照を指定します。 リンクラベル が空のセルへの参照である場合、 URL が有効であればリンクとして表示され、無効であれば通常のテキストとして表示されます。 リンクラベル が空の文字列リテラル（\"\"）である場合、セルは空として表示されますが、クリックするかセルに移動するとリンクにアクセスできます。"
			}
		}
	},
	IMAGE: {
		description: "IMAGE 関数は、代替テキストと共にソースの場所からセルに画像を挿入します。 その後、セルの移動とサイズ変更、並べ替えとフィルター処理、Excel テーブル内の画像の操作を行うことができます。 この関数を使用して、在庫、ゲーム、従業員、数学的概念などのデータのリストを視覚的に拡張します。",
		abstract: "IMAGE 関数は、代替テキストと共にソースの場所からセルに画像を挿入します。 その後、セルの移動とサイズ変更、並べ替えとフィルター処理、Excel テーブル内の画像の操作を行うことができます。 この関数を使用して、在庫、ゲーム、従業員、数学的概念などのデータのリストを視覚的に拡張します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/image-function"
		}],
		functionParameter: {
			source: {
				name: "ソース",
				detail: "\"https\" プロトコルを使用した画像ファイルの URL パス。"
			},
			altText: {
				name: "代替テキスト",
				detail: "アクセシビリティのために画像を説明する代替テキスト。"
			},
			sizing: {
				name: "サイズ",
				detail: "画像の寸法を指定します。"
			},
			height: {
				name: "高さ",
				detail: "画像のカスタムの高さ (ピクセル単位)。"
			},
			width: {
				name: "幅",
				detail: "画像のカスタム幅 (ピクセル単位)。"
			}
		}
	},
	INDEX: {
		description: "指定された行と列が交差する位置にあるセルの参照を返します。 隣接しない複数のセル範囲を指定した場合、その中から任意の領域を選択できます。",
		abstract: "セル参照または配列から、指定された位置の値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/index-function"
		}],
		functionParameter: {
			reference: {
				name: "参照",
				detail: "1 つまたは複数のセルの参照を指定します。"
			},
			rowNum: {
				name: "行番号",
				detail: "範囲の中にあり、セル参照を返すセルの行位置を数値で返します。"
			},
			columnNum: {
				name: "列番号",
				detail: "範囲の中にあり、セル参照を返すセルの列位置を数値で返します。"
			},
			areaNum: {
				name: "領域番号",
				detail: "行番号と列番号の共通部分を返す参照の範囲を選択します。"
			}
		}
	},
	INDIRECT: {
		description: "指定される文字列への参照を返します。 セル参照はすぐに計算され、結果としてセルの内容が表示されます。",
		abstract: "参照文字列によって指定されるセルに入力されている文字列を介して、間接的にセルを指定します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/indirect-function"
		}],
		functionParameter: {
			refText: {
				name: "参照文字列",
				detail: " A1 形式、R1C1 形式の参照、参照として定義されている名前が入力されているセルへの参照、または文字列としてのセルへの参照を指定します。"
			},
			a1: {
				name: "参照形式",
				detail: "参照文字列で指定されたセルに含まれるセル参照の種類を、論理値で指定します。"
			}
		}
	},
	LOOKUP: {
		description: "つの行または列から、他の行または列の同じ場所にある値を見つけるときは、検索/行列関数 の 1 つである LOOKUP を使います",
		abstract: "ベクトル (1 行または 1 列で構成されるセル範囲) または配列を検索し、対応する値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/lookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "検索値",
				detail: "LOOKUP が最初のベクトルで検索する値。 検査値には、数値、文字列、論理値、または値を参照する名前やセル参照を指定できます"
			},
			lookupVectorOrArray: {
				name: "検査範囲/配列",
				detail: "1 行または 1 列のみの範囲を指定します。 検査範囲には、文字列、数値、または論理値を指定できます。"
			},
			resultVector: {
				name: "範囲",
				detail: "1 つの行または列のみを含む範囲。 result_vector引数は、lookup_vectorと同じサイズにする必要があります。 同じサイズにする必要があります"
			}
		}
	},
	MATCH: {
		description: "MATCH 関数は、範囲 のセルの範囲で指定した項目を検索し、その範囲内の項目の相対的な位置を返します。",
		abstract: "照合の型に従って参照または配列に含まれる値を検索し、検査値と一致する要素の相対的な位置を数値で返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/match-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "検査値",
				detail: "検査範囲の中で照合する値を指定します。"
			},
			lookupArray: {
				name: "検査範囲",
				detail: "検索するセルの範囲を指定します。"
			},
			matchType: {
				name: "照合の型",
				detail: "-1、0、1 の数値のいずれかを指定します。"
			}
		}
	},
	OFFSET: {
		description: "指定された行数と列数だけシフトした位置にあるセルまたはセル範囲への参照 (オフセット参照) を返します。",
		abstract: "指定された行数と列数だけシフトした位置にあるセルまたはセル範囲への参照 (オフセット参照) を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/offset-function"
		}],
		functionParameter: {
			reference: {
				name: "参照",
				detail: "オフセットの基準となる参照を指定します。"
			},
			rows: {
				name: "行数",
				detail: "基準の左上隅のセルを上方向または下方向へシフトする距離を行数単位で指定します。"
			},
			cols: {
				name: "列数",
				detail: "結果の左上隅のセルを左方向または右方向へシフトする距離を列数単位で指定します。"
			},
			height: {
				name: "高さ",
				detail: "オフセット参照の行数を指定します。高さは正の数である必要がありま。"
			},
			width: {
				name: "太さ",
				detail: "オフセット参照の列数を指定します。幅は正の数である必要があります。"
			}
		}
	},
	ROW: {
		description: "引数として指定された配列の行番号を返します。",
		abstract: "セル参照の行番号を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/row-function"
		}],
		functionParameter: { reference: {
			name: "範囲",
			detail: "行番号を調べるセルまたはセル範囲の参照を指定します。"
		} }
	},
	ROWS: {
		description: "セル範囲または配列の行数を返します。",
		abstract: "セル参照の行数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/rows-function"
		}],
		functionParameter: { array: {
			name: "配列",
			detail: "行数を計算する配列、配列数式、またはセル範囲の参照を指定します。"
		} }
	},
	RTD: {
		description: "COM オートメーションに対応するプログラムからリアルタイムのデータを取得します。",
		abstract: "COM オートメーションに対応するプログラムからリアルタイムのデータを取得します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/rtd-function"
		}],
		functionParameter: {
			progId: {
				name: "プログラム ID",
				detail: "ローカルにインストールされている COM オートメーション アドインのプログラム ID です。"
			},
			server: {
				name: "サーバー",
				detail: "アドインを実行するサーバー名です。ローカルの場合は空の文字列を指定します。"
			},
			topic1: {
				name: "トピック 1",
				detail: "取得するリアルタイム データを指定する最初の文字列です。"
			},
			topic2: {
				name: "トピック 2",
				detail: "省略可能。リアルタイム データを指定する追加の文字列です。"
			}
		}
	},
	SORT: {
		description: "SORTでは、範囲または配列の内容を並べ替えます。",
		abstract: "SORTでは、範囲または配列の内容を並べ替えます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/sort-function"
		}],
		functionParameter: {
			array: {
				name: "配列",
				detail: "並べ替える範囲または配列。"
			},
			sortIndex: {
				name: "ソートインデックス",
				detail: "(行または列) による順序を表す数値。"
			},
			sortOrder: {
				name: "並べ替え順序",
				detail: "希望の並べ替え順序を表す数値。連続 (デフォルト) の場合は 1、降順の場合は -1。"
			},
			byCol: {
				name: "仕分け方向",
				detail: "希望するソート方向を示す論理値。行でソートする場合は FALSE (デフォルト)、列でソートする場合は TRUE。"
			}
		}
	},
	SORTBY: {
		description: "範囲または配列の内容を、対応する範囲または配列の値に基づいて並べ替えます。",
		abstract: "範囲または配列の内容を、対応する範囲または配列の値に基づいて並べ替えます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/sortby-function"
		}],
		functionParameter: {
			array: {
				name: "配列",
				detail: "並べ替える範囲または配列。"
			},
			byArray1: {
				name: "配列の並べ替え1",
				detail: "並べ替えに基づいて並べ替える範囲または配列。"
			},
			sortOrder1: {
				name: "並べ替え順序1",
				detail: "希望の並べ替え順序を表す数値。連続 (デフォルト) の場合は 1、降順の場合は -1。"
			},
			byArray2: {
				name: "配列の並べ替え2",
				detail: "並べ替えに基づいて並べ替える範囲または配列。"
			},
			sortOrder2: {
				name: "並べ替え順序2",
				detail: "希望の並べ替え順序を表す数値。連続 (デフォルト) の場合は 1、降順の場合は -1。"
			}
		}
	},
	TAKE: {
		description: "配列の先頭または末尾から、指定した数の連続する行または列を返します。",
		abstract: "配列の先頭または末尾から、指定した数の連続する行または列を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/take-function"
		}],
		functionParameter: {
			array: {
				name: "配列",
				detail: "行または列を取得する配列。"
			},
			rows: {
				name: "行の数",
				detail: "取得する行の数。 負の値は配列の最後から取得します。"
			},
			columns: {
				name: "列の数",
				detail: "取得する列の数。 負の値は配列の最後から取得します。"
			}
		}
	},
	TOCOL: {
		description: "1 つの列の配列を返します",
		abstract: "1 つの列の配列を返します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/tocol-function"
		}],
		functionParameter: {
			array: {
				name: "配列",
				detail: "列として返す配列または参照。"
			},
			ignore: {
				name: "無視値",
				detail: "特定の種類の値を無視するかどうか。 既定では、値は無視されません。 次のいずれかを指定します。\n0 すべての値を保持する (既定)\n1 空白を無視する\n2 エラーを無視する\n3 空白とエラーを無視する"
			},
			scanByColumn: {
				name: "配列を列でスキャンします",
				detail: "配列を列でスキャンします。 既定では、配列は行ごとにスキャンされます。 スキャンにより、値が行順か列順かが決まります。"
			}
		}
	},
	TOROW: {
		description: "1 行の配列を返します",
		abstract: "1 行の配列を返します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/torow-function"
		}],
		functionParameter: {
			array: {
				name: "配列",
				detail: "行として返す配列または参照。"
			},
			ignore: {
				name: "無視値",
				detail: "特定の種類の値を無視するかどうか。 既定では、値は無視されません。 次のいずれかを指定します。\n0 すべての値を保持する (既定)\n1 空白を無視する\n2 エラーを無視する\n3 空白とエラーを無視する"
			},
			scanByColumn: {
				name: "配列を列でスキャンします",
				detail: "配列を列でスキャンします。 既定では、配列は行ごとにスキャンされます。 スキャンにより、値が行順か列順かが決まります。"
			}
		}
	},
	TRANSPOSE: {
		description: "配列で指定された範囲のデータの行列変換を行います。",
		abstract: "配列で指定された範囲のデータの行列変換を行います。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/transpose-function"
		}],
		functionParameter: { array: {
			name: "配列",
			detail: "ワークシート内のセルの範囲または配列。"
		} }
	},
	UNIQUE: {
		description: "一覧または範囲内の一意の値の一覧を返します。&nbsp;",
		abstract: "一覧または範囲内の一意の値の一覧を返します。&nbsp;",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/unique-function"
		}],
		functionParameter: {
			array: {
				name: "配列",
				detail: "一意の行または列が返される範囲または配列を返します。"
			},
			byCol: {
				name: "列ごと",
				detail: "論理値です。行を相互に比較して一意の値 = FALSE を返します。省略されます。列を相互に比較して一意の値 = TRUE を返します。"
			},
			exactlyOnce: {
				name: "1回だけ",
				detail: "論理値です。配列から 1 回だけ出現する行または列を返します = TRUE; 配列からすべての個別の行または列を返します = FALSE、または省略されます。"
			}
		}
	},
	VLOOKUP: {
		description: "テーブルまたは範囲の内容を行ごとに検索する場合は、VLOOKUP を使用します。 たとえば、自動車部品の価格を部品番号で検索するか、従業員 ID に基づいて従業員名を検索します。",
		abstract: "配列の左端列で特定の値を検索し、対応するセルの値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/vlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "検索値",
				detail: "検索の対象となる値。 調べたい値は、引数の 範囲 で指定したセル範囲の最初の列になければなりません。"
			},
			tableArray: {
				name: "範囲",
				detail: "VLOOKUP が検索値と戻り値を検索するセル範囲。 名前付き範囲またはテーブルを使用でき、セル参照の代わりに引数に名前を使用できます。 "
			},
			colIndexNum: {
				name: "列番号",
				detail: "戻り値を含む列の番号 (範囲 の左端の列は 1 で始まります)。"
			},
			rangeLookup: {
				name: "検索の型",
				detail: "VLOOKUP を使用して、近似一致を検索するか、完全一致を検索するかを指定する論理値です。"
			}
		}
	},
	VSTACK: {
		description: "より大きな配列を返すために、配列を垂直方向および順番に追加します",
		abstract: "より大きな配列を返すために、配列を垂直方向および順番に追加します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/vstack-function"
		}],
		functionParameter: {
			array1: {
				name: "配列",
				detail: "追加する配列。"
			},
			array2: {
				name: "配列",
				detail: "追加する配列。"
			}
		}
	},
	WRAPCOLS: {
		description: "指定した数の要素の後に、指定された値の行または列を列ごとにラップして、新しい配列を形成します。",
		abstract: "指定した数の要素の後に、指定された値の行または列を列ごとにラップして、新しい配列を形成します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/wrapcols-function"
		}],
		functionParameter: {
			vector: {
				name: "ベクター",
				detail: "ラップするベクターまたは参照。"
			},
			wrapCount: {
				name: "改行の数",
				detail: "各列の値の最大数。"
			},
			padWith: {
				name: "埋め込む値",
				detail: "埋め込む値。 既定値は #N/A です。"
			}
		}
	},
	WRAPROWS: {
		description: "指定した数の要素の後に、指定された行または値の列を行ごとにラップして、新しい配列を形成します。",
		abstract: "指定した数の要素の後に、指定された行または値の列を行ごとにラップして、新しい配列を形成します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/wraprows-function"
		}],
		functionParameter: {
			vector: {
				name: "ベクター",
				detail: "ラップするベクターまたは参照。"
			},
			wrapCount: {
				name: "改行の数",
				detail: "各行の値の最大数。"
			},
			padWith: {
				name: "埋め込む値",
				detail: "埋め込む値。 既定値は #N/A です。"
			}
		}
	},
	XLOOKUP: {
		description: "範囲または配列を検索し、最初に見つかった一致に対応する項目を返します。 一致するものがない場合、XLOOKUP は最も近い (近似) 一致を返します。&nbsp;",
		abstract: "範囲または配列を検索し、最初に見つかった一致に対応する項目を返します。 一致するものがない場合、XLOOKUP は最も近い (近似) 一致を返します。&nbsp;",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/xlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "検索値",
				detail: "検索する値は, 省略した場合、XLOOKUPは検索範囲に空白のセルを返します。"
			},
			lookupArray: {
				name: "検索範囲",
				detail: "検索する配列または範囲"
			},
			returnArray: {
				name: "戻り配列",
				detail: "返す配列または範囲"
			},
			ifNotFound: {
				name: "見つからない場合",
				detail: "有効な一致が見つからない場合は、指定した [見つからない場合] テキストを返します。有効な一致が見つからず、[見つからない場合] が見つからない場合、#N/A が返されます。"
			},
			matchMode: {
				name: "一致モード",
				detail: "一致の種類を指定します: 0 完全一致。 見つからない場合は、#N/A が返されます。 これが既定の設定です。-1 完全一致。 見つからない場合は、次の小さなアイテムが返されます。1 完全一致。 見つからない場合は、次の大きなアイテムが返されます。 2 *、?、および 〜 が特別な意味を持つワイルドカードの一致。"
			},
			searchMode: {
				name: "検索モード",
				detail: "使用する検索モードを指定します: 1 先頭の項目から検索を実行します。 これが既定の設定です。-1 末尾の項目から逆方向に検索を実行します。2 昇順で並べ替えられた検索範囲を使用してバイナリ検索を実行します。 並べ替えられていない場合、無効な結果が返されます。-2 降順で並べ替えられた検索範囲を使用してバイナリ検索を実行します。 並べ替えられていない場合、無効な結果が返されます。"
			}
		}
	},
	XMATCH: {
		description: "指定された項目を配列内またはセル範囲内で検索し、項目の相対位置を返します。 ",
		abstract: "セルの配列またはセルの範囲内で指定された項目の相対的な位置を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/xmatch-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "検索値",
				detail: "参照値"
			},
			lookupArray: {
				name: "検索範囲",
				detail: "検索する配列または範囲"
			},
			matchMode: {
				name: "一致モード",
				detail: "一致の種類を指定します:\n0 - 完全一致 (既定)\n-1 - 完全一致または最も近い小さな値の項目\n1 - 完全一致または最も近い大きな値の項目\n2 - *、?、および 〜 が特別な意味を持つワイルドカードの一致。"
			},
			searchMode: {
				name: "検索モード",
				detail: "検索モードを指定します。\n1 - 先頭から末尾へ検索 (既定)\n-1 - 末尾から先頭へ検索 (逆方向検索)。\n2 - 検索範囲が昇順に並んでいることを前提にしてバイナリ検索を実行する。 並べ替えられていない場合、無効な結果が返されます。\n-2 - 降順で並べ替えられた検索範囲を使用してバイナリ検索を実行します。 並べ替えられていない場合、無効な結果が返されます。"
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/math/ja-JP.ts
const locale$5 = {
	ABS: {
		description: "数値の絶対値を返します。 絶対値とは、数値から符号 (+、-) を除いた数の大きさのことです。",
		abstract: "数値の絶対値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/abs-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "絶対値が必要な実数。"
		} }
	},
	ACOS: {
		description: "数値のアークコサイン (逆余弦) を返します。 アークコサインとは、そのコサインが数値となる角度のことです。 戻り値の角度は、0 (ゼロ) ～ pi の範囲内のラジアンで示されます。",
		abstract: "数値のアークコサインを返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/acos-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "求める角度のコサインの値を、-1 ～ 1 の範囲で指定します。"
		} }
	},
	ACOSH: {
		description: "数値の逆双曲線コサインを返します。 数値は 1 以上である必要があります。 逆双曲線コサインは、双曲線コサインが 数値の値なので、ACOSH(COSH(number)) は数値と等 しくなります。",
		abstract: "数値の双曲線逆余弦 (ハイパーボリック コサインの逆関数) を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/acosh-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "1 以上の実数を指定します。"
		} }
	},
	ACOT: {
		description: "コタンジェント、または逆コタンジェント、数値の主値を返します。",
		abstract: "数値の逆余接を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/acot-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "数値は、求める角度のコタンジェントです。 これは実数である必要があります。"
		} }
	},
	ACOTH: {
		description: "数値の双曲線逆余接を返します。",
		abstract: "数値の双曲線逆余接を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/acoth-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "数値の絶対値は 1 より大きい値である必要があります。"
		} }
	},
	AGGREGATE: {
		description: "リストまたはデータベースの集計値を返します。",
		abstract: "リストまたはデータベースの集計値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/aggregate-function"
		}],
		functionParameter: {
			functionNum: {
				name: "集計方法",
				detail: "使用する関数を指定する 1 ～ 19 の番号です。"
			},
			options: {
				name: "オプション",
				detail: "関数の検証範囲内の無視する値を指定する数値です。"
			},
			ref1: {
				name: "範囲 1",
				detail: "集計値を求めるために複数の数値引数を受け取る関数の、最初の数値引数です。"
			},
			ref2: {
				name: "範囲 2",
				detail: "集計値を求めるための数値引数 2 ～ 252 を指定します。"
			}
		}
	},
	ARABIC: {
		description: "ローマ数字をアラビア数字に変換します。",
		abstract: "ローマ数字をアラビア数字に変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/arabic-function"
		}],
		functionParameter: { text: {
			name: "文字列",
			detail: "半角の二重引用符で囲んだ文字列、空の文字列 (\"\")、または文字列を含むセルへの参照を指定します。"
		} }
	},
	ASIN: {
		description: "数値のアークサインを返します。",
		abstract: "数値のアークサインを返します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/asin-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "求める角度のサインの値を -1 ～ 1 の範囲で指定します。"
		} }
	},
	ASINH: {
		description: "数値の双曲線逆正弦 (ハイパーボリック サインの逆関数) を返します。",
		abstract: "数値の双曲線逆正弦 (ハイパーボリック サインの逆関数) を返します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/asinh-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "実数を指定します。"
		} }
	},
	ATAN: {
		description: "数値のアークタンジェントを返します。",
		abstract: "数値のアークタンジェントを返します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/atan-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "求める角度のタンジェントの値を指定します。"
		} }
	},
	ATAN2: {
		description: "指定された x-y 座標のアークタンジェントを返します。",
		abstract: "指定された x-y 座標のアークタンジェントを返します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/atan2-function"
		}],
		functionParameter: {
			xNum: {
				name: "x 座標",
				detail: "点の x 座標を指定します。"
			},
			yNum: {
				name: "y 座標",
				detail: "点の y 座標を指定します。"
			}
		}
	},
	ATANH: {
		description: "数値の逆双曲線正接を返します。 数値は 、-1 から 1 (-1 と 1 を除く) の間である必要があります。 逆双曲線正接は、双曲線正接が 数値 である値であるため、ATANH(TANH(number)) は 数値 と等しくなります。",
		abstract: "数値の逆双曲線正接を返します。 数値は 、-1 から 1 (-1 と 1 を除く) の間である必要があります。 逆双曲線正接は、双曲線正接が 数値 である値であるため、ATANH(TANH(number)) は 数値 と等しくなります。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/atanh-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "必ず指定します。 -1 より大きく 1 より小さい実数を指定します。"
		} }
	},
	BASE: {
		description: "指定された基数 (底) のテキスト表現に、数値を変換します。",
		abstract: "指定された基数 (底) のテキスト表現に、数値を変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/base-function"
		}],
		functionParameter: {
			number: {
				name: "数値",
				detail: "変換する数値を指定します。 0 以上、2^53 未満の整数である必要があります。"
			},
			radix: {
				name: "基数",
				detail: " 数値を変換する基数 (底) の数値を指定します。 2 以上、36 以下の整数である必要があります。"
			},
			minLength: {
				name: "最小の長さです",
				detail: "返される文字列の最小長を指定します。 0 以上の整数である必要があります。"
			}
		}
	},
	CEILING: {
		description: "指定された基準値の倍数のうち、最も近い値に数値を切り上げます。",
		abstract: "指定された基準値の倍数のうち、最も近い値に数値を切り上げます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/ceiling-function"
		}],
		functionParameter: {
			number: {
				name: "数値",
				detail: "丸めの対象となる数値を指定します。"
			},
			significance: {
				name: "基準値",
				detail: "倍数の基準となる数値を指定します。"
			}
		}
	},
	CEILING_MATH: {
		description: "指定された基準値の倍数のうち、最も近い値に数値を切り上げます。",
		abstract: "指定された基準値の倍数のうち、最も近い値に数値を切り上げます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/ceiling-math-function"
		}],
		functionParameter: {
			number: {
				name: "数値",
				detail: "丸めの対象となる数値を指定します。"
			},
			significance: {
				name: "基準値",
				detail: "倍数の基準となる数値を指定します。"
			},
			mode: {
				name: "モード",
				detail: "負の数値の場合、数値を 0 に丸めるか、ゼロから遠ざけるかを制御します。"
			}
		}
	},
	CEILING_PRECISE: {
		description: "指定された基準値の倍数のうち、最も近い値に数値を切り上げます。 数値は正負に関係なく切り上げられます。",
		abstract: "指定された基準値の倍数のうち、最も近い値に数値を切り上げます。 数値は正負に関係なく切り上げられます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/ceiling-precise-function"
		}],
		functionParameter: {
			number: {
				name: "数値",
				detail: "丸めの対象となる数値を指定します。"
			},
			significance: {
				name: "基準値",
				detail: "倍数の基準となる数値を指定します。"
			}
		}
	},
	COMBIN: {
		description: "指定された個数を選択するときの組み合わせの数を返します。",
		abstract: "指定された個数を選択するときの組み合わせの数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/combin-function"
		}],
		functionParameter: {
			number: {
				name: "総数",
				detail: "抜き取る対象の全体の数を指定します。"
			},
			numberChosen: {
				name: "抜き取り数",
				detail: "抜き取る組み合わせ 1 組に含まれる項目の数を指定します。"
			}
		}
	},
	COMBINA: {
		description: "指定された個数を選択するときの組み合わせ (反復あり) の数を返します",
		abstract: "指定された個数を選択するときの組み合わせ (反復あり) の数を返します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/combina-function"
		}],
		functionParameter: {
			number: {
				name: "総数",
				detail: "抜き取る対象の全体の数を指定します。"
			},
			numberChosen: {
				name: "抜き取り数",
				detail: "抜き取る組み合わせ 1 組に含まれる項目の数を指定します。"
			}
		}
	},
	COS: {
		description: "指定された角度のコサインを返します。",
		abstract: "指定された角度のコサインを返します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/cos-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "コサインを求める角度をラジアンで指定します。"
		} }
	},
	COSH: {
		description: "数値の双曲線余弦 (ハイパーボリック コサイン) を返します。",
		abstract: "数値の双曲線余弦 (ハイパーボリック コサイン) を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/cosh-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "双曲線余弦を求める実数を指定します。"
		} }
	},
	COT: {
		description: "角度の双曲線余接を返します。",
		abstract: "角度の双曲線余接を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/cot-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "余接を求める角度を、ラジアンを単位として指定します。"
		} }
	},
	COTH: {
		description: "数値の双曲線余接を返します。",
		abstract: "数値の双曲線余接を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/coth-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "双曲線余接を求める実数を指定します。"
		} }
	},
	CSC: {
		description: "角度の余割を返します。",
		abstract: "角度の余割を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/csc-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "余割を求める角度を、ラジアンを単位として指定します。"
		} }
	},
	CSCH: {
		description: "角度の双曲線余割を返します。",
		abstract: "角度の双曲線余割を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/csch-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "双曲線余割を求める角度を、ラジアンを単位として指定します。"
		} }
	},
	DECIMAL: {
		description: "指定された底の数値のテキスト表現を 10 進数に変換します。",
		abstract: "指定された底の数値のテキスト表現を 10 進数に変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/decimal-function"
		}],
		functionParameter: {
			text: {
				name: "文字列",
				detail: "文字列の長さは 255 文字以下にする必要があります。"
			},
			radix: {
				name: "基数",
				detail: " 数値を変換する基数 (底) の数値を指定します。 2 以上、36 以下の整数である必要があります。"
			}
		}
	},
	DEGREES: {
		description: "ラジアンを度に変換します。",
		abstract: "ラジアンを度に変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/degrees-function"
		}],
		functionParameter: { angle: {
			name: "角度",
			detail: "度に変換するラジアン単位の角度を指定します。"
		} }
	},
	EVEN: {
		description: "指定された数値を最も近い偶数に切り上げた値を返します。",
		abstract: "指定された数値を最も近い偶数に切り上げた値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/even-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "丸めの対象となる数値を指定します。"
		} }
	},
	EXP: {
		description: "e を底とする数値のべき乗を返します。",
		abstract: "e を底とする数値のべき乗を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/exp-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "e を底とするべき乗の指数を指定します。"
		} }
	},
	FACT: {
		description: "数値の階乗を返します。",
		abstract: "数値の階乗を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/fact-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "階乗を求める正の数値を指定します。 数値が整数でない場合は、小数点以下が切り捨てられます。"
		} }
	},
	FACTDOUBLE: {
		description: "数値の二重階乗を返します。",
		abstract: "数値の二重階乗を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/factdouble-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "二重階乗を求める正の数値を指定します。 数値が整数でない場合は、小数点以下が切り捨てられます。"
		} }
	},
	FLOOR: {
		description: "数値を指定された桁数で切り捨てます。",
		abstract: "数値を指定された桁数で切り捨てます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/floor-function"
		}],
		functionParameter: {
			number: {
				name: "数値",
				detail: "丸めの対象となる数値を指定します。"
			},
			significance: {
				name: "基準値",
				detail: "倍数の基準となる数値を指定します。"
			}
		}
	},
	FLOOR_MATH: {
		description: "指定された基準値の倍数のうち、最も近い値に数値を切り捨てます。",
		abstract: "指定された基準値の倍数のうち、最も近い値に数値を切り捨てます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/floor-math-function"
		}],
		functionParameter: {
			number: {
				name: "数値",
				detail: "丸めの対象となる数値を指定します。"
			},
			significance: {
				name: "基準値",
				detail: "倍数の基準となる数値を指定します。"
			},
			mode: {
				name: "モード",
				detail: "負の数値の場合、数値を 0 に丸めるか、ゼロから遠ざけるかを制御します。"
			}
		}
	},
	FLOOR_PRECISE: {
		description: "指定された基準値の倍数のうち、最も近い値に数値を切り捨てます。 数値は正負に関係なく切り捨てられます。",
		abstract: "指定された基準値の倍数のうち、最も近い値に数値を切り捨てます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/floor-precise-function"
		}],
		functionParameter: {
			number: {
				name: "数値",
				detail: "丸めの対象となる数値を指定します。"
			},
			significance: {
				name: "基準値",
				detail: "倍数の基準となる数値を指定します。"
			}
		}
	},
	GCD: {
		description: "最大公約数を返します。",
		abstract: "最大公約数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/gcd-function"
		}],
		functionParameter: {
			number1: {
				name: "数値1",
				detail: "計算に使用する最初の値または範囲。"
			},
			number2: {
				name: "数値2",
				detail: "計算に使用する追加の値または範囲。"
			}
		}
	},
	INT: {
		description: "指定された数値を最も近い整数に切り捨てます。",
		abstract: "指定された数値を最も近い整数に切り捨てます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/int-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "切り捨てて整数にする実数を指定します。"
		} }
	},
	ISO_CEILING: {
		description: "最も近い整数に切り上げた値、または、指定された基準値の倍数のうち最も近い値を返します。",
		abstract: "最も近い整数に切り上げた値、または、指定された基準値の倍数のうち最も近い値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/iso-ceiling-function"
		}],
		functionParameter: {
			number: {
				name: "数値",
				detail: "丸めの対象となる数値を指定します。"
			},
			significance: {
				name: "基準値",
				detail: "倍数の基準となる数値を指定します。"
			}
		}
	},
	LCM: {
		description: "最小公倍数を返します。",
		abstract: "最小公倍数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/lcm-function"
		}],
		functionParameter: {
			number1: {
				name: "数値1",
				detail: "計算に使用する最初の値または範囲。"
			},
			number2: {
				name: "数値2",
				detail: "計算に使用する追加の値または範囲。"
			}
		}
	},
	LN: {
		description: "数値の自然対数を返します。",
		abstract: "数値の自然対数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/ln-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "自然対数を求める正の実数を指定します。"
		} }
	},
	LOG: {
		description: "指定された数を底とする数値の対数を返します。",
		abstract: "指定された数を底とする数値の対数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/log-function"
		}],
		functionParameter: {
			number: {
				name: "数値",
				detail: "対数を求める正の実数を指定します。"
			},
			base: {
				name: "底",
				detail: "対数の底を指定します。 底を省略すると、10 を指定したと見なされます。"
			}
		}
	},
	LOG10: {
		description: "10 を底とする数値の対数 (常用対数) を返します。",
		abstract: "10 を底とする数値の対数 (常用対数) を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/log10-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "10 を底とする対数 (常用対数) を求める正の実数を指定します。"
		} }
	},
	MDETERM: {
		description: "配列の行列式を返します。",
		abstract: "配列の行列式を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/mdeterm-function"
		}],
		functionParameter: { array: {
			name: "配列",
			detail: "行数と列数が等しい数値配列 (正方行列) を指定します。"
		} }
	},
	MINVERSE: {
		description: "行列の逆行列を返します。",
		abstract: "行列の逆行列を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/minverse-function"
		}],
		functionParameter: { array: {
			name: "配列",
			detail: "行数と列数が等しい数値配列 (正方行列) を指定します。"
		} }
	},
	MMULT: {
		description: "2 つの配列の行列積を返します。",
		abstract: "2 つの配列の行列積を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/mmult-function"
		}],
		functionParameter: {
			array1: {
				name: "配列1",
				detail: "行列積を求める 2 つの配列を指定します。"
			},
			array2: {
				name: "配列2",
				detail: "行列積を求める 2 つの配列を指定します。"
			}
		}
	},
	MOD: {
		description: "数値を除数で割ったときの剰余を返します。 戻り値は除数と同じ符号になります。",
		abstract: "数値を除算したときの剰余を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/mod-function"
		}],
		functionParameter: {
			number: {
				name: "数値",
				detail: "除算の分子となる数値を指定します。"
			},
			divisor: {
				name: "除数",
				detail: "除算の分母となる数値を指定します。"
			}
		}
	},
	MROUND: {
		description: "指定された値の倍数になるように、数値を切り上げまたは切り捨てます。",
		abstract: "指定された値の倍数になるように、数値を切り上げまたは切り捨てます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/mround-function"
		}],
		functionParameter: {
			number: {
				name: "数値",
				detail: "丸めの対象となる数値を指定します。"
			},
			multiple: {
				name: "複数",
				detail: "数値を丸める倍数。"
			}
		}
	},
	MULTINOMIAL: {
		description: "指定された複数の数値の多項係数を返します。",
		abstract: "指定された複数の数値の多項係数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/multinomial-function"
		}],
		functionParameter: {
			number1: {
				name: "数値1",
				detail: "計算に使用する最初の値または範囲。"
			},
			number2: {
				name: "数値2",
				detail: "計算に使用する追加の値または範囲。"
			}
		}
	},
	MUNIT: {
		description: "指定された次元の単位行列を返します。",
		abstract: "指定された次元の単位行列を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/munit-function"
		}],
		functionParameter: { dimension: {
			name: "ディメンション",
			detail: "ディメンションは、返す必要がある単位行列の次元を指定する整数です。 配列を返します。 ディメンションを 0 より大きい値にする必要があります。"
		} }
	},
	ODD: {
		description: "指定された数値を最も近い奇数に切り上げた値を返します。",
		abstract: "指定された数値を最も近い奇数に切り上げた値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/odd-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "丸めの対象となる数値を指定します。"
		} }
	},
	PI: {
		description: "円周率πを返します。",
		abstract: "円周率πを返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/pi-function"
		}],
		functionParameter: {}
	},
	POWER: {
		description: "数値のべき乗を返します。",
		abstract: "数値のべき乗を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/power-function"
		}],
		functionParameter: {
			number: {
				name: "数値",
				detail: "べき乗の底を指定します。数値には任意の実数を指定することができます。"
			},
			power: {
				name: "指数",
				detail: "数値を底とするべき乗の指数を指定します。"
			}
		}
	},
	PRODUCT: {
		description: "は、引数として指定されたすべての数値を乗算し、製品を返します。",
		abstract: "引数リストの積を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/product-function"
		}],
		functionParameter: {
			number1: {
				name: "数値 1",
				detail: "積を計算する最初の数値または範囲を指定します。"
			},
			number2: {
				name: "数値 2",
				detail: "積を計算する 2 番目以降の数値または範囲を指定します (引数は 1 ～ 255 個まで指定できます)。"
			}
		}
	},
	QUOTIENT: {
		description: "除算の商の整数部を返します。",
		abstract: "除算の商の整数部を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/quotient-function"
		}],
		functionParameter: {
			numerator: {
				name: "分子",
				detail: "被除数 (割られる数) を指定します。"
			},
			denominator: {
				name: "分母",
				detail: "除数 (割る数) を指定します。"
			}
		}
	},
	RADIANS: {
		description: "度をラジアンに変換します。",
		abstract: "度をラジアンに変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/radians-function"
		}],
		functionParameter: { angle: {
			name: "角度",
			detail: "ラジアンに変換する角度を指定します。"
		} }
	},
	RAND: {
		description: "0 以上 1 未満の乱数を返します。",
		abstract: "0 以上 1 未満の乱数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/rand-function"
		}],
		functionParameter: {}
	},
	RANDARRAY: {
		description: "0 から 1 までのランダムな数値の配列を返します。ただし、入力する行と列の数、最小値と最大値、および整数または 10 進数の値を返すかどうかを指定できます。",
		abstract: "0 から 1 までのランダムな数値の配列を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/randarray-function"
		}],
		functionParameter: {
			rows: {
				name: "行の数",
				detail: "返される行の数"
			},
			columns: {
				name: "列の数",
				detail: "返される列の数"
			},
			min: {
				name: "最小値",
				detail: "返される最小値"
			},
			max: {
				name: "最大値",
				detail: "返される最大値"
			},
			wholeNumber: {
				name: "整数",
				detail: "整数または 10 進数の値のどちらを返すのかを指定"
			}
		}
	},
	RANDBETWEEN: {
		description: "指定された範囲内の整数の乱数を返します。",
		abstract: "指定された範囲内の整数の乱数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/randbetween-function"
		}],
		functionParameter: {
			bottom: {
				name: "最小値",
				detail: " 乱数の最小値を整数で指定します。"
			},
			top: {
				name: "最大値",
				detail: "乱数の最大値を整数で指定します。"
			}
		}
	},
	ROMAN: {
		description: "アラビア数字を、ローマ数字を表す文字列に変換します。",
		abstract: "アラビア数字を、ローマ数字を表す文字列に変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/roman-function"
		}],
		functionParameter: {
			number: {
				name: "数値",
				detail: "変換するアラビア数字を指定します。"
			},
			form: {
				name: "書式",
				detail: "ローマ数字の書式を数値で指定します。 ローマ数字の書式には正式な形式から簡略化した形式まであり、書式の値が大きくなるほど、簡略化した形式で表示されます。"
			}
		}
	},
	ROUND: {
		description: "数値を四捨五入して指定された桁数にします。",
		abstract: "数値を四捨五入して指定された桁数にします。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/round-function"
		}],
		functionParameter: {
			number: {
				name: "数値",
				detail: "四捨五入の対象となる数値を指定します。"
			},
			numDigits: {
				name: "桁数",
				detail: "数値を四捨五入した結果の桁数を指定します。"
			}
		}
	},
	ROUNDBANK: {
		description: "銀行家の丸めで数値を丸めます",
		abstract: "銀行家の丸めで数値を丸めます",
		links: [{
			title: "指導",
			url: ""
		}],
		functionParameter: {
			number: {
				name: "数値",
				detail: "銀行型丸めで丸める数値。"
			},
			numDigits: {
				name: "桁数",
				detail: "銀行型丸めで丸める桁数。"
			}
		}
	},
	ROUNDDOWN: {
		description: "数値を指定された桁数で切り捨てます。",
		abstract: "数値を指定された桁数で切り捨てます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/rounddown-function"
		}],
		functionParameter: {
			number: {
				name: "数値",
				detail: "四捨五入の対象となる数値を指定します。"
			},
			numDigits: {
				name: "桁数",
				detail: "数値を四捨五入した結果の桁数を指定します。"
			}
		}
	},
	ROUNDUP: {
		description: "数値を指定された桁数に切り上げます。",
		abstract: "数値を指定された桁数に切り上げます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/roundup-function"
		}],
		functionParameter: {
			number: {
				name: "数値",
				detail: "四捨五入の対象となる数値を指定します。"
			},
			numDigits: {
				name: "桁数",
				detail: "数値を四捨五入した結果の桁数を指定します。"
			}
		}
	},
	SEC: {
		description: "角度の正割を返します。",
		abstract: "角度の正割を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/sec-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "数値は、セカントが必要なラジアンの角度です。"
		} }
	},
	SECH: {
		description: "角度の双曲線正割を返します。",
		abstract: "角度の双曲線正割を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/sech-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "数値は、双曲線のセカントが必要なラジアンの角度です。"
		} }
	},
	SERIESSUM: {
		description: "数式で定義されるべき級数を返します。",
		abstract: "数式で定義されるべき級数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/seriessum-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "べき級数に代入する値を指定します。"
			},
			n: {
				name: "n",
				detail: "x のべき乗の初期値を指定します。"
			},
			m: {
				name: "m",
				detail: "級数の各項に対する n の増分を指定します。"
			},
			coefficients: {
				name: "係数",
				detail: "x の (n+m) 乗の乗数を指定します。"
			}
		}
	},
	SEQUENCE: {
		description: "1、2、3、4 など、配列内の連続した数値の一覧を生成します。",
		abstract: "1、2、3、4 など、配列内の連続した数値の一覧を生成します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/sequence-function"
		}],
		functionParameter: {
			rows: {
				name: "行の数",
				detail: "返す行の数。"
			},
			columns: {
				name: "列の数",
				detail: "返す列の数。"
			},
			start: {
				name: "最初の数値",
				detail: "数列の最初の数値。"
			},
			step: {
				name: "値の増",
				detail: "配列内の後続の各値の増分量。"
			}
		}
	},
	SIGN: {
		description: "数値の正負を調べます。",
		abstract: "数値の正負を調べます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/sign-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "実数を指定します。"
		} }
	},
	SIN: {
		description: "指定された角度のサインを返します。",
		abstract: "指定された角度のサインを返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/sin-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "サインを求める角度をラジアンで指定します。"
		} }
	},
	SINH: {
		description: "数値の双曲線正弦 (ハイパーボリック サイン) を返します。",
		abstract: "数値の双曲線正弦 (ハイパーボリック サイン) を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/sinh-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "実数を指定します。"
		} }
	},
	SQRT: {
		description: "正の平方根を返します。",
		abstract: "正の平方根を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/sqrt-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "平方根を求める数値を指定します。"
		} }
	},
	SQRTPI: {
		description: "(数値 * π) の平方根を返します。",
		abstract: "(数値 * π) の平方根を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/sqrtpi-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "π倍する数値を指定します。"
		} }
	},
	SUBTOTAL: {
		description: "リストまたはデータベースの集計値を返します。",
		abstract: "リストまたはデータベースの集計値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/subtotal-function"
		}],
		functionParameter: {
			functionNum: {
				name: "集計方法",
				detail: "番号 1 ~ 11 または 101 ~ 111 を集計に使用する関数として指定します。 1 ~ 11 には手動で非表示にした行が含まれるのに対して、101 ~ 111 ではそれらを除外します。つまり、フィルター処理されたセルは常に除外されます。"
			},
			ref1: {
				name: "範囲 1",
				detail: "集計する最初の名前付き範囲または参照を指定します。"
			},
			ref2: {
				name: "範囲 2",
				detail: "集計する名前付き範囲または参照を 2 ～ 254 個まで指定します。"
			}
		}
	},
	SUM: {
		description: "引数を合計します。",
		abstract: "引数を合計します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/sum-function"
		}],
		functionParameter: {
			number1: {
				name: "数値 1",
				detail: "加算する最初の数。 ここには 4 のような数値、B6 のようなセル参照、B2:B8 のようなセル範囲を指定できます。"
			},
			number2: {
				name: "数値 2",
				detail: "これは、加算する 2 番目の数値です。 この方法で最大 255 個の数値を指定することができます。"
			}
		}
	},
	SUMIF: {
		description: "指定された検索条件に一致するセルの値を合計します。",
		abstract: "指定された検索条件に一致するセルの値を合計します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/sumif-function"
		}],
		functionParameter: {
			range: {
				name: "範囲",
				detail: "条件によって評価するセルの範囲。"
			},
			criteria: {
				name: "条件",
				detail: " 数値、式、セル参照、テキスト、または追加するセルを定義する関数の形式の条件。 ワイルドカード文字を含めることができます。疑問符 (?) は任意の 1 文字に一致し、アスタリスク (*) は任意の文字シーケンスに一致します。 ワイルドカード文字ではなく、通常の文字として疑問符やアスタリスクを検索する場合は、その文字の前に、\"~*\" のように半角のチルダ (~) を付けます。"
			},
			sumRange: {
				name: "合計範囲",
				detail: "range 引数で指定されたセル以外のセルを追加する場合は、追加する実際のセル。 sum_range引数を省略すると、範囲引数で指定されたセル (条件が適用されるセルと同じセル) が追加されます。"
			}
		}
	},
	SUMIFS: {
		description: "複数の検索条件に一致するすべての引数を合計します。",
		abstract: "複数の検索条件に一致するすべての引数を合計します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/sumifs-function"
		}],
		functionParameter: {
			sumRange: {
				name: "合計範囲",
				detail: "合計するセルの範囲を指定します。"
			},
			criteriaRange1: {
				name: "条件範囲 1",
				detail: "条件 1 に基づいて検証する範囲を指定します。条件範囲 1 と条件 1 が検索時にペアとなり、特定の条件に基づいて条件範囲が検索されます。 条件範囲で項目が見つかったら、合計対象範囲内のその項目に対応する値が合計されます。"
			},
			criteria1: {
				name: "条件 1",
				detail: "条件範囲 1 内のどのセルを合計するかを定義する条件を指定します。 たとえば条件は、32、\">32\"、B4、\"リンゴ\"、または \"32\" のように入力できます。"
			},
			criteriaRange2: {
				name: "条件範囲 2",
				detail: "追加の範囲。 最大 127 の範囲のペアを入力できます。"
			},
			criteria2: {
				name: "条件 2",
				detail: "追加対応する条件です。 最大 127 条件のペアを入力できます。"
			}
		}
	},
	SUMPRODUCT: {
		description: "指定された配列で対応する要素の積を合計します。",
		abstract: "指定された配列で対応する要素の積を合計します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/sumproduct-function"
		}],
		functionParameter: {
			array1: {
				name: "配列",
				detail: "計算の対象となる要素を含む最初の配列引数を指定します。"
			},
			array2: {
				name: "配列",
				detail: "計算の対象となる要素を含む、2 から 255 個までの配列引数を指定します。"
			}
		}
	},
	SUMSQ: {
		description: "引数の 2 乗の和 (平方和) を返します。",
		abstract: "引数の 2 乗の和 (平方和) を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/sumsq-function"
		}],
		functionParameter: {
			number1: {
				name: "数値1",
				detail: "最初の数値を二乗して合計するには、コンマ区切りの引数の代わりに単一の配列または配列への参照を使用することもできます。"
			},
			number2: {
				name: "数値2",
				detail: "二乗を合計する 2 番目の数値。この方法では、最大 255 個の番号を指定できます。"
			}
		}
	},
	SUMX2MY2: {
		description: "2 つの配列で対応する配列要素の平方差を合計します。",
		abstract: "2 つの配列で対応する配列要素の平方差を合計します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/sumx2my2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "配列1",
				detail: "対象となる一方の数値配列またはセル範囲を指定します。"
			},
			arrayY: {
				name: "配列2",
				detail: "対象となるもう一方の数値配列またはセル範囲を指定します。"
			}
		}
	},
	SUMX2PY2: {
		description: "2 つの配列で対応する配列要素の平方和を合計します。",
		abstract: "2 つの配列で対応する配列要素の平方和を合計します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/sumx2py2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "配列1",
				detail: "対象となる一方の数値配列またはセル範囲を指定します。"
			},
			arrayY: {
				name: "配列2",
				detail: "対象となるもう一方の数値配列またはセル範囲を指定します。"
			}
		}
	},
	SUMXMY2: {
		description: "2 つの配列で対応する配列要素の差を 2 乗して合計します。",
		abstract: "2 つの配列で対応する配列要素の差を 2 乗して合計します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/sumxmy2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "配列1",
				detail: "対象となる一方の数値配列またはセル範囲を指定します。"
			},
			arrayY: {
				name: "配列2",
				detail: "対象となるもう一方の数値配列またはセル範囲を指定します。"
			}
		}
	},
	TAN: {
		description: "指定された角度のタンジェントを返します。",
		abstract: "指定された角度のタンジェントを返します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/tan-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "タンジェントを求める角度をラジアンを単位として指定します。"
		} }
	},
	TANH: {
		description: "数値の双曲線正接 (ハイパーボリック タンジェント) を返します。",
		abstract: "数値の双曲線正接 (ハイパーボリック タンジェント) を返します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/tanh-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "実数を指定します。"
		} }
	},
	TRUNC: {
		description: "数値の小数部を切り捨てて、整数または指定された桁数にします。",
		abstract: "数値の小数部を切り捨てて、整数または指定された桁数にします。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/trunc-function"
		}],
		functionParameter: {
			number: {
				name: "数値",
				detail: "小数部を切り捨てる数値を指定します。"
			},
			numDigits: {
				name: "桁数",
				detail: "切り捨てを行った後の桁数を指定します。桁数の既定値は 0 (ゼロ) です。"
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/statistical/ja-JP.ts
const locale$4 = {
	AVEDEV: {
		description: "データ全体の平均値に対するそれぞれのデータの絶対偏差の平均を返します。",
		abstract: "データ全体の平均値に対するそれぞれのデータの絶対偏差の平均を返します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/avedev-function"
		}],
		functionParameter: {
			number1: {
				name: "数値 1",
				detail: "平均を求める 1 つ目の数値、セル参照、またはセル範囲を指定します。"
			},
			number2: {
				name: "数値 2",
				detail: "平均を求める追加の数値、セル参照、または範囲 (最大 255)。"
			}
		}
	},
	AVERAGE: {
		description: "引数の平均値を返します。",
		abstract: "引数の平均値を返します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/average-function"
		}],
		functionParameter: {
			number1: {
				name: "数値 1",
				detail: "平均を求める 1 つ目の数値、セル参照、またはセル範囲を指定します。"
			},
			number2: {
				name: "数値 2",
				detail: "平均を求める追加の数値、セル参照、または範囲 (最大 255)。"
			}
		}
	},
	AVERAGE_WEIGHTED: {
		description: "AVERAGE.WEIGHTED 関数は、値とそれぞれに対応するウェイトを使用して、一連の値の加重平均を求めます。",
		abstract: "AVERAGE.WEIGHTED 関数は、値とそれぞれに対応するウェイトを使用して、一連の値の加重平均を求めます。",
		links: [{
			title: "指導",
			url: "https://support.google.com/docs/answer/9084098?hl=ja"
		}],
		functionParameter: {
			values: {
				name: "値",
				detail: "平均化する値を指定します。 セルの範囲を参照することも、値を指定することもできます。"
			},
			weights: {
				name: "ウェイト",
				detail: "適用するウェイトの対応するリストを指定します。 セルの範囲を参照することも、ウェイトを指定することもできます。 ウェイトには負の値を指定できませんが、ゼロは指定できます。 少なくとも 1 つのウェイトには正の値を指定してください。 セルの範囲を指定する場合、値の範囲と同じ数の行と列がセルの範囲に含まれている必要があります。"
			},
			additionalValues: {
				name: "追加の値",
				detail: "平均化する追加の値を指定します。 追加の値は省略可能です。"
			},
			additionalWeights: {
				name: "追加のウェイト",
				detail: "適用する追加のウェイトを指定します。 追加のウェイトは省略可能です。ただし、 追加の値 を指定する場合には、各値の後に 追加のウェイト をそれぞれ 1 つ指定するようにしてください。"
			}
		}
	},
	AVERAGEA: {
		description: "数値、文字列、および論理値を含む引数の平均値を返します。",
		abstract: "数値、文字列、および論理値を含む引数の平均値を返します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/averagea-function"
		}],
		functionParameter: {
			value1: {
				name: "値 1",
				detail: "平均を求める 1 つ目の数値、セル参照、またはセル範囲を指定します。"
			},
			value2: {
				name: "値 2",
				detail: "平均を求める追加の数値、セル参照、または範囲 (最大 255)。"
			}
		}
	},
	AVERAGEIF: {
		description: "範囲内の検索条件に一致するすべてのセルの平均値 (算術平均) を返します。",
		abstract: "範囲内の検索条件に一致するすべてのセルの平均値 (算術平均) を返します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/averageif-function"
		}],
		functionParameter: {
			range: {
				name: "範囲",
				detail: "平均する 1 つまたは複数のセル (数値、または数値を含む名前、配列、セル参照) を指定します。"
			},
			criteria: {
				name: "検索条件",
				detail: "平均の対象となるセルを定義する条件を数値、式、セル参照、または文字列で指定します。 たとえば、検索条件は 32、\"32\"、\">32\"、\"Windows\"、または B4 のようになります。"
			},
			averageRange: {
				name: "平均範囲",
				detail: "平均する実際のセルを指定します。 何も指定しないと、範囲が使用されます。"
			}
		}
	},
	AVERAGEIFS: {
		description: "複数の検索条件に一致するすべてのセルの平均値 (算術平均) を返します。",
		abstract: "複数の検索条件に一致するすべてのセルの平均値 (算術平均) を返します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/averageifs-function"
		}],
		functionParameter: {
			averageRange: {
				name: "平均範囲",
				detail: "平均する 1 つまたは複数のセル (数値、または数値を含む名前、配列、セル参照) を指定します。"
			},
			criteriaRange1: {
				name: "条件範囲 1",
				detail: "条件で評価するセルのセットです。"
			},
			criteria1: {
				name: "条件 1",
				detail: "平均を計算するセルを定義するために使用されます。 たとえば、条件は 32、\"32\"、\">32\"、\"apple\"、または B4 のように表現できます。"
			},
			criteriaRange2: {
				name: "条件範囲 2",
				detail: "追加の範囲。 最大 127 の範囲のペアを入力できます。"
			},
			criteria2: {
				name: "条件 2",
				detail: "追加対応する条件です。 最大 127 条件のペアを入力できます。"
			}
		}
	},
	BETA_DIST: {
		description: "β分布の累積分布関数の値を返します。",
		abstract: "β分布の累積分布関数の値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/beta-dist-function"
		}],
		functionParameter: {
			x: {
				name: "値",
				detail: "その関数を計算するために使用される、下限値と上限値の間の値。"
			},
			alpha: {
				name: "alpha",
				detail: "分布の最初のパラメータ。"
			},
			beta: {
				name: "beta",
				detail: "分布の 2 番目のパラメーター。"
			},
			cumulative: {
				name: "累積",
				detail: "計算に使用する関数の形式を論理値で指定します。 関数形式に TRUE を指定すると累積分布関数の値が計算され、FALSE を指定すると確率密度関数の値が計算されます。"
			},
			A: {
				name: "下限",
				detail: "関数の下限。デフォルト値は 0 です。"
			},
			B: {
				name: "上限",
				detail: "関数の上限。デフォルト値は 1 です。"
			}
		}
	},
	BETA_INV: {
		description: "指定されたβ分布の累積分布関数の逆関数の値を返します。",
		abstract: "指定されたβ分布の累積分布関数の逆関数の値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/beta-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "確率",
				detail: "β分布における確率を指定します。"
			},
			alpha: {
				name: "alpha",
				detail: "分布の最初のパラメータ。"
			},
			beta: {
				name: "beta",
				detail: "分布の 2 番目のパラメーター。"
			},
			A: {
				name: "下限",
				detail: "関数の下限。デフォルト値は 0 です。"
			},
			B: {
				name: "上限",
				detail: "関数の上限。デフォルト値は 1 です。"
			}
		}
	},
	BINOM_DIST: {
		description: "二項分布の確率関数の値を返します。",
		abstract: "二項分布の確率関数の値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/binom-dist-function"
		}],
		functionParameter: {
			numberS: {
				name: "成功数",
				detail: "試行における成功数を指定します。"
			},
			trials: {
				name: "試行回数",
				detail: "独立試行の回数を指定します。"
			},
			probabilityS: {
				name: "成功率",
				detail: "各試行が成功する確率を指定します。"
			},
			cumulative: {
				name: "累積",
				detail: "計算に使用する関数の形式を論理値で指定します。 関数形式に TRUE を指定すると累積分布関数の値が計算され、FALSE を指定すると確率密度関数の値が計算されます。"
			}
		}
	},
	BINOM_DIST_RANGE: {
		description: "二項分布を使用した試行結果の確率を返します。",
		abstract: "二項分布を使用した試行結果の確率を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/binom-dist-range-function"
		}],
		functionParameter: {
			trials: {
				name: "試行回数",
				detail: "独立試行の回数を指定します。"
			},
			probabilityS: {
				name: "成功率",
				detail: "各試行が成功する確率を指定します。"
			},
			numberS: {
				name: "成功数",
				detail: "試行における成功数を指定します。"
			},
			numberS2: {
				name: "最大成功数",
				detail: "指定した場合、成功した試行回数が 成功数 と 最大成功数 の間に入る確率を返します。"
			}
		}
	},
	BINOM_INV: {
		description: "累積二項分布の値が基準値以上になるような最小の値を返します。",
		abstract: "累積二項分布の値が基準値以上になるような最小の値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/binom-inv-function"
		}],
		functionParameter: {
			trials: {
				name: "試行回数",
				detail: "ベルヌーイ試行の回数を指定します。"
			},
			probabilityS: {
				name: "成功率",
				detail: "各試行が成功する確率を指定します。"
			},
			alpha: {
				name: "目標確率",
				detail: "基準値を指定します。"
			}
		}
	},
	CHISQ_DIST: {
		description: "カイ 2 乗分布の左側確率の値を返します。",
		abstract: "カイ 2 乗分布の左側確率の値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/chisq-dist-function"
		}],
		functionParameter: {
			x: {
				name: "値",
				detail: "分布の評価に使用する値を指定します。"
			},
			degFreedom: {
				name: "自由度",
				detail: "自由度を表す数値を指定します。"
			},
			cumulative: {
				name: "累積",
				detail: "計算に使用する関数の形式を論理値で指定します。 関数形式に TRUE を指定すると累積分布関数の値が計算され、FALSE を指定すると確率密度関数の値が計算されます。"
			}
		}
	},
	CHISQ_DIST_RT: {
		description: "カイ 2 乗分布の右側確率の値を返します。",
		abstract: "カイ 2 乗分布の右側確率の値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/chisq-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "値",
				detail: "分布の評価に使用する値を指定します。"
			},
			degFreedom: {
				name: "自由度",
				detail: "自由度を表す数値を指定します。"
			}
		}
	},
	CHISQ_INV: {
		description: "カイ 2 乗分布の左側確率の逆関数の値を返します。",
		abstract: "カイ 2 乗分布の左側確率の逆関数の値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/chisq-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "確率",
				detail: "カイ 2 乗分布における確率を指定します。"
			},
			degFreedom: {
				name: "自由度",
				detail: "自由度を表す数値を指定します。"
			}
		}
	},
	CHISQ_INV_RT: {
		description: "カイ 2 乗分布の右側確率の逆関数の値を返します。",
		abstract: "カイ 2 乗分布の右側確率の逆関数の値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/chisq-inv-rt-function"
		}],
		functionParameter: {
			probability: {
				name: "確率",
				detail: "カイ 2 乗分布における確率を指定します。"
			},
			degFreedom: {
				name: "自由度",
				detail: "自由度を表す数値を指定します。"
			}
		}
	},
	CHISQ_TEST: {
		description: "カイ 2 乗 (χ2) 検定を行います。",
		abstract: "カイ 2 乗 (χ2) 検定を行います。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/chisq-test-function"
		}],
		functionParameter: {
			actualRange: {
				name: "実測値範囲",
				detail: "期待値に対する検定の実測値が入力されているデータ範囲を指定します。"
			},
			expectedRange: {
				name: "期待値範囲",
				detail: "期待値が入力されているデータ範囲を指定します。実測値と期待値では、行方向の値の合計と列方向の値の合計がそれぞれ等しくなっている必要があります。"
			}
		}
	},
	CONFIDENCE_NORM: {
		description: "正規分布を使用して、母集団の平均に対する信頼区間を求めます。",
		abstract: "正規分布を使用して、母集団の平均に対する信頼区間を求めます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/confidence-norm-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "信頼度を計算するために使用する有意水準を指定します。 信頼度は 100*(1- α)% で計算されます。つまり、α が 0.05 であるとき、信頼度は 95% になります。"
			},
			standardDev: {
				name: "標準偏差",
				detail: "データ範囲の母標準偏差を指定します。これは既知の値であると仮定されます。"
			},
			size: {
				name: "標本数",
				detail: "標本数を指定します。"
			}
		}
	},
	CONFIDENCE_T: {
		description: "スチューデントの t 分布を使用して、母集団に対する信頼区間を返します。",
		abstract: "スチューデントの t 分布を使用して、母集団に対する信頼区間を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/confidence-t-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "信頼度を計算するために使用する有意水準を指定します。 信頼度は 100*(1- α)% で計算されます。つまり、α が 0.05 であるとき、信頼度は 95% になります。"
			},
			standardDev: {
				name: "標準偏差",
				detail: "データ範囲の母標準偏差を指定します。これは既知の値であると仮定されます。"
			},
			size: {
				name: "標本数",
				detail: "標本数を指定します。"
			}
		}
	},
	CORREL: {
		description: "2 つの配列データの相関係数を返します。",
		abstract: "2 つの配列データの相関係数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/correl-function"
		}],
		functionParameter: {
			array1: {
				name: "配列1",
				detail: "セル値の最初の範囲。"
			},
			array2: {
				name: "配列2",
				detail: "セル値の 2 番目の範囲。"
			}
		}
	},
	COUNT: {
		description: "引数リストの各項目に含まれる数値の個数を返します。",
		abstract: "引数リストの各項目に含まれる数値の個数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/count-function"
		}],
		functionParameter: {
			value1: {
				name: "値 1",
				detail: "数値の個数を調べる 1 つ目の項目、セル参照、またはセル範囲。"
			},
			value2: {
				name: "値 2",
				detail: "数値をカウントする追加の項目、セル参照、または範囲は最大 255 件です。"
			}
		}
	},
	COUNTA: {
		description: "引数リストの各項目に含まれるデータの個数を返します。",
		abstract: "引数リストの各項目に含まれるデータの個数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/counta-function"
		}],
		functionParameter: {
			value1: {
				name: "値 1",
				detail: "平均を求める 1 つ目の数値、セル参照、またはセル範囲を指定します。"
			},
			value2: {
				name: "値 2",
				detail: "平均を求める追加の数値、セル参照、または範囲 (最大 255)。"
			}
		}
	},
	COUNTBLANK: {
		description: "指定された範囲に含まれる空白セルの個数を返します。",
		abstract: "指定された範囲に含まれる空白セルの個数を返します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/countblank-function"
		}],
		functionParameter: { range: {
			name: "範囲",
			detail: "空白セルの個数を求めるセル範囲を指定します。"
		} }
	},
	COUNTIF: {
		description: "指定された範囲に含まれるセルのうち、検索条件に一致するセルの個数を返します。",
		abstract: "指定された範囲に含まれるセルのうち、検索条件に一致するセルの個数を返します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/use-the-countif-function-in-microsoft-excel"
		}],
		functionParameter: {
			range: {
				name: "範囲",
				detail: "数えるセルのグループ。 範囲には、数値、配列、名前付き範囲、(数値を含む) 参照が入ります。 空の値とテキスト値は無視されます。"
			},
			criteria: {
				name: "検索条件",
				detail: "個数の計算対象となるセルを決定する条件を、数値、式、セル参照、または文字列で指定します。\nたとえば、数値として 32、比較演算子として \">32\"、セル参照として B4、文字列として \"リンゴ\" などを指定できます。\nCOUNTIF で指定できるのは、単一の検索条件のみです。 複数の検索条件を指定する場合は、COUNTIFS を使います。"
			}
		}
	},
	COUNTIFS: {
		description: "指定された範囲に含まれるセルのうち、複数の検索条件に一致するセルの個数を返します。",
		abstract: "指定された範囲に含まれるセルのうち、複数の検索条件に一致するセルの個数を返します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/countifs-function"
		}],
		functionParameter: {
			criteriaRange1: {
				name: "条件範囲 1",
				detail: "対応する条件による評価の対象となる最初の範囲を指定します。"
			},
			criteria1: {
				name: "検索条件 1",
				detail: "計算の対象となるセルを定義する条件を数値、式、セル参照、または文字列で指定します。 たとえば、条件は 32、\">32\"、B4、\"Windows\"、または \"32\" のようになります。"
			},
			criteriaRange2: {
				name: "条件範囲 2",
				detail: "追加の範囲。 最大 127 の範囲のペアを入力できます。"
			},
			criteria2: {
				name: "条件 2",
				detail: "追加対応する条件です。 最大 127 条件のペアを入力できます。"
			}
		}
	},
	COVARIANCE_P: {
		description: "母共分散 (2 組の対応するデータ間での標準偏差の積の平均値) を返します。",
		abstract: "母共分散を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/covariance-p-function"
		}],
		functionParameter: {
			array1: {
				name: "配列1",
				detail: "セル値の最初の範囲。"
			},
			array2: {
				name: "配列2",
				detail: "セル値の 2 番目の範囲。"
			}
		}
	},
	COVARIANCE_S: {
		description: "標本の共分散 (2 組の対応するデータ間での標準偏差の積の平均値) を返します。",
		abstract: "標本の共分散を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/covariance-s-function"
		}],
		functionParameter: {
			array1: {
				name: "配列1",
				detail: "セル値の最初の範囲。"
			},
			array2: {
				name: "配列2",
				detail: "セル値の 2 番目の範囲。"
			}
		}
	},
	DEVSQ: {
		description: "標本の平均値に対する各データの偏差の平方和を返します。",
		abstract: "標本の平均値に対する各データの偏差の平方和を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/devsq-function"
		}],
		functionParameter: {
			number1: {
				name: "数値1",
				detail: "偏差二乗の合計を計算するために使用される 1 番目のパラメーター。"
			},
			number2: {
				name: "数値2",
				detail: "パラメータ 2 ～ 255 は、二乗偏差の合計を計算するために使用されます。"
			}
		}
	},
	EXPON_DIST: {
		description: "指数分布関数を返します。",
		abstract: "指数分布関数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/expon-dist-function"
		}],
		functionParameter: {
			x: {
				name: "値",
				detail: "分布の評価に使用する値を指定します。"
			},
			lambda: {
				name: "lambda",
				detail: "パラメーターの値を指定します。"
			},
			cumulative: {
				name: "累積",
				detail: "計算に使用する関数の形式を論理値で指定します。 関数形式に TRUE を指定すると累積分布関数の値が計算され、FALSE を指定すると確率密度関数の値が計算されます。"
			}
		}
	},
	F_DIST: {
		description: "F 分布の確率関数の値を返します。",
		abstract: "F 分布の確率関数の値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/f-dist-function"
		}],
		functionParameter: {
			x: {
				name: "値",
				detail: "関数に代入する値を指定します。"
			},
			degFreedom1: {
				name: "自由度の分子",
				detail: "自由度の分子を指定します。"
			},
			degFreedom2: {
				name: "自由度の分母",
				detail: "自由度の分母を指定します。"
			},
			cumulative: {
				name: "累積",
				detail: "計算に使用する関数の形式を論理値で指定します。 関数形式に TRUE を指定すると累積分布関数の値が計算され、FALSE を指定すると確率密度関数の値が計算されます。"
			}
		}
	},
	F_DIST_RT: {
		description: "F 分布の右側確率関数の値を返します。",
		abstract: "F 分布の右側確率関数の値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/f-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "値",
				detail: "関数に代入する値を指定します。"
			},
			degFreedom1: {
				name: "自由度の分子",
				detail: "自由度の分子を指定します。"
			},
			degFreedom2: {
				name: "自由度の分母",
				detail: "自由度の分母を指定します。"
			}
		}
	},
	F_INV: {
		description: "F 分布の確率関数の逆関数値を返します。",
		abstract: "F 分布の確率関数の逆関数値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/f-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "確率",
				detail: "F 累積分布における確率を指定します。"
			},
			degFreedom1: {
				name: "自由度の分子",
				detail: "自由度の分子を指定します。"
			},
			degFreedom2: {
				name: "自由度の分母",
				detail: "自由度の分母を指定します。"
			}
		}
	},
	F_INV_RT: {
		description: "F 分布の右側確率関数の逆関数値を返します。",
		abstract: "F 分布の右側確率関数の逆関数値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/f-inv-rt-function"
		}],
		functionParameter: {
			probability: {
				name: "確率",
				detail: "F 累積分布における確率を指定します。"
			},
			degFreedom1: {
				name: "自由度の分子",
				detail: "自由度の分子を指定します。"
			},
			degFreedom2: {
				name: "自由度の分母",
				detail: "自由度の分母を指定します。"
			}
		}
	},
	F_TEST: {
		description: "F 検定の結果を返します。",
		abstract: "F 検定の結果を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/f-test-function"
		}],
		functionParameter: {
			array1: {
				name: "配列1",
				detail: "比較対象となる一方のデータを含む配列またはセル範囲を指定します。"
			},
			array2: {
				name: "配列2",
				detail: "比較対象となるもう一方のデータを含む配列またはセル範囲を指定します。"
			}
		}
	},
	FISHER: {
		description: "フィッシャー変換の値を返します。",
		abstract: "フィッシャー変換の値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/fisher-function"
		}],
		functionParameter: { x: {
			name: "数値",
			detail: "変換の対象となる数値を指定します。"
		} }
	},
	FISHERINV: {
		description: "フィッシャー変換の逆関数値を返します。",
		abstract: "フィッシャー変換の逆関数値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/fisherinv-function"
		}],
		functionParameter: { y: {
			name: "数値",
			detail: "逆変換の対象となる値を指定します。"
		} }
	},
	FORECAST: {
		description: "既知の値を使用し、将来の値を予測します。",
		abstract: "既知の値を使用し、将来の値を予測します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/forecast-and-forecast-linear-functions"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "予測する従属変数の値に対する独立変数の値を、数値で示します。"
			},
			knownYs: {
				name: "既知の y",
				detail: "既知の従属変数の値が入力されているセル範囲または配列を指定します。"
			},
			knownXs: {
				name: "既知の x",
				detail: "既知の独立変数の値が入力されているセル範囲または配列を指定します。"
			}
		}
	},
	FORECAST_ETS: {
		description: "指数平滑化 (ETS) アルゴリズムの AAA バージョンを使って、既存の (履歴) 値に基づき将来価値を返します。",
		abstract: "指数平滑化 (ETS) アルゴリズムの AAA バージョンを使って、既存の (履歴) 値に基づき将来価値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/forecast-ets-function"
		}],
		functionParameter: {
			targetDate: {
				name: "目標日",
				detail: "値を予測する対象のデータ ポイントです。"
			},
			values: {
				name: "値",
				detail: "予測に使用する履歴値です。"
			},
			timeline: {
				name: "タイムライン",
				detail: "一定の間隔を持つ数値の日付または時刻の独立した範囲または配列です。"
			},
			seasonality: {
				name: "季節性",
				detail: "省略可能。自動検出は 1、季節性なしは 0 を指定します。"
			},
			dataCompletion: {
				name: "データ補完",
				detail: "省略可能。欠損点を補間する場合は 1、0 として扱う場合は 0 を指定します。"
			},
			aggregation: {
				name: "集計",
				detail: "省略可能。重複するタイムスタンプの集計方法を 1 から 7 で指定します。"
			}
		}
	},
	FORECAST_ETS_CONFINT: {
		description: "特定の目標日の予測値について信頼区間を返します。",
		abstract: "特定の目標日の予測値について信頼区間を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/forecast-ets-confint-function"
		}],
		functionParameter: {
			targetDate: {
				name: "目標日",
				detail: "値を予測する対象のデータ ポイントです。"
			},
			values: {
				name: "値",
				detail: "予測に使用する履歴値です。"
			},
			timeline: {
				name: "タイムライン",
				detail: "一定の間隔を持つ数値の日付または時刻の独立した範囲または配列です。"
			},
			confidenceLevel: {
				name: "信頼水準",
				detail: "省略可能。0 から 1 の数値です。既定値は 0.95 です。"
			},
			seasonality: {
				name: "季節性",
				detail: "省略可能。自動検出は 1、季節性なしは 0 を指定します。"
			},
			dataCompletion: {
				name: "データ補完",
				detail: "省略可能。欠損点を補間する場合は 1、0 として扱う場合は 0 を指定します。"
			},
			aggregation: {
				name: "集計",
				detail: "省略可能。重複するタイムスタンプの集計方法を 1 から 7 で指定します。"
			}
		}
	},
	FORECAST_ETS_SEASONALITY: {
		description: "指定された時系列に見られる反復パターンの長さを返します。",
		abstract: "指定された時系列に見られる反復パターンの長さを返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/forecast-ets-seasonality-function"
		}],
		functionParameter: {
			values: {
				name: "値",
				detail: "予測に使用する履歴値です。"
			},
			timeline: {
				name: "タイムライン",
				detail: "一定の間隔を持つ数値の日付または時刻の独立した範囲または配列です。"
			},
			dataCompletion: {
				name: "データ補完",
				detail: "省略可能。欠損点を補間する場合は 1、0 として扱う場合は 0 を指定します。"
			},
			aggregation: {
				name: "集計",
				detail: "省略可能。重複するタイムスタンプの集計方法を 1 から 7 で指定します。"
			}
		}
	},
	FORECAST_ETS_STAT: {
		description: "時系列予測の結果として統計値を返します。",
		abstract: "時系列予測の結果として統計値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/forecast-ets-stat-function"
		}],
		functionParameter: {
			values: {
				name: "値",
				detail: "予測に使用する履歴値です。"
			},
			timeline: {
				name: "タイムライン",
				detail: "一定の間隔を持つ数値の日付または時刻の独立した範囲または配列です。"
			},
			statisticType: {
				name: "統計の種類",
				detail: "返す予測統計を 1 から 8 で指定します。"
			},
			seasonality: {
				name: "季節性",
				detail: "省略可能。自動検出は 1、季節性なしは 0 を指定します。"
			},
			dataCompletion: {
				name: "データ補完",
				detail: "省略可能。欠損点を補間する場合は 1、0 として扱う場合は 0 を指定します。"
			},
			aggregation: {
				name: "集計",
				detail: "省略可能。重複するタイムスタンプの集計方法を 1 から 7 で指定します。"
			}
		}
	},
	FORECAST_LINEAR: {
		description: "既存の値に基づいて、将来価値を返します。",
		abstract: "既存の値に基づいて、将来価値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/forecast-and-forecast-linear-functions"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "予測する従属変数の値に対する独立変数の値を、数値で示します。"
			},
			knownYs: {
				name: "既知の y",
				detail: "既知の従属変数の値が入力されているセル範囲または配列を指定します。"
			},
			knownXs: {
				name: "既知の x",
				detail: "既知の独立変数の値が入力されているセル範囲または配列を指定します。"
			}
		}
	},
	FREQUENCY: {
		description: "頻度分布を縦方向の数値の配列として返します。",
		abstract: "頻度分布を縦方向の数値の配列として返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/frequency-function"
		}],
		functionParameter: {
			dataArray: {
				name: "データ配列",
				detail: "頻度分布の計算対象となる値セットの配列、またはこのセットへの参照を指定します。 データ配列に値が含まれていない場合は、0 の配列が返されます。"
			},
			binsArray: {
				name: "区間配列",
				detail: "区間配列の値をグループ化する間隔の配列、またはこの間隔への参照を指定します。 区間配列に値が含まれていない場合は、データ配列に指定した要素の数が返されます。"
			}
		}
	},
	GAMMA: {
		description: "ガンマ関数値を返します。",
		abstract: "ガンマ関数値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/gamma-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "ガンマ関数の入力値。"
		} }
	},
	GAMMA_DIST: {
		description: "ガンマ分布関数の値を返します。",
		abstract: "ガンマ分布関数の値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/gamma-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "関数に代入する値を指定します。"
			},
			alpha: {
				name: "alpha",
				detail: "分布の最初のパラメータ。"
			},
			beta: {
				name: "beta",
				detail: "分布の 2 番目のパラメーター。"
			},
			cumulative: {
				name: "累積",
				detail: "計算に使用する関数の形式を論理値で指定します。 関数形式に TRUE を指定すると累積分布関数の値が計算され、FALSE を指定すると確率密度関数の値が計算されます。"
			}
		}
	},
	GAMMA_INV: {
		description: "ガンマ分布の累積分布関数の逆関数値を返します。",
		abstract: "ガンマ分布の累積分布関数の逆関数値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/gamma-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "確率",
				detail: "ガンマ分布における確率を指定します。"
			},
			alpha: {
				name: "alpha",
				detail: "分布の最初のパラメータ。"
			},
			beta: {
				name: "beta",
				detail: "分布の 2 番目のパラメーター。"
			}
		}
	},
	GAMMALN: {
		description: "ガンマ関数Γ(x) の値の自然対数を返します。",
		abstract: "ガンマ関数Γ(x) の値の自然対数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/gammaln-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "GAMMALN 関数に代入する値を指定します。"
		} }
	},
	GAMMALN_PRECISE: {
		description: "ガンマ関数Γ(x) の値の自然対数を返します。",
		abstract: "ガンマ関数Γ(x) の値の自然対数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/gammaln-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "GAMMALN.PRECISE 関数に代入する値を指定します。"
		} }
	},
	GAUSS: {
		description: "標準正規分布の累積分布関数より 0.5 小さい値を返します。",
		abstract: "標準正規分布の累積分布関数より 0.5 小さい値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/gauss-function"
		}],
		functionParameter: { z: {
			name: "z",
			detail: "関数に代入する値を指定します。"
		} }
	},
	GEOMEAN: {
		description: "相乗平均を返します。",
		abstract: "相乗平均を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/geomean-function"
		}],
		functionParameter: {
			number1: {
				name: "数値 1",
				detail: "相乗平均を求める 1 つ目の数値、セル参照、またはセル範囲を指定します。"
			},
			number2: {
				name: "数値 2",
				detail: "相乗平均を求める追加の数値、セル参照、または範囲 (最大 255)。"
			}
		}
	},
	GROWTH: {
		description: "指数曲線から予測される値を返します。",
		abstract: "指数曲線から予測される値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/growth-function"
		}],
		functionParameter: {
			knownYs: {
				name: "既知の y",
				detail: "既にわかっている y の値の系列であり、y = b*m^x という関係が成り立ちます。"
			},
			knownXs: {
				name: "既知の x",
				detail: "既にわかっている x の値の系列であり、y = b*m^x という関係が成り立ちます。"
			},
			newXs: {
				name: "新しい x",
				detail: "GROWTH 関数を利用して、対応する y の値を計算する新しい x の値を指定します。"
			},
			constb: {
				name: "b",
				detail: "定数 b を 1 にするかどうかを論理値で指定します。"
			}
		}
	},
	HARMEAN: {
		description: "調和平均を返します。",
		abstract: "調和平均を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/harmean-function"
		}],
		functionParameter: {
			number1: {
				name: "数値 1",
				detail: "調和平均を求める 1 つ目の数値、セル参照、またはセル範囲を指定します。"
			},
			number2: {
				name: "数値 2",
				detail: "調和平均を求める追加の数値、セル参照、または範囲 (最大 255)。"
			}
		}
	},
	HYPGEOM_DIST: {
		description: "超幾何分布関数の値を返します。",
		abstract: "超幾何分布関数の値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/hypgeom-dist-function"
		}],
		functionParameter: {
			sampleS: {
				name: "標本の成功数",
				detail: "標本内で成功する数を指定します。"
			},
			numberSample: {
				name: "標本数",
				detail: "標本数を指定します。"
			},
			populationS: {
				name: "母集団の成功数",
				detail: "母集団内で成功する数を指定します。"
			},
			numberPop: {
				name: "母集団の大きさ",
				detail: "母集団全体の数を指定します。"
			},
			cumulative: {
				name: "累積",
				detail: "計算に使用する関数の形式を論理値で指定します。 関数形式に TRUE を指定すると累積分布関数の値が計算され、FALSE を指定すると確率密度関数の値が計算されます。"
			}
		}
	},
	INTERCEPT: {
		description: "回帰直線の切片を返します。",
		abstract: "回帰直線の切片を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/intercept-function"
		}],
		functionParameter: {
			knownYs: {
				name: "既知の y",
				detail: "既知の従属変数の値が入力されているセル範囲または配列を指定します。"
			},
			knownXs: {
				name: "既知の x",
				detail: "既知の独立変数の値が入力されているセル範囲または配列を指定します。"
			}
		}
	},
	KURT: {
		description: "指定されたデータの尖度を返します。",
		abstract: "指定されたデータの尖度を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/kurt-function"
		}],
		functionParameter: {
			number1: {
				name: "数値 1",
				detail: "尖度を求める 1 つ目の数値、セル参照、またはセル範囲を指定します。"
			},
			number2: {
				name: "数値 2",
				detail: "尖度を求める追加の数値、セル参照、または範囲 (最大 255)。"
			}
		}
	},
	LARGE: {
		description: "指定されたデータの中で k 番目に大きなデータを返します。",
		abstract: "指定されたデータの中で k 番目に大きなデータを返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/large-function"
		}],
		functionParameter: {
			array: {
				name: "配列",
				detail: "抽出の対象となるデータが入力されているセル範囲または配列を指定します。"
			},
			k: {
				name: "k",
				detail: "抽出する値の、大きい方から数えた順位を数値で指定します。"
			}
		}
	},
	LINEST: {
		description: "回帰直線の係数の値を配列で返します。",
		abstract: "回帰直線の係数の値を配列で返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/linest-function"
		}],
		functionParameter: {
			knownYs: {
				name: "既知の y",
				detail: "既にわかっている y の値の系列であり、y = m*x+b という関係が成り立ちます。"
			},
			knownXs: {
				name: "既知の x",
				detail: "既にわかっている x の値の系列であり、y = m*x+b という関係が成り立ちます。"
			},
			constb: {
				name: "b",
				detail: "定数 b を 0 にするかどうかを論理値で指定します。"
			},
			stats: {
				name: "補正",
				detail: "回帰直線の補正項を追加情報として返すかどうかを論理値で指定します。"
			}
		}
	},
	LOGEST: {
		description: "回帰指数曲線の係数の値を配列で返します。",
		abstract: "回帰指数曲線の係数の値を配列で返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/logest-function"
		}],
		functionParameter: {
			knownYs: {
				name: "既知の y",
				detail: "既にわかっている y の値の系列であり、y = b*m^x という関係が成り立ちます。"
			},
			knownXs: {
				name: "既知の x",
				detail: "既にわかっている x の値の系列であり、y = b*m^x という関係が成り立ちます。"
			},
			constb: {
				name: "b",
				detail: "定数 b を 1 にするかどうかを論理値で指定します。"
			},
			stats: {
				name: "補正",
				detail: "回帰直線の補正項を追加情報として返すかどうかを論理値で指定します。"
			}
		}
	},
	LOGNORM_DIST: {
		description: "対数正規分布の累積分布関数の値を返します。",
		abstract: "対数正規分布の累積分布関数の値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/lognorm-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "関数に代入する値を指定します。"
			},
			mean: {
				name: "平均",
				detail: "対象となる分布の算術平均 (相加平均) を指定します。"
			},
			standardDev: {
				name: "標準偏差",
				detail: "対象となる分布の標準偏差を指定します。"
			},
			cumulative: {
				name: "累積",
				detail: "計算に使用する関数の形式を論理値で指定します。 関数形式に TRUE を指定すると累積分布関数の値が計算され、FALSE を指定すると確率密度関数の値が計算されます。"
			}
		}
	},
	LOGNORM_INV: {
		description: "対数正規分布の累積分布関数の逆関数値を返します。",
		abstract: "対数正規分布の累積分布関数の逆関数値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/lognorm-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "確率",
				detail: "対数正規分布における確率を指定します。"
			},
			mean: {
				name: "平均",
				detail: "対象となる分布の算術平均 (相加平均) を指定します。"
			},
			standardDev: {
				name: "標準偏差",
				detail: "対象となる分布の標準偏差を指定します。"
			}
		}
	},
	MARGINOFERROR: {
		description: "この関数は、値の範囲と信頼レベルから誤差の範囲を計算します。",
		abstract: "この関数は、値の範囲と信頼レベルから誤差の範囲を計算します。",
		links: [{
			title: "指導",
			url: "https://support.google.com/docs/answer/12487850?hl=ja"
		}],
		functionParameter: {
			range: {
				name: "範囲",
				detail: "MARGINOFERROR(A1:C3, 0.99)"
			},
			confidence: {
				name: "信頼レベル",
				detail: "0 ～ 1 の信頼レベル。"
			}
		}
	},
	MAX: {
		description: "引数リストに含まれる最大の数値を返します。",
		abstract: "引数リストに含まれる最大の数値を返します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/max-function"
		}],
		functionParameter: {
			number1: {
				name: "数値 1",
				detail: "最大の値を見つけるため、最初の数値引数を指定します。"
			},
			number2: {
				name: "数値 2",
				detail: "最大の値を見つけるため、2 ～ 255 個までの数値引数を指定します。"
			}
		}
	},
	MAXA: {
		description: "数値、文字列、および論理値を含む引数リストから最大の数値を返します。",
		abstract: "数値、文字列、および論理値を含む引数リストから最大の数値を返します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/maxa-function"
		}],
		functionParameter: {
			value1: {
				name: "値 1",
				detail: "最大の値を見つけるため、最初の数値引数を指定します。"
			},
			value2: {
				name: "値 2",
				detail: "最大の値を見つけるため、2 ～ 255 個までの数値引数を指定します。"
			}
		}
	},
	MAXIFS: {
		description: "条件セットで指定されたセルの中の最大値を返します。",
		abstract: "条件セットで指定されたセルの中の最大値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/maxifs-function"
		}],
		functionParameter: {
			maxRange: {
				name: "最大値範囲",
				detail: "最大値を求めるセルの実際の範囲です。"
			},
			criteriaRange1: {
				name: "条件範囲 1",
				detail: "条件で評価するセルのセットです。"
			},
			criteria1: {
				name: "条件 1",
				detail: "最大として評価されるセルを定義する、数値、式、またはテキストの形式での条件です。 同じ条件セットを、MINIFS、SUMIFS、および AVERAGEIFS 関数に対して使用できます。"
			},
			criteriaRange2: {
				name: "条件範囲 2",
				detail: "追加の範囲。 最大 127 の範囲のペアを入力できます。"
			},
			criteria2: {
				name: "条件 2",
				detail: "追加対応する条件です。 最大 127 条件のペアを入力できます。"
			}
		}
	},
	MEDIAN: {
		description: "引数リストに含まれる数値のメジアン (中央値) を返します。",
		abstract: "引数リストに含まれる数値のメジアン (中央値) を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/median-function"
		}],
		functionParameter: {
			number1: {
				name: "数値 1",
				detail: "中央値を求める 1 つ目の数値、セル参照、またはセル範囲を指定します。"
			},
			number2: {
				name: "数値 2",
				detail: "中央値を求める追加の数値、セル参照、または範囲 (最大 255)。"
			}
		}
	},
	MIN: {
		description: "引数リストに含まれる最小の数値を返します。",
		abstract: "引数リストに含まれる最小の数値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/min-function"
		}],
		functionParameter: {
			number1: {
				name: "数値 1",
				detail: "最小値を計算する最初の数値、セル参照、またはセル範囲。"
			},
			number2: {
				name: "数値 2",
				detail: "最小値を計算するために、最大 255 個の追加の数値、セル参照、またはセル範囲を含めることができます。"
			}
		}
	},
	MINA: {
		description: "数値、文字列、および論理値を含む引数リストから最小の数値を返します。",
		abstract: "数値、文字列、および論理値を含む引数リストから最小の数値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/mina-function"
		}],
		functionParameter: {
			value1: {
				name: "値 1",
				detail: "最小値を計算する最初の数値、セル参照、またはセル範囲。"
			},
			value2: {
				name: "値 2",
				detail: "最小値を計算するために、最大 255 個の追加の数値、セル参照、またはセル範囲を含めることができます。"
			}
		}
	},
	MINIFS: {
		description: "条件セットで指定されたセルの中の最小値を返します。",
		abstract: "条件セットで指定されたセルの中の最小値を返します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/minifs-function"
		}],
		functionParameter: {
			minRange: {
				name: "最少範囲",
				detail: "最小値を求めるセルの実際の範囲です。"
			},
			criteriaRange1: {
				name: "条件範囲 1",
				detail: "条件で評価するセルのセットです。"
			},
			criteria1: {
				name: "条件 1",
				detail: "最小として評価されるセルを定義する、数値、式、またはテキストの形式での条件です。 同じ条件セットを、MAXIFS、SUMIFS、および AVERAGEIFS 関数に対して使用できます。"
			},
			criteriaRange2: {
				name: "条件範囲 2",
				detail: "追加の範囲。 最大 127 の範囲のペアを入力できます。"
			},
			criteria2: {
				name: "条件 2",
				detail: "追加対応する条件です。 最大 127 条件のペアを入力できます。"
			}
		}
	},
	MODE_MULT: {
		description: "配列またはセル範囲として指定されたデータの中で、最も頻繁に出現する値 (最頻値) を縦方向の配列として返します。",
		abstract: "配列またはセル範囲として指定されたデータの中で、最も頻繁に出現する値 (最頻値) を縦方向の配列として返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/mode-mult-function"
		}],
		functionParameter: {
			number1: {
				name: "数値 1",
				detail: "最頻値を求める 1 つ目の数値、セル参照、またはセル範囲を指定します。"
			},
			number2: {
				name: "数値 2",
				detail: "最頻値を求める追加の数値、セル参照、または範囲 (最大 255)。"
			}
		}
	},
	MODE_SNGL: {
		description: "最も頻繁に出現する値 (最頻値) を返します。",
		abstract: "最も頻繁に出現する値 (最頻値) を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/mode-sngl-function"
		}],
		functionParameter: {
			number1: {
				name: "数値 1",
				detail: "最頻値を求める 1 つ目の数値、セル参照、またはセル範囲を指定します。"
			},
			number2: {
				name: "数値 2",
				detail: "最頻値を求める追加の数値、セル参照、または範囲 (最大 255)。"
			}
		}
	},
	NEGBINOM_DIST: {
		description: "負の二項分布の確率関数値を返します。",
		abstract: "負の二項分布の確率関数値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/negbinom-dist-function"
		}],
		functionParameter: {
			numberF: {
				name: "失敗数",
				detail: "試行が失敗する回数を指定します。"
			},
			numberS: {
				name: "成功数",
				detail: "分析のしきい値となる、試行が成功する回数を指定します。"
			},
			probabilityS: {
				name: "成功率",
				detail: "試行が成功する確率を指定します。"
			},
			cumulative: {
				name: "累積",
				detail: "計算に使用する関数の形式を論理値で指定します。 関数形式に TRUE を指定すると累積分布関数の値が計算され、FALSE を指定すると確率密度関数の値が計算されます。"
			}
		}
	},
	NORM_DIST: {
		description: "正規分布の累積分布関数の値を返します。",
		abstract: "正規分布の累積分布関数の値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/norm-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "関数に代入する値を指定します。"
			},
			mean: {
				name: "平均",
				detail: "対象となる分布の算術平均 (相加平均) を指定します。"
			},
			standardDev: {
				name: "標準偏差",
				detail: "対象となる分布の標準偏差を指定します。"
			},
			cumulative: {
				name: "累積",
				detail: "計算に使用する関数の形式を論理値で指定します。 関数形式に TRUE を指定すると累積分布関数の値が計算され、FALSE を指定すると確率密度関数の値が計算されます。"
			}
		}
	},
	NORM_INV: {
		description: "正規分布の累積分布関数の逆関数値を返します。",
		abstract: "正規分布の累積分布関数の逆関数値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/norm-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "確率",
				detail: "正規分布における確率を指定します。"
			},
			mean: {
				name: "平均",
				detail: "対象となる分布の算術平均 (相加平均) を指定します。"
			},
			standardDev: {
				name: "標準偏差",
				detail: "対象となる分布の標準偏差を指定します。"
			}
		}
	},
	NORM_S_DIST: {
		description: "標準正規分布の累積分布関数の値を返します。",
		abstract: "標準正規分布の累積分布関数の値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/norm-s-dist-function"
		}],
		functionParameter: {
			z: {
				name: "z",
				detail: "関数に代入する値を指定します。"
			},
			cumulative: {
				name: "累積",
				detail: "計算に使用する関数の形式を論理値で指定します。 関数形式に TRUE を指定すると累積分布関数の値が計算され、FALSE を指定すると確率密度関数の値が計算されます。"
			}
		}
	},
	NORM_S_INV: {
		description: "標準正規分布の累積分布関数の逆関数値を返します。",
		abstract: "標準正規分布の累積分布関数の逆関数値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/norm-s-inv-function"
		}],
		functionParameter: { probability: {
			name: "確率",
			detail: "正規分布における確率を指定します。"
		} }
	},
	PEARSON: {
		description: "ピアソンの積率相関係数 r の値を返します。",
		abstract: "ピアソンの積率相関係数 r の値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/pearson-function"
		}],
		functionParameter: {
			array1: {
				name: "配列 1",
				detail: "複数の従属変数の値が入力されているセル範囲または配列を指定します。"
			},
			array2: {
				name: "配列 2",
				detail: "複数の独立変数の値が入力されているセル範囲または配列を指定します。"
			}
		}
	},
	PERCENTILE_EXC: {
		description: "配列内での第 k 百分位数に当たる値を返します (0と1は含まれません)。",
		abstract: "配列内での第 k 百分位数に当たる値を返します (0と1は含まれません)。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/percentile-exc-function"
		}],
		functionParameter: {
			array: {
				name: "配列",
				detail: "相対的な位置を決定するデータの配列またはセル範囲を指定します。"
			},
			k: {
				name: "k",
				detail: "0 から 1 (0と1は含まれません)までのパーセント値。"
			}
		}
	},
	PERCENTILE_INC: {
		description: "配列内での第 k 百分位数に当たる値を返します (0と1が含まれています)。",
		abstract: "配列内での第 k 百分位数に当たる値を返します (0と1が含まれています)。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/percentile-inc-function"
		}],
		functionParameter: {
			array: {
				name: "配列",
				detail: "相対的な位置を決定するデータの配列またはセル範囲を指定します。"
			},
			k: {
				name: "k",
				detail: "0 から 1 (0と1が含まれています)までのパーセント値。"
			}
		}
	},
	PERCENTRANK_EXC: {
		description: "配列内での値の順位を百分率で表した値を返します (0と1は含まれません)。",
		abstract: "配列内での値の順位を百分率で表した値を返します (0と1は含まれません)。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/percentrank-exc-function"
		}],
		functionParameter: {
			array: {
				name: "配列",
				detail: "相対的な位置を決定するデータの配列またはセル範囲を指定します。"
			},
			x: {
				name: "x",
				detail: "ランクを調べる値を指定します。"
			},
			significance: {
				name: "有効桁数",
				detail: "計算結果として返される百分率の有効桁数を指定します。 有効桁数を省略すると、小数点以下第 3 位 (0.xxx) まで計算されます。"
			}
		}
	},
	PERCENTRANK_INC: {
		description: "配列内での値の順位を百分率で表した値を返します (0と1が含まれています)。",
		abstract: "配列内での値の順位を百分率で表した値を返します (0と1が含まれています)。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/percentrank-inc-function"
		}],
		functionParameter: {
			array: {
				name: "配列",
				detail: "相対的な位置を決定するデータの配列またはセル範囲を指定します。"
			},
			x: {
				name: "x",
				detail: "ランクを調べる値を指定します。"
			},
			significance: {
				name: "有効桁数",
				detail: "計算結果として返される百分率の有効桁数を指定します。 有効桁数を省略すると、小数点以下第 3 位 (0.xxx) まで計算されます。"
			}
		}
	},
	PERMUT: {
		description: "与えられた標本数から指定した個数を選択する場合の順列を返します。",
		abstract: "与えられた標本数から指定した個数を選択する場合の順列を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/permut-function"
		}],
		functionParameter: {
			number: {
				name: "総数",
				detail: "抜き取る対象の全体の数を指定します。"
			},
			numberChosen: {
				name: "抜き取り数",
				detail: "抜き取る順列わせ 1 組に含まれる項目の数を指定します。"
			}
		}
	},
	PERMUTATIONA: {
		description: "指定した数の対象から、指定された数だけ (重複あり) 抜き取る場合の順列の数を返します。",
		abstract: "指定した数の対象から、指定された数だけ (重複あり) 抜き取る場合の順列の数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/permutationa-function"
		}],
		functionParameter: {
			number: {
				name: "総数",
				detail: "抜き取る対象の全体の数を指定します。"
			},
			numberChosen: {
				name: "抜き取り数",
				detail: "抜き取る順列わせ 1 組に含まれる項目の数を指定します。"
			}
		}
	},
	PHI: {
		description: "標準正規分布の密度関数の値を返します。",
		abstract: "標準正規分布の密度関数の値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/phi-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "標準正規分布の密度を求める数値を指定します。"
		} }
	},
	POISSON_DIST: {
		description: "ポアソン確率の値を返します。",
		abstract: "ポアソン確率の値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/poisson-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "関数に代入する値を指定します。"
			},
			mean: {
				name: "平均",
				detail: "対象となる分布の算術平均 (相加平均) を指定します。"
			},
			cumulative: {
				name: "累積",
				detail: "計算に使用する関数の形式を論理値で指定します。 関数形式に TRUE を指定すると累積分布関数の値が計算され、FALSE を指定すると確率密度関数の値が計算されます。"
			}
		}
	},
	PROB: {
		description: "指定した範囲に含まれる値が上限と下限との間に収まる確率を返します。",
		abstract: "指定した範囲に含まれる値が上限と下限との間に収まる確率を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/prob-function"
		}],
		functionParameter: {
			xRange: {
				name: "数値",
				detail: "それぞれの確率値を含む数値範囲。"
			},
			probRange: {
				name: "確率",
				detail: "数値に関連付けられた確率値のセット。"
			},
			lowerLimit: {
				name: "下限",
				detail: "確率が計算される数値の下限。"
			},
			upperLimit: {
				name: "上限",
				detail: "確率が計算される数値の上限。"
			}
		}
	},
	QUARTILE_EXC: {
		description: "データセットの四分位数を返します (0と1は含まれません)。",
		abstract: "データセットの四分位数を返します (0と1は含まれません)。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/quartile-exc-function"
		}],
		functionParameter: {
			array: {
				name: "配列",
				detail: "四分位値を必要とする配列またはデータ範囲。"
			},
			quart: {
				name: "四分位値",
				detail: "返す四分位値。"
			}
		}
	},
	QUARTILE_INC: {
		description: "データセットの四分位数を返します (0と1が含まれています)。",
		abstract: "データセットの四分位数を返します (0と1が含まれています)。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/quartile-inc-function"
		}],
		functionParameter: {
			array: {
				name: "配列",
				detail: "四分位値を必要とする配列またはデータ範囲。"
			},
			quart: {
				name: "四分位値",
				detail: "返す四分位値。"
			}
		}
	},
	RANK_AVG: {
		description: "数値のリストの中で、指定した数値の序列を返します。",
		abstract: "数値のリストの中で、指定した数値の序列を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/rank-avg-function"
		}],
		functionParameter: {
			number: {
				name: "数値",
				detail: "範囲内での順位 (位置) を調べる数値を指定します。"
			},
			ref: {
				name: "数値範囲",
				detail: "数値の一覧への参照。 参照に含まれる数値以外の値は無視されます。"
			},
			order: {
				name: "順序",
				detail: "範囲内の数値を並べる方法を指定します。降順の場合は 0 または省略され、昇順の場合は 0 以外です。"
			}
		}
	},
	RANK_EQ: {
		description: "数値のリストの中で、指定した数値の序列を返します。",
		abstract: "数値のリストの中で、指定した数値の序列を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/rank-eq-function"
		}],
		functionParameter: {
			number: {
				name: "数値",
				detail: "範囲内での順位 (位置) を調べる数値を指定します。"
			},
			ref: {
				name: "数値範囲",
				detail: "数値の一覧への参照。 参照に含まれる数値以外の値は無視されます。"
			},
			order: {
				name: "順序",
				detail: "範囲内の数値を並べる方法を指定します。降順の場合は 0 または省略され、昇順の場合は 0 以外です。"
			}
		}
	},
	RSQ: {
		description: "ピアソンの積率相関係数の 2 乗値を返します。",
		abstract: "ピアソンの積率相関係数の 2 乗値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/rsq-function"
		}],
		functionParameter: {
			knownYs: {
				name: "既知の y",
				detail: "既知の従属変数の値が入力されているセル範囲または配列を指定します。"
			},
			knownXs: {
				name: "既知の x",
				detail: "既知の独立変数の値が入力されているセル範囲または配列を指定します。"
			}
		}
	},
	SKEW: {
		description: "分布の歪度を返します。",
		abstract: "分布の歪度を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/skew-function"
		}],
		functionParameter: {
			number1: {
				name: "数値 1",
				detail: "歪度を求める 1 つ目の数値、セル参照、またはセル範囲を指定します。"
			},
			number2: {
				name: "数値 2",
				detail: "歪度を求める追加の数値、セル参照、または範囲 (最大 255)。"
			}
		}
	},
	SKEW_P: {
		description: "サンプル母集団に基づいて分布の歪度を返します。",
		abstract: "サンプル母集団に基づいて分布の歪度を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/skew-p-function"
		}],
		functionParameter: {
			number1: {
				name: "数値 1",
				detail: "歪度を求める 1 つ目の数値、セル参照、またはセル範囲を指定します。"
			},
			number2: {
				name: "数値 2",
				detail: "歪度を求める追加の数値、セル参照、または範囲 (最大 255)。"
			}
		}
	},
	SLOPE: {
		description: "回帰直線の傾きを返します。",
		abstract: "回帰直線の傾きを返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/slope-function"
		}],
		functionParameter: {
			knownYs: {
				name: "既知の y",
				detail: "既知の従属変数の値が入力されているセル範囲または配列を指定します。"
			},
			knownXs: {
				name: "既知の x",
				detail: "既知の独立変数の値が入力されているセル範囲または配列を指定します。"
			}
		}
	},
	SMALL: {
		description: "指定されたデータの中で、k 番目に小さなデータを返します。",
		abstract: "指定されたデータの中で、k 番目に小さなデータを返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/small-function"
		}],
		functionParameter: {
			array: {
				name: "配列",
				detail: "抽出の対象となるデータが入力されているセル範囲または配列を指定します。"
			},
			k: {
				name: "k",
				detail: "抽出する値の小さい方から数えた順位を数値で指定します。"
			}
		}
	},
	STANDARDIZE: {
		description: "正規化された値を返します。",
		abstract: "正規化された値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/standardize-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "関数に代入する値を指定します。"
			},
			mean: {
				name: "平均",
				detail: "対象となる分布の算術平均 (相加平均) を指定します。"
			},
			standardDev: {
				name: "標準偏差",
				detail: "対象となる分布の標準偏差を指定します。"
			}
		}
	},
	STDEV_P: {
		description: "引数を母集団全体であると見なして、母集団の標準偏差を返します (論理値と文字列は除く)。",
		abstract: "引数を母集団全体と見なし、母集団の標準偏差を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/stdev-p-function"
		}],
		functionParameter: {
			number1: {
				name: "数値 1",
				detail: "母集団に対応する最初の数値引数を指定します。"
			},
			number2: {
				name: "数値 2",
				detail: "母集団に対応する引数 2 から 254 までの数値。 また、半角のカンマ (,) で区切られた引数の代わりに、単一配列や、配列への参照を指定することもできます。"
			}
		}
	},
	STDEV_S: {
		description: "引数を標本と見なし、標本に基づいて母集団の標準偏差の推定値を返します (標本の論理値と文字列は無視)。",
		abstract: "引数を正規母集団の標本と見なし、標本に基づいて母集団の標準偏差の推定値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/stdev-s-function"
		}],
		functionParameter: {
			number1: {
				name: "数値 1",
				detail: "母集団の標本に対応する最初の数値引数を指定します。 また、半角のカンマ (,) で区切られた引数の代わりに、単一配列や、配列への参照を指定することもできます。"
			},
			number2: {
				name: "数値 2",
				detail: "母集団のサンプルに対応する引数 2 ~ 254 を数値化します。 また、半角のカンマ (,) で区切られた引数の代わりに、単一配列や、配列への参照を指定することもできます。"
			}
		}
	},
	STDEVA: {
		description: "数値、文字列、および論理値を含む引数を正規母集団の標本と見なし、母集団の標準偏差の推定値を返します。",
		abstract: "数値、文字列、および論理値を含む引数を正規母集団の標本と見なし、母集団の標準偏差の推定値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/stdeva-function"
		}],
		functionParameter: {
			value1: {
				name: "値 1",
				detail: "母集団の標本に対応する最初の値引数を指定します。 また、半角のカンマ (,) で区切られた引数の代わりに、単一配列や、配列への参照を指定することもできます。"
			},
			value2: {
				name: "値 2",
				detail: "母集団のサンプルに対応する引数 2 ~ 254 を値化します。 また、半角のカンマ (,) で区切られた引数の代わりに、単一配列や、配列への参照を指定することもできます。"
			}
		}
	},
	STDEVPA: {
		description: "文字列や論理値を含む引数を母集団全体と見なして、母集団の標準偏差を計算します。",
		abstract: "数値、文字列、および論理値を含む引数を母集団全体と見なし、母集団の標準偏差を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/stdevpa-function"
		}],
		functionParameter: {
			value1: {
				name: "値 1",
				detail: "母集団に対応する最初の値引数を指定します。"
			},
			value2: {
				name: "値 2",
				detail: "母集団に対応する引数 2 から 254 までの値。 また、半角のカンマ (,) で区切られた引数の代わりに、単一配列や、配列への参照を指定することもできます。"
			}
		}
	},
	STEYX: {
		description: "回帰直線上の予測値の標準誤差を返します。",
		abstract: "回帰直線上の予測値の標準誤差を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/steyx-function"
		}],
		functionParameter: {
			knownYs: {
				name: "既知の y",
				detail: "既知の従属変数の値が入力されているセル範囲または配列を指定します。"
			},
			knownXs: {
				name: "既知の x",
				detail: "既知の独立変数の値が入力されているセル範囲または配列を指定します。"
			}
		}
	},
	T_DIST: {
		description: "スチューデントの t 確率分布を返します。",
		abstract: "スチューデントの t 確率分布を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/t-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "分布の数値を計算する必要があります。"
			},
			degFreedom: {
				name: "自由度",
				detail: "自由度の数を表す整数。"
			},
			cumulative: {
				name: "累積",
				detail: "計算に使用する関数の形式を論理値で指定します。 関数形式に TRUE を指定すると累積分布関数の値が計算され、FALSE を指定すると確率密度関数の値が計算されます。"
			}
		}
	},
	T_DIST_2T: {
		description: "スチューデントの t 確率分布 (両側) を返します。",
		abstract: "スチューデントの t 確率分布 (両側) を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/t-dist-2t-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "分布の数値を計算する必要があります。"
			},
			degFreedom: {
				name: "自由度",
				detail: "自由度の数を表す整数。"
			}
		}
	},
	T_DIST_RT: {
		description: "スチューデントの t 確率分布 (右側) を返します。",
		abstract: "スチューデントの t 確率分布 (右側) を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/t-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "分布の数値を計算する必要があります。"
			},
			degFreedom: {
				name: "自由度",
				detail: "自由度の数を表す整数。"
			}
		}
	},
	T_INV: {
		description: "スチューデントの t 確率分布の逆関数値を返します。",
		abstract: "スチューデントの t 確率分布の逆関数値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/t-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "確率",
				detail: "スチューデントの t 分布に従う確率を指定します。"
			},
			degFreedom: {
				name: "自由度",
				detail: "自由度の数を表す整数。"
			}
		}
	},
	T_INV_2T: {
		description: "スチューデントの t 確率分布 (両側) の逆関数値を返します。",
		abstract: "スチューデントの t 確率分布 (両側) の逆関数値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/t-inv-2t-function"
		}],
		functionParameter: {
			probability: {
				name: "確率",
				detail: "スチューデントの t 分布に従う確率を指定します。"
			},
			degFreedom: {
				name: "自由度",
				detail: "自由度の数を表す整数。"
			}
		}
	},
	T_TEST: {
		description: "スチューデントの t 分布に従う確率を返します。",
		abstract: "スチューデントの t 分布に従う確率を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/t-test-function"
		}],
		functionParameter: {
			array1: {
				name: "配列1",
				detail: "比較対象となる一方のデータを含む配列またはセル範囲を指定します。"
			},
			array2: {
				name: "配列2",
				detail: "比較対象となるもう一方のデータを含む配列またはセル範囲を指定します。"
			},
			tails: {
				name: "尾部の特性",
				detail: "片側分布を計算するか、両側分布を計算するかを、数値で指定します。 尾部に 1 を指定すると片側分布の値が計算されます。 尾部に 2 を指定すると両側分布の値が計算されます。"
			},
			type: {
				name: "検定の種類",
				detail: "実行する t 検定の種類を数値で指定します。"
			}
		}
	},
	TREND: {
		description: "回帰直線による予測値を配列で返します。",
		abstract: "回帰直線による予測値を配列で返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/trend-function"
		}],
		functionParameter: {
			knownYs: {
				name: "既知の y",
				detail: "既にわかっている y の値の系列であり、y = m*x+b という関係が成り立ちます。"
			},
			knownXs: {
				name: "既知の x",
				detail: "既にわかっている x の値の系列であり、y = m*x+b という関係が成り立ちます。"
			},
			newXs: {
				name: "新しい x",
				detail: "TREND 関数を利用して、対応する y の値を計算する新しい x の値を指定します。"
			},
			constb: {
				name: "b",
				detail: "定数 b を 0 にするかどうかを論理値で指定します。"
			}
		}
	},
	TRIMMEAN: {
		description: "データの中間項の平均を返します。",
		abstract: "データの中間項の平均を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/trimmean-function"
		}],
		functionParameter: {
			array: {
				name: "配列",
				detail: "対象となる値の配列または範囲。"
			},
			percent: {
				name: "割合",
				detail: "計算から排除する端数のデータ ポイント数。"
			}
		}
	},
	VAR_P: {
		description: "引数を母集団全体と見なし、母集団の分散 (標本分散) を返します (母集団内の論理値と文字列は無視します)。",
		abstract: "引数を母集団全体と見なし、母集団の分散 (標本分散) を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/var-p-function"
		}],
		functionParameter: {
			number1: {
				name: "数値 1",
				detail: "母集団に対応する最初の数値引数を指定します。"
			},
			number2: {
				name: "数値 2",
				detail: "母集団に対応する数値引数 2 ~ 254。"
			}
		}
	},
	VAR_S: {
		description: "引数を正規母集団の標本と見なし、標本に基づいて母集団の分散の推定値 (不偏分散) を返します (標本内の論理値と文字列は無視します)。",
		abstract: "標本に基づいて母集団の分散の推定値 (不偏分散) を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/var-s-function"
		}],
		functionParameter: {
			number1: {
				name: "数値 1",
				detail: "母集団の標本に対応する最初の数値引数を指定します。"
			},
			number2: {
				name: "数値 2",
				detail: "母集団のサンプルに対応する引数 2 ~ 254 を数値化します。"
			}
		}
	},
	VARA: {
		description: "数値、文字列、および論理値を含む引数を正規母集団の標本と見なし、標本に基づいて母集団の分散の推定値 (不偏分散) を返します。",
		abstract: "数値、文字列、および論理値を含む引数を正規母集団の標本と見なし、標本に基づいて母集団の分散の推定値 (不偏分散) を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/vara-function"
		}],
		functionParameter: {
			value1: {
				name: "値 1",
				detail: "母集団の標本に対応する最初の値引数を指定します。"
			},
			value2: {
				name: "値 2",
				detail: "母集団のサンプルに対応する引数 2 ~ 254 を値化します。"
			}
		}
	},
	VARPA: {
		description: "数値、文字列、および論理値を含む引数を母集団全体と見なし、母集団の分散 (標本分散) を返します。",
		abstract: "数値、文字列、および論理値を含む引数を母集団全体と見なし、母集団の分散 (標本分散) を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/varpa-function"
		}],
		functionParameter: {
			value1: {
				name: "値 1",
				detail: "母集団に対応する最初の値引数を指定します。"
			},
			value2: {
				name: "値 2",
				detail: "母集団に対応する値引数 2 ~ 254。"
			}
		}
	},
	WEIBULL_DIST: {
		description: "ワイブル分布の値を返します。",
		abstract: "ワイブル分布の値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/weibull-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "関数に代入する値を指定します。"
			},
			alpha: {
				name: "alpha",
				detail: "分布の最初のパラメータ。"
			},
			beta: {
				name: "beta",
				detail: "分布の 2 番目のパラメーター。"
			},
			cumulative: {
				name: "累積",
				detail: "計算に使用する関数の形式を論理値で指定します。 関数形式に TRUE を指定すると累積分布関数の値が計算され、FALSE を指定すると確率密度関数の値が計算されます。"
			}
		}
	},
	Z_TEST: {
		description: "z 検定の片側 P 値を返します。",
		abstract: "z 検定の片側 P 値を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/z-test-function"
		}],
		functionParameter: {
			array: {
				name: "配列",
				detail: "x の検定対象となるデータを含む数値配列またはセル範囲を指定します。"
			},
			x: {
				name: "x",
				detail: "検定する値を指定します。"
			},
			sigma: {
				name: "標準偏差",
				detail: "母集団全体に基づく標準偏差を指定します。 省略すると、標本に基づく標準偏差が使用されます。"
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/text/ja-JP.ts
const locale$3 = {
	ASC: {
		description: "全角 (2 バイト) の英数カナ文字を半角 (1 バイト) の文字に変換します。",
		abstract: "全角 (2 バイト) の英数カナ文字を半角 (1 バイト) の文字に変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/asc-function"
		}],
		functionParameter: { text: {
			name: "文字列",
			detail: "文字列または変換する文字列を含むセルの参照を指定します。 文字列に全角文字が含まれない場合は、文字列は変換されません。"
		} }
	},
	ARRAYTOTEXT: {
		description: "指定した範囲のテキスト値の配列を返します。",
		abstract: "指定した範囲のテキスト値の配列を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/arraytotext-function"
		}],
		functionParameter: {
			array: {
				name: "配列",
				detail: "文字列として返す配列。"
			},
			format: {
				name: "書式",
				detail: "返されるデータの形式。次の 2 つの値のいずれかを指定できます。\n0 既定。 読みやすい簡潔な形式。 \n1 エスケープ文字と行の区切り文字を含む厳格なフォーマット。 数式バーに入力したときに解析できる文字列を生成します。 返された文字列は、ブーリアン、数値、エラーを除き、引用符でカプセル化されます。"
			}
		}
	},
	BAHTTEXT: {
		description: "数値を四捨五入し、バーツ通貨書式を設定した文字列に変換します。",
		abstract: "数値を四捨五入し、バーツ通貨書式を設定した文字列に変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/bahttext-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "文字列に変換する数値、数値を含むセルの参照、または戻り値が数値となる数式を指定します。"
		} }
	},
	CHAR: {
		description: "数値で指定された文字を返します。",
		abstract: "数値で指定された文字を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/char-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "変換する文字を表す 1 ～ 255 の範囲内の数値を指定します。 文字は、コンピューターで使用されている文字セットから返されます。"
		} }
	},
	CLEAN: {
		description: "文字列から印刷できない文字を削除します。",
		abstract: "文字列から印刷できない文字を削除します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/clean-function"
		}],
		functionParameter: { text: {
			name: "文字列",
			detail: "印刷できない文字を削除するワークシートの文字データを指定します。"
		} }
	},
	CODE: {
		description: "テキスト文字列内の先頭文字の数値コードを返します。",
		abstract: "テキスト文字列内の先頭文字の数値コードを返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/code-function"
		}],
		functionParameter: { text: {
			name: "文字列",
			detail: "先頭文字のコード番号を調べる文字列を指定します。"
		} }
	},
	CONCAT: {
		description: "複数の範囲や文字列からのテキストを結合しますが、区切り記号または IgnoreEmpty 引数は提供しません。",
		abstract: "複数の範囲や文字列からのテキストを結合しますが、区切り記号または IgnoreEmpty 引数は提供しません",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/concat-function"
		}],
		functionParameter: {
			text1: {
				name: "文字列 1",
				detail: "結合するテキスト項目。 文字列またはセルの範囲などの文字列の配列。"
			},
			text2: {
				name: "文字列 2",
				detail: "結合する追加のテキスト項目。 テキスト項目には最大 253 のテキスト引数がを設定可能です。 各引数には、文字列、またはセルの範囲などの文字列の配列を指定できます。"
			}
		}
	},
	CONCATENATE: {
		description: "複数の文字列を結合して 1 つの文字列にまとめます。",
		abstract: "複数の文字列を結合して 1 つの文字列にまとめます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/concatenate-function"
		}],
		functionParameter: {
			text1: {
				name: "文字列 1",
				detail: "結合する最初の項目です。 この項目には、テキスト値、数字、セル参照のいずれかを指定できます。"
			},
			text2: {
				name: "文字列 2",
				detail: "結合するその他の文字列です。 最大で 255 個の項目、合計 8,192 文字を指定できます。"
			}
		}
	},
	DBCS: {
		description: "文字列内の半角 (1 バイト) の英数カナ文字を全角 (2 バイト) の文字に変換します。",
		abstract: "文字列内の半角 (1 バイト) の英数カナ文字を全角 (2 バイト) の文字に変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/dbcs-function"
		}],
		functionParameter: { text: {
			name: "文字列",
			detail: "文字列または変換する文字列を含むセルの参照を指定します。 文字列に半角の英数カナ文字が含まれない場合は、文字列は変更されません。"
		} }
	},
	DOLLAR: {
		description: "通貨形式を使用して数値をテキストに変換します",
		abstract: "通貨形式を使用して数値をテキストに変換します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/dollar-function"
		}],
		functionParameter: {
			number: {
				name: "数値",
				detail: "数値、数値を含むセルの参照、または結果が数値になる数式を指定します。"
			},
			decimals: {
				name: "桁数",
				detail: "小数点以下の桁数を指定します。 負の値の場合、数値は小数点の左側に丸められます。 桁数を省略すると、2 を指定したと見なされます。"
			}
		}
	},
	EXACT: {
		description: "2 つの文字列が等しいかどうかを判定します。",
		abstract: "2 つの文字列が等しいかどうかを判定します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/exact-function"
		}],
		functionParameter: {
			text1: {
				name: "文字列1",
				detail: "一方の文字列を指定します。"
			},
			text2: {
				name: "文字列2",
				detail: "もう一方の文字列を指定します。"
			}
		}
	},
	FIND: {
		description: "指定された文字列を他の文字列の中で検索します。大文字と小文字は区別されます。",
		abstract: "指定された文字列を他の文字列の中で検索します。大文字と小文字は区別されます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/this-article-has-been-retired"
		}],
		functionParameter: {
			findText: {
				name: "検索文字列",
				detail: "「検索するテキスト」で検索する文字列。"
			},
			withinText: {
				name: "検索するテキスト",
				detail: "「検索文字列」を検索する最初のテキスト。"
			},
			startNum: {
				name: "開始位置",
				detail: "「検索するテキスト」内の検索を開始する文字位置。省略した場合は、値 1 が想定されます。"
			}
		}
	},
	FINDB: {
		description: "指定された文字列を他の文字列の中で検索します。大文字と小文字は区別されます。",
		abstract: "指定された文字列を他の文字列の中で検索します。大文字と小文字は区別されます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/this-article-has-been-retired"
		}],
		functionParameter: {
			findText: {
				name: "検索文字列",
				detail: "「検索するテキスト」で検索する文字列。"
			},
			withinText: {
				name: "検索するテキスト",
				detail: "「検索文字列」を検索する最初のテキスト。"
			},
			startNum: {
				name: "開始位置",
				detail: "「検索するテキスト」内の検索を開始する文字位置。省略した場合は、値 1 が想定されます。"
			}
		}
	},
	FIXED: {
		description: "数値を四捨五入し、書式設定した文字列に変換します。",
		abstract: "数値を四捨五入し、書式設定した文字列に変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/fixed-function"
		}],
		functionParameter: {
			number: {
				name: "数値",
				detail: "四捨五入して文字列に変換する数値を指定します。"
			},
			decimals: {
				name: "桁数",
				detail: "小数点以下の桁数を指定します。 負の値の場合、数値は小数点の左側に丸められます。 桁数を省略すると、2 を指定したと見なされます。"
			},
			noCommas: {
				name: "桁区切り",
				detail: "返される文字列をカンマ (,) で桁区切りするかどうかを論理値で指定します。TRUE を指定すると、桁区切りは行われません。"
			}
		}
	},
	LEFT: {
		description: "文字列の先頭 (左端) から指定された文字数の文字を返します。",
		abstract: "文字列の先頭 (左端) から指定された文字数の文字を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/left-function"
		}],
		functionParameter: {
			text: {
				name: "文字列",
				detail: "取り出す文字を含む文字列を指定します。"
			},
			numChars: {
				name: "文字数",
				detail: "取り出す文字数 (文字列の左端からの文字数) を指定します。"
			}
		}
	},
	LEFTB: {
		description: "文字列の先頭 (左端) から指定された文字数の文字を返します。",
		abstract: "文字列の先頭 (左端) から指定された文字数の文字を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/left-function"
		}],
		functionParameter: {
			text: {
				name: "文字列",
				detail: "取り出す文字を含む文字列を指定します。"
			},
			numBytes: {
				name: "バイト数",
				detail: "取り出す文字数をバイト数で指定します。"
			}
		}
	},
	LEN: {
		description: "は、文字列の文字数を返します。",
		abstract: "は、文字列の文字数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/len-function"
		}],
		functionParameter: { text: {
			name: "文字列",
			detail: "文字数またはバイト数を調べる文字列を指定します。 スペースは文字として数えられます。"
		} }
	},
	LENB: {
		description: "は、文字列のバイト数を返します。",
		abstract: "は、文字列のバイト数を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/len-function"
		}],
		functionParameter: { text: {
			name: "文字列",
			detail: "文字数またはバイト数を調べる文字列を指定します。 スペースは文字として数えられます。"
		} }
	},
	LOWER: {
		description: "文字列に含まれる英字をすべて小文字に変換します。",
		abstract: "文字列に含まれる英字をすべて小文字に変換します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/lower-function"
		}],
		functionParameter: { text: {
			name: "文字列",
			detail: "小文字に変換する文字列を指定します。"
		} }
	},
	MID: {
		description: "文字列の任意の位置から指定された文字数の文字を返します。",
		abstract: "文字列の任意の位置から指定された文字数の文字を返します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/mid-function"
		}],
		functionParameter: {
			text: {
				name: "文字列",
				detail: "取り出す文字を含む文字列を指定します。"
			},
			startNum: {
				name: "開始位置",
				detail: "文字列から取り出す先頭文字の位置を数値で指定します。"
			},
			numChars: {
				name: "文字数",
				detail: "取り出す文字数を指定します。"
			}
		}
	},
	MIDB: {
		description: "文字列の任意の位置から指定された文字数の文字を返します。",
		abstract: "文字列の任意の位置から指定された文字数の文字を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/mid-function"
		}],
		functionParameter: {
			text: {
				name: "文字列",
				detail: "取り出す文字を含む文字列を指定します。"
			},
			startNum: {
				name: "開始位置",
				detail: "文字列から取り出す先頭文字の位置を数値で指定します。"
			},
			numBytes: {
				name: "バイト数",
				detail: "取り出す文字数をバイト数で指定します。"
			}
		}
	},
	NUMBERSTRING: {
		description: "数字を中国語の文字列に変換する",
		abstract: "数字を中国語の文字列に変換する",
		links: [{
			title: "指導",
			url: "https://www.wps.cn/learning/course/detail/id/340.html?chan=pc_kdocs_function"
		}],
		functionParameter: {
			number: {
				name: "数値",
				detail: "中国語の文字列に変換される数値。"
			},
			type: {
				name: "タイプ",
				detail: "返される結果のタイプ。\n1. 中国語小文字 \n2. 中国語の文字を大文字にする \n3. 漢字の読み書き"
			}
		}
	},
	NUMBERVALUE: {
		description: "文字列をロケールに依存しない方法で数値に変換します。",
		abstract: "文字列をロケールに依存しない方法で数値に変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/numbervalue-function"
		}],
		functionParameter: {
			text: {
				name: "文字列",
				detail: "数値に変換するテキスト。"
			},
			decimalSeparator: {
				name: "小数点区切り文字",
				detail: "結果の整数部分と小数部を区切るために使用される文字。"
			},
			groupSeparator: {
				name: "グループ区切り文字",
				detail: "の数値のグループを区切るために使用される文字。"
			}
		}
	},
	PHONETIC: {
		description: "文字列からふりがなを抽出します。",
		abstract: "文字列からふりがなを抽出します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/phonetic-function"
		}],
		functionParameter: { reference: {
			name: "参照",
			detail: "ふりがなを取り出す文字列、セル範囲、または参照です。"
		} }
	},
	PROPER: {
		description: "文字列に含まれる英単語の先頭文字だけを大文字に変換します。",
		abstract: "文字列に含まれる英単語の先頭文字だけを大文字に変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/proper-function"
		}],
		functionParameter: { text: {
			name: "文字列",
			detail: "引用符で囲まれたテキスト、テキストを返す数式、または部分的に大文字にするテキストを含むセルへの参照。"
		} }
	},
	REGEXEXTRACT: {
		description: "正規表現と最初に一致する部分文字列を抽出します。",
		abstract: "正規表現と最初に一致する部分文字列を抽出します。",
		links: [{
			title: "指導",
			url: "https://support.google.com/docs/answer/3098244?hl=ja"
		}],
		functionParameter: {
			text: {
				name: "テキスト",
				detail: "ヒント: 上の例では 2 列のデータが返されます（最初に「値」、2 番目に「抽出」）。"
			},
			regularExpression: {
				name: "正規表現",
				detail: "この正規表現に一致する最初のテキスト部分が返されます。"
			}
		}
	},
	REGEXMATCH: {
		description: "正規表現に一致するテキストの一部を検索します。",
		abstract: "正規表現に一致するテキストの一部を検索します。",
		links: [{
			title: "指導",
			url: "https://support.google.com/docs/answer/3098292?hl=ja"
		}],
		functionParameter: {
			text: {
				name: "テキスト",
				detail: "正規表現に対して検証するテキストです。"
			},
			regularExpression: {
				name: "正規表現",
				detail: "テキストを検証する正規表現です。"
			}
		}
	},
	REGEXREPLACE: {
		description: "正規表現を使用して、テキスト文字列の一部を別のテキスト文字列に置き換えます。",
		abstract: "正規表現を使用して、テキスト文字列の一部を別のテキスト文字列に置き換えます。",
		links: [{
			title: "指導",
			url: "https://support.google.com/docs/answer/3098245?hl=ja"
		}],
		functionParameter: {
			text: {
				name: "テキスト",
				detail: "一部を置換する対象のテキストです。"
			},
			regularExpression: {
				name: "正規表現",
				detail: "この正規表現に一致するテキスト内のすべてのインスタンスが置き換えられます。"
			},
			replacement: {
				name: "置換",
				detail: "元のテキストに挿入されるテキストです。"
			}
		}
	},
	REPLACE: {
		description: "文字列中の指定された数の文字を他の文字に置き換えます。",
		abstract: "文字列中の指定された数の文字を他の文字に置き換えます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/replace-function"
		}],
		functionParameter: {
			oldText: {
				name: "文字列",
				detail: "置き換えを行う文字列を指定します。"
			},
			startNum: {
				name: "開始位置",
				detail: "置換されるテキスト内の最初の文字の位置。"
			},
			numChars: {
				name: "文字数",
				detail: "置換す文字数を指定します。"
			},
			newText: {
				name: "置換文字列",
				detail: "文字列の一部と置き換える文字列を指定します。"
			}
		}
	},
	REPLACEB: {
		description: "文字列中の指定された数の文字を他の文字に置き換えます。",
		abstract: "文字列中の指定された数の文字を他の文字に置き換えます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/replace-function"
		}],
		functionParameter: {
			oldText: {
				name: "文字列",
				detail: "置き換えを行う文字列を指定します。"
			},
			startNum: {
				name: "開始位置",
				detail: "置換されるテキスト内の最初の文字の位置。"
			},
			numBytes: {
				name: "バイト数",
				detail: "置換す文字数をバイト数で指定します。"
			},
			newText: {
				name: "置換文字列",
				detail: "文字列の一部と置き換える文字列を指定します。"
			}
		}
	},
	REPT: {
		description: "文字列を指定された回数だけ繰り返して表示します。",
		abstract: "文字列を指定された回数だけ繰り返して表示します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/rept-function"
		}],
		functionParameter: {
			text: {
				name: "文字列",
				detail: "繰り返す文字列を指定します。"
			},
			numberTimes: {
				name: "繰り返し回数",
				detail: "文字列を繰り返す回数を、正の数値で指定します。"
			}
		}
	},
	RIGHT: {
		description: "文字列の末尾 (右端) から指定された文字数の文字を返します。",
		abstract: "文字列の末尾 (右端) から指定された文字数の文字を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/right-function"
		}],
		functionParameter: {
			text: {
				name: "文字列",
				detail: "取り出す文字を含む文字列を指定します。"
			},
			numChars: {
				name: "文字数",
				detail: "取り出す文字数 (文字列の末尾からの文字数) を指定します。"
			}
		}
	},
	RIGHTB: {
		description: "文字列の末尾 (右端) から指定された文字数の文字を返します。",
		abstract: "文字列の末尾 (右端) から指定された文字数の文字を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/right-function"
		}],
		functionParameter: {
			text: {
				name: "文字列",
				detail: "取り出す文字を含む文字列を指定します。"
			},
			numBytes: {
				name: "バイト数",
				detail: "取り出す文字数をバイト数で指定します。"
			}
		}
	},
	SEARCH: {
		description: "指定された文字列を他の文字列の中で検索します。大文字と小文字は区別されません。",
		abstract: "指定された文字列を他の文字列の中で検索します。大文字と小文字は区別されません。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/search-function"
		}],
		functionParameter: {
			findText: {
				name: "検索文字列",
				detail: "「検索するテキスト」で検索する文字列。"
			},
			withinText: {
				name: "検索するテキスト",
				detail: "「検索文字列」を検索する最初のテキスト。"
			},
			startNum: {
				name: "開始位置",
				detail: "「検索するテキスト」内の検索を開始する文字位置。省略した場合は、値 1 が想定されます。"
			}
		}
	},
	SEARCHB: {
		description: "指定された文字列を他の文字列の中で検索します。大文字と小文字は区別されません。",
		abstract: "指定された文字列を他の文字列の中で検索します。大文字と小文字は区別されません。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/search-function"
		}],
		functionParameter: {
			findText: {
				name: "検索文字列",
				detail: "「検索するテキスト」で検索する文字列。"
			},
			withinText: {
				name: "検索するテキスト",
				detail: "「検索文字列」を検索する最初のテキスト。"
			},
			startNum: {
				name: "開始位置",
				detail: "「検索するテキスト」内の検索を開始する文字位置。省略した場合は、値 1 が想定されます。"
			}
		}
	},
	SUBSTITUTE: {
		description: "文字列中の指定された文字を他の文字に置き換えます。",
		abstract: "文字列中の指定された文字を他の文字に置き換えます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/substitute-function"
		}],
		functionParameter: {
			text: {
				name: "文字列",
				detail: "文字を置き換えるテキストを含むセルへのテキストまたは参照。"
			},
			oldText: {
				name: "検索文字列",
				detail: "置換する文字列を指定します。"
			},
			newText: {
				name: "置換文字列",
				detail: "検索文字列を検索して置き換える文字列を指定します。"
			},
			instanceNum: {
				name: "置換対象を指定",
				detail: "検索文字列に含まれるどの文字列を置換文字列と置き換えるかを指定します。 置換対象を指定した場合、検索文字列中の置換対象文字列だけが置き換えられます。 指定しない場合、検索文字列中のすべての文字列が置換文字列に置き換えられます。"
			}
		}
	},
	T: {
		description: "引数を文字列に変換します。",
		abstract: "引数を文字列に変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/t-function"
		}],
		functionParameter: { value: {
			name: "値",
			detail: "テストする値を指定します。"
		} }
	},
	TEXT: {
		description: "数値を書式設定した文字列に変換します。",
		abstract: "数値を書式設定した文字列に変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/text-function"
		}],
		functionParameter: {
			value: {
				name: "値",
				detail: "テキストに変換する数値。"
			},
			formatText: {
				name: "数値形式",
				detail: "指定された値に適用する書式を定義するテキスト文字列。"
			}
		}
	},
	TEXTAFTER: {
		description: "指定された文字または文字列の後に発生するテキストを返します",
		abstract: "指定された文字または文字列の後に発生するテキストを返します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/textafter-function"
		}],
		functionParameter: {
			text: {
				name: "文字",
				detail: "検索対象のテキスト。ワイルドカード文字は使用できません。"
			},
			delimiter: {
				name: "デリミタ",
				detail: "抽出した後のポイントをマークするテキスト。"
			},
			instanceNum: {
				name: "インスタンス番号",
				detail: "テキストを抽出する区切り記号のインスタンス。"
			},
			matchMode: {
				name: "マッチモード",
				detail: "テキスト検索で大文字と小文字を区別するかどうかを指定します。既定では大文字と小文字が区別されます。"
			},
			matchEnd: {
				name: "マッチ終了",
				detail: "テキストの末尾を区切り記号として扱います。既定では、テキストは完全一致です。"
			},
			ifNotFound: {
				name: "比類のない価値",
				detail: "一致するものが見つからない場合に返される値。既定では、#N/A が返されます。"
			}
		}
	},
	TEXTBEFORE: {
		description: "指定された文字または文字列の前に発生するテキストを返します",
		abstract: "指定された文字または文字列の前に発生するテキストを返します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/textbefore-function"
		}],
		functionParameter: {
			text: {
				name: "文字",
				detail: "検索対象のテキスト。ワイルドカード文字は使用できません。"
			},
			delimiter: {
				name: "デリミタ",
				detail: "抽出した後のポイントをマークするテキスト。"
			},
			instanceNum: {
				name: "インスタンス番号",
				detail: "テキストを抽出する区切り記号のインスタンス。"
			},
			matchMode: {
				name: "マッチモード",
				detail: "テキスト検索で大文字と小文字を区別するかどうかを指定します。既定では大文字と小文字が区別されます。"
			},
			matchEnd: {
				name: "マッチ終了",
				detail: "テキストの末尾を区切り記号として扱います。既定では、テキストは完全一致です。"
			},
			ifNotFound: {
				name: "比類のない価値",
				detail: "一致するものが見つからない場合に返される値。既定では、#N/A が返されます。"
			}
		}
	},
	TEXTJOIN: {
		description: "テキスト：複数の範囲または文字列のテキストを結合します",
		abstract: "テキスト：複数の範囲または文字列のテキストを結合します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/textjoin-function"
		}],
		functionParameter: {
			delimiter: {
				name: "区切り記号",
				detail: "空のテキスト文字列、または二重引用符で囲まれた 1 つ以上の文字、または有効なテキスト文字列への参照。"
			},
			ignoreEmpty: {
				name: "空のセルは無視",
				detail: "TRUE の場合、空のセルは無視されます。"
			},
			text1: {
				name: "文字列1",
				detail: "結合するテキスト項目。 文字列またはセルの範囲などの文字列の配列。"
			},
			text2: {
				name: "文字列2",
				detail: "結合する追加のテキスト項目。 テキスト項目には、text1 を含め、最大 252 のテキスト引数を設定できます。 各引数には、文字列、またはセルの範囲などの文字列の配列を指定できます。"
			}
		}
	},
	TEXTSPLIT: {
		description: "列区切り記号と行区切り記号を使用してテキスト文字列を分割します",
		abstract: "列区切り記号と行区切り記号を使用してテキスト文字列を分割します",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/textsplit-function"
		}],
		functionParameter: {
			text: {
				name: "文字",
				detail: "分割するテキスト。"
			},
			colDelimiter: {
				name: "列デリミタ",
				detail: "列を分割する文字または文字列。"
			},
			rowDelimiter: {
				name: "行デリミタ",
				detail: "行を分割する文字または文字列。"
			},
			ignoreEmpty: {
				name: "空のセルを無視する",
				detail: "空のセルを無視するかどうか。デフォルトはFALSEです。"
			},
			matchMode: {
				name: "マッチモード",
				detail: "テキスト内の区切り文字の一致を検索します。デフォルトでは、大文字と小文字が区別された照合が行われます。"
			},
			padWith: {
				name: "塗りつぶし値",
				detail: "パディングに使用する値。デフォルトでは、#N/A が使用されます。"
			}
		}
	},
	TRIM: {
		description: "各単語間のスペースは 1 つ残し、不要なスペースをすべて削除します。",
		abstract: "文字列から余分なスペースを削除します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/trim-function"
		}],
		functionParameter: { text: {
			name: "文字列",
			detail: "余分なスペースを削除するテキストを指定します。"
		} }
	},
	UNICHAR: {
		description: "指定された数値により参照される Unicode 文字を返します。",
		abstract: "指定された数値により参照される Unicode 文字を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/unichar-function"
		}],
		functionParameter: { number: {
			name: "数値",
			detail: "文字に対応する Unicode 番号を指定します。"
		} }
	},
	UNICODE: {
		description: "文字列の最初の文字に対応する番号 (コード ポイント) を返します。",
		abstract: "文字列の最初の文字に対応する番号 (コード ポイント) を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/unicode-function"
		}],
		functionParameter: { text: {
			name: "文字列",
			detail: "Unicode 値を求める文字を指定します。"
		} }
	},
	UPPER: {
		description: "文字列に含まれる英字をすべて大文字に変換します。",
		abstract: "文字列に含まれる英字をすべて大文字に変換します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/upper-function"
		}],
		functionParameter: { text: {
			name: "文字列",
			detail: "大文字に変換する文字列を指定します。"
		} }
	},
	VALUE: {
		description: "文字列を数値に変換して返します。",
		abstract: "文字列を数値に変換して返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/value-function"
		}],
		functionParameter: { text: {
			name: "文字列",
			detail: "文字列を半角の二重引用符 (\") で囲んで指定するか、または変換する文字列を含むセル参照を指定します。"
		} }
	},
	VALUETOTEXT: {
		description: "指定した値からテキストを返します。",
		abstract: "指定した値からテキストを返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/valuetotext-function"
		}],
		functionParameter: {
			value: {
				name: "値",
				detail: "文字列として返す値。"
			},
			format: {
				name: "書式",
				detail: "返されるデータの形式。次の 2 つの値のいずれかを指定できます。\n0 既定。 読みやすい簡潔な形式。 \n1 エスケープ文字と行の区切り文字を含む厳格なフォーマット。 数式バーに入力したときに解析できる文字列を生成します。 返された文字列は、ブーリアン、数値、エラーを除き、引用符でカプセル化されます。"
			}
		}
	},
	CALL: {
		description: "ダイナミック リンク ライブラリまたはコード リソースで、プロシージャを呼び出します。",
		abstract: "ダイナミック リンク ライブラリまたはコード リソースで、プロシージャを呼び出します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/call-function"
		}],
		functionParameter: {
			moduleText: {
				name: "モジュール文字列",
				detail: "プロシージャを含むダイナミック リンク ライブラリ (DLL) の名前です。"
			},
			procedure: {
				name: "プロシージャ",
				detail: "DLL 内のプロシージャ名または序数です。"
			},
			typeText: {
				name: "型文字列",
				detail: "引数と戻り値のデータ型を指定する文字列です。"
			},
			argument1: {
				name: "引数 1",
				detail: "省略可能。プロシージャに渡す最初の引数です。"
			}
		}
	},
	EUROCONVERT: {
		description: "数値からユーロ通貨への換算、ユーロ通貨からユーロ通貨使用国の現地通貨への換算、またはユーロ通貨を基にしてユーロ通貨を使用する参加国間の通貨の換算を行います。",
		abstract: "数値からユーロ通貨への換算、ユーロ通貨からユーロ通貨使用国の現地通貨への換算、またはユーロ通貨を基にしてユーロ通貨を使用する参加国間の通貨の換算を行います。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/euroconvert-function"
		}],
		functionParameter: {
			number: {
				name: "数値",
				detail: "換算する通貨の値です。"
			},
			source: {
				name: "換算元",
				detail: "換算元通貨のコードです。"
			},
			target: {
				name: "換算先",
				detail: "換算先通貨のコードです。"
			},
			fullPrecision: {
				name: "完全精度",
				detail: "通貨固有の丸め規則を使用するかどうかを指定する論理値です。"
			},
			triangulationPrecision: {
				name: "三角換算精度",
				detail: "省略可能。ユーロを介した中間換算の有効桁数です。"
			}
		}
	},
	REGISTER_ID: {
		description: "あらかじめ登録されている、指定のダイナミック リンク ライブラリ (DLL) またはコード リソースのレジスタ ID を返します。",
		abstract: "あらかじめ登録されている、指定のダイナミック リンク ライブラリ (DLL) またはコード リソースのレジスタ ID を返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/register-id-function"
		}],
		functionParameter: {
			moduleText: {
				name: "モジュール文字列",
				detail: "プロシージャを含む DLL またはコード リソースの名前です。"
			},
			procedure: {
				name: "プロシージャ",
				detail: "プロシージャ名または序数です。"
			},
			typeText: {
				name: "型文字列",
				detail: "省略可能。引数と戻り値のデータ型を指定する文字列です。"
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/univer/ja-JP.ts
const locale$2 = {};

//#endregion
//#region src/locale/function-list/web/ja-JP.ts
const locale$1 = {
	ENCODEURL: {
		description: "ENCODEURL 関数は、URL でエンコードされた文字列を返し、特定の英数字以外の文字をパーセント記号 (%) と 16 進数に置き換えます。",
		abstract: "ENCODEURL 関数は、URL でエンコードされた文字列を返し、特定の英数字以外の文字をパーセント記号 (%) と 16 進数に置き換えます。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/encodeurl-function"
		}],
		functionParameter: { text: {
			name: "文字列",
			detail: "URL エンコードされる文字列"
		} }
	},
	FILTERXML: {
		description: "FILTERXML 関数は、指定された xpath を使用して XML コンテンツから特定のデータを返します。",
		abstract: "FILTERXML 関数は、指定された xpath を使用して XML コンテンツから特定のデータを返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/filterxml-function"
		}],
		functionParameter: {
			xml: {
				name: "xml",
				detail: "有効な XML 形式の文字列。"
			},
			xpath: {
				name: "xpath",
				detail: "標準の XPath 形式の文字列。"
			}
		}
	},
	WEBSERVICE: {
		description: "WEBSERVICE 関数は、インターネットまたはイントラネット上の Web サービスからデータを返します。",
		abstract: "WEBSERVICE 関数は、インターネットまたはイントラネット上の Web サービスからデータを返します。",
		links: [{
			title: "指導",
			url: "https://support.microsoft.com/ja-jp/excel/functions/webservice-function"
		}],
		functionParameter: { url: {
			name: "url",
			detail: "Web サービスの URL。"
		} }
	}
};

//#endregion
//#region src/locale/ja-JP.ts
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