//#region src/locale/function-list/array/zh-CN.ts
const locale$15 = {
	ARRAY_CONSTRAIN: {
		description: "以给定值约束数组结果的大小。",
		abstract: "以给定值约束数组结果的大小。",
		links: [{
			title: "教学",
			url: "https://support.google.com/docs/answer/3267036?hl=zh-Hans"
		}],
		functionParameter: {
			inputRange: {
				name: "数组",
				detail: "要约束的范围。"
			},
			numRows: {
				name: "行数",
				detail: "结果中应包含的行数。"
			},
			numCols: {
				name: "列数",
				detail: "结果中应包含的列数。"
			}
		}
	},
	FLATTEN: {
		description: "将一个或多个范围中的所有值合并到单列。",
		abstract: "将一个或多个范围中的所有值合并到单列。",
		links: [{
			title: "教学",
			url: "https://support.google.com/docs/answer/10307761?hl=zh-Hans"
		}],
		functionParameter: {
			range1: {
				name: "范围1",
				detail: "要合并的第一个范围。"
			},
			range2: {
				name: "范围2",
				detail: "[可选] 可重复 要合并的其他范围。"
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/compatibility/zh-CN.ts
const locale$14 = {
	BETADIST: {
		description: "返回累积 beta 概率密度函数。 Beta 分布通常用于研究样本中一定部分的变化情况，例如，人们一天中看电视的时间比率。",
		abstract: "返回累积 beta 概率密度函数。 Beta 分布通常用于研究样本中一定部分的变化情况，例如，人们一天中看电视的时间比率。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/betadist-function"
		}],
		functionParameter: {
			x: {
				name: "值",
				detail: "必需。 用来计算其函数的值，介于值 A 和 B 之间。"
			},
			alpha: {
				name: "alpha",
				detail: "必填。 分布参数。"
			},
			beta: {
				name: "beta",
				detail: "必填。 分布参数。"
			},
			A: {
				name: "下限",
				detail: "可选。 x 所属区间的下界。"
			},
			B: {
				name: "上限",
				detail: "可选。 x 所属区间的上界。"
			}
		}
	},
	BETAINV: {
		description: "返回指定 beta 分布的累积 beta 概率密度函数的反函数。 也就是说，如果 probability = BETADIST(x,...)，则 BETAINV(probability,...) = x。 beta 分布函数可用于项目设计，在已知预期的完成时间和变化参数后，模拟可能的完成时间。",
		abstract: "返回指定 beta 分布的累积 beta 概率密度函数的反函数。 也就是说，如果 probability = BETADIST(x,...)，则 BETAINV(probability,...) = x。 beta 分布函数可用于项目设计，在已知预期的完成时间和变化参数后，模拟可能的完成时间。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/betainv-function"
		}],
		functionParameter: {
			probability: {
				name: "概率",
				detail: "必填。 与 beta 分布相关的概率。"
			},
			alpha: {
				name: "alpha",
				detail: "必填。 分布参数。"
			},
			beta: {
				name: "beta",
				detail: "必填。 分布参数。"
			},
			A: {
				name: "下限",
				detail: "可选。 x 所属区间的下界。"
			},
			B: {
				name: "上限",
				detail: "可选。 x 所属区间的上界。"
			}
		}
	},
	BINOMDIST: {
		description: "返回一元二项式分布的概率。 BINOMDIST 用于处理固定次数的试验或实验问题，前提是任意试验的结果仅为成功或失败两种情况，实验是独立实验，且在整个试验过程中成功的概率固定不变。 例如，BINOMDIST 可以计算三个即将出生的婴儿中两个是男孩的概率。",
		abstract: "返回一元二项式分布的概率。 BINOMDIST 用于处理固定次数的试验或实验问题，前提是任意试验的结果仅为成功或失败两种情况，实验是独立实验，且在整个试验过程中成功的概率固定不变。 例如，BINOMDIST 可以计算三个即将出生的婴儿中两个是男孩的概率。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/binomdist-function"
		}],
		functionParameter: {
			numberS: {
				name: "成功次数",
				detail: "必填。 试验的成功次数。"
			},
			trials: {
				name: "试验次数",
				detail: "必填。 独立试验次数。"
			},
			probabilityS: {
				name: "成功概率",
				detail: "必填。 每次试验成功的概率。"
			},
			cumulative: {
				name: "累积",
				detail: "必填。 决定函数形式的逻辑值。 如果 cumulative 为 TRUE，则 BINOMDIST 返回累积分布函数，即最多存在 number_s 次成功的概率；如果为 FALSE，则返回概率密度函数，即存在 number_s 次成功的概率。"
			}
		}
	},
	CHIDIST: {
		description: "返回 χ2 分布的右尾概率。 χ2 分布与 χ2 测试相关联。 使用 χ2 测试可比较观察值和预期值。 例如，某项遗传学实验可能假设下一代植物将呈现出某一组颜色。 通过使用该函数比较观察结果和理论值，可以确定初始假设是否有效。",
		abstract: "返回 χ2 分布的右尾概率。 χ2 分布与 χ2 测试相关联。 使用 χ2 测试可比较观察值和预期值。 例如，某项遗传学实验可能假设下一代植物将呈现出某一组颜色。 通过使用该函数比较观察结果和理论值，可以确定初始假设是否有效。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/chidist-function"
		}],
		functionParameter: {
			x: {
				name: "值",
				detail: "必需。 用来计算分布的数值。"
			},
			degFreedom: {
				name: "自由度",
				detail: "必填。 自由度数。"
			}
		}
	},
	CHIINV: {
		description: "返回 χ2 分布的右尾概率的反函数。 如果 probability = CHIDIST(x,...)，则 CHIINV(probability,...) = x。 使用此函数可比较观察结果与理论值，以确定初始假设是否有效。",
		abstract: "返回 χ2 分布的右尾概率的反函数。 如果 probability = CHIDIST(x,...)，则 CHIINV(probability,...) = x。 使用此函数可比较观察结果与理论值，以确定初始假设是否有效。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/chiinv-function"
		}],
		functionParameter: {
			probability: {
				name: "概率",
				detail: "必填。 与 χ2 分布相关联的概率。"
			},
			degFreedom: {
				name: "自由度",
				detail: "必填。 自由度数。"
			}
		}
	},
	CHITEST: {
		description: "返回独立性检验值。 CHITEST 返回卡方 (χ2) 分布的统计值和相应的自由度数。 您可以使用 χ2 检验值确定假设结果是否经过实验验证。",
		abstract: "返回独立性检验值。 CHITEST 返回卡方 (χ2) 分布的统计值和相应的自由度数。 您可以使用 χ2 检验值确定假设结果是否经过实验验证。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/chitest-function"
		}],
		functionParameter: {
			actualRange: {
				name: "观察范围",
				detail: "必填。 包含观察值的数据区域，用于检验预期值。"
			},
			expectedRange: {
				name: "预期范围",
				detail: "必填。 包含行列汇总的乘积与总计值之比率的数据区域。"
			}
		}
	},
	CONFIDENCE: {
		description: "使用正态分布返回总体平均值的置信区间。",
		abstract: "使用正态分布返回总体平均值的置信区间。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/confidence-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "必填。 用来计算置信水平的显著性水平。 置信水平等于 100*(1 - alpha)%，亦即，如果 alpha 为 0.05，则置信水平为 95%。"
			},
			standardDev: {
				name: "总体标准偏差",
				detail: "必填。 数据区域的总体标准偏差，假定为已知。"
			},
			size: {
				name: "样本大小",
				detail: "必填。 样本大小。"
			}
		}
	},
	COVAR: {
		description: "返回协方差，即两个数据集中每个数据点对的偏差积的平均值。",
		abstract: "返回协方差，即两个数据集中每个数据点对的偏差积的平均值。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/covar-function"
		}],
		functionParameter: {
			array1: {
				name: "数组1",
				detail: "必填。 整数的第一个单元格区域。"
			},
			array2: {
				name: "数组2",
				detail: "必填。 整数的第二个单元格区域。"
			}
		}
	},
	CRITBINOM: {
		description: "返回一个数值，它是使得累积二项式分布的函数值大于等于临界值的最小整数。 此函数可用于质量检验。 例如，使用 CRITBINOM 来决定装配线上整批产品达到检验合格所允许的最多残次品个数。",
		abstract: "返回一个数值，它是使得累积二项式分布的函数值大于等于临界值的最小整数。 此函数可用于质量检验。 例如，使用 CRITBINOM 来决定装配线上整批产品达到检验合格所允许的最多残次品个数。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/critbinom-function"
		}],
		functionParameter: {
			trials: {
				name: "试验次数",
				detail: "必填。 贝努利试验次数。"
			},
			probabilityS: {
				name: "成功概率",
				detail: "必填。 一次试验中成功的概率。"
			},
			alpha: {
				name: "目标概率",
				detail: "必填。 临界值。"
			}
		}
	},
	EXPONDIST: {
		description: "返回指数分布。 使用 EXPONDIST 可以建立事件之间的时间间隔模型，如银行自动提款机支付一次现金所花费的时间。 例如，可通过 EXPONDIST 来确定这一过程最长持续一分钟的发生概率。",
		abstract: "返回指数分布。 使用 EXPONDIST 可以建立事件之间的时间间隔模型，如银行自动提款机支付一次现金所花费的时间。 例如，可通过 EXPONDIST 来确定这一过程最长持续一分钟的发生概率。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/expondist-function"
		}],
		functionParameter: {
			x: {
				name: "值",
				detail: "必需。 函数值。"
			},
			lambda: {
				name: "lambda",
				detail: "必填。 参数值。"
			},
			cumulative: {
				name: "累积",
				detail: "必填。 逻辑值，用于指定指数函数的形式。 如果 cumulative 为 TRUE，则 EXPONDIST 返回累积分布函数；如果为 FALSE，则返回概率密度函数。"
			}
		}
	},
	FDIST: {
		description: "返回两个数据集的（右尾）F 概率分布（变化程度）。 使用此函数可以确定两组数据是否存在变化程度上的不同。 例如，分析进入中学的男生、女生的考试分数，来确定女生分数的变化程度是否与男生不同。",
		abstract: "返回两个数据集的（右尾）F 概率分布（变化程度）。 使用此函数可以确定两组数据是否存在变化程度上的不同。 例如，分析进入中学的男生、女生的考试分数，来确定女生分数的变化程度是否与男生不同。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/fdist-function"
		}],
		functionParameter: {
			x: {
				name: "值",
				detail: "必需。 用来计算函数的值。"
			},
			degFreedom1: {
				name: "分子自由度",
				detail: "必填。 分子自由度。"
			},
			degFreedom2: {
				name: "分母自由度",
				detail: "必填。 分母自由度。"
			}
		}
	},
	FINV: {
		description: "返回（右尾）F 概率分布函数的反函数值。 如果 p = FDIST(x,...)，则 FINV(p,...) = x。",
		abstract: "返回（右尾）F 概率分布函数的反函数值。 如果 p = FDIST(x,...)，则 FINV(p,...) = x。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/finv-function"
		}],
		functionParameter: {
			probability: {
				name: "概率",
				detail: "必填。 F 累积分布的概率值。"
			},
			degFreedom1: {
				name: "分子自由度",
				detail: "必填。 分子自由度。"
			},
			degFreedom2: {
				name: "分母自由度",
				detail: "必填。 分母自由度。"
			}
		}
	},
	FTEST: {
		description: "返回 F 测试的结果。 F 测试返回 array1 和 array2 中的方差没有明显差异的双尾概率。 使用此函数可确定两个示例是否有不同的方差。 例如，给定公立和私立学校的测验分数，可以检验各学校间测验分数的差别程度。",
		abstract: "返回 F 测试的结果。 F 测试返回 array1 和 array2 中的方差没有明显差异的双尾概率。 使用此函数可确定两个示例是否有不同的方差。 例如，给定公立和私立学校的测验分数，可以检验各学校间测验分数的差别程度。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/ftest-function"
		}],
		functionParameter: {
			array1: {
				name: "数组1",
				detail: "必填。 第一个数组或数据区域。"
			},
			array2: {
				name: "数组2",
				detail: "必填。 第二个数组或数据区域。"
			}
		}
	},
	GAMMADIST: {
		description: "返回伽玛分布函数的函数值。 可以使用此函数来研究呈斜分布的变量。 伽玛分布通常用于排队分析。",
		abstract: "返回伽玛分布函数的函数值。 可以使用此函数来研究呈斜分布的变量。 伽玛分布通常用于排队分析。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/gammadist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "必需。 用来计算分布的数值。"
			},
			alpha: {
				name: "alpha",
				detail: "必填。 分布参数。"
			},
			beta: {
				name: "beta",
				detail: "必填。 分布参数。 如果 beta = 1，则 GAMMADIST 返回标准伽玛分布。"
			},
			cumulative: {
				name: "累积",
				detail: "必填。 决定函数形式的逻辑值。 如果 cumulative 为 TRUE，则 GAMMADIST 返回累积分布函数；如果为 FALSE，则返回概率密度函数。"
			}
		}
	},
	GAMMAINV: {
		description: "返回伽玛累积分布函数的反函数值。 如果 p = GAMMADIST(x,...)，则 GAMMAINV(p,...) = x。 使用此函数可以研究有可能呈斜分布的变量。",
		abstract: "返回伽玛累积分布函数的反函数值。 如果 p = GAMMADIST(x,...)，则 GAMMAINV(p,...) = x。 使用此函数可以研究有可能呈斜分布的变量。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/gammainv-function"
		}],
		functionParameter: {
			probability: {
				name: "概率",
				detail: "必填。 伽玛分布相关的概率。"
			},
			alpha: {
				name: "alpha",
				detail: "必填。 分布参数。"
			},
			beta: {
				name: "beta",
				detail: "必填。 分布参数。 如果 beta = 1，则 GAMMAINV 返回标准伽玛分布。"
			}
		}
	},
	HYPGEOMDIST: {
		description: "返回超几何分布。 如果已知样本量、总体成功次数和总体大小，则 HYPGEOMDIST 返回样本取得已知成功次数的概率。 HYPGEOMDIST 用于处理以下的有限总体问题，在该有限总体中，每次观察结果或为成功或为失败，并且已知样本量的每个子集的选取是等可能的。",
		abstract: "返回超几何分布。 如果已知样本量、总体成功次数和总体大小，则 HYPGEOMDIST 返回样本取得已知成功次数的概率。 HYPGEOMDIST 用于处理以下的有限总体问题，在该有限总体中，每次观察结果或为成功或为失败，并且已知样本量的每个子集的选取是等可能的。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/hypgeomdist-function"
		}],
		functionParameter: {
			sampleS: {
				name: "样本成功次数",
				detail: "必填。 样本中成功的次数。"
			},
			numberSample: {
				name: "样本大小",
				detail: "必填。 样本量。"
			},
			populationS: {
				name: "总体成功次数",
				detail: "必填。 总体中成功的次数。"
			},
			numberPop: {
				name: "总体大小",
				detail: "必填。 总体大小。"
			}
		}
	},
	LOGINV: {
		description: "返回 x 的对数累积分布函数的反函数值，此处的 ln(x) 是服从参数 mean 和 standard_dev 的正态分布。 如果 p = LOGNORMDIST(x,...)，则 LOGINV(p,...) = x。",
		abstract: "返回 x 的对数累积分布函数的反函数值，此处的 ln(x) 是服从参数 mean 和 standard_dev 的正态分布。 如果 p = LOGNORMDIST(x,...)，则 LOGINV(p,...) = x。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/loginv-function"
		}],
		functionParameter: {
			probability: {
				name: "概率",
				detail: "必填。 与对数分布相关的概率。"
			},
			mean: {
				name: "平均值",
				detail: "必填。 ln(x) 的平均值。"
			},
			standardDev: {
				name: "标准偏差",
				detail: "必填。 ln(x) 的标准偏差。"
			}
		}
	},
	LOGNORMDIST: {
		description: "返回 x 的对数累积分布函数的函数值，此处的 ln(x) 是服从参数 mean 和 standard_dev 的正态分布。 使用此函数可以分析经过对数变换的数据。",
		abstract: "返回 x 的对数累积分布函数的函数值，此处的 ln(x) 是服从参数 mean 和 standard_dev 的正态分布。 使用此函数可以分析经过对数变换的数据。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/lognormdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "必需。 用来计算函数的值。"
			},
			mean: {
				name: "平均值",
				detail: "必填。 ln(x) 的平均值。"
			},
			standardDev: {
				name: "标准偏差",
				detail: "必填。 ln(x) 的标准偏差。"
			}
		}
	},
	MODE: {
		description: "假设你想要找出 30 年内在关键湿地的鸟类计数样本中发现的最常见的鸟类物种数量，或者想要找出非高峰时段电话支持中心最常发生的电话次数。 若要计算一组数字的模式，请使用 MODE 函数。",
		abstract: "假设你想要找出 30 年内在关键湿地的鸟类计数样本中发现的最常见的鸟类物种数量，或者想要找出非高峰时段电话支持中心最常发生的电话次数。 若要计算一组数字的模式，请使用 MODE 函数。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/mode-function"
		}],
		functionParameter: {
			number1: {
				name: "数值 1",
				detail: "必填。 要计算其众数的第一个数字参数。"
			},
			number2: {
				name: "数值 2",
				detail: "选。 要计算其众数的 2 到 255 个数字参数。 也可以用单一数组或对某个数组的引用来代替用逗号分隔的参数。"
			}
		}
	},
	NEGBINOMDIST: {
		description: "返回负二项式分布。 当成功概率为常量 probability_s 时，NEGBINOMDIST 返回在达到 number_s 次成功之前，出现 number_f 次失败的概率。 此函数与二项式分布相似，只是它的成功次数固定，试验次数为变量。 与二项式分布相同的是，二者均假定试验是独立的。",
		abstract: "返回负二项式分布。 当成功概率为常量 probability_s 时，NEGBINOMDIST 返回在达到 number_s 次成功之前，出现 number_f 次失败的概率。 此函数与二项式分布相似，只是它的成功次数固定，试验次数为变量。 与二项式分布相同的是，二者均假定试验是独立的。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/negbinomdist-function"
		}],
		functionParameter: {
			numberF: {
				name: "失败次数",
				detail: "必填。 失败的次数。"
			},
			numberS: {
				name: "成功次数",
				detail: "必填。 成功次数的阈值。"
			},
			probabilityS: {
				name: "成功概率",
				detail: "必填。 成功的概率。"
			}
		}
	},
	NORMDIST: {
		description: "NORMDIST 函数返回指定平均值和标准偏差的正态分布。 此函数在统计（包括假设测试）中具有广泛的应用。",
		abstract: "NORMDIST 函数返回指定平均值和标准偏差的正态分布。 此函数在统计（包括假设测试）中具有广泛的应用。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/normdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "必需。 要为其分配的值"
			},
			mean: {
				name: "平均值",
				detail: "必填。 分布的算术平均值"
			},
			standardDev: {
				name: "标准偏差",
				detail: "必填。 分布的标准偏差"
			},
			cumulative: {
				name: "累积",
				detail: "必填。 决定函数形式的逻辑值。 如果 cumulative 为 TRUE，则 NORMDIST 返回累积分布函数;如果 cumulative 为 FALSE，则返回概率质量函数。"
			}
		}
	},
	NORMINV: {
		description: "返回指定平均值和标准偏差的正态累积分布函数的反函数值。",
		abstract: "返回指定平均值和标准偏差的正态累积分布函数的反函数值。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/norminv-function"
		}],
		functionParameter: {
			probability: {
				name: "概率",
				detail: "必填。 对应于正态分布的概率。"
			},
			mean: {
				name: "平均值",
				detail: "必填。 分布的算术平均值。"
			},
			standardDev: {
				name: "标准偏差",
				detail: "必填。 分布的标准偏差。"
			}
		}
	},
	NORMSDIST: {
		description: "返回标准正态累积分布函数的函数值。 该分布的平均值为 0（零），标准偏差为 1。 可以使用此函数代替标准正态曲线面积表。",
		abstract: "返回标准正态累积分布函数的函数值。 该分布的平均值为 0（零），标准偏差为 1。 可以使用此函数代替标准正态曲线面积表。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/normsdist-function"
		}],
		functionParameter: { z: {
			name: "z",
			detail: "必需。 需要计算其分布的数值。"
		} }
	},
	NORMSINV: {
		description: "返回标准正态累积分布函数的反函数值。 该分布的平均值为 0，标准偏差为 1。",
		abstract: "返回标准正态累积分布函数的反函数值。 该分布的平均值为 0，标准偏差为 1。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/normsinv-function"
		}],
		functionParameter: { probability: {
			name: "概率",
			detail: "必填。 对应于正态分布的概率。"
		} }
	},
	PERCENTILE: {
		description: "返回区域中数值的第 k 个百分点的值。 可以使用此函数来确定接受的阈值。 例如，可以决定检查得分高于第 90 个百分点的候选人。",
		abstract: "返回区域中数值的第 k 个百分点的值。 可以使用此函数来确定接受的阈值。 例如，可以决定检查得分高于第 90 个百分点的候选人。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/percentile-function"
		}],
		functionParameter: {
			array: {
				name: "数组",
				detail: "必填。 定义相对位置的数组或数据区域。"
			},
			k: {
				name: "k",
				detail: "必需。 0 到 1 之间的百分点值，包含 0 和 1。"
			}
		}
	},
	PERCENTRANK: {
		description: "PERCENTRANK 函数以数据集的百分比形式返回数据集中某个值的排名，实质上是整个数据集中某个值的相对位置。 例如，可以使用 PERCENTRANK 来确定个人测试分数在同一测试的所有分数字段中的地位。",
		abstract: "PERCENTRANK 函数以数据集的百分比形式返回数据集中某个值的排名，实质上是整个数据集中某个值的相对位置。 例如，可以使用 PERCENTRANK 来确定个人测试分数在同一测试的所有分数字段中的地位。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/percentrank-function"
		}],
		functionParameter: {
			array: {
				name: "数组",
				detail: "必填。 (或预定义数组的数据范围) 确定百分比秩的数值。"
			},
			x: {
				name: "x",
				detail: "必需。 想要了解数组中排名的值。"
			},
			significance: {
				name: "有效位数",
				detail: "选。 用于标识返回的百分比值的有效位数的值。 如果省略，则 PERCENTRANK 使用 3 位小数 (0.xxx)。"
			}
		}
	},
	POISSON: {
		description: "返回泊松分布。 泊松分布的一个常见应用是预测特定时间内的事件数，例如 1 分钟内到达收费停车场的汽车数。",
		abstract: "返回泊松分布。 泊松分布的一个常见应用是预测特定时间内的事件数，例如 1 分钟内到达收费停车场的汽车数。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/poisson-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "必需。 事件数。"
			},
			mean: {
				name: "平均值",
				detail: "必填。 期望值。"
			},
			cumulative: {
				name: "累积",
				detail: "必填。 一逻辑值，确定所返回的概率分布的形式。 如果 cumulative 为 TRUE，则 POISSON 返回发生的随机事件数在零（含零）和 x（含 x）之间的累积泊松概率；如果为 FALSE，则 POISSON 返回发生的事件数正好是 x 的泊松概率密度函数。"
			}
		}
	},
	QUARTILE: {
		description: "返回一组数据的四分位点。 四分位点通常用于销售和调查数据，以对总体进行分组。 例如，您可以使用 QUARTILE 查找总体中前 25% 的收入值。",
		abstract: "返回一组数据的四分位点。 四分位点通常用于销售和调查数据，以对总体进行分组。 例如，您可以使用 QUARTILE 查找总体中前 25% 的收入值。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/quartile-function"
		}],
		functionParameter: {
			array: {
				name: "数组",
				detail: "必填。 要求得四分位数值的数组或数字型单元格区域。"
			},
			quart: {
				name: "四分位值",
				detail: "必填。 指定返回哪一个值。"
			}
		}
	},
	RANK: {
		description: "返回一列数字的数字排位。 数字的排名是其相对于列表中其他值的大小。 (如果要对列表进行排序，则数字的排名将是其位置。)",
		abstract: "返回一列数字的数字排位。 数字的排名是其相对于列表中其他值的大小。 (如果要对列表进行排序，则数字的排名将是其位置。)",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/rank-function"
		}],
		functionParameter: {
			number: {
				name: "数值",
				detail: "必填。 要找到其排位的数字。"
			},
			ref: {
				name: "数字列表",
				detail: "必填。 对数字列表的引用。 Ref 中的非数字值会被忽略。"
			},
			order: {
				name: "排位方式",
				detail: "选。 一个指定数字排位方式的数字。 如果 order 为 0（零）或省略，Microsoft Excel 对数字的排位是基于 ref 为按照降序排列的列表。 如果 order 不为零，Microsoft Excel 对数字的排位是基于 ref 为按照升序排列的列表。"
			}
		}
	},
	STDEV: {
		description: "根据样本估计标准偏差。 标准偏差可以测量值在平均值（中值）附近分布的范围大小。",
		abstract: "根据样本估计标准偏差。 标准偏差可以测量值在平均值（中值）附近分布的范围大小。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/stdev-function"
		}],
		functionParameter: {
			number1: {
				name: "数值 1",
				detail: "必填。 对应于总体样本的第一个数值参数。"
			},
			number2: {
				name: "数值 2",
				detail: "选。 对应于总体样本的 2 到 255 个数值参数。 也可以用单一数组或对某个数组的引用来代替用逗号分隔的参数。"
			}
		}
	},
	STDEVP: {
		description: "根据作为参数给定的整个总体计算标准偏差。 标准偏差可以测量值在平均值（中值）附近分布的范围大小。",
		abstract: "根据作为参数给定的整个总体计算标准偏差。 标准偏差可以测量值在平均值（中值）附近分布的范围大小。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/stdevp-function"
		}],
		functionParameter: {
			number1: {
				name: "数值 1",
				detail: "必填。 对应于总体的第一个数值参数。"
			},
			number2: {
				name: "数值 2",
				detail: "选。 对应于总体的 2 到 255 个数值参数。 也可以用单一数组或对某个数组的引用来代替用逗号分隔的参数。"
			}
		}
	},
	TDIST: {
		description: "返回学生 t 分布的百分点（概率），其中，数字值 (x) 是用来计算百分点的 t 的计算值。 t 分布用于小型样本数据集的假设检验。 可以使用该函数代替 t 分布的临界值表。",
		abstract: "返回学生 t 分布的百分点（概率），其中，数字值 (x) 是用来计算百分点的 t 的计算值。 t 分布用于小型样本数据集的假设检验。 可以使用该函数代替 t 分布的临界值表。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/tdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "必需。 需要计算分布的数值。"
			},
			degFreedom: {
				name: "自由度",
				detail: "必填。 一个表示自由度数的整数。"
			},
			tails: {
				name: "尾部特性",
				detail: "必填。 指定返回的分布函数是单尾分布还是双尾分布。 如果 Tails = 1，则 TDIST 返回单尾分布。 如果Tails = 2，则 TDIST 返回双尾分布。"
			}
		}
	},
	TINV: {
		description: "返回学生 t 分布的双尾反函数。",
		abstract: "返回学生 t 分布的双尾反函数。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/tinv-function"
		}],
		functionParameter: {
			probability: {
				name: "概率",
				detail: "必填。 与双尾学生 t 分布相关的概率。"
			},
			degFreedom: {
				name: "自由度",
				detail: "必填。 代表分布的自由度数。"
			}
		}
	},
	TTEST: {
		description: "返回与学生 t 检验相关的概率。 使用函数 TTEST 确定两个样本是否可能来自两个具有相同平均值的基础总体。",
		abstract: "返回与学生 t 检验相关的概率。 使用函数 TTEST 确定两个样本是否可能来自两个具有相同平均值的基础总体。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/ttest-function"
		}],
		functionParameter: {
			array1: {
				name: "数组1",
				detail: "必填。 第一个数据集。"
			},
			array2: {
				name: "数组2",
				detail: "必填。 第二个数据集。"
			},
			tails: {
				name: "尾部特性",
				detail: "必填。 指定分布尾数。 如果 tails = 1，则 TTEST 使用单尾分布。 如果 tails = 2，则 TTEST 使用双尾分布。"
			},
			type: {
				name: "检验类型",
				detail: "必填。 要执行的 t 检验的类型。"
			}
		}
	},
	VAR: {
		description: "计算基于给定样本的方差。",
		abstract: "计算基于给定样本的方差。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/var-function"
		}],
		functionParameter: {
			number1: {
				name: "数值 1",
				detail: "必填。 对应于总体样本的第一个数值参数。"
			},
			number2: {
				name: "数值 2",
				detail: "选。 对应于总体样本的 2 到 255 个数值参数。"
			}
		}
	},
	VARP: {
		description: "根据整个总体计算方差。",
		abstract: "根据整个总体计算方差。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/varp-function"
		}],
		functionParameter: {
			number1: {
				name: "数值 1",
				detail: "必填。 对应于总体的第一个数值参数。"
			},
			number2: {
				name: "数值 2",
				detail: "选。 对应于总体的 2 到 255 个数值参数。"
			}
		}
	},
	WEIBULL: {
		description: "返回 Weibull 分布。 可以将该分布用于可靠性分析，例如计算设备出现故障的平均时间。",
		abstract: "返回 Weibull 分布。 可以将该分布用于可靠性分析，例如计算设备出现故障的平均时间。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/weibull-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "必需。 用来计算函数的值。"
			},
			alpha: {
				name: "alpha",
				detail: "必填。 分布参数。"
			},
			beta: {
				name: "beta",
				detail: "必填。 分布参数。"
			},
			cumulative: {
				name: "累积",
				detail: "必填。 确定函数的形式。"
			}
		}
	},
	ZTEST: {
		description: "返回 z 检验的单尾概率值。 对于给定的假设总体平均值 μ0，ZTEST 返回样本平均值大于数据集（数组）中观察平均值的概率，即观察样本平均值。",
		abstract: "返回 z 检验的单尾概率值。 对于给定的假设总体平均值 μ0，ZTEST 返回样本平均值大于数据集（数组）中观察平均值的概率，即观察样本平均值。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/ztest-function"
		}],
		functionParameter: {
			array: {
				name: "数组",
				detail: "必填。 用来检验 x 的数组或数据区域。"
			},
			x: {
				name: "x",
				detail: "必需。 要测试的值。"
			},
			sigma: {
				name: "标准偏差",
				detail: "选。 总体（已知）标准偏差。 如果省略，则使用样本标准偏差。"
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/cube/zh-CN.ts
const locale$13 = {
	CUBEKPIMEMBER: {
		description: "返回重要性能指示器 (KPI) 属性，并在单元格中显示 KPI 名称。 KPI 是一种用于监控单位绩效的可计量度量值，如每月总利润或季度员工调整。",
		abstract: "返回重要性能指示器 (KPI) 属性，并在单元格中显示 KPI 名称。 KPI 是一种用于监控单位绩效的可计量度量值，如每月总利润或季度员工调整。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/cubekpimember-function"
		}],
		functionParameter: {
			connection: {
				name: "连接",
				detail: "必填。 一个表示多维数据集的连接名称的文本字符串。"
			},
			kpiName: {
				name: "Kpi_name",
				detail: "必填。 一个表示多维数据集的 KPI 名称的文本字符串。"
			},
			kpiProperty: {
				name: "Kpi_property",
				detail: "必填。 返回的 KPI 组件，可以是以下值之一："
			},
			caption: {
				name: "标题",
				detail: "选。 是显示在单元格中的可选文本字符串，而不是 kpi_name 和 kpi_property。"
			}
		}
	},
	CUBEMEMBER: {
		description: "返回多维数据集中的成员或元组。 用于验证多维数据集内是否存在成员或元组。",
		abstract: "返回多维数据集中的成员或元组。 用于验证多维数据集内是否存在成员或元组。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/cubemember-function"
		}],
		functionParameter: {
			connection: {
				name: "连接",
				detail: "必填。 一个表示多维数据集的连接名称的文本字符串。"
			},
			memberExpression: {
				name: "Member_expression",
				detail: "必填。 多维表达式 (MDX) 的文本字符串，用来计算出多维数据集中的唯一成员。 此外，也可以将 member_expression 指定为单元格区域或数组常量的元组。"
			},
			caption: {
				name: "标题",
				detail: "选。 显示在多维数据集的单元格（而不是标题）中的文本字符串（如果定义了一个文本字符串）。 当返回元组时，所用的标题为元组中最后一个成员的文本字符串。"
			}
		}
	},
	CUBEMEMBERPROPERTY: {
		description: "CUBEMEMBERPROPERTY 函数（Excel 中的 多维数据集函数 之一）从多维数据集返回成员属性的值。 用于验证多维数据集内是否存在某个成员名并返回此成员的指定属性。",
		abstract: "CUBEMEMBERPROPERTY 函数（Excel 中的 多维数据集函数 之一）从多维数据集返回成员属性的值。 用于验证多维数据集内是否存在某个成员名并返回此成员的指定属性。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/cubememberproperty-function"
		}],
		functionParameter: {
			connection: {
				name: "连接",
				detail: "必填。 一个表示多维数据集的连接名称的文本字符串。"
			},
			memberExpression: {
				name: "Member_expression",
				detail: "必填。 一个文本字符串，表示多维数据集中的一个成员的多维表达式 (MDX)。"
			},
			property: {
				name: "财产",
				detail: "必填。 一个文本字符串，表示返回的属性的名称或对包含该属性的名称的单元格的引用。"
			}
		}
	},
	CUBERANKEDMEMBER: {
		description: "返回集合中的第 n 个或排在一定名次的成员。 用来返回集合中的一个或多个元素，如业绩最好的销售人员或前 10 名的学生。",
		abstract: "返回集合中的第 n 个或排在一定名次的成员。 用来返回集合中的一个或多个元素，如业绩最好的销售人员或前 10 名的学生。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/cuberankedmember-function"
		}],
		functionParameter: {
			connection: {
				name: "连接",
				detail: "必填。 一个表示多维数据集的连接名称的文本字符串。"
			},
			setExpression: {
				name: "Set_expression",
				detail: "必填。 集表达式的文本字符串，例如 \"{[Item1].children}\"。 Set_expression 也可以是 CUBESET 函数，或者是对包含 CUBESET 函数的单元格的引用。"
			},
			rank: {
				name: "排名",
				detail: "必填。 用于指定要返回的最高值的整型值。 如果排名值为 1，它将返回最高值；如果排名值为 2，它将返回第二高的值，依此类推。 要返回最高的前 5 个值，请使用 5 次 CUBERANKEDMEMBER ，每一次指定从 1 到 5 的不同排名。"
			},
			caption: {
				name: "标题",
				detail: "选。 显示在多维数据集的单元格（而不是标题）中的文本字符串（如果定义了一个文本字符串）。"
			}
		}
	},
	CUBESET: {
		description: "定义成员或元组的计算集。方法是向服务器上的多维数据集发送一个集合表达式，此表达式创建集合，并随后将该集合返回到 Microsoft Excel。",
		abstract: "定义成员或元组的计算集。方法是向服务器上的多维数据集发送一个集合表达式，此表达式创建集合，并随后将该集合返回到 Microsoft Excel。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/cubeset-function"
		}],
		functionParameter: {
			connection: {
				name: "连接",
				detail: "必填。 一个表示多维数据集的连接名称的文本字符串。"
			},
			setExpression: {
				name: "Set_expression",
				detail: "必填。 产生一组成员或元组的集合表达式的文本字符串。 Set_expression 也可以是对 Excel 区域的单元格引用，该区域包含一个或多个成员、元组或包含在集合中的集合。"
			},
			caption: {
				name: "标题",
				detail: "选。 显示在多维数据集的单元格（而不是标题）中的文本字符串（如果定义了一个文本字符串）。"
			},
			sortOrder: {
				name: "Sort_order",
				detail: "选。 要执行的排序类型（如果有），可以为下列类型之一："
			},
			sortBy: {
				name: "Sort_by",
				detail: "选。 排序所依据的值的文本字符串。 例如，要获得销售量最高的城市，则 set_expression 为一组城市，sort_by 为销售量。 或者，要获得人口最多的城市，则 set_expression 为一组城市，sort_by 为人口量。 如果 sort_order 需要 sort_by，而 sort_by 被忽略，则 CUBESET 函数返回 #VALUE! 错误消息。"
			}
		}
	},
	CUBESETCOUNT: {
		description: "返回集合中的项目数。",
		abstract: "返回集合中的项目数。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/cubesetcount-function"
		}],
		functionParameter: { set: {
			name: "设置",
			detail: "必填。 Microsoft Office Excel 表达式的文本字符串，该表达式计算出由 CUBESET 函数定义的集合。 Set 也可以是 CUBESET 函数，或者是对包含 CUBESET 函数的单元格的引用。"
		} }
	},
	CUBEVALUE: {
		description: "从多维数据集中返回汇总值。",
		abstract: "从多维数据集中返回汇总值。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/cubevalue-function"
		}],
		functionParameter: {
			connection: {
				name: "连接",
				detail: "必填。 一个表示多维数据集的连接名称的文本字符串。"
			},
			memberExpression: {
				name: "Member_expression",
				detail: "选。 多维表达式 (MDX) 的文本字符串，用来计算出多维数据集内的成员或元组。 另外，member_expression 可以是由 CUBESET 函数定义的集合。 使用 member_expression 作为切片器来定义要返回其汇总值的多维数据集部分。 如果 member_expression 中未指定度量值，则使用该多维数据集的默认度量值。"
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/database/zh-CN.ts
const locale$12 = {
	DAVERAGE: {
		description: "对列表或数据库中满足指定条件的记录字段（列）中的数值求平均值。",
		abstract: "对列表或数据库中满足指定条件的记录字段（列）中的数值求平均值。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/daverage-function"
		}],
		functionParameter: {
			database: {
				name: "数据库",
				detail: "是构成列表或数据库的单元格区域。 数据库是包含一组相关数据的列表，其中包含相关信息的行为记录，而包含数据的列为字段。 列表的第一行包含每一列的标签。"
			},
			field: {
				name: "字段",
				detail: "指示函数中使用的列。 输入两端带双引号的列标签，如 \"使用年数\" 或 \"产量\"；或是代表列表中列位置的数字（不带引号）：1 表示第一列，2 表示第二列，依此类推。"
			},
			criteria: {
				name: "条件",
				detail: "是包含指定条件的单元格区域。 可以为参数 criteria 指定任意区域，只要此区域包含至少一个列标签，并且列标签下至少有一个在其中为列指定条件的单元格。"
			}
		}
	},
	DCOUNT: {
		description: "返回列表或数据库中满足指定条件的记录字段（列）中包含数字的单元格的个数。",
		abstract: "返回列表或数据库中满足指定条件的记录字段（列）中包含数字的单元格的个数。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/dcount-function"
		}],
		functionParameter: {
			database: {
				name: "数据库",
				detail: "必填。 构成列表或数据库的单元格区域。 数据库是包含一组相关数据的列表，其中包含相关信息的行为记录，而包含数据的列为字段。 列表的第一行包含每一列的标签。"
			},
			field: {
				name: "字段",
				detail: "必填。 指定函数所使用的列。 输入两端带双引号的列标签，如 \"使用年数\" 或 \"产量\"；或是代表列表中列位置的数字（不带引号）：1 表示第一列，2 表示第二列，依此类推。"
			},
			criteria: {
				name: "条件",
				detail: "必填。 包含所指定条件的单元格区域。 可以为参数 criteria 指定任意区域，只要此参数包含至少一个列标签，并且列标签下至少有一个在其中为列指定条件的单元格。"
			}
		}
	},
	DCOUNTA: {
		description: "返回列表或数据库中满足指定条件的记录字段（列）中的非空单元格的个数。",
		abstract: "返回列表或数据库中满足指定条件的记录字段（列）中的非空单元格的个数。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/dcounta-function"
		}],
		functionParameter: {
			database: {
				name: "数据库",
				detail: "必填。 构成列表或数据库的单元格区域。 数据库是包含一组相关数据的列表，其中包含相关信息的行为记录，而包含数据的列为字段。 列表的第一行包含每一列的标签。"
			},
			field: {
				name: "字段",
				detail: "选。 指定函数所使用的列。 输入两端带双引号的列标签，如 \"使用年数\" 或 \"产量\"；或是代表列表中列位置的数字（不带引号）：1 表示第一列，2 表示第二列，依此类推。"
			},
			criteria: {
				name: "条件",
				detail: "必填。 包含所指定条件的单元格区域。 可以为参数 criteria 指定任意区域，只要此区域包含至少一个列标签，并且列标签下至少有一个在其中为列指定条件的单元格。"
			}
		}
	},
	DGET: {
		description: "从列表或数据库的列中提取符合指定条件的单个值。",
		abstract: "从列表或数据库的列中提取符合指定条件的单个值。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/dget-function"
		}],
		functionParameter: {
			database: {
				name: "数据库",
				detail: "必填。 构成列表或数据库的单元格区域。 数据库是包含一组相关数据的列表，其中包含相关信息的行为记录，而包含数据的列为字段。 列表的第一行包含每一列的标签。"
			},
			field: {
				name: "字段",
				detail: "必填。 指定函数所使用的列。 输入两端带双引号的列标签，如 \"使用年数\" 或 \"产量\"；或是代表列表中列位置的数字（不带引号）：1 表示第一列，2 表示第二列，依此类推。"
			},
			criteria: {
				name: "条件",
				detail: "必填。 包含所指定条件的单元格区域。 可以为参数 criteria 指定任意区域，只要此区域包含至少一个列标签，并且列标签下至少有一个在其中为列指定条件的单元格。"
			}
		}
	},
	DMAX: {
		description: "返回列表或数据库中满足指定条件的记录字段（列）中的最大数字。",
		abstract: "返回列表或数据库中满足指定条件的记录字段（列）中的最大数字。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/dmax-function"
		}],
		functionParameter: {
			database: {
				name: "数据库",
				detail: "必填。 构成列表或数据库的单元格区域。 数据库是包含一组相关数据的列表，其中包含相关信息的行为记录，而包含数据的列为字段。 列表的第一行包含每一列的标签。"
			},
			field: {
				name: "字段",
				detail: "必填。 指定函数所使用的列。 输入两端带双引号的列标签，如 \"使用年数\" 或 \"产量\"；或是代表列表中列位置的数字（不带引号）：1 表示第一列，2 表示第二列，依此类推。"
			},
			criteria: {
				name: "条件",
				detail: "必填。 包含所指定条件的单元格区域。 可以为参数 criteria 指定任意区域，只要此区域包含至少一个列标签，并且列标签下至少有一个在其中为列指定条件的单元格。"
			}
		}
	},
	DMIN: {
		description: "返回列表或数据库中满足指定条件的记录字段（列）中的最小数字。",
		abstract: "返回列表或数据库中满足指定条件的记录字段（列）中的最小数字。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/dmin-function"
		}],
		functionParameter: {
			database: {
				name: "数据库",
				detail: "必填。 构成列表或数据库的单元格区域。 数据库是包含一组相关数据的列表，其中包含相关信息的行为记录，而包含数据的列为字段。 列表的第一行包含每一列的标签。"
			},
			field: {
				name: "字段",
				detail: "必填。 指定函数所使用的列。 输入两端带双引号的列标签，如 \"使用年数\" 或 \"产量\"；或是代表列表中列位置的数字（不带引号）：1 表示第一列，2 表示第二列，依此类推。"
			},
			criteria: {
				name: "条件",
				detail: "必填。 包含所指定条件的单元格区域。 可以为参数 criteria 指定任意区域，只要此区域包含至少一个列标签，并且列标签下至少有一个在其中为列指定条件的单元格。"
			}
		}
	},
	DPRODUCT: {
		description: "返回列表或数据库中满足指定条件的记录字段（列）中的数值的乘积。",
		abstract: "返回列表或数据库中满足指定条件的记录字段（列）中的数值的乘积。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/dproduct-function"
		}],
		functionParameter: {
			database: {
				name: "数据库",
				detail: "必填。 构成列表或数据库的单元格区域。 数据库是包含一组相关数据的列表，其中包含相关信息的行为记录，而包含数据的列为字段。 列表的第一行包含每一列的标签。"
			},
			field: {
				name: "字段",
				detail: "必填。 指定函数所使用的列。 输入两端带双引号的列标签，如 \"使用年数\" 或 \"产量\"；或是代表列表中列位置的数字（不带引号）：1 表示第一列，2 表示第二列，依此类推。"
			},
			criteria: {
				name: "条件",
				detail: "必填。 包含所指定条件的单元格区域。 可以为参数 criteria 指定任意区域，只要此区域包含至少一个列标签，并且列标签下至少有一个在其中为列指定条件的单元格。"
			}
		}
	},
	DSTDEV: {
		description: "返回利用列表或数据库中满足指定条件的记录字段（列）中的数字作为一个样本估算出的总体标准偏差。",
		abstract: "返回利用列表或数据库中满足指定条件的记录字段（列）中的数字作为一个样本估算出的总体标准偏差。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/dstdev-function"
		}],
		functionParameter: {
			database: {
				name: "数据库",
				detail: "必填。 构成列表或数据库的单元格区域。 数据库是包含一组相关数据的列表，其中包含相关信息的行为记录，而包含数据的列为字段。 列表的第一行包含每一列的标签。"
			},
			field: {
				name: "字段",
				detail: "必填。 指定函数所使用的列。 输入两端带双引号的列标签，如 \"使用年数\" 或 \"产量\"；或是代表列表中列位置的数字（不带引号）：1 表示第一列，2 表示第二列，依此类推。"
			},
			criteria: {
				name: "条件",
				detail: "必填。 包含所指定条件的单元格区域。 可以为参数 criteria 指定任意区域，只要此区域包含至少一个列标签，并且列标签下至少有一个在其中为列指定条件的单元格。"
			}
		}
	},
	DSTDEVP: {
		description: "返回利用列表或数据库中满足指定条件的记录字段（列）中的数字作为样本总体计算出的总体标准偏差。",
		abstract: "返回利用列表或数据库中满足指定条件的记录字段（列）中的数字作为样本总体计算出的总体标准偏差。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/dstdevp-function"
		}],
		functionParameter: {
			database: {
				name: "数据库",
				detail: "必填。 构成列表或数据库的单元格区域。 数据库是包含一组相关数据的列表，其中包含相关信息的行为记录，而包含数据的列为字段。 列表的第一行包含每一列的标签。"
			},
			field: {
				name: "字段",
				detail: "必填。 指定函数所使用的列。 输入两端带双引号的列标签，如 \"使用年数\" 或 \"产量\"；或是代表列表中列位置的数字（不带引号）：1 表示第一列，2 表示第二列，依此类推。"
			},
			criteria: {
				name: "条件",
				detail: "必填。 包含所指定条件的单元格区域。 可以为参数 criteria 指定任意区域，只要此区域包含至少一个列标签，并且列标签下至少有一个在其中为列指定条件的单元格。"
			}
		}
	},
	DSUM: {
		description: "在列表或数据库中，DSUM 提供字段 (列) 与指定条件匹配的记录中的数字之和。",
		abstract: "在列表或数据库中，DSUM 提供字段 (列) 与指定条件匹配的记录中的数字之和。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/dsum-function"
		}],
		functionParameter: {
			database: {
				name: "数据库",
				detail: "必填。 这是构成列表或数据库的单元格区域。 数据库是相关数据的列表，其中相关信息行是 记录 ，数据列是 字段 。 列表的第一行包含其中每一列的标签。"
			},
			field: {
				name: "字段",
				detail: "必填。 这将指定函数中使用的列。 指定用双引号括起来的列标签，例如“Age”或“Yield”。 或者，可以指定一个不带引号的数字 (，) 表示列在列表中的位置：例如， 1 表示第一列， 2 表示第二列，等等。"
			},
			criteria: {
				name: "条件",
				detail: "必填。 这是包含指定条件的单元格区域。 可以为参数 criteria 指定任意区域，只要此区域包含至少一个列标签，并且列标签下至少有一个在其中为列指定条件的单元格。"
			}
		}
	},
	DVAR: {
		description: "返回利用列表或数据库中满足指定条件的记录字段（列）中的数字作为一个样本估算出的总体方差。",
		abstract: "返回利用列表或数据库中满足指定条件的记录字段（列）中的数字作为一个样本估算出的总体方差。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/dvar-function"
		}],
		functionParameter: {
			database: {
				name: "数据库",
				detail: "必填。 构成列表或数据库的单元格区域。 数据库是包含一组相关数据的列表，其中包含相关信息的行为记录，而包含数据的列为字段。 列表的第一行包含每一列的标签。"
			},
			field: {
				name: "字段",
				detail: "必填。 指定函数所使用的列。 输入两端带双引号的列标签，如 \"使用年数\" 或 \"产量\"；或是代表列表中列位置的数字（不带引号）：1 表示第一列，2 表示第二列，依此类推。"
			},
			criteria: {
				name: "条件",
				detail: "必填。 包含所指定条件的单元格区域。 可以为参数 criteria 指定任意区域，只要此区域包含至少一个列标签，并且列标签下至少有一个在其中为列指定条件的单元格。"
			}
		}
	},
	DVARP: {
		description: "通过使用列表或数据库中满足指定条件的记录字段（列）中的数字计算样本总体的样本总体方差。",
		abstract: "通过使用列表或数据库中满足指定条件的记录字段（列）中的数字计算样本总体的样本总体方差。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/dvarp-function"
		}],
		functionParameter: {
			database: {
				name: "数据库",
				detail: "必填。 构成列表或数据库的单元格区域。 数据库是包含一组相关数据的列表，其中包含相关信息的行为记录，而包含数据的列为字段。 列表的第一行包含每一列的标签。"
			},
			field: {
				name: "字段",
				detail: "必填。 指定函数所使用的列。 输入两端带双引号的列标签，如 \"使用年数\" 或 \"产量\"；或是代表列表中列位置的数字（不带引号）：1 表示第一列，2 表示第二列，依此类推。"
			},
			criteria: {
				name: "条件",
				detail: "必填。 包含所指定条件的单元格区域。 可以为参数 criteria 指定任意区域，只要此区域包含至少一个列标签，并且列标签下至少有一个在其中为列指定条件的单元格。"
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/date/zh-CN.ts
const locale$11 = {
	DATE: {
		description: "采用三个单独的值并将它们合并为一个日期。",
		abstract: "返回特定日期的序列号",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/date-function"
		}],
		functionParameter: {
			year: {
				name: "年",
				detail: "可以包含 1 到 4 位数字。 Excel 根据计算机使用的日期系统解释 year 参数。 默认情况下，Univer 使用 1900 日期系统，这意味着第一个日期是 1900 年 1 月 1 日。"
			},
			month: {
				name: "月",
				detail: "一个正整数或负整数，表示一年中从 1 月至 12 月（一月到十二月）的各个月。"
			},
			day: {
				name: "日",
				detail: "一个正整数或负整数，表示一月中从 1 日到 31 日的各天。"
			}
		}
	},
	DATEDIF: {
		description: "计算两个日期之间的天数、月数或年数。 此函数在用于计算年龄的公式中很有用。",
		abstract: "计算两个日期之间的天数、月数或年数。 此函数在用于计算年龄的公式中很有用。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/datedif-function"
		}],
		functionParameter: {
			startDate: {
				name: "开始日期",
				detail: "表示给定时间段的第一个或开始日期的日期。 日期值有多种输入方式：带引号的文本字符串（例如 \"2001/1/30\"）、序列号（例如 36921，在商用 1900 日期系统时表示 2001 年 1 月 30 日）或其他公式或函数的结果（例如 DATEVALUE(\"2001/1/30\")）。"
			},
			endDate: {
				name: "结束日期",
				detail: "用于表示时间段的最后一个（即结束）日期的日期。"
			},
			unit: {
				name: "Unit",
				detail: "要返回的信息类型，其中： Unit****返回 “ Y ”期间内的完整年数。” M “期间内的完整月数。 D “时间段中的天数”。 MD “start_date和end_date中的天数差异。 忽略日期中的月份和年份。 重要： 我们不建议使用“MD”参数，因为存在已知的限制。 请参阅下面的已知问题部分。” YM “start_date和end_date月份之间的差异。 忽略日期的天数和年份“ YD ”start_date和end_date的天数之差。 忽略日期中的年份。"
			}
		}
	},
	DATEVALUE: {
		description: "将文本格式的日期转换为序列号。",
		abstract: "将文本格式的日期转换为序列号",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/datevalue-function"
		}],
		functionParameter: { dateText: {
			name: "日期文本",
			detail: "表示 Excel 日期格式的日期的文本，或对包含表示 Excel 日期格式的日期的文本的单元格的引用。 例如，“1/30/2008”或“30-Jan-2008”是表示日期的引号内的文本字符串。\n使用 Microsoft Excel for Windows 中的默认日期系统， date_text 参数必须表示 1900 年 1 月 1 日至 9999 年 12 月 31 日的日期。 DATEVALUE 函数返回 #VALUE！ 如果 date_text 参数的值超出此范围，则为 error 值。\n如果省略参数 date_text 中的年份部分，则 DATEVALUE 函数会使用计算机内置时钟的当前年份。 参数 date_text 中的时间信息将被忽略。"
		} }
	},
	DAY: {
		description: "返回以序列数表示的某日期的天数。天数是介于 1 到 31 之间的整数。",
		abstract: "将序列号转换为月份日期",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/day-function"
		}],
		functionParameter: { serialNumber: {
			name: "日期序列号",
			detail: "要查找的日期。 应使用 DATE 函数输入日期，或者将日期作为其他公式或函数的结果输入。 例如，使用函数 DATE(2008,5,23) 输入 2008 年 5 月 23 日。"
		} }
	},
	DAYS: {
		description: "返回两个日期之间的天数",
		abstract: "返回两个日期之间的天数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/days-function"
		}],
		functionParameter: {
			endDate: {
				name: "结束日期",
				detail: "是用于计算期间天数的起止日期。"
			},
			startDate: {
				name: "开始日期",
				detail: "是用于计算期间天数的起止日期。"
			}
		}
	},
	DAYS360: {
		description: "以一年 360 天为基准计算两个日期间的天数",
		abstract: "以一年 360 天为基准计算两个日期间的天数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/days360-function"
		}],
		functionParameter: {
			startDate: {
				name: "开始日期",
				detail: "是用于计算期间天数的起止日期。"
			},
			endDate: {
				name: "结束日期",
				detail: "是用于计算期间天数的起止日期。"
			},
			method: {
				name: "方法",
				detail: "逻辑值，用于指定在计算中是采用美国方法 还是欧洲方法。"
			}
		}
	},
	EDATE: {
		description: "返回表示某个日期的序列号，该日期与指定日期 (start_date) 相隔（之前或之后）指示的月份数。 使用函数 EDATE 可以计算与发行日处于一月中同一天的到期日的日期。",
		abstract: "返回用于表示开始日期之前或之后月数的日期的序列号",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/edate-function"
		}],
		functionParameter: {
			startDate: {
				name: "开始日期",
				detail: "一个代表开始日期的日期。 应使用 DATE 函数输入日期，或者将日期作为其他公式或函数的结果输入。 例如，使用函数 DATE(2008,5,23) 输入 2008 年 5 月 23 日。"
			},
			months: {
				name: "月份",
				detail: "Start Date 之前或之后的月份数。 Months 为正值将生成未来日期；为负值将生成过去日期。"
			}
		}
	},
	EOMONTH: {
		description: "返回指定月数之前或之后的月份的最后一天的序列号",
		abstract: "返回指定月数之前或之后的月份的最后一天的序列号",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/eomonth-function"
		}],
		functionParameter: {
			startDate: {
				name: "开始日期",
				detail: "表示开始日期的日期。"
			},
			months: {
				name: "月份数",
				detail: "开始日期之前或之后的月份数。"
			}
		}
	},
	EPOCHTODATE: {
		description: "将 Unix 纪元时间戳（以秒、毫秒或微秒为单位）转换为世界协调时间 (UTC) 的日期时间。",
		abstract: "将 Unix 纪元时间戳（以秒、毫秒或微秒为单位）转换为世界协调时间 (UTC) 的日期时间。",
		links: [{
			title: "教学",
			url: "https://support.google.com/docs/answer/13193461?hl=zh-Hans"
		}],
		functionParameter: {
			timestamp: {
				name: "时间戳",
				detail: "：Unix 纪元时间戳（以秒、毫秒或微秒为单位）。"
			},
			unit: {
				name: "时间单位",
				detail: "[可选：默认情况为 – 1 ]：表示时间戳的时间单位。"
			}
		}
	},
	HOUR: {
		description: "返回时间值的小时数。 小时数是介于 0 (12:00 A.M.) 到 23 (11:00 P.M.) 之间的整数。",
		abstract: "返回时间值的小时数。 小时数是介于 0 (12:00 A.M.) 到 23 (11:00 P.M.) 之间的整数。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/hour-function"
		}],
		functionParameter: { serialNumber: {
			name: "日期序列号",
			detail: "必填。 时间值，其中包含要查找的小时数。 时间值有多种输入方式：带引号的文本字符串（例如 \"6:45 PM\"）、十进制数（例如 0.78125 表示 6:45 PM）或其他公式或函数的结果（例如 TIMEVALUE(\"6:45 PM\")）。"
		} }
	},
	ISOWEEKNUM: {
		description: "返回给定日期在全年中的 ISO 周数。",
		abstract: "返回给定日期在全年中的 ISO 周数。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/isoweeknum-function"
		}],
		functionParameter: { date: {
			name: "日期",
			detail: "必填。 Date 是 Excel 用于日期和时间计算的日期时间代码。"
		} }
	},
	MINUTE: {
		description: "返回时间值中的分钟。 分钟是一个介于 0 到 59 之间的整数。",
		abstract: "返回时间值中的分钟。 分钟是一个介于 0 到 59 之间的整数。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/minute-function"
		}],
		functionParameter: { serialNumber: {
			name: "日期序列号",
			detail: "必填。 一个时间值，其中包含要查找的分钟。 时间值有多种输入方式：带引号的文本字符串（例如 \"6:45 PM\"）、十进制数（例如 0.78125 表示 6:45 PM）或其他公式或函数的结果（例如 TIMEVALUE(\"6:45 PM\")）。"
		} }
	},
	MONTH: {
		description: "返回日期（以序列数表示）中的月份。 月份是介于 1（一月）到 12（十二月）之间的整数。",
		abstract: "返回日期（以序列数表示）中的月份。 月份是介于 1（一月）到 12（十二月）之间的整数。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/month-function"
		}],
		functionParameter: { serialNumber: {
			name: "日期序列号",
			detail: "必填。 要查找的月份的日期。 应使用 DATE 函数输入日期，或者将日期作为其他公式或函数的结果输入。 例如，使用函数 DATE(2008,5,23) 输入 2008 年 5 月 23 日。 如果 日期以文本形式输入 ，则会出现问题。"
		} }
	},
	NETWORKDAYS: {
		description: "返回参数 start_date 和 end_date 之间完整的工作日数值。 工作日不包括周末和专门指定的假期。 可以使用函数 NETWORKDAYS，根据某一特定时期内雇员的工作天数，计算其应计的报酬。",
		abstract: "返回参数 start_date 和 end_date 之间完整的工作日数值。 工作日不包括周末和专门指定的假期。 可以使用函数 NETWORKDAYS，根据某一特定时期内雇员的工作天数，计算其应计的报酬。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/networkdays-function"
		}],
		functionParameter: {
			startDate: {
				name: "开始日期",
				detail: "必填。 一个代表开始日期的日期。"
			},
			endDate: {
				name: "终止日期",
				detail: "必填。 一个代表终止日期的日期。"
			},
			holidays: {
				name: "假期",
				detail: "选。 不在工作日历中的一个或多个日期所构成的可选区域，例如：省/市/自治区和国家/地区的法定假日以及其他非法定假日。 该列表可以是包含日期的单元格区域，或是表示日期的序列号的数组常量。"
			}
		}
	},
	NETWORKDAYS_INTL: {
		description: "返回两个日期之间的所有工作日数，使用参数指示哪些天是周末，以及有多少天是周末。 周末和任何指定为假期的日期不被视为工作日。",
		abstract: "返回两个日期之间的所有工作日数，使用参数指示哪些天是周末，以及有多少天是周末。 周末和任何指定为假期的日期不被视为工作日。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/networkdays-intl-function"
		}],
		functionParameter: {
			startDate: {
				name: "开始日期",
				detail: "一个代表开始日期的日期。"
			},
			endDate: {
				name: "终止日期",
				detail: "一个代表终止日期的日期。"
			},
			weekend: {
				name: "周末",
				detail: "是一个用于指定周末日的周末数字或字符串。"
			},
			holidays: {
				name: "假期",
				detail: "不在工作日历中的一个或多个日期所构成的可选区域。"
			}
		}
	},
	NOW: {
		description: "返回当前日期和时间的序列号。 如果在输入该函数前，单元格格式为 “常规” ，Excel 会更改单元格格式，使其与区域设置的日期和时间格式匹配。 可以在功能区 “开始” 选项卡上的 “数字” 组中使用命令来更改日期和时间格式。",
		abstract: "返回当前日期和时间的序列号。 如果在输入该函数前，单元格格式为 “常规” ，Excel 会更改单元格格式，使其与区域设置的日期和时间格式匹配。 可以在功能区 “开始” 选项卡上的 “数字” 组中使用命令来更改日期和时间格式。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/now-function"
		}],
		functionParameter: {}
	},
	SECOND: {
		description: "将序列号转换为秒",
		abstract: "将序列号转换为秒",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/second-function"
		}],
		functionParameter: { serialNumber: {
			name: "日期序列号",
			detail: "要查找的日期。 应使用 DATE 函数输入日期，或者将日期作为其他公式或函数的结果输入。 例如，使用函数 DATE(2008,5,23) 输入 2008 年 5 月 23 日。"
		} }
	},
	TIME: {
		description: "返回特定时间的序列号。",
		abstract: "返回特定时间的序列号",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/time-function"
		}],
		functionParameter: {
			hour: {
				name: "小时",
				detail: "0（零）到 32767 之间的数字，代表小时。 任何大于 23 的值都会除以 24，余数将作为小时值。 例如，TIME(27,0,0) = TIME(3,0,0) = .125 或 3:00 AM。"
			},
			minute: {
				name: "分钟",
				detail: " 0 到 32767 之间的数字，代表分钟。 任何大于 59 的值将转换为小时和分钟。 例如，TIME(0,750,0) = TIME(12,30,0) = .520833 或 12:30 PM。"
			},
			second: {
				name: "秒",
				detail: "0 到 32767 之间的数字，代表秒。 任何大于 59 的值将转换为小时、分钟和秒。 例如，TIME(0,0,2000) = TIME(0,33,22) = .023148 或 12:33:20 AM。"
			}
		}
	},
	TIMEVALUE: {
		description: "将文本格式的时间转换为序列号。",
		abstract: "将文本格式的时间转换为序列号",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/timevalue-function"
		}],
		functionParameter: { timeText: {
			name: "时间文本",
			detail: "一个文本字符串，代表以任一时间格式表示的时间（例如，代表时间的具有引号的文本字符串 \"6:45 PM\" 和 \"18:45\"）。"
		} }
	},
	TO_DATE: {
		description: "将提供的数字转换为日期。",
		abstract: "将提供的数字转换为日期。",
		links: [{
			title: "教学",
			url: "https://support.google.com/docs/answer/3094239?hl=zh-Hans"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "TO_DATE(A2)"
		} }
	},
	TODAY: {
		description: "返回今天日期的序列号",
		abstract: "返回今天日期的序列号",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/today-function"
		}],
		functionParameter: {}
	},
	WEEKDAY: {
		description: "将序列号转换为星期日期",
		abstract: "将序列号转换为星期日期",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/weekday-function"
		}],
		functionParameter: {
			serialNumber: {
				name: "日期序列号",
				detail: "一个序列号，代表尝试查找的那一天的日期。"
			},
			returnType: {
				name: "返回值类型",
				detail: "用于确定返回值类型的数字。"
			}
		}
	},
	WEEKNUM: {
		description: "将序列号转换为代表该星期为一年中第几周的数字",
		abstract: "将序列号转换为代表该星期为一年中第几周的数字",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/weeknum-function"
		}],
		functionParameter: {
			serialNumber: {
				name: "日期序列号",
				detail: "代表一周中的日期。"
			},
			returnType: {
				name: "返回值类型",
				detail: "一数字，确定星期从哪一天开始。 默认值为 1。"
			}
		}
	},
	WORKDAY: {
		description: "返回指定的若干个工作日之前或之后的日期的序列号",
		abstract: "返回指定的若干个工作日之前或之后的日期的序列号",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/workday-function"
		}],
		functionParameter: {
			startDate: {
				name: "开始日期",
				detail: "一个代表开始日期的日期。"
			},
			days: {
				name: "天数",
				detail: "开始日期之前或之后不含周末及节假日的天数。为正值将生成未来日期；为负值生成过去日期。"
			},
			holidays: {
				name: "假期",
				detail: "不在工作日历中的一个或多个日期所构成的可选区域。"
			}
		}
	},
	WORKDAY_INTL: {
		description: "返回日期在指定的工作日天数之前或之后的序列号（使用参数指明周末有几天并指明是哪几天）",
		abstract: "返回日期在指定的工作日天数之前或之后的序列号（使用参数指明周末有几天并指明是哪几天）",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/workday-intl-function"
		}],
		functionParameter: {
			startDate: {
				name: "开始日期",
				detail: "一个代表开始日期的日期。"
			},
			days: {
				name: "天数",
				detail: "开始日期之前或之后不含周末及节假日的天数。为正值将生成未来日期；为负值生成过去日期。"
			},
			weekend: {
				name: "周末",
				detail: "是一个用于指定周末日的周末数字或字符串"
			},
			holidays: {
				name: "假期",
				detail: "不在工作日历中的一个或多个日期所构成的可选区域。"
			}
		}
	},
	YEAR: {
		description: "返回对应于某个日期的年份。 Year 作为 1900 - 9999 之间的整数返回。",
		abstract: "将序列号转换为年",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/year-function"
		}],
		functionParameter: { serialNumber: {
			name: "日期序列号",
			detail: "要查找的年份的日期。 应使用 DATE 函数输入日期，或者将日期作为其他公式或函数的结果输入。 例如，使用函数 DATE(2008,5,23) 输入 2008 年 5 月 23 日。"
		} }
	},
	YEARFRAC: {
		description: "返回代表 start_date 和 end_date 之间整天天数的年分数",
		abstract: "返回代表 start_date 和 end_date 之间整天天数的年分数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/yearfrac-function"
		}],
		functionParameter: {
			startDate: {
				name: "开始日期",
				detail: "一个代表开始日期的日期。"
			},
			endDate: {
				name: "结束日期",
				detail: "一个代表终止日期的日期。"
			},
			basis: {
				name: "基准类型",
				detail: "要使用的日计数基准类型。"
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/engineering/zh-CN.ts
const locale$10 = {
	BESSELI: {
		description: "返回修正的贝赛耳函数 In(x)",
		abstract: "返回修正的贝赛耳函数 In(x)",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/besseli-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "用来计算函数的值。"
			},
			n: {
				name: "N",
				detail: "贝赛耳函数的阶数。如果n不是整数，将被截尾取整。"
			}
		}
	},
	BESSELJ: {
		description: "返回贝赛耳函数 Jn(x)",
		abstract: "返回贝赛耳函数 Jn(x)",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/besselj-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "用来计算函数的值。"
			},
			n: {
				name: "N",
				detail: "贝赛耳函数的阶数。如果n不是整数，将被截尾取整。"
			}
		}
	},
	BESSELK: {
		description: "返回修正的贝赛耳函数 Kn(x)",
		abstract: "返回修正的贝赛耳函数 Kn(x)",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/besselk-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "用来计算函数的值。"
			},
			n: {
				name: "N",
				detail: "贝赛耳函数的阶数。如果n不是整数，将被截尾取整。"
			}
		}
	},
	BESSELY: {
		description: "返回贝赛耳函数 Yn(x)",
		abstract: "返回贝赛耳函数 Yn(x)",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/bessely-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "用来计算函数的值。"
			},
			n: {
				name: "N",
				detail: "贝赛耳函数的阶数。如果n不是整数，将被截尾取整。"
			}
		}
	},
	BIN2DEC: {
		description: "将二进制数转换为十进制数",
		abstract: "将二进制数转换为十进制数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/bin2dec-function"
		}],
		functionParameter: { number: {
			name: "二进制数",
			detail: "要转换的二进制数。"
		} }
	},
	BIN2HEX: {
		description: "将二进制数转换为十六进制数",
		abstract: "将二进制数转换为十六进制数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/bin2hex-function"
		}],
		functionParameter: {
			number: {
				name: "二进制数",
				detail: "要转换的二进制数。"
			},
			places: {
				name: "字符数",
				detail: "要使用的字符数。"
			}
		}
	},
	BIN2OCT: {
		description: "将二进制数转换为八进制数。",
		abstract: "将二进制数转换为八进制数。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/bin2oct-function"
		}],
		functionParameter: {
			number: {
				name: "二进制数",
				detail: "必需。 要转换的二进制数。 Number 包含的字符不能超过 10 个（10 位）。 Number 的最高位为符号位。 其余 9 位是数量位。 负数用二进制补码记数法表示。"
			},
			places: {
				name: "字符数",
				detail: "选。 要使用的字符数。 如果省略 places，BIN2OCT 将使用必需的最小字符数。 Places 可用于在返回的值前置 0（零）。"
			}
		}
	},
	BITAND: {
		description: "返回两个数的“按位与”",
		abstract: "返回两个数的“按位与”",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/bitand-function"
		}],
		functionParameter: {
			number1: {
				name: "数值1",
				detail: "必须为十进制格式且大于等于 0。"
			},
			number2: {
				name: "数值2",
				detail: "必须为十进制格式且大于等于 0。"
			}
		}
	},
	BITLSHIFT: {
		description: "返回左移 shift_amount 位的计算值接收数",
		abstract: "返回左移 shift_amount 位的计算值接收数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/bitlshift-function"
		}],
		functionParameter: {
			number: {
				name: "数值",
				detail: "必须是大于或等于 0 的整数。"
			},
			shiftAmount: {
				name: "移位量",
				detail: "必须为整数。"
			}
		}
	},
	BITOR: {
		description: "返回两个数的“按位或”",
		abstract: "返回两个数的“按位或”",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/bitor-function"
		}],
		functionParameter: {
			number1: {
				name: "数值1",
				detail: "必须为十进制格式且大于等于 0。"
			},
			number2: {
				name: "数值2",
				detail: "必须为十进制格式且大于等于 0。"
			}
		}
	},
	BITRSHIFT: {
		description: "返回右移 shift_amount 位的计算值接收数",
		abstract: "返回右移 shift_amount 位的计算值接收数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/bitrshift-function"
		}],
		functionParameter: {
			number: {
				name: "数值",
				detail: "必须是大于或等于 0 的整数。"
			},
			shiftAmount: {
				name: "移位量",
				detail: "必须为整数。"
			}
		}
	},
	BITXOR: {
		description: "返回两个数的按位“异或”",
		abstract: "返回两个数的按位“异或”",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/bitxor-function"
		}],
		functionParameter: {
			number1: {
				name: "数值1",
				detail: "必须为十进制格式且大于等于 0。"
			},
			number2: {
				name: "数值2",
				detail: "必须为十进制格式且大于等于 0。"
			}
		}
	},
	COMPLEX: {
		description: "将实系数和虚系数转换为复数",
		abstract: "将实系数和虚系数转换为复数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/complex-function"
		}],
		functionParameter: {
			realNum: {
				name: "实系数",
				detail: "复数的实系数。"
			},
			iNum: {
				name: "虚系数",
				detail: "复数的虚系数。"
			},
			suffix: {
				name: "后缀",
				detail: "复数中虚系数的后缀。如果省略，则认为它是“i”。"
			}
		}
	},
	CONVERT: {
		description: "将数字从一种度量系统转换为另一种度量系统",
		abstract: "将数字从一种度量系统转换为另一种度量系统",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/convert-function"
		}],
		functionParameter: {
			number: {
				name: "数值",
				detail: "需要进行转换的数值。"
			},
			fromUnit: {
				name: "转换前单位",
				detail: "是数值的单位。"
			},
			toUnit: {
				name: "转换后单位",
				detail: "是结果的单位。"
			}
		}
	},
	DEC2BIN: {
		description: "将十进制数转换为二进制数",
		abstract: "将十进制数转换为二进制数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/dec2bin-function"
		}],
		functionParameter: {
			number: {
				name: "十进制数",
				detail: "要转换的十进制数。"
			},
			places: {
				name: "字符数",
				detail: "要使用的字符数。"
			}
		}
	},
	DEC2HEX: {
		description: "将十进制数转换为十六进制数",
		abstract: "将十进制数转换为十六进制数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/dec2hex-function"
		}],
		functionParameter: {
			number: {
				name: "十进制数",
				detail: "要转换的十进制数。"
			},
			places: {
				name: "字符数",
				detail: "要使用的字符数。"
			}
		}
	},
	DEC2OCT: {
		description: "将十进制数转换为八进制数",
		abstract: "将十进制数转换为八进制数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/dec2oct-function"
		}],
		functionParameter: {
			number: {
				name: "十进制数",
				detail: "要转换的十进制数。"
			},
			places: {
				name: "字符数",
				detail: "要使用的字符数。"
			}
		}
	},
	DELTA: {
		description: "检验两个值是否相等",
		abstract: "检验两个值是否相等",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/delta-function"
		}],
		functionParameter: {
			number1: {
				name: "数值1",
				detail: "第一个数值。"
			},
			number2: {
				name: "数值2",
				detail: "第二个数值。如果省略，则假设数值2为零。"
			}
		}
	},
	ERF: {
		description: "返回误差函数",
		abstract: "返回误差函数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/erf-function"
		}],
		functionParameter: {
			lowerLimit: {
				name: "下限",
				detail: "ERF函数的积分下限。"
			},
			upperLimit: {
				name: "上限",
				detail: "ERF函数的积分上限。如果省略，ERF积分将在零到下限之间。"
			}
		}
	},
	ERF_PRECISE: {
		description: "返回误差函数",
		abstract: "返回误差函数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/erf-precise-function"
		}],
		functionParameter: { x: {
			name: "下限",
			detail: "ERF.PRECISE函数的积分下限。"
		} }
	},
	ERFC: {
		description: "返回互补误差函数",
		abstract: "返回互补误差函数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/erfc-function"
		}],
		functionParameter: { x: {
			name: "下限",
			detail: "ERFC函数的积分下限。"
		} }
	},
	ERFC_PRECISE: {
		description: "返回从 x 到无穷大积分的互补 ERF 函数",
		abstract: "返回从 x 到无穷大积分的互补 ERF 函数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/erfc-precise-function"
		}],
		functionParameter: { x: {
			name: "下限",
			detail: "ERFC.PRECISE函数的积分下限。"
		} }
	},
	GESTEP: {
		description: "检验数字是否大于阈值",
		abstract: "检验数字是否大于阈值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/gestep-function"
		}],
		functionParameter: {
			number: {
				name: "数值",
				detail: "要针对阈值进行测试的值。"
			},
			step: {
				name: "阈值",
				detail: "阈值。如果省略阈值，则 GESTEP 使用零。"
			}
		}
	},
	HEX2BIN: {
		description: "将十六进制数转换为二进制数",
		abstract: "将十六进制数转换为二进制数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/hex2bin-function"
		}],
		functionParameter: {
			number: {
				name: "十六进制数",
				detail: "要转换的十六进制数。"
			},
			places: {
				name: "字符数",
				detail: "要使用的字符数。"
			}
		}
	},
	HEX2DEC: {
		description: "将十六进制数转换为十进制数",
		abstract: "将十六进制数转换为十进制数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/hex2dec-function"
		}],
		functionParameter: { number: {
			name: "十六进制数",
			detail: "要转换的十六进制数。"
		} }
	},
	HEX2OCT: {
		description: "将十六进制数转换为八进制数",
		abstract: "将十六进制数转换为八进制数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/hex2oct-function"
		}],
		functionParameter: {
			number: {
				name: "十六进制数",
				detail: "要转换的十六进制数。"
			},
			places: {
				name: "字符数",
				detail: "要使用的字符数。"
			}
		}
	},
	IMABS: {
		description: "返回复数的绝对值（模数）",
		abstract: "返回复数的绝对值（模数）",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/imabs-function"
		}],
		functionParameter: { inumber: {
			name: "复数",
			detail: "需要计算其绝对值的复数。"
		} }
	},
	IMAGINARY: {
		description: "返回以 x+yi 或 x+yj 文本格式表示的复数的虚系数。",
		abstract: "返回以 x+yi 或 x+yj 文本格式表示的复数的虚系数。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/imaginary-function"
		}],
		functionParameter: { inumber: {
			name: "复数",
			detail: "必填。 需要计算其虚系数的复数。"
		} }
	},
	IMARGUMENT: {
		description: "返回参数 theta，即以弧度表示的角",
		abstract: "返回参数 theta，即以弧度表示的角",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/imargument-function"
		}],
		functionParameter: { inumber: {
			name: "复数",
			detail: "要为其参数 theta 的复数。"
		} }
	},
	IMCONJUGATE: {
		description: "返回复数的共轭复数",
		abstract: "返回复数的共轭复数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/imconjugate-function"
		}],
		functionParameter: { inumber: {
			name: "复数",
			detail: "需要计算其共轭数的复数。"
		} }
	},
	IMCOS: {
		description: "返回复数的余弦",
		abstract: "返回复数的余弦",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/imcos-function"
		}],
		functionParameter: { inumber: {
			name: "复数",
			detail: "需要计算其余弦值的复数。"
		} }
	},
	IMCOSH: {
		description: "返回复数的双曲余弦值",
		abstract: "返回复数的双曲余弦值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/imcosh-function"
		}],
		functionParameter: { inumber: {
			name: "复数",
			detail: "需要计算其双曲余弦值的复数。"
		} }
	},
	IMCOT: {
		description: "返回复数的余切值",
		abstract: "返回复数的余切值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/imcot-function"
		}],
		functionParameter: { inumber: {
			name: "复数",
			detail: "需要计算其余切值的复数。"
		} }
	},
	IMCOTH: {
		description: "IMCOTH 函数返回给定复数的双曲余切值。 例如，给定复数“x+yi”会返回“coth(x+yi)”。",
		abstract: "IMCOTH 函数返回给定复数的双曲余切值。 例如，给定复数“x+yi”会返回“coth(x+yi)”。",
		links: [{
			title: "教学",
			url: "https://support.google.com/docs/answer/9366256?hl=zh-Hans"
		}],
		functionParameter: { inumber: {
			name: "复数",
			detail: "要计算其双曲余切值的复数。 该数值可以是由 COMPLEX 函数计算得出的结果、实数（可看作虚部等于 0 的复数），或是格式为“x+yi”的字符串（其中 x 和 y 均为数字）。"
		} }
	},
	IMCSC: {
		description: "返回复数的余割值",
		abstract: "返回复数的余割值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/imcsc-function"
		}],
		functionParameter: { inumber: {
			name: "复数",
			detail: "需要计算其余割值的复数。"
		} }
	},
	IMCSCH: {
		description: "返回复数的双曲余割值",
		abstract: "返回复数的双曲余割值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/imcsch-function"
		}],
		functionParameter: { inumber: {
			name: "复数",
			detail: "需要计算其双曲余割值的复数。"
		} }
	},
	IMDIV: {
		description: "返回两个复数的商",
		abstract: "返回两个复数的商",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/imdiv-function"
		}],
		functionParameter: {
			inumber1: {
				name: "复数分子",
				detail: "复数分子或被除数。"
			},
			inumber2: {
				name: "复数分母",
				detail: "复数分母或除数。"
			}
		}
	},
	IMEXP: {
		description: "返回复数的指数",
		abstract: "返回复数的指数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/imexp-function"
		}],
		functionParameter: { inumber: {
			name: "复数",
			detail: "需要计算其指数的复数。"
		} }
	},
	IMLN: {
		description: "返回复数的自然对数",
		abstract: "返回复数的自然对数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/imln-function"
		}],
		functionParameter: { inumber: {
			name: "复数",
			detail: "需要计算其自然对数的复数。"
		} }
	},
	IMLOG: {
		description: "IMLOG 函数返回某个复数以特定数为底的对数。",
		abstract: "IMLOG 函数返回某个复数以特定数为底的对数。",
		links: [{
			title: "教学",
			url: "https://support.google.com/docs/answer/9366486?hl=zh-Hans"
		}],
		functionParameter: {
			inumber: {
				name: "复数",
				detail: "对数函数的输入值。 数值可以写成普通数字（如 1），可视为实数。 数值也可以写成引用文字，以便指定实系数和复系数。"
			},
			base: {
				name: "底数",
				detail: "用于计算相应对数的底数。 必须为正实数。"
			}
		}
	},
	IMLOG10: {
		description: "返回复数的以 10 为底的对数",
		abstract: "返回复数的以 10 为底的对数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/imlog10-function"
		}],
		functionParameter: { inumber: {
			name: "复数",
			detail: "需要计算其常用对数的复数。"
		} }
	},
	IMLOG2: {
		description: "返回复数的以 2 为底的对数",
		abstract: "返回复数的以 2 为底的对数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/imlog2-function"
		}],
		functionParameter: { inumber: {
			name: "复数",
			detail: "需要计算以 2 为底数的对数的复数。"
		} }
	},
	IMPOWER: {
		description: "返回复数的整数幂",
		abstract: "返回复数的整数幂",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/impower-function"
		}],
		functionParameter: {
			inumber: {
				name: "复数",
				detail: "需要计算其幂值的复数。"
			},
			number: {
				name: "数值",
				detail: "需要对复数应用的幂次。"
			}
		}
	},
	IMPRODUCT: {
		description: "返回多个复数的乘积",
		abstract: "返回多个复数的乘积",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/improduct-function"
		}],
		functionParameter: {
			inumber1: {
				name: "复数1",
				detail: "1 到 255 个要相乘的复数。"
			},
			inumber2: {
				name: "复数2",
				detail: "1 到 255 个要相乘的复数。"
			}
		}
	},
	IMREAL: {
		description: "返回复数的实系数",
		abstract: "返回复数的实系数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/imreal-function"
		}],
		functionParameter: { inumber: {
			name: "复数",
			detail: "需要计算其实系数的复数。"
		} }
	},
	IMSEC: {
		description: "返回复数的正割值",
		abstract: "返回复数的正割值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/imsec-function"
		}],
		functionParameter: { inumber: {
			name: "复数",
			detail: "需要计算其正割值的复数。"
		} }
	},
	IMSECH: {
		description: "返回复数的双曲正割值",
		abstract: "返回复数的双曲正割值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/imsech-function"
		}],
		functionParameter: { inumber: {
			name: "复数",
			detail: "需要计算其双曲正割值的复数。"
		} }
	},
	IMSIN: {
		description: "返回复数的正弦",
		abstract: "返回复数的正弦",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/imsin-function"
		}],
		functionParameter: { inumber: {
			name: "复数",
			detail: "需要计算其正弦值的复数。"
		} }
	},
	IMSINH: {
		description: "返回复数的双曲正弦值",
		abstract: "返回复数的双曲正弦值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/imsinh-function"
		}],
		functionParameter: { inumber: {
			name: "复数",
			detail: "需要计算其双曲正弦值的复数。"
		} }
	},
	IMSQRT: {
		description: "返回复数的平方根",
		abstract: "返回复数的平方根",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/imsqrt-function"
		}],
		functionParameter: { inumber: {
			name: "复数",
			detail: "需要计算其平方根的复数。"
		} }
	},
	IMSUB: {
		description: "返回两个复数的差",
		abstract: "返回两个复数的差",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/imsub-function"
		}],
		functionParameter: {
			inumber1: {
				name: "复数1",
				detail: "复数1。"
			},
			inumber2: {
				name: "复数2",
				detail: "复数2。"
			}
		}
	},
	IMSUM: {
		description: "返回多个复数的和",
		abstract: "返回多个复数的和",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/imsum-function"
		}],
		functionParameter: {
			inumber1: {
				name: "复数1",
				detail: "1 到 255 个要相加的复数。"
			},
			inumber2: {
				name: "复数2",
				detail: "1 到 255 个要相加的复数。"
			}
		}
	},
	IMTAN: {
		description: "返回复数的正切值",
		abstract: "返回复数的正切值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/imtan-function"
		}],
		functionParameter: { inumber: {
			name: "复数",
			detail: "需要计算其正切值的复数。"
		} }
	},
	IMTANH: {
		description: "IMTANH 函数返回给定复数的双曲正切值。 例如，给定复数“x+yi”会返回“tanh(x+yi)”。",
		abstract: "IMTANH 函数返回给定复数的双曲正切值。 例如，给定复数“x+yi”会返回“tanh(x+yi)”。",
		links: [{
			title: "教学",
			url: "https://support.google.com/docs/answer/9366655?hl=zh-Hans"
		}],
		functionParameter: { inumber: {
			name: "复数",
			detail: "要计算其双曲正切值的复数。 该数值可以是 COMPLEX 函数计算得出的结果、实数（将被视作虚部等于 0 的复数），或是格式为“x+yi”的字符串（其中 x 和 y 均为数字）。"
		} }
	},
	OCT2BIN: {
		description: "将八进制数转换为二进制数",
		abstract: "将八进制数转换为二进制数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/oct2bin-function"
		}],
		functionParameter: {
			number: {
				name: "八进制数",
				detail: "要转换的八进制数。"
			},
			places: {
				name: "字符数",
				detail: "要使用的字符数。"
			}
		}
	},
	OCT2DEC: {
		description: "将八进制数转换为十进制数",
		abstract: "将八进制数转换为十进制数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/oct2dec-function"
		}],
		functionParameter: { number: {
			name: "八进制数",
			detail: "要转换的八进制数。"
		} }
	},
	OCT2HEX: {
		description: "将八进制数转换为十六进制数",
		abstract: "将八进制数转换为十六进制数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/oct2hex-function"
		}],
		functionParameter: {
			number: {
				name: "八进制数",
				detail: "要转换的八进制数。"
			},
			places: {
				name: "字符数",
				detail: "要使用的字符数。"
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/financial/zh-CN.ts
const locale$9 = {
	ACCRINT: {
		description: "返回定期支付利息的债券的应计利息",
		abstract: "返回定期支付利息的债券的应计利息",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/accrint-function"
		}],
		functionParameter: {
			issue: {
				name: "发行日",
				detail: "有价证券的发行日。"
			},
			firstInterest: {
				name: "首次计息日",
				detail: "有价证券的首次计息日。"
			},
			settlement: {
				name: "到期日",
				detail: "有价证券的到期日。"
			},
			rate: {
				name: "利率",
				detail: "有价证券的年息票利率。"
			},
			par: {
				name: "面值",
				detail: "有价证券的票面值。"
			},
			frequency: {
				name: "频次",
				detail: "年付息次数。"
			},
			basis: {
				name: "基准",
				detail: "要使用的日计数基准类型。"
			},
			calcMethod: {
				name: "计算方法",
				detail: "是一个逻辑值：从发行日期开始的应计利息 = TRUE 或忽略；从最后票息支付日期开始计算 = FALSE。"
			}
		}
	},
	ACCRINTM: {
		description: "返回在到期日支付利息的债券的应计利息",
		abstract: "返回在到期日支付利息的债券的应计利息",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/accrintm-function"
		}],
		functionParameter: {
			issue: {
				name: "发行日",
				detail: "有价证券的发行日。"
			},
			settlement: {
				name: "到期日",
				detail: "有价证券的到期日。"
			},
			rate: {
				name: "利率",
				detail: "有价证券的年息票利率。"
			},
			par: {
				name: "面值",
				detail: "有价证券的票面值。"
			},
			basis: {
				name: "基准",
				detail: "要使用的日计数基准类型。"
			}
		}
	},
	AMORDEGRC: {
		description: "使用折旧系数返回每个记帐期的折旧值",
		abstract: "使用折旧系数返回每个记帐期的折旧值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/amordegrc-function"
		}],
		functionParameter: {
			cost: {
				name: "成本",
				detail: "资产原值。"
			},
			datePurchased: {
				name: "购买日期",
				detail: "购入资产的日期。"
			},
			firstPeriod: {
				name: "首个期间",
				detail: "第一个期间结束时的日期。"
			},
			salvage: {
				name: "残值",
				detail: "资产在使用寿命结束时的残值。"
			},
			period: {
				name: "期间",
				detail: "期间。"
			},
			rate: {
				name: "折旧率",
				detail: "折旧率。"
			},
			basis: {
				name: "基准",
				detail: "要使用的年基准。"
			}
		}
	},
	AMORLINC: {
		description: "返回每个记帐期的折旧值",
		abstract: "返回每个记帐期的折旧值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/amorlinc-function"
		}],
		functionParameter: {
			cost: {
				name: "成本",
				detail: "资产原值。"
			},
			datePurchased: {
				name: "购买日期",
				detail: "购入资产的日期。"
			},
			firstPeriod: {
				name: "首个期间",
				detail: "第一个期间结束时的日期。"
			},
			salvage: {
				name: "残值",
				detail: "资产在使用寿命结束时的残值。"
			},
			period: {
				name: "期间",
				detail: "期间。"
			},
			rate: {
				name: "折旧率",
				detail: "折旧率。"
			},
			basis: {
				name: "基准",
				detail: "要使用的年基准。"
			}
		}
	},
	COUPDAYBS: {
		description: "返回从票息期开始到结算日之间的天数",
		abstract: "返回从票息期开始到结算日之间的天数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/coupdaybs-function"
		}],
		functionParameter: {
			settlement: {
				name: "结算日",
				detail: "有价证券的结算日。"
			},
			maturity: {
				name: "到期日",
				detail: "有价证券的到期日。"
			},
			frequency: {
				name: "频次",
				detail: "年付息次数。"
			},
			basis: {
				name: "基准",
				detail: "要使用的日计数基准类型。"
			}
		}
	},
	COUPDAYS: {
		description: "返回包含结算日的票息期天数",
		abstract: "返回包含结算日的票息期天数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/coupdays-function"
		}],
		functionParameter: {
			settlement: {
				name: "结算日",
				detail: "有价证券的结算日。"
			},
			maturity: {
				name: "到期日",
				detail: "有价证券的到期日。"
			},
			frequency: {
				name: "频次",
				detail: "年付息次数。"
			},
			basis: {
				name: "基准",
				detail: "要使用的日计数基准类型。"
			}
		}
	},
	COUPDAYSNC: {
		description: "返回从结算日到下一票息支付日之间的天数",
		abstract: "返回从结算日到下一票息支付日之间的天数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/coupdaysnc-function"
		}],
		functionParameter: {
			settlement: {
				name: "结算日",
				detail: "有价证券的结算日。"
			},
			maturity: {
				name: "到期日",
				detail: "有价证券的到期日。"
			},
			frequency: {
				name: "频次",
				detail: "年付息次数。"
			},
			basis: {
				name: "基准",
				detail: "要使用的日计数基准类型。"
			}
		}
	},
	COUPNCD: {
		description: "返回结算日之后的下一个票息支付日",
		abstract: "返回结算日之后的下一个票息支付日",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/coupncd-function"
		}],
		functionParameter: {
			settlement: {
				name: "结算日",
				detail: "有价证券的结算日。"
			},
			maturity: {
				name: "到期日",
				detail: "有价证券的到期日。"
			},
			frequency: {
				name: "频次",
				detail: "年付息次数。"
			},
			basis: {
				name: "基准",
				detail: "要使用的日计数基准类型。"
			}
		}
	},
	COUPNUM: {
		description: "返回结算日与到期日之间可支付的票息数",
		abstract: "返回结算日与到期日之间可支付的票息数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/coupnum-function"
		}],
		functionParameter: {
			settlement: {
				name: "结算日",
				detail: "有价证券的结算日。"
			},
			maturity: {
				name: "到期日",
				detail: "有价证券的到期日。"
			},
			frequency: {
				name: "频次",
				detail: "年付息次数。"
			},
			basis: {
				name: "基准",
				detail: "要使用的日计数基准类型。"
			}
		}
	},
	COUPPCD: {
		description: "返回结算日之前的上一票息支付日",
		abstract: "返回结算日之前的上一票息支付日",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/couppcd-function"
		}],
		functionParameter: {
			settlement: {
				name: "结算日",
				detail: "有价证券的结算日。"
			},
			maturity: {
				name: "到期日",
				detail: "有价证券的到期日。"
			},
			frequency: {
				name: "频次",
				detail: "年付息次数。"
			},
			basis: {
				name: "基准",
				detail: "要使用的日计数基准类型。"
			}
		}
	},
	CUMIPMT: {
		description: "返回两个付款期之间累积支付的利息",
		abstract: "返回两个付款期之间累积支付的利息",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/cumipmt-function"
		}],
		functionParameter: {
			rate: {
				name: "利率",
				detail: "利率。"
			},
			nper: {
				name: "总期数",
				detail: "总付款期数。"
			},
			pv: {
				name: "现值",
				detail: "现值。"
			},
			startPeriod: {
				name: "首期",
				detail: "计算中的首期。付款期数从1开始计数。"
			},
			endPeriod: {
				name: "末期",
				detail: "计算中的末期。"
			},
			type: {
				name: "类型",
				detail: "付款时间类型。"
			}
		}
	},
	CUMPRINC: {
		description: "返回两个付款期之间为贷款累积支付的本金",
		abstract: "返回两个付款期之间为贷款累积支付的本金",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/cumprinc-function"
		}],
		functionParameter: {
			rate: {
				name: "利率",
				detail: "利率。"
			},
			nper: {
				name: "总期数",
				detail: "总付款期数。"
			},
			pv: {
				name: "现值",
				detail: "现值。"
			},
			startPeriod: {
				name: "首期",
				detail: "计算中的首期。付款期数从1开始计数。"
			},
			endPeriod: {
				name: "末期",
				detail: "计算中的末期。"
			},
			type: {
				name: "类型",
				detail: "付款时间类型。"
			}
		}
	},
	DB: {
		description: "使用固定余额递减法，返回一笔资产在给定期间内的折旧值",
		abstract: "使用固定余额递减法，返回一笔资产在给定期间内的折旧值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/db-function"
		}],
		functionParameter: {
			cost: {
				name: "成本",
				detail: "资产原值。"
			},
			salvage: {
				name: "残值",
				detail: "折旧末尾时的值（有时也称为资产残值）。"
			},
			life: {
				name: "使用寿命",
				detail: "资产的折旧期数（有时也称作资产的使用寿命）。"
			},
			period: {
				name: "期间",
				detail: "要计算折旧的时期。"
			},
			month: {
				name: "月份",
				detail: "第一年的月份数。如果省略月份，则假定其值为12。"
			}
		}
	},
	DDB: {
		description: "使用双倍余额递减法或其他指定方法，返回一笔资产在给定期间内的折旧值",
		abstract: "使用双倍余额递减法或其他指定方法，返回一笔资产在给定期间内的折旧值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/ddb-function"
		}],
		functionParameter: {
			cost: {
				name: "成本",
				detail: "资产原值。"
			},
			salvage: {
				name: "残值",
				detail: "折旧末尾时的值（有时也称为资产残值）。"
			},
			life: {
				name: "使用寿命",
				detail: "资产的折旧期数（有时也称作资产的使用寿命）。"
			},
			period: {
				name: "期间",
				detail: "要计算折旧的时期。"
			},
			factor: {
				name: "速率",
				detail: "余额递减速率。如果省略影响因素，则假定为2（双倍余额递减法）。"
			}
		}
	},
	DISC: {
		description: "返回债券的贴现率",
		abstract: "返回债券的贴现率",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/disc-function"
		}],
		functionParameter: {
			settlement: {
				name: "结算日",
				detail: "有价证券的结算日。"
			},
			maturity: {
				name: "到期日",
				detail: "有价证券的到期日。"
			},
			pr: {
				name: "价格",
				detail: "有价证券的价格（按面值为￥100计算）。"
			},
			redemption: {
				name: "清偿价",
				detail: "面值￥100的有价证券的清偿价值。"
			},
			basis: {
				name: "基准",
				detail: "要使用的日计数基准类型。"
			}
		}
	},
	DOLLARDE: {
		description: "将以分数表示的价格转换为以小数表示的价格",
		abstract: "将以分数表示的价格转换为以小数表示的价格",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/dollarde-function"
		}],
		functionParameter: {
			fractionalDollar: {
				name: "分数",
				detail: "以整数部份和分数部分表示的数字，用小数点隔开。"
			},
			fraction: {
				name: "分母",
				detail: "用作分数中的分母的整数。"
			}
		}
	},
	DOLLARFR: {
		description: "将以小数表示的价格转换为以分数表示的价格",
		abstract: "将以小数表示的价格转换为以分数表示的价格",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/dollarfr-function"
		}],
		functionParameter: {
			decimalDollar: {
				name: "小数",
				detail: "小数。"
			},
			fraction: {
				name: "分母",
				detail: "用作分数中的分母的整数。"
			}
		}
	},
	DURATION: {
		description: "返回定期支付利息的债券的每年期限",
		abstract: "返回定期支付利息的债券的每年期限",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/duration-function"
		}],
		functionParameter: {
			settlement: {
				name: "结算日",
				detail: "有价证券的结算日。"
			},
			maturity: {
				name: "到期日",
				detail: "有价证券的到期日。"
			},
			coupon: {
				name: "年息票利率",
				detail: "有价证券的年息票利率。"
			},
			yld: {
				name: "年收益率",
				detail: "有价证券的年收益率。"
			},
			frequency: {
				name: "频次",
				detail: "年付息次数。"
			},
			basis: {
				name: "基准",
				detail: "要使用的日计数基准类型。"
			}
		}
	},
	EFFECT: {
		description: "返回年有效利率",
		abstract: "返回年有效利率",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/effect-function"
		}],
		functionParameter: {
			nominalRate: {
				name: "名义利率",
				detail: "名义利率。"
			},
			npery: {
				name: "期数",
				detail: "每年的复利期数。"
			}
		}
	},
	FV: {
		description: "返回一笔投资的未来值",
		abstract: "返回一笔投资的未来值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/fv-function"
		}],
		functionParameter: {
			rate: {
				name: "利率",
				detail: "各期利率。"
			},
			nper: {
				name: "总期数",
				detail: "年金的付款总期数。"
			},
			pmt: {
				name: "金额",
				detail: "各期所应支付的金额，在整个年金期间保持不变。"
			},
			pv: {
				name: "现值",
				detail: "现值，或一系列未来付款的当前值的累积和。"
			},
			type: {
				name: "类型",
				detail: "数字0或1，用以指定各期的付款时间是在期初还是期末。"
			}
		}
	},
	FVSCHEDULE: {
		description: "返回应用一系列复利率计算的初始本金的未来值。 使用 FVSCHEDULE 通过变量或可调节利率计算某项投资未来的价值。",
		abstract: "返回应用一系列复利率计算的初始本金的未来值。 使用 FVSCHEDULE 通过变量或可调节利率计算某项投资未来的价值。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/fvschedule-function"
		}],
		functionParameter: {
			principal: {
				name: "本金",
				detail: "必填。 现值。"
			},
			schedule: {
				name: "利率数组",
				detail: "必填。 要应用的利率数组。"
			}
		}
	},
	INTRATE: {
		description: "返回完全投资型证券的利率。",
		abstract: "返回完全投资型证券的利率。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/intrate-function"
		}],
		functionParameter: {
			settlement: {
				name: "结算日",
				detail: "必填。 有价证券的结算日。 有价证券结算日是在发行日之后，有价证券卖给购买者的日期。"
			},
			maturity: {
				name: "到期日",
				detail: "必填。 有价证券的到期日。 到期日是有价证券有效期截止时的日期。"
			},
			investment: {
				name: "投资额",
				detail: "必填。 有价证券的投资额。"
			},
			redemption: {
				name: "清偿价",
				detail: "必填。 有价证券到期时的兑换值。"
			},
			basis: {
				name: "基准",
				detail: "选。 要使用的日计数基准类型。"
			}
		}
	},
	IPMT: {
		description: "返回一笔投资在给定期间内支付的利息",
		abstract: "返回一笔投资在给定期间内支付的利息",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/ipmt-function"
		}],
		functionParameter: {
			rate: {
				name: "利率",
				detail: "各期利率。"
			},
			per: {
				name: "期数",
				detail: "用于计算其利息数额的期数，必须在1到nper之间。"
			},
			nper: {
				name: "总期数",
				detail: "年金的付款总期数。"
			},
			pv: {
				name: "现值",
				detail: "现值，或一系列未来付款的当前值的累积和。"
			},
			fv: {
				name: "余额",
				detail: "未来值，或在最后一次付款后希望得到的现金余额。"
			},
			type: {
				name: "类型",
				detail: "数字0或1，用以指定各期的付款时间是在期初还是期末。"
			}
		}
	},
	IRR: {
		description: "返回一系列现金流的内部收益率",
		abstract: "返回一系列现金流的内部收益率",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/irr-function"
		}],
		functionParameter: {
			values: {
				name: "现金流",
				detail: "数组或单元格的引用，这些单元格包含用来计算内部收益率的数字。\n1.Values 必须包含至少一个正值和一个负值，以计算返回的内部收益率。\n2.IRR 使用值的顺序来说明现金流的顺序。 一定要按需要的顺序输入支出值和收益值。\n3.如果数组或引用包含文本、逻辑值或空白单元格，这些数值将被忽略。"
			},
			guess: {
				name: "估计值",
				detail: "对函数 IRR 计算结果的估计值。"
			}
		}
	},
	ISPMT: {
		description: "计算特定投资期内要支付的利息",
		abstract: "计算特定投资期内要支付的利息",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/ispmt-function"
		}],
		functionParameter: {
			rate: {
				name: "利率",
				detail: "投资的利率。"
			},
			per: {
				name: "期数",
				detail: "要查找兴趣的时间段，并且必须介于1和Nper之间。"
			},
			nper: {
				name: "总期数",
				detail: "投资的总支付期数。"
			},
			pv: {
				name: "现值",
				detail: "投资的现值。对于贷款，Pv是贷款金额。"
			}
		}
	},
	MDURATION: {
		description: "返回假设面值为 ￥100 的有价证券的 Macauley 修正期限",
		abstract: "返回假设面值为 ￥100 的有价证券的 Macauley 修正期限",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/mduration-function"
		}],
		functionParameter: {
			settlement: {
				name: "结算日",
				detail: "有价证券的结算日。"
			},
			maturity: {
				name: "到期日",
				detail: "有价证券的到期日。"
			},
			coupon: {
				name: "年息票利率",
				detail: "有价证券的年息票利率。"
			},
			yld: {
				name: "年收益率",
				detail: "有价证券的年收益率。"
			},
			frequency: {
				name: "频次",
				detail: "年付息次数。"
			},
			basis: {
				name: "基准",
				detail: "要使用的日计数基准类型。"
			}
		}
	},
	MIRR: {
		description: "返回正和负现金流以不同利率进行计算的内部收益率",
		abstract: "返回正和负现金流以不同利率进行计算的内部收益率",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/mirr-function"
		}],
		functionParameter: {
			values: {
				name: "现金流",
				detail: "数组或对包含数字的单元格的引用。 这些数值代表一系列定期支出（负值）和收益（正值）。\n1.Values 必须至少包含一个正值和一个负值，才能计算修改后的内部回报率。 否则，MIRR 返回 #DIV/0！ 。\n2.如果数组或引用参数包含文本、逻辑值或空白单元格，则这些值将被忽略；但包含零值的单元格将计算在内。"
			},
			financeRate: {
				name: "融资利率",
				detail: "现金流中使用的资金支付的利率。"
			},
			reinvestRate: {
				name: "再投资收益率",
				detail: "将现金流再投资的收益率。"
			}
		}
	},
	NOMINAL: {
		description: "返回年度的名义利率",
		abstract: "返回年度的名义利率",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/nominal-function"
		}],
		functionParameter: {
			effectRate: {
				name: "实际利率",
				detail: "实际利率。"
			},
			npery: {
				name: "期数",
				detail: "每年的复利期数。"
			}
		}
	},
	NPER: {
		description: "返回投资的期数",
		abstract: "返回投资的期数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/nper-function"
		}],
		functionParameter: {
			rate: {
				name: "利率",
				detail: "各期利率。"
			},
			pmt: {
				name: "金额",
				detail: "各期所应支付的金额，在整个年金期间保持不变。"
			},
			pv: {
				name: "现值",
				detail: "现值，或一系列未来付款的当前值的累积和。"
			},
			fv: {
				name: "余额",
				detail: "未来值，或在最后一次付款后希望得到的现金余额。"
			},
			type: {
				name: "类型",
				detail: "数字0或1，用以指定各期的付款时间是在期初还是期末。"
			}
		}
	},
	NPV: {
		description: "返回基于一系列定期的现金流和贴现率计算的投资的净现值",
		abstract: "返回基于一系列定期的现金流和贴现率计算的投资的净现值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/npv-function"
		}],
		functionParameter: {
			rate: {
				name: "贴现率",
				detail: "某一期间的贴现率。"
			},
			value1: {
				name: "现金流1",
				detail: "这些是代表支出及收入的 1 到 254 个参数。"
			},
			value2: {
				name: "现金流2",
				detail: "这些是代表支出及收入的 1 到 254 个参数。"
			}
		}
	},
	ODDFPRICE: {
		description: "返回每张票面为 ￥100 且第一期为奇数的债券的现价",
		abstract: "返回每张票面为 ￥100 且第一期为奇数的债券的现价",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/oddfprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "结算日",
				detail: "有价证券的结算日。"
			},
			maturity: {
				name: "到期日",
				detail: "有价证券的到期日。"
			},
			issue: {
				name: "发行日",
				detail: "有价证券的发行日。"
			},
			firstCoupon: {
				name: "首期付息日",
				detail: "有价证券的首期付息日。"
			},
			rate: {
				name: "利率",
				detail: "有价证券的利率。"
			},
			yld: {
				name: "年收益率",
				detail: "有价证券的年收益率。"
			},
			redemption: {
				name: "清偿价",
				detail: "面值 ￥100 的有价证券的清偿价值。"
			},
			frequency: {
				name: "频次",
				detail: "年付息次数。 如果按年支付，frequency = 1；按半年期支付，frequency = 2；按季支付，frequency = 4。"
			},
			basis: {
				name: "基准",
				detail: "要使用的日计数基准类型。"
			}
		}
	},
	ODDFYIELD: {
		description: "返回第一期为奇数的债券的收益",
		abstract: "返回第一期为奇数的债券的收益",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/oddfyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "结算日",
				detail: "有价证券的结算日。"
			},
			maturity: {
				name: "到期日",
				detail: "有价证券的到期日。"
			},
			issue: {
				name: "发行日",
				detail: "有价证券的发行日。"
			},
			firstCoupon: {
				name: "首期付息日",
				detail: "有价证券的首期付息日。"
			},
			rate: {
				name: "利率",
				detail: "有价证券的利率。"
			},
			pr: {
				name: "价格",
				detail: "有价证券的价格。"
			},
			redemption: {
				name: "清偿价",
				detail: "面值 ￥100 的有价证券的清偿价值。"
			},
			frequency: {
				name: "频次",
				detail: "年付息次数。 如果按年支付，frequency = 1；按半年期支付，frequency = 2；按季支付，frequency = 4。"
			},
			basis: {
				name: "基准",
				detail: "要使用的日计数基准类型。"
			}
		}
	},
	ODDLPRICE: {
		description: "返回每张票面为 ￥100 且最后一期为奇数的债券的现价",
		abstract: "返回每张票面为 ￥100 且最后一期为奇数的债券的现价",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/oddlprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "结算日",
				detail: "有价证券的结算日。"
			},
			maturity: {
				name: "到期日",
				detail: "有价证券的到期日。"
			},
			lastInterest: {
				name: "末期付息日",
				detail: "有价证券的末期付息日。"
			},
			rate: {
				name: "利率",
				detail: "有价证券的利率。"
			},
			yld: {
				name: "年收益率",
				detail: "有价证券的年收益率。"
			},
			redemption: {
				name: "清偿价",
				detail: "面值 ￥100 的有价证券的清偿价值。"
			},
			frequency: {
				name: "频次",
				detail: "年付息次数。 如果按年支付，frequency = 1；按半年期支付，frequency = 2；按季支付，frequency = 4。"
			},
			basis: {
				name: "基准",
				detail: "要使用的日计数基准类型。"
			}
		}
	},
	ODDLYIELD: {
		description: "返回最后一期为奇数的债券的收益",
		abstract: "返回最后一期为奇数的债券的收益",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/oddlyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "结算日",
				detail: "有价证券的结算日。"
			},
			maturity: {
				name: "到期日",
				detail: "有价证券的到期日。"
			},
			lastInterest: {
				name: "末期付息日",
				detail: "有价证券的末期付息日。"
			},
			rate: {
				name: "利率",
				detail: "有价证券的利率。"
			},
			pr: {
				name: "价格",
				detail: "有价证券的价格。"
			},
			redemption: {
				name: "清偿价",
				detail: "面值 ￥100 的有价证券的清偿价值。"
			},
			frequency: {
				name: "频次",
				detail: "年付息次数。 如果按年支付，frequency = 1；按半年期支付，frequency = 2；按季支付，frequency = 4。"
			},
			basis: {
				name: "基准",
				detail: "要使用的日计数基准类型。"
			}
		}
	},
	PDURATION: {
		description: "返回投资到达指定值所需的期数",
		abstract: "返回投资到达指定值所需的期数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/pduration-function"
		}],
		functionParameter: {
			rate: {
				name: "利率",
				detail: "每个周期的利率。"
			},
			pv: {
				name: "现值",
				detail: "投资的现值。"
			},
			fv: {
				name: "未来价值",
				detail: "投资的预期未来价值。"
			}
		}
	},
	PMT: {
		description: "返回年金的定期支付金额",
		abstract: "返回年金的定期支付金额",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/pmt-function"
		}],
		functionParameter: {
			rate: {
				name: "利率",
				detail: "各期利率。"
			},
			nper: {
				name: "总期数",
				detail: "年金的付款总期数。"
			},
			pv: {
				name: "现值",
				detail: "现值，或一系列未来付款的当前值的累积和。"
			},
			fv: {
				name: "余额",
				detail: "未来值，或在最后一次付款后希望得到的现金余额。"
			},
			type: {
				name: "类型",
				detail: "数字0或1，用以指定各期的付款时间是在期初还是期末。"
			}
		}
	},
	PPMT: {
		description: "返回一笔投资在给定期间内偿还的本金",
		abstract: "返回一笔投资在给定期间内偿还的本金",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/ppmt-function"
		}],
		functionParameter: {
			rate: {
				name: "利率",
				detail: "各期利率。"
			},
			per: {
				name: "期数",
				detail: "用于计算其利息数额的期数，必须在1到nper之间。"
			},
			nper: {
				name: "总期数",
				detail: "年金的付款总期数。"
			},
			pv: {
				name: "现值",
				detail: "现值，或一系列未来付款的当前值的累积和。"
			},
			fv: {
				name: "余额",
				detail: "未来值，或在最后一次付款后希望得到的现金余额。"
			},
			type: {
				name: "类型",
				detail: "数字0或1，用以指定各期的付款时间是在期初还是期末。"
			}
		}
	},
	PRICE: {
		description: "返回每张票面为 ￥100 且定期支付利息的债券的现价",
		abstract: "返回每张票面为 ￥100 且定期支付利息的债券的现价",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/price-function"
		}],
		functionParameter: {
			settlement: {
				name: "结算日",
				detail: "有价证券的结算日。"
			},
			maturity: {
				name: "到期日",
				detail: "有价证券的到期日。"
			},
			rate: {
				name: "利率",
				detail: "有价证券的利率。"
			},
			yld: {
				name: "年收益率",
				detail: "有价证券的年收益率。"
			},
			redemption: {
				name: "清偿价",
				detail: "面值 ￥100 的有价证券的清偿价值。"
			},
			frequency: {
				name: "频次",
				detail: "年付息次数。 如果按年支付，frequency = 1；按半年期支付，frequency = 2；按季支付，frequency = 4。"
			},
			basis: {
				name: "基准",
				detail: "要使用的日计数基准类型。"
			}
		}
	},
	PRICEDISC: {
		description: "返回每张票面为 ￥100 的已贴现债券的现价",
		abstract: "返回每张票面为 ￥100 的已贴现债券的现价",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/pricedisc-function"
		}],
		functionParameter: {
			settlement: {
				name: "结算日",
				detail: "有价证券的结算日。"
			},
			maturity: {
				name: "到期日",
				detail: "有价证券的到期日。"
			},
			discount: {
				name: "贴现率",
				detail: "有价证券的贴现率。"
			},
			redemption: {
				name: "清偿价",
				detail: "面值 ￥100 的有价证券的清偿价值。"
			},
			basis: {
				name: "基准",
				detail: "要使用的日计数基准类型。"
			}
		}
	},
	PRICEMAT: {
		description: "返回每张票面为 ￥100 且在到期日支付利息的债券的现价",
		abstract: "返回每张票面为 ￥100 且在到期日支付利息的债券的现价",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/pricemat-function"
		}],
		functionParameter: {
			settlement: {
				name: "结算日",
				detail: "有价证券的结算日。"
			},
			maturity: {
				name: "到期日",
				detail: "有价证券的到期日。"
			},
			issue: {
				name: "发行日",
				detail: "有价证券的发行日。"
			},
			rate: {
				name: "利率",
				detail: "有价证券的利率。"
			},
			yld: {
				name: "年收益率",
				detail: "有价证券的年收益率。"
			},
			basis: {
				name: "基准",
				detail: "要使用的日计数基准类型。"
			}
		}
	},
	PV: {
		description: "返回投资的现值",
		abstract: "返回投资的现值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/pv-function"
		}],
		functionParameter: {
			rate: {
				name: "利率",
				detail: "各期利率。"
			},
			nper: {
				name: "总期数",
				detail: "年金的付款总期数。"
			},
			pmt: {
				name: "金额",
				detail: "各期所应支付的金额，在整个年金期间保持不变。"
			},
			fv: {
				name: "余额",
				detail: "未来值，或在最后一次付款后希望得到的现金余额。"
			},
			type: {
				name: "类型",
				detail: "数字0或1，用以指定各期的付款时间是在期初还是期末。"
			}
		}
	},
	RATE: {
		description: "返回年金的各期利率",
		abstract: "返回年金的各期利率",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/rate-function"
		}],
		functionParameter: {
			nper: {
				name: "总期数",
				detail: "年金的付款总期数。"
			},
			pmt: {
				name: "金额",
				detail: "各期所应支付的金额，在整个年金期间保持不变。"
			},
			pv: {
				name: "现值",
				detail: "现值，或一系列未来付款的当前值的累积和。"
			},
			fv: {
				name: "余额",
				detail: "未来值，或在最后一次付款后希望得到的现金余额。"
			},
			type: {
				name: "类型",
				detail: "数字0或1，用以指定各期的付款时间是在期初还是期末。"
			},
			guess: {
				name: "猜测值",
				detail: "预期利率。"
			}
		}
	},
	RECEIVED: {
		description: "返回完全投资型债券在到期日收回的金额",
		abstract: "返回完全投资型债券在到期日收回的金额",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/received-function"
		}],
		functionParameter: {
			settlement: {
				name: "结算日",
				detail: "有价证券的结算日。"
			},
			maturity: {
				name: "到期日",
				detail: "有价证券的到期日。"
			},
			investment: {
				name: "投资额",
				detail: "有价证券的投资额。"
			},
			discount: {
				name: "贴现率",
				detail: "有价证券的贴现率。"
			},
			basis: {
				name: "基准",
				detail: "要使用的日计数基准类型。"
			}
		}
	},
	RRI: {
		description: "返回某项投资增长的等效利率",
		abstract: "返回某项投资增长的等效利率",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/rri-function"
		}],
		functionParameter: {
			nper: {
				name: "总期数",
				detail: "投资的周期数。"
			},
			pv: {
				name: "现值",
				detail: "投资的现值。"
			},
			fv: {
				name: "未来价值",
				detail: "投资的未来价值。"
			}
		}
	},
	SLN: {
		description: "返回固定资产的每期线性折旧费",
		abstract: "返回固定资产的每期线性折旧费",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/sln-function"
		}],
		functionParameter: {
			cost: {
				name: "资产原值",
				detail: "资产原值。"
			},
			salvage: {
				name: "资产残值",
				detail: "折旧末尾时的值（有时也称为资产残值）。"
			},
			life: {
				name: "资产使用寿命",
				detail: "资产的折旧期数（有时也称作资产的使用寿命）。"
			}
		}
	},
	SYD: {
		description: "返回某项固定资产按年限总和折旧法计算的每期折旧金额",
		abstract: "返回某项固定资产按年限总和折旧法计算的每期折旧金额",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/syd-function"
		}],
		functionParameter: {
			cost: {
				name: "资产原值",
				detail: "资产原值。"
			},
			salvage: {
				name: "资产残值",
				detail: "折旧末尾时的值（有时也称为资产残值）。"
			},
			life: {
				name: "资产使用寿命",
				detail: "资产的折旧期数（有时也称作资产的使用寿命）。"
			},
			per: {
				name: "期间",
				detail: "期间。"
			}
		}
	},
	TBILLEQ: {
		description: "返回国库券的等价债券收益",
		abstract: "返回国库券的等价债券收益",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/tbilleq-function"
		}],
		functionParameter: {
			settlement: {
				name: "结算日",
				detail: "国库券的结算日。"
			},
			maturity: {
				name: "到期日",
				detail: "国库券的到期日。"
			},
			discount: {
				name: "贴现率",
				detail: "国库券的贴现率。"
			}
		}
	},
	TBILLPRICE: {
		description: "返回面值 ￥100 的国库券的价格",
		abstract: "返回面值 ￥100 的国库券的价格",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/tbillprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "结算日",
				detail: "国库券的结算日。"
			},
			maturity: {
				name: "到期日",
				detail: "国库券的到期日。"
			},
			discount: {
				name: "贴现率",
				detail: "国库券的贴现率。"
			}
		}
	},
	TBILLYIELD: {
		description: "返回国库券的收益率",
		abstract: "返回国库券的收益率",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/tbillyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "结算日",
				detail: "国库券的结算日。"
			},
			maturity: {
				name: "到期日",
				detail: "国库券的到期日。"
			},
			pr: {
				name: "价格",
				detail: "面值 ￥100 的国库券的价格。"
			}
		}
	},
	VDB: {
		description: "使用余额递减法，返回一笔资产在给定期间或部分期间内的折旧值",
		abstract: "使用余额递减法，返回一笔资产在给定期间或部分期间内的折旧值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/vdb-function"
		}],
		functionParameter: {
			cost: {
				name: "成本",
				detail: "资产原值。"
			},
			salvage: {
				name: "残值",
				detail: "折旧末尾时的值（有时也称为资产残值）。"
			},
			life: {
				name: "使用寿命",
				detail: "资产的折旧期数（有时也称作资产的使用寿命）。"
			},
			startPeriod: {
				name: "起始时期",
				detail: "要计算折旧的起始时期。"
			},
			endPeriod: {
				name: "终止时期",
				detail: "要计算折旧的终止时期。"
			},
			factor: {
				name: "速率",
				detail: "余额递减速率。如果省略影响因素，则假定为2（双倍余额递减法）。"
			},
			noSwitch: {
				name: "不切换",
				detail: "逻辑值，指定当折旧值大于余额递减计算值时，是否转用直线折旧法。"
			}
		}
	},
	XIRR: {
		description: "返回一组现金流的内部收益率，这些现金流不一定定期发生",
		abstract: "返回一组现金流的内部收益率，这些现金流不一定定期发生",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/xirr-function"
		}],
		functionParameter: {
			values: {
				name: "现金流",
				detail: "与 dates 中的支付时间相对应的一系列现金流。 首期支付是可选的，并与投资开始时的成本或支付有关。 如果第一个值是成本或支付，则它必须是负值。 所有后续支付都基于 365 天/年贴现。 值系列中必须至少包含一个正值和一个负值。"
			},
			dates: {
				name: "日期表",
				detail: "与现金流支付相对应的支付日期表。 日期可以按任意顺序出现。"
			},
			guess: {
				name: "估计值",
				detail: "对函数 XIRR 计算结果的估计值。"
			}
		}
	},
	XNPV: {
		description: "返回一组现金流的净现值，这些现金流不一定定期发生",
		abstract: "返回一组现金流的净现值，这些现金流不一定定期发生",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/xnpv-function"
		}],
		functionParameter: {
			rate: {
				name: "贴现率",
				detail: "应用于现金流的贴现率。"
			},
			values: {
				name: "现金流",
				detail: "与 dates 中的支付时间相对应的一系列现金流。 首期支付是可选的，并与投资开始时的成本或支付有关。 如果第一个值是成本或支付，则它必须是负值。 所有后续支付都基于 365 天/年贴现。 值系列中必须至少包含一个正值和一个负值。"
			},
			dates: {
				name: "日期表",
				detail: "与现金流支付相对应的支付日期表。 日期可以按任意顺序出现。"
			}
		}
	},
	YIELD: {
		description: "返回定期支付利息的债券的收益",
		abstract: "返回定期支付利息的债券的收益",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/yield-function"
		}],
		functionParameter: {
			settlement: {
				name: "结算日",
				detail: "有价证券的结算日。"
			},
			maturity: {
				name: "到期日",
				detail: "有价证券的到期日。"
			},
			rate: {
				name: "利率",
				detail: "有价证券的利率。"
			},
			pr: {
				name: "价格",
				detail: "有价证券的价格（按面值为 ￥100 计算）。"
			},
			redemption: {
				name: "清偿价",
				detail: "面值 ￥100 的有价证券的清偿价值。"
			},
			frequency: {
				name: "频次",
				detail: "年付息次数。 如果按年支付，frequency = 1；按半年期支付，frequency = 2；按季支付，frequency = 4。"
			},
			basis: {
				name: "基准",
				detail: "要使用的日计数基准类型。"
			}
		}
	},
	YIELDDISC: {
		description: "返回已贴现债券的年收益；例如，短期国库券",
		abstract: "返回已贴现债券的年收益；例如，短期国库券",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/yielddisc-function"
		}],
		functionParameter: {
			settlement: {
				name: "结算日",
				detail: "有价证券的结算日。"
			},
			maturity: {
				name: "到期日",
				detail: "有价证券的到期日。"
			},
			pr: {
				name: "价格",
				detail: "有价证券的价格（按面值为 ￥100 计算）。"
			},
			redemption: {
				name: "清偿价",
				detail: "面值 ￥100 的有价证券的清偿价值。"
			},
			basis: {
				name: "基准",
				detail: "要使用的日计数基准类型。"
			}
		}
	},
	YIELDMAT: {
		description: "返回在到期日支付利息的债券的年收益",
		abstract: "返回在到期日支付利息的债券的年收益",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/yieldmat-function"
		}],
		functionParameter: {
			settlement: {
				name: "结算日",
				detail: "有价证券的结算日。"
			},
			maturity: {
				name: "到期日",
				detail: "有价证券的到期日。"
			},
			issue: {
				name: "发行日",
				detail: "有价证券的发行日。"
			},
			rate: {
				name: "利率",
				detail: "有价证券的利率。"
			},
			pr: {
				name: "价格",
				detail: "有价证券的价格（按面值为 ￥100 计算）。"
			},
			basis: {
				name: "基准",
				detail: "要使用的日计数基准类型。"
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/information/zh-CN.ts
const locale$8 = {
	CELL: {
		description: "返回有关单元格格式、位置或内容的信息",
		abstract: "返回有关单元格格式、位置或内容的信息",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/cell-function"
		}],
		functionParameter: {
			infoType: {
				name: "信息类型",
				detail: "一个文本值，指定要返回的单元格信息的类型。"
			},
			reference: {
				name: "引用",
				detail: "需要其相关信息的单元格。"
			}
		}
	},
	ERROR_TYPE: {
		description: "返回对应于错误类型的数字",
		abstract: "返回对应于错误类型的数字",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/error-type-function"
		}],
		functionParameter: { errorVal: {
			name: "错误值",
			detail: "要查找其标识号的错误值。"
		} }
	},
	INFO: {
		description: "返回有关当前操作环境的信息",
		abstract: "返回有关当前操作环境的信息",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/info-function"
		}],
		functionParameter: { typeText: {
			name: "类型文本",
			detail: "指定要返回的信息类型的文本。"
		} }
	},
	ISBETWEEN: {
		description: "检查所提供的数值是否介于其他两个数字之间（含端值，还是不含端值）。",
		abstract: "检查所提供的数值是否介于其他两个数字之间（含端值，还是不含端值）。",
		links: [{
			title: "教学",
			url: "https://support.google.com/docs/answer/10538337?hl=zh-Hans"
		}],
		functionParameter: {
			valueToCompare: {
				name: "比较值",
				detail: "要测试的值，看是否介于“lower_value”和“upper_value”之间。"
			},
			lowerValue: {
				name: "最小值",
				detail: "范围的下限值，“value_to_compare”的值可能落入这个范围内。"
			},
			upperValue: {
				name: "最大值",
				detail: "范围的上限值，“value_to_compare”的值可能落入这个范围内。"
			},
			lowerValueIsInclusive: {
				name: "包括最小值",
				detail: "用于指定值的范围是否包含“lower_value”。默认情况下为“TRUE”"
			},
			upperValueIsInclusive: {
				name: "包括最大值",
				detail: "用于指定值的范围是否包含“upper_value”。默认情况下为“TRUE”"
			}
		}
	},
	ISBLANK: {
		description: "这些函数统称为 IS 函数，此类函数可检验指定值并根据结果返回 TRUE 或 FALSE。 例如，如果参数 value 引用的是空单元格，则 ISBLANK 函数返回逻辑值 TRUE；否则，返回 FALSE。",
		abstract: "这些函数统称为 IS 函数，此类函数可检验指定值并根据结果返回 TRUE 或 FALSE。 例如，如果参数 value 引用的是空单元格，则 ISBLANK 函数返回逻辑值 TRUE；否则，返回 FALSE。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "必填。 指的是要测试的值。 参数 value 可以是空白（空单元格）、错误值、逻辑值、文本、数字、引用值，或者引用要测试的以上任意值的名称。"
		} }
	},
	ISDATE: {
		description: "ISDATE 函数会返回某个值是否为日期。",
		abstract: "ISDATE 函数会返回某个值是否为日期。",
		links: [{
			title: "教学",
			url: "https://support.google.com/docs/answer/9061381?hl=zh-Hans"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "要验证其是否为日期的值。"
		} }
	},
	ISEMAIL: {
		description: "如需检查某个值是否为有效的邮箱，请使用 ISEMAIL 函数。此函数会检查该值是否符合常见的邮箱格式，但不会验证该地址是否实际存在。",
		abstract: "如需检查某个值是否为有效的邮箱，请使用 ISEMAIL 函数。此函数会检查该值是否符合常见的邮箱格式，但不会验证该地址是否实际存在。",
		links: [{
			title: "教学",
			url: "https://support.google.com/docs/answer/3256503?hl=zh-Hans"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "要验证其是否为电子邮件地址的值。"
		} }
	},
	ISERR: {
		description: "这些函数统称为 IS 函数，此类函数可检验指定值并根据结果返回 TRUE 或 FALSE。 例如，如果参数 value 引用的是空单元格，则 ISBLANK 函数返回逻辑值 TRUE；否则，返回 FALSE。",
		abstract: "这些函数统称为 IS 函数，此类函数可检验指定值并根据结果返回 TRUE 或 FALSE。 例如，如果参数 value 引用的是空单元格，则 ISBLANK 函数返回逻辑值 TRUE；否则，返回 FALSE。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "必填。 指的是要测试的值。 参数 value 可以是空白（空单元格）、错误值、逻辑值、文本、数字、引用值，或者引用要测试的以上任意值的名称。"
		} }
	},
	ISERROR: {
		description: "这些函数统称为 IS 函数，此类函数可检验指定值并根据结果返回 TRUE 或 FALSE。 例如，如果参数 value 引用的是空单元格，则 ISBLANK 函数返回逻辑值 TRUE；否则，返回 FALSE。",
		abstract: "这些函数统称为 IS 函数，此类函数可检验指定值并根据结果返回 TRUE 或 FALSE。 例如，如果参数 value 引用的是空单元格，则 ISBLANK 函数返回逻辑值 TRUE；否则，返回 FALSE。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "必填。 指的是要测试的值。 参数 value 可以是空白（空单元格）、错误值、逻辑值、文本、数字、引用值，或者引用要测试的以上任意值的名称。"
		} }
	},
	ISEVEN: {
		description: "如果数字为偶数，则返回 TRUE",
		abstract: "如果数字为偶数，则返回 TRUE",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/iseven-function"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "要测试的值。如果值不是整数，将被截尾取整。"
		} }
	},
	ISFORMULA: {
		description: "如果有对包含公式的单元格的引用，则返回 TRUE",
		abstract: "如果有对包含公式的单元格的引用，则返回 TRUE",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/isformula-function"
		}],
		functionParameter: { reference: {
			name: "引用",
			detail: "是对要测试的单元格的引用。"
		} }
	},
	ISLOGICAL: {
		description: "这些函数统称为 IS 函数，此类函数可检验指定值并根据结果返回 TRUE 或 FALSE。 例如，如果参数 value 引用的是空单元格，则 ISBLANK 函数返回逻辑值 TRUE；否则，返回 FALSE。",
		abstract: "这些函数统称为 IS 函数，此类函数可检验指定值并根据结果返回 TRUE 或 FALSE。 例如，如果参数 value 引用的是空单元格，则 ISBLANK 函数返回逻辑值 TRUE；否则，返回 FALSE。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "必填。 指的是要测试的值。 参数 value 可以是空白（空单元格）、错误值、逻辑值、文本、数字、引用值，或者引用要测试的以上任意值的名称。"
		} }
	},
	ISNA: {
		description: "这些函数统称为 IS 函数，此类函数可检验指定值并根据结果返回 TRUE 或 FALSE。 例如，如果参数 value 引用的是空单元格，则 ISBLANK 函数返回逻辑值 TRUE；否则，返回 FALSE。",
		abstract: "这些函数统称为 IS 函数，此类函数可检验指定值并根据结果返回 TRUE 或 FALSE。 例如，如果参数 value 引用的是空单元格，则 ISBLANK 函数返回逻辑值 TRUE；否则，返回 FALSE。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "必填。 指的是要测试的值。 参数 value 可以是空白（空单元格）、错误值、逻辑值、文本、数字、引用值，或者引用要测试的以上任意值的名称。"
		} }
	},
	ISNONTEXT: {
		description: "这些函数统称为 IS 函数，此类函数可检验指定值并根据结果返回 TRUE 或 FALSE。 例如，如果参数 value 引用的是空单元格，则 ISBLANK 函数返回逻辑值 TRUE；否则，返回 FALSE。",
		abstract: "这些函数统称为 IS 函数，此类函数可检验指定值并根据结果返回 TRUE 或 FALSE。 例如，如果参数 value 引用的是空单元格，则 ISBLANK 函数返回逻辑值 TRUE；否则，返回 FALSE。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "必填。 指的是要测试的值。 参数 value 可以是空白（空单元格）、错误值、逻辑值、文本、数字、引用值，或者引用要测试的以上任意值的名称。"
		} }
	},
	ISNUMBER: {
		description: "这些函数统称为 IS 函数，此类函数可检验指定值并根据结果返回 TRUE 或 FALSE。 例如，如果参数 value 引用的是空单元格，则 ISBLANK 函数返回逻辑值 TRUE；否则，返回 FALSE。",
		abstract: "这些函数统称为 IS 函数，此类函数可检验指定值并根据结果返回 TRUE 或 FALSE。 例如，如果参数 value 引用的是空单元格，则 ISBLANK 函数返回逻辑值 TRUE；否则，返回 FALSE。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "必填。 指的是要测试的值。 参数 value 可以是空白（空单元格）、错误值、逻辑值、文本、数字、引用值，或者引用要测试的以上任意值的名称。"
		} }
	},
	ISODD: {
		description: "如果数字为奇数，则返回 TRUE",
		abstract: "如果数字为奇数，则返回 TRUE",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/isodd-function"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "要测试的值。如果值不是整数，将被截尾取整。"
		} }
	},
	ISOMITTED: {
		description: "检查 LAMBDA 中的值是否缺失，并返回 TRUE 或 FALSE",
		abstract: "检查 LAMBDA 中的值是否缺失，并返回 TRUE 或 FALSE",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/isomitted-function"
		}],
		functionParameter: { argument: {
			name: "参数",
			detail: "要检查是否被省略的值，例如 LAMBDA 参数。"
		} }
	},
	ISREF: {
		description: "这些函数统称为 IS 函数，此类函数可检验指定值并根据结果返回 TRUE 或 FALSE。 例如，如果参数 value 引用的是空单元格，则 ISBLANK 函数返回逻辑值 TRUE；否则，返回 FALSE。",
		abstract: "这些函数统称为 IS 函数，此类函数可检验指定值并根据结果返回 TRUE 或 FALSE。 例如，如果参数 value 引用的是空单元格，则 ISBLANK 函数返回逻辑值 TRUE；否则，返回 FALSE。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "必填。 指的是要测试的值。 参数 value 可以是空白（空单元格）、错误值、逻辑值、文本、数字、引用值，或者引用要测试的以上任意值的名称。"
		} }
	},
	ISTEXT: {
		description: "这些函数统称为 IS 函数，此类函数可检验指定值并根据结果返回 TRUE 或 FALSE。 例如，如果参数 value 引用的是空单元格，则 ISBLANK 函数返回逻辑值 TRUE；否则，返回 FALSE。",
		abstract: "这些函数统称为 IS 函数，此类函数可检验指定值并根据结果返回 TRUE 或 FALSE。 例如，如果参数 value 引用的是空单元格，则 ISBLANK 函数返回逻辑值 TRUE；否则，返回 FALSE。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "必填。 指的是要测试的值。 参数 value 可以是空白（空单元格）、错误值、逻辑值、文本、数字、引用值，或者引用要测试的以上任意值的名称。"
		} }
	},
	ISURL: {
		description: "检查某个值是否为有效网址。",
		abstract: "检查某个值是否为有效网址。",
		links: [{
			title: "教学",
			url: "https://support.google.com/docs/answer/3256501?hl=zh-Hans"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "要验证其是否为网址的值。"
		} }
	},
	N: {
		description: "返回转换为数字的值",
		abstract: "返回转换为数字的值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/n-function"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "要转换的值。"
		} }
	},
	NA: {
		description: "返回错误值 #N/A",
		abstract: "返回错误值 #N/A",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/na-function"
		}],
		functionParameter: {}
	},
	SHEET: {
		description: "返回引用工作表的工作表编号",
		abstract: "返回引用工作表的工作表编号",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/sheet-function"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "需要其工作表编号的工作表或引用的名称。 如果省略值，SHEET 返回包含 函数的工作表编号。"
		} }
	},
	SHEETS: {
		description: "返回工作簿中的工作表数",
		abstract: "返回工作簿中的工作表数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/sheets-function"
		}],
		functionParameter: {}
	},
	TYPE: {
		description: "返回表示值的数据类型的数字",
		abstract: "返回表示值的数据类型的数字",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/type-function"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "可以为任意值，如数字、文本以及逻辑值等等。"
		} }
	}
};

//#endregion
//#region src/locale/function-list/logical/zh-CN.ts
const locale$7 = {
	AND: {
		description: "如果其所有参数均为 TRUE，则返回 TRUE",
		abstract: "如果其所有参数均为 TRUE，则返回 TRUE",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/and-function"
		}],
		functionParameter: {
			logical1: {
				name: "逻辑值 1",
				detail: "第一个想要测试且计算结果可为 TRUE 或 FALSE 的条件。"
			},
			logical2: {
				name: "逻辑值 2",
				detail: "其他想要测试且计算结果可为 TRUE 或 FALSE 的条件（最多 255 个条件）。"
			}
		}
	},
	BYCOL: {
		description: "将 LAMBDA 应用于每个列并返回结果数组",
		abstract: "将 LAMBDA 应用于每个列并返回结果数组",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/bycol-function"
		}],
		functionParameter: {
			array: {
				name: "数组",
				detail: "用列分隔的数组。"
			},
			lambda: {
				name: "lambda",
				detail: "将列作为单个参数并计算一个结果的 LAMBDA。 LAMBDA 接受单个参数：数组中的列。"
			}
		}
	},
	BYROW: {
		description: "将 LAMBDA 应用于每一行并返回结果数组",
		abstract: "将 LAMBDA 应用于每一行并返回结果数组",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/byrow-function"
		}],
		functionParameter: {
			array: {
				name: "数组",
				detail: "用行分隔的数组。"
			},
			lambda: {
				name: "lambda",
				detail: "将行作为单个参数并计算结果的 LAMBDA。 LAMBDA 接受单个参数：数组中的行。"
			}
		}
	},
	FALSE: {
		description: "返回逻辑值 FALSE。",
		abstract: "返回逻辑值 FALSE。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/false-function"
		}],
		functionParameter: {}
	},
	IF: {
		description: "指定要执行的逻辑检测",
		abstract: "指定要执行的逻辑检测",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/if-function"
		}],
		functionParameter: {
			logicalTest: {
				name: "布尔表达式",
				detail: "要测试的条件。"
			},
			valueIfTrue: {
				name: "如果值为 true",
				detail: "logical_test 的结果为 TRUE 时，希望返回的值。"
			},
			valueIfFalse: {
				name: "如果值为 false",
				detail: "logical_test 的结果为 FALSE 时，希望返回的值。"
			}
		}
	},
	IFERROR: {
		description: "如果公式的计算结果错误，则返回指定的值；否则返回公式的结果",
		abstract: "如果公式的计算结果错误，则返回指定的值；否则返回公式的结果",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/iferror-function"
		}],
		functionParameter: {
			value: {
				name: "值",
				detail: " 检查是否存在错误的参数。"
			},
			valueIfError: {
				name: "错误时返回值",
				detail: "公式计算结果为错误时要返回的值。 评估以下错误类型：#N/A、#VALUE!、#REF!、#DIV/0!、#NUM!、#NAME? 或 #NULL!。"
			}
		}
	},
	IFNA: {
		description: "如果表达式的结果为 #N/A，则返回指定的值，否则返回表达式的结果",
		abstract: "如果表达式的结果为 #N/A，则返回指定的值，否则返回表达式的结果",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/ifna-function"
		}],
		functionParameter: {
			value: {
				name: "值",
				detail: "检查是否存在 #N/A 错误值的参数。"
			},
			valueIfNa: {
				name: "如果为#N/A的值",
				detail: "如果公式结果为 #N/A 错误值，则返回的值。"
			}
		}
	},
	IFS: {
		description: "检查一个或多个条件是否满足，并返回第一个为 TRUE 的条件对应的值。",
		abstract: "检查一个或多个条件是否满足，并返回第一个为 TRUE 的条件对应的值。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/ifs-function"
		}],
		functionParameter: {
			logicalTest1: {
				name: "条件1",
				detail: "要评估的第一个条件，可以是布尔值、数值、数组或指向这些值的引用。"
			},
			valueIfTrue1: {
				name: "值1",
				detail: "“条件1”为“TRUE”的情况下返回的值。"
			},
			logicalTest2: {
				name: "条件2",
				detail: "之前的条件为“FALSE”的情况下，要评估的其他条件。"
			},
			valueIfTrue2: {
				name: "值2",
				detail: "相应条件为“TRUE”的情况下返回的其他值。"
			}
		}
	},
	LAMBDA: {
		description: "使用 LAMBDA 函数创建可重用的自定义函数，并使用易记名称调用它们。 新函数在整个工作簿中可用，其调用类似本机 Excel 函数。",
		abstract: "创建自定义、可重用的函数，并通过友好名称调用它们",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/lambda-function"
		}],
		functionParameter: {
			parameter: {
				name: "参数",
				detail: "要传递给函数的值，例如单元格引用、字符串或数字。 最多可以输入 253 个参数。 此参数可选。"
			},
			calculation: {
				name: "计算",
				detail: "要作为函数结果执行并返回的公式。 其必须为最后一个参数，且必须返回结果。 此参数是必需项。"
			}
		}
	},
	LET: {
		description: "将名称分配给计算结果",
		abstract: "将名称分配给计算结果",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/let-function"
		}],
		functionParameter: {
			name1: {
				name: "名称1",
				detail: "要分配的第一个名称。必须以字母开头。不能是公式的输出，也不能与范围语法冲突。"
			},
			nameValue1: {
				name: "值1",
				detail: "分配给 name1 的值。"
			},
			calculationOrName2: {
				name: "计算或名称2",
				detail: "下列任一项：\n1.使用 LET 函数中的所有名称的计算。这必须是 LET 函数中的最后一个参数。\n2.分配给第二个 name_value 的第二个名称。如果指定了名称，则 name_value2 和 calculation_or_name3 是必需的。"
			},
			nameValue2: {
				name: "值2",
				detail: "分配给 calculation_or_name2 的值。"
			},
			calculationOrName3: {
				name: "计算或名称3",
				detail: "下列任一项：\n1.使用 LET 函数中的所有名称的计算。LET 函数中的最后一个参数必须是一个计算。\n2.分配给第三个 name_value 的第三个名称。如果指定了名称，则 name_value3 和 calculation_or_name4 是必需的。"
			}
		}
	},
	MAKEARRAY: {
		description: "通过应用 LAMBDA 返回指定行和列大小的计算数组",
		abstract: "通过应用 LAMBDA 返回指定行和列大小的计算数组",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/makearray-function"
		}],
		functionParameter: {
			number1: {
				name: "行数",
				detail: "数组中的行数。 必须大于零"
			},
			number2: {
				name: "列数",
				detail: "数组中的列数。 必须大于零"
			},
			value3: {
				name: "lambda",
				detail: "调用 LAMBDA 来创建数组。 LAMBDA 接受两个参数:row数组的行索引, col数组的列索引"
			}
		}
	},
	MAP: {
		description: "通过应用 LAMBDA 来创建新值，返回将数组中每个值映射到新值而形成的数组。",
		abstract: "通过应用 LAMBDA 来创建新值，返回将数组中每个值映射到新值而形成的数组。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/map-function"
		}],
		functionParameter: {
			array1: {
				name: "数组1",
				detail: "要映射的数组1。"
			},
			array2: {
				name: "数组2",
				detail: "要映射的数组2。"
			},
			lambda: {
				name: "lambda",
				detail: "一个 LAMBDA，必须是最后一个参数，并且必须具有传递的每个数组的参数。"
			}
		}
	},
	NOT: {
		description: "反转其参数的逻辑值。",
		abstract: "反转其参数的逻辑值。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/not-function"
		}],
		functionParameter: { logical: {
			name: "逻辑表达式",
			detail: "要反转逻辑的条件，可评估为 TRUE 或 FALSE。"
		} }
	},
	OR: {
		description: "如果 OR 函数的任意参数计算为 TRUE，则其返回 TRUE；如果其所有参数均计算机为 FALSE，则返回 FALSE。",
		abstract: "如果任一参数为 TRUE，则返回 TRUE",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/or-function"
		}],
		functionParameter: {
			logical1: {
				name: "逻辑表达式 1",
				detail: "第一个想要测试且计算结果可为 TRUE 或 FALSE 的条件。"
			},
			logical2: {
				name: "逻辑表达式 2",
				detail: "其他想要测试且计算结果可为 TRUE 或 FALSE 的条件（最多 255 个条件）。"
			}
		}
	},
	REDUCE: {
		description: "通过将 LAMBDA 应用于每个值并返回累加器中的总值，将数组减少为累积值",
		abstract: "通过将 LAMBDA 应用于每个值并返回累加器中的总值，将数组减少为累积值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/reduce-function"
		}],
		functionParameter: {
			initialValue: {
				name: "起始值",
				detail: "设置累加器的起始值。"
			},
			array: {
				name: "数组",
				detail: "要减小的数组。"
			},
			lambda: {
				name: "lambda",
				detail: "调用 LAMBDA 来减小数组。 LAMBDA 采用三个参数：1.该值累加后作为最终结果返回。2.数组中的当前值。3.应用于数组中每个元素的计算。"
			}
		}
	},
	SCAN: {
		description: "通过将 LAMBDA 应用于每个值来扫描数组，并返回具有每个中间值的数组",
		abstract: "通过将 LAMBDA 应用于每个值来扫描数组，并返回具有每个中间值的数组",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/scan-function"
		}],
		functionParameter: {
			initialValue: {
				name: "起始值",
				detail: "设置累加器的起始值。"
			},
			array: {
				name: "数组",
				detail: "要扫描的数组。"
			},
			lambda: {
				name: "lambda",
				detail: "调用 LAMBDA 来扫描数组。 LAMBDA 采用三个参数：1.该值累加后作为最终结果返回。2.数组中的当前值。3.应用于数组中每个元素的计算。"
			}
		}
	},
	SWITCH: {
		description: "将表达式与值列表进行比较，并返回与第一个匹配值对应的结果。如果没有匹配项，可以返回一个可选的默认值。",
		abstract: "将表达式与值列表进行比较，并返回与第一个匹配值对应的结果。如果没有匹配项，可以返回一个可选的默认值。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/switch-function"
		}],
		functionParameter: {
			expression: {
				name: "表达式",
				detail: "表达式是将要与 值1…值126 进行比较的值（例如数字、日期或一些文本）。"
			},
			value1: {
				name: "值1",
				detail: "值N 是将要与表达式进行比较的值。"
			},
			result1: {
				name: "结果1",
				detail: "结果N 是当对应的值N 参数与表达式匹配时要返回的值。必须为每个对应的值N 参数提供结果N。"
			},
			defaultOrValue2: {
				name: "默认或值2",
				detail: "默认是在值N 表达式中找不到匹配项时要返回的值。默认参数通过没有对应的结果N 表达式来识别（参见示例）。默认必须是函数中的最后一个参数。"
			},
			result2: {
				name: "结果2",
				detail: "结果N 是当对应的值N 参数与表达式匹配时要返回的值。必须为每个对应的值N 参数提供结果N。"
			}
		}
	},
	TRUE: {
		description: "返回逻辑值 TRUE。",
		abstract: "返回逻辑值 TRUE。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/true-function"
		}],
		functionParameter: {}
	},
	XOR: {
		description: "如果参数中计算结果为 TRUE 的数量为奇数，则返回 TRUE；如果计算结果为 TRUE 的数量为偶数，则返回 FALSE。",
		abstract: "如果参数中 TRUE 的数量为奇数，则返回 TRUE",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/xor-function"
		}],
		functionParameter: {
			logical1: {
				name: "逻辑表达式 1",
				detail: "第一个想要测试且计算结果可为 TRUE 或 FALSE 的条件。"
			},
			logical2: {
				name: "逻辑表达式 2",
				detail: "其他想要测试且计算结果可为 TRUE 或 FALSE 的条件（最多 255 个条件）。"
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/lookup/zh-CN.ts
const locale$6 = {
	ADDRESS: {
		description: "根据指定行号和列号获得工作表中的某个单元格的地址。 例如，ADDRESS(2,3) 返回 $C$2。 再例如，ADDRESS(77,300) 返回 $KN$77。 可以使用其他函数（如 ROW 和 COLUMN 函数）为 ADDRESS 函数提供行号和列号参数。",
		abstract: "以文本形式将引用值返回到工作表的单个单元格",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/address-function"
		}],
		functionParameter: {
			row_num: {
				name: "行号",
				detail: "一个数值，指定要在单元格引用中使用的行号。"
			},
			column_num: {
				name: "列号",
				detail: "一个数值，指定要在单元格引用中使用的列号。"
			},
			abs_num: {
				name: "引用类型",
				detail: "一个数值，指定要返回的引用类型。"
			},
			a1: {
				name: "引用样式",
				detail: "一个逻辑值，指定 A1 或 R1C1 引用样式。 在 A1 样式中，列和行将分别按字母和数字顺序添加标签。 在 R1C1 引用样式中，列和行均按数字顺序添加标签。 如果参数 A1 为 TRUE 或被省略，则 ADDRESS 函数返回 A1 样式引用；如果为 FALSE，则 ADDRESS 函数返回 R1C1 样式引用。"
			},
			sheet_text: {
				name: "工作表名称",
				detail: "一个文本值，指定要用作外部引用的工作表的名称。 例如，公式=ADDRESS (1，1,,,\"Sheet2\") 返回 Sheet2！$A$1。 如果 sheet_text 参数，则不使用工作表名称，函数返回的地址引用当前工作表上的单元格。"
			}
		}
	},
	AREAS: {
		description: "返回引用中涉及的区域个数",
		abstract: "返回引用中涉及的区域个数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/areas-function"
		}],
		functionParameter: { reference: {
			name: "引用",
			detail: "对某个单元格或单元格区域的引用，可包含多个区域。"
		} }
	},
	CHOOSE: {
		description: "从值的列表中选择值。",
		abstract: "从值的列表中选择值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/choose-function"
		}],
		functionParameter: {
			indexNum: {
				name: "索引",
				detail: "用于指定所选定的数值参数。 index_num 必须是介于 1 到 254 之间的数字，或是包含 1 到 254 之间的数字的公式或单元格引用。\n如果 index_num 为 1，则 CHOOSE 返回 value1；如果为 2，则 CHOOSE 返回 value2，以此类推。\n如果 index_num 小于 1 或大于列表中最后一个值的索引号，则 CHOOSE 返回 #VALUE! 错误值。\n如果 index_num 为小数，则在使用前将被截尾取整。"
			},
			value1: {
				name: "值 1",
				detail: "CHOOSE 将根据 index_num 从中选择一个数值或一项要执行的操作。 参数可以是数字、单元格引用、定义的名称、公式、函数或文本。"
			},
			value2: {
				name: "值 2",
				detail: "1 到 254 个值参数。"
			}
		}
	},
	CHOOSECOLS: {
		description: "返回数组中的指定列",
		abstract: "返回数组中的指定列",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/choosecols-function"
		}],
		functionParameter: {
			array: {
				name: "数组",
				detail: "包含要在新数组中返回的列的数组。"
			},
			colNum1: {
				name: "列号1",
				detail: "要返回的第一列。"
			},
			colNum2: {
				name: "列号2",
				detail: "要返回的其他列。"
			}
		}
	},
	CHOOSEROWS: {
		description: "返回数组中的指定行",
		abstract: "返回数组中的指定行",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/chooserows-function"
		}],
		functionParameter: {
			array: {
				name: "数组",
				detail: "包含要在新数组中返回的行的数组。"
			},
			rowNum1: {
				name: "行号1",
				detail: "要返回的第一行号。"
			},
			rowNum2: {
				name: "行号2",
				detail: "要返回的其他行号。"
			}
		}
	},
	COLUMN: {
		description: "返回给定单元格引用的列号。",
		abstract: "返回引用的列号",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/column-function"
		}],
		functionParameter: { reference: {
			name: "引用",
			detail: "要返回其列号的单元格或单元格范围。"
		} }
	},
	COLUMNS: {
		description: "返回数组或引用的列数。",
		abstract: "返回引用中包含的列数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/columns-function"
		}],
		functionParameter: { array: {
			name: "数组",
			detail: "要计算列数的数组、数组公式或是对单元格区域的引用。"
		} }
	},
	DROP: {
		description: "从数组的开头或末尾删除指定数量的行或列",
		abstract: "从数组的开头或末尾删除指定数量的行或列",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/drop-function"
		}],
		functionParameter: {
			array: {
				name: "数组",
				detail: "要从中删除行或列的数组。"
			},
			rows: {
				name: "行数",
				detail: "要删除的行数。负数表示从数组末尾开始删除。"
			},
			columns: {
				name: "列数",
				detail: "要删除的列数。负数表示从数组末尾开始删除。"
			}
		}
	},
	EXPAND: {
		description: "将数组展开或填充到指定的行和列维度",
		abstract: "将数组展开或填充到指定的行和列维度",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/expand-function"
		}],
		functionParameter: {
			array: {
				name: "数组",
				detail: "要展开的数组。"
			},
			rows: {
				name: "行数",
				detail: "扩展数组中的行数。 如果缺少，行将不会展开。"
			},
			columns: {
				name: "列数",
				detail: "展开数组中的列数。 如果缺少，列将不会展开。"
			},
			padWith: {
				name: "填充值",
				detail: "要填充的值。 默认值为 #N/A。"
			}
		}
	},
	FILTER: {
		description: "FILTER 函数可以基于定义的条件筛选一系列数据。",
		abstract: "FILTER 函数可以基于定义的条件筛选一系列数据。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/filter-function"
		}],
		functionParameter: {
			array: {
				name: "数组",
				detail: "要筛选的区域或数组。"
			},
			include: {
				name: "布尔值数组",
				detail: "布尔值数组，其中 TRUE 表示要保留的一行或一列。"
			},
			ifEmpty: {
				name: "空值返回",
				detail: "如果未保留任何项，则返回。"
			}
		}
	},
	FORMULATEXT: {
		description: "将给定引用的公式返回为文本",
		abstract: "将给定引用的公式返回为文本",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/formulatext-function"
		}],
		functionParameter: { reference: {
			name: "引用",
			detail: "对单元格或单元格区域的引用。"
		} }
	},
	GETPIVOTDATA: {
		description: "GETPIVOTDATA 函数返回数据透视表中的可见数据。",
		abstract: "GETPIVOTDATA 函数返回数据透视表中的可见数据。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/getpivotdata-function"
		}],
		functionParameter: {
			dataField: {
				name: "dataField",
				detail: "包含要检索的数据的数据透视表字段的名称。 这需要用引号括起。 示例： =GETPIVOTDATA (“Sales”，A3) 。 此处，“Sales”是要检索的“值”字段。 由于未指定其他字段，因此 GETPIVOTDATA 返回总销售额。"
			},
			pivotTable: {
				name: "pivotTable",
				detail: "对数据透视表中任何单元格、单元格区域或单元格已命名区域的引用。 此信息用于确定包含要检索数据的数据透视表。 示例： =GETPIVOTDATA (“Sales”，A3) 。 此处，A3 是数据透视表中的引用，它告知公式要使用哪个数据透视表。"
			},
			field1: {
				name: "field1",
				detail: "描述要检索的数据的 1 到 126 个字段名称对和项目名称对。 这些对可按任何顺序排列。 除日期和数字以外的项的字段名称和名称需要用引号引起来。 示例： =GETPIVOTDATA (“Sales”、A3、“Month”、“Mar”) 。 此处，“Month”是字段，“Mar”是项。 若要为字段指定多个项，请将它们括在大括号 (例如：{“Mar”、“Apr”}) 。 对于 OLAP 数据透视表 ，项可以包含维度的源名称和项的源名称。 OLAP 数据透视表的字段和项目对可能类似于： \"[产品]\",\"[产品].[所有产品].[食品].[烤制食品]\""
			},
			item1: {
				name: "item1",
				detail: "描述要检索的数据的 1 到 126 个字段名称对和项目名称对。 这些对可按任何顺序排列。 除日期和数字以外的项的字段名称和名称需要用引号引起来。 示例： =GETPIVOTDATA (“Sales”、A3、“Month”、“Mar”) 。 此处，“Month”是字段，“Mar”是项。 若要为字段指定多个项，请将它们括在大括号 (例如：{“Mar”、“Apr”}) 。 对于 OLAP 数据透视表 ，项可以包含维度的源名称和项的源名称。 OLAP 数据透视表的字段和项目对可能类似于： \"[产品]\",\"[产品].[所有产品].[食品].[烤制食品]\""
			}
		}
	},
	HLOOKUP: {
		description: "在表格的首行或值数组中搜索值，然后返回表格或数组中指定行的所在列中的值。 当比较值位于数据表格的首行时，如果要向下查看指定的行数，则可使用 HLOOKUP。 当比较值位于所需查找的数据的左边一列时，则可使用 VLOOKUP。",
		abstract: "在表格的首行或值数组中搜索值，然后返回表格或数组中指定行的所在列中的值。 当比较值位于数据表格的首行时，如果要向下查看指定的行数，则可使用 HLOOKUP。 当比较值位于所需查找的数据的左边一列时，则可使用 VLOOKUP。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/hlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "查找值",
				detail: "必填。 要在表格的第一行中查找的值。 Lookup_value 可以是数值、引用或文本字符串。"
			},
			tableArray: {
				name: "范围",
				detail: "必填。 在其中查找数据的信息表。 使用对区域或区域名称的引用。 Table_array 的第一行的数值可以为文本、数字或逻辑值。 如果 range_lookup 为 TRUE，则 table_array 的第一行的数值必须按升序排列：...-2、-1、0、1、2、...、A-Z、FALSE、TRUE；否则，HLOOKUP 将不能给出正确的数值。 如果 range_lookup 为 FALSE，则 table_array 不必进行排序。 文本不区分大小写。 将数值从左到右按升序排序。 有关详细信息，请参阅 对区域或表中的数据排序 。"
			},
			rowIndexNum: {
				name: "行号",
				detail: "必填。 将从中返回匹配值的table_array中的行号。 row_index_num 1 返回table_array中的第一行值，row_index_num 2 返回table_array中的第二行值，依此以类。 如果row_index_num小于 1，HLOOKUP 将返回 #VALUE！ error 值;如果row_index_num大于table_array上的行数，HLOOKUP 将返回 #REF！ 错误值。"
			},
			rangeLookup: {
				name: "查询类型",
				detail: "选。 一个逻辑值，指定希望 HLOOKUP 查找精确匹配值还是近似匹配值。 如果为 TRUE 或省略，则返回近似匹配值。 换言之，如果找不到精确匹配值，则返回小于 lookup_value 的最大值。 如果为 False，则 HLOOKUP 将查找精确匹配值。 如果找不到精确匹配值，则返回错误值 #N/A。"
			}
		}
	},
	HSTACK: {
		description: "按顺序水平追加数组，以返回更大的数组。",
		abstract: "按顺序水平追加数组，以返回更大的数组。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/hstack-function"
		}],
		functionParameter: {
			array1: {
				name: "数组",
				detail: "每个数组参数的行计数最大值。"
			},
			array2: {
				name: "数组",
				detail: "每个数组参数中所有列的组合计数。"
			}
		}
	},
	HYPERLINK: {
		description: "在单元格内创建一个超链接。",
		abstract: "在单元格内创建一个超链接。",
		links: [{
			title: "教学",
			url: "https://support.google.com/docs/answer/3093313?hl=zh-Hans"
		}],
		functionParameter: {
			url: {
				name: "网址",
				detail: "以引号括住的链接位置的完整网址，或对包含这种网址的单元格的引用。"
			},
			linkLabel: {
				name: "链接标签",
				detail: "要在单元格中作为链接显示的文本（用引号括起来的），或者指向包含这种标签的单元格的引用。"
			}
		}
	},
	IMAGE: {
		description: "从给定源返回图像",
		abstract: "从给定源返回图像",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/image-function"
		}],
		functionParameter: {
			source: {
				name: "图像源",
				detail: "图像文件的 URL 路径（使用“https”协议）。"
			},
			altText: {
				name: "描述文字",
				detail: "描述图像以提供辅助功能的可选文字。"
			},
			sizing: {
				name: "维度",
				detail: "指定图像维度。"
			},
			height: {
				name: "高度",
				detail: "图像的自定义高度（以像素为单位）。"
			},
			width: {
				name: "宽度",
				detail: "图像的自定义宽度（以像素为单位）。"
			}
		}
	},
	INDEX: {
		description: "返回指定的行与列交叉处的单元格引用。 如果引用由不连续的选定区域组成，可以选择某一选定区域。",
		abstract: "使用索引从引用或数组中选择值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/index-function"
		}],
		functionParameter: {
			reference: {
				name: "引用",
				detail: "对一个或多个单元格区域的引用。"
			},
			rowNum: {
				name: "行号",
				detail: "引用中某行的行号，函数从该行返回一个引用。"
			},
			columnNum: {
				name: "列号",
				detail: "引用中某列的列标，函数从该列返回一个引用。"
			},
			areaNum: {
				name: "区域编号",
				detail: "选择要返回行号和列号的交叉点的引用区域。"
			}
		}
	},
	INDIRECT: {
		description: "返回由文本字符串指定的引用。 此函数立即对引用进行计算，并显示其内容。",
		abstract: "返回由文本值指定的引用",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/indirect-function"
		}],
		functionParameter: {
			refText: {
				name: "引用文本",
				detail: "对包含 A1 样式引用、R1C1 样式引用、定义为引用的名称或作为文本字符串引用的单元格的引用的引用。"
			},
			a1: {
				name: "引用类型",
				detail: "一个逻辑值，用于指定包含在单元格引用文本中的引用的类型。"
			}
		}
	},
	LOOKUP: {
		description: "当需要查询一行或一列并查找另一行或列中的相同位置的值时使用",
		abstract: "在向量或数组中查找值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/lookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "查找值",
				detail: "在第一个向量中搜索的值。可以是数字、文本、逻辑值、名称或对值的引用。"
			},
			lookupVectorOrArray: {
				name: "查询范围或数组",
				detail: "只包含一行或一列的区域。"
			},
			resultVector: {
				name: "结果范围",
				detail: " 只包含一行或一列的区域。参数必须与 lookup_vector 参数大小相同。 其大小必须相同。"
			}
		}
	},
	MATCH: {
		description: "使用 MATCH 函数在 范围 单元格中搜索特定的项，然后返回该项在此区域中的相对位置。",
		abstract: "在引用或数组中查找值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/match-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "查找值",
				detail: "要在 lookup_array 中匹配的值。"
			},
			lookupArray: {
				name: "搜索区域",
				detail: "要搜索的单元格区域。"
			},
			matchType: {
				name: "匹配类型",
				detail: "数字 -1、0 或 1。"
			}
		}
	},
	OFFSET: {
		description: "从给定引用中返回引用偏移量",
		abstract: "从给定引用中返回引用偏移量",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/offset-function"
		}],
		functionParameter: {
			reference: {
				name: "引用",
				detail: "要基于偏移量的引用。"
			},
			rows: {
				name: "行数",
				detail: "需要左上角单元格引用的向上或向下行数。"
			},
			cols: {
				name: "列数",
				detail: "需要结果的左上角单元格引用的从左到右的列数。"
			},
			height: {
				name: "行高",
				detail: "需要返回的引用的行高。行高必须为正数。"
			},
			width: {
				name: "列宽",
				detail: "需要返回的引用的列宽。列宽必须为正数。"
			}
		}
	},
	ROW: {
		description: "返回给定单元格引用的行号。",
		abstract: "返回引用的行号",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/row-function"
		}],
		functionParameter: { reference: {
			name: "引用",
			detail: "需要得到其行号的单元格或单元格区域。"
		} }
	},
	ROWS: {
		description: "返回数组或引用的行数。",
		abstract: "返回引用中的行数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/rows-function"
		}],
		functionParameter: { array: {
			name: "数组",
			detail: "需要得到其行数的数组、数组公式或对单元格区域的引用。"
		} }
	},
	RTD: {
		description: "从支持 COM 自动化的程序中检索实时数据",
		abstract: "从支持 COM 自动化的程序中检索实时数据",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/rtd-function"
		}],
		functionParameter: {
			progId: {
				name: "程序标识符",
				detail: "本地安装的 COM 自动化加载项的程序标识符。"
			},
			server: {
				name: "服务器",
				detail: "运行加载项的服务器名称；本地服务器使用空字符串。"
			},
			topic1: {
				name: "主题 1",
				detail: "指定要检索的实时数据的第一个文本。"
			},
			topic2: {
				name: "主题 2",
				detail: "可选。指定实时数据的其他文本。"
			}
		}
	},
	SORT: {
		description: "对区域或数组的内容进行排序",
		abstract: "对区域或数组的内容进行排序",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/sort-function"
		}],
		functionParameter: {
			array: {
				name: "数组",
				detail: "要排序的范围或数组。"
			},
			sortIndex: {
				name: "排序索引",
				detail: "表示排序依据(按行或按列)的数字。"
			},
			sortOrder: {
				name: "排序顺序",
				detail: "表示所需排序顺序的数字；1表示顺序(默认)，-1表示降序。"
			},
			byCol: {
				name: "排序方向",
				detail: "表示所需排序方向的逻辑值；FALSE指按行排序(默认)，TRUE指按列排序。"
			}
		}
	},
	SORTBY: {
		description: "根据相应区域或数组中的值对区域或数组的内容进行排序",
		abstract: "根据相应区域或数组中的值对区域或数组的内容进行排序",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/sortby-function"
		}],
		functionParameter: {
			array: {
				name: "数组",
				detail: "要排序的范围或数组。"
			},
			byArray1: {
				name: "排序数组1",
				detail: "要基于其进行排序的范围或数组。"
			},
			sortOrder1: {
				name: "排序顺序1",
				detail: "表示所需排序顺序的数字；1表示顺序(默认)，-1表示降序。"
			},
			byArray2: {
				name: "排序数组2",
				detail: "要基于其进行排序的范围或数组。"
			},
			sortOrder2: {
				name: "排序顺序2",
				detail: "表示所需排序顺序的数字；1表示顺序(默认)，-1表示降序。"
			}
		}
	},
	TAKE: {
		description: "从数组的开头或末尾返回指定数量的连续行或列",
		abstract: "从数组的开头或末尾返回指定数量的连续行或列",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/take-function"
		}],
		functionParameter: {
			array: {
				name: "数组",
				detail: "要从中获取行或列的数组。"
			},
			rows: {
				name: "行数",
				detail: "要获取的行数。负数表示从数组末尾开始获取。"
			},
			columns: {
				name: "列数",
				detail: "要获取的列数。负数表示从数组末尾开始获取。"
			}
		}
	},
	TOCOL: {
		description: "返回单个列中的数组",
		abstract: "返回单个列中的数组",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/tocol-function"
		}],
		functionParameter: {
			array: {
				name: "数组",
				detail: "要作为列返回的数组或引用。"
			},
			ignore: {
				name: "忽略值",
				detail: "是否忽略某些类型的值。默认情况下，不会忽略任何值。 指定下列操作之一：\n0 保留所有值（默认）\n1 忽略空白\n2 忽略错误\n3 忽略空白和错误"
			},
			scanByColumn: {
				name: "按列扫描数组",
				detail: "按列扫描数组。 默认情况下，按行扫描数组。 扫描确定值是按行排序还是按列排序。"
			}
		}
	},
	TOROW: {
		description: "返回单个行中的数组",
		abstract: "返回单个行中的数组",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/torow-function"
		}],
		functionParameter: {
			array: {
				name: "数组",
				detail: "要作为行返回的数组或引用。"
			},
			ignore: {
				name: "忽略值",
				detail: "是否忽略某些类型的值。默认情况下，不会忽略任何值。 指定下列操作之一：\n0 保留所有值（默认）\n1 忽略空白\n2 忽略错误\n3 忽略空白和错误"
			},
			scanByColumn: {
				name: "按列扫描数组",
				detail: "按列扫描数组。 默认情况下，按行扫描数组。 扫描确定值是按行排序还是按列排序。"
			}
		}
	},
	TRANSPOSE: {
		description: "返回数组的转置",
		abstract: "返回数组的转置",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/transpose-function"
		}],
		functionParameter: { array: {
			name: "数组",
			detail: "工作表中的单元格区域或数组。"
		} }
	},
	UNIQUE: {
		description: "返回列表或区域的唯一值列表",
		abstract: "返回列表或区域的唯一值列表",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/unique-function"
		}],
		functionParameter: {
			array: {
				name: "数组",
				detail: "从中返回唯一行或列的范围或数组。"
			},
			byCol: {
				name: "依据列",
				detail: "是一个逻辑值：将行彼此比较并返回唯一值 = FALSE，或已省略；将列彼此比较并返回唯一值 = TRUE。"
			},
			exactlyOnce: {
				name: "仅一次",
				detail: "是一个逻辑值：从数组中返回只出现一次的行或列 = TRUE；从数组中返回所有不同的行或列 = FALSE，或已省略。"
			}
		}
	},
	VLOOKUP: {
		description: "需要在表格或区域中按行查找内容时，请使用 VLOOKUP。 例如，按部件号查找汽车部件的价格，或根据员工 ID 查找员工姓名。",
		abstract: "在数组第一列中查找，然后在行之间移动以返回单元格的值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/vlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "查找值",
				detail: "要查找的值。 要查找的值必须位于 table_array 参数中指定的单元格区域的第一列中。"
			},
			tableArray: {
				name: "范围",
				detail: "VLOOKUP 在其中搜索 lookup_value 和返回值的单元格区域。 可以使用命名区域或表，并且可以在参数中使用名称，而不是单元格引用。 "
			},
			colIndexNum: {
				name: "列号",
				detail: "其中包含返回值的单元格的编号（table_array 最左侧单元格为 1 开始编号）。"
			},
			rangeLookup: {
				name: "查询类型",
				detail: "一个逻辑值，该值指定希望 VLOOKUP 查找近似匹配还是精确匹配：近似匹配 - 1/TRUE, 完全匹配 - 0/FALSE"
			}
		}
	},
	VSTACK: {
		description: "按顺序垂直追加数组以返回更大的数组",
		abstract: "按顺序垂直追加数组以返回更大的数组",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/vstack-function"
		}],
		functionParameter: {
			array1: {
				name: "数组",
				detail: "要追加的数组。"
			},
			array2: {
				name: "数组",
				detail: "要追加的数组。"
			}
		}
	},
	WRAPCOLS: {
		description: "将提供的行或列的值按列换行到指定数量的元素之后以形成新数组。",
		abstract: "将提供的行或列的值按列换行到指定数量的元素之后以形成新数组。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/wrapcols-function"
		}],
		functionParameter: {
			vector: {
				name: "矢量",
				detail: "要换行的矢量或引用。"
			},
			wrapCount: {
				name: "换行数量",
				detail: "每列的值的最大数量。"
			},
			padWith: {
				name: "填充值",
				detail: "要填充的值。 默认值为 #N/A。"
			}
		}
	},
	WRAPROWS: {
		description: "将提供的行或列的值按行换行到指定数量的元素之后以形成新数组。",
		abstract: "将提供的行或列的值按行换行到指定数量的元素之后以形成新数组。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/wraprows-function"
		}],
		functionParameter: {
			vector: {
				name: "矢量",
				detail: "要换行的矢量或引用。"
			},
			wrapCount: {
				name: "换行数量",
				detail: "每行的值的最大数量。"
			},
			padWith: {
				name: "填充值",
				detail: "要填充的值。 默认值为 #N/A。"
			}
		}
	},
	XLOOKUP: {
		description: "函数搜索区域或数组，然后返回与它找到的第一个匹配项对应的项。 如果不存在匹配项，则 XLOOKUP 可以返回最接近的 (近似) 匹配项",
		abstract: "搜索区域或数组，并返回与之找到的第一个匹配项对应的项。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/xlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "查找值",
				detail: "要搜索的值，如果省略，XLOOKUP 将返回在 lookup_array 中找到的空白单元格。"
			},
			lookupArray: {
				name: "搜索区域",
				detail: "要搜索的数组或区域"
			},
			returnArray: {
				name: "返回区域",
				detail: "要返回的数组或区域"
			},
			ifNotFound: {
				name: "默认显示值",
				detail: "如果未找到有效的匹配项，则返回你提供的 [if_not_found] 文本，否则返回#N/A "
			},
			matchMode: {
				name: "匹配类型",
				detail: "指定匹配类型： 0 - 完全匹配。 如果未找到，则返回 #N/A。默认选项。-1 - 完全匹配。 如果没有找到，则返回下一个较小的项。1 - 完全匹配。 如果没有找到，则返回下一个较大的项。 2 - 通配符匹配，其中 *, ? 和 ~ 有特殊含义。"
			},
			searchMode: {
				name: "搜索模式",
				detail: "指定要使用的搜索模式：1 从第一项开始执行搜索，默认选项。-1 从最后一项开始执行反向搜索。2 执行依赖于 lookup_array 按升序排序的二进制搜索, -2执行依赖于 lookup_array 按降序排序的二进制搜索"
			}
		}
	},
	XMATCH: {
		description: "在数组或单元格区域中搜索指定项，然后返回项的相对位置。",
		abstract: "返回项目在数组或单元格区域中的相对位置。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/xmatch-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "查找值",
				detail: "查找值"
			},
			lookupArray: {
				name: "搜索区域",
				detail: "要搜索的数组或区域"
			},
			matchMode: {
				name: "匹配类型",
				detail: "指定匹配类型：\n0 - 完全匹配（默认值）\n-1 - 完全匹配或下一个最小项\n1 - 完全匹配或下一个最大项\n2 - 通配符匹配，其中 *, ? 和 ~ 有特殊含义。"
			},
			searchMode: {
				name: "搜索类型",
				detail: "指定搜索类型：\n1 - 搜索从第一到最后一个（默认值）\n-1 - 搜索从最后到第一个（反向搜索）。\n2 - 执行依赖于 lookup_array 按升序排序的二进制搜索。 如果未排序，将返回无效结果。\n2 - 执行依赖于 lookup_array 按降序排序的二进制搜索。 如果未排序，将返回无效结果。"
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/math/zh-CN.ts
const locale$5 = {
	ABS: {
		description: "返回数字的绝对值。一个数字的绝对值是该数字不带其符号的形式。",
		abstract: "返回数字的绝对值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/abs-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "需要计算其绝对值的实数。"
		} }
	},
	ACOS: {
		description: "返回数字的反余弦值。 反余弦值是指余弦值为 number 的角度。 返回的角度以弧度表示，弧度值在 0（零）到 pi 之间。",
		abstract: "返回数字的反余弦值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/acos-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "所求角度的余弦值，必须介于 -1 到 1 之间。"
		} }
	},
	ACOSH: {
		description: "返回数字的反双曲余弦值。 该数字必须大于或等于 1。 反双曲余弦值是指双曲余弦值为 number 的值，因此 ACOSH(COSH(number)) 等于 number。",
		abstract: "返回数字的反双曲余弦值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/acosh-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "大于或等于 1 的任意实数。"
		} }
	},
	ACOT: {
		description: "返回数字的反余切值的主值。",
		abstract: "返回一个数的反余切值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/acot-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "数字是需要的角度的正切值。 这必须是实数。"
		} }
	},
	ACOTH: {
		description: "返回数字的反双曲余切值。",
		abstract: "返回一个数的双曲反余切值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/acoth-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "数字的绝对值必须大于 1。"
		} }
	},
	AGGREGATE: {
		description: "返回列表或数据库中的聚合",
		abstract: "返回列表或数据库中的聚合",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/aggregate-function"
		}],
		functionParameter: {
			functionNum: {
				name: "函数编号",
				detail: "一个介于 1 到 19 之间的数字，指定要使用的函数。"
			},
			options: {
				name: "选项",
				detail: "一个数值，决定在函数的计算区域内要忽略哪些值。"
			},
			ref1: {
				name: "引用1",
				detail: "函数的第一个数值参数，这些函数具有要计算聚合值的多个数值参数。"
			},
			ref2: {
				name: "引用2",
				detail: "要计算聚合值的 2 至 252 个数值参数。"
			}
		}
	},
	ARABIC: {
		description: "将罗马数字转换为阿拉伯数字",
		abstract: "将罗马数字转换为阿拉伯数字",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/arabic-function"
		}],
		functionParameter: { text: {
			name: "文本",
			detail: "用引号括起来的字符串、 (\"\") 的空字符串或对包含文本的单元格的引用。"
		} }
	},
	ASIN: {
		description: "返回数字的反正弦值。",
		abstract: "返回数字的反正弦值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/asin-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: " 所求角度的正弦值，必须介于 -1 到 1 之间。"
		} }
	},
	ASINH: {
		description: "返回数字的反双曲正弦值。",
		abstract: "返回数字的反双曲正弦值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/asinh-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "任意实数。"
		} }
	},
	ATAN: {
		description: "返回数字的反正切值。",
		abstract: "返回数字的反正切值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/atan-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "所求角度的正切值。"
		} }
	},
	ATAN2: {
		description: "返回给定的 X 轴及 Y 轴坐标值的反正切值。 反正切值是指从 X 轴到通过原点 (0, 0) 和坐标点 (x_num, y_num) 的直线之间的夹角。 该角度以弧度表示，弧度值在 -pi 到 pi 之间（不包括 -pi）。",
		abstract: "返回给定的 X 轴及 Y 轴坐标值的反正切值。 反正切值是指从 X 轴到通过原点 (0, 0) 和坐标点 (x_num, y_num) 的直线之间的夹角。 该角度以弧度表示，弧度值在 -pi 到 pi 之间（不包括 -pi）。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/atan2-function"
		}],
		functionParameter: {
			xNum: {
				name: "x 坐标",
				detail: "必填。 点的 x 坐标。"
			},
			yNum: {
				name: "y 坐标",
				detail: "必填。 点的 y 坐标。"
			}
		}
	},
	ATANH: {
		description: "返回数字的反双曲正切值。 Number 必须介于 -1 到 1 之间（不包括 -1 和 1）。 反双曲正切值是指双曲正切值为 number 的值，因此 ATANH(TANH(number)) 等于 number 。",
		abstract: "返回数字的反双曲正切值。 Number 必须介于 -1 到 1 之间（不包括 -1 和 1）。 反双曲正切值是指双曲正切值为 number 的值，因此 ATANH(TANH(number)) 等于 number 。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/atanh-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "必需。 -1 到 1 之间的任意实数。"
		} }
	},
	BASE: {
		description: "将一个数转换为具有给定基数的文本表示",
		abstract: "将一个数转换为具有给定基数的文本表示",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/base-function"
		}],
		functionParameter: {
			number: {
				name: "数值",
				detail: "要转换的数字。必须是大于或等于 0 且小于 2^53 的整数。"
			},
			radix: {
				name: "基数",
				detail: "要将数字转换为的基数。必须是大于或等于 2 且小于或等于 36 的整数。"
			},
			minLength: {
				name: "最小长度",
				detail: "返回的字符串的最小长度。必须是大于或等于 0 的整数。"
			}
		}
	},
	CEILING: {
		description: "将数字舍入为最接近的整数或最接近的指定基数的倍数",
		abstract: "将数字舍入为最接近的整数或最接近的指定基数的倍数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/ceiling-function"
		}],
		functionParameter: {
			number: {
				name: "数值",
				detail: "要舍入的值。"
			},
			significance: {
				name: "倍数",
				detail: "要舍入到的倍数。"
			}
		}
	},
	CEILING_MATH: {
		description: "将数字向上舍入为最接近的整数或最接近的指定基数的倍数",
		abstract: "将数字向上舍入为最接近的整数或最接近的指定基数的倍数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/ceiling-math-function"
		}],
		functionParameter: {
			number: {
				name: "数值",
				detail: "要舍入的值。"
			},
			significance: {
				name: "倍数",
				detail: "要舍入到的倍数。"
			},
			mode: {
				name: "众数",
				detail: "对于负数，控制数值是舍入为零还是从零舍入。"
			}
		}
	},
	CEILING_PRECISE: {
		description: "将数字舍入为最接近的整数或最接近的指定基数的倍数。 无论该数字的符号如何，该数字都向上舍入。",
		abstract: "将数字舍入为最接近的整数或最接近的指定基数的倍数。 无论该数字的符号如何，该数字都向上舍入。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/ceiling-precise-function"
		}],
		functionParameter: {
			number: {
				name: "数值",
				detail: "要舍入的值。"
			},
			significance: {
				name: "倍数",
				detail: "要舍入到的倍数。"
			}
		}
	},
	COMBIN: {
		description: "返回给定数目对象的组合数",
		abstract: "返回给定数目对象的组合数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/combin-function"
		}],
		functionParameter: {
			number: {
				name: "总数",
				detail: "项目的数量。"
			},
			numberChosen: {
				name: "样品数量",
				detail: "每一组合中项目的数量。"
			}
		}
	},
	COMBINA: {
		description: "返回给定数目对象具有重复项的组合数",
		abstract: "返回给定数目对象具有重复项的组合数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/combina-function"
		}],
		functionParameter: {
			number: {
				name: "总数",
				detail: "项目的数量。"
			},
			numberChosen: {
				name: "样品数量",
				detail: "每一组合中项目的数量。"
			}
		}
	},
	COS: {
		description: "返回数字的余弦值。",
		abstract: "返回数字的余弦值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/cos-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "想要求余弦的角度，以弧度表示。"
		} }
	},
	COSH: {
		description: "返回数字的双曲余弦值",
		abstract: "返回数字的双曲余弦值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/cosh-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "想要求双曲余弦的任意实数。"
		} }
	},
	COT: {
		description: "返回以弧度表示的角度的余切值。",
		abstract: "指定角度的余切值（以弧度表示）",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/cot-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "需要余切值的角度（以弧度为单位）。"
		} }
	},
	COTH: {
		description: "返回数字的双曲余切值",
		abstract: "返回数字的双曲余切值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/coth-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "想要求双曲余切的任意实数。"
		} }
	},
	CSC: {
		description: "返回角度的余割值，以弧度表示。",
		abstract: "返回角度的余割值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/csc-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "想要求余割的角度，以弧度表示。"
		} }
	},
	CSCH: {
		description: "返回角度的双曲余割值",
		abstract: "返回角度的双曲余割值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/csch-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "想要求双曲余割值的角度，以弧度表示。"
		} }
	},
	DECIMAL: {
		description: "将给定基数内的数的文本表示转换为十进制数",
		abstract: "将给定基数内的数的文本表示转换为十进制数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/decimal-function"
		}],
		functionParameter: {
			text: {
				name: "字符串",
				detail: "字符串长度必须小于或等于 255 个字符。"
			},
			radix: {
				name: "基数",
				detail: "要将数字转换为的基数。 必须是大于或等于 2 且小于或等于 36 的整数。"
			}
		}
	},
	DEGREES: {
		description: "将弧度转换为度",
		abstract: "将弧度转换为度",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/degrees-function"
		}],
		functionParameter: { angle: {
			name: "角度",
			detail: "要转换的角度，以弧度表示。"
		} }
	},
	EVEN: {
		description: "将数字向上舍入到最接近的偶数",
		abstract: "将数字向上舍入到最接近的偶数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/even-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "要舍入的值。"
		} }
	},
	EXP: {
		description: "返回e的 n 次方",
		abstract: "返回e的 n 次方",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/exp-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "底数 e 的指数。"
		} }
	},
	FACT: {
		description: "返回数字的阶乘",
		abstract: "返回数字的阶乘",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/fact-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "要计算其阶乘的非负数。 如果 number 不是整数，将被截尾取整。"
		} }
	},
	FACTDOUBLE: {
		description: "返回数字的双倍阶乘",
		abstract: "返回数字的双倍阶乘",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/factdouble-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "要计算其双倍阶乘的非负数。 如果 number 不是整数，将被截尾取整。"
		} }
	},
	FLOOR: {
		description: "向绝对值减小的方向舍入数字",
		abstract: "向绝对值减小的方向舍入数字",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/floor-function"
		}],
		functionParameter: {
			number: {
				name: "数值",
				detail: "要舍入的值。"
			},
			significance: {
				name: "倍数",
				detail: "要舍入到的倍数。"
			}
		}
	},
	FLOOR_MATH: {
		description: "将数字向下舍入为最接近的整数或最接近的指定基数的倍数",
		abstract: "将数字向下舍入为最接近的整数或最接近的指定基数的倍数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/floor-math-function"
		}],
		functionParameter: {
			number: {
				name: "数值",
				detail: "要舍入的值。"
			},
			significance: {
				name: "倍数",
				detail: "要舍入到的倍数。"
			},
			mode: {
				name: "众数",
				detail: "对于负数，控制数值是舍入为零还是从零舍入。"
			}
		}
	},
	FLOOR_PRECISE: {
		description: "将数字向下舍入为最接近的整数或最接近的指定基数的倍数。 无论该数字的符号如何，该数字都向下舍入。",
		abstract: "将数字向下舍入为最接近的整数或最接近的指定基数的倍数。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/floor-precise-function"
		}],
		functionParameter: {
			number: {
				name: "数值",
				detail: "要舍入的值。"
			},
			significance: {
				name: "倍数",
				detail: "要舍入到的倍数。"
			}
		}
	},
	GCD: {
		description: "返回最大公约数",
		abstract: "返回最大公约数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/gcd-function"
		}],
		functionParameter: {
			number1: {
				name: "数值1",
				detail: "用于计算的第一项数值或范围。"
			},
			number2: {
				name: "数值2",
				detail: "用于计算的其他数值或范围。"
			}
		}
	},
	INT: {
		description: "将数字向下舍入到最接近的整数",
		abstract: "将数字向下舍入到最接近的整数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/int-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "需要进行向下舍入取整的实数。"
		} }
	},
	ISO_CEILING: {
		description: "返回一个数字，该数字向上舍入为最接近的整数或最接近的有效位的倍数",
		abstract: "返回一个数字，该数字向上舍入为最接近的整数或最接近的有效位的倍数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/iso-ceiling-function"
		}],
		functionParameter: {
			number: {
				name: "数值",
				detail: "要舍入的值。"
			},
			significance: {
				name: "倍数",
				detail: "要舍入到的倍数。"
			}
		}
	},
	LCM: {
		description: "返回最小公倍数",
		abstract: "返回最小公倍数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/lcm-function"
		}],
		functionParameter: {
			number1: {
				name: "数值1",
				detail: "用于计算的第一项数值或范围。"
			},
			number2: {
				name: "数值2",
				detail: "用于计算的其他数值或范围。"
			}
		}
	},
	LN: {
		description: "返回数字的自然对数",
		abstract: "返回数字的自然对数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/ln-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "想要计算其自然对数的正实数。"
		} }
	},
	LOG: {
		description: "返回数字的以指定底为底的对数",
		abstract: "返回数字的以指定底为底的对数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/log-function"
		}],
		functionParameter: {
			number: {
				name: "数值",
				detail: "想要计算其对数的正实数。"
			},
			base: {
				name: "底数",
				detail: "对数的底数。 如果省略 base，则假定其值为 10。"
			}
		}
	},
	LOG10: {
		description: "返回数字的以 10 为底的对数",
		abstract: "返回数字的以 10 为底的对数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/log10-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "想要计算其以 10 为底的对数的正实数。"
		} }
	},
	MDETERM: {
		description: "返回数组的矩阵行列式的值",
		abstract: "返回数组的矩阵行列式的值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/mdeterm-function"
		}],
		functionParameter: { array: {
			name: "数组",
			detail: "行数和列数相等的数值数组。"
		} }
	},
	MINVERSE: {
		description: "返回数组的逆矩阵",
		abstract: "返回数组的逆矩阵",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/minverse-function"
		}],
		functionParameter: { array: {
			name: "数组",
			detail: "行数和列数相等的数值数组。"
		} }
	},
	MMULT: {
		description: "返回两个数组的矩阵乘积",
		abstract: "返回两个数组的矩阵乘积",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/mmult-function"
		}],
		functionParameter: {
			array1: {
				name: "数组1",
				detail: "要进行矩阵乘法运算的两个数组。"
			},
			array2: {
				name: "数组2",
				detail: "要进行矩阵乘法运算的两个数组。"
			}
		}
	},
	MOD: {
		description: "返回两数相除的余数。 结果的符号与除数相同。",
		abstract: "返回除法的余数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/mod-function"
		}],
		functionParameter: {
			number: {
				name: "数值",
				detail: "要计算余数的被除数"
			},
			divisor: {
				name: "除数",
				detail: "除数"
			}
		}
	},
	MROUND: {
		description: "返回一个舍入到所需倍数的数字",
		abstract: "返回一个舍入到所需倍数的数字",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/mround-function"
		}],
		functionParameter: {
			number: {
				name: "数值",
				detail: "要四舍五入的数字。"
			},
			multiple: {
				name: "倍数",
				detail: "要舍入到的倍数。"
			}
		}
	},
	MULTINOMIAL: {
		description: "返回一组数字的多项式",
		abstract: "返回一组数字的多项式",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/multinomial-function"
		}],
		functionParameter: {
			number1: {
				name: "数值1",
				detail: "用于计算的第一项数值或范围。"
			},
			number2: {
				name: "数值2",
				detail: "用于计算的其他数值或范围。"
			}
		}
	},
	MUNIT: {
		description: "返回单位矩阵或指定维度",
		abstract: "返回单位矩阵或指定维度",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/munit-function"
		}],
		functionParameter: { dimension: {
			name: "维度",
			detail: "是一个整数，用于指定要返回的单位矩阵的维度。 它返回一个数组。 维度必须大于零。"
		} }
	},
	ODD: {
		description: "将数字向上舍入为最接近的奇数",
		abstract: "将数字向上舍入为最接近的奇数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/odd-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "要舍入的值。"
		} }
	},
	PI: {
		description: "返回 pi 的值",
		abstract: "返回 pi 的值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/pi-function"
		}],
		functionParameter: {}
	},
	POWER: {
		description: "返回数字乘幂的结果。",
		abstract: "返回数的乘幂",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/power-function"
		}],
		functionParameter: {
			number: {
				name: "数值",
				detail: "基数。可为任意实数。"
			},
			power: {
				name: "指数",
				detail: "基数乘幂运算的指数。"
			}
		}
	},
	PRODUCT: {
		description: "将作为参数提供的所有数字相乘，并返回乘积。",
		abstract: "将其参数相乘",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/product-function"
		}],
		functionParameter: {
			number1: {
				name: "数值 1",
				detail: "要相乘的第一个数字或范围。"
			},
			number2: {
				name: "数值 2",
				detail: "要相乘的其他数字或单元格区域，最多可以使用 255 个参数。"
			}
		}
	},
	QUOTIENT: {
		description: "返回除法的整数部分",
		abstract: "返回除法的整数部分",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/quotient-function"
		}],
		functionParameter: {
			numerator: {
				name: "分子",
				detail: "被除数。"
			},
			denominator: {
				name: "分母",
				detail: "除数。"
			}
		}
	},
	RADIANS: {
		description: "将度转换为弧度",
		abstract: "将度转换为弧度",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/radians-function"
		}],
		functionParameter: { angle: {
			name: "角度",
			detail: "要转换的以度数表示的角度。"
		} }
	},
	RAND: {
		description: "返回 0 和 1 之间的一个随机数",
		abstract: "返回 0 和 1 之间的一个随机数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/rand-function"
		}],
		functionParameter: {}
	},
	RANDARRAY: {
		description: "RANDARRAY 函数返回 0 和 1 之间的随机数字数组。但是，你可以指定要填充的行数和列数、最小值和最大值，以及是否返回整个数字或小数值。",
		abstract: "RANDARRAY 函数返回 0 和 1 之间的随机数字数组。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/randarray-function"
		}],
		functionParameter: {
			rows: {
				name: "行数",
				detail: "要返回的行数"
			},
			columns: {
				name: "列数",
				detail: "要返回的列数"
			},
			min: {
				name: "最小值",
				detail: "想返回的最小数值"
			},
			max: {
				name: "最大值",
				detail: "想返回的最大数值"
			},
			wholeNumber: {
				name: "整数",
				detail: "返回整数或十进制值"
			}
		}
	},
	RANDBETWEEN: {
		description: "返回位于两个指定数之间的一个随机数",
		abstract: "返回位于两个指定数之间的一个随机数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/randbetween-function"
		}],
		functionParameter: {
			bottom: {
				name: "最小值",
				detail: "将返回的最小整数。"
			},
			top: {
				name: "最大值",
				detail: "将返回的最大整数。"
			}
		}
	},
	ROMAN: {
		description: "将阿拉伯数字转换为文本式罗马数字",
		abstract: "将阿拉伯数字转换为文本式罗马数字",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/roman-function"
		}],
		functionParameter: {
			number: {
				name: "数值",
				detail: "需要转换的阿拉伯数字。"
			},
			form: {
				name: "形式",
				detail: "指定所需罗马数字类型的数字。 罗马数字样式的范围从经典到简化，随着形式值的增加，会变得更加简洁。"
			}
		}
	},
	ROUND: {
		description: "将数字按指定位数舍入",
		abstract: "将数字按指定位数舍入",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/round-function"
		}],
		functionParameter: {
			number: {
				name: "数值",
				detail: "要四舍五入的数字。"
			},
			numDigits: {
				name: "位数",
				detail: "要进行四舍五入运算的位数。"
			}
		}
	},
	ROUNDBANK: {
		description: "通过“四舍六入五成双”舍入数字",
		abstract: "通过“四舍六入五成双”舍入数字",
		links: [{
			title: "教学",
			url: ""
		}],
		functionParameter: {
			number: {
				name: "数值",
				detail: "要“四舍六入五成双”的数字。"
			},
			numDigits: {
				name: "位数",
				detail: "要进行“四舍六入五成双”运算的位数。"
			}
		}
	},
	ROUNDDOWN: {
		description: "向绝对值减小的方向舍入数字",
		abstract: "向绝对值减小的方向舍入数字",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/rounddown-function"
		}],
		functionParameter: {
			number: {
				name: "数值",
				detail: "要四舍五入的数字。"
			},
			numDigits: {
				name: "位数",
				detail: "要进行四舍五入运算的位数。"
			}
		}
	},
	ROUNDUP: {
		description: "向绝对值增大的方向舍入数字",
		abstract: "向绝对值增大的方向舍入数字",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/roundup-function"
		}],
		functionParameter: {
			number: {
				name: "数值",
				detail: "要四舍五入的数字。"
			},
			numDigits: {
				name: "位数",
				detail: "要进行四舍五入运算的位数。"
			}
		}
	},
	SEC: {
		description: "返回角度的正割值",
		abstract: "返回角度的正割值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/sec-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "数值是需要其正割值的角度（以弧度为单位）。"
		} }
	},
	SECH: {
		description: "返回角度的双曲正割值",
		abstract: "返回角度的双曲正割值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/sech-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "数值是需要其双曲正割值的角度（以弧度为单位）。"
		} }
	},
	SERIESSUM: {
		description: "返回基于公式的幂级数的和",
		abstract: "返回基于公式的幂级数的和",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/seriessum-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "幂级数的输入值。"
			},
			n: {
				name: "n",
				detail: "x 的首项乘幂。"
			},
			m: {
				name: "m",
				detail: "级数中每一项的乘幂 n 的步长增加值。"
			},
			coefficients: {
				name: "系数",
				detail: "与 x 的每个连续乘幂相乘的一组系数。"
			}
		}
	},
	SEQUENCE: {
		description: "SEQUENCE 函数可在数组中生成一系列连续数字，例如，1、2、3、4。",
		abstract: "SEQUENCE 函数可在数组中生成一系列连续数字，例如，1、2、3、4。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/sequence-function"
		}],
		functionParameter: {
			rows: {
				name: "行数",
				detail: "要返回的行数。"
			},
			columns: {
				name: "列数",
				detail: "要返回的列数。"
			},
			start: {
				name: "起始数字",
				detail: "序列中第一个数字。"
			},
			step: {
				name: "递增值",
				detail: "数组中每个连续值递增的值。"
			}
		}
	},
	SIGN: {
		description: "返回数字的符号",
		abstract: "返回数字的符号",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/sign-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "任意实数。"
		} }
	},
	SIN: {
		description: "返回给定角度的正弦值",
		abstract: "返回给定角度的正弦值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/sin-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "需要求正弦的角度，以弧度表示。"
		} }
	},
	SINH: {
		description: "返回数字的双曲正弦值",
		abstract: "返回数字的双曲正弦值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/sinh-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "任意实数。"
		} }
	},
	SQRT: {
		description: "返回正平方根",
		abstract: "返回正平方根",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/sqrt-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "要计算其平方根的数字。"
		} }
	},
	SQRTPI: {
		description: "返回某数与 pi 的乘积的平方根",
		abstract: "返回某数与 pi 的乘积的平方根",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/sqrtpi-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "与 pi 相乘的数。"
		} }
	},
	SUBTOTAL: {
		description: "返回列表或数据库中的分类汇总。",
		abstract: "返回列表或数据库中的分类汇总",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/subtotal-function"
		}],
		functionParameter: {
			functionNum: {
				name: "函数编号",
				detail: "数字 1-11 或 101-111，用于指定要为分类汇总使用的函数。 如果使用 1-11，将包括手动隐藏的行，如果使用 101-111，则排除手动隐藏的行；始终排除已筛选掉的单元格。"
			},
			ref1: {
				name: "引用1",
				detail: "要对其进行分类汇总计算的第一个命名区域或引用。"
			},
			ref2: {
				name: "引用2",
				detail: "要对其进行分类汇总计算的第 2 个至第 254 个命名区域或引用。"
			}
		}
	},
	SUM: {
		description: "将单个值、单元格引用或是区域相加，或者将三者的组合相加。",
		abstract: "求参数的和",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/sum-function"
		}],
		functionParameter: {
			number1: {
				name: "数值 1",
				detail: "要相加的第一个数字。 该数字可以是 4 之类的数字，B6 之类的单元格引用或 B2:B8 之类的单元格范围。"
			},
			number2: {
				name: "数值 2",
				detail: "这是要相加的第二个数字。 可以按照这种方式最多指定 255 个数字。"
			}
		}
	},
	SUMIF: {
		description: "对范围中符合指定条件的值求和。",
		abstract: "按给定条件对指定单元格求和",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/sumif-function"
		}],
		functionParameter: {
			range: {
				name: "范围",
				detail: "要根据条件进行检测的范围。"
			},
			criteria: {
				name: "条件",
				detail: "以数字、表达式、单元格引用、文本或函数的形式来定义将添加哪些单元格。可包括的通配符字符 - 问号（？）以匹配任意单个字符，星号（*）以匹配任意字符序列。 如果要查找实际的问号或星号，请在该字符前键入波形符（~）。"
			},
			sumRange: {
				name: "求和范围",
				detail: "要添加的实际单元格，如果要添加在范围参数指定以外的其他单元格。 如果省略sum_range参数，Excel就会添加范围参数中指定的单元格（与应用标准的单元格相同）。"
			}
		}
	},
	SUMIFS: {
		description: "用于计算其满足多个条件的全部参数的总量。",
		abstract: "用于计算其满足多个条件的全部参数的总量。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/sumifs-function"
		}],
		functionParameter: {
			sumRange: {
				name: "求和范围",
				detail: "要求和的单元格区域。"
			},
			criteriaRange1: {
				name: "条件范围 1",
				detail: "使用条件 1 测试的区域。条件范围 1 和条件 1 设置用于搜索某个区域是否符合特定条件的搜索对。 一旦在该区域中找到了项，将计算求和范围中的相应值的和。"
			},
			criteria1: {
				name: "条件 1",
				detail: "定义将计算条件范围 1 中的哪些单元格的和的条件。 例如，可以将条件输入为 32、\">32\"、B4、\"苹果\" 或 \"32\"。"
			},
			criteriaRange2: {
				name: "条件范围 2",
				detail: "附加的区域，最多可以输入 127 个区域。"
			},
			criteria2: {
				name: "条件 2",
				detail: "附加的关联条件，最多可以输入 127 个条件。"
			}
		}
	},
	SUMPRODUCT: {
		description: "返回对应的数组元素的乘积和",
		abstract: "返回对应的数组元素的乘积和",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/sumproduct-function"
		}],
		functionParameter: {
			array1: {
				name: "数组",
				detail: "其相应元素需要进行相乘并求和的第一个数组参数。"
			},
			array2: {
				name: "数组",
				detail: "2 到 255 个数组参数，其相应元素需要进行相乘并求和。"
			}
		}
	},
	SUMSQ: {
		description: "返回参数的平方和",
		abstract: "返回参数的平方和",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/sumsq-function"
		}],
		functionParameter: {
			number1: {
				name: "数值1",
				detail: "要对其求平方和第1个数字，也可以用单一数组或对某个数组的引用来代替用逗号分隔的参数。"
			},
			number2: {
				name: "数值2",
				detail: "要对其求平方和的第2个数字。可以按照这种方式最多指定255个数字。"
			}
		}
	},
	SUMX2MY2: {
		description: "返回两数组中对应值平方差之和",
		abstract: "返回两数组中对应值平方差之和",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/sumx2my2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "数组1",
				detail: "第一个数组或数值区域。"
			},
			arrayY: {
				name: "数组2",
				detail: "第二个数组或数值区域。"
			}
		}
	},
	SUMX2PY2: {
		description: "返回两数组中对应值的平方和之和",
		abstract: "返回两数组中对应值的平方和之和",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/sumx2py2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "数组1",
				detail: "第一个数组或数值区域。"
			},
			arrayY: {
				name: "数组2",
				detail: "第二个数组或数值区域。"
			}
		}
	},
	SUMXMY2: {
		description: "返回两个数组中对应值差的平方和",
		abstract: "返回两个数组中对应值差的平方和",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/sumxmy2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "数组1",
				detail: "第一个数组或数值区域。"
			},
			arrayY: {
				name: "数组2",
				detail: "第二个数组或数值区域。"
			}
		}
	},
	TAN: {
		description: "返回数字的正切值。",
		abstract: "返回数字的正切值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/tan-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "要求正切的角度，以弧度表示。"
		} }
	},
	TANH: {
		description: "返回数字的双曲正切值。",
		abstract: "返回数字的双曲正切值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/tanh-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "任意实数。"
		} }
	},
	TRUNC: {
		description: "将数字截尾取整",
		abstract: "将数字截尾取整",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/trunc-function"
		}],
		functionParameter: {
			number: {
				name: "数值",
				detail: "需要截尾取整的数字。"
			},
			numDigits: {
				name: "位数",
				detail: "用于指定取整精度的数字。num_digits 的默认值为 0（零）。"
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/statistical/zh-CN.ts
const locale$4 = {
	AVEDEV: {
		description: "返回数据点与它们的平均值的绝对偏差平均值。",
		abstract: "返回数据点与它们的平均值的绝对偏差平均值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/avedev-function"
		}],
		functionParameter: {
			number1: {
				name: "数值 1",
				detail: "要计算平均值的第一个数字、单元格引用或单元格区域。"
			},
			number2: {
				name: "数值 2",
				detail: "要计算平均值的其他数字、单元格引用或单元格区域，最多可包含 255 个。"
			}
		}
	},
	AVERAGE: {
		description: "返回参数的平均值（算术平均值）。",
		abstract: "返回其参数的平均值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/average-function"
		}],
		functionParameter: {
			number1: {
				name: "数值 1",
				detail: "要计算平均值的第一个数字、单元格引用或单元格区域。"
			},
			number2: {
				name: "数值 2",
				detail: "要计算平均值的其他数字、单元格引用或单元格区域，最多可包含 255 个。"
			}
		}
	},
	AVERAGE_WEIGHTED: {
		description: "AVERAGE.WEIGHTED 函数根据一组数值及其对应的权重计算这些数值的加权平均值。",
		abstract: "AVERAGE.WEIGHTED 函数根据一组数值及其对应的权重计算这些数值的加权平均值。",
		links: [{
			title: "教学",
			url: "https://support.google.com/docs/answer/9084098?hl=zh-Hans"
		}],
		functionParameter: {
			values: {
				name: "值",
				detail: "要计算平均数的值。 可以引用一组单元格，也可以是数值本身。"
			},
			weights: {
				name: "权重",
				detail: "要应用的相应权重列表。 可以引用一组单元格，也可以是权重本身。 权重不得为负数，但可以为零。 必须至少有一个权重是正数。 如果使用一组单元格，则该单元格范围的行数和列数必须与值范围的行数和列数相同。"
			},
			additionalValues: {
				name: "其他值",
				detail: "要计算平均数的其他值。 其他值是选填的。"
			},
			additionalWeights: {
				name: "其他权重",
				detail: "要应用的其他权重。 其他权重是选填的，但每个 其他值 必须后跟一个 权重 。"
			}
		}
	},
	AVERAGEA: {
		description: "返回其参数的平均值，包括数字、文本和逻辑值。",
		abstract: "返回其参数的平均值，包括数字、文本和逻辑值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/averagea-function"
		}],
		functionParameter: {
			value1: {
				name: "值 1",
				detail: "要计算平均值的第一个数字、单元格引用或单元格区域。"
			},
			value2: {
				name: "值 2",
				detail: "要计算平均值的其他数字、单元格引用或单元格区域，最多可包含 255 个。"
			}
		}
	},
	AVERAGEIF: {
		description: "返回区域中满足给定条件的所有单元格的平均值（算术平均值）。",
		abstract: "返回区域中满足给定条件的所有单元格的平均值（算术平均值）",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/averageif-function"
		}],
		functionParameter: {
			range: {
				name: "范围",
				detail: "要计算平均值的一个或多个单元格，其中包含数字或包含数字的名称、数组或引用。"
			},
			criteria: {
				name: "条件",
				detail: "形式为数字、表达式、单元格引用或文本的条件，用来定义将计算平均值的单元格。 例如，条件可以表示为 32、\"32\"、\">32\"、\"苹果\" 或 B4。"
			},
			averageRange: {
				name: "平均范围",
				detail: "计算平均值的实际单元格组。 如果省略，则使用 range。"
			}
		}
	},
	AVERAGEIFS: {
		description: "返回满足多个条件的所有单元格的平均值（算术平均值）。",
		abstract: "返回满足多个条件的所有单元格的平均值（算术平均值）",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/averageifs-function"
		}],
		functionParameter: {
			averageRange: {
				name: "平均值范围",
				detail: "要计算平均值的一个或多个单元格，其中包含数字或包含数字的名称、数组或引用。"
			},
			criteriaRange1: {
				name: "条件范围 1",
				detail: "是一组用于条件计算的单元格。"
			},
			criteria1: {
				name: "条件 1",
				detail: "用来定义将计算平均值的单元格。 例如，条件可以表示为 32、\"32\"、\">32\"、\"苹果\" 或 B4"
			},
			criteriaRange2: {
				name: "条件范围 2",
				detail: "附加区域。 最多可以输入 127 个区域。"
			},
			criteria2: {
				name: "条件 2",
				detail: "附加关联条件。 最多可以输入 127 个条件。"
			}
		}
	},
	BETA_DIST: {
		description: "返回 beta 累积分布函数",
		abstract: "返回 beta 累积分布函数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/beta-dist-function"
		}],
		functionParameter: {
			x: {
				name: "值",
				detail: "用来计算其函数的值，介于下限值和上限值之间。"
			},
			alpha: {
				name: "alpha",
				detail: "分布的第一个参数。"
			},
			beta: {
				name: "beta",
				detail: "分布的第二个参数。"
			},
			cumulative: {
				name: "累积",
				detail: "决定函数形式的逻辑值。如果为TRUE，则 BETA.DIST 返回累积分布函数；如果为 FALSE，则返回概率密度函数。"
			},
			A: {
				name: "下限",
				detail: "函数的下限，默认值为 0。"
			},
			B: {
				name: "上限",
				detail: "函数的上限，默认值为 1。"
			}
		}
	},
	BETA_INV: {
		description: "返回指定 beta 分布的累积分布函数的反函数",
		abstract: "返回指定 beta 分布的累积分布函数的反函数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/beta-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "概率",
				detail: "与 beta 分布相关的概率。"
			},
			alpha: {
				name: "alpha",
				detail: "分布的第一个参数。"
			},
			beta: {
				name: "beta",
				detail: "分布的第二个参数。"
			},
			A: {
				name: "下限",
				detail: "函数的下限，默认值为 0。"
			},
			B: {
				name: "上限",
				detail: "函数的上限，默认值为 1。"
			}
		}
	},
	BINOM_DIST: {
		description: "返回一元二项式分布的概率",
		abstract: "返回一元二项式分布的概率",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/binom-dist-function"
		}],
		functionParameter: {
			numberS: {
				name: "成功次数",
				detail: "试验的成功次数。"
			},
			trials: {
				name: "试验次数",
				detail: "独立试验次数。"
			},
			probabilityS: {
				name: "成功概率",
				detail: "每次试验成功的概率。"
			},
			cumulative: {
				name: "累积",
				detail: "决定函数形式的逻辑值。如果为TRUE，则 BINOM.DIST 返回累积分布函数；如果为 FALSE，则返回概率密度函数。"
			}
		}
	},
	BINOM_DIST_RANGE: {
		description: "使用二项式分布返回试验结果的概率",
		abstract: "使用二项式分布返回试验结果的概率",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/binom-dist-range-function"
		}],
		functionParameter: {
			trials: {
				name: "试验次数",
				detail: "独立试验次数。"
			},
			probabilityS: {
				name: "成功概率",
				detail: "每次试验成功的概率。"
			},
			numberS: {
				name: "成功次数",
				detail: "试验的成功次数。"
			},
			numberS2: {
				name: "最大成功次数",
				detail: "如果提供，则返回成功试验数介于 成功次数 和 最大成功次数 之间的概率。"
			}
		}
	},
	BINOM_INV: {
		description: "返回使累积二项式分布小于或等于临界值的最小值",
		abstract: "返回使累积二项式分布小于或等于临界值的最小值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/binom-inv-function"
		}],
		functionParameter: {
			trials: {
				name: "试验次数",
				detail: "伯努利试验的次数。"
			},
			probabilityS: {
				name: "成功概率",
				detail: "每次试验成功的概率。"
			},
			alpha: {
				name: "目标概率",
				detail: "临界值。"
			}
		}
	},
	CHISQ_DIST: {
		description: "返回 χ2 分布的左尾概率。",
		abstract: "返回 χ2 分布的左尾概率。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/chisq-dist-function"
		}],
		functionParameter: {
			x: {
				name: "值",
				detail: "用来计算分布的数值。"
			},
			degFreedom: {
				name: "自由度",
				detail: "自由度数。"
			},
			cumulative: {
				name: "累积",
				detail: "决定函数形式的逻辑值。 如果为 TRUE，则 CHISQ.DIST 返回累积分布函数；如果为 FALSE，则返回概率密度函数。"
			}
		}
	},
	CHISQ_DIST_RT: {
		description: "返回 χ2 分布的右尾概率。",
		abstract: "返回 χ2 分布的右尾概率。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/chisq-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "值",
				detail: "用来计算分布的数值。"
			},
			degFreedom: {
				name: "自由度",
				detail: "自由度数。"
			}
		}
	},
	CHISQ_INV: {
		description: "返回 χ2 分布的左尾概率的反函数。",
		abstract: "返回 χ2 分布的左尾概率的反函数。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/chisq-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "概率",
				detail: "与 χ2 分布相关联的概率。"
			},
			degFreedom: {
				name: "自由度",
				detail: "自由度数。"
			}
		}
	},
	CHISQ_INV_RT: {
		description: "返回 χ2 分布的右尾概率的反函数。",
		abstract: "返回 χ2 分布的右尾概率的反函数。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/chisq-inv-rt-function"
		}],
		functionParameter: {
			probability: {
				name: "概率",
				detail: "与 χ2 分布相关联的概率。"
			},
			degFreedom: {
				name: "自由度",
				detail: "自由度数。"
			}
		}
	},
	CHISQ_TEST: {
		description: "返回独立性检验值",
		abstract: "返回独立性检验值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/chisq-test-function"
		}],
		functionParameter: {
			actualRange: {
				name: "观察范围",
				detail: "包含观察值的数据区域，用于检验预期值。"
			},
			expectedRange: {
				name: "预期范围",
				detail: "包含行列汇总的乘积与总计值之比率的数据区域。"
			}
		}
	},
	CONFIDENCE_NORM: {
		description: "使用正态分布返回总体平均值的置信区间。",
		abstract: "使用正态分布返回总体平均值的置信区间。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/confidence-norm-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "用来计算置信水平的显著性水平。 置信水平等于 100*(1 - alpha)%，亦即，如果 alpha 为 0.05，则置信水平为 95%。"
			},
			standardDev: {
				name: "总体标准偏差",
				detail: "数据区域的总体标准偏差，假定为已知。"
			},
			size: {
				name: "样本大小",
				detail: "样本大小。"
			}
		}
	},
	CONFIDENCE_T: {
		description: "返回总体平均值的置信区间（使用学生 t-分布）",
		abstract: "返回总体平均值的置信区间（使用学生 t-分布）",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/confidence-t-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "用来计算置信水平的显著性水平。 置信水平等于 100*(1 - alpha)%，亦即，如果 alpha 为 0.05，则置信水平为 95%。"
			},
			standardDev: {
				name: "总体标准偏差",
				detail: "数据区域的总体标准偏差，假定为已知。"
			},
			size: {
				name: "样本大小",
				detail: "样本大小。"
			}
		}
	},
	CORREL: {
		description: "返回两个数据集之间的相关系数",
		abstract: "返回两个数据集之间的相关系数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/correl-function"
		}],
		functionParameter: {
			array1: {
				name: "数组1",
				detail: "第一个单元格值区域。"
			},
			array2: {
				name: "数组2",
				detail: "第二个单元格值区域。"
			}
		}
	},
	COUNT: {
		description: "计算包含数字的单元格个数以及参数列表中数字的个数。",
		abstract: "计算参数列表中数字的个数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/count-function"
		}],
		functionParameter: {
			value1: {
				name: "值 1",
				detail: "要计算其中数字的个数的第一项、单元格引用或区域。"
			},
			value2: {
				name: "值 2",
				detail: "要计算其中数字的个数的其他项、单元格引用或区域，最多可包含 255 个。"
			}
		}
	},
	COUNTA: {
		description: `计算包含任何类型的信息（包括错误值和空文本 ("")）的单元格
        如果不需要对逻辑值、文本或错误值进行计数（换句话说，只希望对包含数字的单元格进行计数），请使用 COUNT 函数。`,
		abstract: "计算参数列表中值的个数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/counta-function"
		}],
		functionParameter: {
			value1: {
				name: "值 1",
				detail: "要计算平均值的第一个数字、单元格引用或单元格区域。"
			},
			value2: {
				name: "值 2",
				detail: "要计算平均值的其他数字、单元格引用或单元格区域，最多可包含 255 个。"
			}
		}
	},
	COUNTBLANK: {
		description: "计算区域内空白单元格的数量。",
		abstract: "计算区域内空白单元格的数量",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/countblank-function"
		}],
		functionParameter: { range: {
			name: "范围",
			detail: "需要计算其中空白单元格个数的区域。"
		} }
	},
	COUNTIF: {
		description: "计算区域内符合给定条件的单元格的数量。",
		abstract: "计算区域内符合给定条件的单元格的数量",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/use-the-countif-function-in-microsoft-excel"
		}],
		functionParameter: {
			range: {
				name: "范围",
				detail: "要进行计数的单元格组。 区域可以包括数字、数组、命名区域或包含数字的引用。 空白和文本值将被忽略。"
			},
			criteria: {
				name: "条件",
				detail: "用于决定要统计哪些单元格的数量的数字、表达式、单元格引用或文本字符串。\n例如，可以使用 32 之类数字，“>32”之类比较，B4 之类单元格，或“苹果”之类单词。\nCOUNTIF 仅使用一个条件。 如果要使用多个条件，请使用 COUNTIFS。"
			}
		}
	},
	COUNTIFS: {
		description: "计算区域内符合多个条件的单元格的数量。",
		abstract: "计算区域内符合多个条件的单元格的数量",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/countifs-function"
		}],
		functionParameter: {
			criteriaRange1: {
				name: "条件范围 1",
				detail: "在其中计算关联条件的第一个区域。"
			},
			criteria1: {
				name: "条件 1",
				detail: "条件的形式为数字、表达式、单元格引用或文本，它定义了要计数的单元格范围。 例如，条件可以表示为 32、\">32\"、B4、\"apples\"或 \"32\"。"
			},
			criteriaRange2: {
				name: "条件范围 2",
				detail: "附加区域。 最多可以输入 127 个区域。"
			},
			criteria2: {
				name: "条件 2",
				detail: "附加关联条件。 最多可以输入 127 个条件。"
			}
		}
	},
	COVARIANCE_P: {
		description: "返回总体协方差，即两个数据集中每对数据点的偏差乘积的平均值。",
		abstract: "返回总体协方差",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/covariance-p-function"
		}],
		functionParameter: {
			array1: {
				name: "数组1",
				detail: "第一个单元格值区域。"
			},
			array2: {
				name: "数组2",
				detail: "第二个单元格值区域。"
			}
		}
	},
	COVARIANCE_S: {
		description: "返回样本协方差，即两个数据集中每对数据点的偏差乘积的平均值。",
		abstract: "返回样本协方差",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/covariance-s-function"
		}],
		functionParameter: {
			array1: {
				name: "数组1",
				detail: "第一个单元格值区域。"
			},
			array2: {
				name: "数组2",
				detail: "第二个单元格值区域。"
			}
		}
	},
	DEVSQ: {
		description: "返回偏差的平方和",
		abstract: "返回偏差的平方和",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/devsq-function"
		}],
		functionParameter: {
			number1: {
				name: "数值1",
				detail: "用于计算偏差平方和的第 1 个参数。"
			},
			number2: {
				name: "数值2",
				detail: "用于计算偏差平方和的第 2 到 255 个参数。"
			}
		}
	},
	EXPON_DIST: {
		description: "返回指数分布",
		abstract: "返回指数分布",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/expon-dist-function"
		}],
		functionParameter: {
			x: {
				name: "值",
				detail: "用来计算分布的数值。"
			},
			lambda: {
				name: "lambda",
				detail: "参数值。"
			},
			cumulative: {
				name: "累积",
				detail: "决定函数形式的逻辑值。 如果为 TRUE，则 EXPON.DIST 返回累积分布函数；如果为 FALSE，则返回概率密度函数。"
			}
		}
	},
	F_DIST: {
		description: "返回 F 概率分布",
		abstract: "返回 F 概率分布",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/f-dist-function"
		}],
		functionParameter: {
			x: {
				name: "值",
				detail: "用来计算函数的值。"
			},
			degFreedom1: {
				name: "分子自由度",
				detail: "分子自由度。"
			},
			degFreedom2: {
				name: "分母自由度",
				detail: "分母自由度。"
			},
			cumulative: {
				name: "累积",
				detail: "决定函数形式的逻辑值。 如果为 TRUE，则 F.DIST 返回累积分布函数；如果为 FALSE，则返回概率密度函数。"
			}
		}
	},
	F_DIST_RT: {
		description: "返回 F 概率分布（右尾）",
		abstract: "返回 F 概率分布（右尾）",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/f-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "值",
				detail: "用来计算函数的值。"
			},
			degFreedom1: {
				name: "分子自由度",
				detail: "分子自由度。"
			},
			degFreedom2: {
				name: "分母自由度",
				detail: "分母自由度。"
			}
		}
	},
	F_INV: {
		description: "返回 F 概率分布的反函数",
		abstract: "返回 F 概率分布的反函数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/f-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "概率",
				detail: "F 累积分布的概率值。"
			},
			degFreedom1: {
				name: "分子自由度",
				detail: "分子自由度。"
			},
			degFreedom2: {
				name: "分母自由度",
				detail: "分母自由度。"
			}
		}
	},
	F_INV_RT: {
		description: "返回 F 概率分布（右尾）的反函数",
		abstract: "返回 F 概率分布（右尾）的反函数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/f-inv-rt-function"
		}],
		functionParameter: {
			probability: {
				name: "概率",
				detail: "F 累积分布的概率值。"
			},
			degFreedom1: {
				name: "分子自由度",
				detail: "分子自由度。"
			},
			degFreedom2: {
				name: "分母自由度",
				detail: "分母自由度。"
			}
		}
	},
	F_TEST: {
		description: "返回 F 检验的结果",
		abstract: "返回 F 检验的结果",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/f-test-function"
		}],
		functionParameter: {
			array1: {
				name: "数组1",
				detail: "第一个数据数组或数据范围。"
			},
			array2: {
				name: "数组2",
				detail: "第二个数据数组或数据范围。"
			}
		}
	},
	FISHER: {
		description: "返回 Fisher 变换值",
		abstract: "返回 Fisher 变换值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/fisher-function"
		}],
		functionParameter: { x: {
			name: "数值",
			detail: "要对其进行变换的数值。"
		} }
	},
	FISHERINV: {
		description: "返回 Fisher 变换的反函数",
		abstract: "返回 Fisher 变换的反函数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/fisherinv-function"
		}],
		functionParameter: { y: {
			name: "数值",
			detail: "要对其进行逆变换的数值。"
		} }
	},
	FORECAST: {
		description: "返回线性趋势值",
		abstract: "返回线性趋势值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/forecast-and-forecast-linear-functions"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "需要进行值预测的数据点。"
			},
			knownYs: {
				name: "数据_y",
				detail: "代表因变量数据的数组或矩阵的范围。"
			},
			knownXs: {
				name: "数据_x",
				detail: "代表自变量数据的数组或矩阵的范围。"
			}
		}
	},
	FORECAST_ETS: {
		description: "通过使用指数平滑 (ETS) 算法的 AAA 版本，返回基于现有（历史）值的未来值",
		abstract: "通过使用指数平滑 (ETS) 算法的 AAA 版本，返回基于现有（历史）值的未来值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/forecast-ets-function"
		}],
		functionParameter: {
			targetDate: {
				name: "目标日期",
				detail: "要预测其值的数据点。"
			},
			values: {
				name: "值",
				detail: "用于预测的历史值。"
			},
			timeline: {
				name: "时间线",
				detail: "由步长恒定的数值日期或时间组成的独立区域或数组。"
			},
			seasonality: {
				name: "季节性",
				detail: "可选。1 表示自动检测，0 表示无季节性。"
			},
			dataCompletion: {
				name: "数据补全",
				detail: "可选。1 表示插值补全缺失点，0 表示将缺失点视为零。"
			},
			aggregation: {
				name: "聚合",
				detail: "可选。用 1 到 7 指定重复时间戳的聚合方式。"
			}
		}
	},
	FORECAST_ETS_CONFINT: {
		description: "返回指定目标日期预测值的置信区间",
		abstract: "返回指定目标日期预测值的置信区间",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/forecast-ets-confint-function"
		}],
		functionParameter: {
			targetDate: {
				name: "目标日期",
				detail: "要预测其值的数据点。"
			},
			values: {
				name: "值",
				detail: "用于预测的历史值。"
			},
			timeline: {
				name: "时间线",
				detail: "由步长恒定的数值日期或时间组成的独立区域或数组。"
			},
			confidenceLevel: {
				name: "置信水平",
				detail: "可选。0 到 1 之间的数字，默认值为 0.95。"
			},
			seasonality: {
				name: "季节性",
				detail: "可选。1 表示自动检测，0 表示无季节性。"
			},
			dataCompletion: {
				name: "数据补全",
				detail: "可选。1 表示插值补全缺失点，0 表示将缺失点视为零。"
			},
			aggregation: {
				name: "聚合",
				detail: "可选。用 1 到 7 指定重复时间戳的聚合方式。"
			}
		}
	},
	FORECAST_ETS_SEASONALITY: {
		description: "返回 Excel 针对指定时间系列检测到的重复模式的长度",
		abstract: "返回 Excel 针对指定时间系列检测到的重复模式的长度",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/forecast-ets-seasonality-function"
		}],
		functionParameter: {
			values: {
				name: "值",
				detail: "用于预测的历史值。"
			},
			timeline: {
				name: "时间线",
				detail: "由步长恒定的数值日期或时间组成的独立区域或数组。"
			},
			dataCompletion: {
				name: "数据补全",
				detail: "可选。1 表示插值补全缺失点，0 表示将缺失点视为零。"
			},
			aggregation: {
				name: "聚合",
				detail: "可选。用 1 到 7 指定重复时间戳的聚合方式。"
			}
		}
	},
	FORECAST_ETS_STAT: {
		description: "返回作为时间序列预测的结果的统计值。",
		abstract: "返回作为时间序列预测的结果的统计值。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/forecast-ets-stat-function"
		}],
		functionParameter: {
			values: {
				name: "值",
				detail: "用于预测的历史值。"
			},
			timeline: {
				name: "时间线",
				detail: "由步长恒定的数值日期或时间组成的独立区域或数组。"
			},
			statisticType: {
				name: "统计类型",
				detail: "用 1 到 8 指定要返回的预测统计值。"
			},
			seasonality: {
				name: "季节性",
				detail: "可选。1 表示自动检测，0 表示无季节性。"
			},
			dataCompletion: {
				name: "数据补全",
				detail: "可选。1 表示插值补全缺失点，0 表示将缺失点视为零。"
			},
			aggregation: {
				name: "聚合",
				detail: "可选。用 1 到 7 指定重复时间戳的聚合方式。"
			}
		}
	},
	FORECAST_LINEAR: {
		description: "返回基于现有值的未来值",
		abstract: "返回基于现有值的未来值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/forecast-and-forecast-linear-functions"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "需要进行值预测的数据点。"
			},
			knownYs: {
				name: "数据_y",
				detail: "代表因变量数据的数组或矩阵的范围。"
			},
			knownXs: {
				name: "数据_x",
				detail: "代表自变量数据的数组或矩阵的范围。"
			}
		}
	},
	FREQUENCY: {
		description: "以垂直数组的形式返回频率分布",
		abstract: "以垂直数组的形式返回频率分布",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/frequency-function"
		}],
		functionParameter: {
			dataArray: {
				name: "数据数组",
				detail: "要对其频率进行计数的一组数值或对这组数值的引用。 如果 data_array 中不包含任何数值，则 FREQUENCY 返回一个零数组。"
			},
			binsArray: {
				name: "区间数组",
				detail: "要将 data_array 中的值插入到的间隔数组或对间隔的引用。 如果 bins_array 中不包含任何数值，则 FREQUENCY 返回 data_array 中的元素个数。"
			}
		}
	},
	GAMMA: {
		description: "返回 γ 函数值",
		abstract: "返回 γ 函数值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/gamma-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "伽玛函数的输入值。"
		} }
	},
	GAMMA_DIST: {
		description: "返回 γ 分布",
		abstract: "返回 γ 分布",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/gamma-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "需要计算其分布的数值。"
			},
			alpha: {
				name: "alpha",
				detail: "分布的第一个参数。"
			},
			beta: {
				name: "beta",
				detail: "分布的第二个参数。"
			},
			cumulative: {
				name: "累积",
				detail: "决定函数形式的逻辑值。如果为TRUE，则 GAMMA.DIST 返回累积分布函数；如果为 FALSE，则返回概率密度函数。"
			}
		}
	},
	GAMMA_INV: {
		description: "返回 γ 累积分布函数的反函数",
		abstract: "返回 γ 累积分布函数的反函数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/gamma-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "概率",
				detail: "与伽玛分布相关的概率。"
			},
			alpha: {
				name: "alpha",
				detail: "分布的第一个参数。"
			},
			beta: {
				name: "beta",
				detail: "分布的第二个参数。"
			}
		}
	},
	GAMMALN: {
		description: "返回 γ 函数的自然对数，Γ(x)",
		abstract: "返回 γ 函数的自然对数，Γ(x)",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/gammaln-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "要计算其 GAMMALN 的数值。"
		} }
	},
	GAMMALN_PRECISE: {
		description: "返回 γ 函数的自然对数，Γ(x)",
		abstract: "返回 γ 函数的自然对数，Γ(x)",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/gammaln-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "要计算其 GAMMALN.PRECISE 的数值。"
		} }
	},
	GAUSS: {
		description: "返回小于标准正态累积分布 0.5 的值",
		abstract: "返回小于标准正态累积分布 0.5 的值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/gauss-function"
		}],
		functionParameter: { z: {
			name: "z",
			detail: "需要计算其分布的数值。"
		} }
	},
	GEOMEAN: {
		description: "返回几何平均值",
		abstract: "返回几何平均值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/geomean-function"
		}],
		functionParameter: {
			number1: {
				name: "数值 1",
				detail: "要计算几何平均值的第一个数字、单元格引用或单元格区域。"
			},
			number2: {
				name: "数值 2",
				detail: "要计算几何平均值的其他数字、单元格引用或单元格区域，最多可包含 255 个。"
			}
		}
	},
	GROWTH: {
		description: "返回指数趋势值",
		abstract: "返回指数趋势值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/growth-function"
		}],
		functionParameter: {
			knownYs: {
				name: "已知数据_y",
				detail: "关系表达式 y = b*m^x 中已知的 y 值集合。"
			},
			knownXs: {
				name: "已知数据_x",
				detail: "关系表达式 y = b*m^x 中已知的 x 值集合。"
			},
			newXs: {
				name: "新数据_x",
				detail: "需要 GROWTH 返回对应 y 值的新 x 值。"
			},
			constb: {
				name: "b",
				detail: "一个逻辑值，用于指定是否将常量 b 强制设为 1。"
			}
		}
	},
	HARMEAN: {
		description: "返回调和平均值",
		abstract: "返回调和平均值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/harmean-function"
		}],
		functionParameter: {
			number1: {
				name: "数值 1",
				detail: "要计算调和平均值的第一个数字、单元格引用或单元格区域。"
			},
			number2: {
				name: "数值 2",
				detail: "要计算调和平均值的其他数字、单元格引用或单元格区域，最多可包含 255 个。"
			}
		}
	},
	HYPGEOM_DIST: {
		description: "返回超几何分布",
		abstract: "返回超几何分布",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/hypgeom-dist-function"
		}],
		functionParameter: {
			sampleS: {
				name: "样本成功次数",
				detail: "样本中成功的次数。"
			},
			numberSample: {
				name: "样本大小",
				detail: "样本大小。"
			},
			populationS: {
				name: "总体成功次数",
				detail: "总体中成功的次数。"
			},
			numberPop: {
				name: "总体大小",
				detail: "总体大小。"
			},
			cumulative: {
				name: "累积",
				detail: "决定函数形式的逻辑值。如果为TRUE，则 HYPGEOM.DIST 返回累积分布函数；如果为 FALSE，则返回概率密度函数。"
			}
		}
	},
	INTERCEPT: {
		description: "返回线性回归线的截距",
		abstract: "返回线性回归线的截距",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/intercept-function"
		}],
		functionParameter: {
			knownYs: {
				name: "数据_y",
				detail: "代表因变量数据的数组或矩阵的范围。"
			},
			knownXs: {
				name: "数据_x",
				detail: "代表自变量数据的数组或矩阵的范围。"
			}
		}
	},
	KURT: {
		description: "返回数据集的峰值",
		abstract: "返回数据集的峰值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/kurt-function"
		}],
		functionParameter: {
			number1: {
				name: "数值 1",
				detail: "要计算峰值的第一个数字、单元格引用或单元格区域。"
			},
			number2: {
				name: "数值 2",
				detail: "要计算峰值的其他数字、单元格引用或单元格区域，最多可包含 255 个。"
			}
		}
	},
	LARGE: {
		description: "返回数据集中第 k 个最大值",
		abstract: "返回数据集中第 k 个最大值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/large-function"
		}],
		functionParameter: {
			array: {
				name: "数组",
				detail: "需要确定第 k 个最大值的数组或数据区域。"
			},
			k: {
				name: "k",
				detail: "返回值在数组或数据单元格区域中的位置（从大到小排）。"
			}
		}
	},
	LINEST: {
		description: "返回线性趋势的参数",
		abstract: "返回线性趋势的参数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/linest-function"
		}],
		functionParameter: {
			knownYs: {
				name: "已知数据_y",
				detail: "关系表达式 y = m*x+b 中已知的 y 值集合。"
			},
			knownXs: {
				name: "已知数据_x",
				detail: "关系表达式 y = m*x+b 中已知的 x 值集合。"
			},
			constb: {
				name: "b",
				detail: "一个逻辑值，用于指定是否将常量 b 强制设为 0。"
			},
			stats: {
				name: "统计",
				detail: "一个逻辑值，用于指定是否返回附加回归统计值。"
			}
		}
	},
	LOGEST: {
		description: "返回指数趋势的参数",
		abstract: "返回指数趋势的参数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/logest-function"
		}],
		functionParameter: {
			knownYs: {
				name: "已知数据_y",
				detail: "关系表达式 y = b*m^x 中已知的 y 值集合。"
			},
			knownXs: {
				name: "已知数据_x",
				detail: "关系表达式 y = b*m^x 中已知的 x 值集合。"
			},
			constb: {
				name: "b",
				detail: "一个逻辑值，用于指定是否将常量 b 强制设为 1。"
			},
			stats: {
				name: "统计",
				detail: "一个逻辑值，用于指定是否返回附加回归统计值。"
			}
		}
	},
	LOGNORM_DIST: {
		description: "返回对数正态累积分布",
		abstract: "返回对数正态累积分布",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/lognorm-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "需要计算其分布的数值。"
			},
			mean: {
				name: "平均值",
				detail: "分布的算术平均值。"
			},
			standardDev: {
				name: "标准偏差",
				detail: "分布的标准偏差。"
			},
			cumulative: {
				name: "累积",
				detail: "决定函数形式的逻辑值。 如果为 TRUE，则 LOGNORM.DIST 返回累积分布函数；如果为 FALSE，则返回概率密度函数。"
			}
		}
	},
	LOGNORM_INV: {
		description: "返回对数正态累积分布的反函数",
		abstract: "返回对数正态累积分布的反函数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/lognorm-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "概率",
				detail: "对应于对数正态分布的概率。"
			},
			mean: {
				name: "平均值",
				detail: "分布的算术平均值。"
			},
			standardDev: {
				name: "标准偏差",
				detail: "分布的标准偏差。"
			}
		}
	},
	MARGINOFERROR: {
		description: "此函数会根据一系列值和置信水平计算误差范围。",
		abstract: "此函数会根据一系列值和置信水平计算误差范围。",
		links: [{
			title: "教学",
			url: "https://support.google.com/docs/answer/12487850?hl=zh-Hans"
		}],
		functionParameter: {
			range: {
				name: "范围",
				detail: "MARGINOFERROR(A1:C3, 0.99)"
			},
			confidence: {
				name: "置信度",
				detail: "所需的置信度介于 0 与 1 之间。"
			}
		}
	},
	MAX: {
		description: "返回一组值中的最大值。",
		abstract: "返回参数列表中的最大值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/max-function"
		}],
		functionParameter: {
			number1: {
				name: "数值 1",
				detail: "要计算最大值的第一个数字、单元格引用或单元格区域。"
			},
			number2: {
				name: "数值 2",
				detail: "要计算最大值的其他数字、单元格引用或单元格区域，最多可包含 255 个。"
			}
		}
	},
	MAXA: {
		description: "返回参数列表中的最大值，包括数字、文本和逻辑值。",
		abstract: "返回参数列表中的最大值，包括数字、文本和逻辑值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/maxa-function"
		}],
		functionParameter: {
			value1: {
				name: "值 1",
				detail: "要从中找出最大值的第一个数值参数。"
			},
			value2: {
				name: "值 2",
				detail: "要从中找出最大值的 2 到 255 个数值参数。"
			}
		}
	},
	MAXIFS: {
		description: "返回一组给定条件或标准指定的单元格之间的最大值",
		abstract: "返回一组给定条件或标准指定的单元格之间的最大值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/maxifs-function"
		}],
		functionParameter: {
			maxRange: {
				name: "最大值范围",
				detail: "确定最大值的实际单元格区域。"
			},
			criteriaRange1: {
				name: "条件范围 1",
				detail: "是一组用于条件计算的单元格。"
			},
			criteria1: {
				name: "条件 1",
				detail: "用于确定哪些单元格是最大值的条件，格式为数字、表达式或文本。 一组相同的条件适用于 MINIFS、SUMIFS 和 AVERAGEIFS 函数。"
			},
			criteriaRange2: {
				name: "条件范围 2",
				detail: "附加区域。 最多可以输入 127 个区域。"
			},
			criteria2: {
				name: "条件 2",
				detail: "附加关联条件。 最多可以输入 127 个条件。"
			}
		}
	},
	MEDIAN: {
		description: "返回给定数值集合的中值",
		abstract: "返回给定数值集合的中值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/median-function"
		}],
		functionParameter: {
			number1: {
				name: "数值 1",
				detail: "要计算中值的第一个数字、单元格引用或单元格区域。"
			},
			number2: {
				name: "数值 2",
				detail: "要计算中值的其他数字、单元格引用或单元格区域，最多可包含 255 个。"
			}
		}
	},
	MIN: {
		description: "返回一组值中的最小值。",
		abstract: "返回参数列表中的最小值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/min-function"
		}],
		functionParameter: {
			number1: {
				name: "数值 1",
				detail: "要计算最小值的第一个数字、单元格引用或单元格区域。"
			},
			number2: {
				name: "数值 2",
				detail: "要计算最小值的其他数字、单元格引用或单元格区域，最多可包含 255 个。"
			}
		}
	},
	MINA: {
		description: "返回参数列表中的最小值，包括数字、文本和逻辑值。",
		abstract: "返回参数列表中的最小值，包括数字、文本和逻辑值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/mina-function"
		}],
		functionParameter: {
			value1: {
				name: "值 1",
				detail: "要计算最小值的第一个数字、单元格引用或单元格区域。"
			},
			value2: {
				name: "值 2",
				detail: "要计算最小值的其他数字、单元格引用或单元格区域，最多可包含 255 个。"
			}
		}
	},
	MINIFS: {
		description: "返回一组给定条件或标准指定的单元格之间的最小值。",
		abstract: "返回一组给定条件或标准指定的单元格之间的最小值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/minifs-function"
		}],
		functionParameter: {
			minRange: {
				name: "最小值范围",
				detail: "确定最小值的实际单元格区域。"
			},
			criteriaRange1: {
				name: "条件范围 1",
				detail: "是一组用于条件计算的单元格。"
			},
			criteria1: {
				name: "条件 1",
				detail: "用于确定哪些单元格是最小值的条件，格式为数字、表达式或文本。 一组相同的条件适用于 MAXIFS、SUMIFS 和 AVERAGEIFS 函数。"
			},
			criteriaRange2: {
				name: "条件范围 2",
				detail: "附加区域。 最多可以输入 127 个区域。"
			},
			criteria2: {
				name: "条件 2",
				detail: "附加关联条件。 最多可以输入 127 个条件。"
			}
		}
	},
	MODE_MULT: {
		description: "返回一组数据或数据区域中出现频率最高或重复出现的数值的垂直数组",
		abstract: "返回一组数据或数据区域中出现频率最高或重复出现的数值的垂直数组",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/mode-mult-function"
		}],
		functionParameter: {
			number1: {
				name: "数值 1",
				detail: "要计算众数的第一个数字、单元格引用或单元格区域。"
			},
			number2: {
				name: "数值 2",
				detail: "要计算众数的其他数字、单元格引用或单元格区域，最多可包含 255 个。"
			}
		}
	},
	MODE_SNGL: {
		description: "返回在数据集内出现次数最多的值",
		abstract: "返回在数据集内出现次数最多的值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/mode-sngl-function"
		}],
		functionParameter: {
			number1: {
				name: "数值 1",
				detail: "要计算众数的第一个数字、单元格引用或单元格区域。"
			},
			number2: {
				name: "数值 2",
				detail: "要计算众数的其他数字、单元格引用或单元格区域，最多可包含 255 个。"
			}
		}
	},
	NEGBINOM_DIST: {
		description: "返回负二项式分布",
		abstract: "返回负二项式分布",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/negbinom-dist-function"
		}],
		functionParameter: {
			numberF: {
				name: "失败次数",
				detail: "失败的次数。"
			},
			numberS: {
				name: "成功次数",
				detail: "成功次数的阈值。"
			},
			probabilityS: {
				name: "成功概率",
				detail: "成功的概率。"
			},
			cumulative: {
				name: "累积",
				detail: "决定函数形式的逻辑值。 如果为 TRUE，则 NEGBINOM.DIST 返回累积分布函数；如果为 FALSE，则返回概率密度函数。"
			}
		}
	},
	NORM_DIST: {
		description: "返回正态累积分布",
		abstract: "返回正态累积分布",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/norm-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "需要计算其分布的数值。"
			},
			mean: {
				name: "平均值",
				detail: "分布的算术平均值。"
			},
			standardDev: {
				name: "标准偏差",
				detail: "分布的标准偏差。"
			},
			cumulative: {
				name: "累积",
				detail: "决定函数形式的逻辑值。 如果为 TRUE，则 NORM.DIST 返回累积分布函数；如果为 FALSE，则返回概率密度函数。"
			}
		}
	},
	NORM_INV: {
		description: "返回正态累积分布的反函数",
		abstract: "返回正态累积分布的反函数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/norm-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "概率",
				detail: "对应于正态分布的概率。"
			},
			mean: {
				name: "平均值",
				detail: "分布的算术平均值。"
			},
			standardDev: {
				name: "标准偏差",
				detail: "分布的标准偏差。"
			}
		}
	},
	NORM_S_DIST: {
		description: "返回标准正态累积分布",
		abstract: "返回标准正态累积分布",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/norm-s-dist-function"
		}],
		functionParameter: {
			z: {
				name: "z",
				detail: "需要计算其分布的数值。"
			},
			cumulative: {
				name: "累积",
				detail: "决定函数形式的逻辑值。 如果为 TRUE，则 NORM.DIST 返回累积分布函数；如果为 FALSE，则返回概率密度函数。"
			}
		}
	},
	NORM_S_INV: {
		description: "返回标准正态累积分布函数的反函数",
		abstract: "返回标准正态累积分布函数的反函数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/norm-s-inv-function"
		}],
		functionParameter: { probability: {
			name: "概率",
			detail: "对应于正态分布的概率。"
		} }
	},
	PEARSON: {
		description: "返回 Pearson 乘积矩相关系数",
		abstract: "返回 Pearson 乘积矩相关系数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/pearson-function"
		}],
		functionParameter: {
			array1: {
				name: "数据1",
				detail: "代表因变量数据的数组或矩阵的范围。"
			},
			array2: {
				name: "数据2",
				detail: "代表自变量数据的数组或矩阵的范围。"
			}
		}
	},
	PERCENTILE_EXC: {
		description: "返回数据集中第 k 个百分点的值 (不含 0 和 1)",
		abstract: "返回数据集中第 k 个百分点的值 (不含 0 和 1)",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/percentile-exc-function"
		}],
		functionParameter: {
			array: {
				name: "数组",
				detail: "定义相对位置的数组或数据区域。"
			},
			k: {
				name: "k",
				detail: "0 到 1 之间的百分点值 (不含 0 和 1)。"
			}
		}
	},
	PERCENTILE_INC: {
		description: "返回数据集中第 k 个百分点的值 (包含 0 和 1)",
		abstract: "返回数据集中第 k 个百分点的值 (包含 0 和 1)",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/percentile-inc-function"
		}],
		functionParameter: {
			array: {
				name: "数组",
				detail: "定义相对位置的数组或数据区域。"
			},
			k: {
				name: "k",
				detail: "0 到 1 之间的百分点值 (包含 0 和 1)。"
			}
		}
	},
	PERCENTRANK_EXC: {
		description: "返回数据集中值的百分比排位 (不含 0 和 1)",
		abstract: "返回数据集中值的百分比排位 (不含 0 和 1)",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/percentrank-exc-function"
		}],
		functionParameter: {
			array: {
				name: "数组",
				detail: "定义相对位置的数组或数据区域。"
			},
			x: {
				name: "x",
				detail: "需要得到其排位的值。"
			},
			significance: {
				name: "有效位数",
				detail: "用于标识返回的百分比值的有效位数的值。 如果省略，则 PERCENTRANK.EXC 使用 3 位小数 (0.xxx)。"
			}
		}
	},
	PERCENTRANK_INC: {
		description: "返回数据集中值的百分比排位 (包含 0 和 1)",
		abstract: "返回数据集中值的百分比排位 (包含 0 和 1)",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/percentrank-inc-function"
		}],
		functionParameter: {
			array: {
				name: "数组",
				detail: "定义相对位置的数组或数据区域。"
			},
			x: {
				name: "x",
				detail: "需要得到其排位的值。"
			},
			significance: {
				name: "有效位数",
				detail: "用于标识返回的百分比值的有效位数的值。 如果省略，则 PERCENTRANK.INC 使用 3 位小数 (0.xxx)。"
			}
		}
	},
	PERMUT: {
		description: "返回给定数目对象的排列数",
		abstract: "返回给定数目对象的排列数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/permut-function"
		}],
		functionParameter: {
			number: {
				name: "总数",
				detail: "项目的数量。"
			},
			numberChosen: {
				name: "样品数量",
				detail: "每一排列中项目的数量。"
			}
		}
	},
	PERMUTATIONA: {
		description: "返回可从总计对象中选择的给定数目对象（含重复）的排列数",
		abstract: "返回可从总计对象中选择的给定数目对象（含重复）的排列数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/permutationa-function"
		}],
		functionParameter: {
			number: {
				name: "总数",
				detail: "项目的数量。"
			},
			numberChosen: {
				name: "样品数量",
				detail: "每一排列中项目的数量。"
			}
		}
	},
	PHI: {
		description: "返回标准正态分布的密度函数值",
		abstract: "返回标准正态分布的密度函数值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/phi-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "X 是需要标准正态分布密度的数字。"
		} }
	},
	POISSON_DIST: {
		description: "返回泊松分布",
		abstract: "返回泊松分布",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/poisson-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "需要计算其分布的数值。"
			},
			mean: {
				name: "平均值",
				detail: "分布的算术平均值。"
			},
			cumulative: {
				name: "累积",
				detail: "决定函数形式的逻辑值。 如果为 TRUE，则 POISSON.DIST 返回累积分布函数；如果为 FALSE，则返回概率密度函数。"
			}
		}
	},
	PROB: {
		description: "返回区域中的数值落在指定区间内的概率",
		abstract: "返回区域中的数值落在指定区间内的概率",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/prob-function"
		}],
		functionParameter: {
			xRange: {
				name: "数值",
				detail: "具有各自相应概率值的数值区域。"
			},
			probRange: {
				name: "概率",
				detail: "与数值相关联的一组概率值。"
			},
			lowerLimit: {
				name: "下界",
				detail: "要计算其概率的数值下界。"
			},
			upperLimit: {
				name: "上界",
				detail: "要计算其概率的数值上界。"
			}
		}
	},
	QUARTILE_EXC: {
		description: "返回数据集的四分位数 (不含 0 和 1)",
		abstract: "返回数据集的四分位数 (不含 0 和 1)",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/quartile-exc-function"
		}],
		functionParameter: {
			array: {
				name: "数组",
				detail: "要求得四分位数值的数组或数据区域。"
			},
			quart: {
				name: "四分位值",
				detail: "要返回的四分位数值。"
			}
		}
	},
	QUARTILE_INC: {
		description: "返回数据集的四分位数 (包含 0 和 1)",
		abstract: "返回数据集的四分位数 (包含 0 和 1)",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/quartile-inc-function"
		}],
		functionParameter: {
			array: {
				name: "数组",
				detail: "要求得四分位数值的数组或数据区域。"
			},
			quart: {
				name: "四分位值",
				detail: "要返回的四分位数值。"
			}
		}
	},
	RANK_AVG: {
		description: "返回一列数字的数字排位",
		abstract: "返回一列数字的数字排位",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/rank-avg-function"
		}],
		functionParameter: {
			number: {
				name: "数值",
				detail: "要找到其排位的数字。"
			},
			ref: {
				name: "数字列表",
				detail: "对数字列表的引用。Ref 中的非数字值会被忽略。"
			},
			order: {
				name: "排位方式",
				detail: "一个指定数字排位方式的数字。0 或省略为降序，非 0 为升序。"
			}
		}
	},
	RANK_EQ: {
		description: "返回一列数字的数字排位",
		abstract: "返回一列数字的数字排位",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/rank-eq-function"
		}],
		functionParameter: {
			number: {
				name: "数值",
				detail: "要找到其排位的数字。"
			},
			ref: {
				name: "数字列表",
				detail: "对数字列表的引用。Ref 中的非数字值会被忽略。"
			},
			order: {
				name: "排位方式",
				detail: "一个指定数字排位方式的数字。0 或省略为降序，非 0 为升序。"
			}
		}
	},
	RSQ: {
		description: "返回 Pearson 乘积矩相关系数的平方",
		abstract: "返回 Pearson 乘积矩相关系数的平方",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/rsq-function"
		}],
		functionParameter: {
			knownYs: {
				name: "数据_y",
				detail: "代表因变量数据的数组或矩阵的范围。"
			},
			knownXs: {
				name: "数据_x",
				detail: "代表自变量数据的数组或矩阵的范围。"
			}
		}
	},
	SKEW: {
		description: "返回分布的偏斜度",
		abstract: "返回分布的偏斜度",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/skew-function"
		}],
		functionParameter: {
			number1: {
				name: "数值 1",
				detail: "要计算偏斜度的第一个数字、单元格引用或单元格区域。"
			},
			number2: {
				name: "数值 2",
				detail: "要计算偏斜度的其他数字、单元格引用或单元格区域，最多可包含 255 个。"
			}
		}
	},
	SKEW_P: {
		description: "返回基于样本总体的分布的偏斜度",
		abstract: "返回基于样本总体的分布的偏斜度",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/skew-p-function"
		}],
		functionParameter: {
			number1: {
				name: "数值 1",
				detail: "要计算偏斜度的第一个数字、单元格引用或单元格区域。"
			},
			number2: {
				name: "数值 2",
				detail: "要计算偏斜度的其他数字、单元格引用或单元格区域，最多可包含 255 个。"
			}
		}
	},
	SLOPE: {
		description: "返回线性回归线的斜率",
		abstract: "返回线性回归线的斜率",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/slope-function"
		}],
		functionParameter: {
			knownYs: {
				name: "数据_y",
				detail: "代表因变量数据的数组或矩阵的范围。"
			},
			knownXs: {
				name: "数据_x",
				detail: "代表自变量数据的数组或矩阵的范围。"
			}
		}
	},
	SMALL: {
		description: "返回数据集中的第 k 个最小值",
		abstract: "返回数据集中的第 k 个最小值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/small-function"
		}],
		functionParameter: {
			array: {
				name: "数组",
				detail: "需要确定第 k 个最小值的数组或数据区域。"
			},
			k: {
				name: "k",
				detail: "返回值在数组或数据单元格区域中的位置（从小到大排）。"
			}
		}
	},
	STANDARDIZE: {
		description: "返回正态化数值",
		abstract: "返回正态化数值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/standardize-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "需要计算其正态化的数值。"
			},
			mean: {
				name: "平均值",
				detail: "分布的算术平均值。"
			},
			standardDev: {
				name: "标准偏差",
				detail: "分布的标准偏差。"
			}
		}
	},
	STDEV_P: {
		description: "计算基于以参数形式给出的整个样本总体的标准偏差（忽略逻辑值和文本）。",
		abstract: "基于整个样本总体计算标准偏差",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/stdev-p-function"
		}],
		functionParameter: {
			number1: {
				name: "数值 1",
				detail: "对应于总体的第一个数值参数。"
			},
			number2: {
				name: "数值 2",
				detail: "对应于总体的 2 到 254 个数值参数。 也可以用单一数组或对某个数组的引用来代替用逗号分隔的参数。"
			}
		}
	},
	STDEV_S: {
		description: "基于样本估算标准偏差（忽略样本中的逻辑值和文本）。",
		abstract: "基于样本估算标准偏差",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/stdev-s-function"
		}],
		functionParameter: {
			number1: {
				name: "数值 1",
				detail: "对应于总体样本的第一个数值参数。 也可以用单一数组或对某个数组的引用来代替用逗号分隔的参数。"
			},
			number2: {
				name: "数值 2",
				detail: "对应于总体样本的 2 到 254 个数值参数。 也可以用单一数组或对某个数组的引用来代替用逗号分隔的参数。"
			}
		}
	},
	STDEVA: {
		description: "基于样本（包括数字、文本和逻辑值）估算标准偏差。",
		abstract: "基于样本（包括数字、文本和逻辑值）估算标准偏差",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/stdeva-function"
		}],
		functionParameter: {
			value1: {
				name: "值 1",
				detail: "对应于总体样本的第一个值参数。 也可以用单一数组或对某个数组的引用来代替用逗号分隔的参数。"
			},
			value2: {
				name: "值 2",
				detail: "对应于总体样本的 2 到 254 个值参数。 也可以用单一数组或对某个数组的引用来代替用逗号分隔的参数。"
			}
		}
	},
	STDEVPA: {
		description: "根据作为参数（包括文字和逻辑值）给定的整个总体计算标准偏差。",
		abstract: "基于样本总体（包括数字、文本和逻辑值）计算标准偏差",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/stdevpa-function"
		}],
		functionParameter: {
			value1: {
				name: "值 1",
				detail: "对应于总体的第一个值参数。"
			},
			value2: {
				name: "值 2",
				detail: "对应于总体的 2 到 254 个值参数。 也可以用单一数组或对某个数组的引用来代替用逗号分隔的参数。"
			}
		}
	},
	STEYX: {
		description: "返回通过线性回归法预测每个 x 的 y 值时所产生的标准误差",
		abstract: "返回通过线性回归法预测每个 x 的 y 值时所产生的标准误差",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/steyx-function"
		}],
		functionParameter: {
			knownYs: {
				name: "数据_y",
				detail: "代表因变量数据的数组或矩阵的范围。"
			},
			knownXs: {
				name: "数据_x",
				detail: "代表自变量数据的数组或矩阵的范围。"
			}
		}
	},
	T_DIST: {
		description: "返回学生的 t 概率分布",
		abstract: "返回学生的 t 概率分布",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/t-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "需要计算分布的数值。"
			},
			degFreedom: {
				name: "自由度",
				detail: "一个表示自由度数的整数。"
			},
			cumulative: {
				name: "累积",
				detail: "决定函数形式的逻辑值。 如果为 TRUE，则 T.DIST 返回累积分布函数；如果为 FALSE，则返回概率密度函数。"
			}
		}
	},
	T_DIST_2T: {
		description: "返回学生的 t 概率分布 (双尾)",
		abstract: "返回学生的 t 概率分布 (双尾)",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/t-dist-2t-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "需要计算分布的数值。"
			},
			degFreedom: {
				name: "自由度",
				detail: "一个表示自由度数的整数。"
			}
		}
	},
	T_DIST_RT: {
		description: "返回学生的 t 概率分布 (右尾)",
		abstract: "返回学生的 t 概率分布 (右尾)",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/t-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "需要计算分布的数值。"
			},
			degFreedom: {
				name: "自由度",
				detail: "一个表示自由度数的整数。"
			}
		}
	},
	T_INV: {
		description: "返回学生的 t 概率分布的反函数",
		abstract: "返回学生的 t 概率分布的反函数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/t-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "概率",
				detail: "与学生的 t 分布相关的概率。"
			},
			degFreedom: {
				name: "自由度",
				detail: "一个表示自由度数的整数。"
			}
		}
	},
	T_INV_2T: {
		description: "返回学生的 t 概率分布的反函数 (双尾)",
		abstract: "返回学生的 t 概率分布的反函数 (双尾)",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/t-inv-2t-function"
		}],
		functionParameter: {
			probability: {
				name: "概率",
				detail: "与学生的 t 分布相关的概率。"
			},
			degFreedom: {
				name: "自由度",
				detail: "一个表示自由度数的整数。"
			}
		}
	},
	T_TEST: {
		description: "返回与学生 t-检验相关的概率",
		abstract: "返回与学生 t-检验相关的概率",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/t-test-function"
		}],
		functionParameter: {
			array1: {
				name: "数组1",
				detail: "第一个数据数组或数据范围。"
			},
			array2: {
				name: "数组2",
				detail: "第二个数据数组或数据范围。"
			},
			tails: {
				name: "尾部特性",
				detail: "指定分布尾数。 如果 tails = 1，则 T.TEST 使用单尾分布。 如果 tails = 2，则 T.TEST 使用双尾分布。"
			},
			type: {
				name: "检验类型",
				detail: "要执行的 t 检验的类型。"
			}
		}
	},
	TREND: {
		description: "返回线性趋势值",
		abstract: "返回线性趋势值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/trend-function"
		}],
		functionParameter: {
			knownYs: {
				name: "已知数据_y",
				detail: "关系表达式 y = m*x+b 中已知的 y 值集合。"
			},
			knownXs: {
				name: "已知数据_x",
				detail: "关系表达式 y = m*x+b 中已知的 x 值集合。"
			},
			newXs: {
				name: "新数据_x",
				detail: "需要 TREND 返回对应 y 值的新 x 值。"
			},
			constb: {
				name: "b",
				detail: "一个逻辑值，用于指定是否将常量 b 强制设为 0。"
			}
		}
	},
	TRIMMEAN: {
		description: "返回数据集的内部平均值",
		abstract: "返回数据集的内部平均值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/trimmean-function"
		}],
		functionParameter: {
			array: {
				name: "数组",
				detail: "要求得内部平均值的数组或数据区域。"
			},
			percent: {
				name: "排除比例",
				detail: "从计算中排除数据点的百分比值。"
			}
		}
	},
	VAR_P: {
		description: "计算基于整个样本总体的方差（忽略样本总体中的逻辑值和文本）。",
		abstract: "计算基于样本总体的方差",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/var-p-function"
		}],
		functionParameter: {
			number1: {
				name: "数值 1",
				detail: "对应于总体的第一个数值参数。"
			},
			number2: {
				name: "数值 2",
				detail: "对应于总体的 2 到 254 个数值参数。"
			}
		}
	},
	VAR_S: {
		description: "估算基于样本的方差（忽略样本中的逻辑值和文本）。",
		abstract: "基于样本估算方差",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/var-s-function"
		}],
		functionParameter: {
			number1: {
				name: "数值 1",
				detail: "对应于总体样本的第一个数值参数。"
			},
			number2: {
				name: "数值 2",
				detail: "对应于总体样本的 2 到 254 个数值参数。"
			}
		}
	},
	VARA: {
		description: "基于样本（包括数字、文本和逻辑值）估算方差",
		abstract: "基于样本（包括数字、文本和逻辑值）估算方差",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/vara-function"
		}],
		functionParameter: {
			value1: {
				name: "值 1",
				detail: "对应于总体样本的第一个值参数。"
			},
			value2: {
				name: "值 2",
				detail: "对应于总体样本的 2 到 254 个值参数"
			}
		}
	},
	VARPA: {
		description: "基于样本总体（包括数字、文本和逻辑值）计算标准偏差",
		abstract: "基于样本总体（包括数字、文本和逻辑值）计算标准偏差",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/varpa-function"
		}],
		functionParameter: {
			value1: {
				name: "值 1",
				detail: "对应于总体的第一个值参数。"
			},
			value2: {
				name: "值 2",
				detail: "对应于总体的 2 到 254 个值参数"
			}
		}
	},
	WEIBULL_DIST: {
		description: "返回 Weibull 分布",
		abstract: "返回 Weibull 分布",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/weibull-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "需要计算其分布的数值。"
			},
			alpha: {
				name: "alpha",
				detail: "分布的第一个参数。"
			},
			beta: {
				name: "beta",
				detail: "分布的第二个参数。"
			},
			cumulative: {
				name: "累积",
				detail: "决定函数形式的逻辑值。如果为TRUE，则 WEIBULL.DIST 返回累积分布函数；如果为 FALSE，则返回概率密度函数。"
			}
		}
	},
	Z_TEST: {
		description: "返回 z 检验的单尾概率值",
		abstract: "返回 z 检验的单尾概率值",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/z-test-function"
		}],
		functionParameter: {
			array: {
				name: "数组",
				detail: "用来检验 x 的数组或数据区域。"
			},
			x: {
				name: "x",
				detail: "要测试的值。"
			},
			sigma: {
				name: "标准偏差",
				detail: "总体（已知）标准偏差。 如果省略，则使用样本标准偏差。"
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/text/zh-CN.ts
const locale$3 = {
	ASC: {
		description: "将字符串中的全角（双字节）英文字母或片假名更改为半角（单字节）字符",
		abstract: "将字符串中的全角（双字节）英文字母或片假名更改为半角（单字节）字符",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/asc-function"
		}],
		functionParameter: { text: {
			name: "文本",
			detail: "文本或对包含要更改文本的单元格的引用。 如果文本不包含任何全角字母，则不会对文本进行转换。"
		} }
	},
	ARRAYTOTEXT: {
		description: "ARRAYTOTEXT 函数返回任意指定区域内的文本值的数组。",
		abstract: "ARRAYTOTEXT 函数返回任意指定区域内的文本值的数组。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/arraytotext-function"
		}],
		functionParameter: {
			array: {
				name: "数组",
				detail: "要返回为文本的数组。"
			},
			format: {
				name: "数据格式",
				detail: "返回的数据的格式。它可以是两个值之一：\n0 默认。 易于阅读的简明格式。\n1 包含转义字符和行定界符的严格格式。 生成一条可在输入编辑栏时被解析的字符串。 将返回的字符串（布尔值、数字和错误除外）封装在引号中。"
			}
		}
	},
	BAHTTEXT: {
		description: "使用 ß（泰铢）货币格式将数字转换为文本",
		abstract: "使用 ß（泰铢）货币格式将数字转换为文本",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/bahttext-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "要转换成文本的数字、对包含数字的单元格的引用或结果为数字的公式。"
		} }
	},
	CHAR: {
		description: "返回由代码数字指定的字符",
		abstract: "返回由代码数字指定的字符",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/char-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "介于 1 到 255 之间的数字，指定所需的字符。 使用的是当前计算机字符集中的字符。"
		} }
	},
	CLEAN: {
		description: "删除文本中所有非打印字符",
		abstract: "删除文本中所有非打印字符",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/clean-function"
		}],
		functionParameter: { text: {
			name: "文本",
			detail: "要从中删除非打印字符的任何工作表信息。"
		} }
	},
	CODE: {
		description: "返回文本字符串中第一个字符的数字代码",
		abstract: "返回文本字符串中第一个字符的数字代码",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/code-function"
		}],
		functionParameter: { text: {
			name: "文本",
			detail: "要为其获取第一个字符的代码的文本。"
		} }
	},
	CONCAT: {
		description: "将多个区域和/或字符串的文本组合起来，但不提供分隔符或 IgnoreEmpty 参数。",
		abstract: "将多个区域和/或字符串的文本组合起来，但不提供分隔符或 IgnoreEmpty 参数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/concat-function"
		}],
		functionParameter: {
			text1: {
				name: "文本 1",
				detail: "要联接的文本项。 字符串或字符串数组，如单元格区域。"
			},
			text2: {
				name: "文本 2",
				detail: "要联接的其他文本项。 文本项最多可以有 253 个文本参数。 每个参数可以是一个字符串或字符串数组，如单元格区域。"
			}
		}
	},
	CONCATENATE: {
		description: "将几个文本项合并为一个文本项",
		abstract: "将几个文本项合并为一个文本项",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/concatenate-function"
		}],
		functionParameter: {
			text1: {
				name: "文本 1",
				detail: "要联接的第一个项目。 项目可以是文本值、数字或单元格引用。"
			},
			text2: {
				name: "文本 2",
				detail: "要联接的其他文本项目。 最多可以有 255 个项目，总共最多支持 8,192 个字符。"
			}
		}
	},
	DBCS: {
		description: "将字符串中的半角（单字节）英文字母或片假名更改为全角（双字节）字符",
		abstract: "将字符串中的半角（单字节）英文字母或片假名更改为全角（双字节）字符",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/dbcs-function"
		}],
		functionParameter: { text: {
			name: "文本",
			detail: "文本或包含要转换的文本的单元格的引用。 如果文本中不包含任何半角英文字母或片假名，则不会对文本进行转换。"
		} }
	},
	DOLLAR: {
		description: "使用货币格式将数字转换为文本",
		abstract: "使用货币格式将数字转换为文本",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/dollar-function"
		}],
		functionParameter: {
			number: {
				name: "数值",
				detail: "数字、对包含数字的单元格的引用或是计算结果为数字的公式。"
			},
			decimals: {
				name: "小数位数",
				detail: "小数点右边的位数。 如果这是负数，则数字将舍入到小数点的左侧。 如果省略 decimals，则假设其值为 2。"
			}
		}
	},
	EXACT: {
		description: "检查两个文本值是否相同",
		abstract: "检查两个文本值是否相同",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/exact-function"
		}],
		functionParameter: {
			text1: {
				name: "文本1",
				detail: "第一个文本字符串。"
			},
			text2: {
				name: "文本2",
				detail: "第二个文本字符串。"
			}
		}
	},
	FIND: {
		description: "在一个文本值中查找另一个文本值（区分大小写）",
		abstract: "在一个文本值中查找另一个文本值（区分大小写）",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/this-article-has-been-retired"
		}],
		functionParameter: {
			findText: {
				name: "搜索字符串",
				detail: "要在“要搜索的文本”中查找的字符串。"
			},
			withinText: {
				name: "要搜索的文本",
				detail: "要搜索“搜索字符串”的首次出现的文本。"
			},
			startNum: {
				name: "开始位置",
				detail: "要在“要搜索的文本”中开始搜索的字符位置。如果省略则假定其值为 1。"
			}
		}
	},
	FINDB: {
		description: "在一个文本值中查找另一个文本值（区分大小写）",
		abstract: "在一个文本值中查找另一个文本值（区分大小写）",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/this-article-has-been-retired"
		}],
		functionParameter: {
			findText: {
				name: "搜索字符串",
				detail: "要在“要搜索的文本”中查找的字符串。"
			},
			withinText: {
				name: "要搜索的文本",
				detail: "要搜索“搜索字符串”的首次出现的文本。"
			},
			startNum: {
				name: "开始位置",
				detail: "要在“要搜索的文本”中开始搜索的字符位置。如果省略则假定其值为 1。"
			}
		}
	},
	FIXED: {
		description: "将数字格式设置为具有固定小数位数的文本",
		abstract: "将数字格式设置为具有固定小数位数的文本",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/fixed-function"
		}],
		functionParameter: {
			number: {
				name: "数值",
				detail: "要进行舍入并转换为文本的数字。"
			},
			decimals: {
				name: "小数位数",
				detail: "小数点右边的位数。 如果这是负数，则数字将舍入到小数点的左侧。 如果省略 decimals，则假设其值为 2。"
			},
			noCommas: {
				name: "禁用分隔符",
				detail: "一个逻辑值，如果为 TRUE，则会禁止 FIXED 在返回的文本中包含逗号。"
			}
		}
	},
	LEFT: {
		description: "返回文本值中最左边的字符",
		abstract: "返回文本值中最左边的字符",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/left-function"
		}],
		functionParameter: {
			text: {
				name: "文本",
				detail: "包含要提取字符的文本字符串。"
			},
			numChars: {
				name: "字符数",
				detail: "指定希望 LEFT 提取的字符数。"
			}
		}
	},
	LEFTB: {
		description: "返回文本值中最左边的字符。",
		abstract: "返回文本值中最左边的字符",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/left-function"
		}],
		functionParameter: {
			text: {
				name: "文本",
				detail: "包含要提取字符的文本字符串。"
			},
			numBytes: {
				name: "字节数",
				detail: "按字节指定要由 LEFTB 提取的字符的数量。"
			}
		}
	},
	LEN: {
		description: "返回文本字符串中的字符个数",
		abstract: "返回文本字符串中的字符个数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/len-function"
		}],
		functionParameter: { text: {
			name: "文本",
			detail: "要查找其长度的文本。 空格将作为字符进行计数。"
		} }
	},
	LENB: {
		description: "返回文本字符串中用于代表字符的字节数。",
		abstract: "返回文本字符串中用于代表字符的字节数",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/len-function"
		}],
		functionParameter: { text: {
			name: "文本",
			detail: "要查找其长度的文本。 空格将作为字符进行计数。"
		} }
	},
	LOWER: {
		description: "将文本转换为小写。",
		abstract: "将文本转换为小写",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/lower-function"
		}],
		functionParameter: { text: {
			name: "文本",
			detail: "要转换为小写字母的文本。"
		} }
	},
	MID: {
		description: "从文本字符串中的指定位置起返回特定个数的字符",
		abstract: "从文本字符串中的指定位置起返回特定个数的字符",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/mid-function"
		}],
		functionParameter: {
			text: {
				name: "文本",
				detail: "包含要提取字符的文本字符串。"
			},
			startNum: {
				name: "开始位置",
				detail: "文本中要提取的第一个字符的位置。"
			},
			numChars: {
				name: "字符数",
				detail: "指定希望 MID 提取的字符数。"
			}
		}
	},
	MIDB: {
		description: "从文本字符串中的指定位置起返回特定个数的字符",
		abstract: "从文本字符串中的指定位置起返回特定个数的字符",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/mid-function"
		}],
		functionParameter: {
			text: {
				name: "文本",
				detail: "包含要提取字符的文本字符串。"
			},
			startNum: {
				name: "开始位置",
				detail: "文本中要提取的第一个字符的位置。"
			},
			numBytes: {
				name: "字节数",
				detail: "按字节指定要由 MIDB 提取的字符的数量。"
			}
		}
	},
	NUMBERSTRING: {
		description: "将数字转换为中文字符串",
		abstract: "将数字转换为中文字符串",
		links: [{
			title: "教学",
			url: "https://www.wps.cn/learning/course/detail/id/340.html?chan=pc_kdocs_function"
		}],
		functionParameter: {
			number: {
				name: "数值",
				detail: "被转化为中文字符串的数值。"
			},
			type: {
				name: "类型",
				detail: "返回结果的类型。\n1. 汉字小写 \n2. 汉字大写 \n3. 汉字读写"
			}
		}
	},
	NUMBERVALUE: {
		description: "以与区域设置无关的方式将文本转换为数字",
		abstract: "以与区域设置无关的方式将文本转换为数字",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/numbervalue-function"
		}],
		functionParameter: {
			text: {
				name: "文本",
				detail: "要转换为数字的文本。"
			},
			decimalSeparator: {
				name: "小数分隔符",
				detail: "用于分隔结果的整数和小数部分的字符。"
			},
			groupSeparator: {
				name: "分组分隔符",
				detail: "用于分隔数字分组的字符。"
			}
		}
	},
	PHONETIC: {
		description: "提取文本字符串中的拼音（汉字注音）字符",
		abstract: "提取文本字符串中的拼音（汉字注音）字符",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/phonetic-function"
		}],
		functionParameter: { reference: {
			name: "引用",
			detail: "包含要提取的拼音文本的文本、区域或引用。"
		} }
	},
	PROPER: {
		description: "将文本值的每个字的首字母大写",
		abstract: "将文本值的每个字的首字母大写",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/proper-function"
		}],
		functionParameter: { text: {
			name: "文本",
			detail: "用引号括起来的文本、返回文本值的公式，或者对包含要进行部分大写转换文本的单元格的引用。"
		} }
	},
	REGEXEXTRACT: {
		description: "根据正则表达式提取第一个匹配的子字符串。",
		abstract: "根据正则表达式提取第一个匹配的子字符串。",
		links: [{
			title: "教学",
			url: "https://support.google.com/docs/answer/3098244?hl=zh-Hans"
		}],
		functionParameter: {
			text: {
				name: "文本",
				detail: "提示 ：上面的示例将返回两列数据：第一列中的“extract”，第二列为“values”。"
			},
			regularExpression: {
				name: "正则表达式",
				detail: "此函数将返回 text 中符合此表达式的第一个字符串。"
			}
		}
	},
	REGEXMATCH: {
		description: "判断一段文本是否与正则表达式相匹配。",
		abstract: "判断一段文本是否与正则表达式相匹配。",
		links: [{
			title: "教学",
			url: "https://support.google.com/docs/answer/3098292?hl=zh-Hans"
		}],
		functionParameter: {
			text: {
				name: "文本",
				detail: "要用正则表达式测试的文本。"
			},
			regularExpression: {
				name: "正则表达式",
				detail: "用来测试文本的正则表达式。"
			}
		}
	},
	REGEXREPLACE: {
		description: "使用正则表达式将文本字符串中的一部分替换为其他文本字符串。",
		abstract: "使用正则表达式将文本字符串中的一部分替换为其他文本字符串。",
		links: [{
			title: "教学",
			url: "https://support.google.com/docs/answer/3098245?hl=zh-Hans"
		}],
		functionParameter: {
			text: {
				name: "文本",
				detail: "其中一部分将被替换的文本。"
			},
			regularExpression: {
				name: "正则表达式",
				detail: "正则表达式。text 中所有匹配的实例都将被替换。"
			},
			replacement: {
				name: "替换内容",
				detail: "要插入到原有文本中的文本。"
			}
		}
	},
	REPLACE: {
		description: "替换文本中的字符",
		abstract: "替换文本中的字符",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/replace-function"
		}],
		functionParameter: {
			oldText: {
				name: "旧文本",
				detail: "要替换其部分字符的文本。"
			},
			startNum: {
				name: "开始位置",
				detail: "文本中要替换的第一个字符的位置。"
			},
			numChars: {
				name: "字符数",
				detail: "指定希望 REPLACE 替换的字符数。"
			},
			newText: {
				name: "替换文本",
				detail: "将替换旧文本中字符的文本。"
			}
		}
	},
	REPLACEB: {
		description: "替换文本中的字符",
		abstract: "替换文本中的字符",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/replace-function"
		}],
		functionParameter: {
			oldText: {
				name: "旧文本",
				detail: "要替换其部分字符的文本。"
			},
			startNum: {
				name: "开始位置",
				detail: "文本中要替换的第一个字符的位置。"
			},
			numBytes: {
				name: "字节数",
				detail: "按字节指定要由 REPLACEB 替换的字符的数量。"
			},
			newText: {
				name: "替换文本",
				detail: "将替换旧文本中字符的文本。"
			}
		}
	},
	REPT: {
		description: "按给定次数重复文本",
		abstract: "按给定次数重复文本",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/rept-function"
		}],
		functionParameter: {
			text: {
				name: "文本",
				detail: "需要重复显示的文本。"
			},
			numberTimes: {
				name: "重复次数",
				detail: "用于指定文本重复次数的正数。"
			}
		}
	},
	RIGHT: {
		description: "返回文本值中最右边的字符",
		abstract: "返回文本值中最右边的字符",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/right-function"
		}],
		functionParameter: {
			text: {
				name: "文本",
				detail: "包含要提取字符的文本字符串。"
			},
			numChars: {
				name: "字符数",
				detail: "指定希望 RIGHT 提取的字符数。"
			}
		}
	},
	RIGHTB: {
		description: "返回文本值中最右边的字符",
		abstract: "返回文本值中最右边的字符",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/right-function"
		}],
		functionParameter: {
			text: {
				name: "文本",
				detail: "包含要提取字符的文本字符串。"
			},
			numBytes: {
				name: "字节数",
				detail: "按字节指定要由 RIGHTB 提取的字符的数量。"
			}
		}
	},
	SEARCH: {
		description: "在一个文本值中查找另一个文本值（不区分大小写）",
		abstract: "在一个文本值中查找另一个文本值（不区分大小写）",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/search-function"
		}],
		functionParameter: {
			findText: {
				name: "搜索字符串",
				detail: "要在“要搜索的文本”中查找的字符串。"
			},
			withinText: {
				name: "要搜索的文本",
				detail: "要搜索“搜索字符串”的首次出现的文本。"
			},
			startNum: {
				name: "开始位置",
				detail: "要在“要搜索的文本”中开始搜索的字符位置。如果省略则假定其值为 1。"
			}
		}
	},
	SEARCHB: {
		description: "在一个文本值中查找另一个文本值（不区分大小写）",
		abstract: "在一个文本值中查找另一个文本值（不区分大小写）",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/search-function"
		}],
		functionParameter: {
			findText: {
				name: "搜索字符串",
				detail: "要在“要搜索的文本”中查找的字符串。"
			},
			withinText: {
				name: "要搜索的文本",
				detail: "要搜索“搜索字符串”的首次出现的文本。"
			},
			startNum: {
				name: "开始位置",
				detail: "要在“要搜索的文本”中开始搜索的字符位置。如果省略则假定其值为 1。"
			}
		}
	},
	SUBSTITUTE: {
		description: "在文本字符串中用新文本替换旧文本",
		abstract: "在文本字符串中用新文本替换旧文本",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/substitute-function"
		}],
		functionParameter: {
			text: {
				name: "文本",
				detail: "需要替换其中字符的文本，或对含有文本（需要替换其中字符）的单元格的引用。"
			},
			oldText: {
				name: "搜索文本",
				detail: "需要替换的文本。"
			},
			newText: {
				name: "替换文本",
				detail: "用于替换 old_text 的文本。"
			},
			instanceNum: {
				name: "指定替换对象",
				detail: "指定要将第几个 old_text 替换为 new_text。 如果指定了 instance_num，则只有满足要求的 old_text 被替换。 否则，文本中出现的所有 old_text 都会更改为 new_text。"
			}
		}
	},
	T: {
		description: "将参数转换为文本",
		abstract: "将参数转换为文本",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/t-function"
		}],
		functionParameter: { value: {
			name: "值",
			detail: "要测试的值。"
		} }
	},
	TEXT: {
		description: "设置数字格式并将其转换为文本",
		abstract: "设置数字格式并将其转换为文本",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/text-function"
		}],
		functionParameter: {
			value: {
				name: "值",
				detail: "要转换为文本的数值。"
			},
			formatText: {
				name: "数字格式",
				detail: "一个文本字符串，定义要应用于所提供值的格式。"
			}
		}
	},
	TEXTAFTER: {
		description: "返回给定字符或字符串之后出现的文本",
		abstract: "返回给定字符或字符串之后出现的文本",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/textafter-function"
		}],
		functionParameter: {
			text: {
				name: "文本",
				detail: "你要在其中搜索的文本。不允许使用通配符。"
			},
			delimiter: {
				name: "分隔符",
				detail: "标记要在其中提取的点的文本。"
			},
			instanceNum: {
				name: "实例编号",
				detail: "要在其中提取文本的分隔符的实例。"
			},
			matchMode: {
				name: "匹配模式",
				detail: "确定文本搜索是否区分大小写。 默认为区分大小写。"
			},
			matchEnd: {
				name: "末尾匹配",
				detail: "将文本结尾视为分隔符。默认情况下，文本完全匹配。"
			},
			ifNotFound: {
				name: "未匹配到的值",
				detail: "未找到匹配项时返回的值。默认情况下，返回 #N/A。"
			}
		}
	},
	TEXTBEFORE: {
		description: "返回出现在给定字符或字符串之前的文本",
		abstract: "返回出现在给定字符或字符串之前的文本",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/textbefore-function"
		}],
		functionParameter: {
			text: {
				name: "文本",
				detail: "你要在其中搜索的文本。不允许使用通配符。"
			},
			delimiter: {
				name: "分隔符",
				detail: "标记要在其中提取的点的文本。"
			},
			instanceNum: {
				name: "实例编号",
				detail: "要在其中提取文本的分隔符的实例。"
			},
			matchMode: {
				name: "匹配模式",
				detail: "确定文本搜索是否区分大小写。 默认为区分大小写。"
			},
			matchEnd: {
				name: "末尾匹配",
				detail: "将文本结尾视为分隔符。默认情况下，文本完全匹配。"
			},
			ifNotFound: {
				name: "未匹配到的值",
				detail: "未找到匹配项时返回的值。默认情况下，返回 #N/A。"
			}
		}
	},
	TEXTJOIN: {
		description: "合并来自多个区域和/或字符串的文本",
		abstract: "合并来自多个区域和/或字符串的文本",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/textjoin-function"
		}],
		functionParameter: {
			delimiter: {
				name: "分隔符",
				detail: "文本字符串，或者为空，或用双引号引起来的一个或多个字符，或对有效文本字符串的引用。"
			},
			ignoreEmpty: {
				name: "忽略空白",
				detail: "如果为 TRUE，则忽略空白单元格。"
			},
			text1: {
				name: "文本1",
				detail: "要联接的文本项。 文本字符串或字符串数组，如单元格区域中。"
			},
			text2: {
				name: "文本2",
				detail: "要联接的其他文本项。 文本项最多可以包含 252 个文本参数 text1。 每个参数可以是一个文本字符串或字符串数组，如单元格区域。"
			}
		}
	},
	TEXTSPLIT: {
		description: "使用列分隔符和行分隔符拆分文本字符串",
		abstract: "使用列分隔符和行分隔符拆分文本字符串",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/textsplit-function"
		}],
		functionParameter: {
			text: {
				name: "文本",
				detail: "要拆分的文本。"
			},
			colDelimiter: {
				name: "列分隔符",
				detail: "要拆分列依据的字符或字符串。"
			},
			rowDelimiter: {
				name: "行分隔符",
				detail: "要拆分行依据的字符或字符串。"
			},
			ignoreEmpty: {
				name: "忽略空单元格",
				detail: "是否忽略空单元格。默认为 FALSE。"
			},
			matchMode: {
				name: "匹配模式",
				detail: "搜索文本中的分隔符匹配。默认情况下，会进行区分大小写的匹配。"
			},
			padWith: {
				name: "填充值",
				detail: "用于填充的值。默认情况下，使用 #N/A。"
			}
		}
	},
	TRIM: {
		description: "除了单词之间的单个空格之外，删除文本中的所有空格。",
		abstract: "删除文本中的空格",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/trim-function"
		}],
		functionParameter: { text: {
			name: "文本",
			detail: "要从中删除空格的文本。"
		} }
	},
	UNICHAR: {
		description: "返回给定数值引用的 Unicode 字符",
		abstract: "返回给定数值引用的 Unicode 字符",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/unichar-function"
		}],
		functionParameter: { number: {
			name: "数值",
			detail: "是表示字符的 Unicode 编号。"
		} }
	},
	UNICODE: {
		description: "返回对应于文本的第一个字符的数字（代码点）",
		abstract: "返回对应于文本的第一个字符的数字（代码点）",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/unicode-function"
		}],
		functionParameter: { text: {
			name: "文本",
			detail: "是需要 Unicode 值的字符。"
		} }
	},
	UPPER: {
		description: "将文本转换为大写形式",
		abstract: "将文本转换为大写形式",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/upper-function"
		}],
		functionParameter: { text: {
			name: "文本",
			detail: "要转换为大写字母的文本。"
		} }
	},
	VALUE: {
		description: "将文本参数转换为数字",
		abstract: "将文本参数转换为数字",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/value-function"
		}],
		functionParameter: { text: {
			name: "文本",
			detail: "用引号括起来的文本或包含要转换文本的单元格的引用。"
		} }
	},
	VALUETOTEXT: {
		description: "从任意指定值返回文本",
		abstract: "从任意指定值返回文本",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/valuetotext-function"
		}],
		functionParameter: {
			value: {
				name: "值",
				detail: "以文本形式返回的值。"
			},
			format: {
				name: "数据格式",
				detail: "返回的数据的格式。它可以是两个值之一：\n0 默认。 易于阅读的简明格式。\n1 包含转义字符和行定界符的严格格式。 生成一条可在输入编辑栏时被解析的字符串。 将返回的字符串（布尔值、数字和错误除外）封装在引号中。"
			}
		}
	},
	CALL: {
		description: "调用动态链接库或代码源中的过程",
		abstract: "调用动态链接库或代码源中的过程",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/call-function"
		}],
		functionParameter: {
			moduleText: {
				name: "模块文本",
				detail: "包含过程的动态链接库 (DLL) 名称。"
			},
			procedure: {
				name: "过程",
				detail: "DLL 中的过程名称或序号。"
			},
			typeText: {
				name: "类型文本",
				detail: "指定参数和返回值数据类型的文本。"
			},
			argument1: {
				name: "参数 1",
				detail: "可选。传递给过程的第一个参数。"
			}
		}
	},
	EUROCONVERT: {
		description: "用于将数字转换为欧元形式，将数字由欧元形式转换为欧元成员国货币形式，或利用欧元作为中间货币将数字由某一欧元成员国货币转化为另一欧元成员国货币形式（三角转换关系）",
		abstract: "用于将数字转换为欧元形式，将数字由欧元形式转换为欧元成员国货币形式，或利用欧元作为中间货币将数字由某一欧元成员国货币转化为另一欧元成员国货币形式（三角转换关系）",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/euroconvert-function"
		}],
		functionParameter: {
			number: {
				name: "数字",
				detail: "要换算的货币值。"
			},
			source: {
				name: "源货币",
				detail: "源货币代码。"
			},
			target: {
				name: "目标货币",
				detail: "目标货币代码。"
			},
			fullPrecision: {
				name: "完整精度",
				detail: "控制是否按货币特定规则舍入的逻辑值。"
			},
			triangulationPrecision: {
				name: "三角换算精度",
				detail: "可选。通过欧元进行中间换算时使用的有效位数。"
			}
		}
	},
	REGISTER_ID: {
		description: "返回已注册过的指定动态链接库 (DLL) 或代码源的注册号",
		abstract: "返回已注册过的指定动态链接库 (DLL) 或代码源的注册号",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/register-id-function"
		}],
		functionParameter: {
			moduleText: {
				name: "模块文本",
				detail: "包含过程的 DLL 或代码资源名称。"
			},
			procedure: {
				name: "过程",
				detail: "过程名称或序号。"
			},
			typeText: {
				name: "类型文本",
				detail: "可选。指定参数和返回值数据类型的文本。"
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/univer/zh-CN.ts
const locale$2 = {};

//#endregion
//#region src/locale/function-list/web/zh-CN.ts
const locale$1 = {
	ENCODEURL: {
		description: "ENCODEURL 函数返回 URL 编码的字符串，将某些非字母数字字符替换为百分比符号 (%) 和十六进制数字。",
		abstract: "ENCODEURL 函数返回 URL 编码的字符串，将某些非字母数字字符替换为百分比符号 (%) 和十六进制数字。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/encodeurl-function"
		}],
		functionParameter: { text: {
			name: "文本",
			detail: "要进行 URL 编码的字符串"
		} }
	},
	FILTERXML: {
		description: "FILTERXML 函数使用指定的 xpath 从 XML 内容返回特定数据。",
		abstract: "FILTERXML 函数使用指定的 xpath 从 XML 内容返回特定数据。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/filterxml-function"
		}],
		functionParameter: {
			xml: {
				name: "xml",
				detail: "有效 XML 格式的字符串。"
			},
			xpath: {
				name: "xpath",
				detail: "采用标准 XPath 格式的字符串。"
			}
		}
	},
	WEBSERVICE: {
		description: "WEBSERVICE 函数从 Internet 或 Intranet 上的 Web 服务返回数据。",
		abstract: "WEBSERVICE 函数从 Internet 或 Intranet 上的 Web 服务返回数据。",
		links: [{
			title: "教学",
			url: "https://support.microsoft.com/zh-cn/excel/functions/webservice-function"
		}],
		functionParameter: { url: {
			name: "url",
			detail: "Web 服务的 URL。"
		} }
	}
};

//#endregion
//#region src/locale/zh-CN.ts
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