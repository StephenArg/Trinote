//#region src/locale/function-list/array/pl-PL.ts
const locale$15 = {
	ARRAY_CONSTRAIN: {
		description: "Ogranicza wynik tablicowy do określonego rozmiaru.",
		abstract: "Ogranicza wynik tablicowy do określonego rozmiaru.",
		links: [{
			title: "Instrukcje",
			url: "https://support.google.com/docs/answer/3267036?hl=pl"
		}],
		functionParameter: {
			inputRange: {
				name: "zakres_wejściowy",
				detail: "Zakres, który ma zostać ograniczony."
			},
			numRows: {
				name: "liczba_wierszy",
				detail: "Liczba wierszy, które ma zawierać wynik."
			},
			numCols: {
				name: "liczba_kolumn",
				detail: "Liczba kolumn, które ma zawierać wynik."
			}
		}
	},
	FLATTEN: {
		description: "Spłaszcza wszystkie wartości z co najmniej jednego zakresu do jednej kolumny.",
		abstract: "Spłaszcza wszystkie wartości z co najmniej jednego zakresu do jednej kolumny.",
		links: [{
			title: "Instrukcje",
			url: "https://support.google.com/docs/answer/10307761?hl=pl"
		}],
		functionParameter: {
			range1: {
				name: "zakres1",
				detail: "Pierwszy zakres do spłaszczenia."
			},
			range2: {
				name: "zakres2",
				detail: "[opcjonalny, powtarzalny] Dodatkowe zakresy do spłaszczenia."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/compatibility/pl-PL.ts
const locale$14 = {
	BETADIST: {
		description: "Zwraca skumulowaną funkcję gęstości prawdopodobieństwa beta. Rozkładu beta używa się zazwyczaj w badaniu zmian zawartości procentowych w próbkach, na przykład części doby spędzanej przez ludzi na oglądaniu telewizji.",
		abstract: "Zwraca skumulowaną funkcję gęstości prawdopodobieństwa beta. Rozkładu beta używa się zazwyczaj w badaniu zmian zawartości procentowych w próbkach, na przykład części doby spędzanej przez ludzi na oglądaniu telewizji.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/betadist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Argument wymagany. Wartość między A a B, dla której określa się funkcję."
			},
			alpha: {
				name: "alpha",
				detail: "Wymagane. Parametr rozkładu."
			},
			beta: {
				name: "beta",
				detail: "Wymagane. Parametr rozkładu."
			},
			A: {
				name: "A",
				detail: "opcjonalny. Dolne ograniczenie interwału wartości x."
			},
			B: {
				name: "B",
				detail: "Argument opcjonalny. Górne ograniczenie interwału wartości x."
			}
		}
	},
	BETAINV: {
		description: "Zwraca odwrotność skumulowanej funkcji gęstości prawdopodobieństwa beta. Oznacza to, że jeśli prawdopodobieństwo = ROZKŁAD.BETA(x;...), wówczas ROZKŁAD.BETA.ODW(prawdopodobieństwo;...) = x. Rozkład beta może być używany w planowaniu projektów do modelowania możliwych czasów ukończenia przy danym oczekiwanym czasie ukończenia i jego zmienności.",
		abstract: "Zwraca odwrotność skumulowanej funkcji gęstości prawdopodobieństwa beta. Oznacza to, że jeśli prawdopodobieństwo = ROZKŁAD.BETA(x;...), wówczas ROZKŁAD.BETA.ODW(prawdopodobieństwo;...) = x. Rozkład beta może być używany w planowaniu projektów do modelowania możliwych czasów ukończenia przy danym oczekiwanym czasie ukończenia i jego zmienności.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/betainv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Wymagane. Prawdopodobieństwo skojarzone z rozkładem beta."
			},
			alpha: {
				name: "alpha",
				detail: "Wymagane. Parametr rozkładu."
			},
			beta: {
				name: "beta",
				detail: "Wymagane. Parametr rozkładu."
			},
			A: {
				name: "A",
				detail: "opcjonalny. Dolne ograniczenie interwału wartości x."
			},
			B: {
				name: "B",
				detail: "Argument opcjonalny. Górne ograniczenie interwału wartości x."
			}
		}
	},
	BINOMDIST: {
		description: "Zwraca wartość pojedynczego składnika dwumianowego rozkładu prawdopodobieństwa. Funkcję ROZKŁAD.DWUM należy stosować do rozwiązywania problemów, w których występuje stała liczba testów lub prób, wynik każdej próby może być tylko sukcesem lub porażką, próby są niezależne, a prawdopodobieństwo sukcesu jest stałe w trakcie eksperymentu. Przykładowo funkcja ROZKŁAD.DWUM może obliczyć prawdopodobieństwo, że z trojga następnych nowo narodzonych dzieci dwoje będzie płci męskiej.",
		abstract: "Zwraca wartość pojedynczego składnika dwumianowego rozkładu prawdopodobieństwa. Funkcję ROZKŁAD.DWUM należy stosować do rozwiązywania problemów, w których występuje stała liczba testów lub prób, wynik każdej próby może być tylko sukcesem lub porażką, próby są niezależne, a prawdopodobieństwo sukcesu jest stałe w trakcie eksperymentu. Przykładowo funkcja ROZKŁAD.DWUM może obliczyć prawdopodobieństwo, że z trojga następnych nowo narodzonych dzieci dwoje będzie płci męskiej.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/binomdist-function"
		}],
		functionParameter: {
			numberS: {
				name: "number_s",
				detail: "Wymagane. Liczba sukcesów w próbach."
			},
			trials: {
				name: "trials",
				detail: "Wymagane. Liczba niezależnych prób."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Wymagane. Prawdopodobieństwo sukcesu w każdej próbie."
			},
			cumulative: {
				name: "cumulative",
				detail: "Wymagane. Wartość logiczna, która określa postać funkcji. Jeśli argument „skumulowany” ma wartość PRAWDA, funkcja ROZKŁAD.DWUM zwraca funkcję rozkładu skumulowanego, czyli prawdopodobieństwo, że zachodzi co najwyżej liczba_s sukcesów; jeśli FAŁSZ, zwraca funkcję masy prawdopodobieństwa, czyli prawdopodobieństwo, że zajdzie liczba_s sukcesów."
			}
		}
	},
	CHIDIST: {
		description: "Zwraca wartość prawostronnego prawdopodobieństwa rozkładu chi-kwadrat. Rozkład χ2 jest skojarzony z testem χ2. Test χ2 służy do porównywania wartości obserwowanych i przewidywanych. Na przykład eksperyment genetyczny może mieć hipotezę, że następne pokolenie roślin będzie w określonym zestawie kolorów. Przez porównanie wyników obserwowanych z wynikami oczekiwanymi można określić prawidłowość hipotezy.",
		abstract: "Zwraca wartość prawostronnego prawdopodobieństwa rozkładu chi-kwadrat. Rozkład χ2 jest skojarzony z testem χ2. Test χ2 służy do porównywania wartości obserwowanych i przewidywanych. Na przykład eksperyment genetyczny może mieć hipotezę, że następne pokolenie roślin będzie w określonym zestawie kolorów. Przez porównanie wyników obserwowanych z wynikami oczekiwanymi można określić prawidłowość hipotezy.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/chidist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Argument wymagany. Wartość, przy której ma być szacowany rozkład."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Argument wymagany. Liczba stopni swobody."
			}
		}
	},
	CHIINV: {
		description: "Zwraca odwrotność prawostronnego prawdopodobieństwa rozkładu chi-kwadrat. Jeśli prawdopodobieństwo = ROZKŁAD.CHI(x;...), to ROZKŁAD.CHI.ODW(prawdopodobieństwo;...) = x. Ta funkcja służy do porównywania wyników obserwowanych z wynikami spodziewanymi w celu określenia, czy hipoteza jest prawidłowa.",
		abstract: "Zwraca odwrotność prawostronnego prawdopodobieństwa rozkładu chi-kwadrat. Jeśli prawdopodobieństwo = ROZKŁAD.CHI(x;...), to ROZKŁAD.CHI.ODW(prawdopodobieństwo;...) = x. Ta funkcja służy do porównywania wyników obserwowanych z wynikami spodziewanymi w celu określenia, czy hipoteza jest prawidłowa.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/chiinv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Wymagane. Prawdopodobieństwo skojarzone z rozkładem chi-kwadrat."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Wymagane. Liczba stopni swobody."
			}
		}
	},
	CHITEST: {
		description: "Zwraca wartość testu niezależności. Funkcja TEST.CHI zwraca wartość rozkładu chi-kwadrat (χ2) statystyki i stosownych stopni swobody. Testu χ2 można używać do określania, czy dane eksperymentalne potwierdzają przewidywania wynikające z hipotezy.",
		abstract: "Zwraca wartość testu niezależności. Funkcja TEST.CHI zwraca wartość rozkładu chi-kwadrat (χ2) statystyki i stosownych stopni swobody. Testu χ2 można używać do określania, czy dane eksperymentalne potwierdzają przewidywania wynikające z hipotezy.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/chitest-function"
		}],
		functionParameter: {
			actualRange: {
				name: "actual_range",
				detail: "Wymagane. Zakres danych zawierający wartości obserwowane, które należy porównać z wartościami przewidywanymi."
			},
			expectedRange: {
				name: "expected_range",
				detail: "Wymagane. Zakres danych zawierający współczynnik iloczynu sum wierszy i sum kolumn do sumy końcowej."
			}
		}
	},
	CONFIDENCE: {
		description: "Zwraca przedział ufności dla średniej z populacji z rozkładem normalnym.",
		abstract: "Zwraca przedział ufności dla średniej z populacji z rozkładem normalnym.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/confidence-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "Wymagane. Poziom istotności używany do obliczania poziomu ufności. Poziom ufności jest równy 100*(1 – alfa)%, czyli wartość alfa równa 0,05 wskazuje poziom ufności 95%."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Wymagane. Odchylenie standardowe dla zakresu danych, które z założenia jest znane."
			},
			size: {
				name: "size",
				detail: "Wymagane. Wielkość próby."
			}
		}
	},
	COVAR: {
		description: "Zwraca kowariancję, czyli średnią iloczynów odchyleń dla każdej pary punktów danych w dwóch zbiorach danych.",
		abstract: "Zwraca kowariancję, czyli średnią iloczynów odchyleń dla każdej pary punktów danych w dwóch zbiorach danych.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/covar-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Wymagane. Pierwszy zakres komórek zawierających liczby całkowite."
			},
			array2: {
				name: "array2",
				detail: "Wymagane. Drugi zakres komórek zawierających liczby całkowite."
			}
		}
	},
	CRITBINOM: {
		description: "Zwraca najmniejszą wartość, dla której skumulowany rozkład dwumianowy jest większy lub równy wartości kryterium. Funkcji tej należy używać w aplikacjach badających niezawodność. Na przykład funkcji PRÓG.ROZKŁAD.DWUM można użyć do wyznaczenia największej liczby wadliwych części, jakie mogą zejść z linii montażowej bez odrzucenia całej serii produktów.",
		abstract: "Zwraca najmniejszą wartość, dla której skumulowany rozkład dwumianowy jest większy lub równy wartości kryterium. Funkcji tej należy używać w aplikacjach badających niezawodność. Na przykład funkcji PRÓG.ROZKŁAD.DWUM można użyć do wyznaczenia największej liczby wadliwych części, jakie mogą zejść z linii montażowej bez odrzucenia całej serii produktów.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/critbinom-function"
		}],
		functionParameter: {
			trials: {
				name: "trials",
				detail: "Wymagane. Liczba prób Bernoulliego."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Wymagane. Prawdopodobieństwo sukcesu w każdej próbie."
			},
			alpha: {
				name: "alpha",
				detail: "Wymagane. Wartość kryterium."
			}
		}
	},
	EXPONDIST: {
		description: "Zwraca skumulowaną funkcję (dystrybuantę) rozkładu wykładniczego. Funkcja ROZKŁAD.EXP umożliwia modelowanie upływu czasu między zdarzeniami, np. czasu oczekiwania na wypłatę gotówki z bankomatu. Można na przykład użyć funkcji ROZKŁAD.EXP do wyznaczenia prawdopodobieństwa, że zajmie to najwyżej jedną minutę.",
		abstract: "Zwraca skumulowaną funkcję (dystrybuantę) rozkładu wykładniczego. Funkcja ROZKŁAD.EXP umożliwia modelowanie upływu czasu między zdarzeniami, np. czasu oczekiwania na wypłatę gotówki z bankomatu. Można na przykład użyć funkcji ROZKŁAD.EXP do wyznaczenia prawdopodobieństwa, że zajmie to najwyżej jedną minutę.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/expondist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Argument wymagany. Wartość funkcji."
			},
			lambda: {
				name: "lambda",
				detail: "Wymagane. Wartość parametru."
			},
			cumulative: {
				name: "cumulative",
				detail: "Wymagane. Wartość logiczna określająca postać funkcji wykładniczej, która ma zostać podana. Jeśli argument „skumulowany” ma wartość PRAWDA, funkcja ROZKŁAD.EXP zwraca funkcję rozkładu skumulowanego, a jeśli FAŁSZ — funkcję gęstości prawdopodobieństwa."
			}
		}
	},
	FDIST: {
		description: "Zwraca wartość (prawostronnego) rozkładu prawdopodobieństwa F-Snedecora (stopień zróżnicowania) dla dwóch zestawów danych. Ta funkcja służy do określania, czy dwa zbiory danych mają różne stopnie zróżnicowania. Można na przykład sprawdzić wyniki testów uzyskane przez chłopców i dziewczęta zdające do szkoły średniej i określić, czy zmienność wyników uzyskanych przez dziewczęta różni się od zmienności wyników chłopców.",
		abstract: "Zwraca wartość (prawostronnego) rozkładu prawdopodobieństwa F-Snedecora (stopień zróżnicowania) dla dwóch zestawów danych. Ta funkcja służy do określania, czy dwa zbiory danych mają różne stopnie zróżnicowania. Można na przykład sprawdzić wyniki testów uzyskane przez chłopców i dziewczęta zdające do szkoły średniej i określić, czy zmienność wyników uzyskanych przez dziewczęta różni się od zmienności wyników chłopców.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/fdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Argument wymagany. Wartość, dla której ta funkcja ma zostać obliczona."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Wymagane. Wartość stopni swobody w liczniku."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Wymagane. Wartość stopni swobody w mianowniku."
			}
		}
	},
	FINV: {
		description: "Zwraca wartość funkcji odwrotnej rozkładu (prawostronnego) prawdopodobieństwa F-Snedecora. Jeśli p=ROZKŁAD.F(x;...), to ROZKŁAD.F.ODW(p;...)=x.",
		abstract: "Zwraca wartość funkcji odwrotnej rozkładu (prawostronnego) prawdopodobieństwa F-Snedecora. Jeśli p=ROZKŁAD.F(x;...), to ROZKŁAD.F.ODW(p;...)=x.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/finv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Wymagane. Prawdopodobieństwo skojarzone ze skumulowanym rozkładem F."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Wymagane. Wartość stopni swobody w liczniku."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Wymagane. Wartość stopni swobody w mianowniku."
			}
		}
	},
	FTEST: {
		description: "Zwraca wynik testu F. Test F zwraca dwustronne prawdopodobieństwo, że wariancje w tablicach tablica1 i tablica2 nie różnią się znacząco. Funkcja umożliwia określenie, czy dwie próbki mają różne wariancje. Na przykład, mając wyniki testów ze szkół prywatnych i publicznych, można sprawdzić, czy w tych szkołach występują różne poziomy zróżnicowania wyników.",
		abstract: "Zwraca wynik testu F. Test F zwraca dwustronne prawdopodobieństwo, że wariancje w tablicach tablica1 i tablica2 nie różnią się znacząco. Funkcja umożliwia określenie, czy dwie próbki mają różne wariancje. Na przykład, mając wyniki testów ze szkół prywatnych i publicznych, można sprawdzić, czy w tych szkołach występują różne poziomy zróżnicowania wyników.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/ftest-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Wymagane. Pierwsza tablica lub pierwszy zakres danych."
			},
			array2: {
				name: "array2",
				detail: "Wymagane. Druga tablica lub drugi zakres danych."
			}
		}
	},
	GAMMADIST: {
		description: "Zwraca rozkład gamma. Funkcja ta umożliwia badanie zmiennych, które mogą mieć rozkład skośny. Rozkład gamma jest powszechnie stosowany w analizie kolejek.",
		abstract: "Zwraca rozkład gamma. Funkcja ta umożliwia badanie zmiennych, które mogą mieć rozkład skośny. Rozkład gamma jest powszechnie stosowany w analizie kolejek.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/gammadist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Argument wymagany. Wartość, przy której ma być szacowany rozkład."
			},
			alpha: {
				name: "alpha",
				detail: "Argument wymagany. Parametr rozkładu."
			},
			beta: {
				name: "beta",
				detail: "Argument wymagany. Parametr rozkładu. Jeśli wartość argumentu beta = 1, funkcja ROZKŁAD.GAMMA zwraca standardowy rozkład gamma."
			},
			cumulative: {
				name: "cumulative",
				detail: "Argument wymagany. Wartość logiczna, która określa postać funkcji. Jeśli wartością argumentu „skumulowany” jest PRAWDA, funkcja ROZKŁAD.GAMMA zwraca funkcję rozkładu skumulowanego, a jeśli FAŁSZ — funkcję gęstości prawdopodobieństwa."
			}
		}
	},
	GAMMAINV: {
		description: "Zwraca funkcję odwrotną skumulowanego rozkładu gamma. Jeśli p = ROZKŁAD.GAMMA(x;...), to ROZKŁAD.GAMMA.ODW(p;...) = x. Funkcja ta jest przydatna w badaniu zmiennej, której rozkład może być skośny.",
		abstract: "Zwraca funkcję odwrotną skumulowanego rozkładu gamma. Jeśli p = ROZKŁAD.GAMMA(x;...), to ROZKŁAD.GAMMA.ODW(p;...) = x. Funkcja ta jest przydatna w badaniu zmiennej, której rozkład może być skośny.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/gammainv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Wymagane. Prawdopodobieństwo związane z rozkładem gamma."
			},
			alpha: {
				name: "alpha",
				detail: "Wymagane. Parametr rozkładu."
			},
			beta: {
				name: "beta",
				detail: "Wymagane. Parametr rozkładu. Jeśli wartość argumentu beta = 1, funkcja ROZKŁAD.GAMMA.ODW zwraca standardowy rozkład gamma."
			}
		}
	},
	HYPGEOMDIST: {
		description: "Zwraca rozkład hipergeometryczny. Funkcja ROZKŁAD.HIPERGEOM zwraca prawdopodobieństwo sukcesów danej liczby próbek przy podanym rozmiarze próbki oraz podanych sukcesach populacji i rozmiarze populacji. Funkcję ROZKŁAD.HIPERGEOM należy stosować do rozwiązywania zagadnień dotyczących skończonej populacji, gdzie każda obserwacja jest sukcesem albo porażką i gdzie każdy podzbiór o podanej wielkości wybierany jest z jednakowym prawdopodobieństwem.",
		abstract: "Zwraca rozkład hipergeometryczny. Funkcja ROZKŁAD.HIPERGEOM zwraca prawdopodobieństwo sukcesów danej liczby próbek przy podanym rozmiarze próbki oraz podanych sukcesach populacji i rozmiarze populacji. Funkcję ROZKŁAD.HIPERGEOM należy stosować do rozwiązywania zagadnień dotyczących skończonej populacji, gdzie każda obserwacja jest sukcesem albo porażką i gdzie każdy podzbiór o podanej wielkości wybierany jest z jednakowym prawdopodobieństwem.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/hypgeomdist-function"
		}],
		functionParameter: {
			sampleS: {
				name: "sample_s",
				detail: "Wymagane. Liczba sukcesów w próbce."
			},
			numberSample: {
				name: "number_sample",
				detail: "Wymagane. Wielkość próbki."
			},
			populationS: {
				name: "population_s",
				detail: "Wymagane. Liczba sukcesów w populacji."
			},
			numberPop: {
				name: "number_pop",
				detail: "Wymagane. Wielkość populacji."
			}
		}
	},
	LOGINV: {
		description: "Zwraca wartość funkcji odwrotnej skumulowanego rozkładu logarytmiczno-normalnego x, gdzie ln(x) ma rozkład normalny z parametrami wartość_oczekiwana i odchylenie_std. Jeśli p = ROZKŁAD.LOG(x;...), to ROZKŁAD.LOG.ODW(p;...) = x.",
		abstract: "Zwraca wartość funkcji odwrotnej skumulowanego rozkładu logarytmiczno-normalnego x, gdzie ln(x) ma rozkład normalny z parametrami wartość_oczekiwana i odchylenie_std. Jeśli p = ROZKŁAD.LOG(x;...), to ROZKŁAD.LOG.ODW(p;...) = x.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/loginv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Wymagane. Prawdopodobieństwo skojarzone z rozkładem logarytmiczno-normalnym."
			},
			mean: {
				name: "mean",
				detail: "Wymagane. Wartość średnia ln(x)."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Wymagane. Odchylenie standardowe ln(x)."
			}
		}
	},
	LOGNORMDIST: {
		description: "Oblicza skumulowany rozkład logarytmiczno-normalny x, gdzie ln(x) ma rozkład normalny z parametrami średnia i odchylenie_std. Funkcję tę należy stosować do analizowania danych, które zostały przetworzone logarytmicznie.",
		abstract: "Oblicza skumulowany rozkład logarytmiczno-normalny x, gdzie ln(x) ma rozkład normalny z parametrami średnia i odchylenie_std. Funkcję tę należy stosować do analizowania danych, które zostały przetworzone logarytmicznie.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/lognormdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Argument wymagany. Wartość, dla której ta funkcja ma zostać obliczona."
			},
			mean: {
				name: "mean",
				detail: "Wymagane. Wartość średnia ln(x)."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Wymagane. Odchylenie standardowe ln(x)."
			}
		}
	},
	MODE: {
		description: "Załóżmy, że chcesz sprawdzić najpopularniejszą liczbę gatunków ptaków widzianych w próbce zliczanych ptaków na krytycznych terenach podmokłych w okresie 30 lat lub chcesz sprawdzić najczęściej występującą liczbę połączeń telefonicznych w centrum pomocy telefonicznej w godzinach poza szczytem. Aby obliczyć tryb grupy liczb, użyj funkcji WYST.NAJM .",
		abstract: "Załóżmy, że chcesz sprawdzić najpopularniejszą liczbę gatunków ptaków widzianych w próbce zliczanych ptaków na krytycznych terenach podmokłych w okresie 30 lat lub chcesz sprawdzić najczęściej występującą liczbę połączeń telefonicznych w centrum pomocy telefonicznej w godzinach poza szczytem. Aby obliczyć tryb grupy liczb, użyj funkcji WYST.NAJM .",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/mode-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Wymagane. Pierwsza liczba zakresu, dla którego ma zostać obliczona dominanta."
			},
			number2: {
				name: "number2",
				detail: "Opcjonalne. Argumenty liczbowe od 2 do 255, dla których należy obliczyć dominantę. Zamiast argumentów rozdzielonych średnikami można użyć pojedynczej tablicy lub odwołania do tablicy."
			}
		}
	},
	NEGBINOMDIST: {
		description: "Zwraca ujemny rozkład dwumianowy. Funkcja ROZKŁAD.DWUM.PRZEC zwraca w wyniku prawdopodobieństwo, że będzie liczba_p niepowodzeń przed liczba_s-tym sukcesem, kiedy stałe prawdopodobieństwo sukcesu jest prawdopodobieństwo_s. Funkcja ta pracuje podobnie jak funkcja zwracająca rozkład dwumianowy, z tym wyjątkiem, że liczba sukcesów jest stała, a liczba prób jest zmienna. Podobnie jak w przypadku rozkładu dwumianowego, zakłada się, że próby są niezależne.",
		abstract: "Zwraca ujemny rozkład dwumianowy. Funkcja ROZKŁAD.DWUM.PRZEC zwraca w wyniku prawdopodobieństwo, że będzie liczba_p niepowodzeń przed liczba_s-tym sukcesem, kiedy stałe prawdopodobieństwo sukcesu jest prawdopodobieństwo_s. Funkcja ta pracuje podobnie jak funkcja zwracająca rozkład dwumianowy, z tym wyjątkiem, że liczba sukcesów jest stała, a liczba prób jest zmienna. Podobnie jak w przypadku rozkładu dwumianowego, zakłada się, że próby są niezależne.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/negbinomdist-function"
		}],
		functionParameter: {
			numberF: {
				name: "number_f",
				detail: "Wymagane. Liczba porażek."
			},
			numberS: {
				name: "number_s",
				detail: "Wymagane. Progowa liczba sukcesów."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Wymagane. Prawdopodobieństwo sukcesu."
			}
		}
	},
	NORMDIST: {
		description: "Funkcja ROZKŁAD.NORMALNY zwraca rozkład normalny dla określonej średniej i odchylenia standardowego. Funkcja ta ma szeroki zakres zastosowań w statystyce, w tym testowanie hipotez.",
		abstract: "Funkcja ROZKŁAD.NORMALNY zwraca rozkład normalny dla określonej średniej i odchylenia standardowego. Funkcja ta ma szeroki zakres zastosowań w statystyce, w tym testowanie hipotez.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/normdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Argument wymagany. Wartość, dla której należy obliczyć rozkład"
			},
			mean: {
				name: "mean",
				detail: "Wymagane. Średnia arytmetyczna rozkładu"
			},
			standardDev: {
				name: "standard_dev",
				detail: "Wymagane. Odchylenie standardowe rozkładu"
			},
			cumulative: {
				name: "cumulative",
				detail: "Wymagane. Wartość logiczna, która określa postać funkcji. Jeśli wartością argumentu \"skumulowany\" jest PRAWDA, funkcja ROZKŁAD.NORMALNY zwraca funkcję rozkładu skumulowanego. jeśli wartością argumentu \"skumulowany\" jest FAŁSZ, funkcja zwraca funkcję masy prawdopodobieństwa."
			}
		}
	},
	NORMINV: {
		description: "Zwraca odwrotność skumulowanego rozkładu normalnego dla podanej średniej i odchylenia standardowego.",
		abstract: "Zwraca odwrotność skumulowanego rozkładu normalnego dla podanej średniej i odchylenia standardowego.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/norminv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Argument wymagany. Prawdopodobieństwo odpowiadające rozkładowi normalnemu."
			},
			mean: {
				name: "mean",
				detail: "Argument wymagany. Średnia arytmetyczna rozkładu."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Argument wymagany. Odchylenie standardowe rozkładu."
			}
		}
	},
	NORMSDIST: {
		description: "Zwraca funkcję skumulowanego rozkładu normalnego. Rozkład ten ma średnią zero i odchylenie standardowe równe jeden. Funkcję tę należy stosować zamiast tabeli obszarów standardowych krzywych normalnych.",
		abstract: "Zwraca funkcję skumulowanego rozkładu normalnego. Rozkład ten ma średnią zero i odchylenie standardowe równe jeden. Funkcję tę należy stosować zamiast tabeli obszarów standardowych krzywych normalnych.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/normsdist-function"
		}],
		functionParameter: { z: {
			name: "z",
			detail: "Argument wymagany. Wartość, dla której należy obliczyć rozkład."
		} }
	},
	NORMSINV: {
		description: "Zwraca funkcję odwrotną skumulowanego, standardowego rozkładu normalnego. Rozkład ten ma średnią równą zero i standardowe odchylenie równe jeden.",
		abstract: "Zwraca funkcję odwrotną skumulowanego, standardowego rozkładu normalnego. Rozkład ten ma średnią równą zero i standardowe odchylenie równe jeden.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/normsinv-function"
		}],
		functionParameter: { probability: {
			name: "probability",
			detail: "Argument wymagany. Prawdopodobieństwo odpowiadające rozkładowi normalnemu."
		} }
	},
	PERCENTILE: {
		description: "Zwraca k-ty percentyl wartości w zakresie. Funkcję tę można stosować do określania progu akceptacji. Na przykład można podjąć decyzję o przebadaniu kandydatów, których wyniki są powyżej 90-ego percentylu.",
		abstract: "Zwraca k-ty percentyl wartości w zakresie. Funkcję tę można stosować do określania progu akceptacji. Na przykład można podjąć decyzję o przebadaniu kandydatów, których wyniki są powyżej 90-ego percentylu.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/percentile-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Wymagane. Tablica lub zakres danych definiujący względną pozycję."
			},
			k: {
				name: "k",
				detail: "Argument wymagany. Wartość percentylu z przedziału domkniętego od 0 do 1."
			}
		}
	},
	PERCENTRANK: {
		description: "Funkcja PROCENT.POZYCJA zwraca pozycję wartości w zestawie danych jako procent zbioru danych — zasadniczo względną pozycję wartości w całym zestawie danych. Za pomocą funkcji PROCENT.POZYCJA można na przykład określić pozycję wyniku testu danej osoby w polu wszystkich wyników dla tego samego testu.",
		abstract: "Funkcja PROCENT.POZYCJA zwraca pozycję wartości w zestawie danych jako procent zbioru danych — zasadniczo względną pozycję wartości w całym zestawie danych. Za pomocą funkcji PROCENT.POZYCJA można na przykład określić pozycję wyniku testu danej osoby w polu wszystkich wyników dla tego samego testu.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/percentrank-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Wymagane. Zakres danych (lub wstępnie zdefiniowana tablica) wartości liczbowych, w których jest określana pozycja procentu."
			},
			x: {
				name: "x",
				detail: "Argument wymagany. Wartość, dla której ma zostać określona pozycja w tablicy."
			},
			significance: {
				name: "significance",
				detail: "Opcjonalne. Wartość identyfikująca liczbę cyfr znaczących dla zwracanej wartości procentowej. Jeśli ten argument zostanie pominięty, funkcja PROCENT.POZYCJA użyje trzech cyfr (0,xxx)."
			}
		}
	},
	POISSON: {
		description: "Zwraca skumulowaną funkcję (dystrybuantę) rozkładu Poissona. Zwykłym zastosowaniem rozkładu Poissona jest prognozowanie liczby zdarzeń w danym czasie, takiej jak liczba samochodów przejeżdżających przez plac w czasie jednej minuty.",
		abstract: "Zwraca skumulowaną funkcję (dystrybuantę) rozkładu Poissona. Zwykłym zastosowaniem rozkładu Poissona jest prognozowanie liczby zdarzeń w danym czasie, takiej jak liczba samochodów przejeżdżających przez plac w czasie jednej minuty.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/poisson-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Argument wymagany. Liczba zdarzeń."
			},
			mean: {
				name: "mean",
				detail: "Argument wymagany. Oczekiwana wartość liczbowa."
			},
			cumulative: {
				name: "cumulative",
				detail: "Argument wymagany. Wartość logiczna, która określa postać zwracanego rozkładu prawdopodobieństwa. Jeśli argument skumulowany ma wartość PRAWDA, funkcja ROZKŁAD.POISSON zwraca skumulowane prawdopodobieństwo Poissona, że liczba przypadkowych zdarzeń będzie między zero a x włącznie; jeśli ma wartość FAŁSZ, funkcja zwraca funkcję masy prawdopodobieństwa Poissona, że liczba zdarzeń będzie równa dokładnie x."
			}
		}
	},
	QUARTILE: {
		description: "Zwraca kwartyl zbioru danych. Kwartyle często są używane w danych o sprzedaży i w danych statystycznych do dzielenia populacji na grupy. Na przykład funkcję KWARTYL można zastosować do znalezienia górnych 25% dochodów w populacji.",
		abstract: "Zwraca kwartyl zbioru danych. Kwartyle często są używane w danych o sprzedaży i w danych statystycznych do dzielenia populacji na grupy. Na przykład funkcję KWARTYL można zastosować do znalezienia górnych 25% dochodów w populacji.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/quartile-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Wymagane. Tablica lub zakres komórek z wartościami liczbowymi, dla których ma zostać obliczona wartość kwartylu."
			},
			quart: {
				name: "quart",
				detail: "Wymagane. Wskazuje, która wartość ma zostać zwrócona."
			}
		}
	},
	RANK: {
		description: "Zwraca pozycję pewnej liczby na liście liczb. Pozycja liczby jest to jej wielkość w stosunku do innych wartości na liście. (Gdyby przeprowadzić sortowanie listy, pozycja liczby oznaczałaby jej miejsce na liście po sortowaniu.)",
		abstract: "Zwraca pozycję pewnej liczby na liście liczb. Pozycja liczby jest to jej wielkość w stosunku do innych wartości na liście. (Gdyby przeprowadzić sortowanie listy, pozycja liczby oznaczałaby jej miejsce na liście po sortowaniu.)",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/rank-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Wymagane. Liczba, której pozycja ma zostać określona."
			},
			ref: {
				name: "ref",
				detail: "Wymagane. Odwołanie do listy liczb. Nieliczbowe wartości argumentu lista są ignorowane."
			},
			order: {
				name: "order",
				detail: "Opcjonalne. Liczba wskazująca sposób określania pozycji liczby. Jeżeli argument lp jest równy 0 lub jest pominięty, program Microsoft Excel określa pozycję liczby, jak gdyby argument lista był listą sortowaną w kolejności malejącej. Jeżeli argument lp ma dowolną wartość niezerową, program Microsoft Excel określa pozycję liczby, jak gdyby argument lista był listą sortowaną w kolejności rosnącej."
			}
		}
	},
	STDEV: {
		description: "Szacuje odchylenie standardowe próbki. Odchylenie standardowe jest miarą tego, jak szeroko wartości są rozproszone od wartości przeciętnej (średniej).",
		abstract: "Szacuje odchylenie standardowe próbki. Odchylenie standardowe jest miarą tego, jak szeroko wartości są rozproszone od wartości przeciętnej (średniej).",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/stdev-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Wymagane. Pierwszy argument liczbowy odpowiadający próbce populacji."
			},
			number2: {
				name: "number2",
				detail: "Opcjonalne. Od 2 do 255 argumentów liczbowych odpowiadających próbce populacji. Zamiast argumentów rozdzielonych średnikami można użyć pojedynczej tablicy lub odwołania do tablicy."
			}
		}
	},
	STDEVP: {
		description: "Oblicza odchylenie standardowe dla całej populacji podanej w postaci argumentów. Odchylenie standardowe jest miarą tego, jak szeroko wartości są rozproszone od wartości średniej.",
		abstract: "Oblicza odchylenie standardowe dla całej populacji podanej w postaci argumentów. Odchylenie standardowe jest miarą tego, jak szeroko wartości są rozproszone od wartości średniej.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/stdevp-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Wymagane. Pierwszy argument liczbowy odpowiadający populacji."
			},
			number2: {
				name: "number2",
				detail: "Opcjonalne. Od 2 do 255 argumentów liczbowych odpowiadających populacji. Zamiast argumentów rozdzielonych średnikami można użyć pojedynczej tablicy lub odwołania do tablicy."
			}
		}
	},
	TDIST: {
		description: "Zwraca Punkty procentowe (prawdopodobieństwo) dla rozkładu t Studenta, gdzie wartość liczbowa (x) jest obliczoną wartością t, dla której należy obliczyć Punkty procentowe. Rozkład t jest stosowany przy testowaniu hipotez dla małych próbek zbiorów danych. Funkcję tę należy stosować zamiast tabeli wartości krytycznych dla rozkładu t.",
		abstract: "Zwraca Punkty procentowe (prawdopodobieństwo) dla rozkładu t Studenta, gdzie wartość liczbowa (x) jest obliczoną wartością t, dla której należy obliczyć Punkty procentowe. Rozkład t jest stosowany przy testowaniu hipotez dla małych próbek zbiorów danych. Funkcję tę należy stosować zamiast tabeli wartości krytycznych dla rozkładu t.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/tdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Argument wymagany. Wartość liczbowa, przy której należy oszacować rozkład."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Wymagane. Liczba całkowita oznaczająca liczbę stopni swobody."
			},
			tails: {
				name: "tails",
				detail: "Wymagane. Określa liczbę stron zwracanego układu. Jeśli strony = 1, funkcja ROZKŁAD.T zwraca rozkład jednostronny. Jeśli strony = 2, funkcja ROZKŁAD.T zwraca rozkład dwustronny."
			}
		}
	},
	TINV: {
		description: "Zwraca dwustronną odwrotność rozkładu t-Studenta.",
		abstract: "Zwraca dwustronną odwrotność rozkładu t-Studenta.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/tinv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Argument wymagany. Prawdopodobieństwo skojarzone z rozkładem dwustronnym t-Studenta."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Argument wymagany. Liczba stopni swobody charakteryzująca rozkład."
			}
		}
	},
	TTEST: {
		description: "Zwraca prawdopodobieństwo skojarzone z testem t-Studenta. Funkcję TEST.T należy stosować do określenia, czy istnieje prawdopodobieństwo tego, że dwie próbki pochodzą z tych samych podległych populacji, które mają taką samą wartość średnią.",
		abstract: "Zwraca prawdopodobieństwo skojarzone z testem t-Studenta. Funkcję TEST.T należy stosować do określenia, czy istnieje prawdopodobieństwo tego, że dwie próbki pochodzą z tych samych podległych populacji, które mają taką samą wartość średnią.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/ttest-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Argument wymagany. Pierwszy zbiór danych."
			},
			array2: {
				name: "array2",
				detail: "Argument wymagany. Drugi zbiór danych."
			},
			tails: {
				name: "tails",
				detail: "Argument wymagany. Określa liczbę stron rozkładu. Jeśli argument strony = 1, funkcja TEST.T stosuje rozkład jednostronny. Jeśli argument strony = 2, funkcja TEST.T stosuje rozkład dwustronny."
			},
			type: {
				name: "type",
				detail: "Argument wymagany. Typ testu t, który należy przeprowadzić."
			}
		}
	},
	VAR: {
		description: "Szacuje wariancję na podstawie próbki.",
		abstract: "Szacuje wariancję na podstawie próbki.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/var-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Wymagane. Pierwszy argument liczbowy odpowiadający próbce populacji."
			},
			number2: {
				name: "number2",
				detail: "Opcjonalne. Od 2 do 255 argumentów liczbowych odpowiadających próbce populacji."
			}
		}
	},
	VARP: {
		description: "Oblicza wariancję na podstawie całej populacji.",
		abstract: "Oblicza wariancję na podstawie całej populacji.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/varp-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Wymagane. Pierwszy argument liczbowy odpowiadający populacji."
			},
			number2: {
				name: "number2",
				detail: "Opcjonalne. Od 2 do 255 argumentów liczbowych odpowiadających populacji."
			}
		}
	},
	WEIBULL: {
		description: "Zwraca skumulowaną funkcję (dystrybuantę) rozkładu Weibulla. Rozkład ten znajduje zastosowanie w analizie niezawodności, na przykład przy obliczaniu średniego czasu międzyawaryjnego urządzeń.",
		abstract: "Zwraca skumulowaną funkcję (dystrybuantę) rozkładu Weibulla. Rozkład ten znajduje zastosowanie w analizie niezawodności, na przykład przy obliczaniu średniego czasu międzyawaryjnego urządzeń.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/weibull-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Argument wymagany. Wartość, dla której ta funkcja ma zostać obliczona."
			},
			alpha: {
				name: "alpha",
				detail: "Argument wymagany. Parametr rozkładu."
			},
			beta: {
				name: "beta",
				detail: "Argument wymagany. Parametr rozkładu."
			},
			cumulative: {
				name: "cumulative",
				detail: "Argument wymagany. Wyznacza postać funkcji."
			}
		}
	},
	ZTEST: {
		description: "Zwraca prawdopodobieństwo testu dwustronnego z. Dla pewnej przyjętej w hipotezie średniej z populacji, μ0, funkcja TEST.Z zwraca prawdopodobieństwo, że średnia z próbki będzie większa od średniej z obserwacji w zbiorze danych (tablicy), tj. od obserwowanej średniej próbki.",
		abstract: "Zwraca prawdopodobieństwo testu dwustronnego z. Dla pewnej przyjętej w hipotezie średniej z populacji, μ0, funkcja TEST.Z zwraca prawdopodobieństwo, że średnia z próbki będzie większa od średniej z obserwacji w zbiorze danych (tablicy), tj. od obserwowanej średniej próbki.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/ztest-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Wymagane. Tablica lub zakres danych, w stosunku do którego ma być testowana wartość x."
			},
			x: {
				name: "x",
				detail: "Argument wymagany. Testowana wartość."
			},
			sigma: {
				name: "sigma",
				detail: "Opcjonalne. Odchylenie standardowe populacji (znane). W przypadku pomięcia tego argumentu stosowane będzie odchylenie standardowe próbki."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/cube/pl-PL.ts
const locale$13 = {
	CUBEKPIMEMBER: {
		description: "Zwraca właściwość kluczowego wskaźnika wydajności (KPI) oraz wyświetla nazwę KPI w komórce. Wskaźnik KPI jest miarą ilościową, taką jak miesięczny zysk brutto lub kwartalna fluktuacja pracowników, która jest używana do monitorowania wydajności organizacji.",
		abstract: "Zwraca właściwość kluczowego wskaźnika wydajności (KPI) oraz wyświetla nazwę KPI w komórce. Wskaźnik KPI jest miarą ilościową, taką jak miesięczny zysk brutto lub kwartalna fluktuacja pracowników, która jest używana do monitorowania wydajności organizacji.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/cubekpimember-function"
		}],
		functionParameter: {
			connection: {
				name: "Połączenia",
				detail: "Wymagane. Jest to ciąg tekstowy określający nazwę połączenia z modułem."
			},
			kpiName: {
				name: "Kpi_name",
				detail: "Wymagane. Jest to ciąg tekstowy określający nazwę wskaźnika KPI w module."
			},
			kpiProperty: {
				name: "Kpi_property",
				detail: "Wymagane. Jest to zwracany składnik wskaźnika KPI, który może mieć jedną z następujących postaci:"
			},
			caption: {
				name: "Podpis",
				detail: "Opcjonalne. Jest to alternatywny ciąg tekstowy, który jest wyświetlany w komórce zamiast parametrów kpi_nazwa oraz kpi_właściwość."
			}
		}
	},
	CUBEMEMBER: {
		description: "Zwraca element lub krotkę z modułu. Służy do sprawdzania, czy element lub krotka istnieje w module.",
		abstract: "Zwraca element lub krotkę z modułu. Służy do sprawdzania, czy element lub krotka istnieje w module.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/cubemember-function"
		}],
		functionParameter: {
			connection: {
				name: "Połączenia",
				detail: "Wymagane. Jest to ciąg tekstowy określający nazwę połączenia z modułem."
			},
			memberExpression: {
				name: "Member_expression",
				detail: "Wymagane. Jest to ciąg tekstowy określający wyrażenie wielowymiarowe (MDX), którego wartością jest unikatowy element modułu. Ten argument może być również krotką podaną jako zakres komórek lub stała tablicowa."
			},
			caption: {
				name: "Podpis",
				detail: "Opcjonalne. Jest to ciąg tekstowy wyświetlany w komórce zamiast podpisu modułu (jeśli zdefiniowano podpis modułu). Jeśli jest zwracana krotka, program używa podpisu ujętego w ostatnim elemencie krotki."
			}
		}
	},
	CUBEMEMBERPROPERTY: {
		description: "Funkcja WŁAŚCIWOŚĆ.ELEMENTU.MODUŁU , jedna z funkcji Moduł w programie Excel, zwraca wartość właściwości elementu z modułu. Służy do sprawdzania, czy nazwa elementu istnieje w module, a także do zwracania określonej właściwości dla tego elementu.",
		abstract: "Funkcja WŁAŚCIWOŚĆ.ELEMENTU.MODUŁU , jedna z funkcji Moduł w programie Excel, zwraca wartość właściwości elementu z modułu. Służy do sprawdzania, czy nazwa elementu istnieje w module, a także do zwracania określonej właściwości dla tego elementu.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/cubememberproperty-function"
		}],
		functionParameter: {
			connection: {
				name: "Połączenia",
				detail: "Wymagane. Jest to ciąg tekstowy określający nazwę połączenia z modułem."
			},
			memberExpression: {
				name: "Member_expression",
				detail: "Wymagane. Jest to ciąg tekstowy określający wyrażenie wielowymiarowe (MDX) dla elementu w module."
			},
			property: {
				name: "Właściwość",
				detail: "Wymagane. Jest to ciąg tekstowy nazwy zwróconej właściwości lub odwołania do komórki, która zawiera nazwę właściwości."
			}
		}
	},
	CUBERANKEDMEMBER: {
		description: "Zwraca n-ty (czyli uszeregowany) element zestawu. Służy do zwracania elementów zestawu, na przykład najlepszego sprzedawcy lub 10 najlepszych studentów.",
		abstract: "Zwraca n-ty (czyli uszeregowany) element zestawu. Służy do zwracania elementów zestawu, na przykład najlepszego sprzedawcy lub 10 najlepszych studentów.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/cuberankedmember-function"
		}],
		functionParameter: {
			connection: {
				name: "Połączenia",
				detail: "Wymagane. Jest to ciąg tekstowy określający nazwę połączenia z modułem."
			},
			setExpression: {
				name: "Wyrażenie_docelowe",
				detail: "Wymagane. Jest to ciąg tekstowy wyrażenia zestawu, na przykład „{[Element1].dzieci}”. Może to być również funkcja ZESTAW.MODUŁÓW lub odwołanie do komórki zawierającej tę funkcję."
			},
			rank: {
				name: "Rank",
				detail: "Wymagane. Jest to liczba całkowita określająca najwyższą wartość, jaka ma zostać zwrócona. Jeśli argument pozycja ma wartość 1, funkcja zwraca najwyższą wartość, jeśli 2 — drugą wartość itd. Aby zwrócić 5 najwyższych wartości, należy pięć razy użyć funkcji USZEREGOWANY.ELEMENT.MODUŁU, określając pozycje od 1 do 5."
			},
			caption: {
				name: "Podpis",
				detail: "Opcjonalne. Jest to ciąg tekstowy wyświetlany w komórce zamiast podpisu modułu (jeśli zdefiniowano podpis modułu)."
			}
		}
	},
	CUBESET: {
		description: "Definiuje obliczeniowy zestaw elementów lub krotek, wysyłając wyrażenie zestawu do modułu na serwerze, który tworzy zestaw i zwraca go do programu Microsoft Office Excel.",
		abstract: "Definiuje obliczeniowy zestaw elementów lub krotek, wysyłając wyrażenie zestawu do modułu na serwerze, który tworzy zestaw i zwraca go do programu Microsoft Office Excel.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/cubeset-function"
		}],
		functionParameter: {
			connection: {
				name: "Połączenia",
				detail: "Wymagane. Jest to ciąg tekstowy określający nazwę połączenia z modułem."
			},
			setExpression: {
				name: "Wyrażenie_docelowe",
				detail: "Wymagane. Jest to ciąg tekstowy wyrażenia zestawu, którego wartością jest zestaw elementów lub krotek. Może to być również odwołanie do zakresu komórek programu Excel zawierającego pewną liczbę elementów, krotek lub zestawów należących do zestawu."
			},
			caption: {
				name: "Podpis",
				detail: "Opcjonalne. Jest to ciąg tekstowy, który jest wyświetlany w komórce zamiast podpisu modułu (jeśli taki podpis został zdefiniowany)."
			},
			sortOrder: {
				name: "Sort_order",
				detail: "Opcjonalne. Określa typ sortowania, jakie należy wykonać, i (o ile argument jest podawany) może przybierać następujące wartości:"
			},
			sortBy: {
				name: "Sort_by",
				detail: "Opcjonalne. Jest to ciąg tekstowy wartości do posortowania. Na przykład, aby uzyskać miasto o największej sprzedaży, set_expression będzie zestaw miast, a sort_by będzie miarą sprzedaży. Lub, aby uzyskać miasto o największej liczbie ludności, set_expression będzie zestawem miast, a sort_by będzie miarą populacji. Jeśli sort_order wymaga sort_by, a sort_by zostanie pominięty, funkcja ZESTAW.MODUŁÓW zwraca #VALUE! Komunikat o błędzie."
			}
		}
	},
	CUBESETCOUNT: {
		description: "Zwraca liczbę elementów zestawu.",
		abstract: "Zwraca liczbę elementów zestawu.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/cubesetcount-function"
		}],
		functionParameter: { set: {
			name: "Ustawić",
			detail: "Wymagane. Jest to ciąg tekstowy będący wyrażeniem programu Microsoft Excel, którego wartością jest zestaw zdefiniowany za pomocą funkcji ZESTAW.MODUŁÓW. Argument ten może być również funkcją ZESTAW.MODUŁÓW lub odwołaniem do komórki zawierającej tę funkcję."
		} }
	},
	CUBEVALUE: {
		description: "Zwraca zagregowaną wartość z modułu.",
		abstract: "Zwraca zagregowaną wartość z modułu.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/cubevalue-function"
		}],
		functionParameter: {
			connection: {
				name: "Połączenia",
				detail: "Wymagane. Jest to ciąg tekstowy określający nazwę połączenia z modułem."
			},
			memberExpression: {
				name: "Member_expression",
				detail: "Opcjonalne. Jest to ciąg tekstowy określający wyrażenie wielowymiarowe (MDX), którego wartością jest unikatowy element modułu. Ten argument może również być zestawem zdefiniowanym przy użyciu funkcji ZESTAW.MODUŁÓW. Argument wyrażenie_elementu ma zastosowanie jako wyrażenie określające część modułu, dla której funkcja ma zwrócić zagregowaną wartość. Jeśli w argumencie wyrażenie_elementu nie zostanie podana miara, program użyje domyślnej miary modułu."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/database/pl-PL.ts
const locale$12 = {
	DAVERAGE: {
		description: "Uśrednia wartości w polu (kolumnie) rekordów listy lub bazy danych, które są zgodne z warunkami określonymi przez użytkownika.",
		abstract: "Uśrednia wartości w polu (kolumnie) rekordów listy lub bazy danych, które są zgodne z warunkami określonymi przez użytkownika.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/daverage-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "to zakres komórek, które tworzą listę lub bazę danych. Baza danych to lista powiązanych danych, na której wiersze pokrewnych informacji to rekordy, a kolumny danych to pola. Pierwszy wiersz listy zawiera etykiety poszczególnych kolumn."
			},
			field: {
				name: "field",
				detail: "wskazuje, która kolumna jest używana w funkcji. Należy wprowadzić etykietę kolumny umieszczoną w podwójnym cudzysłowie, na przykład \"Wiek\" lub \"Plon\", lub liczbę (bez cudzysłowów) reprezentującą pozycję kolumny na liście: 1 dla pierwszej kolumny, 2 dla drugiej itd."
			},
			criteria: {
				name: "criteria",
				detail: "to zakres komórek zawierający warunki określone przez użytkownika. Jako argumentu „kryteria” można użyć dowolnego zakresu pod warunkiem, że zawiera przynajmniej jedną etykietę kolumny i jedną komórkę poniżej etykiety, w której określa się warunek."
			}
		}
	},
	DCOUNT: {
		description: "Liczy komórki zawierające liczby znajdujące się w polu (kolumnie) rekordów listy lub bazy danych, które są zgodne z warunkami określonymi przez użytkownika.",
		abstract: "Liczy komórki zawierające liczby znajdujące się w polu (kolumnie) rekordów listy lub bazy danych, które są zgodne z warunkami określonymi przez użytkownika.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/dcount-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Wymagane. Zakres komórek, które tworzą listę lub bazę danych. Baza danych to lista powiązanych danych, na której wiersze pokrewnych informacji to rekordy, a kolumny danych to pola. Pierwszy wiersz listy zawiera etykiety poszczególnych kolumn."
			},
			field: {
				name: "field",
				detail: "Wymagane. Wskazuje, która kolumna jest używana w funkcji. Należy wprowadzić etykietę kolumny umieszczoną w podwójnym cudzysłowie, na przykład \"Wiek\" lub \"Plon\", lub liczbę (bez cudzysłowów) reprezentującą pozycję kolumny na liście: 1 dla pierwszej kolumny, 2 dla drugiej itd."
			},
			criteria: {
				name: "criteria",
				detail: "Wymagane. Zakres komórek zawierający warunki określone przez użytkownika. Jako argumentu „kryteria” można użyć dowolnego zakresu pod warunkiem, że zawiera przynajmniej jedną etykietę kolumny i jedną komórkę poniżej etykiety, w której określa się warunek."
			}
		}
	},
	DCOUNTA: {
		description: "Liczy niepuste komórki znajdujące się w polu (kolumnie) rekordów listy lub bazy danych, które są zgodne z warunkami określonymi przez użytkownika.",
		abstract: "Liczy niepuste komórki znajdujące się w polu (kolumnie) rekordów listy lub bazy danych, które są zgodne z warunkami określonymi przez użytkownika.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/dcounta-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Wymagane. Zakres komórek, które tworzą listę lub bazę danych. Baza danych to lista powiązanych danych, na której wiersze pokrewnych informacji to rekordy, a kolumny danych to pola. Pierwszy wiersz listy zawiera etykiety poszczególnych kolumn."
			},
			field: {
				name: "field",
				detail: "Opcjonalne. Wskazuje, która kolumna jest używana w funkcji. Należy wprowadzić etykietę kolumny umieszczoną w podwójnym cudzysłowie, na przykład \"Wiek\" lub \"Plon\", lub liczbę (bez cudzysłowów) reprezentującą pozycję kolumny na liście: 1 dla pierwszej kolumny, 2 dla drugiej itd."
			},
			criteria: {
				name: "criteria",
				detail: "Wymagane. Zakres komórek zawierający warunki określone przez użytkownika. Jako argumentu „kryteria” można użyć dowolnego zakresu pod warunkiem, że zawiera przynajmniej jedną etykietę kolumny i jedną komórkę poniżej etykiety, w której określa się warunek."
			}
		}
	},
	DGET: {
		description: "Wyodrębnia z kolumny listy lub bazy danych pojedyncze wartości, które są zgodne z warunkami określonymi przez użytkownika.",
		abstract: "Wyodrębnia z kolumny listy lub bazy danych pojedyncze wartości, które są zgodne z warunkami określonymi przez użytkownika.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/dget-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Wymagane. Zakres komórek, które tworzą listę lub bazę danych. Baza danych to lista powiązanych danych, na której wiersze pokrewnych informacji to rekordy, a kolumny danych to pola. Pierwszy wiersz listy zawiera etykiety poszczególnych kolumn."
			},
			field: {
				name: "field",
				detail: "Wymagane. Wskazuje, która kolumna jest używana w funkcji. Należy wprowadzić etykietę kolumny umieszczoną w podwójnym cudzysłowie, na przykład \"Wiek\" lub \"Plon\", lub liczbę (bez cudzysłowów) reprezentującą pozycję kolumny na liście: 1 dla pierwszej kolumny, 2 dla drugiej itd."
			},
			criteria: {
				name: "criteria",
				detail: "Wymagane. Zakres komórek zawierający warunki określone przez użytkownika. Jako argumentu „kryteria” można użyć dowolnego zakresu pod warunkiem, że zawiera przynajmniej jedną etykietę kolumny i jedną komórkę poniżej etykiety, w której określa się warunek."
			}
		}
	},
	DMAX: {
		description: "Zwraca największą liczbę w polu (kolumnie) rekordów listy lub bazy danych, która jest zgodna z warunkami określonymi przez użytkownika.",
		abstract: "Zwraca największą liczbę w polu (kolumnie) rekordów listy lub bazy danych, która jest zgodna z warunkami określonymi przez użytkownika.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/dmax-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Wymagane. Zakres komórek, które tworzą listę lub bazę danych. Baza danych to lista powiązanych danych, na której wiersze pokrewnych informacji to rekordy, a kolumny danych to pola. Pierwszy wiersz listy zawiera etykiety poszczególnych kolumn."
			},
			field: {
				name: "field",
				detail: "Wymagane. Wskazuje, która kolumna jest używana w funkcji. Należy wprowadzić etykietę kolumny umieszczoną w podwójnym cudzysłowie, na przykład \"Wiek\" lub \"Plon\", lub liczbę (bez cudzysłowów) reprezentującą pozycję kolumny na liście: 1 dla pierwszej kolumny, 2 dla drugiej itd."
			},
			criteria: {
				name: "criteria",
				detail: "Wymagane. Zakres komórek zawierający warunki określone przez użytkownika. Jako argumentu „kryteria” można użyć dowolnego zakresu pod warunkiem, że zawiera przynajmniej jedną etykietę kolumny i jedną komórkę poniżej etykiety, w której określa się warunek."
			}
		}
	},
	DMIN: {
		description: "Zwraca najmniejszą liczbę w polu (kolumnie) rekordów listy lub bazy danych, która jest zgodna z warunkami określonymi przez użytkownika.",
		abstract: "Zwraca najmniejszą liczbę w polu (kolumnie) rekordów listy lub bazy danych, która jest zgodna z warunkami określonymi przez użytkownika.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/dmin-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Wymagane. Zakres komórek, które tworzą listę lub bazę danych. Baza danych to lista powiązanych danych, na której wiersze pokrewnych informacji to rekordy, a kolumny danych to pola. Pierwszy wiersz listy zawiera etykiety poszczególnych kolumn."
			},
			field: {
				name: "field",
				detail: "Wymagane. Wskazuje, która kolumna jest używana w funkcji. Należy wprowadzić etykietę kolumny umieszczoną w podwójnym cudzysłowie, na przykład \"Wiek\" lub \"Plon\", lub liczbę (bez cudzysłowów) reprezentującą pozycję kolumny na liście: 1 dla pierwszej kolumny, 2 dla drugiej itd."
			},
			criteria: {
				name: "criteria",
				detail: "Wymagane. Zakres komórek zawierający warunki określone przez użytkownika. Jako argumentu „kryteria” można użyć dowolnego zakresu pod warunkiem, że zawiera przynajmniej jedną etykietę kolumny i jedną komórkę poniżej etykiety, w której określa się warunek."
			}
		}
	},
	DPRODUCT: {
		description: "Mnoży wartości w polu (kolumnie) rekordów listy lub bazy danych, które są zgodne z warunkami określonymi przez użytkownika.",
		abstract: "Mnoży wartości w polu (kolumnie) rekordów listy lub bazy danych, które są zgodne z warunkami określonymi przez użytkownika.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/dproduct-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Wymagane. Zakres komórek, które tworzą listę lub bazę danych. Baza danych to lista powiązanych danych, na której wiersze pokrewnych informacji to rekordy, a kolumny danych to pola. Pierwszy wiersz listy zawiera etykiety poszczególnych kolumn."
			},
			field: {
				name: "field",
				detail: "Wymagane. Wskazuje, która kolumna jest używana w funkcji. Należy wprowadzić etykietę kolumny umieszczoną w podwójnym cudzysłowie, na przykład \"Wiek\" lub \"Plon\", lub liczbę (bez cudzysłowów) reprezentującą pozycję kolumny na liście: 1 dla pierwszej kolumny, 2 dla drugiej itd."
			},
			criteria: {
				name: "criteria",
				detail: "Wymagane. Zakres komórek zawierający warunki określone przez użytkownika. Jako argumentu „kryteria” można użyć dowolnego zakresu pod warunkiem, że zawiera przynajmniej jedną etykietę kolumny i jedną komórkę poniżej etykiety, w której określa się warunek."
			}
		}
	},
	DSTDEV: {
		description: "Szacuje odchylenie standardowe populacji na podstawie próbki, używając liczb w polu (kolumnie) rekordów listy lub bazy danych, które są zgodne z warunkami określonymi przez użytkownika.",
		abstract: "Szacuje odchylenie standardowe populacji na podstawie próbki, używając liczb w polu (kolumnie) rekordów listy lub bazy danych, które są zgodne z warunkami określonymi przez użytkownika.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/dstdev-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Wymagane. Zakres komórek, które tworzą listę lub bazę danych. Baza danych to lista powiązanych danych, na której wiersze pokrewnych informacji to rekordy, a kolumny danych to pola. Pierwszy wiersz listy zawiera etykiety poszczególnych kolumn."
			},
			field: {
				name: "field",
				detail: "Wymagane. Wskazuje, która kolumna jest używana w funkcji. Należy wprowadzić etykietę kolumny umieszczoną w podwójnym cudzysłowie, na przykład \"Wiek\" lub \"Plon\", lub liczbę (bez cudzysłowów) reprezentującą pozycję kolumny na liście: 1 dla pierwszej kolumny, 2 dla drugiej itd."
			},
			criteria: {
				name: "criteria",
				detail: "Wymagane. Zakres komórek zawierający warunki określone przez użytkownika. Jako argumentu „kryteria” można użyć dowolnego zakresu pod warunkiem, że zawiera przynajmniej jedną etykietę kolumny i jedną komórkę poniżej etykiety, w której określa się warunek."
			}
		}
	},
	DSTDEVP: {
		description: "Oblicza odchylenie standardowe populacji na podstawie całej populacji, używając liczb w polu (kolumnie) rekordów listy lub bazy danych, które są zgodne z warunkami określonymi przez użytkownika.",
		abstract: "Oblicza odchylenie standardowe populacji na podstawie całej populacji, używając liczb w polu (kolumnie) rekordów listy lub bazy danych, które są zgodne z warunkami określonymi przez użytkownika.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/dstdevp-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Wymagane. Zakres komórek, które tworzą listę lub bazę danych. Baza danych to lista powiązanych danych, na której wiersze pokrewnych informacji to rekordy, a kolumny danych to pola. Pierwszy wiersz listy zawiera etykiety poszczególnych kolumn."
			},
			field: {
				name: "field",
				detail: "Wymagane. Wskazuje, która kolumna jest używana w funkcji. Należy wprowadzić etykietę kolumny umieszczoną w podwójnym cudzysłowie, na przykład \"Wiek\" lub \"Plon\", lub liczbę (bez cudzysłowów) reprezentującą pozycję kolumny na liście: 1 dla pierwszej kolumny, 2 dla drugiej itd."
			},
			criteria: {
				name: "criteria",
				detail: "Wymagane. Zakres komórek zawierający warunki określone przez użytkownika. Jako argumentu „kryteria” można użyć dowolnego zakresu pod warunkiem, że zawiera przynajmniej jedną etykietę kolumny i jedną komórkę poniżej etykiety, w której określa się warunek."
			}
		}
	},
	DSUM: {
		description: "Na liście lub w bazie danych funkcja DSUM zawiera sumę liczb w polach (kolumnach) rekordów zgodnych z określonymi warunkami.",
		abstract: "Na liście lub w bazie danych funkcja DSUM zawiera sumę liczb w polach (kolumnach) rekordów zgodnych z określonymi warunkami.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/dsum-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Wymagane. Jest to zakres komórek, które tworzą listę lub bazę danych. Baza danych to lista powiązanych danych, na której wiersze informacji pokrewnych to rekordy , a kolumny danych to pola . Pierwszy wiersz listy zawiera etykiety dla każdej kolumny w tej kolumnie."
			},
			field: {
				name: "field",
				detail: "Wymagane. Określa to, która kolumna jest używana w funkcji. Określ na przykład etykietę kolumny ujętą w podwójny cudzysłów, na przykład \"Wiek\" lub \"Plon\". Możesz również określić liczbę (bez cudzysłowów) reprezentującą pozycję kolumny na liście: na przykład 1 dla pierwszej kolumny, 2 dla drugiej kolumny itd."
			},
			criteria: {
				name: "criteria",
				detail: "Wymagane. Jest to zakres komórek zawierający warunki określone przez użytkownika. Jako argumentu „kryteria” można użyć dowolnego zakresu pod warunkiem, że zawiera przynajmniej jedną etykietę kolumny i jedną komórkę poniżej etykiety, w której określa się warunek."
			}
		}
	},
	DVAR: {
		description: "Szacuje wariancję populacji na podstawie próbki, używając liczb w polu (kolumnie) rekordów listy lub bazy danych, które są zgodne z warunkami określonymi przez użytkownika.",
		abstract: "Szacuje wariancję populacji na podstawie próbki, używając liczb w polu (kolumnie) rekordów listy lub bazy danych, które są zgodne z warunkami określonymi przez użytkownika.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/dvar-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Wymagane. Zakres komórek, które tworzą listę lub bazę danych. Baza danych to lista powiązanych danych, na której wiersze pokrewnych informacji to rekordy, a kolumny danych to pola. Pierwszy wiersz listy zawiera etykiety poszczególnych kolumn."
			},
			field: {
				name: "field",
				detail: "Wymagane. Wskazuje, która kolumna jest używana w funkcji. Należy wprowadzić etykietę kolumny umieszczoną w podwójnym cudzysłowie, na przykład \"Wiek\" lub \"Plon\", lub liczbę (bez cudzysłowów) reprezentującą pozycję kolumny na liście: 1 dla pierwszej kolumny, 2 dla drugiej itd."
			},
			criteria: {
				name: "criteria",
				detail: "Wymagane. Zakres komórek zawierający warunki określone przez użytkownika. Jako argumentu „kryteria” można użyć dowolnego zakresu pod warunkiem, że zawiera przynajmniej jedną etykietę kolumny i jedną komórkę poniżej etykiety, w której określa się warunek."
			}
		}
	},
	DVARP: {
		description: "Oblicza wariancję populacji na podstawie całej populacji, używając liczb w polu (kolumnie) rekordów listy lub bazy danych, które są zgodne z warunkami określonymi przez użytkownika.",
		abstract: "Oblicza wariancję populacji na podstawie całej populacji, używając liczb w polu (kolumnie) rekordów listy lub bazy danych, które są zgodne z warunkami określonymi przez użytkownika.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/dvarp-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Wymagane. Zakres komórek, które tworzą listę lub bazę danych. Baza danych to lista powiązanych danych, na której wiersze pokrewnych informacji to rekordy, a kolumny danych to pola. Pierwszy wiersz listy zawiera etykiety poszczególnych kolumn."
			},
			field: {
				name: "field",
				detail: "Wymagane. Wskazuje, która kolumna jest używana w funkcji. Należy wprowadzić etykietę kolumny umieszczoną w podwójnym cudzysłowie, na przykład \"Wiek\" lub \"Plon\", lub liczbę (bez cudzysłowów) reprezentującą pozycję kolumny na liście: 1 dla pierwszej kolumny, 2 dla drugiej itd."
			},
			criteria: {
				name: "criteria",
				detail: "Wymagane. Zakres komórek zawierający warunki określone przez użytkownika. Jako argumentu „kryteria” można użyć dowolnego zakresu pod warunkiem, że zawiera przynajmniej jedną etykietę kolumny i jedną komórkę poniżej etykiety, w której określa się warunek."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/date/pl-PL.ts
const locale$11 = {
	DATE: {
		description: "Funkcja DATA zwraca kolejną liczbę porządkową reprezentującą konkretną datę.",
		abstract: "Funkcja DATA zwraca kolejną liczbę porządkową reprezentującą konkretną datę.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/date-function"
		}],
		functionParameter: {
			year: {
				name: "year",
				detail: "Wartość argumentu year może zawierać od jednej do czterech cyfr. Excel interpretuje year zgodnie z systemem dat używanym przez komputer. Domyślnie Univer używa systemu dat 1900, w którym pierwszą datą jest 1 stycznia 1900 r."
			},
			month: {
				name: "month",
				detail: "Dodatnia lub ujemna liczba całkowita oznaczająca miesiąc roku od 1 do 12 (od stycznia do grudnia)."
			},
			day: {
				name: "day",
				detail: "Dodatnia lub ujemna liczba całkowita oznaczająca dzień miesiąca od 1 do 31."
			}
		}
	},
	DATEDIF: {
		description: "Oblicza liczbę dni, miesięcy lub lat między dwiema datami.",
		abstract: "Oblicza liczbę dni, miesięcy lub lat między dwiema datami.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/datedif-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Data reprezentująca pierwszą lub początkową datę danego okresu. Daty mogą być wprowadzane jako ciąg tekstowy w cudzysłowie (na przykład \"2001-1-30\"), jako numery kolejne (na przykład wartość 36921 reprezentuje datę 30 stycznia 2001, jeśli używasz systemu daty 1900) lub jako wynik innych formuł bądź funkcji (na przykład DATA.WARTOŚĆ(\"2001-1-30\"))."
			},
			endDate: {
				name: "end_date",
				detail: "— data reprezentująca ostatnią lub końcową datę okresu."
			},
			unit: {
				name: "Jednostka",
				detail: "Typ informacji, które mają zostać zwrócone, gdzie: Jednostka****Zwraca \" Y \"Liczba pełnych lat w okresie\". M \"Liczba pełnych miesięcy w okresie\". D \"Liczba dni w okresie\". MD \"Różnica między dniami w start_date a end_date. Miesiące i lata dat są ignorowane. Ważne: Nie zalecamy używania argumentu \"MD\", ponieważ istnieją znane ograniczenia. Zobacz sekcję znanych problemów poniżej\". YM \"Różnica między miesiącami w start_date a end_date. Dni i lata dat są ignorowane\" YD \"Różnica między dniami start_date a end_date. Lata dat są ignorowane."
			}
		}
	},
	DATEVALUE: {
		description: "Funkcja DATA.WARTOŚĆ konwertuje datę zapisaną jako tekst na liczbę kolejną rozpoznawaną przez program Excel jako data. Na przykład formuła =DATA.WARTOŚĆ(\"1 sty 2008\") zwraca wartość 39448, czyli liczbę kolejną oznaczającą datę 1 stycznia 2008 r. Jednak wyniki funkcji DATA.WARTOŚĆ w konkretnym systemie mogą być inne niż w tym przykładzie ze względu na ustawienie daty używane w systemie komputera.",
		abstract: "Funkcja DATA.WARTOŚĆ konwertuje datę zapisaną jako tekst na liczbę kolejną rozpoznawaną przez program Excel jako data. Na przykład formuła =DATA.WARTOŚĆ(\"1 sty 2008\") zwraca wartość 39448, czyli liczbę kolejną oznaczającą datę 1 stycznia 2008 r. Jednak wyniki funkcji DATA.WARTOŚĆ w konkretnym systemie mogą być inne niż w tym przykładzie ze względu na ustawienie daty używane w systemie komputera.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/datevalue-function"
		}],
		functionParameter: { dateText: {
			name: "date_text",
			detail: "Wymagane. Tekst reprezentujący datę w formacie daty programu Excel lub odwołanie do komórki zawierającej tekst określający datę w formacie daty programu Excel. Na przykład \"2008-01-30\" i \"30 sty 2008\" są ciągami tekstowymi w cudzysłowach reprezentującymi daty. W domyślnym systemie daty w programie Microsoft Excel dla systemu Windows argument date_text musi odzwierciedlać datę między 1 stycznia 1900 a 31 grudnia 9999. Funkcja DATA.WARTOŚĆ zwraca #VALUE! jeśli wartość argumentu date_text jest spoza tego zakresu. Jeśli część roku argumentu date_text zostanie pominięta, funkcja DATA.WARTOŚĆ użyje bieżącego roku z wbudowanego zegara komputera. Informacje o godzinie w argurze date_text są ignorowane."
		} }
	},
	DAY: {
		description: "Zwraca dzień daty reprezentowanej przez argument liczba_kolejna. Dzień jest wyświetlany jako liczba całkowita z zakresu od 1 do 31.",
		abstract: "Zwraca dzień daty reprezentowanej przez argument liczba_kolejna. Dzień jest wyświetlany jako liczba całkowita z zakresu od 1 do 31.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/day-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Wymagane. Data poszukiwanego dnia. Daty powinny być wprowadzane przy użyciu funkcji DATA lub jako wynik innych formuł lub funkcji. Na przykład w przypadku daty 23 maja 2008 należy użyć funkcji DATA(2008;5;23). Jeśli daty są wprowadzane jako tekst , mogą wystąpić problemy."
		} }
	},
	DAYS: {
		description: "Zwraca liczbę dni między dwiema datami.",
		abstract: "Zwraca liczbę dni między dwiema datami.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/days-function"
		}],
		functionParameter: {
			endDate: {
				name: "end_date",
				detail: "Wymagane. Data_początkowa i data_końcowa to dwie daty, między którymi ma zostać ustalona liczba dni."
			},
			startDate: {
				name: "start_date",
				detail: "Wymagane. Data_początkowa i data_końcowa to dwie daty, między którymi ma zostać ustalona liczba dni."
			}
		}
	},
	DAYS360: {
		description: "Funkcja DNI.360 zwraca liczbę dni między dwiema datami na podstawie roku 360-dniowego (dwanaście 30-dniowych miesięcy), który jest używany w pewnych obliczeniach księgowych. Ta funkcja ułatwia obliczanie płatności, jeśli system księgowania jest oparty na dwunastu 30-dniowych miesiącach.",
		abstract: "Funkcja DNI.360 zwraca liczbę dni między dwiema datami na podstawie roku 360-dniowego (dwanaście 30-dniowych miesięcy), który jest używany w pewnych obliczeniach księgowych. Ta funkcja ułatwia obliczanie płatności, jeśli system księgowania jest oparty na dwunastu 30-dniowych miesiącach.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/days360-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "start_date i end_date to dwie daty, między którymi chcesz poznać liczbę dni."
			},
			endDate: {
				name: "end_date",
				detail: "start_date i end_date to dwie daty, między którymi chcesz poznać liczbę dni."
			},
			method: {
				name: "method",
				detail: "Wartość logiczna określająca, czy w obliczeniu ma zostać użyta metoda amerykańska czy europejska."
			}
		}
	},
	EDATE: {
		description: "Zwraca liczbę kolejną, odpowiadającą dacie przypadającej określoną liczbę miesięcy przed lub po wskazanej dacie (data_początkowa). Funkcja NR.SER.DATY umożliwia obliczanie dat spłaty lub dat należnej płatności, przypadających na ten sam dzień miesiąca, co data emisji.",
		abstract: "Zwraca liczbę kolejną, odpowiadającą dacie przypadającej określoną liczbę miesięcy przed lub po wskazanej dacie (data_początkowa). Funkcja NR.SER.DATY umożliwia obliczanie dat spłaty lub dat należnej płatności, przypadających na ten sam dzień miesiąca, co data emisji.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/edate-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Wymagane. Data reprezentująca datę początkową. Daty powinny być wprowadzane przy użyciu funkcji DATA albo stanowić wyniki innych formuł lub funkcji. Na przykład w przypadku daty 23 maja 2008 należy użyć funkcji DATA(2008;5;23). Jeśli daty są wprowadzane jako tekst , mogą wystąpić problemy."
			},
			months: {
				name: "months",
				detail: "Wymagane. Liczba miesięcy przed datą określoną argumentem data_początkowa lub po tej dacie. Dodatnia wartość argumentu „miesiące” oznacza datę przyszłą, ujemna oznacza datę przeszłą."
			}
		}
	},
	EOMONTH: {
		description: "Zwraca liczbę kolejną daty ostatniego dnia miesiąca, następującego określoną liczbę miesięcy przed lub po dacie określonej argumentem data_początkowa. Funkcja NR.SER.OST.DN.MIES umożliwia obliczanie dat spłaty lub dat należnej płatności, wypadających ostatniego dnia miesiąca.",
		abstract: "Zwraca liczbę kolejną daty ostatniego dnia miesiąca, następującego określoną liczbę miesięcy przed lub po dacie określonej argumentem data_początkowa. Funkcja NR.SER.OST.DN.MIES umożliwia obliczanie dat spłaty lub dat należnej płatności, wypadających ostatniego dnia miesiąca.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/eomonth-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Wymagane. Data reprezentująca datę początkową. Daty powinny być wprowadzane przy użyciu funkcji DATA albo stanowić wyniki innych formuł lub funkcji. Na przykład w przypadku daty 23 maja 2008 należy użyć funkcji DATA(2008;5;23). Jeśli daty są wprowadzane jako tekst , mogą wystąpić problemy."
			},
			months: {
				name: "months",
				detail: "Wymagane. Liczba miesięcy przed datą określoną argumentem data_początkowa lub po tej dacie. Dodatnia wartość argumentu „miesiące” oznacza datę przyszłą, ujemna oznacza datę przeszłą. Uwaga Jeśli argument miesiące nie jest liczbą całkowitą, jego wartość zostanie obcięta do liczby całkowitej."
			}
		}
	},
	EPOCHTODATE: {
		description: "Konwertuje znacznik czasu epoki Unix w sekundach, milisekundach lub mikrosekundach na datę i godzinę w uniwersalnym czasie koordynowanym (UTC).",
		abstract: "Konwertuje znacznik czasu epoki Unix w sekundach, milisekundach lub mikrosekundach na datę i godzinę w uniwersalnym czasie koordynowanym (UTC).",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/13193461?hl=pl"
		}],
		functionParameter: {
			timestamp: {
				name: "timestamp",
				detail: "Znacznik czasu epoki Unix w sekundach, milisekundach lub mikrosekundach."
			},
			unit: {
				name: "unit",
				detail: "[OPCJONALNE — domyślnie 1]: Jednostka czasu, w której wyrażono znacznik czasu."
			}
		}
	},
	HOUR: {
		description: "Zwraca godzinę wartości czasu. Godzina jest podawana jako liczba całkowita z zakresu od 0 (północ) do 23 (11:00 wieczór).",
		abstract: "Zwraca godzinę wartości czasu. Godzina jest podawana jako liczba całkowita z zakresu od 0 (północ) do 23 (11:00 wieczór).",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/hour-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Wymagane. Czas zawierający godzinę, którą należy znaleźć. Czas może być wprowadzany jako ciąg tekstowy w cudzysłowie (na przykład \"18:45\"), jako liczba w systemie dziesiętnym (na przykład jako wartość 0,78125 reprezentująca godzinę 18:45) lub jako wynik innych formuł lub funkcji (na przykład CZAS.WARTOŚĆ(\"6:45 PM\"))."
		} }
	},
	ISOWEEKNUM: {
		description: "Zwraca numer tygodnia ISO w roku dla określonej daty.",
		abstract: "Zwraca numer tygodnia ISO w roku dla określonej daty.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/isoweeknum-function"
		}],
		functionParameter: { date: {
			name: "date",
			detail: "Wymagane. Data to kod daty i godziny używany przez program Excel do obliczania daty i godziny."
		} }
	},
	MINUTE: {
		description: "Zwraca minuty jako wartość czasu. Minuta jest podawana jako liczba całkowita z zakresu od 0 do 59.",
		abstract: "Zwraca minuty jako wartość czasu. Minuta jest podawana jako liczba całkowita z zakresu od 0 do 59.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/minute-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Wymagane. Czas zawierający minutę, którą należy znaleźć. Czas można wprowadzić jako ciąg tekstowy w cudzysłowie, na przykład \"6:45 PM\", jako liczbę w systemie dziesiętnym, na przykład jako wartość 0,78125 reprezentującą czas 6:45 PM, lub jako wynik innych formuł lub funkcji, na przykład CZAS.WARTOŚĆ(\"6:45 PM\")."
		} }
	},
	MONTH: {
		description: "Zwraca miesiąc daty reprezentowanej przez kolejną liczbę. Miesiąc jest podawany w postaci liczby całkowitej z zakresu od 1 (styczeń) to 12 (grudzień).",
		abstract: "Zwraca miesiąc daty reprezentowanej przez kolejną liczbę. Miesiąc jest podawany w postaci liczby całkowitej z zakresu od 1 (styczeń) to 12 (grudzień).",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/month-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Wymagane. Data poszukiwanego miesiąca. Daty powinny być wprowadzane przy użyciu funkcji DATA lub jako wynik innych formuł bądź funkcji. Na przykład w przypadku daty 23 maja 2008 należy użyć funkcji DATA(2008;5;23). Jeśli daty są wprowadzane jako tekst , mogą wystąpić problemy."
		} }
	},
	NETWORKDAYS: {
		description: "Zwraca liczbę pełnych dni roboczych pomiędzy data_początkowa i data_końcowa. Dni robocze nie zawierają dni końca tygodnia (weekendów) oraz dat oznaczonych jako święta. Funkcję DNI.ROBOCZE należy stosować do obliczania zarobków pracowników, wynikających z łącznej liczby dni przepracowanych w określonym czasie.",
		abstract: "Zwraca liczbę pełnych dni roboczych pomiędzy data_początkowa i data_końcowa. Dni robocze nie zawierają dni końca tygodnia (weekendów) oraz dat oznaczonych jako święta. Funkcję DNI.ROBOCZE należy stosować do obliczania zarobków pracowników, wynikających z łącznej liczby dni przepracowanych w określonym czasie.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/networkdays-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Wymagane. Data reprezentująca datę początkową."
			},
			endDate: {
				name: "end_date",
				detail: "Wymagane. Data reprezentująca datę końcową."
			},
			holidays: {
				name: "holidays",
				detail: "Opcjonalne. Opcjonalny zakres jednej lub kilku dat, takich jak święta państwowe i kościelne oraz święta ruchome, które są wykluczane z kalendarza dni roboczych. Lista może być zarówno zakresem komórek, które zawierają daty, jak i stałą tablicową zawierającą liczby kolejne reprezentujące daty."
			}
		}
	},
	NETWORKDAYS_INTL: {
		description: "Zwraca liczbę dni roboczych między dwiema datami zgodnie z parametrami określającymi dni stanowiące dni weekendowe oraz liczbę dni weekendowych. Dni weekendowe i dni określone jako święta nie są uznawane za dni robocze.",
		abstract: "Zwraca liczbę dni roboczych między dwiema datami zgodnie z parametrami określającymi dni stanowiące dni weekendowe oraz liczbę dni weekendowych. Dni weekendowe i dni określone jako święta nie są uznawane za dni robocze.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/networkdays-intl-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Data reprezentująca datę początkową."
			},
			endDate: {
				name: "end_date",
				detail: "Data reprezentująca datę końcową."
			},
			weekend: {
				name: "weekend",
				detail: "Numer weekendu lub ciąg tekstowy określający, kiedy przypadają weekendy."
			},
			holidays: {
				name: "holidays",
				detail: "Opcjonalny zakres jednej lub kilku dat wykluczanych z kalendarza pracy, takich jak święta państwowe, federalne i ruchome."
			}
		}
	},
	NOW: {
		description: "Zwraca liczbę kolejną bieżącej daty i godziny. Jeśli przed wprowadzeniem formuły był używany format komórek Ogólne , program Excel zmieni format komórek na format daty i godziny określony w ustawieniach regionalnych. Format daty i godziny dla komórki można zmienić za pomocą poleceń z grupy Liczba karty Narzędzia główne na Wstążce.",
		abstract: "Zwraca liczbę kolejną bieżącej daty i godziny. Jeśli przed wprowadzeniem formuły był używany format komórek Ogólne , program Excel zmieni format komórek na format daty i godziny określony w ustawieniach regionalnych. Format daty i godziny dla komórki można zmienić za pomocą poleceń z grupy Liczba karty Narzędzia główne na Wstążce.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/now-function"
		}],
		functionParameter: {}
	},
	SECOND: {
		description: "Zwraca sekundy wartości czasu. Sekunda jest podawana jako liczba całkowita z zakresu od 0 do 59.",
		abstract: "Zwraca sekundy wartości czasu. Sekunda jest podawana jako liczba całkowita z zakresu od 0 do 59.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/second-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Wymagane. Czas zawierający szukane sekundy. Czas może być wprowadzany jako ciąg tekstowy w cudzysłowie (na przykład \"18:45\"), jako liczba dziesiętna (na przykład 0,78125, co reprezentuje czas 18:45) lub jako wynik innych formuł lub funkcji (na przykład CZAS.WARTOŚĆ(\"18:45\"))."
		} }
	},
	TIME: {
		description: "Zwraca określony czas jako liczbę dziesiętną. Jeśli komórka miała format Ogólny przed wprowadzeniem funkcji, to wynik zostanie sformatowany jako data.",
		abstract: "Zwraca określony czas jako liczbę dziesiętną. Jeśli komórka miała format Ogólny przed wprowadzeniem funkcji, to wynik zostanie sformatowany jako data.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/time-function"
		}],
		functionParameter: {
			hour: {
				name: "hour",
				detail: "Wymagane. Liczba z zakresu od 0 (zero) do 32767 reprezentująca godzinę. Każda wartość większa niż 23 zostanie podzielona przez 24, a reszta będzie traktowana jako wartość godziny. Na przykład funkcja CZAS(27;0;0) = CZAS(3;0;0) = 0,125 czyli 3:00."
			},
			minute: {
				name: "minute",
				detail: "Wymagane. Liczba z zakresu od 0 do 32767 reprezentująca minuty. Każda wartość większa niż 59 zostanie przekonwertowana na godziny i minuty. Na przykład funkcja CZAS(0;750;0) = CZAS(12;30;0) = 0,520833 czyli 12:30."
			},
			second: {
				name: "second",
				detail: "Wymagane. Liczba z zakresu od 0 do 32767 reprezentująca sekundy. Każda wartość większa niż 59 zostanie przekonwertowana na godziny, minuty i sekundy. Na przykład funkcja CZAS(0;0;2000) = CZAS(0;33;22) = 0,023148 czyli 0:33:20"
			}
		}
	},
	TIMEVALUE: {
		description: "Zwraca liczbę dziesiętną czasu reprezentowanego przez ciąg tekstowy. Liczba dziesiętna to wartość z zakresu od 0 do 0,99988426, reprezentująca czas od 0:00:00 (12:00:00 AM) do 23:59:59 (11:59:59 PM).",
		abstract: "Zwraca liczbę dziesiętną czasu reprezentowanego przez ciąg tekstowy. Liczba dziesiętna to wartość z zakresu od 0 do 0,99988426, reprezentująca czas od 0:00:00 (12:00:00 AM) do 23:59:59 (11:59:59 PM).",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/timevalue-function"
		}],
		functionParameter: { timeText: {
			name: "time_text",
			detail: "Wymagane. Ciąg tekstowy, który reprezentuje czas w jednym z formatów używanych przez program Microsoft Excel, na przykład ciągi tekstowe \"6:45 PM\" i \"18:45\", umieszczone między znakami cudzysłowu, reprezentują czas."
		} }
	},
	TO_DATE: {
		description: "Konwertuje podaną liczbę na datę.",
		abstract: "Konwertuje podaną liczbę na datę.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3094239?hl=pl"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Argument lub odwołanie do komórki, które ma zostać przekonwertowane na datę. Jeśli value jest liczbą lub odwołaniem do komórki zawierającej wartość liczbową, TO_DATE zwraca value jako datę, interpretując ją jako liczbę dni od 30 grudnia 1899 r. Wartości ujemne oznaczają dni przed tą datą, a wartości ułamkowe — porę dnia po północy. Jeśli value nie jest liczbą ani odwołaniem do komórki z wartością liczbową, TO_DATE zwraca value bez zmian."
		} }
	},
	TODAY: {
		description: "Funkcja DZIŚ zwraca liczbę kolejną bieżącej daty. Liczba kolejna to kod daty-czasu używany przez program Microsoft Excel do obliczeń daty i czasu. Jeśli komórka miała format Ogólny przed wprowadzeniem tej funkcji, wynik jest formatowany jako Data . Jeśli ma być wyświetlana liczba kolejna, należy zmienić format komórki na Ogólny lub Liczba .",
		abstract: "Funkcja DZIŚ zwraca liczbę kolejną bieżącej daty. Liczba kolejna to kod daty-czasu używany przez program Microsoft Excel do obliczeń daty i czasu. Jeśli komórka miała format Ogólny przed wprowadzeniem tej funkcji, wynik jest formatowany jako Data . Jeśli ma być wyświetlana liczba kolejna, należy zmienić format komórki na Ogólny lub Liczba .",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/today-function"
		}],
		functionParameter: {}
	},
	WEEKDAY: {
		description: "Zwraca dzień tygodnia odpowiadający dacie. Dzień jest wyrażony jako liczba całkowita z przedziału od 1 (niedziela) do 7 (sobota).",
		abstract: "Zwraca dzień tygodnia odpowiadający dacie. Dzień jest wyrażony jako liczba całkowita z przedziału od 1 (niedziela) do 7 (sobota).",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/weekday-function"
		}],
		functionParameter: {
			serialNumber: {
				name: "serial_number",
				detail: "Wymagane. Liczba kolejna reprezentująca datę poszukiwanego dnia. Daty powinny być wprowadzane przy użyciu funkcji DATA albo stanowić wyniki innych formuł lub funkcji. Na przykład w przypadku daty 23 maja 2008 należy użyć funkcji DATA(2008;5;23). Jeśli daty są wprowadzane jako tekst, mogą wystąpić problemy."
			},
			returnType: {
				name: "return_type",
				detail: "Opcjonalne. Liczba, która określa typ zwracanej wartości."
			}
		}
	},
	WEEKNUM: {
		description: "Zwraca numer tygodnia określonej daty. Na przykład tydzień zawierający 1 stycznia jest pierwszym tygodniem roku i otrzymuje numer 1.",
		abstract: "Zwraca numer tygodnia określonej daty. Na przykład tydzień zawierający 1 stycznia jest pierwszym tygodniem roku i otrzymuje numer 1.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/weeknum-function"
		}],
		functionParameter: {
			serialNumber: {
				name: "serial_number",
				detail: "Wymagane. Data określająca dzień tygodnia. Daty powinny być wprowadzane przy użyciu funkcji DATA albo stanowić wyniki innych formuł lub funkcji. Na przykład w przypadku daty 23 maja 2008 należy użyć funkcji DATA(2008;5;23). Jeśli daty są wprowadzane jako tekst, mogą wystąpić problemy."
			},
			returnType: {
				name: "return_type",
				detail: "Opcjonalne. Liczba wyznaczająca dzień, od którego zaczyna się tydzień. Wartością domyślną jest 1."
			}
		}
	},
	WORKDAY: {
		description: "Zwraca liczbę reprezentującą datę, którą wyznacza się poprzez odliczenie od pewnej daty początkowej określonej liczby dni roboczych w przód lub w tył. Dni robocze to wszystkie dni oprócz sobót, niedziel i świąt. Funkcja DZIEŃ.ROBOCZY jest przydatna, jeśli obliczając daty faktur, oczekiwanych dostaw i liczby przepracowanych dni, należy wykluczyć dni weekendowe i święta.",
		abstract: "Zwraca liczbę reprezentującą datę, którą wyznacza się poprzez odliczenie od pewnej daty początkowej określonej liczby dni roboczych w przód lub w tył. Dni robocze to wszystkie dni oprócz sobót, niedziel i świąt. Funkcja DZIEŃ.ROBOCZY jest przydatna, jeśli obliczając daty faktur, oczekiwanych dostaw i liczby przepracowanych dni, należy wykluczyć dni weekendowe i święta.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/workday-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Wymagane. Data reprezentująca datę początkową."
			},
			days: {
				name: "days",
				detail: "Wymagane. Liczba dni niebędących sobotą, niedzielą ani świętem poprzedzających datę początkową lub następujących po niej. Wartość dodatnia oznacza datę przyszłą, a wartość ujemna — przeszłą."
			},
			holidays: {
				name: "holidays",
				detail: "Opcjonalne. Opcjonalna lista dat, które mają być wykluczone z kalendarza roboczego, na przykład świąt państwowych lub dni urlopowych. Lista może być określana albo przez zakres komórek zawierających daty, albo przez stałą tablicową zawierającą liczby kolejne reprezentujące daty."
			}
		}
	},
	WORKDAY_INTL: {
		description: "Ta funkcja zwraca liczbę kolejną daty przed określoną liczbą dni roboczych lub po tej liczbie z niestandardowymi parametrami weekendowymi. Opcjonalne parametry weekendowe mogą wskazywać dni weekendowe oraz liczbę dni weekendowych. Należy pamiętać, że dni weekendowe i dni określone jako święta nie są traktowane jako dni robocze.",
		abstract: "Ta funkcja zwraca liczbę kolejną daty przed określoną liczbą dni roboczych lub po tej liczbie z niestandardowymi parametrami weekendowymi. Opcjonalne parametry weekendowe mogą wskazywać dni weekendowe oraz liczbę dni weekendowych. Należy pamiętać, że dni weekendowe i dni określone jako święta nie są traktowane jako dni robocze.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/workday-intl-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Wymagane. Data początkowa zaokrąglona do liczby całkowitej."
			},
			days: {
				name: "days",
				detail: "Wymagane. Liczba dni roboczych przed datą data_początkowa lub po niej. Wartość dodatnia daje datę przyszłą; wartość ujemna oznacza datę przeszłą; wartość zerowa daje już określoną start_date. Przesunięcie dnia jest obcinane do liczby całkowitej."
			},
			weekend: {
				name: "weekend",
				detail: "Opcjonalne. Jeśli jest używana, oznacza to dni tygodnia będące dniami weekendowymi, które nie są traktowane jako dni robocze. Argument \"weekend\" jest liczbą lub ciągiem określającym, kiedy przypadają weekendy. Wartości liczbowe w weekendy oznaczają dni weekendowe, jak pokazano poniżej."
			},
			holidays: {
				name: "holidays",
				detail: "Jest to argument opcjonalny na końcu składni. Określa opcjonalny zestaw dat, które mają zostać wykluczone z kalendarza dnia roboczego. Święta powinny być zakresem komórek zawierającym daty lub stałą tablicową wartości kolejnych reprezentujących te daty. Kolejność dat lub wartości kolejnych świąt może być dowolna."
			}
		}
	},
	YEAR: {
		description: "Zwraca rok odpowiadający dacie. Rok ten jest zwracany jako liczba całkowita z przedziału od 1900 do 9999.",
		abstract: "Zwraca rok odpowiadający dacie. Rok ten jest zwracany jako liczba całkowita z przedziału od 1900 do 9999.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/year-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Wymagane. Data poszukiwanego roku. Daty powinny być wprowadzane przy użyciu funkcji DATA albo stanowić wyniki innych formuł lub funkcji. Na przykład w przypadku daty 23 maja 2025 należy użyć funkcji DATA(2025;5;23). Jeśli daty są wprowadzane jako tekst, mogą wystąpić problemy."
		} }
	},
	YEARFRAC: {
		description: "CZĘŚĆ.ROKU oblicza część roku przedstawioną jako liczba całych dni między dwoma datami (reprezentowanymi przez argumenty data_początkowa i data_końcowa ). Na przykład funkcji CZĘŚĆ.ROKU możesz użyć do identyfikacji proporcji zysków całorocznych lub obligacji do przypisania wybranym terminom.",
		abstract: "CZĘŚĆ.ROKU oblicza część roku przedstawioną jako liczba całych dni między dwoma datami (reprezentowanymi przez argumenty data_początkowa i data_końcowa ). Na przykład funkcji CZĘŚĆ.ROKU możesz użyć do identyfikacji proporcji zysków całorocznych lub obligacji do przypisania wybranym terminom.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/yearfrac-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Data reprezentująca datę początkową."
			},
			endDate: {
				name: "end_date",
				detail: "Data reprezentująca datę końcową."
			},
			basis: {
				name: "basis",
				detail: "Typ podstawy naliczania dni, który ma zostać użyty."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/engineering/pl-PL.ts
const locale$10 = {
	BESSELI: {
		description: "Zwraca wartość zmodyfikowanej funkcji Bessela, równoważnej funkcji Bessela dla czysto urojonych argumentów.",
		abstract: "Zwraca wartość zmodyfikowanej funkcji Bessela, równoważnej funkcji Bessela dla czysto urojonych argumentów.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/besseli-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "Argument wymagany. Wartość, dla której ta funkcja ma zostać obliczona."
			},
			n: {
				name: "N",
				detail: "Argument wymagany. Rząd funkcji Bessela. Jeśli n nie jest całkowite, jego wartość podlega obcięciu do liczby całkowitej."
			}
		}
	},
	BESSELJ: {
		description: "Zwraca wartość funkcji Bessela.",
		abstract: "Zwraca wartość funkcji Bessela.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/besselj-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "Argument wymagany. Wartość, dla której ta funkcja ma zostać obliczona."
			},
			n: {
				name: "N",
				detail: "Argument wymagany. Rząd funkcji Bessela. Jeśli n nie jest całkowite, jego wartość podlega obcięciu do liczby całkowitej."
			}
		}
	},
	BESSELK: {
		description: "Zwraca wartość zmodyfikowanej funkcji Bessela, równoważną wartości funkcji Bessela dla czysto urojonych argumentów.",
		abstract: "Zwraca wartość zmodyfikowanej funkcji Bessela, równoważną wartości funkcji Bessela dla czysto urojonych argumentów.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/besselk-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "Argument wymagany. Wartość, dla której ta funkcja ma zostać obliczona."
			},
			n: {
				name: "N",
				detail: "Argument wymagany. Rząd funkcji. Jeśli n nie jest całkowite, jego wartość podlega obcięciu do liczby całkowitej."
			}
		}
	},
	BESSELY: {
		description: "Zwraca wartość funkcji Bessela, znanej także jako funkcja Webera albo funkcja Neumanna.",
		abstract: "Zwraca wartość funkcji Bessela, znanej także jako funkcja Webera albo funkcja Neumanna.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/bessely-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "Argument wymagany. Wartość, dla której ta funkcja ma zostać obliczona."
			},
			n: {
				name: "N",
				detail: "Argument wymagany. Rząd funkcji. Jeśli n nie jest całkowite, jego wartość podlega obcięciu do liczby całkowitej."
			}
		}
	},
	BIN2DEC: {
		description: "Konwertuje liczby dwójkowe na dziesiętne.",
		abstract: "Konwertuje liczby dwójkowe na dziesiętne.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/bin2dec-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Argument wymagany. Liczba dwójkowa, która ma zostać poddana konwersji. Liczba nie może zawierać więcej niż 10 znaków (10 bitów). Najbardziej znaczący bit liczby jest bitem znaku. Pozostałe 9 bitów reprezentuje wielkość. Liczby ujemne przedstawia się w zapisie dopełnienia do dwóch."
		} }
	},
	BIN2HEX: {
		description: "Konwertuje liczbę w kodzie dwójkowym na liczbę w kodzie szesnastkowym.",
		abstract: "Konwertuje liczbę w kodzie dwójkowym na liczbę w kodzie szesnastkowym.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/bin2hex-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Liczba dwójkowa, która ma zostać poddana konwersji. Liczba nie może zawierać więcej niż 10 znaków (10 bitów). Najbardziej znaczący bit liczby jest bitem znaku. Pozostałe 9 bitów reprezentuje wielkość. Liczby ujemne są reprezentowane przy użyciu zapisu z dopełnieniem do dwóch."
			},
			places: {
				name: "places",
				detail: "Opcjonalne. Liczba znaków do użycia. Jeśli argument „miejsca” zostanie pominięty, funkcja DWÓJK.NA.SZESN użyje najmniejszej niezbędnej liczby znaków. Wygodnie jest stosować argument „miejsca” w celu uzupełniania wyliczonej wartości poprzedzającymi 0 (zerami)."
			}
		}
	},
	BIN2OCT: {
		description: "Konwertuje liczbę w kodzie dwójkowym na liczbę w kodzie ósemkowym.",
		abstract: "Konwertuje liczbę w kodzie dwójkowym na liczbę w kodzie ósemkowym.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/bin2oct-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Liczba dwójkowa, która ma zostać poddana konwersji. Liczba nie może zawierać więcej niż 10 znaków (10 bitów). Najbardziej znaczący bit liczby jest bitem znaku. Pozostałe 9 bitów reprezentuje wielkość. Liczby ujemne są reprezentowane przy użyciu zapisu z dopełnieniem do dwóch."
			},
			places: {
				name: "places",
				detail: "Opcjonalne. Liczba znaków do użycia. Jeśli argument „miejsca” zostanie pominięty, funkcja DWÓJK.NA.ÓSM użyje najmniejszej niezbędnej liczby znaków. Wygodnie jest stosować argument „miejsca” w celu uzupełniania wyliczonej wartości poprzedzającymi 0 (zerami)."
			}
		}
	},
	BITAND: {
		description: "Zwraca wartość operacji bitowej ORAZ (AND) dla dwóch liczb.",
		abstract: "Zwraca wartość operacji bitowej ORAZ (AND) dla dwóch liczb.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/bitand-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Wymagane. Musi to być liczba dziesiętna większa niż lub równa 0."
			},
			number2: {
				name: "number2",
				detail: "Wymagane. Musi to być liczba dziesiętna większa niż lub równa 0."
			}
		}
	},
	BITLSHIFT: {
		description: "Zwraca liczbę przesuniętą w lewo o określoną liczbę bitów.",
		abstract: "Zwraca liczbę przesuniętą w lewo o określoną liczbę bitów.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/bitlshift-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Musi to być liczba całkowita większa niż lub równa 0."
			},
			shiftAmount: {
				name: "shift_amount",
				detail: "Wymagane. Argument wartość_przesunięcia musi być liczbą całkowitą."
			}
		}
	},
	BITOR: {
		description: "Zwraca wartość operacji bitowej LUB (OR) dla dwóch liczb.",
		abstract: "Zwraca wartość operacji bitowej LUB (OR) dla dwóch liczb.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/bitor-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Wymagane. Musi to być liczba dziesiętna większa niż lub równa 0."
			},
			number2: {
				name: "number2",
				detail: "Wymagane. Musi to być liczba dziesiętna większa niż lub równa 0."
			}
		}
	},
	BITRSHIFT: {
		description: "Zwraca liczbę przesuniętą w prawo o określoną liczbę bitów.",
		abstract: "Zwraca liczbę przesuniętą w prawo o określoną liczbę bitów.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/bitrshift-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Musi to być liczba całkowita większa niż lub równa 0."
			},
			shiftAmount: {
				name: "shift_amount",
				detail: "Wymagane. Musi to być liczba całkowita."
			}
		}
	},
	BITXOR: {
		description: "Zwraca wartość operacji bitowej alternatywy wykluczającej (XOR) dla dwóch liczb.",
		abstract: "Zwraca wartość operacji bitowej alternatywy wykluczającej (XOR) dla dwóch liczb.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/bitxor-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Wymagane. Musi być większy lub równy 0."
			},
			number2: {
				name: "number2",
				detail: "Wymagane. Musi być większy lub równy 0."
			}
		}
	},
	COMPLEX: {
		description: "Konwertuje części rzeczywistą i urojoną na liczbę zespoloną o postaci x + yi lub x + yj.",
		abstract: "Konwertuje części rzeczywistą i urojoną na liczbę zespoloną o postaci x + yi lub x + yj.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/complex-function"
		}],
		functionParameter: {
			realNum: {
				name: "real_num",
				detail: "Wymagane. Część rzeczywista liczby zespolonej."
			},
			iNum: {
				name: "i_num",
				detail: "Wymagane. Część urojona liczby zespolonej."
			},
			suffix: {
				name: "suffix",
				detail: "Opcjonalne. Sufiks części urojonej liczby zespolonej. Jeśli zostanie pominięty, zakłada się, że sufiksem jest „i”."
			}
		}
	},
	CONVERT: {
		description: "Konwertuje liczbę z jednego systemu miar na inny. Na przykład za pomocą funkcji KONWERTUJ można przeliczyć tabelę odległości w milach na tabelę odległości w kilometrach.",
		abstract: "Konwertuje liczbę z jednego systemu miar na inny. Na przykład za pomocą funkcji KONWERTUJ można przeliczyć tabelę odległości w milach na tabelę odległości w kilometrach.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/convert-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Wartość w from_unit do przekonwertowania."
			},
			fromUnit: {
				name: "from_unit",
				detail: "Jednostka dla number."
			},
			toUnit: {
				name: "to_unit",
				detail: "Jednostka wyniku."
			}
		}
	},
	DEC2BIN: {
		description: "Konwertuje liczbę dziesiętną na format binarny.",
		abstract: "Konwertuje liczbę dziesiętną na format binarny.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/dec2bin-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Dziesiętna liczba całkowita, która ma zostać przekonwertowana. Jeśli liczba jest ujemna, argument „miejsca” jest ignorowany, a funkcja DZIES.NA.DWÓJK zwraca 10-znakową (10-bitów) liczbę binarną, w której najbardziej znaczący bit jest bitem znaku. Pozostałe 9 bitów reprezentuje wielkość. Liczby ujemne są reprezentowane przy użyciu zapisu z dopełnieniem do dwóch."
			},
			places: {
				name: "places",
				detail: "Opcjonalne. Liczba znaków do użycia. Jeśli argument „miejsca” zostanie pominięty, funkcja DZIES.NA.DWÓJK użyje najmniejszej niezbędnej liczby znaków. Wygodnie jest stosować argument „miejsca” w celu uzupełniania wyliczonej wartości poprzedzającymi 0 (zerami)."
			}
		}
	},
	DEC2HEX: {
		description: "Konwertuje liczbę dziesiętną na format szesnastkowy.",
		abstract: "Konwertuje liczbę dziesiętną na format szesnastkowy.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/dec2hex-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Dziesiętna liczba całkowita, która ma zostać przekonwertowana. Jeśli liczba jest ujemna, argument „miejsca” jest ignorowany, a funkcja DZIES.NA.SZESN zwraca 10-znakową (40-bitów) liczbę szesnastkową, w której najbardziej znaczący bit jest bitem znaku. Pozostałe 39 bitów reprezentuje wartość. Liczby ujemne są reprezentowane przy użyciu zapisu z dopełnieniem do dwóch."
			},
			places: {
				name: "places",
				detail: "Opcjonalne. Liczba znaków do użycia. Jeśli argument „miejsca” zostanie pominięty, funkcja DZIES.NA.SZESN użyje najmniejszej niezbędnej liczby znaków. Wygodnie jest stosować argument „miejsca” w celu uzupełniania wyliczonej wartości poprzedzającymi 0 (zerami)."
			}
		}
	},
	DEC2OCT: {
		description: "Konwertuje liczbę dziesiętną na format ósemkowy.",
		abstract: "Konwertuje liczbę dziesiętną na format ósemkowy.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/dec2oct-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Dziesiętna liczba całkowita, która ma zostać przekonwertowana. Jeżeli liczba jest ujemna, argument „miejsca” jest ignorowany, a funkcja DZIES.NA.ÓSM zwraca 10-znakową (30-bitów) liczbę ósemkową, w której najbardziej znaczący bit jest bitem znaku. Pozostałe 29 bitów reprezentuje wartość. Liczby ujemne są reprezentowane przy użyciu zapisu z dopełnieniem do dwóch."
			},
			places: {
				name: "places",
				detail: "Argument opcjonalny. Liczba znaków do użycia. Jeśli argument „miejsca” zostanie pominięty, funkcja DZIES.NA.ÓSM użyje najmniejszej niezbędnej liczby znaków. Wygodnie jest stosować argument „miejsca” w celu uzupełniania wyliczonej wartości poprzedzającymi 0 (zerami)."
			}
		}
	},
	DELTA: {
		description: "Sprawdza, czy dwie wartości są równe. Zwraca 1, jeżeli liczba1 = liczba2 lub zwraca 0 w przeciwnym przypadku. Funkcji tej należy używać do filtrowania zbioru wartości. Na przykład, sumując kilka funkcji CZY.RÓWNE, można obliczyć liczbę par równych wartości. Ta funkcja jest również zwana funkcją delta Kroneckera.",
		abstract: "Sprawdza, czy dwie wartości są równe. Zwraca 1, jeżeli liczba1 = liczba2 lub zwraca 0 w przeciwnym przypadku. Funkcji tej należy używać do filtrowania zbioru wartości. Na przykład, sumując kilka funkcji CZY.RÓWNE, można obliczyć liczbę par równych wartości. Ta funkcja jest również zwana funkcją delta Kroneckera.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/delta-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Wymagane. Pierwsza z porównywanych wartości."
			},
			number2: {
				name: "number2",
				detail: "Opcjonalne. Druga z porównywanych wartości. Jeżeli argument liczba2 zostanie pominięty, przyjmuje się, że jest równy zero."
			}
		}
	},
	ERF: {
		description: "Zwraca wartość funkcji błędu scałkowanej w przedziale dolna_granica i górna_granica.",
		abstract: "Zwraca wartość funkcji błędu scałkowanej w przedziale dolna_granica i górna_granica.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/erf-function"
		}],
		functionParameter: {
			lowerLimit: {
				name: "lower_limit",
				detail: "Wymagane. Dolna granica całkowania funkcji FUNKCJA.BŁ."
			},
			upperLimit: {
				name: "upper_limit",
				detail: "Opcjonalne. Górna granica całkowania funkcji FUNKCJA.BŁ. Jeśli zostanie pominięta, funkcja FUNKCJA.BŁ będzie całkować pomiędzy wartościami zero a dolna_granica."
			}
		}
	},
	ERF_PRECISE: {
		description: "Zwraca wartość funkcji błędu.",
		abstract: "Zwraca wartość funkcji błędu.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/erf-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Argument wymagany. Dolna granica na potrzeby całkowania funkcji FUNKCJA.BŁ.DOKŁ."
		} }
	},
	ERFC: {
		description: "Zwraca wartość dopełniającej funkcji FUNKCJA.BŁ scałkowanej w przedziale od x do nieskończoności.",
		abstract: "Zwraca wartość dopełniającej funkcji FUNKCJA.BŁ scałkowanej w przedziale od x do nieskończoności.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/erfc-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Argument wymagany. Dolna granica całkowania funkcji FUNKCJA.BŁ."
		} }
	},
	ERFC_PRECISE: {
		description: "Zwraca wartość dopełniającej funkcji FUNKCJA.BŁ scałkowanej w przedziale od x do nieskończoności.",
		abstract: "Zwraca wartość dopełniającej funkcji FUNKCJA.BŁ scałkowanej w przedziale od x do nieskończoności.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/erfc-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Argument wymagany. Dolna granica na potrzeby całkowania funkcji KOMP.FUNKCJA.BŁ.DOKŁ."
		} }
	},
	GESTEP: {
		description: "Zwraca liczbę 1, jeśli argument liczba ≥ argument próg; w przeciwnym razie zwraca liczbę zero (0). Funkcja ta jest przydatna do filtrowania zbioru wartości. Na przykład przez zsumowanie szeregu funkcji SPRAWDŹ.PRÓG można obliczyć liczbę wartości przekraczających próg.",
		abstract: "Zwraca liczbę 1, jeśli argument liczba ≥ argument próg; w przeciwnym razie zwraca liczbę zero (0). Funkcja ta jest przydatna do filtrowania zbioru wartości. Na przykład przez zsumowanie szeregu funkcji SPRAWDŹ.PRÓG można obliczyć liczbę wartości przekraczających próg.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/gestep-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Wartość, która jest sprawdzana względem progu."
			},
			step: {
				name: "step",
				detail: "Opcjonalne. Wartość progowa. Jeśli zostanie pominięta, funkcja SPRAWDŹ.PRÓG użyje wartości zero."
			}
		}
	},
	HEX2BIN: {
		description: "Konwertuje liczbę szesnastkową na liczbę binarną.",
		abstract: "Konwertuje liczbę szesnastkową na liczbę binarną.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/hex2bin-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Liczba szesnastkowa, która ma zostać przekonwertowana. Liczba nie może zawierać więcej niż 10 znaków. Najbardziej znaczący bit liczby jest bitem znaku (40 bit od prawej). Pozostałe 39 bitów reprezentuje wielkość. Liczby ujemne są reprezentowane przy użyciu zapisu z dopełnieniem do dwóch."
			},
			places: {
				name: "places",
				detail: "Argument opcjonalny. Liczba znaków do użycia. Jeśli argument „miejsca” zostanie pominięty, funkcja SZESN.NA.DWÓJK użyje najmniejszej niezbędnej liczby znaków. Wygodnie jest stosować argument „miejsca” w celu uzupełniania wyliczonej wartości poprzedzającymi 0 (zerami)."
			}
		}
	},
	HEX2DEC: {
		description: "Konwertuje liczbę szesnastkową na liczbę dziesiętną.",
		abstract: "Konwertuje liczbę szesnastkową na liczbę dziesiętną.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/hex2dec-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Argument wymagany. Liczba szesnastkowa, która ma zostać przekonwertowana. Liczba nie może zawierać więcej niż 10 znaków (40 bitów). Najbardziej znaczący bit liczby jest bitem znaku. Pozostałe 39 bitów reprezentuje wielkość. Liczby ujemne przedstawia się w zapisie dopełnienia do dwóch."
		} }
	},
	HEX2OCT: {
		description: "Konwertuje liczbę szesnastkową na liczbę ósemkową.",
		abstract: "Konwertuje liczbę szesnastkową na liczbę ósemkową.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/hex2oct-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Liczba szesnastkowa, która ma zostać przekonwertowana. Liczba nie może zawierać więcej niż 10 znaków. Najbardziej znaczący bit liczby jest bitem znaku. Pozostałe 39 bitów reprezentuje wielkość. Liczby ujemne są reprezentowane przy użyciu zapisu z dopełnieniem do dwóch."
			},
			places: {
				name: "places",
				detail: "Argument opcjonalny. Liczba znaków do użycia. Jeśli argument „miejsca” zostanie pominięty, funkcja SZESN.NA.ÓSM użyje najmniejszej niezbędnej liczby znaków. Wygodnie jest stosować argument „miejsca” w celu uzupełniania wyliczonej wartości poprzedzającymi 0 (zerami)."
			}
		}
	},
	IMABS: {
		description: "Zwraca wartość bezwzględną (moduł) liczby zespolonej, podając ją w formacie tekstowym x + yi lub x + yj.",
		abstract: "Zwraca wartość bezwzględną (moduł) liczby zespolonej, podając ją w formacie tekstowym x + yi lub x + yj.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/imabs-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Wymagane. Liczba zespolona, dla której należy znaleźć wartość bezwzględną."
		} }
	},
	IMAGINARY: {
		description: "Zwraca współczynnik urojony liczby zespolonej podanej w postaci w postaci tekstowej x + yi lub x + yj.",
		abstract: "Zwraca współczynnik urojony liczby zespolonej podanej w postaci w postaci tekstowej x + yi lub x + yj.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/imaginary-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Wymagane. Liczba zespolona, dla której należy obliczyć część urojoną."
		} }
	},
	IMARGUMENT: {
		description: "Zwraca argument (theta), czyli kąt wyrażony w radianach, w następującym stopniu:",
		abstract: "Zwraca argument (theta), czyli kąt wyrażony w radianach, w następującym stopniu:",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/imargument-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Wymagane. Liczba zespolona, dla której należy obliczyć argument ."
		} }
	},
	IMCONJUGATE: {
		description: "Zwraca sprzężenie zespolone liczby zespolonej, podając je w postaci formatu tekstowego x + yi lub x + yj.",
		abstract: "Zwraca sprzężenie zespolone liczby zespolonej, podając je w postaci formatu tekstowego x + yi lub x + yj.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/imconjugate-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Wymagane. Liczba zespolona, dla której należy obliczyć liczbę sprzężoną."
		} }
	},
	IMCOS: {
		description: "Zwraca cosinus liczby zespolonej w postaci tekstowej x + yi lub x + yj.",
		abstract: "Zwraca cosinus liczby zespolonej w postaci tekstowej x + yi lub x + yj.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/imcos-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Wymagane. Liczba zespolona, dla której należy obliczyć cosinus."
		} }
	},
	IMCOSH: {
		description: "Zwraca cosinus hiperboliczny liczby zespolonej w formacie tekstowym x+yi lub x+yj.",
		abstract: "Zwraca cosinus hiperboliczny liczby zespolonej w formacie tekstowym x+yi lub x+yj.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/imcosh-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Wymagane. Liczba zespolona, dla której należy obliczyć cosinus hiperboliczny."
		} }
	},
	IMCOT: {
		description: "Zwraca cotangens liczby zespolonej w formacie tekstowym x+yi lub x+yj.",
		abstract: "Zwraca cotangens liczby zespolonej w formacie tekstowym x+yi lub x+yj.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/imcot-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Liczba zespolona, której cotangens chcesz obliczyć."
		} }
	},
	IMCOTH: {
		description: "Funkcja IMCOTH zwraca hiperboliczny kotangens podanej liczby zespolonej. Na przykład dla liczby zespolonej „x+yi” zwraca „coth(x+yi)”.",
		abstract: "Funkcja IMCOTH zwraca hiperboliczny kotangens podanej liczby zespolonej. Na przykład dla liczby zespolonej „x+yi” zwraca „coth(x+yi)”.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9366256?hl=pl"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Liczba zespolona, której hiperboliczny cotangens chcesz obliczyć. Może to być wynik funkcji COMPLEX, liczba rzeczywista interpretowana jako liczba zespolona z częścią urojoną równą 0 albo ciąg w formacie „x+yi”, gdzie x i y są liczbami."
		} }
	},
	IMCSC: {
		description: "Zwraca cosecans liczby zespolonej w formacie tekstowym x+yi lub x+yj.",
		abstract: "Zwraca cosecans liczby zespolonej w formacie tekstowym x+yi lub x+yj.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/imcsc-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Wymagane. Liczba zespolona, dla której ma zostać obliczony cosecans."
		} }
	},
	IMCSCH: {
		description: "Zwraca cosecans hiperboliczny liczby zespolonej w formacie tekstowym x+yi lub x+yj.",
		abstract: "Zwraca cosecans hiperboliczny liczby zespolonej w formacie tekstowym x+yi lub x+yj.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/imcsch-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Wymagane. Liczba zespolona, dla której ma zostać obliczony cosecans hiperboliczny."
		} }
	},
	IMDIV: {
		description: "Zwraca iloraz dwóch liczb zespolonych w postaci tekstowej x + yi lub x + yj.",
		abstract: "Zwraca iloraz dwóch liczb zespolonych w postaci tekstowej x + yi lub x + yj.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/imdiv-function"
		}],
		functionParameter: {
			inumber1: {
				name: "inumber1",
				detail: "Wymagane. Zespolony licznik lub zespolona dzielna."
			},
			inumber2: {
				name: "inumber2",
				detail: "Wymagane. Zespolony mianownik lub dzielnik."
			}
		}
	},
	IMEXP: {
		description: "Zwraca wartość wykładniczą liczby zespolonej w postaci tekstowej x + yi lub x + yj.",
		abstract: "Zwraca wartość wykładniczą liczby zespolonej w postaci tekstowej x + yi lub x + yj.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/imexp-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Wymagane. Liczba zespolona, dla której należy obliczyć wartość wykładniczą."
		} }
	},
	IMLN: {
		description: "Zwraca logarytm naturalny liczby zespolonej w postaci tekstowej x + yi lub x + yj.",
		abstract: "Zwraca logarytm naturalny liczby zespolonej w postaci tekstowej x + yi lub x + yj.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/imln-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Wymagane. Liczba zespolona, dla której należy obliczyć logarytm naturalny."
		} }
	},
	IMLOG: {
		description: "Funkcja IMLOG zwraca logarytm liczby zespolonej dla określonej podstawy.",
		abstract: "Funkcja IMLOG zwraca logarytm liczby zespolonej dla określonej podstawy.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9366486?hl=pl"
		}],
		functionParameter: {
			inumber: {
				name: "inumber",
				detail: "Wartość wejściowa funkcji logarytmicznej. Liczbę można zapisać jako zwykłą liczbę, np. 1, aby była interpretowana jako liczba rzeczywista, albo jako tekst w cudzysłowie, aby określić współczynniki rzeczywisty i urojony."
			},
			base: {
				name: "base",
				detail: "Podstawa używana do obliczania logarytmu. Musi być dodatnią liczbą rzeczywistą."
			}
		}
	},
	IMLOG10: {
		description: "Zwraca wartość logarytmu zwykłego (o podstawie 10) liczby zespolonej, podając wynik w postaci tekstowej x + yi lub x + yj.",
		abstract: "Zwraca wartość logarytmu zwykłego (o podstawie 10) liczby zespolonej, podając wynik w postaci tekstowej x + yi lub x + yj.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/imlog10-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Wymagane. Liczba zespolona, dla której należy obliczyć logarytm zwykły."
		} }
	},
	IMLOG2: {
		description: "Zwraca logarytm o podstawie 2 liczby zespolonej, podając wynik w postaci tekstowej x + yi lub x+yj.",
		abstract: "Zwraca logarytm o podstawie 2 liczby zespolonej, podając wynik w postaci tekstowej x + yi lub x+yj.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/imlog2-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Wymagane. Liczba zespolona, dla której należy obliczyć logarytm o podstawie 2."
		} }
	},
	IMPOWER: {
		description: "Zwraca liczbę zespoloną w postaci tekstowej x + yi lub x + yj podniesioną do potęgi.",
		abstract: "Zwraca liczbę zespoloną w postaci tekstowej x + yi lub x + yj podniesioną do potęgi.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/impower-function"
		}],
		functionParameter: {
			inumber: {
				name: "inumber",
				detail: "Wymagane. Liczba zespolona, którą należy podnieść do potęgi."
			},
			number: {
				name: "number",
				detail: "Argument wymagany. Potęga, do której należy podnieść liczbę zespoloną."
			}
		}
	},
	IMPRODUCT: {
		description: "Zwraca iloczyn od 1 do 255 liczb zespolonych, podając wynik w postaci tekstowej x + yi lub x + yj.",
		abstract: "Zwraca iloczyn od 1 do 255 liczb zespolonych, podając wynik w postaci tekstowej x + yi lub x + yj.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/improduct-function"
		}],
		functionParameter: {
			inumber1: {
				name: "inumber1",
				detail: "Od 1 do 255 liczb zespolonych do pomnożenia."
			},
			inumber2: {
				name: "inumber2",
				detail: "Kolejna liczba zespolona do pomnożenia."
			}
		}
	},
	IMREAL: {
		description: "Zwraca współczynnik rzeczywisty liczby zespolonej w postaci tekstowej x + yi lub x + yj.",
		abstract: "Zwraca współczynnik rzeczywisty liczby zespolonej w postaci tekstowej x + yi lub x + yj.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/imreal-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Wymagane. Liczba zespolona, dla której należy obliczyć część rzeczywistą."
		} }
	},
	IMSEC: {
		description: "Zwraca secans liczby zespolonej w formacie tekstowym x+yi lub x+yj.",
		abstract: "Zwraca secans liczby zespolonej w formacie tekstowym x+yi lub x+yj.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/imsec-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Wymagane. Liczba zespolona, dla której ma zostać obliczony secans."
		} }
	},
	IMSECH: {
		description: "Zwraca secans hiperboliczny liczby zespolonej w formacie tekstowym x+yi lub x+yj.",
		abstract: "Zwraca secans hiperboliczny liczby zespolonej w formacie tekstowym x+yi lub x+yj.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/imsech-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Wymagane. Liczba zespolona, dla której ma zostać obliczony secans hiperboliczny."
		} }
	},
	IMSIN: {
		description: "Zwraca sinus liczby zespolonej w postaci tekstowej x + yi lub x + yj.",
		abstract: "Zwraca sinus liczby zespolonej w postaci tekstowej x + yi lub x + yj.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/imsin-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Wymagane. Liczba zespolona, dla której należy obliczyć sinus."
		} }
	},
	IMSINH: {
		description: "Funkcja SINH.LICZBY.ZESP zwraca sinus hiperboliczny liczby zespolonej w formacie tekstowym x+yi lub x+yj.",
		abstract: "Funkcja SINH.LICZBY.ZESP zwraca sinus hiperboliczny liczby zespolonej w formacie tekstowym x+yi lub x+yj.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/imsinh-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Wymagane. Liczba zespolona, dla której ma zostać obliczony sinus hiperboliczny."
		} }
	},
	IMSQRT: {
		description: "Zwraca pierwiastek kwadratowy z liczby zespolonej, podając go w postaci tekstowej x + yi lub x + yj.",
		abstract: "Zwraca pierwiastek kwadratowy z liczby zespolonej, podając go w postaci tekstowej x + yi lub x + yj.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/imsqrt-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Wymagane. Liczba zespolona, dla której należy obliczyć pierwiastek kwadratowy."
		} }
	},
	IMSUB: {
		description: "Zwraca różnicę dwóch liczb zespolonych w postaci tekstowej x + yi lub x + yj.",
		abstract: "Zwraca różnicę dwóch liczb zespolonych w postaci tekstowej x + yi lub x + yj.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/imsub-function"
		}],
		functionParameter: {
			inumber1: {
				name: "inumber1",
				detail: "Wymagane. Liczba zespolona, od której należy odjąć argument liczba_zespolona2."
			},
			inumber2: {
				name: "inumber2",
				detail: "Wymagane. Liczba zespolona, którą należy odjąć od argumentu liczba_zespolona1."
			}
		}
	},
	IMSUM: {
		description: "Zwraca sumę dwóch lub więcej liczb zespolonych w formacie tekstowym x + yi lub x + yj.",
		abstract: "Zwraca sumę dwóch lub więcej liczb zespolonych w formacie tekstowym x + yi lub x + yj.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/imsum-function"
		}],
		functionParameter: {
			inumber1: {
				name: "inumber1",
				detail: "Od 1 do 255 liczb zespolonych do dodania."
			},
			inumber2: {
				name: "inumber2",
				detail: "Kolejna liczba zespolona do dodania."
			}
		}
	},
	IMTAN: {
		description: "Zwraca tangens liczby zespolonej w formacie tekstowym x+yi lub x+yj.",
		abstract: "Zwraca tangens liczby zespolonej w formacie tekstowym x+yi lub x+yj.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/imtan-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Wymagane. Liczba zespolona, dla której należy obliczyć tangens."
		} }
	},
	IMTANH: {
		description: "Funkcja IMTANH zwraca hiperboliczny tangens podanej liczby zespolonej. Na przykład dla liczby zespolonej „x+yi” zwraca „tanh(x+yi)”.",
		abstract: "Funkcja IMTANH zwraca hiperboliczny tangens podanej liczby zespolonej. Na przykład dla liczby zespolonej „x+yi” zwraca „tanh(x+yi)”.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9366655?hl=pl"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Liczba zespolona, której hiperboliczny tangens chcesz obliczyć. Może to być wynik funkcji COMPLEX, liczba rzeczywista interpretowana jako liczba zespolona z częścią urojoną równą 0 albo ciąg w formacie „x+yi”, gdzie x i y są liczbami."
		} }
	},
	OCT2BIN: {
		description: "Konwertuje liczbę w postaci ósemkowej na liczbę w postaci dwójkowej.",
		abstract: "Konwertuje liczbę w postaci ósemkowej na liczbę w postaci dwójkowej.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/oct2bin-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Liczba ósemkowa, która ma zostać przekonwertowana. Liczba nie może zawierać więcej niż 10 znaków. Najbardziej znaczący bit liczby jest bitem znaku. Pozostałe 29 bitów reprezentuje wielkość. Liczby ujemne są reprezentowane przy użyciu zapisu z dopełnieniem do dwóch."
			},
			places: {
				name: "places",
				detail: "Opcjonalne. Liczba znaków do użycia. Jeśli argument miejsca zostanie pominięty, funkcja ÓSM.NA.DWÓJK użyje najmniejszej niezbędnej liczby znaków. Wygodnie jest stosować argument miejsca w celu uzupełniania wyliczonej wartości zerami (0) wiodącymi."
			}
		}
	},
	OCT2DEC: {
		description: "Konwertuje liczbę w postaci ósemkowej na liczbę w postaci dziesiętnej.",
		abstract: "Konwertuje liczbę w postaci ósemkowej na liczbę w postaci dziesiętnej.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/oct2dec-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Argument wymagany. Liczba ósemkowa, która ma zostać przekonwertowana. Liczba nie może zawierać więcej niż 10 znaków (30 bitów). Najbardziej znaczący bit liczby jest bitem znaku. Pozostałe 29 bitów reprezentuje wielkość. Liczby ujemne przedstawia się w zapisie dopełnienia do dwóch."
		} }
	},
	OCT2HEX: {
		description: "Konwertuje liczby w postaci ósemkowej na liczby w postaci szesnastkowej.",
		abstract: "Konwertuje liczby w postaci ósemkowej na liczby w postaci szesnastkowej.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/oct2hex-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Liczba ósemkowa, która ma zostać przekonwertowana. Liczba nie może zawierać więcej niż 10 znaków (30 bitów). Najbardziej znaczący bit liczby jest bitem znaku. Pozostałe 29 bitów reprezentuje wielkość. Liczby ujemne są reprezentowane przy użyciu zapisu z dopełnieniem do dwóch."
			},
			places: {
				name: "places",
				detail: "Opcjonalne. Liczba znaków do użycia. Jeśli argument miejsca zostanie pominięty, funkcja ÓSM.NA.SZESN użyje najmniejszej niezbędnej liczby znaków. Wygodnie jest stosować argument miejsca w celu uzupełniania wyliczonej wartości zerami (0) wiodącymi."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/financial/pl-PL.ts
const locale$9 = {
	ACCRINT: {
		description: "Zwraca naliczone odsetki dla papieru wartościowego, przynoszącego okresowe odsetki.",
		abstract: "Zwraca naliczone odsetki dla papieru wartościowego, przynoszącego okresowe odsetki.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/accrint-function"
		}],
		functionParameter: {
			issue: {
				name: "issue",
				detail: "Wymagane. Data emisji papieru wartościowego."
			},
			firstInterest: {
				name: "first_interest",
				detail: "Wymagane. Data pierwszej raty odsetek od papieru wartościowego."
			},
			settlement: {
				name: "settlement",
				detail: "Wymagane. Data rozliczenia papieru wartościowego. Data rozliczenia papieru wartościowego jest datą sprzedaży papieru wartościowego nabywcy, datą późniejszą niż data emisji."
			},
			rate: {
				name: "rate",
				detail: "Wymagane. Roczna stopa kuponowa papieru wartościowego."
			},
			par: {
				name: "par",
				detail: "Wymagane. Cena papieru wartościowego. W przypadku pominięcia wartości nominalnej funkcja NAL.ODS stosuje wartość 1000 zł."
			},
			frequency: {
				name: "frequency",
				detail: "Wymagane. Liczba płatności kuponowych przypadających na jeden rok. W przypadku płatności rocznych częstotliwość = 1; w przypadku płatności półrocznych częstotliwość = 2; w przypadku płatności kwartalnych częstotliwość = 4."
			},
			basis: {
				name: "basis",
				detail: "Opcjonalne. Typ podstawy wyliczania dni, który zostanie użyty."
			},
			calcMethod: {
				name: "calc_method",
				detail: "Opcjonalne. Wartość logiczna, która określa sposób obliczania całkowitego przyrostu odsetek, gdy data w argumencie rozliczenie jest późniejsza od daty określonej w argumencie pierwsze_odsetki. Wartość PRAWDA (1) powoduje zwrócenie całkowitego przyrostu odsetek od daty określonej w argumencie emisja do daty w argumencie rozliczenie. Wartość FAŁSZ (0) powoduje zwrócenie przyrostu odsetek od daty określonej w argumencie pierwsze_odsetki do daty w argumencie rozliczenie. Jeśli argument nie zostanie wprowadzony, przyjmowana jest wartość domyślna PRAWDA."
			}
		}
	},
	ACCRINTM: {
		description: "Zwraca naliczone odsetki dla papieru wartościowego, dla którego wypłata odsetek następuje w terminie jego płatności.",
		abstract: "Zwraca naliczone odsetki dla papieru wartościowego, dla którego wypłata odsetek następuje w terminie jego płatności.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/accrintm-function"
		}],
		functionParameter: {
			issue: {
				name: "issue",
				detail: "Wymagane. Data emisji papieru wartościowego."
			},
			settlement: {
				name: "settlement",
				detail: "Wymagane. Data terminu płatności papieru wartościowego."
			},
			rate: {
				name: "rate",
				detail: "Wymagane. Roczna stopa kuponowa papieru wartościowego."
			},
			par: {
				name: "par",
				detail: "Wymagane. Cena papieru wartościowego. W przypadku pominięcia wartości nominalnej funkcja NAL.ODS.WYKUP stosuje wartość 1000 zł."
			},
			basis: {
				name: "basis",
				detail: "Opcjonalne. Typ podstawy wyliczania dni, który zostanie użyty."
			}
		}
	},
	AMORDEGRC: {
		description: "Zwraca amortyzację dla każdego okresu rozrachunkowego. Funkcja ta jest dostosowana do francuskiego systemu księgowego. Jeśli zakupu środka trwałego dokonuje się w połowie roku rozrachunkowego, to pod uwagę bierze się amortyzację podzieloną proporcjonalnie. Jest to funkcja podobna do funkcji AMORT.LIN, oprócz tego, że współczynniki amortyzacji stosowane w obliczeniach zależą od okresu użytkowania środków trwałych.",
		abstract: "Zwraca amortyzację dla każdego okresu rozrachunkowego. Funkcja ta jest dostosowana do francuskiego systemu księgowego. Jeśli zakupu środka trwałego dokonuje się w połowie roku rozrachunkowego, to pod uwagę bierze się amortyzację podzieloną proporcjonalnie. Jest to funkcja podobna do funkcji AMORT.LIN, oprócz tego, że współczynniki amortyzacji stosowane w obliczeniach zależą od okresu użytkowania środków trwałych.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/amordegrc-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Wymagane. Cena zakupu środka trwałego."
			},
			datePurchased: {
				name: "date_purchased",
				detail: "Wymagane. Data zakupu środka trwałego."
			},
			firstPeriod: {
				name: "first_period",
				detail: "Wymagane. Data kończąca pierwszy okres."
			},
			salvage: {
				name: "salvage",
				detail: "Wymagane. Wartość na koniec okresu użytkowania środka trwałego."
			},
			period: {
				name: "period",
				detail: "Wymagane. Okres."
			},
			rate: {
				name: "rate",
				detail: "Wymagane. Stopa amortyzacji."
			},
			basis: {
				name: "basis",
				detail: "Opcjonalne. Podstawa roczna, która ma być używana."
			}
		}
	},
	AMORLINC: {
		description: "Zwraca amortyzację dla każdego okresu rozrachunkowego. Funkcja ta jest dostosowana do francuskiego systemu księgowego. Jeśli zakupu środka trwałego dokonuje się w połowie roku rozrachunkowego, to pod uwagę bierze się amortyzację podzieloną proporcjonalnie.",
		abstract: "Zwraca amortyzację dla każdego okresu rozrachunkowego. Funkcja ta jest dostosowana do francuskiego systemu księgowego. Jeśli zakupu środka trwałego dokonuje się w połowie roku rozrachunkowego, to pod uwagę bierze się amortyzację podzieloną proporcjonalnie.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/amorlinc-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Wymagane. Cena zakupu środka trwałego."
			},
			datePurchased: {
				name: "date_purchased",
				detail: "Wymagane. Data zakupu środka trwałego."
			},
			firstPeriod: {
				name: "first_period",
				detail: "Wymagane. Data kończąca pierwszy okres."
			},
			salvage: {
				name: "salvage",
				detail: "Wymagane. Wartość na koniec okresu użytkowania środka trwałego."
			},
			period: {
				name: "period",
				detail: "Wymagane. Okres."
			},
			rate: {
				name: "rate",
				detail: "Wymagane. Stopa amortyzacji."
			},
			basis: {
				name: "basis",
				detail: "Opcjonalne. Podstawa roczna, która ma być używana."
			}
		}
	},
	COUPDAYBS: {
		description: "Funkcja WYPŁ.DNI.OD.POCZ zwraca liczbę dni od początku okresu dywidendy do daty rozliczenia.",
		abstract: "Funkcja WYPŁ.DNI.OD.POCZ zwraca liczbę dni od początku okresu dywidendy do daty rozliczenia.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/coupdaybs-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Wymagane. Data rozliczenia papieru wartościowego. Data rozliczenia papieru wartościowego jest datą sprzedaży papieru wartościowego nabywcy, datą późniejszą niż data emisji."
			},
			maturity: {
				name: "maturity",
				detail: "Wymagane. Data terminu płatności papieru wartościowego. Data spłaty to data, kiedy papier wartościowy traci ważność."
			},
			frequency: {
				name: "frequency",
				detail: "Wymagane. Liczba płatności kuponowych przypadających na jeden rok. W przypadku płatności rocznych częstotliwość = 1; w przypadku płatności półrocznych częstotliwość = 2; w przypadku płatności kwartalnych częstotliwość = 4."
			},
			basis: {
				name: "basis",
				detail: "Opcjonalne. Typ podstawy wyliczania dni, który zostanie użyty."
			}
		}
	},
	COUPDAYS: {
		description: "Zwraca liczbę dni w okresie dywidendy, który zawiera datę rozliczenia.",
		abstract: "Zwraca liczbę dni w okresie dywidendy, który zawiera datę rozliczenia.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/coupdays-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Wymagane. Data rozliczenia papieru wartościowego. Data rozliczenia papieru wartościowego jest datą sprzedaży papieru wartościowego nabywcy, datą późniejszą niż data emisji."
			},
			maturity: {
				name: "maturity",
				detail: "Wymagane. Data terminu płatności papieru wartościowego. Data spłaty to data, kiedy papier wartościowy traci ważność."
			},
			frequency: {
				name: "frequency",
				detail: "Wymagane. Liczba płatności kuponowych przypadających na jeden rok. W przypadku płatności rocznych częstotliwość = 1; w przypadku płatności półrocznych częstotliwość = 2; w przypadku płatności kwartalnych częstotliwość = 4."
			},
			basis: {
				name: "basis",
				detail: "Opcjonalne. Typ podstawy wyliczania dni, który zostanie użyty."
			}
		}
	},
	COUPDAYSNC: {
		description: "Zwraca liczbę dni od daty rozliczenia do daty następnego kuponu.",
		abstract: "Zwraca liczbę dni od daty rozliczenia do daty następnego kuponu.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/coupdaysnc-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Data rozliczenia papieru wartościowego."
			},
			maturity: {
				name: "maturity",
				detail: "Data terminu wykupu papieru wartościowego."
			},
			frequency: {
				name: "frequency",
				detail: "Liczba płatności kuponowych w roku."
			},
			basis: {
				name: "basis",
				detail: "Typ używanej podstawy liczenia dni."
			}
		}
	},
	COUPNCD: {
		description: "Zwraca liczbę reprezentującą datę następnej płatności dywidendy po dacie rozliczenia.",
		abstract: "Zwraca liczbę reprezentującą datę następnej płatności dywidendy po dacie rozliczenia.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/coupncd-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Wymagane. Data rozliczenia papieru wartościowego. Data rozliczenia papieru wartościowego jest datą sprzedaży papieru wartościowego nabywcy, datą późniejszą niż data emisji."
			},
			maturity: {
				name: "maturity",
				detail: "Wymagane. Data terminu płatności papieru wartościowego. Data spłaty to data, kiedy papier wartościowy traci ważność."
			},
			frequency: {
				name: "frequency",
				detail: "Wymagane. Liczba płatności kuponowych przypadających na jeden rok. W przypadku płatności rocznych częstotliwość = 1; w przypadku płatności półrocznych częstotliwość = 2; w przypadku płatności kwartalnych częstotliwość = 4."
			},
			basis: {
				name: "basis",
				detail: "Opcjonalne. Typ podstawy wyliczania dni, który zostanie użyty."
			}
		}
	},
	COUPNUM: {
		description: "Zwraca liczbę wypłacanych dywidend między datą rozliczenia i datą spłaty, przy czym liczba ta jest zaokrąglana do najbliższej pełnej dywidendy.",
		abstract: "Zwraca liczbę wypłacanych dywidend między datą rozliczenia i datą spłaty, przy czym liczba ta jest zaokrąglana do najbliższej pełnej dywidendy.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/coupnum-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Wymagane. Data rozliczenia papieru wartościowego. Data rozliczenia papieru wartościowego jest datą sprzedaży papieru wartościowego nabywcy, datą późniejszą niż data emisji."
			},
			maturity: {
				name: "maturity",
				detail: "Wymagane. Data terminu płatności papieru wartościowego. Data spłaty to data, kiedy papier wartościowy traci ważność."
			},
			frequency: {
				name: "frequency",
				detail: "Wymagane. Liczba płatności kuponowych przypadających na jeden rok. W przypadku płatności rocznych częstotliwość = 1; w przypadku płatności półrocznych częstotliwość = 2; w przypadku płatności kwartalnych częstotliwość = 4."
			},
			basis: {
				name: "basis",
				detail: "Opcjonalne. Typ podstawy wyliczania dni, który zostanie użyty."
			}
		}
	},
	COUPPCD: {
		description: "Zwraca liczbę reprezentującą poprzednią datę płatności dywidendy przed datą rozliczenia.",
		abstract: "Zwraca liczbę reprezentującą poprzednią datę płatności dywidendy przed datą rozliczenia.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/couppcd-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Wymagane. Data rozliczenia papieru wartościowego. Data rozliczenia papieru wartościowego jest datą sprzedaży papieru wartościowego nabywcy, datą późniejszą niż data emisji."
			},
			maturity: {
				name: "maturity",
				detail: "Wymagane. Data terminu płatności papieru wartościowego. Data spłaty to data, kiedy papier wartościowy traci ważność."
			},
			frequency: {
				name: "frequency",
				detail: "Wymagane. Liczba płatności kuponowych przypadających na jeden rok. W przypadku płatności rocznych częstotliwość = 1; w przypadku płatności półrocznych częstotliwość = 2; w przypadku płatności kwartalnych częstotliwość = 4."
			},
			basis: {
				name: "basis",
				detail: "Opcjonalne. Typ podstawy wyliczania dni, który zostanie użyty."
			}
		}
	},
	CUMIPMT: {
		description: "Zwraca wartość skumulowanych odsetek spłaconych dla danego kredytu między argumentami okres_początkowy i okres_końcowy.",
		abstract: "Zwraca wartość skumulowanych odsetek spłaconych dla danego kredytu między argumentami okres_początkowy i okres_końcowy.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/cumipmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Wymagane. Stopa oprocentowania."
			},
			nper: {
				name: "nper",
				detail: "Wymagane. Ogólna liczba okresów płatności."
			},
			pv: {
				name: "pv",
				detail: "Wymagane. Wartość obecna."
			},
			startPeriod: {
				name: "start_period",
				detail: "Wymagane. Pierwszy okres w wyliczeniu. Okresy płatności są ponumerowane i zaczynają się od liczby 1."
			},
			endPeriod: {
				name: "end_period",
				detail: "Wymagane. Ostatni okres w wyliczeniu."
			},
			type: {
				name: "type",
				detail: "Wymagane. Rozkład płatności w czasie."
			}
		}
	},
	CUMPRINC: {
		description: "Zwraca skumulowaną wartość kapitału spłaconego dla danego kredytu pomiędzy argumentami okres_początkowy i okres_końcowy.",
		abstract: "Zwraca skumulowaną wartość kapitału spłaconego dla danego kredytu pomiędzy argumentami okres_początkowy i okres_końcowy.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/cumprinc-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Wymagane. Stopa oprocentowania."
			},
			nper: {
				name: "nper",
				detail: "Wymagane. Ogólna liczba okresów płatności."
			},
			pv: {
				name: "pv",
				detail: "Wymagane. Wartość obecna."
			},
			startPeriod: {
				name: "start_period",
				detail: "Wymagane. Pierwszy okres w wyliczeniu. Okresy płatności są ponumerowane i zaczynają się od liczby 1."
			},
			endPeriod: {
				name: "end_period",
				detail: "Wymagane. Ostatni okres w wyliczeniu."
			},
			type: {
				name: "type",
				detail: "Wymagane. Rozkład płatności w czasie."
			}
		}
	},
	DB: {
		description: "Zwraca amortyzację środka trwałego w podanym okresie, obliczoną z wykorzystaniem metody równomiernie malejącego salda.",
		abstract: "Zwraca amortyzację środka trwałego w podanym okresie, obliczoną z wykorzystaniem metody równomiernie malejącego salda.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/db-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Wymagane. Początkowy koszt środka trwałego."
			},
			salvage: {
				name: "salvage",
				detail: "Wymagane. Wartość środka trwałego po zakończonej amortyzacji (zwana również wartością odzyskaną środka trwałego)."
			},
			life: {
				name: "life",
				detail: "Wymagane. Liczba okresów, w czasie których środek trwały jest amortyzowany (zwana również okresem użytkowania środka trwałego)."
			},
			period: {
				name: "period",
				detail: "Wymagane. Okres, dla którego zostanie obliczona amortyzacja. Argument „okres” musi być wyrażony w tych samych jednostkach, co okres użytkowania środka trwałego."
			},
			month: {
				name: "month",
				detail: "Opcjonalne. Liczba miesięcy w pierwszym roku. Jeśli argument „miesiąc” zostanie pominięty, przyjmuje się, że liczba miesięcy jest równa 12."
			}
		}
	},
	DDB: {
		description: "Zwraca amortyzację środka trwałego w podanym okresie, obliczoną przy użyciu metody podwójnie malejącego salda lub innej metody określonej przez użytkownika.",
		abstract: "Zwraca amortyzację środka trwałego w podanym okresie, obliczoną przy użyciu metody podwójnie malejącego salda lub innej metody określonej przez użytkownika.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/ddb-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Wymagane. Początkowy koszt środka trwałego."
			},
			salvage: {
				name: "salvage",
				detail: "Wymagane. Wartość środka trwałego po zakończonej amortyzacji (zwana również wartością odzyskaną środka trwałego). Ta wartość może być równa 0."
			},
			life: {
				name: "life",
				detail: "Wymagane. Liczba okresów, w czasie których środek trwały jest amortyzowany (zwana również okresem użytkowania środka trwałego)."
			},
			period: {
				name: "period",
				detail: "Wymagane. Okres, dla którego zostanie obliczona amortyzacja. Argument „okres” musi być wyrażony w tych samych jednostkach, co okres użytkowania środka trwałego."
			},
			factor: {
				name: "factor",
				detail: "Opcjonalne. Szybkość, z jaką zmniejsza się saldo. Jeśli argument ten zostanie pominięty, to zakłada się, że wynosi 2 (metoda podwójnie malejącego salda)."
			}
		}
	},
	DISC: {
		description: "Zwraca stopę dyskontową papieru wartościowego.",
		abstract: "Zwraca stopę dyskontową papieru wartościowego.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/disc-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Data rozliczenia papieru wartościowego."
			},
			maturity: {
				name: "maturity",
				detail: "Data terminu wykupu papieru wartościowego."
			},
			pr: {
				name: "pr",
				detail: "Cena papieru wartościowego przypadająca na 100 USD wartości nominalnej."
			},
			redemption: {
				name: "redemption",
				detail: "Wartość wykupu przypadająca na 100 USD wartości nominalnej."
			},
			basis: {
				name: "basis",
				detail: "Typ używanej podstawy liczenia dni."
			}
		}
	},
	DOLLARDE: {
		description: "Konwertuje cenę w dolarach wyrażoną jako ułamek na cenę w dolarach wyrażoną jako liczbę dziesiętną.",
		abstract: "Konwertuje cenę w dolarach wyrażoną jako ułamek na cenę w dolarach wyrażoną jako liczbę dziesiętną.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/dollarde-function"
		}],
		functionParameter: {
			fractionalDollar: {
				name: "fractional_dollar",
				detail: "Liczba wyrażona częścią całkowitą i ułamkową, rozdzielonymi separatorem dziesiętnym."
			},
			fraction: {
				name: "fraction",
				detail: "Liczba całkowita używana jako mianownik ułamka."
			}
		}
	},
	DOLLARFR: {
		description: "Konwertuje cenę w dolarach wyrażoną jako liczbę dziesiętną na cenę w dolarach wyrażoną jako ułamek.",
		abstract: "Konwertuje cenę w dolarach wyrażoną jako liczbę dziesiętną na cenę w dolarach wyrażoną jako ułamek.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/dollarfr-function"
		}],
		functionParameter: {
			decimalDollar: {
				name: "decimal_dollar",
				detail: "Liczba dziesiętna."
			},
			fraction: {
				name: "fraction",
				detail: "Liczba całkowita używana jako mianownik ułamka."
			}
		}
	},
	DURATION: {
		description: "Funkcja CZAS.TRWANIA , jedna z funkcji Finansowych , zwraca czas trwania Makauleya dla założonej wartości nominalnej 100 zł. Czas trwania jest definiowany jako średnia ważona bieżącej wartości przepływów gotówkowych i jest używany jako miara reakcji ceny obligacji na zmiany rentowności.",
		abstract: "Funkcja CZAS.TRWANIA , jedna z funkcji Finansowych , zwraca czas trwania Makauleya dla założonej wartości nominalnej 100 zł. Czas trwania jest definiowany jako średnia ważona bieżącej wartości przepływów gotówkowych i jest używany jako miara reakcji ceny obligacji na zmiany rentowności.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/duration-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Wymagane. Data rozliczenia papieru wartościowego. Data rozliczenia papieru wartościowego jest datą sprzedaży papieru wartościowego nabywcy, datą późniejszą niż data emisji."
			},
			maturity: {
				name: "maturity",
				detail: "Wymagane. Data terminu płatności papieru wartościowego. Data spłaty to data, kiedy papier wartościowy traci ważność."
			},
			coupon: {
				name: "coupon",
				detail: "Wymagane. Roczna stopa kuponowa papieru wartościowego."
			},
			yld: {
				name: "yld",
				detail: "Wymagane. Roczna rentowność papieru wartościowego."
			},
			frequency: {
				name: "frequency",
				detail: "Wymagane. Liczba płatności kuponowych przypadających na jeden rok. W przypadku płatności rocznych częstotliwość = 1; w przypadku płatności półrocznych częstotliwość = 2; w przypadku płatności kwartalnych częstotliwość = 4."
			},
			basis: {
				name: "basis",
				detail: "Opcjonalne. Typ podstawy wyliczania dni, który zostanie użyty."
			}
		}
	},
	EFFECT: {
		description: "Zwraca efektywną roczną stopę procentową przy danej rocznej stopie nominalnej i liczbie okresów kapitalizacji w roku.",
		abstract: "Zwraca efektywną roczną stopę procentową przy danej rocznej stopie nominalnej i liczbie okresów kapitalizacji w roku.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/effect-function"
		}],
		functionParameter: {
			nominalRate: {
				name: "nominal_rate",
				detail: "Wymagane. Nominalna stopa procentowa."
			},
			npery: {
				name: "npery",
				detail: "Wymagane. Liczba kapitalizacji w roku."
			}
		}
	},
	FV: {
		description: "Funkcja FV , jedna z funkcji finansowych , oblicza przyszłą wartość inwestycji przy założeniu stałej stopy procentowej. Funkcji FV można używać w przypadku okresowych, stałych płatności albo pojedynczej płatności (ryczałtu).",
		abstract: "Funkcja FV , jedna z funkcji finansowych , oblicza przyszłą wartość inwestycji przy założeniu stałej stopy procentowej. Funkcji FV można używać w przypadku okresowych, stałych płatności albo pojedynczej płatności (ryczałtu).",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/fv-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Argument wymagany. Stopa procentowa dla okresu."
			},
			nper: {
				name: "nper",
				detail: "Argument wymagany. Całkowita liczba okresów płatności w okresie spłaty."
			},
			pmt: {
				name: "pmt",
				detail: "Argument wymagany. Płatność dokonywana w każdym okresie; nie może się zmienić w czasie trwania kredytu. Rata obejmuje zazwyczaj kapitał i odsetki z wyłączeniem innych opłat i podatków. Jeśli argument „rata” zostanie pominięty, musi zostać podany argument „wb”."
			},
			pv: {
				name: "pv",
				detail: "Opcjonalnie. Wartość bieżąca lub skumulowana wartość przyszłego strumienia płatności według wyceny na dzień obecny. Jeśli argument „wb” zostanie pominięty, przyjmuje się, że ma wartość 0 (zero) i należy określić argument „rata”."
			},
			type: {
				name: "type",
				detail: "Opcjonalnie. Liczba 0 albo 1, która wskazuje, kiedy płatność jest należna. Jeśli argument typ zostanie pominięty, przyjmuje się, że jest równy 0."
			}
		}
	},
	FVSCHEDULE: {
		description: "Zwraca wartość przyszłą kapitału początkowego przy stopie procentowej zmiennej w poszczególnych okresach. Funkcja WART.PRZYSZŁ.KAP umożliwia obliczenie przyszłej wartości inwestycji przy zmiennej stopie procentowej.",
		abstract: "Zwraca wartość przyszłą kapitału początkowego przy stopie procentowej zmiennej w poszczególnych okresach. Funkcja WART.PRZYSZŁ.KAP umożliwia obliczenie przyszłej wartości inwestycji przy zmiennej stopie procentowej.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/fvschedule-function"
		}],
		functionParameter: {
			principal: {
				name: "principal",
				detail: "Wymagane. Wartość obecna."
			},
			schedule: {
				name: "schedule",
				detail: "Wymagane. Tablica stóp procentowych, które należy zastosować."
			}
		}
	},
	INTRATE: {
		description: "Zwraca wartość stopy procentowej w pełni zainwestowanego papieru wartościowego.",
		abstract: "Zwraca wartość stopy procentowej w pełni zainwestowanego papieru wartościowego.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/intrate-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Wymagane. Data rozliczenia papieru wartościowego. Data rozliczenia papieru wartościowego jest datą sprzedaży papieru wartościowego nabywcy, datą późniejszą niż data emisji."
			},
			maturity: {
				name: "maturity",
				detail: "Wymagane. Data terminu płatności papieru wartościowego. Data spłaty to data, kiedy papier wartościowy traci ważność."
			},
			investment: {
				name: "investment",
				detail: "Wymagane. Kwota zainwestowana w papier wartościowy."
			},
			redemption: {
				name: "redemption",
				detail: "Wymagane. Kwota otrzymywana w momencie wykupu papieru wartościowego."
			},
			basis: {
				name: "basis",
				detail: "Opcjonalne. Typ podstawy wyliczania dni, który zostanie użyty."
			}
		}
	},
	IPMT: {
		description: "Zwraca wysokość spłaty odsetek dla danego okresu dla kredytu opartego na regularnych, stałych spłatach i stałej stopie procentowej.",
		abstract: "Zwraca wysokość spłaty odsetek dla danego okresu dla kredytu opartego na regularnych, stałych spłatach i stałej stopie procentowej.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/ipmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Wymagane. Stopa procentowa dla okresu."
			},
			per: {
				name: "per",
				detail: "Wymagane. Okres, dla którego należy znaleźć odsetki i musi znajdować się w zakresie od 1 do liczba_okresów."
			},
			nper: {
				name: "nper",
				detail: "Wymagane. Całkowita liczba okresów płatności w okresie spłaty."
			},
			pv: {
				name: "pv",
				detail: "Wymagane. Wartość bieżąca lub skumulowana wartość przyszłego strumienia płatności według wyceny na dzień obecny."
			},
			fv: {
				name: "fv",
				detail: "Opcjonalne. Przyszła wartość, czyli saldo kasowe, które ma zostać osiągnięte po dokonaniu ostatniej płatności. Jeśli argument wp jest pominięty, za jego wartość jest uznawane 0 (przyszła wartość pożyczki na przykład wynosi 0)."
			},
			type: {
				name: "type",
				detail: "Opcjonalne. Liczba 0 albo 1, która wskazuje, kiedy płatność jest należna. Jeśli argument typ zostanie pominięty, przyjmuje się, że jego wartość wynosi 0."
			}
		}
	},
	IRR: {
		description: "Zwraca wewnętrzną stopę zwrotu dla serii przepływów gotówkowych reprezentowanych przez wartości liczbowe. Przepływy gotówkowe nie muszą być równe takim, jakie byłyby dla całego roku. Muszą jednak występować w regularnych interwałach, np. rocznie lub miesięcznie. Wewnętrzna stopa zwrotu jest stopą zwrotu otrzymywaną z inwestycji składającej się z wydatków (wartości ujemne) i dochodów (wartości dodatnie) występujących regularnie.",
		abstract: "Zwraca wewnętrzną stopę zwrotu dla serii przepływów gotówkowych reprezentowanych przez wartości liczbowe. Przepływy gotówkowe nie muszą być równe takim, jakie byłyby dla całego roku. Muszą jednak występować w regularnych interwałach, np. rocznie lub miesięcznie. Wewnętrzna stopa zwrotu jest stopą zwrotu otrzymywaną z inwestycji składającej się z wydatków (wartości ujemne) i dochodów (wartości dodatnie) występujących regularnie.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/irr-function"
		}],
		functionParameter: {
			values: {
				name: "values",
				detail: "Tablica lub odwołanie do komórek zawierających liczby, dla których chcesz obliczyć wewnętrzną stopę zwrotu.\n1. Aby obliczyć wewnętrzną stopę zwrotu, wartości muszą zawierać co najmniej jedną wartość dodatnią i jedną ujemną.\n2. Funkcja IRR używa kolejności wartości do interpretowania kolejności przepływów gotówkowych. Wprowadź wartości płatności i dochodów w żądanej kolejności.\n3. Jeśli argument tablicowy lub odwołaniowy zawiera tekst, wartości logiczne lub puste komórki, są one ignorowane."
			},
			guess: {
				name: "guess",
				detail: "Liczba, która według Ciebie jest zbliżona do wyniku funkcji IRR."
			}
		}
	},
	ISPMT: {
		description: "Oblicza odsetki zapłacone (lub odebrane) dla określonego okresu pożyczki (lub inwestycji) przy równych spłatach kapitału.",
		abstract: "Oblicza odsetki zapłacone (lub odebrane) dla określonego okresu pożyczki (lub inwestycji) przy równych spłatach kapitału.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/ispmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Argument wymagany. Stopa procentowa inwestycji."
			},
			per: {
				name: "per",
				detail: "Argument wymagany. Okres, dla którego należy znaleźć odsetki i musi wynosić od 1 do liczba_okresów."
			},
			nper: {
				name: "nper",
				detail: "Argument wymagany. Całkowita liczba okresów płatności inwestycji."
			},
			pv: {
				name: "pv",
				detail: "Argument wymagany. Obecna wartość inwestycji. W przypadku pożyczki wb jest kwotą pożyczki."
			}
		}
	},
	MDURATION: {
		description: "Zwraca wartość zmodyfikowanego okresu Macauley'a dla papieru wartościowego o przyjętej wartości nominalnej 100 zł.",
		abstract: "Zwraca wartość zmodyfikowanego okresu Macauley'a dla papieru wartościowego o przyjętej wartości nominalnej 100 zł.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/mduration-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Wymagane. Data rozliczenia papieru wartościowego. Data rozliczenia papieru wartościowego jest datą sprzedaży papieru wartościowego nabywcy, datą późniejszą niż data emisji."
			},
			maturity: {
				name: "maturity",
				detail: "Wymagane. Data terminu płatności papieru wartościowego. Data spłaty to data, kiedy papier wartościowy traci ważność."
			},
			coupon: {
				name: "coupon",
				detail: "Wymagane. Roczna stopa kuponowa papieru wartościowego."
			},
			yld: {
				name: "yld",
				detail: "Wymagane. Roczna rentowność papieru wartościowego."
			},
			frequency: {
				name: "frequency",
				detail: "Wymagane. Liczba płatności kuponowych przypadających na jeden rok. W przypadku płatności rocznych częstotliwość = 1; w przypadku płatności półrocznych częstotliwość = 2; w przypadku płatności kwartalnych częstotliwość = 4."
			},
			basis: {
				name: "basis",
				detail: "Opcjonalne. Typ podstawy wyliczania dni, który zostanie użyty."
			}
		}
	},
	MIRR: {
		description: "Zwraca wartość zmodyfikowanej wewnętrznej stopy zwrotu dla serii okresowych przepływów gotówkowych. Funkcja MIRR bierze pod uwagę jednocześnie koszt inwestycji oraz procent uzyskany z ponownego zainwestowania środków pieniężnych.",
		abstract: "Zwraca wartość zmodyfikowanej wewnętrznej stopy zwrotu dla serii okresowych przepływów gotówkowych. Funkcja MIRR bierze pod uwagę jednocześnie koszt inwestycji oraz procent uzyskany z ponownego zainwestowania środków pieniężnych.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/mirr-function"
		}],
		functionParameter: {
			values: {
				name: "values",
				detail: "Wymagane. Tablica lub odwołanie do komórek zawierających liczby. Te liczby reprezentują płatności (wartości ujemne) i przychód (wartości dodatnie) występujące w równych odstępach czasu. Aby obliczyć zmodyfikowaną wewnętrzną stopę zwrotu, wartości muszą zawierać co najmniej jedną wartość dodatnią i jedną ujemną. W przeciwnym razie funkcja MIRR zwraca wartość #DIV/0! wartość błędu #ADR!. Jeśli argument tablicowy lub odwołaniowy zawiera tekst, wartości logiczne lub puste komórki, to wartości te są ignorowane; komórki o wartości zero są jednak włączane do obliczeń."
			},
			financeRate: {
				name: "finance_rate",
				detail: "Wymagane. Stopa oprocentowania pobierana od środków używanych w przepływach gotówkowych."
			},
			reinvestRate: {
				name: "reinvest_rate",
				detail: "Wymagane. Stopa oprocentowania otrzymywana od reinwestowanych przepływów gotówkowych."
			}
		}
	},
	NOMINAL: {
		description: "Zwraca roczną nominalną stopę procentową.",
		abstract: "Zwraca roczną nominalną stopę procentową.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/nominal-function"
		}],
		functionParameter: {
			effectRate: {
				name: "effect_rate",
				detail: "Efektywna stopa procentowa."
			},
			npery: {
				name: "npery",
				detail: "Liczba okresów kapitalizacji w roku."
			}
		}
	},
	NPER: {
		description: "Zwraca liczbę okresów inwestycji.",
		abstract: "Zwraca liczbę okresów inwestycji.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/nper-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Stopa procentowa przypadająca na okres."
			},
			pmt: {
				name: "pmt",
				detail: "Płatność dokonywana w każdym okresie; nie może się zmieniać w okresie trwania renty."
			},
			pv: {
				name: "pv",
				detail: "Wartość bieżąca, czyli kwota ryczałtowa, jaką seria przyszłych płatności jest warta obecnie."
			},
			fv: {
				name: "fv",
				detail: "Wartość przyszła, czyli saldo środków pieniężnych, które chcesz osiągnąć po dokonaniu ostatniej płatności."
			},
			type: {
				name: "type",
				detail: "Liczba 0 lub 1 wskazująca termin płatności."
			}
		}
	},
	NPV: {
		description: "Zwraca wartość bieżącą netto inwestycji na podstawie szeregu okresowych przepływów pieniężnych i stopy dyskontowej.",
		abstract: "Zwraca wartość bieżącą netto inwestycji na podstawie szeregu okresowych przepływów pieniężnych i stopy dyskontowej.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/npv-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Stopa dyskontowa dla jednego okresu."
			},
			value1: {
				name: "value1",
				detail: "Od 1 do 254 argumentów reprezentujących płatności i dochody."
			},
			value2: {
				name: "value2",
				detail: "Od 1 do 254 argumentów reprezentujących płatności i dochody."
			}
		}
	},
	ODDFPRICE: {
		description: "Zwraca cenę papieru wartościowego o wartości nominalnej 100 USD z nieregularnym pierwszym okresem.",
		abstract: "Zwraca cenę papieru wartościowego o wartości nominalnej 100 USD z nieregularnym pierwszym okresem.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/oddfprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Data rozliczenia papieru wartościowego."
			},
			maturity: {
				name: "maturity",
				detail: "Data terminu wykupu papieru wartościowego."
			},
			issue: {
				name: "issue",
				detail: "Data emisji papieru wartościowego."
			},
			firstCoupon: {
				name: "first_coupon",
				detail: "Data pierwszego kuponu papieru wartościowego."
			},
			rate: {
				name: "rate",
				detail: "Stopa procentowa papieru wartościowego."
			},
			yld: {
				name: "yld",
				detail: "Roczna rentowność papieru wartościowego."
			},
			redemption: {
				name: "redemption",
				detail: "Wartość wykupu przypadająca na 100 USD wartości nominalnej."
			},
			frequency: {
				name: "frequency",
				detail: "Liczba płatności kuponowych w roku. Dla płatności rocznych częstotliwość wynosi 1, półrocznych 2, a kwartalnych 4."
			},
			basis: {
				name: "basis",
				detail: "Typ używanej podstawy liczenia dni."
			}
		}
	},
	ODDFYIELD: {
		description: "Zwraca rentowność papieru wartościowego z nieregularnym pierwszym okresem.",
		abstract: "Zwraca rentowność papieru wartościowego z nieregularnym pierwszym okresem.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/oddfyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Data rozliczenia papieru wartościowego."
			},
			maturity: {
				name: "maturity",
				detail: "Data terminu wykupu papieru wartościowego."
			},
			issue: {
				name: "issue",
				detail: "Data emisji papieru wartościowego."
			},
			firstCoupon: {
				name: "first_coupon",
				detail: "Data pierwszego kuponu papieru wartościowego."
			},
			rate: {
				name: "rate",
				detail: "Stopa procentowa papieru wartościowego."
			},
			pr: {
				name: "pr",
				detail: "Cena papieru wartościowego."
			},
			redemption: {
				name: "redemption",
				detail: "Wartość wykupu przypadająca na 100 USD wartości nominalnej."
			},
			frequency: {
				name: "frequency",
				detail: "Liczba płatności kuponowych w roku. Dla płatności rocznych częstotliwość wynosi 1, półrocznych 2, a kwartalnych 4."
			},
			basis: {
				name: "basis",
				detail: "Typ używanej podstawy liczenia dni."
			}
		}
	},
	ODDLPRICE: {
		description: "Zwraca wartość ceny przypadającej na 100 zł wartości nominalnej papieru wartościowego o nietypowym (krótkim lub długim) ostatnim okresie.",
		abstract: "Zwraca wartość ceny przypadającej na 100 zł wartości nominalnej papieru wartościowego o nietypowym (krótkim lub długim) ostatnim okresie.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/oddlprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Wymagane. Data rozliczenia papieru wartościowego. Data rozliczenia papieru wartościowego jest datą sprzedaży papieru wartościowego nabywcy, datą późniejszą niż data emisji."
			},
			maturity: {
				name: "maturity",
				detail: "Wymagane. Data terminu płatności papieru wartościowego. Data spłaty to data, kiedy papier wartościowy traci ważność."
			},
			lastInterest: {
				name: "last_interest",
				detail: "Wymagane. Data ostatniej dywidendy od papieru wartościowego."
			},
			rate: {
				name: "rate",
				detail: "Wymagane. Stopa procentowa papieru wartościowego."
			},
			yld: {
				name: "yld",
				detail: "Wymagane. Roczna rentowność papieru wartościowego."
			},
			redemption: {
				name: "redemption",
				detail: "Wymagane. Wartość wykupu papieru wartościowego w przeliczeniu na 100 złotych wartości nominalnej."
			},
			frequency: {
				name: "frequency",
				detail: "Wymagane. Liczba płatności kuponowych przypadających na jeden rok. W przypadku płatności rocznych częstotliwość = 1; w przypadku płatności półrocznych częstotliwość = 2; w przypadku płatności kwartalnych częstotliwość = 4."
			},
			basis: {
				name: "basis",
				detail: "Opcjonalne. Typ podstawy wyliczania dni, który zostanie użyty."
			}
		}
	},
	ODDLYIELD: {
		description: "Zwraca wartość rentowności papieru wartościowego o nietypowym (długim lub krótkim) ostatnim okresie.",
		abstract: "Zwraca wartość rentowności papieru wartościowego o nietypowym (długim lub krótkim) ostatnim okresie.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/oddlyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Wymagane. Data rozliczenia papieru wartościowego. Data rozliczenia papieru wartościowego jest datą sprzedaży papieru wartościowego nabywcy, datą późniejszą niż data emisji."
			},
			maturity: {
				name: "maturity",
				detail: "Wymagane. Data terminu płatności papieru wartościowego. Data spłaty to data, kiedy papier wartościowy traci ważność."
			},
			lastInterest: {
				name: "last_interest",
				detail: "Wymagane. Data ostatniej dywidendy od papieru wartościowego."
			},
			rate: {
				name: "rate",
				detail: "Wymagane. Stopa procentowa papieru wartościowego."
			},
			pr: {
				name: "pr",
				detail: "Wymagane. Cena papieru wartościowego."
			},
			redemption: {
				name: "redemption",
				detail: "Wymagane. Wartość wykupu papieru wartościowego w przeliczeniu na 100 złotych wartości nominalnej."
			},
			frequency: {
				name: "frequency",
				detail: "Wymagane. Liczba płatności kuponowych przypadających na jeden rok. W przypadku płatności rocznych częstotliwość = 1; w przypadku płatności półrocznych częstotliwość = 2; w przypadku płatności kwartalnych częstotliwość = 4."
			},
			basis: {
				name: "basis",
				detail: "Opcjonalne. Typ podstawy wyliczania dni, który zostanie użyty."
			}
		}
	},
	PDURATION: {
		description: "Zwraca liczbę okresów wymaganych przez inwestycję do osiągnięcia określonej wartości.",
		abstract: "Zwraca liczbę okresów wymaganych przez inwestycję do osiągnięcia określonej wartości.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/pduration-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Wymagane. Stopa procentowa dla okresu."
			},
			pv: {
				name: "pv",
				detail: "Wymagane. Wb to obecna wartość inwestycji."
			},
			fv: {
				name: "fv",
				detail: "Wymagane. Wp to żądana przyszła wartość inwestycji."
			}
		}
	},
	PMT: {
		description: "Funkcja PMT , jedna z funkcji finansowych , oblicza kwotę spłaty pożyczki przy założeniu stałych spłat i stałej stopy procentowej.",
		abstract: "Funkcja PMT , jedna z funkcji finansowych , oblicza kwotę spłaty pożyczki przy założeniu stałych spłat i stałej stopy procentowej.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/pmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Argument wymagany. Stopa procentowa pożyczki."
			},
			nper: {
				name: "nper",
				detail: "Argument wymagany. Całkowita liczba spłat w ramach pożyczki."
			},
			pv: {
				name: "pv",
				detail: "Argument wymagany. Wartość bieżąca, czyli całkowita kwota będąca wartością serii przyszłych płatności (nazywana także kapitałem)."
			},
			fv: {
				name: "fv",
				detail: "Opcjonalnie. Przyszła wartość, czyli saldo kasowe, które ma zostać osiągnięte po dokonaniu ostatniej płatności. Jeśli argument wp zostanie pominięty, zostanie przyjęta wartość 0 (zero) (czyli przyszła wartość pożyczki wynosi 0)."
			},
			type: {
				name: "type",
				detail: "Opcjonalnie. Liczba 0 (zero) albo 1, która wskazuje, kiedy płatność jest należna."
			}
		}
	},
	PPMT: {
		description: "Zwraca spłaty kapitału w podanym okresie dla inwestycji w oparciu o stałe, okresowe płatności i stałą stopę procentową.",
		abstract: "Zwraca spłaty kapitału w podanym okresie dla inwestycji w oparciu o stałe, okresowe płatności i stałą stopę procentową.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/ppmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Wymagane. Stopa procentowa dla okresu."
			},
			per: {
				name: "per",
				detail: "Wymagane. Określa okres i musi znajdować się w zakresie od 1 do liczba_okresów."
			},
			nper: {
				name: "nper",
				detail: "Wymagane. Całkowita liczba okresów płatności w okresie spłaty."
			},
			pv: {
				name: "pv",
				detail: "Wymagane. Obecna wartość, czyli całkowita suma bieżącej wartości szeregu przyszłych płatności."
			},
			fv: {
				name: "fv",
				detail: "Opcjonalne. Przyszła wartość, czyli saldo kasowe, które ma zostać osiągnięte po dokonaniu ostatniej płatności. Jeśli argument wp zostanie pominięty, zostanie przyjęta wartość 0 (zero) (czyli przyszła wartość pożyczki wynosi 0)."
			},
			type: {
				name: "type",
				detail: "Opcjonalne. Liczba 0 albo 1, która wskazuje, kiedy płatność jest należna."
			}
		}
	},
	PRICE: {
		description: "Zwraca kwotę w przeliczeniu na 100 zł wartości nominalnej papieru wartościowego przynoszącego okresowe oprocentowanie.",
		abstract: "Zwraca kwotę w przeliczeniu na 100 zł wartości nominalnej papieru wartościowego przynoszącego okresowe oprocentowanie.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/price-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Wymagane. Data rozliczenia papieru wartościowego. Data rozliczenia papieru wartościowego jest datą sprzedaży papieru wartościowego nabywcy, datą późniejszą niż data emisji."
			},
			maturity: {
				name: "maturity",
				detail: "Wymagane. Data terminu płatności papieru wartościowego. Data spłaty to data, kiedy papier wartościowy traci ważność."
			},
			rate: {
				name: "rate",
				detail: "Wymagane. Roczna stopa kuponowa papieru wartościowego."
			},
			yld: {
				name: "yld",
				detail: "Wymagane. Roczna rentowność papieru wartościowego."
			},
			redemption: {
				name: "redemption",
				detail: "Wymagane. Wartość wykupu papieru wartościowego w przeliczeniu na 100 złotych wartości nominalnej."
			},
			frequency: {
				name: "frequency",
				detail: "Wymagane. Liczba płatności kuponowych przypadających na jeden rok. W przypadku płatności rocznych częstotliwość = 1; w przypadku płatności półrocznych częstotliwość = 2; w przypadku płatności kwartalnych częstotliwość = 4."
			},
			basis: {
				name: "basis",
				detail: "Opcjonalne. Typ podstawy wyliczania dni, który zostanie użyty."
			}
		}
	},
	PRICEDISC: {
		description: "Zwraca kwotę w przeliczeniu na 100 zł wartości nominalnej dyskontowanego papieru wartościowego.",
		abstract: "Zwraca kwotę w przeliczeniu na 100 zł wartości nominalnej dyskontowanego papieru wartościowego.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/pricedisc-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Wymagane. Data rozliczenia papieru wartościowego. Data rozliczenia papieru wartościowego jest datą sprzedaży papieru wartościowego nabywcy, datą późniejszą niż data emisji."
			},
			maturity: {
				name: "maturity",
				detail: "Wymagane. Data terminu płatności papieru wartościowego. Data spłaty to data, kiedy papier wartościowy traci ważność."
			},
			discount: {
				name: "discount",
				detail: "Wymagane. Stopa dyskontowa papieru wartościowego."
			},
			redemption: {
				name: "redemption",
				detail: "Wymagane. Wartość wykupu papieru wartościowego w przeliczeniu na 100 złotych wartości nominalnej."
			},
			basis: {
				name: "basis",
				detail: "Opcjonalne. Typ podstawy wyliczania dni, który zostanie użyty."
			}
		}
	},
	PRICEMAT: {
		description: "Zwraca kwotę w przeliczeniu na 100 zł wartości nominalnej papieru wartościowego dającą oprocentowanie w dniu płatności.",
		abstract: "Zwraca kwotę w przeliczeniu na 100 zł wartości nominalnej papieru wartościowego dającą oprocentowanie w dniu płatności.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/pricemat-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Wymagane. Data rozliczenia papieru wartościowego. Data rozliczenia papieru wartościowego jest datą sprzedaży papieru wartościowego nabywcy, datą późniejszą niż data emisji."
			},
			maturity: {
				name: "maturity",
				detail: "Wymagane. Data terminu płatności papieru wartościowego. Data spłaty to data, kiedy papier wartościowy traci ważność."
			},
			issue: {
				name: "issue",
				detail: "Wymagane. Data emisji papieru wartościowego wyrażona jako liczba kolejna daty."
			},
			rate: {
				name: "rate",
				detail: "Wymagane. Roczna stopa oprocentowania papieru wartościowego."
			},
			yld: {
				name: "yld",
				detail: "Wymagane. Roczna rentowność papieru wartościowego."
			},
			basis: {
				name: "basis",
				detail: "Opcjonalne. Typ podstawy wyliczania dni, który zostanie użyty."
			}
		}
	},
	PV: {
		description: "Funkcja PV , jedna z funkcji finansowych , oblicza bieżącą wartość pożyczki lub inwestycji przy założeniu stałej stopy procentowej. Funkcji PV można używać w przypadku okresowych, stałych płatności (takich jak kredyt hipoteczny lub inna pożyczka) albo przyszłej wartości będącej celem inwestycji.",
		abstract: "Funkcja PV , jedna z funkcji finansowych , oblicza bieżącą wartość pożyczki lub inwestycji przy założeniu stałej stopy procentowej. Funkcji PV można używać w przypadku okresowych, stałych płatności (takich jak kredyt hipoteczny lub inna pożyczka) albo przyszłej wartości będącej celem inwestycji.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/pv-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Argument wymagany. Stopa procentowa dla okresu. Na przykład w przypadku pożyczki na samochód oprocentowanej na 10 procent rocznie ze spłatami miesięcznymi miesięczna stopa procentowa wynosi 10%/12, czyli 0,83%. Dlatego jako oprocentowanie należy wprowadzić w formule wartość 10%/12 albo 0,83% bądź 0,0083."
			},
			nper: {
				name: "nper",
				detail: "Argument wymagany. Całkowita liczba okresów płatności w okresie spłaty. Na przykład osoba otrzymująca czteroletnią pożyczkę na samochód, spłacająca tę pożyczkę w miesięcznych ratach, będzie ją spłacać przez 4*12 (czyli 48) okresów. Dlatego jako argument liczba_okresów należy wprowadzić w formule liczbę 48."
			},
			pmt: {
				name: "pmt",
				detail: "Argument wymagany. Płatność dokonywana w każdym okresie, niezmienna przez cały okres pożyczki. Rata obejmuje zazwyczaj kapitał i odsetki z wyłączeniem innych opłat i podatków. Na przykład miesięczna spłata czteroletniej pożyczki na samochód w wysokości 10 000 zł oprocentowanej na 12% wynosi 263,33 zł. Jako argument rata należy wprowadzić w formule wartość -263,33. Jeśli argument rata zostanie pominięty, musi zostać podany argument wp."
			},
			fv: {
				name: "fv",
				detail: "Opcjonalnie. Przyszła wartość, czyli saldo kasowe, które ma zostać osiągnięte po dokonaniu ostatniej płatności. Jeśli argument wp jest pominięty, jest przyjmowana wartość 0 (na przykład przyszła wartość pożyczki wynosi 0). W przypadku oszczędzania przez 18 lat na potrzeby uzyskania kwoty 50 000 zł na określony cel 50 000 zł jest wartością przyszłą. Zakładając pewną stopę procentową, można obliczyć, ile pieniędzy trzeba odkładać co miesiąc. Jeśli argument wp zostanie pominięty, musi zostać podany argument rata."
			},
			type: {
				name: "type",
				detail: "Opcjonalnie. Liczba 0 albo 1, która wskazuje, kiedy płatność jest należna."
			}
		}
	},
	RATE: {
		description: "Zwraca stopę procentową dla każdego okresu raty rocznej. Funkcja RATE jest obliczana przez iterację i może zawierać zero lub więcej rozwiązań. Jeśli kolejne wyniki funkcji RATE nie są zbieżne z wartością 0,00000001 po 20 iteracjach, funkcja RATE zwraca #NUM! wartość błędu #ADR!.",
		abstract: "Zwraca stopę procentową dla każdego okresu raty rocznej. Funkcja RATE jest obliczana przez iterację i może zawierać zero lub więcej rozwiązań. Jeśli kolejne wyniki funkcji RATE nie są zbieżne z wartością 0,00000001 po 20 iteracjach, funkcja RATE zwraca #NUM! wartość błędu #ADR!.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/rate-function"
		}],
		functionParameter: {
			nper: {
				name: "nper",
				detail: "Wymagane. Całkowita liczba okresów płatności w okresie spłaty."
			},
			pmt: {
				name: "pmt",
				detail: "Wymagane. Płatność dokonywana w każdym okresie, niezmienna przez cały okres pożyczki. Rata obejmuje zazwyczaj kapitał i odsetki z wyłączeniem innych opłat i podatków. Jeśli argument rata zostanie pominięty, musi zostać umieszczony argument wp."
			},
			pv: {
				name: "pv",
				detail: "Wymagane. Obecna wartość, czyli całkowita suma bieżącej wartości szeregu przyszłych płatności."
			},
			fv: {
				name: "fv",
				detail: "Opcjonalne. Przyszła wartość, czyli saldo kasowe, które ma zostać osiągnięte po dokonaniu ostatniej płatności. Jeśli argument wp jest pominięty, za jego wartość jest uznawane 0 (przyszła wartość pożyczki na przykład wynosi 0). Jeśli argument wp zostanie pominięty, musi zostać podany argument rata."
			},
			type: {
				name: "type",
				detail: "Opcjonalne. Liczba 0 albo 1, która wskazuje, kiedy płatność jest należna."
			},
			guess: {
				name: "guess",
				detail: "Opcjonalne. Przypuszczenie co do wysokości oprocentowania. Jeśli pominie się argument przypuszczenie, to za jego wartość przyjmuje się 10%. Jeśli funkcja RATE nie jest zbieżna, należy spróbować innej wartości argumentu przypuszczenie. Funkcja RATE jest zwykle zbieżna dla wartości argumentu przypuszczenie zawartego pomiędzy 0 a 1."
			}
		}
	},
	RECEIVED: {
		description: "Zwraca kwotę uzyskaną w dniu spłaty dla w pełni ulokowanego papieru wartościowego.",
		abstract: "Zwraca kwotę uzyskaną w dniu spłaty dla w pełni ulokowanego papieru wartościowego.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/received-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Wymagane. Data rozliczenia papieru wartościowego. Data rozliczenia papieru wartościowego jest datą sprzedaży papieru wartościowego nabywcy, datą późniejszą niż data emisji."
			},
			maturity: {
				name: "maturity",
				detail: "Wymagane. Data terminu płatności papieru wartościowego. Data spłaty to data, kiedy papier wartościowy traci ważność."
			},
			investment: {
				name: "investment",
				detail: "Wymagane. Kwota zainwestowana w papier wartościowy."
			},
			discount: {
				name: "discount",
				detail: "Wymagane. Stopa dyskontowa papieru wartościowego."
			},
			basis: {
				name: "basis",
				detail: "Opcjonalne. Typ podstawy wyliczania dni, który zostanie użyty."
			}
		}
	},
	RRI: {
		description: "Zwraca równoważną stopę procentową dla określonego wzrostu wartości inwestycji.",
		abstract: "Zwraca równoważną stopę procentową dla określonego wzrostu wartości inwestycji.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/rri-function"
		}],
		functionParameter: {
			nper: {
				name: "nper",
				detail: "Wymagane. Liczba_okresów jest liczbą okresów płatności inwestycji."
			},
			pv: {
				name: "pv",
				detail: "Wymagane. Wb to obecna wartość inwestycji."
			},
			fv: {
				name: "fv",
				detail: "Wymagane. Wp to przyszła wartość inwestycji."
			}
		}
	},
	SLN: {
		description: "Zwraca wartość amortyzacji liniowej środka trwałego dla jednego okresu.",
		abstract: "Zwraca wartość amortyzacji liniowej środka trwałego dla jednego okresu.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/sln-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Wymagane. Początkowy koszt środka trwałego."
			},
			salvage: {
				name: "salvage",
				detail: "Wymagane. Wartość środka trwałego po zakończonej amortyzacji (zwana również wartością odzyskaną środka trwałego)."
			},
			life: {
				name: "life",
				detail: "Wymagane. Liczba okresów, w których środek trwały jest amortyzowany (argument ten nazywany jest czasami czasem użytkowania środka trwałego)."
			}
		}
	},
	SYD: {
		description: "Zwraca amortyzację środka trwałego w podanym okresie metodą sumy cyfr wszystkich lat amortyzacji.",
		abstract: "Zwraca amortyzację środka trwałego w podanym okresie metodą sumy cyfr wszystkich lat amortyzacji.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/syd-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Wymagane. Początkowy koszt środka trwałego."
			},
			salvage: {
				name: "salvage",
				detail: "Wymagane. Wartość środka trwałego po zakończonej amortyzacji (zwana również wartością odzyskaną środka trwałego)."
			},
			life: {
				name: "life",
				detail: "Wymagane. Liczba okresów, w których środek trwały jest amortyzowany (argument ten nazywany jest czasami czasem użytkowania środka trwałego)."
			},
			per: {
				name: "per",
				detail: "Wymagane. Okres musi być podany w takich samych jednostkach, jak argument czas_życia."
			}
		}
	},
	TBILLEQ: {
		description: "Zwraca rentowność ekwiwalentu dla weksla skarbowego.",
		abstract: "Zwraca rentowność ekwiwalentu dla weksla skarbowego.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/tbilleq-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Wymagane. Data rozliczenia weksla skarbowego. Data rozliczenia papieru wartościowego jest datą sprzedaży weksla skarbowego nabywcy, datą późniejszą niż data emisji."
			},
			maturity: {
				name: "maturity",
				detail: "Wymagane. Data spłaty weksla skarbowego. Data spłaty to data, kiedy weksel skarbowy traci ważność."
			},
			discount: {
				name: "discount",
				detail: "Wymagane. Stopa dyskontowa weksla skarbowego."
			}
		}
	},
	TBILLPRICE: {
		description: "Zwraca cenę przypadającą na 100 zł wartości nominalnej weksla skarbowego.",
		abstract: "Zwraca cenę przypadającą na 100 zł wartości nominalnej weksla skarbowego.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/tbillprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Wymagane. Data rozliczenia weksla skarbowego. Data rozliczenia papieru wartościowego jest datą sprzedaży weksla skarbowego nabywcy, datą późniejszą niż data emisji."
			},
			maturity: {
				name: "maturity",
				detail: "Wymagane. Data spłaty weksla skarbowego. Data spłaty to data, kiedy weksel skarbowy traci ważność."
			},
			discount: {
				name: "discount",
				detail: "Wymagane. Stopa dyskontowa weksla skarbowego."
			}
		}
	},
	TBILLYIELD: {
		description: "Zwraca rentowność weksla skarbowego.",
		abstract: "Zwraca rentowność weksla skarbowego.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/tbillyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Wymagane. Data rozliczenia weksla skarbowego. Data rozliczenia papieru wartościowego jest datą sprzedaży weksla skarbowego nabywcy, datą późniejszą niż data emisji."
			},
			maturity: {
				name: "maturity",
				detail: "Wymagane. Data spłaty weksla skarbowego. Data spłaty to data, kiedy weksel skarbowy traci ważność."
			},
			pr: {
				name: "pr",
				detail: "Wymagane. Cena weksla skarbowego przypadająca na każde 100 zł wartości nominalnej."
			}
		}
	},
	VDB: {
		description: "Zwraca amortyzację środka trwałego za podany okres, włączając w to podokresy, obliczając amortyzację metodą podwójnie malejącego salda lub inną podaną metodą. Nazwa VDB to skrót od słów Variable Declining Balance (Zmiennie malejące saldo).",
		abstract: "Zwraca amortyzację środka trwałego za podany okres, włączając w to podokresy, obliczając amortyzację metodą podwójnie malejącego salda lub inną podaną metodą. Nazwa VDB to skrót od słów Variable Declining Balance (Zmiennie malejące saldo).",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/vdb-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Wymagane. Początkowy koszt środka trwałego."
			},
			salvage: {
				name: "salvage",
				detail: "Wymagane. Wartość środka trwałego po zakończonej amortyzacji (zwana również wartością odzyskaną środka trwałego). Ta wartość może być równa 0."
			},
			life: {
				name: "life",
				detail: "Wymagane. Liczba okresów, w których środek trwały jest amortyzowany (argument ten nazywany jest czasami czasem użytkowania środka trwałego)."
			},
			startPeriod: {
				name: "start_period",
				detail: "Wymagane. Data rozpoczęcia obliczania odpisów amortyzacyjnych. Argument okres_początkowy musi być podany w tych samych jednostkach, co argument czas_życia."
			},
			endPeriod: {
				name: "end_period",
				detail: "Wymagane. Data zakończenia obliczania odpisów amortyzacyjnych. Argument okres_końcowy musi być podany w tych samych jednostkach, co argument czas_życia."
			},
			factor: {
				name: "factor",
				detail: "Opcjonalne. Szybkość, z jaką zmniejsza się saldo. Jeśli argument ten zostanie pominięty, to zakłada się, że wynosi 2 (metoda podwójnie malejącego salda). Jeśli użycie metody podwójnie malejącego salda jest niepożądane, należy zmienić wartość argumentu współczynnik. Aby poznać metodę podwójnie malejącego salda, zobacz opis funkcji DDB."
			},
			noSwitch: {
				name: "no_switch",
				detail: "Opcjonalne. Wartość logiczna określająca, czy przełączyć się na metodę liniową obliczania amortyzacji, kiedy amortyzacja jest większa niż obliczenie malejącego salda. Jeśli argument bez_przełączenia ma wartość PRAWDA, program Microsoft Excel nie przełącza się na metodę amortyzacji liniowej, nawet jeśli amortyzacja jest większa niż obliczenie malejącego salda. Jeśli argument bez_przełączenia ma wartość FAŁSZ lub jest pominięty, funkcja VDB przełącza się na metodę amortyzacji liniowej wtedy, gdy amortyzacja przewyższa obliczenie malejącego salda."
			}
		}
	},
	XIRR: {
		description: "Zwraca wartość wewnętrznej stopy zwrotu dla serii rozłożonych w czasie przepływów gotówkowych, niekoniecznie okresowych. Aby obliczyć wewnętrzną stopę zwrotu dla serii okresowych przepływów gotówkowych, należy użyć funkcji IRR.",
		abstract: "Zwraca wartość wewnętrznej stopy zwrotu dla serii rozłożonych w czasie przepływów gotówkowych, niekoniecznie okresowych. Aby obliczyć wewnętrzną stopę zwrotu dla serii okresowych przepływów gotówkowych, należy użyć funkcji IRR.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/xirr-function"
		}],
		functionParameter: {
			values: {
				name: "values",
				detail: "Wymagane. Seria przepływów gotówkowych odpowiadających zestawieniu płatności według dat. Pierwsza płatność jest opcjonalna i odpowiada kosztowi lub płatności występującej na początku inwestycji. Jeśli pierwsza wartość jest kosztem lub płatnością, musi być wartością ujemną. Wszystkie kolejne płatności są dyskontowane przy założeniu, że rok ma 365 dni. Seria wartości musi zawierać co najmniej jedną wartość dodatnią i jedną ujemną."
			},
			dates: {
				name: "dates",
				detail: "Wymagane. Zestawienie dat płatności odpowiadających płatnościom przepływów gotówkowych. Daty mogą występować w dowolnej kolejności. Daty powinny być wprowadzane przy użyciu funkcji DATA albo stanowić wyniki innych formuł lub funkcji. Na przykład w przypadku daty 23 maja 2008 należy użyć funkcji DATA(2008;5;23). Jeśli daty są wprowadzane jako tekst, mogą wystąpić problemy. ."
			},
			guess: {
				name: "guess",
				detail: "Opcjonalne. Liczba przypuszczalnie zbliżona do wyniku funkcji XIRR."
			}
		}
	},
	XNPV: {
		description: "Zwraca zdyskontowaną wartość netto serii przepływów gotówkowych, niekoniecznie okresowych. Aby obliczyć zdyskontowaną wartość netto serii przepływów gotówkowych okresowych, należy użyć funkcji NPV.",
		abstract: "Zwraca zdyskontowaną wartość netto serii przepływów gotówkowych, niekoniecznie okresowych. Aby obliczyć zdyskontowaną wartość netto serii przepływów gotówkowych okresowych, należy użyć funkcji NPV.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/xnpv-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Wymagane. Stopa dyskontowa do stosowania przy przepływach gotówkowych."
			},
			values: {
				name: "values",
				detail: "Wymagane. Seria przepływów gotówkowych odpowiadających zestawieniu płatności według dat. Pierwsza płatność jest opcjonalna i odpowiada kosztowi lub płatności występującej na początku inwestycji. Jeśli pierwsza wartość jest kosztem lub płatnością, musi być wartością ujemną. Wszystkie kolejne płatności są dyskontowane przy założeniu, że rok ma 365 dni. Seria wartości musi zawierać co najmniej jedną ujemną i dodatnią wartość."
			},
			dates: {
				name: "dates",
				detail: "Wymagane. Zestawienie dat płatności odpowiadających płatnościom przepływów gotówkowych. Pierwsza data płatności oznacza początek harmonogramu płatności. Wszystkie inne daty muszą być późniejsze, ale mogą występować w dowolnym porządku."
			}
		}
	},
	YIELD: {
		description: "Zwraca rentowność papieru wartościowego o okresowym oprocentowaniu. Z funkcji RENTOWNOŚĆ korzysta się do obliczania rentowności obligacji.",
		abstract: "Zwraca rentowność papieru wartościowego o okresowym oprocentowaniu. Z funkcji RENTOWNOŚĆ korzysta się do obliczania rentowności obligacji.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/yield-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Wymagane. Data rozliczenia papieru wartościowego. Data rozliczenia papieru wartościowego jest datą sprzedaży papieru wartościowego nabywcy, datą późniejszą niż data emisji."
			},
			maturity: {
				name: "maturity",
				detail: "Wymagane. Data terminu płatności papieru wartościowego. Data spłaty to data, kiedy papier wartościowy traci ważność."
			},
			rate: {
				name: "rate",
				detail: "Wymagane. Roczna stopa kuponowa papieru wartościowego."
			},
			pr: {
				name: "pr",
				detail: "Wymagane. Cena papieru wartościowego w przeliczeniu na 100 złotych wartości nominalnej."
			},
			redemption: {
				name: "redemption",
				detail: "Wymagane. Wartość wykupu papieru wartościowego w przeliczeniu na 100 złotych wartości nominalnej."
			},
			frequency: {
				name: "frequency",
				detail: "Wymagane. Liczba płatności kuponowych przypadających na jeden rok. W przypadku płatności rocznych częstotliwość = 1; w przypadku płatności półrocznych częstotliwość = 2; w przypadku płatności kwartalnych częstotliwość = 4."
			},
			basis: {
				name: "basis",
				detail: "Opcjonalne. Typ podstawy wyliczania dni, który zostanie użyty."
			}
		}
	},
	YIELDDISC: {
		description: "Zwraca roczną rentowność dyskontowanego papieru wartościowego.",
		abstract: "Zwraca roczną rentowność dyskontowanego papieru wartościowego.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/yielddisc-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Wymagane. Data rozliczenia papieru wartościowego. Data rozliczenia papieru wartościowego jest datą sprzedaży papieru wartościowego nabywcy, datą późniejszą niż data emisji."
			},
			maturity: {
				name: "maturity",
				detail: "Wymagane. Data terminu płatności papieru wartościowego. Data spłaty to data, kiedy papier wartościowy traci ważność."
			},
			pr: {
				name: "pr",
				detail: "Wymagane. Cena papieru wartościowego w przeliczeniu na 100 złotych wartości nominalnej."
			},
			redemption: {
				name: "redemption",
				detail: "Wymagane. Wartość wykupu papieru wartościowego w przeliczeniu na 100 złotych wartości nominalnej."
			},
			basis: {
				name: "basis",
				detail: "Opcjonalne. Typ podstawy wyliczania dni, który zostanie użyty."
			}
		}
	},
	YIELDMAT: {
		description: "Zwraca roczną rentowność dyskontowanego papieru wartościowego, dającego odsetki w dniu spłaty.",
		abstract: "Zwraca roczną rentowność dyskontowanego papieru wartościowego, dającego odsetki w dniu spłaty.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/yieldmat-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Wymagane. Data rozliczenia papieru wartościowego. Data rozliczenia papieru wartościowego jest datą sprzedaży papieru wartościowego nabywcy, datą późniejszą niż data emisji."
			},
			maturity: {
				name: "maturity",
				detail: "Wymagane. Data terminu płatności papieru wartościowego. Data spłaty to data, kiedy papier wartościowy traci ważność."
			},
			issue: {
				name: "issue",
				detail: "Wymagane. Data emisji papieru wartościowego wyrażona jako liczba kolejna daty."
			},
			rate: {
				name: "rate",
				detail: "Wymagane. Roczna stopa oprocentowania papieru wartościowego."
			},
			pr: {
				name: "pr",
				detail: "Wymagane. Cena papieru wartościowego w przeliczeniu na 100 złotych wartości nominalnej."
			},
			basis: {
				name: "basis",
				detail: "Opcjonalne. Typ podstawy wyliczania dni, który zostanie użyty."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/information/pl-PL.ts
const locale$8 = {
	CELL: {
		description: "Funkcja KOMÓRKA zwraca informacje o formatowaniu, położeniu lub zawartości komórki. Na przykład aby przed wykonaniem obliczeń na komórce sprawdzić, czy zawiera ona wartość liczbową, a nie tekst, można użyć następującej formuły:",
		abstract: "Funkcja KOMÓRKA zwraca informacje o formatowaniu, położeniu lub zawartości komórki. Na przykład aby przed wykonaniem obliczeń na komórce sprawdzić, czy zawiera ona wartość liczbową, a nie tekst, można użyć następującej formuły:",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/cell-function"
		}],
		functionParameter: {
			infoType: {
				name: "info_type",
				detail: "Jest to wartość tekstowa, określająca żądany typ informacji o komórce. Na poniższej liście przedstawiono możliwe wartości argumentu typ_info i odpowiadające im wyniki."
			},
			reference: {
				name: "reference",
				detail: "Jest to komórka, o której chcesz uzyskać informacje. W przypadku pominięcia tego argumentu zostaną zwrócone informacje określone w info_type argumencie dla komórki wybranej w momencie obliczania. Jeśli argument odwołania jest zakresem komórek, funkcja KOMÓRKA zwraca informacje o aktywnej komórce w zaznaczonym zakresie. Ważne: Chociaż z technicznego punktu widzenia odwoływanie się do niego jest opcjonalne, zalecane jest uwzględnianie go w formule, chyba że rozumiesz wpływ jego braku na wynik formuły i chcesz, aby ten efekt został zastosowany. Pominięcie argumentu odwołania nie daje rzetelnych informacji o konkretnej komórce z następujących powodów: W automatycznym trybie obliczania, jeśli komórka jest modyfikowana przez użytkownika, obliczenie może zostać wyzwolone przed lub po zaznaczeniu, w zależności od platformy używanej do obsługi programu Excel. Na przykład obecnie program Excel dla systemu Windows wyzwala obliczanie przed zmianą wyboru, ale program Excel dla sieci Web wyzwala je później. W Co-Authoring z innym użytkownikiem, który dokonuje edycji, ta funkcja zgłosi Twoją aktywną komórkę, a nie komórki edytującej. Każde ponowne obliczenie, na przykład naciśnięcie klawisza F9, spowoduje, że funkcja zwróci nowy wynik, nawet jeśli nie nastąpiła żadna edycja komórki."
			}
		}
	},
	ERROR_TYPE: {
		description: "Zwraca liczbę odpowiadającą jednej z wartości błędów w programie Microsoft Excel lub zwraca wartość błędu #N/D!, jeśli nie ma błędów. Funkcja NR.BŁĘDU może być stosowana z funkcją JEŻELI do testowania w poszukiwaniu wartości błędu; zwraca ona ciąg tekstowy, taki jak komunikat, zamiast wartości błędu.",
		abstract: "Zwraca liczbę odpowiadającą jednej z wartości błędów w programie Microsoft Excel lub zwraca wartość błędu #N/D!, jeśli nie ma błędów. Funkcja NR.BŁĘDU może być stosowana z funkcją JEŻELI do testowania w poszukiwaniu wartości błędu; zwraca ona ciąg tekstowy, taki jak komunikat, zamiast wartości błędu.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/error-type-function"
		}],
		functionParameter: { errorVal: {
			name: "error_val",
			detail: "Wymagane. Wartość błędu, której numer identyfikacyjny ma zostać odnaleziony. Chociaż argument wartość_błędu może być rzeczywistą wartością błędu, zwykle jest to odwołanie do komórki zawierającej formułę, która ma zostać przetestowana."
		} }
	},
	INFO: {
		description: "Zwraca informacje o bieżącym środowisku operacyjnym.",
		abstract: "Zwraca informacje o bieżącym środowisku operacyjnym.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/info-function"
		}],
		functionParameter: { typeText: {
			name: "Typ_tekst",
			detail: "Wymagane. Tekst określający typ zwracanych informacji."
		} }
	},
	ISBETWEEN: {
		description: "Sprawdza, czy podana liczba znajduje się między dwiema innymi liczbami, z uwzględnieniem lub bez uwzględniania wartości granicznych.",
		abstract: "Sprawdza, czy podana liczba znajduje się między dwiema innymi liczbami, z uwzględnieniem lub bez uwzględniania wartości granicznych.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/10538337?hl=pl"
		}],
		functionParameter: {
			valueToCompare: {
				name: "value_to_compare",
				detail: "Wartość, która ma zostać sprawdzona pod kątem znajdowania się między `lower_value` i `upper_value`."
			},
			lowerValue: {
				name: "lower_value",
				detail: "Dolna granica zakresu wartości, w którym może znajdować się `value_to_compare`."
			},
			upperValue: {
				name: "upper_value",
				detail: "Górna granica zakresu wartości, w którym może znajdować się `value_to_compare`."
			},
			lowerValueIsInclusive: {
				name: "lower_value_is_inclusive",
				detail: "Czy zakres wartości obejmuje `lower_value`. Domyślnie TRUE."
			},
			upperValueIsInclusive: {
				name: "upper_value_is_inclusive",
				detail: "Czy zakres wartości obejmuje `upper_value`. Domyślnie TRUE."
			}
		}
	},
	ISBLANK: {
		description: "Każda z tych funkcji, określanych zbiorczo mianem funkcji CZY , sprawdza typ wartości i zwraca wartość PRAWDA lub FAŁSZ w zależności od wyniku. Na przykład funkcja CZY.PUSTA zwraca wartość logiczną PRAWDA, jeśli wartość jest odwołaniem do pustej komórki; w innym przypadku zwraca wartość logiczną FAŁSZ.",
		abstract: "Każda z tych funkcji, określanych zbiorczo mianem funkcji CZY , sprawdza typ wartości i zwraca wartość PRAWDA lub FAŁSZ w zależności od wyniku. Na przykład funkcja CZY.PUSTA zwraca wartość logiczną PRAWDA, jeśli wartość jest odwołaniem do pustej komórki; w innym przypadku zwraca wartość logiczną FAŁSZ.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Wymagane. Jest to sprawdzana wartość. Wartość może być pusta (pusta komórka), może być wskazaniem błędu, wartością logiczną, tekstem, liczbą, odwołaniem lub nazwą odwołującą się do którejkolwiek z tych wartości."
		} }
	},
	ISDATE: {
		description: "Funkcja ISDATE zwraca informację, czy wartość jest datą.",
		abstract: "Funkcja ISDATE zwraca informację, czy wartość jest datą.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9061381?hl=pl"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Wartość, która ma zostać zweryfikowana jako data."
		} }
	},
	ISEMAIL: {
		description: "Funkcja ISEMAIL sprawdza, czy wartość jest prawidłowym adresem e-mail. Weryfikuje zgodność z powszechnie przyjętym formatem adresu e-mail, ale nie jego istnienie.",
		abstract: "Funkcja ISEMAIL sprawdza, czy wartość jest prawidłowym adresem e-mail. Weryfikuje zgodność z powszechnie przyjętym formatem adresu e-mail, ale nie jego istnienie.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3256503?hl=pl"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Wartość, która ma zostać zweryfikowana jako adres e-mail."
		} }
	},
	ISERR: {
		description: "Każda z tych funkcji, określanych zbiorczo mianem funkcji CZY , sprawdza typ wartości i zwraca wartość PRAWDA lub FAŁSZ w zależności od wyniku. Na przykład funkcja CZY.PUSTA zwraca wartość logiczną PRAWDA, jeśli wartość jest odwołaniem do pustej komórki; w innym przypadku zwraca wartość logiczną FAŁSZ.",
		abstract: "Każda z tych funkcji, określanych zbiorczo mianem funkcji CZY , sprawdza typ wartości i zwraca wartość PRAWDA lub FAŁSZ w zależności od wyniku. Na przykład funkcja CZY.PUSTA zwraca wartość logiczną PRAWDA, jeśli wartość jest odwołaniem do pustej komórki; w innym przypadku zwraca wartość logiczną FAŁSZ.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Wymagane. Jest to sprawdzana wartość. Wartość może być pusta (pusta komórka), może być wskazaniem błędu, wartością logiczną, tekstem, liczbą, odwołaniem lub nazwą odwołującą się do którejkolwiek z tych wartości."
		} }
	},
	ISERROR: {
		description: "Każda z tych funkcji, określanych zbiorczo mianem funkcji CZY , sprawdza typ wartości i zwraca wartość PRAWDA lub FAŁSZ w zależności od wyniku. Na przykład funkcja CZY.PUSTA zwraca wartość logiczną PRAWDA, jeśli wartość jest odwołaniem do pustej komórki; w innym przypadku zwraca wartość logiczną FAŁSZ.",
		abstract: "Każda z tych funkcji, określanych zbiorczo mianem funkcji CZY , sprawdza typ wartości i zwraca wartość PRAWDA lub FAŁSZ w zależności od wyniku. Na przykład funkcja CZY.PUSTA zwraca wartość logiczną PRAWDA, jeśli wartość jest odwołaniem do pustej komórki; w innym przypadku zwraca wartość logiczną FAŁSZ.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Wymagane. Jest to sprawdzana wartość. Wartość może być pusta (pusta komórka), może być wskazaniem błędu, wartością logiczną, tekstem, liczbą, odwołaniem lub nazwą odwołującą się do którejkolwiek z tych wartości."
		} }
	},
	ISEVEN: {
		description: "Zwraca wartość PRAWDA, jeśli liczba jest parzysta, lub FAŁSZ, jeśli liczba jest nieparzysta.",
		abstract: "Zwraca wartość PRAWDA, jeśli liczba jest parzysta, lub FAŁSZ, jeśli liczba jest nieparzysta.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/iseven-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Argument wymagany. Testowana wartość. Jeśli argument liczba nie jest liczbą całkowitą, jego wartość zostanie obcięta."
		} }
	},
	ISFORMULA: {
		description: "Sprawdza, czy istnieje odwołanie do komórki zawierającej formułę, i zwraca wartość PRAWDA lub FAŁSZ.",
		abstract: "Sprawdza, czy istnieje odwołanie do komórki zawierającej formułę, i zwraca wartość PRAWDA lub FAŁSZ.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/isformula-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "Wymagane. Argument odwołanie jest odwołaniem do komórki, która ma zostać sprawdzona. Argument odwołanie może być odwołaniem do komórki, formułą lub nazwą odwołującą się do komórki."
		} }
	},
	ISLOGICAL: {
		description: "Każda z tych funkcji, określanych zbiorczo mianem funkcji CZY , sprawdza typ wartości i zwraca wartość PRAWDA lub FAŁSZ w zależności od wyniku. Na przykład funkcja CZY.PUSTA zwraca wartość logiczną PRAWDA, jeśli wartość jest odwołaniem do pustej komórki; w innym przypadku zwraca wartość logiczną FAŁSZ.",
		abstract: "Każda z tych funkcji, określanych zbiorczo mianem funkcji CZY , sprawdza typ wartości i zwraca wartość PRAWDA lub FAŁSZ w zależności od wyniku. Na przykład funkcja CZY.PUSTA zwraca wartość logiczną PRAWDA, jeśli wartość jest odwołaniem do pustej komórki; w innym przypadku zwraca wartość logiczną FAŁSZ.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Wymagane. Jest to sprawdzana wartość. Wartość może być pusta (pusta komórka), może być wskazaniem błędu, wartością logiczną, tekstem, liczbą, odwołaniem lub nazwą odwołującą się do którejkolwiek z tych wartości."
		} }
	},
	ISNA: {
		description: "Każda z tych funkcji, określanych zbiorczo mianem funkcji CZY , sprawdza typ wartości i zwraca wartość PRAWDA lub FAŁSZ w zależności od wyniku. Na przykład funkcja CZY.PUSTA zwraca wartość logiczną PRAWDA, jeśli wartość jest odwołaniem do pustej komórki; w innym przypadku zwraca wartość logiczną FAŁSZ.",
		abstract: "Każda z tych funkcji, określanych zbiorczo mianem funkcji CZY , sprawdza typ wartości i zwraca wartość PRAWDA lub FAŁSZ w zależności od wyniku. Na przykład funkcja CZY.PUSTA zwraca wartość logiczną PRAWDA, jeśli wartość jest odwołaniem do pustej komórki; w innym przypadku zwraca wartość logiczną FAŁSZ.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Wymagane. Jest to sprawdzana wartość. Wartość może być pusta (pusta komórka), może być wskazaniem błędu, wartością logiczną, tekstem, liczbą, odwołaniem lub nazwą odwołującą się do którejkolwiek z tych wartości."
		} }
	},
	ISNONTEXT: {
		description: "Każda z tych funkcji, określanych zbiorczo mianem funkcji CZY , sprawdza typ wartości i zwraca wartość PRAWDA lub FAŁSZ w zależności od wyniku. Na przykład funkcja CZY.PUSTA zwraca wartość logiczną PRAWDA, jeśli wartość jest odwołaniem do pustej komórki; w innym przypadku zwraca wartość logiczną FAŁSZ.",
		abstract: "Każda z tych funkcji, określanych zbiorczo mianem funkcji CZY , sprawdza typ wartości i zwraca wartość PRAWDA lub FAŁSZ w zależności od wyniku. Na przykład funkcja CZY.PUSTA zwraca wartość logiczną PRAWDA, jeśli wartość jest odwołaniem do pustej komórki; w innym przypadku zwraca wartość logiczną FAŁSZ.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Wymagane. Jest to sprawdzana wartość. Wartość może być pusta (pusta komórka), może być wskazaniem błędu, wartością logiczną, tekstem, liczbą, odwołaniem lub nazwą odwołującą się do którejkolwiek z tych wartości."
		} }
	},
	ISNUMBER: {
		description: "Każda z tych funkcji, określanych zbiorczo mianem funkcji CZY , sprawdza typ wartości i zwraca wartość PRAWDA lub FAŁSZ w zależności od wyniku. Na przykład funkcja CZY.PUSTA zwraca wartość logiczną PRAWDA, jeśli wartość jest odwołaniem do pustej komórki; w innym przypadku zwraca wartość logiczną FAŁSZ.",
		abstract: "Każda z tych funkcji, określanych zbiorczo mianem funkcji CZY , sprawdza typ wartości i zwraca wartość PRAWDA lub FAŁSZ w zależności od wyniku. Na przykład funkcja CZY.PUSTA zwraca wartość logiczną PRAWDA, jeśli wartość jest odwołaniem do pustej komórki; w innym przypadku zwraca wartość logiczną FAŁSZ.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Wymagane. Jest to sprawdzana wartość. Wartość może być pusta (pusta komórka), może być wskazaniem błędu, wartością logiczną, tekstem, liczbą, odwołaniem lub nazwą odwołującą się do którejkolwiek z tych wartości."
		} }
	},
	ISODD: {
		description: "Zwraca wartość PRAWDA, jeśli liczba jest nieparzysta, lub FAŁSZ, jeśli liczba jest parzysta.",
		abstract: "Zwraca wartość PRAWDA, jeśli liczba jest nieparzysta, lub FAŁSZ, jeśli liczba jest parzysta.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/isodd-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Argument wymagany. Testowana wartość. Jeśli argument liczba nie jest liczbą całkowitą, jego wartość zostanie obcięta."
		} }
	},
	ISOMITTED: {
		description: "Sprawdza, czy brakuje wartości w funkcji LAMBDA , i zwraca wartość PRAWDA lub FAŁSZ.",
		abstract: "Sprawdza, czy brakuje wartości w funkcji LAMBDA , i zwraca wartość PRAWDA lub FAŁSZ.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/isomitted-function"
		}],
		functionParameter: { argument: {
			name: "Argument",
			detail: "Wartość, którą chcesz przetestować, na przykład parametr LAMBDA."
		} }
	},
	ISREF: {
		description: "Każda z tych funkcji, określanych zbiorczo mianem funkcji CZY , sprawdza typ wartości i zwraca wartość PRAWDA lub FAŁSZ w zależności od wyniku. Na przykład funkcja CZY.PUSTA zwraca wartość logiczną PRAWDA, jeśli wartość jest odwołaniem do pustej komórki; w innym przypadku zwraca wartość logiczną FAŁSZ.",
		abstract: "Każda z tych funkcji, określanych zbiorczo mianem funkcji CZY , sprawdza typ wartości i zwraca wartość PRAWDA lub FAŁSZ w zależności od wyniku. Na przykład funkcja CZY.PUSTA zwraca wartość logiczną PRAWDA, jeśli wartość jest odwołaniem do pustej komórki; w innym przypadku zwraca wartość logiczną FAŁSZ.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Wymagane. Jest to sprawdzana wartość. Wartość może być pusta (pusta komórka), może być wskazaniem błędu, wartością logiczną, tekstem, liczbą, odwołaniem lub nazwą odwołującą się do którejkolwiek z tych wartości."
		} }
	},
	ISTEXT: {
		description: "Każda z tych funkcji, określanych zbiorczo mianem funkcji CZY , sprawdza typ wartości i zwraca wartość PRAWDA lub FAŁSZ w zależności od wyniku. Na przykład funkcja CZY.PUSTA zwraca wartość logiczną PRAWDA, jeśli wartość jest odwołaniem do pustej komórki; w innym przypadku zwraca wartość logiczną FAŁSZ.",
		abstract: "Każda z tych funkcji, określanych zbiorczo mianem funkcji CZY , sprawdza typ wartości i zwraca wartość PRAWDA lub FAŁSZ w zależności od wyniku. Na przykład funkcja CZY.PUSTA zwraca wartość logiczną PRAWDA, jeśli wartość jest odwołaniem do pustej komórki; w innym przypadku zwraca wartość logiczną FAŁSZ.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Wymagane. Jest to sprawdzana wartość. Wartość może być pusta (pusta komórka), może być wskazaniem błędu, wartością logiczną, tekstem, liczbą, odwołaniem lub nazwą odwołującą się do którejkolwiek z tych wartości."
		} }
	},
	ISURL: {
		description: "Sprawdza, czy wartość jest prawidłowym adresem URL.",
		abstract: "Sprawdza, czy wartość jest prawidłowym adresem URL.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3256501?hl=pl"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Wartość, która ma zostać zweryfikowana jako adres URL."
		} }
	},
	N: {
		description: "Zwraca wartość skonwertowaną na liczbę.",
		abstract: "Zwraca wartość skonwertowaną na liczbę.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/n-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Wymagane. Wartość, którą należy przekonwertować. Funkcja N konwertuje wartości podane w poniższej tabeli."
		} }
	},
	NA: {
		description: "Zwraca wartość błędu #N/A. #N/D jest wartością błędu, która oznacza \"nie jest dostępna żadna wartość\". Użyj funkcji BRAK, aby oznaczyć puste komórki. Wprowadzając #N/A w komórkach, w których brakuje informacji, można uniknąć problemu przypadkowego uwzględniania pustych komórek w obliczeniach. (Jeśli formuła odwołuje się do komórki zawierającej #N/A, formuła zwraca wartość błędu #N/A).",
		abstract: "Zwraca wartość błędu #N/A. #N/D jest wartością błędu, która oznacza \"nie jest dostępna żadna wartość\". Użyj funkcji BRAK, aby oznaczyć puste komórki. Wprowadzając #N/A w komórkach, w których brakuje informacji, można uniknąć problemu przypadkowego uwzględniania pustych komórek w obliczeniach. (Jeśli formuła odwołuje się do komórki zawierającej #N/A, formuła zwraca wartość błędu #N/A).",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/na-function"
		}],
		functionParameter: {}
	},
	SHEET: {
		description: "Funkcja ARKUSZ zwraca numer arkusza określonego arkusza lub innego odwołania.",
		abstract: "Funkcja ARKUSZ zwraca numer arkusza określonego arkusza lub innego odwołania.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/sheet-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Argument opcjonalny. Służy do określania nazwy arkusza lub odwołania, dla którego chcesz uzyskać numer arkusza. W przeciwnym razie funkcja zwróci numer arkusza zawierającego funkcję ARKUSZ."
		} }
	},
	SHEETS: {
		description: "Zwraca liczbę arkuszy w odwołaniu.",
		abstract: "Zwraca liczbę arkuszy w odwołaniu.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/sheets-function"
		}],
		functionParameter: {}
	},
	TYPE: {
		description: "Zwraca typ wartości. Z funkcji TYP należy korzystać wtedy, gdy zachowanie innej funkcji zależy od typu wartości znajdującej się w określonej komórce.",
		abstract: "Zwraca typ wartości. Z funkcji TYP należy korzystać wtedy, gdy zachowanie innej funkcji zależy od typu wartości znajdującej się w określonej komórce.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/type-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Wymagane. Dowolna wartość używana przez program Microsoft Excel, taka jak liczba, wartość logiczna itp."
		} }
	}
};

//#endregion
//#region src/locale/function-list/logical/pl-PL.ts
const locale$7 = {
	AND: {
		description: "Funkcja ORAZ zwraca wartość PRAWDA, jeśli wszystkie jej argumenty mają wartość PRAWDA, lub FAŁSZ, jeśli choć jeden z jej argumentów ma wartość FAŁSZ.",
		abstract: "Funkcja ORAZ zwraca wartość PRAWDA, jeśli wszystkie jej argumenty mają wartość PRAWDA, lub FAŁSZ, jeśli choć jeden z jej argumentów ma wartość FAŁSZ.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/and-function"
		}],
		functionParameter: {
			logical1: {
				name: "logical1",
				detail: "Pierwszy warunek, który chcesz przetestować i który może przyjąć wartość TRUE lub FALSE."
			},
			logical2: {
				name: "logical2",
				detail: "Dodatkowe warunki, które chcesz przetestować i które mogą przyjąć wartość TRUE lub FALSE, maksymalnie 255 warunków."
			}
		}
	},
	BYCOL: {
		description: "Stosuje funkcję LAMBDA do każdej kolumny i zwraca tablicę wyników. Jeśli na przykład oryginalna tablica składa się z 3 kolumn na 2 wiersze, zwrócona tablica będzie składać się z 3 kolumn na 1 wiersz.",
		abstract: "Stosuje funkcję LAMBDA do każdej kolumny i zwraca tablicę wyników. Jeśli na przykład oryginalna tablica składa się z 3 kolumn na 2 wiersze, zwrócona tablica będzie składać się z 3 kolumn na 1 wiersz.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/bycol-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Tablica, która ma zostać podzielona według kolumn."
			},
			lambda: {
				name: "lambda",
				detail: "Funkcja LAMBDA przyjmująca kolumnę jako pojedynczy parametr i obliczająca jeden wynik. LAMBDA przyjmuje jeden parametr: kolumnę z array."
			}
		}
	},
	BYROW: {
		description: "Stosuje funkcję LAMBDA do każdego wiersza i zwraca tablicę wyników. Jeśli na przykład oryginalna tablica składa się z 3 kolumn na 2 wiersze, zwrócona tablica to 1 kolumna na 2 wiersze.",
		abstract: "Stosuje funkcję LAMBDA do każdego wiersza i zwraca tablicę wyników. Jeśli na przykład oryginalna tablica składa się z 3 kolumn na 2 wiersze, zwrócona tablica to 1 kolumna na 2 wiersze.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/byrow-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Tablica, która ma zostać podzielona według wierszy."
			},
			lambda: {
				name: "lambda",
				detail: "Funkcja LAMBDA przyjmująca wiersz jako pojedynczy parametr i obliczająca jeden wynik. LAMBDA przyjmuje jeden parametr: wiersz z array."
			}
		}
	},
	FALSE: {
		description: "Zwraca wartość logiczną FAŁSZ.",
		abstract: "Zwraca wartość logiczną FAŁSZ.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/false-function"
		}],
		functionParameter: {}
	},
	IF: {
		description: "Na przykład działanie formuły =JEŻELI(C2=\"Tak\";1;2) jest następujące: JEŻELI(C2 = Tak, to zwróć wartość 1, a w przeciwnym razie zwróć wartość 2).",
		abstract: "Na przykład działanie formuły =JEŻELI(C2=\"Tak\";1;2) jest następujące: JEŻELI(C2 = Tak, to zwróć wartość 1, a w przeciwnym razie zwróć wartość 2).",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/if-function"
		}],
		functionParameter: {
			logicalTest: {
				name: "logical_test",
				detail: "Warunek, który ma zostać sprawdzony."
			},
			valueIfTrue: {
				name: "value_if_true",
				detail: "Wartość, która ma zostać zwrócona, jeśli wynik logical_test ma wartość PRAWDA."
			},
			valueIfFalse: {
				name: "value_if_false",
				detail: "Wartość, która ma zostać zwrócona, jeśli wynik logical_test ma wartość FAŁSZ."
			}
		}
	},
	IFERROR: {
		description: "Za pomocą funkcji JEŻELI.BŁĄD można obsługiwać błędy w formule. Funkcja JEŻELI.BŁĄD zwraca określoną wartość, jeśli wynikiem formuły jest błąd. W przeciwnym razie zwraca wynik formuły.",
		abstract: "Za pomocą funkcji JEŻELI.BŁĄD można obsługiwać błędy w formule. Funkcja JEŻELI.BŁĄD zwraca określoną wartość, jeśli wynikiem formuły jest błąd. W przeciwnym razie zwraca wynik formuły.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/iferror-function"
		}],
		functionParameter: {
			value: {
				name: "value",
				detail: "Wymagane. Argument sprawdzany w poszukiwaniu błędu."
			},
			valueIfError: {
				name: "value_if_error",
				detail: "Wymagane. Wartość, która ma zostać zwrócona, jeśli wynikiem formuły jest błąd. Obliczane są następujące typy błędów: #N/A, #VALUE!, #REF!, #DIV/0!, #NUM!, #NAME?, lub #NULL!."
			}
		}
	},
	IFNA: {
		description: "Funkcja JEŻELI.ND zwraca określoną wartość, jeśli formuła zwraca wartość błędu #N/D! w przeciwnym razie zwraca wynik formuły.",
		abstract: "Funkcja JEŻELI.ND zwraca określoną wartość, jeśli formuła zwraca wartość błędu #N/D! w przeciwnym razie zwraca wynik formuły.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/ifna-function"
		}],
		functionParameter: {
			value: {
				name: "value",
				detail: "Argument sprawdzany pod kątem wartości błędu #N/D."
			},
			valueIfNa: {
				name: "value_if_na",
				detail: "Wartość zwracana, jeśli wynikiem formuły jest wartość błędu #N/D."
			}
		}
	},
	IFS: {
		description: "Funkcja WARUNKI sprawdza, czy spełniony jest co najmniej jeden warunek, i zwraca wartość odpowiadającą pierwszemu warunkowi TYPU PRAWDA. Funkcja WARUNKI może zastąpić wiele zagnieżdżonych instrukcji JEŻELI i jest znacznie łatwiejsza do odczytu w przypadku wielu warunków.",
		abstract: "Funkcja WARUNKI sprawdza, czy spełniony jest co najmniej jeden warunek, i zwraca wartość odpowiadającą pierwszemu warunkowi TYPU PRAWDA. Funkcja WARUNKI może zastąpić wiele zagnieżdżonych instrukcji JEŻELI i jest znacznie łatwiejsza do odczytu w przypadku wielu warunków.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/ifs-function"
		}],
		functionParameter: {
			logicalTest1: {
				name: "logical_test1",
				detail: "Warunek, który zwraca TRUE lub FALSE."
			},
			valueIfTrue1: {
				name: "value_if_true1",
				detail: "Wynik zwracany, jeśli logical_test1 zwraca TRUE. Może być pusty."
			},
			logicalTest2: {
				name: "logical_test2",
				detail: "Warunek, który zwraca TRUE lub FALSE."
			},
			valueIfTrue2: {
				name: "value_if_true2",
				detail: "Wynik zwracany, jeśli logical_testN zwraca TRUE. Każdy value_if_trueN odpowiada warunkowi logical_testN. Może być pusty."
			}
		}
	},
	LAMBDA: {
		description: "Możesz utworzyć funkcję dla często używanej formuły, wyeliminować konieczność jej kopiowania i wklejania (co zwiększa ryzyko błędu), a także dodawać własne funkcje do biblioteki natywnych funkcji programu Excel. Ponadto funkcja LAMBDA nie wymaga języka VBA, makr ani języka JavaScript, więc mogą również korzystać z niej niebędący programistami.",
		abstract: "Możesz utworzyć funkcję dla często używanej formuły, wyeliminować konieczność jej kopiowania i wklejania (co zwiększa ryzyko błędu), a także dodawać własne funkcje do biblioteki natywnych funkcji programu Excel. Ponadto funkcja LAMBDA nie wymaga języka VBA, makr ani języka JavaScript, więc mogą również korzystać z niej niebędący programistami.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/lambda-function"
		}],
		functionParameter: {
			parameter: {
				name: "parameter",
				detail: "Wartość, która ma zostać przekazana do funkcji, na przykład odwołanie do komórki, ciąg lub liczba. Możesz wprowadzić maksymalnie 253 parametry. Ten argument jest opcjonalny."
			},
			calculation: {
				name: "calculation",
				detail: "Formuła, która ma zostać wykonywana i zwrócona jako wynik funkcji. Musi to być ostatni argument i musi zwracać wynik. Jest to argument wymagany."
			}
		}
	},
	LET: {
		description: "Funkcja LET przypisuje nazwy do wyników obliczeń. Dzięki temu w formule przechowywane są pośrednie obliczenia, wartości i nazwy definiujące. Te nazwy mają zastosowanie tylko w zakresie LET funkcji. Podobnie jak zmienne w programowaniu są LET realizowane za pomocą natywnej składni formuły programu Excel.",
		abstract: "Funkcja LET przypisuje nazwy do wyników obliczeń. Dzięki temu w formule przechowywane są pośrednie obliczenia, wartości i nazwy definiujące. Te nazwy mają zastosowanie tylko w zakresie LET funkcji. Podobnie jak zmienne w programowaniu są LET realizowane za pomocą natywnej składni formuły programu Excel.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/let-function"
		}],
		functionParameter: {
			name1: {
				name: "name1",
				detail: "Pierwsza nazwa do przypisania. Musi zaczynać się od litery. Nie może być wynikiem formuły ani kolidować ze składnią zakresu."
			},
			nameValue1: {
				name: "name_value1",
				detail: "Wartość przypisana do name1."
			},
			calculationOrName2: {
				name: "calculation_or_name2",
				detail: "Jedno z następujących:\n1. Obliczenie używające wszystkich nazw w funkcji LET. Musi być ostatnim argumentem funkcji LET.\n2. Druga nazwa, do której przypisuje się drugą wartość name_value. Jeśli zostanie podana nazwa, argumenty name_value2 i calculation_or_name3 stają się wymagane."
			},
			nameValue2: {
				name: "name_value2",
				detail: "Wartość przypisana do calculation_or_name2."
			},
			calculationOrName3: {
				name: "calculation_or_name3",
				detail: "Jedno z następujących:\n1. Obliczenie używające wszystkich nazw w funkcji LET. Ostatni argument funkcji LET musi być obliczeniem.\n2. Trzecia nazwa, do której przypisuje się trzecią wartość name_value. Jeśli zostanie podana nazwa, argumenty name_value3 i calculation_or_name4 stają się wymagane."
			}
		}
	},
	MAKEARRAY: {
		description: "Zwraca obliczoną tablicę o określonym rozmiarze wiersza i kolumny, stosując funkcję LAMBDA .",
		abstract: "Zwraca obliczoną tablicę o określonym rozmiarze wiersza i kolumny, stosując funkcję LAMBDA .",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/makearray-function"
		}],
		functionParameter: {
			number1: {
				name: "rows",
				detail: "Liczba wierszy w tablicy. Musi być większa od zera."
			},
			number2: {
				name: "cols",
				detail: "Liczba kolumn w tablicy. Musi być większa od zera."
			},
			value3: {
				name: "lambda",
				detail: "Funkcja LAMBDA wywoływana w celu utworzenia tablicy. LAMBDA przyjmuje dwa parametry: row (indeks wiersza tablicy) oraz col (indeks kolumny tablicy)."
			}
		}
	},
	MAP: {
		description: "Zwraca tablicę utworzoną przez mapowanie każdej wartości w tablicach na nową wartość przez zastosowanie funkcji LAMBDA w celu utworzenia nowej wartości.",
		abstract: "Zwraca tablicę utworzoną przez mapowanie każdej wartości w tablicach na nową wartość przez zastosowanie funkcji LAMBDA w celu utworzenia nowej wartości.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/map-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Tablica array1 do mapowania."
			},
			array2: {
				name: "array2",
				detail: "Tablica array2 do mapowania."
			},
			lambda: {
				name: "lambda",
				detail: "Funkcja LAMBDA, która musi być ostatnim argumentem i musi mieć parametr dla każdej przekazanej tablicy."
			}
		}
	},
	NOT: {
		description: "Funkcja NIE odwraca wartość swojego argumentu.",
		abstract: "Funkcja NIE odwraca wartość swojego argumentu.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/not-function"
		}],
		functionParameter: { logical: {
			name: "logical",
			detail: "Warunek, którego logikę chcesz odwrócić i który może przyjąć wartość TRUE lub FALSE."
		} }
	},
	OR: {
		description: "Funkcja LUB zwraca wartość PRAWDA, jeśli dowolny z jej argumentów ma wartość PRAWDA, lub FAŁSZ, jeśli wszystkie z jej argumentów mają wartość FAŁSZ.",
		abstract: "Funkcja LUB zwraca wartość PRAWDA, jeśli dowolny z jej argumentów ma wartość PRAWDA, lub FAŁSZ, jeśli wszystkie z jej argumentów mają wartość FAŁSZ.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/or-function"
		}],
		functionParameter: {
			logical1: {
				name: "logical1",
				detail: "Pierwszy warunek, który chcesz przetestować i który może przyjąć wartość TRUE lub FALSE."
			},
			logical2: {
				name: "logical2",
				detail: "Dodatkowe warunki, które chcesz przetestować i które mogą przyjąć wartość TRUE lub FALSE, maksymalnie 255 warunków."
			}
		}
	},
	REDUCE: {
		description: "Zmniejsza tablicę do wartości skumulowanej, stosując funkcję LAMBDA do każdej wartości i zwracając całkowitą wartość w akumulatorze.",
		abstract: "Zmniejsza tablicę do wartości skumulowanej, stosując funkcję LAMBDA do każdej wartości i zwracając całkowitą wartość w akumulatorze.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/reduce-function"
		}],
		functionParameter: {
			initialValue: {
				name: "initial_value",
				detail: "Ustawia wartość początkową akumulatora."
			},
			array: {
				name: "array",
				detail: "Tablica, która ma zostać zmniejszona."
			},
			lambda: {
				name: "lambda",
				detail: "Funkcja LAMBDA wywoływana w celu zmniejszenia tablicy. Funkcja LAMBDA przyjmuje trzy parametry: Akumulator Wartość zsumowana i zwrócona jako wynik końcowy. Wartość Bieżąca wartość z tablicy. Ciała Obliczenie zastosowane do każdego elementu w tablicy."
			}
		}
	},
	SCAN: {
		description: "Skanuje tablicę, stosując funkcję LAMBDA do każdej wartości i zwraca tablicę, która ma każdą wartość pośrednią.",
		abstract: "Skanuje tablicę, stosując funkcję LAMBDA do każdej wartości i zwraca tablicę, która ma każdą wartość pośrednią.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/scan-function"
		}],
		functionParameter: {
			initialValue: {
				name: "initial_value",
				detail: "Ustawia wartość początkową akumulatora."
			},
			array: {
				name: "array",
				detail: "Tablica do skanowania."
			},
			lambda: {
				name: "lambda",
				detail: "Funkcja LAMBDA wywoływana do skanowania tablicy. LAMBDA przyjmuje trzy parametry: 1. zsumowaną wartość zwracaną jako wynik końcowy, 2. bieżącą wartość z tablicy oraz 3. obliczenie zastosowane do każdego elementu tablicy."
			}
		}
	},
	SWITCH: {
		description: "Funkcja PRZEŁĄCZ ocenia jedną wartość (nazywaną wyrażeniem ), korzystając z listy wartości, i zwraca wynik odpowiadający pierwszej zgodnej wartości. W przypadku braku dopasowania może zostać zwrócona opcjonalna wartość domyślna.",
		abstract: "Funkcja PRZEŁĄCZ ocenia jedną wartość (nazywaną wyrażeniem ), korzystając z listy wartości, i zwraca wynik odpowiadający pierwszej zgodnej wartości. W przypadku braku dopasowania może zostać zwrócona opcjonalna wartość domyślna.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/switch-function"
		}],
		functionParameter: {
			expression: {
				name: "expression",
				detail: "Expression to wartość (np. liczba, data lub tekst), która będzie porównywana z value1…value126."
			},
			value1: {
				name: "value1",
				detail: "ValueN to wartość porównywana z expression."
			},
			result1: {
				name: "result1",
				detail: "ResultN to wartość zwracana, gdy odpowiedni argument valueN pasuje do expression. Dla każdego odpowiedniego argumentu valueN należy podać ResultN."
			},
			defaultOrValue2: {
				name: "default_or_value2",
				detail: "Default to wartość zwracana, gdy w wyrażeniach valueN nie zostanie znalezione dopasowanie. Argument Default jest rozpoznawany po braku odpowiadającego mu wyrażenia resultN. Default musi być ostatnim argumentem funkcji."
			},
			result2: {
				name: "result2",
				detail: "ResultN to wartość zwracana, gdy odpowiedni argument valueN pasuje do expression. Dla każdego odpowiedniego argumentu valueN należy podać ResultN."
			}
		}
	},
	TRUE: {
		description: "Zwraca wartość logiczną PRAWDA. Tej funkcji można używać, gdy chcesz zwrócić wartość PRAWDA na podstawie warunku. Na przykład:",
		abstract: "Zwraca wartość logiczną PRAWDA. Tej funkcji można używać, gdy chcesz zwrócić wartość PRAWDA na podstawie warunku. Na przykład:",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/true-function"
		}],
		functionParameter: {}
	},
	XOR: {
		description: "Funkcja XOR zwraca wartość logiczną wykluczania lub wszystkich argumentów.",
		abstract: "Funkcja XOR zwraca wartość logiczną wykluczania lub wszystkich argumentów.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/xor-function"
		}],
		functionParameter: {
			logical1: {
				name: "logical1",
				detail: "Pierwszy warunek, który chcesz przetestować i który może przyjąć wartość TRUE lub FALSE."
			},
			logical2: {
				name: "logical2",
				detail: "Dodatkowe warunki, które chcesz przetestować i które mogą przyjąć wartość TRUE lub FALSE, maksymalnie 255 warunków."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/lookup/pl-PL.ts
const locale$6 = {
	ADDRESS: {
		description: "Za pomocą funkcji ADRES można uzyskać adres komórki w arkuszu, podając określony numer wiersza i kolumny. Na przykład funkcja ADRES(2;3) zwraca wartość $C$2 . W innym przykładzie funkcja ADRES(77;300) zwraca wartość $KN 77 zł . Za pomocą innych funkcji, takich jak WIERSZ i NR.KOLUMNY , można uzyskać argumenty numeru wiersza i numeru kolumny dla funkcji ADRES .",
		abstract: "Za pomocą funkcji ADRES można uzyskać adres komórki w arkuszu, podając określony numer wiersza i kolumny. Na przykład funkcja ADRES(2;3) zwraca wartość $C$2 . W innym przykładzie funkcja ADRES(77;300) zwraca wartość $KN 77 zł . Za pomocą innych funkcji, takich jak WIERSZ i NR.KOLUMNY , można uzyskać argumenty numeru wiersza i numeru kolumny dla funkcji ADRES .",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/address-function"
		}],
		functionParameter: {
			row_num: {
				name: "row number",
				detail: "Wymagane. Wartość liczbowa określająca numer wiersza, który ma zostać użyty w odwołaniu do komórki."
			},
			column_num: {
				name: "column number",
				detail: "Wymagane. Wartość liczbowa określająca numer kolumny, który ma zostać użyty w odwołaniu do komórki."
			},
			abs_num: {
				name: "type of reference",
				detail: "Opcjonalne. Wartość liczbowa określająca, jakiego typu odwołanie będzie zwracane przez funkcję."
			},
			a1: {
				name: "style of reference",
				detail: "Opcjonalne. Wartość logiczna określająca styl odwołania A1 lub W1K1. W stylu A1 kolumny są oznaczone alfabetycznie, a wiersze — numerycznie. W stylu odwołania W1K1 zarówno kolumny, jak i wiersze są oznaczone numerami. Jeśli argument A1 ma wartość PRAWDA lub jest pominięty, funkcja ADRES zwraca odwołanie w stylu A1. jeśli FAŁSZ, funkcja ADRES zwraca odwołanie w stylu W1K1. Uwaga Aby zmienić styl odwołań używany w programie Excel, kliknij kartę Plik , polecenie Opcje , a następnie kliknij kategorię Formuły . W obszarze Praca z formułami zaznacz lub wyczyść pole wyboru Styl odwołania W1K1 ."
			},
			sheet_text: {
				name: "worksheet name",
				detail: "Opcjonalne. Wartość tekstowa określająca nazwę arkusza, który ma być używany jako odwołanie zewnętrzne. Na przykład formuła =ADRES(1;1,,,\"Arkusz2\") zwraca wartość Arkusz2!$A$1 . Jeśli argument sheet_text zostanie pominięty, nie zostanie użyta nazwa arkusza, a adres zwrócony przez funkcję odwołuje się do komórki w bieżącym arkuszu."
			}
		}
	},
	AREAS: {
		description: "Zwraca liczbę obszarów w odwołaniu. Obszar jest to zakres przylegających do siebie komórek lub pojedyncza komórka.",
		abstract: "Zwraca liczbę obszarów w odwołaniu. Obszar jest to zakres przylegających do siebie komórek lub pojedyncza komórka.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/areas-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "Wymagane. Odwołanie do komórki lub zakresu komórek i może odwoływać się do wielu obszarów. Jeśli chcesz określić kilka odwołań jako jeden argument, musisz dołączyć dodatkowe zestawy nawiasów, aby program Microsoft Excel nie interpretował przecinka jako separatora pola. Zobacz poniższy przykład."
		} }
	},
	CHOOSE: {
		description: "Funkcja używa argumentu nr_arg, aby zwrócić wartość z listy argumentów wartości. Funkcja WYBIERZ służy do wybierania jednej z maksymalnie 254 wartości na podstawie numeru argumentu. Jeśli na przykład argumenty od wartość1 do wartość7 to dni tygodnia, funkcja WYBIERZ zwróci jeden z dni, gdy jako argument nr_arg zostanie użyta liczba z przedziału między 1 a 7.",
		abstract: "Funkcja używa argumentu nr_arg, aby zwrócić wartość z listy argumentów wartości. Funkcja WYBIERZ służy do wybierania jednej z maksymalnie 254 wartości na podstawie numeru argumentu. Jeśli na przykład argumenty od wartość1 do wartość7 to dni tygodnia, funkcja WYBIERZ zwróci jeden z dni, gdy jako argument nr_arg zostanie użyta liczba z przedziału między 1 a 7.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/choose-function"
		}],
		functionParameter: {
			indexNum: {
				name: "index_num",
				detail: "Określa, który argument wartości zostanie wybrany. index_num musi być liczbą od 1 do 254 albo formułą lub odwołaniem do komórki zawierającej taką liczbę.\nJeśli index_num wynosi 1, CHOOSE zwraca value1; jeśli 2, zwraca value2 itd.\nJeśli index_num jest mniejsze niż 1 lub większe niż numer ostatniej wartości na liście, CHOOSE zwraca błąd #VALUE!.\nJeśli index_num jest ułamkiem, przed użyciem zostaje obcięty do najniższej liczby całkowitej."
			},
			value1: {
				name: "value1",
				detail: "CHOOSE wybiera wartość lub działanie do wykonania na podstawie index_num. Argumentami mogą być liczby, odwołania do komórek, nazwy zdefiniowane, formuły, funkcje lub tekst."
			},
			value2: {
				name: "value2",
				detail: "Od 1 do 254 argumentów wartości."
			}
		}
	},
	CHOOSECOLS: {
		description: "Zwraca określone kolumny z tablicy.",
		abstract: "Zwraca określone kolumny z tablicy.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/choosecols-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Tablica zawierająca kolumny, które mają zostać zwrócone w nowej tablicy. Argument wymagany."
			},
			colNum1: {
				name: "col_num1",
				detail: "Pierwsza kolumna do zwrócenia. Argument wymagany."
			},
			colNum2: {
				name: "col_num2",
				detail: "Dodatkowe kolumny do zwrócenia. Argument opcjonalny."
			}
		}
	},
	CHOOSEROWS: {
		description: "Zwraca określone wiersze z tablicy.",
		abstract: "Zwraca określone wiersze z tablicy.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/chooserows-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Tablica zawierająca kolumny, które mają zostać zwrócone w nowej tablicy. Argument wymagany."
			},
			rowNum1: {
				name: "row_num1",
				detail: "Numer pierwszego wiersza, który ma zostać zwrócony. Argument wymagany."
			},
			rowNum2: {
				name: "row_num2",
				detail: "Dodatkowe numery wierszy do zwrócenia. Argument opcjonalny."
			}
		}
	},
	COLUMN: {
		description: "Funkcja NR.KOLUMNY zwraca numer kolumny danego odwołania do komórki. Na przykład formuła =KOLUMNA(D10) zwraca wartość 4, ponieważ kolumna D jest czwartą kolumną.",
		abstract: "Funkcja NR.KOLUMNY zwraca numer kolumny danego odwołania do komórki. Na przykład formuła =KOLUMNA(D10) zwraca wartość 4, ponieważ kolumna D jest czwartą kolumną.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/column-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "Komórka lub zakres komórek, dla których chcesz zwrócić numer kolumny."
		} }
	},
	COLUMNS: {
		description: "Zwraca liczbę kolumn w tablicy lub odwołaniu.",
		abstract: "Zwraca liczbę kolumn w tablicy lub odwołaniu.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/columns-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "Wymagane. Tablica lub formuła tablicowa albo odwołanie do zakresu komórek, dla którego ma zostać wybrana liczba kolumn."
		} }
	},
	DROP: {
		description: "Wyklucza określoną liczbę wierszy lub kolumn z początku lub końca tablicy. Ta funkcja może być przydatna do usuwania nagłówków i stopek w raporcie programu Excel w celu zwrócenia tylko danych.",
		abstract: "Wyklucza określoną liczbę wierszy lub kolumn z początku lub końca tablicy. Ta funkcja może być przydatna do usuwania nagłówków i stopek w raporcie programu Excel w celu zwrócenia tylko danych.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/drop-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Tablica, z której mają być upuszczanie wierszy lub kolumn."
			},
			rows: {
				name: "rows",
				detail: "Liczba wierszy do upuszczenia. Wartość ujemna powoduje przeniesienie z końca tablicy."
			},
			columns: {
				name: "columns",
				detail: "Liczba kolumn do wykluczenia. Wartość ujemna powoduje przeniesienie z końca tablicy."
			}
		}
	},
	EXPAND: {
		description: "Rozwija lub uzupełnia tablicę do określonych wymiarów wierszy i kolumn.",
		abstract: "Rozwija lub uzupełnia tablicę do określonych wymiarów wierszy i kolumn.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/expand-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Tablica do rozwinięcia."
			},
			rows: {
				name: "rows",
				detail: "Liczba wierszy w rozwiniętej tablicy. Jeśli go brakuje, wiersze nie zostaną rozwinięte."
			},
			columns: {
				name: "columns",
				detail: "Liczba kolumn w rozwiniętej tablicy. Jeśli go brakuje, kolumny nie zostaną rozwinięte."
			},
			padWith: {
				name: "pad_with",
				detail: "Wartość, za pomocą której ma zostać dopełnienie. Wartość domyślna to #N/D."
			}
		}
	},
	FILTER: {
		description: "W poniższym przykładzie użyto formuły =FILTRUJ(A5:D20;C5:C20=H2;\"\"\"), aby zwrócić wszystkie rekordy dla firmy Apple, zaznaczone w komórce H2, a jeśli nie ma jabłek, zwróć pusty ciąg (\"\").",
		abstract: "W poniższym przykładzie użyto formuły =FILTRUJ(A5:D20;C5:C20=H2;\"\"\"), aby zwrócić wszystkie rekordy dla firmy Apple, zaznaczone w komórce H2, a jeśli nie ma jabłek, zwróć pusty ciąg (\"\").",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/filter-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Tablica lub zakres do sortowania"
			},
			include: {
				name: "include",
				detail: "Tablicę logiczną, której wysokość lub szerokość jest taka sama jak tablicy"
			},
			ifEmpty: {
				name: "if_empty",
				detail: "Wartość zwracana, jeśli wszystkie wartości w załączonej tablicy są puste (filtr nic nie zwróci)"
			}
		}
	},
	FORMULATEXT: {
		description: "Zwraca formułę w postaci ciągu.",
		abstract: "Zwraca formułę w postaci ciągu.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/formulatext-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "Wymagane. Odwołanie do komórki lub zakresu komórek."
		} }
	},
	GETPIVOTDATA: {
		description: "Zwraca widoczne dane przechowywane w tabeli przestawnej.",
		abstract: "Zwraca widoczne dane przechowywane w tabeli przestawnej.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/getpivotdata-function"
		}],
		functionParameter: {
			dataField: {
				name: "dataField",
				detail: "Nazwa pola tabeli przestawnej zawierającego dane, które chcesz pobrać. Nazwa musi być ujęta w cudzysłów. Przykład: =WEŹDANETABELI(\"Sprzedaż\";A3). W tym miejscu \"Sprzedaż\" jest polem Wartości, które chcemy pobrać. Ponieważ nie określono żadnego innego pola, funkcja WEŹDANETABELI zwraca całkowitą kwotę sprzedaży."
			},
			pivotTable: {
				name: "pivotTable",
				detail: "Odwołanie do dowolnej komórki, zakresu komórek lub nazwanego zakresu komórek w tabeli przestawnej. Te informacje służą do określenia, która tabela przestawna zawiera dane do pobrania. Przykład: =WEŹDANETABELI(\"Sprzedaż\";A3). W tym miejscu komórka A3 jest odwołaniem wewnątrz tabeli przestawnej i informuje formułę, której tabeli przestawnej użyć."
			},
			field1: {
				name: "field1",
				detail: "Od 1 do 126 par nazw pól i nazw elementów, które opisują dane do pobrania. Pary mogą mieć dowolną kolejność. Nazwy pól oraz nazwy elementów innych niż daty i liczby muszą być ujęte w cudzysłów. Przykład: =WEŹDANETABELI(\"Sprzedaż\";A3;\"Miesiąc\";\"Mar\"). W tym miejscu pole to \"Miesiąc\", a elementem jest \"Mar\". Aby określić wiele elementów dla pola, ujmij je w nawiasy klamrowe (na przykład: {\"Mar\", \"Kwi\"}). W przypadku tabel przestawnych OLAP elementy mogą zawierać nazwę źródłową wymiaru, a także nazwę źródłową elementu. Para pola i elementu w przypadku tabeli przestawnej OLAP może wyglądać następująco: \"[Produkt]\";\"[Produkt].[Wszystkie Produkty].[Artykuły spożywcze].[Pieczywo]\""
			},
			item1: {
				name: "item1",
				detail: "Od 1 do 126 par nazw pól i nazw elementów, które opisują dane do pobrania. Pary mogą mieć dowolną kolejność. Nazwy pól oraz nazwy elementów innych niż daty i liczby muszą być ujęte w cudzysłów. Przykład: =WEŹDANETABELI(\"Sprzedaż\";A3;\"Miesiąc\";\"Mar\"). W tym miejscu pole to \"Miesiąc\", a elementem jest \"Mar\". Aby określić wiele elementów dla pola, ujmij je w nawiasy klamrowe (na przykład: {\"Mar\", \"Kwi\"}). W przypadku tabel przestawnych OLAP elementy mogą zawierać nazwę źródłową wymiaru, a także nazwę źródłową elementu. Para pola i elementu w przypadku tabeli przestawnej OLAP może wyglądać następująco: \"[Produkt]\";\"[Produkt].[Wszystkie Produkty].[Artykuły spożywcze].[Pieczywo]\""
			}
		}
	},
	HLOOKUP: {
		description: "Wyszukuje wartość w górnym wierszu tabeli lub tablicy wartości, a następnie zwraca wartość w tej samej kolumnie z wiersza określonego w tabeli lub w tablicy. Funkcji WYSZUKAJ.POZIOMO należy używać wtedy, gdy porównywane wartości są umieszczone w górnym wierszu tabeli danych i kiedy należy przeszukać określoną liczbę wierszy w dół. Funkcji WYSZUKAJ.PIONOWO należy używać wtedy, gdy porównywane wartości są umieszczone w kolumnie znajdującej się z lewej strony danych, które należy znaleźć.",
		abstract: "Wyszukuje wartość w górnym wierszu tabeli lub tablicy wartości, a następnie zwraca wartość w tej samej kolumnie z wiersza określonego w tabeli lub w tablicy. Funkcji WYSZUKAJ.POZIOMO należy używać wtedy, gdy porównywane wartości są umieszczone w górnym wierszu tabeli danych i kiedy należy przeszukać określoną liczbę wierszy w dół. Funkcji WYSZUKAJ.PIONOWO należy używać wtedy, gdy porównywane wartości są umieszczone w kolumnie znajdującej się z lewej strony danych, które należy znaleźć.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/hlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "Wymagane. Wartość, którą należy znaleźć w pierwszym wierszu tabeli. Szukana_wartość może być wartością, odwołaniem lub ciągiem tekstowym."
			},
			tableArray: {
				name: "table_array",
				detail: "Wymagane. Tabela zawierająca informacje, w której są poszukiwane dane. Należy używać odwołania do zakresu lub nazwy zakresu. Wartości w pierwszym wierszu tablicy określonej przez argument tabela_tablica mogą być tekstem, liczbami lub wartościami logicznymi. Jeśli argument przeszukiwany_zakres ma wartość PRAWDA, wartości w pierwszym wierszu tablicy określonej przez argument tabela_tablica muszą być umieszczone w kolejności rosnącej: ...-2, -1, 0, 1, 2,... , A-Z, FAŁSZ, PRAWDA; w przeciwnym przypadku funkcja WYSZUKAJ.POZIOMO może nie podać poprawnej wartości. Jeśli argument przeszukiwany_zakres ma wartość FAŁSZ, nie ma potrzeby sortowania argumentu tabela_tablica. Teksty pisane dużymi i małymi literami są równoważne. Wartości są sortowane w kolejności rosnącej, od lewej do prawej. Aby uzyskać więcej informacji, zobacz Sortowanie danych w zakresie lub tabeli ."
			},
			rowIndexNum: {
				name: "row_index_num",
				detail: "Wymagane. Numer wiersza w table_array, z którego zostanie zwrócona zgodna wartość. Row_index_num 1 zwraca wartość pierwszego wiersza w table_array, row_index_num 2 zwraca drugą wartość wiersza w table_array itd. Jeśli row_index_num jest mniejsza niż 1, funkcja WYSZUKAJ.POZIOMO zwraca #VALUE! wartość błędu; jeśli row_index_num jest większa niż liczba wierszy na table_array, funkcja WYSZUKAJ.POZIOMO zwraca #REF! wartość błędu #ADR!."
			},
			rangeLookup: {
				name: "range_lookup",
				detail: "Opcjonalne. Wartość logiczna określająca, czy funkcja WYSZUKAJ.POZIOMO ma znaleźć dokładne czy przybliżone dopasowanie. Jeśli tą wartością jest PRAWDA bądź argument został pominięty, zwracane jest przybliżone dopasowanie. Innymi słowy, jeśli nie zostanie znalezione dokładne dopasowanie, zwracana jest następna największa wartość, która jest mniejsza niż argument szukana_wartość. Jeśli tą wartością jest FAŁSZ, funkcja WYSZUKAJ.POZIOMO wyszuka dokładne dopasowanie. Jeśli nie zostanie znalezione, zwracana jest wartość błędu #N/D!."
			}
		}
	},
	HSTACK: {
		description: "Dołącza tablice w poziomie i w sekwencji, aby zwrócić większą tablicę.",
		abstract: "Dołącza tablice w poziomie i w sekwencji, aby zwrócić większą tablicę.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/hstack-function"
		}],
		functionParameter: {
			array1: {
				name: "array",
				detail: "Tablice do dołączenia."
			},
			array2: {
				name: "array",
				detail: "Tablice do dołączenia."
			}
		}
	},
	HYPERLINK: {
		description: "Tworzy hiperłącze w komórce.",
		abstract: "Tworzy hiperłącze w komórce.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3093313?hl=pl"
		}],
		functionParameter: {
			url: {
				name: "url",
				detail: "Pełny adres URL miejsca docelowego łącza w cudzysłowie albo odwołanie do komórki zawierającej taki adres URL. Dozwolone są tylko określone typy łączy: http://, https://, mailto:, aim:, ftp://, gopher://, telnet:// i news://. Jeśli podano inny protokół, link_label będzie wyświetlany w komórce bez hiperłącza. Jeśli nie podano protokołu, zakłada się http:// i dodaje go przed url."
			},
			linkLabel: {
				name: "link_label",
				detail: "[ OPCJONALNE — domyślnie url ] — Tekst wyświetlany w komórce jako łącze, ujęty w cudzysłów, albo odwołanie do komórki zawierającej taki tekst. Jeśli link_label odwołuje się do pustej komórki, url zostanie wyświetlony jako łącze, jeśli jest prawidłowy, w przeciwnym razie jako zwykły tekst. Jeśli link_label jest pustym ciągiem (\"\"), komórka będzie wyglądała na pustą, ale łącze nadal będzie dostępne."
			}
		}
	},
	IMAGE: {
		description: "Funkcja OBRAZ wstawia obrazy do komórek z lokalizacji źródłowej wraz z tekstem alternatywnym. Następnie możesz przenosić i zmieniać rozmiar komórek, sortować i filtrować oraz pracować z obrazami w tabeli programu Excel. Ta funkcja służy do wizualnego ulepszania list danych, takich jak spisy, gry, pracownicy i pojęcia matematyczne.",
		abstract: "Funkcja OBRAZ wstawia obrazy do komórek z lokalizacji źródłowej wraz z tekstem alternatywnym. Następnie możesz przenosić i zmieniać rozmiar komórek, sortować i filtrować oraz pracować z obrazami w tabeli programu Excel. Ta funkcja służy do wizualnego ulepszania list danych, takich jak spisy, gry, pracownicy i pojęcia matematyczne.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/image-function"
		}],
		functionParameter: {
			source: {
				name: "source",
				detail: "Ścieżka URL pliku obrazu używająca protokołu „https”."
			},
			altText: {
				name: "alt_text",
				detail: "Tekst alternatywny opisujący obraz na potrzeby dostępności."
			},
			sizing: {
				name: "sizing",
				detail: "Określa wymiary obrazu."
			},
			height: {
				name: "height",
				detail: "Niestandardowa wysokość obrazu w pikselach."
			},
			width: {
				name: "width",
				detail: "Niestandardowa szerokość obrazu w pikselach."
			}
		}
	},
	INDEX: {
		description: "Zwraca wartość elementu w tabeli lub tablicy, wybranego przez indeksy numerów kolumn i wierszy.",
		abstract: "Zwraca wartość elementu w tabeli lub tablicy, wybranego przez indeksy numerów kolumn i wierszy.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/index-function"
		}],
		functionParameter: {
			reference: {
				name: "reference",
				detail: "Odwołanie do co najmniej jednego zakresu komórek."
			},
			rowNum: {
				name: "row_num",
				detail: "Numer wiersza w reference, z którego ma zostać zwrócone odwołanie."
			},
			columnNum: {
				name: "column_num",
				detail: "Numer kolumny w reference, z której ma zostać zwrócone odwołanie."
			},
			areaNum: {
				name: "area_num",
				detail: "Wybiera zakres w reference, z którego ma zostać zwrócone przecięcie row_num i column_num."
			}
		}
	},
	INDIRECT: {
		description: "Zwraca odwołanie wyznaczone przez ciąg tekstowy. Odwołania są obliczane natychmiast, aby wyświetlić ich zawartość. Należy skorzystać z funkcji ADR.POŚR, aby zmienić odwołanie do komórki w formule bez zmieniania samej formuły.",
		abstract: "Zwraca odwołanie wyznaczone przez ciąg tekstowy. Odwołania są obliczane natychmiast, aby wyświetlić ich zawartość. Należy skorzystać z funkcji ADR.POŚR, aby zmienić odwołanie do komórki w formule bez zmieniania samej formuły.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/indirect-function"
		}],
		functionParameter: {
			refText: {
				name: "ref_text",
				detail: "Wymagane. Odwołanie do komórki zawierającej odwołanie w stylu A1, odwołanie w stylu R1C1, nazwę zdefiniowaną jako odwołanie lub odwołanie do komórki jako ciąg tekstowy. Jeśli argument adres_tekst nie jest prawidłowym odwołaniem do komórki, funkcja ADR.POŚR zwraca błąd #ADR! wartość błędu #ADR!. Jeśli ref_text odwołuje się do innego skoroszytu (odwołanie zewnętrzne), drugi skoroszyt musi być otwarty. Jeśli skoroszyt źródłowy nie jest otwarty, funkcja ADR.POŚR zwraca błąd #ADR! wartość błędu #ADR!. Uwaga Odwołania zewnętrzne nie są obsługiwane w aplikacji internetowej Excel. Jeśli argument adres_tekst odwołuje się do zakresu komórek poza limitem 1 048 576 wierszy lub limitem 16 384 kolumn (XFD), funkcja ADR.POŚR zwraca błąd #ADR! #ZABLOKOWANE!."
			},
			a1: {
				name: "a1",
				detail: "Opcjonalne. Wartość logiczna określająca, jaki typ odwołania znajduje się w komórce adres_tekst. Jeśli wartością argumentu a1 jest PRAWDA lub jest on pominięty, argument adres_tekst jest interpretowany jako odwołanie typu A1. Jeśli wartością argumentu a1 jest FAŁSZ, argument adres_tekst jest interpretowany jako odwołanie typu W1K1."
			}
		}
	},
	LOOKUP: {
		description: "W formie wektorowej funkcja WYSZUKAJ wyszukuje wartości w zakresie jednowierszowym lub jednokolumnowym (określanym jako wektor) i zwraca wartości z tej samej pozycji w drugim zakresie jednowierszowym lub jednokolumnowym.",
		abstract: "W formie wektorowej funkcja WYSZUKAJ wyszukuje wartości w zakresie jednowierszowym lub jednokolumnowym (określanym jako wektor) i zwraca wartości z tej samej pozycji w drugim zakresie jednowierszowym lub jednokolumnowym.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/lookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "Wartość wyszukiwana przez LOOKUP w pierwszym wektorze. lookup_value może być liczbą, tekstem, wartością logiczną, nazwą lub odwołaniem wskazującym wartość."
			},
			lookupVectorOrArray: {
				name: "lookup_vectorOrArray",
				detail: "Zakres zawierający tylko jeden wiersz albo jedną kolumnę."
			},
			resultVector: {
				name: "result_vector",
				detail: "Zakres zawierający tylko jeden wiersz albo jedną kolumnę. result_vector musi mieć taki sam rozmiar jak lookup_vector."
			}
		}
	},
	MATCH: {
		description: "Funkcja PODAJ.POZYCJĘ wyszukuje określony element w zakresie komórek, a następnie zwraca względną pozycję tego elementu w zakresie. Jeśli na przykład zakres A1:A3 zawiera wartości 5, 25 i 38, formuła =PODAJ.POZYCJĘ(25;A1:A3;0) zwraca liczbę 2, ponieważ 25 jest drugim elementem w zakresie.",
		abstract: "Funkcja PODAJ.POZYCJĘ wyszukuje określony element w zakresie komórek, a następnie zwraca względną pozycję tego elementu w zakresie. Jeśli na przykład zakres A1:A3 zawiera wartości 5, 25 i 38, formuła =PODAJ.POZYCJĘ(25;A1:A3;0) zwraca liczbę 2, ponieważ 25 jest drugim elementem w zakresie.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/match-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "Funkcja PODAJ.POZYCJĘ znajduje największą wartość, która jest mniejsza niż lub równa lookup_value . Wartości argumentu lookup_array muszą być umieszczone w kolejności rosnącej, na przykład: ...-2, -1, 0, 1, 2, ..., A-Z, FAŁSZ, PRAWDA."
			},
			lookupArray: {
				name: "lookup_array",
				detail: "Funkcja PODAJ.POZYCJĘ znajduje pierwszą wartość, która jest dokładnie równa lookup_value . Wartości argumentu lookup_array mogą być w dowolnej kolejności."
			},
			matchType: {
				name: "match_type",
				detail: "Funkcja PODAJ.POZYCJĘ znajduje najmniejszą wartość, która jest większa niż lub równa lookup_value . Wartości argumentu lookup_array muszą być umieszczone w kolejności malejącej, na przykład: PRAWDA, FAŁSZ, Z-A, ... 2, 1, 0, -1, -2, ...i tak dalej."
			}
		}
	},
	OFFSET: {
		description: "Zwraca odwołanie do zakresu, który jest podaną liczbą wierszy lub kolumn począwszy od komórki lub zakresu komórek. Zwrócone odwołanie może być pojedynczą komórką lub zakresem komórek. Można określić liczbę zwracanych wierszy i kolumn.",
		abstract: "Zwraca odwołanie do zakresu, który jest podaną liczbą wierszy lub kolumn począwszy od komórki lub zakresu komórek. Zwrócone odwołanie może być pojedynczą komórką lub zakresem komórek. Można określić liczbę zwracanych wierszy i kolumn.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/offset-function"
		}],
		functionParameter: {
			reference: {
				name: "reference",
				detail: "Wymagane. Odwołanie, od którego wyznacza się przesunięcie. Odwołanie musi określać komórkę lub zakres sąsiadujących komórek. W przeciwnym wypadku funkcja PRZESUNIĘCIE zwróci wartość błędu #ARG!."
			},
			rows: {
				name: "rows",
				detail: "Wymagane. Liczba wierszy w górę lub w dół, o które należy przesunąć lewą górną komórkę. Podanie wartości 5 jako argumentu wiersze oznacza, że lewa górna komórka odwołania jest pięć wierszy poniżej odwołania określonego przez argument odwołanie. Argument wiersze może być dodatni (co oznacza przesunięcie w dół) lub ujemny (co oznacza przesunięcie w górę)."
			},
			cols: {
				name: "columns",
				detail: "Wymagane. Liczba kolumn w lewo lub w prawo, o które należy przesunąć lewą górną komórkę wynikową. Podanie wartości 5 jako argumentu kolumny oznacza, że lewa górna komórka odwołania jest pięć kolumn na prawo od odwołania określonego przez argument odwołanie. Argument kolumny może być dodatni (co oznacza przesunięcie w prawo) lub ujemny (co oznacza przesunięcie w lewo)."
			},
			height: {
				name: "height",
				detail: "Opcjonalne. Wysokość, jako liczba wierszy, którą ma mieć zwracane odwołanie. Wysokość musi być liczbą dodatnią."
			},
			width: {
				name: "width",
				detail: "Opcjonalne. Szerokość, jako liczba kolumn, którą ma mieć zwracane odwołanie. Szerokość musi być liczbą dodatnią."
			}
		}
	},
	ROW: {
		description: "Zwraca numer wiersza odwołania.",
		abstract: "Zwraca numer wiersza odwołania.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/row-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "Opcjonalne. Komórka lub zakres komórek, dla których ma zostać określony numer wiersza. Jeśli argument odwołanie zostanie pominięty, przyjmuje się, że jest to odwołanie do komórki, w której pojawia się funkcja WIERSZ. Jeśli argument odwołanie jest zakresem komórek i jeśli argument WIERSZ jest wprowadzany jako tablica pionowa, funkcja WIERSZ zwraca numery wierszy odwołania jako tablicę pionową. Odwołanie nie może odnosić się do wielu obszarów."
		} }
	},
	ROWS: {
		description: "Zwraca liczbę wierszy w odwołaniu lub tablicy.",
		abstract: "Zwraca liczbę wierszy w odwołaniu lub tablicy.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/rows-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "Wymagane. Tablica, formuła tablicowa lub odwołanie do zakresu komórek, dla którego ma zostać wybrana liczba wierszy."
		} }
	},
	RTD: {
		description: "Pobiera dane czasu rzeczywistego z programu obsługującego automatyzację COM.",
		abstract: "Pobiera dane czasu rzeczywistego z programu obsługującego automatyzację COM.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/rtd-function"
		}],
		functionParameter: {
			progId: {
				name: "progId",
				detail: "Wymagane. Nazwa identyfikatora ProgID zarejestrowanego dodatku automatyzacji COM zainstalowanego na komputerze lokalnym. Nazwa musi być ujęta w cudzysłów."
			},
			server: {
				name: "server",
				detail: "Wymagane. Nazwa serwera, na którym dodatek ma zostać uruchomiony. Jeśli nie ma serwera, a program jest uruchamiany lokalnie, należy pozostawić ten argument pusty. W przeciwnym razie należy ująć nazwę serwera w cudzysłów (\"\"). Gdy funkcja DANE.CZASU.RZECZ jest używana w języku Visual Basic for Applications (VBA), dla serwera jest wymagany podwójny cudzysłów lub właściwość VBA NullString , nawet jeśli serwer jest uruchamiany lokalnie."
			},
			topic1: {
				name: "topic1",
				detail: "Temat1 jest wymagany, pozostałe tematy są opcjonalne. Od 1 do 253 parametrów, które wspólnie reprezentują unikatowy zestaw danych czasu rzeczywistego."
			},
			topic2: {
				name: "topic2",
				detail: "Temat1 jest wymagany, pozostałe tematy są opcjonalne. Od 1 do 253 parametrów, które wspólnie reprezentują unikatowy zestaw danych czasu rzeczywistego."
			}
		}
	},
	SORT: {
		description: "W tym przykładzie sortujemy pojedynczo wg pól Region, Przedstawiciel handlowy i Produkt za pomocą funkcji =SORTUJ(A2:A17), kopiując przez komórki F2, H2 oraz J2.",
		abstract: "W tym przykładzie sortujemy pojedynczo wg pól Region, Przedstawiciel handlowy i Produkt za pomocą funkcji =SORTUJ(A2:A17), kopiując przez komórki F2, H2 oraz J2.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/sort-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Zakres lub tablica do posortowania"
			},
			sortIndex: {
				name: "sort_index",
				detail: "Liczba wskazująca wiersz lub kolumnę według których mają zostać posortowane dane"
			},
			sortOrder: {
				name: "sort_order",
				detail: "Liczba wskazująca żądaną kolejność sortowania; 1 dla kolejności rosnącej (domyślnie), -1 dla kolejności malejącej"
			},
			byCol: {
				name: "by_col",
				detail: "Wartość logiczna wskazująca żądaną kolejność sortowania; FAŁSZ, aby sortować wg wierszy (domyślnie); PRAWDA, aby sortować wg kolumn"
			}
		}
	},
	SORTBY: {
		description: "W tym przykładzie sortujemy listę nazwisk osób według ich wieku, w kolejności rosnącej.",
		abstract: "W tym przykładzie sortujemy listę nazwisk osób według ich wieku, w kolejności rosnącej.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/sortby-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Tablica lub zakres do sortowania"
			},
			byArray1: {
				name: "by_array1",
				detail: "Tablica lub zakres do sortowania według"
			},
			sortOrder1: {
				name: "sort_order1",
				detail: "Kolejność sortowania. 1 dla rosnącej, -1 dla malejącej. Wartość domyślna to rosnąco."
			},
			byArray2: {
				name: "by_array2",
				detail: "Tablica lub zakres do sortowania według"
			},
			sortOrder2: {
				name: "sort_order2",
				detail: "Kolejność sortowania. 1 dla rosnącej, -1 dla malejącej. Wartość domyślna to rosnąco."
			}
		}
	},
	TAKE: {
		description: "Zwraca określoną liczbę ciągłych wierszy lub kolumn od początku lub końca tablicy.",
		abstract: "Zwraca określoną liczbę ciągłych wierszy lub kolumn od początku lub końca tablicy.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/take-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Tablica, z której mają zostać pobrane wiersze lub kolumny."
			},
			rows: {
				name: "rows",
				detail: "Liczba wierszy do wykonania. Wartość ujemna pobiera z końca tablicy."
			},
			columns: {
				name: "columns",
				detail: "Liczba kolumn do podjęcia. Wartość ujemna pobiera z końca tablicy."
			}
		}
	},
	TOCOL: {
		description: "Zwraca tablicę w jednej kolumnie.",
		abstract: "Zwraca tablicę w jednej kolumnie.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/tocol-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Tablica lub odwołanie, które ma zostać zwrócone jako kolumna."
			},
			ignore: {
				name: "ignore",
				detail: "Określa, czy ignorować określone typy wartości. Domyślnie żadne wartości nie są ignorowane:\n0 Zachowaj wszystkie wartości (domyślnie)\n1 Ignoruj puste komórki\n2 Ignoruj błędy\n3 Ignoruj puste komórki i błędy"
			},
			scanByColumn: {
				name: "scan_by_column",
				detail: "Skanuje tablicę według kolumn. Domyślnie tablica jest skanowana według wierszy. Skanowanie określa, czy wartości są uporządkowane według wierszy, czy kolumn."
			}
		}
	},
	TOROW: {
		description: "Zwraca tablicę w jednym wierszu.",
		abstract: "Zwraca tablicę w jednym wierszu.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/torow-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Tablica lub odwołanie, które ma zostać zwrócone jako wiersz."
			},
			ignore: {
				name: "ignore",
				detail: "Określa, czy ignorować określone typy wartości. Domyślnie żadne wartości nie są ignorowane:\n0 Zachowaj wszystkie wartości (domyślnie)\n1 Ignoruj puste komórki\n2 Ignoruj błędy\n3 Ignoruj puste komórki i błędy"
			},
			scanByColumn: {
				name: "scan_by_column",
				detail: "Skanuje tablicę według kolumn. Domyślnie tablica jest skanowana według wierszy. Skanowanie określa, czy wartości są uporządkowane według wierszy, czy kolumn."
			}
		}
	},
	TRANSPOSE: {
		description: "Czasem konieczne jest przemieszczenie lub obrócenie komórek. Możesz to zrobić, korzystając z funkcji kopiowania i wklejania oraz opcji Transpozycja . Efektem będzie jednak zduplikowanie danych. Jeśli nie chcesz duplikować danych, możesz zamiast tego wpisać formułę z funkcją TRANSPONUJ. Na przykład na poniższym obrazie formuła =TRANSPONUJ(A1:B4) pobiera komórki od A1 do B4 i rozmieszcza je w poziomie.",
		abstract: "Czasem konieczne jest przemieszczenie lub obrócenie komórek. Możesz to zrobić, korzystając z funkcji kopiowania i wklejania oraz opcji Transpozycja . Efektem będzie jednak zduplikowanie danych. Jeśli nie chcesz duplikować danych, możesz zamiast tego wpisać formułę z funkcją TRANSPONUJ. Na przykład na poniższym obrazie formuła =TRANSPONUJ(A1:B4) pobiera komórki od A1 do B4 i rozmieszcza je w poziomie.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/transpose-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "Zakres komórek lub tablica w arkuszu."
		} }
	},
	UNIQUE: {
		description: "Zwraca unikatowe nazwy z listy nazw",
		abstract: "Zwraca unikatowe nazwy z listy nazw",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/unique-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Zakres tablicy, z którego powinny zostać zwrócone unikalne rzędy lub kolumny"
			},
			byCol: {
				name: "by_col",
				detail: "Argument by_col jest wartością logiczną wskazującą sposób porównywania. PRAWDA porówna kolumny ze sobą i zwróci unikatowe kolumny FAŁSZ (lub pominięte) porówna wiersze ze sobą i zwróci unikatowe wiersze"
			},
			exactlyOnce: {
				name: "exactly_once",
				detail: "Argument exactly_once jest wartością logiczną, która zwraca wiersze lub kolumny występujące dokładnie raz w zakresie lub tablicy. Jest to koncepcja bazy danych dotycząca unikatowości. PRAWDA zwróci wszystkie odrębne wiersze lub kolumny, które występują dokładnie raz z zakresie lub tablicy FAŁSZ (lub pominięte) zwróci wszystkie odrębne wiersze lub kolumny z zakresie lub tablicy"
			}
		}
	},
	VLOOKUP: {
		description: "Użyj funkcji WYSZUKAJ.PIONOWO do wyszukiwania wartości w tabeli.",
		abstract: "Użyj funkcji WYSZUKAJ.PIONOWO do wyszukiwania wartości w tabeli.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/vlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "Wartość, której chcesz szukać. Musi znajdować się w pierwszej kolumnie zakresu komórek określonego w argumencie table_array."
			},
			tableArray: {
				name: "table_array",
				detail: "Zakres komórek, w którym VLOOKUP szuka lookup_value i wartości zwracanej. Możesz użyć nazwanego zakresu lub tabeli oraz nazw zamiast odwołań do komórek."
			},
			colIndexNum: {
				name: "col_index_num",
				detail: "Numer kolumny zawierającej wartość zwracaną, zaczynając od 1 dla skrajnie lewej kolumny table_array."
			},
			rangeLookup: {
				name: "range_lookup",
				detail: "Wartość logiczna określająca, czy VLOOKUP ma znaleźć przybliżone czy dokładne dopasowanie: przybliżone — 1/TRUE, dokładne — 0/FALSE."
			}
		}
	},
	VSTACK: {
		description: "Dołącza tablice w poziomie i w sekwencji, aby zwrócić większą tablicę.",
		abstract: "Dołącza tablice w poziomie i w sekwencji, aby zwrócić większą tablicę.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/vstack-function"
		}],
		functionParameter: {
			array1: {
				name: "array",
				detail: "Tablice do dołączenia."
			},
			array2: {
				name: "array",
				detail: "Tablice do dołączenia."
			}
		}
	},
	WRAPCOLS: {
		description: "Zawija podany wiersz lub kolumnę wartości według kolumn po określonej liczbie elementów, aby utworzyć nową tablicę.",
		abstract: "Zawija podany wiersz lub kolumnę wartości według kolumn po określonej liczbie elementów, aby utworzyć nową tablicę.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/wrapcols-function"
		}],
		functionParameter: {
			vector: {
				name: "vector",
				detail: "Wektor lub odwołanie do zawijania."
			},
			wrapCount: {
				name: "wrap_count",
				detail: "Maksymalna liczba wartości dla każdej kolumny."
			},
			padWith: {
				name: "pad_with",
				detail: "Wartość, za pomocą której ma zostać dopełnienie. Wartość domyślna to #N/D."
			}
		}
	},
	WRAPROWS: {
		description: "Zawija podany wiersz lub kolumnę wartości według wierszy po określonej liczbie elementów, aby utworzyć nową tablicę.",
		abstract: "Zawija podany wiersz lub kolumnę wartości według wierszy po określonej liczbie elementów, aby utworzyć nową tablicę.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/wraprows-function"
		}],
		functionParameter: {
			vector: {
				name: "vector",
				detail: "Wektor lub odwołanie do zawijania."
			},
			wrapCount: {
				name: "wrap_count",
				detail: "Maksymalna liczba wartości dla każdego wiersza."
			},
			padWith: {
				name: "pad_with",
				detail: "Wartość, za pomocą której ma zostać dopełnienie. Wartość domyślna to #N/D."
			}
		}
	},
	XLOOKUP: {
		description: "Użyj funkcji X.WYSZUKAJ w celu znajdowania danych w tabeli lub zakresie według wierszy. Na przykład wyszukaj cenę części samochodowej według numeru części lub znajdź nazwisko pracownika na podstawie jego identyfikatora pracownika. Dzięki funkcji X.WYSZUKAJ możesz szukać wyszukiwanego terminu w jednej kolumnie i zwracać wynik z tego samego wiersza w innej kolumnie, niezależnie od tego, po której stronie znajduje się kolumna zwrotna.",
		abstract: "Użyj funkcji X.WYSZUKAJ w celu znajdowania danych w tabeli lub zakresie według wierszy. Na przykład wyszukaj cenę części samochodowej według numeru części lub znajdź nazwisko pracownika na podstawie jego identyfikatora pracownika. Dzięki funkcji X.WYSZUKAJ możesz szukać wyszukiwanego terminu w jednej kolumnie i zwracać wynik z tego samego wiersza w innej kolumnie, niezależnie od tego, po której stronie znajduje się kolumna zwrotna.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/xlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "Wartość do wyszukania *W przypadku pominięcia funkcja X.WYSZUKAJ zwraca puste komórki, które znajduje w lookup_array ."
			},
			lookupArray: {
				name: "lookup_array",
				detail: "Tablica lub zakres do przeszukania"
			},
			returnArray: {
				name: "return_array",
				detail: "Tablica lub zakres do zwrócenia"
			},
			ifNotFound: {
				name: "if_not_found",
				detail: "Jeśli prawidłowe dopasowanie nie zostanie znalezione, zwrócony zostanie podany tekst [jeżeli_nie_znaleziono]. Jeśli nie znaleziono prawidłowego dopasowania i brakuje [jeżeli_nie_znaleziono], zwracany jest błąd #N/D ."
			},
			matchMode: {
				name: "match_mode",
				detail: "Określ typ dopasowania: 0 — Dokładne dopasowanie. Jeśli nie znaleziono żadnego elementu, zwróć błąd #N/D. To jest domyślne ustawienie. -1 — Dokładne dopasowanie. Jeśli nie znaleziono żadnego elementu, zwróć następny mniejszy element. 1 — Dokładne dopasowanie. Jeśli nie znaleziono żadnego elementu, zwróć następny większy element. 2— dopasowanie z symbolem wieloznacznym, gdzie znaki *, ? i ~ mają specjalne znaczenie ."
			},
			searchMode: {
				name: "search_mode",
				detail: "Określ tryb wyszukiwania, którego chcesz użyć: 1 — Wyszukiwanie rozpoczyna się od pierwszego elementu. To jest domyślne ustawienie. -1 — Wyszukiwanie odwrotne rozpoczyna się od ostatniego elementu. 2 — Wyszukiwanie binarne polegające na sortowaniu tablicy szukana_tablica w kolejności rosnącej . Jeśli sortowanie nie zostanie wykonane, zostaną zwrócone nieprawidłowe wyniki. -2 — wyszukiwanie binarne polegające na sortowaniu elementu szukana_tablica w kolejności malejącej . Jeśli sortowanie nie zostanie wykonane, zostaną zwrócone nieprawidłowe wyniki."
			}
		}
	},
	XMATCH: {
		description: "Załóżmy, że mamy listę produktów w komórkach od C3 do C7 i chcemy ustalić, gdzie na liście znajduje się produkt z komórki E3. W tym miejscu użyjemy funkcji XMATCH do określenia pozycji elementu na liście.",
		abstract: "Załóżmy, że mamy listę produktów w komórkach od C3 do C7 i chcemy ustalić, gdzie na liście znajduje się produkt z komórki E3. W tym miejscu użyjemy funkcji XMATCH do określenia pozycji elementu na liście.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/xmatch-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "Szukana wartość"
			},
			lookupArray: {
				name: "lookup_array",
				detail: "Tablica lub zakres do przeszukania"
			},
			matchMode: {
				name: "match_mode",
				detail: "Określ typ dopasowania: 0 — dokładne dopasowanie (domyślne) -1 — dokładne dopasowanie lub następny najmniejszy element 1 — dokładne dopasowanie lub następny największy element 2— dopasowanie z symbolem wieloznacznym, gdzie znaki *, ? i ~ mają specjalne znaczenie ."
			},
			searchMode: {
				name: "search_mode",
				detail: "Określ typ wyszukiwania: 1 — wyszukiwanie od pierwszego do ostatniego (domyślne) -1 — wyszukiwanie od ostatniego do pierwszego (wyszukiwanie odwrócone) 2 — Wyszukiwanie binarne polegające na sortowaniu tablicy szukana_tablica w kolejności rosnącej . Jeśli sortowanie nie zostanie wykonane, zostaną zwrócone nieprawidłowe wyniki. -2 — wyszukiwanie binarne polegające na sortowaniu elementu szukana_tablica w kolejności malejącej . Jeśli sortowanie nie zostanie wykonane, zostaną zwrócone nieprawidłowe wyniki."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/math/pl-PL.ts
const locale$5 = {
	ABS: {
		description: "Zwraca wartość bezwzględną liczby. Wartość bezwzględna liczby to liczba bez znaku.",
		abstract: "Zwraca wartość bezwzględną liczby.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/abs-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Liczba rzeczywista, której wartość bezwzględną chcesz otrzymać."
		} }
	},
	ACOS: {
		description: "Zwraca arcus cosinus lub odwrotny cosinus liczby. Arcus cosinus jest wartością kąta, którego cosinus to liczba . Wyznaczona wartość w radianach należy do przedziału od 0 (zero) do pi.",
		abstract: "Zwraca arcus cosinus lub odwrotny cosinus liczby. Arcus cosinus jest wartością kąta, którego cosinus to liczba . Wyznaczona wartość w radianach należy do przedziału od 0 (zero) do pi.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/acos-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Argument wymagany. Cosinus poszukiwanego kąta. Musi należeć do przedziału od -1 do 1."
		} }
	},
	ACOSH: {
		description: "Zwraca arcus cosinus hiperboliczny liczby. Liczba musi być większa niż lub równa 1. Arcus cosinus hiperboliczny jest wartością, której cosinus hiperboliczny to liczba , dlatego ACOSH(COSH(liczba)) równa się liczba .",
		abstract: "Zwraca arcus cosinus hiperboliczny liczby. Liczba musi być większa niż lub równa 1. Arcus cosinus hiperboliczny jest wartością, której cosinus hiperboliczny to liczba , dlatego ACOSH(COSH(liczba)) równa się liczba .",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/acosh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Argument wymagany. Dowolna liczba rzeczywista większa niż lub równa 1."
		} }
	},
	ACOT: {
		description: "Zwraca wartość główną funkcji arcus cotangens lub odwrotności funkcji cotangens określonej liczby.",
		abstract: "Zwraca wartość główną funkcji arcus cotangens lub odwrotności funkcji cotangens określonej liczby.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/acot-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Argument wymagany. Liczba to cotangens kąta, który należy wyznaczyć. Musi to być liczba rzeczywista."
		} }
	},
	ACOTH: {
		description: "Zwraca odwrotny kotangens hiperboliczny liczby.",
		abstract: "Zwraca odwrotny kotangens hiperboliczny liczby.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/acoth-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Wartość bezwzględna argumentu Number musi być większa niż 1."
		} }
	},
	AGGREGATE: {
		description: "Zwraca wartość zagregowaną z listy lub bazy danych. Funkcja AGREGUJ może stosować różne funkcje agregujące do listy lub bazy danych, oferując przy tym opcję ignorowania ukrytych wierszy i wartości błędów.",
		abstract: "Zwraca wartość zagregowaną z listy lub bazy danych. Funkcja AGREGUJ może stosować różne funkcje agregujące do listy lub bazy danych, oferując przy tym opcję ignorowania ukrytych wierszy i wartości błędów.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/aggregate-function"
		}],
		functionParameter: {
			functionNum: {
				name: "function_num",
				detail: "Wymagane. Liczba od 1 do 19, określająca funkcję, która ma zostać użyta."
			},
			options: {
				name: "options",
				detail: "Wymagane. Wartość liczbowa określająca, które wartości z zakresu obliczeń funkcji mają być ignorowane. Uwaga Funkcja nie ignoruje ukrytych wierszy, zagnieżdżonych sum częściowych ani zagnieżdżonych funkcji agregujących, jeśli argument tablica zawiera obliczenie, na przykład: =AGREGUJ(14;3;A1:A100*(A1:A100>0);1)"
			},
			ref1: {
				name: "ref1",
				detail: "Wymagane. Jest to pierwszy argument liczbowy dla funkcji przyjmujących kilka argumentów liczbowych, z których ma być agregowana wartość."
			},
			ref2: {
				name: "ref2",
				detail: "Opcjonalne. Są to argumenty liczbowe od 2 do 253, dla których ma być agregowana wartość. W przypadku funkcji pobierających tablicę argument odw1 jest tablicą, formułą tablicową lub odwołaniem do zakresu komórek, dla których ma zostać zagregowana wartość. Odw2 jest drugim argumentem, wymaganym w niektórych funkcjach. Argumentu odw2 wymagają następujące funkcje:"
			}
		}
	},
	ARABIC: {
		description: "Konwertuje liczbę rzymską na liczbę arabską.",
		abstract: "Konwertuje liczbę rzymską na liczbę arabską.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/arabic-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Argument wymagany. Ciąg ujęty w cudzysłów, ciąg pusty (\"\") lub odwołanie do komórki zawierającej tekst."
		} }
	},
	ASIN: {
		description: "Zwraca arcus sinus lub odwrotny sinus liczby. Arcus sinus jest wartością kąta, którego sinus to liczba . Zwracany kąt w radianach należy do przedziału od -pi/2 do pi/2.",
		abstract: "Zwraca arcus sinus lub odwrotny sinus liczby. Arcus sinus jest wartością kąta, którego sinus to liczba . Zwracany kąt w radianach należy do przedziału od -pi/2 do pi/2.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/asin-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Argument wymagany. Sinus żądanego kąta i musi wynosić od -1 do 1."
		} }
	},
	ASINH: {
		description: "Zwraca arcus sinus hiperboliczny liczby. Arcus sinus hiperboliczny jest wartością, której sinus hiperboliczny to liczba , dlatego ASINH(SINH(liczba)) równa się liczba .",
		abstract: "Zwraca arcus sinus hiperboliczny liczby. Arcus sinus hiperboliczny jest wartością, której sinus hiperboliczny to liczba , dlatego ASINH(SINH(liczba)) równa się liczba .",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/asinh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Argument wymagany. Dowolna liczba rzeczywista."
		} }
	},
	ATAN: {
		description: "Zwraca arcus tangens lub odwrotny tangens liczby. Arcus tangens jest kątem, którego tangens to liczba . Zwracany kąt w radianach należy do przedziału od -pi/2 do pi/2.",
		abstract: "Zwraca arcus tangens lub odwrotny tangens liczby. Arcus tangens jest kątem, którego tangens to liczba . Zwracany kąt w radianach należy do przedziału od -pi/2 do pi/2.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/atan-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Argument wymagany. Tangens kąta, który należy wyznaczyć."
		} }
	},
	ATAN2: {
		description: "Zwraca arcus tangens lub odwrotny tangens określonych współrzędnych x i y. Arcus tangens jest wartością kąta pomiędzy osią x a linią prostą poprowadzoną przez początek układu współrzędnych i punkt o współrzędnych (x_liczba;y_liczba). Kąt w radianach zawiera się w przedziale od -pi do pi, z wyłączeniem wartości -pi.",
		abstract: "Zwraca arcus tangens lub odwrotny tangens określonych współrzędnych x i y. Arcus tangens jest wartością kąta pomiędzy osią x a linią prostą poprowadzoną przez początek układu współrzędnych i punkt o współrzędnych (x_liczba;y_liczba). Kąt w radianach zawiera się w przedziale od -pi do pi, z wyłączeniem wartości -pi.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/atan2-function"
		}],
		functionParameter: {
			xNum: {
				name: "x_num",
				detail: "Wymagane. Współrzędna x punktu."
			},
			yNum: {
				name: "y_num",
				detail: "Wymagane. Współrzędna y punktu."
			}
		}
	},
	ATANH: {
		description: "Zwraca arcus tangens hiperboliczny liczby. Liczba musi być w przedziale -1 i 1 (z wyłączeniem wartości -1 i 1). Arcus tangens hiperboliczny jest wartością, której tangens hiperboliczny to liczba , dlatego ATANH(TANH(liczba)) równa się liczba .",
		abstract: "Zwraca arcus tangens hiperboliczny liczby. Liczba musi być w przedziale -1 i 1 (z wyłączeniem wartości -1 i 1). Arcus tangens hiperboliczny jest wartością, której tangens hiperboliczny to liczba , dlatego ATANH(TANH(liczba)) równa się liczba .",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/atanh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Argument wymagany. Dowolna liczba rzeczywista z przedziału od 1 do -1."
		} }
	},
	BASE: {
		description: "Konwertuje liczbę na formę tekstową o określonej podstawie.",
		abstract: "Konwertuje liczbę na formę tekstową o określonej podstawie.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/base-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Liczba, która ma zostać przekonwertowana. Musi to być liczba całkowita większa niż lub równa 0 i mniejsza niż 2^53."
			},
			radix: {
				name: "radix",
				detail: "Wymagane. Podstawa, na którą liczba ma zostać przekonwertowana. Musi to być liczba całkowita większa niż lub równa 2 i mniejsza niż lub równa 36."
			},
			minLength: {
				name: "min_length",
				detail: "Opcjonalne. Minimalna długość zwracanego ciągu. Musi to być liczba całkowita większa niż lub równa 0."
			}
		}
	},
	CEILING: {
		description: "Zwraca wartość liczby, zaokrąglając ją w górę, dalej od zera, do najbliższej wielokrotności istotności. Na przykład jeśli chce się uniknąć używania ułamków bilonu w cenach, a produkt wyceniony jest na 4,42 zł, należy użyć formuły =ZAOKR.W.GÓRĘ(4,42;0,05) aby zaokrąglić cenę do najbliższej drobnej monety.",
		abstract: "Zwraca wartość liczby, zaokrąglając ją w górę, dalej od zera, do najbliższej wielokrotności istotności. Na przykład jeśli chce się uniknąć używania ułamków bilonu w cenach, a produkt wyceniony jest na 4,42 zł, należy użyć formuły =ZAOKR.W.GÓRĘ(4,42;0,05) aby zaokrąglić cenę do najbliższej drobnej monety.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/ceiling-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Wartość do zaokrąglenia."
			},
			significance: {
				name: "significance",
				detail: "Wymagane. Wielokrotność, do której ma zostać wykonane zaokrąglenie."
			}
		}
	},
	CEILING_MATH: {
		description: "ZAOKR.W.W. Funkcja MATEMATYCZNE zaokrągla liczbę w górę do najbliższej liczby całkowitej lub opcjonalnie do najbliższej wielokrotności po istotności.",
		abstract: "ZAOKR.W.W. Funkcja MATEMATYCZNE zaokrągla liczbę w górę do najbliższej liczby całkowitej lub opcjonalnie do najbliższej wielokrotności po istotności.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/ceiling-math-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Wymagane. (musi być w przedziale od -2,229E-308.do 9,99E+307)."
			},
			significance: {
				name: "significance",
				detail: "Opcjonalne. Jest to liczba cyfr znaczących po przecinku dziesiętnym, do którego ma zostać zaokrąglona liczba ."
			},
			mode: {
				name: "mode",
				detail: "Opcjonalne. Ta opcja określa, czy liczby ujemne są zaokrąglane w kierunku zera, czy od zera."
			}
		}
	},
	CEILING_PRECISE: {
		description: "Zaokrągla liczbę w górę do najbliższej wartości całkowitej lub wielokrotności podanej istotności. Zaokrąglenie następuje w górę niezależnie od znaku liczby. Jeśli liczba lub istotność wynosi zero, jest zwracana wartość zero.",
		abstract: "Zaokrągla liczbę w górę do najbliższej wartości całkowitej lub wielokrotności podanej istotności. Zaokrąglenie następuje w górę niezależnie od znaku liczby. Jeśli liczba lub istotność wynosi zero, jest zwracana wartość zero.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/ceiling-precise-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Wartość do zaokrąglenia."
			},
			significance: {
				name: "significance",
				detail: "Opcjonalne. Wielokrotność, do której zaokrąglana jest liczba. Jeśli istotność zostanie pominięta, zostanie użyta wartość domyślna równa 1."
			}
		}
	},
	COMBIN: {
		description: "Zwraca liczbę kombinacji dla danej liczby elementów. Funkcja KOMBINACJE służy do określania całkowitej możliwej liczby grup dla danej liczby elementów.",
		abstract: "Zwraca liczbę kombinacji dla danej liczby elementów. Funkcja KOMBINACJE służy do określania całkowitej możliwej liczby grup dla danej liczby elementów.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/combin-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Liczba elementów."
			},
			numberChosen: {
				name: "number_chosen",
				detail: "Wymagane. Liczba elementów w każdej z kombinacji."
			}
		}
	},
	COMBINA: {
		description: "Zwraca liczbę kombinacji (wraz z powtórzeniami) dla danej liczby elementów.",
		abstract: "Zwraca liczbę kombinacji (wraz z powtórzeniami) dla danej liczby elementów.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/combina-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Musi to być liczba większa niż lub równa 0 i większa niż lub równa wartości argumentu liczba_wybrana. Liczby niecałkowite są obcinane do liczb całkowitych."
			},
			numberChosen: {
				name: "number_chosen",
				detail: "Wymagane. Musi być większy lub równy 0. Liczby niecałkowite są obcinane do liczb całkowitych."
			}
		}
	},
	COS: {
		description: "Zwraca cosinus danego kąta.",
		abstract: "Zwraca cosinus danego kąta.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/cos-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Argument wymagany. Kąt w radianach, dla którego należy obliczyć cosinus."
		} }
	},
	COSH: {
		description: "Zwraca cosinus hiperboliczny liczby.",
		abstract: "Zwraca cosinus hiperboliczny liczby.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/cosh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Argument wymagany. Dowolna liczba rzeczywista, której cosinus hiperboliczny ma zostać obliczony."
		} }
	},
	COT: {
		description: "Zwraca cotangens kąta określonego w radianach.",
		abstract: "Zwraca cotangens kąta określonego w radianach.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/cot-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Argument wymagany. Kąt w radianach, dla którego należy obliczyć cotangens."
		} }
	},
	COTH: {
		description: "Zwraca cotangens hiperboliczny kąta hiperbolicznego.",
		abstract: "Zwraca cotangens hiperboliczny kąta hiperbolicznego.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/coth-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Argument wymagany."
		} }
	},
	CSC: {
		description: "Zwraca cosecans kąta określonego w radianach.",
		abstract: "Zwraca cosecans kąta określonego w radianach.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/csc-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Argument wymagany."
		} }
	},
	CSCH: {
		description: "Zwraca cosecans hiperboliczny kąta określonego w radianach.",
		abstract: "Zwraca cosecans hiperboliczny kąta określonego w radianach.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/csch-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Argument wymagany."
		} }
	},
	DECIMAL: {
		description: "Konwertuje postać tekstową liczby o określonej podstawie na liczbę dziesiętną.",
		abstract: "Konwertuje postać tekstową liczby o określonej podstawie na liczbę dziesiętną.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/decimal-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Argument wymagany."
			},
			radix: {
				name: "radix",
				detail: "Wymagane. Argument podstawa musi być liczbą całkowitą."
			}
		}
	},
	DEGREES: {
		description: "Konwertuje radiany na stopnie.",
		abstract: "Konwertuje radiany na stopnie.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/degrees-function"
		}],
		functionParameter: { angle: {
			name: "angle",
			detail: "Wymagane. Kąt określony w radianach, który ma zostać przekonwertowany."
		} }
	},
	EVEN: {
		description: "Zwraca wartość liczby zaokrąglonej do najbliższej parzystej liczby całkowitej. Funkcji tej można używać do przetwarzania obiektów występujących parami. Na przykład opakowanie pozwala na umieszczenie jednego lub dwóch rodzajów przedmiotów. Opakowanie jest wypełnione, gdy liczba przedmiotów, zaokrąglona do najbliższej liczby parzystej, zgadza się z jego pojemnością.",
		abstract: "Zwraca wartość liczby zaokrąglonej do najbliższej parzystej liczby całkowitej. Funkcji tej można używać do przetwarzania obiektów występujących parami. Na przykład opakowanie pozwala na umieszczenie jednego lub dwóch rodzajów przedmiotów. Opakowanie jest wypełnione, gdy liczba przedmiotów, zaokrąglona do najbliższej liczby parzystej, zgadza się z jego pojemnością.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/even-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Argument wymagany. Wartość do zaokrąglenia."
		} }
	},
	EXP: {
		description: "Zwraca wartość liczby e podniesioną do potęgi liczba. Stała e jest równa 2,71828182845904, podstawie logarytmu naturalnego.",
		abstract: "Zwraca wartość liczby e podniesioną do potęgi liczba. Stała e jest równa 2,71828182845904, podstawie logarytmu naturalnego.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/exp-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Argument wymagany. Wykładnik potęgi o podstawie e."
		} }
	},
	FACT: {
		description: "Zwraca wartość silni liczby. Silnia liczby jest równa wyrażeniu 1*2*3*...* liczba.",
		abstract: "Zwraca wartość silni liczby. Silnia liczby jest równa wyrażeniu 1*2*3*...* liczba.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/fact-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Argument wymagany. Nieujemna liczba, której silnia ma zostać obliczona. Jeśli argument „liczba” nie jest liczbą całkowitą, jego wartość zostanie obcięta do liczby całkowitej."
		} }
	},
	FACTDOUBLE: {
		description: "Zwraca dwukrotną wartość silni liczby.",
		abstract: "Zwraca dwukrotną wartość silni liczby.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/factdouble-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Argument wymagany. Liczba, której dwukrotna wartość silni ma zostać obliczona. Jeśli argument „liczba” nie jest liczbą całkowitą, jego wartość zostanie obcięta do liczby całkowitej."
		} }
	},
	FLOOR: {
		description: "Funkcja ZAOKR.W.DÓŁ w programie Excel zaokrągla określoną liczbę w dół do najbliższej określonej wielokrotności podanej istotności. Liczby ujemne są zaokrąglane w dół (dalej ujemne) do najbliższej pełnej wielokrotności poniżej zera.",
		abstract: "Funkcja ZAOKR.W.DÓŁ w programie Excel zaokrągla określoną liczbę w dół do najbliższej określonej wielokrotności podanej istotności. Liczby ujemne są zaokrąglane w dół (dalej ujemne) do najbliższej pełnej wielokrotności poniżej zera.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/floor-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Wartość liczbowa do zaokrąglenia."
			},
			significance: {
				name: "significance",
				detail: "Wymagane. Wielokrotność, do której ma zostać wykonane zaokrąglenie."
			}
		}
	},
	FLOOR_MATH: {
		description: "Zaokrągla liczbę w dół do najbliższej liczby całkowitej lub najbliższej wielokrotności istotności.",
		abstract: "Zaokrągla liczbę w dół do najbliższej liczby całkowitej lub najbliższej wielokrotności istotności.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/floor-math-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Liczba do zaokrąglenia w dół."
			},
			significance: {
				name: "significance",
				detail: "Opcjonalne. Wielokrotność, do której ma zostać wykonane zaokrąglenie."
			},
			mode: {
				name: "mode",
				detail: "Opcjonalne. Kierunek zaokrąglania liczb ujemnych (do zera lub od zera)."
			}
		}
	},
	FLOOR_PRECISE: {
		description: "Zaokrągla liczbę w dół do najbliższej wartości całkowitej lub wielokrotności podanej istotności. Zaokrąglenie następuje w dół niezależnie od znaku liczby. Jeśli liczba lub istotność wynosi zero, jest zwracana wartość zero.",
		abstract: "Zaokrągla liczbę w dół do najbliższej wartości całkowitej lub wielokrotności podanej istotności. Zaokrąglenie następuje w dół niezależnie od znaku liczby. Jeśli liczba lub istotność wynosi zero, jest zwracana wartość zero.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/floor-precise-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Wartość do zaokrąglenia."
			},
			significance: {
				name: "significance",
				detail: "Opcjonalne. Wielokrotność, do której zaokrąglana jest liczba. Jeśli istotność zostanie pominięta, zostanie użyta wartość domyślna równa 1."
			}
		}
	},
	GCD: {
		description: "Zwraca wartość największego wspólnego dzielnika dwu lub więcej liczb całkowitych. Największy wspólny dzielnik jest największą liczbą całkowitą, dzielącą bez reszty zarówno argument liczba1, jak i argument liczba2.",
		abstract: "Zwraca wartość największego wspólnego dzielnika dwu lub więcej liczb całkowitych. Największy wspólny dzielnik jest największą liczbą całkowitą, dzielącą bez reszty zarówno argument liczba1, jak i argument liczba2.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/gcd-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Argument liczba1 jest wymagany, pozostałe są opcjonalne. Ciąg od 1 do 255 wartości. Jeśli którakolwiek z wartości nie jest liczbą całkowitą, zostanie obcięta do liczby całkowitej."
			},
			number2: {
				name: "number2",
				detail: "Argument liczba1 jest wymagany, pozostałe są opcjonalne. Ciąg od 1 do 255 wartości. Jeśli którakolwiek z wartości nie jest liczbą całkowitą, zostanie obcięta do liczby całkowitej."
			}
		}
	},
	INT: {
		description: "Zaokrągla liczbę w dół do najbliższej liczby całkowitej.",
		abstract: "Zaokrągla liczbę w dół do najbliższej liczby całkowitej.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/int-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Argument wymagany. Liczba rzeczywista, którą należy zaokrąglić w dół do liczby całkowitej."
		} }
	},
	ISO_CEILING: {
		description: "Zaokrągla liczbę w górę do najbliższej wartości całkowitej lub wielokrotności podanej istotności. Zaokrąglenie następuje w górę niezależnie od znaku liczby. Jeśli liczba lub istotność wynosi zero, jest zwracana wartość zero.",
		abstract: "Zaokrągla liczbę w górę do najbliższej wartości całkowitej lub wielokrotności podanej istotności. Zaokrąglenie następuje w górę niezależnie od znaku liczby. Jeśli liczba lub istotność wynosi zero, jest zwracana wartość zero.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/iso-ceiling-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Wartość do zaokrąglenia."
			},
			significance: {
				name: "significance",
				detail: "Opcjonalne. Wielokrotność, do której zaokrąglana jest liczba. Jeśli istotność zostanie pominięta, zostanie użyta wartość domyślna równa 1."
			}
		}
	},
	LCM: {
		description: "Zwraca wartość najmniejszej wspólnej wielokrotności liczb całkowitych. Najmniejszą wspólną wielokrotnością jest najmniejsza dodatnia liczba całkowita będąca wielokrotnością wszystkich całkowitych argumentów liczba1, liczba2 i tak dalej. Funkcję NAJMN.WSP.WIEL należy stosować przy dodawaniu ułamków o różnych mianownikach.",
		abstract: "Zwraca wartość najmniejszej wspólnej wielokrotności liczb całkowitych. Najmniejszą wspólną wielokrotnością jest najmniejsza dodatnia liczba całkowita będąca wielokrotnością wszystkich całkowitych argumentów liczba1, liczba2 i tak dalej. Funkcję NAJMN.WSP.WIEL należy stosować przy dodawaniu ułamków o różnych mianownikach.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/lcm-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Argument liczba1 jest wymagany, pozostałe są opcjonalne. Od 1 do 255 wartości, dla których należy wyznaczyć najmniejszą wspólną wielokrotność. Jeśli wartość nie jest liczbą całkowitą, zostanie obcięta."
			},
			number2: {
				name: "number2",
				detail: "Argument liczba1 jest wymagany, pozostałe są opcjonalne. Od 1 do 255 wartości, dla których należy wyznaczyć najmniejszą wspólną wielokrotność. Jeśli wartość nie jest liczbą całkowitą, zostanie obcięta."
			}
		}
	},
	LN: {
		description: "Zwraca wartość logarytmu naturalnego danej liczby. Podstawą logarytmów naturalnych jest stała e (2,71828182845904).",
		abstract: "Zwraca wartość logarytmu naturalnego danej liczby. Podstawą logarytmów naturalnych jest stała e (2,71828182845904).",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/ln-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Argument wymagany. Liczba rzeczywista dodatnia, której logarytm naturalny należy obliczyć."
		} }
	},
	LOG: {
		description: "Zwraca logarytm liczby przy zadanej podstawie.",
		abstract: "Zwraca logarytm liczby przy zadanej podstawie.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/log-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Liczba rzeczywista dodatnia, której logarytm należy obliczyć."
			},
			base: {
				name: "base",
				detail: "Opcjonalne. Postawa logarytmu. Jeśli argument „podstawa” jest pominięty, przyjmowana jest wartość 10."
			}
		}
	},
	LOG10: {
		description: "Zwraca logarytm zadanej liczby przy podstawie 10.",
		abstract: "Zwraca logarytm zadanej liczby przy podstawie 10.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/log10-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Argument wymagany. Liczba rzeczywista dodatnia, dla której należy wyznaczyć logarytm przy podstawie 10."
		} }
	},
	MDETERM: {
		description: "Zwraca wartość wyznacznika macierzy tablicy.",
		abstract: "Zwraca wartość wyznacznika macierzy tablicy.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/mdeterm-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "Wymagane. Tablica liczb zawierająca jednakową liczbę wierszy i kolumn."
		} }
	},
	MINVERSE: {
		description: "Funkcja MACIERZ.ODW zwraca macierz odwrotną dla macierzy przechowywanej w tablicy.",
		abstract: "Funkcja MACIERZ.ODW zwraca macierz odwrotną dla macierzy przechowywanej w tablicy.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/minverse-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "Wymagane. Tablica liczb zawierająca jednakową liczbę wierszy i kolumn."
		} }
	},
	MMULT: {
		description: "Funkcja MACIERZ.ILOCZYN zwraca iloczyn macierzy dwóch tablic. Wynik jest tablicą o takiej samej liczbie wierszy jak tablica1 i takiej samej liczbie kolumn jak tablica2.",
		abstract: "Funkcja MACIERZ.ILOCZYN zwraca iloczyn macierzy dwóch tablic. Wynik jest tablicą o takiej samej liczbie wierszy jak tablica1 i takiej samej liczbie kolumn jak tablica2.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/mmult-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Tablice, które chcesz pomnożyć."
			},
			array2: {
				name: "array2",
				detail: "Tablice, które chcesz pomnożyć."
			}
		}
	},
	MOD: {
		description: "Zwraca wartość reszty po podzieleniu liczby przez dzielnik. Wynik ma taki sam znak jak dzielnik.",
		abstract: "Zwraca wartość reszty po podzieleniu liczby przez dzielnik. Wynik ma taki sam znak jak dzielnik.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/mod-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Liczba, dla której należy wyznaczyć resztę."
			},
			divisor: {
				name: "divisor",
				detail: "Wymagane. Liczba, przez którą należy podzielić liczbę."
			}
		}
	},
	MROUND: {
		description: "Funkcja ZAOKR.DO.WIELOKR zwraca liczbę zaokrągloną do odpowiedniej wielokrotności.",
		abstract: "Funkcja ZAOKR.DO.WIELOKR zwraca liczbę zaokrągloną do odpowiedniej wielokrotności.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/mround-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Wartość do zaokrąglenia."
			},
			multiple: {
				name: "multiple",
				detail: "Wymagane. Wielokrotność, do której należy zaokrąglić liczbę."
			}
		}
	},
	MULTINOMIAL: {
		description: "Zwraca wartość stosunku silni sumy wartości do iloczynu silni.",
		abstract: "Zwraca wartość stosunku silni sumy wartości do iloczynu silni.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/multinomial-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Argument liczba1 jest wymagany, pozostałe są opcjonalne. Od 1 do 255 wartości, dla których należy obliczyć wielomian."
			},
			number2: {
				name: "number2",
				detail: "Argument liczba1 jest wymagany, pozostałe są opcjonalne. Od 1 do 255 wartości, dla których należy obliczyć wielomian."
			}
		}
	},
	MUNIT: {
		description: "Funkcja MACIERZ.JEDNOSTKOWA zwraca macierz jednostkową dla określonego wymiaru.",
		abstract: "Funkcja MACIERZ.JEDNOSTKOWA zwraca macierz jednostkową dla określonego wymiaru.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/munit-function"
		}],
		functionParameter: { dimension: {
			name: "dimension",
			detail: "Liczba całkowita określająca wymiar macierzy jednostkowej, która ma zostać zwrócona. Funkcja zwraca tablicę. Wymiar musi być większy od zera."
		} }
	},
	ODD: {
		description: "Zwraca wartość liczby zaokrągloną w górę do najbliższej nieparzystej liczby całkowitej.",
		abstract: "Zwraca wartość liczby zaokrągloną w górę do najbliższej nieparzystej liczby całkowitej.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/odd-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Wymagane. Wartość do zaokrąglenia."
		} }
	},
	PI: {
		description: "Zwraca liczbę 3,14159265358979, stałą matematyczną pi, z dokładnością do 15 cyfr.",
		abstract: "Zwraca liczbę 3,14159265358979, stałą matematyczną pi, z dokładnością do 15 cyfr.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/pi-function"
		}],
		functionParameter: {}
	},
	POWER: {
		description: "Zwraca wartość liczby podniesionej do potęgi.",
		abstract: "Zwraca wartość liczby podniesionej do potęgi.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/power-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Podstawa potęgi. Może to być dowolna liczba rzeczywista."
			},
			power: {
				name: "power",
				detail: "Wymagane. Wykładnik potęgi, do której jest podnoszona podstawa."
			}
		}
	},
	PRODUCT: {
		description: "Funkcja ILOCZYN mnoży wszystkie liczby podane jako argumenty i zwraca iloczyn. Jeśli na przykład komórki A1 i A2 zawierają liczby, możesz użyć formuły =ILOCZYN(A1; A2), aby pomnożyć te dwie liczby razem. Tę samą operację można również wykonać za pomocą operatora matematycznego mnożenia ( * ), na przykład =A1 * A2 .",
		abstract: "Funkcja ILOCZYN mnoży wszystkie liczby podane jako argumenty i zwraca iloczyn. Jeśli na przykład komórki A1 i A2 zawierają liczby, możesz użyć formuły =ILOCZYN(A1; A2), aby pomnożyć te dwie liczby razem. Tę samą operację można również wykonać za pomocą operatora matematycznego mnożenia ( * ), na przykład =A1 * A2 .",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/product-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Wymagane. Pierwsza liczba lub zakres, który chcesz pomnożyć."
			},
			number2: {
				name: "number2",
				detail: "Opcjonalne. Można podać do 255 argumentów."
			}
		}
	},
	QUOTIENT: {
		description: "Zwraca całkowitą część z dzielenia. Należy z niej korzystać, aby odrzucić resztę z dzielenia.",
		abstract: "Zwraca całkowitą część z dzielenia. Należy z niej korzystać, aby odrzucić resztę z dzielenia.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/quotient-function"
		}],
		functionParameter: {
			numerator: {
				name: "numerator",
				detail: "Wymagane. Dzielna."
			},
			denominator: {
				name: "denominator",
				detail: "Wymagane. Dzielnik."
			}
		}
	},
	RADIANS: {
		description: "Konwertuje stopnie na radiany.",
		abstract: "Konwertuje stopnie na radiany.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/radians-function"
		}],
		functionParameter: { angle: {
			name: "angle",
			detail: "Wymagane. Kąt, który ma zostać przekonwertowany, określony w stopniach."
		} }
	},
	RAND: {
		description: "Funkcja LOS zwraca losową liczbę rzeczywistą o równomiernym rozkładzie, która jest większa niż lub równa 0 i mniejsza od 1. Nowa losowa liczba rzeczywista jest zwracana po każdym obliczeniu arkusza.",
		abstract: "Funkcja LOS zwraca losową liczbę rzeczywistą o równomiernym rozkładzie, która jest większa niż lub równa 0 i mniejsza od 1. Nowa losowa liczba rzeczywista jest zwracana po każdym obliczeniu arkusza.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/rand-function"
		}],
		functionParameter: {}
	},
	RANDARRAY: {
		description: "W poniższym przykładzie utworzono tablicę o wysokości 5 wierszy i szerokości 3 kolumn. Pierwszy zwraca losowy zestaw wartości od 0 do 1, czyli domyślne wartości funkcji LOSOWA.TABLICA. Następny zwraca serię losowych wartości dziesiętnych między 1 a 100. Trzeci przykład zwraca serię losowych liczb całkowitych między 1 a 100.",
		abstract: "W poniższym przykładzie utworzono tablicę o wysokości 5 wierszy i szerokości 3 kolumn. Pierwszy zwraca losowy zestaw wartości od 0 do 1, czyli domyślne wartości funkcji LOSOWA.TABLICA. Następny zwraca serię losowych wartości dziesiętnych między 1 a 100. Trzeci przykład zwraca serię losowych liczb całkowitych między 1 a 100.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/randarray-function"
		}],
		functionParameter: {
			rows: {
				name: "rows",
				detail: "Liczba wierszy do zwrócenia"
			},
			columns: {
				name: "columns",
				detail: "Liczba kolumn do zwrócenia"
			},
			min: {
				name: "min",
				detail: "Wartość minimalna oczekiwanej liczby"
			},
			max: {
				name: "max",
				detail: "Wartość maksymalna oczekiwanej liczby"
			},
			wholeNumber: {
				name: "whole_number",
				detail: "Zwraca liczbę całkowitą lub wartość dziesiętną PRAWDA dla liczby całkowitej. FAŁSZ dla liczby dziesiętnej"
			}
		}
	},
	RANDBETWEEN: {
		description: "Zwraca losową liczbę całkowitą z wybranego zakresu liczb. Przy każdym obliczaniu arkusza jest zwracana nowa losowa liczba całkowita.",
		abstract: "Zwraca losową liczbę całkowitą z wybranego zakresu liczb. Przy każdym obliczaniu arkusza jest zwracana nowa losowa liczba całkowita.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/randbetween-function"
		}],
		functionParameter: {
			bottom: {
				name: "bottom",
				detail: "Wymagane. Najmniejsza liczba całkowita, jaką może zwrócić funkcja LOS.ZAKR."
			},
			top: {
				name: "top",
				detail: "Wymagane. Największa liczba całkowita, jaką może zwrócić funkcja LOS.ZAKR."
			}
		}
	},
	ROMAN: {
		description: "Konwertuje cyfry arabskie na rzymskie, jako tekst.",
		abstract: "Konwertuje cyfry arabskie na rzymskie, jako tekst.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/roman-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Liczba zapisana w systemie cyfr arabskich, która ma zostać przekonwertowana."
			},
			form: {
				name: "form",
				detail: "Opcjonalne. Liczba określająca rodzaj cyfr rzymskich, które zostaną użyte. Istnieją różne typy cyfr rzymskich, od klasycznych do uproszczonych, które stają się bardziej zwarte wraz ze wzrostem wartości formy. Zobacz przykłady form następujących po ciągu RZYMSKIE(499;0) poniżej."
			}
		}
	},
	ROUND: {
		description: "Funkcja ZAOKR zaokrągla liczbę do określonej liczby cyfr. Aby na przykład zaokrąglić liczbę 23,7825 znajdującą się w komórce A1 do dwóch miejsc dziesiętnych, można użyć następującej formuły:",
		abstract: "Funkcja ZAOKR zaokrągla liczbę do określonej liczby cyfr. Aby na przykład zaokrąglić liczbę 23,7825 znajdującą się w komórce A1 do dwóch miejsc dziesiętnych, można użyć następującej formuły:",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/round-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Wymagane. Liczba, która ma zostać zaokrąglona."
			},
			numDigits: {
				name: "num_digits",
				detail: "Wymagane. Liczba cyfr, do której liczba ma zostać zaokrąglony argument number."
			}
		}
	},
	ROUNDBANK: {
		description: "Zaokrągla liczbę metodą zaokrąglania bankierskiego.",
		abstract: "Zaokrągla liczbę metodą zaokrąglania bankierskiego.",
		links: [{
			title: "Instruction",
			url: ""
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Liczba, którą chcesz zaokrąglić metodą zaokrąglania bankierskiego."
			},
			numDigits: {
				name: "num_digits",
				detail: "Liczba cyfr, do których chcesz zaokrąglić metodą zaokrąglania bankierskiego."
			}
		}
	},
	ROUNDDOWN: {
		description: "Zaokrągla liczbę w dół w kierunku zera.",
		abstract: "Zaokrągla liczbę w dół w kierunku zera.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/rounddown-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Dowolna liczba rzeczywista, która ma zostać zaokrąglona w dół."
			},
			numDigits: {
				name: "num_digits",
				detail: "Wymagane. Liczba cyfr, do których liczba ma zostać zaokrąglona."
			}
		}
	},
	ROUNDUP: {
		description: "Zaokrągla liczbę w górę, dalej od zera.",
		abstract: "Zaokrągla liczbę w górę, dalej od zera.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/roundup-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Dowolna liczba rzeczywista, która ma zostać zaokrąglona w górę."
			},
			numDigits: {
				name: "num_digits",
				detail: "Wymagane. Liczba cyfr, do których liczba ma zostać zaokrąglona."
			}
		}
	},
	SEC: {
		description: "Zwraca sekans kąta.",
		abstract: "Zwraca sekans kąta.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/sec-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Kąt w radianach, którego sekans chcesz obliczyć."
		} }
	},
	SECH: {
		description: "Zwraca sekans hiperboliczny kąta.",
		abstract: "Zwraca sekans hiperboliczny kąta.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/sech-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Kąt w radianach, którego sekans hiperboliczny chcesz obliczyć."
		} }
	},
	SERIESSUM: {
		description: "Wiele funkcji można aproksymować przy pomocy rozwinięć w szeregi potęgowe.",
		abstract: "Wiele funkcji można aproksymować przy pomocy rozwinięć w szeregi potęgowe.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/seriessum-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Argument wymagany. Wartość początkowa dla szeregów potęgowych."
			},
			n: {
				name: "n",
				detail: "Argument wymagany. Początkowa potęga, do której zostanie podniesiona wartość x."
			},
			m: {
				name: "m",
				detail: "Argument wymagany. Krok, o który wzrasta n w każdym kolejnym składniku szeregu."
			},
			coefficients: {
				name: "coefficients",
				detail: "Wymagane. Zbiory współczynników, przez które jest mnożona każda kolejna potęga x. Liczba wartości we współczynnikach określa liczbę składników w szeregach potęgowych. Jeśli na przykład we współczynnikach występują trzy wartości, to w szeregach potęgowych będą trzy składniki."
			}
		}
	},
	SEQUENCE: {
		description: "W poniższym przykładzie stworzyliśmy tablicę mającą 4 wiersze i 5 kolumn, stosując funkcję =SEKWENCJA(4,5) .",
		abstract: "W poniższym przykładzie stworzyliśmy tablicę mającą 4 wiersze i 5 kolumn, stosując funkcję =SEKWENCJA(4,5) .",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/sequence-function"
		}],
		functionParameter: {
			rows: {
				name: "rows",
				detail: "Liczba wierszy do zwrócenia"
			},
			columns: {
				name: "columns",
				detail: "Liczba kolumn do zwrócenia"
			},
			start: {
				name: "start",
				detail: "Pierwsza liczba w sekwencji"
			},
			step: {
				name: "step",
				detail: "Wartość rosnąca wraz z każdą kolejną wartością w tablicy"
			}
		}
	},
	SIGN: {
		description: "Określa znak liczby. Funkcja zwraca wartość 1, jeśli liczba jest dodatnia, oraz wartość 0, jeśli liczba jest ujemna.",
		abstract: "Określa znak liczby. Funkcja zwraca wartość 1, jeśli liczba jest dodatnia, oraz wartość 0, jeśli liczba jest ujemna.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/sign-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Argument wymagany. Dowolna liczba rzeczywista."
		} }
	},
	SIN: {
		description: "Zwraca sinus podanego kąta.",
		abstract: "Zwraca sinus podanego kąta.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/sin-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Argument wymagany. Kąt w radianach, dla którego ma zostać obliczony sinus."
		} }
	},
	SINH: {
		description: "Zwraca sinus hiperboliczny liczby.",
		abstract: "Zwraca sinus hiperboliczny liczby.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/sinh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Argument wymagany. Dowolna liczba rzeczywista."
		} }
	},
	SQRT: {
		description: "Zwraca dodatni pierwiastek kwadratowy liczby.",
		abstract: "Zwraca dodatni pierwiastek kwadratowy liczby.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/sqrt-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Argument wymagany. Liczba, dla której zostanie obliczony pierwiastek kwadratowy."
		} }
	},
	SQRTPI: {
		description: "Zwraca pierwiastek kwadratowy z (liczba * pi).",
		abstract: "Zwraca pierwiastek kwadratowy z (liczba * pi).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/sqrtpi-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Argument wymagany. Liczba, przez którą jest mnożona liczba pi."
		} }
	},
	SUBTOTAL: {
		description: "Zwraca sumę częściową na liście lub w bazie danych. Na ogół listę z sumami częściowymi można łatwiej utworzyć, używając polecenia Suma częściowa dostępnego w grupie Konspekt na karcie Dane w aplikacji komputerowej programu Excel. Po utworzeniu listy z sumami częściowymi można ją modyfikować, edytując funkcję SUMY.CZĘŚCIOWE.",
		abstract: "Zwraca sumę częściową na liście lub w bazie danych. Na ogół listę z sumami częściowymi można łatwiej utworzyć, używając polecenia Suma częściowa dostępnego w grupie Konspekt na karcie Dane w aplikacji komputerowej programu Excel. Po utworzeniu listy z sumami częściowymi można ją modyfikować, edytując funkcję SUMY.CZĘŚCIOWE.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/subtotal-function"
		}],
		functionParameter: {
			functionNum: {
				name: "function_num",
				detail: "Wymagane. Liczba 1–11 lub 101–111 określająca funkcję dla sumy częściowej. Od 1 do 11 zawiera ukryte ręcznie wiersze, natomiast wiersze 101-111 nie są z nich wykluczone; odfiltrowane komórki są zawsze wykluczone."
			},
			ref1: {
				name: "ref1",
				detail: "Wymagane. Pierwszy nazwany zakres lub odwołanie, dla którego ma zostać obliczona suma częściowa."
			},
			ref2: {
				name: "ref2",
				detail: "Opcjonalne. Od 2 do 254 nazwanych zakresów lub odwołań, dla których ma zostać obliczona suma częściowa."
			}
		}
	},
	SUM: {
		description: "Funkcja SUMA dodaje wartości. Możesz dodawać pojedyncze wartości, odwołania do komórek lub zakresów lub połączenie tych wszystkich trzech typów wyrażeń.",
		abstract: "Funkcja SUMA dodaje wartości. Możesz dodawać pojedyncze wartości, odwołania do komórek lub zakresów lub połączenie tych wszystkich trzech typów wyrażeń.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/sum-function"
		}],
		functionParameter: {
			number1: {
				name: "Number 1",
				detail: "Pierwsza liczba, którą chcesz dodać. Liczba może być taka jak 4, odwołanie do komórki, na przykład B6, lub zakres komórek, taki jak B2:B8."
			},
			number2: {
				name: "Number 2",
				detail: "Druga liczba, którą chcesz dodać. W ten sposób możesz określić do 255 liczb."
			}
		}
	},
	SUMIF: {
		description: "Funkcja SUMA.JEŻELI służy do sumowania wartości z zakresu spełniającego określone kryteria. Załóżmy na przykład, że mają zostać zsumowane liczby z danej kolumny, które są większe od 5. Możesz użyć następującej formuły: =SUMA.JEŻELI(B2:B25;\">5\")",
		abstract: "Funkcja SUMA.JEŻELI służy do sumowania wartości z zakresu spełniającego określone kryteria. Załóżmy na przykład, że mają zostać zsumowane liczby z danej kolumny, które są większe od 5. Możesz użyć następującej formuły: =SUMA.JEŻELI(B2:B25;\">5\")",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/sumif-function"
		}],
		functionParameter: {
			range: {
				name: "range",
				detail: "Wymagane. Jest to zakres komórek, do których zostaną zastosowane kryteria. Komórki w każdym zakresie muszą być liczbami lub nazwami, tablicami albo odwołaniami zawierającymi liczby. Wartości puste i wartości tekstowe są ignorowane. Wybrany zakres może zawierać daty w standardowym formacie programu Excel (przykłady poniżej)."
			},
			criteria: {
				name: "criteria",
				detail: "Wymagane. Są to kryteria w postaci liczby, wyrażenia, odwołania do komórki, tekstu lub funkcji określającej, które komórki będą dodawane. Można dołączyć symbole wieloznaczne — znak zapytania (?), aby dopasować dowolny pojedynczy znak, gwiazdkę (*), aby dopasować ją do dowolnej sekwencji znaków. Jeśli chcesz znaleźć rzeczywisty znak zapytania lub gwiazdkę, wpisz tyldę ( ~ ) poprzedzającą znak. Kryteria można wyrazić na przykład jako 32, \">32\", B5, \"3?\", \"jabłko*\", \"*~?\" lub DZIŚ(). Ważne Wszelkie kryteria tekstowe oraz zawierające symbole matematyczne lub logiczne należy ująć w podwójny cudzysłów ( \" ). Kryteria liczbowe nie wymagają cudzysłowów."
			},
			sumRange: {
				name: "sum_range",
				detail: "Opcjonalne. Rzeczywiste komórki do dodania, jeśli chcesz dodać komórki inne niż te określone w arguencie zakres . Jeśli argument sum_range zostanie pominięty, program Excel doda komórki określone w arguencie zakres (te same komórki, do których zastosowano kryteria). Sum_range powinny mieć taki sam rozmiar i kształt jak zakres . Jeśli tak nie jest, może to oznaczać spadek wydajności, a formuła zsumuje zakres komórek, który zaczyna się od pierwszej komórki w sum_range ale ma takie same wymiary jak zakres . Na przykład: zakres suma_zakres Rzeczywiste sumowane komórki A1:A5 B1:B5 B1:B5 A1:A5 B1:K5 B1:B5"
			}
		}
	},
	SUMIFS: {
		description: "Funkcja SUMA.WARUNKÓW, jedna z funkcji matematycznych i trygonometrycznych , dodaje wszystkie argumenty, które spełniają wiele kryteriów. Funkcji SUMA.WARUNKÓW można użyć na przykład do zsumowania sprzedawców w kraju, których (1) adres zamieszkania obejmuje ten sam kod pocztowy oraz (2) których zyski przekraczają określoną wartość w dolarach.",
		abstract: "Funkcja SUMA.WARUNKÓW, jedna z funkcji matematycznych i trygonometrycznych , dodaje wszystkie argumenty, które spełniają wiele kryteriów. Funkcji SUMA.WARUNKÓW można użyć na przykład do zsumowania sprzedawców w kraju, których (1) adres zamieszkania obejmuje ten sam kod pocztowy oraz (2) których zyski przekraczają określoną wartość w dolarach.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/sumifs-function"
		}],
		functionParameter: {
			sumRange: {
				name: "sum_range",
				detail: "Zakres komórek do zsumowania."
			},
			criteriaRange1: {
				name: "criteria_range1",
				detail: "Zakres, który jest sprawdzany przy użyciu argumentu kryteria1 . Criteria_range1 i kryteria1 tworzą parę wyszukiwania, w której zakres jest wyszukiwany w poszukiwaniu określonych kryteriów. Po znalezieniu elementów w zakresie zostaną dodane odpowiadające im wartości w Sum_range ."
			},
			criteria1: {
				name: "criteria1",
				detail: "Kryteria określające, które komórki w Criteria_range1 zostaną dodane. Kryteria można wprowadzić na przykład jako 32 , \">32\" , B4 , \"jabłka\" lub \"32\"."
			},
			criteriaRange2: {
				name: "criteriaRange2",
				detail: "Dodatkowe zakresy i skojarzone z nimi kryteria. Maksymalnie można wprowadzić 127 par zakres/kryteria."
			},
			criteria2: {
				name: "criteria2",
				detail: "Dodatkowe zakresy i skojarzone z nimi kryteria. Maksymalnie można wprowadzić 127 par zakres/kryteria."
			}
		}
	},
	SUMPRODUCT: {
		description: "Funkcja SUMA.ILOCZYNÓW odpowiada wszystkim wystąpieniom elementu Y/Rozmiar M i sumuje je, dlatego w tym przykładzie 21 plus 41 równa się 62.",
		abstract: "Funkcja SUMA.ILOCZYNÓW odpowiada wszystkim wystąpieniom elementu Y/Rozmiar M i sumuje je, dlatego w tym przykładzie 21 plus 41 równa się 62.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/sumproduct-function"
		}],
		functionParameter: {
			array1: {
				name: "array",
				detail: "Pierwszy argument tablicy, której elementy zostaną pomnożone, a następnie zsumowane."
			},
			array2: {
				name: "array",
				detail: "Od 2 do 255 tablic, których elementy zostaną pomnożone, a następnie zsumowane."
			}
		}
	},
	SUMSQ: {
		description: "Zwraca sumę kwadratów argumentów.",
		abstract: "Zwraca sumę kwadratów argumentów.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/sumsq-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Argument liczba1 jest wymagany. Kolejne liczby są opcjonalne. Może istnieć nawet 255 argumentów, dla których należy obliczyć sumę kwadratów."
			},
			number2: {
				name: "number2",
				detail: "Argument liczba1 jest wymagany. Kolejne liczby są opcjonalne. Może istnieć nawet 255 argumentów, dla których należy obliczyć sumę kwadratów."
			}
		}
	},
	SUMX2MY2: {
		description: "Ta funkcja programu Excel zwraca sumę różnic kwadratów odpowiadających sobie wartości w dwóch tablicach.",
		abstract: "Ta funkcja programu Excel zwraca sumę różnic kwadratów odpowiadających sobie wartości w dwóch tablicach.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/sumx2my2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "array_x",
				detail: "Wymagane. Pierwsza tablica lub pierwszy zakres wartości."
			},
			arrayY: {
				name: "array_y",
				detail: "Wymagane. Druga tablica lub drugi zakres wartości."
			}
		}
	},
	SUMX2PY2: {
		description: "Zwraca sumę sum kwadratów odpowiadających sobie wartości w dwóch tablicach. Suma sum kwadratów jest często wykorzystywana jako składnik w wielu obliczeniach statystycznych.",
		abstract: "Zwraca sumę sum kwadratów odpowiadających sobie wartości w dwóch tablicach. Suma sum kwadratów jest często wykorzystywana jako składnik w wielu obliczeniach statystycznych.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/sumx2py2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "array_x",
				detail: "Wymagane. Pierwsza tablica lub pierwszy zakres wartości."
			},
			arrayY: {
				name: "array_y",
				detail: "Wymagane. Druga tablica lub drugi zakres wartości."
			}
		}
	},
	SUMXMY2: {
		description: "Funkcja SUMXMY2 zwraca sumę kwadratów różnic odpowiadających sobie wartości w dwóch tablicach.",
		abstract: "Funkcja SUMXMY2 zwraca sumę kwadratów różnic odpowiadających sobie wartości w dwóch tablicach.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/sumxmy2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "array_x",
				detail: "Pierwsza tablica lub pierwszy zakres wartości. Argument wymagany."
			},
			arrayY: {
				name: "array_y",
				detail: "Druga tablica lub drugi zakres wartości. Argument wymagany."
			}
		}
	},
	TAN: {
		description: "Zwraca tangens podanego kąta.",
		abstract: "Zwraca tangens podanego kąta.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/tan-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Argument wymagany. Kąt w radianach, dla którego należy obliczyć tangens."
		} }
	},
	TANH: {
		description: "Zwraca tangens hiperboliczny liczby.",
		abstract: "Zwraca tangens hiperboliczny liczby.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/tanh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Argument wymagany. Dowolna liczba rzeczywista."
		} }
	},
	TRUNC: {
		description: "Funkcje TRUNC obcinają liczbę do liczby całkowitej, usuwając część ułamkową liczby.",
		abstract: "Funkcje TRUNC obcinają liczbę do liczby całkowitej, usuwając część ułamkową liczby.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/trunc-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Liczba, którą należy obciąć."
			},
			numDigits: {
				name: "num_digits",
				detail: "Opcjonalne. Liczba określająca dokładność obcinania. Argument liczba_cyfr przyjmuje domyślnie wartość 0 (zero)."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/statistical/pl-PL.ts
const locale$4 = {
	AVEDEV: {
		description: "Zwraca wartość średnią odchyleń bezwzględnych punktów danych od ich wartości średniej. Funkcja ODCH.ŚREDNIE jest miarą zmienności zbioru danych.",
		abstract: "Zwraca wartość średnią odchyleń bezwzględnych punktów danych od ich wartości średniej. Funkcja ODCH.ŚREDNIE jest miarą zmienności zbioru danych.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/avedev-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Argument liczba1 jest wymagany, pozostałe są opcjonalne. Od 1 do 255 argumentów, dla których należy wyznaczyć średnią odchyleń bezwzględnych. Zamiast argumentów rozdzielonych średnikami można zastosować pojedynczą tablicę lub odwołanie do tablicy."
			},
			number2: {
				name: "number2",
				detail: "Argument liczba1 jest wymagany, pozostałe są opcjonalne. Od 1 do 255 argumentów, dla których należy wyznaczyć średnią odchyleń bezwzględnych. Zamiast argumentów rozdzielonych średnikami można zastosować pojedynczą tablicę lub odwołanie do tablicy."
			}
		}
	},
	AVERAGE: {
		description: "Zwraca średnią (średnią arytmetyczną) argumentów. Jeśli na przykład zakres A1:A20 zawiera liczby, formuła =ŚREDNIA(A1:A20) zwraca średnią tych liczb.",
		abstract: "Zwraca średnią (średnią arytmetyczną) argumentów. Jeśli na przykład zakres A1:A20 zawiera liczby, formuła =ŚREDNIA(A1:A20) zwraca średnią tych liczb.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/average-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Wymagane. Pierwsza liczba, odwołanie do komórki lub zakres, dla którego należy obliczyć średnią."
			},
			number2: {
				name: "number2",
				detail: "Opcjonalne. Dodatkowe liczby, odwołania do komórek lub zakresy (maksymalnie 255), dla których ma zostać wyznaczona średnia."
			}
		}
	},
	AVERAGE_WEIGHTED: {
		description: "Funkcja AVERAGE.WEIGHTED oblicza średnią ważoną zestawu wartości na podstawie tych wartości i odpowiadających im wag.",
		abstract: "Funkcja AVERAGE.WEIGHTED oblicza średnią ważoną zestawu wartości na podstawie tych wartości i odpowiadających im wag.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9084098?hl=pl"
		}],
		functionParameter: {
			values: {
				name: "wartości",
				detail: "Wartości, dla których ma zostać obliczona średnia. Może to być zakres komórek lub same wartości."
			},
			weights: {
				name: "wagi",
				detail: "Lista odpowiadających im wag. Wagi mogą być równe zero, ale nie mogą być ujemne; co najmniej jedna musi być dodatnia. Zakres wag musi mieć tyle samo wierszy i kolumn co zakres wartości."
			},
			additionalValues: {
				name: "dodatkowe_wartości",
				detail: "Opcjonalne dodatkowe wartości uwzględniane w średniej."
			},
			additionalWeights: {
				name: "dodatkowe_wagi",
				detail: "Opcjonalne dodatkowe wagi. Po każdej dodatkowej_wartości musi wystąpić dokładnie jedna dodatkowa_waga."
			}
		}
	},
	AVERAGEA: {
		description: "Oblicza wartość średnią (średnią arytmetyczną) argumentów z listy.",
		abstract: "Oblicza wartość średnią (średnią arytmetyczną) argumentów z listy.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/averagea-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Argument wartość1 jest wymagany, pozostałe są opcjonalne. Od 1 do 255 komórek, zakresów komórek lub wartości, dla których należy wyznaczyć średnią."
			},
			value2: {
				name: "value2",
				detail: "Argument wartość1 jest wymagany, pozostałe są opcjonalne. Od 1 do 255 komórek, zakresów komórek lub wartości, dla których należy wyznaczyć średnią."
			}
		}
	},
	AVERAGEIF: {
		description: "Zwraca średnią (średnią arytmetyczną) wszystkich komórek z zakresu, które spełniają podane kryteria.",
		abstract: "Zwraca średnią (średnią arytmetyczną) wszystkich komórek z zakresu, które spełniają podane kryteria.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/averageif-function"
		}],
		functionParameter: {
			range: {
				name: "range",
				detail: "Wymagane. Jedna lub więcej komórek, które mają zostać uśrednione, włączając w to liczby lub nazwy, a także tablice lub odwołania zawierające liczby."
			},
			criteria: {
				name: "criteria",
				detail: "Wymagane. Kryteria w postaci liczby, wyrażenia, odwołania do komórki lub tekstu, określające komórki, dla których zostanie obliczona średnia. Kryteria można wyrazić na przykład jako 32, \"32\", \">32\", \"jabłka\" lub B4."
			},
			averageRange: {
				name: "average_range",
				detail: "Opcjonalne. Rzeczywisty zestaw komórek, dla których zostanie obliczona średnia. W przypadku pominięcia tego argumentu zostanie użyty parametr zakres."
			}
		}
	},
	AVERAGEIFS: {
		description: "Zwraca średnią (średnią arytmetyczną) wszystkich komórek, które spełniają jedno lub więcej kryteriów.",
		abstract: "Zwraca średnią (średnią arytmetyczną) wszystkich komórek, które spełniają jedno lub więcej kryteriów.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/averageifs-function"
		}],
		functionParameter: {
			averageRange: {
				name: "average_range",
				detail: "Wymagane. Jedna lub więcej komórek, które mają zostać uśrednione, włączając w to liczby lub nazwy, a także tablice lub odwołania zawierające liczby."
			},
			criteriaRange1: {
				name: "criteria_range1",
				detail: "Argument kryteria_zakres1 jest wymagany, kolejne argumenty kryteria_zakres są opcjonalne. Są to zakresy (od 1 do 127), w których zostaną sprawdzone skojarzone kryteria."
			},
			criteria1: {
				name: "criteria1",
				detail: "Argument kryteria1 jest wymagany, pozostałe są opcjonalne. Są to kryteria (od 1 do 127) w postaci liczby, wyrażenia, odwołania do komórki lub tekstu określające komórki, które mają zostać uśrednione. Kryteria można wyrazić na przykład jako 32, \"32\", \">32\", \"jabłka\" lub B4."
			},
			criteriaRange2: {
				name: "criteria_range2",
				detail: "Argument kryteria_zakres1 jest wymagany, kolejne argumenty kryteria_zakres są opcjonalne. Są to zakresy (od 1 do 127), w których zostaną sprawdzone skojarzone kryteria."
			},
			criteria2: {
				name: "criteria2",
				detail: "Argument kryteria1 jest wymagany, pozostałe są opcjonalne. Są to kryteria (od 1 do 127) w postaci liczby, wyrażenia, odwołania do komórki lub tekstu określające komórki, które mają zostać uśrednione. Kryteria można wyrazić na przykład jako 32, \"32\", \">32\", \"jabłka\" lub B4."
			}
		}
	},
	BETA_DIST: {
		description: "Rozkładu beta używa się zazwyczaj w badaniu zmian zawartości procentowych w próbkach, na przykład części doby spędzanej przez ludzi na oglądaniu telewizji.",
		abstract: "Rozkładu beta używa się zazwyczaj w badaniu zmian zawartości procentowych w próbkach, na przykład części doby spędzanej przez ludzi na oglądaniu telewizji.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/beta-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Argument wymagany. Wartość między A a B, dla której określa się funkcję."
			},
			alpha: {
				name: "alpha",
				detail: "Wymagane. Parametr rozkładu."
			},
			beta: {
				name: "beta",
				detail: "Wymagane. Parametr rozkładu."
			},
			cumulative: {
				name: "cumulative",
				detail: "Wymagane. Wartość logiczna, która określa postać funkcji. Jeśli wartością argumentu „skumulowany” jest PRAWDA, funkcja ROZKŁ.BETA zwraca funkcję rozkładu skumulowanego, a jeśli FAŁSZ, funkcja zwraca funkcję gęstości prawdopodobieństwa."
			},
			A: {
				name: "A",
				detail: "opcjonalny. Dolne ograniczenie interwału wartości x."
			},
			B: {
				name: "B",
				detail: "Argument opcjonalny. Górne ograniczenie interwału wartości x."
			}
		}
	},
	BETA_INV: {
		description: "Jeśli prawdopodobieństwo = ROZKŁ.BETA(x;...PRAWDA), wówczas ROZKŁ.BETA.ODWR(prawdopodobieństwo;...) = x. Rozkład beta może być używany w planowaniu projektów do modelowania możliwych czasów ukończenia przy danym oczekiwanym czasie ukończenia i jego zmienności.",
		abstract: "Jeśli prawdopodobieństwo = ROZKŁ.BETA(x;...PRAWDA), wówczas ROZKŁ.BETA.ODWR(prawdopodobieństwo;...) = x. Rozkład beta może być używany w planowaniu projektów do modelowania możliwych czasów ukończenia przy danym oczekiwanym czasie ukończenia i jego zmienności.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/beta-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Wymagane. Prawdopodobieństwo skojarzone z rozkładem beta."
			},
			alpha: {
				name: "alpha",
				detail: "Wymagane. Parametr rozkładu."
			},
			beta: {
				name: "beta",
				detail: "Wymagane. Parametr rozkładu."
			},
			A: {
				name: "A",
				detail: "opcjonalny. Dolne ograniczenie interwału wartości x."
			},
			B: {
				name: "B",
				detail: "Argument opcjonalny. Górne ograniczenie interwału wartości x."
			}
		}
	},
	BINOM_DIST: {
		description: "Zwraca wartość pojedynczego składnika dwumianowego rozkładu prawdopodobieństwa. Funkcję ROZKŁ.DWUM należy stosować do rozwiązywania problemów, w których występuje stała liczba testów lub prób, wynik każdej próby może być tylko sukcesem lub porażką, próby są niezależne, a prawdopodobieństwo sukcesu jest stałe w trakcie eksperymentu. Na przykład za pomocą funkcji ROZKŁ.DWUM można obliczyć prawdopodobieństwo, że z trojga następnych nowo narodzonych dzieci dwoje będzie płci męskiej.",
		abstract: "Zwraca wartość pojedynczego składnika dwumianowego rozkładu prawdopodobieństwa. Funkcję ROZKŁ.DWUM należy stosować do rozwiązywania problemów, w których występuje stała liczba testów lub prób, wynik każdej próby może być tylko sukcesem lub porażką, próby są niezależne, a prawdopodobieństwo sukcesu jest stałe w trakcie eksperymentu. Na przykład za pomocą funkcji ROZKŁ.DWUM można obliczyć prawdopodobieństwo, że z trojga następnych nowo narodzonych dzieci dwoje będzie płci męskiej.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/binom-dist-function"
		}],
		functionParameter: {
			numberS: {
				name: "number_s",
				detail: "Wymagane. Liczba sukcesów w próbach."
			},
			trials: {
				name: "trials",
				detail: "Wymagane. Liczba niezależnych prób."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Wymagane. Prawdopodobieństwo sukcesu w każdej próbie."
			},
			cumulative: {
				name: "cumulative",
				detail: "Wymagane. Wartość logiczna, która określa postać funkcji. Jeśli argument „skumulowany” ma wartość PRAWDA, funkcja ROZKŁ.DWUM zwraca funkcję rozkładu skumulowanego, czyli prawdopodobieństwo, że zachodzi co najwyżej liczba_s sukcesów; jeśli FAŁSZ, zwraca funkcję masy prawdopodobieństwa, czyli prawdopodobieństwo, że zajdzie liczba_s sukcesów."
			}
		}
	},
	BINOM_DIST_RANGE: {
		description: "Zwraca prawdopodobieństwo wyniku próby na podstawie rozkładu dwumianowego.",
		abstract: "Zwraca prawdopodobieństwo wyniku próby na podstawie rozkładu dwumianowego.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/binom-dist-range-function"
		}],
		functionParameter: {
			trials: {
				name: "trials",
				detail: "Wymagane. Liczba niezależnych prób. Musi być większy lub równy 0."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Wymagane. Prawdopodobieństwo sukcesu w pojedynczej próbie. Musi być większy lub równy 0 oraz mniejszy lub równy 1."
			},
			numberS: {
				name: "number_s",
				detail: "Wymagane. Liczba sukcesów w próbach. Musi być większy lub równy 0 oraz mniejszy lub równy liczbie prób."
			},
			numberS2: {
				name: "number_s2",
				detail: "Opcjonalne. Jeżeli zostanie podany, funkcja zwraca prawdopodobieństwo liczby udanych prób wypadających pomiędzy argumentem Liczba_s i Liczba_s2. Musi być większy lub równy Liczba_s oraz mniejszy lub równy liczbie prób."
			}
		}
	},
	BINOM_INV: {
		description: "Zwraca najmniejszą wartość, dla której skumulowany rozkład dwumianowy jest większy lub równy wartości kryterium.",
		abstract: "Zwraca najmniejszą wartość, dla której skumulowany rozkład dwumianowy jest większy lub równy wartości kryterium.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/binom-inv-function"
		}],
		functionParameter: {
			trials: {
				name: "trials",
				detail: "Wymagane. Liczba prób Bernoulliego."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Wymagane. Prawdopodobieństwo sukcesu w każdej próbie."
			},
			alpha: {
				name: "alpha",
				detail: "Wymagane. Wartość kryterium."
			}
		}
	},
	CHISQ_DIST: {
		description: "Zwraca rozkład chi-kwadrat.",
		abstract: "Zwraca rozkład chi-kwadrat.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/chisq-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Argument wymagany. Wartość, przy której ma być szacowany rozkład."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Wymagane. Liczba stopni swobody."
			},
			cumulative: {
				name: "cumulative",
				detail: "Wymagane. Wartość logiczna, która określa postać funkcji. Jeśli wartością argumentu „skumulowany” jest PRAWDA, funkcja ROZKŁ.CHI zwraca funkcję rozkładu skumulowanego, a jeśli FAŁSZ, funkcja zwraca funkcję gęstości prawdopodobieństwa."
			}
		}
	},
	CHISQ_DIST_RT: {
		description: "Rozkład χ2 jest skojarzony z testem χ2. Test χ2 służy do porównywania wartości obserwowanych i przewidywanych. Na przykład eksperyment genetyczny może mieć hipotezę, że następne pokolenie roślin będzie w określonym zestawie kolorów. Przez porównanie wyników obserwowanych z wynikami oczekiwanymi można określić prawidłowość hipotezy.",
		abstract: "Rozkład χ2 jest skojarzony z testem χ2. Test χ2 służy do porównywania wartości obserwowanych i przewidywanych. Na przykład eksperyment genetyczny może mieć hipotezę, że następne pokolenie roślin będzie w określonym zestawie kolorów. Przez porównanie wyników obserwowanych z wynikami oczekiwanymi można określić prawidłowość hipotezy.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/chisq-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Argument wymagany. Wartość, przy której ma być szacowany rozkład."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Wymagane. Liczba stopni swobody."
			}
		}
	},
	CHISQ_INV: {
		description: "Zwraca odwrotność lewostronnego prawdopodobieństwa rozkładu chi-kwadrat.",
		abstract: "Zwraca odwrotność lewostronnego prawdopodobieństwa rozkładu chi-kwadrat.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/chisq-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Wymagane. Prawdopodobieństwo skojarzone z rozkładem chi-kwadrat."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Wymagane. Liczba stopni swobody."
			}
		}
	},
	CHISQ_INV_RT: {
		description: "Jeśli prawdopodobieństwo = ROZKŁ.CHI.PS(x;...), to ROZKŁ.CHI.ODWR.PS(prawdopodobieństwo;...) = x. Ta funkcja służy do porównywania wyników obserwowanych z wynikami spodziewanymi w celu określenia, czy hipoteza jest prawidłowa.",
		abstract: "Jeśli prawdopodobieństwo = ROZKŁ.CHI.PS(x;...), to ROZKŁ.CHI.ODWR.PS(prawdopodobieństwo;...) = x. Ta funkcja służy do porównywania wyników obserwowanych z wynikami spodziewanymi w celu określenia, czy hipoteza jest prawidłowa.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/chisq-inv-rt-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Wymagane. Prawdopodobieństwo skojarzone z rozkładem chi-kwadrat."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Wymagane. Liczba stopni swobody."
			}
		}
	},
	CHISQ_TEST: {
		description: "Zwraca wartość testu niezależności. Funkcja CHI.TEST zwraca wartość rozkładu chi-kwadrat (χ2) statystyki i stosownych stopni swobody. Testu χ2 można używać do określania, czy dane eksperymentalne potwierdzają przewidywania wynikające z hipotezy.",
		abstract: "Zwraca wartość testu niezależności. Funkcja CHI.TEST zwraca wartość rozkładu chi-kwadrat (χ2) statystyki i stosownych stopni swobody. Testu χ2 można używać do określania, czy dane eksperymentalne potwierdzają przewidywania wynikające z hipotezy.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/chisq-test-function"
		}],
		functionParameter: {
			actualRange: {
				name: "actual_range",
				detail: "Wymagane. Zakres danych zawierający wartości obserwowane, które należy porównać z wartościami przewidywanymi."
			},
			expectedRange: {
				name: "expected_range",
				detail: "Wymagane. Zakres danych zawierający współczynnik iloczynu sum wierszy i sum kolumn do sumy końcowej."
			}
		}
	},
	CONFIDENCE_NORM: {
		description: "Przedział ufności to zakres wartości. Średnia z próby, x, znajduje się w połowie tego przedziału, zaś przedział obejmuje wartości x ± UFNOŚĆ.NORM. Na przykład, jeśli x jest średnią z próby terminów dostawy produktów pocztą, x ± UFNOŚĆ.NORM będzie przedziałem wartości średnich z populacji. Dla każdej średniej z populacji, μ0, w tym przedziale, prawdopodobieństwo uzyskania średniej z próby różniącej się od μ0 o więcej niż x jest większe niż alfa; dla każdej średniej z populacji, μ0, która nie należy do tego przedziału, prawdopodobieństwo uzyskania średniej z próby różniącej się od μ0 o więcej niż x jest mniejsze niż alfa. Innymi słowy, załóżmy że używając wartości x, odchylenia standardowego i wielkości, budujemy test dwustronny na poziomie istotności alfa, który ma sprawdzić hipotezę, że średnia z populacji wynosi μ0. Hipotezy nie odrzucimy, jeśli μ0 będzie mieścić się w przedziale ufności, a odrzucimy ją, jeśli μ0 znajdzie się poza przedziałem ufności. Przedział ufności nie daje podstaw do przyjęcia, że prawdopodobieństwo, iż termin dostawy następnej paczki zmieści się w przedziale ufności, wynosi 1 - alfa.",
		abstract: "Przedział ufności to zakres wartości. Średnia z próby, x, znajduje się w połowie tego przedziału, zaś przedział obejmuje wartości x ± UFNOŚĆ.NORM. Na przykład, jeśli x jest średnią z próby terminów dostawy produktów pocztą, x ± UFNOŚĆ.NORM będzie przedziałem wartości średnich z populacji. Dla każdej średniej z populacji, μ0, w tym przedziale, prawdopodobieństwo uzyskania średniej z próby różniącej się od μ0 o więcej niż x jest większe niż alfa; dla każdej średniej z populacji, μ0, która nie należy do tego przedziału, prawdopodobieństwo uzyskania średniej z próby różniącej się od μ0 o więcej niż x jest mniejsze niż alfa. Innymi słowy, załóżmy że używając wartości x, odchylenia standardowego i wielkości, budujemy test dwustronny na poziomie istotności alfa, który ma sprawdzić hipotezę, że średnia z populacji wynosi μ0. Hipotezy nie odrzucimy, jeśli μ0 będzie mieścić się w przedziale ufności, a odrzucimy ją, jeśli μ0 znajdzie się poza przedziałem ufności. Przedział ufności nie daje podstaw do przyjęcia, że prawdopodobieństwo, iż termin dostawy następnej paczki zmieści się w przedziale ufności, wynosi 1 - alfa.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/confidence-norm-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "Wymagane. Poziom istotności używany do obliczania poziomu ufności. Poziom ufności jest równy 100*(1 – alfa)%, czyli wartość alfa równa 0,05 wskazuje poziom ufności 95%."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Wymagane. Odchylenie standardowe dla zakresu danych, które z założenia jest znane."
			},
			size: {
				name: "size",
				detail: "Wymagane. Wielkość próby."
			}
		}
	},
	CONFIDENCE_T: {
		description: "Zwraca przedział ufności dla średniej populacji, używając rozkładu t-Studenta.",
		abstract: "Zwraca przedział ufności dla średniej populacji, używając rozkładu t-Studenta.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/confidence-t-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "Wymagane. Poziom istotności używany do obliczania poziomu ufności. Poziom ufności jest równy 100*(1 – alfa)%, czyli wartość alfa równa 0,05 wskazuje poziom ufności 95%."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Wymagane. Odchylenie standardowe dla zakresu danych, które z założenia jest znane."
			},
			size: {
				name: "size",
				detail: "Wymagane. Wielkość próby."
			}
		}
	},
	CORREL: {
		description: "Funkcja WSP.KORELACJI zwraca współczynnik korelacji dwóch zakresów komórek. Współczynnik korelacji służy do określania relacji między dwiema własnościami. Na przykład można zbadać relację między średnią temperaturą danej miejscowości a używaniem klimatyzatorów.",
		abstract: "Funkcja WSP.KORELACJI zwraca współczynnik korelacji dwóch zakresów komórek. Współczynnik korelacji służy do określania relacji między dwiema własnościami. Na przykład można zbadać relację między średnią temperaturą danej miejscowości a używaniem klimatyzatorów.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/correl-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Wymagane. Zakres wartości komórek."
			},
			array2: {
				name: "array2",
				detail: "Wymagane. Drugi zakres wartości komórek."
			}
		}
	},
	COUNT: {
		description: "Funkcja ILE.LICZB zlicza komórki zawierające liczby, jak również liczby umieszczone na liście argumentów. Funkcja ILE.LICZB służy do uzyskiwania liczby wpisów w polu liczbowym, które znajduje się w zakresie lub w tablicy liczb. Na przykład w celu zliczenia liczb w zakresie A1:A20 należy wprowadzić następującą formułę: =ILE.LICZB(A1:A20) . W tym przykładzie: jeśli pięć komórek w zakresie zawiera liczby, wynikiem jest wartość 5 .",
		abstract: "Funkcja ILE.LICZB zlicza komórki zawierające liczby, jak również liczby umieszczone na liście argumentów. Funkcja ILE.LICZB służy do uzyskiwania liczby wpisów w polu liczbowym, które znajduje się w zakresie lub w tablicy liczb. Na przykład w celu zliczenia liczb w zakresie A1:A20 należy wprowadzić następującą formułę: =ILE.LICZB(A1:A20) . W tym przykładzie: jeśli pięć komórek w zakresie zawiera liczby, wynikiem jest wartość 5 .",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/count-function"
		}],
		functionParameter: {
			value1: {
				name: "value 1",
				detail: "Wymagane. Pierwszy element, odwołanie do komórki lub zakres, w którym mają zostać zliczone liczby."
			},
			value2: {
				name: "value 2",
				detail: "Opcjonalne. Maksymalnie 255 dodatkowych elementów, odwołań do komórek lub zakresów, w których mają zostać zliczone liczby."
			}
		}
	},
	COUNTA: {
		description: "Funkcja ILE.NIEPUSTYCH zlicza komórki, które nie są puste w zakresie.",
		abstract: "Funkcja ILE.NIEPUSTYCH zlicza komórki, które nie są puste w zakresie.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/counta-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Argument wartość1 jest wymagany, pozostałe są opcjonalne. Od 1 do 255 komórek, zakresów komórek lub wartości, dla których należy wyznaczyć średnią."
			},
			value2: {
				name: "value2",
				detail: "Argument wartość1 jest wymagany, pozostałe są opcjonalne. Od 1 do 255 komórek, zakresów komórek lub wartości, dla których należy wyznaczyć średnią."
			}
		}
	},
	COUNTBLANK: {
		description: "Użyj funkcji LICZ.PUSTE , jednej z funkcji statystycznych , aby zliczyć liczbę pustych komórek w zakresie komórek.",
		abstract: "Użyj funkcji LICZ.PUSTE , jednej z funkcji statystycznych , aby zliczyć liczbę pustych komórek w zakresie komórek.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/countblank-function"
		}],
		functionParameter: { range: {
			name: "range",
			detail: "Wymagane. Zakres, w którym należy zliczyć puste komórki."
		} }
	},
	COUNTIF: {
		description: "Funkcja LICZ.JEŻELI, jedna z funkcji statystycznych , umożliwia policzenie liczby komórek, które spełniają dane kryteria. Można na przykład policzyć, ile razy konkretna nazwa miasta występuje na liście klientów.",
		abstract: "Funkcja LICZ.JEŻELI, jedna z funkcji statystycznych , umożliwia policzenie liczby komórek, które spełniają dane kryteria. Można na przykład policzyć, ile razy konkretna nazwa miasta występuje na liście klientów.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/use-the-countif-function-in-microsoft-excel"
		}],
		functionParameter: {
			range: {
				name: "range",
				detail: "Grupa komórek, które mają zostać zliczone. Zakres może zawierać liczby, tablice, nazwany zakres lub odwołania zawierające liczby. Wartości puste i tekst są ignorowane. Dowiedz się, jak zaznaczać zakresy w arkuszu ."
			},
			criteria: {
				name: "criteria",
				detail: "Liczba, wyrażenie, odwołanie do komórki lub ciąg tekstowy określające, które komórki będą zliczane. Można użyć liczby, np. 32, porównania, np. \">32\", komórki, np. B4 lub wyrazu, np. \"jabłka\". Funkcja LICZ.JEŻELI używa tylko pojedynczego kryterium. Aby użyć wielu kryteriów, należy skorzystać z funkcji LICZ.WARUNKI ."
			}
		}
	},
	COUNTIFS: {
		description: "Funkcja LICZ.WARUNKI stosuje kryteria do komórek w wielu zakresach i zlicza, ile razy wszystkie kryteria są spełnione.",
		abstract: "Funkcja LICZ.WARUNKI stosuje kryteria do komórek w wielu zakresach i zlicza, ile razy wszystkie kryteria są spełnione.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/countifs-function"
		}],
		functionParameter: {
			criteriaRange1: {
				name: "criteria_range1",
				detail: "Wymagane. Pierwszy zakres, w którym zostaną sprawdzone skojarzone kryteria."
			},
			criteria1: {
				name: "criteria1",
				detail: "Wymagane. Kryteria w postaci liczby, wyrażenia, odwołania do komórki lub tekstu określające komórki, które mają być zliczane. Kryteria można wyrazić na przykład jako 32, \">32\", B4, \"jabłka\" lub \"32\"."
			},
			criteriaRange2: {
				name: "criteria_range2",
				detail: "Opcjonalne. Dodatkowe zakresy i skojarzone z nimi kryteria. Maksymalna liczba par zakres/kryteria to 127."
			},
			criteria2: {
				name: "criteria2",
				detail: "Opcjonalne. Dodatkowe zakresy i skojarzone z nimi kryteria. Maksymalna liczba par zakres/kryteria to 127."
			}
		}
	},
	COVARIANCE_P: {
		description: "Zwraca wartość kowariancji populacji, czyli średniej iloczynów odchyleń każdej pary punktów danych w dwóch zbiorach danych. Kowariancji należy używać do określania zależności między dwoma zbiorami danych. Na przykład można sprawdzić, czy większe przychody są związane z wyższym poziomem wykształcenia.",
		abstract: "Zwraca wartość kowariancji populacji, czyli średniej iloczynów odchyleń każdej pary punktów danych w dwóch zbiorach danych. Kowariancji należy używać do określania zależności między dwoma zbiorami danych. Na przykład można sprawdzić, czy większe przychody są związane z wyższym poziomem wykształcenia.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/covariance-p-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Wymagane. Pierwszy zakres komórek zawierających liczby całkowite."
			},
			array2: {
				name: "array2",
				detail: "Wymagane. Drugi zakres komórek zawierających liczby całkowite."
			}
		}
	},
	COVARIANCE_S: {
		description: "Zwraca kowariancję próbki, czyli średnią iloczynów odchyleń dla każdej pary punktów danych w dwóch zbiorach danych.",
		abstract: "Zwraca kowariancję próbki, czyli średnią iloczynów odchyleń dla każdej pary punktów danych w dwóch zbiorach danych.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/covariance-s-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Wymagane. Pierwszy zakres komórek zawierających liczby całkowite."
			},
			array2: {
				name: "array2",
				detail: "Wymagane. Drugi zakres komórek zawierających liczby całkowite."
			}
		}
	},
	DEVSQ: {
		description: "Zwraca wartość sumy kwadratów odchyleń punktów danych od ich średniej z próby.",
		abstract: "Zwraca wartość sumy kwadratów odchyleń punktów danych od ich średniej z próby.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/devsq-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Argument liczba1 jest wymagany, pozostałe są opcjonalne. Od 1 do 255 argumentów, dla których jest obliczana suma kwadratów odchyleń. Zamiast argumentów rozdzielonych średnikami można użyć pojedynczej tablicy lub odwołania do tablicy."
			},
			number2: {
				name: "number2",
				detail: "Argument liczba1 jest wymagany, pozostałe są opcjonalne. Od 1 do 255 argumentów, dla których jest obliczana suma kwadratów odchyleń. Zamiast argumentów rozdzielonych średnikami można użyć pojedynczej tablicy lub odwołania do tablicy."
			}
		}
	},
	EXPON_DIST: {
		description: "Zwraca skumulowaną funkcję (dystrybuantę) rozkładu wykładniczego. Funkcja ROZKŁ.EXP umożliwia modelowanie upływu czasu między zdarzeniami, np. czasu oczekiwania na wypłatę gotówki z bankomatu. Można na przykład użyć funkcji ROZKŁ.EXP do wyznaczenia prawdopodobieństwa, że zajmie to najwyżej jedną minutę.",
		abstract: "Zwraca skumulowaną funkcję (dystrybuantę) rozkładu wykładniczego. Funkcja ROZKŁ.EXP umożliwia modelowanie upływu czasu między zdarzeniami, np. czasu oczekiwania na wypłatę gotówki z bankomatu. Można na przykład użyć funkcji ROZKŁ.EXP do wyznaczenia prawdopodobieństwa, że zajmie to najwyżej jedną minutę.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/expon-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Argument wymagany. Wartość funkcji."
			},
			lambda: {
				name: "lambda",
				detail: "Wymagane. Wartość parametru."
			},
			cumulative: {
				name: "cumulative",
				detail: "Wymagane. Wartość logiczna określająca postać funkcji wykładniczej, która ma zostać podana. Jeśli argument „skumulowany” ma wartość PRAWDA, funkcja ROZKŁ.EXP zwraca funkcję rozkładu skumulowanego, a jeśli FAŁSZ — funkcję gęstości prawdopodobieństwa."
			}
		}
	},
	F_DIST: {
		description: "Zwraca wartość rozkładu prawdopodobieństwa F-Snedecora. Funkcja ta umożliwia określenie, czy dwa zbiory danych mają różne stopnie zróżnicowania. Na przykład, można sprawdzić wyniki testów mężczyzn i kobiet przychodzących do szkoły średniej, i określić, czy zmienność u kobiet różni się od tej znalezionej u mężczyzn.",
		abstract: "Zwraca wartość rozkładu prawdopodobieństwa F-Snedecora. Funkcja ta umożliwia określenie, czy dwa zbiory danych mają różne stopnie zróżnicowania. Na przykład, można sprawdzić wyniki testów mężczyzn i kobiet przychodzących do szkoły średniej, i określić, czy zmienność u kobiet różni się od tej znalezionej u mężczyzn.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/f-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Argument wymagany. Wartość, dla której ta funkcja ma zostać obliczona."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Wymagane. Wartość stopni swobody w liczniku."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Wymagane. Wartość stopni swobody w mianowniku."
			},
			cumulative: {
				name: "cumulative",
				detail: "Wymagane. Wartość logiczna, która określa postać funkcji. Jeśli wartością argumentu „skumulowany” jest PRAWDA, funkcja ROZKŁ.F zwraca funkcję rozkładu skumulowanego, a jeśli FAŁSZ — funkcję gęstości prawdopodobieństwa."
			}
		}
	},
	F_DIST_RT: {
		description: "Zwraca wartość (prawostronnego) rozkładu prawdopodobieństwa F-Snedecora (stopień zróżnicowania) dla dwóch zestawów danych. Ta funkcja służy do określania, czy dwa zbiory danych mają różne stopnie zróżnicowania. Można na przykład sprawdzić wyniki testów uzyskane przez chłopców i dziewczęta zdające do szkoły średniej i określić, czy zmienność wyników uzyskanych przez dziewczęta różni się od zmienności wyników chłopców.",
		abstract: "Zwraca wartość (prawostronnego) rozkładu prawdopodobieństwa F-Snedecora (stopień zróżnicowania) dla dwóch zestawów danych. Ta funkcja służy do określania, czy dwa zbiory danych mają różne stopnie zróżnicowania. Można na przykład sprawdzić wyniki testów uzyskane przez chłopców i dziewczęta zdające do szkoły średniej i określić, czy zmienność wyników uzyskanych przez dziewczęta różni się od zmienności wyników chłopców.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/f-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Argument wymagany. Wartość, dla której ta funkcja ma zostać obliczona."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Wymagane. Wartość stopni swobody w liczniku."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Wymagane. Wartość stopni swobody w mianowniku."
			}
		}
	},
	F_INV: {
		description: "Zwraca odwrotność rozkładu prawdopodobieństwa F. Jeśli p = ROZKŁ.F(x,...), to ROZKŁ.F.ODWR(p,...) = x. Rozkład F-Snedecora można stosować w teście F w celu porównania stopnia zmienności dwóch zbiorów danych. Można na przykład przeanalizować rozkład dochodów w Stanach Zjednoczonych i Kanadzie, aby określić, czy oba kraje mają podobne zróżnicowanie dochodów.",
		abstract: "Zwraca odwrotność rozkładu prawdopodobieństwa F. Jeśli p = ROZKŁ.F(x,...), to ROZKŁ.F.ODWR(p,...) = x. Rozkład F-Snedecora można stosować w teście F w celu porównania stopnia zmienności dwóch zbiorów danych. Można na przykład przeanalizować rozkład dochodów w Stanach Zjednoczonych i Kanadzie, aby określić, czy oba kraje mają podobne zróżnicowanie dochodów.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/f-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Wymagane. Prawdopodobieństwo skojarzone ze skumulowanym rozkładem F."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Wymagane. Wartość stopni swobody w liczniku."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Wymagane. Wartość stopni swobody w mianowniku."
			}
		}
	},
	F_INV_RT: {
		description: "Zwraca wartość funkcji odwrotnej rozkładu (prawostronnego) prawdopodobieństwa F-Snedecora. Jeżeli p = ROZKŁ.F.PS(x;...), to ROZKŁ.F.ODWR.PS(p;...) = x. Rozkład F-Snedecora można stosować w teście F w celu porównania stopnia zmienności dwóch zbiorów danych. Można na przykład przeanalizować rozkład dochodów w Stanach Zjednoczonych i Kanadzie, aby określić, czy oba kraje mają podobne zróżnicowanie dochodów.",
		abstract: "Zwraca wartość funkcji odwrotnej rozkładu (prawostronnego) prawdopodobieństwa F-Snedecora. Jeżeli p = ROZKŁ.F.PS(x;...), to ROZKŁ.F.ODWR.PS(p;...) = x. Rozkład F-Snedecora można stosować w teście F w celu porównania stopnia zmienności dwóch zbiorów danych. Można na przykład przeanalizować rozkład dochodów w Stanach Zjednoczonych i Kanadzie, aby określić, czy oba kraje mają podobne zróżnicowanie dochodów.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/f-inv-rt-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Wymagane. Prawdopodobieństwo skojarzone ze skumulowanym rozkładem F."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Wymagane. Wartość stopni swobody w liczniku."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Wymagane. Wartość stopni swobody w mianowniku."
			}
		}
	},
	F_TEST: {
		description: "Funkcja umożliwia określenie, czy dwie próbki mają różne wariancje. Na przykład, mając wyniki testów ze szkół prywatnych i publicznych, można sprawdzić, czy w tych szkołach występują różne poziomy zróżnicowania wyników.",
		abstract: "Funkcja umożliwia określenie, czy dwie próbki mają różne wariancje. Na przykład, mając wyniki testów ze szkół prywatnych i publicznych, można sprawdzić, czy w tych szkołach występują różne poziomy zróżnicowania wyników.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/f-test-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Wymagane. Pierwsza tablica lub pierwszy zakres danych."
			},
			array2: {
				name: "array2",
				detail: "Wymagane. Druga tablica lub drugi zakres danych."
			}
		}
	},
	FISHER: {
		description: "Zwraca wartość transformacji Fishera w punkcie x. Wynikiem tej transformacji jest funkcja, która ma przeważnie rozkład normalny, a nie skośny. Funkcja ta pozwala weryfikować hipotezy dotyczące współczynnika korelacji.",
		abstract: "Zwraca wartość transformacji Fishera w punkcie x. Wynikiem tej transformacji jest funkcja, która ma przeważnie rozkład normalny, a nie skośny. Funkcja ta pozwala weryfikować hipotezy dotyczące współczynnika korelacji.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/fisher-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Argument wymagany. Wartość liczbowa, dla której ma zostać wykonana transformacja."
		} }
	},
	FISHERINV: {
		description: "Zwraca wartość funkcji odwrotnej transformacji Fishera. Transformacja ta jest przydatna w analizie korelacji pomiędzy zakresami lub tablicami danych. Jeżeli y = ROZKŁAD.FISHER(x), to ROZKŁAD.FISHER.ODW(y) = x.",
		abstract: "Zwraca wartość funkcji odwrotnej transformacji Fishera. Transformacja ta jest przydatna w analizie korelacji pomiędzy zakresami lub tablicami danych. Jeżeli y = ROZKŁAD.FISHER(x), to ROZKŁAD.FISHER.ODW(y) = x.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/fisherinv-function"
		}],
		functionParameter: { y: {
			name: "y",
			detail: "Argument wymagany. Wartość, dla której ma zostać wykonana transformacja odwrotna."
		} }
	},
	FORECAST: {
		description: "Oblicz lub przewiduj przyszłą wartość przy użyciu istniejących wartości. Przyszła wartość jest wartością y dla danej wartości x. Istniejące wartości to znane wartości x i y, a przyszła wartość jest przewidywana przy użyciu regresji liniowej. Te funkcje umożliwiają przewidywanie przyszłej sprzedaży, wymagań dotyczących zapasów lub trendów konsumpcyjnych.",
		abstract: "Oblicz lub przewiduj przyszłą wartość przy użyciu istniejących wartości. Przyszła wartość jest wartością y dla danej wartości x. Istniejące wartości to znane wartości x i y, a przyszła wartość jest przewidywana przy użyciu regresji liniowej. Te funkcje umożliwiają przewidywanie przyszłej sprzedaży, wymagań dotyczących zapasów lub trendów konsumpcyjnych.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/forecast-and-forecast-linear-functions"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "tak Punkt danych, dla którego ma zostać określona prognoza wartości."
			},
			knownYs: {
				name: "known_y's",
				detail: "tak Tablica lub zakres danych zależnych."
			},
			knownXs: {
				name: "known_x's",
				detail: "tak Tablica lub zakres danych niezależnych."
			}
		}
	},
	FORECAST_ETS: {
		description: "Oblicza lub prognozuje przyszłą wartość na podstawie wartości historycznych za pomocą algorytmu AAA wygładzania wykładniczego (ETS).",
		abstract: "Oblicza lub prognozuje przyszłą wartość na podstawie wartości historycznych za pomocą algorytmu AAA wygładzania wykładniczego (ETS).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/forecast-ets-function"
		}],
		functionParameter: {
			targetDate: {
				name: "Data docelowa",
				detail: "Punkt danych, dla którego ma zostać przewidziana wartość."
			},
			values: {
				name: "Wartości",
				detail: "Wartości historyczne używane do prognozy."
			},
			timeline: {
				name: "Oś czasu",
				detail: "Niezależny zakres lub tablica liczbowych dat albo godzin ze stałym krokiem."
			},
			seasonality: {
				name: "Sezonowość",
				detail: "Opcjonalnie. 1 oznacza wykrywanie automatyczne, a 0 brak sezonowości."
			},
			dataCompletion: {
				name: "Uzupełnianie danych",
				detail: "Opcjonalnie. Użyj 1, aby interpolować brakujące punkty, lub 0, aby traktować je jako zera."
			},
			aggregation: {
				name: "Agregacja",
				detail: "Opcjonalnie. Wartość od 1 do 7 określa agregację zduplikowanych znaczników czasu."
			}
		}
	},
	FORECAST_ETS_CONFINT: {
		description: "Zwraca przedział ufności dla prognozowanej wartości w określonym punkcie docelowym.",
		abstract: "Zwraca przedział ufności dla prognozowanej wartości w określonym punkcie docelowym.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/forecast-ets-confint-function"
		}],
		functionParameter: {
			targetDate: {
				name: "Data docelowa",
				detail: "Punkt danych, dla którego ma zostać przewidziana wartość."
			},
			values: {
				name: "Wartości",
				detail: "Wartości historyczne używane do prognozy."
			},
			timeline: {
				name: "Oś czasu",
				detail: "Niezależny zakres lub tablica liczbowych dat albo godzin ze stałym krokiem."
			},
			confidenceLevel: {
				name: "Poziom ufności",
				detail: "Opcjonalnie. Liczba od 0 do 1; wartość domyślna to 0,95."
			},
			seasonality: {
				name: "Sezonowość",
				detail: "Opcjonalnie. 1 oznacza wykrywanie automatyczne, a 0 brak sezonowości."
			},
			dataCompletion: {
				name: "Uzupełnianie danych",
				detail: "Opcjonalnie. Użyj 1, aby interpolować brakujące punkty, lub 0, aby traktować je jako zera."
			},
			aggregation: {
				name: "Agregacja",
				detail: "Opcjonalnie. Wartość od 1 do 7 określa agregację zduplikowanych znaczników czasu."
			}
		}
	},
	FORECAST_ETS_SEASONALITY: {
		description: "Zwraca długość powtarzającego się wzorca wykrytego przez program Excel dla określonego szeregu czasowego.",
		abstract: "Zwraca długość powtarzającego się wzorca wykrytego przez program Excel dla określonego szeregu czasowego.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/forecast-ets-seasonality-function"
		}],
		functionParameter: {
			values: {
				name: "Wartości",
				detail: "Wartości historyczne używane do prognozy."
			},
			timeline: {
				name: "Oś czasu",
				detail: "Niezależny zakres lub tablica liczbowych dat albo godzin ze stałym krokiem."
			},
			dataCompletion: {
				name: "Uzupełnianie danych",
				detail: "Opcjonalnie. Użyj 1, aby interpolować brakujące punkty, lub 0, aby traktować je jako zera."
			},
			aggregation: {
				name: "Agregacja",
				detail: "Opcjonalnie. Wartość od 1 do 7 określa agregację zduplikowanych znaczników czasu."
			}
		}
	},
	FORECAST_ETS_STAT: {
		description: "Zwraca wartość statystyczną wynikającą z prognozy szeregów czasowych.",
		abstract: "Zwraca wartość statystyczną wynikającą z prognozy szeregów czasowych.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/forecast-ets-stat-function"
		}],
		functionParameter: {
			values: {
				name: "Wartości",
				detail: "Wartości historyczne używane do prognozy."
			},
			timeline: {
				name: "Oś czasu",
				detail: "Niezależny zakres lub tablica liczbowych dat albo godzin ze stałym krokiem."
			},
			statisticType: {
				name: "Typ statystyki",
				detail: "Wartość od 1 do 8 określa zwracaną statystykę prognozy."
			},
			seasonality: {
				name: "Sezonowość",
				detail: "Opcjonalnie. 1 oznacza wykrywanie automatyczne, a 0 brak sezonowości."
			},
			dataCompletion: {
				name: "Uzupełnianie danych",
				detail: "Opcjonalnie. Użyj 1, aby interpolować brakujące punkty, lub 0, aby traktować je jako zera."
			},
			aggregation: {
				name: "Agregacja",
				detail: "Opcjonalnie. Wartość od 1 do 7 określa agregację zduplikowanych znaczników czasu."
			}
		}
	},
	FORECAST_LINEAR: {
		description: "Oblicz lub przewiduj przyszłą wartość przy użyciu istniejących wartości. Przyszła wartość jest wartością y dla danej wartości x. Istniejące wartości to znane wartości x i y, a przyszła wartość jest przewidywana przy użyciu regresji liniowej. Te funkcje umożliwiają przewidywanie przyszłej sprzedaży, wymagań dotyczących zapasów lub trendów konsumpcyjnych.",
		abstract: "Oblicz lub przewiduj przyszłą wartość przy użyciu istniejących wartości. Przyszła wartość jest wartością y dla danej wartości x. Istniejące wartości to znane wartości x i y, a przyszła wartość jest przewidywana przy użyciu regresji liniowej. Te funkcje umożliwiają przewidywanie przyszłej sprzedaży, wymagań dotyczących zapasów lub trendów konsumpcyjnych.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/forecast-and-forecast-linear-functions"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "tak Punkt danych, dla którego ma zostać określona prognoza wartości."
			},
			knownYs: {
				name: "known_y's",
				detail: "tak Tablica lub zakres danych zależnych."
			},
			knownXs: {
				name: "known_x's",
				detail: "tak Tablica lub zakres danych niezależnych."
			}
		}
	},
	FREQUENCY: {
		description: "Funkcja CZĘSTOŚĆ oblicza, jak często wartości występują w określonym zakresie wartości, a następnie zwraca tablicę liczb w układzie pionowym. Funkcja CZĘSTOŚĆ umożliwia na przykład sprawdzenie liczby wyników testów mieszczących się w pewnym zakresie. Ponieważ funkcja CZĘSTOŚĆ zwraca tablicę, musi być wprowadzona jako formuła tablicowa.",
		abstract: "Funkcja CZĘSTOŚĆ oblicza, jak często wartości występują w określonym zakresie wartości, a następnie zwraca tablicę liczb w układzie pionowym. Funkcja CZĘSTOŚĆ umożliwia na przykład sprawdzenie liczby wyników testów mieszczących się w pewnym zakresie. Ponieważ funkcja CZĘSTOŚĆ zwraca tablicę, musi być wprowadzona jako formuła tablicowa.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/frequency-function"
		}],
		functionParameter: {
			dataArray: {
				name: "data_array",
				detail: "Wymagane. Tablica lub odwołanie do zbioru wartości, dla których mają być zliczane częstości. Jeśli argument tablica_dane nie ma żadnych wartości, funkcja CZĘSTOŚĆ zwraca tablicę zer."
			},
			binsArray: {
				name: "bins_array",
				detail: "Wymagane. Tablica lub odwołanie do przedziałów, w których mają być grupowane wartości argumentu tablica_dane. Jeśli argument tablica_przedziały nie zawiera żadnych wartości, funkcja CZĘSTOŚĆ zwraca liczbę elementów w argumencie tablica_dane."
			}
		}
	},
	GAMMA: {
		description: "Zwraca wartość funkcji gamma.",
		abstract: "Zwraca wartość funkcji gamma.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/gamma-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Argument wymagany. Zwraca liczbę."
		} }
	},
	GAMMA_DIST: {
		description: "Zwraca rozkład gamma. Funkcja ta umożliwia badanie zmiennych, które mogą mieć rozkład skośny. Rozkład gamma jest powszechnie stosowany w analizie kolejek.",
		abstract: "Zwraca rozkład gamma. Funkcja ta umożliwia badanie zmiennych, które mogą mieć rozkład skośny. Rozkład gamma jest powszechnie stosowany w analizie kolejek.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/gamma-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Argument wymagany. Wartość, przy której ma być szacowany rozkład."
			},
			alpha: {
				name: "alpha",
				detail: "Wymagane. Parametr rozkładu."
			},
			beta: {
				name: "beta",
				detail: "Wymagane. Parametr rozkładu. Jeśli wartość argumentu beta = 1, funkcja ROZKŁ.GAMMA zwraca standardowy rozkład gamma."
			},
			cumulative: {
				name: "cumulative",
				detail: "Wymagane. Wartość logiczna, która określa postać funkcji. Jeśli wartością argumentu skumulowany jest PRAWDA, funkcja ROZKŁ.GAMMA zwraca funkcję rozkładu skumulowanego, a jeśli FAŁSZ — funkcję gęstości prawdopodobieństwa."
			}
		}
	},
	GAMMA_INV: {
		description: "Zwraca funkcję odwrotną skumulowanego rozkładu gamma. Jeśli p = ROZKŁ.GAMMA(x;...), to ROZKŁ.GAMMA.ODWR(p;...) = x. Funkcja ta jest przydatna w badaniu zmiennej, której rozkład może być skośny.",
		abstract: "Zwraca funkcję odwrotną skumulowanego rozkładu gamma. Jeśli p = ROZKŁ.GAMMA(x;...), to ROZKŁ.GAMMA.ODWR(p;...) = x. Funkcja ta jest przydatna w badaniu zmiennej, której rozkład może być skośny.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/gamma-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Wymagane. Prawdopodobieństwo związane z rozkładem gamma."
			},
			alpha: {
				name: "alpha",
				detail: "Wymagane. Parametr rozkładu."
			},
			beta: {
				name: "beta",
				detail: "Wymagane. Parametr rozkładu. Jeśli wartość argumentu beta = 1, funkcja ROZKŁ.GAMMA.ODWR zwraca standardowy rozkład gamma."
			}
		}
	},
	GAMMALN: {
		description: "Zwraca logarytm naturalny funkcji gamma, Γ(x).",
		abstract: "Zwraca logarytm naturalny funkcji gamma, Γ(x).",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/gammaln-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Argument wymagany. Wartość, dla której ma zostać obliczona funkcja ROZKŁAD.LIN.GAMMA."
		} }
	},
	GAMMALN_PRECISE: {
		description: "Zwraca logarytm naturalny funkcji gamma, Γ(x).",
		abstract: "Zwraca logarytm naturalny funkcji gamma, Γ(x).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/gammaln-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Argument wymagany. Wartość, dla której ma zostać obliczona funkcja ROZKŁAD.LIN.GAMMA.DOKŁ."
		} }
	},
	GAUSS: {
		description: "Oblicza prawdopodobieństwo, że element populacji o standardowym rozkładzie normalnym należy do zakresu między średnią a wielokrotnością odchyleń standardowych od średniej określoną przez argument z.",
		abstract: "Oblicza prawdopodobieństwo, że element populacji o standardowym rozkładzie normalnym należy do zakresu między średnią a wielokrotnością odchyleń standardowych od średniej określoną przez argument z.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/gauss-function"
		}],
		functionParameter: { z: {
			name: "z",
			detail: "Argument wymagany. Zwraca liczbę."
		} }
	},
	GEOMEAN: {
		description: "Zwraca średnią geometryczną tablicy lub zakresu danych dodatnich. Funkcji ŚREDNIA.GEOMETRYCZNA można na przykład użyć do obliczenia średniej stopy wzrostu danego procentu składanego przy zmiennej stopie.",
		abstract: "Zwraca średnią geometryczną tablicy lub zakresu danych dodatnich. Funkcji ŚREDNIA.GEOMETRYCZNA można na przykład użyć do obliczenia średniej stopy wzrostu danego procentu składanego przy zmiennej stopie.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/geomean-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Argument liczba1 jest wymagany, pozostałe są opcjonalne. Od 1 do 255 argumentów, dla których jest obliczana średnia. Zamiast argumentów rozdzielonych średnikami można użyć pojedynczej tablicy lub odwołania do tablicy."
			},
			number2: {
				name: "number2",
				detail: "Argument liczba1 jest wymagany, pozostałe są opcjonalne. Od 1 do 255 argumentów, dla których jest obliczana średnia. Zamiast argumentów rozdzielonych średnikami można użyć pojedynczej tablicy lub odwołania do tablicy."
			}
		}
	},
	GROWTH: {
		description: "Oblicza przewidywany wzrost wykładniczy, używając istniejących danych. Funkcja REGEXPW zwraca wartości y dla serii nowych wartości x określonych na podstawie istniejących wartości x i y. Można także użyć funkcji REGEXPW, aby dopasować krzywą wykładniczą do istniejących wartości x i y.",
		abstract: "Oblicza przewidywany wzrost wykładniczy, używając istniejących danych. Funkcja REGEXPW zwraca wartości y dla serii nowych wartości x określonych na podstawie istniejących wartości x i y. Można także użyć funkcji REGEXPW, aby dopasować krzywą wykładniczą do istniejących wartości x i y.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/growth-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Wymagane. Zestaw znanych wartości y spełniających zależność y = b*m^x. Jeśli tablica znane_y znajduje się w pojedynczej kolumnie, to każda kolumna tablicy znane_x jest interpretowana jako oddzielna zmienna. Jeśli tablica znane_y znajduje się w pojedynczym wierszu, to każdy wiersz tablicy znane_x jest interpretowany jako oddzielna zmienna. Jeśli którakolwiek z liczb w known_y jest ujemna lub 0, funkcja REGEXPW zwraca #NUM! wartość błędu #ADR!."
			},
			knownXs: {
				name: "known_x's",
				detail: "Opcjonalne. Zbiór znanych wartości x spełniających zależność y = b*m^x. Tablica known_x może zawierać jeden lub więcej zestawów zmiennych. Jeśli jest używana tylko jedna zmienna, known_y i known_x mogą być zakresami dowolnego kształtu, o ile mają jednakowe wymiary. Jeśli jest używana więcej niż jedna zmienna, known_y musi być wektorem (czyli zakresem o wysokości jednego wiersza lub szerokości jednej kolumny). Jeżeli argument znane_x jest pominięty, przyjmuje się, że jest on tablicą {1;2;3;...}, która ma ten sam rozmiar co tablica znane_y."
			},
			newXs: {
				name: "new_x's",
				detail: "Opcjonalne. Zestaw nowych wartości x, dla których funkcja REGEXPW ma zwrócić odpowiednie wartości y. New_x musi zawierać kolumnę (lub wiersz) dla każdej zmiennej niezależnej, podobnie jak known_x. Jeśli więc known_y znajduje się w jednej kolumnie, known_x i new_x muszą mieć taką samą liczbę kolumn. Jeśli known_y znajduje się w jednym wierszu, known_x i new_x muszą mieć taką samą liczbę wierszy. Jeżeli argument nowe_ x zostanie pominięty, przyjmuje się, że jest on taki sam jak znane_x. Jeżeli zarówno znane_x jak i nowe_x zostaną pominięte, to przyjmuje się, że są one tablicą {1;2;3;...} o takiej samej wielkości co znane_y."
			},
			constb: {
				name: "const",
				detail: "Opcjonalne. Wartość logiczna określająca, czy stała b ma mieć narzuconą wartość 1. Jeżeli stała ma wartość PRAWDA lub jest pominięta, to stała b jest obliczana normalnie. Jeśli stała ma wartość FAŁSZ, to stała b jest ustawiana jako równa 1, a wartości m są tak dostosowywane, aby y = m^x."
			}
		}
	},
	HARMEAN: {
		description: "Zwraca średnią harmoniczną zbioru danych. Średnia harmoniczna jest odwrotnością średniej arytmetycznej odwrotności.",
		abstract: "Zwraca średnią harmoniczną zbioru danych. Średnia harmoniczna jest odwrotnością średniej arytmetycznej odwrotności.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/harmean-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Argument liczba1 jest wymagany, pozostałe są opcjonalne. Od 1 do 255 argumentów, dla których jest obliczana średnia. Zamiast argumentów rozdzielonych średnikami można użyć pojedynczej tablicy lub odwołania do tablicy."
			},
			number2: {
				name: "number2",
				detail: "Argument liczba1 jest wymagany, pozostałe są opcjonalne. Od 1 do 255 argumentów, dla których jest obliczana średnia. Zamiast argumentów rozdzielonych średnikami można użyć pojedynczej tablicy lub odwołania do tablicy."
			}
		}
	},
	HYPGEOM_DIST: {
		description: "Zwraca rozkład hipergeometryczny. HIPERGEOM. Funkcja ROZKŁ.DIST zwraca prawdopodobieństwo podanej liczby sukcesów próbek, biorąc pod uwagę wielkość próbki, sukcesy populacji i wielkość populacji. Użyj hipergeomu. RozKŁ.DY dla problemów z skończoną populacją, gdzie każda obserwacja jest sukcesem lub porażką i gdzie każdy podzbiór o danej wielkości jest wybierany z jednakowym prawdopodobieństwem.",
		abstract: "Zwraca rozkład hipergeometryczny. HIPERGEOM. Funkcja ROZKŁ.DIST zwraca prawdopodobieństwo podanej liczby sukcesów próbek, biorąc pod uwagę wielkość próbki, sukcesy populacji i wielkość populacji. Użyj hipergeomu. RozKŁ.DY dla problemów z skończoną populacją, gdzie każda obserwacja jest sukcesem lub porażką i gdzie każdy podzbiór o danej wielkości jest wybierany z jednakowym prawdopodobieństwem.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/hypgeom-dist-function"
		}],
		functionParameter: {
			sampleS: {
				name: "sample_s",
				detail: "Wymagane. Liczba sukcesów w próbce."
			},
			numberSample: {
				name: "number_sample",
				detail: "Wymagane. Wielkość próbki."
			},
			populationS: {
				name: "population_s",
				detail: "Wymagane. Liczba sukcesów w populacji."
			},
			numberPop: {
				name: "number_pop",
				detail: "Wymagane. Wielkość populacji."
			},
			cumulative: {
				name: "cumulative",
				detail: "Wymagane. Wartość logiczna, która określa postać funkcji. Jeśli wartością argumentu skumulowany jest PRAWDA, funkcja ROZKŁ.HIPERGEOM zwraca funkcję rozkładu skumulowanego, a jeśli FAŁSZ, funkcja zwraca funkcję masy prawdopodobieństwa."
			}
		}
	},
	INTERCEPT: {
		description: "Oblicza punkt przecięcia się linii z osią y przy użyciu istniejących wartości znane_x i znane_y. Punkt przecięcia jest to punkt, w którym prosta regresji, poprowadzona przez wartości znane_x i znane_y, przecina oś y. Należy stosować funkcję ODCIĘTA wtedy, gdy chce się wyznaczyć wartość zmiennej zależnej przy zerowej wartości zmiennej niezależnej. Na przykład można zastosować funkcję ODCIĘTA do wyznaczenia oporności metalu przy 0°C, podczas gdy punkty pomiarowe wyznaczano w temperaturze pokojowej i wyższych.",
		abstract: "Oblicza punkt przecięcia się linii z osią y przy użyciu istniejących wartości znane_x i znane_y. Punkt przecięcia jest to punkt, w którym prosta regresji, poprowadzona przez wartości znane_x i znane_y, przecina oś y. Należy stosować funkcję ODCIĘTA wtedy, gdy chce się wyznaczyć wartość zmiennej zależnej przy zerowej wartości zmiennej niezależnej. Na przykład można zastosować funkcję ODCIĘTA do wyznaczenia oporności metalu przy 0°C, podczas gdy punkty pomiarowe wyznaczano w temperaturze pokojowej i wyższych.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/intercept-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Wymagane. Zbiór danych lub obserwacji zależnych."
			},
			knownXs: {
				name: "known_x's",
				detail: "Wymagane. Zbiór danych lub obserwacji niezależnych."
			}
		}
	},
	KURT: {
		description: "Zwraca kurtozę zbioru danych. Kurtoza charakteryzuje względną szczytowość lub płaskość rozkładu w porównaniu z rozkładem normalnym. Dodatnia kurtoza oznacza rozkład o stosunkowo dużej szczytowości. Ujemna kurtoza oznacza rozkład stosunkowo płaski.",
		abstract: "Zwraca kurtozę zbioru danych. Kurtoza charakteryzuje względną szczytowość lub płaskość rozkładu w porównaniu z rozkładem normalnym. Dodatnia kurtoza oznacza rozkład o stosunkowo dużej szczytowości. Ujemna kurtoza oznacza rozkład stosunkowo płaski.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/kurt-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Argument liczba1 jest wymagany, pozostałe są opcjonalne. Od 1 do 255 argumentów, dla których jest obliczana kurtoza. Zamiast argumentów rozdzielonych średnikami można użyć jednej tablicy lub odwołania do tablicy."
			},
			number2: {
				name: "number2",
				detail: "Argument liczba1 jest wymagany, pozostałe są opcjonalne. Od 1 do 255 argumentów, dla których jest obliczana kurtoza. Zamiast argumentów rozdzielonych średnikami można użyć jednej tablicy lub odwołania do tablicy."
			}
		}
	},
	LARGE: {
		description: "Zwraca k-tą największą wartość w zbiorze danych. Funkcji tej można użyć do wybrania wartości na podstawie jej względnej pozycji. Przykładowo można użyć funkcji MAX.K w celu określenia pierwszego, drugiego lub trzeciego miejsca.",
		abstract: "Zwraca k-tą największą wartość w zbiorze danych. Funkcji tej można użyć do wybrania wartości na podstawie jej względnej pozycji. Przykładowo można użyć funkcji MAX.K w celu określenia pierwszego, drugiego lub trzeciego miejsca.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/large-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Wymagane. Tablica lub zakres danych, dla których ma zostać wyznaczona k-ta największą wartość."
			},
			k: {
				name: "k",
				detail: "Argument wymagany. Wyznaczana pozycja danej (od największej) w tablicy lub zakresie komórek."
			}
		}
	},
	LINEST: {
		description: "Funkcja REGLINP oblicza statystykę dla linii, korzystając z metody najmniejszych kwadratów, aby obliczyć linię prostą, która najlepiej pasuje do danych, a następnie zwraca tablicę opisującą tę linię. Funkcję REGLINP można również połączyć z innymi funkcjami, aby obliczyć statystykę dla innych typów modeli, które są liniowe w nieznanych parametrach, w tym serii wielomianowych, logarytmicznych, wykładniczych i potęgowych. Funkcja zwraca tablicę wartości, musi więc być wprowadzana w postaci formuły tablicowej. Instrukcje są zgodne z przykładami przedstawionymi w tym artykule.",
		abstract: "Funkcja REGLINP oblicza statystykę dla linii, korzystając z metody najmniejszych kwadratów, aby obliczyć linię prostą, która najlepiej pasuje do danych, a następnie zwraca tablicę opisującą tę linię. Funkcję REGLINP można również połączyć z innymi funkcjami, aby obliczyć statystykę dla innych typów modeli, które są liniowe w nieznanych parametrach, w tym serii wielomianowych, logarytmicznych, wykładniczych i potęgowych. Funkcja zwraca tablicę wartości, musi więc być wprowadzana w postaci formuły tablicowej. Instrukcje są zgodne z przykładami przedstawionymi w tym artykule.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/linest-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Argument wymagany. Jest to zestaw znanych wartości y spełniających zależność y = mx + b. Jeśli zakres known_y znajduje się w jednej kolumnie, to każda z known_x jest interpretowana jako oddzielna zmienna. Jeśli zakres known_y znajduje się w jednym wierszu, to każdy wiersz known_x jest interpretowany jako oddzielna zmienna."
			},
			knownXs: {
				name: "known_x's",
				detail: "Opcjonalnie. Jest to zestaw znanych wartości x spełniających zależność y = mx + b. Zakres known_x może zawierać jeden lub więcej zestawów zmiennych. Jeśli użyto tylko jednej zmiennej, known_y i known_x mogą być zakresami o dowolnym kształcie, o ile mają jednakowe wymiary. Jeśli użyto więcej niż jednej zmiennej, known_y musi być wektorem (czyli zakresem o wysokości jednego wiersza lub szerokości jednej kolumny). Jeśli argument known_x zostanie pominięty, przyjmuje się, że jest on tablicą {1;2;3,...} o takim samym rozmiarze jak known_y ."
			},
			constb: {
				name: "const",
				detail: "Opcjonalnie. Wartość logiczna określająca, czy stała b ma mieć narzuconą wartość 0. Jeżeli stała ma wartość PRAWDA lub jest pominięta, to stała b jest obliczana normalnie. Jeśli stała ma wartość FAŁSZ, to stała b jest ustawiana jako równa 0, a wartości m są dostosowywane tak, aby wypełnić równanie y = mx."
			},
			stats: {
				name: "stats",
				detail: "Opcjonalnie. Wartość logiczna określająca, czy mają być zwracane dodatkowe statystyki regresji. Jeśli argument statystyka ma wartość PRAWDA, funkcja REGLINP zwraca dodatkowe statystyki regresji; W rezultacie zwrócona tablica to {mn;mn-1,...,m1;b; sen,sen-1,...,se1,seb; r 2,sey ; F,df; ssreg,ssresid} . Jeśli argument statystyka ma wartość FAŁSZ lub jest pominięty, funkcja REGLINP zwraca tylko współczynniki m i stałą b. Poniżej przedstawiono dodatkowe statystyki regresji:"
			}
		}
	},
	LOGEST: {
		description: "Poniżej przedstawiono równanie krzywej:",
		abstract: "Poniżej przedstawiono równanie krzywej:",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/logest-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Wymagane. Zestaw znanych wartości y spełniających zależność y = b*m^x. Jeśli tablica znane_y znajduje się w pojedynczej kolumnie, to każda kolumna tablicy znane_x jest interpretowana jako oddzielna zmienna. Jeśli tablica znane_y znajduje się w pojedynczym wierszu, to każdy wiersz tablicy znane_x jest interpretowany jako oddzielna zmienna."
			},
			knownXs: {
				name: "known_x's",
				detail: "Opcjonalne. Zbiór znanych wartości x spełniających zależność y = b*m^x. Tablica known_x może zawierać jeden lub więcej zestawów zmiennych. Jeśli jest używana tylko jedna zmienna, known_y i known_x mogą być zakresami dowolnego kształtu, o ile mają jednakowe wymiary. Jeśli jest używana więcej niż jedna zmienna, known_y musi być zakresem komórek o wysokości jednego wiersza lub szerokości jednej kolumny (nazywanej również wektorem). Jeżeli argument znane_x jest pominięty, przyjmuje się, że jest on tablicą {1;2;3;...} o tym samym rozmiarze, co znane_y."
			},
			constb: {
				name: "const",
				detail: "Opcjonalne. Wartość logiczna określająca, czy stała b ma mieć narzuconą wartość 1. Jeżeli stała ma wartość PRAWDA lub jest pominięta, to stała b jest obliczana normalnie. Jeśli stała ma wartość FAŁSZ, to stała b jest ustawiana na wartość 1, a wartości m są dopasowywane do równania y = m^x."
			},
			stats: {
				name: "stats",
				detail: "Opcjonalne. Wartość logiczna określająca, czy mają być zwracane dodatkowe statystyki regresji. Jeśli argument statystyka ma wartość PRAWDA, to funkcja REGEXPP zwraca dodatkowe statystyki regresji, więc zwrócona tablica przedstawia się następująco: {mn;mn-1;...;m1;b\\sen;sen-1;...;se1;seb\\r 2;sey\\F;df\\ssreg;ssresid}. Jeśli argument statystyka ma wartość FAŁSZ lub jest pominięty, to funkcja REGEXPP zwraca jedynie współczynniki m i stałą b."
			}
		}
	},
	LOGNORM_DIST: {
		description: "Funkcję tę należy stosować do analizowania danych, które zostały przetworzone logarytmicznie.",
		abstract: "Funkcję tę należy stosować do analizowania danych, które zostały przetworzone logarytmicznie.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/lognorm-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Argument wymagany. Wartość, dla której ta funkcja ma zostać obliczona."
			},
			mean: {
				name: "mean",
				detail: "Wymagane. Wartość średnia ln(x)."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Wymagane. Odchylenie standardowe ln(x)."
			},
			cumulative: {
				name: "cumulative",
				detail: "Wymagane. Wartość logiczna, która określa postać funkcji. Jeśli wartością argumentu skumulowany jest PRAWDA, funkcja ROZKŁ.LOG zwraca funkcję rozkładu skumulowanego, a jeśli FAŁSZ, funkcja zwraca funkcję gęstości prawdopodobieństwa."
			}
		}
	},
	LOGNORM_INV: {
		description: "Zwraca odwrotność funkcji skumulowanego rozkładu logarytmiczno-normalnego x, gdzie ln(x) ma rozkład normalny z parametrami średnia i odchylenie_std. Jeśli p = ROZKŁAD.LOG(x;...), to ROZKŁ.LOG.ODWR(p;...) = x.",
		abstract: "Zwraca odwrotność funkcji skumulowanego rozkładu logarytmiczno-normalnego x, gdzie ln(x) ma rozkład normalny z parametrami średnia i odchylenie_std. Jeśli p = ROZKŁAD.LOG(x;...), to ROZKŁ.LOG.ODWR(p;...) = x.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/lognorm-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Wymagane. Prawdopodobieństwo skojarzone z rozkładem logarytmiczno-normalnym."
			},
			mean: {
				name: "mean",
				detail: "Wymagane. Wartość średnia ln(x)."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Wymagane. Odchylenie standardowe ln(x)."
			}
		}
	},
	MARGINOFERROR: {
		description: "Oblicza margines błędu na podstawie zakresu wartości i poziomu ufności.",
		abstract: "Oblicza margines błędu na podstawie zakresu wartości i poziomu ufności.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/12487850?hl=pl"
		}],
		functionParameter: {
			range: {
				name: "range",
				detail: "Zakres wartości używany do obliczenia marginesu błędu."
			},
			confidence: {
				name: "confidence",
				detail: "Żądany poziom ufności z przedziału (0; 1)."
			}
		}
	},
	MAX: {
		description: "Zwraca największą wartość w zbiorze wartości.",
		abstract: "Zwraca największą wartość w zbiorze wartości.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/max-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Argument liczba1 jest wymagany, pozostałe są opcjonalne. Od 1 do 255 argumentów, dla których należy wyznaczyć wartość maksymalną."
			},
			number2: {
				name: "number2",
				detail: "Argument liczba1 jest wymagany, pozostałe są opcjonalne. Od 1 do 255 argumentów, dla których należy wyznaczyć wartość maksymalną."
			}
		}
	},
	MAXA: {
		description: "Zwraca największą wartość z listy argumentów.",
		abstract: "Zwraca największą wartość z listy argumentów.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/maxa-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Wymagane. Pierwszy argument liczbowy, dla którego ma zostać obliczona wartość maksymalna."
			},
			value2: {
				name: "value2",
				detail: "Opcjonalne. Argumenty liczbowe, od 2 do 255 wartości, dla których należy znaleźć największą wartość."
			}
		}
	},
	MAXIFS: {
		description: "Funkcja MAKS.WARUNKÓW zwraca wartość maksymalną spośród komórek spełniających podany zestaw warunków lub kryteriów.",
		abstract: "Funkcja MAKS.WARUNKÓW zwraca wartość maksymalną spośród komórek spełniających podany zestaw warunków lub kryteriów.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/maxifs-function"
		}],
		functionParameter: {
			maxRange: {
				name: "sum_range",
				detail: "Zakres komórek, w którym zostanie określona wartość maksymalna."
			},
			criteriaRange1: {
				name: "criteria_range1",
				detail: "Zbiór komórek ocenianych na podstawie kryteriów."
			},
			criteria1: {
				name: "criteria1",
				detail: "Kryteria w postaci liczby, wyrażenia lub tekstu, definiujące, które wartości zostaną określone jako maksymalne. Takie same kryteria stosuje się w funkcjach MIN.WARUNKÓW , SUMA.WARUNKÓW i ŚREDNIA.WARUNKÓW ."
			},
			criteriaRange2: {
				name: "criteriaRange2",
				detail: "Dodatkowe zakresy i skojarzone z nimi kryteria. Maksymalnie można wprowadzić 126 par zakres/kryteria."
			},
			criteria2: {
				name: "criteria2",
				detail: "Dodatkowe zakresy i skojarzone z nimi kryteria. Maksymalnie można wprowadzić 126 par zakres/kryteria."
			}
		}
	},
	MEDIAN: {
		description: "Zwraca medianę podanych liczb.",
		abstract: "Zwraca medianę podanych liczb.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/median-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Pierwsza liczba, odwołanie do komórki lub zakres, dla których chcesz wyznaczyć medianę."
			},
			number2: {
				name: "number2",
				detail: "Dodatkowe liczby, odwołania do komórek lub zakresy, dla których chcesz wyznaczyć medianę; maksymalnie 255."
			}
		}
	},
	MIN: {
		description: "Zwraca najmniejszą liczbę w zbiorze wartości.",
		abstract: "Zwraca najmniejszą liczbę w zbiorze wartości.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/min-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Argument liczba1 jest opcjonalny, pozostałe są opcjonalne. Od 1 do 255 argumentów, dla których należy wyznaczyć wartość minimalną."
			},
			number2: {
				name: "number2",
				detail: "Argument liczba1 jest opcjonalny, pozostałe są opcjonalne. Od 1 do 255 argumentów, dla których należy wyznaczyć wartość minimalną."
			}
		}
	},
	MINA: {
		description: "Zwraca najmniejszą wartość z listy argumentów.",
		abstract: "Zwraca najmniejszą wartość z listy argumentów.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/mina-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Argument wartość1 jest wymagany, pozostałe są opcjonalne. Od 1 do 255 wartości, dla których należy wyznaczyć najmniejszą wartość."
			},
			value2: {
				name: "value2",
				detail: "Argument wartość1 jest wymagany, pozostałe są opcjonalne. Od 1 do 255 wartości, dla których należy wyznaczyć najmniejszą wartość."
			}
		}
	},
	MINIFS: {
		description: "Funkcja MIN.WARUNKÓW zwraca wartość minimalną spośród komórek spełniających podany zestaw warunków lub kryteriów.",
		abstract: "Funkcja MIN.WARUNKÓW zwraca wartość minimalną spośród komórek spełniających podany zestaw warunków lub kryteriów.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/minifs-function"
		}],
		functionParameter: {
			minRange: {
				name: "min_range",
				detail: "Zakres komórek, w którym zostanie określona wartość minimalna."
			},
			criteriaRange1: {
				name: "criteria_range1",
				detail: "Zbiór komórek ocenianych na podstawie kryteriów."
			},
			criteria1: {
				name: "criteria1",
				detail: "Kryteria w postaci liczby, wyrażenia lub tekstu, definiujące, które wartości zostaną określone jako minimalne. Takie same kryteria stosuje się w funkcjach MAKS.WARUNKÓW , SUMA.WARUNKÓW i ŚREDNIA.WARUNKÓW ."
			},
			criteriaRange2: {
				name: "criteria_range2",
				detail: "Dodatkowe zakresy i skojarzone z nimi kryteria. Maksymalnie można wprowadzić 126 par zakres/kryteria."
			},
			criteria2: {
				name: "criteria2",
				detail: "Dodatkowe zakresy i skojarzone z nimi kryteria. Maksymalnie można wprowadzić 126 par zakres/kryteria."
			}
		}
	},
	MODE_MULT: {
		description: "Jeśli istnieje więcej niż jedna dominanta, ta funkcja zwraca kilka wyników. Funkcja zwraca tablicę wartości, więc musi zostać wprowadzona w postaci formuły tablicowej.",
		abstract: "Jeśli istnieje więcej niż jedna dominanta, ta funkcja zwraca kilka wyników. Funkcja zwraca tablicę wartości, więc musi zostać wprowadzona w postaci formuły tablicowej.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/mode-mult-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Wymagane. Pierwsza liczba zakresu, dla którego ma zostać obliczona dominanta."
			},
			number2: {
				name: "number2",
				detail: "Opcjonalne. Argumenty liczbowe od 2 do 254, dla których należy obliczyć dominantę. Zamiast argumentów rozdzielonych średnikami można użyć pojedynczej tablicy lub odwołania do tablicy."
			}
		}
	},
	MODE_SNGL: {
		description: "Zwraca wartość najczęściej występującą lub powtarzającą się w tablicy albo w zakresie danych.",
		abstract: "Zwraca wartość najczęściej występującą lub powtarzającą się w tablicy albo w zakresie danych.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/mode-sngl-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Wymagane. Pierwszy argument, dla którego ma zostać obliczona dominanta."
			},
			number2: {
				name: "number2",
				detail: "Opcjonalne. Argumenty od 2 do 254, dla których należy obliczyć dominantę. Zamiast argumentów rozdzielonych średnikami można użyć pojedynczej tablicy lub odwołania do tablicy."
			}
		}
	},
	NEGBINOM_DIST: {
		description: "Zwraca ujemny rozkład dwumianowy — prawdopodobieństwo, że wystąpi liczba_p porażek przed wystąpieniem liczba_s-tego sukcesu przy prawdopodobieństwie sukcesu prawdopodobieństwo_s.",
		abstract: "Zwraca ujemny rozkład dwumianowy — prawdopodobieństwo, że wystąpi liczba_p porażek przed wystąpieniem liczba_s-tego sukcesu przy prawdopodobieństwie sukcesu prawdopodobieństwo_s.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/negbinom-dist-function"
		}],
		functionParameter: {
			numberF: {
				name: "number_f",
				detail: "Wymagane. Liczba porażek."
			},
			numberS: {
				name: "number_s",
				detail: "Wymagane. Progowa liczba sukcesów."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Wymagane. Prawdopodobieństwo sukcesu."
			},
			cumulative: {
				name: "cumulative",
				detail: "Wymagane. Wartość logiczna, która określa postać funkcji. Jeśli wartością argumentu „skumulowany” jest PRAWDA, funkcja ROZKŁ.DWUM.PRZEC zwraca funkcję rozkładu skumulowanego, a jeśli FAŁSZ, funkcja zwraca funkcję gęstości prawdopodobieństwa."
			}
		}
	},
	NORM_DIST: {
		description: "Zwraca rozkład normalny dla określonej średniej i odchylenia standardowego. Funkcja ta ma bardzo szeroki zakres zastosowań w statystyce, łącznie z badaniem hipotez.",
		abstract: "Zwraca rozkład normalny dla określonej średniej i odchylenia standardowego. Funkcja ta ma bardzo szeroki zakres zastosowań w statystyce, łącznie z badaniem hipotez.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/norm-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Argument wymagany. Wartość, dla której należy obliczyć rozkład."
			},
			mean: {
				name: "mean",
				detail: "Wymagane. Średnia arytmetyczna rozkładu."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Wymagane. Odchylenie standardowe rozkładu."
			},
			cumulative: {
				name: "cumulative",
				detail: "Wymagane. Wartość logiczna, która określa postać funkcji. Jeśli wartością argumentu \"skumulowany\" jest PRAWDA, jest to norma. Funkcja ROZKŁ.D zwraca funkcję rozkładu skumulowanego. jeśli FAŁSZ, funkcja zwraca funkcję gęstości prawdopodobieństwa."
			}
		}
	},
	NORM_INV: {
		description: "Zwraca odwrotność skumulowanego rozkładu normalnego dla podanej średniej i odchylenia standardowego.",
		abstract: "Zwraca odwrotność skumulowanego rozkładu normalnego dla podanej średniej i odchylenia standardowego.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/norm-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Wymagane. Prawdopodobieństwo odpowiadające rozkładowi normalnemu."
			},
			mean: {
				name: "mean",
				detail: "Wymagane. Średnia arytmetyczna rozkładu."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Wymagane. Odchylenie standardowe rozkładu."
			}
		}
	},
	NORM_S_DIST: {
		description: "Norma. Funkcja ROZKŁ.S w programie Excel zwraca standardowy rozkład normalny ( tj. ma średnią zero i odchylenie standardowe jednego ). Funkcji tej można używać miejscu tabeli standardowych obszarów krzywej normalnej.",
		abstract: "Norma. Funkcja ROZKŁ.S w programie Excel zwraca standardowy rozkład normalny ( tj. ma średnią zero i odchylenie standardowe jednego ). Funkcji tej można używać miejscu tabeli standardowych obszarów krzywej normalnej.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/norm-s-dist-function"
		}],
		functionParameter: {
			z: {
				name: "z",
				detail: "Argument wymagany. Jest to wartość, dla której należy obliczyć rozkład."
			},
			cumulative: {
				name: "cumulative",
				detail: "Wymagane. Argumentem skumulowanym może być PRAWDA lub FAŁSZ . Ta wartość logiczna określa postać funkcji. Jeśli wartością argumentu \"skumulowany\" jest PRAWDA, to norma. Funkcja ROZKŁ.S zwraca funkcję rozkładu skumulowanego . Jeśli ma wartość FAŁSZ, funkcja zwraca funkcję masy prawdopodobieństwa ."
			}
		}
	},
	NORM_S_INV: {
		description: "Zwraca funkcję odwrotną skumulowanego, standardowego rozkładu normalnego. Rozkład ten ma średnią równą zero i standardowe odchylenie równe jeden.",
		abstract: "Zwraca funkcję odwrotną skumulowanego, standardowego rozkładu normalnego. Rozkład ten ma średnią równą zero i standardowe odchylenie równe jeden.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/norm-s-inv-function"
		}],
		functionParameter: { probability: {
			name: "probability",
			detail: "Wymagane. Prawdopodobieństwo odpowiadające rozkładowi normalnemu."
		} }
	},
	PEARSON: {
		description: "Zwraca współczynnik korelacji liniowej Pearsona r. Jest to bezwymiarowy wskaźnik, którego wartość mieści się w zakresie od -1,0 do 1,0 włącznie, i odzwierciedla stopień liniowej zależności pomiędzy dwoma zestawami danych.",
		abstract: "Zwraca współczynnik korelacji liniowej Pearsona r. Jest to bezwymiarowy wskaźnik, którego wartość mieści się w zakresie od -1,0 do 1,0 włącznie, i odzwierciedla stopień liniowej zależności pomiędzy dwoma zestawami danych.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/pearson-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Wymagane. Zbiór wartości niezależnych."
			},
			array2: {
				name: "array2",
				detail: "Wymagane. Zbiór wartości zależnych."
			}
		}
	},
	PERCENTILE_EXC: {
		description: "Zwraca k-ty percentyl wartości w zestawie danych (z wyłączeniem 0 i 1).",
		abstract: "Zwraca k-ty percentyl wartości w zestawie danych (z wyłączeniem 0 i 1).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/percentile-exc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Tablica lub zakres danych określający pozycję względną."
			},
			k: {
				name: "k",
				detail: "Wartość percentyla z zakresu od 0 do 1, z wyłączeniem 0 i 1."
			}
		}
	},
	PERCENTILE_INC: {
		description: "Zwraca k-ty percentyl wartości w zestawie danych (z uwzględnieniem 0 i 1).",
		abstract: "Zwraca k-ty percentyl wartości w zestawie danych (z uwzględnieniem 0 i 1).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/percentile-inc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Tablica lub zakres danych określający pozycję względną."
			},
			k: {
				name: "k",
				detail: "Wartość percentyla z zakresu od 0 do 1, z uwzględnieniem 0 i 1."
			}
		}
	},
	PERCENTRANK_EXC: {
		description: "Zwraca rangę procentową wartości w zestawie danych (z wyłączeniem 0 i 1).",
		abstract: "Zwraca rangę procentową wartości w zestawie danych (z wyłączeniem 0 i 1).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/percentrank-exc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Tablica lub zakres danych określający pozycję względną."
			},
			x: {
				name: "x",
				detail: "Wartość, dla której chcesz poznać rangę."
			},
			significance: {
				name: "significance",
				detail: "Wartość określająca liczbę cyfr znaczących zwracanej wartości procentowej. Jeśli ją pominiesz, funkcja PERCENTRANK.EXC użyje trzech cyfr (0,xxx)."
			}
		}
	},
	PERCENTRANK_INC: {
		description: "Zwraca rangę procentową wartości w zestawie danych (z uwzględnieniem 0 i 1).",
		abstract: "Zwraca rangę procentową wartości w zestawie danych (z uwzględnieniem 0 i 1).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/percentrank-inc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Tablica lub zakres danych określający pozycję względną."
			},
			x: {
				name: "x",
				detail: "Wartość, dla której chcesz poznać rangę."
			},
			significance: {
				name: "significance",
				detail: "Wartość określająca liczbę cyfr znaczących zwracanej wartości procentowej. Jeśli ją pominiesz, funkcja PERCENTRANK.INC użyje trzech cyfr (0,xxx)."
			}
		}
	},
	PERMUT: {
		description: "Zwraca liczbę permutacji dla podanej liczby obiektów, które można wybrać z szerszej grupy obiektów liczbowych. Permutacją jest dowolny zbiór lub podzbiór obiektów lub zdarzeń, gdzie ważne jest wewnętrzne uporządkowanie. Permutacje różnią się od kombinacji, dla których wewnętrzne uporządkowanie nie jest istotne. Funkcję tę należy stosować do obliczania prawdopodobieństwa typu loteryjnego.",
		abstract: "Zwraca liczbę permutacji dla podanej liczby obiektów, które można wybrać z szerszej grupy obiektów liczbowych. Permutacją jest dowolny zbiór lub podzbiór obiektów lub zdarzeń, gdzie ważne jest wewnętrzne uporządkowanie. Permutacje różnią się od kombinacji, dla których wewnętrzne uporządkowanie nie jest istotne. Funkcję tę należy stosować do obliczania prawdopodobieństwa typu loteryjnego.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/permut-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Liczba całkowita, która opisuje liczbę obiektów."
			},
			numberChosen: {
				name: "number_chosen",
				detail: "Wymagane. Liczba całkowita, która opisuje liczbę obiektów w każdej permutacji."
			}
		}
	},
	PERMUTATIONA: {
		description: "Zwraca liczbę permutacji dla podanej liczby obiektów (z powtórzeniami), które można wybrać spośród wszystkich obiektów.",
		abstract: "Zwraca liczbę permutacji dla podanej liczby obiektów (z powtórzeniami), które można wybrać spośród wszystkich obiektów.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/permutationa-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Liczba całkowita, która opisuje całkowitą liczbę obiektów."
			},
			numberChosen: {
				name: "number_chosen",
				detail: "Wymagane. Liczba całkowita, która opisuje liczbę obiektów w każdej permutacji."
			}
		}
	},
	PHI: {
		description: "Zwraca wartość funkcji gęstości dla standardowego rozkładu normalnego.",
		abstract: "Zwraca wartość funkcji gęstości dla standardowego rozkładu normalnego.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/phi-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Argument wymagany. X jest liczbą, dla której ma zostać zwrócona gęstość dla standardowego rozkładu normalnego."
		} }
	},
	POISSON_DIST: {
		description: "Zwraca skumulowaną funkcję (dystrybuantę) rozkładu Poissona. Zwykłym zastosowaniem rozkładu Poissona jest prognozowanie liczby zdarzeń w danym czasie, takiej jak liczba samochodów przejeżdżających przez plac w czasie jednej minuty.",
		abstract: "Zwraca skumulowaną funkcję (dystrybuantę) rozkładu Poissona. Zwykłym zastosowaniem rozkładu Poissona jest prognozowanie liczby zdarzeń w danym czasie, takiej jak liczba samochodów przejeżdżających przez plac w czasie jednej minuty.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/poisson-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Argument wymagany. Liczba zdarzeń."
			},
			mean: {
				name: "mean",
				detail: "Wymagane. Oczekiwana wartość liczbowa."
			},
			cumulative: {
				name: "cumulative",
				detail: "Wymagane. Wartość logiczna, która określa postać zwracanego rozkładu prawdopodobieństwa. Jeśli argument skumulowany ma wartość PRAWDA, funkcja ROZKŁ.POISSON zwraca skumulowane prawdopodobieństwo Poissona, że liczba przypadkowych zdarzeń będzie między zero a x włącznie; jeśli ma wartość FAŁSZ, funkcja zwraca funkcję masy prawdopodobieństwa Poissona, że liczba zdarzeń będzie równa dokładnie x."
			}
		}
	},
	PROB: {
		description: "Zwraca prawdopodobieństwo, że wartości w zakresie znajdują się pomiędzy dwiema granicami. Jeżeli argument górna_granica nie jest podany, funkcja ta zwraca prawdopodobieństwo, że wartości w zakres_x są równe dolna_granica.",
		abstract: "Zwraca prawdopodobieństwo, że wartości w zakresie znajdują się pomiędzy dwiema granicami. Jeżeli argument górna_granica nie jest podany, funkcja ta zwraca prawdopodobieństwo, że wartości w zakres_x są równe dolna_granica.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/prob-function"
		}],
		functionParameter: {
			xRange: {
				name: "x_range",
				detail: "Wymagane. Zakres wartości liczbowych x, z którymi są skojarzone prawdopodobieństwa."
			},
			probRange: {
				name: "prob_range",
				detail: "Wymagane. Zbiór prawdopodobieństw skojarzonych z wartościami określonymi w argumencie zakres_x."
			},
			lowerLimit: {
				name: "lower_limit",
				detail: "Opcjonalne. Dolna granica wartości, dla których jest poszukiwane prawdopodobieństwo."
			},
			upperLimit: {
				name: "upper_limit",
				detail: "Opcjonalne. Górna granica wartości, dla których jest poszukiwane prawdopodobieństwo."
			}
		}
	},
	QUARTILE_EXC: {
		description: "Zwraca kwartyl zbioru danych na podstawie wartości percentylu z przedziału od 0 do 1.",
		abstract: "Zwraca kwartyl zbioru danych na podstawie wartości percentylu z przedziału od 0 do 1.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/quartile-exc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Wymagane. Tablica lub zakres komórek z wartościami liczbowymi, dla których ma zostać obliczona wartość kwartylu."
			},
			quart: {
				name: "quart",
				detail: "Wymagane. Wskazuje, która wartość ma zostać zwrócona."
			}
		}
	},
	QUARTILE_INC: {
		description: "Kwartyle są często używane w danych o sprzedaży i w danych statystycznych do dzielenia populacji na grupy. Funkcję KWARTYL.PRZEDZ.ZAMK można na przykład zastosować do znalezienia 25% najwyższych przychodów w populacji.",
		abstract: "Kwartyle są często używane w danych o sprzedaży i w danych statystycznych do dzielenia populacji na grupy. Funkcję KWARTYL.PRZEDZ.ZAMK można na przykład zastosować do znalezienia 25% najwyższych przychodów w populacji.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/quartile-inc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Wymagane. Tablica lub zakres komórek z wartościami liczbowymi, dla których ma zostać obliczona wartość kwartylu."
			},
			quart: {
				name: "quart",
				detail: "Wymagane. Wskazuje, która wartość ma zostać zwrócona."
			}
		}
	},
	RANK_AVG: {
		description: "Zwraca pozycję liczby na liście liczb: jej rozmiar względem innych wartości na liście. Jeśli więcej niż jedna wartość ma taką samą pozycję, zwracana jest średnia pozycja.",
		abstract: "Zwraca pozycję liczby na liście liczb: jej rozmiar względem innych wartości na liście. Jeśli więcej niż jedna wartość ma taką samą pozycję, zwracana jest średnia pozycja.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/rank-avg-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Liczba, której pozycja ma zostać określona."
			},
			ref: {
				name: "ref",
				detail: "Wymagane. Tablica z listą liczb lub odwołanie do takiej listy. Wartości w odwołaniu niebędące liczbami są ignorowane."
			},
			order: {
				name: "order",
				detail: "Opcjonalne. Liczba określająca sposób ustalania pozycji liczby."
			}
		}
	},
	RANK_EQ: {
		description: "Zwraca pozycję pewnej liczby na liście liczb. Jego rozmiar jest w stosunku do innych wartości na liście; Jeśli więcej niż jedna wartość ma taką samą pozycję, zwracana jest najwyższa pozycja tego zestawu wartości.",
		abstract: "Zwraca pozycję pewnej liczby na liście liczb. Jego rozmiar jest w stosunku do innych wartości na liście; Jeśli więcej niż jedna wartość ma taką samą pozycję, zwracana jest najwyższa pozycja tego zestawu wartości.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/rank-eq-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Liczba, której pozycja ma zostać określona."
			},
			ref: {
				name: "ref",
				detail: "Wymagane. Tablica z listą liczb lub odwołanie do takiej listy. Wartości w odwołaniu niebędące liczbami są ignorowane."
			},
			order: {
				name: "order",
				detail: "Opcjonalne. Liczba określająca sposób ustalania pozycji liczby."
			}
		}
	},
	RSQ: {
		description: "Zwraca kwadrat korelacji iloczynu momentów Pearsona dla punktów danych w argumentach znane_y i znane_x. Aby uzyskać więcej informacji, zobacz PEARSON, funkcja . Wartość R-kwadrat można zinterpretować jako proporcję wariancji y przypisywaną do wariancji x.",
		abstract: "Zwraca kwadrat korelacji iloczynu momentów Pearsona dla punktów danych w argumentach znane_y i znane_x. Aby uzyskać więcej informacji, zobacz PEARSON, funkcja . Wartość R-kwadrat można zinterpretować jako proporcję wariancji y przypisywaną do wariancji x.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/rsq-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Wymagane. Tablica lub zakres komórek zawierający numeryczne zależne punkty danych."
			},
			knownXs: {
				name: "known_x's",
				detail: "Wymagane. Zbiór niezależnych punktów danych."
			}
		}
	},
	SKEW: {
		description: "Zwraca skośność rozkładu. Skośność charakteryzuje stopień asymetrii rozkładu wokół jego średniej. Skośność dodatnia określa rozkład z asymetrią rozciągającą się w kierunku wartości dodatnich. Skośność ujemna określa rozkład z asymetrią rozciągającą się w kierunku wartości ujemnych.",
		abstract: "Zwraca skośność rozkładu. Skośność charakteryzuje stopień asymetrii rozkładu wokół jego średniej. Skośność dodatnia określa rozkład z asymetrią rozciągającą się w kierunku wartości dodatnich. Skośność ujemna określa rozkład z asymetrią rozciągającą się w kierunku wartości ujemnych.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/skew-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Argument liczba1 jest wymagany, pozostałe są opcjonalne. Od 1 do 255 argumentów, dla których zostanie obliczona skośność. Zamiast argumentów rozdzielonych średnikami można użyć pojedynczej tablicy lub odwołania do tablicy."
			},
			number2: {
				name: "number2",
				detail: "Argument liczba1 jest wymagany, pozostałe są opcjonalne. Od 1 do 255 argumentów, dla których zostanie obliczona skośność. Zamiast argumentów rozdzielonych średnikami można użyć pojedynczej tablicy lub odwołania do tablicy."
			}
		}
	},
	SKEW_P: {
		description: "Zwraca skośność rozkładu na podstawie populacji, charakteryzującą stopień asymetrii rozkładu wokół średniej.",
		abstract: "Zwraca skośność rozkładu na podstawie populacji, charakteryzującą stopień asymetrii rozkładu wokół średniej.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/skew-p-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Pierwsza liczba, odwołanie do komórki lub zakres, dla których chcesz wyznaczyć skośność."
			},
			number2: {
				name: "number2",
				detail: "Dodatkowe liczby, odwołania do komórek lub zakresy, dla których chcesz wyznaczyć skośność; maksymalnie 255."
			}
		}
	},
	SLOPE: {
		description: "Zwraca nachylenie wykresu regresji liniowej dla wszystkich punktów danych w argumentach znane_y i znane_x. Nachylenie to współrzędna pionowa podzielona przez współrzędną poziomą między dwoma dowolnymi punktami na linii, która określa wielkość zmiany wzdłuż linii regresji.",
		abstract: "Zwraca nachylenie wykresu regresji liniowej dla wszystkich punktów danych w argumentach znane_y i znane_x. Nachylenie to współrzędna pionowa podzielona przez współrzędną poziomą między dwoma dowolnymi punktami na linii, która określa wielkość zmiany wzdłuż linii regresji.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/slope-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Wymagane. Tablica lub zakres komórek zawierający numeryczne zależne punkty danych."
			},
			knownXs: {
				name: "known_x's",
				detail: "Wymagane. Zbiór niezależnych punktów danych."
			}
		}
	},
	SMALL: {
		description: "Zwraca k-tą najmniejszą wartość ze zbioru danych. Funkcji tej należy używać do uzyskiwania wartości znajdujących się w określonej względnej pozycji w zbiorze danych.",
		abstract: "Zwraca k-tą najmniejszą wartość ze zbioru danych. Funkcji tej należy używać do uzyskiwania wartości znajdujących się w określonej względnej pozycji w zbiorze danych.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/small-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Wymagane. Tablica lub zakres danych numerycznych, dla których należy określić k-tą najmniejszą wartość."
			},
			k: {
				name: "k",
				detail: "Argument wymagany. Pozycja (od najniższej) w tablicy lub w zakresie danych, którą ma zwrócić funkcja."
			}
		}
	},
	STANDARDIZE: {
		description: "Zwraca wartość znormalizowaną z rozkładu opisanego przez argumenty średnia i odchylenie_std.",
		abstract: "Zwraca wartość znormalizowaną z rozkładu opisanego przez argumenty średnia i odchylenie_std.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/standardize-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Argument wymagany. Wartość, którą zostanie znormalizowana."
			},
			mean: {
				name: "mean",
				detail: "Wymagane. Średnia arytmetyczna rozkładu."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Wymagane. Odchylenie standardowe rozkładu."
			}
		}
	},
	STDEV_P: {
		description: "Odchylenie standardowe jest miarą szerokości rozproszenia wartości od wartości średniej.",
		abstract: "Odchylenie standardowe jest miarą szerokości rozproszenia wartości od wartości średniej.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/stdev-p-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Wymagane. Pierwszy argument liczbowy odpowiadający populacji."
			},
			number2: {
				name: "number2",
				detail: "Opcjonalne. Od 1 do 254 argumentów odpowiadających populacji. Zamiast argumentów rozdzielonych średnikami można użyć pojedynczej tablicy lub odwołania do tablicy."
			}
		}
	},
	STDEV_S: {
		description: "Odchylenie standardowe jest miarą tego, jak szeroko wartości są rozproszone od wartości średniej.",
		abstract: "Odchylenie standardowe jest miarą tego, jak szeroko wartości są rozproszone od wartości średniej.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/stdev-s-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Wymagane. Pierwszy argument liczbowy odpowiadający próbce populacji. Zamiast argumentów rozdzielonych średnikami można użyć pojedynczej tablicy lub odwołania do tablicy."
			},
			number2: {
				name: "number2",
				detail: "Opcjonalne. Od 2 do 254 argumentów liczbowych odpowiadających próbce populacji. Zamiast argumentów rozdzielonych średnikami można użyć pojedynczej tablicy lub odwołania do tablicy."
			}
		}
	},
	STDEVA: {
		description: "Szacuje odchylenie standardowe próbki. Odchylenie standardowe jest miarą tego, jak szeroko wartości są rozproszone od wartości przeciętnej (średniej).",
		abstract: "Szacuje odchylenie standardowe próbki. Odchylenie standardowe jest miarą tego, jak szeroko wartości są rozproszone od wartości przeciętnej (średniej).",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/stdeva-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Argument wartość1 jest wymagany, pozostałe są opcjonalne. Od 1 do 255 wartości odpowiadających próbce populacji. Zamiast argumentów rozdzielonych średnikami można użyć pojedynczej tablicy lub odwołania do tablicy."
			},
			value2: {
				name: "value2",
				detail: "Argument wartość1 jest wymagany, pozostałe są opcjonalne. Od 1 do 255 wartości odpowiadających próbce populacji. Zamiast argumentów rozdzielonych średnikami można użyć pojedynczej tablicy lub odwołania do tablicy."
			}
		}
	},
	STDEVPA: {
		description: "Oblicza odchylenie standardowe dla całej populacji podanej jako argumenty, w tym tekst i wartości logiczne. Odchylenie standardowe jest miarą tego, jak szeroko wartości są rozproszone od wartości średniej.",
		abstract: "Oblicza odchylenie standardowe dla całej populacji podanej jako argumenty, w tym tekst i wartości logiczne. Odchylenie standardowe jest miarą tego, jak szeroko wartości są rozproszone od wartości średniej.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/stdevpa-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Argument wartość1 jest wymagany, pozostałe są opcjonalne. Od 1 do 255 wartości odpowiadających populacji. Zamiast argumentów rozdzielonych średnikami można użyć pojedynczej tablicy lub odwołania do tablicy."
			},
			value2: {
				name: "value2",
				detail: "Argument wartość1 jest wymagany, pozostałe są opcjonalne. Od 1 do 255 wartości odpowiadających populacji. Zamiast argumentów rozdzielonych średnikami można użyć pojedynczej tablicy lub odwołania do tablicy."
			}
		}
	},
	STEYX: {
		description: "Zwraca błąd standardowy prognozowanej wartości y dla każdego x w regresji. Błąd standardowy jest miarą wielkości błędu przy prognozowaniu wartości y dla oddzielnej wartości x.",
		abstract: "Zwraca błąd standardowy prognozowanej wartości y dla każdego x w regresji. Błąd standardowy jest miarą wielkości błędu przy prognozowaniu wartości y dla oddzielnej wartości x.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/steyx-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Wymagane. Tablica lub zakres zależnych punktów danych."
			},
			knownXs: {
				name: "known_x's",
				detail: "Wymagane. Tablica lub zakres niezależnych punktów danych."
			}
		}
	},
	T_DIST: {
		description: "Zwraca lewostronny rozkład t-Studenta. Rozkład t jest stosowany przy testowaniu hipotez dla małych próbek zbiorów danych. Funkcję tę należy stosować zamiast tabeli wartości krytycznych dla rozkładu t.",
		abstract: "Zwraca lewostronny rozkład t-Studenta. Rozkład t jest stosowany przy testowaniu hipotez dla małych próbek zbiorów danych. Funkcję tę należy stosować zamiast tabeli wartości krytycznych dla rozkładu t.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/t-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Argument wymagany. Wartość liczbowa, przy której należy oszacować rozkład."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Wymagane. Liczba całkowita oznaczająca liczbę stopni swobody."
			},
			cumulative: {
				name: "cumulative",
				detail: "Wymagane. Wartość logiczna, która określa postać funkcji. Jeśli wartością argumentu „skumulowany” jest PRAWDA, funkcja ROZKŁ.T zwraca funkcję rozkładu skumulowanego, a jeśli FAŁSZ, funkcja zwraca funkcję gęstości prawdopodobieństwa."
			}
		}
	},
	T_DIST_2T: {
		description: "Rozkład t-Studenta jest stosowany przy testowaniu hipotez dla małych próbek zbiorów danych. Funkcję tę należy stosować zamiast tabeli wartości krytycznych dla rozkładu t.",
		abstract: "Rozkład t-Studenta jest stosowany przy testowaniu hipotez dla małych próbek zbiorów danych. Funkcję tę należy stosować zamiast tabeli wartości krytycznych dla rozkładu t.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/t-dist-2t-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Argument wymagany. Wartość liczbowa, przy której należy oszacować rozkład."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Wymagane. Liczba całkowita oznaczająca liczbę stopni swobody."
			}
		}
	},
	T_DIST_RT: {
		description: "Rozkład t jest stosowany przy testowaniu hipotez dla małych próbek zbiorów danych. Funkcję tę należy stosować zamiast tabeli wartości krytycznych dla rozkładu t.",
		abstract: "Rozkład t jest stosowany przy testowaniu hipotez dla małych próbek zbiorów danych. Funkcję tę należy stosować zamiast tabeli wartości krytycznych dla rozkładu t.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/t-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Argument wymagany. Wartość liczbowa, przy której należy oszacować rozkład."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Wymagane. Liczba całkowita oznaczająca liczbę stopni swobody."
			}
		}
	},
	T_INV: {
		description: "Zwraca lewą odwrotność rozkładu t-Studenta.",
		abstract: "Zwraca lewą odwrotność rozkładu t-Studenta.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/t-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Wymagane. Prawdopodobieństwo skojarzone z rozkładem t-Studenta."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Wymagane. Liczba stopni swobody charakteryzująca rozkład."
			}
		}
	},
	T_INV_2T: {
		description: "Zwraca dwustronną odwrotność rozkładu t-Studenta.",
		abstract: "Zwraca dwustronną odwrotność rozkładu t-Studenta.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/t-inv-2t-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Wymagane. Prawdopodobieństwo skojarzone z rozkładem t-Studenta."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Wymagane. Liczba stopni swobody charakteryzująca rozkład."
			}
		}
	},
	T_TEST: {
		description: "Zwraca prawdopodobieństwo skojarzone z testem t-Studenta. Funkcję T.TEST należy stosować do określenia, czy istnieje prawdopodobieństwo tego, że dwie próbki pochodzą z tych samych podległych populacji, które mają taką samą wartość średnią.",
		abstract: "Zwraca prawdopodobieństwo skojarzone z testem t-Studenta. Funkcję T.TEST należy stosować do określenia, czy istnieje prawdopodobieństwo tego, że dwie próbki pochodzą z tych samych podległych populacji, które mają taką samą wartość średnią.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/t-test-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Wymagane. Pierwszy zbiór danych."
			},
			array2: {
				name: "array2",
				detail: "Wymagane. Drugi zbiór danych."
			},
			tails: {
				name: "tails",
				detail: "Wymagane. Określa liczbę stron rozkładu. Jeśli argument strony = 1, funkcja T.TEST stosuje rozkład jednostronny. Jeśli argument strony = 2, funkcja T.TEST stosuje rozkład dwustronny."
			},
			type: {
				name: "type",
				detail: "Wymagane. Typ testu t, który należy przeprowadzić."
			}
		}
	},
	TREND: {
		description: "Funkcja REGLINW zwraca wartości trendu liniowego. Pasuje do linii prostej (przy użyciu metody najmniejszych kwadratów) do known_y tablicy i known_x. Funkcja REGLINW zwraca wartości y wzdłuż tej linii dla tablicy new_x określonej przez Ciebie.",
		abstract: "Funkcja REGLINW zwraca wartości trendu liniowego. Pasuje do linii prostej (przy użyciu metody najmniejszych kwadratów) do known_y tablicy i known_x. Funkcja REGLINW zwraca wartości y wzdłuż tej linii dla tablicy new_x określonej przez Ciebie.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/trend-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Zestaw znanych już wartości y w relacji y = mx + b Jeśli tablica znane_y znajduje się w pojedynczej kolumnie, to każda kolumna tablicy znane_x jest interpretowana jako oddzielna zmienna. Jeśli tablica znane_y znajduje się w pojedynczym wierszu, to każdy wiersz tablicy znane_x jest interpretowany jako oddzielna zmienna."
			},
			knownXs: {
				name: "known_x's",
				detail: "Opcjonalny zestaw znanych wartości x w relacji y = mx + b Tablica known_x może zawierać jeden lub więcej zestawów zmiennych. Jeśli jest używana tylko jedna zmienna, known_y i known_x mogą być zakresami dowolnego kształtu, o ile mają jednakowe wymiary. Jeśli jest używana więcej niż jedna zmienna, known_y musi być wektorem (czyli zakresem o wysokości jednego wiersza lub szerokości jednej kolumny). Jeżeli argument znane_x jest pominięty, przyjmuje się, że jest on tablicą {1;2;3;...}, która ma ten sam rozmiar co tablica znane_y."
			},
			newXs: {
				name: "new_x's",
				detail: "Nowe wartości x, dla których funkcja REGLINW ma zwracać odpowiednie wartości y New_x musi zawierać kolumnę (lub wiersz) dla każdej zmiennej niezależnej, podobnie jak known_x. Jeśli więc known_y znajduje się w jednej kolumnie, known_x i new_x muszą mieć taką samą liczbę kolumn. Jeśli known_y znajduje się w jednym wierszu, known_x i new_x muszą mieć taką samą liczbę wierszy. Jeżeli argument nowe_ x zostanie pominięty, to przyjmuje się, że jest on taki sam, jak argument znane_x. Jeżeli zarówno argument znane_x, jak i nowe_x zostanie pominięty, to przyjmuje się, że są one tablicą {1;2;3;...} o takiej samej wielkości, co tablica znane_y."
			},
			constb: {
				name: "const",
				detail: "Wartość logiczna określająca, czy stała b ma mieć wartość równą 0 Jeżeli stała ma wartość PRAWDA lub jest pominięta, to stała b jest obliczana normalnie. Jeżeli stała ma wartość FAŁSZ, to stała b jest ustawiana jako równa 0, a wartości m są tak dostosowywane, aby spełniać równanie y = mx."
			}
		}
	},
	TRIMMEAN: {
		description: "Zwraca średnią wewnętrznego zbioru danych. Funkcja ŚREDNIA.WEWN oblicza średnią, wykluczając pewien procent punktów danych z górnego i dolnego krańca zbioru danych. Funkcję tę należy stosować wtedy, gdy analizując dane, trzeba z nich wykluczyć wartości skrajne.",
		abstract: "Zwraca średnią wewnętrznego zbioru danych. Funkcja ŚREDNIA.WEWN oblicza średnią, wykluczając pewien procent punktów danych z górnego i dolnego krańca zbioru danych. Funkcję tę należy stosować wtedy, gdy analizując dane, trzeba z nich wykluczyć wartości skrajne.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/trimmean-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Wymagane. Tablica lub zakres wartości, które należy obciąć i obliczyć dla nich średnią."
			},
			percent: {
				name: "percent",
				detail: "Wymagane. Ułamkowa liczba określająca punkty danych, które powinny być wykluczone z obliczeń. Na przykład, jeśli procent = 0,2, ze zbioru danych zawierających 20 punktów (20 x 0,2) zostaną obcięte 4 punkty: 2 punkty z górnego obszaru i 2 punkty z dolnego obszaru zbioru danych."
			}
		}
	},
	VAR_P: {
		description: "Oblicza wariancję na podstawie całej populacji (pomija wartości logiczne i tekstowe w próbce).",
		abstract: "Oblicza wariancję na podstawie całej populacji (pomija wartości logiczne i tekstowe w próbce).",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/var-p-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Wymagane. Pierwszy argument liczbowy odpowiadający populacji."
			},
			number2: {
				name: "number2",
				detail: "Opcjonalne. Od 2 do 254 argumentów liczbowych odpowiadających populacji."
			}
		}
	},
	VAR_S: {
		description: "Szacuje wariancję na podstawie próbki, ignorując zawarte w niej wartości logiczne i tekst.",
		abstract: "Szacuje wariancję na podstawie próbki, ignorując zawarte w niej wartości logiczne i tekst.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/var-s-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Wymagane. Pierwszy argument liczbowy odpowiadający próbce populacji."
			},
			number2: {
				name: "number2",
				detail: "Opcjonalne. Od 2 do 254 argumentów liczbowych, które odpowiadają próbce populacji."
			}
		}
	},
	VARA: {
		description: "Szacuje wariancję na podstawie próbki.",
		abstract: "Szacuje wariancję na podstawie próbki.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/vara-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Argument wartość1 jest wymagany, pozostałe są opcjonalne. Od 1 do 255 argumentów wartości, które odpowiadają próbce populacji."
			},
			value2: {
				name: "value2",
				detail: "Argument wartość1 jest wymagany, pozostałe są opcjonalne. Od 1 do 255 argumentów wartości, które odpowiadają próbce populacji."
			}
		}
	},
	VARPA: {
		description: "Oblicza wariancję na podstawie całej populacji.",
		abstract: "Oblicza wariancję na podstawie całej populacji.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/varpa-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Argument wartość1 jest wymagany, pozostałe są opcjonalne. Od 1 do 255 argumentów wartości, które odpowiadają populacji."
			},
			value2: {
				name: "value2",
				detail: "Argument wartość1 jest wymagany, pozostałe są opcjonalne. Od 1 do 255 argumentów wartości, które odpowiadają populacji."
			}
		}
	},
	WEIBULL_DIST: {
		description: "Zwraca skumulowaną funkcję (dystrybuantę) rozkładu Weibulla. Rozkład ten znajduje zastosowanie w analizie niezawodności, na przykład przy obliczaniu średniego czasu międzyawaryjnego urządzeń.",
		abstract: "Zwraca skumulowaną funkcję (dystrybuantę) rozkładu Weibulla. Rozkład ten znajduje zastosowanie w analizie niezawodności, na przykład przy obliczaniu średniego czasu międzyawaryjnego urządzeń.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/weibull-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Argument wymagany. Wartość, dla której ta funkcja ma zostać obliczona."
			},
			alpha: {
				name: "alpha",
				detail: "Wymagane. Parametr rozkładu."
			},
			beta: {
				name: "beta",
				detail: "Wymagane. Parametr rozkładu."
			},
			cumulative: {
				name: "cumulative",
				detail: "Wymagane. Wyznacza postać funkcji."
			}
		}
	},
	Z_TEST: {
		description: "Zwraca jednostronną wartość prawdopodobieństwa testu z.",
		abstract: "Zwraca jednostronną wartość prawdopodobieństwa testu z.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/z-test-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Tablica lub zakres danych, względem których ma zostać przetestowana wartość x."
			},
			x: {
				name: "x",
				detail: "Wartość do przetestowania."
			},
			sigma: {
				name: "sigma",
				detail: "Znane odchylenie standardowe populacji. Jeśli je pominięto, używane jest odchylenie standardowe próbki."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/text/pl-PL.ts
const locale$3 = {
	ASC: {
		description: "W językach korzystających z dwubajtowego zestawu znaków (DBCS) funkcja zmienia znaki o pełnej szerokości (dwubajtowe) na znaki o połówkowej szerokości (jednobajtowe).",
		abstract: "W językach korzystających z dwubajtowego zestawu znaków (DBCS) funkcja zmienia znaki o pełnej szerokości (dwubajtowe) na znaki o połówkowej szerokości (jednobajtowe).",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/asc-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Argument wymagany. Tekst lub odwołanie do komórki zawierającej tekst, który ma zostać zmieniony. Jeśli tekst nie zawiera żadnych znaków o pełnej szerokości, nie zostanie zmieniony."
		} }
	},
	ARRAYTOTEXT: {
		description: "Funkcja TABLICA.NA.TEKST pozwala wyświetlić tablicę wartości tekstowych z dowolnego określonego zakresu. Przekazuje wartości tekstowe bez zmian i konwertuje pozostałe wartości na tekst.",
		abstract: "Funkcja TABLICA.NA.TEKST pozwala wyświetlić tablicę wartości tekstowych z dowolnego określonego zakresu. Przekazuje wartości tekstowe bez zmian i konwertuje pozostałe wartości na tekst.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/arraytotext-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Tablica do wyświetlenia jako tekst. Argument wymagany."
			},
			format: {
				name: "format",
				detail: "Format zwracanych danych. Argument opcjonalny. Może to być jedna z dwóch wartości: 0 Domyślne. Zwięzły format, który jest łatwy do odczytania. Zwracany tekst będzie taki sam jak tekst odwzorowany w komórce, w której zastosowano ogólne formatowanie. 1 Format ścisły, który zawiera znaki ucieczki i ograniczniki wierszy. Generuje ciąg, który może zostać przeanalizowany po wprowadzeniu na pasku formuły. Zwracane ciągi umieszcza w cudzysłowie, z wyjątkiem wartości logicznych, liczb i błędów."
			}
		}
	},
	BAHTTEXT: {
		description: "Konwertuje liczbę na tekst w języku tajskim i dodaje sufiks waluty bat.",
		abstract: "Konwertuje liczbę na tekst w języku tajskim i dodaje sufiks waluty bat.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/bahttext-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Argument wymagany. Liczba konwertowana na tekst, odwołanie do komórki zawierającej liczbę lub formuła dająca w wyniku liczbę."
		} }
	},
	CHAR: {
		description: "Zwraca znak określony za pomocą liczby. Funkcja ZNAK służy do translacji liczb strony kodowej, które można uzyskać wśród znaków z plików na innych typach komputerów.",
		abstract: "Zwraca znak określony za pomocą liczby. Funkcja ZNAK służy do translacji liczb strony kodowej, które można uzyskać wśród znaków z plików na innych typach komputerów.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/char-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Argument wymagany. Liczba od 1 do 255 określająca żądany znak. Znak pochodzi z zestawu znaków używanego na danym komputerze. Uwaga Program Excel dla sieci Web obsługuje tylko ZNAKI(9), ZNAK(10), ZNAK(13) i ZNAK(32) i nowsze."
		} }
	},
	CLEAN: {
		description: "Usuwa z tekstu wszystkie znaki, które nie mogą zostać wydrukowane. Funkcji OCZYŚĆ należy używać do tekstów importowanych z innych aplikacji, zawierających znaki, których być może nie da się wydrukować w danym systemie operacyjnym. Na przykład funkcji OCZYŚĆ można użyć do usunięcia niektórych kodów komputerowych niskiego poziomu, których nie da się wydrukować, a nierzadko kończą one i rozpoczynają pliki danych.",
		abstract: "Usuwa z tekstu wszystkie znaki, które nie mogą zostać wydrukowane. Funkcji OCZYŚĆ należy używać do tekstów importowanych z innych aplikacji, zawierających znaki, których być może nie da się wydrukować w danym systemie operacyjnym. Na przykład funkcji OCZYŚĆ można użyć do usunięcia niektórych kodów komputerowych niskiego poziomu, których nie da się wydrukować, a nierzadko kończą one i rozpoczynają pliki danych.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/clean-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Argument wymagany. Dowolne informacje arkusza, z których mają zostać usunięte znaki niedrukowane."
		} }
	},
	CODE: {
		description: "Zwraca wartość kodu liczbowego pierwszego znaku w ciągu tekstowym. Zwracany jest kod stosowny do zestawu znaków używanego na komputerze.",
		abstract: "Zwraca wartość kodu liczbowego pierwszego znaku w ciągu tekstowym. Zwracany jest kod stosowny do zestawu znaków używanego na komputerze.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/code-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Argument wymagany. Tekst, dla którego ma zostać zwrócony kod pierwszego znaku."
		} }
	},
	CONCAT: {
		description: "Funkcja ZŁĄCZ.TEKST łączy tekst z wielu zakresów i(lub ciągów), ale nie udostępnia argumentów ignorowania ani ogranicznika.",
		abstract: "Funkcja ZŁĄCZ.TEKST łączy tekst z wielu zakresów i(lub ciągów), ale nie udostępnia argumentów ignorowania ani ogranicznika.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/concat-function"
		}],
		functionParameter: {
			text1: {
				name: "text1",
				detail: "Element tekstowy do połączenia. Ciąg lub tablica ciągów, na przykład zakres komórek."
			},
			text2: {
				name: "text2",
				detail: "Dodatkowe elementy tekstowe do połączenia. Elementy tekstowe można podać w maksymalnie 253 argumentach tekstowych. Każdy z nich może być ciągiem lub tablicą ciągów, na przykład zakresem komórek."
			}
		}
	},
	CONCATENATE: {
		description: "Funkcja ZŁĄCZ.TEKSTY , jedna z dostępnych funkcji tekstowych , umożliwia połączenie dwóch lub więcej ciągów tekstowych w jeden ciąg.",
		abstract: "Funkcja ZŁĄCZ.TEKSTY , jedna z dostępnych funkcji tekstowych , umożliwia połączenie dwóch lub więcej ciągów tekstowych w jeden ciąg.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/concatenate-function"
		}],
		functionParameter: {
			text1: {
				name: "text1",
				detail: "Pierwszy element do połączenia. Może to być wartość tekstowa, liczba lub odwołanie do komórki."
			},
			text2: {
				name: "text2",
				detail: "Dodatkowe elementy tekstowe do połączenia. Można podać maksymalnie 255 elementów, o łącznej długości do 8192 znaków."
			}
		}
	},
	DBCS: {
		description: "Funkcja opisana w tym temacie Pomocy konwertuje litery o szerokości połówkowej (jednobajtowe) w ciągu znakowym na znaki o pełnej szerokości (dwubajtowe). Nazwa funkcji (i konwertowane znaki) są zależne od ustawień języka.",
		abstract: "Funkcja opisana w tym temacie Pomocy konwertuje litery o szerokości połówkowej (jednobajtowe) w ciągu znakowym na znaki o pełnej szerokości (dwubajtowe). Nazwa funkcji (i konwertowane znaki) są zależne od ustawień języka.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/dbcs-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Argument wymagany. Tekst lub odwołanie do komórki zawierającej tekst, który należy zmienić. Jeśli tekst nie zawiera angielskich liter lub katakany połówkowej szerokości, nie zostanie zmieniony."
		} }
	},
	DOLLAR: {
		description: "Funkcja KWOTA , jedna z funkcji TEKST , konwertuje liczbę na tekst przy użyciu formatu walutowego, a liczba miejsc dziesiętnych jest zaokrąglana do określonej liczby miejsc. Funkcja KWOTA używa wartości $#,#0,00_); Format liczb (###0,00 zł), chociaż zastosowany symbol waluty zależy od ustawień języka lokalnego.",
		abstract: "Funkcja KWOTA , jedna z funkcji TEKST , konwertuje liczbę na tekst przy użyciu formatu walutowego, a liczba miejsc dziesiętnych jest zaokrąglana do określonej liczby miejsc. Funkcja KWOTA używa wartości $#,#0,00_); Format liczb (###0,00 zł), chociaż zastosowany symbol waluty zależy od ustawień języka lokalnego.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/dollar-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Liczba lub odwołanie do komórki zawierającej liczbę albo formułę dającą w wyniku liczbę."
			},
			decimals: {
				name: "decimals",
				detail: "Opcjonalne. Liczba cyfr po prawej stronie separatora dziesiętnego. Jeśli jest to wartość ujemna, liczba jest zaokrąglana w lewo od separatora dziesiętnego. Jeśli argument miejsca_dziesiętne nie zostanie określony, domyślnie przyjmowana jest wartość 2."
			}
		}
	},
	EXACT: {
		description: "Porównuje dwa teksty i zwraca wartość PRAWDA, jeśli są dokładnie takie same; w przeciwnym przypadku zwraca wartość FAŁSZ. Funkcja PORÓWNAJ uwzględnia wielkość liter, ale ignoruje różnice w formatowaniu. Funkcja PORÓWNAJ umożliwia sprawdzanie tekstu wprowadzanego do dokumentu.",
		abstract: "Porównuje dwa teksty i zwraca wartość PRAWDA, jeśli są dokładnie takie same; w przeciwnym przypadku zwraca wartość FAŁSZ. Funkcja PORÓWNAJ uwzględnia wielkość liter, ale ignoruje różnice w formatowaniu. Funkcja PORÓWNAJ umożliwia sprawdzanie tekstu wprowadzanego do dokumentu.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/exact-function"
		}],
		functionParameter: {
			text1: {
				name: "text1",
				detail: "Wymagane. Pierwszy ciąg tekstowy."
			},
			text2: {
				name: "text2",
				detail: "Wymagane. Drugi ciąg tekstowy."
			}
		}
	},
	FIND: {
		description: "Znajduje jedną wartość tekstową w innej (z rozróżnianiem wielkości liter).",
		abstract: "Znajduje jedną wartość tekstową w innej (z rozróżnianiem wielkości liter).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/this-article-has-been-retired"
		}],
		functionParameter: {
			findText: {
				name: "find_text",
				detail: "Tekst, który chcesz znaleźć."
			},
			withinText: {
				name: "within_text",
				detail: "Tekst zawierający tekst, który chcesz znaleźć."
			},
			startNum: {
				name: "start_num",
				detail: "Określa znak, od którego ma się rozpocząć wyszukiwanie. Jeśli pominiesz argument start_num, przyjmowana jest wartość 1."
			}
		}
	},
	FINDB: {
		description: "Znajduje jedną wartość tekstową w innej (z rozróżnianiem wielkości liter).",
		abstract: "Znajduje jedną wartość tekstową w innej (z rozróżnianiem wielkości liter).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/this-article-has-been-retired"
		}],
		functionParameter: {
			findText: {
				name: "find_text",
				detail: "Tekst, który chcesz znaleźć."
			},
			withinText: {
				name: "within_text",
				detail: "Tekst zawierający tekst, który chcesz znaleźć."
			},
			startNum: {
				name: "start_num",
				detail: "Określa znak, od którego ma się rozpocząć wyszukiwanie. Jeśli pominiesz argument start_num, przyjmowana jest wartość 1."
			}
		}
	},
	FIXED: {
		description: "Zaokrągla liczbę do podanej liczby miejsc dziesiętnych, formatuje liczbę do postaci dziesiętnej z użyciem przecinka i spacji, oraz zwraca wynik w postaci tekstowej.",
		abstract: "Zaokrągla liczbę do podanej liczby miejsc dziesiętnych, formatuje liczbę do postaci dziesiętnej z użyciem przecinka i spacji, oraz zwraca wynik w postaci tekstowej.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/fixed-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Argument wymagany. Liczba, która ma zostać zaokrąglona i przekonwertowana na tekst."
			},
			decimals: {
				name: "decimals",
				detail: "Opcjonalne. Liczba cyfr po prawej stronie separatora dziesiętnego."
			},
			noCommas: {
				name: "no_commas",
				detail: "Opcjonalne. Wartość logiczna, która, jeśli ma wartość PRAWDA, zapobiega umieszczaniu przez funkcję ZAOKR.DO.TEKST separatorów tysięcy w zwróconym tekście."
			}
		}
	},
	LEFT: {
		description: "Zwraca skrajnie lewe znaki wartości tekstowej.",
		abstract: "Zwraca skrajnie lewe znaki wartości tekstowej.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/left-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Ciąg tekstowy zawierający znaki, które chcesz wyodrębnić."
			},
			numChars: {
				name: "num_chars",
				detail: "Określa liczbę znaków, które funkcja LEFT ma wyodrębnić."
			}
		}
	},
	LEFTB: {
		description: "Zwraca skrajnie lewe znaki wartości tekstowej.",
		abstract: "Zwraca skrajnie lewe znaki wartości tekstowej.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/left-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Ciąg tekstowy zawierający znaki, które chcesz wyodrębnić."
			},
			numBytes: {
				name: "num_bytes",
				detail: "Określa liczbę bajtów, które funkcja LEFTB ma wyodrębnić."
			}
		}
	},
	LEN: {
		description: "Zwraca liczbę znaków w ciągu tekstowym.",
		abstract: "Zwraca liczbę znaków w ciągu tekstowym.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/len-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Tekst, którego długość chcesz znaleźć. Spacje są liczone jako znaki."
		} }
	},
	LENB: {
		description: "Zwraca liczbę bajtów użytych do reprezentowania znaków w ciągu tekstowym.",
		abstract: "Zwraca liczbę bajtów użytych do reprezentowania znaków w ciągu tekstowym.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/len-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Tekst, którego długość chcesz znaleźć. Spacje są liczone jako znaki."
		} }
	},
	LOWER: {
		description: "Konwertuje wszystkie duże litery w ciągu tekstowym na małe.",
		abstract: "Konwertuje wszystkie duże litery w ciągu tekstowym na małe.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/lower-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Argument wymagany. Tekst, który należy przekonwertować na małe litery. Funkcja LITERY.MAŁE nie zmienia tych znaków w tekście, które nie są literami."
		} }
	},
	MID: {
		description: "Zwraca określoną liczbę znaków z ciągu tekstowego, zaczynając od wskazanej pozycji.",
		abstract: "Zwraca określoną liczbę znaków z ciągu tekstowego, zaczynając od wskazanej pozycji.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/mid-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Ciąg tekstowy zawierający znaki, które chcesz wyodrębnić."
			},
			startNum: {
				name: "start_num",
				detail: "Pozycja pierwszego znaku, który chcesz wyodrębnić z tekstu."
			},
			numChars: {
				name: "num_chars",
				detail: "Określa liczbę znaków, które funkcja MID ma wyodrębnić."
			}
		}
	},
	MIDB: {
		description: "Zwraca określoną liczbę znaków z ciągu tekstowego, zaczynając od wskazanej pozycji.",
		abstract: "Zwraca określoną liczbę znaków z ciągu tekstowego, zaczynając od wskazanej pozycji.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/mid-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Ciąg tekstowy zawierający znaki, które chcesz wyodrębnić."
			},
			startNum: {
				name: "start_num",
				detail: "Pozycja pierwszego znaku, który chcesz wyodrębnić z tekstu."
			},
			numBytes: {
				name: "num_bytes",
				detail: "Określa liczbę bajtów, które funkcja MIDB ma wyodrębnić."
			}
		}
	},
	NUMBERSTRING: {
		description: "Konwertuje liczby na chińskie ciągi tekstowe.",
		abstract: "Konwertuje liczby na chińskie ciągi tekstowe.",
		links: [{
			title: "Instruction",
			url: "https://www.wps.cn/learning/course/detail/id/340.html?chan=pc_kdocs_function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Wartość konwertowana na chiński ciąg tekstowy."
			},
			type: {
				name: "type",
				detail: "Typ zwracanego wyniku. \n1. Chińskie małe litery \n2. Chińskie wielkie litery \n3. Odczytywanie i zapisywanie chińskich znaków"
			}
		}
	},
	NUMBERVALUE: {
		description: "Konwertuje tekst na liczbę w sposób niezależny od ustawień regionalnych.",
		abstract: "Konwertuje tekst na liczbę w sposób niezależny od ustawień regionalnych.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/numbervalue-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Argument wymagany. Tekst, który ma zostać przekonwertowany na liczbę."
			},
			decimalSeparator: {
				name: "decimal_separator",
				detail: "Opcjonalne. Znak używany do oddzielenia części całkowitej i ułamkowej wyniku."
			},
			groupSeparator: {
				name: "group_separator",
				detail: "Opcjonalne. Znak używany do oddzielenia grup liczb, na przykład tysięcy od setek oraz milionów od tysięcy."
			}
		}
	},
	PHONETIC: {
		description: "Wybiera znaki fonetyczne (furigana) z ciągu tekstowego.",
		abstract: "Wybiera znaki fonetyczne (furigana) z ciągu tekstowego.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/phonetic-function"
		}],
		functionParameter: { reference: {
			name: "Odwołanie",
			detail: "Wymagane. Ciąg tekstowy lub odwołanie do pojedynczej komórki albo do zakresu komórek, które zawierają ciąg tekstowy furigana."
		} }
	},
	PROPER: {
		description: "Zmienia w wielką literę pierwszą małą literę tekstu i wszystkie inne litery w tekście następujące po znaku innym niż litera. Wszystkie inne litery są konwertowane na małe litery.",
		abstract: "Zmienia w wielką literę pierwszą małą literę tekstu i wszystkie inne litery w tekście następujące po znaku innym niż litera. Wszystkie inne litery są konwertowane na małe litery.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/proper-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Argument wymagany. Tekst ujęty w cudzysłów, formuła, której wynikiem jest tekst, lub odwołanie do komórki zawierającej tekst do częściowego przekształcenia w tekst pisany wielkimi literami."
		} }
	},
	REGEXEXTRACT: {
		description: "Wyodrębnia pierwszy pasujący podciąg zgodnie z wyrażeniem regularnym.",
		abstract: "Wyodrębnia pierwszy pasujący podciąg zgodnie z wyrażeniem regularnym.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3098244?hl=pl"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Tekst wejściowy."
			},
			regularExpression: {
				name: "regular_expression",
				detail: "Zwracana jest pierwsza część tekstu pasująca do tego wyrażenia."
			}
		}
	},
	REGEXMATCH: {
		description: "Sprawdza, czy fragment tekstu pasuje do wyrażenia regularnego.",
		abstract: "Sprawdza, czy fragment tekstu pasuje do wyrażenia regularnego.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3098292?hl=pl"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Tekst, który ma zostać sprawdzony względem wyrażenia regularnego."
			},
			regularExpression: {
				name: "regular_expression",
				detail: "Wyrażenie regularne używane do sprawdzenia tekstu."
			}
		}
	},
	REGEXREPLACE: {
		description: "Zastępuje część ciągu tekstowego innym ciągiem tekstowym przy użyciu wyrażeń regularnych.",
		abstract: "Zastępuje część ciągu tekstowego innym ciągiem tekstowym przy użyciu wyrażeń regularnych.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3098245?hl=pl"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Tekst, którego część zostanie zastąpiona."
			},
			regularExpression: {
				name: "regular_expression",
				detail: "Wyrażenie regularne. Wszystkie pasujące wystąpienia w tekście zostaną zastąpione."
			},
			replacement: {
				name: "replacement",
				detail: "Tekst, który zostanie wstawiony do tekstu oryginalnego."
			}
		}
	},
	REPLACE: {
		description: "Zastępuje znaki w tekście.",
		abstract: "Zastępuje znaki w tekście.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/replace-function"
		}],
		functionParameter: {
			oldText: {
				name: "old_text",
				detail: "Tekst, w którym chcesz zastąpić znaki."
			},
			startNum: {
				name: "start_num",
				detail: "Pozycja znaku w old_text, który chcesz zastąpić tekstem new_text."
			},
			numChars: {
				name: "num_chars",
				detail: "Liczba znaków w old_text, które funkcja REPLACE ma zastąpić tekstem new_text."
			},
			newText: {
				name: "new_text",
				detail: "Tekst, który zastąpi znaki w old_text."
			}
		}
	},
	REPLACEB: {
		description: "Zastępuje znaki w tekście.",
		abstract: "Zastępuje znaki w tekście.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/replace-function"
		}],
		functionParameter: {
			oldText: {
				name: "old_text",
				detail: "Tekst, w którym chcesz zastąpić znaki."
			},
			startNum: {
				name: "start_num",
				detail: "Pozycja znaku w old_text, który chcesz zastąpić tekstem new_text."
			},
			numBytes: {
				name: "num_bytes",
				detail: "Liczba bajtów w old_text, które funkcja REPLACEB ma zastąpić tekstem new_text."
			},
			newText: {
				name: "new_text",
				detail: "Tekst, który zastąpi znaki w old_text."
			}
		}
	},
	REPT: {
		description: "Wykonuje określoną liczbę powtórzeń tekstu. Użyj funkcji POWT, aby wypełnić komórkę konkretną liczbą ciągów tekstowych.",
		abstract: "Wykonuje określoną liczbę powtórzeń tekstu. Użyj funkcji POWT, aby wypełnić komórkę konkretną liczbą ciągów tekstowych.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/rept-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Argument wymagany. Tekst, który ma być powtarzany."
			},
			numberTimes: {
				name: "number_times",
				detail: "Wymagane. Liczba dodatnia określająca liczbę powtórzeń tekstu."
			}
		}
	},
	RIGHT: {
		description: "Zwraca skrajnie prawe znaki wartości tekstowej.",
		abstract: "Zwraca skrajnie prawe znaki wartości tekstowej.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/right-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Ciąg tekstowy zawierający znaki, które chcesz wyodrębnić."
			},
			numChars: {
				name: "num_chars",
				detail: "Określa liczbę znaków, które funkcja RIGHT ma wyodrębnić."
			}
		}
	},
	RIGHTB: {
		description: "Zwraca skrajnie prawe znaki wartości tekstowej.",
		abstract: "Zwraca skrajnie prawe znaki wartości tekstowej.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/right-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Ciąg tekstowy zawierający znaki, które chcesz wyodrębnić."
			},
			numBytes: {
				name: "num_bytes",
				detail: "Określa liczbę bajtów, które funkcja RIGHTB ma wyodrębnić."
			}
		}
	},
	SEARCH: {
		description: "Znajduje jedną wartość tekstową w innej (bez rozróżniania wielkości liter).",
		abstract: "Znajduje jedną wartość tekstową w innej (bez rozróżniania wielkości liter).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/search-function"
		}],
		functionParameter: {
			findText: {
				name: "find_text",
				detail: "Tekst, który chcesz znaleźć."
			},
			withinText: {
				name: "within_text",
				detail: "Tekst zawierający tekst, który chcesz znaleźć."
			},
			startNum: {
				name: "start_num",
				detail: "Określa znak, od którego ma się rozpocząć wyszukiwanie. Jeśli pominiesz argument start_num, przyjmowana jest wartość 1."
			}
		}
	},
	SEARCHB: {
		description: "Znajduje jedną wartość tekstową w innej (bez rozróżniania wielkości liter).",
		abstract: "Znajduje jedną wartość tekstową w innej (bez rozróżniania wielkości liter).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/search-function"
		}],
		functionParameter: {
			findText: {
				name: "find_text",
				detail: "Tekst, który chcesz znaleźć."
			},
			withinText: {
				name: "within_text",
				detail: "Tekst zawierający tekst, który chcesz znaleźć."
			},
			startNum: {
				name: "start_num",
				detail: "Określa znak, od którego ma się rozpocząć wyszukiwanie. Jeśli pominiesz argument start_num, przyjmowana jest wartość 1."
			}
		}
	},
	SUBSTITUTE: {
		description: "Podstawia w ciągu tekstowym w miejsce argumentu stary_tekst argument nowy_tekst. Funkcji PODSTAW należy używać wtedy, gdy trzeba zamienić określony tekst pojawiający się w ciągu tekstowym na inny tekst; funkcji ZASTĄP należy natomiast używać wtedy, gdy trzeba zamienić dowolny tekst pojawiający się w określonym miejscu ciągu tekstowego.",
		abstract: "Podstawia w ciągu tekstowym w miejsce argumentu stary_tekst argument nowy_tekst. Funkcji PODSTAW należy używać wtedy, gdy trzeba zamienić określony tekst pojawiający się w ciągu tekstowym na inny tekst; funkcji ZASTĄP należy natomiast używać wtedy, gdy trzeba zamienić dowolny tekst pojawiający się w określonym miejscu ciągu tekstowego.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/substitute-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Argument wymagany. Tekst lub odwołanie do komórki zawierającej tekst, w którym zostaną zastąpione znaki."
			},
			oldText: {
				name: "old_text",
				detail: "Wymagane. Tekst, który zostanie zastąpiony."
			},
			newText: {
				name: "new_text",
				detail: "Wymagane. Tekst, którym zostanie zastąpiony tekst określony przez argument stary_tekst."
			},
			instanceNum: {
				name: "instance_num",
				detail: "Opcjonalne. Określa, które wystąpienie argumentu stary_tekst zostanie zastąpione przez argument nowy_tekst. Jeśli argument wystąpienie_liczba jest podany, to tylko to konkretne wystąpienie argumentu stary_tekst zostanie zastąpione. W innym przypadku każde pojawienie się w tekście argumentu stary_tekst jest zamieniane na argument nowy_tekst."
			}
		}
	},
	T: {
		description: "Zwraca tekst, do którego odnosi się wartość.",
		abstract: "Zwraca tekst, do którego odnosi się wartość.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/t-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Wymagane. Wartość, którą należy przetestować."
		} }
	},
	TEXT: {
		description: "Funkcja TEKST umożliwia zmianę sposobu wyświetlania liczby przez zastosowanie do niej formatowania za pomocą kodów formatów . Jest to przydatne w sytuacjach, w których chcesz wyświetlić liczby w bardziej czytelnym formacie lub połączyć liczby z tekstem lub symbolami.",
		abstract: "Funkcja TEKST umożliwia zmianę sposobu wyświetlania liczby przez zastosowanie do niej formatowania za pomocą kodów formatów . Jest to przydatne w sytuacjach, w których chcesz wyświetlić liczby w bardziej czytelnym formacie lub połączyć liczby z tekstem lub symbolami.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/text-function"
		}],
		functionParameter: {
			value: {
				name: "value",
				detail: "Wartość liczbowa, którą chcesz przekonwertować na tekst."
			},
			formatText: {
				name: "format_text",
				detail: "Ciąg tekstowy określający formatowanie, które ma zostać zastosowane do podanej wartości."
			}
		}
	},
	TEXTAFTER: {
		description: "Zwraca tekst występujący po danym znaku lub ciągu. Jest to przeciwieństwo funkcji TEKST.PRZED.",
		abstract: "Zwraca tekst występujący po danym znaku lub ciągu. Jest to przeciwieństwo funkcji TEKST.PRZED.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/textafter-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Tekst, w którym odbywa się wyszukiwanie. Znaki wieloznaczne nie są dozwolone."
			},
			delimiter: {
				name: "delimiter",
				detail: "Tekst oznaczający punkt, po którym chcesz wyodrębnić tekst."
			},
			instanceNum: {
				name: "instance_num",
				detail: "Wystąpienie ogranicznika, po którym chcesz wyodrębnić tekst."
			},
			matchMode: {
				name: "match_mode",
				detail: "Określa, czy przy wyszukiwaniu tekstu jest rozróżniana wielkość liter. Domyślnie jest rozróżniana."
			},
			matchEnd: {
				name: "match_end",
				detail: "Traktuje koniec tekstu jako ogranicznik. Domyślnie tekst musi być dokładnie dopasowany."
			},
			ifNotFound: {
				name: "if_not_found",
				detail: "Wartość zwracana, jeśli nie znaleziono dopasowania. Domyślnie zwracany jest błąd #N/A."
			}
		}
	},
	TEXTBEFORE: {
		description: "Zwraca tekst występujący przed danym znakiem lub ciągiem. Jest to przeciwieństwo funkcji TEKST.PO .",
		abstract: "Zwraca tekst występujący przed danym znakiem lub ciągiem. Jest to przeciwieństwo funkcji TEKST.PO .",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/textbefore-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Tekst, w którym odbywa się wyszukiwanie. Znaki wieloznaczne nie są dozwolone."
			},
			delimiter: {
				name: "delimiter",
				detail: "Tekst oznaczający punkt, przed którym chcesz wyodrębnić tekst."
			},
			instanceNum: {
				name: "instance_num",
				detail: "Wystąpienie ogranicznika, przed którym chcesz wyodrębnić tekst."
			},
			matchMode: {
				name: "match_mode",
				detail: "Określa, czy przy wyszukiwaniu tekstu jest rozróżniana wielkość liter. Domyślnie jest rozróżniana."
			},
			matchEnd: {
				name: "match_end",
				detail: "Traktuje koniec tekstu jako ogranicznik. Domyślnie tekst musi być dokładnie dopasowany."
			},
			ifNotFound: {
				name: "if_not_found",
				detail: "Wartość zwracana, jeśli nie znaleziono dopasowania. Domyślnie zwracany jest błąd #N/A."
			}
		}
	},
	TEXTJOIN: {
		description: "Funkcja POŁĄCZ.TEKSTY łączy tekst z wielu zakresów i (lub) ciągów oraz uwzględnia określany ogranicznik między poszczególnymi wartościami tekstowymi do połączenia. Jeśli ogranicznik jest pustym ciągiem tekstowym, funkcja sklei zakresy.",
		abstract: "Funkcja POŁĄCZ.TEKSTY łączy tekst z wielu zakresów i (lub) ciągów oraz uwzględnia określany ogranicznik między poszczególnymi wartościami tekstowymi do połączenia. Jeśli ogranicznik jest pustym ciągiem tekstowym, funkcja sklei zakresy.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/textjoin-function"
		}],
		functionParameter: {
			delimiter: {
				name: "delimiter",
				detail: "Ciąg tekstowy, pusty lub zawierający co najmniej jeden znak w cudzysłowach podwójnych, albo odwołanie do prawidłowego ciągu tekstowego. W razie podania liczby będzie ona traktowana jak tekst."
			},
			ignoreEmpty: {
				name: "ignore_empty",
				detail: "Jeśli ten argument ma wartość PRAWDA, komórki puste są ignorowane."
			},
			text1: {
				name: "text1",
				detail: "Element tekstowy do połączenia. Ciąg tekstowy lub tablica ciągów, na przykład zakres komórek."
			},
			text2: {
				name: "text2",
				detail: "Dodatkowe elementy tekstowe do połączenia. Elementy tekstowe można podać w maksymalnie 252 argumentach tekstowych, z argumentem tekst1 włącznie. Każdy z nich może być ciągiem tekstowym lub tablicą ciągów, na przykład zakresem komórek."
			}
		}
	},
	TEXTSPLIT: {
		description: "Funkcja PODZIEL.TEKST działa tak samo jak Kreator Tekst na kolumny , ale w formie formuły. Umożliwia dzielenie między kolumny lub w dół według wierszy. Jest to przeciwieństwo funkcji TEXTJOIN .",
		abstract: "Funkcja PODZIEL.TEKST działa tak samo jak Kreator Tekst na kolumny , ale w formie formuły. Umożliwia dzielenie między kolumny lub w dół według wierszy. Jest to przeciwieństwo funkcji TEXTJOIN .",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pl-pl/excel/functions/textsplit-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Tekst, który chcesz podzielić. Argument wymagany."
			},
			colDelimiter: {
				name: "col_delimiter",
				detail: "Tekst oznaczający punkt rozlania tekstu między kolumny."
			},
			rowDelimiter: {
				name: "row_delimiter",
				detail: "Tekst oznaczający punkt rozlania tekstu w dół wierszy. Argument opcjonalny."
			},
			ignoreEmpty: {
				name: "ignore_empty",
				detail: "Określ wartość PRAWDA, aby zignorować następujące po sobie ograniczniki. Wartość domyślna to PRAWDA, co powoduje utworzenie pustej komórki. Argument opcjonalny."
			},
			matchMode: {
				name: "match_mode",
				detail: "Określ 1, aby dopasować bez uwzględniania wielkości liter. Wartość domyślna to 0, co powoduje dopasowanie z uwzględnieniem wielkości liter. Argument opcjonalny."
			},
			padWith: {
				name: "pad_with",
				detail: "Wartość, której wyniki mają zostać wypełnione. Wartość domyślna to #N/D."
			}
		}
	},
	TRIM: {
		description: "Usuwa wszystkie spacje z tekstu, oprócz pojedynczych spacji występujących między słowami. Funkcję USUŃ.ZBĘDNE.ODSTĘPY należy stosować w przypadku tekstu uzyskanego z innej aplikacji, w którym mogą występować nieregularne spacje.",
		abstract: "Usuwa wszystkie spacje z tekstu, oprócz pojedynczych spacji występujących między słowami. Funkcję USUŃ.ZBĘDNE.ODSTĘPY należy stosować w przypadku tekstu uzyskanego z innej aplikacji, w którym mogą występować nieregularne spacje.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/trim-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Tekst, z którego chcesz usunąć spacje. Tekst musi być zawarty w cudzysłowie."
		} }
	},
	UNICHAR: {
		description: "Zwraca znak Unicode, do którego odwołuje się określona wartość liczbowa.",
		abstract: "Zwraca znak Unicode, do którego odwołuje się określona wartość liczbowa.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/unichar-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Argument wymagany. Numer znaku Unicode odpowiadający określonemu znakowi."
		} }
	},
	UNICODE: {
		description: "Zwraca numer (kod znaku) odpowiadający pierwszemu znakowi tekstu.",
		abstract: "Zwraca numer (kod znaku) odpowiadający pierwszemu znakowi tekstu.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/unicode-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Argument wymagany. Tekst jest znakiem, dla którego ma zostać zwrócona wartość Unicode."
		} }
	},
	UPPER: {
		description: "Konwertuje małe litery na wielkie litery.",
		abstract: "Konwertuje małe litery na wielkie litery.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/upper-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Argument wymagany. Tekst, który należy przekonwertować na wielkie litery. Tekst może być odwołaniem lub ciągiem tekstowym."
		} }
	},
	VALUE: {
		description: "Konwertuje ciąg tekstowy reprezentujący liczbę na liczbę.",
		abstract: "Konwertuje ciąg tekstowy reprezentujący liczbę na liczbę.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/value-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Argument wymagany. Tekst zamknięty znakami cudzysłowu lub odwołanie do komórki zawierającej tekst, który należy przekonwertować."
		} }
	},
	VALUETOTEXT: {
		description: "Funkcja WARTOŚĆ.NA.TEKST zwraca tekst z dowolnej określonej wartości. Przekazuje wartości tekstowe bez zmian i konwertuje pozostałe wartości na tekst.",
		abstract: "Funkcja WARTOŚĆ.NA.TEKST zwraca tekst z dowolnej określonej wartości. Przekazuje wartości tekstowe bez zmian i konwertuje pozostałe wartości na tekst.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/valuetotext-function"
		}],
		functionParameter: {
			value: {
				name: "value",
				detail: "Wartość do wyświetlenia jako tekst. Argument wymagany."
			},
			format: {
				name: "format",
				detail: "Format zwracanych danych. Argument opcjonalny. Może to być jedna z dwóch wartości: 0 Domyślne. Zwięzły format, który jest łatwy do odczytania. Zwracany tekst będzie taki sam jak tekst odwzorowany w komórce, w której zastosowano ogólne formatowanie. 1 Format ścisły, który zawiera znaki ucieczki i ograniczniki wierszy. Generuje ciąg, który może zostać przeanalizowany po wprowadzeniu na pasku formuły. Zwracane ciągi umieszcza w cudzysłowie, z wyjątkiem wartości logicznych, liczb i błędów."
			}
		}
	},
	CALL: {
		description: "Wywołuje procedurę w bibliotece linków dynamicznych lub w zasobie kodów. Istnieją dwie formy składni tej funkcji. Używaj składni 1 tylko w przypadku wcześniej zarejestrowanego zasobu kodów, w którym są używane argumenty z funkcji REJESTRUJ. Aby jednocześnie zarejestrować i zadzwonić do zasobu kodów, użyj składni 2a lub 2b.",
		abstract: "Wywołuje procedurę w bibliotece linków dynamicznych lub w zasobie kodów. Istnieją dwie formy składni tej funkcji. Używaj składni 1 tylko w przypadku wcześniej zarejestrowanego zasobu kodów, w którym są używane argumenty z funkcji REJESTRUJ. Aby jednocześnie zarejestrować i zadzwonić do zasobu kodów, użyj składni 2a lub 2b.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/call-function"
		}],
		functionParameter: {
			moduleText: {
				name: "Module_text",
				detail: "Wymagane. Tekst umieszczony w cudzysłowie, określający nazwę biblioteki dołączanej dynamicznie (DLL) zawierającej procedurę w programie Microsoft Excel dla Windows."
			},
			procedure: {
				name: "Procedura",
				detail: "Wymagane. Tekst określający nazwę funkcji w bibliotece DLL w programie Microsoft Excel dla Windows. Można także używać wartości porządkowej funkcji otrzymanej z instrukcji EXPORTS w pliku definicji modułów (DEF). Wartość porządkowa nie może występować w postaci tekstu."
			},
			typeText: {
				name: "Typ_tekst",
				detail: "Wymagane. Tekst określający typ danych zwróconej wartości oraz typy danych wszystkich argumentów do biblioteki DLL lub zasobu kodów. Pierwsza litera argumentu typ_tekst określa zwróconą wartość. Kody używane dla argumentu typ_tekst opisano szczegółowo w temacie Korzystanie z funkcji WYWOŁAJ i REJESTRUJ . Argument ten można pominąć w przypadku autonomicznych bibliotek DLL oraz zasobów kodów (XLL)."
			},
			argument1: {
				name: "Argument1,...",
				detail: "Opcjonalne. Argumenty przekazywane do procedury."
			}
		}
	},
	EUROCONVERT: {
		description: "Konwertuje liczbę na euro, daną wartość w euro na wartość w walucie kraju członkowskiego euro lub wartość w walucie jednego kraju członkowskiego na wartość w walucie innego kraju członkowskiego za pomocą euro jako waluty pośredniej (triangulacja). Waluty dostępne dla konwersji to waluty krajów należących do Unii Europejskiej, które przyjęły euro. Funkcja stosuje podczas konwersji kursy walut ustanowione przez Unię Europejską.",
		abstract: "Konwertuje liczbę na euro, daną wartość w euro na wartość w walucie kraju członkowskiego euro lub wartość w walucie jednego kraju członkowskiego na wartość w walucie innego kraju członkowskiego za pomocą euro jako waluty pośredniej (triangulacja). Waluty dostępne dla konwersji to waluty krajów należących do Unii Europejskiej, które przyjęły euro. Funkcja stosuje podczas konwersji kursy walut ustanowione przez Unię Europejską.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/euroconvert-function"
		}],
		functionParameter: {
			number: {
				name: "Liczba",
				detail: "Argument wymagany. Wartość walutowa, która ma zostać przekonwertowana, lub odwołanie do komórki zawierającej taką wartość."
			},
			source: {
				name: "Źródła",
				detail: "Wymagane. Trzyliterowy ciąg lub odwołanie do komórki zawierającej ten ciąg, odpowiadające kodowi ISO waluty źródłowej. W funkcji EUROCONVERT dostępne są następujące kody walut:"
			},
			target: {
				name: "Docelowego",
				detail: "Wymagane. Trzyliterowy ciąg lub odwołanie do komórki odpowiadające kodowi ISO waluty, na którą ma zostać przekonwertowana liczba. Zobacz poprzednią tabelę źródłową kodów ISO."
			},
			fullPrecision: {
				name: "Full_precision",
				detail: "Wymagane. Wartość logiczna (PRAWDA lub FAŁSZ) albo wyrażenie zwracające wartość PRAWDA lub FAŁSZ określające sposób wyświetlania wyniku."
			},
			triangulationPrecision: {
				name: "Triangulation_precision",
				detail: "Wymagane. Liczba całkowita równa 3 lub większa niż 3, która określa liczbę cyfr znaczących używanych dla pośredniej wartości euro podczas konwersji między dwiema walutami krajów członkowskich euro. Jeśli ten argument zostanie pominięty, program Excel nie zaokrągli pośredniej wartości euro. Jeśli argument zostanie podany podczas konwersji z waluty kraju członkowskiego na euro, program Excel obliczy pośrednią wartość euro, która może być następnie przekonwertowana na walutę innego kraju członkowskiego euro."
			}
		}
	},
	REGISTER_ID: {
		description: "Zwraca identyfikator rejestru określonej biblioteki dołączanej dynamicznie (DLL) lub wcześniej zarejestrowanego zasobu kodów. Jeśli biblioteka DLL lub zasób kodów nie zostały zarejestrowane, funkcja rejestruje bibliotekę DLL lub zasób kodów, a następnie zwraca identyfikator rejestru.",
		abstract: "Zwraca identyfikator rejestru określonej biblioteki dołączanej dynamicznie (DLL) lub wcześniej zarejestrowanego zasobu kodów. Jeśli biblioteka DLL lub zasób kodów nie zostały zarejestrowane, funkcja rejestruje bibliotekę DLL lub zasób kodów, a następnie zwraca identyfikator rejestru.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/register-id-function"
		}],
		functionParameter: {
			moduleText: {
				name: "Module_text",
				detail: "Wymagane. Tekst określający nazwę biblioteki DLL zawierającej funkcje w programie Microsoft Excel dla Windows."
			},
			procedure: {
				name: "Procedura",
				detail: "Wymagane. Tekst określający nazwę funkcji w bibliotece DLL w programie Microsoft Excel dla Windows. Można także używać wartości porządkowej funkcji uzyskanej za pomocą instrukcji EXPORTS w pliku definicji modułów (DEF). Wartość porządkowa lub identyfikator zasobu nie mogą występować w postaci tekstu."
			},
			typeText: {
				name: "Typ_tekst",
				detail: "Opcjonalne. Tekst określający typ danych wartości zwróconej oraz typy danych wszystkich argumentów biblioteki DLL. Pierwsza litera argumentu typ_tekst określa wartość zwróconą. Jeśli funkcja lub zasób kodów są już zarejestrowane, ten argument można pominąć."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/univer/pl-PL.ts
const locale$2 = {};

//#endregion
//#region src/locale/function-list/web/pl-PL.ts
const locale$1 = {
	ENCODEURL: {
		description: "Funkcja ENCODEURL zwraca ciąg zakodowany w adresie URL, zastępując niektóre znaki niealfanumeryczne symbolem procentu (%) i liczbą szesnastkową.",
		abstract: "Funkcja ENCODEURL zwraca ciąg zakodowany w adresie URL, zastępując niektóre znaki niealfanumeryczne symbolem procentu (%) i liczbą szesnastkową.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/encodeurl-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Ciąg, który ma zostać zakodowany w adresie URL"
		} }
	},
	FILTERXML: {
		description: "Funkcja FILTERXML zwraca określone dane z zawartości XML przy użyciu określonego ciągu xpath.",
		abstract: "Funkcja FILTERXML zwraca określone dane z zawartości XML przy użyciu określonego ciągu xpath.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/filterxml-function"
		}],
		functionParameter: {
			xml: {
				name: "xml",
				detail: "Ciąg w prawidłowym formacie XML."
			},
			xpath: {
				name: "xpath",
				detail: "Ciąg w standardowym formacie XPath."
			}
		}
	},
	WEBSERVICE: {
		description: "Funkcja WEBSERVICE zwraca dane z usługi sieci Web w Internecie lub intranecie.",
		abstract: "Funkcja WEBSERVICE zwraca dane z usługi sieci Web w Internecie lub intranecie.",
		links: [{
			title: "Instrukcje",
			url: "https://support.microsoft.com/pl-pl/excel/functions/webservice-function"
		}],
		functionParameter: { url: {
			name: "url",
			detail: "Adres URL usługi sieci Web."
		} }
	}
};

//#endregion
//#region src/locale/pl-PL.ts
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