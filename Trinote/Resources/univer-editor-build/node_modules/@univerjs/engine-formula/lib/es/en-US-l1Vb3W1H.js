//#region src/locale/function-list/array/en-US.ts
/**
* Copyright 2023-present DreamNum Co., Ltd.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const locale$14 = {
	ARRAY_CONSTRAIN: {
		description: "Constrains an array result to a specified size.",
		abstract: "Constrains an array result to a specified size.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3267036?hl=en"
		}],
		functionParameter: {
			inputRange: {
				name: "input_range",
				detail: "The range to constrain."
			},
			numRows: {
				name: "num_rows",
				detail: "The number of rows the result should contain."
			},
			numCols: {
				name: "num_cols",
				detail: "The number of columns the result should contain"
			}
		}
	},
	FLATTEN: {
		description: "Flattens all the values from one or more ranges into a single column.",
		abstract: "Flattens all the values from one or more ranges into a single column.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/10307761?hl=en"
		}],
		functionParameter: {
			range1: {
				name: "range1",
				detail: "The first range to flatten."
			},
			range2: {
				name: "range2",
				detail: "[optional] repeatable Additional ranges to flatten."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/compatibility/en-US.ts
/**
* Copyright 2023-present DreamNum Co., Ltd.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const locale$13 = {
	BETADIST: {
		description: "Returns the cumulative beta probability density function. The beta distribution is commonly used to study variation in the percentage of something across samples, such as the fraction of the day people spend watching television.",
		abstract: "Returns the cumulative beta probability density function. The beta distribution is commonly used to study variation in the percentage of something across samples, such as the fraction of the day people spend watching television.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/betadist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Required. The value between A and B at which to evaluate the function."
			},
			alpha: {
				name: "alpha",
				detail: "Required. A parameter of the distribution."
			},
			beta: {
				name: "beta",
				detail: "Required. A parameter of the distribution."
			},
			A: {
				name: "A",
				detail: "Optional. A lower bound to the interval of x."
			},
			B: {
				name: "B",
				detail: "Optional. An upper bound to the interval of x."
			}
		}
	},
	BETAINV: {
		description: "Returns the inverse of the cumulative beta probability density function for a specified beta distribution. That is, if probability = BETADIST(x,...), then BETAINV(probability,...) = x. The beta distribution can be used in project planning to model probable completion times given an expected completion time and variability.",
		abstract: "Returns the inverse of the cumulative beta probability density function for a specified beta distribution. That is, if probability = BETADIST(x,...), then BETAINV(probability,...) = x. The beta distribution can be used in project planning to model probable completion times given an expected completion time and variability.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/betainv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Required. A probability associated with the beta distribution."
			},
			alpha: {
				name: "alpha",
				detail: "Required. A parameter of the distribution."
			},
			beta: {
				name: "beta",
				detail: "Required. A parameter the distribution."
			},
			A: {
				name: "A",
				detail: "Optional. A lower bound to the interval of x."
			},
			B: {
				name: "B",
				detail: "Optional. An upper bound to the interval of x."
			}
		}
	},
	BINOMDIST: {
		description: "Returns the individual term binomial distribution probability. Use BINOMDIST in problems with a fixed number of tests or trials, when the outcomes of any trial are only success or failure, when trials are independent, and when the probability of success is constant throughout the experiment. For example, BINOMDIST can calculate the probability that two of the next three babies born are male.",
		abstract: "Returns the individual term binomial distribution probability. Use BINOMDIST in problems with a fixed number of tests or trials, when the outcomes of any trial are only success or failure, when trials are independent, and when the probability of success is constant throughout the experiment. For example, BINOMDIST can calculate the probability that two of the next three babies born are male.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/binomdist-function"
		}],
		functionParameter: {
			numberS: {
				name: "number_s",
				detail: "Required. The number of successes in trials."
			},
			trials: {
				name: "trials",
				detail: "Required. The number of independent trials."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Required. The probability of success on each trial."
			},
			cumulative: {
				name: "cumulative",
				detail: "Required. A logical value that determines the form of the function. If cumulative is TRUE, then BINOMDIST returns the cumulative distribution function, which is the probability that there are at most number_s successes; if FALSE, it returns the probability mass function, which is the probability that there are number_s successes."
			}
		}
	},
	CHIDIST: {
		description: "Returns the right-tailed probability of the chi-squared distribution. The χ2 distribution is associated with a χ2 test. Use the χ2 test to compare observed and expected values. For example, a genetic experiment might hypothesize that the next generation of plants will exhibit a certain set of colors. By comparing the observed results with the expected ones, you can decide whether your original hypothesis is valid.",
		abstract: "Returns the right-tailed probability of the chi-squared distribution. The χ2 distribution is associated with a χ2 test. Use the χ2 test to compare observed and expected values. For example, a genetic experiment might hypothesize that the next generation of plants will exhibit a certain set of colors. By comparing the observed results with the expected ones, you can decide whether your original hypothesis is valid.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/chidist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Required. The value at which you want to evaluate the distribution."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Required. The number of degrees of freedom."
			}
		}
	},
	CHIINV: {
		description: "Returns the inverse of the right-tailed probability of the chi-squared distribution. If probability = CHIDIST(x,...), then CHIINV(probability,...) = x. Use this function to compare observed results with expected ones in order to decide whether your original hypothesis is valid.",
		abstract: "Returns the inverse of the right-tailed probability of the chi-squared distribution. If probability = CHIDIST(x,...), then CHIINV(probability,...) = x. Use this function to compare observed results with expected ones in order to decide whether your original hypothesis is valid.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/chiinv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Required. A probability associated with the chi-squared distribution."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Required. The number of degrees of freedom."
			}
		}
	},
	CHITEST: {
		description: "Returns the test for independence. CHITEST returns the value from the chi-squared (χ2) distribution for the statistic and the appropriate degrees of freedom. You can use χ2 tests to determine whether hypothesized results are verified by an experiment.",
		abstract: "Returns the test for independence. CHITEST returns the value from the chi-squared (χ2) distribution for the statistic and the appropriate degrees of freedom. You can use χ2 tests to determine whether hypothesized results are verified by an experiment.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/chitest-function"
		}],
		functionParameter: {
			actualRange: {
				name: "actual_range",
				detail: "Required. The range of data that contains observations to test against expected values."
			},
			expectedRange: {
				name: "expected_range",
				detail: "Required. The range of data that contains the ratio of the product of row totals and column totals to the grand total."
			}
		}
	},
	CONFIDENCE: {
		description: "Returns the confidence interval for a population mean, using a normal distribution.",
		abstract: "Returns the confidence interval for a population mean, using a normal distribution.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/confidence-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "Required. The significance level used to compute the confidence level. The confidence level equals 100*(1 - alpha)%, or in other words, an alpha of 0.05 indicates a 95 percent confidence level."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Required. The population standard deviation for the data range and is assumed to be known."
			},
			size: {
				name: "size",
				detail: "Required. The sample size."
			}
		}
	},
	COVAR: {
		description: "Returns covariance, the average of the products of deviations for each data point pair in two data sets.",
		abstract: "Returns covariance, the average of the products of deviations for each data point pair in two data sets.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/covar-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Required. The first cell range of integers."
			},
			array2: {
				name: "array2",
				detail: "Required. The second cell range of integers."
			}
		}
	},
	CRITBINOM: {
		description: "Returns the smallest value for which the cumulative binomial distribution is greater than or equal to a criterion value. Use this function for quality assurance applications. For example, use CRITBINOM to determine the greatest number of defective parts that are allowed to come off an assembly line run without rejecting the entire lot.",
		abstract: "Returns the smallest value for which the cumulative binomial distribution is greater than or equal to a criterion value. Use this function for quality assurance applications. For example, use CRITBINOM to determine the greatest number of defective parts that are allowed to come off an assembly line run without rejecting the entire lot.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/critbinom-function"
		}],
		functionParameter: {
			trials: {
				name: "trials",
				detail: "Required. The number of Bernoulli trials."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Required. The probability of a success on each trial."
			},
			alpha: {
				name: "alpha",
				detail: "Required. The criterion value."
			}
		}
	},
	EXPONDIST: {
		description: "Returns the exponential distribution. Use EXPONDIST to model the time between events, such as how long an automated bank teller takes to deliver cash. For example, you can use EXPONDIST to determine the probability that the process takes at most 1 minute.",
		abstract: "Returns the exponential distribution. Use EXPONDIST to model the time between events, such as how long an automated bank teller takes to deliver cash. For example, you can use EXPONDIST to determine the probability that the process takes at most 1 minute.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/expondist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Required. The value of the function."
			},
			lambda: {
				name: "lambda",
				detail: "Required. The parameter value."
			},
			cumulative: {
				name: "cumulative",
				detail: "Required. A logical value that indicates which form of the exponential function to provide. If cumulative is TRUE, EXPONDIST returns the cumulative distribution function; if FALSE, it returns the probability density function."
			}
		}
	},
	FDIST: {
		description: "Returns the (right-tailed) F probability distribution (degree of diversity) for two data sets. You can use this function to determine whether two data sets have different degrees of diversity. For example, you can examine the test scores of men and women entering high school and determine if the variability in the females is different from that found in the males.",
		abstract: "Returns the (right-tailed) F probability distribution (degree of diversity) for two data sets. You can use this function to determine whether two data sets have different degrees of diversity. For example, you can examine the test scores of men and women entering high school and determine if the variability in the females is different from that found in the males.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/fdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Required. The value at which to evaluate the function."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Required. The numerator degrees of freedom."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Required. The denominator degrees of freedom."
			}
		}
	},
	FINV: {
		description: "Returns the inverse of the (right-tailed) F probability distribution. If p = FDIST(x,...), then FINV(p,...) = x.",
		abstract: "Returns the inverse of the (right-tailed) F probability distribution. If p = FDIST(x,...), then FINV(p,...) = x.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/finv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Required. A probability associated with the F cumulative distribution."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Required. The numerator degrees of freedom."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Required. The denominator degrees of freedom."
			}
		}
	},
	FTEST: {
		description: "Returns the result of an F-test. An F-test returns the two-tailed probability that the variances in array1 and array2 are not significantly different. Use this function to determine whether two samples have different variances. For example, given test scores from public and private schools, you can test whether these schools have different levels of test score diversity.",
		abstract: "Returns the result of an F-test. An F-test returns the two-tailed probability that the variances in array1 and array2 are not significantly different. Use this function to determine whether two samples have different variances. For example, given test scores from public and private schools, you can test whether these schools have different levels of test score diversity.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/ftest-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Required. The first array or range of data."
			},
			array2: {
				name: "array2",
				detail: "Required. The second array or range of data."
			}
		}
	},
	GAMMADIST: {
		description: "Returns the gamma distribution. You can use this function to study variables that may have a skewed distribution. The gamma distribution is commonly used in queuing analysis.",
		abstract: "Returns the gamma distribution. You can use this function to study variables that may have a skewed distribution. The gamma distribution is commonly used in queuing analysis.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/gammadist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Required. The value at which you want to evaluate the distribution."
			},
			alpha: {
				name: "alpha",
				detail: "Required. A parameter to the distribution."
			},
			beta: {
				name: "beta",
				detail: "Required. A parameter to the distribution. If beta = 1, GAMMADIST returns the standard gamma distribution."
			},
			cumulative: {
				name: "cumulative",
				detail: "Required. A logical value that determines the form of the function. If cumulative is TRUE, GAMMADIST returns the cumulative distribution function; if FALSE, it returns the probability density function."
			}
		}
	},
	GAMMAINV: {
		description: "Returns the inverse of the gamma cumulative distribution. If p = GAMMADIST(x,...), then GAMMAINV(p,...) = x. You can use this function to study a variable whose distribution may be skewed.",
		abstract: "Returns the inverse of the gamma cumulative distribution. If p = GAMMADIST(x,...), then GAMMAINV(p,...) = x. You can use this function to study a variable whose distribution may be skewed.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/gammainv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Required. The probability associated with the gamma distribution."
			},
			alpha: {
				name: "alpha",
				detail: "Required. A parameter to the distribution."
			},
			beta: {
				name: "beta",
				detail: "Required. A parameter to the distribution. If beta = 1, GAMMAINV returns the standard gamma distribution."
			}
		}
	},
	HYPGEOMDIST: {
		description: "Returns the hypergeometric distribution. HYPGEOMDIST returns the probability of a given number of sample successes, given the sample size, population successes, and population size. Use HYPGEOMDIST for problems with a finite population, where each observation is either a success or a failure, and where each subset of a given size is chosen with equal likelihood.",
		abstract: "Returns the hypergeometric distribution. HYPGEOMDIST returns the probability of a given number of sample successes, given the sample size, population successes, and population size. Use HYPGEOMDIST for problems with a finite population, where each observation is either a success or a failure, and where each subset of a given size is chosen with equal likelihood.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/hypgeomdist-function"
		}],
		functionParameter: {
			sampleS: {
				name: "sample_s",
				detail: "Required. The number of successes in the sample."
			},
			numberSample: {
				name: "number_sample",
				detail: "Required. The size of the sample."
			},
			populationS: {
				name: "population_s",
				detail: "Required. The number of successes in the population."
			},
			numberPop: {
				name: "number_pop",
				detail: "Required. The population size."
			}
		}
	},
	LOGINV: {
		description: "Returns the inverse of the lognormal cumulative distribution function of x, where ln(x) is normally distributed with parameters mean and standard_dev. If p = LOGNORMDIST(x,...) then LOGINV(p,...) = x.",
		abstract: "Returns the inverse of the lognormal cumulative distribution function of x, where ln(x) is normally distributed with parameters mean and standard_dev. If p = LOGNORMDIST(x,...) then LOGINV(p,...) = x.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/loginv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Required. A probability associated with the lognormal distribution."
			},
			mean: {
				name: "mean",
				detail: "Required. The mean of ln(x)."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Required. The standard deviation of ln(x)."
			}
		}
	},
	LOGNORMDIST: {
		description: "Returns the cumulative lognormal distribution of x, where ln(x) is normally distributed with parameters mean and standard_dev. Use this function to analyze data that has been logarithmically transformed.",
		abstract: "Returns the cumulative lognormal distribution of x, where ln(x) is normally distributed with parameters mean and standard_dev. Use this function to analyze data that has been logarithmically transformed.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/lognormdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Required. The value at which to evaluate the function."
			},
			mean: {
				name: "mean",
				detail: "Required. The mean of ln(x)."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Required. The standard deviation of ln(x)."
			}
		}
	},
	MODE: {
		description: "Let's say you want to find out the most common number of bird species sighted in a sample of bird counts at a critical wetland over a 30-year time period, or you want to find out the most frequently occurring number of phone calls at a telephone support center during off-peak hours. To calculate the mode of a group of numbers, use the MODE function.",
		abstract: "Let's say you want to find out the most common number of bird species sighted in a sample of bird counts at a critical wetland over a 30-year time period, or you want to find out the most frequently occurring number of phone calls at a telephone support center during off-peak hours. To calculate the mode of a group of numbers, use the MODE function.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/mode-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Required. The first number argument for which you want to calculate the mode."
			},
			number2: {
				name: "number2",
				detail: "Optional. Number arguments 2 to 255 for which you want to calculate the mode. You can also use a single array or a reference to an array instead of arguments separated by commas."
			}
		}
	},
	NEGBINOMDIST: {
		description: "Returns the negative binomial distribution. NEGBINOMDIST returns the probability that there will be number_f failures before the number_s-th success, when the constant probability of a success is probability_s. This function is similar to the binomial distribution, except that the number of successes is fixed, and the number of trials is variable. Like the binomial, trials are assumed to be independent.",
		abstract: "Returns the negative binomial distribution. NEGBINOMDIST returns the probability that there will be number_f failures before the number_s-th success, when the constant probability of a success is probability_s. This function is similar to the binomial distribution, except that the number of successes is fixed, and the number of trials is variable. Like the binomial, trials are assumed to be independent.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/negbinomdist-function"
		}],
		functionParameter: {
			numberF: {
				name: "number_f",
				detail: "Required. The number of failures."
			},
			numberS: {
				name: "number_s",
				detail: "Required. The threshold number of successes."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Required. The probability of a success."
			}
		}
	},
	NORMDIST: {
		description: "The NORMDIST function returns the normal distribution for the specified mean and standard deviation. This function has a wide range of applications in statistics, including hypothesis testing.",
		abstract: "The NORMDIST function returns the normal distribution for the specified mean and standard deviation. This function has a wide range of applications in statistics, including hypothesis testing.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/normdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Required. The value for which you want the distribution"
			},
			mean: {
				name: "mean",
				detail: "Required. The arithmetic mean of the distribution"
			},
			standardDev: {
				name: "standard_dev",
				detail: "Required. The standard deviation of the distribution"
			},
			cumulative: {
				name: "cumulative",
				detail: "Required. A logical value that determines the form of the function. If cumulative is TRUE, NORMDIST returns the cumulative distribution function; if cumulative is FALSE, it returns the probability mass function."
			}
		}
	},
	NORMINV: {
		description: "Returns the inverse of the normal cumulative distribution for the specified mean and standard deviation.",
		abstract: "Returns the inverse of the normal cumulative distribution for the specified mean and standard deviation.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/norminv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Required. A probability corresponding to the normal distribution."
			},
			mean: {
				name: "mean",
				detail: "Required. The arithmetic mean of the distribution."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Required. The standard deviation of the distribution."
			}
		}
	},
	NORMSDIST: {
		description: "Returns the standard normal cumulative distribution function. The distribution has a mean of 0 (zero) and a standard deviation of one. Use this function in place of a table of standard normal curve areas.",
		abstract: "Returns the standard normal cumulative distribution function. The distribution has a mean of 0 (zero) and a standard deviation of one. Use this function in place of a table of standard normal curve areas.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/normsdist-function"
		}],
		functionParameter: { z: {
			name: "z",
			detail: "Required. The value for which you want the distribution."
		} }
	},
	NORMSINV: {
		description: "Returns the inverse of the standard normal cumulative distribution. The distribution has a mean of zero and a standard deviation of one.",
		abstract: "Returns the inverse of the standard normal cumulative distribution. The distribution has a mean of zero and a standard deviation of one.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/normsinv-function"
		}],
		functionParameter: { probability: {
			name: "probability",
			detail: "Required. A probability corresponding to the normal distribution."
		} }
	},
	PERCENTILE: {
		description: "Returns the k-th percentile of values in a range. You can use this function to establish a threshold of acceptance. For example, you can decide to examine candidates who score above the 90th percentile.",
		abstract: "Returns the k-th percentile of values in a range. You can use this function to establish a threshold of acceptance. For example, you can decide to examine candidates who score above the 90th percentile.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/percentile-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Required. The array or range of data that defines relative standing."
			},
			k: {
				name: "k",
				detail: "Required. The percentile value in the range 0..1, inclusive."
			}
		}
	},
	PERCENTRANK: {
		description: "The PERCENTRANK function returns the rank of a value in a dataset as a percentage of the dataset -- essentially, the relative standing of a value within the whole dataset. For example, you could use PERCENTRANK to determine the standing of an individual's test score among the field of all scores for the same test.",
		abstract: "The PERCENTRANK function returns the rank of a value in a dataset as a percentage of the dataset -- essentially, the relative standing of a value within the whole dataset. For example, you could use PERCENTRANK to determine the standing of an individual's test score among the field of all scores for the same test.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/percentrank-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Required. The range of data (or pre-defined array) of numeric values within which percent rank is determined."
			},
			x: {
				name: "x",
				detail: "Required. The value for which you want to know the rank within the array."
			},
			significance: {
				name: "significance",
				detail: "Optional. A value that identifies the number of significant digits for the returned percentage value. If omitted, PERCENTRANK uses three digits (0.xxx)."
			}
		}
	},
	POISSON: {
		description: "Returns the Poisson distribution. A common application of the Poisson distribution is predicting the number of events over a specific time, such as the number of cars arriving at a toll plaza in 1 minute.",
		abstract: "Returns the Poisson distribution. A common application of the Poisson distribution is predicting the number of events over a specific time, such as the number of cars arriving at a toll plaza in 1 minute.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/poisson-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Required. The number of events."
			},
			mean: {
				name: "mean",
				detail: "Required. The expected numeric value."
			},
			cumulative: {
				name: "cumulative",
				detail: "Required. A logical value that determines the form of the probability distribution returned. If cumulative is TRUE, POISSON returns the cumulative Poisson probability that the number of random events occurring will be between zero and x inclusive; if FALSE, it returns the Poisson probability mass function that the number of events occurring will be exactly x."
			}
		}
	},
	QUARTILE: {
		description: "Returns the quartile of a data set. Quartiles often are used in sales and survey data to divide populations into groups. For example, you can use QUARTILE to find the top 25 percent of incomes in a population.",
		abstract: "Returns the quartile of a data set. Quartiles often are used in sales and survey data to divide populations into groups. For example, you can use QUARTILE to find the top 25 percent of incomes in a population.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/quartile-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Required. The array or cell range of numeric values for which you want the quartile value."
			},
			quart: {
				name: "quart",
				detail: "Required. Indicates which value to return."
			}
		}
	},
	RANK: {
		description: "Returns the rank of a number in a list of numbers. The rank of a number is its size relative to other values in a list. (If you were to sort the list, the rank of the number would be its position.)",
		abstract: "Returns the rank of a number in a list of numbers. The rank of a number is its size relative to other values in a list. (If you were to sort the list, the rank of the number would be its position.)",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/rank-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Required. The number whose rank you want to find."
			},
			ref: {
				name: "ref",
				detail: "Required. A reference to a list of numbers. Nonnumeric values in ref are ignored."
			},
			order: {
				name: "order",
				detail: "Optional. A number specifying how to rank number. If order is 0 (zero) or omitted, Microsoft Excel ranks number as if ref were a list sorted in descending order. If order is any nonzero value, Microsoft Excel ranks number as if ref were a list sorted in ascending order."
			}
		}
	},
	STDEV: {
		description: "Estimates standard deviation based on a sample. The standard deviation is a measure of how widely values are dispersed from the average value (the mean).",
		abstract: "Estimates standard deviation based on a sample. The standard deviation is a measure of how widely values are dispersed from the average value (the mean).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/stdev-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Required. The first number argument corresponding to a sample of a population."
			},
			number2: {
				name: "number2",
				detail: "Optional. Number arguments 2 to 255 corresponding to a sample of a population. You can also use a single array or a reference to an array instead of arguments separated by commas."
			}
		}
	},
	STDEVP: {
		description: "Calculates standard deviation based on the entire population given as arguments. The standard deviation is a measure of how widely values are dispersed from the average value (the mean).",
		abstract: "Calculates standard deviation based on the entire population given as arguments. The standard deviation is a measure of how widely values are dispersed from the average value (the mean).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/stdevp-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Required. The first number argument corresponding to a population."
			},
			number2: {
				name: "number2",
				detail: "Optional. Number arguments 2 to 255 corresponding to a population. You can also use a single array or a reference to an array instead of arguments separated by commas."
			}
		}
	},
	TDIST: {
		description: "Returns the Percentage Points (probability) for the Student t-distribution where a numeric value (x) is a calculated value of t for which the Percentage Points are to be computed. The t-distribution is used in the hypothesis testing of small sample data sets. Use this function in place of a table of critical values for the t-distribution.",
		abstract: "Returns the Percentage Points (probability) for the Student t-distribution where a numeric value (x) is a calculated value of t for which the Percentage Points are to be computed. The t-distribution is used in the hypothesis testing of small sample data sets. Use this function in place of a table of critical values for the t-distribution.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/tdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Required. The numeric value at which to evaluate the distribution."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Required. An integer indicating the number of degrees of freedom."
			},
			tails: {
				name: "tails",
				detail: "Required. Specifies the number of distribution tails to return. If Tails = 1, TDIST returns the one-tailed distribution. If Tails = 2, TDIST returns the two-tailed distribution."
			}
		}
	},
	TINV: {
		description: "Returns the two-tailed inverse of the Student's t-distribution.",
		abstract: "Returns the two-tailed inverse of the Student's t-distribution.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/tinv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Required. The probability associated with the two-tailed Student's t-distribution."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Required. The number of degrees of freedom with which to characterize the distribution."
			}
		}
	},
	TTEST: {
		description: "Returns the probability associated with a Student's t-Test. Use TTEST to determine whether two samples are likely to have come from the same two underlying populations that have the same mean.",
		abstract: "Returns the probability associated with a Student's t-Test. Use TTEST to determine whether two samples are likely to have come from the same two underlying populations that have the same mean.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/ttest-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Required. The first data set."
			},
			array2: {
				name: "array2",
				detail: "Required. The second data set."
			},
			tails: {
				name: "tails",
				detail: "Required. Specifies the number of distribution tails. If tails = 1, TTEST uses the one-tailed distribution. If tails = 2, TTEST uses the two-tailed distribution."
			},
			type: {
				name: "type",
				detail: "Required. The kind of t-Test to perform."
			}
		}
	},
	VAR: {
		description: "Estimates variance based on a sample.",
		abstract: "Estimates variance based on a sample.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/var-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Required. The first number argument corresponding to a sample of a population."
			},
			number2: {
				name: "number2",
				detail: "Optional. Number arguments 2 to 255 corresponding to a sample of a population."
			}
		}
	},
	VARP: {
		description: "Calculates variance based on the entire population.",
		abstract: "Calculates variance based on the entire population.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/varp-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Required. The first number argument corresponding to a population."
			},
			number2: {
				name: "number2",
				detail: "Optional. Number arguments 2 to 255 corresponding to a population."
			}
		}
	},
	WEIBULL: {
		description: "Returns the Weibull distribution. Use this distribution in reliability analysis, such as calculating a device's mean time to failure.",
		abstract: "Returns the Weibull distribution. Use this distribution in reliability analysis, such as calculating a device's mean time to failure.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/weibull-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Required. The value at which to evaluate the function."
			},
			alpha: {
				name: "alpha",
				detail: "Required. A parameter to the distribution."
			},
			beta: {
				name: "beta",
				detail: "Required. A parameter to the distribution."
			},
			cumulative: {
				name: "cumulative",
				detail: "Required. Determines the form of the function."
			}
		}
	},
	ZTEST: {
		description: "Returns the one-tailed probability-value of a z-test. For a given hypothesized population mean, μ0, ZTEST returns the probability that the sample mean would be greater than the average of observations in the data set (array) — that is, the observed sample mean.",
		abstract: "Returns the one-tailed probability-value of a z-test. For a given hypothesized population mean, μ0, ZTEST returns the probability that the sample mean would be greater than the average of observations in the data set (array) — that is, the observed sample mean.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/ztest-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Required. The array or range of data against which to test x."
			},
			x: {
				name: "x",
				detail: "Required. The value to test."
			},
			sigma: {
				name: "sigma",
				detail: "Optional. The population (known) standard deviation. If omitted, the sample standard deviation is used."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/cube/en-US.ts
/**
* Copyright 2023-present DreamNum Co., Ltd.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const locale$12 = {
	CUBEKPIMEMBER: {
		description: "Returns a key performance indicator (KPI) property and displays the KPI name in the cell. A KPI is a quantifiable measurement, such as monthly gross profit or quarterly employee turnover, that is used to monitor an organization's performance.",
		abstract: "Returns a key performance indicator (KPI) property and displays the KPI name in the cell. A KPI is a quantifiable measurement, such as monthly gross profit or quarterly employee turnover, that is used to monitor an organization's performance.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/cubekpimember-function"
		}],
		functionParameter: {
			connection: {
				name: "Connection",
				detail: "Required. A text string of the name of the connection to the cube."
			},
			kpiName: {
				name: "Kpi_name",
				detail: "Required. A text string of the name of the KPI in the cube."
			},
			kpiProperty: {
				name: "Kpi_property",
				detail: "Required. The KPI component returned and can be one of the following:"
			},
			caption: {
				name: "Caption",
				detail: "Optional. An alternative text string that is displayed in the cell instead of kpi_name and kpi_property."
			}
		}
	},
	CUBEMEMBER: {
		description: "Returns a member or tuple from the cube. Use to validate that the member or tuple exists in the cube.",
		abstract: "Returns a member or tuple from the cube. Use to validate that the member or tuple exists in the cube.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/cubemember-function"
		}],
		functionParameter: {
			connection: {
				name: "Connection",
				detail: "Required. A text string of the name of the connection to the cube."
			},
			memberExpression: {
				name: "Member_expression",
				detail: "Required. A text string of a multidimensional expression (MDX) that evaluates to a unique member in the cube. Alternatively, member_expression can be a tuple, specified as a cell range or an array constant."
			},
			caption: {
				name: "Caption",
				detail: "Optional. A text string displayed in the cell instead of the caption, if one is defined, from the cube. When a tuple is returned, the caption used is the one for the last member in the tuple."
			}
		}
	},
	CUBEMEMBERPROPERTY: {
		description: "The CUBEMEMBERPROPERTY function, one of the Cube functions in Excel, returns the value of a member property from a cube. Use it to validate that a member name exists within the cube, and to return the specified property for this member.",
		abstract: "The CUBEMEMBERPROPERTY function, one of the Cube functions in Excel, returns the value of a member property from a cube. Use it to validate that a member name exists within the cube, and to return the specified property for this member.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/cubememberproperty-function"
		}],
		functionParameter: {
			connection: {
				name: "Connection",
				detail: "Required. A text string of the name of the connection to the cube."
			},
			memberExpression: {
				name: "Member_expression",
				detail: "Required. A text string of a multidimensional expression (MDX) of a member within the cube."
			},
			property: {
				name: "Property",
				detail: "Required. A text string of the name of the property returned or a reference to a cell that contains the name of the property."
			}
		}
	},
	CUBERANKEDMEMBER: {
		description: "Returns the nth, or ranked, member in a set. Use to return one or more elements in a set, such as the top sales performer or the top 10 students.",
		abstract: "Returns the nth, or ranked, member in a set. Use to return one or more elements in a set, such as the top sales performer or the top 10 students.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/cuberankedmember-function"
		}],
		functionParameter: {
			connection: {
				name: "Connection",
				detail: "Required. A text string of the name of the connection to the cube."
			},
			setExpression: {
				name: "Set_expression",
				detail: "Required. A text string of a set expression, such as \"{[Item1].children}\". Set_expression can also be the CUBESET function, or a reference to a cell that contains the CUBESET function."
			},
			rank: {
				name: "Rank",
				detail: "Required. An integer value specifying the top value to return. If rank is a value of 1, it returns the top value, if rank is a value of 2, it returns the second most top value, and so on. To return the top 5 values, use CUBERANKEDMEMBER five times, specifying a different rank, 1 through 5, each time."
			},
			caption: {
				name: "Caption",
				detail: "Optional. A text string displayed in the cell instead of the caption, if one is defined, from the cube."
			}
		}
	},
	CUBESET: {
		description: "Defines a calculated set of members or tuples by sending a set expression to the cube on the server, which creates the set, and then returns that set to Microsoft Excel.",
		abstract: "Defines a calculated set of members or tuples by sending a set expression to the cube on the server, which creates the set, and then returns that set to Microsoft Excel.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/cubeset-function"
		}],
		functionParameter: {
			connection: {
				name: "Connection",
				detail: "Required. A text string of the name of the connection to the cube."
			},
			setExpression: {
				name: "Set_expression",
				detail: "Required. A text string of a set expression that results in a set of members or tuples. Set_expression can also be a cell reference to an Excel range that contains one or more members, tuples, or sets included in the set."
			},
			caption: {
				name: "Caption",
				detail: "Optional. A text string that is displayed in the cell instead of the caption, if one is defined, from the cube."
			},
			sortOrder: {
				name: "Sort_order",
				detail: "Optional. The type of sort, if any, to perform and can be one of the following:"
			},
			sortBy: {
				name: "Sort_by",
				detail: "Optional. A text string of the value by which to sort. For example, to get the city with the highest sales, set_expression would be a set of cities, and sort_by would be the sales measure. Or, to get the city with the highest population, set_expression would be a set of cities, and sort_by would be the population measure. If sort_order requires sort_by, and sort_by is omitted, CUBESET returns the #VALUE! error message."
			}
		}
	},
	CUBESETCOUNT: {
		description: "Returns the number of items in a set.",
		abstract: "Returns the number of items in a set.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/cubesetcount-function"
		}],
		functionParameter: { set: {
			name: "Set",
			detail: "Required. A text string of a Microsoft Excel expression that evaluates to a set defined by the CUBESET function. Set can also be the CUBESET function, or a reference to a cell that contains the CUBESET function."
		} }
	},
	CUBEVALUE: {
		description: "Returns an aggregated value from the cube.",
		abstract: "Returns an aggregated value from the cube.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/cubevalue-function"
		}],
		functionParameter: {
			connection: {
				name: "Connection",
				detail: "Required. A text string of the name of the connection to the cube."
			},
			memberExpression: {
				name: "Member_expression",
				detail: "Optional. A text string of a multidimensional expression (MDX) that evaluates to a member or tuple within the cube. Alternatively, member_expression can be a set defined with the CUBESET function. Use member_expression as a slicer to define the portion of the cube for which the aggregated value is returned. If no measure is specified in member_expression, the default measure for that cube is used."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/database/en-US.ts
/**
* Copyright 2023-present DreamNum Co., Ltd.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const locale$11 = {
	DAVERAGE: {
		description: "Averages the values in a field (column) of records in a list or database that match conditions you specify.",
		abstract: "Averages the values in a field (column) of records in a list or database that match conditions you specify.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/daverage-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "is the range of cells that makes up the list or database. A database is a list of related data in which rows of related information are records, and columns of data are fields. The first row of the list contains labels for each column."
			},
			field: {
				name: "field",
				detail: "indicates which column is used in the function. Enter the column label enclosed between double quotation marks, such as \"Age\" or \"Yield,\" or a number (without quotation marks) that represents the position of the column within the list: 1 for the first column, 2 for the second column, and so on."
			},
			criteria: {
				name: "criteria",
				detail: "is the range of cells that contains the conditions you specify. You can use any range for the criteria argument, as long as it includes at least one column label and at least one cell below the column label in which you specify a condition for the column."
			}
		}
	},
	DCOUNT: {
		description: "Counts the cells that contain numbers in a field (column) of records in a list or database that match conditions that you specify.",
		abstract: "Counts the cells that contain numbers in a field (column) of records in a list or database that match conditions that you specify.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/dcount-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Required. The range of cells that makes up the list or database. A database is a list of related data in which rows of related information are records, and columns of data are fields. The first row of the list contains labels for each column."
			},
			field: {
				name: "field",
				detail: "Required. Indicates which column is used in the function. Enter the column label enclosed between double quotation marks, such as \"Age\" or \"Yield,\" or a number (without quotation marks) that represents the position of the column within the list: 1 for the first column, 2 for the second column, and so on."
			},
			criteria: {
				name: "criteria",
				detail: "Required. The range of cells that contains the conditions that you specify. You can use any range for the criteria argument, as long as the argument includes at least one column label and at least one cell below the column label in which you specify a condition for the column."
			}
		}
	},
	DCOUNTA: {
		description: "Counts the nonblank cells in a field (column) of records in a list or database that match conditions that you specify.",
		abstract: "Counts the nonblank cells in a field (column) of records in a list or database that match conditions that you specify.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/dcounta-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Required. The range of cells that makes up the list or database. A database is a list of related data in which rows of related information are records, and columns of data are fields. The first row of the list contains labels for each column."
			},
			field: {
				name: "field",
				detail: "Optional. Indicates which column is used in the function. Enter the column label enclosed between double quotation marks, such as \"Age\" or \"Yield,\" or a number (without quotation marks) that represents the position of the column within the list: 1 for the first column, 2 for the second column, and so on."
			},
			criteria: {
				name: "criteria",
				detail: "Required. The range of cells that contains the conditions that you specify. You can use any range for the criteria argument, as long as it includes at least one column label and at least one cell below the column label in which you specify a condition for the column."
			}
		}
	},
	DGET: {
		description: "Extracts a single value from a column of a list or database that matches conditions that you specify.",
		abstract: "Extracts a single value from a column of a list or database that matches conditions that you specify.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/dget-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Required. The range of cells that makes up the list or database. A database is a list of related data in which rows of related information are records, and columns of data are fields. The first row of the list contains labels for each column."
			},
			field: {
				name: "field",
				detail: "Required. Indicates which column is used in the function. Enter the column label enclosed between double quotation marks, such as \"Age\" or \"Yield,\" or a number (without quotation marks) that represents the position of the column within the list: 1 for the first column, 2 for the second column, and so on."
			},
			criteria: {
				name: "criteria",
				detail: "Required. The range of cells that contains the conditions that you specify. You can use any range for the criteria argument, as long as it includes at least one column label and at least one cell below the column label in which you specify a condition for the column."
			}
		}
	},
	DMAX: {
		description: "Returns the largest number in a field (column) of records in a list or database that matches conditions you that specify.",
		abstract: "Returns the largest number in a field (column) of records in a list or database that matches conditions you that specify.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/dmax-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Required. The range of cells that makes up the list or database. A database is a list of related data in which rows of related information are records, and columns of data are fields. The first row of the list contains labels for each column."
			},
			field: {
				name: "field",
				detail: "Required. Indicates which column is used in the function. Enter the column label enclosed between double quotation marks, such as \"Age\" or \"Yield,\" or a number (without quotation marks) that represents the position of the column within the list: 1 for the first column, 2 for the second column, and so on."
			},
			criteria: {
				name: "criteria",
				detail: "Required. The range of cells that contains the conditions that you specify. You can use any range for the criteria argument, as long as it includes at least one column label and at least one cell below the column label in which you specify a condition for the column."
			}
		}
	},
	DMIN: {
		description: "Returns the smallest number in a field (column) of records in a list or database that matches conditions that you specify.",
		abstract: "Returns the smallest number in a field (column) of records in a list or database that matches conditions that you specify.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/dmin-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Required. The range of cells that makes up the list or database. A database is a list of related data in which rows of related information are records, and columns of data are fields. The first row of the list contains labels for each column."
			},
			field: {
				name: "field",
				detail: "Required. Indicates which column is used in the function. Enter the column label enclosed between double quotation marks, such as \"Age\" or \"Yield,\" or a number (without quotation marks) that represents the position of the column within the list: 1 for the first column, 2 for the second column, and so on."
			},
			criteria: {
				name: "criteria",
				detail: "Required. The range of cells that contains the conditions that you specify. You can use any range for the criteria argument, as long as it includes at least one column label and at least one cell below the column label in which you specify a condition for the column."
			}
		}
	},
	DPRODUCT: {
		description: "Multiplies the values in a field (column) of records in a list or database that match conditions that you specify.",
		abstract: "Multiplies the values in a field (column) of records in a list or database that match conditions that you specify.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/dproduct-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Required. The range of cells that makes up the list or database. A database is a list of related data in which rows of related information are records, and columns of data are fields. The first row of the list contains labels for each column."
			},
			field: {
				name: "field",
				detail: "Required. Indicates which column is used in the function. Enter the column label enclosed between double quotation marks, such as \"Age\" or \"Yield,\" or a number (without quotation marks) that represents the position of the column within the list: 1 for the first column, 2 for the second column, and so on."
			},
			criteria: {
				name: "criteria",
				detail: "Required. The range of cells that contains the conditions that you specify. You can use any range for the criteria argument, as long as it includes at least one column label and at least one cell below the column label in which you specify a condition for the column."
			}
		}
	},
	DSTDEV: {
		description: "Estimates the standard deviation of a population based on a sample by using the numbers in a field (column) of records in a list or database that match conditions that you specify.",
		abstract: "Estimates the standard deviation of a population based on a sample by using the numbers in a field (column) of records in a list or database that match conditions that you specify.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/dstdev-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Required. The range of cells that makes up the list or database. A database is a list of related data in which rows of related information are records, and columns of data are fields. The first row of the list contains labels for each column."
			},
			field: {
				name: "field",
				detail: "Required. Indicates which column is used in the function. Enter the column label enclosed between double quotation marks, such as \"Age\" or \"Yield,\" or a number (without quotation marks) that represents the position of the column within the list: 1 for the first column, 2 for the second column, and so on."
			},
			criteria: {
				name: "criteria",
				detail: "Required. The range of cells that contains the conditions that you specify. You can use any range for the criteria argument, as long as it includes at least one column label and at least one cell below the column label in which you specify a condition for the column."
			}
		}
	},
	DSTDEVP: {
		description: "Calculates the standard deviation of a population based on the entire population by using the numbers in a field (column) of records in a list or database that match conditions that you specify.",
		abstract: "Calculates the standard deviation of a population based on the entire population by using the numbers in a field (column) of records in a list or database that match conditions that you specify.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/dstdevp-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Required. The range of cells that makes up the list or database. A database is a list of related data in which rows of related information are records, and columns of data are fields. The first row of the list contains labels for each column."
			},
			field: {
				name: "field",
				detail: "Required. Indicates which column is used in the function. Enter the column label enclosed between double quotation marks, such as \"Age\" or \"Yield,\" or a number (without quotation marks) that represents the position of the column within the list: 1 for the first column, 2 for the second column, and so on."
			},
			criteria: {
				name: "criteria",
				detail: "Required. The range of cells that contains the conditions that you specify. You can use any range for the criteria argument, as long as it includes at least one column label and at least one cell below the column label in which you specify a condition for the column."
			}
		}
	},
	DSUM: {
		description: "In a list or database, DSUM provides the sum of the numbers in fields (columns) of records that match your specified conditions.",
		abstract: "In a list or database, DSUM provides the sum of the numbers in fields (columns) of records that match your specified conditions.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/dsum-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Required. This is the range of cells that makes up the list or database. A database is a list of related data in which rows of related information are records , and columns of data are fields . The first row of a list contains labels for each column therein."
			},
			field: {
				name: "field",
				detail: "Required. This specifies which column is used in the function. Specify the column label enclosed between double quotation marks, such as \"Age\" or \"Yield,\" for example. Alternatively, you can specify a number (without quotation marks) that represents the position of the column within the list: e.g., 1 for the first column, 2 for the second column, and so on."
			},
			criteria: {
				name: "criteria",
				detail: "Required. This is the range of cells that contains the conditions that you specify. You can use any range for the criteria argument, as long as it includes at least one column label and at least one cell below the column label in which you specify a condition for the column."
			}
		}
	},
	DVAR: {
		description: "Estimates the variance of a population based on a sample by using the numbers in a field (column) of records in a list or database that match conditions that you specify.",
		abstract: "Estimates the variance of a population based on a sample by using the numbers in a field (column) of records in a list or database that match conditions that you specify.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/dvar-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Required. The range of cells that makes up the list or database. A database is a list of related data in which rows of related information are records, and columns of data are fields. The first row of the list contains labels for each column."
			},
			field: {
				name: "field",
				detail: "Required. Indicates which column is used in the function. Enter the column label enclosed between double quotation marks, such as \"Age\" or \"Yield,\" or a number (without quotation marks) that represents the position of the column within the list: 1 for the first column, 2 for the second column, and so on."
			},
			criteria: {
				name: "criteria",
				detail: "Required. The range of cells that contains the conditions that you specify. You can use any range for the criteria argument, as long as it includes at least one column label and at least one cell below the column label in which you specify a condition for the column."
			}
		}
	},
	DVARP: {
		description: "Calculates the variance of a population based on the entire population by using the numbers in a field (column) of records in a list or database that match conditions that you specify.",
		abstract: "Calculates the variance of a population based on the entire population by using the numbers in a field (column) of records in a list or database that match conditions that you specify.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/dvarp-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Required. The range of cells that makes up the list or database. A database is a list of related data in which rows of related information are records, and columns of data are fields. The first row of the list contains labels for each column."
			},
			field: {
				name: "field",
				detail: "Required. Indicates which column is used in the function. Enter the column label enclosed between double quotation marks, such as \"Age\" or \"Yield,\" or a number (without quotation marks) that represents the position of the column within the list: 1 for the first column, 2 for the second column, and so on."
			},
			criteria: {
				name: "criteria",
				detail: "Required. The range of cells that contains the conditions that you specify. You can use any range for the criteria argument, as long as it includes at least one column label and at least one cell below the column label in which you specify a condition for the column."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/date/en-US.ts
/**
* Copyright 2023-present DreamNum Co., Ltd.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const locale$10 = {
	DATE: {
		description: "Returns the serial number of a particular date",
		abstract: "Returns the serial number of a particular date",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/date-function"
		}],
		functionParameter: {
			year: {
				name: "year",
				detail: "The value of the year argument can include one to four digits. Excel interprets the year argument according to the date system your computer is using. By default, Univer uses the 1900 date system, which means the first date is January 1, 1900."
			},
			month: {
				name: "month",
				detail: "A positive or negative integer representing the month of the year from 1 to 12 (January to December)."
			},
			day: {
				name: "day",
				detail: "A positive or negative integer representing the day of the month from 1 to 31."
			}
		}
	},
	DATEDIF: {
		description: "Calculates the number of days, months, or years between two dates. This function is useful in formulas where you need to calculate an age.",
		abstract: "Calculates the number of days, months, or years between two dates. This function is useful in formulas where you need to calculate an age.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/datedif-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "A date that represents the first, or starting date of a given period. Dates may be entered as text strings within quotation marks (for example, \"2001/1/30\"), as serial numbers (for example, 36921, which represents January 30, 2001, if you're using the 1900 date system), or as the results of other formulas or functions (for example, DATEVALUE(\"2001/1/30\"))."
			},
			endDate: {
				name: "end_date",
				detail: "A date that represents the last, or ending, date of the period."
			},
			unit: {
				name: "Unit",
				detail: "The type of information that you want returned, where: Unit****Returns \" Y \"The number of complete years in the period.\" M \"The number of complete months in the period.\" D \"The number of days in the period.\" MD \"The difference between the days in start_date and end_date. The months and years of the dates are ignored. Important: We don't recommend using the \"MD\" argument, as there are known limitations with it. See the known issues section below.\" YM \"The difference between the months in start_date and end_date. The days and years of the dates are ignored\" YD \"The difference between the days of start_date and end_date. The years of the dates are ignored."
			}
		}
	},
	DATEVALUE: {
		description: "Converts a date in the form of text to a serial number.",
		abstract: "Converts a date in the form of text to a serial number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/datevalue-function"
		}],
		functionParameter: { dateText: {
			name: "date_text",
			detail: "Text that represents a date in an Excel date format, or a reference to a cell that contains text that represents a date in an Excel date format. For example, \"1/30/2008\" or \"30-Jan-2008\" are text strings within quotation marks that represent dates.\nUsing the default date system in Microsoft Excel for Windows, the date_text argument must represent a date between January 1, 1900 and December 31, 9999. The DATEVALUE function returns the #VALUE! error value if the value of the date_text argument falls outside of this range.\nIf the year portion of the date_text argument is omitted, the DATEVALUE function uses the current year from your computer's built-in clock. Time information in the date_text argument is ignored."
		} }
	},
	DAY: {
		description: "Returns the day of a date, represented by a serial number. The day is given as an integer ranging from 1 to 31.",
		abstract: "Converts a serial number to a day of the month",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/day-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "The date of the day you are trying to find. Dates should be entered by using the DATE function, or as results of other formulas or functions. For example, use DATE(2008,5,23) for the 23rd day of May, 2008."
		} }
	},
	DAYS: {
		description: "Returns the number of days between two dates.",
		abstract: "Returns the number of days between two dates.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/days-function"
		}],
		functionParameter: {
			endDate: {
				name: "end_date",
				detail: "Required. Start_date and End_date are the two dates between which you want to know the number of days."
			},
			startDate: {
				name: "start_date",
				detail: "Required. Start_date and End_date are the two dates between which you want to know the number of days."
			}
		}
	},
	DAYS360: {
		description: "Calculates the number of days between two dates based on a 360-day year",
		abstract: "Calculates the number of days between two dates based on a 360-day year",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/days360-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Start_date and End_date are the two dates between which you want to know the number of days."
			},
			endDate: {
				name: "end_date",
				detail: "Start_date and End_date are the two dates between which you want to know the number of days."
			},
			method: {
				name: "method",
				detail: "A logical value that specifies whether to use the U.S. or European method in the calculation."
			}
		}
	},
	EDATE: {
		description: "Returns the serial number that represents the date that is the indicated number of months before or after a specified date (the start_date). Use EDATE to calculate maturity dates or due dates that fall on the same day of the month as the date of issue.",
		abstract: "Returns the serial number of the date that is the indicated number of months before or after the start date",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/edate-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "A date that represents the start date. Dates should be entered by using the DATE function, or as results of other formulas or functions. For example, use DATE(2008,5,23) for the 23rd day of May, 2008. Problems can occur if dates are entered as text."
			},
			months: {
				name: "months",
				detail: "The number of months before or after start_date. A positive value for months yields a future date; a negative value yields a past date."
			}
		}
	},
	EOMONTH: {
		description: "Returns the serial number of the last day of the month before or after a specified number of months",
		abstract: "Returns the serial number of the last day of the month before or after a specified number of months",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/eomonth-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "A date that represents the starting date."
			},
			months: {
				name: "months",
				detail: "The number of months before or after start_date."
			}
		}
	},
	EPOCHTODATE: {
		description: "Converts a Unix epoch timestamp in seconds, milliseconds, or microseconds to a datetime in Universal Time Coordinated (UTC).",
		abstract: "Converts a Unix epoch timestamp in seconds, milliseconds, or microseconds to a datetime in Universal Time Coordinated (UTC).",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/13193461?hl=en"
		}],
		functionParameter: {
			timestamp: {
				name: "timestamp",
				detail: "A Unix epoch timestamp, in seconds, milliseconds, or microseconds."
			},
			unit: {
				name: "unit",
				detail: "[OPTIONAL – 1 by default]: The unit of time in which the timestamp is expressed."
			}
		}
	},
	HOUR: {
		description: "Converts a serial number to an hour",
		abstract: "Converts a serial number to an hour",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/hour-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "The date of the day you are trying to find. Dates should be entered by using the DATE function, or as results of other formulas or functions. For example, use DATE(2008,5,23) for the 23rd day of May, 2008."
		} }
	},
	ISOWEEKNUM: {
		description: "Returns the number of the ISO week number of the year for a given date",
		abstract: "Returns the number of the ISO week number of the year for a given date",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/isoweeknum-function"
		}],
		functionParameter: { date: {
			name: "date",
			detail: "Date is the date-time code used by Excel for date and time calculation."
		} }
	},
	MINUTE: {
		description: "Returns the minutes of a time value. The minute is given as an integer, ranging from 0 to 59.",
		abstract: "Returns the minutes of a time value. The minute is given as an integer, ranging from 0 to 59.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/minute-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Required. The time that contains the minute you want to find. Times may be entered as text strings within quotation marks (for example, \"6:45 PM\"), as decimal numbers (for example, 0.78125, which represents 6:45 PM), or as results of other formulas or functions (for example, TIMEVALUE(\"6:45 PM\"))."
		} }
	},
	MONTH: {
		description: "Returns the month of a date represented by a serial number. The month is given as an integer, ranging from 1 (January) to 12 (December).",
		abstract: "Returns the month of a date represented by a serial number. The month is given as an integer, ranging from 1 (January) to 12 (December).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/month-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Required. The date of the month you are trying to find. Dates should be entered by using the DATE function, or as results of other formulas or functions. For example, use DATE(2008,5,23) for the 23rd day of May, 2008. Problems can occur if dates are entered as text ."
		} }
	},
	NETWORKDAYS: {
		description: "Returns the number of whole working days between start_date and end_date. Working days exclude weekends and any dates identified in holidays. Use NETWORKDAYS to calculate employee benefits that accrue based on the number of days worked during a specific term.",
		abstract: "Returns the number of whole working days between start_date and end_date. Working days exclude weekends and any dates identified in holidays. Use NETWORKDAYS to calculate employee benefits that accrue based on the number of days worked during a specific term.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/networkdays-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Required. A date that represents the start date."
			},
			endDate: {
				name: "end_date",
				detail: "Required. A date that represents the end date."
			},
			holidays: {
				name: "holidays",
				detail: "Optional. An optional range of one or more dates to exclude from the working calendar, such as state and federal holidays and floating holidays. The list can be either a range of cells that contains the dates or an array constant of the serial numbers that represent the dates."
			}
		}
	},
	NETWORKDAYS_INTL: {
		description: "Returns the number of whole workdays between two dates using parameters to indicate which and how many days are weekend days",
		abstract: "Returns the number of whole workdays between two dates using parameters to indicate which and how many days are weekend days",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/networkdays-intl-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "A date that represents the start date."
			},
			endDate: {
				name: "end_date",
				detail: "A date that represents the end date."
			},
			weekend: {
				name: "weekend",
				detail: "is a weekend number or string that specifies when weekends occur."
			},
			holidays: {
				name: "holidays",
				detail: "An optional range of one or more dates to exclude from the working calendar, such as state and federal holidays and floating holidays."
			}
		}
	},
	NOW: {
		description: "Returns the serial number of the current date and time. If the cell format was General before the function was entered, Excel changes the cell format so that it matches the date and time format of your regional settings. You can change the date and time format for the cell by using the commands in the Number group of the Home tab on the Ribbon.",
		abstract: "Returns the serial number of the current date and time. If the cell format was General before the function was entered, Excel changes the cell format so that it matches the date and time format of your regional settings. You can change the date and time format for the cell by using the commands in the Number group of the Home tab on the Ribbon.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/now-function"
		}],
		functionParameter: {}
	},
	SECOND: {
		description: "Returns the seconds of a time value. The second is given as an integer in the range 0 (zero) to 59.",
		abstract: "Returns the seconds of a time value. The second is given as an integer in the range 0 (zero) to 59.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/second-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Required. The time that contains the seconds you want to find. Times may be entered as text strings within quotation marks (for example, \"6:45 PM\"), as decimal numbers (for example, 0.78125, which represents 6:45 PM), or as results of other formulas or functions (for example, TIMEVALUE(\"6:45 PM\"))."
		} }
	},
	TIME: {
		description: "Returns the decimal number for a particular time. If the cell format was General before the function was entered, the result is formatted as a date.",
		abstract: "Returns the decimal number for a particular time. If the cell format was General before the function was entered, the result is formatted as a date.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/time-function"
		}],
		functionParameter: {
			hour: {
				name: "hour",
				detail: "Required. A number from 0 (zero) to 32767 representing the hour. Any value greater than 23 will be divided by 24 and the remainder will be treated as the hour value. For example, TIME(27,0,0) = TIME(3,0,0) = .125 or 3:00 AM."
			},
			minute: {
				name: "minute",
				detail: "Required. A number from 0 to 32767 representing the minute. Any value greater than 59 will be converted to hours and minutes. For example, TIME(0,750,0) = TIME(12,30,0) = .520833 or 12:30 PM."
			},
			second: {
				name: "second",
				detail: "Required. A number from 0 to 32767 representing the second. Any value greater than 59 will be converted to hours, minutes, and seconds. For example, TIME(0,0,2000) = TIME(0,33,22) = .023148 or 12:33:20 AM"
			}
		}
	},
	TIMEVALUE: {
		description: "Converts a time in the form of text to a serial number.",
		abstract: "Converts a time in the form of text to a serial number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/timevalue-function"
		}],
		functionParameter: { timeText: {
			name: "time_text",
			detail: "A text string that represents a time in any one of the Microsoft Excel time formats; for example, \"6:45 PM\" and \"18:45\" text strings within quotation marks that represent time."
		} }
	},
	TO_DATE: {
		description: "Converts a provided number to a date.",
		abstract: "Converts a provided number to a date.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3094239?hl=en"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "The argument or reference to a cell to be converted to a date. If value is a number or a reference to a cell containing a numeric value, TO_DATE returns value converted to a date, interpreting value as number of days since December 30, 1899. Negative values are interpreted as days before this date, and fractional values indicate time of day past midnight. If value is not a number or a reference to a cell containing a numeric value, TO_DATE returns value without modification."
		} }
	},
	TODAY: {
		description: "Returns the serial number of today's date",
		abstract: "Returns the serial number of today's date",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/today-function"
		}],
		functionParameter: {}
	},
	WEEKDAY: {
		description: "Converts a serial number to a day of the week",
		abstract: "Converts a serial number to a day of the week",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/weekday-function"
		}],
		functionParameter: {
			serialNumber: {
				name: "serial_number",
				detail: "A sequential number that represents the date of the day you are trying to find."
			},
			returnType: {
				name: "return_type",
				detail: "A number that determines the type of return value."
			}
		}
	},
	WEEKNUM: {
		description: "Converts a serial number to a number representing where the week falls numerically with a year",
		abstract: "Converts a serial number to a number representing where the week falls numerically with a year",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/weeknum-function"
		}],
		functionParameter: {
			serialNumber: {
				name: "serial_number",
				detail: "A date within the week."
			},
			returnType: {
				name: "return_type",
				detail: "A number that determines on which day the week begins. The default is 1."
			}
		}
	},
	WORKDAY: {
		description: "Returns the serial number of the date before or after a specified number of workdays",
		abstract: "Returns the serial number of the date before or after a specified number of workdays",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/workday-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "A date that represents the start date."
			},
			days: {
				name: "days",
				detail: "The number of nonweekend and nonholiday days before or after start_date. A positive value for days yields a future date; a negative value yields a past date."
			},
			holidays: {
				name: "holidays",
				detail: "An optional range of one or more dates to exclude from the working calendar, such as state and federal holidays and floating holidays."
			}
		}
	},
	WORKDAY_INTL: {
		description: "Returns the serial number of the date before or after a specified number of workdays using parameters to indicate which and how many days are weekend days",
		abstract: "Returns the serial number of the date before or after a specified number of workdays using parameters to indicate which and how many days are weekend days",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/workday-intl-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "A date that represents the start date."
			},
			days: {
				name: "days",
				detail: "The number of nonweekend and nonholiday days before or after start_date. A positive value for days yields a future date; a negative value yields a past date."
			},
			weekend: {
				name: "weekend",
				detail: "is a weekend number or string that specifies when weekends occur."
			},
			holidays: {
				name: "holidays",
				detail: "An optional range of one or more dates to exclude from the working calendar, such as state and federal holidays and floating holidays."
			}
		}
	},
	YEAR: {
		description: "Returns the year corresponding to a date. The year is returned as an integer in the range 1900-9999.",
		abstract: "Converts a serial number to a year",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/year-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "The date of the year you want to find. Dates should be entered by using the DATE function, or as results of other formulas or functions. For example, use DATE(2008,5,23) for the 23rd day of May, 2008. Problems can occur if dates are entered as text."
		} }
	},
	YEARFRAC: {
		description: "Returns the year fraction representing the number of whole days between start_date and end_date",
		abstract: "Returns the year fraction representing the number of whole days between start_date and end_date",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/yearfrac-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "A date that represents the start date."
			},
			endDate: {
				name: "end_date",
				detail: "A date that represents the end date."
			},
			basis: {
				name: "basis",
				detail: "The type of day count basis to use."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/engineering/en-US.ts
/**
* Copyright 2023-present DreamNum Co., Ltd.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const locale$9 = {
	BESSELI: {
		description: "Returns the modified Bessel function In(x)",
		abstract: "Returns the modified Bessel function In(x)",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/besseli-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "The value at which to evaluate the function."
			},
			n: {
				name: "N",
				detail: "The order of the Bessel function. If n is not an integer, it is truncated."
			}
		}
	},
	BESSELJ: {
		description: "Returns the Bessel function Jn(x)",
		abstract: "Returns the Bessel function Jn(x)",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/besselj-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "The value at which to evaluate the function."
			},
			n: {
				name: "N",
				detail: "The order of the Bessel function. If n is not an integer, it is truncated."
			}
		}
	},
	BESSELK: {
		description: "Returns the modified Bessel function Kn(x)",
		abstract: "Returns the modified Bessel function Kn(x)",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/besselk-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "The value at which to evaluate the function."
			},
			n: {
				name: "N",
				detail: "The order of the Bessel function. If n is not an integer, it is truncated."
			}
		}
	},
	BESSELY: {
		description: "Returns the Bessel function Yn(x)",
		abstract: "Returns the Bessel function Yn(x)",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/bessely-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "The value at which to evaluate the function."
			},
			n: {
				name: "N",
				detail: "The order of the Bessel function. If n is not an integer, it is truncated."
			}
		}
	},
	BIN2DEC: {
		description: "Converts a binary number to decimal",
		abstract: "Converts a binary number to decimal",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/bin2dec-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "The binary number you want to convert."
		} }
	},
	BIN2HEX: {
		description: "Converts a binary number to hexadecimal",
		abstract: "Converts a binary number to hexadecimal",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/bin2hex-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "The binary number you want to convert."
			},
			places: {
				name: "places",
				detail: "The number of characters to use."
			}
		}
	},
	BIN2OCT: {
		description: "Converts a binary number to octal.",
		abstract: "Converts a binary number to octal.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/bin2oct-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Required. The binary number you want to convert. Number cannot contain more than 10 characters (10 bits). The most significant bit of number is the sign bit. The remaining 9 bits are magnitude bits. Negative numbers are represented using two's-complement notation."
			},
			places: {
				name: "places",
				detail: "Optional. The number of characters to use. If places is omitted, BIN2OCT uses the minimum number of characters necessary. Places is useful for padding the return value with leading 0s (zeros)."
			}
		}
	},
	BITAND: {
		description: "Returns a bitwise 'AND' of two numbers.",
		abstract: "Returns a bitwise 'AND' of two numbers.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/bitand-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Required. Must be in decimal form and greater than or equal to 0."
			},
			number2: {
				name: "number2",
				detail: "Required. Must be in decimal form and greater than or equal to 0."
			}
		}
	},
	BITLSHIFT: {
		description: "Returns a value number shifted left by shift_amount bits",
		abstract: "Returns a value number shifted left by shift_amount bits",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/bitlshift-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Number must be an integer greater than or equal to 0."
			},
			shiftAmount: {
				name: "shift_amount",
				detail: "Shift_amount must be an integer."
			}
		}
	},
	BITOR: {
		description: "Returns a bitwise OR of 2 numbers",
		abstract: "Returns a bitwise OR of 2 numbers",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/bitor-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Must be in decimal form and greater than or equal to 0."
			},
			number2: {
				name: "number2",
				detail: "Must be in decimal form and greater than or equal to 0."
			}
		}
	},
	BITRSHIFT: {
		description: "Returns a value number shifted right by shift_amount bits",
		abstract: "Returns a value number shifted right by shift_amount bits",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/bitrshift-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Number must be an integer greater than or equal to 0."
			},
			shiftAmount: {
				name: "shift_amount",
				detail: "Shift_amount must be an integer."
			}
		}
	},
	BITXOR: {
		description: "Returns a bitwise 'Exclusive Or' of two numbers",
		abstract: "Returns a bitwise 'Exclusive Or' of two numbers",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/bitxor-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Must be in decimal form and greater than or equal to 0."
			},
			number2: {
				name: "number2",
				detail: "Must be in decimal form and greater than or equal to 0."
			}
		}
	},
	COMPLEX: {
		description: "Converts real and imaginary coefficients into a complex number",
		abstract: "Converts real and imaginary coefficients into a complex number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/complex-function"
		}],
		functionParameter: {
			realNum: {
				name: "real_num",
				detail: "The real coefficient of the complex number."
			},
			iNum: {
				name: "i_num",
				detail: "The imaginary coefficient of the complex number."
			},
			suffix: {
				name: "suffix",
				detail: "The suffix for the imaginary component of the complex number. If omitted, suffix is assumed to be \"i\"."
			}
		}
	},
	CONVERT: {
		description: "Converts a number from one measurement system to another",
		abstract: "Converts a number from one measurement system to another",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/convert-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Is the value in from_units to convert."
			},
			fromUnit: {
				name: "from_unit",
				detail: "Is the units for number."
			},
			toUnit: {
				name: "to_unit",
				detail: "Is the units for the result."
			}
		}
	},
	DEC2BIN: {
		description: "Converts a decimal number to binary",
		abstract: "Converts a decimal number to binary",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/dec2bin-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "The decimal number you want to convert."
			},
			places: {
				name: "places",
				detail: "The number of characters to use."
			}
		}
	},
	DEC2HEX: {
		description: "Converts a decimal number to hexadecimal",
		abstract: "Converts a decimal number to hexadecimal",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/dec2hex-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "The decimal number you want to convert."
			},
			places: {
				name: "places",
				detail: "The number of characters to use."
			}
		}
	},
	DEC2OCT: {
		description: "Converts a decimal number to octal",
		abstract: "Converts a decimal number to octal",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/dec2oct-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "The decimal number you want to convert."
			},
			places: {
				name: "places",
				detail: "The number of characters to use."
			}
		}
	},
	DELTA: {
		description: "Tests whether two values are equal",
		abstract: "Tests whether two values are equal",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/delta-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "The first number."
			},
			number2: {
				name: "number2",
				detail: "The second number. If omitted, number2 is assumed to be zero."
			}
		}
	},
	ERF: {
		description: "Returns the error function",
		abstract: "Returns the error function",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/erf-function"
		}],
		functionParameter: {
			lowerLimit: {
				name: "lower_limit",
				detail: "The lower bound for integrating ERF."
			},
			upperLimit: {
				name: "upper_limit",
				detail: "The upper bound for integrating ERF. If omitted, ERF integrates between zero and lower_limit."
			}
		}
	},
	ERF_PRECISE: {
		description: "Returns the error function",
		abstract: "Returns the error function",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/erf-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "The lower bound for integrating ERF.PRECISE."
		} }
	},
	ERFC: {
		description: "Returns the complementary error function",
		abstract: "Returns the complementary error function",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/erfc-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "The lower bound for integrating ERFC."
		} }
	},
	ERFC_PRECISE: {
		description: "Returns the complementary ERF function integrated between x and infinity",
		abstract: "Returns the complementary ERF function integrated between x and infinity",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/erfc-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "The lower bound for integrating ERFC.PRECISE."
		} }
	},
	GESTEP: {
		description: "Tests whether a number is greater than a threshold value",
		abstract: "Tests whether a number is greater than a threshold value",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/gestep-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "The value to test against step."
			},
			step: {
				name: "step",
				detail: "The threshold value. If you omit a value for step, GESTEP uses zero."
			}
		}
	},
	HEX2BIN: {
		description: "Converts a hexadecimal number to binary",
		abstract: "Converts a hexadecimal number to binary",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/hex2bin-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "The hexadecimal number you want to convert."
			},
			places: {
				name: "places",
				detail: "The number of characters to use."
			}
		}
	},
	HEX2DEC: {
		description: "Converts a hexadecimal number to decimal",
		abstract: "Converts a hexadecimal number to decimal",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/hex2dec-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "The hexadecimal number you want to convert."
		} }
	},
	HEX2OCT: {
		description: "Converts a hexadecimal number to octal",
		abstract: "Converts a hexadecimal number to octal",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/hex2oct-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "The hexadecimal number you want to convert."
			},
			places: {
				name: "places",
				detail: "The number of characters to use."
			}
		}
	},
	IMABS: {
		description: "Returns the absolute value (modulus) of a complex number",
		abstract: "Returns the absolute value (modulus) of a complex number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/imabs-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "A complex number for which you want the absolute value."
		} }
	},
	IMAGINARY: {
		description: "Returns the imaginary coefficient of a complex number",
		abstract: "Returns the imaginary coefficient of a complex number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/imaginary-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "A complex number for which you want the imaginary coefficient."
		} }
	},
	IMARGUMENT: {
		description: "Returns the argument theta, an angle expressed in radians",
		abstract: "Returns the argument theta, an angle expressed in radians",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/imargument-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "A complex number for which you want the argument theta."
		} }
	},
	IMCONJUGATE: {
		description: "Returns the complex conjugate of a complex number",
		abstract: "Returns the complex conjugate of a complex number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/imconjugate-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "A complex number for which you want the conjugate."
		} }
	},
	IMCOS: {
		description: "Returns the cosine of a complex number",
		abstract: "Returns the cosine of a complex number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/imcos-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "A complex number for which you want the cosine."
		} }
	},
	IMCOSH: {
		description: "Returns the hyperbolic cosine of a complex number",
		abstract: "Returns the hyperbolic cosine of a complex number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/imcosh-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "A complex number for which you want the hyperbolic cosine."
		} }
	},
	IMCOT: {
		description: "Returns the cotangent of a complex number",
		abstract: "Returns the cotangent of a complex number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/imcot-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "A complex number for which you want the cotangent."
		} }
	},
	IMCOTH: {
		description: "The IMCOTH function returns the hyperbolic cotangent of the given complex number. For example, a given complex number \"x+yi\" returns \"coth(x+yi).\"",
		abstract: "The IMCOTH function returns the hyperbolic cotangent of the given complex number. For example, a given complex number \"x+yi\" returns \"coth(x+yi).\"",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9366256?hl=en"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "The complex number for which you want the hyperbolic cotangent. This can be either the result of the COMPLEX function, a real number interpreted as a complex number with imaginary parts equal to 0, or a string in the format “x+yi” where x and y are numeric."
		} }
	},
	IMCSC: {
		description: "Returns the cosecant of a complex number",
		abstract: "Returns the cosecant of a complex number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/imcsc-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "A complex number for which you want the cosecant."
		} }
	},
	IMCSCH: {
		description: "Returns the hyperbolic cosecant of a complex number",
		abstract: "Returns the hyperbolic cosecant of a complex number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/imcsch-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "A complex number for which you want the hyperbolic cosecant."
		} }
	},
	IMDIV: {
		description: "Returns the quotient of two complex numbers in x + yi or x + yj text format.",
		abstract: "Returns the quotient of two complex numbers in x + yi or x + yj text format.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/imdiv-function"
		}],
		functionParameter: {
			inumber1: {
				name: "inumber1",
				detail: "Required. The complex numerator or dividend."
			},
			inumber2: {
				name: "inumber2",
				detail: "Required. The complex denominator or divisor."
			}
		}
	},
	IMEXP: {
		description: "Returns the exponential of a complex number in x + yi or x + yj text format.",
		abstract: "Returns the exponential of a complex number in x + yi or x + yj text format.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/imexp-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Required. A complex number for which you want the exponential."
		} }
	},
	IMLN: {
		description: "Returns the natural logarithm of a complex number",
		abstract: "Returns the natural logarithm of a complex number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/imln-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "A complex number for which you want the natural logarithm."
		} }
	},
	IMLOG: {
		description: "The IMLOG function returns the logarithm of a complex number for a specified base.",
		abstract: "The IMLOG function returns the logarithm of a complex number for a specified base.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9366486?hl=en"
		}],
		functionParameter: {
			inumber: {
				name: "inumber",
				detail: "The input value of the logarithm function. The number can be written as plain numbers, e.g. 1, to be interpreted as a real number. The number can be written as quoted text in order to specify both the real and complex coefficients."
			},
			base: {
				name: "base",
				detail: "The base to use when calculating the logarithm. Must be a positive real number."
			}
		}
	},
	IMLOG10: {
		description: "Returns the base-10 logarithm of a complex number",
		abstract: "Returns the base-10 logarithm of a complex number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/imlog10-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "A complex number for which you want the common logarithm."
		} }
	},
	IMLOG2: {
		description: "Returns the base-2 logarithm of a complex number",
		abstract: "Returns the base-2 logarithm of a complex number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/imlog2-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "A complex number for which you want the base-2 logarithm."
		} }
	},
	IMPOWER: {
		description: "Returns a complex number raised to an integer power",
		abstract: "Returns a complex number raised to an integer power",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/impower-function"
		}],
		functionParameter: {
			inumber: {
				name: "inumber",
				detail: "A complex number you want to raise to a power."
			},
			number: {
				name: "number",
				detail: "The power to which you want to raise the complex number."
			}
		}
	},
	IMPRODUCT: {
		description: "Returns the product of from 1 to 255 complex numbers",
		abstract: "Returns the product of from 1 to 255 complex numbers",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/improduct-function"
		}],
		functionParameter: {
			inumber1: {
				name: "inumber1",
				detail: "1 to 255 complex numbers to multiply."
			},
			inumber2: {
				name: "inumber2",
				detail: "1 to 255 complex numbers to multiply."
			}
		}
	},
	IMREAL: {
		description: "Returns the real coefficient of a complex number",
		abstract: "Returns the real coefficient of a complex number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/imreal-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "A complex number for which you want the real coefficient."
		} }
	},
	IMSEC: {
		description: "Returns the secant of a complex number",
		abstract: "Returns the secant of a complex number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/imsec-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "A complex number for which you want the secant."
		} }
	},
	IMSECH: {
		description: "Returns the hyperbolic secant of a complex number",
		abstract: "Returns the hyperbolic secant of a complex number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/imsech-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "A complex number for which you want the hyperbolic secant."
		} }
	},
	IMSIN: {
		description: "Returns the sine of a complex number",
		abstract: "Returns the sine of a complex number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/imsin-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "A complex number for which you want the sine."
		} }
	},
	IMSINH: {
		description: "Returns the hyperbolic sine of a complex number",
		abstract: "Returns the hyperbolic sine of a complex number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/imsinh-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "A complex number for which you want the hyperbolic sine."
		} }
	},
	IMSQRT: {
		description: "Returns the square root of a complex number",
		abstract: "Returns the square root of a complex number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/imsqrt-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "A complex number for which you want the square root."
		} }
	},
	IMSUB: {
		description: "Returns the difference between two complex numbers",
		abstract: "Returns the difference between two complex numbers",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/imsub-function"
		}],
		functionParameter: {
			inumber1: {
				name: "inumber1",
				detail: "inumber1."
			},
			inumber2: {
				name: "inumber2",
				detail: "inumber2."
			}
		}
	},
	IMSUM: {
		description: "Returns the sum of complex numbers",
		abstract: "Returns the sum of complex numbers",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/imsum-function"
		}],
		functionParameter: {
			inumber1: {
				name: "inumber1",
				detail: "1 to 255 complex numbers to add."
			},
			inumber2: {
				name: "inumber2",
				detail: "1 to 255 complex numbers to add."
			}
		}
	},
	IMTAN: {
		description: "Returns the tangent of a complex number",
		abstract: "Returns the tangent of a complex number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/imtan-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "A complex number for which you want the tangent."
		} }
	},
	IMTANH: {
		description: "The IMTANH function returns the hyperbolic tangent of the given complex number. For example, a given complex number \"x+yi\" returns \"tanh(x+yi).\"",
		abstract: "The IMTANH function returns the hyperbolic tangent of the given complex number. For example, a given complex number \"x+yi\" returns \"tanh(x+yi).\"",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9366655?hl=en"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "The complex number for which you want the hyperbolic tangent. This can be either the result of the COMPLEX function, a real number interpreted as a complex number with imaginary parts equal to 0, or a string in the format “x+yi” where x and y are numeric."
		} }
	},
	OCT2BIN: {
		description: "Converts an octal number to binary",
		abstract: "Converts an octal number to binary",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/oct2bin-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "The octal number you want to convert."
			},
			places: {
				name: "places",
				detail: "The number of characters to use."
			}
		}
	},
	OCT2DEC: {
		description: "Converts an octal number to decimal",
		abstract: "Converts an octal number to decimal",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/oct2dec-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "The octal number you want to convert."
		} }
	},
	OCT2HEX: {
		description: "Converts an octal number to hexadecimal",
		abstract: "Converts an octal number to hexadecimal",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/oct2hex-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "The octal number you want to convert."
			},
			places: {
				name: "places",
				detail: "The number of characters to use."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/financial/en-US.ts
/**
* Copyright 2023-present DreamNum Co., Ltd.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const locale$8 = {
	ACCRINT: {
		description: "Returns the accrued interest for a security that pays periodic interest",
		abstract: "Returns the accrued interest for a security that pays periodic interest",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/accrint-function"
		}],
		functionParameter: {
			issue: {
				name: "issue",
				detail: "The security's issue date."
			},
			firstInterest: {
				name: "first_interest",
				detail: "The security's first interest date."
			},
			settlement: {
				name: "settlement",
				detail: "The security's maturity date."
			},
			rate: {
				name: "rate",
				detail: "The security's annual coupon rate."
			},
			par: {
				name: "par",
				detail: "The security's par value."
			},
			frequency: {
				name: "frequency",
				detail: "The number of coupon payments per year."
			},
			basis: {
				name: "basis",
				detail: "The type of day count basis to use."
			},
			calcMethod: {
				name: "calc_method",
				detail: "Is a logical value: interest accrues from the issue date = TRUE or ignored; interest accrues from the last coupon payment date = FALSE."
			}
		}
	},
	ACCRINTM: {
		description: "Returns the accrued interest for a security that pays interest at maturity",
		abstract: "Returns the accrued interest for a security that pays interest at maturity",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/accrintm-function"
		}],
		functionParameter: {
			issue: {
				name: "issue",
				detail: "The security's issue date."
			},
			settlement: {
				name: "settlement",
				detail: "The security's maturity date."
			},
			rate: {
				name: "rate",
				detail: "The security's annual coupon rate."
			},
			par: {
				name: "par",
				detail: "The security's par value."
			},
			basis: {
				name: "basis",
				detail: "The type of day count basis to use."
			}
		}
	},
	AMORDEGRC: {
		description: "Returns the depreciation for each accounting period by using a depreciation coefficient",
		abstract: "Returns the depreciation for each accounting period by using a depreciation coefficient",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/amordegrc-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "The cost of the asset."
			},
			datePurchased: {
				name: "date_purchased",
				detail: "The date of the purchase of the asset."
			},
			firstPeriod: {
				name: "first_period",
				detail: "The date of the end of the first period."
			},
			salvage: {
				name: "salvage",
				detail: "The salvage value at the end of the life of the asset."
			},
			period: {
				name: "period",
				detail: "The period."
			},
			rate: {
				name: "rate",
				detail: "The rate of depreciation."
			},
			basis: {
				name: "basis",
				detail: "The year basis to be used."
			}
		}
	},
	AMORLINC: {
		description: "Returns the depreciation for each accounting period",
		abstract: "Returns the depreciation for each accounting period",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/amorlinc-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "The cost of the asset."
			},
			datePurchased: {
				name: "date_purchased",
				detail: "The date of the purchase of the asset."
			},
			firstPeriod: {
				name: "first_period",
				detail: "The date of the end of the first period."
			},
			salvage: {
				name: "salvage",
				detail: "The salvage value at the end of the life of the asset."
			},
			period: {
				name: "period",
				detail: "The period."
			},
			rate: {
				name: "rate",
				detail: "The rate of depreciation."
			},
			basis: {
				name: "basis",
				detail: "The year basis to be used."
			}
		}
	},
	COUPDAYBS: {
		description: "Returns the number of days from the beginning of the coupon period to the settlement date",
		abstract: "Returns the number of days from the beginning of the coupon period to the settlement date",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/coupdaybs-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "The security's settlement date."
			},
			maturity: {
				name: "maturity",
				detail: "The security's maturity date."
			},
			frequency: {
				name: "frequency",
				detail: "The number of coupon payments per year."
			},
			basis: {
				name: "basis",
				detail: "The type of day count basis to use."
			}
		}
	},
	COUPDAYS: {
		description: "Returns the number of days in the coupon period that contains the settlement date",
		abstract: "Returns the number of days in the coupon period that contains the settlement date",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/coupdays-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "The security's settlement date."
			},
			maturity: {
				name: "maturity",
				detail: "The security's maturity date."
			},
			frequency: {
				name: "frequency",
				detail: "The number of coupon payments per year."
			},
			basis: {
				name: "basis",
				detail: "The type of day count basis to use."
			}
		}
	},
	COUPDAYSNC: {
		description: "Returns the number of days from the settlement date to the next coupon date",
		abstract: "Returns the number of days from the settlement date to the next coupon date",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/coupdaysnc-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "The security's settlement date."
			},
			maturity: {
				name: "maturity",
				detail: "The security's maturity date."
			},
			frequency: {
				name: "frequency",
				detail: "The number of coupon payments per year."
			},
			basis: {
				name: "basis",
				detail: "The type of day count basis to use."
			}
		}
	},
	COUPNCD: {
		description: "Returns the next coupon date after the settlement date",
		abstract: "Returns the next coupon date after the settlement date",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/coupncd-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "The security's settlement date."
			},
			maturity: {
				name: "maturity",
				detail: "The security's maturity date."
			},
			frequency: {
				name: "frequency",
				detail: "The number of coupon payments per year."
			},
			basis: {
				name: "basis",
				detail: "The type of day count basis to use."
			}
		}
	},
	COUPNUM: {
		description: "Returns the number of coupons payable between the settlement date and maturity date",
		abstract: "Returns the number of coupons payable between the settlement date and maturity date",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/coupnum-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "The security's settlement date."
			},
			maturity: {
				name: "maturity",
				detail: "The security's maturity date."
			},
			frequency: {
				name: "frequency",
				detail: "The number of coupon payments per year."
			},
			basis: {
				name: "basis",
				detail: "The type of day count basis to use."
			}
		}
	},
	COUPPCD: {
		description: "Returns the previous coupon date before the settlement date",
		abstract: "Returns the previous coupon date before the settlement date",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/couppcd-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "The security's settlement date."
			},
			maturity: {
				name: "maturity",
				detail: "The security's maturity date."
			},
			frequency: {
				name: "frequency",
				detail: "The number of coupon payments per year."
			},
			basis: {
				name: "basis",
				detail: "The type of day count basis to use."
			}
		}
	},
	CUMIPMT: {
		description: "Returns the cumulative interest paid between two periods",
		abstract: "Returns the cumulative interest paid between two periods",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/cumipmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "The interest rate."
			},
			nper: {
				name: "nper",
				detail: "The total number of payment periods."
			},
			pv: {
				name: "pv",
				detail: "The present value."
			},
			startPeriod: {
				name: "start_period",
				detail: "The first period in the calculation. Payment periods are numbered beginning with 1."
			},
			endPeriod: {
				name: "end_period",
				detail: "The last period in the calculation."
			},
			type: {
				name: "type",
				detail: "The timing of the payment."
			}
		}
	},
	CUMPRINC: {
		description: "Returns the cumulative principal paid on a loan between two periods",
		abstract: "Returns the cumulative principal paid on a loan between two periods",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/cumprinc-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "The interest rate."
			},
			nper: {
				name: "nper",
				detail: "The total number of payment periods."
			},
			pv: {
				name: "pv",
				detail: "The present value."
			},
			startPeriod: {
				name: "start_period",
				detail: "The first period in the calculation. Payment periods are numbered beginning with 1."
			},
			endPeriod: {
				name: "end_period",
				detail: "The last period in the calculation."
			},
			type: {
				name: "type",
				detail: "The timing of the payment."
			}
		}
	},
	DB: {
		description: "Returns the depreciation of an asset for a specified period by using the fixed-declining balance method",
		abstract: "Returns the depreciation of an asset for a specified period by using the fixed-declining balance method",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/db-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "The initial cost of the asset."
			},
			salvage: {
				name: "salvage",
				detail: "The value at the end of the depreciation (sometimes called the salvage value of the asset)."
			},
			life: {
				name: "life",
				detail: "The number of periods over which the asset is being depreciated (sometimes called the useful life of the asset)."
			},
			period: {
				name: "period",
				detail: "The period for which you want to calculate the depreciation."
			},
			month: {
				name: "month",
				detail: "The number of months in the first year. If month is omitted, it is assumed to be 12."
			}
		}
	},
	DDB: {
		description: "Returns the depreciation of an asset for a specified period by using the double-declining balance method or some other method that you specify",
		abstract: "Returns the depreciation of an asset for a specified period by using the double-declining balance method or some other method that you specify",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/ddb-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "The initial cost of the asset."
			},
			salvage: {
				name: "salvage",
				detail: "The value at the end of the depreciation (sometimes called the salvage value of the asset)."
			},
			life: {
				name: "life",
				detail: "The number of periods over which the asset is being depreciated (sometimes called the useful life of the asset)."
			},
			period: {
				name: "period",
				detail: "The period for which you want to calculate the depreciation."
			},
			factor: {
				name: "factor",
				detail: "The rate at which the balance declines. If factor is omitted, it is assumed to be 2 (the double-declining balance method)."
			}
		}
	},
	DISC: {
		description: "Returns the discount rate for a security",
		abstract: "Returns the discount rate for a security",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/disc-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "The security's settlement date."
			},
			maturity: {
				name: "maturity",
				detail: "The security's maturity date."
			},
			pr: {
				name: "pr",
				detail: "The security's price per $100 face value."
			},
			redemption: {
				name: "redemption",
				detail: "The security's redemption value per $100 face value."
			},
			basis: {
				name: "basis",
				detail: "The type of day count basis to use."
			}
		}
	},
	DOLLARDE: {
		description: "Converts a dollar price, expressed as a fraction, into a dollar price, expressed as a decimal number",
		abstract: "Converts a dollar price, expressed as a fraction, into a dollar price, expressed as a decimal number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/dollarde-function"
		}],
		functionParameter: {
			fractionalDollar: {
				name: "fractional_dollar",
				detail: "A number expressed as an integer part and a fraction part, separated by a decimal symbol."
			},
			fraction: {
				name: "fraction",
				detail: "The integer to use in the denominator of the fraction."
			}
		}
	},
	DOLLARFR: {
		description: "Converts a dollar price, expressed as a decimal number, into a dollar price, expressed as a fraction",
		abstract: "Converts a dollar price, expressed as a decimal number, into a dollar price, expressed as a fraction",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/dollarfr-function"
		}],
		functionParameter: {
			decimalDollar: {
				name: "decimal_dollar",
				detail: "A decimal number."
			},
			fraction: {
				name: "fraction",
				detail: "The integer to use in the denominator of the fraction."
			}
		}
	},
	DURATION: {
		description: "Returns the annual duration of a security with periodic interest payments",
		abstract: "Returns the annual duration of a security with periodic interest payments",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/duration-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "The security's settlement date."
			},
			maturity: {
				name: "maturity",
				detail: "The security's maturity date."
			},
			coupon: {
				name: "coupon",
				detail: "The security's annual coupon rate."
			},
			yld: {
				name: "yld",
				detail: "The security's annual yield."
			},
			frequency: {
				name: "frequency",
				detail: "The number of coupon payments per year."
			},
			basis: {
				name: "basis",
				detail: "The type of day count basis to use."
			}
		}
	},
	EFFECT: {
		description: "Returns the effective annual interest rate, given the nominal annual interest rate and the number of compounding periods per year.",
		abstract: "Returns the effective annual interest rate, given the nominal annual interest rate and the number of compounding periods per year.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/effect-function"
		}],
		functionParameter: {
			nominalRate: {
				name: "nominal_rate",
				detail: "Required. The nominal interest rate."
			},
			npery: {
				name: "npery",
				detail: "Required. The number of compounding periods per year."
			}
		}
	},
	FV: {
		description: "Returns the future value of an investment",
		abstract: "Returns the future value of an investment",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/fv-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "The interest rate per period."
			},
			nper: {
				name: "nper",
				detail: "The total number of payment periods in an annuity."
			},
			pmt: {
				name: "pmt",
				detail: "The payment made each period; it cannot change over the life of the annuity."
			},
			pv: {
				name: "pv",
				detail: "The present value, or the lump-sum amount that a series of future payments is worth right now."
			},
			type: {
				name: "type",
				detail: "The number 0 or 1 and indicates when payments are due."
			}
		}
	},
	FVSCHEDULE: {
		description: "Returns the future value of an initial principal after applying a series of compound interest rates",
		abstract: "Returns the future value of an initial principal after applying a series of compound interest rates",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/fvschedule-function"
		}],
		functionParameter: {
			principal: {
				name: "principal",
				detail: "The present value."
			},
			schedule: {
				name: "schedule",
				detail: "An array of interest rates to apply."
			}
		}
	},
	INTRATE: {
		description: "Returns the interest rate for a fully invested security.",
		abstract: "Returns the interest rate for a fully invested security.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/intrate-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Required. The security's settlement date. The security settlement date is the date after the issue date when the security is traded to the buyer."
			},
			maturity: {
				name: "maturity",
				detail: "Required. The security's maturity date. The maturity date is the date when the security expires."
			},
			investment: {
				name: "investment",
				detail: "Required. The amount invested in the security."
			},
			redemption: {
				name: "redemption",
				detail: "Required. The amount to be received at maturity."
			},
			basis: {
				name: "basis",
				detail: "Optional. The type of day count basis to use."
			}
		}
	},
	IPMT: {
		description: "Returns the interest payment for a given period for an investment based on periodic, constant payments and a constant interest rate.",
		abstract: "Returns the interest payment for a given period for an investment based on periodic, constant payments and a constant interest rate.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/ipmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Required. The interest rate per period."
			},
			per: {
				name: "per",
				detail: "Required. The period for which you want to find the interest and must be in the range 1 to nper."
			},
			nper: {
				name: "nper",
				detail: "Required. The total number of payment periods in an annuity."
			},
			pv: {
				name: "pv",
				detail: "Required. The present value, or the lump-sum amount that a series of future payments is worth right now."
			},
			fv: {
				name: "fv",
				detail: "Optional. The future value, or a cash balance you want to attain after the last payment is made. If fv is omitted, it is assumed to be 0 (the future value of a loan, for example, is 0)."
			},
			type: {
				name: "type",
				detail: "Optional. The number 0 or 1 and indicates when payments are due. If type is omitted, it is assumed to be 0."
			}
		}
	},
	IRR: {
		description: "Returns the internal rate of return for a series of cash flows",
		abstract: "Returns the internal rate of return for a series of cash flows",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/irr-function"
		}],
		functionParameter: {
			values: {
				name: "values",
				detail: "An array or a reference to cells that contain numbers for which you want to calculate the internal rate of return.\n1.Values must contain at least one positive value and one negative value to calculate the internal rate of return.\n2.IRR uses the order of values to interpret the order of cash flows. Be sure to enter your payment and income values in the sequence you want.\n3.If an array or reference argument contains text, logical values, or empty cells, those values are ignored."
			},
			guess: {
				name: "guess",
				detail: "A number that you guess is close to the result of IRR."
			}
		}
	},
	ISPMT: {
		description: "Calculates the interest paid during a specific period of an investment",
		abstract: "Calculates the interest paid during a specific period of an investment",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/ispmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "The interest rate for the investment."
			},
			per: {
				name: "per",
				detail: "The period for which you want to find the interest, and must be between 1 and Nper."
			},
			nper: {
				name: "nper",
				detail: "The total number of payment periods for the investment."
			},
			pv: {
				name: "pv",
				detail: "The present value of the investment. For a loan, Pv is the loan amount."
			}
		}
	},
	MDURATION: {
		description: "Returns the Macauley modified duration for a security with an assumed par value of $100",
		abstract: "Returns the Macauley modified duration for a security with an assumed par value of $100",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/mduration-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "The security's settlement date."
			},
			maturity: {
				name: "maturity",
				detail: "The security's maturity date."
			},
			coupon: {
				name: "coupon",
				detail: "The security's annual coupon rate."
			},
			yld: {
				name: "yld",
				detail: "The security's annual yield."
			},
			frequency: {
				name: "frequency",
				detail: "The number of coupon payments per year."
			},
			basis: {
				name: "basis",
				detail: "The type of day count basis to use."
			}
		}
	},
	MIRR: {
		description: "Returns the internal rate of return where positive and negative cash flows are financed at different rates",
		abstract: "Returns the internal rate of return where positive and negative cash flows are financed at different rates",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/mirr-function"
		}],
		functionParameter: {
			values: {
				name: "values",
				detail: "An array or a reference to cells that contain numbers. These numbers represent a series of payments (negative values) and income (positive values) occurring at regular periods.\n1.Values must contain at least one positive value and one negative value to calculate the modified internal rate of return. Otherwise, MIRR returns the #DIV/0! error value.\n2.If an array or reference argument contains text, logical values, or empty cells, those values are ignored; however, cells with the value zero are included."
			},
			financeRate: {
				name: "finance_rate",
				detail: "The interest rate you pay on the money used in the cash flows."
			},
			reinvestRate: {
				name: "reinvest_rate",
				detail: "The interest rate you receive on the cash flows as you reinvest them."
			}
		}
	},
	NOMINAL: {
		description: "Returns the annual nominal interest rate",
		abstract: "Returns the annual nominal interest rate",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/nominal-function"
		}],
		functionParameter: {
			effectRate: {
				name: "effect_rate",
				detail: "The effective interest rate."
			},
			npery: {
				name: "npery",
				detail: "The number of compounding periods per year."
			}
		}
	},
	NPER: {
		description: "Returns the number of periods for an investment",
		abstract: "Returns the number of periods for an investment",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/nper-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "The interest rate per period."
			},
			pmt: {
				name: "pmt",
				detail: "The payment made each period; it cannot change over the life of the annuity."
			},
			pv: {
				name: "pv",
				detail: "The present value, or the lump-sum amount that a series of future payments is worth right now."
			},
			fv: {
				name: "fv",
				detail: "The future value, or a cash balance you want to attain after the last payment is made."
			},
			type: {
				name: "type",
				detail: "The number 0 or 1 and indicates when payments are due."
			}
		}
	},
	NPV: {
		description: "Returns the net present value of an investment based on a series of periodic cash flows and a discount rate",
		abstract: "Returns the net present value of an investment based on a series of periodic cash flows and a discount rate",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/npv-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "The rate of discount over the length of one period."
			},
			value1: {
				name: "value1",
				detail: "1 to 254 arguments representing the payments and income."
			},
			value2: {
				name: "value2",
				detail: "1 to 254 arguments representing the payments and income."
			}
		}
	},
	ODDFPRICE: {
		description: "Returns the price per $100 face value of a security with an odd first period",
		abstract: "Returns the price per $100 face value of a security with an odd first period",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/oddfprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "The security's settlement date."
			},
			maturity: {
				name: "maturity",
				detail: "The security's maturity date."
			},
			issue: {
				name: "issue",
				detail: "The security's issue date."
			},
			firstCoupon: {
				name: "first_coupon",
				detail: "The security's first coupon date."
			},
			rate: {
				name: "rate",
				detail: "The security's interest rate."
			},
			yld: {
				name: "yld",
				detail: "The security's annual yield."
			},
			redemption: {
				name: "redemption",
				detail: "The security's redemption value per $100 face value."
			},
			frequency: {
				name: "frequency",
				detail: "The number of coupon payments per year. For annual payments, frequency = 1; for semiannual, frequency = 2; for quarterly, frequency = 4."
			},
			basis: {
				name: "basis",
				detail: "The type of day count basis to use."
			}
		}
	},
	ODDFYIELD: {
		description: "Returns the yield of a security with an odd first period",
		abstract: "Returns the yield of a security with an odd first period",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/oddfyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "The security's settlement date."
			},
			maturity: {
				name: "maturity",
				detail: "The security's maturity date."
			},
			issue: {
				name: "issue",
				detail: "The security's issue date."
			},
			firstCoupon: {
				name: "first_coupon",
				detail: "The security's first coupon date."
			},
			rate: {
				name: "rate",
				detail: "The security's interest rate."
			},
			pr: {
				name: "pr",
				detail: "The security's price."
			},
			redemption: {
				name: "redemption",
				detail: "The security's redemption value per $100 face value."
			},
			frequency: {
				name: "frequency",
				detail: "The number of coupon payments per year. For annual payments, frequency = 1; for semiannual, frequency = 2; for quarterly, frequency = 4."
			},
			basis: {
				name: "basis",
				detail: "The type of day count basis to use."
			}
		}
	},
	ODDLPRICE: {
		description: "Returns the price per $100 face value of a security with an odd last period",
		abstract: "Returns the price per $100 face value of a security with an odd last period",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/oddlprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "The security's settlement date."
			},
			maturity: {
				name: "maturity",
				detail: "The security's maturity date."
			},
			lastInterest: {
				name: "last_interest",
				detail: "The security's last coupon date."
			},
			rate: {
				name: "rate",
				detail: "The security's interest rate."
			},
			yld: {
				name: "yld",
				detail: "The security's annual yield."
			},
			redemption: {
				name: "redemption",
				detail: "The security's redemption value per $100 face value."
			},
			frequency: {
				name: "frequency",
				detail: "The number of coupon payments per year. For annual payments, frequency = 1; for semiannual, frequency = 2; for quarterly, frequency = 4."
			},
			basis: {
				name: "basis",
				detail: "The type of day count basis to use."
			}
		}
	},
	ODDLYIELD: {
		description: "Returns the yield of a security with an odd last period",
		abstract: "Returns the yield of a security with an odd last period",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/oddlyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "The security's settlement date."
			},
			maturity: {
				name: "maturity",
				detail: "The security's maturity date."
			},
			lastInterest: {
				name: "last_interest",
				detail: "The security's last coupon date."
			},
			rate: {
				name: "rate",
				detail: "The security's interest rate."
			},
			pr: {
				name: "pr",
				detail: "The security's price."
			},
			redemption: {
				name: "redemption",
				detail: "The security's redemption value per $100 face value."
			},
			frequency: {
				name: "frequency",
				detail: "The number of coupon payments per year. For annual payments, frequency = 1; for semiannual, frequency = 2; for quarterly, frequency = 4."
			},
			basis: {
				name: "basis",
				detail: "The type of day count basis to use."
			}
		}
	},
	PDURATION: {
		description: "Returns the number of periods required by an investment to reach a specified value",
		abstract: "Returns the number of periods required by an investment to reach a specified value",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/pduration-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Rate is the interest rate per period."
			},
			pv: {
				name: "pv",
				detail: "Pv is the present value of the investment."
			},
			fv: {
				name: "fv",
				detail: "Fv is the desired future value of the investment."
			}
		}
	},
	PMT: {
		description: "Returns the periodic payment for an annuity",
		abstract: "Returns the periodic payment for an annuity",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/pmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "The interest rate per period."
			},
			nper: {
				name: "nper",
				detail: "The total number of payment periods in an annuity."
			},
			pv: {
				name: "pv",
				detail: "The present value, or the lump-sum amount that a series of future payments is worth right now."
			},
			fv: {
				name: "fv",
				detail: "The future value, or a cash balance you want to attain after the last payment is made."
			},
			type: {
				name: "type",
				detail: "The number 0 or 1 and indicates when payments are due."
			}
		}
	},
	PPMT: {
		description: "Returns the payment on the principal for an investment for a given period",
		abstract: "Returns the payment on the principal for an investment for a given period",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/ppmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "The interest rate per period."
			},
			per: {
				name: "per",
				detail: "The period for which you want to find the interest and must be in the range 1 to nper."
			},
			nper: {
				name: "nper",
				detail: "The total number of payment periods in an annuity."
			},
			pv: {
				name: "pv",
				detail: "The present value, or the lump-sum amount that a series of future payments is worth right now."
			},
			fv: {
				name: "fv",
				detail: "The future value, or a cash balance you want to attain after the last payment is made."
			},
			type: {
				name: "type",
				detail: "The number 0 or 1 and indicates when payments are due."
			}
		}
	},
	PRICE: {
		description: "Returns the price per $100 face value of a security that pays periodic interest",
		abstract: "Returns the price per $100 face value of a security that pays periodic interest",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/price-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "The security's settlement date."
			},
			maturity: {
				name: "maturity",
				detail: "The security's maturity date."
			},
			rate: {
				name: "rate",
				detail: "The security's interest rate."
			},
			yld: {
				name: "yld",
				detail: "The security's annual yield."
			},
			redemption: {
				name: "redemption",
				detail: "The security's redemption value per $100 face value."
			},
			frequency: {
				name: "frequency",
				detail: "The number of coupon payments per year. For annual payments, frequency = 1; for semiannual, frequency = 2; for quarterly, frequency = 4."
			},
			basis: {
				name: "basis",
				detail: "The type of day count basis to use."
			}
		}
	},
	PRICEDISC: {
		description: "Returns the price per $100 face value of a discounted security",
		abstract: "Returns the price per $100 face value of a discounted security",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/pricedisc-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "The security's settlement date."
			},
			maturity: {
				name: "maturity",
				detail: "The security's maturity date."
			},
			discount: {
				name: "discount",
				detail: "The security's discount rate."
			},
			redemption: {
				name: "redemption",
				detail: "The security's redemption value per $100 face value."
			},
			basis: {
				name: "basis",
				detail: "The type of day count basis to use."
			}
		}
	},
	PRICEMAT: {
		description: "Returns the price per $100 face value of a security that pays interest at maturity",
		abstract: "Returns the price per $100 face value of a security that pays interest at maturity",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/pricemat-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "The security's settlement date."
			},
			maturity: {
				name: "maturity",
				detail: "The security's maturity date."
			},
			issue: {
				name: "issue",
				detail: "The security's issue date."
			},
			rate: {
				name: "rate",
				detail: "The security's interest rate."
			},
			yld: {
				name: "yld",
				detail: "The security's annual yield."
			},
			basis: {
				name: "basis",
				detail: "The type of day count basis to use."
			}
		}
	},
	PV: {
		description: "Returns the present value of an investment",
		abstract: "Returns the present value of an investment",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/pv-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "The interest rate per period."
			},
			nper: {
				name: "nper",
				detail: "The total number of payment periods in an annuity."
			},
			pmt: {
				name: "pmt",
				detail: "The payment made each period; it cannot change over the life of the annuity."
			},
			fv: {
				name: "fv",
				detail: "The future value, or a cash balance you want to attain after the last payment is made."
			},
			type: {
				name: "type",
				detail: "The number 0 or 1 and indicates when payments are due."
			}
		}
	},
	RATE: {
		description: "Returns the interest rate per period of an annuity",
		abstract: "Returns the interest rate per period of an annuity",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/rate-function"
		}],
		functionParameter: {
			nper: {
				name: "nper",
				detail: "The total number of payment periods in an annuity."
			},
			pmt: {
				name: "pmt",
				detail: "The payment made each period; it cannot change over the life of the annuity."
			},
			pv: {
				name: "pv",
				detail: "The present value, or the lump-sum amount that a series of future payments is worth right now."
			},
			fv: {
				name: "fv",
				detail: "The future value, or a cash balance you want to attain after the last payment is made."
			},
			type: {
				name: "type",
				detail: "The number 0 or 1 and indicates when payments are due."
			},
			guess: {
				name: "guess",
				detail: "Your guess for what the rate will be."
			}
		}
	},
	RECEIVED: {
		description: "Returns the amount received at maturity for a fully invested security",
		abstract: "Returns the amount received at maturity for a fully invested security",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/received-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "The security's settlement date."
			},
			maturity: {
				name: "maturity",
				detail: "The security's maturity date."
			},
			investment: {
				name: "investment",
				detail: "The amount invested in the security."
			},
			discount: {
				name: "discount",
				detail: "The security's discount rate."
			},
			basis: {
				name: "basis",
				detail: "The type of day count basis to use."
			}
		}
	},
	RRI: {
		description: "Returns an equivalent interest rate for the growth of an investment",
		abstract: "Returns an equivalent interest rate for the growth of an investment",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/rri-function"
		}],
		functionParameter: {
			nper: {
				name: "nper",
				detail: "Nper is the number of periods for the investment."
			},
			pv: {
				name: "pv",
				detail: "Pv is the present value of the investment."
			},
			fv: {
				name: "fv",
				detail: "Fv is the future value of the investment."
			}
		}
	},
	SLN: {
		description: "Returns the straight-line depreciation of an asset for one period",
		abstract: "Returns the straight-line depreciation of an asset for one period",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/sln-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "The initial cost of the asset."
			},
			salvage: {
				name: "salvage",
				detail: "The value at the end of the depreciation (sometimes called the salvage value of the asset)."
			},
			life: {
				name: "life",
				detail: "The number of periods over which the asset is depreciated (sometimes called the useful life of the asset)."
			}
		}
	},
	SYD: {
		description: "Returns the sum-of-years' digits depreciation of an asset for a specified period",
		abstract: "Returns the sum-of-years' digits depreciation of an asset for a specified period",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/syd-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "The initial cost of the asset."
			},
			salvage: {
				name: "salvage",
				detail: "The value at the end of the depreciation (sometimes called the salvage value of the asset)."
			},
			life: {
				name: "life",
				detail: "The number of periods over which the asset is depreciated (sometimes called the useful life of the asset)."
			},
			per: {
				name: "per",
				detail: "The period and must use the same units as life."
			}
		}
	},
	TBILLEQ: {
		description: "Returns the bond-equivalent yield for a Treasury bill",
		abstract: "Returns the bond-equivalent yield for a Treasury bill",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/tbilleq-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "The Treasury bill's settlement date."
			},
			maturity: {
				name: "maturity",
				detail: "The Treasury bill's maturity date."
			},
			discount: {
				name: "discount",
				detail: "The Treasury bill's discount rate."
			}
		}
	},
	TBILLPRICE: {
		description: "Returns the price per $100 face value for a Treasury bill",
		abstract: "Returns the price per $100 face value for a Treasury bill",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/tbillprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "The Treasury bill's settlement date."
			},
			maturity: {
				name: "maturity",
				detail: "The Treasury bill's maturity date."
			},
			discount: {
				name: "discount",
				detail: "The Treasury bill's discount rate."
			}
		}
	},
	TBILLYIELD: {
		description: "Returns the yield for a Treasury bill",
		abstract: "Returns the yield for a Treasury bill",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/tbillyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "The Treasury bill's settlement date."
			},
			maturity: {
				name: "maturity",
				detail: "The Treasury bill's maturity date."
			},
			pr: {
				name: "pr",
				detail: "The Treasury bill's price per $100 face value."
			}
		}
	},
	VDB: {
		description: "Returns the depreciation of an asset for a specified or partial period by using a declining balance method",
		abstract: "Returns the depreciation of an asset for a specified or partial period by using a declining balance method",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/vdb-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "The initial cost of the asset."
			},
			salvage: {
				name: "salvage",
				detail: "The value at the end of the depreciation (sometimes called the salvage value of the asset)."
			},
			life: {
				name: "life",
				detail: "The number of periods over which the asset is being depreciated (sometimes called the useful life of the asset)."
			},
			startPeriod: {
				name: "start_period",
				detail: "The starting period for which you want to calculate the depreciation."
			},
			endPeriod: {
				name: "end_period",
				detail: "The ending period for which you want to calculate the depreciation."
			},
			factor: {
				name: "factor",
				detail: "The rate at which the balance declines. If factor is omitted, it is assumed to be 2 (the double-declining balance method)."
			},
			noSwitch: {
				name: "no_switch",
				detail: "A logical value specifying whether to switch to straight-line depreciation when depreciation is greater than the declining balance calculation."
			}
		}
	},
	XIRR: {
		description: "Returns the internal rate of return for a schedule of cash flows that is not necessarily periodic",
		abstract: "Returns the internal rate of return for a schedule of cash flows that is not necessarily periodic",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/xirr-function"
		}],
		functionParameter: {
			values: {
				name: "values",
				detail: "A series of cash flows that corresponds to a schedule of payments in dates. The first payment is optional and corresponds to a cost or payment that occurs at the beginning of the investment. If the first value is a cost or payment, it must be a negative value. All succeeding payments are discounted based on a 365-day year. The series of values must contain at least one positive and one negative value."
			},
			dates: {
				name: "dates",
				detail: "A schedule of payment dates that corresponds to the cash flow payments. Dates may occur in any order."
			},
			guess: {
				name: "guess",
				detail: "A number that you guess is close to the result of XIRR."
			}
		}
	},
	XNPV: {
		description: "Returns the net present value for a schedule of cash flows that is not necessarily periodic",
		abstract: "Returns the net present value for a schedule of cash flows that is not necessarily periodic",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/xnpv-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "The discount rate to apply to the cash flows."
			},
			values: {
				name: "values",
				detail: "A series of cash flows that corresponds to a schedule of payments in dates. The first payment is optional and corresponds to a cost or payment that occurs at the beginning of the investment. If the first value is a cost or payment, it must be a negative value. All succeeding payments are discounted based on a 365-day year. The series of values must contain at least one positive and one negative value."
			},
			dates: {
				name: "dates",
				detail: "A schedule of payment dates that corresponds to the cash flow payments. Dates may occur in any order."
			}
		}
	},
	YIELD: {
		description: "Returns the yield on a security that pays periodic interest",
		abstract: "Returns the yield on a security that pays periodic interest",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/yield-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "The security's settlement date."
			},
			maturity: {
				name: "maturity",
				detail: "The security's maturity date."
			},
			rate: {
				name: "rate",
				detail: "The security's interest rate."
			},
			pr: {
				name: "pr",
				detail: "The security's price per $100 face value."
			},
			redemption: {
				name: "redemption",
				detail: "The security's redemption value per $100 face value."
			},
			frequency: {
				name: "frequency",
				detail: "The number of coupon payments per year. For annual payments, frequency = 1; for semiannual, frequency = 2; for quarterly, frequency = 4."
			},
			basis: {
				name: "basis",
				detail: "The type of day count basis to use."
			}
		}
	},
	YIELDDISC: {
		description: "Returns the annual yield for a discounted security; for example, a Treasury bill",
		abstract: "Returns the annual yield for a discounted security; for example, a Treasury bill",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/yielddisc-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "The security's settlement date."
			},
			maturity: {
				name: "maturity",
				detail: "The security's maturity date."
			},
			pr: {
				name: "pr",
				detail: "The security's price per $100 face value."
			},
			redemption: {
				name: "redemption",
				detail: "The security's redemption value per $100 face value."
			},
			basis: {
				name: "basis",
				detail: "The type of day count basis to use."
			}
		}
	},
	YIELDMAT: {
		description: "Returns the annual yield of a security that pays interest at maturity",
		abstract: "Returns the annual yield of a security that pays interest at maturity",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/yieldmat-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "The security's settlement date."
			},
			maturity: {
				name: "maturity",
				detail: "The security's maturity date."
			},
			issue: {
				name: "issue",
				detail: "The security's issue date."
			},
			rate: {
				name: "rate",
				detail: "The security's interest rate."
			},
			pr: {
				name: "pr",
				detail: "The security's price per $100 face value."
			},
			basis: {
				name: "basis",
				detail: "The type of day count basis to use."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/information/en-US.ts
/**
* Copyright 2023-present DreamNum Co., Ltd.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const locale$7 = {
	CELL: {
		description: "Returns information about the formatting, location, or contents of a cell",
		abstract: "Returns information about the formatting, location, or contents of a cell",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/cell-function"
		}],
		functionParameter: {
			infoType: {
				name: "info_type",
				detail: "A text value that specifies what type of cell information you want to return."
			},
			reference: {
				name: "reference",
				detail: "The cell that you want information about."
			}
		}
	},
	ERROR_TYPE: {
		description: "Returns a number corresponding to an error type",
		abstract: "Returns a number corresponding to an error type",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/error-type-function"
		}],
		functionParameter: { errorVal: {
			name: "error_val",
			detail: "The error value whose identifying number you want to find."
		} }
	},
	INFO: {
		description: "Returns information about the current operating environment",
		abstract: "Returns information about the current operating environment",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/info-function"
		}],
		functionParameter: { typeText: {
			name: "Type_text",
			detail: "Required. Text that specifies what type of information you want returned."
		} }
	},
	ISBETWEEN: {
		description: "Checks whether a provided number is between two other numbers either inclusively or exclusively.",
		abstract: "Checks whether a provided number is between two other numbers either inclusively or exclusively.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/10538337?hl=en"
		}],
		functionParameter: {
			valueToCompare: {
				name: "value_to_compare",
				detail: "The value to test as being between `lower_value` and `upper_value`."
			},
			lowerValue: {
				name: "lower_value",
				detail: "The lower boundary of the range of values that `value_to_compare` can fall within."
			},
			upperValue: {
				name: "upper_value",
				detail: "The upper boundary of the range of values that `value_to_compare` can fall within."
			},
			lowerValueIsInclusive: {
				name: "lower_value_is_inclusive",
				detail: "Whether the range of values includes the `lower_value`. By default this is TRUE"
			},
			upperValueIsInclusive: {
				name: "upper_value_is_inclusive",
				detail: "Whether the range of values includes the `upper_value`. By default this is TRUE"
			}
		}
	},
	ISBLANK: {
		description: "Returns TRUE if the value is blank",
		abstract: "Returns TRUE if the value is blank",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "The value that you want tested. The value argument can be a blank (empty cell), error, logical value, text, number, or reference value, or a name referring to any of these."
		} }
	},
	ISDATE: {
		description: "The ISDATE function returns whether a value is a date.",
		abstract: "The ISDATE function returns whether a value is a date.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9061381?hl=en"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "The value to be verified as a date."
		} }
	},
	ISEMAIL: {
		description: "To check if a value is a valid email address, use the ISEMAIL function. This checks if the value follows a commonly accepted format for email addresses but doesn’t verify its existence.",
		abstract: "To check if a value is a valid email address, use the ISEMAIL function. This checks if the value follows a commonly accepted format for email addresses but doesn’t verify its existence.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3256503?hl=en"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "The value to be verified as an email address."
		} }
	},
	ISERR: {
		description: "Returns TRUE if the value is any error value except #N/A",
		abstract: "Returns TRUE if the value is any error value except #N/A",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "The value that you want tested. The value argument can be a blank (empty cell), error, logical value, text, number, or reference value, or a name referring to any of these."
		} }
	},
	ISERROR: {
		description: "Returns TRUE if the value is any error value",
		abstract: "Returns TRUE if the value is any error value",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "The value that you want tested. The value argument can be a blank (empty cell), error, logical value, text, number, or reference value, or a name referring to any of these."
		} }
	},
	ISEVEN: {
		description: "Returns TRUE if number is even, or FALSE if number is odd.",
		abstract: "Returns TRUE if number is even, or FALSE if number is odd.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/iseven-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Required. The value to test. If number is not an integer, it is truncated."
		} }
	},
	ISFORMULA: {
		description: "Returns TRUE if there is a reference to a cell that contains a formula",
		abstract: "Returns TRUE if there is a reference to a cell that contains a formula",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/isformula-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "Reference is a reference to the cell you want to test."
		} }
	},
	ISLOGICAL: {
		description: "Returns TRUE if the value is a logical value",
		abstract: "Returns TRUE if the value is a logical value",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "The value that you want tested. The value argument can be a blank (empty cell), error, logical value, text, number, or reference value, or a name referring to any of these."
		} }
	},
	ISNA: {
		description: "Returns TRUE if the value is the #N/A error value",
		abstract: "Returns TRUE if the value is the #N/A error value",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "The value that you want tested. The value argument can be a blank (empty cell), error, logical value, text, number, or reference value, or a name referring to any of these."
		} }
	},
	ISNONTEXT: {
		description: "Returns TRUE if the value is not text",
		abstract: "Returns TRUE if the value is not text",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "The value that you want tested. The value argument can be a blank (empty cell), error, logical value, text, number, or reference value, or a name referring to any of these."
		} }
	},
	ISNUMBER: {
		description: "Returns TRUE if the value is a number",
		abstract: "Returns TRUE if the value is a number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "The value that you want tested. The value argument can be a blank (empty cell), error, logical value, text, number, or reference value, or a name referring to any of these."
		} }
	},
	ISODD: {
		description: "Returns TRUE if the number is odd",
		abstract: "Returns TRUE if the number is odd",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/isodd-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "The value to test. If number is not an integer, it is truncated."
		} }
	},
	ISOMITTED: {
		description: "Checks whether the value in a&nbsp;LAMBDA&nbsp;is missing and returns TRUE or FALSE",
		abstract: "Checks whether the value in a&nbsp;LAMBDA&nbsp;is missing and returns TRUE or FALSE",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/isomitted-function"
		}],
		functionParameter: { argument: {
			name: "argument",
			detail: "The value you want to test, such as a LAMBDA parameter."
		} }
	},
	ISREF: {
		description: "Returns TRUE if the value is a reference",
		abstract: "Returns TRUE if the value is a reference",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "The value that you want tested. The value argument can be a blank (empty cell), error, logical value, text, number, or reference value, or a name referring to any of these."
		} }
	},
	ISTEXT: {
		description: "Returns TRUE if the value is text",
		abstract: "Returns TRUE if the value is text",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "The value that you want tested. The value argument can be a blank (empty cell), error, logical value, text, number, or reference value, or a name referring to any of these."
		} }
	},
	ISURL: {
		description: "Checks whether a value is a valid URL.",
		abstract: "Checks whether a value is a valid URL.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3256501?hl=en"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "The value to be verified as a URL."
		} }
	},
	N: {
		description: "Returns a value converted to a number",
		abstract: "Returns a value converted to a number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/n-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "The value you want converted."
		} }
	},
	NA: {
		description: "Returns the error value #N/A",
		abstract: "Returns the error value #N/A",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/na-function"
		}],
		functionParameter: {}
	},
	SHEET: {
		description: "Returns the sheet number of the referenced sheet",
		abstract: "Returns the sheet number of the referenced sheet",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/sheet-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Value is the name of a sheet or a reference for which you want the sheet number. If value is omitted, SHEET returns the number of the sheet that contains the function."
		} }
	},
	SHEETS: {
		description: "Returns the number of sheets in a workbook",
		abstract: "Returns the number of sheets in a workbook",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/sheets-function"
		}],
		functionParameter: {}
	},
	TYPE: {
		description: "Returns a number indicating the data type of a value",
		abstract: "Returns a number indicating the data type of a value",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/type-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Can be any value, such as a number, text, logical value, and so on."
		} }
	}
};

//#endregion
//#region src/locale/function-list/logical/en-US.ts
/**
* Copyright 2023-present DreamNum Co., Ltd.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const locale$6 = {
	AND: {
		description: "Returns TRUE if all of its arguments are TRUE",
		abstract: "Returns TRUE if all of its arguments are TRUE",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/and-function"
		}],
		functionParameter: {
			logical1: {
				name: "logical1",
				detail: "The first condition that you want to test that can evaluate to either TRUE or FALSE."
			},
			logical2: {
				name: "logical2",
				detail: "Additional conditions that you want to test that can evaluate to either TRUE or FALSE, up to a maximum of 255 conditions."
			}
		}
	},
	BYCOL: {
		description: "Applies a LAMBDA to each column and returns an array of the results",
		abstract: "Applies a LAMBDA to each column and returns an array of the results",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/bycol-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "An array to be separated by column."
			},
			lambda: {
				name: "lambda",
				detail: "A LAMBDA that takes a column as a single parameter and calculates one result. The LAMBDA takes a single parameter: A column from array."
			}
		}
	},
	BYROW: {
		description: "Applies a LAMBDA to each row and returns an array of the results",
		abstract: "Applies a LAMBDA to each row and returns an array of the results",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/byrow-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "An array to be separated by row."
			},
			lambda: {
				name: "lambda",
				detail: "A LAMBDA that takes a row as a single parameter and calculates one result. The LAMBDA takes a single parameter: A row from array."
			}
		}
	},
	FALSE: {
		description: "Returns the logical value FALSE.",
		abstract: "Returns the logical value FALSE.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/false-function"
		}],
		functionParameter: {}
	},
	IF: {
		description: "Specifies a logical test to perform",
		abstract: "Specifies a logical test to perform",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/if-function"
		}],
		functionParameter: {
			logicalTest: {
				name: "logical_test",
				detail: "The condition you want to test."
			},
			valueIfTrue: {
				name: "value_if_true",
				detail: "The value that you want returned if the result of logical_test is TRUE."
			},
			valueIfFalse: {
				name: "value_if_false",
				detail: "The value that you want returned if the result of logical_test is FALSE."
			}
		}
	},
	IFERROR: {
		description: "Returns a value you specify if a formula evaluates to an error; otherwise, returns the result of the formula",
		abstract: "Returns a value you specify if a formula evaluates to an error; otherwise, returns the result of the formula",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/iferror-function"
		}],
		functionParameter: {
			value: {
				name: "value",
				detail: "The argument that is checked for an error."
			},
			valueIfError: {
				name: "value_if_error",
				detail: "The value to return if the formula evaluates to an error. The following error types are evaluated: #N/A, #VALUE!, #REF!, #DIV/0!, #NUM!, #NAME?, or #NULL!."
			}
		}
	},
	IFNA: {
		description: "Returns the value you specify if the expression resolves to #N/A, otherwise returns the result of the expression",
		abstract: "Returns the value you specify if the expression resolves to #N/A, otherwise returns the result of the expression",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/ifna-function"
		}],
		functionParameter: {
			value: {
				name: "value",
				detail: "The argument that is checked for the #N/A error value."
			},
			valueIfNa: {
				name: "value_if_na",
				detail: "The value to return if the formula evaluates to the #N/A error value."
			}
		}
	},
	IFS: {
		description: "Checks whether one or more conditions are met and returns a value that corresponds to the first TRUE condition.",
		abstract: "Checks whether one or more conditions are met and returns a value that corresponds to the first TRUE condition.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/ifs-function"
		}],
		functionParameter: {
			logicalTest1: {
				name: "logical_test1",
				detail: "Condition that evaluates to TRUE or FALSE."
			},
			valueIfTrue1: {
				name: "value_if_true1",
				detail: "Result to be returned if logical_test1 evaluates to TRUE. Can be empty."
			},
			logicalTest2: {
				name: "logical_test2",
				detail: "Condition that evaluates to TRUE or FALSE."
			},
			valueIfTrue2: {
				name: "value_if_true2",
				detail: "Result to be returned if logical_testN evaluates to TRUE. Each value_if_trueN corresponds with a condition logical_testN. Can be empty."
			}
		}
	},
	LAMBDA: {
		description: "Use a LAMBDA function to create custom, reusable functions and call them by a friendly name. The new function is available throughout the workbook and called like native Excel functions.",
		abstract: "Create custom, reusable functions and call them by a friendly name",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/lambda-function"
		}],
		functionParameter: {
			parameter: {
				name: "parameter",
				detail: "A value that you want to pass to the function, such as a cell reference, string or number. You can enter up to 253 parameters. This argument is optional."
			},
			calculation: {
				name: "calculation",
				detail: "The formula you want to execute and return as the result of the function. It must be the last argument and it must return a result. This argument is required."
			}
		}
	},
	LET: {
		description: "Assigns names to calculation results",
		abstract: "Assigns names to calculation results",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/let-function"
		}],
		functionParameter: {
			name1: {
				name: "name1",
				detail: "The first name to assign. Must start with a letter. Cannot be the output of a formula or conflict with range syntax."
			},
			nameValue1: {
				name: "name_value1",
				detail: "The value that is assigned to name1."
			},
			calculationOrName2: {
				name: "calculation_or_name2",
				detail: "One of the following:\n1.A calculation that uses all names within the LET function. This must be the last argument in the LET function.\n2.A second name to assign to a second name_value. If a name is specified, name_value2 and calculation_or_name3 become required."
			},
			nameValue2: {
				name: "name_value2",
				detail: "The value that is assigned to calculation_or_name2."
			},
			calculationOrName3: {
				name: "calculation_or_name3",
				detail: "One of the following:\n1.A calculation that uses all names within the LET function. The last argument in the LET function must be a calculation.\n2.A third name to assign to a third name_value. If a name is specified, name_value3 and calculation_or_name4 become required."
			}
		}
	},
	MAKEARRAY: {
		description: "Returns a calculated array of a specified row and column size, by applying a LAMBDA",
		abstract: "Returns a calculated array of a specified row and column size, by applying a LAMBDA",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/makearray-function"
		}],
		functionParameter: {
			number1: {
				name: "rows",
				detail: "The number of rows in the array. Must be greater than zero."
			},
			number2: {
				name: "cols",
				detail: "The number of columns in the array. Must be greater than zero."
			},
			value3: {
				name: "lambda",
				detail: "A LAMBDA that is called to create the array. The LAMBDA takes two parameters: row (The row index of the array), col (The column index of the array)."
			}
		}
	},
	MAP: {
		description: "Returns an array formed by mapping each value in the array(s) to a new value by applying a LAMBDA to create a new value.",
		abstract: "Returns an array formed by mapping each value in the array(s) to a new value by applying a LAMBDA to create a new value.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/map-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "An array1 to be mapped."
			},
			array2: {
				name: "array2",
				detail: "An array2 to be mapped."
			},
			lambda: {
				name: "lambda",
				detail: "A LAMBDA which must be the last argument and which must have either a parameter for each array passed."
			}
		}
	},
	NOT: {
		description: "Reverses the logic of its argument.",
		abstract: "Reverses the logic of its argument.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/not-function"
		}],
		functionParameter: { logical: {
			name: "logical",
			detail: "The condition that you want to reverse the logic for, which can evaluate to either TRUE or FALSE."
		} }
	},
	OR: {
		description: "Returns TRUE if any of its arguments evaluate to TRUE, and returns FALSE if all of its arguments evaluate to FALSE.",
		abstract: "Returns TRUE if any argument is TRUE",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/or-function"
		}],
		functionParameter: {
			logical1: {
				name: "logical1",
				detail: "The first condition that you want to test that can evaluate to either TRUE or FALSE."
			},
			logical2: {
				name: "logical2",
				detail: "Additional conditions that you want to test that can evaluate to either TRUE or FALSE, up to a maximum of 255 conditions."
			}
		}
	},
	REDUCE: {
		description: "Reduces an array to an accumulated value by applying a LAMBDA to each value and returning the total value in the accumulator.",
		abstract: "Reduces an array to an accumulated value by applying a LAMBDA to each value and returning the total value in the accumulator.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/reduce-function"
		}],
		functionParameter: {
			initialValue: {
				name: "initial_value",
				detail: "Sets the starting value for the accumulator."
			},
			array: {
				name: "array",
				detail: "An array to be reduced."
			},
			lambda: {
				name: "lambda",
				detail: "A LAMBDA that is called to reduce the array. The LAMBDA takes three parameters: 1.The value totaled up and returned as the final result. 2.The current value from the array. 3.The calculation applied to each element in the array."
			}
		}
	},
	SCAN: {
		description: "Scans an array by applying a LAMBDA to each value and returns an array that has each intermediate value.",
		abstract: "Scans an array by applying a LAMBDA to each value and returns an array that has each intermediate value.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/scan-function"
		}],
		functionParameter: {
			initialValue: {
				name: "initial_value",
				detail: "Sets the starting value for the accumulator."
			},
			array: {
				name: "array",
				detail: "An array to be scanned."
			},
			lambda: {
				name: "lambda",
				detail: "A LAMBDA that is called to scanned the array. The LAMBDA takes three parameters: 1.The value totaled up and returned as the final result. 2.The current value from the array. 3.The calculation applied to each element in the array."
			}
		}
	},
	SWITCH: {
		description: "Evaluates an expression against a list of values and returns the result corresponding to the first matching value. If there is no match, an optional default value may be returned.",
		abstract: "Evaluates an expression against a list of values and returns the result corresponding to the first matching value. If there is no match, an optional default value may be returned.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/switch-function"
		}],
		functionParameter: {
			expression: {
				name: "expression",
				detail: "Expression is the value (such as a number, date or some text) that will be compared against value1…value126."
			},
			value1: {
				name: "value1",
				detail: "ValueN is a value that will be compared against expression."
			},
			result1: {
				name: "result1",
				detail: "ResultN is the value to be returned when the corresponding valueN argument matches expression. ResultN and must be supplied for each corresponding valueN argument."
			},
			defaultOrValue2: {
				name: "default_or_value2",
				detail: "Default is the value to return in case no matches are found in the valueN expressions. The Default argument is identified by having no corresponding resultN expression (see examples). Default must be the final argument in the function."
			},
			result2: {
				name: "result2",
				detail: "ResultN is the value to be returned when the corresponding valueN argument matches expression. ResultN and must be supplied for each corresponding valueN argument."
			}
		}
	},
	TRUE: {
		description: "Returns the logical value TRUE.",
		abstract: "Returns the logical value TRUE.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/true-function"
		}],
		functionParameter: {}
	},
	XOR: {
		description: "Returns TRUE if an odd number of its arguments evaluate to TRUE, and FALSE if an even number of its arguments evaluate to TRUE.",
		abstract: "Returns TRUE if an odd number of arguments are TRUE",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/xor-function"
		}],
		functionParameter: {
			logical1: {
				name: "logical1",
				detail: "The first condition that you want to test that can evaluate to either TRUE or FALSE."
			},
			logical2: {
				name: "logical2",
				detail: "Additional conditions that you want to test that can evaluate to either TRUE or FALSE, up to a maximum of 255 conditions."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/lookup/en-US.ts
/**
* Copyright 2023-present DreamNum Co., Ltd.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const locale$5 = {
	ADDRESS: {
		description: "Obtain the address of a cell in a worksheet, given specified row and column numbers. For example, ADDRESS(2,3) returns $C$2. As another example, ADDRESS(77,300) returns $KN$77. You can use other functions, such as the ROW and COLUMN functions, to provide the row and column number arguments for the ADDRESS function.",
		abstract: "Returns a reference as text to a single cell in a worksheet",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/address-function"
		}],
		functionParameter: {
			row_num: {
				name: "row number",
				detail: "A numeric value that specifies the row number to use in the cell reference."
			},
			column_num: {
				name: "column number",
				detail: "A numeric value that specifies the column number to use in the cell reference."
			},
			abs_num: {
				name: "type of reference",
				detail: "A numeric value that specifies the type of reference to return."
			},
			a1: {
				name: "style of reference",
				detail: "A logical value that specifies the A1 or R1C1 reference style. In A1 style, columns are labeled alphabetically, and rows are labeled numerically. In R1C1 reference style, both columns and rows are labeled numerically. If the A1 argument is TRUE or omitted, the ADDRESS function returns an A1-style reference; if FALSE, the ADDRESS function returns an R1C1-style reference."
			},
			sheet_text: {
				name: "worksheet name",
				detail: "A text value that specifies the name of the worksheet to be used as the external reference. For example, the formula =ADDRESS(1,1,,,\"Sheet2\") returns Sheet2!$A$1. If the sheet_text argument is omitted, no sheet name is used, and the address returned by the function refers to a cell on the current sheet."
			}
		}
	},
	AREAS: {
		description: "Returns the number of areas in a reference",
		abstract: "Returns the number of areas in a reference",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/areas-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "A reference to a cell or range of cells and can refer to multiple areas."
		} }
	},
	CHOOSE: {
		description: "Chooses a value from a list of values.",
		abstract: "Chooses a value from a list of values",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/choose-function"
		}],
		functionParameter: {
			indexNum: {
				name: "index_num",
				detail: "Specifies which value argument is selected. Index_num must be a number between 1 and 254, or a formula or reference to a cell containing a number between 1 and 254.\nIf index_num is 1, CHOOSE returns value1; if it is 2, CHOOSE returns value2; and so on.\nIf index_num is less than 1 or greater than the number of the last value in the list, CHOOSE returns the #VALUE! error value.\nIf index_num is a fraction, it is truncated to the lowest integer before being used."
			},
			value1: {
				name: "value1",
				detail: "CHOOSE selects a value or an action to perform based on index_num. The arguments can be numbers, cell references, defined names, formulas, functions, or text."
			},
			value2: {
				name: "value2",
				detail: "1 to 254 value arguments."
			}
		}
	},
	CHOOSECOLS: {
		description: "Returns the specified columns from an array",
		abstract: "Returns the specified columns from an array",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/choosecols-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "The array containing the columns to be returned in the new array."
			},
			colNum1: {
				name: "col_num1",
				detail: "The first column to be returned."
			},
			colNum2: {
				name: "col_num2",
				detail: "Additional columns to be returned."
			}
		}
	},
	CHOOSEROWS: {
		description: "Returns the specified rows from an array",
		abstract: "Returns the specified rows from an array",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/chooserows-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "The array containing the rows to be returned in the new array."
			},
			rowNum1: {
				name: "row_num1",
				detail: "The first row number to be returned."
			},
			rowNum2: {
				name: "row_num2",
				detail: "Additional row numbers to be returned."
			}
		}
	},
	COLUMN: {
		description: "Returns the column number of the given cell reference.",
		abstract: "Returns the column number of a reference",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/column-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "The cell or range of cells for which you want to return the column number."
		} }
	},
	COLUMNS: {
		description: "Returns the number of columns in an array or reference.",
		abstract: "Returns the number of columns in a reference",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/columns-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "An array or array formula, or a reference to a range of cells for which you want the number of columns."
		} }
	},
	DROP: {
		description: "Excludes a specified number of rows or columns from the start or end of an array",
		abstract: "Excludes a specified number of rows or columns from the start or end of an array",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/drop-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "The array from which to drop rows or columns."
			},
			rows: {
				name: "rows",
				detail: "The number of rows to drop. A negative value drops from the end of the array."
			},
			columns: {
				name: "columns",
				detail: "The number of columns to exclude. A negative value drops from the end of the array."
			}
		}
	},
	EXPAND: {
		description: "Expands or pads an array to specified row and column dimensions",
		abstract: "Expands or pads an array to specified row and column dimensions",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/expand-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "The array to expand."
			},
			rows: {
				name: "rows",
				detail: "The number of rows in the expanded array. If missing, rows will not be expanded."
			},
			columns: {
				name: "columns",
				detail: "The number of columns in the expanded array. If missing, columns will not be expanded."
			},
			padWith: {
				name: "pad_with",
				detail: "The value with which to pad. The default is #N/A."
			}
		}
	},
	FILTER: {
		description: "The FILTER function allows you to filter a range of data based on criteria you define.",
		abstract: "The FILTER function allows you to filter a range of data based on criteria you define.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/filter-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "The range or array to filter."
			},
			include: {
				name: "include",
				detail: "An array of Boolean values ​​where TRUE indicates that a row or column is to be retained."
			},
			ifEmpty: {
				name: "if_empty",
				detail: "If no items are reserved, return."
			}
		}
	},
	FORMULATEXT: {
		description: "Returns the formula at the given reference as text",
		abstract: "Returns the formula at the given reference as text",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/formulatext-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "A reference to a cell or range of cells."
		} }
	},
	GETPIVOTDATA: {
		description: "Returns data stored in a PivotTable report",
		abstract: "Returns data stored in a PivotTable report",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/getpivotdata-function"
		}],
		functionParameter: {
			dataField: {
				name: "dataField",
				detail: "The name of the PivotTable field that contains the data that you want to retrieve. This needs to be in quotes. Example: =GETPIVOTDATA(\"Sales\", A3). Here, \"Sales\" is the Values field that we want to retrieve. Since no other field is specified, GETPIVOTDATA returns the total sales amount."
			},
			pivotTable: {
				name: "pivotTable",
				detail: "A reference to any cell, range of cells, or named range of cells in a PivotTable. This information is used to determine which PivotTable contains the data that you want to retrieve. Example: =GETPIVOTDATA(\"Sales\", A3). Here, A3 is a reference inside the PivotTable and tells the formula which PivotTable to use."
			},
			field1: {
				name: "field1",
				detail: "1 to 126 pairs of field names and item names that describe the data that you want to retrieve. The pairs can be in any order. Field names and names for items other than dates and numbers need to be enclosed in quotation marks. Example: =GETPIVOTDATA(\"Sales\", A3, \"Month\", \"Mar\"). Here, \"Month\" is the field and \"Mar\" is the item. To specify multiple items for a field, enclose them in curly braces (for example: {\"Mar\", \"Apr\"}). For OLAP PivotTables , items can contain the source name of the dimension and also the source name of the item. A field and item pair for an OLAP PivotTable might look like this: \"[Product]\",\"[Product].[All Products].[Foods].[Baked Goods]\""
			},
			item1: {
				name: "item1",
				detail: "1 to 126 pairs of field names and item names that describe the data that you want to retrieve. The pairs can be in any order. Field names and names for items other than dates and numbers need to be enclosed in quotation marks. Example: =GETPIVOTDATA(\"Sales\", A3, \"Month\", \"Mar\"). Here, \"Month\" is the field and \"Mar\" is the item. To specify multiple items for a field, enclose them in curly braces (for example: {\"Mar\", \"Apr\"}). For OLAP PivotTables , items can contain the source name of the dimension and also the source name of the item. A field and item pair for an OLAP PivotTable might look like this: \"[Product]\",\"[Product].[All Products].[Foods].[Baked Goods]\""
			}
		}
	},
	HLOOKUP: {
		description: "Searches for a value in the top row of a table or an array of values, and then returns a value in the same column from a row you specify in the table or array. Use HLOOKUP when your comparison values are located in a row across the top of a table of data, and you want to look down a specified number of rows. Use VLOOKUP when your comparison values are located in a column to the left of the data you want to find.",
		abstract: "Searches for a value in the top row of a table or an array of values, and then returns a value in the same column from a row you specify in the table or array. Use HLOOKUP when your comparison values are located in a row across the top of a table of data, and you want to look down a specified number of rows. Use VLOOKUP when your comparison values are located in a column to the left of the data you want to find.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/hlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "Required. The value to be found in the first row of the table. Lookup_value can be a value, a reference, or a text string."
			},
			tableArray: {
				name: "table_array",
				detail: "Required. A table of information in which data is looked up. Use a reference to a range or a range name. The values in the first row of table_array can be text, numbers, or logical values. If range_lookup is TRUE, the values in the first row of table_array must be placed in ascending order: ...-2, -1, 0, 1, 2,... , A-Z, FALSE, TRUE; otherwise, HLOOKUP may not give the correct value. If range_lookup is FALSE, table_array does not need to be sorted. Uppercase and lowercase text are equivalent. Sort the values in ascending order, left to right. For more information, see Sort data in a range or table ."
			},
			rowIndexNum: {
				name: "row_index_num",
				detail: "Required. The row number in table_array from which the matching value will be returned. A row_index_num of 1 returns the first row value in table_array, a row_index_num of 2 returns the second row value in table_array, and so on. If row_index_num is less than 1, HLOOKUP returns the #VALUE! error value; if row_index_num is greater than the number of rows on table_array, HLOOKUP returns the #REF! error value."
			},
			rangeLookup: {
				name: "range_lookup",
				detail: "Optional. A logical value that specifies whether you want HLOOKUP to find an exact match or an approximate match. If TRUE or omitted, an approximate match is returned. In other words, if an exact match is not found, the next largest value that is less than lookup_value is returned. If FALSE, HLOOKUP will find an exact match. If one is not found, the error value #N/A is returned."
			}
		}
	},
	HSTACK: {
		description: "Appends arrays horizontally and in sequence to return a larger array",
		abstract: "Appends arrays horizontally and in sequence to return a larger array",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/hstack-function"
		}],
		functionParameter: {
			array1: {
				name: "array",
				detail: "The arrays to append."
			},
			array2: {
				name: "array",
				detail: "The arrays to append."
			}
		}
	},
	HYPERLINK: {
		description: "Creates a hyperlink inside a cell.",
		abstract: "Creates a hyperlink inside a cell.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3093313?hl=en"
		}],
		functionParameter: {
			url: {
				name: "url",
				detail: "The full URL of the link location enclosed in quotation marks, or a reference to a cell containing such a URL. Only certain link types are allowed. http:// , https:// , mailto: , aim: , ftp:// , gopher:// , telnet:// , and news:// are permitted; others are explicitly forbidden. If another protocol is specified, link_label will be displayed in the cell, but will not be hyperlinked. If no protocol is specified, http:// is assumed, and is prepended to url ."
			},
			linkLabel: {
				name: "link_label",
				detail: "[ OPTIONAL - url by default ] - The text to display in the cell as the link, enclosed in quotation marks, or a reference to a cell containing such a label. If link_label is a reference to an empty cell, url will be displayed as a link if valid, or as plain text otherwise. If link_label is the empty string literal (\"\"), the cell will appear empty, but the link is still accessible by clicking or moving to the cell."
			}
		}
	},
	IMAGE: {
		description: "Current Channel",
		abstract: "Current Channel",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/image-function"
		}],
		functionParameter: {
			source: {
				name: "source",
				detail: "The URL path, using an \"https\" protocol, of the image file."
			},
			altText: {
				name: "alt_text",
				detail: "Alternative text that describes the image for accessibility."
			},
			sizing: {
				name: "sizing",
				detail: "Specifies the image dimensions."
			},
			height: {
				name: "height",
				detail: "The custom height of the image in pixels."
			},
			width: {
				name: "width",
				detail: "The custom width of the image in pixels."
			}
		}
	},
	INDEX: {
		description: "The INDEX function returns a value or the reference to a value from within a table or range.",
		abstract: "The INDEX function returns a value or the reference to a value from within a table or range.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/index-function"
		}],
		functionParameter: {
			reference: {
				name: "reference",
				detail: "A reference to one or more cell ranges."
			},
			rowNum: {
				name: "row_num",
				detail: "The number of the row in reference from which to return a reference."
			},
			columnNum: {
				name: "column_num",
				detail: "The number of the column in reference from which to return a reference."
			},
			areaNum: {
				name: "area_num",
				detail: "Selects a range in reference from which to return the intersection of row_num and column_num."
			}
		}
	},
	INDIRECT: {
		description: "Returns the reference specified by a text string. References are immediately evaluated to display their contents.",
		abstract: "Returns a reference indicated by a text value",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/indirect-function"
		}],
		functionParameter: {
			refText: {
				name: "ref_text",
				detail: "A reference to a cell that contains an A1-style reference, an R1C1-style reference, a name defined as a reference, or a reference to a cell as a text string. "
			},
			a1: {
				name: "a1",
				detail: "A logical value that specifies what type of reference is contained in the cell ref_text."
			}
		}
	},
	LOOKUP: {
		description: "When you need to look in a single row or column and find a value from the same position in a second row or column",
		abstract: "Looks up values in a vector or array",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/lookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "A value that LOOKUP searches for in the first vector. Lookup_value can be a number, text, a logical value, or a name or reference that refers to a value."
			},
			lookupVectorOrArray: {
				name: "lookup_vectorOrArray",
				detail: "A range that contains only one row or one column"
			},
			resultVector: {
				name: "result_vector",
				detail: "A range that contains only one row or column. The result_vector argument must be the same size as lookup_vector."
			}
		}
	},
	MATCH: {
		description: "The MATCH function searches for a specified item in a range of cells, and then returns the relative position of that item in the range.",
		abstract: "Looks up values in a reference or array",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/match-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "The value that you want to match in lookup_array."
			},
			lookupArray: {
				name: "lookup_array",
				detail: "The range of cells being searched."
			},
			matchType: {
				name: "match_type",
				detail: "The number -1, 0, or 1."
			}
		}
	},
	OFFSET: {
		description: "Returns a reference offset from a given reference",
		abstract: "Returns a reference offset from a given reference",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/offset-function"
		}],
		functionParameter: {
			reference: {
				name: "reference",
				detail: "The reference from which you want to base the offset."
			},
			rows: {
				name: "rows",
				detail: "The number of rows, up or down, that you want the upper-left cell to refer to."
			},
			cols: {
				name: "columns",
				detail: "The number of columns, to the left or right, that you want the upper-left cell of the result to refer to."
			},
			height: {
				name: "height",
				detail: "The height, in number of rows, that you want the returned reference to be. Height must be a positive number."
			},
			width: {
				name: "width",
				detail: "The width, in number of columns, that you want the returned reference to be. Width must be a positive number."
			}
		}
	},
	ROW: {
		description: "Returns the row number of a reference",
		abstract: "Returns the row number of a reference",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/row-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "The cell or range of cells for which you want the row number."
		} }
	},
	ROWS: {
		description: "Returns the number of rows in an array or reference.",
		abstract: "Returns the number of rows in a reference",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/rows-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "An array, an array formula, or a reference to a range of cells for which you want the number of rows."
		} }
	},
	RTD: {
		description: "Retrieves real-time data from a program that supports COM automation",
		abstract: "Retrieves real-time data from a program that supports COM automation",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/rtd-function"
		}],
		functionParameter: {
			progId: {
				name: "progId",
				detail: "Required. The name of the ProgID of a registered COM automation add-in that has been installed on the local computer. Enclose the name in quotation marks."
			},
			server: {
				name: "server",
				detail: "Required. Name of the server where the add-in should be run. If there is no server, and the program is run locally, leave the argument blank. Otherwise, enter quotation marks (\"\") around the server name. When using RTD within Visual Basic for Applications (VBA), double quotation marks or the VBA NullString property are required for the server, even if the server is running locally."
			},
			topic1: {
				name: "topic1",
				detail: "Topic1 is required, subsequent topics are optional. 1 to 253 parameters that together represent a unique piece of real-time data."
			},
			topic2: {
				name: "topic2",
				detail: "Topic1 is required, subsequent topics are optional. 1 to 253 parameters that together represent a unique piece of real-time data."
			}
		}
	},
	SORT: {
		description: "Sorts the contents of a range or array",
		abstract: "Sorts the contents of a range or array",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/sort-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "The range or array to be sorted."
			},
			sortIndex: {
				name: "sort_index",
				detail: "A number indicating the sort order (by row or by column)."
			},
			sortOrder: {
				name: "sort_order",
				detail: "A number representing the desired sort order; 1 for ascending (default), -1 for descending."
			},
			byCol: {
				name: "by_col",
				detail: "Logical value indicating the desired sort direction; FALSE sorts by rows (default), TRUE sorts by columns."
			}
		}
	},
	SORTBY: {
		description: "Sorts the contents of a range or array based on the values in a corresponding range or array",
		abstract: "Sorts the contents of a range or array based on the values in a corresponding range or array",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/sortby-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "The range or array to be sorted."
			},
			byArray1: {
				name: "by_array1",
				detail: "The range or array to sort based on."
			},
			sortOrder1: {
				name: "sort_order1",
				detail: "A number representing the desired sort order; 1 for ascending (default), -1 for descending."
			},
			byArray2: {
				name: "by_array2",
				detail: "The range or array to sort based on."
			},
			sortOrder2: {
				name: "sort_order2",
				detail: "A number representing the desired sort order; 1 for ascending (default), -1 for descending."
			}
		}
	},
	TAKE: {
		description: "Returns a specified number of contiguous rows or columns from the start or end of an array",
		abstract: "Returns a specified number of contiguous rows or columns from the start or end of an array",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/take-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "The array from which to take rows or columns."
			},
			rows: {
				name: "rows",
				detail: "The number of rows to take. A negative value takes from the end of the array."
			},
			columns: {
				name: "columns",
				detail: "The number of columns to take. A negative value takes from the end of the array."
			}
		}
	},
	TOCOL: {
		description: "Returns the array in a single column",
		abstract: "Returns the array in a single column",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/tocol-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "The array or reference to return as a column."
			},
			ignore: {
				name: "ignore",
				detail: "Whether to ignore certain types of values. By default, no values are ignored. Specify one of the following:\n0 Keep all values (default)\n1 Ignore blanks\n2 Ignore errors\n3 Ignore blanks and errors"
			},
			scanByColumn: {
				name: "scan_by_column",
				detail: "Scan the array by column. By default, the array is scanned by row. Scanning determines whether the values are ordered by row or by column."
			}
		}
	},
	TOROW: {
		description: "Returns the array in a single row",
		abstract: "Returns the array in a single row",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/torow-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "The array or reference to return as a row."
			},
			ignore: {
				name: "ignore",
				detail: "Whether to ignore certain types of values. By default, no values are ignored. Specify one of the following:\n0 Keep all values (default)\n1 Ignore blanks\n2 Ignore errors\n3 Ignore blanks and errors"
			},
			scanByColumn: {
				name: "scan_by_column",
				detail: "Scan the array by column. By default, the array is scanned by row. Scanning determines whether the values are ordered by row or by column."
			}
		}
	},
	TRANSPOSE: {
		description: "Returns the transpose of an array",
		abstract: "Returns the transpose of an array",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/transpose-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "A range of cells or an array in a worksheet."
		} }
	},
	UNIQUE: {
		description: "Returns a list of unique values in a list or range",
		abstract: "Returns a list of unique values in a list or range",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/unique-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "The range or array from which unique rows or columns are returned."
			},
			byCol: {
				name: "by_col",
				detail: "Is a logical value: compares rows to each other and returns unique values ​​= FALSE, or is omitted; compares columns to each other and returns unique values ​​= TRUE."
			},
			exactlyOnce: {
				name: "exactly_once",
				detail: "Is a logical value: returns rows or columns from the array that appear only once = TRUE; returns all distinct rows or columns from the array = FALSE, or has been omitted."
			}
		}
	},
	VLOOKUP: {
		description: "Use VLOOKUP when you need to find things in a table or a range by row. For example, look up a price of an automotive part by the part number, or find an employee name based on their employee ID.",
		abstract: "Looks in the first column of an array and moves across the row to return the value of a cell",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/vlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "The value you want to look up. The value you want to look up must be in the first column of the range of cells you specify in the table_array argument."
			},
			tableArray: {
				name: "table_array",
				detail: "The range of cells in which the VLOOKUP will search for the lookup_value and the return value. You can use a named range or a table, and you can use names in the argument instead of cell references. "
			},
			colIndexNum: {
				name: "col_index_num",
				detail: "The column number (starting with 1 for the left-most column of table_array) that contains the return value."
			},
			rangeLookup: {
				name: "range_lookup",
				detail: "A logical value that specifies whether you want VLOOKUP to find an approximate or an exact match: Approximate match - 1/TRUE, Exact match - 0/FALSE"
			}
		}
	},
	VSTACK: {
		description: "Appends arrays vertically and in sequence to return a larger array",
		abstract: "Appends arrays vertically and in sequence to return a larger array",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/vstack-function"
		}],
		functionParameter: {
			array1: {
				name: "array",
				detail: "The arrays to append."
			},
			array2: {
				name: "array",
				detail: "The arrays to append."
			}
		}
	},
	WRAPCOLS: {
		description: "Wraps the provided row or column of values by columns after a specified number of elements",
		abstract: "Wraps the provided row or column of values by columns after a specified number of elements",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/wrapcols-function"
		}],
		functionParameter: {
			vector: {
				name: "vector",
				detail: "The vector or reference to wrap."
			},
			wrapCount: {
				name: "wrap_count",
				detail: "The maximum number of values for each column."
			},
			padWith: {
				name: "pad_with",
				detail: "The value with which to pad. The default is #N/A."
			}
		}
	},
	WRAPROWS: {
		description: "Wraps the provided row or column of values by rows after a specified number of elements",
		abstract: "Wraps the provided row or column of values by rows after a specified number of elements",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/wraprows-function"
		}],
		functionParameter: {
			vector: {
				name: "vector",
				detail: "The vector or reference to wrap."
			},
			wrapCount: {
				name: "wrap_count",
				detail: "The maximum number of values for each row."
			},
			padWith: {
				name: "pad_with",
				detail: "The value with which to pad. The default is #N/A."
			}
		}
	},
	XLOOKUP: {
		description: "Searches a range or an array, and returns an item corresponding to the first match it finds. If a match doesn't exist, then XLOOKUP can return the closest (approximate) match. ",
		abstract: "Searches a range or an array, and returns an item corresponding to the first match it finds. If a match doesn't exist, then XLOOKUP can return the closest (approximate) match. ",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/xlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "The value to search for, If omitted, XLOOKUP returns blank cells it finds in lookup_array. "
			},
			lookupArray: {
				name: "lookup_array",
				detail: "The array or range to search"
			},
			returnArray: {
				name: "return_array",
				detail: "The array or range to return"
			},
			ifNotFound: {
				name: "if_not_found",
				detail: "Where a valid match is not found, return the [if_not_found] text you supply. If a valid match is not found, and [if_not_found] is missing, #N/A is returned."
			},
			matchMode: {
				name: "match_mode",
				detail: "Specify the match type: 0 - Exact match. If none found, return #N/A. This is the default. -1 - Exact match. If none found, return the next smaller item. 1 - Exact match. If none found, return the next larger item. 2 - A wildcard match where *, ?, and ~ have special meaning."
			},
			searchMode: {
				name: "search_mode",
				detail: "Specify the search mode to use: 1 - Perform a search starting at the first item. This is the default. -1 - Perform a reverse search starting at the last item. 2 - Perform a binary search that relies on lookup_array being sorted in ascending order. If not sorted, invalid results will be returned. -2 - Perform a binary search that relies on lookup_array being sorted in descending order. If not sorted, invalid results will be returned."
			}
		}
	},
	XMATCH: {
		description: "Searches for a specified item in an array or range of cells, and then returns the item's relative position.",
		abstract: "Returns the relative position of an item in an array or range of cells.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/xmatch-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "The lookup value"
			},
			lookupArray: {
				name: "lookup_array",
				detail: "The array or range to search"
			},
			matchMode: {
				name: "match_mode",
				detail: "Specify the match type:\n0 - Exact match (default)\n-1 - Exact match or next smallest item\n1 - Exact match or next largest item\n2 - A wildcard match where *, ?, and ~ have special meaning."
			},
			searchMode: {
				name: "search_mode",
				detail: "Specify the search type:\n1 - Search first-to-last (default)\n-1 - Search last-to-first (reverse search).\n2 - Perform a binary search that relies on lookup_array being sorted in ascending order. If not sorted, invalid results will be returned.\n-2 - Perform a binary search that relies on lookup_array being sorted in descending order. If not sorted, invalid results will be returned."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/math/en-US.ts
/**
* Copyright 2023-present DreamNum Co., Ltd.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const locale$4 = {
	ABS: {
		description: "Returns the absolute value of a number. The absolute value of a number is the number without its sign.",
		abstract: "Returns the absolute value of a number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/abs-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "The real number of which you want the absolute value."
		} }
	},
	ACOS: {
		description: "Returns the arccosine, or inverse cosine, of a number. The arccosine is the angle whose cosine is number. The returned angle is given in radians in the range 0 (zero) to pi.",
		abstract: "Returns the arccosine of a number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/acos-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "The cosine of the angle you want and must be from -1 to 1."
		} }
	},
	ACOSH: {
		description: "Returns the inverse hyperbolic cosine of a number. The number must be greater than or equal to 1. The inverse hyperbolic cosine is the value whose hyperbolic cosine is number, so ACOSH(COSH(number)) equals number.",
		abstract: "Returns the inverse hyperbolic cosine of a number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/acosh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Any real number equal to or greater than 1."
		} }
	},
	ACOT: {
		description: "Returns the principal value of the arccotangent, or inverse cotangent, of a number.",
		abstract: "Returns the arccotangent of a number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/acot-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Number is the cotangent of the angle you want. This must be a real number."
		} }
	},
	ACOTH: {
		description: "Returns the hyperbolic arccotangent of a number",
		abstract: "Returns the hyperbolic arccotangent of a number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/acoth-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "The absolute value of Number must be greater than 1."
		} }
	},
	AGGREGATE: {
		description: "Returns an aggregate in a list or database",
		abstract: "Returns an aggregate in a list or database",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/aggregate-function"
		}],
		functionParameter: {
			functionNum: {
				name: "function_num",
				detail: "A number 1 to 19 that specifies which function to use."
			},
			options: {
				name: "options",
				detail: "A numerical value that determines which values to ignore in the evaluation range for the function."
			},
			ref1: {
				name: "ref1",
				detail: "The first numeric argument for functions that take multiple numeric arguments for which you want the aggregate value."
			},
			ref2: {
				name: "ref2",
				detail: "Numeric arguments 2 to 252 for which you want the aggregate value."
			}
		}
	},
	ARABIC: {
		description: "Converts a Roman numeral to an Arabic numeral.",
		abstract: "Converts a Roman numeral to an Arabic numeral.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/arabic-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Required. A string enclosed in quotation marks, an empty string (\"\"), or a reference to a cell containing text."
		} }
	},
	ASIN: {
		description: "Returns the arcsine, or inverse sine, of a number. The arcsine is the angle whose sine is number . The returned angle is given in radians in the range -pi/2 to pi/2.",
		abstract: "Returns the arcsine, or inverse sine, of a number. The arcsine is the angle whose sine is number . The returned angle is given in radians in the range -pi/2 to pi/2.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/asin-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Required. The sine of the angle you want and must be from -1 to 1."
		} }
	},
	ASINH: {
		description: "Returns the inverse hyperbolic sine of a number. The inverse hyperbolic sine is the value whose hyperbolic sine is number , so ASINH(SINH(number)) equals number .",
		abstract: "Returns the inverse hyperbolic sine of a number. The inverse hyperbolic sine is the value whose hyperbolic sine is number , so ASINH(SINH(number)) equals number .",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/asinh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Required. Any real number."
		} }
	},
	ATAN: {
		description: "Returns the arctangent of a number.",
		abstract: "Returns the arctangent of a number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/atan-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "The tangent of the angle you want."
		} }
	},
	ATAN2: {
		description: "Returns the arctangent from x- and y-coordinates.",
		abstract: "Returns the arctangent from x- and y-coordinates",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/atan2-function"
		}],
		functionParameter: {
			xNum: {
				name: "x_num",
				detail: "The x-coordinate of the point."
			},
			yNum: {
				name: "y_num",
				detail: "The y-coordinate of the point."
			}
		}
	},
	ATANH: {
		description: "Returns the inverse hyperbolic tangent of a number. Number must be between -1 and 1 (excluding -1 and 1). The inverse hyperbolic tangent is the value whose hyperbolic tangent is number , so ATANH(TANH(number)) equals number .",
		abstract: "Returns the inverse hyperbolic tangent of a number. Number must be between -1 and 1 (excluding -1 and 1). The inverse hyperbolic tangent is the value whose hyperbolic tangent is number , so ATANH(TANH(number)) equals number .",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/atanh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Required. Any real number between 1 and -1."
		} }
	},
	BASE: {
		description: "Converts a number into a text representation with the given radix (base).",
		abstract: "Converts a number into a text representation with the given radix (base).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/base-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Required. The number that you want to convert. Must be an integer greater than or equal to 0 and less than 2^53."
			},
			radix: {
				name: "radix",
				detail: "Required. The base radix that you want to convert the number into. Must be an integer greater than or equal to 2 and less than or equal to 36."
			},
			minLength: {
				name: "min_length",
				detail: "Optional. The minimum length of the returned string. Must be an integer greater than or equal to 0."
			}
		}
	},
	CEILING: {
		description: "Rounds a number to the nearest integer or to the nearest multiple of significance",
		abstract: "Rounds a number to the nearest integer or to the nearest multiple of significance",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/ceiling-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "The value you want to round."
			},
			significance: {
				name: "significance",
				detail: "The multiple to which you want to round."
			}
		}
	},
	CEILING_MATH: {
		description: "Rounds a number up, to the nearest integer or to the nearest multiple of significance",
		abstract: "Rounds a number up, to the nearest integer or to the nearest multiple of significance",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/ceiling-math-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "The value you want to round."
			},
			significance: {
				name: "significance",
				detail: "The multiple to which you want to round."
			},
			mode: {
				name: "mode",
				detail: "For negative numbers, controls whether Number is rounded toward or away from zero."
			}
		}
	},
	CEILING_PRECISE: {
		description: "Rounds a number the nearest integer or to the nearest multiple of significance. Regardless of the sign of the number, the number is rounded up.",
		abstract: "Rounds a number the nearest integer or to the nearest multiple of significance. Regardless of the sign of the number, the number is rounded up.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/ceiling-precise-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "The value you want to round."
			},
			significance: {
				name: "significance",
				detail: "The multiple to which you want to round."
			}
		}
	},
	COMBIN: {
		description: "Returns the number of combinations for a given number of objects",
		abstract: "Returns the number of combinations for a given number of objects",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/combin-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "The number of items."
			},
			numberChosen: {
				name: "number_chosen",
				detail: "The number of items in each combination."
			}
		}
	},
	COMBINA: {
		description: "Returns the number of combinations with repetitions for a given number of items",
		abstract: "Returns the number of combinations with repetitions for a given number of items",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/combina-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "The number of items."
			},
			numberChosen: {
				name: "number_chosen",
				detail: "The number of items in each combination."
			}
		}
	},
	COS: {
		description: "Returns the cosine of a number.",
		abstract: "Returns the cosine of a number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/cos-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "The angle in radians for which you want the cosine."
		} }
	},
	COSH: {
		description: "Returns the hyperbolic cosine of a number",
		abstract: "Returns the hyperbolic cosine of a number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/cosh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Any real number for which you want to find the hyperbolic cosine."
		} }
	},
	COT: {
		description: "Returns the cotangent of an angle",
		abstract: "Returns the cotangent of an angle",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/cot-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "The angle in radians for which you want the cotangent."
		} }
	},
	COTH: {
		description: "Returns the hyperbolic cotangent of a number",
		abstract: "Returns the hyperbolic cotangent of a number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/coth-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Any real number for which you want to find the hyperbolic cotangent."
		} }
	},
	CSC: {
		description: "Returns the cosecant of an angle",
		abstract: "Returns the cosecant of an angle",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/csc-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "The angle in radians for which you want the cosecant."
		} }
	},
	CSCH: {
		description: "Returns the hyperbolic cosecant of an angle",
		abstract: "Returns the hyperbolic cosecant of an angle",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/csch-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "The angle in radians for which you want the hyperbolic cosecant."
		} }
	},
	DECIMAL: {
		description: "Converts a text representation of a number in a given base into a decimal number",
		abstract: "Converts a text representation of a number in a given base into a decimal number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/decimal-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "The string length of Text must be less than or equal to 255 characters."
			},
			radix: {
				name: "radix",
				detail: "The base radix that you want to convert the number into. Must be an integer greater than or equal to 2 and less than or equal to 36."
			}
		}
	},
	DEGREES: {
		description: "Converts radians to degrees",
		abstract: "Converts radians to degrees",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/degrees-function"
		}],
		functionParameter: { angle: {
			name: "angle",
			detail: "The angle in radians that you want to convert."
		} }
	},
	EVEN: {
		description: "Rounds a number up to the nearest even integer",
		abstract: "Rounds a number up to the nearest even integer",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/even-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "The value to round."
		} }
	},
	EXP: {
		description: "Returns e raised to the power of a given number",
		abstract: "Returns e raised to the power of a given number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/exp-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "The exponent applied to the base e."
		} }
	},
	FACT: {
		description: "Returns the factorial of a number",
		abstract: "Returns the factorial of a number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/fact-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "The nonnegative number for which you want the factorial. If number is not an integer, it is truncated."
		} }
	},
	FACTDOUBLE: {
		description: "Returns the double factorial of a number",
		abstract: "Returns the double factorial of a number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/factdouble-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "The nonnegative number for which you want the double factorial. If number is not an integer, it is truncated."
		} }
	},
	FLOOR: {
		description: "Rounds a number down, toward zero",
		abstract: "Rounds a number down, toward zero",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/floor-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "The value you want to round."
			},
			significance: {
				name: "significance",
				detail: "The multiple to which you want to round."
			}
		}
	},
	FLOOR_MATH: {
		description: "Rounds a number down, to the nearest integer or to the nearest multiple of significance",
		abstract: "Rounds a number down, to the nearest integer or to the nearest multiple of significance",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/floor-math-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "The value you want to round."
			},
			significance: {
				name: "significance",
				detail: "The multiple to which you want to round."
			},
			mode: {
				name: "mode",
				detail: "For negative numbers, controls whether Number is rounded toward or away from zero."
			}
		}
	},
	FLOOR_PRECISE: {
		description: "Rounds a number down to the nearest integer or to the nearest multiple of significance. Regardless of the sign of the number, the number is rounded down.",
		abstract: "Rounds a number down to the nearest integer or to the nearest multiple of significance.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/floor-precise-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "The value you want to round."
			},
			significance: {
				name: "significance",
				detail: "The multiple to which you want to round."
			}
		}
	},
	GCD: {
		description: "Returns the greatest common divisor",
		abstract: "Returns the greatest common divisor",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/gcd-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "To find the first number of the greatest common divisor, you can also use a single array or a reference to an array instead of the comma-separated parameters."
			},
			number2: {
				name: "number2",
				detail: "The second number whose greatest common divisor is to be found. Up to 255 numbers can be specified in this way."
			}
		}
	},
	INT: {
		description: "Rounds a number down to the nearest integer",
		abstract: "Rounds a number down to the nearest integer",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/int-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "The real number you want to round down to an integer."
		} }
	},
	ISO_CEILING: {
		description: "Returns a number that is rounded up to the nearest integer or to the nearest multiple of significance",
		abstract: "Returns a number that is rounded up to the nearest integer or to the nearest multiple of significance",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/iso-ceiling-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "The value you want to round."
			},
			significance: {
				name: "significance",
				detail: "The multiple to which you want to round."
			}
		}
	},
	LCM: {
		description: "Returns the least common multiple",
		abstract: "Returns the least common multiple",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/lcm-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "To find the first number of the least common multiple, you can also use a single array or a reference to an array instead of the comma-separated parameters."
			},
			number2: {
				name: "number2",
				detail: "The second number whose least common multiple is to be found. Up to 255 numbers can be specified in this way."
			}
		}
	},
	LN: {
		description: "Returns the natural logarithm of a number",
		abstract: "Returns the natural logarithm of a number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/ln-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "The positive real number for which you want the natural logarithm."
		} }
	},
	LOG: {
		description: "Returns the logarithm of a number to a specified base",
		abstract: "Returns the logarithm of a number to a specified base",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/log-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "The positive real number for which you want the logarithm."
			},
			base: {
				name: "base",
				detail: "The base of the logarithm. If base is omitted, it is assumed to be 10."
			}
		}
	},
	LOG10: {
		description: "Returns the base-10 logarithm of a number",
		abstract: "Returns the base-10 logarithm of a number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/log10-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "The positive real number for which you want the base-10 logarithm."
		} }
	},
	MDETERM: {
		description: "Returns the matrix determinant of an array",
		abstract: "Returns the matrix determinant of an array",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/mdeterm-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "A numeric array with an equal number of rows and columns."
		} }
	},
	MINVERSE: {
		description: "Returns the matrix inverse of an array",
		abstract: "Returns the matrix inverse of an array",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/minverse-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "A numeric array with an equal number of rows and columns."
		} }
	},
	MMULT: {
		description: "Returns the matrix product of two arrays",
		abstract: "Returns the matrix product of two arrays",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/mmult-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "The arrays you want to multiply."
			},
			array2: {
				name: "array2",
				detail: "The arrays you want to multiply."
			}
		}
	},
	MOD: {
		description: "Returns the remainder after number is divided by divisor. The result has the same sign as divisor.",
		abstract: "Returns the remainder from division",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/mod-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "The number for which you want to find the remainder."
			},
			divisor: {
				name: "divisor",
				detail: "The number by which you want to divide number"
			}
		}
	},
	MROUND: {
		description: "Returns a number rounded to the desired multiple",
		abstract: "Returns a number rounded to the desired multiple",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/mround-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "The value to round."
			},
			multiple: {
				name: "multiple",
				detail: "The multiple to which you want to round number."
			}
		}
	},
	MULTINOMIAL: {
		description: "Returns the multinomial of a set of numbers",
		abstract: "Returns the multinomial of a set of numbers",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/multinomial-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "The first value or range to use in the calculation."
			},
			number2: {
				name: "number2",
				detail: "Additional values ​​or ranges to use in calculations."
			}
		}
	},
	MUNIT: {
		description: "Returns the unit matrix or the specified dimension",
		abstract: "Returns the unit matrix or the specified dimension",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/munit-function"
		}],
		functionParameter: { dimension: {
			name: "dimension",
			detail: "Dimension is an integer specifying the dimension of the unit matrix that you want to return. It returns an array. The dimension has to be greater than zero."
		} }
	},
	ODD: {
		description: "Rounds a number up to the nearest odd integer",
		abstract: "Rounds a number up to the nearest odd integer",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/odd-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "The value to round."
		} }
	},
	PI: {
		description: "Returns the value of pi",
		abstract: "Returns the value of pi",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/pi-function"
		}],
		functionParameter: {}
	},
	POWER: {
		description: "Returns the result of a number raised to a power.",
		abstract: "Returns the result of a number raised to a power",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/power-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "The base number. It can be any real number."
			},
			power: {
				name: "power",
				detail: "The exponent to which the base number is raised."
			}
		}
	},
	PRODUCT: {
		description: "Multiplies all the numbers given as arguments and returns the product.",
		abstract: "Multiplies its arguments",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/product-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "The first number or range that you want to multiply."
			},
			number2: {
				name: "number2",
				detail: "Additional numbers or ranges that you want to multiply, up to a maximum of 255 arguments."
			}
		}
	},
	QUOTIENT: {
		description: "Returns the integer portion of a division",
		abstract: "Returns the integer portion of a division",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/quotient-function"
		}],
		functionParameter: {
			numerator: {
				name: "numerator",
				detail: "The dividend."
			},
			denominator: {
				name: "denominator",
				detail: "The divisor."
			}
		}
	},
	RADIANS: {
		description: "Converts degrees to radians",
		abstract: "Converts degrees to radians",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/radians-function"
		}],
		functionParameter: { angle: {
			name: "angle",
			detail: "An angle in degrees that you want to convert."
		} }
	},
	RAND: {
		description: "Returns a random number between 0 and 1",
		abstract: "Returns a random number between 0 and 1",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/rand-function"
		}],
		functionParameter: {}
	},
	RANDARRAY: {
		description: "Returns an array of random numbers between 0 and 1. However, you can specify the number of rows and columns to fill, minimum and maximum values, and whether to return whole numbers or decimal values.",
		abstract: "Returns an array of random numbers between 0 and 1.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/randarray-function"
		}],
		functionParameter: {
			rows: {
				name: "rows",
				detail: "The number of rows to be returned"
			},
			columns: {
				name: "columns",
				detail: "The number of columns to be returned"
			},
			min: {
				name: "min",
				detail: "The minimum number you would like returned"
			},
			max: {
				name: "max",
				detail: "The maximum number you would like returned"
			},
			wholeNumber: {
				name: "whole_number",
				detail: "Return a whole number or a decimal value"
			}
		}
	},
	RANDBETWEEN: {
		description: "Returns a random number between the numbers you specify",
		abstract: "Returns a random number between the numbers you specify",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/randbetween-function"
		}],
		functionParameter: {
			bottom: {
				name: "bottom",
				detail: "The smallest integer RANDBETWEEN will return."
			},
			top: {
				name: "top",
				detail: "The largest integer RANDBETWEEN will return."
			}
		}
	},
	ROMAN: {
		description: "Converts an Arabic numeral to Roman, as text",
		abstract: "Converts an Arabic numeral to Roman, as text",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/roman-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "The Arabic numeral you want converted."
			},
			form: {
				name: "form",
				detail: "A number specifying the type of roman numeral you want. The roman numeral style ranges from Classic to Simplified, becoming more concise as the value of form increases."
			}
		}
	},
	ROUND: {
		description: "Rounds a number to a specified number of digits",
		abstract: "Rounds a number to a specified number of digits",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/round-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "The number that you want to round."
			},
			numDigits: {
				name: "num_digits",
				detail: "The number of digits to which you want to round the number argument."
			}
		}
	},
	ROUNDBANK: {
		description: "Rounds a number in banker's rounding",
		abstract: "Rounds a number in banker's rounding",
		links: [{
			title: "Instruction",
			url: ""
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "The number that you want to round in banker's rounding."
			},
			numDigits: {
				name: "num_digits",
				detail: "The number of digits to which you want to round in banker's rounding."
			}
		}
	},
	ROUNDDOWN: {
		description: "Rounds a number down, toward zero",
		abstract: "Rounds a number down, toward zero",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/rounddown-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "The number that you want to round."
			},
			numDigits: {
				name: "num_digits",
				detail: "The number of digits to which you want to round the number argument."
			}
		}
	},
	ROUNDUP: {
		description: "Rounds a number up, away from zero",
		abstract: "Rounds a number up, away from zero",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/roundup-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "The number that you want to round."
			},
			numDigits: {
				name: "num_digits",
				detail: "The number of digits to which you want to round the number argument."
			}
		}
	},
	SEC: {
		description: "Returns the secant of an angle",
		abstract: "Returns the secant of an angle",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/sec-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Number is the angle in radians for which you want the secant."
		} }
	},
	SECH: {
		description: "Returns the hyperbolic secant of an angle",
		abstract: "Returns the hyperbolic secant of an angle",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/sech-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Number is the angle in radians for which you want the hyperbolic secant."
		} }
	},
	SERIESSUM: {
		description: "Returns the sum of a power series based on the formula",
		abstract: "Returns the sum of a power series based on the formula",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/seriessum-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "The input value to the power series."
			},
			n: {
				name: "n",
				detail: "The initial power to which you want to raise x."
			},
			m: {
				name: "m",
				detail: "The step by which to increase n for each term in the series."
			},
			coefficients: {
				name: "coefficients",
				detail: "A set of coefficients by which each successive power of x is multiplied."
			}
		}
	},
	SEQUENCE: {
		description: "Generates a list of sequential numbers in an array, such as 1, 2, 3, 4",
		abstract: "Generates a list of sequential numbers in an array, such as 1, 2, 3, 4",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/sequence-function"
		}],
		functionParameter: {
			rows: {
				name: "rows",
				detail: "The number of rows to return."
			},
			columns: {
				name: "columns",
				detail: "The number of columns to return."
			},
			start: {
				name: "start",
				detail: "The first number in the sequence."
			},
			step: {
				name: "step",
				detail: "The amount to increment each subsequent value in the array."
			}
		}
	},
	SIGN: {
		description: "Returns the sign of a number",
		abstract: "Returns the sign of a number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/sign-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Any real number."
		} }
	},
	SIN: {
		description: "Returns the sine of the given angle",
		abstract: "Returns the sine of the given angle",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/sin-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "The angle in radians for which you want the sine."
		} }
	},
	SINH: {
		description: "Returns the hyperbolic sine of a number",
		abstract: "Returns the hyperbolic sine of a number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/sinh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Any real number."
		} }
	},
	SQRT: {
		description: "Returns a positive square root",
		abstract: "Returns a positive square root",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/sqrt-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "The number for which you want the square root."
		} }
	},
	SQRTPI: {
		description: "Returns the square root of (number * pi)",
		abstract: "Returns the square root of (number * pi)",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/sqrtpi-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "The number by which pi is multiplied."
		} }
	},
	SUBTOTAL: {
		description: "Returns a subtotal in a list or database.",
		abstract: "Returns a subtotal in a list or database",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/subtotal-function"
		}],
		functionParameter: {
			functionNum: {
				name: "function_num",
				detail: "The number 1-11 or 101-111 that specifies the function to use for the subtotal. 1-11 includes manually-hidden rows, while 101-111 excludes them; filtered-out cells are always excluded."
			},
			ref1: {
				name: "ref1",
				detail: "The first named range or reference for which you want the subtotal."
			},
			ref2: {
				name: "ref2",
				detail: "Named ranges or references 2 to 254 for which you want the subtotal."
			}
		}
	},
	SUM: {
		description: "You can add individual values, cell references or ranges or a mix of all three.",
		abstract: "Adds its arguments",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/sum-function"
		}],
		functionParameter: {
			number1: {
				name: "Number 1",
				detail: "The first number you want to add. The number can be like 4, a cell reference like B6, or a cell range like B2:B8."
			},
			number2: {
				name: "Number 2",
				detail: "This is the second number you want to add. You can specify up to 255 numbers in this way."
			}
		}
	},
	SUMIF: {
		description: "Sum the values in a range that meet criteria that you specify.",
		abstract: "Adds the cells specified by a given criteria",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/sumif-function"
		}],
		functionParameter: {
			range: {
				name: "range",
				detail: "The range of cells that you want evaluated by criteria."
			},
			criteria: {
				name: "criteria",
				detail: "The criteria in the form of a number, expression, a cell reference, text, or a function that defines which cells will be added. Wildcard characters can be included - a question mark (?) to match any single character, an asterisk (*) to match any sequence of characters. If you want to find an actual question mark or asterisk, type a tilde (~) preceding the character."
			},
			sumRange: {
				name: "sum_range",
				detail: "The actual cells to add, if you want to add cells other than those specified in the range argument. If the sum_range argument is omitted, Excel adds the cells that are specified in the range argument (the same cells to which the criteria is applied)."
			}
		}
	},
	SUMIFS: {
		description: "Adds all of its arguments that meet multiple criteria.",
		abstract: "Adds all of its arguments that meet multiple criteria.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/sumifs-function"
		}],
		functionParameter: {
			sumRange: {
				name: "sum_range",
				detail: "The range of cells to sum."
			},
			criteriaRange1: {
				name: "criteria_range1",
				detail: "The range that is tested using criteria1. criteria_range1 and criteria1 set up a search pair whereby a range is searched for specific criteria. Once items in the range are found, their corresponding values in sum_range are added."
			},
			criteria1: {
				name: "criteria1",
				detail: "The criteria that defines which cells in criteria_range1 will be added. For example, criteria can be entered as 32, \">32\", B4, \"apples\", or \"32\"."
			},
			criteriaRange2: {
				name: "criteriaRange2",
				detail: "Additional ranges. You can enter up to 127 range pairs."
			},
			criteria2: {
				name: "criteria2",
				detail: "Additional associated criteria. You can enter up to 127 criteria pairs."
			}
		}
	},
	SUMPRODUCT: {
		description: "Returns the sum of the products of corresponding array components",
		abstract: "Returns the sum of the products of corresponding array components",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/sumproduct-function"
		}],
		functionParameter: {
			array1: {
				name: "array",
				detail: "The first array argument whose components you want to multiply and then add."
			},
			array2: {
				name: "array",
				detail: "Array arguments 2 to 255 whose components you want to multiply and then add."
			}
		}
	},
	SUMSQ: {
		description: "Returns the sum of the squares of the arguments",
		abstract: "Returns the sum of the squares of the arguments",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/sumsq-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "To square and find the first number, you can also use a single array or a reference to an array instead of comma-separated parameters."
			},
			number2: {
				name: "number2",
				detail: "The second number to be squared and summed. Up to 255 numbers can be specified in this way."
			}
		}
	},
	SUMX2MY2: {
		description: "Returns the sum of the difference of squares of corresponding values in two arrays",
		abstract: "Returns the sum of the difference of squares of corresponding values in two arrays",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/sumx2my2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "array_x",
				detail: "The first array or range of values."
			},
			arrayY: {
				name: "array_y",
				detail: "The second array or range of values."
			}
		}
	},
	SUMX2PY2: {
		description: "Returns the sum of the sum of squares of corresponding values in two arrays",
		abstract: "Returns the sum of the sum of squares of corresponding values in two arrays",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/sumx2py2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "array_x",
				detail: "The first array or range of values."
			},
			arrayY: {
				name: "array_y",
				detail: "The second array or range of values."
			}
		}
	},
	SUMXMY2: {
		description: "Returns the sum of squares of differences of corresponding values in two arrays",
		abstract: "Returns the sum of squares of differences of corresponding values in two arrays",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/sumxmy2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "array_x",
				detail: "The first array or range of values."
			},
			arrayY: {
				name: "array_y",
				detail: "The second array or range of values."
			}
		}
	},
	TAN: {
		description: "Returns the tangent of a number.",
		abstract: "Returns the tangent of a number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/tan-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "The angle in radians for which you want the tangent."
		} }
	},
	TANH: {
		description: "Returns the hyperbolic tangent of a number.",
		abstract: "Returns the hyperbolic tangent of a number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/tanh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Any real number."
		} }
	},
	TRUNC: {
		description: "Truncates a number to an integer",
		abstract: "Truncates a number to an integer",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/trunc-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "The number you want to truncate."
			},
			numDigits: {
				name: "num_digits",
				detail: "A number specifying the precision of the truncation. The default value for num_digits is 0 (zero)."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/statistical/en-US.ts
/**
* Copyright 2023-present DreamNum Co., Ltd.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const locale$3 = {
	AVEDEV: {
		description: "Returns the average of the absolute deviations of data points from their mean.",
		abstract: "Returns the average of the absolute deviations of data points from their mean",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/avedev-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "The first number, cell reference, or range for which you want the average."
			},
			number2: {
				name: "number2",
				detail: "Additional numbers, cell references or ranges for which you want the average, up to a maximum of 255."
			}
		}
	},
	AVERAGE: {
		description: "Returns the average (arithmetic mean) of the arguments.",
		abstract: "Returns the average of its arguments",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/average-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "The first number, cell reference, or range for which you want the average."
			},
			number2: {
				name: "number2",
				detail: "Additional numbers, cell references or ranges for which you want the average, up to a maximum of 255."
			}
		}
	},
	AVERAGE_WEIGHTED: {
		description: "The AVERAGE.WEIGHTED function finds the weighted average of a set of values, given the values and the corresponding weights.",
		abstract: "The AVERAGE.WEIGHTED function finds the weighted average of a set of values, given the values and the corresponding weights.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9084098?hl=en"
		}],
		functionParameter: {
			values: {
				name: "values",
				detail: "The values to be averaged. May refer to a range of cells, or may contain the values themselves."
			},
			weights: {
				name: "weights",
				detail: "The corresponding list of weights to apply. May refer to a range of cells, or may contain the weights themselves. Weights cannot be negative, though they can be zero. At least one of the weights must be positive. If using a range of cells, that range must have the same number of rows and columns as the range of values."
			},
			additionalValues: {
				name: "additional_values",
				detail: "Additional values to average. Additional values are optional."
			},
			additionalWeights: {
				name: "additional_weights",
				detail: "Additional weights to apply. Additional weights are optional, but each additional_value must be followed by exactly one additional_weight ."
			}
		}
	},
	AVERAGEA: {
		description: "Returns the average of its arguments, including numbers, text, and logical values.",
		abstract: "Returns the average of its arguments, including numbers, text, and logical values",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/averagea-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "The first number, cell reference, or range for which you want the average."
			},
			value2: {
				name: "value2",
				detail: "Additional numbers, cell references or ranges for which you want the average, up to a maximum of 255."
			}
		}
	},
	AVERAGEIF: {
		description: "Returns the average (arithmetic mean) of all the cells in a range that meet a given criteria.",
		abstract: "Returns the average (arithmetic mean) of all the cells in a range that meet a given criteria",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/averageif-function"
		}],
		functionParameter: {
			range: {
				name: "range",
				detail: "One or more cells to average, including numbers or names, arrays, or references that contain numbers."
			},
			criteria: {
				name: "criteria",
				detail: "The criteria in the form of a number, expression, cell reference, or text that defines which cells are averaged. For example, criteria can be expressed as 32, \"32\", \">32\", \"apples\", or B4."
			},
			averageRange: {
				name: "average_range",
				detail: "The actual set of cells to average. If omitted, range is used."
			}
		}
	},
	AVERAGEIFS: {
		description: "Returns the average (arithmetic mean) of all cells that meet multiple criteria.",
		abstract: "Returns the average (arithmetic mean) of all cells that meet multiple criteria",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/averageifs-function"
		}],
		functionParameter: {
			averageRange: {
				name: "average_range",
				detail: "One or more cells to average, including numbers or names, arrays, or references that contain numbers."
			},
			criteriaRange1: {
				name: "criteria_range1",
				detail: "Is the set of cells to evaluate with the criteria."
			},
			criteria1: {
				name: "criteria1",
				detail: "Used to define the cells for which the average will be calculated. For example, the criteria can be expressed as 32, \"32\", \">32\", \"apple\", or B4"
			},
			criteriaRange2: {
				name: "criteria_range2",
				detail: "Additional ranges. You can enter up to 127 range."
			},
			criteria2: {
				name: "criteria2",
				detail: "Additional associated criteria. You can enter up to 127 criteria."
			}
		}
	},
	BETA_DIST: {
		description: "Returns the beta cumulative distribution function",
		abstract: "Returns the beta cumulative distribution function",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/beta-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "The value between A and B at which to evaluate the function."
			},
			alpha: {
				name: "alpha",
				detail: "A parameter of the distribution."
			},
			beta: {
				name: "beta",
				detail: "A parameter of the distribution."
			},
			cumulative: {
				name: "cumulative",
				detail: "A logical value that determines the form of the function. If cumulative is TRUE, BETA.DIST returns the cumulative distribution function; if FALSE, it returns the probability density function."
			},
			A: {
				name: "A",
				detail: "A lower bound to the interval of x."
			},
			B: {
				name: "B",
				detail: "An upper bound to the interval of x."
			}
		}
	},
	BETA_INV: {
		description: "Returns the inverse of the cumulative distribution function for a specified beta distribution",
		abstract: "Returns the inverse of the cumulative distribution function for a specified beta distribution",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/beta-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "A probability associated with the beta distribution."
			},
			alpha: {
				name: "alpha",
				detail: "A parameter of the distribution."
			},
			beta: {
				name: "beta",
				detail: "A parameter of the distribution."
			},
			A: {
				name: "A",
				detail: "A lower bound to the interval of x."
			},
			B: {
				name: "B",
				detail: "An upper bound to the interval of x."
			}
		}
	},
	BINOM_DIST: {
		description: "Returns the individual term binomial distribution probability",
		abstract: "Returns the individual term binomial distribution probability",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/binom-dist-function"
		}],
		functionParameter: {
			numberS: {
				name: "number_s",
				detail: "The number of successes in trials."
			},
			trials: {
				name: "trials",
				detail: "The number of independent trials."
			},
			probabilityS: {
				name: "probability_s",
				detail: "The probability of success on each trial."
			},
			cumulative: {
				name: "cumulative",
				detail: "A logical value that determines the form of the function. If cumulative is TRUE, BINOM.DIST returns the cumulative distribution function; if FALSE, it returns the probability density function."
			}
		}
	},
	BINOM_DIST_RANGE: {
		description: "Returns the probability of a trial result using a binomial distribution",
		abstract: "Returns the probability of a trial result using a binomial distribution",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/binom-dist-range-function"
		}],
		functionParameter: {
			trials: {
				name: "trials",
				detail: "The number of independent trials."
			},
			probabilityS: {
				name: "probability_s",
				detail: "The probability of success on each trial."
			},
			numberS: {
				name: "number_s",
				detail: "The number of successes in trials."
			},
			numberS2: {
				name: "number_s2",
				detail: "If provided, returns the probability that the number of successful trials will fall between number_s and number_s2."
			}
		}
	},
	BINOM_INV: {
		description: "Returns the smallest value for which the cumulative binomial distribution is less than or equal to a criterion value",
		abstract: "Returns the smallest value for which the cumulative binomial distribution is less than or equal to a criterion value",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/binom-inv-function"
		}],
		functionParameter: {
			trials: {
				name: "trials",
				detail: "The number of Bernoulli trials."
			},
			probabilityS: {
				name: "probability_s",
				detail: "The probability of success on each trial."
			},
			alpha: {
				name: "alpha",
				detail: "The criterion value."
			}
		}
	},
	CHISQ_DIST: {
		description: "Returns the left-tailed probability of the chi-squared distribution.",
		abstract: "Returns the left-tailed probability of the chi-squared distribution.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/chisq-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "The value at which you want to evaluate the distribution."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "The number of degrees of freedom."
			},
			cumulative: {
				name: "cumulative",
				detail: "A logical value that determines the form of the function. If cumulative is TRUE, CHISQ.DIST returns the cumulative distribution function; if FALSE, it returns the probability density function."
			}
		}
	},
	CHISQ_DIST_RT: {
		description: "Returns the right-tailed probability of the chi-squared distribution.",
		abstract: "Returns the right-tailed probability of the chi-squared distribution.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/chisq-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "The value at which you want to evaluate the distribution."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "The number of degrees of freedom."
			}
		}
	},
	CHISQ_INV: {
		description: "Returns the inverse of the left-tailed probability of the chi-squared distribution.",
		abstract: "Returns the inverse of the left-tailed probability of the chi-squared distribution.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/chisq-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "A probability associated with the chi-squared distribution."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "The number of degrees of freedom."
			}
		}
	},
	CHISQ_INV_RT: {
		description: "Returns the inverse of the right-tailed probability of the chi-squared distribution.",
		abstract: "Returns the inverse of the right-tailed probability of the chi-squared distribution.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/chisq-inv-rt-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "A probability associated with the chi-squared distribution."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "The number of degrees of freedom."
			}
		}
	},
	CHISQ_TEST: {
		description: "Returns the test for independence",
		abstract: "Returns the test for independence",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/chisq-test-function"
		}],
		functionParameter: {
			actualRange: {
				name: "actual_range",
				detail: "The range of data that contains observations to test against expected values."
			},
			expectedRange: {
				name: "expected_range",
				detail: "The range of data that contains the ratio of the product of row totals and column totals to the grand total."
			}
		}
	},
	CONFIDENCE_NORM: {
		description: "Returns the confidence interval for a population mean, using a normal distribution.",
		abstract: "Returns the confidence interval for a population mean, using a normal distribution.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/confidence-norm-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "The significance level used to compute the confidence level. The confidence level equals 100*(1 - alpha)%, or in other words, an alpha of 0.05 indicates a 95 percent confidence level."
			},
			standardDev: {
				name: "standard_dev",
				detail: "The population standard deviation for the data range and is assumed to be known."
			},
			size: {
				name: "size",
				detail: "The sample size."
			}
		}
	},
	CONFIDENCE_T: {
		description: "Returns the confidence interval for a population mean, using a Student's t distribution",
		abstract: "Returns the confidence interval for a population mean, using a Student's t distribution",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/confidence-t-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "The significance level used to compute the confidence level. The confidence level equals 100*(1 - alpha)%, or in other words, an alpha of 0.05 indicates a 95 percent confidence level."
			},
			standardDev: {
				name: "standard_dev",
				detail: "The population standard deviation for the data range and is assumed to be known."
			},
			size: {
				name: "size",
				detail: "The sample size."
			}
		}
	},
	CORREL: {
		description: "Returns the correlation coefficient between two data sets",
		abstract: "Returns the correlation coefficient between two data sets",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/correl-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "A first range of cell values."
			},
			array2: {
				name: "array2",
				detail: "A second range of cell values."
			}
		}
	},
	COUNT: {
		description: "Counts the number of cells that contain numbers, and counts numbers within the list of arguments.",
		abstract: "Counts how many numbers are in the list of arguments",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/count-function"
		}],
		functionParameter: {
			value1: {
				name: "value 1",
				detail: "The first item, cell reference, or range within which you want to count numbers."
			},
			value2: {
				name: "value 2",
				detail: "Up to 255 additional items, cell references, or ranges within which you want to count numbers."
			}
		}
	},
	COUNTA: {
		description: `Counts cells containing any type of information, including error values and empty text ("")
        If you do not need to count logical values, text, or error values`,
		abstract: "Counts how many values are in the list of arguments",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/counta-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "The first number, cell reference, or range for which you want the average."
			},
			value2: {
				name: "value2",
				detail: "Additional numbers, cell references or ranges for which you want the average, up to a maximum of 255."
			}
		}
	},
	COUNTBLANK: {
		description: "Counts the number of blank cells within a range.",
		abstract: "Counts the number of blank cells within a range",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/countblank-function"
		}],
		functionParameter: { range: {
			name: "range",
			detail: "The range from which you want to count the blank cells."
		} }
	},
	COUNTIF: {
		description: "Counts the number of cells within a range that meet the given criteria.",
		abstract: "Counts the number of cells within a range that meet the given criteria",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/use-the-countif-function-in-microsoft-excel"
		}],
		functionParameter: {
			range: {
				name: "range",
				detail: "The group of cells you want to count. Range can contain numbers, arrays, a named range, or references that contain numbers. Blank and text values are ignored."
			},
			criteria: {
				name: "criteria",
				detail: "A number, expression, cell reference, or text string that determines which cells will be counted.\nFor example, you can use a number like 32, a comparison like \">32\", a cell like B4, or a word like \"apples\".\nCOUNTIF uses only a single criteria. Use COUNTIFS if you want to use multiple criteria."
			}
		}
	},
	COUNTIFS: {
		description: "Counts the number of cells within a range that meet multiple criteria.",
		abstract: "Counts the number of cells within a range that meet multiple criteria",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/countifs-function"
		}],
		functionParameter: {
			criteriaRange1: {
				name: "criteria_range1",
				detail: "The first range in which to evaluate the associated criteria."
			},
			criteria1: {
				name: "criteria1",
				detail: "The criteria in the form of a number, expression, cell reference, or text that define which cells will be counted. For example, criteria can be expressed as 32, \">32\", B4, \"apples\", or \"32\"."
			},
			criteriaRange2: {
				name: "criteria_range2",
				detail: "Additional ranges. You can enter up to 127 range."
			},
			criteria2: {
				name: "criteria2",
				detail: "Additional associated criteria. You can enter up to 127 criteria."
			}
		}
	},
	COVARIANCE_P: {
		description: "Returns population covariance, the average of the products of deviations for each data point pair in two data sets.",
		abstract: "Returns population covariance",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/covariance-p-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "A first range of cell values."
			},
			array2: {
				name: "array2",
				detail: "A second range of cell values."
			}
		}
	},
	COVARIANCE_S: {
		description: "Returns the sample covariance, the average of the products of deviations for each data point pair in two data sets.",
		abstract: "Returns the sample covariance",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/covariance-s-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "A first range of cell values."
			},
			array2: {
				name: "array2",
				detail: "A second range of cell values."
			}
		}
	},
	DEVSQ: {
		description: "Returns the sum of squares of deviations",
		abstract: "Returns the sum of squares of deviations",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/devsq-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "The fist argument for which you want to calculate the sum of squared deviations."
			},
			number2: {
				name: "number2",
				detail: "The 2 to 255 arguments for which you want to calculate the sum of squared deviations."
			}
		}
	},
	EXPON_DIST: {
		description: "Returns the exponential distribution",
		abstract: "Returns the exponential distribution",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/expon-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "The value at which you want to evaluate the distribution."
			},
			lambda: {
				name: "lambda",
				detail: "The parameter value."
			},
			cumulative: {
				name: "cumulative",
				detail: "A logical value that determines the form of the function. If cumulative is TRUE, EXPON.DIST returns the cumulative distribution function; if FALSE, it returns the probability density function."
			}
		}
	},
	F_DIST: {
		description: "Returns the F probability distribution",
		abstract: "Returns the F probability distribution",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/f-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "The value at which to evaluate the function."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "The numerator degrees of freedom."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "The denominator degrees of freedom."
			},
			cumulative: {
				name: "cumulative",
				detail: "A logical value that determines the form of the function. If cumulative is TRUE, F.DIST returns the cumulative distribution function; if FALSE, it returns the probability density function."
			}
		}
	},
	F_DIST_RT: {
		description: "Returns the (right-tailed) F probability distribution",
		abstract: "Returns the (right-tailed) F probability distribution",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/f-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "The value at which to evaluate the function."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "The numerator degrees of freedom."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "The denominator degrees of freedom."
			}
		}
	},
	F_INV: {
		description: "Returns the inverse of the F probability distribution",
		abstract: "Returns the inverse of the F probability distribution",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/f-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "A probability associated with the F cumulative distribution."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "The numerator degrees of freedom."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "The denominator degrees of freedom."
			}
		}
	},
	F_INV_RT: {
		description: "Returns the inverse of the (right-tailed) F probability distribution",
		abstract: "Returns the inverse of the (right-tailed) F probability distribution",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/f-inv-rt-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "A probability associated with the F cumulative distribution."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "The numerator degrees of freedom."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "The denominator degrees of freedom."
			}
		}
	},
	F_TEST: {
		description: "Returns the result of an F-test",
		abstract: "Returns the result of an F-test",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/f-test-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "The first array or range of data."
			},
			array2: {
				name: "array2",
				detail: "The second array or range of data."
			}
		}
	},
	FISHER: {
		description: "Returns the Fisher transformation",
		abstract: "Returns the Fisher transformation",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/fisher-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "A numeric value for which you want the transformation."
		} }
	},
	FISHERINV: {
		description: "Returns the inverse of the Fisher transformation",
		abstract: "Returns the inverse of the Fisher transformation",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/fisherinv-function"
		}],
		functionParameter: { y: {
			name: "y",
			detail: "The value for which you want to perform the inverse of the transformation."
		} }
	},
	FORECAST: {
		description: "Returns a value along a linear trend",
		abstract: "Returns a value along a linear trend",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/forecast-and-forecast-linear-functions"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "The data point for which you want to predict a value."
			},
			knownYs: {
				name: "known_y's",
				detail: "The dependent array or range of data."
			},
			knownXs: {
				name: "known_x's",
				detail: "The independent array or range of data."
			}
		}
	},
	FORECAST_ETS: {
		description: "Returns a future value based on existing (historical) values by using the AAA version of the Exponential Smoothing (ETS) algorithm",
		abstract: "Returns a future value based on existing (historical) values by using the AAA version of the Exponential Smoothing (ETS) algorithm",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/forecast-ets-function"
		}],
		functionParameter: {
			targetDate: {
				name: "Target date",
				detail: "The data point for which you want to predict a value."
			},
			values: {
				name: "Values",
				detail: "The historical values for which you want to forecast the next points."
			},
			timeline: {
				name: "Timeline",
				detail: "The independent range or array of numeric dates or times with a constant step."
			},
			seasonality: {
				name: "Seasonality",
				detail: "Optional. The seasonal length. Use 1 for automatic detection (default) or 0 for no seasonality."
			},
			dataCompletion: {
				name: "Data completion",
				detail: "Optional. How to handle missing points. Use 1 to interpolate (default) or 0 to treat them as zero."
			},
			aggregation: {
				name: "Aggregation",
				detail: "Optional. A value from 1 through 7 that specifies how to aggregate duplicate time stamps."
			}
		}
	},
	FORECAST_ETS_CONFINT: {
		description: "Returns a confidence interval for the forecast value at the specified target date",
		abstract: "Returns a confidence interval for the forecast value at the specified target date",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/forecast-ets-confint-function"
		}],
		functionParameter: {
			targetDate: {
				name: "Target date",
				detail: "The data point for which you want a confidence interval."
			},
			values: {
				name: "Values",
				detail: "The historical values used for the forecast."
			},
			timeline: {
				name: "Timeline",
				detail: "The independent range or array of numeric dates or times with a constant step."
			},
			confidenceLevel: {
				name: "Confidence level",
				detail: "Optional. A number between 0 and 1 for the confidence level. The default is 0.95."
			},
			seasonality: {
				name: "Seasonality",
				detail: "Optional. The seasonal length. Use 1 for automatic detection (default) or 0 for no seasonality."
			},
			dataCompletion: {
				name: "Data completion",
				detail: "Optional. How to handle missing points. Use 1 to interpolate (default) or 0 to treat them as zero."
			},
			aggregation: {
				name: "Aggregation",
				detail: "Optional. A value from 1 through 7 that specifies how to aggregate duplicate time stamps."
			}
		}
	},
	FORECAST_ETS_SEASONALITY: {
		description: "Returns the length of the repetitive pattern Excel detects for the specified time series",
		abstract: "Returns the length of the repetitive pattern Excel detects for the specified time series",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/forecast-ets-seasonality-function"
		}],
		functionParameter: {
			values: {
				name: "Values",
				detail: "The historical values for which you want to detect seasonality."
			},
			timeline: {
				name: "Timeline",
				detail: "The independent range or array of numeric dates or times with a constant step."
			},
			dataCompletion: {
				name: "Data completion",
				detail: "Optional. How to handle missing points. Use 1 to interpolate (default) or 0 to treat them as zero."
			},
			aggregation: {
				name: "Aggregation",
				detail: "Optional. A value from 1 through 7 that specifies how to aggregate duplicate time stamps."
			}
		}
	},
	FORECAST_ETS_STAT: {
		description: "Returns a statistical value as a result of time series forecasting",
		abstract: "Returns a statistical value as a result of time series forecasting",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/forecast-ets-stat-function"
		}],
		functionParameter: {
			values: {
				name: "Values",
				detail: "The historical values used for the forecast."
			},
			timeline: {
				name: "Timeline",
				detail: "The independent range or array of numeric dates or times with a constant step."
			},
			statisticType: {
				name: "Statistic type",
				detail: "A value from 1 through 8 that specifies which forecast statistic to return."
			},
			seasonality: {
				name: "Seasonality",
				detail: "Optional. The seasonal length. Use 1 for automatic detection (default) or 0 for no seasonality."
			},
			dataCompletion: {
				name: "Data completion",
				detail: "Optional. How to handle missing points. Use 1 to interpolate (default) or 0 to treat them as zero."
			},
			aggregation: {
				name: "Aggregation",
				detail: "Optional. A value from 1 through 7 that specifies how to aggregate duplicate time stamps."
			}
		}
	},
	FORECAST_LINEAR: {
		description: "Returns a future value based on existing values",
		abstract: "Returns a future value based on existing values",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/forecast-and-forecast-linear-functions"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "The data point for which you want to predict a value."
			},
			knownYs: {
				name: "known_y's",
				detail: "The dependent array or range of data."
			},
			knownXs: {
				name: "known_x's",
				detail: "The independent array or range of data."
			}
		}
	},
	FREQUENCY: {
		description: "Returns a frequency distribution as a vertical array",
		abstract: "Returns a frequency distribution as a vertical array",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/frequency-function"
		}],
		functionParameter: {
			dataArray: {
				name: "data_array",
				detail: "An array of or reference to a set of values for which you want to count frequencies. If data_array contains no values, FREQUENCY returns an array of zeros."
			},
			binsArray: {
				name: "bins_array",
				detail: "An array of or reference to intervals into which you want to group the values in data_array. If bins_array contains no values, FREQUENCY returns the number of elements in data_array."
			}
		}
	},
	GAMMA: {
		description: "Returns the Gamma function value",
		abstract: "Returns the Gamma function value",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/gamma-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Input value to the gamma function."
		} }
	},
	GAMMA_DIST: {
		description: "Returns the gamma distribution",
		abstract: "Returns the gamma distribution",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/gamma-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "The value for which you want the distribution."
			},
			alpha: {
				name: "alpha",
				detail: "A parameter of the distribution."
			},
			beta: {
				name: "beta",
				detail: "A parameter of the distribution."
			},
			cumulative: {
				name: "cumulative",
				detail: "A logical value that determines the form of the function. If cumulative is TRUE, GAMMA.DIST returns the cumulative distribution function; if FALSE, it returns the probability density function."
			}
		}
	},
	GAMMA_INV: {
		description: "Returns the inverse of the gamma cumulative distribution",
		abstract: "Returns the inverse of the gamma cumulative distribution",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/gamma-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "A probability associated with the gamma distribution."
			},
			alpha: {
				name: "alpha",
				detail: "A parameter of the distribution."
			},
			beta: {
				name: "beta",
				detail: "A parameter of the distribution."
			}
		}
	},
	GAMMALN: {
		description: "Returns the natural logarithm of the gamma function, Γ(x)",
		abstract: "Returns the natural logarithm of the gamma function, Γ(x)",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/gammaln-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "The value for which you want to calculate GAMMALN."
		} }
	},
	GAMMALN_PRECISE: {
		description: "Returns the natural logarithm of the gamma function, Γ(x)",
		abstract: "Returns the natural logarithm of the gamma function, Γ(x)",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/gammaln-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "The value for which you want to calculate GAMMALN.PRECISE."
		} }
	},
	GAUSS: {
		description: "Returns 0.5 less than the standard normal cumulative distribution",
		abstract: "Returns 0.5 less than the standard normal cumulative distribution",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/gauss-function"
		}],
		functionParameter: { z: {
			name: "z",
			detail: "The value for which you want the distribution."
		} }
	},
	GEOMEAN: {
		description: "Returns the geometric mean",
		abstract: "Returns the geometric mean",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/geomean-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "The first number, cell reference, or range for which you want the geometric mean."
			},
			number2: {
				name: "number2",
				detail: "Additional numbers, cell references or ranges for which you want the geometric mean, up to a maximum of 255."
			}
		}
	},
	GROWTH: {
		description: "Returns values along an exponential trend",
		abstract: "Returns values along an exponential trend",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/growth-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "The set of y-values you already know in the relationship y = b*m^x."
			},
			knownXs: {
				name: "known_x's",
				detail: "The set of x-values you already know in the relationship y = b*m^x."
			},
			newXs: {
				name: "new_x's",
				detail: "Are new x-values for which you want GROWTH to return corresponding y-values."
			},
			constb: {
				name: "const",
				detail: "A logical value specifying whether to force the constant b to equal 1."
			}
		}
	},
	HARMEAN: {
		description: "Returns the harmonic mean",
		abstract: "Returns the harmonic mean",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/harmean-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "The first number, cell reference, or range for which you want the harmonic mean."
			},
			number2: {
				name: "number2",
				detail: "Additional numbers, cell references or ranges for which you want the harmonic mean, up to a maximum of 255."
			}
		}
	},
	HYPGEOM_DIST: {
		description: "Returns the hypergeometric distribution",
		abstract: "Returns the hypergeometric distribution",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/hypgeom-dist-function"
		}],
		functionParameter: {
			sampleS: {
				name: "sample_s",
				detail: "The number of successes in the sample."
			},
			numberSample: {
				name: "number_sample",
				detail: "The size of the sample."
			},
			populationS: {
				name: "population_s",
				detail: "The number of successes in the population."
			},
			numberPop: {
				name: "number_pop",
				detail: "The population size."
			},
			cumulative: {
				name: "cumulative",
				detail: "A logical value that determines the form of the function. If cumulative is TRUE, HYPGEOM.DIST returns the cumulative distribution function; if FALSE, it returns the probability density function."
			}
		}
	},
	INTERCEPT: {
		description: "Returns the intercept of the linear regression line",
		abstract: "Returns the intercept of the linear regression line",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/intercept-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "The dependent array or range of data."
			},
			knownXs: {
				name: "known_x's",
				detail: "The independent array or range of data."
			}
		}
	},
	KURT: {
		description: "Returns the kurtosis of a data set",
		abstract: "Returns the kurtosis of a data set",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/kurt-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "The first number, cell reference, or range for which you want the kurtosis."
			},
			number2: {
				name: "number2",
				detail: "Additional numbers, cell references or ranges for which you want the kurtosis, up to a maximum of 255."
			}
		}
	},
	LARGE: {
		description: "Returns the k-th largest value in a data set",
		abstract: "Returns the k-th largest value in a data set",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/large-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "The array or range of data for which you want to determine the k-th largest value."
			},
			k: {
				name: "k",
				detail: "The position (from the largest) in the array or cell range of data to return."
			}
		}
	},
	LINEST: {
		description: "Returns the parameters of a linear trend",
		abstract: "Returns the parameters of a linear trend",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/linest-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "The set of y-values you already know in the relationship y = m*x+b."
			},
			knownXs: {
				name: "known_x's",
				detail: "The set of x-values you already know in the relationship y = m*x+b."
			},
			constb: {
				name: "const",
				detail: "A logical value specifying whether to force the constant b to equal 0."
			},
			stats: {
				name: "stats",
				detail: "A logical value specifying whether to return additional regression statistics."
			}
		}
	},
	LOGEST: {
		description: "Returns the parameters of an exponential trend",
		abstract: "Returns the parameters of an exponential trend",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/logest-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "The set of y-values you already know in the relationship y = b*m^x."
			},
			knownXs: {
				name: "known_x's",
				detail: "The set of x-values you already know in the relationship y = b*m^x."
			},
			constb: {
				name: "const",
				detail: "A logical value specifying whether to force the constant b to equal 1."
			},
			stats: {
				name: "stats",
				detail: "A logical value specifying whether to return additional regression statistics."
			}
		}
	},
	LOGNORM_DIST: {
		description: "Returns the cumulative lognormal distribution",
		abstract: "Returns the cumulative lognormal distribution",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/lognorm-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "The value for which you want the distribution."
			},
			mean: {
				name: "mean",
				detail: "The arithmetic mean of the distribution."
			},
			standardDev: {
				name: "standard_dev",
				detail: "The standard deviation of the distribution."
			},
			cumulative: {
				name: "cumulative",
				detail: "A logical value that determines the form of the function. If cumulative is TRUE, LOGNORM.DIST returns the cumulative distribution function; if FALSE, it returns the probability density function."
			}
		}
	},
	LOGNORM_INV: {
		description: "Returns the inverse of the lognormal cumulative distribution",
		abstract: "Returns the inverse of the lognormal cumulative distribution",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/lognorm-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "A probability corresponding to the lognormal distribution."
			},
			mean: {
				name: "mean",
				detail: "The arithmetic mean of the distribution."
			},
			standardDev: {
				name: "standard_dev",
				detail: "The standard deviation of the distribution."
			}
		}
	},
	MARGINOFERROR: {
		description: "This function calculates the margin of error from a range of values and a confidence level.",
		abstract: "This function calculates the margin of error from a range of values and a confidence level.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/12487850?hl=en"
		}],
		functionParameter: {
			range: {
				name: "range",
				detail: "Range - The range of values used to calculate the margin of error."
			},
			confidence: {
				name: "confidence",
				detail: "Confidence - The desired confidence level between (0, 1)."
			}
		}
	},
	MAX: {
		description: "Returns the largest value in a set of values.",
		abstract: "Returns the maximum value in a list of arguments",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/max-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "The first number, cell reference, or range to calculate the maximum value from."
			},
			number2: {
				name: "number2",
				detail: "Additional numbers, cell references or ranges to calculate the maximum value from, up to a maximum of 255."
			}
		}
	},
	MAXA: {
		description: "Returns the maximum value in a list of arguments, including numbers, text, and logical values.",
		abstract: "Returns the maximum value in a list of arguments, including numbers, text, and logical values",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/maxa-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "The first number argument for which you want to find the largest value."
			},
			value2: {
				name: "value2",
				detail: "Number arguments 2 to 255 for which you want to find the largest value."
			}
		}
	},
	MAXIFS: {
		description: "Returns the maximum value among cells specified by a given set of conditions or criteria.",
		abstract: "Returns the maximum value among cells specified by a given set of conditions or criteria",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/maxifs-function"
		}],
		functionParameter: {
			maxRange: {
				name: "sum_range",
				detail: "The range of cells to max."
			},
			criteriaRange1: {
				name: "criteria_range1",
				detail: "Is the set of cells to evaluate with the criteria."
			},
			criteria1: {
				name: "criteria1",
				detail: "Is the criteria in the form of a number, expression, or text that defines which cells will be evaluated as maximum. "
			},
			criteriaRange2: {
				name: "criteriaRange2",
				detail: "Additional ranges. You can enter up to 127 ranges."
			},
			criteria2: {
				name: "criteria2",
				detail: "Additional associated criteria. You can enter up to 127 criteria."
			}
		}
	},
	MEDIAN: {
		description: "Returns the median of the given numbers",
		abstract: "Returns the median of the given numbers",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/median-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "The first number, cell reference, or range for which you want the given numbers."
			},
			number2: {
				name: "number2",
				detail: "Additional numbers, cell references or ranges for which you want the given numbers, up to a maximum of 255."
			}
		}
	},
	MIN: {
		description: "Returns the smallest number in a set of values.",
		abstract: "Returns the minimum value in a list of arguments",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/min-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "The first number, cell reference, or range to calculate the minimum value from."
			},
			number2: {
				name: "number2",
				detail: "Additional numbers, cell references or ranges to calculate the minimum value from, up to a maximum of 255."
			}
		}
	},
	MINA: {
		description: "Returns the smallest value in a list of arguments, including numbers, text, and logical values",
		abstract: "Returns the smallest value in a list of arguments, including numbers, text, and logical values",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/mina-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "The first number, cell reference, or range to calculate the minimum value from."
			},
			value2: {
				name: "value2",
				detail: "Additional numbers, cell references or ranges to calculate the minimum value from, up to a maximum of 255."
			}
		}
	},
	MINIFS: {
		description: "Returns the minimum value among cells specified by a given set of conditions or criteria.",
		abstract: "Returns the minimum value among cells specified by a given set of conditions or criteria",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/minifs-function"
		}],
		functionParameter: {
			minRange: {
				name: "min_range",
				detail: "The actual range of cells in which the minimum value will be determined."
			},
			criteriaRange1: {
				name: "criteria_range1",
				detail: "Is the set of cells to evaluate with the criteria."
			},
			criteria1: {
				name: "criteria1",
				detail: "Is the criteria in the form of a number, expression, or text that defines which cells will be evaluated as minimum. The same set of criteria works for the MAXIFS, SUMIFS and AVERAGEIFS functions."
			},
			criteriaRange2: {
				name: "criteria_range2",
				detail: "Additional ranges. You can enter up to 127 range."
			},
			criteria2: {
				name: "criteria2",
				detail: "Additional associated criteria. You can enter up to 127 criteria."
			}
		}
	},
	MODE_MULT: {
		description: "Returns a vertical array of the most frequently occurring, or repetitive values in an array or range of data",
		abstract: "Returns a vertical array of the most frequently occurring, or repetitive values in an array or range of data",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/mode-mult-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "The first number, cell reference, or range for which you want calculate the mode."
			},
			number2: {
				name: "number2",
				detail: "Additional numbers, cell references or ranges for which you want calculate the mode, up to a maximum of 255."
			}
		}
	},
	MODE_SNGL: {
		description: "Returns the most common value in a data set",
		abstract: "Returns the most common value in a data set",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/mode-sngl-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "The first number, cell reference, or range for which you want calculate the mode."
			},
			number2: {
				name: "number2",
				detail: "Additional numbers, cell references or ranges for which you want calculate the mode, up to a maximum of 255."
			}
		}
	},
	NEGBINOM_DIST: {
		description: "Returns the negative binomial distribution",
		abstract: "Returns the negative binomial distribution",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/negbinom-dist-function"
		}],
		functionParameter: {
			numberF: {
				name: "number_f",
				detail: "The number of failures."
			},
			numberS: {
				name: "number_s",
				detail: "The threshold number of successes."
			},
			probabilityS: {
				name: "probability_s",
				detail: "The probability of a success."
			},
			cumulative: {
				name: "cumulative",
				detail: "A logical value that determines the form of the function. If cumulative is TRUE, NEGBINOM.DIST returns the cumulative distribution function; if FALSE, it returns the probability density function."
			}
		}
	},
	NORM_DIST: {
		description: "Returns the normal cumulative distribution",
		abstract: "Returns the normal cumulative distribution",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/norm-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "The value for which you want the distribution."
			},
			mean: {
				name: "mean",
				detail: "The arithmetic mean of the distribution."
			},
			standardDev: {
				name: "standard_dev",
				detail: "The standard deviation of the distribution."
			},
			cumulative: {
				name: "cumulative",
				detail: "A logical value that determines the form of the function. If cumulative is TRUE, NORM.DIST returns the cumulative distribution function; if FALSE, it returns the probability density function."
			}
		}
	},
	NORM_INV: {
		description: "Returns the inverse of the normal cumulative distribution",
		abstract: "Returns the inverse of the normal cumulative distribution",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/norm-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "A probability corresponding to the normal distribution."
			},
			mean: {
				name: "mean",
				detail: "The arithmetic mean of the distribution."
			},
			standardDev: {
				name: "standard_dev",
				detail: "The standard deviation of the distribution."
			}
		}
	},
	NORM_S_DIST: {
		description: "Returns the standard normal cumulative distribution",
		abstract: "Returns the standard normal cumulative distribution",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/norm-s-dist-function"
		}],
		functionParameter: {
			z: {
				name: "z",
				detail: "The value for which you want the distribution."
			},
			cumulative: {
				name: "cumulative",
				detail: "A logical value that determines the form of the function. If cumulative is TRUE, NORM.DIST returns the cumulative distribution function; if FALSE, it returns the probability density function."
			}
		}
	},
	NORM_S_INV: {
		description: "Returns the inverse of the standard normal cumulative distribution",
		abstract: "Returns the inverse of the standard normal cumulative distribution",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/norm-s-inv-function"
		}],
		functionParameter: { probability: {
			name: "probability",
			detail: "A probability corresponding to the normal distribution."
		} }
	},
	PEARSON: {
		description: "Returns the Pearson product moment correlation coefficient",
		abstract: "Returns the Pearson product moment correlation coefficient",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/pearson-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "The dependent array or range of data."
			},
			array2: {
				name: "array2",
				detail: "The independent array or range of data."
			}
		}
	},
	PERCENTILE_EXC: {
		description: "Returns the k-th percentile of values in a data set (Excludes 0 and 1).",
		abstract: "Returns the k-th percentile of values in a data set (Excludes 0 and 1).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/percentile-exc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "The array or range of data that defines relative standing."
			},
			k: {
				name: "k",
				detail: "The percentile value in the range 0 and 1 (Excludes 0 and 1)."
			}
		}
	},
	PERCENTILE_INC: {
		description: "Returns the k-th percentile of values in a data set (Includes 0 and 1)",
		abstract: "Returns the k-th percentile of values in a data set (Includes 0 and 1)",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/percentile-inc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "The array or range of data that defines relative standing."
			},
			k: {
				name: "k",
				detail: "The percentile value in the range 0 and 1 (Includes 0 and 1)."
			}
		}
	},
	PERCENTRANK_EXC: {
		description: "Returns the percentage rank of a value in a data set (Excludes 0 and 1)",
		abstract: "Returns the percentage rank of a value in a data set (Excludes 0 and 1)",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/percentrank-exc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "The array or range of data that defines relative standing."
			},
			x: {
				name: "x",
				detail: "The value for which you want to know the rank."
			},
			significance: {
				name: "significance",
				detail: "A value that identifies the number of significant digits for the returned percentage value. If omitted, PERCENTRANK.EXC uses three digits (0.xxx)."
			}
		}
	},
	PERCENTRANK_INC: {
		description: "Returns the percentage rank of a value in a data set (Includes 0 and 1)",
		abstract: "Returns the percentage rank of a value in a data set (Includes 0 and 1)",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/percentrank-inc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "The array or range of data that defines relative standing."
			},
			x: {
				name: "x",
				detail: "The value for which you want to know the rank."
			},
			significance: {
				name: "significance",
				detail: "A value that identifies the number of significant digits for the returned percentage value. If omitted, PERCENTRANK.INC uses three digits (0.xxx)."
			}
		}
	},
	PERMUT: {
		description: "Returns the number of permutations for a given number of objects",
		abstract: "Returns the number of permutations for a given number of objects",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/permut-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "The number of items."
			},
			numberChosen: {
				name: "number_chosen",
				detail: "The number of items in each permutations."
			}
		}
	},
	PERMUTATIONA: {
		description: "Returns the number of permutations for a given number of objects (with repetitions) that can be selected from the total objects",
		abstract: "Returns the number of permutations for a given number of objects (with repetitions) that can be selected from the total objects",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/permutationa-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "The number of items."
			},
			numberChosen: {
				name: "number_chosen",
				detail: "The number of items in each permutations."
			}
		}
	},
	PHI: {
		description: "Returns the value of the density function for a standard normal distribution",
		abstract: "Returns the value of the density function for a standard normal distribution",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/phi-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "X is the number for which you want the density of the standard normal distribution."
		} }
	},
	POISSON_DIST: {
		description: "Returns the Poisson distribution",
		abstract: "Returns the Poisson distribution",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/poisson-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "The value for which you want the distribution."
			},
			mean: {
				name: "mean",
				detail: "The arithmetic mean of the distribution."
			},
			cumulative: {
				name: "cumulative",
				detail: "A logical value that determines the form of the function. If cumulative is TRUE, POISSON.DIST returns the cumulative distribution function; if FALSE, it returns the probability density function."
			}
		}
	},
	PROB: {
		description: "Returns the probability that values in a range are between two limits",
		abstract: "Returns the probability that values in a range are between two limits",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/prob-function"
		}],
		functionParameter: {
			xRange: {
				name: "x_range",
				detail: "The range of numeric values of x with which there are associated probabilities."
			},
			probRange: {
				name: "prob_range",
				detail: "A set of probabilities associated with values in x_range."
			},
			lowerLimit: {
				name: "lower_limit",
				detail: "The lower bound on the value for which you want a probability."
			},
			upperLimit: {
				name: "upper_limit",
				detail: "The upper bound on the value for which you want a probability."
			}
		}
	},
	QUARTILE_EXC: {
		description: "Returns the quartile of a data set (Excludes 0 and 1)",
		abstract: "Returns the quartile of a data set (Excludes 0 and 1)",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/quartile-exc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "The array or range of data for which you want quartile values."
			},
			quart: {
				name: "quart",
				detail: "The quartile value to return."
			}
		}
	},
	QUARTILE_INC: {
		description: "Returns the quartile of a data set (Includes 0 and 1)",
		abstract: "Returns the quartile of a data set (Includes 0 and 1)",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/quartile-inc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "The array or range of data for which you want quartile values."
			},
			quart: {
				name: "quart",
				detail: "The quartile value to return."
			}
		}
	},
	RANK_AVG: {
		description: "Returns the rank of a number in a list of numbers",
		abstract: "Returns the rank of a number in a list of numbers",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/rank-avg-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "The number whose rank you want to find."
			},
			ref: {
				name: "ref",
				detail: "A reference to a list of numbers. Nonnumeric values in ref are ignored."
			},
			order: {
				name: "order",
				detail: "A number specifying how to rank number. If order is 0 (zero) or omitted, Microsoft Excel ranks number as if ref were a list sorted in descending order. If order is any nonzero value, Microsoft Excel ranks number as if ref were a list sorted in ascending order."
			}
		}
	},
	RANK_EQ: {
		description: "Returns the rank of a number in a list of numbers",
		abstract: "Returns the rank of a number in a list of numbers",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/rank-eq-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "The number whose rank you want to find."
			},
			ref: {
				name: "ref",
				detail: "A reference to a list of numbers. Nonnumeric values in ref are ignored."
			},
			order: {
				name: "order",
				detail: "A number specifying how to rank number. If order is 0 (zero) or omitted, Microsoft Excel ranks number as if ref were a list sorted in descending order. If order is any nonzero value, Microsoft Excel ranks number as if ref were a list sorted in ascending order."
			}
		}
	},
	RSQ: {
		description: "Returns the square of the Pearson product moment correlation coefficient",
		abstract: "Returns the square of the Pearson product moment correlation coefficient",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/rsq-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "The dependent array or range of data."
			},
			knownXs: {
				name: "known_x's",
				detail: "The independent array or range of data."
			}
		}
	},
	SKEW: {
		description: "Returns the skewness of a distribution",
		abstract: "Returns the skewness of a distribution",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/skew-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "The first number, cell reference, or range for which you want the skewness."
			},
			number2: {
				name: "number2",
				detail: "Additional numbers, cell references or ranges for which you want the skewness, up to a maximum of 255."
			}
		}
	},
	SKEW_P: {
		description: "Returns the skewness of a distribution based on a population",
		abstract: "Returns the skewness of a distribution based on a population",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/skew-p-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "The first number, cell reference, or range for which you want the skewness."
			},
			number2: {
				name: "number2",
				detail: "Additional numbers, cell references or ranges for which you want the skewness, up to a maximum of 255."
			}
		}
	},
	SLOPE: {
		description: "Returns the slope of the linear regression line",
		abstract: "Returns the slope of the linear regression line",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/slope-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "The dependent array or range of data."
			},
			knownXs: {
				name: "known_x's",
				detail: "The independent array or range of data."
			}
		}
	},
	SMALL: {
		description: "Returns the k-th smallest value in a data set",
		abstract: "Returns the k-th smallest value in a data set",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/small-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "The array or range of data for which you want to determine the k-th smallest value."
			},
			k: {
				name: "k",
				detail: "The position (from the smallest) in the array or cell range of data to return."
			}
		}
	},
	STANDARDIZE: {
		description: "Returns a normalized value",
		abstract: "Returns a normalized value",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/standardize-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "The value you want to normalize."
			},
			mean: {
				name: "mean",
				detail: "The arithmetic mean of the distribution."
			},
			standardDev: {
				name: "standard_dev",
				detail: "The standard deviation of the distribution."
			}
		}
	},
	STDEV_P: {
		description: "Calculates standard deviation based on the entire population given as arguments (ignores logical values and text).",
		abstract: "Calculates standard deviation based on the entire population",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/stdev-p-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "The first number argument corresponding to a population."
			},
			number2: {
				name: "number2",
				detail: "Number arguments 2 to 254 corresponding to a population. You can also use a single array or a reference to an array instead of arguments separated by commas."
			}
		}
	},
	STDEV_S: {
		description: "Estimates standard deviation based on a sample (ignores logical values and text in the sample).",
		abstract: "Estimates standard deviation based on a sample",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/stdev-s-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "The first number argument corresponding to a sample of a population. You can also use a single array or a reference to an array instead of arguments separated by commas."
			},
			number2: {
				name: "number2",
				detail: "Number arguments 2 to 254 corresponding to a sample of a population. You can also use a single array or a reference to an array instead of arguments separated by commas."
			}
		}
	},
	STDEVA: {
		description: "Estimates standard deviation based on a sample, including numbers, text, and logical values.",
		abstract: "Estimates standard deviation based on a sample, including numbers, text, and logical values",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/stdeva-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "The first value argument corresponding to a sample of a population. You can also use a single array or a reference to an array instead of arguments separated by commas."
			},
			value2: {
				name: "value2",
				detail: "Value arguments 2 to 254 corresponding to a sample of a population. You can also use a single array or a reference to an array instead of arguments separated by commas."
			}
		}
	},
	STDEVPA: {
		description: "Calculates standard deviation based on the entire population given as arguments, including text and logical values.",
		abstract: "Calculates standard deviation based on the entire population, including numbers, text, and logical values",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/stdevpa-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "The first value argument corresponding to a population."
			},
			value2: {
				name: "value2",
				detail: "Value arguments 2 to 254 corresponding to a population. You can also use a single array or a reference to an array instead of arguments separated by commas."
			}
		}
	},
	STEYX: {
		description: "Returns the standard error of the predicted y-value for each x in the regression",
		abstract: "Returns the standard error of the predicted y-value for each x in the regression",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/steyx-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "The dependent array or range of data."
			},
			knownXs: {
				name: "known_x's",
				detail: "The independent array or range of data."
			}
		}
	},
	T_DIST: {
		description: "Returns the probability for the Student t-distribution",
		abstract: "Returns the probability for the Student t-distribution",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/t-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "The numeric value at which to evaluate the distribution"
			},
			degFreedom: {
				name: "degFreedom",
				detail: "An integer indicating the number of degrees of freedom."
			},
			cumulative: {
				name: "cumulative",
				detail: "A logical value that determines the form of the function. If cumulative is TRUE, T.DIST returns the cumulative distribution function; if FALSE, it returns the probability density function."
			}
		}
	},
	T_DIST_2T: {
		description: "Returns the probability for the Student t-distribution (two-tailed)",
		abstract: "Returns the probability for the Student t-distribution (two-tailed)",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/t-dist-2t-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "The numeric value at which to evaluate the distribution"
			},
			degFreedom: {
				name: "degFreedom",
				detail: "An integer indicating the number of degrees of freedom."
			}
		}
	},
	T_DIST_RT: {
		description: "Returns the probability for the Student t-distribution (right-tailed)",
		abstract: "Returns the probability for the Student t-distribution (right-tailed)",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/t-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "The numeric value at which to evaluate the distribution"
			},
			degFreedom: {
				name: "degFreedom",
				detail: "An integer indicating the number of degrees of freedom."
			}
		}
	},
	T_INV: {
		description: "Returns the inverse of the probability for the Student t-distribution",
		abstract: "Returns the inverse of the probability for the Student t-distribution",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/t-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "The probability associated with the Student's t-distribution."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "An integer indicating the number of degrees of freedom."
			}
		}
	},
	T_INV_2T: {
		description: "Returns the inverse of the probability for the Student t-distribution (two-tailed)",
		abstract: "Returns the inverse of the probability for the Student t-distribution (two-tailed)",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/t-inv-2t-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "The probability associated with the Student's t-distribution."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "An integer indicating the number of degrees of freedom."
			}
		}
	},
	T_TEST: {
		description: "Returns the probability associated with a Student's t-test",
		abstract: "Returns the probability associated with a Student's t-test",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/t-test-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "The first array or range of data."
			},
			array2: {
				name: "array2",
				detail: "The second array or range of data."
			},
			tails: {
				name: "tails",
				detail: "Specifies the number of distribution tails. If tails = 1, T.TEST uses the one-tailed distribution. If tails = 2, T.TEST uses the two-tailed distribution."
			},
			type: {
				name: "type",
				detail: "The kind of t-Test to perform."
			}
		}
	},
	TREND: {
		description: "Returns values along a linear trend",
		abstract: "Returns values along a linear trend",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/trend-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "The set of y-values you already know in the relationship y = m*x+b."
			},
			knownXs: {
				name: "known_x's",
				detail: "The set of x-values you already know in the relationship y = m*x+b."
			},
			newXs: {
				name: "new_x's",
				detail: "Are new x-values for which you want TREND to return corresponding y-values."
			},
			constb: {
				name: "const",
				detail: "A logical value specifying whether to force the constant b to equal 0."
			}
		}
	},
	TRIMMEAN: {
		description: "Returns the mean of the interior of a data set",
		abstract: "Returns the mean of the interior of a data set",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/trimmean-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "The array or range of values to trim and average."
			},
			percent: {
				name: "percent",
				detail: "The fractional number of data points to exclude from the calculation."
			}
		}
	},
	VAR_P: {
		description: "Calculates variance based on the entire population (ignores logical values and text in the population).",
		abstract: "Calculates variance based on the entire population",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/var-p-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "The first number argument corresponding to a population."
			},
			number2: {
				name: "number2",
				detail: "Number arguments 2 to 254 corresponding to a population."
			}
		}
	},
	VAR_S: {
		description: "Estimates variance based on a sample (ignores logical values and text in the sample).",
		abstract: "Estimates variance based on a sample",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/var-s-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "The first number argument corresponding to a sample of a population."
			},
			number2: {
				name: "number2",
				detail: "Number arguments 2 to 254 corresponding to a sample of a population."
			}
		}
	},
	VARA: {
		description: "Estimates variance based on a sample, including numbers, text, and logical values",
		abstract: "Estimates variance based on a sample, including numbers, text, and logical values",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/vara-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "The value number argument corresponding to a sample of a population."
			},
			value2: {
				name: "value2",
				detail: "Value arguments 2 to 254 corresponding to a sample of a population."
			}
		}
	},
	VARPA: {
		description: "Calculates variance based on the entire population, including numbers, text, and logical values",
		abstract: "Calculates variance based on the entire population, including numbers, text, and logical values",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/varpa-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "The first value argument corresponding to a population."
			},
			value2: {
				name: "value2",
				detail: "Value arguments 2 to 254 corresponding to a population."
			}
		}
	},
	WEIBULL_DIST: {
		description: "Returns the Weibull distribution",
		abstract: "Returns the Weibull distribution",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/weibull-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "The value for which you want the distribution."
			},
			alpha: {
				name: "alpha",
				detail: "A parameter of the distribution."
			},
			beta: {
				name: "beta",
				detail: "A parameter of the distribution."
			},
			cumulative: {
				name: "cumulative",
				detail: "A logical value that determines the form of the function. If cumulative is TRUE, WEIBULL.DIST returns the cumulative distribution function; if FALSE, it returns the probability density function."
			}
		}
	},
	Z_TEST: {
		description: "Returns the one-tailed probability-value of a z-test",
		abstract: "Returns the one-tailed probability-value of a z-test",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/z-test-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "The array or range of data against which to test x."
			},
			x: {
				name: "x",
				detail: "The value to test."
			},
			sigma: {
				name: "sigma",
				detail: "The population (known) standard deviation. If omitted, the sample standard deviation is used."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/text/en-US.ts
/**
* Copyright 2023-present DreamNum Co., Ltd.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const locale$2 = {
	ASC: {
		description: "Changes full-width (double-byte) English letters or katakana within a character string to half-width (single-byte) characters",
		abstract: "Changes full-width (double-byte) English letters or katakana within a character string to half-width (single-byte) characters",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/asc-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "The text or a reference to a cell that contains the text you want to change. If text does not contain any full-width letters, text is not changed."
		} }
	},
	ARRAYTOTEXT: {
		description: "Returns an array of text values from any specified range",
		abstract: "Returns an array of text values from any specified range",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/arraytotext-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "The array to return as text."
			},
			format: {
				name: "format",
				detail: "The format of the returned data. It can be one of two values: \n0 Default. Concise format that is easy to read. \n1 Strict format that includes escape characters and row delimiters. Generates a string that can be parsed when entered into the formula bar. Encapsulates returned strings in quotes except for Booleans, Numbers and Errors."
			}
		}
	},
	BAHTTEXT: {
		description: "Converts a number to text, using the ß (baht) currency format",
		abstract: "Converts a number to text, using the ß (baht) currency format",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/bahttext-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "A number you want to convert to text, or a reference to a cell containing a number, or a formula that evaluates to a number."
		} }
	},
	CHAR: {
		description: "Returns the character specified by the code number",
		abstract: "Returns the character specified by the code number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/char-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "A number between 1 and 255 specifying which character you want. The character is from the character set used by your computer."
		} }
	},
	CLEAN: {
		description: "Removes all nonprintable characters from text",
		abstract: "Removes all nonprintable characters from text",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/clean-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Any worksheet information from which you want to remove nonprintable characters."
		} }
	},
	CODE: {
		description: "Returns a numeric code for the first character in a text string",
		abstract: "Returns a numeric code for the first character in a text string",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/code-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "The text for which you want the code of the first character."
		} }
	},
	CONCAT: {
		description: "Combines the text from multiple ranges and/or strings, but it doesn't provide the delimiter or IgnoreEmpty arguments.",
		abstract: "Combines the text from multiple ranges and/or strings, but it doesn't provide the delimiter or IgnoreEmpty arguments",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/concat-function"
		}],
		functionParameter: {
			text1: {
				name: "text1",
				detail: "Text item to be joined. A string, or array of strings, such as a range of cells."
			},
			text2: {
				name: "text2",
				detail: "Additional text items to be joined. There can be a maximum of 253 text arguments for the text items. Each can be a string, or array of strings, such as a range of cells."
			}
		}
	},
	CONCATENATE: {
		description: "Joins several text items into one text item",
		abstract: "Joins several text items into one text item",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/concatenate-function"
		}],
		functionParameter: {
			text1: {
				name: "text1",
				detail: "The first item to join. The item can be a text value, number, or cell reference."
			},
			text2: {
				name: "text2",
				detail: "Additional text items to join. You can have up to 255 items, up to a total of 8,192 characters."
			}
		}
	},
	DBCS: {
		description: "Changes half-width (single-byte) English letters or katakana within a character string to full-width (double-byte) characters",
		abstract: "Changes half-width (single-byte) English letters or katakana within a character string to full-width (double-byte) characters",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/dbcs-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "The text or a reference to a cell that contains the text you want to change. If text does not contain any half-width English letters or katakana, text is not changed."
		} }
	},
	DOLLAR: {
		description: "Converts a number to text using currency format",
		abstract: "Converts a number to text using currency format",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/dollar-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "A number, a reference to a cell containing a number, or a formula that evaluates to a number."
			},
			decimals: {
				name: "decimals",
				detail: "The number of digits to the right of the decimal point. If this is negative, the number is rounded to the left of the decimal point. If you omit decimals, it is assumed to be 2."
			}
		}
	},
	EXACT: {
		description: "Checks to see if two text values are identical",
		abstract: "Checks to see if two text values are identical",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/exact-function"
		}],
		functionParameter: {
			text1: {
				name: "text1",
				detail: "The first text string."
			},
			text2: {
				name: "text2",
				detail: "The second text string."
			}
		}
	},
	FIND: {
		description: "Finds one text value within another (case-sensitive)",
		abstract: "Finds one text value within another (case-sensitive)",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/this-article-has-been-retired"
		}],
		functionParameter: {
			findText: {
				name: "find_text",
				detail: "The text you want to find."
			},
			withinText: {
				name: "within_text",
				detail: "The text containing the text you want to find."
			},
			startNum: {
				name: "start_num",
				detail: "Specifies the character at which to start the search. If you omit start_num, it is assumed to be 1."
			}
		}
	},
	FINDB: {
		description: "Finds one text value within another (case-sensitive)",
		abstract: "Finds one text value within another (case-sensitive)",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/this-article-has-been-retired"
		}],
		functionParameter: {
			findText: {
				name: "find_text",
				detail: "The text you want to find."
			},
			withinText: {
				name: "within_text",
				detail: "The text containing the text you want to find."
			},
			startNum: {
				name: "start_num",
				detail: "Specifies the character at which to start the search. If you omit start_num, it is assumed to be 1."
			}
		}
	},
	FIXED: {
		description: "Formats a number as text with a fixed number of decimals",
		abstract: "Formats a number as text with a fixed number of decimals",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/fixed-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "The number you want to round and convert to text."
			},
			decimals: {
				name: "decimals",
				detail: "The number of digits to the right of the decimal point. If this is negative, the number is rounded to the left of the decimal point. If you omit decimals, it is assumed to be 2."
			},
			noCommas: {
				name: "no_commas",
				detail: "A logical value that, if TRUE, prevents FIXED from including commas in the returned text."
			}
		}
	},
	LEFT: {
		description: "Returns the leftmost characters from a text value",
		abstract: "Returns the leftmost characters from a text value",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/left-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "The text string containing the characters you want to extract."
			},
			numChars: {
				name: "num_chars",
				detail: "Specifies the number of characters you want LEFT to extract."
			}
		}
	},
	LEFTB: {
		description: "Returns the leftmost characters from a text value",
		abstract: "Returns the leftmost characters from a text value",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/left-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "The text string containing the characters you want to extract."
			},
			numBytes: {
				name: "num_bytes",
				detail: "Specifies the number of characters you want LEFTB to extract, based on bytes."
			}
		}
	},
	LEN: {
		description: "Returns the number of characters in a text string",
		abstract: "Returns the number of characters in a text string",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/len-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "The text whose length you want to find. Spaces count as characters."
		} }
	},
	LENB: {
		description: "Returns the number of bytes used to represent the characters in a text string.",
		abstract: "Returns the number of bytes used to represent the characters in a text string",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/len-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "The text whose length you want to find. Spaces count as characters."
		} }
	},
	LOWER: {
		description: "Converts text to lowercase.",
		abstract: "Converts text to lowercase",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/lower-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "The text you want to convert to lowercase."
		} }
	},
	MID: {
		description: "Returns a specific number of characters from a text string starting at the position you specify.",
		abstract: "Returns a specific number of characters from a text string starting at the position you specify",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/mid-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "The text string containing the characters you want to extract."
			},
			startNum: {
				name: "start_num",
				detail: "The position of the first character you want to extract in text."
			},
			numChars: {
				name: "num_chars",
				detail: "Specifies the number of characters you want MID to extract."
			}
		}
	},
	MIDB: {
		description: "Returns a specific number of characters from a text string starting at the position you specify",
		abstract: "Returns a specific number of characters from a text string starting at the position you specify",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/mid-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "The text string containing the characters you want to extract."
			},
			startNum: {
				name: "start_num",
				detail: "The position of the first character you want to extract in text."
			},
			numBytes: {
				name: "num_bytes",
				detail: "Specifies the number of characters you want MIDB to extract, based on bytes."
			}
		}
	},
	NUMBERSTRING: {
		description: "Convert numbers to Chinese strings",
		abstract: "Convert numbers to Chinese strings",
		links: [{
			title: "Instruction",
			url: "https://www.wps.cn/learning/course/detail/id/340.html?chan=pc_kdocs_function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "The value converted to a Chinese string."
			},
			type: {
				name: "type",
				detail: "The type of the returned result. \n1. Chinese lowercase \n2. Chinese uppercase \n3. Reading and Writing Chinese Characters"
			}
		}
	},
	NUMBERVALUE: {
		description: "Converts text to number in a locale-independent manner",
		abstract: "Converts text to number in a locale-independent manner",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/numbervalue-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "The text to convert to a number."
			},
			decimalSeparator: {
				name: "decimal_separator",
				detail: "The character used to separate the integer and fractional part of the result."
			},
			groupSeparator: {
				name: "group_separator",
				detail: "The character used to separate groupings of numbers."
			}
		}
	},
	PHONETIC: {
		description: "Extracts the phonetic (furigana) characters from a text string",
		abstract: "Extracts the phonetic (furigana) characters from a text string",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/phonetic-function"
		}],
		functionParameter: { reference: {
			name: "Reference",
			detail: "Required. Text string or a reference to a single cell or a range of cells that contain a furigana text string."
		} }
	},
	PROPER: {
		description: "Capitalizes the first letter in each word of a text value",
		abstract: "Capitalizes the first letter in each word of a text value",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/proper-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Text enclosed in quotation marks, a formula that returns text, or a reference to a cell containing the text you want to partially capitalize."
		} }
	},
	REGEXEXTRACT: {
		description: "Extracts the first matching substrings according to a regular expression.",
		abstract: "Extracts the first matching substrings according to a regular expression.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3098244?hl=en"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "The input text."
			},
			regularExpression: {
				name: "regular_expression",
				detail: "The first part of text that matches this expression will be returned."
			}
		}
	},
	REGEXMATCH: {
		description: "Whether a piece of text matches a regular expression.",
		abstract: "Whether a piece of text matches a regular expression.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3098292?hl=en"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "The text to be tested against the regular expression."
			},
			regularExpression: {
				name: "regular_expression",
				detail: "The regular expression to test the text against."
			}
		}
	},
	REGEXREPLACE: {
		description: "Replaces part of a text string with a different text string using regular expressions.",
		abstract: "Replaces part of a text string with a different text string using regular expressions.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3098245?hl=en"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "The text, a part of which will be replaced."
			},
			regularExpression: {
				name: "regular_expression",
				detail: "The regular expression. All matching instances in text will be replaced."
			},
			replacement: {
				name: "replacement",
				detail: "The text which will be inserted into the original text."
			}
		}
	},
	REPLACE: {
		description: "Replaces characters within text",
		abstract: "Replaces characters within text",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/replace-function"
		}],
		functionParameter: {
			oldText: {
				name: "old_text",
				detail: "Text in which you want to replace some characters."
			},
			startNum: {
				name: "start_num",
				detail: "The position of the character in old_text that you want to replace with new_text."
			},
			numChars: {
				name: "num_chars",
				detail: "The number of characters in old_text that you want REPLACE to replace with new_text."
			},
			newText: {
				name: "new_text",
				detail: "The text that will replace characters in old_text."
			}
		}
	},
	REPLACEB: {
		description: "Replaces characters within text",
		abstract: "Replaces characters within text",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/replace-function"
		}],
		functionParameter: {
			oldText: {
				name: "old_text",
				detail: "Text in which you want to replace some characters."
			},
			startNum: {
				name: "start_num",
				detail: "The position of the character in old_text that you want to replace with new_text."
			},
			numBytes: {
				name: "num_bytes",
				detail: "The number of bytes in old_text that you want REPLACEB to replace with new_text."
			},
			newText: {
				name: "new_text",
				detail: "The text that will replace characters in old_text."
			}
		}
	},
	REPT: {
		description: "Repeats text a given number of times",
		abstract: "Repeats text a given number of times",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/rept-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "The text you want to repeat."
			},
			numberTimes: {
				name: "number_times",
				detail: "A positive number specifying the number of times to repeat text."
			}
		}
	},
	RIGHT: {
		description: "Returns the rightmost characters from a text value",
		abstract: "Returns the rightmost characters from a text value",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/right-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "The text string containing the characters you want to extract."
			},
			numChars: {
				name: "num_chars",
				detail: "Specifies the number of characters you want RIGHT to extract."
			}
		}
	},
	RIGHTB: {
		description: "Returns the rightmost characters from a text value",
		abstract: "Returns the rightmost characters from a text value",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/right-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "The text string containing the characters you want to extract."
			},
			numBytes: {
				name: "num_bytes",
				detail: "Specifies the number of characters you want RIGHTB to extract, based on bytes."
			}
		}
	},
	SEARCH: {
		description: "Finds one text value within another (not case-sensitive)",
		abstract: "Finds one text value within another (not case-sensitive)",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/search-function"
		}],
		functionParameter: {
			findText: {
				name: "find_text",
				detail: "The text you want to find."
			},
			withinText: {
				name: "within_text",
				detail: "The text containing the text you want to find."
			},
			startNum: {
				name: "start_num",
				detail: "Specifies the character at which to start the search. If you omit start_num, it is assumed to be 1."
			}
		}
	},
	SEARCHB: {
		description: "Finds one text value within another (not case-sensitive)",
		abstract: "Finds one text value within another (not case-sensitive)",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/search-function"
		}],
		functionParameter: {
			findText: {
				name: "find_text",
				detail: "The text you want to find."
			},
			withinText: {
				name: "within_text",
				detail: "The text containing the text you want to find."
			},
			startNum: {
				name: "start_num",
				detail: "Specifies the character at which to start the search. If you omit start_num, it is assumed to be 1."
			}
		}
	},
	SUBSTITUTE: {
		description: "Substitutes new text for old text in a text string",
		abstract: "Substitutes new text for old text in a text string",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/substitute-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "The text or the reference to a cell containing text for which you want to substitute characters."
			},
			oldText: {
				name: "old_text",
				detail: "The text you want to replace."
			},
			newText: {
				name: "new_text",
				detail: "The text you want to replace old_text with."
			},
			instanceNum: {
				name: "instance_num",
				detail: "Specifies which occurrence of old_text you want to replace with new_text. If you specify instance_num, only that instance of old_text is replaced. Otherwise, every occurrence of old_text in text is changed to new_text."
			}
		}
	},
	T: {
		description: "Converts its arguments to text",
		abstract: "Converts its arguments to text",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/t-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "The value you want to test."
		} }
	},
	TEXT: {
		description: "Formats a number and converts it to text",
		abstract: "Formats a number and converts it to text",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/text-function"
		}],
		functionParameter: {
			value: {
				name: "value",
				detail: "A numeric value that you want to be converted into text."
			},
			formatText: {
				name: "format_text",
				detail: "A text string that defines the formatting that you want to be applied to the supplied value."
			}
		}
	},
	TEXTAFTER: {
		description: "Returns text that occurs after given character or string",
		abstract: "Returns text that occurs after given character or string",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/textafter-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "The text you are searching within. Wildcard characters not allowed."
			},
			delimiter: {
				name: "delimiter",
				detail: "The text that marks the point after which you want to extract."
			},
			instanceNum: {
				name: "instance_num",
				detail: "The instance of the delimiter after which you want to extract the text."
			},
			matchMode: {
				name: "match_mode",
				detail: "Determines whether the text search is case-sensitive. The default is case-sensitive."
			},
			matchEnd: {
				name: "match_end",
				detail: "Treats the end of text as a delimiter. By default, the text is an exact match."
			},
			ifNotFound: {
				name: "if_not_found",
				detail: "Value returned if no match is found. By default, #N/A is returned."
			}
		}
	},
	TEXTBEFORE: {
		description: "Returns text that occurs before a given character or string",
		abstract: "Returns text that occurs before a given character or string",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/textbefore-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "The text you are searching within. Wildcard characters not allowed."
			},
			delimiter: {
				name: "delimiter",
				detail: "The text that marks the point after which you want to extract."
			},
			instanceNum: {
				name: "instance_num",
				detail: "The instance of the delimiter after which you want to extract the text."
			},
			matchMode: {
				name: "match_mode",
				detail: "Determines whether the text search is case-sensitive. The default is case-sensitive."
			},
			matchEnd: {
				name: "match_end",
				detail: "Treats the end of text as a delimiter. By default, the text is an exact match."
			},
			ifNotFound: {
				name: "if_not_found",
				detail: "Value returned if no match is found. By default, #N/A is returned."
			}
		}
	},
	TEXTJOIN: {
		description: "Text: Combines the text from multiple ranges and/or strings",
		abstract: "Text: Combines the text from multiple ranges and/or strings",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/textjoin-function"
		}],
		functionParameter: {
			delimiter: {
				name: "delimiter",
				detail: "A text string, either empty, or one or more characters enclosed by double quotes, or a reference to a valid text string."
			},
			ignoreEmpty: {
				name: "ignore_empty",
				detail: "If TRUE, ignores empty cells."
			},
			text1: {
				name: "text1",
				detail: "Text item to be joined. A text string, or array of strings, such as a range of cells."
			},
			text2: {
				name: "text2",
				detail: "Additional text items to be joined. There can be a maximum of 252 text arguments for the text items, including text1. Each can be a text string, or array of strings, such as a range of cells."
			}
		}
	},
	TEXTSPLIT: {
		description: "Splits text strings by using column and row delimiters",
		abstract: "Splits text strings by using column and row delimiters",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/textsplit-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "The text to split."
			},
			colDelimiter: {
				name: "col_delimiter",
				detail: "The character or string by which to split the column."
			},
			rowDelimiter: {
				name: "row_delimiter",
				detail: "The character or string on which to split the line."
			},
			ignoreEmpty: {
				name: "ignore_empty",
				detail: "Whether to ignore empty cells. The default is FALSE."
			},
			matchMode: {
				name: "match_mode",
				detail: "Searches for a delimiter match in the text. By default, a case-sensitive match is done."
			},
			padWith: {
				name: "pad_with",
				detail: "The value to use for padding. By default, #N/A is used."
			}
		}
	},
	TRIM: {
		description: "Removes all spaces from text except for single spaces between words.",
		abstract: "Removes spaces from text",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/trim-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "The text from which you want spaces removed."
		} }
	},
	UNICHAR: {
		description: "Returns the Unicode character that is references by the given numeric value",
		abstract: "Returns the Unicode character that is references by the given numeric value",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/unichar-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Number is the Unicode number that represents the character."
		} }
	},
	UNICODE: {
		description: "Returns the number (code point) that corresponds to the first character of the text",
		abstract: "Returns the number (code point) that corresponds to the first character of the text",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/unicode-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Text is the character for which you want the Unicode value."
		} }
	},
	UPPER: {
		description: "Converts text to uppercase",
		abstract: "Converts text to uppercase",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/upper-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "The text you want converted to uppercase."
		} }
	},
	VALUE: {
		description: "Converts a text argument to a number",
		abstract: "Converts a text argument to a number",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/value-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "The text enclosed in quotation marks or a reference to a cell containing the text you want to convert."
		} }
	},
	VALUETOTEXT: {
		description: "Returns text from any specified value",
		abstract: "Returns text from any specified value",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/valuetotext-function"
		}],
		functionParameter: {
			value: {
				name: "value",
				detail: "The value to return as text."
			},
			format: {
				name: "format",
				detail: "The format of the returned data. It can be one of two values: \n0 Default. Concise format that is easy to read. \n1 Strict format that includes escape characters and row delimiters. Generates a string that can be parsed when entered into the formula bar. Encapsulates returned strings in quotes except for Booleans, Numbers and Errors."
			}
		}
	},
	CALL: {
		description: "Calls a procedure in a dynamic link library or code resource",
		abstract: "Calls a procedure in a dynamic link library or code resource",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/call-function"
		}],
		functionParameter: {
			moduleText: {
				name: "Module_text",
				detail: "Required. Quoted text specifying the name of the dynamic link library (DLL) that contains the procedure in Microsoft Excel for Windows."
			},
			procedure: {
				name: "Procedure",
				detail: "Required. Text specifying the name of the function in the DLL in Microsoft Excel for Windows. You can also use the ordinal value of the function from the EXPORTS statement in the module-definition file (.DEF). The ordinal value must not be in the form of text."
			},
			typeText: {
				name: "Type_text",
				detail: "Required. Text specifying the data type of the return value and the data types of all arguments to the DLL or code resource. The first letter of type_text specifies the return value. The codes you use for type_text are described in detail in Using the CALL and REGISTER functions . For stand-alone DLLs or code resources (XLLs), you can omit this argument."
			},
			argument1: {
				name: "Argument1,...",
				detail: "Optional. The arguments to be passed to the procedure."
			}
		}
	},
	EUROCONVERT: {
		description: "Converts a number to euros, converts a number from euros to a euro member currency, or converts a number from one euro member currency to another by using the euro as an intermediary (triangulation)",
		abstract: "Converts a number to euros, converts a number from euros to a euro member currency, or converts a number from one euro member currency to another by using the euro as an intermediary (triangulation)",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/euroconvert-function"
		}],
		functionParameter: {
			number: {
				name: "Number",
				detail: "Required. The currency value you want to convert, or a reference to a cell containing the value."
			},
			source: {
				name: "Source",
				detail: "Required. A three-letter string, or reference to a cell containing the string, corresponding to the ISO code for the source currency. The following currency codes are available in the EUROCONVERT function:"
			},
			target: {
				name: "Target",
				detail: "Required. A three-letter string, or cell reference, corresponding to the ISO code of the currency to which you want to convert the number. See the previous Source table for the ISO codes."
			},
			fullPrecision: {
				name: "Full_precision",
				detail: "Required. A logical value (TRUE or FALSE), or an expression that evaluates to a value of TRUE or FALSE, that specifies how to display the result."
			},
			triangulationPrecision: {
				name: "Triangulation_precision",
				detail: "Required. An integer equal to or greater than 3 that specifies the number of significant digits to be used for the intermediate euro value when converting between two euro member currencies. If you omit this argument, Excel does not round the intermediate euro value. If you include this argument when converting from a euro member currency to the euro, Excel calculates the intermediate euro value that could then be converted to a euro member currency."
			}
		}
	},
	REGISTER_ID: {
		description: "Returns the register ID of the specified dynamic link library (DLL) or code resource that has been previously registered",
		abstract: "Returns the register ID of the specified dynamic link library (DLL) or code resource that has been previously registered",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/register-id-function"
		}],
		functionParameter: {
			moduleText: {
				name: "Module_text",
				detail: "Required. Text specifying the name of the DLL that contains the function in Microsoft Excel for Windows."
			},
			procedure: {
				name: "Procedure",
				detail: "Required. Text specifying the name of the function in the DLL in Microsoft Excel for Windows. You can also use the ordinal value of the function from the EXPORTS statement in the module-definition file (.DEF). The ordinal value or resource ID number must not be in text form."
			},
			typeText: {
				name: "Type_text",
				detail: "Optional. Text specifying the data type of the return value and the data types of all arguments to the DLL. The first letter of type_text specifies the return value. If the function or code resource is already registered, you can omit this argument."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/univer/en-US.ts
/**
* Copyright 2023-present DreamNum Co., Ltd.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const locale$1 = {};

//#endregion
//#region src/locale/function-list/web/en-US.ts
/**
* Copyright 2023-present DreamNum Co., Ltd.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const locale = {
	ENCODEURL: {
		description: "The ENCODEURL function returns a URL-encoded string, replacing certain non-alphanumeric characters with the percentage symbol (%) and a hexadecimal number.",
		abstract: "The ENCODEURL function returns a URL-encoded string, replacing certain non-alphanumeric characters with the percentage symbol (%) and a hexadecimal number.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/encodeurl-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "A string to be URL encoded"
		} }
	},
	FILTERXML: {
		description: "The FILTERXML function returns specific data from XML content by using the specified xpath.",
		abstract: "The FILTERXML function returns specific data from XML content by using the specified xpath.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/filterxml-function"
		}],
		functionParameter: {
			xml: {
				name: "xml",
				detail: "A string in valid XML format."
			},
			xpath: {
				name: "xpath",
				detail: "A string in standard XPath format."
			}
		}
	},
	WEBSERVICE: {
		description: "The WEBSERVICE function returns data from a web service on the Internet or Intranet.",
		abstract: "The WEBSERVICE function returns data from a web service on the Internet or Intranet.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/en-us/excel/functions/webservice-function"
		}],
		functionParameter: { url: {
			name: "url",
			detail: "The URL of the web service."
		} }
	}
};

//#endregion
export { locale$4 as a, locale$7 as c, locale$10 as d, locale$11 as f, locale$14 as h, locale$3 as i, locale$8 as l, locale$13 as m, locale$1 as n, locale$5 as o, locale$12 as p, locale$2 as r, locale$6 as s, locale as t, locale$9 as u };