//#region src/locale/function-list/array/de-DE.ts
const locale$15 = {
	ARRAY_CONSTRAIN: {
		description: "Beschränkt ein Array-Ergebnis auf eine angegebene Größe.",
		abstract: "Beschränkt ein Array-Ergebnis auf eine angegebene Größe.",
		links: [{
			title: "Anleitung",
			url: "https://support.google.com/docs/answer/3267036?hl=de"
		}],
		functionParameter: {
			inputRange: {
				name: "Eingabebereich",
				detail: "Der zu beschränkende Bereich."
			},
			numRows: {
				name: "Zeilenanzahl",
				detail: "Die Anzahl der Zeilen, die das Ergebnis enthalten soll."
			},
			numCols: {
				name: "Spaltenanzahl",
				detail: "Die Anzahl der Spalten, die das Ergebnis enthalten soll."
			}
		}
	},
	FLATTEN: {
		description: "Fasst alle Werte aus einem oder mehreren Bereichen in einer einzigen Spalte zusammen.",
		abstract: "Fasst alle Werte aus einem oder mehreren Bereichen in einer einzigen Spalte zusammen.",
		links: [{
			title: "Anleitung",
			url: "https://support.google.com/docs/answer/10307761?hl=de"
		}],
		functionParameter: {
			range1: {
				name: "Bereich1",
				detail: "Der erste zusammenzufassende Bereich."
			},
			range2: {
				name: "Bereich2",
				detail: "[optional, wiederholbar] Weitere zusammenzufassende Bereiche."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/compatibility/de-DE.ts
const locale$14 = {
	BETADIST: {
		description: "Gibt die kumulierte Beta-Wahrscheinlichkeitsdichtefunktion zurück. Die Betaverteilung wird i. d. R. verwendet, um die Streuung bei mehreren Stichproben zu bestimmten Vorgängen zu untersuchen. Beispielsweise kann prozentual ermittelt werden, wie viel Zeit am Tag Personen vor dem Fernsehgerät verbringen.",
		abstract: "Gibt die kumulierte Beta-Wahrscheinlichkeitsdichtefunktion zurück. Die Betaverteilung wird i. d. R. verwendet, um die Streuung bei mehreren Stichproben zu bestimmten Vorgängen zu untersuchen. Beispielsweise kann prozentual ermittelt werden, wie viel Zeit am Tag Personen vor dem Fernsehgerät verbringen.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/betadist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Erforderlich. Der Wert, an dem die Funktion im Intervall zwischen A und B ausgewertet werden soll."
			},
			alpha: {
				name: "alpha",
				detail: "Erforderlich. Ein Parameter der Verteilung."
			},
			beta: {
				name: "beta",
				detail: "Erforderlich. Ein Parameter der Verteilung."
			},
			A: {
				name: "A",
				detail: "Eine untere Grenze des Intervalls für X."
			},
			B: {
				name: "B",
				detail: "Optional. Eine obere Grenze des Intervalls für X."
			}
		}
	},
	BETAINV: {
		description: "Gibt die Quantile der Verteilungsfunktion einer betaverteilten Zufallsvariablen zurück. Das bedeutet, wenn Wahrscheinlichkeit = BETAVERT(x;...) ist, dann ist BETAINV(Wahrsch;...) = x. Die Betaverteilung kann für eine Projektplanung verwendet werden, um ausgehend von einem erwarteten Endtermin und der Streuung den wahrscheinlichen Endtermin zu modellieren.",
		abstract: "Gibt die Quantile der Verteilungsfunktion einer betaverteilten Zufallsvariablen zurück. Das bedeutet, wenn Wahrscheinlichkeit = BETAVERT(x;...) ist, dann ist BETAINV(Wahrsch;...) = x. Die Betaverteilung kann für eine Projektplanung verwendet werden, um ausgehend von einem erwarteten Endtermin und der Streuung den wahrscheinlichen Endtermin zu modellieren.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/betainv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Erforderlich. Die zur Betaverteilung gehörende Wahrscheinlichkeit."
			},
			alpha: {
				name: "alpha",
				detail: "Erforderlich. Ein Parameter der Verteilung."
			},
			beta: {
				name: "beta",
				detail: "Erforderlich. Ein Parameter der Verteilung."
			},
			A: {
				name: "A",
				detail: "Eine untere Grenze des Intervalls für X."
			},
			B: {
				name: "B",
				detail: "Optional. Eine obere Grenze des Intervalls für X."
			}
		}
	},
	BINOMDIST: {
		description: "Gibt Wahrscheinlichkeiten einer binomialverteilten Zufallsvariablen zurück. Verwenden Sie BINOMVERT bei Problemen mit einer festgelegten Anzahl von Tests oder Versuchen, wenn das Ergebnis jedes einzelnen Versuchs entweder Erfolg oder Misserfolg ist, die einzelnen Versuche voneinander unabhängig sind und die Wahrscheinlichkeit des Erfolgs für alle Versuche konstant ist. Mit BINOMVERT lässt sich beispielsweise die Wahrscheinlichkeit ermitteln, mit der zwei von drei Neugeborenen männlich sind.",
		abstract: "Gibt Wahrscheinlichkeiten einer binomialverteilten Zufallsvariablen zurück. Verwenden Sie BINOMVERT bei Problemen mit einer festgelegten Anzahl von Tests oder Versuchen, wenn das Ergebnis jedes einzelnen Versuchs entweder Erfolg oder Misserfolg ist, die einzelnen Versuche voneinander unabhängig sind und die Wahrscheinlichkeit des Erfolgs für alle Versuche konstant ist. Mit BINOMVERT lässt sich beispielsweise die Wahrscheinlichkeit ermitteln, mit der zwei von drei Neugeborenen männlich sind.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/binomdist-function"
		}],
		functionParameter: {
			numberS: {
				name: "number_s",
				detail: "Erforderlich. Die Anzahl der Erfolge in einer Versuchsreihe."
			},
			trials: {
				name: "trials",
				detail: "Erforderlich. Die Anzahl der voneinander unabhängigen Versuche."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Erforderlich. Die Wahrscheinlichkeit eines Erfolgs für jeden Versuch."
			},
			cumulative: {
				name: "cumulative",
				detail: "Erforderlich. Ein logischer Wert, der die Form der Funktion bestimmt. Wenn kumulativ TRUE ist, gibt BINOMDIST die kumulierte Verteilungsfunktion zurück. Dies ist die Wahrscheinlichkeit, dass es höchstens number_s Erfolge gibt; False gibt die Wahrscheinlichkeits-Massenfunktion zurück, d. h. die Wahrscheinlichkeit, dass es number_s Erfolge gibt."
			}
		}
	},
	CHIDIST: {
		description: "Gibt Werte der rechtsseitigen Verteilungsfunktion (1-Alpha) einer Chi-Quadrat-verteilten Zufallsgröße zurück. Die χ2-Verteilung wird bei einem χ2-Test benötigt. Mit dem χ2-Test lassen sich beobachtete und erwartete Werte miteinander vergleichen. So wird beispielsweise in einem genetischen Experiment die Hypothese aufgestellt, dass die nächste Pflanzengeneration eine bestimmte Farbzusammensetzung aufweist. Durch Vergleich der beobachteten mit den erwarteten Ergebnissen lässt sich die Hypothese validieren.",
		abstract: "Gibt Werte der rechtsseitigen Verteilungsfunktion (1-Alpha) einer Chi-Quadrat-verteilten Zufallsgröße zurück. Die χ2-Verteilung wird bei einem χ2-Test benötigt. Mit dem χ2-Test lassen sich beobachtete und erwartete Werte miteinander vergleichen. So wird beispielsweise in einem genetischen Experiment die Hypothese aufgestellt, dass die nächste Pflanzengeneration eine bestimmte Farbzusammensetzung aufweist. Durch Vergleich der beobachteten mit den erwarteten Ergebnissen lässt sich die Hypothese validieren.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/chidist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Erforderlich. Der Wert, dessen Wahrscheinlichkeit berechnet werden soll."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Erforderlich. Die Anzahl der Freiheitsgrade."
			}
		}
	},
	CHIINV: {
		description: "Gibt Perzentile der rechtsseitigen Chi-Quadrat-Verteilung zurück. Ist Wahrsch = CHIVERT(x;...) gegeben, dann gilt CHIINV(Wahrsch;...) = x. Mithilfe dieser Funktion lassen sich zum Zweck der Validierung von Hypothesen beobachtete und erwartete Ergebnisse miteinander vergleichen.",
		abstract: "Gibt Perzentile der rechtsseitigen Chi-Quadrat-Verteilung zurück. Ist Wahrsch = CHIVERT(x;...) gegeben, dann gilt CHIINV(Wahrsch;...) = x. Mithilfe dieser Funktion lassen sich zum Zweck der Validierung von Hypothesen beobachtete und erwartete Ergebnisse miteinander vergleichen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/chiinv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Erforderlich. Die zur Chi-Quadrat-Verteilung gehörende Wahrscheinlichkeit."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Erforderlich. Die Anzahl der Freiheitsgrade."
			}
		}
	},
	CHITEST: {
		description: "Liefert die Teststatistik eines Unabhängigkeitstests. CHITEST gibt den Wert der chi-quadrierten (χ2)-Verteilung für die Teststatistik mit den entsprechenden Freiheitsgraden zurück. Mithilfe von χ2-Tests können Sie feststellen, ob in Experimenten die Ergebnisse bestätigt werden, die aufgrund von Hypothesen erwartet wurden.",
		abstract: "Liefert die Teststatistik eines Unabhängigkeitstests. CHITEST gibt den Wert der chi-quadrierten (χ2)-Verteilung für die Teststatistik mit den entsprechenden Freiheitsgraden zurück. Mithilfe von χ2-Tests können Sie feststellen, ob in Experimenten die Ergebnisse bestätigt werden, die aufgrund von Hypothesen erwartet wurden.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/chitest-function"
		}],
		functionParameter: {
			actualRange: {
				name: "actual_range",
				detail: "Erforderlich. Der Bereich beobachteter Daten, mit dem Sie die erwarteten Werte testen möchten."
			},
			expectedRange: {
				name: "expected_range",
				detail: "Erforderlich. Der Bereich erwarteter Beobachtungen, die sich aus der Division der miteinander multiplizierten Rangsummen und der Gesamtsumme berechnen lassen."
			}
		}
	},
	CONFIDENCE: {
		description: "Ermöglicht die Berechnung des 1-Alpha Konfidenzintervalls für den Erwartungswert einer Zufallsvariablen und verwendet dazu die Normalverteilung.",
		abstract: "Ermöglicht die Berechnung des 1-Alpha Konfidenzintervalls für den Erwartungswert einer Zufallsvariablen und verwendet dazu die Normalverteilung.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/confidence-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "Erforderlich. Die Irrtumswahrscheinlichkeit bei der Berechnung des Konfidenzintervalls. Das Konfidenzintervall ist gleich 100*(1 - Alpha)%, was bedeutet, dass ein Wert für Alpha von 0,05 einem Konfidenzniveau von 95% entspricht."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Erforderlich. Die als bekannt angenommene Standardabweichung der Grundgesamtheit."
			},
			size: {
				name: "size",
				detail: "Erforderlich. Der Umfang der Stichprobe."
			}
		}
	},
	COVAR: {
		description: "Gibt kovarianz zurück, den Durchschnitt der Produkte von Abweichungen für jedes Datenpunktpaar in zwei Datasets.",
		abstract: "Gibt kovarianz zurück, den Durchschnitt der Produkte von Abweichungen für jedes Datenpunktpaar in zwei Datasets.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/covar-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Erforderlich. Der erste Zellbereich, dessen Zellen mit ganzen Zahlen belegt sind."
			},
			array2: {
				name: "array2",
				detail: "Erforderlich. Der zweite Zellbereich, dessen Zellen mit ganzen Zahlen belegt sind."
			}
		}
	},
	CRITBINOM: {
		description: "Gibt den kleinsten Wert zurück, für den die kumulierten Wahrscheinlichkeiten der Binomialverteilung größer oder gleich einer Grenzwahrscheinlichkeit sind. Mit dieser Funktion können Sie Aufgaben erledigen, die im Bereich Qualitätssicherung anfallen. Mithilfe der KRITBINOM-Funktion lässt sich beispielsweise ermitteln, wie viele defekte Teile höchstens an einem Fließband Ausschuss sein dürfen, ohne dass das gesamte Fertigungslos zurückgewiesen werden muss.",
		abstract: "Gibt den kleinsten Wert zurück, für den die kumulierten Wahrscheinlichkeiten der Binomialverteilung größer oder gleich einer Grenzwahrscheinlichkeit sind. Mit dieser Funktion können Sie Aufgaben erledigen, die im Bereich Qualitätssicherung anfallen. Mithilfe der KRITBINOM-Funktion lässt sich beispielsweise ermitteln, wie viele defekte Teile höchstens an einem Fließband Ausschuss sein dürfen, ohne dass das gesamte Fertigungslos zurückgewiesen werden muss.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/critbinom-function"
		}],
		functionParameter: {
			trials: {
				name: "trials",
				detail: "Erforderlich. Die Anzahl der Bernoulliexperimente."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Erforderlich. Die Wahrscheinlichkeit eines Erfolgs für jeden Versuch."
			},
			alpha: {
				name: "alpha",
				detail: "Erforderlich. Die Grenzwahrscheinlichkeit."
			}
		}
	},
	EXPONDIST: {
		description: "Gibt Wahrscheinlichkeiten einer exponential verteilten Zufallsvariablen zurück. Mithilfe der EXPONVERT-Funktion lassen sich Zeiträume zwischen Ereignissen modellieren, z. B. wie lange ein Geldautomat für die Ausgabe von Geld benötigt. Beispielsweise können Sie mit EXPONVERT berechnen, wie wahrscheinlich es ist, dass dieser Vorgang eine Minute dauert.",
		abstract: "Gibt Wahrscheinlichkeiten einer exponential verteilten Zufallsvariablen zurück. Mithilfe der EXPONVERT-Funktion lassen sich Zeiträume zwischen Ereignissen modellieren, z. B. wie lange ein Geldautomat für die Ausgabe von Geld benötigt. Beispielsweise können Sie mit EXPONVERT berechnen, wie wahrscheinlich es ist, dass dieser Vorgang eine Minute dauert.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/expondist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Erforderlich. Der Wert für die Funktion"
			},
			lambda: {
				name: "lambda",
				detail: "Erforderlich. Der übergebene Wert"
			},
			cumulative: {
				name: "cumulative",
				detail: "Erforderlich. Ein logischer Wert, der angibt, welche Form der exponentiellen Funktion bereitgestellt werden soll. Wenn kumulativ TRUE ist, gibt EXPONDIST die kumulierte Verteilungsfunktion zurück. Wenn FALSE, wird die Wahrscheinlichkeitsdichtefunktion zurückgegeben."
			}
		}
	},
	FDIST: {
		description: "Gibt Werte der Verteilungsfunktion (1-Alpha) einer (rechtsseitigen) F-verteilten Zufallsvariablen zurück. Mit dieser Funktion können Sie feststellen, ob zwei Datenmengen unterschiedlichen Streuungen unterliegen. Beispielsweise können Sie die Punktzahlen untersuchen, die Männer und Frauen bei einem Einstellungstest erzielt haben, und ermitteln, ob sich die für die Frauen gefundene Streuung von derjenigen der Männer unterscheidet.",
		abstract: "Gibt Werte der Verteilungsfunktion (1-Alpha) einer (rechtsseitigen) F-verteilten Zufallsvariablen zurück. Mit dieser Funktion können Sie feststellen, ob zwei Datenmengen unterschiedlichen Streuungen unterliegen. Beispielsweise können Sie die Punktzahlen untersuchen, die Männer und Frauen bei einem Einstellungstest erzielt haben, und ermitteln, ob sich die für die Frauen gefundene Streuung von derjenigen der Männer unterscheidet.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/fdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Erforderlich. Der Wert, für den die Funktion ausgewertet werden soll"
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Erforderlich. Die Anzahl der Freiheitsgrade im Zähler"
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Erforderlich. Die Anzahl der Freiheitsgrade im Nenner"
			}
		}
	},
	FINV: {
		description: "Gibt Quantile der (rechtsseitigen) F-Verteilung zurück. Ist p = FVERT(x;...), dann ist FINV(p;...) = x.",
		abstract: "Gibt Quantile der (rechtsseitigen) F-Verteilung zurück. Ist p = FVERT(x;...), dann ist FINV(p;...) = x.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/finv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Erforderlich. Die zur F-Verteilung gehörige Wahrscheinlichkeit"
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Erforderlich. Die Anzahl der Freiheitsgrade im Zähler"
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Erforderlich. Die Anzahl der Freiheitsgrade im Nenner"
			}
		}
	},
	FTEST: {
		description: "Gibt das Ergebnis eines F-Tests zurück. Ein F-Test gibt die zweiseitige Wahrscheinlichkeit zurück, dass sich die Varianzen in Array1 und Array2 nicht signifikant unterscheiden. Verwenden Sie diese Funktion, um zu bestimmen, ob zwei Stichproben unterschiedliche Varianzen aufweisen. Mit Testergebnissen von öffentlichen und privaten Schulen können Sie beispielsweise testen, ob diese Schulen unterschiedliche Stufen der Testbewertungsvielfalt aufweisen.",
		abstract: "Gibt das Ergebnis eines F-Tests zurück. Ein F-Test gibt die zweiseitige Wahrscheinlichkeit zurück, dass sich die Varianzen in Array1 und Array2 nicht signifikant unterscheiden. Verwenden Sie diese Funktion, um zu bestimmen, ob zwei Stichproben unterschiedliche Varianzen aufweisen. Mit Testergebnissen von öffentlichen und privaten Schulen können Sie beispielsweise testen, ob diese Schulen unterschiedliche Stufen der Testbewertungsvielfalt aufweisen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/ftest-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Erforderlich. Die erste Matrix oder der erste Wertebereich."
			},
			array2: {
				name: "array2",
				detail: "Erforderlich. Die zweite Matrix oder der zweite Wertebereich."
			}
		}
	},
	GAMMADIST: {
		description: "Gibt Wahrscheinlichkeiten einer gammaverteilten Zufallsvariablen zurück. Mit dieser Funktion können Sie Variablen untersuchen, die eine schiefe Verteilung besitzen. Die Gammaverteilung wird häufig bei Warteschlangenanalysen verwendet.",
		abstract: "Gibt Wahrscheinlichkeiten einer gammaverteilten Zufallsvariablen zurück. Mit dieser Funktion können Sie Variablen untersuchen, die eine schiefe Verteilung besitzen. Die Gammaverteilung wird häufig bei Warteschlangenanalysen verwendet.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/gammadist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Erforderlich. Der Wert, dessen Wahrscheinlichkeit berechnet werden soll."
			},
			alpha: {
				name: "alpha",
				detail: "Erforderlich. Ein Parameter der Verteilung"
			},
			beta: {
				name: "beta",
				detail: "Erforderlich. Ein Parameter der Verteilung. Wenn Beta = 1, gibt GAMMAVERT die Standard-Gammaverteilung zurück."
			},
			cumulative: {
				name: "cumulative",
				detail: "Erforderlich. Ein logischer Wert, der die Form der Funktion bestimmt. Wenn kumuliert TRUE ist, gibt GAMMADIST die kumulierte Verteilungsfunktion zurück. Wenn FALSE, wird die Wahrscheinlichkeitsdichtefunktion zurückgegeben."
			}
		}
	},
	GAMMAINV: {
		description: "Gibt Quantile der Gammaverteilung zurück. Gilt p = GAMMAVERT(x;...), dann gilt GAMMAINV(p;...) = x. Mit dieser Funktion können Sie eine Variable untersuchen, deren Verteilung eventuell schief ist.",
		abstract: "Gibt Quantile der Gammaverteilung zurück. Gilt p = GAMMAVERT(x;...), dann gilt GAMMAINV(p;...) = x. Mit dieser Funktion können Sie eine Variable untersuchen, deren Verteilung eventuell schief ist.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/gammainv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Erforderlich. Die zur Gammaverteilung gehörige Wahrscheinlichkeit"
			},
			alpha: {
				name: "alpha",
				detail: "Erforderlich. Ein Parameter der Verteilung"
			},
			beta: {
				name: "beta",
				detail: "Erforderlich. Ein Parameter der Verteilung. Wenn Beta = 1, gibt GAMMAINV die Standard-Gammaverteilung zurück."
			}
		}
	},
	HYPGEOMDIST: {
		description: "Gibt die hypergeometrische Verteilung zurück. HYPGEOMDIST gibt die Wahrscheinlichkeit einer bestimmten Anzahl von Stichprobenerfolgen in Anbetracht der Stichprobengröße, der Populationserfolge und der Populationsgröße zurück. Verwenden Sie HYPGEOMDIST für Probleme mit einer endlichen Grundgesamtheit, bei der jede Beobachtung entweder ein Erfolg oder ein Fehler ist und bei denen jede Teilmenge einer bestimmten Größe mit gleicher Wahrscheinlichkeit ausgewählt wird.",
		abstract: "Gibt die hypergeometrische Verteilung zurück. HYPGEOMDIST gibt die Wahrscheinlichkeit einer bestimmten Anzahl von Stichprobenerfolgen in Anbetracht der Stichprobengröße, der Populationserfolge und der Populationsgröße zurück. Verwenden Sie HYPGEOMDIST für Probleme mit einer endlichen Grundgesamtheit, bei der jede Beobachtung entweder ein Erfolg oder ein Fehler ist und bei denen jede Teilmenge einer bestimmten Größe mit gleicher Wahrscheinlichkeit ausgewählt wird.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/hypgeomdist-function"
		}],
		functionParameter: {
			sampleS: {
				name: "sample_s",
				detail: "Erforderlich. Die Anzahl der in der Stichprobe erzielten Erfolge"
			},
			numberSample: {
				name: "number_sample",
				detail: "Erforderlich. Der Umfang (Größe) der Stichprobe"
			},
			populationS: {
				name: "population_s",
				detail: "Erforderlich. Die Anzahl der in der Grundgesamtheit möglichen Erfolge"
			},
			numberPop: {
				name: "number_pop",
				detail: "Erforderlich. Der Umfang (Größe) der Grundgesamtheit"
			}
		}
	},
	LOGINV: {
		description: "Gibt die Umkehrung der lognormalen kumulativen Verteilungsfunktion von x zurück, wobei ln(x) normalerweise mit den Parametern Mean und standard_dev verteilt wird. Wenn p = LOGNORMDIST(x,...) dann LOGINV(p,...) = x.",
		abstract: "Gibt die Umkehrung der lognormalen kumulativen Verteilungsfunktion von x zurück, wobei ln(x) normalerweise mit den Parametern Mean und standard_dev verteilt wird. Wenn p = LOGNORMDIST(x,...) dann LOGINV(p,...) = x.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/loginv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Erforderlich. Die zur Lognormalverteilung gehörige Wahrscheinlichkeit"
			},
			mean: {
				name: "mean",
				detail: "Erforderlich. Der Mittelwert der Lognormalverteilung"
			},
			standardDev: {
				name: "standard_dev",
				detail: "Erforderlich. Die Standardabweichung der Lognormalverteilung"
			}
		}
	},
	LOGNORMDIST: {
		description: "Gibt Werte der Verteilungsfunktion einer lognormalverteilten Zufallsvariablen zurück, wobei ln(x) mit den Parametern Mittelwert und Standabwn normalverteilt ist. Mit dieser Funktion können Sie Daten untersuchen, die logarithmisch transformiert wurden.",
		abstract: "Gibt Werte der Verteilungsfunktion einer lognormalverteilten Zufallsvariablen zurück, wobei ln(x) mit den Parametern Mittelwert und Standabwn normalverteilt ist. Mit dieser Funktion können Sie Daten untersuchen, die logarithmisch transformiert wurden.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/lognormdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Erforderlich. Der Wert, für den die Funktion ausgewertet werden soll"
			},
			mean: {
				name: "mean",
				detail: "Erforderlich. Der Mittelwert der Lognormalverteilung"
			},
			standardDev: {
				name: "standard_dev",
				detail: "Erforderlich. Die Standardabweichung der Lognormalverteilung"
			}
		}
	},
	MODE: {
		description: "Angenommen, Sie möchten die häufigste Anzahl von Vogelarten herausfinden, die in einer Stichprobe von Vogelzählungen in einem kritischen Feuchtgebiet über einen Zeitraum von 30 Jahren gesichtet wurden, oder Sie möchten die am häufigsten auftretende Anzahl von Telefonanrufen in einem Telefonsupportcenter außerhalb der Spitzenzeiten herausfinden. Verwenden Sie die MODE-Funktion , um den Modus einer Zahlengruppe zu berechnen.",
		abstract: "Angenommen, Sie möchten die häufigste Anzahl von Vogelarten herausfinden, die in einer Stichprobe von Vogelzählungen in einem kritischen Feuchtgebiet über einen Zeitraum von 30 Jahren gesichtet wurden, oder Sie möchten die am häufigsten auftretende Anzahl von Telefonanrufen in einem Telefonsupportcenter außerhalb der Spitzenzeiten herausfinden. Verwenden Sie die MODE-Funktion , um den Modus einer Zahlengruppe zu berechnen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/mode-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Erforderlich. Das erste numerische Argument, für das der Modalwert (Modus) berechnet werden soll"
			},
			number2: {
				name: "number2",
				detail: "Optional. 2 bis 255 numerische Argumente, für die Sie den Modalwert (Modus) berechnen möchten. An Stelle der durch Semikolons getrennten Argumente können Sie auch eine Matrix oder einen Bezug auf eine Matrix verwenden."
			}
		}
	},
	NEGBINOMDIST: {
		description: "Gibt Wahrscheinlichkeiten einer negativbinomialverteilten Zufallsvariablen zurück. NEGBINOMVERT berechnet, wie wahrscheinlich es ist, dass es genau Zahl_Mißerfolge gibt bevor der letzte positive Ausgang (Zahl_Erfolge) gezogen wird, wenn Erfolgswahrsch die gleichbleibende Wahrscheinlichkeit eines Erfolges angibt. Die Vorgehensweise dieser Funktion unterscheidet sich von der Binomialverteilung nur dadurch, dass die Anzahl der Erfolge feststeht und die Anzahl der Versuche variabel ist. Analog zu einer Binomialverteilung wird vorausgesetzt, dass die jeweiligen Versuche voneinander unabhängig sind.",
		abstract: "Gibt Wahrscheinlichkeiten einer negativbinomialverteilten Zufallsvariablen zurück. NEGBINOMVERT berechnet, wie wahrscheinlich es ist, dass es genau Zahl_Mißerfolge gibt bevor der letzte positive Ausgang (Zahl_Erfolge) gezogen wird, wenn Erfolgswahrsch die gleichbleibende Wahrscheinlichkeit eines Erfolges angibt. Die Vorgehensweise dieser Funktion unterscheidet sich von der Binomialverteilung nur dadurch, dass die Anzahl der Erfolge feststeht und die Anzahl der Versuche variabel ist. Analog zu einer Binomialverteilung wird vorausgesetzt, dass die jeweiligen Versuche voneinander unabhängig sind.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/negbinomdist-function"
		}],
		functionParameter: {
			numberF: {
				name: "number_f",
				detail: "Erforderlich. Die Zahl der ungünstigen Ereignisse"
			},
			numberS: {
				name: "number_s",
				detail: "Erforderlich. Die Zahl der günstigen Ereignisse"
			},
			probabilityS: {
				name: "probability_s",
				detail: "Erforderlich. Die Wahrscheinlichkeit für den günstigen Ausgang des Experiments"
			}
		}
	},
	NORMDIST: {
		description: "Die NORMDIST-Funktion gibt die Normalverteilung für den angegebenen Mittelwert und die angegebene Standardabweichung zurück. Diese Funktion verfügt über eine Vielzahl von Anwendungen in der Statistik, einschließlich Hypothesentests.",
		abstract: "Die NORMDIST-Funktion gibt die Normalverteilung für den angegebenen Mittelwert und die angegebene Standardabweichung zurück. Diese Funktion verfügt über eine Vielzahl von Anwendungen in der Statistik, einschließlich Hypothesentests.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/normdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Erforderlich. Der Wert, dessen Verteilung Sie verwenden möchten."
			},
			mean: {
				name: "mean",
				detail: "Erforderlich. Das arithmetische Mittel der Verteilung"
			},
			standardDev: {
				name: "standard_dev",
				detail: "Erforderlich. Die Standardabweichung der Verteilung"
			},
			cumulative: {
				name: "cumulative",
				detail: "Erforderlich. Ein logischer Wert, der die Form der Funktion bestimmt. Wenn kumulativ TRUE ist, gibt NORMDIST die kumulierte Verteilungsfunktion zurück. Wenn kumulativ FALSE ist, wird die Wahrscheinlichkeits-Massenfunktion zurückgegeben."
			}
		}
	},
	NORMINV: {
		description: "Gibt Perzentile der Normalverteilung für den angegebenen Mittelwert und die angegebene Standardabweichung zurück.",
		abstract: "Gibt Perzentile der Normalverteilung für den angegebenen Mittelwert und die angegebene Standardabweichung zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/norminv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Erforderlich. Die zur Standardnormalverteilung gehörige Wahrscheinlichkeit"
			},
			mean: {
				name: "mean",
				detail: "Erforderlich. Das arithmetische Mittel der Verteilung"
			},
			standardDev: {
				name: "standard_dev",
				detail: "Erforderlich. Die Standardabweichung der Verteilung"
			}
		}
	},
	NORMSDIST: {
		description: "Gibt Werte der Verteilungsfunktion einer standardnormalverteilten Zufallsvariablen zurück. Die Standardnormalverteilung hat einen Mittelwert von 0 und eine Standardabweichung von 1. Sie können diese Funktion an Stelle einer Tabelle verwenden, in der Werte der Verteilungsfunktion der Standardnormalverteilung zusammengestellt sind.",
		abstract: "Gibt Werte der Verteilungsfunktion einer standardnormalverteilten Zufallsvariablen zurück. Die Standardnormalverteilung hat einen Mittelwert von 0 und eine Standardabweichung von 1. Sie können diese Funktion an Stelle einer Tabelle verwenden, in der Werte der Verteilungsfunktion der Standardnormalverteilung zusammengestellt sind.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/normsdist-function"
		}],
		functionParameter: { z: {
			name: "z",
			detail: "Erforderlich. Der Wert, dessen Wahrscheinlichkeit Sie berechnen möchten"
		} }
	},
	NORMSINV: {
		description: "Gibt Quantile der Standardnormalverteilung zurück. Die Standardnormalverteilung hat einen Mittelwert von 0 und eine Standardabweichung von 1.",
		abstract: "Gibt Quantile der Standardnormalverteilung zurück. Die Standardnormalverteilung hat einen Mittelwert von 0 und eine Standardabweichung von 1.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/normsinv-function"
		}],
		functionParameter: { probability: {
			name: "probability",
			detail: "Erforderlich. Die zur Standardnormalverteilung gehörige Wahrscheinlichkeit"
		} }
	},
	PERCENTILE: {
		description: "Gibt das Alpha-Quantil einer Gruppe von Daten zurück. Mithilfe dieser Funktion können Sie einen Akzeptanzschwellenwert festlegen. So könnten Sie beispielsweise entscheiden, dass nur Kandidaten untersucht werden, deren Prüfungsergebnisse oberhalb des 90 %-Quantils liegen.",
		abstract: "Gibt das Alpha-Quantil einer Gruppe von Daten zurück. Mithilfe dieser Funktion können Sie einen Akzeptanzschwellenwert festlegen. So könnten Sie beispielsweise entscheiden, dass nur Kandidaten untersucht werden, deren Prüfungsergebnisse oberhalb des 90 %-Quantils liegen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/percentile-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Erforderlich. Ein Array oder ein Datenbereich, das/der die relative Lage der Daten beschreibt"
			},
			k: {
				name: "k",
				detail: "Erforderlich. Der Quantilwert aus dem geschlossenen Intervall von 0 bis 1."
			}
		}
	},
	PERCENTRANK: {
		description: "Die PERCENTRANK-Funktion gibt den Rang eines Werts in einem Dataset als Prozentsatz des Datasets zurück– im Wesentlichen die relative Position eines Werts innerhalb des gesamten Datasets. Sie können beispielsweise PERCENTRANK verwenden, um den Stand der Testbewertung einer Person im Feld aller Bewertungen für denselben Test zu bestimmen.",
		abstract: "Die PERCENTRANK-Funktion gibt den Rang eines Werts in einem Dataset als Prozentsatz des Datasets zurück– im Wesentlichen die relative Position eines Werts innerhalb des gesamten Datasets. Sie können beispielsweise PERCENTRANK verwenden, um den Stand der Testbewertung einer Person im Feld aller Bewertungen für denselben Test zu bestimmen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/percentrank-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Erforderlich. Der Datenbereich (oder ein vordefiniertes Array) numerischer Werte, in dem der Prozentwert bestimmt wird."
			},
			x: {
				name: "x",
				detail: "Erforderlich. Der Wert, für den Sie den Rang innerhalb des Arrays kennen möchten."
			},
			significance: {
				name: "significance",
				detail: "Optional. Ein Wert, der die Anzahl der Nachkommastellen des zurückgegebenen Quantilsrangs festlegt. Fehlt dieses Argument, verwendet QUANTILSRANG drei Dezimalstellen (0,xxx)."
			}
		}
	},
	POISSON: {
		description: "Gibt Wahrscheinlichkeiten einer poissonverteilten Zufallsvariablen zurück. Eine übliche Anwendung der Poissonverteilung ist die Modellierung der Anzahl der Ereignisse innerhalb eines bestimmten Zeitraumes, beispielsweise die Anzahl der Bankkunden, die innerhalb einer Stunde an einem Geldautomaten eintreffen.",
		abstract: "Gibt Wahrscheinlichkeiten einer poissonverteilten Zufallsvariablen zurück. Eine übliche Anwendung der Poissonverteilung ist die Modellierung der Anzahl der Ereignisse innerhalb eines bestimmten Zeitraumes, beispielsweise die Anzahl der Bankkunden, die innerhalb einer Stunde an einem Geldautomaten eintreffen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/poisson-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Erforderlich. Die Zahl der Fälle"
			},
			mean: {
				name: "mean",
				detail: "Erforderlich. Der erwartete Zahlenwert"
			},
			cumulative: {
				name: "cumulative",
				detail: "Erforderlich. Ein logischer Wert, der die Form der zurückgegebenen Wahrscheinlichkeitsverteilung bestimmt. Wenn kumulativ TRUE ist, gibt POISSON die kumulative Poisson-Wahrscheinlichkeit zurück, dass die Anzahl der zufälligen Ereignisse zwischen null und x einschließlich liegt; False gibt die Poisson-Wahrscheinlichkeits-Massenfunktion zurück, dass die Anzahl der ereignisse genau x ist."
			}
		}
	},
	QUARTILE: {
		description: "Gibt die Quartile der Datengruppe zurück. Quartile werden häufig bei Verkaufs- oder Umfragedaten verwendet, um die Grundgesamtheiten in Gruppen einzuteilen. Beispielsweise können Sie mit QUARTILE für eine Stichprobe erhobener Einkommen den Wert ermitteln, ab dessen Höhe ein Einkommen zu den oberen 25 Prozent der Einkommen gehört.",
		abstract: "Gibt die Quartile der Datengruppe zurück. Quartile werden häufig bei Verkaufs- oder Umfragedaten verwendet, um die Grundgesamtheiten in Gruppen einzuteilen. Beispielsweise können Sie mit QUARTILE für eine Stichprobe erhobener Einkommen den Wert ermitteln, ab dessen Höhe ein Einkommen zu den oberen 25 Prozent der Einkommen gehört.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/quartile-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Erforderlich. Ein Array oder ein Zellbereich numerischer Werte, deren Quartile Sie bestimmen möchten"
			},
			quart: {
				name: "quart",
				detail: "Erforderlich. Gibt an, welcher Wert ausgegeben werden soll"
			}
		}
	},
	RANK: {
		description: "Gibt den Rang zurück, den eine Zahl innerhalb einer Liste von Zahlen einnimmt. Als Rang einer Zahl wird deren Größe, bezogen auf die anderen Werte der jeweiligen Liste, bezeichnet. (Wenn Sie die Liste sortieren würden, würde die Rangzahl der Zahl deren Position angeben.)",
		abstract: "Gibt den Rang zurück, den eine Zahl innerhalb einer Liste von Zahlen einnimmt. Als Rang einer Zahl wird deren Größe, bezogen auf die anderen Werte der jeweiligen Liste, bezeichnet. (Wenn Sie die Liste sortieren würden, würde die Rangzahl der Zahl deren Position angeben.)",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/rank-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Die Zahl, für die der Rang ermittelt werden soll"
			},
			ref: {
				name: "ref",
				detail: "Erforderlich. Ein Verweis auf eine Liste von Zahlen. Nicht numerische Werte im Bezug werden ignoriert."
			},
			order: {
				name: "order",
				detail: "Optional. Eine Zahl, die angibt, wie der Rang von \"Zahl\" bestimmt werden soll Ist Reihenfolge mit 0 (Null) belegt oder nicht angegeben, bestimmt Microsoft Excel den Rang von Zahl so, als wäre Bezug eine in absteigender Reihenfolge sortierte Liste. Ist Reihenfolge mit einem Wert ungleich 0 belegt, bestimmt Microsoft Excel den Rang von Zahl so, als wäre Bezug eine in aufsteigender Reihenfolge sortierte Liste."
			}
		}
	},
	STDEV: {
		description: "Schätzt die Standardabweichung ausgehend von einer Stichprobe. Die Standardabweichung ist ein Maß dafür, wie weit die jeweiligen Werte um den Mittelwert (Durchschnitt) streuen.",
		abstract: "Schätzt die Standardabweichung ausgehend von einer Stichprobe. Die Standardabweichung ist ein Maß dafür, wie weit die jeweiligen Werte um den Mittelwert (Durchschnitt) streuen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/stdev-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Erforderlich. Das erste numerische Argument, das einer Stichprobe einer Grundgesamtheit entspricht."
			},
			number2: {
				name: "number2",
				detail: "Optional. 2 bis 255 numerische Argumente, die einer Stichprobe einer Grundgesamtheit entsprechen. Anstelle der durch Semikolons voneinander getrennten Argumente können Sie auch eine Matrix oder einen Bezug auf eine Matrix angeben."
			}
		}
	},
	STDEVP: {
		description: "Berechnet die Standardabweichung basierend auf der gesamten Grundgesamtheit, die als Argumente angegeben wird. Die Standardabweichung ist ein Maß für die Streuung von Werten bezüglich ihres Mittelwerts (dem Durchschnitt).",
		abstract: "Berechnet die Standardabweichung basierend auf der gesamten Grundgesamtheit, die als Argumente angegeben wird. Die Standardabweichung ist ein Maß für die Streuung von Werten bezüglich ihres Mittelwerts (dem Durchschnitt).",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/stdevp-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Erforderlich. Das erste numerische Argument, das einer Grundgesamtheit entspricht"
			},
			number2: {
				name: "number2",
				detail: "Optional. 1 bis 255 numerische Argumente, die einer Grundgesamtheit entsprechen. Anstelle der durch Semikolons voneinander getrennten Argumente können Sie auch eine Matrix oder einen Bezug auf eine Matrix angeben."
			}
		}
	},
	TDIST: {
		description: "Gibt Werte der Verteilungsfunktion (1-Alpha) einer (Student) t-verteilten Zufallsvariable zurück. Die t-Verteilung wird für das Testen von Hypothesen bei kleinem Stichprobenumfang verwendet. Sie können diese Funktion an Stelle einer Wertetabelle mit den kritischen Werten der t-Verteilung heranziehen.",
		abstract: "Gibt Werte der Verteilungsfunktion (1-Alpha) einer (Student) t-verteilten Zufallsvariable zurück. Die t-Verteilung wird für das Testen von Hypothesen bei kleinem Stichprobenumfang verwendet. Sie können diese Funktion an Stelle einer Wertetabelle mit den kritischen Werten der t-Verteilung heranziehen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/tdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Erforderlich. Der numerische Wert, für den die Verteilung ausgewertet werden soll"
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Erforderlich. Eine ganze Zahl, mit der die Anzahl der Freiheitsgrade angegeben wird"
			},
			tails: {
				name: "tails",
				detail: "Erforderlich. Gibt die Anzahl der zurückzugebenden Verteilungsfragmente an. Wenn Tails = 1 ist, gibt TDIST die einseitige Verteilung zurück. Wenn Tails = 2 ist, gibt TDIST die zweiseitige Verteilung zurück."
			}
		}
	},
	TINV: {
		description: "Gibt zweiseitige Quantile der (Student) t-Verteilung zurück.",
		abstract: "Gibt zweiseitige Quantile der (Student) t-Verteilung zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/tinv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Erforderlich. Die zur t-Verteilung gehörige Wahrscheinlichkeit (zweiseitig)"
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Erforderlich. Die Anzahl der Freiheitsgrade, durch die die Verteilung bestimmt ist"
			}
		}
	},
	TTEST: {
		description: "Gibt die Teststatistik eines Student'schen t-Tests zurück. Mithilfe von TTEST können Sie testen, ob zwei Stichproben aus zwei Grundgesamtheiten mit demselben Mittelwert stammen.",
		abstract: "Gibt die Teststatistik eines Student'schen t-Tests zurück. Mithilfe von TTEST können Sie testen, ob zwei Stichproben aus zwei Grundgesamtheiten mit demselben Mittelwert stammen.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/ttest-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Erforderlich. Das erste Dataset"
			},
			array2: {
				name: "array2",
				detail: "Erforderlich. Das zweite Dataset"
			},
			tails: {
				name: "tails",
				detail: "Erforderlich. Gibt die Anzahl der Verteilungsfragmente an. Wenn Tails = 1 ist, verwendet TTEST die einseitige Verteilung. Wenn Tails = 2 ist, verwendet TTEST die zweiseitige Verteilung."
			},
			type: {
				name: "type",
				detail: "Erforderlich. Der Typ des durchzuführenden t-Tests"
			}
		}
	},
	VAR: {
		description: "Schätzt die Varianz auf der Basis einer Stichprobe.",
		abstract: "Schätzt die Varianz auf der Basis einer Stichprobe.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/var-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Erforderlich. Das erste numerische Argument, das einer Stichprobe einer Grundgesamtheit entspricht."
			},
			number2: {
				name: "number2",
				detail: "Optional. 2 bis 255 numerische Argumente, die einer Stichprobe einer Grundgesamtheit entsprechen"
			}
		}
	},
	VARP: {
		description: "Berechnet die Varianz ausgehend von der Grundgesamtheit.",
		abstract: "Berechnet die Varianz ausgehend von der Grundgesamtheit.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/varp-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Erforderlich. Das erste numerische Argument, das einer Grundgesamtheit entspricht"
			},
			number2: {
				name: "number2",
				detail: "Optional. 2 bis 255 numerische Argumente, die einer Grundgesamtheit entsprechen"
			}
		}
	},
	WEIBULL: {
		description: "Gibt Wahrscheinlichkeiten einer weibullverteilten Zufallsvariablen zurück. Diese Verteilung können Sie bei Zuverlässigkeitsanalysen verwenden, also beispielsweise dazu, die mittlere Lebensdauer eines Gerätes zu berechnen.",
		abstract: "Gibt Wahrscheinlichkeiten einer weibullverteilten Zufallsvariablen zurück. Diese Verteilung können Sie bei Zuverlässigkeitsanalysen verwenden, also beispielsweise dazu, die mittlere Lebensdauer eines Gerätes zu berechnen.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/weibull-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Erforderlich. Der Wert, für den die Funktion ausgewertet werden soll"
			},
			alpha: {
				name: "alpha",
				detail: "Erforderlich. Ein Parameter der Verteilung"
			},
			beta: {
				name: "beta",
				detail: "Erforderlich. Ein Parameter der Verteilung"
			},
			cumulative: {
				name: "cumulative",
				detail: "Erforderlich. Bestimmt den Typ der Funktion"
			}
		}
	},
	ZTEST: {
		description: "Gibt den einseitigen Wahrscheinlichkeitswert für einen Gaußtest (Normalverteilung) zurück. Für einen Erwartungswert einer Zufallsvariablen, µ0, gibt GTEST die Wahrscheinlichkeit zurück, mit der der Stichprobenmittelwert größer als der Durchschnitt der für diesen Datensatz (Array) durchgeführten Beobachtungen (also dem beobachteten Stichprobenmittel) ist.",
		abstract: "Gibt den einseitigen Wahrscheinlichkeitswert für einen Gaußtest (Normalverteilung) zurück. Für einen Erwartungswert einer Zufallsvariablen, µ0, gibt GTEST die Wahrscheinlichkeit zurück, mit der der Stichprobenmittelwert größer als der Durchschnitt der für diesen Datensatz (Array) durchgeführten Beobachtungen (also dem beobachteten Stichprobenmittel) ist.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/ztest-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Erforderlich. Die Matrix (Array) oder der Datenbereich, gegen die/den Sie x testen möchten."
			},
			x: {
				name: "x",
				detail: "Erforderlich. Der zu testende Wert"
			},
			sigma: {
				name: "sigma",
				detail: "Optional. Die bekannte Standardabweichung der Grundgesamtheit. Ohne Angabe wird die Beispielstandardabweichung verwendet."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/cube/de-DE.ts
const locale$13 = {
	CUBEKPIMEMBER: {
		description: "Gibt die Eigenschaft eines Key Performance Indicators (KPI) zurück und zeigt den KPI-Namen in der Zelle an. Ein KPI ist eine quantifizierbare Größe (z. B. der monatliche Bruttogewinn oder die quartalsweise Fluktuation), mit dem die Leistung eines Unternehmens überwacht wird.",
		abstract: "Gibt die Eigenschaft eines Key Performance Indicators (KPI) zurück und zeigt den KPI-Namen in der Zelle an. Ein KPI ist eine quantifizierbare Größe (z. B. der monatliche Bruttogewinn oder die quartalsweise Fluktuation), mit dem die Leistung eines Unternehmens überwacht wird.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/cubekpimember-function"
		}],
		functionParameter: {
			connection: {
				name: "Verbindung",
				detail: "Erforderlich. Eine Textzeichenfolge mit dem Namen der Verbindung zum Cube."
			},
			kpiName: {
				name: "Kpi_name",
				detail: "Erforderlich. Eine Textzeichenfolge mit dem Namen des KPI im Cube."
			},
			kpiProperty: {
				name: "Kpi_property",
				detail: "Erforderlich. Es beinhaltet die zurückgegebene KPI-Komponente und kann folgende Werte annehmen:"
			},
			caption: {
				name: "Beschriftung",
				detail: "Optional. Eine alternative Textzeichenfolge, die in der Zelle anstelle von kpi_name und kpi_property angezeigt wird."
			}
		}
	},
	CUBEMEMBER: {
		description: "Gibt ein Element oder ein Tupel aus dem Cube zurück. Wird verwendet, um zu überprüfen, ob das Element oder Tupel im Cube vorhanden ist.",
		abstract: "Gibt ein Element oder ein Tupel aus dem Cube zurück. Wird verwendet, um zu überprüfen, ob das Element oder Tupel im Cube vorhanden ist.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/cubemember-function"
		}],
		functionParameter: {
			connection: {
				name: "Verbindung",
				detail: "Erforderlich. Eine Textzeichenfolge mit dem Namen der Verbindung zum Cube."
			},
			memberExpression: {
				name: "Member_expression",
				detail: "Erforderlich. Eine Textzeichenfolge eines multidimensionalen Ausdrucks (MDX), der ein eindeutiges Element im Cube ergibt. Alternativ kann \"Element_Ausdruck\" auch ein Tupel sein, das als ein Zellbereich oder eine Matrixkonstante angegeben wird."
			},
			caption: {
				name: "Beschriftung",
				detail: "Optional. Es enthält eine Textzeichenfolge, die statt der Beschriftung aus dem Cube (sofern definiert) in der Zelle angezeigt wird. Wenn ein Tupel zurückgegeben wird, entspricht die verwendete Beschriftung der Beschriftung für das letzte Element im Tupel."
			}
		}
	},
	CUBEMEMBERPROPERTY: {
		description: "Die CUBEMEMBERPROPERTY-Funktion , eine der Cubefunktionen in Excel, gibt den Wert einer Membereigenschaft aus einem Cube zurück. Damit wird geprüft, ob ein Elementname im Cube vorhanden ist, und die angegebene Eigenschaft für dieses Element wird zurückgegeben.",
		abstract: "Die CUBEMEMBERPROPERTY-Funktion , eine der Cubefunktionen in Excel, gibt den Wert einer Membereigenschaft aus einem Cube zurück. Damit wird geprüft, ob ein Elementname im Cube vorhanden ist, und die angegebene Eigenschaft für dieses Element wird zurückgegeben.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/cubememberproperty-function"
		}],
		functionParameter: {
			connection: {
				name: "Verbindung",
				detail: "Erforderlich. Eine Textzeichenfolge mit dem Namen der Verbindung zum Cube."
			},
			memberExpression: {
				name: "Member_expression",
				detail: "Erforderlich. Eine Textzeichenfolge eines multidimensionalen Ausdrucks (MDX) für ein Element im Cube."
			},
			property: {
				name: "Eigenschaft",
				detail: "Erforderlich. Eine Textzeichenfolge des Namens der zurückgegebenen Eigenschaft oder ein Bezug auf eine Zelle, die den Namen der Eigenschaft enthält."
			}
		}
	},
	CUBERANKEDMEMBER: {
		description: "Gibt das n-te oder n-rangige Element in einer Menge zurück. Wird verwendet, um mindestens ein Element in einer Menge zurückzugeben, z. B. den besten Vertriebsmitarbeiter oder die 10 besten Kursteilnehmer.",
		abstract: "Gibt das n-te oder n-rangige Element in einer Menge zurück. Wird verwendet, um mindestens ein Element in einer Menge zurückzugeben, z. B. den besten Vertriebsmitarbeiter oder die 10 besten Kursteilnehmer.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/cuberankedmember-function"
		}],
		functionParameter: {
			connection: {
				name: "Verbindung",
				detail: "Erforderlich. Eine Textzeichenfolge mit dem Namen der Verbindung zum Cube."
			},
			setExpression: {
				name: "Set_expression",
				detail: "Erforderlich. Eine Textzeichenfolge eines Mengenausdrucks, z. B. \"{[Element1].Kinder}\". \"Menge_Ausdruck\" kann auch die CUBEMENGE-Funktion oder ein Bezug auf eine Zelle mit der CUBEMENGE-Funktion sein."
			},
			rank: {
				name: "Rang",
				detail: "Erforderlich. Ein ganzzahliger Wert zur Angabe des obersten Werts, der zurückgegeben werden soll. Wenn \"Rang\" der Wert \"1\" ist, wird der oberste Wert zurückgegeben; ist \"Rang\" der Wert \"2\", wird der zweitoberste Wert zurückgegeben usw. Wenn die 5 obersten Werte zurückgegeben werden sollen, verwenden Sie CUBERANGELEMENT fünfmal, und geben Sie jedes Mal einen anderen Rang (\"1\" bis \"5\") an."
			},
			caption: {
				name: "Beschriftung",
				detail: "Optional. Es ist eine Textzeichenfolge aus dem Cube, die in der Zelle statt der Beschriftung angezeigt wird, sofern dies entsprechend definiert wurde."
			}
		}
	},
	CUBESET: {
		description: "Definiert einen berechneten Satz von Elementen oder Tupeln, indem ein Satzausdruck an den Cube auf dem Server gesendet wird, der den Satz erstellt und diesen Satz anschließend an Microsoft Excel zurückgibt.",
		abstract: "Definiert einen berechneten Satz von Elementen oder Tupeln, indem ein Satzausdruck an den Cube auf dem Server gesendet wird, der den Satz erstellt und diesen Satz anschließend an Microsoft Excel zurückgibt.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/cubeset-function"
		}],
		functionParameter: {
			connection: {
				name: "Verbindung",
				detail: "Erforderlich. Eine Textzeichenfolge mit dem Namen der Verbindung zum Cube."
			},
			setExpression: {
				name: "Set_expression",
				detail: "Erforderlich. Eine Textzeichenfolge eines Set-Ausdrucks, der zu einer Reihe von Membern oder Tupeln führt. Set_expression kann auch ein Zellbezug auf einen Excel-Bereich sein, der ein oder mehrere Elemente, Tupel oder Sätze enthält, die im Satz enthalten sind."
			},
			caption: {
				name: "Beschriftung",
				detail: "Optional. Eine Textzeichenfolge, die in der Zelle anstelle des Untertitel angezeigt wird, sofern definiert, aus dem Cube."
			},
			sortOrder: {
				name: "Sort_order",
				detail: "Optional. Es kann folgende Werte annehmen:"
			},
			sortBy: {
				name: "Sort_by",
				detail: "Optional. Eine Textzeichenfolge des Werts, nach dem sortiert werden soll. Um beispielsweise die Stadt mit dem höchsten Umsatz zu erhalten, wäre set_expression eine Reihe von Städten, und sort_by wäre das Sales-Measure. Um die Stadt mit der höchsten Einwohnerzahl zu erhalten, wäre set_expression eine Reihe von Städten, und sort_by wäre das Bevölkerungsmaß. Wenn sort_order sort_by erfordert und sort_by weggelassen wird, gibt CUBESET den #VALUE! zurück."
			}
		}
	},
	CUBESETCOUNT: {
		description: "Gibt die Anzahl der Elemente in einem Satz zurück.",
		abstract: "Gibt die Anzahl der Elemente in einem Satz zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/cubesetcount-function"
		}],
		functionParameter: { set: {
			name: "Festgelegt",
			detail: "Erforderlich. Eine Textzeichenfolge eines Microsoft Excel-Ausdrucks, der zu einem von der CUBESET-Funktion definierten Satz ausgewertet wird. Set kann auch die CUBESET-Funktion oder ein Verweis auf eine Zelle sein, die die CUBESET-Funktion enthält."
		} }
	},
	CUBEVALUE: {
		description: "Gibt einen aggregierten Wert aus dem Cube zurück.",
		abstract: "Gibt einen aggregierten Wert aus dem Cube zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/cubevalue-function"
		}],
		functionParameter: {
			connection: {
				name: "Verbindung",
				detail: "Erforderlich. Eine Textzeichenfolge mit dem Namen der Verbindung zum Cube."
			},
			memberExpression: {
				name: "Member_expression",
				detail: "Optional. Eine Textzeichenfolge eines mehrdimensionalen Ausdrucks (MDX), der zu einem Member oder Tupel innerhalb des Cubes ausgewertet wird. Alternativ kann member_expression ein mit der CUBESET-Funktion definierter Satz sein. Verwenden Sie member_expression als Slicer, um den Teil des Cubes zu definieren, für den der aggregierte Wert zurückgegeben wird. Wenn in member_expression kein Measure angegeben ist, wird das Standardmeasure für diesen Cube verwendet."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/database/de-DE.ts
const locale$12 = {
	DAVERAGE: {
		description: "Liefert den Mittelwert aus den Werten eines Felds (einer Spalte) mit Datensätzen in einer Liste oder Datenbank, die den von Ihnen angegebenen Bedingungen entsprechen.",
		abstract: "Liefert den Mittelwert aus den Werten eines Felds (einer Spalte) mit Datensätzen in einer Liste oder Datenbank, die den von Ihnen angegebenen Bedingungen entsprechen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/daverage-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "ist der Zellbereich, aus dem die Liste oder Datenbank besteht. Eine Datenbank ist eine Liste verwandter Daten, in der Zeilen mit verwandten Informationen Datensätze und Datenspalten Felder bilden. Die erste Zeile der Liste enthält Beschriftungen für die einzelnen Spalten."
			},
			field: {
				name: "field",
				detail: "gibt an, welche Spalte in der Funktion verwendet wird. Geben Sie die Spaltenbeschriftung zwischen Anführungszeichen ein, z. B. als \"Alter\" oder \"Ertrag\", oder eine Zahl (ohne Anführungszeichen), die die Position der Spalte in der Liste darstellt: 1 für die erste Spalte, 2 für die zweite Spalte usw."
			},
			criteria: {
				name: "criteria",
				detail: "ist der Zellbereich, der die von Ihnen angegebenen Bedingungen enthält. Sie können jeden Bereich verwenden, der mindestens eine Spaltenbeschriftung und eine Zelle unter der Beschriftung zum Angeben der Bedingung enthält."
			}
		}
	},
	DCOUNT: {
		description: "Ermittelt die Anzahl der Zellen, die Zahlen enthalten, in einem Feld (einer Spalte) mit Datensätzen in einer Liste oder Datenbank, die den von Ihnen angegebenen Bedingungen entsprechen.",
		abstract: "Ermittelt die Anzahl der Zellen, die Zahlen enthalten, in einem Feld (einer Spalte) mit Datensätzen in einer Liste oder Datenbank, die den von Ihnen angegebenen Bedingungen entsprechen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/dcount-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Erforderlich. Der Zellbereich, aus dem die Liste oder Datenbank besteht. Eine Datenbank ist eine Liste verwandter Daten, in der Zeilen mit verwandten Informationen Datensätze und Datenspalten Felder bilden. Die erste Zeile der Liste enthält Beschriftungen für die einzelnen Spalten."
			},
			field: {
				name: "field",
				detail: "Erforderlich. Gibt an, welche Spalte in der Funktion verwendet wird. Geben Sie die Spaltenbeschriftung zwischen Anführungszeichen ein, z. B. als \"Alter\" oder \"Ertrag\", oder eine Zahl (ohne Anführungszeichen), die die Position der Spalte in der Liste darstellt: 1 für die erste Spalte, 2 für die zweite Spalte usw."
			},
			criteria: {
				name: "criteria",
				detail: "Erforderlich. Der Zellbereich, der die angegebenen Bedingungen enthält. Sie können jeden Bereich verwenden, der mindestens eine Spaltenbeschriftung und eine Zelle unter der Beschriftung zum Angeben der Bedingung enthält."
			}
		}
	},
	DCOUNTA: {
		description: "Ermittelt die Anzahl nicht leerer Zellen in einem Feld (einer Spalte) mit Datensätzen in einer Liste oder Datenbank, die den von Ihnen angegebenen Bedingungen entspricht.",
		abstract: "Ermittelt die Anzahl nicht leerer Zellen in einem Feld (einer Spalte) mit Datensätzen in einer Liste oder Datenbank, die den von Ihnen angegebenen Bedingungen entspricht.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/dcounta-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Erforderlich. Der Zellbereich, aus dem die Liste oder Datenbank besteht. Eine Datenbank ist eine Liste verwandter Daten, in der Zeilen mit verwandten Informationen Datensätze und Datenspalten Felder bilden. Die erste Zeile der Liste enthält Beschriftungen für die einzelnen Spalten."
			},
			field: {
				name: "field",
				detail: "Optional. Gibt an, welche Spalte in der Funktion verwendet wird. Geben Sie die Spaltenbeschriftung zwischen Anführungszeichen ein, z. B. als \"Alter\" oder \"Ertrag\", oder eine Zahl (ohne Anführungszeichen), die die Position der Spalte in der Liste darstellt: 1 für die erste Spalte, 2 für die zweite Spalte usw."
			},
			criteria: {
				name: "criteria",
				detail: "Erforderlich. Der Zellbereich, der die angegebenen Bedingungen enthält. Sie können jeden Bereich verwenden, der mindestens eine Spaltenbeschriftung und eine Zelle unter der Beschriftung zum Angeben der Bedingung enthält."
			}
		}
	},
	DGET: {
		description: "Gibt einen einzelnen Wert aus einer Spalte einer Liste oder Datenbank zurück, der den von Ihnen angegebenen Bedingungen entspricht.",
		abstract: "Gibt einen einzelnen Wert aus einer Spalte einer Liste oder Datenbank zurück, der den von Ihnen angegebenen Bedingungen entspricht.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/dget-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Erforderlich. Der Zellbereich, aus dem die Liste oder Datenbank besteht. Eine Datenbank ist eine Liste verwandter Daten, in der Zeilen mit verwandten Informationen Datensätze und Datenspalten Felder bilden. Die erste Zeile der Liste enthält Beschriftungen für die einzelnen Spalten."
			},
			field: {
				name: "field",
				detail: "Erforderlich. Gibt an, welche Spalte in der Funktion verwendet wird. Geben Sie die Spaltenbeschriftung zwischen Anführungszeichen ein, z. B. als \"Alter\" oder \"Ertrag\", oder eine Zahl (ohne Anführungszeichen), die die Position der Spalte in der Liste darstellt: 1 für die erste Spalte, 2 für die zweite Spalte usw."
			},
			criteria: {
				name: "criteria",
				detail: "Erforderlich. Der Zellbereich, der die angegebenen Bedingungen enthält. Sie können jeden Bereich verwenden, der mindestens eine Spaltenbeschriftung und eine Zelle unter der Beschriftung zum Angeben der Bedingung enthält."
			}
		}
	},
	DMAX: {
		description: "Gibt den größten Wert in einem Feld (einer Spalte) mit Datensätzen in einer Liste oder Datenbank zurück, der den von Ihnen angegebenen Bedingungen entspricht.",
		abstract: "Gibt den größten Wert in einem Feld (einer Spalte) mit Datensätzen in einer Liste oder Datenbank zurück, der den von Ihnen angegebenen Bedingungen entspricht.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/dmax-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Erforderlich. Der Zellbereich, aus dem die Liste oder Datenbank besteht. Eine Datenbank ist eine Liste verwandter Daten, in der Zeilen mit verwandten Informationen Datensätze und Datenspalten Felder bilden. Die erste Zeile der Liste enthält Beschriftungen für die einzelnen Spalten."
			},
			field: {
				name: "field",
				detail: "Erforderlich. Gibt an, welche Spalte in der Funktion verwendet wird. Geben Sie die Spaltenbeschriftung zwischen Anführungszeichen ein, z. B. als \"Alter\" oder \"Ertrag\", oder eine Zahl (ohne Anführungszeichen), die die Position der Spalte in der Liste darstellt: 1 für die erste Spalte, 2 für die zweite Spalte usw."
			},
			criteria: {
				name: "criteria",
				detail: "Erforderlich. Der Zellbereich, der die angegebenen Bedingungen enthält. Sie können jeden Bereich verwenden, der mindestens eine Spaltenbeschriftung und eine Zelle unter der Beschriftung zum Angeben der Bedingung enthält."
			}
		}
	},
	DMIN: {
		description: "Gibt den kleinsten Wert in einem Feld (einer Spalte) mit Datensätzen in einer Liste oder Datenbank zurück, der den von Ihnen angegebenen Bedingungen entspricht.",
		abstract: "Gibt den kleinsten Wert in einem Feld (einer Spalte) mit Datensätzen in einer Liste oder Datenbank zurück, der den von Ihnen angegebenen Bedingungen entspricht.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/dmin-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Erforderlich. Der Zellbereich, aus dem die Liste oder Datenbank besteht. Eine Datenbank ist eine Liste verwandter Daten, in der Zeilen mit verwandten Informationen Datensätze und Datenspalten Felder bilden. Die erste Zeile der Liste enthält Beschriftungen für die einzelnen Spalten."
			},
			field: {
				name: "field",
				detail: "Erforderlich. Gibt an, welche Spalte in der Funktion verwendet wird. Geben Sie die Spaltenbeschriftung zwischen Anführungszeichen ein, z. B. als \"Alter\" oder \"Ertrag\", oder eine Zahl (ohne Anführungszeichen), die die Position der Spalte in der Liste darstellt: 1 für die erste Spalte, 2 für die zweite Spalte usw."
			},
			criteria: {
				name: "criteria",
				detail: "Erforderlich. Der Zellbereich, der die angegebenen Bedingungen enthält. Sie können jeden Bereich verwenden, der mindestens eine Spaltenbeschriftung und eine Zelle unter der Beschriftung zum Angeben der Bedingung enthält."
			}
		}
	},
	DPRODUCT: {
		description: "Multipliziert die Werte in einem Feld (einer Spalte) mit Datensätzen in einer Liste oder Datenbank, die den von Ihnen angegebenen Bedingungen entsprechen.",
		abstract: "Multipliziert die Werte in einem Feld (einer Spalte) mit Datensätzen in einer Liste oder Datenbank, die den von Ihnen angegebenen Bedingungen entsprechen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/dproduct-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Erforderlich. Der Zellbereich, aus dem die Liste oder Datenbank besteht. Eine Datenbank ist eine Liste verwandter Daten, in der Zeilen mit verwandten Informationen Datensätze und Datenspalten Felder bilden. Die erste Zeile der Liste enthält Beschriftungen für die einzelnen Spalten."
			},
			field: {
				name: "field",
				detail: "Erforderlich. Gibt an, welche Spalte in der Funktion verwendet wird. Geben Sie die Spaltenbeschriftung zwischen Anführungszeichen ein, z. B. als \"Alter\" oder \"Ertrag\", oder eine Zahl (ohne Anführungszeichen), die die Position der Spalte in der Liste darstellt: 1 für die erste Spalte, 2 für die zweite Spalte usw."
			},
			criteria: {
				name: "criteria",
				detail: "Erforderlich. Der Zellbereich, der die angegebenen Bedingungen enthält. Sie können jeden Bereich verwenden, der mindestens eine Spaltenbeschriftung und eine Zelle unter der Beschriftung zum Angeben der Bedingung enthält."
			}
		}
	},
	DSTDEV: {
		description: "Schätzt die Standardabweichung einer Grundgesamtheit auf der Grundlage einer Stichprobe, mithilfe der Werte in einem Feld (einer Spalte) mit Datensätzen in einer Liste oder Datenbank, die den von Ihnen angegebenen Bedingungen entsprechen.",
		abstract: "Schätzt die Standardabweichung einer Grundgesamtheit auf der Grundlage einer Stichprobe, mithilfe der Werte in einem Feld (einer Spalte) mit Datensätzen in einer Liste oder Datenbank, die den von Ihnen angegebenen Bedingungen entsprechen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/dstdev-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Erforderlich. Der Zellbereich, aus dem die Liste oder Datenbank besteht. Eine Datenbank ist eine Liste verwandter Daten, in der Zeilen mit verwandten Informationen Datensätze und Datenspalten Felder bilden. Die erste Zeile der Liste enthält Beschriftungen für die einzelnen Spalten."
			},
			field: {
				name: "field",
				detail: "Erforderlich. Gibt an, welche Spalte in der Funktion verwendet wird. Geben Sie die Spaltenbeschriftung zwischen Anführungszeichen ein, z. B. als \"Alter\" oder \"Ertrag\", oder eine Zahl (ohne Anführungszeichen), die die Position der Spalte in der Liste darstellt: 1 für die erste Spalte, 2 für die zweite Spalte usw."
			},
			criteria: {
				name: "criteria",
				detail: "Erforderlich. Der Zellbereich, der die angegebenen Bedingungen enthält. Sie können jeden Bereich verwenden, der mindestens eine Spaltenbeschriftung und eine Zelle unter der Beschriftung zum Angeben der Bedingung enthält."
			}
		}
	},
	DSTDEVP: {
		description: "Berechnet die Standardabweichung auf der Grundlage der Grundgesamtheit, mithilfe der Werte in einem Feld (einer Spalte) mit Datensätzen in einer Liste oder Datenbank, die den von Ihnen angegebenen Bedingungen entsprechen.",
		abstract: "Berechnet die Standardabweichung auf der Grundlage der Grundgesamtheit, mithilfe der Werte in einem Feld (einer Spalte) mit Datensätzen in einer Liste oder Datenbank, die den von Ihnen angegebenen Bedingungen entsprechen.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/dstdevp-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Erforderlich. Der Zellbereich, aus dem die Liste oder Datenbank besteht. Eine Datenbank ist eine Liste verwandter Daten, in der Zeilen mit verwandten Informationen Datensätze und Datenspalten Felder bilden. Die erste Zeile der Liste enthält Beschriftungen für die einzelnen Spalten."
			},
			field: {
				name: "field",
				detail: "Erforderlich. Gibt an, welche Spalte in der Funktion verwendet wird. Geben Sie die Spaltenbeschriftung zwischen Anführungszeichen ein, z. B. als \"Alter\" oder \"Ertrag\", oder eine Zahl (ohne Anführungszeichen), die die Position der Spalte in der Liste darstellt: 1 für die erste Spalte, 2 für die zweite Spalte usw."
			},
			criteria: {
				name: "criteria",
				detail: "Erforderlich. Der Zellbereich, der die angegebenen Bedingungen enthält. Sie können jeden Bereich verwenden, der mindestens eine Spaltenbeschriftung und eine Zelle unter der Beschriftung zum Angeben der Bedingung enthält."
			}
		}
	},
	DSUM: {
		description: "In einer Liste oder Datenbank stellt DSUM die Summe der Zahlen in Feldern (Spalten) von Datensätzen bereit, die den angegebenen Bedingungen entsprechen.",
		abstract: "In einer Liste oder Datenbank stellt DSUM die Summe der Zahlen in Feldern (Spalten) von Datensätzen bereit, die den angegebenen Bedingungen entsprechen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/dsum-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Erforderlich. Dies ist der Zellbereich, aus dem die Liste oder Datenbank besteht. Eine Datenbank ist eine Liste verwandter Daten, in denen Zeilen verwandter Informationen Datensätze und Datenspalten Felder sind. Die erste Zeile einer Liste enthält Bezeichnungen für jede Spalte darin."
			},
			field: {
				name: "field",
				detail: "Erforderlich. Dies gibt an, welche Spalte in der Funktion verwendet wird. Geben Sie die Spaltenbezeichnung an, die in doppelte Anführungszeichen eingeschlossen ist, z. B. \"Age\" oder \"Yield\". Alternativ können Sie eine Zahl (ohne Anführungszeichen) angeben, die die Position der Spalte innerhalb der Liste darstellt: z. B. 1 für die erste Spalte, 2 für die zweite Spalte usw."
			},
			criteria: {
				name: "criteria",
				detail: "Erforderlich. Dies ist der Zellbereich, der die von Ihnen angegebenen Bedingungen enthält. Sie können jeden Bereich verwenden, der mindestens eine Spaltenbeschriftung und eine Zelle unter der Beschriftung zum Angeben der Bedingung enthält."
			}
		}
	},
	DVAR: {
		description: "Schätzt die Varianz einer Grundgesamtheit auf der Grundlage einer Stichprobe, mithilfe der Werte in einem Feld (einer Spalte) mit Datensätzen in einer Liste oder Datenbank, die den von Ihnen angegebenen Bedingungen entsprechen.",
		abstract: "Schätzt die Varianz einer Grundgesamtheit auf der Grundlage einer Stichprobe, mithilfe der Werte in einem Feld (einer Spalte) mit Datensätzen in einer Liste oder Datenbank, die den von Ihnen angegebenen Bedingungen entsprechen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/dvar-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Erforderlich. Der Zellbereich, aus dem die Liste oder Datenbank besteht. Eine Datenbank ist eine Liste verwandter Daten, in der Zeilen mit verwandten Informationen Datensätze und Datenspalten Felder bilden. Die erste Zeile der Liste enthält Beschriftungen für die einzelnen Spalten."
			},
			field: {
				name: "field",
				detail: "Erforderlich. Gibt an, welche Spalte in der Funktion verwendet wird. Geben Sie die Spaltenbeschriftung zwischen Anführungszeichen ein, z. B. als \"Alter\" oder \"Ertrag\", oder eine Zahl (ohne Anführungszeichen), die die Position der Spalte in der Liste darstellt: 1 für die erste Spalte, 2 für die zweite Spalte usw."
			},
			criteria: {
				name: "criteria",
				detail: "Erforderlich. Der Zellbereich, der die angegebenen Bedingungen enthält. Sie können jeden Bereich verwenden, der mindestens eine Spaltenbeschriftung und eine Zelle unter der Beschriftung zum Angeben der Bedingung enthält."
			}
		}
	},
	DVARP: {
		description: "Berechnet die Varianz auf der Grundlage der Grundgesamtheit, mithilfe der Werte in einem Feld (einer Spalte) mit Datensätzen in einer Liste oder Datenbank, die den von Ihnen angegebenen Bedingungen entsprechen.",
		abstract: "Berechnet die Varianz auf der Grundlage der Grundgesamtheit, mithilfe der Werte in einem Feld (einer Spalte) mit Datensätzen in einer Liste oder Datenbank, die den von Ihnen angegebenen Bedingungen entsprechen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/dvarp-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Erforderlich. Der Zellbereich, aus dem die Liste oder Datenbank besteht. Eine Datenbank ist eine Liste verwandter Daten, in der Zeilen mit verwandten Informationen Datensätze und Datenspalten Felder bilden. Die erste Zeile der Liste enthält Beschriftungen für die einzelnen Spalten."
			},
			field: {
				name: "field",
				detail: "Erforderlich. Gibt an, welche Spalte in der Funktion verwendet wird. Geben Sie die Spaltenbeschriftung zwischen Anführungszeichen ein, z. B. als \"Alter\" oder \"Ertrag\", oder eine Zahl (ohne Anführungszeichen), die die Position der Spalte in der Liste darstellt: 1 für die erste Spalte, 2 für die zweite Spalte usw."
			},
			criteria: {
				name: "criteria",
				detail: "Erforderlich. Der Zellbereich, der die angegebenen Bedingungen enthält. Sie können jeden Bereich verwenden, der mindestens eine Spaltenbeschriftung und eine Zelle unter der Beschriftung zum Angeben der Bedingung enthält."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/date/de-DE.ts
const locale$11 = {
	DATE: {
		description: "Mit der Funktion DATUM wird die fortlaufende Zahl zurückgegeben, die ein bestimmtes Datum darstellt.",
		abstract: "Mit der Funktion DATUM wird die fortlaufende Zahl zurückgegeben, die ein bestimmtes Datum darstellt.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/date-function"
		}],
		functionParameter: {
			year: {
				name: "year",
				detail: "Der Wert des Arguments year kann ein bis vier Ziffern enthalten. Excel interpretiert year entsprechend dem auf Ihrem Computer verwendeten Datumssystem. Standardmäßig verwendet Univer das Datumssystem 1900; das erste Datum ist somit der 1. Januar 1900."
			},
			month: {
				name: "month",
				detail: "Eine positive oder negative ganze Zahl, die den Monat des Jahres von 1 bis 12 (Januar bis Dezember) darstellt."
			},
			day: {
				name: "day",
				detail: "Eine positive oder negative ganze Zahl, die den Tag des Monats von 1 bis 31 darstellt."
			}
		}
	},
	DATEDIF: {
		description: "Berechnet die Anzahl der Tage, Monate oder Jahre zwischen zwei Datumsangaben.",
		abstract: "Berechnet die Anzahl der Tage, Monate oder Jahre zwischen zwei Datumsangaben.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/datedif-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Ein Datum, das das erste Datum oder das Anfangsdatum eines bestimmten Zeitraums darstellt. Datumsangaben können als Textzeichenfolgen in Anführungszeichen (z. B. \"2001/1/30\"), als fortlaufende Zahlen (z. B. 36921, das den 30. Januar 2001 darstellt, wenn Sie das Datumssystem 1900 verwenden) oder als Ergebnisse anderer Formeln oder Funktionen (z. B. DATEVALUE(\"2001/1/30\")) eingegeben werden."
			},
			endDate: {
				name: "end_date",
				detail: "Ein Datum, das das letzte Datum des Zeitraums darstellt"
			},
			unit: {
				name: "Einheit",
				detail: "Der Typ der Informationen, die zurückgegeben werden sollen, wobei: Einheit****Gibt \" Y \"Die Anzahl der vollständigen Jahre im Zeitraum zurück.\" M \"Die Anzahl der vollständigen Monate im Zeitraum.\" D \"Die Anzahl der Tage im Zeitraum.\" MD \"Der Unterschied zwischen den Tagen in start_date und end_date. Die Monate und Jahre der Datumsangaben werden ignoriert. Wichtig: Es wird davon abgeraten, das Argument \"MD\" zu verwenden, da es bekannte Einschränkungen gibt. Weitere Informationen finden Sie weiter unten im Abschnitt bekannte Probleme.\" YM \"Der Unterschied zwischen den Monaten in start_date und end_date. Die Tage und Jahre der Datumsangaben werden ignoriert\" YD \"Der Unterschied zwischen den Tagen der start_date und end_date. Die Jahre der Datumsangaben werden ignoriert."
			}
		}
	},
	DATEVALUE: {
		description: "Die DATEVALUE-Funktion konvertiert ein datum, das als Text gespeichert ist, in eine fortlaufende Zahl, die Excel als Datum erkennt. Die Formel =DATEVALUE(\"1/1/2008\") gibt beispielsweise 39448 zurück, die fortlaufende Nummer des Datums 1/1/2008. Denken Sie jedoch daran, dass die Systemdatumseinstellung Ihres Computers dazu führen kann, dass die Ergebnisse einer DATEVALUE-Funktion von diesem Beispiel abweichen.",
		abstract: "Die DATEVALUE-Funktion konvertiert ein datum, das als Text gespeichert ist, in eine fortlaufende Zahl, die Excel als Datum erkennt. Die Formel =DATEVALUE(\"1/1/2008\") gibt beispielsweise 39448 zurück, die fortlaufende Nummer des Datums 1/1/2008. Denken Sie jedoch daran, dass die Systemdatumseinstellung Ihres Computers dazu führen kann, dass die Ergebnisse einer DATEVALUE-Funktion von diesem Beispiel abweichen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/datevalue-function"
		}],
		functionParameter: { dateText: {
			name: "date_text",
			detail: "Erforderlich. Text, der ein Datum in einem Excel-Datumsformat darstellt, oder einen Verweis auf eine Zelle, die Text enthält, der ein Datum in einem Excel-Datumsformat darstellt. Beispielsweise sind \"30.01.2008\" oder \"30-Jan-2008\" Textzeichenfolgen in Anführungszeichen, die Datumsangaben darstellen. Bei Verwendung des Standarddatumssystems in Microsoft Excel für Windows muss das argument date_text ein Datum zwischen dem 1. Januar 1900 und dem 31. Dezember 9999 darstellen. Die DATEVALUE-Funktion gibt die #VALUE! Fehlerwert, wenn der Wert des date_text Arguments außerhalb dieses Bereichs liegt. Wenn der Jahresteil des date_text Arguments ausgelassen wird, verwendet die DATEVALUE-Funktion das aktuelle Jahr der integrierten Uhr Ihres Computers. Zeitinformationen im argument date_text werden ignoriert."
		} }
	},
	DAY: {
		description: "Gibt den Tag eines Datums als fortlaufende Zahl zurück. Der Tag wird als ganze Zahl im Bereich von 1 bis 31 ausgegeben.",
		abstract: "Gibt den Tag eines Datums als fortlaufende Zahl zurück. Der Tag wird als ganze Zahl im Bereich von 1 bis 31 ausgegeben.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/day-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Erforderlich. Das Datum des Tages, den Sie suchen möchten. Datumsangaben sollten mit der Funktion DATUM oder als Ergebnis anderer Formeln oder Funktionen eingegeben werden. Beispiel: Verwenden Sie DATUM(2008,5,23) für den 23. Mai 2008. Probleme können auftreten, wenn Datumsangaben als Text eingegeben werden ."
		} }
	},
	DAYS: {
		description: "Gibt die Anzahl von Tagen zurück, die zwischen zwei Datumswerten liegen.",
		abstract: "Gibt die Anzahl von Tagen zurück, die zwischen zwei Datumswerten liegen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/days-function"
		}],
		functionParameter: {
			endDate: {
				name: "end_date",
				detail: "Erforderlich. \"Ausgangsdatum\" und \"Zieldatum\" sind die beiden Datumswerte, für die Sie die dazwischen liegenden Tage berechnen möchten."
			},
			startDate: {
				name: "start_date",
				detail: "Erforderlich. \"Ausgangsdatum\" und \"Zieldatum\" sind die beiden Datumswerte, für die Sie die dazwischen liegenden Tage berechnen möchten."
			}
		}
	},
	DAYS360: {
		description: "Mit der Funktion TAGE360 wird ausgehend von einem Jahr, das 360 Tage umfasst, die Anzahl der zwischen zwei Datumsangaben liegenden Tage berechnet. Sie können diese Funktion als Hilfe für die Berechnung von Zahlungen verwenden, wenn Ihr Buchführungssystem auf 12 Monaten mit je 30 Tagen basiert.",
		abstract: "Mit der Funktion TAGE360 wird ausgehend von einem Jahr, das 360 Tage umfasst, die Anzahl der zwischen zwei Datumsangaben liegenden Tage berechnet. Sie können diese Funktion als Hilfe für die Berechnung von Zahlungen verwenden, wenn Ihr Buchführungssystem auf 12 Monaten mit je 30 Tagen basiert.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/days360-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "start_date und end_date sind die zwei Daten, zwischen denen Sie die Anzahl der Tage ermitteln möchten."
			},
			endDate: {
				name: "end_date",
				detail: "start_date und end_date sind die zwei Daten, zwischen denen Sie die Anzahl der Tage ermitteln möchten."
			},
			method: {
				name: "method",
				detail: "Ein Wahrheitswert, der angibt, ob für die Berechnung die US-amerikanische oder die europäische Methode verwendet werden soll."
			}
		}
	},
	EDATE: {
		description: "Gibt die fortlaufende Nummer zurück, die das Datum darstellt, das der angegebenen Anzahl von Monaten vor oder nach einem angegebenen Datum entspricht (die start_date). Verwenden Sie EDATE, um Fälligkeitstermine oder Fälligkeitstermine zu berechnen, die auf denselben Tag des Monats wie das Ausgabedatum fallen.",
		abstract: "Gibt die fortlaufende Nummer zurück, die das Datum darstellt, das der angegebenen Anzahl von Monaten vor oder nach einem angegebenen Datum entspricht (die start_date). Verwenden Sie EDATE, um Fälligkeitstermine oder Fälligkeitstermine zu berechnen, die auf denselben Tag des Monats wie das Ausgabedatum fallen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/edate-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Erforderlich. Ein Datum, das das Ausgangsdatum angibt Datumsangaben sollten mit der Funktion DATUM oder als Ergebnis anderer Formeln oder Funktionen eingegeben werden. Beispiel: Verwenden Sie DATUM(2008,5,23) für den 23. Mai 2008. Probleme können auftreten, wenn Datumsangaben als Text eingegeben werden ."
			},
			months: {
				name: "months",
				detail: "Erforderlich. Gibt an, wie viele Monate vor oder nach dem Ausgangsdatum liegen sollen. Ein positiver Wert für Monate ergibt ein in der Zukunft, ein negativer Wert ein in der Vergangenheit liegendes Datum."
			}
		}
	},
	EOMONTH: {
		description: "Gibt die fortlaufende Nummer für den letzten Tag des Monats zurück, die die angegebene Anzahl von Monaten vor oder nach start_date. Verwenden Sie EOMONTH, um Fälligkeitstermine oder Fälligkeitsdaten zu berechnen, die auf den letzten Tag des Monats fallen.",
		abstract: "Gibt die fortlaufende Nummer für den letzten Tag des Monats zurück, die die angegebene Anzahl von Monaten vor oder nach start_date. Verwenden Sie EOMONTH, um Fälligkeitstermine oder Fälligkeitsdaten zu berechnen, die auf den letzten Tag des Monats fallen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/eomonth-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Erforderlich. Ein Datum, das das Startdatum darstellt. Datumsangaben sollten mit der Funktion DATUM oder als Ergebnis anderer Formeln oder Funktionen eingegeben werden. Beispiel: Verwenden Sie DATUM(2008,5,23) für den 23. Mai 2008. Probleme können auftreten, wenn Datumsangaben als Text eingegeben werden ."
			},
			months: {
				name: "months",
				detail: "Erforderlich. Gibt an, wie viele Monate vor oder nach dem Ausgangsdatum liegen sollen. Ein positiver Wert für Monate ergibt ein in der Zukunft, ein negativer Wert ein in der Vergangenheit liegendes Datum. Hinweis Ist \"Monate\" keine ganze Zahl, werden die Nachkommastellen abgeschnitten."
			}
		}
	},
	EPOCHTODATE: {
		description: "Konvertiert einen Unix-Epochenzeitstempel in Sekunden, Millisekunden oder Mikrosekunden in eine Datums- und Uhrzeitangabe in koordinierter Weltzeit (UTC).",
		abstract: "Konvertiert einen Unix-Epochenzeitstempel in Sekunden, Millisekunden oder Mikrosekunden in eine Datums- und Uhrzeitangabe in koordinierter Weltzeit (UTC).",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/13193461?hl=de"
		}],
		functionParameter: {
			timestamp: {
				name: "timestamp",
				detail: "Ein Unix-Epochenzeitstempel in Sekunden, Millisekunden oder Mikrosekunden."
			},
			unit: {
				name: "unit",
				detail: "[OPTIONAL – standardmäßig 1]: Die Zeiteinheit, in der der Zeitstempel angegeben ist."
			}
		}
	},
	HOUR: {
		description: "Gibt die Stunde einer Zeitangabe zurück. Die Stunde wird als ganze Zahl ausgegeben, die einen Wert von 0 (0 Uhr) bis 23 (23 Uhr) annehmen kann.",
		abstract: "Gibt die Stunde einer Zeitangabe zurück. Die Stunde wird als ganze Zahl ausgegeben, die einen Wert von 0 (0 Uhr) bis 23 (23 Uhr) annehmen kann.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/hour-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Erforderlich. Die Zeit, die die gewünschte Stunde enthält. Zeitangaben können als Textzeichenfolgen in Anführungszeichen (z. B. \"18:45\"), als Dezimalzahlen (z. B. 0,78125; dieser Wert stellt 18:45 Uhr dar) oder als Ergebnis anderer Formeln oder Funktionen (z. B. ZEITWERT(\"18:45\")) eingegeben werden."
		} }
	},
	ISOWEEKNUM: {
		description: "Gibt die Zahl der ISO-Kalenderwoche des Jahres für ein angegebenes Datum zurück.",
		abstract: "Gibt die Zahl der ISO-Kalenderwoche des Jahres für ein angegebenes Datum zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/isoweeknum-function"
		}],
		functionParameter: { date: {
			name: "date",
			detail: "Erforderlich. Der von Excel für die Datums- und Uhrzeitberechnung verwendete Datums- und Uhrzeitcode."
		} }
	},
	MINUTE: {
		description: "Wandelt eine fortlaufende Zahl in eine Minute um. Die Minute wird als ganze Zahl ausgegeben, die einen Wert von 0 bis 59 annehmen kann.",
		abstract: "Wandelt eine fortlaufende Zahl in eine Minute um. Die Minute wird als ganze Zahl ausgegeben, die einen Wert von 0 bis 59 annehmen kann.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/minute-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Erforderlich. Der Code für Datum und Zeit, den Microsoft Excel für Datums- und Zeitberechnungen verwendet. Zeitangaben können als Textzeichenfolgen in Anführungszeichen (beispielsweise \"18:45\"), als Dezimalzahlen (beispielsweise 0,78125; dieser Wert stellt 18:45 Uhr dar) oder als Ergebnis anderer Formeln oder Funktionen (beispielsweise ZEITWERT(\"18:45\")) eingegeben werden."
		} }
	},
	MONTH: {
		description: "Wandelt eine fortlaufende Zahl in einen Monat um. Der Monat wird als ganze Zahl ausgegeben, die einen Wert von 1 (Januar) bis 12 (Dezember) annehmen kann.",
		abstract: "Wandelt eine fortlaufende Zahl in einen Monat um. Der Monat wird als ganze Zahl ausgegeben, die einen Wert von 1 (Januar) bis 12 (Dezember) annehmen kann.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/month-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Erforderlich. Das Datum des Monats, den Sie suchen möchten. Datumsangaben sollten mit der Funktion DATUM oder als Ergebnis anderer Formeln oder Funktionen eingegeben werden. Beispiel: Verwenden Sie DATUM(2008,5,23) für den 23. Mai 2008. Probleme können auftreten, wenn Datumsangaben als Text eingegeben werden ."
		} }
	},
	NETWORKDAYS: {
		description: "Gibt die Anzahl der Arbeitstage in einem Zeitintervall zurück. Nicht zu den Arbeitstagen gezählt werden Wochenenden sowie die Tage, die als Ferien (Feiertage) angegeben sind. Mit NETTOARBEITSTAGE können Sie beispielsweise die für Arbeitnehmer zu zahlenden Leistungen berechnen, die auf der zu einem bestimmten Zeitraum gehörenden Anzahl an Arbeitstagen basieren.",
		abstract: "Gibt die Anzahl der Arbeitstage in einem Zeitintervall zurück. Nicht zu den Arbeitstagen gezählt werden Wochenenden sowie die Tage, die als Ferien (Feiertage) angegeben sind. Mit NETTOARBEITSTAGE können Sie beispielsweise die für Arbeitnehmer zu zahlenden Leistungen berechnen, die auf der zu einem bestimmten Zeitraum gehörenden Anzahl an Arbeitstagen basieren.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/networkdays-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Erforderlich. Ein Datum, das das Ausgangsdatum angibt"
			},
			endDate: {
				name: "end_date",
				detail: "Erforderlich. Ein Datum, das das Enddatum angibt"
			},
			holidays: {
				name: "holidays",
				detail: "Optional. Ein optionaler Bereich von einer oder mehreren Datumsangaben, die alle Arten von arbeitsfreien Tagen repräsentieren kann, die aus dem Arbeitskalender ausgeschlossen werden sollen, also z. B. staatliche oder regionale Feiertage und Freischichten. Bei der Liste kann es sich entweder um einen Zellbereich, der die Datumsangaben enthält, oder eine Matrixkonstante der fortlaufenden Zahlen handeln, die die Datumsangaben darstellen."
			}
		}
	},
	NETWORKDAYS_INTL: {
		description: "Gibt die Anzahl der ganzen Arbeitstage zwischen zwei Datumsangaben mithilfe von Parametern zurück, um anzugeben, welche und wie viele Tage Wochenenden sind. Wochenendtage und als Feiertage angegebene Tage werden nicht als Arbeitstage betrachtet.",
		abstract: "Gibt die Anzahl der ganzen Arbeitstage zwischen zwei Datumsangaben mithilfe von Parametern zurück, um anzugeben, welche und wie viele Tage Wochenenden sind. Wochenendtage und als Feiertage angegebene Tage werden nicht als Arbeitstage betrachtet.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/networkdays-intl-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Ein Datum, das das Startdatum darstellt."
			},
			endDate: {
				name: "end_date",
				detail: "Ein Datum, das das Enddatum darstellt."
			},
			weekend: {
				name: "weekend",
				detail: "Eine Wochenendnummer oder Zeichenfolge, die angibt, wann Wochenenden auftreten."
			},
			holidays: {
				name: "holidays",
				detail: "Ein optionaler Bereich mit einem oder mehreren Daten, die aus dem Arbeitskalender ausgeschlossen werden, etwa staatliche, bundesweite oder bewegliche Feiertage."
			}
		}
	},
	NOW: {
		description: "Mit dieser Funktion wird die fortlaufende Zahl des aktuellen Datums und der aktuellen Uhrzeit zurückgegeben. Wenn das Zellenformat vor dem Eingeben der Funktion auf Standard gesetzt war, ändert Excel das Zellenformat so, dass es dem Datums- und Uhrzeitformat in den regionalen Einstellungen entspricht. Sie können das Datums- und Uhrzeitformat für die Zelle mithilfe der Befehle ändern, die über das Menüband auf der Registerkarte Start in der Gruppe Zahl bereitstehen.",
		abstract: "Mit dieser Funktion wird die fortlaufende Zahl des aktuellen Datums und der aktuellen Uhrzeit zurückgegeben. Wenn das Zellenformat vor dem Eingeben der Funktion auf Standard gesetzt war, ändert Excel das Zellenformat so, dass es dem Datums- und Uhrzeitformat in den regionalen Einstellungen entspricht. Sie können das Datums- und Uhrzeitformat für die Zelle mithilfe der Befehle ändern, die über das Menüband auf der Registerkarte Start in der Gruppe Zahl bereitstehen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/now-function"
		}],
		functionParameter: {}
	},
	SECOND: {
		description: "Wandelt eine fortlaufende Zahl in eine Sekunde um. Die Sekunde wird als ganze Zahl ausgegeben, die einen Wert von 0 (Null) bis 59 annehmen kann.",
		abstract: "Wandelt eine fortlaufende Zahl in eine Sekunde um. Die Sekunde wird als ganze Zahl ausgegeben, die einen Wert von 0 (Null) bis 59 annehmen kann.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/second-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Erforderlich. Die Zeitangabe, die die Sekunden enthält, nach denen Sie suchen möchten. Zeitangaben können als Textzeichenfolgen in Anführungszeichen (z. B. \"18:45\"), als Dezimalzahlen (z. B. 0,78125; dieser Wert stellt 18:45 Uhr dar) oder als Ergebnis anderer Formeln oder Funktionen (z. B. ZEITWERT(\"18:45\")) eingegeben werden."
		} }
	},
	TIME: {
		description: "Gibt die Dezimalzahl einer bestimmten Uhrzeit zurück. Wenn für das Zellenformat vor der Eingabe der Funktion die Option Allgemein festgelegt war, wird das Ergebnis als Datum formatiert.",
		abstract: "Gibt die Dezimalzahl einer bestimmten Uhrzeit zurück. Wenn für das Zellenformat vor der Eingabe der Funktion die Option Allgemein festgelegt war, wird das Ergebnis als Datum formatiert.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/time-function"
		}],
		functionParameter: {
			hour: {
				name: "hour",
				detail: "Erforderlich. Eine Zahl von 0 (Null) bis 32767, die die Stunde angibt. Jeder Wert, der größer ist als 23, wird durch 24 geteilt und der Rest als Wert für die Stunde angenommen. Zum Beispiel ZEIT(27;0;0) = ZEIT(3;0;0) = 0,125 oder 3:00."
			},
			minute: {
				name: "minute",
				detail: "Erforderlich. Eine Zahl von 0 bis 32767, die die Minute angibt. Jeder Wert, der größer ist als 59, wird in Stunden und Minuten umgerechnet. Zum Beispiel ZEIT(0;750;0) = ZEIT(12;30;0) = 0,520833 oder 12:30."
			},
			second: {
				name: "second",
				detail: "Erforderlich. Eine Zahl von 0 bis 32767, die die Sekunde angibt. Jeder Wert, der größer ist als 59, wird in Stunden, Minuten und Sekunden umgerechnet. Zum Beispiel ZEIT(0;0;2000) = ZEIT(0;33;22) = 0,023148 oder 0:33:22"
			}
		}
	},
	TIMEVALUE: {
		description: "Wandelt eine als Text vorliegende Zeitangabe in eine fortlaufende Zahl um. Diese fortlaufende Zahl ist ein Wert im Bereich von 0 (Null) bis 0.99988426 und entspricht einer Uhrzeit von 0:00:00 (24:00:00) bis 23:59:59.",
		abstract: "Wandelt eine als Text vorliegende Zeitangabe in eine fortlaufende Zahl um. Diese fortlaufende Zahl ist ein Wert im Bereich von 0 (Null) bis 0.99988426 und entspricht einer Uhrzeit von 0:00:00 (24:00:00) bis 23:59:59.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/timevalue-function"
		}],
		functionParameter: { timeText: {
			name: "time_text",
			detail: "Erforderlich. Eine Textzeichenfolge, die eine Uhrzeit in einem der Microsoft Excel-Zeitformate darstellt; Beispielsweise textzeichenfolgen \"18:45 pm\" und \"18:45\" in Anführungszeichen, die die Zeit darstellen."
		} }
	},
	TO_DATE: {
		description: "Konvertiert eine angegebene Zahl in ein Datum.",
		abstract: "Konvertiert eine angegebene Zahl in ein Datum.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3094239?hl=de"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Das Argument oder der Bezug auf eine Zelle, die in ein Datum umgewandelt werden soll. Ist value eine Zahl oder ein Bezug auf eine Zelle mit einem numerischen Wert, gibt TO_DATE value als Datum zurück und interpretiert value als Anzahl der Tage seit dem 30. Dezember 1899. Negative Werte werden als Tage vor diesem Datum interpretiert, Bruchwerte geben die Uhrzeit seit Mitternacht an. Ist value keine Zahl und kein Bezug auf eine Zelle mit Zahlenwert, gibt TO_DATE value unverändert zurück."
		} }
	},
	TODAY: {
		description: "Die TODAY-Funktion gibt die fortlaufende Nummer des aktuellen Datums zurück. Die fortlaufende Zahl ist der Datums-/Uhrzeitcode, der von Excel für Datums- und Uhrzeitberechnungen verwendet wird. Wenn das Zellformat vor der Eingabe der Funktion Allgemein war, ändert Excel das Zellenformat in Datum . Wenn Sie die Seriennummer anzeigen möchten, müssen Sie das Zellenformat in Allgemein oder Zahl ändern.",
		abstract: "Die TODAY-Funktion gibt die fortlaufende Nummer des aktuellen Datums zurück. Die fortlaufende Zahl ist der Datums-/Uhrzeitcode, der von Excel für Datums- und Uhrzeitberechnungen verwendet wird. Wenn das Zellformat vor der Eingabe der Funktion Allgemein war, ändert Excel das Zellenformat in Datum . Wenn Sie die Seriennummer anzeigen möchten, müssen Sie das Zellenformat in Allgemein oder Zahl ändern.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/today-function"
		}],
		functionParameter: {}
	},
	WEEKDAY: {
		description: "Wandelt eine fortlaufende Zahl in einen Wochentag um. Der Tag wird standardmäßig als ganze Zahl ausgegeben, die einen Wert von 1 (Sonntag) bis 7 (Samstag) annehmen kann.",
		abstract: "Wandelt eine fortlaufende Zahl in einen Wochentag um. Der Tag wird standardmäßig als ganze Zahl ausgegeben, die einen Wert von 1 (Sonntag) bis 7 (Samstag) annehmen kann.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/weekday-function"
		}],
		functionParameter: {
			serialNumber: {
				name: "serial_number",
				detail: "Erforderlich. Eine sequenzielle Zahl, die das Datum des Tages darstellt, den Sie suchen möchten. Datumsangaben sollten mit der Funktion DATUM oder als Ergebnis anderer Formeln oder Funktionen eingegeben werden. Beispiel: Verwenden Sie DATUM(2008,5,23) für den 23. Mai 2008. Probleme können auftreten, wenn Datumsangaben als Text eingegeben werden."
			},
			returnType: {
				name: "return_type",
				detail: "Optional. Eine Zahl, mit der der Typ des Rückgabewerts bestimmt wird"
			}
		}
	},
	WEEKNUM: {
		description: "Gibt die Wochennummer eines bestimmten Datums zurück. Beispielsweise ist die Woche, die den 1. Januar enthält, die erste Woche des Jahres und woche 1 nummeriert.",
		abstract: "Gibt die Wochennummer eines bestimmten Datums zurück. Beispielsweise ist die Woche, die den 1. Januar enthält, die erste Woche des Jahres und woche 1 nummeriert.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/weeknum-function"
		}],
		functionParameter: {
			serialNumber: {
				name: "serial_number",
				detail: "Erforderlich. Ein Datum innerhalb der Woche. Datumsangaben sollten mit der Funktion DATUM oder als Ergebnis anderer Formeln oder Funktionen eingegeben werden. Beispiel: Verwenden Sie DATUM(2008,5,23) für den 23. Mai 2008. Probleme können auftreten, wenn Datumsangaben als Text eingegeben werden."
			},
			returnType: {
				name: "return_type",
				detail: "Optional. Eine Zahl, mit der festgelegt wird, an welchem Tag eine Woche beginnt. Die Standardeinstellung ist 1."
			}
		}
	},
	WORKDAY: {
		description: "Gibt die Datumsangabe als fortlaufenden Tag im Jahr zurück, vor oder nach einer bestimmten Anzahl von Arbeitstagen. Nicht zu den Arbeitstagen gezählt werden Wochenenden sowie die Tage, die als Ferien (\"Freie_Tage\") angegeben sind. ARBEITSTAG ermöglicht es Ihnen, Wochenenden oder Ferien auszuschließen, wenn Sie Fälligkeitstermine für Rechnungen, zu erwartende Lieferzeiten oder die Anzahl bereits verstrichener Arbeitstage berechnen möchten.",
		abstract: "Gibt die Datumsangabe als fortlaufenden Tag im Jahr zurück, vor oder nach einer bestimmten Anzahl von Arbeitstagen. Nicht zu den Arbeitstagen gezählt werden Wochenenden sowie die Tage, die als Ferien (\"Freie_Tage\") angegeben sind. ARBEITSTAG ermöglicht es Ihnen, Wochenenden oder Ferien auszuschließen, wenn Sie Fälligkeitstermine für Rechnungen, zu erwartende Lieferzeiten oder die Anzahl bereits verstrichener Arbeitstage berechnen möchten.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/workday-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Erforderlich. Ein Datum, das das Ausgangsdatum angibt"
			},
			days: {
				name: "days",
				detail: "Erforderlich. Die Anzahl der nicht auf ein Wochenende oder auf einen Feiertag fallenden Tage vor oder nach dem \"Ausgangsdatum\". Ein positiver Wert für \"Tage\" bedeutet ein zukünftiges Datum, und ein negativer Wert ergibt ein zurückliegendes Datum."
			},
			holidays: {
				name: "holidays",
				detail: "Optional. Eine optionale Liste einer oder mehrerer Datumsangaben, die alle Arten von arbeitsfreien Tagen repräsentieren kann, die aus dem Arbeitskalender ausgeschlossen werden sollen, beispielsweise staatliche oder regionale Feiertage und Freischichten. Bei der Liste kann es sich um einen Zellbereich, der die Datumsangaben enthält, oder um eine Matrixkonstante der fortlaufenden Zahlen handeln, die die Datumsangaben darstellen."
			}
		}
	},
	WORKDAY_INTL: {
		description: "Diese Funktion gibt die fortlaufende Nummer des Datums vor oder nach einer angegebenen Anzahl von Arbeitstagen mit benutzerdefinierten Wochenendparametern zurück. Optionale Weekend-Parameter können angeben, welche und wie viele Tage Wochenenden sind. Beachten Sie, dass Wochenendtage und alle Tage, die als Feiertage angegeben sind, nicht als Arbeitstage betrachtet werden.",
		abstract: "Diese Funktion gibt die fortlaufende Nummer des Datums vor oder nach einer angegebenen Anzahl von Arbeitstagen mit benutzerdefinierten Wochenendparametern zurück. Optionale Weekend-Parameter können angeben, welche und wie viele Tage Wochenenden sind. Beachten Sie, dass Wochenendtage und alle Tage, die als Feiertage angegeben sind, nicht als Arbeitstage betrachtet werden.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/workday-intl-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Erforderlich. Das auf eine ganze Zahl gekürzte Startdatum"
			},
			days: {
				name: "days",
				detail: "Erforderlich. Die Anzahl der Arbeitstage vor oder nach dem start_date. Ein positiver Wert ergibt ein zukünftiges Datum; ein negativer Wert ergibt ein vergangenes Datum; ein Nullwert ergibt die bereits angegebene start_date. Der Tagoffset wird auf eine ganze Zahl abgeschnitten."
			},
			weekend: {
				name: "weekend",
				detail: "Optional. Wenn verwendet, gibt dies die Wochentage an, die Wochenenden sind und nicht als Arbeitstage gelten. Das Weekend-Argument ist eine Wochenendnummer oder eine Zeichenfolge, die angibt, wann Wochenenden auftreten. Die Werte für die Anzahl von Wochenenden geben die Wochenenden an, wie unten dargestellt."
			},
			holidays: {
				name: "holidays",
				detail: "Dies ist ein optionales Argument am Ende der Syntax. Es gibt einen optionalen Satz von einem oder mehreren Datumsangaben an, die aus dem Arbeitstagkalender ausgeschlossen werden sollen. Feiertage müssen ein Zellbereich sein, der die Datumsangaben enthält – oder eine Arraykonstante der seriellen Werte, die diese Datumsangaben darstellen. Die Reihenfolge von Datumsangaben oder seriellen Werten in Feiertagen kann beliebig sein."
			}
		}
	},
	YEAR: {
		description: "Wandelt eine fortlaufende Zahl in eine Jahreszahl um. Das Jahr wird als ganze Zahl zurückgegeben, die einen Wert von 1900 bis 9999 annehmen kann.",
		abstract: "Wandelt eine fortlaufende Zahl in eine Jahreszahl um. Das Jahr wird als ganze Zahl zurückgegeben, die einen Wert von 1900 bis 9999 annehmen kann.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/year-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Erforderlich. Das Datum des Jahres, das Sie suchen möchten. Datumsangaben sollten mit der Funktion DATUM oder als Ergebnis anderer Formeln oder Funktionen eingegeben werden. Verwenden Sie beispielsweise DATE(2025,5,23) für den 23. Mai 2025. Probleme können auftreten, wenn Datumsangaben als Text eingegeben werden."
		} }
	},
	YEARFRAC: {
		description: "BRTEILJAHRE wandelt die Anzahl der ganzen Tage zwischen Ausgangsdatum und Enddatum in Bruchteile von Jahren um. Sie können BRTEILJAHRE beispielsweise verwenden, um Laufzeiten von Forderungen oder Verbindlichkeiten besser miteinander zu vergleichen.",
		abstract: "BRTEILJAHRE wandelt die Anzahl der ganzen Tage zwischen Ausgangsdatum und Enddatum in Bruchteile von Jahren um. Sie können BRTEILJAHRE beispielsweise verwenden, um Laufzeiten von Forderungen oder Verbindlichkeiten besser miteinander zu vergleichen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/yearfrac-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Ein Datum, das das Startdatum darstellt."
			},
			endDate: {
				name: "end_date",
				detail: "Ein Datum, das das Enddatum darstellt."
			},
			basis: {
				name: "basis",
				detail: "Der zu verwendende Typ der Zinstageberechnung."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/engineering/de-DE.ts
const locale$10 = {
	BESSELI: {
		description: "Gibt die modifizierte Besselfunktion In(x) zurück, die der für rein imaginäre Argumente ausgewerteten Besselfunktion Jn entspricht.",
		abstract: "Gibt die modifizierte Besselfunktion In(x) zurück, die der für rein imaginäre Argumente ausgewerteten Besselfunktion Jn entspricht.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/besseli-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "Erforderlich. Der Wert, für den die Funktion ausgewertet werden soll"
			},
			n: {
				name: "N",
				detail: "Erforderlich. Die Ordnung der Besselfunktion. Ist \"n\" keine ganze Zahl, werden deren Nachkommastellen abgeschnitten."
			}
		}
	},
	BESSELJ: {
		description: "Gibt die Besselfunktion Jn(x) zurück.",
		abstract: "Gibt die Besselfunktion Jn(x) zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/besselj-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "Erforderlich. Der Wert, für den die Funktion ausgewertet werden soll"
			},
			n: {
				name: "N",
				detail: "Erforderlich. Die Ordnung der Besselfunktion. Ist \"n\" keine ganze Zahl, werden deren Nachkommastellen abgeschnitten."
			}
		}
	},
	BESSELK: {
		description: "Gibt die modifizierte Besselfunktion Kn(x) zurück, die den für rein imaginäre Argumente ausgewerteten Besselfunktionen Jn und Yn entspricht.",
		abstract: "Gibt die modifizierte Besselfunktion Kn(x) zurück, die den für rein imaginäre Argumente ausgewerteten Besselfunktionen Jn und Yn entspricht.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/besselk-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "Erforderlich. Der Wert, für den die Funktion ausgewertet werden soll"
			},
			n: {
				name: "N",
				detail: "Erforderlich. Die Ordnung der Funktion. Ist \"n\" keine ganze Zahl, werden deren Nachkommastellen abgeschnitten."
			}
		}
	},
	BESSELY: {
		description: "Gibt die Besselfunktion Yn(x) zurück, die auch als Webersche Funktion oder Neumannsche Funktion bezeichnet wird.",
		abstract: "Gibt die Besselfunktion Yn(x) zurück, die auch als Webersche Funktion oder Neumannsche Funktion bezeichnet wird.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/bessely-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "Erforderlich. Der Wert, für den die Funktion ausgewertet werden soll"
			},
			n: {
				name: "N",
				detail: "Erforderlich. Die Ordnung der Funktion. Ist \"n\" keine ganze Zahl, werden deren Nachkommastellen abgeschnitten."
			}
		}
	},
	BIN2DEC: {
		description: "Wandelt eine binäre Zahl (Dualzahl) in eine dezimale Zahl um.",
		abstract: "Wandelt eine binäre Zahl (Dualzahl) in eine dezimale Zahl um.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/bin2dec-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich. Die binäre Zahl, die Sie konvertieren möchten. Die Zahl darf nicht mehr als 10 Zeichen (10 Bits) enthalten. Das wichtigste Bit der Zahl ist das Vorzeichenbit. Die verbleibenden 9 Bits sind Magnitude-Bits. Negative Zahlen werden mit der Komplementnotation von zwei dargestellt."
		} }
	},
	BIN2HEX: {
		description: "Wandelt eine binäre Zahl (Dualzahl) in eine hexadezimale Zahl um.",
		abstract: "Wandelt eine binäre Zahl (Dualzahl) in eine hexadezimale Zahl um.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/bin2hex-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Die binäre Zahl, die Sie konvertieren möchten. Die Zahl darf nicht mehr als 10 Zeichen (10 Bits) enthalten. Das wichtigste Bit der Zahl ist das Vorzeichenbit. Die verbleibenden 9 Bits sind Magnitude-Bits. Negative Zahlen werden mit der Komplementnotation von zwei dargestellt."
			},
			places: {
				name: "places",
				detail: "Optional. Gibt an, wie viele Zeichen angezeigt werden sollen. Wenn Orte weggelassen werden, verwendet BIN2HEX die erforderliche Mindestanzahl von Zeichen. Das Argument Stellen ist speziell dann hilfreich, wenn der jeweilige Rückgabewert mit führenden Nullen aufgefüllt werden soll."
			}
		}
	},
	BIN2OCT: {
		description: "Wandelt eine binäre Zahl (Dualzahl) in eine oktale Zahl um.",
		abstract: "Wandelt eine binäre Zahl (Dualzahl) in eine oktale Zahl um.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/bin2oct-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Die binäre Zahl, die Sie konvertieren möchten. Die Zahl darf nicht mehr als 10 Zeichen (10 Bits) enthalten. Das wichtigste Bit der Zahl ist das Vorzeichenbit. Die verbleibenden 9 Bits sind Magnitude-Bits. Negative Zahlen werden mit der Komplementnotation von zwei dargestellt."
			},
			places: {
				name: "places",
				detail: "Optional. Gibt an, wie viele Zeichen angezeigt werden sollen. Wenn Orte weggelassen werden, verwendet BIN2OCT die erforderliche Mindestanzahl von Zeichen. Das Argument Stellen ist speziell dann hilfreich, wenn der jeweilige Rückgabewert mit führenden Nullen aufgefüllt werden soll."
			}
		}
	},
	BITAND: {
		description: "Gibt ein bitweises UND zweier Zahlen zurück.",
		abstract: "Gibt ein bitweises UND zweier Zahlen zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/bitand-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Erforderlich. Muss in dezimaler Form vorliegen und größer gleich 0 sein."
			},
			number2: {
				name: "number2",
				detail: "Erforderlich. Muss in dezimaler Form vorliegen und größer gleich 0 sein."
			}
		}
	},
	BITLSHIFT: {
		description: "Gibt die Zahl zurück, die sich ergibt, nachdem die angegebene Zahl um die angegebene Anzahl von Bits nach links verschoben wurde.",
		abstract: "Gibt die Zahl zurück, die sich ergibt, nachdem die angegebene Zahl um die angegebene Anzahl von Bits nach links verschoben wurde.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/bitlshift-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. \"Zahl\" muss eine ganze Zahl sein, die größer gleich 0 ist."
			},
			shiftAmount: {
				name: "shift_amount",
				detail: "Erforderlich. \"Verschiebebetrag\" muss eine ganze Zahl sein."
			}
		}
	},
	BITOR: {
		description: "Gibt ein bitweises ODER zweier Zahlen zurück.",
		abstract: "Gibt ein bitweises ODER zweier Zahlen zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/bitor-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Erforderlich. Muss in dezimaler Form vorliegen und größer gleich 0 sein."
			},
			number2: {
				name: "number2",
				detail: "Erforderlich. Muss in dezimaler Form vorliegen und größer gleich 0 sein."
			}
		}
	},
	BITRSHIFT: {
		description: "Gibt die Zahl zurück, die sich ergibt, nachdem die angegebene Zahl um die angegebene Anzahl von Bits nach rechts verschoben wurde.",
		abstract: "Gibt die Zahl zurück, die sich ergibt, nachdem die angegebene Zahl um die angegebene Anzahl von Bits nach rechts verschoben wurde.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/bitrshift-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Muss eine ganze Zahl sein, die größer gleich 0 ist."
			},
			shiftAmount: {
				name: "shift_amount",
				detail: "Erforderlich. Muss eine ganze Zahl sein."
			}
		}
	},
	BITXOR: {
		description: "Gibt ein bitweises XODER zweier Zahlen zurück.",
		abstract: "Gibt ein bitweises XODER zweier Zahlen zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/bitxor-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Erforderlich. Muss größer gleich 0 sein."
			},
			number2: {
				name: "number2",
				detail: "Erforderlich. Muss größer gleich 0 sein."
			}
		}
	},
	COMPLEX: {
		description: "Wandelt den Real- und Imaginärteil in eine komplexe Zahl um (x + yi oder x + yj).",
		abstract: "Wandelt den Real- und Imaginärteil in eine komplexe Zahl um (x + yi oder x + yj).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/complex-function"
		}],
		functionParameter: {
			realNum: {
				name: "real_num",
				detail: "Erforderlich. Der Realteil der komplexen Zahl."
			},
			iNum: {
				name: "i_num",
				detail: "Erforderlich. Der Imaginärteil der komplexen Zahl."
			},
			suffix: {
				name: "suffix",
				detail: "Optional. Der Buchstabe, der für die imaginäre Einheit der komplexen Zahl verwendet werden soll. Fehlt das Argument \"Suffix\", wird es als \"i\" angenommen."
			}
		}
	},
	CONVERT: {
		description: "Wandelt eine Zahl aus einem Maßsystem in ein anderes um. Beispielsweise kann UMWANDELN eine Tabelle mit Entfernungen in Meilen in eine Tabelle mit Entfernungen in Kilometern umwandeln.",
		abstract: "Wandelt eine Zahl aus einem Maßsystem in ein anderes um. Beispielsweise kann UMWANDELN eine Tabelle mit Entfernungen in Meilen in eine Tabelle mit Entfernungen in Kilometern umwandeln.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/convert-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Der Wert in from_unit, der umgewandelt werden soll."
			},
			fromUnit: {
				name: "from_unit",
				detail: "Die Einheit für number."
			},
			toUnit: {
				name: "to_unit",
				detail: "Die Einheit für das Ergebnis."
			}
		}
	},
	DEC2BIN: {
		description: "Wandelt eine dezimale Zahl in eine binäre Zahl (Dualzahl) um.",
		abstract: "Wandelt eine dezimale Zahl in eine binäre Zahl (Dualzahl) um.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/dec2bin-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Die dezimale ganzzahlige Zahl, die Sie konvertieren möchten. Wenn number negativ ist, werden gültige Ortswerte ignoriert, und DEC2BIN gibt eine 10-stellige Binärzahl (10 Bit) zurück, bei der das wichtigste Bit das Vorzeichenbit ist. Die verbleibenden 9 Bits sind Magnitude-Bits. Negative Zahlen werden mit der Komplementnotation von zwei dargestellt."
			},
			places: {
				name: "places",
				detail: "Optional. Gibt an, wie viele Zeichen angezeigt werden sollen. Wenn Orte weggelassen werden, verwendet DEC2BIN die erforderliche Mindestanzahl von Zeichen. Das Argument Stellen ist speziell dann hilfreich, wenn der jeweilige Rückgabewert mit führenden Nullen aufgefüllt werden soll."
			}
		}
	},
	DEC2HEX: {
		description: "Wandelt eine dezimale Zahl in eine hexadezimale Zahl um.",
		abstract: "Wandelt eine dezimale Zahl in eine hexadezimale Zahl um.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/dec2hex-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Die dezimale ganzzahlige Zahl, die Sie konvertieren möchten. Wenn number negativ ist, werden Orte ignoriert, und DEC2HEX gibt eine hexadezimale Zahl mit 10 Zeichen (40 Bit) zurück, bei der das signifikanteste Bit das Vorzeichenbit ist. Die verbleibenden 39 Bits sind Magnitude-Bits. Negative Zahlen werden mit der Komplementnotation von zwei dargestellt."
			},
			places: {
				name: "places",
				detail: "Optional. Gibt an, wie viele Zeichen angezeigt werden sollen. Wenn Orte weggelassen werden, verwendet DEC2HEX die erforderliche Mindestanzahl von Zeichen. Das Argument Stellen ist speziell dann hilfreich, wenn der jeweilige Rückgabewert mit führenden Nullen aufgefüllt werden soll."
			}
		}
	},
	DEC2OCT: {
		description: "Wandelt eine dezimale Zahl in eine oktale Zahl um.",
		abstract: "Wandelt eine dezimale Zahl in eine oktale Zahl um.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/dec2oct-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Die dezimale ganzzahlige Zahl, die Sie konvertieren möchten. Wenn number negativ ist, werden Orte ignoriert, und DEC2OCT gibt eine 10-stellige (30-Bit)-Oktalzahl zurück, bei der das wichtigste Bit das Vorzeichenbit ist. Die verbleibenden 29 Bits sind Magnitude-Bits. Negative Zahlen werden mit der Komplementnotation von zwei dargestellt."
			},
			places: {
				name: "places",
				detail: "Optional. Gibt an, wie viele Zeichen angezeigt werden sollen. Fehlt das Argument \"Stellen\", verwendet DEZINOKT nicht mehr Zeichen, als unbedingt erforderlich sind. Das Argument Stellen ist speziell dann hilfreich, wenn der jeweilige Rückgabewert mit führenden Nullen aufgefüllt werden soll."
			}
		}
	},
	DELTA: {
		description: "Testet, ob zwei Werte gleich sind. Gibt 1 zurück, wenn Zahl1 = Zahl2; gibt andernfalls 0 zurück. Mit dieser Funktion können Sie eine Gruppe von Werten filtern. Wenn Sie beispielsweise mehrere DELTA-Funktionen addieren, berechnen Sie die Anzahl der gleichen Paare. Diese Funktion wird auch als Kronecker Delta-Funktion bezeichnet.",
		abstract: "Testet, ob zwei Werte gleich sind. Gibt 1 zurück, wenn Zahl1 = Zahl2; gibt andernfalls 0 zurück. Mit dieser Funktion können Sie eine Gruppe von Werten filtern. Wenn Sie beispielsweise mehrere DELTA-Funktionen addieren, berechnen Sie die Anzahl der gleichen Paare. Diese Funktion wird auch als Kronecker Delta-Funktion bezeichnet.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/delta-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Erforderlich. Die erste Zahl."
			},
			number2: {
				name: "number2",
				detail: "Optional. Die zweite Zahl. Fehlt das Argument \"Zahl2\", wird es als 0 angenommen."
			}
		}
	},
	ERF: {
		description: "Gibt die Gauß'sche Fehlerfunktion zurück.",
		abstract: "Gibt die Gauß'sche Fehlerfunktion zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/erf-function"
		}],
		functionParameter: {
			lowerLimit: {
				name: "lower_limit",
				detail: "Erforderlich. Die untere Grenze für die Integration in GAUSSFEHLER."
			},
			upperLimit: {
				name: "upper_limit",
				detail: "Optional. Die obere Grenze für die Integration in GAUSSFEHLER. Fehlt dieses Argument, integriert GAUSSFEHLER von 0 (Null) bis \"Untere_Grenze\"."
			}
		}
	},
	ERF_PRECISE: {
		description: "Gibt die Fehlerfunktion zurück.",
		abstract: "Gibt die Fehlerfunktion zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/erf-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Erforderlich. Die untere Grenze für die Integration in GAUSSF.GENAU."
		} }
	},
	ERFC: {
		description: "Gibt das Komplement zur Funktion GAUSSFEHLER integriert zwischen x und Unendlichkeit zurück",
		abstract: "Gibt das Komplement zur Funktion GAUSSFEHLER integriert zwischen x und Unendlichkeit zurück",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/erfc-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Erforderlich. Die untere Grenze für die Integration in GAUSSFKOMPL."
		} }
	},
	ERFC_PRECISE: {
		description: "Gibt das Komplement zur Funktion GAUSSFEHLER integriert zwischen x und Unendlichkeit zurück",
		abstract: "Gibt das Komplement zur Funktion GAUSSFEHLER integriert zwischen x und Unendlichkeit zurück",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/erfc-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Erforderlich. Die untere Grenze für die Integration in GAUSSFKOMPL.GENAU."
		} }
	},
	GESTEP: {
		description: "Gibt den Wert 1 zurück, wenn Zahl ≥ Schritt gilt; andernfalls gibt sie 0 (Null) zurück. Mit dieser Funktion können Sie eine Gruppe von Werten filtern. Beispielsweise können Sie durch Aufsummieren mehrerer GGANZZAHL-Funktionen berechnen, wie viele Werte größer sind als ein Schwellenwert.",
		abstract: "Gibt den Wert 1 zurück, wenn Zahl ≥ Schritt gilt; andernfalls gibt sie 0 (Null) zurück. Mit dieser Funktion können Sie eine Gruppe von Werten filtern. Beispielsweise können Sie durch Aufsummieren mehrerer GGANZZAHL-Funktionen berechnen, wie viele Werte größer sind als ein Schwellenwert.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/gestep-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Der Wert, der gegen \"Schritt\" geprüft werden soll."
			},
			step: {
				name: "step",
				detail: "Optional. Der Schwellenwert. Wenn Sie für \"Schritt\" keinen Wert angeben, arbeitet GGANZZAHL mit 0."
			}
		}
	},
	HEX2BIN: {
		description: "Wandelt eine hexadezimale Zahl in eine Binärzahl um.",
		abstract: "Wandelt eine hexadezimale Zahl in eine Binärzahl um.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/hex2bin-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Die hexadezimale Zahl, die Sie konvertieren möchten. Die Zahl darf nicht mehr als 10 Zeichen enthalten. Das wichtigste Bit der Zahl ist das Vorzeichenbit (40. Bit von rechts). Die verbleibenden 9 Bits sind Magnitude-Bits. Negative Zahlen werden mit der Komplementnotation von zwei dargestellt."
			},
			places: {
				name: "places",
				detail: "Optional. Gibt an, wie viele Zeichen angezeigt werden sollen. Wenn Orte weggelassen werden, verwendet HEX2BIN die erforderliche Mindestanzahl von Zeichen. Das Argument Stellen ist speziell dann hilfreich, wenn der jeweilige Rückgabewert mit führenden Nullen aufgefüllt werden soll."
			}
		}
	},
	HEX2DEC: {
		description: "Wandelt eine hexadezimale Zahl in eine dezimale Zahl um.",
		abstract: "Wandelt eine hexadezimale Zahl in eine dezimale Zahl um.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/hex2dec-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich. Die hexadezimale Zahl, die Sie konvertieren möchten. Die Zahl darf nicht mehr als 10 Zeichen (40 Bits) enthalten. Das wichtigste Bit der Zahl ist das Vorzeichenbit. Die verbleibenden 39 Bits sind Magnitude-Bits. Negative Zahlen werden mit der Komplementnotation von zwei dargestellt."
		} }
	},
	HEX2OCT: {
		description: "Wandelt eine hexadezimale Zahl in eine Oktalzahl um.",
		abstract: "Wandelt eine hexadezimale Zahl in eine Oktalzahl um.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/hex2oct-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Die hexadezimale Zahl, die Sie konvertieren möchten. Die Zahl darf nicht mehr als 10 Zeichen enthalten. Das wichtigste Bit der Zahl ist das Vorzeichenbit. Die verbleibenden 39 Bits sind Magnitude-Bits. Negative Zahlen werden mit der Komplementnotation von zwei dargestellt."
			},
			places: {
				name: "places",
				detail: "Optional. Gibt an, wie viele Zeichen angezeigt werden sollen. Wenn Orte weggelassen werden, verwendet HEX2OCT die erforderliche Mindestanzahl von Zeichen. Das Argument Stellen ist speziell dann hilfreich, wenn der jeweilige Rückgabewert mit führenden Nullen aufgefüllt werden soll."
			}
		}
	},
	IMABS: {
		description: "Gibt den Absolutwert (Modul) einer komplexen Zahl zurück. Akzeptiert werden Zeichenfolgen der Form x + yi oder x + yj.",
		abstract: "Gibt den Absolutwert (Modul) einer komplexen Zahl zurück. Akzeptiert werden Zeichenfolgen der Form x + yi oder x + yj.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/imabs-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Erforderlich. Die komplexe Zahl, deren Absolutwert Sie berechnen möchten."
		} }
	},
	IMAGINARY: {
		description: "Gibt den Imaginärteil einer komplexen Zahl zurück, die als Zeichenfolge der Form x + yi oder x + yj vorliegt.",
		abstract: "Gibt den Imaginärteil einer komplexen Zahl zurück, die als Zeichenfolge der Form x + yi oder x + yj vorliegt.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/imaginary-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Erforderlich. Die komplexe Zahl, deren Imaginärteil Sie ermitteln möchten."
		} }
	},
	IMARGUMENT: {
		description: "Gibt das Argument (Theta) zurück, ein im Bogenmaß ausgedrückter Winkel, sodass:",
		abstract: "Gibt das Argument (Theta) zurück, ein im Bogenmaß ausgedrückter Winkel, sodass:",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/imargument-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Erforderlich. Eine komplexe Zahl, für die das Argument soll."
		} }
	},
	IMCONJUGATE: {
		description: "Gibt die konjugiert komplexe Zahl zu einer komplexen Zahl zurück, wobei die komplexe Zahl als Zeichenfolge der Form x + yi oder x + yj eingegeben wird.",
		abstract: "Gibt die konjugiert komplexe Zahl zu einer komplexen Zahl zurück, wobei die komplexe Zahl als Zeichenfolge der Form x + yi oder x + yj eingegeben wird.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/imconjugate-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Erforderlich. Die komplexe Zahl, deren konjugierte komplexe Zahl Sie erzeugen möchten"
		} }
	},
	IMCOS: {
		description: "Gibt den Kosinus einer komplexen Zahl zurück, die als Zeichenfolge der Form x + yi oder x + yj vorliegt.",
		abstract: "Gibt den Kosinus einer komplexen Zahl zurück, die als Zeichenfolge der Form x + yi oder x + yj vorliegt.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/imcos-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Erforderlich. Die komplexe Zahl, deren Kosinus Sie berechnen möchten"
		} }
	},
	IMCOSH: {
		description: "Gibt den hyperbolischen Kosinus einer komplexen Zahl im Textformat x+yi oder x+yj zurück.",
		abstract: "Gibt den hyperbolischen Kosinus einer komplexen Zahl im Textformat x+yi oder x+yj zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/imcosh-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Erforderlich. Die komplexe Zahl, deren hyperbolischen Kosinus Sie berechnen möchten."
		} }
	},
	IMCOT: {
		description: "Gibt den Kotangens einer komplexen Zahl im Textformat x+yi oder x+yj zurück.",
		abstract: "Gibt den Kotangens einer komplexen Zahl im Textformat x+yi oder x+yj zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/imcot-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Eine komplexe Zahl, deren Kotangens Sie berechnen möchten."
		} }
	},
	IMCOTH: {
		description: "Die Funktion IMCOTH gibt den hyperbolischen Kotangens der angegebenen komplexen Zahl zurück. Beispielsweise gibt die komplexe Zahl „x+yi“ den Wert „coth(x+yi)“ zurück.",
		abstract: "Die Funktion IMCOTH gibt den hyperbolischen Kotangens der angegebenen komplexen Zahl zurück. Beispielsweise gibt die komplexe Zahl „x+yi“ den Wert „coth(x+yi)“ zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9366256?hl=de"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Die komplexe Zahl, deren hyperbolischen Kotangens Sie berechnen möchten. Dies kann das Ergebnis der Funktion COMPLEX, eine als komplexe Zahl mit dem Imaginärteil 0 interpretierte reelle Zahl oder eine Zeichenfolge im Format „x+yi“ sein, wobei x und y Zahlen sind."
		} }
	},
	IMCSC: {
		description: "Gibt den Kosekans einer komplexen Zahl im Textformat \"x+yi\" oder \"x+yj\" zurück.",
		abstract: "Gibt den Kosekans einer komplexen Zahl im Textformat \"x+yi\" oder \"x+yj\" zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/imcsc-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Erforderlich. Die komplexe Zahl, deren Kosekans Sie berechnen möchten"
		} }
	},
	IMCSCH: {
		description: "Gibt den hyperbolischen Koseant einer komplexen Zahl im Textformat x+yi oder x+yj zurück.",
		abstract: "Gibt den hyperbolischen Koseant einer komplexen Zahl im Textformat x+yi oder x+yj zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/imcsch-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Erforderlich. Die komplexe Zahl, deren hyperbolischen Kosekans Sie berechnen möchten"
		} }
	},
	IMDIV: {
		description: "Gibt den Quotient zweier komplexer Zahlen zurück, die beide als Zeichenfolgen der Form x + yi oder x + yj erwartet werden.",
		abstract: "Gibt den Quotient zweier komplexer Zahlen zurück, die beide als Zeichenfolgen der Form x + yi oder x + yj erwartet werden.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/imdiv-function"
		}],
		functionParameter: {
			inumber1: {
				name: "inumber1",
				detail: "Erforderlich. Der komplexe Zähler oder Dividend"
			},
			inumber2: {
				name: "inumber2",
				detail: "Erforderlich. Der komplexe Nenner oder Divisor"
			}
		}
	},
	IMEXP: {
		description: "Gibt die algebraische Form einer in exponentieller Form vorliegenden komplexen Zahl zurück, wobei deren Exponent als Zeichenfolge der Form x + yi oder x + yj eingegeben wird.",
		abstract: "Gibt die algebraische Form einer in exponentieller Form vorliegenden komplexen Zahl zurück, wobei deren Exponent als Zeichenfolge der Form x + yi oder x + yj eingegeben wird.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/imexp-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Erforderlich. Die komplexe Zahl, die den Exponent der in exponentieller Form vorliegenden komplexen Zahl angibt"
		} }
	},
	IMLN: {
		description: "Gibt den natürlichen Logarithmus einer komplexen Zahl zurück, die als Zeichenfolge der Form x + yi oder x + yj eingegeben wird.",
		abstract: "Gibt den natürlichen Logarithmus einer komplexen Zahl zurück, die als Zeichenfolge der Form x + yi oder x + yj eingegeben wird.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/imln-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Erforderlich. Die komplexe Zahl, deren natürlichen Logarithmus Sie berechnen möchten"
		} }
	},
	IMLOG: {
		description: "Die Funktion IMLOG gibt den Logarithmus einer komplexen Zahl zu einer angegebenen Basis zurück.",
		abstract: "Die Funktion IMLOG gibt den Logarithmus einer komplexen Zahl zu einer angegebenen Basis zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9366486?hl=de"
		}],
		functionParameter: {
			inumber: {
				name: "inumber",
				detail: "Der Eingabewert der Logarithmusfunktion. Die Zahl kann als einfache Zahl, z. B. 1, geschrieben werden und wird dann als reelle Zahl interpretiert. Sie kann auch als Text in Anführungszeichen geschrieben werden, um Real- und Imaginärteil anzugeben."
			},
			base: {
				name: "base",
				detail: "Die Basis für die Berechnung des Logarithmus. Sie muss eine positive reelle Zahl sein."
			}
		}
	},
	IMLOG10: {
		description: "Gibt den Logarithmus einer komplexen Zahl zur Basis 10 zurück, die als Zeichenfolge der Form x + yi oder x + yj eingegeben wird.",
		abstract: "Gibt den Logarithmus einer komplexen Zahl zur Basis 10 zurück, die als Zeichenfolge der Form x + yi oder x + yj eingegeben wird.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/imlog10-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Erforderlich. Die komplexe Zahl, deren gewöhnlichen (dekadischen) Logarithmus Sie berechnen möchten"
		} }
	},
	IMLOG2: {
		description: "Gibt den Logarithmus einer komplexen Zahl zur Basis 2 zurück, die als Zeichenfolge der Form x + yi oder x + yj eingegeben wird.",
		abstract: "Gibt den Logarithmus einer komplexen Zahl zur Basis 2 zurück, die als Zeichenfolge der Form x + yi oder x + yj eingegeben wird.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/imlog2-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Erforderlich. Die komplexe Zahl, deren Zweierlogarithmus Sie berechnen möchten"
		} }
	},
	IMPOWER: {
		description: "Potenziert eine komplexe Zahl, die als Zeichenfolge der Form x + yi oder x + yj vorliegt, mit einer ganzen Zahl.",
		abstract: "Potenziert eine komplexe Zahl, die als Zeichenfolge der Form x + yi oder x + yj vorliegt, mit einer ganzen Zahl.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/impower-function"
		}],
		functionParameter: {
			inumber: {
				name: "inumber",
				detail: "Erforderlich. Die komplexe Zahl, die Sie in eine Potenz erheben möchten"
			},
			number: {
				name: "number",
				detail: "Erforderlich. Der Exponent, mit dem Sie die komplexe Zahl potenzieren möchten"
			}
		}
	},
	IMPRODUCT: {
		description: "Gibt das Produkt der komplexen Zahlen 1 bis 255 zurück, die beide als Zeichenfolgen der Form x + yi oder x + yj erwartet werden.",
		abstract: "Gibt das Produkt der komplexen Zahlen 1 bis 255 zurück, die beide als Zeichenfolgen der Form x + yi oder x + yj erwartet werden.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/improduct-function"
		}],
		functionParameter: {
			inumber1: {
				name: "inumber1",
				detail: "\"Komplexe_Zahl1\" ist erforderlich, die weiteren nicht. 1 bis 255 komplexe Zahlen, die multipliziert werden sollen."
			},
			inumber2: {
				name: "inumber2",
				detail: "\"Komplexe_Zahl1\" ist erforderlich, die weiteren nicht. 1 bis 255 komplexe Zahlen, die multipliziert werden sollen."
			}
		}
	},
	IMREAL: {
		description: "Gibt den Realteil einer komplexen Zahl zurück, die als Zeichenfolge der Form x + yi oder x + yj eingegeben wird.",
		abstract: "Gibt den Realteil einer komplexen Zahl zurück, die als Zeichenfolge der Form x + yi oder x + yj eingegeben wird.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/imreal-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Erforderlich. Die komplexe Zahl, deren Realteil Sie ermitteln möchten"
		} }
	},
	IMSEC: {
		description: "Gibt den Sekans einer komplexen Zahl im Textformat x+yi oder x+yj zurück.",
		abstract: "Gibt den Sekans einer komplexen Zahl im Textformat x+yi oder x+yj zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/imsec-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Erforderlich. Die komplexe Zahl, deren Sekans Sie berechnen möchten"
		} }
	},
	IMSECH: {
		description: "Gibt den hyperbolischen Sekans einer komplexen Zahl im Textformat x+yi oder x+yj zurück.",
		abstract: "Gibt den hyperbolischen Sekans einer komplexen Zahl im Textformat x+yi oder x+yj zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/imsech-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Erforderlich. Die komplexe Zahl, deren hyperbolischen Sekans Sie berechnen möchten"
		} }
	},
	IMSIN: {
		description: "Diese Funktion gibt den Sinus einer komplexen Zahl zurück, die als Zeichenfolge der Form x + yi oder x + yj eingegeben wird.",
		abstract: "Diese Funktion gibt den Sinus einer komplexen Zahl zurück, die als Zeichenfolge der Form x + yi oder x + yj eingegeben wird.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/imsin-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Erforderlich. Die komplexe Zahl, deren Sinus Sie berechnen möchten"
		} }
	},
	IMSINH: {
		description: "Die FUNKTION IMSINH gibt den hyperbolischen Sinus einer komplexen Zahl im Textformat x+yi oder x+yj zurück.",
		abstract: "Die FUNKTION IMSINH gibt den hyperbolischen Sinus einer komplexen Zahl im Textformat x+yi oder x+yj zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/imsinh-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Erforderlich. Die komplexe Zahl, deren hyperbolischen Sinus Sie berechnen möchten"
		} }
	},
	IMSQRT: {
		description: "Gibt die Quadratwurzel einer komplexen Zahl zurück, die als Zeichenfolge der Form x + yi oder x + yj eingegeben wird.",
		abstract: "Gibt die Quadratwurzel einer komplexen Zahl zurück, die als Zeichenfolge der Form x + yi oder x + yj eingegeben wird.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/imsqrt-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Erforderlich. Die komplexe Zahl, deren Quadratwurzel Sie berechnen möchten"
		} }
	},
	IMSUB: {
		description: "Gibt die Differenz zweier komplexer Zahlen zurück, die beide als Zeichenfolgen der Form x + yi oder x + yj erwartet werden.",
		abstract: "Gibt die Differenz zweier komplexer Zahlen zurück, die beide als Zeichenfolgen der Form x + yi oder x + yj erwartet werden.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/imsub-function"
		}],
		functionParameter: {
			inumber1: {
				name: "inumber1",
				detail: "Erforderlich. Die komplexe Zahl, von der \"Komplexe_Zahl2\" subtrahiert werden soll."
			},
			inumber2: {
				name: "inumber2",
				detail: "Erforderlich. Die komplexe Zahl, die von \"Komplexe_Zahl1\" subtrahiert werden soll."
			}
		}
	},
	IMSUM: {
		description: "Gibt die Summe komplexer Zahlen zurück, die als Zeichenfolgen der Form x + yi oder x + yj erwartet werden.",
		abstract: "Gibt die Summe komplexer Zahlen zurück, die als Zeichenfolgen der Form x + yi oder x + yj erwartet werden.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/imsum-function"
		}],
		functionParameter: {
			inumber1: {
				name: "inumber1",
				detail: "Inumber1 ist erforderlich, nachfolgende Zahlen nicht. 1 bis 255 komplexe Zahlen, die addiert werden sollen."
			},
			inumber2: {
				name: "inumber2",
				detail: "Inumber1 ist erforderlich, nachfolgende Zahlen nicht. 1 bis 255 komplexe Zahlen, die addiert werden sollen."
			}
		}
	},
	IMTAN: {
		description: "Gibt den Tangens einer komplexen Zahl im Textformat x+yi oder x+yj zurück.",
		abstract: "Gibt den Tangens einer komplexen Zahl im Textformat x+yi oder x+yj zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/imtan-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Erforderlich. Die komplexe Zahl, deren Tangens Sie berechnen möchten"
		} }
	},
	IMTANH: {
		description: "Die Funktion IMTANH gibt den hyperbolischen Tangens der angegebenen komplexen Zahl zurück. Beispielsweise gibt die komplexe Zahl „x+yi“ den Wert „tanh(x+yi)“ zurück.",
		abstract: "Die Funktion IMTANH gibt den hyperbolischen Tangens der angegebenen komplexen Zahl zurück. Beispielsweise gibt die komplexe Zahl „x+yi“ den Wert „tanh(x+yi)“ zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9366655?hl=de"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Die komplexe Zahl, deren hyperbolischen Tangens Sie berechnen möchten. Dies kann das Ergebnis der Funktion COMPLEX, eine als komplexe Zahl mit dem Imaginärteil 0 interpretierte reelle Zahl oder eine Zeichenfolge im Format „x+yi“ sein, wobei x und y Zahlen sind."
		} }
	},
	OCT2BIN: {
		description: "Wandelt eine oktale Zahl in eine binäre Zahl (Dualzahl) um.",
		abstract: "Wandelt eine oktale Zahl in eine binäre Zahl (Dualzahl) um.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/oct2bin-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Die oktale Zahl, die Sie konvertieren möchten. Die Zahl darf nicht mehr als 10 Zeichen enthalten. Das wichtigste Bit der Zahl ist das Vorzeichenbit. Die verbleibenden 29 Bits sind Magnitude-Bits. Negative Zahlen werden mit der Komplementnotation von zwei dargestellt."
			},
			places: {
				name: "places",
				detail: "Optional. Gibt an, wie viele Zeichen angezeigt werden sollen. Wenn Orte weggelassen werden, verwendet OCT2BIN die erforderliche Mindestanzahl von Zeichen. Das Argument Stellen ist speziell dann hilfreich, wenn der jeweilige Rückgabewert mit führenden Nullen aufgefüllt werden soll."
			}
		}
	},
	OCT2DEC: {
		description: "Wandelt eine oktale Zahl in eine dezimale Zahl um.",
		abstract: "Wandelt eine oktale Zahl in eine dezimale Zahl um.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/oct2dec-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich. Die oktale Zahl, die Sie konvertieren möchten. Die Zahl darf nicht mehr als 10 oktale Zeichen (30 Bits) enthalten. Das wichtigste Bit der Zahl ist das Vorzeichenbit. Die verbleibenden 29 Bits sind Magnitude-Bits. Negative Zahlen werden mit der Komplementnotation von zwei dargestellt."
		} }
	},
	OCT2HEX: {
		description: "Wandelt eine oktale Zahl in eine hexadezimale Zahl um.",
		abstract: "Wandelt eine oktale Zahl in eine hexadezimale Zahl um.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/oct2hex-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Die oktale Zahl, die Sie konvertieren möchten. Die Zahl darf nicht mehr als 10 oktale Zeichen (30 Bits) enthalten. Das wichtigste Bit der Zahl ist das Vorzeichenbit. Die verbleibenden 29 Bits sind Magnitude-Bits. Negative Zahlen werden mit der Komplementnotation von zwei dargestellt."
			},
			places: {
				name: "places",
				detail: "Optional. Gibt an, wie viele Zeichen angezeigt werden sollen. Wenn Orte weggelassen werden, verwendet OCT2HEX die erforderliche Mindestanzahl von Zeichen. Das Argument Stellen ist speziell dann hilfreich, wenn der jeweilige Rückgabewert mit führenden Nullen aufgefüllt werden soll."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/financial/de-DE.ts
const locale$9 = {
	ACCRINT: {
		description: "Gibt die aufgelaufenen Zinsen (Stückzinsen) eines Wertpapiers mit periodischen Zinszahlungen zurück.",
		abstract: "Gibt die aufgelaufenen Zinsen (Stückzinsen) eines Wertpapiers mit periodischen Zinszahlungen zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/accrint-function"
		}],
		functionParameter: {
			issue: {
				name: "issue",
				detail: "Erforderlich. Das Datum der Wertpapieremission"
			},
			firstInterest: {
				name: "first_interest",
				detail: "Erforderlich. Der erste Zinstermin des Wertpapiers."
			},
			settlement: {
				name: "settlement",
				detail: "Erforderlich. Der Abrechnungstermin des Wertpapierkaufs. Der Abrechnungstermin des Wertpapierkaufs ist das Datum nach der Wertpapieremission, wenn das Wertpapier in den Besitz des Käufers übergeht."
			},
			rate: {
				name: "rate",
				detail: "Erforderlich. Der jährliche Nominalzins (Kuponzinssatz) des Wertpapiers"
			},
			par: {
				name: "par",
				detail: "Erforderlich. Der Nennwert des Wertpapiers. Wenn Sie keinen Nennwert angeben, verwendet AUFGELZINS den Wert \"1.000 €\"."
			},
			frequency: {
				name: "frequency",
				detail: "Erforderlich. Die Anzahl der Zinszahlungen pro Jahr. Bei jährlichen Zahlungen ist Häufigkeit = 1; bei halbjährlichen ist Häufigkeit = 2; bei vierteljährlichen ist Häufigkeit = 4."
			},
			basis: {
				name: "basis",
				detail: "Optional. Der Typ, auf dessen Basis die Zinstage gezählt werden."
			},
			calcMethod: {
				name: "calc_method",
				detail: "Optional. Ein logischer Wert, der die Methode zum Berechnen des gesamten aufgelaufenen Zinses angibt, wenn das Abrechnungsdatum nach dem Datum der first_interest liegt. Der Wert TRUE (1) gibt die insgesamt aufgelaufenen Zinszahlungen von der Ausgabe bis zur Abrechnung zurück. Ein Wert von FALSE (0) gibt die aufgelaufenen Zinsen von first_interest bis zur Abrechnung zurück. Wenn Sie das Argument nicht eingeben, wird standardmäßig TRUE verwendet."
			}
		}
	},
	ACCRINTM: {
		description: "Liefert die aufgelaufenen Zinsen (Stückzinsen) eines Wertpapiers, die bei Fälligkeit ausgezahlt werden.",
		abstract: "Liefert die aufgelaufenen Zinsen (Stückzinsen) eines Wertpapiers, die bei Fälligkeit ausgezahlt werden.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/accrintm-function"
		}],
		functionParameter: {
			issue: {
				name: "issue",
				detail: "Erforderlich. Das Datum der Wertpapieremission"
			},
			settlement: {
				name: "settlement",
				detail: "Erforderlich. Der Fälligkeitstermin des Wertpapiers."
			},
			rate: {
				name: "rate",
				detail: "Erforderlich. Der jährliche Nominalzins (Kuponzinssatz) des Wertpapiers"
			},
			par: {
				name: "par",
				detail: "Erforderlich. Der Nennwert des Wertpapiers. Wenn Sie keinen Nennwert angeben, verwendet AUFGELZINSF den Wert \"1.000 €\"."
			},
			basis: {
				name: "basis",
				detail: "Optional. Der Typ, auf dessen Basis die Zinstage gezählt werden."
			}
		}
	},
	AMORDEGRC: {
		description: "Gibt die Abschreibung für jeden Abrechnungszeitraum zurück. Diese Funktion wird für das französische Buchhaltungssystem bereitgestellt. Wenn ein Vermögenswert in der Mitte des Abrechnungszeitraums erworben wird, wird die anteilige Abschreibung berücksichtigt. Die Funktion ähnelt AMORLINC, mit der Ausnahme, dass bei der Berechnung abhängig von der Lebensdauer der Vermögenswerte ein Abschreibungskoeffizienten angewendet wird.",
		abstract: "Gibt die Abschreibung für jeden Abrechnungszeitraum zurück. Diese Funktion wird für das französische Buchhaltungssystem bereitgestellt. Wenn ein Vermögenswert in der Mitte des Abrechnungszeitraums erworben wird, wird die anteilige Abschreibung berücksichtigt. Die Funktion ähnelt AMORLINC, mit der Ausnahme, dass bei der Berechnung abhängig von der Lebensdauer der Vermögenswerte ein Abschreibungskoeffizienten angewendet wird.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/amordegrc-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Erforderlich. Die Anschaffungskosten des Anlageguts."
			},
			datePurchased: {
				name: "date_purchased",
				detail: "Erforderlich. Das Anschaffungsdatum des Anlageguts."
			},
			firstPeriod: {
				name: "first_period",
				detail: "Erforderlich. Das Datum des Endes der ersten Periode."
			},
			salvage: {
				name: "salvage",
				detail: "Erforderlich. Der Restwert, den das Anlagegut am Ende der Nutzungsdauer hat."
			},
			period: {
				name: "period",
				detail: "Erforderlich. Die Periode."
			},
			rate: {
				name: "rate",
				detail: "Erforderlich. Der Abschreibungssatz."
			},
			basis: {
				name: "basis",
				detail: "Optional. Die zu verwendende Jahresbasis."
			}
		}
	},
	AMORLINC: {
		description: "Gibt die Abschreibung für jeden Abrechnungszeitraum zurück. Diese Funktion wird für das französische Buchhaltungssystem bereitgestellt. Wenn ein Vermögenswert in der Mitte des Abrechnungszeitraums erworben wird, wird die anteilige Abschreibung berücksichtigt.",
		abstract: "Gibt die Abschreibung für jeden Abrechnungszeitraum zurück. Diese Funktion wird für das französische Buchhaltungssystem bereitgestellt. Wenn ein Vermögenswert in der Mitte des Abrechnungszeitraums erworben wird, wird die anteilige Abschreibung berücksichtigt.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/amorlinc-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Erforderlich. Die Anschaffungskosten des Anlageguts."
			},
			datePurchased: {
				name: "date_purchased",
				detail: "Erforderlich. Das Anschaffungsdatum des Anlageguts."
			},
			firstPeriod: {
				name: "first_period",
				detail: "Erforderlich. Das Datum des Endes der ersten Periode."
			},
			salvage: {
				name: "salvage",
				detail: "Erforderlich. Der Restwert, den das Anlagegut am Ende der Nutzungsdauer hat."
			},
			period: {
				name: "period",
				detail: "Erforderlich. Die Periode."
			},
			rate: {
				name: "rate",
				detail: "Erforderlich. Der Abschreibungssatz."
			},
			basis: {
				name: "basis",
				detail: "Optional. Die zu verwendende Jahresbasis."
			}
		}
	},
	COUPDAYBS: {
		description: "Von der Funktion ZINSTERMTAGVA wird die Anzahl von Tagen ab dem Beginn einer Zinsperiode bis zum Abrechnungstermin zurückgegeben.",
		abstract: "Von der Funktion ZINSTERMTAGVA wird die Anzahl von Tagen ab dem Beginn einer Zinsperiode bis zum Abrechnungstermin zurückgegeben.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/coupdaybs-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Erforderlich. Der Abrechnungstermin des Wertpapierkaufs. Der Abrechnungstermin des Wertpapierkaufs ist das Datum nach der Wertpapieremission, wenn das Wertpapier in den Besitz des Käufers übergeht."
			},
			maturity: {
				name: "maturity",
				detail: "Erforderlich. Der Fälligkeitstermin des Wertpapiers. Dabei handelt es sich um den Zeitpunkt, zu dem das Wertpapier abläuft."
			},
			frequency: {
				name: "frequency",
				detail: "Erforderlich. Die Anzahl der Zinszahlungen pro Jahr. Bei jährlichen Zahlungen ist Häufigkeit = 1; bei halbjährlichen ist Häufigkeit = 2; bei vierteljährlichen ist Häufigkeit = 4."
			},
			basis: {
				name: "basis",
				detail: "Optional. Der Typ, auf dessen Basis die Zinstage gezählt werden."
			}
		}
	},
	COUPDAYS: {
		description: "Gibt die Anzahl der Tage der Zinsperiode zurück, die den Abrechnungstermin einschließt.",
		abstract: "Gibt die Anzahl der Tage der Zinsperiode zurück, die den Abrechnungstermin einschließt.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/coupdays-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Erforderlich. Der Abrechnungstermin des Wertpapierkaufs. Der Abrechnungstermin des Wertpapierkaufs ist das Datum nach der Wertpapieremission, wenn das Wertpapier in den Besitz des Käufers übergeht."
			},
			maturity: {
				name: "maturity",
				detail: "Erforderlich. Der Fälligkeitstermin des Wertpapiers. Dabei handelt es sich um den Zeitpunkt, zu dem das Wertpapier abläuft."
			},
			frequency: {
				name: "frequency",
				detail: "Erforderlich. Die Anzahl der Zinszahlungen pro Jahr. Bei jährlichen Zahlungen ist Häufigkeit = 1; bei halbjährlichen ist Häufigkeit = 2; bei vierteljährlichen ist Häufigkeit = 4."
			},
			basis: {
				name: "basis",
				detail: "Optional. Der Typ, auf dessen Basis die Zinstage gezählt werden."
			}
		}
	},
	COUPDAYSNC: {
		description: "Gibt die Anzahl der Tage vom Abrechnungstermin bis zum nächsten Zinstermin an.",
		abstract: "Gibt die Anzahl der Tage vom Abrechnungstermin bis zum nächsten Zinstermin an.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/coupdaysnc-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Erforderlich. Der Abrechnungstermin des Wertpapierkaufs. Der Abrechnungstermin des Wertpapierkaufs ist das Datum nach der Wertpapieremission, wenn das Wertpapier in den Besitz des Käufers übergeht."
			},
			maturity: {
				name: "maturity",
				detail: "Erforderlich. Der Fälligkeitstermin des Wertpapiers. Dabei handelt es sich um den Zeitpunkt, zu dem das Wertpapier abläuft."
			},
			frequency: {
				name: "frequency",
				detail: "Erforderlich. Die Anzahl der Zinszahlungen pro Jahr. Bei jährlichen Zahlungen ist Häufigkeit = 1; bei halbjährlichen ist Häufigkeit = 2; bei vierteljährlichen ist Häufigkeit = 4."
			},
			basis: {
				name: "basis",
				detail: "Optional. Der Typ, auf dessen Basis die Zinstage gezählt werden."
			}
		}
	},
	COUPNCD: {
		description: "Gibt eine Zahl zurück, die den nächsten Zinstermin nach dem Abrechnungstermin angibt.",
		abstract: "Gibt eine Zahl zurück, die den nächsten Zinstermin nach dem Abrechnungstermin angibt.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/coupncd-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Erforderlich. Der Abrechnungstermin des Wertpapierkaufs. Der Abrechnungstermin des Wertpapierkaufs ist das Datum nach der Wertpapieremission, wenn das Wertpapier in den Besitz des Käufers übergeht."
			},
			maturity: {
				name: "maturity",
				detail: "Erforderlich. Der Fälligkeitstermin des Wertpapiers. Dabei handelt es sich um den Zeitpunkt, zu dem das Wertpapier abläuft."
			},
			frequency: {
				name: "frequency",
				detail: "Erforderlich. Die Anzahl der Zinszahlungen pro Jahr. Bei jährlichen Zahlungen ist Häufigkeit = 1; bei halbjährlichen ist Häufigkeit = 2; bei vierteljährlichen ist Häufigkeit = 4."
			},
			basis: {
				name: "basis",
				detail: "Optional. Der Typ, auf dessen Basis die Zinstage gezählt werden."
			}
		}
	},
	COUPNUM: {
		description: "Gibt die Anzahl der zwischen dem Abrechnungsdatum und dem Fälligkeitsdatum zahlbaren Zinszahlungen an, und zwar aufgerundet zur nächsten ganzzahligen Zinszahlung.",
		abstract: "Gibt die Anzahl der zwischen dem Abrechnungsdatum und dem Fälligkeitsdatum zahlbaren Zinszahlungen an, und zwar aufgerundet zur nächsten ganzzahligen Zinszahlung.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/coupnum-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Erforderlich. Der Abrechnungstermin des Wertpapierkaufs. Der Abrechnungstermin des Wertpapierkaufs ist das Datum nach der Wertpapieremission, wenn das Wertpapier in den Besitz des Käufers übergeht."
			},
			maturity: {
				name: "maturity",
				detail: "Erforderlich. Der Fälligkeitstermin des Wertpapiers. Dabei handelt es sich um den Zeitpunkt, zu dem das Wertpapier abläuft."
			},
			frequency: {
				name: "frequency",
				detail: "Erforderlich. Die Anzahl der Zinszahlungen pro Jahr. Bei jährlichen Zahlungen ist Häufigkeit = 1; bei halbjährlichen ist Häufigkeit = 2; bei vierteljährlichen ist Häufigkeit = 4."
			},
			basis: {
				name: "basis",
				detail: "Optional. Der Typ, auf dessen Basis die Zinstage gezählt werden."
			}
		}
	},
	COUPPCD: {
		description: "Gibt eine Zahl an, die die letzte Zinszahlung vor dem Abrechnungstermin repräsentiert.",
		abstract: "Gibt eine Zahl an, die die letzte Zinszahlung vor dem Abrechnungstermin repräsentiert.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/couppcd-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Erforderlich. Der Abrechnungstermin des Wertpapierkaufs. Der Abrechnungstermin des Wertpapierkaufs ist das Datum nach der Wertpapieremission, wenn das Wertpapier in den Besitz des Käufers übergeht."
			},
			maturity: {
				name: "maturity",
				detail: "Erforderlich. Der Fälligkeitstermin des Wertpapiers. Dabei handelt es sich um den Zeitpunkt, zu dem das Wertpapier abläuft."
			},
			frequency: {
				name: "frequency",
				detail: "Erforderlich. Die Anzahl der Zinszahlungen pro Jahr. Bei jährlichen Zahlungen ist Häufigkeit = 1; bei halbjährlichen ist Häufigkeit = 2; bei vierteljährlichen ist Häufigkeit = 4."
			},
			basis: {
				name: "basis",
				detail: "Optional. Der Typ, auf dessen Basis die Zinstage gezählt werden."
			}
		}
	},
	CUMIPMT: {
		description: "Berechnet die kumulierten Zinsen, die zwischen zwei Perioden zu zahlen sind.",
		abstract: "Berechnet die kumulierten Zinsen, die zwischen zwei Perioden zu zahlen sind.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/cumipmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Erforderlich. Der Zinssatz pro Periode."
			},
			nper: {
				name: "nper",
				detail: "Erforderlich. Die Gesamtzahl der Zahlungsperioden (Zzr = Anzahl der Zahlungszeiträume)."
			},
			pv: {
				name: "pv",
				detail: "Erforderlich. Der Barwert oder Gegenwartswert (Bw = Barwert)."
			},
			startPeriod: {
				name: "start_period",
				detail: "Erforderlich. Die erste in die Berechnung einfließende Periode. Die Zahlungsperioden sind, beginnend mit 1, durchnummeriert."
			},
			endPeriod: {
				name: "end_period",
				detail: "Erforderlich. Die letzte in die Berechnung einfließende Periode."
			},
			type: {
				name: "type",
				detail: "Erforderlich. (Fälligkeit) gibt an, zu welchem Zeitpunkt einer Periode jeweils eine Zahlung fällig ist."
			}
		}
	},
	CUMPRINC: {
		description: "Berechnet die aufgelaufene Tilgung eines Darlehens, die zwischen zwei Perioden zu zahlen ist.",
		abstract: "Berechnet die aufgelaufene Tilgung eines Darlehens, die zwischen zwei Perioden zu zahlen ist.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/cumprinc-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Erforderlich. Der Zinssatz pro Periode."
			},
			nper: {
				name: "nper",
				detail: "Erforderlich. Die Gesamtzahl der Zahlungsperioden (Zzr = Anzahl der Zahlungszeiträume)."
			},
			pv: {
				name: "pv",
				detail: "Erforderlich. Der Barwert oder Gegenwartswert (Bw = Barwert)."
			},
			startPeriod: {
				name: "start_period",
				detail: "Erforderlich. Die erste in die Berechnung einfließende Periode. Die Zahlungsperioden sind, beginnend mit 1, durchnummeriert."
			},
			endPeriod: {
				name: "end_period",
				detail: "Erforderlich. Die letzte in die Berechnung einfließende Periode."
			},
			type: {
				name: "type",
				detail: "Erforderlich. (Fälligkeit) gibt an, zu welchem Zeitpunkt einer Periode jeweils eine Zahlung fällig ist."
			}
		}
	},
	DB: {
		description: "Gibt die geometrisch-degressive Abschreibung eines Wirtschaftsgutes für eine bestimmte Periode zurück.",
		abstract: "Gibt die geometrisch-degressive Abschreibung eines Wirtschaftsgutes für eine bestimmte Periode zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/db-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Erforderlich. Die Anschaffungskosten eines Wirtschaftsgutes."
			},
			salvage: {
				name: "salvage",
				detail: "Erforderlich. Der Restwert am Ende der Nutzungsdauer (wird häufig auch als Schrottwert bezeichnet)."
			},
			life: {
				name: "life",
				detail: "Erforderlich. Die Anzahl der Perioden, über die das Wirtschaftsgut abgeschrieben wird (auch als Nutzungsdauer bezeichnet)."
			},
			period: {
				name: "period",
				detail: "Erforderlich. Die Periode, deren Abschreibungsbetrag Sie berechnen möchten. Für das Argument \"Periode\" muss dieselbe Zeiteinheit verwendet werden wie für die Nutzungsdauer."
			},
			month: {
				name: "month",
				detail: "Optional. Die Anzahl der Monate im ersten Jahr. Wird das Argument \"Monat\" nicht angegeben, wird der Wert 12 angenommen."
			}
		}
	},
	DDB: {
		description: "Gibt die Abschreibung eines Anlagegutes für einen angegebenen Zeitraum unter Verwendung der degressiven Doppelraten-Abschreibung oder eines anderen von Ihnen angegebenen Abschreibungsverfahrens zurück.",
		abstract: "Gibt die Abschreibung eines Anlagegutes für einen angegebenen Zeitraum unter Verwendung der degressiven Doppelraten-Abschreibung oder eines anderen von Ihnen angegebenen Abschreibungsverfahrens zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/ddb-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Erforderlich. Die Anschaffungskosten eines Wirtschaftsgutes."
			},
			salvage: {
				name: "salvage",
				detail: "Erforderlich. Der Restwert am Ende der Nutzungsdauer (wird häufig auch als Schrottwert bezeichnet). Der Wert kann 0 betragen."
			},
			life: {
				name: "life",
				detail: "Erforderlich. Die Anzahl der Perioden, über die das Wirtschaftsgut abgeschrieben wird (auch als Nutzungsdauer bezeichnet)."
			},
			period: {
				name: "period",
				detail: "Erforderlich. Die Periode, deren Abschreibungsbetrag Sie berechnen möchten. Für das Argument \"Periode\" muss dieselbe Zeiteinheit verwendet werden wie für die Nutzungsdauer."
			},
			factor: {
				name: "factor",
				detail: "Optional. Die Rate, um die der Restbuchwert abnimmt. Fehlt das Argument Faktor, wird es als 2 angenommen (das Verfahren der degressiven Doppelraten-Abschreibung)."
			}
		}
	},
	DISC: {
		description: "Gibt den in Prozent ausgedrückten Abzinsungssatz eines Wertpapiers zurück.",
		abstract: "Gibt den in Prozent ausgedrückten Abzinsungssatz eines Wertpapiers zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/disc-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Erforderlich. Der Abrechnungstermin des Wertpapierkaufs. Der Abrechnungstermin des Wertpapierkaufs ist das Datum nach der Wertpapieremission, wenn das Wertpapier in den Besitz des Käufers übergeht."
			},
			maturity: {
				name: "maturity",
				detail: "Erforderlich. Der Fälligkeitstermin des Wertpapiers. Dabei handelt es sich um den Zeitpunkt, zu dem das Wertpapier abläuft."
			},
			pr: {
				name: "pr",
				detail: "Erforderlich. Der Kurs des Wertpapiers pro 100 € Nennwert."
			},
			redemption: {
				name: "redemption",
				detail: "Erforderlich. Der Rückzahlungswert des Wertpapiers pro 100 € Nennwert"
			},
			basis: {
				name: "basis",
				detail: "Optional. Der Typ, auf dessen Basis die Zinstage gezählt werden."
			}
		}
	},
	DOLLARDE: {
		description: "Wandelt eine Notierung, die durch eine Kombination aus ganzer Zahl und Dezimalbruch (z. B. 1,02) ausgedrückt wurde, in eine Dezimalzahl um. Als Dezimalbrüche angegebene €-Zahlen werden z. B. für die Kurse festverzinslicher Wertpapiere oder amerikanische Aktiennotierungen verwendet.",
		abstract: "Wandelt eine Notierung, die durch eine Kombination aus ganzer Zahl und Dezimalbruch (z. B. 1,02) ausgedrückt wurde, in eine Dezimalzahl um. Als Dezimalbrüche angegebene €-Zahlen werden z. B. für die Kurse festverzinslicher Wertpapiere oder amerikanische Aktiennotierungen verwendet.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/dollarde-function"
		}],
		functionParameter: {
			fractionalDollar: {
				name: "fractional_dollar",
				detail: "Erforderlich. Eine Zahl, die durch eine Kombination aus Ganzzahl und Dezimalbruch, getrennt durch ein Dezimaltrennzeichen ausgedrückt wurde."
			},
			fraction: {
				name: "fraction",
				detail: "Erforderlich. Eine ganze Zahl, die als Nenner des Dezimalbruchs verwendet wird."
			}
		}
	},
	DOLLARFR: {
		description: "Mit NOTIERUNGBRU können Sie als Dezimalzahlen angegebene €-Zahlen in €-Zahlen umwandeln, die als Dezimalbrüche formuliert sind (z. B. die Kurse festverzinslicher Wertpapiere).",
		abstract: "Mit NOTIERUNGBRU können Sie als Dezimalzahlen angegebene €-Zahlen in €-Zahlen umwandeln, die als Dezimalbrüche formuliert sind (z. B. die Kurse festverzinslicher Wertpapiere).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/dollarfr-function"
		}],
		functionParameter: {
			decimalDollar: {
				name: "decimal_dollar",
				detail: "Erforderlich. Eine Dezimalzahl."
			},
			fraction: {
				name: "fraction",
				detail: "Erforderlich. Eine ganze Zahl, die als Nenner eines Dezimalbruchs verwendet wird."
			}
		}
	},
	DURATION: {
		description: "Die DURATION-Funktion , eine der Finanzfunktionen , gibt die Macauley-Dauer für einen angenommenen Paritätswert von 100 USD zurück. Die Duration wird als gewichteter Durchschnitt des Barwerts der Cashflows definiert und als Maß für die Reaktion eines Anleihenkurses auf Renditeänderungen verwendet.",
		abstract: "Die DURATION-Funktion , eine der Finanzfunktionen , gibt die Macauley-Dauer für einen angenommenen Paritätswert von 100 USD zurück. Die Duration wird als gewichteter Durchschnitt des Barwerts der Cashflows definiert und als Maß für die Reaktion eines Anleihenkurses auf Renditeänderungen verwendet.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/duration-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Erforderlich. Der Abrechnungstermin des Wertpapierkaufs. Der Abrechnungstermin des Wertpapierkaufs ist das Datum nach der Wertpapieremission, wenn das Wertpapier in den Besitz des Käufers übergeht."
			},
			maturity: {
				name: "maturity",
				detail: "Erforderlich. Der Fälligkeitstermin des Wertpapiers. Dabei handelt es sich um den Zeitpunkt, zu dem das Wertpapier abläuft."
			},
			coupon: {
				name: "coupon",
				detail: "Erforderlich. Der jährliche Nominalzins (Kuponzinssatz) des Wertpapiers"
			},
			yld: {
				name: "yld",
				detail: "Erforderlich. Die jährliche Rendite des Wertpapiers"
			},
			frequency: {
				name: "frequency",
				detail: "Erforderlich. Die Anzahl der Zinszahlungen pro Jahr. Bei jährlichen Zahlungen ist Häufigkeit = 1; bei halbjährlichen ist Häufigkeit = 2; bei vierteljährlichen ist Häufigkeit = 4."
			},
			basis: {
				name: "basis",
				detail: "Optional. Der Typ, auf dessen Basis die Zinstage gezählt werden."
			}
		}
	},
	EFFECT: {
		description: "Gibt die jährliche Effektivverzinsung zurück, ausgehend von einer Nominalverzinsung sowie der jeweiligen Anzahl der Zinszahlungen pro Jahr.",
		abstract: "Gibt die jährliche Effektivverzinsung zurück, ausgehend von einer Nominalverzinsung sowie der jeweiligen Anzahl der Zinszahlungen pro Jahr.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/effect-function"
		}],
		functionParameter: {
			nominalRate: {
				name: "nominal_rate",
				detail: "Erforderlich. Die Nominalverzinsung."
			},
			npery: {
				name: "npery",
				detail: "Erforderlich. Die Anzahl der Verzinsungsperioden innerhalb eines Jahres"
			}
		}
	},
	FV: {
		description: "ZW , eine der finanzmathematischen Funktionen , berechnet den zukünftigen Wert oder Endwert einer Investition, wobei ein konstanter Zinssatz vorausgesetzt wird. Sie können ZW entweder mit regelmäßigen, konstanten Zahlungen oder der Zahlung eines einzigen Pauschalbetrags verwenden.",
		abstract: "ZW , eine der finanzmathematischen Funktionen , berechnet den zukünftigen Wert oder Endwert einer Investition, wobei ein konstanter Zinssatz vorausgesetzt wird. Sie können ZW entweder mit regelmäßigen, konstanten Zahlungen oder der Zahlung eines einzigen Pauschalbetrags verwenden.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/fv-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Erforderlich. Der Zinssatz pro Periode (Zahlungszeitraum)"
			},
			nper: {
				name: "nper",
				detail: "Erforderlich. Gibt an, über wie viele Perioden die jeweilige Annuität (Rente) gezahlt wird."
			},
			pmt: {
				name: "pmt",
				detail: "Erforderlich. Die Zahlung, die für jeden Zeitraum geleistet wird; sie kann sich während der Lebensdauer der Annuität nicht ändern. In der Regel enthält pmt Prinzipal und Zinsen, aber keine anderen Gebühren oder Steuern. Wenn pmt nicht angegeben wird, müssen Sie das pv-Argument einschließen."
			},
			pv: {
				name: "pv",
				detail: "Optional. Der Barwert oder der heutige Gesamtwert einer Reihe zukünftiger Zahlungen (Bw = Barwert) Wenn pv nicht angegeben wird, wird davon ausgegangen, dass es 0 (null) ist, und Sie müssen das Argument pmt einschließen."
			},
			type: {
				name: "type",
				detail: "Optional. Kann den Wert \"0\" oder \"1\" annehmen und gibt an, wann die Zahlungen fällig sind. Wenn type nicht angegeben wird, wird davon ausgegangen, dass er 0 ist."
			}
		}
	},
	FVSCHEDULE: {
		description: "Gibt den aufgezinsten Wert des Anfangskapitals für eine Reihe periodisch unterschiedlicher Zinssätze zurück. Mit ZW2 können Sie den Endwert (zukünftigen Wert) einer Investition (Kapitalanlage) berechnen, für die ein variabler oder wechselnder Zinssatz vereinbart ist.",
		abstract: "Gibt den aufgezinsten Wert des Anfangskapitals für eine Reihe periodisch unterschiedlicher Zinssätze zurück. Mit ZW2 können Sie den Endwert (zukünftigen Wert) einer Investition (Kapitalanlage) berechnen, für die ein variabler oder wechselnder Zinssatz vereinbart ist.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/fvschedule-function"
		}],
		functionParameter: {
			principal: {
				name: "principal",
				detail: "Erforderlich. Der Barwert oder Gegenwartswert (Bw = Barwert)."
			},
			schedule: {
				name: "schedule",
				detail: "Erforderlich. Eine Matrix, die die einzusetzenden Zinssätze enthält."
			}
		}
	},
	INTRATE: {
		description: "Gibt den Zinssatz eines voll investierten Wertpapiers zurück.",
		abstract: "Gibt den Zinssatz eines voll investierten Wertpapiers zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/intrate-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Erforderlich. Der Abrechnungstermin des Wertpapierkaufs. Der Abrechnungstermin des Wertpapierkaufs ist das Datum nach der Wertpapieremission, wenn das Wertpapier in den Besitz des Käufers übergeht."
			},
			maturity: {
				name: "maturity",
				detail: "Erforderlich. Der Fälligkeitstermin des Wertpapiers. Dabei handelt es sich um den Zeitpunkt, zu dem das Wertpapier abläuft."
			},
			investment: {
				name: "investment",
				detail: "Erforderlich. Der Betrag, der in dem Wertpapier angelegt werden soll"
			},
			redemption: {
				name: "redemption",
				detail: "Erforderlich. Der Betrag, der bei Fälligkeit zu erwarten ist"
			},
			basis: {
				name: "basis",
				detail: "Optional. Der Typ, auf dessen Basis die Zinstage gezählt werden."
			}
		}
	},
	IPMT: {
		description: "Gibt die Zinszahlung einer Investition für die angegebene Periode zurück, ausgehend von regelmäßigen, konstanten Zahlungen und einem konstanten Zinssatz.",
		abstract: "Gibt die Zinszahlung einer Investition für die angegebene Periode zurück, ausgehend von regelmäßigen, konstanten Zahlungen und einem konstanten Zinssatz.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/ipmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Erforderlich. Der Zinssatz pro Periode (Zahlungszeitraum)"
			},
			per: {
				name: "per",
				detail: "Erforderlich. Der Zeitraum, für den Sie das Interesse ermitteln möchten, und muss im Bereich von 1 bis nper liegen."
			},
			nper: {
				name: "nper",
				detail: "Erforderlich. Gibt an, über wie viele Perioden die jeweilige Annuität (Rente) gezahlt wird."
			},
			pv: {
				name: "pv",
				detail: "Erforderlich. Der Barwert oder der heutige Gesamtwert einer Reihe zukünftiger Zahlungen (Bw = Barwert)"
			},
			fv: {
				name: "fv",
				detail: "Optional. Der zukünftige Wert (Endwert) oder der Kassenbestand, den Sie nach der letzten Zahlung erreicht haben möchten. Fehlt das Argument \"Zw\", wird es als 0 angenommen (beispielsweise ist der Endwert eines Kredits gleich 0)."
			},
			type: {
				name: "type",
				detail: "Optional. Kann den Wert \"0\" oder \"1\" annehmen und gibt an, wann die Zahlungen fällig sind. Wenn type nicht angegeben wird, wird davon ausgegangen, dass er 0 ist."
			}
		}
	},
	IRR: {
		description: "Gibt den internen Zinssatz für eine Reihe von Cashflows zurück, die durch die Zahlen in -Werten dargestellt werden. Diese Cashflows müssen nicht gerade sein, wie sie für eine Annuität wären. Die Cashflows müssen jedoch in regelmäßigen Abständen erfolgen, z. B. monatlich oder jährlich. Der interne Zinssatz ist der Zinssatz für eine Investition, die aus Zahlungen (negative Werte) und Einkommen (positive Werte) besteht, die in regelmäßigen Zeiträumen auftreten.",
		abstract: "Gibt den internen Zinssatz für eine Reihe von Cashflows zurück, die durch die Zahlen in -Werten dargestellt werden. Diese Cashflows müssen nicht gerade sein, wie sie für eine Annuität wären. Die Cashflows müssen jedoch in regelmäßigen Abständen erfolgen, z. B. monatlich oder jährlich. Der interne Zinssatz ist der Zinssatz für eine Investition, die aus Zahlungen (negative Werte) und Einkommen (positive Werte) besteht, die in regelmäßigen Zeiträumen auftreten.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/irr-function"
		}],
		functionParameter: {
			values: {
				name: "values",
				detail: "Eine Matrix oder ein Bezug auf Zellen mit Zahlen, für die Sie den internen Zinsfuß berechnen möchten.\n1. Values müssen mindestens einen positiven und einen negativen Wert enthalten.\n2. IRR verwendet die Reihenfolge der Werte als Reihenfolge der Zahlungsströme. Geben Sie Zahlungen und Einnahmen daher in der gewünschten Reihenfolge ein.\n3. Text, Wahrheitswerte und leere Zellen in einer Matrix oder einem Bezug werden ignoriert."
			},
			guess: {
				name: "guess",
				detail: "Eine Zahl, die Ihrer Schätzung nach nahe am Ergebnis von IRR liegt."
			}
		}
	},
	ISPMT: {
		description: "Berechnet die gezahlten (oder erhaltenen) Zinsen für den angegebenen Zeitraum eines Kredits (oder einer Investition) mit gleichmäßigen Tilgungszahlungen.",
		abstract: "Berechnet die gezahlten (oder erhaltenen) Zinsen für den angegebenen Zeitraum eines Kredits (oder einer Investition) mit gleichmäßigen Tilgungszahlungen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/ispmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Erforderlich. Die Effektivverzinsung für die Investition."
			},
			per: {
				name: "per",
				detail: "Erforderlich. Der Zeitraum, für den Sie den Zins ermitteln möchten, und muss zwischen 1 und Nper sein."
			},
			nper: {
				name: "nper",
				detail: "Erforderlich. Die Gesamtanzahl der Zahlungszeiträume für die Investition."
			},
			pv: {
				name: "pv",
				detail: "Erforderlich. Der gegenwärtige Wert der Investition. Bei einem Kredit ist \"Bw\" die Kreditsumme."
			}
		}
	},
	MDURATION: {
		description: "Gibt die modifizierte Macauley-Dauer eines Wertpapiers mit einem angenommenen Nennwert von 100 € zurück.",
		abstract: "Gibt die modifizierte Macauley-Dauer eines Wertpapiers mit einem angenommenen Nennwert von 100 € zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/mduration-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Erforderlich. Der Abrechnungstermin des Wertpapierkaufs. Der Abrechnungstermin des Wertpapierkaufs ist das Datum nach der Wertpapieremission, wenn das Wertpapier in den Besitz des Käufers übergeht."
			},
			maturity: {
				name: "maturity",
				detail: "Erforderlich. Der Fälligkeitstermin des Wertpapiers. Dabei handelt es sich um den Zeitpunkt, zu dem das Wertpapier abläuft."
			},
			coupon: {
				name: "coupon",
				detail: "Erforderlich. Der jährliche Nominalzins (Kuponzinssatz) des Wertpapiers"
			},
			yld: {
				name: "yld",
				detail: "Erforderlich. Die jährliche Rendite des Wertpapiers"
			},
			frequency: {
				name: "frequency",
				detail: "Erforderlich. Die Anzahl der Zinszahlungen pro Jahr. Bei jährlichen Zahlungen ist Häufigkeit = 1; bei halbjährlichen ist Häufigkeit = 2; bei vierteljährlichen ist Häufigkeit = 4."
			},
			basis: {
				name: "basis",
				detail: "Optional. Der Typ, auf dessen Basis die Zinstage gezählt werden."
			}
		}
	},
	MIRR: {
		description: "Gibt den geänderten internen Zinssatz für eine Reihe regelmäßiger Cashflows zurück. MIRR berücksichtigt sowohl die Kosten der Investition als auch die Zinsen, die für die Reinvestition von Bargeld erhalten wurden.",
		abstract: "Gibt den geänderten internen Zinssatz für eine Reihe regelmäßiger Cashflows zurück. MIRR berücksichtigt sowohl die Kosten der Investition als auch die Zinsen, die für die Reinvestition von Bargeld erhalten wurden.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/mirr-function"
		}],
		functionParameter: {
			values: {
				name: "values",
				detail: "Erforderlich. Eine Matrix oder ein Bezug auf Zellen, die Zahlen enthalten. Diese Zahlen entsprechen einer Reihe von Auszahlungen (negative Werte) sowie Einzahlungen (positive Werte), die in gleichlangen Perioden erfolgen. Werte müssen mindestens einen positiven und einen negativen Wert enthalten, um die geänderte interne Rendite zu berechnen. Andernfalls gibt MIRR die #DIV/0! zurück. Enthält ein als Matrix oder Bezug angegebenes Argument Text, Wahrheitswerte oder leere Zellen, werden diese Werte ignoriert. Zellen, die den Wert 0 enthalten, werden dagegen berücksichtigt."
			},
			financeRate: {
				name: "finance_rate",
				detail: "Erforderlich. Der Zinssatz, den Sie für die gezahlten Gelder ansetzen"
			},
			reinvestRate: {
				name: "reinvest_rate",
				detail: "Erforderlich. Der Zinssatz, den Sie für reinvestierte Gelder erzielen"
			}
		}
	},
	NOMINAL: {
		description: "Gibt die jährliche Nominalverzinsung zurück, ausgehend vom effektiven Zinssatz sowie der Anzahl der Verzinsungsperioden innerhalb eines Jahres.",
		abstract: "Gibt die jährliche Nominalverzinsung zurück, ausgehend vom effektiven Zinssatz sowie der Anzahl der Verzinsungsperioden innerhalb eines Jahres.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/nominal-function"
		}],
		functionParameter: {
			effectRate: {
				name: "effect_rate",
				detail: "Erforderlich. Der effektive Zinssatz (Effektivverzinsung)"
			},
			npery: {
				name: "npery",
				detail: "Erforderlich. Die Anzahl der Verzinsungsperioden innerhalb eines Jahres"
			}
		}
	},
	NPER: {
		description: "Gibt die Anzahl der Zahlungsperioden einer Investition zurück, die auf periodischen, gleichbleibenden Zahlungen sowie einem konstanten Zinssatz basiert. (ZZR = Anzahl der Zahlungszeiträume)",
		abstract: "Gibt die Anzahl der Zahlungsperioden einer Investition zurück, die auf periodischen, gleichbleibenden Zahlungen sowie einem konstanten Zinssatz basiert. (ZZR = Anzahl der Zahlungszeiträume)",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/nper-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Erforderlich. Der Zinssatz pro Periode (Zahlungszeitraum)"
			},
			pmt: {
				name: "pmt",
				detail: "Erforderlich. Die Zahlung, die für jeden Zeitraum geleistet wird; sie kann sich während der Lebensdauer der Annuität nicht ändern. In der Regel enthält pmt Prinzipal und Zinsen, aber keine anderen Gebühren oder Steuern."
			},
			pv: {
				name: "pv",
				detail: "Erforderlich. Der Barwert oder der heutige Gesamtwert einer Reihe zukünftiger Zahlungen (Bw = Barwert)"
			},
			fv: {
				name: "fv",
				detail: "Optional. Der zukünftige Wert (Endwert) oder der Kassenbestand, den Sie nach der letzten Zahlung erreicht haben möchten. Fehlt das Argument \"Zw\", wird es als 0 angenommen (beispielsweise ist der Endwert eines Kredits gleich 0)."
			},
			type: {
				name: "type",
				detail: "Optional. Kann den Wert \"0\" oder \"1\" annehmen und gibt an, wann die Zahlungen fällig sind."
			}
		}
	},
	NPV: {
		description: "Liefert den Nettobarwert (Kapitalwert) einer Investition auf der Basis eines Abzinsungsfaktors für eine Reihe periodischer Zahlungen.",
		abstract: "Liefert den Nettobarwert (Kapitalwert) einer Investition auf der Basis eines Abzinsungsfaktors für eine Reihe periodischer Zahlungen.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/npv-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Erforderlich. Der Abzinsungsfaktor für die Dauer einer Periode"
			},
			value1: {
				name: "value1",
				detail: "Wert1 ist erforderlich, nachfolgende Werte sind optional. 1 bis 254 Argumente, die den Auszahlungen und den Einzahlungen entsprechen. Wert1; Wert2; ... müssen als Zahlungsvorgänge in gleichbleibenden Zeitabständen erfolgen und sind jeweils am Ende einer Periode vorzunehmen. NBW bestimmt anhand der Reihenfolge von Wert1; Wert2;... die Reihenfolge der Zahlungen. Sie müssen daher darauf achten, dass Sie die Auszahlungen und Einzahlungen in der richtigen Reihenfolge eingeben. Argumente, bei denen es sich um leere Zellen, Wahrheitswerte, Zahlen in Textform, Fehlerwerte oder Text handelt, der sich nicht in eine Zahl umwandeln lässt, werden ignoriert. Ist als Argument eine Matrix oder ein Bezug angegeben, werden nur die Elemente der Matrix oder des Bezugs berücksichtigt, die Zahlen enthalten. Leere Zellen, Wahrheitswerte, Texte oder Fehlerwerte werden ignoriert."
			},
			value2: {
				name: "value2",
				detail: "Wert1 ist erforderlich, nachfolgende Werte sind optional. 1 bis 254 Argumente, die den Auszahlungen und den Einzahlungen entsprechen. Wert1; Wert2; ... müssen als Zahlungsvorgänge in gleichbleibenden Zeitabständen erfolgen und sind jeweils am Ende einer Periode vorzunehmen. NBW bestimmt anhand der Reihenfolge von Wert1; Wert2;... die Reihenfolge der Zahlungen. Sie müssen daher darauf achten, dass Sie die Auszahlungen und Einzahlungen in der richtigen Reihenfolge eingeben. Argumente, bei denen es sich um leere Zellen, Wahrheitswerte, Zahlen in Textform, Fehlerwerte oder Text handelt, der sich nicht in eine Zahl umwandeln lässt, werden ignoriert. Ist als Argument eine Matrix oder ein Bezug angegeben, werden nur die Elemente der Matrix oder des Bezugs berücksichtigt, die Zahlen enthalten. Leere Zellen, Wahrheitswerte, Texte oder Fehlerwerte werden ignoriert."
			}
		}
	},
	ODDFPRICE: {
		description: "Liefert den Kurs pro 100 € Nennwert eines Wertpapiers mit einem unregelmäßigen (kurzen oder langen) ersten Zinstermin.",
		abstract: "Liefert den Kurs pro 100 € Nennwert eines Wertpapiers mit einem unregelmäßigen (kurzen oder langen) ersten Zinstermin.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/oddfprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Erforderlich. Der Abrechnungstermin des Wertpapierkaufs. Der Abrechnungstermin des Wertpapierkaufs ist das Datum nach der Wertpapieremission, wenn das Wertpapier in den Besitz des Käufers übergeht."
			},
			maturity: {
				name: "maturity",
				detail: "Erforderlich. Der Fälligkeitstermin des Wertpapiers. Dabei handelt es sich um den Zeitpunkt, zu dem das Wertpapier abläuft."
			},
			issue: {
				name: "issue",
				detail: "Erforderlich. Das Datum der Wertpapieremission"
			},
			firstCoupon: {
				name: "first_coupon",
				detail: "Erforderlich. Der erste Zinstermin des Wertpapiers"
			},
			rate: {
				name: "rate",
				detail: "Erforderlich. Der Zinssatz des Wertpapiers."
			},
			yld: {
				name: "yld",
				detail: "Erforderlich. Die jährliche Rendite des Wertpapiers"
			},
			redemption: {
				name: "redemption",
				detail: "Erforderlich. Der Rückzahlungswert des Wertpapiers pro 100 € Nennwert"
			},
			frequency: {
				name: "frequency",
				detail: "Erforderlich. Die Anzahl der Zinszahlungen pro Jahr. Bei jährlichen Zahlungen ist Häufigkeit = 1; bei halbjährlichen ist Häufigkeit = 2; bei vierteljährlichen ist Häufigkeit = 4."
			},
			basis: {
				name: "basis",
				detail: "Optional. Der Typ, auf dessen Basis die Zinstage gezählt werden."
			}
		}
	},
	ODDFYIELD: {
		description: "Gibt die Rendite eines Wertpapiers mit einem unregelmäßigen (kurzen oder langen) ersten Zinstermin zurück.",
		abstract: "Gibt die Rendite eines Wertpapiers mit einem unregelmäßigen (kurzen oder langen) ersten Zinstermin zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/oddfyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Erforderlich. Der Abrechnungstermin des Wertpapierkaufs. Der Abrechnungstermin des Wertpapierkaufs ist das Datum nach der Wertpapieremission, wenn das Wertpapier in den Besitz des Käufers übergeht."
			},
			maturity: {
				name: "maturity",
				detail: "Erforderlich. Der Fälligkeitstermin des Wertpapiers. Dabei handelt es sich um den Zeitpunkt, zu dem das Wertpapier abläuft."
			},
			issue: {
				name: "issue",
				detail: "Erforderlich. Das Datum der Wertpapieremission"
			},
			firstCoupon: {
				name: "first_coupon",
				detail: "Erforderlich. Der erste Zinstermin des Wertpapiers"
			},
			rate: {
				name: "rate",
				detail: "Erforderlich. Der Zinssatz des Wertpapiers."
			},
			pr: {
				name: "pr",
				detail: "Erforderlich. Der Kurs des Wertpapiers"
			},
			redemption: {
				name: "redemption",
				detail: "Erforderlich. Der Rückzahlungswert des Wertpapiers pro 100 € Nennwert"
			},
			frequency: {
				name: "frequency",
				detail: "Erforderlich. Die Anzahl der Zinszahlungen pro Jahr. Bei jährlichen Zahlungen ist Häufigkeit = 1; bei halbjährlichen ist Häufigkeit = 2; bei vierteljährlichen ist Häufigkeit = 4."
			},
			basis: {
				name: "basis",
				detail: "Optional. Der Typ, auf dessen Basis die Zinstage gezählt werden."
			}
		}
	},
	ODDLPRICE: {
		description: "Gibt den Kurs pro 100 € Nennwert eines Wertpapiers mit einem unregelmäßigen letzten Zinstermin zurück.",
		abstract: "Gibt den Kurs pro 100 € Nennwert eines Wertpapiers mit einem unregelmäßigen letzten Zinstermin zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/oddlprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Erforderlich. Der Abrechnungstermin des Wertpapierkaufs. Der Abrechnungstermin des Wertpapierkaufs ist das Datum nach der Wertpapieremission, wenn das Wertpapier in den Besitz des Käufers übergeht."
			},
			maturity: {
				name: "maturity",
				detail: "Erforderlich. Der Fälligkeitstermin des Wertpapiers. Dabei handelt es sich um den Zeitpunkt, zu dem das Wertpapier abläuft."
			},
			lastInterest: {
				name: "last_interest",
				detail: "Erforderlich. Der letzte Zinstermin des Wertpapiers vor dem Fälligkeitstermin"
			},
			rate: {
				name: "rate",
				detail: "Erforderlich. Der Zinssatz des Wertpapiers."
			},
			yld: {
				name: "yld",
				detail: "Erforderlich. Die jährliche Rendite des Wertpapiers"
			},
			redemption: {
				name: "redemption",
				detail: "Erforderlich. Der Rückzahlungswert des Wertpapiers pro 100 € Nennwert"
			},
			frequency: {
				name: "frequency",
				detail: "Erforderlich. Die Anzahl der Zinszahlungen pro Jahr. Bei jährlichen Zahlungen ist Häufigkeit = 1; bei halbjährlichen ist Häufigkeit = 2; bei vierteljährlichen ist Häufigkeit = 4."
			},
			basis: {
				name: "basis",
				detail: "Optional. Der Typ, auf dessen Basis die Zinstage gezählt werden."
			}
		}
	},
	ODDLYIELD: {
		description: "Gibt die Rendite eines Wertpapiers mit einem unregelmäßigen letzten Zinstermin unabhängig von der Dauer zurück.",
		abstract: "Gibt die Rendite eines Wertpapiers mit einem unregelmäßigen letzten Zinstermin unabhängig von der Dauer zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/oddlyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Erforderlich. Der Abrechnungstermin des Wertpapierkaufs. Der Abrechnungstermin des Wertpapierkaufs ist das Datum nach der Wertpapieremission, wenn das Wertpapier in den Besitz des Käufers übergeht."
			},
			maturity: {
				name: "maturity",
				detail: "Erforderlich. Der Fälligkeitstermin des Wertpapiers. Dabei handelt es sich um den Zeitpunkt, zu dem das Wertpapier abläuft."
			},
			lastInterest: {
				name: "last_interest",
				detail: "Erforderlich. Der letzte Zinstermin des Wertpapiers vor dem Fälligkeitstermin"
			},
			rate: {
				name: "rate",
				detail: "Erforderlich. Der Zinssatz des Wertpapiers"
			},
			pr: {
				name: "pr",
				detail: "Erforderlich. Der Kurs des Wertpapiers"
			},
			redemption: {
				name: "redemption",
				detail: "Erforderlich. Der Rückzahlungswert des Wertpapiers pro 100 € Nennwert"
			},
			frequency: {
				name: "frequency",
				detail: "Erforderlich. Die Anzahl der Zinszahlungen pro Jahr. Bei jährlichen Zahlungen ist Häufigkeit = 1; bei halbjährlichen ist Häufigkeit = 2; bei vierteljährlichen ist Häufigkeit = 4."
			},
			basis: {
				name: "basis",
				detail: "Optional. Der Typ, auf dessen Basis die Zinstage gezählt werden."
			}
		}
	},
	PDURATION: {
		description: "Gibt die Anzahl von Perioden zurück, die erforderlich sind, bis eine Investition einen angegebenen Wert erreicht hat.",
		abstract: "Gibt die Anzahl von Perioden zurück, die erforderlich sind, bis eine Investition einen angegebenen Wert erreicht hat.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/pduration-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Erforderlich. Der Zinssatz pro Zahlungsperiode."
			},
			pv: {
				name: "pv",
				detail: "Erforderlich. Der aktuelle Wert der Investition."
			},
			fv: {
				name: "fv",
				detail: "Erforderlich. Der gewünschte zukünftige Wert der Investition."
			}
		}
	},
	PMT: {
		description: "RMZ , eine der finanzmathematischen Funktionen , berechnet die konstante Zahlung einer Annuität pro Periode, wobei konstante Zahlungen und ein konstanter Zinssatz vorausgesetzt werden. (RMZ = Regelmäßige Zahlung)",
		abstract: "RMZ , eine der finanzmathematischen Funktionen , berechnet die konstante Zahlung einer Annuität pro Periode, wobei konstante Zahlungen und ein konstanter Zinssatz vorausgesetzt werden. (RMZ = Regelmäßige Zahlung)",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/pmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Erforderlich. Der Zinssatz pro Periode (Zahlungszeitraum)."
			},
			nper: {
				name: "nper",
				detail: "Erforderlich. Die Gesamtzahl der Zahlungen für das Darlehen."
			},
			pv: {
				name: "pv",
				detail: "Erforderlich. Der Barwert oder der Gesamtbetrag, den eine Reihe zukünftiger Zahlungen jetzt wert ist. Dieser Wert wird auch „Darlehenswert“ genannt."
			},
			fv: {
				name: "fv",
				detail: "Optional. Der zukünftige Wert (Endwert) oder der Kassenbestand, den Sie nach der letzten Zahlung erreicht haben möchten. Wenn Zw weggelassen wird, wird davon ausgegangen, dass er 0 (null) ist, d. h., der zukünftige Wert eines Kredits ist 0."
			},
			type: {
				name: "type",
				detail: "Optional. Der Wert kann 0 (null) oder 1 sein und gibt an, wann Zahlungen fällig sind."
			}
		}
	},
	PPMT: {
		description: "Gibt die Kapitalrückzahlung einer Investition für eine angegebene Periode zurück. Es werden konstante periodische Zahlungen und ein konstanter Zinssatz vorausgesetzt. (KAPZ = Kapitalrückzahlung)",
		abstract: "Gibt die Kapitalrückzahlung einer Investition für eine angegebene Periode zurück. Es werden konstante periodische Zahlungen und ein konstanter Zinssatz vorausgesetzt. (KAPZ = Kapitalrückzahlung)",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/ppmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Erforderlich. Der Zinssatz pro Periode (Zahlungszeitraum)"
			},
			per: {
				name: "per",
				detail: "Erforderlich. Gibt den Zeitraum an und muss zwischen 1 und Zzr liegen."
			},
			nper: {
				name: "nper",
				detail: "Erforderlich. Gibt an, über wie viele Perioden die jeweilige Annuität (Rente) gezahlt wird."
			},
			pv: {
				name: "pv",
				detail: "Erforderlich. Der Barwert: der Gesamtbetrag, den eine Reihe zukünftiger Zahlungen zum gegenwärtigen Zeitpunkt wert ist."
			},
			fv: {
				name: "fv",
				detail: "Optional. Der zukünftige Wert (Endwert) oder der Kassenbestand, den Sie nach der letzten Zahlung erreicht haben möchten. Wenn Zw weggelassen wird, wird davon ausgegangen, dass er 0 (null) ist, d. h., der zukünftige Wert eines Kredits ist 0."
			},
			type: {
				name: "type",
				detail: "Optional. Kann den Wert \"0\" oder \"1\" annehmen und gibt an, wann die Zahlungen fällig sind."
			}
		}
	},
	PRICE: {
		description: "Gibt den Kurs pro 100 € Nennwert eines Wertpapiers zurück, das periodisch Zinsen auszahlt.",
		abstract: "Gibt den Kurs pro 100 € Nennwert eines Wertpapiers zurück, das periodisch Zinsen auszahlt.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/price-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Erforderlich. Der Abrechnungstermin des Wertpapierkaufs. Der Abrechnungstermin des Wertpapierkaufs ist das Datum nach der Wertpapieremission, wenn das Wertpapier in den Besitz des Käufers übergeht."
			},
			maturity: {
				name: "maturity",
				detail: "Erforderlich. Der Fälligkeitstermin des Wertpapiers. Dabei handelt es sich um den Zeitpunkt, zu dem das Wertpapier abläuft."
			},
			rate: {
				name: "rate",
				detail: "Erforderlich. Der jährliche Nominalzins (Kuponzinssatz) des Wertpapiers"
			},
			yld: {
				name: "yld",
				detail: "Erforderlich. Die jährliche Rendite des Wertpapiers"
			},
			redemption: {
				name: "redemption",
				detail: "Erforderlich. Der Rückzahlungswert des Wertpapiers pro 100 € Nennwert"
			},
			frequency: {
				name: "frequency",
				detail: "Erforderlich. Die Anzahl der Zinszahlungen pro Jahr. Bei jährlichen Zahlungen ist Häufigkeit = 1; bei halbjährlichen ist Häufigkeit = 2; bei vierteljährlichen ist Häufigkeit = 4."
			},
			basis: {
				name: "basis",
				detail: "Optional. Der Typ, auf dessen Basis die Zinstage gezählt werden."
			}
		}
	},
	PRICEDISC: {
		description: "Gibt den Kurs pro 100 € Nennwert eines unverzinslichen Wertpapiers zurück.",
		abstract: "Gibt den Kurs pro 100 € Nennwert eines unverzinslichen Wertpapiers zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/pricedisc-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Erforderlich. Der Abrechnungstermin des Wertpapierkaufs. Der Abrechnungstermin des Wertpapierkaufs ist das Datum nach der Wertpapieremission, wenn das Wertpapier in den Besitz des Käufers übergeht."
			},
			maturity: {
				name: "maturity",
				detail: "Erforderlich. Der Fälligkeitstermin des Wertpapiers. Dabei handelt es sich um den Zeitpunkt, zu dem das Wertpapier abläuft."
			},
			discount: {
				name: "discount",
				detail: "Erforderlich. Der in Prozent ausgedrückte Abschlag (Disagio) des Wertpapiers"
			},
			redemption: {
				name: "redemption",
				detail: "Erforderlich. Der Rückzahlungswert des Wertpapiers pro 100 € Nennwert"
			},
			basis: {
				name: "basis",
				detail: "Optional. Der Typ, auf dessen Basis die Zinstage gezählt werden."
			}
		}
	},
	PRICEMAT: {
		description: "Gibt den Kurs pro 100 € Nennwert eines Wertpapiers zurück, das Zinsen am Fälligkeitsdatum auszahlt.",
		abstract: "Gibt den Kurs pro 100 € Nennwert eines Wertpapiers zurück, das Zinsen am Fälligkeitsdatum auszahlt.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/pricemat-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Erforderlich. Der Abrechnungstermin des Wertpapierkaufs. Der Abrechnungstermin des Wertpapierkaufs ist das Datum nach der Wertpapieremission, wenn das Wertpapier in den Besitz des Käufers übergeht."
			},
			maturity: {
				name: "maturity",
				detail: "Erforderlich. Der Fälligkeitstermin des Wertpapiers. Dabei handelt es sich um den Zeitpunkt, zu dem das Wertpapier abläuft."
			},
			issue: {
				name: "issue",
				detail: "Erforderlich. Das Datum der Wertpapieremission, als fortlaufende Zahl angegeben"
			},
			rate: {
				name: "rate",
				detail: "Erforderlich. Der Zinssatz des Wertpapiers am Emissionsdatum"
			},
			yld: {
				name: "yld",
				detail: "Erforderlich. Die jährliche Rendite des Wertpapiers"
			},
			basis: {
				name: "basis",
				detail: "Optional. Der Typ, auf dessen Basis die Zinstage gezählt werden."
			}
		}
	},
	PV: {
		description: "BW , eine der finanzmathematischen Funktionen , berechnet den aktuellen Wert eines Darlehens oder einer Investition, wobei ein konstanter Zinssatz vorausgesetzt wird. (BW = Barwert) Sie können BW entweder mit regelmäßigen, konstanten Zahlungen (z. B. im Zusammenhang mit einer Hypothek oder einem anderen Kredit) oder mit einem zukünftigen Wert, der Ihr Investitionsziel darstellt, verwenden.",
		abstract: "BW , eine der finanzmathematischen Funktionen , berechnet den aktuellen Wert eines Darlehens oder einer Investition, wobei ein konstanter Zinssatz vorausgesetzt wird. (BW = Barwert) Sie können BW entweder mit regelmäßigen, konstanten Zahlungen (z. B. im Zusammenhang mit einer Hypothek oder einem anderen Kredit) oder mit einem zukünftigen Wert, der Ihr Investitionsziel darstellt, verwenden.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/pv-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Erforderlich. Der Zinssatz pro Periode (Zahlungszeitraum) Wenn Sie z. B. einen Kredit für ein Auto mit einem jährlichen Zinssatz von 10 Prozent erhalten und monatliche Zahlungen leisten, beträgt der Zinssatz pro Monat 10 %/12 oder 0,83 %. Sie geben „10 %/12“ oder „0,83 %“ oder „0,0083“ als Rate in die Formel ein."
			},
			nper: {
				name: "nper",
				detail: "Erforderlich. Gibt an, über wie viele Perioden die jeweilige Annuität (Rente) gezahlt wird. Wenn Sie beispielsweise einen 4 Jahre laufenden Kredit für ein Auto erhalten und monatliche Zahlungen leisten, weist ihr Darlehen 4 * 12 (also 48) Zeiträume auf. Sie geben „48“ in die Formel für Nper ein."
			},
			pmt: {
				name: "pmt",
				detail: "Erforderlich. Die für jeden Zeitraum geleistete Zahlung kann sich während der Dauer der Annuität nicht ändern. In der Regel umfasst RMZ Prinzipal- und Zinszahlungen, aber keine anderen Gebühren oder Steuern. Beispielsweise betragen die monatlichen Zahlungen für einen vierjährigen Auto-Kredit für 10.000 US-Dollar mit 12 Prozent Zinsen 263,33 US-Dollar. Sie würden -263,33 als pmt in die Formel eingeben. Wenn pmt nicht angegeben wird, müssen Sie das Argument fv einschließen."
			},
			fv: {
				name: "fv",
				detail: "Optional. Der zukünftige Wert oder ein Barguthaben, den Sie nach der letzten Zahlung erreichen möchten. Fehlt das Argument \"Zw\", wird es als 0 angenommen (beispielsweise ist der Endwert eines Kredits gleich 0). Wenn Sie beispielsweise 50.000 USD sparen möchten, um für ein spezielles Projekt in 18 Jahren zu bezahlen, ist 50.000 USD der zukünftige Wert. Sie können dann eine vorsichtige Schätzung zu einem Zinssatz treffen und bestimmen, wie viel Sie jeden Monat sparen müssen. Wenn \"Zw\" ausgelassen wird, müssen Sie das Argument \"Rmz\" verwenden."
			},
			type: {
				name: "type",
				detail: "Optional. Kann den Wert \"0\" oder \"1\" annehmen und gibt an, wann die Zahlungen fällig sind."
			}
		}
	},
	RATE: {
		description: "Gibt den Zinssatz pro Zeitraum einer Annuität zurück. RATE wird nach Iteration berechnet und kann null oder mehr Lösungen enthalten. Wenn die aufeinanderfolgenden Ergebnisse von RATE nach 20 Iterationen nicht auf 0,0000001 konvergieren, gibt RATE die #NUM! zurück.",
		abstract: "Gibt den Zinssatz pro Zeitraum einer Annuität zurück. RATE wird nach Iteration berechnet und kann null oder mehr Lösungen enthalten. Wenn die aufeinanderfolgenden Ergebnisse von RATE nach 20 Iterationen nicht auf 0,0000001 konvergieren, gibt RATE die #NUM! zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/rate-function"
		}],
		functionParameter: {
			nper: {
				name: "nper",
				detail: "Erforderlich. Gibt an, über wie viele Perioden die jeweilige Annuität (Rente) gezahlt wird."
			},
			pmt: {
				name: "pmt",
				detail: "Erforderlich. Die für jeden Zeitraum geleistete Zahlung kann sich während der Dauer der Annuität nicht ändern. In der Regel umfasst RMZ Prinzipal- und Zinszahlungen, aber keine anderen Gebühren oder Steuern. Wenn „RMZ“ ausgelassen wird, müssen Sie das Argument „Zw“ verwenden."
			},
			pv: {
				name: "pv",
				detail: "Erforderlich. Der Barwert: der Gesamtbetrag, den eine Reihe zukünftiger Zahlungen zum gegenwärtigen Zeitpunkt wert ist."
			},
			fv: {
				name: "fv",
				detail: "Optional. Der zukünftige Wert (Endwert) oder der Kassenbestand, den Sie nach der letzten Zahlung erreicht haben möchten. Fehlt das Argument \"Zw\", wird es als 0 angenommen (beispielsweise ist der Endwert eines Kredits gleich 0). Wenn \"Zw\" ausgelassen wird, müssen Sie das Argument \"Rmz\" verwenden."
			},
			type: {
				name: "type",
				detail: "Optional. Kann den Wert \"0\" oder \"1\" annehmen und gibt an, wann die Zahlungen fällig sind."
			},
			guess: {
				name: "guess",
				detail: "Optional. Entspricht Ihrer Schätzung bezüglich der Höhe des Zinssatzes Wenn Sie keinen Wert für \"Schätzwert\" angeben, wird 10 Prozent angenommen. Wenn ZINS nicht konvergiert, sollten Sie einen anderen Wert für \"Schätzwert\" angeben. Normalerweise konvergiert ZINS, wenn \"Schätzwert\" zwischen 0 und 1 liegt."
			}
		}
	},
	RECEIVED: {
		description: "Gibt den Auszahlungsbetrag eines voll investierten Wertpapiers am Fälligkeitstermin zurück.",
		abstract: "Gibt den Auszahlungsbetrag eines voll investierten Wertpapiers am Fälligkeitstermin zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/received-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Erforderlich. Der Abrechnungstermin des Wertpapierkaufs. Der Abrechnungstermin des Wertpapierkaufs ist das Datum nach der Wertpapieremission, wenn das Wertpapier in den Besitz des Käufers übergeht."
			},
			maturity: {
				name: "maturity",
				detail: "Erforderlich. Der Fälligkeitstermin des Wertpapiers. Dabei handelt es sich um den Zeitpunkt, zu dem das Wertpapier abläuft."
			},
			investment: {
				name: "investment",
				detail: "Erforderlich. Der Betrag, der in dem Wertpapier angelegt werden soll"
			},
			discount: {
				name: "discount",
				detail: "Erforderlich. Der in Prozent ausgedrückte Abschlag (Disagio) des Wertpapiers"
			},
			basis: {
				name: "basis",
				detail: "Optional. Der Typ, auf dessen Basis die Zinstage gezählt werden."
			}
		}
	},
	RRI: {
		description: "Gibt den effektiven Jahreszins für den Wertzuwachs einer Investition zurück.",
		abstract: "Gibt den effektiven Jahreszins für den Wertzuwachs einer Investition zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/rri-function"
		}],
		functionParameter: {
			nper: {
				name: "nper",
				detail: "Erforderlich. Die Anzahl der Perioden für die Investition."
			},
			pv: {
				name: "pv",
				detail: "Erforderlich. Der aktuelle Wert der Investition."
			},
			fv: {
				name: "fv",
				detail: "Erforderlich. Der zukünftige Wert der Investition."
			}
		}
	},
	SLN: {
		description: "Gibt die lineare Abschreibung eines Wirtschaftsgutes pro Periode zurück.",
		abstract: "Gibt die lineare Abschreibung eines Wirtschaftsgutes pro Periode zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/sln-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Erforderlich. Die Anschaffungskosten eines Wirtschaftsgutes."
			},
			salvage: {
				name: "salvage",
				detail: "Erforderlich. Der Restwert am Ende der Nutzungsdauer (wird häufig auch als Schrottwert bezeichnet)."
			},
			life: {
				name: "life",
				detail: "Erforderlich. Die Anzahl der Perioden, über die das Wirtschaftsgut abgeschrieben wird (auch als Nutzungsdauer bezeichnet)"
			}
		}
	},
	SYD: {
		description: "Gibt die arithmetisch-degressive Abschreibung eines Wirtschaftsgutes für eine bestimmte Periode zurück.",
		abstract: "Gibt die arithmetisch-degressive Abschreibung eines Wirtschaftsgutes für eine bestimmte Periode zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/syd-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Erforderlich. Die Anschaffungskosten eines Wirtschaftsgutes."
			},
			salvage: {
				name: "salvage",
				detail: "Erforderlich. Der Restwert am Ende der Nutzungsdauer (wird häufig auch als Schrottwert bezeichnet)."
			},
			life: {
				name: "life",
				detail: "Erforderlich. Die Anzahl der Perioden, über die das Wirtschaftsgut abgeschrieben wird (auch als Nutzungsdauer bezeichnet)"
			},
			per: {
				name: "per",
				detail: "Erforderlich. Die Periode; hierfür muss dieselbe Zeiteinheit wie für die Nutzungsdauer verwendet werden."
			}
		}
	},
	TBILLEQ: {
		description: "Rechnet die Verzinsung eines Schatzwechsels (Treasury Bill) in die für Anleihen übliche einfache jährliche Verzinsung um.",
		abstract: "Rechnet die Verzinsung eines Schatzwechsels (Treasury Bill) in die für Anleihen übliche einfache jährliche Verzinsung um.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/tbilleq-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Erforderlich. Der Abrechnungstermin des Wertpapiers. Der Abrechnungstermin des Wertpapierkaufs entspricht dem Zeitpunkt nach Emission, an dem das Wertpapier in den Besitz des Käufers übergeht."
			},
			maturity: {
				name: "maturity",
				detail: "Erforderlich. Der Fälligkeitstermin des Wertpapiers. Dabei handelt es sich um den Zeitpunkt, zu dem das Wertpapier abläuft."
			},
			discount: {
				name: "discount",
				detail: "Erforderlich. Der in Prozent ausgedrückte Abschlag (Disagio) des Wertpapiers"
			}
		}
	},
	TBILLPRICE: {
		description: "Gibt den Kurs pro 100 € Nennwert eines Schatzwechsels (Treasury Bill) zurück.",
		abstract: "Gibt den Kurs pro 100 € Nennwert eines Schatzwechsels (Treasury Bill) zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/tbillprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Erforderlich. Der Abrechnungstermin des Wertpapiers. Der Abrechnungstermin des Wertpapierkaufs entspricht dem Zeitpunkt nach Emission, an dem das Wertpapier in den Besitz des Käufers übergeht."
			},
			maturity: {
				name: "maturity",
				detail: "Erforderlich. Der Fälligkeitstermin des Wertpapiers. Dabei handelt es sich um den Zeitpunkt, zu dem das Wertpapier abläuft."
			},
			discount: {
				name: "discount",
				detail: "Erforderlich. Der in Prozent ausgedrückte Abschlag (Disagio) des Wertpapiers"
			}
		}
	},
	TBILLYIELD: {
		description: "Gibt die Rendite eines Schatzwechsels (Treasury Bill) zurück.",
		abstract: "Gibt die Rendite eines Schatzwechsels (Treasury Bill) zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/tbillyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Erforderlich. Der Abrechnungstermin des Wertpapiers. Der Abrechnungstermin des Wertpapierkaufs entspricht dem Zeitpunkt nach Emission, an dem das Wertpapier in den Besitz des Käufers übergeht."
			},
			maturity: {
				name: "maturity",
				detail: "Erforderlich. Der Fälligkeitstermin des Wertpapiers. Dabei handelt es sich um den Zeitpunkt, zu dem das Wertpapier abläuft."
			},
			pr: {
				name: "pr",
				detail: "Erforderlich. Der Kurs (Kaufpreis) des Wertpapiers pro 100 € Nennwert"
			}
		}
	},
	VDB: {
		description: "Gibt die degressive Doppelraten-Abschreibung eines Wirtschaftsgutes für eine bestimmte Periode oder Teilperiode zurück. VDB ist ein Akronym für \"variable declining balance\" (variabler abnehmender Saldo).",
		abstract: "Gibt die degressive Doppelraten-Abschreibung eines Wirtschaftsgutes für eine bestimmte Periode oder Teilperiode zurück. VDB ist ein Akronym für \"variable declining balance\" (variabler abnehmender Saldo).",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/vdb-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Erforderlich. Die Anschaffungskosten eines Wirtschaftsgutes."
			},
			salvage: {
				name: "salvage",
				detail: "Erforderlich. Der Restwert am Ende der Nutzungsdauer (wird häufig auch als Schrottwert bezeichnet). Der Wert kann 0 betragen."
			},
			life: {
				name: "life",
				detail: "Erforderlich. Die Anzahl der Perioden, über die das Wirtschaftsgut abgeschrieben wird (auch als Nutzungsdauer bezeichnet)"
			},
			startPeriod: {
				name: "start_period",
				detail: "Erforderlich. Der Anfangszeitraum, für den Sie die Abschreibung berechnen möchten. \"Anfang\" muss in derselben Zeiteinheit vorliegen wie \"Nutzungsdauer\"."
			},
			endPeriod: {
				name: "end_period",
				detail: "Erforderlich. Der Endzeitraum, für den Sie die Abschreibung berechnen möchten. \"Ende\" muss in derselben Zeiteinheit vorliegen wie \"Nutzungsdauer\"."
			},
			factor: {
				name: "factor",
				detail: "Optional. Die Rate, um die der Restbuchwert abnimmt. Fehlt das Argument Faktor, wird es als 2 angenommen (das Verfahren der degressiven Doppelraten-Abschreibung). Wenn Sie das Verfahren der degressiven Doppelraten-Abschreibung nicht anwenden möchten, müssen Sie einen anderen Faktor angeben. Eine Beschreibung des Verfahrens der degressiven Doppelraten-Abschreibung finden Sie unter GDA."
			},
			noSwitch: {
				name: "no_switch",
				detail: "Optional. Ein Wahrheitswert, mit dem angegeben wird, ob zur linearen Abschreibung gewechselt werden soll, wenn der dabei berechnete Abschreibungsbetrag größer ist als der bei der geometrischen Abschreibung. Ist Nicht_wechseln mit WAHR belegt, wechselt Microsoft Excel selbst dann nicht zu dem Verfahren der linearen Abschreibung, wenn der dabei berechnete Abschreibungsbetrag größer ist als der bei der geometrischen Abschreibung. Ist Nicht_wechseln mit FALSCH belegt oder nicht angegeben, wechselt Excel zu dem Verfahren der linearen Abschreibung, wenn der dabei berechnete Abschreibungsbetrag größer ist als der bei der geometrischen Abschreibung."
			}
		}
	},
	XIRR: {
		description: "Gibt den internen Zinsfuß einer Reihe nicht periodisch anfallender Zahlungen zurück. Verwenden Sie zum Berechnen des internen Zinsflusses einer Reihe periodisch anfallender Zahlungen die Funktion IKV.",
		abstract: "Gibt den internen Zinsfuß einer Reihe nicht periodisch anfallender Zahlungen zurück. Verwenden Sie zum Berechnen des internen Zinsflusses einer Reihe periodisch anfallender Zahlungen die Funktion IKV.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/xirr-function"
		}],
		functionParameter: {
			values: {
				name: "values",
				detail: "Erforderlich. Eine Reihe nicht periodisch anfallender Zahlungen, die sich auf die Zeitpunkte des Zahlungsplans beziehen. Die erste Zahlung ist optional und entspricht einer Auszahlung, die zu Beginn der jeweiligen Investition erfolgt. Wenn es sich beim ersten Wert um Kosten oder eine Zahlung handelt, muss dieser Wert negativ sein. Alle folgenden Zahlungen werden, ausgehend von einem 365-Tage-Jahr, diskontiert (abgezinst). Die Wertereihe muss mindestens einen positiven Wert und einen negativen Wert enthalten."
			},
			dates: {
				name: "dates",
				detail: "Erforderlich. Die Zeitpunkte im Zahlungsplan der nicht periodisch anfallenden Zahlungen. Datumsangaben können in beliebiger Reihenfolge auftreten. Datumsangaben sollten mit der Funktion DATUM oder als Ergebnis anderer Formeln oder Funktionen eingegeben werden. Beispiel: Verwenden Sie DATUM(2008,5,23) für den 23. Mai 2008. Probleme können auftreten, wenn Datumsangaben als Text eingegeben werden. ."
			},
			guess: {
				name: "guess",
				detail: "Optional. Eine Zahl, von der Sie annehmen, dass sie dem Ergebnis der Funktion XINTZINSFUSS nahe kommt"
			}
		}
	},
	XNPV: {
		description: "Gibt den Nettobarwert (Kapitalwert) einer Reihe nicht periodisch anfallender Zahlungen zurück. Verwenden Sie zum Berechnen des Nettobarwerts einer Reihe periodisch anfallender Zahlungen die Funktion NBW.",
		abstract: "Gibt den Nettobarwert (Kapitalwert) einer Reihe nicht periodisch anfallender Zahlungen zurück. Verwenden Sie zum Berechnen des Nettobarwerts einer Reihe periodisch anfallender Zahlungen die Funktion NBW.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/xnpv-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Erforderlich. Der Kalkulationszinsfuß, der für die Zahlungen zu berücksichtigen ist"
			},
			values: {
				name: "values",
				detail: "Erforderlich. Eine Reihe nicht periodisch anfallender Zahlungen, die sich auf die Zeitpunkte des Zahlungsplans beziehen. Die erste Zahlung ist optional und entspricht einer Auszahlung, die zu Beginn der jeweiligen Investition erfolgt. Wenn es sich beim ersten Wert um Kosten oder eine Zahlung handelt, muss dieser Wert negativ sein. Alle folgenden Zahlungen werden, ausgehend von einem 365-Tage-Jahr, diskontiert (abgezinst). Die Wertereihe muss mindestens einen positiven Wert und einen negativen Wert enthalten."
			},
			dates: {
				name: "dates",
				detail: "Erforderlich. Die Zeitpunkte im Zahlungsplan der nicht periodisch anfallenden Zahlungen. Der erste Zahlungstermin legt den Beginn des Zahlungsplans fest. Alle anderen Termine müssen später liegen als dieser Termin, können aber in beliebiger Reihenfolge angegeben sein."
			}
		}
	},
	YIELD: {
		description: "Gibt die Rendite eines Wertpapiers zurück, das periodisch Zinsen auszahlt. Mit RENDITE können Sie die Rendite von Anleihen und Obligationen berechnen.",
		abstract: "Gibt die Rendite eines Wertpapiers zurück, das periodisch Zinsen auszahlt. Mit RENDITE können Sie die Rendite von Anleihen und Obligationen berechnen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/yield-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Erforderlich. Der Abrechnungstermin des Wertpapierkaufs. Der Abrechnungstermin des Wertpapierkaufs ist das Datum nach der Wertpapieremission, wenn das Wertpapier in den Besitz des Käufers übergeht."
			},
			maturity: {
				name: "maturity",
				detail: "Erforderlich. Der Fälligkeitstermin des Wertpapiers. Dabei handelt es sich um den Zeitpunkt, zu dem das Wertpapier abläuft."
			},
			rate: {
				name: "rate",
				detail: "Erforderlich. Der jährliche Nominalzins (Kuponzinssatz) des Wertpapiers"
			},
			pr: {
				name: "pr",
				detail: "Erforderlich. Der Kurs des Wertpapiers pro 100 € Nennwert."
			},
			redemption: {
				name: "redemption",
				detail: "Erforderlich. Der Rückzahlungswert des Wertpapiers pro 100 € Nennwert"
			},
			frequency: {
				name: "frequency",
				detail: "Erforderlich. Die Anzahl der Zinszahlungen pro Jahr. Bei jährlichen Zahlungen ist Häufigkeit = 1; bei halbjährlichen ist Häufigkeit = 2; bei vierteljährlichen ist Häufigkeit = 4."
			},
			basis: {
				name: "basis",
				detail: "Optional. Der Typ, auf dessen Basis die Zinstage gezählt werden."
			}
		}
	},
	YIELDDISC: {
		description: "Gibt die jährliche Rendite eines unverzinslichen Wertpapiers zurück.",
		abstract: "Gibt die jährliche Rendite eines unverzinslichen Wertpapiers zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/yielddisc-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Erforderlich. Der Abrechnungstermin des Wertpapierkaufs. Der Abrechnungstermin des Wertpapierkaufs ist das Datum nach der Wertpapieremission, wenn das Wertpapier in den Besitz des Käufers übergeht."
			},
			maturity: {
				name: "maturity",
				detail: "Erforderlich. Der Fälligkeitstermin des Wertpapiers. Dabei handelt es sich um den Zeitpunkt, zu dem das Wertpapier abläuft."
			},
			pr: {
				name: "pr",
				detail: "Erforderlich. Der Kurs des Wertpapiers pro 100 € Nennwert."
			},
			redemption: {
				name: "redemption",
				detail: "Erforderlich. Der Rückzahlungswert des Wertpapiers pro 100 € Nennwert"
			},
			basis: {
				name: "basis",
				detail: "Optional. Der Typ, auf dessen Basis die Zinstage gezählt werden."
			}
		}
	},
	YIELDMAT: {
		description: "Gibt die jährliche Rendite eines Wertpapiers zurück, das Zinsen am Fälligkeitsdatum auszahlt.",
		abstract: "Gibt die jährliche Rendite eines Wertpapiers zurück, das Zinsen am Fälligkeitsdatum auszahlt.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/yieldmat-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Erforderlich. Der Abrechnungstermin des Wertpapierkaufs. Der Abrechnungstermin des Wertpapierkaufs ist das Datum nach der Wertpapieremission, wenn das Wertpapier in den Besitz des Käufers übergeht."
			},
			maturity: {
				name: "maturity",
				detail: "Erforderlich. Der Fälligkeitstermin des Wertpapiers. Dabei handelt es sich um den Zeitpunkt, zu dem das Wertpapier abläuft."
			},
			issue: {
				name: "issue",
				detail: "Erforderlich. Das Datum der Wertpapieremission, als fortlaufende Zahl angegeben"
			},
			rate: {
				name: "rate",
				detail: "Erforderlich. Der Zinssatz des Wertpapiers am Emissionsdatum"
			},
			pr: {
				name: "pr",
				detail: "Erforderlich. Der Kurs des Wertpapiers pro 100 € Nennwert."
			},
			basis: {
				name: "basis",
				detail: "Optional. Der Typ, auf dessen Basis die Zinstage gezählt werden."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/information/de-DE.ts
const locale$8 = {
	CELL: {
		description: "Mit der Funktion ZELLE werden Informationen zur Formatierung, zur Position oder zum Inhalt einer Zelle zurückgegeben. Wenn Sie beispielsweise vor dem Ausführen einer Berechnung für eine Zelle prüfen möchten, ob sie einen numerischen Wert und keinen Text enthält, können Sie die folgende Formel verwenden:",
		abstract: "Mit der Funktion ZELLE werden Informationen zur Formatierung, zur Position oder zum Inhalt einer Zelle zurückgegeben. Wenn Sie beispielsweise vor dem Ausführen einer Berechnung für eine Zelle prüfen möchten, ob sie einen numerischen Wert und keinen Text enthält, können Sie die folgende Formel verwenden:",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/cell-function"
		}],
		functionParameter: {
			infoType: {
				name: "info_type",
				detail: "Ein Textwert, der angibt, welcher Typ von Zellinformationen zurückgegeben werden soll. In der folgenden Liste werden die möglichen Werte für das Argument \"Infotyp\" und die entsprechenden Ergebnisse angezeigt."
			},
			reference: {
				name: "reference",
				detail: "Die Zelle, zu der Sie Informationen wünschen. Wenn das Argument \"Infotyp\" ausgelassen wird, werden die darin angegebenen Informationen für die zum Zeitpunkt der Berechnung ausgewählte Zelle zurückgegeben. Wenn es sich bei dem Argument „Bezug“ um einen Zellbereich handelt, gibt die Funktion ZELLE die Informationen für die aktive Zelle im ausgewählten Bereich zurück. Wichtig: Obwohl ein Verweis technisch gesehen optional ist, wird die Aufnahme in ihre Formel empfohlen, es sei denn, Sie verstehen, welche Auswirkungen ihr Fehlen auf das Formelergebnis hat, und möchten, dass dieser Effekt vorhanden ist. Das Weglassen des Arguments Verweis liefert aus folgenden Gründen keine verlässlichen Informationen zu einer bestimmten Zelle: Im automatischen Berechnungsmodus kann die Berechnung, wenn eine Zelle von einer Person geändert wird, je nach verwendeter Excel-Plattform vor oder nach der Änderung der Auswahl ausgelöst werden. Beispielsweise löst Excel für Windows derzeit berechnungen aus, bevor die Auswahl geändert wird, aber Excel für das Web löst sie danach aus. Wenn Co-Authoring mit einem anderen Benutzer, der eine Bearbeitung vornimmt, meldet diese Funktion Ihre aktive Zelle und nicht die des Editors. Jede Neuberechnung für instance Drücken von F9 bewirkt, dass die Funktion ein neues Ergebnis zurückgibt, obwohl keine Zellbearbeitung erfolgt ist."
			}
		}
	},
	ERROR_TYPE: {
		description: "Gibt eine Zahl zurück, die einem der Fehlerwerte in Microsoft Excel entspricht, oder den Fehlerwert #NV, wenn kein Fehler vorhanden ist. Sie können FEHLER.TYP in einer WENN-Funktion verwenden, um einen Fehlerwert zu ermitteln und eine Zeichenfolge, beispielsweise eine Meldung, anstelle des Fehlerwerts zurückzugeben.",
		abstract: "Gibt eine Zahl zurück, die einem der Fehlerwerte in Microsoft Excel entspricht, oder den Fehlerwert #NV, wenn kein Fehler vorhanden ist. Sie können FEHLER.TYP in einer WENN-Funktion verwenden, um einen Fehlerwert zu ermitteln und eine Zeichenfolge, beispielsweise eine Meldung, anstelle des Fehlerwerts zurückzugeben.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/error-type-function"
		}],
		functionParameter: { errorVal: {
			name: "error_val",
			detail: "Erforderlich. Der Fehlerwert, dessen Identifikationsnummer Sie finden möchten. Obwohl error_val der tatsächliche Fehlerwert sein kann, handelt es sich in der Regel um einen Verweis auf eine Zelle, die eine Formel enthält, die Sie testen möchten."
		} }
	},
	INFO: {
		description: "Gibt Informationen zur aktuellen Betriebssystemumgebung zurück.",
		abstract: "Gibt Informationen zur aktuellen Betriebssystemumgebung zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/info-function"
		}],
		functionParameter: { typeText: {
			name: "Type_text",
			detail: "Erforderlich. Text, der bestimmt, welche Art von Informationen Sie erhalten möchten"
		} }
	},
	ISBETWEEN: {
		description: "Prüft, ob eine angegebene Zahl einschließlich oder ausschließlich zwischen zwei anderen Zahlen liegt.",
		abstract: "Prüft, ob eine angegebene Zahl einschließlich oder ausschließlich zwischen zwei anderen Zahlen liegt.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/10538337?hl=de"
		}],
		functionParameter: {
			valueToCompare: {
				name: "value_to_compare",
				detail: "Der Wert, der darauf geprüft wird, ob er zwischen `lower_value` und `upper_value` liegt."
			},
			lowerValue: {
				name: "lower_value",
				detail: "Die Untergrenze des Wertebereichs, in den `value_to_compare` fallen kann."
			},
			upperValue: {
				name: "upper_value",
				detail: "Die Obergrenze des Wertebereichs, in den `value_to_compare` fallen kann."
			},
			lowerValueIsInclusive: {
				name: "lower_value_is_inclusive",
				detail: "Ob der Wertebereich `lower_value` einschließt. Standardmäßig TRUE."
			},
			upperValueIsInclusive: {
				name: "upper_value_is_inclusive",
				detail: "Ob der Wertebereich `upper_value` einschließt. Standardmäßig TRUE."
			}
		}
	},
	ISBLANK: {
		description: "Mit jeder dieser Funktionen, die zusammen als IST -Funktionen bezeichnet werden, wird der angegebene Wert überprüft und je nach Ergebnis WAHR oder FALSCH zurückgegeben. Beispielsweise gibt die Funktion ISTLEER den Wahrheitswert WAHR zurück, wenn das Argument für den Wert einen Bezug auf eine leere Zelle darstellt. Andernfalls wird FALSCH zurückgegeben.",
		abstract: "Mit jeder dieser Funktionen, die zusammen als IST -Funktionen bezeichnet werden, wird der angegebene Wert überprüft und je nach Ergebnis WAHR oder FALSCH zurückgegeben. Beispielsweise gibt die Funktion ISTLEER den Wahrheitswert WAHR zurück, wenn das Argument für den Wert einen Bezug auf eine leere Zelle darstellt. Andernfalls wird FALSCH zurückgegeben.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Erforderlich. Der Wert, der geprüft werden soll. Das Argument für den Wert kann eine leere Zelle, ein Fehlerwert, ein Wahrheitswert, Text, eine Zahl, ein Bezugswert oder ein Name sein, der sich auf eine dieser Möglichkeiten bezieht."
		} }
	},
	ISDATE: {
		description: "Die Funktion ISDATE gibt zurück, ob ein Wert ein Datum ist.",
		abstract: "Die Funktion ISDATE gibt zurück, ob ein Wert ein Datum ist.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9061381?hl=de"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Der Wert, der als Datum überprüft werden soll."
		} }
	},
	ISEMAIL: {
		description: "Mit der Funktion ISEMAIL wird geprüft, ob ein Wert eine gültige E-Mail-Adresse ist. Dabei wird geprüft, ob der Wert einem allgemein akzeptierten E-Mail-Adressformat entspricht, nicht jedoch, ob die Adresse tatsächlich existiert.",
		abstract: "Mit der Funktion ISEMAIL wird geprüft, ob ein Wert eine gültige E-Mail-Adresse ist. Dabei wird geprüft, ob der Wert einem allgemein akzeptierten E-Mail-Adressformat entspricht, nicht jedoch, ob die Adresse tatsächlich existiert.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3256503?hl=de"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Der Wert, der als E-Mail-Adresse überprüft werden soll."
		} }
	},
	ISERR: {
		description: "Mit jeder dieser Funktionen, die zusammen als IST -Funktionen bezeichnet werden, wird der angegebene Wert überprüft und je nach Ergebnis WAHR oder FALSCH zurückgegeben. Beispielsweise gibt die Funktion ISTLEER den Wahrheitswert WAHR zurück, wenn das Argument für den Wert einen Bezug auf eine leere Zelle darstellt. Andernfalls wird FALSCH zurückgegeben.",
		abstract: "Mit jeder dieser Funktionen, die zusammen als IST -Funktionen bezeichnet werden, wird der angegebene Wert überprüft und je nach Ergebnis WAHR oder FALSCH zurückgegeben. Beispielsweise gibt die Funktion ISTLEER den Wahrheitswert WAHR zurück, wenn das Argument für den Wert einen Bezug auf eine leere Zelle darstellt. Andernfalls wird FALSCH zurückgegeben.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Erforderlich. Der Wert, der geprüft werden soll. Das Argument für den Wert kann eine leere Zelle, ein Fehlerwert, ein Wahrheitswert, Text, eine Zahl, ein Bezugswert oder ein Name sein, der sich auf eine dieser Möglichkeiten bezieht."
		} }
	},
	ISERROR: {
		description: "Mit jeder dieser Funktionen, die zusammen als IST -Funktionen bezeichnet werden, wird der angegebene Wert überprüft und je nach Ergebnis WAHR oder FALSCH zurückgegeben. Beispielsweise gibt die Funktion ISTLEER den Wahrheitswert WAHR zurück, wenn das Argument für den Wert einen Bezug auf eine leere Zelle darstellt. Andernfalls wird FALSCH zurückgegeben.",
		abstract: "Mit jeder dieser Funktionen, die zusammen als IST -Funktionen bezeichnet werden, wird der angegebene Wert überprüft und je nach Ergebnis WAHR oder FALSCH zurückgegeben. Beispielsweise gibt die Funktion ISTLEER den Wahrheitswert WAHR zurück, wenn das Argument für den Wert einen Bezug auf eine leere Zelle darstellt. Andernfalls wird FALSCH zurückgegeben.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Erforderlich. Der Wert, der geprüft werden soll. Das Argument für den Wert kann eine leere Zelle, ein Fehlerwert, ein Wahrheitswert, Text, eine Zahl, ein Bezugswert oder ein Name sein, der sich auf eine dieser Möglichkeiten bezieht."
		} }
	},
	ISEVEN: {
		description: "Gibt WAHR zurück, wenn die Zahl gerade ist, oder FALSCH, wenn die Zahl ungerade ist.",
		abstract: "Gibt WAHR zurück, wenn die Zahl gerade ist, oder FALSCH, wenn die Zahl ungerade ist.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/iseven-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Erforderlich. Der zu prüfende Wert. Ist \"Zahl\" keine ganze Zahl, werden deren Nachkommastellen abgeschnitten."
		} }
	},
	ISFORMULA: {
		description: "Überprüft, ob ein Bezug auf eine Zelle verweist, die eine Formel enthält, und gibt WAHR oder FALSCH zurück.",
		abstract: "Überprüft, ob ein Bezug auf eine Zelle verweist, die eine Formel enthält, und gibt WAHR oder FALSCH zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/isformula-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "Erforderlich. Ein Bezug auf die zu prüfende Zelle. Der Bezug kann ein Zellbezug, eine Formel oder ein Name sein, der auf eine Zelle verweist."
		} }
	},
	ISLOGICAL: {
		description: "Mit jeder dieser Funktionen, die zusammen als IST -Funktionen bezeichnet werden, wird der angegebene Wert überprüft und je nach Ergebnis WAHR oder FALSCH zurückgegeben. Beispielsweise gibt die Funktion ISTLEER den Wahrheitswert WAHR zurück, wenn das Argument für den Wert einen Bezug auf eine leere Zelle darstellt. Andernfalls wird FALSCH zurückgegeben.",
		abstract: "Mit jeder dieser Funktionen, die zusammen als IST -Funktionen bezeichnet werden, wird der angegebene Wert überprüft und je nach Ergebnis WAHR oder FALSCH zurückgegeben. Beispielsweise gibt die Funktion ISTLEER den Wahrheitswert WAHR zurück, wenn das Argument für den Wert einen Bezug auf eine leere Zelle darstellt. Andernfalls wird FALSCH zurückgegeben.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Erforderlich. Der Wert, der geprüft werden soll. Das Argument für den Wert kann eine leere Zelle, ein Fehlerwert, ein Wahrheitswert, Text, eine Zahl, ein Bezugswert oder ein Name sein, der sich auf eine dieser Möglichkeiten bezieht."
		} }
	},
	ISNA: {
		description: "Mit jeder dieser Funktionen, die zusammen als IST -Funktionen bezeichnet werden, wird der angegebene Wert überprüft und je nach Ergebnis WAHR oder FALSCH zurückgegeben. Beispielsweise gibt die Funktion ISTLEER den Wahrheitswert WAHR zurück, wenn das Argument für den Wert einen Bezug auf eine leere Zelle darstellt. Andernfalls wird FALSCH zurückgegeben.",
		abstract: "Mit jeder dieser Funktionen, die zusammen als IST -Funktionen bezeichnet werden, wird der angegebene Wert überprüft und je nach Ergebnis WAHR oder FALSCH zurückgegeben. Beispielsweise gibt die Funktion ISTLEER den Wahrheitswert WAHR zurück, wenn das Argument für den Wert einen Bezug auf eine leere Zelle darstellt. Andernfalls wird FALSCH zurückgegeben.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Erforderlich. Der Wert, der geprüft werden soll. Das Argument für den Wert kann eine leere Zelle, ein Fehlerwert, ein Wahrheitswert, Text, eine Zahl, ein Bezugswert oder ein Name sein, der sich auf eine dieser Möglichkeiten bezieht."
		} }
	},
	ISNONTEXT: {
		description: "Mit jeder dieser Funktionen, die zusammen als IST -Funktionen bezeichnet werden, wird der angegebene Wert überprüft und je nach Ergebnis WAHR oder FALSCH zurückgegeben. Beispielsweise gibt die Funktion ISTLEER den Wahrheitswert WAHR zurück, wenn das Argument für den Wert einen Bezug auf eine leere Zelle darstellt. Andernfalls wird FALSCH zurückgegeben.",
		abstract: "Mit jeder dieser Funktionen, die zusammen als IST -Funktionen bezeichnet werden, wird der angegebene Wert überprüft und je nach Ergebnis WAHR oder FALSCH zurückgegeben. Beispielsweise gibt die Funktion ISTLEER den Wahrheitswert WAHR zurück, wenn das Argument für den Wert einen Bezug auf eine leere Zelle darstellt. Andernfalls wird FALSCH zurückgegeben.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Erforderlich. Der Wert, der geprüft werden soll. Das Argument für den Wert kann eine leere Zelle, ein Fehlerwert, ein Wahrheitswert, Text, eine Zahl, ein Bezugswert oder ein Name sein, der sich auf eine dieser Möglichkeiten bezieht."
		} }
	},
	ISNUMBER: {
		description: "Mit jeder dieser Funktionen, die zusammen als IST -Funktionen bezeichnet werden, wird der angegebene Wert überprüft und je nach Ergebnis WAHR oder FALSCH zurückgegeben. Beispielsweise gibt die Funktion ISTLEER den Wahrheitswert WAHR zurück, wenn das Argument für den Wert einen Bezug auf eine leere Zelle darstellt. Andernfalls wird FALSCH zurückgegeben.",
		abstract: "Mit jeder dieser Funktionen, die zusammen als IST -Funktionen bezeichnet werden, wird der angegebene Wert überprüft und je nach Ergebnis WAHR oder FALSCH zurückgegeben. Beispielsweise gibt die Funktion ISTLEER den Wahrheitswert WAHR zurück, wenn das Argument für den Wert einen Bezug auf eine leere Zelle darstellt. Andernfalls wird FALSCH zurückgegeben.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Erforderlich. Der Wert, der geprüft werden soll. Das Argument für den Wert kann eine leere Zelle, ein Fehlerwert, ein Wahrheitswert, Text, eine Zahl, ein Bezugswert oder ein Name sein, der sich auf eine dieser Möglichkeiten bezieht."
		} }
	},
	ISODD: {
		description: "Gibt WAHR zurück, wenn die Zahl ungerade ist, oder FALSCH, wenn die Zahl gerade ist.",
		abstract: "Gibt WAHR zurück, wenn die Zahl ungerade ist, oder FALSCH, wenn die Zahl gerade ist.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/isodd-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Erforderlich. Der zu prüfende Wert. Ist \"Zahl\" keine ganze Zahl, werden deren Nachkommastellen abgeschnitten."
		} }
	},
	ISOMITTED: {
		description: "Überprüft, ob der Wert in einem LAMBDA fehlt , und gibt TRUE oder FALSE zurück.",
		abstract: "Überprüft, ob der Wert in einem LAMBDA fehlt , und gibt TRUE oder FALSE zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/isomitted-function"
		}],
		functionParameter: { argument: {
			name: "Argument",
			detail: "Der Wert, den Sie testen möchten, z. B. ein LAMBDA-Parameter."
		} }
	},
	ISREF: {
		description: "Mit jeder dieser Funktionen, die zusammen als IST -Funktionen bezeichnet werden, wird der angegebene Wert überprüft und je nach Ergebnis WAHR oder FALSCH zurückgegeben. Beispielsweise gibt die Funktion ISTLEER den Wahrheitswert WAHR zurück, wenn das Argument für den Wert einen Bezug auf eine leere Zelle darstellt. Andernfalls wird FALSCH zurückgegeben.",
		abstract: "Mit jeder dieser Funktionen, die zusammen als IST -Funktionen bezeichnet werden, wird der angegebene Wert überprüft und je nach Ergebnis WAHR oder FALSCH zurückgegeben. Beispielsweise gibt die Funktion ISTLEER den Wahrheitswert WAHR zurück, wenn das Argument für den Wert einen Bezug auf eine leere Zelle darstellt. Andernfalls wird FALSCH zurückgegeben.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Erforderlich. Der Wert, der geprüft werden soll. Das Argument für den Wert kann eine leere Zelle, ein Fehlerwert, ein Wahrheitswert, Text, eine Zahl, ein Bezugswert oder ein Name sein, der sich auf eine dieser Möglichkeiten bezieht."
		} }
	},
	ISTEXT: {
		description: "Mit jeder dieser Funktionen, die zusammen als IST -Funktionen bezeichnet werden, wird der angegebene Wert überprüft und je nach Ergebnis WAHR oder FALSCH zurückgegeben. Beispielsweise gibt die Funktion ISTLEER den Wahrheitswert WAHR zurück, wenn das Argument für den Wert einen Bezug auf eine leere Zelle darstellt. Andernfalls wird FALSCH zurückgegeben.",
		abstract: "Mit jeder dieser Funktionen, die zusammen als IST -Funktionen bezeichnet werden, wird der angegebene Wert überprüft und je nach Ergebnis WAHR oder FALSCH zurückgegeben. Beispielsweise gibt die Funktion ISTLEER den Wahrheitswert WAHR zurück, wenn das Argument für den Wert einen Bezug auf eine leere Zelle darstellt. Andernfalls wird FALSCH zurückgegeben.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Erforderlich. Der Wert, der geprüft werden soll. Das Argument für den Wert kann eine leere Zelle, ein Fehlerwert, ein Wahrheitswert, Text, eine Zahl, ein Bezugswert oder ein Name sein, der sich auf eine dieser Möglichkeiten bezieht."
		} }
	},
	ISURL: {
		description: "Prüft, ob ein Wert eine gültige URL ist.",
		abstract: "Prüft, ob ein Wert eine gültige URL ist.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3256501?hl=de"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Der Wert, der als URL überprüft werden soll."
		} }
	},
	N: {
		description: "Gibt den in eine Zahl umgewandelten Wert zurück.",
		abstract: "Gibt den in eine Zahl umgewandelten Wert zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/n-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Erforderlich. Der Wert, den Sie in eine Zahl umwandeln möchten. \"N\" wandelt Werte gemäß der folgenden Tabelle um."
		} }
	},
	NA: {
		description: "Gibt den Fehlerwert #NV zurück. #N/A ist der Fehlerwert, der bedeutet, dass kein Wert verfügbar ist. Verwenden Sie NA, um leere Zellen zu markieren. Indem Sie #NV in Zellen eingeben, die keine Informationen enthalten, können Sie verhindern, dass leere Zellen unbeabsichtigt in Ihre Berechnungen einbezogen werden. (Wenn sich eine Formel auf eine Zelle bezieht, die den Wert #NV enthält, gibt die Formel den Fehlerwert #NV zurück.)",
		abstract: "Gibt den Fehlerwert #NV zurück. #N/A ist der Fehlerwert, der bedeutet, dass kein Wert verfügbar ist. Verwenden Sie NA, um leere Zellen zu markieren. Indem Sie #NV in Zellen eingeben, die keine Informationen enthalten, können Sie verhindern, dass leere Zellen unbeabsichtigt in Ihre Berechnungen einbezogen werden. (Wenn sich eine Formel auf eine Zelle bezieht, die den Wert #NV enthält, gibt die Formel den Fehlerwert #NV zurück.)",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/na-function"
		}],
		functionParameter: {}
	},
	SHEET: {
		description: "Die SHEET-Funktion gibt die Blattnummer des angegebenen Blatts oder einer anderen Referenz zurück.",
		abstract: "Die SHEET-Funktion gibt die Blattnummer des angegebenen Blatts oder einer anderen Referenz zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/sheet-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Optionales Argument. Verwenden Sie diese Option, um den Namen eines Blatts oder eines Verweises anzugeben, für das Sie die Blattnummer abrufen möchten. Andernfalls gibt die Funktion die Nummer des Blatts zurück, das die SHEET-Funktion enthält."
		} }
	},
	SHEETS: {
		description: "Gibt die Anzahl der Blätter in einem Bezug zurück.",
		abstract: "Gibt die Anzahl der Blätter in einem Bezug zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/sheets-function"
		}],
		functionParameter: {}
	},
	TYPE: {
		description: "Gibt eine Zahl zurück, die den Datentyp des angegebenen Werts anzeigt. Die Funktion TYP können Sie immer dann verwenden, wenn das weitere Verhalten einer Funktion vom Typ des in einer bestimmten Zelle enthaltenen Werts abhängt.",
		abstract: "Gibt eine Zahl zurück, die den Datentyp des angegebenen Werts anzeigt. Die Funktion TYP können Sie immer dann verwenden, wenn das weitere Verhalten einer Funktion vom Typ des in einer bestimmten Zelle enthaltenen Werts abhängt.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/type-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Erforderlich. Kann ein beliebiger Microsoft Excel-Wert sein, beispielsweise eine Zahl, ein Text, ein Wahrheitswert usw."
		} }
	}
};

//#endregion
//#region src/locale/function-list/logical/de-DE.ts
const locale$7 = {
	AND: {
		description: "Die Funktion UND gibt den Wert WAHR zurück, wenn alle Argumente als WAHR bewertet werden. Werden ein oder mehrere Argumente als FALSCH bewertet, gibt die Funktion den Wert FALSCH zurück.",
		abstract: "Die Funktion UND gibt den Wert WAHR zurück, wenn alle Argumente als WAHR bewertet werden. Werden ein oder mehrere Argumente als FALSCH bewertet, gibt die Funktion den Wert FALSCH zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/and-function"
		}],
		functionParameter: {
			logical1: {
				name: "logical1",
				detail: "Die erste Bedingung, die Sie testen möchten und die WAHR oder FALSCH ergeben kann."
			},
			logical2: {
				name: "logical2",
				detail: "Weitere Bedingungen, die Sie testen möchten und die WAHR oder FALSCH ergeben können, bis zu maximal 255 Bedingungen."
			}
		}
	},
	BYCOL: {
		description: "Wendet einen LAMBDA-Wert auf jede Spalte an und gibt ein Array der Ergebnisse zurück. Wenn das ursprüngliche Array beispielsweise aus 3 Spalten mal 2 Zeilen besteht, enthält das zurückgegebene Array 3 Spalten mal 1 Zeilen.",
		abstract: "Wendet einen LAMBDA-Wert auf jede Spalte an und gibt ein Array der Ergebnisse zurück. Wenn das ursprüngliche Array beispielsweise aus 3 Spalten mal 2 Zeilen besteht, enthält das zurückgegebene Array 3 Spalten mal 1 Zeilen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/bycol-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Eine Matrix, die nach Spalten aufgeteilt wird."
			},
			lambda: {
				name: "lambda",
				detail: "Ein LAMBDA, das eine Spalte als einzelnen Parameter annimmt und ein Ergebnis berechnet. LAMBDA übernimmt einen einzelnen Parameter: eine Spalte aus array."
			}
		}
	},
	BYROW: {
		description: "Wendet eine LAMBDA auf jede Zeile an und gibt ein Array der Ergebnisse zurück. Wenn das ursprüngliche Array beispielsweise aus 3 Spalten mal 2 Zeilen besteht, enthält das zurückgegebene Array 1 Spalte mal 2 Zeilen.",
		abstract: "Wendet eine LAMBDA auf jede Zeile an und gibt ein Array der Ergebnisse zurück. Wenn das ursprüngliche Array beispielsweise aus 3 Spalten mal 2 Zeilen besteht, enthält das zurückgegebene Array 1 Spalte mal 2 Zeilen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/byrow-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Eine Matrix, die nach Zeilen aufgeteilt wird."
			},
			lambda: {
				name: "lambda",
				detail: "Ein LAMBDA, das eine Zeile als einzelnen Parameter annimmt und ein Ergebnis berechnet. LAMBDA übernimmt einen einzelnen Parameter: eine Zeile aus array."
			}
		}
	},
	FALSE: {
		description: "Gibt den Wahrheitswert FALSCH zurück.",
		abstract: "Gibt den Wahrheitswert FALSCH zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/false-function"
		}],
		functionParameter: {}
	},
	IF: {
		description: "Beispiel: Bei \"=WENN(C2=\"Ja\";1;2)\" lautet die Anweisung: WENN(C2 = Ja, 1 zurückgeben, andernfalls 2 zurückgeben).",
		abstract: "Beispiel: Bei \"=WENN(C2=\"Ja\";1;2)\" lautet die Anweisung: WENN(C2 = Ja, 1 zurückgeben, andernfalls 2 zurückgeben).",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/if-function"
		}],
		functionParameter: {
			logicalTest: {
				name: "logical_test",
				detail: "Die zu prüfende Bedingung."
			},
			valueIfTrue: {
				name: "value_if_true",
				detail: "Der Wert, der zurückgegeben werden soll, wenn das Ergebnis von logical_test TRUE ist."
			},
			valueIfFalse: {
				name: "value_if_false",
				detail: "Der Wert, der zurückgegeben werden soll, wenn das Ergebnis von logical_test FALSE ist."
			}
		}
	},
	IFERROR: {
		description: "Sie können die Funktion WENNFEHLER verwenden, um Fehler in einer Formel zu behandeln. WENNFEHLER gibt einen Wert zurück, den Sie angeben, wenn eine Formel einen Fehler auswertet. Andernfalls wird das Ergebnis der Formel zurückgegeben.",
		abstract: "Sie können die Funktion WENNFEHLER verwenden, um Fehler in einer Formel zu behandeln. WENNFEHLER gibt einen Wert zurück, den Sie angeben, wenn eine Formel einen Fehler auswertet. Andernfalls wird das Ergebnis der Formel zurückgegeben.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/iferror-function"
		}],
		functionParameter: {
			value: {
				name: "value",
				detail: "Erforderlich. Das Argument, das auf einen Fehler geprüft wird"
			},
			valueIfError: {
				name: "value_if_error",
				detail: "Erforderlich. Der zurückzugebende Wert, wenn die Formel als Fehler ausgewertet wird. Die folgenden Fehlertypen werden ausgewertet: #N/V, #WERT!, #BEZUG!, #DIV/0!, #ZAHL!, #NAME?, oder #NULL!."
			}
		}
	},
	IFNA: {
		description: "Die IFNA-Funktion gibt den wert zurück, den Sie angeben, wenn eine Formel den #N/A-Fehlerwert zurückgibt. andernfalls wird das Ergebnis der Formel zurückgegeben.",
		abstract: "Die IFNA-Funktion gibt den wert zurück, den Sie angeben, wenn eine Formel den #N/A-Fehlerwert zurückgibt. andernfalls wird das Ergebnis der Formel zurückgegeben.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/ifna-function"
		}],
		functionParameter: {
			value: {
				name: "value",
				detail: "Das Argument, das auf den Fehlerwert \"#N/V\" geprüft wird."
			},
			valueIfNa: {
				name: "value_if_na",
				detail: "Der zurückzugebende Wert, wenn die Formel zum Fehlerwert \"#N/V\" ausgewertet wird."
			}
		}
	},
	IFS: {
		description: "Die IFS-Funktion überprüft, ob eine oder mehrere Bedingungen erfüllt sind, und gibt einen Wert zurück, der der ersten TRUE-Bedingung entspricht. WENNS kann als Ersatz für zahlreiche geschachtelte WENN-Anweisungen dienen und ist einfacher zu lesen, wenn mehrere Bedingungen verwendet werden.",
		abstract: "Die IFS-Funktion überprüft, ob eine oder mehrere Bedingungen erfüllt sind, und gibt einen Wert zurück, der der ersten TRUE-Bedingung entspricht. WENNS kann als Ersatz für zahlreiche geschachtelte WENN-Anweisungen dienen und ist einfacher zu lesen, wenn mehrere Bedingungen verwendet werden.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/ifs-function"
		}],
		functionParameter: {
			logicalTest1: {
				name: "logical_test1",
				detail: "Eine Bedingung, die WAHR oder FALSCH ergibt."
			},
			valueIfTrue1: {
				name: "value_if_true1",
				detail: "Ergebnis, das zurückgegeben wird, wenn logical_test1 WAHR ergibt. Kann leer sein."
			},
			logicalTest2: {
				name: "logical_test2",
				detail: "Eine Bedingung, die WAHR oder FALSCH ergibt."
			},
			valueIfTrue2: {
				name: "value_if_true2",
				detail: "Ergebnis, das zurückgegeben wird, wenn logical_testN WAHR ergibt. Jedes value_if_trueN entspricht einer Bedingung logical_testN. Kann leer sein."
			}
		}
	},
	LAMBDA: {
		description: "Sie können eine Funktion für eine häufig verwendete Formel erstellen, die Notwendigkeit des Kopierens und Einfügens dieser Formel beseitigen (was fehleranfällig sein kann) und effektiv Ihre eigenen Funktionen zur Bibliothek nativer Excel-Funktionen hinzufügen. Darüber hinaus sind für eine LAMBDA-Funktion weder VBA noch Makros oder JavaScript erforderlich. Daher können auch Nicht-Programmierer von deren Verwendung profitieren.",
		abstract: "Sie können eine Funktion für eine häufig verwendete Formel erstellen, die Notwendigkeit des Kopierens und Einfügens dieser Formel beseitigen (was fehleranfällig sein kann) und effektiv Ihre eigenen Funktionen zur Bibliothek nativer Excel-Funktionen hinzufügen. Darüber hinaus sind für eine LAMBDA-Funktion weder VBA noch Makros oder JavaScript erforderlich. Daher können auch Nicht-Programmierer von deren Verwendung profitieren.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/lambda-function"
		}],
		functionParameter: {
			parameter: {
				name: "parameter",
				detail: "Ein Wert, der an die Funktion übergeben werden soll, z. B. ein Zellbezug, eine Zeichenfolge oder eine Zahl. Sie können bis zu 253 Parameter eingeben. Dieses Argument ist optional."
			},
			calculation: {
				name: "calculation",
				detail: "Die Formel, die ausgeführt und als Ergebnis der Funktion zurückgegeben werden soll. Dies muss das letzte Argument sein und es muss ein Ergebnis zurückgeben. Dieses Argument ist erforderlich."
			}
		}
	},
	LET: {
		description: "Die LET Funktion weist Den Berechnungsergebnissen Namen zu. Auf diese Weise können Zwischenberechnungen, Werte oder definierte Namen innerhalb einer Formel gespeichert werden. Diese Namen gelten nur innerhalb des Bereichs der LET Funktion. Ähnlich wie Variablen bei der Programmierung LET wird durch die native Formelsyntax von Excel erreicht.",
		abstract: "Die LET Funktion weist Den Berechnungsergebnissen Namen zu. Auf diese Weise können Zwischenberechnungen, Werte oder definierte Namen innerhalb einer Formel gespeichert werden. Diese Namen gelten nur innerhalb des Bereichs der LET Funktion. Ähnlich wie Variablen bei der Programmierung LET wird durch die native Formelsyntax von Excel erreicht.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/let-function"
		}],
		functionParameter: {
			name1: {
				name: "name1",
				detail: "Der erste zuzuweisende Name. Muss mit einem Buchstaben beginnen. Darf nicht das Ergebnis einer Formel sein oder mit der Bereichssyntax kollidieren."
			},
			nameValue1: {
				name: "name_value1",
				detail: "Der Wert, der name1 zugewiesen wird."
			},
			calculationOrName2: {
				name: "calculation_or_name2",
				detail: "Eines der Folgenden:\n1. Eine Berechnung, die alle Namen innerhalb der LET-Funktion verwendet. Dies muss das letzte Argument der LET-Funktion sein.\n2. Ein zweiter Name, dem ein zweiter name_value zugewiesen wird. Wenn ein Name angegeben wird, sind name_value2 und calculation_or_name3 erforderlich."
			},
			nameValue2: {
				name: "name_value2",
				detail: "Der Wert, der calculation_or_name2 zugewiesen wird."
			},
			calculationOrName3: {
				name: "calculation_or_name3",
				detail: "Eines der Folgenden:\n1. Eine Berechnung, die alle Namen innerhalb der LET-Funktion verwendet. Das letzte Argument der LET-Funktion muss eine Berechnung sein.\n2. Ein dritter Name, dem ein dritter name_value zugewiesen wird. Wenn ein Name angegeben wird, sind name_value3 und calculation_or_name4 erforderlich."
			}
		}
	},
	MAKEARRAY: {
		description: "Gibt ein berechnetes Array einer angegebenen Zeilen- und Spaltengröße zurück, indem eine LAMBDA-Funktion angewendet wird.",
		abstract: "Gibt ein berechnetes Array einer angegebenen Zeilen- und Spaltengröße zurück, indem eine LAMBDA-Funktion angewendet wird.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/makearray-function"
		}],
		functionParameter: {
			number1: {
				name: "rows",
				detail: "Die Anzahl der Zeilen in der Matrix. Muss größer als null sein."
			},
			number2: {
				name: "cols",
				detail: "Die Anzahl der Spalten in der Matrix. Muss größer als null sein."
			},
			value3: {
				name: "lambda",
				detail: "Ein LAMBDA, das zum Erstellen der Matrix aufgerufen wird. LAMBDA übernimmt zwei Parameter: row (den Zeilenindex der Matrix) und col (den Spaltenindex der Matrix)."
			}
		}
	},
	MAP: {
		description: "Gibt ein Array zurück, das gebildet wird, indem jeder Wert in den Arrays einem neuen Wert zugeordnet wird, indem ein LAMBDA-Wert angewendet wird, um einen neuen Wert zu erstellen.",
		abstract: "Gibt ein Array zurück, das gebildet wird, indem jeder Wert in den Arrays einem neuen Wert zugeordnet wird, indem ein LAMBDA-Wert angewendet wird, um einen neuen Wert zu erstellen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/map-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Eine zuzuordnende Matrix array1."
			},
			array2: {
				name: "array2",
				detail: "Eine zuzuordnende Matrix array2."
			},
			lambda: {
				name: "lambda",
				detail: "Ein LAMBDA, das das letzte Argument sein muss und für jede übergebene Matrix einen Parameter haben muss."
			}
		}
	},
	NOT: {
		description: "Bei der Funktion NICHT wird der Wert des Arguments umgekehrt.",
		abstract: "Bei der Funktion NICHT wird der Wert des Arguments umgekehrt.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/not-function"
		}],
		functionParameter: { logical: {
			name: "logical",
			detail: "Die Bedingung, deren Logik Sie umkehren möchten und die WAHR oder FALSCH ergeben kann."
		} }
	},
	OR: {
		description: "Die Funktion ODER gibt den Wert WAHR zurück, wenn eines der Argumente als WAHR bewertet wird. Wenn alle Argumente als FALSCH bewertet werden, gibt die Funktion den Wert FALSCH zurück.",
		abstract: "Die Funktion ODER gibt den Wert WAHR zurück, wenn eines der Argumente als WAHR bewertet wird. Wenn alle Argumente als FALSCH bewertet werden, gibt die Funktion den Wert FALSCH zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/or-function"
		}],
		functionParameter: {
			logical1: {
				name: "logical1",
				detail: "Die erste Bedingung, die Sie testen möchten und die WAHR oder FALSCH ergeben kann."
			},
			logical2: {
				name: "logical2",
				detail: "Weitere Bedingungen, die Sie testen möchten und die WAHR oder FALSCH ergeben können, bis zu maximal 255 Bedingungen."
			}
		}
	},
	REDUCE: {
		description: "Reduziert ein Array auf einen akkumulierten Wert, indem ein LAMBDA-Wert auf jeden Wert angewendet und der Gesamtwert im Akkumulator zurückgegeben wird.",
		abstract: "Reduziert ein Array auf einen akkumulierten Wert, indem ein LAMBDA-Wert auf jeden Wert angewendet und der Gesamtwert im Akkumulator zurückgegeben wird.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/reduce-function"
		}],
		functionParameter: {
			initialValue: {
				name: "initial_value",
				detail: "Legt den Anfangswert für den Akkumulator fest."
			},
			array: {
				name: "array",
				detail: "Eine zu reduzierende Matrix."
			},
			lambda: {
				name: "lambda",
				detail: "Ein LAMBDA, das zum Reduzieren der Matrix aufgerufen wird. LAMBDA übernimmt drei Parameter: 1. den aufsummierten und als Endergebnis zurückgegebenen Wert, 2. den aktuellen Wert aus der Matrix und 3. die auf jedes Element der Matrix angewendete Berechnung."
			}
		}
	},
	SCAN: {
		description: "Scannt ein Array, indem ein LAMBDA-Wert auf jeden Wert angewendet wird, und gibt ein Array zurück, das über jeden Zwischenwert verfügt.",
		abstract: "Scannt ein Array, indem ein LAMBDA-Wert auf jeden Wert angewendet wird, und gibt ein Array zurück, das über jeden Zwischenwert verfügt.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/scan-function"
		}],
		functionParameter: {
			initialValue: {
				name: "initial_value",
				detail: "Legt den Startwert für den Akkumulator fest."
			},
			array: {
				name: "array",
				detail: "Ein zu überprüfende Array."
			},
			lambda: {
				name: "lambda",
				detail: "Ein LAMBDA-Wert, der aufgerufen wird, um das Array zu reduzieren. Der LAMBDA-Parameter akzeptiert drei Parameter: Akku Der Wert, der sich summiert hat und als Endergebnis zurückgegeben wird. Wert Der aktuelle Wert aus dem Array. Körper Die Berechnung, die auf jedes Element im Array angewendet wird."
			}
		}
	},
	SWITCH: {
		description: "Die SWITCH-Funktion wertet einen Wert (als Ausdruck bezeichnet) anhand einer Liste von Werten aus und gibt das Ergebnis zurück, das dem ersten übereinstimmenden Wert entspricht. Wenn es keine Übereinstimmung gibt, kann ein optionaler Standardwert zurückgegeben werden.",
		abstract: "Die SWITCH-Funktion wertet einen Wert (als Ausdruck bezeichnet) anhand einer Liste von Werten aus und gibt das Ergebnis zurück, das dem ersten übereinstimmenden Wert entspricht. Wenn es keine Übereinstimmung gibt, kann ein optionaler Standardwert zurückgegeben werden.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/switch-function"
		}],
		functionParameter: {
			expression: {
				name: "expression",
				detail: "Expression ist der Wert (etwa eine Zahl, ein Datum oder Text), der mit value1 bis value126 verglichen wird."
			},
			value1: {
				name: "value1",
				detail: "ValueN ist ein Wert, der mit expression verglichen wird."
			},
			result1: {
				name: "result1",
				detail: "ResultN ist der Wert, der zurückgegeben wird, wenn das entsprechende Argument valueN mit expression übereinstimmt. Für jedes entsprechende Argument valueN muss ein ResultN angegeben werden."
			},
			defaultOrValue2: {
				name: "default_or_value2",
				detail: "Default ist der Wert, der zurückgegeben wird, wenn in den Ausdrücken valueN keine Übereinstimmung gefunden wird. Das Argument Default ist daran erkennbar, dass kein entsprechender Ausdruck resultN vorhanden ist. Default muss das letzte Argument der Funktion sein."
			},
			result2: {
				name: "result2",
				detail: "ResultN ist der Wert, der zurückgegeben wird, wenn das entsprechende Argument valueN mit expression übereinstimmt. Für jedes entsprechende Argument valueN muss ein ResultN angegeben werden."
			}
		}
	},
	TRUE: {
		description: "Gibt den Wahrheitswert WAHR zurück. Sie können diese Funktion verwenden, wenn Sie den Wert TRUE basierend auf einer Bedingung zurückgeben möchten. Beispiel:",
		abstract: "Gibt den Wahrheitswert WAHR zurück. Sie können diese Funktion verwenden, wenn Sie den Wert TRUE basierend auf einer Bedingung zurückgeben möchten. Beispiel:",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/true-function"
		}],
		functionParameter: {}
	},
	XOR: {
		description: "Die XOR-Funktion gibt ein logisches exklusives Or aller Argumente zurück.",
		abstract: "Die XOR-Funktion gibt ein logisches exklusives Or aller Argumente zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/xor-function"
		}],
		functionParameter: {
			logical1: {
				name: "logical1",
				detail: "Die erste Bedingung, die Sie testen möchten und die WAHR oder FALSCH ergeben kann."
			},
			logical2: {
				name: "logical2",
				detail: "Weitere Bedingungen, die Sie testen möchten und die WAHR oder FALSCH ergeben können, bis zu maximal 255 Bedingungen."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/lookup/de-DE.ts
const locale$6 = {
	ADDRESS: {
		description: "Sie können die Funktion ADRESSE verwenden, um die Adresse einer Zelle eines Arbeitsblatts anhand bestimmter Zeilen- und Spaltennummern abzurufen. Address (2,3) gibt beispielsweise $C$ 2 zurück. Als weiteres Beispiel gibt ADDRESS(77.300) $KN$77 zurück. Sie können andere Funktionen verwenden, z. B. die Funktionen ZEILE und SPALTE , um die Argumente für die Zeilen- und Spaltennummer für die Funktion ADRESSE bereitzustellen.",
		abstract: "Sie können die Funktion ADRESSE verwenden, um die Adresse einer Zelle eines Arbeitsblatts anhand bestimmter Zeilen- und Spaltennummern abzurufen. Address (2,3) gibt beispielsweise $C$ 2 zurück. Als weiteres Beispiel gibt ADDRESS(77.300) $KN$77 zurück. Sie können andere Funktionen verwenden, z. B. die Funktionen ZEILE und SPALTE , um die Argumente für die Zeilen- und Spaltennummer für die Funktion ADRESSE bereitzustellen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/address-function"
		}],
		functionParameter: {
			row_num: {
				name: "row number",
				detail: "Erforderlich. Ein numerischer Wert, der die Zeilennummer angibt, die für den Zellbezug verwendet werden soll."
			},
			column_num: {
				name: "column number",
				detail: "Erforderlich. Ein numerischer Wert, der die Spaltennummer angibt, die für den Zellbezug verwendet werden soll."
			},
			abs_num: {
				name: "type of reference",
				detail: "Optional. Ein numerischer Wert, der angibt, welcher Bezugstyp zurückgegeben werden soll."
			},
			a1: {
				name: "style of reference",
				detail: "Optional. Ein Wahrheitswert, der angibt, ob der jeweilige Bezug in der A1- oder der Z1S1-Schreibweise ausgegeben werden soll. Bei der A1-Schreibweise werden Spalten alphabetisch und Zeilen numerisch beschriftet. Bei der Z1S1-Schreibweise werden sowohl Spalten als auch Zeilen numerisch beschriftet. Ist das A1-Argument mit WAHR belegt oder nicht angegeben, liegt der von der Funktion ADRESSE gelieferte Bezug in A1-Schreibweise vor. Ist das A1-Argument mit FALSCH belegt, liegt der von der Funktion ADRESSE gelieferte Bezug in der Z1S1-Schreibweise vor. Hinweis Zum Ändern der von Excel verwendeten Bezugsart klicken Sie auf die Registerkarte Datei , klicken Sie auf Optionen und dann auf Formeln . Aktivieren oder deaktivieren Sie unter Arbeiten mit Formeln das Kontrollkästchen Z1S1-Bezugsart ."
			},
			sheet_text: {
				name: "worksheet name",
				detail: "Optional. Ein Textwert, der den Namen des Arbeitsblatts angibt, das als externer Bezug verwendet werden soll. Die Formel =ADDRESS(1;1,,,\"Sheet2\") gibt beispielsweise Sheet2!$A$1 zurück. Wenn das argument sheet_text nicht angegeben wird, wird kein Blattname verwendet, und die von der Funktion zurückgegebene Adresse verweist auf eine Zelle auf dem aktuellen Blatt."
			}
		}
	},
	AREAS: {
		description: "Gibt die Anzahl der innerhalb eines Bezuges aufgeführten Bereiche zurück. Ein Bereich (Teilbereich) kann sowohl aus mehreren zusammenhängenden Zellen (Zellbereich) als auch aus nur einer Zelle bestehen.",
		abstract: "Gibt die Anzahl der innerhalb eines Bezuges aufgeführten Bereiche zurück. Ein Bereich (Teilbereich) kann sowohl aus mehreren zusammenhängenden Zellen (Zellbereich) als auch aus nur einer Zelle bestehen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/areas-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "Erforderlich. Ein Bezug auf eine Zelle oder einen Zellbereich, der sich auf mehrere Bereiche gleichzeitig beziehen kann. Für den Fall, dass Sie mehrere Bezüge als ein Argument angeben möchten, müssen Sie ein zusätzliches Klammernpaar einfügen, damit Microsoft Excel nicht versucht, die Semikolons als Listentrennzeichen zu interpretieren. Das folgende Beispiel verdeutlicht dies."
		} }
	},
	CHOOSE: {
		description: "Verwendet Index, um einen Wert aus der Liste der Werteargumente zurückzugeben. Verwenden Sie WAHL, um bis zu 254 Werte auf der Grundlage der Indexnummer auszuwählen. Wenn beispielsweise Wert1 bis Wert7 Tage der Woche sind, gibt WAHL einen der Tage zurück, wenn eine Zahl zwischen 1 und 7 als Index verwendet wird.",
		abstract: "Verwendet Index, um einen Wert aus der Liste der Werteargumente zurückzugeben. Verwenden Sie WAHL, um bis zu 254 Werte auf der Grundlage der Indexnummer auszuwählen. Wenn beispielsweise Wert1 bis Wert7 Tage der Woche sind, gibt WAHL einen der Tage zurück, wenn eine Zahl zwischen 1 und 7 als Index verwendet wird.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/choose-function"
		}],
		functionParameter: {
			indexNum: {
				name: "index_num",
				detail: "Gibt an, welches Wertargument ausgewählt wird. index_num muss eine Zahl zwischen 1 und 254, eine Formel oder ein Bezug auf eine Zelle mit einer Zahl zwischen 1 und 254 sein.\nWenn index_num 1 ist, gibt CHOOSE value1 zurück; bei 2 value2 usw.\nIst index_num kleiner als 1 oder größer als die Nummer des letzten Werts in der Liste, gibt CHOOSE den Fehlerwert #VALUE! zurück.\nIst index_num ein Bruch, wird er vor der Verwendung auf die nächstkleinere ganze Zahl gekürzt."
			},
			value1: {
				name: "value1",
				detail: "CHOOSE wählt anhand von index_num einen Wert oder eine auszuführende Aktion aus. Die Argumente können Zahlen, Zellbezüge, definierte Namen, Formeln, Funktionen oder Text sein."
			},
			value2: {
				name: "value2",
				detail: "1 bis 254 Wertargumente."
			}
		}
	},
	CHOOSECOLS: {
		description: "Gibt die angegebenen Spalten aus einem Array zurück.",
		abstract: "Gibt die angegebenen Spalten aus einem Array zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/choosecols-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Das Array, das die Spalten enthält, die im neuen Array zurückgegeben werden sollen. Erforderlich."
			},
			colNum1: {
				name: "col_num1",
				detail: "Die erste Spalte, die zurückgegeben werden soll. Erforderlich."
			},
			colNum2: {
				name: "col_num2",
				detail: "Zusätzliche Spalten, die zurückgegeben werden sollen. Optional."
			}
		}
	},
	CHOOSEROWS: {
		description: "Gibt die angegebenen Zeilen aus einem Array zurück.",
		abstract: "Gibt die angegebenen Zeilen aus einem Array zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/chooserows-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Das Array, das die Spalten enthält, die im neuen Array zurückgegeben werden sollen. Erforderlich."
			},
			rowNum1: {
				name: "row_num1",
				detail: "Die nummer der ersten Zeile, die zurückgegeben werden soll. Erforderlich."
			},
			rowNum2: {
				name: "row_num2",
				detail: "Zusätzliche Zeilennummern, die zurückgegeben werden sollen. Optional."
			}
		}
	},
	COLUMN: {
		description: "Die COLUMN-Funktion gibt die Spaltennummer des angegebenen Zellbezugs zurück. Beispielsweise gibt die Formel =COLUMN(D10) 4 zurück, da Spalte D die vierte Spalte ist.",
		abstract: "Die COLUMN-Funktion gibt die Spaltennummer des angegebenen Zellbezugs zurück. Beispielsweise gibt die Formel =COLUMN(D10) 4 zurück, da Spalte D die vierte Spalte ist.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/column-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "Die Zelle oder der Zellbereich, für die bzw. den Sie die Spaltennummer zurückgeben möchten."
		} }
	},
	COLUMNS: {
		description: "Gibt die Anzahl der Spalten in einem Array oder Verweis zurück.",
		abstract: "Gibt die Anzahl der Spalten in einem Array oder Verweis zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/columns-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "Erforderlich. Ein Array oder eine Arrayformel oder ein Verweis auf einen Zellbereich, für den Sie die Anzahl der Spalten verwenden möchten."
		} }
	},
	DROP: {
		description: "Schließt eine angegebene Anzahl von Zeilen oder Spalten vom Anfang oder Ende einer Matrix aus. Diese Funktion kann hilfreich sein, um Kopf- und Fußzeilen in einem Excel-Bericht zu entfernen, um nur die Daten zurückzugeben.",
		abstract: "Schließt eine angegebene Anzahl von Zeilen oder Spalten vom Anfang oder Ende einer Matrix aus. Diese Funktion kann hilfreich sein, um Kopf- und Fußzeilen in einem Excel-Bericht zu entfernen, um nur die Daten zurückzugeben.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/drop-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Das Array, aus dem Zeilen oder Spalten gelöscht werden sollen."
			},
			rows: {
				name: "rows",
				detail: "Die Anzahl der zu löschenden Zeilen. Ein negativer Wert wird vom Ende der Matrix entfernt."
			},
			columns: {
				name: "columns",
				detail: "Die Anzahl der auszuschließenden Spalten. Ein negativer Wert wird vom Ende der Matrix entfernt."
			}
		}
	},
	EXPAND: {
		description: "Erweitert oder füllt ein Array auf die angegebenen Zeilen- und Spaltenmaße auf.",
		abstract: "Erweitert oder füllt ein Array auf die angegebenen Zeilen- und Spaltenmaße auf.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/expand-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Das zu erweiternde Array."
			},
			rows: {
				name: "rows",
				detail: "Die Anzahl der Zeilen im erweiterten Array. Wenn nicht angegeben, werden die Zeilen nicht erweitert."
			},
			columns: {
				name: "columns",
				detail: "Die Anzahl der Spalten im erweiterten Array. Wenn nicht angegeben, werden die Spalten nicht erweitert."
			},
			padWith: {
				name: "pad_with",
				detail: "Der Wert, mit dem auf der Füllung polstert werden soll. Der Standardwert lautet #N/A."
			}
		}
	},
	FILTER: {
		description: "Im folgenden Beispiel wird die Formel = FILTER(A5:D20;C5:C20=H2; \"\") verwendet, um alle Datensätze für \"Apfel\" zurückzugeben, wie in Zelle H2 ausgewählt. Wenn keine Äpfel vorhanden sind, wird eine leere Zeichenfolge (\"\") zurückgegeben.",
		abstract: "Im folgenden Beispiel wird die Formel = FILTER(A5:D20;C5:C20=H2; \"\") verwendet, um alle Datensätze für \"Apfel\" zurückzugeben, wie in Zelle H2 ausgewählt. Wenn keine Äpfel vorhanden sind, wird eine leere Zeichenfolge (\"\") zurückgegeben.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/filter-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Das Array oder der Bereich, das/der gefiltert werden soll"
			},
			include: {
				name: "include",
				detail: "Ein boolesches Array, dessen Höhe oder Breite mit dem Array identisch ist"
			},
			ifEmpty: {
				name: "if_empty",
				detail: "Der Wert, der zurückgegeben werden soll, wenn alle Werte im eingeschlossenen Array leer sind (Filter gibt nichts zurück)"
			}
		}
	},
	FORMULATEXT: {
		description: "Gibt eine Formel als eine Zeichenfolge zurück.",
		abstract: "Gibt eine Formel als eine Zeichenfolge zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/formulatext-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "Erforderlich. Ein Bezug auf eine Zelle oder einen Zellbereich."
		} }
	},
	GETPIVOTDATA: {
		description: "Gibt sichtbare Daten zurück, die in einer PivotTable gespeichert sind.",
		abstract: "Gibt sichtbare Daten zurück, die in einer PivotTable gespeichert sind.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/getpivotdata-function"
		}],
		functionParameter: {
			dataField: {
				name: "dataField",
				detail: "Der Name der PivotTable, die die Daten enthält, die Sie abrufen möchten. Dies muss in Anführungszeichen stehen. Beispiel: =GETPIVOTDATA(\"Sales\", A3). Hier ist \"Sales\" das Feld Werte, das abgerufen werden soll. Da kein anderes Feld angegeben ist, gibt GETPIVOTDATA den Gesamtumsatz zurück."
			},
			pivotTable: {
				name: "pivotTable",
				detail: "Stellt einen Bezug auf eine Zelle, einen Zellbereich oder einen benannten Zellbereich in einer PivotTable dar. Mit diesen Informationen wird ermittelt, welche PivotTable die Daten enthält, die Sie abrufen möchten. Beispiel: =GETPIVOTDATA(\"Sales\", A3). Hier ist A3 ein Verweis innerhalb der PivotTable und teilt der Formel mit, welche PivotTable verwendet werden soll."
			},
			field1: {
				name: "field1",
				detail: "Stehen für Paare aus Feld- und Elementnamen (zwischen 1 und 126), die die Daten beschreiben, die Sie abrufen möchten. Diese Paare können in einer beliebigen Reihenfolge auftreten. Feld- und Elementnamen, die nicht aus Datumsangaben oder Zahlen bestehen, müssen in Anführungszeichen eingeschlossen sein. Beispiel: =GETPIVOTDATA(\"Sales\"; A3, \"Month\", \"Mar\"). Hier ist \"Month\" das Feld und \"Mar\" ist das Element. Um mehrere Elemente für ein Feld anzugeben, schließen Sie sie in geschweifte Klammern ein (z. B. {\"Mar\", \"Apr\"}). Für OLAP-PivotTables können Elemente den Quellnamen der Dimension sowie den Quellnamen des Elements enthalten. Ein Paar aus Feld und Element könnte für eine OLAP-PivotTable wie folgt aussehen: \"[Produkt]\";\"[Produkt].[Alle Produkte].[Lebensmittel].[Backwaren]\""
			},
			item1: {
				name: "item1",
				detail: "Stehen für Paare aus Feld- und Elementnamen (zwischen 1 und 126), die die Daten beschreiben, die Sie abrufen möchten. Diese Paare können in einer beliebigen Reihenfolge auftreten. Feld- und Elementnamen, die nicht aus Datumsangaben oder Zahlen bestehen, müssen in Anführungszeichen eingeschlossen sein. Beispiel: =GETPIVOTDATA(\"Sales\"; A3, \"Month\", \"Mar\"). Hier ist \"Month\" das Feld und \"Mar\" ist das Element. Um mehrere Elemente für ein Feld anzugeben, schließen Sie sie in geschweifte Klammern ein (z. B. {\"Mar\", \"Apr\"}). Für OLAP-PivotTables können Elemente den Quellnamen der Dimension sowie den Quellnamen des Elements enthalten. Ein Paar aus Feld und Element könnte für eine OLAP-PivotTable wie folgt aussehen: \"[Produkt]\";\"[Produkt].[Alle Produkte].[Lebensmittel].[Backwaren]\""
			}
		}
	},
	HLOOKUP: {
		description: "Sucht nach einem Wert in der obersten Zeile einer Tabelle oder einer Matrix und gibt dann einen Wert in derselben Spalte einer Zeile zurück, die Sie in der Tabelle oder der Matrix angeben. Verwenden Sie WVERWEIS, wenn sich die Vergleichswerte in einer Zeile am Anfang einer Datentabelle befinden und Sie eine bestimmte Anzahl von Spalten nach unten durchsuchen möchten. Verwenden Sie SVERWEIS, wenn sich die Vergleichswerte in einer Spalte links neben den Daten befinden, die Sie durchsuchen möchten.",
		abstract: "Sucht nach einem Wert in der obersten Zeile einer Tabelle oder einer Matrix und gibt dann einen Wert in derselben Spalte einer Zeile zurück, die Sie in der Tabelle oder der Matrix angeben. Verwenden Sie WVERWEIS, wenn sich die Vergleichswerte in einer Zeile am Anfang einer Datentabelle befinden und Sie eine bestimmte Anzahl von Spalten nach unten durchsuchen möchten. Verwenden Sie SVERWEIS, wenn sich die Vergleichswerte in einer Spalte links neben den Daten befinden, die Sie durchsuchen möchten.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/hlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "Erforderlich. Der Wert, der in der ersten Zeile der Tabelle gefunden werden soll. \"Suchkriterium\" kann ein Wert, ein Bezug oder eine Zeichenfolge sein."
			},
			tableArray: {
				name: "table_array",
				detail: "Erforderlich. Eine Tabelle mit Informationen, in der Daten gesucht werden. Verwenden Sie einen Bezug auf einen Bereich oder einen Bereichsnamen. Bei den Werten in der ersten Zeile von \"Matrix\" kann es sich um Text, Zahlen oder Wahrheitswerte handeln. Wenn \"Bereich_Verweis\" WAHR ist, müssen die Werte in der ersten Zeile von \"Matrix\" in aufsteigender Reihenfolge angeordnet werden: ..., -2, -1, 0, 1, 2, ..., A-Z, FALSCH, WAHR; andernfalls gibt WVERWEIS möglicherweise nicht den richtigen Wert zurück. Wenn \"Bereich_Verweis\" FALSCH ist, muss \"Matrix\" nicht sortiert werden. Bei Zeichenfolgen (Texten) wird nicht zwischen Groß- und Kleinbuchstaben unterschieden. Sortieren Sie die Werte in aufsteigender Reihenfolge von links nach rechts. Weitere Informationen finden Sie unter Sortieren von Daten in einem Bereich oder einer Tabelle ."
			},
			rowIndexNum: {
				name: "row_index_num",
				detail: "Erforderlich. Die Nummer der Zeile in \"Matrix\", aus der der entsprechende Wert zurückgegeben wird. Ein Zeilenindex von 1 gibt den ersten Zeilenwert in \"Matrix\" zurück, ein Zeilenindex von 2 gibt den zweiten Zeilenwert in \"Matrix\" zurück usw. Wenn \"Zeilenindex\" kleiner als 1 ist, gibt WVERWEIS den Fehlerwert #WERT! zurück; wenn \"Zeilenindex\" größer als die Anzahl der Zeilen in \"Matrix\" ist, gibt WVERWEIS den Fehlerwert #BEZUG! zurück."
			},
			rangeLookup: {
				name: "range_lookup",
				detail: "Optional. Ein Wahrheitswert, der angibt, ob WVERWEIS eine genaue Entsprechung oder eine ungefähre Entsprechung suchen soll. Wenn dieser Parameter WAHR ist oder weggelassen wird, wird eine ungefähre Entsprechung zurückgegeben. Anders ausgedrückt, wird der nächstgrößere Wert zurückgegeben, der kleiner als \"Suchkriterium\" ist, wenn keine genaue Entsprechung gefunden wird. Ist der Parameter FALSCH, sucht WVERWEIS eine genaue Entsprechung. Wenn keine gefunden wird, wird der Fehlerwert #NV zurückgegeben."
			}
		}
	},
	HSTACK: {
		description: "Fügt Arrays horizontal und nacheinander an, um ein größeres Array zurückzugeben.",
		abstract: "Fügt Arrays horizontal und nacheinander an, um ein größeres Array zurückzugeben.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/hstack-function"
		}],
		functionParameter: {
			array1: {
				name: "array",
				detail: "Die anzufügenden Matrizen."
			},
			array2: {
				name: "array",
				detail: "Die anzufügenden Matrizen."
			}
		}
	},
	HYPERLINK: {
		description: "Erstellt einen Hyperlink innerhalb einer Zelle.",
		abstract: "Erstellt einen Hyperlink innerhalb einer Zelle.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3093313?hl=de"
		}],
		functionParameter: {
			url: {
				name: "url",
				detail: "Die vollständige, in Anführungszeichen eingeschlossene URL des Linkziels oder ein Bezug auf eine Zelle mit einer solchen URL. Nur bestimmte Linktypen sind zulässig: http://, https://, mailto:, aim:, ftp://, gopher://, telnet:// und news://. Andere sind ausdrücklich nicht zulässig. Bei einem anderen Protokoll wird link_label in der Zelle angezeigt, aber nicht verlinkt. Wenn kein Protokoll angegeben ist, wird http:// angenommen und url vorangestellt."
			},
			linkLabel: {
				name: "link_label",
				detail: "[ OPTIONAL – standardmäßig url ] – Der in der Zelle als Link anzuzeigende Text in Anführungszeichen oder ein Bezug auf eine Zelle mit einem solchen Text. Verweist link_label auf eine leere Zelle, wird url als Link angezeigt, wenn sie gültig ist, andernfalls als Text. Ist link_label die leere Zeichenfolge (\"\"), erscheint die Zelle leer, der Link bleibt jedoch per Klick oder Zellnavigation erreichbar."
			}
		}
	},
	IMAGE: {
		description: "Die Funktion BILD fügt Bilder zusammen mit Alternativtext aus einer Quellposition in Zellen ein. Anschließend können Sie Zellen verschieben und deren Größe ändern, sie sortieren und filtern und mit Bildern in einer Excel-Tabelle arbeiten. Verwenden Sie diese Funktion, um Listen von Daten, z. B. Bestände, Spiele, Mitarbeiter und mathematische Konzepte, visuell zu verbessern.",
		abstract: "Die Funktion BILD fügt Bilder zusammen mit Alternativtext aus einer Quellposition in Zellen ein. Anschließend können Sie Zellen verschieben und deren Größe ändern, sie sortieren und filtern und mit Bildern in einer Excel-Tabelle arbeiten. Verwenden Sie diese Funktion, um Listen von Daten, z. B. Bestände, Spiele, Mitarbeiter und mathematische Konzepte, visuell zu verbessern.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/image-function"
		}],
		functionParameter: {
			source: {
				name: "source",
				detail: "Der URL-Pfad der Bilddatei mit dem Protokoll „https“."
			},
			altText: {
				name: "alt_text",
				detail: "Alternativtext, der das Bild für die Barrierefreiheit beschreibt."
			},
			sizing: {
				name: "sizing",
				detail: "Gibt die Bildabmessungen an."
			},
			height: {
				name: "height",
				detail: "Die benutzerdefinierte Höhe des Bilds in Pixeln."
			},
			width: {
				name: "width",
				detail: "Die benutzerdefinierte Breite des Bilds in Pixeln."
			}
		}
	},
	INDEX: {
		description: "Gibt den Wert eines Elements in einer Tabelle oder einem Array zurück, ausgewählt anhand der Zeilen- und Spaltennummerindizes.",
		abstract: "Gibt den Wert eines Elements in einer Tabelle oder einem Array zurück, ausgewählt anhand der Zeilen- und Spaltennummerindizes.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/index-function"
		}],
		functionParameter: {
			reference: {
				name: "reference",
				detail: "Ein Bezug auf einen oder mehrere Zellbereiche."
			},
			rowNum: {
				name: "row_num",
				detail: "Die Nummer der Zeile in reference, aus der ein Bezug zurückgegeben werden soll."
			},
			columnNum: {
				name: "column_num",
				detail: "Die Nummer der Spalte in reference, aus der ein Bezug zurückgegeben werden soll."
			},
			areaNum: {
				name: "area_num",
				detail: "Wählt einen Bereich in reference aus, aus dem die Schnittmenge von row_num und column_num zurückgegeben wird."
			}
		}
	},
	INDIRECT: {
		description: "Gibt den Bezug eines Textwerts zurück. Bezüge werden sofort ausgewertet, sodass die zu ihnen gehörenden Werte angezeigt werden. Verwenden Sie die INDIREKT-Funktion, um den Bezug auf eine in einer Formel befindliche Zelle zu ändern ohne die Formel selbst zu ändern.",
		abstract: "Gibt den Bezug eines Textwerts zurück. Bezüge werden sofort ausgewertet, sodass die zu ihnen gehörenden Werte angezeigt werden. Verwenden Sie die INDIREKT-Funktion, um den Bezug auf eine in einer Formel befindliche Zelle zu ändern ohne die Formel selbst zu ändern.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/indirect-function"
		}],
		functionParameter: {
			refText: {
				name: "ref_text",
				detail: "Erforderlich. Der Bezug auf eine Zelle, die einen Bezug in der A1-Schreibweise, einen Bezug in der Z1S1-Schreibweise, einen definierten Namen als Bezug oder einen Zellbezug als Zeichenfolge enthält. Gibt \"Bezug\" einen unzulässigen Zellbezug an, gibt INDIREKT den Fehlerwert #BEZUG! zurück. Verweist \"Bezug\" auf eine andere Arbeitsmappe (ein externer Bezug) muss diese Arbeitsmappe geöffnet sein. Ist die Quellarbeitsmappe nicht geöffnet, gibt die INDIREKT-Funktion den Fehlerwert #BEZUG! zurück. Hinweis Externe Verweise werden in Excel Web App nicht unterstützt. Wenn sich ref_text auf einen Zellbereich außerhalb des Zeilenlimits von 1.048.576 oder dem Spaltengrenzwert von 16.384 (XFD) bezieht, gibt INDIRECT eine #REF! was zu einem #BEZUG!-Fehler führt."
			},
			a1: {
				name: "a1",
				detail: "Optional. Ein Wahrheitswert, der angibt, welche Art von Bezug in der Zelle enthalten ist Ist \"A1\" gleich WAHR oder nicht angegeben, wird \"Bezug\" als ein Bezug interpretiert, der in der A1-Schreibweise vorliegt. Ist \"A1\" gleich FALSCH, wird \"Bezug\" als ein Bezug interpretiert, der in der Z1S1-Schreibweise vorliegt."
			}
		}
	},
	LOOKUP: {
		description: "Die Vektorversion von VERWEIS durchsucht einen Bereich mit einer Zeile oder einer Spalte (auch als Vektor bezeichnet) nach einem Wert und gibt einen Wert von derselben Position in einem zweiten Bereich mit einer Zeile oder einer Spalte zurück.",
		abstract: "Die Vektorversion von VERWEIS durchsucht einen Bereich mit einer Zeile oder einer Spalte (auch als Vektor bezeichnet) nach einem Wert und gibt einen Wert von derselben Position in einem zweiten Bereich mit einer Zeile oder einer Spalte zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/lookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "Ein Wert, nach dem LOOKUP im ersten Vektor sucht. lookup_value kann eine Zahl, Text, ein Wahrheitswert oder ein Name bzw. Bezug sein, der auf einen Wert verweist."
			},
			lookupVectorOrArray: {
				name: "lookup_vectorOrArray",
				detail: "Ein Bereich, der nur eine Zeile oder eine Spalte enthält."
			},
			resultVector: {
				name: "result_vector",
				detail: "Ein Bereich, der nur eine Zeile oder Spalte enthält. result_vector muss dieselbe Größe wie lookup_vector haben."
			}
		}
	},
	MATCH: {
		description: "Die Funktion VERGLEICH sucht nach einem bestimmten Element in einem Bereich von Zellen und gibt dann die relative Position dieses Elements in dem Bereich zurück. Ein Beispiel: Wenn der Bereich A1:A3 die Werte \"5\", \"25\" und \"38\" enthält, gibt die Formel =VERGLEICH(25;A1:A3;0) den Wert \"2\" zurück, weil \"25\" der zweite Wert im Bereich ist.",
		abstract: "Die Funktion VERGLEICH sucht nach einem bestimmten Element in einem Bereich von Zellen und gibt dann die relative Position dieses Elements in dem Bereich zurück. Ein Beispiel: Wenn der Bereich A1:A3 die Werte \"5\", \"25\" und \"38\" enthält, gibt die Formel =VERGLEICH(25;A1:A3;0) den Wert \"2\" zurück, weil \"25\" der zweite Wert im Bereich ist.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/match-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "MATCH findet den größten Wert, der kleiner oder gleich lookup_value ist. Die Werte im lookup_array Argument müssen in aufsteigender Reihenfolge platziert werden, z. B. ...-2, -1, 0, 1, 2, ..., A-Z, FALSE, TRUE."
			},
			lookupArray: {
				name: "lookup_array",
				detail: "MATCH findet den ersten Wert, der genau gleich lookup_value ist. Die Werte im lookup_array Argument können in beliebiger Reihenfolge angegeben werden."
			},
			matchType: {
				name: "match_type",
				detail: "MATCH findet den kleinsten Wert, der größer oder gleich lookup_value ist. Die Werte im lookup_array Argument müssen in absteigender Reihenfolge platziert werden, z. B.: TRUE, FALSE, Z-A, ... 2, 1, 0, -1, -2, ... usw."
			}
		}
	},
	OFFSET: {
		description: "Gibt einen Bezug zurück, der gegenüber dem angegebenen Bezug versetzt ist. Der zurückgegebene Bezug kann eine einzelne Zelle oder ein Zellbereich sein. Sie können die Anzahl der zurückzugebenden Zeilen und Spalten festlegen.",
		abstract: "Gibt einen Bezug zurück, der gegenüber dem angegebenen Bezug versetzt ist. Der zurückgegebene Bezug kann eine einzelne Zelle oder ein Zellbereich sein. Sie können die Anzahl der zurückzugebenden Zeilen und Spalten festlegen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/offset-function"
		}],
		functionParameter: {
			reference: {
				name: "reference",
				detail: "Erforderlich. Der Verweis, auf dem der Offset basieren soll. Bezug muss sich auf eine Zelle oder einen Bereich angrenzender Zellen beziehen; Andernfalls gibt OFFSET die #VALUE! zurück."
			},
			rows: {
				name: "rows",
				detail: "Erforderlich. Die Anzahl der Zeilen, um die Sie die obere linke Eckzelle des Bereichs nach oben oder nach unten verschieben möchten. Entspricht das Argument Zeilen beispielsweise 5, bedeutet dies, dass die obere linke Ecke des neuen Bezugs fünf Zeilen unterhalb von Bezug liegt. Das Argument Zeilen kann sowohl einen positiven (unterhalb des Ausgangsbezugs liegen) als auch einen negativen Wert annehmen (oberhalb des Ausgangsbezugs liegen)."
			},
			cols: {
				name: "columns",
				detail: "Erforderlich. Die Anzahl der Spalten, um die Sie die obere linke Eckzelle des Bereichs nach links oder nach rechts verschieben möchten. Ist das Argument Spalten beispielsweise gleich 5, so bedeutet dies, dass die obere linke Ecke des neuen Bezugs fünf Spalten rechts von Bezug liegt. Spalten kann sowohl einen positiven (rechts des Ausgangsbezugs liegen) als auch einen negativen Wert annehmen (links des Ausgangsbezugs liegen)."
			},
			height: {
				name: "height",
				detail: "Optional. Die Höhe des neuen Bezugs in Zeilen. Für \"Höhe\" muss ein positiver Wert angegeben werden."
			},
			width: {
				name: "width",
				detail: "Optional. Die Breite des neuen Bezugs in Spalten. Für \"Breite\" muss ein positiver Wert angegeben werden."
			}
		}
	},
	ROW: {
		description: "Gibt die Zeilennummer eines Bezugs zurück.",
		abstract: "Gibt die Zeilennummer eines Bezugs zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/row-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "Optional. Die Zelle oder der Zellbereich, für die Sie die Zeilennummer verwenden möchten. Fehlt das Argument \"Bezug\", wird es als Bezug der Zelle angenommen, in der die Funktion ZEILE steht. Wenn reference ein Zellbereich ist und ROW als vertikales Array eingegeben wird, gibt ROW die Zeilennummern des Bezugs als vertikales Array zurück. \"Bezug\" darf sich nicht auf mehrere Bereiche beziehen."
		} }
	},
	ROWS: {
		description: "Gibt die Anzahl der Zeilen in einem Verweis oder Array zurück.",
		abstract: "Gibt die Anzahl der Zeilen in einem Verweis oder Array zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/rows-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "Erforderlich. Ein Array, eine Arrayformel oder ein Verweis auf einen Zellbereich, für den Sie die Anzahl der Zeilen verwenden möchten."
		} }
	},
	RTD: {
		description: "Ruft Echtzeitdaten aus einem Programm ab, das die COM-Automatisierung unterstützt",
		abstract: "Ruft Echtzeitdaten aus einem Programm ab, das die COM-Automatisierung unterstützt",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/rtd-function"
		}],
		functionParameter: {
			progId: {
				name: "progId",
				detail: "Erforderlich. Der Name der ProgID eines registrierten COM-Automatisierungs-Add-Ins, das auf dem lokalen Computer installiert wurde. Schließen Sie den Namen in Anführungszeichen ein."
			},
			server: {
				name: "server",
				detail: "Erforderlich. Der Name des Servers, auf dem das Add-In ausgeführt werden soll. Wenn kein Server vorhanden ist und das Programm lokal ausgeführt wird, dann geben Sie keinen Wert für das Argument ein. Andernfalls schließen Sie den Servernamen in Anführungszeichen (\"\") ein. Wenn Sie RTD in Visual Basic for Applications (VBA) verwenden, sind für den Server doppelte Anführungszeichen oder die VBA-Eigenschaft NullString erforderlich, auch wenn der Server lokal ausgeführt wird."
			},
			topic1: {
				name: "topic1",
				detail: "Topic1 ist erforderlich, nachfolgende Themen sind optional. 1 bis 253 Parameter, die zusammen einen eindeutigen Teil der Echtzeitdaten darstellen."
			},
			topic2: {
				name: "topic2",
				detail: "Topic1 ist erforderlich, nachfolgende Themen sind optional. 1 bis 253 Parameter, die zusammen einen eindeutigen Teil der Echtzeitdaten darstellen."
			}
		}
	},
	SORT: {
		description: "In diesem Beispiel wurde nach \"Region\", \"Vertriebsmitarbeiter\" und \"Produkt \" einzeln mit =SORTIEREN(A2:A17) sortiert und über die Zellen F2, H2 und J2 kopiert.",
		abstract: "In diesem Beispiel wurde nach \"Region\", \"Vertriebsmitarbeiter\" und \"Produkt \" einzeln mit =SORTIEREN(A2:A17) sortiert und über die Zellen F2, H2 und J2 kopiert.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/sort-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Der Bereich oder das Array, der/das sortiert werden soll"
			},
			sortIndex: {
				name: "sort_index",
				detail: "Eine Zahl, die die Zeile oder Spalte angibt, nach der sortiert werden soll"
			},
			sortOrder: {
				name: "sort_order",
				detail: "Eine Zahl, die die gewünschte Sortierreihenfolge angibt: \"1\" für aufsteigende Reihenfolge (Standard), \"-1\" für absteigende Reihenfolge"
			},
			byCol: {
				name: "by_col",
				detail: "Ein Wahrheitswert, der die gewünschte Sortierrichtung angibt: FALSCH zum Sortieren nach Zeile (Standard), WAHR zum Sortieren nach Spalte"
			}
		}
	},
	SORTBY: {
		description: "In diesem Beispiel wird eine Liste mit den Namen von Personen nach deren Alter in aufsteigender Reihenfolge sortiert.",
		abstract: "In diesem Beispiel wird eine Liste mit den Namen von Personen nach deren Alter in aufsteigender Reihenfolge sortiert.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/sortby-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Das Array oder der Bereich, das/der sortiert werden soll"
			},
			byArray1: {
				name: "by_array1",
				detail: "Das Array oder der Bereich, nach dem sortiert werden soll"
			},
			sortOrder1: {
				name: "sort_order1",
				detail: "Die Reihenfolge, in der sortiert werden soll. 1 für \"aufsteigend\", -1 für \"absteigend\". Standard ist \"aufsteigend\"."
			},
			byArray2: {
				name: "by_array2",
				detail: "Die Matrix oder der Bereich, nach der bzw. dem sortiert werden soll"
			},
			sortOrder2: {
				name: "sort_order2",
				detail: "Die Reihenfolge, in der sortiert werden soll. 1 für \"aufsteigend\", -1 für \"absteigend\". Standard ist \"aufsteigend\"."
			}
		}
	},
	TAKE: {
		description: "Gibt eine bestimmte Anzahl zusammenhängender Zeilen oder Spalten ab dem Anfang oder Ende einer Matrix zurück.",
		abstract: "Gibt eine bestimmte Anzahl zusammenhängender Zeilen oder Spalten ab dem Anfang oder Ende einer Matrix zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/take-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Das Array, aus dem Zeilen oder Spalten entnommen werden sollen."
			},
			rows: {
				name: "rows",
				detail: "Die Anzahl der zu nehmenden Zeilen. Bei einem negativen Wert erfolgt die Übernahme vom Ende des Arrays."
			},
			columns: {
				name: "columns",
				detail: "Die Anzahl der zu nehmenden Spalten. Bei einem negativen Wert erfolgt die Übernahme vom Ende des Arrays."
			}
		}
	},
	TOCOL: {
		description: "Gibt das Array in einer einzelnen Spalte zurück.",
		abstract: "Gibt das Array in einer einzelnen Spalte zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/tocol-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Die Matrix oder der Bezug, die bzw. der als Spalte zurückgegeben werden soll."
			},
			ignore: {
				name: "ignore",
				detail: "Gibt an, ob bestimmte Werttypen ignoriert werden. Standardmäßig werden keine Werte ignoriert. Geben Sie einen der folgenden Werte an:\n0 Alle Werte beibehalten (Standard)\n1 Leere Zellen ignorieren\n2 Fehler ignorieren\n3 Leere Zellen und Fehler ignorieren"
			},
			scanByColumn: {
				name: "scan_by_column",
				detail: "Durchsucht die Matrix spaltenweise. Standardmäßig wird die Matrix zeilenweise durchsucht. Die Durchsuchung bestimmt, ob die Werte zeilen- oder spaltenweise angeordnet werden."
			}
		}
	},
	TOROW: {
		description: "Gibt die Matrix in einer einzelnen Zeile zurück.",
		abstract: "Gibt die Matrix in einer einzelnen Zeile zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/torow-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Die Matrix oder der Bezug, die bzw. der als Zeile zurückgegeben werden soll."
			},
			ignore: {
				name: "ignore",
				detail: "Gibt an, ob bestimmte Werttypen ignoriert werden. Standardmäßig werden keine Werte ignoriert. Geben Sie einen der folgenden Werte an:\n0 Alle Werte beibehalten (Standard)\n1 Leere Zellen ignorieren\n2 Fehler ignorieren\n3 Leere Zellen und Fehler ignorieren"
			},
			scanByColumn: {
				name: "scan_by_column",
				detail: "Durchsucht die Matrix spaltenweise. Standardmäßig wird die Matrix zeilenweise durchsucht. Die Durchsuchung bestimmt, ob die Werte zeilen- oder spaltenweise angeordnet werden."
			}
		}
	},
	TRANSPOSE: {
		description: "Es kann vorkommen, dass Sie Zellen wechseln oder drehen müssen. Zu diesem Zweck können Sie die Zellen kopieren, einfügen und dann die Option \"Transponieren\" verwenden . Auf diese Weise werden jedoch Duplikate erstellt. Wenn Sie dies verhindern möchten, können Sie eine Formel anstelle von MTRANS verwenden. In der folgenden Abbildung werden mit der Formel =MTRANS(A1:B4) beispielsweise die Zellen A1 bis B4 horizontal angeordnet.",
		abstract: "Es kann vorkommen, dass Sie Zellen wechseln oder drehen müssen. Zu diesem Zweck können Sie die Zellen kopieren, einfügen und dann die Option \"Transponieren\" verwenden . Auf diese Weise werden jedoch Duplikate erstellt. Wenn Sie dies verhindern möchten, können Sie eine Formel anstelle von MTRANS verwenden. In der folgenden Abbildung werden mit der Formel =MTRANS(A1:B4) beispielsweise die Zellen A1 bis B4 horizontal angeordnet.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/transpose-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "Ein Zellbereich oder eine Matrix in einem Arbeitsblatt."
		} }
	},
	UNIQUE: {
		description: "Zurückgeben von eindeutigen Namen aus einer Liste von Namen",
		abstract: "Zurückgeben von eindeutigen Namen aus einer Liste von Namen",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/unique-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Der Bereich oder das Array, aus dem eindeutige Zeilen oder Spalten zurückgegeben werden sollen"
			},
			byCol: {
				name: "by_col",
				detail: "Das Argument \"nach_Spalte\" ist ein logischer Wert, der angibt, wie verglichen werden soll. WAHR vergleicht Spalten miteinander und gibt die eindeutigen Spalten zurück. FALSCH (oder ausgelassen) vergleicht Zeilen miteinander und gibt die eindeutigen Zeilen zurück."
			},
			exactlyOnce: {
				name: "exactly_once",
				detail: "Das Argument \"genau_einmal\" ist ein logischer Wert, der Zeilen oder Spalten zurückgibt, die im Bereich oder Array genau einmal vorkommen. Dies ist das Datenbankkonzept von EINDEUTIG. WAHR gibt alle unterschiedlichen Zeilen oder Spalten aus dem Bereich oder Array zurück, die exakt einmal vorkommen. FALSCH (oder ausgelassen) gibt alle unterschiedlichen Zeilen oder Spalten aus dem Bereich oder Array zurück."
			}
		}
	},
	VLOOKUP: {
		description: "Verwenden Sie die Funktion SVERWEIS zum Nachschlagen eines Werts in einer Tabelle.",
		abstract: "Verwenden Sie die Funktion SVERWEIS zum Nachschlagen eines Werts in einer Tabelle.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/vlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "Der Wert, nach dem Sie suchen möchten. Er muss sich in der ersten Spalte des Zellbereichs befinden, den Sie im Argument table_array angeben."
			},
			tableArray: {
				name: "table_array",
				detail: "Der Zellbereich, in dem VLOOKUP nach lookup_value und dem Rückgabewert sucht. Sie können einen benannten Bereich oder eine Tabelle verwenden und im Argument Namen statt Zellbezügen einsetzen."
			},
			colIndexNum: {
				name: "col_index_num",
				detail: "Die Spaltennummer (beginnend bei 1 für die äußerste linke Spalte von table_array), die den Rückgabewert enthält."
			},
			rangeLookup: {
				name: "range_lookup",
				detail: "Ein Wahrheitswert, der angibt, ob VLOOKUP eine ungefähre oder exakte Übereinstimmung finden soll: ungefähre Übereinstimmung – 1/TRUE, exakte Übereinstimmung – 0/FALSE."
			}
		}
	},
	VSTACK: {
		description: "Fügt Arrays vertikal und nacheinander an, um ein größeres Array zurückzugeben.",
		abstract: "Fügt Arrays vertikal und nacheinander an, um ein größeres Array zurückzugeben.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/vstack-function"
		}],
		functionParameter: {
			array1: {
				name: "array",
				detail: "Die anzufügenden Matrizen."
			},
			array2: {
				name: "array",
				detail: "Die anzufügenden Matrizen."
			}
		}
	},
	WRAPCOLS: {
		description: "Umbricht die bereitgestellte Zeile oder Spalte mit Werten spaltenweise nach einer angegebenen Anzahl von Elementen, um ein neues Array zu bilden.",
		abstract: "Umbricht die bereitgestellte Zeile oder Spalte mit Werten spaltenweise nach einer angegebenen Anzahl von Elementen, um ein neues Array zu bilden.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/wrapcols-function"
		}],
		functionParameter: {
			vector: {
				name: "vector",
				detail: "Der zu umschließende Vektor oder Verweis."
			},
			wrapCount: {
				name: "wrap_count",
				detail: "Die maximale Anzahl von Werten für jede Spalte."
			},
			padWith: {
				name: "pad_with",
				detail: "Der Wert, mit dem auf der Füllung polstert werden soll. Der Standardwert lautet #N/A."
			}
		}
	},
	WRAPROWS: {
		description: "Umbricht die bereitgestellte Zeile oder Spalte mit Werten zeilenweise nach einer angegebenen Anzahl von Elementen, um ein neues Array zu bilden.",
		abstract: "Umbricht die bereitgestellte Zeile oder Spalte mit Werten zeilenweise nach einer angegebenen Anzahl von Elementen, um ein neues Array zu bilden.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/wraprows-function"
		}],
		functionParameter: {
			vector: {
				name: "vector",
				detail: "Der zu umschließende Vektor oder Verweis."
			},
			wrapCount: {
				name: "wrap_count",
				detail: "Die maximale Anzahl von Werten für jede Zeile."
			},
			padWith: {
				name: "pad_with",
				detail: "Der Wert, mit dem auf der Füllung polstert werden soll. Der Standardwert lautet #N/A."
			}
		}
	},
	XLOOKUP: {
		description: "Verwenden Sie die XVERWEIS Funktion, wenn Sie Elemente in einer Tabelle oder einem Bereich nach Zeile suchen. Sie können z. B. nach dem Preis eines Kfz-Teils anhand der Artikelnummer suchen oder nach einem Mitarbeiternamen anhand seiner Mitarbeiter-ID. Mit XVERWEIS können Sie in einer Spalte nach einem bestimmten Suchbegriff suchen und ein Ergebnis aus derselben Zeile in einer anderen Spalte abrufen, und zwar unabhängig davon, auf welcher Seite sich die Ergebnisspalte befindet.",
		abstract: "Verwenden Sie die XVERWEIS Funktion, wenn Sie Elemente in einer Tabelle oder einem Bereich nach Zeile suchen. Sie können z. B. nach dem Preis eines Kfz-Teils anhand der Artikelnummer suchen oder nach einem Mitarbeiternamen anhand seiner Mitarbeiter-ID. Mit XVERWEIS können Sie in einer Spalte nach einem bestimmten Suchbegriff suchen und ein Ergebnis aus derselben Zeile in einer anderen Spalte abrufen, und zwar unabhängig davon, auf welcher Seite sich die Ergebnisspalte befindet.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/xlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "Der wert, nach dem gesucht werden soll *Wenn keine Angabe erfolgt, gibt XVERWEIS leere Zellen zurück, die in lookup_array gefunden werden."
			},
			lookupArray: {
				name: "lookup_array",
				detail: "Die Matrix oder der Bereich, die/der durchsucht werden soll"
			},
			returnArray: {
				name: "return_array",
				detail: "Das Array oder der Bereich, das/der zurückgegeben werden soll"
			},
			ifNotFound: {
				name: "if_not_found",
				detail: "Wenn keine gültige Übereinstimmung gefunden wird, wird der von Ihnen bereitgestellte \"[wenn_nicht_gefunden]\"-Text zurückgegeben. Wenn keine gültige Übereinstimmung gefunden wird und [falls_nicht_gefunden] fehlt, wird #n/v zurückgegeben."
			},
			matchMode: {
				name: "match_mode",
				detail: "Geben Sie den Übereinstimmungstyp an: 0: genaue Übereinstimmung. Wenn keine gefunden wird, wird \"#N/V\" zurückgegeben. Dies ist die Standardeinstellung. -1: genaue Übereinstimmung. Wenn keine gefunden wurde, geben Sie das nächstkleinere Element zurück. 1: genaue Übereinstimmung. Wenn keine gefunden wurde, geben Sie das nächstgrößere Element zurück. 2: eine Platzhalterübereinstimmung, wobei *, ? und ~ eine Sonderbedeutung haben."
			},
			searchMode: {
				name: "search_mode",
				detail: "Geben Sie den zu verwendenden Suchmodus an: 1: Führen Sie eine Suche durch, die beim ersten Element beginnt. Dies ist die Standardeinstellung. -1: Führen Sie eine umgekehrte Suche durch, die beim letzten Element beginnt. 2: Führen Sie eine Binärsuche durch, die darauf basiert, dass eine Suchmatrix in aufsteigender Reihenfolge sortiert ist. Ist diese nicht so sortiert, werden ungültige Ergebnisse zurückgegeben. -2: Führen Sie eine Binärsuche durch, die darauf basiert, dass eine Suchmatrix in absteigender Reihenfolge sortiert ist. Ist diese nicht so sortiert, werden ungültige Ergebnisse zurückgegeben."
			}
		}
	},
	XMATCH: {
		description: "Angenommen, wir haben eine Liste von Produkten in den Zellen C3 bis C7 und möchten ermitteln, wo sich das Produkt aus Zelle E3 in der Liste befindet. Hier verwenden wir XVERGLEICH, um die Position eines Elements in einer Liste zu bestimmen.",
		abstract: "Angenommen, wir haben eine Liste von Produkten in den Zellen C3 bis C7 und möchten ermitteln, wo sich das Produkt aus Zelle E3 in der Liste befindet. Hier verwenden wir XVERGLEICH, um die Position eines Elements in einer Liste zu bestimmen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/xmatch-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "Das Suchkriterium"
			},
			lookupArray: {
				name: "lookup_array",
				detail: "Die Matrix oder der Bereich, die/der durchsucht werden soll"
			},
			matchMode: {
				name: "match_mode",
				detail: "Geben Sie den Übereinstimmungstyp an: 0: exakte Übereinstimmung (Standard) -1: exakte Übereinstimmung oder nächstkleineres Element 1: exakte Übereinstimmung oder nächstgrößeres Element 2: eine Platzhalterübereinstimmung, wobei *, ? und ~ eine Sonderbedeutung haben."
			},
			searchMode: {
				name: "search_mode",
				detail: "Geben Sie den Suchtyp an: 1: Von erstem zu letztem Element suchen (Standard) -1: Von letztem zu erstem Element suchen (umgekehrte Suche). 2: Führen Sie eine Binärsuche durch, die darauf basiert, dass eine Suchmatrix in aufsteigender Reihenfolge sortiert ist. Ist diese nicht so sortiert, werden ungültige Ergebnisse zurückgegeben. -2: Führen Sie eine Binärsuche durch, die darauf basiert, dass eine Suchmatrix in absteigender Reihenfolge sortiert ist. Ist diese nicht so sortiert, werden ungültige Ergebnisse zurückgegeben."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/math/de-DE.ts
const locale$5 = {
	ABS: {
		description: "Liefert den Absolutwert einer Zahl. Der Absolutwert einer Zahl ist die Zahl ohne ihr Vorzeichen.",
		abstract: "Liefert den Absolutwert einer Zahl. Der Absolutwert einer Zahl ist die Zahl ohne ihr Vorzeichen.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/abs-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich. Es ist die reelle Zahl, deren Absolutwert Sie ermitteln möchten."
		} }
	},
	ACOS: {
		description: "Liefert den Arkuskosinus oder umgekehrten Kosinus einer Zahl. Der Arkuskosinus ist der Winkel, dessen Kosinus \"Zahl\" ist. Der Ergebniswinkel wird im Bogenmaß (Radiant) im Wertebereich von 0 (Null) bis pi (Pi) angegeben.",
		abstract: "Liefert den Arkuskosinus oder umgekehrten Kosinus einer Zahl. Der Arkuskosinus ist der Winkel, dessen Kosinus \"Zahl\" ist. Der Ergebniswinkel wird im Bogenmaß (Radiant) im Wertebereich von 0 (Null) bis pi (Pi) angegeben.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/acos-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich. Der Kosinus des jeweiligen Winkels und muss zwischen -1 und 1 liegen."
		} }
	},
	ACOSH: {
		description: "Gibt den umgekehrten hyperbolischen Kosinus einer Zahl zurück. Die Zahl muss größer oder gleich 1 sein. Der umgekehrte hyperbolische Kosinus ist der Wert, dessen hyperbolischer Kosinus zahl ist, sodass ACOSH(COSH(number)) gleich number ist.",
		abstract: "Gibt den umgekehrten hyperbolischen Kosinus einer Zahl zurück. Die Zahl muss größer oder gleich 1 sein. Der umgekehrte hyperbolische Kosinus ist der Wert, dessen hyperbolischer Kosinus zahl ist, sodass ACOSH(COSH(number)) gleich number ist.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/acosh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich. Jede beliebige reelle Zahl, die größer gleich 1 ist."
		} }
	},
	ACOT: {
		description: "Gibt den Hauptwert des Arkuskotangens (Umkehrfunktion des Kotangens) einer Zahl zurück.",
		abstract: "Gibt den Hauptwert des Arkuskotangens (Umkehrfunktion des Kotangens) einer Zahl zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/acot-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich. \"Zahl\" ist der Kotangens des Winkels, den Sie berechnen möchten. Der Wert muss eine reelle Zahl sein."
		} }
	},
	ACOTH: {
		description: "Gibt den umgekehrten hyperbolischen Kotangens einer Zahl zurück.",
		abstract: "Gibt den umgekehrten hyperbolischen Kotangens einer Zahl zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/acoth-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Der Absolutwert von number muss größer als 1 sein."
		} }
	},
	AGGREGATE: {
		description: "Gibt ein Aggregat in einer Liste oder einer Datenbank zurück. Mit der Funktion AGGREGAT können verschiedene Aggregatfunktionen auf eine Liste oder Datenbank mit der Option angewendet werden, ausgeblendete Zeilen sowie Fehlerwerte zu ignorieren.",
		abstract: "Gibt ein Aggregat in einer Liste oder einer Datenbank zurück. Mit der Funktion AGGREGAT können verschiedene Aggregatfunktionen auf eine Liste oder Datenbank mit der Option angewendet werden, ausgeblendete Zeilen sowie Fehlerwerte zu ignorieren.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/aggregate-function"
		}],
		functionParameter: {
			functionNum: {
				name: "function_num",
				detail: "Erforderlich. Ein Wert von 1 bis 19, der die zu verwendende Funktion angibt."
			},
			options: {
				name: "options",
				detail: "Erforderlich. Ein numerischer Wert, der bestimmt, welche Werte im Berechnungsbereich ignoriert werden sollen. Hinweis Ausgeblendete Zeilen, geschachtelte Teilergebnisse oder geschachtelte Aggregate werden von der Funktion nicht ignoriert, wenn das Arrayargument eine Berechnung enthält, z. B.: =AGGREGATE(14;3;A1:A100*(A1:A100>0);1)"
			},
			ref1: {
				name: "ref1",
				detail: "Erforderlich. Das erste numerische Argument für Funktionen, die mehrere numerische Argumente nutzen, für die Sie den Aggregatwert ermitteln möchten."
			},
			ref2: {
				name: "ref2",
				detail: "Optional. Die numerischen Argumente 2 bis 253, deren Aggregatwert Sie berechnen möchten. Bei Funktionen, die ein Array annehmen, ist ref1 ein Array, eine Arrayformel oder ein Verweis auf einen Zellbereich, für den Sie den Aggregatwert verwenden möchten. Ref2 ist ein zweites Argument, das für bestimmte Funktionen erforderlich ist. Die folgenden Funktionen erfordern ein ref2-Argument:"
			}
		}
	},
	ARABIC: {
		description: "Wandelt eine römische Zahl in eine arabische Zahl um.",
		abstract: "Wandelt eine römische Zahl in eine arabische Zahl um.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/arabic-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Erforderlich. Eine Zeichenfolge in Anführungszeichen, eine leere Zeichenfolge (\"\") oder ein Verweis auf eine Zelle, die Text enthält."
		} }
	},
	ASIN: {
		description: "Gibt den Arkussinus oder umgekehrten Sinus einer Zahl zurück. Der Arkussinus ist der Winkel, dessen Sinus zahl ist. Der zurückgegebene Winkel wird im Bogenmaß im Bereich -pi/2 bis pi/2 angegeben.",
		abstract: "Gibt den Arkussinus oder umgekehrten Sinus einer Zahl zurück. Der Arkussinus ist der Winkel, dessen Sinus zahl ist. Der zurückgegebene Winkel wird im Bogenmaß im Bereich -pi/2 bis pi/2 angegeben.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/asin-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich. Der Sinus des jeweiligen Winkels, der zwischen -1 und 1 liegen muss."
		} }
	},
	ASINH: {
		description: "Gibt den umgekehrten hyperbolischen Sinus einer Zahl zurück. Der inverse hyperbolische Sinus ist der Wert, dessen hyperbolischer Sinus zahl ist, sodass ASINH(SINH(number)) gleich number ist.",
		abstract: "Gibt den umgekehrten hyperbolischen Sinus einer Zahl zurück. Der inverse hyperbolische Sinus ist der Wert, dessen hyperbolischer Sinus zahl ist, sodass ASINH(SINH(number)) gleich number ist.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/asinh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich. Eine beliebige reelle Zahl."
		} }
	},
	ATAN: {
		description: "Gibt den Arkustangens oder umgekehrten Tangens einer Zahl zurück. Der Arkustangens ist der Winkel, dessen Tangens zahl ist. Der zurückgegebene Winkel wird im Bogenmaß im Bereich -pi/2 bis pi/2 angegeben.",
		abstract: "Gibt den Arkustangens oder umgekehrten Tangens einer Zahl zurück. Der Arkustangens ist der Winkel, dessen Tangens zahl ist. Der zurückgegebene Winkel wird im Bogenmaß im Bereich -pi/2 bis pi/2 angegeben.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/atan-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich. Der Tangens des Winkels, den Sie berechnen möchten."
		} }
	},
	ATAN2: {
		description: "Gibt den Arkustangens oder auch umgekehrten Tangens ausgehend von einer x- und einer y-Koordinate zurück. Dieser Arkustangens ist der Winkel zwischen der x-Achse und der Linie, die durch den Koordinatenursprung (0; 0) und den Punkt verläuft, der die Koordinaten (x_Koordinate; y_Koordinate) hat. Der Winkel wird im Bogenmaß (Radiant) mit einem Wert zwischen -pi und pi (ausgenommen -pi) ausgegeben.",
		abstract: "Gibt den Arkustangens oder auch umgekehrten Tangens ausgehend von einer x- und einer y-Koordinate zurück. Dieser Arkustangens ist der Winkel zwischen der x-Achse und der Linie, die durch den Koordinatenursprung (0; 0) und den Punkt verläuft, der die Koordinaten (x_Koordinate; y_Koordinate) hat. Der Winkel wird im Bogenmaß (Radiant) mit einem Wert zwischen -pi und pi (ausgenommen -pi) ausgegeben.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/atan2-function"
		}],
		functionParameter: {
			xNum: {
				name: "x_num",
				detail: "Erforderlich. Die x-Koordinate des Punkts."
			},
			yNum: {
				name: "y_num",
				detail: "Erforderlich. Die y-Koordinate des Punkts."
			}
		}
	},
	ATANH: {
		description: "Gibt den umgekehrten hyperbolischen Tangens einer Zahl zurück. Die Zahl muss zwischen -1 und 1 (ausgenommen -1 und 1) sein. Der umgekehrte hyperbolische Tangens ist der Wert, dessen hyperbolischer Tangens zahl ist, sodass ATANH(TANH(number)) gleich number ist.",
		abstract: "Gibt den umgekehrten hyperbolischen Tangens einer Zahl zurück. Die Zahl muss zwischen -1 und 1 (ausgenommen -1 und 1) sein. Der umgekehrte hyperbolische Tangens ist der Wert, dessen hyperbolischer Tangens zahl ist, sodass ATANH(TANH(number)) gleich number ist.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/atanh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich. Jede beliebige reelle Zahl zwischen 1 und -1."
		} }
	},
	BASE: {
		description: "Wandelt eine Zahl in eine Textdarstellung mit der angegebenen Basis um.",
		abstract: "Wandelt eine Zahl in eine Textdarstellung mit der angegebenen Basis um.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/base-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Die Zahl, die Sie umwandeln möchten. Muss eine ganze Zahl sein, die größer gleich 0 und kleiner als 2^53 ist."
			},
			radix: {
				name: "radix",
				detail: "Erforderlich. Die Basis, in die Sie die Zahl umwandeln möchten. Muss eine ganze Zahl sein, die größer gleich 2 und kleiner gleich 36 ist."
			},
			minLength: {
				name: "min_length",
				detail: "Optional. Die Mindestlänge der zurückgegebenen Zeichenfolge. Muss eine ganze Zahl sein, die größer gleich 0 ist."
			}
		}
	},
	CEILING: {
		description: "Rundet eine Zahl betragsmäßig auf das kleinste Vielfache von Schritt auf. Wenn Sie beispielsweise verhindern möchten, dass bei Ihren Preisen Cent verwendet werden, wobei Ihr Produkt 4,42 € kostet, können Sie die Formel =OBERGRENZE(4,42;0,05) verwenden, um die Preise entsprechend einer 5-Cent-Stufung aufzurunden.",
		abstract: "Rundet eine Zahl betragsmäßig auf das kleinste Vielfache von Schritt auf. Wenn Sie beispielsweise verhindern möchten, dass bei Ihren Preisen Cent verwendet werden, wobei Ihr Produkt 4,42 € kostet, können Sie die Formel =OBERGRENZE(4,42;0,05) verwenden, um die Preise entsprechend einer 5-Cent-Stufung aufzurunden.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/ceiling-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Der Wert, den Sie runden möchten."
			},
			significance: {
				name: "significance",
				detail: "Erforderlich. Das Vielfache, auf das Sie runden möchten."
			}
		}
	},
	CEILING_MATH: {
		description: "Die OBERGRENZE. Die MATH-Funktion rundet eine Zahl auf die nächste ganze Zahl oder optional auf das nächste Vielfache der Signifikanz auf.",
		abstract: "Die OBERGRENZE. Die MATH-Funktion rundet eine Zahl auf die nächste ganze Zahl oder optional auf das nächste Vielfache der Signifikanz auf.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/ceiling-math-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. (muss zwischen -2.229E-308.und 9.99E+307 sein.)"
			},
			significance: {
				name: "significance",
				detail: "Optional. Dies ist die Anzahl der signifikanten Ziffern nach dem Dezimaltrennzeichen, auf die die Zahl gerundet werden soll."
			},
			mode: {
				name: "mode",
				detail: "Optional. Dadurch wird gesteuert, ob negative Zahlen in Richtung oder weg von 0 gerundet werden."
			}
		}
	},
	CEILING_PRECISE: {
		description: "Gibt eine Zahl zurück, die auf die nächste Ganzzahl oder auf das kleinste Vielfache von \"Schritt\" gerundet wurde. Die Zahl wird unabhängig von ihrem Vorzeichen aufgerundet. Ist \"Zahl\" oder \"Schritt\" 0, wird 0 zurückgegeben.",
		abstract: "Gibt eine Zahl zurück, die auf die nächste Ganzzahl oder auf das kleinste Vielfache von \"Schritt\" gerundet wurde. Die Zahl wird unabhängig von ihrem Vorzeichen aufgerundet. Ist \"Zahl\" oder \"Schritt\" 0, wird 0 zurückgegeben.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/ceiling-precise-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Der Wert, der aufgerundet werden soll"
			},
			significance: {
				name: "significance",
				detail: "Optional. Das Vielfache, auf das die Zahl gerundet wird. Wenn \"Schritt\" ausgelassen wird, ist der Standardwert 1."
			}
		}
	},
	COMBIN: {
		description: "Gibt die Anzahl von Kombinationen für eine bestimmte Anzahl von Elementen zurück. Verwenden Sie KOMBINATIONEN, um zu berechnen, wie viele Gruppen aus einer bestimmten Anzahl von Elementen gebildet werden können.",
		abstract: "Gibt die Anzahl von Kombinationen für eine bestimmte Anzahl von Elementen zurück. Verwenden Sie KOMBINATIONEN, um zu berechnen, wie viele Gruppen aus einer bestimmten Anzahl von Elementen gebildet werden können.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/combin-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Die Anzahl von Elementen."
			},
			numberChosen: {
				name: "number_chosen",
				detail: "Erforderlich. Gibt an, aus wie vielen Elementen jede Kombination bestehen soll."
			}
		}
	},
	COMBINA: {
		description: "Gibt die Anzahl von Kombinationen (mit Wiederholungen) für eine bestimmte Anzahl von Elementen zurück.",
		abstract: "Gibt die Anzahl von Kombinationen (mit Wiederholungen) für eine bestimmte Anzahl von Elementen zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/combina-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Muss größer gleich 0 und größer gleich \"gewählte_Zahl\" sein. Nicht ganzzahlige Werte werden abgeschnitten."
			},
			numberChosen: {
				name: "number_chosen",
				detail: "Erforderlich. Muss größer gleich 0 sein. Nicht ganzzahlige Werte werden abgeschnitten."
			}
		}
	},
	COS: {
		description: "Gibt den Kosinus einer Zahl zurück.",
		abstract: "Gibt den Kosinus einer Zahl zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/cos-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich. Der im Bogenmaß angegebene Winkel, dessen Kosinus Sie berechnen möchten."
		} }
	},
	COSH: {
		description: "Gibt den hyperbolischen Kosinus einer Zahl zurück.",
		abstract: "Gibt den hyperbolischen Kosinus einer Zahl zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/cosh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich. Eine beliebige reelle Zahl, für die Sie den hyperbolischen Kosinus ermitteln möchten."
		} }
	},
	COT: {
		description: "Gibt den Kotangens eines im Bogenmaß angegebenen Winkels zurück.",
		abstract: "Gibt den Kotangens eines im Bogenmaß angegebenen Winkels zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/cot-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich. Der Winkel im Bogenmaß, für den Sie den Kotangens berechnen möchten"
		} }
	},
	COTH: {
		description: "Gibt den hyperbolischen Kotangens eines hyperbolischen Winkels zurück.",
		abstract: "Gibt den hyperbolischen Kotangens eines hyperbolischen Winkels zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/coth-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich."
		} }
	},
	CSC: {
		description: "Gibt den Kosekans eines im Bogenmaß angegebenen Winkels zurück.",
		abstract: "Gibt den Kosekans eines im Bogenmaß angegebenen Winkels zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/csc-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich."
		} }
	},
	CSCH: {
		description: "Gibt den hyperbolischen Kosekans eines im Bogenmaß angegebenen Winkels zurück.",
		abstract: "Gibt den hyperbolischen Kosekans eines im Bogenmaß angegebenen Winkels zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/csch-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich."
		} }
	},
	DECIMAL: {
		description: "Konvertiert eine Textdarstellung einer Zahl mit einer angegebenen Basis in eine Dezimalzahl.",
		abstract: "Konvertiert eine Textdarstellung einer Zahl mit einer angegebenen Basis in eine Dezimalzahl.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/decimal-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Erforderlich."
			},
			radix: {
				name: "radix",
				detail: "Erforderlich. Die Basis muss eine ganze Zahl sein."
			}
		}
	},
	DEGREES: {
		description: "Wandelt Bogenmaß (Radiant) in Grad um.",
		abstract: "Wandelt Bogenmaß (Radiant) in Grad um.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/degrees-function"
		}],
		functionParameter: { angle: {
			name: "angle",
			detail: "Erforderlich. Der in Bogenmaß (Radiant) gegebene Winkel, den Sie umwandeln möchten."
		} }
	},
	EVEN: {
		description: "Gibt die zahl zurück, die auf die nächste gerade ganze Zahl aufgerundet wurde. Sie können diese Funktion verwenden, um Elemente zu verarbeiten, die zu zweit vorhanden sind. Beispielsweise akzeptiert eine Packkiste Zeilen mit einem oder zwei Elementen. Die Kiste ist voll, wenn die Auf die nächsten beiden Elemente aufgerundet mit der Kapazität der Kiste übereinstimmt.",
		abstract: "Gibt die zahl zurück, die auf die nächste gerade ganze Zahl aufgerundet wurde. Sie können diese Funktion verwenden, um Elemente zu verarbeiten, die zu zweit vorhanden sind. Beispielsweise akzeptiert eine Packkiste Zeilen mit einem oder zwei Elementen. Die Kiste ist voll, wenn die Auf die nächsten beiden Elemente aufgerundet mit der Kapazität der Kiste übereinstimmt.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/even-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich. Der Wert, der aufgerundet werden soll."
		} }
	},
	EXP: {
		description: "Potenziert die Basis e mit der als Argument angegebenen Zahl. Die Konstante \"e\" ist die Basis des natürlichen Logarithmus und hat den Wert 2,71828182845904.",
		abstract: "Potenziert die Basis e mit der als Argument angegebenen Zahl. Die Konstante \"e\" ist die Basis des natürlichen Logarithmus und hat den Wert 2,71828182845904.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/exp-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich. Der Exponent zur Basis e."
		} }
	},
	FACT: {
		description: "Gibt die Fakultät einer Zahl zurück. Die Fakultät einer Zahl wird aus 1*2*3*...* Zahl berechnet.",
		abstract: "Gibt die Fakultät einer Zahl zurück. Die Fakultät einer Zahl wird aus 1*2*3*...* Zahl berechnet.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/fact-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich. Die nicht negative Zahl, deren Fakultät Sie berechnen möchten. Ist \"Zahl\" keine ganze Zahl, werden die Nachkommastellen abgeschnitten."
		} }
	},
	FACTDOUBLE: {
		description: "Gibt die Fakultät zu Zahl mit Schrittlänge 2 zurück.",
		abstract: "Gibt die Fakultät zu Zahl mit Schrittlänge 2 zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/factdouble-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich. Der Wert, für den die Fakultät mit Schrittlänge 2 berechnet werden soll. Ist \"Zahl\" keine ganze Zahl, werden die Nachkommastellen abgeschnitten."
		} }
	},
	FLOOR: {
		description: "Die FLOOR-Funktion in Excel rundet eine angegebene Zahl auf das nächste angegebene Vielfache von Bedeutung ab. Negative Zahlen werden auf das nächste ganze Vielfache unter 0 (null) gerundet (weiter negativ).",
		abstract: "Die FLOOR-Funktion in Excel rundet eine angegebene Zahl auf das nächste angegebene Vielfache von Bedeutung ab. Negative Zahlen werden auf das nächste ganze Vielfache unter 0 (null) gerundet (weiter negativ).",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/floor-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Der numerische Wert, den Sie runden möchten."
			},
			significance: {
				name: "significance",
				detail: "Erforderlich. Das Vielfache, auf das Sie runden möchten."
			}
		}
	},
	FLOOR_MATH: {
		description: "Rundet eine Zahl auf die nächste ganze Zahl oder auf das nächste Vielfache von Schritt ab.",
		abstract: "Rundet eine Zahl auf die nächste ganze Zahl oder auf das nächste Vielfache von Schritt ab.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/floor-math-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Die Zahl, die Sie abrunden möchten."
			},
			significance: {
				name: "significance",
				detail: "Optional. Das Vielfache, auf das Sie runden möchten."
			},
			mode: {
				name: "mode",
				detail: "Optional. Die Richtung (hin zu oder weg von 0), in der negative Zahlen gerundet werden sollen."
			}
		}
	},
	FLOOR_PRECISE: {
		description: "Rundet eine Zahl auf die nächste ganze Zahl oder das nächste Vielfache von \"Schritt\" ab. Die Zahl wird unabhängig vom Vorzeichen abgerundet. Wenn die Zahl oder der \"Schritt\" jedoch Null ist, wird Null zurückgegeben.",
		abstract: "Rundet eine Zahl auf die nächste ganze Zahl oder das nächste Vielfache von \"Schritt\" ab. Die Zahl wird unabhängig vom Vorzeichen abgerundet. Wenn die Zahl oder der \"Schritt\" jedoch Null ist, wird Null zurückgegeben.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/floor-precise-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Der Wert, der aufgerundet werden soll"
			},
			significance: {
				name: "significance",
				detail: "Optional. Das Vielfache, auf das die Zahl gerundet wird. Wenn \"Schritt\" ausgelassen wird, ist der Standardwert 1."
			}
		}
	},
	GCD: {
		description: "Gibt den größten gemeinsamen Teiler zurück. Der größte gemeinsame Teiler ist die ganze Zahl, durch die sowohl Zahl1 als auch Zahl2 dividiert werden können, ohne dass ein Rest bleibt.",
		abstract: "Gibt den größten gemeinsamen Teiler zurück. Der größte gemeinsame Teiler ist die ganze Zahl, durch die sowohl Zahl1 als auch Zahl2 dividiert werden können, ohne dass ein Rest bleibt.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/gcd-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Zahl1 ist erforderlich, nachfolgende Nummern sind optional. 1 bis 255 Werte. Bei Werten, die keine ganzen Zahlen sind, werden die Nachkommastellen abgeschnitten."
			},
			number2: {
				name: "number2",
				detail: "Zahl1 ist erforderlich, nachfolgende Nummern sind optional. 1 bis 255 Werte. Bei Werten, die keine ganzen Zahlen sind, werden die Nachkommastellen abgeschnitten."
			}
		}
	},
	INT: {
		description: "Rundet eine Zahl auf die nächste ganze Zahl ab.",
		abstract: "Rundet eine Zahl auf die nächste ganze Zahl ab.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/int-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich. Die reelle Zahl, die Sie auf eine ganze Zahl runden möchten."
		} }
	},
	ISO_CEILING: {
		description: "Gibt eine Zahl zurück, die auf die nächste Ganzzahl oder auf das kleinste Vielfache von \"Schritt\" gerundet wurde. Die Zahl wird unabhängig von ihrem Vorzeichen aufgerundet. Ist \"Zahl\" oder \"Schritt\" 0, wird 0 zurückgegeben.",
		abstract: "Gibt eine Zahl zurück, die auf die nächste Ganzzahl oder auf das kleinste Vielfache von \"Schritt\" gerundet wurde. Die Zahl wird unabhängig von ihrem Vorzeichen aufgerundet. Ist \"Zahl\" oder \"Schritt\" 0, wird 0 zurückgegeben.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/iso-ceiling-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Der Wert, der aufgerundet werden soll"
			},
			significance: {
				name: "significance",
				detail: "Optional. Das Vielfache, auf das die Zahl gerundet wird. Wenn \"Schritt\" ausgelassen wird, ist der Standardwert 1."
			}
		}
	},
	LCM: {
		description: "Gibt das kleinste gemeinsame Vielfache der als Argumente angegebenen ganzen Zahlen zurück. Als kleinstes gemeinsames Vielfaches wird die kleinste positive ganze Zahl bezeichnet, die ein Vielfaches aller ganzzahligen Argumente \"Zahl1\", \"Zahl2\" und so weiter ist. KGV können Sie verwenden, wenn Sie Brüche addieren müssen, die unterschiedliche Nenner haben.",
		abstract: "Gibt das kleinste gemeinsame Vielfache der als Argumente angegebenen ganzen Zahlen zurück. Als kleinstes gemeinsames Vielfaches wird die kleinste positive ganze Zahl bezeichnet, die ein Vielfaches aller ganzzahligen Argumente \"Zahl1\", \"Zahl2\" und so weiter ist. KGV können Sie verwenden, wenn Sie Brüche addieren müssen, die unterschiedliche Nenner haben.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/lcm-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Zahl1 ist erforderlich, nachfolgende Nummern sind optional. 1 bis 255 Werte, deren kleinstes gemeinsames Vielfaches Sie berechnen möchten. Bei Werten, die keine ganzen Zahlen sind, werden deren Nachkommastellen abgeschnitten."
			},
			number2: {
				name: "number2",
				detail: "Zahl1 ist erforderlich, nachfolgende Nummern sind optional. 1 bis 255 Werte, deren kleinstes gemeinsames Vielfaches Sie berechnen möchten. Bei Werten, die keine ganzen Zahlen sind, werden deren Nachkommastellen abgeschnitten."
			}
		}
	},
	LN: {
		description: "Gibt den natürlichen Logarithmus einer Zahl zurück. Natürliche Logarithmen haben die Konstante e (2,71828182845904) als Basis.",
		abstract: "Gibt den natürlichen Logarithmus einer Zahl zurück. Natürliche Logarithmen haben die Konstante e (2,71828182845904) als Basis.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/ln-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich. Die positive reelle Zahl, deren natürlichen Logarithmus Sie berechnen möchten"
		} }
	},
	LOG: {
		description: "Gibt den Logarithmus einer Zahl zu der angegebenen Basis zurück.",
		abstract: "Gibt den Logarithmus einer Zahl zu der angegebenen Basis zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/log-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Die positive reelle Zahl, deren Logarithmus Sie berechnen möchten"
			},
			base: {
				name: "base",
				detail: "Optional. Die Basis des Logarithmus. Wenn das Argument \"Basis\" fehlt, wird es als 10 angenommen."
			}
		}
	},
	LOG10: {
		description: "Gibt den Logarithmus einer Zahl zur Basis 10 zurück.",
		abstract: "Gibt den Logarithmus einer Zahl zur Basis 10 zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/log10-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich. Die positive reelle Zahl, deren Logarithmus zur Basis 10 Sie berechnen möchten"
		} }
	},
	MDETERM: {
		description: "Liefert die Determinante einer Matrix.",
		abstract: "Liefert die Determinante einer Matrix.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/mdeterm-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "Erforderlich. Eine quadratische Matrix (die Anzahl der Zeilen und Spalten ist identisch)"
		} }
	},
	MINVERSE: {
		description: "Die FUNKTION MINVERSE gibt die umgekehrte Matrix für eine Matrix zurück, die in einem Array gespeichert ist.",
		abstract: "Die FUNKTION MINVERSE gibt die umgekehrte Matrix für eine Matrix zurück, die in einem Array gespeichert ist.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/minverse-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "Erforderlich. Eine quadratische Matrix (die Anzahl der Zeilen und Spalten ist identisch)"
		} }
	},
	MMULT: {
		description: "Die MMULT-Funktion gibt das Matrixprodukt von zwei Arrays zurück. Das Ergebnis ist eine Matrix, die dieselbe Anzahl von Zeilen wie Matrix1 und dieselbe Anzahl von Spalten wie Matrix2 hat.",
		abstract: "Die MMULT-Funktion gibt das Matrixprodukt von zwei Arrays zurück. Das Ergebnis ist eine Matrix, die dieselbe Anzahl von Zeilen wie Matrix1 und dieselbe Anzahl von Spalten wie Matrix2 hat.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/mmult-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Die Matrizen, die Sie multiplizieren möchten."
			},
			array2: {
				name: "array2",
				detail: "Die Matrizen, die Sie multiplizieren möchten."
			}
		}
	},
	MOD: {
		description: "Gibt den Rest einer Division zurück. Das Ergebnis hat dasselbe Vorzeichen wie Divisor.",
		abstract: "Gibt den Rest einer Division zurück. Das Ergebnis hat dasselbe Vorzeichen wie Divisor.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/mod-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Die Zahl, für die der Rest einer Division gesucht wird."
			},
			divisor: {
				name: "divisor",
				detail: "Erforderlich. Die Zahl, durch die \"Zahl\" dividiert werden soll."
			}
		}
	},
	MROUND: {
		description: "MROUND gibt eine Zahl zurück, die auf das gewünschte Vielfache gerundet ist.",
		abstract: "MROUND gibt eine Zahl zurück, die auf das gewünschte Vielfache gerundet ist.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/mround-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Der Wert, der aufgerundet werden soll."
			},
			multiple: {
				name: "multiple",
				detail: "Erforderlich. Das Vielfache, auf das Sie \"Zahl\" runden möchten."
			}
		}
	},
	MULTINOMIAL: {
		description: "Gibt den Polynomialkoeffizienten einer Gruppe von Zahlen zurück.",
		abstract: "Gibt den Polynomialkoeffizienten einer Gruppe von Zahlen zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/multinomial-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Zahl1 ist erforderlich, nachfolgende Nummern sind optional. 1 bis 255 Werte, deren Polynomialkoeffizienten Sie berechnen möchten."
			},
			number2: {
				name: "number2",
				detail: "Zahl1 ist erforderlich, nachfolgende Nummern sind optional. 1 bis 255 Werte, deren Polynomialkoeffizienten Sie berechnen möchten."
			}
		}
	},
	MUNIT: {
		description: "Die MUNIT-Funktion gibt die Einheitenmatrix für die angegebene Dimension zurück.",
		abstract: "Die MUNIT-Funktion gibt die Einheitenmatrix für die angegebene Dimension zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/munit-function"
		}],
		functionParameter: { dimension: {
			name: "dimension",
			detail: "Dimension ist eine ganze Zahl, die die Dimension der zurückzugebenden Einheitsmatrix angibt. Die Funktion gibt eine Matrix zurück. Dimension muss größer als null sein."
		} }
	},
	ODD: {
		description: "Rundet eine Zahl auf die nächste ungerade ganze Zahl auf.",
		abstract: "Rundet eine Zahl auf die nächste ungerade ganze Zahl auf.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/odd-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich. Der Wert, der aufgerundet werden soll."
		} }
	},
	PI: {
		description: "Gibt den Wert pi zurück, die mathematische Konstante (3,14159265358979) mit einer Genauigkeit von 15 Stellen.",
		abstract: "Gibt den Wert pi zurück, die mathematische Konstante (3,14159265358979) mit einer Genauigkeit von 15 Stellen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/pi-function"
		}],
		functionParameter: {}
	},
	POWER: {
		description: "Gibt als Ergebnis eine potenzierte Zahl zurück.",
		abstract: "Gibt als Ergebnis eine potenzierte Zahl zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/power-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Die Zahl, die Sie mit dem Exponenten potenzieren möchten. Es sind alle reellen Zahlen zulässig."
			},
			power: {
				name: "power",
				detail: "Erforderlich. Der Exponent, mit dem Sie die Zahl potenzieren möchten"
			}
		}
	},
	PRODUCT: {
		description: "Die FUNKTION PRODUCT multipliziert alle als Argumente angegebenen Zahlen und gibt das Produkt zurück. Wenn die Zellen A1 und A2 z. B. Zahlen enthalten, können Sie die Formel =PRODUCT(A1, A2) verwenden, um diese beiden Zahlen zusammen zu multiplizieren. Sie können denselben Vorgang auch mit dem mathematischen Operator multiplizieren ( * ) ausführen, z. B. =A1 * A2 .",
		abstract: "Die FUNKTION PRODUCT multipliziert alle als Argumente angegebenen Zahlen und gibt das Produkt zurück. Wenn die Zellen A1 und A2 z. B. Zahlen enthalten, können Sie die Formel =PRODUCT(A1, A2) verwenden, um diese beiden Zahlen zusammen zu multiplizieren. Sie können denselben Vorgang auch mit dem mathematischen Operator multiplizieren ( * ) ausführen, z. B. =A1 * A2 .",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/product-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Erforderlich. Die erste Zahl oder der erste Bereich, den Sie multiplizieren möchten."
			},
			number2: {
				name: "number2",
				detail: "Optional. Bis zu 255 zusätzliche Zahlen oder Bereiche, die multipliziert werden sollen."
			}
		}
	},
	QUOTIENT: {
		description: "Gibt den ganzzahligen Anteil einer Division zurück. Diese Funktion können Sie immer dann verwenden, wenn Sie die Nachkommastellen (den Rest) einer Division löschen möchten.",
		abstract: "Gibt den ganzzahligen Anteil einer Division zurück. Diese Funktion können Sie immer dann verwenden, wenn Sie die Nachkommastellen (den Rest) einer Division löschen möchten.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/quotient-function"
		}],
		functionParameter: {
			numerator: {
				name: "numerator",
				detail: "Erforderlich. Der Dividend"
			},
			denominator: {
				name: "denominator",
				detail: "Erforderlich. Der Divisor"
			}
		}
	},
	RADIANS: {
		description: "Wandelt Grad in Bogenmaß (Radiant) um.",
		abstract: "Wandelt Grad in Bogenmaß (Radiant) um.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/radians-function"
		}],
		functionParameter: { angle: {
			name: "angle",
			detail: "Erforderlich. Ein in Grad gegebener Winkel, den Sie umwandeln möchten"
		} }
	},
	RAND: {
		description: "Zufallszahl gibt eine gleichmäßig verteilte zufällige reelle Zahl zurück, die größer oder gleich 0 und kleiner als 1 ist. Bei jeder Neuberechnung des jeweiligen Arbeitsblatts wird eine neue zufällige reelle Zahl ausgegeben.",
		abstract: "Zufallszahl gibt eine gleichmäßig verteilte zufällige reelle Zahl zurück, die größer oder gleich 0 und kleiner als 1 ist. Bei jeder Neuberechnung des jeweiligen Arbeitsblatts wird eine neue zufällige reelle Zahl ausgegeben.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/rand-function"
		}],
		functionParameter: {}
	},
	RANDARRAY: {
		description: "In den folgenden Beispielen wurde ein Array erstellt, das 5 Zeilen hoch und 3 Spalten breit ist. Das erste gibt eine zufällige Gruppe von Werten zwischen 0 und 1 zurück, das Standardverhalten von ZUFALLSMATRIX. Die nächste gibt eine Reihe von zufälligen Dezimalwerten zwischen 1 und 100 zurück. Das dritte Beispiel schließlich gibt eine Reihe von zufälligen ganzen Zahlen zwischen 1 und 100 zurück.",
		abstract: "In den folgenden Beispielen wurde ein Array erstellt, das 5 Zeilen hoch und 3 Spalten breit ist. Das erste gibt eine zufällige Gruppe von Werten zwischen 0 und 1 zurück, das Standardverhalten von ZUFALLSMATRIX. Die nächste gibt eine Reihe von zufälligen Dezimalwerten zwischen 1 und 100 zurück. Das dritte Beispiel schließlich gibt eine Reihe von zufälligen ganzen Zahlen zwischen 1 und 100 zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/randarray-function"
		}],
		functionParameter: {
			rows: {
				name: "rows",
				detail: "Die Anzahl der Zeilen, die zurückgegeben werden sollen"
			},
			columns: {
				name: "columns",
				detail: "Die Anzahl der Spalten, die zurückgegeben werden sollen"
			},
			min: {
				name: "min",
				detail: "Der Mindestwert, der zurückgegeben werden soll"
			},
			max: {
				name: "max",
				detail: "Der Höchstwert, der zurückgegeben werden soll"
			},
			wholeNumber: {
				name: "whole_number",
				detail: "Eine ganze Zahl oder einen Dezimalwert zurückgeben WAHR für eine ganze Zahl, FALSE für eine Dezimalzahl"
			}
		}
	},
	RANDBETWEEN: {
		description: "Gibt eine ganze Zufallszahl aus dem festgelegten Bereich zurück. Bei jeder Neuberechnung des jeweiligen Arbeitsblatts wird eine neue ganze Zufallszahl ausgegeben.",
		abstract: "Gibt eine ganze Zufallszahl aus dem festgelegten Bereich zurück. Bei jeder Neuberechnung des jeweiligen Arbeitsblatts wird eine neue ganze Zufallszahl ausgegeben.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/randbetween-function"
		}],
		functionParameter: {
			bottom: {
				name: "bottom",
				detail: "Erforderlich. Die kleinste ganze Zahl, die ZUFALLSBEREICH als Ergebnis zurückgeben kann."
			},
			top: {
				name: "top",
				detail: "Erforderlich. Die größte ganze Zahl, die ZUFALLSBEREICH als Ergebnis zurückgeben kann."
			}
		}
	},
	ROMAN: {
		description: "Wandelt eine arabische Zahl in eine römische Zahl als Text um.",
		abstract: "Wandelt eine arabische Zahl in eine römische Zahl als Text um.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/roman-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Die arabische Zahl, die Sie umwandeln möchten"
			},
			form: {
				name: "form",
				detail: "Optional. Eine Zahl, die den Typ der römischen Zahl angibt. Die Schreibweise der römischen Zahlen reicht von klassisch bis vereinfacht, wobei die Zeichenfolge kürzer wird, sobald ein höherer Typ vorliegt. Das unten gezeigte Beispiel \"RÖMISCH(499;0)\" erläutert dies."
			}
		}
	},
	ROUND: {
		description: "Mit der Funktion RUNDEN wird eine Zahl auf eine angegebene Anzahl von Stellen gerundet. Wenn beispielsweise die Zelle A1 den Wert 23,7825 enthält und Sie diesen Wert auf zwei Dezimalstellen runden möchten, können Sie die folgende Formel verwenden:",
		abstract: "Mit der Funktion RUNDEN wird eine Zahl auf eine angegebene Anzahl von Stellen gerundet. Wenn beispielsweise die Zelle A1 den Wert 23,7825 enthält und Sie diesen Wert auf zwei Dezimalstellen runden möchten, können Sie die folgende Formel verwenden:",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/round-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Die Zahl, die gerundet werden soll."
			},
			numDigits: {
				name: "num_digits",
				detail: "Erforderlich. Die Anzahl der Dezimalstellen, auf die die Zahl gerundet werden soll."
			}
		}
	},
	ROUNDBANK: {
		description: "Rundet eine Zahl nach der Banker's-Rounding-Methode zur nächsten geraden Zahl.",
		abstract: "Rundet eine Zahl nach der Banker's-Rounding-Methode zur nächsten geraden Zahl.",
		links: [{
			title: "Instruction",
			url: ""
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Die Zahl, die Sie nach der Bankerrundungsmethode runden möchten."
			},
			numDigits: {
				name: "num_digits",
				detail: "Die Anzahl der Stellen, auf die Sie nach der Bankerrundungsmethode runden möchten."
			}
		}
	},
	ROUNDDOWN: {
		description: "Rundet die Zahl auf \"Anzahl_Stellen\" in Richtung Null ab.",
		abstract: "Rundet die Zahl auf \"Anzahl_Stellen\" in Richtung Null ab.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/rounddown-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Eine reelle Zahl, die Sie abrunden möchten"
			},
			numDigits: {
				name: "num_digits",
				detail: "Erforderlich. Gibt an, auf wie viele Dezimalstellen die Zahl gerundet werden soll"
			}
		}
	},
	ROUNDUP: {
		description: "Rundet die Zahl auf Anzahl_Stellen auf.",
		abstract: "Rundet die Zahl auf Anzahl_Stellen auf.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/roundup-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Eine reelle Zahl, die Sie aufrunden möchten"
			},
			numDigits: {
				name: "num_digits",
				detail: "Erforderlich. Gibt an, auf wie viele Dezimalstellen die Zahl gerundet werden soll"
			}
		}
	},
	SEC: {
		description: "Gibt den Sekans eines Winkels zurück.",
		abstract: "Gibt den Sekans eines Winkels zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/sec-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Number ist der Winkel im Bogenmaß, für den Sie den Sekans berechnen möchten."
		} }
	},
	SECH: {
		description: "Gibt den hyperbolischen Sekans eines Winkels zurück.",
		abstract: "Gibt den hyperbolischen Sekans eines Winkels zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/sech-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Number ist der Winkel im Bogenmaß, für den Sie den hyperbolischen Sekans berechnen möchten."
		} }
	},
	SERIESSUM: {
		description: "Viele Funktionen können mithilfe einer Potenzreihenentwicklung angenähert werden.",
		abstract: "Viele Funktionen können mithilfe einer Potenzreihenentwicklung angenähert werden.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/seriessum-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Erforderlich. Der Wert der unabhängigen Variablen der Potenzreihe"
			},
			n: {
				name: "n",
				detail: "Erforderlich. Die Anfangspotenz, in die Sie \"x\" erheben möchten."
			},
			m: {
				name: "m",
				detail: "Erforderlich. Das Inkrement, um das Sie \"n\" in jedem Glied der Reihe vergrößern möchten."
			},
			coefficients: {
				name: "coefficients",
				detail: "Erforderlich. Ein Satz von Koeffizienten, mit denen jede aufeinanderfolgende Potenz von x multipliziert wird. Die Anzahl der Werte in Koeffizienten bestimmt die Anzahl der Begriffe in der Leistungsreihe. Wenn beispielsweise drei Werte in Koeffizienten vorhanden sind, gibt es drei Begriffe in der Leistungsreihe."
			}
		}
	},
	SEQUENCE: {
		description: "Im folgenden Beispiel wurde mit =SEQUENZ(4;5) ein Array erstellt, das 4 Zeilen hoch und 5 Spalten breit ist.",
		abstract: "Im folgenden Beispiel wurde mit =SEQUENZ(4;5) ein Array erstellt, das 4 Zeilen hoch und 5 Spalten breit ist.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/sequence-function"
		}],
		functionParameter: {
			rows: {
				name: "rows",
				detail: "Die Anzahl der Zeilen, die zurückgegeben werden sollen"
			},
			columns: {
				name: "columns",
				detail: "Die Anzahl der Spalten, die zurückgegeben werden sollen"
			},
			start: {
				name: "start",
				detail: "Die erste Zahl in der Folge"
			},
			step: {
				name: "step",
				detail: "Der Betrag zum schrittweisen Erhöhen jedes nachfolgenden Werts im Array"
			}
		}
	},
	SIGN: {
		description: "Bestimmt das Vorzeichen einer Zahl. Gibt 1 zurück, wenn die Zahl positiv ist, null (0), wenn die Zahl 0 ist, und -1, wenn die Zahl negativ ist.",
		abstract: "Bestimmt das Vorzeichen einer Zahl. Gibt 1 zurück, wenn die Zahl positiv ist, null (0), wenn die Zahl 0 ist, und -1, wenn die Zahl negativ ist.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/sign-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich. Eine beliebige reelle Zahl."
		} }
	},
	SIN: {
		description: "Gibt den Sinus einer Zahl zurück.",
		abstract: "Gibt den Sinus einer Zahl zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/sin-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich. Der Winkel im Bogenmaß, für den Sie den Sinus berechnen möchten"
		} }
	},
	SINH: {
		description: "Gibt den hyperbolischen Sinus einer Zahl zurück.",
		abstract: "Gibt den hyperbolischen Sinus einer Zahl zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/sinh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich. Eine beliebige reelle Zahl"
		} }
	},
	SQRT: {
		description: "Gibt die Quadratwurzel einer Zahl zurück.",
		abstract: "Gibt die Quadratwurzel einer Zahl zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/sqrt-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich. Die Zahl, deren Quadratwurzel Sie berechnen möchten"
		} }
	},
	SQRTPI: {
		description: "Gibt die Wurzel aus der mit Pi (pi) multiplizierten Zahl zurück.",
		abstract: "Gibt die Wurzel aus der mit Pi (pi) multiplizierten Zahl zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/sqrtpi-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich. Die Zahl, mit der Pi multipliziert wird"
		} }
	},
	SUBTOTAL: {
		description: "Gibt ein Teilergebnis in einer Liste oder Datenbank zurück. Grundsätzlich ist es einfacher, eine mit Teilergebnissen versehene Liste mithilfe des Befehls Teilergebnisse in der Gruppe Gliederung auf der Registerkarte Daten der Excel-Desktopanwendung zu erstellen. Nachdem eine solche mit Teilergebnissen versehene Liste erstellt wurde, können Sie diese mit der Funktion TEILERGEBNIS bearbeiten.",
		abstract: "Gibt ein Teilergebnis in einer Liste oder Datenbank zurück. Grundsätzlich ist es einfacher, eine mit Teilergebnissen versehene Liste mithilfe des Befehls Teilergebnisse in der Gruppe Gliederung auf der Registerkarte Daten der Excel-Desktopanwendung zu erstellen. Nachdem eine solche mit Teilergebnissen versehene Liste erstellt wurde, können Sie diese mit der Funktion TEILERGEBNIS bearbeiten.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/subtotal-function"
		}],
		functionParameter: {
			functionNum: {
				name: "function_num",
				detail: "Erforderlich. Die Zahl 1-11 oder 101-111, die die Funktion angibt, die für das Teilergebnis verwendet werden soll. 1-11 enthält manuell ausgeblendete Zeilen, während 101-111 sie ausschließt; Herausgefilterte Zellen sind immer ausgeschlossen."
			},
			ref1: {
				name: "ref1",
				detail: "Erforderlich. Der erste benannte Bereich oder Bezug, für den Sie das Teilergebnis berechnen möchten"
			},
			ref2: {
				name: "ref2",
				detail: "Optional. 2 bis 254 benannte Bereiche oder Bezüge, für die Sie das Teilergebnis berechnen möchten"
			}
		}
	},
	SUM: {
		description: "Die FUNKTION SUMME fügt Werte hinzu. Sie können einzelne Werte, Zellbezüge oder Bereiche bzw. eine Kombination aller drei Optionen addieren.",
		abstract: "Die FUNKTION SUMME fügt Werte hinzu. Sie können einzelne Werte, Zellbezüge oder Bereiche bzw. eine Kombination aller drei Optionen addieren.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/sum-function"
		}],
		functionParameter: {
			number1: {
				name: "Number 1",
				detail: "Die erste Zahl, die Sie addieren möchten. Die Zahl kann wie 4, ein Zellbezug wie B6 oder ein Zellbereich wie B2:B8 sein."
			},
			number2: {
				name: "Number 2",
				detail: "Dies ist die zweite Zahl, die Sie addieren möchten. Sie können bis zu 255 Zahlen auf diese Weise angeben."
			}
		}
	},
	SUMIF: {
		description: "Sie verwenden die FUNKTION SUMMEWENN , um die Werte in einem Bereich zu summieren, die den von Ihnen angegebenen Kriterien entsprechen. Angenommen, Sie möchten in einer Spalte, die Zahlen enthält nur die Werte summieren, die größer als 5 sind. Sie können die folgende Formel verwenden: =SUMMEWENN(B2:B25;\">5\")",
		abstract: "Sie verwenden die FUNKTION SUMMEWENN , um die Werte in einem Bereich zu summieren, die den von Ihnen angegebenen Kriterien entsprechen. Angenommen, Sie möchten in einer Spalte, die Zahlen enthält nur die Werte summieren, die größer als 5 sind. Sie können die folgende Formel verwenden: =SUMMEWENN(B2:B25;\">5\")",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/sumif-function"
		}],
		functionParameter: {
			range: {
				name: "range",
				detail: "Erforderlich. Der Zellbereich, den Sie nach Kriterien auswerten möchten. Zulässige Zellen in jedem Bereich sind Zahlen oder Namen, Arrays oder Bezüge, die Zahlen enthalten. Leere Zellen und Textwerte werden ignoriert. Der ausgewählte Bereich kann Datumsangaben im Excel-Standardformat enthalten (siehe folgende Beispiele)."
			},
			criteria: {
				name: "criteria",
				detail: "Erforderlich. Die Suchkriterien in Form einer Zahl, eines Ausdrucks, eines Zellbezugs, eines Texts oder einer Funktion, mit denen definiert wird, welche Zellen addiert werden. Es können Platzhalterzeichen eingefügt werden – ein Fragezeichen (?) zur Übereinstimmung mit einem beliebigen einzelnem Zeichen, ein Sternchen (*) zur Übereinstimmung mit einer beliebigen einzelnen Zeichenfolge. Wenn Sie ein tatsächliches Fragezeichen oder Sternchen suchen möchten, geben Sie eine Tilde ( ~ ) vor dem Zeichen ein. Kriterien können beispielsweise als 32, \">32\", B5, \"3?\", \"Apfel*\", \"*~?\" oder HEUTE() ausgedrückt werden. Wichtig Suchkriterien in Textform oder Kriterien, die logische oder mathematische Symbole enthalten, müssen in doppelte Anführungszeichen ( \" ) gesetzt werden. Bei numerischen Suchkriterien sind keine doppelten Anführungszeichen erforderlich."
			},
			sumRange: {
				name: "sum_range",
				detail: "Optional. Die tatsächlich hinzuzufügenden Zellen, wenn Sie andere Zellen als die im Range-Argument angegebenen hinzufügen möchten. Wenn das argument sum_range ausgelassen wird, fügt Excel die Zellen hinzu, die im Argument range angegeben sind (die gleichen Zellen, auf die die Kriterien angewendet werden). Sum_range sollte die gleiche Größe und Form aufweisen wie der Bereich . Wenn dies nicht der Fall ist, kann die Leistung beeinträchtigt werden, und die Formel summiert einen Zellbereich, der mit der ersten Zelle in sum_range beginnt, aber die gleichen Dimensionen wie bereich aufweist. Beispiel: Bereich Summe_Bereich Tatsächlich summierte Zellen A1:A5 B1:B5 B1:B5 A1:A5 B1:K5 B1:B5"
			}
		}
	},
	SUMIFS: {
		description: "Mit der Funktion SUMMEWENNS, einer der mathematischen und trigonometrischen Funktionen , werden alle Argumente addiert, die mehrere Kriterien erfüllen. Beispielsweise würden Sie SUMMEWENNS verwenden, um die Anzahl der Einzelhändler im Land zu addieren, (1) die in einem bestimmten Postleitzahlbereich wohnen, und (2) deren Gewinne einen bestimmten Wert überschreiten.",
		abstract: "Mit der Funktion SUMMEWENNS, einer der mathematischen und trigonometrischen Funktionen , werden alle Argumente addiert, die mehrere Kriterien erfüllen. Beispielsweise würden Sie SUMMEWENNS verwenden, um die Anzahl der Einzelhändler im Land zu addieren, (1) die in einem bestimmten Postleitzahlbereich wohnen, und (2) deren Gewinne einen bestimmten Wert überschreiten.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/sumifs-function"
		}],
		functionParameter: {
			sumRange: {
				name: "sum_range",
				detail: "Der zu addierende Zellbereich."
			},
			criteriaRange1: {
				name: "criteria_range1",
				detail: "Der Bereich, der mit Criteria1 getestet wird. Criteria_range1 und Criteria1 richten ein Suchpaar ein, bei dem ein Bereich nach bestimmten Kriterien durchsucht wird. Sobald Elemente im Bereich gefunden wurden, werden die entsprechenden Werte in Sum_range hinzugefügt."
			},
			criteria1: {
				name: "criteria1",
				detail: "Die Kriterien, die definieren, welche Zellen in Criteria_range1 hinzugefügt werden. Beispielsweise können Kriterien als 32 , \">32\" , B4 , \"Äpfel\" oder \"32\" eingegeben werden."
			},
			criteriaRange2: {
				name: "criteriaRange2",
				detail: "Zusätzliche Bereiche und zugehörige Kriterien. Sie können bis zu 127 Bereich/Kriterien-Paare eingeben."
			},
			criteria2: {
				name: "criteria2",
				detail: "Zusätzliche Bereiche und zugehörige Kriterien. Sie können bis zu 127 Bereich/Kriterien-Paare eingeben."
			}
		}
	},
	SUMPRODUCT: {
		description: "Die FUNKTION SUMMENPRODUKT gibt die Summe der Produkte der entsprechenden Bereiche oder Arrays zurück. Der Standardvorgang ist Multiplikation, aber auch Addition, Subtraktion und Division sind möglich.",
		abstract: "Die FUNKTION SUMMENPRODUKT gibt die Summe der Produkte der entsprechenden Bereiche oder Arrays zurück. Der Standardvorgang ist Multiplikation, aber auch Addition, Subtraktion und Division sind möglich.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/sumproduct-function"
		}],
		functionParameter: {
			array1: {
				name: "array",
				detail: "Das erste Arrayargument, dessen Komponenten Sie multiplizieren und anschließend addieren möchten"
			},
			array2: {
				name: "array",
				detail: "2 bis 255 Arrayargumente, deren Komponenten Sie multiplizieren und anschließend addieren möchten"
			}
		}
	},
	SUMSQ: {
		description: "Summiert die quadrierten Argumente.",
		abstract: "Summiert die quadrierten Argumente.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/sumsq-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Nummer1 ist erforderlich. Nachfolgende Zahlen sind optional. Es kann bis zu 255 Argumente geben, für die Sie die Summe der Quadrate verwenden möchten."
			},
			number2: {
				name: "number2",
				detail: "Nummer1 ist erforderlich. Nachfolgende Zahlen sind optional. Es kann bis zu 255 Argumente geben, für die Sie die Summe der Quadrate verwenden möchten."
			}
		}
	},
	SUMX2MY2: {
		description: "Diese Excel-Funktion gibt die Summe der Differenz der Quadrate der entsprechenden Werte in zwei Arrays zurück.",
		abstract: "Diese Excel-Funktion gibt die Summe der Differenz der Quadrate der entsprechenden Werte in zwei Arrays zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/sumx2my2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "array_x",
				detail: "Erforderlich. Die erste Matrix oder der erste Wertebereich"
			},
			arrayY: {
				name: "array_y",
				detail: "Erforderlich. Die zweite Matrix oder der zweite Wertebereich"
			}
		}
	},
	SUMX2PY2: {
		description: "Summiert für zusammengehörige Komponenten zweier Matrizen die Summen der Quadrate. Die Gesamtsumme aus der Summe von Quadratzahlen ist ein Ausdruck, der häufig in statistischen Berechnungen verwendet wird.",
		abstract: "Summiert für zusammengehörige Komponenten zweier Matrizen die Summen der Quadrate. Die Gesamtsumme aus der Summe von Quadratzahlen ist ein Ausdruck, der häufig in statistischen Berechnungen verwendet wird.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/sumx2py2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "array_x",
				detail: "Erforderlich. Die erste Matrix oder der erste Wertebereich"
			},
			arrayY: {
				name: "array_y",
				detail: "Erforderlich. Die zweite Matrix oder der zweite Wertebereich"
			}
		}
	},
	SUMXMY2: {
		description: "Die SUMXMY2-Funktion gibt die Summe der Quadrate der Unterschiede der entsprechenden Werte in zwei Arrays zurück.",
		abstract: "Die SUMXMY2-Funktion gibt die Summe der Quadrate der Unterschiede der entsprechenden Werte in zwei Arrays zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/sumxmy2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "array_x",
				detail: "Das erste Array oder der erste Wertebereich. Erforderlich."
			},
			arrayY: {
				name: "array_y",
				detail: "Das zweite Array oder wertebereich. Erforderlich."
			}
		}
	},
	TAN: {
		description: "Gibt den Tangens einer Zahl zurück.",
		abstract: "Gibt den Tangens einer Zahl zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/tan-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich. Der Winkel im Bogenmaß, für den Sie den Tangens ermitteln möchten"
		} }
	},
	TANH: {
		description: "Gibt den hyperbolischen Tangens einer Zahl zurück.",
		abstract: "Gibt den hyperbolischen Tangens einer Zahl zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/tanh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich. Eine beliebige reelle Zahl"
		} }
	},
	TRUNC: {
		description: "Die TRUNC-Funktionen kürzen eine Zahl auf eine ganze Zahl ab, indem der Bruchteil der Zahl entfernt wird.",
		abstract: "Die TRUNC-Funktionen kürzen eine Zahl auf eine ganze Zahl ab, indem der Bruchteil der Zahl entfernt wird.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/trunc-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Die Zahl, deren Stellen Sie abschneiden möchten."
			},
			numDigits: {
				name: "num_digits",
				detail: "Optional. Eine Zahl, die angibt, wie viele Nachkommastellen erhalten bleiben sollen. Der Standardwert für \"Anzahl_Stellen\" ist 0 (null)."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/statistical/de-DE.ts
const locale$4 = {
	AVEDEV: {
		description: "Gibt die durchschnittliche absolute Abweichung einer Reihe von Merkmalsausprägungen und ihrem Mittelwert zurück. MITTELABW ist ein Maß für die Streuung innerhalb einer Datengruppe.",
		abstract: "Gibt die durchschnittliche absolute Abweichung einer Reihe von Merkmalsausprägungen und ihrem Mittelwert zurück. MITTELABW ist ein Maß für die Streuung innerhalb einer Datengruppe.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/avedev-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Zahl1 ist erforderlich, nachfolgende Nummern sind optional. 1 bis 255 Argumente, für die Sie den Durchschnitt der absoluten Abweichungen verwenden möchten. Anstelle der durch Semikolons voneinander getrennten Argumente können Sie auch eine Matrix oder einen Bezug auf eine Matrix angeben."
			},
			number2: {
				name: "number2",
				detail: "Zahl1 ist erforderlich, nachfolgende Nummern sind optional. 1 bis 255 Argumente, für die Sie den Durchschnitt der absoluten Abweichungen verwenden möchten. Anstelle der durch Semikolons voneinander getrennten Argumente können Sie auch eine Matrix oder einen Bezug auf eine Matrix angeben."
			}
		}
	},
	AVERAGE: {
		description: "Gibt den Mittelwert (arithmetisches Mittel) der Argumente zurück. Wenn beispielsweise der Bereich A1:A20 Zahlen enthält, gibt die Formel =MITTELWERT(A1:A20) den Mittelwert dieser Zahlen zurück.",
		abstract: "Gibt den Mittelwert (arithmetisches Mittel) der Argumente zurück. Wenn beispielsweise der Bereich A1:A20 Zahlen enthält, gibt die Formel =MITTELWERT(A1:A20) den Mittelwert dieser Zahlen zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/average-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Erforderlich. Die erste Zahl, der Zellbezug oder der erste Bereich, für den Sie den Durchschnitt verwenden möchten."
			},
			number2: {
				name: "number2",
				detail: "Optional. Bis zu 255 zusätzliche Zahlen, Zellbezüge oder Bereiche, für die Sie den Mittelwert berechnen möchten."
			}
		}
	},
	AVERAGE_WEIGHTED: {
		description: "Die Funktion AVERAGE.WEIGHTED berechnet den gewichteten Mittelwert einer Wertemenge anhand der Werte und ihrer jeweiligen Gewichtungen.",
		abstract: "Die Funktion AVERAGE.WEIGHTED berechnet den gewichteten Mittelwert einer Wertemenge anhand der Werte und ihrer jeweiligen Gewichtungen.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9084098?hl=de"
		}],
		functionParameter: {
			values: {
				name: "Werte",
				detail: "Die Werte, deren Mittelwert berechnet werden soll. Dies kann ein Zellbereich oder eine Liste von Werten sein."
			},
			weights: {
				name: "Gewichtungen",
				detail: "Die entsprechende Liste der anzuwendenden Gewichtungen. Gewichtungen dürfen null, aber nicht negativ sein; mindestens eine Gewichtung muss positiv sein. Ein Zellbereich muss dieselbe Anzahl von Zeilen und Spalten wie der Wertebereich haben."
			},
			additionalValues: {
				name: "zusätzliche_Werte",
				detail: "Weitere optionale Werte, deren Mittelwert berechnet werden soll."
			},
			additionalWeights: {
				name: "zusätzliche_Gewichtungen",
				detail: "Weitere optionale Gewichtungen. Auf jeden zusätzlichen_Wert muss genau eine zusätzliche_Gewichtung folgen."
			}
		}
	},
	AVERAGEA: {
		description: "Berechnet den Mittelwert (arithmetisches Mittel) der Werte in der Liste der Argumente.",
		abstract: "Berechnet den Mittelwert (arithmetisches Mittel) der Werte in der Liste der Argumente.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/averagea-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Wert1 ist erforderlich, nachfolgende Werte sind optional. 1 bis 255 Zellen, Zellbereiche oder Werte, für die Sie den Durchschnitt verwenden möchten."
			},
			value2: {
				name: "value2",
				detail: "Wert1 ist erforderlich, nachfolgende Werte sind optional. 1 bis 255 Zellen, Zellbereiche oder Werte, für die Sie den Durchschnitt verwenden möchten."
			}
		}
	},
	AVERAGEIF: {
		description: "Gibt den Durchschnittswert (arithmetisches Mittel) für alle Zellen eines Bereichs zurück, die einem angegebenen Kriterium entsprechen.",
		abstract: "Gibt den Durchschnittswert (arithmetisches Mittel) für alle Zellen eines Bereichs zurück, die einem angegebenen Kriterium entsprechen.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/averageif-function"
		}],
		functionParameter: {
			range: {
				name: "range",
				detail: "Erforderlich. Der Bereich der Zellen, für die der Mittelwert berechnet werden soll, einschließlich Zahlen, Namen, Arrays oder Bezügen, die Zahlen enthalten."
			},
			criteria: {
				name: "criteria",
				detail: "Erforderlich. Die Kriterien in Form einer Zahl, eines Ausdrucks, eines Zellbezugs oder eines Texts, mit denen definiert wird, für welche Zellen der Mittelwert berechnet werden soll. Kriterien können beispielsweise als 32, \"32\", \">32\", \"Äpfel\" oder B4 ausgedrückt werden."
			},
			averageRange: {
				name: "average_range",
				detail: "Optional. Der tatsächliche Bereich der Zellen, für die der Mittelwert berechnet wird. Fehlt diese Argument, wird \"Bereich\" verwendet."
			}
		}
	},
	AVERAGEIFS: {
		description: "Gibt den Durchschnittswert (arithmetisches Mittel) aller Zellen zurück, die mehreren Kriterien entsprechen.",
		abstract: "Gibt den Durchschnittswert (arithmetisches Mittel) aller Zellen zurück, die mehreren Kriterien entsprechen.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/averageifs-function"
		}],
		functionParameter: {
			averageRange: {
				name: "average_range",
				detail: "Erforderlich. Der Bereich der Zellen, für die der Mittelwert berechnet werden soll, einschließlich Zahlen, Namen, Arrays oder Bezügen, die Zahlen enthalten."
			},
			criteriaRange1: {
				name: "criteria_range1",
				detail: "\"Kriterien_Bereich1\" ist erforderlich, weitere Kriterienbereiche sind optional. 1 bis 127 Bereiche, für die die zugeordneten Kriterien ausgewertet werden sollen."
			},
			criteria1: {
				name: "criteria1",
				detail: "Criteria1 ist erforderlich, nachfolgende Kriterien sind optional. 1 bis 127 Kriterien in Form einer Zahl, eines Ausdrucks, eines Zellbezugs oder eines Texts, mit denen definiert wird, für welche Zellen der Mittelwert berechnet werden soll. Kriterien können beispielsweise als 32, \"32\", \">32\", \"Äpfel\" oder B4 ausgedrückt werden."
			},
			criteriaRange2: {
				name: "criteria_range2",
				detail: "\"Kriterien_Bereich1\" ist erforderlich, weitere Kriterienbereiche sind optional. 1 bis 127 Bereiche, für die die zugeordneten Kriterien ausgewertet werden sollen."
			},
			criteria2: {
				name: "criteria2",
				detail: "Criteria1 ist erforderlich, nachfolgende Kriterien sind optional. 1 bis 127 Kriterien in Form einer Zahl, eines Ausdrucks, eines Zellbezugs oder eines Texts, mit denen definiert wird, für welche Zellen der Mittelwert berechnet werden soll. Kriterien können beispielsweise als 32, \"32\", \">32\", \"Äpfel\" oder B4 ausgedrückt werden."
			}
		}
	},
	BETA_DIST: {
		description: "Die Betaverteilung wird i. d. R. verwendet, um die Streuung bei mehreren Stichproben zu bestimmten Vorgängen zu untersuchen. Beispielsweise kann prozentual ermittelt werden, wie viel Zeit am Tag Personen vor dem Fernsehgerät verbringen.",
		abstract: "Die Betaverteilung wird i. d. R. verwendet, um die Streuung bei mehreren Stichproben zu bestimmten Vorgängen zu untersuchen. Beispielsweise kann prozentual ermittelt werden, wie viel Zeit am Tag Personen vor dem Fernsehgerät verbringen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/beta-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Erforderlich. Der Wert, an dem die Funktion im Intervall zwischen A und B ausgewertet werden soll."
			},
			alpha: {
				name: "alpha",
				detail: "Erforderlich. Ein Parameter der Verteilung."
			},
			beta: {
				name: "beta",
				detail: "Erforderlich. Ein Parameter der Verteilung."
			},
			cumulative: {
				name: "cumulative",
				detail: "Erforderlich. Ein logischer Wert, der die Form der Funktion bestimmt. Wenn kumulativ TRUE ist, BETA. DIST gibt die kumulierte Verteilungsfunktion zurück. Wenn FALSE, wird die Wahrscheinlichkeitsdichtefunktion zurückgegeben."
			},
			A: {
				name: "A",
				detail: "Eine untere Grenze des Intervalls für X."
			},
			B: {
				name: "B",
				detail: "Optional. Eine obere Grenze des Intervalls für X."
			}
		}
	},
	BETA_INV: {
		description: "Wenn Wahrscheinlichkeit = BETA.VERT(x;...WAHR) ist, dann ist BETA.INV(Wahrsch;...) = x. Die Betaverteilung kann für eine Projektplanung verwendet werden, um ausgehend von einem erwarteten Endtermin und der Streuung den wahrscheinlichen Endtermin zu modellieren.",
		abstract: "Wenn Wahrscheinlichkeit = BETA.VERT(x;...WAHR) ist, dann ist BETA.INV(Wahrsch;...) = x. Die Betaverteilung kann für eine Projektplanung verwendet werden, um ausgehend von einem erwarteten Endtermin und der Streuung den wahrscheinlichen Endtermin zu modellieren.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/beta-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Erforderlich. Die zur Betaverteilung gehörende Wahrscheinlichkeit."
			},
			alpha: {
				name: "alpha",
				detail: "Erforderlich. Ein Parameter der Verteilung."
			},
			beta: {
				name: "beta",
				detail: "Erforderlich. Ein Parameter der Verteilung."
			},
			A: {
				name: "A",
				detail: "Eine untere Grenze des Intervalls für X."
			},
			B: {
				name: "B",
				detail: "Optional. Eine obere Grenze des Intervalls für X."
			}
		}
	},
	BINOM_DIST: {
		description: "Gibt Wahrscheinlichkeiten einer binomialverteilten Zufallsvariablen zurück. Verwenden Sie BINOM.VERT bei Problemen mit einer festgelegten Anzahl von Tests oder Versuchen, wenn das Ergebnis jedes einzelnen Versuchs entweder Erfolg oder Misserfolg ist, die einzelnen Versuche voneinander unabhängig sind und die Wahrscheinlichkeit des Erfolgs für alle Versuche konstant ist. Mit BINOM.VERT lässt sich beispielsweise die Wahrscheinlichkeit ermitteln, mit der zwei von drei Neugeborenen männlich sind.",
		abstract: "Gibt Wahrscheinlichkeiten einer binomialverteilten Zufallsvariablen zurück. Verwenden Sie BINOM.VERT bei Problemen mit einer festgelegten Anzahl von Tests oder Versuchen, wenn das Ergebnis jedes einzelnen Versuchs entweder Erfolg oder Misserfolg ist, die einzelnen Versuche voneinander unabhängig sind und die Wahrscheinlichkeit des Erfolgs für alle Versuche konstant ist. Mit BINOM.VERT lässt sich beispielsweise die Wahrscheinlichkeit ermitteln, mit der zwei von drei Neugeborenen männlich sind.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/binom-dist-function"
		}],
		functionParameter: {
			numberS: {
				name: "number_s",
				detail: "Erforderlich. Die Anzahl der Erfolge in einer Versuchsreihe."
			},
			trials: {
				name: "trials",
				detail: "Erforderlich. Die Anzahl der voneinander unabhängigen Versuche."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Erforderlich. Die Wahrscheinlichkeit eines Erfolgs für jeden Versuch."
			},
			cumulative: {
				name: "cumulative",
				detail: "Erforderlich. Ein logischer Wert, der die Form der Funktion bestimmt. Wenn kumulativ TRUE ist, dann BINOM. DIST gibt die kumulierte Verteilungsfunktion zurück, also die Wahrscheinlichkeit, dass es höchstens number_s Erfolge gibt; False gibt die Wahrscheinlichkeits-Massenfunktion zurück, d. h. die Wahrscheinlichkeit, dass es number_s Erfolge gibt."
			}
		}
	},
	BINOM_DIST_RANGE: {
		description: "Gibt die Erfolgswahrscheinlichkeit eines Versuchsergebnisses als Binomialverteilung zurück.",
		abstract: "Gibt die Erfolgswahrscheinlichkeit eines Versuchsergebnisses als Binomialverteilung zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/binom-dist-range-function"
		}],
		functionParameter: {
			trials: {
				name: "trials",
				detail: "Erforderlich. Die Anzahl von unabhängigen Versuchen. Muss größer gleich 0 sein."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Erforderlich. Die Wahrscheinlichkeit eines Erfolgs in jedem Versuch. Muss größer gleich 0 und kleiner gleich 1 sein."
			},
			numberS: {
				name: "number_s",
				detail: "Erforderlich. Die Anzahl von Erfolgen in Versuchen. Muss größer gleich 0 und kleiner gleich \"Versuche\" sein."
			},
			numberS2: {
				name: "number_s2",
				detail: "Optional. Gibt bei Angabe die Wahrscheinlichkeit zurück, dass die Anzahl der erfolgreichen Testversionen zwischen Number_s und number_s2 liegt. Muss größer oder gleich Number_s und kleiner oder gleich Testversionen sein."
			}
		}
	},
	BINOM_INV: {
		description: "Gibt den kleinsten Wert zurück, für den die kumulierten Wahrscheinlichkeiten der Binomialverteilung größer oder gleich einer Grenzwahrscheinlichkeit sind.",
		abstract: "Gibt den kleinsten Wert zurück, für den die kumulierten Wahrscheinlichkeiten der Binomialverteilung größer oder gleich einer Grenzwahrscheinlichkeit sind.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/binom-inv-function"
		}],
		functionParameter: {
			trials: {
				name: "trials",
				detail: "Erforderlich. Die Anzahl der Bernoulliexperimente."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Erforderlich. Die Wahrscheinlichkeit eines Erfolgs für jeden Versuch."
			},
			alpha: {
				name: "alpha",
				detail: "Erforderlich. Die Grenzwahrscheinlichkeit."
			}
		}
	},
	CHISQ_DIST: {
		description: "Gibt die Chi-Quadrat-Verteilung zurück.",
		abstract: "Gibt die Chi-Quadrat-Verteilung zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/chisq-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Erforderlich. Der Wert, dessen Wahrscheinlichkeit berechnet werden soll."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Erforderlich. Die Anzahl der Freiheitsgrade."
			},
			cumulative: {
				name: "cumulative",
				detail: "Erforderlich. Ein logischer Wert, der die Form der Funktion bestimmt. Wenn kumulativ TRUE ist, CHISQ. DIST gibt die kumulierte Verteilungsfunktion zurück. Wenn FALSE, wird die Wahrscheinlichkeitsdichtefunktion zurückgegeben."
			}
		}
	},
	CHISQ_DIST_RT: {
		description: "Die χ2-Verteilung wird bei einem χ2-Test benötigt. Mit dem χ2-Test lassen sich beobachtete und erwartete Werte miteinander vergleichen. So wird beispielsweise in einem genetischen Experiment die Hypothese aufgestellt, dass die nächste Pflanzengeneration eine bestimmte Farbzusammensetzung aufweist. Durch Vergleich der beobachteten mit den erwarteten Ergebnissen lässt sich die Hypothese validieren.",
		abstract: "Die χ2-Verteilung wird bei einem χ2-Test benötigt. Mit dem χ2-Test lassen sich beobachtete und erwartete Werte miteinander vergleichen. So wird beispielsweise in einem genetischen Experiment die Hypothese aufgestellt, dass die nächste Pflanzengeneration eine bestimmte Farbzusammensetzung aufweist. Durch Vergleich der beobachteten mit den erwarteten Ergebnissen lässt sich die Hypothese validieren.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/chisq-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Erforderlich. Der Wert, dessen Wahrscheinlichkeit berechnet werden soll."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Erforderlich. Die Anzahl der Freiheitsgrade."
			}
		}
	},
	CHISQ_INV: {
		description: "Gibt die Werte der Verteilungsfunktion einer Chi-Quadrat-verteilten Zufallsvariablen zurück. Die Betaverteilung wird i. d. R. verwendet, um die Streuung bei mehreren Stichproben zu bestimmten Vorgängen zu untersuchen. Beispielsweise kann prozentual ermittelt werden, wie viel Zeit am Tag Personen vor dem Fernsehgerät verbringen.",
		abstract: "Gibt die Werte der Verteilungsfunktion einer Chi-Quadrat-verteilten Zufallsvariablen zurück. Die Betaverteilung wird i. d. R. verwendet, um die Streuung bei mehreren Stichproben zu bestimmten Vorgängen zu untersuchen. Beispielsweise kann prozentual ermittelt werden, wie viel Zeit am Tag Personen vor dem Fernsehgerät verbringen.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/chisq-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Erforderlich. Die zur Chi-Quadrat-Verteilung gehörende Wahrscheinlichkeit."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Erforderlich. Die Anzahl der Freiheitsgrade."
			}
		}
	},
	CHISQ_INV_RT: {
		description: "Ist Wahrsch = CHIQU.VERT.RE(x;...) gegeben, dann gilt CHIQU.INV.RE(Wahrsch;...) = x. Mithilfe dieser Funktion lassen sich zum Zweck der Validierung von Hypothesen beobachtete und erwartete Ergebnisse miteinander vergleichen.",
		abstract: "Ist Wahrsch = CHIQU.VERT.RE(x;...) gegeben, dann gilt CHIQU.INV.RE(Wahrsch;...) = x. Mithilfe dieser Funktion lassen sich zum Zweck der Validierung von Hypothesen beobachtete und erwartete Ergebnisse miteinander vergleichen.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/chisq-inv-rt-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Erforderlich. Die zur Chi-Quadrat-Verteilung gehörende Wahrscheinlichkeit."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Erforderlich. Die Anzahl der Freiheitsgrade."
			}
		}
	},
	CHISQ_TEST: {
		description: "Liefert die Teststatistik eines Unabhängigkeitstests. CHIQU.TEST gibt den Wert der chi-quadrierten (χ2)-Verteilung für die Teststatistik mit den entsprechenden Freiheitsgraden zurück. Mithilfe von χ2-Tests können Sie feststellen, ob in Experimenten die Ergebnisse bestätigt werden, die aufgrund von Hypothesen erwartet wurden.",
		abstract: "Liefert die Teststatistik eines Unabhängigkeitstests. CHIQU.TEST gibt den Wert der chi-quadrierten (χ2)-Verteilung für die Teststatistik mit den entsprechenden Freiheitsgraden zurück. Mithilfe von χ2-Tests können Sie feststellen, ob in Experimenten die Ergebnisse bestätigt werden, die aufgrund von Hypothesen erwartet wurden.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/chisq-test-function"
		}],
		functionParameter: {
			actualRange: {
				name: "actual_range",
				detail: "Erforderlich. Der Bereich beobachteter Daten, mit dem Sie die erwarteten Werte testen möchten."
			},
			expectedRange: {
				name: "expected_range",
				detail: "Erforderlich. Der Bereich erwarteter Beobachtungen, die sich aus der Division der miteinander multiplizierten Rangsummen und der Gesamtsumme berechnen lassen."
			}
		}
	},
	CONFIDENCE_NORM: {
		description: "Das Konfidenzintervall ist ein Wertebereich. Ihr Stichprobenmittelwert x befindet sich in der Mitte dieses Bereichs, und der Bereich ist x ± CONFIDENCE.NORM. Wenn z. B. x der Stichprobenmittelwert der Lieferzeiten für Produkte ist, die per Post bestellt wurden, ± X KONFIDENZ. NORM ist ein Bereich von Bevölkerungsmitteln. Bei jedem Populationsmittel μ0 in diesem Bereich ist die Wahrscheinlichkeit, einen Probenmittelwert zu erhalten, der weiter von μ0 als x liegt, größer als alpha; für jeden Populationsmittelwert μ0, der sich nicht in diesem Bereich befindet, ist die Wahrscheinlichkeit, einen Stichprobenmittelwert zu erhalten, der weiter von μ0 als x liegt, kleiner als alpha. Anders ausgedrückt: Angenommen, wir verwenden x, standard_dev und size, um einen zweiseitigen Test auf Signifikanzebene alpha der Hypothese zu erstellen, dass der Grundgesamtheitsmittel μ0 ist. Dann werden wir diese Hypothese nicht ablehnen, wenn μ0 im Konfidenzintervall liegt, und diese Hypothese wird abgelehnt, wenn μ0 nicht im Konfidenzintervall liegt. Das Konfidenzintervall lässt nicht zu, dass die Wahrscheinlichkeit 1 – Alpha besteht, dass das nächste Paket eine Lieferzeit im Konfidenzintervall nimmt.",
		abstract: "Das Konfidenzintervall ist ein Wertebereich. Ihr Stichprobenmittelwert x befindet sich in der Mitte dieses Bereichs, und der Bereich ist x ± CONFIDENCE.NORM. Wenn z. B. x der Stichprobenmittelwert der Lieferzeiten für Produkte ist, die per Post bestellt wurden, ± X KONFIDENZ. NORM ist ein Bereich von Bevölkerungsmitteln. Bei jedem Populationsmittel μ0 in diesem Bereich ist die Wahrscheinlichkeit, einen Probenmittelwert zu erhalten, der weiter von μ0 als x liegt, größer als alpha; für jeden Populationsmittelwert μ0, der sich nicht in diesem Bereich befindet, ist die Wahrscheinlichkeit, einen Stichprobenmittelwert zu erhalten, der weiter von μ0 als x liegt, kleiner als alpha. Anders ausgedrückt: Angenommen, wir verwenden x, standard_dev und size, um einen zweiseitigen Test auf Signifikanzebene alpha der Hypothese zu erstellen, dass der Grundgesamtheitsmittel μ0 ist. Dann werden wir diese Hypothese nicht ablehnen, wenn μ0 im Konfidenzintervall liegt, und diese Hypothese wird abgelehnt, wenn μ0 nicht im Konfidenzintervall liegt. Das Konfidenzintervall lässt nicht zu, dass die Wahrscheinlichkeit 1 – Alpha besteht, dass das nächste Paket eine Lieferzeit im Konfidenzintervall nimmt.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/confidence-norm-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "Erforderlich. Die Irrtumswahrscheinlichkeit bei der Berechnung des Konfidenzintervalls. Das Konfidenzintervall ist gleich 100*(1 - Alpha)%, was bedeutet, dass ein Wert für Alpha von 0,05 einem Konfidenzniveau von 95% entspricht."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Erforderlich. Die als bekannt angenommene Standardabweichung der Grundgesamtheit."
			},
			size: {
				name: "size",
				detail: "Erforderlich. Der Umfang der Stichprobe."
			}
		}
	},
	CONFIDENCE_T: {
		description: "Gibt das Konfidenzintervall für den Erwartungswert einer Zufallsvariablen zurück, wobei der Studentsche T-Test verwendet wird",
		abstract: "Gibt das Konfidenzintervall für den Erwartungswert einer Zufallsvariablen zurück, wobei der Studentsche T-Test verwendet wird",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/confidence-t-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "Erforderlich. Die Irrtumswahrscheinlichkeit bei der Berechnung des Konfidenzintervalls. Das Konfidenzintervall ist gleich 100*(1 - Alpha)%, was bedeutet, dass ein Wert für Alpha von 0,05 einem Konfidenzniveau von 95% entspricht."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Erforderlich. Die als bekannt angenommene Standardabweichung der Grundgesamtheit."
			},
			size: {
				name: "size",
				detail: "Erforderlich. Der Umfang der Stichprobe."
			}
		}
	},
	CORREL: {
		description: "Die CORREL-Funktion gibt den Korrelationskoeffizient von zwei Zellbereichen zurück. Mithilfe des Korrelationskoeffizienten lässt sich feststellen, ob es eine Beziehung zwischen zwei Eigenschaften gibt. Sie können beispielsweise die Beziehung zwischen der Durchschnittstemperatur eines Orts und dem Einsatz von Klimaanlagen untersuchen.",
		abstract: "Die CORREL-Funktion gibt den Korrelationskoeffizient von zwei Zellbereichen zurück. Mithilfe des Korrelationskoeffizienten lässt sich feststellen, ob es eine Beziehung zwischen zwei Eigenschaften gibt. Sie können beispielsweise die Beziehung zwischen der Durchschnittstemperatur eines Orts und dem Einsatz von Klimaanlagen untersuchen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/correl-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Erforderlich. Ein Zellwertbereich."
			},
			array2: {
				name: "array2",
				detail: "Erforderlich. Ein zweiter Zellwertbereich."
			}
		}
	},
	COUNT: {
		description: "Die Funktion ANZAHL zählt die Zellen, die Zahlen enthalten, sowie Zahlen innerhalb der Liste mit Argumenten. Mithilfe der Funktion ANZAHL können Sie die Anzahl der Einträge in einem Zahlenfeld ermitteln, das sich in einem Bereich oder einer Matrix von Zahlen befindet. Sie können beispielsweise die folgende Formel zum Zählen der Zahlen im Bereich A1:A20 eingeben: =ANZAHL(A1:A20) . Wenn in diesem Beispiel fünf der Zellen im Bereich Zahlen enthalten, lautet das Ergebnis 5 .",
		abstract: "Die Funktion ANZAHL zählt die Zellen, die Zahlen enthalten, sowie Zahlen innerhalb der Liste mit Argumenten. Mithilfe der Funktion ANZAHL können Sie die Anzahl der Einträge in einem Zahlenfeld ermitteln, das sich in einem Bereich oder einer Matrix von Zahlen befindet. Sie können beispielsweise die folgende Formel zum Zählen der Zahlen im Bereich A1:A20 eingeben: =ANZAHL(A1:A20) . Wenn in diesem Beispiel fünf der Zellen im Bereich Zahlen enthalten, lautet das Ergebnis 5 .",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/count-function"
		}],
		functionParameter: {
			value1: {
				name: "value 1",
				detail: "Erforderlich. Das erste Element, der Zellbezug oder der Bereich, in dem Zahlen ermittelt werden sollen."
			},
			value2: {
				name: "value 2",
				detail: "Optional. Bis zu 255 zusätzliche Elemente, Zellbezüge oder Bereiche, in denen Zahlen ermittelt werden sollen."
			}
		}
	},
	COUNTA: {
		description: "Die FUNKTION COUNTA zählt die Anzahl der Zellen, die in einem Bereich nicht leer sind.",
		abstract: "Die FUNKTION COUNTA zählt die Anzahl der Zellen, die in einem Bereich nicht leer sind.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/counta-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Wert1 ist erforderlich, nachfolgende Werte sind optional. 1 bis 255 Zellen, Zellbereiche oder Werte, für die Sie den Durchschnitt verwenden möchten."
			},
			value2: {
				name: "value2",
				detail: "Wert1 ist erforderlich, nachfolgende Werte sind optional. 1 bis 255 Zellen, Zellbereiche oder Werte, für die Sie den Durchschnitt verwenden möchten."
			}
		}
	},
	COUNTBLANK: {
		description: "Verwenden Sie die Funktion COUNTBLANK , eine der Statistischen Funktionen, um die Anzahl leerer Zellen in einem Zellbereich zu zählen.",
		abstract: "Verwenden Sie die Funktion COUNTBLANK , eine der Statistischen Funktionen, um die Anzahl leerer Zellen in einem Zellbereich zu zählen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/countblank-function"
		}],
		functionParameter: { range: {
			name: "range",
			detail: "Erforderlich. Der Bereich, von dem Sie wissen möchten, wie viele seiner Zellen leer sind."
		} }
	},
	COUNTIF: {
		description: "Verwenden Sie ZÄHLENWENN, eine der statistischen Funktionen , um die Anzahl der Zellen zu zählen, die ein Kriterium erfüllen; beispielsweise, um zu ermitteln, wie oft eine bestimmte Stadt in einer Kundenliste vorkommt.",
		abstract: "Verwenden Sie ZÄHLENWENN, eine der statistischen Funktionen , um die Anzahl der Zellen zu zählen, die ein Kriterium erfüllen; beispielsweise, um zu ermitteln, wie oft eine bestimmte Stadt in einer Kundenliste vorkommt.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/use-the-countif-function-in-microsoft-excel"
		}],
		functionParameter: {
			range: {
				name: "range",
				detail: "Die Gruppe von Zellen, die Sie zählen möchten. Bereich kann Zahlen, Arrays, einen benannten Bereich oder Bezüge enthalten, die Zahlen enthalten. Leere Werte und Textwerte werden ignoriert. Informationen zum Markieren von Bereichen auf einem Arbeitsblatt ."
			},
			criteria: {
				name: "criteria",
				detail: "Eine Zahl, ein Ausdruck, ein Zellbezug oder eine Textzeichenfolge, durch die bzw. den definiert wird, welche Zellen gezählt werden. Sie können beispielsweise eine Zahl wie 32, einen Vergleich wie \">32\", eine Zelle wie B4 oder ein Wort wie \"Äpfel\" verwenden. Für ZÄHLENWENN kann nur ein einzelnes Suchkriterium angegeben werden. Verwenden Sie ZÄHLENWENNS , wenn Sie mehrere Kriterien angeben möchten."
			}
		}
	},
	COUNTIFS: {
		description: "Die FUNKTION ZÄHLENWENNS wendet Kriterien auf Zellen in mehreren Bereichen an und zählt, wie oft alle Kriterien erfüllt sind.",
		abstract: "Die FUNKTION ZÄHLENWENNS wendet Kriterien auf Zellen in mehreren Bereichen an und zählt, wie oft alle Kriterien erfüllt sind.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/countifs-function"
		}],
		functionParameter: {
			criteriaRange1: {
				name: "criteria_range1",
				detail: "Erforderlich. Der erste Bereich, in dem die zugehörigen Kriterien ausgewertet werden sollen."
			},
			criteria1: {
				name: "criteria1",
				detail: "Erforderlich. Die Kriterien in Form einer Zahl, eines Ausdrucks, Zellbezugs oder Texts, mit denen definiert wird, welche Zellen gezählt werden. Kriterien können beispielsweise als 32, \">32\", B4, \"Äpfel\" oder \"32\" ausgedrückt werden."
			},
			criteriaRange2: {
				name: "criteria_range2",
				detail: "Optional. Zusätzliche Bereiche und deren zugehörige Kriterien. Es sind bis zu 127 Bereich/Kriterien-Paare zulässig."
			},
			criteria2: {
				name: "criteria2",
				detail: "Optional. Zusätzliche Bereiche und deren zugehörige Kriterien. Es sind bis zu 127 Bereich/Kriterien-Paare zulässig."
			}
		}
	},
	COVARIANCE_P: {
		description: "Gibt die Kovarianz der Grundgesamtheit zurück, den Durchschnitt der Produkte der Abweichungen für jedes Datenpunktpaar in zwei Datasets. Die Kovarianz gibt Auskunft darüber, welcher Zusammenhang zwischen zwei Datengruppen besteht. Beispielsweise können Sie ermitteln, ob ein größeres Einkommen Folge des jeweiligen Ausbindungsgrads ist.",
		abstract: "Gibt die Kovarianz der Grundgesamtheit zurück, den Durchschnitt der Produkte der Abweichungen für jedes Datenpunktpaar in zwei Datasets. Die Kovarianz gibt Auskunft darüber, welcher Zusammenhang zwischen zwei Datengruppen besteht. Beispielsweise können Sie ermitteln, ob ein größeres Einkommen Folge des jeweiligen Ausbindungsgrads ist.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/covariance-p-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Erforderlich. Der erste Zellbereich, dessen Zellen mit ganzen Zahlen belegt sind."
			},
			array2: {
				name: "array2",
				detail: "Erforderlich. Der zweite Zellbereich, dessen Zellen mit ganzen Zahlen belegt sind."
			}
		}
	},
	COVARIANCE_S: {
		description: "Gibt die Kovarianz einer Stichprobe zurück, d. h. den Mittelwert der für alle Datenpunktpaare gebildeten Produkte der Abweichungen",
		abstract: "Gibt die Kovarianz einer Stichprobe zurück, d. h. den Mittelwert der für alle Datenpunktpaare gebildeten Produkte der Abweichungen",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/covariance-s-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Erforderlich. Der erste Zellbereich, dessen Zellen mit ganzen Zahlen belegt sind."
			},
			array2: {
				name: "array2",
				detail: "Erforderlich. Der zweite Zellbereich, dessen Zellen mit ganzen Zahlen belegt sind."
			}
		}
	},
	DEVSQ: {
		description: "Gibt die Summe der quadrierten Abweichungen von Datenpunkten von deren Stichprobenmittelwert zurück.",
		abstract: "Gibt die Summe der quadrierten Abweichungen von Datenpunkten von deren Stichprobenmittelwert zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/devsq-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Zahl1 ist erforderlich, nachfolgende Nummern sind optional. 1 bis 255 Argumente, für die Sie die Summe der quadratischen Abweichungen berechnen möchten. Anstelle der durch Semikolons voneinander getrennten Argumente können Sie auch eine Matrix oder einen Bezug auf eine Matrix angeben."
			},
			number2: {
				name: "number2",
				detail: "Zahl1 ist erforderlich, nachfolgende Nummern sind optional. 1 bis 255 Argumente, für die Sie die Summe der quadratischen Abweichungen berechnen möchten. Anstelle der durch Semikolons voneinander getrennten Argumente können Sie auch eine Matrix oder einen Bezug auf eine Matrix angeben."
			}
		}
	},
	EXPON_DIST: {
		description: "Gibt Wahrscheinlichkeiten einer exponential verteilten Zufallsvariablen zurück. Mithilfe der EXPON.VERT-Funktion lassen sich Zeiträume zwischen Ereignissen modellieren, z. B. wie lange ein Geldautomat für die Ausgabe von Geld benötigt. Beispielsweise können Sie mit EXPON.VERT berechnen, wie wahrscheinlich es ist, dass dieser Vorgang eine Minute dauert.",
		abstract: "Gibt Wahrscheinlichkeiten einer exponential verteilten Zufallsvariablen zurück. Mithilfe der EXPON.VERT-Funktion lassen sich Zeiträume zwischen Ereignissen modellieren, z. B. wie lange ein Geldautomat für die Ausgabe von Geld benötigt. Beispielsweise können Sie mit EXPON.VERT berechnen, wie wahrscheinlich es ist, dass dieser Vorgang eine Minute dauert.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/expon-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Erforderlich. Der Wert für die Funktion"
			},
			lambda: {
				name: "lambda",
				detail: "Erforderlich. Der übergebene Wert"
			},
			cumulative: {
				name: "cumulative",
				detail: "Erforderlich. Ein logischer Wert, der angibt, welche Form der exponentiellen Funktion bereitgestellt werden soll. Wenn kumulativ TRUE ist, EXPON. DIST gibt die kumulierte Verteilungsfunktion zurück. Wenn FALSE, wird die Wahrscheinlichkeitsdichtefunktion zurückgegeben."
			}
		}
	},
	F_DIST: {
		description: "Gibt die F-Wahrscheinlichkeitsverteilung zurück. Mit dieser Funktion können Sie feststellen, ob zwei Datenmengen unterschiedlichen Streuungen unterliegen. Sie können z. B. die Testergebnisse von Männern und Frauen untersuchen, die das Gymnasium betreten, und feststellen, ob sich die Variabilität bei den Frauen von der bei den Männchen unterscheidet.",
		abstract: "Gibt die F-Wahrscheinlichkeitsverteilung zurück. Mit dieser Funktion können Sie feststellen, ob zwei Datenmengen unterschiedlichen Streuungen unterliegen. Sie können z. B. die Testergebnisse von Männern und Frauen untersuchen, die das Gymnasium betreten, und feststellen, ob sich die Variabilität bei den Frauen von der bei den Männchen unterscheidet.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/f-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Erforderlich. Der Wert, für den die Funktion ausgewertet werden soll"
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Erforderlich. Die Anzahl der Freiheitsgrade im Zähler"
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Erforderlich. Die Anzahl der Freiheitsgrade im Nenner"
			},
			cumulative: {
				name: "cumulative",
				detail: "Erforderlich. Ein logischer Wert, der die Form der Funktion bestimmt. Wenn kumuliert TRUE ist, gibt F.DIST die kumulierte Verteilungsfunktion zurück. Wenn FALSE, wird die Wahrscheinlichkeitsdichtefunktion zurückgegeben."
			}
		}
	},
	F_DIST_RT: {
		description: "Gibt Werte der Verteilungsfunktion (1-Alpha) einer (rechtsseitigen) F-verteilten Zufallsvariablen zurück. Mit dieser Funktion können Sie feststellen, ob zwei Datenmengen unterschiedlichen Streuungen unterliegen. Beispielsweise können Sie die Punktzahlen untersuchen, die Männer und Frauen bei einem Einstellungstest erzielt haben, und ermitteln, ob sich die für die Frauen gefundene Streuung von derjenigen der Männer unterscheidet.",
		abstract: "Gibt Werte der Verteilungsfunktion (1-Alpha) einer (rechtsseitigen) F-verteilten Zufallsvariablen zurück. Mit dieser Funktion können Sie feststellen, ob zwei Datenmengen unterschiedlichen Streuungen unterliegen. Beispielsweise können Sie die Punktzahlen untersuchen, die Männer und Frauen bei einem Einstellungstest erzielt haben, und ermitteln, ob sich die für die Frauen gefundene Streuung von derjenigen der Männer unterscheidet.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/f-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Erforderlich. Der Wert, für den die Funktion ausgewertet werden soll"
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Erforderlich. Die Anzahl der Freiheitsgrade im Zähler"
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Erforderlich. Die Anzahl der Freiheitsgrade im Nenner"
			}
		}
	},
	F_INV: {
		description: "Gibt Quantile der F-Verteilung zurück. Ist p = F.VERT(x,...), dann ist F.INV(p,...) = x. Die F-Verteilung kann in F-Tests verwendet werden, bei denen die Streuungen zweier Datenmengen ins Verhältnis gesetzt werden. Zum Beispiel können Sie die Verteilung der in den USA und Kanada erzielten Einkommen daraufhin analysieren, ob in den beiden Ländern ähnliche Einkommensverteilungen vorliegen.",
		abstract: "Gibt Quantile der F-Verteilung zurück. Ist p = F.VERT(x,...), dann ist F.INV(p,...) = x. Die F-Verteilung kann in F-Tests verwendet werden, bei denen die Streuungen zweier Datenmengen ins Verhältnis gesetzt werden. Zum Beispiel können Sie die Verteilung der in den USA und Kanada erzielten Einkommen daraufhin analysieren, ob in den beiden Ländern ähnliche Einkommensverteilungen vorliegen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/f-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Erforderlich. Die zur F-Verteilung gehörige Wahrscheinlichkeit"
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Erforderlich. Die Anzahl der Freiheitsgrade im Zähler"
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Erforderlich. Die Anzahl der Freiheitsgrade im Nenner"
			}
		}
	},
	F_INV_RT: {
		description: "Gibt Quantile der (rechtsseitigen) F-Verteilung zurück. Ist p = F.VERT.RE(x;...), dann ist F.INV.RE(p;...) = x. Die F-Verteilung kann in F-Tests verwendet werden, bei denen die Streuungen zweier Datenmengen ins Verhältnis gesetzt werden. Zum Beispiel können Sie die Verteilung der in den USA und Kanada erzielten Einkommen daraufhin analysieren, ob in den beiden Ländern ähnliche Einkommensverteilungen vorliegen.",
		abstract: "Gibt Quantile der (rechtsseitigen) F-Verteilung zurück. Ist p = F.VERT.RE(x;...), dann ist F.INV.RE(p;...) = x. Die F-Verteilung kann in F-Tests verwendet werden, bei denen die Streuungen zweier Datenmengen ins Verhältnis gesetzt werden. Zum Beispiel können Sie die Verteilung der in den USA und Kanada erzielten Einkommen daraufhin analysieren, ob in den beiden Ländern ähnliche Einkommensverteilungen vorliegen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/f-inv-rt-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Erforderlich. Die zur F-Verteilung gehörige Wahrscheinlichkeit"
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Erforderlich. Die Anzahl der Freiheitsgrade im Zähler"
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Erforderlich. Die Anzahl der Freiheitsgrade im Nenner"
			}
		}
	},
	F_TEST: {
		description: "Verwenden Sie diese Funktion, um zu bestimmen, ob zwei Stichproben unterschiedliche Varianzen aufweisen. Mit Testergebnissen von öffentlichen und privaten Schulen können Sie beispielsweise testen, ob diese Schulen unterschiedliche Stufen der Testbewertungsvielfalt aufweisen.",
		abstract: "Verwenden Sie diese Funktion, um zu bestimmen, ob zwei Stichproben unterschiedliche Varianzen aufweisen. Mit Testergebnissen von öffentlichen und privaten Schulen können Sie beispielsweise testen, ob diese Schulen unterschiedliche Stufen der Testbewertungsvielfalt aufweisen.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/f-test-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Erforderlich. Die erste Matrix oder der erste Wertebereich."
			},
			array2: {
				name: "array2",
				detail: "Erforderlich. Die zweite Matrix oder der zweite Wertebereich."
			}
		}
	},
	FISHER: {
		description: "Gibt die Fisher-Transformation für x zurück. Diese Transformation erzeugt eine Funktion, die normalverteilt ist und somit eine Schiefe von ungefähr Null besitzt. Mit dieser Funktion können Sie eine Hypothese bezüglich des Korrelationskoeffizienten prüfen.",
		abstract: "Gibt die Fisher-Transformation für x zurück. Diese Transformation erzeugt eine Funktion, die normalverteilt ist und somit eine Schiefe von ungefähr Null besitzt. Mit dieser Funktion können Sie eine Hypothese bezüglich des Korrelationskoeffizienten prüfen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/fisher-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Erforderlich. Ein numerischer Wert, für den Sie die Transformation durchführen möchten."
		} }
	},
	FISHERINV: {
		description: "Gibt die Umkehrung der Fisher-Transformation zurück. Mithilfe dieser Transformation können Sie die Korrelation zwischen Datenbereichen oder Matrizen untersuchen. Ist y = FISHER(x), dann ist FISHERINV(y) = x.",
		abstract: "Gibt die Umkehrung der Fisher-Transformation zurück. Mithilfe dieser Transformation können Sie die Korrelation zwischen Datenbereichen oder Matrizen untersuchen. Ist y = FISHER(x), dann ist FISHERINV(y) = x.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/fisherinv-function"
		}],
		functionParameter: { y: {
			name: "y",
			detail: "Erforderlich. Der Wert, dessen Transformation Sie umkehren möchten"
		} }
	},
	FORECAST: {
		description: "Berechnen oder Vorhersagen eines zukünftigen Werts mithilfe vorhandener Werte. Der Future-Wert ist ein y-Wert für einen bestimmten x-Wert. Die vorhandenen Werte sind bekannte x-Werte und y-Werte, und der zukünftige Wert wird mithilfe der linearen Regression vorhergesagt. Sie können diese Funktionen verwenden, um zukünftige Verkäufe, Bestandsanforderungen oder Verbrauchertrends vorherzusagen.",
		abstract: "Berechnen oder Vorhersagen eines zukünftigen Werts mithilfe vorhandener Werte. Der Future-Wert ist ein y-Wert für einen bestimmten x-Wert. Die vorhandenen Werte sind bekannte x-Werte und y-Werte, und der zukünftige Wert wird mithilfe der linearen Regression vorhergesagt. Sie können diese Funktionen verwenden, um zukünftige Verkäufe, Bestandsanforderungen oder Verbrauchertrends vorherzusagen.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/forecast-and-forecast-linear-functions"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Ja Der Datenpunkt, dessen Wert Sie schätzen möchten."
			},
			knownYs: {
				name: "known_y's",
				detail: "Ja Eine abhängige Matrix oder ein abhängiger Datenbereich."
			},
			knownXs: {
				name: "known_x's",
				detail: "Ja Eine unabhängige Matrix oder ein unabhängiger Datenbereich."
			}
		}
	},
	FORECAST_ETS: {
		description: "Berechnet oder prognostiziert einen zukünftigen Wert auf Grundlage vorhandener Werte mithilfe der AAA-Version des Exponential-Smoothing-Algorithmus (ETS).",
		abstract: "Berechnet oder prognostiziert einen zukünftigen Wert auf Grundlage vorhandener Werte mithilfe der AAA-Version des Exponential-Smoothing-Algorithmus (ETS).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/forecast-ets-function"
		}],
		functionParameter: {
			targetDate: {
				name: "Zieldatum",
				detail: "Der Datenpunkt, für den ein Wert vorhergesagt werden soll."
			},
			values: {
				name: "Werte",
				detail: "Die historischen Werte für die Prognose."
			},
			timeline: {
				name: "Zeitachse",
				detail: "Ein unabhängiger Bereich oder eine Matrix numerischer Datums- oder Zeitwerte mit konstantem Abstand."
			},
			seasonality: {
				name: "Saisonalität",
				detail: "Optional. Saisonlänge; 1 für automatische Erkennung und 0 für keine Saisonalität."
			},
			dataCompletion: {
				name: "Datenvervollständigung",
				detail: "Optional. 1 interpoliert fehlende Punkte, 0 behandelt sie als null."
			},
			aggregation: {
				name: "Aggregation",
				detail: "Optional. Ein Wert von 1 bis 7 legt die Aggregation doppelter Zeitstempel fest."
			}
		}
	},
	FORECAST_ETS_CONFINT: {
		description: "Gibt ein Konfidenzintervall für den prognostizierten Wert am angegebenen Zieltermin zurück.",
		abstract: "Gibt ein Konfidenzintervall für den prognostizierten Wert am angegebenen Zieltermin zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/forecast-ets-confint-function"
		}],
		functionParameter: {
			targetDate: {
				name: "Zieldatum",
				detail: "Der Datenpunkt, für den ein Wert vorhergesagt werden soll."
			},
			values: {
				name: "Werte",
				detail: "Die historischen Werte für die Prognose."
			},
			timeline: {
				name: "Zeitachse",
				detail: "Ein unabhängiger Bereich oder eine Matrix numerischer Datums- oder Zeitwerte mit konstantem Abstand."
			},
			confidenceLevel: {
				name: "Konfidenzniveau",
				detail: "Optional. Eine Zahl zwischen 0 und 1; Standardwert ist 0,95."
			},
			seasonality: {
				name: "Saisonalität",
				detail: "Optional. Saisonlänge; 1 für automatische Erkennung und 0 für keine Saisonalität."
			},
			dataCompletion: {
				name: "Datenvervollständigung",
				detail: "Optional. 1 interpoliert fehlende Punkte, 0 behandelt sie als null."
			},
			aggregation: {
				name: "Aggregation",
				detail: "Optional. Ein Wert von 1 bis 7 legt die Aggregation doppelter Zeitstempel fest."
			}
		}
	},
	FORECAST_ETS_SEASONALITY: {
		description: "Gibt die Länge des sich wiederholenden Musters zurück, das Excel für die angegebene Zeitreihe erkennt.",
		abstract: "Gibt die Länge des sich wiederholenden Musters zurück, das Excel für die angegebene Zeitreihe erkennt.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/forecast-ets-seasonality-function"
		}],
		functionParameter: {
			values: {
				name: "Werte",
				detail: "Die historischen Werte für die Prognose."
			},
			timeline: {
				name: "Zeitachse",
				detail: "Ein unabhängiger Bereich oder eine Matrix numerischer Datums- oder Zeitwerte mit konstantem Abstand."
			},
			dataCompletion: {
				name: "Datenvervollständigung",
				detail: "Optional. 1 interpoliert fehlende Punkte, 0 behandelt sie als null."
			},
			aggregation: {
				name: "Aggregation",
				detail: "Optional. Ein Wert von 1 bis 7 legt die Aggregation doppelter Zeitstempel fest."
			}
		}
	},
	FORECAST_ETS_STAT: {
		description: "Gibt einen statistischen Wert infolge von Zeitreihenprognosen zurück.",
		abstract: "Gibt einen statistischen Wert infolge von Zeitreihenprognosen zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/forecast-ets-stat-function"
		}],
		functionParameter: {
			values: {
				name: "Werte",
				detail: "Die historischen Werte für die Prognose."
			},
			timeline: {
				name: "Zeitachse",
				detail: "Ein unabhängiger Bereich oder eine Matrix numerischer Datums- oder Zeitwerte mit konstantem Abstand."
			},
			statisticType: {
				name: "Statistiktyp",
				detail: "Ein Wert von 1 bis 8 legt die zurückzugebende Prognosestatistik fest."
			},
			seasonality: {
				name: "Saisonalität",
				detail: "Optional. Saisonlänge; 1 für automatische Erkennung und 0 für keine Saisonalität."
			},
			dataCompletion: {
				name: "Datenvervollständigung",
				detail: "Optional. 1 interpoliert fehlende Punkte, 0 behandelt sie als null."
			},
			aggregation: {
				name: "Aggregation",
				detail: "Optional. Ein Wert von 1 bis 7 legt die Aggregation doppelter Zeitstempel fest."
			}
		}
	},
	FORECAST_LINEAR: {
		description: "Berechnen oder Vorhersagen eines zukünftigen Werts mithilfe vorhandener Werte. Der Future-Wert ist ein y-Wert für einen bestimmten x-Wert. Die vorhandenen Werte sind bekannte x-Werte und y-Werte, und der zukünftige Wert wird mithilfe der linearen Regression vorhergesagt. Sie können diese Funktionen verwenden, um zukünftige Verkäufe, Bestandsanforderungen oder Verbrauchertrends vorherzusagen.",
		abstract: "Berechnen oder Vorhersagen eines zukünftigen Werts mithilfe vorhandener Werte. Der Future-Wert ist ein y-Wert für einen bestimmten x-Wert. Die vorhandenen Werte sind bekannte x-Werte und y-Werte, und der zukünftige Wert wird mithilfe der linearen Regression vorhergesagt. Sie können diese Funktionen verwenden, um zukünftige Verkäufe, Bestandsanforderungen oder Verbrauchertrends vorherzusagen.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/forecast-and-forecast-linear-functions"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Ja Der Datenpunkt, dessen Wert Sie schätzen möchten."
			},
			knownYs: {
				name: "known_y's",
				detail: "Ja Eine abhängige Matrix oder ein abhängiger Datenbereich."
			},
			knownXs: {
				name: "known_x's",
				detail: "Ja Eine unabhängige Matrix oder ein unabhängiger Datenbereich."
			}
		}
	},
	FREQUENCY: {
		description: "Die Funktion HÄUFIGKEIT berechnet, wie oft Werte innerhalb eines Wertebereichs auftreten, und gibt dann ein vertikales Zahlenfeld zurück. Verwenden Sie HÄUFIGKEIT beispielsweise, um die Prüfungsergebnisse innerhalb bestimmter Ergebnisbereiche zu zählen. Da HÄUFIGKEIT eine Matrix zurückgibt, muss die Formel als Matrixformel eingegeben werden.",
		abstract: "Die Funktion HÄUFIGKEIT berechnet, wie oft Werte innerhalb eines Wertebereichs auftreten, und gibt dann ein vertikales Zahlenfeld zurück. Verwenden Sie HÄUFIGKEIT beispielsweise, um die Prüfungsergebnisse innerhalb bestimmter Ergebnisbereiche zu zählen. Da HÄUFIGKEIT eine Matrix zurückgibt, muss die Formel als Matrixformel eingegeben werden.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/frequency-function"
		}],
		functionParameter: {
			dataArray: {
				name: "data_array",
				detail: "Erforderlich. Entspricht einer Matrix von oder einem Bezug auf eine Wertemenge, deren Häufigkeiten Sie zählen möchten. Enthält \"Daten\" keine Werte (Zahlen), gibt HÄUFIGKEIT eine mit Nullen belegte Matrix zurück."
			},
			binsArray: {
				name: "bins_array",
				detail: "Erforderlich. Die als Matrix oder Bezug auf einen Zellbereich eingegebenen Intervallgrenzen, nach denen Sie die in \"Daten\" enthaltenen Werte einordnen möchten. Falls \"Klassen\" keine Werte enthält, gibt HÄUFIGKEIT die Anzahl der zu \"Daten\" gehörenden Elemente zurück."
			}
		}
	},
	GAMMA: {
		description: "Gibt den Wert der Gammafunktion zurück.",
		abstract: "Gibt den Wert der Gammafunktion zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/gamma-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich. Gibt eine Zahl zurück."
		} }
	},
	GAMMA_DIST: {
		description: "Gibt Wahrscheinlichkeiten einer gammaverteilten Zufallsvariablen zurück. Mit dieser Funktion können Sie Variablen untersuchen, die eine schiefe Verteilung besitzen. Die Gammaverteilung wird häufig bei Warteschlangenanalysen verwendet.",
		abstract: "Gibt Wahrscheinlichkeiten einer gammaverteilten Zufallsvariablen zurück. Mit dieser Funktion können Sie Variablen untersuchen, die eine schiefe Verteilung besitzen. Die Gammaverteilung wird häufig bei Warteschlangenanalysen verwendet.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/gamma-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Erforderlich. Der Wert, dessen Wahrscheinlichkeit berechnet werden soll."
			},
			alpha: {
				name: "alpha",
				detail: "Erforderlich. Ein Parameter der Verteilung"
			},
			beta: {
				name: "beta",
				detail: "Erforderlich. Ein Parameter der Verteilung. Wenn \"Beta\" = 1, gibt GAMMA.VERT die Standard-Gammaverteilung zurück."
			},
			cumulative: {
				name: "cumulative",
				detail: "Erforderlich. Ein logischer Wert, der die Form der Funktion bestimmt. Wenn kumulativ TRUE ist, GAMMA. DIST gibt die kumulierte Verteilungsfunktion zurück. Wenn FALSE, wird die Wahrscheinlichkeitsdichtefunktion zurückgegeben."
			}
		}
	},
	GAMMA_INV: {
		description: "Gibt Quantile der Gammaverteilung zurück. Gilt p = GAMMA.VERT(x;...), dann gilt GAMMA.INV(p;...) = x. Mit dieser Funktion können Sie eine Variable untersuchen, deren Verteilung eventuell schief ist.",
		abstract: "Gibt Quantile der Gammaverteilung zurück. Gilt p = GAMMA.VERT(x;...), dann gilt GAMMA.INV(p;...) = x. Mit dieser Funktion können Sie eine Variable untersuchen, deren Verteilung eventuell schief ist.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/gamma-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Erforderlich. Die zur Gammaverteilung gehörige Wahrscheinlichkeit"
			},
			alpha: {
				name: "alpha",
				detail: "Erforderlich. Ein Parameter der Verteilung"
			},
			beta: {
				name: "beta",
				detail: "Erforderlich. Ein Parameter der Verteilung. Wenn \"Beta\" = 1, gibt GAMMA.INV die Standard-Gammaverteilung zurück."
			}
		}
	},
	GAMMALN: {
		description: "Gibt den natürlichen Logarithmus der Gammafunktion zurück, Γ(x).",
		abstract: "Gibt den natürlichen Logarithmus der Gammafunktion zurück, Γ(x).",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/gammaln-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Erforderlich. Der Wert, für den GAMMALN berechnet werden soll."
		} }
	},
	GAMMALN_PRECISE: {
		description: "Gibt den natürlichen Logarithmus der Gammafunktion zurück, Γ(x).",
		abstract: "Gibt den natürlichen Logarithmus der Gammafunktion zurück, Γ(x).",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/gammaln-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Erforderlich. Der Wert, für den GAMMALN.GENAU berechnet werden soll."
		} }
	},
	GAUSS: {
		description: "Berechnet die Wahrscheinlichkeit, dass ein Element einer Standardgrundgesamtheit zwischen dem Mittelwert und z Standardabweichungen vom Mittelwert liegt.",
		abstract: "Berechnet die Wahrscheinlichkeit, dass ein Element einer Standardgrundgesamtheit zwischen dem Mittelwert und z Standardabweichungen vom Mittelwert liegt.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/gauss-function"
		}],
		functionParameter: { z: {
			name: "z",
			detail: "Erforderlich. Gibt eine Zahl zurück."
		} }
	},
	GEOMEAN: {
		description: "Gibt das geometrische Mittel einer Menge positiver Zahlen zurück. Zum Beispiel können Sie mit GEOMITTEL eine mittlere Wachstumsrate berechnen, wenn für einen Zinseszins variable Zinssätze gegeben sind.",
		abstract: "Gibt das geometrische Mittel einer Menge positiver Zahlen zurück. Zum Beispiel können Sie mit GEOMITTEL eine mittlere Wachstumsrate berechnen, wenn für einen Zinseszins variable Zinssätze gegeben sind.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/geomean-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Zahl1 ist erforderlich, nachfolgende Nummern sind optional. 1 bis 255 Argumente, für die Sie den Mittelwert berechnen möchten. Anstelle der durch Semikolons voneinander getrennten Argumente können Sie auch eine Matrix oder einen Bezug auf eine Matrix angeben."
			},
			number2: {
				name: "number2",
				detail: "Zahl1 ist erforderlich, nachfolgende Nummern sind optional. 1 bis 255 Argumente, für die Sie den Mittelwert berechnen möchten. Anstelle der durch Semikolons voneinander getrennten Argumente können Sie auch eine Matrix oder einen Bezug auf eine Matrix angeben."
			}
		}
	},
	GROWTH: {
		description: "Liefert Werte, die sich aus einem exponentiellen Trend ergeben. VARIATION liefert die y-Werte für eine Reihe neuer x-Werte, die Sie mithilfe vorhandener x- und y-Werte festlegen. Sie können die Arbeitsblattfunktion VARIATION auch verwenden, um eine zu den vorhandenen x- und y-Werten passende Exponentialkurve zu ermitteln.",
		abstract: "Liefert Werte, die sich aus einem exponentiellen Trend ergeben. VARIATION liefert die y-Werte für eine Reihe neuer x-Werte, die Sie mithilfe vorhandener x- und y-Werte festlegen. Sie können die Arbeitsblattfunktion VARIATION auch verwenden, um eine zu den vorhandenen x- und y-Werten passende Exponentialkurve zu ermitteln.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/growth-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Erforderlich. Die y-Werte, die Ihnen aus der jeweiligen Beziehung y = b*m^x bereits bekannt sind Besteht die Matrix Y_Werte aus nur einer Spalte, wird jede Spalte der Matrix X_Werte als eigenständige Variable interpretiert. Besteht die Matrix Y_Werte aus nur einer Zeile, wird jede Zeile der Matrix X_Werte als eigenständige Variable interpretiert. Wenn eine der Zahlen in known_y 0 oder negativ ist, gibt GROWTH die #NUM! zurück."
			},
			knownXs: {
				name: "known_x's",
				detail: "Optional. Eine optionale Gruppe von x-Werten, die Ihnen aus der Beziehung y = b*m^x eventuell bereits bekannt sind Die Matrix X_Werte kann eine oder mehrere Gruppen von Variablen umfassen. Wird nur eine Variable verwendet, können Y_Werte und X_Werte Bereiche beliebiger Form sein, solange sie dieselben Dimensionen haben. Werden mehrere Variablen verwendet, muss Y_Werte ein Vektor sein (das heißt ein Bereich, der aus nur einer Zeile oder nur einer Spalte besteht). Fehlt die Matrix X_Werte, wird an ihrer Stelle die Matrix {1.2.3...} angenommen, die genauso viele Elemente wie Y_Werte enthält."
			},
			newXs: {
				name: "new_x's",
				detail: "Optional. Die neuen x-Werte, für die die VARIATION-Funktion die zugehörigen y-Werte liefern soll. Analog zu X_Werte muss auch Neue_x_Werte für jede unabhängige Variable eine eigene Spalte (oder Zeile) bereitstellen. Daher müssen die Matrizen X_Werte und Neue_x_Werte gleich viele Spalten haben, wenn Y_Werte sich in einer einzelnen Spalte befindet. Wenn sich Y_Werte in einer einzelnen Zeile befindet, müssen X_Werte und Neue_x_Werte gleich viele Zeilen haben. Fehlt die Matrix Neue_x_Werte, wird angenommen, dass sie mit der Matrix X_Werte identisch ist. Fehlt sowohl die Matrix X_Werte als auch die Matrix Neue_x_Werte, werden diese als die Matrix {1.2.3...} angenommen, die genauso viele Elemente wie die Matrix Y_Werte enthalten."
			},
			constb: {
				name: "const",
				detail: "Optional. Ein Wahrheitswert, der angibt, ob die Konstante b den Wert 1 annehmen soll Ist Konstante mit WAHR belegt oder nicht angegeben, wird b normal berechnet. Ist Konstante mit FALSCH belegt, wird b gleich 1 gesetzt, und der Wert von m wird so angepasst, dass y = m^x gilt."
			}
		}
	},
	HARMEAN: {
		description: "Gibt das harmonische Mittel einer Datenmenge zurück. Ein harmonisches Mittel ist der Kehrwert eines aus Kehrwerten berechneten arithmetischen Mittels.",
		abstract: "Gibt das harmonische Mittel einer Datenmenge zurück. Ein harmonisches Mittel ist der Kehrwert eines aus Kehrwerten berechneten arithmetischen Mittels.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/harmean-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Zahl1 ist erforderlich, nachfolgende Nummern sind optional. 1 bis 255 Argumente, für die Sie den Mittelwert berechnen möchten. Anstelle der durch Semikolons voneinander getrennten Argumente können Sie auch eine Matrix oder einen Bezug auf eine Matrix angeben."
			},
			number2: {
				name: "number2",
				detail: "Zahl1 ist erforderlich, nachfolgende Nummern sind optional. 1 bis 255 Argumente, für die Sie den Mittelwert berechnen möchten. Anstelle der durch Semikolons voneinander getrennten Argumente können Sie auch eine Matrix oder einen Bezug auf eine Matrix angeben."
			}
		}
	},
	HYPGEOM_DIST: {
		description: "Gibt die hypergeometrische Verteilung zurück. HYPGEOM. DIST gibt die Wahrscheinlichkeit einer bestimmten Anzahl von Stichprobenerfolgen unter Berücksichtigung der Stichprobengröße, der Populationserfolge und der Populationsgröße zurück. Verwenden Sie HYPGEOM. DIST für Probleme mit einer endlichen Population, bei der jede Beobachtung entweder ein Erfolg oder ein Fehler ist und jede Teilmenge einer bestimmten Größe mit gleicher Wahrscheinlichkeit ausgewählt wird.",
		abstract: "Gibt die hypergeometrische Verteilung zurück. HYPGEOM. DIST gibt die Wahrscheinlichkeit einer bestimmten Anzahl von Stichprobenerfolgen unter Berücksichtigung der Stichprobengröße, der Populationserfolge und der Populationsgröße zurück. Verwenden Sie HYPGEOM. DIST für Probleme mit einer endlichen Population, bei der jede Beobachtung entweder ein Erfolg oder ein Fehler ist und jede Teilmenge einer bestimmten Größe mit gleicher Wahrscheinlichkeit ausgewählt wird.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/hypgeom-dist-function"
		}],
		functionParameter: {
			sampleS: {
				name: "sample_s",
				detail: "Erforderlich. Die Anzahl der in der Stichprobe erzielten Erfolge"
			},
			numberSample: {
				name: "number_sample",
				detail: "Erforderlich. Der Umfang (Größe) der Stichprobe"
			},
			populationS: {
				name: "population_s",
				detail: "Erforderlich. Die Anzahl der in der Grundgesamtheit möglichen Erfolge"
			},
			numberPop: {
				name: "number_pop",
				detail: "Erforderlich. Der Umfang (Größe) der Grundgesamtheit"
			},
			cumulative: {
				name: "cumulative",
				detail: "Erforderlich. Ein logischer Wert, der die Form der Funktion bestimmt. Wenn kumulativ TRUE ist, dann HYPGEOM. DIST gibt die kumulierte Verteilungsfunktion zurück. wenn FALSE, wird die Wahrscheinlichkeits-Massenfunktion zurückgegeben."
			}
		}
	},
	INTERCEPT: {
		description: "Berechnet den Punkt, an dem eine Linie die y-Achse unter Verwendung vorhandener x-Werte und y-Werte überschneidet. Der Abfangpunkt basiert auf einer Am besten geeigneten Regressionslinie, die durch die bekannten x-Werte und bekannten y-Werte gezeichnet wird. Verwenden Sie die INTERCEPT-Funktion, wenn Sie den Wert der abhängigen Variablen bestimmen möchten, wenn die unabhängige Variable 0 (null) ist. Beispielsweise können Sie die INTERCEPT-Funktion verwenden, um den elektrischen Widerstand eines Metalls bei 0 °C vorherzusagen, wenn Ihre Datenpunkte bei Raumtemperatur und höher erfasst wurden.",
		abstract: "Berechnet den Punkt, an dem eine Linie die y-Achse unter Verwendung vorhandener x-Werte und y-Werte überschneidet. Der Abfangpunkt basiert auf einer Am besten geeigneten Regressionslinie, die durch die bekannten x-Werte und bekannten y-Werte gezeichnet wird. Verwenden Sie die INTERCEPT-Funktion, wenn Sie den Wert der abhängigen Variablen bestimmen möchten, wenn die unabhängige Variable 0 (null) ist. Beispielsweise können Sie die INTERCEPT-Funktion verwenden, um den elektrischen Widerstand eines Metalls bei 0 °C vorherzusagen, wenn Ihre Datenpunkte bei Raumtemperatur und höher erfasst wurden.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/intercept-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Erforderlich. Die Gruppe der abhängigen Messwerte oder Daten"
			},
			knownXs: {
				name: "known_x's",
				detail: "Erforderlich. Die Gruppe der unabhängigen Messwerte oder Daten"
			}
		}
	},
	KURT: {
		description: "Gibt die Kurtosis (Exzess) eines Datasets zurück. Die Kurtosis ist ein Maß für die Wölbung (d.h. wie spitz oder flach) einer Verteilung im Vergleich zu der Normalverteilung. Eine positive Kurtosis weist auf eine relativ schmale, spitze Verteilung hin. Eine negative Kurtosis weist auf eine relativ flache Verteilung hin.",
		abstract: "Gibt die Kurtosis (Exzess) eines Datasets zurück. Die Kurtosis ist ein Maß für die Wölbung (d.h. wie spitz oder flach) einer Verteilung im Vergleich zu der Normalverteilung. Eine positive Kurtosis weist auf eine relativ schmale, spitze Verteilung hin. Eine negative Kurtosis weist auf eine relativ flache Verteilung hin.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/kurt-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Zahl1 ist erforderlich, nachfolgende Nummern sind optional. 1 bis 255 Argumente, für die Sie Kurtosis berechnen möchten. Anstelle der durch Semikolons voneinander getrennten Argumente können Sie auch eine Matrix oder einen Bezug auf eine Matrix angeben."
			},
			number2: {
				name: "number2",
				detail: "Zahl1 ist erforderlich, nachfolgende Nummern sind optional. 1 bis 255 Argumente, für die Sie Kurtosis berechnen möchten. Anstelle der durch Semikolons voneinander getrennten Argumente können Sie auch eine Matrix oder einen Bezug auf eine Matrix angeben."
			}
		}
	},
	LARGE: {
		description: "Gibt den k-größten Wert eines Datasets zurück. Mit dieser Funktion können Sie eine Zahl auf Basis ihrer relativen Größe ermitteln. Beispielsweise können Sie mit KGRÖSSTE den Punktestand des Erst-, Zweit- oder Drittplatzierten ermitteln.",
		abstract: "Gibt den k-größten Wert eines Datasets zurück. Mit dieser Funktion können Sie eine Zahl auf Basis ihrer relativen Größe ermitteln. Beispielsweise können Sie mit KGRÖSSTE den Punktestand des Erst-, Zweit- oder Drittplatzierten ermitteln.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/large-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Erforderlich. Die Matrix oder der Datenbereich, deren k-größten Wert Sie bestimmen möchten"
			},
			k: {
				name: "k",
				detail: "Erforderlich. Der Rang des Elements einer Matrix oder eines Zellbereichs, dessen Wert zurückgegeben werden soll"
			}
		}
	},
	LINEST: {
		description: "Die Funktion RGP berechnet die Statistik für eine Linie nach der Methode der kleinsten Quadrate, um eine gerade Linie zu berechnen, die am besten an die Daten angepasst ist, und gibt dann eine Matrix zurück, die die Linie beschreibt. Sie können RGP auch mit anderen Funktionen kombinieren, um die Statistiken für andere Modelltypen zu berechnen, die lineare unbekannte Parameter aufweisen, einschließlich polynomischer, logarithmischer und exponentieller Reihen sowie Potenzen. Da diese Funktion eine Matrix von Werten zurückgibt, muss die Formel als Matrixformel eingegeben werden. Anweisungen dazu sind nach den Beispielen in diesem Artikel angegeben.",
		abstract: "Die Funktion RGP berechnet die Statistik für eine Linie nach der Methode der kleinsten Quadrate, um eine gerade Linie zu berechnen, die am besten an die Daten angepasst ist, und gibt dann eine Matrix zurück, die die Linie beschreibt. Sie können RGP auch mit anderen Funktionen kombinieren, um die Statistiken für andere Modelltypen zu berechnen, die lineare unbekannte Parameter aufweisen, einschließlich polynomischer, logarithmischer und exponentieller Reihen sowie Potenzen. Da diese Funktion eine Matrix von Werten zurückgibt, muss die Formel als Matrixformel eingegeben werden. Anweisungen dazu sind nach den Beispielen in diesem Artikel angegeben.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/linest-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Erforderlich. Die y-Werte, die Ihnen bereits aus der Beziehung y = mx + b bekannt sind. Wenn sich der Bereich der known_y in einer einzelnen Spalte befindet, wird jede Spalte von known_x als separate Variable interpretiert. Wenn der Bereich der known_y in einer einzelnen Zeile enthalten ist, wird jede Zeile von known_x als separate Variable interpretiert."
			},
			knownXs: {
				name: "known_x's",
				detail: "Optional. Die x-Werte, die Ihnen möglicherweise bereits aus der Beziehung y = mx + b bekannt sind. Der Bereich der known_x kann einen oder mehrere Variablensätze enthalten. Wenn nur eine Variable verwendet wird, können known_y und known_x bereiche beliebiger Form sein, sofern sie die gleichen Dimensionen haben. Wenn mehr als eine Variable verwendet wird, muss known_y ein Vektor sein (d. a. ein Bereich mit einer Höhe von einer Zeile oder einer Breite von einer Spalte). Wenn known_x nicht angegeben wird, wird davon ausgegangen, dass es sich um das Array {1,2,3,...} handelt, das die gleiche Größe wie known_y hat ."
			},
			constb: {
				name: "const",
				detail: "Optional. Ein Wahrheitswert, der angibt, ob die Konstante b den Wert 0 annehmen soll. Wenn const TRUE ist oder ausgelassen wird, wird b normal berechnet. Wenn const FALSE ist, wird b gleich 0 festgelegt, und die m-Werte werden so angepasst, dass sie y = mx anpassen."
			},
			stats: {
				name: "stats",
				detail: "Optional. Ein Wahrheitswert, der angibt, ob zusätzliche Regressionskenngrößen zurückgegeben werden sollen. Wenn stats den Wert TRUE hat, gibt LINEST die zusätzlichen Regressionsstatistiken zurück. Daher ist das zurückgegebene Array {mn,mn-1,...,m1,b; sen,sen-1,...,se1,seb; r 2,sey ; F,df; ssreg,ssresid} . Wenn stats FALSE ist oder ausgelassen wird, gibt LINEST nur die m-Koeffizienten und die Konstante b zurück. Die folgenden Regressionskenngrößen (-statistiken) können zusätzlich ermittelt werden:"
			}
		}
	},
	LOGEST: {
		description: "Die Gleichung der Kurve lautet",
		abstract: "Die Gleichung der Kurve lautet",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/logest-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Erforderlich. Die y-Werte, die Ihnen aus der jeweiligen Beziehung y = b*m^x bereits bekannt sind Besteht die Matrix Y_Werte aus nur einer Spalte, wird jede Spalte der Matrix X_Werte als eigenständige Variable interpretiert. Besteht die Matrix Y_Werte aus nur einer Zeile, wird jede Zeile der Matrix X_Werte als eigenständige Variable interpretiert."
			},
			knownXs: {
				name: "known_x's",
				detail: "Optional. Eine optionale Gruppe von x-Werten, die Ihnen aus der Beziehung y = b*m^x eventuell bereits bekannt sind Die Matrix X_Werte kann eine oder mehrere Gruppen von Variablen umfassen. Wird nur eine Variable verwendet, können Y_Werte und X_Werte Bereiche beliebiger Form sein, solange sie dieselben Dimensionen haben. Werden mehrere Variablen verwendet, müssen Y_Werte als Zellbereiche vorliegen, wobei sich der Bereich nur über eine Zeile oder eine Spalte erstrecken darf (auch als \"Vektor\" bezeichnet). Fehlt die Matrix X_Werte, wird an ihrer Stelle die Matrix {1.2.3...} angenommen, die genauso viele Elemente wie Y_Werte enthält."
			},
			constb: {
				name: "const",
				detail: "Optional. Ein Wahrheitswert, der angibt, ob die Konstante b den Wert 1 annehmen soll Ist Konstante mit WAHR belegt oder nicht angegeben, wird b normal berechnet. Ist Konstante mit FALSCH belegt, wird b gleich 1 festgelegt, und die m-Werte werden gemäß y = m^x berechnet."
			},
			stats: {
				name: "stats",
				detail: "Optional. Ein Wahrheitswert, der angibt, ob zusätzliche Regressionskenngrößen ausgegeben werden sollen Ist Stats mit WAHR belegt, gibt RKP diese zusätzlichen Regressionskenngrößen zurück, sodass die zurückgegebene Matrix wie folgt aussieht:{mn.mn-1. ... .m1.b;sen.sen-1. ... .se1.seb;r 2.sey;F.df;ssreg.ssresid}. Ist Stats mit FALSCH belegt oder nicht angegeben, gibt RKP nur die m-Koeffizienten und die Konstante b zurück."
			}
		}
	},
	LOGNORM_DIST: {
		description: "Mit dieser Funktion können Sie Daten untersuchen, die logarithmisch transformiert wurden.",
		abstract: "Mit dieser Funktion können Sie Daten untersuchen, die logarithmisch transformiert wurden.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/lognorm-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Erforderlich. Der Wert, für den die Funktion ausgewertet werden soll"
			},
			mean: {
				name: "mean",
				detail: "Erforderlich. Der Mittelwert der Lognormalverteilung"
			},
			standardDev: {
				name: "standard_dev",
				detail: "Erforderlich. Die Standardabweichung der Lognormalverteilung"
			},
			cumulative: {
				name: "cumulative",
				detail: "Erforderlich. Ein logischer Wert, der die Form der Funktion bestimmt. Wenn kumulativ TRUE ist, LOGNORM. DIST gibt die kumulierte Verteilungsfunktion zurück. Wenn FALSE, wird die Wahrscheinlichkeitsdichtefunktion zurückgegeben."
			}
		}
	},
	LOGNORM_INV: {
		description: "Gibt Quantile der Lognormalverteilung von x zurück, wobei ln(x) mit den Parametern Mittelwert und Standabwn normal verteilt ist. Ist p = LOGNORM.VERT(x,...), gilt LOGNORM.INV(p,...) = x.",
		abstract: "Gibt Quantile der Lognormalverteilung von x zurück, wobei ln(x) mit den Parametern Mittelwert und Standabwn normal verteilt ist. Ist p = LOGNORM.VERT(x,...), gilt LOGNORM.INV(p,...) = x.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/lognorm-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Erforderlich. Die zur Lognormalverteilung gehörige Wahrscheinlichkeit"
			},
			mean: {
				name: "mean",
				detail: "Erforderlich. Der Mittelwert der Lognormalverteilung"
			},
			standardDev: {
				name: "standard_dev",
				detail: "Erforderlich. Die Standardabweichung der Lognormalverteilung"
			}
		}
	},
	MARGINOFERROR: {
		description: "Diese Funktion berechnet die Fehlerspanne aus einem Wertebereich und einem Konfidenzniveau.",
		abstract: "Diese Funktion berechnet die Fehlerspanne aus einem Wertebereich und einem Konfidenzniveau.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/12487850?hl=de"
		}],
		functionParameter: {
			range: {
				name: "range",
				detail: "Range – Der Wertebereich, der zur Berechnung der Fehlerspanne verwendet wird."
			},
			confidence: {
				name: "confidence",
				detail: "Confidence – Das gewünschte Konfidenzniveau zwischen 0 und 1."
			}
		}
	},
	MAX: {
		description: "Gibt den größten Wert innerhalb einer Argumentliste zurück.",
		abstract: "Gibt den größten Wert innerhalb einer Argumentliste zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/max-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Zahl1 ist erforderlich, nachfolgende Nummern sind optional. 1 bis 255 Zahlen, für die Sie den Maximalwert finden möchten."
			},
			number2: {
				name: "number2",
				detail: "Zahl1 ist erforderlich, nachfolgende Nummern sind optional. 1 bis 255 Zahlen, für die Sie den Maximalwert finden möchten."
			}
		}
	},
	MAXA: {
		description: "Gibt den größten Wert in einer Liste von Argumenten zurück, einschließlich Zahlen, Text und Wahrheitswerten.",
		abstract: "Gibt den größten Wert in einer Liste von Argumenten zurück, einschließlich Zahlen, Text und Wahrheitswerten.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/maxa-function"
		}],
		functionParameter: {
			value1: {
				name: "Wert1",
				detail: "Erforderlich. Das erste numerische Argument, dessen größter Wert zurückgegeben werden soll."
			},
			value2: {
				name: "Wert2",
				detail: "Optional. Die numerischen Argumente 2 bis 255, deren größter Wert ermittelt werden soll."
			}
		}
	},
	MAXIFS: {
		description: "Die Funktion MAXWENNS gibt den Maximalwert aus Zellen zurück, die mit einem bestimmten Satz Bedingungen oder Kriterien angegeben wurden.",
		abstract: "Die Funktion MAXWENNS gibt den Maximalwert aus Zellen zurück, die mit einem bestimmten Satz Bedingungen oder Kriterien angegeben wurden.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/maxifs-function"
		}],
		functionParameter: {
			maxRange: {
				name: "sum_range",
				detail: "Der tatsächliche Zellenbereich, in dem das Maximum ermittelt wird."
			},
			criteriaRange1: {
				name: "criteria_range1",
				detail: "Die Reihe der Zellen, die anhand der Kriterien ausgewertet werden sollen."
			},
			criteria1: {
				name: "criteria1",
				detail: "Sind die Kriterien, die in Form einer Zahl, eines Ausdrucks oder eines Texts festgelegt werden und beschreiben, welche Zellen als Maximum ausgewertet werden. Der gleiche Kriteriensatz kann auch für die Funktionen MINWENNS , SUMMEWENNS und MITTELWERTWENNS verwendet werden."
			},
			criteriaRange2: {
				name: "criteriaRange2",
				detail: "Zusätzliche Bereiche und zugehörige Kriterien. Sie können bis zu 126 Bereich/Kriterien-Paare eingeben."
			},
			criteria2: {
				name: "criteria2",
				detail: "Zusätzliche Bereiche und zugehörige Kriterien. Sie können bis zu 126 Bereich/Kriterien-Paare eingeben."
			}
		}
	},
	MEDIAN: {
		description: "Gibt den Median der angegebenen Zahlen zurück. Der Median ist die Zahl, die in der Mitte einer Zahlenreihe liegt.",
		abstract: "Gibt den Median der angegebenen Zahlen zurück. Der Median ist die Zahl, die in der Mitte einer Zahlenreihe liegt.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/median-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Zahl1 ist erforderlich, nachfolgende Nummern sind optional. 1 bis 255 Zahlen, deren Median Sie berechnen möchten."
			},
			number2: {
				name: "number2",
				detail: "Zahl1 ist erforderlich, nachfolgende Nummern sind optional. 1 bis 255 Zahlen, deren Median Sie berechnen möchten."
			}
		}
	},
	MIN: {
		description: "Gibt den kleinsten Wert innerhalb einer Argumentliste zurück.",
		abstract: "Gibt den kleinsten Wert innerhalb einer Argumentliste zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/min-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Zahl1 ist optional, nachfolgende Zahlen sind optional. 1 bis 255 Zahlen, aus denen Sie die kleinste Zahl heraussuchen möchten."
			},
			number2: {
				name: "number2",
				detail: "Zahl1 ist optional, nachfolgende Zahlen sind optional. 1 bis 255 Zahlen, aus denen Sie die kleinste Zahl heraussuchen möchten."
			}
		}
	},
	MINA: {
		description: "Gibt den kleinsten Wert einer Liste von Argumenten zurück.",
		abstract: "Gibt den kleinsten Wert einer Liste von Argumenten zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/mina-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Wert1 ist erforderlich, nachfolgende Werte sind optional. 1 bis 255 Werte, deren kleinster Wert ermittelt werden soll."
			},
			value2: {
				name: "value2",
				detail: "Wert1 ist erforderlich, nachfolgende Werte sind optional. 1 bis 255 Werte, deren kleinster Wert ermittelt werden soll."
			}
		}
	},
	MINIFS: {
		description: "Die Funktion MINWENNS gibt den Minimalwert aus Zellen zurück, die mit einem bestimmten Satz Bedingungen oder Kriterien angegeben wurden.",
		abstract: "Die Funktion MINWENNS gibt den Minimalwert aus Zellen zurück, die mit einem bestimmten Satz Bedingungen oder Kriterien angegeben wurden.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/minifs-function"
		}],
		functionParameter: {
			minRange: {
				name: "min_range",
				detail: "Der tatsächliche Zellenbereich, in dem der Minimalwert ermittelt wird."
			},
			criteriaRange1: {
				name: "criteria_range1",
				detail: "Die Reihe der Zellen, die anhand der Kriterien ausgewertet werden sollen."
			},
			criteria1: {
				name: "criteria1",
				detail: "Sind die Kriterien, die in Form einer Zahl, eines Ausdrucks oder eines Texts festgelegt werden und beschreiben, welche Zellen als Minimum ausgewertet werden. Die gleichen Kriterien können auch für die Funktionen MAXWENNS , SUMMEWENNS und MITTELWERTWENNS verwendet werden."
			},
			criteriaRange2: {
				name: "criteria_range2",
				detail: "Zusätzliche Bereiche und zugehörige Kriterien. Sie können bis zu 126 Bereich/Kriterien-Paare eingeben."
			},
			criteria2: {
				name: "criteria2",
				detail: "Zusätzliche Bereiche und zugehörige Kriterien. Sie können bis zu 126 Bereich/Kriterien-Paare eingeben."
			}
		}
	},
	MODE_MULT: {
		description: "Gibt es mehrere Modalwerte, werden mehrere Ergebnisse zurückgegeben. Da diese Funktion ein Array von Werten zurückgibt, muss die Formel als Arrayformel eingegeben werden.",
		abstract: "Gibt es mehrere Modalwerte, werden mehrere Ergebnisse zurückgegeben. Da diese Funktion ein Array von Werten zurückgibt, muss die Formel als Arrayformel eingegeben werden.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/mode-mult-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Erforderlich. Das erste numerische Argument, für das der Modalwert (Modus) berechnet werden soll"
			},
			number2: {
				name: "number2",
				detail: "Optional. 2 bis 254 numerische Argumente, für die Sie den Modalwert (Modus) berechnen möchten. An Stelle der durch Semikolons getrennten Argumente können Sie auch ein Array oder einen Arraybezug verwenden."
			}
		}
	},
	MODE_SNGL: {
		description: "Gibt den häufigsten Wert einer Matrix oder eines Datenbereichs zurück.",
		abstract: "Gibt den häufigsten Wert einer Matrix oder eines Datenbereichs zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/mode-sngl-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Erforderlich. Das erste Argument, für das der Modalwert (Modus) berechnet werden soll"
			},
			number2: {
				name: "number2",
				detail: "Optional. 2 bis 254 Argumente, für die Sie den Modalwert (Modus) berechnen möchten. An Stelle der durch Semikolons getrennten Argumente können Sie auch ein Array oder einen Arraybezug verwenden."
			}
		}
	},
	NEGBINOM_DIST: {
		description: "Gibt Wahrscheinlichkeiten einer negativen, binominal verteilten Zufallsvariablen zurück. NEGBINOM.VERT berechnet, wie wahrscheinlich es ist, dass es \"Zahl_Mißerfolge\" vor dem durch \"Zahl_Erfolge\" angegebenen Erfolg gibt, wobei \"Erfolgswahrsch\" die Wahrscheinlichkeit für den günstigen Ausgang des Experiments ist.",
		abstract: "Gibt Wahrscheinlichkeiten einer negativen, binominal verteilten Zufallsvariablen zurück. NEGBINOM.VERT berechnet, wie wahrscheinlich es ist, dass es \"Zahl_Mißerfolge\" vor dem durch \"Zahl_Erfolge\" angegebenen Erfolg gibt, wobei \"Erfolgswahrsch\" die Wahrscheinlichkeit für den günstigen Ausgang des Experiments ist.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/negbinom-dist-function"
		}],
		functionParameter: {
			numberF: {
				name: "number_f",
				detail: "Erforderlich. Die Zahl der ungünstigen Ereignisse"
			},
			numberS: {
				name: "number_s",
				detail: "Erforderlich. Die Zahl der günstigen Ereignisse"
			},
			probabilityS: {
				name: "probability_s",
				detail: "Erforderlich. Die Wahrscheinlichkeit für den günstigen Ausgang des Experiments"
			},
			cumulative: {
				name: "cumulative",
				detail: "Erforderlich. Ein logischer Wert, der die Form der Funktion bestimmt. Wenn kumulativ TRUE ist, NEGBINOM. DIST gibt die kumulierte Verteilungsfunktion zurück. Wenn FALSE, wird die Wahrscheinlichkeitsdichtefunktion zurückgegeben."
			}
		}
	},
	NORM_DIST: {
		description: "Gibt die Normalverteilung für den angegebenen Mittelwert und die angegebene Standardabweichung zurück. Diese Funktion hat sehr viele Anwendungsgebiete innerhalb der Statistik, so unter anderem auch Testen von Hypothesen.",
		abstract: "Gibt die Normalverteilung für den angegebenen Mittelwert und die angegebene Standardabweichung zurück. Diese Funktion hat sehr viele Anwendungsgebiete innerhalb der Statistik, so unter anderem auch Testen von Hypothesen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/norm-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Erforderlich. Der Wert der Verteilung, dessen Wahrscheinlichkeit Sie berechnen möchten"
			},
			mean: {
				name: "mean",
				detail: "Erforderlich. Das arithmetische Mittel der Verteilung"
			},
			standardDev: {
				name: "standard_dev",
				detail: "Erforderlich. Die Standardabweichung der Verteilung"
			},
			cumulative: {
				name: "cumulative",
				detail: "Erforderlich. Ein logischer Wert, der die Form der Funktion bestimmt. Wenn kumulativ TRUE ist, NORM. DIST gibt die kumulierte Verteilungsfunktion zurück. Wenn FALSE, wird die Wahrscheinlichkeitsdichtefunktion zurückgegeben."
			}
		}
	},
	NORM_INV: {
		description: "Gibt Perzentile der Normalverteilung für den angegebenen Mittelwert und die angegebene Standardabweichung zurück.",
		abstract: "Gibt Perzentile der Normalverteilung für den angegebenen Mittelwert und die angegebene Standardabweichung zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/norm-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Erforderlich. Die zur Standardnormalverteilung gehörige Wahrscheinlichkeit"
			},
			mean: {
				name: "mean",
				detail: "Erforderlich. Das arithmetische Mittel der Verteilung"
			},
			standardDev: {
				name: "standard_dev",
				detail: "Erforderlich. Die Standardabweichung der Verteilung"
			}
		}
	},
	NORM_S_DIST: {
		description: "Die NORM. Die S.DIST-Funktion in Excel gibt die Standardnormalverteilung zurück ( d. h., sie hat einen Mittelwert von 0 und eine Standardabweichung von 1 ). Sie können diese Funktion anstelle einer Tabelle mit Standard-Normalkurvenbereichen verwenden.",
		abstract: "Die NORM. Die S.DIST-Funktion in Excel gibt die Standardnormalverteilung zurück ( d. h., sie hat einen Mittelwert von 0 und eine Standardabweichung von 1 ). Sie können diese Funktion anstelle einer Tabelle mit Standard-Normalkurvenbereichen verwenden.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/norm-s-dist-function"
		}],
		functionParameter: {
			z: {
				name: "z",
				detail: "Erforderlich. Dies ist der Wert, für den Sie die Verteilung verwenden möchten."
			},
			cumulative: {
				name: "cumulative",
				detail: "Erforderlich. Das kumulative Argument kann entweder TRUE oder FALSE sein. Dieser logische Wert bestimmt die Form der Funktion. Wenn kumulativ TRUE ist, dann NORM. S.DIST gibt die kumulierte Verteilungsfunktion zurück. Wenn der Wert FALSE ist, wird die Wahrscheinlichkeits-Massenfunktion zurückgegeben."
			}
		}
	},
	NORM_S_INV: {
		description: "Gibt Quantile der Standardnormalverteilung zurück. Die Standardnormalverteilung hat einen Mittelwert von 0 und eine Standardabweichung von 1.",
		abstract: "Gibt Quantile der Standardnormalverteilung zurück. Die Standardnormalverteilung hat einen Mittelwert von 0 und eine Standardabweichung von 1.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/norm-s-inv-function"
		}],
		functionParameter: { probability: {
			name: "probability",
			detail: "Erforderlich. Die zur Standardnormalverteilung gehörige Wahrscheinlichkeit"
		} }
	},
	PEARSON: {
		description: "Gibt den Pearsonschen Korrelationskoeffizienten r zurück. Dieser Koeffizient ist ein dimensionsloser Index mit dem Wertebereich -1,0 ≤ r ≤ 1,0 und ein Maß dafür, inwieweit zwischen zwei Datensätzen eine lineare Abhängigkeit besteht.",
		abstract: "Gibt den Pearsonschen Korrelationskoeffizienten r zurück. Dieser Koeffizient ist ein dimensionsloser Index mit dem Wertebereich -1,0 ≤ r ≤ 1,0 und ein Maß dafür, inwieweit zwischen zwei Datensätzen eine lineare Abhängigkeit besteht.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/pearson-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Erforderlich. Eine Reihe unabhängiger Werte"
			},
			array2: {
				name: "array2",
				detail: "Erforderlich. Eine Reihe abhängiger Werte"
			}
		}
	},
	PERCENTILE_EXC: {
		description: "Gibt das k-te Perzentil der Werte eines Datensatzes zurück (0 und 1 ausgeschlossen).",
		abstract: "Gibt das k-te Perzentil der Werte eines Datensatzes zurück (0 und 1 ausgeschlossen).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/percentile-exc-function"
		}],
		functionParameter: {
			array: {
				name: "Array",
				detail: "Erforderlich. Ein Array oder ein Datenbereich, das bzw. der die relative Lage der Daten beschreibt."
			},
			k: {
				name: "K",
				detail: "Erforderlich. Ein Perzentilwert im Bereich 0 < k < 1."
			}
		}
	},
	PERCENTILE_INC: {
		description: "Sie können das QUANTIL verwenden. INC-Funktion zum Festlegen eines Akzeptanzschwellenwerts. So könnten Sie beispielsweise entscheiden, dass nur Kandidaten untersucht werden, deren Prüfungsergebnisse oberhalb des 90 %-Quantils liegen.",
		abstract: "Sie können das QUANTIL verwenden. INC-Funktion zum Festlegen eines Akzeptanzschwellenwerts. So könnten Sie beispielsweise entscheiden, dass nur Kandidaten untersucht werden, deren Prüfungsergebnisse oberhalb des 90 %-Quantils liegen.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/percentile-inc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Erforderlich. Ein Array oder ein Datenbereich, das/der die relative Lage der Daten beschreibt"
			},
			k: {
				name: "k",
				detail: "Erforderlich. Der Perzentilwert im Bereich von 0 bis einschließlich 1."
			}
		}
	},
	PERCENTRANK_EXC: {
		description: "Gibt den prozentualen (0..1 ausschließlich) Rang (Alpha) eines Werts in einem Dataset zurück",
		abstract: "Gibt den prozentualen (0..1 ausschließlich) Rang (Alpha) eines Werts in einem Dataset zurück",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/percentrank-exc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Erforderlich. Das Array oder der Bereich numerischer Daten, das/der die relative Lage der Daten beschreibt"
			},
			x: {
				name: "x",
				detail: "Erforderlich. Der Wert, dessen Rang Sie bestimmen möchten"
			},
			significance: {
				name: "significance",
				detail: "Optional. Ein Wert, der die Anzahl der Nachkommastellen des zurückgegebenen Quantilsrangs festlegt. Falls nicht angegeben, PERCENTRANK. EXC verwendet drei Ziffern (0.xxx)."
			}
		}
	},
	PERCENTRANK_INC: {
		description: "Diese Funktion kann dazu verwendet werden, die relative Position zu ermitteln, die ein Wert innerhalb einer Datenmenge einnimmt. So können Sie beispielsweise mithilfe von QUANTILSRANG.INKL ermitteln, welche relative Position das Ergebnis einer Eingangsuntersuchung innerhalb der Ergebnisse aller Untersuchungen einnimmt.",
		abstract: "Diese Funktion kann dazu verwendet werden, die relative Position zu ermitteln, die ein Wert innerhalb einer Datenmenge einnimmt. So können Sie beispielsweise mithilfe von QUANTILSRANG.INKL ermitteln, welche relative Position das Ergebnis einer Eingangsuntersuchung innerhalb der Ergebnisse aller Untersuchungen einnimmt.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/percentrank-inc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Erforderlich. Die Matrix oder der Bereich numerischer Daten, die/der die relative Lage der Daten beschreibt"
			},
			x: {
				name: "x",
				detail: "Erforderlich. Der Wert, dessen Rang Sie bestimmen möchten"
			},
			significance: {
				name: "significance",
				detail: "Optional. Ein Wert, der die Anzahl der Nachkommastellen des zurückgegebenen Quantilsrangs festlegt. Falls nicht angegeben, PERCENTRANK. INC verwendet drei Ziffern (0.xxx)."
			}
		}
	},
	PERMUT: {
		description: "Gibt die Anzahl der Möglichkeiten zurück, um k Elemente aus einer Menge von n Elementen ohne Zurücklegen zu ziehen. Eine Variation ist eine Menge von Elementen oder Ereignissen, deren interne Anordnung oder Reihenfolge relevant ist. Variationen unterscheiden sich von Kombinationen, für welche die interne Anordnung nicht relevant ist. Verwenden Sie diese Funktion z. B. für die Berechnung von Wahrscheinlichkeiten bei Zahlenlotterien.",
		abstract: "Gibt die Anzahl der Möglichkeiten zurück, um k Elemente aus einer Menge von n Elementen ohne Zurücklegen zu ziehen. Eine Variation ist eine Menge von Elementen oder Ereignissen, deren interne Anordnung oder Reihenfolge relevant ist. Variationen unterscheiden sich von Kombinationen, für welche die interne Anordnung nicht relevant ist. Verwenden Sie diese Funktion z. B. für die Berechnung von Wahrscheinlichkeiten bei Zahlenlotterien.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/permut-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Die Anzahl aller Elemente"
			},
			numberChosen: {
				name: "number_chosen",
				detail: "Erforderlich. Gibt an, aus wie vielen Elementen jede Variationsmöglichkeit bestehen soll"
			}
		}
	},
	PERMUTATIONA: {
		description: "Gibt die Anzahl der Permutationen für eine angegebene Anzahl von Objekten zurück (mit Wiederholungen), die aus der Gesamtmenge der Objekte ausgewählt werden können.",
		abstract: "Gibt die Anzahl der Permutationen für eine angegebene Anzahl von Objekten zurück (mit Wiederholungen), die aus der Gesamtmenge der Objekte ausgewählt werden können.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/permutationa-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Eine ganze Zahl zur Angabe der Gesamtzahl von Objekten."
			},
			numberChosen: {
				name: "number_chosen",
				detail: "Erforderlich. Eine ganze Zahl zur Angabe der Anzahl von Objekten in jeder Permutation."
			}
		}
	},
	PHI: {
		description: "Gibt den Wert der Dichtefunktion für eine Standardnormalverteilung zurück.",
		abstract: "Gibt den Wert der Dichtefunktion für eine Standardnormalverteilung zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/phi-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Erforderlich. X ist die Zahl, für die Sie die Dichte der Standardnormalverteilung verwenden möchten."
		} }
	},
	POISSON_DIST: {
		description: "Gibt Wahrscheinlichkeiten einer poissonverteilten Zufallsvariablen zurück. Eine übliche Anwendung der Poissonverteilung ist die Modellierung der Anzahl der Ereignisse innerhalb eines bestimmten Zeitraumes, beispielsweise die Anzahl der Bankkunden, die innerhalb einer Stunde an einem Geldautomaten eintreffen.",
		abstract: "Gibt Wahrscheinlichkeiten einer poissonverteilten Zufallsvariablen zurück. Eine übliche Anwendung der Poissonverteilung ist die Modellierung der Anzahl der Ereignisse innerhalb eines bestimmten Zeitraumes, beispielsweise die Anzahl der Bankkunden, die innerhalb einer Stunde an einem Geldautomaten eintreffen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/poisson-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Erforderlich. Die Zahl der Fälle"
			},
			mean: {
				name: "mean",
				detail: "Erforderlich. Der erwartete Zahlenwert"
			},
			cumulative: {
				name: "cumulative",
				detail: "Erforderlich. Ein logischer Wert, der die Form der zurückgegebenen Wahrscheinlichkeitsverteilung bestimmt. Wenn kumulativ TRUE ist, POISSON. DIST gibt die kumulative Poisson-Wahrscheinlichkeit zurück, dass die Anzahl der zufälligen Ereignisse zwischen null und x einschließlich liegt; False gibt die Poisson-Wahrscheinlichkeits-Massenfunktion zurück, dass die Anzahl der ereignisse genau x ist."
			}
		}
	},
	PROB: {
		description: "Gibt die Wahrscheinlichkeit für ein von zwei Werten eingeschlossenes Intervall zurück. Ist das Argument Obergrenze nicht angegeben, berechnet diese Funktion die Wahrscheinlichkeit, dass zu Beob_Werte gehörende Werte gleich dem Wert von Untergrenze sind.",
		abstract: "Gibt die Wahrscheinlichkeit für ein von zwei Werten eingeschlossenes Intervall zurück. Ist das Argument Obergrenze nicht angegeben, berechnet diese Funktion die Wahrscheinlichkeit, dass zu Beob_Werte gehörende Werte gleich dem Wert von Untergrenze sind.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/prob-function"
		}],
		functionParameter: {
			xRange: {
				name: "x_range",
				detail: "Erforderlich. Der Bereich von Realisationen der Zufallsvariablen, denen Wahrscheinlichkeiten zugeordnet sind"
			},
			probRange: {
				name: "prob_range",
				detail: "Erforderlich. Die Wahrscheinlichkeiten zu den beobachteten Werten"
			},
			lowerLimit: {
				name: "lower_limit",
				detail: "Optional. Die untere Grenze der Werte, deren Wahrscheinlichkeit berechnet werden soll"
			},
			upperLimit: {
				name: "upper_limit",
				detail: "Optional. Die optionale obere Grenze der Werte, deren Wahrscheinlichkeit berechnet werden soll"
			}
		}
	},
	QUARTILE_EXC: {
		description: "Gibt das Quartil des Datasets basierend auf Perzentilwerten von 0 bis 1 (exklusiv) zurück.",
		abstract: "Gibt das Quartil des Datasets basierend auf Perzentilwerten von 0 bis 1 (exklusiv) zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/quartile-exc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Erforderlich. Ein Array oder ein Zellbereich numerischer Werte, deren Quartile Sie bestimmen möchten"
			},
			quart: {
				name: "quart",
				detail: "Erforderlich. Gibt an, welcher Wert ausgegeben werden soll"
			}
		}
	},
	QUARTILE_INC: {
		description: "Gibt das Quartil eines Datensatzes zurück (einschließlich 0 und 1).",
		abstract: "Gibt das Quartil eines Datensatzes zurück (einschließlich 0 und 1).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/quartile-inc-function"
		}],
		functionParameter: {
			array: {
				name: "Array",
				detail: "Erforderlich. Ein Array oder ein Zellbereich numerischer Werte, deren Quartile Sie bestimmen möchten."
			},
			quart: {
				name: "Quart",
				detail: "Erforderlich. Gibt an, welcher Quartilswert ausgegeben werden soll."
			}
		}
	},
	RANK_AVG: {
		description: "Gibt den Rang einer Zahl in einer Liste von Zahlen zurück: ihre Größe relativ zu anderen Werten in der Liste. Wenn mehrere Werte denselben Rang aufweisen, wird der durchschnittliche Rang zurückgegeben.",
		abstract: "Gibt den Rang einer Zahl in einer Liste von Zahlen zurück: ihre Größe relativ zu anderen Werten in der Liste. Wenn mehrere Werte denselben Rang aufweisen, wird der durchschnittliche Rang zurückgegeben.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/rank-avg-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Die Zahl, für die der Rang ermittelt werden soll"
			},
			ref: {
				name: "ref",
				detail: "Erforderlich. Ein Array von oder ein Bezug auf eine Liste mit Zahlen. Nicht numerische Werte im Bezug werden ignoriert."
			},
			order: {
				name: "order",
				detail: "Optional. Eine Zahl, die angibt, wie der Rang von \"Zahl\" bestimmt werden soll"
			}
		}
	},
	RANK_EQ: {
		description: "Gibt den Rang zurück, den eine Zahl innerhalb einer Liste von Zahlen einnimmt. Seine Größe ist relativ zu anderen Werten in der Liste; Wenn mehrere Werte denselben Rang haben, wird der oberste Rang dieser Wertemenge zurückgegeben.",
		abstract: "Gibt den Rang zurück, den eine Zahl innerhalb einer Liste von Zahlen einnimmt. Seine Größe ist relativ zu anderen Werten in der Liste; Wenn mehrere Werte denselben Rang haben, wird der oberste Rang dieser Wertemenge zurückgegeben.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/rank-eq-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Die Zahl, für die der Rang ermittelt werden soll"
			},
			ref: {
				name: "ref",
				detail: "Erforderlich. Ein Array von oder ein Bezug auf eine Liste mit Zahlen. Nicht numerische Werte im Bezug werden ignoriert."
			},
			order: {
				name: "order",
				detail: "Optional. Eine Zahl, die angibt, wie der Rang von \"Zahl\" bestimmt werden soll"
			}
		}
	},
	RSQ: {
		description: "Gibt das Quadrat des Pearsonschen Korrelationskoeffizienten zurück, entsprechend den in \"Y_Werte\" und \"X_Werte\" abgelegten Datenpunkten. Weitere Informationen finden Sie unter PEARSON (Funktion) . Ein r-quadrat-Wert kann als der Anteil der Varianz von Y, der durch die Varianz von X erklärt wird, interpretiert werden.",
		abstract: "Gibt das Quadrat des Pearsonschen Korrelationskoeffizienten zurück, entsprechend den in \"Y_Werte\" und \"X_Werte\" abgelegten Datenpunkten. Weitere Informationen finden Sie unter PEARSON (Funktion) . Ein r-quadrat-Wert kann als der Anteil der Varianz von Y, der durch die Varianz von X erklärt wird, interpretiert werden.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/rsq-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Erforderlich. Eine Matrix oder ein Zellbereich numerisch abhängiger Datenpunkte"
			},
			knownXs: {
				name: "known_x's",
				detail: "Erforderlich. Eine Reihe unabhängiger Datenpunkte"
			}
		}
	},
	SKEW: {
		description: "Gibt die Schiefe einer Verteilung zurück. Die Schiefe ist ein Maß für die Asymmetrie einer eingipfligen Häufigkeitsverteilung um ihren Mittelwert. Eine positive Schiefe zeigt eine Verteilung an, deren Gipfel sich tendenziell zu Werten größer dem Mittelwert hin orientiert. Eine negative Schiefe zeigt eine Verteilung an, deren Gipfel sich tendenziell zu Werten kleiner dem Mittelwert hin orientiert.",
		abstract: "Gibt die Schiefe einer Verteilung zurück. Die Schiefe ist ein Maß für die Asymmetrie einer eingipfligen Häufigkeitsverteilung um ihren Mittelwert. Eine positive Schiefe zeigt eine Verteilung an, deren Gipfel sich tendenziell zu Werten größer dem Mittelwert hin orientiert. Eine negative Schiefe zeigt eine Verteilung an, deren Gipfel sich tendenziell zu Werten kleiner dem Mittelwert hin orientiert.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/skew-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Zahl1 ist erforderlich, nachfolgende Nummern sind optional. 1 bis 255 Argumente, für die Sie die Schiefe berechnen möchten. Anstelle der durch Semikolons voneinander getrennten Argumente können Sie auch eine Matrix oder einen Bezug auf eine Matrix angeben."
			},
			number2: {
				name: "number2",
				detail: "Zahl1 ist erforderlich, nachfolgende Nummern sind optional. 1 bis 255 Argumente, für die Sie die Schiefe berechnen möchten. Anstelle der durch Semikolons voneinander getrennten Argumente können Sie auch eine Matrix oder einen Bezug auf eine Matrix angeben."
			}
		}
	},
	SKEW_P: {
		description: "Gibt die Schiefe einer Verteilung auf der Basis einer Grundgesamtheit zurück: eine Charakterisierung des Asymmetriegrads einer Verteilung um ihren Mittelwert.",
		abstract: "Gibt die Schiefe einer Verteilung auf der Basis einer Grundgesamtheit zurück: eine Charakterisierung des Asymmetriegrads einer Verteilung um ihren Mittelwert.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/skew-p-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Die erste Zahl, der erste Zellbezug oder Bereich, für die bzw. den Sie die Schiefe berechnen möchten."
			},
			number2: {
				name: "number2",
				detail: "Weitere Zahlen, Zellbezüge oder Bereiche, für die bzw. den Sie die Schiefe berechnen möchten, bis zu maximal 255."
			}
		}
	},
	SLOPE: {
		description: "Gibt die Steigung der Regressionsgeraden zurück, die an die in Y_Werte und X_Werte abgelegten Datenpunkte angepasst ist. Die Steigung entspricht dem Quotienten aus dem jeweiligen vertikalen und dem horizontalen Abstand zweier beliebiger Punkte der Geraden und ist ein Maß für die Änderung entlang der Regressionsgeraden.",
		abstract: "Gibt die Steigung der Regressionsgeraden zurück, die an die in Y_Werte und X_Werte abgelegten Datenpunkte angepasst ist. Die Steigung entspricht dem Quotienten aus dem jeweiligen vertikalen und dem horizontalen Abstand zweier beliebiger Punkte der Geraden und ist ein Maß für die Änderung entlang der Regressionsgeraden.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/slope-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Erforderlich. Eine Matrix oder ein Zellbereich numerisch abhängiger Datenpunkte"
			},
			knownXs: {
				name: "known_x's",
				detail: "Erforderlich. Eine Reihe unabhängiger Datenpunkte"
			}
		}
	},
	SMALL: {
		description: "Gibt den k-kleinsten Wert einer Datengruppe zurück. Mit dieser Funktion können Sie Werte ermitteln, die innerhalb einer Datenmenge eine bestimmte relative Größe haben.",
		abstract: "Gibt den k-kleinsten Wert einer Datengruppe zurück. Mit dieser Funktion können Sie Werte ermitteln, die innerhalb einer Datenmenge eine bestimmte relative Größe haben.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/small-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Erforderlich. Eine Matrix oder ein Bereich von numerischen Daten, deren k-kleinsten Wert Sie bestimmen möchten"
			},
			k: {
				name: "k",
				detail: "Erforderlich. Der Rang des Elements einer Matrix oder eines Zellbereichs, dessen Wert zurückgegeben werden soll"
			}
		}
	},
	STANDARDIZE: {
		description: "Gibt den standardisierten Wert einer Verteilung zurück, die durch Mittelwert und Standabwn charakterisiert ist.",
		abstract: "Gibt den standardisierten Wert einer Verteilung zurück, die durch Mittelwert und Standabwn charakterisiert ist.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/standardize-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Erforderlich. Der Wert, den Sie standardisieren möchten"
			},
			mean: {
				name: "mean",
				detail: "Erforderlich. Das arithmetische Mittel der Verteilung"
			},
			standardDev: {
				name: "standard_dev",
				detail: "Erforderlich. Die Standardabweichung der Verteilung"
			}
		}
	},
	STDEV_P: {
		description: "Die Standardabweichung ist ein Maß für die Streuung von Werten bezüglich ihres Mittelwerts (dem Durchschnitt).",
		abstract: "Die Standardabweichung ist ein Maß für die Streuung von Werten bezüglich ihres Mittelwerts (dem Durchschnitt).",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/stdev-p-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Erforderlich. Das erste numerische Argument, das einer Grundgesamtheit entspricht"
			},
			number2: {
				name: "number2",
				detail: "Optional. 1 bis 254 numerische Argumente, die einer Grundgesamtheit entsprechen. Anstelle der durch Semikolons voneinander getrennten Argumente können Sie auch eine Matrix oder einen Bezug auf eine Matrix angeben."
			}
		}
	},
	STDEV_S: {
		description: "Die Standardabweichung ist ein Maß für die Streuung von Werten bezüglich ihres Mittelwerts (dem Durchschnitt).",
		abstract: "Die Standardabweichung ist ein Maß für die Streuung von Werten bezüglich ihres Mittelwerts (dem Durchschnitt).",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/stdev-s-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Erforderlich. Das erste numerische Argument, das einer Stichprobe einer Grundgesamtheit entspricht. Anstelle der durch Semikolons voneinander getrennten Argumente können Sie auch eine Matrix oder einen Bezug auf eine Matrix angeben."
			},
			number2: {
				name: "number2",
				detail: "Optional. 2 bis 254 numerische Argumente, die einer Stichprobe einer Grundgesamtheit entsprechen. Anstelle der durch Semikolons voneinander getrennten Argumente können Sie auch eine Matrix oder einen Bezug auf eine Matrix angeben."
			}
		}
	},
	STDEVA: {
		description: "Schätzt die Standardabweichung ausgehend von einer Stichprobe. Die Standardabweichung ist ein Maß dafür, wie weit die jeweiligen Werte um den Mittelwert (Durchschnitt) streuen.",
		abstract: "Schätzt die Standardabweichung ausgehend von einer Stichprobe. Die Standardabweichung ist ein Maß dafür, wie weit die jeweiligen Werte um den Mittelwert (Durchschnitt) streuen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/stdeva-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Wert1 ist erforderlich, nachfolgende Werte sind optional. 1 bis 255 Werte, die einer Stichprobe einer Grundgesamtheit entsprechen. Anstelle der durch Semikolons voneinander getrennten Argumente können Sie auch eine Matrix oder einen Bezug auf eine Matrix angeben."
			},
			value2: {
				name: "value2",
				detail: "Wert1 ist erforderlich, nachfolgende Werte sind optional. 1 bis 255 Werte, die einer Stichprobe einer Grundgesamtheit entsprechen. Anstelle der durch Semikolons voneinander getrennten Argumente können Sie auch eine Matrix oder einen Bezug auf eine Matrix angeben."
			}
		}
	},
	STDEVPA: {
		description: "Berechnet die Standardabweichung ausgehend von einer als Argumente angegebenen Grundgesamtheit, einschließlich Text und Wahrheitswerte. Die Standardabweichung ist ein Maß für die Streuung von Werten bezüglich ihres Mittelwerts (dem Durchschnitt).",
		abstract: "Berechnet die Standardabweichung ausgehend von einer als Argumente angegebenen Grundgesamtheit, einschließlich Text und Wahrheitswerte. Die Standardabweichung ist ein Maß für die Streuung von Werten bezüglich ihres Mittelwerts (dem Durchschnitt).",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/stdevpa-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Wert1 ist erforderlich, nachfolgende Werte sind optional. 1 bis 255 Werte, die einer Population entsprechen. Anstelle der durch Semikolons voneinander getrennten Argumente können Sie auch eine Matrix oder einen Bezug auf eine Matrix angeben."
			},
			value2: {
				name: "value2",
				detail: "Wert1 ist erforderlich, nachfolgende Werte sind optional. 1 bis 255 Werte, die einer Population entsprechen. Anstelle der durch Semikolons voneinander getrennten Argumente können Sie auch eine Matrix oder einen Bezug auf eine Matrix angeben."
			}
		}
	},
	STEYX: {
		description: "Gibt den Standardfehler der geschätzten y-Werte für alle x-Werte der Regression zurück. Der Standardfehler ist ein Maß dafür, wie groß der Fehler bei der Prognose (Vorhersage) des zu einem x-Wert gehörenden y-Werts ist.",
		abstract: "Gibt den Standardfehler der geschätzten y-Werte für alle x-Werte der Regression zurück. Der Standardfehler ist ein Maß dafür, wie groß der Fehler bei der Prognose (Vorhersage) des zu einem x-Wert gehörenden y-Werts ist.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/steyx-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Erforderlich. Eine Matrix oder ein Bereich abhängiger Datenpunkte"
			},
			knownXs: {
				name: "known_x's",
				detail: "Erforderlich. Eine Matrix oder ein Bereich unabhängiger Datenpunkte"
			}
		}
	},
	T_DIST: {
		description: "Gibt die linksseitige Student-t-Verteilung zurück. Die t-Verteilung wird in der Hypothesenüberprüfung von kleinen Beispieldatasets verwendet. Verwenden Sie diese Funktion anstelle einer Tabelle mit kritischen Werten für die t-Verteilung.",
		abstract: "Gibt die linksseitige Student-t-Verteilung zurück. Die t-Verteilung wird in der Hypothesenüberprüfung von kleinen Beispieldatasets verwendet. Verwenden Sie diese Funktion anstelle einer Tabelle mit kritischen Werten für die t-Verteilung.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/t-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Erforderlich. Der numerische Wert, für den die Verteilung ausgewertet werden soll"
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Erforderlich. Eine ganze Zahl, mit der die Anzahl der Freiheitsgrade angegeben wird"
			},
			cumulative: {
				name: "cumulative",
				detail: "Erforderlich. Ein logischer Wert, der die Form der Funktion bestimmt. Wenn kumulativ TRUE ist, gibt T.DIST die kumulierte Verteilungsfunktion zurück. Wenn FALSE, wird die Wahrscheinlichkeitsdichtefunktion zurückgegeben."
			}
		}
	},
	T_DIST_2T: {
		description: "Die (Student) t-Verteilung wird für das Testen von Hypothesen bei kleinem Stichprobenumfang verwendet. Verwenden Sie diese Funktion anstelle einer Tabelle mit kritischen Werten für die t-Verteilung.",
		abstract: "Die (Student) t-Verteilung wird für das Testen von Hypothesen bei kleinem Stichprobenumfang verwendet. Verwenden Sie diese Funktion anstelle einer Tabelle mit kritischen Werten für die t-Verteilung.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/t-dist-2t-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Erforderlich. Der numerische Wert, für den die Verteilung ausgewertet werden soll"
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Erforderlich. Eine ganze Zahl, mit der die Anzahl der Freiheitsgrade angegeben wird"
			}
		}
	},
	T_DIST_RT: {
		description: "Die t-Verteilung wird für das Testen von Hypothesen bei kleinem Stichprobenumfang verwendet. Verwenden Sie diese Funktion anstelle einer Tabelle mit kritischen Werten für die t-Verteilung.",
		abstract: "Die t-Verteilung wird für das Testen von Hypothesen bei kleinem Stichprobenumfang verwendet. Verwenden Sie diese Funktion anstelle einer Tabelle mit kritischen Werten für die t-Verteilung.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/t-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Erforderlich. Der numerische Wert, für den die Verteilung ausgewertet werden soll"
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Erforderlich. Eine ganze Zahl, mit der die Anzahl der Freiheitsgrade angegeben wird"
			}
		}
	},
	T_INV: {
		description: "Gibt die Umkehrfunktion der Wahrscheinlichkeit für die Studentsche t-Verteilung zurück.",
		abstract: "Gibt die Umkehrfunktion der Wahrscheinlichkeit für die Studentsche t-Verteilung zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/t-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "Wahrscheinlichkeit",
				detail: "Erforderlich. Die der Student-t-Verteilung zugeordnete Wahrscheinlichkeit."
			},
			degFreedom: {
				name: "Deg_freedom",
				detail: "Erforderlich. Die Anzahl der Freiheitsgrade, durch die die Verteilung bestimmt ist."
			}
		}
	},
	T_INV_2T: {
		description: "Gibt zweiseitige Quantile der (Student) t-Verteilung zurück.",
		abstract: "Gibt zweiseitige Quantile der (Student) t-Verteilung zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/t-inv-2t-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Erforderlich. Die der (Student) t-Verteilung zugeordnete Wahrscheinlichkeit"
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Erforderlich. Die Anzahl der Freiheitsgrade, durch die die Verteilung bestimmt ist"
			}
		}
	},
	T_TEST: {
		description: "Gibt die Teststatistik eines Student'schen t-Tests zurück. Mithilfe von T.TEST können Sie testen, ob zwei Stichproben aus zwei Grundgesamtheiten mit demselben Mittelwert stammen.",
		abstract: "Gibt die Teststatistik eines Student'schen t-Tests zurück. Mithilfe von T.TEST können Sie testen, ob zwei Stichproben aus zwei Grundgesamtheiten mit demselben Mittelwert stammen.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/t-test-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Erforderlich. Das erste Dataset"
			},
			array2: {
				name: "array2",
				detail: "Erforderlich. Das zweite Dataset"
			},
			tails: {
				name: "tails",
				detail: "Erforderlich. Gibt die Anzahl der Verteilungsfragmente an. Wenn Tails = 1 ist, verwendet T.TEST die einseitige Verteilung. Wenn Tails = 2 ist, verwendet T.TEST die zweiseitige Verteilung."
			},
			type: {
				name: "type",
				detail: "Erforderlich. Der Typ des durchzuführenden t-Tests"
			}
		}
	},
	TREND: {
		description: "Die TREND-Funktion gibt Werte entlang eines linearen Trends zurück. Es passt eine gerade Linie (mit der Methode der geringsten Quadrate) an die known_y und known_x des Arrays. TREND gibt die y-Werte entlang dieser Zeile für das Array von new_x zurück, das Sie angeben.",
		abstract: "Die TREND-Funktion gibt Werte entlang eines linearen Trends zurück. Es passt eine gerade Linie (mit der Methode der geringsten Quadrate) an die known_y und known_x des Arrays. TREND gibt die y-Werte entlang dieser Zeile für das Array von new_x zurück, das Sie angeben.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/trend-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Der Satz von y-Werten, den Sie bereits in der Beziehung y = mx + b kennen Besteht die Matrix Y_Werte aus nur einer Spalte, wird jede Spalte der Matrix X_Werte als eigenständige Variable interpretiert. Besteht die Matrix Y_Werte aus nur einer Zeile, wird jede Zeile der Matrix X_Werte als eigenständige Variable interpretiert."
			},
			knownXs: {
				name: "known_x's",
				detail: "Ein optionaler Satz von X-Werten, den Sie möglicherweise bereits in der Beziehung y = mx + b kennen Die Matrix X_Werte kann eine oder mehrere Gruppen von Variablen umfassen. Wird nur eine Variable verwendet, können Y_Werte und X_Werte Bereiche beliebiger Form sein, solange sie dieselben Dimensionen haben. Werden mehrere Variablen verwendet, muss Y_Werte ein Vektor sein (das heißt ein Bereich, der aus nur einer Zeile oder nur einer Spalte besteht). Fehlt die Matrix X_Werte, wird an ihrer Stelle die Matrix {1.2.3...} angenommen, die genauso viele Elemente wie Y_Werte enthält."
			},
			newXs: {
				name: "new_x's",
				detail: "Neue x-Werte, für die TREND die entsprechenden y-Werte zurückgeben soll Analog zur Matrix X_Werte muss auch Neue_x_Werte für jede unabhängige Variable eine eigene Spalte (oder Zeile) bereitstellen. Daher müssen die Matrizen X_Werte und Neue_x_Werte gleich viele Spalten haben, wenn Y_Werte sich in einer einzelnen Spalte befindet. Befindet sich Y_Werte in einer einzelnen Zeile, müssen die Matrizen X_Werte und Neue_x_Werte gleich viele Zeilen haben. Fehlt die Matrix Neue_x_Werte, wird angenommen, dass sie mit der Matrix X_Werte identisch ist. Fehlt sowohl die Matrix X_Werte als auch die Matrix Neue_x_Werte, werden diese als die Matrix {1;2;3;...} angenommen, die genauso viele Elemente wie die Matrix Y_Werte enthält."
			},
			constb: {
				name: "const",
				detail: "Ein logischer Wert, der angibt, ob die Konstante b auf 0 festgelegt werden soll. Ist Konstante mit WAHR belegt oder nicht angegeben, wird b normal berechnet. Ist Konstante mit FALSCH belegt, wird b gleich 0 (Null) gesetzt und m so angepasst, dass y = mx gilt."
			}
		}
	},
	TRIMMEAN: {
		description: "Gibt den Mittelwert einer Datengruppe zurück, ohne die Randwerte zu berücksichtigen. GESTUTZTMITTEL berechnet den Mittelwert einer Teilmenge der Datenpunkte, die darauf basiert, dass entsprechend des jeweils angegebenen Prozentsatzes die kleinsten und größten Werte der ursprünglichen Datenpunkte ausgeschlossen werden. Diese Funktion können Sie immer dann verwenden, wenn bei der Auswertung keine Daten berücksichtigt werden sollen, die als Ausreißer anzusehen sind.",
		abstract: "Gibt den Mittelwert einer Datengruppe zurück, ohne die Randwerte zu berücksichtigen. GESTUTZTMITTEL berechnet den Mittelwert einer Teilmenge der Datenpunkte, die darauf basiert, dass entsprechend des jeweils angegebenen Prozentsatzes die kleinsten und größten Werte der ursprünglichen Datenpunkte ausgeschlossen werden. Diese Funktion können Sie immer dann verwenden, wenn bei der Auswertung keine Daten berücksichtigt werden sollen, die als Ausreißer anzusehen sind.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/trimmean-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Erforderlich. Eine Matrix oder Gruppe von Werten, die ohne ihre Ausreißer gemittelt wird."
			},
			percent: {
				name: "percent",
				detail: "Erforderlich. Die Bruchzahl der Datenpunkte, die aus der Berechnung ausgeschlossen werden sollen. Wenn beispielsweise Prozent = 0,2 ist, werden vier Punkte aus einem Dataset von 20 Punkten (20 x 0,2) gekürzt: 2 von oben und 2 vom unteren Rand des Satzes."
			}
		}
	},
	VAR_P: {
		description: "Berechnet die Varianz ausgehend von der Grundgesamtheit (logische Werte und Text werden ignoriert).",
		abstract: "Berechnet die Varianz ausgehend von der Grundgesamtheit (logische Werte und Text werden ignoriert).",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/var-p-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Erforderlich. Das erste numerische Argument, das einer Grundgesamtheit entspricht"
			},
			number2: {
				name: "number2",
				detail: "Optional. 2 bis 254 numerische Argumente, die einer Grundgesamtheit entsprechen"
			}
		}
	},
	VAR_S: {
		description: "Schätzt die Varianz ausgehend von einer Stichprobe (logische Werte und Text werden in der Stichprobe ignoriert).",
		abstract: "Schätzt die Varianz ausgehend von einer Stichprobe (logische Werte und Text werden in der Stichprobe ignoriert).",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/var-s-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Erforderlich. Das erste numerische Argument, das einer Stichprobe einer Grundgesamtheit entspricht."
			},
			number2: {
				name: "number2",
				detail: "Optional. 2 bis 254 numerische Argumente, die einer Stichprobe einer Grundgesamtheit entsprechen"
			}
		}
	},
	VARA: {
		description: "Schätzt die Varianz auf der Basis einer Stichprobe.",
		abstract: "Schätzt die Varianz auf der Basis einer Stichprobe.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/vara-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Wert1 ist erforderlich, nachfolgende Werte sind optional. 1 bis 255 Wertargumente, die einer Stichprobe einer Grundgesamtheit entsprechen."
			},
			value2: {
				name: "value2",
				detail: "Wert1 ist erforderlich, nachfolgende Werte sind optional. 1 bis 255 Wertargumente, die einer Stichprobe einer Grundgesamtheit entsprechen."
			}
		}
	},
	VARPA: {
		description: "Berechnet die Varianz ausgehend von der Grundgesamtheit.",
		abstract: "Berechnet die Varianz ausgehend von der Grundgesamtheit.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/varpa-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Wert1 ist erforderlich, nachfolgende Werte sind optional. 1 bis 255 Wertargumente, die einer Grundgesamtheit entsprechen."
			},
			value2: {
				name: "value2",
				detail: "Wert1 ist erforderlich, nachfolgende Werte sind optional. 1 bis 255 Wertargumente, die einer Grundgesamtheit entsprechen."
			}
		}
	},
	WEIBULL_DIST: {
		description: "Gibt die Weibull-Verteilung zurück.",
		abstract: "Gibt die Weibull-Verteilung zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/weibull-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Der Wert, für den Sie die Verteilung berechnen möchten."
			},
			alpha: {
				name: "alpha",
				detail: "Ein Parameter der Verteilung."
			},
			beta: {
				name: "beta",
				detail: "Ein Parameter der Verteilung."
			},
			cumulative: {
				name: "cumulative",
				detail: "Ein Wahrheitswert, der die Form der Funktion bestimmt. Ist cumulative TRUE, gibt WEIBULL.DIST die kumulative Verteilungsfunktion zurück; ist cumulative FALSE, die Wahrscheinlichkeitsdichtefunktion."
			}
		}
	},
	Z_TEST: {
		description: "Beispiele für die Verwendung von G.TEST in einer Formel zur Berechnung eines zweiseitigen Wahrscheinlichkeitswerts finden Sie unten im Abschnitt \"Hinweise\".",
		abstract: "Beispiele für die Verwendung von G.TEST in einer Formel zur Berechnung eines zweiseitigen Wahrscheinlichkeitswerts finden Sie unten im Abschnitt \"Hinweise\".",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/z-test-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Erforderlich. Die Matrix (Array) oder der Datenbereich, gegen die/den Sie x testen möchten."
			},
			x: {
				name: "x",
				detail: "Erforderlich. Der zu testende Wert"
			},
			sigma: {
				name: "sigma",
				detail: "Optional. Die bekannte Standardabweichung der Grundgesamtheit. Ohne Angabe wird die Beispielstandardabweichung verwendet."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/text/de-DE.ts
const locale$3 = {
	ASC: {
		description: "Für Sprachen mit einem Double-Byte-Zeichensatz (DBCS) werden in dieser Funktion Zeichen normaler Breite (Double-Byte-Zeichen) in Zeichen halber Breite (Single-Byte-Zeichen) umgewandelt.",
		abstract: "Für Sprachen mit einem Double-Byte-Zeichensatz (DBCS) werden in dieser Funktion Zeichen normaler Breite (Double-Byte-Zeichen) in Zeichen halber Breite (Single-Byte-Zeichen) umgewandelt.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/asc-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Erforderlich. Der Text oder der Bezug auf eine Zelle, die den Text enthält, den Sie ändern möchten. Enthält dieser Text keinen Buchstaben normaler Breite, so wird er nicht geändert."
		} }
	},
	ARRAYTOTEXT: {
		description: "Die MATRIXZUTEXT-Funktion gibt ein Array von Textwerten aus einem beliebigen angegebenen Bereich zurück. Er übergibt Textwerte unverändert und wandelt nicht Textwerte in Text um.",
		abstract: "Die MATRIXZUTEXT-Funktion gibt ein Array von Textwerten aus einem beliebigen angegebenen Bereich zurück. Er übergibt Textwerte unverändert und wandelt nicht Textwerte in Text um.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/arraytotext-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Die Matrix, die als Text zurückgegeben werden soll. Erforderlich."
			},
			format: {
				name: "format",
				detail: "Das Format der zurückgegebenen Daten. Optional. Es kann sich um einen von zwei Werten handeln: 0 Standardwert. Übersichtliches Format, das einfach zu lesen ist. Der zurückgegebene Text ist derselbe wie der Text, der in einer Zelle dargestellt wird, auf die die allgemeine Formatierung angewendet wurde. 1 Strenges Format, das Escapezeichen und Zeilentrennzeichen enthält. Generiert eine Zeichenfolge, die in der Bearbeitungsleiste eingegeben werden kann. Kapselt zurückgegebene Zeichenfolgen in Anführungszeichen mit Ausnahme von booleschen Werten, Zahlen und Fehlern."
			}
		}
	},
	BAHTTEXT: {
		description: "Wandelt eine Zahl in Thai-Text um und fügt ein Suffix \"Baht\" hinzu.",
		abstract: "Wandelt eine Zahl in Thai-Text um und fügt ein Suffix \"Baht\" hinzu.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/bahttext-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich. Eine Zahl, die Sie in Text konvertieren möchten, oder ein Bezug auf eine Zelle, die eine Zahl enthält, oder eine Formel, deren Ergebnis eine Zahl ist."
		} }
	},
	CHAR: {
		description: "Gibt das der Codezahl entsprechende Zeichen zurück. Verwenden Sie ZEICHEN, um Seitenzahlen in einer anderen Codierung, die Sie aus Dateien erhalten, die auf Computern anderen Typs erstellt wurden, in Zeichen umzuwandeln.",
		abstract: "Gibt das der Codezahl entsprechende Zeichen zurück. Verwenden Sie ZEICHEN, um Seitenzahlen in einer anderen Codierung, die Sie aus Dateien erhalten, die auf Computern anderen Typs erstellt wurden, in Zeichen umzuwandeln.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/char-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich. Eine Zahl von 1 bis 255, die das von Ihnen gewünschte Zeichen angibt. Das jeweilige Zeichen ist Bestandteil des Zeichensatzes, der auf Ihrem Computer verwendet wird. Hinweis Excel für das Web unterstützt nur CHAR(9), CHAR(10), CHAR(13) und CHAR(32) und höher."
		} }
	},
	CLEAN: {
		description: "Löscht alle nicht druckbaren Zeichen aus einem Text. Verwenden Sie SÄUBERN für Texte, die aus anderen Anwendungsprogrammen importiert wurden und eventuell Zeichen enthalten, die das von Ihnen verwendete Betriebssystem nicht drucken kann. Beispielsweise können Sie SÄUBERN dazu verwenden, Code zu entfernen, der sich häufig am Anfang und Ende einer Datendatei befindet und nicht gedruckt werden kann.",
		abstract: "Löscht alle nicht druckbaren Zeichen aus einem Text. Verwenden Sie SÄUBERN für Texte, die aus anderen Anwendungsprogrammen importiert wurden und eventuell Zeichen enthalten, die das von Ihnen verwendete Betriebssystem nicht drucken kann. Beispielsweise können Sie SÄUBERN dazu verwenden, Code zu entfernen, der sich häufig am Anfang und Ende einer Datendatei befindet und nicht gedruckt werden kann.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/clean-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Erforderlich. Beliebige Arbeitsblattinformation, aus der Sie die nicht druckbaren Zeichen entfernen möchten."
		} }
	},
	CODE: {
		description: "Gibt die Codezahl des ersten Zeichens in einem Text zurück. Die ausgegebene Codezahl entspricht dem Zeichensatz, mit dem Ihr Computer arbeitet.",
		abstract: "Gibt die Codezahl des ersten Zeichens in einem Text zurück. Die ausgegebene Codezahl entspricht dem Zeichensatz, mit dem Ihr Computer arbeitet.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/code-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Erforderlich. Der Text, für den Sie die Codezahl des ersten Zeichens bestimmen möchten."
		} }
	},
	CONCAT: {
		description: "Die CONCAT-Funktion kombiniert den Text aus mehreren Bereichen und/oder Zeichenfolgen, stellt jedoch keine Trennzeichen oder IgnoreEmpty-Argumente bereit.",
		abstract: "Die CONCAT-Funktion kombiniert den Text aus mehreren Bereichen und/oder Zeichenfolgen, stellt jedoch keine Trennzeichen oder IgnoreEmpty-Argumente bereit.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/concat-function"
		}],
		functionParameter: {
			text1: {
				name: "text1",
				detail: "Das zu verkettende Textelement. Eine Zeichenfolge oder ein Array von Zeichenfolgen, wie z. B. ein Zellbereich."
			},
			text2: {
				name: "text2",
				detail: "Weitere zu verkettende Textelemente. Für die Textelemente sind maximal 253 Textargumente zulässig. Dabei kann es sich jeweils um eine Zeichenfolge oder ein Array von Zeichenfolgen, wie z. B. um einen Zellbereich, handeln."
			}
		}
	},
	CONCATENATE: {
		description: "Verwenden Sie VERKETTEN , also ein der Textfunktionen , um zwei der mehr Zeichenfolgen zu einer Zeichenfolge zu verbinden.",
		abstract: "Verwenden Sie VERKETTEN , also ein der Textfunktionen , um zwei der mehr Zeichenfolgen zu einer Zeichenfolge zu verbinden.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/concatenate-function"
		}],
		functionParameter: {
			text1: {
				name: "text1",
				detail: "Das erste zu verknüpfende Element. Es kann ein Textwert, eine Zahl oder ein Zellbezug sein."
			},
			text2: {
				name: "text2",
				detail: "Weitere zu verknüpfende Textelemente. Sie können bis zu 255 Elemente mit insgesamt bis zu 8.192 Zeichen verwenden."
			}
		}
	},
	DBCS: {
		description: "Die unter diesem Hilfethema beschriebene Funktion konvertiert Buchstaben mit halber Breite (Single-Byte) in einer Zeichenfolge in Zeichen mit normaler Breite (Double-Byte). Der Name der Funktion (sowie die von ihr konvertierten Zeichen) hängt von den Ländereinstellungen ab.",
		abstract: "Die unter diesem Hilfethema beschriebene Funktion konvertiert Buchstaben mit halber Breite (Single-Byte) in einer Zeichenfolge in Zeichen mit normaler Breite (Double-Byte). Der Name der Funktion (sowie die von ihr konvertierten Zeichen) hängt von den Ländereinstellungen ab.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/dbcs-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Erforderlich. Der Text oder der Bezug auf eine Zelle, die den Text enthält, den Sie ändern möchten. Enthält dieser Text keine lateinischen Buchstaben oder Katakana halber Breite, so wird er nicht geändert."
		} }
	},
	DOLLAR: {
		description: "Die DOLLAR-Funktion , eine der TEXT-Funktionen , konvertiert eine Zahl im Währungsformat in Text, wobei die Dezimalstellen auf die von Ihnen angegebene Anzahl von Stellen gerundet werden. DOLLAR verwendet $#,###0.00_); ($#,###0,00) Zahlenformat, obwohl das angewendete Währungssymbol von Ihren Lokalen Spracheinstellungen abhängt.",
		abstract: "Die DOLLAR-Funktion , eine der TEXT-Funktionen , konvertiert eine Zahl im Währungsformat in Text, wobei die Dezimalstellen auf die von Ihnen angegebene Anzahl von Stellen gerundet werden. DOLLAR verwendet $#,###0.00_); ($#,###0,00) Zahlenformat, obwohl das angewendete Währungssymbol von Ihren Lokalen Spracheinstellungen abhängt.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/dollar-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Eine Zahl, ein Bezug auf eine Zelle, die eine Zahl enthält, oder eine Formel, die zu einer Zahl ausgewertet wird."
			},
			decimals: {
				name: "decimals",
				detail: "Optional. Die Anzahl der Ziffern rechts vom Dezimalkomma Wenn dies negativ ist, wird die Zahl links vom Dezimaltrennzeichen gerundet. Fehlt das Argument Dezimalstellen, wird es als 2 angenommen."
			}
		}
	},
	EXACT: {
		description: "Vergleicht zwei Textzeichenfolgen und gibt TRUE zurück, wenn sie genau identisch sind, andernfalls FALSE. Bei IDENTISCH wird die Groß-/Kleinschreibung beachtet, formatierungsbezogene Unterschiede werden jedoch ignoriert. Verwenden Sie EXACT, um zu testen, ob Text in ein Dokument eingegeben wird.",
		abstract: "Vergleicht zwei Textzeichenfolgen und gibt TRUE zurück, wenn sie genau identisch sind, andernfalls FALSE. Bei IDENTISCH wird die Groß-/Kleinschreibung beachtet, formatierungsbezogene Unterschiede werden jedoch ignoriert. Verwenden Sie EXACT, um zu testen, ob Text in ein Dokument eingegeben wird.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/exact-function"
		}],
		functionParameter: {
			text1: {
				name: "text1",
				detail: "Erforderlich. Die erste Zeichenfolge."
			},
			text2: {
				name: "text2",
				detail: "Erforderlich. Die zweite Zeichenfolge."
			}
		}
	},
	FIND: {
		description: "Sucht eine Textzeichenfolge innerhalb einer anderen (Groß-/Kleinschreibung wird beachtet).",
		abstract: "Sucht eine Textzeichenfolge innerhalb einer anderen (Groß-/Kleinschreibung wird beachtet).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/this-article-has-been-retired"
		}],
		functionParameter: {
			findText: {
				name: "find_text",
				detail: "Der Text, den Sie suchen möchten."
			},
			withinText: {
				name: "within_text",
				detail: "Der Text, der den zu suchenden Text enthält."
			},
			startNum: {
				name: "start_num",
				detail: "Gibt das Zeichen an, an dem die Suche beginnt. Wenn start_num weggelassen wird, wird 1 angenommen."
			}
		}
	},
	FINDB: {
		description: "Sucht eine Textzeichenfolge innerhalb einer anderen (Groß-/Kleinschreibung wird beachtet).",
		abstract: "Sucht eine Textzeichenfolge innerhalb einer anderen (Groß-/Kleinschreibung wird beachtet).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/this-article-has-been-retired"
		}],
		functionParameter: {
			findText: {
				name: "find_text",
				detail: "Der Text, den Sie suchen möchten."
			},
			withinText: {
				name: "within_text",
				detail: "Der Text, der den zu suchenden Text enthält."
			},
			startNum: {
				name: "start_num",
				detail: "Gibt das Zeichen an, an dem die Suche beginnt. Wenn start_num weggelassen wird, wird 1 angenommen."
			}
		}
	},
	FIXED: {
		description: "Formatiert eine Zahl als Text mit einer festen Anzahl von Nachkommastellen.",
		abstract: "Formatiert eine Zahl als Text mit einer festen Anzahl von Nachkommastellen.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/fixed-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Erforderlich. Die Zahl, die Sie runden und in Text umwandeln möchten"
			},
			decimals: {
				name: "decimals",
				detail: "Optional. Die Anzahl der Ziffern rechts vom Dezimalkomma"
			},
			noCommas: {
				name: "no_commas",
				detail: "Optional. Ein logischer Wert, der bei TRUE verhindert, dass FIXED Kommas in den zurückgegebenen Text einschließt."
			}
		}
	},
	LEFT: {
		description: "Gibt die am weitesten links stehenden Zeichen eines Textwerts zurück.",
		abstract: "Gibt die am weitesten links stehenden Zeichen eines Textwerts zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/left-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Die Textzeichenfolge mit den Zeichen, die Sie extrahieren möchten."
			},
			numChars: {
				name: "num_chars",
				detail: "Gibt die Anzahl der Zeichen an, die LEFT extrahieren soll."
			}
		}
	},
	LEFTB: {
		description: "Gibt die am weitesten links stehenden Zeichen eines Textwerts zurück.",
		abstract: "Gibt die am weitesten links stehenden Zeichen eines Textwerts zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/left-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Die Textzeichenfolge mit den Zeichen, die Sie extrahieren möchten."
			},
			numBytes: {
				name: "num_bytes",
				detail: "Gibt die Anzahl der Zeichen an, die LEFTB auf Bytebasis extrahieren soll."
			}
		}
	},
	LEN: {
		description: "Gibt die Anzahl der Zeichen in einer Textzeichenfolge zurück.",
		abstract: "Gibt die Anzahl der Zeichen in einer Textzeichenfolge zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/len-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Der Text, dessen Länge Sie ermitteln möchten. Leerzeichen zählen als Zeichen."
		} }
	},
	LENB: {
		description: "Gibt die Anzahl der Bytes zurück, mit denen die Zeichen in einer Textzeichenfolge dargestellt werden.",
		abstract: "Gibt die Anzahl der Bytes zurück, mit denen die Zeichen in einer Textzeichenfolge dargestellt werden.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/len-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Der Text, dessen Länge Sie ermitteln möchten. Leerzeichen zählen als Zeichen."
		} }
	},
	LOWER: {
		description: "Wandelt einen Text in Kleinbuchstaben um.",
		abstract: "Wandelt einen Text in Kleinbuchstaben um.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/lower-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Erforderlich. Der Text, den Sie in Kleinbuchstaben umwandeln möchten. \"KLEIN\" nimmt an Zeichen des Texts, die keine Buchstaben sind, keine Änderungen vor."
		} }
	},
	MID: {
		description: "Gibt eine bestimmte Anzahl von Zeichen aus einer Textzeichenfolge zurück, beginnend an der angegebenen Position.",
		abstract: "Gibt eine bestimmte Anzahl von Zeichen aus einer Textzeichenfolge zurück, beginnend an der angegebenen Position.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/mid-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Die Textzeichenfolge mit den Zeichen, die Sie extrahieren möchten."
			},
			startNum: {
				name: "start_num",
				detail: "Die Position des ersten Zeichens in text, das Sie extrahieren möchten."
			},
			numChars: {
				name: "num_chars",
				detail: "Gibt die Anzahl der Zeichen an, die MID extrahieren soll."
			}
		}
	},
	MIDB: {
		description: "Gibt eine bestimmte Anzahl von Zeichen aus einer Textzeichenfolge zurück, beginnend an der angegebenen Position.",
		abstract: "Gibt eine bestimmte Anzahl von Zeichen aus einer Textzeichenfolge zurück, beginnend an der angegebenen Position.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/mid-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Die Textzeichenfolge mit den Zeichen, die Sie extrahieren möchten."
			},
			startNum: {
				name: "start_num",
				detail: "Die Position des ersten Zeichens in text, das Sie extrahieren möchten."
			},
			numBytes: {
				name: "num_bytes",
				detail: "Gibt die Anzahl der Zeichen an, die MIDB auf Bytebasis extrahieren soll."
			}
		}
	},
	NUMBERSTRING: {
		description: "Konvertiert Zahlen in chinesische Zeichenfolgen.",
		abstract: "Konvertiert Zahlen in chinesische Zeichenfolgen.",
		links: [{
			title: "Instruction",
			url: "https://www.wps.cn/learning/course/detail/id/340.html?chan=pc_kdocs_function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Der Wert, der in eine chinesische Zeichenfolge umgewandelt wird."
			},
			type: {
				name: "type",
				detail: "Der Typ des zurückgegebenen Ergebnisses. \n1. Chinesische Kleinbuchstaben \n2. Chinesische Großbuchstaben \n3. Chinesische Schriftzeichen zum Lesen und Schreiben"
			}
		}
	},
	NUMBERVALUE: {
		description: "Konvertiert Text in Zahlen auf eine Weise, die vom Gebietsschema unabhängig ist.",
		abstract: "Konvertiert Text in Zahlen auf eine Weise, die vom Gebietsschema unabhängig ist.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/numbervalue-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Erforderlich. Der in eine Zahl zu konvertierende Text."
			},
			decimalSeparator: {
				name: "decimal_separator",
				detail: "Optional. Das Zeichen, das zum Trennen der ganzen Zahl von den Nachkommastellen des Ergebnisses verwendet wird."
			},
			groupSeparator: {
				name: "group_separator",
				detail: "Optional. Das Zeichen, das zum Trennen von Zahlengruppen verwendet wird, z. B. zwischen Tausender und Hunderter oder zwischen Millionen und Tausender."
			}
		}
	},
	PHONETIC: {
		description: "Extrahiert die phonetischen (Furigana-) Zeichen aus einer Textzeichenfolge.",
		abstract: "Extrahiert die phonetischen (Furigana-) Zeichen aus einer Textzeichenfolge.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/phonetic-function"
		}],
		functionParameter: { reference: {
			name: "Verweis",
			detail: "Erforderlich. Textzeichenfolge oder ein Verweis auf eine einzelne Zelle oder einen Zellbereich, die eine Furigana-Textzeichenfolge enthalten."
		} }
	},
	PROPER: {
		description: "Wandelt den ersten Buchstaben aller Wörter einer Zeichenfolge in Großbuchstaben um. Wandelt alle anderen Buchstaben in Kleinbuchstaben um.",
		abstract: "Wandelt den ersten Buchstaben aller Wörter einer Zeichenfolge in Großbuchstaben um. Wandelt alle anderen Buchstaben in Kleinbuchstaben um.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/proper-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Erforderlich. In Anführungszeichen eingeschlossener Text, eine Formel, die Text zurückgibt, oder ein Bezug auf eine Zelle, die den Text enthält, den Sie teilweise groß schreiben möchten"
		} }
	},
	REGEXEXTRACT: {
		description: "Extrahiert die erste Teilzeichenfolge, die einem regulären Ausdruck entspricht.",
		abstract: "Extrahiert die erste Teilzeichenfolge, die einem regulären Ausdruck entspricht.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3098244?hl=de"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Der Eingabetext."
			},
			regularExpression: {
				name: "regular_expression",
				detail: "Der erste Teil von text, der diesem Ausdruck entspricht, wird zurückgegeben."
			}
		}
	},
	REGEXMATCH: {
		description: "Gibt zurück, ob ein Text einem regulären Ausdruck entspricht.",
		abstract: "Gibt zurück, ob ein Text einem regulären Ausdruck entspricht.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3098292?hl=de"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Der Text, der mit dem regulären Ausdruck geprüft werden soll."
			},
			regularExpression: {
				name: "regular_expression",
				detail: "Der reguläre Ausdruck, mit dem der Text geprüft wird."
			}
		}
	},
	REGEXREPLACE: {
		description: "Ersetzt mithilfe regulärer Ausdrücke einen Teil einer Textzeichenfolge durch eine andere Textzeichenfolge.",
		abstract: "Ersetzt mithilfe regulärer Ausdrücke einen Teil einer Textzeichenfolge durch eine andere Textzeichenfolge.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3098245?hl=de"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Der Text, von dem ein Teil ersetzt wird."
			},
			regularExpression: {
				name: "regular_expression",
				detail: "Der reguläre Ausdruck. Alle passenden Vorkommen in text werden ersetzt."
			},
			replacement: {
				name: "replacement",
				detail: "Der Text, der in den ursprünglichen Text eingefügt wird."
			}
		}
	},
	REPLACE: {
		description: "Ersetzt Zeichen innerhalb eines Texts.",
		abstract: "Ersetzt Zeichen innerhalb eines Texts.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/replace-function"
		}],
		functionParameter: {
			oldText: {
				name: "old_text",
				detail: "Text, in dem Sie einige Zeichen ersetzen möchten."
			},
			startNum: {
				name: "start_num",
				detail: "Die Position des Zeichens in old_text, das Sie durch new_text ersetzen möchten."
			},
			numChars: {
				name: "num_chars",
				detail: "Die Anzahl der Zeichen in old_text, die REPLACE durch new_text ersetzen soll."
			},
			newText: {
				name: "new_text",
				detail: "Der Text, der Zeichen in old_text ersetzt."
			}
		}
	},
	REPLACEB: {
		description: "Ersetzt Zeichen innerhalb eines Texts.",
		abstract: "Ersetzt Zeichen innerhalb eines Texts.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/replace-function"
		}],
		functionParameter: {
			oldText: {
				name: "old_text",
				detail: "Text, in dem Sie einige Zeichen ersetzen möchten."
			},
			startNum: {
				name: "start_num",
				detail: "Die Position des Zeichens in old_text, das Sie durch new_text ersetzen möchten."
			},
			numBytes: {
				name: "num_bytes",
				detail: "Die Anzahl der Bytes in old_text, die REPLACEB durch new_text ersetzen soll."
			},
			newText: {
				name: "new_text",
				detail: "Der Text, der Zeichen in old_text ersetzt."
			}
		}
	},
	REPT: {
		description: "Wiederholt einen Text so oft wie angegeben. Verwenden Sie WIEDERHOLEN, um eine Zeichenfolge (eine Basiszeichenfolge) in einer bestimmten Häufigkeit in eine Zelle einzugeben.",
		abstract: "Wiederholt einen Text so oft wie angegeben. Verwenden Sie WIEDERHOLEN, um eine Zeichenfolge (eine Basiszeichenfolge) in einer bestimmten Häufigkeit in eine Zelle einzugeben.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/rept-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Erforderlich. Der Text, den Sie wiederholen möchten"
			},
			numberTimes: {
				name: "number_times",
				detail: "Erforderlich. Eine positive Zahl, die angibt, wie oft \"Text\" wiederholt werden soll"
			}
		}
	},
	RIGHT: {
		description: "Gibt die am weitesten rechts stehenden Zeichen eines Textwerts zurück.",
		abstract: "Gibt die am weitesten rechts stehenden Zeichen eines Textwerts zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/right-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Die Textzeichenfolge mit den Zeichen, die Sie extrahieren möchten."
			},
			numChars: {
				name: "num_chars",
				detail: "Gibt die Anzahl der Zeichen an, die RIGHT extrahieren soll."
			}
		}
	},
	RIGHTB: {
		description: "Gibt die am weitesten rechts stehenden Zeichen eines Textwerts zurück.",
		abstract: "Gibt die am weitesten rechts stehenden Zeichen eines Textwerts zurück.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/right-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Die Textzeichenfolge mit den Zeichen, die Sie extrahieren möchten."
			},
			numBytes: {
				name: "num_bytes",
				detail: "Gibt die Anzahl der Zeichen an, die RIGHTB auf Bytebasis extrahieren soll."
			}
		}
	},
	SEARCH: {
		description: "Sucht eine Textzeichenfolge innerhalb einer anderen (Groß-/Kleinschreibung wird nicht beachtet).",
		abstract: "Sucht eine Textzeichenfolge innerhalb einer anderen (Groß-/Kleinschreibung wird nicht beachtet).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/search-function"
		}],
		functionParameter: {
			findText: {
				name: "find_text",
				detail: "Der Text, den Sie suchen möchten."
			},
			withinText: {
				name: "within_text",
				detail: "Der Text, der den zu suchenden Text enthält."
			},
			startNum: {
				name: "start_num",
				detail: "Gibt das Zeichen an, an dem die Suche beginnt. Wenn start_num weggelassen wird, wird 1 angenommen."
			}
		}
	},
	SEARCHB: {
		description: "Sucht eine Textzeichenfolge innerhalb einer anderen (Groß-/Kleinschreibung wird nicht beachtet).",
		abstract: "Sucht eine Textzeichenfolge innerhalb einer anderen (Groß-/Kleinschreibung wird nicht beachtet).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/search-function"
		}],
		functionParameter: {
			findText: {
				name: "find_text",
				detail: "Der Text, den Sie suchen möchten."
			},
			withinText: {
				name: "within_text",
				detail: "Der Text, der den zu suchenden Text enthält."
			},
			startNum: {
				name: "start_num",
				detail: "Gibt das Zeichen an, an dem die Suche beginnt. Wenn start_num weggelassen wird, wird 1 angenommen."
			}
		}
	},
	SUBSTITUTE: {
		description: "Ersetzt new_text durch old_text in einer Textzeichenfolge. Verwenden Sie SUBSTITUTE, wenn Sie bestimmten Text in einer Textzeichenfolge ersetzen möchten. Verwenden Sie REPLACE, wenn Sie Text ersetzen möchten, der an einer bestimmten Stelle in einer Textzeichenfolge vorkommt.",
		abstract: "Ersetzt new_text durch old_text in einer Textzeichenfolge. Verwenden Sie SUBSTITUTE, wenn Sie bestimmten Text in einer Textzeichenfolge ersetzen möchten. Verwenden Sie REPLACE, wenn Sie Text ersetzen möchten, der an einer bestimmten Stelle in einer Textzeichenfolge vorkommt.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/substitute-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Erforderlich. Der in Anführungszeichen gesetzte Text oder der Bezug auf eine Zelle, die den Text enthält, in dem Zeichen ausgetauscht werden sollen"
			},
			oldText: {
				name: "old_text",
				detail: "Erforderlich. Der Text, den Sie ersetzen möchten"
			},
			newText: {
				name: "new_text",
				detail: "Erforderlich. Der Text, durch den Sie \"Alter_Text\" ersetzen möchten"
			},
			instanceNum: {
				name: "instance_num",
				detail: "Optional. Gibt an, an welchen Stellen \"Alter Text\" durch \"Neuer_Text\" ersetzt werden soll. Wenn Sie \"ntes_Auftreten\" angeben, wird nur dieses Vorkommen von \"Alter_Text\" ersetzt. Andernfalls wird \"Alter_Text\" an jeder Stelle, an der er in \"Text\" vorkommt, durch \"Neuer_Text\" ersetzt."
			}
		}
	},
	T: {
		description: "Wandelt die Argumente in Text um.",
		abstract: "Wandelt die Argumente in Text um.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/t-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Erforderlich. Der zu testende Wert"
		} }
	},
	TEXT: {
		description: "Mit der TEXT -Funktion können Sie durch das Anwenden einer Formatierung mithilfe von Formatcodes die Anzeige von Zahlen ändern. Diese Funktion ist in solchen Fällen nützlich, in denen Sie Zahlen in einem besser lesbaren Format anzeigen oder diese mit Text oder Symbolen kombinieren möchten.",
		abstract: "Mit der TEXT -Funktion können Sie durch das Anwenden einer Formatierung mithilfe von Formatcodes die Anzeige von Zahlen ändern. Diese Funktion ist in solchen Fällen nützlich, in denen Sie Zahlen in einem besser lesbaren Format anzeigen oder diese mit Text oder Symbolen kombinieren möchten.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/text-function"
		}],
		functionParameter: {
			value: {
				name: "value",
				detail: "Ein Zahlenwert, den Sie in Text umwandeln möchten."
			},
			formatText: {
				name: "format_text",
				detail: "Eine Textzeichenfolge, die die Formatierung definiert, die auf den angegebenen Wert angewendet werden soll."
			}
		}
	},
	TEXTAFTER: {
		description: "Gibt Text zurück, der nach einem bestimmten Zeichen oder einer Zeichenfolge auftritt. Sie ist das Gegenteil der Funktion TEXTBEFORE .",
		abstract: "Gibt Text zurück, der nach einem bestimmten Zeichen oder einer Zeichenfolge auftritt. Sie ist das Gegenteil der Funktion TEXTBEFORE .",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/textafter-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Der Text, in dem Sie suchen. Platzhalterzeichen sind nicht zulässig."
			},
			delimiter: {
				name: "delimiter",
				detail: "Der Text, der die Stelle markiert, nach der Sie extrahieren möchten."
			},
			instanceNum: {
				name: "instance_num",
				detail: "Das Vorkommen des Trennzeichens, nach dem Sie Text extrahieren möchten."
			},
			matchMode: {
				name: "match_mode",
				detail: "Legt fest, ob bei der Textsuche Groß-/Kleinschreibung beachtet wird. Standardmäßig wird sie beachtet."
			},
			matchEnd: {
				name: "match_end",
				detail: "Behandelt das Textende als Trennzeichen. Standardmäßig muss der Text exakt übereinstimmen."
			},
			ifNotFound: {
				name: "if_not_found",
				detail: "Wert, der zurückgegeben wird, wenn keine Übereinstimmung gefunden wird. Standardmäßig wird #N/A zurückgegeben."
			}
		}
	},
	TEXTBEFORE: {
		description: "Gibt Text zurück, der vor einem bestimmten Zeichen oder einer bestimmten Zeichenfolge auftritt. Es ist das Gegenteil der TEXTNACH-Funktion .",
		abstract: "Gibt Text zurück, der vor einem bestimmten Zeichen oder einer bestimmten Zeichenfolge auftritt. Es ist das Gegenteil der TEXTNACH-Funktion .",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/textbefore-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Der Text, in dem Sie suchen. Platzhalterzeichen sind nicht zulässig."
			},
			delimiter: {
				name: "delimiter",
				detail: "Der Text, der die Stelle markiert, vor der Sie extrahieren möchten."
			},
			instanceNum: {
				name: "instance_num",
				detail: "Das Vorkommen des Trennzeichens, vor dem Sie Text extrahieren möchten."
			},
			matchMode: {
				name: "match_mode",
				detail: "Legt fest, ob bei der Textsuche Groß-/Kleinschreibung beachtet wird. Standardmäßig wird sie beachtet."
			},
			matchEnd: {
				name: "match_end",
				detail: "Behandelt den Textanfang als Trennzeichen. Standardmäßig muss der Text exakt übereinstimmen."
			},
			ifNotFound: {
				name: "if_not_found",
				detail: "Wert, der zurückgegeben wird, wenn keine Übereinstimmung gefunden wird. Standardmäßig wird #N/A zurückgegeben."
			}
		}
	},
	TEXTJOIN: {
		description: "Die Funktion \"TEXTVERKETTEN\" kombiniert den Text aus mehreren Bereichen und/oder Zeichenfolgen und fügt zwischen jedem zu kombinierenden Textwert ein von Ihnen angegebenes Trennzeichen ein. Wenn das Trennzeichen eine leere Textzeichenfolge ist, verkettet diese Funktion effektiv die Bereiche.",
		abstract: "Die Funktion \"TEXTVERKETTEN\" kombiniert den Text aus mehreren Bereichen und/oder Zeichenfolgen und fügt zwischen jedem zu kombinierenden Textwert ein von Ihnen angegebenes Trennzeichen ein. Wenn das Trennzeichen eine leere Textzeichenfolge ist, verkettet diese Funktion effektiv die Bereiche.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/de-de/excel/functions/textjoin-function"
		}],
		functionParameter: {
			delimiter: {
				name: "delimiter",
				detail: "Eine Textzeichenfolge, entweder leer oder mindestens ein Zeichen in doppelten Anführungszeichen oder aber ein Bezug auf eine gültige Textzeichenfolge. Eine eingegebene Zahl wird als Text behandelt."
			},
			ignoreEmpty: {
				name: "ignore_empty",
				detail: "Wenn WAHR, werden leere Zellen ignoriert."
			},
			text1: {
				name: "text1",
				detail: "Das zu verkettende Textelement. Eine Textzeichenfolge oder ein Array von Zeichenfolgen, z. B. ein Zellbereich."
			},
			text2: {
				name: "text2",
				detail: "Weitere zu verkettende Textelemente. Für die Textelemente sind maximal 252 Textargumente zulässig, einschließlich Text1 . Dabei kann es sich jeweils um eine Textzeichenfolge oder ein Array von Zeichenfolgen (z. B. um einen Zellbereich) handeln."
			}
		}
	},
	TEXTSPLIT: {
		description: "Die TEXTTEILEN-Funktion funktioniert genauso wie der Text-zu-Spalten-Assistent , jedoch in Formelform. Sie ermöglicht Ihnen, spaltenweise oder zeilenweise nach unten aufzuteilen. Dies ist die Umkehrung der TEXTJOIN-Funktion .",
		abstract: "Die TEXTTEILEN-Funktion funktioniert genauso wie der Text-zu-Spalten-Assistent , jedoch in Formelform. Sie ermöglicht Ihnen, spaltenweise oder zeilenweise nach unten aufzuteilen. Dies ist die Umkehrung der TEXTJOIN-Funktion .",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/textsplit-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Der Text, den Sie teilen möchten. Erforderlich."
			},
			colDelimiter: {
				name: "col_delimiter",
				detail: "Der Text, der den Punkt markiert, an dem der Text spaltenübergreifend überschüttet werden soll."
			},
			rowDelimiter: {
				name: "row_delimiter",
				detail: "Der Text, der den Punkt markiert, an dem der Text zeilenweise nach unten geschüttet werden soll. Optional."
			},
			ignoreEmpty: {
				name: "ignore_empty",
				detail: "Geben Sie TRUE an, um aufeinander folgende Trennzeichen zu ignorieren. Der Standardwert ist FALSCH, wodurch eine leere Zelle erstellt wird. Optional."
			},
			matchMode: {
				name: "match_mode",
				detail: "Geben Sie 1 an, um eine Übereinstimmung ohne Berücksichtigung der Groß-/Kleinschreibung durchzuführen. Der Standardwert ist 0, wodurch die Groß-/Kleinschreibung beachtet wird. Optional."
			},
			padWith: {
				name: "pad_with",
				detail: "Der Wert, mit dem das Ergebnis auffüllt werden soll. Der Standardwert lautet #N/A."
			}
		}
	},
	TRIM: {
		description: "Löscht Leerzeichen in einem Text, die nicht als jeweils einzelne zwischen Wörtern stehende Trennzeichen dienen. GLÄTTEN können Sie für Texte verwenden, die Sie aus anderen Anwendungsprogrammen übernommen haben und die eventuell unerwünschte Leerzeichen enthalten.",
		abstract: "Löscht Leerzeichen in einem Text, die nicht als jeweils einzelne zwischen Wörtern stehende Trennzeichen dienen. GLÄTTEN können Sie für Texte verwenden, die Sie aus anderen Anwendungsprogrammen übernommen haben und die eventuell unerwünschte Leerzeichen enthalten.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/trim-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Der Text, aus dem Leerzeichen entfernt werden sollen. Der Text muss in Anführungszeichen enthalten sein."
		} }
	},
	UNICHAR: {
		description: "Gibt das Unicode-Zeichen zurück, das durch den angegebenen Zahlenwert bezeichnet wird.",
		abstract: "Gibt das Unicode-Zeichen zurück, das durch den angegebenen Zahlenwert bezeichnet wird.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/unichar-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Erforderlich. Die Unicode-Zahl, die ein Zeichen darstellt."
		} }
	},
	UNICODE: {
		description: "Gibt die Zahl (Codepoint) zurück, die dem ersten Zeichen des Texts entspricht.",
		abstract: "Gibt die Zahl (Codepoint) zurück, die dem ersten Zeichen des Texts entspricht.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/unicode-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Erforderlich. Das Zeichen, dessen Unicode-Wert Sie bestimmen möchten."
		} }
	},
	UPPER: {
		description: "Wandelt Text in Großbuchstaben um.",
		abstract: "Wandelt Text in Großbuchstaben um.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/upper-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Erforderlich. Der Text, der in Großbuchstaben umgewandelt werden soll. \"Text\" kann sowohl ein Bezug als auch eine Zeichenfolge sein."
		} }
	},
	VALUE: {
		description: "Wandelt ein als Text angegebenes Argument in eine Zahl um.",
		abstract: "Wandelt ein als Text angegebenes Argument in eine Zahl um.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/value-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Erforderlich. Gibt den in Anführungszeichen eingeschlossenen Text oder einen Bezug auf eine Zelle an, die den Text enthält, den Sie umwandeln möchten"
		} }
	},
	VALUETOTEXT: {
		description: "Die WERTZUTEXT-Funktion gibt Text aus einem beliebigen Wert zurück. Er übergibt Textwerte unverändert und wandelt nicht Textwerte in Text um.",
		abstract: "Die WERTZUTEXT-Funktion gibt Text aus einem beliebigen Wert zurück. Er übergibt Textwerte unverändert und wandelt nicht Textwerte in Text um.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/valuetotext-function"
		}],
		functionParameter: {
			value: {
				name: "value",
				detail: "Der Wert, der als Text zurückgegeben werden soll. Erforderlich."
			},
			format: {
				name: "format",
				detail: "Das Format der zurückgegebenen Daten. Optional. Es kann sich um einen von zwei Werten handeln: 0 Standardwert. Übersichtliches Format, das einfach zu lesen ist. Der zurückgegebene Text ist derselbe wie der Text, der in einer Zelle dargestellt wird, auf die die allgemeine Formatierung angewendet wurde. 1 Strenges Format, das Escapezeichen und Zeilentrennzeichen enthält. Generiert eine Zeichenfolge, die in der Bearbeitungsleiste eingegeben werden kann. Kapselt zurückgegebene Zeichenfolgen in Anführungszeichen mit Ausnahme von booleschen Werten, Zahlen und Fehlern."
			}
		}
	},
	CALL: {
		description: "Ruft eine Prozedur in einer DLL (Dynamic Link Library)-Datei oder Coderessource auf. Für diese Funktion gibt es zwei Syntaxversionen. Syntax 1 können Sie nur für eine bereits angemeldete (registrierte) Coderessource einsetzen, die auf Argumente der REGISTER-Funktion zurückgreift. Syntax 2a oder 2b können Sie immer dann einsetzen, wenn Sie eine Coderessource gleichzeitig anmelden und aufrufen möchten.",
		abstract: "Ruft eine Prozedur in einer DLL (Dynamic Link Library)-Datei oder Coderessource auf. Für diese Funktion gibt es zwei Syntaxversionen. Syntax 1 können Sie nur für eine bereits angemeldete (registrierte) Coderessource einsetzen, die auf Argumente der REGISTER-Funktion zurückgreift. Syntax 2a oder 2b können Sie immer dann einsetzen, wenn Sie eine Coderessource gleichzeitig anmelden und aufrufen möchten.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/call-function"
		}],
		functionParameter: {
			moduleText: {
				name: "Module_text",
				detail: "Erforderlich. Eine in Anführungszeichen stehende Zeichenfolge, die den Namen der DLL-Datei (Dynamic Link Library, DLL) angibt, zu der die aufzurufende Prozedur in Microsoft Excel für Windows gehört."
			},
			procedure: {
				name: "Verfahren",
				detail: "Erforderlich. Eine Zeichenfolge, die in Microsoft Excel für Windows den Namen angibt, unter dem die aufzurufende Funktion in der angegebenen DLL-Datei abgelegt ist. Sie können auch den Ordinalwert verwenden, der der Funktion in der EXPORTS-Anweisung der Moduldefinitionsdatei (.DEF) zugeordnet ist. Der Ordinalwert darf nicht in Form von Text vorkommen."
			},
			typeText: {
				name: "Type_text",
				detail: "Erforderlich. Text, der sowohl den Datentyp des Rückgabewerts als auch die Datentypen aller Argumente der DLL oder Coderessource angibt. Der erste Buchstabe des Arguments \"Typ\" gibt den Rückgabewert an. Die Codes, die Sie für \"Typ\" verwenden, werden in Verwenden der Funktionen \"AUFRUFEN\" und \"REGISTER\" ausführlich beschrieben. Bei eigenständigen DLLs oder Coderessourcen (XLLs) können Sie dieses Argument weglassen."
			},
			argument1: {
				name: "Argument1,...",
				detail: "Optional. Die Argumente, die an die jeweilige Prozedur übergeben werden sollen."
			}
		}
	},
	EUROCONVERT: {
		description: "Sie können die EUROCONVERT-Funktion verwenden, um eine Zahl in Euro oder von Euro in eine beteiligte Währung umzuwandeln. Sie können die Funktion außerdem verwenden, um eine Zahl aus einer beteiligten Währung in eine andere umzuwandeln, indem Sie den Euro als Zwischenwert verwenden (Triangulieren). Die EUROCONVERT-Funktion verwendet feste Wechselkurse, die von der EU (Europäische Union) festgelegt wurden.",
		abstract: "Sie können die EUROCONVERT-Funktion verwenden, um eine Zahl in Euro oder von Euro in eine beteiligte Währung umzuwandeln. Sie können die Funktion außerdem verwenden, um eine Zahl aus einer beteiligten Währung in eine andere umzuwandeln, indem Sie den Euro als Zwischenwert verwenden (Triangulieren). Die EUROCONVERT-Funktion verwendet feste Wechselkurse, die von der EU (Europäische Union) festgelegt wurden.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/euroconvert-function"
		}],
		functionParameter: {
			number: {
				name: "Zahl",
				detail: "Erforderlich. Die Zahl, die Sie umwandeln möchten, oder eine Referenz auf eine Zelle, die die Zahl enthält"
			},
			source: {
				name: "Quelle",
				detail: "Erforderlich. Eine Zeichenfolge aus drei Zeichen oder eine Referenz auf eine Zelle, die die Zeichenfolge enthält, die mit dem ISO (International Standards Organization)-Code für die Quellwährung übereinstimmt, die umgewandelt werden soll. Die folgenden ISO-Codes stehen in der EUROCONVERT-Funktion zur Verfügung:"
			},
			target: {
				name: "Ziel",
				detail: "Erforderlich. Eine Zeichenfolge aus drei Zeichen oder eine Referenz auf eine Zelle, die die Zeichenfolge enthält, die mit dem ISO-Code für die Währung übereinstimmt, in die umgewandelt werden soll. Die ISO-Codes finden Sie in der Quelltabelle weiter oben."
			},
			fullPrecision: {
				name: "Full_precision",
				detail: "Erforderlich. Ein Wahrheitswert (WAHR oder FALSCH) oder ein Ausdruck, der den Wert WAHR oder FALSCH ergibt und der festlegt, wie das Ergebnis angezeigt wird"
			},
			triangulationPrecision: {
				name: "Triangulation_precision",
				detail: "Erforderlich. Ein Integer größer als oder gleich 3, mit dem die Anzahl von signifikanten Ziffern der Berechnungsgenauigkeit festgelegt wird, die für den Eurozwischenwert verwendet wird, wenn zwischen zwei Währungen von Euromitgliedsländern umgewandelt wird. Wenn Sie dieses Argument weglassen, wird der Eurozwischenwert in Excel nicht gerundet. Wenn Sie dieses Argument beim Umwandeln der Währung eines Euromitgliedslandes in Euro angeben, wird der Eurozwischenwert in Excel berechnet, der dann in die Währung eines Euromitgliedslandes umgewandelt werden kann."
			}
		}
	},
	REGISTER_ID: {
		description: "Gibt die Register-ID der angegebenen DLL (Dynamic Link Library) oder Coderessource zurück, die zuvor registriert wurde. Wenn die DLL- oder Coderessource nicht registriert wurde, registriert diese Funktion die DLL oder Coderessource und gibt dann die Register-ID zurück.",
		abstract: "Gibt die Register-ID der angegebenen DLL (Dynamic Link Library) oder Coderessource zurück, die zuvor registriert wurde. Wenn die DLL- oder Coderessource nicht registriert wurde, registriert diese Funktion die DLL oder Coderessource und gibt dann die Register-ID zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/register-id-function"
		}],
		functionParameter: {
			moduleText: {
				name: "Module_text",
				detail: "Erforderlich. Text, der den Namen der DLL angibt, die die Funktion in Microsoft Excel für Windows enthält"
			},
			procedure: {
				name: "Verfahren",
				detail: "Erforderlich. Eine Zeichenfolge, die in Microsoft Excel für Windows den Namen angibt, unter dem die aufzurufende Funktion in der angegebenen DLL-Datei abgelegt ist. Sie können auch die Ordnungszahl verwenden, die der Funktion innerhalb der Exporte-Anweisung der Moduldefinitionsdatei (.DEF) zugeordnet ist. Eine Ordnungszahl oder die Kennnummer einer Ressource darf nicht in Anführungszeichen stehen."
			},
			typeText: {
				name: "Type_text",
				detail: "Optional. Text, der sowohl den Datentyp des Rückgabewerts als auch die Datentypen der Argumente der DLL angibt. Der erste Buchstabe des Arguments Datentyp gibt den Datentyp des Rückgabewerts an. Ist die Funktion oder Code-Ressource bereits angemeldet (registriert), darf dieses Argument fehlen."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/univer/de-DE.ts
const locale$2 = {};

//#endregion
//#region src/locale/function-list/web/de-DE.ts
const locale$1 = {
	ENCODEURL: {
		description: "Die ENCODEURL-Funktion gibt eine URL-codierte Zeichenfolge zurück, wobei bestimmte nicht alphanumerische Zeichen durch das Prozentsymbol (%) und eine Hexadezimalzahl ersetzt werden.",
		abstract: "Die ENCODEURL-Funktion gibt eine URL-codierte Zeichenfolge zurück, wobei bestimmte nicht alphanumerische Zeichen durch das Prozentsymbol (%) und eine Hexadezimalzahl ersetzt werden.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/encodeurl-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Eine Zeichenfolge, die URL-codiert werden soll"
		} }
	},
	FILTERXML: {
		description: "Die FILTERXML-Funktion gibt bestimmte Daten aus XML-Inhalten mithilfe des angegebenen xpath zurück.",
		abstract: "Die FILTERXML-Funktion gibt bestimmte Daten aus XML-Inhalten mithilfe des angegebenen xpath zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/filterxml-function"
		}],
		functionParameter: {
			xml: {
				name: "xml",
				detail: "Eine Zeichenfolge im gültigen XML-Format."
			},
			xpath: {
				name: "xpath",
				detail: "Eine Zeichenfolge im XPath-Standardformat."
			}
		}
	},
	WEBSERVICE: {
		description: "Die WEBSERVICE-Funktion gibt Daten aus einem Webdienst im Internet oder Intranet zurück.",
		abstract: "Die WEBSERVICE-Funktion gibt Daten aus einem Webdienst im Internet oder Intranet zurück.",
		links: [{
			title: "Anleitung",
			url: "https://support.microsoft.com/de-de/excel/functions/webservice-function"
		}],
		functionParameter: { url: {
			name: "url",
			detail: "Die URL des Webdiensts."
		} }
	}
};

//#endregion
//#region src/locale/de-DE.ts
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