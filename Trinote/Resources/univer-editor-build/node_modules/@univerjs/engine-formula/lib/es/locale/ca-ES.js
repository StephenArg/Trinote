//#region src/locale/function-list/array/ca-ES.ts
const locale$15 = {
	ARRAY_CONSTRAIN: {
		description: "Restringeix un resultat de matriu a una mida especificada.",
		abstract: "Restringeix un resultat de matriu a una mida especificada.",
		links: [{
			title: "Instrucció",
			url: "https://support.google.com/docs/answer/3267036?hl=ca"
		}],
		functionParameter: {
			inputRange: {
				name: "interval_entrada",
				detail: "ARRAY_CONSTRAIN(SORT(A1:F100; 1; TRUE); 10; 6)"
			},
			numRows: {
				name: "num_files",
				detail: "El nombre de files que ha de contenir el resultat."
			},
			numCols: {
				name: "num_columnes",
				detail: "El nombre de columnes que ha de contenir el resultat"
			}
		}
	},
	FLATTEN: {
		description: "Aplana tots els valors d’un o més intervals en una sola columna.",
		abstract: "Aplana tots els valors d’un o més intervals en una sola columna.",
		links: [{
			title: "Instrucció",
			url: "https://support.google.com/docs/answer/10307761?hl=ca"
		}],
		functionParameter: {
			range1: {
				name: "interval1",
				detail: "El primer interval a aplanar."
			},
			range2: {
				name: "interval2",
				detail: "Intervals addicionals a aplanar."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/compatibility/ca-ES.ts
const locale$14 = {
	BETADIST: {
		description: "Retorna la funció de distribució acumulada beta.",
		abstract: "Retorna la funció de distribució acumulada beta.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/betadist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor entre A i B en què s'avalua la funció."
			},
			alpha: {
				name: "alfa",
				detail: "Un paràmetre de la distribució."
			},
			beta: {
				name: "beta",
				detail: "Un paràmetre de la distribució."
			},
			A: {
				name: "A",
				detail: "Un límit inferior de l'interval de x."
			},
			B: {
				name: "B",
				detail: "Un límit superior de l'interval de x."
			}
		}
	},
	BETAINV: {
		description: "Retorna la funció inversa de la funció de distribució acumulada per a una distribució beta especificada.",
		abstract: "Retorna la funció inversa de la funció de distribució acumulada per a una distribució beta especificada.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/betainv-function"
		}],
		functionParameter: {
			probability: {
				name: "probabilitat",
				detail: "Una probabilitat associada amb la distribució beta."
			},
			alpha: {
				name: "alfa",
				detail: "Un paràmetre de la distribució."
			},
			beta: {
				name: "beta",
				detail: "Un paràmetre de la distribució."
			},
			A: {
				name: "A",
				detail: "Un límit inferior de l'interval de x."
			},
			B: {
				name: "B",
				detail: "Un límit superior de l'interval de x."
			}
		}
	},
	BINOMDIST: {
		description: "Retorna la probabilitat d'una variable aleatòria discreta seguint una distribució binomial.",
		abstract: "Retorna la probabilitat d'una variable aleatòria discreta seguint una distribució binomial.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/binomdist-function"
		}],
		functionParameter: {
			numberS: {
				name: "nombre_èxits",
				detail: "El nombre d'èxits en els assajos."
			},
			trials: {
				name: "assajos",
				detail: "El nombre d'assajos independents."
			},
			probabilityS: {
				name: "prob_èxit",
				detail: "La probabilitat d'èxit en cada assaig."
			},
			cumulative: {
				name: "acumulat",
				detail: "Un valor lògic que determina la forma de la funció. Si és CERT, DISTR.BINOM retorna la funció de distribució acumulada; si és FALS, retorna la funció de massa de probabilitat."
			}
		}
	},
	CHIDIST: {
		description: "Retorna la probabilitat de cua dreta de la distribució khi quadrat.",
		abstract: "Retorna la probabilitat de cua dreta de la distribució khi quadrat.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/chidist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor en què es vol avaluar la distribució."
			},
			degFreedom: {
				name: "graus_llibertat",
				detail: "El nombre de graus de llibertat."
			}
		}
	},
	CHIINV: {
		description: "Retorna la inversa de la probabilitat de cua dreta de la distribució khi quadrat.",
		abstract: "Retorna la inversa de la probabilitat de cua dreta de la distribució khi quadrat.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/chiinv-function"
		}],
		functionParameter: {
			probability: {
				name: "probabilitat",
				detail: "Una probabilitat associada amb la distribució khi quadrat."
			},
			degFreedom: {
				name: "graus_llibertat",
				detail: "El nombre de graus de llibertat."
			}
		}
	},
	CHITEST: {
		description: "Retorna la prova d'independència.",
		abstract: "Retorna la prova d'independència.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/chitest-function"
		}],
		functionParameter: {
			actualRange: {
				name: "rang_real",
				detail: "El rang de dades que conté les observacions per contrastar amb els valors esperats."
			},
			expectedRange: {
				name: "rang_esperat",
				detail: "El rang de dades que conté la proporció del producte dels totals de fila i els totals de columna respecte al total general."
			}
		}
	},
	CONFIDENCE: {
		description: "Retorna l'interval de confiança per a la mitjana d'una població, utilitzant una distribució normal.",
		abstract: "Retorna l'interval de confiança per a la mitjana d'una població, utilitzant una distribució normal.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/confidence-function"
		}],
		functionParameter: {
			alpha: {
				name: "alfa",
				detail: "El nivell de significació utilitzat per calcular el nivell de confiança. El nivell de confiança és igual a 100*(1 - alfa)%, o en altres paraules, un alfa de 0,05 indica un nivell de confiança del 95 per cent."
			},
			standardDev: {
				name: "desv_estàndard",
				detail: "La desviació estàndard de la població per al rang de dades i s'assumeix que és coneguda."
			},
			size: {
				name: "mida",
				detail: "La mida de la mostra."
			}
		}
	},
	COVAR: {
		description: "Retorna la covariància de la població, la mitjana dels productes de les desviacions per a cada parell de punts de dades en dos conjunts de dades.",
		abstract: "Retorna la covariància de la població.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/covar-function"
		}],
		functionParameter: {
			array1: {
				name: "matriu1",
				detail: "Un primer rang de valors de cel·la."
			},
			array2: {
				name: "matriu2",
				detail: "Un segon rang de valors de cel·la."
			}
		}
	},
	CRITBINOM: {
		description: "Retorna el valor més petit pel qual la distribució binomial acumulada és menor o igual a un valor de criteri.",
		abstract: "Retorna el valor més petit pel qual la distribució binomial acumulada és menor o igual a un valor de criteri.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/critbinom-function"
		}],
		functionParameter: {
			trials: {
				name: "assajos",
				detail: "El nombre d'assajos de Bernoulli."
			},
			probabilityS: {
				name: "prob_èxit",
				detail: "La probabilitat d'èxit en cada assaig."
			},
			alpha: {
				name: "alfa",
				detail: "El valor de criteri."
			}
		}
	},
	EXPONDIST: {
		description: "Retorna la distribució exponencial.",
		abstract: "Retorna la distribució exponencial.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/expondist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor en què es vol avaluar la distribució."
			},
			lambda: {
				name: "lambda",
				detail: "El valor del paràmetre."
			},
			cumulative: {
				name: "acumulat",
				detail: "Un valor lògic que determina la forma de la funció. Si és CERT, DISTR.EXP retorna la funció de distribució acumulada; si és FALS, retorna la funció de densitat de probabilitat."
			}
		}
	},
	FDIST: {
		description: "Retorna la distribució de probabilitat F (de cua dreta).",
		abstract: "Retorna la distribució de probabilitat F (de cua dreta).",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/fdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor en què s'avalua la funció."
			},
			degFreedom1: {
				name: "graus_llibertat1",
				detail: "Els graus de llibertat del numerador."
			},
			degFreedom2: {
				name: "graus_llibertat2",
				detail: "Els graus de llibertat del denominador."
			}
		}
	},
	FINV: {
		description: "Retorna la inversa de la distribució de probabilitat F (de cua dreta).",
		abstract: "Retorna la inversa de la distribució de probabilitat F (de cua dreta).",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/finv-function"
		}],
		functionParameter: {
			probability: {
				name: "probabilitat",
				detail: "Una probabilitat associada amb la distribució F acumulada."
			},
			degFreedom1: {
				name: "graus_llibertat1",
				detail: "Els graus de llibertat del numerador."
			},
			degFreedom2: {
				name: "graus_llibertat2",
				detail: "Els graus de llibertat del denominador."
			}
		}
	},
	FTEST: {
		description: "Retorna el resultat d'una prova F.",
		abstract: "Retorna el resultat d'una prova F.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/ftest-function"
		}],
		functionParameter: {
			array1: {
				name: "matriu1",
				detail: "La primera matriu o rang de dades."
			},
			array2: {
				name: "matriu2",
				detail: "La segona matriu o rang de dades."
			}
		}
	},
	GAMMADIST: {
		description: "Retorna la distribució gamma.",
		abstract: "Retorna la distribució gamma.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/gammadist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor per al qual voleu la distribució."
			},
			alpha: {
				name: "alfa",
				detail: "Un paràmetre de la distribució."
			},
			beta: {
				name: "beta",
				detail: "Un paràmetre de la distribució."
			},
			cumulative: {
				name: "acumulat",
				detail: "Un valor lògic que determina la forma de la funció. Si és CERT, DISTR.GAMMA retorna la funció de distribució acumulada; si és FALS, retorna la funció de densitat de probabilitat."
			}
		}
	},
	GAMMAINV: {
		description: "Retorna la inversa de la distribució gamma acumulada.",
		abstract: "Retorna la inversa de la distribució gamma acumulada.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/gammainv-function"
		}],
		functionParameter: {
			probability: {
				name: "probabilitat",
				detail: "Una probabilitat associada amb la distribució gamma."
			},
			alpha: {
				name: "alfa",
				detail: "Un paràmetre de la distribució."
			},
			beta: {
				name: "beta",
				detail: "Un paràmetre de la distribució."
			}
		}
	},
	HYPGEOMDIST: {
		description: "Retorna la distribució hipergeomètrica.",
		abstract: "Retorna la distribució hipergeomètrica.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/hypgeomdist-function"
		}],
		functionParameter: {
			sampleS: {
				name: "mostra_èxit",
				detail: "El nombre d'èxits a la mostra."
			},
			numberSample: {
				name: "nombre_mostra",
				detail: "La mida de la mostra."
			},
			populationS: {
				name: "població_èxit",
				detail: "El nombre d'èxits a la població."
			},
			numberPop: {
				name: "nombre_població",
				detail: "La mida de la població."
			}
		}
	},
	LOGINV: {
		description: "Retorna la inversa de la funció de distribució logaritmiconormal acumulada.",
		abstract: "Retorna la inversa de la funció de distribució logaritmiconormal acumulada.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/loginv-function"
		}],
		functionParameter: {
			probability: {
				name: "probabilitat",
				detail: "Una probabilitat corresponent a la distribució logaritmiconormal."
			},
			mean: {
				name: "mitjana",
				detail: "La mitjana aritmètica de la distribució."
			},
			standardDev: {
				name: "desv_estàndard",
				detail: "La desviació estàndard de la distribució."
			}
		}
	},
	LOGNORMDIST: {
		description: "Retorna la distribució logaritmiconormal acumulada.",
		abstract: "Retorna la distribució logaritmiconormal acumulada.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/lognormdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor per al qual voleu la distribució."
			},
			mean: {
				name: "mitjana",
				detail: "La mitjana aritmètica de la distribució."
			},
			standardDev: {
				name: "desv_estàndard",
				detail: "La desviació estàndard de la distribució."
			}
		}
	},
	MODE: {
		description: "Retorna el valor més comú en un conjunt de dades.",
		abstract: "Retorna el valor més comú en un conjunt de dades.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/mode-function"
		}],
		functionParameter: {
			number1: {
				name: "nombre1",
				detail: "El primer nombre, referència de cel·la o rang pel qual voleu calcular la moda."
			},
			number2: {
				name: "nombre2",
				detail: "Nombres, referències de cel·la o rangs addicionals pels quals voleu calcular la moda, fins a un màxim de 255."
			}
		}
	},
	NEGBINOMDIST: {
		description: "Retorna la distribució binomial negativa.",
		abstract: "Retorna la distribució binomial negativa.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/negbinomdist-function"
		}],
		functionParameter: {
			numberF: {
				name: "nombre_fracassos",
				detail: "El nombre de fracassos."
			},
			numberS: {
				name: "nombre_èxits",
				detail: "El nombre llindar d'èxits."
			},
			probabilityS: {
				name: "prob_èxit",
				detail: "La probabilitat d'un èxit."
			}
		}
	},
	NORMDIST: {
		description: "Retorna la distribució normal acumulada.",
		abstract: "Retorna la distribució normal acumulada.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/normdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor per al qual voleu la distribució."
			},
			mean: {
				name: "mitjana",
				detail: "La mitjana aritmètica de la distribució."
			},
			standardDev: {
				name: "desv_estàndard",
				detail: "La desviació estàndard de la distribució."
			},
			cumulative: {
				name: "acumulat",
				detail: "Un valor lògic que determina la forma de la funció. Si és CERT, DISTR.NORM retorna la funció de distribució acumulada; si és FALS, retorna la funció de densitat de probabilitat."
			}
		}
	},
	NORMINV: {
		description: "Retorna la inversa de la distribució normal acumulada.",
		abstract: "Retorna la inversa de la distribució normal acumulada.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/norminv-function"
		}],
		functionParameter: {
			probability: {
				name: "probabilitat",
				detail: "Una probabilitat corresponent a la distribució normal."
			},
			mean: {
				name: "mitjana",
				detail: "La mitjana aritmètica de la distribució."
			},
			standardDev: {
				name: "desv_estàndard",
				detail: "La desviació estàndard de la distribució."
			}
		}
	},
	NORMSDIST: {
		description: "Retorna la distribució normal estàndard acumulada.",
		abstract: "Retorna la distribució normal estàndard acumulada.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/normsdist-function"
		}],
		functionParameter: { z: {
			name: "z",
			detail: "El valor per al qual voleu la distribució."
		} }
	},
	NORMSINV: {
		description: "Retorna la inversa de la distribució normal estàndard acumulada.",
		abstract: "Retorna la inversa de la distribució normal estàndard acumulada.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/normsinv-function"
		}],
		functionParameter: { probability: {
			name: "probabilitat",
			detail: "Una probabilitat corresponent a la distribució normal."
		} }
	},
	PERCENTILE: {
		description: "Retorna el k-èssim percentil dels valors d'un conjunt de dades (inclou 0 i 1).",
		abstract: "Retorna el k-èssim percentil dels valors d'un conjunt de dades (inclou 0 i 1).",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/percentile-function"
		}],
		functionParameter: {
			array: {
				name: "matriu",
				detail: "La matriu o rang de dades que defineix la posició relativa."
			},
			k: {
				name: "k",
				detail: "El valor del percentil en el rang de 0 a 1 (inclosos)."
			}
		}
	},
	PERCENTRANK: {
		description: "Retorna el rang percentual d'un valor en un conjunt de dades (inclou 0 i 1).",
		abstract: "Retorna el rang percentual d'un valor en un conjunt de dades (inclou 0 i 1).",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/percentrank-function"
		}],
		functionParameter: {
			array: {
				name: "matriu",
				detail: "La matriu o rang de dades que defineix la posició relativa."
			},
			x: {
				name: "x",
				detail: "El valor del qual voleu conèixer el rang."
			},
			significance: {
				name: "xifres_significatives",
				detail: "Un valor que identifica el nombre de dígits significatius per al valor de percentatge retornat. Si s'omet, RANG.PERCENTIL.INC utilitza tres dígits (0,xxx)."
			}
		}
	},
	POISSON: {
		description: "Retorna la distribució de Poisson.",
		abstract: "Retorna la distribució de Poisson.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/poisson-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor per al qual voleu la distribució."
			},
			mean: {
				name: "mitjana",
				detail: "La mitjana aritmètica de la distribució."
			},
			cumulative: {
				name: "acumulat",
				detail: "Un valor lògic que determina la forma de la funció. Si és CERT, POISSON retorna la funció de distribució acumulada; si és FALS, retorna la funció de massa de probabilitat."
			}
		}
	},
	QUARTILE: {
		description: "Retorna el quartil d'un conjunt de dades (inclou 0 i 1).",
		abstract: "Retorna el quartil d'un conjunt de dades (inclou 0 i 1).",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/quartile-function"
		}],
		functionParameter: {
			array: {
				name: "matriu",
				detail: "La matriu o rang de dades per al qual voleu els valors de quartil."
			},
			quart: {
				name: "quartil",
				detail: "El valor de quartil a retornar."
			}
		}
	},
	RANK: {
		description: "Retorna el rang d'un nombre en una llista de nombres.",
		abstract: "Retorna el rang d'un nombre en una llista de nombres.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/rank-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El nombre del qual voleu trobar el rang."
			},
			ref: {
				name: "ref",
				detail: "Una referència a una llista de nombres. Els valors no numèrics a ref s'ignoren."
			},
			order: {
				name: "ordre",
				detail: "Un nombre que especifica com classificar el nombre. Si l'ordre és 0 (zero) o s'omet, el Microsoft Excel classifica el nombre com si ref fos una llista ordenada en ordre descendent. Si l'ordre és qualsevol valor diferent de zero, el Microsoft Excel classifica el nombre com si ref fos una llista ordenada en ordre ascendent."
			}
		}
	},
	STDEV: {
		description: "Estima la desviació estàndard basant-se en una mostra. La desviació estàndard és una mesura de la dispersió dels valors respecte al valor mitjà (la mitjana).",
		abstract: "Estima la desviació estàndard basant-se en una mostra.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/stdev-function"
		}],
		functionParameter: {
			number1: {
				name: "nombre1",
				detail: "El primer argument numèric corresponent a una mostra d'una població."
			},
			number2: {
				name: "nombre2",
				detail: "Arguments numèrics de 2 a 255 corresponents a una mostra d'una població. També podeu utilitzar una sola matriu o una referència a una matriu en lloc d'arguments separats per comes."
			}
		}
	},
	STDEVP: {
		description: "Calcula la desviació estàndard basant-se en la població total donada com a arguments.",
		abstract: "Calcula la desviació estàndard basant-se en la població total.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/stdevp-function"
		}],
		functionParameter: {
			number1: {
				name: "nombre1",
				detail: "El primer argument numèric corresponent a una població."
			},
			number2: {
				name: "nombre2",
				detail: "Arguments numèrics de 2 a 255 corresponents a una població. També podeu utilitzar una sola matriu o una referència a una matriu en lloc d'arguments separats per comes."
			}
		}
	},
	TDIST: {
		description: "Retorna la probabilitat de la distribució t de Student.",
		abstract: "Retorna la probabilitat de la distribució t de Student.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/tdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor numèric en què s'ha d'avaluar la distribució."
			},
			degFreedom: {
				name: "graus_llibertat",
				detail: "Un enter que indica el nombre de graus de llibertat."
			},
			tails: {
				name: "cues",
				detail: "Especifica el nombre de cues de distribució a retornar. Si Cues = 1, DISTR.T retorna la distribució d'una cua. Si Cues = 2, DISTR.T retorna la distribució de dues cues."
			}
		}
	},
	TINV: {
		description: "Retorna la inversa de la probabilitat de la distribució t de Student (dues cues).",
		abstract: "Retorna la inversa de la probabilitat de la distribució t de Student (dues cues).",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/tinv-function"
		}],
		functionParameter: {
			probability: {
				name: "probabilitat",
				detail: "La probabilitat associada amb la distribució t de Student."
			},
			degFreedom: {
				name: "graus_llibertat",
				detail: "Un enter que indica el nombre de graus de llibertat."
			}
		}
	},
	TTEST: {
		description: "Retorna la probabilitat associada amb una prova t de Student.",
		abstract: "Retorna la probabilitat associada amb una prova t de Student.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/ttest-function"
		}],
		functionParameter: {
			array1: {
				name: "matriu1",
				detail: "La primera matriu o rang de dades."
			},
			array2: {
				name: "matriu2",
				detail: "La segona matriu o rang de dades."
			},
			tails: {
				name: "cues",
				detail: "Especifica el nombre de cues de distribució. Si cues = 1, PROVA.T utilitza la distribució d'una cua. Si cues = 2, PROVA.T utilitza la distribució de dues cues."
			},
			type: {
				name: "tipus",
				detail: "El tipus de prova t a realitzar."
			}
		}
	},
	VAR: {
		description: "Estima la variància basant-se en una mostra.",
		abstract: "Estima la variància basant-se en una mostra.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/var-function"
		}],
		functionParameter: {
			number1: {
				name: "nombre1",
				detail: "El primer argument numèric corresponent a una mostra d'una població."
			},
			number2: {
				name: "nombre2",
				detail: "Arguments numèrics de 2 a 255 corresponents a una mostra d'una població."
			}
		}
	},
	VARP: {
		description: "Calcula la variància basant-se en la població total.",
		abstract: "Calcula la variància basant-se en la població total.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/varp-function"
		}],
		functionParameter: {
			number1: {
				name: "nombre1",
				detail: "El primer argument numèric corresponent a una població."
			},
			number2: {
				name: "nombre2",
				detail: "Arguments numèrics de 2 a 255 corresponents a una població."
			}
		}
	},
	WEIBULL: {
		description: "Retorna la distribució de Weibull.",
		abstract: "Retorna la distribució de Weibull.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/weibull-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor per al qual voleu la distribució."
			},
			alpha: {
				name: "alfa",
				detail: "Un paràmetre de la distribució."
			},
			beta: {
				name: "beta",
				detail: "Un paràmetre de la distribució."
			},
			cumulative: {
				name: "acumulat",
				detail: "Un valor lògic que determina la forma de la funció. Si és CERT, WEIBULL retorna la funció de distribució acumulada; si és FALS, retorna la funció de densitat de probabilitat."
			}
		}
	},
	ZTEST: {
		description: "Retorna el valor de probabilitat d'una cua d'una prova z.",
		abstract: "Retorna el valor de probabilitat d'una cua d'una prova z.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/ztest-function"
		}],
		functionParameter: {
			array: {
				name: "matriu",
				detail: "La matriu o rang de dades contra el qual provar x."
			},
			x: {
				name: "x",
				detail: "El valor a provar."
			},
			sigma: {
				name: "sigma",
				detail: "La desviació estàndard de la població (coneguda). Si s'omet, s'utilitza la desviació estàndard de la mostra."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/cube/ca-ES.ts
const locale$13 = {
	CUBEKPIMEMBER: {
		description: "Retorna una propietat d'indicador clau de rendiment (KPI) i mostra el nom del KPI a la cel·la. Un KPI és una mesura quantificable, com el benefici brut mensual o la rotació trimestral d'empleats, que s'utilitza per supervisar el rendiment d'una organització.",
		abstract: "Retorna una propietat d'indicador clau de rendiment (KPI) i mostra el nom del KPI a la cel·la. Un KPI és una mesura quantificable, com el benefici brut mensual o la rotació trimestral d'empleats, que s'utilitza per supervisar el rendiment d'una organització.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/cubekpimember-function"
		}],
		functionParameter: {
			connection: {
				name: "Connexió",
				detail: "Text amb el nom de la connexió al cub."
			},
			kpiName: {
				name: "Nom de l’KPI",
				detail: "Text amb el nom de l’indicador clau de rendiment (KPI) del cub."
			},
			kpiProperty: {
				name: "Propietat de l’KPI",
				detail: "Component de l’KPI que s’ha de retornar."
			},
			caption: {
				name: "Títol",
				detail: "Opcional. Text alternatiu que es mostra a la cel·la."
			}
		}
	},
	CUBEMEMBER: {
		description: "Retorna un membre o tupla del cub. Utilitzeu-lo per validar que el membre o la tupla existeix al cub.",
		abstract: "Retorna un membre o tupla del cub. Utilitzeu-lo per validar que el membre o la tupla existeix al cub.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/cubemember-function"
		}],
		functionParameter: {
			connection: {
				name: "Connexió",
				detail: "Text amb el nom de la connexió al cub."
			},
			memberExpression: {
				name: "Expressió de membre",
				detail: "Text d’una expressió multidimensional (MDX) que avalua un membre o una tupla del cub."
			},
			caption: {
				name: "Títol",
				detail: "Opcional. Text alternatiu que es mostra a la cel·la."
			}
		}
	},
	CUBEMEMBERPROPERTY: {
		description: "Retorna el valor d'una propietat de membre del cub. Utilitzeu-lo per validar que existeix un nom de membre dins del cub i per retornar la propietat especificada per a aquest membre.",
		abstract: "Retorna el valor d'una propietat de membre del cub. Utilitzeu-lo per validar que existeix un nom de membre dins del cub i per retornar la propietat especificada per a aquest membre.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/cubememberproperty-function"
		}],
		functionParameter: {
			connection: {
				name: "Connexió",
				detail: "Text amb el nom de la connexió al cub."
			},
			memberExpression: {
				name: "Expressió de membre",
				detail: "Text d’una expressió multidimensional (MDX) d’un membre del cub."
			},
			property: {
				name: "Propietat",
				detail: "Nom de la propietat que s’ha de retornar."
			}
		}
	},
	CUBERANKEDMEMBER: {
		description: "Retorna l'enèsim membre, o classificat, en un conjunt. Utilitzeu-lo per retornar un o més elements en un conjunt, com el millor venedor o els 10 millors estudiants.",
		abstract: "Retorna l'enèsim membre, o classificat, en un conjunt. Utilitzeu-lo per retornar un o més elements en un conjunt, com el millor venedor o els 10 millors estudiants.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/cuberankedmember-function"
		}],
		functionParameter: {
			connection: {
				name: "Connexió",
				detail: "Text amb el nom de la connexió al cub."
			},
			setExpression: {
				name: "Expressió de conjunt",
				detail: "Text d’una expressió que defineix un conjunt del cub."
			},
			rank: {
				name: "Rang",
				detail: "Enter que indica la posició del membre que s’ha de retornar."
			},
			caption: {
				name: "Títol",
				detail: "Opcional. Text alternatiu que es mostra a la cel·la."
			}
		}
	},
	CUBESET: {
		description: "Defineix un conjunt calculat de membres o tuples enviant una expressió de conjunt al cub del servidor, que crea el conjunt i després retorna aquest conjunt a Microsoft Excel.",
		abstract: "Defineix un conjunt calculat de membres o tuples enviant una expressió de conjunt al cub del servidor, que crea el conjunt i després retorna aquest conjunt a Microsoft Excel.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/cubeset-function"
		}],
		functionParameter: {
			connection: {
				name: "Connexió",
				detail: "Text amb el nom de la connexió al cub."
			},
			setExpression: {
				name: "Expressió de conjunt",
				detail: "Text d’una expressió que produeix un conjunt de membres o tuples."
			},
			caption: {
				name: "Títol",
				detail: "Opcional. Text alternatiu que es mostra a la cel·la."
			},
			sortOrder: {
				name: "Ordre",
				detail: "Opcional. Tipus d’ordenació que s’ha d’aplicar."
			},
			sortBy: {
				name: "Ordena per",
				detail: "Opcional. Valor pel qual s’ha d’ordenar el conjunt."
			}
		}
	},
	CUBESETCOUNT: {
		description: "Retorna el nombre d'elements en un conjunt.",
		abstract: "Retorna el nombre d'elements en un conjunt.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/cubesetcount-function"
		}],
		functionParameter: { set: {
			name: "Conjunt",
			detail: "Expressió que avalua un conjunt definit per CUBESET, o una referència que el conté."
		} }
	},
	CUBEVALUE: {
		description: "Retorna un valor agregat del cub.",
		abstract: "Retorna un valor agregat del cub.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/cubevalue-function"
		}],
		functionParameter: {
			connection: {
				name: "Connexió",
				detail: "Text amb el nom de la connexió al cub."
			},
			memberExpression: {
				name: "Expressió de membre",
				detail: "Opcional. Expressió MDX que avalua un membre o una tupla del cub."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/database/ca-ES.ts
const locale$12 = {
	DAVERAGE: {
		description: "Retorna la mitjana de les entrades de base de dades seleccionades",
		abstract: "Retorna la mitjana de les entrades de base de dades seleccionades",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/daverage-function"
		}],
		functionParameter: {
			database: {
				name: "base_dades",
				detail: "El rang de cel·les que constitueix la llista o base de dades."
			},
			field: {
				name: "camp",
				detail: "Indica quina columna s'utilitza en la funció."
			},
			criteria: {
				name: "criteris",
				detail: "El rang de cel·les que conté les condicions que especifiqueu."
			}
		}
	},
	DCOUNT: {
		description: "Compta les cel·les que contenen números en una base de dades",
		abstract: "Compta les cel·les que contenen números en una base de dades",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/dcount-function"
		}],
		functionParameter: {
			database: {
				name: "base_dades",
				detail: "El rang de cel·les que constitueix la llista o base de dades."
			},
			field: {
				name: "camp",
				detail: "Indica quina columna s'utilitza en la funció."
			},
			criteria: {
				name: "criteris",
				detail: "El rang de cel·les que conté les condicions que especifiqueu."
			}
		}
	},
	DCOUNTA: {
		description: "Compta les cel·les no buides en una base de dades",
		abstract: "Compta les cel·les no buides en una base de dades",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/dcounta-function"
		}],
		functionParameter: {
			database: {
				name: "base_dades",
				detail: "El rang de cel·les que constitueix la llista o base de dades."
			},
			field: {
				name: "camp",
				detail: "Indica quina columna s'utilitza en la funció."
			},
			criteria: {
				name: "criteris",
				detail: "El rang de cel·les que conté les condicions que especifiqueu."
			}
		}
	},
	DGET: {
		description: "Extreu d'una base de dades un únic registre que coincideix amb els criteris especificats",
		abstract: "Extreu d'una base de dades un únic registre que coincideix amb els criteris especificats",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/dget-function"
		}],
		functionParameter: {
			database: {
				name: "base_dades",
				detail: "El rang de cel·les que constitueix la llista o base de dades."
			},
			field: {
				name: "camp",
				detail: "Indica quina columna s'utilitza en la funció."
			},
			criteria: {
				name: "criteris",
				detail: "El rang de cel·les que conté les condicions que especifiqueu."
			}
		}
	},
	DMAX: {
		description: "Retorna el valor màxim de les entrades de base de dades seleccionades",
		abstract: "Retorna el valor màxim de les entrades de base de dades seleccionades",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/dmax-function"
		}],
		functionParameter: {
			database: {
				name: "base_dades",
				detail: "El rang de cel·les que constitueix la llista o base de dades."
			},
			field: {
				name: "camp",
				detail: "Indica quina columna s'utilitza en la funció."
			},
			criteria: {
				name: "criteris",
				detail: "El rang de cel·les que conté les condicions que especifiqueu."
			}
		}
	},
	DMIN: {
		description: "Retorna el valor mínim de les entrades de base de dades seleccionades",
		abstract: "Retorna el valor mínim de les entrades de base de dades seleccionades",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/dmin-function"
		}],
		functionParameter: {
			database: {
				name: "base_dades",
				detail: "El rang de cel·les que constitueix la llista o base de dades."
			},
			field: {
				name: "camp",
				detail: "Indica quina columna s'utilitza en la funció."
			},
			criteria: {
				name: "criteris",
				detail: "El rang de cel·les que conté les condicions que especifiqueu."
			}
		}
	},
	DPRODUCT: {
		description: "Multiplica els valors en un camp particular de registres que coincideixen amb els criteris en una base de dades",
		abstract: "Multiplica els valors en un camp particular de registres que coincideixen amb els criteris en una base de dades",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/dproduct-function"
		}],
		functionParameter: {
			database: {
				name: "base_dades",
				detail: "El rang de cel·les que constitueix la llista o base de dades."
			},
			field: {
				name: "camp",
				detail: "Indica quina columna s'utilitza en la funció."
			},
			criteria: {
				name: "criteris",
				detail: "El rang de cel·les que conté les condicions que especifiqueu."
			}
		}
	},
	DSTDEV: {
		description: "Estima la desviació estàndard basada en una mostra d'entrades de base de dades seleccionades",
		abstract: "Estima la desviació estàndard basada en una mostra d'entrades de base de dades seleccionades",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/dstdev-function"
		}],
		functionParameter: {
			database: {
				name: "base_dades",
				detail: "El rang de cel·les que constitueix la llista o base de dades."
			},
			field: {
				name: "camp",
				detail: "Indica quina columna s'utilitza en la funció."
			},
			criteria: {
				name: "criteris",
				detail: "El rang de cel·les que conté les condicions que especifiqueu."
			}
		}
	},
	DSTDEVP: {
		description: "Calcula la desviació estàndard basada en la població completa d'entrades de base de dades seleccionades",
		abstract: "Calcula la desviació estàndard basada en la població completa d'entrades de base de dades seleccionades",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/dstdevp-function"
		}],
		functionParameter: {
			database: {
				name: "base_dades",
				detail: "El rang de cel·les que constitueix la llista o base de dades."
			},
			field: {
				name: "camp",
				detail: "Indica quina columna s'utilitza en la funció."
			},
			criteria: {
				name: "criteris",
				detail: "El rang de cel·les que conté les condicions que especifiqueu."
			}
		}
	},
	DSUM: {
		description: "Suma els números a la columna de camp de registres a la base de dades que coincideixen amb els criteris",
		abstract: "Suma els números a la columna de camp de registres a la base de dades que coincideixen amb els criteris",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/dsum-function"
		}],
		functionParameter: {
			database: {
				name: "base_dades",
				detail: "El rang de cel·les que constitueix la llista o base de dades."
			},
			field: {
				name: "camp",
				detail: "Indica quina columna s'utilitza en la funció."
			},
			criteria: {
				name: "criteris",
				detail: "El rang de cel·les que conté les condicions que especifiqueu."
			}
		}
	},
	DVAR: {
		description: "Estima la variància basada en una mostra d'entrades de base de dades seleccionades",
		abstract: "Estima la variància basada en una mostra d'entrades de base de dades seleccionades",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/dvar-function"
		}],
		functionParameter: {
			database: {
				name: "base_dades",
				detail: "El rang de cel·les que constitueix la llista o base de dades."
			},
			field: {
				name: "camp",
				detail: "Indica quina columna s'utilitza en la funció."
			},
			criteria: {
				name: "criteris",
				detail: "El rang de cel·les que conté les condicions que especifiqueu."
			}
		}
	},
	DVARP: {
		description: "Calcula la variància basada en la població completa d'entrades de base de dades seleccionades",
		abstract: "Calcula la variància basada en la població completa d'entrades de base de dades seleccionades",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/dvarp-function"
		}],
		functionParameter: {
			database: {
				name: "base_dades",
				detail: "El rang de cel·les que constitueix la llista o base de dades."
			},
			field: {
				name: "camp",
				detail: "Indica quina columna s'utilitza en la funció."
			},
			criteria: {
				name: "criteris",
				detail: "El rang de cel·les que conté les condicions que especifiqueu."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/date/ca-ES.ts
const locale$11 = {
	DATE: {
		description: "Retorna el número de sèrie d'una data particular",
		abstract: "Retorna el número de sèrie d'una data particular",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/date-function"
		}],
		functionParameter: {
			year: {
				name: "any",
				detail: "El valor de l'argument any pot incloure d'un a quatre dígits. Excel interpreta l'argument any segons el sistema de dates que utilitzi el vostre equip. Per defecte, Univer utilitza el sistema de dates de 1900, el que significa que la primera data és l'1 de gener de 1900."
			},
			month: {
				name: "mes",
				detail: "Un enter positiu o negatiu que representa el mes de l'any de l'1 al 12 (gener a desembre)."
			},
			day: {
				name: "dia",
				detail: "Un enter positiu o negatiu que representa el dia del mes de l'1 al 31."
			}
		}
	},
	DATEDIF: {
		description: "Calcula el nombre de dies, mesos o anys entre dues dates. Aquesta funció és útil en fórmules on necessiteu calcular una edat.",
		abstract: "Calcula el nombre de dies, mesos o anys entre dues dates. Aquesta funció és útil en fórmules on necessiteu calcular una edat.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/datedif-function"
		}],
		functionParameter: {
			startDate: {
				name: "data_inicial",
				detail: "Una data que representa la primera data, o data d'inici d'un període determinat."
			},
			endDate: {
				name: "data_final",
				detail: "Una data que representa l'última data, o data de finalització del període."
			},
			unit: {
				name: "Unitat",
				detail: "La unitat de temps que voleu que es retorni."
			}
		}
	},
	DATEVALUE: {
		description: "Converteix una data en forma de text a un número de sèrie.",
		abstract: "Converteix una data en forma de text a un número de sèrie",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/datevalue-function"
		}],
		functionParameter: { dateText: {
			name: "text_data",
			detail: "Text que representa una data en un format de data d'Excel, o una referència a una cel·la que conté text que representa una data en un format de data d'Excel. Per exemple, \"30/1/2008\" o \"30-Gen-2008\" són cadenes de text entre cometes que representen dates.\\nUtilitzant el sistema de dates predeterminat a Microsoft Excel per a Windows, l'argument text_data ha de representar una data entre l'1 de gener de 1900 i el 31 de desembre de 9999. La funció DATEVALUE retorna el valor d'error #VALUE! si el valor de l'argument text_data està fora d'aquest rang.\\nSi s'omet la part de l'any de l'argument text_data, la funció DATEVALUE utilitza l'any actual del rellotge integrat del vostre equip. La informació d'hora en l'argument text_data s'ignora."
		} }
	},
	DAY: {
		description: "Retorna el dia d'una data, representat per un número de sèrie. El dia es proporciona com un enter que va de l'1 al 31.",
		abstract: "Converteix un número de sèrie a un dia del mes",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/day-function"
		}],
		functionParameter: { serialNumber: {
			name: "número_sèrie",
			detail: "La data del dia que intenteu trobar. Les dates han d'introduir-se utilitzant la funció DATE, o com a resultats d'altres fórmules o funcions. Per exemple, utilitzeu DATE(2008,5,23) per al dia 23 de maig de 2008."
		} }
	},
	DAYS: {
		description: "Retorna el nombre de dies entre dues dates",
		abstract: "Retorna el nombre de dies entre dues dates",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/days-function"
		}],
		functionParameter: {
			endDate: {
				name: "data_final",
				detail: "Data_inicial i Data_final són les dues dates entre les quals voleu conèixer el nombre de dies."
			},
			startDate: {
				name: "data_inicial",
				detail: "Data_inicial i Data_final són les dues dates entre les quals voleu conèixer el nombre de dies."
			}
		}
	},
	DAYS360: {
		description: "Calcula el nombre de dies entre dues dates basant-se en un any de 360 dies",
		abstract: "Calcula el nombre de dies entre dues dates basant-se en un any de 360 dies",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/days360-function"
		}],
		functionParameter: {
			startDate: {
				name: "data_inicial",
				detail: "Data_inicial i Data_final són les dues dates entre les quals voleu conèixer el nombre de dies."
			},
			endDate: {
				name: "data_final",
				detail: "Data_inicial i Data_final són les dues dates entre les quals voleu conèixer el nombre de dies."
			},
			method: {
				name: "mètode",
				detail: "Un valor lògic que especifica si s'utilitza el mètode americà o europeu en el càlcul."
			}
		}
	},
	EDATE: {
		description: "Retorna el número de sèrie que representa la data que està el nombre indicat de mesos abans o després d'una data especificada (la data_inicial). Utilitzeu EDATE per calcular dates de venciment o dates de venciment que cauen el mateix dia del mes que la data d'emissió.",
		abstract: "Retorna el número de sèrie de la data que està el nombre indicat de mesos abans o després de la data inicial",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/edate-function"
		}],
		functionParameter: {
			startDate: {
				name: "data_inicial",
				detail: "Una data que representa la data inicial. Les dates han d'introduir-se utilitzant la funció DATE, o com a resultats d'altres fórmules o funcions. Per exemple, utilitzeu DATE(2008,5,23) per al dia 23 de maig de 2008. Poden ocórrer problemes si les dates s'introdueixen com a text."
			},
			months: {
				name: "mesos",
				detail: "El nombre de mesos abans o després de data_inicial. Un valor positiu per a mesos produeix una data futura; un valor negatiu produeix una data passada."
			}
		}
	},
	EOMONTH: {
		description: "Retorna el número de sèrie de l'últim dia del mes abans o després d'un nombre especificat de mesos",
		abstract: "Retorna el número de sèrie de l'últim dia del mes abans o després d'un nombre especificat de mesos",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/eomonth-function"
		}],
		functionParameter: {
			startDate: {
				name: "data_inicial",
				detail: "Una data que representa la data inicial."
			},
			months: {
				name: "mesos",
				detail: "El nombre de mesos abans o després de data_inicial."
			}
		}
	},
	EPOCHTODATE: {
		description: "Converteix una marca de temps en època d'Unix expressada en segons, mil·lisegons o microsegons en una data i hora en temps universal coordinat (UTC).",
		abstract: "Converteix una marca de temps en època d'Unix expressada en segons, mil·lisegons o microsegons en una data i hora en temps universal coordinat (UTC).",
		links: [{
			title: "Instruccions",
			url: "https://support.google.com/docs/answer/13193461?hl=ca"
		}],
		functionParameter: {
			timestamp: {
				name: "marca_temps",
				detail: "marca de temps en època d'Unix expressada en segons, mil·lisegons o microsegons."
			},
			unit: {
				name: "unitat",
				detail: "(OPCIONAL; -1 de manera predeterminada): unitat de temps en què s'expressa la marca de temps."
			}
		}
	},
	HOUR: {
		description: "Converteix un número de sèrie a una hora",
		abstract: "Converteix un número de sèrie a una hora",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/hour-function"
		}],
		functionParameter: { serialNumber: {
			name: "número_sèrie",
			detail: "La data del dia que intenteu trobar. Les dates han d'introduir-se utilitzant la funció DATE, o com a resultats d'altres fórmules o funcions. Per exemple, utilitzeu DATE(2008,5,23) per al dia 23 de maig de 2008."
		} }
	},
	ISOWEEKNUM: {
		description: "Retorna el número de la setmana ISO de l'any per a una data determinada",
		abstract: "Retorna el número de la setmana ISO de l'any per a una data determinada",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/isoweeknum-function"
		}],
		functionParameter: { date: {
			name: "data",
			detail: "Data és el codi de data i hora utilitzat per Excel per al càlcul de data i hora."
		} }
	},
	MINUTE: {
		description: "Converteix un número de sèrie a un minut",
		abstract: "Converteix un número de sèrie a un minut",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/minute-function"
		}],
		functionParameter: { serialNumber: {
			name: "número_sèrie",
			detail: "La data del dia que intenteu trobar. Les dates han d'introduir-se utilitzant la funció DATE, o com a resultats d'altres fórmules o funcions. Per exemple, utilitzeu DATE(2008,5,23) per al dia 23 de maig de 2008."
		} }
	},
	MONTH: {
		description: "Retorna el mes d'una data representada per un número de sèrie. El mes es proporciona com un enter, que va de l'1 (gener) al 12 (desembre).",
		abstract: "Converteix un número de sèrie a un mes",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/month-function"
		}],
		functionParameter: { serialNumber: {
			name: "número_sèrie",
			detail: "La data del mes que intenteu trobar. Les dates han d'introduir-se utilitzant la funció DATE, o com a resultats d'altres fórmules o funcions. Per exemple, utilitzeu DATE(2008,5,23) per al dia 23 de maig de 2008."
		} }
	},
	NETWORKDAYS: {
		description: "Retorna el nombre de dies laborables complets entre dues dates",
		abstract: "Retorna el nombre de dies laborables complets entre dues dates",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/networkdays-function"
		}],
		functionParameter: {
			startDate: {
				name: "data_inicial",
				detail: "Una data que representa la data inicial."
			},
			endDate: {
				name: "data_final",
				detail: "Una data que representa la data final."
			},
			holidays: {
				name: "dies_festius",
				detail: "Un rang opcional d'una o més dates per excloure del calendari laboral, com dies festius estatals i federals i dies festius flotants."
			}
		}
	},
	NETWORKDAYS_INTL: {
		description: "Retorna el nombre de dies laborables complets entre dues dates utilitzant paràmetres per indicar quins i quants dies són dies de cap de setmana",
		abstract: "Retorna el nombre de dies laborables complets entre dues dates utilitzant paràmetres per indicar quins i quants dies són dies de cap de setmana",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/networkdays-intl-function"
		}],
		functionParameter: {
			startDate: {
				name: "data_inicial",
				detail: "Una data que representa la data inicial."
			},
			endDate: {
				name: "data_final",
				detail: "Una data que representa la data final."
			},
			weekend: {
				name: "cap_setmana",
				detail: "és un número o cadena de cap de setmana que especifica quan ocorren els caps de setmana."
			},
			holidays: {
				name: "dies_festius",
				detail: "Un rang opcional d'una o més dates per excloure del calendari laboral, com dies festius estatals i federals i dies festius flotants."
			}
		}
	},
	NOW: {
		description: "Retorna el número de sèrie de la data i hora actuals.",
		abstract: "Retorna el número de sèrie de la data i hora actuals",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/now-function"
		}],
		functionParameter: {}
	},
	SECOND: {
		description: "Converteix un número de sèrie a un segon",
		abstract: "Converteix un número de sèrie a un segon",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/second-function"
		}],
		functionParameter: { serialNumber: {
			name: "número_sèrie",
			detail: "La data del dia que intenteu trobar. Les dates han d'introduir-se utilitzant la funció DATE, o com a resultats d'altres fórmules o funcions. Per exemple, utilitzeu DATE(2008,5,23) per al dia 23 de maig de 2008."
		} }
	},
	TIME: {
		description: "Retorna el número de sèrie d'una hora particular.",
		abstract: "Retorna el número de sèrie d'una hora particular",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/time-function"
		}],
		functionParameter: {
			hour: {
				name: "hora",
				detail: "Un número del 0 (zero) al 32767 que representa l'hora. Qualsevol valor superior a 23 es dividirà per 24 i la resta es tractarà com el valor de l'hora. Per exemple, TIME(27,0,0) = TIME(3,0,0) = .125 o 3:00 AM."
			},
			minute: {
				name: "minut",
				detail: "Un número del 0 al 32767 que representa el minut. Qualsevol valor superior a 59 es convertirà a hores i minuts. Per exemple, TIME(0,750,0) = TIME(12,30,0) = .520833 o 12:30 PM."
			},
			second: {
				name: "segon",
				detail: "Un número del 0 al 32767 que representa el segon. Qualsevol valor superior a 59 es convertirà a hores, minuts i segons. Per exemple, TIME(0,0,2000) = TIME(0,33,22) = .023148 o 12:33:20 AM."
			}
		}
	},
	TIMEVALUE: {
		description: "Converteix una hora en forma de text a un número de sèrie.",
		abstract: "Converteix una hora en forma de text a un número de sèrie",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/timevalue-function"
		}],
		functionParameter: { timeText: {
			name: "text_hora",
			detail: "Una cadena de text que representa una hora en qualsevol dels formats d'hora de Microsoft Excel; per exemple, \"6:45 PM\" i \"18:45\" cadenes de text entre cometes que representen hora."
		} }
	},
	TO_DATE: {
		description: "Converteix un número proporcionat en una data.",
		abstract: "Converteix un número proporcionat en una data.",
		links: [{
			title: "Instruccions",
			url: "https://support.google.com/docs/answer/3094239?hl=ca"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "TO_DATE(A2)"
		} }
	},
	TODAY: {
		description: "Retorna el número de sèrie de la data d'avui",
		abstract: "Retorna el número de sèrie de la data d'avui",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/today-function"
		}],
		functionParameter: {}
	},
	WEEKDAY: {
		description: "Converteix un número de sèrie a un dia de la setmana",
		abstract: "Converteix un número de sèrie a un dia de la setmana",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/weekday-function"
		}],
		functionParameter: {
			serialNumber: {
				name: "número_sèrie",
				detail: "Un número seqüencial que representa la data del dia que intenteu trobar."
			},
			returnType: {
				name: "tipus_retornat",
				detail: "Un número que determina el tipus de valor retornat."
			}
		}
	},
	WEEKNUM: {
		description: "Converteix un número de sèrie a un número que representa on cau la setmana numèricament dins d'un any",
		abstract: "Converteix un número de sèrie a un número que representa on cau la setmana numèricament dins d'un any",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/weeknum-function"
		}],
		functionParameter: {
			serialNumber: {
				name: "número_sèrie",
				detail: "Una data dins de la setmana."
			},
			returnType: {
				name: "tipus_retornat",
				detail: "Un número que determina en quin dia comença la setmana. El predeterminat és 1."
			}
		}
	},
	WORKDAY: {
		description: "Retorna el número de sèrie de la data abans o després d'un nombre especificat de dies laborables",
		abstract: "Retorna el número de sèrie de la data abans o després d'un nombre especificat de dies laborables",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/workday-function"
		}],
		functionParameter: {
			startDate: {
				name: "data_inicial",
				detail: "Una data que representa la data inicial."
			},
			days: {
				name: "dies",
				detail: "El nombre de dies no caps de setmana i no festius abans o després de data_inicial. Un valor positiu per a dies produeix una data futura; un valor negatiu produeix una data passada."
			},
			holidays: {
				name: "dies_festius",
				detail: "Un rang opcional d'una o més dates per excloure del calendari laboral, com dies festius estatals i federals i dies festius flotants."
			}
		}
	},
	WORKDAY_INTL: {
		description: "Retorna el número de sèrie de la data abans o després d'un nombre especificat de dies laborables utilitzant paràmetres per indicar quins i quants dies són dies de cap de setmana",
		abstract: "Retorna el número de sèrie de la data abans o després d'un nombre especificat de dies laborables utilitzant paràmetres per indicar quins i quants dies són dies de cap de setmana",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/workday-intl-function"
		}],
		functionParameter: {
			startDate: {
				name: "data_inicial",
				detail: "Una data que representa la data inicial."
			},
			days: {
				name: "dies",
				detail: "El nombre de dies no caps de setmana i no festius abans o després de data_inicial. Un valor positiu per a dies produeix una data futura; un valor negatiu produeix una data passada."
			},
			weekend: {
				name: "cap_setmana",
				detail: "és un número o cadena de cap de setmana que especifica quan ocorren els caps de setmana."
			},
			holidays: {
				name: "dies_festius",
				detail: "Un rang opcional d'una o més dates per excloure del calendari laboral, com dies festius estatals i federals i dies festius flotants."
			}
		}
	},
	YEAR: {
		description: "Retorna l'any corresponent a una data. L'any es retorna com un enter en el rang 1900-9999.",
		abstract: "Converteix un número de sèrie a un any",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/year-function"
		}],
		functionParameter: { serialNumber: {
			name: "número_sèrie",
			detail: "La data de l'any que voleu trobar. Les dates han d'introduir-se utilitzant la funció DATE, o com a resultats d'altres fórmules o funcions. Per exemple, utilitzeu DATE(2008,5,23) per al dia 23 de maig de 2008. Poden ocórrer problemes si les dates s'introdueixen com a text."
		} }
	},
	YEARFRAC: {
		description: "Retorna la fracció d'any que representa el nombre de dies complets entre data_inicial i data_final",
		abstract: "Retorna la fracció d'any que representa el nombre de dies complets entre data_inicial i data_final",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/yearfrac-function"
		}],
		functionParameter: {
			startDate: {
				name: "data_inicial",
				detail: "Una data que representa la data inicial."
			},
			endDate: {
				name: "data_final",
				detail: "Una data que representa la data final."
			},
			basis: {
				name: "base",
				detail: "El tipus de base de recompte de dies que s'utilitzarà."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/engineering/ca-ES.ts
const locale$10 = {
	BESSELI: {
		description: "Retorna la funció de Bessel modificada In(x)",
		abstract: "Retorna la funció de Bessel modificada In(x)",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/besseli-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "El valor en què s'avalua la funció."
			},
			n: {
				name: "N",
				detail: "L'ordre de la funció de Bessel. Si n no és un enter, es trunca."
			}
		}
	},
	BESSELJ: {
		description: "Retorna la funció de Bessel Jn(x)",
		abstract: "Retorna la funció de Bessel Jn(x)",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/besselj-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "El valor en què s'avalua la funció."
			},
			n: {
				name: "N",
				detail: "L'ordre de la funció de Bessel. Si n no és un enter, es trunca."
			}
		}
	},
	BESSELK: {
		description: "Retorna la funció de Bessel modificada Kn(x)",
		abstract: "Retorna la funció de Bessel modificada Kn(x)",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/besselk-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "El valor en què s'avalua la funció."
			},
			n: {
				name: "N",
				detail: "L'ordre de la funció de Bessel. Si n no és un enter, es trunca."
			}
		}
	},
	BESSELY: {
		description: "Retorna la funció de Bessel Yn(x)",
		abstract: "Retorna la funció de Bessel Yn(x)",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/bessely-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "El valor en què s'avalua la funció."
			},
			n: {
				name: "N",
				detail: "L'ordre de la funció de Bessel. Si n no és un enter, es trunca."
			}
		}
	},
	BIN2DEC: {
		description: "Converteix un nombre binari a decimal",
		abstract: "Converteix un nombre binari a decimal",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/bin2dec-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "El nombre binari que voleu convertir."
		} }
	},
	BIN2HEX: {
		description: "Converteix un nombre binari a hexadecimal",
		abstract: "Converteix un nombre binari a hexadecimal",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/bin2hex-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El nombre binari que voleu convertir."
			},
			places: {
				name: "posicions",
				detail: "El nombre de caràcters que es faran servir."
			}
		}
	},
	BIN2OCT: {
		description: "Converteix un nombre binari a octal",
		abstract: "Converteix un nombre binari a octal",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/bin2oct-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El nombre binari que voleu convertir."
			},
			places: {
				name: "posicions",
				detail: "El nombre de caràcters que es faran servir."
			}
		}
	},
	BITAND: {
		description: "Retorna una \"Y bit a bit\" de dos nombres",
		abstract: "Retorna una \"Y bit a bit\" de dos nombres",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/bitand-function"
		}],
		functionParameter: {
			number1: {
				name: "nombre1",
				detail: "Ha d'estar en forma decimal i ser major o igual a 0."
			},
			number2: {
				name: "nombre2",
				detail: "Ha d'estar en forma decimal i ser major o igual a 0."
			}
		}
	},
	BITLSHIFT: {
		description: "Retorna un nombre de valor desplaçat a l'esquerra per quantitat_desplaçament bits",
		abstract: "Retorna un nombre de valor desplaçat a l'esquerra per quantitat_desplaçament bits",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/bitlshift-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "Nombre ha de ser un enter major o igual a 0."
			},
			shiftAmount: {
				name: "quantitat_desplaçament",
				detail: "Quantitat_desplaçament ha de ser un enter."
			}
		}
	},
	BITOR: {
		description: "Retorna un O bit a bit de 2 nombres",
		abstract: "Retorna un O bit a bit de 2 nombres",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/bitor-function"
		}],
		functionParameter: {
			number1: {
				name: "nombre1",
				detail: "Ha d'estar en forma decimal i ser major o igual a 0."
			},
			number2: {
				name: "nombre2",
				detail: "Ha d'estar en forma decimal i ser major o igual a 0."
			}
		}
	},
	BITRSHIFT: {
		description: "Retorna un nombre de valor desplaçat a la dreta per quantitat_desplaçament bits",
		abstract: "Retorna un nombre de valor desplaçat a la dreta per quantitat_desplaçament bits",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/bitrshift-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "Nombre ha de ser un enter major o igual a 0."
			},
			shiftAmount: {
				name: "quantitat_desplaçament",
				detail: "Quantitat_desplaçament ha de ser un enter."
			}
		}
	},
	BITXOR: {
		description: "Retorna un \"O exclusiu\" bit a bit de dos nombres",
		abstract: "Retorna un \"O exclusiu\" bit a bit de dos nombres",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/bitxor-function"
		}],
		functionParameter: {
			number1: {
				name: "nombre1",
				detail: "Ha d'estar en forma decimal i ser major o igual a 0."
			},
			number2: {
				name: "nombre2",
				detail: "Ha d'estar en forma decimal i ser major o igual a 0."
			}
		}
	},
	COMPLEX: {
		description: "Converteix coeficients reals i imaginaris en un nombre complex",
		abstract: "Converteix coeficients reals i imaginaris en un nombre complex",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/complex-function"
		}],
		functionParameter: {
			realNum: {
				name: "núm_real",
				detail: "El coeficient real del nombre complex."
			},
			iNum: {
				name: "núm_i",
				detail: "El coeficient imaginari del nombre complex."
			},
			suffix: {
				name: "sufix",
				detail: "El sufix per al component imaginari del nombre complex. Si s'omet, se suposa que el sufix és \"i\"."
			}
		}
	},
	CONVERT: {
		description: "Converteix un nombre d'un sistema de mesura a un altre",
		abstract: "Converteix un nombre d'un sistema de mesura a un altre",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/convert-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "és el valor en unitats_origen que es convertirà."
			},
			fromUnit: {
				name: "unitat_origen",
				detail: "són les unitats de nombre."
			},
			toUnit: {
				name: "unitat_destí",
				detail: "són les unitats per al resultat."
			}
		}
	},
	DEC2BIN: {
		description: "Converteix un nombre decimal a binari",
		abstract: "Converteix un nombre decimal a binari",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/dec2bin-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El nombre decimal que voleu convertir."
			},
			places: {
				name: "posicions",
				detail: "El nombre de caràcters que es faran servir."
			}
		}
	},
	DEC2HEX: {
		description: "Converteix un nombre decimal a hexadecimal",
		abstract: "Converteix un nombre decimal a hexadecimal",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/dec2hex-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El nombre decimal que voleu convertir."
			},
			places: {
				name: "posicions",
				detail: "El nombre de caràcters que es faran servir."
			}
		}
	},
	DEC2OCT: {
		description: "Converteix un nombre decimal a octal",
		abstract: "Converteix un nombre decimal a octal",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/dec2oct-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El nombre decimal que voleu convertir."
			},
			places: {
				name: "posicions",
				detail: "El nombre de caràcters que es faran servir."
			}
		}
	},
	DELTA: {
		description: "Comprova si dos valors són iguals",
		abstract: "Comprova si dos valors són iguals",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/delta-function"
		}],
		functionParameter: {
			number1: {
				name: "nombre1",
				detail: "El primer nombre."
			},
			number2: {
				name: "nombre2",
				detail: "El segon nombre. Si s'omet, se suposa que nombre2 és zero."
			}
		}
	},
	ERF: {
		description: "Retorna la funció d'error",
		abstract: "Retorna la funció d'error",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/erf-function"
		}],
		functionParameter: {
			lowerLimit: {
				name: "límit_inferior",
				detail: "El límit inferior per integrar ERF."
			},
			upperLimit: {
				name: "límit_superior",
				detail: "El límit superior per integrar ERF. Si s'omet, ERF integra entre zero i límit_inferior."
			}
		}
	},
	ERF_PRECISE: {
		description: "Retorna la funció d'error",
		abstract: "Retorna la funció d'error",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/erf-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "El límit inferior per integrar ERF.PRECÍS."
		} }
	},
	ERFC: {
		description: "Retorna la funció d'error complementària",
		abstract: "Retorna la funció d'error complementària",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/erfc-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "El límit inferior per integrar ERFC."
		} }
	},
	ERFC_PRECISE: {
		description: "Retorna la funció ERF complementària integrada entre x i infinit",
		abstract: "Retorna la funció ERF complementària integrada entre x i infinit",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/erfc-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "El límit inferior per integrar ERFC.PRECÍS."
		} }
	},
	GESTEP: {
		description: "Comprova si un nombre és major que un valor llindar",
		abstract: "Comprova si un nombre és major que un valor llindar",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/gestep-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El valor que es provarà contra escaló."
			},
			step: {
				name: "escaló",
				detail: "El valor llindar. Si ometeu un valor per escaló, GESTEP utilitza zero."
			}
		}
	},
	HEX2BIN: {
		description: "Converteix un nombre hexadecimal a binari",
		abstract: "Converteix un nombre hexadecimal a binari",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/hex2bin-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El nombre hexadecimal que voleu convertir."
			},
			places: {
				name: "posicions",
				detail: "El nombre de caràcters que es faran servir."
			}
		}
	},
	HEX2DEC: {
		description: "Converteix un nombre hexadecimal a decimal",
		abstract: "Converteix un nombre hexadecimal a decimal",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/hex2dec-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "El nombre hexadecimal que voleu convertir."
		} }
	},
	HEX2OCT: {
		description: "Converteix un nombre hexadecimal a octal",
		abstract: "Converteix un nombre hexadecimal a octal",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/hex2oct-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El nombre hexadecimal que voleu convertir."
			},
			places: {
				name: "posicions",
				detail: "El nombre de caràcters que es faran servir."
			}
		}
	},
	IMABS: {
		description: "Retorna el valor absolut (mòdul) d'un nombre complex",
		abstract: "Retorna el valor absolut (mòdul) d'un nombre complex",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/imabs-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginari",
			detail: "Un nombre complex del qual voleu obtenir el valor absolut."
		} }
	},
	IMAGINARY: {
		description: "Retorna el coeficient imaginari d'un nombre complex",
		abstract: "Retorna el coeficient imaginari d'un nombre complex",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/imaginary-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginari",
			detail: "Un nombre complex del qual voleu obtenir el coeficient imaginari."
		} }
	},
	IMARGUMENT: {
		description: "Retorna l'argument theta, un angle expressat en radians",
		abstract: "Retorna l'argument theta, un angle expressat en radians",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/imargument-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginari",
			detail: "Un nombre complex del qual voleu obtenir l'argument theta."
		} }
	},
	IMCONJUGATE: {
		description: "Retorna el conjugat complex d'un nombre complex",
		abstract: "Retorna el conjugat complex d'un nombre complex",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/imconjugate-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginari",
			detail: "Un nombre complex del qual voleu obtenir el conjugat."
		} }
	},
	IMCOS: {
		description: "Retorna el cosinus d'un nombre complex",
		abstract: "Retorna el cosinus d'un nombre complex",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/imcos-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginari",
			detail: "Un nombre complex del qual voleu obtenir el cosinus."
		} }
	},
	IMCOSH: {
		description: "Retorna el cosinus hiperbòlic d'un nombre complex",
		abstract: "Retorna el cosinus hiperbòlic d'un nombre complex",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/imcosh-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginari",
			detail: "Un nombre complex del qual voleu obtenir el cosinus hiperbòlic."
		} }
	},
	IMCOT: {
		description: "Retorna la cotangent d'un nombre complex",
		abstract: "Retorna la cotangent d'un nombre complex",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/imcot-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginari",
			detail: "Un nombre complex del qual voleu obtenir la cotangent."
		} }
	},
	IMCOTH: {
		description: "La funció IMCOTH torna la cotangent hiperbòlica del nombre complex determinat. Per exemple, un nombre complex determinat \"x+yi\" torna \"coth(x+yi)\".",
		abstract: "La funció IMCOTH torna la cotangent hiperbòlica del nombre complex determinat. Per exemple, un nombre complex determinat \"x+yi\" torna \"coth(x+yi)\".",
		links: [{
			title: "Instruccions",
			url: "https://support.google.com/docs/answer/9366256?hl=ca"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginari",
			detail: "Nombre complex de què es vol calcular la cotangent hiperbòlica. Pot ser el resultat de la funció COMPLEX, un nombre real interpretat com a nombre complex amb parts imaginàries iguals a 0 o una cadena amb el format \"x+yi\" on \"x\" i \"y\" són valors numèrics."
		} }
	},
	IMCSC: {
		description: "Retorna la cosecant d'un nombre complex",
		abstract: "Retorna la cosecant d'un nombre complex",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/imcsc-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginari",
			detail: "Un nombre complex del qual voleu obtenir la cosecant."
		} }
	},
	IMCSCH: {
		description: "Retorna la cosecant hiperbòlica d'un nombre complex",
		abstract: "Retorna la cosecant hiperbòlica d'un nombre complex",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/imcsch-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginari",
			detail: "Un nombre complex del qual voleu obtenir la cosecant hiperbòlica."
		} }
	},
	IMDIV: {
		description: "Retorna el quocient de dos nombres complexos",
		abstract: "Retorna el quocient de dos nombres complexos",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/imdiv-function"
		}],
		functionParameter: {
			inumber1: {
				name: "núm_imaginari1",
				detail: "El numerador o dividend complex."
			},
			inumber2: {
				name: "núm_imaginari2",
				detail: "El denominador o divisor complex."
			}
		}
	},
	IMEXP: {
		description: "Retorna l'exponencial d'un nombre complex",
		abstract: "Retorna l'exponencial d'un nombre complex",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/imexp-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginari",
			detail: "Un nombre complex del qual voleu obtenir l'exponencial."
		} }
	},
	IMLN: {
		description: "Retorna el logaritme natural d'un nombre complex",
		abstract: "Retorna el logaritme natural d'un nombre complex",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/imln-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginari",
			detail: "Un nombre complex del qual voleu obtenir el logaritme natural."
		} }
	},
	IMLOG: {
		description: "La funció IMLOG torna el logaritme d'un nombre complex amb una base especificada.",
		abstract: "La funció IMLOG torna el logaritme d'un nombre complex amb una base especificada.",
		links: [{
			title: "Instruccions",
			url: "https://support.google.com/docs/answer/9366486?hl=ca"
		}],
		functionParameter: {
			inumber: {
				name: "núm_imaginari",
				detail: "Valor d'entrada de la funció logarítmica. El nombre es pot escriure sense format, per exemple, 1, per interpretar-lo com un nombre real. El nombre es pot escriure com a text citat per especificar tant el coeficient real com el complex."
			},
			base: {
				name: "base",
				detail: "Base que cal utilitzar en calcular el logaritme. Ha de ser un nombre real positiu."
			}
		}
	},
	IMLOG10: {
		description: "Retorna el logaritme en base 10 d'un nombre complex",
		abstract: "Retorna el logaritme en base 10 d'un nombre complex",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/imlog10-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginari",
			detail: "Un nombre complex del qual voleu obtenir el logaritme comú."
		} }
	},
	IMLOG2: {
		description: "Retorna el logaritme en base 2 d'un nombre complex",
		abstract: "Retorna el logaritme en base 2 d'un nombre complex",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/imlog2-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginari",
			detail: "Un nombre complex del qual voleu obtenir el logaritme en base 2."
		} }
	},
	IMPOWER: {
		description: "Retorna un nombre complex elevat a una potència entera",
		abstract: "Retorna un nombre complex elevat a una potència entera",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/impower-function"
		}],
		functionParameter: {
			inumber: {
				name: "núm_imaginari",
				detail: "Un nombre complex que voleu elevar a una potència."
			},
			number: {
				name: "nombre",
				detail: "La potència a la qual voleu elevar el nombre complex."
			}
		}
	},
	IMPRODUCT: {
		description: "Retorna el producte de 1 a 255 nombres complexos",
		abstract: "Retorna el producte de 1 a 255 nombres complexos",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/improduct-function"
		}],
		functionParameter: {
			inumber1: {
				name: "núm_imaginari1",
				detail: "D'1 a 255 nombres complexos per multiplicar."
			},
			inumber2: {
				name: "núm_imaginari2",
				detail: "D'1 a 255 nombres complexos per multiplicar."
			}
		}
	},
	IMREAL: {
		description: "Retorna el coeficient real d'un nombre complex",
		abstract: "Retorna el coeficient real d'un nombre complex",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/imreal-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginari",
			detail: "Un nombre complex del qual voleu obtenir el coeficient real."
		} }
	},
	IMSEC: {
		description: "Retorna la secant d'un nombre complex",
		abstract: "Retorna la secant d'un nombre complex",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/imsec-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginari",
			detail: "Un nombre complex del qual voleu obtenir la secant."
		} }
	},
	IMSECH: {
		description: "Retorna la secant hiperbòlica d'un nombre complex",
		abstract: "Retorna la secant hiperbòlica d'un nombre complex",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/imsech-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginari",
			detail: "Un nombre complex del qual voleu obtenir la secant hiperbòlica."
		} }
	},
	IMSIN: {
		description: "Retorna el sinus d'un nombre complex",
		abstract: "Retorna el sinus d'un nombre complex",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/imsin-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginari",
			detail: "Un nombre complex del qual voleu obtenir el sinus."
		} }
	},
	IMSINH: {
		description: "Retorna el sinus hiperbòlic d'un nombre complex",
		abstract: "Retorna el sinus hiperbòlic d'un nombre complex",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/imsinh-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginari",
			detail: "Un nombre complex del qual voleu obtenir el sinus hiperbòlic."
		} }
	},
	IMSQRT: {
		description: "Retorna l'arrel quadrada d'un nombre complex",
		abstract: "Retorna l'arrel quadrada d'un nombre complex",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/imsqrt-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginari",
			detail: "Un nombre complex del qual voleu obtenir l'arrel quadrada."
		} }
	},
	IMSUB: {
		description: "Retorna la diferència entre dos nombres complexos",
		abstract: "Retorna la diferència entre dos nombres complexos",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/imsub-function"
		}],
		functionParameter: {
			inumber1: {
				name: "núm_imaginari1",
				detail: "núm_imaginari1."
			},
			inumber2: {
				name: "núm_imaginari2",
				detail: "núm_imaginari2."
			}
		}
	},
	IMSUM: {
		description: "Retorna la suma de nombres complexos",
		abstract: "Retorna la suma de nombres complexos",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/imsum-function"
		}],
		functionParameter: {
			inumber1: {
				name: "núm_imaginari1",
				detail: "D'1 a 255 nombres complexos per sumar."
			},
			inumber2: {
				name: "núm_imaginari2",
				detail: "D'1 a 255 nombres complexos per sumar."
			}
		}
	},
	IMTAN: {
		description: "Retorna la tangent d'un nombre complex",
		abstract: "Retorna la tangent d'un nombre complex",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/imtan-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginari",
			detail: "Un nombre complex del qual voleu obtenir la tangent."
		} }
	},
	IMTANH: {
		description: "La funció IMTANH torna la tangent hiperbòlica del nombre complex determinat. Per exemple, un nombre complex determinat \"x+yi\" torna \"tanh(x+yi)\".",
		abstract: "La funció IMTANH torna la tangent hiperbòlica del nombre complex determinat. Per exemple, un nombre complex determinat \"x+yi\" torna \"tanh(x+yi)\".",
		links: [{
			title: "Instruccions",
			url: "https://support.google.com/docs/answer/9366655?hl=ca"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginari",
			detail: "El nombre complex per al qual es vol calcular la tangent hiperbòlica. Pot ser el resultat de la funció COMPLEX, un nombre real interpretat com a nombre complex amb parts imaginàries iguals a 0 o una cadena amb el format \"x+yi\" on x i y són valors numèrics."
		} }
	},
	OCT2BIN: {
		description: "Converteix un nombre octal a binari",
		abstract: "Converteix un nombre octal a binari",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/oct2bin-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El nombre octal que voleu convertir."
			},
			places: {
				name: "posicions",
				detail: "El nombre de caràcters que es faran servir."
			}
		}
	},
	OCT2DEC: {
		description: "Converteix un nombre octal a decimal",
		abstract: "Converteix un nombre octal a decimal",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/oct2dec-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "El nombre octal que voleu convertir."
		} }
	},
	OCT2HEX: {
		description: "Converteix un nombre octal a hexadecimal",
		abstract: "Converteix un nombre octal a hexadecimal",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/oct2hex-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El nombre octal que voleu convertir."
			},
			places: {
				name: "posicions",
				detail: "El nombre de caràcters que es faran servir."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/financial/ca-ES.ts
const locale$9 = {
	ACCRINT: {
		description: "Retorna l'interès acumulat d'un valor que paga interessos periòdics",
		abstract: "Retorna l'interès acumulat d'un valor que paga interessos periòdics",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/accrint-function"
		}],
		functionParameter: {
			issue: {
				name: "emissió",
				detail: "La data d'emissió del valor."
			},
			firstInterest: {
				name: "primer_interès",
				detail: "La data del primer pagament d'interessos del valor."
			},
			settlement: {
				name: "liquidació",
				detail: "La data de venciment del valor."
			},
			rate: {
				name: "taxa",
				detail: "El tipus de cupó anual del valor."
			},
			par: {
				name: "valor_nominal",
				detail: "El valor nominal del valor."
			},
			frequency: {
				name: "freqüència",
				detail: "El nombre de pagaments de cupó per any."
			},
			basis: {
				name: "base",
				detail: "El tipus de base de recompte de dies que cal utilitzar."
			},
			calcMethod: {
				name: "mètode_càlcul",
				detail: "Un valor lògic: TRUE o omès indica que els interessos s'acumulen des de la data d'emissió; FALSE indica que s'acumulen des de la darrera data de pagament del cupó."
			}
		}
	},
	ACCRINTM: {
		description: "Retorna l'interès acumulat d'un valor que paga interessos al venciment.",
		abstract: "Retorna l'interès acumulat d'un valor que paga interessos al venciment.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/accrintm-function"
		}],
		functionParameter: {
			issue: {
				name: "emissió",
				detail: "La data d'emissió del valor."
			},
			settlement: {
				name: "liquidació",
				detail: "La data de venciment del valor."
			},
			rate: {
				name: "taxa",
				detail: "El tipus de cupó anual del valor."
			},
			par: {
				name: "valor_nominal",
				detail: "El valor nominal del valor. Si s'omet, ACCRINTM utilitza 1.000 $."
			},
			basis: {
				name: "base",
				detail: "El tipus de base de recompte de dies que cal utilitzar."
			}
		}
	},
	AMORDEGRC: {
		description: "Retorna l'amortització de cada període comptable mitjançant un coeficient d'amortització.",
		abstract: "Retorna l'amortització de cada període comptable mitjançant un coeficient d'amortització.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/amordegrc-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "El cost de l'actiu."
			},
			datePurchased: {
				name: "date_purchased",
				detail: "La data de compra de l'actiu."
			},
			firstPeriod: {
				name: "first_period",
				detail: "La data de finalització del primer període."
			},
			salvage: {
				name: "salvage",
				detail: "El valor residual al final de la vida útil de l'actiu."
			},
			period: {
				name: "period",
				detail: "El període."
			},
			rate: {
				name: "rate",
				detail: "La taxa d'amortització."
			},
			basis: {
				name: "basis",
				detail: "La base anual que s'ha d'utilitzar."
			}
		}
	},
	AMORLINC: {
		description: "Retorna l'amortització de cada període comptable.",
		abstract: "Retorna l'amortització de cada període comptable.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/amorlinc-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "El cost de l'actiu."
			},
			datePurchased: {
				name: "date_purchased",
				detail: "La data de compra de l'actiu."
			},
			firstPeriod: {
				name: "first_period",
				detail: "La data de finalització del primer període."
			},
			salvage: {
				name: "salvage",
				detail: "El valor residual al final de la vida útil de l'actiu."
			},
			period: {
				name: "period",
				detail: "El període."
			},
			rate: {
				name: "rate",
				detail: "La taxa d'amortització."
			},
			basis: {
				name: "basis",
				detail: "La base anual que s'ha d'utilitzar."
			}
		}
	},
	COUPDAYBS: {
		description: "Retorna el nombre de dies des de l'inici del període de cupó fins a la data de liquidació.",
		abstract: "Retorna el nombre de dies des de l'inici del període de cupó fins a la data de liquidació.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/coupdaybs-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidació",
				detail: "La data de liquidació del valor. És la data posterior a l'emissió en què el valor es negocia amb el comprador."
			},
			maturity: {
				name: "venciment",
				detail: "La data de venciment del valor. És la data en què el valor expira."
			},
			frequency: {
				name: "freqüència",
				detail: "El nombre de pagaments de cupó per any. Per a pagaments anuals, freqüència = 1; semestrals, freqüència = 2; trimestrals, freqüència = 4."
			},
			basis: {
				name: "base",
				detail: "El tipus de base de recompte de dies que cal utilitzar."
			}
		}
	},
	COUPDAYS: {
		description: "Retorna el nombre de dies del període de cupó que conté la data de liquidació.",
		abstract: "Retorna el nombre de dies del període de cupó que conté la data de liquidació.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/coupdays-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidació",
				detail: "La data de liquidació del valor. És la data posterior a l'emissió en què el valor es negocia amb el comprador."
			},
			maturity: {
				name: "venciment",
				detail: "La data de venciment del valor. És la data en què el valor expira."
			},
			frequency: {
				name: "freqüència",
				detail: "El nombre de pagaments de cupó per any. Per a pagaments anuals, freqüència = 1; semestrals, freqüència = 2; trimestrals, freqüència = 4."
			},
			basis: {
				name: "base",
				detail: "El tipus de base de recompte de dies que cal utilitzar."
			}
		}
	},
	COUPDAYSNC: {
		description: "Retorna el nombre de dies des de la data de liquidació fins a la data del cupó següent.",
		abstract: "Retorna el nombre de dies des de la data de liquidació fins a la data del cupó següent.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/coupdaysnc-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidació",
				detail: "La data de liquidació del valor. És la data posterior a l'emissió en què el valor es negocia amb el comprador."
			},
			maturity: {
				name: "venciment",
				detail: "La data de venciment del valor. És la data en què el valor expira."
			},
			frequency: {
				name: "freqüència",
				detail: "El nombre de pagaments de cupó per any. Per a pagaments anuals, freqüència = 1; semestrals, freqüència = 2; trimestrals, freqüència = 4."
			},
			basis: {
				name: "base",
				detail: "El tipus de base de recompte de dies que cal utilitzar."
			}
		}
	},
	COUPNCD: {
		description: "Retorna la data del cupó següent després de la data de liquidació.",
		abstract: "Retorna la data del cupó següent després de la data de liquidació.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/coupncd-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidació",
				detail: "La data de liquidació del valor. És la data posterior a l'emissió en què el valor es negocia amb el comprador."
			},
			maturity: {
				name: "venciment",
				detail: "La data de venciment del valor. És la data en què el valor expira."
			},
			frequency: {
				name: "freqüència",
				detail: "El nombre de pagaments de cupó per any. Per a pagaments anuals, freqüència = 1; semestrals, freqüència = 2; trimestrals, freqüència = 4."
			},
			basis: {
				name: "base",
				detail: "El tipus de base de recompte de dies que cal utilitzar."
			}
		}
	},
	COUPNUM: {
		description: "Retorna el nombre de cupons pagables entre la data de liquidació i la data de venciment.",
		abstract: "Retorna el nombre de cupons pagables entre la data de liquidació i la data de venciment.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/coupnum-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidació",
				detail: "La data de liquidació del valor. És la data posterior a l'emissió en què el valor es negocia amb el comprador."
			},
			maturity: {
				name: "venciment",
				detail: "La data de venciment del valor. És la data en què el valor expira."
			},
			frequency: {
				name: "freqüència",
				detail: "El nombre de pagaments de cupó per any. Per a pagaments anuals, freqüència = 1; semestrals, freqüència = 2; trimestrals, freqüència = 4."
			},
			basis: {
				name: "base",
				detail: "El tipus de base de recompte de dies que cal utilitzar."
			}
		}
	},
	COUPPCD: {
		description: "Retorna la data del cupó anterior a la data de liquidació.",
		abstract: "Retorna la data del cupó anterior a la data de liquidació.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/couppcd-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidació",
				detail: "La data de liquidació del valor. És la data posterior a l'emissió en què el valor es negocia amb el comprador."
			},
			maturity: {
				name: "venciment",
				detail: "La data de venciment del valor. És la data en què el valor expira."
			},
			frequency: {
				name: "freqüència",
				detail: "El nombre de pagaments de cupó per any. Per a pagaments anuals, freqüència = 1; semestrals, freqüència = 2; trimestrals, freqüència = 4."
			},
			basis: {
				name: "base",
				detail: "El tipus de base de recompte de dies que cal utilitzar."
			}
		}
	},
	CUMIPMT: {
		description: "Retorna els interessos acumulats pagats entre dos períodes.",
		abstract: "Retorna els interessos acumulats pagats entre dos períodes.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/cumipmt-function"
		}],
		functionParameter: {
			rate: {
				name: "taxa",
				detail: "El tipus d'interès."
			},
			nper: {
				name: "nper",
				detail: "El nombre total de períodes de pagament."
			},
			pv: {
				name: "pv",
				detail: "El valor actual."
			},
			startPeriod: {
				name: "període_inicial",
				detail: "El primer període del càlcul. Els períodes de pagament es numeren a partir d’1."
			},
			endPeriod: {
				name: "període_final",
				detail: "L’últim període del càlcul."
			},
			type: {
				name: "tipus",
				detail: "El moment del pagament."
			}
		}
	},
	CUMPRINC: {
		description: "Retorna el principal acumulat pagat d'un préstec entre dos períodes.",
		abstract: "Retorna el principal acumulat pagat d'un préstec entre dos períodes.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/cumprinc-function"
		}],
		functionParameter: {
			rate: {
				name: "taxa",
				detail: "El tipus d'interès."
			},
			nper: {
				name: "nper",
				detail: "El nombre total de períodes de pagament."
			},
			pv: {
				name: "pv",
				detail: "El valor actual."
			},
			startPeriod: {
				name: "període_inicial",
				detail: "El primer període del càlcul. Els períodes de pagament es numeren a partir d’1."
			},
			endPeriod: {
				name: "període_final",
				detail: "L’últim període del càlcul."
			},
			type: {
				name: "tipus",
				detail: "El moment del pagament."
			}
		}
	},
	DB: {
		description: "Retorna l'amortització d'un actiu per a un període especificat mitjançant el mètode de saldo decreixent a tipus fix.",
		abstract: "Retorna l'amortització d'un actiu per a un període especificat mitjançant el mètode de saldo decreixent a tipus fix.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/db-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "El cost inicial de l'actiu."
			},
			salvage: {
				name: "valor_residual",
				detail: "El valor al final de l'amortització, també anomenat valor residual de l'actiu."
			},
			life: {
				name: "vida_útil",
				detail: "El nombre de períodes durant els quals s'amortitza l'actiu, també anomenat vida útil de l'actiu."
			},
			period: {
				name: "període",
				detail: "El període del qual es vol calcular l'amortització. Ha d'utilitzar les mateixes unitats que vida_útil."
			},
			month: {
				name: "mes",
				detail: "El nombre de mesos del primer any. Si s’omet, se suposa que és 12."
			}
		}
	},
	DDB: {
		description: "Retorna l'amortització d'un actiu per a un període especificat mitjançant el mètode de saldo decreixent doble o un altre mètode que especifiqueu.",
		abstract: "Retorna l'amortització d'un actiu per a un període especificat mitjançant el mètode de saldo decreixent doble o un altre mètode que especifiqueu.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/ddb-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "El cost inicial de l'actiu."
			},
			salvage: {
				name: "valor_residual",
				detail: "El valor al final de l'amortització, també anomenat valor residual de l'actiu. Pot ser 0."
			},
			life: {
				name: "vida_útil",
				detail: "El nombre de períodes durant els quals s'amortitza l'actiu, també anomenat vida útil de l'actiu."
			},
			period: {
				name: "període",
				detail: "El període del qual es vol calcular l'amortització. Ha d'utilitzar les mateixes unitats que vida_útil."
			},
			factor: {
				name: "factor",
				detail: "La taxa a la qual disminueix el saldo. Si s’omet, se suposa que és 2, és a dir, el mètode de saldo decreixent doble."
			}
		}
	},
	DISC: {
		description: "Retorna la taxa de descompte d'un valor.",
		abstract: "Retorna la taxa de descompte d'un valor.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/disc-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidació",
				detail: "La data de liquidació del valor. És la data posterior a l'emissió en què el valor es negocia amb el comprador."
			},
			maturity: {
				name: "venciment",
				detail: "La data de venciment del valor. És la data en què el valor expira."
			},
			pr: {
				name: "preu",
				detail: "El preu del valor per cada 100 $ de valor nominal."
			},
			redemption: {
				name: "reemborsament",
				detail: "El valor de reemborsament del valor per cada 100 $ de valor nominal."
			},
			basis: {
				name: "base",
				detail: "El tipus de base de recompte de dies que cal utilitzar."
			}
		}
	},
	DOLLARDE: {
		description: "Converteix un preu en dòlars expressat com a fracció en un preu en dòlars expressat com a nombre decimal.",
		abstract: "Converteix un preu en dòlars expressat com a fracció en un preu en dòlars expressat com a nombre decimal.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/dollarde-function"
		}],
		functionParameter: {
			fractionalDollar: {
				name: "dòlar_fraccionari",
				detail: "Un nombre expressat com una part entera i una part fraccionària, separades per un símbol decimal."
			},
			fraction: {
				name: "fracció",
				detail: "L’enter que s’utilitza com a denominador de la fracció."
			}
		}
	},
	DOLLARFR: {
		description: "Converteix un preu en dòlars expressat com a nombre decimal en un preu en dòlars expressat com a fracció.",
		abstract: "Converteix un preu en dòlars expressat com a nombre decimal en un preu en dòlars expressat com a fracció.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/dollarfr-function"
		}],
		functionParameter: {
			decimalDollar: {
				name: "dòlar_decimal",
				detail: "Un nombre decimal."
			},
			fraction: {
				name: "fracció",
				detail: "L’enter que s’utilitza com a denominador de la fracció."
			}
		}
	},
	DURATION: {
		description: "Retorna la durada anual d'un valor amb pagaments d'interessos periòdics.",
		abstract: "Retorna la durada anual d'un valor amb pagaments d'interessos periòdics.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/duration-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidació",
				detail: "La data de liquidació del valor. És la data posterior a l'emissió en què el valor es negocia amb el comprador."
			},
			maturity: {
				name: "venciment",
				detail: "La data de venciment del valor. És la data en què el valor expira."
			},
			coupon: {
				name: "cupó",
				detail: "El tipus de cupó anual del valor."
			},
			yld: {
				name: "rendiment",
				detail: "El rendiment anual del valor."
			},
			frequency: {
				name: "freqüència",
				detail: "El nombre de pagaments de cupó per any. Per a pagaments anuals, freqüència = 1; semestrals, freqüència = 2; trimestrals, freqüència = 4."
			},
			basis: {
				name: "base",
				detail: "El tipus de base de recompte de dies que cal utilitzar."
			}
		}
	},
	EFFECT: {
		description: "Devuelve la tasa de interés anual efectiva",
		abstract: "Devuelve la tasa de interés anual efectiva",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/ca-es/excel/functions/effect-function"
		}],
		functionParameter: {
			nominalRate: {
				name: "tasa_nominal",
				detail: "La tasa de interés nominal."
			},
			npery: {
				name: "núm_per_año",
				detail: "El número de periodos de composición por año."
			}
		}
	},
	FV: {
		description: "Retorna el valor futur d'una inversió.",
		abstract: "Retorna el valor futur d'una inversió.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/fv-function"
		}],
		functionParameter: {
			rate: {
				name: "taxa",
				detail: "El tipus d'interès per període."
			},
			nper: {
				name: "nper",
				detail: "El nombre total de períodes de pagament d'una anualitat."
			},
			pmt: {
				name: "pagament",
				detail: "El pagament efectuat a cada període; no pot variar durant la vida de l'anualitat."
			},
			pv: {
				name: "pv",
				detail: "El valor actual, o l’import únic al qual equival ara una sèrie de pagaments futurs."
			},
			type: {
				name: "tipus",
				detail: "El nombre 0 o 1 que indica quan s’han de fer els pagaments."
			}
		}
	},
	FVSCHEDULE: {
		description: "Retorna el valor futur d'un principal inicial després d'aplicar una sèrie de tipus d'interès compostos.",
		abstract: "Retorna el valor futur d'un principal inicial després d'aplicar una sèrie de tipus d'interès compostos.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/fvschedule-function"
		}],
		functionParameter: {
			principal: {
				name: "principal",
				detail: "El valor actual."
			},
			schedule: {
				name: "calendari",
				detail: "Una matriu de tipus d'interès que s'han d'aplicar."
			}
		}
	},
	INTRATE: {
		description: "Devuelve la tasa de interés para la inversión total en un valor bursátil.",
		abstract: "Devuelve la tasa de interés para la inversión total en un valor bursátil.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/ca-es/excel/functions/intrate-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidación",
				detail: "Obligatorio. La fecha de liquidación del valor bursátil. La fecha de liquidación del valor bursátil es la fecha posterior a la fecha de emisión en la que el comprador adquiere el valor bursátil."
			},
			maturity: {
				name: "vencimiento",
				detail: "Obligatorio. La fecha de vencimiento del valor bursátil. La fecha de vencimiento es aquella en la que expira el valor bursátil."
			},
			investment: {
				name: "inversión",
				detail: "Obligatorio. Es la cantidad de dinero invertido en el valor bursátil."
			},
			redemption: {
				name: "rescate",
				detail: "Obligatorio. Es el valor que se recibirá en la fecha de vencimiento."
			},
			basis: {
				name: "base",
				detail: "Opcional. Determina en qué tipo de base deben contarse los días."
			}
		}
	},
	IPMT: {
		description: "Devuelve el pago de intereses de una inversión durante un periodo determinado",
		abstract: "Devuelve el pago de intereses de una inversión durante un periodo determinado",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/ca-es/excel/functions/ipmt-function"
		}],
		functionParameter: {
			rate: {
				name: "tasa",
				detail: "La tasa de interés por periodo."
			},
			per: {
				name: "periodo",
				detail: "El periodo para el cual desea buscar el interés y debe estar en el rango de 1 a núm_pagos."
			},
			nper: {
				name: "núm_pagos",
				detail: "El número total de periodos de pago en una anualidad."
			},
			pv: {
				name: "va",
				detail: "El valor actual, o la cantidad total que vale ahora una serie de pagos futuros."
			},
			fv: {
				name: "vf",
				detail: "El valor futuro, o un saldo en efectivo que desea lograr después de realizar el último pago."
			},
			type: {
				name: "tipo",
				detail: "El número 0 o 1 e indica cuándo vencen los pagos."
			}
		}
	},
	IRR: {
		description: "Retorna la taxa interna de rendiment d'una sèrie de fluxos d'efectiu.",
		abstract: "Retorna la taxa interna de rendiment d'una sèrie de fluxos d'efectiu.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/irr-function"
		}],
		functionParameter: {
			values: {
				name: "valors",
				detail: "Una matriu o referència a cel·les amb nombres per als quals es vol calcular la taxa interna de rendiment. Han de contenir almenys un valor positiu i un de negatiu. IRR utilitza l’ordre dels valors per interpretar l’ordre dels fluxos d’efectiu; introduïu pagaments i ingressos en l’ordre desitjat. El text, els valors lògics i les cel·les buides s’ignoren."
			},
			guess: {
				name: "estimació",
				detail: "Un nombre que estimeu proper al resultat d’IRR."
			}
		}
	},
	ISPMT: {
		description: "Calcula els interessos pagats durant un període específic d'una inversió.",
		abstract: "Calcula els interessos pagats durant un període específic d'una inversió.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/ispmt-function"
		}],
		functionParameter: {
			rate: {
				name: "taxa",
				detail: "El tipus d'interès de la inversió."
			},
			per: {
				name: "període",
				detail: "El període del qual es vol obtenir l'interès; ha d'estar entre 1 i nper."
			},
			nper: {
				name: "nper",
				detail: "El nombre total de períodes de pagament de la inversió."
			},
			pv: {
				name: "pv",
				detail: "El valor actual de la inversió. Per a un préstec, pv és l’import del préstec."
			}
		}
	},
	MDURATION: {
		description: "Retorna la durada modificada de Macaulay d'un valor amb un valor nominal suposat de 100 dòlars.",
		abstract: "Retorna la durada modificada de Macaulay d'un valor amb un valor nominal suposat de 100 dòlars.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/mduration-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidació",
				detail: "La data de liquidació del valor. És la data posterior a l'emissió en què el valor es negocia amb el comprador."
			},
			maturity: {
				name: "venciment",
				detail: "La data de venciment del valor. És la data en què el valor expira."
			},
			coupon: {
				name: "cupó",
				detail: "El tipus de cupó anual del valor."
			},
			yld: {
				name: "rendiment",
				detail: "El rendiment anual del valor."
			},
			frequency: {
				name: "freqüència",
				detail: "El nombre de pagaments de cupó per any. Per a pagaments anuals, freqüència = 1; semestrals, freqüència = 2; trimestrals, freqüència = 4."
			},
			basis: {
				name: "base",
				detail: "El tipus de base de recompte de dies que cal utilitzar."
			}
		}
	},
	MIRR: {
		description: "Retorna la taxa interna de rendiment quan els fluxos d'efectiu positius i negatius es financen a tipus diferents.",
		abstract: "Retorna la taxa interna de rendiment quan els fluxos d'efectiu positius i negatius es financen a tipus diferents.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/mirr-function"
		}],
		functionParameter: {
			values: {
				name: "valors",
				detail: "Una matriu o referència a cel·les que contenen nombres. Representen una sèrie de pagaments (valors negatius) i ingressos (valors positius) en períodes regulars. Han de contenir almenys un valor positiu i un de negatiu; en cas contrari, MIRR retorna #DIV/0!. El text, els valors lògics i les cel·les buides s’ignoren, però s’inclouen les cel·les amb valor zero."
			},
			financeRate: {
				name: "taxa_finançament",
				detail: "El tipus d'interès que es paga pels diners utilitzats en els fluxos d'efectiu."
			},
			reinvestRate: {
				name: "taxa_reinversió",
				detail: "El tipus d'interès que es rep en reinvertir els fluxos d'efectiu."
			}
		}
	},
	NOMINAL: {
		description: "Retorna la taxa d'interès nominal anual.",
		abstract: "Retorna la taxa d'interès nominal anual.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/nominal-function"
		}],
		functionParameter: {
			effectRate: {
				name: "taxa_efectiva",
				detail: "El tipus d'interès efectiu."
			},
			npery: {
				name: "npery",
				detail: "El nombre de períodes de capitalització per any."
			}
		}
	},
	NPER: {
		description: "Retorna el nombre de períodes d'una inversió.",
		abstract: "Retorna el nombre de períodes d'una inversió.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/nper-function"
		}],
		functionParameter: {
			rate: {
				name: "taxa",
				detail: "El tipus d'interès per període."
			},
			pmt: {
				name: "pagament",
				detail: "El pagament efectuat a cada període; no pot variar durant la vida de l'anualitat."
			},
			pv: {
				name: "pv",
				detail: "El valor actual, o l’import únic al qual equival ara una sèrie de pagaments futurs."
			},
			fv: {
				name: "vf",
				detail: "El valor futur, o el saldo en efectiu que es vol assolir després de l’últim pagament."
			},
			type: {
				name: "tipus",
				detail: "El nombre 0 o 1 que indica quan s’han de fer els pagaments."
			}
		}
	},
	NPV: {
		description: "Retorna el valor actual net d'una inversió basat en una sèrie de fluxos d'efectiu periòdics i una taxa de descompte.",
		abstract: "Retorna el valor actual net d'una inversió basat en una sèrie de fluxos d'efectiu periòdics i una taxa de descompte.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/npv-function"
		}],
		functionParameter: {
			rate: {
				name: "taxa",
				detail: "La taxa de descompte corresponent a la durada d’un període."
			},
			value1: {
				name: "valor1",
				detail: "D’1 a 254 arguments que representen els pagaments i els ingressos."
			},
			value2: {
				name: "valor2",
				detail: "D’1 a 254 arguments que representen els pagaments i els ingressos."
			}
		}
	},
	ODDFPRICE: {
		description: "Retorna el preu per un valor nominal de 100 dòlars d'un valor amb un primer període irregular.",
		abstract: "Retorna el preu per un valor nominal de 100 dòlars d'un valor amb un primer període irregular.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/oddfprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidació",
				detail: "La data de liquidació del valor. És la data posterior a l'emissió en què el valor es negocia amb el comprador."
			},
			maturity: {
				name: "venciment",
				detail: "La data de venciment del valor. És la data en què el valor expira."
			},
			issue: {
				name: "emissió",
				detail: "La data d'emissió del valor."
			},
			firstCoupon: {
				name: "primer_cupó",
				detail: "La data del primer cupó del valor."
			},
			rate: {
				name: "taxa",
				detail: "El tipus d'interès del valor."
			},
			yld: {
				name: "rendiment",
				detail: "El rendiment anual del valor."
			},
			redemption: {
				name: "reemborsament",
				detail: "El valor de reemborsament del valor per cada 100 $ de valor nominal."
			},
			frequency: {
				name: "freqüència",
				detail: "El nombre de pagaments de cupó per any. Per a pagaments anuals, freqüència = 1; semestrals, freqüència = 2; trimestrals, freqüència = 4."
			},
			basis: {
				name: "base",
				detail: "El tipus de base de recompte de dies que cal utilitzar."
			}
		}
	},
	ODDFYIELD: {
		description: "Retorna el rendiment d'un valor amb un primer període irregular.",
		abstract: "Retorna el rendiment d'un valor amb un primer període irregular.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/oddfyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidació",
				detail: "La data de liquidació del valor. És la data posterior a l'emissió en què el valor es negocia amb el comprador."
			},
			maturity: {
				name: "venciment",
				detail: "La data de venciment del valor. És la data en què el valor expira."
			},
			issue: {
				name: "emissió",
				detail: "La data d'emissió del valor."
			},
			firstCoupon: {
				name: "primer_cupó",
				detail: "La data del primer cupó del valor."
			},
			rate: {
				name: "taxa",
				detail: "El tipus d'interès del valor."
			},
			pr: {
				name: "preu",
				detail: "El preu del valor."
			},
			redemption: {
				name: "reemborsament",
				detail: "El valor de reemborsament del valor per cada 100 $ de valor nominal."
			},
			frequency: {
				name: "freqüència",
				detail: "El nombre de pagaments de cupó per any. Per a pagaments anuals, freqüència = 1; semestrals, freqüència = 2; trimestrals, freqüència = 4."
			},
			basis: {
				name: "base",
				detail: "El tipus de base de recompte de dies que cal utilitzar."
			}
		}
	},
	ODDLPRICE: {
		description: "Retorna el preu per un valor nominal de 100 dòlars d'un valor amb un últim període irregular.",
		abstract: "Retorna el preu per un valor nominal de 100 dòlars d'un valor amb un últim període irregular.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/oddlprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidació",
				detail: "La data de liquidació del valor. És la data posterior a l'emissió en què el valor es negocia amb el comprador."
			},
			maturity: {
				name: "venciment",
				detail: "La data de venciment del valor. És la data en què el valor expira."
			},
			lastInterest: {
				name: "últim_cupó",
				detail: "La data de l’últim cupó del valor."
			},
			rate: {
				name: "taxa",
				detail: "El tipus d'interès del valor."
			},
			yld: {
				name: "rendiment",
				detail: "El rendiment anual del valor."
			},
			redemption: {
				name: "reemborsament",
				detail: "El valor de reemborsament del valor per cada 100 $ de valor nominal."
			},
			frequency: {
				name: "freqüència",
				detail: "El nombre de pagaments de cupó per any. Per a pagaments anuals, freqüència = 1; semestrals, freqüència = 2; trimestrals, freqüència = 4."
			},
			basis: {
				name: "base",
				detail: "El tipus de base de recompte de dies que cal utilitzar."
			}
		}
	},
	ODDLYIELD: {
		description: "Retorna el rendiment d'un valor amb un últim període irregular.",
		abstract: "Retorna el rendiment d'un valor amb un últim període irregular.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/oddlyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidació",
				detail: "La data de liquidació del valor. És la data posterior a l'emissió en què el valor es negocia amb el comprador."
			},
			maturity: {
				name: "venciment",
				detail: "La data de venciment del valor. És la data en què el valor expira."
			},
			lastInterest: {
				name: "últim_cupó",
				detail: "La data de l’últim cupó del valor."
			},
			rate: {
				name: "taxa",
				detail: "El tipus d'interès del valor."
			},
			pr: {
				name: "preu",
				detail: "El preu del valor."
			},
			redemption: {
				name: "reemborsament",
				detail: "El valor de reemborsament del valor per cada 100 $ de valor nominal."
			},
			frequency: {
				name: "freqüència",
				detail: "El nombre de pagaments de cupó per any. Per a pagaments anuals, freqüència = 1; semestrals, freqüència = 2; trimestrals, freqüència = 4."
			},
			basis: {
				name: "base",
				detail: "El tipus de base de recompte de dies que cal utilitzar."
			}
		}
	},
	PDURATION: {
		description: "Retorna el nombre de períodes necessaris perquè una inversió arribi a un valor especificat.",
		abstract: "Retorna el nombre de períodes necessaris perquè una inversió arribi a un valor especificat.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/pduration-function"
		}],
		functionParameter: {
			rate: {
				name: "taxa",
				detail: "El tipus d'interès per període."
			},
			pv: {
				name: "pv",
				detail: "El valor actual de la inversió."
			},
			fv: {
				name: "vf",
				detail: "El valor futur desitjat de la inversió."
			}
		}
	},
	PMT: {
		description: "Retorna el pagament periòdic d'una anualitat.",
		abstract: "Retorna el pagament periòdic d'una anualitat.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/pmt-function"
		}],
		functionParameter: {
			rate: {
				name: "taxa",
				detail: "El tipus d'interès del préstec."
			},
			nper: {
				name: "nper",
				detail: "El nombre total de pagaments del préstec."
			},
			pv: {
				name: "pv",
				detail: "El valor actual, o l’import total al qual equival ara una sèrie de pagaments futurs; també anomenat principal."
			},
			fv: {
				name: "vf",
				detail: "El valor futur, o el saldo en efectiu que es vol assolir després de l’últim pagament."
			},
			type: {
				name: "tipus",
				detail: "El nombre 0 o 1 que indica quan s’han de fer els pagaments."
			}
		}
	},
	PPMT: {
		description: "Retorna el pagament del principal d'una inversió per a un període determinat.",
		abstract: "Retorna el pagament del principal d'una inversió per a un període determinat.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/ppmt-function"
		}],
		functionParameter: {
			rate: {
				name: "taxa",
				detail: "El tipus d'interès per període."
			},
			per: {
				name: "període",
				detail: "El període del qual es vol trobar el principal; ha d'estar entre 1 i nper."
			},
			nper: {
				name: "nper",
				detail: "El nombre total de períodes de pagament d'una anualitat."
			},
			pv: {
				name: "pv",
				detail: "El valor actual, o l’import total al qual equival ara una sèrie de pagaments futurs."
			},
			fv: {
				name: "vf",
				detail: "El valor futur, o el saldo en efectiu que es vol assolir després de l’últim pagament."
			},
			type: {
				name: "tipus",
				detail: "El nombre 0 o 1 que indica quan s’han de fer els pagaments."
			}
		}
	},
	PRICE: {
		description: "Retorna el preu per un valor nominal de 100 dòlars d'un valor que paga interessos periòdics.",
		abstract: "Retorna el preu per un valor nominal de 100 dòlars d'un valor que paga interessos periòdics.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/price-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidació",
				detail: "La data de liquidació del valor. És la data posterior a l'emissió en què el valor es negocia amb el comprador."
			},
			maturity: {
				name: "venciment",
				detail: "La data de venciment del valor. És la data en què el valor expira."
			},
			rate: {
				name: "taxa",
				detail: "El tipus d'interès del valor."
			},
			yld: {
				name: "rendiment",
				detail: "El rendiment anual del valor."
			},
			redemption: {
				name: "reemborsament",
				detail: "El valor de reemborsament del valor per cada 100 $ de valor nominal."
			},
			frequency: {
				name: "freqüència",
				detail: "El nombre de pagaments de cupó per any. Per a pagaments anuals, freqüència = 1; semestrals, freqüència = 2; trimestrals, freqüència = 4."
			},
			basis: {
				name: "base",
				detail: "El tipus de base de recompte de dies que cal utilitzar."
			}
		}
	},
	PRICEDISC: {
		description: "Retorna el preu per un valor nominal de 100 dòlars d'un valor descomptat.",
		abstract: "Retorna el preu per un valor nominal de 100 dòlars d'un valor descomptat.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/pricedisc-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidació",
				detail: "La data de liquidació del valor. És la data posterior a l'emissió en què el valor es negocia amb el comprador."
			},
			maturity: {
				name: "venciment",
				detail: "La data de venciment del valor. És la data en què el valor expira."
			},
			discount: {
				name: "descompte",
				detail: "La taxa de descompte del valor."
			},
			redemption: {
				name: "reemborsament",
				detail: "El valor de reemborsament del valor per cada 100 $ de valor nominal."
			},
			basis: {
				name: "base",
				detail: "El tipus de base de recompte de dies que cal utilitzar."
			}
		}
	},
	PRICEMAT: {
		description: "Retorna el preu per un valor nominal de 100 dòlars d'un valor que paga interessos al venciment.",
		abstract: "Retorna el preu per un valor nominal de 100 dòlars d'un valor que paga interessos al venciment.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/pricemat-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidació",
				detail: "La data de liquidació del valor. És la data posterior a l'emissió en què el valor es negocia amb el comprador."
			},
			maturity: {
				name: "venciment",
				detail: "La data de venciment del valor. És la data en què el valor expira."
			},
			issue: {
				name: "emissió",
				detail: "La data d'emissió del valor, expressada com a número de sèrie de data."
			},
			rate: {
				name: "taxa",
				detail: "El tipus d'interès del valor a la data d'emissió."
			},
			yld: {
				name: "rendiment",
				detail: "El rendiment anual del valor."
			},
			basis: {
				name: "base",
				detail: "El tipus de base de recompte de dies que cal utilitzar."
			}
		}
	},
	PV: {
		description: "Retorna el valor actual d'una inversió.",
		abstract: "Retorna el valor actual d'una inversió.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/pv-function"
		}],
		functionParameter: {
			rate: {
				name: "taxa",
				detail: "El tipus d'interès per període."
			},
			nper: {
				name: "nper",
				detail: "El nombre total de períodes de pagament d'una anualitat."
			},
			pmt: {
				name: "pagament",
				detail: "El pagament efectuat a cada període; no pot variar durant la vida de l'anualitat."
			},
			fv: {
				name: "vf",
				detail: "El valor futur, o el saldo en efectiu que es vol assolir després de l’últim pagament."
			},
			type: {
				name: "tipus",
				detail: "El nombre 0 o 1 que indica quan s’han de fer els pagaments."
			}
		}
	},
	RATE: {
		description: "Retorna la taxa d'interès per període d'una anualitat.",
		abstract: "Retorna la taxa d'interès per període d'una anualitat.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/rate-function"
		}],
		functionParameter: {
			nper: {
				name: "nper",
				detail: "El nombre total de períodes de pagament d'una anualitat."
			},
			pmt: {
				name: "pagament",
				detail: "El pagament efectuat a cada període; no pot variar durant la vida de l'anualitat."
			},
			pv: {
				name: "pv",
				detail: "El valor actual, o l’import únic al qual equival ara una sèrie de pagaments futurs."
			},
			fv: {
				name: "vf",
				detail: "El valor futur, o el saldo en efectiu que es vol assolir després de l’últim pagament."
			},
			type: {
				name: "tipus",
				detail: "El nombre 0 o 1 que indica quan s’han de fer els pagaments."
			},
			guess: {
				name: "estimació",
				detail: "La vostra estimació del valor que tindrà la taxa."
			}
		}
	},
	RECEIVED: {
		description: "Retorna l'import rebut al venciment per un valor totalment invertit.",
		abstract: "Retorna l'import rebut al venciment per un valor totalment invertit.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/received-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidació",
				detail: "La data de liquidació del valor. És la data posterior a l'emissió en què el valor es negocia amb el comprador."
			},
			maturity: {
				name: "venciment",
				detail: "La data de venciment del valor. És la data en què el valor expira."
			},
			investment: {
				name: "inversió",
				detail: "L’import invertit en el valor."
			},
			discount: {
				name: "descompte",
				detail: "La taxa de descompte del valor."
			},
			basis: {
				name: "base",
				detail: "El tipus de base de recompte de dies que cal utilitzar."
			}
		}
	},
	RRI: {
		description: "Retorna un tipus d'interès equivalent per al creixement d'una inversió.",
		abstract: "Retorna un tipus d'interès equivalent per al creixement d'una inversió.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/rri-function"
		}],
		functionParameter: {
			nper: {
				name: "nper",
				detail: "El nombre de períodes de la inversió."
			},
			pv: {
				name: "pv",
				detail: "El valor actual de la inversió."
			},
			fv: {
				name: "vf",
				detail: "El valor futur de la inversió."
			}
		}
	},
	SLN: {
		description: "Retorna l'amortització lineal d'un actiu per a un període.",
		abstract: "Retorna l'amortització lineal d'un actiu per a un període.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/sln-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "El cost inicial de l'actiu."
			},
			salvage: {
				name: "valor_residual",
				detail: "El valor al final de l'amortització, també anomenat valor residual de l'actiu."
			},
			life: {
				name: "vida_útil",
				detail: "El nombre de períodes durant els quals s'amortitza l'actiu, també anomenat vida útil de l'actiu."
			}
		}
	},
	SYD: {
		description: "Retorna l'amortització d'un actiu per a un període especificat mitjançant el mètode de la suma dels dígits dels anys.",
		abstract: "Retorna l'amortització d'un actiu per a un període especificat mitjançant el mètode de la suma dels dígits dels anys.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/syd-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "El cost inicial de l'actiu."
			},
			salvage: {
				name: "valor_residual",
				detail: "El valor al final de l'amortització, també anomenat valor residual de l'actiu."
			},
			life: {
				name: "vida_útil",
				detail: "El nombre de períodes durant els quals s'amortitza l'actiu, també anomenat vida útil de l'actiu."
			},
			per: {
				name: "període",
				detail: "El període; ha d’utilitzar les mateixes unitats que vida_útil."
			}
		}
	},
	TBILLEQ: {
		description: "Retorna el rendiment equivalent a un bo d'una lletra del Tresor.",
		abstract: "Retorna el rendiment equivalent a un bo d'una lletra del Tresor.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/tbilleq-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidació",
				detail: "La data de liquidació de la lletra del Tresor."
			},
			maturity: {
				name: "venciment",
				detail: "La data de venciment de la lletra del Tresor."
			},
			discount: {
				name: "descompte",
				detail: "La taxa de descompte de la lletra del Tresor."
			}
		}
	},
	TBILLPRICE: {
		description: "Retorna el preu per un valor nominal de 100 dòlars d'una lletra del Tresor.",
		abstract: "Retorna el preu per un valor nominal de 100 dòlars d'una lletra del Tresor.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/tbillprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidació",
				detail: "La data de liquidació de la lletra del Tresor."
			},
			maturity: {
				name: "venciment",
				detail: "La data de venciment de la lletra del Tresor."
			},
			discount: {
				name: "descompte",
				detail: "La taxa de descompte de la lletra del Tresor."
			}
		}
	},
	TBILLYIELD: {
		description: "Retorna el rendiment d'una lletra del Tresor.",
		abstract: "Retorna el rendiment d'una lletra del Tresor.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/tbillyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidació",
				detail: "La data de liquidació de la lletra del Tresor."
			},
			maturity: {
				name: "venciment",
				detail: "La data de venciment de la lletra del Tresor."
			},
			pr: {
				name: "preu",
				detail: "El preu de la lletra del Tresor per cada 100 $ de valor nominal."
			}
		}
	},
	VDB: {
		description: "Retorna l'amortització d'un actiu per a un període especificat o parcial mitjançant un mètode de saldo decreixent.",
		abstract: "Retorna l'amortització d'un actiu per a un període especificat o parcial mitjançant un mètode de saldo decreixent.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/vdb-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "El cost inicial de l'actiu."
			},
			salvage: {
				name: "valor_residual",
				detail: "El valor al final de l'amortització, també anomenat valor residual de l'actiu. Pot ser 0."
			},
			life: {
				name: "vida_útil",
				detail: "El nombre de períodes durant els quals s'amortitza l'actiu, també anomenat vida útil de l'actiu."
			},
			startPeriod: {
				name: "període_inicial",
				detail: "El període inicial del qual es vol calcular l'amortització; ha d'utilitzar les mateixes unitats que vida_útil."
			},
			endPeriod: {
				name: "període_final",
				detail: "El període final del qual es vol calcular l'amortització; ha d'utilitzar les mateixes unitats que vida_útil."
			},
			factor: {
				name: "factor",
				detail: "La taxa a la qual disminueix el saldo. Si s’omet, se suposa que és 2, és a dir, el mètode de saldo decreixent doble."
			},
			noSwitch: {
				name: "sense_canvi",
				detail: "Un valor lògic que indica si s’ha de canviar a l’amortització lineal quan sigui superior al càlcul de saldo decreixent."
			}
		}
	},
	XIRR: {
		description: "Retorna la taxa interna de rendiment d'un calendari de fluxos d'efectiu que no és necessàriament periòdic.",
		abstract: "Retorna la taxa interna de rendiment d'un calendari de fluxos d'efectiu que no és necessàriament periòdic.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/xirr-function"
		}],
		functionParameter: {
			values: {
				name: "valors",
				detail: "Una sèrie de fluxos d’efectiu que correspon a un calendari de pagaments en dates. El primer pagament és opcional i correspon a un cost o pagament a l’inici de la inversió; si és un cost o pagament, ha de ser negatiu. Els pagaments posteriors es descompten sobre la base d’un any de 365 dies. La sèrie ha de contenir almenys un valor positiu i un de negatiu."
			},
			dates: {
				name: "dates",
				detail: "Un calendari de dates de pagament que correspon als fluxos d’efectiu. Les dates poden aparèixer en qualsevol ordre."
			},
			guess: {
				name: "estimació",
				detail: "Un nombre que estimeu proper al resultat d’XIRR."
			}
		}
	},
	XNPV: {
		description: "Retorna el valor actual net d'un calendari de fluxos d'efectiu que no és necessàriament periòdic.",
		abstract: "Retorna el valor actual net d'un calendari de fluxos d'efectiu que no és necessàriament periòdic.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/xnpv-function"
		}],
		functionParameter: {
			rate: {
				name: "taxa",
				detail: "La taxa de descompte que s’aplica als fluxos d’efectiu."
			},
			values: {
				name: "valors",
				detail: "Una sèrie de fluxos d’efectiu que correspon a un calendari de pagaments en dates. El primer pagament és opcional i correspon a un cost o pagament a l’inici de la inversió; si és un cost o pagament, ha de ser negatiu. Els pagaments posteriors es descompten sobre la base d’un any de 365 dies. La sèrie ha de contenir almenys un valor positiu i un de negatiu."
			},
			dates: {
				name: "dates",
				detail: "Un calendari de dates de pagament que correspon als fluxos d’efectiu. Les dates poden aparèixer en qualsevol ordre."
			}
		}
	},
	YIELD: {
		description: "Retorna el rendiment d'un valor que paga interessos periòdics.",
		abstract: "Retorna el rendiment d'un valor que paga interessos periòdics.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/yield-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidació",
				detail: "La data de liquidació del valor. És la data posterior a l'emissió en què el valor es negocia amb el comprador."
			},
			maturity: {
				name: "venciment",
				detail: "La data de venciment del valor. És la data en què el valor expira."
			},
			rate: {
				name: "taxa",
				detail: "El tipus d'interès del valor."
			},
			pr: {
				name: "preu",
				detail: "El preu del valor per cada 100 $ de valor nominal."
			},
			redemption: {
				name: "reemborsament",
				detail: "El valor de reemborsament del valor per cada 100 $ de valor nominal."
			},
			frequency: {
				name: "freqüència",
				detail: "El nombre de pagaments de cupó per any. Per a pagaments anuals, freqüència = 1; semestrals, freqüència = 2; trimestrals, freqüència = 4."
			},
			basis: {
				name: "base",
				detail: "El tipus de base de recompte de dies que cal utilitzar."
			}
		}
	},
	YIELDDISC: {
		description: "Retorna el rendiment anual d'un valor descomptat; per exemple, una lletra del Tresor.",
		abstract: "Retorna el rendiment anual d'un valor descomptat; per exemple, una lletra del Tresor.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/yielddisc-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidació",
				detail: "La data de liquidació del valor. És la data posterior a l'emissió en què el valor es negocia amb el comprador."
			},
			maturity: {
				name: "venciment",
				detail: "La data de venciment del valor. És la data en què el valor expira."
			},
			pr: {
				name: "preu",
				detail: "El preu del valor per cada 100 $ de valor nominal."
			},
			redemption: {
				name: "reemborsament",
				detail: "El valor de reemborsament del valor per cada 100 $ de valor nominal."
			},
			basis: {
				name: "base",
				detail: "El tipus de base de recompte de dies que cal utilitzar."
			}
		}
	},
	YIELDMAT: {
		description: "Retorna el rendiment anual d'un valor que paga interessos al venciment.",
		abstract: "Retorna el rendiment anual d'un valor que paga interessos al venciment.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/ca-es/excel/functions/yieldmat-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidació",
				detail: "La data de liquidació del valor. És la data posterior a l'emissió en què el valor es negocia amb el comprador."
			},
			maturity: {
				name: "venciment",
				detail: "La data de venciment del valor. És la data en què el valor expira."
			},
			issue: {
				name: "emissió",
				detail: "La data d'emissió del valor, expressada com a número de sèrie de data."
			},
			rate: {
				name: "taxa",
				detail: "El tipus d'interès del valor a la data d'emissió."
			},
			pr: {
				name: "preu",
				detail: "El preu del valor per cada 100 $ de valor nominal."
			},
			basis: {
				name: "base",
				detail: "El tipus de base de recompte de dies que cal utilitzar."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/information/ca-ES.ts
const locale$8 = {
	CELL: {
		description: "Retorna informació sobre el format, la ubicació o el contingut d'una cel·la",
		abstract: "Retorna informació sobre el format, la ubicació o el contingut d'una cel·la",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/cell-function"
		}],
		functionParameter: {
			infoType: {
				name: "tipus_info",
				detail: "Un valor de text que especifica quin tipus d'informació de cel·la voleu que es retorni."
			},
			reference: {
				name: "referència",
				detail: "La cel·la de la qual voleu obtenir informació."
			}
		}
	},
	ERROR_TYPE: {
		description: "Retorna un número que correspon a un tipus d’error",
		abstract: "Retorna un número que correspon a un tipus d’error",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/error-type-function"
		}],
		functionParameter: { errorVal: {
			name: "valor_error",
			detail: "El valor d'error del qual voleu trobar el número d'identificació."
		} }
	},
	INFO: {
		description: "Retorna informació sobre l'entorn operatiu actual",
		abstract: "Retorna informació sobre l'entorn operatiu actual",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/info-function"
		}],
		functionParameter: { typeText: {
			name: "Tipus de text",
			detail: "Text que especifica el tipus d’informació que s’ha de retornar."
		} }
	},
	ISBETWEEN: {
		description: "Comprova si un nombre proporcionat es troba entre altres dos nombres, de forma inclusiva o exclusiva.",
		abstract: "Comprova si un nombre proporcionat es troba entre altres dos nombres, de forma inclusiva o exclusiva.",
		links: [{
			title: "Instrucció",
			url: "https://support.google.com/docs/answer/10538337?hl=ca"
		}],
		functionParameter: {
			valueToCompare: {
				name: "valor_a_comparar",
				detail: "El valor a comprovar si està entre `valor_inferior` i `valor_superior`."
			},
			lowerValue: {
				name: "valor_inferior",
				detail: "El límit inferior de l'interval de valors en què pot caure `valor_a_comparar`."
			},
			upperValue: {
				name: "valor_superior",
				detail: "El límit superior de l'interval de valors en què pot caure `valor_a_comparar`."
			},
			lowerValueIsInclusive: {
				name: "valor_inferior_es_inclusiu",
				detail: "Indica si l'interval de valors inclou el `valor_inferior`. Per defecte és CERT."
			},
			upperValueIsInclusive: {
				name: "valor_superior_es_inclusiu",
				detail: "Indica si l'interval de valors inclou el `valor_superior`. Per defecte és CERT."
			}
		}
	},
	ISBLANK: {
		description: "Retorna CERT si el valor és buit",
		abstract: "Retorna CERT si el valor és buit",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "El valor que voleu comprovar. L'argument de valor pot ser un valor en blanc (cel·la buida), un error, un valor lògic, text, un número o un valor de referència, o un nom que faci referència a qualsevol d'aquests."
		} }
	},
	ISDATE: {
		description: "Retorna si un valor és una data.",
		abstract: "Retorna si un valor és una data.",
		links: [{
			title: "Instrucció",
			url: "https://support.google.com/docs/answer/9061381?hl=ca"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "El valor que es verificarà com a data."
		} }
	},
	ISEMAIL: {
		description: "Comprova si un valor és una adreça de correu electrònic vàlida",
		abstract: "Comprova si un valor és una adreça de correu electrònic vàlida",
		links: [{
			title: "Instrucció",
			url: "https://support.google.com/docs/answer/3256503?hl=ca"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "El valor que es verificarà com a adreça de correu electrònic."
		} }
	},
	ISERR: {
		description: "Retorna CERT si el valor és qualsevol valor d'error excepte #N/A",
		abstract: "Retorna CERT si el valor és qualsevol valor d'error excepte #N/A",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "El valor que voleu comprovar. L'argument de valor pot ser un valor en blanc (cel·la buida), un error, un valor lògic, text, un número o un valor de referència, o un nom que faci referència a qualsevol d'aquests."
		} }
	},
	ISERROR: {
		description: "Retorna CERT si el valor és qualsevol valor d'error",
		abstract: "Retorna CERT si el valor és qualsevol valor d'error",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "El valor que voleu comprovar. L'argument de valor pot ser un valor en blanc (cel·la buida), un error, un valor lògic, text, un número o un valor de referència, o un nom que faci referència a qualsevol d'aquests."
		} }
	},
	ISEVEN: {
		description: "Retorna CERT si el número és parell",
		abstract: "Retorna CERT si el número és parell",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/iseven-function"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "El valor que cal provar. Si el nombre no és un enter, es trunca."
		} }
	},
	ISFORMULA: {
		description: "Retorna CERT si hi ha una referència a una cel·la que conté una fórmula",
		abstract: "Retorna CERT si hi ha una referència a una cel·la que conté una fórmula",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/isformula-function"
		}],
		functionParameter: { reference: {
			name: "referència",
			detail: "La referència és una referència a la cel·la que voleu provar."
		} }
	},
	ISLOGICAL: {
		description: "Retorna CERT si el valor és un valor lògic",
		abstract: "Retorna CERT si el valor és un valor lògic",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "El valor que voleu comprovar. L'argument de valor pot ser un valor en blanc (cel·la buida), un error, un valor lògic, text, un número o un valor de referència, o un nom que faci referència a qualsevol d'aquests."
		} }
	},
	ISNA: {
		description: "Retorna CERT si el valor és el valor d'error #N/A",
		abstract: "Retorna CERT si el valor és el valor d'error #N/A",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "El valor que voleu comprovar. L'argument de valor pot ser un valor en blanc (cel·la buida), un error, un valor lògic, text, un número o un valor de referència, o un nom que faci referència a qualsevol d'aquests."
		} }
	},
	ISNONTEXT: {
		description: "Retorna CERT si el valor no és text",
		abstract: "Retorna CERT si el valor no és text",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "El valor que voleu comprovar. L'argument de valor pot ser un valor en blanc (cel·la buida), un error, un valor lògic, text, un número o un valor de referència, o un nom que faci referència a qualsevol d'aquests."
		} }
	},
	ISNUMBER: {
		description: "Retorna CERT si el valor és un número",
		abstract: "Retorna CERT si el valor és un número",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "El valor que voleu comprovar. L'argument de valor pot ser un valor en blanc (cel·la buida), un error, un valor lògic, text, un número o un valor de referència, o un nom que faci referència a qualsevol d'aquests."
		} }
	},
	ISODD: {
		description: "Retorna CERT si el número és senar",
		abstract: "Retorna CERT si el número és senar",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/isodd-function"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "El valor que cal provar. Si el nombre no és un enter, es trunca."
		} }
	},
	ISOMITTED: {
		description: "Comprova si falta el valor en una&nbsp;LAMBDA&nbsp;i retorna CERT o FALS",
		abstract: "Comprova si falta el valor en una&nbsp;LAMBDA&nbsp;i retorna CERT o FALS",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/isomitted-function"
		}],
		functionParameter: { argument: {
			name: "Argument",
			detail: "Valor que es comprova per determinar si s’ha omès, com ara un paràmetre LAMBDA."
		} }
	},
	ISREF: {
		description: "Retorna CERT si el valor és una referència",
		abstract: "Retorna CERT si el valor és una referència",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "El valor que voleu comprovar. L'argument de valor pot ser un valor en blanc (cel·la buida), un error, un valor lògic, text, un número o un valor de referència, o un nom que faci referència a qualsevol d'aquests."
		} }
	},
	ISTEXT: {
		description: "Retorna CERT si el valor és text",
		abstract: "Retorna CERT si el valor és text",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "El valor que voleu comprovar. L'argument de valor pot ser un valor en blanc (cel·la buida), un error, un valor lògic, text, un número o un valor de referència, o un nom que faci referència a qualsevol d'aquests."
		} }
	},
	ISURL: {
		description: "Comprova si un valor és un URL vàlid.",
		abstract: "Comprova si un valor és un URL vàlid.",
		links: [{
			title: "Instrucció",
			url: "https://support.google.com/docs/answer/3256501?hl=ca"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "ISURL(\"www.google.com\")"
		} }
	},
	N: {
		description: "Retorna un valor convertit a un número",
		abstract: "Retorna un valor convertit a un número",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/n-function"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "El valor que voleu convertir."
		} }
	},
	NA: {
		description: "Retorna el valor d'error #N/A",
		abstract: "Retorna el valor d'error #N/A",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/na-function"
		}],
		functionParameter: {}
	},
	SHEET: {
		description: "Retorna el número de full del full de referència",
		abstract: "Retorna el número de full del full de referència",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/sheet-function"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "El valor és el nom d'un full o una referència per a la qual voleu el número de full. Si s'omet el valor, FULL retorna el número del full que conté la funció."
		} }
	},
	SHEETS: {
		description: "Retorna el nombre de fulls d'un llibre",
		abstract: "Retorna el nombre de fulls d'un llibre",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/sheets-function"
		}],
		functionParameter: {}
	},
	TYPE: {
		description: "Retorna un número que indica el tipus de dades d'un valor",
		abstract: "Retorna un número que indica el tipus de dades d'un valor",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/type-function"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "Pot ser qualsevol valor, com ara un número, text, valor lògic, etc."
		} }
	}
};

//#endregion
//#region src/locale/function-list/logical/ca-ES.ts
const locale$7 = {
	AND: {
		description: "Retorna CERT si tots els seus arguments són CERT",
		abstract: "Retorna CERT si tots els seus arguments són CERT",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/and-function"
		}],
		functionParameter: {
			logical1: {
				name: "lògic1",
				detail: "La primera condició que voleu comprovar i que pot avaluar-se com a CERT o FALS."
			},
			logical2: {
				name: "lògic2",
				detail: "Condicions addicionals que voleu comprovar i que poden avaluar-se com a CERT o FALS, fins a un màxim de 255 condicions."
			}
		}
	},
	BYCOL: {
		description: "Aplica una funció LAMBDA a cada columna i retorna una matriu dels resultats",
		abstract: "Aplica una funció LAMBDA a cada columna i retorna una matriu dels resultats",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/bycol-function"
		}],
		functionParameter: {
			array: {
				name: "matriu",
				detail: "Una matriu que s'ha de separar per columnes."
			},
			lambda: {
				name: "lambda",
				detail: "Una funció LAMBDA que pren una columna com a paràmetre únic i calcula un resultat. La funció LAMBDA pren un únic paràmetre: una columna de la matriu."
			}
		}
	},
	BYROW: {
		description: "Aplica una funció LAMBDA a cada fila i retorna una matriu dels resultats",
		abstract: "Aplica una funció LAMBDA a cada fila i retorna una matriu dels resultats",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/byrow-function"
		}],
		functionParameter: {
			array: {
				name: "matriu",
				detail: "Una matriu que s'ha de separar per files."
			},
			lambda: {
				name: "lambda",
				detail: "Una funció LAMBDA que pren una fila com a paràmetre únic i calcula un resultat. La funció LAMBDA pren un únic paràmetre: una fila de la matriu."
			}
		}
	},
	FALSE: {
		description: "Retorna el valor lògic FALS.",
		abstract: "Retorna el valor lògic FALS.",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/false-function"
		}],
		functionParameter: {}
	},
	IF: {
		description: "Especifica una prova lògica que cal realitzar",
		abstract: "Especifica una prova lògica que cal realitzar",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/if-function"
		}],
		functionParameter: {
			logicalTest: {
				name: "prova_lògica",
				detail: "La condició que voleu comprovar."
			},
			valueIfTrue: {
				name: "valor_si_cert",
				detail: "El valor que voleu que es retorni si el resultat de la prova_lògica és CERT."
			},
			valueIfFalse: {
				name: "valor_si_fals",
				detail: "El valor que voleu que es retorni si el resultat de la prova_lògica és FALS."
			}
		}
	},
	IFERROR: {
		description: "Retorna un valor que especifiqueu si una fórmula avalua un error; en cas contrari, retorna el resultat de la fórmula",
		abstract: "Retorna un valor que especifiqueu si una fórmula avalua un error; en cas contrari, retorna el resultat de la fórmula",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/iferror-function"
		}],
		functionParameter: {
			value: {
				name: "valor",
				detail: "L'argument que es comprova si hi ha un error."
			},
			valueIfError: {
				name: "valor_si_error",
				detail: "El valor a retornar si la fórmula avalua un error. S'avaluen els tipus d'error següents: #N/A, #VALUE!, #REF!, #DIV/0!, #NUM!, #NAME?, o #NULL!."
			}
		}
	},
	IFNA: {
		description: "Retorna el valor que especifiqueu si l'expressió es resol a #N/A, altrament retorna el resultat de l'expressió",
		abstract: "Retorna el valor que especifiqueu si l'expressió es resol a #N/A, altrament retorna el resultat de l'expressió",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/ifna-function"
		}],
		functionParameter: {
			value: {
				name: "valor",
				detail: "L'argument que es comprova per al valor d'error #N/A."
			},
			valueIfNa: {
				name: "valor_si_na",
				detail: "El valor a retornar si la fórmula s'avalua amb el valor d'error #N/A."
			}
		}
	},
	IFS: {
		description: "Comprova si es compleixen una o més condicions i retorna un valor que correspon a la primera condició CERT.",
		abstract: "Comprova si es compleixen una o més condicions i retorna un valor que correspon a la primera condició CERT.",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/ifs-function"
		}],
		functionParameter: {
			logicalTest1: {
				name: "prova_lògica1",
				detail: "Condició que s'avalua com a CERT o FALS."
			},
			valueIfTrue1: {
				name: "valor_si_cert1",
				detail: "Resultat a retornar si prova_lògica1 s'avalua com a CERT. Pot ser buit."
			},
			logicalTest2: {
				name: "prova_lògica2",
				detail: "Condició que s'avalua com a CERT o FALS."
			},
			valueIfTrue2: {
				name: "valor_si_cert2",
				detail: "Resultat a retornar si prova_lògicaN s'avalua com a CERT. Cada valor_si_certN correspon a una condició prova_lògicaN. Pot ser buit."
			}
		}
	},
	LAMBDA: {
		description: "Utilitzeu una funció LAMBDA per crear funcions personalitzades i reutilitzables i crideu-les per un nom amigable. La nova funció està disponible a tot el llibre i es crida com les funcions natives d'Excel.",
		abstract: "Creeu funcions personalitzades i reutilitzables i crideu-les per un nom amigable",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/lambda-function"
		}],
		functionParameter: {
			parameter: {
				name: "paràmetre",
				detail: "Un valor que voleu passar a la funció, com ara una referència de cel·la, una cadena o un número. Podeu introduir fins a 253 paràmetres. Aquest argument és opcional."
			},
			calculation: {
				name: "càlcul",
				detail: "La fórmula que voleu executar i retornar com a resultat de la funció. Ha de ser l'últim argument i ha de retornar un resultat. Aquest argument és obligatori."
			}
		}
	},
	LET: {
		description: "Assigna noms als resultats dels càlculs",
		abstract: "Assigna noms als resultats dels càlculs",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/let-function"
		}],
		functionParameter: {
			name1: {
				name: "nom1",
				detail: "El primer nom a assignar. Ha de començar per una lletra. No pot ser el resultat d'una fórmula ni entrar en conflicte amb la sintaxi de rang."
			},
			nameValue1: {
				name: "valor_nom1",
				detail: "El valor que s'assigna a nom1."
			},
			calculationOrName2: {
				name: "càlcul_o_nom2",
				detail: "Un dels següents:\n1.Un càlcul que utilitza tots els noms dins de la funció LET. Aquest ha de ser l'últim argument de la funció LET.\n2.Un segon nom per assignar a un segon valor_nom. Si s'especifica un nom, valor_nom2 i càlcul_o_nom3 esdevenen obligatoris."
			},
			nameValue2: {
				name: "valor_nom2",
				detail: "El valor que s'assigna a càlcul_o_nom2."
			},
			calculationOrName3: {
				name: "càlcul_o_nom3",
				detail: "Un dels següents:\n1.Un càlcul que utilitza tots els noms dins de la funció LET. L'últim argument de la funció LET ha de ser un càlcul.\n2.Un tercer nom per assignar a un tercer valor_nom. Si s'especifica un nom, valor_nom3 i càlcul_o_nom4 esdevenen obligatoris."
			}
		}
	},
	MAKEARRAY: {
		description: "Retorna una matriu calculada d'una mida de fila i columna especificada, aplicant una LAMBDA",
		abstract: "Retorna una matriu calculada d'una mida de fila i columna especificada, aplicant una LAMBDA",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/makearray-function"
		}],
		functionParameter: {
			number1: {
				name: "files",
				detail: "El nombre de files de la matriu. Ha de ser superior a zero."
			},
			number2: {
				name: "cols",
				detail: "El nombre de columnes de la matriu. Ha de ser superior a zero."
			},
			value3: {
				name: "lambda",
				detail: "Una LAMBDA que es crida per crear la matriu. La LAMBDA pren dos paràmetres: fila (l'índex de fila de la matriu), col (l'índex de columna de la matriu)."
			}
		}
	},
	MAP: {
		description: "Retorna una matriu formada mapejant cada valor de la(les) matriu(s) a un nou valor aplicant una LAMBDA per crear un nou valor.",
		abstract: "Retorna una matriu formada mapejant cada valor de la(les) matriu(s) a un nou valor aplicant una LAMBDA per crear un nou valor.",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/map-function"
		}],
		functionParameter: {
			array1: {
				name: "matriu1",
				detail: "Una matriu1 per ser mapejada."
			},
			array2: {
				name: "matriu2",
				detail: "Una matriu2 per ser mapejada."
			},
			lambda: {
				name: "lambda",
				detail: "Una LAMBDA que ha de ser l'últim argument i que ha de tenir un paràmetre per a cada matriu passada."
			}
		}
	},
	NOT: {
		description: "Inverteix la lògica del seu argument.",
		abstract: "Inverteix la lògica del seu argument.",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/not-function"
		}],
		functionParameter: { logical: {
			name: "lògic",
			detail: "La condició per a la qual voleu invertir la lògica, que pot avaluar-se com a CERT o FALS."
		} }
	},
	OR: {
		description: "Retorna CERT si algun dels seus arguments s'avalua com a CERT, i retorna FALS si tots els seus arguments s'avaluen com a FALS.",
		abstract: "Retorna CERT si algun argument és CERT",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/or-function"
		}],
		functionParameter: {
			logical1: {
				name: "lògic1",
				detail: "La primera condició que voleu comprovar i que pot avaluar-se com a CERT o FALS."
			},
			logical2: {
				name: "lògic2",
				detail: "Condicions addicionals que voleu comprovar i que poden avaluar-se com a CERT o FALS, fins a un màxim de 255 condicions."
			}
		}
	},
	REDUCE: {
		description: "Redueix una matriu a un valor acumulat aplicant una LAMBDA a cada valor i retornant el valor total a l'acumulador.",
		abstract: "Redueix una matriu a un valor acumulat aplicant una LAMBDA a cada valor i retornant el valor total a l'acumulador.",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/reduce-function"
		}],
		functionParameter: {
			initialValue: {
				name: "valor_inicial",
				detail: "Estableix el valor inicial de l'acumulador."
			},
			array: {
				name: "matriu",
				detail: "Una matriu a reduir."
			},
			lambda: {
				name: "lambda",
				detail: "Una LAMBDA que es crida per reduir la matriu. La LAMBDA pren tres paràmetres: 1.El valor totalitzat i retornat com a resultat final. 2.El valor actual de la matriu. 3.El càlcul aplicat a cada element de la matriu."
			}
		}
	},
	SCAN: {
		description: "Escaneja una matriu aplicant una LAMBDA a cada valor i retorna una matriu que té cada valor intermedi.",
		abstract: "Escaneja una matriu aplicant una LAMBDA a cada valor i retorna una matriu que té cada valor intermedi.",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/scan-function"
		}],
		functionParameter: {
			initialValue: {
				name: "valor_inicial",
				detail: "Estableix el valor inicial de l'acumulador."
			},
			array: {
				name: "matriu",
				detail: "Una matriu a escanejar."
			},
			lambda: {
				name: "lambda",
				detail: "Una LAMBDA que es crida per escanejar la matriu. La LAMBDA pren tres paràmetres: 1.El valor totalitzat i retornat com a resultat final. 2.El valor actual de la matriu. 3.El càlcul aplicat a cada element de la matriu."
			}
		}
	},
	SWITCH: {
		description: "Avalua una expressió enfront d'una llista de valors i retorna el resultat corresponent al primer valor coincident. Si no hi ha cap coincidència, es pot retornar un valor per defecte opcional.",
		abstract: "Avalua una expressió enfront d'una llista de valors i retorna el resultat corresponent al primer valor coincident. Si no hi ha cap coincidència, es pot retornar un valor per defecte opcional.",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/switch-function"
		}],
		functionParameter: {
			expression: {
				name: "expressió",
				detail: "L'expressió és el valor (com ara un número, una data o text) que es compararà amb valor1...valor126."
			},
			value1: {
				name: "valor1",
				detail: "ValorN és un valor que es compararà amb l'expressió."
			},
			result1: {
				name: "resultat1",
				detail: "ResultatN és el valor a retornar quan l'argument valorN corresponent coincideixi amb l'expressió. S'ha de proporcionar ResultatN per a cada argument valorN corresponent."
			},
			defaultOrValue2: {
				name: "per_defecte_o_valor2",
				detail: "Per defecte és el valor a retornar en cas que no es trobin coincidències a les expressions valorN. L'argument Per defecte s'identifica per no tenir una expressió resultatN corresponent (vegeu exemples). Per defecte ha de ser l'últim argument de la funció."
			},
			result2: {
				name: "resultat2",
				detail: "ResultatN és el valor a retornar quan l'argument valorN corresponent coincideixi amb l'expressió. S'ha de proporcionar ResultatN per a cada argument valorN corresponent."
			}
		}
	},
	TRUE: {
		description: "Retorna el valor lògic CERT.",
		abstract: "Retorna el valor lògic CERT.",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/true-function"
		}],
		functionParameter: {}
	},
	XOR: {
		description: "Retorna CERT si un nombre senar dels seus arguments s'avalua com a CERT, i FALS si un nombre parell dels seus arguments s'avalua com a CERT.",
		abstract: "Retorna CERT si un nombre senar d'arguments són CERT",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/xor-function"
		}],
		functionParameter: {
			logical1: {
				name: "lògic1",
				detail: "La primera condició que voleu comprovar i que pot avaluar-se com a CERT o FALS."
			},
			logical2: {
				name: "lògic2",
				detail: "Condicions addicionals que voleu comprovar i que poden avaluar-se com a CERT o FALS, fins a un màxim de 255 condicions."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/lookup/ca-ES.ts
const locale$6 = {
	ADDRESS: {
		description: "Obté l'adreça d'una cel·la en un full de càlcul, donats uns números de fila i columna especificats. Per exemple, ADREÇA(2,3) retorna $C$2. Com a un altre exemple, ADREÇA(77,300) retorna $KN$77. Podeu utilitzar altres funcions, com les funcions FILA i COLUMNA, per proporcionar els arguments de número de fila i columna per a la funció ADREÇA.",
		abstract: "Retorna una referència com a text a una única cel·la en un full de càlcul",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/address-function"
		}],
		functionParameter: {
			row_num: {
				name: "número_de_fila",
				detail: "Un valor numèric que especifica el número de fila a utilitzar en la referència de cel·la."
			},
			column_num: {
				name: "número_de_columna",
				detail: "Un valor numèric que especifica el número de columna a utilitzar en la referència de cel·la."
			},
			abs_num: {
				name: "tipus_de_referència",
				detail: "Un valor numèric que especifica el tipus de referència a retornar."
			},
			a1: {
				name: "estil_de_referència",
				detail: "Un valor lògic que especifica l'estil de referència A1 o F1C1. En l'estil A1, les columnes s'etiqueten alfabèticament i les files numèricament. En l'estil de referència F1C1, tant les columnes com les files s'etiqueten numèricament. Si l'argument A1 és CERT o s'omet, la funció ADREÇA retorna una referència d'estil A1; si és FALS, la funció ADREÇA retorna una referència d'estil F1C1."
			},
			sheet_text: {
				name: "nom_del_full",
				detail: "Un valor de text que especifica el nom del full de càlcul que s'ha d'utilitzar com a referència externa. Per exemple, la fórmula =ADREÇA(1,1,,,\"Full2\") retorna Full2!$A$1. Si s'omet l'argument nom_del_full, no s'utilitza cap nom de full i l'adreça retornada per la funció es refereix a una cel·la del full actual."
			}
		}
	},
	AREAS: {
		description: "Retorna el nombre d'àrees en una referència",
		abstract: "Retorna el nombre d'àrees en una referència",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/areas-function"
		}],
		functionParameter: { reference: {
			name: "referència",
			detail: "Una referència a una cel·la o un rang de cel·les i pot referir-se a múltiples àrees."
		} }
	},
	CHOOSE: {
		description: "Tria un valor d'una llista de valors.",
		abstract: "Tria un valor d'una llista de valors",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/choose-function"
		}],
		functionParameter: {
			indexNum: {
				name: "núm_índex",
				detail: "Especifica quin argument de valor se selecciona. Núm_índex ha de ser un número entre 1 i 254, o una fórmula o referència a una cel·la que contingui un número entre 1 i 254.\nSi núm_índex és 1, Tria retorna valor1; si és 2, Tria retorna valor2; i així successivament.\nSi núm_índex és menor que 1 o més gran que el número de l'últim valor de la llista, Tria retorna el valor d'error #VALOR!.\nSi núm_índex és una fracció, es trunca a l'enter més baix abans d'utilitzar-lo."
			},
			value1: {
				name: "valor1",
				detail: "Tria selecciona un valor o una acció a realitzar basant-se en núm_índex. Els arguments poden ser números, referències de cel·la, noms definits, fórmules, funcions o text."
			},
			value2: {
				name: "valor2",
				detail: "D'1 a 254 arguments de valor."
			}
		}
	},
	CHOOSECOLS: {
		description: "Retorna les columnes especificades d'una matriu",
		abstract: "Retorna les columnes especificades d'una matriu",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/choosecols-function"
		}],
		functionParameter: {
			array: {
				name: "matriu",
				detail: "La matriu que conté les columnes que es retornaran a la nova matriu."
			},
			colNum1: {
				name: "col_núm1",
				detail: "La primera columna que es retornarà."
			},
			colNum2: {
				name: "col_núm2",
				detail: "Columnes addicionals que es retornaran."
			}
		}
	},
	CHOOSEROWS: {
		description: "Retorna les files especificades d'una matriu",
		abstract: "Retorna les files especificades d'una matriu",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/chooserows-function"
		}],
		functionParameter: {
			array: {
				name: "matriu",
				detail: "La matriu que conté les files que es retornaran a la nova matriu."
			},
			rowNum1: {
				name: "fila_núm1",
				detail: "El número de la primera fila que es retornarà."
			},
			rowNum2: {
				name: "fila_núm2",
				detail: "Números de fila addicionals que es retornaran."
			}
		}
	},
	COLUMN: {
		description: "Retorna el número de columna de la referència de cel·la donada.",
		abstract: "Retorna el número de columna d'una referència",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/column-function"
		}],
		functionParameter: { reference: {
			name: "referència",
			detail: "La cel·la o el rang de cel·les del qual voleu retornar el número de columna."
		} }
	},
	COLUMNS: {
		description: "Retorna el nombre de columnes en una matriu o referència.",
		abstract: "Retorna el nombre de columnes en una referència",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/columns-function"
		}],
		functionParameter: { array: {
			name: "matriu",
			detail: "Una matriu o fórmula de matriu, o una referència a un rang de cel·les del qual voleu el nombre de columnes."
		} }
	},
	DROP: {
		description: "Exclou un nombre especificat de files o columnes des de l'inici o el final d'una matriu",
		abstract: "Exclou un nombre especificat de files o columnes des de l'inici o el final d'una matriu",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/drop-function"
		}],
		functionParameter: {
			array: {
				name: "matriu",
				detail: "La matriu de la qual es deixaran anar files o columnes."
			},
			rows: {
				name: "files",
				detail: "El nombre de files a deixar anar. Un valor negatiu deixa anar des del final de la matriu."
			},
			columns: {
				name: "columnes",
				detail: "El nombre de columnes a excloure. Un valor negatiu deixa anar des del final de la matriu."
			}
		}
	},
	EXPAND: {
		description: "Expandeix o omple una matriu a les dimensions de fila i columna especificades",
		abstract: "Expandeix o omple una matriu a les dimensions de fila i columna especificades",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/expand-function"
		}],
		functionParameter: {
			array: {
				name: "matriu",
				detail: "La matriu a expandir."
			},
			rows: {
				name: "files",
				detail: "El nombre de files a la matriu expandida. Si falta, les files no s'expandiran."
			},
			columns: {
				name: "columnes",
				detail: "El nombre de columnes a la matriu expandida. Si falta, les columnes no s'expandiran."
			},
			padWith: {
				name: "omplir_amb",
				detail: "El valor amb el qual omplir. El valor per defecte és #N/A."
			}
		}
	},
	FILTER: {
		description: "Filtra un rang de dades basant-se en els criteris que definiu",
		abstract: "Filtra un rang de dades basant-se en els criteris que definiu",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/filter-function"
		}],
		functionParameter: {
			array: {
				name: "matriu",
				detail: "El rang o matriu a filtrar."
			},
			include: {
				name: "incloure",
				detail: "Una matriu de valors booleans on CERT indica que s'ha de retenir una fila o columna."
			},
			ifEmpty: {
				name: "si_buit",
				detail: "Si no es reserven elements, retorna."
			}
		}
	},
	FORMULATEXT: {
		description: "Retorna la fórmula a la referència donada com a text",
		abstract: "Retorna la fórmula a la referència donada com a text",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/formulatext-function"
		}],
		functionParameter: { reference: {
			name: "referència",
			detail: "Una referència a una cel·la o un rang de cel·les."
		} }
	},
	GETPIVOTDATA: {
		description: "Retorna dades emmagatzemades en un informe de taula dinàmica",
		abstract: "Retorna dades emmagatzemades en un informe de taula dinàmica",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/getpivotdata-function"
		}],
		functionParameter: {
			dataField: {
				name: "Camp de dades",
				detail: "Nom del camp de dades que conté les dades que voleu recuperar."
			},
			pivotTable: {
				name: "Taula dinàmica",
				detail: "Referència a una cel·la, un interval o un interval amb nom d’una taula dinàmica."
			},
			field1: {
				name: "Camp 1",
				detail: "Opcional. Nom del primer camp que descriu les dades."
			},
			item1: {
				name: "Element 1",
				detail: "Opcional. Nom del primer element del camp."
			}
		}
	},
	HLOOKUP: {
		description: "Busca a la fila superior d'una matriu i retorna el valor de la cel·la indicada",
		abstract: "Busca a la fila superior d'una matriu i retorna el valor de la cel·la indicada",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/hlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "valor_buscat",
				detail: "El valor a trobar a la primera fila de la taula. Valor_buscat pot ser un valor, una referència o una cadena de text."
			},
			tableArray: {
				name: "taula_matriu",
				detail: "Una taula d'informació en la qual es busquen dades. Utilitzeu una referència a un rang o un nom de rang."
			},
			rowIndexNum: {
				name: "índex_fila_núm",
				detail: "El número de fila a taula_matriu des del qual es retornarà el valor coincident. Un índex_fila_núm d'1 retorna el valor de la primera fila a taula_matriu, un índex_fila_núm de 2 retorna el valor de la segona fila a taula_matriu, i així successivament."
			},
			rangeLookup: {
				name: "cerca_rang",
				detail: "Un valor lògic que especifica si voleu que HLOOKUP trobi una coincidència exacta o una coincidència aproximada."
			}
		}
	},
	HSTACK: {
		description: "Afegeix matrius horitzontalment i en seqüència per retornar una matriu més gran",
		abstract: "Afegeix matrius horitzontalment i en seqüència per retornar una matriu més gran",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/hstack-function"
		}],
		functionParameter: {
			array1: {
				name: "matriu",
				detail: "Les matrius a afegir."
			},
			array2: {
				name: "matriu",
				detail: "Les matrius a afegir."
			}
		}
	},
	HYPERLINK: {
		description: "Crea un enllaç dins d'una cel·la.",
		abstract: "Crea un enllaç dins d'una cel·la.",
		links: [{
			title: "Instrucció",
			url: "https://support.google.com/docs/answer/3093313?hl=ca"
		}],
		functionParameter: {
			url: {
				name: "url",
				detail: "URL complet de la ubicació de l'enllaç entre cometes o referència a una cel·la que conté l'URL. Només es permeten determinats tipus d'enllaç. Es permeten http:// , https:// , mailto: , aim: , ftp:// , gopher:// , telnet:// i news:// ; la resta estan explícitament prohibits. Si s'especifica un altre protocol, es mostrarà link_label a la cel·la, però no estarà enllaçat. Si no s'especifica cap protocol, s'assumeix que és http:// i es col·loca davant d' url ."
			},
			linkLabel: {
				name: "etiqueta_enllaç",
				detail: "( OPCIONAL: url de manera predeterminada ) : text que es mostra a la cel·la com a enllaç, entre cometes, o bé referència a una cel·la que contingui aquesta etiqueta. Si etiqueta_enllaç és una referència a una cel·la buida, url es mostrarà com a enllaç si és vàlid o com a text sense format en cas contrari. Si link_label és el literal de cadena buida (\"\"), la cel·la es mostrarà buida, però igualment podreu accedir a l'enllaç fent clic a la cel·la o movent-vos-hi."
			}
		}
	},
	IMAGE: {
		description: "Retorna una imatge d'una font donada",
		abstract: "Retorna una imatge d'una font donada",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/image-function"
		}],
		functionParameter: {
			source: {
				name: "origen",
				detail: "La ruta de acceso URL, mediante un protocolo \"https\", del archivo de imagen."
			},
			altText: {
				name: "texto_alternativo",
				detail: "Texto alternativo que describe la imagen para accesibilidad."
			},
			sizing: {
				name: "dimensiones",
				detail: "Especifica las dimensiones de la imagen."
			},
			height: {
				name: "alto",
				detail: "La altura personalizada de la imagen en píxeles."
			},
			width: {
				name: "ancho",
				detail: "La anchura personalizada de la imagen en píxeles."
			}
		}
	},
	INDEX: {
		description: "Retorna la referència de la cel·la a la intersecció d'una fila i columna particulars. Si la referència està formada per seleccions no adjacents, podeu triar la selecció on buscar.",
		abstract: "Utilitza un índex per triar un valor d'una referència o matriu",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/index-function"
		}],
		functionParameter: {
			reference: {
				name: "referència",
				detail: "Una referència a un o més rangs de cel·les."
			},
			rowNum: {
				name: "fila_núm",
				detail: "El número de la fila a la referència des de la qual es vol retornar una referència."
			},
			columnNum: {
				name: "columna_núm",
				detail: "El número de la columna a la referència des de la qual es vol retornar una referència."
			},
			areaNum: {
				name: "àrea_núm",
				detail: "Selecciona un rang a la referència des del qual es vol retornar la intersecció de fila_núm i columna_núm."
			}
		}
	},
	INDIRECT: {
		description: "Retorna la referència especificada per una cadena de text. Les referències s'avaluen immediatament per mostrar el seu contingut.",
		abstract: "Retorna una referència indicada per un valor de text",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/indirect-function"
		}],
		functionParameter: {
			refText: {
				name: "ref_text",
				detail: "Una referència a una cel·la que conté una referència d'estil A1, una referència d'estil F1C1, un nom definit com a referència, o una referència a una cel·la com a cadena de text."
			},
			a1: {
				name: "a1",
				detail: "Un valor lògic que especifica quin tipus de referència conté la cel·la ref_text."
			}
		}
	},
	LOOKUP: {
		description: "Quan necessiteu buscar en una sola fila o columna i trobar un valor des de la mateixa posició en una segona fila o columna",
		abstract: "Busca valors en un vector o matriu",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/lookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "valor_buscat",
				detail: "Un valor que LOOKUP cerca al primer vector. Valor_buscat pot ser un número, text, un valor lògic, o un nom o referència que es refereixi a un valor."
			},
			lookupVectorOrArray: {
				name: "vector_o_matriu_buscat",
				detail: "Un rang que conté només una fila o una columna"
			},
			resultVector: {
				name: "vector_resultat",
				detail: "Un rang que conté només una fila o columna. L'argument vector_resultat ha de tenir la mateixa mida que vector_buscat."
			}
		}
	},
	MATCH: {
		description: "La funció MATCH cerca un element especificat en un rang de cel·les i, a continuació, retorna la posició relativa d'aquest element en el rang.",
		abstract: "Busca valors en una referència o matriu",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/match-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "valor_buscat",
				detail: "El valor que voleu fer coincidir a matriu_buscada."
			},
			lookupArray: {
				name: "matriu_buscada",
				detail: "El rang de cel·les que s'està cercant."
			},
			matchType: {
				name: "tipus_coincidència",
				detail: "El número -1, 0 o 1."
			}
		}
	},
	OFFSET: {
		description: "Retorna una referència desplaçada des d'una referència donada",
		abstract: "Retorna una referència desplaçada des d'una referència donada",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/offset-function"
		}],
		functionParameter: {
			reference: {
				name: "referència",
				detail: "La referència des de la qual voleu basar el desplaçament."
			},
			rows: {
				name: "files",
				detail: "El nombre de files, amunt o avall, a les quals voleu que es refereixi la cel·la superior esquerra."
			},
			cols: {
				name: "columnes",
				detail: "El nombre de columnes, a l'esquerra o a la dreta, a les quals voleu que es refereixi la cel·la superior esquerra del resultat."
			},
			height: {
				name: "alçada",
				detail: "L'alçada, en nombre de files, que voleu que tingui la referència retornada. L'alçada ha de ser un número positiu."
			},
			width: {
				name: "amplada",
				detail: "L'amplada, en nombre de columnes, que voleu que tingui la referència retornada. L'amplada ha de ser un número positiu."
			}
		}
	},
	ROW: {
		description: "Retorna el número de fila d'una referència",
		abstract: "Retorna el número de fila d'una referència",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/row-function"
		}],
		functionParameter: { reference: {
			name: "referència",
			detail: "La cel·la o el rang de cel·les del qual voleu el número de fila."
		} }
	},
	ROWS: {
		description: "Retorna el nombre de files en una matriu o referència.",
		abstract: "Retorna el nombre de files en una referència",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/rows-function"
		}],
		functionParameter: { array: {
			name: "matriu",
			detail: "Una matriu, una fórmula de matriu o una referència a un rang de cel·les del qual voleu el nombre de files."
		} }
	},
	RTD: {
		description: "Recupera dades en temps real d'un programa que admet l'automatització COM",
		abstract: "Recupera dades en temps real d'un programa que admet l'automatització COM",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/rtd-function"
		}],
		functionParameter: {
			progId: {
				name: "Identificador de programa",
				detail: "Nom de l’identificador de programa del complement d’automatització COM instal·lat localment."
			},
			server: {
				name: "Servidor",
				detail: "Nom del servidor on s’executa el complement; useu una cadena buida per al servidor local."
			},
			topic1: {
				name: "Tema 1",
				detail: "Primer text que especifica les dades en temps real que s’han de recuperar."
			},
			topic2: {
				name: "Tema 2",
				detail: "Opcional. Textos addicionals que especifiquen les dades en temps real."
			}
		}
	},
	SORT: {
		description: "Ordena el contingut d'un rang o matriu",
		abstract: "Ordena el contingut d'un rang o matriu",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/sort-function"
		}],
		functionParameter: {
			array: {
				name: "matriu",
				detail: "El rang o matriu a ordenar."
			},
			sortIndex: {
				name: "índex_ordenació",
				detail: "Un número que indica l'ordre de classificació (per fila o per columna)."
			},
			sortOrder: {
				name: "ordre_classificació",
				detail: "Un número que representa l'ordre de classificació desitjat; 1 per a ascendent (per defecte), -1 per a descendent."
			},
			byCol: {
				name: "per_col",
				detail: "Valor lògic que indica la direcció de classificació desitjada; FALS ordena per files (per defecte), CERT ordena per columnes."
			}
		}
	},
	SORTBY: {
		description: "Ordena el contingut d'un rang o matriu basant-se en els valors d'un rang o matriu corresponent",
		abstract: "Ordena el contingut d'un rang o matriu basant-se en els valors d'un rang o matriu corresponent",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/sortby-function"
		}],
		functionParameter: {
			array: {
				name: "matriu",
				detail: "El rang o matriu a ordenar."
			},
			byArray1: {
				name: "per_matriu1",
				detail: "El rang o matriu en funció del qual ordenar."
			},
			sortOrder1: {
				name: "ordre_classificació1",
				detail: "Un número que representa l'ordre de classificació desitjat; 1 per a ascendent (per defecte), -1 per a descendent."
			},
			byArray2: {
				name: "per_matriu2",
				detail: "El rang o matriu en funció del qual ordenar."
			},
			sortOrder2: {
				name: "ordre_classificació2",
				detail: "Un número que representa l'ordre de classificació desitjat; 1 per a ascendent (per defecte), -1 per a descendent."
			}
		}
	},
	TAKE: {
		description: "Retorna un nombre especificat de files o columnes contigües des de l'inici o el final d'una matriu",
		abstract: "Retorna un nombre especificat de files o columnes contigües des de l'inici o el final d'una matriu",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/take-function"
		}],
		functionParameter: {
			array: {
				name: "matriu",
				detail: "La matriu de la qual es prendran files o columnes."
			},
			rows: {
				name: "files",
				detail: "El nombre de files a prendre. Un valor negatiu pren des del final de la matriu."
			},
			columns: {
				name: "columnes",
				detail: "El nombre de columnes a prendre. Un valor negatiu pren des del final de la matriu."
			}
		}
	},
	TOCOL: {
		description: "Retorna la matriu en una sola columna",
		abstract: "Retorna la matriu en una sola columna",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/tocol-function"
		}],
		functionParameter: {
			array: {
				name: "matriu",
				detail: "La matriu o referència a retornar com a columna."
			},
			ignore: {
				name: "ignorar",
				detail: "Si s'han d'ignorar certs tipus de valors. Per defecte, no s'ignora cap valor. Especifiqueu un dels següents:\n0 Mantenir tots els valors (per defecte)\n1 Ignorar espais en blanc\n2 Ignorar errors\n3 Ignorar espais en blanc i errors"
			},
			scanByColumn: {
				name: "escanejar_per_columna",
				detail: "Escanejar la matriu per columna. Per defecte, la matriu s'escaneja per fila. L'escaneig determina si els valors s'ordenen per fila o per columna."
			}
		}
	},
	TOROW: {
		description: "Retorna la matriu en una sola fila",
		abstract: "Retorna la matriu en una sola fila",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/torow-function"
		}],
		functionParameter: {
			array: {
				name: "matriu",
				detail: "La matriu o referència a retornar com a fila."
			},
			ignore: {
				name: "ignorar",
				detail: "Si s'han d'ignorar certs tipus de valors. Per defecte, no s'ignora cap valor. Especifiqueu un dels següents:\n0 Mantenir tots els valors (per defecte)\n1 Ignorar espais en blanc\n2 Ignorar errors\n3 Ignorar espais en blanc i errors"
			},
			scanByColumn: {
				name: "escanejar_per_columna",
				detail: "Escanejar la matriu per columna. Per defecte, la matriu s'escaneja per fila. L'escaneig determina si els valors s'ordenen per fila o per columna."
			}
		}
	},
	TRANSPOSE: {
		description: "Retorna la transposada d'una matriu",
		abstract: "Retorna la transposada d'una matriu",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/transpose-function"
		}],
		functionParameter: { array: {
			name: "matriu",
			detail: "Un rang de cel·les o una matriu en un full de càlcul."
		} }
	},
	UNIQUE: {
		description: "Retorna una llista de valors únics en una llista o rang",
		abstract: "Retorna una llista de valors únics en una llista o rang",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/unique-function"
		}],
		functionParameter: {
			array: {
				name: "matriu",
				detail: "El rang o matriu des del qual es retornen files o columnes úniques."
			},
			byCol: {
				name: "per_col",
				detail: "És un valor lògic: compara files entre si i retorna valors únics = FALS, o s'omet; compara columnes entre si i retorna valors únics = CERT."
			},
			exactlyOnce: {
				name: "exactament_una_vegada",
				detail: "És un valor lògic: retorna files o columnes de la matriu que apareixen només una vegada = CERT; retorna totes les files o columnes diferents de la matriu = FALS, o s'ha omès."
			}
		}
	},
	VLOOKUP: {
		description: "Utilitzeu VLOOKUP quan necessiteu trobar coses en una taula o un rang per fila. Per exemple, cerqueu el preu d'una peça d'automòbil pel número de peça, o trobeu el nom d'un empleat basant-vos en el seu ID d'empleat.",
		abstract: "Busca a la primera columna d'una matriu i es mou a través de la fila per retornar el valor d'una cel·la",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/vlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "valor_buscat",
				detail: "El valor que voleu buscar. El valor que voleu buscar ha d'estar a la primera columna del rang de cel·les que especifiqueu a l'argument taula_matriu."
			},
			tableArray: {
				name: "taula_matriu",
				detail: "El rang de cel·les en què VLOOKUP cercarà el valor_buscat i el valor de retorn. Podeu utilitzar un rang amb nom o una taula, i podeu utilitzar noms a l'argument en lloc de referències de cel·la."
			},
			colIndexNum: {
				name: "col_índex_núm",
				detail: "El número de columna (començant per 1 per a la columna més a l'esquerra de taula_matriu) que conté el valor de retorn."
			},
			rangeLookup: {
				name: "cerca_rang",
				detail: "Un valor lògic que especifica si voleu que VLOOKUP trobi una coincidència aproximada o exacta: Coincidència aproximada - 1/CERT, Coincidència exacta - 0/FALS"
			}
		}
	},
	VSTACK: {
		description: "Afegeix matrius verticalment i en seqüència per retornar una matriu més gran",
		abstract: "Afegeix matrius verticalment i en seqüència per retornar una matriu més gran",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/vstack-function"
		}],
		functionParameter: {
			array1: {
				name: "matriu",
				detail: "Les matrius a afegir."
			},
			array2: {
				name: "matriu",
				detail: "Les matrius a afegir."
			}
		}
	},
	WRAPCOLS: {
		description: "Embolcalla la fila o columna de valors proporcionada per columnes després d'un nombre específic d'elements",
		abstract: "Embolcalla la fila o columna de valors proporcionada per columnes després d'un nombre específic d'elements",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/wrapcols-function"
		}],
		functionParameter: {
			vector: {
				name: "vector",
				detail: "El vector o referència a embolcallar."
			},
			wrapCount: {
				name: "recompte_embolcall",
				detail: "El nombre màxim de valors per a cada columna."
			},
			padWith: {
				name: "omplir_amb",
				detail: "El valor amb el qual omplir. El valor per defecte és #N/A."
			}
		}
	},
	WRAPROWS: {
		description: "Embolcalla la fila o columna de valors proporcionada per files després d'un nombre específic d'elements",
		abstract: "Embolcalla la fila o columna de valors proporcionada per files després d'un nombre específic d'elements",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/wraprows-function"
		}],
		functionParameter: {
			vector: {
				name: "vector",
				detail: "El vector o referència a embolcallar."
			},
			wrapCount: {
				name: "recompte_embolcall",
				detail: "El nombre màxim de valors per a cada fila."
			},
			padWith: {
				name: "omplir_amb",
				detail: "El valor amb el qual omplir. El valor per defecte és #N/A."
			}
		}
	},
	XLOOKUP: {
		description: "Cerca un rang o una matriu, i retorna un element corresponent a la primera coincidència que troba. Si no existeix una coincidència, llavors XLOOKUP pot retornar la coincidència més propera (aproximada).",
		abstract: "Cerca un rang o una matriu, i retorna un element corresponent a la primera coincidència que troba. Si no existeix una coincidència, llavors XLOOKUP pot retornar la coincidència més propera (aproximada).",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/xlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "valor_buscat",
				detail: "El valor a cercar. Si s'omet, XLOOKUP retorna les cel·les en blanc que troba a matriu_buscada."
			},
			lookupArray: {
				name: "matriu_buscada",
				detail: "La matriu o rang a cercar"
			},
			returnArray: {
				name: "matriu_retornada",
				detail: "La matriu o rang a retornar"
			},
			ifNotFound: {
				name: "si_no_trobat",
				detail: "On no es troba una coincidència vàlida, retorna el text [si_no_trobat] que proporcioneu. Si no es troba una coincidència vàlida, i [si_no_trobat] falta, es retorna #N/A."
			},
			matchMode: {
				name: "mode_coincidència",
				detail: "Especifiqueu el tipus de coincidència: 0 - Coincidència exacta. Si no se'n troba cap, retorna #N/A. Aquest és el valor per defecte. -1 - Coincidència exacta. Si no se'n troba cap, retorna l'element següent més petit. 1 - Coincidència exacta. Si no se'n troba cap, retorna l'element següent més gran. 2 - Una coincidència amb comodins on *, ?, i ~ tenen un significat especial."
			},
			searchMode: {
				name: "mode_cerca",
				detail: "Especifiqueu el mode de cerca a utilitzar: 1 - Realitza una cerca començant pel primer element. Aquest és el valor per defecte. -1 - Realitza una cerca inversa començant per l'últim element. 2 - Realitza una cerca binària que depèn que matriu_buscada estigui ordenada en ordre ascendent. Si no està ordenada, es retornaran resultats no vàlids. -2 - Realitza una cerca binària que depèn que matriu_buscada estigui ordenada en ordre descendent. Si no està ordenada, es retornaran resultats no vàlids."
			}
		}
	},
	XMATCH: {
		description: "Cerca un element especificat en una matriu o rang de cel·les, i després retorna la posició relativa de l'element.",
		abstract: "Retorna la posició relativa d'un element en una matriu o rang de cel·les.",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/xmatch-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "valor_buscat",
				detail: "El valor de cerca"
			},
			lookupArray: {
				name: "matriu_buscada",
				detail: "La matriu o rang a cercar"
			},
			matchMode: {
				name: "mode_coincidència",
				detail: "Especifiqueu el tipus de coincidència:\n0 - Coincidència exacta (per defecte)\n-1 - Coincidència exacta o següent element més petit\n1 - Coincidència exacta o següent element més gran\n2 - Una coincidència amb comodins on *, ?, i ~ tenen un significat especial."
			},
			searchMode: {
				name: "mode_cerca",
				detail: "Especifiqueu el tipus de cerca:\n1 - Cerca de primer a últim (per defecte)\n-1 - Cerca d'últim a primer (cerca inversa).\n2 - Realitzar una cerca binària que depèn que matriu_buscada estigui ordenada en ordre ascendent. Si no està ordenada, es retornaran resultats no vàlids.\n-2 - Realitzar una cerca binària que depèn que matriu_buscada estigui ordenada en ordre descendent. Si no està ordenada, es retornaran resultats no vàlids."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/math/ca-ES.ts
const locale$5 = {
	ABS: {
		description: "Retorna el valor absolut d'un nombre. El valor absolut d'un nombre és el nombre sense el seu signe.",
		abstract: "Retorna el valor absolut d'un nombre",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/abs-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "El nombre real del qual voleu obtenir el valor absolut."
		} }
	},
	ACOS: {
		description: "Retorna l'arccosinus, o cosinus invers, d'un nombre. L'arccosinus és l'angle el cosinus del qual és el nombre. L'angle retornat es dóna en radians en el rang de 0 (zero) a pi.",
		abstract: "Retorna l'arccosinus d'un nombre",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/acos-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "El cosinus de l'angle que voleu i ha d'estar entre -1 i 1."
		} }
	},
	ACOSH: {
		description: "Retorna el cosinus hiperbòlic invers d'un nombre. El nombre ha de ser més gran o igual a 1. El cosinus hiperbòlic invers és el valor el cosinus hiperbòlic del qual és el nombre, de manera que ACOSH(COSH(nombre)) és igual a nombre.",
		abstract: "Retorna el cosinus hiperbòlic invers d'un nombre",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/acosh-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "Qualsevol nombre real igual o superior a 1."
		} }
	},
	ACOT: {
		description: "Retorna el valor principal de l'arccotangent, o cotangent inversa, d'un nombre.",
		abstract: "Retorna l'arccotangent d'un nombre",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/acot-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "El nombre és la cotangent de l'angle que voleu. Ha de ser un nombre real."
		} }
	},
	ACOTH: {
		description: "Retorna l'arccotangent hiperbòlica d'un nombre",
		abstract: "Retorna l'arccotangent hiperbòlica d'un nombre",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/acoth-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "El valor absolut del Nombre ha de ser més gran que 1."
		} }
	},
	AGGREGATE: {
		description: "Retorna un agregat en una llista o base de dades",
		abstract: "Retorna un agregat en una llista o base de dades",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/aggregate-function"
		}],
		functionParameter: {
			functionNum: {
				name: "núm_función",
				detail: "Un número de 1 a 19 que especifica la función que se usará."
			},
			options: {
				name: "opciones",
				detail: "Un valor numérico que determina qué valores del rango de evaluación de la función se omitirán."
			},
			ref1: {
				name: "ref1",
				detail: "El primer argumento numérico para las funciones que tienen varios argumentos numéricos de los que desea obtener el valor agregado."
			},
			ref2: {
				name: "ref2",
				detail: "Argumentos numéricos 2 a 252 cuyo valor agregado desea obtener."
			}
		}
	},
	ARABIC: {
		description: "Converteix un nombre romà a aràbic, com a nombre",
		abstract: "Converteix un nombre romà a aràbic, com a nombre",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/arabic-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Una cadena entre cometes, una cadena buida (\"\"), o una referència a una cel·la que conté text."
		} }
	},
	ASIN: {
		description: "Retorna l'arcsinus d'un nombre.",
		abstract: "Retorna l'arcsinus d'un nombre",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/asin-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "El sinus de l'angle que voleu i ha d'estar entre -1 i 1."
		} }
	},
	ASINH: {
		description: "Retorna el sinus hiperbòlic invers d'un nombre.",
		abstract: "Retorna el sinus hiperbòlic invers d'un nombre",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/asinh-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "Qualsevol nombre real."
		} }
	},
	ATAN: {
		description: "Retorna l'arctangent d'un nombre.",
		abstract: "Retorna l'arctangent d'un nombre",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/atan-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "La tangent de l'angle que voleu."
		} }
	},
	ATAN2: {
		description: "Retorna l'arctangent de les coordenades x i y.",
		abstract: "Retorna l'arctangent de les coordenades x i y",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/atan2-function"
		}],
		functionParameter: {
			xNum: {
				name: "x_núm",
				detail: "La coordenada x del punt."
			},
			yNum: {
				name: "y_núm",
				detail: "La coordenada y del punt."
			}
		}
	},
	ATANH: {
		description: "Retorna la tangent hiperbòlica inversa d'un nombre.",
		abstract: "Retorna la tangent hiperbòlica inversa d'un nombre",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/atanh-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "Qualsevol nombre real entre 1 i -1."
		} }
	},
	BASE: {
		description: "Converteix un nombre en una representació de text amb la base donada (arrel)",
		abstract: "Converteix un nombre en una representació de text amb la base donada (arrel)",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/base-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El nombre que voleu convertir. Ha de ser un enter major o igual a 0 i menor que 2^53."
			},
			radix: {
				name: "base",
				detail: "La base a la qual voleu convertir el nombre. Ha de ser un enter major o igual a 2 i menor o igual a 36."
			},
			minLength: {
				name: "longitud_mínima",
				detail: "La longitud mínima de la cadena retornada. Ha de ser un enter major o igual a 0."
			}
		}
	},
	CEILING: {
		description: "Arrodoneix un nombre a l'enter més proper o al múltiple més proper de la xifra significativa",
		abstract: "Arrodoneix un nombre a l'enter més proper o al múltiple més proper de la xifra significativa",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/ceiling-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El valor que voleu arrodonir."
			},
			significance: {
				name: "xifra_significativa",
				detail: "El múltiple al qual voleu arrodonir."
			}
		}
	},
	CEILING_MATH: {
		description: "Arrodoneix un nombre cap amunt, a l'enter més proper o al múltiple més proper de la xifra significativa",
		abstract: "Arrodoneix un nombre cap amunt, a l'enter més proper o al múltiple més proper de la xifra significativa",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/ceiling-math-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El valor que voleu arrodonir."
			},
			significance: {
				name: "xifra_significativa",
				detail: "El múltiple al qual voleu arrodonir."
			},
			mode: {
				name: "mode",
				detail: "Per a nombres negatius, controla si el Nombre s'arrodoneix cap a zero o en direcció contrària a zero."
			}
		}
	},
	CEILING_PRECISE: {
		description: "Arrodoneix un nombre a l'enter més proper o al múltiple més proper de la xifra significativa. Independentment del signe del nombre, el nombre s'arrodoneix cap amunt.",
		abstract: "Arrodoneix un nombre a l'enter més proper o al múltiple més proper de la xifra significativa. Independentment del signe del nombre, el nombre s'arrodoneix cap amunt.",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/ceiling-precise-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El valor que voleu arrodonir."
			},
			significance: {
				name: "xifra_significativa",
				detail: "El múltiple al qual voleu arrodonir."
			}
		}
	},
	COMBIN: {
		description: "Retorna el nombre de combinacions per a un nombre donat d'objectes",
		abstract: "Retorna el nombre de combinacions per a un nombre donat d'objectes",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/combin-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El nombre d'elements."
			},
			numberChosen: {
				name: "nombre_triat",
				detail: "El nombre d'elements en cada combinació."
			}
		}
	},
	COMBINA: {
		description: "Retorna el nombre de combinacions amb repeticions per a un nombre donat d'elements",
		abstract: "Retorna el nombre de combinacions amb repeticions per a un nombre donat d'elements",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/combina-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El nombre d'elements."
			},
			numberChosen: {
				name: "nombre_triat",
				detail: "El nombre d'elements en cada combinació."
			}
		}
	},
	COS: {
		description: "Retorna el cosinus d'un nombre.",
		abstract: "Retorna el cosinus d'un nombre",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/cos-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "L'angle en radians del qual voleu el cosinus."
		} }
	},
	COSH: {
		description: "Retorna el cosinus hiperbòlic d'un nombre",
		abstract: "Retorna el cosinus hiperbòlic d'un nombre",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/cosh-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "Qualsevol nombre real del qual vulgueu trobar el cosinus hiperbòlic."
		} }
	},
	COT: {
		description: "Retorna la cotangent d'un angle",
		abstract: "Retorna la cotangent d'un angle",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/cot-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "L'angle en radians del qual voleu la cotangent."
		} }
	},
	COTH: {
		description: "Retorna la cotangent hiperbòlica d'un nombre",
		abstract: "Retorna la cotangent hiperbòlica d'un nombre",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/coth-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "Qualsevol nombre real del qual vulgueu trobar la cotangent hiperbòlica."
		} }
	},
	CSC: {
		description: "Retorna la cosecant d'un angle",
		abstract: "Retorna la cosecant d'un angle",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/csc-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "L'angle en radians del qual voleu la cosecant."
		} }
	},
	CSCH: {
		description: "Retorna la cosecant hiperbòlica d'un angle",
		abstract: "Retorna la cosecant hiperbòlica d'un angle",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/csch-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "L'angle en radians del qual voleu la cosecant hiperbòlica."
		} }
	},
	DECIMAL: {
		description: "Converteix una representació de text d'un nombre en una base donada en un nombre decimal",
		abstract: "Converteix una representació de text d'un nombre en una base donada en un nombre decimal",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/decimal-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "La longitud de la cadena de Text ha de ser menor o igual a 255 caràcters."
			},
			radix: {
				name: "base",
				detail: "La base a la qual voleu convertir el nombre. Ha de ser un enter major o igual a 2 i menor o igual a 36."
			}
		}
	},
	DEGREES: {
		description: "Converteix radians a graus",
		abstract: "Converteix radians a graus",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/degrees-function"
		}],
		functionParameter: { angle: {
			name: "angle",
			detail: "L'angle en radians que voleu convertir."
		} }
	},
	EVEN: {
		description: "Arrodoneix un nombre cap amunt a l'enter parell més proper",
		abstract: "Arrodoneix un nombre cap amunt a l'enter parell més proper",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/even-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "El valor a arrodonir."
		} }
	},
	EXP: {
		description: "Retorna e elevat a la potència d'un nombre donat",
		abstract: "Retorna e elevat a la potència d'un nombre donat",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/exp-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "L'exponent aplicat a la base e."
		} }
	},
	FACT: {
		description: "Retorna el factorial d'un nombre",
		abstract: "Retorna el factorial d'un nombre",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/fact-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "El nombre no negatiu del qual voleu el factorial. Si el nombre no és un enter, es trunca."
		} }
	},
	FACTDOUBLE: {
		description: "Retorna el doble factorial d'un nombre",
		abstract: "Retorna el doble factorial d'un nombre",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/factdouble-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "El nombre no negatiu del qual voleu el doble factorial. Si el nombre no és un enter, es trunca."
		} }
	},
	FLOOR: {
		description: "Arrodoneix un nombre cap avall, cap a zero",
		abstract: "Arrodoneix un nombre cap avall, cap a zero",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/floor-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El valor que voleu arrodonir."
			},
			significance: {
				name: "xifra_significativa",
				detail: "El múltiple al qual voleu arrodonir."
			}
		}
	},
	FLOOR_MATH: {
		description: "Arrodoneix un nombre cap avall, a l'enter més proper o al múltiple més proper de la xifra significativa",
		abstract: "Arrodoneix un nombre cap avall, a l'enter més proper o al múltiple més proper de la xifra significativa",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/floor-math-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El valor que voleu arrodonir."
			},
			significance: {
				name: "xifra_significativa",
				detail: "El múltiple al qual voleu arrodonir."
			},
			mode: {
				name: "mode",
				detail: "Per a nombres negatius, controla si el Nombre s'arrodoneix cap a zero o en direcció contrària a zero."
			}
		}
	},
	FLOOR_PRECISE: {
		description: "Arrodoneix un nombre cap avall a l'enter més proper o al múltiple més proper de la xifra significativa. Independentment del signe del nombre, el nombre s'arrodoneix cap avall.",
		abstract: "Arrodoneix un nombre cap avall a l'enter més proper o al múltiple més proper de la xifra significativa.",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/floor-precise-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El valor que voleu arrodonir."
			},
			significance: {
				name: "xifra_significativa",
				detail: "El múltiple al qual voleu arrodonir."
			}
		}
	},
	GCD: {
		description: "Retorna el màxim comú divisor",
		abstract: "Retorna el màxim comú divisor",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/gcd-function"
		}],
		functionParameter: {
			number1: {
				name: "nombre1",
				detail: "Per trobar el primer nombre del màxim comú divisor, també podeu utilitzar una sola matriu o una referència a una matriu en lloc dels paràmetres separats per comes."
			},
			number2: {
				name: "nombre2",
				detail: "El segon nombre del qual s'ha de trobar el màxim comú divisor. Es poden especificar fins a 255 nombres d'aquesta manera."
			}
		}
	},
	INT: {
		description: "Arrodoneix un nombre cap avall a l'enter més proper",
		abstract: "Arrodoneix un nombre cap avall a l'enter més proper",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/int-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "El nombre real que voleu arrodonir cap avall a un enter."
		} }
	},
	ISO_CEILING: {
		description: "Retorna un nombre que s'arrodoneix cap amunt a l'enter més proper o al múltiple més proper de la xifra significativa",
		abstract: "Retorna un nombre que s'arrodoneix cap amunt a l'enter més proper o al múltiple més proper de la xifra significativa",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/iso-ceiling-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El valor que voleu arrodonir."
			},
			significance: {
				name: "xifra_significativa",
				detail: "El múltiple al qual voleu arrodonir."
			}
		}
	},
	LCM: {
		description: "Retorna el mínim comú múltiple",
		abstract: "Retorna el mínim comú múltiple",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/lcm-function"
		}],
		functionParameter: {
			number1: {
				name: "nombre1",
				detail: "Per trobar el primer nombre del mínim comú múltiple, també podeu utilitzar una sola matriu o una referència a una matriu en lloc dels paràmetres separats per comes."
			},
			number2: {
				name: "nombre2",
				detail: "El segon nombre del qual s'ha de trobar el mínim comú múltiple. Es poden especificar fins a 255 nombres d'aquesta manera."
			}
		}
	},
	LN: {
		description: "Retorna el logaritme natural d'un nombre",
		abstract: "Retorna el logaritme natural d'un nombre",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/ln-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "El nombre real positiu del qual voleu el logaritme natural."
		} }
	},
	LOG: {
		description: "Retorna el logaritme d'un nombre en una base especificada",
		abstract: "Retorna el logaritme d'un nombre en una base especificada",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/log-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El nombre real positiu del qual voleu el logaritme."
			},
			base: {
				name: "base",
				detail: "La base del logaritme. Si s'omet la base, s'assumeix que és 10."
			}
		}
	},
	LOG10: {
		description: "Retorna el logaritme en base 10 d'un nombre",
		abstract: "Retorna el logaritme en base 10 d'un nombre",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/log10-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "El nombre real positiu del qual voleu el logaritme en base 10."
		} }
	},
	MDETERM: {
		description: "Retorna el determinant matricial d'una matriu",
		abstract: "Retorna el determinant matricial d'una matriu",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/mdeterm-function"
		}],
		functionParameter: { array: {
			name: "matriu",
			detail: "Una matriu numèrica amb un nombre igual de files i columnes."
		} }
	},
	MINVERSE: {
		description: "Retorna la matriu inversa d'una matriu",
		abstract: "Retorna la matriu inversa d'una matriu",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/minverse-function"
		}],
		functionParameter: { array: {
			name: "matriu",
			detail: "Una matriu numèrica amb un nombre igual de files i columnes."
		} }
	},
	MMULT: {
		description: "Retorna el producte matricial de dues matrius",
		abstract: "Retorna el producte matricial de dues matrius",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/mmult-function"
		}],
		functionParameter: {
			array1: {
				name: "matriu1",
				detail: "Les matrius que voleu multiplicar."
			},
			array2: {
				name: "matriu2",
				detail: "Les matrius que voleu multiplicar."
			}
		}
	},
	MOD: {
		description: "Retorna el residu després que el nombre es divideixi pel divisor. El resultat té el mateix signe que el divisor.",
		abstract: "Retorna el residu de la divisió",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/mod-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El nombre del qual voleu trobar el residu."
			},
			divisor: {
				name: "divisor",
				detail: "El nombre pel qual voleu dividir el nombre."
			}
		}
	},
	MROUND: {
		description: "Retorna un nombre arrodonit al múltiple desitjat",
		abstract: "Retorna un nombre arrodonit al múltiple desitjat",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/mround-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El valor a arrodonir."
			},
			multiple: {
				name: "múltiple",
				detail: "El múltiple al qual voleu arrodonir el nombre."
			}
		}
	},
	MULTINOMIAL: {
		description: "Retorna el multinomial d'un conjunt de nombres",
		abstract: "Retorna el multinomial d'un conjunt de nombres",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/multinomial-function"
		}],
		functionParameter: {
			number1: {
				name: "nombre1",
				detail: "El primer valor o rang a utilitzar en el càlcul."
			},
			number2: {
				name: "nombre2",
				detail: "Valors o rangs addicionals a utilitzar en els càlculs."
			}
		}
	},
	MUNIT: {
		description: "Retorna la matriu unitària o la dimensió especificada",
		abstract: "Retorna la matriu unitària o la dimensió especificada",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/munit-function"
		}],
		functionParameter: { dimension: {
			name: "dimensió",
			detail: "Dimensió és un enter que especifica la dimensió de la matriu unitària que voleu retornar. Retorna una matriu. La dimensió ha de ser més gran que zero."
		} }
	},
	ODD: {
		description: "Arrodoneix un nombre cap amunt a l'enter senar més proper",
		abstract: "Arrodoneix un nombre cap amunt a l'enter senar més proper",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/odd-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "El valor a arrodonir."
		} }
	},
	PI: {
		description: "Retorna el valor de pi",
		abstract: "Retorna el valor de pi",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/pi-function"
		}],
		functionParameter: {}
	},
	POWER: {
		description: "Retorna el resultat d'un nombre elevat a una potència.",
		abstract: "Retorna el resultat d'un nombre elevat a una potència",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/power-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El nombre base. Pot ser qualsevol nombre real."
			},
			power: {
				name: "potència",
				detail: "L'exponent al qual s'eleva el nombre base."
			}
		}
	},
	PRODUCT: {
		description: "Multiplica tots els nombres donats com a arguments i retorna el producte.",
		abstract: "Multiplica els seus arguments",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/product-function"
		}],
		functionParameter: {
			number1: {
				name: "nombre1",
				detail: "El primer nombre o rang que voleu multiplicar."
			},
			number2: {
				name: "nombre2",
				detail: "Nombres o rangs addicionals que voleu multiplicar, fins a un màxim de 255 arguments."
			}
		}
	},
	QUOTIENT: {
		description: "Retorna la part entera d'una divisió",
		abstract: "Retorna la part entera d'una divisió",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/quotient-function"
		}],
		functionParameter: {
			numerator: {
				name: "numerador",
				detail: "El dividend."
			},
			denominator: {
				name: "denominador",
				detail: "El divisor."
			}
		}
	},
	RADIANS: {
		description: "Converteix graus a radians",
		abstract: "Converteix graus a radians",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/radians-function"
		}],
		functionParameter: { angle: {
			name: "angle",
			detail: "Un angle en graus que voleu convertir."
		} }
	},
	RAND: {
		description: "Retorna un nombre aleatori entre 0 i 1",
		abstract: "Retorna un nombre aleatori entre 0 i 1",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/rand-function"
		}],
		functionParameter: {}
	},
	RANDARRAY: {
		description: "Retorna una matriu de nombres aleatoris entre 0 i 1. Tanmateix, podeu especificar el nombre de files i columnes a omplir, els valors mínims i màxims, i si es retornen nombres enters o valors decimals.",
		abstract: "Retorna una matriu de nombres aleatoris entre 0 i 1.",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/randarray-function"
		}],
		functionParameter: {
			rows: {
				name: "files",
				detail: "El nombre de files que es retornaran"
			},
			columns: {
				name: "columnes",
				detail: "El nombre de columnes que es retornaran"
			},
			min: {
				name: "min",
				detail: "El nombre mínim que us agradaria que es retornés"
			},
			max: {
				name: "max",
				detail: "El nombre màxim que us agradaria que es retornés"
			},
			wholeNumber: {
				name: "nombre_sencer",
				detail: "Retornar un nombre sencer o un valor decimal"
			}
		}
	},
	RANDBETWEEN: {
		description: "Retorna un nombre aleatori entre els nombres que especifiqueu",
		abstract: "Retorna un nombre aleatori entre els nombres que especifiqueu",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/randbetween-function"
		}],
		functionParameter: {
			bottom: {
				name: "inferior",
				detail: "L'enter més petit que retornarà RANDBETWEEN."
			},
			top: {
				name: "superior",
				detail: "L'enter més gran que retornarà RANDBETWEEN."
			}
		}
	},
	ROMAN: {
		description: "Converteix un nombre aràbic a romà, com a text",
		abstract: "Converteix un nombre aràbic a romà, com a text",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/roman-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El nombre aràbic que voleu convertir."
			},
			form: {
				name: "forma",
				detail: "Un nombre que especifica el tipus de nombre romà que voleu. L'estil del nombre romà varia de Clàssic a Simplificat, tornant-se més concís a mesura que augmenta el valor de la forma."
			}
		}
	},
	ROUND: {
		description: "Arrodoneix un nombre a un nombre especificat de dígits",
		abstract: "Arrodoneix un nombre a un nombre especificat de dígits",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/round-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El nombre que voleu arrodonir."
			},
			numDigits: {
				name: "núm_dígits",
				detail: "El nombre de dígits al qual voleu arrodonir l'argument del nombre."
			}
		}
	},
	ROUNDBANK: {
		description: "Arrodoneix un nombre amb arrodoniment bancari",
		abstract: "Arrodoneix un nombre amb arrodoniment bancari",
		links: [{
			title: "Instrucció",
			url: ""
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El nombre que voleu arrodonir amb arrodoniment bancari."
			},
			numDigits: {
				name: "núm_dígits",
				detail: "El nombre de dígits al qual voleu arrodonir amb arrodoniment bancari."
			}
		}
	},
	ROUNDDOWN: {
		description: "Arrodoneix un nombre cap avall, cap a zero",
		abstract: "Arrodoneix un nombre cap avall, cap a zero",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/rounddown-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El nombre que voleu arrodonir."
			},
			numDigits: {
				name: "núm_dígits",
				detail: "El nombre de dígits al qual voleu arrodonir l'argument del nombre."
			}
		}
	},
	ROUNDUP: {
		description: "Arrodoneix un nombre cap amunt, en direcció contrària a zero",
		abstract: "Arrodoneix un nombre cap amunt, en direcció contrària a zero",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/roundup-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El nombre que voleu arrodonir."
			},
			numDigits: {
				name: "núm_dígits",
				detail: "El nombre de dígits al qual voleu arrodonir l'argument del nombre."
			}
		}
	},
	SEC: {
		description: "Retorna la secant d'un angle",
		abstract: "Retorna la secant d'un angle",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/sec-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "El nombre és l'angle en radians del qual voleu la secant."
		} }
	},
	SECH: {
		description: "Retorna la secant hiperbòlica d'un angle",
		abstract: "Retorna la secant hiperbòlica d'un angle",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/sech-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "El nombre és l'angle en radians del qual voleu la secant hiperbòlica."
		} }
	},
	SERIESSUM: {
		description: "Retorna la suma d'una sèrie de potències basada en la fórmula",
		abstract: "Retorna la suma d'una sèrie de potències basada en la fórmula",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/seriessum-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor d'entrada a la sèrie de potències."
			},
			n: {
				name: "n",
				detail: "La potència inicial a la qual voleu elevar x."
			},
			m: {
				name: "m",
				detail: "El pas pel qual augmentar n per a cada terme de la sèrie."
			},
			coefficients: {
				name: "coeficients",
				detail: "Un conjunt de coeficients pels quals es multiplica cada potència successiva de x."
			}
		}
	},
	SEQUENCE: {
		description: "Genera una llista de nombres seqüencials en una matriu, com 1, 2, 3, 4",
		abstract: "Genera una llista de nombres seqüencials en una matriu, com 1, 2, 3, 4",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/sequence-function"
		}],
		functionParameter: {
			rows: {
				name: "files",
				detail: "El nombre de files a retornar."
			},
			columns: {
				name: "columnes",
				detail: "El nombre de columnes a retornar."
			},
			start: {
				name: "inici",
				detail: "El primer nombre de la seqüència."
			},
			step: {
				name: "pas",
				detail: "La quantitat a incrementar cada valor subsegüent a la matriu."
			}
		}
	},
	SIGN: {
		description: "Retorna el signe d'un nombre",
		abstract: "Retorna el signe d'un nombre",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/sign-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "Qualsevol nombre real."
		} }
	},
	SIN: {
		description: "Retorna el sinus de l'angle donat",
		abstract: "Retorna el sinus de l'angle donat",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/sin-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "L'angle en radians del qual voleu el sinus."
		} }
	},
	SINH: {
		description: "Retorna el sinus hiperbòlic d'un nombre",
		abstract: "Retorna el sinus hiperbòlic d'un nombre",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/sinh-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "Qualsevol nombre real."
		} }
	},
	SQRT: {
		description: "Retorna una arrel quadrada positiva",
		abstract: "Retorna una arrel quadrada positiva",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/sqrt-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "El nombre del qual voleu l'arrel quadrada."
		} }
	},
	SQRTPI: {
		description: "Retorna l'arrel quadrada de (nombre * pi)",
		abstract: "Retorna l'arrel quadrada de (nombre * pi)",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/sqrtpi-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "El nombre pel qual es multiplica pi."
		} }
	},
	SUBTOTAL: {
		description: "Retorna un subtotal en una llista o base de dades.",
		abstract: "Retorna un subtotal en una llista o base de dades",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/subtotal-function"
		}],
		functionParameter: {
			functionNum: {
				name: "núm_funció",
				detail: "El nombre 1-11 o 101-111 que especifica la funció a utilitzar per al subtotal. 1-11 inclou files ocultes manualment, mentre que 101-111 les exclou; les cel·les filtrades sempre s'exclouen."
			},
			ref1: {
				name: "ref1",
				detail: "El primer rang amb nom o referència per al qual voleu el subtotal."
			},
			ref2: {
				name: "ref2",
				detail: "Rangs amb nom o referències de 2 a 254 per als quals voleu el subtotal."
			}
		}
	},
	SUM: {
		description: "Podeu sumar valors individuals, referències de cel·la o rangs, o una barreja de tots tres.",
		abstract: "Suma els seus arguments",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/sum-function"
		}],
		functionParameter: {
			number1: {
				name: "Nombre 1",
				detail: "El primer nombre que voleu sumar. El nombre pot ser com 4, una referència de cel·la com B6, o un rang de cel·les com B2:B8."
			},
			number2: {
				name: "Nombre 2",
				detail: "Aquest és el segon nombre que voleu sumar. Podeu especificar fins a 255 nombres d'aquesta manera."
			}
		}
	},
	SUMIF: {
		description: "Suma els valors en un rang que compleixen els criteris que especifiqueu.",
		abstract: "Suma les cel·les especificades per un criteri donat",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/sumif-function"
		}],
		functionParameter: {
			range: {
				name: "rang",
				detail: "El rang de cel·les que voleu avaluar per criteris."
			},
			criteria: {
				name: "criteri",
				detail: "El criteri en forma de nombre, expressió, una referència de cel·la, text o una funció que defineix quines cel·les se sumaran. Es poden incloure caràcters comodí: un signe d'interrogació (?) per coincidir amb qualsevol caràcter individual, un asterisc (*) per coincidir amb qualsevol seqüència de caràcters. Si voleu trobar un signe d'interrogació o un asterisc real, escriviu una titlla (~) abans del caràcter."
			},
			sumRange: {
				name: "rang_suma",
				detail: "Les cel·les reals a sumar, si voleu sumar cel·les diferents de les especificades a l'argument de rang. Si s'omet l'argument rang_suma, l'Excel suma les cel·les especificades a l'argument de rang (les mateixes cel·les a les quals s'aplica el criteri)."
			}
		}
	},
	SUMIFS: {
		description: "Suma tots els seus arguments que compleixen múltiples criteris.",
		abstract: "Suma tots els seus arguments que compleixen múltiples criteris.",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/sumifs-function"
		}],
		functionParameter: {
			sumRange: {
				name: "rang_suma",
				detail: "El rang de cel·les a sumar."
			},
			criteriaRange1: {
				name: "rang_criteri1 ",
				detail: "El rang que es prova utilitzant el criteri1. rang_criteri1 i criteri1 estableixen una parella de cerca mitjançant la qual es busca un rang per a criteris específics. Un cop es troben els elements al rang, se sumen els seus valors corresponents a rang_suma."
			},
			criteria1: {
				name: "criteri1",
				detail: "El criteri que defineix quines cel·les de rang_criteri1 se sumaran. Per exemple, el criteri es pot introduir com a 32, \">32\", B4, \"pomes\" o \"32\"."
			},
			criteriaRange2: {
				name: "rang_criteri2",
				detail: "Rangs addicionals. Podeu introduir fins a 127 parelles de rangs."
			},
			criteria2: {
				name: "criteri2",
				detail: "Criteris associats addicionals. Podeu introduir fins a 127 parelles de criteris."
			}
		}
	},
	SUMPRODUCT: {
		description: "Retorna la suma dels productes dels components corresponents de la matriu",
		abstract: "Retorna la suma dels productes dels components corresponents de la matriu",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/sumproduct-function"
		}],
		functionParameter: {
			array1: {
				name: "matriu",
				detail: "El primer argument de matriu els components del qual voleu multiplicar i després sumar."
			},
			array2: {
				name: "matriu",
				detail: "Arguments de matriu de 2 a 255 els components del qual voleu multiplicar i després sumar."
			}
		}
	},
	SUMSQ: {
		description: "Retorna la suma dels quadrats dels arguments",
		abstract: "Retorna la suma dels quadrats dels arguments",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/sumsq-function"
		}],
		functionParameter: {
			number1: {
				name: "nombre1",
				detail: "Per elevar al quadrat i trobar el primer nombre, també podeu utilitzar una sola matriu o una referència a una matriu en lloc de paràmetres separats per comes."
			},
			number2: {
				name: "nombre2",
				detail: "El segon nombre que s'elevarà al quadrat i se sumarà. Es poden especificar fins a 255 nombres d'aquesta manera."
			}
		}
	},
	SUMX2MY2: {
		description: "Retorna la suma de la diferència de quadrats dels valors corresponents en dues matrius",
		abstract: "Retorna la suma de la diferència de quadrats dels valors corresponents en dues matrius",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/sumx2my2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "matriu_x",
				detail: "La primera matriu o rang de valors."
			},
			arrayY: {
				name: "matriu_y",
				detail: "La segona matriu o rang de valors."
			}
		}
	},
	SUMX2PY2: {
		description: "Retorna la suma de la suma de quadrats dels valors corresponents en dues matrius",
		abstract: "Retorna la suma de la suma de quadrats dels valors corresponents en dues matrius",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/sumx2py2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "matriu_x",
				detail: "La primera matriu o rang de valors."
			},
			arrayY: {
				name: "matriu_y",
				detail: "La segona matriu o rang de valors."
			}
		}
	},
	SUMXMY2: {
		description: "Retorna la suma dels quadrats de les diferències dels valors corresponents en dues matrius",
		abstract: "Retorna la suma dels quadrats de les diferències dels valors corresponents en dues matrius",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/sumxmy2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "matriu_x",
				detail: "La primera matriu o rang de valors."
			},
			arrayY: {
				name: "matriu_y",
				detail: "La segona matriu o rang de valors."
			}
		}
	},
	TAN: {
		description: "Retorna la tangent d'un nombre.",
		abstract: "Retorna la tangent d'un nombre",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/tan-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "L'angle en radians del qual voleu la tangent."
		} }
	},
	TANH: {
		description: "Retorna la tangent hiperbòlica d'un nombre.",
		abstract: "Retorna la tangent hiperbòlica d'un nombre",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/tanh-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "Qualsevol nombre real."
		} }
	},
	TRUNC: {
		description: "Trunca un nombre a un enter",
		abstract: "Trunca un nombre a un enter",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/trunc-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El nombre que voleu truncar."
			},
			numDigits: {
				name: "núm_dígits",
				detail: "Un nombre que especifica la precisió del truncament. El valor per defecte per a núm_dígits és 0 (zero)."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/statistical/ca-ES.ts
const locale$4 = {
	AVEDEV: {
		description: "Retorna la mitjana de les desviacions absolutes dels punts de dades respecte a la seva mitjana.",
		abstract: "Retorna la mitjana de les desviacions absolutes dels punts de dades respecte a la seva mitjana",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/avedev-function"
		}],
		functionParameter: {
			number1: {
				name: "nombre1",
				detail: "El primer nombre, referència de cel·la o rang del qual voleu la mitjana."
			},
			number2: {
				name: "nombre2",
				detail: "Nombres addicionals, referències de cel·la o rangs dels quals voleu la mitjana, fins a un màxim de 255."
			}
		}
	},
	AVERAGE: {
		description: "Retorna la mitjana (mitjana aritmètica) dels arguments.",
		abstract: "Retorna la mitjana dels seus arguments",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/average-function"
		}],
		functionParameter: {
			number1: {
				name: "nombre1",
				detail: "El primer nombre, referència de cel·la o rang del qual voleu la mitjana."
			},
			number2: {
				name: "nombre2",
				detail: "Nombres addicionals, referències de cel·la o rangs dels quals voleu la mitjana, fins a un màxim de 255."
			}
		}
	},
	AVERAGE_WEIGHTED: {
		description: "La funció AVERAGE.WEIGHTED troba la mitjana ponderada d'un conjunt de valors, tenint en compte els valors i les ponderacions corresponents.",
		abstract: "La funció AVERAGE.WEIGHTED troba la mitjana ponderada d'un conjunt de valors, tenint en compte els valors i les ponderacions corresponents.",
		links: [{
			title: "Instruccions",
			url: "https://support.google.com/docs/answer/9084098?hl=ca"
		}],
		functionParameter: {
			values: {
				name: "valors",
				detail: "Valors de què es calcula la mitjana. Pot fer referència a un interval de cel·les o pot contenir els valors mateixos."
			},
			weights: {
				name: "ponderacions",
				detail: "Llista de ponderacions corresponent que cal aplicar. Pot fer referència a un interval de cel·les o pot contenir les ponderacions mateixes. Les ponderacions no poden ser negatives, però sí que poden ser zero. Almenys una de les ponderacions ha de ser positiva. Si utilitzeu un interval de cel·les, ha de tenir el mateix nombre de files i de columnes que l'interval de valors."
			},
			additionalValues: {
				name: "valors_addicionals",
				detail: "Valors extra de què es calcula la mitjana. Els valors addicionals són opcionals."
			},
			additionalWeights: {
				name: "ponderacions_addicionals",
				detail: "Ponderacions extra que cal aplicar. Les ponderacions addicionals són opcionals, però cada valor_addicional ha d'anar seguit d'exactament una ponderació_addicional ."
			}
		}
	},
	AVERAGEA: {
		description: "Retorna la mitjana dels seus arguments, incloent-hi nombres, text i valors lògics.",
		abstract: "Retorna la mitjana dels seus arguments, incloent-hi nombres, text i valors lògics",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/averagea-function"
		}],
		functionParameter: {
			value1: {
				name: "valor1",
				detail: "El primer nombre, referència de cel·la o rang del qual voleu la mitjana."
			},
			value2: {
				name: "valor2",
				detail: "Nombres addicionals, referències de cel·la o rangs dels quals voleu la mitjana, fins a un màxim de 255."
			}
		}
	},
	AVERAGEIF: {
		description: "Retorna la mitjana (mitjana aritmètica) de totes les cel·les d'un rang que compleixen un criteri determinat.",
		abstract: "Retorna la mitjana (mitjana aritmètica) de totes les cel·les d'un rang que compleixen un criteri determinat",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/averageif-function"
		}],
		functionParameter: {
			range: {
				name: "rang",
				detail: "Una o més cel·les per fer la mitjana, incloent-hi nombres o noms, matrius o referències que continguin nombres."
			},
			criteria: {
				name: "criteri",
				detail: "El criteri en forma de nombre, expressió, referència de cel·la o text que defineix quines cel·les es fan la mitjana. Per exemple, el criteri es pot expressar com 32, \"32\", \">32\", \"pomes\" o B4."
			},
			averageRange: {
				name: "rang_mitjana",
				detail: "El conjunt real de cel·les per fer la mitjana. Si s'omet, s'utilitza el rang."
			}
		}
	},
	AVERAGEIFS: {
		description: "Retorna la mitjana (mitjana aritmètica) de totes les cel·les que compleixen múltiples criteris.",
		abstract: "Retorna la mitjana (mitjana aritmètica) de totes les cel·les que compleixen múltiples criteris",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/averageifs-function"
		}],
		functionParameter: {
			averageRange: {
				name: "rang_mitjana",
				detail: "Una o més cel·les per fer la mitjana, incloent-hi nombres o noms, matrius o referències que continguin nombres."
			},
			criteriaRange1: {
				name: "rang_criteris1",
				detail: "És el conjunt de cel·les a avaluar amb el criteri."
			},
			criteria1: {
				name: "criteri1",
				detail: "S'utilitza per definir les cel·les de les quals es calcularà la mitjana. Per exemple, el criteri es pot expressar com 32, \"32\", \">32\", \"poma\" o B4"
			},
			criteriaRange2: {
				name: "rang_criteris2",
				detail: "Rangs addicionals. Podeu introduir fins a 127 rangs."
			},
			criteria2: {
				name: "criteri2",
				detail: "Criteris addicionals associats. Podeu introduir fins a 127 criteris."
			}
		}
	},
	BETA_DIST: {
		description: "Retorna la funció de distribució acumulada beta",
		abstract: "Retorna la funció de distribució acumulada beta",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/beta-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor entre A i B en què s'avalua la funció."
			},
			alpha: {
				name: "alfa",
				detail: "Un paràmetre de la distribució."
			},
			beta: {
				name: "beta",
				detail: "Un paràmetre de la distribució."
			},
			cumulative: {
				name: "acumulatiu",
				detail: "Un valor lògic que determina la forma de la funció. Si és CERT, DIST.BETA retorna la funció de distribució acumulada; si és FALS, retorna la funció de densitat de probabilitat."
			},
			A: {
				name: "A",
				detail: "Un límit inferior de l'interval de x."
			},
			B: {
				name: "B",
				detail: "Un límit superior de l'interval de x."
			}
		}
	},
	BETA_INV: {
		description: "Retorna la inversa de la funció de distribució acumulada per a una distribució beta especificada",
		abstract: "Retorna la inversa de la funció de distribució acumulada per a una distribució beta especificada",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/beta-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probabilitat",
				detail: "Una probabilitat associada amb la distribució beta."
			},
			alpha: {
				name: "alfa",
				detail: "Un paràmetre de la distribució."
			},
			beta: {
				name: "beta",
				detail: "Un paràmetre de la distribució."
			},
			A: {
				name: "A",
				detail: "Un límit inferior de l'interval de x."
			},
			B: {
				name: "B",
				detail: "Un límit superior de l'interval de x."
			}
		}
	},
	BINOM_DIST: {
		description: "Retorna la probabilitat d'una variable aleatòria discreta seguint una distribució binomial",
		abstract: "Retorna la probabilitat d'una variable aleatòria discreta seguint una distribució binomial",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/binom-dist-function"
		}],
		functionParameter: {
			numberS: {
				name: "nombre_èxits",
				detail: "El nombre d'èxits en els assajos."
			},
			trials: {
				name: "assajos",
				detail: "El nombre d'assajos independents."
			},
			probabilityS: {
				name: "prob_èxit",
				detail: "La probabilitat d'èxit en cada assaig."
			},
			cumulative: {
				name: "acumulatiu",
				detail: "Un valor lògic que determina la forma de la funció. Si és CERT, DIST.BINOM retorna la funció de distribució acumulada; si és FALS, retorna la funció de densitat de probabilitat."
			}
		}
	},
	BINOM_DIST_RANGE: {
		description: "Retorna la probabilitat d'un resultat d'assaig utilitzant una distribució binomial",
		abstract: "Retorna la probabilitat d'un resultat d'assaig utilitzant una distribució binomial",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/binom-dist-range-function"
		}],
		functionParameter: {
			trials: {
				name: "assajos",
				detail: "El nombre d'assajos independents."
			},
			probabilityS: {
				name: "prob_èxit",
				detail: "La probabilitat d'èxit en cada assaig."
			},
			numberS: {
				name: "nombre_èxits",
				detail: "El nombre d'èxits en els assajos."
			},
			numberS2: {
				name: "nombre_èxits2",
				detail: "Si es proporciona, retorna la probabilitat que el nombre d'assajos reeixits caigui entre nombre_èxits i nombre_èxits2."
			}
		}
	},
	BINOM_INV: {
		description: "Retorna el valor més petit pel qual la distribució binomial acumulada és menor o igual a un valor de criteri",
		abstract: "Retorna el valor més petit pel qual la distribució binomial acumulada és menor o igual a un valor de criteri",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/binom-inv-function"
		}],
		functionParameter: {
			trials: {
				name: "assajos",
				detail: "El nombre d'assajos de Bernoulli."
			},
			probabilityS: {
				name: "prob_èxit",
				detail: "La probabilitat d'èxit en cada assaig."
			},
			alpha: {
				name: "alfa",
				detail: "El valor de criteri."
			}
		}
	},
	CHISQ_DIST: {
		description: "Retorna la probabilitat de cua esquerra de la distribució khi quadrat.",
		abstract: "Retorna la probabilitat de cua esquerra de la distribució khi quadrat.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/chisq-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor en què es vol avaluar la distribució."
			},
			degFreedom: {
				name: "graus_llibertat",
				detail: "El nombre de graus de llibertat."
			},
			cumulative: {
				name: "acumulatiu",
				detail: "Un valor lògic que determina la forma de la funció. Si és CERT, DIST.CHI retorna la funció de distribució acumulada; si és FALS, retorna la funció de densitat de probabilitat."
			}
		}
	},
	CHISQ_DIST_RT: {
		description: "Retorna la probabilitat de cua dreta de la distribució khi quadrat.",
		abstract: "Retorna la probabilitat de cua dreta de la distribució khi quadrat.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/chisq-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor en què es vol avaluar la distribució."
			},
			degFreedom: {
				name: "graus_llibertat",
				detail: "El nombre de graus de llibertat."
			}
		}
	},
	CHISQ_INV: {
		description: "Retorna la inversa de la probabilitat de cua esquerra de la distribució khi quadrat.",
		abstract: "Retorna la inversa de la probabilitat de cua esquerra de la distribució khi quadrat.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/chisq-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probabilitat",
				detail: "Una probabilitat associada amb la distribució khi quadrat."
			},
			degFreedom: {
				name: "graus_llibertat",
				detail: "El nombre de graus de llibertat."
			}
		}
	},
	CHISQ_INV_RT: {
		description: "Retorna la inversa de la probabilitat de cua dreta de la distribució khi quadrat.",
		abstract: "Retorna la inversa de la probabilitat de cua dreta de la distribució khi quadrat.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/chisq-inv-rt-function"
		}],
		functionParameter: {
			probability: {
				name: "probabilitat",
				detail: "Una probabilitat associada amb la distribució khi quadrat."
			},
			degFreedom: {
				name: "graus_llibertat",
				detail: "El nombre de graus de llibertat."
			}
		}
	},
	CHISQ_TEST: {
		description: "Retorna la prova d'independència",
		abstract: "Retorna la prova d'independència",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/chisq-test-function"
		}],
		functionParameter: {
			actualRange: {
				name: "rang_real",
				detail: "El rang de dades que conté les observacions per contrastar amb els valors esperats."
			},
			expectedRange: {
				name: "rang_esperat",
				detail: "El rang de dades que conté la proporció del producte dels totals de fila i els totals de columna respecte al total general."
			}
		}
	},
	CONFIDENCE_NORM: {
		description: "Retorna l'interval de confiança per a la mitjana d'una població, utilitzant una distribució normal.",
		abstract: "Retorna l'interval de confiança per a la mitjana d'una població, utilitzant una distribució normal.",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/confidence-norm-function"
		}],
		functionParameter: {
			alpha: {
				name: "alfa",
				detail: "El nivell de significació utilitzat per calcular el nivell de confiança. El nivell de confiança és igual a 100*(1 - alfa)%, o en altres paraules, un alfa de 0,05 indica un nivell de confiança del 95 per cent."
			},
			standardDev: {
				name: "desv_estàndard",
				detail: "La desviació estàndard de la població per al rang de dades i s'assumeix que és coneguda."
			},
			size: {
				name: "mida",
				detail: "La mida de la mostra."
			}
		}
	},
	CONFIDENCE_T: {
		description: "Retorna l'interval de confiança per a la mitjana d'una població, utilitzant una distribució t de Student",
		abstract: "Retorna l'interval de confiança per a la mitjana d'una població, utilitzant una distribució t de Student",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/confidence-t-function"
		}],
		functionParameter: {
			alpha: {
				name: "alfa",
				detail: "El nivell de significació utilitzat per calcular el nivell de confiança. El nivell de confiança és igual a 100*(1 - alfa)%, o en altres paraules, un alfa de 0,05 indica un nivell de confiança del 95 per cent."
			},
			standardDev: {
				name: "desv_estàndard",
				detail: "La desviació estàndard de la població per al rang de dades i s'assumeix que és coneguda."
			},
			size: {
				name: "mida",
				detail: "La mida de la mostra."
			}
		}
	},
	CORREL: {
		description: "Retorna el coeficient de correlació entre dos conjunts de dades",
		abstract: "Retorna el coeficient de correlació entre dos conjunts de dades",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/correl-function"
		}],
		functionParameter: {
			array1: {
				name: "matriu1",
				detail: "Un primer rang de valors de cel·la."
			},
			array2: {
				name: "matriu2",
				detail: "Un segon rang de valors de cel·la."
			}
		}
	},
	COUNT: {
		description: "Compta el nombre de cel·les que contenen nombres i compta els nombres dins de la llista d'arguments.",
		abstract: "Compta quants nombres hi ha a la llista d'arguments",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/count-function"
		}],
		functionParameter: {
			value1: {
				name: "valor1",
				detail: "El primer element, referència de cel·la o rang dins del qual voleu comptar nombres."
			},
			value2: {
				name: "valor2",
				detail: "Fins a 255 elements, referències de cel·la o rangs addicionals dins dels quals voleu comptar nombres."
			}
		}
	},
	COUNTA: {
		description: `Compta les cel·les que contenen qualsevol tipus d'informació, incloent-hi valors d'error i text buit ("")
        Si no necessiteu comptar valors lògics, text o valors d'error`,
		abstract: "Compta quants valors hi ha a la llista d'arguments",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/counta-function"
		}],
		functionParameter: {
			value1: {
				name: "valor1",
				detail: "El primer nombre, referència de cel·la o rang del qual voleu la mitjana."
			},
			value2: {
				name: "valor2",
				detail: "Nombres addicionals, referències de cel·la o rangs dels quals voleu la mitjana, fins a un màxim de 255."
			}
		}
	},
	COUNTBLANK: {
		description: "Compta el nombre de cel·les en blanc dins d'un rang.",
		abstract: "Compta el nombre de cel·les en blanc dins d'un rang",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/countblank-function"
		}],
		functionParameter: { range: {
			name: "rang",
			detail: "El rang des del qual voleu comptar les cel·les en blanc."
		} }
	},
	COUNTIF: {
		description: "Compta el nombre de cel·les dins d'un rang que compleixen el criteri donat.",
		abstract: "Compta el nombre de cel·les dins d'un rang que compleixen el criteri donat",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/use-the-countif-function-in-microsoft-excel"
		}],
		functionParameter: {
			range: {
				name: "rang",
				detail: "El grup de cel·les que voleu comptar. El rang pot contenir nombres, matrius, un rang amb nom o referències que continguin nombres. Els valors en blanc i de text s'ignoren."
			},
			criteria: {
				name: "criteri",
				detail: "Un nombre, expressió, referència de cel·la o cadena de text que determina quines cel·les es comptaran.\nPer exemple, podeu utilitzar un nombre com 32, una comparació com \">32\", una cel·la com B4 o una paraula com \"pomes\".\nCOMPTA.SI utilitza només un únic criteri. Utilitzeu COMPTA.SI.CONJUNT si voleu utilitzar múltiples criteris."
			}
		}
	},
	COUNTIFS: {
		description: "Compta el nombre de cel·les dins d'un rang que compleixen múltiples criteris.",
		abstract: "Compta el nombre de cel·les dins d'un rang que compleixen múltiples criteris",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/countifs-function"
		}],
		functionParameter: {
			criteriaRange1: {
				name: "rang_criteris1",
				detail: "El primer rang en què avaluar els criteris associats."
			},
			criteria1: {
				name: "criteri1",
				detail: "El criteri en forma de nombre, expressió, referència de cel·la o text que defineix quines cel·les es comptaran. Per exemple, els criteris es poden expressar com 32, \">32\", B4, \"pomes\" o \"32\"."
			},
			criteriaRange2: {
				name: "rang_criteris2",
				detail: "Rangs addicionals. Podeu introduir fins a 127 rangs."
			},
			criteria2: {
				name: "criteri2",
				detail: "Criteris addicionals associats. Podeu introduir fins a 127 criteris."
			}
		}
	},
	COVARIANCE_P: {
		description: "Retorna la covariància de la població, la mitjana dels productes de les desviacions per a cada parell de punts de dades en dos conjunts de dades.",
		abstract: "Retorna la covariància de la població",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/covariance-p-function"
		}],
		functionParameter: {
			array1: {
				name: "matriu1",
				detail: "Un primer rang de valors de cel·la."
			},
			array2: {
				name: "matriu2",
				detail: "Un segon rang de valors de cel·la."
			}
		}
	},
	COVARIANCE_S: {
		description: "Retorna la covariància de la mostra, la mitjana dels productes de les desviacions per a cada parell de punts de dades en dos conjunts de dades.",
		abstract: "Retorna la covariància de la mostra",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/covariance-s-function"
		}],
		functionParameter: {
			array1: {
				name: "matriu1",
				detail: "Un primer rang de valors de cel·la."
			},
			array2: {
				name: "matriu2",
				detail: "Un segon rang de valors de cel·la."
			}
		}
	},
	DEVSQ: {
		description: "Retorna la suma dels quadrats de les desviacions",
		abstract: "Retorna la suma dels quadrats de les desviacions",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/devsq-function"
		}],
		functionParameter: {
			number1: {
				name: "nombre1",
				detail: "El primer argument pel qual voleu calcular la suma de les desviacions al quadrat."
			},
			number2: {
				name: "nombre2",
				detail: "Els arguments del 2 al 255 pels quals voleu calcular la suma de les desviacions al quadrat."
			}
		}
	},
	EXPON_DIST: {
		description: "Retorna la distribució exponencial",
		abstract: "Retorna la distribució exponencial",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/expon-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor en què es vol avaluar la distribució."
			},
			lambda: {
				name: "lambda",
				detail: "El valor del paràmetre."
			},
			cumulative: {
				name: "acumulatiu",
				detail: "Un valor lògic que determina la forma de la funció. Si és CERT, DISTR.EXP retorna la funció de distribució acumulada; si és FALS, retorna la funció de densitat de probabilitat."
			}
		}
	},
	F_DIST: {
		description: "Retorna la distribució de probabilitat F",
		abstract: "Retorna la distribució de probabilitat F",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/f-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor en què s'avalua la funció."
			},
			degFreedom1: {
				name: "graus_llibertat1",
				detail: "Els graus de llibertat del numerador."
			},
			degFreedom2: {
				name: "graus_llibertat2",
				detail: "Els graus de llibertat del denominador."
			},
			cumulative: {
				name: "acumulatiu",
				detail: "Un valor lògic que determina la forma de la funció. Si és CERT, DISTR.F retorna la funció de distribució acumulada; si és FALS, retorna la funció de densitat de probabilitat."
			}
		}
	},
	F_DIST_RT: {
		description: "Retorna la distribució de probabilitat F (de cua dreta)",
		abstract: "Retorna la distribució de probabilitat F (de cua dreta)",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/f-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor en què s'avalua la funció."
			},
			degFreedom1: {
				name: "graus_llibertat1",
				detail: "Els graus de llibertat del numerador."
			},
			degFreedom2: {
				name: "graus_llibertat2",
				detail: "Els graus de llibertat del denominador."
			}
		}
	},
	F_INV: {
		description: "Retorna la inversa de la distribució de probabilitat F",
		abstract: "Retorna la inversa de la distribució de probabilitat F",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/f-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probabilitat",
				detail: "Una probabilitat associada amb la distribució F acumulada."
			},
			degFreedom1: {
				name: "graus_llibertat1",
				detail: "Els graus de llibertat del numerador."
			},
			degFreedom2: {
				name: "graus_llibertat2",
				detail: "Els graus de llibertat del denominador."
			}
		}
	},
	F_INV_RT: {
		description: "Retorna la inversa de la distribució de probabilitat F (de cua dreta)",
		abstract: "Retorna la inversa de la distribució de probabilitat F (de cua dreta)",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/f-inv-rt-function"
		}],
		functionParameter: {
			probability: {
				name: "probabilitat",
				detail: "Una probabilitat associada amb la distribució F acumulada."
			},
			degFreedom1: {
				name: "graus_llibertat1",
				detail: "Els graus de llibertat del numerador."
			},
			degFreedom2: {
				name: "graus_llibertat2",
				detail: "Els graus de llibertat del denominador."
			}
		}
	},
	F_TEST: {
		description: "Retorna el resultat d'una prova F",
		abstract: "Retorna el resultat d'una prova F",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/f-test-function"
		}],
		functionParameter: {
			array1: {
				name: "matriu1",
				detail: "La primera matriu o rang de dades."
			},
			array2: {
				name: "matriu2",
				detail: "La segona matriu o rang de dades."
			}
		}
	},
	FISHER: {
		description: "Retorna la transformació de Fisher",
		abstract: "Retorna la transformació de Fisher",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/fisher-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Un valor numèric per al qual voleu la transformació."
		} }
	},
	FISHERINV: {
		description: "Retorna la inversa de la transformació de Fisher",
		abstract: "Retorna la inversa de la transformació de Fisher",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/fisherinv-function"
		}],
		functionParameter: { y: {
			name: "y",
			detail: "El valor per al qual voleu realitzar la inversa de la transformació."
		} }
	},
	FORECAST: {
		description: "Retorna un valor al llarg d'una tendència lineal",
		abstract: "Retorna un valor al llarg d'una tendència lineal",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/forecast-and-forecast-linear-functions"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El punt de dades per al qual voleu predir un valor."
			},
			knownYs: {
				name: "conegut_y",
				detail: "La matriu o rang de dades dependent."
			},
			knownXs: {
				name: "conegut_x",
				detail: "La matriu o rang de dades independent."
			}
		}
	},
	FORECAST_ETS: {
		description: "Retorna un valor futur basat en valors existents (històrics) utilitzant la versió AAA de l'algorisme de Suavització Exponencial (ETS)",
		abstract: "Retorna un valor futur basat en valors existents (històrics) utilitzant la versió AAA de l'algorisme de Suavització Exponencial (ETS)",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/forecast-ets-function"
		}],
		functionParameter: {
			targetDate: {
				name: "Data objectiu",
				detail: "El punt de dades per al qual voleu predir un valor."
			},
			values: {
				name: "Valors",
				detail: "Els valors històrics utilitzats per a la previsió."
			},
			timeline: {
				name: "Cronologia",
				detail: "Un interval o una matriu independent de dates o hores numèriques amb un pas constant."
			},
			seasonality: {
				name: "Estacionalitat",
				detail: "Opcional. Longitud estacional; 1 per a detecció automàtica i 0 sense estacionalitat."
			},
			dataCompletion: {
				name: "Compleció de dades",
				detail: "Opcional. Feu servir 1 per interpolar els punts que falten o 0 per tractar-los com a zero."
			},
			aggregation: {
				name: "Agregació",
				detail: "Opcional. Un valor de l’1 al 7 que especifica com agregar marques de temps duplicades."
			}
		}
	},
	FORECAST_ETS_CONFINT: {
		description: "Retorna un interval de confiança per al valor de pronòstic a la data objectiu especificada",
		abstract: "Retorna un interval de confiança per al valor de pronòstic a la data objectiu especificada",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/forecast-ets-confint-function"
		}],
		functionParameter: {
			targetDate: {
				name: "Data objectiu",
				detail: "El punt de dades per al qual voleu predir un valor."
			},
			values: {
				name: "Valors",
				detail: "Els valors històrics utilitzats per a la previsió."
			},
			timeline: {
				name: "Cronologia",
				detail: "Un interval o una matriu independent de dates o hores numèriques amb un pas constant."
			},
			confidenceLevel: {
				name: "Nivell de confiança",
				detail: "Opcional. Un nombre entre 0 i 1; el valor per defecte és 0,95."
			},
			seasonality: {
				name: "Estacionalitat",
				detail: "Opcional. Longitud estacional; 1 per a detecció automàtica i 0 sense estacionalitat."
			},
			dataCompletion: {
				name: "Compleció de dades",
				detail: "Opcional. Feu servir 1 per interpolar els punts que falten o 0 per tractar-los com a zero."
			},
			aggregation: {
				name: "Agregació",
				detail: "Opcional. Un valor de l’1 al 7 que especifica com agregar marques de temps duplicades."
			}
		}
	},
	FORECAST_ETS_SEASONALITY: {
		description: "Retorna la longitud del patró repetitiu que l'Excel detecta per a la sèrie temporal especificada",
		abstract: "Retorna la longitud del patró repetitiu que l'Excel detecta per a la sèrie temporal especificada",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/forecast-ets-seasonality-function"
		}],
		functionParameter: {
			values: {
				name: "Valors",
				detail: "Els valors històrics utilitzats per a la previsió."
			},
			timeline: {
				name: "Cronologia",
				detail: "Un interval o una matriu independent de dates o hores numèriques amb un pas constant."
			},
			dataCompletion: {
				name: "Compleció de dades",
				detail: "Opcional. Feu servir 1 per interpolar els punts que falten o 0 per tractar-los com a zero."
			},
			aggregation: {
				name: "Agregació",
				detail: "Opcional. Un valor de l’1 al 7 que especifica com agregar marques de temps duplicades."
			}
		}
	},
	FORECAST_ETS_STAT: {
		description: "Retorna un valor estadístic com a resultat de la previsió de sèries temporals",
		abstract: "Retorna un valor estadístic com a resultat de la previsió de sèries temporals",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/forecast-ets-stat-function"
		}],
		functionParameter: {
			values: {
				name: "Valors",
				detail: "Els valors històrics utilitzats per a la previsió."
			},
			timeline: {
				name: "Cronologia",
				detail: "Un interval o una matriu independent de dates o hores numèriques amb un pas constant."
			},
			statisticType: {
				name: "Tipus d’estadística",
				detail: "Un valor de l’1 al 8 que especifica l’estadística de previsió que cal retornar."
			},
			seasonality: {
				name: "Estacionalitat",
				detail: "Opcional. Longitud estacional; 1 per a detecció automàtica i 0 sense estacionalitat."
			},
			dataCompletion: {
				name: "Compleció de dades",
				detail: "Opcional. Feu servir 1 per interpolar els punts que falten o 0 per tractar-los com a zero."
			},
			aggregation: {
				name: "Agregació",
				detail: "Opcional. Un valor de l’1 al 7 que especifica com agregar marques de temps duplicades."
			}
		}
	},
	FORECAST_LINEAR: {
		description: "Retorna un valor futur basat en valors existents",
		abstract: "Retorna un valor futur basat en valors existents",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/forecast-and-forecast-linear-functions"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El punt de dades per al qual voleu predir un valor."
			},
			knownYs: {
				name: "conegut_y",
				detail: "La matriu o rang de dades dependent."
			},
			knownXs: {
				name: "conegut_x",
				detail: "La matriu o rang de dades independent."
			}
		}
	},
	FREQUENCY: {
		description: "Retorna una distribució de freqüència com una matriu vertical",
		abstract: "Retorna una distribució de freqüència com una matriu vertical",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/frequency-function"
		}],
		functionParameter: {
			dataArray: {
				name: "matriu_dades",
				detail: "Una matriu o referència a un conjunt de valors per als quals voleu comptar freqüències. Si matriu_dades no conté valors, FREQÜÈNCIA retorna una matriu de zeros."
			},
			binsArray: {
				name: "matriu_bins",
				detail: "Una matriu o referència a intervals en els quals voleu agrupar els valors de matriu_dades. Si matriu_bins no conté valors, FREQÜÈNCIA retorna el nombre d'elements a matriu_dades."
			}
		}
	},
	GAMMA: {
		description: "Retorna el valor de la funció Gamma",
		abstract: "Retorna el valor de la funció Gamma",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/gamma-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "Valor d'entrada a la funció gamma."
		} }
	},
	GAMMA_DIST: {
		description: "Retorna la distribució gamma",
		abstract: "Retorna la distribució gamma",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/gamma-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor per al qual voleu la distribució."
			},
			alpha: {
				name: "alfa",
				detail: "Un paràmetre de la distribució."
			},
			beta: {
				name: "beta",
				detail: "Un paràmetre de la distribució."
			},
			cumulative: {
				name: "acumulatiu",
				detail: "Un valor lògic que determina la forma de la funció. Si és CERT, DIST.GAMMA retorna la funció de distribució acumulada; si és FALS, retorna la funció de densitat de probabilitat."
			}
		}
	},
	GAMMA_INV: {
		description: "Retorna la inversa de la distribució gamma acumulada",
		abstract: "Retorna la inversa de la distribució gamma acumulada",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/gamma-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probabilitat",
				detail: "Una probabilitat associada amb la distribució gamma."
			},
			alpha: {
				name: "alfa",
				detail: "Un paràmetre de la distribució."
			},
			beta: {
				name: "beta",
				detail: "Un paràmetre de la distribució."
			}
		}
	},
	GAMMALN: {
		description: "Retorna el logaritme natural de la funció gamma, Γ(x)",
		abstract: "Retorna el logaritme natural de la funció gamma, Γ(x)",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/gammaln-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "El valor pel qual voleu calcular GAMMALN."
		} }
	},
	GAMMALN_PRECISE: {
		description: "Retorna el logaritme natural de la funció gamma, Γ(x)",
		abstract: "Retorna el logaritme natural de la funció gamma, Γ(x)",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/gammaln-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "El valor pel qual voleu calcular GAMMALN.PRECÍS."
		} }
	},
	GAUSS: {
		description: "Retorna 0,5 menys que la distribució normal acumulada estàndard",
		abstract: "Retorna 0,5 menys que la distribució normal acumulada estàndard",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/gauss-function"
		}],
		functionParameter: { z: {
			name: "z",
			detail: "El valor per al qual voleu la distribució."
		} }
	},
	GEOMEAN: {
		description: "Retorna la mitjana geomètrica",
		abstract: "Retorna la mitjana geomètrica",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/geomean-function"
		}],
		functionParameter: {
			number1: {
				name: "nombre1",
				detail: "El primer nombre, referència de cel·la o rang del qual voleu la mitjana geomètrica."
			},
			number2: {
				name: "nombre2",
				detail: "Nombres addicionals, referències de cel·la o rangs dels quals voleu la mitjana geomètrica, fins a un màxim de 255."
			}
		}
	},
	GROWTH: {
		description: "Retorna valors al llarg d'una tendència exponencial",
		abstract: "Retorna valors al llarg d'una tendència exponencial",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/growth-function"
		}],
		functionParameter: {
			knownYs: {
				name: "conegut_y",
				detail: "El conjunt de valors y que ja coneixeu a la relació y = b*m^x."
			},
			knownXs: {
				name: "conegut_x",
				detail: "El conjunt de valors x que ja coneixeu a la relació y = b*m^x."
			},
			newXs: {
				name: "nou_x",
				detail: "Són nous valors x per als quals voleu que CREIXEMENT retorni els valors y corresponents."
			},
			constb: {
				name: "constant",
				detail: "Un valor lògic que especifica si s'ha de forçar que la constant b sigui igual a 1."
			}
		}
	},
	HARMEAN: {
		description: "Retorna la mitjana harmònica",
		abstract: "Retorna la mitjana harmònica",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/harmean-function"
		}],
		functionParameter: {
			number1: {
				name: "nombre1",
				detail: "El primer nombre, referència de cel·la o rang del qual voleu la mitjana harmònica."
			},
			number2: {
				name: "nombre2",
				detail: "Nombres addicionals, referències de cel·la o rangs dels quals voleu la mitjana harmònica, fins a un màxim de 255."
			}
		}
	},
	HYPGEOM_DIST: {
		description: "Retorna la distribució hipergeomètrica",
		abstract: "Retorna la distribució hipergeomètrica",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/hypgeom-dist-function"
		}],
		functionParameter: {
			sampleS: {
				name: "mostra_èxit",
				detail: "El nombre d'èxits a la mostra."
			},
			numberSample: {
				name: "nombre_mostra",
				detail: "La mida de la mostra."
			},
			populationS: {
				name: "població_èxit",
				detail: "El nombre d'èxits a la població."
			},
			numberPop: {
				name: "nombre_població",
				detail: "La mida de la població."
			},
			cumulative: {
				name: "acumulatiu",
				detail: "Un valor lògic que determina la forma de la funció. Si és CERT, DIST.HIPERGEOM retorna la funció de distribució acumulada; si és FALS, retorna la funció de densitat de probabilitat."
			}
		}
	},
	INTERCEPT: {
		description: "Retorna la intercepció de la línia de regressió lineal",
		abstract: "Retorna la intercepció de la línia de regressió lineal",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/intercept-function"
		}],
		functionParameter: {
			knownYs: {
				name: "conegut_y",
				detail: "La matriu o rang de dades dependent."
			},
			knownXs: {
				name: "conegut_x",
				detail: "La matriu o rang de dades independent."
			}
		}
	},
	KURT: {
		description: "Retorna la curtosi d'un conjunt de dades",
		abstract: "Retorna la curtosi d'un conjunt de dades",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/kurt-function"
		}],
		functionParameter: {
			number1: {
				name: "nombre1",
				detail: "El primer nombre, referència de cel·la o rang del qual voleu la curtosi."
			},
			number2: {
				name: "nombre2",
				detail: "Nombres addicionals, referències de cel·la o rangs dels quals voleu la curtosi, fins a un màxim de 255."
			}
		}
	},
	LARGE: {
		description: "Retorna el k-èssim valor més gran d'un conjunt de dades",
		abstract: "Retorna el k-èssim valor més gran d'un conjunt de dades",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/large-function"
		}],
		functionParameter: {
			array: {
				name: "matriu",
				detail: "La matriu o rang de dades per al qual voleu determinar el k-èssim valor més gran."
			},
			k: {
				name: "k",
				detail: "La posició (des del més gran) a la matriu o rang de cel·les de dades a retornar."
			}
		}
	},
	LINEST: {
		description: "Retorna els paràmetres d'una tendència lineal",
		abstract: "Retorna els paràmetres d'una tendència lineal",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/linest-function"
		}],
		functionParameter: {
			knownYs: {
				name: "conegut_y",
				detail: "El conjunt de valors y que ja coneixeu a la relació y = m*x+b."
			},
			knownXs: {
				name: "conegut_x",
				detail: "El conjunt de valors x que ja coneixeu a la relació y = m*x+b."
			},
			constb: {
				name: "constant",
				detail: "Un valor lògic que especifica si s'ha de forçar que la constant b sigui igual a 0."
			},
			stats: {
				name: "estadístiques",
				detail: "Un valor lògic que especifica si s'han de retornar estadístiques de regressió addicionals."
			}
		}
	},
	LOGEST: {
		description: "Retorna els paràmetres d'una tendència exponencial",
		abstract: "Retorna els paràmetres d'una tendència exponencial",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/logest-function"
		}],
		functionParameter: {
			knownYs: {
				name: "conegut_y",
				detail: "El conjunt de valors y que ja coneixeu a la relació y = b*m^x."
			},
			knownXs: {
				name: "conegut_x",
				detail: "El conjunt de valors x que ja coneixeu a la relació y = b*m^x."
			},
			constb: {
				name: "constant",
				detail: "Un valor lògic que especifica si s'ha de forçar que la constant b sigui igual a 1."
			},
			stats: {
				name: "estadístiques",
				detail: "Un valor lògic que especifica si s'han de retornar estadístiques de regressió addicionals."
			}
		}
	},
	LOGNORM_DIST: {
		description: "Retorna la distribució logarítmica normal acumulada",
		abstract: "Retorna la distribució logarítmica normal acumulada",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/lognorm-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor per al qual voleu la distribució."
			},
			mean: {
				name: "mitjana",
				detail: "La mitjana aritmètica de la distribució."
			},
			standardDev: {
				name: "desv_estàndard",
				detail: "La desviació estàndard de la distribució."
			},
			cumulative: {
				name: "acumulatiu",
				detail: "Un valor lògic que determina la forma de la funció. Si és CERT, DIST.LOGNORM retorna la funció de distribució acumulada; si és FALS, retorna la funció de densitat de probabilitat."
			}
		}
	},
	LOGNORM_INV: {
		description: "Retorna la inversa de la distribució logarítmica normal acumulada",
		abstract: "Retorna la inversa de la distribució logarítmica normal acumulada",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/lognorm-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probabilitat",
				detail: "Una probabilitat corresponent a la distribució logarítmica normal."
			},
			mean: {
				name: "mitjana",
				detail: "La mitjana aritmètica de la distribució."
			},
			standardDev: {
				name: "desv_estàndard",
				detail: "La desviació estàndard de la distribució."
			}
		}
	},
	MARGINOFERROR: {
		description: "Aquesta funció calcula el marge d'error a partir d'un interval de valors i d'un nivell de confiança.",
		abstract: "Aquesta funció calcula el marge d'error a partir d'un interval de valors i d'un nivell de confiança.",
		links: [{
			title: "Instruccions",
			url: "https://support.google.com/docs/answer/12487850?hl=ca"
		}],
		functionParameter: {
			range: {
				name: "rang",
				detail: "MARGINOFERROR(A1:C3; 0,99)"
			},
			confidence: {
				name: "confiança",
				detail: "El nivell de confiança desitjat entre (0, 1)."
			}
		}
	},
	MAX: {
		description: "Retorna el valor més gran d'un conjunt de valors.",
		abstract: "Retorna el valor màxim en una llista d'arguments",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/max-function"
		}],
		functionParameter: {
			number1: {
				name: "nombre1",
				detail: "El primer nombre, referència de cel·la o rang del qual calcular el valor màxim."
			},
			number2: {
				name: "nombre2",
				detail: "Nombres addicionals, referències de cel·la o rangs dels quals calcular el valor màxim, fins a un màxim de 255."
			}
		}
	},
	MAXA: {
		description: "Retorna el valor màxim en una llista d'arguments, incloent-hi nombres, text i valors lògics.",
		abstract: "Retorna el valor màxim en una llista d'arguments, incloent-hi nombres, text i valors lògics",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/maxa-function"
		}],
		functionParameter: {
			value1: {
				name: "valor1",
				detail: "El primer argument numèric pel qual voleu trobar el valor més gran."
			},
			value2: {
				name: "valor2",
				detail: "Arguments numèrics de 2 a 255 pels quals voleu trobar el valor més gran."
			}
		}
	},
	MAXIFS: {
		description: "Retorna el valor màxim entre les cel·les especificades per un conjunt donat de condicions o criteris.",
		abstract: "Retorna el valor màxim entre les cel·les especificades per un conjunt donat de condicions o criteris",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/maxifs-function"
		}],
		functionParameter: {
			maxRange: {
				name: "rang_max",
				detail: "El rang de cel·les a maximitzar."
			},
			criteriaRange1: {
				name: "rang_criteris1",
				detail: "És el conjunt de cel·les a avaluar amb el criteri."
			},
			criteria1: {
				name: "criteri1",
				detail: "És el criteri en forma de nombre, expressió o text que defineix quines cel·les s'avaluaran com a màxim."
			},
			criteriaRange2: {
				name: "rang_criteris2",
				detail: "Rangs addicionals. Podeu introduir fins a 127 rangs."
			},
			criteria2: {
				name: "criteri2",
				detail: "Criteris addicionals associats. Podeu introduir fins a 127 criteris."
			}
		}
	},
	MEDIAN: {
		description: "Retorna la mediana dels nombres donats",
		abstract: "Retorna la mediana dels nombres donats",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/median-function"
		}],
		functionParameter: {
			number1: {
				name: "nombre1",
				detail: "El primer nombre, referència de cel·la o rang pel qual voleu els nombres donats."
			},
			number2: {
				name: "nombre2",
				detail: "Nombres addicionals, referències de cel·la o rangs pels quals voleu els nombres donats, fins a un màxim de 255."
			}
		}
	},
	MIN: {
		description: "Retorna el nombre més petit d'un conjunt de valors.",
		abstract: "Retorna el valor mínim en una llista d'arguments",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/min-function"
		}],
		functionParameter: {
			number1: {
				name: "nombre1",
				detail: "El primer nombre, referència de cel·la o rang del qual calcular el valor mínim."
			},
			number2: {
				name: "nombre2",
				detail: "Nombres addicionals, referències de cel·la o rangs dels quals calcular el valor mínim, fins a un màxim de 255."
			}
		}
	},
	MINA: {
		description: "Retorna el valor més petit en una llista d'arguments, incloent-hi nombres, text i valors lògics",
		abstract: "Retorna el valor més petit en una llista d'arguments, incloent-hi nombres, text i valors lògics",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/mina-function"
		}],
		functionParameter: {
			value1: {
				name: "valor1",
				detail: "El primer nombre, referència de cel·la o rang del qual calcular el valor mínim."
			},
			value2: {
				name: "valor2",
				detail: "Nombres addicionals, referències de cel·la o rangs dels quals calcular el valor mínim, fins a un màxim de 255."
			}
		}
	},
	MINIFS: {
		description: "Retorna el valor mínim entre les cel·les especificades per un conjunt donat de condicions o criteris.",
		abstract: "Retorna el valor mínim entre les cel·les especificades per un conjunt donat de condicions o criteris",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/minifs-function"
		}],
		functionParameter: {
			minRange: {
				name: "rang_min",
				detail: "El rang real de cel·les en què es determinarà el valor mínim."
			},
			criteriaRange1: {
				name: "rang_criteris1",
				detail: "És el conjunt de cel·les a avaluar amb el criteri."
			},
			criteria1: {
				name: "criteri1",
				detail: "És el criteri en forma de nombre, expressió o text que defineix quines cel·les s'avaluaran com a mínim. El mateix conjunt de criteris funciona per a les funcions MAXIFS, SUMIFS i AVERAGEIFS."
			},
			criteriaRange2: {
				name: "rang_criteris2",
				detail: "Rangs addicionals. Podeu introduir fins a 127 rangs."
			},
			criteria2: {
				name: "criteri2",
				detail: "Criteris addicionals associats. Podeu introduir fins a 127 criteris."
			}
		}
	},
	MODE_MULT: {
		description: "Retorna una matriu vertical dels valors més freqüents o repetitius en una matriu o rang de dades",
		abstract: "Retorna una matriu vertical dels valors més freqüents o repetitius en una matriu o rang de dades",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/mode-mult-function"
		}],
		functionParameter: {
			number1: {
				name: "nombre1",
				detail: "El primer nombre, referència de cel·la o rang pel qual voleu calcular la moda."
			},
			number2: {
				name: "nombre2",
				detail: "Nombres addicionals, referències de cel·la o rangs pels quals voleu calcular la moda, fins a un màxim de 255."
			}
		}
	},
	MODE_SNGL: {
		description: "Retorna el valor més comú en un conjunt de dades",
		abstract: "Retorna el valor més comú en un conjunt de dades",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/mode-sngl-function"
		}],
		functionParameter: {
			number1: {
				name: "nombre1",
				detail: "El primer nombre, referència de cel·la o rang pel qual voleu calcular la moda."
			},
			number2: {
				name: "nombre2",
				detail: "Nombres addicionals, referències de cel·la o rangs pels quals voleu calcular la moda, fins a un màxim de 255."
			}
		}
	},
	NEGBINOM_DIST: {
		description: "Retorna la distribució binomial negativa",
		abstract: "Retorna la distribució binomial negativa",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/negbinom-dist-function"
		}],
		functionParameter: {
			numberF: {
				name: "nombre_fracassos",
				detail: "El nombre de fracassos."
			},
			numberS: {
				name: "nombre_èxits",
				detail: "El nombre llindar d'èxits."
			},
			probabilityS: {
				name: "prob_èxit",
				detail: "La probabilitat d'un èxit."
			},
			cumulative: {
				name: "acumulatiu",
				detail: "Un valor lògic que determina la forma de la funció. Si és CERT, DIST.NEGBINOM retorna la funció de distribució acumulada; si és FALS, retorna la funció de densitat de probabilitat."
			}
		}
	},
	NORM_DIST: {
		description: "Retorna la distribució normal acumulada",
		abstract: "Retorna la distribució normal acumulada",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/norm-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor per al qual voleu la distribució."
			},
			mean: {
				name: "mitjana",
				detail: "La mitjana aritmètica de la distribució."
			},
			standardDev: {
				name: "desv_estàndard",
				detail: "La desviació estàndard de la distribució."
			},
			cumulative: {
				name: "acumulatiu",
				detail: "Un valor lògic que determina la forma de la funció. Si és CERT, DIST.NORM retorna la funció de distribució acumulada; si és FALS, retorna la funció de densitat de probabilitat."
			}
		}
	},
	NORM_INV: {
		description: "Retorna la inversa de la distribució normal acumulada",
		abstract: "Retorna la inversa de la distribució normal acumulada",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/norm-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probabilitat",
				detail: "Una probabilitat corresponent a la distribució normal."
			},
			mean: {
				name: "mitjana",
				detail: "La mitjana aritmètica de la distribució."
			},
			standardDev: {
				name: "desv_estàndard",
				detail: "La desviació estàndard de la distribució."
			}
		}
	},
	NORM_S_DIST: {
		description: "Retorna la distribució normal estàndard acumulada",
		abstract: "Retorna la distribució normal estàndard acumulada",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/norm-s-dist-function"
		}],
		functionParameter: {
			z: {
				name: "z",
				detail: "El valor per al qual voleu la distribució."
			},
			cumulative: {
				name: "acumulatiu",
				detail: "Un valor lògic que determina la forma de la funció. Si és CERT, DIST.NORM.S retorna la funció de distribució acumulada; si és FALS, retorna la funció de densitat de probabilitat."
			}
		}
	},
	NORM_S_INV: {
		description: "Retorna la inversa de la distribució normal estàndard acumulada",
		abstract: "Retorna la inversa de la distribució normal estàndard acumulada",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/norm-s-inv-function"
		}],
		functionParameter: { probability: {
			name: "probabilitat",
			detail: "Una probabilitat corresponent a la distribució normal."
		} }
	},
	PEARSON: {
		description: "Retorna el coeficient de correlació del producte-moment de Pearson",
		abstract: "Retorna el coeficient de correlació del producte-moment de Pearson",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/pearson-function"
		}],
		functionParameter: {
			array1: {
				name: "matriu1",
				detail: "La matriu o rang de dades dependent."
			},
			array2: {
				name: "matriu2",
				detail: "La matriu o rang de dades independent."
			}
		}
	},
	PERCENTILE_EXC: {
		description: "Retorna el k-èssim percentil dels valors d'un conjunt de dades (exclou 0 i 1).",
		abstract: "Retorna el k-èssim percentil dels valors d'un conjunt de dades (exclou 0 i 1).",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/percentile-exc-function"
		}],
		functionParameter: {
			array: {
				name: "matriu",
				detail: "La matriu o rang de dades que defineix la posició relativa."
			},
			k: {
				name: "k",
				detail: "El valor del percentil en el rang 0 i 1 (exclou 0 i 1)."
			}
		}
	},
	PERCENTILE_INC: {
		description: "Retorna el k-èssim percentil dels valors d'un conjunt de dades (inclou 0 i 1)",
		abstract: "Retorna el k-èssim percentil dels valors d'un conjunt de dades (inclou 0 i 1)",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/percentile-inc-function"
		}],
		functionParameter: {
			array: {
				name: "matriu",
				detail: "La matriu o rang de dades que defineix la posició relativa."
			},
			k: {
				name: "k",
				detail: "El valor del percentil en el rang 0 i 1 (inclou 0 i 1)."
			}
		}
	},
	PERCENTRANK_EXC: {
		description: "Retorna el rang percentual d'un valor en un conjunt de dades (exclou 0 i 1)",
		abstract: "Retorna el rang percentual d'un valor en un conjunt de dades (exclou 0 i 1)",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/percentrank-exc-function"
		}],
		functionParameter: {
			array: {
				name: "matriu",
				detail: "La matriu o rang de dades que defineix la posició relativa."
			},
			x: {
				name: "x",
				detail: "El valor del qual voleu conèixer el rang."
			},
			significance: {
				name: "xifres_significatives",
				detail: "Un valor que identifica el nombre de dígits significatius per al valor de percentatge retornat. Si s'omet, RANG.PERCENTIL.EXC utilitza tres dígits (0,xxx)."
			}
		}
	},
	PERCENTRANK_INC: {
		description: "Retorna el rang percentual d'un valor en un conjunt de dades (inclou 0 i 1)",
		abstract: "Retorna el rang percentual d'un valor en un conjunt de dades (inclou 0 i 1)",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/percentrank-inc-function"
		}],
		functionParameter: {
			array: {
				name: "matriu",
				detail: "La matriu o rang de dades que defineix la posició relativa."
			},
			x: {
				name: "x",
				detail: "El valor del qual voleu conèixer el rang."
			},
			significance: {
				name: "xifres_significatives",
				detail: "Un valor que identifica el nombre de dígits significatius per al valor de percentatge retornat. Si s'omet, RANG.PERCENTIL.INC utilitza tres dígits (0,xxx)."
			}
		}
	},
	PERMUT: {
		description: "Retorna el nombre de permutacions per a un nombre donat d'objectes",
		abstract: "Retorna el nombre de permutacions per a un nombre donat d'objectes",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/permut-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El nombre d'elements."
			},
			numberChosen: {
				name: "nombre_escollit",
				detail: "El nombre d'elements en cada permutació."
			}
		}
	},
	PERMUTATIONA: {
		description: "Retorna el nombre de permutacions per a un nombre donat d'objectes (amb repeticions) que es poden seleccionar del total d'objectes",
		abstract: "Retorna el nombre de permutacions per a un nombre donat d'objectes (amb repeticions) que es poden seleccionar del total d'objectes",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/permutationa-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El nombre d'elements."
			},
			numberChosen: {
				name: "nombre_escollit",
				detail: "El nombre d'elements en cada permutació."
			}
		}
	},
	PHI: {
		description: "Retorna el valor de la funció de densitat per a una distribució normal estàndard",
		abstract: "Retorna el valor de la funció de densitat per a una distribució normal estàndard",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/phi-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "X és el nombre pel qual voleu la densitat de la distribució normal estàndard."
		} }
	},
	POISSON_DIST: {
		description: "Retorna la distribució de Poisson",
		abstract: "Retorna la distribució de Poisson",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/poisson-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor per al qual voleu la distribució."
			},
			mean: {
				name: "mitjana",
				detail: "La mitjana aritmètica de la distribució."
			},
			cumulative: {
				name: "acumulatiu",
				detail: "Un valor lògic que determina la forma de la funció. Si és CERT, POISSON.DIST retorna la funció de distribució acumulada; si és FALS, retorna la funció de densitat de probabilitat."
			}
		}
	},
	PROB: {
		description: "Retorna la probabilitat que els valors d'un rang estiguin entre dos límits",
		abstract: "Retorna la probabilitat que els valors d'un rang estiguin entre dos límits",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/prob-function"
		}],
		functionParameter: {
			xRange: {
				name: "rang_x",
				detail: "El rang de valors numèrics de x amb els quals hi ha probabilitats associades."
			},
			probRange: {
				name: "rang_prob",
				detail: "Un conjunt de probabilitats associades amb els valors a rang_x."
			},
			lowerLimit: {
				name: "límit_inferior",
				detail: "El límit inferior del valor per al qual voleu una probabilitat."
			},
			upperLimit: {
				name: "límit_superior",
				detail: "El límit superior del valor per al qual voleu una probabilitat."
			}
		}
	},
	QUARTILE_EXC: {
		description: "Retorna el quartil d'un conjunt de dades (exclou 0 i 1)",
		abstract: "Retorna el quartil d'un conjunt de dades (exclou 0 i 1)",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/quartile-exc-function"
		}],
		functionParameter: {
			array: {
				name: "matriu",
				detail: "La matriu o rang de dades per al qual voleu els valors de quartil."
			},
			quart: {
				name: "quartil",
				detail: "El valor de quartil a retornar."
			}
		}
	},
	QUARTILE_INC: {
		description: "Retorna el quartil d'un conjunt de dades (inclou 0 i 1)",
		abstract: "Retorna el quartil d'un conjunt de dades (inclou 0 i 1)",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/quartile-inc-function"
		}],
		functionParameter: {
			array: {
				name: "matriu",
				detail: "La matriu o rang de dades per al qual voleu els valors de quartil."
			},
			quart: {
				name: "quartil",
				detail: "El valor de quartil a retornar."
			}
		}
	},
	RANK_AVG: {
		description: "Retorna el rang d'un nombre en una llista de nombres",
		abstract: "Retorna el rang d'un nombre en una llista de nombres",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/rank-avg-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El nombre del qual voleu trobar el rang."
			},
			ref: {
				name: "ref",
				detail: "Una referència a una llista de nombres. Els valors no numèrics a ref s'ignoren."
			},
			order: {
				name: "ordre",
				detail: "Un nombre que especifica com classificar el nombre. Si l'ordre és 0 (zero) o s'omet, el Microsoft Excel classifica el nombre com si ref fos una llista ordenada en ordre descendent. Si l'ordre és qualsevol valor diferent de zero, el Microsoft Excel classifica el nombre com si ref fos una llista ordenada en ordre ascendent."
			}
		}
	},
	RANK_EQ: {
		description: "Retorna el rang d'un nombre en una llista de nombres",
		abstract: "Retorna el rang d'un nombre en una llista de nombres",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/rank-eq-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El nombre del qual voleu trobar el rang."
			},
			ref: {
				name: "ref",
				detail: "Una referència a una llista de nombres. Els valors no numèrics a ref s'ignoren."
			},
			order: {
				name: "ordre",
				detail: "Un nombre que especifica com classificar el nombre. Si l'ordre és 0 (zero) o s'omet, el Microsoft Excel classifica el nombre com si ref fos una llista ordenada en ordre descendent. Si l'ordre és qualsevol valor diferent de zero, el Microsoft Excel classifica el nombre com si ref fos una llista ordenada en ordre ascendent."
			}
		}
	},
	RSQ: {
		description: "Retorna el quadrat del coeficient de correlació del producte-moment de Pearson",
		abstract: "Retorna el quadrat del coeficient de correlació del producte-moment de Pearson",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/rsq-function"
		}],
		functionParameter: {
			knownYs: {
				name: "conegut_y",
				detail: "La matriu o rang de dades dependent."
			},
			knownXs: {
				name: "conegut_x",
				detail: "La matriu o rang de dades independent."
			}
		}
	},
	SKEW: {
		description: "Retorna la biaix d'una distribució",
		abstract: "Retorna la biaix d'una distribució",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/skew-function"
		}],
		functionParameter: {
			number1: {
				name: "nombre1",
				detail: "El primer nombre, referència de cel·la o rang del qual voleu la biaix."
			},
			number2: {
				name: "nombre2",
				detail: "Nombres addicionals, referències de cel·la o rangs dels quals voleu la biaix, fins a un màxim de 255."
			}
		}
	},
	SKEW_P: {
		description: "Retorna la biaix d'una distribució basada en una població",
		abstract: "Retorna la biaix d'una distribució basada en una població",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/skew-p-function"
		}],
		functionParameter: {
			number1: {
				name: "nombre1",
				detail: "El primer nombre, referència de cel·la o rang del qual voleu la biaix."
			},
			number2: {
				name: "nombre2",
				detail: "Nombres addicionals, referències de cel·la o rangs dels quals voleu la biaix, fins a un màxim de 255."
			}
		}
	},
	SLOPE: {
		description: "Retorna el pendent de la línia de regressió lineal",
		abstract: "Retorna el pendent de la línia de regressió lineal",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/slope-function"
		}],
		functionParameter: {
			knownYs: {
				name: "conegut_y",
				detail: "La matriu o rang de dades dependent."
			},
			knownXs: {
				name: "conegut_x",
				detail: "La matriu o rang de dades independent."
			}
		}
	},
	SMALL: {
		description: "Retorna el k-èssim valor més petit d'un conjunt de dades",
		abstract: "Retorna el k-èssim valor més petit d'un conjunt de dades",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/small-function"
		}],
		functionParameter: {
			array: {
				name: "matriu",
				detail: "La matriu o rang de dades per al qual voleu determinar el k-èssim valor més petit."
			},
			k: {
				name: "k",
				detail: "La posició (des del més petit) a la matriu o rang de cel·les de dades a retornar."
			}
		}
	},
	STANDARDIZE: {
		description: "Retorna un valor normalitzat",
		abstract: "Retorna un valor normalitzat",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/standardize-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor que voleu normalitzar."
			},
			mean: {
				name: "mitjana",
				detail: "La mitjana aritmètica de la distribució."
			},
			standardDev: {
				name: "desv_estàndard",
				detail: "La desviació estàndard de la distribució."
			}
		}
	},
	STDEV_P: {
		description: "Calcula la desviació estàndard basada en tota la població donada com a arguments (ignora valors lògics i text).",
		abstract: "Calcula la desviació estàndard basada en tota la població",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/stdev-p-function"
		}],
		functionParameter: {
			number1: {
				name: "nombre1",
				detail: "El primer argument numèric corresponent a una població."
			},
			number2: {
				name: "nombre2",
				detail: "Arguments numèrics de 2 a 254 corresponents a una població. També podeu utilitzar una única matriu o una referència a una matriu en lloc d'arguments separats per comes."
			}
		}
	},
	STDEV_S: {
		description: "Estima la desviació estàndard basada en una mostra (ignora valors lògics i text a la mostra).",
		abstract: "Estima la desviació estàndard basada en una mostra",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/stdev-s-function"
		}],
		functionParameter: {
			number1: {
				name: "nombre1",
				detail: "El primer argument numèric corresponent a una mostra d'una població. També podeu utilitzar una única matriu o una referència a una matriu en lloc d'arguments separats per comes."
			},
			number2: {
				name: "nombre2",
				detail: "Arguments numèrics de 2 a 254 corresponents a una mostra d'una població. També podeu utilitzar una única matriu o una referència a una matriu en lloc d'arguments separats per comes."
			}
		}
	},
	STDEVA: {
		description: "Estima la desviació estàndard basada en una mostra, incloent-hi nombres, text i valors lògics.",
		abstract: "Estima la desviació estàndard basada en una mostra, incloent-hi nombres, text i valors lògics",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/stdeva-function"
		}],
		functionParameter: {
			value1: {
				name: "valor1",
				detail: "El primer argument de valor corresponent a una mostra d'una població. També podeu utilitzar una única matriu o una referència a una matriu en lloc d'arguments separats per comes."
			},
			value2: {
				name: "valor2",
				detail: "Arguments de valor de 2 a 254 corresponents a una mostra d'una població. També podeu utilitzar una única matriu o una referència a una matriu en lloc d'arguments separats per comes."
			}
		}
	},
	STDEVPA: {
		description: "Calcula la desviació estàndard basada en tota la població donada com a arguments, incloent-hi text i valors lògics.",
		abstract: "Calcula la desviació estàndard basada en tota la població, incloent-hi nombres, text i valors lògics",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/stdevpa-function"
		}],
		functionParameter: {
			value1: {
				name: "valor1",
				detail: "El primer argument de valor corresponent a una població."
			},
			value2: {
				name: "valor2",
				detail: "Arguments de valor de 2 a 254 corresponents a una població. També podeu utilitzar una única matriu o una referència a una matriu en lloc d'arguments separats per comes."
			}
		}
	},
	STEYX: {
		description: "Retorna l'error estàndard del valor y predit per a cada x a la regressió",
		abstract: "Retorna l'error estàndard del valor y predit per a cada x a la regressió",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/steyx-function"
		}],
		functionParameter: {
			knownYs: {
				name: "conegut_y",
				detail: "La matriu o rang de dades dependent."
			},
			knownXs: {
				name: "conegut_x",
				detail: "La matriu o rang de dades independent."
			}
		}
	},
	T_DIST: {
		description: "Retorna la probabilitat per a la distribució t de Student",
		abstract: "Retorna la probabilitat per a la distribució t de Student",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/t-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor numèric en què avaluar la distribució"
			},
			degFreedom: {
				name: "graus_llibertat",
				detail: "Un enter que indica el nombre de graus de llibertat."
			},
			cumulative: {
				name: "acumulatiu",
				detail: "Un valor lògic que determina la forma de la funció. Si és CERT, DIST.T retorna la funció de distribució acumulada; si és FALS, retorna la funció de densitat de probabilitat."
			}
		}
	},
	T_DIST_2T: {
		description: "Retorna la probabilitat per a la distribució t de Student (dues cues)",
		abstract: "Retorna la probabilitat per a la distribució t de Student (dues cues)",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/t-dist-2t-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor numèric en què avaluar la distribució"
			},
			degFreedom: {
				name: "graus_llibertat",
				detail: "Un enter que indica el nombre de graus de llibertat."
			}
		}
	},
	T_DIST_RT: {
		description: "Retorna la probabilitat per a la distribució t de Student (cua dreta)",
		abstract: "Retorna la probabilitat per a la distribució t de Student (cua dreta)",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/t-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor numèric en què avaluar la distribució"
			},
			degFreedom: {
				name: "graus_llibertat",
				detail: "Un enter que indica el nombre de graus de llibertat."
			}
		}
	},
	T_INV: {
		description: "Retorna la inversa de la probabilitat per a la distribució t de Student",
		abstract: "Retorna la inversa de la probabilitat per a la distribució t de Student",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/t-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probabilitat",
				detail: "La probabilitat associada amb la distribució t de Student."
			},
			degFreedom: {
				name: "graus_llibertat",
				detail: "Un enter que indica el nombre de graus de llibertat."
			}
		}
	},
	T_INV_2T: {
		description: "Retorna la inversa de la probabilitat per a la distribució t de Student (dues cues)",
		abstract: "Retorna la inversa de la probabilitat per a la distribució t de Student (dues cues)",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/t-inv-2t-function"
		}],
		functionParameter: {
			probability: {
				name: "probabilitat",
				detail: "La probabilitat associada amb la distribució t de Student."
			},
			degFreedom: {
				name: "graus_llibertat",
				detail: "Un enter que indica el nombre de graus de llibertat."
			}
		}
	},
	T_TEST: {
		description: "Retorna la probabilitat associada amb una prova t de Student",
		abstract: "Retorna la probabilitat associada amb una prova t de Student",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/t-test-function"
		}],
		functionParameter: {
			array1: {
				name: "matriu1",
				detail: "La primera matriu o rang de dades."
			},
			array2: {
				name: "matriu2",
				detail: "La segona matriu o rang de dades."
			},
			tails: {
				name: "cues",
				detail: "Especifica el nombre de cues de distribució. Si cues = 1, PROVA.T utilitza la distribució d'una cua. Si cues = 2, PROVA.T utilitza la distribució de dues cues."
			},
			type: {
				name: "tipus",
				detail: "El tipus de prova t a realitzar."
			}
		}
	},
	TREND: {
		description: "Retorna valors al llarg d'una tendència lineal",
		abstract: "Retorna valors al llarg d'una tendència lineal",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/trend-function"
		}],
		functionParameter: {
			knownYs: {
				name: "conegut_y",
				detail: "El conjunt de valors y que ja coneixeu a la relació y = m*x+b."
			},
			knownXs: {
				name: "conegut_x",
				detail: "El conjunt de valors x que ja coneixeu a la relació y = m*x+b."
			},
			newXs: {
				name: "nou_x",
				detail: "Són nous valors x per als quals voleu que TENDÈNCIA retorni els valors y corresponents."
			},
			constb: {
				name: "constant",
				detail: "Un valor lògic que especifica si s'ha de forçar que la constant b sigui igual a 0."
			}
		}
	},
	TRIMMEAN: {
		description: "Retorna la mitjana de l'interior d'un conjunt de dades",
		abstract: "Retorna la mitjana de l'interior d'un conjunt de dades",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/trimmean-function"
		}],
		functionParameter: {
			array: {
				name: "matriu",
				detail: "La matriu o rang de valors a retallar i fer la mitjana."
			},
			percent: {
				name: "percentatge",
				detail: "El nombre fraccionari de punts de dades a excloure del càlcul."
			}
		}
	},
	VAR_P: {
		description: "Calcula la variància basada en tota la població (ignora valors lògics i text a la població).",
		abstract: "Calcula la variància basada en tota la població",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/var-p-function"
		}],
		functionParameter: {
			number1: {
				name: "nombre1",
				detail: "El primer argument numèric corresponent a una població."
			},
			number2: {
				name: "nombre2",
				detail: "Arguments numèrics de 2 a 254 corresponents a una població."
			}
		}
	},
	VAR_S: {
		description: "Estima la variància basada en una mostra (ignora valors lògics i text a la mostra).",
		abstract: "Estima la variància basada en una mostra",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/var-s-function"
		}],
		functionParameter: {
			number1: {
				name: "nombre1",
				detail: "El primer argument numèric corresponent a una mostra d'una població."
			},
			number2: {
				name: "nombre2",
				detail: "Arguments numèrics de 2 a 254 corresponents a una mostra d'una població."
			}
		}
	},
	VARA: {
		description: "Estima la variància basada en una mostra, incloent-hi nombres, text i valors lògics",
		abstract: "Estima la variància basada en una mostra, incloent-hi nombres, text i valors lògics",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/vara-function"
		}],
		functionParameter: {
			value1: {
				name: "valor1",
				detail: "El primer argument de valor corresponent a una mostra d'una població."
			},
			value2: {
				name: "valor2",
				detail: "Arguments de valor de 2 a 254 corresponents a una mostra d'una població."
			}
		}
	},
	VARPA: {
		description: "Calcula la variància basada en tota la població, incloent-hi nombres, text i valors lògics",
		abstract: "Calcula la variància basada en tota la població, incloent-hi nombres, text i valors lògics",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/varpa-function"
		}],
		functionParameter: {
			value1: {
				name: "valor1",
				detail: "El primer argument de valor corresponent a una població."
			},
			value2: {
				name: "valor2",
				detail: "Arguments de valor de 2 a 254 corresponents a una població."
			}
		}
	},
	WEIBULL_DIST: {
		description: "Retorna la distribució de Weibull",
		abstract: "Retorna la distribució de Weibull",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/weibull-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor per al qual voleu la distribució."
			},
			alpha: {
				name: "alfa",
				detail: "Un paràmetre de la distribució."
			},
			beta: {
				name: "beta",
				detail: "Un paràmetre de la distribució."
			},
			cumulative: {
				name: "acumulatiu",
				detail: "Un valor lògic que determina la forma de la funció. Si és CERT, WEIBULL.DIST retorna la funció de distribució acumulada; si és FALS, retorna la funció de densitat de probabilitat."
			}
		}
	},
	Z_TEST: {
		description: "Retorna el valor de probabilitat d'una cua d'una prova z",
		abstract: "Retorna el valor de probabilitat d'una cua d'una prova z",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/z-test-function"
		}],
		functionParameter: {
			array: {
				name: "matriu",
				detail: "La matriu o rang de dades contra el qual provar x."
			},
			x: {
				name: "x",
				detail: "El valor a provar."
			},
			sigma: {
				name: "sigma",
				detail: "La desviació estàndard de la població (coneguda). Si s'omet, s'utilitza la desviació estàndard de la mostra."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/text/ca-ES.ts
const locale$3 = {
	ASC: {
		description: "Canvia les lletres angleses o katakana d'amplada completa (doble byte) dins d'una cadena de caràcters a caràcters d'amplada mitjana (un sol byte)",
		abstract: "Canvia les lletres angleses o katakana d'amplada completa (doble byte) dins d'una cadena de caràcters a caràcters d'amplada mitjana (un sol byte)",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/asc-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "El text o una referència a una cel·la que conté el text que voleu canviar. Si el text no conté cap lletra d'amplada completa, el text no es canvia."
		} }
	},
	ARRAYTOTEXT: {
		description: "Retorna una matriu de valors de text des de qualsevol rang especificat",
		abstract: "Retorna una matriu de valors de text des de qualsevol rang especificat",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/arraytotext-function"
		}],
		functionParameter: {
			array: {
				name: "matriu",
				detail: "La matriu a retornar com a text."
			},
			format: {
				name: "format",
				detail: "El format de les dades retornades. Pot ser un de dos valors: \n0 Predeterminat. Format concís i fàcil de llegir. \n1 Format estricte que inclou caràcters d'escapament i delimitadors de fila. Genera una cadena que es pot analitzar en introduir-la a la barra de fórmules. Encapsula les cadenes retornades entre cometes, excepte per a valors booleans, nombres i errors."
			}
		}
	},
	BAHTTEXT: {
		description: "Converteix un nombre a text, utilitzant el format de moneda ß (baht)",
		abstract: "Converteix un nombre a text, utilitzant el format de moneda ß (baht)",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/bahttext-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "Un nombre que voleu convertir a text, o una referència a una cel·la que conté un nombre, o una fórmula que avalua a un nombre."
		} }
	},
	CHAR: {
		description: "Retorna el caràcter especificat pel número de codi",
		abstract: "Retorna el caràcter especificat pel número de codi",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/char-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "Un nombre entre 1 i 255 que especifica quin caràcter voleu. El caràcter és del joc de caràcters utilitzat pel vostre ordinador."
		} }
	},
	CLEAN: {
		description: "Elimina tots els caràcters no imprimibles del text",
		abstract: "Elimina tots els caràcters no imprimibles del text",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/clean-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Qualsevol informació del full de càlcul de la qual voleu eliminar caràcters no imprimibles."
		} }
	},
	CODE: {
		description: "Retorna un codi numèric per al primer caràcter d'una cadena de text",
		abstract: "Retorna un codi numèric per al primer caràcter d'una cadena de text",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/code-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "El text del qual voleu el codi del primer caràcter."
		} }
	},
	CONCAT: {
		description: "Combina el text de múltiples rangs i/o cadenes, però no proporciona els arguments de delimitador o IgnoraBuits.",
		abstract: "Combina el text de múltiples rangs i/o cadenes, però no proporciona els arguments de delimitador o IgnoraBuits",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/concat-function"
		}],
		functionParameter: {
			text1: {
				name: "text1",
				detail: "Element de text a unir. Una cadena, o una matriu de cadenes, com un rang de cel·les."
			},
			text2: {
				name: "text2",
				detail: "Elements de text addicionals a unir. Pot haver-hi un màxim de 253 arguments de text per als elements de text. Cadascun pot ser una cadena, o una matriu de cadenes, com un rang de cel·les."
			}
		}
	},
	CONCATENATE: {
		description: "Uneix diversos elements de text en un de sol",
		abstract: "Uneix diversos elements de text en un de sol",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/concatenate-function"
		}],
		functionParameter: {
			text1: {
				name: "text1",
				detail: "El primer element a unir. L'element pot ser un valor de text, un nombre o una referència de cel·la."
			},
			text2: {
				name: "text2",
				detail: "Elements de text addicionals a unir. Podeu tenir fins a 255 elements, fins a un total de 8,192 caràcters."
			}
		}
	},
	DBCS: {
		description: "Canvia les lletres angleses o katakana d'amplada mitjana (un sol byte) dins d'una cadena de caràcters a caràcters d'amplada completa (doble byte)",
		abstract: "Canvia les lletres angleses o katakana d'amplada mitjana (un sol byte) dins d'una cadena de caràcters a caràcters d'amplada completa (doble byte)",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/dbcs-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "El text o una referència a una cel·la que conté el text que voleu canviar. Si el text no conté cap lletra anglesa d'amplada mitjana o katakana, el text no es canvia."
		} }
	},
	DOLLAR: {
		description: "Converteix un nombre a text utilitzant el format de moneda",
		abstract: "Converteix un nombre a text utilitzant el format de moneda",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/dollar-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "Un nombre, una referència a una cel·la que conté un nombre, o una fórmula que avalua a un nombre."
			},
			decimals: {
				name: "decimals",
				detail: "El nombre de dígits a la dreta del punt decimal. Si és negatiu, el nombre s'arrodoneix a l'esquerra del punt decimal. Si ometeu decimals, s'assumeix que són 2."
			}
		}
	},
	EXACT: {
		description: "Comprova si dos valors de text són idèntics",
		abstract: "Comprova si dos valors de text són idèntics",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/exact-function"
		}],
		functionParameter: {
			text1: {
				name: "text1",
				detail: "La primera cadena de text."
			},
			text2: {
				name: "text2",
				detail: "La segona cadena de text."
			}
		}
	},
	FIND: {
		description: "Troba un valor de text dins d'un altre (distingeix majúscules de minúscules)",
		abstract: "Troba un valor de text dins d'un altre (distingeix majúscules de minúscules)",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/this-article-has-been-retired"
		}],
		functionParameter: {
			findText: {
				name: "text_buscat",
				detail: "El text que voleu trobar."
			},
			withinText: {
				name: "dins_text",
				detail: "El text que conté el text que voleu trobar."
			},
			startNum: {
				name: "núm_inicial",
				detail: "Especifica el caràcter on començar la cerca. Si ometeu núm_inicial, s'assumeix que és 1."
			}
		}
	},
	FINDB: {
		description: "Troba un valor de text dins d'un altre (distingeix majúscules de minúscules)",
		abstract: "Troba un valor de text dins d'un altre (distingeix majúscules de minúscules)",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/this-article-has-been-retired"
		}],
		functionParameter: {
			findText: {
				name: "text_buscat",
				detail: "El text que voleu trobar."
			},
			withinText: {
				name: "dins_text",
				detail: "El text que conté el text que voleu trobar."
			},
			startNum: {
				name: "núm_inicial",
				detail: "Especifica el caràcter on començar la cerca. Si ometeu núm_inicial, s'assumeix que és 1."
			}
		}
	},
	FIXED: {
		description: "Formata un nombre com a text amb un nombre fix de decimals",
		abstract: "Formata un nombre com a text amb un nombre fix de decimals",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/fixed-function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El nombre que voleu arrodonir i convertir a text."
			},
			decimals: {
				name: "decimals",
				detail: "El nombre de dígits a la dreta del punt decimal. Si és negatiu, el nombre s'arrodoneix a l'esquerra del punt decimal. Si ometeu decimals, s'assumeix que són 2."
			},
			noCommas: {
				name: "sense_comes",
				detail: "Un valor lògic que, si és CERT, impedeix que FIXAT inclogui comes en el text retornat."
			}
		}
	},
	LEFT: {
		description: "Retorna els caràcters de més a l'esquerra d'un valor de text",
		abstract: "Retorna els caràcters de més a l'esquerra d'un valor de text",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/left-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "La cadena de text que conté els caràcters que voleu extreure."
			},
			numChars: {
				name: "nombre_caràcters",
				detail: "Especifica el nombre de caràcters que voleu que ESQUERRA extregui."
			}
		}
	},
	LEFTB: {
		description: "Retorna els caràcters de més a l'esquerra d'un valor de text",
		abstract: "Retorna els caràcters de més a l'esquerra d'un valor de text",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/left-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "La cadena de text que conté els caràcters que voleu extreure."
			},
			numBytes: {
				name: "nombre_bytes",
				detail: "Especifica el nombre de caràcters que voleu que ESQUERRAB extregui, basat en bytes."
			}
		}
	},
	LEN: {
		description: "Retorna el nombre de caràcters d'una cadena de text",
		abstract: "Retorna el nombre de caràcters d'una cadena de text",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/len-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "El text del qual voleu trobar la longitud. Els espais compten com a caràcters."
		} }
	},
	LENB: {
		description: "Retorna el nombre de bytes utilitzats per representar els caràcters d'una cadena de text",
		abstract: "Retorna el nombre de bytes utilitzats per representar els caràcters d'una cadena de text",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/len-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "El text del qual voleu trobar la longitud. Els espais compten com a caràcters."
		} }
	},
	LOWER: {
		description: "Converteix el text a minúscules",
		abstract: "Converteix el text a minúscules",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/lower-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "El text que voleu convertir a minúscules."
		} }
	},
	MID: {
		description: "Retorna un nombre específic de caràcters d'una cadena de text començant a la posició que especifiqueu",
		abstract: "Retorna un nombre específic de caràcters d'una cadena de text començant a la posició que especifiqueu",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/mid-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "La cadena de text que conté els caràcters que voleu extreure."
			},
			startNum: {
				name: "núm_inicial",
				detail: "La posició del primer caràcter que voleu extreure en el text."
			},
			numChars: {
				name: "nombre_caràcters",
				detail: "Especifica el nombre de caràcters que voleu que EXTRET extregui."
			}
		}
	},
	MIDB: {
		description: "Retorna un nombre específic de caràcters d'una cadena de text començant a la posició que especifiqueu",
		abstract: "Retorna un nombre específic de caràcters d'una cadena de text començant a la posició que especifiqueu",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/mid-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "La cadena de text que conté els caràcters que voleu extreure."
			},
			startNum: {
				name: "núm_inicial",
				detail: "La posició del primer caràcter que voleu extreure en el text."
			},
			numBytes: {
				name: "nombre_bytes",
				detail: "Especifica el nombre de caràcters que voleu que EXTRETB extregui, basat en bytes."
			}
		}
	},
	NUMBERSTRING: {
		description: "Converteix nombres a cadenes xineses",
		abstract: "Converteix nombres a cadenes xineses",
		links: [{
			title: "Instruccions",
			url: "https://www.wps.cn/learning/course/detail/id/340.html?chan=pc_kdocs_function"
		}],
		functionParameter: {
			number: {
				name: "nombre",
				detail: "El valor convertit a una cadena xinesa."
			},
			type: {
				name: "tipus",
				detail: "El tipus del resultat retornat. \n1. Minúscules xineses \n2. Majúscules xineses \n3. Caràcters xinesos de lectura i escriptura"
			}
		}
	},
	NUMBERVALUE: {
		description: "Converteix text a nombre d'una manera independent de la configuració regional",
		abstract: "Converteix text a nombre d'una manera independent de la configuració regional",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/numbervalue-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "El text a convertir a nombre."
			},
			decimalSeparator: {
				name: "separador_decimal",
				detail: "El caràcter utilitzat per separar la part entera i la fraccionària del resultat."
			},
			groupSeparator: {
				name: "separador_grup",
				detail: "El caràcter utilitzat per separar agrupacions de nombres."
			}
		}
	},
	PHONETIC: {
		description: "Extreu els caràcters fonètics (furigana) d'una cadena de text",
		abstract: "Extreu els caràcters fonètics (furigana) d'una cadena de text",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/phonetic-function"
		}],
		functionParameter: { reference: {
			name: "Referència",
			detail: "Text, interval o referència que conté el text fonètic que voleu extreure."
		} }
	},
	PROPER: {
		description: "Posa en majúscula la primera lletra de cada paraula d'un valor de text",
		abstract: "Posa en majúscula la primera lletra de cada paraula d'un valor de text",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/proper-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Text entre cometes, una fórmula que retorna text o una referència a una cel·la que conté el text que voleu capitalitzar parcialment."
		} }
	},
	REGEXEXTRACT: {
		description: "Extreu subcadenes coincidents d'acord amb una expressió regular.",
		abstract: "Extreu subcadenes coincidents d'acord amb una expressió regular.",
		links: [{
			title: "Instruccions",
			url: "https://support.google.com/docs/answer/3098244?hl=ca"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Consell : l'exemple anterior tornarà dues columnes de dades: \"extreure\" a la primera i \"valors\" a la segona."
			},
			regularExpression: {
				name: "expressió_regular",
				detail: "Es retornarà la primera part del text que coincideixi amb aquesta expressió."
			}
		}
	},
	REGEXMATCH: {
		description: "Determina si una part del text coincideix amb una expressió regular.",
		abstract: "Determina si una part del text coincideix amb una expressió regular.",
		links: [{
			title: "Instruccions",
			url: "https://support.google.com/docs/answer/3098292?hl=ca"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "text que cal contrastar amb l'expressió regular."
			},
			regularExpression: {
				name: "expressió_regular",
				detail: "expressió regular amb què es contrastarà el text."
			}
		}
	},
	REGEXREPLACE: {
		description: "Substitueix part d'una cadena de text per una altra cadena de text utilitzant expressions regulars.",
		abstract: "Substitueix part d'una cadena de text per una altra cadena de text utilitzant expressions regulars.",
		links: [{
			title: "Instruccions",
			url: "https://support.google.com/docs/answer/3098245?hl=ca"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "text, una part del qual cal substituir."
			},
			regularExpression: {
				name: "expressió_regular",
				detail: "l'expressió regular. Totes les coincidències de l'argument text se substituiran."
			},
			replacement: {
				name: "substitució",
				detail: "text que cal inserir al text original."
			}
		}
	},
	REPLACE: {
		description: "Reemplaça caràcters dins del text",
		abstract: "Reemplaça caràcters dins del text",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/replace-function"
		}],
		functionParameter: {
			oldText: {
				name: "text_antic",
				detail: "Text en el qual voleu reemplaçar alguns caràcters."
			},
			startNum: {
				name: "núm_inicial",
				detail: "La posició del caràcter en text_antic que voleu reemplaçar amb text_nou."
			},
			numChars: {
				name: "nombre_caràcters",
				detail: "El nombre de caràcters en text_antic que voleu que REEMPLAÇA reemplaci amb text_nou."
			},
			newText: {
				name: "text_nou",
				detail: "El text que reemplaçarà els caràcters en text_antic."
			}
		}
	},
	REPLACEB: {
		description: "Reemplaça caràcters dins del text",
		abstract: "Reemplaça caràcters dins del text",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/replace-function"
		}],
		functionParameter: {
			oldText: {
				name: "text_antic",
				detail: "Text en el qual voleu reemplaçar alguns caràcters."
			},
			startNum: {
				name: "núm_inicial",
				detail: "La posició del caràcter en text_antic que voleu reemplaçar amb text_nou."
			},
			numBytes: {
				name: "nombre_bytes",
				detail: "El nombre de bytes en text_antic que voleu que REEMPLAÇAB reemplaci amb text_nou."
			},
			newText: {
				name: "text_nou",
				detail: "El text que reemplaçarà els caràcters en text_antic."
			}
		}
	},
	REPT: {
		description: "Repeteix el text un nombre determinat de vegades",
		abstract: "Repeteix el text un nombre determinat de vegades",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/rept-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "El text que voleu repetir."
			},
			numberTimes: {
				name: "nombre_vegades",
				detail: "Un nombre positiu que especifica el nombre de vegades que cal repetir el text."
			}
		}
	},
	RIGHT: {
		description: "Retorna els caràcters de més a la dreta d'un valor de text",
		abstract: "Retorna els caràcters de més a la dreta d'un valor de text",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/right-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "La cadena de text que conté els caràcters que voleu extreure."
			},
			numChars: {
				name: "nombre_caràcters",
				detail: "Especifica el nombre de caràcters que voleu que DRETA extregui."
			}
		}
	},
	RIGHTB: {
		description: "Retorna els caràcters de més a la dreta d'un valor de text",
		abstract: "Retorna els caràcters de més a la dreta d'un valor de text",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/right-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "La cadena de text que conté els caràcters que voleu extreure."
			},
			numBytes: {
				name: "nombre_bytes",
				detail: "Especifica el nombre de caràcters que voleu que DRETAB extregui, basat en bytes."
			}
		}
	},
	SEARCH: {
		description: "Troba un valor de text dins d'un altre (no distingeix majúscules de minúscules)",
		abstract: "Troba un valor de text dins d'un altre (no distingeix majúscules de minúscules)",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/search-function"
		}],
		functionParameter: {
			findText: {
				name: "text_buscat",
				detail: "El text que voleu trobar."
			},
			withinText: {
				name: "dins_text",
				detail: "El text que conté el text que voleu trobar."
			},
			startNum: {
				name: "núm_inicial",
				detail: "Especifica el caràcter on començar la cerca. Si ometeu núm_inicial, s'assumeix que és 1."
			}
		}
	},
	SEARCHB: {
		description: "Troba un valor de text dins d'un altre (no distingeix majúscules de minúscules)",
		abstract: "Troba un valor de text dins d'un altre (no distingeix majúscules de minúscules)",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/search-function"
		}],
		functionParameter: {
			findText: {
				name: "text_buscat",
				detail: "El text que voleu trobar."
			},
			withinText: {
				name: "dins_text",
				detail: "El text que conté el text que voleu trobar."
			},
			startNum: {
				name: "núm_inicial",
				detail: "Especifica el caràcter on començar la cerca. Si ometeu núm_inicial, s'assumeix que és 1."
			}
		}
	},
	SUBSTITUTE: {
		description: "Substitueix text antic per text nou en una cadena de text",
		abstract: "Substitueix text antic per text nou en una cadena de text",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/substitute-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "El text o la referència a una cel·la que conté text en el qual voleu substituir caràcters."
			},
			oldText: {
				name: "text_antic",
				detail: "El text que voleu reemplaçar."
			},
			newText: {
				name: "text_nou",
				detail: "El text amb el qual voleu reemplaçar text_antic."
			},
			instanceNum: {
				name: "núm_instància",
				detail: "Especifica quina ocurrència de text_antic voleu reemplaçar amb text_nou. Si especifiqueu núm_instància, només es reemplaça aquesta instància de text_antic. Altrament, cada ocurrència de text_antic en el text es canvia per text_nou."
			}
		}
	},
	T: {
		description: "Converteix els seus arguments a text",
		abstract: "Converteix els seus arguments a text",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/t-function"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "El valor que voleu provar."
		} }
	},
	TEXT: {
		description: "Formata un nombre i el converteix a text",
		abstract: "Formata un nombre i el converteix a text",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/text-function"
		}],
		functionParameter: {
			value: {
				name: "valor",
				detail: "Un valor numèric que voleu convertir en text."
			},
			formatText: {
				name: "format_text",
				detail: "Una cadena de text que defineix el format que voleu aplicar al valor subministrat."
			}
		}
	},
	TEXTAFTER: {
		description: "Retorna el text que apareix després d'un caràcter o cadena donats",
		abstract: "Retorna el text que apareix després d'un caràcter o cadena donats",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/textafter-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "El text dins del qual esteu cercant. No es permeten caràcters comodí."
			},
			delimiter: {
				name: "delimitador",
				detail: "El text que marca el punt després del qual voleu extreure."
			},
			instanceNum: {
				name: "núm_instància",
				detail: "La instància del delimitador després de la qual voleu extreure el text."
			},
			matchMode: {
				name: "mode_coincidència",
				detail: "Determina si la cerca de text distingeix entre majúscules i minúscules. El valor per defecte és sensible a majúscules i minúscules."
			},
			matchEnd: {
				name: "coincidència_final",
				detail: "Tracta el final del text com un delimitador. Per defecte, el text és una coincidència exacta."
			},
			ifNotFound: {
				name: "si_no_es_troba",
				detail: "Valor retornat si no es troba cap coincidència. Per defecte, es retorna #N/A."
			}
		}
	},
	TEXTBEFORE: {
		description: "Retorna el text que apareix abans d'un caràcter o cadena donats",
		abstract: "Retorna el text que apareix abans d'un caràcter o cadena donats",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/textbefore-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "El text dins del qual esteu cercant. No es permeten caràcters comodí."
			},
			delimiter: {
				name: "delimitador",
				detail: "El text que marca el punt abans del qual voleu extreure."
			},
			instanceNum: {
				name: "núm_instància",
				detail: "La instància del delimitador abans de la qual voleu extreure el text."
			},
			matchMode: {
				name: "mode_coincidència",
				detail: "Determina si la cerca de text distingeix entre majúscules i minúscules. El valor per defecte és sensible a majúscules i minúscules."
			},
			matchEnd: {
				name: "coincidència_final",
				detail: "Tracta el final del text com un delimitador. Per defecte, el text és una coincidència exacta."
			},
			ifNotFound: {
				name: "si_no_es_troba",
				detail: "Valor retornat si no es troba cap coincidència. Per defecte, es retorna #N/A."
			}
		}
	},
	TEXTJOIN: {
		description: "Text: Combina el text de múltiples rangs i/o cadenes",
		abstract: "Text: Combina el text de múltiples rangs i/o cadenes",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/textjoin-function"
		}],
		functionParameter: {
			delimiter: {
				name: "delimitador",
				detail: "Una cadena de text, buida o amb un o més caràcters tancats entre cometes dobles, o una referència a una cadena de text vàlida."
			},
			ignoreEmpty: {
				name: "ignora_buits",
				detail: "Si és CERT, ignora les cel·les buides."
			},
			text1: {
				name: "text1",
				detail: "Element de text a unir. Una cadena de text, o una matriu de cadenes, com un rang de cel·les."
			},
			text2: {
				name: "text2",
				detail: "Elements de text addicionals a unir. Pot haver-hi un màxim de 252 arguments de text per als elements de text, inclòs text1. Cadascun pot ser una cadena de text, o una matriu de cadenes, com un rang de cel·les."
			}
		}
	},
	TEXTSPLIT: {
		description: "Divideix cadenes de text utilitzant delimitadors de columna i fila",
		abstract: "Divideix cadenes de text utilitzant delimitadors de columna i fila",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/textsplit-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "El text a dividir."
			},
			colDelimiter: {
				name: "delimitador_col",
				detail: "El caràcter o cadena pel qual dividir la columna."
			},
			rowDelimiter: {
				name: "delimitador_fila",
				detail: "El caràcter o cadena en què dividir la línia."
			},
			ignoreEmpty: {
				name: "ignora_buits",
				detail: "Si s'han d'ignorar les cel·les buides. El valor per defecte és FALS."
			},
			matchMode: {
				name: "mode_coincidència",
				detail: "Cerca una coincidència de delimitador en el text. Per defecte, es fa una coincidència sensible a majúscules i minúscules."
			},
			padWith: {
				name: "omplir_amb",
				detail: "El valor a utilitzar per a l'ompliment. Per defecte, s'utilitza #N/A."
			}
		}
	},
	TRIM: {
		description: "Elimina tots els espais del text excepte els espais individuals entre paraules.",
		abstract: "Elimina espais del text",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/trim-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "El text del qual voleu eliminar els espais."
		} }
	},
	UNICHAR: {
		description: "Retorna el caràcter Unicode que es referencia pel valor numèric donat",
		abstract: "Retorna el caràcter Unicode que es referencia pel valor numèric donat",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/unichar-function"
		}],
		functionParameter: { number: {
			name: "nombre",
			detail: "El Nombre és el número Unicode que representa el caràcter."
		} }
	},
	UNICODE: {
		description: "Retorna el nombre (punt de codi) que correspon al primer caràcter del text",
		abstract: "Retorna el nombre (punt de codi) que correspon al primer caràcter del text",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/unicode-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "El Text és el caràcter del qual voleu el valor Unicode."
		} }
	},
	UPPER: {
		description: "Converteix el text a majúscules",
		abstract: "Converteix el text a majúscules",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/upper-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "El text que voleu convertir a majúscules."
		} }
	},
	VALUE: {
		description: "Converteix un argument de text a un nombre",
		abstract: "Converteix un argument de text a un nombre",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/value-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "El text entre cometes o una referència a una cel·la que conté el text que voleu convertir."
		} }
	},
	VALUETOTEXT: {
		description: "Retorna text des de qualsevol valor especificat",
		abstract: "Retorna text des de qualsevol valor especificat",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/valuetotext-function"
		}],
		functionParameter: {
			value: {
				name: "valor",
				detail: "El valor a retornar com a text."
			},
			format: {
				name: "format",
				detail: "El format de les dades retornades. Pot ser un de dos valors: \n0 Predeterminat. Format concís i fàcil de llegir. \n1 Format estricte que inclou caràcters d'escapament i delimitadors de fila. Genera una cadena que es pot analitzar en introduir-la a la barra de fórmules. Encapsula les cadenes retornades entre cometes, excepte per a valors booleans, nombres i errors."
			}
		}
	},
	CALL: {
		description: "Crida a un procediment en una biblioteca d'enllaç dinàmic o recurs de codi",
		abstract: "Crida a un procediment en una biblioteca d'enllaç dinàmic o recurs de codi",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/call-function"
		}],
		functionParameter: {
			moduleText: {
				name: "Text del mòdul",
				detail: "Nom de la biblioteca d’enllaç dinàmic (DLL) que conté el procediment."
			},
			procedure: {
				name: "Procediment",
				detail: "Nom o número ordinal del procediment de la DLL."
			},
			typeText: {
				name: "Text del tipus",
				detail: "Text que especifica els tipus de dades dels arguments i del valor retornat."
			},
			argument1: {
				name: "Argument 1",
				detail: "Opcional. Primer argument que es passa al procediment."
			}
		}
	},
	EUROCONVERT: {
		description: "Converteix un nombre a euros, converteix un nombre d'euros a una moneda d'un membre de l'euro, o converteix un nombre d'una moneda d'un membre de l'euro a una altra utilitzant l'euro com a intermediari (triangulació)",
		abstract: "Converteix un nombre a euros, converteix un nombre d'euros a una moneda d'un membre de l'euro, o converteix un nombre d'una moneda d'un membre de l'euro a una altra utilitzant l'euro com a intermediari (triangulació)",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/euroconvert-function"
		}],
		functionParameter: {
			number: {
				name: "Nombre",
				detail: "Valor de moneda que s’ha de convertir."
			},
			source: {
				name: "Origen",
				detail: "Codi de la moneda d’origen."
			},
			target: {
				name: "Destinació",
				detail: "Codi de la moneda de destinació."
			},
			fullPrecision: {
				name: "Precisió completa",
				detail: "Valor lògic que controla si s’arrodoneix amb les regles específiques de la moneda."
			},
			triangulationPrecision: {
				name: "Precisió de triangulació",
				detail: "Opcional. Nombre de dígits significatius per a la conversió intermèdia a euros."
			}
		}
	},
	REGISTER_ID: {
		description: "Retorna l'ID de registre de la biblioteca d'enllaç dinàmic (DLL) especificada o del recurs de codi que s'ha registrat prèviament",
		abstract: "Retorna l'ID de registre de la biblioteca d'enllaç dinàmic (DLL) especificada o del recurs de codi que s'ha registrat prèviament",
		links: [{
			title: "Instruccions",
			url: "https://support.microsoft.com/ca-es/excel/functions/register-id-function"
		}],
		functionParameter: {
			moduleText: {
				name: "Text del mòdul",
				detail: "Nom de la DLL o del recurs de codi que conté el procediment."
			},
			procedure: {
				name: "Procediment",
				detail: "Nom o número ordinal del procediment."
			},
			typeText: {
				name: "Text del tipus",
				detail: "Opcional. Text que especifica els tipus de dades dels arguments i del valor retornat."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/univer/ca-ES.ts
const locale$2 = {};

//#endregion
//#region src/locale/function-list/web/ca-ES.ts
const locale$1 = {
	ENCODEURL: {
		description: "Retorna una cadena codificada en URL",
		abstract: "Retorna una cadena codificada en URL",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/encodeurl-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Una cadena que s’ha de codificar en URL"
		} }
	},
	FILTERXML: {
		description: "Retorna dades específiques del contingut XML utilitzant la XPath especificada",
		abstract: "Retorna dades específiques del contingut XML utilitzant la XPath especificada",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/filterxml-function"
		}],
		functionParameter: {
			xml: {
				name: "xml",
				detail: "Una cadena en format XML vàlid."
			},
			xpath: {
				name: "xpath",
				detail: "Una cadena en format XPath estàndard."
			}
		}
	},
	WEBSERVICE: {
		description: "Retorna dades d’un servei web",
		abstract: "Retorna dades d’un servei web",
		links: [{
			title: "Instrucció",
			url: "https://support.microsoft.com/ca-es/excel/functions/webservice-function"
		}],
		functionParameter: { url: {
			name: "url",
			detail: "L’URL del servei web."
		} }
	}
};

//#endregion
//#region src/locale/ca-ES.ts
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