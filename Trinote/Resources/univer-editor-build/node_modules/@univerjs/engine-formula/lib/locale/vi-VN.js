//#region src/locale/function-list/array/vi-VN.ts
const locale$15 = {
	ARRAY_CONSTRAIN: {
		description: "Ràng buộc giá trị mảng vào một kích thước chỉ định sẵn.",
		abstract: "Ràng buộc giá trị mảng vào một kích thước chỉ định sẵn.",
		links: [{
			title: "Giảng dạy",
			url: "https://support.google.com/docs/answer/3267036?hl=vi"
		}],
		functionParameter: {
			inputRange: {
				name: "mảng",
				detail: "Dải ô giới hạn."
			},
			numRows: {
				name: "số hàng",
				detail: "Số hàng mà kết quả cần có."
			},
			numCols: {
				name: "số cột",
				detail: "Số cột mà kết quả cần có"
			}
		}
	},
	FLATTEN: {
		description: "Làm phẳng tất cả giá trị trong một hoặc nhiều dải ô thành một cột duy nhất.",
		abstract: "Làm phẳng tất cả giá trị trong một hoặc nhiều dải ô thành một cột duy nhất.",
		links: [{
			title: "Giảng dạy",
			url: "https://support.google.com/docs/answer/10307761?hl=vi"
		}],
		functionParameter: {
			range1: {
				name: "dải ô 1",
				detail: "Dải ô đầu tiên cần làm phẳng."
			},
			range2: {
				name: "dải ô 2",
				detail: "[không bắt buộc] có thể lặp lại Các dải ô bổ sung để làm phẳng."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/compatibility/vi-VN.ts
const locale$14 = {
	BETADIST: {
		description: "Trả về hàm mật độ xác suất beta lũy tích. Phân bố beta thường được dùng để nghiên cứu sự biến thiên theo tỷ lệ phần trăm của một số thứ qua các mẫu, chẳng hạn như thời gian trong ngày mà người ta dành để xem ti vi.",
		abstract: "Trả về hàm mật độ xác suất beta lũy tích. Phân bố beta thường được dùng để nghiên cứu sự biến thiên theo tỷ lệ phần trăm của một số thứ qua các mẫu, chẳng hạn như thời gian trong ngày mà người ta dành để xem ti vi.",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/betadist-function"
		}],
		functionParameter: {
			x: {
				name: "số",
				detail: "buộc. Giá trị giữa A và B dùng để định trị hàm."
			},
			alpha: {
				name: "alpha",
				detail: "Yêu cầu. Một tham biến của phân phối."
			},
			beta: {
				name: "beta",
				detail: "Yêu cầu. Một tham biến của phân phối."
			},
			A: {
				name: "giới hạn dưới",
				detail: "Tùy chọn. Cận dưới của khoảng x."
			},
			B: {
				name: "giới hạn trên",
				detail: "chọn. Cận trên của khoảng x."
			}
		}
	},
	BETAINV: {
		description: "Trả về giá trị nghịch đảo của hàm mật độ xác suất beta lũy tích cho một phân bố beta đã xác định. Tức là, nếu xác suất = BETADIST(x,...) thì BETAINV(xác suất,...) = x. Có thể dùng phân bố beta trong lập kế hoạch dự án để làm mẫu thời gian có thể hoàn thành trên cơ sở thời gian dự kiến và khả năng có sự thay đổi.",
		abstract: "Trả về giá trị nghịch đảo của hàm mật độ xác suất beta lũy tích cho một phân bố beta đã xác định. Tức là, nếu xác suất = BETADIST(x,...) thì BETAINV(xác suất,...) = x. Có thể dùng phân bố beta trong lập kế hoạch dự án để làm mẫu thời gian có thể hoàn thành trên cơ sở thời gian dự kiến và khả năng có sự thay đổi.",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/betainv-function"
		}],
		functionParameter: {
			probability: {
				name: "xác suất",
				detail: "Yêu cầu. Xác suất gắn với phân bố beta."
			},
			alpha: {
				name: "alpha",
				detail: "Yêu cầu. Một tham biến của phân phối."
			},
			beta: {
				name: "beta",
				detail: "Yêu cầu. Tham số phân bố."
			},
			A: {
				name: "giới hạn dưới",
				detail: "Tùy chọn. Cận dưới của khoảng x."
			},
			B: {
				name: "giới hạn trên",
				detail: "chọn. Cận trên của khoảng x."
			}
		}
	},
	BINOMDIST: {
		description: "Trả về xác suất phân bố nhị thức của thuật ngữ riêng lẻ. Hãy dùng BINOMDIST trong các vấn đề có số lượng kiểm định hoặc phép thử ấn định khi kết quả của bất kỳ phép thử nào chỉ là thành công hay thất bại, khi các phép thử là độc lập và khi xác suất thành công không đổi trong suốt quá trình thử nghiệm. Ví dụ, BINOMDIST có thể tính toán xác suất rằng hai trong số ba em bé tiếp theo là bé trai.",
		abstract: "Trả về xác suất phân bố nhị thức của thuật ngữ riêng lẻ. Hãy dùng BINOMDIST trong các vấn đề có số lượng kiểm định hoặc phép thử ấn định khi kết quả của bất kỳ phép thử nào chỉ là thành công hay thất bại, khi các phép thử là độc lập và khi xác suất thành công không đổi trong suốt quá trình thử nghiệm. Ví dụ, BINOMDIST có thể tính toán xác suất rằng hai trong số ba em bé tiếp theo là bé trai.",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/binomdist-function"
		}],
		functionParameter: {
			numberS: {
				name: "số lần thành công",
				detail: "Yêu cầu. Số lần thành công trong các phép thử."
			},
			trials: {
				name: "số phép thử",
				detail: "Yêu cầu. Số phép thử độc lập."
			},
			probabilityS: {
				name: "xác suất thành công",
				detail: "Yêu cầu. Xác suất thành công của mỗi phép thử."
			},
			cumulative: {
				name: "tích lũy",
				detail: "Yêu cầu. Một giá trị lô-gic quyết định dạng thức của hàm. Nếu lũy tích là ĐÚNG thì BINOMDIST trả về hàm phân bố lũy tích, là xác suất có nhiều nhất số lần thành công; nếu SAI, nó trả về hàm khối xác suất, là xác suất có số lần thành công."
			}
		}
	},
	CHIDIST: {
		description: "Trả về xác suất đầu bên phải của phân bố khi bình phương. Phân bố χ2 gắn với kiểm thử χ2. Hãy dùng kiểm thử χ2 để so sánh các giá trị quan sát được và dự kiến. Ví dụ, thí nghiệm di truyền có thể đưa ra giả thuyết rằng thế hệ tiếp theo của cây trồng sẽ có một bộ màu nhất định. Bằng cách so sánh kết quả quan sát được với kết quả dự kiến, bạn có thể xác định giả thuyết ban đầu của mình có hợp lệ hay không.",
		abstract: "Trả về xác suất đầu bên phải của phân bố khi bình phương. Phân bố χ2 gắn với kiểm thử χ2. Hãy dùng kiểm thử χ2 để so sánh các giá trị quan sát được và dự kiến. Ví dụ, thí nghiệm di truyền có thể đưa ra giả thuyết rằng thế hệ tiếp theo của cây trồng sẽ có một bộ màu nhất định. Bằng cách so sánh kết quả quan sát được với kết quả dự kiến, bạn có thể xác định giả thuyết ban đầu của mình có hợp lệ hay không.",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/chidist-function"
		}],
		functionParameter: {
			x: {
				name: "số",
				detail: "buộc. Giái trị bạn muốn đánh giá phân phối."
			},
			degFreedom: {
				name: "bậc tự do",
				detail: "Yêu cầu. Số bậc tự do."
			}
		}
	},
	CHIINV: {
		description: "Trả về giá trị nghịch đảo của xác suất đầu bên phải của phân bố khi bình phương. Nếu xác suất = CHIDIST(x,...) thì CHIINV(xác suất,...) = x. Hãy dùng hàm này để so sánh kết quả quan sát được với kết quả dự kiến để xác định giả thuyết ban đầu của bạn có hợp lệ hay không.",
		abstract: "Trả về giá trị nghịch đảo của xác suất đầu bên phải của phân bố khi bình phương. Nếu xác suất = CHIDIST(x,...) thì CHIINV(xác suất,...) = x. Hãy dùng hàm này để so sánh kết quả quan sát được với kết quả dự kiến để xác định giả thuyết ban đầu của bạn có hợp lệ hay không.",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/chiinv-function"
		}],
		functionParameter: {
			probability: {
				name: "xác suất",
				detail: "Yêu cầu. Xác suất gắn với phân bố khi bình phương."
			},
			degFreedom: {
				name: "bậc tự do",
				detail: "Yêu cầu. Số bậc tự do."
			}
		}
	},
	CHITEST: {
		description: "Trả về kiểm định tính độc lập. CHITEST trả về giá trị từ phân bố (χ2) khi bình phương cho thống kê và bậc tự do phù hợp. Bạn có thể dùng kiểm định χ2 để xác định kết quả được giả thuyết có được thí nghiệm xác nhận hay không.",
		abstract: "Trả về kiểm định tính độc lập. CHITEST trả về giá trị từ phân bố (χ2) khi bình phương cho thống kê và bậc tự do phù hợp. Bạn có thể dùng kiểm định χ2 để xác định kết quả được giả thuyết có được thí nghiệm xác nhận hay không.",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/chitest-function"
		}],
		functionParameter: {
			actualRange: {
				name: "phạm vi quan sát",
				detail: "Yêu cầu. Phạm vi dữ liệu chứa các quan sát để kiểm thử đối với các giá trị dự kiến."
			},
			expectedRange: {
				name: "phạm vi dự kiến",
				detail: "Yêu cầu. Phạm vi dữ liệu chứa tỷ lệ của phép nhân tổng hàng và tổng cột với tổng cộng."
			}
		}
	},
	CONFIDENCE: {
		description: "Trả về khoảng tin cậy của trung bình tổng thể, bằng cách dùng phân bố chuẩn hóa.",
		abstract: "Trả về khoảng tin cậy của trung bình tổng thể, bằng cách dùng phân bố chuẩn hóa.",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/confidence-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "Yêu cầu. Mức quan trọng được dùng để tính toán mức tin cậy. Mức tin cậy bằng 100*(1 - alpha)%, hay nói cách khác, alpha 0,05 cho biết mức tin cậy 95 phần trăm."
			},
			standardDev: {
				name: "Độ lệch chuẩn tổng",
				detail: "Yêu cầu. Độ lệch chuẩn tổng thể cho phạm vi dữ liệu và được giả định là đã được xác định."
			},
			size: {
				name: "cỡ mẫu",
				detail: "Yêu cầu. Cỡ mẫu."
			}
		}
	},
	COVAR: {
		description: "Trả về hiệp phương sai, trung bình tích của các độ lệch cho mỗi cặp điểm dữ liệu trong hai tập dữ liệu.",
		abstract: "Trả về hiệp phương sai, trung bình tích của các độ lệch cho mỗi cặp điểm dữ liệu trong hai tập dữ liệu.",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/covar-function"
		}],
		functionParameter: {
			array1: {
				name: "mảng 1",
				detail: "Yêu cầu. Phạm vi ô thứ nhất chứa các số nguyên."
			},
			array2: {
				name: "mảng 2",
				detail: "Yêu cầu. Phạm vi ô thứ hai chứa các số nguyên."
			}
		}
	},
	CRITBINOM: {
		description: "Trả về giá trị nhỏ nhất sao cho phân bố nhị thức lũy tích lớn hơn hoặc bằng một giá trị tiêu chí. Dùng hàm này cho các ứng dụng bảo đảm chất lượng. Ví dụ, dùng hàm CRITBINOM để xác định số lượng bộ phận bị hỏng lớn nhất được cho phép để chạy dây chuyền lắp ráp mà không từ chối toàn bộ lô hàng.",
		abstract: "Trả về giá trị nhỏ nhất sao cho phân bố nhị thức lũy tích lớn hơn hoặc bằng một giá trị tiêu chí. Dùng hàm này cho các ứng dụng bảo đảm chất lượng. Ví dụ, dùng hàm CRITBINOM để xác định số lượng bộ phận bị hỏng lớn nhất được cho phép để chạy dây chuyền lắp ráp mà không từ chối toàn bộ lô hàng.",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/critbinom-function"
		}],
		functionParameter: {
			trials: {
				name: "số phép thử",
				detail: "Yêu cầu. Số phép thử Bernoulli."
			},
			probabilityS: {
				name: "xác suất thành công",
				detail: "Yêu cầu. Xác suất thành công của mỗi phép thử."
			},
			alpha: {
				name: "xác suất mục tiêu",
				detail: "Yêu cầu. Giá trị tiêu chí."
			}
		}
	},
	EXPONDIST: {
		description: "Trả về phân bố hàm mũ. Dùng hàm EXPONDIST để làm mẫu thời gian giữa các sự kiện, chẳng hạn như máy rút tiền tự động cần bao nhiêu thời gian để giao tiền mặt. Ví dụ, bạn có thể dùng hàm EXPONDIST để xác định xác suất quá trình này diễn ra trong nhiều nhất là 1 phút.",
		abstract: "Trả về phân bố hàm mũ. Dùng hàm EXPONDIST để làm mẫu thời gian giữa các sự kiện, chẳng hạn như máy rút tiền tự động cần bao nhiêu thời gian để giao tiền mặt. Ví dụ, bạn có thể dùng hàm EXPONDIST để xác định xác suất quá trình này diễn ra trong nhiều nhất là 1 phút.",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/expondist-function"
		}],
		functionParameter: {
			x: {
				name: "số",
				detail: "buộc. Giá trị của hàm."
			},
			lambda: {
				name: "lambda",
				detail: "Yêu cầu. Giá trị tham số."
			},
			cumulative: {
				name: "tích lũy",
				detail: "Yêu cầu. Giá trị lô-gic cho biết cung cấp kiểu hàm mũ nào. Nếu cumulative là TRUE, hàm EXPONDIST trả về hàm phân bố lũy tích; nếu FALSE, nó trả về hàm mật độ xác suất."
			}
		}
	},
	FDIST: {
		description: "Trả về phân bố xác suất (mức đa dạng) F (bên phải) cho hai tập dữ liệu. Bạn có thể dùng hàm này để xác định hai tập dữ liệu có mức đa dạng khác nhau hay không. Ví dụ, bạn có thể xem xét điểm kiểm tra của học sinh nam và học sinh nữ tại trường trung học và xác định mức biến đổi trong học sinh nữ có khác với mức đó trong học sinh nam không.",
		abstract: "Trả về phân bố xác suất (mức đa dạng) F (bên phải) cho hai tập dữ liệu. Bạn có thể dùng hàm này để xác định hai tập dữ liệu có mức đa dạng khác nhau hay không. Ví dụ, bạn có thể xem xét điểm kiểm tra của học sinh nam và học sinh nữ tại trường trung học và xác định mức biến đổi trong học sinh nữ có khác với mức đó trong học sinh nam không.",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/fdist-function"
		}],
		functionParameter: {
			x: {
				name: "số",
				detail: "buộc. Giá trị để đánh giá hàm."
			},
			degFreedom1: {
				name: "bậc tự do ở tử số",
				detail: "Yêu cầu. Bậc tự do ở tử số."
			},
			degFreedom2: {
				name: "bậc tự do ở mẫu số.",
				detail: "Yêu cầu. Bậc tự do ở mẫu số."
			}
		}
	},
	FINV: {
		description: "Trả về nghịch đảo của phân bố xác suất F (đầu bên phải). Nếu p = FDIST(x,...), thì FINV(p,...) = x.",
		abstract: "Trả về nghịch đảo của phân bố xác suất F (đầu bên phải). Nếu p = FDIST(x,...), thì FINV(p,...) = x.",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/finv-function"
		}],
		functionParameter: {
			probability: {
				name: "xác suất",
				detail: "Yêu cầu. Xác suất gắn với phân bố lũy tích F."
			},
			degFreedom1: {
				name: "bậc tự do ở tử số",
				detail: "Yêu cầu. Bậc tự do ở tử số."
			},
			degFreedom2: {
				name: "bậc tự do ở mẫu số.",
				detail: "Yêu cầu. Bậc tự do ở mẫu số."
			}
		}
	},
	FTEST: {
		description: "Trả về kết quả của kiểm tra F-test. Một kiểm tra F-test trả về xác suất hai đầu mà phương sai trong array1 và array1 khác nhau không đáng kể. Dùng hàm này để xác định xem hai mẫu có các phương sai khác nhau không. Ví dụ, biết điểm kiểm tra của các trường công lập và trường tư thục, bạn có thể kiểm tra xem những trường này có các mức điểm số kiểm tra khác nhau hay không.",
		abstract: "Trả về kết quả của kiểm tra F-test. Một kiểm tra F-test trả về xác suất hai đầu mà phương sai trong array1 và array1 khác nhau không đáng kể. Dùng hàm này để xác định xem hai mẫu có các phương sai khác nhau không. Ví dụ, biết điểm kiểm tra của các trường công lập và trường tư thục, bạn có thể kiểm tra xem những trường này có các mức điểm số kiểm tra khác nhau hay không.",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/ftest-function"
		}],
		functionParameter: {
			array1: {
				name: "mảng 1",
				detail: "Yêu cầu. Mảng thứ nhất của phạm vi dữ liệu."
			},
			array2: {
				name: "mảng 2",
				detail: "Yêu cầu. Mảng thứ hai của phạm vi dữ liệu."
			}
		}
	},
	GAMMADIST: {
		description: "Trả về phân bố gamma. Bạn có thể dùng hàm này để nghiên cứu các biến số có thể có phân bố lệch. Phân bố gamma thường được dùng trong phân tích hàng đợi.",
		abstract: "Trả về phân bố gamma. Bạn có thể dùng hàm này để nghiên cứu các biến số có thể có phân bố lệch. Phân bố gamma thường được dùng trong phân tích hàng đợi.",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/gammadist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "buộc. Giái trị bạn muốn đánh giá phân phối."
			},
			alpha: {
				name: "alpha",
				detail: "Yêu cầu. Một tham biến tới phân phối."
			},
			beta: {
				name: "beta",
				detail: "Yêu cầu. Một tham biến tới phân phối. Nếu beta = 1, GAMMADIST trả về phân bố gamma chuẩn."
			},
			cumulative: {
				name: "tích lũy",
				detail: "Yêu cầu. Một giá trị lô-gic quyết định dạng thức của hàm. Nếu tích lũy là TRUE, hàm GAMMADIST trả về hàm phân bố tích lũy; nếu FALSE, nó trả về hàm mật độ xác suất."
			}
		}
	},
	GAMMAINV: {
		description: "Trả về giá trị đảo của phân bố lũy tích gamma. Nếu p = GAMMADIST(x,...), thì GAMMAINV(p,...) = x. Bạn có thể dùng hàm này để nghiên cứu các biến số mà phân bố của chúng có thể là đối xứng lệch.",
		abstract: "Trả về giá trị đảo của phân bố lũy tích gamma. Nếu p = GAMMADIST(x,...), thì GAMMAINV(p,...) = x. Bạn có thể dùng hàm này để nghiên cứu các biến số mà phân bố của chúng có thể là đối xứng lệch.",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/gammainv-function"
		}],
		functionParameter: {
			probability: {
				name: "xác suất",
				detail: "Yêu cầu. Xác xuất gắn với phân bố gamma."
			},
			alpha: {
				name: "alpha",
				detail: "Yêu cầu. Một tham biến tới phân phối."
			},
			beta: {
				name: "beta",
				detail: "Yêu cầu. Một tham biến tới phân phối. Nếu beta = 1, GAMMAINV trả về phân bố gamma chuẩn."
			}
		}
	},
	HYPGEOMDIST: {
		description: "Trả về phân bố siêu bội. Hàm HYPGEOMDIST trả về xác suất của số lần thành công mẫu đã biết, biết trước kích thước mẫu, thành công của tập hợp và kích cỡ của tập hợp. Dùng hàm HYPGEOMDIST cho các vấn đề về tập hợp hữu hạn, trong đó mỗi quan sát có thể là thành công hoặc thất bại và trong đó mỗi tập con có kích thước đã biết được chọn với khả năng như nhau.",
		abstract: "Trả về phân bố siêu bội. Hàm HYPGEOMDIST trả về xác suất của số lần thành công mẫu đã biết, biết trước kích thước mẫu, thành công của tập hợp và kích cỡ của tập hợp. Dùng hàm HYPGEOMDIST cho các vấn đề về tập hợp hữu hạn, trong đó mỗi quan sát có thể là thành công hoặc thất bại và trong đó mỗi tập con có kích thước đã biết được chọn với khả năng như nhau.",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/hypgeomdist-function"
		}],
		functionParameter: {
			sampleS: {
				name: "Số lần thành công mẫu",
				detail: "Yêu cầu. Số lần thành công trong mẫu."
			},
			numberSample: {
				name: "Kích thước mẫu",
				detail: "Yêu cầu. Kích thước của mẫu."
			},
			populationS: {
				name: "Tổng số thành công",
				detail: "Yêu cầu. Số lần thành công trong tập hợp."
			},
			numberPop: {
				name: "Kích thước tổng thể",
				detail: "Yêu cầu. Kích thước của tập hợp."
			}
		}
	},
	LOGINV: {
		description: "Trả về nghịch đảo của hàm phân phối lô-ga-rit chuẩn lũy tích của x, trong đó ln(x) thường được phân bố với tham số trung bình và độ lệch chuẩn. Nếu p = LOGNORMDIST(x,...), khi đó LOGINV(p,...) = x.",
		abstract: "Trả về nghịch đảo của hàm phân phối lô-ga-rit chuẩn lũy tích của x, trong đó ln(x) thường được phân bố với tham số trung bình và độ lệch chuẩn. Nếu p = LOGNORMDIST(x,...), khi đó LOGINV(p,...) = x.",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/loginv-function"
		}],
		functionParameter: {
			probability: {
				name: "xác suất",
				detail: "Yêu cầu. Một xác suất gắn với phân bố lô-ga-rit chuẩn."
			},
			mean: {
				name: "trung độ số",
				detail: "Yêu cầu. Trung bình của ln(x)."
			},
			standardDev: {
				name: "Độ lệch chuẩn",
				detail: "Yêu cầu. Độ lệch chuẩn của ln(x)."
			}
		}
	},
	LOGNORMDIST: {
		description: "Trả về phân bố chuẩn lô-ga-rít lũy tích của x, trong đó ln(x) thường được phân bố với trung bình tham số và độ lệch chuẩn. Dùng hàm này để phân tích những dữ liệu đã được biến đổi theo lô-ga-rit.",
		abstract: "Trả về phân bố chuẩn lô-ga-rít lũy tích của x, trong đó ln(x) thường được phân bố với trung bình tham số và độ lệch chuẩn. Dùng hàm này để phân tích những dữ liệu đã được biến đổi theo lô-ga-rit.",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/lognormdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "buộc. Giá trị để đánh giá hàm."
			},
			mean: {
				name: "trung độ số",
				detail: "Yêu cầu. Trung bình của ln(x)."
			},
			standardDev: {
				name: "Độ lệch chuẩn",
				detail: "Yêu cầu. Độ lệch chuẩn của ln(x)."
			}
		}
	},
	MODE: {
		description: "Giả sử bạn muốn tìm hiểu số lượng loài chim phổ biến nhất bị nhìn thấy trong một mẫu số lượng chim tại một vùng ngập nước quan trọng trong khoảng thời gian 30 năm, hoặc bạn muốn tìm số lượng cuộc gọi điện thoại thường xuyên nhất tại một trung tâm hỗ trợ qua điện thoại trong giờ thấp điểm. Để tính toán chế độ của một nhóm số, hãy sử dụng hàm MODE .",
		abstract: "Giả sử bạn muốn tìm hiểu số lượng loài chim phổ biến nhất bị nhìn thấy trong một mẫu số lượng chim tại một vùng ngập nước quan trọng trong khoảng thời gian 30 năm, hoặc bạn muốn tìm số lượng cuộc gọi điện thoại thường xuyên nhất tại một trung tâm hỗ trợ qua điện thoại trong giờ thấp điểm. Để tính toán chế độ của một nhóm số, hãy sử dụng hàm MODE .",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/mode-function"
		}],
		functionParameter: {
			number1: {
				name: "số 1",
				detail: "Yêu cầu. Đối số dạng số đầu tiên cho những gì bạn muốn tính số yếu vị."
			},
			number2: {
				name: "số 2",
				detail: "Tùy chọn. Các đối số dạng số từ 2 tới 255 mà bạn muốn tính toán số yếu vị trong đó. Bạn cũng có thể sử dụng một mảng đơn hay tham chiếu tới một mảng thay thế cho các đối số được phân tách bởi dấu phẩy."
			}
		}
	},
	NEGBINOMDIST: {
		description: "Trả về phân bố nhị thức âm. Hàm NEGBINOMDIST trả về xác suất sẽ có number_f lần thất bại trước thành công thứ number_s, khi xác suất không đổi của một lần thành công là probability_s. Hàm này tương tự như phân bố nhị thức, ngoại trừ việc số lần thành công được cố định và số lần thử biến đổi. Giống như phân bố nhị thức, số lần thử được giả định là độc lập.",
		abstract: "Trả về phân bố nhị thức âm. Hàm NEGBINOMDIST trả về xác suất sẽ có number_f lần thất bại trước thành công thứ number_s, khi xác suất không đổi của một lần thành công là probability_s. Hàm này tương tự như phân bố nhị thức, ngoại trừ việc số lần thành công được cố định và số lần thử biến đổi. Giống như phân bố nhị thức, số lần thử được giả định là độc lập.",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/negbinomdist-function"
		}],
		functionParameter: {
			numberF: {
				name: "số lần thất bại.",
				detail: "Yêu cầu. Số lần thất bại."
			},
			numberS: {
				name: "số lần thành công",
				detail: "Yêu cầu. Số ngưỡng thành công."
			},
			probabilityS: {
				name: "xác suất thành công",
				detail: "Yêu cầu. Xác suất thành công."
			}
		}
	},
	NORMDIST: {
		description: "Hàm NORMDIST trả về phân bố chuẩn cho độ lệch chuẩn và giá trị trung độ đã xác định. Hàm này có một loạt các ứng dụng trong thống kê, bao gồm kiểm tra giả thuyết.",
		abstract: "Hàm NORMDIST trả về phân bố chuẩn cho độ lệch chuẩn và giá trị trung độ đã xác định. Hàm này có một loạt các ứng dụng trong thống kê, bao gồm kiểm tra giả thuyết.",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/normdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "buộc. Giá trị mà bạn muốn có phân bố của nó"
			},
			mean: {
				name: "trung độ số",
				detail: "Yêu cầu. Trung bình số học của phân bố"
			},
			standardDev: {
				name: "Độ lệch chuẩn",
				detail: "Yêu cầu. Độ lệch chuẩn của phân bố"
			},
			cumulative: {
				name: "tích lũy",
				detail: "Yêu cầu. Một giá trị lô-gic quyết định dạng thức của hàm. Nếu lũy tích là TRUE, thì hàm NORMDIST trả về hàm phân bố lũy tích; nếu lũy tích là FALSE, nó trả về hàm khối xác suất."
			}
		}
	},
	NORMINV: {
		description: "Trả về nghịch đảo của phân bố lũy tích chuẩn với độ lệch chuẩn và giá trị trung độ đã xác định.",
		abstract: "Trả về nghịch đảo của phân bố lũy tích chuẩn với độ lệch chuẩn và giá trị trung độ đã xác định.",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/norminv-function"
		}],
		functionParameter: {
			probability: {
				name: "xác suất",
				detail: "Yêu cầu. Một xác suất tương ứng với phân bố chuẩn."
			},
			mean: {
				name: "trung độ số",
				detail: "Yêu cầu. Trung độ số học của phân phối."
			},
			standardDev: {
				name: "Độ lệch chuẩn",
				detail: "Yêu cầu. Độ lệch chuẩn của phân phối."
			}
		}
	},
	NORMSDIST: {
		description: "Trả về hàm phân bố lũy tích chuẩn chuẩn hóa. Phân bố có giá trị trung độ bằng 0 (không) và độ lệch chuẩn là một. Dùng hàm này thay cho bảng chứa các vùng đường cong chuẩn chuẩn hóa.",
		abstract: "Trả về hàm phân bố lũy tích chuẩn chuẩn hóa. Phân bố có giá trị trung độ bằng 0 (không) và độ lệch chuẩn là một. Dùng hàm này thay cho bảng chứa các vùng đường cong chuẩn chuẩn hóa.",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/normsdist-function"
		}],
		functionParameter: { z: {
			name: "z",
			detail: "buộc. Giá trị mà bạn muốn có phân bố của nó."
		} }
	},
	NORMSINV: {
		description: "Trả về giá trị đảo của phân bố lũy tích chuẩn chuẩn hóa. Phân bố có giá trị trung bình bằng không và độ lệch chuẩn là một.",
		abstract: "Trả về giá trị đảo của phân bố lũy tích chuẩn chuẩn hóa. Phân bố có giá trị trung bình bằng không và độ lệch chuẩn là một.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/normsinv-function"
		}],
		functionParameter: { probability: {
			name: "xác suất",
			detail: "Yêu cầu. Một xác suất tương ứng với phân bố chuẩn."
		} }
	},
	PERCENTILE: {
		description: "Trả về phân vị thứ k của các giá trị trong phạm vi. Bạn có thể dùng hàm này để thiết lập ngưỡng chấp nhận. Ví dụ, bạn có thể quyết định kiểm tra những ứng viên đạt điểm cao hơn phân vị thứ 90.",
		abstract: "Trả về phân vị thứ k của các giá trị trong phạm vi. Bạn có thể dùng hàm này để thiết lập ngưỡng chấp nhận. Ví dụ, bạn có thể quyết định kiểm tra những ứng viên đạt điểm cao hơn phân vị thứ 90.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/percentile-function"
		}],
		functionParameter: {
			array: {
				name: "mảng",
				detail: "Yêu cầu. Mảng hoặc phạm vi dữ liệu xác định vị trí tương đối."
			},
			k: {
				name: "k",
				detail: "buộc. Giá trị phân vị trong phạm vi 0..1, bao gồm cả 0 và 1."
			}
		}
	},
	PERCENTRANK: {
		description: "Hàm PERCENTRANK trả về thứ hạng của một giá trị trong tập dữ liệu dưới dạng tỷ lệ phần trăm của tập dữ liệu -- về cơ bản, vị trí tương đối của một giá trị trong toàn bộ tập dữ liệu. Ví dụ, bạn có thể dùng hàm PERCENTRANK để xác định vị thế của điểm kiểm tra của một cá nhân trong số tất cả các điểm số của cùng một bài kiểm tra.",
		abstract: "Hàm PERCENTRANK trả về thứ hạng của một giá trị trong tập dữ liệu dưới dạng tỷ lệ phần trăm của tập dữ liệu -- về cơ bản, vị trí tương đối của một giá trị trong toàn bộ tập dữ liệu. Ví dụ, bạn có thể dùng hàm PERCENTRANK để xác định vị thế của điểm kiểm tra của một cá nhân trong số tất cả các điểm số của cùng một bài kiểm tra.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/percentrank-function"
		}],
		functionParameter: {
			array: {
				name: "mảng",
				detail: "Yêu cầu. Phạm vi dữ liệu (hoặc mảng xác định trước) của các giá trị số trong đó thứ hạng phần trăm được xác định."
			},
			x: {
				name: "x",
				detail: "buộc. Giá trị mà bạn muốn biết thứ hạng trong mảng."
			},
			significance: {
				name: "chữ số có nghĩa",
				detail: "Tùy chọn. Giá trị xác định số chữ số có nghĩa của giá trị phần trăm trả về. Nếu bỏ qua, hàm PERCENTRANK dùng ba chữ số (0.xxx)."
			}
		}
	},
	POISSON: {
		description: "Trả về phân bố Poisson. Một ứng dụng thường gặp của phân bố Poisson là để dự đoán số sự kiện trong một thời gian cụ thể, chẳng hạn như số xe tới một trạm thu phí trong 1 phút.",
		abstract: "Trả về phân bố Poisson. Một ứng dụng thường gặp của phân bố Poisson là để dự đoán số sự kiện trong một thời gian cụ thể, chẳng hạn như số xe tới một trạm thu phí trong 1 phút.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/poisson-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "buộc. Số sự kiện."
			},
			mean: {
				name: "trung độ số",
				detail: "Yêu cầu. Giá trị dạng số ước tính."
			},
			cumulative: {
				name: "tích lũy",
				detail: "Yêu cầu. Giá trị lô-gic xác định dạng thức của phân bố xác suất được trả về. Nếu lũy tích là TRUE, thì hàm POISSON trả về xác xuất Poisson lũy tích mà một số sự kiện ngẫu nhiên sẽ xảy ra từ không đến x, bao gồm cả không và x; nếu FALSE, nó trả về hàm khối xác xuất Poission mà số sự kiện xảy ra sẽ chính xác là x."
			}
		}
	},
	QUARTILE: {
		description: "Trả về tứ phân vị của tập dữ liệu. Tứ phân vị được dùng trong dữ liệu khảo sát và bán hàng để chia tập hợp thành các nhóm. Ví dụ, bạn có thể dùng hàm QUARTILE để tìm ra 25% số người có thu nhập cao nhất trong một tập hợp dân cư.",
		abstract: "Trả về tứ phân vị của tập dữ liệu. Tứ phân vị được dùng trong dữ liệu khảo sát và bán hàng để chia tập hợp thành các nhóm. Ví dụ, bạn có thể dùng hàm QUARTILE để tìm ra 25% số người có thu nhập cao nhất trong một tập hợp dân cư.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/quartile-function"
		}],
		functionParameter: {
			array: {
				name: "mảng",
				detail: "Yêu cầu. Mảng hoặc phạm vi ô có chứa các giá trị số mà bạn muốn tìm giá trị tứ phân vị."
			},
			quart: {
				name: "giá trị tứ phân",
				detail: "Yêu cầu. Chỉ rõ giá trị nào cần trả về."
			}
		}
	},
	RANK: {
		description: "Trả về thứ hạng của một số trong danh sách các số. Thứ hạng của số là kích thước của nó trong tương quan với các giá trị khác trong danh sách. (Nếu bạn cần sắp xếp danh sách, thì thứ hạng của số là vị trí của nó).",
		abstract: "Trả về thứ hạng của một số trong danh sách các số. Thứ hạng của số là kích thước của nó trong tương quan với các giá trị khác trong danh sách. (Nếu bạn cần sắp xếp danh sách, thì thứ hạng của số là vị trí của nó).",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/rank-function"
		}],
		functionParameter: {
			number: {
				name: "số",
				detail: "Yêu cầu. Số mà bạn muốn tìm thứ hạng của nó."
			},
			ref: {
				name: "danh sách các số",
				detail: "Yêu cầu. Tham chiếu tới danh sách các số. Các giá trị không phải là số trong tham chiếu sẽ được bỏ qua."
			},
			order: {
				name: "xếp hạng số",
				detail: "Tùy chọn. Một con số chỉ rõ cách xếp hạng số. Nếu thứ tự là 0 (không) hoặc được bỏ qua, thì Microsoft Excel xếp hạng số giống như khi tham chiếu là một danh sách theo thứ tự giảm dần. Nếu thứ tự là bất kỳ giá trị nào khác không, thì Microsoft Excel xếp hạng số giống như khi tham chiếu là một danh sách theo thứ tự tăng dần."
			}
		}
	},
	STDEV: {
		description: "Ước tính độ lệch chuẩn dựa trên một mẫu. Độ lệch chuẩn là số đo độ phân tán của các giá trị so với giá trị trung bình (trung độ).",
		abstract: "Ước tính độ lệch chuẩn dựa trên một mẫu. Độ lệch chuẩn là số đo độ phân tán của các giá trị so với giá trị trung bình (trung độ).",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/stdev-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Yêu cầu. Đối số dạng số đầu tiên tương ứng với mẫu tổng thể."
			},
			number2: {
				name: "number2",
				detail: "Tùy chọn. Đối số dạng số từ 2 đến 255 tương ứng với mẫu tổng thể. Bạn cũng có thể sử dụng một mảng đơn hay tham chiếu tới một mảng thay thế cho các đối số được phân tách bởi dấu phẩy."
			}
		}
	},
	STDEVP: {
		description: "Tính toán độ lệch chuẩn dựa trên toàn bộ tổng thể được cung cấp ở dạng đối số. Độ lệch chuẩn là số đo độ phân tán của các giá trị so với giá trị trung bình (trung độ).",
		abstract: "Tính toán độ lệch chuẩn dựa trên toàn bộ tổng thể được cung cấp ở dạng đối số. Độ lệch chuẩn là số đo độ phân tán của các giá trị so với giá trị trung bình (trung độ).",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/stdevp-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Yêu cầu. Đối số dạng số đầu tiên tương ứng với tổng thể."
			},
			number2: {
				name: "number2",
				detail: "Tùy chọn. Đối số dạng số từ 2 đến 255 tương ứng với tổng thể. Bạn cũng có thể sử dụng một mảng đơn hay tham chiếu tới một mảng thay thế cho các đối số được phân tách bởi dấu phẩy."
			}
		}
	},
	TDIST: {
		description: "Trả về các Điểm Phần trăm (xác suất) cho phân bố t Student, trong đó giá trị số (x) là giá trị tính toán của t và được dùng để tính các Điểm Phần trăm. Phân bố t được dùng trong kiểm tra giả thuyết của các tập dữ liệu mẫu có số lượng nhỏ. Hàm này được dùng thay cho bảng các giá trị cực độ của phân phối t.",
		abstract: "Trả về các Điểm Phần trăm (xác suất) cho phân bố t Student, trong đó giá trị số (x) là giá trị tính toán của t và được dùng để tính các Điểm Phần trăm. Phân bố t được dùng trong kiểm tra giả thuyết của các tập dữ liệu mẫu có số lượng nhỏ. Hàm này được dùng thay cho bảng các giá trị cực độ của phân phối t.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/tdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "buộc. Giá trị số dùng để đánh giá phân bố."
			},
			degFreedom: {
				name: "bậc tự do",
				detail: "Yêu cầu. Là một số nguyên cho biết số bậc tự do."
			},
			tails: {
				name: "đặc điểm đuôi",
				detail: "Yêu cầu. Xác định số phần dư của phân bố được trả về. Nếu Tails = 1, hàm TDIST sẽ trả về phân bố một phía. Nếu Tails = 2, hàm TDIST sẽ trả về phân bố hai phía."
			}
		}
	},
	TINV: {
		description: "Trả về nghịch đảo hai phía của phân bố t Student.",
		abstract: "Trả về nghịch đảo hai phía của phân bố t Student.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/tinv-function"
		}],
		functionParameter: {
			probability: {
				name: "xác suất",
				detail: "Yêu cầu. Xác xuất kết hợp với phân bố t Student hai phía."
			},
			degFreedom: {
				name: "bậc tự do",
				detail: "Yêu cầu. Số bậc tự do biểu thị đặc điểm của phân bố."
			}
		}
	},
	TTEST: {
		description: "Trả về xác suất kết hợp với Phép thử t Student. Dùng hàm TTEST để xác định xem hai mẫu thử có xuất phát từ hai tập hợp gốc có cùng giá trị trung bình hay không.",
		abstract: "Trả về xác suất kết hợp với Phép thử t Student. Dùng hàm TTEST để xác định xem hai mẫu thử có xuất phát từ hai tập hợp gốc có cùng giá trị trung bình hay không.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/ttest-function"
		}],
		functionParameter: {
			array1: {
				name: "mảng 1",
				detail: "Yêu cầu. Tập dữ liệu thứ nhất."
			},
			array2: {
				name: "mảng 2",
				detail: "Yêu cầu. Tập dữ liệu thứ hai."
			},
			tails: {
				name: "đặc điểm đuôi",
				detail: "Yêu cầu. Xác định số phần dư của phân bố. Nếu tails = 1, hàm TTEST dùng phân bố một phía. Nếu tails = 2, hàm TTEST dùng phân bố hai phía."
			},
			type: {
				name: "loại Phép thử",
				detail: "Yêu cầu. Kiểu phép thử t-Test cần thực hiện."
			}
		}
	},
	VAR: {
		description: "Ước tính phương sai dựa trên mẫu.",
		abstract: "Ước tính phương sai dựa trên mẫu.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/var-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Yêu cầu. Đối số dạng số đầu tiên tương ứng với mẫu tổng thể."
			},
			number2: {
				name: "number2",
				detail: "Tùy chọn. Là các đối số dạng số từ 2 đến 255 tương ứng với một mẫu của một tập hợp."
			}
		}
	},
	VARP: {
		description: "Tính toán phương sai dựa trên toàn bộ tập hợp.",
		abstract: "Tính toán phương sai dựa trên toàn bộ tập hợp.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/varp-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Yêu cầu. Đối số dạng số đầu tiên tương ứng với tổng thể."
			},
			number2: {
				name: "number2",
				detail: "Tùy chọn. Là các đối số dạng số từ 2 đến 255 tương ứng với một tập hợp."
			}
		}
	},
	WEIBULL: {
		description: "Trả về phân bố Weibull. Dùng phân bố này trong phân tích độ tin cậy, chẳng hạn như tính toán tuổi thọ trung bình của một thiết bị.",
		abstract: "Trả về phân bố Weibull. Dùng phân bố này trong phân tích độ tin cậy, chẳng hạn như tính toán tuổi thọ trung bình của một thiết bị.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/weibull-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "buộc. Giá trị để đánh giá hàm."
			},
			alpha: {
				name: "alpha",
				detail: "Yêu cầu. Một tham biến tới phân phối."
			},
			beta: {
				name: "beta",
				detail: "Yêu cầu. Một tham biến tới phân phối."
			},
			cumulative: {
				name: "tích lũy",
				detail: "Yêu cầu. Xác định dạng hàm."
			}
		}
	},
	ZTEST: {
		description: "Trả về giá trị xác suất một phía của kiểm tra z. Đối với một trung bình tổng thể giả thuyết nhất định, μ0, hàm ZTEST trả về xác suất rằng trung độ mẫu sẽ lớn hơn trung bình quan sát trong bộ dữ liệu (mảng) — tức là, trung độ mẫu quan sát được.",
		abstract: "Trả về giá trị xác suất một phía của kiểm tra z. Đối với một trung bình tổng thể giả thuyết nhất định, μ0, hàm ZTEST trả về xác suất rằng trung độ mẫu sẽ lớn hơn trung bình quan sát trong bộ dữ liệu (mảng) — tức là, trung độ mẫu quan sát được.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/ztest-function"
		}],
		functionParameter: {
			array: {
				name: "mảng",
				detail: "Yêu cầu. Mảng hay khoảng dữ liệu để kiểm tra x."
			},
			x: {
				name: "x",
				detail: "buộc. Giá trị cần kiểm tra."
			},
			sigma: {
				name: "Độ lệch chuẩn",
				detail: "Tùy chọn. Độ lệch chuẩn tổng thể (đã biết). Nếu bỏ qua, độ lệch chuẩn mẫu sẽ được dùng."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/cube/vi-VN.ts
const locale$13 = {
	CUBEKPIMEMBER: {
		description: "Trả về thuộc tính chỉ số hiệu suất then chốt (KPI) và hiển thị tên KPI trong ô. KPI là một số đo có thể định lượng được, chẳng hạn như lãi gộp hàng tháng hoặc số lượng nhân viên luân chuyển, dùng để theo dõi hoạt động của một tổ chức.",
		abstract: "Trả về thuộc tính chỉ số hiệu suất then chốt (KPI) và hiển thị tên KPI trong ô. KPI là một số đo có thể định lượng được, chẳng hạn như lãi gộp hàng tháng hoặc số lượng nhân viên luân chuyển, dùng để theo dõi hoạt động của một tổ chức.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/cubekpimember-function"
		}],
		functionParameter: {
			connection: {
				name: "Kết nối",
				detail: "Yêu cầu. Chuỗi văn bản tên của kết nối tới khối."
			},
			kpiName: {
				name: "Kpi_name",
				detail: "Yêu cầu. Chuỗi văn bản của tên KPI trong khối."
			},
			kpiProperty: {
				name: "Kpi_property",
				detail: "Yêu cầu. Cấu phần KPI được trả về và có thể là một trong các dạng sau:"
			},
			caption: {
				name: "Chú thích",
				detail: "Tùy chọn. Một chuỗi văn bản thay thế được hiển thị trong ô thay cho kpi_name và kpi_property."
			}
		}
	},
	CUBEMEMBER: {
		description: "Trả về một phần tử hoặc một bộ từ khối. Dùng để xác thực rằng phần tử hoặc bộ tồn tại trong khối.",
		abstract: "Trả về một phần tử hoặc một bộ từ khối. Dùng để xác thực rằng phần tử hoặc bộ tồn tại trong khối.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/cubemember-function"
		}],
		functionParameter: {
			connection: {
				name: "Kết nối",
				detail: "Yêu cầu. Chuỗi văn bản tên của kết nối tới khối."
			},
			memberExpression: {
				name: "Member_expression",
				detail: "Yêu cầu. Một chuỗi văn bản biểu thức đa chiều (DMX) định trị một phần tử duy nhất trong khối. Theo cách khác, member_expression có thể là một bộ, được xác định như là một phạm vi ô hoặc một hằng số mảng."
			},
			caption: {
				name: "Chú thích",
				detail: "Tùy chọn. Một chuỗi văn bản được hiển thị trong ô thay cho chú thích từ ô, nếu như có một chú thích được xác định từ khối. Khi một bộ được trả về, chú thích được dùng là chú thích cho phần tử cuối cùng trong bộ."
			}
		}
	},
	CUBEMEMBERPROPERTY: {
		description: "Hàm CUBEMEMBERPROPERTY , một trong các hàm Cube trong Excel, trả về giá trị của một thuộc tính phần tử từ một khối. Dùng để xác thực một tên phần tử tồn tại trong cube và trả về thuộc tính được chỉ định cho phần tử này.",
		abstract: "Hàm CUBEMEMBERPROPERTY , một trong các hàm Cube trong Excel, trả về giá trị của một thuộc tính phần tử từ một khối. Dùng để xác thực một tên phần tử tồn tại trong cube và trả về thuộc tính được chỉ định cho phần tử này.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/cubememberproperty-function"
		}],
		functionParameter: {
			connection: {
				name: "Kết nối",
				detail: "Yêu cầu. Chuỗi văn bản tên của kết nối tới khối."
			},
			memberExpression: {
				name: "Member_expression",
				detail: "Yêu cầu. Chuỗi văn bản biểu thức đa chiều (MDX) của một phần tử trong một khối."
			},
			property: {
				name: "Tài sản",
				detail: "Yêu cầu. Chuỗi văn bản tên của thuộc tính được trả về hoặc tham chiếu tới một ô có chứa tên của thuộc tính."
			}
		}
	},
	CUBERANKEDMEMBER: {
		description: "Trả về phần tử thứ n hoặc được xếp hạng trong một tập hợp. Dùng để trả về một hoặc các thành phần trong một tập hợp, chẳng hạn như nhân viên kinh doanh đứng đầu hoặc 10 học sinh đứng đầu.",
		abstract: "Trả về phần tử thứ n hoặc được xếp hạng trong một tập hợp. Dùng để trả về một hoặc các thành phần trong một tập hợp, chẳng hạn như nhân viên kinh doanh đứng đầu hoặc 10 học sinh đứng đầu.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/cuberankedmember-function"
		}],
		functionParameter: {
			connection: {
				name: "Kết nối",
				detail: "Yêu cầu. Chuỗi văn bản tên của kết nối tới khối."
			},
			setExpression: {
				name: "Set_expression",
				detail: "Yêu cầu. Một chuỗi văn bản của một biểu thức tập hợp, chẳng hạn như \"{[Item1].children}\". member_expression cũng có thể là hàm CUBESET, hoặc tham chiếu tới một ô có chứa hàm CUBESET."
			},
			rank: {
				name: "Xếp hạng",
				detail: "Yêu cầu. Một giá trị số nguyên chỉ rõ giá trị trên cùng cần trả về. Nếu thứ hạng là giá trị 1, nó trả về giá trị cao nhất, nếu thứ hạng là giá trị 2, nó trả về giá trị cao thứ hai, v.v. Để trả về 5 giá trị hàng đầu, hãy dùng hàm CUBERANKEDMEMBER năm lần, xác định một thứ hạng khác nhau, từ 1 đến 5, mỗi lần."
			},
			caption: {
				name: "Chú thích",
				detail: "Tùy chọn. Một chuỗi văn bản được hiển thị trong ô thay cho chú thích từ ô, nếu như có một chú thích được xác định từ khối."
			}
		}
	},
	CUBESET: {
		description: "Xác định một tập hợp phần tử được tính hoặc bộ bằng cách gửi một biểu thức tập hợp tới khối trên máy chủ, tạo tập hợp rồi trả tập hợp đó về Microsoft Excel.",
		abstract: "Xác định một tập hợp phần tử được tính hoặc bộ bằng cách gửi một biểu thức tập hợp tới khối trên máy chủ, tạo tập hợp rồi trả tập hợp đó về Microsoft Excel.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/cubeset-function"
		}],
		functionParameter: {
			connection: {
				name: "Kết nối",
				detail: "Yêu cầu. Chuỗi văn bản tên của kết nối tới khối."
			},
			setExpression: {
				name: "Set_expression",
				detail: "Yêu cầu. Một chuỗi văn bản set_expression trả về kết quả là một tập hợp các phần tử hoặc các bộ. Set_expression cũng có thể là một tham chiếu ô tới một phạm vi Excel có chứa một hoặc nhiều phần tử, bộ hoặc tập hợp được bao gồm trong tập hợp đó."
			},
			caption: {
				name: "Chú thích",
				detail: "Tùy chọn. Một chuỗi văn bản được hiển thị trong ô thay cho chú thích từ ô, nếu như có một chú thích được xác định."
			},
			sortOrder: {
				name: "Sort_order",
				detail: "Tùy chọn. Kiểu sắp xếp, nếu có, cần thực hiện và có thể là một trong các kiểu sau đây:"
			},
			sortBy: {
				name: "Sort_by",
				detail: "Tùy chọn. Một chuỗi văn bản gồm các giá trị cần sắp xếp theo đó. Ví dụ, để có được thành phố có doanh thu lớn nhất, set_expression phải là một tập hợp các thành phố và sort_by là số đo về doanh thu. Hoặc để có được thành phố đông dân nhất, set_expression phải là một tập hợp các thành phố và sort_by là số dân. Nếu sort_order yêu cầu phải có sort_by, và sort_by được bỏ qua, thì CUBESET trả về thông báo lỗi #VALUE! ."
			}
		}
	},
	CUBESETCOUNT: {
		description: "Trả về số mục trong một tập hợp.",
		abstract: "Trả về số mục trong một tập hợp.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/cubesetcount-function"
		}],
		functionParameter: { set: {
			name: "Thiết lập",
			detail: "Yêu cầu. Một chuỗi văn bản của biểu thức Microsoft Excel mà biểu thức này định trị một giá trị được xác định bởi hàm CUBESET. Tập hợp cũng có thể là hàm CUBESET, hoặc tham chiếu tới một ô có chứa hàm CUBESET."
		} }
	},
	CUBEVALUE: {
		description: "Trả về một giá trị tổng hợp từ khối.",
		abstract: "Trả về một giá trị tổng hợp từ khối.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/cubevalue-function"
		}],
		functionParameter: {
			connection: {
				name: "Kết nối",
				detail: "Yêu cầu. Chuỗi văn bản tên của kết nối tới khối."
			},
			memberExpression: {
				name: "Member_expression",
				detail: "Tùy chọn. Một chuỗi văn bản biểu thức đa chiều (DMX) định trị một phần tử hoặc một bộ trong khối. Hoặc theo cách khác, biểu thức phần tử có thể là một tập hợp được xác định với hàm CUBESET. Hãy dùng biểu thức phần tử như một slicer để xác định phần của khối mà giá trị tổng hợp cho nó được trả về. Nếu không có số đo nào được xác định trong biểu thức phần tử, thì sẽ dùng số đo mặc định của khối đó."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/database/vi-VN.ts
const locale$12 = {
	DAVERAGE: {
		description: "Tính trung bình các giá trị trong một trường (cột) bản ghi trong danh sách hay cơ sở dữ liệu khớp với các điều kiện mà bạn xác định.",
		abstract: "Tính trung bình các giá trị trong một trường (cột) bản ghi trong danh sách hay cơ sở dữ liệu khớp với các điều kiện mà bạn xác định.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/daverage-function"
		}],
		functionParameter: {
			database: {
				name: "cơ sở dữ liệu",
				detail: "sở dữ liệu là phạm vi ô tạo thành danh sách hoặc cơ sở dữ liệu. Cơ sở dữ liệu là một danh sách chứa các dữ liệu liên quan, trong đó các hàng thông tin liên quan là các bản ghi và các cột dữ liệu là các trường. Hàng đầu tiên của danh sách có chứa nhãn cho mỗi cột."
			},
			field: {
				name: "cánh đồng",
				detail: "cho biết cột nào được dùng trong hàm. Hãy nhập nhãn cột đặt trong dấu ngoặc kép, ví dụ như \"Tuổi\" hoặc \"Hoa lợi\" hay một số (không có dấu trích dẫn) thể hiện vị trí cột trong danh sách: 1 cho cột đầu tiên, 2 cho cột thứ 2, v.v."
			},
			criteria: {
				name: "tiêu chuẩn",
				detail: "là phạm vi ô có chứa các điều kiện bạn xác định. Bạn có thể dùng bất kỳ phạm vi nào cho đối số criteria, miễn là nó có chứa ít nhất một nhãn cột và ít nhất một ô bên dưới nhãn cột đó, mà trong đó bạn xác định điều kiện cho cột đó."
			}
		}
	},
	DCOUNT: {
		description: "Đếm số ô chứa số trong một trường (cột) bản ghi trong danh sách hoặc cơ sở dữ liệu khớp với các điều kiện mà bạn xác định.",
		abstract: "Đếm số ô chứa số trong một trường (cột) bản ghi trong danh sách hoặc cơ sở dữ liệu khớp với các điều kiện mà bạn xác định.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/dcount-function"
		}],
		functionParameter: {
			database: {
				name: "cơ sở dữ liệu",
				detail: "Yêu cầu. Phạm vi ô tạo thành danh sách hay cơ sở dữ liệu. Cơ sở dữ liệu là một danh sách chứa các dữ liệu liên quan, trong đó các hàng thông tin liên quan là các bản ghi và các cột dữ liệu là các trường. Hàng đầu tiên của danh sách có chứa nhãn cho mỗi cột."
			},
			field: {
				name: "cánh đồng",
				detail: "Yêu cầu. Chỉ rõ cột được dùng trong hàm. Hãy nhập nhãn cột đặt trong dấu ngoặc kép, ví dụ như \"Tuổi\" hoặc \"Lợi tức\" hay một số (không có dấu ngoặc kép) thể hiện vị trí cột trong danh sách: 1 cho cột đầu tiên, 2 cho cột thứ 2, v.v."
			},
			criteria: {
				name: "tiêu chuẩn",
				detail: "Yêu cầu. Phạm vi ô có chứa các điều kiện mà bạn xác định. Bạn có thể dùng bất kỳ phạm vi nào cho đối số criteria, miễn là đối số đó có chứa ít nhất một nhãn cột và ít nhất một ô bên dưới nhãn cột đó, mà trong đó bạn xác định điều kiện cho cột đó."
			}
		}
	},
	DCOUNTA: {
		description: "Đếm các ô không trống trong một trường (cột) của bản ghi trong danh sách hoặc cơ sở dữ liệu khớp với những điều kiện bạn xác định.",
		abstract: "Đếm các ô không trống trong một trường (cột) của bản ghi trong danh sách hoặc cơ sở dữ liệu khớp với những điều kiện bạn xác định.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/dcounta-function"
		}],
		functionParameter: {
			database: {
				name: "cơ sở dữ liệu",
				detail: "Yêu cầu. Phạm vi ô tạo thành danh sách hay cơ sở dữ liệu. Cơ sở dữ liệu là một danh sách chứa các dữ liệu liên quan, trong đó các hàng thông tin liên quan là các bản ghi và các cột dữ liệu là các trường. Hàng đầu tiên của danh sách có chứa nhãn cho mỗi cột."
			},
			field: {
				name: "cánh đồng",
				detail: "Tùy chọn. Chỉ rõ cột được dùng trong hàm. Hãy nhập nhãn cột đặt trong dấu ngoặc kép, ví dụ như \"Tuổi\" hoặc \"Lợi tức\" hay một số (không có dấu ngoặc kép) thể hiện vị trí cột trong danh sách: 1 cho cột đầu tiên, 2 cho cột thứ 2, v.v."
			},
			criteria: {
				name: "tiêu chuẩn",
				detail: "Yêu cầu. Phạm vi ô có chứa điều kiện mà bạn xác định. Bạn có thể sử dụng bất kỳ phạm vi nào cho đối số tiêu chí, miễn là nó có chứa ít nhất một nhãn cột và ít nhất một ô bên dưới nhãn cột đó trong đó bạn xác định điều kiện cho cột đó."
			}
		}
	},
	DGET: {
		description: "Trích một giá trị từ cột danh sách hay cơ sở dữ liệu khớp với các điều kiện mà bạn xác định.",
		abstract: "Trích một giá trị từ cột danh sách hay cơ sở dữ liệu khớp với các điều kiện mà bạn xác định.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/dget-function"
		}],
		functionParameter: {
			database: {
				name: "cơ sở dữ liệu",
				detail: "Yêu cầu. Phạm vi ô tạo thành danh sách hay cơ sở dữ liệu. Cơ sở dữ liệu là một danh sách chứa các dữ liệu liên quan, trong đó các hàng thông tin liên quan là các bản ghi và các cột dữ liệu là các trường. Hàng đầu tiên của danh sách có chứa nhãn cho mỗi cột."
			},
			field: {
				name: "cánh đồng",
				detail: "Yêu cầu. Chỉ rõ cột được dùng trong hàm. Hãy nhập nhãn cột đặt trong dấu ngoặc kép, ví dụ như \"Tuổi\" hoặc \"Lợi tức\" hay một số (không có dấu ngoặc kép) thể hiện vị trí cột trong danh sách: 1 cho cột đầu tiên, 2 cho cột thứ 2, v.v."
			},
			criteria: {
				name: "tiêu chuẩn",
				detail: "Yêu cầu. Phạm vi ô có chứa điều kiện mà bạn xác định. Bạn có thể sử dụng bất kỳ phạm vi nào cho đối số tiêu chí, miễn là nó có chứa ít nhất một nhãn cột và ít nhất một ô bên dưới nhãn cột đó trong đó bạn xác định điều kiện cho cột đó."
			}
		}
	},
	DMAX: {
		description: "Trả về số lớn nhất trong một trường (cột) bản ghi trong danh sách hoặc cơ sở dữ liệu khớp với các điều kiện mà bạn xác định.",
		abstract: "Trả về số lớn nhất trong một trường (cột) bản ghi trong danh sách hoặc cơ sở dữ liệu khớp với các điều kiện mà bạn xác định.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/dmax-function"
		}],
		functionParameter: {
			database: {
				name: "cơ sở dữ liệu",
				detail: "Yêu cầu. Phạm vi ô tạo thành danh sách hay cơ sở dữ liệu. Cơ sở dữ liệu là một danh sách chứa các dữ liệu liên quan, trong đó các hàng thông tin liên quan là các bản ghi và các cột dữ liệu là các trường. Hàng đầu tiên của danh sách có chứa nhãn cho mỗi cột."
			},
			field: {
				name: "cánh đồng",
				detail: "Yêu cầu. Chỉ rõ cột được dùng trong hàm. Hãy nhập nhãn cột đặt trong dấu ngoặc kép, ví dụ như \"Tuổi\" hoặc \"Lợi tức\" hay một số (không có dấu ngoặc kép) thể hiện vị trí cột trong danh sách: 1 cho cột đầu tiên, 2 cho cột thứ 2, v.v."
			},
			criteria: {
				name: "tiêu chuẩn",
				detail: "Yêu cầu. Phạm vi ô có chứa điều kiện mà bạn xác định. Bạn có thể sử dụng bất kỳ phạm vi nào cho đối số tiêu chí, miễn là nó có chứa ít nhất một nhãn cột và ít nhất một ô bên dưới nhãn cột đó trong đó bạn xác định điều kiện cho cột đó."
			}
		}
	},
	DMIN: {
		description: "Trả về số nhỏ nhất trong một trường (cột) bản ghi trong danh sách hoặc cơ sở dữ liệu khớp với các điều kiện mà bạn xác định.",
		abstract: "Trả về số nhỏ nhất trong một trường (cột) bản ghi trong danh sách hoặc cơ sở dữ liệu khớp với các điều kiện mà bạn xác định.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/dmin-function"
		}],
		functionParameter: {
			database: {
				name: "cơ sở dữ liệu",
				detail: "Yêu cầu. Phạm vi ô tạo thành danh sách hay cơ sở dữ liệu. Cơ sở dữ liệu là một danh sách chứa các dữ liệu liên quan, trong đó các hàng thông tin liên quan là các bản ghi và các cột dữ liệu là các trường. Hàng đầu tiên của danh sách có chứa nhãn cho mỗi cột."
			},
			field: {
				name: "cánh đồng",
				detail: "Yêu cầu. Chỉ rõ cột được dùng trong hàm. Hãy nhập nhãn cột đặt trong dấu ngoặc kép, ví dụ như \"Tuổi\" hoặc \"Lợi tức\" hay một số (không có dấu ngoặc kép) thể hiện vị trí cột trong danh sách: 1 cho cột đầu tiên, 2 cho cột thứ 2, v.v."
			},
			criteria: {
				name: "tiêu chuẩn",
				detail: "Yêu cầu. Phạm vi ô có chứa điều kiện mà bạn xác định. Bạn có thể sử dụng bất kỳ phạm vi nào cho đối số tiêu chí, miễn là nó có chứa ít nhất một nhãn cột và ít nhất một ô bên dưới nhãn cột đó trong đó bạn xác định điều kiện cho cột đó."
			}
		}
	},
	DPRODUCT: {
		description: "Nhân các giá trị trong một trường (cột) bản ghi trong danh sách hoặc cơ sở dữ liệu khớp với các điều kiện mà bạn xác định.",
		abstract: "Nhân các giá trị trong một trường (cột) bản ghi trong danh sách hoặc cơ sở dữ liệu khớp với các điều kiện mà bạn xác định.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/dproduct-function"
		}],
		functionParameter: {
			database: {
				name: "cơ sở dữ liệu",
				detail: "Yêu cầu. Phạm vi ô tạo thành danh sách hay cơ sở dữ liệu. Cơ sở dữ liệu là một danh sách chứa các dữ liệu liên quan, trong đó các hàng thông tin liên quan là các bản ghi và các cột dữ liệu là các trường. Hàng đầu tiên của danh sách có chứa nhãn cho mỗi cột."
			},
			field: {
				name: "cánh đồng",
				detail: "Yêu cầu. Chỉ rõ cột được dùng trong hàm. Hãy nhập nhãn cột đặt trong dấu ngoặc kép, ví dụ như \"Tuổi\" hoặc \"Lợi tức\" hay một số (không có dấu ngoặc kép) thể hiện vị trí cột trong danh sách: 1 cho cột đầu tiên, 2 cho cột thứ 2, v.v."
			},
			criteria: {
				name: "tiêu chuẩn",
				detail: "Yêu cầu. Phạm vi ô có chứa điều kiện mà bạn xác định. Bạn có thể sử dụng bất kỳ phạm vi nào cho đối số tiêu chí, miễn là nó có chứa ít nhất một nhãn cột và ít nhất một ô bên dưới nhãn cột đó trong đó bạn xác định điều kiện cho cột đó."
			}
		}
	},
	DSTDEV: {
		description: "Ước tính độ lệch chuẩn của một tập hợp dựa trên một mẫu bằng cách dùng các số trong một trường (cột) bản ghi trong danh sách hoặc cơ sở dữ liệu khớp với các điều kiện mà bạn xác định.",
		abstract: "Ước tính độ lệch chuẩn của một tập hợp dựa trên một mẫu bằng cách dùng các số trong một trường (cột) bản ghi trong danh sách hoặc cơ sở dữ liệu khớp với các điều kiện mà bạn xác định.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/dstdev-function"
		}],
		functionParameter: {
			database: {
				name: "cơ sở dữ liệu",
				detail: "Yêu cầu. Phạm vi ô tạo thành danh sách hay cơ sở dữ liệu. Cơ sở dữ liệu là một danh sách chứa các dữ liệu liên quan, trong đó các hàng thông tin liên quan là các bản ghi và các cột dữ liệu là các trường. Hàng đầu tiên của danh sách có chứa nhãn cho mỗi cột."
			},
			field: {
				name: "cánh đồng",
				detail: "Yêu cầu. Chỉ rõ cột được dùng trong hàm. Hãy nhập nhãn cột đặt trong dấu ngoặc kép, ví dụ như \"Tuổi\" hoặc \"Lợi tức\" hay một số (không có dấu ngoặc kép) thể hiện vị trí cột trong danh sách: 1 cho cột đầu tiên, 2 cho cột thứ 2, v.v."
			},
			criteria: {
				name: "tiêu chuẩn",
				detail: "Yêu cầu. Phạm vi ô có chứa điều kiện mà bạn xác định. Bạn có thể sử dụng bất kỳ phạm vi nào cho đối số tiêu chí, miễn là nó có chứa ít nhất một nhãn cột và ít nhất một ô bên dưới nhãn cột đó trong đó bạn xác định điều kiện cho cột đó."
			}
		}
	},
	DSTDEVP: {
		description: "Tính toán độ lệch chuẩn của một tập hợp dựa trên toàn bộ tập hợp đó bằng cách dùng các số trong một trường (cột) bản ghi trong danh sách hoặc cơ sở dữ liệu khớp với các điều kiện mà bạn xác định.",
		abstract: "Tính toán độ lệch chuẩn của một tập hợp dựa trên toàn bộ tập hợp đó bằng cách dùng các số trong một trường (cột) bản ghi trong danh sách hoặc cơ sở dữ liệu khớp với các điều kiện mà bạn xác định.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/dstdevp-function"
		}],
		functionParameter: {
			database: {
				name: "cơ sở dữ liệu",
				detail: "Yêu cầu. Phạm vi ô tạo thành danh sách hay cơ sở dữ liệu. Cơ sở dữ liệu là một danh sách chứa các dữ liệu liên quan, trong đó các hàng thông tin liên quan là các bản ghi và các cột dữ liệu là các trường. Hàng đầu tiên của danh sách có chứa nhãn cho mỗi cột."
			},
			field: {
				name: "cánh đồng",
				detail: "Yêu cầu. Chỉ rõ cột được dùng trong hàm. Hãy nhập nhãn cột đặt trong dấu ngoặc kép, ví dụ như \"Tuổi\" hoặc \"Lợi tức\" hay một số (không có dấu ngoặc kép) thể hiện vị trí cột trong danh sách: 1 cho cột đầu tiên, 2 cho cột thứ 2, v.v."
			},
			criteria: {
				name: "tiêu chuẩn",
				detail: "Yêu cầu. Phạm vi ô có chứa điều kiện mà bạn xác định. Bạn có thể sử dụng bất kỳ phạm vi nào cho đối số tiêu chí, miễn là nó có chứa ít nhất một nhãn cột và ít nhất một ô bên dưới nhãn cột đó trong đó bạn xác định điều kiện cho cột đó."
			}
		}
	},
	DSUM: {
		description: "Trong danh sách hoặc cơ sở dữ liệu, DSUM cung cấp tổng số trong các trường (cột) bản ghi khớp với các điều kiện đã xác định của bạn.",
		abstract: "Trong danh sách hoặc cơ sở dữ liệu, DSUM cung cấp tổng số trong các trường (cột) bản ghi khớp với các điều kiện đã xác định của bạn.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/dsum-function"
		}],
		functionParameter: {
			database: {
				name: "cơ sở dữ liệu",
				detail: "Yêu cầu. Đây là phạm vi ô tạo thành danh sách hoặc cơ sở dữ liệu. Cơ sở dữ liệu là danh sách các dữ liệu liên quan, trong đó các hàng thông tin liên quan là các bản ghi và cột dữ liệu là các trường . Hàng đầu tiên của danh sách chứa nhãn cho mỗi cột trong đó."
			},
			field: {
				name: "cánh đồng",
				detail: "Yêu cầu. Điều này chỉ rõ cột nào được dùng trong hàm. Xác định nhãn cột nằm giữa dấu ngoặc kép, chẳng hạn như ví dụ như \"Tuổi\" hoặc \"Hoa lợi\". Ngoài ra, bạn có thể chỉ định một số (không có dấu ngoặc kép) thể hiện vị trí của cột trong danh sách: ví dụ: 1 cho cột đầu tiên, 2 cho cột thứ hai, v.v."
			},
			criteria: {
				name: "tiêu chuẩn",
				detail: "Yêu cầu. Đây là phạm vi ô có chứa các điều kiện mà bạn chỉ định. Bạn có thể dùng bất kỳ phạm vi nào cho đối số criteria, miễn là nó có chứa ít nhất một nhãn cột và ít nhất một ô bên dưới nhãn cột đó, mà trong đó bạn xác định điều kiện cho cột đó."
			}
		}
	},
	DVAR: {
		description: "Ước tính phương sai của một tập hợp dựa trên một mẫu bằng cách dùng các số trong một trường (cột) bản ghi trong danh sách hoặc cơ sở dữ liệu khớp với các điều kiện mà bạn xác định.",
		abstract: "Ước tính phương sai của một tập hợp dựa trên một mẫu bằng cách dùng các số trong một trường (cột) bản ghi trong danh sách hoặc cơ sở dữ liệu khớp với các điều kiện mà bạn xác định.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/dvar-function"
		}],
		functionParameter: {
			database: {
				name: "cơ sở dữ liệu",
				detail: "Yêu cầu. Phạm vi ô tạo thành danh sách hay cơ sở dữ liệu. Cơ sở dữ liệu là một danh sách chứa các dữ liệu liên quan, trong đó các hàng thông tin liên quan là các bản ghi và các cột dữ liệu là các trường. Hàng đầu tiên của danh sách có chứa nhãn cho mỗi cột."
			},
			field: {
				name: "cánh đồng",
				detail: "Yêu cầu. Chỉ rõ cột được dùng trong hàm. Hãy nhập nhãn cột đặt trong dấu ngoặc kép, ví dụ như \"Tuổi\" hoặc \"Lợi tức\" hay một số (không có dấu ngoặc kép) thể hiện vị trí cột trong danh sách: 1 cho cột đầu tiên, 2 cho cột thứ 2, v.v."
			},
			criteria: {
				name: "tiêu chuẩn",
				detail: "Yêu cầu. Phạm vi ô có chứa điều kiện mà bạn xác định. Bạn có thể sử dụng bất kỳ phạm vi nào cho đối số tiêu chí, miễn là nó có chứa ít nhất một nhãn cột và ít nhất một ô bên dưới nhãn cột đó trong đó bạn xác định điều kiện cho cột đó."
			}
		}
	},
	DVARP: {
		description: "Tính toán phương sai của một tập hợp dựa trên toàn bộ tập hợp đó bằng cách dùng các số trong một trường (cột) bản ghi trong danh sách hoặc cơ sở dữ liệu khớp với các điều kiện mà bạn xác định.",
		abstract: "Tính toán phương sai của một tập hợp dựa trên toàn bộ tập hợp đó bằng cách dùng các số trong một trường (cột) bản ghi trong danh sách hoặc cơ sở dữ liệu khớp với các điều kiện mà bạn xác định.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/dvarp-function"
		}],
		functionParameter: {
			database: {
				name: "cơ sở dữ liệu",
				detail: "Yêu cầu. Phạm vi ô tạo thành danh sách hay cơ sở dữ liệu. Cơ sở dữ liệu là một danh sách chứa các dữ liệu liên quan, trong đó các hàng thông tin liên quan là các bản ghi và các cột dữ liệu là các trường. Hàng đầu tiên của danh sách có chứa nhãn cho mỗi cột."
			},
			field: {
				name: "cánh đồng",
				detail: "Yêu cầu. Chỉ rõ cột được dùng trong hàm. Hãy nhập nhãn cột đặt trong dấu ngoặc kép, ví dụ như \"Tuổi\" hoặc \"Lợi tức\" hay một số (không có dấu ngoặc kép) thể hiện vị trí cột trong danh sách: 1 cho cột đầu tiên, 2 cho cột thứ 2, v.v."
			},
			criteria: {
				name: "tiêu chuẩn",
				detail: "Yêu cầu. Phạm vi ô có chứa điều kiện mà bạn xác định. Bạn có thể sử dụng bất kỳ phạm vi nào cho đối số tiêu chí, miễn là nó có chứa ít nhất một nhãn cột và ít nhất một ô bên dưới nhãn cột đó trong đó bạn xác định điều kiện cho cột đó."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/date/vi-VN.ts
const locale$11 = {
	DATE: {
		description: "Kết hợp ba giá trị riêng biệt thành một ngày.",
		abstract: "Trả về số sê-ri của ngày cụ thể",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/date-function"
		}],
		functionParameter: {
			year: {
				name: "Năm",
				detail: "có thể chứa từ 1 đến 4 chữ số. Excel giải thích tham số year dựa trên hệ thống ngày được máy tính sử dụng. Theo mặc định, Univer sử dụng hệ thống ngày 1900, nghĩa là ngày đầu tiên là ngày 1 tháng 1 năm 1900."
			},
			month: {
				name: "Tháng",
				detail: "một số nguyên dương hoặc số nguyên âm, đại diện cho các tháng từ tháng 1 đến tháng 12 trong một năm."
			},
			day: {
				name: "Ngày",
				detail: "một số nguyên dương hoặc số nguyên âm, đại diện cho các ngày từ ngày 1 đến ngày 31 trong một tháng."
			}
		}
	},
	DATEDIF: {
		description: "Tính số ngày, tháng hoặc năm giữa hai ngày. Hàm này rất hữu ích trong các công thức tính tuổi.",
		abstract: "Tính số ngày, tháng hoặc năm giữa hai ngày. Hàm này rất hữu ích trong các công thức tính tuổi.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/datedif-function"
		}],
		functionParameter: {
			startDate: {
				name: "ngày bắt đầu",
				detail: "Ngày đại diện cho ngày đầu tiên hoặc ngày bắt đầu của một khoảng thời gian đã cho. Ngày tháng có thể được nhập ở dạng chuỗi văn bản trong dấu ngoặc kép (ví dụ, \"30/1/2001\" ), dưới dạng số sê-ri (ví dụ, 36921, biểu thị cho ngày 30 tháng 1 năm 2001, nếu bạn đang sử dụng hệ thống ngày tháng 1900), hoặc là kết quả của các công thức hoặc hàm khác (ví dụ, hàm DATEVALUE(\"30/1/2001\"))."
			},
			endDate: {
				name: "ngày kết thúc",
				detail: "Ngày đại diện cho ngày cuối cùng hoặc ngày kết thúc khoảng thời gian."
			},
			unit: {
				name: "Unit",
				detail: "Kiểu thông tin mà bạn muốn trả về, trong đó: Unit****Returns \" Y \"Số năm hoàn thành trong kỳ.\" M \"Số tháng hoàn tất trong kỳ.\" D \"Số ngày trong khoảng thời gian.\" MD \"Sự khác biệt giữa các ngày trong start_date và end_date. Đã bỏ qua tháng và năm của ngày. Quan trọng: Chúng tôi khuyên bạn không nên sử dụng tham đối \"MD\", vì có những giới hạn đã biết kèm theo. Hãy xem phần sự cố đã biết bên dưới.\" YM \"Sự khác biệt giữa các tháng trong start_date và end_date. Ngày và năm của ngày được bỏ qua\" YD \"Sự khác biệt giữa các ngày trong ngày start_date ngày end_date. Đã bỏ qua năm của ngày."
			}
		}
	},
	DATEVALUE: {
		description: "Chuyển đổi ngày ở dạng văn bản thành số sê-ri.",
		abstract: "Chuyển đổi ngày ở dạng văn bản thành số sê-ri",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/datevalue-function"
		}],
		functionParameter: { dateText: {
			name: "Văn bản ngày",
			detail: "đại diện cho ngày ở định dạng Excel, hoặc tham chiếu đến ô chứa văn bản đại diện cho ngày ở định dạng Excel. Ví dụ, \"1/30/2008\" hoặc \"30-Jan-2008\" là văn bản trong dấu ngoặc kép đại diện cho ngày.\nSử dụng hệ thống ngày mặc định của Microsoft Excel for Windows, tham số date_text phải đại diện cho ngày từ 1 tháng 1 năm 1900 đến 31 tháng 12 năm 9999. Hàm DATEVALUE sẽ trả về lỗi #VALUE! nếu giá trị của tham số date_text nằm ngoài phạm vi này.\nNếu bỏ qua phần năm trong tham số date_text, hàm DATEVALUE sẽ sử dụng năm hiện tại của đồng hồ tích hợp của máy tính. Thông tin thời gian trong tham số date_text sẽ bị bỏ qua."
		} }
	},
	DAY: {
		description: "Trả về ngày của một ngày cụ thể được biểu diễn bằng số sê-ri. Ngày là một số nguyên từ 1 đến 31.",
		abstract: "Chuyển đổi số sê-ri thành ngày của tháng",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/day-function"
		}],
		functionParameter: { serialNumber: {
			name: "Số sê-ri ngày",
			detail: "Ngày cần tìm. Nên sử dụng hàm DATE để nhập ngày hoặc nhập ngày dưới dạng kết quả của các công thức hoặc hàm khác. Ví dụ, sử dụng hàm DATE(2008,5,23) để nhập ngày 23 tháng 5 năm 2008."
		} }
	},
	DAYS: {
		description: "Trả về số ngày giữa hai ngày",
		abstract: "Trả về số ngày giữa hai ngày",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/days-function"
		}],
		functionParameter: {
			endDate: {
				name: "ngày kết thúc",
				detail: "Hai ngày mà bạn muốn biết số ngày giữa hai ngày đó."
			},
			startDate: {
				name: "ngày bắt đầu",
				detail: "Hai ngày mà bạn muốn biết số ngày giữa hai ngày đó."
			}
		}
	},
	DAYS360: {
		description: "Tính số ngày giữa hai ngày dựa trên năm 360 ngày",
		abstract: "Tính số ngày giữa hai ngày dựa trên năm 360 ngày",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/days360-function"
		}],
		functionParameter: {
			startDate: {
				name: "ngày bắt đầu",
				detail: "Hai ngày mà bạn muốn biết số ngày giữa hai ngày đó."
			},
			endDate: {
				name: "ngày kết thúc",
				detail: "Hai ngày mà bạn muốn biết số ngày giữa hai ngày đó."
			},
			method: {
				name: "phương pháp",
				detail: "Giá trị lô-gic xác định sẽ dùng phương pháp của Hoa Kỳ hay của châu Âu trong tính toán."
			}
		}
	},
	EDATE: {
		description: "Trả về số sê-ri đại diện cho ngày cách một số tháng chỉ định trước hoặc sau một ngày cụ thể (start_date). Sử dụng hàm EDATE để tính ngày đến hạn hoặc ngày hết hạn.",
		abstract: "Trả về số sê-ri của ngày cách start_date một số tháng chỉ định",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/edate-function"
		}],
		functionParameter: {
			startDate: {
				name: "Ngày bắt đầu",
				detail: "Ngày đại diện cho ngày bắt đầu. Nên sử dụng hàm DATE để nhập ngày hoặc nhập ngày dưới dạng kết quả của các công thức hoặc hàm khác. Ví dụ, sử dụng hàm DATE(2008,5,23) để nhập ngày 23 tháng 5 năm 2008."
			},
			months: {
				name: "Số tháng",
				detail: "Số tháng trước hoặc sau start_date. Giá trị dương sẽ trả về ngày trong tương lai; giá trị âm sẽ trả về ngày trong quá khứ."
			}
		}
	},
	EOMONTH: {
		description: "Trả về số sê-ri của ngày cuối cùng của tháng trước hoặc sau một số tháng chỉ định",
		abstract: "Trả về số sê-ri của ngày cuối cùng của tháng trước hoặc sau một số tháng chỉ định",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/eomonth-function"
		}],
		functionParameter: {
			startDate: {
				name: "Ngày bắt đầu",
				detail: "Ngày biểu thị ngày bắt đầu."
			},
			months: {
				name: "Số tháng",
				detail: "Số tháng trước hoặc sau start_date."
			}
		}
	},
	EPOCHTODATE: {
		description: "Chuyển đổi dấu thời gian bắt đầu của hệ thống Unix ở dạng giây, mili giây hoặc micrô giây thành dạng ngày giờ theo Giờ phối hợp quốc tế (UTC).",
		abstract: "Chuyển đổi dấu thời gian bắt đầu của hệ thống Unix ở dạng giây, mili giây hoặc micrô giây thành dạng ngày giờ theo Giờ phối hợp quốc tế (UTC).",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.google.com/docs/answer/13193461?hl=vi"
		}],
		functionParameter: {
			timestamp: {
				name: "dấu thời gian",
				detail: "EPOCHTODATE(1655908429662,2)"
			},
			unit: {
				name: "đơn vị thời gian",
				detail: "EPOCHTODATE(1655906710)"
			}
		}
	},
	HOUR: {
		description: "Chuyển đổi số sê-ri thành giờ",
		abstract: "Chuyển đổi số sê-ri thành giờ",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/hour-function"
		}],
		functionParameter: { serialNumber: {
			name: "Số sê-ri ngày",
			detail: "Ngày cần tìm. Nên sử dụng hàm DATE để nhập ngày hoặc nhập ngày dưới dạng kết quả của các công thức hoặc hàm khác. Ví dụ, sử dụng hàm DATE(2008,5,23) để nhập ngày 23 tháng 5 năm 2008."
		} }
	},
	ISOWEEKNUM: {
		description: "Trả về số tuần ISO của năm đối với ngày đã cho.",
		abstract: "Trả về số tuần ISO của năm đối với ngày đã cho.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/isoweeknum-function"
		}],
		functionParameter: { date: {
			name: "Ngày",
			detail: "Yêu cầu. Ngày là mã ngày-giờ được Excel dùng để tính toán ngày và giờ."
		} }
	},
	MINUTE: {
		description: "Trả về phút của một giá trị thời gian. Phút được trả về dưới dạng số nguyên, trong phạm vi từ 0 tới 59.",
		abstract: "Trả về phút của một giá trị thời gian. Phút được trả về dưới dạng số nguyên, trong phạm vi từ 0 tới 59.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/minute-function"
		}],
		functionParameter: { serialNumber: {
			name: "Số sê-ri ngày",
			detail: "Yêu cầu. Thời gian có chứa phút mà bạn muốn tìm. Thời gian có thể được nhập vào dưới dạng chuỗi văn bản đặt trong dấu ngoặc kép, (ví dụ \"6:45 CH\"), dạng số thập phân (ví dụ 0,78125, biểu thị cho 6:45 CH) hoặc dạng kết quả của các công thức hoặc hàm khác (ví dụ TIMEVALUE(\"6:45 CH\"))."
		} }
	},
	MONTH: {
		description: "Trả về tháng của một ngày cụ thể được biểu diễn bằng số sê-ri. Tháng là một số nguyên từ 1 (tháng 1) đến 12 (tháng 12).",
		abstract: "Chuyển đổi số sê-ri thành tháng",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/month-function"
		}],
		functionParameter: { serialNumber: {
			name: "Số sê-ri ngày",
			detail: "Ngày cần tìm. Nên sử dụng hàm DATE để nhập ngày hoặc nhập ngày dưới dạng kết quả của các công thức hoặc hàm khác. Ví dụ, sử dụng hàm DATE(2008,5,23) để nhập ngày 23 tháng 5 năm 2008."
		} }
	},
	NETWORKDAYS: {
		description: "Trả về số ngày làm việc giữa hai ngày. Ngày làm việc loại trừ cuối tuần và bất kỳ ngày nào được xác định là ngày nghỉ.",
		abstract: "Trả về số ngày làm việc giữa hai ngày",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/networkdays-function"
		}],
		functionParameter: {
			startDate: {
				name: "ngày bắt đầu",
				detail: "Một ngày đại diện cho ngày bắt đầu."
			},
			endDate: {
				name: "ngày kết thúc",
				detail: "Ngày đại diện cho ngày chấm dứt."
			},
			holidays: {
				name: "ngày lễ",
				detail: "Một phạm vi tùy chọn gồm một hoặc nhiều ngày không có trong lịch làm việc."
			}
		}
	},
	NETWORKDAYS_INTL: {
		description: "Trả về số ngày làm việc trọn vẹn ở giữa hai ngày bằng cách dùng tham số để cho biết có bao nhiêu ngày cuối tuần và đó là những ngày nào. Ngày cuối tuần và bất kỳ ngày nào được chỉ rõ là ngày lễ sẽ không được coi là ngày làm việc.",
		abstract: "Trả về số ngày làm việc trọn vẹn ở giữa hai ngày bằng cách dùng tham số để cho biết có bao nhiêu ngày cuối tuần và đó là những ngày nào. Ngày cuối tuần và bất kỳ ngày nào được chỉ rõ là ngày lễ sẽ không được coi là ngày làm việc.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/networkdays-intl-function"
		}],
		functionParameter: {
			startDate: {
				name: "ngày bắt đầu",
				detail: "Một ngày đại diện cho ngày bắt đầu."
			},
			endDate: {
				name: "ngày kết thúc",
				detail: "Ngày đại diện cho ngày chấm dứt."
			},
			weekend: {
				name: "ngày cuối tuần",
				detail: "Ngày cuối tuần có thể là số ngày cuối tuần hoặc một chuỗi cho biết ngày cuối tuần xảy ra khi nào."
			},
			holidays: {
				name: "ngày lễ",
				detail: "Một phạm vi tùy chọn gồm một hoặc nhiều ngày không có trong lịch làm việc."
			}
		}
	},
	NOW: {
		description: "Trả về số sê-ri của ngày và thời gian hiện tại. Nếu trước khi bạn nhập hàm vào ô, định dạng ô là Chung , thì Excel thay đổi định dạng ô để khớp với định dạng ngày và thời gian trong thiết đặt vùng của bạn. Bạn có thể thay đổi định dạng ngày và thời gian cho ô bằng các lệnh trong nhóm Số của tab Trang đầu trên Ribbon.",
		abstract: "Trả về số sê-ri của ngày và thời gian hiện tại. Nếu trước khi bạn nhập hàm vào ô, định dạng ô là Chung , thì Excel thay đổi định dạng ô để khớp với định dạng ngày và thời gian trong thiết đặt vùng của bạn. Bạn có thể thay đổi định dạng ngày và thời gian cho ô bằng các lệnh trong nhóm Số của tab Trang đầu trên Ribbon.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/now-function"
		}],
		functionParameter: {}
	},
	SECOND: {
		description: "Chuyển đổi số sê-ri thành giây",
		abstract: "Chuyển đổi số sê-ri thành giây",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/second-function"
		}],
		functionParameter: { serialNumber: {
			name: "Số sê-ri ngày",
			detail: "Ngày cần tìm. Nên sử dụng hàm DATE để nhập ngày hoặc nhập ngày dưới dạng kết quả của các công thức hoặc hàm khác. Ví dụ, sử dụng hàm DATE(2008,5,23) để nhập ngày 23 tháng 5 năm 2008."
		} }
	},
	TIME: {
		description: "Trả về số thập phân của một thời gian cụ thể. Nếu định dạng ô là General trước khi nhập hàm, kết quả sẽ được định dạng dưới dạng ngày tháng.",
		abstract: "Trả về số thập phân của một thời gian cụ thể",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/time-function"
		}],
		functionParameter: {
			hour: {
				name: "Giờ",
				detail: "Một số từ 0 (không) đến 32767 biểu thị giờ. Bất kỳ giá trị nào lớn hơn 23 đều được chia cho 24 và phần còn lại được sử dụng làm giá trị giờ. Ví dụ: TIME(27,0,0) = TIME(3,0,0) = 0,125 hoặc 3:00 AM."
			},
			minute: {
				name: "phút",
				detail: "Một số từ 0 đến 32767 biểu thị số phút. Mọi giá trị lớn hơn 59 sẽ được chuyển đổi thành giờ và phút. Ví dụ: TIME(0,750,0) = TIME(12,30,0) = 0,520833 hoặc 12:30 PM."
			},
			second: {
				name: "giây",
				detail: "Một số từ 0 đến 32767 biểu thị giây. Mọi giá trị lớn hơn 59 sẽ được chuyển đổi thành giờ, phút và giây. Ví dụ: TIME(0,0,2000) = TIME(0,33,22) = 0,023148 ​​​​hoặc 12:33:20 AM."
			}
		}
	},
	TIMEVALUE: {
		description: "Chuyển đổi một thời gian ở dạng văn bản thành số thập phân đại diện cho thời gian đó trong Excel.",
		abstract: "Chuyển đổi một thời gian ở dạng văn bản thành số thập phân đại diện cho thời gian đó trong Excel",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/timevalue-function"
		}],
		functionParameter: { timeText: {
			name: "Văn bản thời gian",
			detail: "Chuỗi văn bản đại diện cho một thời gian trong định dạng thời gian Excel, ví dụ, \"6:45 PM\" và \"18:45\" là văn bản chuỗi trong dấu ngoặc kép đại diện cho thời gian."
		} }
	},
	TO_DATE: {
		description: "Chuyển đổi một số cho sẵn thành giá trị ngày (theo lịch).",
		abstract: "Chuyển đổi một số cho sẵn thành giá trị ngày (theo lịch).",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.google.com/docs/answer/3094239?hl=vi"
		}],
		functionParameter: { value: {
			name: "giá trị",
			detail: "TO_DATE(A2)"
		} }
	},
	TODAY: {
		description: "Trả về ngày hiện tại. Hàm này rất hữu ích khi cần sử dụng ngày hiện tại trong các công thức hoặc để tính toán khoảng thời gian liên quan đến ngày hiện tại.",
		abstract: "Trả về ngày hiện tại",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/today-function"
		}],
		functionParameter: {}
	},
	WEEKDAY: {
		description: "Chuyển đổi số sê-ri thành ngày trong tuần",
		abstract: "Chuyển đổi số sê-ri thành ngày trong tuần",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/weekday-function"
		}],
		functionParameter: {
			serialNumber: {
				name: "Số sê-ri ngày",
				detail: "Số sê-ri đại diện cho ngày trong ngày cố gắng tra cứu."
			},
			returnType: {
				name: "Kiểu giá trị trả về",
				detail: "Một số được sử dụng để xác định loại giá trị trả về."
			}
		}
	},
	WEEKNUM: {
		description: "Trả về số tuần của một ngày cụ thể trong một năm",
		abstract: "Trả về số tuần của một ngày cụ thể trong một năm",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/weeknum-function"
		}],
		functionParameter: {
			serialNumber: {
				name: "Số sê-ri ngày",
				detail: "Đại diện cho ngày trong tuần."
			},
			returnType: {
				name: "Kiểu giá trị trả về",
				detail: "Một con số xác định ngày bắt đầu trong tuần. Giá trị mặc định là 1."
			}
		}
	},
	WORKDAY: {
		description: "Trả về số sê-ri của ngày trước hoặc sau một số ngày làm việc đã chỉ định. Ngày làm việc không bao gồm ngày cuối tuần và bất kỳ ngày nào được xác định là ngày nghỉ.",
		abstract: "Trả về số sê-ri của ngày trước hoặc sau một số ngày làm việc đã chỉ định",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/workday-function"
		}],
		functionParameter: {
			startDate: {
				name: "Ngày bắt đầu",
				detail: "Ngày đại diện cho ngày bắt đầu. Nên sử dụng hàm DATE để nhập ngày hoặc nhập ngày dưới dạng kết quả của các công thức hoặc hàm khác. Ví dụ, sử dụng hàm DATE(2008,5,23) để nhập ngày 23 tháng 5 năm 2008."
			},
			days: {
				name: "Số ngày",
				detail: "Số ngày làm việc trước hoặc sau start_date. Giá trị dương sẽ trả về ngày trong tương lai; giá trị âm sẽ trả về ngày trong quá khứ."
			},
			holidays: {
				name: "Ngày nghỉ",
				detail: "Danh sách tùy chọn một hoặc nhiều ngày làm việc cần loại trừ khỏi lịch làm việc."
			}
		}
	},
	WORKDAY_INTL: {
		description: "Trả về số sê-ri của ngày trước hoặc sau một số ngày làm việc xác định, với tham số chỉ định ngày nào và bao nhiêu ngày là cuối tuần",
		abstract: "Trả về số sê-ri của ngày trước hoặc sau một số ngày làm việc xác định, với tham số chỉ định ngày nào và bao nhiêu ngày là cuối tuần",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/workday-intl-function"
		}],
		functionParameter: {
			startDate: {
				name: "Ngày bắt đầu",
				detail: "Một ngày đại diện cho ngày bắt đầu."
			},
			days: {
				name: "Số ngày",
				detail: "Số ngày làm việc trước hoặc sau start_date. Giá trị dương sẽ trả về ngày trong tương lai; giá trị âm sẽ trả về ngày trong quá khứ."
			},
			weekend: {
				name: "ngày cuối tuần",
				detail: "Ngày cuối tuần có thể là số ngày cuối tuần hoặc một chuỗi cho biết ngày cuối tuần xảy ra khi nào."
			},
			holidays: {
				name: "ngày lễ",
				detail: "Một phạm vi tùy chọn gồm một hoặc nhiều ngày không có trong lịch làm việc."
			}
		}
	},
	YEAR: {
		description: "Chuyển đổi số sê-ri thành năm",
		abstract: "Chuyển đổi số sê-ri thành năm",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/year-function"
		}],
		functionParameter: { serialNumber: {
			name: "Số sê-ri ngày",
			detail: "Ngày cần tìm. Nên sử dụng hàm DATE để nhập ngày hoặc nhập ngày dưới dạng kết quả của các công thức hoặc hàm khác. Ví dụ, sử dụng hàm DATE(2008,5,23) để nhập ngày 23 tháng 5 năm 2008."
		} }
	},
	YEARFRAC: {
		description: "Trả về phân số của năm đại diện cho số ngày trọn vẹn giữa start_date và end_date. Ví dụ, bạn có thể sử dụng hàm YEARFRAC để xác định tỷ lệ lợi nhuận hàng năm nếu bạn biết số ngày giữa hai ngày hoặc nếu bạn cần tính tỷ lệ hoàn trả cho một khoản vay.",
		abstract: "Trả về phân số của năm đại diện cho số ngày trọn vẹn giữa start_date và end_date",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/yearfrac-function"
		}],
		functionParameter: {
			startDate: {
				name: "Ngày bắt đầu",
				detail: "Ngày đại diện cho ngày bắt đầu. Nên sử dụng hàm DATE để nhập ngày hoặc nhập ngày dưới dạng kết quả của các công thức hoặc hàm khác. Ví dụ, sử dụng hàm DATE(2008,5,23) để nhập ngày 23 tháng 5 năm 2008."
			},
			endDate: {
				name: "Ngày kết thúc",
				detail: "Ngày đại diện cho ngày kết thúc. Nên sử dụng hàm DATE để nhập ngày hoặc nhập ngày dưới dạng kết quả của các công thức hoặc hàm khác."
			},
			basis: {
				name: "Cơ sở",
				detail: "Cơ sở hoặc phương pháp tính số ngày cần sử dụng."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/engineering/vi-VN.ts
const locale$10 = {
	BESSELI: {
		description: "Trả về hàm Bessel sửa đổi In(x)",
		abstract: "Trả về hàm Bessel sửa đổi In(x)",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/besseli-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "Giá trị để đánh giá hàm."
			},
			n: {
				name: "N",
				detail: "Bậc của hàm Bessel. Nếu n không phải là số nguyên thì nó bị cắt cụt."
			}
		}
	},
	BESSELJ: {
		description: "Trả về hàm Bessel Jn(x)",
		abstract: "Trả về hàm Bessel Jn(x)",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/besselj-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "Giá trị để đánh giá hàm."
			},
			n: {
				name: "N",
				detail: "Bậc của hàm Bessel. Nếu n không phải là số nguyên thì nó bị cắt cụt."
			}
		}
	},
	BESSELK: {
		description: "Trả về hàm Bessel sửa đổi Kn(x)",
		abstract: "Trả về hàm Bessel sửa đổi Kn(x)",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/besselk-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "Giá trị để đánh giá hàm."
			},
			n: {
				name: "N",
				detail: "Bậc của hàm Bessel. Nếu n không phải là số nguyên thì nó bị cắt cụt."
			}
		}
	},
	BESSELY: {
		description: "Trả về hàm Bessel Yn(x)",
		abstract: "Trả về hàm Bessel Yn(x)",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/bessely-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "Giá trị để đánh giá hàm."
			},
			n: {
				name: "N",
				detail: "Bậc của hàm Bessel. Nếu n không phải là số nguyên thì nó bị cắt cụt."
			}
		}
	},
	BIN2DEC: {
		description: "Chuyển đổi số nhị phân thành số thập phân",
		abstract: "Chuyển đổi số nhị phân thành số thập phân",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/bin2dec-function"
		}],
		functionParameter: { number: {
			name: "Số nhị phân",
			detail: "Số nhị phân mà bạn muốn chuyển đổi."
		} }
	},
	BIN2HEX: {
		description: "Chuyển đổi số nhị phân thành số thập lục phân",
		abstract: "Chuyển đổi số nhị phân thành số thập lục phân",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/bin2hex-function"
		}],
		functionParameter: {
			number: {
				name: "Số nhị phân",
				detail: "Số nhị phân mà bạn muốn chuyển đổi."
			},
			places: {
				name: "Số ký tự",
				detail: "Số ký tự sử dụng."
			}
		}
	},
	BIN2OCT: {
		description: "Chuyển đổi số nhị phân sang bát phân.",
		abstract: "Chuyển đổi số nhị phân sang bát phân.",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/bin2oct-function"
		}],
		functionParameter: {
			number: {
				name: "Số nhị phân",
				detail: "Bắt buộc. Số nhị phân mà bạn muốn chuyển đổi. Số không được chứa quá 10 ký tự (10 bit). Bit quan trọng nhất của số là bit dấu. 9 bit còn lại là các bit độ lớn. Các số âm được thể hiện bằng cách sử dụng ký hiệu hai thành phần."
			},
			places: {
				name: "Số ký tự",
				detail: "chọn. Số ký tự sử dụng. Nếu bỏ qua khoảng trắng, BIN2OCT dùng số ký tự tối thiểu cần thiết. Khoảng trắng có tác dụng đệm cho giá trị trả về có số 0 (không) đằng trước."
			}
		}
	},
	BITAND: {
		description: "Trả về phép 'và' theo bit của hai số",
		abstract: "Trả về phép 'và' theo bit của hai số",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/bitand-function"
		}],
		functionParameter: {
			number1: {
				name: "Giá trị 1",
				detail: "Phải là dạng thập phân và lớn hơn hoặc bằng 0."
			},
			number2: {
				name: "Giá trị 2",
				detail: "Phải là dạng thập phân và lớn hơn hoặc bằng 0."
			}
		}
	},
	BITLSHIFT: {
		description: "Trả về giá trị tính toán của số nhận được bằng cách dịch chuyển sang trái shift_amount bit",
		abstract: "Trả về giá trị tính toán của số nhận được bằng cách dịch chuyển sang trái shift_amount bit",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/bitlshift-function"
		}],
		functionParameter: {
			number: {
				name: "giá trị số",
				detail: "phải là số nguyên lớn hơn hoặc bằng 0."
			},
			shiftAmount: {
				name: "Số tiền ca",
				detail: "phải là số nguyên."
			}
		}
	},
	BITOR: {
		description: "Trả về phép 'hoặc' theo bit của hai số",
		abstract: "Trả về phép 'hoặc' theo bit của hai số",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/bitor-function"
		}],
		functionParameter: {
			number1: {
				name: "Giá trị 1",
				detail: "Phải là dạng thập phân và lớn hơn hoặc bằng 0."
			},
			number2: {
				name: "Giá trị 2",
				detail: "Phải là dạng thập phân và lớn hơn hoặc bằng 0."
			}
		}
	},
	BITRSHIFT: {
		description: "Trả về giá trị tính toán của số nhận được bằng cách dịch chuyển sang phải shift_amount bit",
		abstract: "Trả về giá trị tính toán của số nhận được bằng cách dịch chuyển sang phải shift_amount bit",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/bitrshift-function"
		}],
		functionParameter: {
			number: {
				name: "giá trị số",
				detail: "phải là số nguyên lớn hơn hoặc bằng 0."
			},
			shiftAmount: {
				name: "Số tiền ca",
				detail: "phải là số nguyên."
			}
		}
	},
	BITXOR: {
		description: "Trả về phép 'xor' theo bit của hai số",
		abstract: "Trả về phép 'xor' theo bit của hai số",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/bitxor-function"
		}],
		functionParameter: {
			number1: {
				name: "Giá trị 1",
				detail: "Phải là dạng thập phân và lớn hơn hoặc bằng 0."
			},
			number2: {
				name: "Giá trị 2",
				detail: "Phải là dạng thập phân và lớn hơn hoặc bằng 0."
			}
		}
	},
	COMPLEX: {
		description: "Chuyển đổi hệ số thực và hệ số ảo thành số phức",
		abstract: "Chuyển đổi hệ số thực và hệ số ảo thành số phức",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/complex-function"
		}],
		functionParameter: {
			realNum: {
				name: "hệ số thực",
				detail: "Hệ số thực của số phức."
			},
			iNum: {
				name: "hệ số ảo",
				detail: "Hệ số ảo của số phức."
			},
			suffix: {
				name: "hậu tố",
				detail: "Hậu tố cho thành phần ảo của số phức. Nếu bị bỏ qua, hậu tố được giả định là \"i\"."
			}
		}
	},
	CONVERT: {
		description: "Chuyển đổi số từ hệ đo lường này sang hệ đo lường khác",
		abstract: "Chuyển đổi số từ hệ đo lường này sang hệ đo lường khác",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/convert-function"
		}],
		functionParameter: {
			number: {
				name: "giá trị số",
				detail: "Giá trị cần chuyển đổi."
			},
			fromUnit: {
				name: "Đơn vị trước khi chuyển đổi",
				detail: "là đơn vị của giá trị số."
			},
			toUnit: {
				name: "Đơn vị chuyển đổi",
				detail: "là đơn vị của kết quả."
			}
		}
	},
	DEC2BIN: {
		description: "Chuyển đổi số thập phân thành số nhị phân",
		abstract: "Chuyển đổi số thập phân thành số nhị phân",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/dec2bin-function"
		}],
		functionParameter: {
			number: {
				name: "Số thập phân",
				detail: "Số nguyên thập phân mà bạn muốn chuyển đổi."
			},
			places: {
				name: "Số ký tự",
				detail: "Số ký tự sử dụng."
			}
		}
	},
	DEC2HEX: {
		description: "Chuyển đổi số thập phân thành số thập lục phân",
		abstract: "Chuyển đổi số thập phân thành số thập lục phân",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/dec2hex-function"
		}],
		functionParameter: {
			number: {
				name: "Số thập phân",
				detail: "Số nguyên thập phân mà bạn muốn chuyển đổi."
			},
			places: {
				name: "Số ký tự",
				detail: "Số ký tự sử dụng."
			}
		}
	},
	DEC2OCT: {
		description: "Chuyển đổi số thập phân thành số bát phân",
		abstract: "Chuyển đổi số thập phân thành số bát phân",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/dec2oct-function"
		}],
		functionParameter: {
			number: {
				name: "Số thập phân",
				detail: "Số nguyên thập phân mà bạn muốn chuyển đổi."
			},
			places: {
				name: "Số ký tự",
				detail: "Số ký tự sử dụng."
			}
		}
	},
	DELTA: {
		description: "Kiểm tra hai giá trị có bằng nhau không",
		abstract: "Kiểm tra hai giá trị có bằng nhau không",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/delta-function"
		}],
		functionParameter: {
			number1: {
				name: "giá trị số 1",
				detail: "Số thứ nhất."
			},
			number2: {
				name: "giá trị số 2",
				detail: "Số thứ hai. Nếu bị bỏ qua, number2 được cho là bằng không."
			}
		}
	},
	ERF: {
		description: "Trả về hàm lỗi",
		abstract: "Trả về hàm lỗi",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/erf-function"
		}],
		functionParameter: {
			lowerLimit: {
				name: "Giơi hạn dươi",
				detail: "Giới hạn dưới để lấy tích phân hàm ERF."
			},
			upperLimit: {
				name: "giới hạn trên",
				detail: "Giới hạn trên để lấy tích phân hàm ERF. Nếu bị bỏ qua, hàm ERF lấy tích phân giữa số không và lower_limit."
			}
		}
	},
	ERF_PRECISE: {
		description: "Trả về hàm lỗi",
		abstract: "Trả về hàm lỗi",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/erf-precise-function"
		}],
		functionParameter: { x: {
			name: "Giơi hạn dươi",
			detail: "Giới hạn dưới để lấy tích phân hàm ERF.PRECISE."
		} }
	},
	ERFC: {
		description: "Trả về hàm lỗi bổ sung",
		abstract: "Trả về hàm lỗi bổ sung",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/erfc-function"
		}],
		functionParameter: { x: {
			name: "Giơi hạn dươi",
			detail: "Giới hạn dưới để lấy tích phân hàm ERFC."
		} }
	},
	ERFC_PRECISE: {
		description: "Trả về hàm ERF bổ sung từ x đến vô cực",
		abstract: "Trả về hàm ERF bổ sung từ x đến vô cực",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/erfc-precise-function"
		}],
		functionParameter: { x: {
			name: "Giơi hạn dươi",
			detail: "Giới hạn dưới để lấy tích phân hàm ERFC.PRECISE."
		} }
	},
	GESTEP: {
		description: "Kiểm tra số có lớn hơn ngưỡng không",
		abstract: "Kiểm tra số có lớn hơn ngưỡng không",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/gestep-function"
		}],
		functionParameter: {
			number: {
				name: "số",
				detail: "Giá trị để kiểm tra bước."
			},
			step: {
				name: "ngưỡng",
				detail: "Giá trị ngưỡng. Nếu bạn bỏ qua giá trị của bước, hàm GESTEP sẽ dùng số 0."
			}
		}
	},
	HEX2BIN: {
		description: "Chuyển đổi số thập lục phân thành số nhị phân",
		abstract: "Chuyển đổi số thập lục phân thành số nhị phân",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/hex2bin-function"
		}],
		functionParameter: {
			number: {
				name: "số thập lục phân",
				detail: "Số thập lục phân mà bạn muốn chuyển đổi."
			},
			places: {
				name: "Số ký tự",
				detail: "Số ký tự sử dụng."
			}
		}
	},
	HEX2DEC: {
		description: "Chuyển đổi số thập lục phân thành số thập phân",
		abstract: "Chuyển đổi số thập lục phân thành số thập phân",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/hex2dec-function"
		}],
		functionParameter: { number: {
			name: "số thập lục phân",
			detail: "Số thập lục phân mà bạn muốn chuyển đổi."
		} }
	},
	HEX2OCT: {
		description: "Chuyển đổi số thập lục phân thành số bát phân",
		abstract: "Chuyển đổi số thập lục phân thành số bát phân",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/hex2oct-function"
		}],
		functionParameter: {
			number: {
				name: "số thập lục phân",
				detail: "Số thập lục phân mà bạn muốn chuyển đổi."
			},
			places: {
				name: "Số ký tự",
				detail: "Số ký tự sử dụng."
			}
		}
	},
	IMABS: {
		description: "Trả về giá trị tuyệt đối (môđun) của số phức",
		abstract: "Trả về giá trị tuyệt đối (môđun) của số phức",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/imabs-function"
		}],
		functionParameter: { inumber: {
			name: "số phức",
			detail: "Số phức mà bạn muốn tìm giá trị tuyệt đối của nó."
		} }
	},
	IMAGINARY: {
		description: "Trả về hệ số ảo của một số phức trong định dạng văn bản x + yi hoặc x + yj.",
		abstract: "Trả về hệ số ảo của một số phức trong định dạng văn bản x + yi hoặc x + yj.",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/imaginary-function"
		}],
		functionParameter: { inumber: {
			name: "số phức",
			detail: "Yêu cầu. Số phức mà bạn muốn tìm hệ số ảo của nó."
		} }
	},
	IMARGUMENT: {
		description: "Trả về tham số theta, tức là góc được biểu diễn bằng radian",
		abstract: "Trả về tham số theta, tức là góc được biểu diễn bằng radian",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/imargument-function"
		}],
		functionParameter: { inumber: {
			name: "số phức",
			detail: "Số phức mà bạn muốn tìm đối số theta."
		} }
	},
	IMCONJUGATE: {
		description: "Trả về số phức liên hợp của số phức",
		abstract: "Trả về số phức liên hợp của số phức",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/imconjugate-function"
		}],
		functionParameter: { inumber: {
			name: "số phức",
			detail: "Số phức mà bạn muốn tìm số liên hợp của nó."
		} }
	},
	IMCOS: {
		description: "Trả về cosine của số phức",
		abstract: "Trả về cosine của số phức",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/imcos-function"
		}],
		functionParameter: { inumber: {
			name: "số phức",
			detail: "Số phức mà bạn muốn tìm cosin của nó."
		} }
	},
	IMCOSH: {
		description: "Trả về hyperbolic cosine của số phức",
		abstract: "Trả về hyperbolic cosine của số phức",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/imcosh-function"
		}],
		functionParameter: { inumber: {
			name: "số phức",
			detail: "Số phức mà bạn muốn lấy cosin hyperbolic."
		} }
	},
	IMCOT: {
		description: "Trả về cotangent của số phức",
		abstract: "Trả về cotangent của số phức",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/imcot-function"
		}],
		functionParameter: { inumber: {
			name: "số phức",
			detail: "Số phức mà bạn muốn lấy cotangent."
		} }
	},
	IMCOTH: {
		description: "Hàm IMCOTH trả về cotang hyperbol của một số phức đã cho. Ví dụ: một số phức đã cho \"x+yi\" trả về \"coth(x+yi)\".",
		abstract: "Hàm IMCOTH trả về cotang hyperbol của một số phức đã cho. Ví dụ: một số phức đã cho \"x+yi\" trả về \"coth(x+yi)\".",
		links: [{
			title: "Giảng dạy",
			url: "https://support.google.com/docs/answer/9366256?hl=vi"
		}],
		functionParameter: { inumber: {
			name: "số phức",
			detail: "IMCOTH(4)"
		} }
	},
	IMCSC: {
		description: "Trả về cosecant của số phức",
		abstract: "Trả về cosecant của số phức",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/imcsc-function"
		}],
		functionParameter: { inumber: {
			name: "số phức",
			detail: "Số phức mà bạn muốn lấy cosecant."
		} }
	},
	IMCSCH: {
		description: "Trả về hyperbolic cosecant của số phức",
		abstract: "Trả về hyperbolic cosecant của số phức",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/imcsch-function"
		}],
		functionParameter: { inumber: {
			name: "số phức",
			detail: "Số phức mà bạn muốn lấy hyperbolic cosecant."
		} }
	},
	IMDIV: {
		description: "Trả về thương của hai số phức",
		abstract: "Trả về thương của hai số phức",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/imdiv-function"
		}],
		functionParameter: {
			inumber1: {
				name: "tử số phức",
				detail: "Số bị chia hoặc tử số phức."
			},
			inumber2: {
				name: "mẫu số phức",
				detail: "Ước số hoặc mẫu số phức."
			}
		}
	},
	IMEXP: {
		description: "Trả về exponent của số phức",
		abstract: "Trả về exponent của số phức",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/imexp-function"
		}],
		functionParameter: { inumber: {
			name: "số phức",
			detail: "Số phức mà bạn muốn tìm hàm mũ của nó."
		} }
	},
	IMLN: {
		description: "Trả về logarithm tự nhiên của số phức",
		abstract: "Trả về logarithm tự nhiên của số phức",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/imln-function"
		}],
		functionParameter: { inumber: {
			name: "số phức",
			detail: "Số phức mà bạn muốn tìm lô-ga-rit tự nhiên của nó."
		} }
	},
	IMLOG: {
		description: "Hàm IMLOG trả về lôgarit của một số phức với cơ số xác định.",
		abstract: "Hàm IMLOG trả về lôgarit của một số phức với cơ số xác định.",
		links: [{
			title: "Giảng dạy",
			url: "https://support.google.com/docs/answer/9366486?hl=vi"
		}],
		functionParameter: {
			inumber: {
				name: "số phức",
				detail: "Giá trị nhập vào của hàm lôgarit. Số này có thể được viết dưới dạng số tự nhiên, ví dụ: 1, được hiểu là số thực. Số này có thể được viết dưới dạng văn bản trích dẫn để chỉ định cả hệ số thực và hệ số phức."
			},
			base: {
				name: "cơ số",
				detail: "Cơ số cần sử dụng khi tính lôgarit. Phải là một số thực dương."
			}
		}
	},
	IMLOG10: {
		description: "Trả về logarithm cơ số 10 của số phức",
		abstract: "Trả về logarithm cơ số 10 của số phức",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/imlog10-function"
		}],
		functionParameter: { inumber: {
			name: "số phức",
			detail: "Số phức mà bạn muốn tìm lô-ga-rit thập phân của nó."
		} }
	},
	IMLOG2: {
		description: "Trả về logarithm cơ số 2 của số phức",
		abstract: "Trả về logarithm cơ số 2 của số phức",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/imlog2-function"
		}],
		functionParameter: { inumber: {
			name: "số phức",
			detail: "Số phức mà bạn muốn tìm lô-ga-rit cơ số 2 của nó."
		} }
	},
	IMPOWER: {
		description: "Trả về lũy thừa của một số phức với số nguyên",
		abstract: "Trả về lũy thừa của một số phức với số nguyên",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/impower-function"
		}],
		functionParameter: {
			inumber: {
				name: "số phức",
				detail: "Một số phức mà bạn muốn nâng lên theo một lũy thừa."
			},
			number: {
				name: "số",
				detail: "Lũy thừa mà bạn muốn nâng số phức lên theo đó."
			}
		}
	},
	IMPRODUCT: {
		description: "Trả về tích của nhiều số phức",
		abstract: "Trả về tích của nhiều số phức",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/improduct-function"
		}],
		functionParameter: {
			inumber1: {
				name: "số phức 1",
				detail: "1 tới 255 số phức cần nhân với nhau."
			},
			inumber2: {
				name: "số phức 2",
				detail: "1 tới 255 số phức cần nhân với nhau."
			}
		}
	},
	IMREAL: {
		description: "Trả về phần thực của số phức",
		abstract: "Trả về phần thực của số phức",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/imreal-function"
		}],
		functionParameter: { inumber: {
			name: "số phức",
			detail: "Số phức mà bạn muốn tìm hệ số thực của nó."
		} }
	},
	IMSEC: {
		description: "Trả về giá trị sec của số phức",
		abstract: "Trả về giá trị sec của số phức",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/imsec-function"
		}],
		functionParameter: { inumber: {
			name: "số phức",
			detail: "Số phức mà bạn muốn lấy sec."
		} }
	},
	IMSECH: {
		description: "Trả về giá trị sech của số phức",
		abstract: "Trả về giá trị sech của số phức",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/imsech-function"
		}],
		functionParameter: { inumber: {
			name: "số phức",
			detail: "Số phức mà bạn muốn lấy sech."
		} }
	},
	IMSIN: {
		description: "Trả về sin của số phức",
		abstract: "Trả về sin của số phức",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/imsin-function"
		}],
		functionParameter: { inumber: {
			name: "số phức",
			detail: "Số phức mà bạn muốn lấy sin."
		} }
	},
	IMSINH: {
		description: "Trả về giá trị sinh của số phức",
		abstract: "Trả về giá trị sinh của số phức",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/imsinh-function"
		}],
		functionParameter: { inumber: {
			name: "số phức",
			detail: "Số phức mà bạn muốn lấy sinh."
		} }
	},
	IMSQRT: {
		description: "Trả về căn bậc hai của số phức",
		abstract: "Trả về căn bậc hai của số phức",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/imsqrt-function"
		}],
		functionParameter: { inumber: {
			name: "số phức",
			detail: "Số phức mà bạn muốn tìm căn bậc hai của nó."
		} }
	},
	IMSUB: {
		description: "Trả về hiệu của hai số phức",
		abstract: "Trả về hiệu của hai số phức",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/imsub-function"
		}],
		functionParameter: {
			inumber1: {
				name: "số phức 1",
				detail: "số phức 1."
			},
			inumber2: {
				name: "số phức 2",
				detail: "số phức 2."
			}
		}
	},
	IMSUM: {
		description: "Trả về tổng của nhiều số phức",
		abstract: "Trả về tổng của nhiều số phức",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/imsum-function"
		}],
		functionParameter: {
			inumber1: {
				name: "số phức 1",
				detail: "1 tới 255 số phức cần cộng với nhau."
			},
			inumber2: {
				name: "số phức 2",
				detail: "1 tới 255 số phức cần cộng với nhau."
			}
		}
	},
	IMTAN: {
		description: "Trả về tan của số phức",
		abstract: "Trả về tan của số phức",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/imtan-function"
		}],
		functionParameter: { inumber: {
			name: "số phức",
			detail: "Số phức mà bạn muốn lấy tan."
		} }
	},
	IMTANH: {
		description: "Hàm IMTANH trả về tang hyperbol của một số phức đã cho. Ví dụ: một số phức đã cho \"x+yi\" trả về \"tanh(x+yi)\".",
		abstract: "Hàm IMTANH trả về tang hyperbol của một số phức đã cho. Ví dụ: một số phức đã cho \"x+yi\" trả về \"tanh(x+yi)\".",
		links: [{
			title: "Giảng dạy",
			url: "https://support.google.com/docs/answer/9366655?hl=vi"
		}],
		functionParameter: { inumber: {
			name: "số phức",
			detail: "Số phức mà bạn muốn tìm tang hyperbol. Đây có thể là kết quả của hàm COMPLEX, một số thực được hiểu là số phức có các phần ảo bằng 0, hoặc một chuỗi ở định dạng “x+yi”, trong đó x và y là số."
		} }
	},
	OCT2BIN: {
		description: "Chuyển đổi số bát phân thành số nhị phân",
		abstract: "Chuyển đổi số bát phân thành số nhị phân",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/oct2bin-function"
		}],
		functionParameter: {
			number: {
				name: "Số bát phân",
				detail: "Số bát phân mà bạn muốn chuyển đổi."
			},
			places: {
				name: "Số ký tự",
				detail: "Số ký tự sử dụng."
			}
		}
	},
	OCT2DEC: {
		description: "Chuyển đổi số bát phân thành số thập phân",
		abstract: "Chuyển đổi số bát phân thành số thập phân",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/oct2dec-function"
		}],
		functionParameter: { number: {
			name: "Số bát phân",
			detail: "Số bát phân mà bạn muốn chuyển đổi."
		} }
	},
	OCT2HEX: {
		description: "Chuyển đổi số bát phân thành số mười lăm phân",
		abstract: "Chuyển đổi số bát phân thành số mười lăm phân",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/oct2hex-function"
		}],
		functionParameter: {
			number: {
				name: "Số bát phân",
				detail: "Số bát phân mà bạn muốn chuyển đổi."
			},
			places: {
				name: "Số ký tự",
				detail: "Số ký tự sử dụng."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/financial/vi-VN.ts
const locale$9 = {
	ACCRINT: {
		description: "Trả về lãi tích lũy của một trái phiếu trả lãi định kỳ",
		abstract: "Trả về lãi tích lũy của một trái phiếu trả lãi định kỳ",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/accrint-function"
		}],
		functionParameter: {
			issue: {
				name: "ngày phát hành",
				detail: "Ngày phát hành chứng khoán."
			},
			firstInterest: {
				name: "ngày tính lãi đầu tiên",
				detail: "Ngày tính lãi đầu tiên của chứng khoán."
			},
			settlement: {
				name: "ngày thanh toán",
				detail: "Ngày thanh toán chứng khoán."
			},
			rate: {
				name: "lãi suất",
				detail: "Lãi suất phiếu lãi hàng năm của chứng khoán."
			},
			par: {
				name: "mệnh giá",
				detail: "Mệnh giá của chứng khoán."
			},
			frequency: {
				name: "tần số",
				detail: "Số lần thanh toán phiếu lãi hàng năm."
			},
			basis: {
				name: "điểm chuẩn",
				detail: "Loại cơ sở đếm ngày sẽ dùng."
			},
			calcMethod: {
				name: "phương pháp tính toán",
				detail: "Là một giá trị logic: tiền lãi tích lũy từ ngày phát hành = TRUE hoặc bị bỏ qua; được tính từ ngày thanh toán phiếu lãi cuối cùng = FALSE."
			}
		}
	},
	ACCRINTM: {
		description: "Trả về lãi tích lũy của một trái phiếu trả lãi khi đáo hạn",
		abstract: "Trả về lãi tích lũy của một trái phiếu trả lãi khi đáo hạn",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/accrintm-function"
		}],
		functionParameter: {
			issue: {
				name: "ngày phát hành",
				detail: "Ngày phát hành chứng khoán."
			},
			settlement: {
				name: "ngày thanh toán",
				detail: "Ngày thanh toán chứng khoán."
			},
			rate: {
				name: "lãi suất",
				detail: "Lãi suất phiếu lãi hàng năm của chứng khoán."
			},
			par: {
				name: "mệnh giá",
				detail: "Mệnh giá của chứng khoán."
			},
			basis: {
				name: "điểm chuẩn",
				detail: "Loại cơ sở đếm ngày sẽ dùng."
			}
		}
	},
	AMORDEGRC: {
		description: "Trả về giá trị khấu hao cho mỗi kỳ kế toán sử dụng hệ số khấu hao",
		abstract: "Trả về giá trị khấu hao cho mỗi kỳ kế toán sử dụng hệ số khấu hao",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/amordegrc-function"
		}],
		functionParameter: {
			cost: {
				name: "trị giá",
				detail: "Chi phí của tài sản."
			},
			datePurchased: {
				name: "ngày mua",
				detail: "Ngày mua tài sản."
			},
			firstPeriod: {
				name: "kỳ đầu tiên",
				detail: "Ngày kết thúc của kỳ thứ nhất."
			},
			salvage: {
				name: "giá trị còn lại",
				detail: "Giá trị thu hồi khi kết thúc vòng đời của tài sản."
			},
			period: {
				name: "kỳ",
				detail: "Kỳ."
			},
			rate: {
				name: "tỷ lệ khấu hao",
				detail: "Tỷ lệ khấu hao."
			},
			basis: {
				name: "điểm chuẩn",
				detail: "Cơ sở năm được dùng."
			}
		}
	},
	AMORLINC: {
		description: "Trả về giá trị khấu hao cho mỗi kỳ kế toán",
		abstract: "Trả về giá trị khấu hao cho mỗi kỳ kế toán",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/amorlinc-function"
		}],
		functionParameter: {
			cost: {
				name: "trị giá",
				detail: "Chi phí của tài sản."
			},
			datePurchased: {
				name: "ngày mua",
				detail: "Ngày mua tài sản."
			},
			firstPeriod: {
				name: "kỳ đầu tiên",
				detail: "Ngày kết thúc của kỳ thứ nhất."
			},
			salvage: {
				name: "giá trị còn lại",
				detail: "Giá trị thu hồi khi kết thúc vòng đời của tài sản."
			},
			period: {
				name: "kỳ",
				detail: "Kỳ."
			},
			rate: {
				name: "tỷ lệ khấu hao",
				detail: "Tỷ lệ khấu hao."
			},
			basis: {
				name: "điểm chuẩn",
				detail: "Cơ sở năm được dùng."
			}
		}
	},
	COUPDAYBS: {
		description: "Trả về số ngày từ đầu kỳ trả lãi đến ngày thanh toán",
		abstract: "Trả về số ngày từ đầu kỳ trả lãi đến ngày thanh toán",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/coupdaybs-function"
		}],
		functionParameter: {
			settlement: {
				name: "ngày thanh toán",
				detail: "Ngày thanh toán chứng khoán."
			},
			maturity: {
				name: "ngày đáo hạn",
				detail: "Ngày đáo hạn của chứng khoán."
			},
			frequency: {
				name: "tần số",
				detail: "Số lần thanh toán phiếu lãi hàng năm."
			},
			basis: {
				name: "điểm chuẩn",
				detail: "Cơ sở năm được dùng."
			}
		}
	},
	COUPDAYS: {
		description: "Trả về số ngày trong kỳ trả lãi bao gồm ngày thanh toán",
		abstract: "Trả về số ngày trong kỳ trả lãi bao gồm ngày thanh toán",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/coupdays-function"
		}],
		functionParameter: {
			settlement: {
				name: "ngày thanh toán",
				detail: "Ngày thanh toán chứng khoán."
			},
			maturity: {
				name: "ngày đáo hạn",
				detail: "Ngày đáo hạn của chứng khoán."
			},
			frequency: {
				name: "tần số",
				detail: "Số lần thanh toán phiếu lãi hàng năm."
			},
			basis: {
				name: "điểm chuẩn",
				detail: "Cơ sở năm được dùng."
			}
		}
	},
	COUPDAYSNC: {
		description: "Trả về số ngày từ ngày thanh toán đến ngày trả lãi tiếp theo",
		abstract: "Trả về số ngày từ ngày thanh toán đến ngày trả lãi tiếp theo",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/coupdaysnc-function"
		}],
		functionParameter: {
			settlement: {
				name: "ngày thanh toán",
				detail: "Ngày thanh toán chứng khoán."
			},
			maturity: {
				name: "ngày đáo hạn",
				detail: "Ngày đáo hạn của chứng khoán."
			},
			frequency: {
				name: "tần số",
				detail: "Số lần thanh toán phiếu lãi hàng năm."
			},
			basis: {
				name: "điểm chuẩn",
				detail: "Cơ sở năm được dùng."
			}
		}
	},
	COUPNCD: {
		description: "Trả về ngày trả lãi tiếp theo sau ngày thanh toán",
		abstract: "Trả về ngày trả lãi tiếp theo sau ngày thanh toán",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/coupncd-function"
		}],
		functionParameter: {
			settlement: {
				name: "ngày thanh toán",
				detail: "Ngày thanh toán chứng khoán."
			},
			maturity: {
				name: "ngày đáo hạn",
				detail: "Ngày đáo hạn của chứng khoán."
			},
			frequency: {
				name: "tần số",
				detail: "Số lần thanh toán phiếu lãi hàng năm."
			},
			basis: {
				name: "điểm chuẩn",
				detail: "Cơ sở năm được dùng."
			}
		}
	},
	COUPNUM: {
		description: "Trả về số lượng lãi có thể trả giữa ngày thanh toán và ngày đáo hạn",
		abstract: "Trả về số lượng lãi có thể trả giữa ngày thanh toán và ngày đáo hạn",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/coupnum-function"
		}],
		functionParameter: {
			settlement: {
				name: "ngày thanh toán",
				detail: "Ngày thanh toán chứng khoán."
			},
			maturity: {
				name: "ngày đáo hạn",
				detail: "Ngày đáo hạn của chứng khoán."
			},
			frequency: {
				name: "tần số",
				detail: "Số lần thanh toán phiếu lãi hàng năm."
			},
			basis: {
				name: "điểm chuẩn",
				detail: "Cơ sở năm được dùng."
			}
		}
	},
	COUPPCD: {
		description: "Trả về ngày trả lãi trước đó trước ngày thanh toán",
		abstract: "Trả về ngày trả lãi trước đó trước ngày thanh toán",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/couppcd-function"
		}],
		functionParameter: {
			settlement: {
				name: "ngày thanh toán",
				detail: "Ngày thanh toán chứng khoán."
			},
			maturity: {
				name: "ngày đáo hạn",
				detail: "Ngày đáo hạn của chứng khoán."
			},
			frequency: {
				name: "tần số",
				detail: "Số lần thanh toán phiếu lãi hàng năm."
			},
			basis: {
				name: "điểm chuẩn",
				detail: "Cơ sở năm được dùng."
			}
		}
	},
	CUMIPMT: {
		description: "Trả về lãi tích lũy trả giữa hai kỳ thanh toán",
		abstract: "Trả về lãi tích lũy trả giữa hai kỳ thanh toán",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/cumipmt-function"
		}],
		functionParameter: {
			rate: {
				name: "lãi suất",
				detail: "Lãi suất."
			},
			nper: {
				name: "tổng số kỳ",
				detail: "Tổng số kỳ thanh toán."
			},
			pv: {
				name: "giá trị hiện tại",
				detail: "Giá trị hiện tại."
			},
			startPeriod: {
				name: "kỳ đầu tiên",
				detail: "Kỳ đầu tiên trong tính toán này. Các kỳ thanh toán được đánh số bắt đầu từ 1."
			},
			endPeriod: {
				name: "kỳ cuối cùng",
				detail: "Kỳ cuối cùng trong tính toán này."
			},
			type: {
				name: "loại",
				detail: "Thời hạn thanh toán."
			}
		}
	},
	CUMPRINC: {
		description: "Trả về lãi tích lũy cho khoản vay giữa hai kỳ thanh toán",
		abstract: "Trả về lãi tích lũy cho khoản vay giữa hai kỳ thanh toán",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/cumprinc-function"
		}],
		functionParameter: {
			rate: {
				name: "lãi suất",
				detail: "Lãi suất."
			},
			nper: {
				name: "tổng số kỳ",
				detail: "Tổng số kỳ thanh toán."
			},
			pv: {
				name: "giá trị hiện tại",
				detail: "Giá trị hiện tại."
			},
			startPeriod: {
				name: "kỳ đầu tiên",
				detail: "Kỳ đầu tiên trong tính toán này. Các kỳ thanh toán được đánh số bắt đầu từ 1."
			},
			endPeriod: {
				name: "kỳ cuối cùng",
				detail: "Kỳ cuối cùng trong tính toán này."
			},
			type: {
				name: "loại",
				detail: "Thời hạn thanh toán."
			}
		}
	},
	DB: {
		description: "Trả về giá trị khấu hao của tài sản cho một kỳ được xác định sử dụng phương pháp khấu hao số dư giảm dần cố định",
		abstract: "Trả về giá trị khấu hao của tài sản cho một kỳ được xác định sử dụng phương pháp khấu hao số dư giảm dần cố định",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/db-function"
		}],
		functionParameter: {
			cost: {
				name: "trị giá",
				detail: "Chi phí của tài sản."
			},
			salvage: {
				name: "giá trị còn lại",
				detail: "Giá trị khi kết thúc khấu hao (đôi khi được gọi là giá trị thu hồi của tài sản)."
			},
			life: {
				name: "tuổi thọ sử dụng",
				detail: "Số thời gian khấu hao của một tài sản (đôi khi còn được gọi là thời gian sử dụng hữu ích của tài sản)."
			},
			period: {
				name: "kỳ",
				detail: "Khoảng thời gian mà bạn muốn tính khấu hao."
			},
			month: {
				name: "tháng",
				detail: "Số tháng trong năm đầu tiên. Nếu tháng bị bỏ qua, giá trị của nó được giả định là 12."
			}
		}
	},
	DDB: {
		description: "Trả về giá trị khấu hao của tài sản cho một kỳ được xác định sử dụng phương pháp khấu hao số dư giảm dần kép",
		abstract: "Trả về giá trị khấu hao của tài sản cho một kỳ được xác định sử dụng phương pháp khấu hao số dư giảm dần kép",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/ddb-function"
		}],
		functionParameter: {
			cost: {
				name: "trị giá",
				detail: "Chi phí của tài sản."
			},
			salvage: {
				name: "giá trị còn lại",
				detail: "Giá trị khi kết thúc khấu hao (đôi khi được gọi là giá trị thu hồi của tài sản)."
			},
			life: {
				name: "tuổi thọ sử dụng",
				detail: "Số thời gian khấu hao của một tài sản (đôi khi còn được gọi là thời gian sử dụng hữu ích của tài sản)."
			},
			period: {
				name: "kỳ",
				detail: "Khoảng thời gian mà bạn muốn tính khấu hao."
			},
			factor: {
				name: "nhân tố",
				detail: "Tỷ lệ suy giảm số dư. Nếu bỏ qua yếu tố ảnh hưởng thì giả định là 2 (phương pháp số dư giảm dần kép)."
			}
		}
	},
	DISC: {
		description: "Trả về tỷ lệ chiết khấu của một trái phiếu",
		abstract: "Trả về tỷ lệ chiết khấu của một trái phiếu",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/disc-function"
		}],
		functionParameter: {
			settlement: {
				name: "ngày thanh toán",
				detail: "Ngày thanh toán chứng khoán."
			},
			maturity: {
				name: "ngày đáo hạn",
				detail: "Ngày đáo hạn của chứng khoán."
			},
			pr: {
				name: "giá",
				detail: "Giá của một chứng khoán có thể bán được trên thị trường."
			},
			redemption: {
				name: "giá thanh lý",
				detail: "Giá trị thanh lý của chứng khoán có mệnh giá 100"
			},
			basis: {
				name: "điểm chuẩn",
				detail: "Cơ sở năm được dùng."
			}
		}
	},
	DOLLARDE: {
		description: "Trả về giá trị thập phân của một số lượng tiền dưới dạng số nguyên và phân số",
		abstract: "Trả về giá trị thập phân của một số lượng tiền dưới dạng số nguyên và phân số",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/dollarde-function"
		}],
		functionParameter: {
			fractionalDollar: {
				name: "phân số",
				detail: "Một số được biểu thị dưới dạng phần nguyên và phần phân số, cách nhau bằng dấu thập phân."
			},
			fraction: {
				name: "mẫu số",
				detail: "Số nguyên dùng làm mẫu số của một phân số."
			}
		}
	},
	DOLLARFR: {
		description: "Trả về giá trị phân số của một số lượng tiền dưới dạng số nguyên và phân số",
		abstract: "Trả về giá trị phân số của một số lượng tiền dưới dạng số nguyên và phân số",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/dollarfr-function"
		}],
		functionParameter: {
			decimalDollar: {
				name: "số thập phân",
				detail: "số thập phân."
			},
			fraction: {
				name: "mẫu số",
				detail: "Số nguyên dùng làm mẫu số của một phân số."
			}
		}
	},
	DURATION: {
		description: "Trả về thời gian của một trái phiếu trả lãi định kỳ",
		abstract: "Trả về thời gian của một trái phiếu trả lãi định kỳ",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/duration-function"
		}],
		functionParameter: {
			settlement: {
				name: "ngày thanh toán",
				detail: "Ngày thanh toán chứng khoán."
			},
			maturity: {
				name: "ngày đáo hạn",
				detail: "Ngày đáo hạn của chứng khoán."
			},
			coupon: {
				name: "lãi suất coupon hàng năm.",
				detail: "Lãi suất coupon hàng năm của một chứng khoán."
			},
			yld: {
				name: "tỷ suất lợi nhuận hàng năm.",
				detail: "Tỷ suất lợi nhuận hàng năm của một chứng khoán có thể bán được."
			},
			frequency: {
				name: "tần số",
				detail: "Số lần thanh toán phiếu lãi hàng năm."
			},
			basis: {
				name: "điểm chuẩn",
				detail: "Cơ sở năm được dùng."
			}
		}
	},
	EFFECT: {
		description: "Trả về lãi suất hiệu quả hàng năm",
		abstract: "Trả về lãi suất hiệu quả hàng năm",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/effect-function"
		}],
		functionParameter: {
			nominalRate: {
				name: "lãi suất danh nghĩa",
				detail: "Lãi suất danh nghĩa."
			},
			npery: {
				name: "số kỳ",
				detail: "Số kỳ ghép lãi trong năm."
			}
		}
	},
	FV: {
		description: "FV , một trong các hàm tài chính , tính toán giá trị tương lai của một khoản đầu tư dựa trên một mức lãi suất cố định. Bạn có thể sử dụng FV với các khoản thanh toán bằng nhau định kỳ, hoặc thanh toán một lần duy nhất.",
		abstract: "FV , một trong các hàm tài chính , tính toán giá trị tương lai của một khoản đầu tư dựa trên một mức lãi suất cố định. Bạn có thể sử dụng FV với các khoản thanh toán bằng nhau định kỳ, hoặc thanh toán một lần duy nhất.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/fv-function"
		}],
		functionParameter: {
			rate: {
				name: "lãi suất",
				detail: "Yêu cầu. Lãi suất theo kỳ hạn."
			},
			nper: {
				name: "tổng số kỳ",
				detail: "Yêu cầu. Tổng số kỳ hạn thanh toán trong một niên kim."
			},
			pmt: {
				name: "số tiền",
				detail: "Yêu cầu. Khoản thanh toán cho mỗi kỳ; khoản này không đổi trong suốt vòng đời của niên kim. Thông thường, pmt có chứa tiền gốc và lãi, nhưng không chứa các khoản phí và thuế khác. Nếu pmt được bỏ qua, bạn phải đưa vào đối số pv."
			},
			pv: {
				name: "giá trị hiện tại",
				detail: "Tùy chọn. Giá trị hiện tại, hoặc số tiền trả một lần hiện tại đáng giá ngang với một chuỗi các khoản thanh toán tương lai. Nếu bỏ qua đối số pv, thì nó được giả định là 0 (không) và bạn phải đưa vào đối số pmt."
			},
			type: {
				name: "loại",
				detail: "Tùy chọn. Số 0 hoặc 1 chỉ rõ thời điểm thanh toán đến hạn. Nếu đối số kiểu bị bỏ qua, thì nó được giả định là 0."
			}
		}
	},
	FVSCHEDULE: {
		description: "Trả về giá trị tương lai của số tiền gốc ban đầu sau khi áp dụng một chuỗi các lãi suất kép. Dùng hàm FVSCHEDULE để tính toán giá trị tương lai của một khoản đầu tư với lãi suất biến đổi hoặc có thể điều chỉnh.",
		abstract: "Trả về giá trị tương lai của số tiền gốc ban đầu sau khi áp dụng một chuỗi các lãi suất kép. Dùng hàm FVSCHEDULE để tính toán giá trị tương lai của một khoản đầu tư với lãi suất biến đổi hoặc có thể điều chỉnh.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/fvschedule-function"
		}],
		functionParameter: {
			principal: {
				name: "hiệu trưởng",
				detail: "Yêu cầu. Giá trị hiện tại."
			},
			schedule: {
				name: "mảng lãi suất",
				detail: "Yêu cầu. Một mảng gồm các lãi suất sẽ áp dụng."
			}
		}
	},
	INTRATE: {
		description: "Trả về lãi suất của một chứng khoán đã đầu tư toàn bộ.",
		abstract: "Trả về lãi suất của một chứng khoán đã đầu tư toàn bộ.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/intrate-function"
		}],
		functionParameter: {
			settlement: {
				name: "ngày thanh toán",
				detail: "Yêu cầu. Ngày thanh toán chứng khoán. Ngày thanh toán chứng khoán là ngày sau ngày phát hành khi chứng khoán được bán cho người mua."
			},
			maturity: {
				name: "ngày đáo hạn",
				detail: "Yêu cầu. Ngày đáo hạn của chứng khoán. Ngày đáo hạn là ngày mà chứng khoán hết hạn."
			},
			investment: {
				name: "số tiền đầu",
				detail: "Yêu cầu. Số tiền đã đầu tư vào chứng khoán."
			},
			redemption: {
				name: "giá thanh lý",
				detail: "Yêu cầu. Số tiền sẽ nhận được khi đáo hạn."
			},
			basis: {
				name: "điểm chuẩn",
				detail: "Tùy chọn. Loại cơ sở đếm ngày sẽ dùng."
			}
		}
	},
	IPMT: {
		description: "Trả về lãi suất cho một kỳ xác định của một khoản đầu tư dựa trên các khoản thanh toán định kỳ và đều đặn và lãi suất không đổi",
		abstract: "Trả về lãi suất cho một kỳ xác định của một khoản đầu tư dựa trên các khoản thanh toán định kỳ và đều đặn và lãi suất không đổi",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/ipmt-function"
		}],
		functionParameter: {
			rate: {
				name: "lãi suất",
				detail: "Lãi suất theo từng thời kỳ."
			},
			per: {
				name: "kỳ",
				detail: "Số kỳ dùng để tính số tiền lãi phải nằm trong khoảng từ 1 đến nper."
			},
			nper: {
				name: "tổng số kỳ",
				detail: "Tổng số kỳ thanh toán."
			},
			pv: {
				name: "giá trị hiện tại",
				detail: "Giá trị hiện tại."
			},
			fv: {
				name: "số dư tiền mặt",
				detail: "Giá trị tương lai hoặc số dư tiền mặt mong muốn sau khi thực hiện khoản thanh toán cuối cùng."
			},
			type: {
				name: "loại",
				detail: "Số 0 hoặc 1, dùng để xác định thời điểm thanh toán của mỗi kỳ là đầu hay cuối kỳ."
			}
		}
	},
	IRR: {
		description: "Trả về tỷ lệ hoàn vốn nội bộ cho một loạt các dòng tiền",
		abstract: "Trả về tỷ lệ hoàn vốn nội bộ cho một loạt các dòng tiền",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/irr-function"
		}],
		functionParameter: {
			values: {
				name: "dòng tiền",
				detail: "Tham chiếu đến một mảng hoặc ô chứa các số dùng để tính tỷ suất hoàn vốn nội bộ.\n1.Các giá trị phải chứa ít nhất một giá trị dương và một giá trị âm để tính tỷ suất hoàn vốn nội bộ được trả về.\n2.IRR sử dụng chuỗi giá trị để minh họa chuỗi dòng tiền. Đảm bảo nhập các giá trị chi phí và lợi ích theo thứ tự bạn yêu cầu.\n3.Nếu mảng hoặc tham chiếu chứa văn bản, giá trị logic hoặc ô trống thì các giá trị này sẽ bị bỏ qua."
			},
			guess: {
				name: "giá trị ước tính",
				detail: "Ước tính tính toán IRR của hàm."
			}
		}
	},
	ISPMT: {
		description: "Tính tiền lãi đã trả (hoặc đã nhận) cho kỳ hạn đã xác định của khoản vay (hoặc khoản đầu tư) với các khoản thanh toán nợ gốc.",
		abstract: "Tính tiền lãi đã trả (hoặc đã nhận) cho kỳ hạn đã xác định của khoản vay (hoặc khoản đầu tư) với các khoản thanh toán nợ gốc.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/ispmt-function"
		}],
		functionParameter: {
			rate: {
				name: "lãi suất",
				detail: "Bắt buộc. Lãi suất của khoản đầu tư."
			},
			per: {
				name: "kỳ",
				detail: "Bắt buộc. Kỳ hạn mà bạn muốn tính lãi và phải nằm trong khoảng từ 1 đến Nper."
			},
			nper: {
				name: "tổng số kỳ",
				detail: "Bắt buộc. Tổng số kỳ thanh toán của khoản đầu tư."
			},
			pv: {
				name: "giá trị hiện tại",
				detail: "Bắt buộc. Giá trị hiện tại của khoản đầu tư. Đối với khoản vay, Pv là số tiền vay."
			}
		}
	},
	MDURATION: {
		description: "Trả về thời hạn đã sửa đổi của Macauley cho một chứng khoán có mệnh giá giả định là 100 đô la",
		abstract: "Trả về thời hạn đã sửa đổi của Macauley cho một chứng khoán có mệnh giá giả định là 100 đô la",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/mduration-function"
		}],
		functionParameter: {
			settlement: {
				name: "ngày thanh toán",
				detail: "Ngày thanh toán chứng khoán."
			},
			maturity: {
				name: "ngày đáo hạn",
				detail: "Ngày đáo hạn của chứng khoán."
			},
			coupon: {
				name: "lãi suất coupon hàng năm.",
				detail: "Lãi suất coupon hàng năm của một chứng khoán."
			},
			yld: {
				name: "tỷ suất lợi nhuận hàng năm.",
				detail: "Tỷ suất lợi nhuận hàng năm của một chứng khoán có thể bán được."
			},
			frequency: {
				name: "tần số",
				detail: "Số lần thanh toán phiếu lãi hàng năm."
			},
			basis: {
				name: "điểm chuẩn",
				detail: "Cơ sở năm được dùng."
			}
		}
	},
	MIRR: {
		description: "Trả về tỷ lệ hoàn vốn nội bộ điều chỉnh cho các dòng tiền định kỳ, có tính đến chi phí đầu tư và lãi suất của khoản đầu tư",
		abstract: "Trả về tỷ lệ hoàn vốn nội bộ điều chỉnh cho các dòng tiền định kỳ, có tính đến chi phí đầu tư và lãi suất của khoản đầu tư",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/mirr-function"
		}],
		functionParameter: {
			values: {
				name: "dòng tiền",
				detail: "Một mảng hoặc tham chiếu đến một ô chứa số. Các giá trị này đại diện cho một loạt chi phí định kỳ (giá trị âm) và lợi ích (giá trị dương).\n1.Các giá trị phải chứa ít nhất một giá trị dương và một giá trị âm để tính tỷ suất hoàn vốn nội bộ được sửa đổi. Ngược lại, MIRR trả về #DIV/0! .\n2.Tuy nhiên, nếu mảng hoặc tham số tham chiếu chứa văn bản, giá trị logic hoặc ô trống thì các giá trị đó sẽ bị bỏ qua; tuy nhiên, các ô chứa giá trị 0 sẽ được tính."
			},
			financeRate: {
				name: "Lãi suất tài trợ",
				detail: "Lãi suất trả cho các khoản tiền được sử dụng trong dòng tiền."
			},
			reinvestRate: {
				name: "tỷ suất sinh lợi tái đầu tư",
				detail: "Tỷ suất lợi nhuận của dòng tiền tái đầu tư."
			}
		}
	},
	NOMINAL: {
		description: "Trả về lãi suất danh nghĩa hàng năm",
		abstract: "Trả về lãi suất danh nghĩa hàng năm",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/nominal-function"
		}],
		functionParameter: {
			effectRate: {
				name: "lãi suất thực",
				detail: "lãi suất thực."
			},
			npery: {
				name: "số kỳ",
				detail: "Số kỳ ghép lãi trong năm."
			}
		}
	},
	NPER: {
		description: "Trả về số kỳ hạn cho một khoản đầu tư dựa trên các khoản thanh toán định kỳ và đều đặn và lãi suất không đổi",
		abstract: "Trả về số kỳ hạn cho một khoản đầu tư dựa trên các khoản thanh toán định kỳ và đều đặn và lãi suất không đổi",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/nper-function"
		}],
		functionParameter: {
			rate: {
				name: "lãi suất",
				detail: "Lãi suất theo từng thời kỳ."
			},
			pmt: {
				name: "số tiền",
				detail: "Số tiền phải trả trong mỗi kỳ không thay đổi trong suốt thời hạn niên kim."
			},
			pv: {
				name: "giá trị hiện tại",
				detail: "Giá trị hiện tại."
			},
			fv: {
				name: "số dư tiền mặt",
				detail: "Giá trị tương lai hoặc số dư tiền mặt mong muốn sau khi thực hiện khoản thanh toán cuối cùng."
			},
			type: {
				name: "loại",
				detail: "Số 0 hoặc 1, dùng để xác định thời điểm thanh toán của mỗi kỳ là đầu hay cuối kỳ."
			}
		}
	},
	NPV: {
		description: "Trả về giá trị hiện tại ròng của một khoản đầu tư dựa trên một loạt các dòng tiền và tỷ lệ chiết khấu",
		abstract: "Trả về giá trị hiện tại ròng của một khoản đầu tư dựa trên một loạt các dòng tiền và tỷ lệ chiết khấu",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/npv-function"
		}],
		functionParameter: {
			rate: {
				name: "tỷ lệ chiết khấu",
				detail: "Tỷ lệ chiết khấu trong một thời gian nhất định."
			},
			value1: {
				name: "dòng tiền 1",
				detail: "Đây là các tham số từ 1 đến 254 thể hiện chi phí và thu nhập."
			},
			value2: {
				name: "dòng tiền 2",
				detail: "Đây là các tham số từ 1 đến 254 thể hiện chi phí và thu nhập."
			}
		}
	},
	ODDFPRICE: {
		description: "Trả về giá của một trái phiếu có kỳ đầu ngắn hoặc dài",
		abstract: "Trả về giá của một trái phiếu có kỳ đầu ngắn hoặc dài",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/oddfprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "ngày thanh toán",
				detail: "Ngày thanh toán chứng khoán."
			},
			maturity: {
				name: "ngày đáo hạn",
				detail: "Ngày đáo hạn của chứng khoán."
			},
			issue: {
				name: "ngày phát hành",
				detail: "Ngày phát hành chứng khoán."
			},
			firstCoupon: {
				name: "ngày phiếu lãi đầu tiên",
				detail: "Ngày phát hành phiếu giảm giá đầu tiên của chứng khoán."
			},
			rate: {
				name: "lãi suất",
				detail: "Lãi suất chứng khoán."
			},
			yld: {
				name: "lợi suất hàng năm",
				detail: "Lợi suất hàng năm của chứng khoán."
			},
			redemption: {
				name: "giá trị chuộc lại",
				detail: "Giá trị hoàn lại của chứng khoán trên mỗi mệnh giá 100 đô la."
			},
			frequency: {
				name: "tần số",
				detail: "Số lần thanh toán phiếu giảm giá mỗi năm. Đối với các khoản thanh toán hàng năm, tần suất = 1; đối với các khoản thanh toán nửa năm, tần suất = 2; đối với các khoản thanh toán hàng quý, tần suất = 4."
			},
			basis: {
				name: "cơ sở",
				detail: "Loại cơ sở tính ngày cần sử dụng."
			}
		}
	},
	ODDFYIELD: {
		description: "Trả về lãi suất của một trái phiếu có kỳ đầu ngắn hoặc dài",
		abstract: "Trả về lãi suất của một trái phiếu có kỳ đầu ngắn hoặc dài",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/oddfyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "ngày thanh toán",
				detail: "Ngày thanh toán chứng khoán."
			},
			maturity: {
				name: "ngày đáo hạn",
				detail: "Ngày đáo hạn của chứng khoán."
			},
			issue: {
				name: "ngày phát hành",
				detail: "Ngày phát hành chứng khoán."
			},
			firstCoupon: {
				name: "ngày phiếu lãi đầu tiên",
				detail: "Ngày phát hành phiếu giảm giá đầu tiên của chứng khoán."
			},
			rate: {
				name: "lãi suất",
				detail: "Lãi suất chứng khoán."
			},
			pr: {
				name: "giá của",
				detail: "Giá của chứng khoán."
			},
			redemption: {
				name: "giá trị chuộc lại",
				detail: "Giá trị hoàn lại của chứng khoán trên mỗi mệnh giá 100 đô la."
			},
			frequency: {
				name: "tần số",
				detail: "Số lần thanh toán phiếu giảm giá mỗi năm. Đối với các khoản thanh toán hàng năm, tần suất = 1; đối với các khoản thanh toán nửa năm, tần suất = 2; đối với các khoản thanh toán hàng quý, tần suất = 4."
			},
			basis: {
				name: "cơ sở",
				detail: "Loại cơ sở tính ngày cần sử dụng."
			}
		}
	},
	ODDLPRICE: {
		description: "Trả về giá của một trái phiếu có kỳ cuối ngắn hoặc dài",
		abstract: "Trả về giá của một trái phiếu có kỳ cuối ngắn hoặc dài",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/oddlprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "ngày thanh toán",
				detail: "Ngày thanh toán chứng khoán."
			},
			maturity: {
				name: "ngày đáo hạn",
				detail: "Ngày đáo hạn của chứng khoán."
			},
			lastInterest: {
				name: "ngày thanh toán lãi cuối",
				detail: "Ngày thanh toán lãi cuối cùng của chứng khoán."
			},
			rate: {
				name: "lãi suất",
				detail: "Lãi suất chứng khoán."
			},
			yld: {
				name: "lợi suất hàng năm",
				detail: "Lợi suất hàng năm của chứng khoán."
			},
			redemption: {
				name: "giá trị chuộc lại",
				detail: "Giá trị hoàn lại của chứng khoán trên mỗi mệnh giá 100 đô la."
			},
			frequency: {
				name: "tần số",
				detail: "Số lần thanh toán phiếu giảm giá mỗi năm. Đối với các khoản thanh toán hàng năm, tần suất = 1; đối với các khoản thanh toán nửa năm, tần suất = 2; đối với các khoản thanh toán hàng quý, tần suất = 4."
			},
			basis: {
				name: "cơ sở",
				detail: "Loại cơ sở tính ngày cần sử dụng."
			}
		}
	},
	ODDLYIELD: {
		description: "Trả về lãi suất của một trái phiếu có kỳ cuối ngắn hoặc dài",
		abstract: "Trả về lãi suất của một trái phiếu có kỳ cuối ngắn hoặc dài",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/oddlyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "ngày thanh toán",
				detail: "Ngày thanh toán chứng khoán."
			},
			maturity: {
				name: "ngày đáo hạn",
				detail: "Ngày đáo hạn của chứng khoán."
			},
			lastInterest: {
				name: "ngày thanh toán lãi cuối",
				detail: "Ngày thanh toán lãi cuối cùng của chứng khoán."
			},
			rate: {
				name: "lãi suất",
				detail: "Lãi suất chứng khoán."
			},
			pr: {
				name: "giá của",
				detail: "Giá của chứng khoán."
			},
			redemption: {
				name: "giá trị chuộc lại",
				detail: "Giá trị hoàn lại của chứng khoán trên mỗi mệnh giá 100 đô la."
			},
			frequency: {
				name: "tần số",
				detail: "Số lần thanh toán phiếu giảm giá mỗi năm. Đối với các khoản thanh toán hàng năm, tần suất = 1; đối với các khoản thanh toán nửa năm, tần suất = 2; đối với các khoản thanh toán hàng quý, tần suất = 4."
			},
			basis: {
				name: "cơ sở",
				detail: "Loại cơ sở tính ngày cần sử dụng."
			}
		}
	},
	PDURATION: {
		description: "Trả về số kỳ hạn cần thiết để một khoản đầu tư đạt đến giá trị đã xác định.",
		abstract: "Trả về số kỳ hạn cần thiết để một khoản đầu tư đạt đến giá trị đã xác định.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/pduration-function"
		}],
		functionParameter: {
			rate: {
				name: "lãi suất",
				detail: "lãi suất của mỗi kỳ hạn."
			},
			pv: {
				name: "giá trị hiện tại",
				detail: "giá trị hiện tại của khoản đầu tư."
			},
			fv: {
				name: "giá trị tương lai",
				detail: "giá trị tương lai được kỳ vọng của khoản đầu tư."
			}
		}
	},
	PMT: {
		description: "Trả về khoản thanh toán cho một khoản vay dựa trên các khoản thanh toán định kỳ và đều đặn và lãi suất không đổi",
		abstract: "Trả về khoản thanh toán cho một khoản vay dựa trên các khoản thanh toán định kỳ và đều đặn và lãi suất không đổi",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/pmt-function"
		}],
		functionParameter: {
			rate: {
				name: "lãi suất",
				detail: "Lãi suất theo từng thời kỳ."
			},
			nper: {
				name: "tổng số kỳ",
				detail: "Tổng số kỳ thanh toán."
			},
			pv: {
				name: "giá trị hiện tại",
				detail: "Giá trị hiện tại."
			},
			fv: {
				name: "số dư tiền mặt",
				detail: "Giá trị tương lai hoặc số dư tiền mặt mong muốn sau khi thực hiện khoản thanh toán cuối cùng."
			},
			type: {
				name: "loại",
				detail: "Số 0 hoặc 1, dùng để xác định thời điểm thanh toán của mỗi kỳ là đầu hay cuối kỳ."
			}
		}
	},
	PPMT: {
		description: "Trả về phần thanh toán gốc cho một kỳ đã xác định của một khoản đầu tư dựa trên các khoản thanh toán định kỳ và đều đặn và lãi suất không đổi",
		abstract: "Trả về phần thanh toán gốc cho một kỳ đã xác định của một khoản đầu tư dựa trên các khoản thanh toán định kỳ và đều đặn và lãi suất không đổi",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/ppmt-function"
		}],
		functionParameter: {
			rate: {
				name: "lãi suất",
				detail: "Lãi suất theo từng thời kỳ."
			},
			per: {
				name: "kỳ",
				detail: "Số kỳ dùng để tính số tiền lãi phải nằm trong khoảng từ 1 đến nper."
			},
			nper: {
				name: "tổng số kỳ",
				detail: "Tổng số kỳ thanh toán."
			},
			pv: {
				name: "giá trị hiện tại",
				detail: "Giá trị hiện tại."
			},
			fv: {
				name: "số dư tiền mặt",
				detail: "Giá trị tương lai hoặc số dư tiền mặt mong muốn sau khi thực hiện khoản thanh toán cuối cùng."
			},
			type: {
				name: "loại",
				detail: "Số 0 hoặc 1, dùng để xác định thời điểm thanh toán của mỗi kỳ là đầu hay cuối kỳ."
			}
		}
	},
	PRICE: {
		description: "Trả về giá trên mỗi $100 mệnh giá của một trái phiếu trả lãi định kỳ",
		abstract: "Trả về giá trên mỗi $100 mệnh giá của một trái phiếu trả lãi định kỳ",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/price-function"
		}],
		functionParameter: {
			settlement: {
				name: "ngày thanh toán",
				detail: "Ngày thanh toán chứng khoán."
			},
			maturity: {
				name: "ngày đáo hạn",
				detail: "Ngày đáo hạn của chứng khoán."
			},
			rate: {
				name: "lãi suất",
				detail: "Lãi suất chứng khoán."
			},
			yld: {
				name: "lợi suất hàng năm",
				detail: "Lợi suất hàng năm của chứng khoán."
			},
			redemption: {
				name: "giá trị chuộc lại",
				detail: "Giá trị hoàn lại của chứng khoán trên mỗi mệnh giá 100 đô la."
			},
			frequency: {
				name: "tần số",
				detail: "Số lần thanh toán phiếu giảm giá mỗi năm. Đối với các khoản thanh toán hàng năm, tần suất = 1; đối với các khoản thanh toán nửa năm, tần suất = 2; đối với các khoản thanh toán hàng quý, tần suất = 4."
			},
			basis: {
				name: "cơ sở",
				detail: "Loại cơ sở tính ngày cần sử dụng."
			}
		}
	},
	PRICEDISC: {
		description: "Trả về giá trên mỗi $100 mệnh giá của một trái phiếu chiết khấu",
		abstract: "Trả về giá trên mỗi $100 mệnh giá của một trái phiếu chiết khấu",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/pricedisc-function"
		}],
		functionParameter: {
			settlement: {
				name: "ngày thanh toán",
				detail: "Ngày thanh toán chứng khoán."
			},
			maturity: {
				name: "ngày đáo hạn",
				detail: "Ngày đáo hạn của chứng khoán."
			},
			discount: {
				name: "lãi suất chiết",
				detail: "Lãi suất chiết khấu đối với chứng khoán."
			},
			redemption: {
				name: "giá trị chuộc lại",
				detail: "Giá trị hoàn lại của chứng khoán trên mỗi mệnh giá 100 đô la."
			},
			basis: {
				name: "cơ sở",
				detail: "Loại cơ sở tính ngày cần sử dụng."
			}
		}
	},
	PRICEMAT: {
		description: "Trả về giá trên mỗi $100 mệnh giá của một trái phiếu trả lãi khi đáo hạn",
		abstract: "Trả về giá trên mỗi $100 mệnh giá của một trái phiếu trả lãi khi đáo hạn",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/pricemat-function"
		}],
		functionParameter: {
			settlement: {
				name: "ngày thanh toán",
				detail: "Ngày thanh toán chứng khoán."
			},
			maturity: {
				name: "ngày đáo hạn",
				detail: "Ngày đáo hạn của chứng khoán."
			},
			issue: {
				name: "ngày phát hành",
				detail: "Ngày phát hành chứng khoán."
			},
			rate: {
				name: "lãi suất",
				detail: "Lãi suất chứng khoán."
			},
			yld: {
				name: "lợi suất hàng năm",
				detail: "Lợi suất hàng năm của chứng khoán."
			},
			basis: {
				name: "cơ sở",
				detail: "Loại cơ sở tính ngày cần sử dụng."
			}
		}
	},
	PV: {
		description: "Trả về giá trị hiện tại của một khoản đầu tư dựa trên lãi suất không đổi",
		abstract: "Trả về giá trị hiện tại của một khoản đầu tư dựa trên lãi suất không đổi",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/pv-function"
		}],
		functionParameter: {
			rate: {
				name: "lãi suất",
				detail: "Lãi suất theo từng thời kỳ."
			},
			nper: {
				name: "tổng số kỳ",
				detail: "Tổng số kỳ thanh toán."
			},
			pmt: {
				name: "số tiền",
				detail: "Số tiền phải trả trong mỗi kỳ không thay đổi trong suốt thời hạn niên kim."
			},
			fv: {
				name: "số dư tiền mặt",
				detail: "Giá trị tương lai hoặc số dư tiền mặt mong muốn sau khi thực hiện khoản thanh toán cuối cùng."
			},
			type: {
				name: "loại",
				detail: "Số 0 hoặc 1, dùng để xác định thời điểm thanh toán của mỗi kỳ là đầu hay cuối kỳ."
			}
		}
	},
	RATE: {
		description: "Trả về lãi suất mỗi kỳ của một khoản đầu tư",
		abstract: "Trả về lãi suất mỗi kỳ của một khoản đầu tư",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/rate-function"
		}],
		functionParameter: {
			nper: {
				name: "tổng số kỳ",
				detail: "Tổng số kỳ thanh toán."
			},
			pmt: {
				name: "số tiền",
				detail: "Số tiền phải trả trong mỗi kỳ không thay đổi trong suốt thời hạn niên kim."
			},
			pv: {
				name: "giá trị hiện tại",
				detail: "Giá trị hiện tại."
			},
			fv: {
				name: "số dư tiền mặt",
				detail: "Giá trị tương lai hoặc số dư tiền mặt mong muốn sau khi thực hiện khoản thanh toán cuối cùng."
			},
			type: {
				name: "loại",
				detail: "Số 0 hoặc 1, dùng để xác định thời điểm thanh toán của mỗi kỳ là đầu hay cuối kỳ."
			},
			guess: {
				name: "giá trị đoán",
				detail: "lãi suất kỳ vọng."
			}
		}
	},
	RECEIVED: {
		description: "Trả về số tiền nhận được vào ngày đáo hạn cho một chứng khoán hoàn toàn đầu tư",
		abstract: "Trả về số tiền nhận được vào ngày đáo hạn cho một chứng khoán hoàn toàn đầu tư",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/received-function"
		}],
		functionParameter: {
			settlement: {
				name: "ngày thanh toán",
				detail: "Ngày thanh toán chứng khoán."
			},
			maturity: {
				name: "ngày đáo hạn",
				detail: "Ngày đáo hạn của chứng khoán."
			},
			investment: {
				name: "số tiền đầu tư",
				detail: "Số tiền đầu tư vào chứng khoán có thể bán được."
			},
			discount: {
				name: "lãi suất chiết",
				detail: "Lãi suất chiết khấu đối với chứng khoán."
			},
			basis: {
				name: "cơ sở",
				detail: "Loại cơ sở tính ngày cần sử dụng."
			}
		}
	},
	RRI: {
		description: "Trả về một lãi suất tương đương cho sự tăng trưởng của một khoản đầu tư.",
		abstract: "Trả về một lãi suất tương đương cho sự tăng trưởng của một khoản đầu tư.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/rri-function"
		}],
		functionParameter: {
			nper: {
				name: "số kỳ hạn của khoản đầu tư.",
				detail: "Nper là số kỳ hạn của khoản đầu tư."
			},
			pv: {
				name: "giá trị hiện tại",
				detail: "Pv là giá trị hiện tại của khoản đầu tư."
			},
			fv: {
				name: "giá trị tương lai",
				detail: "Fv là giá trị tương lai của khoản đầu tư."
			}
		}
	},
	SLN: {
		description: "Trả về khấu hao theo phương pháp đường thẳng của một tài sản cho một kỳ đã xác định",
		abstract: "Trả về khấu hao theo phương pháp đường thẳng của một tài sản cho một kỳ đã xác định",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/sln-function"
		}],
		functionParameter: {
			cost: {
				name: "giá trị ban đầu của tài sản",
				detail: "Giá trị ban đầu của tài sản."
			},
			salvage: {
				name: "giá trị còn lại của tài sản",
				detail: "Giá trị khi kết thúc khấu hao (đôi khi được gọi là giá trị thu hồi của tài sản)."
			},
			life: {
				name: "thời gian sử dụng tài sản",
				detail: "Số thời gian khấu hao của một tài sản (đôi khi còn được gọi là thời gian sử dụng hữu ích của tài sản)."
			}
		}
	},
	SYD: {
		description: "Trả về khấu hao theo phương pháp tổng các số dư của một tài sản cho một kỳ đã xác định",
		abstract: "Trả về khấu hao theo phương pháp tổng các số dư của một tài sản cho một kỳ đã xác định",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/syd-function"
		}],
		functionParameter: {
			cost: {
				name: "giá trị ban đầu của tài sản",
				detail: "Giá trị ban đầu của tài sản."
			},
			salvage: {
				name: "giá trị còn lại của tài sản",
				detail: "Giá trị khi kết thúc khấu hao (đôi khi được gọi là giá trị thu hồi của tài sản)."
			},
			life: {
				name: "thời gian sử dụng tài sản",
				detail: "Số thời gian khấu hao của một tài sản (đôi khi còn được gọi là thời gian sử dụng hữu ích của tài sản)."
			},
			per: {
				name: "thời kỳ",
				detail: "Chu kỳ và phải sử dụng cùng đơn vị với cuộc sống."
			}
		}
	},
	TBILLEQ: {
		description: "Trả về lãi suất tương đương của một chứng khoán kho bạc",
		abstract: "Trả về lãi suất tương đương của một chứng khoán kho bạc",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/tbilleq-function"
		}],
		functionParameter: {
			settlement: {
				name: "ngày thanh toán",
				detail: "Ngày thanh toán trái phiếu kho bạc."
			},
			maturity: {
				name: "ngày đáo hạn",
				detail: "Ngày đáo hạn của trái phiếu kho bạc."
			},
			discount: {
				name: "lãi suất chiết",
				detail: "Lãi suất chiết khấu của trái phiếu kho bạc."
			}
		}
	},
	TBILLPRICE: {
		description: "Trả về giá của một chứng khoán kho bạc",
		abstract: "Trả về giá của một chứng khoán kho bạc",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/tbillprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "ngày thanh toán",
				detail: "Ngày thanh toán trái phiếu kho bạc."
			},
			maturity: {
				name: "ngày đáo hạn",
				detail: "Ngày đáo hạn của trái phiếu kho bạc."
			},
			discount: {
				name: "lãi suất chiết",
				detail: "Lãi suất chiết khấu của trái phiếu kho bạc."
			}
		}
	},
	TBILLYIELD: {
		description: "Trả về lãi suất của một chứng khoán kho bạc",
		abstract: "Trả về lãi suất của một chứng khoán kho bạc",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/tbillyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "ngày thanh toán",
				detail: "Ngày thanh toán trái phiếu kho bạc."
			},
			maturity: {
				name: "ngày đáo hạn",
				detail: "Ngày đáo hạn của trái phiếu kho bạc."
			},
			pr: {
				name: "giá",
				detail: "Giá trái phiếu kho bạc tính theo mệnh giá 100 đô la."
			}
		}
	},
	VDB: {
		description: "Trả về khấu hao của một tài sản cho một kỳ đã xác định bằng cách sử dụng phương pháp số dư giảm dần kép hoặc bất kỳ phương pháp nào mà bạn xác định",
		abstract: "Trả về khấu hao của một tài sản cho một kỳ đã xác định bằng cách sử dụng phương pháp số dư giảm dần kép hoặc bất kỳ phương pháp nào mà bạn xác định",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/vdb-function"
		}],
		functionParameter: {
			cost: {
				name: "trị giá",
				detail: "Chi phí của tài sản."
			},
			salvage: {
				name: "giá trị còn lại",
				detail: "Giá trị khi kết thúc khấu hao (đôi khi được gọi là giá trị thu hồi của tài sản)."
			},
			life: {
				name: "tuổi thọ sử dụng",
				detail: "Số thời gian khấu hao của một tài sản (đôi khi còn được gọi là thời gian sử dụng hữu ích của tài sản)."
			},
			startPeriod: {
				name: "kỳ đầu tiên",
				detail: "Kỳ đầu tiên mà bạn muốn tính khấu hao."
			},
			endPeriod: {
				name: "kỳ kết thúc",
				detail: "Kỳ kết thúc mà bạn muốn tính khấu hao."
			},
			factor: {
				name: "nhân tố",
				detail: "Tỷ lệ suy giảm số dư. Nếu bỏ qua yếu tố ảnh hưởng thì giả định là 2 (phương pháp số dư giảm dần kép)."
			},
			noSwitch: {
				name: "không chuyển đổi",
				detail: "Giá trị logic chỉ định liệu có nên chuyển sang khấu hao theo đường thẳng hay không khi mức khấu hao lớn hơn phép tính số dư giảm dần."
			}
		}
	},
	XIRR: {
		description: "Trả về tỷ lệ hoàn vốn nội bộ cho một loạt các dòng tiền đã xác định",
		abstract: "Trả về tỷ lệ hoàn vốn nội bộ cho một loạt các dòng tiền đã xác định",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/xirr-function"
		}],
		functionParameter: {
			values: {
				name: "dòng tiền",
				detail: "Một chuỗi các dòng tiền tương ứng với thời điểm thanh toán theo ngày. Khoản trả trước là tùy chọn và liên quan đến chi phí hoặc khoản thanh toán khi bắt đầu đầu tư. Nếu giá trị đầu tiên là chi phí hoặc khoản thanh toán thì giá trị đó phải âm. Tất cả các khoản thanh toán tiếp theo được chiết khấu trên cơ sở 365 ngày/năm. Chuỗi giá trị phải chứa ít nhất một giá trị dương và một giá trị âm."
			},
			dates: {
				name: "bảng ngày tháng",
				detail: "Lịch trình ngày thanh toán tương ứng với các khoản thanh toán dòng tiền. Ngày tháng có thể xuất hiện theo bất kỳ thứ tự nào."
			},
			guess: {
				name: "giá trị ước tính",
				detail: "Ước tính kết quả của phép tính hàm XIRR."
			}
		}
	},
	XNPV: {
		description: "Trả về giá trị hiện tại ròng của một khoản đầu tư cho một loạt các dòng tiền không đều",
		abstract: "Trả về giá trị hiện tại ròng của một khoản đầu tư cho một loạt các dòng tiền không đều",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/xnpv-function"
		}],
		functionParameter: {
			rate: {
				name: "tỷ lệ chiết khấu",
				detail: "Tỷ lệ chiết khấu áp dụng cho dòng tiền."
			},
			values: {
				name: "dòng tiền",
				detail: "Một chuỗi các dòng tiền tương ứng với thời điểm thanh toán theo ngày. Khoản trả trước là tùy chọn và liên quan đến chi phí hoặc khoản thanh toán khi bắt đầu đầu tư. Nếu giá trị đầu tiên là chi phí hoặc khoản thanh toán thì giá trị đó phải âm. Tất cả các khoản thanh toán tiếp theo được chiết khấu trên cơ sở 365 ngày/năm. Chuỗi giá trị phải chứa ít nhất một giá trị dương và một giá trị âm."
			},
			dates: {
				name: "bảng ngày tháng",
				detail: "Lịch trình ngày thanh toán tương ứng với các khoản thanh toán dòng tiền. Ngày tháng có thể xuất hiện theo bất kỳ thứ tự nào."
			}
		}
	},
	YIELD: {
		description: "Trả về lãi suất trên mỗi $100 mệnh giá của một trái phiếu trả lãi định kỳ",
		abstract: "Trả về lãi suất trên mỗi $100 mệnh giá của một trái phiếu trả lãi định kỳ",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/yield-function"
		}],
		functionParameter: {
			settlement: {
				name: "ngày thanh toán",
				detail: "Ngày thanh toán chứng khoán."
			},
			maturity: {
				name: "ngày đáo hạn",
				detail: "Ngày đáo hạn của chứng khoán."
			},
			rate: {
				name: "lãi suất",
				detail: "Lãi suất chứng khoán."
			},
			pr: {
				name: "giá",
				detail: "Giá chứng khoán tính theo mệnh giá 100 đô la."
			},
			redemption: {
				name: "giá trị chuộc lại",
				detail: "Giá trị hoàn lại của chứng khoán trên mỗi mệnh giá 100 đô la."
			},
			frequency: {
				name: "tần số",
				detail: "Số lần thanh toán phiếu giảm giá mỗi năm. Đối với các khoản thanh toán hàng năm, tần suất = 1; đối với các khoản thanh toán nửa năm, tần suất = 2; đối với các khoản thanh toán hàng quý, tần suất = 4."
			},
			basis: {
				name: "cơ sở",
				detail: "Loại cơ sở tính ngày cần sử dụng."
			}
		}
	},
	YIELDDISC: {
		description: "Trả về lãi suất hàng năm của một trái phiếu chiết khấu",
		abstract: "Trả về lãi suất hàng năm của một trái phiếu chiết khấu",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/yielddisc-function"
		}],
		functionParameter: {
			settlement: {
				name: "ngày thanh toán",
				detail: "Ngày thanh toán chứng khoán."
			},
			maturity: {
				name: "ngày đáo hạn",
				detail: "Ngày đáo hạn của chứng khoán."
			},
			pr: {
				name: "giá",
				detail: "Giá chứng khoán tính theo mệnh giá 100 đô la."
			},
			redemption: {
				name: "giá trị chuộc lại",
				detail: "Giá trị hoàn lại của chứng khoán trên mỗi mệnh giá 100 đô la."
			},
			basis: {
				name: "cơ sở",
				detail: "Loại cơ sở tính ngày cần sử dụng."
			}
		}
	},
	YIELDMAT: {
		description: "Trả về lãi suất hàng năm của một trái phiếu trả lãi khi đáo hạn",
		abstract: "Trả về lãi suất hàng năm của một trái phiếu trả lãi khi đáo hạn",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/yieldmat-function"
		}],
		functionParameter: {
			settlement: {
				name: "ngày thanh toán",
				detail: "Ngày thanh toán chứng khoán."
			},
			maturity: {
				name: "ngày đáo hạn",
				detail: "Ngày đáo hạn của chứng khoán."
			},
			issue: {
				name: "ngày phát hành",
				detail: "Ngày phát hành chứng khoán."
			},
			rate: {
				name: "lãi suất",
				detail: "Lãi suất chứng khoán."
			},
			pr: {
				name: "giá",
				detail: "Giá chứng khoán tính theo mệnh giá 100 đô la."
			},
			basis: {
				name: "cơ sở",
				detail: "Loại cơ sở tính ngày cần sử dụng."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/information/vi-VN.ts
const locale$8 = {
	CELL: {
		description: "Hàm CELL trả về thông tin về định dạng, vị trí hay nội dung của một ô.",
		abstract: "Hàm CELL trả về thông tin về định dạng, vị trí hay nội dung của một ô.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/cell-function"
		}],
		functionParameter: {
			infoType: {
				name: "Kiểu thông tin",
				detail: "Giá trị văn bản xác định bạn muốn trả về kiểu thông tin ô nào."
			},
			reference: {
				name: "Trích dẫn",
				detail: "Ô mà bạn muốn có thông tin."
			}
		}
	},
	ERROR_TYPE: {
		description: "Trả về số tương ứng với loại lỗi",
		abstract: "Trả về số tương ứng với loại lỗi",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/error-type-function"
		}],
		functionParameter: { errorVal: {
			name: "Giá trị lỗi",
			detail: "Giá trị lỗi có số nhận dạng mà bạn muốn tìm."
		} }
	},
	INFO: {
		description: "Trả về thông tin về môi trường điều hành hiện thời.",
		abstract: "Trả về thông tin về môi trường điều hành hiện thời.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/vi-vn/excel/functions/info-function"
		}],
		functionParameter: { typeText: {
			name: "Type_text",
			detail: "Yêu cầu. Văn bản chỉ rõ kiểu thông tin bạn muốn được trả về."
		} }
	},
	ISBETWEEN: {
		description: "Kiểm tra xem một số đã cho có nằm giữa hai số khác (lớn hơn hoặc bằng giới hạn dưới và nhỏ hơn hoặc bằng giới hạn trên; hoặc lớn hơn giới hạn dưới và nhỏ hơn giới hạn trên) hay không.",
		abstract: "Kiểm tra xem một số đã cho có nằm giữa hai số khác (lớn hơn hoặc bằng giới hạn dưới và nhỏ hơn hoặc bằng giới hạn trên; hoặc lớn hơn giới hạn dưới và nhỏ hơn giới hạn trên) hay không.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.google.com/docs/answer/10538337?hl=vi"
		}],
		functionParameter: {
			valueToCompare: {
				name: "giá_trị_muốn_so_sánh",
				detail: "Giá trị muốn kiểm tra khi nằm trong khoảng từ `giới_hạn_dưới` đến `giới_hạn_trên`."
			},
			lowerValue: {
				name: "giới_hạn_dưới",
				detail: "Cận dưới của miền giá trị mà `giá_trị_muốn_so_sánh` có thể thuộc miền đó."
			},
			upperValue: {
				name: "giới_hạn_trên",
				detail: "Cận trên của miền giá trị mà `giá_trị_muốn_so_sánh` có thể thuộc miền đó."
			},
			lowerValueIsInclusive: {
				name: "bao_gồm_cả_giới_hạn_dưới",
				detail: "Liệu miền giá trị có bao gồm `giới_hạn_trên` hay không. Theo mặc định, hàm sẽ trả về TRUE"
			},
			upperValueIsInclusive: {
				name: "bao_gồm_cả_giới_hạn_trên",
				detail: "Liệu miền giá trị có bao gồm `giới_hạn_trên` hay không. Theo mặc định, hàm sẽ trả về TRUE"
			}
		}
	},
	ISBLANK: {
		description: "Trả về TRUE nếu giá trị trống",
		abstract: "Trả về TRUE nếu giá trị trống",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "Giá trị",
			detail: "Giá trị mà bạn muốn kiểm tra. Đối số giá trị có thể là trống (ô trống), lỗi, giá trị lô-gic, văn bản, số, giá trị tham chiếu hoặc tên tham chiếu tới bất kỳ giá trị nào trong những giá trị này."
		} }
	},
	ISDATE: {
		description: "Hàm ISDATE xác định xem một giá trị có phải là ngày không.",
		abstract: "Hàm ISDATE xác định xem một giá trị có phải là ngày không.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.google.com/docs/answer/9061381?hl=vi"
		}],
		functionParameter: { value: {
			name: "Giá trị",
			detail: "Giá trị cần xác minh có phải là một ngày hay không."
		} }
	},
	ISEMAIL: {
		description: "Để kiểm tra xem một giá trị có phải là địa chỉ email hợp lệ hay không, hãy sử dụng hàm ISEMAIL. Hàm này kiểm tra xem giá trị có tuân theo định dạng thường được chấp nhận cho địa chỉ email hay không nhưng không xác minh sự tồn tại của địa chỉ đó.",
		abstract: "Để kiểm tra xem một giá trị có phải là địa chỉ email hợp lệ hay không, hãy sử dụng hàm ISEMAIL. Hàm này kiểm tra xem giá trị có tuân theo định dạng thường được chấp nhận cho địa chỉ email hay không nhưng không xác minh sự tồn tại của địa chỉ đó.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.google.com/docs/answer/3256503?hl=vi"
		}],
		functionParameter: { value: {
			name: "Giá trị",
			detail: "Hàm ISEMAIL(\"johndoe@yourname.com\")"
		} }
	},
	ISERR: {
		description: "Trả về TRUE nếu giá trị là bất kỳ giá trị lỗi nào ngoại trừ #N/A",
		abstract: "Trả về TRUE nếu giá trị là bất kỳ giá trị lỗi nào ngoại trừ #N/A",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "Giá trị",
			detail: "Giá trị mà bạn muốn kiểm tra. Đối số giá trị có thể là trống (ô trống), lỗi, giá trị lô-gic, văn bản, số, giá trị tham chiếu hoặc tên tham chiếu tới bất kỳ giá trị nào trong những giá trị này."
		} }
	},
	ISERROR: {
		description: "Trả về TRUE nếu giá trị là bất kỳ giá trị lỗi nào",
		abstract: "Trả về TRUE nếu giá trị là bất kỳ giá trị lỗi nào",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "Giá trị",
			detail: "Giá trị mà bạn muốn kiểm tra. Đối số giá trị có thể là trống (ô trống), lỗi, giá trị lô-gic, văn bản, số, giá trị tham chiếu hoặc tên tham chiếu tới bất kỳ giá trị nào trong những giá trị này."
		} }
	},
	ISEVEN: {
		description: "Trả về TRUE nếu số chắn, trả về FALSE nếu số lẻ.",
		abstract: "Trả về TRUE nếu số chắn, trả về FALSE nếu số lẻ.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/iseven-function"
		}],
		functionParameter: { value: {
			name: "Giá trị",
			detail: "Giá trị cần kiểm tra. Nếu số không phải là số nguyên thì nó bị cắt cụt."
		} }
	},
	ISFORMULA: {
		description: "Kiểm tra xem liệu có tham chiếu đến ô chứa công thức hay không và trả về kết quả TRUE hoặc FALSE.",
		abstract: "Kiểm tra xem liệu có tham chiếu đến ô chứa công thức hay không và trả về kết quả TRUE hoặc FALSE.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/isformula-function"
		}],
		functionParameter: { reference: {
			name: "tham chiếu",
			detail: "Tham chiếu là tham chiếu đến ô mà bạn muốn kiểm tra."
		} }
	},
	ISLOGICAL: {
		description: "Trả về TRUE nếu giá trị là giá trị logic",
		abstract: "Trả về TRUE nếu giá trị là giá trị logic",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "Giá trị",
			detail: "Giá trị mà bạn muốn kiểm tra. Đối số giá trị có thể là trống (ô trống), lỗi, giá trị lô-gic, văn bản, số, giá trị tham chiếu hoặc tên tham chiếu tới bất kỳ giá trị nào trong những giá trị này."
		} }
	},
	ISNA: {
		description: "Trả về TRUE nếu giá trị là giá trị lỗi #N/A",
		abstract: "Trả về TRUE nếu giá trị là giá trị lỗi #N/A",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "Giá trị",
			detail: "Giá trị mà bạn muốn kiểm tra. Đối số giá trị có thể là trống (ô trống), lỗi, giá trị lô-gic, văn bản, số, giá trị tham chiếu hoặc tên tham chiếu tới bất kỳ giá trị nào trong những giá trị này."
		} }
	},
	ISNONTEXT: {
		description: "Trả về TRUE nếu giá trị không phải là văn bản",
		abstract: "Trả về TRUE nếu giá trị không phải là văn bản",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "Giá trị",
			detail: "Giá trị mà bạn muốn kiểm tra. Đối số giá trị có thể là trống (ô trống), lỗi, giá trị lô-gic, văn bản, số, giá trị tham chiếu hoặc tên tham chiếu tới bất kỳ giá trị nào trong những giá trị này."
		} }
	},
	ISNUMBER: {
		description: "Trả về TRUE nếu giá trị là số",
		abstract: "Trả về TRUE nếu giá trị là số",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "Giá trị",
			detail: "Giá trị mà bạn muốn kiểm tra. Đối số giá trị có thể là trống (ô trống), lỗi, giá trị lô-gic, văn bản, số, giá trị tham chiếu hoặc tên tham chiếu tới bất kỳ giá trị nào trong những giá trị này."
		} }
	},
	ISODD: {
		description: "Trả về TRUE nếu số lẻ, trả về FALSE nếu số chẵn.",
		abstract: "Trả về TRUE nếu số lẻ, trả về FALSE nếu số chẵn.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/isodd-function"
		}],
		functionParameter: { value: {
			name: "Giá trị",
			detail: "Giá trị cần kiểm tra. Nếu số không phải là số nguyên thì nó bị cắt cụt."
		} }
	},
	ISOMITTED: {
		description: "Kiểm tra xem giá trị trong LAMBDA bị thiếu hay không và trả về TRUE hoặc FALSE.",
		abstract: "Kiểm tra xem giá trị trong LAMBDA bị thiếu hay không và trả về TRUE hoặc FALSE.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/vi-vn/excel/functions/isomitted-function"
		}],
		functionParameter: { argument: {
			name: "Tranh luận",
			detail: "Giá trị bạn muốn kiểm tra, chẳng hạn như tham số LAMBDA."
		} }
	},
	ISREF: {
		description: "Trả về TRUE nếu giá trị là tham chiếu",
		abstract: "Trả về TRUE nếu giá trị là tham chiếu",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "Giá trị",
			detail: "Giá trị mà bạn muốn kiểm tra. Đối số giá trị có thể là trống (ô trống), lỗi, giá trị lô-gic, văn bản, số, giá trị tham chiếu hoặc tên tham chiếu tới bất kỳ giá trị nào trong những giá trị này."
		} }
	},
	ISTEXT: {
		description: "Trả về TRUE nếu giá trị là văn bản",
		abstract: "Trả về TRUE nếu giá trị là văn bản",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "Giá trị",
			detail: "Giá trị mà bạn muốn kiểm tra. Đối số giá trị có thể là trống (ô trống), lỗi, giá trị lô-gic, văn bản, số, giá trị tham chiếu hoặc tên tham chiếu tới bất kỳ giá trị nào trong những giá trị này."
		} }
	},
	ISURL: {
		description: "Kiểm tra liệu giá trị có phải là một URL hợp lệ.",
		abstract: "Kiểm tra liệu giá trị có phải là một URL hợp lệ.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.google.com/docs/answer/3256501?hl=vi"
		}],
		functionParameter: { value: {
			name: "Giá trị",
			detail: "ISURL(\"www.google.com\")"
		} }
	},
	N: {
		description: "Trả về một giá trị được chuyển đổi thành số.",
		abstract: "Trả về một giá trị được chuyển đổi thành số.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/n-function"
		}],
		functionParameter: { value: {
			name: "giá trị",
			detail: "Giá trị mà bạn muốn chuyển đổi."
		} }
	},
	NA: {
		description: "Trả về giá trị lỗi #N/A.",
		abstract: "Trả về giá trị lỗi #N/A.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/na-function"
		}],
		functionParameter: {}
	},
	SHEET: {
		description: "Trả về số trang của trang tham chiếu.",
		abstract: "Trả về số trang của trang tham chiếu.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/sheet-function"
		}],
		functionParameter: { value: {
			name: "giá trị",
			detail: "là tên của một trang hoặc một tham chiếu mà bạn muốn tìm số trang của nó. Nếu đối số value được bỏ qua, hàm SHEET trả về số trang của trang có chứa hàm."
		} }
	},
	SHEETS: {
		description: "Trả về số trang tính trong một bảng tính",
		abstract: "Trả về số trang tính trong một bảng tính",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/sheets-function"
		}],
		functionParameter: {}
	},
	TYPE: {
		description: "Trả về một số đại diện cho kiểu dữ liệu của giá trị",
		abstract: "Trả về một số đại diện cho kiểu dữ liệu của giá trị",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/type-function"
		}],
		functionParameter: { value: {
			name: "Giá trị",
			detail: "Nó có thể là bất kỳ giá trị nào, chẳng hạn như số, văn bản, giá trị logic, v.v."
		} }
	}
};

//#endregion
//#region src/locale/function-list/logical/vi-VN.ts
const locale$7 = {
	AND: {
		description: "Hàm AND trả về TRUE nếu tất cả các tham đối của hàm là TRUE, trả về FALSE nếu một hoặc nhiều tham đối là FALSE.",
		abstract: "Hàm AND trả về TRUE nếu tất cả các tham đối của hàm là TRUE, trả về FALSE nếu một hoặc nhiều tham đối là FALSE.",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/and-function"
		}],
		functionParameter: {
			logical1: {
				name: "Giá trị logic 1",
				detail: "Điều kiện đầu tiên muốn kiểm tra và có thể là TRUE hoặc FALSE."
			},
			logical2: {
				name: "Giá trị logic 2",
				detail: "Các điều kiện khác muốn kiểm tra và có thể là TRUE hoặc FALSE (tối đa 255 điều kiện)."
			}
		}
	},
	BYCOL: {
		description: "Áp dụng LAMBDA cho mỗi cột và trả về một mảng kết quả",
		abstract: "Áp dụng LAMBDA cho mỗi cột và trả về một mảng kết quả",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/bycol-function"
		}],
		functionParameter: {
			array: {
				name: "mảng",
				detail: "Mảng được phân tách bởi cột."
			},
			lambda: {
				name: "lambda",
				detail: "Hàm LAMBDA nhận một cột làm tham số đơn và tính toán một kết quả. LAMBDA có một tham số duy nhất: Một cột từ mảng."
			}
		}
	},
	BYROW: {
		description: "Áp dụng LAMBDA cho mỗi hàng và trả về một mảng kết quả",
		abstract: "Áp dụng LAMBDA cho mỗi hàng và trả về một mảng kết quả",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/byrow-function"
		}],
		functionParameter: {
			array: {
				name: "mảng",
				detail: "Mảng được phân tách theo hàng."
			},
			lambda: {
				name: "lambda",
				detail: "Hàm LAMBDA nhận một hàng làm tham số duy nhất và tính toán một kết quả. LAMBDA có một tham số duy nhất: Một hàng từ mảng."
			}
		}
	},
	FALSE: {
		description: "Trả về giá trị logic FALSE",
		abstract: "Trả về giá trị logic FALSE",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/false-function"
		}],
		functionParameter: {}
	},
	IF: {
		description: "Xác định kiểm tra logic để thực hiện",
		abstract: "Xác định kiểm tra logic để thực hiện",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/if-function"
		}],
		functionParameter: {
			logicalTest: {
				name: "Biểu thức logic",
				detail: "Điều kiện cần kiểm tra."
			},
			valueIfTrue: {
				name: "Nếu giá trị là đúng",
				detail: "Giá trị bạn muốn trả về nếu kết quả của logical_test là TRUE."
			},
			valueIfFalse: {
				name: "Nếu giá trị là sai",
				detail: "Giá trị bạn muốn trả về nếu kết quả của logical_test là FALSE."
			}
		}
	},
	IFERROR: {
		description: "Nếu kết quả tính toán của công thức là lỗi, trả về giá trị bạn chỉ định; nếu không, trả về kết quả của công thức",
		abstract: "Nếu kết quả tính toán của công thức là lỗi, trả về giá trị bạn chỉ định; nếu không, trả về kết quả của công thức",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/iferror-function"
		}],
		functionParameter: {
			value: {
				name: "Giá trị",
				detail: "Tham số để kiểm tra lỗi."
			},
			valueIfError: {
				name: "Trả về giá trị khi có lỗi",
				detail: "Giá trị trả về khi kết quả tính toán của công thức là lỗi. Đánh giá các loại lỗi sau: #N/A, #VALUE!, #REF!, #DIV/0!, #NUM!, #NAME? hoặc #NULL!."
			}
		}
	},
	IFNA: {
		description: "Nếu biểu thức này giải mã là #N/A, trả về giá trị được chỉ định; nếu không, trả về kết quả của biểu thức đó",
		abstract: "Nếu biểu thức này giải mã là #N/A, trả về giá trị được chỉ định; nếu không, trả về kết quả của biểu thức đó",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/ifna-function"
		}],
		functionParameter: {
			value: {
				name: "Giá trị",
				detail: "Đối số được kiểm tra cho giá trị lỗi #N/A."
			},
			valueIfNa: {
				name: "Nếu đó là giá trị của #N/A",
				detail: "Giá trị cần trả về nếu công thức cho kết quả là giá trị lỗi #N/A."
			}
		}
	},
	IFS: {
		description: "Kiểm tra nếu một hoặc nhiều điều kiện được đáp ứng và trả về giá trị tương ứng với điều kiện TRUE đầu tiên.",
		abstract: "Kiểm tra nếu một hoặc nhiều điều kiện được đáp ứng và trả về giá trị tương ứng với điều kiện TRUE đầu tiên.",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/ifs-function"
		}],
		functionParameter: {
			logicalTest1: {
				name: "logic 1",
				detail: "Điều kiện đầu tiên được đánh giá, có thể là giá trị Boolean, giá trị số, mảng hoặc tham chiếu đến một trong các giá trị này."
			},
			valueIfTrue1: {
				name: "Giá trị 1",
				detail: "Giá trị được trả về khi \"Điều kiện 1\" là \"TRUE\"."
			},
			logicalTest2: {
				name: "logic 2",
				detail: "Các điều kiện khác được đánh giá trước điều kiện trước đó là FALSE."
			},
			valueIfTrue2: {
				name: "Giá trị 2",
				detail: "Giá trị bổ sung được trả về nếu điều kiện tương ứng là \"TRUE\"."
			}
		}
	},
	LAMBDA: {
		description: "Sử dụng chức năng LAMBDA để tạo hàm tùy chỉnh có thể tái sử dụng và gọi chúng bằng tên dễ nhớ. Các hàm mới có sẵn trên toàn bộ workbook và gọi giống như hàm gốc của Excel.",
		abstract: "Tạo các hàm tùy chỉnh, có thể tái sử dụng và gọi chúng bằng tên thân thiện",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/lambda-function"
		}],
		functionParameter: {
			parameter: {
				name: "Tham số",
				detail: "Giá trị để truyền vào hàm, ví dụ như tham chiếu ô, chuỗi hoặc số. Có thể nhập tối đa 253 tham số. Tham số này là tùy chọn."
			},
			calculation: {
				name: "Tính toán",
				detail: "Công thức để thực hiện và trả về kết quả của hàm. Phải là tham số cuối cùng và phải trả về kết quả. Tham số này là bắt buộc."
			}
		}
	},
	LET: {
		description: "Hàm LET gán tên cho kết quả tính toán. Hàm này cho phép lưu trữ các phép tính trung gian, giá trị hoặc xác định các tên bên trong công thức. Những tên này chỉ áp dụng trong phạm vi của LET hàm. Tương tự như các biến trong lập trình, được LET thực hiện thông qua cú pháp công thức gốc của Excel.",
		abstract: "Hàm LET gán tên cho kết quả tính toán. Hàm này cho phép lưu trữ các phép tính trung gian, giá trị hoặc xác định các tên bên trong công thức. Những tên này chỉ áp dụng trong phạm vi của LET hàm. Tương tự như các biến trong lập trình, được LET thực hiện thông qua cú pháp công thức gốc của Excel.",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/let-function"
		}],
		functionParameter: {
			name1: {
				name: "tên 1",
				detail: "Tên đầu tiên cần phải gán. Phải bắt đầu bằng một chữ cái. Không thể là kết quả của công thức hoặc xung đột với cú pháp dải ô."
			},
			nameValue1: {
				name: "giá trị 1",
				detail: "Giá trị gán cho name1."
			},
			calculationOrName2: {
				name: "tính toán hoặc tên 2",
				detail: "Một trong những điều sau:\n1.Phép tính sử dụng tất cả các tên trong hàm LET. Đây phải là đối số cuối cùng trong hàm LET.\n2.Tên thứ hai cần gán cho name_value thứ hai. Nếu tên đã được xác định, name_value2 và calculation_or_name3 sẽ trở thành bắt buộc."
			},
			nameValue2: {
				name: "giá trị 2",
				detail: "Giá trị gán cho calculation_or_name2."
			},
			calculationOrName3: {
				name: "tính toán hoặc tên 3",
				detail: "Một trong những điều sau:\n1.Phép tính sử dụng tất cả các tên trong hàm LET. Đối số cuối cùng trong hàm LET phải là một phép tính.\n2.Tên thứ ba cần gán cho name_value thứ ba. Nếu tên đã được xác định, name_value3 và calculation_or_name4 sẽ trở thành bắt buộc."
			}
		}
	},
	MAKEARRAY: {
		description: "Trả về một mảng có kích thước hàng và cột chỉ định bằng cách áp dụng LAMBDA",
		abstract: "Trả về một mảng có kích thước hàng và cột chỉ định bằng cách áp dụng LAMBDA",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/makearray-function"
		}],
		functionParameter: {
			number1: {
				name: "Số hàng",
				detail: "Số hàng trong mảng. Phải lớn hơn không"
			},
			number2: {
				name: "Số cột",
				detail: "Số cột trong mảng. Phải lớn hơn không"
			},
			value3: {
				name: "lambda",
				detail: "Gọi LAMBDA để tạo mảng. LAMBDA nhận hai tham số: row chỉ mục hàng của mảng, col chỉ mục cột của mảng"
			}
		}
	},
	MAP: {
		description: "Trả về một mảng được hình thành bằng cách ánh xạ mỗi giá trị trong (các) mảng với một giá trị mới bằng cách áp dụng lambda để tạo một giá trị mới.",
		abstract: "Trả về một mảng được hình thành bằng cách ánh xạ mỗi giá trị trong (các) mảng với một giá trị mới bằng cách áp dụng lambda để tạo một giá trị mới.",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/map-function"
		}],
		functionParameter: {
			array1: {
				name: "mảng1",
				detail: "Một mảng1 cần ánh xạ."
			},
			array2: {
				name: "mảng2",
				detail: "Một mảng2 cần ánh xạ."
			},
			lambda: {
				name: "lambda",
				detail: "Một LAMBDA phải là đối số cuối cùng và phải có tham số cho mỗi mảng được truyền."
			}
		}
	},
	NOT: {
		description: "Lấy giá trị logic ngược lại của tham số",
		abstract: "Lấy giá trị logic ngược lại của tham số",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/not-function"
		}],
		functionParameter: { logical: {
			name: "biểu thức logic",
			detail: "Điều kiện mà bạn muốn đảo ngược logic có thể đánh giá là TRUE hoặc FALSE."
		} }
	},
	OR: {
		description: "Nếu bất kỳ tham số nào của hàm OR tính là TRUE, trả về TRUE; nếu tất cả tham số tính là FALSE, trả về FALSE.",
		abstract: "Nếu bất kỳ tham số nào là TRUE, trả về TRUE",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/or-function"
		}],
		functionParameter: {
			logical1: {
				name: "Biểu thức logic 1",
				detail: "Điều kiện đầu tiên muốn kiểm tra và có thể là TRUE hoặc FALSE."
			},
			logical2: {
				name: "Biểu thức logic 2",
				detail: "Các điều kiện khác muốn kiểm tra và có thể là TRUE hoặc FALSE (tối đa 255 điều kiện)."
			}
		}
	},
	REDUCE: {
		description: "Giảm mảng thành giá trị tích lũy bằng cách áp dụng LAMBDA cho mỗi giá trị và trả về tổng trong bộ tích lũy",
		abstract: "Giảm mảng thành giá trị tích lũy bằng cách áp dụng LAMBDA cho mỗi giá trị và trả về tổng trong bộ tích lũy",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/reduce-function"
		}],
		functionParameter: {
			initialValue: {
				name: "giá trị bắt đầu cho",
				detail: "Đặt giá trị bắt đầu cho bộ tích lũy."
			},
			array: {
				name: "mảng",
				detail: "Một mảng cần giảm."
			},
			lambda: {
				name: "lambda",
				detail: "Một LAMBDA được gọi là giảm mảng. LAMBDA có ba thông số: 1.Giá trị được tính tổng và trả về là kết quả cuối cùng. 2.Giá trị hiện tại từ mảng. 3.Phép tính được áp dụng cho từng thành phần trong mảng."
			}
		}
	},
	SCAN: {
		description: "Quét mảng bằng cách áp dụng LAMBDA cho mỗi giá trị và trả về một mảng chứa các giá trị trung gian",
		abstract: "Quét mảng bằng cách áp dụng LAMBDA cho mỗi giá trị và trả về một mảng chứa các giá trị trung gian",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/scan-function"
		}],
		functionParameter: {
			initialValue: {
				name: "giá trị bắt đầu cho",
				detail: "Đặt giá trị bắt đầu cho bộ tích lũy."
			},
			array: {
				name: "mảng",
				detail: "Một mảng cần quét."
			},
			lambda: {
				name: "lambda",
				detail: "Một LAMBDA được gọi là quét mảng. LAMBDA có ba thông số: 1.Giá trị được tính tổng và trả về là kết quả cuối cùng. 2.Giá trị hiện tại từ mảng. 3.Phép tính được áp dụng cho từng thành phần trong mảng."
			}
		}
	},
	SWITCH: {
		description: "Đánh giá một biểu thức dựa trên danh sách các giá trị và trả về kết quả tương ứng với giá trị đầu tiên khớp. Nếu không khớp, có thể trả về giá trị mặc định tùy chọn.",
		abstract: "Đánh giá một biểu thức dựa trên danh sách các giá trị và trả về kết quả tương ứng với giá trị đầu tiên khớp. Nếu không khớp, có thể trả về giá trị mặc định tùy chọn.",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/switch-function"
		}],
		functionParameter: {
			expression: {
				name: "Sự biểu lộ",
				detail: "Biểu thức là một giá trị (chẳng hạn như số, ngày hoặc một số văn bản) được so sánh với value1…value126."
			},
			value1: {
				name: "Giá trị 1",
				detail: "Giá trị N là giá trị được so sánh với biểu thức."
			},
			result1: {
				name: "Kết quả 1",
				detail: "Kết quả N là giá trị được trả về khi tham số giá trị N tương ứng khớp với biểu thức. Một kết quả N phải được cung cấp cho mỗi đối số N có giá trị tương ứng."
			},
			defaultOrValue2: {
				name: "Mặc định hoặc giá trị 2",
				detail: "Giá trị mặc định là giá trị được trả về nếu không tìm thấy kết quả khớp nào trong biểu thức giá trị N. Các tham số mặc định được xác định bằng cách không có biểu thức N kết quả tương ứng (xem ví dụ). Mặc định phải là tham số cuối cùng trong hàm."
			},
			result2: {
				name: "Kết quả 2",
				detail: "Kết quả N là giá trị được trả về khi tham số giá trị N tương ứng khớp với biểu thức. Một kết quả N phải được cung cấp cho mỗi đối số N có giá trị tương ứng."
			}
		}
	},
	TRUE: {
		description: "Trả về giá trị logic TRUE",
		abstract: "Trả về giá trị logic TRUE",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/true-function"
		}],
		functionParameter: {}
	},
	XOR: {
		description: "Trả về giá trị logic XOR của tất cả các tham số",
		abstract: "Trả về giá trị logic XOR của tất cả các tham số",
		links: [{
			title: "Giảng dạy",
			url: "https://support.microsoft.com/vi-vn/excel/functions/xor-function"
		}],
		functionParameter: {
			logical1: {
				name: "Biểu thức logic 1",
				detail: "Điều kiện đầu tiên muốn kiểm tra và có thể là TRUE hoặc FALSE."
			},
			logical2: {
				name: "Biểu thức logic 2",
				detail: "Các điều kiện khác muốn kiểm tra và có thể là TRUE hoặc FALSE (tối đa 255 điều kiện)."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/lookup/vi-VN.ts
const locale$6 = {
	ADDRESS: {
		description: "Trả về địa chỉ của một ô trong một trang tính dựa trên số hàng và cột đã chỉ định. Ví dụ: ADDRESS(2,3) trả về $C$2. Ví dụ khác: ADDRESS(77,300) trả về $KN$77. Bạn có thể sử dụng các hàm khác như ROW và COLUMN để cung cấp các tham số hàng và cột cho hàm ADDRESS.",
		abstract: "Trả về tham chiếu đến một ô trong trang tính dưới dạng văn bản",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/address-function"
		}],
		functionParameter: {
			row_num: {
				name: "số hàng",
				detail: "Một giá trị số xác định số hàng sẽ sử dụng trong tham chiếu ô."
			},
			column_num: {
				name: "số cột",
				detail: "Một giá trị số xác định số cột sẽ sử dụng trong tham chiếu ô."
			},
			abs_num: {
				name: "loại tham chiếu",
				detail: "Một giá trị số xác định loại tham chiếu sẽ trả về."
			},
			a1: {
				name: "kiểu tham chiếu",
				detail: "Một giá trị logic xác định kiểu tham chiếu A1 hoặc R1C1. Trong kiểu A1, cột và hàng được đánh dấu bằng chữ cái và số tương ứng. Trong kiểu tham chiếu R1C1, cả cột và hàng đều được đánh số. Nếu tham số A1 là TRUE hoặc bị bỏ qua, hàm ADDRESS trả về tham chiếu kiểu A1; nếu là FALSE, hàm ADDRESS trả về tham chiếu kiểu R1C1."
			},
			sheet_text: {
				name: "tên trang tính",
				detail: "Một giá trị văn bản xác định tên trang tính sẽ được sử dụng làm tham chiếu bên ngoài. Ví dụ: công thức =ADDRESS (1,1,,,'Sheet2') trả về Sheet2！$A$1. Nếu tham số sheet_text bị bỏ qua, tên trang tính sẽ không được sử dụng và hàm trả về tham chiếu địa chỉ đến ô trên trang tính hiện tại."
			}
		}
	},
	AREAS: {
		description: "Trả về số lượng vùng trong tham chiếu",
		abstract: "Trả về số lượng vùng trong tham chiếu",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/areas-function"
		}],
		functionParameter: { reference: {
			name: "tham chiếu",
			detail: "Tham chiếu tới một ô hoặc phạm vi ô và có thể tham chiếu tới nhiều vùng."
		} }
	},
	CHOOSE: {
		description: "Chọn giá trị từ danh sách các giá trị.",
		abstract: "Chọn giá trị từ danh sách các giá trị",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/choose-function"
		}],
		functionParameter: {
			indexNum: {
				name: "chỉ số",
				detail: "Dùng để chỉ định giá trị tham số được chọn. index_num phải là một số từ 1 đến 254 hoặc là một công thức hoặc tham chiếu ô chứa một số từ 1 đến 254.\nNếu index_num là 1, hàm CHOOSE trả về value1; nếu là 2, hàm CHOOSE trả về value2, và cứ như vậy.\nNếu index_num nhỏ hơn 1 hoặc lớn hơn chỉ số của giá trị cuối cùng trong danh sách, hàm CHOOSE trả về giá trị lỗi #VALUE!\nNếu index_num là số thập phân, nó sẽ bị cắt bỏ thành số nguyên trước khi sử dụng."
			},
			value1: {
				name: "giá trị 1",
				detail: "CHOOSE sẽ chọn một giá trị hoặc hành động từ các giá trị này dựa trên index_num. Tham số có thể là số, tham chiếu ô, tên được định nghĩa, công thức, hàm hoặc văn bản."
			},
			value2: {
				name: "giá trị 2",
				detail: "1 đến 254 tham số giá trị."
			}
		}
	},
	CHOOSECOLS: {
		description: "Trả về các cột cụ thể trong mảng",
		abstract: "Trả về các cột cụ thể trong mảng",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/choosecols-function"
		}],
		functionParameter: {
			array: {
				name: "mảng",
				detail: "Mảng chứa các cột được trả về trong mảng mới."
			},
			colNum1: {
				name: "số cột 1",
				detail: "Cột đầu tiên sẽ được trả về."
			},
			colNum2: {
				name: "số cột 2",
				detail: "Các cột khác sẽ được trả về."
			}
		}
	},
	CHOOSEROWS: {
		description: "Trả về các hàng cụ thể trong mảng",
		abstract: "Trả về các hàng cụ thể trong mảng",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/chooserows-function"
		}],
		functionParameter: {
			array: {
				name: "mảng",
				detail: "Mảng chứa các cột được trả về trong mảng mới."
			},
			rowNum1: {
				name: "số hàng 1",
				detail: "Số hàng đầu tiên cần trả về."
			},
			rowNum2: {
				name: "số hàng 2",
				detail: "Số hàng bổ sung cần trả về."
			}
		}
	},
	COLUMN: {
		description: "Trả về số cột của tham chiếu ô đã cho.",
		abstract: "Trả về số cột của tham chiếu",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/column-function"
		}],
		functionParameter: { reference: {
			name: "tham chiếu",
			detail: "Ô hoặc phạm vi ô mà bạn muốn trả về số cột."
		} }
	},
	COLUMNS: {
		description: "Trả về số cột trong mảng hoặc tham chiếu.",
		abstract: "Trả về số cột trong tham chiếu",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/columns-function"
		}],
		functionParameter: { array: {
			name: "mảng",
			detail: "Mảng, công thức mảng hoặc tham chiếu đến phạm vi ô mà bạn muốn đếm số cột."
		} }
	},
	DROP: {
		description: "Loại bỏ một số lượng hàng hoặc cột cụ thể từ đầu hoặc cuối của mảng",
		abstract: "Loại bỏ một số lượng hàng hoặc cột cụ thể từ đầu hoặc cuối của mảng",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/drop-function"
		}],
		functionParameter: {
			array: {
				name: "mảng",
				detail: "Mảng mà từ đó thả hàng hoặc cột."
			},
			rows: {
				name: "số hàng",
				detail: "Số hàng cần thả. Giá trị âm giảm từ cuối mảng."
			},
			columns: {
				name: "số cột",
				detail: "Số cột cần loại trừ. Giá trị âm giảm từ cuối mảng."
			}
		}
	},
	EXPAND: {
		description: "Mở rộng mảng hoặc điền vào kích thước hàng và cột chỉ định",
		abstract: "Mở rộng mảng hoặc điền vào kích thước hàng và cột chỉ định",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/expand-function"
		}],
		functionParameter: {
			array: {
				name: "mảng",
				detail: "Mảng cần bung rộng."
			},
			rows: {
				name: "số hàng",
				detail: "Số hàng trong mảng đã bung rộng. Nếu thiếu, hàng sẽ không được bung rộng."
			},
			columns: {
				name: "số cột",
				detail: "Số cột trong mảng đã bung rộng. Nếu thiếu, cột sẽ không được bung rộng."
			},
			padWith: {
				name: "giá trị cần đệm",
				detail: "Giá trị cần đệm. Mặc định là #N/A."
			}
		}
	},
	FILTER: {
		description: "Hàm FILTER lọc một phạm vi dữ liệu dựa trên các điều kiện đã xác định.",
		abstract: "Hàm FILTER lọc một phạm vi dữ liệu dựa trên các điều kiện đã xác định.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/filter-function"
		}],
		functionParameter: {
			array: {
				name: "mảng",
				detail: "Mảng hoặc dải ô cần lọc."
			},
			include: {
				name: "mảng boolean",
				detail: "Mảng các giá trị Boolean, trong đó TRUE biểu thị một hàng hoặc cột cần giữ lại."
			},
			ifEmpty: {
				name: "trả về giá trị null",
				detail: "Trả về nếu không có mục nào được giữ lại."
			}
		}
	},
	FORMULATEXT: {
		description: "Trả về công thức ở dạng chuỗi.",
		abstract: "Trả về công thức ở dạng chuỗi.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/formulatext-function"
		}],
		functionParameter: { reference: {
			name: "tham khảo",
			detail: "Tham chiếu đến một ô hoặc phạm vi ô."
		} }
	},
	GETPIVOTDATA: {
		description: "Hàm GETPIVOTDATA trả về dữ liệu hiển thị từ PivotTable.",
		abstract: "Hàm GETPIVOTDATA trả về dữ liệu hiển thị từ PivotTable.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/vi-vn/excel/functions/getpivotdata-function"
		}],
		functionParameter: {
			dataField: {
				name: "dataField",
				detail: "Tên của trường PivotTable có chứa dữ liệu mà bạn muốn truy xuất. Thông tin này cần nằm trong dấu ngoặc kép. Ví dụ: =GETPIVOTDATA(\"Doanh số\", A3). Ở đây, \"Doanh số\" là trường Giá trị mà chúng tôi muốn truy xuất. Vì không có trường nào khác được xác định, hàm GETPIVOTDATA trả về tổng doanh thu."
			},
			pivotTable: {
				name: "pivotTable",
				detail: "Tham chiếu tới bất kỳ ô, phạm vi ô hoặc phạm vi ô đã đặt tên trong PivotTable. Thông tin này dùng để xác định PivotTable nào có chứa dữ liệu mà bạn muốn truy xuất. Ví dụ: =GETPIVOTDATA(\"Doanh số\", A3). Ở đây, A3 là một tham chiếu bên trong PivotTable và cho công thức biết cần dùng PivotTable nào."
			},
			field1: {
				name: "field1",
				detail: "1 tới 126 tên trường và tên mục mô tả dữ liệu mà bạn muốn truy xuất. Các cặp có thể theo bất kỳ trật tự nào. Tên trường và tên mục không phải là ngày tháng và số cần được đặt trong dấu ngoặc kép. Ví dụ: =GETPIVOTDATA(\"Doanh số\", A3, \"Tháng\", \"Tháng Ba\"). Ở đây, \"Tháng\" là trường và \"Tháng Ba\" là mục. Để chỉ định nhiều mục cho một trường, hãy đặt chúng trong dấu ngoặc nhọn (ví dụ: {\"Mar\", \"Tháng 4\"}). Đối với PivotTable OLAP , các mục có thể chứa tên nguồn của kích thước cũng như tên nguồn của mục. Một cặp trường và mục cho một OLAP PivotTable có thể giống như thế này: \"[Sản phẩm]\",\"[Sản phẩm].[Tất cả Sản phẩm].[Thực phẩm].[Đồ Nướng]\""
			},
			item1: {
				name: "item1",
				detail: "1 tới 126 tên trường và tên mục mô tả dữ liệu mà bạn muốn truy xuất. Các cặp có thể theo bất kỳ trật tự nào. Tên trường và tên mục không phải là ngày tháng và số cần được đặt trong dấu ngoặc kép. Ví dụ: =GETPIVOTDATA(\"Doanh số\", A3, \"Tháng\", \"Tháng Ba\"). Ở đây, \"Tháng\" là trường và \"Tháng Ba\" là mục. Để chỉ định nhiều mục cho một trường, hãy đặt chúng trong dấu ngoặc nhọn (ví dụ: {\"Mar\", \"Tháng 4\"}). Đối với PivotTable OLAP , các mục có thể chứa tên nguồn của kích thước cũng như tên nguồn của mục. Một cặp trường và mục cho một OLAP PivotTable có thể giống như thế này: \"[Sản phẩm]\",\"[Sản phẩm].[Tất cả Sản phẩm].[Thực phẩm].[Đồ Nướng]\""
			}
		}
	},
	HLOOKUP: {
		description: "Tìm kiếm một giá trị trong hàng trên cùng của một bảng hoặc một mảng giá trị, rồi trả về một giá trị trong cùng một cột từ một hàng mà bạn chỉ định trong bảng hoặc mảng. Dùng hàm HLOOKUP khi các giá trị so sánh của bạn nằm ở một hàng nằm ngang ở trên cùng một bảng dữ liệu và bạn muốn tìm xuôi xuống một số hàng đã xác định. Dùng VLOOKUP khi các giá trị so sánh của bạn nằm trong một cột ở bên trái của dữ liệu mà bạn muốn tìm.",
		abstract: "Tìm kiếm một giá trị trong hàng trên cùng của một bảng hoặc một mảng giá trị, rồi trả về một giá trị trong cùng một cột từ một hàng mà bạn chỉ định trong bảng hoặc mảng. Dùng hàm HLOOKUP khi các giá trị so sánh của bạn nằm ở một hàng nằm ngang ở trên cùng một bảng dữ liệu và bạn muốn tìm xuôi xuống một số hàng đã xác định. Dùng VLOOKUP khi các giá trị so sánh của bạn nằm trong một cột ở bên trái của dữ liệu mà bạn muốn tìm.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/hlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "tìm giá trị",
				detail: "Yêu cầu. Giá trị cần tìm trong hàng thứ nhất của bảng. Lookup_value có thể là một giá trị, tham chiếu hoặc chuỗi văn bản."
			},
			tableArray: {
				name: "phạm vi",
				detail: "Yêu cầu. Một bảng thông tin để tìm kiếm dữ liệu trong đó. Hãy dùng tham chiếu tới một phạm vi hoặc một tên phạm vi. Các giá trị trong hàng thứ nhất của table_array có thể là văn bản, số hoặc giá trị lô-gic. Nếu range_lookup là TRUE, các giá trị trong hàng thứ nhất của table_array phải được đặt theo thứ tự tăng dần: ...-2, -1, 0, 1, 2,... , A-Z, FALSE, TRUE; nếu không, hàm HLOOKUP có thể đưa ra giá trị không đúng. Nếu range_lookup là FALSE, thì không cần phải sắp xếp table_array. Văn bản chữ hoa và chữ thường tương đương nhau. Sắp xếp các giá trị theo thứ tự tăng dần, từ trái sang phải. Để biết thêm thông tin, vui lòng xem mục Sắp xếp dữ liệu trong dải ô hoặc bảng ."
			},
			rowIndexNum: {
				name: "số dòng",
				detail: "Yêu cầu. Số hàng trong ô table_array giá trị khớp sẽ được trả về từ đó. Một row_index_num của 1 trả về giá trị hàng thứ nhất trong table_array, một row_index_num/2 trả về giá trị hàng thứ hai trong table_array, v.v. Nếu row_index_num nhỏ hơn 1, hàm HLOOKUP trả về giá #VALUE! giá trị lỗi; nếu row_index_num lớn hơn số hàng trên table_array, hàm HLOOKUP trả về giá #REF! ."
			},
			rangeLookup: {
				name: "loại truy vấn",
				detail: "Tùy chọn. Một giá trị lô-gic cho biết bạn có muốn HLOOKUP tìm thấy một kết quả khớp chính xác hay kết quả khớp tương đối. Nếu đối số này là TRUE hoặc được bỏ qua, thì hàm sẽ trả về kết quả khớp tương đối. Nói cách khác, nếu không tìm thấy một kết quả khớp chính xác thì hàm sẽ trả về giá trị lớn nhất kế tiếp nhỏ hơn lookup_value. Nếu đối số này là FALSE, hàm HLOOKUP sẽ tìm một kết quả khớp chính xác. Nếu không tìm thấy kết quả khớp chính xác, hàm sẽ trả về giá trị lỗi #N/A."
			}
		}
	},
	HSTACK: {
		description: "Nối các mảng theo chiều ngang và theo trình tự để trả về một mảng lớn hơn.",
		abstract: "Nối các mảng theo chiều ngang và theo trình tự để trả về một mảng lớn hơn.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/hstack-function"
		}],
		functionParameter: {
			array1: {
				name: "mảng",
				detail: "Mảng để nối thêm."
			},
			array2: {
				name: "mảng",
				detail: "Mảng để nối thêm."
			}
		}
	},
	HYPERLINK: {
		description: "Tạo một đường siêu liên kết bên trong ô.",
		abstract: "Tạo một đường siêu liên kết bên trong ô.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.google.com/docs/answer/3093313?hl=vi"
		}],
		functionParameter: {
			url: {
				name: "url",
				detail: "URL đầy đủ về vị trí liên kết được đóng trong dấu ngoặc kép hoặc tham chiếu đến ô có chứa URL này. Chỉ cho phép một số loại đường liên kết nhất định. Cho phép http:// , https:// , mailto: , aim: , ftp:// , gopher:// , telnet:// và news:// ; các loại khác rõ ràng không được phép. Nếu xác định một giao thức khác, link_label sẽ hiển thị trong ô, nhưng sẽ không biến thành siêu liên kết. Nếu không xác định giao thức, thì giao thức mặc định sẽ là http:// và được thêm vào đầu url ."
			},
			linkLabel: {
				name: "nhãn_đường_liên_kết",
				detail: "[ KHÔNG BẮT BUỘC – url theo mặc định ] – Văn bản cần hiển thị trong ô như là một đường liên kết, được đóng trong dấu ngoặc kép hoặc tham chiếu đến ô có chứa nhãn này. Nếu nhãn_đường_liên_kết là tham chiếu đến một ô rỗng, url sẽ hiển thị dưới dạng đường liên kết nếu hợp lệ, ngược lại là văn bản thuần túy. Nếu link_label là chuỗi rỗng tuyệt đối (\"\"), ô sẽ trông như trống, nhưng vẫn có thể truy cập vào đường liên kết bằng cách nhấp hoặc di chuyển vào ô."
			}
		}
	},
	IMAGE: {
		description: "Hàm IMAGE chèn hình ảnh vào các ô từ vị trí nguồn cùng với văn bản thay thế. Sau đó, bạn có thể di chuyển và thay đổi kích thước ô, sắp xếp và lọc cũng như làm việc với hình ảnh trong bảng Excel. Sử dụng hàm này để cải thiện trực quan các danh sách dữ liệu như hàng tồn kho, trò chơi, nhân viên và các khái niệm toán học.",
		abstract: "Hàm IMAGE chèn hình ảnh vào các ô từ vị trí nguồn cùng với văn bản thay thế. Sau đó, bạn có thể di chuyển và thay đổi kích thước ô, sắp xếp và lọc cũng như làm việc với hình ảnh trong bảng Excel. Sử dụng hàm này để cải thiện trực quan các danh sách dữ liệu như hàng tồn kho, trò chơi, nhân viên và các khái niệm toán học.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/image-function"
		}],
		functionParameter: {
			source: {
				name: "nguồn",
				detail: "Đường dẫn URL sử dụng giao thức \"https\" của tệp hình ảnh. Bắt buộc."
			},
			altText: {
				name: "văn bản thay thế",
				detail: "Văn bản thay thế mô tả hình ảnh cho khả năng truy nhập."
			},
			sizing: {
				name: "định cỡ",
				detail: "Chỉ định kích thước hình ảnh."
			},
			height: {
				name: "chiều cao",
				detail: "Chiều cao tùy chỉnh của hình ảnh tính bằng pixel."
			},
			width: {
				name: "độ rộng",
				detail: "Chiều rộng tùy chỉnh của hình ảnh tính bằng pixel."
			}
		}
	},
	INDEX: {
		description: "Trả về tham chiếu của ô nằm ở giao cắt của một hàng và cột cụ thể. Nếu tham chiếu được tạo thành từ các vùng chọn không liền kề, bạn có thể chọn vùng chọn để tìm trong đó.",
		abstract: "Chọn một giá trị từ một tham chiếu hoặc mảng bằng chỉ mục",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/index-function"
		}],
		functionParameter: {
			reference: {
				name: "tham khảo",
				detail: "Tham chiếu tới một hoặc nhiều phạm vi ô."
			},
			rowNum: {
				name: "số dòng",
				detail: "Số hàng trong tham chiếu từ đó trả về một tham chiếu."
			},
			columnNum: {
				name: "số cột",
				detail: "Số cột trong tham chiếu từ đó trả về một tham chiếu."
			},
			areaNum: {
				name: "số khu vực",
				detail: "Chọn một phạm vi trong tham chiếu mà từ đó trả về giao điểm của row_num và column_num."
			}
		}
	},
	INDIRECT: {
		description: "Trả về tham chiếu được chỉ rõ bởi một chuỗi văn bản. Các tham chiếu có thể được đánh giá tức thì để hiển thị nội dung của chúng.",
		abstract: "Trả về tham chiếu được chỉ rõ bởi một chuỗi văn bản.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/indirect-function"
		}],
		functionParameter: {
			refText: {
				name: "văn bản trích dẫn",
				detail: "Tham chiếu tới một ô có chứa kiểu tham chiếu A1, kiểu tham chiếu R1C1, tên đã xác định dưới dạng tham chiếu, hoặc tham chiếu tới ô dưới dạng chuỗi văn bản."
			},
			a1: {
				name: "loại tham chiếu",
				detail: "Một giá trị lô-gic chỉ rõ kiểu tham chiếu nào được chứa trong văn bản tham chiếu ô."
			}
		}
	},
	LOOKUP: {
		description: "Được sử dụng khi bạn cần truy vấn một hàng hoặc cột và tìm giá trị ở cùng vị trí trong hàng hoặc cột khác",
		abstract: "Tìm một giá trị trong một vectơ hoặc mảng",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/lookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "tìm giá trị",
				detail: "Giá trị cần tìm trong vectơ đầu tiên. Có thể là số, văn bản, giá trị logic, tên hoặc tham chiếu đến một giá trị."
			},
			lookupVectorOrArray: {
				name: "phạm vi truy vấn hoặc mảng",
				detail: "Một dải ô chỉ chứa một hàng hoặc cột."
			},
			resultVector: {
				name: "phạm vi kết quả",
				detail: "Một dải ô chỉ chứa một hàng hoặc cột. Đối số phải có cùng kích thước với đối số lookup_vector. Kích thước của chúng phải giống nhau."
			}
		}
	},
	MATCH: {
		description: "Hàm MATCH tìm một mục được chỉ định trong phạm vi của ô, sau đó trả về vị trí tương đối của mục đó trong phạm vi này.",
		abstract: "Tìm một giá trị trong một tham chiếu hoặc mảng.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/match-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "giá trị tìm kiếm",
				detail: "Giá trị mà bạn muốn so khớp trong mảng tìm kiếm."
			},
			lookupArray: {
				name: "mảng tìm kiếm",
				detail: "Phạm vi ô được tìm kiếm."
			},
			matchType: {
				name: "kiểu khớp",
				detail: "Số -1, 0 hoặc 1."
			}
		}
	},
	OFFSET: {
		description: "Trả về offset tham chiếu từ tham chiếu đã cho",
		abstract: "Trả về offset tham chiếu từ tham chiếu đã cho",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/offset-function"
		}],
		functionParameter: {
			reference: {
				name: "tham chiếu",
				detail: "Vùng tham chiếu mà bạn muốn căn cứ khoảng cách tham chiếu vào đó."
			},
			rows: {
				name: "số hàng",
				detail: "Số hàng, lên hoặc xuống, mà bạn muốn ô ở góc trên bên trái tham chiếu tới."
			},
			cols: {
				name: "số cột",
				detail: "Số cột, về bên trái hoặc phải, mà bạn muốn ô ở góc trên bên trái của kết quả tham chiếu tới."
			},
			height: {
				name: "chiều cao",
				detail: "Chiều cao, tính bằng số hàng, mà bạn muốn có cho tham chiếu trả về. Chiều cao phải là số dương."
			},
			width: {
				name: "Độ rộng",
				detail: "Độ rộng, tính bằng số cột, mà bạn muốn có cho tham chiếu trả về. Độ rộng phải là số dương."
			}
		}
	},
	ROW: {
		description: "Trả về số hàng được tham chiếu bởi ô đã cho.",
		abstract: "Trả về số hàng của một tham chiếu.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/row-function"
		}],
		functionParameter: { reference: {
			name: "tham chiếu",
			detail: "Ô hoặc phạm vi ô mà bạn muốn lấy số hàng của chúng."
		} }
	},
	ROWS: {
		description: "Trả về số của các hàng trong một tham chiếu hoặc một mảng.",
		abstract: "Trả về số của các hàng trong một tham chiếu hoặc một mảng.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/rows-function"
		}],
		functionParameter: { array: {
			name: "mảng",
			detail: "Một mảng, công thức mảng hay tham chiếu đến phạm vi ô mà bạn muốn lấy số hàng."
		} }
	},
	RTD: {
		description: "Truy xuất dữ liệu thời gian thực từ một chương trình có hỗ trợ tự động hóa COM.",
		abstract: "Truy xuất dữ liệu thời gian thực từ một chương trình có hỗ trợ tự động hóa COM.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/vi-vn/excel/functions/rtd-function"
		}],
		functionParameter: {
			progId: {
				name: "progId",
				detail: "Yêu cầu. Tên progID của bổ trợ tự động hóa COM đã đăng ký đã được cài đặt trên máy tính cục bộ. Tên đặt trong dấu ngoặc kép."
			},
			server: {
				name: "server",
				detail: "Yêu cầu. Tên của máy chủ nơi cần chạy bổ trợ. Nếu không có máy chủ và chương trình hiện đang chạy cục bộ, hãy để trống đối số này. Nếu không thì hãy đặt tên máy chủ trong dấu ngoặc kép (\"\"). Khi đang dùng RTD trong Visual Basic for Applications (VBA), cần phải có cho máy chủ dấu ngoặc kép hoặc thuộc tính NullString của VBA, ngay cả khi máy chủ đang chạy cục bộ."
			},
			topic1: {
				name: "topic1",
				detail: "Topic1 là bắt buộc, các chủ đề tiếp theo là tùy chọn. Các tham số từ 1 đến 253 cùng đại diện cho phần dữ liệu thời gian thực duy nhất."
			},
			topic2: {
				name: "topic2",
				detail: "Topic1 là bắt buộc, các chủ đề tiếp theo là tùy chọn. Các tham số từ 1 đến 253 cùng đại diện cho phần dữ liệu thời gian thực duy nhất."
			}
		}
	},
	SORT: {
		description: "Sắp xếp nội dung của một phạm vi hoặc mảng",
		abstract: "Sắp xếp nội dung của một phạm vi hoặc mảng",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/sort-function"
		}],
		functionParameter: {
			array: {
				name: "mảng",
				detail: "Dải ô hoặc mảng để sắp xếp."
			},
			sortIndex: {
				name: "chỉ mục sắp xếp",
				detail: "Số cho biết hàng hoặc cột để sắp xếp theo."
			},
			sortOrder: {
				name: "thứ tự sắp xếp",
				detail: "Số cho biết thứ tự sắp xếp mong muốn; 1 cho thứ tự tăng dần (mặc định), -1 cho thứ tự giảm dần."
			},
			byCol: {
				name: "hướng sắp xếp",
				detail: "Giá trị lô-gic cho biết hướng sắp xếp mong muốn; FALSE để sắp xếp theo hàng (mặc định), TRUE để sắp xếp theo cột."
			}
		}
	},
	SORTBY: {
		description: "Sắp xếp nội dung của một phạm vi hoặc mảng dựa trên các giá trị trong phạm vi hoặc mảng tương ứng",
		abstract: "Sắp xếp nội dung của một phạm vi hoặc mảng dựa trên các giá trị trong phạm vi hoặc mảng tương ứng",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/sortby-function"
		}],
		functionParameter: {
			array: {
				name: "mảng",
				detail: "Mảng hoặc dải ô cần sắp xếp"
			},
			byArray1: {
				name: "sắp xếp mảng 1",
				detail: "Mảng hoặc dải ô cần sắp xếp theo"
			},
			sortOrder1: {
				name: "thứ tự sắp xếp 1",
				detail: "Thứ tự dùng để sắp xếp. 1 cho tăng dần, -1 cho giảm dần. Mặc định là tăng dần."
			},
			byArray2: {
				name: "sắp xếp mảng 2",
				detail: "Mảng hoặc dải ô cần sắp xếp theo"
			},
			sortOrder2: {
				name: "thứ tự sắp xếp 2",
				detail: "Thứ tự dùng để sắp xếp. 1 cho tăng dần, -1 cho giảm dần. Mặc định là tăng dần."
			}
		}
	},
	TAKE: {
		description: "Trả về một số hàng hoặc cột liền kề đã xác định từ điểm bắt đầu hoặc kết thúc của một mảng.",
		abstract: "Trả về một số hàng hoặc cột liền kề đã xác định từ điểm bắt đầu hoặc kết thúc của một mảng.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/take-function"
		}],
		functionParameter: {
			array: {
				name: "mảng",
				detail: "Mảng lấy hàng hoặc cột từ đó."
			},
			rows: {
				name: "số hàng",
				detail: "Số hàng cần thực hiện. Giá trị âm lấy từ cuối mảng."
			},
			columns: {
				name: "số cột",
				detail: "Số cột cần thực hiện. Giá trị âm lấy từ cuối mảng."
			}
		}
	},
	TOCOL: {
		description: "Trả về mảng trong một cột đơn.",
		abstract: "Trả về mảng trong một cột đơn.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/tocol-function"
		}],
		functionParameter: {
			array: {
				name: "mảng",
				detail: "Mảng hoặc tham chiếu muốn trả về dưới dạng cột."
			},
			ignore: {
				name: "bỏ qua giá trị",
				detail: "Có bỏ qua một số kiểu giá trị nhất định hay không. Theo mặc định, không có giá trị nào bị bỏ qua. Xác định một trong những hành động sau:\n0 Giữ tất cả các giá trị (mặc định)\n1 Bỏ qua giá trị trống\n2 Bỏ qua lỗi\n3 Bỏ qua giá trị trống và lỗi"
			},
			scanByColumn: {
				name: "quét mảng theo cột",
				detail: "Quét mảng theo cột. Theo mặc định, mảng được quét theo hàng. Quét xác định xem các giá trị được sắp xếp theo hàng hay theo cột."
			}
		}
	},
	TOROW: {
		description: "Trả về mảng trong một hàng đơn.",
		abstract: "Trả về mảng trong một hàng đơn.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/torow-function"
		}],
		functionParameter: {
			array: {
				name: "mảng",
				detail: "Mảng hoặc tham chiếu muốn trả về dưới dạng một hàng."
			},
			ignore: {
				name: "bỏ qua giá trị",
				detail: "Có bỏ qua một số kiểu giá trị nhất định hay không. Theo mặc định, không có giá trị nào bị bỏ qua. Xác định một trong những hành động sau:\n0 Giữ tất cả các giá trị (mặc định)\n1 Bỏ qua giá trị trống\n2 Bỏ qua lỗi\n3 Bỏ qua giá trị trống và lỗi"
			},
			scanByColumn: {
				name: "quét mảng theo cột",
				detail: "Quét mảng theo cột. Theo mặc định, mảng được quét theo hàng. Quét xác định xem các giá trị được sắp xếp theo hàng hay theo cột."
			}
		}
	},
	TRANSPOSE: {
		description: "Trả về chuyển vị của một mảng",
		abstract: "Trả về chuyển vị của một mảng",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/transpose-function"
		}],
		functionParameter: { array: {
			name: "mảng",
			detail: "Một mảng hay một phạm vi nhiều ô trên trang tính mà bạn muốn hoán đổi."
		} }
	},
	UNIQUE: {
		description: "trả về danh sách các giá trị duy nhất trong một danh sách hoặc dải ô. ",
		abstract: "trả về danh sách các giá trị duy nhất trong một danh sách hoặc dải ô. ",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/unique-function"
		}],
		functionParameter: {
			array: {
				name: "mảng",
				detail: "Dải ô hoặc mảng mà từ đó trả về các hàng hoặc cột duy nhất"
			},
			byCol: {
				name: "theo cột",
				detail: "Là giá trị logic: so sánh các hàng với nhau và trả về giá trị duy nhất = FALSE hoặc bị bỏ qua so sánh các cột với nhau và trả về giá trị duy nhất = TRUE."
			},
			exactlyOnce: {
				name: "chỉ một lần",
				detail: "Là một giá trị logic: trả về một hàng hoặc cột chỉ xuất hiện một lần từ một mảng = TRUE; trả về tất cả các hàng hoặc cột riêng biệt từ một mảng = FALSE hoặc bị bỏ qua."
			}
		}
	},
	VLOOKUP: {
		description: "Sử dụng VLOOKUP khi bạn cần tìm thứ gì đó theo hàng trong bảng hoặc dải ô. Ví dụ: tìm giá phụ tùng ô tô theo số bộ phận hoặc tìm tên nhân viên dựa trên ID nhân viên của họ.",
		abstract: "Tìm trong cột đầu tiên của mảng và di chuyển giữa các hàng để trả về giá trị của ô",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/vlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "tìm giá trị",
				detail: "Giá trị cần tìm. Giá trị được tìm thấy phải nằm ở hàng đầu tiên của phạm vi ô được chỉ định trong tham số table_array."
			},
			tableArray: {
				name: "phạm vi",
				detail: "Phạm vi ô trong đó VLOOKUP tìm kiếm lookup_value và trả về giá trị. Bảng thông tin để tìm dữ liệu. Sử dụng tham chiếu đến một vùng hoặc tên vùng."
			},
			colIndexNum: {
				name: "Số cột",
				detail: "Số ô chứa giá trị trả về (ô ngoài cùng bên trái của table_array được đánh số bắt đầu bằng 1)."
			},
			rangeLookup: {
				name: "loại truy vấn",
				detail: "Chỉ định xem bạn muốn tìm kết quả khớp chính xác hay kết quả khớp gần đúng: kết quả khớp gần đúng mặc định - 1/TRUE, kết quả khớp chính xác - 0/FALSE."
			}
		}
	},
	VSTACK: {
		description: "Nối các mảng theo chiều dọc để trả về mảng lớn hơn",
		abstract: "Nối các mảng theo chiều dọc để trả về mảng lớn hơn",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/vstack-function"
		}],
		functionParameter: {
			array1: {
				name: "mảng",
				detail: "Mảng để nối thêm."
			},
			array2: {
				name: "mảng",
				detail: "Mảng để nối thêm."
			}
		}
	},
	WRAPCOLS: {
		description: "Ngắt dòng hoặc cột giá trị được cung cấp theo cột sau một số lượng các thành phần được chỉ định để tạo thành một mảng mới.",
		abstract: "Ngắt dòng hoặc cột giá trị được cung cấp theo cột sau một số lượng các thành phần được chỉ định để tạo thành một mảng mới.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/wrapcols-function"
		}],
		functionParameter: {
			vector: {
				name: "véc-tơ",
				detail: "Véc-tơ hoặc tham chiếu để ngắt dòng."
			},
			wrapCount: {
				name: "số lần ngắt dòng",
				detail: "Số lượng giá trị tối đa cho mỗi cột."
			},
			padWith: {
				name: "giá trị cần đệm",
				detail: "Giá trị cần đệm. Mặc định là #N/A."
			}
		}
	},
	WRAPROWS: {
		description: "Ngắt dòng hoặc cột giá trị được cung cấp theo hàng sau một số lượng các thành phần được chỉ định để tạo thành một mảng mới.",
		abstract: "Ngắt dòng hoặc cột giá trị được cung cấp theo hàng sau một số lượng các thành phần được chỉ định để tạo thành một mảng mới.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/wraprows-function"
		}],
		functionParameter: {
			vector: {
				name: "véc-tơ",
				detail: "Véc-tơ hoặc tham chiếu để ngắt dòng."
			},
			wrapCount: {
				name: "số lần ngắt dòng",
				detail: "Số lượng giá trị tối đa cho mỗi hàng."
			},
			padWith: {
				name: "giá trị cần đệm",
				detail: "Giá trị cần đệm. Mặc định là #N/A."
			}
		}
	},
	XLOOKUP: {
		description: "Hàm tìm kiếm một phạm vi hoặc mảng và trả về mục tương ứng với kết quả khớp đầu tiên mà nó tìm thấy. Nếu không có kết quả khớp nào tồn tại, XLOOKUP có thể trả về kết quả khớp (gần đúng) gần nhất",
		abstract: "Tìm kiếm một phạm vi hoặc mảng và trả về mục tương ứng với kết quả khớp đầu tiên được tìm thấy.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/xlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "tìm giá trị",
				detail: "Giá trị cần tìm kiếm. Nếu bị bỏ qua, XLOOKUP sẽ trả về các ô trống được tìm thấy trong lookup_array."
			},
			lookupArray: {
				name: "khu vực tìm kiếm",
				detail: "Mảng hoặc dải ô cần tìm kiếm."
			},
			returnArray: {
				name: "khu vực trả lại",
				detail: "Mảng hoặc dải ô cần trả về"
			},
			ifNotFound: {
				name: "giá trị hiển thị mặc định",
				detail: "Trả về văn bản [if_not_found] mà bạn đã cung cấp nếu không tìm thấy kết quả khớp hợp lệ, nếu không thì trả về #N/A"
			},
			matchMode: {
				name: "loại so khớp",
				detail: "Chỉ định loại đối sánh: 0 - Đối sánh chính xác. Nếu không tìm thấy thì trả về #N/A. Tùy chọn mặc định. -1 - một kết quả khớp chính xác. Nếu không tìm thấy, mục nhỏ hơn tiếp theo sẽ được trả về. 1 - một trận đấu chính xác. Nếu không tìm thấy, mục lớn hơn tiếp theo sẽ được trả về. 2 - Khớp ký tự đại diện, trong đó *, ? và ~ có ý nghĩa đặc biệt."
			},
			searchMode: {
				name: "chế độ tìm kiếm",
				detail: "Chỉ định chế độ tìm kiếm sẽ sử dụng: 1 Thực hiện tìm kiếm bắt đầu từ mục đầu tiên, tùy chọn mặc định. -1 Thực hiện tìm kiếm ngược bắt đầu từ mục cuối cùng. 2 thực hiện tìm kiếm nhị phân phụ thuộc vào lookup_array được sắp xếp theo thứ tự tăng dần, -2 thực hiện tìm kiếm nhị phân phụ thuộc vào lookup_array được sắp xếp theo thứ tự giảm dần."
			}
		}
	},
	XMATCH: {
		description: "Tìm kiếm một mục được chỉ định trong một mảng hoặc phạm vi ô và trả về vị trí tương đối của mục đó.",
		abstract: "Trả về vị trí tương đối của một mục trong một mảng hoặc phạm vi ô.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/xmatch-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "tìm giá trị",
				detail: "tìm giá trị."
			},
			lookupArray: {
				name: "khu vực tìm kiếm",
				detail: "Mảng hoặc dải ô cần tìm kiếm."
			},
			matchMode: {
				name: "loại so khớp",
				detail: "Chỉ định loại đối sánh:\n0 - đối sánh chính xác (mặc định)\n-1 - đối sánh chính xác hoặc mục nhỏ nhất tiếp theo\n1 - đối sánh chính xác hoặc mục lớn nhất tiếp theo\n2 - đối sánh ký tự đại diện, trong đó *, ? và ~ có ý nghĩa đặc biệt ."
			},
			searchMode: {
				name: "loại tìm kiếm",
				detail: "Chỉ định loại tìm kiếm: \n1 - Tìm kiếm từ đầu đến cuối (mặc định) \n-1 - Tìm kiếm từ cuối đến đầu (tìm kiếm ngược). \n2 - Thực hiện tìm kiếm nhị phân dựa trên việc sắp xếp lookup_array theo thứ tự tăng dần. Nếu không được sắp xếp, kết quả không hợp lệ sẽ được trả về. \n2 - Thực hiện tìm kiếm nhị phân dựa trên lookup_array được sắp xếp theo thứ tự giảm dần. Nếu không được sắp xếp, kết quả không hợp lệ sẽ được trả về."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/math/vi-VN.ts
const locale$5 = {
	ABS: {
		description: "Trả về giá trị tuyệt đối của một số. Giá trị tuyệt đối của một số là số đó không có dấu.",
		abstract: "Trả về giá trị tuyệt đối của một số.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/abs-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Số thực mà bạn muốn tìm giá trị tuyệt đối của nó."
		} }
	},
	ACOS: {
		description: "Trả về arccosin, hay cosin nghịch đảo, của một số. Arccosin là góc mà cosin của nó là số. Góc được trả về được tính bằng radian trong phạm vi từ 0 (không) đến pi.",
		abstract: "Trả về cung cosin của một số",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/acos-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Cosin của góc mà bạn muốn và phải từ -1 đến 1."
		} }
	},
	ACOSH: {
		description: "Trả về cosin hyperbolic nghịch đảo của một số. Số đó phải lớn hơn hoặc bằng 1. Cosin hyperbolic nghịch đảo là giá trị mà cosin hyperbolic của nó là số, vì vậy ACOSH(COSH(number)) bằng số.",
		abstract: "Trả về cosin hyperbolic nghịch đảo của một số.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/acosh-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Bất kỳ số thực nào lớn hơn hoặc bằng 1."
		} }
	},
	ACOT: {
		description: "Trả về giá trị chính của arccotang hoặc nghịch đảo cotang của một số.",
		abstract: "Trả về cotang nghịch đảo của một số",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/acot-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Số là cotang của góc mà bạn muốn. Số này phải là số thực."
		} }
	},
	ACOTH: {
		description: "Trả về nghịch đảo cotang hyperbol của một số.",
		abstract: "Trả về nghịch đảo cotang hyperbol của một số.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/acoth-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Giá trị tuyệt đối của Số phải lớn hơn 1."
		} }
	},
	AGGREGATE: {
		description: "Trả về tổng gộp trong một danh sách hoặc một cơ sở dữ liệu.",
		abstract: "Trả về tổng gộp trong một danh sách hoặc một cơ sở dữ liệu.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/aggregate-function"
		}],
		functionParameter: {
			functionNum: {
				name: "function_num",
				detail: "Một số từ 1 đến 19 chỉ rõ hàm cần dùng."
			},
			options: {
				name: "options",
				detail: "Một giá trị số xác định những giá trị nào cần bỏ qua trong phạm vi định trị của hàm."
			},
			ref1: {
				name: "ref1",
				detail: "Đối số dạng số thứ nhất cho những hàm có nhiều đối số dạng số mà bạn muốn có giá trị tổng gộp."
			},
			ref2: {
				name: "ref2",
				detail: "Đối số dạng số 2 đến 252 mà bạn muốn có giá trị tổng gộp."
			}
		}
	},
	ARABIC: {
		description: "Chuyển đổi một chữ số La Mã sang một chữ số Ả-rập.",
		abstract: "Chuyển đổi một chữ số La Mã sang một chữ số Ả-rập.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/arabic-function"
		}],
		functionParameter: { text: {
			name: "bản văn",
			detail: "Một chuỗi nằm trong dấu ngoặc kép, một chuỗi trống (\"\") hoặc một tham chiếu đến ô có chứa văn bản."
		} }
	},
	ASIN: {
		description: "Trả về arcsin, hayine nghịch đảo của một số.",
		abstract: "Trả về arcsin, hayine nghịch đảo của một số.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/asin-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Sin của góc mà bạn muốn và phải từ -1 đến 1."
		} }
	},
	ASINH: {
		description: "Trả về sin hyperbolic nghịch đảo của một số.",
		abstract: "Trả về sin hyperbolic nghịch đảo của một số.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/asinh-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Bất kỳ số thực nào."
		} }
	},
	ATAN: {
		description: "Trả về arctang, hay tang nghịch đảo của một số.",
		abstract: "Trả về arctang, hay tang nghịch đảo của một số.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/atan-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Tang của góc mà bạn muốn."
		} }
	},
	ATAN2: {
		description: "Trả về arctang, hay tang nghịch đảo của tọa độ x và tọa độ y đã xác định. Arctang là góc từ trục x đến đường thẳng chứa tọa độ gốc (0, 0) và một điểm có tọa độ (x_num, y_num). Góc được tính bằng radian và có giá trị từ -pi đến pi, không bao gồm -pi.",
		abstract: "Trả về arctang, hay tang nghịch đảo của tọa độ x và tọa độ y đã xác định. Arctang là góc từ trục x đến đường thẳng chứa tọa độ gốc (0, 0) và một điểm có tọa độ (x_num, y_num). Góc được tính bằng radian và có giá trị từ -pi đến pi, không bao gồm -pi.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/atan2-function"
		}],
		functionParameter: {
			xNum: {
				name: "Tọa độ x",
				detail: "Yêu cầu. Tọa độ x của điểm."
			},
			yNum: {
				name: "Tọa độ y",
				detail: "Yêu cầu. Tọa độ y của điểm."
			}
		}
	},
	ATANH: {
		description: "Trả về tang hyperbolic nghịch đảo của một số. Số phải từ -1 đến 1 (không bao gồm -1 và 1). Tang hyperbolic nghịch đảo là giá trị mà tang hyperbolic của nó là số , vì vậy ATANH(TANH(number)) bằng số .",
		abstract: "Trả về tang hyperbolic nghịch đảo của một số. Số phải từ -1 đến 1 (không bao gồm -1 và 1). Tang hyperbolic nghịch đảo là giá trị mà tang hyperbolic của nó là số , vì vậy ATANH(TANH(number)) bằng số .",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/atanh-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Bắt buộc. Bất kỳ số thực nào từ 1 đến -1."
		} }
	},
	BASE: {
		description: "Chuyển một số sang dạng trình bày văn bản với cơ số cho trước.",
		abstract: "Chuyển một số sang dạng trình bày văn bản với cơ số cho trước.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/base-function"
		}],
		functionParameter: {
			number: {
				name: "số",
				detail: "Số mà bạn muốn chuyển đổi. Phải là số nguyên lớn hơn hoặc bằng 0 và nhỏ hơn 2^53."
			},
			radix: {
				name: "Cơ số",
				detail: "Cơ số mà bạn muốn chuyển số trên thành. Phải là số nguyên lớn hơn hoặc bằng 2 và nhỏ hơn hoặc bằng 36."
			},
			minLength: {
				name: "chiều dài tối thiểu",
				detail: "Độ dài tối thiểu của chuỗi trả về. Phải là số nguyên lớn hơn hoặc bằng 0."
			}
		}
	},
	CEILING: {
		description: "Trả về số được làm tròn lên, xa số không, đến bội số có nghĩa gần nhất.",
		abstract: "Trả về số được làm tròn lên, xa số không, đến bội số có nghĩa gần nhất.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/ceiling-function"
		}],
		functionParameter: {
			number: {
				name: "số",
				detail: "Giá trị mà bạn muốn làm tròn."
			},
			significance: {
				name: "bội số",
				detail: "Bội số mà bạn muốn làm tròn đến."
			}
		}
	},
	CEILING_MATH: {
		description: "Làm tròn số lên số nguyên gần nhất hoặc bội số có nghĩa gần nhất.",
		abstract: "Làm tròn số lên số nguyên gần nhất hoặc bội số có nghĩa gần nhất.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/ceiling-math-function"
		}],
		functionParameter: {
			number: {
				name: "số",
				detail: "Giá trị mà bạn muốn làm tròn."
			},
			significance: {
				name: "bội số",
				detail: "Bội số mà bạn muốn làm tròn đến."
			},
			mode: {
				name: "phương thức",
				detail: "Đối với số âm, kiểm soát xem Số có được làm tròn tới hoặc khác 0 hay không."
			}
		}
	},
	CEILING_PRECISE: {
		description: "Trả về một số được làm tròn lên tới số nguyên gần nhất hoặc tới bội số có nghĩa gần nhất. Bất chấp dấu của số, số sẽ được làm tròn lên.",
		abstract: "Trả về một số được làm tròn lên tới số nguyên gần nhất hoặc tới bội số có nghĩa gần nhất.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/ceiling-precise-function"
		}],
		functionParameter: {
			number: {
				name: "số",
				detail: "Giá trị mà bạn muốn làm tròn."
			},
			significance: {
				name: "bội số",
				detail: "Bội số mà bạn muốn làm tròn đến."
			}
		}
	},
	COMBIN: {
		description: "Trả về số tổ hợp cho số mục nhất định.",
		abstract: "Trả về số tổ hợp cho số mục nhất định.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/combin-function"
		}],
		functionParameter: {
			number: {
				name: "tổng cộng",
				detail: "Số hạng mục."
			},
			numberChosen: {
				name: "số lượng mẫu",
				detail: "Số hạng mục trong mỗi tổ hợp."
			}
		}
	},
	COMBINA: {
		description: "Trả về số lần kết hợp (có kèm những lần lặp lại) đối với số lượng mục cho trước.",
		abstract: "Trả về số lần kết hợp (có kèm những lần lặp lại) đối với số lượng mục cho trước.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/combina-function"
		}],
		functionParameter: {
			number: {
				name: "tổng cộng",
				detail: "Số hạng mục."
			},
			numberChosen: {
				name: "số lượng mẫu",
				detail: "Số hạng mục trong mỗi tổ hợp."
			}
		}
	},
	COS: {
		description: "Trả về cosin của góc đã cho.",
		abstract: "Trả về cosin của góc đã cho.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/cos-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Góc tính bằng radian mà bạn muốn tính cosin cho nó."
		} }
	},
	COSH: {
		description: "Trả về cosin hyperbolic của một số.",
		abstract: "Trả về cosin hyperbolic của một số.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/cosh-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Bất kỳ số thực nào mà bạn muốn tìm cosin hyperbolic cho số đó."
		} }
	},
	COT: {
		description: "Trả về giá trị cotang của góc được đo bằng radian.",
		abstract: "Trả về giá trị cotang của góc được đo bằng radian.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/cot-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Góc được đo bằng radian mà bạn muốn tính cotang."
		} }
	},
	COTH: {
		description: "Trả về cotang hyperbolic của một góc hyperbolic.",
		abstract: "Trả về cotang hyperbolic của một góc hyperbolic.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/coth-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Muốn tìm số thực bất kỳ là cotang hyperbol."
		} }
	},
	CSC: {
		description: "Trả về cosec của một góc được tính bằng radian.",
		abstract: "Trả về cosec của một góc được tính bằng radian.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/csc-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Tôi muốn tìm góc cosecant, được biểu thị bằng radian."
		} }
	},
	CSCH: {
		description: "Trả về cosec hyperbolic của một góc được tính bằng radian.",
		abstract: "Trả về cosec hyperbolic của một góc được tính bằng radian.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/csch-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Góc mà bạn muốn tìm giá trị cosec hyperbol, được biểu thị bằng radian."
		} }
	},
	DECIMAL: {
		description: "Chuyển đổi dạng biểu thị số bằng văn bản theo một cơ số đã cho thành một số thập phân.",
		abstract: "Chuyển đổi dạng biểu thị số bằng văn bản theo một cơ số đã cho thành một số thập phân.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/decimal-function"
		}],
		functionParameter: {
			text: {
				name: "sợi dây",
				detail: "Độ dài chuỗi phải nhỏ hơn hoặc bằng 255 ký tự."
			},
			radix: {
				name: "Cơ số",
				detail: "Cơ sở để chuyển đổi số thành. Phải là số nguyên lớn hơn hoặc bằng 2 và nhỏ hơn hoặc bằng 36."
			}
		}
	},
	DEGREES: {
		description: "Chuyển đổi radian sang độ.",
		abstract: "Chuyển đổi radian sang độ.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/degrees-function"
		}],
		functionParameter: { angle: {
			name: "góc",
			detail: "Góc tính bằng radian mà bạn muốn chuyển đổi."
		} }
	},
	EVEN: {
		description: "Trả về số được làm tròn lên đến số nguyên chẵn gần nhất.",
		abstract: "Trả về số được làm tròn lên đến số nguyên chẵn gần nhất.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/even-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Giá trị cần làm tròn."
		} }
	},
	EXP: {
		description: "Trả về lũy thừa của số e với một số mũ nào đó.",
		abstract: "Trả về lũy thừa của số e với một số mũ nào đó.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/exp-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Số mũ áp dụng cho cơ số e."
		} }
	},
	FACT: {
		description: "Trả về giai thừa của một số.",
		abstract: "Trả về giai thừa của một số.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/fact-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Số không âm mà bạn muốn tìm giai thừa của nó. Nếu number không phải là số nguyên thì nó bị cắt cụt."
		} }
	},
	FACTDOUBLE: {
		description: "Trả về giai thừa kép của một số.",
		abstract: "Trả về giai thừa kép của một số.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/factdouble-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Giá trị để trả về giai thừa kép của nó. Nếu number không phải là số nguyên thì nó bị cắt cụt."
		} }
	},
	FLOOR: {
		description: "Làm tròn số theo giá trị tuyệt đối giảm dần",
		abstract: "Làm tròn số theo giá trị tuyệt đối giảm dần",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/floor-function"
		}],
		functionParameter: {
			number: {
				name: "số",
				detail: "Giá trị số mà bạn muốn làm tròn."
			},
			significance: {
				name: "bội số",
				detail: "Bội số mà bạn muốn làm tròn đến."
			}
		}
	},
	FLOOR_MATH: {
		description: "Làm tròn một số xuống số nguyên gần nhất hay tới bội số gần nhất của một số có nghĩa.",
		abstract: "Làm tròn một số xuống số nguyên gần nhất hay tới bội số gần nhất của một số có nghĩa.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/floor-math-function"
		}],
		functionParameter: {
			number: {
				name: "số",
				detail: "Giá trị số mà bạn muốn làm tròn."
			},
			significance: {
				name: "bội số",
				detail: "Bội số mà bạn muốn làm tròn đến."
			},
			mode: {
				name: "phương thức",
				detail: "Đối với số âm, kiểm soát xem Số có được làm tròn tới hoặc khác 0 hay không."
			}
		}
	},
	FLOOR_PRECISE: {
		description: "Trả về một số được làm tròn xuống tới số nguyên gần nhất hoặc tới bội số có nghĩa gần nhất. Bất chấp dấu của số, số sẽ được làm tròn xuống.",
		abstract: "Trả về một số được làm tròn xuống tới số nguyên gần nhất hoặc tới bội số có nghĩa gần nhất.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/floor-precise-function"
		}],
		functionParameter: {
			number: {
				name: "số",
				detail: "Giá trị số mà bạn muốn làm tròn."
			},
			significance: {
				name: "bội số",
				detail: "Bội số mà bạn muốn làm tròn đến."
			}
		}
	},
	GCD: {
		description: "Trả về ước số chung lớn nhất của hai hoặc nhiều số nguyên.",
		abstract: "Trả về ước số chung lớn nhất của hai hoặc nhiều số nguyên.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/gcd-function"
		}],
		functionParameter: {
			number1: {
				name: "số1",
				detail: "Giá trị hoặc dải ô đầu tiên được sử dụng để tính toán."
			},
			number2: {
				name: "số2",
				detail: "Các giá trị hoặc phạm vi bổ sung để sử dụng cho việc tính toán."
			}
		}
	},
	INT: {
		description: "Làm tròn số xuống tới số nguyên gần nhất.",
		abstract: "Làm tròn số xuống tới số nguyên gần nhất.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/int-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Số thực mà bạn muốn làm tròn xuống một số nguyên."
		} }
	},
	ISO_CEILING: {
		description: "Trả về một số được làm tròn lên tới số nguyên gần nhất hoặc tới bội số có nghĩa gần nhất. Bất chấp dấu của số, số sẽ được làm tròn lên. Tuy nhiên, nếu đối số số hoặc đối số số có nghĩa là không, thì kết quả là không.",
		abstract: "Trả về một số được làm tròn lên tới số nguyên gần nhất hoặc tới bội số có nghĩa gần nhất. Bất chấp dấu của số, số sẽ được làm tròn lên. Tuy nhiên, nếu đối số số hoặc đối số số có nghĩa là không, thì kết quả là không.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/vi-vn/excel/functions/iso-ceiling-function"
		}],
		functionParameter: {
			number: {
				name: "số",
				detail: "Giá trị mà bạn muốn làm tròn."
			},
			significance: {
				name: "bội số",
				detail: "Bội số mà bạn muốn làm tròn đến."
			}
		}
	},
	LCM: {
		description: "Trả về bội số chung ít nhất của các số nguyên.",
		abstract: "Trả về bội số chung ít nhất của các số nguyên.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/lcm-function"
		}],
		functionParameter: {
			number1: {
				name: "số1",
				detail: "Giá trị hoặc dải ô đầu tiên được sử dụng để tính toán."
			},
			number2: {
				name: "số2",
				detail: "Các giá trị hoặc phạm vi bổ sung để sử dụng cho việc tính toán."
			}
		}
	},
	LN: {
		description: "Trả về lô-ga-rit tự nhiên của một số.",
		abstract: "Trả về lô-ga-rit tự nhiên của một số.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/ln-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Số thực dương mà bạn muốn tính lô-ga-rít tự nhiên của nó."
		} }
	},
	LOG: {
		description: "Trả về lô-ga-rit của một số tới một cơ số do bạn chỉ định.",
		abstract: "Trả về lô-ga-rit của một số tới một cơ số do bạn chỉ định.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/log-function"
		}],
		functionParameter: {
			number: {
				name: "số",
				detail: "Số thực dương mà bạn muốn tính lô-ga-rít của nó."
			},
			base: {
				name: "Cơ số",
				detail: "Cơ số của lô-ga-rit. Nếu cơ số được bỏ qua, thì nó được giả định là 10."
			}
		}
	},
	LOG10: {
		description: "Trả về lô-ga-rit cơ số 10 của một số.",
		abstract: "Trả về lô-ga-rit cơ số 10 của một số.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/log10-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Số thực dương mà bạn muốn tính lô-ga-rít cơ số 10 của nó."
		} }
	},
	MDETERM: {
		description: "Trả về định thức ma trận của một mảng.",
		abstract: "Trả về định thức ma trận của một mảng.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/mdeterm-function"
		}],
		functionParameter: { array: {
			name: "mảng",
			detail: "Một mảng số với số hàng và số cột bằng nhau."
		} }
	},
	MINVERSE: {
		description: "Trả về ma trận nghịch đảo của một mảng",
		abstract: "Trả về ma trận nghịch đảo của một mảng",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/minverse-function"
		}],
		functionParameter: { array: {
			name: "mảng",
			detail: "Một mảng số với số hàng và số cột bằng nhau."
		} }
	},
	MMULT: {
		description: "Trả về tích ma trận của hai mảng",
		abstract: "Trả về tích ma trận của hai mảng",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/mmult-function"
		}],
		functionParameter: {
			array1: {
				name: "mảng1",
				detail: "Những mảng mà bạn muốn nhân."
			},
			array2: {
				name: "mảng2",
				detail: "Những mảng mà bạn muốn nhân."
			}
		}
	},
	MOD: {
		description: "Trả về số dư sau khi chia một số cho ước số. Kết quả có cùng dấu với ước số.",
		abstract: "Trả về số dư sau khi chia một số cho ước số.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/mod-function"
		}],
		functionParameter: {
			number: {
				name: "số",
				detail: "Số mà bạn muốn tìm số dư."
			},
			divisor: {
				name: "số chia",
				detail: "Số mà bạn muốn chia số cho nó."
			}
		}
	},
	MROUND: {
		description: "trả về một số được làm tròn đến bội số mong muốn.",
		abstract: "trả về một số được làm tròn đến bội số mong muốn.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/mround-function"
		}],
		functionParameter: {
			number: {
				name: "số",
				detail: "Giá trị cần làm tròn."
			},
			multiple: {
				name: "bội số",
				detail: "Số mà bạn muốn làm tròn số tới bội số của nó."
			}
		}
	},
	MULTINOMIAL: {
		description: "Trả về đa thức của một tập hợp số",
		abstract: "Trả về đa thức của một tập hợp số",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/multinomial-function"
		}],
		functionParameter: {
			number1: {
				name: "số1",
				detail: "Giá trị hoặc dải ô đầu tiên được sử dụng để tính toán."
			},
			number2: {
				name: "số2",
				detail: "Các giá trị hoặc phạm vi bổ sung để sử dụng cho việc tính toán."
			}
		}
	},
	MUNIT: {
		description: "Trả về ma trận đơn vị cho chiều đã xác định.",
		abstract: "Trả về ma trận đơn vị cho chiều đã xác định.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/munit-function"
		}],
		functionParameter: { dimension: {
			name: "kích thước",
			detail: "Chiều là một số nguyên định rõ chiều của ma trận đơn vị mà bạn muốn trả về. Hàm trả về một mảng. Chiều phải lớn hơn 0."
		} }
	},
	ODD: {
		description: "Trả về số được làm tròn lên tới số nguyên lẻ gần nhất.",
		abstract: "Trả về số được làm tròn lên tới số nguyên lẻ gần nhất.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/odd-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Giá trị cần làm tròn."
		} }
	},
	PI: {
		description: "Trả về giá trị của pi",
		abstract: "Trả về giá trị của pi",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/pi-function"
		}],
		functionParameter: {}
	},
	POWER: {
		description: "Trả về kết quả của một số được nâng theo một lũy thừa.",
		abstract: "Trả về kết quả của một số được nâng theo một lũy thừa.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/power-function"
		}],
		functionParameter: {
			number: {
				name: "số",
				detail: "Số cơ sở. Nó có thể là bất kỳ số thực nào."
			},
			power: {
				name: "năng",
				detail: "Hàm mũ mà bạn muốn nâng số cơ sở lên theo lũy thừa đó."
			}
		}
	},
	PRODUCT: {
		description: "Nhân tất cả các đối số đã cho với nhau và trả về tích của chúng.",
		abstract: "Nhân các tham số của nó",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/product-function"
		}],
		functionParameter: {
			number1: {
				name: "số 1",
				detail: "Số hoặc phạm vi thứ nhất mà bạn muốn nhân."
			},
			number2: {
				name: "số 2",
				detail: "Các số hoặc phạm vi bổ sung mà bạn muốn nhân, tối đa 255 đối số."
			}
		}
	},
	QUOTIENT: {
		description: "Trả về phần nguyên của một phép chia.",
		abstract: "Trả về phần nguyên của một phép chia.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/quotient-function"
		}],
		functionParameter: {
			numerator: {
				name: "tử số",
				detail: "Số bị chia."
			},
			denominator: {
				name: "mẫu số",
				detail: "Số chia."
			}
		}
	},
	RADIANS: {
		description: "Chuyển đổi độ thành radian.",
		abstract: "Chuyển đổi độ thành radian.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/radians-function"
		}],
		functionParameter: { angle: {
			name: "góc",
			detail: "Góc tính bằng độ mà bạn muốn chuyển đổi."
		} }
	},
	RAND: {
		description: "Trả về một số ngẫu nhiên trong khoảng từ 0 đến 1",
		abstract: "Trả về một số ngẫu nhiên trong khoảng từ 0 đến 1",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/rand-function"
		}],
		functionParameter: {}
	},
	RANDARRAY: {
		description: "Hàm RANDARRAY trả về một mảng các số ngẫu nhiên trong khoảng từ 0 đến 1. Tuy nhiên, bạn có thể chỉ định số hàng và cột cần điền, giá trị tối thiểu và tối đa cũng như trả về số nguyên hay giá trị thập phân.",
		abstract: "Hàm RANDARRAY trả về một mảng các số ngẫu nhiên trong khoảng từ 0 đến 1.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/randarray-function"
		}],
		functionParameter: {
			rows: {
				name: "hàng",
				detail: "Số hàng được trả về"
			},
			columns: {
				name: "cột",
				detail: "Số lượng cột được trả về"
			},
			min: {
				name: "giá trị tối thiểu",
				detail: "Số lượng tối thiểu bạn muốn được trả lại"
			},
			max: {
				name: "giá trị tối đa",
				detail: "Số lượng tối đa bạn muốn được trả về"
			},
			wholeNumber: {
				name: "số nguyên",
				detail: "Trả về một số nguyên hoặc một giá trị thập phân"
			}
		}
	},
	RANDBETWEEN: {
		description: "Trả về một số nguyên ngẫu nhiên nằm giữa các số do bạn chỉ định.",
		abstract: "Trả về một số nguyên ngẫu nhiên nằm giữa các số do bạn chỉ định.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/randbetween-function"
		}],
		functionParameter: {
			bottom: {
				name: "giá trị tối thiểu",
				detail: "Số nguyên nhỏ nhất mà sẽ trả về."
			},
			top: {
				name: "giá trị tối đa",
				detail: "Số nguyên lớn nhất mà sẽ trả về."
			}
		}
	},
	ROMAN: {
		description: "Chuyển đổi số Ả-rập thành số La Mã, dạng văn bản.",
		abstract: "Chuyển đổi số Ả-rập thành số La Mã, dạng văn bản.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/roman-function"
		}],
		functionParameter: {
			number: {
				name: "số",
				detail: "Số Ả-rập mà bạn muốn chuyển đổi."
			},
			form: {
				name: "hình thức",
				detail: "Một số xác định kiểu chữ số La Mã bạn muốn. Kiểu chữ số La Mã bao gồm từ kiểu Cổ điển đến kiểu Giản thể, trở nên ngắn gọn hơn khi giá trị của biểu mẫu tăng lên."
			}
		}
	},
	ROUND: {
		description: "làm tròn một số tới một số chữ số đã xác định.",
		abstract: "làm tròn một số tới một số chữ số đã xác định.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/round-function"
		}],
		functionParameter: {
			number: {
				name: "số",
				detail: "Số mà bạn muốn làm tròn."
			},
			numDigits: {
				name: "số chữ số",
				detail: "Số chữ số mà bạn muốn làm tròn số tới đó."
			}
		}
	},
	ROUNDBANK: {
		description: "Làm tròn một số theo cách làm tròn của ngân hàng.",
		abstract: "Làm tròn một số theo cách làm tròn của ngân hàng.",
		links: [{
			title: "Hướng dẫn",
			url: ""
		}],
		functionParameter: {
			number: {
				name: "số",
				detail: "Số mà bạn muốn làm tròn theo cách làm tròn của ngân hàng."
			},
			numDigits: {
				name: "số chữ số",
				detail: "Số chữ số mà bạn muốn làm tròn theo cách làm tròn của ngân hàng."
			}
		}
	},
	ROUNDDOWN: {
		description: "Làm tròn số xuống, tiến tới không.",
		abstract: "Làm tròn số xuống, tiến tới không.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/rounddown-function"
		}],
		functionParameter: {
			number: {
				name: "số",
				detail: "Số mà bạn muốn làm tròn."
			},
			numDigits: {
				name: "số chữ số",
				detail: "Số chữ số mà bạn muốn làm tròn số tới đó."
			}
		}
	},
	ROUNDUP: {
		description: "Làm tròn một số lên, ra xa số 0 (không).",
		abstract: "Làm tròn một số lên, ra xa số 0 (không).",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/roundup-function"
		}],
		functionParameter: {
			number: {
				name: "số",
				detail: "Số mà bạn muốn làm tròn."
			},
			numDigits: {
				name: "số chữ số",
				detail: "Số chữ số mà bạn muốn làm tròn số tới đó."
			}
		}
	},
	SEC: {
		description: "Trả về sec của một góc.",
		abstract: "Trả về sec của một góc.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/sec-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Đối số number là góc tính bằng radian mà bạn muốn tìm sec cho nó."
		} }
	},
	SECH: {
		description: "Trả về sec hyperbolic của một góc.",
		abstract: "Trả về sec hyperbolic của một góc.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/sech-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Đối số number là góc tính bằng radian mà bạn muốn tìm sec hyperbolic cho nó."
		} }
	},
	SERIESSUM: {
		description: "Trả về tổng của một chuỗi lũy thừa dựa trên công thức.",
		abstract: "Trả về tổng của một chuỗi lũy thừa dựa trên công thức.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/seriessum-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Giá trị đầu vào cho chuỗi lũy thừa."
			},
			n: {
				name: "n",
				detail: "Lũy thừa ban đầu bạn muốn tăng x lên."
			},
			m: {
				name: "m",
				detail: "Số bước lũy thừa sẽ tăng cho mỗi toán hạng trong chuỗi."
			},
			coefficients: {
				name: "hệ số",
				detail: "Bộ hệ số mà mỗi lũy thừa liên tiếp của x được nhân với nó."
			}
		}
	},
	SEQUENCE: {
		description: "Hàm SEQUENCE cho phép bạn tạo một danh sách các số liên tiếp trong một mảng, chẳng hạn như 1, 2, 3, 4.",
		abstract: "Hàm SEQUENCE cho phép bạn tạo một danh sách các số liên tiếp trong một mảng, chẳng hạn như 1, 2, 3, 4.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/sequence-function"
		}],
		functionParameter: {
			rows: {
				name: "hàng",
				detail: "Số hàng cần trả về."
			},
			columns: {
				name: "cột",
				detail: "Số cột cần trả về."
			},
			start: {
				name: "bắt đầu",
				detail: "Số đầu tiên trong trình tự."
			},
			step: {
				name: "khoảng cách",
				detail: "Số lượng cần tăng cho mỗi giá trị tiếp theo trong mảng."
			}
		}
	},
	SIGN: {
		description: "Xác định dấu của một số.",
		abstract: "Xác định dấu của một số.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/sign-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Bất kỳ số thực nào."
		} }
	},
	SIN: {
		description: "Trả về sin của một góc đã cho.",
		abstract: "Trả về sin của một góc đã cho.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/sin-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Góc tính bằng radian mà bạn muốn tìm sin cho góc đó."
		} }
	},
	SINH: {
		description: "Trả về sin hyperbolic của một số.",
		abstract: "Trả về sin hyperbolic của một số.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/sinh-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Bất kỳ số thực nào."
		} }
	},
	SQRT: {
		description: "Trả về căn bậc hai của số dương.",
		abstract: "Trả về căn bậc hai của số dương.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/sqrt-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Số mà bạn muốn tìm căn bậc hai của nó."
		} }
	},
	SQRTPI: {
		description: "Trả về căn bậc hai của (số * pi).",
		abstract: "Trả về căn bậc hai của (số * pi).",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/sqrtpi-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Số để nhân với số pi."
		} }
	},
	SUBTOTAL: {
		description: "Trả về tổng phụ trong một danh sách hoặc cơ sở dữ liệu.",
		abstract: "Trả về tổng phụ trong một danh sách hoặc cơ sở dữ liệu.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/subtotal-function"
		}],
		functionParameter: {
			functionNum: {
				name: "hàm số seri",
				detail: "Số 1-11 hay 101-111 chỉ định hàm sử dụng cho tổng phụ. 1-11 bao gồm những hàng ẩn bằng cách thủ công, còn 101-111 loại trừ chúng ra; những ô được lọc ra sẽ luôn được loại trừ."
			},
			ref1: {
				name: "Trích dẫn 1",
				detail: "Phạm vi hoặc tham chiếu được đặt tên đầu tiên mà bạn muốn tính tổng phụ cho nó."
			},
			ref2: {
				name: "Trích dẫn 2",
				detail: "Phạm vi hoặc chuỗi được đặt tên từ 2 đến 254 mà bạn muốn tính tổng phụ cho nó."
			}
		}
	},
	SUM: {
		description: "Thêm các giá trị đơn lẻ, tham chiếu ô, phạm vi hoặc kết hợp cả ba.",
		abstract: "Tìm tổng các tham số",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/sum-function"
		}],
		functionParameter: {
			number1: {
				name: "số 1",
				detail: "Số đầu tiên bạn muốn thêm vào. Số đó có thể là 4, tham chiếu ô như B6, hoặc ô phạm vi như B2:B8."
			},
			number2: {
				name: "số 2",
				detail: "Đây là số thứ hai mà bạn muốn cộng. Bạn có thể chỉ định tối đa 255 số bằng cách này."
			}
		}
	},
	SUMIF: {
		description: "để tính tổng các giá trị trong một phạm vi đáp ứng tiêu chí mà bạn xác định. ",
		abstract: "để tính tổng các giá trị trong một phạm vi đáp ứng tiêu chí mà bạn xác định. ",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/sumif-function"
		}],
		functionParameter: {
			range: {
				name: "phạm vi",
				detail: "Phạm vi ô bạn muốn được đánh giá theo tiêu chí."
			},
			criteria: {
				name: "tiêu chuẩn",
				detail: "Tiêu chí ở dạng số, biểu thức, tham chiếu ô, văn bản hoặc hàm xác định sẽ cộng các ô nào. Ký tự đại diện có thể được bao gồm - dấu chấm hỏi (?) để khớp với bất kỳ ký tự đơn nào, dấu sao (*) để khớp với bất kỳ chuỗi ký tự nào. Nếu bạn muốn tìm một dấu chấm hỏi hay dấu sao thực sự, hãy gõ dấu ngã (~) trước ký tự."
			},
			sumRange: {
				name: "phạm vi tổng hợp",
				detail: "Các ô thực tế để cộng nếu bạn muốn cộng các ô không phải là các ô đã xác định trong đối số range. Nếu đối số sum_range bị bỏ qua, Excel cộng các ô được xác định trong đối số range (chính các ô đã được áp dụng tiêu chí)."
			}
		}
	},
	SUMIFS: {
		description: "cộng tất cả các đối số của nó mà đáp ứng nhiều tiêu chí.",
		abstract: "cộng tất cả các đối số của nó mà đáp ứng nhiều tiêu chí.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/sumifs-function"
		}],
		functionParameter: {
			sumRange: {
				name: "phạm vi tổng hợp",
				detail: "Phạm vi ô cần tính tổng."
			},
			criteriaRange1: {
				name: "Phạm vi điều kiện 1",
				detail: "Khu vực được thử nghiệm theo điều kiện 1. Phạm vi Tiêu chí 1 và Tiêu chí 1 đặt các cặp tìm kiếm được sử dụng để tìm kiếm một khu vực theo tiêu chí cụ thể. Khi một mục được tìm thấy trong phạm vi, tổng các giá trị tương ứng trong phạm vi tổng hợp sẽ được tính toán."
			},
			criteria1: {
				name: "điều kiện 1",
				detail: "Xác định điều kiện để tính tổng các ô trong phạm vi điều kiện 1. Ví dụ: bạn có thể nhập tiêu chí là 32, \">32\", B4, \"táo\" hoặc \"32\"."
			},
			criteriaRange2: {
				name: "Phạm vi điều kiện 2",
				detail: "Các trường bổ sung, có thể nhập tối đa 127 trường."
			},
			criteria2: {
				name: "điều kiện 2",
				detail: "Điều kiện liên kết bổ sung, có thể nhập tối đa 127 điều kiện."
			}
		}
	},
	SUMPRODUCT: {
		description: "trả về tổng tích của các dải ô hoặc mảng tương ứng.",
		abstract: "trả về tổng tích của các dải ô hoặc mảng tương ứng.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/sumproduct-function"
		}],
		functionParameter: {
			array1: {
				name: "mảng",
				detail: "Đối số mảng đầu tiên mà bạn muốn nhân các thành phần của nó rồi cộng tổng."
			},
			array2: {
				name: "mảng",
				detail: "Các đối số mảng từ 2 đến 255 mà bạn muốn nhân các thành phần của nó rồi cộng tổng."
			}
		}
	},
	SUMSQ: {
		description: "Trả về tổng của bình phương của các đối số.",
		abstract: "Trả về tổng của bình phương của các đối số.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/sumsq-function"
		}],
		functionParameter: {
			number1: {
				name: "số 1",
				detail: "1 đến 255 đối số mà bạn muốn tính tổng của bình phương cho chúng. "
			},
			number2: {
				name: "số 2",
				detail: "1 đến 255 đối số mà bạn muốn tính tổng của bình phương cho chúng. "
			}
		}
	},
	SUMX2MY2: {
		description: "Trả về tổng của hiệu các bình phương của các giá trị tương ứng trong hai mảng.",
		abstract: "Trả về tổng của hiệu các bình phương của các giá trị tương ứng trong hai mảng.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/sumx2my2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "mảng 1",
				detail: "Mảng hoặc phạm vi đầu tiên chứa các giá trị."
			},
			arrayY: {
				name: "mảng 2",
				detail: "Mảng hoặc phạm vi thứ hai chứa các giá trị."
			}
		}
	},
	SUMX2PY2: {
		description: "Trả về tổng của tổng các bình phương của các giá trị tương ứng trong hai mảng.",
		abstract: "Trả về tổng của tổng các bình phương của các giá trị tương ứng trong hai mảng.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/sumx2py2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "mảng 1",
				detail: "Mảng hoặc phạm vi đầu tiên chứa các giá trị."
			},
			arrayY: {
				name: "mảng 2",
				detail: "Mảng hoặc phạm vi thứ hai chứa các giá trị."
			}
		}
	},
	SUMXMY2: {
		description: "Trả về tổng của các bình phương của hiệu của các giá trị tương ứng trong hai mảng.",
		abstract: "Trả về tổng của các bình phương của hiệu của các giá trị tương ứng trong hai mảng.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/sumxmy2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "mảng 1",
				detail: "Mảng hoặc phạm vi đầu tiên chứa các giá trị."
			},
			arrayY: {
				name: "mảng 2",
				detail: "Mảng hoặc phạm vi thứ hai chứa các giá trị."
			}
		}
	},
	TAN: {
		description: "Trả về tang của góc đã cho.",
		abstract: "Trả về tang của góc đã cho.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/tan-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Góc tính bằng radian mà bạn muốn tính tang của góc đó."
		} }
	},
	TANH: {
		description: "Trả về tang hyperbolic của một số.",
		abstract: "Trả về tang hyperbolic của một số.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/tanh-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Bất kỳ số thực nào."
		} }
	},
	TRUNC: {
		description: "Làm tròn một số thành số nguyên bằng cách loại bỏ phần thập phân của nó.",
		abstract: "Làm tròn một số thành số nguyên bằng cách loại bỏ phần thập phân của nó.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/trunc-function"
		}],
		functionParameter: {
			number: {
				name: "số",
				detail: "Số cần làm tròn."
			},
			numDigits: {
				name: "số chữ số",
				detail: "Là một số xác định độ chính xác của việc cắt bớt. Giá trị mặc định của num_digits là 0 (không)."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/statistical/vi-VN.ts
const locale$4 = {
	AVEDEV: {
		description: "Trả về giá trị trung bình của độ lệch tuyệt đối của các điểm dữ liệu từ giá trị trung bình của chúng.",
		abstract: "Trả về giá trị trung bình của độ lệch tuyệt đối của các điểm dữ liệu từ giá trị trung bình của chúng.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/avedev-function"
		}],
		functionParameter: {
			number1: {
				name: "số 1",
				detail: "Số đầu tiên, tham chiếu ô hoặc phạm vi cần tính giá trị trung bình."
			},
			number2: {
				name: "số 2",
				detail: "Các số khác, tham chiếu ô hoặc phạm vi cần tính giá trị trung bình, tối đa là 255."
			}
		}
	},
	AVERAGE: {
		description: "Trả về giá trị trung bình (trung bình cộng) của các tham số.",
		abstract: "Trả về giá trị trung bình của các tham số.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/average-function"
		}],
		functionParameter: {
			number1: {
				name: "số 1",
				detail: "Số đầu tiên, tham chiếu ô hoặc phạm vi cần tính giá trị trung bình."
			},
			number2: {
				name: "số 2",
				detail: "Các số khác, tham chiếu ô hoặc phạm vi cần tính giá trị trung bình, tối đa là 255."
			}
		}
	},
	AVERAGE_WEIGHTED: {
		description: "Hàm AVERAGE.WEIGHTED tìm trung bình cộng gia quyền của một tập giá trị khi biết trước các giá trị và trọng số tương ứng.",
		abstract: "Hàm AVERAGE.WEIGHTED tìm trung bình cộng gia quyền của một tập giá trị khi biết trước các giá trị và trọng số tương ứng.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.google.com/docs/answer/9084098?hl=vi"
		}],
		functionParameter: {
			values: {
				name: "giá_trị",
				detail: "Giá trị cần tính trung bình. Có thể tham chiếu một dải ô hoặc có thể chứa chính các giá trị đó."
			},
			weights: {
				name: "trọng_số",
				detail: "Danh sách trọng số tương ứng để áp dụng. Có thể tham chiếu một dải ô hoặc có thể chứa chính các trọng số đó. Trọng số không được âm nhưng có thể là số 0. Phải có ít nhất một trọng số là số dương. Nếu dùng dải ô thì dải ô đó phải có cùng số hàng và cột giống với phạm vi của các giá trị."
			},
			additionalValues: {
				name: "giá_trị_bổ_sung",
				detail: "Các giá trị bổ sung cần tính trung bình. Không bắt buộc phải có các giá trị bổ sung."
			},
			additionalWeights: {
				name: "trọng_số_bổ_sung",
				detail: "Các trọng số bổ sung để áp dụng. Không bắt buộc phải có các trọng số bổ sung, nhưng mỗi giá_trị_bổ_sung phải đi kèm với đúng một trọng_số_bổ_sung."
			}
		}
	},
	AVERAGEA: {
		description: "Trả về giá trị trung bình của các tham số, bao gồm số, văn bản và giá trị logic.",
		abstract: "Trả về giá trị trung bình của các tham số, bao gồm số, văn bản và giá trị logic.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/averagea-function"
		}],
		functionParameter: {
			value1: {
				name: "Giá trị 1",
				detail: "Giá trị đầu tiên, tham chiếu ô hoặc phạm vi cần tính giá trị trung bình."
			},
			value2: {
				name: "Giá trị 2",
				detail: "Các giá trị khác, tham chiếu ô hoặc phạm vi cần tính giá trị trung bình, tối đa là 255."
			}
		}
	},
	AVERAGEIF: {
		description: "Trả về giá trị trung bình (trung bình cộng) của các ô trong phạm vi đáp ứng một tiêu chí nhất định.",
		abstract: "Trả về giá trị trung bình của các ô trong phạm vi đáp ứng một tiêu chí nhất định.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/averageif-function"
		}],
		functionParameter: {
			range: {
				name: "Phạm vi",
				detail: "Một hoặc nhiều ô cần tính giá trị trung bình, có thể chứa số hoặc tham chiếu."
			},
			criteria: {
				name: "Tiêu chí",
				detail: "Tiêu chí dưới dạng số, biểu thức, tham chiếu ô hoặc văn bản để xác định các ô cần tính giá trị trung bình. Ví dụ: 32, \">32\", \"táo\" hoặc B4."
			},
			averageRange: {
				name: "Phạm vi tính trung bình",
				detail: "Các ô thực sự cần tính giá trị trung bình. Nếu bị bỏ qua, sẽ sử dụng phạm vi."
			}
		}
	},
	AVERAGEIFS: {
		description: "Trả về giá trị trung bình (trung bình cộng) của các ô đáp ứng nhiều tiêu chí.",
		abstract: "Trả về giá trị trung bình của các ô đáp ứng nhiều tiêu chí.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/averageifs-function"
		}],
		functionParameter: {
			averageRange: {
				name: "Phạm vi tính trung bình",
				detail: "Một hoặc nhiều ô cần tính giá trị trung bình, có thể chứa số hoặc tham chiếu."
			},
			criteriaRange1: {
				name: "Phạm vi tiêu chí 1",
				detail: "Phạm vi đầu tiên được sử dụng để xác định các ô cần tính giá trị trung bình."
			},
			criteria1: {
				name: "Tiêu chí 1",
				detail: "Tiêu chí xác định các ô cần tính giá trị trung bình. Ví dụ: 32, \">32\", \"táo\" hoặc B4."
			},
			criteriaRange2: {
				name: "Phạm vi tiêu chí 2",
				detail: "Các phạm vi bổ sung, tối đa 127."
			},
			criteria2: {
				name: "Tiêu chí 2",
				detail: "Các tiêu chí bổ sung liên quan, tối đa 127."
			}
		}
	},
	BETA_DIST: {
		description: "Trả về hàm phân phối tích lũy beta",
		abstract: "Trả về hàm phân phối tích lũy beta",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/beta-dist-function"
		}],
		functionParameter: {
			x: {
				name: "số",
				detail: "Giá trị được sử dụng để tính toán hàm của nó, giữa giá trị giới hạn dưới và giá trị giới hạn trên."
			},
			alpha: {
				name: "alpha",
				detail: "Tham số đầu tiên của phân phối."
			},
			beta: {
				name: "beta",
				detail: "Tham số thứ hai của phân phối."
			},
			cumulative: {
				name: "tích lũy",
				detail: "Một giá trị lô-gic quyết định dạng thức của hàm. Nếu tích lũy là TRUE, hàm BETA.DIST trả về hàm phân bố tích lũy; nếu FALSE, nó trả về hàm mật độ xác suất."
			},
			A: {
				name: "giới hạn dưới",
				detail: "Giới hạn dưới của hàm, giá trị mặc định là 0."
			},
			B: {
				name: "giới hạn trên",
				detail: "Giới hạn trên của hàm, giá trị mặc định là 1."
			}
		}
	},
	BETA_INV: {
		description: "Trả về hàm nghịch đảo của phân phối tích lũy beta cụ thể",
		abstract: "Trả về hàm nghịch đảo của phân phối tích lũy beta cụ thể",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/beta-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "xác suất",
				detail: "Xác suất gắn với phân bố beta."
			},
			alpha: {
				name: "alpha",
				detail: "Tham số đầu tiên của phân phối."
			},
			beta: {
				name: "beta",
				detail: "Tham số thứ hai của phân phối."
			},
			A: {
				name: "giới hạn dưới",
				detail: "Giới hạn dưới của hàm, giá trị mặc định là 0."
			},
			B: {
				name: "giới hạn trên",
				detail: "Giới hạn trên của hàm, giá trị mặc định là 1."
			}
		}
	},
	BINOM_DIST: {
		description: "Trả về xác suất phân phối nhị thức đơn nguyên",
		abstract: "Trả về xác suất phân phối nhị thức đơn nguyên",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/binom-dist-function"
		}],
		functionParameter: {
			numberS: {
				name: "số lần thành công",
				detail: "Số lần thành công trong các phép thử."
			},
			trials: {
				name: "số phép thử",
				detail: "Số phép thử độc lập."
			},
			probabilityS: {
				name: "xác suất thành công",
				detail: "Xác suất thành công của mỗi phép thử."
			},
			cumulative: {
				name: "tích lũy",
				detail: "Một giá trị lô-gic quyết định dạng thức của hàm. Nếu tích lũy là TRUE, hàm BINOM.DIST trả về hàm phân bố tích lũy; nếu FALSE, nó trả về hàm mật độ xác suất."
			}
		}
	},
	BINOM_DIST_RANGE: {
		description: "Trả về xác suất kết quả thử nghiệm sử dụng phân phối nhị thức",
		abstract: "Trả về xác suất kết quả thử nghiệm sử dụng phân phối nhị thức",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/binom-dist-range-function"
		}],
		functionParameter: {
			trials: {
				name: "số phép thử",
				detail: "Số phép thử độc lập."
			},
			probabilityS: {
				name: "xác suất thành công",
				detail: "Xác suất thành công của mỗi phép thử."
			},
			numberS: {
				name: "số lần thành công",
				detail: "Số lần thành công trong các phép thử."
			},
			numberS2: {
				name: "Số lần thành công tối đa",
				detail: "Nếu được cung cấp, trả về xác suất số lần thử thành công nằm trong khoảng từ số lần thành công đến số lần thành công tối đa."
			}
		}
	},
	BINOM_INV: {
		description: "Trả về giá trị nhỏ nhất để phân phối nhị thức tích lũy nhỏ hơn hoặc bằng ngưỡng quyết định",
		abstract: "Trả về giá trị nhỏ nhất để phân phối nhị thức tích lũy nhỏ hơn hoặc bằng ngưỡng quyết định",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/binom-inv-function"
		}],
		functionParameter: {
			trials: {
				name: "số phép thử",
				detail: "Số phép thử Bernoulli."
			},
			probabilityS: {
				name: "xác suất thành công",
				detail: "Xác suất thành công của mỗi phép thử."
			},
			alpha: {
				name: "xác suất mục tiêu",
				detail: "Giá trị tiêu chí."
			}
		}
	},
	CHISQ_DIST: {
		description: "Trả về xác suất của vế trái của phân bố χ2.",
		abstract: "Trả về xác suất của vế trái của phân bố χ2.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/chisq-dist-function"
		}],
		functionParameter: {
			x: {
				name: "số",
				detail: "Giái trị bạn muốn đánh giá phân phối."
			},
			degFreedom: {
				name: "bậc tự do",
				detail: "Số bậc tự do."
			},
			cumulative: {
				name: "tích lũy",
				detail: "Một giá trị lô-gic quyết định dạng thức của hàm. Nếu lũy tích là ĐÚNG thì CHISQ.DIST trả về hàm phân bố lũy tích; nếu SAI, nó trả về hàm mật độ xác suất."
			}
		}
	},
	CHISQ_DIST_RT: {
		description: "Trả về xác suất bên phải của phân bố χ2.",
		abstract: "Trả về xác suất bên phải của phân bố χ2.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/chisq-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "số",
				detail: "Giái trị bạn muốn đánh giá phân phối."
			},
			degFreedom: {
				name: "bậc tự do",
				detail: "Số bậc tự do."
			}
		}
	},
	CHISQ_INV: {
		description: "Trả về hàm nghịch đảo của xác suất ở đuôi trái của phân bố χ2.",
		abstract: "Trả về hàm nghịch đảo của xác suất ở đuôi trái của phân bố χ2.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/chisq-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "xác suất",
				detail: "Xác suất liên quan đến phân phối χ2."
			},
			degFreedom: {
				name: "bậc tự do",
				detail: "Số bậc tự do."
			}
		}
	},
	CHISQ_INV_RT: {
		description: "Trả về hàm nghịch đảo của xác suất ở đuôi bên phải của phân bố χ2.",
		abstract: "Trả về hàm nghịch đảo của xác suất ở đuôi bên phải của phân bố χ2.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/chisq-inv-rt-function"
		}],
		functionParameter: {
			probability: {
				name: "xác suất",
				detail: "Xác suất liên quan đến phân phối χ2."
			},
			degFreedom: {
				name: "bậc tự do",
				detail: "Số bậc tự do."
			}
		}
	},
	CHISQ_TEST: {
		description: "Trả về giá trị kiểm độc lập",
		abstract: "Trả về giá trị kiểm độc lập",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/chisq-test-function"
		}],
		functionParameter: {
			actualRange: {
				name: "phạm vi quan sát",
				detail: "Phạm vi dữ liệu chứa các quan sát để kiểm thử đối với các giá trị dự kiến."
			},
			expectedRange: {
				name: "phạm vi dự kiến",
				detail: "Phạm vi dữ liệu chứa tỷ lệ của phép nhân tổng hàng và tổng cột với tổng cộng."
			}
		}
	},
	CONFIDENCE_NORM: {
		description: "Trả về khoảng tin cậy của trung bình tổng thể, bằng cách dùng phân bố chuẩn hóa.",
		abstract: "Trả về khoảng tin cậy của trung bình tổng thể, bằng cách dùng phân bố chuẩn hóa.",
		links: [{
			title: "Dạy học",
			url: "https://support.microsoft.com/vi-vn/excel/functions/confidence-norm-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "Mức quan trọng được dùng để tính toán mức tin cậy. Mức tin cậy bằng 100*(1 - alpha)%, hay nói cách khác, alpha 0,05 cho biết mức tin cậy 95 phần trăm."
			},
			standardDev: {
				name: "Độ lệch chuẩn tổng",
				detail: "Độ lệch chuẩn tổng thể cho phạm vi dữ liệu và được giả định là đã được xác định."
			},
			size: {
				name: "cỡ mẫu",
				detail: "Cỡ mẫu."
			}
		}
	},
	CONFIDENCE_T: {
		description: "Trả về khoảng tin cậy cho giá trị trung bình của tổng thể (sử dụng phân phối t-student)",
		abstract: "Trả về khoảng tin cậy cho giá trị trung bình của tổng thể (sử dụng phân phối t-student)",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/confidence-t-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "Mức quan trọng được dùng để tính toán mức tin cậy. Mức tin cậy bằng 100*(1 - alpha)%, hay nói cách khác, alpha 0,05 cho biết mức tin cậy 95 phần trăm."
			},
			standardDev: {
				name: "Độ lệch chuẩn tổng",
				detail: "Độ lệch chuẩn tổng thể cho phạm vi dữ liệu và được giả định là đã được xác định."
			},
			size: {
				name: "cỡ mẫu",
				detail: "Cỡ mẫu."
			}
		}
	},
	CORREL: {
		description: "Trả về hệ số tương quan giữa hai tập dữ liệu",
		abstract: "Trả về hệ số tương quan giữa hai tập dữ liệu",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/correl-function"
		}],
		functionParameter: {
			array1: {
				name: "mảng 1",
				detail: "Phạm vi giá trị ô đầu tiên."
			},
			array2: {
				name: "mảng 2",
				detail: "Phạm vi giá trị ô thứ hai."
			}
		}
	},
	COUNT: {
		description: "Đếm số lượng ô chứa số và số lượng trong danh sách đối số.",
		abstract: "Đếm số lượng trong danh sách đối số.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/count-function"
		}],
		functionParameter: {
			value1: {
				name: "giá trị 1",
				detail: "Là giá trị đầu tiên, tham chiếu ô hoặc vùng để đếm số lượng trong đó."
			},
			value2: {
				name: "giá trị 2",
				detail: "Là các giá trị khác, tham chiếu ô hoặc vùng để đếm số lượng, có thể lên tới 255 giá trị."
			}
		}
	},
	COUNTA: {
		description: `Tính toán các ô chứa bất kỳ loại thông tin nào, bao gồm giá trị lỗi và văn bản trống ("")
    Nếu bạn không cần đếm các giá trị logic, văn bản hoặc giá trị lỗi (nói cách khác, bạn chỉ muốn đếm các ô có chứa số), hãy sử dụng hàm COUNT.`,
		abstract: "Tính toán số lượng các giá trị trong danh sách tham số",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/counta-function"
		}],
		functionParameter: {
			value1: {
				name: "Giá trị 1",
				detail: "Giá trị đầu tiên, tham chiếu ô hoặc phạm vi cần tính giá trị trung bình."
			},
			value2: {
				name: "Giá trị 2",
				detail: "Các giá trị khác, tham chiếu ô hoặc phạm vi cần tính giá trị trung bình, tối đa là 255."
			}
		}
	},
	COUNTBLANK: {
		description: "để đếm số ô trống trong phạm vi ô.",
		abstract: "để đếm số ô trống trong phạm vi ô.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/countblank-function"
		}],
		functionParameter: { range: {
			name: "phạm vi",
			detail: "Phạm vi mà từ đó bạn muốn đếm các ô trống."
		} }
	},
	COUNTIF: {
		description: "để đếm số lượng ô đáp ứng một tiêu chí.",
		abstract: "để đếm số lượng ô đáp ứng một tiêu chí.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/use-the-countif-function-in-microsoft-excel"
		}],
		functionParameter: {
			range: {
				name: "phạm vi",
				detail: "Nhóm các ô mà bạn muốn đếm. Phạm vi có thể chứa số, mảng, phạm vi có tên hoặc tham chiếu có chứa số. Các giá trị trống và giá trị văn bản được bỏ qua."
			},
			criteria: {
				name: "tiêu chí",
				detail: "Số, biểu thức, tham chiếu ô hoặc chuỗi văn bản xác định ô nào sẽ được đếm.\nVí dụ: bạn có thể sử dụng một số như 32, một so sánh như \"> 32\", một ô như B4, hoặc một từ như \"táo\"."
			}
		}
	},
	COUNTIFS: {
		description: "áp dụng tiêu chí cho các ô trong nhiều dải ô và đếm số lần đáp ứng tất cả các tiêu chí.",
		abstract: "áp dụng tiêu chí cho các ô trong nhiều dải ô và đếm số lần đáp ứng tất cả các tiêu chí.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/countifs-function"
		}],
		functionParameter: {
			criteriaRange1: {
				name: "phạm vi tiêu chí 1",
				detail: "Phạm vi thứ nhất trong đó cần đánh giá các tiêu chí liên kết."
			},
			criteria1: {
				name: "tiêu chí 1",
				detail: "Tiêu chí dưới dạng một số, biểu thức, tham chiếu ô hoặc văn bản để xác định những ô nào cần đếm. Ví dụ: tiêu chí có thể được biểu thị là 32, \">32\", B4, \"táo\" hoặc \"32\"."
			},
			criteriaRange2: {
				name: "phạm vi tiêu chí 2",
				detail: "Khu vực bổ sung. Có thể nhập tới 127 khu vực."
			},
			criteria2: {
				name: "tiêu chí 2",
				detail: "Điều kiện liên kết bổ sung. Có thể nhập tối đa 127 điều kiện."
			}
		}
	},
	COVARIANCE_P: {
		description: "Trả về hiệp phương sai của tập hợp, trung bình tích của các độ lệnh cho mỗi cặp điểm dữ liệu trong hai tập dữ liệu.",
		abstract: "Trả về hiệp phương sai của tập hợp",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/covariance-p-function"
		}],
		functionParameter: {
			array1: {
				name: "mảng 1",
				detail: "Phạm vi giá trị ô đầu tiên."
			},
			array2: {
				name: "mảng 2",
				detail: "Phạm vi giá trị ô thứ hai."
			}
		}
	},
	COVARIANCE_S: {
		description: "Trả về hiệp phương sai mẫu, trung bình tích của các độ lệnh cho mỗi cặp điểm dữ liệu trong hai tập dữ liệu.",
		abstract: "Trả về hiệp phương sai mẫu",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/covariance-s-function"
		}],
		functionParameter: {
			array1: {
				name: "mảng 1",
				detail: "Phạm vi giá trị ô đầu tiên."
			},
			array2: {
				name: "mảng 2",
				detail: "Phạm vi giá trị ô thứ hai."
			}
		}
	},
	DEVSQ: {
		description: "Trả về tổng độ lệch bình phương",
		abstract: "Trả về tổng độ lệch bình phương",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/devsq-function"
		}],
		functionParameter: {
			number1: {
				name: "số 1",
				detail: "Tham số thứ nhất mà bạn muốn tính tổng bình phương độ lệch."
			},
			number2: {
				name: "số 2",
				detail: "Tham số từ 2 đến 255 mà bạn muốn tính tổng bình phương độ lệch."
			}
		}
	},
	EXPON_DIST: {
		description: "Trả về phân bố hàm mũ.",
		abstract: "Trả về phân bố hàm mũ.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/expon-dist-function"
		}],
		functionParameter: {
			x: {
				name: "số",
				detail: "Giái trị bạn muốn đánh giá phân phối."
			},
			lambda: {
				name: "lambda",
				detail: "Giá trị tham số."
			},
			cumulative: {
				name: "tích lũy",
				detail: "Một giá trị lô-gic quyết định dạng thức của hàm. Nếu lũy tích là ĐÚNG thì EXPON.DIST trả về hàm phân bố lũy tích; nếu SAI, nó trả về hàm mật độ xác suất."
			}
		}
	},
	F_DIST: {
		description: "Trả về phân bố xác suất F.",
		abstract: "Trả về phân bố xác suất F.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/f-dist-function"
		}],
		functionParameter: {
			x: {
				name: "số",
				detail: "Giá trị để đánh giá hàm."
			},
			degFreedom1: {
				name: "bậc tự do ở tử số",
				detail: "Bậc tự do ở tử số."
			},
			degFreedom2: {
				name: "bậc tự do ở mẫu số.",
				detail: "Bậc tự do ở mẫu số."
			},
			cumulative: {
				name: "tích lũy",
				detail: "Một giá trị lô-gic quyết định dạng thức của hàm. Nếu lũy tích là ĐÚNG thì F.DIST trả về hàm phân bố lũy tích; nếu SAI, nó trả về hàm mật độ xác suất."
			}
		}
	},
	F_DIST_RT: {
		description: "Trả về phân bố xác suất F (đuôi bên phải)",
		abstract: "Trả về phân bố xác suất F (đuôi bên phải)",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/f-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "số",
				detail: "Giá trị để đánh giá hàm."
			},
			degFreedom1: {
				name: "bậc tự do ở tử số",
				detail: "Bậc tự do ở tử số."
			},
			degFreedom2: {
				name: "bậc tự do ở mẫu số.",
				detail: "Bậc tự do ở mẫu số."
			}
		}
	},
	F_INV: {
		description: "Trả về giá trị đảo của phân bố xác suất F.",
		abstract: "Trả về giá trị đảo của phân bố xác suất F.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/f-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "xác suất",
				detail: "Xác suất gắn với phân bố lũy tích F."
			},
			degFreedom1: {
				name: "bậc tự do ở tử số",
				detail: "Bậc tự do ở tử số."
			},
			degFreedom2: {
				name: "bậc tự do ở mẫu số.",
				detail: "Bậc tự do ở mẫu số."
			}
		}
	},
	F_INV_RT: {
		description: "Trả về giá trị đảo của phân bố xác suất F (đuôi bên phải).",
		abstract: "Trả về giá trị đảo của phân bố xác suất F (đuôi bên phải).",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/f-inv-rt-function"
		}],
		functionParameter: {
			probability: {
				name: "xác suất",
				detail: "Xác suất gắn với phân bố lũy tích F."
			},
			degFreedom1: {
				name: "bậc tự do ở tử số",
				detail: "Bậc tự do ở tử số."
			},
			degFreedom2: {
				name: "bậc tự do ở mẫu số.",
				detail: "Bậc tự do ở mẫu số."
			}
		}
	},
	F_TEST: {
		description: "Trả về kết quả của kiểm tra F-test",
		abstract: "Trả về kết quả của kiểm tra F-test",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/f-test-function"
		}],
		functionParameter: {
			array1: {
				name: "mảng 1",
				detail: "Mảng thứ nhất của phạm vi dữ liệu."
			},
			array2: {
				name: "mảng 2",
				detail: "Mảng thứ hai của phạm vi dữ liệu."
			}
		}
	},
	FISHER: {
		description: "Trả về phép biến đổi Fisher tại x.",
		abstract: "Trả về phép biến đổi Fisher tại x.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/fisher-function"
		}],
		functionParameter: { x: {
			name: "số",
			detail: "Giá trị số mà bạn muốn biến đổi."
		} }
	},
	FISHERINV: {
		description: "Trả về nghịch đảo của phép biến đổi Fisher. ",
		abstract: "Trả về nghịch đảo của phép biến đổi Fisher. ",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/fisherinv-function"
		}],
		functionParameter: { y: {
			name: "số",
			detail: "Giá trị mà bạn muốn thực hiện nghịch đảo của phép biến đổi."
		} }
	},
	FORECAST: {
		description: "Trả về giá trị xu hướng tuyến tính",
		abstract: "Trả về giá trị xu hướng tuyến tính",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/forecast-and-forecast-linear-functions"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Điểm dữ liệu mà bạn muốn dự đoán một giá trị cho nó."
			},
			knownYs: {
				name: "mảng _y",
				detail: "Mảng phụ thuộc của mảng hoặc phạm vi dữ liệu."
			},
			knownXs: {
				name: "mảng _x",
				detail: "Mảng độc lập của mảng hoặc phạm vi dữ liệu."
			}
		}
	},
	FORECAST_ETS: {
		description: "Bạn luôn có thể yêu cầu chuyên gia trong Cộng đồng Kỹ thuật Excel hoặc nhận hỗ trợ trong Cộng đồng .",
		abstract: "Bạn luôn có thể yêu cầu chuyên gia trong Cộng đồng Kỹ thuật Excel hoặc nhận hỗ trợ trong Cộng đồng .",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/vi-vn/excel/functions/forecast-ets-function"
		}],
		functionParameter: {
			targetDate: {
				name: "Ngày đích",
				detail: "Điểm dữ liệu mà bạn muốn dự đoán giá trị."
			},
			values: {
				name: "Giá trị",
				detail: "Các giá trị lịch sử dùng để dự báo."
			},
			timeline: {
				name: "Dòng thời gian",
				detail: "Phạm vi hoặc mảng độc lập gồm ngày hoặc giờ dạng số với bước không đổi."
			},
			seasonality: {
				name: "Tính thời vụ",
				detail: "Tùy chọn. 1 để tự động phát hiện và 0 để không dùng tính thời vụ."
			},
			dataCompletion: {
				name: "Hoàn thành dữ liệu",
				detail: "Tùy chọn. Dùng 1 để nội suy điểm bị thiếu hoặc 0 để coi chúng là số không."
			},
			aggregation: {
				name: "Tổng hợp",
				detail: "Tùy chọn. Giá trị từ 1 đến 7 chỉ định cách tổng hợp dấu thời gian trùng lặp."
			}
		}
	},
	FORECAST_ETS_CONFINT: {
		description: "Bạn luôn có thể yêu cầu chuyên gia trong Cộng đồng Kỹ thuật Excel hoặc nhận hỗ trợ trong Cộng đồng .",
		abstract: "Bạn luôn có thể yêu cầu chuyên gia trong Cộng đồng Kỹ thuật Excel hoặc nhận hỗ trợ trong Cộng đồng .",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/vi-vn/excel/functions/forecast-ets-confint-function"
		}],
		functionParameter: {
			targetDate: {
				name: "Ngày đích",
				detail: "Điểm dữ liệu mà bạn muốn dự đoán giá trị."
			},
			values: {
				name: "Giá trị",
				detail: "Các giá trị lịch sử dùng để dự báo."
			},
			timeline: {
				name: "Dòng thời gian",
				detail: "Phạm vi hoặc mảng độc lập gồm ngày hoặc giờ dạng số với bước không đổi."
			},
			confidenceLevel: {
				name: "Mức tin cậy",
				detail: "Tùy chọn. Số từ 0 đến 1; mặc định là 0,95."
			},
			seasonality: {
				name: "Tính thời vụ",
				detail: "Tùy chọn. 1 để tự động phát hiện và 0 để không dùng tính thời vụ."
			},
			dataCompletion: {
				name: "Hoàn thành dữ liệu",
				detail: "Tùy chọn. Dùng 1 để nội suy điểm bị thiếu hoặc 0 để coi chúng là số không."
			},
			aggregation: {
				name: "Tổng hợp",
				detail: "Tùy chọn. Giá trị từ 1 đến 7 chỉ định cách tổng hợp dấu thời gian trùng lặp."
			}
		}
	},
	FORECAST_ETS_SEASONALITY: {
		description: "Bạn luôn có thể yêu cầu chuyên gia trong Cộng đồng Kỹ thuật Excel hoặc nhận hỗ trợ trong Cộng đồng .",
		abstract: "Bạn luôn có thể yêu cầu chuyên gia trong Cộng đồng Kỹ thuật Excel hoặc nhận hỗ trợ trong Cộng đồng .",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/vi-vn/excel/functions/forecast-ets-seasonality-function"
		}],
		functionParameter: {
			values: {
				name: "Giá trị",
				detail: "Các giá trị lịch sử dùng để dự báo."
			},
			timeline: {
				name: "Dòng thời gian",
				detail: "Phạm vi hoặc mảng độc lập gồm ngày hoặc giờ dạng số với bước không đổi."
			},
			dataCompletion: {
				name: "Hoàn thành dữ liệu",
				detail: "Tùy chọn. Dùng 1 để nội suy điểm bị thiếu hoặc 0 để coi chúng là số không."
			},
			aggregation: {
				name: "Tổng hợp",
				detail: "Tùy chọn. Giá trị từ 1 đến 7 chỉ định cách tổng hợp dấu thời gian trùng lặp."
			}
		}
	},
	FORECAST_ETS_STAT: {
		description: "Bạn luôn có thể yêu cầu chuyên gia trong Cộng đồng Kỹ thuật Excel hoặc nhận hỗ trợ trong Cộng đồng .",
		abstract: "Bạn luôn có thể yêu cầu chuyên gia trong Cộng đồng Kỹ thuật Excel hoặc nhận hỗ trợ trong Cộng đồng .",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/vi-vn/excel/functions/forecast-ets-stat-function"
		}],
		functionParameter: {
			values: {
				name: "Giá trị",
				detail: "Các giá trị lịch sử dùng để dự báo."
			},
			timeline: {
				name: "Dòng thời gian",
				detail: "Phạm vi hoặc mảng độc lập gồm ngày hoặc giờ dạng số với bước không đổi."
			},
			statisticType: {
				name: "Loại thống kê",
				detail: "Giá trị từ 1 đến 8 chỉ định thống kê dự báo cần trả về."
			},
			seasonality: {
				name: "Tính thời vụ",
				detail: "Tùy chọn. 1 để tự động phát hiện và 0 để không dùng tính thời vụ."
			},
			dataCompletion: {
				name: "Hoàn thành dữ liệu",
				detail: "Tùy chọn. Dùng 1 để nội suy điểm bị thiếu hoặc 0 để coi chúng là số không."
			},
			aggregation: {
				name: "Tổng hợp",
				detail: "Tùy chọn. Giá trị từ 1 đến 7 chỉ định cách tổng hợp dấu thời gian trùng lặp."
			}
		}
	},
	FORECAST_LINEAR: {
		description: "Trả về giá trị tương lai dựa trên giá trị hiện tại",
		abstract: "Trả về giá trị tương lai dựa trên giá trị hiện tại",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/forecast-and-forecast-linear-functions"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Điểm dữ liệu mà bạn muốn dự đoán một giá trị cho nó."
			},
			knownYs: {
				name: "mảng _y",
				detail: "Mảng phụ thuộc của mảng hoặc phạm vi dữ liệu."
			},
			knownXs: {
				name: "mảng _x",
				detail: "Mảng độc lập của mảng hoặc phạm vi dữ liệu."
			}
		}
	},
	FREQUENCY: {
		description: "Trả về phân bố tần suất dưới dạng một mảng dọc",
		abstract: "Trả về phân bố tần suất dưới dạng một mảng dọc",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/frequency-function"
		}],
		functionParameter: {
			dataArray: {
				name: "dữ liệuMảng",
				detail: "Một mảng hoặc tham chiếu tới một tập giá trị mà bạn muốn đếm tần suất của nó. Nếu data_array không chứa giá trị, thì hàm FREQUENCY trả về mảng các số không."
			},
			binsArray: {
				name: "mảng ngắt quãng",
				detail: "Mảng hoặc tham chiếu tới các khoảng mà bạn muốn nhóm các giá trị trong data_array vào trong đó. Nếu bins_array không chứa giá trị, thì hàm FREQUENCY trả về số thành phần trong data_array."
			}
		}
	},
	GAMMA: {
		description: "Trả về giá trị hàm gamma.",
		abstract: "Trả về giá trị hàm gamma.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/gamma-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Giá trị đầu vào của hàm gamma."
		} }
	},
	GAMMA_DIST: {
		description: "Trả về phân bố gamma.",
		abstract: "Trả về phân bố gamma.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/gamma-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Giá trị mà bạn muốn có phân bố của nó."
			},
			alpha: {
				name: "alpha",
				detail: "Tham số đầu tiên của phân phối."
			},
			beta: {
				name: "beta",
				detail: "Tham số thứ hai của phân phối."
			},
			cumulative: {
				name: "tích lũy",
				detail: "Một giá trị lô-gic quyết định dạng thức của hàm. Nếu tích lũy là TRUE, hàm GAMMA.DIST trả về hàm phân bố tích lũy; nếu FALSE, nó trả về hàm mật độ xác suất."
			}
		}
	},
	GAMMA_INV: {
		description: "Trả về giá trị đảo của phân bố lũy tích gamma.",
		abstract: "Trả về giá trị đảo của phân bố lũy tích gamma.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/gamma-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "xác suất",
				detail: "Xác suất gắn với phân bố gamma."
			},
			alpha: {
				name: "alpha",
				detail: "Tham số đầu tiên của phân phối."
			},
			beta: {
				name: "beta",
				detail: "Tham số thứ hai của phân phối."
			}
		}
	},
	GAMMALN: {
		description: "Trả về lô-ga-rít tự nhiên của hàm gamma, Γ(x).",
		abstract: "Trả về lô-ga-rít tự nhiên của hàm gamma, Γ(x).",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/gammaln-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Giá trị mà bạn muốn tính toán GAMMALN."
		} }
	},
	GAMMALN_PRECISE: {
		description: "Trả về lô-ga-rít tự nhiên của hàm gamma, Γ(x).",
		abstract: "Trả về lô-ga-rít tự nhiên của hàm gamma, Γ(x).",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/gammaln-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Giá trị mà bạn muốn tính toán GAMMALN.PRECISE."
		} }
	},
	GAUSS: {
		description: "Trả về ít hơn 0.5 so với phân phối tích lũy chuẩn",
		abstract: "Trả về ít hơn 0.5 so với phân phối tích lũy chuẩn",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/gauss-function"
		}],
		functionParameter: { z: {
			name: "z",
			detail: "Giá trị mà bạn muốn có phân bố của nó."
		} }
	},
	GEOMEAN: {
		description: "Trả về giá trị trung bình hình học",
		abstract: "Trả về giá trị trung bình hình học",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/geomean-function"
		}],
		functionParameter: {
			number1: {
				name: "số 1",
				detail: "Số đầu tiên, tham chiếu ô hoặc phạm vi ô để tính giá trị trung bình hình học."
			},
			number2: {
				name: "số 2",
				detail: "Tối đa 255 số bổ sung, tham chiếu ô hoặc phạm vi ô để tính giá trị trung bình hình học."
			}
		}
	},
	GROWTH: {
		description: "Trả về giá trị xu hướng hàm mũ",
		abstract: "Trả về giá trị xu hướng hàm mũ",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/growth-function"
		}],
		functionParameter: {
			knownYs: {
				name: "dữ liệu đã biết_y",
				detail: "Tập giá trị y mà bạn đã biết trong quan hệ y = b*m^x."
			},
			knownXs: {
				name: "dữ liệu đã biết_x",
				detail: "Tập giá trị x mà bạn đã biết trong quan hệ y = b*m^x."
			},
			newXs: {
				name: "dữ liệu mới_x",
				detail: "Là những giá trị x mới mà bạn muốn hàm GROWTH trả về tương ứng với các giá trị y."
			},
			constb: {
				name: "b",
				detail: "Một giá trị lô-gic cho biết có bắt buộc hằng số b phải bằng 1 hay không."
			}
		}
	},
	HARMEAN: {
		description: "Trả về giá trị trung bình điều hòa",
		abstract: "Trả về giá trị trung bình điều hòa",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/harmean-function"
		}],
		functionParameter: {
			number1: {
				name: "số 1",
				detail: "Số đầu tiên, tham chiếu ô hoặc phạm vi ô để tính giá trị trung bình điều hòa."
			},
			number2: {
				name: "số 2",
				detail: "Lên đến 255 số bổ sung, tham chiếu ô hoặc phạm vi ô để tính giá trị trung bình hài hòa."
			}
		}
	},
	HYPGEOM_DIST: {
		description: "Trả về phân bố siêu bội.",
		abstract: "Trả về phân bố siêu bội.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/hypgeom-dist-function"
		}],
		functionParameter: {
			sampleS: {
				name: "Số lần thành công mẫu",
				detail: "Số lần thành công trong mẫu."
			},
			numberSample: {
				name: "Kích thước mẫu",
				detail: "Kích thước mẫu."
			},
			populationS: {
				name: "Tổng số thành công",
				detail: "Số lượng thành công trong dân số."
			},
			numberPop: {
				name: "Kích thước tổng thể",
				detail: "Kích thước tổng thể."
			},
			cumulative: {
				name: "tích lũy",
				detail: "Một giá trị lô-gic quyết định dạng thức của hàm. Nếu tích lũy là TRUE, hàm HYPGEOM.DIST trả về hàm phân bố tích lũy; nếu FALSE, nó trả về hàm mật độ xác suất."
			}
		}
	},
	INTERCEPT: {
		description: "Trả về điểm chặn của đường hồi quy tuyến tính",
		abstract: "Trả về điểm chặn của đường hồi quy tuyến tính",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/intercept-function"
		}],
		functionParameter: {
			knownYs: {
				name: "mảng _y",
				detail: "Mảng phụ thuộc của mảng hoặc phạm vi dữ liệu."
			},
			knownXs: {
				name: "mảng _x",
				detail: "Mảng độc lập của mảng hoặc phạm vi dữ liệu."
			}
		}
	},
	KURT: {
		description: "Trả về hệ số nhọn của tập dữ liệu.",
		abstract: "Trả về hệ số nhọn của tập dữ liệu.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/kurt-function"
		}],
		functionParameter: {
			number1: {
				name: "số 1",
				detail: "Số, tham chiếu ô hoặc phạm vi ô đầu tiên cần tính giá trị đỉnh."
			},
			number2: {
				name: "số 2",
				detail: "Tối đa 255 số bổ sung, tham chiếu ô hoặc phạm vi ô để tính giá trị đỉnh."
			}
		}
	},
	LARGE: {
		description: "Trả về giá trị lớn thứ k của tập dữ liệu.",
		abstract: "Trả về giá trị lớn thứ k của tập dữ liệu.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/large-function"
		}],
		functionParameter: {
			array: {
				name: "mảng",
				detail: "Mảng hoặc phạm vi dữ liệu mà bạn muốn xác định giá trị lớn thứ k trong đó."
			},
			k: {
				name: "k",
				detail: "Vị trí (tính từ lớn nhất) trong mảng hoặc phạm vi ô dữ liệu cần trả về."
			}
		}
	},
	LINEST: {
		description: "Trả về các tham số của xu hướng tuyến tính",
		abstract: "Trả về các tham số của xu hướng tuyến tính",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/linest-function"
		}],
		functionParameter: {
			knownYs: {
				name: "dữ liệu đã biết_y",
				detail: "Tập giá trị y mà bạn đã biết trong quan hệ y = m*x+b."
			},
			knownXs: {
				name: "dữ liệu đã biết_x",
				detail: "Tập giá trị x mà bạn đã biết trong quan hệ y = m*x+b."
			},
			constb: {
				name: "b",
				detail: "Một giá trị lô-gic cho biết có bắt buộc hằng số b phải bằng 0 hay không."
			},
			stats: {
				name: "thống kê",
				detail: "Giá trị lô-gic chỉ rõ có trả về các thống kê hồi quy bổ sung hay không."
			}
		}
	},
	LOGEST: {
		description: "Trả về các tham số của xu hướng hàm mũ",
		abstract: "Trả về các tham số của xu hướng hàm mũ",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/logest-function"
		}],
		functionParameter: {
			knownYs: {
				name: "dữ liệu đã biết_y",
				detail: "Tập giá trị y mà bạn đã biết trong quan hệ y = b*m^x."
			},
			knownXs: {
				name: "dữ liệu đã biết_x",
				detail: "Tập giá trị x mà bạn đã biết trong quan hệ y = b*m^x."
			},
			constb: {
				name: "b",
				detail: "Một giá trị lô-gic cho biết có bắt buộc hằng số b phải bằng 1 hay không."
			},
			stats: {
				name: "thống kê",
				detail: "Giá trị lô-gic chỉ rõ có trả về các thống kê hồi quy bổ sung hay không."
			}
		}
	},
	LOGNORM_DIST: {
		description: "Trả về phân bố chuẩn lô-ga-rít của",
		abstract: "Trả về phân bố chuẩn lô-ga-rít của",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/lognorm-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Giá trị mà bạn muốn có phân bố của nó."
			},
			mean: {
				name: "trung độ số",
				detail: "Trung độ số học của phân phối."
			},
			standardDev: {
				name: "Độ lệch chuẩn",
				detail: "Độ lệch chuẩn của phân phối."
			},
			cumulative: {
				name: "tích lũy",
				detail: "Một giá trị lô-gic quyết định dạng thức của hàm. Nếu lũy tích là ĐÚNG thì LOGNORM.DIST trả về hàm phân bố lũy tích; nếu SAI, nó trả về hàm mật độ xác suất."
			}
		}
	},
	LOGNORM_INV: {
		description: "Trả về nghịch đảo của hàm phân bố lô-ga-rit chuẩn lũy tích của",
		abstract: "Trả về nghịch đảo của hàm phân bố lô-ga-rit chuẩn lũy tích của",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/lognorm-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "xác suất",
				detail: "Một xác suất tương ứng với phân bố lô-ga-rit chuẩn."
			},
			mean: {
				name: "trung độ số",
				detail: "Trung độ số học của phân phối."
			},
			standardDev: {
				name: "Độ lệch chuẩn",
				detail: "Độ lệch chuẩn của phân phối."
			}
		}
	},
	MARGINOFERROR: {
		description: "Hàm này tính biên độ sai số của một dải giá trị và mức tin cậy.",
		abstract: "Hàm này tính biên độ sai số của một dải giá trị và mức tin cậy.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.google.com/docs/answer/12487850?hl=vi"
		}],
		functionParameter: {
			range: {
				name: "dải_ô",
				detail: "MARGINOFERROR(A1:C3; 0.99)"
			},
			confidence: {
				name: "mức_tin_cậy",
				detail: "Mức tin cậy mong muốn trong khoảng (0, 1)."
			}
		}
	},
	MAX: {
		description: "Trả về giá trị lớn nhất trong tập giá trị.",
		abstract: "Trả về giá trị lớn nhất trong tập giá trị.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/max-function"
		}],
		functionParameter: {
			number1: {
				name: "số 1",
				detail: "Số, tham chiếu ô hoặc phạm vi ô đầu tiên để tính giá trị lớn nhất."
			},
			number2: {
				name: "số 2",
				detail: "Bạn có thể bao gồm tối đa 255 số bổ sung, tham chiếu ô hoặc phạm vi ô để tính giá trị tối đa."
			}
		}
	},
	MAXA: {
		description: "Trả về giá trị lớn nhất trong một danh sách đối số.",
		abstract: "Trả về giá trị lớn nhất trong một danh sách đối số.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/maxa-function"
		}],
		functionParameter: {
			value1: {
				name: "giá trị 1",
				detail: "Đối số dạng số thứ nhất mà bạn muốn tìm giá trị lớn nhất trong đó."
			},
			value2: {
				name: "giá trị 2",
				detail: "Các đối số dạng số thứ 2 đến 255 mà bạn muốn tìm giá trị lớn nhất trong đó."
			}
		}
	},
	MAXIFS: {
		description: "trả về giá trị tối đa giữa các ô được xác định bằng một loạt các điều kiện hoặc tiêu chí cho trước.",
		abstract: "trả về giá trị tối đa giữa các ô được xác định bằng một loạt các điều kiện hoặc tiêu chí cho trước.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/maxifs-function"
		}],
		functionParameter: {
			maxRange: {
				name: "phạm vi giá trị tối đa",
				detail: "Dải ô thực tế để xác định giá trị lớn nhất."
			},
			criteriaRange1: {
				name: "phạm vi tiêu chí 1",
				detail: "Là tập hợp các ô cần đánh giá theo tiêu chí."
			},
			criteria1: {
				name: "tiêu chí 1",
				detail: "Là tiêu chí ở dạng số, biểu thức hoặc văn bản xác định ô nào sẽ được đánh giá là lớn nhất. "
			},
			criteriaRange2: {
				name: "phạm vi tiêu chí 2",
				detail: "Khu vực bổ sung. Có thể nhập tới 127 khu vực."
			},
			criteria2: {
				name: "tiêu chí 2",
				detail: "Điều kiện liên kết bổ sung. Có thể nhập tối đa 127 điều kiện."
			}
		}
	},
	MEDIAN: {
		description: "Trả về số trung vị của các số đã cho.",
		abstract: "Trả về số trung vị của các số đã cho.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/median-function"
		}],
		functionParameter: {
			number1: {
				name: "số 1",
				detail: "Số đầu tiên, tham chiếu ô hoặc phạm vi ô để tính trung vị."
			},
			number2: {
				name: "số 2",
				detail: "Bạn có thể bao gồm tối đa 255 số bổ sung, tham chiếu ô hoặc phạm vi ô để tính trung vị."
			}
		}
	},
	MIN: {
		description: "Trả về số nhỏ nhất trong tập giá trị.",
		abstract: "Trả về số nhỏ nhất trong tập giá trị.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/min-function"
		}],
		functionParameter: {
			number1: {
				name: "số 1",
				detail: "Số, tham chiếu ô hoặc phạm vi ô đầu tiên để tính giá trị tối thiểu."
			},
			number2: {
				name: "số 2",
				detail: "Bạn có thể bao gồm tối đa 255 số bổ sung, tham chiếu ô hoặc phạm vi ô để tính giá trị tối thiểu."
			}
		}
	},
	MINA: {
		description: "Trả về giá trị nhỏ nhất trong một danh sách đối số.",
		abstract: "Trả về giá trị nhỏ nhất trong một danh sách đối số.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/mina-function"
		}],
		functionParameter: {
			value1: {
				name: "giá trị 1",
				detail: "Số, tham chiếu ô hoặc phạm vi ô đầu tiên để tính giá trị tối thiểu."
			},
			value2: {
				name: "giá trị 2",
				detail: "Bạn có thể bao gồm tối đa 255 số bổ sung, tham chiếu ô hoặc phạm vi ô để tính giá trị tối thiểu."
			}
		}
	},
	MINIFS: {
		description: "trả về giá trị tối thiểu trong số các ô được xác định bởi một tập hợp các điều kiện hoặc tiêu chí cho trước.",
		abstract: "trả về giá trị tối thiểu trong số các ô được xác định bởi một tập hợp các điều kiện hoặc tiêu chí cho trước.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/minifs-function"
		}],
		functionParameter: {
			minRange: {
				name: "phạm vi giá trị tối thiểu",
				detail: "Dải ô thực tế để xác định giá trị nhỏ nhất."
			},
			criteriaRange1: {
				name: "phạm vi tiêu chí 1",
				detail: "Là tập hợp các ô cần đánh giá theo tiêu chí."
			},
			criteria1: {
				name: "tiêu chí 1",
				detail: "Là tiêu chí ở dạng số, biểu thức hoặc văn bản xác định ô nào sẽ được đánh giá là nhỏ nhất."
			},
			criteriaRange2: {
				name: "phạm vi tiêu chí 2",
				detail: "Khu vực bổ sung. Có thể nhập tới 127 khu vực."
			},
			criteria2: {
				name: "tiêu chí 2",
				detail: "Điều kiện liên kết bổ sung. Có thể nhập tối đa 127 điều kiện."
			}
		}
	},
	MODE_MULT: {
		description: "Trả về một mảng dọc của các giá trị thường xảy ra nhất, hoặc các giá trị lặp lại trong một mảng hoặc phạm vi dữ liệu.",
		abstract: "Trả về một mảng dọc của các giá trị thường xảy ra nhất, hoặc các giá trị lặp lại trong một mảng hoặc phạm vi dữ liệu.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/mode-mult-function"
		}],
		functionParameter: {
			number1: {
				name: "số 1",
				detail: "Số đầu tiên, tham chiếu ô hoặc phạm vi ô mà chế độ sẽ được tính toán."
			},
			number2: {
				name: "số 2",
				detail: "Tối đa 255 số bổ sung, tham chiếu ô hoặc phạm vi ô để tính chế độ."
			}
		}
	},
	MODE_SNGL: {
		description: "Trả về giá trị xuất hiện nhiều nhất trong tập dữ liệu.",
		abstract: "Trả về giá trị xuất hiện nhiều nhất trong tập dữ liệu.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/mode-sngl-function"
		}],
		functionParameter: {
			number1: {
				name: "số 1",
				detail: "Số đầu tiên, tham chiếu ô hoặc phạm vi ô mà chế độ sẽ được tính toán."
			},
			number2: {
				name: "số 2",
				detail: "Tối đa 255 số bổ sung, tham chiếu ô hoặc phạm vi ô để tính chế độ."
			}
		}
	},
	NEGBINOM_DIST: {
		description: "Trả về phân bố nhị thức âm",
		abstract: "Trả về phân bố nhị thức âm",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/negbinom-dist-function"
		}],
		functionParameter: {
			numberF: {
				name: "số lần thất bại.",
				detail: "Số lần thất bại."
			},
			numberS: {
				name: "số lần thành công",
				detail: "Số ngưỡng thành công."
			},
			probabilityS: {
				name: "xác suất thành công",
				detail: "Xác suất thành công của mỗi phép thử."
			},
			cumulative: {
				name: "tích lũy",
				detail: "Một giá trị lô-gic quyết định dạng thức của hàm. Nếu tích lũy là TRUE, hàm NEGBINOM.DIST trả về hàm phân bố tích lũy; nếu FALSE, nó trả về hàm mật độ xác suất."
			}
		}
	},
	NORM_DIST: {
		description: "Trả về hàm phân phối tích lũy chuẩn",
		abstract: "Trả về hàm phân phối tích lũy chuẩn",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/norm-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Giá trị mà bạn muốn có phân bố của nó."
			},
			mean: {
				name: "trung độ số",
				detail: "Trung độ số học của phân phối."
			},
			standardDev: {
				name: "Độ lệch chuẩn",
				detail: "Độ lệch chuẩn của phân phối."
			},
			cumulative: {
				name: "tích lũy",
				detail: "Một giá trị lô-gic quyết định dạng thức của hàm. Nếu lũy tích là ĐÚNG thì NORM.DIST trả về hàm phân bố lũy tích; nếu SAI, nó trả về hàm mật độ xác suất."
			}
		}
	},
	NORM_INV: {
		description: "Trả về hàm nghịch đảo của hàm phân phối tích lũy chuẩn",
		abstract: "Trả về hàm nghịch đảo của hàm phân phối tích lũy chuẩn",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/norm-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "xác suất",
				detail: "Một xác suất tương ứng với phân bố chuẩn."
			},
			mean: {
				name: "trung độ số",
				detail: "Trung độ số học của phân phối."
			},
			standardDev: {
				name: "Độ lệch chuẩn",
				detail: "Độ lệch chuẩn của phân phối."
			}
		}
	},
	NORM_S_DIST: {
		description: "Trả về phân bố chuẩn chuẩn hóa",
		abstract: "Trả về phân bố chuẩn chuẩn hóa",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/norm-s-dist-function"
		}],
		functionParameter: {
			z: {
				name: "z",
				detail: "Giá trị mà bạn muốn có phân bố của nó."
			},
			cumulative: {
				name: "tích lũy",
				detail: "Một giá trị lô-gic quyết định dạng thức của hàm. Nếu lũy tích là ĐÚNG thì NORM.DIST trả về hàm phân bố lũy tích; nếu SAI, nó trả về hàm mật độ xác suất."
			}
		}
	},
	NORM_S_INV: {
		description: "Trả về giá trị đảo của phân bố lũy tích chuẩn chuẩn hóa.",
		abstract: "Trả về giá trị đảo của phân bố lũy tích chuẩn chuẩn hóa.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/norm-s-inv-function"
		}],
		functionParameter: { probability: {
			name: "xác suất",
			detail: "Một xác suất tương ứng với phân bố chuẩn."
		} }
	},
	PEARSON: {
		description: "Trả về hệ số tương quan mô-men tích Pearson",
		abstract: "Trả về hệ số tương quan mô-men tích Pearson",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/pearson-function"
		}],
		functionParameter: {
			array1: {
				name: "mảng 1",
				detail: "Mảng phụ thuộc của mảng hoặc phạm vi dữ liệu."
			},
			array2: {
				name: "mảng 2",
				detail: "Mảng độc lập của mảng hoặc phạm vi dữ liệu."
			}
		}
	},
	PERCENTILE_EXC: {
		description: "Trả về giá trị phân vị thứ k trong tập dữ liệu (loại trừ 0 và 1)",
		abstract: "Trả về giá trị phân vị thứ k trong tập dữ liệu (loại trừ 0 và 1)",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/percentile-exc-function"
		}],
		functionParameter: {
			array: {
				name: "mảng",
				detail: "Mảng hoặc phạm vi dữ liệu xác định vị trí tương đối."
			},
			k: {
				name: "k",
				detail: "Giá trị phần trăm từ 0 đến 1 (loại trừ 0 và 1)."
			}
		}
	},
	PERCENTILE_INC: {
		description: "Trả về giá trị phân vị thứ k trong tập dữ liệu (bao gồm 0 và 1)",
		abstract: "Trả về giá trị phân vị thứ k trong tập dữ liệu (bao gồm 0 và 1)",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/percentile-inc-function"
		}],
		functionParameter: {
			array: {
				name: "mảng",
				detail: "Mảng hoặc phạm vi dữ liệu xác định vị trí tương đối."
			},
			k: {
				name: "k",
				detail: "Giá trị phần trăm từ 0 đến 1 (bao gồm 0 và 1)."
			}
		}
	},
	PERCENTRANK_EXC: {
		description: "Trả về thứ hạng phần trăm của các giá trị trong tập dữ liệu (loại trừ 0 và 1)",
		abstract: "Trả về thứ hạng phần trăm của các giá trị trong tập dữ liệu (loại trừ 0 và 1)",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/percentrank-exc-function"
		}],
		functionParameter: {
			array: {
				name: "mảng",
				detail: "Mảng hoặc phạm vi dữ liệu xác định vị trí tương đối."
			},
			x: {
				name: "x",
				detail: "Giá trị mà bạn muốn biết thứ hạng của nó."
			},
			significance: {
				name: "chữ số có nghĩa",
				detail: "Giá trị xác định số chữ số có nghĩa của giá trị phần trăm trả về. Nếu bỏ qua, hàm PERCENTRANK.EXC dùng ba chữ số (0.xxx)."
			}
		}
	},
	PERCENTRANK_INC: {
		description: "Trả về thứ hạng phần trăm của các giá trị trong tập dữ liệu (bao gồm 0 và 1)",
		abstract: "Trả về thứ hạng phần trăm của các giá trị trong tập dữ liệu (bao gồm 0 và 1)",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/percentrank-inc-function"
		}],
		functionParameter: {
			array: {
				name: "mảng",
				detail: "Mảng hoặc phạm vi dữ liệu xác định vị trí tương đối."
			},
			x: {
				name: "x",
				detail: "Giá trị mà bạn muốn biết thứ hạng của nó."
			},
			significance: {
				name: "chữ số có nghĩa",
				detail: "Giá trị xác định số chữ số có nghĩa của giá trị phần trăm trả về. Nếu bỏ qua, hàm PERCENTRANK.INC dùng ba chữ số (0.xxx)."
			}
		}
	},
	PERMUT: {
		description: "Trả về số hoán vị của một số đối tượng nhất định",
		abstract: "Trả về số hoán vị của một số đối tượng nhất định",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/permut-function"
		}],
		functionParameter: {
			number: {
				name: "tổng cộng",
				detail: "Số hạng mục."
			},
			numberChosen: {
				name: "số lượng mẫu",
				detail: "Số lượng các mục trong mỗi sự sắp xếp."
			}
		}
	},
	PERMUTATIONA: {
		description: "Trả về số hoán vị cho số đối tượng đã cho (với tần suất lặp) có thể được chọn từ tổng số đối tượng.",
		abstract: "Trả về số hoán vị cho số đối tượng đã cho (với tần suất lặp) có thể được chọn từ tổng số đối tượng.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/permutationa-function"
		}],
		functionParameter: {
			number: {
				name: "tổng cộng",
				detail: "Số hạng mục."
			},
			numberChosen: {
				name: "số lượng mẫu",
				detail: "Số lượng các mục trong mỗi sự sắp xếp."
			}
		}
	},
	PHI: {
		description: "Trả về giá trị của hàm mật độ cho một phân bố chuẩn chuẩn hóa.",
		abstract: "Trả về giá trị của hàm mật độ cho một phân bố chuẩn chuẩn hóa.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/phi-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "X là số bạn muốn tìm mật độ của phân bố chuẩn chuẩn hóa cho số này."
		} }
	},
	POISSON_DIST: {
		description: "Trả về phân bố Poisson.",
		abstract: "Trả về phân bố Poisson.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/poisson-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Giá trị mà bạn muốn có phân bố của nó."
			},
			mean: {
				name: "trung độ số",
				detail: "Trung độ số học của phân phối."
			},
			cumulative: {
				name: "tích lũy",
				detail: "Một giá trị lô-gic quyết định dạng thức của hàm. Nếu lũy tích là ĐÚNG thì POISSON.DIST trả về hàm phân bố lũy tích; nếu SAI, nó trả về hàm mật độ xác suất."
			}
		}
	},
	PROB: {
		description: "Trả về xác suất các giá trị trong một phạm vi nằm giữa hai giới hạn.",
		abstract: "Trả về xác suất các giá trị trong một phạm vi nằm giữa hai giới hạn.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/prob-function"
		}],
		functionParameter: {
			xRange: {
				name: "số",
				detail: "Phạm vi số với các giá trị xác suất tương ứng."
			},
			probRange: {
				name: "xác suất",
				detail: "Một tập hợp các giá trị xác suất được liên kết với một giá trị số."
			},
			lowerLimit: {
				name: "giới hạn dưới",
				detail: "Giới hạn dưới bằng số của xác suất được tính toán."
			},
			upperLimit: {
				name: "giới hạn trên",
				detail: "Giới hạn trên bằng số của xác suất được tính toán."
			}
		}
	},
	QUARTILE_EXC: {
		description: "Trả về các phần tư của tập dữ liệu (loại trừ 0 và 1)",
		abstract: "Trả về các phần tư của tập dữ liệu (loại trừ 0 và 1)",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/quartile-exc-function"
		}],
		functionParameter: {
			array: {
				name: "mảng",
				detail: "Một mảng hoặc phạm vi dữ liệu yêu cầu giá trị tứ phân vị."
			},
			quart: {
				name: "giá trị tứ phân",
				detail: "Giá trị tứ phân vị cần trả về."
			}
		}
	},
	QUARTILE_INC: {
		description: "Trả về các phần tư của tập dữ liệu (bao gồm 0 và 1)",
		abstract: "Trả về các phần tư của tập dữ liệu (bao gồm 0 và 1)",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/quartile-inc-function"
		}],
		functionParameter: {
			array: {
				name: "mảng",
				detail: "Một mảng hoặc phạm vi dữ liệu yêu cầu giá trị tứ phân vị."
			},
			quart: {
				name: "giá trị tứ phân",
				detail: "Giá trị tứ phân vị cần trả về."
			}
		}
	},
	RANK_AVG: {
		description: "Trả về thứ hạng của một số trong một danh sách các số",
		abstract: "Trả về thứ hạng của một số trong một danh sách các số",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/rank-avg-function"
		}],
		functionParameter: {
			number: {
				name: "số",
				detail: "Số mà bạn muốn tìm thứ hạng của nó."
			},
			ref: {
				name: "danh sách các số",
				detail: "Tham chiếu tới danh sách các số. Các giá trị không phải là số trong tham chiếu sẽ được bỏ qua."
			},
			order: {
				name: "xếp hạng số",
				detail: "Một con số chỉ rõ cách xếp hạng số. 0 hoặc bị bỏ qua đối với thứ tự giảm dần, khác 0 đối với thứ tự tăng dần."
			}
		}
	},
	RANK_EQ: {
		description: "Trả về thứ hạng của một số trong một danh sách các số",
		abstract: "Trả về thứ hạng của một số trong một danh sách các số",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/rank-eq-function"
		}],
		functionParameter: {
			number: {
				name: "số",
				detail: "Số mà bạn muốn tìm thứ hạng của nó."
			},
			ref: {
				name: "danh sách các số",
				detail: "Tham chiếu tới danh sách các số. Các giá trị không phải là số trong tham chiếu sẽ được bỏ qua."
			},
			order: {
				name: "xếp hạng số",
				detail: "Một con số chỉ rõ cách xếp hạng số. 0 hoặc bị bỏ qua đối với thứ tự giảm dần, khác 0 đối với thứ tự tăng dần."
			}
		}
	},
	RSQ: {
		description: "Trả về bình phương của hệ số tương quan thời điểm sản phẩm Pearson",
		abstract: "Trả về hệ số tương quan mô-men tích Pearson",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/rsq-function"
		}],
		functionParameter: {
			knownYs: {
				name: "mảng _y",
				detail: "Mảng phụ thuộc của mảng hoặc phạm vi dữ liệu."
			},
			knownXs: {
				name: "mảng _x",
				detail: "Mảng độc lập của mảng hoặc phạm vi dữ liệu."
			}
		}
	},
	SKEW: {
		description: "Trả về độ lệch của một phân bố.",
		abstract: "Trả về độ lệch của một phân bố.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/skew-function"
		}],
		functionParameter: {
			number1: {
				name: "số 1",
				detail: "Số đầu tiên, tham chiếu ô hoặc phạm vi ô cần tính độ lệch."
			},
			number2: {
				name: "số 2",
				detail: "Tối đa 255 số bổ sung, tham chiếu ô hoặc phạm vi ô để tính toán độ lệch."
			}
		}
	},
	SKEW_P: {
		description: "Trả về độ lệch của phân bố dựa trên tổng thể mẫu",
		abstract: "Trả về độ lệch của phân bố dựa trên tổng thể mẫu",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/skew-p-function"
		}],
		functionParameter: {
			number1: {
				name: "số 1",
				detail: "Số đầu tiên, tham chiếu ô hoặc phạm vi ô cần tính độ lệch."
			},
			number2: {
				name: "số 2",
				detail: "Tối đa 255 số bổ sung, tham chiếu ô hoặc phạm vi ô để tính toán độ lệch."
			}
		}
	},
	SLOPE: {
		description: "Trả về độ dốc của đường hồi quy tuyến tính",
		abstract: "Trả về độ dốc của đường hồi quy tuyến tính",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/slope-function"
		}],
		functionParameter: {
			knownYs: {
				name: "mảng _y",
				detail: "Mảng phụ thuộc của mảng hoặc phạm vi dữ liệu."
			},
			knownXs: {
				name: "mảng _x",
				detail: "Mảng độc lập của mảng hoặc phạm vi dữ liệu."
			}
		}
	},
	SMALL: {
		description: "Trả về giá trị nhỏ thứ k của tập dữ liệu.",
		abstract: "Trả về giá trị nhỏ thứ k của tập dữ liệu.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/small-function"
		}],
		functionParameter: {
			array: {
				name: "mảng",
				detail: "Mảng hoặc phạm vi dữ liệu dạng số mà bạn muốn xác định giá trị nhỏ thứ k của nó."
			},
			k: {
				name: "k",
				detail: "Vị trí (từ giá trị nhỏ nhất) trong mảng hoặc phạm vi dữ liệu cần trả về."
			}
		}
	},
	STANDARDIZE: {
		description: "Trả về giá trị chuẩn hóa",
		abstract: "Trả về giá trị chuẩn hóa",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/standardize-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Giá trị bạn muốn chuẩn hóa."
			},
			mean: {
				name: "trung độ số",
				detail: "Trung độ số học của phân phối."
			},
			standardDev: {
				name: "Độ lệch chuẩn",
				detail: "Độ lệch chuẩn của phân phối."
			}
		}
	},
	STDEV_P: {
		description: "Tính toán độ lệch chuẩn dựa trên toàn bộ tổng thể được cung cấp ở dạng đối số (bỏ qua giá trị lô-gic và văn bản).",
		abstract: "Tính độ lệch chuẩn dựa trên toàn bộ quần thể mẫu",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/stdev-p-function"
		}],
		functionParameter: {
			number1: {
				name: "số 1",
				detail: "Đối số dạng số đầu tiên tương ứng với tổng thể."
			},
			number2: {
				name: "số 2",
				detail: "Đối số dạng số từ 2 đến 254 tương ứng với tổng thể. Bạn cũng có thể sử dụng một mảng đơn hay tham chiếu tới một mảng thay thế cho các đối số được phân tách bởi dấu phẩy."
			}
		}
	},
	STDEV_S: {
		description: "Ước tính độ lệch chuẩn dựa trên mẫu (bỏ qua giá trị lô-gic và văn bản trong mẫu).",
		abstract: "Ước tính độ lệch chuẩn dựa trên mẫu",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/stdev-s-function"
		}],
		functionParameter: {
			number1: {
				name: "số 1",
				detail: "Đối số dạng số đầu tiên tương ứng với mẫu tổng thể. Bạn cũng có thể sử dụng một mảng đơn hay tham chiếu tới một mảng thay thế cho các đối số được phân tách bởi dấu phẩy."
			},
			number2: {
				name: "số 2",
				detail: "Đối số dạng số từ 2 đến 254 tương ứng với mẫu tổng thể. Bạn cũng có thể sử dụng một mảng đơn hay tham chiếu tới một mảng thay thế cho các đối số được phân tách bởi dấu phẩy."
			}
		}
	},
	STDEVA: {
		description: "Ước tính độ lệch chuẩn dựa trên một mẫu. Độ lệch chuẩn là số đo độ phân tán của các giá trị so với giá trị trung bình (trung độ).",
		abstract: "Ước tính độ lệch chuẩn dựa trên một mẫu.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/stdeva-function"
		}],
		functionParameter: {
			value1: {
				name: "giá trị 1",
				detail: "Đối số dạng số đầu tiên tương ứng với mẫu tổng thể. Bạn cũng có thể sử dụng một mảng đơn hay tham chiếu tới một mảng thay thế cho các đối số được phân tách bởi dấu phẩy."
			},
			value2: {
				name: "giá trị 2",
				detail: "Đối số dạng số từ 2 đến 254 tương ứng với mẫu tổng thể. Bạn cũng có thể sử dụng một mảng đơn hay tham chiếu tới một mảng thay thế cho các đối số được phân tách bởi dấu phẩy."
			}
		}
	},
	STDEVPA: {
		description: "Tính toán độ lệch chuẩn dựa trên toàn bộ tập hợp được cung cấp ở dạng đối số, bao gồm văn bản và giá trị lô-gic.",
		abstract: "Tính toán độ lệch chuẩn dựa trên toàn bộ tập hợp được cung cấp ở dạng đối số, bao gồm văn bản và giá trị lô-gic.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/stdevpa-function"
		}],
		functionParameter: {
			value1: {
				name: "giá trị 1",
				detail: "Đối số dạng số đầu tiên tương ứng với tổng thể."
			},
			value2: {
				name: "giá trị 2",
				detail: "Đối số dạng số từ 2 đến 254 tương ứng với tổng thể. Bạn cũng có thể sử dụng một mảng đơn hay tham chiếu tới một mảng thay thế cho các đối số được phân tách bởi dấu phẩy."
			}
		}
	},
	STEYX: {
		description: "Trả về sai số chuẩn của giá trị y dự đoán cho mỗi giá trị x trong hồi quy.",
		abstract: "Trả về sai số chuẩn của giá trị y dự đoán cho mỗi giá trị x trong hồi quy.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/steyx-function"
		}],
		functionParameter: {
			knownYs: {
				name: "mảng _y",
				detail: "Mảng phụ thuộc của mảng hoặc phạm vi dữ liệu."
			},
			knownXs: {
				name: "mảng _x",
				detail: "Mảng độc lập của mảng hoặc phạm vi dữ liệu."
			}
		}
	},
	T_DIST: {
		description: "Trả về phân phối xác suất t-Student của Học sinh",
		abstract: "Trả về phân phối xác suất t-Student của Học sinh",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/t-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Cần tính giá trị số của phân bố."
			},
			degFreedom: {
				name: "bậc tự do",
				detail: "Một số nguyên biểu thị số bậc tự do."
			},
			cumulative: {
				name: "tích lũy",
				detail: "Một giá trị lô-gic quyết định dạng thức của hàm. Nếu lũy tích là ĐÚNG thì T.DIST trả về hàm phân bố lũy tích; nếu SAI, nó trả về hàm mật độ xác suất."
			}
		}
	},
	T_DIST_2T: {
		description: "Trả về phân phối xác suất t-Student của Học sinh (hai đuôi)",
		abstract: "Trả về phân phối xác suất t-Student của Học sinh (hai đuôi)",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/t-dist-2t-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Cần tính giá trị số của phân bố."
			},
			degFreedom: {
				name: "bậc tự do",
				detail: "Một số nguyên biểu thị số bậc tự do."
			}
		}
	},
	T_DIST_RT: {
		description: "Trả về phân phối xác suất t-Student của Học sinh (đuôi bên phải)",
		abstract: "Trả về phân phối xác suất t-Student của Học sinh (đuôi bên phải)",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/t-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Cần tính giá trị số của phân bố."
			},
			degFreedom: {
				name: "bậc tự do",
				detail: "Một số nguyên biểu thị số bậc tự do."
			}
		}
	},
	T_INV: {
		description: "Trả về hàm nghịch đảo của phân bố xác suất t-Student của Học sinh",
		abstract: "Trả về hàm nghịch đảo của phân bố xác suất t-Student của Học sinh",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/t-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "xác suất",
				detail: "Xác suất liên quan đến phân phối t-Student của Sinh viên."
			},
			degFreedom: {
				name: "bậc tự do",
				detail: "Một số nguyên biểu thị số bậc tự do."
			}
		}
	},
	T_INV_2T: {
		description: "Trả về hàm nghịch đảo của phân bố xác suất t-Student của Học sinh (hai đuôi)",
		abstract: "Trả về hàm nghịch đảo của phân bố xác suất t-Student của Học sinh (hai đuôi)",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/t-inv-2t-function"
		}],
		functionParameter: {
			probability: {
				name: "xác suất",
				detail: "Xác suất liên quan đến phân phối t-Student của Sinh viên."
			},
			degFreedom: {
				name: "bậc tự do",
				detail: "Một số nguyên biểu thị số bậc tự do."
			}
		}
	},
	T_TEST: {
		description: "Trả về xác suất kết hợp với Phép thử t-Student.",
		abstract: "Trả về xác suất kết hợp với Phép thử t-Student.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/t-test-function"
		}],
		functionParameter: {
			array1: {
				name: "mảng 1",
				detail: "Mảng thứ nhất của phạm vi dữ liệu."
			},
			array2: {
				name: "mảng 2",
				detail: "Mảng thứ hai của phạm vi dữ liệu."
			},
			tails: {
				name: "đặc điểm đuôi",
				detail: "Xác định số đuôi của phân phối. Nếu đuôi = 1, T.TEST sử dụng phân phối một phía. Nếu đuôi = 2, T.TEST sử dụng phân phối hai phía."
			},
			type: {
				name: "loại Phép thử",
				detail: "Loại Phép thử t cần thực hiện."
			}
		}
	},
	TREND: {
		description: "Trả về các giá trị theo xu hướng tuyến tính",
		abstract: "Trả về các giá trị theo xu hướng tuyến tính",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/trend-function"
		}],
		functionParameter: {
			knownYs: {
				name: "dữ liệu đã biết_y",
				detail: "Tập giá trị y mà bạn đã biết trong quan hệ y = m*x+b."
			},
			knownXs: {
				name: "dữ liệu đã biết_x",
				detail: "Tập giá trị x mà bạn đã biết trong quan hệ y = m*x+b."
			},
			newXs: {
				name: "dữ liệu mới_x",
				detail: "Là những giá trị x mới mà bạn muốn hàm TREND trả về tương ứng với các giá trị y."
			},
			constb: {
				name: "b",
				detail: "Một giá trị lô-gic cho biết có bắt buộc hằng số b phải bằng 0 hay không."
			}
		}
	},
	TRIMMEAN: {
		description: "Trả về trung bình của phần trong một tập dữ liệu.",
		abstract: "Trả về trung bình của phần trong một tập dữ liệu.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/trimmean-function"
		}],
		functionParameter: {
			array: {
				name: "mảng",
				detail: "Mảng hoặc phạm vi giá trị cần cắt bớt và tính trung bình."
			},
			percent: {
				name: "tỷ lệ loại trừ",
				detail: "Tỷ lệ các điểm dữ liệu cần loại bỏ ra khỏi việc tính toán."
			}
		}
	},
	VAR_P: {
		description: "Tính toán phương sai dựa trên toàn bộ tập hợp (bỏ các giá trị lô-gic và văn bản trong tập hợp).",
		abstract: "Tính toán phương sai dựa trên toàn bộ tập hợp",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/var-p-function"
		}],
		functionParameter: {
			number1: {
				name: "số 1",
				detail: "Đối số dạng số đầu tiên tương ứng với tổng thể."
			},
			number2: {
				name: "số 2",
				detail: "Là các đối số dạng số từ 2 đến 254 tương ứng với một tập hợp."
			}
		}
	},
	VAR_S: {
		description: "Ước tính phương sai dựa trên mẫu (bỏ qua các giá trị lô-gic và văn bản trong mẫu).",
		abstract: "Ước tính phương sai dựa trên mẫu",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/var-s-function"
		}],
		functionParameter: {
			number1: {
				name: "số 1",
				detail: "Đối số dạng số đầu tiên tương ứng với mẫu tổng thể."
			},
			number2: {
				name: "số 2",
				detail: "Là các đối số dạng số từ 2 đến 254 tương ứng với một mẫu của một tập hợp."
			}
		}
	},
	VARA: {
		description: "Ước tính phương sai dựa trên mẫu.",
		abstract: "Ước tính phương sai dựa trên mẫu.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/vara-function"
		}],
		functionParameter: {
			value1: {
				name: "giá trị 1",
				detail: "Đối số dạng số đầu tiên tương ứng với mẫu tổng thể."
			},
			value2: {
				name: "giá trị 2",
				detail: "Là các đối số dạng số từ 2 đến 254 tương ứng với một mẫu của một tập hợp."
			}
		}
	},
	VARPA: {
		description: "Tính toán phương sai dựa trên toàn bộ tập hợp.",
		abstract: "Tính toán phương sai dựa trên toàn bộ tập hợp.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/varpa-function"
		}],
		functionParameter: {
			value1: {
				name: "giá trị 1",
				detail: "Đối số dạng số đầu tiên tương ứng với tổng thể."
			},
			value2: {
				name: "giá trị 2",
				detail: "Là các đối số dạng số từ 2 đến 254 tương ứng với một tập hợp."
			}
		}
	},
	WEIBULL_DIST: {
		description: "Trả về phân bố Weibull.",
		abstract: "Trả về phân bố Weibull.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/weibull-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Giá trị mà bạn muốn có phân bố của nó."
			},
			alpha: {
				name: "alpha",
				detail: "Tham số đầu tiên của phân phối."
			},
			beta: {
				name: "beta",
				detail: "Tham số thứ hai của phân phối."
			},
			cumulative: {
				name: "tích lũy",
				detail: "Một giá trị lô-gic quyết định dạng thức của hàm. Nếu tích lũy là TRUE, hàm WEIBULL.DIST trả về hàm phân bố tích lũy; nếu FALSE, nó trả về hàm mật độ xác suất."
			}
		}
	},
	Z_TEST: {
		description: "Trả về giá trị xác suất một phía của kiểm tra z.",
		abstract: "Trả về giá trị xác suất một phía của kiểm tra z.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/z-test-function"
		}],
		functionParameter: {
			array: {
				name: "mảng",
				detail: "Mảng hay khoảng dữ liệu để kiểm tra x."
			},
			x: {
				name: "x",
				detail: "Giá trị cần kiểm tra."
			},
			sigma: {
				name: "Độ lệch chuẩn",
				detail: "Độ lệch chuẩn tổng thể (đã biết). Nếu bỏ qua, độ lệch chuẩn mẫu sẽ được dùng."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/text/vi-VN.ts
const locale$3 = {
	ASC: {
		description: "Chuyển các chữ cái hoặc ký tự Kana toàn chiều rộng (byte kép) trong một chuỗi thành ký tự nửa chiều rộng (byte đơn)",
		abstract: "Chuyển các chữ cái hoặc ký tự Kana toàn chiều rộng (byte kép) trong một chuỗi thành ký tự nửa chiều rộng (byte đơn)",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/asc-function"
		}],
		functionParameter: { text: {
			name: "bản văn",
			detail: "Văn bản hoặc tham chiếu tới một ô có chứa văn bản mà bạn muốn thay đổi. Nếu văn bản không chứa chữ nào có độ rộng toàn phần, thì văn bản không thay đổi."
		} }
	},
	ARRAYTOTEXT: {
		description: "Hàm ARRAYTOTEXT trả về một mảng các giá trị văn bản trong bất kỳ phạm vi nào được chỉ định.",
		abstract: "Hàm ARRAYTOTEXT trả về một mảng các giá trị văn bản trong bất kỳ phạm vi nào được chỉ định.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/arraytotext-function"
		}],
		functionParameter: {
			array: {
				name: "mảng",
				detail: "Mảng cần trả về dưới dạng văn bản."
			},
			format: {
				name: "Định dạng của dữ",
				detail: "Định dạng của dữ liệu trả về. Nó có thể là một trong hai giá trị: \n0 Mặc định. Định dạng ngắn gọn dễ đọc.\n1 Định dạng nghiêm ngặt bao gồm ký tự thoát và dấu tách hàng. Tạo một chuỗi có thể được phân tích khi nhập vào thanh công thức. Đóng gói các chuỗi trả về trong dấu ngoặc kép, ngoại trừ Booleans, Numbers và Errors."
			}
		}
	},
	BAHTTEXT: {
		description: "Chuyển đổi số thành văn bản bằng định dạng tiền tệ Thái Baht",
		abstract: "Chuyển đổi số thành văn bản bằng định dạng tiền tệ Thái Baht",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/bahttext-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Là số mà bạn muốn chuyển sang văn bản hoặc tham chiếu đến ô có chứa số, hay công thức định trị thành số."
		} }
	},
	CHAR: {
		description: "Trả về ký tự được xác định bởi mã số",
		abstract: "Trả về ký tự được xác định bởi mã số",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/char-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Số từ 1 đến 255 xác định bạn muốn ký tự nào. Ký tự này nằm trong bộ ký tự mà máy tính của bạn dùng."
		} }
	},
	CLEAN: {
		description: "Loại bỏ tất cả các ký tự không thể in được khỏi văn bản",
		abstract: "Loại bỏ tất cả các ký tự không thể in được khỏi văn bản",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/clean-function"
		}],
		functionParameter: { text: {
			name: "bản văn",
			detail: "Bất kỳ thông tin trang tính nào bạn muốn loại bỏ ký tự không in được khỏi đó."
		} }
	},
	CODE: {
		description: "Trả về mã số của ký tự đầu tiên trong chuỗi văn bản",
		abstract: "Trả về mã số của ký tự đầu tiên trong chuỗi văn bản",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/code-function"
		}],
		functionParameter: { text: {
			name: "bản văn",
			detail: "Văn bản mà bạn muốn mã của ký tự đầu tiên cho văn bản đó."
		} }
	},
	CONCAT: {
		description: "Kết hợp văn bản từ nhiều vùng và/hoặc chuỗi lại với nhau, nhưng không cung cấp tham số phân tách hoặc IgnoreEmpty.",
		abstract: "Kết hợp văn bản từ nhiều vùng và/hoặc chuỗi lại với nhau, nhưng không cung cấp tham số phân tách hoặc IgnoreEmpty",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/concat-function"
		}],
		functionParameter: {
			text1: {
				name: "bản văn 1",
				detail: "Mục văn bản đầu tiên để kết hợp. Có thể là một chuỗi hoặc một mảng chuỗi, chẳng hạn như một vùng ô."
			},
			text2: {
				name: "bản văn 2",
				detail: "Các mục văn bản khác để kết hợp. Có thể lên đến 253 tham số văn bản. Mỗi tham số có thể là một chuỗi hoặc một mảng chuỗi, chẳng hạn như một vùng ô."
			}
		}
	},
	CONCATENATE: {
		description: "Kết hợp nhiều mục văn bản thành một mục văn bản",
		abstract: "Kết hợp nhiều mục văn bản thành một mục văn bản",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/concatenate-function"
		}],
		functionParameter: {
			text1: {
				name: "bản văn 1",
				detail: "Mục đầu tiên để kết hợp. Có thể là một giá trị văn bản, một số hoặc một tham chiếu ô."
			},
			text2: {
				name: "bản văn 2",
				detail: "Các mục văn bản khác để kết hợp. Có thể có tối đa 255 mục, tổng cộng hỗ trợ tối đa 8,192 ký tự."
			}
		}
	},
	DBCS: {
		description: "Chuyển các chữ cái hoặc ký tự Kana nửa chiều rộng (byte đơn) trong một chuỗi thành ký tự toàn chiều rộng (byte kép)",
		abstract: "Chuyển các chữ cái hoặc ký tự Kana nửa chiều rộng (byte đơn) trong một chuỗi thành ký tự toàn chiều rộng (byte kép)",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/dbcs-function"
		}],
		functionParameter: { text: {
			name: "bản văn",
			detail: "Văn bản hoặc tham chiếu tới một ô có chứa văn bản mà bạn muốn thay đổi. Nếu văn bản không chứa chữ Tiếng Anh có độ rộng bán phần hay katakana nào, thì văn bản không đổi."
		} }
	},
	DOLLAR: {
		description: "Chuyển đổi một số thành văn bản bằng cách dùng định dạng tiền tệ",
		abstract: "Chuyển đổi một số thành văn bản bằng cách dùng định dạng tiền tệ",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/dollar-function"
		}],
		functionParameter: {
			number: {
				name: "số",
				detail: "Số, tham chiếu đến ô chứa số hoặc công thức sẽ trả về số."
			},
			decimals: {
				name: "số chữ thập phân",
				detail: "Số chữ số nằm bên phải dấu thập phân. Nếu đây là số âm, thì số được làm tròn sang bên trái dấu thập phân. Nếu bạn bỏ qua đối số decimals, nó được giả định là bằng 2."
			}
		}
	},
	EXACT: {
		description: "Kiểm tra xem hai giá trị văn bản có giống nhau hay không",
		abstract: "Kiểm tra xem hai giá trị văn bản có giống nhau hay không",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/exact-function"
		}],
		functionParameter: {
			text1: {
				name: "bản văn 1",
				detail: "Chuỗi văn bản đầu tiên."
			},
			text2: {
				name: "bản văn 2",
				detail: "Chuỗi văn bản thứ hai."
			}
		}
	},
	FIND: {
		description: "Trả về vị trí của một chuỗi văn bản trong một chuỗi văn bản khác (phân biệt chữ hoa chữ thường)",
		abstract: "Trả về vị trí của một chuỗi văn bản trong một chuỗi văn bản khác (phân biệt chữ hoa chữ thường)",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/this-article-has-been-retired"
		}],
		functionParameter: {
			findText: {
				name: "chuỗi tìm kiếm",
				detail: "Chuỗi cần tìm trong \"Văn bản cần tìm kiếm\"."
			},
			withinText: {
				name: "văn bản để tìm kiếm",
				detail: "Lần xuất hiện đầu tiên của văn bản để tìm kiếm \"chuỗi tìm kiếm\"."
			},
			startNum: {
				name: "vị trí bắt đầu",
				detail: "Vị trí ký tự để bắt đầu tìm kiếm trong \"văn bản cần tìm kiếm\". Nếu bỏ qua, giá trị là 1 được giả định."
			}
		}
	},
	FINDB: {
		description: "Trả về vị trí của một chuỗi văn bản trong một chuỗi văn bản khác (phân biệt chữ hoa chữ thường)",
		abstract: "Trả về vị trí của một chuỗi văn bản trong một chuỗi văn bản khác (phân biệt chữ hoa chữ thường)",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/this-article-has-been-retired"
		}],
		functionParameter: {
			findText: {
				name: "chuỗi tìm kiếm",
				detail: "Chuỗi cần tìm trong \"Văn bản cần tìm kiếm\"."
			},
			withinText: {
				name: "văn bản để tìm kiếm",
				detail: "Lần xuất hiện đầu tiên của văn bản để tìm kiếm \"chuỗi tìm kiếm\"."
			},
			startNum: {
				name: "vị trí bắt đầu",
				detail: "Vị trí ký tự để bắt đầu tìm kiếm trong \"văn bản cần tìm kiếm\". Nếu bỏ qua, giá trị là 1 được giả định."
			}
		}
	},
	FIXED: {
		description: "Làm tròn một số thành một số thập phân đã chỉ định và trả về kết quả dưới dạng văn bản với hoặc không có dấu phân tách thập phân",
		abstract: "Làm tròn một số thành một số thập phân đã chỉ định và trả về kết quả dưới dạng văn bản với hoặc không có dấu phân tách thập phân",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/fixed-function"
		}],
		functionParameter: {
			number: {
				name: "số",
				detail: "Số bạn muốn làm tròn và chuyển đổi thành văn bản."
			},
			decimals: {
				name: "số chữ thập phân",
				detail: "Số chữ số nằm bên phải dấu thập phân. Nếu đây là số âm, thì số được làm tròn sang bên trái dấu thập phân. Nếu bạn bỏ qua đối số decimals, nó được giả định là bằng 2."
			},
			noCommas: {
				name: "tắt dấu phân cách",
				detail: "Giá trị logic, nếu ĐÚNG, sẽ ngăn FIXED đưa dấu phẩy vào văn bản trả về."
			}
		}
	},
	LEFT: {
		description: "Trả về ký tự ngoài cùng bên trái trong giá trị văn bản",
		abstract: "Trả về ký tự ngoài cùng bên trái trong giá trị văn bản",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/left-function"
		}],
		functionParameter: {
			text: {
				name: "bản văn",
				detail: "Chuỗi văn bản chứa các ký tự bạn muốn trích xuất."
			},
			numChars: {
				name: "số ký tự",
				detail: "Chỉ định số ký tự bạn muốn LEFT trích xuất."
			}
		}
	},
	LEFTB: {
		description: "Trả về ký tự ngoài cùng bên trái trong giá trị văn bản",
		abstract: "Trả về ký tự ngoài cùng bên trái trong giá trị văn bản",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/left-function"
		}],
		functionParameter: {
			text: {
				name: "bản văn",
				detail: "Chuỗi văn bản chứa các ký tự bạn muốn trích xuất."
			},
			numBytes: {
				name: "số Byte",
				detail: "Chỉ rõ số ký tự mà bạn muốn hàm LEFTB trích xuất, dựa trên byte."
			}
		}
	},
	LEN: {
		description: "Trả về số lượng ký tự trong một chuỗi văn bản",
		abstract: "Trả về số lượng ký tự trong một chuỗi văn bản",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/len-function"
		}],
		functionParameter: { text: {
			name: "bản văn",
			detail: "Văn bản mà bạn muốn tìm độ dài của nó. Khoảng trống được đếm là ký tự."
		} }
	},
	LENB: {
		description: "trả về số byte dùng để biểu thị các ký tự trong một chuỗi văn bản.",
		abstract: "trả về số byte dùng để biểu thị các ký tự trong một chuỗi văn bản.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/len-function"
		}],
		functionParameter: { text: {
			name: "bản văn",
			detail: "Văn bản mà bạn muốn tìm độ dài của nó. Khoảng trống được đếm là ký tự."
		} }
	},
	LOWER: {
		description: "Chuyển đổi tất cả các chữ cái trong văn bản thành chữ thường",
		abstract: "Chuyển đổi tất cả các chữ cái trong văn bản thành chữ thường",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/lower-function"
		}],
		functionParameter: { text: {
			name: "bản văn",
			detail: "Văn bản mà bạn muốn chuyển đổi thành chữ thường."
		} }
	},
	MID: {
		description: "Trả về một số ký tự cụ thể bắt đầu tại một vị trí được chỉ định trong chuỗi văn bản",
		abstract: "Trả về một số ký tự cụ thể bắt đầu tại một vị trí được chỉ định trong chuỗi văn bản",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/mid-function"
		}],
		functionParameter: {
			text: {
				name: "bản văn",
				detail: "Chuỗi văn bản chứa các ký tự bạn muốn trích xuất."
			},
			startNum: {
				name: "vị trí bắt đầu",
				detail: "Ví trí của ký tự thứ nhất mà bạn muốn trích xuất trong văn bản."
			},
			numChars: {
				name: "số ký tự",
				detail: "Chỉ định số ký tự bạn muốn MID trích xuất."
			}
		}
	},
	MIDB: {
		description: "Trả về một số ký tự cụ thể bắt đầu tại một vị trí được chỉ định trong chuỗi văn bản",
		abstract: "Trả về một số ký tự cụ thể bắt đầu tại một vị trí được chỉ định trong chuỗi văn bản",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/mid-function"
		}],
		functionParameter: {
			text: {
				name: "bản văn",
				detail: "Chuỗi văn bản chứa các ký tự bạn muốn trích xuất."
			},
			startNum: {
				name: "vị trí bắt đầu",
				detail: "Ví trí của ký tự thứ nhất mà bạn muốn trích xuất trong văn bản."
			},
			numBytes: {
				name: "số Byte",
				detail: "Chỉ rõ số ký tự mà bạn muốn hàm MIDB trích xuất, dựa trên byte."
			}
		}
	},
	NUMBERSTRING: {
		description: "Chuyển đổi số sang chuỗi tiếng Trung",
		abstract: "Chuyển đổi số sang chuỗi tiếng Trung",
		links: [{
			title: "Hướng dẫn",
			url: "https://www.wps.cn/learning/course/detail/id/340.html?chan=pc_kdocs_function"
		}],
		functionParameter: {
			number: {
				name: "số",
				detail: "Giá trị được chuyển đổi thành chuỗi tiếng Trung."
			},
			type: {
				name: "kiểu",
				detail: "Kiểu kết quả trả về.\n1. chữ thường Trung Quốc \n2. Viết hoa chữ Hán \n3. Đọc và viết chữ Hán"
			}
		}
	},
	NUMBERVALUE: {
		description: "Chuyển văn bản sang số, theo cách độc lập vị trí.",
		abstract: "Chuyển văn bản sang số, theo cách độc lập vị trí.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/numbervalue-function"
		}],
		functionParameter: {
			text: {
				name: "bản văn",
				detail: "Văn bản chuyển sang số."
			},
			decimalSeparator: {
				name: "dấu phân cách thập phân",
				detail: "Ký tự dùng để tách số nguyên và phần phân số của kết quả."
			},
			groupSeparator: {
				name: "dấu phân cách nhóm",
				detail: "Ký tự dùng để tách các nhóm số."
			}
		}
	},
	PHONETIC: {
		description: "Trả về chuỗi Furigana từ chuỗi văn bản",
		abstract: "Trả về chuỗi Furigana từ chuỗi văn bản",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/phonetic-function"
		}],
		functionParameter: { reference: {
			name: "Tham khảo",
			detail: "Yêu cầu. Chuỗi văn bản hoặc tham chiếu tới một ô đơn lẻ hoặc một phạm vi ô có chứa chuỗi văn bản furigana."
		} }
	},
	PROPER: {
		description: "Chuyển đổi chữ cái đầu tiên của mỗi từ trong chuỗi văn bản thành chữ hoa và tất cả các chữ cái khác thành chữ thường",
		abstract: "Chuyển đổi chữ cái đầu tiên của mỗi từ trong chuỗi văn bản thành chữ hoa và tất cả các chữ cái khác thành chữ thường",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/proper-function"
		}],
		functionParameter: { text: {
			name: "bản văn",
			detail: "Văn bản được đặt trong dấu ngoặc kép, công thức trả về văn bản hoặc tham chiếu đến ô chứa văn bản mà bạn muốn viết hoa một phần."
		} }
	},
	REGEXEXTRACT: {
		description: "Trích xuất chuỗi con khớp đầu tiên theo một biểu thức chính quy.",
		abstract: "Trích xuất chuỗi con khớp đầu tiên theo một biểu thức chính quy.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.google.com/docs/answer/3098244?hl=vi"
		}],
		functionParameter: {
			text: {
				name: "văn bản",
				detail: "Lưu ý: Ví dụ trên sẽ trả về 2 cột dữ liệu, “trích xuất” ở cột đầu tiên và “giá trị” ở cột thứ hai."
			},
			regularExpression: {
				name: "biểu thức chính quy",
				detail: "Phần đầu tiên văn_bản khớp với biểu thức này sẽ được trả về."
			}
		}
	},
	REGEXMATCH: {
		description: "Xem một đoạn văn bản có khớp với một biểu thức chính quy hay không.",
		abstract: "Xem một đoạn văn bản có khớp với một biểu thức chính quy hay không.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.google.com/docs/answer/3098292?hl=vi"
		}],
		functionParameter: {
			text: {
				name: "văn bản",
				detail: "Văn bản cần thử nghiệm theo biểu thức chính quy."
			},
			regularExpression: {
				name: "biểu thức chính quy",
				detail: "Biểu thức chính quy dùng để thử nghiệm văn bản."
			}
		}
	},
	REGEXREPLACE: {
		description: "Thay thế một phần của một chuỗi văn bản bằng một chuỗi văn bản khác bằng cách sử dụng các biểu thức chính quy.",
		abstract: "Thay thế một phần của một chuỗi văn bản bằng một chuỗi văn bản khác bằng cách sử dụng các biểu thức chính quy.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.google.com/docs/answer/3098245?hl=vi"
		}],
		functionParameter: {
			text: {
				name: "văn bản",
				detail: "Văn bản, một phần của văn bản này sẽ được thay thế."
			},
			regularExpression: {
				name: "biểu thức chính quy",
				detail: "Biểu thức chính quy. Tất cả trường hợp phù hợp trong văn_bản sẽ được thay thế."
			},
			replacement: {
				name: "thay thế",
				detail: "Văn bản sẽ được chèn vào văn bản gốc."
			}
		}
	},
	REPLACE: {
		description: "Thay thế ký tự trong văn bản",
		abstract: "Thay thế ký tự trong văn bản",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/replace-function"
		}],
		functionParameter: {
			oldText: {
				name: "văn bản cũ",
				detail: "Văn bản mà bạn muốn thay thế một vài ký tự trong đó."
			},
			startNum: {
				name: "vị trí bắt đầu",
				detail: "Vị trí của ký tự đầu tiên trong văn bản cần thay thế."
			},
			numChars: {
				name: "số ký tự",
				detail: "Chỉ định số ký tự bạn muốn REPLACE thay thế."
			},
			newText: {
				name: "văn bản thay thế",
				detail: "Văn bản sẽ thay thế các ký tự trong văn bản cũ."
			}
		}
	},
	REPLACEB: {
		description: "Thay thế ký tự trong văn bản",
		abstract: "Thay thế ký tự trong văn bản",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/replace-function"
		}],
		functionParameter: {
			oldText: {
				name: "văn bản cũ",
				detail: "Văn bản mà bạn muốn thay thế một vài ký tự trong đó."
			},
			startNum: {
				name: "vị trí bắt đầu",
				detail: "Vị trí của ký tự đầu tiên trong văn bản cần thay thế."
			},
			numBytes: {
				name: "số Byte",
				detail: "Chỉ định, tính bằng byte, số lượng ký tự được thay thế bằng REPLACEB."
			},
			newText: {
				name: "văn bản thay thế",
				detail: "Văn bản sẽ thay thế các ký tự trong văn bản cũ."
			}
		}
	},
	REPT: {
		description: "Lặp lại một chuỗi văn bản một số lần đã chỉ định",
		abstract: "Lặp lại một chuỗi văn bản một số lần đã chỉ định",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/rept-function"
		}],
		functionParameter: {
			text: {
				name: "bản văn",
				detail: "Chuỗi văn bản bạn muốn lặp lại."
			},
			numberTimes: {
				name: "lần lặp lại",
				detail: "Số lần bạn muốn lặp lại văn bản."
			}
		}
	},
	RIGHT: {
		description: "Trả về một số ký tự cụ thể từ cuối của chuỗi văn bản",
		abstract: "Trả về một số ký tự cụ thể từ cuối của chuỗi văn bản",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/right-function"
		}],
		functionParameter: {
			text: {
				name: "bản văn",
				detail: "Chuỗi văn bản chứa các ký tự bạn muốn trích xuất."
			},
			numChars: {
				name: "số ký tự",
				detail: "Chỉ định số ký tự bạn muốn RIGHT trích xuất."
			}
		}
	},
	RIGHTB: {
		description: "Trả về một số ký tự cụ thể từ cuối của chuỗi văn bản",
		abstract: "Trả về một số ký tự cụ thể từ cuối của chuỗi văn bản",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/right-function"
		}],
		functionParameter: {
			text: {
				name: "bản văn",
				detail: "Chuỗi văn bản chứa các ký tự bạn muốn trích xuất."
			},
			numBytes: {
				name: "số Byte",
				detail: "Chỉ rõ số ký tự mà bạn muốn hàm RIGHTB trích xuất, dựa trên byte."
			}
		}
	},
	SEARCH: {
		description: "Trả về vị trí của một chuỗi văn bản trong một chuỗi văn bản khác (không phân biệt chữ hoa chữ thường)",
		abstract: "Trả về vị trí của một chuỗi văn bản trong một chuỗi văn bản khác (không phân biệt chữ hoa chữ thường)",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/search-function"
		}],
		functionParameter: {
			findText: {
				name: "chuỗi tìm kiếm",
				detail: "Chuỗi cần tìm trong \"Văn bản cần tìm kiếm\"."
			},
			withinText: {
				name: "văn bản để tìm kiếm",
				detail: "Lần xuất hiện đầu tiên của văn bản để tìm kiếm \"chuỗi tìm kiếm\"."
			},
			startNum: {
				name: "vị trí bắt đầu",
				detail: "Vị trí ký tự để bắt đầu tìm kiếm trong \"văn bản cần tìm kiếm\". Nếu bỏ qua, giá trị là 1 được giả định."
			}
		}
	},
	SEARCHB: {
		description: "Trả về vị trí của một chuỗi văn bản trong một chuỗi văn bản khác (không phân biệt chữ hoa chữ thường)",
		abstract: "Trả về vị trí của một chuỗi văn bản trong một chuỗi văn bản khác (không phân biệt chữ hoa chữ thường)",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/search-function"
		}],
		functionParameter: {
			findText: {
				name: "chuỗi tìm kiếm",
				detail: "Chuỗi cần tìm trong \"Văn bản cần tìm kiếm\"."
			},
			withinText: {
				name: "văn bản để tìm kiếm",
				detail: "Lần xuất hiện đầu tiên của văn bản để tìm kiếm \"chuỗi tìm kiếm\"."
			},
			startNum: {
				name: "vị trí bắt đầu",
				detail: "Vị trí ký tự để bắt đầu tìm kiếm trong \"văn bản cần tìm kiếm\". Nếu bỏ qua, giá trị là 1 được giả định."
			}
		}
	},
	SUBSTITUTE: {
		description: "Thay thế một hoặc tất cả các lần xuất hiện của một chuỗi văn bản trong một chuỗi văn bản khác",
		abstract: "Thay thế một hoặc tất cả các lần xuất hiện của một chuỗi văn bản trong một chuỗi văn bản khác",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/substitute-function"
		}],
		functionParameter: {
			text: {
				name: "bản văn",
				detail: "Văn bản hoặc tham chiếu đến ô chứa văn bản mà bạn muốn thay thế bằng ký tự."
			},
			oldText: {
				name: "tìm kiếm văn bản",
				detail: "Văn bản bạn muốn thay thế."
			},
			newText: {
				name: "văn bản thay thế",
				detail: "Văn bản bạn muốn thay thế old_text."
			},
			instanceNum: {
				name: "chỉ định đối tượng thay thế",
				detail: "Chỉ định trường hợp nào của old_text bạn muốn thay thế bằng new_text. Nếu bạn chỉ định instance_num, chỉ trường hợp đó của old_text được thay thế. Nếu không, mọi trường hợp của old_text trong text sẽ được thay đổi thành new_text."
			}
		}
	},
	T: {
		description: "Chuyển đổi tham số thành văn bản",
		abstract: "Chuyển đổi tham số thành văn bản",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/t-function"
		}],
		functionParameter: { value: {
			name: "giá trị",
			detail: "Giá trị mà bạn muốn kiểm tra."
		} }
	},
	TEXT: {
		description: "Định dạng và chuyển đổi số thành văn bản",
		abstract: "Định dạng và chuyển đổi số thành văn bản",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/text-function"
		}],
		functionParameter: {
			value: {
				name: "giá trị",
				detail: "Giá trị số mà bạn muốn được chuyển đổi thành văn bản."
			},
			formatText: {
				name: "định dạng văn bản",
				detail: "Một chuỗi văn bản xác định định dạng mà bạn muốn được áp dụng cho giá trị được cung cấp."
			}
		}
	},
	TEXTAFTER: {
		description: "Trả về văn bản xuất hiện sau ký tự hoặc chuỗi đã cho.",
		abstract: "Trả về văn bản xuất hiện sau ký tự hoặc chuỗi đã cho.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/textafter-function"
		}],
		functionParameter: {
			text: {
				name: "bản văn",
				detail: "Văn bản bạn đang tìm kiếm bên trong. Ký tự đại diện không được phép."
			},
			delimiter: {
				name: "dấu tách",
				detail: "Văn bản đánh dấu điểm sau đó bạn muốn trích xuất."
			},
			instanceNum: {
				name: "số phiên bản",
				detail: "Phiên bản của dấu tách sau đó bạn muốn trích xuất văn bản."
			},
			matchMode: {
				name: "mẫu khớp",
				detail: "Xác định xem tìm kiếm văn bản có phân biệt chữ hoa chữ thường hay không. Mặc định là phân biệt chữ hoa, chữ thường."
			},
			matchEnd: {
				name: "trận đấu ở cuối",
				detail: "Coi phần cuối văn bản là dấu tách. Theo mặc định, văn bản là kết quả khớp chính xác."
			},
			ifNotFound: {
				name: "giá trị chưa khớp",
				detail: "Giá trị được trả về nếu không tìm thấy kết quả khớp. Theo mặc định, #N/A được trả về."
			}
		}
	},
	TEXTBEFORE: {
		description: "Trả về văn bản xuất hiện trước một ký tự hoặc chuỗi đã cho.",
		abstract: "Trả về văn bản xuất hiện trước một ký tự hoặc chuỗi đã cho.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/textbefore-function"
		}],
		functionParameter: {
			text: {
				name: "bản văn",
				detail: "Văn bản bạn đang tìm kiếm bên trong. Ký tự đại diện không được phép."
			},
			delimiter: {
				name: "dấu tách",
				detail: "Văn bản đánh dấu điểm sau đó bạn muốn trích xuất."
			},
			instanceNum: {
				name: "số phiên bản",
				detail: "Phiên bản của dấu tách sau đó bạn muốn trích xuất văn bản."
			},
			matchMode: {
				name: "mẫu khớp",
				detail: "Xác định xem tìm kiếm văn bản có phân biệt chữ hoa chữ thường hay không. Mặc định là phân biệt chữ hoa, chữ thường."
			},
			matchEnd: {
				name: "trận đấu ở cuối",
				detail: "Coi phần cuối văn bản là dấu tách. Theo mặc định, văn bản là kết quả khớp chính xác."
			},
			ifNotFound: {
				name: "giá trị chưa khớp",
				detail: "Giá trị được trả về nếu không tìm thấy kết quả khớp. Theo mặc định, #N/A được trả về."
			}
		}
	},
	TEXTJOIN: {
		description: "Kết hợp nhiều chuỗi văn bản thành một chuỗi, với dấu phân cách giữa các phần tử",
		abstract: "Kết hợp nhiều chuỗi văn bản thành một chuỗi, với dấu phân cách giữa các phần tử",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/textjoin-function"
		}],
		functionParameter: {
			delimiter: {
				name: "dấu tách",
				detail: "Một chuỗi văn bản, trống hoặc có một hay nhiều ký tự nằm giữa các dấu ngoặc kép hay một tham chiếu tới một chuỗi văn bản hợp lệ."
			},
			ignoreEmpty: {
				name: "bỏ qua các ô trống",
				detail: "Nếu TRUE, hãy bỏ qua các ô trống."
			},
			text1: {
				name: "bản văn 1",
				detail: "Mục văn bản cần kết hợp. Một chuỗi văn bản hoặc xâu chuỗi, chẳng hạn như một phạm vi ô."
			},
			text2: {
				name: "bản văn 2",
				detail: "Các mục văn bản bổ sung cần kết hợp. Có thể có tối đa 252 tham đối văn bản cho các mục văn bản, bao gồm text1. Mỗi tham đối có thể là một chuỗi văn bản hoặc xâu chuỗi, chẳng hạn như phạm vi ô."
			}
		}
	},
	TEXTSPLIT: {
		description: "Tách chuỗi văn bản bằng cách dùng dấu tách cột và hàng.",
		abstract: "Tách chuỗi văn bản bằng cách dùng dấu tách cột và hàng.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/textsplit-function"
		}],
		functionParameter: {
			text: {
				name: "bản văn",
				detail: "Văn bản bạn muốn tách."
			},
			colDelimiter: {
				name: "dấu phân cách cột",
				detail: "Ký tự hoặc chuỗi dùng để phân chia cột."
			},
			rowDelimiter: {
				name: "dấu phân cách dòng",
				detail: "Ký tự hoặc chuỗi dùng để phân chia các hàng."
			},
			ignoreEmpty: {
				name: "bỏ qua các ô trống",
				detail: "Có bỏ qua các ô trống hay không. Mặc định là FALSE."
			},
			matchMode: {
				name: "mẫu khớp",
				detail: "Xác định xem tìm kiếm văn bản có phân biệt chữ hoa chữ thường hay không. Mặc định là phân biệt chữ hoa, chữ thường."
			},
			padWith: {
				name: "điền giá trị",
				detail: "Giá trị được sử dụng cho phần đệm. Theo mặc định, #N/A được sử dụng."
			}
		}
	},
	TRIM: {
		description: "Loại bỏ tất cả khoảng trống ra khỏi văn bản, chỉ để lại một khoảng trống giữa các từ.",
		abstract: "Xóa khoảng trắng khỏi văn bản",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/trim-function"
		}],
		functionParameter: { text: {
			name: "bản văn",
			detail: "Văn bản bạn muốn loại bỏ các khoảng trống."
		} }
	},
	UNICHAR: {
		description: "Trả về ký tự Unicode tương ứng với một số đã chỉ định",
		abstract: "Trả về ký tự Unicode tương ứng với một số đã chỉ định",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/unichar-function"
		}],
		functionParameter: { number: {
			name: "số",
			detail: "Số là số Unicode biểu diễn ký tự."
		} }
	},
	UNICODE: {
		description: "Trả về số Unicode tương ứng với ký tự đầu tiên của văn bản",
		abstract: "Trả về số Unicode tương ứng với ký tự đầu tiên của văn bản",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/unicode-function"
		}],
		functionParameter: { text: {
			name: "bản văn",
			detail: "Văn bản là ký tự mà bạn muốn có giá trị Unicode."
		} }
	},
	UPPER: {
		description: "Chuyển đổi tất cả các chữ cái trong văn bản thành chữ hoa",
		abstract: "Chuyển đổi tất cả các chữ cái trong văn bản thành chữ hoa",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/upper-function"
		}],
		functionParameter: { text: {
			name: "bản văn",
			detail: "Văn bản bạn muốn chuyển đổi thành chữ hoa."
		} }
	},
	VALUE: {
		description: "Chuyển đổi chuỗi văn bản thành số",
		abstract: "Chuyển đổi chuỗi văn bản thành số",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/value-function"
		}],
		functionParameter: { text: {
			name: "bản văn",
			detail: "Văn bản được đặt trong dấu ngoặc kép hoặc tham chiếu đến ô chứa văn bản bạn muốn chuyển đổi."
		} }
	},
	VALUETOTEXT: {
		description: "Trả về văn bản từ bất kỳ giá trị nào được chỉ định.",
		abstract: "Trả về văn bản từ bất kỳ giá trị nào được chỉ định.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/valuetotext-function"
		}],
		functionParameter: {
			value: {
				name: "giá trị",
				detail: "Giá trị cần trả về dưới dạng văn bản."
			},
			format: {
				name: "Định dạng của dữ",
				detail: "Định dạng của dữ liệu trả về. Nó có thể là một trong hai giá trị: \n0 Mặc định. Định dạng ngắn gọn dễ đọc.\n1 Định dạng nghiêm ngặt bao gồm ký tự thoát và dấu tách hàng. Tạo một chuỗi có thể được phân tích khi nhập vào thanh công thức. Đóng gói các chuỗi trả về trong dấu ngoặc kép, ngoại trừ Booleans, Numbers và Errors."
			}
		}
	},
	CALL: {
		description: "Gọi một thủ tục trong một thư viện liên kết động hoặc nguồn mã. Có hai mẫu cú pháp của hàm này. Chỉ dùng cú pháp 1 với tài nguyên mã đã đăng ký trước đây dùng đối số từ hàm REGISTER. Dùng cú pháp 2a hoặc 2b để đăng ký và gọi tài nguyên mã đồng thời.",
		abstract: "Gọi một thủ tục trong một thư viện liên kết động hoặc nguồn mã. Có hai mẫu cú pháp của hàm này. Chỉ dùng cú pháp 1 với tài nguyên mã đã đăng ký trước đây dùng đối số từ hàm REGISTER. Dùng cú pháp 2a hoặc 2b để đăng ký và gọi tài nguyên mã đồng thời.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/vi-vn/excel/functions/call-function"
		}],
		functionParameter: {
			moduleText: {
				name: "Module_text",
				detail: "Yêu cầu. Văn bản được trích dẫn xác định tên thư viện nối kết động (DLL) chứa thủ tục trong Microsoft Excel cho Windows."
			},
			procedure: {
				name: "Thủ tục",
				detail: "Yêu cầu. Văn bản chỉ rõ tên hàm trong DLL trong Microsoft Excel cho Windows. Bạn cũng có thể dùng giá trị số thứ tự của hàm từ báo cáo EXPORTS trong tệp định nghĩa mô-đun (.DEF). Giá trị số thứ tự không được ở dạng văn bản."
			},
			typeText: {
				name: "Type_text",
				detail: "Yêu cầu. Văn bản xác định kiểu dữ liệu của giá trị trả về và kiểu dữ liệu của tất cả các đối số cho DLL hoặc tài nguyên mã. Chữ đầu tiên trong kiểu văn bản xác định giá trị trả về. Mã bạn dùng cho kiểu văn bản được mô tả chi tiết trong Dùng hàm CALL và REGISTER . Đối với các DLL hay tài nguyên mã (XLL) riêng lẻ, bạn có thể bỏ qua đối số này."
			},
			argument1: {
				name: "Đối số 1,...",
				detail: "Tùy chọn. Các đối số sẽ được chuyển đến thủ tục."
			}
		}
	},
	EUROCONVERT: {
		description: "Quy đổi một số sang euro, quy đổi một số từ euro sang đồng tiền của nước thành viên liên minh châu Âu hoặc quy đổi một số từ đồng tiền của nước thành viên liên minh châu Âu sang nước khác bằng cách dùng euro làm đồng tiền trung gian (phép đạc tam giác). Các đồng tiền có thể quy đổi là đồng tiền của các nước thành viên Liên minh châu Âu (EU) đã đưa vào sử dụng đồng euro. Hàm này dùng các tỉ giá quy đổi ấn định do EU đặt ra.",
		abstract: "Quy đổi một số sang euro, quy đổi một số từ euro sang đồng tiền của nước thành viên liên minh châu Âu hoặc quy đổi một số từ đồng tiền của nước thành viên liên minh châu Âu sang nước khác bằng cách dùng euro làm đồng tiền trung gian (phép đạc tam giác). Các đồng tiền có thể quy đổi là đồng tiền của các nước thành viên Liên minh châu Âu (EU) đã đưa vào sử dụng đồng euro. Hàm này dùng các tỉ giá quy đổi ấn định do EU đặt ra.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/vi-vn/excel/functions/euroconvert-function"
		}],
		functionParameter: {
			number: {
				name: "Number",
				detail: "Bắt buộc. Giá trị tiền tệ mà bạn muốn quy đổi hoặc tham chiếu đến ô chứa giá trị."
			},
			source: {
				name: "Nguồn",
				detail: "Yêu cầu. Chuỗi ba chữ cái hoặc tham chiếu đến ô chứa chuỗi đó, tương ứng với mã ISO cho đồng tiền nguồn. Các mã tiền tệ sau đây sẵn dùng trong hàm EUROCONVERT:"
			},
			target: {
				name: "Mục tiêu",
				detail: "Yêu cầu. Chuỗi ba chữ cái hoặc tham chiếu ô, tương ứng với mã ISO của đồng tiền mà bạn muốn quy đổi đối số number sang đồng tiền đó. Hãy xem bảng Source ở trước để biết mã ISO."
			},
			fullPrecision: {
				name: "Full_precision",
				detail: "Yêu cầu. Giá trị lô-gic (TRUE hoặc FALSE) hoặc biểu thức trả về giá trị TRUE hoặc FALSE, xác định cách hiển thị kết quả."
			},
			triangulationPrecision: {
				name: "Triangulation_precision",
				detail: "Yêu cầu. Số nguyên bằng hoặc lớn hơn 3 xác định số chữ số có nghĩa được dùng cho giá trị euro trung gian khi quy đổi giữa hai đồng tiền của nước thành viên liên minh châu Âu. Nếu bạn bỏ qua đối số này, Excel không làm tròn giá trị euro trung gian. Nếu bạn đưa đối số này vào khi quy đổi từ đồng tiền của nước thành viên châu Âu sang đồng euro, Excel sẽ tính toán giá trị euro trung gian có thể được quy đổi sang đồng tiền của nước thành viên liên minh châu Âu sau đó."
			}
		}
	},
	REGISTER_ID: {
		description: "Trả về ID đăng ký của thư viện nối kết động chỉ định (DLL) hoặc nguồn mã đã được đăng ký trước đó. Nếu DLL hoặc nguồn mã chưa được đăng ký, thì hàm này đăng ký DLL hoặc nguồn mã rồi trả về ID đăng ký.",
		abstract: "Trả về ID đăng ký của thư viện nối kết động chỉ định (DLL) hoặc nguồn mã đã được đăng ký trước đó. Nếu DLL hoặc nguồn mã chưa được đăng ký, thì hàm này đăng ký DLL hoặc nguồn mã rồi trả về ID đăng ký.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/vi-vn/excel/functions/register-id-function"
		}],
		functionParameter: {
			moduleText: {
				name: "Module_text",
				detail: "Yêu cầu. Văn bản chỉ rõ tên của DLL có chứa hàm trong Microsoft Excel cho Windows."
			},
			procedure: {
				name: "Thủ tục",
				detail: "Yêu cầu. Văn bản chỉ rõ tên hàm trong DLL trong Microsoft Excel cho Windows. Bạn cũng có thể dùng giá trị thứ tự của hàm từ câu lệnh EXPORT trong tệp định nghĩa mô-đun (.DEF). Giá trị thứ tự hoặc số ID nguồn không được có dạng văn bản."
			},
			typeText: {
				name: "Type_text",
				detail: "Tùy chọn. Văn bản chỉ định kiểu dữ liệu của giá trị trả về và kiểu dữ liệu của tất cả các đối số cho DLL. Chữ thứ nhất của đối số nhập_văn bản chỉ rõ giá trị trả về. Nếu hàm hoặc nguồn mã đã được đăng ký, thì bạn có thể bỏ qua đối số này."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/univer/vi-VN.ts
const locale$2 = {};

//#endregion
//#region src/locale/function-list/web/vi-VN.ts
const locale$1 = {
	ENCODEURL: {
		description: "Hàm ENCODEURL trả về một chuỗi được mã hóa URL, thay thế một số ký tự không phải là chữ và số bằng ký hiệu phần trăm (%) và một số thập lục phân.",
		abstract: "Hàm ENCODEURL trả về một chuỗi được mã hóa URL, thay thế một số ký tự không phải là chữ và số bằng ký hiệu phần trăm (%) và một số thập lục phân.",
		links: [{
			title: "Hướng dẫn",
			url: "https://support.microsoft.com/vi-vn/excel/functions/encodeurl-function"
		}],
		functionParameter: { text: {
			name: "văn bản",
			detail: "Một chuỗi cần mã hóa URL"
		} }
	},
	FILTERXML: {
		description: "Hàm FILTERXML trả về dữ liệu cụ thể từ nội dung XML bằng cách sử dụng xpath đã xác định.",
		abstract: "Hàm FILTERXML trả về dữ liệu cụ thể từ nội dung XML bằng cách sử dụng xpath đã xác định.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/vi-vn/excel/functions/filterxml-function"
		}],
		functionParameter: {
			xml: {
				name: "xml",
				detail: "Một chuỗi ở định dạng XML hợp lệ."
			},
			xpath: {
				name: "xpath",
				detail: "Một chuỗi ở định dạng XPath chuẩn."
			}
		}
	},
	WEBSERVICE: {
		description: "Hàm WEBSERVICE trả về dữ liệu từ một dịch vụ web trên Internet hoặc Intranet.",
		abstract: "Hàm WEBSERVICE trả về dữ liệu từ một dịch vụ web trên Internet hoặc Intranet.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/vi-vn/excel/functions/webservice-function"
		}],
		functionParameter: { url: {
			name: "url",
			detail: "URL của dịch vụ web."
		} }
	}
};

//#endregion
//#region src/locale/vi-VN.ts
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