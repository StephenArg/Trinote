//#region src/locale/ko-KR.ts
const locale = { "data-validation": {
	operators: {
		between: "사이",
		greaterThan: "초과",
		greaterThanOrEqual: "이상",
		lessThan: "미만",
		lessThanOrEqual: "이하",
		equal: "같음",
		notEqual: "같지 않음",
		notBetween: "사이가 아님"
	},
	ruleName: {
		between: "{FORMULA1}와 {FORMULA2} 사이",
		greaterThan: "{FORMULA1} 초과",
		greaterThanOrEqual: "{FORMULA1} 이상",
		lessThan: "{FORMULA1} 미만",
		lessThanOrEqual: "{FORMULA1} 이하",
		equal: "{FORMULA1}와 같음",
		notEqual: "{FORMULA1}와 다름",
		notBetween: "{FORMULA1}와 {FORMULA2} 사이 아님",
		legal: "유효한 {TYPE} 형식"
	},
	errorMsg: {
		between: "값은 {FORMULA1}와 {FORMULA2} 사이여야 합니다",
		greaterThan: "값은 {FORMULA1} 초과여야 합니다",
		greaterThanOrEqual: "값은 {FORMULA1} 이상이어야 합니다",
		lessThan: "값은 {FORMULA1} 미만이어야 합니다",
		lessThanOrEqual: "값은 {FORMULA1} 이하이어야 합니다",
		equal: "값은 {FORMULA1}와 같아야 합니다",
		notEqual: "값은 {FORMULA1}와 달라야 합니다",
		notBetween: "값은 {FORMULA1}와 {FORMULA2} 사이가 아니어야 합니다",
		legal: "값은 유효한 {TYPE} 형식이어야 합니다"
	}
} };

//#endregion
export { locale as default };