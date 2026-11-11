//#region src/locale/function-list/array/ko-KR.ts
const locale$15 = {
	ARRAY_CONSTRAIN: {
		description: "배열 결과를 지정된 크기로 제한합니다.",
		abstract: "배열 결과를 지정된 크기로 제한합니다.",
		links: [{
			title: "사용법",
			url: "https://support.google.com/docs/answer/3267036?hl=ko"
		}],
		functionParameter: {
			inputRange: {
				name: "input_range",
				detail: "ARRAY_CONSTRAIN(SORT(A1:F100, 1, TRUE), 10, 6)"
			},
			numRows: {
				name: "num_rows",
				detail: "결과에 포함할 행의 수입니다."
			},
			numCols: {
				name: "num_cols",
				detail: "결과에 포함할 열의 수입니다."
			}
		}
	},
	FLATTEN: {
		description: "하나 이상의 범위에 있는 모든 값을 단일 열로 평면화합니다.",
		abstract: "하나 이상의 범위에 있는 모든 값을 단일 열로 평면화합니다.",
		links: [{
			title: "사용법",
			url: "https://support.google.com/docs/answer/10307761?hl=ko"
		}],
		functionParameter: {
			range1: {
				name: "range1",
				detail: "평면화할 첫 번째 범위입니다."
			},
			range2: {
				name: "range2",
				detail: "[선택사항] 반복 가능 평면화할 추가 범위입니다."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/compatibility/ko-KR.ts
const locale$14 = {
	BETADIST: {
		description: "누적 베타 확률 밀도 함수 값을 반환합니다. 베타 분포는 하루 중 텔레비전을 보는 시간을 백분율로 나타내는 것처럼 표본에서 백분율의 분포를 알아볼 때 일반적으로 사용합니다.",
		abstract: "누적 베타 확률 밀도 함수 값을 반환합니다. 베타 분포는 하루 중 텔레비전을 보는 시간을 백분율로 나타내는 것처럼 표본에서 백분율의 분포를 알아볼 때 일반적으로 사용합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/betadist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "필수 요소입니다. 함수를 계산할 값으로서 A와 B 사이의 값입니다."
			},
			alpha: {
				name: "alpha",
				detail: "필수. 분포의 매개 변수입니다."
			},
			beta: {
				name: "beta",
				detail: "필수. 분포의 매개 변수입니다."
			},
			A: {
				name: "A",
				detail: "선택 사항 입니다 . x가 취할 수 있는 하한값입니다."
			},
			B: {
				name: "B",
				detail: "선택 사항입니다. x가 취할 수 있는 상한값입니다."
			}
		}
	},
	BETAINV: {
		description: "지정된 베타 분포에 대한 누적 베타 확률 밀도 함수의 역함수 값을 반환합니다. 즉, probability = BETADIST(x,...)이면 BETAINV(probability,...) = x입니다. 베타 분포는 프로젝트 계획에서 예상 완료 시간과 가변성이 주어질 때 가능한 완료 시간을 모델링하는 데 사용할 수 있습니다.",
		abstract: "지정된 베타 분포에 대한 누적 베타 확률 밀도 함수의 역함수 값을 반환합니다. 즉, probability = BETADIST(x,...)이면 BETAINV(probability,...) = x입니다. 베타 분포는 프로젝트 계획에서 예상 완료 시간과 가변성이 주어질 때 가능한 완료 시간을 모델링하는 데 사용할 수 있습니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/betainv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "필수. 베타 분포와 관련된 확률입니다."
			},
			alpha: {
				name: "alpha",
				detail: "필수. 분포의 매개 변수입니다."
			},
			beta: {
				name: "beta",
				detail: "필수. 분포의 매개 변수입니다."
			},
			A: {
				name: "A",
				detail: "선택 사항 입니다 . x가 취할 수 있는 하한값입니다."
			},
			B: {
				name: "B",
				detail: "선택 사항입니다. x가 취할 수 있는 상한값입니다."
			}
		}
	},
	BINOMDIST: {
		description: "개별항 이항 분포 확률을 반환합니다. 고정된 횟수의 검정이나 시행을 거치는 문제에서 시행의 결과값이 성공 또는 실패 중 하나이고, 시행이 서로 독립적이며, 성공 확률이 전체 실험에서 일정하게 나타나는 경우 BINOMDIST 함수를 사용합니다. 예를 들어 앞으로 태어날 세 명의 아기 중 두 명이 남자 아기일 확률을 계산할 때 이 함수를 사용할 수 있습니다.",
		abstract: "개별항 이항 분포 확률을 반환합니다. 고정된 횟수의 검정이나 시행을 거치는 문제에서 시행의 결과값이 성공 또는 실패 중 하나이고, 시행이 서로 독립적이며, 성공 확률이 전체 실험에서 일정하게 나타나는 경우 BINOMDIST 함수를 사용합니다. 예를 들어 앞으로 태어날 세 명의 아기 중 두 명이 남자 아기일 확률을 계산할 때 이 함수를 사용할 수 있습니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/binomdist-function"
		}],
		functionParameter: {
			numberS: {
				name: "number_s",
				detail: "필수. 시행에서의 성공 횟수입니다."
			},
			trials: {
				name: "trials",
				detail: "필수. 독립 시행 횟수입니다."
			},
			probabilityS: {
				name: "probability_s",
				detail: "필수. 각 시행에서 성공할 확률입니다."
			},
			cumulative: {
				name: "cumulative",
				detail: "필수. 함수의 형식을 결정하는 논리 값입니다. 누적이 TRUE이면 BINOMDIST는 최대 number_s 성공이 있을 확률인 누적 분포 함수를 반환합니다. FALSE이면 성공 가능성이 number_s 확률 질량 함수를 반환합니다."
			}
		}
	},
	CHIDIST: {
		description: "카이 제곱 분포의 단측(오른쪽) 검정 확률을 반환합니다. 2 분포는 2 테스트와 연결됩니다. 2 테스트를 사용하여 관찰된 값과 예상 값을 비교합니다. 예를 들어, 유전자 실험은 다음 세대의 식물이 특정 색 집합을 나타낼 것이라고 가설을 세일 수 있습니다. 관찰된 결과를 예상 결과와 비교하여 원래 가설이 유효한지 여부를 결정할 수 있습니다.",
		abstract: "카이 제곱 분포의 단측(오른쪽) 검정 확률을 반환합니다. 2 분포는 2 테스트와 연결됩니다. 2 테스트를 사용하여 관찰된 값과 예상 값을 비교합니다. 예를 들어, 유전자 실험은 다음 세대의 식물이 특정 색 집합을 나타낼 것이라고 가설을 세일 수 있습니다. 관찰된 결과를 예상 결과와 비교하여 원래 가설이 유효한지 여부를 결정할 수 있습니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/chidist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "필수 요소입니다. 분포를 계산하려는 값입니다."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "필수. 자유도를 나타내는 숫자입니다."
			}
		}
	},
	CHIINV: {
		description: "카이 제곱 분포의 단측(오른쪽) 검정 확률의 역함수 값을 반환합니다. probability = CHIDIST(x,...)이면 CHIINV(probability,...) = x입니다. 이 함수를 사용하면 관측값과 기대값을 비교하여 가설이 맞는지 확인할 수 있습니다.",
		abstract: "카이 제곱 분포의 단측(오른쪽) 검정 확률의 역함수 값을 반환합니다. probability = CHIDIST(x,...)이면 CHIINV(probability,...) = x입니다. 이 함수를 사용하면 관측값과 기대값을 비교하여 가설이 맞는지 확인할 수 있습니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/chiinv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "필수. 카이 제곱 분포와 관련된 확률입니다."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "필수. 자유도를 나타내는 숫자입니다."
			}
		}
	},
	CHITEST: {
		description: "독립 검증 결과를 반환합니다. 즉, CHITEST에서는 해당 통계 및 적정 자유도에 대한 카이 제곱(χ2) 분포값이 반환됩니다. χ2 검정을 사용하면 실험에 의해 가설이 검증되었는지 확인할 수 있습니다.",
		abstract: "독립 검증 결과를 반환합니다. 즉, CHITEST에서는 해당 통계 및 적정 자유도에 대한 카이 제곱(χ2) 분포값이 반환됩니다. χ2 검정을 사용하면 실험에 의해 가설이 검증되었는지 확인할 수 있습니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/chitest-function"
		}],
		functionParameter: {
			actualRange: {
				name: "actual_range",
				detail: "필수. 기대값과 비교하여 검정할 관측값이 포함된 데이터 범위입니다."
			},
			expectedRange: {
				name: "expected_range",
				detail: "필수. 행 합계와 열 합계를 곱한 값의 총합계에 대한 비율이 들어 있는 데이터 범위입니다."
			}
		}
	},
	CONFIDENCE: {
		description: "정규 분포를 사용하여 모집단 평균의 신뢰 구간을 반환합니다.",
		abstract: "정규 분포를 사용하여 모집단 평균의 신뢰 구간을 반환합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/confidence-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "필수. 신뢰도 수준을 계산하는 데 사용되는 중요도 수준입니다. 신뢰 수준이 100*(1 - alpha)%와 같거나, 즉 알파가 0.05이면 신뢰 수준이 95%를 나타냅니다."
			},
			standardDev: {
				name: "standard_dev",
				detail: "필수. 데이터 범위에 대한 모집단의 표준 편차로서 그 값을 알고 있다고 가정합니다."
			},
			size: {
				name: "size",
				detail: "필수. 표본 크기입니다."
			}
		}
	},
	COVAR: {
		description: "두 데이터 집합의 각 데이터 요소 쌍에 대한 편차 제품의 평균인 공변을 반환합니다.",
		abstract: "두 데이터 집합의 각 데이터 요소 쌍에 대한 편차 제품의 평균인 공변을 반환합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/covar-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "필수. 첫 번째 정수 셀 범위입니다."
			},
			array2: {
				name: "array2",
				detail: "필수. 두 번째 정수 셀 범위입니다."
			}
		}
	},
	CRITBINOM: {
		description: "누적 이항 분포가 기준치 이상이 되는 값 중 최소값을 반환합니다. 이 함수는 품질 보증 응용 프로그램에 사용합니다. 예를 들어 CRITBINOM 함수를 사용하여 전체 로트를 불합격시키지 않고 조립 라인을 계속 가동할 수 있는 결함 부품의 최대 허용 개수를 확인할 수 있습니다.",
		abstract: "누적 이항 분포가 기준치 이상이 되는 값 중 최소값을 반환합니다. 이 함수는 품질 보증 응용 프로그램에 사용합니다. 예를 들어 CRITBINOM 함수를 사용하여 전체 로트를 불합격시키지 않고 조립 라인을 계속 가동할 수 있는 결함 부품의 최대 허용 개수를 확인할 수 있습니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/critbinom-function"
		}],
		functionParameter: {
			trials: {
				name: "trials",
				detail: "필수. 베르누이 시행 횟수입니다."
			},
			probabilityS: {
				name: "probability_s",
				detail: "필수. 각 시행의 성공 확률입니다."
			},
			alpha: {
				name: "alpha",
				detail: "필수. 기준치입니다."
			}
		}
	},
	EXPONDIST: {
		description: "지수 분포값을 반환합니다. EXPONDIST 함수를 사용하여 현금 출납기가 현금을 지급하는 데 걸리는 시간 등 사건들 사이의 시간을 모델링할 수 있습니다. 예를 들어 EXPONDIST 함수를 사용하여 이 과정에 걸리는 시간이 1분 이내일 확률을 구할 수 있습니다.",
		abstract: "지수 분포값을 반환합니다. EXPONDIST 함수를 사용하여 현금 출납기가 현금을 지급하는 데 걸리는 시간 등 사건들 사이의 시간을 모델링할 수 있습니다. 예를 들어 EXPONDIST 함수를 사용하여 이 과정에 걸리는 시간이 1분 이내일 확률을 구할 수 있습니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/expondist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "필수 요소입니다. 함수 값입니다."
			},
			lambda: {
				name: "lambda",
				detail: "필수. 매개 변수 값입니다."
			},
			cumulative: {
				name: "cumulative",
				detail: "필수. 제공할 지수 함수의 형식을 나타내는 논리 값입니다. 누적이 TRUE이면 EXPONDIST는 누적 분포 함수를 반환합니다. FALSE이면 확률 밀도 함수를 반환합니다."
			}
		}
	},
	FDIST: {
		description: "두 데이터 집합에 대한 단측(오른쪽) 검정 F 확률 분포값(분포도)을 반환합니다. 이 함수를 사용하면 두 데이터 집합의 분포도가 서로 다른지 확인할 수 있습니다. 예를 들어 고등학교에 입학하는 남녀 학생의 성적을 조사하여 남녀 학생의 분포도가 서로 다른지를 알아볼 수 있습니다.",
		abstract: "두 데이터 집합에 대한 단측(오른쪽) 검정 F 확률 분포값(분포도)을 반환합니다. 이 함수를 사용하면 두 데이터 집합의 분포도가 서로 다른지 확인할 수 있습니다. 예를 들어 고등학교에 입학하는 남녀 학생의 성적을 조사하여 남녀 학생의 분포도가 서로 다른지를 알아볼 수 있습니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/fdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "필수 요소입니다. 함수를 계산할 값입니다."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "필수. 분자의 자유도입니다."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "필수. 분모의 자유도입니다."
			}
		}
	},
	FINV: {
		description: "단측(오른쪽) 검정 F 확률 분포의 역함수 값을 반환합니다. p = FDIST(x,...)이면 FINV(p,...) = x입니다.",
		abstract: "단측(오른쪽) 검정 F 확률 분포의 역함수 값을 반환합니다. p = FDIST(x,...)이면 FINV(p,...) = x입니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/finv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "필수. F 누적 분포의 확률값입니다."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "필수. 분자의 자유도입니다."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "필수. 분모의 자유도입니다."
			}
		}
	},
	FTEST: {
		description: "F-검정 결과를 반환합니다. F-검정은 array1과 array2의 분산이 크게 다르지 않은 양측 검증 확률을 반환합니다. 이 함수를 사용하여 두 표본이 다른 분산을 갖는지 확인할 수 있습니다. 예를 들어 공립 학교와 사립 학교의 시험 성적 분포도가 서로 다른지 확인할 수 있습니다.",
		abstract: "F-검정 결과를 반환합니다. F-검정은 array1과 array2의 분산이 크게 다르지 않은 양측 검증 확률을 반환합니다. 이 함수를 사용하여 두 표본이 다른 분산을 갖는지 확인할 수 있습니다. 예를 들어 공립 학교와 사립 학교의 시험 성적 분포도가 서로 다른지 확인할 수 있습니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/ftest-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "필수. 첫 번째 배열 또는 데이터 영역입니다."
			},
			array2: {
				name: "array2",
				detail: "필수. 두 번째 배열 또는 데이터 영역입니다."
			}
		}
	},
	GAMMADIST: {
		description: "감마 분포값을 반환합니다. 이 함수를 사용하면 한쪽으로 치우친 분포의 변수를 연구할 수 있습니다. 감마 분포는 일반적으로 대기 행렬 분석에 사용됩니다.",
		abstract: "감마 분포값을 반환합니다. 이 함수를 사용하면 한쪽으로 치우친 분포의 변수를 연구할 수 있습니다. 감마 분포는 일반적으로 대기 행렬 분석에 사용됩니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/gammadist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "필수 요소입니다. 분포를 계산하려는 값입니다."
			},
			alpha: {
				name: "alpha",
				detail: "필수. 분포의 매개 변수입니다."
			},
			beta: {
				name: "beta",
				detail: "필수. 분포의 매개 변수입니다. beta = 1이면 GAMMADIST에서는 표준 감마 분포를 반환합니다."
			},
			cumulative: {
				name: "cumulative",
				detail: "필수. 함수의 형식을 결정하는 논리 값입니다. 누적이 TRUE이면 GAMMADIST는 누적 분포 함수를 반환합니다. FALSE이면 확률 밀도 함수를 반환합니다."
			}
		}
	},
	GAMMAINV: {
		description: "감마 누적 분포의 역함수 값을 반환합니다. p = GAMMADIST(x,...)이면 GAMMAINV(p,...) = x입니다. 이 함수를 사용하면 한쪽으로 치우친 분포의 변수를 연구할 수 있습니다.",
		abstract: "감마 누적 분포의 역함수 값을 반환합니다. p = GAMMADIST(x,...)이면 GAMMAINV(p,...) = x입니다. 이 함수를 사용하면 한쪽으로 치우친 분포의 변수를 연구할 수 있습니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/gammainv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "필수. 감마 분포와 관련된 확률입니다."
			},
			alpha: {
				name: "alpha",
				detail: "필수. 분포의 매개 변수입니다."
			},
			beta: {
				name: "beta",
				detail: "필수. 분포의 매개 변수입니다. beta = 1이면 GAMMAINV에서는 표준 감마 분포를 반환합니다."
			}
		}
	},
	HYPGEOMDIST: {
		description: "초기하 분포값을 반환합니다. HYPGEOMDIST 함수는 주어진 표본의 크기, 모집단의 성공 도수와 크기에 대하여 주어진 표본의 성공 도수가 출현할 확률을 반환합니다. 각 사건의 결과가 성공 또는 실패이고, 주어진 크기의 모집단에서 각 부분 집합 표본을 동등하게 추출하는 유한 모집단의 문제에 이 함수를 사용합니다.",
		abstract: "초기하 분포값을 반환합니다. HYPGEOMDIST 함수는 주어진 표본의 크기, 모집단의 성공 도수와 크기에 대하여 주어진 표본의 성공 도수가 출현할 확률을 반환합니다. 각 사건의 결과가 성공 또는 실패이고, 주어진 크기의 모집단에서 각 부분 집합 표본을 동등하게 추출하는 유한 모집단의 문제에 이 함수를 사용합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/hypgeomdist-function"
		}],
		functionParameter: {
			sampleS: {
				name: "sample_s",
				detail: "필수. 표본의 성공 도수입니다."
			},
			numberSample: {
				name: "number_sample",
				detail: "필수. 표본 크기입니다."
			},
			populationS: {
				name: "population_s",
				detail: "필수. 모집단의 성공 도수입니다."
			},
			numberPop: {
				name: "number_pop",
				detail: "필수. 모집단 크기입니다."
			}
		}
	},
	LOGINV: {
		description: "ln(x)가 mean과 standard_dev를 매개 변수로 갖는 정규 분포인 경우 x에 대한 로그 정규 누적 분포 함수의 역함수 값을 반환합니다. p = LOGNORMDIST(x,...)이면 LOGINV(p,...) = x입니다.",
		abstract: "ln(x)가 mean과 standard_dev를 매개 변수로 갖는 정규 분포인 경우 x에 대한 로그 정규 누적 분포 함수의 역함수 값을 반환합니다. p = LOGNORMDIST(x,...)이면 LOGINV(p,...) = x입니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/loginv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "필수. 로그 정규 분포와 관련된 확률입니다."
			},
			mean: {
				name: "mean",
				detail: "필수. ln(x)의 평균입니다."
			},
			standardDev: {
				name: "standard_dev",
				detail: "필수. ln(x)의 표준 편차입니다."
			}
		}
	},
	LOGNORMDIST: {
		description: "ln(x)가 mean과 standard_dev를 매개 변수로 갖는 정규 분포인 경우 x에 대한 로그 정규 누적 분포값을 반환합니다. 이 함수를 사용하여 로그값으로 변환된 데이터를 분석합니다.",
		abstract: "ln(x)가 mean과 standard_dev를 매개 변수로 갖는 정규 분포인 경우 x에 대한 로그 정규 누적 분포값을 반환합니다. 이 함수를 사용하여 로그값으로 변환된 데이터를 분석합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/lognormdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "필수 요소입니다. 함수를 계산할 값입니다."
			},
			mean: {
				name: "mean",
				detail: "필수. ln(x)의 평균입니다."
			},
			standardDev: {
				name: "standard_dev",
				detail: "필수. ln(x)의 표준 편차입니다."
			}
		}
	},
	MODE: {
		description: "30년 동안 중요한 습지에서 조류 수의 표본에서 목격된 조류 종의 가장 일반적인 수를 알아보거나, 사용량이 적은 시간에 전화 지원 센터에서 가장 자주 발생하는 전화 통화 수를 알아보고 싶다고 가정해 보겠습니다. 숫자 그룹의 모드를 계산하려면 MODE 함수를 사용합니다.",
		abstract: "30년 동안 중요한 습지에서 조류 수의 표본에서 목격된 조류 종의 가장 일반적인 수를 알아보거나, 사용량이 적은 시간에 전화 지원 센터에서 가장 자주 발생하는 전화 통화 수를 알아보고 싶다고 가정해 보겠습니다. 숫자 그룹의 모드를 계산하려면 MODE 함수를 사용합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/mode-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "필수. 최빈값을 계산할 첫 번째 숫자 인수입니다."
			},
			number2: {
				name: "number2",
				detail: "선택적. 최빈값을 계산할 숫자 인수로, 2개에서 255개까지 지정할 수 있습니다. 쉼표로 구분된 인수 대신 단일 배열이나 배열에 대한 참조를 사용할 수도 있습니다."
			}
		}
	},
	NEGBINOMDIST: {
		description: "음수 이항 분포를 반환합니다. NEGBINOMDIST는 성공의 일정한 확률이 probability_s 경우 number_s 성공 전에 number_f 오류가 발생할 확률을 반환합니다. 이 함수는 성공 횟수가 고정되고 평가판 수가 가변적이라는 점을 제외하고 이항 분포와 유사합니다. 이항과 마찬가지로 평가판은 독립적인 것으로 간주됩니다.",
		abstract: "음수 이항 분포를 반환합니다. NEGBINOMDIST는 성공의 일정한 확률이 probability_s 경우 number_s 성공 전에 number_f 오류가 발생할 확률을 반환합니다. 이 함수는 성공 횟수가 고정되고 평가판 수가 가변적이라는 점을 제외하고 이항 분포와 유사합니다. 이항과 마찬가지로 평가판은 독립적인 것으로 간주됩니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/negbinomdist-function"
		}],
		functionParameter: {
			numberF: {
				name: "number_f",
				detail: "필수. 실패 횟수입니다."
			},
			numberS: {
				name: "number_s",
				detail: "필수. 성공 횟수의 임계값입니다."
			},
			probabilityS: {
				name: "probability_s",
				detail: "필수. 성공 확률입니다."
			}
		}
	},
	NORMDIST: {
		description: "NORMDIST 함수는 지정된 평균 및 표준 편차에 대한 정규 분포를 반환합니다. 이 함수에는 가설 테스트를 포함하여 다양한 통계 애플리케이션이 있습니다.",
		abstract: "NORMDIST 함수는 지정된 평균 및 표준 편차에 대한 정규 분포를 반환합니다. 이 함수에는 가설 테스트를 포함하여 다양한 통계 애플리케이션이 있습니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/normdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "필수 요소입니다. 배포하려는 값입니다."
			},
			mean: {
				name: "mean",
				detail: "필수. 분포의 산술 평균"
			},
			standardDev: {
				name: "standard_dev",
				detail: "필수. 배포의 표준 편차"
			},
			cumulative: {
				name: "cumulative",
				detail: "필수. 함수의 형식을 결정하는 논리 값입니다. 누적이 TRUE이면 NORMDIST는 누적 분포 함수를 반환합니다. 누적이 FALSE이면 확률 질량 함수를 반환합니다."
			}
		}
	},
	NORMINV: {
		description: "지정된 평균과 표준 편차에 대한 정규 누적 분포의 역함수 값을 반환합니다.",
		abstract: "지정된 평균과 표준 편차에 대한 정규 누적 분포의 역함수 값을 반환합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/norminv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "필수. 정규 분포를 따르는 확률입니다."
			},
			mean: {
				name: "mean",
				detail: "필수. 분포의 산술 평균입니다."
			},
			standardDev: {
				name: "standard_dev",
				detail: "필수. 분포의 표준 편차입니다."
			}
		}
	},
	NORMSDIST: {
		description: "표준 정규 누적 분포 함수를 반환합니다. 이 분포의 평균은 0이며 표준 편차는 1입니다. 표준 정규 곡선 면적 표 대신 이 함수를 사용합니다.",
		abstract: "표준 정규 누적 분포 함수를 반환합니다. 이 분포의 평균은 0이며 표준 편차는 1입니다. 표준 정규 곡선 면적 표 대신 이 함수를 사용합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/normsdist-function"
		}],
		functionParameter: { z: {
			name: "z",
			detail: "필수 요소입니다. 분포를 구하려는 값입니다."
		} }
	},
	NORMSINV: {
		description: "표준 정규 누적 분포의 역함수 값을 반환합니다. 이 분포의 평균은 0이고 표준 편차는 1입니다.",
		abstract: "표준 정규 누적 분포의 역함수 값을 반환합니다. 이 분포의 평균은 0이고 표준 편차는 1입니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/normsinv-function"
		}],
		functionParameter: { probability: {
			name: "probability",
			detail: "필수. 정규 분포를 따르는 확률입니다."
		} }
	},
	PERCENTILE: {
		description: "범위에서 k번째 백분위수 값을 반환합니다. 이 함수를 사용하면 수용 한계값을 설정할 수 있습니다. 예를 들어 점수가 90번째 백분위수를 넘는 후보를 검색할 수 있습니다.",
		abstract: "범위에서 k번째 백분위수 값을 반환합니다. 이 함수를 사용하면 수용 한계값을 설정할 수 있습니다. 예를 들어 점수가 90번째 백분위수를 넘는 후보를 검색할 수 있습니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/percentile-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "필수. 상대 순위를 정의하는 데이터 배열 또는 범위입니다."
			},
			k: {
				name: "k",
				detail: "필수 요소입니다. 0에서 1 사이 범위의 백분위수 값입니다."
			}
		}
	},
	PERCENTRANK: {
		description: "PERCENTRANK 함수는 데이터 세트의 값 순위를 데이터 세트의 백분율로 반환합니다. 기본적으로 전체 데이터 세트 내 값의 상대 순위입니다. 예를 들어 PERCENTRANK를 사용하여 동일한 테스트에 대한 모든 점수 필드 중 개별 테스트 점수의 순위를 확인할 수 있습니다.",
		abstract: "PERCENTRANK 함수는 데이터 세트의 값 순위를 데이터 세트의 백분율로 반환합니다. 기본적으로 전체 데이터 세트 내 값의 상대 순위입니다. 예를 들어 PERCENTRANK를 사용하여 동일한 테스트에 대한 모든 점수 필드 중 개별 테스트 점수의 순위를 확인할 수 있습니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/percentrank-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "필수. 백분율 순위가 결정되는 숫자 값의 데이터 범위(또는 미리 정의된 배열)입니다."
			},
			x: {
				name: "x",
				detail: "필수 요소입니다. 배열 내의 순위를 알고자 하는 값입니다."
			},
			significance: {
				name: "significance",
				detail: "선택적. 백분율 값의 유효 자릿수를 나타내는 값입니다. 이 인수를 생략하면 PERCENTRANK에서는 세 자릿수(0.xxx)가 사용됩니다."
			}
		}
	},
	POISSON: {
		description: "포아송 확률 분포값을 반환합니다. 포아송 분포를 사용하여 유료 주차장에 1분 동안 도착하는 자동차 수를 알아보는 경우처럼 특정 시간 동안 발생하는 사건 수를 예측할 수 있습니다.",
		abstract: "포아송 확률 분포값을 반환합니다. 포아송 분포를 사용하여 유료 주차장에 1분 동안 도착하는 자동차 수를 알아보는 경우처럼 특정 시간 동안 발생하는 사건 수를 예측할 수 있습니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/poisson-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "필수 요소입니다. 사건의 수입니다."
			},
			mean: {
				name: "mean",
				detail: "필수. 기대값입니다."
			},
			cumulative: {
				name: "cumulative",
				detail: "필수. 반환된 확률 분포의 형태를 결정하는 논리 값입니다. 누적이 TRUE이면, POISSON은 발생하는 임의 이벤트의 수가 0에서 x 사이일 수 있는 누적 포아송 확률을 반환합니다. FALSE이면 발생하는 이벤트 수가 정확히 x인 Poisson 확률 질량 함수를 반환합니다."
			}
		}
	},
	QUARTILE: {
		description: "데이터 집합에서 사분위수를 반환합니다. 사분위수는 판매 자료나 조사 자료의 모집단을 몇 개의 그룹으로 나눌 때 사용합니다. 예를 들어 QUARTILE을 사용하여 모집단에서 수익이 상위 25%인 자료들을 구할 수 있습니다.",
		abstract: "데이터 집합에서 사분위수를 반환합니다. 사분위수는 판매 자료나 조사 자료의 모집단을 몇 개의 그룹으로 나눌 때 사용합니다. 예를 들어 QUARTILE을 사용하여 모집단에서 수익이 상위 25%인 자료들을 구할 수 있습니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/quartile-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "필수. 사분위수를 계산하려는 숫자 값의 배열 또는 셀 범위입니다."
			},
			quart: {
				name: "quart",
				detail: "필수. 계산하려는 사분위수입니다."
			}
		}
	},
	RANK: {
		description: "수 목록 내에서 지정한 수의 크기 순위를 반환합니다. 수의 순위는 목록에 있는 다른 수와의 상대 크기를 말합니다. 목록을 정렬하면 수의 위치와 순위가 같아질 수 있습니다.",
		abstract: "수 목록 내에서 지정한 수의 크기 순위를 반환합니다. 수의 순위는 목록에 있는 다른 수와의 상대 크기를 말합니다. 목록을 정렬하면 수의 위치와 순위가 같아질 수 있습니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/rank-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "필수. 순위를 구하려는 수입니다."
			},
			ref: {
				name: "ref",
				detail: "필수. 숫자 목록에 대한 참조입니다. 숫자 이외의 값은 무시됩니다."
			},
			order: {
				name: "order",
				detail: "선택적. 순위 결정 방법을 지정하는 수입니다. order가 0이거나 이를 생략하면 ref가 내림차순으로 정렬된 목록인 것으로 가정하여 number의 순위를 부여합니다. order가 0이 아니면 ref가 오름차순으로 정렬된 목록인 것으로 가정하여 number의 순위를 부여합니다."
			}
		}
	},
	STDEV: {
		description: "표본 집단의 표준 편차를 구합니다. 표준 편차를 통해 값이 평균 값에서 벗어나 있는 정도를 알 수 있습니다.",
		abstract: "표본 집단의 표준 편차를 구합니다. 표준 편차를 통해 값이 평균 값에서 벗어나 있는 정도를 알 수 있습니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/stdev-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "필수. 모집단 표본에 해당하는 첫 번째 숫자 인수입니다."
			},
			number2: {
				name: "number2",
				detail: "선택적. 모집단 표본에 해당하는 숫자 인수로, 2개에서 255개까지 지정할 수 있습니다. 쉼표로 구분된 인수 대신 단일 배열이나 배열에 대한 참조를 사용할 수도 있습니다."
			}
		}
	},
	STDEVP: {
		description: "인수로 주어진 모집단 전체의 표준 편차를 계산합니다. 표준 편차를 통해 값이 평균 값에서 벗어나 있는 정도를 알 수 있습니다.",
		abstract: "인수로 주어진 모집단 전체의 표준 편차를 계산합니다. 표준 편차를 통해 값이 평균 값에서 벗어나 있는 정도를 알 수 있습니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/stdevp-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "필수. 모집단에 해당하는 첫 번째 숫자 인수입니다."
			},
			number2: {
				name: "number2",
				detail: "선택적. 모집단에 해당하는 숫자 인수로, 2개에서 255개까지 지정할 수 있습니다. 쉼표로 구분된 인수 대신 단일 배열이나 배열에 대한 참조를 사용할 수도 있습니다."
			}
		}
	},
	TDIST: {
		description: "학생 t 분포의 백분율 포인트(확률)를 반환합니다. 여기서 숫자 값(x)은 백분율 포인트를 계산할 t의 계산 값입니다. t-분포는 소표본의 데이터를 가설 검정할 때 사용됩니다. t-분포의 임계값 표 대신 이 함수를 사용합니다.",
		abstract: "학생 t 분포의 백분율 포인트(확률)를 반환합니다. 여기서 숫자 값(x)은 백분율 포인트를 계산할 t의 계산 값입니다. t-분포는 소표본의 데이터를 가설 검정할 때 사용됩니다. t-분포의 임계값 표 대신 이 함수를 사용합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/tdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "필수 요소입니다. 분포를 구하려는 숫자 값입니다."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "필수. 자유도를 나타내는 정수입니다."
			},
			tails: {
				name: "tails",
				detail: "필수. 반환할 배포 꼬리 수를 지정합니다. Tails = 1이면 TDIST는 단측 분포를 반환합니다. Tails = 2이면 TDIST는 두 꼬리 분포를 반환합니다."
			}
		}
	},
	TINV: {
		description: "스튜던트 t-분포의 양측 역함수 값을 반환합니다.",
		abstract: "스튜던트 t-분포의 양측 역함수 값을 반환합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/tinv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "필수. 양측 스튜던트 t-분포의 확률값입니다."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "필수. 분포를 결정짓는 자유도를 나타내는 숫자입니다."
			}
		}
	},
	TTEST: {
		description: "스튜던트 t-검정에 근거한 확률을 반환합니다. TTEST 함수를 사용하여 두 개의 표본이 같은 평균값을 갖는 두 개의 같은 모집단에서 추출한 것인지를 판단할 수 있습니다.",
		abstract: "스튜던트 t-검정에 근거한 확률을 반환합니다. TTEST 함수를 사용하여 두 개의 표본이 같은 평균값을 갖는 두 개의 같은 모집단에서 추출한 것인지를 판단할 수 있습니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/ttest-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "필수. 첫 번째 데이터 집합입니다."
			},
			array2: {
				name: "array2",
				detail: "필수. 두 번째 데이터 집합입니다."
			},
			tails: {
				name: "tails",
				detail: "필수. 분포 꼬리 수를 지정합니다. tails = 1이면 TTEST는 단측 분포를 사용합니다. tails = 2인 경우 TTEST는 두 꼬리 분포를 사용합니다."
			},
			type: {
				name: "type",
				detail: "필수. 실행할 t-검정의 종류입니다."
			}
		}
	},
	VAR: {
		description: "표본의 분산을 예측합니다.",
		abstract: "표본의 분산을 예측합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/var-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "필수. 모집단 표본에 해당하는 첫 번째 숫자 인수입니다."
			},
			number2: {
				name: "number2",
				detail: "선택적. 모집단 표본에 해당하는 숫자 인수로, 2개에서 255개까지 지정할 수 있습니다."
			}
		}
	},
	VARP: {
		description: "전체 모집단의 분산을 계산합니다.",
		abstract: "전체 모집단의 분산을 계산합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/varp-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "필수. 모집단에 해당하는 첫 번째 숫자 인수입니다."
			},
			number2: {
				name: "number2",
				detail: "선택적. 모집단에 해당하는 숫자 인수로, 2개에서 255개까지 지정할 수 있습니다."
			}
		}
	},
	WEIBULL: {
		description: "와이블 분포값을 반환합니다. 이 분포는 장치의 평균 고장 시간을 계산하는 경우와 같은 신뢰도 분석에 사용합니다.",
		abstract: "와이블 분포값을 반환합니다. 이 분포는 장치의 평균 고장 시간을 계산하는 경우와 같은 신뢰도 분석에 사용합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/weibull-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "필수 요소입니다. 함수를 계산할 값입니다."
			},
			alpha: {
				name: "alpha",
				detail: "필수. 분포의 매개 변수입니다."
			},
			beta: {
				name: "beta",
				detail: "필수. 분포의 매개 변수입니다."
			},
			cumulative: {
				name: "cumulative",
				detail: "필수. 함수의 형태를 결정하는 인수입니다."
			}
		}
	},
	ZTEST: {
		description: "z-검정의 단측 검정 확률값을 반환합니다. 가설 모집단 평균 μ0가 주어진 경우 ZTEST 함수는 표본 평균이 데이터 집합(배열)의 관측 평균, 즉 관측된 표본 평균보다 클 확률을 반환합니다.",
		abstract: "z-검정의 단측 검정 확률값을 반환합니다. 가설 모집단 평균 μ0가 주어진 경우 ZTEST 함수는 표본 평균이 데이터 집합(배열)의 관측 평균, 즉 관측된 표본 평균보다 클 확률을 반환합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/ztest-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "필수. x를 검정할 데이터의 배열 또는 범위입니다."
			},
			x: {
				name: "x",
				detail: "필수 요소입니다. 검정할 값입니다."
			},
			sigma: {
				name: "sigma",
				detail: "선택적. 모집단(알려진) 표준 편차입니다. 생략하면 샘플 표준 편차가 사용됩니다."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/cube/ko-KR.ts
const locale$13 = {
	CUBEKPIMEMBER: {
		description: "KPI(핵심 성과 지표) 속성을 반환하고 셀에 KPI 이름을 표시합니다. KPI는 월별 매출총이익, 분기별 직원 전직률과 같이 수량화할 수 있는 측정값이며 조직의 성과를 모니터링하는 데 사용됩니다.",
		abstract: "KPI(핵심 성과 지표) 속성을 반환하고 셀에 KPI 이름을 표시합니다. KPI는 월별 매출총이익, 분기별 직원 전직률과 같이 수량화할 수 있는 측정값이며 조직의 성과를 모니터링하는 데 사용됩니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/cubekpimember-function"
		}],
		functionParameter: {
			connection: {
				name: "연결",
				detail: "필수. 큐브에 대한 연결 이름을 나타내는 텍스트 문자열입니다."
			},
			kpiName: {
				name: "Kpi_name",
				detail: "필수. 큐브의 KPI 이름을 나타내는 텍스트 문자열입니다."
			},
			kpiProperty: {
				name: "Kpi_property",
				detail: "필수. 반환되는 KPI 구성 요소로서 다음 중 하나일 수 있습니다."
			},
			caption: {
				name: "캡션",
				detail: "선택적. kpi_name과 kpi_property 대신 셀에 표시되는 대체 텍스트 문자열입니다."
			}
		}
	},
	CUBEMEMBER: {
		description: "큐브에서 구성원이나 튜플을 반환합니다. 큐브에 구성원이나 튜플이 있는지 확인하는 데 사용합니다.",
		abstract: "큐브에서 구성원이나 튜플을 반환합니다. 큐브에 구성원이나 튜플이 있는지 확인하는 데 사용합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/cubemember-function"
		}],
		functionParameter: {
			connection: {
				name: "연결",
				detail: "필수. 큐브에 대한 연결 이름을 나타내는 텍스트 문자열입니다."
			},
			memberExpression: {
				name: "Member_expression",
				detail: "필수. 큐브에서 고유한 구성원으로 평가되는 MDX(다차원 식)의 텍스트 문자열입니다. 또는 member_expression은 셀 범위 또는 배열 상수로 지정된 튜플이 될 수 있습니다."
			},
			caption: {
				name: "캡션",
				detail: "선택적. 정의된 경우 큐브에서 캡션 대신 셀에 표시되는 텍스트 문자열입니다. 튜플이 반환될 경우 사용되는 캡션은 해당 튜플의 마지막 구성원에 대한 캡션입니다."
			}
		}
	},
	CUBEMEMBERPROPERTY: {
		description: "Excel의 Cube 함수 중 하나인 CUBEMEMBERPROPERTY 함수는 큐브에서 멤버 속성의 값을 반환합니다. 큐브 내에 구성원 이름이 있는지 확인하고 해당 구성원에 지정된 속성을 반환하는 데 사용합니다.",
		abstract: "Excel의 Cube 함수 중 하나인 CUBEMEMBERPROPERTY 함수는 큐브에서 멤버 속성의 값을 반환합니다. 큐브 내에 구성원 이름이 있는지 확인하고 해당 구성원에 지정된 속성을 반환하는 데 사용합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/cubememberproperty-function"
		}],
		functionParameter: {
			connection: {
				name: "연결",
				detail: "필수. 큐브에 대한 연결 이름을 나타내는 텍스트 문자열입니다."
			},
			memberExpression: {
				name: "Member_expression",
				detail: "필수. 큐브 내에 있는 구성원의 MDX(다차원 식)를 나타내는 텍스트 문자열입니다."
			},
			property: {
				name: "속성",
				detail: "필수. 반환되는 속성의 이름을 나타내는 텍스트 문자열이거나 속성 이름을 포함하는 셀에 대한 참조입니다."
			}
		}
	},
	CUBERANKEDMEMBER: {
		description: "집합에서 n번째 또는 순위 내의 구성원을 반환합니다. 최고 판매 사원이나 10등 내의 학생 등 집합에서 하나 이상의 요소를 반환하는 데 사용합니다.",
		abstract: "집합에서 n번째 또는 순위 내의 구성원을 반환합니다. 최고 판매 사원이나 10등 내의 학생 등 집합에서 하나 이상의 요소를 반환하는 데 사용합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/cuberankedmember-function"
		}],
		functionParameter: {
			connection: {
				name: "연결",
				detail: "필수. 큐브에 대한 연결 이름을 나타내는 텍스트 문자열입니다."
			},
			setExpression: {
				name: "Set_expression",
				detail: "필수. \"{[Item1].children}\"과 같은 집합 식을 나타내는 텍스트 문자열입니다. set_expression은 CUBESET 함수이거나 CUBESET 함수를 포함하는 셀에 대한 참조일 수도 있습니다."
			},
			rank: {
				name: "순위",
				detail: "필수. 반환할 맨 위 값을 지정하는 정수 값입니다. rank가 1이면 최상위 값을 반환하고 rank가 2이면 최상위에서 두 번째 값을 반환합니다. 상위 5개의 값을 반환하려면 CUBERANKEDMEMBER를 다섯 번 사용하고 1부터 5까지 매번 다른 순위를 지정하십시오."
			},
			caption: {
				name: "캡션",
				detail: "선택적. 정의된 경우 큐브에서 캡션 대신 셀에 표시되는 텍스트 문자열입니다."
			}
		}
	},
	CUBESET: {
		description: "서버의 큐브에 집합을 만드는 식을 전송하여 계산된 구성원이나 튜플 집합을 정의하고 이 집합을 Microsoft Excel에 반환합니다.",
		abstract: "서버의 큐브에 집합을 만드는 식을 전송하여 계산된 구성원이나 튜플 집합을 정의하고 이 집합을 Microsoft Excel에 반환합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/cubeset-function"
		}],
		functionParameter: {
			connection: {
				name: "연결",
				detail: "필수. 큐브에 대한 연결 이름을 나타내는 텍스트 문자열입니다."
			},
			setExpression: {
				name: "Set_expression",
				detail: "필수. 구성원 또는 튜플의 집합을 만드는 집합 식을 나타내는 텍스트 문자열입니다. set_expression은 집합에 포함된 구성원, 튜플 또는 하위 집합이 하나 이상 들어 있는 Excel 범위에 대한 셀 참조일 수도 있습니다."
			},
			caption: {
				name: "캡션",
				detail: "선택적. 정의된 경우 큐브에서 캡션 대신 셀에 표시되는 텍스트 문자열입니다."
			},
			sortOrder: {
				name: "Sort_order",
				detail: "선택적. 수행할 정렬 유형으로서 다음 중 하나일 수 있습니다."
			},
			sortBy: {
				name: "Sort_by",
				detail: "선택적. 정렬 기준으로 사용할 값을 나타내는 텍스트 문자열입니다. 예를 들어 판매량이 가장 높은 도시를 가져오려면 set_expression에 도시 집합을 지정하고 sort_by에 판매량 측정값을 지정합니다. 인구가 가장 많은 도시를 가져오려면 set_expression에 도시 집합을 지정하고 sort_by에 인구 측정값을 지정합니다. sort_order에 sort_by가 필요한 경우 sort_by를 지정하지 않으면 CUBESET에서는 #VALUE! 오류 메시지가 반환됩니다."
			}
		}
	},
	CUBESETCOUNT: {
		description: "집합에서 항목 개수를 반환합니다.",
		abstract: "집합에서 항목 개수를 반환합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/cubesetcount-function"
		}],
		functionParameter: { set: {
			name: "설정",
			detail: "필수. CUBESET 함수에 의해 정의된 집합으로 계산되는 Microsoft Excel 식을 나타내는 텍스트 문자열입니다. set은 CUBESET 함수이거나 CUBESET 함수를 포함하는 셀에 대한 참조일 수도 있습니다."
		} }
	},
	CUBEVALUE: {
		description: "큐브에서 집계 값을 반환합니다.",
		abstract: "큐브에서 집계 값을 반환합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/cubevalue-function"
		}],
		functionParameter: {
			connection: {
				name: "연결",
				detail: "필수. 큐브에 대한 연결 이름을 나타내는 텍스트 문자열입니다."
			},
			memberExpression: {
				name: "Member_expression",
				detail: "선택적. 큐브 내의 멤버 또는 튜플로 계산되는 MDX(다차원 식)의 텍스트 문자열입니다. 또는 member_expression CUBESET 함수로 정의된 집합일 수 있습니다. member_expression 슬라이서로 사용하여 집계된 값이 반환되는 큐브 부분을 정의합니다. member_expression 측정값이 지정되지 않은 경우 해당 큐브에 대한 기본 측정값이 사용됩니다."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/database/ko-KR.ts
const locale$12 = {
	DAVERAGE: {
		description: "목록이나 데이터베이스의 레코드 필드(열)에서 지정한 조건에 맞는 값의 평균을 계산합니다.",
		abstract: "목록이나 데이터베이스의 레코드 필드(열)에서 지정한 조건에 맞는 값의 평균을 계산합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/daverage-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "는 목록 또는 데이터베이스를 구성하는 셀 범위입니다. 데이터베이스는 레코드(관련 정보 행)와 필드(데이터 열)로 이루어진 관련 데이터 목록입니다. 목록의 첫째 행에는 각 열의 레이블이 있습니다."
			},
			field: {
				name: "field",
				detail: "함수에 사용되는 열을 나타냅니다. field 인수는 \"나이\" 또는 \"수확량\"처럼 열 레이블을 큰따옴표로 묶어 텍스트로 지정하거나 첫째 열을 1, 둘째 열을 2 등 목록 내의 열 위치를 나타내는 숫자로 지정할 수 있습니다."
			},
			criteria: {
				name: "criteria",
				detail: "은 지정한 조건을 포함하는 셀 범위입니다. 적어도 하나의 열 레이블이 있고 열 레이블 아래에 열 조건을 지정할 셀이 하나 이상 포함된 범위를 criteria 인수로 사용할 수 있습니다."
			}
		}
	},
	DCOUNT: {
		description: "목록이나 데이터베이스의 레코드 필드(열)에서 지정한 조건에 맞는 숫자가 있는 셀의 개수를 계산합니다.",
		abstract: "목록이나 데이터베이스의 레코드 필드(열)에서 지정한 조건에 맞는 숫자가 있는 셀의 개수를 계산합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/dcount-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "필수. 데이터베이스나 목록으로 지정할 셀 범위입니다. 데이터베이스는 레코드(관련 정보 행)와 필드(데이터 열)로 이루어진 관련 데이터 목록입니다. 목록의 첫째 행에는 각 열의 레이블이 있습니다."
			},
			field: {
				name: "field",
				detail: "필수. 함수에 사용되는 열을 지정합니다. field 인수는 \"나이\" 또는 \"수확량\"처럼 열 레이블을 큰따옴표로 묶어 텍스트로 지정하거나 첫째 열을 1, 둘째 열을 2 등 목록 내의 열 위치를 나타내는 숫자로 지정할 수 있습니다."
			},
			criteria: {
				name: "criteria",
				detail: "필수. 지정한 조건이 있는 셀 범위입니다. 적어도 하나의 열 레이블이 있고 열 레이블 아래에 열 조건을 지정할 셀이 하나 이상 포함된 범위를 criteria 인수로 사용할 수 있습니다."
			}
		}
	},
	DCOUNTA: {
		description: "목록이나 데이터베이스의 레코드 필드(열)에서 지정한 조건에 맞는 셀 중 비어 있지 않은 셀의 개수를 계산합니다.",
		abstract: "목록이나 데이터베이스의 레코드 필드(열)에서 지정한 조건에 맞는 셀 중 비어 있지 않은 셀의 개수를 계산합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/dcounta-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "필수. 데이터베이스나 목록으로 지정할 셀 범위입니다. 데이터베이스는 레코드(관련 정보 행)와 필드(데이터 열)로 이루어진 관련 데이터 목록입니다. 목록의 첫째 행에는 각 열의 레이블이 있습니다."
			},
			field: {
				name: "field",
				detail: "선택적. 함수에 사용되는 열을 지정합니다. field 인수는 \"나이\" 또는 \"수확량\"처럼 열 레이블을 큰따옴표로 묶어 텍스트로 지정하거나 첫째 열을 1, 둘째 열을 2 등 목록 내의 열 위치를 나타내는 숫자로 지정할 수 있습니다."
			},
			criteria: {
				name: "criteria",
				detail: "필수. 지정한 조건이 있는 셀 범위입니다. 적어도 하나의 열 레이블이 있고 열 레이블 아래에 열 조건을 지정할 셀이 하나 이상 포함된 범위를 criteria 인수로 사용할 수 있습니다."
			}
		}
	},
	DGET: {
		description: "목록이나 데이터베이스의 열에서 지정한 조건에 맞는 하나의 값을 추출합니다.",
		abstract: "목록이나 데이터베이스의 열에서 지정한 조건에 맞는 하나의 값을 추출합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/dget-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "필수. 데이터베이스나 목록으로 지정할 셀 범위입니다. 데이터베이스는 레코드(관련 정보 행)와 필드(데이터 열)로 이루어진 관련 데이터 목록입니다. 목록의 첫째 행에는 각 열의 레이블이 있습니다."
			},
			field: {
				name: "field",
				detail: "필수. 함수에 사용되는 열을 지정합니다. field 인수는 \"나이\" 또는 \"수확량\"처럼 열 레이블을 큰따옴표로 묶어 텍스트로 지정하거나 첫째 열을 1, 둘째 열을 2 등 목록 내의 열 위치를 나타내는 숫자로 지정할 수 있습니다."
			},
			criteria: {
				name: "criteria",
				detail: "필수. 지정한 조건이 있는 셀 범위입니다. 적어도 하나의 열 레이블이 있고 열 레이블 아래에 열 조건을 지정할 셀이 하나 이상 포함된 범위를 criteria 인수로 사용할 수 있습니다."
			}
		}
	},
	DMAX: {
		description: "목록이나 데이터베이스의 레코드 필드(열)에서 지정한 조건에 맞는 가장 큰 값을 반환합니다.",
		abstract: "목록이나 데이터베이스의 레코드 필드(열)에서 지정한 조건에 맞는 가장 큰 값을 반환합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/dmax-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "필수. 데이터베이스나 목록으로 지정할 셀 범위입니다. 데이터베이스는 레코드(관련 정보 행)와 필드(데이터 열)로 이루어진 관련 데이터 목록입니다. 목록의 첫째 행에는 각 열의 레이블이 있습니다."
			},
			field: {
				name: "field",
				detail: "필수. 함수에 사용되는 열을 지정합니다. field 인수는 \"나이\" 또는 \"수확량\"처럼 열 레이블을 큰따옴표로 묶어 텍스트로 지정하거나 첫째 열을 1, 둘째 열을 2 등 목록 내의 열 위치를 나타내는 숫자로 지정할 수 있습니다."
			},
			criteria: {
				name: "criteria",
				detail: "필수. 지정한 조건이 있는 셀 범위입니다. 적어도 하나의 열 레이블이 있고 열 레이블 아래에 열 조건을 지정할 셀이 하나 이상 포함된 범위를 criteria 인수로 사용할 수 있습니다."
			}
		}
	},
	DMIN: {
		description: "목록이나 데이터베이스의 레코드 필드(열)에서 지정한 조건에 맞는 가장 작은 값을 반환합니다.",
		abstract: "목록이나 데이터베이스의 레코드 필드(열)에서 지정한 조건에 맞는 가장 작은 값을 반환합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/dmin-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "필수. 데이터베이스나 목록으로 지정할 셀 범위입니다. 데이터베이스는 레코드(관련 정보 행)와 필드(데이터 열)로 이루어진 관련 데이터 목록입니다. 목록의 첫째 행에는 각 열의 레이블이 있습니다."
			},
			field: {
				name: "field",
				detail: "필수. 함수에 사용되는 열을 지정합니다. field 인수는 \"나이\" 또는 \"수확량\"처럼 열 레이블을 큰따옴표로 묶어 텍스트로 지정하거나 첫째 열을 1, 둘째 열을 2 등 목록 내의 열 위치를 나타내는 숫자로 지정할 수 있습니다."
			},
			criteria: {
				name: "criteria",
				detail: "필수. 지정한 조건이 있는 셀 범위입니다. 적어도 하나의 열 레이블이 있고 열 레이블 아래에 열 조건을 지정할 셀이 하나 이상 포함된 범위를 criteria 인수로 사용할 수 있습니다."
			}
		}
	},
	DPRODUCT: {
		description: "목록이나 데이터베이스의 레코드 필드(열)에서 지정한 조건에 맞는 값을 곱합니다.",
		abstract: "목록이나 데이터베이스의 레코드 필드(열)에서 지정한 조건에 맞는 값을 곱합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/dproduct-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "필수. 데이터베이스나 목록으로 지정할 셀 범위입니다. 데이터베이스는 레코드(관련 정보 행)와 필드(데이터 열)로 이루어진 관련 데이터 목록입니다. 목록의 첫째 행에는 각 열의 레이블이 있습니다."
			},
			field: {
				name: "field",
				detail: "필수. 함수에 사용되는 열을 지정합니다. field 인수는 \"나이\" 또는 \"수확량\"처럼 열 레이블을 큰따옴표로 묶어 텍스트로 지정하거나 첫째 열을 1, 둘째 열을 2 등 목록 내의 열 위치를 나타내는 숫자로 지정할 수 있습니다."
			},
			criteria: {
				name: "criteria",
				detail: "필수. 지정한 조건이 있는 셀 범위입니다. 적어도 하나의 열 레이블이 있고 열 레이블 아래에 열 조건을 지정할 셀이 하나 이상 포함된 범위를 criteria 인수로 사용할 수 있습니다."
			}
		}
	},
	DSTDEV: {
		description: "목록이나 데이터베이스의 레코드 필드(열)에서 지정한 조건에 맞는 숫자를 사용하여 표본을 기반으로 한 모집단의 표준 편차를 추정합니다.",
		abstract: "목록이나 데이터베이스의 레코드 필드(열)에서 지정한 조건에 맞는 숫자를 사용하여 표본을 기반으로 한 모집단의 표준 편차를 추정합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/dstdev-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "필수. 데이터베이스나 목록으로 지정할 셀 범위입니다. 데이터베이스는 레코드(관련 정보 행)와 필드(데이터 열)로 이루어진 관련 데이터 목록입니다. 목록의 첫째 행에는 각 열의 레이블이 있습니다."
			},
			field: {
				name: "field",
				detail: "필수. 함수에 사용되는 열을 지정합니다. field 인수는 \"나이\" 또는 \"수확량\"처럼 열 레이블을 큰따옴표로 묶어 텍스트로 지정하거나 첫째 열을 1, 둘째 열을 2 등 목록 내의 열 위치를 나타내는 숫자로 지정할 수 있습니다."
			},
			criteria: {
				name: "criteria",
				detail: "필수. 지정한 조건이 있는 셀 범위입니다. 적어도 하나의 열 레이블이 있고 열 레이블 아래에 열 조건을 지정할 셀이 하나 이상 포함된 범위를 criteria 인수로 사용할 수 있습니다."
			}
		}
	},
	DSTDEVP: {
		description: "목록이나 데이터베이스의 레코드 필드(열)에서 지정한 조건에 맞는 숫자를 사용하여 전체 모집단을 기반으로 한 모집단의 표준 편차를 계산합니다.",
		abstract: "목록이나 데이터베이스의 레코드 필드(열)에서 지정한 조건에 맞는 숫자를 사용하여 전체 모집단을 기반으로 한 모집단의 표준 편차를 계산합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/dstdevp-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "필수. 데이터베이스나 목록으로 지정할 셀 범위입니다. 데이터베이스는 레코드(관련 정보 행)와 필드(데이터 열)로 이루어진 관련 데이터 목록입니다. 목록의 첫째 행에는 각 열의 레이블이 있습니다."
			},
			field: {
				name: "field",
				detail: "필수. 함수에 사용되는 열을 지정합니다. field 인수는 \"나이\" 또는 \"수확량\"처럼 열 레이블을 큰따옴표로 묶어 텍스트로 지정하거나 첫째 열을 1, 둘째 열을 2 등 목록 내의 열 위치를 나타내는 숫자로 지정할 수 있습니다."
			},
			criteria: {
				name: "criteria",
				detail: "필수. 지정한 조건이 있는 셀 범위입니다. 적어도 하나의 열 레이블이 있고 열 레이블 아래에 열 조건을 지정할 셀이 하나 이상 포함된 범위를 criteria 인수로 사용할 수 있습니다."
			}
		}
	},
	DSUM: {
		description: "목록 또는 데이터베이스에서 DSUM은 지정된 조건과 일치하는 레코드의 필드(열)에 있는 숫자의 합계를 제공합니다.",
		abstract: "목록 또는 데이터베이스에서 DSUM은 지정된 조건과 일치하는 레코드의 필드(열)에 있는 숫자의 합계를 제공합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/dsum-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "필수. 목록 또는 데이터베이스를 구성하는 셀 범위입니다. 데이터베이스는 관련 정보의 행이 레코드 이고 데이터 열이 필드 인 관련 데이터의 목록입니다. 목록의 첫 번째 행에는 해당 열마다 레이블이 포함됩니다."
			},
			field: {
				name: "field",
				detail: "필수. 함수에 사용되는 열을 지정합니다. 예를 들어 \"Age\" 또는 \"Yield\"와 같이 큰따옴표 사이에 묶인 열 레이블을 지정합니다. 또는 목록 내의 열 위치를 나타내는 숫자(따옴표 제외)를 지정할 수 있습니다( 예: 첫 번째 열의 경우 1 , 두 번째 열의 경우 2 등)."
			},
			criteria: {
				name: "criteria",
				detail: "필수. 지정한 조건이 포함된 셀 범위입니다. 적어도 하나의 열 레이블이 있고 열 레이블 아래에 열 조건을 지정할 셀이 하나 이상 포함된 범위를 criteria 인수로 사용할 수 있습니다."
			}
		}
	},
	DVAR: {
		description: "목록이나 데이터베이스의 레코드 필드(열)에서 지정한 조건에 맞는 숫자를 사용하여 표본을 기반으로 한 모집단의 분산을 추정합니다.",
		abstract: "목록이나 데이터베이스의 레코드 필드(열)에서 지정한 조건에 맞는 숫자를 사용하여 표본을 기반으로 한 모집단의 분산을 추정합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/dvar-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "필수. 데이터베이스나 목록으로 지정할 셀 범위입니다. 데이터베이스는 레코드(관련 정보 행)와 필드(데이터 열)로 이루어진 관련 데이터 목록입니다. 목록의 첫째 행에는 각 열의 레이블이 있습니다."
			},
			field: {
				name: "field",
				detail: "필수. 함수에 사용되는 열을 지정합니다. field 인수는 \"나이\" 또는 \"수확량\"처럼 열 레이블을 큰따옴표로 묶어 텍스트로 지정하거나 첫째 열을 1, 둘째 열을 2 등 목록 내의 열 위치를 나타내는 숫자로 지정할 수 있습니다."
			},
			criteria: {
				name: "criteria",
				detail: "필수. 지정한 조건이 있는 셀 범위입니다. 적어도 하나의 열 레이블이 있고 열 레이블 아래에 열 조건을 지정할 셀이 하나 이상 포함된 범위를 criteria 인수로 사용할 수 있습니다."
			}
		}
	},
	DVARP: {
		description: "목록이나 데이터베이스의 레코드 필드(열)에서 지정한 조건에 맞는 숫자를 사용하여 전체 모집단을 기반으로 한 모집단의 분산을 계산합니다.",
		abstract: "목록이나 데이터베이스의 레코드 필드(열)에서 지정한 조건에 맞는 숫자를 사용하여 전체 모집단을 기반으로 한 모집단의 분산을 계산합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/dvarp-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "필수. 데이터베이스나 목록으로 지정할 셀 범위입니다. 데이터베이스는 레코드(관련 정보 행)와 필드(데이터 열)로 이루어진 관련 데이터 목록입니다. 목록의 첫째 행에는 각 열의 레이블이 있습니다."
			},
			field: {
				name: "field",
				detail: "필수. 함수에 사용되는 열을 지정합니다. field 인수는 \"나이\" 또는 \"수확량\"처럼 열 레이블을 큰따옴표로 묶어 텍스트로 지정하거나 첫째 열을 1, 둘째 열을 2 등 목록 내의 열 위치를 나타내는 숫자로 지정할 수 있습니다."
			},
			criteria: {
				name: "criteria",
				detail: "필수. 지정한 조건이 있는 셀 범위입니다. 적어도 하나의 열 레이블이 있고 열 레이블 아래에 열 조건을 지정할 셀이 하나 이상 포함된 범위를 criteria 인수로 사용할 수 있습니다."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/date/ko-KR.ts
const locale$11 = {
	DATE: {
		description: "특정 날짜의 일련 번호를 반환합니다",
		abstract: "특정 날짜의 일련 번호를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/date-function"
		}],
		functionParameter: {
			year: {
				name: "year",
				detail: "year 인수의 값은 1~4자리를 포함할 수 있습니다. Excel은 컴퓨터에서 사용하는 날짜 시스템에 따라 year 인수를 해석합니다. 기본적으로 Univer는 1900 날짜 시스템을 사용하며, 이는 첫 번째 날짜가 1900년 1월 1일임을 의미합니다."
			},
			month: {
				name: "month",
				detail: "1월부터 12월까지 1에서 12 사이의 월을 나타내는 양수 또는 음수 정수입니다."
			},
			day: {
				name: "day",
				detail: "1에서 31 사이의 월의 일을 나타내는 양수 또는 음수 정수입니다."
			}
		}
	},
	DATEDIF: {
		description: "두 날짜 사이의 일수, 월수 또는 연수를 계산합니다. 이 함수는 나이를 계산해야 하는 수식에서 유용합니다.",
		abstract: "두 날짜 사이의 일수, 월수 또는 연수를 계산합니다. 이 함수는 나이를 계산해야 하는 수식에서 유용합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/datedif-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "특정 기간의 첫 번째 날짜 또는 시작 날짜를 나타내는 날짜입니다. 날짜는 따옴표로 묶인 텍스트 문자열(예: \"2001-01-30\"), 일련 번호(예: 1900 날짜 체계를 사용할 경우 2001년 1월 30일을 나타내는 값인 36921), 다른 수식 또는 함수의 결과(예: DATEVALUE(\"2001-01-30\"))로 입력할 수 있습니다."
			},
			endDate: {
				name: "end_date",
				detail: "기간의 마지막 날짜나 종료 날짜를 나타내는 날짜입니다."
			},
			unit: {
				name: "Unit",
				detail: "반환하려는 정보의 유형입니다. 여기서: Unit****Returns \" Y \"기간의 완료 연도 수입니다.\" M \"기간의 완료 월 수입니다.\" D \"기간의 일 수입니다.\" MD \"start_date 일과 end_date 간의 차이입니다. 두 날짜의 월이나 연도는 무시됩니다. 중요: 알려진 제한 사항이 있으므로 \"MD\" 인수를 사용하지 않는 것이 좋습니다. 아래의 알려진 문제 섹션을 참조하세요.\" YM \"start_date 월과 end_date 간의 차이입니다. 날짜의 일과 연도는 무시됩니다\" YD \"start_date 일과 end_date 사이의 차이입니다. 두 날짜의 연도는 무시됩니다."
			}
		}
	},
	DATEVALUE: {
		description: "텍스트 형식의 날짜를 일련 번호로 변환합니다.",
		abstract: "텍스트 형식의 날짜를 일련 번호로 변환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/datevalue-function"
		}],
		functionParameter: { dateText: {
			name: "date_text",
			detail: "Excel 날짜 형식의 날짜를 나타내는 텍스트 또는 Excel 날짜 형식의 날짜를 나타내는 텍스트가 포함된 셀에 대한 참조입니다. 예를 들어, \"1/30/2008\" 또는 \"30-Jan-2008\"은 날짜를 나타내는 따옴표 안의 텍스트 문자열입니다.\nWindows용 Microsoft Excel의 기본 날짜 시스템을 사용하는 경우 date_text 인수는 1900년 1월 1일과 9999년 12월 31일 사이의 날짜를 나타내야 합니다. date_text 인수의 값이 이 범위를 벗어나면 DATEVALUE 함수는 #VALUE! 오류 값을 반환합니다.\ndate_text 인수의 연도 부분이 생략되면 DATEVALUE 함수는 컴퓨터의 내장 시계에서 현재 연도를 사용합니다. date_text 인수의 시간 정보는 무시됩니다."
		} }
	},
	DAY: {
		description: "일련 번호로 나타낸 날짜의 일을 반환합니다. 일은 1에서 31 사이의 정수로 제공됩니다.",
		abstract: "일련 번호를 월의 일로 변환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/day-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "찾으려는 일의 날짜입니다. 날짜는 DATE 함수를 사용하여 입력하거나 다른 수식 또는 함수의 결과로 입력해야 합니다. 예를 들어, 2008년 5월 23일에는 DATE(2008,5,23)을 사용합니다."
		} }
	},
	DAYS: {
		description: "두 날짜 사이의 일 수를 반환합니다",
		abstract: "두 날짜 사이의 일 수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/days-function"
		}],
		functionParameter: {
			endDate: {
				name: "end_date",
				detail: "Start_date와 End_date는 일 수를 알고자 하는 두 날짜입니다."
			},
			startDate: {
				name: "start_date",
				detail: "Start_date와 End_date는 일 수를 알고자 하는 두 날짜입니다."
			}
		}
	},
	DAYS360: {
		description: "360일 기준으로 두 날짜 사이의 일 수를 계산합니다",
		abstract: "360일 기준으로 두 날짜 사이의 일 수를 계산합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/days360-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Start_date와 End_date는 일 수를 알고자 하는 두 날짜입니다."
			},
			endDate: {
				name: "end_date",
				detail: "Start_date와 End_date는 일 수를 알고자 하는 두 날짜입니다."
			},
			method: {
				name: "method",
				detail: "계산에서 미국 또는 유럽 방법을 사용할지 여부를 지정하는 논리값입니다."
			}
		}
	},
	EDATE: {
		description: "시작 날짜 이전 또는 이후의 표시된 개월 수 날짜를 나타내는 일련 번호를 반환합니다. EDATE를 사용하여 발행일과 동일한 월의 일에 해당하는 만기일 또는 만기일을 계산합니다.",
		abstract: "시작 날짜 이전 또는 이후의 표시된 개월 수인 날짜의 일련 번호를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/edate-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "시작 날짜를 나타내는 날짜입니다. 날짜는 DATE 함수를 사용하여 입력하거나 다른 수식 또는 함수의 결과로 입력해야 합니다. 예를 들어, 2008년 5월 23일에는 DATE(2008,5,23)을 사용합니다. 날짜를 텍스트로 입력하면 문제가 발생할 수 있습니다."
			},
			months: {
				name: "months",
				detail: "start_date 이전 또는 이후의 개월 수입니다. months의 양수 값은 미래 날짜를 산출하고 음수 값은 과거 날짜를 산출합니다."
			}
		}
	},
	EOMONTH: {
		description: "지정된 개월 수 이전 또는 이후 달의 마지막 날의 일련 번호를 반환합니다",
		abstract: "지정된 개월 수 이전 또는 이후 달의 마지막 날의 일련 번호를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/eomonth-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "시작 날짜를 나타내는 날짜입니다."
			},
			months: {
				name: "months",
				detail: "start_date 이전 또는 이후의 개월 수입니다."
			}
		}
	},
	EPOCHTODATE: {
		description: "초, 밀리초 또는 마이크로초 단위의 Unix epoch 타임스탬프를 협정 세계시(UTC) 기준의 날짜 및 시간으로 변환합니다.",
		abstract: "초, 밀리초 또는 마이크로초 단위의 Unix epoch 타임스탬프를 협정 세계시(UTC) 기준의 날짜 및 시간으로 변환합니다.",
		links: [{
			title: "사용법",
			url: "https://support.google.com/docs/answer/13193461?hl=ko"
		}],
		functionParameter: {
			timestamp: {
				name: "timestamp",
				detail: "EPOCHTODATE(1655908429662,2)"
			},
			unit: {
				name: "unit",
				detail: "EPOCHTODATE(1655906710)"
			}
		}
	},
	HOUR: {
		description: "일련 번호를 시간으로 변환합니다",
		abstract: "일련 번호를 시간으로 변환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/hour-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "찾으려는 시간의 날짜입니다. 날짜는 DATE 함수를 사용하여 입력하거나 다른 수식 또는 함수의 결과로 입력해야 합니다. 예를 들어, 2008년 5월 23일에는 DATE(2008,5,23)을 사용합니다."
		} }
	},
	ISOWEEKNUM: {
		description: "지정된 날짜의 연도에 해당하는 ISO 주 번호를 반환합니다.",
		abstract: "지정된 날짜의 연도에 해당하는 ISO 주 번호를 반환합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/isoweeknum-function"
		}],
		functionParameter: { date: {
			name: "date",
			detail: "필수. 날짜는 날짜 및 시간 계산을 위해 Excel에서 사용하는 날짜-시간 코드입니다."
		} }
	},
	MINUTE: {
		description: "시간 값의 분을 반환합니다. 분은 0에서 59 사이의 정수로 표시됩니다.",
		abstract: "시간 값의 분을 반환합니다. 분은 0에서 59 사이의 정수로 표시됩니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/minute-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "필수. 분을 계산할 시간 값입니다. 따옴표로 묶은 텍스트 문자열(예: \"6:45 PM\"), 10진수(6:45 PM을 나타내는 0.78125) 또는 다른 수식이나 함수의 결과(예: TIMEVALUE(\"6:45 PM\"))를 입력할 수 있습니다."
		} }
	},
	MONTH: {
		description: "일련 번호가 나타내는 날짜의 월을 반환합니다. 월은 1(1월)에서 12(12월) 사이의 정수로 표시됩니다.",
		abstract: "일련 번호가 나타내는 날짜의 월을 반환합니다. 월은 1(1월)에서 12(12월) 사이의 정수로 표시됩니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/month-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "필수. 월을 구할 날짜입니다. 날짜는 DATE 함수를 사용하거나 다른 수식 또는 함수의 결과로 입력해야 합니다. 예를 들어 2008년 5월 23일에 대해서는 DATE(2008,5,23)을 사용합니다. 날짜를 텍스트로 입력 하면 문제가 발생할 수 있습니다."
		} }
	},
	NETWORKDAYS: {
		description: "두 날짜 사이의 전체 작업일 수를 반환합니다",
		abstract: "두 날짜 사이의 전체 작업일 수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/networkdays-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "시작 날짜를 나타내는 날짜입니다."
			},
			endDate: {
				name: "end_date",
				detail: "종료 날짜를 나타내는 날짜입니다."
			},
			holidays: {
				name: "holidays",
				detail: "주 및 연방 공휴일과 유동 휴일 같이 작업 일정에서 제외할 하나 이상의 날짜의 선택적 범위입니다."
			}
		}
	},
	NETWORKDAYS_INTL: {
		description: "매개 변수를 사용하여 주말인 요일과 일수를 나타내는 두 날짜 사이의 전체 작업일 수를 반환합니다",
		abstract: "매개 변수를 사용하여 주말인 요일과 일수를 나타내는 두 날짜 사이의 전체 작업일 수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/networkdays-intl-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "시작 날짜를 나타내는 날짜입니다."
			},
			endDate: {
				name: "end_date",
				detail: "종료 날짜를 나타내는 날짜입니다."
			},
			weekend: {
				name: "weekend",
				detail: "주말이 언제 발생하는지 지정하는 주말 번호 또는 문자열입니다."
			},
			holidays: {
				name: "holidays",
				detail: "주 및 연방 공휴일과 유동 휴일 같이 작업 일정에서 제외할 하나 이상의 날짜의 선택적 범위입니다."
			}
		}
	},
	NOW: {
		description: "현재 날짜와 시간의 일련 번호를 반환합니다. 함수를 입력하기 전 셀 형식이 일반 인 경우 셀 형식이 국가별 설정의 날짜 및 시간 형식과 일치하도록 변경됩니다. 리본 메뉴의 홈 탭에 있는 표시 형식 그룹의 명령을 사용하여 셀의 날짜 및 시간 형식을 변경할 수 있습니다.",
		abstract: "현재 날짜와 시간의 일련 번호를 반환합니다. 함수를 입력하기 전 셀 형식이 일반 인 경우 셀 형식이 국가별 설정의 날짜 및 시간 형식과 일치하도록 변경됩니다. 리본 메뉴의 홈 탭에 있는 표시 형식 그룹의 명령을 사용하여 셀의 날짜 및 시간 형식을 변경할 수 있습니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/now-function"
		}],
		functionParameter: {}
	},
	SECOND: {
		description: "시간 값의 초를 반환합니다. 초는 0에서 59 사이의 정수로 제공됩니다.",
		abstract: "시간 값의 초를 반환합니다. 초는 0에서 59 사이의 정수로 제공됩니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/second-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "필수. 초를 계산할 시간 값입니다. 따옴표로 묶은 텍스트 문자열(예: \"6:45 PM\"), 10진수(6:45 PM을 나타내는 0.78125) 또는 다른 수식이나 함수의 결과(예: TIMEVALUE(\"6:45 PM\"))를 입력할 수 있습니다."
		} }
	},
	TIME: {
		description: "특정 시간의 일련 번호를 반환합니다.",
		abstract: "특정 시간의 일련 번호를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/time-function"
		}],
		functionParameter: {
			hour: {
				name: "hour",
				detail: "시간을 나타내는 0(영)에서 32767 사이의 숫자입니다. 23보다 큰 값은 24로 나뉘며 나머지는 시간 값으로 처리됩니다. 예를 들어, TIME(27,0,0) = TIME(3,0,0) = .125 또는 오전 3:00입니다."
			},
			minute: {
				name: "minute",
				detail: "분을 나타내는 0에서 32767 사이의 숫자입니다. 59보다 큰 값은 시간과 분으로 변환됩니다. 예를 들어, TIME(0,750,0) = TIME(12,30,0) = .520833 또는 오후 12:30입니다."
			},
			second: {
				name: "second",
				detail: "초를 나타내는 0에서 32767 사이의 숫자입니다. 59보다 큰 값은 시간, 분 및 초로 변환됩니다. 예를 들어, TIME(0,0,2000) = TIME(0,33,20) = .023148 또는 오전 12:33:20입니다."
			}
		}
	},
	TIMEVALUE: {
		description: "텍스트 형식의 시간을 일련 번호로 변환합니다.",
		abstract: "텍스트 형식의 시간을 일련 번호로 변환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/timevalue-function"
		}],
		functionParameter: { timeText: {
			name: "time_text",
			detail: "Microsoft Excel 시간 형식 중 하나로 시간을 나타내는 텍스트 문자열입니다. 예를 들어 \"6:45 PM\" 및 \"18:45\" 텍스트 문자열은 시간을 나타내는 따옴표 안에 있습니다."
		} }
	},
	TO_DATE: {
		description: "입력된 숫자를 날짜로 변환합니다.",
		abstract: "입력된 숫자를 날짜로 변환합니다.",
		links: [{
			title: "사용법",
			url: "https://support.google.com/docs/answer/3094239?hl=ko"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "TO_DATE(A2)"
		} }
	},
	TODAY: {
		description: "오늘 날짜의 일련 번호를 반환합니다",
		abstract: "오늘 날짜의 일련 번호를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/today-function"
		}],
		functionParameter: {}
	},
	WEEKDAY: {
		description: "일련 번호를 요일로 변환합니다",
		abstract: "일련 번호를 요일로 변환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/weekday-function"
		}],
		functionParameter: {
			serialNumber: {
				name: "serial_number",
				detail: "찾으려는 요일의 날짜를 나타내는 순차 번호입니다."
			},
			returnType: {
				name: "return_type",
				detail: "반환 값의 유형을 결정하는 숫자입니다."
			}
		}
	},
	WEEKNUM: {
		description: "일련 번호를 해당 연도에서 주가 차지하는 위치를 나타내는 숫자로 변환합니다",
		abstract: "일련 번호를 해당 연도에서 주가 차지하는 위치를 나타내는 숫자로 변환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/weeknum-function"
		}],
		functionParameter: {
			serialNumber: {
				name: "serial_number",
				detail: "주 내의 날짜입니다."
			},
			returnType: {
				name: "return_type",
				detail: "주가 시작되는 요일을 결정하는 숫자입니다. 기본값은 1입니다."
			}
		}
	},
	WORKDAY: {
		description: "지정된 작업일 수 이전 또는 이후 날짜의 일련 번호를 반환합니다",
		abstract: "지정된 작업일 수 이전 또는 이후 날짜의 일련 번호를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/workday-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "시작 날짜를 나타내는 날짜입니다."
			},
			days: {
				name: "days",
				detail: "start_date 이전 또는 이후의 주말 및 휴일이 아닌 일 수입니다. days의 양수 값은 미래 날짜를 산출하고 음수 값은 과거 날짜를 산출합니다."
			},
			holidays: {
				name: "holidays",
				detail: "주 및 연방 공휴일과 유동 휴일 같이 작업 일정에서 제외할 하나 이상의 날짜의 선택적 범위입니다."
			}
		}
	},
	WORKDAY_INTL: {
		description: "매개 변수를 사용하여 주말인 요일과 일수를 나타내는 지정된 작업일 수 이전 또는 이후 날짜의 일련 번호를 반환합니다",
		abstract: "매개 변수를 사용하여 주말인 요일과 일수를 나타내는 지정된 작업일 수 이전 또는 이후 날짜의 일련 번호를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/workday-intl-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "시작 날짜를 나타내는 날짜입니다."
			},
			days: {
				name: "days",
				detail: "start_date 이전 또는 이후의 주말 및 휴일이 아닌 일 수입니다. days의 양수 값은 미래 날짜를 산출하고 음수 값은 과거 날짜를 산출합니다."
			},
			weekend: {
				name: "weekend",
				detail: "주말이 언제 발생하는지 지정하는 주말 번호 또는 문자열입니다."
			},
			holidays: {
				name: "holidays",
				detail: "주 및 연방 공휴일과 유동 휴일 같이 작업 일정에서 제외할 하나 이상의 날짜의 선택적 범위입니다."
			}
		}
	},
	YEAR: {
		description: "날짜에 해당하는 연도를 반환합니다. 연도는 1900-9999 범위의 정수로 반환됩니다.",
		abstract: "일련 번호를 연도로 변환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/year-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "찾으려는 연도의 날짜입니다. 날짜는 DATE 함수를 사용하여 입력하거나 다른 수식 또는 함수의 결과로 입력해야 합니다. 예를 들어, 2008년 5월 23일에는 DATE(2008,5,23)을 사용합니다. 날짜를 텍스트로 입력하면 문제가 발생할 수 있습니다."
		} }
	},
	YEARFRAC: {
		description: "start_date와 end_date 사이의 전체 날짜 수를 나타내는 연도 비율을 반환합니다",
		abstract: "start_date와 end_date 사이의 전체 날짜 수를 나타내는 연도 비율을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/yearfrac-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "시작 날짜를 나타내는 날짜입니다."
			},
			endDate: {
				name: "end_date",
				detail: "종료 날짜를 나타내는 날짜입니다."
			},
			basis: {
				name: "basis",
				detail: "사용할 일수 계산 기준 유형입니다."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/engineering/ko-KR.ts
const locale$10 = {
	BESSELI: {
		description: "순허수 인수를 사용하여 계산된 Bessel 함수인 수정된 Bessel 함수를 반환합니다.",
		abstract: "순허수 인수를 사용하여 계산된 Bessel 함수인 수정된 Bessel 함수를 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/besseli-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "필수 요소입니다. 함수를 계산할 값입니다."
			},
			n: {
				name: "N",
				detail: "필수 요소입니다. Bessel 함수의 차수입니다. n이 정수가 아니면 소수점 이하는 무시됩니다."
			}
		}
	},
	BESSELJ: {
		description: "Bessel 함수를 반환합니다.",
		abstract: "Bessel 함수를 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/besselj-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "필수 요소입니다. 함수를 계산할 값입니다."
			},
			n: {
				name: "N",
				detail: "필수 요소입니다. Bessel 함수의 차수입니다. n이 정수가 아니면 소수점 이하는 무시됩니다."
			}
		}
	},
	BESSELK: {
		description: "순허수 인수를 사용하여 계산된 Bessel 함수인 수정된 Bessel 함수를 반환합니다.",
		abstract: "순허수 인수를 사용하여 계산된 Bessel 함수인 수정된 Bessel 함수를 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/besselk-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "필수 요소입니다. 함수를 계산할 값입니다."
			},
			n: {
				name: "N",
				detail: "필수 요소입니다. 함수의 차수입니다. n이 정수가 아니면 소수점 이하는 무시됩니다."
			}
		}
	},
	BESSELY: {
		description: "Weber 함수 또는 Neumann 함수라고도 하는 Bessel 함수를 반환합니다.",
		abstract: "Weber 함수 또는 Neumann 함수라고도 하는 Bessel 함수를 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/bessely-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "필수 요소입니다. 함수를 계산할 값입니다."
			},
			n: {
				name: "N",
				detail: "필수 요소입니다. 함수의 차수입니다. n이 정수가 아니면 소수점 이하는 무시됩니다."
			}
		}
	},
	BIN2DEC: {
		description: "2진수를 10진수로 변환합니다.",
		abstract: "2진수를 10진수로 변환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/bin2dec-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "필수 요소입니다. 변환하려는 2진수입니다. 숫자는 10자(10비트)를 초과할 수 없습니다. Number의 최상위 비트는 부호 비트입니다. 나머지 9 비트는 크기 비트입니다. 음수는 2의 보수 표기법으로 표시됩니다."
		} }
	},
	BIN2HEX: {
		description: "2진수를 16진수로 변환합니다.",
		abstract: "2진수를 16진수로 변환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/bin2hex-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "필수 요소입니다. 변환하려는 2진수입니다. 숫자는 10자(10비트)를 초과할 수 없습니다. Number의 최상위 비트는 부호 비트입니다. 나머지 9 비트는 크기 비트입니다. 음수는 2의 보수 표기법으로 표시됩니다."
			},
			places: {
				name: "places",
				detail: "선택적. 사용할 자릿수입니다. places를 생략하면 필요한 최소 자릿수가 사용됩니다. places를 지정하면 반환 값의 앞부분을 0으로 채울 수 있습니다."
			}
		}
	},
	BIN2OCT: {
		description: "2진수를 8진수로 변환합니다.",
		abstract: "2진수를 8진수로 변환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/bin2oct-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "필수 요소입니다. 변환하려는 2진수입니다. 숫자는 10자(10비트)를 초과할 수 없습니다. Number의 최상위 비트는 부호 비트입니다. 나머지 9 비트는 크기 비트입니다. 음수는 2의 보수 표기법으로 표시됩니다."
			},
			places: {
				name: "places",
				detail: "선택 사항입니다. 사용할 자릿수입니다. places를 생략하면 BIN2OCT에서는 필요한 최소 자릿수가 사용됩니다. places를 지정하면 반환 값의 앞부분을 0으로 채울 수 있습니다."
			}
		}
	},
	BITAND: {
		description: "두 숫자의 비트 단위 'AND'를 반환합니다.",
		abstract: "두 숫자의 비트 단위 'AND'를 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/bitand-function"
		}],
		functionParameter: {
			number1: {
				name: "번호1",
				detail: "0보다 크거나 같은 10진수 형식이어야 합니다."
			},
			number2: {
				name: "번호2",
				detail: "0보다 크거나 같은 10진수 형식이어야 합니다."
			}
		}
	},
	BITLSHIFT: {
		description: "지정된 비트만큼 왼쪽으로 이동한 숫자를 반환합니다.",
		abstract: "지정된 비트만큼 왼쪽으로 이동한 숫자를 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/bitlshift-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "필수 요소입니다. number는 0보다 크거나 같은 정수여야 합니다."
			},
			shiftAmount: {
				name: "shift_amount",
				detail: "필수. Shift_amount 정수여야 합니다."
			}
		}
	},
	BITOR: {
		description: "두 숫자의 비트 단위 'OR'를 반환합니다.",
		abstract: "두 숫자의 비트 단위 'OR'를 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/bitor-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "필수. 10진수 형식이어야 하며 0보다 크거나 같아야 합니다."
			},
			number2: {
				name: "number2",
				detail: "필수. 10진수 형식이어야 하며 0보다 크거나 같아야 합니다."
			}
		}
	},
	BITRSHIFT: {
		description: "지정된 비트만큼 오른쪽으로 이동한 숫자를 반환합니다.",
		abstract: "지정된 비트만큼 오른쪽으로 이동한 숫자를 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/bitrshift-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "필수 요소입니다. 0보다 크거나 같은 정수여야 합니다."
			},
			shiftAmount: {
				name: "shift_amount",
				detail: "필수. 정수여야 합니다."
			}
		}
	},
	BITXOR: {
		description: "두 숫자의 비트 단위 'XOR'를 반환합니다.",
		abstract: "두 숫자의 비트 단위 'XOR'를 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/bitxor-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "필수. 0보다 크거나 같아야 합니다."
			},
			number2: {
				name: "number2",
				detail: "필수. 0보다 크거나 같아야 합니다."
			}
		}
	},
	COMPLEX: {
		description: "실수와 허수 계수를 x + yi 또는 x + yj 형태의 복소수로 변환합니다.",
		abstract: "실수와 허수 계수를 x + yi 또는 x + yj 형태의 복소수로 변환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/complex-function"
		}],
		functionParameter: {
			realNum: {
				name: "real_num",
				detail: "필수. 복소수의 실수 계수입니다."
			},
			iNum: {
				name: "i_num",
				detail: "필수. 복소수의 허수 계수입니다."
			},
			suffix: {
				name: "suffix",
				detail: "선택적. 복소수의 허수부에 표시할 접미사입니다. 생략하면 \"i\"가 사용됩니다."
			}
		}
	},
	CONVERT: {
		description: "다른 단위 체계의 숫자로 변환합니다. 예를 들면 CONVERT 함수를 사용하여 마일 단위의 거리를 킬로미터 단위로 변환할 수 있습니다.",
		abstract: "다른 단위 체계의 숫자로 변환합니다. 예를 들면 CONVERT 함수를 사용하여 마일 단위의 거리를 킬로미터 단위로 변환할 수 있습니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/convert-function"
		}],
		functionParameter: {
			number: {
				name: "숫자",
				detail: "변환할 from_unit 단위의 값입니다."
			},
			fromUnit: {
				name: "from_unit",
				detail: "숫자의 단위입니다."
			},
			toUnit: {
				name: "to_unit",
				detail: "결과의 단위입니다."
			}
		}
	},
	DEC2BIN: {
		description: "10진수를 2진수로 변환합니다.",
		abstract: "10진수를 2진수로 변환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/dec2bin-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "필수 요소입니다. 변환할 10진수 정수입니다. number가 음수이면 유효한 위치 값이 무시되고 DEC2BIN 가장 중요한 비트가 부호 비트인 10자(10비트) 이진 번호를 반환합니다. 나머지 9 비트는 크기 비트입니다. 음수는 2의 보수 표기법으로 표시됩니다."
			},
			places: {
				name: "places",
				detail: "선택적. 사용할 자릿수입니다. places를 생략하면 DEC2BIN에서는 필요한 최소 자릿수가 사용됩니다. places를 지정하면 반환 값의 앞부분을 0으로 채울 수 있습니다."
			}
		}
	},
	DEC2HEX: {
		description: "10진수를 16진수로 변환합니다.",
		abstract: "10진수를 16진수로 변환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/dec2hex-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "필수 요소입니다. 변환할 10진수 정수입니다. number가 음수이면 자리가 무시되고 DEC2HEX 가장 중요한 비트가 부호 비트인 10자(40비트) 16진수를 반환합니다. 나머지 39비트 크기 비트입니다. 음수는 2의 보수 표기법으로 표시됩니다."
			},
			places: {
				name: "places",
				detail: "선택적. 사용할 자릿수입니다. places를 생략하면 DEC2HEX에서는 필요한 최소 자릿수가 사용됩니다. places를 지정하면 반환 값의 앞부분을 0으로 채울 수 있습니다."
			}
		}
	},
	DEC2OCT: {
		description: "10진수를 8진수로 변환합니다.",
		abstract: "10진수를 8진수로 변환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/dec2oct-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "필수 요소입니다. 변환할 10진수 정수입니다. number가 음수이면 위치가 무시되고 DEC2OCT 가장 중요한 비트가 부호 비트인 10자(30비트) 8진수를 반환합니다. 나머지 29비트 는 진도 비트입니다. 음수는 2의 보수 표기법으로 표시됩니다."
			},
			places: {
				name: "places",
				detail: "선택 사항입니다. 사용할 자릿수입니다. places를 생략하면 DEC2OCT에서는 필요한 최소 자릿수가 사용됩니다. places를 지정하면 반환 값의 앞부분을 0으로 채울 수 있습니다."
			}
		}
	},
	DELTA: {
		description: "두 값이 같은지 여부를 검사합니다. number1 = number2이면 1을 반환하고, 그렇지 않으면 0을 반환합니다. 이 함수를 사용하면 값 집합을 필터링할 수 있습니다. 예를 들어 DELTA 함수 몇 개의 합을 구하여 값이 같은 쌍의 개수를 계산할 수 있습니다. 이 함수는 Kronecker Delta 함수라고도 합니다.",
		abstract: "두 값이 같은지 여부를 검사합니다. number1 = number2이면 1을 반환하고, 그렇지 않으면 0을 반환합니다. 이 함수를 사용하면 값 집합을 필터링할 수 있습니다. 예를 들어 DELTA 함수 몇 개의 합을 구하여 값이 같은 쌍의 개수를 계산할 수 있습니다. 이 함수는 Kronecker Delta 함수라고도 합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/delta-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "필수. 첫 번째 숫자입니다."
			},
			number2: {
				name: "number2",
				detail: "선택적. 두 번째 숫자입니다. 생략하면 0으로 간주됩니다."
			}
		}
	},
	ERF: {
		description: "lower_limit에서 upper_limit까지 적분된 오차 함수를 반환합니다.",
		abstract: "lower_limit에서 upper_limit까지 적분된 오차 함수를 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/erf-function"
		}],
		functionParameter: {
			lowerLimit: {
				name: "lower_limit",
				detail: "필수. ERF 적분의 하한값입니다."
			},
			upperLimit: {
				name: "upper_limit",
				detail: "선택적. ERF 적분의 상한값입니다. 생략하면 0에서 lower_limit까지 적분됩니다."
			}
		}
	},
	ERF_PRECISE: {
		description: "오차 함수를 반환합니다.",
		abstract: "오차 함수를 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/erf-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "필수 요소입니다. ERF.PRECISE 적분의 하한값입니다."
		} }
	},
	ERFC: {
		description: "x에서 무한대까지 적분된 ERF 함수의 여값을 반환합니다.",
		abstract: "x에서 무한대까지 적분된 ERF 함수의 여값을 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/erfc-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "필수 요소입니다. ERFC 적분의 하한값입니다."
		} }
	},
	ERFC_PRECISE: {
		description: "x에서 무한대까지 적분된 ERF 함수의 여값을 반환합니다.",
		abstract: "x에서 무한대까지 적분된 ERF 함수의 여값을 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/erfc-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "필수 요소입니다. ERFC.PRECISE 적분의 하한값입니다."
		} }
	},
	GESTEP: {
		description: "number ≥ step이면 1을 반환하고 그렇지 않으면 0을 반환합니다. 이 함수를 사용하면 값 집합을 필터링할 수 있습니다. 예를 들어 GESTEP 함수 몇 개를 더하여 임계값을 초과하는 값의 개수를 계산합니다.",
		abstract: "number ≥ step이면 1을 반환하고 그렇지 않으면 0을 반환합니다. 이 함수를 사용하면 값 집합을 필터링할 수 있습니다. 예를 들어 GESTEP 함수 몇 개를 더하여 임계값을 초과하는 값의 개수를 계산합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/gestep-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "필수 요소입니다. step과 비교할 값입니다."
			},
			step: {
				name: "step",
				detail: "선택적. 임계값입니다. 생략하면 GESTEP에서는 0이 사용됩니다."
			}
		}
	},
	HEX2BIN: {
		description: "16진수를 2진수로 변환합니다.",
		abstract: "16진수를 2진수로 변환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/hex2bin-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "필수 요소입니다. 변환할 16진수입니다. 숫자는 10자를 초과할 수 없습니다. 숫자의 가장 중요한 비트는 부호 비트(오른쪽에서 40비트)입니다. 나머지 9 비트는 크기 비트입니다. 음수는 2의 보수 표기법으로 표시됩니다."
			},
			places: {
				name: "places",
				detail: "선택 사항입니다. 사용할 자릿수입니다. places를 생략하면 HEX2BIN에서는 필요한 최소 자릿수가 사용됩니다. places를 지정하면 반환 값의 앞부분을 0으로 채울 수 있습니다."
			}
		}
	},
	HEX2DEC: {
		description: "16진수를 10진수로 변환합니다.",
		abstract: "16진수를 10진수로 변환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/hex2dec-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "필수 요소입니다. 변환할 16진수입니다. 숫자는 10자(40비트)를 초과할 수 없습니다. Number의 최상위 비트는 부호 비트입니다. 나머지 39비트 크기 비트입니다. 음수는 2의 보수 표기법으로 표시됩니다."
		} }
	},
	HEX2OCT: {
		description: "16진수를 8진수로 변환합니다.",
		abstract: "16진수를 8진수로 변환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/hex2oct-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "필수 요소입니다. 변환할 16진수입니다. 숫자는 10자를 초과할 수 없습니다. Number의 최상위 비트는 부호 비트입니다. 나머지 39비트 크기 비트입니다. 음수는 2의 보수 표기법으로 표시됩니다."
			},
			places: {
				name: "places",
				detail: "선택 사항입니다. 사용할 자릿수입니다. places를 생략하면 HEX2OCT에서는 필요한 최소 자릿수가 사용됩니다. places를 지정하면 반환 값의 앞부분을 0으로 채울 수 있습니다."
			}
		}
	},
	IMABS: {
		description: "x + yi 또는 x + yj 텍스트 형식인 복소수의 절대값을 반환합니다.",
		abstract: "x + yi 또는 x + yj 텍스트 형식인 복소수의 절대값을 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/imabs-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "필수. 절대값을 계산할 복소수입니다."
		} }
	},
	IMAGINARY: {
		description: "x + yi 또는 x + yj 텍스트 형식인 복소수의 허수부 계수를 반환합니다.",
		abstract: "x + yi 또는 x + yj 텍스트 형식인 복소수의 허수부 계수를 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/imaginary-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "필수. 허수부 계수를 구할 복소수입니다."
		} }
	},
	IMARGUMENT: {
		description: "다음과 같이 라디안으로 표현된 각도인 (theta) 인수를 반환합니다.",
		abstract: "다음과 같이 라디안으로 표현된 각도인 (theta) 인수를 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/imargument-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "필수. Theta 인수를 사용할 복소수입니다 ."
		} }
	},
	IMCONJUGATE: {
		description: "x + yi 또는 x + yj 텍스트 형식인 복소수의 켤레 복소수를 반환합니다.",
		abstract: "x + yi 또는 x + yj 텍스트 형식인 복소수의 켤레 복소수를 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/imconjugate-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "필수. 켤레 복소수를 구할 복소수입니다."
		} }
	},
	IMCOS: {
		description: "x + yi 또는 x + yj 텍스트 형식인 복소수의 코사인 값을 반환합니다.",
		abstract: "x + yi 또는 x + yj 텍스트 형식인 복소수의 코사인 값을 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/imcos-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "필수. 코사인 값을 계산할 복소수입니다."
		} }
	},
	IMCOSH: {
		description: "x + yi 또는 x + yj 텍스트 형식인 복소수의 하이퍼볼릭 코사인 값을 반환합니다.",
		abstract: "x + yi 또는 x + yj 텍스트 형식인 복소수의 하이퍼볼릭 코사인 값을 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/imcosh-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "필수. 하이퍼볼릭 코사인을 원하는 복소수입니다."
		} }
	},
	IMCOT: {
		description: "x + yi 또는 x + yj 텍스트 형식인 복소수의 코탄젠트 값을 반환합니다.",
		abstract: "x + yi 또는 x + yj 텍스트 형식인 복소수의 코탄젠트 값을 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/imcot-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "코탄젠트를 구할 복소수입니다."
		} }
	},
	IMCOTH: {
		description: "IMCOTH 함수는 주어진 복소수의 쌍곡선 코탄젠트값을 반환합니다. 예를 들어 복소수 'x+yi'가 주어지면 'coth(x+yi)'가 반환됩니다.",
		abstract: "IMCOTH 함수는 주어진 복소수의 쌍곡선 코탄젠트값을 반환합니다. 예를 들어 복소수 'x+yi'가 주어지면 'coth(x+yi)'가 반환됩니다.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9366256?hl=ko"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "쌍곡선 코탄젠트를 구하려는 복소수입니다. 이는 COMPLEX 함수의 결과, 허수부가 0인 복소수로 해석되는 실수 또는 x와 y가 숫자인 'x + yi' 형식의 문자열일 수 있습니다."
		} }
	},
	IMCSC: {
		description: "x + yi 또는 x + yj 텍스트 형식인 복소수의 코시컨트 값을 반환합니다.",
		abstract: "x + yi 또는 x + yj 텍스트 형식인 복소수의 코시컨트 값을 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/imcsc-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "필수. 코시컨트를 사용할 복소수입니다."
		} }
	},
	IMCSCH: {
		description: "x+yi 또는 x+yj 텍스트 형식으로 복소수의 하이퍼볼릭 코시컨트를 반환합니다.",
		abstract: "x+yi 또는 x+yj 텍스트 형식으로 복소수의 하이퍼볼릭 코시컨트를 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/imcsch-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "필수. 하이퍼볼릭 코시컨트를 원하는 복소수입니다."
		} }
	},
	IMDIV: {
		description: "x + yi 또는 x + yj 텍스트 형식인 두 복소수의 나눗셈 몫을 반환합니다.",
		abstract: "두 복소수의 나눗셈 몫을 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/imdiv-function"
		}],
		functionParameter: {
			inumber1: {
				name: "inumber1",
				detail: "분자 또는 피제수인 복소수입니다."
			},
			inumber2: {
				name: "inumber2",
				detail: "분모 또는 제수인 복소수입니다."
			}
		}
	},
	IMEXP: {
		description: "x + yi 또는 x + yj 텍스트 형식인 복소수의 지수를 계산합니다.",
		abstract: "x + yi 또는 x + yj 텍스트 형식인 복소수의 지수를 계산합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/imexp-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "필수. 지수를 계산할 복소수입니다."
		} }
	},
	IMLN: {
		description: "x + yi 또는 x + yj 텍스트 형식인 복소수의 자연 로그값을 반환합니다.",
		abstract: "x + yi 또는 x + yj 텍스트 형식인 복소수의 자연 로그값을 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/imln-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "필수. 자연 로그값을 계산할 복소수입니다."
		} }
	},
	IMLOG: {
		description: "IMLOG 함수는 지정된 값을 밑으로 하는 복소수의 로그 값을 반환합니다.",
		abstract: "IMLOG 함수는 지정된 값을 밑으로 하는 복소수의 로그 값을 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9366486?hl=ko"
		}],
		functionParameter: {
			inumber: {
				name: "inumber",
				detail: "로그 함수의 입력값입니다. 1과 같은 일반적인 숫자를 쓸 수 있습니다(실수로 해석됨). 실계수와 복합계수를 모두 지정하기 위해 숫자를 인용된 텍스트로 쓸 수 있습니다."
			},
			base: {
				name: "base",
				detail: "대수를 계산하는 데 사용하는 밑입니다. 양의 실수여야 합니다."
			}
		}
	},
	IMLOG10: {
		description: "x + yi 또는 x + yj 텍스트 형식인 복소수의 상용 로그값(밑이 10)을 반환합니다.",
		abstract: "x + yi 또는 x + yj 텍스트 형식인 복소수의 상용 로그값(밑이 10)을 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/imlog10-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "필수. 상용 로그값을 계산할 복소수입니다."
		} }
	},
	IMLOG2: {
		description: "x + yi 또는 x + yj 텍스트 형식인 복소수의 밑이 2인 로그값을 반환합니다.",
		abstract: "x + yi 또는 x + yj 텍스트 형식인 복소수의 밑이 2인 로그값을 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/imlog2-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "필수. 밑이 2인 로그값을 계산할 복소수입니다."
		} }
	},
	IMPOWER: {
		description: "x + yi 또는 x + yj 텍스트 형식인 복소수의 멱을 반환합니다.",
		abstract: "x + yi 또는 x + yj 텍스트 형식인 복소수의 멱을 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/impower-function"
		}],
		functionParameter: {
			inumber: {
				name: "inumber",
				detail: "필수. 멱을 계산할 복소수입니다."
			},
			number: {
				name: "number",
				detail: "필수 요소입니다. 멱의 지수입니다."
			}
		}
	},
	IMPRODUCT: {
		description: "x + yi 또는 x + yj 텍스트 형식인 복소수를 1개에서 255개까지 곱한 결과를 반환합니다.",
		abstract: "x + yi 또는 x + yj 텍스트 형식인 복소수를 1개에서 255개까지 곱한 결과를 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/improduct-function"
		}],
		functionParameter: {
			inumber1: {
				name: "inumber1",
				detail: "inumber1은 필수 요소이고, 이후의 inumber는 선택 요소입니다. 곱할 복소수로, 1개에서 255개까지 지정할 수 있습니다."
			},
			inumber2: {
				name: "inumber2",
				detail: "inumber1은 필수 요소이고, 이후의 inumber는 선택 요소입니다. 곱할 복소수로, 1개에서 255개까지 지정할 수 있습니다."
			}
		}
	},
	IMREAL: {
		description: "x + yi 또는 x + yj 텍스트 형식인 복소수의 실수부 계수를 반환합니다.",
		abstract: "x + yi 또는 x + yj 텍스트 형식인 복소수의 실수부 계수를 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/imreal-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "필수. 실수부 계수를 계산할 복소수입니다."
		} }
	},
	IMSEC: {
		description: "x+yi 또는 x+yj 텍스트 형식인 복소수의 시컨트 값을 반환합니다.",
		abstract: "x+yi 또는 x+yj 텍스트 형식인 복소수의 시컨트 값을 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/imsec-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "필수. 시컨트를 구할 복소수입니다."
		} }
	},
	IMSECH: {
		description: "x+yi 또는 x+yj 텍스트 형식인 복소수의 하이퍼볼릭 시컨트 값을 반환합니다.",
		abstract: "x+yi 또는 x+yj 텍스트 형식인 복소수의 하이퍼볼릭 시컨트 값을 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/imsech-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "필수. 하이퍼볼릭 시컨트를 구할 복소수입니다."
		} }
	},
	IMSIN: {
		description: "x + yi 또는 x + yj 텍스트 형식인 복소수의 사인 값을 반환합니다.",
		abstract: "x + yi 또는 x + yj 텍스트 형식인 복소수의 사인 값을 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/imsin-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "필수. 사인 값을 계산할 복소수입니다."
		} }
	},
	IMSINH: {
		description: "x+yi 또는 x+yj 텍스트 형식인 복소수의 하이퍼볼릭 사인 값을 반환합니다.",
		abstract: "x+yi 또는 x+yj 텍스트 형식인 복소수의 하이퍼볼릭 사인 값을 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/imsinh-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "필수. 하이퍼볼릭 사인을 구할 복소수입니다."
		} }
	},
	IMSQRT: {
		description: "x + yi 또는 x + yj 텍스트 형식인 복소수의 제곱근을 반환합니다.",
		abstract: "x + yi 또는 x + yj 텍스트 형식인 복소수의 제곱근을 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/imsqrt-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "필수. 제곱근을 계산할 복소수입니다."
		} }
	},
	IMSUB: {
		description: "x + yi 또는 x + yj 텍스트 형식인 두 복소수의 차를 반환합니다.",
		abstract: "x + yi 또는 x + yj 텍스트 형식인 두 복소수의 차를 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/imsub-function"
		}],
		functionParameter: {
			inumber1: {
				name: "inumber1",
				detail: "필수. 피감수인 복소수입니다."
			},
			inumber2: {
				name: "inumber2",
				detail: "필수. 감수인 복소수입니다."
			}
		}
	},
	IMSUM: {
		description: "x + yi 또는 x + yj 텍스트 형식인 두 개 이상의 복소수의 합을 반환합니다.",
		abstract: "x + yi 또는 x + yj 텍스트 형식인 두 개 이상의 복소수의 합을 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/imsum-function"
		}],
		functionParameter: {
			inumber1: {
				name: "inumber1",
				detail: "Inumber1이 필요하며 후속 숫자는 필요하지 않습니다. 더할 복소수로, 1개에서 255개까지 지정할 수 있습니다."
			},
			inumber2: {
				name: "inumber2",
				detail: "Inumber1이 필요하며 후속 숫자는 필요하지 않습니다. 더할 복소수로, 1개에서 255개까지 지정할 수 있습니다."
			}
		}
	},
	IMTAN: {
		description: "x + yi 또는 x + yj 텍스트 형식인 복소수의 탄젠트 값을 반환합니다.",
		abstract: "x + yi 또는 x + yj 텍스트 형식인 복소수의 탄젠트 값을 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/imtan-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "필수. 탄젠트를 사용할 복소수입니다."
		} }
	},
	IMTANH: {
		description: "IMTANH 함수는 주어진 복소수의 쌍곡선 탄젠트값을 반환합니다. 예를 들어 복소수 'x+yi'가 주어지면 'tanh(x+yi)'가 반환됩니다.",
		abstract: "IMTANH 함수는 주어진 복소수의 쌍곡선 탄젠트값을 반환합니다. 예를 들어 복소수 'x+yi'가 주어지면 'tanh(x+yi)'가 반환됩니다.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9366655?hl=ko"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "쌍곡선 탄젠트를 구하려는 복소수입니다. 이는 COMPLEX 함수의 결과, 허수부가 0인 복소수로 해석되는 실수 또는 x와 y가 숫자인 'x + yi' 형식의 문자열일 수 있습니다."
		} }
	},
	OCT2BIN: {
		description: "8진수를 2진수로 변환합니다.",
		abstract: "8진수를 2진수로 변환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/oct2bin-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "필수 요소입니다. 변환할 8진수입니다. 숫자는 10자를 초과할 수 없습니다. Number의 최상위 비트는 부호 비트입니다. 나머지 29비트 는 진도 비트입니다. 음수는 2의 보수 표기법으로 표시됩니다."
			},
			places: {
				name: "places",
				detail: "선택 사항입니다. 사용할 자릿수입니다. places를 생략하면 OCT2BIN에서는 필요한 최소 자릿수가 사용됩니다. places를 지정하면 반환 값의 앞부분을 0으로 채울 수 있습니다."
			}
		}
	},
	OCT2DEC: {
		description: "8진수를 10진수로 변환합니다.",
		abstract: "8진수를 10진수로 변환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/oct2dec-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "필수 요소입니다. 변환할 8진수입니다. 숫자는 10 8진수(30비트)를 초과할 수 없습니다. Number의 최상위 비트는 부호 비트입니다. 나머지 29비트 는 진도 비트입니다. 음수는 2의 보수 표기법으로 표시됩니다."
		} }
	},
	OCT2HEX: {
		description: "8진수를 16진수로 변환합니다.",
		abstract: "8진수를 16진수로 변환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/oct2hex-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "필수 요소입니다. 변환할 8진수입니다. 숫자는 10 8진수(30비트)를 초과할 수 없습니다. Number의 최상위 비트는 부호 비트입니다. 나머지 29비트 는 진도 비트입니다. 음수는 2의 보수 표기법으로 표시됩니다."
			},
			places: {
				name: "places",
				detail: "선택 사항입니다. 사용할 자릿수입니다. places를 생략하면 OCT2HEX에서는 필요한 최소 자릿수가 사용됩니다. places를 지정하면 반환 값의 앞부분을 0으로 채울 수 있습니다."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/financial/ko-KR.ts
const locale$9 = {
	ACCRINT: {
		description: "정기적으로 이자를 지급하는 증권의 경과 이자를 반환합니다",
		abstract: "정기적으로 이자를 지급하는 증권의 경과 이자를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/accrint-function"
		}],
		functionParameter: {
			issue: {
				name: "issue",
				detail: "증권의 발행일입니다."
			},
			firstInterest: {
				name: "first_interest",
				detail: "증권의 첫 번째 이자 지급일입니다."
			},
			settlement: {
				name: "settlement",
				detail: "증권의 만기일입니다."
			},
			rate: {
				name: "rate",
				detail: "증권의 연간 이표 이율입니다."
			},
			par: {
				name: "par",
				detail: "증권의 액면가입니다."
			},
			frequency: {
				name: "frequency",
				detail: "연간 이표 지급 횟수입니다."
			},
			basis: {
				name: "basis",
				detail: "사용할 일수 계산 기준 유형입니다."
			},
			calcMethod: {
				name: "calc_method",
				detail: "논리값: 발행일부터 이자가 발생하는 경우 = TRUE 또는 무시, 마지막 이표 지급일부터 이자가 발생하는 경우 = FALSE."
			}
		}
	},
	ACCRINTM: {
		description: "만기에 이자를 지급하는 증권의 경과 이자를 반환합니다",
		abstract: "만기에 이자를 지급하는 증권의 경과 이자를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/accrintm-function"
		}],
		functionParameter: {
			issue: {
				name: "issue",
				detail: "증권의 발행일입니다."
			},
			settlement: {
				name: "settlement",
				detail: "증권의 만기일입니다."
			},
			rate: {
				name: "rate",
				detail: "증권의 연간 이표 이율입니다."
			},
			par: {
				name: "par",
				detail: "증권의 액면가입니다."
			},
			basis: {
				name: "basis",
				detail: "사용할 일수 계산 기준 유형입니다."
			}
		}
	},
	AMORDEGRC: {
		description: "감가상각 계수를 사용하여 각 회계 기간의 감가상각액을 반환합니다",
		abstract: "감가상각 계수를 사용하여 각 회계 기간의 감가상각액을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/amordegrc-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "자산의 원가입니다."
			},
			datePurchased: {
				name: "date_purchased",
				detail: "자산의 구입일입니다."
			},
			firstPeriod: {
				name: "first_period",
				detail: "첫 번째 기간의 종료일입니다."
			},
			salvage: {
				name: "salvage",
				detail: "자산의 수명이 끝날 때의 잔존가입니다."
			},
			period: {
				name: "period",
				detail: "기간입니다."
			},
			rate: {
				name: "rate",
				detail: "감가상각률입니다."
			},
			basis: {
				name: "basis",
				detail: "사용할 연도 기준입니다."
			}
		}
	},
	AMORLINC: {
		description: "각 회계 기간의 감가상각액을 반환합니다",
		abstract: "각 회계 기간의 감가상각액을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/amorlinc-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "자산의 원가입니다."
			},
			datePurchased: {
				name: "date_purchased",
				detail: "자산의 구입일입니다."
			},
			firstPeriod: {
				name: "first_period",
				detail: "첫 번째 기간의 종료일입니다."
			},
			salvage: {
				name: "salvage",
				detail: "자산의 수명이 끝날 때의 잔존가입니다."
			},
			period: {
				name: "period",
				detail: "기간입니다."
			},
			rate: {
				name: "rate",
				detail: "감가상각률입니다."
			},
			basis: {
				name: "basis",
				detail: "사용할 연도 기준입니다."
			}
		}
	},
	COUPDAYBS: {
		description: "이표 기간의 시작부터 결제일까지의 일수를 반환합니다",
		abstract: "이표 기간의 시작부터 결제일까지의 일수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/coupdaybs-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "증권의 결제일입니다."
			},
			maturity: {
				name: "maturity",
				detail: "증권의 만기일입니다."
			},
			frequency: {
				name: "frequency",
				detail: "연간 이표 지급 횟수입니다."
			},
			basis: {
				name: "basis",
				detail: "사용할 일수 계산 기준 유형입니다."
			}
		}
	},
	COUPDAYS: {
		description: "결제일이 포함된 이표 기간의 일수를 반환합니다",
		abstract: "결제일이 포함된 이표 기간의 일수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/coupdays-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "증권의 결제일입니다."
			},
			maturity: {
				name: "maturity",
				detail: "증권의 만기일입니다."
			},
			frequency: {
				name: "frequency",
				detail: "연간 이표 지급 횟수입니다."
			},
			basis: {
				name: "basis",
				detail: "사용할 일수 계산 기준 유형입니다."
			}
		}
	},
	COUPDAYSNC: {
		description: "결제일부터 다음 이표일까지의 일수를 반환합니다",
		abstract: "결제일부터 다음 이표일까지의 일수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/coupdaysnc-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "증권의 결제일입니다."
			},
			maturity: {
				name: "maturity",
				detail: "증권의 만기일입니다."
			},
			frequency: {
				name: "frequency",
				detail: "연간 이표 지급 횟수입니다."
			},
			basis: {
				name: "basis",
				detail: "사용할 일수 계산 기준 유형입니다."
			}
		}
	},
	COUPNCD: {
		description: "결제일 이후의 다음 이표일을 반환합니다",
		abstract: "결제일 이후의 다음 이표일을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/coupncd-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "증권의 결제일입니다."
			},
			maturity: {
				name: "maturity",
				detail: "증권의 만기일입니다."
			},
			frequency: {
				name: "frequency",
				detail: "연간 이표 지급 횟수입니다."
			},
			basis: {
				name: "basis",
				detail: "사용할 일수 계산 기준 유형입니다."
			}
		}
	},
	COUPNUM: {
		description: "결제일과 만기일 사이에 지급할 이표 수를 반환합니다",
		abstract: "결제일과 만기일 사이에 지급할 이표 수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/coupnum-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "증권의 결제일입니다."
			},
			maturity: {
				name: "maturity",
				detail: "증권의 만기일입니다."
			},
			frequency: {
				name: "frequency",
				detail: "연간 이표 지급 횟수입니다."
			},
			basis: {
				name: "basis",
				detail: "사용할 일수 계산 기준 유형입니다."
			}
		}
	},
	COUPPCD: {
		description: "결제일 이전의 이전 이표일을 반환합니다",
		abstract: "결제일 이전의 이전 이표일을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/couppcd-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "증권의 결제일입니다."
			},
			maturity: {
				name: "maturity",
				detail: "증권의 만기일입니다."
			},
			frequency: {
				name: "frequency",
				detail: "연간 이표 지급 횟수입니다."
			},
			basis: {
				name: "basis",
				detail: "사용할 일수 계산 기준 유형입니다."
			}
		}
	},
	CUMIPMT: {
		description: "두 기간 사이에 지급된 누적 이자를 반환합니다",
		abstract: "두 기간 사이에 지급된 누적 이자를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/cumipmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "이자율입니다."
			},
			nper: {
				name: "nper",
				detail: "총 지불 기간 수입니다."
			},
			pv: {
				name: "pv",
				detail: "현재 가치입니다."
			},
			startPeriod: {
				name: "start_period",
				detail: "계산의 첫 번째 기간입니다. 지불 기간은 1부터 번호가 매겨집니다."
			},
			endPeriod: {
				name: "end_period",
				detail: "계산의 마지막 기간입니다."
			},
			type: {
				name: "type",
				detail: "지불 시기입니다."
			}
		}
	},
	CUMPRINC: {
		description: "두 기간 사이에 대출에 대해 지급된 누적 원금을 반환합니다",
		abstract: "두 기간 사이에 대출에 대해 지급된 누적 원금을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/cumprinc-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "이자율입니다."
			},
			nper: {
				name: "nper",
				detail: "총 지불 기간 수입니다."
			},
			pv: {
				name: "pv",
				detail: "현재 가치입니다."
			},
			startPeriod: {
				name: "start_period",
				detail: "계산의 첫 번째 기간입니다. 지불 기간은 1부터 번호가 매겨집니다."
			},
			endPeriod: {
				name: "end_period",
				detail: "계산의 마지막 기간입니다."
			},
			type: {
				name: "type",
				detail: "지불 시기입니다."
			}
		}
	},
	DB: {
		description: "고정 감소 잔액법을 사용하여 지정된 기간의 자산 감가상각액을 반환합니다",
		abstract: "고정 감소 잔액법을 사용하여 지정된 기간의 자산 감가상각액을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/db-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "자산의 초기 원가입니다."
			},
			salvage: {
				name: "salvage",
				detail: "감가상각이 끝날 때의 가치(자산의 잔존가라고도 함)입니다."
			},
			life: {
				name: "life",
				detail: "자산을 감가상각하는 기간 수(자산의 내용 연수라고도 함)입니다."
			},
			period: {
				name: "period",
				detail: "감가상각액을 계산하려는 기간입니다."
			},
			month: {
				name: "month",
				detail: "첫해의 개월 수입니다. month를 생략하면 12로 간주됩니다."
			}
		}
	},
	DDB: {
		description: "이중 감소 잔액법 또는 지정한 다른 방법을 사용하여 지정된 기간의 자산 감가상각액을 반환합니다",
		abstract: "이중 감소 잔액법 또는 지정한 다른 방법을 사용하여 지정된 기간의 자산 감가상각액을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/ddb-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "자산의 초기 원가입니다."
			},
			salvage: {
				name: "salvage",
				detail: "감가상각이 끝날 때의 가치(자산의 잔존가라고도 함)입니다."
			},
			life: {
				name: "life",
				detail: "자산을 감가상각하는 기간 수(자산의 내용 연수라고도 함)입니다."
			},
			period: {
				name: "period",
				detail: "감가상각액을 계산하려는 기간입니다."
			},
			factor: {
				name: "factor",
				detail: "잔액이 감소하는 비율입니다. factor를 생략하면 2(이중 감소 잔액법)로 간주됩니다."
			}
		}
	},
	DISC: {
		description: "증권의 할인율을 반환합니다",
		abstract: "증권의 할인율을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/disc-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "증권의 결제일입니다."
			},
			maturity: {
				name: "maturity",
				detail: "증권의 만기일입니다."
			},
			pr: {
				name: "pr",
				detail: "액면가 $100당 증권의 가격입니다."
			},
			redemption: {
				name: "redemption",
				detail: "액면가 $100당 증권의 환매 가치입니다."
			},
			basis: {
				name: "basis",
				detail: "사용할 일수 계산 기준 유형입니다."
			}
		}
	},
	DOLLARDE: {
		description: "분수로 표현된 달러 가격을 십진수로 표현된 달러 가격으로 변환합니다",
		abstract: "분수로 표현된 달러 가격을 십진수로 표현된 달러 가격으로 변환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/dollarde-function"
		}],
		functionParameter: {
			fractionalDollar: {
				name: "fractional_dollar",
				detail: "소수점으로 구분된 정수 부분과 분수 부분으로 표현된 숫자입니다."
			},
			fraction: {
				name: "fraction",
				detail: "분수의 분모에 사용할 정수입니다."
			}
		}
	},
	DOLLARFR: {
		description: "십진수로 표현된 달러 가격을 분수로 표현된 달러 가격으로 변환합니다",
		abstract: "십진수로 표현된 달러 가격을 분수로 표현된 달러 가격으로 변환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/dollarfr-function"
		}],
		functionParameter: {
			decimalDollar: {
				name: "decimal_dollar",
				detail: "십진수입니다."
			},
			fraction: {
				name: "fraction",
				detail: "분수의 분모에 사용할 정수입니다."
			}
		}
	},
	DURATION: {
		description: "정기적으로 이자를 지급하는 증권의 연간 듀레이션을 반환합니다",
		abstract: "정기적으로 이자를 지급하는 증권의 연간 듀레이션을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/duration-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "증권의 결제일입니다."
			},
			maturity: {
				name: "maturity",
				detail: "증권의 만기일입니다."
			},
			coupon: {
				name: "coupon",
				detail: "증권의 연간 이표 이율입니다."
			},
			yld: {
				name: "yld",
				detail: "증권의 연간 수익률입니다."
			},
			frequency: {
				name: "frequency",
				detail: "연간 이표 지급 횟수입니다."
			},
			basis: {
				name: "basis",
				detail: "사용할 일수 계산 기준 유형입니다."
			}
		}
	},
	EFFECT: {
		description: "실효 연이율을 반환합니다",
		abstract: "실효 연이율을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/effect-function"
		}],
		functionParameter: {
			nominalRate: {
				name: "nominal_rate",
				detail: "명목 이자율입니다."
			},
			npery: {
				name: "npery",
				detail: "연간 복리 계산 기간 수입니다."
			}
		}
	},
	FV: {
		description: "FV 는 재무 함수 중 하나로, 고정 이자율을 기반으로 투자의 미래 가치를 계산합니다. FV를 정기적인 납입액 또는 단일 일괄 지불에 사용할 수 있습니다.",
		abstract: "FV 는 재무 함수 중 하나로, 고정 이자율을 기반으로 투자의 미래 가치를 계산합니다. FV를 정기적인 납입액 또는 단일 일괄 지불에 사용할 수 있습니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/fv-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "필수. 기간별 이자율입니다."
			},
			nper: {
				name: "nper",
				detail: "필수. 총 납입 기간 수입니다."
			},
			pmt: {
				name: "pmt",
				detail: "필수. 각 기간의 납입액으로서 전 기간 동안 일정합니다. 일반적으로 pmt에는 기타 비용과 세금을 제외한 원금과 이자가 포함됩니다. pmt를 생략할 경우 pv 인수를 반드시 지정해야 합니다."
			},
			pv: {
				name: "pv",
				detail: "선택적. 일련의 미래 지급액에 상응하는 현재 가치의 개략적인 합계입니다. pv를 생략하면 0으로 간주되며 이 경우 pmt 인수를 반드시 포함해야 합니다."
			},
			type: {
				name: "type",
				detail: "선택적. 납입 시점을 나타내는 숫자로서 0 또는 1입니다. 생략하면 0으로 간주됩니다."
			}
		}
	},
	FVSCHEDULE: {
		description: "초기 원금에 일련의 복리 이자율을 적용했을 때의 예상 금액을 반환합니다. FVSCHEDULE을 사용하면 투자액에 다양한 이자율을 적용했을 때의 예상 금액을 계산할 수 있습니다.",
		abstract: "초기 원금에 일련의 복리 이자율을 적용했을 때의 예상 금액을 반환합니다. FVSCHEDULE을 사용하면 투자액에 다양한 이자율을 적용했을 때의 예상 금액을 계산할 수 있습니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/fvschedule-function"
		}],
		functionParameter: {
			principal: {
				name: "principal",
				detail: "필수. 현재 가치입니다."
			},
			schedule: {
				name: "schedule",
				detail: "필수. 적용할 이자율로 구성된 배열입니다."
			}
		}
	},
	INTRATE: {
		description: "완전 투자 유가 증권의 이자율을 반환합니다.",
		abstract: "완전 투자 유가 증권의 이자율을 반환합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/intrate-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "필수. 유가 증권의 결산일입니다. 즉, 유가 증권이 매수자에게 매도된 발행일 다음 날입니다."
			},
			maturity: {
				name: "maturity",
				detail: "필수. 유가 증권의 만기일입니다. 즉, 유가 증권이 만기가 되는 날짜입니다."
			},
			investment: {
				name: "investment",
				detail: "필수. 유가 증권의 투자액입니다."
			},
			redemption: {
				name: "redemption",
				detail: "필수. 만기 시 상환액입니다."
			},
			basis: {
				name: "basis",
				detail: "선택적. 날짜 계산 기준입니다."
			}
		}
	},
	IPMT: {
		description: "일정 금액을 정기적으로 납입하고 일정한 이자율이 적용되는 투자에 대해 주어진 기간 동안의 이자를 계산합니다.",
		abstract: "일정 금액을 정기적으로 납입하고 일정한 이자율이 적용되는 투자에 대해 주어진 기간 동안의 이자를 계산합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/ipmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "필수. 기간별 이자율입니다."
			},
			per: {
				name: "per",
				detail: "필수. 이자를 계산할 기간으로 1에서 nper 사이여야 합니다."
			},
			nper: {
				name: "nper",
				detail: "필수. 총 납입 기간 수입니다."
			},
			pv: {
				name: "pv",
				detail: "필수. 일련의 미래 지급액에 상응하는 현재 가치의 개략적인 합계입니다."
			},
			fv: {
				name: "fv",
				detail: "선택적. 미래 가치 또는 마지막 지불 후 달성하려는 현금 잔액입니다. fv를 생략하면 0으로 간주됩니다(예: 대출의 미래 값은 0)."
			},
			type: {
				name: "type",
				detail: "선택적. 납입 시점을 나타내는 숫자로서 0 또는 1입니다. 생략하면 0으로 간주됩니다."
			}
		}
	},
	IRR: {
		description: "숫자로 표시되는 일련의 주기적인 현금 흐름에 대한 내부 수익률을 반환합니다. 이 현금 흐름은 연금과 같이 일정할 필요는 없습니다. 그러나 현금 흐름은 월간이나 연간처럼 정기적으로 발생해야 합니다. 내부 수익률은 주기적으로 발생하는 납입액(음수)과 수익액(양수)으로 구성되는 투자 이자율입니다.",
		abstract: "숫자로 표시되는 일련의 주기적인 현금 흐름에 대한 내부 수익률을 반환합니다. 이 현금 흐름은 연금과 같이 일정할 필요는 없습니다. 그러나 현금 흐름은 월간이나 연간처럼 정기적으로 발생해야 합니다. 내부 수익률은 주기적으로 발생하는 납입액(음수)과 수익액(양수)으로 구성되는 투자 이자율입니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/irr-function"
		}],
		functionParameter: {
			values: {
				name: "values",
				detail: "내부 수익률을 계산하려는 숫자가 포함된 배열 또는 셀 참조입니다.\n1.값에는 내부 수익률을 계산하기 위해 최소한 하나의 양수 값과 하나의 음수 값이 포함되어야 합니다.\n2.IRR은 값의 순서를 사용하여 현금 흐름의 순서를 해석합니다. 원하는 순서대로 지불 및 수입 값을 입력해야 합니다.\n3.배열 또는 참조 인수에 텍스트, 논리값 또는 빈 셀이 포함된 경우 해당 값은 무시됩니다."
			},
			guess: {
				name: "guess",
				detail: "IRR의 결과에 가까운 것으로 추측되는 숫자입니다."
			}
		}
	},
	ISPMT: {
		description: "원금 지급을 통해 지정된 대출 기간(또는 투자)에 대해 지급되거나 받은 이자를 계산합니다.",
		abstract: "원금 지급을 통해 지정된 대출 기간(또는 투자)에 대해 지급되거나 받은 이자를 계산합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/ispmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "필수 요소입니다. 투자에 대한 이자율입니다."
			},
			per: {
				name: "per",
				detail: "필수 요소입니다. 관심사를 찾으려는 기간이며 1과 Nper 사이여야 합니다."
			},
			nper: {
				name: "nper",
				detail: "필수 요소입니다. 투자에 대한 총 지급 횟수입니다."
			},
			pv: {
				name: "pv",
				detail: "필수 요소입니다. 투자 금액의 현재 가치입니다. 대출의 경우 Pv는 대출 금액입니다."
			}
		}
	},
	MDURATION: {
		description: "액면가를 $100으로 가정한 증권의 Macauley 수정 듀레이션을 반환합니다",
		abstract: "액면가를 $100으로 가정한 증권의 Macauley 수정 듀레이션을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/mduration-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "증권의 결제일입니다."
			},
			maturity: {
				name: "maturity",
				detail: "증권의 만기일입니다."
			},
			coupon: {
				name: "coupon",
				detail: "증권의 연간 이표 이율입니다."
			},
			yld: {
				name: "yld",
				detail: "증권의 연간 수익률입니다."
			},
			frequency: {
				name: "frequency",
				detail: "연간 이표 지급 횟수입니다."
			},
			basis: {
				name: "basis",
				detail: "사용할 일수 계산 기준 유형입니다."
			}
		}
	},
	MIRR: {
		description: "양수 및 음수 현금 흐름이 다른 이율로 자금 조달되는 경우의 내부 수익률을 반환합니다",
		abstract: "양수 및 음수 현금 흐름이 다른 이율로 자금 조달되는 경우의 내부 수익률을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/mirr-function"
		}],
		functionParameter: {
			values: {
				name: "values",
				detail: "숫자가 포함된 배열 또는 셀 참조입니다. 이러한 숫자는 정기적으로 발생하는 일련의 지불(음수 값) 및 수입(양수 값)을 나타냅니다.\n1.수정된 내부 수익률을 계산하려면 값에 최소한 하나의 양수 값과 하나의 음수 값이 포함되어야 합니다. 그렇지 않으면 MIRR은 #DIV/0! 오류 값을 반환합니다.\n2.배열 또는 참조 인수에 텍스트, 논리값 또는 빈 셀이 포함된 경우 해당 값은 무시되지만 값이 0인 셀은 포함됩니다."
			},
			financeRate: {
				name: "finance_rate",
				detail: "현금 흐름에 사용된 돈에 대해 지불하는 이자율입니다."
			},
			reinvestRate: {
				name: "reinvest_rate",
				detail: "현금 흐름을 재투자할 때 받는 이자율입니다."
			}
		}
	},
	NOMINAL: {
		description: "연간 명목 이자율을 반환합니다",
		abstract: "연간 명목 이자율을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/nominal-function"
		}],
		functionParameter: {
			effectRate: {
				name: "effect_rate",
				detail: "실효 이자율입니다."
			},
			npery: {
				name: "npery",
				detail: "연간 복리 계산 기간 수입니다."
			}
		}
	},
	NPER: {
		description: "투자의 기간 수를 반환합니다",
		abstract: "투자의 기간 수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/nper-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "기간당 이자율입니다."
			},
			pmt: {
				name: "pmt",
				detail: "각 기간에 지불되는 금액으로, 연금 기간 동안 변경할 수 없습니다."
			},
			pv: {
				name: "pv",
				detail: "현재 가치 또는 일련의 미래 지불금의 현재 가치 합계입니다."
			},
			fv: {
				name: "fv",
				detail: "미래 가치 또는 마지막 지불 후 달성하려는 현금 잔액입니다."
			},
			type: {
				name: "type",
				detail: "지불 시기를 나타내는 숫자 0 또는 1입니다."
			}
		}
	},
	NPV: {
		description: "일련의 정기적인 현금 흐름과 할인율을 기반으로 투자의 순 현재 가치를 반환합니다",
		abstract: "일련의 정기적인 현금 흐름과 할인율을 기반으로 투자의 순 현재 가치를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/npv-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "한 기간 동안의 할인율입니다."
			},
			value1: {
				name: "value1",
				detail: "지불 및 수입을 나타내는 1~254개의 인수입니다."
			},
			value2: {
				name: "value2",
				detail: "지불 및 수입을 나타내는 1~254개의 인수입니다."
			}
		}
	},
	ODDFPRICE: {
		description: "첫 번째 기간이 비정상적인 증권의 액면가 $100당 가격을 반환합니다",
		abstract: "첫 번째 기간이 비정상적인 증권의 액면가 $100당 가격을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/oddfprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "증권의 결제일입니다."
			},
			maturity: {
				name: "maturity",
				detail: "증권의 만기일입니다."
			},
			issue: {
				name: "issue",
				detail: "증권의 발행일입니다."
			},
			firstCoupon: {
				name: "first_coupon",
				detail: "증권의 첫 번째 이표일입니다."
			},
			rate: {
				name: "rate",
				detail: "증권의 이자율입니다."
			},
			yld: {
				name: "yld",
				detail: "증권의 연간 수익률입니다."
			},
			redemption: {
				name: "redemption",
				detail: "액면가 $100당 증권의 환매 가치입니다."
			},
			frequency: {
				name: "frequency",
				detail: "연간 이표 지급 횟수입니다."
			},
			basis: {
				name: "basis",
				detail: "사용할 일수 계산 기준 유형입니다."
			}
		}
	},
	ODDFYIELD: {
		description: "첫 번째 기간이 비정상적인 증권의 수익률을 반환합니다",
		abstract: "첫 번째 기간이 비정상적인 증권의 수익률을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/oddfyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "증권의 결제일입니다."
			},
			maturity: {
				name: "maturity",
				detail: "증권의 만기일입니다."
			},
			issue: {
				name: "issue",
				detail: "증권의 발행일입니다."
			},
			firstCoupon: {
				name: "first_coupon",
				detail: "증권의 첫 번째 이표일입니다."
			},
			rate: {
				name: "rate",
				detail: "증권의 이자율입니다."
			},
			pr: {
				name: "pr",
				detail: "증권의 가격입니다."
			},
			redemption: {
				name: "redemption",
				detail: "액면가 $100당 증권의 환매 가치입니다."
			},
			frequency: {
				name: "frequency",
				detail: "연간 이표 지급 횟수입니다."
			},
			basis: {
				name: "basis",
				detail: "사용할 일수 계산 기준 유형입니다."
			}
		}
	},
	ODDLPRICE: {
		description: "마지막 기간이 비정상적인 증권의 액면가 $100당 가격을 반환합니다",
		abstract: "마지막 기간이 비정상적인 증권의 액면가 $100당 가격을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/oddlprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "증권의 결제일입니다."
			},
			maturity: {
				name: "maturity",
				detail: "증권의 만기일입니다."
			},
			lastInterest: {
				name: "last_interest",
				detail: "증권의 마지막 이표일입니다."
			},
			rate: {
				name: "rate",
				detail: "증권의 이자율입니다."
			},
			yld: {
				name: "yld",
				detail: "증권의 연간 수익률입니다."
			},
			redemption: {
				name: "redemption",
				detail: "액면가 $100당 증권의 환매 가치입니다."
			},
			frequency: {
				name: "frequency",
				detail: "연간 이표 지급 횟수입니다."
			},
			basis: {
				name: "basis",
				detail: "사용할 일수 계산 기준 유형입니다."
			}
		}
	},
	ODDLYIELD: {
		description: "마지막 기간이 비정상적인 증권의 수익률을 반환합니다",
		abstract: "마지막 기간이 비정상적인 증권의 수익률을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/oddlyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "증권의 결제일입니다."
			},
			maturity: {
				name: "maturity",
				detail: "증권의 만기일입니다."
			},
			lastInterest: {
				name: "last_interest",
				detail: "증권의 마지막 이표일입니다."
			},
			rate: {
				name: "rate",
				detail: "증권의 이자율입니다."
			},
			pr: {
				name: "pr",
				detail: "증권의 가격입니다."
			},
			redemption: {
				name: "redemption",
				detail: "액면가 $100당 증권의 환매 가치입니다."
			},
			frequency: {
				name: "frequency",
				detail: "연간 이표 지급 횟수입니다."
			},
			basis: {
				name: "basis",
				detail: "사용할 일수 계산 기준 유형입니다."
			}
		}
	},
	PDURATION: {
		description: "투자가 지정된 값에 도달하는 데 필요한 기간을 반환합니다",
		abstract: "투자가 지정된 값에 도달하는 데 필요한 기간을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/pduration-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "기간당 이자율입니다."
			},
			pv: {
				name: "pv",
				detail: "투자의 현재 가치입니다."
			},
			fv: {
				name: "fv",
				detail: "투자의 원하는 미래 가치입니다."
			}
		}
	},
	PMT: {
		description: "연금에 대한 정기 지불액을 반환합니다",
		abstract: "연금에 대한 정기 지불액을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/pmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "대출의 이자율입니다."
			},
			nper: {
				name: "nper",
				detail: "대출의 총 지불 횟수입니다."
			},
			pv: {
				name: "pv",
				detail: "현재 가치 또는 일련의 미래 지불금의 현재 가치 합계인 원금입니다."
			},
			fv: {
				name: "fv",
				detail: "미래 가치 또는 마지막 지불을 한 후 달성하려는 현금 잔액입니다."
			},
			type: {
				name: "type",
				detail: "지불 시기를 나타내는 숫자 0 또는 1입니다."
			}
		}
	},
	PPMT: {
		description: "지정된 기간의 투자에 대한 원금 지불액을 반환합니다",
		abstract: "지정된 기간의 투자에 대한 원금 지불액을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/ppmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "기간당 이자율입니다."
			},
			per: {
				name: "per",
				detail: "원금을 찾으려는 기간을 지정하며 1에서 nper 사이의 범위에 있어야 합니다."
			},
			nper: {
				name: "nper",
				detail: "연금의 총 지불 기간 수입니다."
			},
			pv: {
				name: "pv",
				detail: "현재 가치 - 일련의 미래 지불금의 현재 가치 합계입니다."
			},
			fv: {
				name: "fv",
				detail: "미래 가치 또는 마지막 지불 후 달성하려는 현금 잔액입니다."
			},
			type: {
				name: "type",
				detail: "지불 시기를 나타내는 숫자 0 또는 1입니다."
			}
		}
	},
	PRICE: {
		description: "정기적으로 이자를 지급하는 증권의 액면가 $100당 가격을 반환합니다",
		abstract: "정기적으로 이자를 지급하는 증권의 액면가 $100당 가격을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/price-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "증권의 결제일입니다."
			},
			maturity: {
				name: "maturity",
				detail: "증권의 만기일입니다."
			},
			rate: {
				name: "rate",
				detail: "증권의 연간 이표 이율입니다."
			},
			yld: {
				name: "yld",
				detail: "증권의 연간 수익률입니다."
			},
			redemption: {
				name: "redemption",
				detail: "액면가 $100당 증권의 환매 가치입니다."
			},
			frequency: {
				name: "frequency",
				detail: "연간 이표 지급 횟수입니다."
			},
			basis: {
				name: "basis",
				detail: "사용할 일수 계산 기준 유형입니다."
			}
		}
	},
	PRICEDISC: {
		description: "할인된 증권의 액면가 $100당 가격을 반환합니다",
		abstract: "할인된 증권의 액면가 $100당 가격을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/pricedisc-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "증권의 결제일입니다."
			},
			maturity: {
				name: "maturity",
				detail: "증권의 만기일입니다."
			},
			discount: {
				name: "discount",
				detail: "증권의 할인율입니다."
			},
			redemption: {
				name: "redemption",
				detail: "액면가 $100당 증권의 환매 가치입니다."
			},
			basis: {
				name: "basis",
				detail: "사용할 일수 계산 기준 유형입니다."
			}
		}
	},
	PRICEMAT: {
		description: "만기에 이자를 지급하는 증권의 액면가 $100당 가격을 반환합니다",
		abstract: "만기에 이자를 지급하는 증권의 액면가 $100당 가격을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/pricemat-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "증권의 결제일입니다."
			},
			maturity: {
				name: "maturity",
				detail: "증권의 만기일입니다."
			},
			issue: {
				name: "issue",
				detail: "증권의 발행일입니다."
			},
			rate: {
				name: "rate",
				detail: "발행일의 증권 이자율입니다."
			},
			yld: {
				name: "yld",
				detail: "증권의 연간 수익률입니다."
			},
			basis: {
				name: "basis",
				detail: "사용할 일수 계산 기준 유형입니다."
			}
		}
	},
	PV: {
		description: "투자의 현재 가치를 반환합니다",
		abstract: "투자의 현재 가치를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/pv-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "기간당 이자율입니다."
			},
			nper: {
				name: "nper",
				detail: "연금의 총 지불 기간 수입니다."
			},
			pmt: {
				name: "pmt",
				detail: "각 기간에 지불되는 금액으로, 연금 기간 동안 변경할 수 없습니다."
			},
			fv: {
				name: "fv",
				detail: "미래 가치 또는 마지막 지불 후 달성하려는 현금 잔액입니다."
			},
			type: {
				name: "type",
				detail: "지불 시기를 나타내는 숫자 0 또는 1입니다."
			}
		}
	},
	RATE: {
		description: "연금의 기간당 이자율을 반환합니다",
		abstract: "연금의 기간당 이자율을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/rate-function"
		}],
		functionParameter: {
			nper: {
				name: "nper",
				detail: "연금의 총 지불 기간 수입니다."
			},
			pmt: {
				name: "pmt",
				detail: "각 기간에 지불되는 금액으로, 연금 기간 동안 변경할 수 없습니다."
			},
			pv: {
				name: "pv",
				detail: "현재 가치 - 일련의 미래 지불금의 현재 가치 합계입니다."
			},
			fv: {
				name: "fv",
				detail: "미래 가치 또는 마지막 지불 후 달성하려는 현금 잔액입니다."
			},
			type: {
				name: "type",
				detail: "지불 시기를 나타내는 숫자 0 또는 1입니다."
			},
			guess: {
				name: "guess",
				detail: "이자율에 대한 추측값입니다."
			}
		}
	},
	RECEIVED: {
		description: "완전 투자된 증권에 대해 만기에 받는 금액을 반환합니다",
		abstract: "완전 투자된 증권에 대해 만기에 받는 금액을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/received-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "증권의 결제일입니다."
			},
			maturity: {
				name: "maturity",
				detail: "증권의 만기일입니다."
			},
			investment: {
				name: "investment",
				detail: "증권에 투자한 금액입니다."
			},
			discount: {
				name: "discount",
				detail: "증권의 할인율입니다."
			},
			basis: {
				name: "basis",
				detail: "사용할 일수 계산 기준 유형입니다."
			}
		}
	},
	RRI: {
		description: "투자 성장에 대한 등가 이자율을 반환합니다",
		abstract: "투자 성장에 대한 등가 이자율을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/rri-function"
		}],
		functionParameter: {
			nper: {
				name: "nper",
				detail: "투자의 기간 수입니다."
			},
			pv: {
				name: "pv",
				detail: "투자의 현재 가치입니다."
			},
			fv: {
				name: "fv",
				detail: "투자의 미래 가치입니다."
			}
		}
	},
	SLN: {
		description: "한 기간의 자산의 정액 감가상각액을 반환합니다",
		abstract: "한 기간의 자산의 정액 감가상각액을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/sln-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "자산의 초기 원가입니다."
			},
			salvage: {
				name: "salvage",
				detail: "수명이 끝날 때의 가치입니다."
			},
			life: {
				name: "life",
				detail: "자산의 내용 연수입니다."
			}
		}
	},
	SYD: {
		description: "지정된 기간의 자산에 대한 연수 합계 감가상각액을 반환합니다",
		abstract: "지정된 기간의 자산에 대한 연수 합계 감가상각액을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/syd-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "자산의 초기 원가입니다."
			},
			salvage: {
				name: "salvage",
				detail: "수명이 끝날 때의 가치입니다."
			},
			life: {
				name: "life",
				detail: "자산이 감가상각되는 기간 수입니다."
			},
			per: {
				name: "per",
				detail: "기간으로 life와 동일한 단위를 사용해야 합니다."
			}
		}
	},
	TBILLEQ: {
		description: "재무부 단기 채권에 대한 채권 등가 수익률을 반환합니다",
		abstract: "재무부 단기 채권에 대한 채권 등가 수익률을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/tbilleq-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "재무부 단기 채권의 결제일입니다."
			},
			maturity: {
				name: "maturity",
				detail: "재무부 단기 채권의 만기일입니다."
			},
			discount: {
				name: "discount",
				detail: "재무부 단기 채권의 할인율입니다."
			}
		}
	},
	TBILLPRICE: {
		description: "재무부 단기 채권의 액면가 $100당 가격을 반환합니다",
		abstract: "재무부 단기 채권의 액면가 $100당 가격을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/tbillprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "재무부 단기 채권의 결제일입니다."
			},
			maturity: {
				name: "maturity",
				detail: "재무부 단기 채권의 만기일입니다."
			},
			discount: {
				name: "discount",
				detail: "재무부 단기 채권의 할인율입니다."
			}
		}
	},
	TBILLYIELD: {
		description: "재무부 단기 채권의 수익률을 반환합니다",
		abstract: "재무부 단기 채권의 수익률을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/tbillyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "재무부 단기 채권의 결제일입니다."
			},
			maturity: {
				name: "maturity",
				detail: "재무부 단기 채권의 만기일입니다."
			},
			pr: {
				name: "pr",
				detail: "재무부 단기 채권의 액면가 $100당 가격입니다."
			}
		}
	},
	VDB: {
		description: "이중 감소 잔액법 또는 기타 지정한 방법을 사용하여 지정된 기간 또는 부분 기간의 자산 감가상각액을 반환합니다",
		abstract: "이중 감소 잔액법 또는 기타 지정한 방법을 사용하여 지정된 기간 또는 부분 기간의 자산 감가상각액을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/vdb-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "자산의 초기 원가입니다."
			},
			salvage: {
				name: "salvage",
				detail: "수명이 끝날 때의 가치입니다."
			},
			life: {
				name: "life",
				detail: "자산이 감가상각되는 기간 수입니다."
			},
			startPeriod: {
				name: "start_period",
				detail: "감가상각을 계산하려는 시작 기간입니다."
			},
			endPeriod: {
				name: "end_period",
				detail: "감가상각을 계산하려는 종료 기간입니다."
			},
			factor: {
				name: "factor",
				detail: "잔액이 감소하는 비율입니다."
			},
			noSwitch: {
				name: "no_switch",
				detail: "감가상각이 정액법보다 크지 않을 때 정액법으로 전환할지 여부를 지정하는 논리값입니다."
			}
		}
	},
	XIRR: {
		description: "반드시 정기적이지 않은 일련의 현금 흐름에 대한 내부 수익률을 반환합니다",
		abstract: "반드시 정기적이지 않은 일련의 현금 흐름에 대한 내부 수익률을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/xirr-function"
		}],
		functionParameter: {
			values: {
				name: "values",
				detail: "일련의 날짜에 해당하는 일련의 현금 흐름입니다."
			},
			dates: {
				name: "dates",
				detail: "현금 흐름 지불에 해당하는 지불 날짜 일정입니다."
			},
			guess: {
				name: "guess",
				detail: "XIRR의 결과에 가까운 것으로 추측되는 숫자입니다."
			}
		}
	},
	XNPV: {
		description: "반드시 정기적이지 않은 일련의 현금 흐름에 대한 순 현재 가치를 반환합니다",
		abstract: "반드시 정기적이지 않은 일련의 현금 흐름에 대한 순 현재 가치를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/xnpv-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "현금 흐름에 적용할 할인율입니다."
			},
			values: {
				name: "values",
				detail: "일련의 날짜에 해당하는 일련의 현금 흐름입니다."
			},
			dates: {
				name: "dates",
				detail: "현금 흐름 지불에 해당하는 지불 날짜 일정입니다."
			}
		}
	},
	YIELD: {
		description: "정기적으로 이자를 지급하는 증권의 수익률을 반환합니다",
		abstract: "정기적으로 이자를 지급하는 증권의 수익률을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/yield-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "증권의 결제일입니다."
			},
			maturity: {
				name: "maturity",
				detail: "증권의 만기일입니다."
			},
			rate: {
				name: "rate",
				detail: "증권의 연간 이표 이율입니다."
			},
			pr: {
				name: "pr",
				detail: "액면가 $100당 증권의 가격입니다."
			},
			redemption: {
				name: "redemption",
				detail: "액면가 $100당 증권의 환매 가치입니다."
			},
			frequency: {
				name: "frequency",
				detail: "연간 이표 지급 횟수입니다."
			},
			basis: {
				name: "basis",
				detail: "사용할 일수 계산 기준 유형입니다."
			}
		}
	},
	YIELDDISC: {
		description: "재무부 단기 채권과 같은 할인 증권의 연간 수익률을 반환합니다",
		abstract: "재무부 단기 채권과 같은 할인 증권의 연간 수익률을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/yielddisc-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "증권의 결제일입니다."
			},
			maturity: {
				name: "maturity",
				detail: "증권의 만기일입니다."
			},
			pr: {
				name: "pr",
				detail: "액면가 $100당 증권의 가격입니다."
			},
			redemption: {
				name: "redemption",
				detail: "액면가 $100당 증권의 환매 가치입니다."
			},
			basis: {
				name: "basis",
				detail: "사용할 일수 계산 기준 유형입니다."
			}
		}
	},
	YIELDMAT: {
		description: "만기에 이자를 지급하는 증권의 연간 수익률을 반환합니다",
		abstract: "만기에 이자를 지급하는 증권의 연간 수익률을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/yieldmat-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "증권의 결제일입니다."
			},
			maturity: {
				name: "maturity",
				detail: "증권의 만기일입니다."
			},
			issue: {
				name: "issue",
				detail: "증권의 발행일입니다."
			},
			rate: {
				name: "rate",
				detail: "발행일의 증권 이자율입니다."
			},
			pr: {
				name: "pr",
				detail: "액면가 $100당 증권의 가격입니다."
			},
			basis: {
				name: "basis",
				detail: "사용할 일수 계산 기준 유형입니다."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/information/ko-KR.ts
const locale$8 = {
	CELL: {
		description: "셀의 서식, 위치 또는 내용에 대한 정보를 반환합니다",
		abstract: "셀의 서식, 위치 또는 내용에 대한 정보를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/cell-function"
		}],
		functionParameter: {
			infoType: {
				name: "info_type",
				detail: "반환할 셀 정보 유형을 지정하는 텍스트 값입니다."
			},
			reference: {
				name: "reference",
				detail: "정보를 원하는 셀입니다."
			}
		}
	},
	ERROR_TYPE: {
		description: "오류 유형에 해당하는 숫자를 반환합니다",
		abstract: "오류 유형에 해당하는 숫자를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/error-type-function"
		}],
		functionParameter: { errorVal: {
			name: "error_val",
			detail: "식별 번호를 찾으려는 오류 값입니다."
		} }
	},
	INFO: {
		description: "현재 운영 환경에 대한 정보를 반환합니다",
		abstract: "현재 운영 환경에 대한 정보를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/info-function"
		}],
		functionParameter: { typeText: {
			name: "유형 텍스트",
			detail: "반환할 정보 유형을 지정하는 텍스트입니다."
		} }
	},
	ISBETWEEN: {
		description: "제공된 숫자가 다른 두 숫자 사이에 있는지 확인합니다. 다른 두 숫자는 각각 범위에 포함하거나 포함하지 않을 수 있습니다.",
		abstract: "제공된 숫자가 다른 두 숫자 사이에 있는지 확인합니다. 다른 두 숫자는 각각 범위에 포함하거나 포함하지 않을 수 있습니다.",
		links: [{
			title: "사용법",
			url: "https://support.google.com/docs/answer/10538337?hl=ko"
		}],
		functionParameter: {
			valueToCompare: {
				name: "value_to_compare",
				detail: "`낮은_값`과 `높은_값` 사이에서 테스트되는 값입니다."
			},
			lowerValue: {
				name: "lower_value",
				detail: "값 범위의 하한으로, `비교할_값`이 포함될 수 있습니다."
			},
			upperValue: {
				name: "upper_value",
				detail: "값 범위의 상한으로, `비교할_값`이 포함될 수 있습니다."
			},
			lowerValueIsInclusive: {
				name: "lower_value_is_inclusive",
				detail: "값 범위에 `낮은_값`이 포함되는지를 지정합니다. 기본값은 TRUE입니다."
			},
			upperValueIsInclusive: {
				name: "upper_value_is_inclusive",
				detail: "값 범위에 `높은_값`이 포함되는지를 지정합니다. 기본값은 TRUE입니다."
			}
		}
	},
	ISBLANK: {
		description: "이 문서에서 소개하는 여러 함수는 통틀어 IS 함수라고 불리며 각 함수에서는 값의 유형을 검사하고 그 결과에 따라 TRUE 또는 FALSE를 반환합니다. 예를 들어 ISBLANK 함수는 값 인수가 빈 셀에 대한 참조이면 논리값 TRUE를 반환하고, 그렇지 않으면 FALSE를 반환합니다.",
		abstract: "이 문서에서 소개하는 여러 함수는 통틀어 IS 함수라고 불리며 각 함수에서는 값의 유형을 검사하고 그 결과에 따라 TRUE 또는 FALSE를 반환합니다. 예를 들어 ISBLANK 함수는 값 인수가 빈 셀에 대한 참조이면 논리값 TRUE를 반환하고, 그렇지 않으면 FALSE를 반환합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "필수. 테스트할 값입니다. value 인수는 빈 셀, 오류, 논리값, 텍스트, 숫자, 참조 값 또는 이러한 항목을 가리키는 이름일 수 있습니다."
		} }
	},
	ISDATE: {
		description: "ISDATE 함수는 값이 날짜인지 여부를 반환합니다.",
		abstract: "ISDATE 함수는 값이 날짜인지 여부를 반환합니다.",
		links: [{
			title: "사용법",
			url: "https://support.google.com/docs/answer/9061381?hl=ko"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "날짜인지 확인할 값입니다."
		} }
	},
	ISEMAIL: {
		description: "값이 유효한 이메일 주소인지 확인하려면 ISEMAIL 함수를 사용합니다. 이 함수는 값이 일반적으로 허용되는 이메일 주소 형식을 따르는지 확인하지만 존재 여부는 확인하지 않습니다.",
		abstract: "값이 유효한 이메일 주소인지 확인하려면 ISEMAIL 함수를 사용합니다. 이 함수는 값이 일반적으로 허용되는 이메일 주소 형식을 따르는지 확인하지만 존재 여부는 확인하지 않습니다.",
		links: [{
			title: "사용법",
			url: "https://support.google.com/docs/answer/3256503?hl=ko"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "유효한 이메일 주소인지 확인할 값입니다."
		} }
	},
	ISERR: {
		description: "이 문서에서 소개하는 여러 함수는 통틀어 IS 함수라고 불리며 각 함수에서는 값의 유형을 검사하고 그 결과에 따라 TRUE 또는 FALSE를 반환합니다. 예를 들어 ISBLANK 함수는 값 인수가 빈 셀에 대한 참조이면 논리값 TRUE를 반환하고, 그렇지 않으면 FALSE를 반환합니다.",
		abstract: "이 문서에서 소개하는 여러 함수는 통틀어 IS 함수라고 불리며 각 함수에서는 값의 유형을 검사하고 그 결과에 따라 TRUE 또는 FALSE를 반환합니다. 예를 들어 ISBLANK 함수는 값 인수가 빈 셀에 대한 참조이면 논리값 TRUE를 반환하고, 그렇지 않으면 FALSE를 반환합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "필수. 테스트할 값입니다. value 인수는 빈 셀, 오류, 논리값, 텍스트, 숫자, 참조 값 또는 이러한 항목을 가리키는 이름일 수 있습니다."
		} }
	},
	ISERROR: {
		description: "이 문서에서 소개하는 여러 함수는 통틀어 IS 함수라고 불리며 각 함수에서는 값의 유형을 검사하고 그 결과에 따라 TRUE 또는 FALSE를 반환합니다. 예를 들어 ISBLANK 함수는 값 인수가 빈 셀에 대한 참조이면 논리값 TRUE를 반환하고, 그렇지 않으면 FALSE를 반환합니다.",
		abstract: "이 문서에서 소개하는 여러 함수는 통틀어 IS 함수라고 불리며 각 함수에서는 값의 유형을 검사하고 그 결과에 따라 TRUE 또는 FALSE를 반환합니다. 예를 들어 ISBLANK 함수는 값 인수가 빈 셀에 대한 참조이면 논리값 TRUE를 반환하고, 그렇지 않으면 FALSE를 반환합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "필수. 테스트할 값입니다. value 인수는 빈 셀, 오류, 논리값, 텍스트, 숫자, 참조 값 또는 이러한 항목을 가리키는 이름일 수 있습니다."
		} }
	},
	ISEVEN: {
		description: "숫자가 짝수이면 TRUE를 반환합니다",
		abstract: "숫자가 짝수이면 TRUE를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/iseven-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "테스트할 값입니다. 숫자가 정수가 아니면 잘립니다."
		} }
	},
	ISFORMULA: {
		description: "수식이 포함된 셀에 대한 참조가 있으면 TRUE를 반환합니다",
		abstract: "수식이 포함된 셀에 대한 참조가 있으면 TRUE를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/isformula-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "테스트하려는 셀에 대한 참조입니다."
		} }
	},
	ISLOGICAL: {
		description: "이 문서에서 소개하는 여러 함수는 통틀어 IS 함수라고 불리며 각 함수에서는 값의 유형을 검사하고 그 결과에 따라 TRUE 또는 FALSE를 반환합니다. 예를 들어 ISBLANK 함수는 값 인수가 빈 셀에 대한 참조이면 논리값 TRUE를 반환하고, 그렇지 않으면 FALSE를 반환합니다.",
		abstract: "이 문서에서 소개하는 여러 함수는 통틀어 IS 함수라고 불리며 각 함수에서는 값의 유형을 검사하고 그 결과에 따라 TRUE 또는 FALSE를 반환합니다. 예를 들어 ISBLANK 함수는 값 인수가 빈 셀에 대한 참조이면 논리값 TRUE를 반환하고, 그렇지 않으면 FALSE를 반환합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "필수. 테스트할 값입니다. value 인수는 빈 셀, 오류, 논리값, 텍스트, 숫자, 참조 값 또는 이러한 항목을 가리키는 이름일 수 있습니다."
		} }
	},
	ISNA: {
		description: "이 문서에서 소개하는 여러 함수는 통틀어 IS 함수라고 불리며 각 함수에서는 값의 유형을 검사하고 그 결과에 따라 TRUE 또는 FALSE를 반환합니다. 예를 들어 ISBLANK 함수는 값 인수가 빈 셀에 대한 참조이면 논리값 TRUE를 반환하고, 그렇지 않으면 FALSE를 반환합니다.",
		abstract: "이 문서에서 소개하는 여러 함수는 통틀어 IS 함수라고 불리며 각 함수에서는 값의 유형을 검사하고 그 결과에 따라 TRUE 또는 FALSE를 반환합니다. 예를 들어 ISBLANK 함수는 값 인수가 빈 셀에 대한 참조이면 논리값 TRUE를 반환하고, 그렇지 않으면 FALSE를 반환합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "필수. 테스트할 값입니다. value 인수는 빈 셀, 오류, 논리값, 텍스트, 숫자, 참조 값 또는 이러한 항목을 가리키는 이름일 수 있습니다."
		} }
	},
	ISNONTEXT: {
		description: "이 문서에서 소개하는 여러 함수는 통틀어 IS 함수라고 불리며 각 함수에서는 값의 유형을 검사하고 그 결과에 따라 TRUE 또는 FALSE를 반환합니다. 예를 들어 ISBLANK 함수는 값 인수가 빈 셀에 대한 참조이면 논리값 TRUE를 반환하고, 그렇지 않으면 FALSE를 반환합니다.",
		abstract: "이 문서에서 소개하는 여러 함수는 통틀어 IS 함수라고 불리며 각 함수에서는 값의 유형을 검사하고 그 결과에 따라 TRUE 또는 FALSE를 반환합니다. 예를 들어 ISBLANK 함수는 값 인수가 빈 셀에 대한 참조이면 논리값 TRUE를 반환하고, 그렇지 않으면 FALSE를 반환합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "필수. 테스트할 값입니다. value 인수는 빈 셀, 오류, 논리값, 텍스트, 숫자, 참조 값 또는 이러한 항목을 가리키는 이름일 수 있습니다."
		} }
	},
	ISNUMBER: {
		description: "이 문서에서 소개하는 여러 함수는 통틀어 IS 함수라고 불리며 각 함수에서는 값의 유형을 검사하고 그 결과에 따라 TRUE 또는 FALSE를 반환합니다. 예를 들어 ISBLANK 함수는 값 인수가 빈 셀에 대한 참조이면 논리값 TRUE를 반환하고, 그렇지 않으면 FALSE를 반환합니다.",
		abstract: "이 문서에서 소개하는 여러 함수는 통틀어 IS 함수라고 불리며 각 함수에서는 값의 유형을 검사하고 그 결과에 따라 TRUE 또는 FALSE를 반환합니다. 예를 들어 ISBLANK 함수는 값 인수가 빈 셀에 대한 참조이면 논리값 TRUE를 반환하고, 그렇지 않으면 FALSE를 반환합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "필수. 테스트할 값입니다. value 인수는 빈 셀, 오류, 논리값, 텍스트, 숫자, 참조 값 또는 이러한 항목을 가리키는 이름일 수 있습니다."
		} }
	},
	ISODD: {
		description: "숫자가 홀수이면 TRUE를 반환합니다",
		abstract: "숫자가 홀수이면 TRUE를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/isodd-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "테스트할 값입니다. 숫자가 정수가 아니면 잘립니다."
		} }
	},
	ISOMITTED: {
		description: "LAMBDA의 값이 누락되었는지 확인하고 TRUE 또는 FALSE를 반환합니다",
		abstract: "LAMBDA의 값이 누락되었는지 확인하고 TRUE 또는 FALSE를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/isomitted-function"
		}],
		functionParameter: { argument: {
			name: "인수",
			detail: "LAMBDA 매개 변수처럼 인수가 생략되었는지 검사할 값입니다."
		} }
	},
	ISREF: {
		description: "이 문서에서 소개하는 여러 함수는 통틀어 IS 함수라고 불리며 각 함수에서는 값의 유형을 검사하고 그 결과에 따라 TRUE 또는 FALSE를 반환합니다. 예를 들어 ISBLANK 함수는 값 인수가 빈 셀에 대한 참조이면 논리값 TRUE를 반환하고, 그렇지 않으면 FALSE를 반환합니다.",
		abstract: "이 문서에서 소개하는 여러 함수는 통틀어 IS 함수라고 불리며 각 함수에서는 값의 유형을 검사하고 그 결과에 따라 TRUE 또는 FALSE를 반환합니다. 예를 들어 ISBLANK 함수는 값 인수가 빈 셀에 대한 참조이면 논리값 TRUE를 반환하고, 그렇지 않으면 FALSE를 반환합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "필수. 테스트할 값입니다. value 인수는 빈 셀, 오류, 논리값, 텍스트, 숫자, 참조 값 또는 이러한 항목을 가리키는 이름일 수 있습니다."
		} }
	},
	ISTEXT: {
		description: "이 문서에서 소개하는 여러 함수는 통틀어 IS 함수라고 불리며 각 함수에서는 값의 유형을 검사하고 그 결과에 따라 TRUE 또는 FALSE를 반환합니다. 예를 들어 ISBLANK 함수는 값 인수가 빈 셀에 대한 참조이면 논리값 TRUE를 반환하고, 그렇지 않으면 FALSE를 반환합니다.",
		abstract: "이 문서에서 소개하는 여러 함수는 통틀어 IS 함수라고 불리며 각 함수에서는 값의 유형을 검사하고 그 결과에 따라 TRUE 또는 FALSE를 반환합니다. 예를 들어 ISBLANK 함수는 값 인수가 빈 셀에 대한 참조이면 논리값 TRUE를 반환하고, 그렇지 않으면 FALSE를 반환합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "필수. 테스트할 값입니다. value 인수는 빈 셀, 오류, 논리값, 텍스트, 숫자, 참조 값 또는 이러한 항목을 가리키는 이름일 수 있습니다."
		} }
	},
	ISURL: {
		description: "유효한 URL 값인지 확인합니다.",
		abstract: "유효한 URL 값인지 확인합니다.",
		links: [{
			title: "사용법",
			url: "https://support.google.com/docs/answer/3256501?hl=ko"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "유효한 URL인지 확인할 값입니다."
		} }
	},
	N: {
		description: "숫자로 변환된 값을 반환합니다",
		abstract: "숫자로 변환된 값을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/n-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "변환하려는 값입니다."
		} }
	},
	NA: {
		description: "오류 값 #N/A를 반환합니다",
		abstract: "오류 값 #N/A를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/na-function"
		}],
		functionParameter: {}
	},
	SHEET: {
		description: "참조된 시트의 시트 번호를 반환합니다",
		abstract: "참조된 시트의 시트 번호를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/sheet-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "시트 번호를 원하는 시트의 이름 또는 참조입니다. value가 생략되면 SHEET는 함수가 포함된 시트의 번호를 반환합니다."
		} }
	},
	SHEETS: {
		description: "통합 문서의 시트 수를 반환합니다",
		abstract: "통합 문서의 시트 수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/sheets-function"
		}],
		functionParameter: {}
	},
	TYPE: {
		description: "값의 데이터 형식을 나타내는 숫자를 반환합니다",
		abstract: "값의 데이터 형식을 나타내는 숫자를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/type-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "숫자, 텍스트, 논리값 등과 같은 모든 값이 될 수 있습니다."
		} }
	}
};

//#endregion
//#region src/locale/function-list/logical/ko-KR.ts
const locale$7 = {
	AND: {
		description: "모든 인수가 TRUE이면 TRUE를 반환합니다",
		abstract: "모든 인수가 TRUE이면 TRUE를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/and-function"
		}],
		functionParameter: {
			logical1: {
				name: "logical1",
				detail: "TRUE 또는 FALSE로 평가하려는 첫 번째 조건입니다."
			},
			logical2: {
				name: "logical2",
				detail: "TRUE 또는 FALSE로 평가하려는 추가 조건으로 최대 255개 조건입니다."
			}
		}
	},
	BYCOL: {
		description: "각 열에 LAMBDA를 적용하고 결과 배열을 반환합니다",
		abstract: "각 열에 LAMBDA를 적용하고 결과 배열을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/bycol-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "열로 구분할 배열입니다."
			},
			lambda: {
				name: "lambda",
				detail: "열을 단일 매개 변수로 취하고 하나의 결과를 계산하는 LAMBDA입니다."
			}
		}
	},
	BYROW: {
		description: "각 행에 LAMBDA를 적용하고 결과 배열을 반환합니다",
		abstract: "각 행에 LAMBDA를 적용하고 결과 배열을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/byrow-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "행으로 구분할 배열입니다."
			},
			lambda: {
				name: "lambda",
				detail: "행을 단일 매개 변수로 취하고 하나의 결과를 계산하는 LAMBDA입니다."
			}
		}
	},
	FALSE: {
		description: "논리값 FALSE를 반환합니다",
		abstract: "논리값 FALSE를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/false-function"
		}],
		functionParameter: {}
	},
	IF: {
		description: "조건을 테스트하고 True 또는 False에 대한 값을 반환합니다",
		abstract: "조건을 테스트하고 True 또는 False에 대한 값을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/if-function"
		}],
		functionParameter: {
			logicalTest: {
				name: "logical_test",
				detail: "평가하려는 조건입니다."
			},
			valueIfTrue: {
				name: "value_if_true",
				detail: "logical_test가 TRUE일 때 반환하려는 값입니다."
			},
			valueIfFalse: {
				name: "value_if_false",
				detail: "logical_test가 FALSE일 때 반환하려는 값입니다."
			}
		}
	},
	IFERROR: {
		description: "수식이 오류로 평가되면 사용자가 지정한 값을 반환하고, 그렇지 않으면 수식 결과를 반환합니다",
		abstract: "수식이 오류로 평가되면 사용자가 지정한 값을 반환하고, 그렇지 않으면 수식 결과를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/iferror-function"
		}],
		functionParameter: {
			value: {
				name: "value",
				detail: "오류를 확인할 인수입니다."
			},
			valueIfError: {
				name: "value_if_error",
				detail: "수식이 오류로 평가되면 반환할 값입니다."
			}
		}
	},
	IFNA: {
		description: "식이 #N/A로 확인되면 지정한 값을 반환하고, 그렇지 않으면 식의 결과를 반환합니다",
		abstract: "식이 #N/A로 확인되면 지정한 값을 반환하고, 그렇지 않으면 식의 결과를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/ifna-function"
		}],
		functionParameter: {
			value: {
				name: "value",
				detail: "#N/A 오류 값을 확인할 인수입니다."
			},
			valueIfNa: {
				name: "value_if_na",
				detail: "수식이 #N/A 오류 값으로 평가되면 반환할 값입니다."
			}
		}
	},
	IFS: {
		description: "하나 이상의 조건이 충족되는지 확인하고 첫 번째 TRUE 조건에 해당하는 값을 반환합니다",
		abstract: "하나 이상의 조건이 충족되는지 확인하고 첫 번째 TRUE 조건에 해당하는 값을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/ifs-function"
		}],
		functionParameter: {
			logicalTest1: {
				name: "logical_test1",
				detail: "TRUE 또는 FALSE로 평가되는 조건입니다."
			},
			valueIfTrue1: {
				name: "value_if_true1",
				detail: "logical_test1이 TRUE일 때 반환되는 결과입니다. 비어 있을 수 있습니다."
			},
			logicalTest2: {
				name: "logical_test2",
				detail: "TRUE 또는 FALSE로 평가되는 조건입니다."
			},
			valueIfTrue2: {
				name: "value_if_true2",
				detail: "logical_test2가 TRUE일 때 반환되는 결과입니다. 비어 있을 수 있습니다."
			}
		}
	},
	LAMBDA: {
		description: "사용자 정의 재사용 가능한 함수를 만들고 친숙한 이름으로 호출합니다",
		abstract: "사용자 정의 재사용 가능한 함수를 만들고 친숙한 이름으로 호출합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/lambda-function"
		}],
		functionParameter: {
			parameter: {
				name: "parameter",
				detail: "함수에 전달하려는 값입니다(예: 셀 참조, 하드 코딩된 값 또는 기타 수식)."
			},
			calculation: {
				name: "calculation",
				detail: "마지막 인수로 실행하고 함수의 결과를 반환하려는 수식입니다."
			}
		}
	},
	LET: {
		description: "함수는 LET 계산 결과에 이름을 할당합니다. 이를 통해 수식 안에 중간 계산, 값을 저장하거나 이름을 정의할 수 있습니다. 이러한 이름은 함수 범위 내에서만 적용됩니다 LET . 프로그래밍 LET 의 변수와 마찬가지로 은 Excel의 네이티브 수식 구문을 통해 수행됩니다.",
		abstract: "함수는 LET 계산 결과에 이름을 할당합니다. 이를 통해 수식 안에 중간 계산, 값을 저장하거나 이름을 정의할 수 있습니다. 이러한 이름은 함수 범위 내에서만 적용됩니다 LET . 프로그래밍 LET 의 변수와 마찬가지로 은 Excel의 네이티브 수식 구문을 통해 수행됩니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/let-function"
		}],
		functionParameter: {
			name1: {
				name: "name1",
				detail: "첫 번째 이름입니다. 유효한 Excel 이름으로 시작해야 합니다."
			},
			nameValue1: {
				name: "name_value1",
				detail: "이름 1에 할당된 값입니다."
			},
			calculationOrName2: {
				name: "calculation_or_name2",
				detail: "다음 중 하나입니다. LET 함수의 모든 이름을 사용하는 계산이며 LET 함수의 마지막 인수여야 합니다. 또는 두 번째 name_value에 할당할 두 번째 이름이며, 이름을 지정하면 name_value2와 calculation_or_name3가 필요합니다."
			},
			nameValue2: {
				name: "name_value2",
				detail: "calculation_or_name2에 할당된 값입니다."
			},
			calculationOrName3: {
				name: "calculation_or_name3",
				detail: "다음 중 하나입니다. LET 함수의 모든 이름을 사용하는 계산이며 LET 함수의 마지막 인수는 계산이어야 합니다. 또는 세 번째 name_value에 할당할 세 번째 이름이며, 이름을 지정하면 name_value3와 calculation_or_name4가 필요합니다."
			}
		}
	},
	MAKEARRAY: {
		description: "LAMBDA를 적용하여 지정된 행 및 열 크기의 계산된 배열을 반환합니다",
		abstract: "LAMBDA를 적용하여 지정된 행 및 열 크기의 계산된 배열을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/makearray-function"
		}],
		functionParameter: {
			number1: {
				name: "rows",
				detail: "배열의 행 수입니다. 0보다 커야 합니다."
			},
			number2: {
				name: "cols",
				detail: "배열의 열 수입니다. 0보다 커야 합니다."
			},
			value3: {
				name: "lambda",
				detail: "배열을 만들기 위해 호출되는 LAMBDA입니다. LAMBDA는 행 인덱스와 열 인덱스 두 매개 변수를 사용합니다."
			}
		}
	},
	MAP: {
		description: "배열의 각 값을 새 값에 매핑하여 형성된 배열을 반환합니다",
		abstract: "배열의 각 값을 새 값에 매핑하여 형성된 배열을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/map-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "매핑할 배열입니다."
			},
			array2: {
				name: "array2",
				detail: "매핑할 두 번째 배열입니다."
			},
			lambda: {
				name: "lambda",
				detail: "각 배열에서 하나의 값을 받아들이고 하나의 결과를 반환하는 LAMBDA입니다."
			}
		}
	},
	NOT: {
		description: "인수의 논리를 반대로 바꿉니다",
		abstract: "인수의 논리를 반대로 바꿉니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/not-function"
		}],
		functionParameter: { logical: {
			name: "logical",
			detail: "반대로 바꿀 조건 또는 값입니다."
		} }
	},
	OR: {
		description: "인수가 하나라도 TRUE이면 TRUE를 반환합니다",
		abstract: "인수가 하나라도 TRUE이면 TRUE를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/or-function"
		}],
		functionParameter: {
			logical1: {
				name: "logical1",
				detail: "TRUE 또는 FALSE로 평가하려는 첫 번째 조건입니다."
			},
			logical2: {
				name: "logical2",
				detail: "TRUE 또는 FALSE로 평가하려는 추가 조건으로 최대 255개 조건입니다."
			}
		}
	},
	REDUCE: {
		description: "각 값에 LAMBDA를 적용하여 배열을 누적 값으로 축소하고 누적기에서 총 값을 반환합니다",
		abstract: "각 값에 LAMBDA를 적용하여 배열을 누적 값으로 축소하고 누적기에서 총 값을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/reduce-function"
		}],
		functionParameter: {
			initialValue: {
				name: "initial_value",
				detail: "누산기의 시작 값을 설정합니다."
			},
			array: {
				name: "array",
				detail: "축소할 배열입니다."
			},
			lambda: {
				name: "lambda",
				detail: "배열의 각 요소에서 호출되는 LAMBDA입니다."
			}
		}
	},
	SCAN: {
		description: "각 값에 LAMBDA를 적용하여 배열을 검색하고 각 중간 값을 갖는 배열을 반환합니다",
		abstract: "각 값에 LAMBDA를 적용하여 배열을 검색하고 각 중간 값을 갖는 배열을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/scan-function"
		}],
		functionParameter: {
			initialValue: {
				name: "initial_value",
				detail: "누산기의 시작 값을 설정합니다."
			},
			array: {
				name: "array",
				detail: "검색할 배열입니다."
			},
			lambda: {
				name: "lambda",
				detail: "배열의 각 요소에서 호출되는 LAMBDA입니다."
			}
		}
	},
	SWITCH: {
		description: "값 목록에 대해 식을 평가하고 첫 번째로 일치하는 값에 해당하는 결과를 반환합니다",
		abstract: "값 목록에 대해 식을 평가하고 첫 번째로 일치하는 값에 해당하는 결과를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/switch-function"
		}],
		functionParameter: {
			expression: {
				name: "expression",
				detail: "값(예: 숫자, 날짜 또는 일부 텍스트)에 대해 평가되는 식입니다."
			},
			value1: {
				name: "value1",
				detail: "식과 비교될 값입니다."
			},
			result1: {
				name: "result1",
				detail: "해당 값이 식과 일치하면 반환되는 값입니다."
			},
			defaultOrValue2: {
				name: "default_or_value2",
				detail: "기본 - 생략 가능. 일치 항목이 없으면 반환할 값입니다."
			},
			result2: {
				name: "result2",
				detail: "기본 - 생략 가능. 해당 값이 식과 일치하면 반환되는 값입니다."
			}
		}
	},
	TRUE: {
		description: "논리값 TRUE를 반환합니다",
		abstract: "논리값 TRUE를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/true-function"
		}],
		functionParameter: {}
	},
	XOR: {
		description: "모든 인수의 논리적 배타적 OR을 반환합니다",
		abstract: "모든 인수의 논리적 배타적 OR을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/xor-function"
		}],
		functionParameter: {
			logical1: {
				name: "logical1",
				detail: "1에서 254개의 조건으로 TRUE 또는 FALSE를 테스트할 수 있습니다."
			},
			logical2: {
				name: "logical2",
				detail: "1에서 254개의 조건으로 TRUE 또는 FALSE를 테스트할 수 있습니다."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/lookup/ko-KR.ts
const locale$6 = {
	ADDRESS: {
		description: "지정된 행 및 열 번호가 주어진 워크시트에서 셀의 주소를 가져옵니다. 예를 들어 ADDRESS(2,3)은 $C$2를 반환합니다. 또 다른 예로 ADDRESS(77,300)은 $KN$77을 반환합니다. ROW 및 COLUMN 함수와 같은 다른 함수를 사용하여 ADDRESS 함수에 대한 행 및 열 번호 인수를 제공할 수 있습니다.",
		abstract: "워크시트의 단일 셀에 대한 참조를 텍스트로 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/address-function"
		}],
		functionParameter: {
			row_num: {
				name: "행 번호",
				detail: "셀 참조에 사용할 행 번호를 지정하는 숫자 값입니다."
			},
			column_num: {
				name: "열 번호",
				detail: "셀 참조에 사용할 열 번호를 지정하는 숫자 값입니다."
			},
			abs_num: {
				name: "참조 유형",
				detail: "반환할 참조 유형을 지정하는 숫자 값입니다."
			},
			a1: {
				name: "참조 스타일",
				detail: "A1 또는 R1C1 참조 스타일을 지정하는 논리값입니다. A1 스타일에서는 열에 알파벳 레이블이 지정되고 행에는 숫자 레이블이 지정됩니다. R1C1 참조 스타일에서는 열과 행 모두에 숫자 레이블이 지정됩니다. A1 인수가 TRUE이거나 생략되면 ADDRESS 함수는 A1 스타일 참조를 반환합니다. FALSE이면 ADDRESS 함수는 R1C1 스타일 참조를 반환합니다."
			},
			sheet_text: {
				name: "워크시트 이름",
				detail: "외부 참조로 사용할 워크시트의 이름을 지정하는 텍스트 값입니다. 예를 들어 수식 =ADDRESS(1,1,,,\"Sheet2\")는 Sheet2!$A$1을 반환합니다. sheet_text 인수가 생략되면 시트 이름이 사용되지 않으며 함수가 반환하는 주소는 현재 시트의 셀을 참조합니다."
			}
		}
	},
	AREAS: {
		description: "참조의 영역 수를 반환합니다",
		abstract: "참조의 영역 수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/areas-function"
		}],
		functionParameter: { reference: {
			name: "참조",
			detail: "셀 또는 셀 범위에 대한 참조이며 여러 영역을 참조할 수 있습니다."
		} }
	},
	CHOOSE: {
		description: "값 목록에서 값을 선택합니다.",
		abstract: "값 목록에서 값을 선택합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/choose-function"
		}],
		functionParameter: {
			indexNum: {
				name: "index_num",
				detail: "선택된 값 인수를 지정합니다. Index_num은 1에서 254 사이의 숫자이거나 1에서 254 사이의 숫자를 포함하는 셀에 대한 수식 또는 참조여야 합니다.\nindex_num이 1이면 CHOOSE는 value1을 반환합니다. 2이면 CHOOSE는 value2를 반환합니다. 이런 식으로 계속됩니다.\nindex_num이 1보다 작거나 목록의 마지막 값 번호보다 크면 CHOOSE는 #VALUE! 오류 값을 반환합니다.\nindex_num이 분수이면 사용되기 전에 가장 낮은 정수로 잘립니다."
			},
			value1: {
				name: "value1",
				detail: "CHOOSE는 index_num을 기반으로 값이나 수행할 작업을 선택합니다. 인수는 숫자, 셀 참조, 정의된 이름, 수식, 함수 또는 텍스트일 수 있습니다."
			},
			value2: {
				name: "value2",
				detail: "1에서 254개의 값 인수입니다."
			}
		}
	},
	CHOOSECOLS: {
		description: "배열에서 지정된 열을 반환합니다",
		abstract: "배열에서 지정된 열을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/choosecols-function"
		}],
		functionParameter: {
			array: {
				name: "배열",
				detail: "새 배열에 반환할 열을 포함하는 배열입니다."
			},
			colNum1: {
				name: "col_num1",
				detail: "반환할 첫 번째 열입니다."
			},
			colNum2: {
				name: "col_num2",
				detail: "반환할 추가 열입니다."
			}
		}
	},
	CHOOSEROWS: {
		description: "배열에서 지정된 행을 반환합니다",
		abstract: "배열에서 지정된 행을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/chooserows-function"
		}],
		functionParameter: {
			array: {
				name: "배열",
				detail: "새 배열에 반환할 행을 포함하는 배열입니다."
			},
			rowNum1: {
				name: "row_num1",
				detail: "반환할 첫 번째 행 번호입니다."
			},
			rowNum2: {
				name: "row_num2",
				detail: "반환할 추가 행 번호입니다."
			}
		}
	},
	COLUMN: {
		description: "지정된 셀 참조의 열 번호를 반환합니다.",
		abstract: "참조의 열 번호를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/column-function"
		}],
		functionParameter: { reference: {
			name: "참조",
			detail: "열 번호를 반환하려는 셀 또는 셀 범위입니다."
		} }
	},
	COLUMNS: {
		description: "배열 또는 참조의 열 수를 반환합니다.",
		abstract: "참조의 열 수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/columns-function"
		}],
		functionParameter: { array: {
			name: "배열",
			detail: "열 수를 구하려는 배열, 배열 수식 또는 셀 범위에 대한 참조입니다."
		} }
	},
	DROP: {
		description: "배열의 시작 또는 끝에서 지정된 수의 행이나 열을 제외합니다",
		abstract: "배열의 시작 또는 끝에서 지정된 수의 행이나 열을 제외합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/drop-function"
		}],
		functionParameter: {
			array: {
				name: "배열",
				detail: "행이나 열을 삭제할 배열입니다."
			},
			rows: {
				name: "행",
				detail: "삭제할 행 수입니다. 음수 값은 배열의 끝에서 삭제합니다."
			},
			columns: {
				name: "열",
				detail: "제외할 열 수입니다. 음수 값은 배열의 끝에서 삭제합니다."
			}
		}
	},
	EXPAND: {
		description: "배열을 지정된 행 및 열 차원으로 확장하거나 채웁니다",
		abstract: "배열을 지정된 행 및 열 차원으로 확장하거나 채웁니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/expand-function"
		}],
		functionParameter: {
			array: {
				name: "배열",
				detail: "확장할 배열입니다."
			},
			rows: {
				name: "행",
				detail: "확장된 배열의 행 수입니다. 누락된 경우 행은 확장되지 않습니다."
			},
			columns: {
				name: "열",
				detail: "확장된 배열의 열 수입니다. 누락된 경우 열은 확장되지 않습니다."
			},
			padWith: {
				name: "pad_with",
				detail: "채울 값입니다. 기본값은 #N/A입니다."
			}
		}
	},
	FILTER: {
		description: "정의한 기준에 따라 데이터 범위를 필터링합니다",
		abstract: "정의한 기준에 따라 데이터 범위를 필터링합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/filter-function"
		}],
		functionParameter: {
			array: {
				name: "배열",
				detail: "필터링할 범위 또는 배열입니다."
			},
			include: {
				name: "포함",
				detail: "TRUE가 행이나 열을 유지함을 나타내는 부울 값의 배열입니다."
			},
			ifEmpty: {
				name: "if_empty",
				detail: "유지된 항목이 없으면 반환합니다."
			}
		}
	},
	FORMULATEXT: {
		description: "지정된 참조의 수식을 텍스트로 반환합니다",
		abstract: "지정된 참조의 수식을 텍스트로 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/formulatext-function"
		}],
		functionParameter: { reference: {
			name: "참조",
			detail: "셀 또는 셀 범위에 대한 참조입니다."
		} }
	},
	GETPIVOTDATA: {
		description: "피벗 테이블 보고서에 저장된 데이터를 반환합니다",
		abstract: "피벗 테이블 보고서에 저장된 데이터를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/getpivotdata-function"
		}],
		functionParameter: {
			dataField: {
				name: "데이터 필드",
				detail: "검색할 데이터가 들어 있는 데이터 필드의 이름입니다."
			},
			pivotTable: {
				name: "피벗 테이블",
				detail: "피벗 테이블의 셀, 범위 또는 이름이 지정된 범위에 대한 참조입니다."
			},
			field1: {
				name: "필드 1",
				detail: "선택 사항입니다. 데이터를 설명하는 첫 번째 필드 이름입니다."
			},
			item1: {
				name: "항목 1",
				detail: "선택 사항입니다. 필드의 첫 번째 항목 이름입니다."
			}
		}
	},
	HLOOKUP: {
		description: "표의 첫 행 또는 값의 배열에서 값을 검색한 다음 표나 배열에 지정한 행에서 동일한 열의 값을 반환합니다. 비교값이 데이터 표의 위쪽에 있을 때 지정한 행 수를 위에서 아래로 조사하려면 HLOOKUP을 사용합니다. 비교값이 찾으려는 데이터의 왼쪽 열에 있으면 VLOOKUP을 사용합니다.",
		abstract: "표의 첫 행 또는 값의 배열에서 값을 검색한 다음 표나 배열에 지정한 행에서 동일한 열의 값을 반환합니다. 비교값이 데이터 표의 위쪽에 있을 때 지정한 행 수를 위에서 아래로 조사하려면 HLOOKUP을 사용합니다. 비교값이 찾으려는 데이터의 왼쪽 열에 있으면 VLOOKUP을 사용합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/hlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "필수. 표의 첫 행에서 찾을 값입니다. lookup_value는 값, 참조 또는 텍스트 문자열일 수 있습니다."
			},
			tableArray: {
				name: "table_array",
				detail: "필수. 데이터를 찾을 정보 표입니다. 범위에 대한 참조나 범위 이름을 사용합니다. table_array의 첫째 행의 값은 텍스트, 숫자 또는 논리값이 될 수 있습니다. range_lookup이 TRUE면 table_array의 첫째 행 값은 반드시 오름차순( ...-2, -1, 0, 1, 2,... , A-Z, FALSE, TRUE)으로 정렬되어 있어야 하고, 그렇지 않으면 HLOOKUP에서는 정확한 값을 찾을 수 없습니다. range_lookup이 FALSE면 table_array가 정렬되지 않아도 무방합니다. 대/소문자는 구분하지 않습니다. 값을 오름차순으로 왼쪽에서 오른쪽으로 정렬합니다. 자세한 내용은 범위 또는 표의 데이터 정렬 을 참조하세요."
			},
			rowIndexNum: {
				name: "row_index_num",
				detail: "필수. 반환하려는 값이 있는 table_array의 행 번호입니다. row_index_num이 1이면 table_array의 첫 번째 행 값을, 2이면 두 번째 행 값을 반환합니다. row_index_num이 1보다 작으면 HLOOKUP에서는 #VALUE! 오류 값이 반환되고, row_index_num이 table_array의 행 수보다 크면 HLOOKUP에서는 #REF! 오류 값이 반환됩니다."
			},
			rangeLookup: {
				name: "range_lookup",
				detail: "선택적. HLOOKUP이 정확히 일치하는지 또는 대략적인 일치 항목을 찾을지 여부를 지정하는 논리 값입니다. TRUE 또는 생략하면 대략적인 일치 항목이 반환됩니다. 즉, 정확한 일치 항목을 찾을 수 없으면 lookup_value 미만인 다음으로 큰 값이 반환됩니다. FALSE이면 HLOOKUP에서 정확히 일치하는 항목을 찾습니다. 오류 값을 찾을 수 없으면 #N/A 오류 값이 반환됩니다."
			}
		}
	},
	HSTACK: {
		description: "배열을 가로 및 순서대로 추가하여 더 큰 배열을 반환합니다.",
		abstract: "배열을 가로 및 순서대로 추가하여 더 큰 배열을 반환합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/hstack-function"
		}],
		functionParameter: {
			array1: {
				name: "배열",
				detail: "각 배열 인수의 최대 행 수입니다."
			},
			array2: {
				name: "배열",
				detail: "각 배열 인수의 모든 열의 결합된 개수입니다."
			}
		}
	},
	HYPERLINK: {
		description: "셀 안에 하이퍼링크를 만듭니다.",
		abstract: "셀 안에 하이퍼링크를 만듭니다.",
		links: [{
			title: "사용법",
			url: "https://support.google.com/docs/answer/3093313?hl=ko"
		}],
		functionParameter: {
			url: {
				name: "url",
				detail: "링크 위치의 전체 URL(따옴표 안에 표시)이나 이러한 URL을 포함하는 셀 참조입니다. 특정 링크 유형만 허용됩니다. http:// , https:// , mailto: , aim: , ftp:// , gopher:// , telnet:// , news:// 는 허용되지만 다른 링크는 명시적으로 금지됩니다. 다른 프로토콜이 지정된 경우 link_label 이 셀에 표시되지만 하이퍼링크되지는 않습니다. 프로토콜을 지정하지 않으면 http:// 가 사용되며 url 앞에 붙습니다."
			},
			linkLabel: {
				name: "link_label",
				detail: "[ 선택사항 - 기본값은 url ] - 셀에 링크로 표시할 텍스트입니다. 따옴표로 묶거나 이러한 라벨이 포함된 셀을 참조합니다. link_label 이 빈 셀에 대한 참조인 경우 url 이 유효하면 링크로 표시되고, 그렇지 않으면 일반 텍스트로 표시됩니다. link_label 이 빈 문자열 리터럴 (\"\")인 경우 셀이 비어 있는 것으로 표시되지만 셀을 클릭하거나 셀로 이동하면 링크에 계속 액세스할 수 있습니다."
			}
		}
	},
	IMAGE: {
		description: "지정된 소스에서 이미지를 반환합니다",
		abstract: "지정된 소스에서 이미지를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/image-function"
		}],
		functionParameter: {
			source: {
				name: "source",
				detail: "이미지 파일의 \"https\" 프로토콜을 사용하는 URL 경로입니다. 필수."
			},
			altText: {
				name: "alt_text",
				detail: "접근성을 위해 이미지를 설명하는 대체 텍스트입니다."
			},
			sizing: {
				name: "sizing",
				detail: "이미지 차원을 지정합니다."
			},
			height: {
				name: "height",
				detail: "이미지의 사용자 지정 높이(픽셀)입니다."
			},
			width: {
				name: "width",
				detail: "이미지의 사용자 지정 너비(픽셀)입니다."
			}
		}
	},
	INDEX: {
		description: "특정 행과 열의 교차점에 있는 셀의 참조를 반환합니다. 참조가 인접하지 않은 선택 항목으로 구성된 경우 조회할 선택 항목을 선택할 수 있습니다.",
		abstract: "인덱스를 사용하여 참조 또는 배열에서 값을 선택합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/index-function"
		}],
		functionParameter: {
			reference: {
				name: "참조",
				detail: "하나 이상의 셀 범위에 대한 참조입니다."
			},
			rowNum: {
				name: "row_num",
				detail: "참조를 반환할 참조의 행 번호입니다."
			},
			columnNum: {
				name: "column_num",
				detail: "참조를 반환할 참조의 열 번호입니다."
			},
			areaNum: {
				name: "area_num",
				detail: "row_num과 column_num의 교차점을 반환할 참조의 범위를 선택합니다."
			}
		}
	},
	INDIRECT: {
		description: "텍스트 문자열로 지정된 참조를 반환합니다. 참조는 즉시 평가되어 내용을 표시합니다.",
		abstract: "텍스트 값으로 표시된 참조를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/indirect-function"
		}],
		functionParameter: {
			refText: {
				name: "ref_text",
				detail: "A1 스타일 참조, R1C1 스타일 참조, 참조로 정의된 이름 또는 텍스트 문자열로 셀에 대한 참조를 포함하는 셀에 대한 참조입니다."
			},
			a1: {
				name: "a1",
				detail: "ref_text 셀에 어떤 유형의 참조가 포함되어 있는지 지정하는 논리값입니다."
			}
		}
	},
	LOOKUP: {
		description: "단일 행이나 열에서 찾고 두 번째 행이나 열의 같은 위치에서 값을 찾아야 할 때 사용합니다",
		abstract: "벡터 또는 배열에서 값을 조회합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/lookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "LOOKUP이 첫 번째 벡터에서 검색하는 값입니다. Lookup_value는 숫자, 텍스트, 논리값 또는 값을 참조하는 이름이나 참조일 수 있습니다."
			},
			lookupVectorOrArray: {
				name: "lookup_vectorOrArray",
				detail: "하나의 행이나 하나의 열만 포함하는 범위입니다"
			},
			resultVector: {
				name: "result_vector",
				detail: "하나의 행이나 하나의 열만 포함하는 범위입니다. result_vector 인수는 lookup_vector와 같은 크기여야 합니다."
			}
		}
	},
	MATCH: {
		description: "MATCH 함수는 셀 범위에서 지정된 항목을 검색한 다음 범위에서 해당 항목의 상대 위치를 반환합니다.",
		abstract: "참조 또는 배열에서 값을 조회합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/match-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "lookup_array에서 일치시킬 값입니다."
			},
			lookupArray: {
				name: "lookup_array",
				detail: "검색하는 셀 범위입니다."
			},
			matchType: {
				name: "match_type",
				detail: "숫자 -1, 0 또는 1입니다."
			}
		}
	},
	OFFSET: {
		description: "지정된 참조에서 오프셋된 참조를 반환합니다",
		abstract: "지정된 참조에서 오프셋된 참조를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/offset-function"
		}],
		functionParameter: {
			reference: {
				name: "참조",
				detail: "오프셋의 기준이 되는 참조입니다."
			},
			rows: {
				name: "행",
				detail: "왼쪽 위 셀이 참조하도록 하려는 위 또는 아래 행 수입니다."
			},
			cols: {
				name: "열",
				detail: "결과의 왼쪽 위 셀이 참조하도록 하려는 왼쪽 또는 오른쪽 열 수입니다."
			},
			height: {
				name: "높이",
				detail: "반환된 참조가 되도록 하려는 행 수의 높이입니다. Height는 양수여야 합니다."
			},
			width: {
				name: "너비",
				detail: "반환된 참조가 되도록 하려는 열 수의 너비입니다. Width는 양수여야 합니다."
			}
		}
	},
	ROW: {
		description: "참조의 행 번호를 반환합니다",
		abstract: "참조의 행 번호를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/row-function"
		}],
		functionParameter: { reference: {
			name: "참조",
			detail: "행 번호를 구하려는 셀 또는 셀 범위입니다."
		} }
	},
	ROWS: {
		description: "배열 또는 참조의 행 수를 반환합니다.",
		abstract: "참조의 행 수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/rows-function"
		}],
		functionParameter: { array: {
			name: "배열",
			detail: "행 수를 구하려는 배열, 배열 수식 또는 셀 범위에 대한 참조입니다."
		} }
	},
	RTD: {
		description: "COM 자동화를 지원하는 프로그램에서 실시간 데이터를 검색합니다",
		abstract: "COM 자동화를 지원하는 프로그램에서 실시간 데이터를 검색합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/rtd-function"
		}],
		functionParameter: {
			progId: {
				name: "프로그램 ID",
				detail: "로컬에 설치된 COM 자동화 추가 기능의 프로그램 ID입니다."
			},
			server: {
				name: "서버",
				detail: "추가 기능을 실행할 서버 이름입니다. 로컬 서버는 빈 문자열을 사용합니다."
			},
			topic1: {
				name: "항목 1",
				detail: "검색할 실시간 데이터를 지정하는 첫 번째 텍스트입니다."
			},
			topic2: {
				name: "항목 2",
				detail: "선택 사항입니다. 실시간 데이터를 지정하는 추가 텍스트입니다."
			}
		}
	},
	SORT: {
		description: "범위 또는 배열의 내용을 정렬합니다",
		abstract: "범위 또는 배열의 내용을 정렬합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/sort-function"
		}],
		functionParameter: {
			array: {
				name: "배열",
				detail: "정렬할 범위 또는 배열입니다."
			},
			sortIndex: {
				name: "sort_index",
				detail: "정렬 순서(행별 또는 열별)를 나타내는 숫자입니다."
			},
			sortOrder: {
				name: "sort_order",
				detail: "원하는 정렬 순서를 나타내는 숫자입니다. 1은 오름차순(기본값), -1은 내림차순입니다."
			},
			byCol: {
				name: "by_col",
				detail: "원하는 정렬 방향을 나타내는 논리값입니다. FALSE는 행별로 정렬(기본값), TRUE는 열별로 정렬합니다."
			}
		}
	},
	SORTBY: {
		description: "해당 범위 또는 배열의 값을 기준으로 범위 또는 배열의 내용을 정렬합니다",
		abstract: "해당 범위 또는 배열의 값을 기준으로 범위 또는 배열의 내용을 정렬합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/sortby-function"
		}],
		functionParameter: {
			array: {
				name: "배열",
				detail: "정렬할 범위 또는 배열입니다."
			},
			byArray1: {
				name: "by_array1",
				detail: "정렬 기준이 되는 범위 또는 배열입니다."
			},
			sortOrder1: {
				name: "sort_order1",
				detail: "원하는 정렬 순서를 나타내는 숫자입니다. 1은 오름차순(기본값), -1은 내림차순입니다."
			},
			byArray2: {
				name: "by_array2",
				detail: "정렬 기준이 되는 범위 또는 배열입니다."
			},
			sortOrder2: {
				name: "sort_order2",
				detail: "원하는 정렬 순서를 나타내는 숫자입니다. 1은 오름차순(기본값), -1은 내림차순입니다."
			}
		}
	},
	TAKE: {
		description: "배열의 시작 또는 끝에서 지정된 수의 연속 행이나 열을 반환합니다",
		abstract: "배열의 시작 또는 끝에서 지정된 수의 연속 행이나 열을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/take-function"
		}],
		functionParameter: {
			array: {
				name: "배열",
				detail: "행이나 열을 가져올 배열입니다."
			},
			rows: {
				name: "행",
				detail: "가져올 행 수입니다. 음수 값은 배열의 끝에서 가져옵니다."
			},
			columns: {
				name: "열",
				detail: "가져올 열 수입니다. 음수 값은 배열의 끝에서 가져옵니다."
			}
		}
	},
	TOCOL: {
		description: "배열을 단일 열로 반환합니다",
		abstract: "배열을 단일 열로 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/tocol-function"
		}],
		functionParameter: {
			array: {
				name: "배열",
				detail: "열로 반환할 배열 또는 참조입니다."
			},
			ignore: {
				name: "무시",
				detail: "특정 유형의 값을 무시할지 여부입니다. 기본적으로 값은 무시되지 않습니다. 다음 중 하나를 지정합니다.\n0 모든 값 유지(기본값)\n1 공백 무시\n2 오류 무시\n3 공백 및 오류 무시"
			},
			scanByColumn: {
				name: "scan_by_column",
				detail: "열별로 배열을 스캔합니다. 기본적으로 배열은 행별로 스캔됩니다. 스캔은 값이 행별로 정렬되는지 열별로 정렬되는지를 결정합니다."
			}
		}
	},
	TOROW: {
		description: "배열을 단일 행으로 반환합니다",
		abstract: "배열을 단일 행으로 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/torow-function"
		}],
		functionParameter: {
			array: {
				name: "배열",
				detail: "행으로 반환할 배열 또는 참조입니다."
			},
			ignore: {
				name: "무시",
				detail: "특정 유형의 값을 무시할지 여부입니다. 기본적으로 값은 무시되지 않습니다. 다음 중 하나를 지정합니다.\n0 모든 값 유지(기본값)\n1 공백 무시\n2 오류 무시\n3 공백 및 오류 무시"
			},
			scanByColumn: {
				name: "scan_by_column",
				detail: "열별로 배열을 스캔합니다. 기본적으로 배열은 행별로 스캔됩니다. 스캔은 값이 행별로 정렬되는지 열별로 정렬되는지를 결정합니다."
			}
		}
	},
	TRANSPOSE: {
		description: "배열의 전치를 반환합니다",
		abstract: "배열의 전치를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/transpose-function"
		}],
		functionParameter: { array: {
			name: "배열",
			detail: "워크시트의 셀 범위 또는 배열입니다."
		} }
	},
	UNIQUE: {
		description: "목록이나 범위에서 고유한 값 목록을 반환합니다",
		abstract: "목록이나 범위에서 고유한 값 목록을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/unique-function"
		}],
		functionParameter: {
			array: {
				name: "배열",
				detail: "고유한 행이나 열이 반환되는 범위 또는 배열입니다."
			},
			byCol: {
				name: "by_col",
				detail: "논리값입니다. 행을 서로 비교하고 고유한 값을 반환 = FALSE 또는 생략됨, 열을 서로 비교하고 고유한 값을 반환 = TRUE입니다."
			},
			exactlyOnce: {
				name: "exactly_once",
				detail: "논리값입니다. 배열에서 한 번만 나타나는 행이나 열을 반환 = TRUE, 배열에서 모든 고유 행이나 열을 반환 = FALSE 또는 생략됨입니다."
			}
		}
	},
	VLOOKUP: {
		description: "테이블이나 범위에서 행별로 항목을 찾아야 할 때 VLOOKUP을 사용합니다. 예를 들어 부품 번호로 자동차 부품의 가격을 조회하거나 직원 ID를 기반으로 직원 이름을 찾습니다.",
		abstract: "배열의 첫 번째 열에서 찾고 행을 가로질러 이동하여 셀의 값을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/vlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "조회하려는 값입니다. 조회하려는 값은 table_array 인수에서 지정한 셀 범위의 첫 번째 열에 있어야 합니다."
			},
			tableArray: {
				name: "table_array",
				detail: "VLOOKUP이 lookup_value와 반환 값을 검색할 셀 범위입니다. 명명된 범위나 테이블을 사용할 수 있으며 셀 참조 대신 인수에 이름을 사용할 수 있습니다."
			},
			colIndexNum: {
				name: "col_index_num",
				detail: "반환 값을 포함하는 열 번호(table_array의 가장 왼쪽 열부터 1로 시작)입니다."
			},
			rangeLookup: {
				name: "range_lookup",
				detail: "VLOOKUP이 대략적인 일치 항목을 찾을지 정확한 일치 항목을 찾을지를 지정하는 논리값입니다. 대략적인 일치 - 1/TRUE, 정확한 일치 - 0/FALSE"
			}
		}
	},
	VSTACK: {
		description: "배열을 세로로 순서대로 추가하여 더 큰 배열을 반환합니다",
		abstract: "배열을 세로로 순서대로 추가하여 더 큰 배열을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/vstack-function"
		}],
		functionParameter: {
			array1: {
				name: "배열",
				detail: "추가할 배열입니다."
			},
			array2: {
				name: "배열",
				detail: "추가할 배열입니다."
			}
		}
	},
	WRAPCOLS: {
		description: "지정된 요소 수 이후에 제공된 값의 행이나 열을 열별로 래핑합니다",
		abstract: "지정된 요소 수 이후에 제공된 값의 행이나 열을 열별로 래핑합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/wrapcols-function"
		}],
		functionParameter: {
			vector: {
				name: "벡터",
				detail: "래핑할 벡터 또는 참조입니다."
			},
			wrapCount: {
				name: "wrap_count",
				detail: "각 열의 최대 값 수입니다."
			},
			padWith: {
				name: "pad_with",
				detail: "채울 값입니다. 기본값은 #N/A입니다."
			}
		}
	},
	WRAPROWS: {
		description: "지정된 요소 수 이후에 제공된 값의 행이나 열을 행별로 래핑합니다",
		abstract: "지정된 요소 수 이후에 제공된 값의 행이나 열을 행별로 래핑합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/wraprows-function"
		}],
		functionParameter: {
			vector: {
				name: "벡터",
				detail: "래핑할 벡터 또는 참조입니다."
			},
			wrapCount: {
				name: "wrap_count",
				detail: "각 행의 최대 값 수입니다."
			},
			padWith: {
				name: "pad_with",
				detail: "채울 값입니다. 기본값은 #N/A입니다."
			}
		}
	},
	XLOOKUP: {
		description: "범위나 배열을 검색하고 찾은 첫 번째 일치 항목에 해당하는 항목을 반환합니다. 일치 항목이 없으면 XLOOKUP은 가장 가까운(대략적인) 일치 항목을 반환할 수 있습니다.",
		abstract: "범위나 배열을 검색하고 찾은 첫 번째 일치 항목에 해당하는 항목을 반환합니다. 일치 항목이 없으면 XLOOKUP은 가장 가까운(대략적인) 일치 항목을 반환할 수 있습니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/xlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "검색할 값입니다. 생략하면 XLOOKUP은 lookup_array에서 찾은 빈 셀을 반환합니다."
			},
			lookupArray: {
				name: "lookup_array",
				detail: "검색할 배열 또는 범위입니다"
			},
			returnArray: {
				name: "return_array",
				detail: "반환할 배열 또는 범위입니다"
			},
			ifNotFound: {
				name: "if_not_found",
				detail: "유효한 일치 항목을 찾을 수 없는 경우 제공한 [if_not_found] 텍스트를 반환합니다. 유효한 일치 항목을 찾을 수 없고 [if_not_found]가 누락된 경우 #N/A가 반환됩니다."
			},
			matchMode: {
				name: "match_mode",
				detail: "일치 유형을 지정합니다. 0 - 정확히 일치. 찾을 수 없으면 #N/A를 반환합니다. 이것이 기본값입니다. -1 - 정확히 일치. 찾을 수 없으면 다음으로 작은 항목을 반환합니다. 1 - 정확히 일치. 찾을 수 없으면 다음으로 큰 항목을 반환합니다. 2 - *, ? 및 ~가 특별한 의미를 갖는 와일드카드 일치입니다."
			},
			searchMode: {
				name: "search_mode",
				detail: "사용할 검색 모드를 지정합니다. 1 - 첫 번째 항목부터 검색을 수행합니다. 이것이 기본값입니다. -1 - 마지막 항목부터 역방향 검색을 수행합니다. 2 - lookup_array가 오름차순으로 정렬되어 있다고 가정하는 이진 검색을 수행합니다. 정렬되지 않은 경우 잘못된 결과가 반환됩니다. -2 - lookup_array가 내림차순으로 정렬되어 있다고 가정하는 이진 검색을 수행합니다. 정렬되지 않은 경우 잘못된 결과가 반환됩니다."
			}
		}
	},
	XMATCH: {
		description: "배열이나 셀 범위에서 지정된 항목을 검색한 다음 항목의 상대 위치를 반환합니다.",
		abstract: "배열이나 셀 범위에서 항목의 상대 위치를 반환합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/xmatch-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "조회 값입니다"
			},
			lookupArray: {
				name: "lookup_array",
				detail: "검색할 배열 또는 범위입니다"
			},
			matchMode: {
				name: "match_mode",
				detail: "일치 유형을 지정합니다.\n0 - 정확히 일치(기본값)\n-1 - 정확히 일치 또는 다음으로 작은 항목\n1 - 정확히 일치 또는 다음으로 큰 항목\n2 - *, ? 및 ~가 특별한 의미를 갖는 와일드카드 일치"
			},
			searchMode: {
				name: "search_mode",
				detail: "검색 유형을 지정합니다.\n1 - 처음부터 끝까지 검색(기본값)\n-1 - 끝에서 처음으로 검색(역방향 검색)\n2 - lookup_array가 오름차순으로 정렬되어 있다고 가정하는 이진 검색을 수행합니다. 정렬되지 않은 경우 잘못된 결과가 반환됩니다.\n-2 - lookup_array가 내림차순으로 정렬되어 있다고 가정하는 이진 검색을 수행합니다. 정렬되지 않은 경우 잘못된 결과가 반환됩니다."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/math/ko-KR.ts
const locale$5 = {
	ABS: {
		description: "숫자의 절대값을 반환합니다. 숫자의 절대값은 부호가 없는 숫자입니다.",
		abstract: "숫자의 절대값을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/abs-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "절대값을 구하려는 실수입니다."
		} }
	},
	ACOS: {
		description: "숫자의 아크코사인 또는 역코사인을 반환합니다. 아크코사인은 코사인이 number인 각도입니다. 반환된 각도는 0(영)에서 pi 사이의 범위에서 라디안으로 지정됩니다.",
		abstract: "숫자의 아크코사인을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/acos-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "원하는 각도의 코사인이며 -1에서 1 사이여야 합니다."
		} }
	},
	ACOSH: {
		description: "숫자의 역쌍곡코사인을 반환합니다. 숫자는 1보다 크거나 같아야 합니다. 역쌍곡코사인은 쌍곡코사인이 number인 값이므로 ACOSH(COSH(number))는 number와 같습니다.",
		abstract: "숫자의 역쌍곡코사인을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/acosh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "1보다 크거나 같은 실수입니다."
		} }
	},
	ACOT: {
		description: "숫자의 아크코탄젠트 또는 역코탄젠트의 주요 값을 반환합니다.",
		abstract: "숫자의 아크코탄젠트를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/acot-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Number는 원하는 각도의 코탄젠트입니다. 이는 실수여야 합니다."
		} }
	},
	ACOTH: {
		description: "숫자의 쌍곡아크코탄젠트를 반환합니다",
		abstract: "숫자의 쌍곡아크코탄젠트를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/acoth-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Number의 절대값은 1보다 커야 합니다."
		} }
	},
	AGGREGATE: {
		description: "목록 또는 데이터베이스에서 집계를 반환합니다",
		abstract: "목록 또는 데이터베이스에서 집계를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/aggregate-function"
		}],
		functionParameter: {
			functionNum: {
				name: "function_num",
				detail: "사용할 함수를 지정하는 1에서 19 사이의 숫자입니다."
			},
			options: {
				name: "options",
				detail: "함수의 계산 범위에서 무시할 값을 결정하는 숫자 값입니다."
			},
			ref1: {
				name: "ref1",
				detail: "집계 값을 구할 인수가 여러 개인 함수의 첫 번째 인수입니다."
			},
			ref2: {
				name: "ref2",
				detail: "집계 값을 구할 인수로, 2개에서 252개까지 사용할 수 있습니다."
			}
		}
	},
	ARABIC: {
		description: "로마 숫자를 아라비아 숫자로 변환합니다",
		abstract: "로마 숫자를 아라비아 숫자로 변환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/arabic-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "따옴표로 묶인 문자열, 빈 문자열(\"\") 또는 텍스트가 포함된 셀에 대한 참조입니다."
		} }
	},
	ASIN: {
		description: "숫자의 아크사인을 반환합니다.",
		abstract: "숫자의 아크사인을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/asin-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "원하는 각도의 사인이며 -1에서 1 사이여야 합니다."
		} }
	},
	ASINH: {
		description: "숫자의 역쌍곡사인을 반환합니다.",
		abstract: "숫자의 역쌍곡사인을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/asinh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "실수입니다."
		} }
	},
	ATAN: {
		description: "숫자의 아크탄젠트를 반환합니다.",
		abstract: "숫자의 아크탄젠트를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/atan-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "원하는 각도의 탄젠트입니다."
		} }
	},
	ATAN2: {
		description: "x 및 y 좌표에서 아크탄젠트를 반환합니다.",
		abstract: "x 및 y 좌표에서 아크탄젠트를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/atan2-function"
		}],
		functionParameter: {
			xNum: {
				name: "x_num",
				detail: "점의 x 좌표입니다."
			},
			yNum: {
				name: "y_num",
				detail: "점의 y 좌표입니다."
			}
		}
	},
	ATANH: {
		description: "역 하이퍼볼릭 탄젠트 값을 반환합니다. number는 -1과 1 사이의 값이어야 합니다(-1과 1은 제외). 역 하이퍼볼릭 탄젠트 값은 하이퍼볼릭 탄젠트 값이 number 인 값이므로 ATANH(TANH(number))는 number 와 같습니다.",
		abstract: "역 하이퍼볼릭 탄젠트 값을 반환합니다. number는 -1과 1 사이의 값이어야 합니다(-1과 1은 제외). 역 하이퍼볼릭 탄젠트 값은 하이퍼볼릭 탄젠트 값이 number 인 값이므로 ATANH(TANH(number))는 number 와 같습니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/atanh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "필수 요소입니다. 1과 -1 사이의 실수입니다."
		} }
	},
	BASE: {
		description: "숫자를 지정된 기수(밑)의 텍스트 표현으로 변환합니다",
		abstract: "숫자를 지정된 기수(밑)의 텍스트 표현으로 변환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/base-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "변환하려는 숫자입니다. 0보다 크거나 같고 2^53보다 작은 정수여야 합니다."
			},
			radix: {
				name: "radix",
				detail: "숫자를 변환하려는 기수입니다. 2보다 크거나 같고 36보다 작거나 같은 정수여야 합니다."
			},
			minLength: {
				name: "min_length",
				detail: "반환된 문자열의 최소 길이입니다. 0보다 크거나 같은 정수여야 합니다."
			}
		}
	},
	CEILING: {
		description: "숫자를 가장 가까운 정수 또는 가장 가까운 significance의 배수로 반올림합니다",
		abstract: "숫자를 가장 가까운 정수 또는 가장 가까운 significance의 배수로 반올림합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/ceiling-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "반올림하려는 값입니다."
			},
			significance: {
				name: "significance",
				detail: "반올림하려는 배수입니다."
			}
		}
	},
	CEILING_MATH: {
		description: "숫자를 위로 반올림하여 가장 가까운 정수 또는 가장 가까운 significance의 배수로 만듭니다",
		abstract: "숫자를 위로 반올림하여 가장 가까운 정수 또는 가장 가까운 significance의 배수로 만듭니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/ceiling-math-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "반올림하려는 값입니다."
			},
			significance: {
				name: "significance",
				detail: "반올림하려는 배수입니다."
			},
			mode: {
				name: "mode",
				detail: "음수의 경우 Number가 0을 향해 반올림되는지 또는 0에서 멀어지도록 반올림되는지를 제어합니다."
			}
		}
	},
	CEILING_PRECISE: {
		description: "숫자를 가장 가까운 정수 또는 가장 가까운 significance의 배수로 반올림합니다. 숫자의 부호에 관계없이 숫자는 반올림됩니다.",
		abstract: "숫자를 가장 가까운 정수 또는 가장 가까운 significance의 배수로 반올림합니다. 숫자의 부호에 관계없이 숫자는 반올림됩니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/ceiling-precise-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "반올림하려는 값입니다."
			},
			significance: {
				name: "significance",
				detail: "반올림하려는 배수입니다."
			}
		}
	},
	COMBIN: {
		description: "지정된 개체 수에 대한 조합의 수를 반환합니다",
		abstract: "지정된 개체 수에 대한 조합의 수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/combin-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "항목의 수입니다."
			},
			numberChosen: {
				name: "number_chosen",
				detail: "각 조합의 항목 수입니다."
			}
		}
	},
	COMBINA: {
		description: "지정된 항목 수에 대한 반복 조합의 수를 반환합니다",
		abstract: "지정된 항목 수에 대한 반복 조합의 수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/combina-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "항목의 수입니다."
			},
			numberChosen: {
				name: "number_chosen",
				detail: "각 조합의 항목 수입니다."
			}
		}
	},
	COS: {
		description: "숫자의 코사인을 반환합니다.",
		abstract: "숫자의 코사인을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/cos-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "코사인을 원하는 각도(라디안)입니다."
		} }
	},
	COSH: {
		description: "숫자의 쌍곡코사인을 반환합니다",
		abstract: "숫자의 쌍곡코사인을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/cosh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "쌍곡코사인을 찾으려는 실수입니다."
		} }
	},
	COT: {
		description: "각도의 코탄젠트를 반환합니다",
		abstract: "각도의 코탄젠트를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/cot-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "코탄젠트를 원하는 각도(라디안)입니다."
		} }
	},
	COTH: {
		description: "숫자의 쌍곡코탄젠트를 반환합니다",
		abstract: "숫자의 쌍곡코탄젠트를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/coth-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "쌍곡코탄젠트를 찾으려는 실수입니다."
		} }
	},
	CSC: {
		description: "각도의 코시컨트를 반환합니다",
		abstract: "각도의 코시컨트를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/csc-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "코시컨트를 원하는 각도(라디안)입니다."
		} }
	},
	CSCH: {
		description: "각도의 쌍곡코시컨트를 반환합니다",
		abstract: "각도의 쌍곡코시컨트를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/csch-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "쌍곡코시컨트를 원하는 각도(라디안)입니다."
		} }
	},
	DECIMAL: {
		description: "지정된 밑의 숫자의 텍스트 표현을 십진수로 변환합니다",
		abstract: "지정된 밑의 숫자의 텍스트 표현을 십진수로 변환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/decimal-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Text의 문자열 길이는 255자 이하여야 합니다."
			},
			radix: {
				name: "radix",
				detail: "숫자를 변환하려는 기수입니다. 2보다 크거나 같고 36보다 작거나 같은 정수여야 합니다."
			}
		}
	},
	DEGREES: {
		description: "라디안을 도로 변환합니다",
		abstract: "라디안을 도로 변환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/degrees-function"
		}],
		functionParameter: { angle: {
			name: "angle",
			detail: "변환하려는 각도(라디안)입니다."
		} }
	},
	EVEN: {
		description: "숫자를 위로 반올림하여 가장 가까운 짝수 정수로 만듭니다",
		abstract: "숫자를 위로 반올림하여 가장 가까운 짝수 정수로 만듭니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/even-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "반올림할 값입니다."
		} }
	},
	EXP: {
		description: "주어진 숫자의 거듭제곱으로 거듭제곱한 e를 반환합니다",
		abstract: "주어진 숫자의 거듭제곱으로 거듭제곱한 e를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/exp-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "밑 e에 적용되는 지수입니다."
		} }
	},
	FACT: {
		description: "숫자의 계승을 반환합니다",
		abstract: "숫자의 계승을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/fact-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "계승을 원하는 음이 아닌 숫자입니다. 숫자가 정수가 아닌 경우 잘립니다."
		} }
	},
	FACTDOUBLE: {
		description: "숫자의 이중 계승을 반환합니다",
		abstract: "숫자의 이중 계승을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/factdouble-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "이중 계승을 원하는 음이 아닌 숫자입니다. 숫자가 정수가 아닌 경우 잘립니다."
		} }
	},
	FLOOR: {
		description: "숫자를 0 방향으로 내림하여 반올림합니다",
		abstract: "숫자를 0 방향으로 내림하여 반올림합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/floor-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "반올림하려는 값입니다."
			},
			significance: {
				name: "significance",
				detail: "반올림하려는 배수입니다."
			}
		}
	},
	FLOOR_MATH: {
		description: "숫자를 아래로 반올림하여 가장 가까운 정수 또는 가장 가까운 significance의 배수로 만듭니다",
		abstract: "숫자를 아래로 반올림하여 가장 가까운 정수 또는 가장 가까운 significance의 배수로 만듭니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/floor-math-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "반올림하려는 값입니다."
			},
			significance: {
				name: "significance",
				detail: "반올림하려는 배수입니다."
			},
			mode: {
				name: "mode",
				detail: "음수의 경우 Number가 0을 향해 반올림되는지 또는 0에서 멀어지도록 반올림되는지를 제어합니다."
			}
		}
	},
	FLOOR_PRECISE: {
		description: "숫자를 가장 가까운 정수 또는 가장 가까운 significance의 배수로 내림합니다. 숫자의 부호에 관계없이 숫자는 내림됩니다.",
		abstract: "숫자를 가장 가까운 정수 또는 가장 가까운 significance의 배수로 내림합니다.",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/floor-precise-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "반올림하려는 값입니다."
			},
			significance: {
				name: "significance",
				detail: "반올림하려는 배수입니다."
			}
		}
	},
	GCD: {
		description: "최대공약수를 반환합니다",
		abstract: "최대공약수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/gcd-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "최대공약수를 찾으려는 첫 번째 숫자로, 쉼표로 구분된 매개 변수 대신 단일 배열 또는 배열에 대한 참조를 사용할 수도 있습니다."
			},
			number2: {
				name: "number2",
				detail: "최대공약수를 찾으려는 두 번째 숫자입니다. 이런 방식으로 최대 255개의 숫자를 지정할 수 있습니다."
			}
		}
	},
	INT: {
		description: "숫자를 가장 가까운 정수로 내림합니다",
		abstract: "숫자를 가장 가까운 정수로 내림합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/int-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "정수로 내림할 실수입니다."
		} }
	},
	ISO_CEILING: {
		description: "가장 가까운 정수 또는 가장 가까운 significance의 배수로 반올림된 숫자를 반환합니다",
		abstract: "가장 가까운 정수 또는 가장 가까운 significance의 배수로 반올림된 숫자를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/iso-ceiling-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "반올림하려는 값입니다."
			},
			significance: {
				name: "significance",
				detail: "반올림하려는 배수입니다."
			}
		}
	},
	LCM: {
		description: "최소공배수를 반환합니다",
		abstract: "최소공배수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/lcm-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "최소공배수를 찾으려는 첫 번째 숫자로, 쉼표로 구분된 매개 변수 대신 단일 배열 또는 배열에 대한 참조를 사용할 수도 있습니다."
			},
			number2: {
				name: "number2",
				detail: "최소공배수를 찾으려는 두 번째 숫자입니다. 이런 방식으로 최대 255개의 숫자를 지정할 수 있습니다."
			}
		}
	},
	LN: {
		description: "숫자의 자연 로그를 반환합니다",
		abstract: "숫자의 자연 로그를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/ln-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "자연 로그를 원하는 양의 실수입니다."
		} }
	},
	LOG: {
		description: "지정된 밑에 대한 숫자의 로그를 반환합니다",
		abstract: "지정된 밑에 대한 숫자의 로그를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/log-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "로그를 원하는 양의 실수입니다."
			},
			base: {
				name: "base",
				detail: "로그의 밑입니다. base를 생략하면 10으로 간주합니다."
			}
		}
	},
	LOG10: {
		description: "숫자의 밑이 10인 로그를 반환합니다",
		abstract: "숫자의 밑이 10인 로그를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/log10-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "밑이 10인 로그를 원하는 양의 실수입니다."
		} }
	},
	MDETERM: {
		description: "배열의 행렬 행렬식을 반환합니다",
		abstract: "배열의 행렬 행렬식을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/mdeterm-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "행과 열 수가 같은 숫자 배열입니다."
		} }
	},
	MINVERSE: {
		description: "배열의 역행렬을 반환합니다",
		abstract: "배열의 역행렬을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/minverse-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "행과 열 수가 같은 숫자 배열입니다."
		} }
	},
	MMULT: {
		description: "두 배열의 행렬 곱을 반환합니다",
		abstract: "두 배열의 행렬 곱을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/mmult-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "곱하려는 첫 번째 배열입니다."
			},
			array2: {
				name: "array2",
				detail: "곱하려는 두 번째 배열입니다."
			}
		}
	},
	MOD: {
		description: "나눗셈의 나머지를 반환합니다",
		abstract: "나눗셈의 나머지를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/mod-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "나머지를 찾으려는 숫자입니다."
			},
			divisor: {
				name: "divisor",
				detail: "number를 나누는 숫자입니다."
			}
		}
	},
	MROUND: {
		description: "원하는 배수로 반올림된 숫자를 반환합니다",
		abstract: "원하는 배수로 반올림된 숫자를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/mround-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "반올림할 값입니다."
			},
			multiple: {
				name: "multiple",
				detail: "반올림하려는 배수입니다."
			}
		}
	},
	MULTINOMIAL: {
		description: "값 집합의 다항계수를 반환합니다",
		abstract: "값 집합의 다항계수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/multinomial-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "계산에 사용할 첫 번째 값 또는 범위입니다."
			},
			number2: {
				name: "number2",
				detail: "계산에 사용할 추가 값 또는 범위입니다."
			}
		}
	},
	MUNIT: {
		description: "지정된 차원의 단위 행렬을 반환합니다",
		abstract: "지정된 차원의 단위 행렬을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/munit-function"
		}],
		functionParameter: { dimension: {
			name: "dimension",
			detail: "반환하려는 단위 행렬의 차원을 지정하는 정수입니다."
		} }
	},
	ODD: {
		description: "숫자를 가장 가까운 홀수 정수로 반올림합니다",
		abstract: "숫자를 가장 가까운 홀수 정수로 반올림합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/odd-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "반올림할 값입니다."
		} }
	},
	PI: {
		description: "pi 값을 반환합니다",
		abstract: "pi 값을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/pi-function"
		}],
		functionParameter: {}
	},
	POWER: {
		description: "거듭제곱한 숫자의 결과를 반환합니다",
		abstract: "거듭제곱한 숫자의 결과를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/power-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "밑 숫자입니다. 실수일 수 있습니다."
			},
			power: {
				name: "power",
				detail: "밑 숫자를 거듭제곱할 지수입니다."
			}
		}
	},
	PRODUCT: {
		description: "인수를 곱합니다",
		abstract: "인수를 곱합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/product-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "곱하려는 첫 번째 숫자 또는 범위입니다."
			},
			number2: {
				name: "number2",
				detail: "곱하려는 추가 숫자 또는 범위로 최대 255개까지 입니다."
			}
		}
	},
	QUOTIENT: {
		description: "나눗셈의 정수 부분을 반환합니다",
		abstract: "나눗셈의 정수 부분을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/quotient-function"
		}],
		functionParameter: {
			numerator: {
				name: "numerator",
				detail: "피제수입니다."
			},
			denominator: {
				name: "denominator",
				detail: "제수입니다."
			}
		}
	},
	RADIANS: {
		description: "도를 라디안으로 변환합니다",
		abstract: "도를 라디안으로 변환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/radians-function"
		}],
		functionParameter: { angle: {
			name: "angle",
			detail: "라디안으로 변환하려는 각도입니다."
		} }
	},
	RAND: {
		description: "0과 1 사이의 난수를 반환합니다",
		abstract: "0과 1 사이의 난수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/rand-function"
		}],
		functionParameter: {}
	},
	RANDARRAY: {
		description: "난수 배열을 반환합니다. 채울 행과 열의 수, 최소값과 최대값, 정수 또는 십진수 값 반환 여부를 지정할 수 있습니다.",
		abstract: "난수 배열을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/randarray-function"
		}],
		functionParameter: {
			rows: {
				name: "rows",
				detail: "반환할 행 수입니다."
			},
			columns: {
				name: "columns",
				detail: "반환할 열 수입니다."
			},
			min: {
				name: "min",
				detail: "반환할 최소 숫자입니다."
			},
			max: {
				name: "max",
				detail: "반환할 최대 숫자입니다."
			},
			wholeNumber: {
				name: "whole_number",
				detail: "정수 또는 십진수 값을 반환합니다. TRUE는 정수, FALSE는 십진수입니다."
			}
		}
	},
	RANDBETWEEN: {
		description: "지정한 숫자 사이의 난수를 반환합니다",
		abstract: "지정한 숫자 사이의 난수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/randbetween-function"
		}],
		functionParameter: {
			bottom: {
				name: "bottom",
				detail: "RANDBETWEEN이 반환할 가장 작은 정수입니다."
			},
			top: {
				name: "top",
				detail: "RANDBETWEEN이 반환할 가장 큰 정수입니다."
			}
		}
	},
	ROMAN: {
		description: "아라비아 숫자를 텍스트로 로마 숫자로 변환합니다",
		abstract: "아라비아 숫자를 텍스트로 로마 숫자로 변환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/roman-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "변환하려는 아라비아 숫자입니다."
			},
			form: {
				name: "form",
				detail: "로마 숫자의 유형을 지정하는 숫자입니다. 로마 숫자 스타일은 고전에서 간단한 순서로 I에서 IV까지 더 간결해집니다. 예제를 참조하세요."
			}
		}
	},
	ROUND: {
		description: "숫자를 지정된 자릿수로 반올림합니다",
		abstract: "숫자를 지정된 자릿수로 반올림합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/round-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "반올림하려는 숫자입니다."
			},
			numDigits: {
				name: "num_digits",
				detail: "반올림하려는 자릿수입니다."
			}
		}
	},
	ROUNDBANK: {
		description: "은행가 반올림 방식으로 숫자를 반올림합니다.",
		abstract: "은행가 반올림 방식으로 숫자를 반올림합니다.",
		links: [{
			title: "Instruction",
			url: ""
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "은행가 반올림 방식으로 반올림할 수입니다."
			},
			numDigits: {
				name: "num_digits",
				detail: "은행가 반올림 방식으로 반올림할 자릿수입니다."
			}
		}
	},
	ROUNDDOWN: {
		description: "숫자를 0 방향으로 내림합니다",
		abstract: "숫자를 0 방향으로 내림합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/rounddown-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "내림하려는 실수입니다."
			},
			numDigits: {
				name: "num_digits",
				detail: "숫자를 내림할 자릿수입니다."
			}
		}
	},
	ROUNDUP: {
		description: "숫자를 0에서 멀어지는 방향으로 올림합니다",
		abstract: "숫자를 0에서 멀어지는 방향으로 올림합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/roundup-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "올림하려는 실수입니다."
			},
			numDigits: {
				name: "num_digits",
				detail: "숫자를 올림할 자릿수입니다."
			}
		}
	},
	SEC: {
		description: "각도의 시컨트를 반환합니다",
		abstract: "각도의 시컨트를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/sec-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "시컨트를 원하는 각도(라디안)입니다."
		} }
	},
	SECH: {
		description: "각도의 쌍곡시컨트를 반환합니다",
		abstract: "각도의 쌍곡시컨트를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/sech-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "쌍곡시컨트를 원하는 각도(라디안)입니다."
		} }
	},
	SERIESSUM: {
		description: "수식을 기반으로 거듭제곱 급수의 합을 반환합니다",
		abstract: "수식을 기반으로 거듭제곱 급수의 합을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/seriessum-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "거듭제곱 급수의 입력 값입니다."
			},
			n: {
				name: "n",
				detail: "x를 거듭제곱할 초기 거듭제곱입니다."
			},
			m: {
				name: "m",
				detail: "급수의 각 항에서 n을 증가시킬 단계입니다."
			},
			coefficients: {
				name: "coefficients",
				detail: "x의 연속 거듭제곱에 곱할 계수 집합입니다."
			}
		}
	},
	SEQUENCE: {
		description: "1, 2, 3, 4와 같은 순차 숫자 목록을 배열로 생성합니다",
		abstract: "순차 숫자 목록을 배열로 생성합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/sequence-function"
		}],
		functionParameter: {
			rows: {
				name: "rows",
				detail: "반환할 행 수입니다."
			},
			columns: {
				name: "columns",
				detail: "반환할 열 수입니다."
			},
			start: {
				name: "start",
				detail: "순서의 첫 번째 숫자입니다."
			},
			step: {
				name: "step",
				detail: "배열의 각 순차 값 사이의 증분입니다."
			}
		}
	},
	SIGN: {
		description: "숫자의 부호를 반환합니다",
		abstract: "숫자의 부호를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/sign-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "부호를 결정하려는 실수입니다."
		} }
	},
	SIN: {
		description: "지정한 각도의 사인을 반환합니다",
		abstract: "지정한 각도의 사인을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/sin-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "사인을 원하는 각도(라디안)입니다."
		} }
	},
	SINH: {
		description: "숫자의 쌍곡사인을 반환합니다",
		abstract: "숫자의 쌍곡사인을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/sinh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "실수입니다."
		} }
	},
	SQRT: {
		description: "양의 제곱근을 반환합니다",
		abstract: "양의 제곱근을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/sqrt-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "제곱근을 원하는 숫자입니다."
		} }
	},
	SQRTPI: {
		description: "(number * pi)의 제곱근을 반환합니다",
		abstract: "(number * pi)의 제곱근을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/sqrtpi-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "pi를 곱할 숫자입니다."
		} }
	},
	SUBTOTAL: {
		description: "목록이나 데이터베이스에서 부분합을 반환합니다",
		abstract: "목록이나 데이터베이스에서 부분합을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/subtotal-function"
		}],
		functionParameter: {
			functionNum: {
				name: "function_num",
				detail: "부분합을 계산하는 데 사용할 함수를 지정하는 1에서 11 또는 101에서 111 사이의 숫자입니다."
			},
			ref1: {
				name: "ref1",
				detail: "부분합을 구하려는 첫 번째 명명된 범위 또는 참조입니다."
			},
			ref2: {
				name: "ref2",
				detail: "부분합을 구하려는 2에서 254개의 명명된 범위 또는 참조입니다."
			}
		}
	},
	SUM: {
		description: "인수를 더합니다",
		abstract: "인수를 더합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/sum-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "더하려는 첫 번째 숫자입니다. 숫자는 4와 같은 값, A6과 같은 셀 참조 또는 A2:A8과 같은 셀 범위일 수 있습니다."
			},
			number2: {
				name: "number2",
				detail: "더하려는 두 번째 숫자입니다. 이런 방식으로 최대 255개의 숫자를 지정할 수 있습니다."
			}
		}
	},
	SUMIF: {
		description: "지정한 조건에 의해 지정된 셀을 더합니다",
		abstract: "지정한 조건에 의해 지정된 셀을 더합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/sumif-function"
		}],
		functionParameter: {
			range: {
				name: "range",
				detail: "조건에 의해 평가하려는 셀 범위입니다."
			},
			criteria: {
				name: "criteria",
				detail: "어떤 셀을 더할지 정의하는 숫자, 식, 셀 참조, 텍스트 또는 함수 형식의 조건입니다."
			},
			sumRange: {
				name: "sum_range",
				detail: "더할 실제 셀입니다(범위에서 지정한 셀 이외의 셀을 더하려는 경우)입니다."
			}
		}
	},
	SUMIFS: {
		description: "범위에서 여러 조건을 충족하는 셀을 더합니다",
		abstract: "범위에서 여러 조건을 충족하는 셀을 더합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/sumifs-function"
		}],
		functionParameter: {
			sumRange: {
				name: "sum_range",
				detail: "더할 셀 범위입니다."
			},
			criteriaRange1: {
				name: "criteria_range1",
				detail: "criteria1을 사용하여 테스트되는 범위입니다."
			},
			criteria1: {
				name: "criteria1",
				detail: "criteria_range1에서 더할 셀을 정의하는 조건입니다."
			},
			criteriaRange2: {
				name: "criteria_range2",
				detail: "추가 범위입니다. 최대 127개의 범위 쌍을 입력할 수 있습니다."
			},
			criteria2: {
				name: "criteria2",
				detail: "추가 관련 조건입니다. 최대 127개의 조건 쌍을 입력할 수 있습니다."
			}
		}
	},
	SUMPRODUCT: {
		description: "해당 배열 구성 요소의 곱의 합을 반환합니다",
		abstract: "해당 배열 구성 요소의 곱의 합을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/sumproduct-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "구성 요소를 곱한 다음 더하려는 첫 번째 배열 인수입니다."
			},
			array2: {
				name: "array2",
				detail: "구성 요소를 곱한 다음 더하려는 2에서 255개의 배열 인수입니다."
			}
		}
	},
	SUMSQ: {
		description: "인수의 제곱의 합을 반환합니다",
		abstract: "인수의 제곱의 합을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/sumsq-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "제곱하고 더하려는 첫 번째 숫자입니다."
			},
			number2: {
				name: "number2",
				detail: "제곱하고 더하려는 2에서 255개의 숫자입니다."
			}
		}
	},
	SUMX2MY2: {
		description: "두 배열에서 해당 값의 제곱 차이의 합을 반환합니다",
		abstract: "두 배열에서 해당 값의 제곱 차이의 합을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/sumx2my2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "array_x",
				detail: "첫 번째 배열 또는 값 범위입니다."
			},
			arrayY: {
				name: "array_y",
				detail: "두 번째 배열 또는 값 범위입니다."
			}
		}
	},
	SUMX2PY2: {
		description: "두 배열에서 해당 값의 제곱 합의 합을 반환합니다",
		abstract: "두 배열에서 해당 값의 제곱 합의 합을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/sumx2py2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "array_x",
				detail: "첫 번째 배열 또는 값 범위입니다."
			},
			arrayY: {
				name: "array_y",
				detail: "두 번째 배열 또는 값 범위입니다."
			}
		}
	},
	SUMXMY2: {
		description: "두 배열에서 해당 값 차이의 제곱의 합을 반환합니다",
		abstract: "두 배열에서 해당 값 차이의 제곱의 합을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/sumxmy2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "array_x",
				detail: "첫 번째 배열 또는 값 범위입니다."
			},
			arrayY: {
				name: "array_y",
				detail: "두 번째 배열 또는 값 범위입니다."
			}
		}
	},
	TAN: {
		description: "숫자의 탄젠트를 반환합니다",
		abstract: "숫자의 탄젠트를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/tan-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "탄젠트를 원하는 각도(라디안)입니다."
		} }
	},
	TANH: {
		description: "숫자의 쌍곡탄젠트를 반환합니다",
		abstract: "숫자의 쌍곡탄젠트를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/tanh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "실수입니다."
		} }
	},
	TRUNC: {
		description: "숫자를 정수로 자릅니다",
		abstract: "숫자를 정수로 자릅니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/trunc-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "자르려는 숫자입니다."
			},
			numDigits: {
				name: "num_digits",
				detail: "소수점 이하 표시할 자릿수를 지정하는 숫자입니다. num_digits의 기본값은 0(영)입니다."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/statistical/ko-KR.ts
const locale$4 = {
	AVEDEV: {
		description: "데이터 요소와 평균의 절대 편차의 평균을 반환합니다",
		abstract: "데이터 요소와 평균의 절대 편차의 평균을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/avedev-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "절대 편차의 평균을 구하려는 첫 번째 인수입니다."
			},
			number2: {
				name: "number2",
				detail: "절대 편차의 평균을 구하려는 2에서 255개의 인수입니다."
			}
		}
	},
	AVERAGE: {
		description: "인수의 평균(산술 평균)을 반환합니다",
		abstract: "인수의 평균(산술 평균)을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/average-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "평균을 구하려는 첫 번째 숫자, 셀 참조 또는 범위입니다."
			},
			number2: {
				name: "number2",
				detail: "평균을 구하려는 추가 숫자, 셀 참조 또는 범위로 최대 255개입니다."
			}
		}
	},
	AVERAGE_WEIGHTED: {
		description: "AVERAGE.WEIGHTED 함수는 값과 각 값에 해당하는 가중치를 사용하여 값 집합의 가중 평균을 계산합니다.",
		abstract: "AVERAGE.WEIGHTED 함수는 값과 각 값에 해당하는 가중치를 사용하여 값 집합의 가중 평균을 계산합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9084098?hl=ko"
		}],
		functionParameter: {
			values: {
				name: "values",
				detail: "평균을 계산할 값입니다. 셀 범위를 참조하거나 값 자체를 포함할 수 있습니다."
			},
			weights: {
				name: "weights",
				detail: "적용할 가중치 목록입니다. 셀 범위를 참조하거나 가중치를 포함할 수 있습니다. 가중치는 0일 수는 있지만 음수일 수는 없습니다. 가중치 중 적어도 하나는 양수여야 합니다. 셀 범위를 사용하는 경우, 해당 범위 내 행과 열의 수는 값 범위 내 행과 열의 수와 동일해야 합니다."
			},
			additionalValues: {
				name: "additional_values",
				detail: "평균을 계산할 추가 값입니다. 추가 값은 선택사항입니다."
			},
			additionalWeights: {
				name: "additional_weights",
				detail: "적용할 추가 가중치입니다. 추가 가중치는 선택사항이지만 각 추가_값 뒤에는 한 개의 추가_가중치 가 있어야 합니다."
			}
		}
	},
	AVERAGEA: {
		description: "인수의 평균(산술 평균)을 반환합니다(숫자, 텍스트 및 논리값 포함)",
		abstract: "인수의 평균(산술 평균)을 반환합니다(숫자, 텍스트 및 논리값 포함)",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/averagea-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "평균을 구하려는 첫 번째 인수입니다."
			},
			value2: {
				name: "value2",
				detail: "평균을 구하려는 2에서 255개의 추가 인수입니다."
			}
		}
	},
	AVERAGEIF: {
		description: "범위에서 지정한 조건을 충족하는 모든 셀의 평균(산술 평균)을 반환합니다",
		abstract: "범위에서 지정한 조건을 충족하는 모든 셀의 평균을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/averageif-function"
		}],
		functionParameter: {
			range: {
				name: "range",
				detail: "평균을 구하려는 하나 이상의 셀(숫자 또는 이름, 배열 또는 숫자가 포함된 참조)입니다."
			},
			criteria: {
				name: "criteria",
				detail: "평균을 구할 셀을 정의하는 숫자, 식, 셀 참조 또는 텍스트 형식의 조건입니다."
			},
			averageRange: {
				name: "average_range",
				detail: "평균을 구할 실제 셀입니다. 생략하면 range가 사용됩니다."
			}
		}
	},
	AVERAGEIFS: {
		description: "여러 조건을 충족하는 모든 셀의 평균(산술 평균)을 반환합니다",
		abstract: "여러 조건을 충족하는 모든 셀의 평균을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/averageifs-function"
		}],
		functionParameter: {
			averageRange: {
				name: "average_range",
				detail: "평균을 구할 하나 이상의 셀(숫자 또는 이름, 배열 또는 숫자가 포함된 참조)입니다."
			},
			criteriaRange1: {
				name: "criteria_range1",
				detail: "조건을 평가할 범위입니다."
			},
			criteria1: {
				name: "criteria1",
				detail: "평균을 구할 셀을 정의하는 조건입니다."
			},
			criteriaRange2: {
				name: "criteria_range2",
				detail: "추가 범위입니다. 최대 127개의 범위 쌍을 입력할 수 있습니다."
			},
			criteria2: {
				name: "criteria2",
				detail: "추가 관련 조건입니다. 최대 127개의 조건 쌍을 입력할 수 있습니다."
			}
		}
	},
	BETA_DIST: {
		description: "베타 누적 분포 함수를 반환합니다",
		abstract: "베타 누적 분포 함수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/beta-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "함수를 계산할 값입니다."
			},
			alpha: {
				name: "alpha",
				detail: "분포의 매개 변수입니다."
			},
			beta: {
				name: "beta",
				detail: "분포의 매개 변수입니다."
			},
			cumulative: {
				name: "cumulative",
				detail: "함수의 형태를 결정하는 논리값입니다."
			},
			A: {
				name: "A",
				detail: "x 구간의 하한값입니다."
			},
			B: {
				name: "B",
				detail: "x 구간의 상한값입니다."
			}
		}
	},
	BETA_INV: {
		description: "지정된 베타 분포에 대한 누적 분포 함수의 역함수를 반환합니다",
		abstract: "지정된 베타 분포에 대한 누적 분포 함수의 역함수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/beta-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "베타 분포와 연관된 확률입니다."
			},
			alpha: {
				name: "alpha",
				detail: "분포의 매개 변수입니다."
			},
			beta: {
				name: "beta",
				detail: "분포의 매개 변수입니다."
			},
			A: {
				name: "A",
				detail: "x 구간의 하한값입니다."
			},
			B: {
				name: "B",
				detail: "x 구간의 상한값입니다."
			}
		}
	},
	BINOM_DIST: {
		description: "개별항 이항 분포 확률을 반환합니다",
		abstract: "개별항 이항 분포 확률을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/binom-dist-function"
		}],
		functionParameter: {
			numberS: {
				name: "number_s",
				detail: "시행의 성공 횟수입니다."
			},
			trials: {
				name: "trials",
				detail: "독립 시행 횟수입니다."
			},
			probabilityS: {
				name: "probability_s",
				detail: "각 시행의 성공 확률입니다."
			},
			cumulative: {
				name: "cumulative",
				detail: "함수의 형태를 결정하는 논리값입니다."
			}
		}
	},
	BINOM_DIST_RANGE: {
		description: "시행 결과의 확률이 이항 분포를 사용하는 경우를 반환합니다",
		abstract: "시행 결과의 확률이 이항 분포를 사용하는 경우를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/binom-dist-range-function"
		}],
		functionParameter: {
			trials: {
				name: "trials",
				detail: "독립 시행 횟수입니다."
			},
			probabilityS: {
				name: "probability_s",
				detail: "각 시행의 성공 확률입니다."
			},
			numberS: {
				name: "number_s",
				detail: "시행의 성공 횟수입니다."
			},
			numberS2: {
				name: "number_s2",
				detail: "선택 사항입니다. 지정하면 성공 시행 횟수가 number_s와 number_s2 사이에 있을 확률을 반환합니다."
			}
		}
	},
	BINOM_INV: {
		description: "누적 이항 분포가 기준값 이상인 최소값을 반환합니다",
		abstract: "누적 이항 분포가 기준값 이상인 최소값을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/binom-inv-function"
		}],
		functionParameter: {
			trials: {
				name: "trials",
				detail: "베르누이 시행 횟수입니다."
			},
			probabilityS: {
				name: "probability_s",
				detail: "각 시행의 성공 확률입니다."
			},
			alpha: {
				name: "alpha",
				detail: "기준값입니다."
			}
		}
	},
	CHISQ_DIST: {
		description: "누적 베타 확률 밀도 함수를 반환합니다",
		abstract: "누적 베타 확률 밀도 함수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/chisq-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "분포를 평가할 값입니다."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "자유도입니다."
			},
			cumulative: {
				name: "cumulative",
				detail: "함수의 형태를 결정하는 논리값입니다."
			}
		}
	},
	CHISQ_DIST_RT: {
		description: "카이 제곱 분포의 단측 확률을 반환합니다",
		abstract: "카이 제곱 분포의 단측 확률을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/chisq-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "분포를 평가할 값입니다."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "자유도입니다."
			}
		}
	},
	CHISQ_INV: {
		description: "누적 베타 확률 밀도 함수를 반환합니다",
		abstract: "누적 베타 확률 밀도 함수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/chisq-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "카이 제곱 분포와 연관된 확률입니다."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "자유도입니다."
			}
		}
	},
	CHISQ_INV_RT: {
		description: "카이 제곱 분포의 단측 확률의 역함수를 반환합니다",
		abstract: "카이 제곱 분포의 단측 확률의 역함수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/chisq-inv-rt-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "카이 제곱 분포와 연관된 확률입니다."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "자유도입니다."
			}
		}
	},
	CHISQ_TEST: {
		description: "독립성 검정을 반환합니다",
		abstract: "독립성 검정을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/chisq-test-function"
		}],
		functionParameter: {
			actualRange: {
				name: "actual_range",
				detail: "예상값과 비교할 관찰값이 포함된 데이터 범위입니다."
			},
			expectedRange: {
				name: "expected_range",
				detail: "행과 열의 합계 곱을 총합계로 나눈 예상값이 포함된 데이터 범위입니다."
			}
		}
	},
	CONFIDENCE_NORM: {
		description: "정규 분포를 사용하여 모집단 평균의 신뢰 구간을 반환합니다",
		abstract: "정규 분포를 사용하여 모집단 평균의 신뢰 구간을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/confidence-norm-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "신뢰 수준을 계산하는 데 사용되는 유의 수준입니다."
			},
			standardDev: {
				name: "standard_dev",
				detail: "데이터 범위의 모집단 표준 편차이며 이미 알려진 것으로 가정합니다."
			},
			size: {
				name: "size",
				detail: "표본 크기입니다."
			}
		}
	},
	CONFIDENCE_T: {
		description: "스튜던트 t 분포를 사용하여 모집단 평균의 신뢰 구간을 반환합니다",
		abstract: "스튜던트 t 분포를 사용하여 모집단 평균의 신뢰 구간을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/confidence-t-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "신뢰 수준을 계산하는 데 사용되는 유의 수준입니다."
			},
			standardDev: {
				name: "standard_dev",
				detail: "데이터 범위의 모집단 표준 편차이며 이미 알려진 것으로 가정합니다."
			},
			size: {
				name: "size",
				detail: "표본 크기입니다."
			}
		}
	},
	CORREL: {
		description: "두 데이터 집합 사이의 상관 계수를 반환합니다",
		abstract: "두 데이터 집합 사이의 상관 계수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/correl-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "값의 셀 범위입니다."
			},
			array2: {
				name: "array2",
				detail: "값의 두 번째 셀 범위입니다."
			}
		}
	},
	COUNT: {
		description: "인수 목록에서 숫자의 개수를 계산합니다",
		abstract: "인수 목록에서 숫자의 개수를 계산합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/count-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "숫자의 개수를 구하려는 첫 번째 항목, 셀 참조 또는 범위입니다."
			},
			value2: {
				name: "value2",
				detail: "숫자의 개수를 구하려는 추가 항목, 셀 참조 또는 범위로 최대 255개입니다."
			}
		}
	},
	COUNTA: {
		description: "인수 목록에서 값의 개수를 계산합니다",
		abstract: "인수 목록에서 값의 개수를 계산합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/counta-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "평균을 구하려는 첫 번째 인수입니다."
			},
			value2: {
				name: "value2",
				detail: "평균을 구하려는 2에서 255개의 추가 인수입니다."
			}
		}
	},
	COUNTBLANK: {
		description: "범위에서 빈 셀의 개수를 계산합니다",
		abstract: "범위에서 빈 셀의 개수를 계산합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/countblank-function"
		}],
		functionParameter: { range: {
			name: "range",
			detail: "빈 셀의 개수를 구하려는 범위입니다."
		} }
	},
	COUNTIF: {
		description: "범위에서 지정한 조건을 충족하는 셀의 개수를 계산합니다",
		abstract: "범위에서 지정한 조건을 충족하는 셀의 개수를 계산합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/use-the-countif-function-in-microsoft-excel"
		}],
		functionParameter: {
			range: {
				name: "range",
				detail: "개수를 구하려는 셀 그룹입니다."
			},
			criteria: {
				name: "criteria",
				detail: "개수를 계산할 셀을 결정하는 숫자, 식, 셀 참조 또는 텍스트 문자열 형식의 조건입니다."
			}
		}
	},
	COUNTIFS: {
		description: "범위에서 여러 조건을 충족하는 셀의 개수를 계산합니다",
		abstract: "범위에서 여러 조건을 충족하는 셀의 개수를 계산합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/countifs-function"
		}],
		functionParameter: {
			criteriaRange1: {
				name: "criteria_range1",
				detail: "조건을 평가할 첫 번째 범위입니다."
			},
			criteria1: {
				name: "criteria1",
				detail: "개수를 계산할 셀을 정의하는 조건입니다."
			},
			criteriaRange2: {
				name: "criteria_range2",
				detail: "추가 범위입니다. 최대 127개의 범위 쌍을 입력할 수 있습니다."
			},
			criteria2: {
				name: "criteria2",
				detail: "추가 관련 조건입니다. 최대 127개의 조건 쌍을 입력할 수 있습니다."
			}
		}
	},
	COVARIANCE_P: {
		description: "모집단 공분산, 즉 두 데이터 집합에서 대응하는 데이터 요소의 편차의 곱의 평균을 반환합니다",
		abstract: "모집단 공분산을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/covariance-p-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "정수의 첫 번째 셀 범위입니다."
			},
			array2: {
				name: "array2",
				detail: "정수의 두 번째 셀 범위입니다."
			}
		}
	},
	COVARIANCE_S: {
		description: "표본 공분산, 즉 두 데이터 집합에서 각 데이터 요소 쌍의 편차의 곱의 평균을 반환합니다",
		abstract: "표본 공분산을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/covariance-s-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "정수의 첫 번째 셀 범위입니다."
			},
			array2: {
				name: "array2",
				detail: "정수의 두 번째 셀 범위입니다."
			}
		}
	},
	DEVSQ: {
		description: "편차의 제곱의 합을 반환합니다",
		abstract: "편차의 제곱의 합을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/devsq-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "평균의 편차를 계산하려는 1에서 255개의 인수입니다."
			},
			number2: {
				name: "number2",
				detail: "평균의 편차를 계산하려는 1에서 255개의 인수입니다."
			}
		}
	},
	EXPON_DIST: {
		description: "지수 분포를 반환합니다",
		abstract: "지수 분포를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/expon-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "함수를 계산할 값입니다."
			},
			lambda: {
				name: "lambda",
				detail: "매개 변수 값입니다."
			},
			cumulative: {
				name: "cumulative",
				detail: "함수의 형태를 결정하는 논리값입니다."
			}
		}
	},
	F_DIST: {
		description: "F 확률 분포를 반환합니다",
		abstract: "F 확률 분포를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/f-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "함수를 계산할 값입니다."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "분자 자유도입니다."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "분모 자유도입니다."
			},
			cumulative: {
				name: "cumulative",
				detail: "함수의 형태를 결정하는 논리값입니다."
			}
		}
	},
	F_DIST_RT: {
		description: "F 확률 분포를 반환합니다",
		abstract: "F 확률 분포를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/f-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "함수를 계산할 값입니다."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "분자 자유도입니다."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "분모 자유도입니다."
			}
		}
	},
	F_INV: {
		description: "F 확률 분포의 역함수를 반환합니다",
		abstract: "F 확률 분포의 역함수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/f-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "F 누적 분포와 연관된 확률입니다."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "분자 자유도입니다."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "분모 자유도입니다."
			}
		}
	},
	F_INV_RT: {
		description: "F 확률 분포의 역함수를 반환합니다",
		abstract: "F 확률 분포의 역함수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/f-inv-rt-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "F 누적 분포와 연관된 확률입니다."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "분자 자유도입니다."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "분모 자유도입니다."
			}
		}
	},
	F_TEST: {
		description: "F-검정의 결과를 반환합니다",
		abstract: "F-검정의 결과를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/f-test-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "데이터의 첫 번째 배열 또는 범위입니다."
			},
			array2: {
				name: "array2",
				detail: "데이터의 두 번째 배열 또는 범위입니다."
			}
		}
	},
	FISHER: {
		description: "Fisher 변환을 반환합니다",
		abstract: "Fisher 변환을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/fisher-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "변환할 숫자 값입니다."
		} }
	},
	FISHERINV: {
		description: "Fisher 변환의 역변환을 반환합니다",
		abstract: "Fisher 변환의 역변환을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/fisherinv-function"
		}],
		functionParameter: { y: {
			name: "y",
			detail: "역변환할 값입니다."
		} }
	},
	FORECAST: {
		description: "선형 추세를 따라 값을 반환합니다",
		abstract: "선형 추세를 따라 값을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/forecast-and-forecast-linear-functions"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "값을 예측하려는 데이터 요소입니다."
			},
			knownYs: {
				name: "known_ys",
				detail: "종속 배열이나 데이터 범위입니다."
			},
			knownXs: {
				name: "known_xs",
				detail: "독립 배열이나 데이터 범위입니다."
			}
		}
	},
	FORECAST_ETS: {
		description: "언제든지 Excel Tech Community 의 전문가에게 문의하거나 커뮤니티에서 지원을 받을 수 있습니다 .",
		abstract: "언제든지 Excel Tech Community 의 전문가에게 문의하거나 커뮤니티에서 지원을 받을 수 있습니다 .",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/forecast-ets-function"
		}],
		functionParameter: {
			targetDate: {
				name: "대상 날짜",
				detail: "값을 예측할 데이터 요소입니다."
			},
			values: {
				name: "값",
				detail: "예측에 사용하는 기록 값입니다."
			},
			timeline: {
				name: "시간 표시 막대",
				detail: "일정한 간격의 숫자 날짜 또는 시간으로 구성된 독립 범위나 배열입니다."
			},
			seasonality: {
				name: "계절성",
				detail: "선택 사항입니다. 자동 검색은 1, 계절성 없음은 0입니다."
			},
			dataCompletion: {
				name: "데이터 완성",
				detail: "선택 사항입니다. 누락 지점을 보간하려면 1, 0으로 처리하려면 0을 사용합니다."
			},
			aggregation: {
				name: "집계",
				detail: "선택 사항입니다. 중복 타임스탬프 집계 방법을 1에서 7로 지정합니다."
			}
		}
	},
	FORECAST_ETS_CONFINT: {
		description: "언제든지 Excel Tech Community 의 전문가에게 문의하거나 커뮤니티에서 지원을 받을 수 있습니다 .",
		abstract: "언제든지 Excel Tech Community 의 전문가에게 문의하거나 커뮤니티에서 지원을 받을 수 있습니다 .",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/forecast-ets-confint-function"
		}],
		functionParameter: {
			targetDate: {
				name: "대상 날짜",
				detail: "값을 예측할 데이터 요소입니다."
			},
			values: {
				name: "값",
				detail: "예측에 사용하는 기록 값입니다."
			},
			timeline: {
				name: "시간 표시 막대",
				detail: "일정한 간격의 숫자 날짜 또는 시간으로 구성된 독립 범위나 배열입니다."
			},
			confidenceLevel: {
				name: "신뢰 수준",
				detail: "선택 사항입니다. 0과 1 사이의 숫자이며 기본값은 0.95입니다."
			},
			seasonality: {
				name: "계절성",
				detail: "선택 사항입니다. 자동 검색은 1, 계절성 없음은 0입니다."
			},
			dataCompletion: {
				name: "데이터 완성",
				detail: "선택 사항입니다. 누락 지점을 보간하려면 1, 0으로 처리하려면 0을 사용합니다."
			},
			aggregation: {
				name: "집계",
				detail: "선택 사항입니다. 중복 타임스탬프 집계 방법을 1에서 7로 지정합니다."
			}
		}
	},
	FORECAST_ETS_SEASONALITY: {
		description: "언제든지 Excel Tech Community 의 전문가에게 문의하거나 커뮤니티에서 지원을 받을 수 있습니다 .",
		abstract: "언제든지 Excel Tech Community 의 전문가에게 문의하거나 커뮤니티에서 지원을 받을 수 있습니다 .",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/forecast-ets-seasonality-function"
		}],
		functionParameter: {
			values: {
				name: "값",
				detail: "예측에 사용하는 기록 값입니다."
			},
			timeline: {
				name: "시간 표시 막대",
				detail: "일정한 간격의 숫자 날짜 또는 시간으로 구성된 독립 범위나 배열입니다."
			},
			dataCompletion: {
				name: "데이터 완성",
				detail: "선택 사항입니다. 누락 지점을 보간하려면 1, 0으로 처리하려면 0을 사용합니다."
			},
			aggregation: {
				name: "집계",
				detail: "선택 사항입니다. 중복 타임스탬프 집계 방법을 1에서 7로 지정합니다."
			}
		}
	},
	FORECAST_ETS_STAT: {
		description: "언제든지 Excel Tech Community 의 전문가에게 문의하거나 커뮤니티에서 지원을 받을 수 있습니다 .",
		abstract: "언제든지 Excel Tech Community 의 전문가에게 문의하거나 커뮤니티에서 지원을 받을 수 있습니다 .",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/forecast-ets-stat-function"
		}],
		functionParameter: {
			values: {
				name: "값",
				detail: "예측에 사용하는 기록 값입니다."
			},
			timeline: {
				name: "시간 표시 막대",
				detail: "일정한 간격의 숫자 날짜 또는 시간으로 구성된 독립 범위나 배열입니다."
			},
			statisticType: {
				name: "통계 유형",
				detail: "반환할 예측 통계를 1에서 8로 지정합니다."
			},
			seasonality: {
				name: "계절성",
				detail: "선택 사항입니다. 자동 검색은 1, 계절성 없음은 0입니다."
			},
			dataCompletion: {
				name: "데이터 완성",
				detail: "선택 사항입니다. 누락 지점을 보간하려면 1, 0으로 처리하려면 0을 사용합니다."
			},
			aggregation: {
				name: "집계",
				detail: "선택 사항입니다. 중복 타임스탬프 집계 방법을 1에서 7로 지정합니다."
			}
		}
	},
	FORECAST_LINEAR: {
		description: "기존 값을 기반으로 미래 값을 반환합니다",
		abstract: "기존 값을 기반으로 미래 값을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/forecast-and-forecast-linear-functions"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "값을 예측하려는 데이터 요소입니다."
			},
			knownYs: {
				name: "known_ys",
				detail: "종속 배열이나 데이터 범위입니다."
			},
			knownXs: {
				name: "known_xs",
				detail: "독립 배열이나 데이터 범위입니다."
			}
		}
	},
	FREQUENCY: {
		description: "빈도 분포를 세로 배열로 반환합니다",
		abstract: "빈도 분포를 세로 배열로 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/frequency-function"
		}],
		functionParameter: {
			dataArray: {
				name: "data_array",
				detail: "빈도를 계산하려는 값의 배열 또는 참조입니다."
			},
			binsArray: {
				name: "bins_array",
				detail: "data_array의 값을 그룹화할 간격의 배열 또는 참조입니다."
			}
		}
	},
	GAMMA: {
		description: "감마 함수 값을 반환합니다",
		abstract: "감마 함수 값을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/gamma-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "GAMMA를 계산하려는 숫자 값입니다."
		} }
	},
	GAMMA_DIST: {
		description: "감마 분포를 반환합니다",
		abstract: "감마 분포를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/gamma-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "분포를 평가할 값입니다."
			},
			alpha: {
				name: "alpha",
				detail: "분포의 매개 변수입니다."
			},
			beta: {
				name: "beta",
				detail: "분포의 매개 변수입니다."
			},
			cumulative: {
				name: "cumulative",
				detail: "함수의 형태를 결정하는 논리값입니다."
			}
		}
	},
	GAMMA_INV: {
		description: "감마 누적 분포의 역함수를 반환합니다",
		abstract: "감마 누적 분포의 역함수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/gamma-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "감마 분포와 연관된 확률입니다."
			},
			alpha: {
				name: "alpha",
				detail: "분포의 매개 변수입니다."
			},
			beta: {
				name: "beta",
				detail: "분포의 매개 변수입니다."
			}
		}
	},
	GAMMALN: {
		description: "감마 함수의 자연 로그 Γ(x)를 반환합니다",
		abstract: "감마 함수의 자연 로그 Γ(x)를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/gammaln-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "GAMMALN을 계산하려는 값입니다."
		} }
	},
	GAMMALN_PRECISE: {
		description: "감마 함수의 자연 로그 Γ(x)를 반환합니다",
		abstract: "감마 함수의 자연 로그 Γ(x)를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/gammaln-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "GAMMALN을 계산하려는 값입니다."
		} }
	},
	GAUSS: {
		description: "표준 정규 누적 분포보다 0.5 작은 값을 반환합니다",
		abstract: "표준 정규 누적 분포보다 0.5 작은 값을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/gauss-function"
		}],
		functionParameter: { z: {
			name: "z",
			detail: "숫자입니다."
		} }
	},
	GEOMEAN: {
		description: "기하 평균을 반환합니다",
		abstract: "기하 평균을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/geomean-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "평균을 계산하려는 1에서 255개의 인수입니다."
			},
			number2: {
				name: "number2",
				detail: "평균을 계산하려는 1에서 255개의 인수입니다."
			}
		}
	},
	GROWTH: {
		description: "지수 추세를 따라 값을 반환합니다",
		abstract: "지수 추세를 따라 값을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/growth-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_ys",
				detail: "관계 b*m^x에서 이미 알고 있는 y 값의 집합입니다."
			},
			knownXs: {
				name: "known_xs",
				detail: "관계 b*m^x에서 이미 알고 있는 x 값의 선택적 집합입니다."
			},
			newXs: {
				name: "new_xs",
				detail: "GROWTH가 해당 y 값을 반환하도록 하려는 새 x 값입니다."
			},
			constb: {
				name: "const",
				detail: "상수 b를 1과 같도록 강제할지 여부를 지정하는 논리값입니다."
			}
		}
	},
	HARMEAN: {
		description: "조화 평균을 반환합니다",
		abstract: "조화 평균을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/harmean-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "평균을 계산하려는 1에서 255개의 인수입니다."
			},
			number2: {
				name: "number2",
				detail: "평균을 계산하려는 1에서 255개의 인수입니다."
			}
		}
	},
	HYPGEOM_DIST: {
		description: "초기하 분포를 반환합니다",
		abstract: "초기하 분포를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/hypgeom-dist-function"
		}],
		functionParameter: {
			sampleS: {
				name: "sample_s",
				detail: "표본의 성공 횟수입니다."
			},
			numberSample: {
				name: "number_sample",
				detail: "표본 크기입니다."
			},
			populationS: {
				name: "population_s",
				detail: "모집단의 성공 횟수입니다."
			},
			numberPop: {
				name: "number_pop",
				detail: "모집단 크기입니다."
			},
			cumulative: {
				name: "cumulative",
				detail: "함수의 형태를 결정하는 논리값입니다."
			}
		}
	},
	INTERCEPT: {
		description: "선형 회귀선의 절편을 반환합니다",
		abstract: "선형 회귀선의 절편을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/intercept-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_ys",
				detail: "종속 관찰값 또는 데이터의 집합입니다."
			},
			knownXs: {
				name: "known_xs",
				detail: "독립 관찰값 또는 데이터의 집합입니다."
			}
		}
	},
	KURT: {
		description: "데이터 집합의 첨도를 반환합니다",
		abstract: "데이터 집합의 첨도를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/kurt-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "첨도를 계산하려는 1에서 255개의 인수입니다."
			},
			number2: {
				name: "number2",
				detail: "첨도를 계산하려는 1에서 255개의 인수입니다."
			}
		}
	},
	LARGE: {
		description: "데이터 집합에서 k번째로 큰 값을 반환합니다",
		abstract: "데이터 집합에서 k번째로 큰 값을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/large-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "k번째로 큰 값을 결정하려는 데이터의 배열 또는 범위입니다."
			},
			k: {
				name: "k",
				detail: "배열에서 반환할 n번째로 큰 값의 위치입니다."
			}
		}
	},
	LINEST: {
		description: "선형 추세의 매개 변수를 반환합니다",
		abstract: "선형 추세의 매개 변수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/linest-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_ys",
				detail: "y = mx + b 관계에서 이미 알고 있는 y 값의 집합입니다."
			},
			knownXs: {
				name: "known_xs",
				detail: "y = mx + b 관계에서 이미 알고 있는 x 값의 선택적 집합입니다."
			},
			constb: {
				name: "const",
				detail: "상수 b를 0으로 강제할지 여부를 지정하는 논리값입니다."
			},
			stats: {
				name: "stats",
				detail: "추가 회귀 통계를 반환할지 여부를 지정하는 논리값입니다."
			}
		}
	},
	LOGEST: {
		description: "지수 추세의 매개 변수를 반환합니다",
		abstract: "지수 추세의 매개 변수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/logest-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_ys",
				detail: "y = b*m^x 관계에서 이미 알고 있는 y 값의 집합입니다."
			},
			knownXs: {
				name: "known_xs",
				detail: "y = b*m^x 관계에서 이미 알고 있는 x 값의 선택적 집합입니다."
			},
			constb: {
				name: "const",
				detail: "상수 b를 1과 같도록 강제할지 여부를 지정하는 논리값입니다."
			},
			stats: {
				name: "stats",
				detail: "추가 회귀 통계를 반환할지 여부를 지정하는 논리값입니다."
			}
		}
	},
	LOGNORM_DIST: {
		description: "로그 정규 누적 분포를 반환합니다",
		abstract: "로그 정규 누적 분포를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/lognorm-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "함수를 평가할 값입니다."
			},
			mean: {
				name: "mean",
				detail: "ln(x)의 평균입니다."
			},
			standardDev: {
				name: "standard_dev",
				detail: "ln(x)의 표준 편차입니다."
			},
			cumulative: {
				name: "cumulative",
				detail: "함수의 형태를 결정하는 논리값입니다."
			}
		}
	},
	LOGNORM_INV: {
		description: "로그 정규 누적 분포의 역함수를 반환합니다",
		abstract: "로그 정규 누적 분포의 역함수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/lognorm-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "로그 정규 분포와 연관된 확률입니다."
			},
			mean: {
				name: "mean",
				detail: "ln(x)의 평균입니다."
			},
			standardDev: {
				name: "standard_dev",
				detail: "ln(x)의 표준 편차입니다."
			}
		}
	},
	MARGINOFERROR: {
		description: "이 함수는 값 범위와 신뢰 수준에서 오차 범위를 계산합니다.",
		abstract: "이 함수는 값 범위와 신뢰 수준에서 오차 범위를 계산합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/12487850?hl=ko"
		}],
		functionParameter: {
			range: {
				name: "range",
				detail: "MARGINOFERROR(A1:C3, 0.99)"
			},
			confidence: {
				name: "신뢰도",
				detail: "(0, 1) 범위에서 원하는 신뢰 수준입니다."
			}
		}
	},
	MAX: {
		description: "인수 목록에서 최대값을 반환합니다",
		abstract: "인수 목록에서 최대값을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/max-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "최대값을 찾으려는 첫 번째 숫자입니다."
			},
			number2: {
				name: "number2",
				detail: "최대값을 찾으려는 2에서 255개의 숫자입니다."
			}
		}
	},
	MAXA: {
		description: "인수 목록에서 최대값을 반환합니다(숫자, 텍스트 및 논리값 포함)",
		abstract: "인수 목록에서 최대값을 반환합니다(숫자, 텍스트 및 논리값 포함)",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/maxa-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "최대값을 찾으려는 첫 번째 인수입니다."
			},
			value2: {
				name: "value2",
				detail: "최대값을 찾으려는 2에서 255개의 인수입니다."
			}
		}
	},
	MAXIFS: {
		description: "조건 집합에 의해 지정된 셀 중에서 최대값을 반환합니다",
		abstract: "조건 집합에 의해 지정된 셀 중에서 최대값을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/maxifs-function"
		}],
		functionParameter: {
			maxRange: {
				name: "max_range",
				detail: "최대값을 결정하려는 셀입니다."
			},
			criteriaRange1: {
				name: "criteria_range1",
				detail: "조건을 평가할 범위입니다."
			},
			criteria1: {
				name: "criteria1",
				detail: "최대값을 결정할 셀을 정의하는 조건입니다."
			},
			criteriaRange2: {
				name: "criteria_range2",
				detail: "추가 범위입니다. 최대 127개의 범위 쌍을 입력할 수 있습니다."
			},
			criteria2: {
				name: "criteria2",
				detail: "추가 관련 조건입니다. 최대 127개의 조건 쌍을 입력할 수 있습니다."
			}
		}
	},
	MEDIAN: {
		description: "주어진 숫자의 중앙값을 반환합니다",
		abstract: "주어진 숫자의 중앙값을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/median-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "중앙값을 계산하려는 1에서 255개의 숫자입니다."
			},
			number2: {
				name: "number2",
				detail: "중앙값을 계산하려는 1에서 255개의 숫자입니다."
			}
		}
	},
	MIN: {
		description: "인수 목록에서 최소값을 반환합니다",
		abstract: "인수 목록에서 최소값을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/min-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "최소값을 찾으려는 첫 번째 숫자입니다."
			},
			number2: {
				name: "number2",
				detail: "최소값을 찾으려는 2에서 255개의 숫자입니다."
			}
		}
	},
	MINA: {
		description: "인수 목록에서 최소값을 반환합니다(숫자, 텍스트 및 논리값 포함)",
		abstract: "인수 목록에서 최소값을 반환합니다(숫자, 텍스트 및 논리값 포함)",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/mina-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "최소값을 찾으려는 첫 번째 인수입니다."
			},
			value2: {
				name: "value2",
				detail: "최소값을 찾으려는 2에서 255개의 인수입니다."
			}
		}
	},
	MINIFS: {
		description: "조건 집합에 의해 지정된 셀 중에서 최소값을 반환합니다",
		abstract: "조건 집합에 의해 지정된 셀 중에서 최소값을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/minifs-function"
		}],
		functionParameter: {
			minRange: {
				name: "min_range",
				detail: "최소값을 결정하려는 셀입니다."
			},
			criteriaRange1: {
				name: "criteria_range1",
				detail: "조건을 평가할 범위입니다."
			},
			criteria1: {
				name: "criteria1",
				detail: "최소값을 결정할 셀을 정의하는 조건입니다."
			},
			criteriaRange2: {
				name: "criteria_range2",
				detail: "추가 범위입니다. 최대 127개의 범위 쌍을 입력할 수 있습니다."
			},
			criteria2: {
				name: "criteria2",
				detail: "추가 관련 조건입니다. 최대 127개의 조건 쌍을 입력할 수 있습니다."
			}
		}
	},
	MODE_MULT: {
		description: "배열이나 데이터 범위에서 가장 자주 발생하는 값의 세로 배열을 반환합니다",
		abstract: "배열이나 데이터 범위에서 가장 자주 발생하는 값의 세로 배열을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/mode-mult-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "최빈값을 계산하려는 1에서 254개의 인수입니다."
			},
			number2: {
				name: "number2",
				detail: "최빈값을 계산하려는 1에서 254개의 인수입니다."
			}
		}
	},
	MODE_SNGL: {
		description: "데이터 집합에서 가장 자주 발생하는 값을 반환합니다",
		abstract: "데이터 집합에서 가장 자주 발생하는 값을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/mode-sngl-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "최빈값을 계산하려는 1에서 254개의 인수입니다."
			},
			number2: {
				name: "number2",
				detail: "최빈값을 계산하려는 1에서 254개의 인수입니다."
			}
		}
	},
	NEGBINOM_DIST: {
		description: "음이항 분포를 반환합니다",
		abstract: "음이항 분포를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/negbinom-dist-function"
		}],
		functionParameter: {
			numberF: {
				name: "number_f",
				detail: "실패 횟수입니다."
			},
			numberS: {
				name: "number_s",
				detail: "성공의 임계값입니다."
			},
			probabilityS: {
				name: "probability_s",
				detail: "성공 확률입니다."
			},
			cumulative: {
				name: "cumulative",
				detail: "함수의 형태를 결정하는 논리값입니다."
			}
		}
	},
	NORM_DIST: {
		description: "정규 누적 분포를 반환합니다",
		abstract: "정규 누적 분포를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/norm-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "분포를 계산하려는 값입니다."
			},
			mean: {
				name: "mean",
				detail: "분포의 산술 평균입니다."
			},
			standardDev: {
				name: "standard_dev",
				detail: "분포의 표준 편차입니다."
			},
			cumulative: {
				name: "cumulative",
				detail: "함수의 형태를 결정하는 논리값입니다."
			}
		}
	},
	NORM_INV: {
		description: "정규 누적 분포의 역함수를 반환합니다",
		abstract: "정규 누적 분포의 역함수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/norm-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "정규 분포에 해당하는 확률입니다."
			},
			mean: {
				name: "mean",
				detail: "분포의 산술 평균입니다."
			},
			standardDev: {
				name: "standard_dev",
				detail: "분포의 표준 편차입니다."
			}
		}
	},
	NORM_S_DIST: {
		description: "표준 정규 누적 분포를 반환합니다",
		abstract: "표준 정규 누적 분포를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/norm-s-dist-function"
		}],
		functionParameter: {
			z: {
				name: "z",
				detail: "분포를 계산하려는 값입니다."
			},
			cumulative: {
				name: "cumulative",
				detail: "함수의 형태를 결정하는 논리값입니다."
			}
		}
	},
	NORM_S_INV: {
		description: "표준 정규 누적 분포의 역함수를 반환합니다",
		abstract: "표준 정규 누적 분포의 역함수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/norm-s-inv-function"
		}],
		functionParameter: { probability: {
			name: "probability",
			detail: "정규 분포에 해당하는 확률입니다."
		} }
	},
	PEARSON: {
		description: "Pearson 곱 모멘트 상관 계수를 반환합니다",
		abstract: "Pearson 곱 모멘트 상관 계수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/pearson-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "독립 값의 집합입니다."
			},
			array2: {
				name: "array2",
				detail: "종속 값의 집합입니다."
			}
		}
	},
	PERCENTILE_EXC: {
		description: "범위에 있는 값의 k번째 백분위수를 반환합니다. 여기서 k는 0..1 범위에 있으며 0과 1은 제외됩니다",
		abstract: "범위에 있는 값의 k번째 백분위수를 반환합니다. 여기서 k는 0..1 범위에 있으며 0과 1은 제외됩니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/percentile-exc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "상대 위치를 정의하는 데이터의 배열 또는 범위입니다."
			},
			k: {
				name: "k",
				detail: "0..1 범위(0과 1 제외)의 백분위수 값입니다."
			}
		}
	},
	PERCENTILE_INC: {
		description: "범위에 있는 값의 k번째 백분위수를 반환합니다",
		abstract: "범위에 있는 값의 k번째 백분위수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/percentile-inc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "상대 위치를 정의하는 데이터의 배열 또는 범위입니다."
			},
			k: {
				name: "k",
				detail: "0..1 범위(0과 1 포함)의 백분위수 값입니다."
			}
		}
	},
	PERCENTRANK_EXC: {
		description: "데이터 집합에서 값의 순위를 해당 집합의 백분율(0..1, 0과 1 제외)로 반환합니다",
		abstract: "데이터 집합에서 값의 순위를 해당 집합의 백분율(0..1, 0과 1 제외)로 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/percentrank-exc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "상대 위치를 정의하는 데이터의 배열 또는 범위입니다."
			},
			x: {
				name: "x",
				detail: "순위를 알려는 값입니다."
			},
			significance: {
				name: "significance",
				detail: "반환된 백분율 값의 유효 자릿수를 식별하는 값입니다."
			}
		}
	},
	PERCENTRANK_INC: {
		description: "데이터 집합에서 값의 백분율 순위를 반환합니다",
		abstract: "데이터 집합에서 값의 백분율 순위를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/percentrank-inc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "상대 위치를 정의하는 데이터의 배열 또는 범위입니다."
			},
			x: {
				name: "x",
				detail: "순위를 알려는 값입니다."
			},
			significance: {
				name: "significance",
				detail: "반환된 백분율 값의 유효 자릿수를 식별하는 값입니다."
			}
		}
	},
	PERMUT: {
		description: "지정한 개체 수로 만들 수 있는 순열의 수를 반환합니다",
		abstract: "지정한 개체 수로 만들 수 있는 순열의 수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/permut-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "개체 수를 나타내는 정수입니다."
			},
			numberChosen: {
				name: "number_chosen",
				detail: "각 순열의 개체 수를 나타내는 정수입니다."
			}
		}
	},
	PERMUTATIONA: {
		description: "지정된 개체 수(반복 포함)에서 선택할 수 있는 순열의 수를 반환합니다",
		abstract: "지정된 개체 수(반복 포함)에서 선택할 수 있는 순열의 수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/permutationa-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "개체 수를 나타내는 정수입니다."
			},
			numberChosen: {
				name: "number_chosen",
				detail: "각 순열의 개체 수를 나타내는 정수입니다."
			}
		}
	},
	PHI: {
		description: "표준 정규 분포의 밀도 함수 값을 반환합니다",
		abstract: "표준 정규 분포의 밀도 함수 값을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/phi-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "표준 정규 분포의 밀도를 구하려는 숫자입니다."
		} }
	},
	POISSON_DIST: {
		description: "포아송 분포를 반환합니다",
		abstract: "포아송 분포를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/poisson-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "이벤트 수입니다."
			},
			mean: {
				name: "mean",
				detail: "예상되는 숫자 값입니다."
			},
			cumulative: {
				name: "cumulative",
				detail: "반환된 확률 분포의 형태를 결정하는 논리값입니다."
			}
		}
	},
	PROB: {
		description: "범위에 있는 값이 두 한계값 사이에 있을 확률을 반환합니다",
		abstract: "범위에 있는 값이 두 한계값 사이에 있을 확률을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/prob-function"
		}],
		functionParameter: {
			xRange: {
				name: "x_range",
				detail: "각각에 대한 확률이 연결된 x 숫자 값의 범위입니다."
			},
			probRange: {
				name: "prob_range",
				detail: "x_range의 값과 연결된 확률 집합입니다."
			},
			lowerLimit: {
				name: "lower_limit",
				detail: "확률을 계산하려는 값의 하한입니다."
			},
			upperLimit: {
				name: "upper_limit",
				detail: "확률을 계산하려는 값의 선택적 상한입니다."
			}
		}
	},
	QUARTILE_EXC: {
		description: "0..1 범위(0과 1 제외)의 백분위수 값을 기준으로 데이터 집합의 사분위수를 반환합니다",
		abstract: "0..1 범위(0과 1 제외)의 백분위수 값을 기준으로 데이터 집합의 사분위수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/quartile-exc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "사분위수 값을 구하려는 배열 또는 셀 범위입니다."
			},
			quart: {
				name: "quart",
				detail: "반환할 사분위수를 나타냅니다."
			}
		}
	},
	QUARTILE_INC: {
		description: "데이터 집합의 사분위수를 반환합니다",
		abstract: "데이터 집합의 사분위수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/quartile-inc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "사분위수 값을 구하려는 배열 또는 셀 범위입니다."
			},
			quart: {
				name: "quart",
				detail: "반환할 사분위수를 나타냅니다."
			}
		}
	},
	RANK_AVG: {
		description: "숫자 목록에서 숫자의 순위를 반환합니다",
		abstract: "숫자 목록에서 숫자의 순위를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/rank-avg-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "순위를 찾으려는 숫자입니다."
			},
			ref: {
				name: "ref",
				detail: "숫자 목록의 배열 또는 참조입니다. ref의 숫자가 아닌 값은 무시됩니다."
			},
			order: {
				name: "order",
				detail: "number 순위를 매기는 방법을 지정하는 숫자입니다."
			}
		}
	},
	RANK_EQ: {
		description: "숫자 목록에서 숫자의 순위를 반환합니다",
		abstract: "숫자 목록에서 숫자의 순위를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/rank-eq-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "순위를 찾으려는 숫자입니다."
			},
			ref: {
				name: "ref",
				detail: "숫자 목록의 배열 또는 참조입니다. ref의 숫자가 아닌 값은 무시됩니다."
			},
			order: {
				name: "order",
				detail: "number 순위를 매기는 방법을 지정하는 숫자입니다."
			}
		}
	},
	RSQ: {
		description: "Pearson 곱 모멘트 상관 계수의 제곱을 반환합니다",
		abstract: "Pearson 곱 모멘트 상관 계수의 제곱을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/rsq-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_ys",
				detail: "종속 데이터 요소의 배열이나 셀 범위입니다."
			},
			knownXs: {
				name: "known_xs",
				detail: "독립 데이터 요소의 집합입니다."
			}
		}
	},
	SKEW: {
		description: "분포의 왜도를 반환합니다",
		abstract: "분포의 왜도를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/skew-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "왜도를 계산하려는 1에서 255개의 인수입니다."
			},
			number2: {
				name: "number2",
				detail: "왜도를 계산하려는 1에서 255개의 인수입니다."
			}
		}
	},
	SKEW_P: {
		description: "모집단을 기반으로 분포의 왜도를 반환합니다: 평균 주위의 비대칭 정도를 나타냅니다",
		abstract: "모집단을 기반으로 분포의 왜도를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/skew-p-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "왜도를 계산하려는 1에서 254개의 숫자 또는 숫자가 포함된 이름, 배열 또는 참조입니다."
			},
			number2: {
				name: "number2",
				detail: "왜도를 계산하려는 1에서 254개의 숫자 또는 숫자가 포함된 이름, 배열 또는 참조입니다."
			}
		}
	},
	SLOPE: {
		description: "선형 회귀선의 기울기를 반환합니다",
		abstract: "선형 회귀선의 기울기를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/slope-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_ys",
				detail: "종속 데이터 요소의 배열이나 셀 범위입니다."
			},
			knownXs: {
				name: "known_xs",
				detail: "독립 데이터 요소의 집합입니다."
			}
		}
	},
	SMALL: {
		description: "데이터 집합에서 k번째로 작은 값을 반환합니다",
		abstract: "데이터 집합에서 k번째로 작은 값을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/small-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "k번째로 작은 값을 결정하려는 배열 또는 숫자 데이터 범위입니다."
			},
			k: {
				name: "k",
				detail: "배열 또는 데이터 범위에서 반환할 가장 작은 값의 위치입니다."
			}
		}
	},
	STANDARDIZE: {
		description: "정규화된 값을 반환합니다",
		abstract: "정규화된 값을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/standardize-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "정규화하려는 값입니다."
			},
			mean: {
				name: "mean",
				detail: "분포의 산술 평균입니다."
			},
			standardDev: {
				name: "standard_dev",
				detail: "분포의 표준 편차입니다."
			}
		}
	},
	STDEV_P: {
		description: "전체 모집단을 기준으로 표준 편차를 계산합니다",
		abstract: "전체 모집단을 기준으로 표준 편차를 계산합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/stdev-p-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "모집단에 해당하는 첫 번째 숫자 인수입니다."
			},
			number2: {
				name: "number2",
				detail: "모집단에 해당하는 2에서 254개의 숫자 인수입니다."
			}
		}
	},
	STDEV_S: {
		description: "표본을 기준으로 표준 편차를 평가합니다",
		abstract: "표본을 기준으로 표준 편차를 평가합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/stdev-s-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "표본에 해당하는 첫 번째 숫자 인수입니다."
			},
			number2: {
				name: "number2",
				detail: "표본에 해당하는 2에서 254개의 숫자 인수입니다."
			}
		}
	},
	STDEVA: {
		description: "표본을 기준으로 표준 편차를 평가합니다(숫자, 텍스트 및 논리값 포함)",
		abstract: "표본을 기준으로 표준 편차를 평가합니다(숫자, 텍스트 및 논리값 포함)",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/stdeva-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "표본에 해당하는 첫 번째 인수입니다."
			},
			value2: {
				name: "value2",
				detail: "표본에 해당하는 2에서 254개의 인수입니다."
			}
		}
	},
	STDEVPA: {
		description: "전체 모집단을 기준으로 표준 편차를 계산합니다(숫자, 텍스트 및 논리값 포함)",
		abstract: "전체 모집단을 기준으로 표준 편차를 계산합니다(숫자, 텍스트 및 논리값 포함)",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/stdevpa-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "모집단에 해당하는 첫 번째 인수입니다."
			},
			value2: {
				name: "value2",
				detail: "모집단에 해당하는 2에서 254개의 인수입니다."
			}
		}
	},
	STEYX: {
		description: "회귀에서 각 x에 대해 예측된 y 값의 표준 오차를 반환합니다",
		abstract: "회귀에서 각 x에 대해 예측된 y 값의 표준 오차를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/steyx-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_ys",
				detail: "종속 데이터 요소의 배열 또는 범위입니다."
			},
			knownXs: {
				name: "known_xs",
				detail: "독립 데이터 요소의 배열 또는 범위입니다."
			}
		}
	},
	T_DIST: {
		description: "백분율 요소(확률)를 스튜던트 t-분포로 반환합니다",
		abstract: "백분율 요소(확률)를 스튜던트 t-분포로 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/t-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "분포를 평가할 숫자 값입니다."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "자유도를 나타내는 정수입니다."
			},
			cumulative: {
				name: "cumulative",
				detail: "반환할 분포 유형을 지정합니다."
			}
		}
	},
	T_DIST_2T: {
		description: "스튜던트 t-분포의 백분율 요소(확률)를 반환합니다",
		abstract: "스튜던트 t-분포의 백분율 요소(확률)를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/t-dist-2t-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "분포를 평가할 숫자 값입니다."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "자유도를 나타내는 정수입니다."
			}
		}
	},
	T_DIST_RT: {
		description: "스튜던트 t-분포를 반환합니다",
		abstract: "스튜던트 t-분포를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/t-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "분포를 평가할 숫자 값입니다."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "자유도를 나타내는 정수입니다."
			}
		}
	},
	T_INV: {
		description: "스튜던트 t-분포의 t 값을 확률과 자유도의 함수로 반환합니다",
		abstract: "스튜던트 t-분포의 t 값을 확률과 자유도의 함수로 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/t-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "스튜던트 t-분포와 연관된 확률입니다."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "분포의 자유도를 나타내는 정수입니다."
			}
		}
	},
	T_INV_2T: {
		description: "스튜던트 t-분포의 역함수를 반환합니다",
		abstract: "스튜던트 t-분포의 역함수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/t-inv-2t-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "스튜던트 t-분포와 연관된 확률입니다."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "자유도를 나타내는 정수입니다."
			}
		}
	},
	T_TEST: {
		description: "스튜던트 t-검정과 연관된 확률을 반환합니다",
		abstract: "스튜던트 t-검정과 연관된 확률을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/t-test-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "데이터의 첫 번째 집합입니다."
			},
			array2: {
				name: "array2",
				detail: "데이터의 두 번째 집합입니다."
			},
			tails: {
				name: "tails",
				detail: "분포의 꼬리 수를 지정합니다. tails가 1이면 T.TEST는 단측 분포를 사용하고, 2이면 양측 분포를 사용합니다."
			},
			type: {
				name: "type",
				detail: "수행할 t-검정의 유형입니다."
			}
		}
	},
	TREND: {
		description: "선형 추세를 따라 값을 반환합니다",
		abstract: "선형 추세를 따라 값을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/trend-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_ys",
				detail: "관계 y = mx + b에서 이미 알고 있는 y 값의 집합입니다."
			},
			knownXs: {
				name: "known_xs",
				detail: "관계 y = mx + b에서 이미 알고 있는 x 값의 선택적 집합입니다."
			},
			newXs: {
				name: "new_xs",
				detail: "TREND가 해당 y 값을 반환하도록 하려는 새 x 값입니다."
			},
			constb: {
				name: "const",
				detail: "상수 b를 0으로 강제할지 여부를 지정하는 논리값입니다."
			}
		}
	},
	TRIMMEAN: {
		description: "데이터 집합의 내부 평균을 반환합니다",
		abstract: "데이터 집합의 내부 평균을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/trimmean-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "절사하고 평균을 구할 값의 배열 또는 범위입니다."
			},
			percent: {
				name: "percent",
				detail: "제외할 데이터 요소의 비율입니다."
			}
		}
	},
	VAR_P: {
		description: "전체 모집단을 기준으로 분산을 계산합니다",
		abstract: "전체 모집단을 기준으로 분산을 계산합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/var-p-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "모집단에 해당하는 첫 번째 숫자 인수입니다."
			},
			number2: {
				name: "number2",
				detail: "모집단에 해당하는 2에서 254개의 숫자 인수입니다."
			}
		}
	},
	VAR_S: {
		description: "표본을 기준으로 분산을 평가합니다",
		abstract: "표본을 기준으로 분산을 평가합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/var-s-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "표본에 해당하는 첫 번째 숫자 인수입니다."
			},
			number2: {
				name: "number2",
				detail: "표본에 해당하는 2에서 254개의 숫자 인수입니다."
			}
		}
	},
	VARA: {
		description: "표본을 기준으로 분산을 평가합니다(숫자, 텍스트 및 논리값 포함)",
		abstract: "표본을 기준으로 분산을 평가합니다(숫자, 텍스트 및 논리값 포함)",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/vara-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "표본에 해당하는 첫 번째 인수입니다."
			},
			value2: {
				name: "value2",
				detail: "표본에 해당하는 2에서 254개의 인수입니다."
			}
		}
	},
	VARPA: {
		description: "전체 모집단을 기준으로 분산을 계산합니다(숫자, 텍스트 및 논리값 포함)",
		abstract: "전체 모집단을 기준으로 분산을 계산합니다(숫자, 텍스트 및 논리값 포함)",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/varpa-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "모집단에 해당하는 첫 번째 인수입니다."
			},
			value2: {
				name: "value2",
				detail: "모집단에 해당하는 2에서 254개의 인수입니다."
			}
		}
	},
	WEIBULL_DIST: {
		description: "와이블 분포를 반환합니다",
		abstract: "와이블 분포를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/weibull-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "함수를 평가할 값입니다."
			},
			alpha: {
				name: "alpha",
				detail: "분포의 매개 변수입니다."
			},
			beta: {
				name: "beta",
				detail: "분포의 매개 변수입니다."
			},
			cumulative: {
				name: "cumulative",
				detail: "함수의 형태를 결정하는 논리값입니다."
			}
		}
	},
	Z_TEST: {
		description: "z-검정의 단측 확률 값을 반환합니다",
		abstract: "z-검정의 단측 확률 값을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/z-test-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "x를 검정할 데이터의 배열 또는 범위입니다."
			},
			x: {
				name: "x",
				detail: "검정할 값입니다."
			},
			sigma: {
				name: "sigma",
				detail: "모집단(알려진)의 표준 편차입니다. 생략하면 표본 표준 편차가 사용됩니다."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/text/ko-KR.ts
const locale$3 = {
	ASC: {
		description: "문자열의 전자(더블바이트) 영어 문자 또는 가타카나를 반자(싱글바이트) 문자로 변경합니다",
		abstract: "문자열의 전자(더블바이트) 영어 문자 또는 가타카나를 반자(싱글바이트) 문자로 변경합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/asc-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "텍스트이거나 전자 문자가 포함된 텍스트가 있는 셀에 대한 참조입니다."
		} }
	},
	ARRAYTOTEXT: {
		description: "지정된 범위의 텍스트 값 배열을 반환합니다",
		abstract: "지정된 범위의 텍스트 값 배열을 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/arraytotext-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "텍스트로 반환할 배열입니다."
			},
			format: {
				name: "format",
				detail: "반환되는 데이터의 형식입니다. 0(기본값) 또는 1일 수 있습니다."
			}
		}
	},
	BAHTTEXT: {
		description: "ß(바트) 통화 형식을 사용하여 숫자를 텍스트로 변환합니다",
		abstract: "ß(바트) 통화 형식을 사용하여 숫자를 텍스트로 변환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/bahttext-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "텍스트로 변환하려는 숫자, 숫자가 포함된 셀에 대한 참조 또는 숫자로 평가되는 수식입니다."
		} }
	},
	CHAR: {
		description: "코드 번호로 지정된 문자를 반환합니다",
		abstract: "코드 번호로 지정된 문자를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/char-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "원하는 문자를 지정하는 1에서 255 사이의 숫자입니다."
		} }
	},
	CLEAN: {
		description: "텍스트에서 인쇄할 수 없는 모든 문자를 제거합니다",
		abstract: "텍스트에서 인쇄할 수 없는 모든 문자를 제거합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/clean-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "인쇄할 수 없는 문자를 제거할 워크시트 정보입니다."
		} }
	},
	CODE: {
		description: "텍스트 문자열의 첫 번째 문자에 대한 숫자 코드를 반환합니다",
		abstract: "텍스트 문자열의 첫 번째 문자에 대한 숫자 코드를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/code-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "첫 번째 문자의 코드 번호를 원하는 텍스트입니다."
		} }
	},
	CONCAT: {
		description: "여러 범위 및/또는 문자열의 텍스트를 결합하지만 구분 기호 또는 IgnoreEmpty 인수는 제공하지 않습니다",
		abstract: "여러 범위 및/또는 문자열의 텍스트를 결합합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/concat-function"
		}],
		functionParameter: {
			text1: {
				name: "text1",
				detail: "결합할 텍스트 항목입니다. 문자열 또는 문자열의 배열(예: 셀 범위)일 수 있습니다."
			},
			text2: {
				name: "text2",
				detail: "결합할 추가 텍스트 항목입니다. 텍스트 항목은 최대 253개까지 가능합니다."
			}
		}
	},
	CONCATENATE: {
		description: "여러 텍스트 항목을 하나의 텍스트 항목으로 결합합니다",
		abstract: "여러 텍스트 항목을 하나의 텍스트 항목으로 결합합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/concatenate-function"
		}],
		functionParameter: {
			text1: {
				name: "text1",
				detail: "결합할 첫 번째 항목입니다. 항목은 텍스트 값, 숫자 또는 셀 참조일 수 있습니다."
			},
			text2: {
				name: "text2",
				detail: "결합할 추가 텍스트 항목입니다. 최대 255개 항목, 총 8,192자까지 가능합니다."
			}
		}
	},
	DBCS: {
		description: "문자열 내의 반자(싱글바이트) 영어 문자 또는 가타카나를 전자(더블바이트) 문자로 변경합니다",
		abstract: "문자열 내의 반자(싱글바이트) 영어 문자 또는 가타카나를 전자(더블바이트) 문자로 변경합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/dbcs-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "텍스트이거나 반자 문자가 포함된 텍스트가 있는 셀에 대한 참조입니다."
		} }
	},
	DOLLAR: {
		description: "통화 형식을 사용하여 숫자를 텍스트로 변환합니다",
		abstract: "통화 형식을 사용하여 숫자를 텍스트로 변환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/dollar-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "숫자, 숫자가 포함된 셀에 대한 참조 또는 숫자로 평가되는 수식입니다."
			},
			decimals: {
				name: "decimals",
				detail: "소수점 오른쪽의 자릿수입니다. 음수이면 숫자는 소수점 왼쪽으로 반올림됩니다."
			}
		}
	},
	EXACT: {
		description: "두 텍스트 값이 동일한지 확인합니다",
		abstract: "두 텍스트 값이 동일한지 확인합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/exact-function"
		}],
		functionParameter: {
			text1: {
				name: "text1",
				detail: "첫 번째 텍스트 문자열입니다."
			},
			text2: {
				name: "text2",
				detail: "두 번째 텍스트 문자열입니다."
			}
		}
	},
	FIND: {
		description: "하나의 텍스트 값을 다른 텍스트 값 내에서 찾습니다(대/소문자 구분)",
		abstract: "하나의 텍스트 값을 다른 텍스트 값 내에서 찾습니다(대/소문자 구분)",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/this-article-has-been-retired"
		}],
		functionParameter: {
			findText: {
				name: "find_text",
				detail: "찾으려는 텍스트입니다."
			},
			withinText: {
				name: "within_text",
				detail: "find_text를 포함하는 텍스트입니다."
			},
			startNum: {
				name: "start_num",
				detail: "검색을 시작할 문자입니다."
			}
		}
	},
	FINDB: {
		description: "하나의 텍스트 값을 다른 텍스트 값 내에서 찾습니다(대/소문자 구분, 더블바이트 문자 허용)",
		abstract: "하나의 텍스트 값을 다른 텍스트 값 내에서 찾습니다(대/소문자 구분, 더블바이트 문자 허용)",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/this-article-has-been-retired"
		}],
		functionParameter: {
			findText: {
				name: "find_text",
				detail: "찾으려는 텍스트입니다."
			},
			withinText: {
				name: "within_text",
				detail: "find_text를 포함하는 텍스트입니다."
			},
			startNum: {
				name: "start_num",
				detail: "검색을 시작할 바이트입니다."
			}
		}
	},
	FIXED: {
		description: "숫자를 지정된 소수 자릿수로 텍스트로 서식을 지정합니다",
		abstract: "숫자를 지정된 소수 자릿수로 텍스트로 서식을 지정합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/fixed-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "반올림하고 텍스트로 변환하려는 숫자입니다."
			},
			decimals: {
				name: "decimals",
				detail: "소수점 오른쪽의 자릿수입니다."
			},
			noCommas: {
				name: "no_commas",
				detail: "반환된 텍스트에 쉼표를 포함하지 않으려면 TRUE인 논리값입니다."
			}
		}
	},
	LEFT: {
		description: "텍스트 값에서 맨 왼쪽 문자를 반환합니다",
		abstract: "텍스트 값에서 맨 왼쪽 문자를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/left-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "추출하려는 문자가 포함된 텍스트 문자열입니다."
			},
			numChars: {
				name: "num_chars",
				detail: "LEFT에서 추출할 문자 수를 지정합니다."
			}
		}
	},
	LEFTB: {
		description: "텍스트 값에서 맨 왼쪽 문자를 반환합니다(바이트 기준)",
		abstract: "텍스트 값에서 맨 왼쪽 문자를 반환합니다(바이트 기준)",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/left-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "추출하려는 문자가 포함된 텍스트 문자열입니다."
			},
			numBytes: {
				name: "num_bytes",
				detail: "LEFTB에서 추출할 바이트 수를 지정합니다."
			}
		}
	},
	LEN: {
		description: "텍스트 문자열의 문자 수를 반환합니다",
		abstract: "텍스트 문자열의 문자 수를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/len-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "길이를 찾으려는 텍스트입니다. 공백은 문자로 계산됩니다."
		} }
	},
	LENB: {
		description: "텍스트 문자열의 문자 수를 바이트 단위로 반환합니다",
		abstract: "텍스트 문자열의 문자 수를 바이트 단위로 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/len-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "길이를 찾으려는 텍스트입니다."
		} }
	},
	LOWER: {
		description: "텍스트를 소문자로 변환합니다",
		abstract: "텍스트를 소문자로 변환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/lower-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "소문자로 변환하려는 텍스트입니다. LOWER는 문자가 아닌 문자를 변경하지 않습니다."
		} }
	},
	MID: {
		description: "텍스트 문자열에서 지정한 위치부터 특정 개수의 문자를 반환합니다",
		abstract: "텍스트 문자열에서 지정한 위치부터 특정 개수의 문자를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/mid-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "추출하려는 문자가 포함된 텍스트 문자열입니다."
			},
			startNum: {
				name: "start_num",
				detail: "추출하려는 첫 번째 문자의 위치입니다."
			},
			numChars: {
				name: "num_chars",
				detail: "MID가 텍스트에서 반환할 문자 수를 지정합니다."
			}
		}
	},
	MIDB: {
		description: "텍스트 문자열에서 지정한 위치부터 특정 개수의 문자를 반환합니다(바이트 기준)",
		abstract: "텍스트 문자열에서 지정한 위치부터 특정 개수의 문자를 반환합니다(바이트 기준)",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/mid-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "추출하려는 문자가 포함된 텍스트 문자열입니다."
			},
			startNum: {
				name: "start_num",
				detail: "추출하려는 첫 번째 문자의 위치입니다(바이트 기준)."
			},
			numBytes: {
				name: "num_bytes",
				detail: "MIDB가 반환할 바이트 수를 지정합니다."
			}
		}
	},
	NUMBERSTRING: {
		description: "숫자를 중국어 문자열로 변환합니다.",
		abstract: "숫자를 중국어 문자열로 변환합니다.",
		links: [{
			title: "Instruction",
			url: "https://www.wps.cn/learning/course/detail/id/340.html?chan=pc_kdocs_function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "중국어 문자열로 변환할 값입니다."
			},
			type: {
				name: "type",
				detail: "반환할 결과의 유형입니다. 1은 중국어 소문자, 2는 중국어 대문자, 3은 중국어 읽기 및 쓰기 문자입니다."
			}
		}
	},
	NUMBERVALUE: {
		description: "텍스트를 로캘 독립적인 방식으로 숫자로 변환합니다",
		abstract: "텍스트를 로캘 독립적인 방식으로 숫자로 변환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/numbervalue-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "숫자로 변환할 텍스트입니다."
			},
			decimalSeparator: {
				name: "decimal_separator",
				detail: "소수 구분 기호로 사용되는 문자입니다."
			},
			groupSeparator: {
				name: "group_separator",
				detail: "그룹 구분 기호로 사용되는 문자입니다."
			}
		}
	},
	PHONETIC: {
		description: "텍스트 문자열에서 윗주 문자를 추출합니다",
		abstract: "텍스트 문자열에서 윗주 문자를 추출합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/phonetic-function"
		}],
		functionParameter: { reference: {
			name: "참조",
			detail: "추출할 윗주 텍스트가 포함된 텍스트, 범위 또는 참조입니다."
		} }
	},
	PROPER: {
		description: "텍스트 값의 각 단어의 첫 글자를 대문자로 표시합니다",
		abstract: "텍스트 값의 각 단어의 첫 글자를 대문자로 표시합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/proper-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "따옴표로 묶인 텍스트, 적절한 대/소문자로 반환하려는 텍스트가 포함된 셀에 대한 참조 또는 텍스트를 반환하는 수식입니다."
		} }
	},
	REGEXEXTRACT: {
		description: "정규 표현식에 따라 첫 번째로 일치하는 하위 문자열을 추출합니다.",
		abstract: "정규 표현식에 따라 첫 번째로 일치하는 하위 문자열을 추출합니다.",
		links: [{
			title: "사용법",
			url: "https://support.google.com/docs/answer/3098244?hl=ko"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "도움말: 위의 예에서는 데이터의 열 2개가 반환되며 첫 번째 열에는 '값', 두 번째 열에는 '추출'이 반환됩니다."
			},
			regularExpression: {
				name: "regular_expression",
				detail: "추출할 텍스트의 일부입니다."
			}
		}
	},
	REGEXMATCH: {
		description: "텍스트 일부가 정규 표현식과 일치하는지 여부입니다.",
		abstract: "텍스트 일부가 정규 표현식과 일치하는지 여부입니다.",
		links: [{
			title: "사용법",
			url: "https://support.google.com/docs/answer/3098292?hl=ko"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "정규식에 대해 테스트할 텍스트입니다."
			},
			regularExpression: {
				name: "regular_expression",
				detail: "텍스트가 테스트될 정규식입니다."
			}
		}
	},
	REGEXREPLACE: {
		description: "정규 표현식을 사용하여 텍스트 문자열의 일부를 다른 텍스트 문자열로 대체합니다.",
		abstract: "정규 표현식을 사용하여 텍스트 문자열의 일부를 다른 텍스트 문자열로 대체합니다.",
		links: [{
			title: "사용법",
			url: "https://support.google.com/docs/answer/3098245?hl=ko"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "일부를 바꿀 텍스트입니다."
			},
			regularExpression: {
				name: "regular_expression",
				detail: "정규식입니다."
			},
			replacement: {
				name: "replacement",
				detail: "삽입할 텍스트입니다."
			}
		}
	},
	REPLACE: {
		description: "텍스트 내의 문자를 바꿉니다",
		abstract: "텍스트 내의 문자를 바꿉니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/replace-function"
		}],
		functionParameter: {
			oldText: {
				name: "old_text",
				detail: "일부 문자를 바꿀 텍스트입니다."
			},
			startNum: {
				name: "start_num",
				detail: "old_text에서 new_text로 바꿀 문자의 위치입니다."
			},
			numChars: {
				name: "num_chars",
				detail: "REPLACE가 old_text에서 new_text로 바꿀 문자 수입니다."
			},
			newText: {
				name: "new_text",
				detail: "old_text의 문자를 바꿀 텍스트입니다."
			}
		}
	},
	REPLACEB: {
		description: "텍스트 내의 문자를 바꿉니다(바이트 기준)",
		abstract: "텍스트 내의 문자를 바꿉니다(바이트 기준)",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/replace-function"
		}],
		functionParameter: {
			oldText: {
				name: "old_text",
				detail: "일부 문자를 바꿀 텍스트입니다."
			},
			startNum: {
				name: "start_num",
				detail: "old_text에서 new_text로 바꿀 바이트의 위치입니다."
			},
			numBytes: {
				name: "num_bytes",
				detail: "REPLACEB가 old_text에서 new_text로 바꿀 바이트 수입니다."
			},
			newText: {
				name: "new_text",
				detail: "old_text의 문자를 바꿀 텍스트입니다."
			}
		}
	},
	REPT: {
		description: "텍스트를 지정된 횟수만큼 반복합니다",
		abstract: "텍스트를 지정된 횟수만큼 반복합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/rept-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "반복하려는 텍스트입니다."
			},
			numberTimes: {
				name: "number_times",
				detail: "텍스트를 반복할 횟수를 지정하는 양수입니다."
			}
		}
	},
	RIGHT: {
		description: "텍스트 값에서 맨 오른쪽 문자를 반환합니다",
		abstract: "텍스트 값에서 맨 오른쪽 문자를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/right-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "추출하려는 문자가 포함된 텍스트 문자열입니다."
			},
			numChars: {
				name: "num_chars",
				detail: "RIGHT에서 추출할 문자 수를 지정합니다."
			}
		}
	},
	RIGHTB: {
		description: "텍스트 값에서 맨 오른쪽 문자를 반환합니다(바이트 기준)",
		abstract: "텍스트 값에서 맨 오른쪽 문자를 반환합니다(바이트 기준)",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/right-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "추출하려는 문자가 포함된 텍스트 문자열입니다."
			},
			numBytes: {
				name: "num_bytes",
				detail: "RIGHTB에서 추출할 바이트 수를 지정합니다."
			}
		}
	},
	SEARCH: {
		description: "하나의 텍스트 값을 다른 텍스트 값 내에서 찾습니다(대/소문자 구분 안 함)",
		abstract: "하나의 텍스트 값을 다른 텍스트 값 내에서 찾습니다(대/소문자 구분 안 함)",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/search-function"
		}],
		functionParameter: {
			findText: {
				name: "find_text",
				detail: "찾으려는 텍스트입니다."
			},
			withinText: {
				name: "within_text",
				detail: "find_text를 검색할 텍스트입니다."
			},
			startNum: {
				name: "start_num",
				detail: "검색을 시작할 within_text의 문자 번호입니다."
			}
		}
	},
	SEARCHB: {
		description: "하나의 텍스트 값을 다른 텍스트 값 내에서 찾습니다(대/소문자 구분 안 함, 바이트 기준)",
		abstract: "하나의 텍스트 값을 다른 텍스트 값 내에서 찾습니다(대/소문자 구분 안 함, 바이트 기준)",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/search-function"
		}],
		functionParameter: {
			findText: {
				name: "find_text",
				detail: "찾으려는 텍스트입니다."
			},
			withinText: {
				name: "within_text",
				detail: "find_text를 검색할 텍스트입니다."
			},
			startNum: {
				name: "start_num",
				detail: "검색을 시작할 within_text의 바이트 번호입니다."
			}
		}
	},
	SUBSTITUTE: {
		description: "텍스트 문자열에서 기존 텍스트를 새 텍스트로 대체합니다",
		abstract: "텍스트 문자열에서 기존 텍스트를 새 텍스트로 대체합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/substitute-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "문자를 대체할 텍스트 또는 텍스트가 포함된 셀에 대한 참조입니다."
			},
			oldText: {
				name: "old_text",
				detail: "바꿀 텍스트입니다."
			},
			newText: {
				name: "new_text",
				detail: "old_text를 바꿀 텍스트입니다."
			},
			instanceNum: {
				name: "instance_num",
				detail: "대체할 old_text의 발생 위치를 지정합니다. 지정하면 old_text의 해당 인스턴스만 바뀝니다."
			}
		}
	},
	T: {
		description: "인수를 텍스트로 변환합니다",
		abstract: "인수를 텍스트로 변환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/t-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "테스트하려는 값입니다."
		} }
	},
	TEXT: {
		description: "값을 서식을 지정하고 텍스트로 변환합니다",
		abstract: "값을 서식을 지정하고 텍스트로 변환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/text-function"
		}],
		functionParameter: {
			value: {
				name: "value",
				detail: "텍스트로 변환하려는 숫자 값입니다."
			},
			formatText: {
				name: "format_text",
				detail: "따옴표로 묶인 텍스트 문자열로 적용된 서식을 정의하는 텍스트 문자열입니다."
			}
		}
	},
	TEXTAFTER: {
		description: "지정된 문자 또는 문자열 뒤에 발생하는 텍스트를 반환합니다",
		abstract: "지정된 문자 또는 문자열 뒤에 발생하는 텍스트를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/textafter-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "검색하는 텍스트입니다. 와일드카드는 허용되지 않습니다."
			},
			delimiter: {
				name: "delimiter",
				detail: "텍스트를 추출할 지점을 표시합니다."
			},
			instanceNum: {
				name: "instance_num",
				detail: "구분 기호의 인스턴스입니다."
			},
			matchMode: {
				name: "match_mode",
				detail: "텍스트 검색이 대/소문자를 구분하는지 여부를 결정합니다. 기본값은 대/소문자 구분입니다."
			},
			matchEnd: {
				name: "match_end",
				detail: "구분 기호의 끝을 텍스트의 끝으로 처리합니다."
			},
			ifNotFound: {
				name: "if_not_found",
				detail: "일치하는 항목이 없을 때 반환되는 값입니다."
			}
		}
	},
	TEXTBEFORE: {
		description: "지정된 문자 또는 문자열 앞에 발생하는 텍스트를 반환합니다",
		abstract: "지정된 문자 또는 문자열 앞에 발생하는 텍스트를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/textbefore-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "검색하는 텍스트입니다. 와일드카드는 허용되지 않습니다."
			},
			delimiter: {
				name: "delimiter",
				detail: "텍스트를 추출할 지점을 표시합니다."
			},
			instanceNum: {
				name: "instance_num",
				detail: "구분 기호의 인스턴스입니다."
			},
			matchMode: {
				name: "match_mode",
				detail: "텍스트 검색이 대/소문자를 구분하는지 여부를 결정합니다. 기본값은 대/소문자 구분입니다."
			},
			matchEnd: {
				name: "match_end",
				detail: "구분 기호의 끝을 텍스트의 끝으로 처리합니다."
			},
			ifNotFound: {
				name: "if_not_found",
				detail: "일치하는 항목이 없을 때 반환되는 값입니다."
			}
		}
	},
	TEXTJOIN: {
		description: "여러 범위 및/또는 문자열의 텍스트를 결합하고 결합되는 각 텍스트 값 사이에 지정한 구분 기호를 포함합니다",
		abstract: "여러 범위 및/또는 문자열의 텍스트를 결합합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/textjoin-function"
		}],
		functionParameter: {
			delimiter: {
				name: "delimiter",
				detail: "텍스트 문자열 또는 빈 문자열로, 인수에 의해 지정된 각 문자열 사이에 삽입됩니다."
			},
			ignoreEmpty: {
				name: "ignore_empty",
				detail: "TRUE이면 빈 셀을 무시합니다."
			},
			text1: {
				name: "text1",
				detail: "결합할 텍스트 항목입니다. 문자열 또는 문자열의 배열(예: 셀 범위)일 수 있습니다."
			},
			text2: {
				name: "text2",
				detail: "결합할 추가 텍스트 항목입니다. text 인수는 최대 252개까지 가능합니다."
			}
		}
	},
	TEXTSPLIT: {
		description: "열 및 행 구분 기호를 사용하여 텍스트를 행 또는 열로 분할합니다",
		abstract: "열 및 행 구분 기호를 사용하여 텍스트를 행 또는 열로 분할합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/textsplit-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "분할하려는 텍스트입니다."
			},
			colDelimiter: {
				name: "col_delimiter",
				detail: "열로 분할할 지점을 표시합니다."
			},
			rowDelimiter: {
				name: "row_delimiter",
				detail: "행으로 분할할 지점을 표시합니다."
			},
			ignoreEmpty: {
				name: "ignore_empty",
				detail: "연속된 구분 기호를 무시할지 여부입니다. 기본값은 FALSE입니다."
			},
			matchMode: {
				name: "match_mode",
				detail: "텍스트 검색에서 대/소문자를 구분할지 여부를 지정합니다. 기본적으로 대/소문자를 구분합니다."
			},
			padWith: {
				name: "pad_with",
				detail: "누락된 값을 채울 값입니다. 기본적으로 #N/A입니다."
			}
		}
	},
	TRIM: {
		description: "텍스트에서 공백을 제거합니다",
		abstract: "텍스트에서 공백을 제거합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/trim-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "공백을 제거할 텍스트입니다."
		} }
	},
	UNICHAR: {
		description: "지정된 숫자 값으로 참조되는 유니코드 문자를 반환합니다",
		abstract: "지정된 숫자 값으로 참조되는 유니코드 문자를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/unichar-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "유니코드 번호입니다."
		} }
	},
	UNICODE: {
		description: "텍스트의 첫 문자에 해당하는 숫자(코드 포인트)를 반환합니다",
		abstract: "텍스트의 첫 문자에 해당하는 숫자(코드 포인트)를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/unicode-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "유니코드 값을 원하는 문자입니다."
		} }
	},
	UPPER: {
		description: "텍스트를 대문자로 변환합니다",
		abstract: "텍스트를 대문자로 변환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/upper-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "대문자로 변환하려는 텍스트입니다. 텍스트는 참조 또는 텍스트 문자열일 수 있습니다."
		} }
	},
	VALUE: {
		description: "텍스트 인수를 숫자로 변환합니다",
		abstract: "텍스트 인수를 숫자로 변환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/value-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "따옴표로 묶인 텍스트 또는 숫자로 변환하려는 텍스트가 포함된 셀에 대한 참조입니다."
		} }
	},
	VALUETOTEXT: {
		description: "지정된 값에서 텍스트를 반환합니다",
		abstract: "지정된 값에서 텍스트를 반환합니다",
		links: [{
			title: "사용법",
			url: "https://support.microsoft.com/ko-kr/excel/functions/valuetotext-function"
		}],
		functionParameter: {
			value: {
				name: "value",
				detail: "텍스트로 반환할 값입니다."
			},
			format: {
				name: "format",
				detail: "반환되는 데이터의 형식입니다. 0(기본값) 또는 1일 수 있습니다."
			}
		}
	},
	CALL: {
		description: "동적 링크 라이브러리 또는 코드 리소스에서 프로시저를 호출합니다. 이 함수에는 두 가지 구문 형식이 있습니다. REGISTER 함수의 인수를 사용하는 이전에 등록된 코드 리소스에서만 구문 1을 사용합니다. 구문 2a 또는 2b를 사용하여 코드 리소스를 동시에 등록하고 호출합니다.",
		abstract: "동적 링크 라이브러리 또는 코드 리소스에서 프로시저를 호출합니다. 이 함수에는 두 가지 구문 형식이 있습니다. REGISTER 함수의 인수를 사용하는 이전에 등록된 코드 리소스에서만 구문 1을 사용합니다. 구문 2a 또는 2b를 사용하여 코드 리소스를 동시에 등록하고 호출합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/call-function"
		}],
		functionParameter: {
			moduleText: {
				name: "Module_text",
				detail: "필수. 따옴표 붙은 텍스트로서, Windows용 Microsoft Excel의 프로시저를 포함하는 동적 연결 라이브러리의 이름을 지정합니다."
			},
			procedure: {
				name: "절차",
				detail: "필수. Windows용 Microsoft Excel의 DLL에서 함수의 이름을 지정하는 텍스트입니다. 모듈 정의 파일(.DEF)의 EXPORTS 문에 지정되어 있는 함수의 순서 값을 사용할 수도 있습니다. 순서 값은 텍스트 형식이 될 수 없습니다."
			},
			typeText: {
				name: "Type_text",
				detail: "필수. 반환 값의 데이터 형식과 DLL 또는 코드 리소스의 모든 인수 데이터 형식을 지정하는 텍스트입니다. type_text의 첫째 문자는 반환 값을 지정합니다. type_text에 사용하는 코드에 대한 자세한 내용을 보려면 CALL 및 REGISTER 함수 사용 을 참조하세요. 독립 실행형 DLL이나 코드 리소스(XLL)의 경우 이 인수를 생략할 수 있습니다."
			},
			argument1: {
				name: "Argument1,...",
				detail: "선택적. 프로시저에 전달될 인수입니다."
			}
		}
	},
	EUROCONVERT: {
		description: "숫자를 유로화로, 유로화에서 유로 회원국 통화로 또는 유로화를 매개 통화로 사용하여 숫자를 현재 유로 회원국 통화에서 다른 유로 회원국 통화로 변환(3각 변환)합니다. 변환할 수 있는 통화는 유로화를 채택한 유럽 연합(EU) 회원국들의 통화입니다. 이 함수는 EU에서 설정한 고정 변환율을 사용합니다.",
		abstract: "숫자를 유로화로, 유로화에서 유로 회원국 통화로 또는 유로화를 매개 통화로 사용하여 숫자를 현재 유로 회원국 통화에서 다른 유로 회원국 통화로 변환(3각 변환)합니다. 변환할 수 있는 통화는 유로화를 채택한 유럽 연합(EU) 회원국들의 통화입니다. 이 함수는 EU에서 설정한 고정 변환율을 사용합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/euroconvert-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "필수 요소입니다. 변환할 통화 값 또는 값이 들어 있는 셀에 대한 참조입니다."
			},
			source: {
				name: "소스",
				detail: "필수. 원본 통화에 대한 ISO 코드에 해당하는 세 자리 문자열 또는 그 문자열이 들어 있는 셀에 대한 참조입니다. EUROCONVERT 함수에서 사용할 수 있는 통화 코드는 다음과 같습니다."
			},
			target: {
				name: "대상",
				detail: "필수. 숫자를 변환할 대상 통화의 ISO 코드에 해당하는 세 자리 문자열 또는 셀 참조입니다. ISO 코드에 대해서는 앞에 나오는 원본 통화 관련 표를 참조하세요."
			},
			fullPrecision: {
				name: "Full_precision",
				detail: "필수. 결과를 표시하는 방법을 지정하는 논리값(TRUE, FALSE) 또는 TRUE나 FALSE 값을 나타내는 식입니다."
			},
			triangulationPrecision: {
				name: "Triangulation_precision",
				detail: "필수. 두 유로 회원국 통화 간 변환을 할 때 매개 유로 값에 사용될 유효 자릿수를 지정하는 3보다 크거나 같은 정수입니다. 이 인수를 생략하면 Excel에서 매개 유로 값은 반올림되지 않습니다. 유로 회원국 통화를 유로화로 변환할 때 이 인수를 포함하면 유로 회원국 통화로 변환될 수 있는 매개 유로 값이 계산됩니다."
			}
		}
	},
	REGISTER_ID: {
		description: "지정한 DLL(동적 연결 라이브러리) 또는 이전에 등록한 코드 리소스의 레지스터 ID를 반환합니다. DLL이나 코드 리소스가 등록되지 않았으면 DLL이나 코드 리소스를 등록한 후 레지스터 ID를 반환합니다.",
		abstract: "지정한 DLL(동적 연결 라이브러리) 또는 이전에 등록한 코드 리소스의 레지스터 ID를 반환합니다. DLL이나 코드 리소스가 등록되지 않았으면 DLL이나 코드 리소스를 등록한 후 레지스터 ID를 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/register-id-function"
		}],
		functionParameter: {
			moduleText: {
				name: "Module_text",
				detail: "필수. Windows용 Microsoft Excel에서 함수가 포함된 DLL의 이름을 지정하는 텍스트입니다."
			},
			procedure: {
				name: "절차",
				detail: "필수. Windows용 Microsoft Excel의 DLL에서 함수의 이름을 지정하는 텍스트입니다. 모듈 정의 파일(.DEF)의 EXPORTS 문에 지정되어 있는 함수의 순서 값을 사용할 수도 있습니다. 서수 값이나 리소스 ID 번호는 텍스트 형식이 될 수 없습니다."
			},
			typeText: {
				name: "Type_text",
				detail: "선택적. 반환 값의 데이터 형식과 DLL의 모든 인수 데이터 형식을 지정하는 텍스트입니다. type_text의 첫째 문자는 반환 값을 지정합니다. 함수나 코드 리소스가 이미 등록된 경우에는 이 인수를 생략할 수 있습니다."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/univer/ko-KR.ts
const locale$2 = {};

//#endregion
//#region src/locale/function-list/web/ko-KR.ts
const locale$1 = {
	ENCODEURL: {
		description: "ENCODEURL 함수는 URL로 인코딩된 문자열을 반환하여 영숫자가 아닌 특정 문자를 백분율 기호(%) 및 16진수 숫자로 바꿉니다.",
		abstract: "ENCODEURL 함수는 URL로 인코딩된 문자열을 반환하여 영숫자가 아닌 특정 문자를 백분율 기호(%) 및 16진수 숫자로 바꿉니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/encodeurl-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "URL로 인코딩할 문자열"
		} }
	},
	FILTERXML: {
		description: "FILTERXML 함수는 지정된 xpath를 사용하여 XML 콘텐츠에서 특정 데이터를 반환합니다.",
		abstract: "FILTERXML 함수는 지정된 xpath를 사용하여 XML 콘텐츠에서 특정 데이터를 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/filterxml-function"
		}],
		functionParameter: {
			xml: {
				name: "xml",
				detail: "유효한 XML 형식의 문자열입니다."
			},
			xpath: {
				name: "xpath",
				detail: "표준 XPath 형식의 문자열입니다."
			}
		}
	},
	WEBSERVICE: {
		description: "WEBSERVICE 함수는 인터넷 또는 인트라넷의 웹 서비스에서 데이터를 반환합니다.",
		abstract: "WEBSERVICE 함수는 인터넷 또는 인트라넷의 웹 서비스에서 데이터를 반환합니다.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ko-kr/excel/functions/webservice-function"
		}],
		functionParameter: { url: {
			name: "url",
			detail: "웹 서비스의 URL입니다."
		} }
	}
};

//#endregion
//#region src/locale/ko-KR.ts
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