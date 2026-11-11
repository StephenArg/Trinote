//#region src/locale/function-list/array/it-IT.ts
const locale$15 = {
	ARRAY_CONSTRAIN: {
		description: "Limita il risultato di una matrice alle dimensioni specificate.",
		abstract: "Limita il risultato di una matrice alle dimensioni specificate.",
		links: [{
			title: "Istruzioni",
			url: "https://support.google.com/docs/answer/3267036?hl=it"
		}],
		functionParameter: {
			inputRange: {
				name: "intervallo_input",
				detail: "L’intervallo da limitare."
			},
			numRows: {
				name: "numero_righe",
				detail: "Il numero di righe che il risultato deve contenere."
			},
			numCols: {
				name: "numero_colonne",
				detail: "Il numero di colonne che il risultato deve contenere."
			}
		}
	},
	FLATTEN: {
		description: "Riunisce tutti i valori di uno o più intervalli in una singola colonna.",
		abstract: "Riunisce tutti i valori di uno o più intervalli in una singola colonna.",
		links: [{
			title: "Istruzioni",
			url: "https://support.google.com/docs/answer/10307761?hl=it"
		}],
		functionParameter: {
			range1: {
				name: "intervallo1",
				detail: "Il primo intervallo da riunire."
			},
			range2: {
				name: "intervallo2",
				detail: "[facoltativo, ripetibile] Altri intervalli da riunire."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/compatibility/it-IT.ts
const locale$14 = {
	BETADIST: {
		description: "Restituisce la funzione densità di probabilità cumulativa beta. La distribuzione beta viene generalmente utilizzata per lo studio su campioni delle variazioni percentuali di un elemento o di una situazione qualsiasi, quale ad esempio il numero di ore che si trascorrono quotidianamente davanti al televisore.",
		abstract: "Restituisce la funzione densità di probabilità cumulativa beta. La distribuzione beta viene generalmente utilizzata per lo studio su campioni delle variazioni percentuali di un elemento o di una situazione qualsiasi, quale ad esempio il numero di ore che si trascorrono quotidianamente davanti al televisore.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/betadist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obbligatorio. Valore compreso tra A e B in cui calcolare la funzione."
			},
			alpha: {
				name: "alpha",
				detail: "Obbligatorio. Parametro della distribuzione."
			},
			beta: {
				name: "beta",
				detail: "Obbligatorio. Parametro della distribuzione."
			},
			A: {
				name: "A",
				detail: "Optional. Valore per l'estremo inferiore dell'intervallo di x."
			},
			B: {
				name: "B",
				detail: "Facoltativo. Valore per l'estremo superiore dell'intervallo di x."
			}
		}
	},
	BETAINV: {
		description: "Restituisce l'inversa della funzione densità di probabilità cumulativa beta per una distribuzione beta specificata. Questo significa che, se probabilità = DISTRIB.BETA(x;...), si avrà INV.BETA(probabilità;...) = x. Dati un tempo di durata e una variabilità previsti, la distribuzione beta può essere utilizzata nella pianificazione di progetti per calcolare i tempi di durata probabili.",
		abstract: "Restituisce l'inversa della funzione densità di probabilità cumulativa beta per una distribuzione beta specificata. Questo significa che, se probabilità = DISTRIB.BETA(x;...), si avrà INV.BETA(probabilità;...) = x. Dati un tempo di durata e una variabilità previsti, la distribuzione beta può essere utilizzata nella pianificazione di progetti per calcolare i tempi di durata probabili.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/betainv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obbligatorio. Probabilità associata alla distribuzione beta."
			},
			alpha: {
				name: "alpha",
				detail: "Obbligatorio. Parametro della distribuzione."
			},
			beta: {
				name: "beta",
				detail: "Obbligatorio. Parametro della distribuzione."
			},
			A: {
				name: "A",
				detail: "Optional. Valore per l'estremo inferiore dell'intervallo di x."
			},
			B: {
				name: "B",
				detail: "Facoltativo. Valore per l'estremo superiore dell'intervallo di x."
			}
		}
	},
	BINOMDIST: {
		description: "Restituisce la distribuzione binomiale per il termine individuale. Utilizzare la funzione DISTRIB.BINOM per risolvere problemi con un numero fisso di verifiche o di prove, quando i risultati di una prova qualsiasi sono solo positivi o negativi, quando le prove sono indipendenti e quando la probabilità di successo è costante nel corso di tutto l'esperimento. La funzione DISTRIB.BINOM può calcolare ad esempio la probabilità che due neonati su tre siano maschi.",
		abstract: "Restituisce la distribuzione binomiale per il termine individuale. Utilizzare la funzione DISTRIB.BINOM per risolvere problemi con un numero fisso di verifiche o di prove, quando i risultati di una prova qualsiasi sono solo positivi o negativi, quando le prove sono indipendenti e quando la probabilità di successo è costante nel corso di tutto l'esperimento. La funzione DISTRIB.BINOM può calcolare ad esempio la probabilità che due neonati su tre siano maschi.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/binomdist-function"
		}],
		functionParameter: {
			numberS: {
				name: "number_s",
				detail: "Obbligatorio. Numero di successi in prove."
			},
			trials: {
				name: "trials",
				detail: "Obbligatorio. Numero di prove indipendenti."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Obbligatorio. Probabilità di successo per ogni prova."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obbligatorio. Valore logico che determina la forma assunta dalla funzione. Se cumulativo è VERO, DISTRIB.BINOM restituirà la funzione distribuzione cumulativa, ovvero la probabilità che ci siano al massimo number_s successi; se è FALSO, restituirà la funzione massa di probabilità, ovvero la probabilità che siano presenti number_s successi."
			}
		}
	},
	CHIDIST: {
		description: "Restituisce la probabilità a una coda destra per la distribuzione del chi quadrato. La distribuzione χ2 è associata al test χ2. Utilizzare il test χ2 per confrontare i valori osservati con i valori previsti. Ad esempio, sulla base di un esperimento genetico si potrebbe ipotizzare che la gamma di colori della prossima generazione di piante sarà diversa da quella attuale. Confrontando i risultati osservati con quelli previsti, sarà possibile stabilire la validità dell'ipotesi formulata in origine.",
		abstract: "Restituisce la probabilità a una coda destra per la distribuzione del chi quadrato. La distribuzione χ2 è associata al test χ2. Utilizzare il test χ2 per confrontare i valori osservati con i valori previsti. Ad esempio, sulla base di un esperimento genetico si potrebbe ipotizzare che la gamma di colori della prossima generazione di piante sarà diversa da quella attuale. Confrontando i risultati osservati con quelli previsti, sarà possibile stabilire la validità dell'ipotesi formulata in origine.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/chidist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obbligatorio. Valore in cui si desidera calcolare la distribuzione."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Obbligatorio. Numero di gradi di libertà."
			}
		}
	},
	CHIINV: {
		description: "Restituisce l'inversa della distribuzione a una coda destra del chi quadrato. Se probabilità = DISTRIB.CHI(x;...), verrà restituito INV.CHI(probabilità;...) = x. Utilizzare questa funzione per confrontare i risultati osservati con quelli previsti per stabilire se l'ipotesi formulata in origine è valida.",
		abstract: "Restituisce l'inversa della distribuzione a una coda destra del chi quadrato. Se probabilità = DISTRIB.CHI(x;...), verrà restituito INV.CHI(probabilità;...) = x. Utilizzare questa funzione per confrontare i risultati osservati con quelli previsti per stabilire se l'ipotesi formulata in origine è valida.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/chiinv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obbligatorio. Probabilità associata alla distribuzione del chi quadrato."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Obbligatorio. Numero di gradi di libertà."
			}
		}
	},
	CHITEST: {
		description: "Restituisce il test per l'indipendenza. La funzione TEST.CHI restituisce il valore dalla distribuzione del chi quadrato (χ2) per un dato statistico e i gradi di libertà appropriati. È possibile utilizzare i test χ2 per stabilire se i risultati previsti vengono confermati mediante un esperimento.",
		abstract: "Restituisce il test per l'indipendenza. La funzione TEST.CHI restituisce il valore dalla distribuzione del chi quadrato (χ2) per un dato statistico e i gradi di libertà appropriati. È possibile utilizzare i test χ2 per stabilire se i risultati previsti vengono confermati mediante un esperimento.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/chitest-function"
		}],
		functionParameter: {
			actualRange: {
				name: "actual_range",
				detail: "Obbligatorio. Intervallo di dati che contiene le osservazioni da confrontare con i valori previsti."
			},
			expectedRange: {
				name: "expected_range",
				detail: "Obbligatorio. Intervallo di dati che contiene la proporzione del prodotto dei totali di riga e di colonna per il totale complessivo."
			}
		}
	},
	CONFIDENCE: {
		description: "Restituisce l'intervallo di confidenza per una media di popolazione utilizzando una distribuzione normale.",
		abstract: "Restituisce l'intervallo di confidenza per una media di popolazione utilizzando una distribuzione normale.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/confidence-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "Obbligatorio. Livello di significatività utilizzato per calcolare il livello di confidenza. Il livello di probabilità è uguale a 100*(1 - alfa)% o, in altre parole, un valore alfa di 0,05 indica un livello di probabilità del 95%."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Obbligatorio. Deviazione standard della popolazione per l'intervallo di dati e si presuppone che sia nota."
			},
			size: {
				name: "size",
				detail: "Obbligatorio. Dimensione del campione."
			}
		}
	},
	COVAR: {
		description: "Restituisce la covarianza, ovvero la media dei prodotti delle deviazioni di ogni coppia di dati in due set di dati.",
		abstract: "Restituisce la covarianza, ovvero la media dei prodotti delle deviazioni di ogni coppia di dati in due set di dati.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/covar-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Obbligatorio. Primo intervallo di celle costituito da interi."
			},
			array2: {
				name: "array2",
				detail: "Obbligatorio. Secondo intervallo di celle costituito da interi."
			}
		}
	},
	CRITBINOM: {
		description: "Restituisce il più piccolo valore per il quale la distribuzione cumulativa binomiale risulta maggiore o uguale a un valore di criterio. Usare questa funzione per le applicazioni di garanzia della qualità. Ad esempio, utilizzare CRIT.BINOM per determinare il maggior numero di parti difettose che possono uscire da una linea di assemblaggio senza scartando l'intero lotto.",
		abstract: "Restituisce il più piccolo valore per il quale la distribuzione cumulativa binomiale risulta maggiore o uguale a un valore di criterio. Usare questa funzione per le applicazioni di garanzia della qualità. Ad esempio, utilizzare CRIT.BINOM per determinare il maggior numero di parti difettose che possono uscire da una linea di assemblaggio senza scartando l'intero lotto.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/critbinom-function"
		}],
		functionParameter: {
			trials: {
				name: "trials",
				detail: "Obbligatorio. Numero delle prove di Bernoulli."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Obbligatorio. Probabilità di successo per ogni prova."
			},
			alpha: {
				name: "alpha",
				detail: "Obbligatorio. Valore di criterio."
			}
		}
	},
	EXPONDIST: {
		description: "Restituisce la distribuzione esponenziale. Utilizzare la funzione DISTRIB.EXP per calcolare il tempo che intercorre tra due eventi, quale il tempo impiegato da uno sportello automatico per consegnare la somma in contanti richiesta. È possibile ad esempio utilizzare DISTRIB.EXP per determinare la probabilità che questa operazione richieda al massimo un minuto.",
		abstract: "Restituisce la distribuzione esponenziale. Utilizzare la funzione DISTRIB.EXP per calcolare il tempo che intercorre tra due eventi, quale il tempo impiegato da uno sportello automatico per consegnare la somma in contanti richiesta. È possibile ad esempio utilizzare DISTRIB.EXP per determinare la probabilità che questa operazione richieda al massimo un minuto.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/expondist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obbligatorio. Valore della funzione."
			},
			lambda: {
				name: "lambda",
				detail: "Obbligatorio. Valore del parametro."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obbligatorio. Valore logico che indica la forma della funzione esponenziale. Se cumulativo è VERO, DISTRIB.EXP restituirà la funzione distribuzione cumulativa, se è FALSO restituirà la funzione densità di probabilità."
			}
		}
	},
	FDIST: {
		description: "Restituisce la distribuzione di probabilità F (coda destra) (grado di diversità) per due set di dati. È possibile utilizzare questa funzione per determinare se due set di dati presentano gradi di diversità differenti. È possibile ad esempio esaminare i punteggi dei test per l'ammissione all'università assegnati a studentesse e a studenti e stabilire se esistono differenze di variabilità tra il gruppo femminile e quello maschile.",
		abstract: "Restituisce la distribuzione di probabilità F (coda destra) (grado di diversità) per due set di dati. È possibile utilizzare questa funzione per determinare se due set di dati presentano gradi di diversità differenti. È possibile ad esempio esaminare i punteggi dei test per l'ammissione all'università assegnati a studentesse e a studenti e stabilire se esistono differenze di variabilità tra il gruppo femminile e quello maschile.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/fdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obbligatorio. Valore in cui calcolare la funzione."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Obbligatorio. Gradi di libertà al numeratore."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Obbligatorio. Gradi di libertà al denominatore."
			}
		}
	},
	FINV: {
		description: "Restituisce l'inversa della distribuzione di probabilità F (coda destra). Se p = DISTRIB.F(x;...), si avrà INV.F(p;...) = x.",
		abstract: "Restituisce l'inversa della distribuzione di probabilità F (coda destra). Se p = DISTRIB.F(x;...), si avrà INV.F(p;...) = x.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/finv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obbligatorio. Probabilità associata alla distribuzione cumulativa F."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Obbligatorio. Gradi di libertà al numeratore."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Obbligatorio. Gradi di libertà al denominatore."
			}
		}
	},
	FTEST: {
		description: "Restituisce il risultato di un test F. Un test F restituisce la probabilità a due code che le varianze in matrice1 e matrice2 non siano significativamente diverse. Utilizzare questa funzione per determinare se due campioni hanno varianze diverse. Ad esempio, sulla base dei punteggi di un test effettuato in scuole pubbliche e private, è possibile verificare se la diversità dei punteggi del test di queste scuole si estende su più livelli.",
		abstract: "Restituisce il risultato di un test F. Un test F restituisce la probabilità a due code che le varianze in matrice1 e matrice2 non siano significativamente diverse. Utilizzare questa funzione per determinare se due campioni hanno varianze diverse. Ad esempio, sulla base dei punteggi di un test effettuato in scuole pubbliche e private, è possibile verificare se la diversità dei punteggi del test di queste scuole si estende su più livelli.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/ftest-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Obbligatorio. Prima matrice o primo intervallo di dati."
			},
			array2: {
				name: "array2",
				detail: "Obbligatorio. Seconda matrice o secondo intervallo di dati."
			}
		}
	},
	GAMMADIST: {
		description: "Restituisce la distribuzione gamma. È possibile utilizzare questa funzione per studiare le variabili che potrebbero avere una distribuzione asimmetrica. La distribuzione gamma viene in genere utilizzata nell'analisi delle code.",
		abstract: "Restituisce la distribuzione gamma. È possibile utilizzare questa funzione per studiare le variabili che potrebbero avere una distribuzione asimmetrica. La distribuzione gamma viene in genere utilizzata nell'analisi delle code.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/gammadist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obbligatorio. Valore in cui si desidera calcolare la distribuzione."
			},
			alpha: {
				name: "alpha",
				detail: "Obbligatorio. Parametro per la distribuzione."
			},
			beta: {
				name: "beta",
				detail: "Obbligatorio. Parametro per la distribuzione. Se beta = 1, DISTRIB.GAMMA restituirà la distribuzione gamma standard."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obbligatorio. Valore logico che determina la forma assunta dalla funzione. Se cumulativo è VERO, DISTRIB.GAMMA restituirà la funzione di distribuzione cumulativa, se è FALSO restituirà la funzione densità di probabilità."
			}
		}
	},
	GAMMAINV: {
		description: "Restituisce l'inversa della distribuzione cumulativa gamma. Se p = DISTRIB.GAMMA(x;...), si avrà INV.GAMMA(p;...) = x. È possibile usare questa funzione per studiare una variabile la cui distribuzione potrebbe essere asimmetrica.",
		abstract: "Restituisce l'inversa della distribuzione cumulativa gamma. Se p = DISTRIB.GAMMA(x;...), si avrà INV.GAMMA(p;...) = x. È possibile usare questa funzione per studiare una variabile la cui distribuzione potrebbe essere asimmetrica.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/gammainv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obbligatorio. Probabilità associata alla distribuzione gamma."
			},
			alpha: {
				name: "alpha",
				detail: "Obbligatorio. Parametro per la distribuzione."
			},
			beta: {
				name: "beta",
				detail: "Obbligatorio. Parametro per la distribuzione. Se beta = 1, INV.GAMMA restituirà la distribuzione gamma standard."
			}
		}
	},
	HYPGEOMDIST: {
		description: "Restituisce la distribuzione ipergeometrica. DISTRIB.IPERGEOM restituisce la probabilità di un dato numero di successi campione in base alla dimensione del campione, ai successi e alla dimensione della popolazione. Utilizzare la funzione DISTRIB.IPERGEOM per risolvere i problemi con una popolazione limitata, dove ciascuna osservazione può essere tanto un successo quanto un insuccesso e dove ciascun sottoinsieme di una data dimensione viene scelto con uguale probabilità.",
		abstract: "Restituisce la distribuzione ipergeometrica. DISTRIB.IPERGEOM restituisce la probabilità di un dato numero di successi campione in base alla dimensione del campione, ai successi e alla dimensione della popolazione. Utilizzare la funzione DISTRIB.IPERGEOM per risolvere i problemi con una popolazione limitata, dove ciascuna osservazione può essere tanto un successo quanto un insuccesso e dove ciascun sottoinsieme di una data dimensione viene scelto con uguale probabilità.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/hypgeomdist-function"
		}],
		functionParameter: {
			sampleS: {
				name: "sample_s",
				detail: "Obbligatorio. Numero di successi nel campione."
			},
			numberSample: {
				name: "number_sample",
				detail: "Obbligatorio. Dimensione del campione."
			},
			populationS: {
				name: "population_s",
				detail: "Obbligatorio. Numero di successi nella popolazione."
			},
			numberPop: {
				name: "number_pop",
				detail: "Obbligatorio. Dimensione della popolazione."
			}
		}
	},
	LOGINV: {
		description: "Restituisce l'inversa della funzione di distribuzione cumulativa lognormale di x, dove ln(x) viene in genere distribuito con i parametri media e dev_standard. Se p = DISTRIB.LOGNORM(x;...), si avrà INV.LOGNORM(p;...) = x.",
		abstract: "Restituisce l'inversa della funzione di distribuzione cumulativa lognormale di x, dove ln(x) viene in genere distribuito con i parametri media e dev_standard. Se p = DISTRIB.LOGNORM(x;...), si avrà INV.LOGNORM(p;...) = x.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/loginv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obbligatorio. Probabilità associata alla distribuzione lognormale."
			},
			mean: {
				name: "mean",
				detail: "Obbligatorio. Media di ln(x)."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Obbligatorio. Deviazione standard di ln(x)."
			}
		}
	},
	LOGNORMDIST: {
		description: "Restituisce la distribuzione lognormale di x, dove ln(x) viene normalmente distribuito con la media dei parametri e con standard_dev. Utilizzare questa funzione per analizzare i dati che sono stati trasformati in logaritmi.",
		abstract: "Restituisce la distribuzione lognormale di x, dove ln(x) viene normalmente distribuito con la media dei parametri e con standard_dev. Utilizzare questa funzione per analizzare i dati che sono stati trasformati in logaritmi.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/lognormdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obbligatorio. Valore in cui calcolare la funzione."
			},
			mean: {
				name: "mean",
				detail: "Obbligatorio. Media di ln(x)."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Obbligatorio. Deviazione standard di ln(x)."
			}
		}
	},
	MODE: {
		description: "Si supponga di voler scoprire il numero più comune di specie di uccelli avvistate in un campione di conteggi di uccelli in una zona umida critica in un periodo di tempo di 30 anni o di voler individuare il numero di telefonate più frequenti presso un centro di supporto telefonico durante le ore non di punta. Per calcolare la modalità di un gruppo di numeri, usare la funzione MODA .",
		abstract: "Si supponga di voler scoprire il numero più comune di specie di uccelli avvistate in un campione di conteggi di uccelli in una zona umida critica in un periodo di tempo di 30 anni o di voler individuare il numero di telefonate più frequenti presso un centro di supporto telefonico durante le ore non di punta. Per calcolare la modalità di un gruppo di numeri, usare la funzione MODA .",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/mode-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obbligatorio. Primo argomento numerico di cui si desidera calcolare la moda."
			},
			number2: {
				name: "number2",
				detail: "Opzionale. Argomenti numerici da 1 a 255 di cui si desidera calcolare la moda. È inoltre possibile utilizzare un'unica matrice o un riferimento a una matrice anziché argomenti separati da punti e virgola."
			}
		}
	},
	NEGBINOMDIST: {
		description: "Restituisce la distribuzione binomiale negativa. DISTRIB.BINOM.NEG restituisce la probabilità che si verifichi il numero di insuccessi indicato in num_insuccessi prima del successo numero num_successi, quando la probabilità costante di un successo è probabilità_s. Questa funzione è simile alla distribuzione binomiale, tranne per il fatto che il numero di successi è fisso e che il numero delle prove è variabile. Analogamente alla distribuzione binomiale, le prove vengono considerate indipendenti.",
		abstract: "Restituisce la distribuzione binomiale negativa. DISTRIB.BINOM.NEG restituisce la probabilità che si verifichi il numero di insuccessi indicato in num_insuccessi prima del successo numero num_successi, quando la probabilità costante di un successo è probabilità_s. Questa funzione è simile alla distribuzione binomiale, tranne per il fatto che il numero di successi è fisso e che il numero delle prove è variabile. Analogamente alla distribuzione binomiale, le prove vengono considerate indipendenti.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/negbinomdist-function"
		}],
		functionParameter: {
			numberF: {
				name: "number_f",
				detail: "Obbligatorio. Numero degli insuccessi."
			},
			numberS: {
				name: "number_s",
				detail: "Obbligatorio. Numero di soglia per i successi."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Obbligatorio. Probabilità di ottenere un successo."
			}
		}
	},
	NORMDIST: {
		description: "La funzione DISTRIB.NORM restituisce la distribuzione normale per la media e la deviazione standard specificate. Questa funzione ha un'ampia gamma di applicazioni in statistica, incluse le verifiche di ipotesi.",
		abstract: "La funzione DISTRIB.NORM restituisce la distribuzione normale per la media e la deviazione standard specificate. Questa funzione ha un'ampia gamma di applicazioni in statistica, incluse le verifiche di ipotesi.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/normdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obbligatorio. Valore per il quale si desidera la distribuzione"
			},
			mean: {
				name: "mean",
				detail: "Obbligatorio. Media aritmetica della distribuzione"
			},
			standardDev: {
				name: "standard_dev",
				detail: "Obbligatorio. Deviazione standard della distribuzione"
			},
			cumulative: {
				name: "cumulative",
				detail: "Obbligatorio. Valore logico che determina la forma assunta dalla funzione. Se cumulativo è VERO, DISTRIB.NORM restituirà la funzione di distribuzione cumulativa; se cumulativo è FALSO, restituirà la funzione massa di probabilità."
			}
		}
	},
	NORMINV: {
		description: "Restituisce l'inversa della distribuzione normale cumulativa per la media e la deviazione standard specificate.",
		abstract: "Restituisce l'inversa della distribuzione normale cumulativa per la media e la deviazione standard specificate.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/norminv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obbligatorio. Probabilità corrispondente alla distribuzione normale."
			},
			mean: {
				name: "mean",
				detail: "Obbligatorio. Media aritmetica della distribuzione."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Obbligatorio. Deviazione standard della distribuzione."
			}
		}
	},
	NORMSDIST: {
		description: "Restituisce la funzione di distribuzione normale standard cumulativa. La distribuzione ha una media uguale a 0 (zero) e una deviazione standard uguale a uno. Utilizzare questa funzione al posto di una tabella delle aree di una curva normale standard.",
		abstract: "Restituisce la funzione di distribuzione normale standard cumulativa. La distribuzione ha una media uguale a 0 (zero) e una deviazione standard uguale a uno. Utilizzare questa funzione al posto di una tabella delle aree di una curva normale standard.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/normsdist-function"
		}],
		functionParameter: { z: {
			name: "z",
			detail: "Obbligatorio. Valore per il quale si desidera la distribuzione."
		} }
	},
	NORMSINV: {
		description: "Restituisce l'inversa della distribuzione normale standard cumulativa. La distribuzione ha una media uguale a zero e una deviazione standard uguale a uno.",
		abstract: "Restituisce l'inversa della distribuzione normale standard cumulativa. La distribuzione ha una media uguale a zero e una deviazione standard uguale a uno.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/normsinv-function"
		}],
		functionParameter: { probability: {
			name: "probability",
			detail: "Obbligatorio. Probabilità corrispondente alla distribuzione normale."
		} }
	},
	PERCENTILE: {
		description: "Restituisce il k-esimo dato percentile di valori in un intervallo. È possibile utilizzare questa funzione per stabilire una soglia di accettazione. È ad esempio possibile decidere di esaminare i candidati con un punteggio superiore al 90° percentile.",
		abstract: "Restituisce il k-esimo dato percentile di valori in un intervallo. È possibile utilizzare questa funzione per stabilire una soglia di accettazione. È ad esempio possibile decidere di esaminare i candidati con un punteggio superiore al 90° percentile.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/percentile-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Obbligatorio. Matrice o intervallo di dati che definisce la condizione relativa."
			},
			k: {
				name: "k",
				detail: "Obbligatorio. Valore percentile nell'intervallo da 0 a 1 compresi."
			}
		}
	},
	PERCENTRANK: {
		description: "La funzione PERCENT.RANGO restituisce il rango di un valore in un set di dati come percentuale del set di dati, ovvero la condizione relativa di un valore all'interno dell'intero set di dati. Ad esempio, è possibile usare PERCENT.RANGO per determinare la condizione del punteggio di un singolo test nel campo di tutti i punteggi per lo stesso test.",
		abstract: "La funzione PERCENT.RANGO restituisce il rango di un valore in un set di dati come percentuale del set di dati, ovvero la condizione relativa di un valore all'interno dell'intero set di dati. Ad esempio, è possibile usare PERCENT.RANGO per determinare la condizione del punteggio di un singolo test nel campo di tutti i punteggi per lo stesso test.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/percentrank-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Obbligatorio. Intervallo di dati (o matrice predefinita) di valori numerici entro i quali viene determinato il rango percentuale."
			},
			x: {
				name: "x",
				detail: "Obbligatorio. Valore di cui si desidera conoscere il rango all'interno della matrice."
			},
			significance: {
				name: "significance",
				detail: "Opzionale. Valore che identifica il numero di cifre significative per la percentuale restituita. Se questo argomento viene omesso, PERCENT.RANGO utilizzerà tre cifre (0,xxx)."
			}
		}
	},
	POISSON: {
		description: "Restituisce la distribuzione di probabilità di Poisson. La distribuzione di Poisson viene in genere applicata per la previsione del numero di eventi in un arco di tempo specifico, come il numero di automobili che transitano per un casello autostradale in 1 minuto.",
		abstract: "Restituisce la distribuzione di probabilità di Poisson. La distribuzione di Poisson viene in genere applicata per la previsione del numero di eventi in un arco di tempo specifico, come il numero di automobili che transitano per un casello autostradale in 1 minuto.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/poisson-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obbligatorio. Numero degli eventi."
			},
			mean: {
				name: "mean",
				detail: "Obbligatorio. Valore numerico previsto."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obbligatorio. Valore logico che determina la forma della distribuzione di probabilità restituita. Se cumulativo è VERO, POISSON restituisce la probabilità cumulativa di Poisson che il numero di eventi casuali sia compreso tra zero e x inclusi; se è FALSO, restituirà la funzione massa di probabilità di Poisson che il numero di eventi che si verificano sarà esattamente x."
			}
		}
	},
	QUARTILE: {
		description: "Restituisce il quartile di un set di dati. I quartili vengono spesso utilizzati nelle indagini di mercato e nei dati statistici per suddividere le popolazioni in gruppi. È ad esempio possibile utilizzare QUARTILE per trovare il 25% dei redditi più elevati in una popolazione.",
		abstract: "Restituisce il quartile di un set di dati. I quartili vengono spesso utilizzati nelle indagini di mercato e nei dati statistici per suddividere le popolazioni in gruppi. È ad esempio possibile utilizzare QUARTILE per trovare il 25% dei redditi più elevati in una popolazione.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/quartile-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Obbligatorio. Matrice o intervallo di celle di valori numerici per cui si desidera calcolare il valore quartile."
			},
			quart: {
				name: "quart",
				detail: "Obbligatorio. Valore da restituire."
			}
		}
	},
	RANK: {
		description: "Restituisce il rango di un numero in un elenco di numeri. Il rango di un numero è la sua dimensione in rapporto agli altri valori presenti nell'elenco. Nel caso in cui fosse necessario ordinare l'elenco, il rango del numero corrisponderebbe alla rispettiva posizione.",
		abstract: "Restituisce il rango di un numero in un elenco di numeri. Il rango di un numero è la sua dimensione in rapporto agli altri valori presenti nell'elenco. Nel caso in cui fosse necessario ordinare l'elenco, il rango del numero corrisponderebbe alla rispettiva posizione.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/rank-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. Numero di cui si desidera trovare il rango."
			},
			ref: {
				name: "ref",
				detail: "Obbligatorio. Riferimento a un elenco di numeri. I valori in rif che non sono di tipo numerico vengono ignorati."
			},
			order: {
				name: "order",
				detail: "Opzionale. Numero che specifica come classificare num. Se ordine è 0 o è omesso, num verrà ordinato come se rif fosse un elenco in ordine decrescente. Se ordine è un valore diverso da zero, num verrà ordinato come se rif fosse un elenco in ordine crescente."
			}
		}
	},
	STDEV: {
		description: "Stima la deviazione standard sulla base di un campione. La deviazione standard è una misura che indica quanto si discostano i valori dal valore medio, ovvero la media.",
		abstract: "Stima la deviazione standard sulla base di un campione. La deviazione standard è una misura che indica quanto si discostano i valori dal valore medio, ovvero la media.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/stdev-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obbligatorio. Primo argomento numerico corrispondente a un campione di popolazione."
			},
			number2: {
				name: "number2",
				detail: "Opzionale. Da 1 a 255 argomenti numerici corrispondenti a un campione di popolazione. Anziché argomenti separati da punti e virgola, è inoltre possibile utilizzare una singola matrice o un riferimento a una matrice."
			}
		}
	},
	STDEVP: {
		description: "Calcola la deviazione standard sulla base dell'intera popolazione specificata in forma di argomenti. La deviazione standard è una misura che indica quanto i valori si discostino dal valore medio (la media).",
		abstract: "Calcola la deviazione standard sulla base dell'intera popolazione specificata in forma di argomenti. La deviazione standard è una misura che indica quanto i valori si discostino dal valore medio (la media).",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/stdevp-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obbligatorio. Primo argomento numerico corrispondente a una popolazione."
			},
			number2: {
				name: "number2",
				detail: "Opzionale. Da 1 a 255 argomenti numerici corrispondenti a una popolazione. Anziché argomenti separati da punti e virgola, è inoltre possibile utilizzare una singola matrice o un riferimento a una matrice."
			}
		}
	},
	TDIST: {
		description: "Restituisce i Punti percentuali (probabilità) della distribuzione t di Student dove il valore numerico (x) è un valore calcolato di t per cui verranno calcolati i Punti percentuali. La distribuzione t viene utilizzata nelle verifiche di ipotesi su piccoli set di dati presi come campione. Utilizzare questa funzione al posto di una tabella di valori critici per il calcolo della distribuzione t.",
		abstract: "Restituisce i Punti percentuali (probabilità) della distribuzione t di Student dove il valore numerico (x) è un valore calcolato di t per cui verranno calcolati i Punti percentuali. La distribuzione t viene utilizzata nelle verifiche di ipotesi su piccoli set di dati presi come campione. Utilizzare questa funzione al posto di una tabella di valori critici per il calcolo della distribuzione t.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/tdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obbligatorio. Valore numerico in cui calcolare la distribuzione."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Obbligatorio. Intero che indica il numero di gradi di libertà."
			},
			tails: {
				name: "tails",
				detail: "Obbligatorio. Specifica il numero di code di distribuzione da restituire. Se Coda = 1, DISTRIB.T restituirà la distribuzione a una coda. Se Coda = 2, DISTRIB.T restituirà la distribuzione a due code."
			}
		}
	},
	TINV: {
		description: "Restituisce l'inversa della distribuzione t di Student a due code.",
		abstract: "Restituisce l'inversa della distribuzione t di Student a due code.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/tinv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obbligatorio. Probabilità associata alla distribuzione t di Student a due code."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Obbligatorio. Numero di gradi di libertà con cui caratterizzare la distribuzione."
			}
		}
	},
	TTEST: {
		description: "Restituisce la probabilità associata a un test t di Student. Utilizzare la funzione TEST.T per determinare se due campioni possono essere derivati dalle stesse due popolazioni aventi la stessa media.",
		abstract: "Restituisce la probabilità associata a un test t di Student. Utilizzare la funzione TEST.T per determinare se due campioni possono essere derivati dalle stesse due popolazioni aventi la stessa media.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/ttest-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Obbligatorio. Primo set di dati."
			},
			array2: {
				name: "array2",
				detail: "Obbligatorio. Secondo set di dati."
			},
			tails: {
				name: "tails",
				detail: "Obbligatorio. Specifica il numero di code di distribuzione. Se coda = 1, TEST.T utilizzerà la distribuzione a una coda. Se coda = 2, TEST.T utilizzerà la distribuzione a due code."
			},
			type: {
				name: "type",
				detail: "Obbligatorio. Tipo di test t da eseguire."
			}
		}
	},
	VAR: {
		description: "Stima la varianza sulla base di un campione.",
		abstract: "Stima la varianza sulla base di un campione.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/var-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obbligatorio. Primo argomento numerico corrispondente a un campione di popolazione."
			},
			number2: {
				name: "number2",
				detail: "Opzionale. Da 2 a 255 argomenti numerici corrispondenti a un campione di popolazione."
			}
		}
	},
	VARP: {
		description: "Restituisce la varianza sulla base dell'intera popolazione.",
		abstract: "Restituisce la varianza sulla base dell'intera popolazione.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/varp-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obbligatorio. Primo argomento numerico corrispondente a una popolazione."
			},
			number2: {
				name: "number2",
				detail: "Opzionale. Da 1 a 255 argomenti numerici corrispondenti a una popolazione."
			}
		}
	},
	WEIBULL: {
		description: "Restituisce la distribuzione di Weibull. Utilizzare questa distribuzione nelle analisi di affidabilità, come il calcolo della durata media di un dispositivo.",
		abstract: "Restituisce la distribuzione di Weibull. Utilizzare questa distribuzione nelle analisi di affidabilità, come il calcolo della durata media di un dispositivo.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/weibull-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obbligatorio. Valore in cui calcolare la funzione."
			},
			alpha: {
				name: "alpha",
				detail: "Obbligatorio. Parametro per la distribuzione."
			},
			beta: {
				name: "beta",
				detail: "Obbligatorio. Parametro per la distribuzione."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obbligatorio. Determina la forma assunta dalla funzione."
			}
		}
	},
	ZTEST: {
		description: "Restituisce il valore di probabilità a una coda di un test z. Ipotizzando una determinata media della popolazione µ0, TEST.Z restituisce la probabilità che la media campione sia maggiore della media di osservazioni nel set di dati (matrice), ovvero della media campione osservata.",
		abstract: "Restituisce il valore di probabilità a una coda di un test z. Ipotizzando una determinata media della popolazione µ0, TEST.Z restituisce la probabilità che la media campione sia maggiore della media di osservazioni nel set di dati (matrice), ovvero della media campione osservata.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/ztest-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Obbligatorio. Matrice o intervallo di dati in base al quale verificare x"
			},
			x: {
				name: "x",
				detail: "Obbligatorio. Valore da verificare."
			},
			sigma: {
				name: "sigma",
				detail: "Opzionale. Deviazione standard della popolazione (nota). Se questo argomento viene omesso, verrà utilizzata la deviazione standard campione."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/cube/it-IT.ts
const locale$13 = {
	CUBEKPIMEMBER: {
		description: "Restituisce la proprietà di un indicatore di prestazioni chiave (KPI) e visualizza il nome di tale indicatore nella cella. Un KPI è una misura quantificabile, ad esempio l'utile lordo mensile o il fatturato trimestrale dei dipendenti, usata per il monitoraggio delle prestazioni di un'organizzazione.",
		abstract: "Restituisce la proprietà di un indicatore di prestazioni chiave (KPI) e visualizza il nome di tale indicatore nella cella. Un KPI è una misura quantificabile, ad esempio l'utile lordo mensile o il fatturato trimestrale dei dipendenti, usata per il monitoraggio delle prestazioni di un'organizzazione.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/cubekpimember-function"
		}],
		functionParameter: {
			connection: {
				name: "Connessione",
				detail: "Obbligatorio. Stringa di testo che si riferisce al nome della connessione al cubo."
			},
			kpiName: {
				name: "Kpi_name",
				detail: "Obbligatorio. Stringa di testo relativa al nome dell'indicatore KPI nel cubo."
			},
			kpiProperty: {
				name: "Kpi_property",
				detail: "Obbligatorio. Componente KPI restituito e può essere uno degli elementi seguenti:"
			},
			caption: {
				name: "Didascalia",
				detail: "Opzionale. Stringa di testo alternativo visualizzata nella cella che sostituisce nome_kpi e proprietà_kpi."
			}
		}
	},
	CUBEMEMBER: {
		description: "Restituisce un membro o una tupla dal cubo. Consente di verificare l'esistenza del membro o della tupla nel cubo.",
		abstract: "Restituisce un membro o una tupla dal cubo. Consente di verificare l'esistenza del membro o della tupla nel cubo.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/cubemember-function"
		}],
		functionParameter: {
			connection: {
				name: "Connessione",
				detail: "Obbligatorio. Stringa di testo che si riferisce al nome della connessione al cubo."
			},
			memberExpression: {
				name: "Espressione_membro",
				detail: "Obbligatorio. Stringa di testo di un'espressione multidimensionale (MDX) che restituisce un membro univoco nel cubo. In alternativa, può essere una tupla specificata come un intervallo di celle o una costante di matrice."
			},
			caption: {
				name: "Didascalia",
				detail: "Opzionale. Stringa di testo visualizzata nella cella in sostituzione della didascalia del cubo, se ne è stata definita una. Quando viene restituita una tupla, la didascalia usata è quella relativa all'ultimo membro della tupla."
			}
		}
	},
	CUBEMEMBERPROPERTY: {
		description: "La funzione PROPRIETÀ.MEMBRO.CUBO , una delle funzioni cubo di Excel, restituisce il valore di una proprietà di un membro da un cubo. Consente di verificare l'esistenza di un nome di membro all'interno del cubo e di restituire la proprietà specificata per tale membro.",
		abstract: "La funzione PROPRIETÀ.MEMBRO.CUBO , una delle funzioni cubo di Excel, restituisce il valore di una proprietà di un membro da un cubo. Consente di verificare l'esistenza di un nome di membro all'interno del cubo e di restituire la proprietà specificata per tale membro.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/cubememberproperty-function"
		}],
		functionParameter: {
			connection: {
				name: "Connessione",
				detail: "Obbligatorio. Stringa di testo che si riferisce al nome della connessione al cubo."
			},
			memberExpression: {
				name: "Espressione_membro",
				detail: "Obbligatorio. Stringa di testo di un'espressione multidimensionale (MDX) di un membro all'interno del cubo."
			},
			property: {
				name: "Proprietà",
				detail: "Obbligatorio. Stringa di testo relativa al nome della proprietà restituita o riferimento a una cella che contiene il nome della proprietà."
			}
		}
	},
	CUBERANKEDMEMBER: {
		description: "Restituisce l'n-esimo membro o il membro ordinato di un insieme. È possibile ottenere uno o più elementi di un insieme, ad esempio il venditore migliore o i primi 10 studenti.",
		abstract: "Restituisce l'n-esimo membro o il membro ordinato di un insieme. È possibile ottenere uno o più elementi di un insieme, ad esempio il venditore migliore o i primi 10 studenti.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/cuberankedmember-function"
		}],
		functionParameter: {
			connection: {
				name: "Connessione",
				detail: "Obbligatorio. Stringa di testo che si riferisce al nome della connessione al cubo."
			},
			setExpression: {
				name: "Espressione_insieme",
				detail: "Obbligatorio. Stringa di testo di un'espressione di insieme, ad esempio \"{[Elemento1].figli}\". Può essere anche costituita dalla funzione SET.CUBO o da un riferimento a una cella che contiene tale funzione."
			},
			rank: {
				name: "Rango",
				detail: "Obbligatorio. Valore intero che specifica il valore più alto da restituire. Se il valore rango è 1, viene restituito il valore più alto, se è 2, viene restituito il secondo valore più alto e così via. Per ottenere i primi 5 valori, usare cinque volte la funzione MEMBRO.CUBO.CON.RANGO specificando un rango diverso ogni volta, da 1 a 5."
			},
			caption: {
				name: "Didascalia",
				detail: "Opzionale. Stringa di testo visualizzata nella cella in sostituzione della didascalia del cubo, se ne è stata definita una."
			}
		}
	},
	CUBESET: {
		description: "Definisce un insieme di tuple o membri calcolati mediante l'invio di un'espressione di insieme al cubo sul server. In questo modo l'insieme viene creato e restituito a Microsoft Excel.",
		abstract: "Definisce un insieme di tuple o membri calcolati mediante l'invio di un'espressione di insieme al cubo sul server. In questo modo l'insieme viene creato e restituito a Microsoft Excel.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/cubeset-function"
		}],
		functionParameter: {
			connection: {
				name: "Connessione",
				detail: "Obbligatorio. Stringa di testo che si riferisce al nome della connessione al cubo."
			},
			setExpression: {
				name: "Espressione_insieme",
				detail: "Obbligatorio. Stringa di testo di un'espressione di insieme che restituisce un insieme di membri o tuple. Può essere anche costituito da un riferimento di cella in un intervallo Excel che contiene uno o più membri, tuple o insiemi inclusi nell'insieme."
			},
			caption: {
				name: "Didascalia",
				detail: "Opzionale. Stringa di testo visualizzata nella cella in sostituzione della didascalia del cubo, se ne è stata definita una."
			},
			sortOrder: {
				name: "Sort_order",
				detail: "Opzionale. Tipo di ordinamento da seguire, se presente, e può essere uno tra quelli seguenti:"
			},
			sortBy: {
				name: "Sort_by",
				detail: "Opzionale. Una stringa di testo del valore di ordinamento. Ad esempio, per ottenere la città con le vendite maggiori, espressione_insieme sarà un insieme di città e ordina_per sarà la misura delle vendite. In alternativa, per ottenere la città più densamente popolata, espressione_insieme sarà un insieme di città e ordina_per sarà la misura della popolazione. Se ordinamento richiede ordina_per e questo viene omesso, SET.CUBO restituirà il messaggio di errore #VALORE! ."
			}
		}
	},
	CUBESETCOUNT: {
		description: "Restituisce il numero di elementi di un insieme.",
		abstract: "Restituisce il numero di elementi di un insieme.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/cubesetcount-function"
		}],
		functionParameter: { set: {
			name: "Impostare",
			detail: "Obbligatorio. Stringa di testo di un'espressione Microsoft Excel che restituisce un insieme definito dalla funzione SET.CUBO. Può essere anche costituito dalla funzione SET.CUBO o da un riferimento a una cella che contiene tale funzione."
		} }
	},
	CUBEVALUE: {
		description: "Restituisce un valore aggregato dal cubo.",
		abstract: "Restituisce un valore aggregato dal cubo.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/cubevalue-function"
		}],
		functionParameter: {
			connection: {
				name: "Connessione",
				detail: "Obbligatorio. Stringa di testo che si riferisce al nome della connessione al cubo."
			},
			memberExpression: {
				name: "Espressione_membro",
				detail: "Opzionale. Stringa di testo di un'espressione multidimensionale (MDX) che restituisce un membro o una tupla all'interno del cubo. In alternativa, può essere un insieme definito mediante la funzione SET.CUBO. È possibile usare espressione_membro1 come filtro dei dati per la definizione della porzione del cubo per cui viene restituito il valore aggregato. Se in espressione_membro1 non viene specificata una misura, verrà usata la misura predefinita per il cubo."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/database/it-IT.ts
const locale$12 = {
	DAVERAGE: {
		description: "Calcola la media dei valori di un campo (colonna) di record in un elenco o database che soddisfano le condizioni specificate.",
		abstract: "Calcola la media dei valori di un campo (colonna) di record in un elenco o database che soddisfano le condizioni specificate.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/daverage-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "è l'intervallo di celle che costituisce l'elenco o il database. Un database è un elenco di dati correlati in cui le righe di informazioni correlate costituiscono i record e le colonne di dati i campi. La prima riga dell'elenco contiene le etichette relative a ciascuna colonna."
			},
			field: {
				name: "field",
				detail: "indica la colonna usata nella funzione. Immettere l'etichetta di colonna racchiusa tra virgolette doppie, quale \"Età\" o \"Rendimento\", oppure immettere un numero, senza racchiuderlo tra virgolette, che rappresenta la posizione della colonna nell'elenco, ovvero 1 per la prima colonna, 2 per la seconda colonna e così via."
			},
			criteria: {
				name: "criteria",
				detail: "è l'intervallo di celle che contiene le condizioni specificate. È possibile utilizzare qualsiasi intervallo per l'argomento di criteri, purché includa almeno un'etichetta di colonna e una cella sottostante l'etichetta di colonna in cui specificare una condizione per la colonna."
			}
		}
	},
	DCOUNT: {
		description: "Conta le celle che contengono numeri in un campo (colonna) di record di un elenco o database che soddisfano le condizioni specificate.",
		abstract: "Conta le celle che contengono numeri in un campo (colonna) di record di un elenco o database che soddisfano le condizioni specificate.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/dcount-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Obbligatorio. Intervallo di celle che costituisce l'elenco o il database. Un database è un elenco di dati correlati in cui le righe di informazioni correlate costituiscono i record e le colonne di dati i campi. La prima riga dell'elenco contiene le etichette relative a ciascuna colonna."
			},
			field: {
				name: "field",
				detail: "Obbligatorio. Indica quale colonna viene utilizzata nella funzione. Immettere l'etichetta di colonna racchiusa tra virgolette doppie, quale \"Età\" o \"Rendimento\", oppure immettere un numero, senza racchiuderlo tra virgolette, che rappresenta la posizione della colonna nell'elenco, ovvero 1 per la prima colonna, 2 per la seconda colonna e così via."
			},
			criteria: {
				name: "criteria",
				detail: "Obbligatorio. Intervallo di celle contenente le condizioni specificate. È possibile usare qualsiasi intervallo per l'argomento di criteri, purché l'argomento includa almeno un'etichetta di colonna e una cella sottostante l'etichetta di colonna in cui specificare una condizione per la colonna."
			}
		}
	},
	DCOUNTA: {
		description: "Conta le celle non vuote di un campo (colonna) di record di un elenco o database che soddisfano le condizioni specificate.",
		abstract: "Conta le celle non vuote di un campo (colonna) di record di un elenco o database che soddisfano le condizioni specificate.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/dcounta-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Obbligatorio. Intervallo di celle che costituisce l'elenco o il database. Un database è un elenco di dati correlati in cui le righe di informazioni correlate costituiscono i record e le colonne di dati i campi. La prima riga dell'elenco contiene le etichette relative a ciascuna colonna."
			},
			field: {
				name: "field",
				detail: "Opzionale. Indica quale colonna viene utilizzata nella funzione. Immettere l'etichetta di colonna racchiusa tra virgolette doppie, quale \"Età\" o \"Rendimento\", oppure immettere un numero, senza racchiuderlo tra virgolette, che rappresenta la posizione della colonna nell'elenco, ovvero 1 per la prima colonna, 2 per la seconda colonna e così via."
			},
			criteria: {
				name: "criteria",
				detail: "Obbligatorio. Intervallo di celle contenente le condizioni specificate. È possibile utilizzare qualsiasi intervallo per l'argomento di criteri, purché includa almeno un'etichetta di colonna e una cella sottostante l'etichetta di colonna in cui specificare una condizione per la colonna."
			}
		}
	},
	DGET: {
		description: "Estrae un singolo valore da una colonna di un elenco o database che soddisfa le condizioni specificate.",
		abstract: "Estrae un singolo valore da una colonna di un elenco o database che soddisfa le condizioni specificate.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/dget-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Obbligatorio. Intervallo di celle che costituisce l'elenco o il database. Un database è un elenco di dati correlati in cui le righe di informazioni correlate costituiscono i record e le colonne di dati i campi. La prima riga dell'elenco contiene le etichette relative a ciascuna colonna."
			},
			field: {
				name: "field",
				detail: "Obbligatorio. Indica quale colonna viene utilizzata nella funzione. Immettere l'etichetta di colonna racchiusa tra virgolette doppie, quale \"Età\" o \"Rendimento\", oppure immettere un numero, senza racchiuderlo tra virgolette, che rappresenta la posizione della colonna nell'elenco, ovvero 1 per la prima colonna, 2 per la seconda colonna e così via."
			},
			criteria: {
				name: "criteria",
				detail: "Obbligatorio. Intervallo di celle contenente le condizioni specificate. È possibile utilizzare qualsiasi intervallo per l'argomento di criteri, purché includa almeno un'etichetta di colonna e una cella sottostante l'etichetta di colonna in cui specificare una condizione per la colonna."
			}
		}
	},
	DMAX: {
		description: "Restituisce il numero più grande di un campo (colonna) di record di un elenco o database che soddisfa le condizioni specificate.",
		abstract: "Restituisce il numero più grande di un campo (colonna) di record di un elenco o database che soddisfa le condizioni specificate.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/dmax-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Obbligatorio. Intervallo di celle che costituisce l'elenco o il database. Un database è un elenco di dati correlati in cui le righe di informazioni correlate costituiscono i record e le colonne di dati i campi. La prima riga dell'elenco contiene le etichette relative a ciascuna colonna."
			},
			field: {
				name: "field",
				detail: "Obbligatorio. Indica quale colonna viene utilizzata nella funzione. Immettere l'etichetta di colonna racchiusa tra virgolette doppie, quale \"Età\" o \"Rendimento\", oppure immettere un numero, senza racchiuderlo tra virgolette, che rappresenta la posizione della colonna nell'elenco, ovvero 1 per la prima colonna, 2 per la seconda colonna e così via."
			},
			criteria: {
				name: "criteria",
				detail: "Obbligatorio. Intervallo di celle contenente le condizioni specificate. È possibile utilizzare qualsiasi intervallo per l'argomento di criteri, purché includa almeno un'etichetta di colonna e una cella sottostante l'etichetta di colonna in cui specificare una condizione per la colonna."
			}
		}
	},
	DMIN: {
		description: "Restituisce il numero più piccolo di un campo (colonna) di record di un elenco o database che soddisfa le condizioni specificate.",
		abstract: "Restituisce il numero più piccolo di un campo (colonna) di record di un elenco o database che soddisfa le condizioni specificate.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/dmin-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Obbligatorio. Intervallo di celle che costituisce l'elenco o il database. Un database è un elenco di dati correlati in cui le righe di informazioni correlate costituiscono i record e le colonne di dati i campi. La prima riga dell'elenco contiene le etichette relative a ciascuna colonna."
			},
			field: {
				name: "field",
				detail: "Obbligatorio. Indica quale colonna viene utilizzata nella funzione. Immettere l'etichetta di colonna racchiusa tra virgolette doppie, quale \"Età\" o \"Rendimento\", oppure immettere un numero, senza racchiuderlo tra virgolette, che rappresenta la posizione della colonna nell'elenco, ovvero 1 per la prima colonna, 2 per la seconda colonna e così via."
			},
			criteria: {
				name: "criteria",
				detail: "Obbligatorio. Intervallo di celle contenente le condizioni specificate. È possibile utilizzare qualsiasi intervallo per l'argomento di criteri, purché includa almeno un'etichetta di colonna e una cella sottostante l'etichetta di colonna in cui specificare una condizione per la colonna."
			}
		}
	},
	DPRODUCT: {
		description: "Moltiplica i valori di un campo (colonna) di record di un elenco o database che soddisfano le condizioni specificate.",
		abstract: "Moltiplica i valori di un campo (colonna) di record di un elenco o database che soddisfano le condizioni specificate.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/dproduct-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Obbligatorio. Intervallo di celle che costituisce l'elenco o il database. Un database è un elenco di dati correlati in cui le righe di informazioni correlate costituiscono i record e le colonne di dati i campi. La prima riga dell'elenco contiene le etichette relative a ciascuna colonna."
			},
			field: {
				name: "field",
				detail: "Obbligatorio. Indica quale colonna viene utilizzata nella funzione. Immettere l'etichetta di colonna racchiusa tra virgolette doppie, quale \"Età\" o \"Rendimento\", oppure immettere un numero, senza racchiuderlo tra virgolette, che rappresenta la posizione della colonna nell'elenco, ovvero 1 per la prima colonna, 2 per la seconda colonna e così via."
			},
			criteria: {
				name: "criteria",
				detail: "Obbligatorio. Intervallo di celle contenente le condizioni specificate. È possibile utilizzare qualsiasi intervallo per l'argomento di criteri, purché includa almeno un'etichetta di colonna e una cella sottostante l'etichetta di colonna in cui specificare una condizione per la colonna."
			}
		}
	},
	DSTDEV: {
		description: "Calcola la deviazione standard di una popolazione in base a un campione utilizzando i numeri di un campo (colonna) di record di un elenco o database che soddisfano le condizioni specificate.",
		abstract: "Calcola la deviazione standard di una popolazione in base a un campione utilizzando i numeri di un campo (colonna) di record di un elenco o database che soddisfano le condizioni specificate.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/dstdev-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Obbligatorio. Intervallo di celle che costituisce l'elenco o il database. Un database è un elenco di dati correlati in cui le righe di informazioni correlate costituiscono i record e le colonne di dati i campi. La prima riga dell'elenco contiene le etichette relative a ciascuna colonna."
			},
			field: {
				name: "field",
				detail: "Obbligatorio. Indica quale colonna viene utilizzata nella funzione. Immettere l'etichetta di colonna racchiusa tra virgolette doppie, quale \"Età\" o \"Rendimento\", oppure immettere un numero, senza racchiuderlo tra virgolette, che rappresenta la posizione della colonna nell'elenco, ovvero 1 per la prima colonna, 2 per la seconda colonna e così via."
			},
			criteria: {
				name: "criteria",
				detail: "Obbligatorio. Intervallo di celle contenente le condizioni specificate. È possibile utilizzare qualsiasi intervallo per l'argomento di criteri, purché includa almeno un'etichetta di colonna e una cella sottostante l'etichetta di colonna in cui specificare una condizione per la colonna."
			}
		}
	},
	DSTDEVP: {
		description: "Calcola la deviazione standard di una popolazione in base all'intera popolazione utilizzando i numeri di un campo (colonna) di record di un elenco o database che soddisfano le condizioni specificate.",
		abstract: "Calcola la deviazione standard di una popolazione in base all'intera popolazione utilizzando i numeri di un campo (colonna) di record di un elenco o database che soddisfano le condizioni specificate.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/dstdevp-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Obbligatorio. Intervallo di celle che costituisce l'elenco o il database. Un database è un elenco di dati correlati in cui le righe di informazioni correlate costituiscono i record e le colonne di dati i campi. La prima riga dell'elenco contiene le etichette relative a ciascuna colonna."
			},
			field: {
				name: "field",
				detail: "Obbligatorio. Indica quale colonna viene utilizzata nella funzione. Immettere l'etichetta di colonna racchiusa tra virgolette doppie, quale \"Età\" o \"Rendimento\", oppure immettere un numero, senza racchiuderlo tra virgolette, che rappresenta la posizione della colonna nell'elenco, ovvero 1 per la prima colonna, 2 per la seconda colonna e così via."
			},
			criteria: {
				name: "criteria",
				detail: "Obbligatorio. Intervallo di celle contenente le condizioni specificate. È possibile utilizzare qualsiasi intervallo per l'argomento di criteri, purché includa almeno un'etichetta di colonna e una cella sottostante l'etichetta di colonna in cui specificare una condizione per la colonna."
			}
		}
	},
	DSUM: {
		description: "In un elenco o database, DB.SOMMA fornisce la somma dei numeri nei campi (colonne) dei record che corrispondono alle condizioni specificate.",
		abstract: "In un elenco o database, DB.SOMMA fornisce la somma dei numeri nei campi (colonne) dei record che corrispondono alle condizioni specificate.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/dsum-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Obbligatorio. Questo è l'intervallo di celle che costituisce l'elenco o il database. Un database è un elenco di dati correlati in cui le righe di informazioni correlate sono record e le colonne di dati sono campi . La prima riga di un elenco contiene le etichette per ogni colonna contenuta."
			},
			field: {
				name: "field",
				detail: "Obbligatorio. Specifica quale colonna viene usata nella funzione. Specificare l'etichetta di colonna racchiusa tra virgolette doppie, ad esempio \"Età\" o \"Rendimento\". In alternativa, è possibile specificare un numero, senza virgolette, che rappresenta la posizione della colonna all'interno dell'elenco, ad esempio 1 per la prima colonna, 2 per la seconda colonna e così via."
			},
			criteria: {
				name: "criteria",
				detail: "Obbligatorio. Questo è l'intervallo di celle che contiene le condizioni specificate. È possibile utilizzare qualsiasi intervallo per l'argomento di criteri, purché includa almeno un'etichetta di colonna e una cella sottostante l'etichetta di colonna in cui specificare una condizione per la colonna."
			}
		}
	},
	DVAR: {
		description: "Calcola la varianza di una popolazione sulla base di un campione utilizzando i numeri di un campo (colonna) di record di un elenco o database che soddisfano le condizioni specificate.",
		abstract: "Calcola la varianza di una popolazione sulla base di un campione utilizzando i numeri di un campo (colonna) di record di un elenco o database che soddisfano le condizioni specificate.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/dvar-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Obbligatorio. Intervallo di celle che costituisce l'elenco o il database. Un database è un elenco di dati correlati in cui le righe di informazioni correlate costituiscono i record e le colonne di dati i campi. La prima riga dell'elenco contiene le etichette relative a ciascuna colonna."
			},
			field: {
				name: "field",
				detail: "Obbligatorio. Indica quale colonna viene utilizzata nella funzione. Immettere l'etichetta di colonna racchiusa tra virgolette doppie, quale \"Età\" o \"Rendimento\", oppure immettere un numero, senza racchiuderlo tra virgolette, che rappresenta la posizione della colonna nell'elenco, ovvero 1 per la prima colonna, 2 per la seconda colonna e così via."
			},
			criteria: {
				name: "criteria",
				detail: "Obbligatorio. Intervallo di celle contenente le condizioni specificate. È possibile utilizzare qualsiasi intervallo per l'argomento di criteri, purché includa almeno un'etichetta di colonna e una cella sottostante l'etichetta di colonna in cui specificare una condizione per la colonna."
			}
		}
	},
	DVARP: {
		description: "Calcola la varianza di una popolazione sulla base dell'intera popolazione utilizzando i numeri di un campo (colonna) di record di un elenco o database che soddisfano i criteri specificati.",
		abstract: "Calcola la varianza di una popolazione sulla base dell'intera popolazione utilizzando i numeri di un campo (colonna) di record di un elenco o database che soddisfano i criteri specificati.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/dvarp-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Obbligatorio. Intervallo di celle che costituisce l'elenco o il database. Un database è un elenco di dati correlati in cui le righe di informazioni correlate costituiscono i record e le colonne di dati i campi. La prima riga dell'elenco contiene le etichette relative a ciascuna colonna."
			},
			field: {
				name: "field",
				detail: "Obbligatorio. Indica quale colonna viene utilizzata nella funzione. Immettere l'etichetta di colonna racchiusa tra virgolette doppie, quale \"Età\" o \"Rendimento\", oppure immettere un numero, senza racchiuderlo tra virgolette, che rappresenta la posizione della colonna nell'elenco, ovvero 1 per la prima colonna, 2 per la seconda colonna e così via."
			},
			criteria: {
				name: "criteria",
				detail: "Obbligatorio. Intervallo di celle contenente le condizioni specificate. È possibile utilizzare qualsiasi intervallo per l'argomento di criteri, purché includa almeno un'etichetta di colonna e una cella sottostante l'etichetta di colonna in cui specificare una condizione per la colonna."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/date/it-IT.ts
const locale$11 = {
	DATE: {
		description: "La funzione DATA restituisce il numero seriale sequenziale che rappresenta una data specifica.",
		abstract: "La funzione DATA restituisce il numero seriale sequenziale che rappresenta una data specifica.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/date-function"
		}],
		functionParameter: {
			year: {
				name: "year",
				detail: "Il valore dell'argomento anno può contenere da una a quattro cifre. Excel lo interpreta in base al sistema di date del computer; per impostazione predefinita, Univer usa il sistema di date 1900."
			},
			month: {
				name: "month",
				detail: "Un numero intero positivo o negativo che rappresenta il mese dell'anno da 1 a 12, da gennaio a dicembre."
			},
			day: {
				name: "day",
				detail: "Un numero intero positivo o negativo che rappresenta il giorno del mese da 1 a 31."
			}
		}
	},
	DATEDIF: {
		description: "Calcola il numero di giorni, mesi o anni tra due date.",
		abstract: "Calcola il numero di giorni, mesi o anni tra due date.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/datedif-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Data che rappresenta la prima o la data iniziale di un determinato periodo. Le date possono essere specificate come stringhe di testo racchiuse tra virgolette, ad esempio \"30/1/2001\", come numeri seriali, ad esempio 36921, che rappresenta il 30 gennaio 2001 se si usa il sistema data 1900, o come risultati di altre formule o funzioni, ad esempio DATA.VALORE(\"30/1/2001\")."
			},
			endDate: {
				name: "end_date",
				detail: "Data che rappresenta l'ultima data, o data finale, del periodo."
			},
			unit: {
				name: "Unità",
				detail: "Tipo di informazioni che si desidera vengano restituite, dove: Unit****Returns \" Y \"Numero di anni completi nel periodo. M \"Numero di mesi completi nel periodo\". D \"Numero di giorni nel periodo\". MD \"Differenza tra i giorni di start_date e end_date. Vengono ignorati i mesi e gli anni delle date. Importante: Non è consigliabile usare l'argomento \"MD\", perché contiene limitazioni note. Vedere la sezione problemi noti riportata di seguito\". YM \"Differenza tra i mesi in start_date e end_date. I giorni e gli anni delle date vengono ignorati\" YD \"La differenza tra i giorni di start_date e end_date. Vengono ignorati gli anni delle date."
			}
		}
	},
	DATEVALUE: {
		description: "La funzione DATA.VALORE converte una data memorizzata come testo in un numero seriale riconosciuto da Excel come data. La formula =DATA.VALORE(\"01/01/2008\") ad esempio restituisce 39448, ovvero il numero seriale della data 01/01/2008. Tuttavia, tenere presente che in base all'impostazione della data di sistema nel computer in uso, i risultati della funzione DATA.VALORE possono variare rispetto a questo esempio.",
		abstract: "La funzione DATA.VALORE converte una data memorizzata come testo in un numero seriale riconosciuto da Excel come data. La formula =DATA.VALORE(\"01/01/2008\") ad esempio restituisce 39448, ovvero il numero seriale della data 01/01/2008. Tuttavia, tenere presente che in base all'impostazione della data di sistema nel computer in uso, i risultati della funzione DATA.VALORE possono variare rispetto a questo esempio.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/datevalue-function"
		}],
		functionParameter: { dateText: {
			name: "date_text",
			detail: "Obbligatorio. Testo che rappresenta una data in un formato di data di Excel oppure riferimento a una cella contenente testo che rappresenta una data in un formato di data di Excel. \"30/01/2008\" o \"30-gen-2008\" ad esempio sono stringhe di testo racchiuse tra virgolette che rappresentano date. Usando il sistema data predefinito in Microsoft Excel per Windows, l'argomento date_text deve rappresentare una data compresa tra il 1° gennaio 1900 e il 31 dicembre 9999. La funzione DATA.VALORE restituisce il #VALUE! se il valore dell'argomento date_text non rientra in questo intervallo. Se la parte relativa all'anno dell'argomento date_text viene omesso, la funzione DATA.VALORE usa l'anno corrente dell'orologio predefinito del computer. Le informazioni relative all'ora nell'argomento date_text vengono ignorate."
		} }
	},
	DAY: {
		description: "Restituisce il giorno di una data rappresentata da un numero seriale. I giorni vengono rappresentati con numeri interi compresi tra 1 e 31.",
		abstract: "Restituisce il giorno di una data rappresentata da un numero seriale. I giorni vengono rappresentati con numeri interi compresi tra 1 e 31.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/day-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Obbligatorio. Data del giorno da trovare. Le date devono essere immesse usando la funzione DATA o devono essere il risultato di altre formule o funzioni. Usare, ad esempio, DATA(2008;5;23) per il 23 maggio 2008. Potrebbero verificarsi problemi se le date vengono immesse come testo ."
		} }
	},
	DAYS: {
		description: "Restituisce il numero di giorni compresi tra due date.",
		abstract: "Restituisce il numero di giorni compresi tra due date.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/days-function"
		}],
		functionParameter: {
			endDate: {
				name: "end_date",
				detail: "Obbligatorio. Data_inizio e data_fine sono le due date che delimitano il numero di giorni da trovare."
			},
			startDate: {
				name: "start_date",
				detail: "Obbligatorio. Data_inizio e data_fine sono le due date che delimitano il numero di giorni da trovare."
			}
		}
	},
	DAYS360: {
		description: "La funzione GIORNO360 restituisce il numero di giorni compresi tra due date sulla base di un anno di 360 giorni (dodici mesi di 30 giorni), usato in alcuni sistemi di contabilità. Usare questa funzione per facilitare il calcolo dei pagamenti qualora il sistema di contabilità si basi su 12 mesi di 30 giorni.",
		abstract: "La funzione GIORNO360 restituisce il numero di giorni compresi tra due date sulla base di un anno di 360 giorni (dodici mesi di 30 giorni), usato in alcuni sistemi di contabilità. Usare questa funzione per facilitare il calcolo dei pagamenti qualora il sistema di contabilità si basi su 12 mesi di 30 giorni.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/days360-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Le due date tra le quali si desidera conoscere il numero di giorni."
			},
			endDate: {
				name: "end_date",
				detail: "Le due date tra le quali si desidera conoscere il numero di giorni."
			},
			method: {
				name: "method",
				detail: "Valore logico che specifica se usare il metodo statunitense o europeo nel calcolo."
			}
		}
	},
	EDATE: {
		description: "Restituisce il numero seriale che rappresenta la data che cade il numero di mesi indicato prima o dopo la data specificata in data_iniziale. Utilizzare la funzione DATA.MESE per calcolare le date di scadenza che cadono nello stesso giorno del mese della data di emissione.",
		abstract: "Restituisce il numero seriale che rappresenta la data che cade il numero di mesi indicato prima o dopo la data specificata in data_iniziale. Utilizzare la funzione DATA.MESE per calcolare le date di scadenza che cadono nello stesso giorno del mese della data di emissione.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/edate-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Obbligatorio. Data che rappresenta la data di inizio. Le date devono essere immesse usando la funzione DATA o devono essere il risultato di altre formule o funzioni. Usare, ad esempio, DATA(2008;5;23) per il 23 maggio 2008. Potrebbero verificarsi problemi se le date vengono immesse come testo ."
			},
			months: {
				name: "months",
				detail: "Obbligatorio. Numero di mesi precedenti o successivi a data_iniziale. Un valore positivo per mesi indica una data futura, mentre un valore negativo corrisponde a una data anteriore."
			}
		}
	},
	EOMONTH: {
		description: "Restituisce il numero seriale dell'ultimo giorno del mese, vale a dire il numero indicato di mesi precedenti o successivi a data_iniziale. Utilizzare la funzione FINE.MESE per calcolare le scadenze che cadono nell'ultimo giorno del mese.",
		abstract: "Restituisce il numero seriale dell'ultimo giorno del mese, vale a dire il numero indicato di mesi precedenti o successivi a data_iniziale. Utilizzare la funzione FINE.MESE per calcolare le scadenze che cadono nell'ultimo giorno del mese.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/eomonth-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Obbligatorio. Data che rappresenta la data di inizio. Le date devono essere immesse usando la funzione DATA o devono essere il risultato di altre formule o funzioni. Usare, ad esempio, DATA(2008;5;23) per il 23 maggio 2008. Potrebbero verificarsi problemi se le date vengono immesse come testo ."
			},
			months: {
				name: "months",
				detail: "Obbligatorio. Numero di mesi precedenti o successivi a data_iniziale. Un valore positivo per mesi indica una data futura, mentre un valore negativo corrisponde a una data anteriore. Nota Se mesi non è un numero intero, la parte decimale verrà troncata."
			}
		}
	},
	EPOCHTODATE: {
		description: "Converte un timestamp Unix epoch espresso in secondi, millisecondi o microsecondi in una data e ora nel Tempo Coordinato Universale (UTC).",
		abstract: "Converte un timestamp Unix epoch espresso in secondi, millisecondi o microsecondi in una data e ora nel Tempo Coordinato Universale (UTC).",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/13193461?hl=it"
		}],
		functionParameter: {
			timestamp: {
				name: "timestamp",
				detail: "Timestamp Unix epoch in secondi, millisecondi o microsecondi."
			},
			unit: {
				name: "unit",
				detail: "[FACOLTATIVO — 1 per impostazione predefinita]: l'unità di tempo in cui è espresso il timestamp."
			}
		}
	},
	HOUR: {
		description: "Restituisce l'ora di un valore di ora. L'ora viene espressa come numero intero, compreso tra 0 (12:00) e 23 (23:00).",
		abstract: "Restituisce l'ora di un valore di ora. L'ora viene espressa come numero intero, compreso tra 0 (12:00) e 23 (23:00).",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/hour-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Obbligatorio. Orario che contiene l'ora che si desidera trovare. Gli orari possono essere immessi come stringhe di testo racchiuse tra virgolette, ad esempio \"18.45\", come numeri decimali, ad esempio 0,78125 che rappresenta 18.45, oppure come risultati di altre formule o funzioni, ad esempio ORARIO.VALORE(\"18.45\")."
		} }
	},
	ISOWEEKNUM: {
		description: "Restituisce il numero della settimana ISO dell'anno per una data specificata.",
		abstract: "Restituisce il numero della settimana ISO dell'anno per una data specificata.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/isoweeknum-function"
		}],
		functionParameter: { date: {
			name: "date",
			detail: "Obbligatorio. L'argomento data è il codice di data-ora usato da Excel per il calcolo della data e dell'ora."
		} }
	},
	MINUTE: {
		description: "Restituisce i minuti di un valore ora. I minuti vengono espressi con un numero intero compreso tra 0 e 59.",
		abstract: "Restituisce i minuti di un valore ora. I minuti vengono espressi con un numero intero compreso tra 0 e 59.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/minute-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Obbligatorio. Orario che contiene il minuto che si desidera trovare. Gli orari possono essere immessi come stringhe di testo racchiuse tra virgolette, ad esempio \"18.45\", come numeri decimali, ad esempio 0,78125 che rappresenta 18.45, oppure come risultati di altre formule o funzioni, ad esempio ORARIO.VALORE(\"18.45\")."
		} }
	},
	MONTH: {
		description: "Restituisce il mese di una data rappresentata da un numero seriale. Il mese viene espresso con un numero intero compreso tra 1, corrispondente a gennaio, e 12, corrispondente a dicembre.",
		abstract: "Restituisce il mese di una data rappresentata da un numero seriale. Il mese viene espresso con un numero intero compreso tra 1, corrispondente a gennaio, e 12, corrispondente a dicembre.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/month-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Obbligatorio. Data del mese da trovare. Le date devono essere immesse usando la funzione DATA o devono essere il risultato di altre formule o funzioni. Usare, ad esempio, DATA(2008;5;23) per il 23 maggio 2008. Potrebbero verificarsi problemi se le date vengono immesse come testo ."
		} }
	},
	NETWORKDAYS: {
		description: "Restituisce il numero di tutti i giorni lavorativi compresi tra data_iniziale e data_finale. I giorni lavorativi non comprendono i fine settimana e le festività. Utilizzare GIORNI.LAVORATIVI.TOT per calcolare le indennità dei dipendenti che vengono maturate in base al numero di giorni lavorativi compresi in un determinato periodo di tempo.",
		abstract: "Restituisce il numero di tutti i giorni lavorativi compresi tra data_iniziale e data_finale. I giorni lavorativi non comprendono i fine settimana e le festività. Utilizzare GIORNI.LAVORATIVI.TOT per calcolare le indennità dei dipendenti che vengono maturate in base al numero di giorni lavorativi compresi in un determinato periodo di tempo.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/networkdays-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Obbligatorio. Data che rappresenta la data di inizio."
			},
			endDate: {
				name: "end_date",
				detail: "Obbligatorio. Data che rappresenta la data finale."
			},
			holidays: {
				name: "holidays",
				detail: "Opzionale. Intervallo opzionale di una o più date da escludere dal calendario lavorativo. L'elenco può essere composto da un intervallo di celle contenenti le date o da una costante di matrice dei numeri seriali che rappresentano le date."
			}
		}
	},
	NETWORKDAYS_INTL: {
		description: "Restituisce il numero di tutti i giorni lavorativi compresi fra due date utilizzando parametri per indicare quali e quanti giorni sono giorni festivi. I giorni festivi e i giorni indicati come festività non sono considerati giorni lavorativi.",
		abstract: "Restituisce il numero di tutti i giorni lavorativi compresi fra due date utilizzando parametri per indicare quali e quanti giorni sono giorni festivi. I giorni festivi e i giorni indicati come festività non sono considerati giorni lavorativi.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/networkdays-intl-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Data che rappresenta la data di inizio."
			},
			endDate: {
				name: "end_date",
				detail: "Data che rappresenta la data di fine."
			},
			weekend: {
				name: "weekend",
				detail: "Numero o stringa che specifica quando ricorrono i fine settimana."
			},
			holidays: {
				name: "holidays",
				detail: "Intervallo facoltativo di una o più date da escludere dal calendario lavorativo, ad esempio festività nazionali, regionali o mobili."
			}
		}
	},
	NOW: {
		description: "Restituisce il numero seriale della data e dell'ora correnti. Se prima dell'immissione della funzione il formato di cella era Generale , verrà modificato in modo che corrisponda al formato di data e ora delle impostazioni internazionali. È possibile cambiare il formato di data e ora della cella utilizzando i comandi del gruppo Numeri nella scheda Home della barra multifunzione.",
		abstract: "Restituisce il numero seriale della data e dell'ora correnti. Se prima dell'immissione della funzione il formato di cella era Generale , verrà modificato in modo che corrisponda al formato di data e ora delle impostazioni internazionali. È possibile cambiare il formato di data e ora della cella utilizzando i comandi del gruppo Numeri nella scheda Home della barra multifunzione.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/now-function"
		}],
		functionParameter: {}
	},
	SECOND: {
		description: "Restituisce i secondi di un valore ora. I secondi vengono espressi con un numero intero compreso tra 0 e 59.",
		abstract: "Restituisce i secondi di un valore ora. I secondi vengono espressi con un numero intero compreso tra 0 e 59.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/second-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Obbligatorio. Orario che contiene i secondi che si desidera trovare. Gli orari possono essere immessi come stringhe di testo racchiuse tra virgolette, ad esempio \"18.45\", come numeri decimali, ad esempio 0,78125 che rappresenta 18.45, oppure come risultati di altre formule o funzioni, ad esempio ORARIO.VALORE(\"18.45\")."
		} }
	},
	TIME: {
		description: "Restituisce il numero decimale di un'ora specifica. Se prima dell'immissione della funzione il formato di cella era Generale , il risultato viene formattato come una data.",
		abstract: "Restituisce il numero decimale di un'ora specifica. Se prima dell'immissione della funzione il formato di cella era Generale , il risultato viene formattato come una data.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/time-function"
		}],
		functionParameter: {
			hour: {
				name: "hour",
				detail: "Obbligatorio. Numero compreso tra 0 e 32767 che rappresenta l'ora. Qualsiasi valore maggiore di 23 verrà diviso per 24 e il resto verrà considerato come il valore dell'ora. Ad esempio, ORARIO(27;0;0) = ORARIO(3;0;0) = 0,125 o 3.00."
			},
			minute: {
				name: "minute",
				detail: "Obbligatorio. Numero compreso tra 0 e 32767 che rappresenta i minuti. Qualsiasi valore maggiore di 59 verrà convertito in ore e minuti. Ad esempio, ORARIO(0;750;0) = ORARIO(12;30;0) = 0,520833 o 12.30."
			},
			second: {
				name: "second",
				detail: "Obbligatorio. Numero compreso tra 0 e 32767 che rappresenta i secondi. Qualsiasi valore maggiore di 59 verrà convertito in ore, minuti e secondi. Ad esempio, ORARIO(0;0;2000) = ORARIO(0;33;22) = 0,023148 o 12.33.20."
			}
		}
	},
	TIMEVALUE: {
		description: "Restituisce il numero decimale dell'ora rappresentata da una stringa di testo. Il numero decimale è un valore compreso tra 0 e 0,99988426 indicante un'ora tra le 0.00.00 e le 23.59.59.",
		abstract: "Restituisce il numero decimale dell'ora rappresentata da una stringa di testo. Il numero decimale è un valore compreso tra 0 e 0,99988426 indicante un'ora tra le 0.00.00 e le 23.59.59.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/timevalue-function"
		}],
		functionParameter: { timeText: {
			name: "time_text",
			detail: "Obbligatorio. Stringa di testo che rappresenta un'ora in uno dei formati ora disponibili in Microsoft Excel, ad esempio la stringa di testo \"18.45\" racchiusa tra virgolette che rappresenta l'ora."
		} }
	},
	TO_DATE: {
		description: "Converte un numero specificato in una data.",
		abstract: "Converte un numero specificato in una data.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3094239?hl=it"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Argomento o riferimento a una cella da convertire in data. Se è numerico, viene interpretato come numero di giorni dal 30 dicembre 1899; i valori negativi sono giorni precedenti e le frazioni indicano l'ora dopo la mezzanotte. I valori non numerici vengono restituiti senza modifiche."
		} }
	},
	TODAY: {
		description: "La funzione OGGI restituisce il numero seriale della data corrente. Il numero seriale è il codice data-ora usato da Excel per il calcolo della data e dell'ora. Se prima dell'immissione della funzione il formato di cella era Generale , il formato passerà a Data . Se si desidera visualizzare il numero seriale, sarà necessario impostare il formato di cella su Generale o Numero .",
		abstract: "La funzione OGGI restituisce il numero seriale della data corrente. Il numero seriale è il codice data-ora usato da Excel per il calcolo della data e dell'ora. Se prima dell'immissione della funzione il formato di cella era Generale , il formato passerà a Data . Se si desidera visualizzare il numero seriale, sarà necessario impostare il formato di cella su Generale o Numero .",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/today-function"
		}],
		functionParameter: {}
	},
	WEEKDAY: {
		description: "Restituisce il giorno della settimana corrispondente a una data. In base all'impostazione predefinita, i giorni vengono espressi con un numero intero compreso tra 1, domenica, e 7, sabato.",
		abstract: "Restituisce il giorno della settimana corrispondente a una data. In base all'impostazione predefinita, i giorni vengono espressi con un numero intero compreso tra 1, domenica, e 7, sabato.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/weekday-function"
		}],
		functionParameter: {
			serialNumber: {
				name: "serial_number",
				detail: "Obbligatorio. Numero sequenziale che rappresenta la data del giorno che si desidera trovare. Le date devono essere immesse utilizzando la funzione DATA o devono essere il risultato di altre formule o funzioni. Usare ad esempio DATA(2008;5;23) per il 23 maggio 2008. Possono verificarsi dei problemi se le date vengono immesse come testo."
			},
			returnType: {
				name: "return_type",
				detail: "Opzionale. Numero che determina il tipo di valore restituito."
			}
		}
	},
	WEEKNUM: {
		description: "Restituisce il numero della settimana per una data specifica. La settimana che contiene la data 1 gennaio, ad esempio, è la prima dell'anno e il numero della settimana è 1.",
		abstract: "Restituisce il numero della settimana per una data specifica. La settimana che contiene la data 1 gennaio, ad esempio, è la prima dell'anno e il numero della settimana è 1.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/weeknum-function"
		}],
		functionParameter: {
			serialNumber: {
				name: "serial_number",
				detail: "Obbligatorio. Data della settimana. Le date devono essere immesse utilizzando la funzione DATA o devono essere il risultato di altre formule o funzioni. Usare ad esempio DATA(2008;5;23) per il 23 maggio 2008. Possono verificarsi dei problemi se le date vengono immesse come testo."
			},
			returnType: {
				name: "return_type",
				detail: "Opzionale. Numero che determina il giorno di inizio della settimana. Il valore predefinito è 1."
			}
		}
	},
	WORKDAY: {
		description: "Restituisce un numero che rappresenta una data che precede o segue un'altra data, ovvero la data iniziale, di un numero di giorni specificato. I giorni lavorativi non includono i fine settimana o le festività. Utilizzare GIORNO.LAVORATIVO per escludere i fine settimana e le festività quando si calcolano le date di scadenza delle fatture, le date di consegna previste o il numero di giornate lavorative effettuate.",
		abstract: "Restituisce un numero che rappresenta una data che precede o segue un'altra data, ovvero la data iniziale, di un numero di giorni specificato. I giorni lavorativi non includono i fine settimana o le festività. Utilizzare GIORNO.LAVORATIVO per escludere i fine settimana e le festività quando si calcolano le date di scadenza delle fatture, le date di consegna previste o il numero di giornate lavorative effettuate.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/workday-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Obbligatorio. Data che rappresenta la data di inizio."
			},
			days: {
				name: "days",
				detail: "Obbligatorio. Numero dei giorni che precedono o seguono data_iniziale, esclusi i fine settimana e le festività. Un valore positivo per giorni indica una data futura, mentre un valore negativo corrisponde a una data anteriore."
			},
			holidays: {
				name: "holidays",
				detail: "Opzionale. Elenco di una o più date da escludere dal calendario lavorativo. L'elenco può essere composto da un intervallo di celle contenenti le date o da una costante di matrice dei numeri seriali che rappresentano le date."
			}
		}
	},
	WORKDAY_INTL: {
		description: "Questa funzione restituisce il numero seriale della data precedente o successiva a un numero specificato di giorni lavorativi con parametri personalizzati per i fine settimana. I parametri facoltativi festivi possono indicare quali e quanti giorni sono giorni festivi. Si noti che i giorni festivi e i giorni specificati come festività non sono considerati giorni lavorativi.",
		abstract: "Questa funzione restituisce il numero seriale della data precedente o successiva a un numero specificato di giorni lavorativi con parametri personalizzati per i fine settimana. I parametri facoltativi festivi possono indicare quali e quanti giorni sono giorni festivi. Si noti che i giorni festivi e i giorni specificati come festività non sono considerati giorni lavorativi.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/workday-intl-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Obbligatorio. Data di inizio, troncata a un numero intero."
			},
			days: {
				name: "days",
				detail: "Obbligatorio. Numero di giorni lavorativi precedenti o successivi alla data_iniziale. Un valore positivo indica una data futura; un valore negativo indica una data passata; un valore zero indica la start_date già specificata . L'offset dei giorni viene troncato a un numero intero."
			},
			weekend: {
				name: "weekend",
				detail: "Opzionale. Se usato, indica i giorni della settimana che sono giorni festivi e non sono considerati giorni lavorativi. L'argomento fine settimana è un numero di festivi o una stringa che specifica quando si verificano i fine settimana. I valori numerici dei fine settimana indicano i giorni festivi come illustrato di seguito."
			},
			holidays: {
				name: "holidays",
				detail: "Questo argomento è facoltativo alla fine della sintassi. Specifica un set facoltativo di una o più date da escludere dal calendario lavorativo. Le festività sono un intervallo di celle contenenti le date o una costante di matrice dei valori seriali che rappresentano tali date. L'ordinamento delle date o i valori seriali delle vacanze possono essere arbitrari."
			}
		}
	},
	YEAR: {
		description: "Restituisce l'anno corrispondente a una data. Gli anni vengono restituiti come numeri interi compresi tra 1900 e 9999.",
		abstract: "Restituisce l'anno corrispondente a una data. Gli anni vengono restituiti come numeri interi compresi tra 1900 e 9999.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/year-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Obbligatorio. Data dell'anno da trovare. Le date devono essere immesse usando la funzione DATA o devono essere il risultato di altre formule o funzioni. Ad esempio, usare DATA(2025,5,23) per il 23 maggio 2025. È possibile che si verifichino problemi se le date vengono immesse come testo."
		} }
	},
	YEARFRAC: {
		description: "FRAZIONE.ANNO calcola la frazione dell'anno corrispondente al numero di giorni complessivi compresi tra due date ( data_iniziale e data_finale ). Ad esempio, utilizzare la funzione del foglio di lavoro FRAZIONE.ANNO per identificare la proporzione dei benefici o delle obbligazioni di un intero anno da assegnare a un termine specifico.",
		abstract: "FRAZIONE.ANNO calcola la frazione dell'anno corrispondente al numero di giorni complessivi compresi tra due date ( data_iniziale e data_finale ). Ad esempio, utilizzare la funzione del foglio di lavoro FRAZIONE.ANNO per identificare la proporzione dei benefici o delle obbligazioni di un intero anno da assegnare a un termine specifico.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/yearfrac-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Data che rappresenta la data di inizio."
			},
			endDate: {
				name: "end_date",
				detail: "Data che rappresenta la data di fine."
			},
			basis: {
				name: "basis",
				detail: "Tipo di base per il conteggio dei giorni da usare."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/engineering/it-IT.ts
const locale$10 = {
	BESSELI: {
		description: "Restituisce la funzione di Bessel modificata, che equivale alla funzione di Bessel calcolata in base ad argomenti del tutto immaginari.",
		abstract: "Restituisce la funzione di Bessel modificata, che equivale alla funzione di Bessel calcolata in base ad argomenti del tutto immaginari.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/besseli-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "Obbligatorio. Valore in cui calcolare la funzione."
			},
			n: {
				name: "N",
				detail: "Obbligatorio. Ordine della funzione di Bessel. Se n non è un numero intero, la parte decimale verrà troncata."
			}
		}
	},
	BESSELJ: {
		description: "Restituisce la funzione di Bessel Jn(x).",
		abstract: "Restituisce la funzione di Bessel Jn(x).",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/besselj-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "Obbligatorio. Valore in cui calcolare la funzione."
			},
			n: {
				name: "N",
				detail: "Obbligatorio. Ordine della funzione di Bessel. Se n non è un numero intero, la parte decimale verrà troncata."
			}
		}
	},
	BESSELK: {
		description: "Restituisce la funzione di Bessel modificata, che equivale alle funzioni di Bessel calcolate in base ad argomenti del tutto immaginari.",
		abstract: "Restituisce la funzione di Bessel modificata, che equivale alle funzioni di Bessel calcolate in base ad argomenti del tutto immaginari.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/besselk-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "Obbligatorio. Valore in cui calcolare la funzione."
			},
			n: {
				name: "N",
				detail: "Obbligatorio. Ordine della funzione. Se n non è un numero intero, la parte decimale verrà troncata."
			}
		}
	},
	BESSELY: {
		description: "Restituisce la funzione di Bessel, definita anche funzione di Weber o di Neumann.",
		abstract: "Restituisce la funzione di Bessel, definita anche funzione di Weber o di Neumann.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/bessely-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "Obbligatorio. Valore in cui calcolare la funzione."
			},
			n: {
				name: "N",
				detail: "Obbligatorio. Ordine della funzione. Se n non è un numero intero, la parte decimale verrà troncata."
			}
		}
	},
	BIN2DEC: {
		description: "Converte un numero binario in decimale.",
		abstract: "Converte un numero binario in decimale.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/bin2dec-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio. Numero binario che si desidera convertire. Num non può essere costituito da più di 10 caratteri, ovvero 10 bit. Il bit più significativo di num è il bit del segno. I rimanenti 9 bit sono i bit del valore da convertire. I numeri negativi vengono rappresentati sotto forma di notazione in complemento a due."
		} }
	},
	BIN2HEX: {
		description: "Converte un numero binario in esadecimale.",
		abstract: "Converte un numero binario in esadecimale.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/bin2hex-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. Numero binario che si desidera convertire. Num non può essere costituito da più di 10 caratteri, ovvero 10 bit. Il bit più significativo di num è il bit del segno. I rimanenti 9 bit sono i bit del valore da convertire. I numeri negativi vengono rappresentati sotto forma di notazione in complemento a due."
			},
			places: {
				name: "places",
				detail: "Opzionale. Numero di caratteri da utilizzare. Se cifre viene omesso, BINARIO.HEX utilizzerà il minor numero di caratteri necessario. Cifre è utile per aggiungere zeri iniziali al valore restituito."
			}
		}
	},
	BIN2OCT: {
		description: "Converte un numero binario in ottale.",
		abstract: "Converte un numero binario in ottale.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/bin2oct-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. Numero binario che si desidera convertire. Num non può essere costituito da più di 10 caratteri, ovvero 10 bit. Il bit più significativo di num è il bit del segno. I rimanenti 9 bit sono i bit del valore da convertire. I numeri negativi vengono rappresentati sotto forma di notazione in complemento a due."
			},
			places: {
				name: "places",
				detail: "Opzionale. Numero di caratteri da utilizzare. Se cifre viene omesso, BINARIO.OCT utilizzerà il minor numero di caratteri necessario. Cifre è utile per aggiungere zeri iniziali al valore restituito."
			}
		}
	},
	BITAND: {
		description: "Restituisce un confronto \"AND\" bit per bit di due numeri.",
		abstract: "Restituisce un confronto \"AND\" bit per bit di due numeri.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/bitand-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obbligatorio. Deve essere in formato decimale e maggiore o uguale a 0."
			},
			number2: {
				name: "number2",
				detail: "Obbligatorio. Deve essere in formato decimale e maggiore o uguale a 0."
			}
		}
	},
	BITLSHIFT: {
		description: "Restituisce un numero spostato a sinistra del numero di bit specificato.",
		abstract: "Restituisce un numero spostato a sinistra del numero di bit specificato.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/bitlshift-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. Deve essere un numero intero maggiore o uguale a 0."
			},
			shiftAmount: {
				name: "shift_amount",
				detail: "Obbligatorio. Deve essere un numero intero."
			}
		}
	},
	BITOR: {
		description: "Restituisce un confronto \"OR\" bit per bit di due numeri.",
		abstract: "Restituisce un confronto \"OR\" bit per bit di due numeri.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/bitor-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obbligatorio. Deve essere in formato decimale e maggiore o uguale a 0."
			},
			number2: {
				name: "number2",
				detail: "Obbligatorio. Deve essere in formato decimale e maggiore o uguale a 0."
			}
		}
	},
	BITRSHIFT: {
		description: "Restituisce un numero spostato a destra del numero di bit specificato.",
		abstract: "Restituisce un numero spostato a destra del numero di bit specificato.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/bitrshift-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. Deve essere un numero intero maggiore o uguale a 0."
			},
			shiftAmount: {
				name: "shift_amount",
				detail: "Obbligatorio. Deve essere un numero intero."
			}
		}
	},
	BITXOR: {
		description: "Restituisce uno 'XOR' bit per bit di due numeri.",
		abstract: "Restituisce uno 'XOR' bit per bit di due numeri.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/bitxor-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obbligatorio. Deve essere maggiore di o uguale a 0."
			},
			number2: {
				name: "number2",
				detail: "Obbligatorio. Deve essere maggiore di o uguale a 0."
			}
		}
	},
	COMPLEX: {
		description: "Converte la parte reale e il coefficiente dell'immaginario in un numero complesso di tipo x + yi o x + yj.",
		abstract: "Converte la parte reale e il coefficiente dell'immaginario in un numero complesso di tipo x + yi o x + yj.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/complex-function"
		}],
		functionParameter: {
			realNum: {
				name: "real_num",
				detail: "Obbligatorio. Parte reale del numero complesso."
			},
			iNum: {
				name: "i_num",
				detail: "Obbligatorio. Coefficiente immaginario del numero complesso."
			},
			suffix: {
				name: "suffix",
				detail: "Opzionale. Suffisso per la componente immaginaria del numero complesso. Se suffisso viene omesso, verrà considerato uguale a \"i\"."
			}
		}
	},
	CONVERT: {
		description: "Converte un numero da un sistema di unità di misura a un altro. Ad esempio, CONVERTI può convertire in chilometri una tabella di distanze espresse in miglia.",
		abstract: "Converte un numero da un sistema di unità di misura a un altro. Ad esempio, CONVERTI può convertire in chilometri una tabella di distanze espresse in miglia.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/convert-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Valore in from_unit da convertire."
			},
			fromUnit: {
				name: "from_unit",
				detail: "Unità di misura del numero."
			},
			toUnit: {
				name: "to_unit",
				detail: "Unità di misura del risultato."
			}
		}
	},
	DEC2BIN: {
		description: "Converte un numero decimale in binario.",
		abstract: "Converte un numero decimale in binario.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/dec2bin-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. L’intero decimale da convertire. Se num è negativo, i valori di posizione validi vengono ignorati e DEC2BIN restituisce un numero binario di 10 caratteri (10 bit) in cui il bit più significativo è il bit del segno. I rimanenti 9 bit sono i bit del valore da convertire. I numeri negativi vengono rappresentati sotto forma di notazione in complemento a due."
			},
			places: {
				name: "places",
				detail: "Facoltativo. Numero di caratteri da utilizzare. Se cifre viene omesso, DECIMALE.BINARIO utilizzerà il minor numero di caratteri necessario. Cifre è utile per aggiungere gli zeri iniziali al valore restituito."
			}
		}
	},
	DEC2HEX: {
		description: "Converte un numero decimale in esadecimale.",
		abstract: "Converte un numero decimale in esadecimale.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/dec2hex-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. L’intero decimale da convertire. Se num è negativo, cifre verrà ignorato e DEC2HEX restituirà un numero esadecimale di 10 caratteri (40 bit) in cui il bit più significativo è il bit del segno. I rimanenti 39 bit sono i bit del valore da convertire. I numeri negativi vengono rappresentati sotto forma di notazione in complemento a due."
			},
			places: {
				name: "places",
				detail: "Opzionale. Numero di caratteri da utilizzare. Se cifre viene omesso, DECIMALE.HEX utilizzerà il minor numero di caratteri necessario. Cifre è utile per aggiungere gli zeri iniziali al valore restituito."
			}
		}
	},
	DEC2OCT: {
		description: "Converte un numero decimale in ottale.",
		abstract: "Converte un numero decimale in ottale.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/dec2oct-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. L’intero decimale da convertire. Se num è negativo, le cifre verranno ignorate e DECIMALE.OCT restituirà un numero ottale (30 bit) di 10 caratteri in cui il bit più significativo è il bit sign. I rimanenti 29 bit sono i bit del valore da convertire. I numeri negativi vengono rappresentati sotto forma di notazione in complemento a due."
			},
			places: {
				name: "places",
				detail: "Facoltativo. Numero di caratteri da utilizzare. Se cifre viene omesso, DECIMALE.OCT utilizzerà il minor numero di caratteri necessario. Cifre è utile per aggiungere gli zeri iniziali al valore restituito."
			}
		}
	},
	DELTA: {
		description: "Verifica se due valori sono uguali. Restituisce 1 se num1 = num2, altrimenti restituisce 0. Utilizzare questa funzione per esaminare un insieme di valori. Se si sommano ad esempio più funzioni DELTA, si effettuerà il conteggio di coppie uguali. La funzione è anche nota come funzione Kronecker Delta.",
		abstract: "Verifica se due valori sono uguali. Restituisce 1 se num1 = num2, altrimenti restituisce 0. Utilizzare questa funzione per esaminare un insieme di valori. Se si sommano ad esempio più funzioni DELTA, si effettuerà il conteggio di coppie uguali. La funzione è anche nota come funzione Kronecker Delta.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/delta-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obbligatorio. Primo numero."
			},
			number2: {
				name: "number2",
				detail: "Opzionale. Secondo numero. Se num2 viene omesso, verrà considerato uguale a zero."
			}
		}
	},
	ERF: {
		description: "Restituisce la funzione di errore integrata tra limite_inf e limite_sup.",
		abstract: "Restituisce la funzione di errore integrata tra limite_inf e limite_sup.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/erf-function"
		}],
		functionParameter: {
			lowerLimit: {
				name: "lower_limit",
				detail: "Obbligatorio. Limite inferiore di integrazione per FUNZ.ERRORE."
			},
			upperLimit: {
				name: "upper_limit",
				detail: "Opzionale. Limite superiore di integrazione per FUNZ.ERRORE. Se viene omesso, FUNZ.ERRORE effettuerà l'integrazione tra zero e limite_inf."
			}
		}
	},
	ERF_PRECISE: {
		description: "Restituisce la funzione di errore.",
		abstract: "Restituisce la funzione di errore.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/erf-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Obbligatorio. Limite inferiore di integrazione per FUNZ.ERRORE.PRECISA."
		} }
	},
	ERFC: {
		description: "Restituisce la funzione FUNZ.ERRORE complementare integrata tra x e infinito.",
		abstract: "Restituisce la funzione FUNZ.ERRORE complementare integrata tra x e infinito.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/erfc-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Obbligatorio. Limite inferiore di integrazione per FUNZ.ERRORE.COMP."
		} }
	},
	ERFC_PRECISE: {
		description: "Restituisce la funzione FUNZ.ERRORE complementare integrata tra x e infinito.",
		abstract: "Restituisce la funzione FUNZ.ERRORE complementare integrata tra x e infinito.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/erfc-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Obbligatorio. Limite inferiore di integrazione per FUNZ.ERRORE.COMP.PRECISA."
		} }
	},
	GESTEP: {
		description: "Restituisce 1 se num ≥ val_soglia e 0 (zero) in caso contrario. Questa funzione consente di esaminare un insieme di valori. Sommando ad esempio più funzioni SOGLIA, è possibile effettuare il conteggio dei valori che superano una determinata soglia.",
		abstract: "Restituisce 1 se num ≥ val_soglia e 0 (zero) in caso contrario. Questa funzione consente di esaminare un insieme di valori. Sommando ad esempio più funzioni SOGLIA, è possibile effettuare il conteggio dei valori che superano una determinata soglia.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/gestep-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. Valore da confrontare con val_soglia."
			},
			step: {
				name: "step",
				detail: "Opzionale. Valore di soglia. Se si omette, SOGLIA userà il valore zero."
			}
		}
	},
	HEX2BIN: {
		description: "Converte un numero esadecimale in binario.",
		abstract: "Converte un numero esadecimale in binario.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/hex2bin-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. Numero esadecimale che si desidera convertire. Num non può essere costituito da più di 10 caratteri. Il bit più significativo di num è il bit del segno, ovvero il 40° bit da destra. I rimanenti 9 bit sono i bit del valore da convertire. I numeri negativi vengono rappresentati sotto forma di notazione in complemento a due."
			},
			places: {
				name: "places",
				detail: "Facoltativo. Numero di caratteri da utilizzare. Se cifre viene omesso, HEX.BINARIO utilizzerà il minor numero di caratteri necessario. Cifre è utile per aggiungere gli zeri iniziali al valore restituito."
			}
		}
	},
	HEX2DEC: {
		description: "Converte un numero esadecimale in decimale.",
		abstract: "Converte un numero esadecimale in decimale.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/hex2dec-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio. Numero esadecimale che si desidera convertire. Num non può essere costituito da più di 10 caratteri, ovvero 40 bit. Il bit più significativo di num è il bit del segno. I rimanenti 39 bit sono i bit del valore da convertire. I numeri negativi vengono rappresentati sotto forma di notazione in complemento a due."
		} }
	},
	HEX2OCT: {
		description: "Converte un numero esadecimale in ottale.",
		abstract: "Converte un numero esadecimale in ottale.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/hex2oct-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. Numero esadecimale che si desidera convertire. Num non può essere costituito da più di 10 caratteri. Il bit più significativo di num è il bit del segno. I rimanenti 39 bit sono i bit del valore da convertire. I numeri negativi vengono rappresentati sotto forma di notazione in complemento a due."
			},
			places: {
				name: "places",
				detail: "Facoltativo. Numero di caratteri da utilizzare. Se cifre viene omesso, HEX.OCT utilizzerà il minor numero di caratteri necessario. Cifre è utile per aggiungere gli zeri iniziali al valore restituito."
			}
		}
	},
	IMABS: {
		description: "Restituisce il valore assoluto (modulo) di un numero complesso in formato testo x + yi o x + yj.",
		abstract: "Restituisce il valore assoluto (modulo) di un numero complesso in formato testo x + yi o x + yj.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/imabs-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obbligatorio. Numero complesso del quale si desidera il valore assoluto."
		} }
	},
	IMAGINARY: {
		description: "Restituisce il coefficiente dell'immaginario di un numero complesso in formato testo x + yi o x + yj.",
		abstract: "Restituisce il coefficiente dell'immaginario di un numero complesso in formato testo x + yi o x + yj.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/imaginary-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obbligatorio. Numero complesso del quale si desidera il coefficiente dell'immaginario."
		} }
	},
	IMARGUMENT: {
		description: "Restituisce l'argomento ), un angolo espresso in radianti, in base al quale:",
		abstract: "Restituisce l'argomento ), un angolo espresso in radianti, in base al quale:",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/imargument-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obbligatorio. Numero complesso del quale si desidera l'argomento ."
		} }
	},
	IMCONJUGATE: {
		description: "Restituisce il complesso coniugato di un numero complesso in formato testo x + yi o x + yj.",
		abstract: "Restituisce il complesso coniugato di un numero complesso in formato testo x + yi o x + yj.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/imconjugate-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obbligatorio. Numero complesso del quale si desidera il coniugato."
		} }
	},
	IMCOS: {
		description: "Restituisce il coseno di un numero complesso in formato testo x + yi o x + yj.",
		abstract: "Restituisce il coseno di un numero complesso in formato testo x + yi o x + yj.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/imcos-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obbligatorio. Numero complesso del quale si desidera il coseno."
		} }
	},
	IMCOSH: {
		description: "Restituisce il coseno iperbolico di un numero complesso in formato testo x+yi o x+yj.",
		abstract: "Restituisce il coseno iperbolico di un numero complesso in formato testo x+yi o x+yj.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/imcosh-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obbligatorio. Numero complesso del quale si vuole calcolare il coseno iperbolico."
		} }
	},
	IMCOT: {
		description: "Restituisce la cotangente di un numero complesso in formato testo x+yi o x+yj.",
		abstract: "Restituisce la cotangente di un numero complesso in formato testo x+yi o x+yj.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/imcot-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Numero complesso di cui si desidera ottenere la cotangente."
		} }
	},
	IMCOTH: {
		description: "La funzione IMCOTH restituisce la cotangente iperbolica del numero complesso specificato. Ad esempio, per il numero complesso \"x+yi\" restituisce \"coth(x+yi)\".",
		abstract: "La funzione IMCOTH restituisce la cotangente iperbolica del numero complesso specificato. Ad esempio, per il numero complesso \"x+yi\" restituisce \"coth(x+yi)\".",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9366256?hl=it"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Numero complesso di cui si desidera ottenere la cotangente iperbolica. Può essere il risultato di COMPLESSO, un numero reale interpretato come complesso con parte immaginaria 0 o testo nel formato “x+yi”, in cui x e y sono numerici."
		} }
	},
	IMCSC: {
		description: "Restituisce la cosecante di un numero complesso in formato testo x+yi o x+yj.",
		abstract: "Restituisce la cosecante di un numero complesso in formato testo x+yi o x+yj.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/imcsc-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obbligatorio. Numero complesso del quale si vuole calcolare la cosecante."
		} }
	},
	IMCSCH: {
		description: "Restituisce la cosecante iperbolica di un numero complesso in formato testo x+yi o x+yj.",
		abstract: "Restituisce la cosecante iperbolica di un numero complesso in formato testo x+yi o x+yj.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/imcsch-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obbligatorio. Numero complesso del quale si vuole calcolare la cosecante iperbolica."
		} }
	},
	IMDIV: {
		description: "Restituisce il quoziente di due numeri complessi in formato testo x + yi o x + yj.",
		abstract: "Restituisce il quoziente di due numeri complessi in formato testo x + yi o x + yj.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/imdiv-function"
		}],
		functionParameter: {
			inumber1: {
				name: "inumber1",
				detail: "Obbligatorio. Numeratore o dividendo complesso."
			},
			inumber2: {
				name: "inumber2",
				detail: "Obbligatorio. Denominatore o divisore complesso."
			}
		}
	},
	IMEXP: {
		description: "Restituisce l'esponenziale di un numero complesso in formato testo x + yi o x + yj.",
		abstract: "Restituisce l'esponenziale di un numero complesso in formato testo x + yi o x + yj.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/imexp-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obbligatorio. Numero complesso del quale si desidera l'esponenziale."
		} }
	},
	IMLN: {
		description: "Restituisce il logaritmo naturale di un numero complesso in formato testo x + yi o x + yj.",
		abstract: "Restituisce il logaritmo naturale di un numero complesso in formato testo x + yi o x + yj.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/imln-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obbligatorio. Numero complesso del quale si desidera il logaritmo naturale."
		} }
	},
	IMLOG: {
		description: "La funzione IMLOG restituisce il logaritmo di un numero complesso per una base specificata.",
		abstract: "La funzione IMLOG restituisce il logaritmo di un numero complesso per una base specificata.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9366486?hl=it"
		}],
		functionParameter: {
			inumber: {
				name: "inumber",
				detail: "Valore di input della funzione logaritmo. Può essere scritto come numero semplice, ad esempio 1, interpretato come reale, oppure come testo tra virgolette che specifichi i coefficienti reale e immaginario."
			},
			base: {
				name: "base",
				detail: "Base da usare per calcolare il logaritmo. Deve essere un numero reale positivo."
			}
		}
	},
	IMLOG10: {
		description: "Restituisce il logaritmo in base 10 di un numero complesso in formato testo x + yi o x + yj.",
		abstract: "Restituisce il logaritmo in base 10 di un numero complesso in formato testo x + yi o x + yj.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/imlog10-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obbligatorio. Numero complesso del quale si desidera il logaritmo."
		} }
	},
	IMLOG2: {
		description: "Restituisce il logaritmo in base 2 di un numero complesso in formato testo x + yi o x + yj.",
		abstract: "Restituisce il logaritmo in base 2 di un numero complesso in formato testo x + yi o x + yj.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/imlog2-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obbligatorio. Numero complesso del quale si desidera il logaritmo in base 2."
		} }
	},
	IMPOWER: {
		description: "Restituisce un numero complesso in formato testo x + yi o x + yj elevato a una potenza.",
		abstract: "Restituisce un numero complesso in formato testo x + yi o x + yj elevato a una potenza.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/impower-function"
		}],
		functionParameter: {
			inumber: {
				name: "inumber",
				detail: "Obbligatorio. Numero complesso che si desidera elevare a potenza."
			},
			number: {
				name: "number",
				detail: "Obbligatorio. Potenza alla quale si desidera elevare il numero complesso."
			}
		}
	},
	IMPRODUCT: {
		description: "Restituisce il prodotto di 2 fino a 255 numeri complessi in formato testo x + yi o x + yj.",
		abstract: "Restituisce il prodotto di 2 fino a 255 numeri complessi in formato testo x + yi o x + yj.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/improduct-function"
		}],
		functionParameter: {
			inumber1: {
				name: "inumber1",
				detail: "Da 1 a 255 numeri complessi da moltiplicare."
			},
			inumber2: {
				name: "inumber2",
				detail: "Da 1 a 255 numeri complessi da moltiplicare."
			}
		}
	},
	IMREAL: {
		description: "Restituisce la parte reale di un numero complesso in formato testo x + yi o x + yj.",
		abstract: "Restituisce la parte reale di un numero complesso in formato testo x + yi o x + yj.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/imreal-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obbligatorio. Numero complesso del quale si desidera la parte reale."
		} }
	},
	IMSEC: {
		description: "Restituisce la secante di un numero complesso in formato testo x+yi o x+yj.",
		abstract: "Restituisce la secante di un numero complesso in formato testo x+yi o x+yj.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/imsec-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obbligatorio. Numero complesso del quale si vuole calcolare la secante."
		} }
	},
	IMSECH: {
		description: "Restituisce la secante iperbolica di un numero complesso in formato testo x+yi o x+yj.",
		abstract: "Restituisce la secante iperbolica di un numero complesso in formato testo x+yi o x+yj.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/imsech-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obbligatorio. Numero complesso del quale si vuole calcolare la secante iperbolica."
		} }
	},
	IMSIN: {
		description: "Restituisce il seno di un numero complesso in formato testo x + yi o x + yj.",
		abstract: "Restituisce il seno di un numero complesso in formato testo x + yi o x + yj.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/imsin-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obbligatorio. Numero complesso del quale si desidera il seno."
		} }
	},
	IMSINH: {
		description: "La funzione COMP.SENH restituisce il seno iperbolico di un numero complesso in formato testo x+yi o x+yj.",
		abstract: "La funzione COMP.SENH restituisce il seno iperbolico di un numero complesso in formato testo x+yi o x+yj.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/imsinh-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obbligatorio. Numero complesso del quale si vuole calcolare il seno iperbolico."
		} }
	},
	IMSQRT: {
		description: "Restituisce la radice quadrata di un numero complesso in formato testo x + yi o x + yj.",
		abstract: "Restituisce la radice quadrata di un numero complesso in formato testo x + yi o x + yj.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/imsqrt-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obbligatorio. Numero complesso del quale si desidera la radice quadrata."
		} }
	},
	IMSUB: {
		description: "Restituisce la differenza tra due numeri complessi in formato testo x + yi o x + yj.",
		abstract: "Restituisce la differenza tra due numeri complessi in formato testo x + yi o x + yj.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/imsub-function"
		}],
		functionParameter: {
			inumber1: {
				name: "inumber1",
				detail: "Obbligatorio. Numero complesso da cui si desidera sottrarre num_comp2."
			},
			inumber2: {
				name: "inumber2",
				detail: "Obbligatorio. Numero complesso da sottrarre da num_comp1."
			}
		}
	},
	IMSUM: {
		description: "Restituisce la somma di due o più numeri complessi in formato testo x + yi o x + yj.",
		abstract: "Restituisce la somma di due o più numeri complessi in formato testo x + yi o x + yj.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/imsum-function"
		}],
		functionParameter: {
			inumber1: {
				name: "inumber1",
				detail: "Num_comp1 è obbligatorio, i numeri successivi no. Da 1 a 255 numeri complessi da addizionare."
			},
			inumber2: {
				name: "inumber2",
				detail: "Num_comp1 è obbligatorio, i numeri successivi no. Da 1 a 255 numeri complessi da addizionare."
			}
		}
	},
	IMTAN: {
		description: "Restituisce la tangente di un numero complesso in formato testo x+yi o x+yj.",
		abstract: "Restituisce la tangente di un numero complesso in formato testo x+yi o x+yj.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/imtan-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obbligatorio. Numero complesso del quale si vuole calcolare la tangente."
		} }
	},
	IMTANH: {
		description: "La funzione IMTANH restituisce la tangente iperbolica del numero complesso specificato. Ad esempio, per il numero complesso \"x+yi\" restituisce \"tanh(x+yi)\".",
		abstract: "La funzione IMTANH restituisce la tangente iperbolica del numero complesso specificato. Ad esempio, per il numero complesso \"x+yi\" restituisce \"tanh(x+yi)\".",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9366655?hl=it"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Numero complesso di cui si desidera ottenere la tangente iperbolica. Può essere il risultato di COMPLESSO, un numero reale interpretato come complesso con parte immaginaria 0 o testo nel formato “x+yi”, in cui x e y sono numerici."
		} }
	},
	OCT2BIN: {
		description: "Converte un numero ottale in binario.",
		abstract: "Converte un numero ottale in binario.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/oct2bin-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. Numero ottale che si desidera convertire. Num non può essere costituito da più di 10 caratteri. Il bit più significativo di num è il bit del segno. I rimanenti 29 bit sono i bit del valore da convertire. I numeri negativi vengono rappresentati sotto forma di notazione in complemento a due."
			},
			places: {
				name: "places",
				detail: "Opzionale. Numero di caratteri da usare. Se cifre viene omesso, OCT.BINARIO userà il minor numero di caratteri necessario. Cifre è utile per aggiungere zeri iniziali al valore restituito."
			}
		}
	},
	OCT2DEC: {
		description: "Converte un numero ottale in decimale.",
		abstract: "Converte un numero ottale in decimale.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/oct2dec-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio. Numero ottale che si desidera convertire. Num non può essere costituito da più di 10 caratteri ottali, ovvero 30 bit. Il bit più significativo di num è il bit del segno. I rimanenti 29 bit sono i bit del valore da convertire. I numeri negativi vengono rappresentati sotto forma di notazione in complemento a due."
		} }
	},
	OCT2HEX: {
		description: "Converte un numero ottale in esadecimale.",
		abstract: "Converte un numero ottale in esadecimale.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/oct2hex-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. Numero ottale che si desidera convertire. Num non può essere costituito da più di 10 caratteri ottali, ovvero 30 bit. Il bit più significativo di num è il bit del segno. I rimanenti 29 bit sono i bit del valore da convertire. I numeri negativi vengono rappresentati sotto forma di notazione in complemento a due."
			},
			places: {
				name: "places",
				detail: "Facoltativo. Numero di caratteri da utilizzare. Se cifre viene omesso, OCT.HEX utilizzerà il minor numero di caratteri necessario. Cifre è utile per aggiungere gli zeri iniziali al valore restituito."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/financial/it-IT.ts
const locale$9 = {
	ACCRINT: {
		description: "Restituisce l'interesse maturato di un titolo che paga interessi periodici.",
		abstract: "Restituisce l'interesse maturato di un titolo che paga interessi periodici.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/accrint-function"
		}],
		functionParameter: {
			issue: {
				name: "issue",
				detail: "Obbligatorio. Data di emissione del titolo."
			},
			firstInterest: {
				name: "first_interest",
				detail: "Obbligatorio. Data della prima cedola."
			},
			settlement: {
				name: "settlement",
				detail: "Obbligatorio. Data di liquidazione del titolo. La data di liquidazione del titolo è la data, successiva alla data di emissione, in cui il titolo viene venduto al compratore."
			},
			rate: {
				name: "rate",
				detail: "Obbligatorio. Tasso di interesse annuo del titolo."
			},
			par: {
				name: "par",
				detail: "Obbligatorio. Valore nominale del titolo. Se viene omesso, INT.MATURATO.PER utilizzerà € 1.000."
			},
			frequency: {
				name: "frequency",
				detail: "Obbligatorio. Numero di pagamenti per anno. Se i pagamenti sono annuali, num_rate = 1; se sono semestrali, num_rate = 2; se sono trimestrali, num_rate = 4."
			},
			basis: {
				name: "basis",
				detail: "Opzionale. Tipo di base da utilizzare per il conteggio dei giorni."
			},
			calcMethod: {
				name: "calc_method",
				detail: "Opzionale. Valore logico che specifica come calcolare l'interesse maturato totale quando la data liquid è successiva alla data primo_int. Il valore VERO (1) restituisce l'interesse maturato totale da emiss a liquid. Il valore FALSO (0) restituisce l'interesse maturato da primo_int a liquid. Se non si immette l'argomento, verrà utilizzato per impostazione predefinita il valore VERO."
			}
		}
	},
	ACCRINTM: {
		description: "Restituisce l'interesse maturato di un titolo che paga interessi alla scadenza.",
		abstract: "Restituisce l'interesse maturato di un titolo che paga interessi alla scadenza.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/accrintm-function"
		}],
		functionParameter: {
			issue: {
				name: "issue",
				detail: "Obbligatorio. Data di emissione del titolo."
			},
			settlement: {
				name: "settlement",
				detail: "Obbligatorio. Data di scadenza del titolo."
			},
			rate: {
				name: "rate",
				detail: "Obbligatorio. Tasso di interesse annuo del titolo."
			},
			par: {
				name: "par",
				detail: "Obbligatorio. Valore nominale del titolo. Se val_nom viene omesso, INT.MATURATO.SCAD userà € 1.000."
			},
			basis: {
				name: "basis",
				detail: "Opzionale. Tipo di base da utilizzare per il conteggio dei giorni."
			}
		}
	},
	AMORDEGRC: {
		description: "Restituisce l'ammortamento per ogni periodo contabile. Questa funzione è fornita per il sistema contabile francese. Se un bene viene acquistato a metà del periodo, sarà preso in considerazione l'ammortamento ripartito proporzionalmente. Questa funzione è simile ad AMMORT.PER, tranne per il fatto che il coefficiente di deprezzamento viene applicato al calcolo a seconda della vita del bene.",
		abstract: "Restituisce l'ammortamento per ogni periodo contabile. Questa funzione è fornita per il sistema contabile francese. Se un bene viene acquistato a metà del periodo, sarà preso in considerazione l'ammortamento ripartito proporzionalmente. Questa funzione è simile ad AMMORT.PER, tranne per il fatto che il coefficiente di deprezzamento viene applicato al calcolo a seconda della vita del bene.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/amordegrc-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Obbligatorio. Costo del bene."
			},
			datePurchased: {
				name: "date_purchased",
				detail: "Obbligatorio. Data di acquisto del bene."
			},
			firstPeriod: {
				name: "first_period",
				detail: "Obbligatorio. Data finale del primo periodo."
			},
			salvage: {
				name: "salvage",
				detail: "Obbligatorio. Valore residuo al termine della vita del bene."
			},
			period: {
				name: "period",
				detail: "Obbligatorio. Periodo."
			},
			rate: {
				name: "rate",
				detail: "Obbligatorio. Tasso di ammortamento."
			},
			basis: {
				name: "basis",
				detail: "Opzionale. Base annua da utilizzare."
			}
		}
	},
	AMORLINC: {
		description: "Restituisce l'ammortamento per ogni periodo contabile. Questa funzione è fornita per il sistema contabile francese. Se un bene viene acquistato a metà del periodo, sarà preso in considerazione l'ammortamento ripartito proporzionalmente.",
		abstract: "Restituisce l'ammortamento per ogni periodo contabile. Questa funzione è fornita per il sistema contabile francese. Se un bene viene acquistato a metà del periodo, sarà preso in considerazione l'ammortamento ripartito proporzionalmente.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/amorlinc-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Obbligatorio. Costo del bene."
			},
			datePurchased: {
				name: "date_purchased",
				detail: "Obbligatorio. Data di acquisto del bene."
			},
			firstPeriod: {
				name: "first_period",
				detail: "Obbligatorio. Data finale del primo periodo."
			},
			salvage: {
				name: "salvage",
				detail: "Obbligatorio. Valore residuo al termine della vita del bene."
			},
			period: {
				name: "period",
				detail: "Obbligatorio. Periodo."
			},
			rate: {
				name: "rate",
				detail: "Obbligatorio. Tasso di ammortamento."
			},
			basis: {
				name: "basis",
				detail: "Opzionale. Base annua da utilizzare."
			}
		}
	},
	COUPDAYBS: {
		description: "La funzione GIORNI.CED.INIZ.LIQ restituisce il numero di giorni dall'inizio del periodo di una cedola alla data di liquidazione.",
		abstract: "La funzione GIORNI.CED.INIZ.LIQ restituisce il numero di giorni dall'inizio del periodo di una cedola alla data di liquidazione.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/coupdaybs-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obbligatorio. Data di liquidazione del titolo. La data di liquidazione del titolo è la data, successiva alla data di emissione, in cui il titolo viene venduto al compratore."
			},
			maturity: {
				name: "maturity",
				detail: "Obbligatorio. Data di scadenza del titolo. È la data in cui il titolo scade."
			},
			frequency: {
				name: "frequency",
				detail: "Obbligatorio. Numero di pagamenti per anno. Se i pagamenti sono annuali, num_rate = 1; se sono semestrali, num_rate = 2; se sono trimestrali, num_rate = 4."
			},
			basis: {
				name: "basis",
				detail: "Opzionale. Tipo di base da utilizzare per il conteggio dei giorni."
			}
		}
	},
	COUPDAYS: {
		description: "Restituisce il numero dei giorni relativi alla durata della cedola che contiene la data di liquidazione.",
		abstract: "Restituisce il numero dei giorni relativi alla durata della cedola che contiene la data di liquidazione.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/coupdays-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obbligatorio. Data di liquidazione del titolo. La data di liquidazione del titolo è la data, successiva alla data di emissione, in cui il titolo viene venduto al compratore."
			},
			maturity: {
				name: "maturity",
				detail: "Obbligatorio. Data di scadenza del titolo. È la data in cui il titolo scade."
			},
			frequency: {
				name: "frequency",
				detail: "Obbligatorio. Numero di pagamenti per anno. Se i pagamenti sono annuali, num_rate = 1; se sono semestrali, num_rate = 2; se sono trimestrali, num_rate = 4."
			},
			basis: {
				name: "basis",
				detail: "Opzionale. Tipo di base da utilizzare per il conteggio dei giorni."
			}
		}
	},
	COUPDAYSNC: {
		description: "Restituisce il numero dei giorni che vanno dalla data di liquidazione alla data della nuova cedola.",
		abstract: "Restituisce il numero dei giorni che vanno dalla data di liquidazione alla data della nuova cedola.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/coupdaysnc-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obbligatorio. Data di liquidazione del titolo. La data di liquidazione del titolo è la data, successiva alla data di emissione, in cui il titolo viene venduto al compratore."
			},
			maturity: {
				name: "maturity",
				detail: "Obbligatorio. Data di scadenza del titolo. È la data in cui il titolo scade."
			},
			frequency: {
				name: "frequency",
				detail: "Obbligatorio. Numero di pagamenti per anno. Se i pagamenti sono annuali, num_rate = 1; se sono semestrali, num_rate = 2; se sono trimestrali, num_rate = 4."
			},
			basis: {
				name: "basis",
				detail: "Opzionale. Tipo di base da utilizzare per il conteggio dei giorni."
			}
		}
	},
	COUPNCD: {
		description: "Restituisce un numero che rappresenta la data della cedola successiva dopo la data di liquidazione.",
		abstract: "Restituisce un numero che rappresenta la data della cedola successiva dopo la data di liquidazione.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/coupncd-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obbligatorio. Data di liquidazione del titolo. La data di liquidazione del titolo è la data, successiva alla data di emissione, in cui il titolo viene venduto al compratore."
			},
			maturity: {
				name: "maturity",
				detail: "Obbligatorio. Data di scadenza del titolo. È la data in cui il titolo scade."
			},
			frequency: {
				name: "frequency",
				detail: "Obbligatorio. Numero di pagamenti per anno. Se i pagamenti sono annuali, num_rate = 1; se sono semestrali, num_rate = 2; se sono trimestrali, num_rate = 4."
			},
			basis: {
				name: "basis",
				detail: "Opzionale. Tipo di base da utilizzare per il conteggio dei giorni."
			}
		}
	},
	COUPNUM: {
		description: "Restituisce il numero di cedole pagabili tra la data di liquidazione e la data di scadenza, arrotondato al numero intero di cedola più vicino.",
		abstract: "Restituisce il numero di cedole pagabili tra la data di liquidazione e la data di scadenza, arrotondato al numero intero di cedola più vicino.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/coupnum-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obbligatorio. Data di liquidazione del titolo. La data di liquidazione del titolo è la data, successiva alla data di emissione, in cui il titolo viene venduto al compratore."
			},
			maturity: {
				name: "maturity",
				detail: "Obbligatorio. Data di scadenza del titolo. È la data in cui il titolo scade."
			},
			frequency: {
				name: "frequency",
				detail: "Obbligatorio. Numero di pagamenti per anno. Se i pagamenti sono annuali, num_rate = 1; se sono semestrali, num_rate = 2; se sono trimestrali, num_rate = 4."
			},
			basis: {
				name: "basis",
				detail: "Opzionale. Tipo di base da utilizzare per il conteggio dei giorni."
			}
		}
	},
	COUPPCD: {
		description: "Restituisce un numero che rappresenta la data della cedola precedente prima della data di liquidazione.",
		abstract: "Restituisce un numero che rappresenta la data della cedola precedente prima della data di liquidazione.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/couppcd-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obbligatorio. Data di liquidazione del titolo. La data di liquidazione del titolo è la data, successiva alla data di emissione, in cui il titolo viene venduto al compratore."
			},
			maturity: {
				name: "maturity",
				detail: "Obbligatorio. Data di scadenza del titolo. È la data in cui il titolo scade."
			},
			frequency: {
				name: "frequency",
				detail: "Obbligatorio. Numero di pagamenti per anno. Se i pagamenti sono annuali, num_rate = 1; se sono semestrali, num_rate = 2; se sono trimestrali, num_rate = 4."
			},
			basis: {
				name: "basis",
				detail: "Opzionale. Tipo di base da utilizzare per il conteggio dei giorni."
			}
		}
	},
	CUMIPMT: {
		description: "Restituisce l'interesse cumulativo pagato per estinguere un debito tra iniz_per e fine_per.",
		abstract: "Restituisce l'interesse cumulativo pagato per estinguere un debito tra iniz_per e fine_per.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/cumipmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Obbligatorio. Tasso di interesse."
			},
			nper: {
				name: "nper",
				detail: "Obbligatorio. Numero totale di periodi di pagamento."
			},
			pv: {
				name: "pv",
				detail: "Obbligatorio. Valore attuale."
			},
			startPeriod: {
				name: "start_period",
				detail: "Obbligatorio. Primo periodo nel calcolo. I periodi di pagamento vengono numerati a partire da 1."
			},
			endPeriod: {
				name: "end_period",
				detail: "Obbligatorio. Ultimo periodo nel calcolo."
			},
			type: {
				name: "type",
				detail: "Obbligatorio. Scadenza per il pagamento."
			}
		}
	},
	CUMPRINC: {
		description: "Restituisce il capitale cumulativo pagato per estinguere un debito tra iniz_per e fine_per.",
		abstract: "Restituisce il capitale cumulativo pagato per estinguere un debito tra iniz_per e fine_per.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/cumprinc-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Obbligatorio. Tasso di interesse."
			},
			nper: {
				name: "nper",
				detail: "Obbligatorio. Numero totale di periodi di pagamento."
			},
			pv: {
				name: "pv",
				detail: "Obbligatorio. Valore attuale."
			},
			startPeriod: {
				name: "start_period",
				detail: "Obbligatorio. Primo periodo nel calcolo. I periodi di pagamento vengono numerati a partire da 1."
			},
			endPeriod: {
				name: "end_period",
				detail: "Obbligatorio. Ultimo periodo nel calcolo."
			},
			type: {
				name: "type",
				detail: "Obbligatorio. Scadenza per il pagamento."
			}
		}
	},
	DB: {
		description: "Restituisce l'ammortamento di un bene per un periodo specificato utilizzando il metodo a quote fisse proporzionali ai valori residui.",
		abstract: "Restituisce l'ammortamento di un bene per un periodo specificato utilizzando il metodo a quote fisse proporzionali ai valori residui.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/db-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Obbligatorio. Costo iniziale del bene."
			},
			salvage: {
				name: "salvage",
				detail: "Obbligatorio. Valore ottenuto alla fine dell'ammortamento, noto anche come valore residuo del bene."
			},
			life: {
				name: "life",
				detail: "Obbligatorio. Numero di periodi in cui il bene viene ammortizzato, noto anche come vita utile del bene."
			},
			period: {
				name: "period",
				detail: "Obbligatorio. Periodo per il quale si calcola l'ammortamento. Per periodo deve essere utilizzata la stessa unità di misura di Vita_utile."
			},
			month: {
				name: "month",
				detail: "Opzionale. Numero di mesi nel primo anno. Se mese viene omesso, verrà considerato uguale a 12."
			}
		}
	},
	DDB: {
		description: "Restituisce l'ammortamento di un bene per un periodo specificato utilizzando il metodo a doppie quote proporzionali ai valori residui o un altro metodo specificato.",
		abstract: "Restituisce l'ammortamento di un bene per un periodo specificato utilizzando il metodo a doppie quote proporzionali ai valori residui o un altro metodo specificato.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/ddb-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Obbligatorio. Costo iniziale del bene."
			},
			salvage: {
				name: "salvage",
				detail: "Obbligatorio. Valore ottenuto alla fine dell'ammortamento, noto anche come valore residuo del bene. Questo valore può essere 0."
			},
			life: {
				name: "life",
				detail: "Obbligatorio. Numero di periodi in cui il bene viene ammortizzato, noto anche come vita utile del bene."
			},
			period: {
				name: "period",
				detail: "Obbligatorio. Periodo per il quale si calcola l'ammortamento. Per periodo deve essere utilizzata la stessa unità di misura di Vita_utile."
			},
			factor: {
				name: "factor",
				detail: "Opzionale. Tasso di diminuzione delle quote proporzionali ai valori residui. Se fattore viene omesso, verrà considerato uguale a 2, che corrisponde al metodo di ammortamento a doppie quote proporzionali ai valori residui."
			}
		}
	},
	DISC: {
		description: "Restituisce il tasso di sconto di un titolo.",
		abstract: "Restituisce il tasso di sconto di un titolo.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/disc-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obbligatorio. Data di liquidazione del titolo. La data di liquidazione del titolo è la data, successiva alla data di emissione, in cui il titolo viene venduto al compratore."
			},
			maturity: {
				name: "maturity",
				detail: "Obbligatorio. Data di scadenza del titolo. È la data in cui il titolo scade."
			},
			pr: {
				name: "pr",
				detail: "Obbligatorio. Prezzo del titolo per valore nominale di € 100."
			},
			redemption: {
				name: "redemption",
				detail: "Obbligatorio. Valore di rimborso del titolo per valore nominale di € 100."
			},
			basis: {
				name: "basis",
				detail: "Opzionale. Tipo di base da utilizzare per il conteggio dei giorni."
			}
		}
	},
	DOLLARDE: {
		description: "Converte un prezzo espresso in numero intero e in frazione, ad esempio 1,02, in un prezzo espresso in numero decimale. I numeri espressi in frazione sono talvolta utilizzati per i prezzi dei titoli.",
		abstract: "Converte un prezzo espresso in numero intero e in frazione, ad esempio 1,02, in un prezzo espresso in numero decimale. I numeri espressi in frazione sono talvolta utilizzati per i prezzi dei titoli.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/dollarde-function"
		}],
		functionParameter: {
			fractionalDollar: {
				name: "fractional_dollar",
				detail: "Obbligatorio. Numero espresso con un numero intero e una frazione, separati da un simbolo decimale."
			},
			fraction: {
				name: "fraction",
				detail: "Obbligatorio. Intero da utilizzare nel denominatore della frazione."
			}
		}
	},
	DOLLARFR: {
		description: "Utilizzare la funzione VALUTA.FRAZ per convertire i numeri decimali in prezzi espressi in frazione.",
		abstract: "Utilizzare la funzione VALUTA.FRAZ per convertire i numeri decimali in prezzi espressi in frazione.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/dollarfr-function"
		}],
		functionParameter: {
			decimalDollar: {
				name: "decimal_dollar",
				detail: "Obbligatorio. Numero decimale."
			},
			fraction: {
				name: "fraction",
				detail: "Obbligatorio. Intero da utilizzare nel denominatore della frazione."
			}
		}
	},
	DURATION: {
		description: "La funzione DURATA , una delle funzioni finanziarie , restituisce la durata Macauley per un valore nominale presunto di $ 100. La durata è definita come la media ponderata del valore attuale dei flussi di cassa e viene utilizzata come misura della risposta del prezzo di un'obbligazione alle variazioni del rendimento.",
		abstract: "La funzione DURATA , una delle funzioni finanziarie , restituisce la durata Macauley per un valore nominale presunto di $ 100. La durata è definita come la media ponderata del valore attuale dei flussi di cassa e viene utilizzata come misura della risposta del prezzo di un'obbligazione alle variazioni del rendimento.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/duration-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obbligatorio. Data di liquidazione del titolo. La data di liquidazione del titolo è la data, successiva alla data di emissione, in cui il titolo viene venduto al compratore."
			},
			maturity: {
				name: "maturity",
				detail: "Obbligatorio. Data di scadenza del titolo. È la data in cui il titolo scade."
			},
			coupon: {
				name: "coupon",
				detail: "Obbligatorio. Tasso di interesse annuo del titolo."
			},
			yld: {
				name: "yld",
				detail: "Obbligatorio. Rendimento annuo del titolo."
			},
			frequency: {
				name: "frequency",
				detail: "Obbligatorio. Numero di pagamenti per anno. Se i pagamenti sono annuali, num_rate = 1; se sono semestrali, num_rate = 2; se sono trimestrali, num_rate = 4."
			},
			basis: {
				name: "basis",
				detail: "Opzionale. Tipo di base da utilizzare per il conteggio dei giorni."
			}
		}
	},
	EFFECT: {
		description: "Restituisce il tasso di interesse annuo effettivo in base al tasso di interesse nominale annuo ed al numero dei periodi di capitalizzazione per anno.",
		abstract: "Restituisce il tasso di interesse annuo effettivo in base al tasso di interesse nominale annuo ed al numero dei periodi di capitalizzazione per anno.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/effect-function"
		}],
		functionParameter: {
			nominalRate: {
				name: "nominal_rate",
				detail: "Obbligatorio. Tasso di interesse nominale."
			},
			npery: {
				name: "npery",
				detail: "Obbligatorio. Numero di periodi di capitalizzazione per anno."
			}
		}
	},
	FV: {
		description: "VAL.FUT , una delle funzioni finanziarie , calcola il valore futuro di un investimento sulla base di un tasso di interesse costante. È possibile usare VAL.FUT con pagamenti periodici costanti o con un unico pagamento forfettario.",
		abstract: "VAL.FUT , una delle funzioni finanziarie , calcola il valore futuro di un investimento sulla base di un tasso di interesse costante. È possibile usare VAL.FUT con pagamenti periodici costanti o con un unico pagamento forfettario.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/fv-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Obbligatorio. Tasso di interesse per periodo."
			},
			nper: {
				name: "nper",
				detail: "Obbligatorio. Numero totale dei periodi di pagamento in un'annualità."
			},
			pmt: {
				name: "pmt",
				detail: "Obbligatorio. Pagamento effettuato in ciascun periodo e non può variare nel corso dell'annualità. In genere, pagam include il capitale e gli interessi, ma non altre imposte o spese. Se pagam viene omesso, si deve includere l'argomento val_attuale."
			},
			pv: {
				name: "pv",
				detail: "Opzionale. Valore attuale o somma forfettaria che rappresenta il valore attuale di una serie di pagamenti futuri. Se val_attuale è omesso, verrà considerato uguale a 0 (zero) e si dovrà includere l'argomento pagam."
			},
			type: {
				name: "type",
				detail: "Opzionale. Corrisponde a 0 o a 1 e indica le scadenze dei pagamenti. Se tipo è omesso, verrà considerato uguale a 0."
			}
		}
	},
	FVSCHEDULE: {
		description: "Restituisce il valore futuro di un capitale iniziale soggetto a una serie di interessi composti. Utilizzare la funzione VAL.FUT.CAPITALE per calcolare il valore futuro di un investimento con una variabile o un tasso variabile.",
		abstract: "Restituisce il valore futuro di un capitale iniziale soggetto a una serie di interessi composti. Utilizzare la funzione VAL.FUT.CAPITALE per calcolare il valore futuro di un investimento con una variabile o un tasso variabile.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/fvschedule-function"
		}],
		functionParameter: {
			principal: {
				name: "principal",
				detail: "Obbligatorio. Valore attuale."
			},
			schedule: {
				name: "schedule",
				detail: "Obbligatorio. Matrice di tassi di interesse da applicare."
			}
		}
	},
	INTRATE: {
		description: "Restituisce il tasso di interesse di un titolo interamente investito.",
		abstract: "Restituisce il tasso di interesse di un titolo interamente investito.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/intrate-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obbligatorio. Data di liquidazione del titolo. La data di liquidazione del titolo è la data, successiva alla data di emissione, in cui il titolo viene venduto al compratore."
			},
			maturity: {
				name: "maturity",
				detail: "Obbligatorio. Data di scadenza del titolo. È la data in cui il titolo scade."
			},
			investment: {
				name: "investment",
				detail: "Obbligatorio. Importo investito nel titolo."
			},
			redemption: {
				name: "redemption",
				detail: "Obbligatorio. Importo da ricevere alla scadenza."
			},
			basis: {
				name: "basis",
				detail: "Opzionale. Tipo di base da utilizzare per il conteggio dei giorni."
			}
		}
	},
	IPMT: {
		description: "Restituisce il pagamento degli interessi relativi a un investimento per un dato periodo sulla base di pagamenti periodici e costanti e di un tasso di interesse costante.",
		abstract: "Restituisce il pagamento degli interessi relativi a un investimento per un dato periodo sulla base di pagamenti periodici e costanti e di un tasso di interesse costante.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/ipmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Obbligatorio. Tasso di interesse per periodo."
			},
			per: {
				name: "per",
				detail: "Obbligatorio. Periodo per il quale si desidera trovare l'interesse e deve essere compreso tra 1 e periodi."
			},
			nper: {
				name: "nper",
				detail: "Obbligatorio. Numero totale dei periodi di pagamento in un'annualità."
			},
			pv: {
				name: "pv",
				detail: "Obbligatorio. Valore attuale o somma forfettaria che rappresenta il valore attuale di una serie di pagamenti futuri."
			},
			fv: {
				name: "fv",
				detail: "Opzionale. Valore futuro o saldo in contanti che si desidera raggiungere dopo aver effettuato l'ultimo pagamento. Se val_futuro viene omesso, verrà considerato uguale a 0, ovvero il valore futuro di un prestito, ad esempio, sarà 0."
			},
			type: {
				name: "type",
				detail: "Opzionale. Corrisponde a 0 o a 1 e indica le scadenze dei pagamenti. Se tipo è omesso, verrà considerato uguale a 0."
			}
		}
	},
	IRR: {
		description: "Restituisce il tasso di rendimento interno di una serie di flussi di cassa rappresentati dai numeri in valori. Questi flussi di cassa non devono necessariamente essere pari, come sarebbero per un'annualità. Tuttavia, i flussi di cassa devono essere a intervalli regolari, ad esempio mensilmente o annualmente. Il tasso di rendimento interno è il tasso di interesse ricevuto per un investimento costituito da pagamenti (valori negativi) e entrate (valori positivi) che si verificano a periodi regolari.",
		abstract: "Restituisce il tasso di rendimento interno di una serie di flussi di cassa rappresentati dai numeri in valori. Questi flussi di cassa non devono necessariamente essere pari, come sarebbero per un'annualità. Tuttavia, i flussi di cassa devono essere a intervalli regolari, ad esempio mensilmente o annualmente. Il tasso di rendimento interno è il tasso di interesse ricevuto per un investimento costituito da pagamenti (valori negativi) e entrate (valori positivi) che si verificano a periodi regolari.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/irr-function"
		}],
		functionParameter: {
			values: {
				name: "values",
				detail: "Matrice o riferimento a celle contenenti i numeri per i quali calcolare il tasso di rendimento interno. Deve contenere almeno un valore positivo e uno negativo; testo, valori logici e celle vuote vengono ignorati."
			},
			guess: {
				name: "guess",
				detail: "Numero che si stima sia vicino al risultato di TIR."
			}
		}
	},
	ISPMT: {
		description: "Calcola l'interesse pagato (o ricevuto) per il periodo specificato di un prestito (o investimento) con pagamenti di capitale pari.",
		abstract: "Calcola l'interesse pagato (o ricevuto) per il periodo specificato di un prestito (o investimento) con pagamenti di capitale pari.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/ispmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Obbligatorio. Tasso di interesse per l'investimento."
			},
			per: {
				name: "per",
				detail: "Obbligatorio. Periodo per il quale si desidera trovare l'interesse e deve essere compreso tra 1 e Periodi."
			},
			nper: {
				name: "nper",
				detail: "Obbligatorio. Numero complessivo dei periodi di pagamento per l'investimento."
			},
			pv: {
				name: "pv",
				detail: "Obbligatorio. Valore attuale dell'investimento. Per un prestito, Valatt è l'importo del prestito."
			}
		}
	},
	MDURATION: {
		description: "Restituisce la durata Macauley modificata per un titolo con un valore nominale presunto di € 100.",
		abstract: "Restituisce la durata Macauley modificata per un titolo con un valore nominale presunto di € 100.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/mduration-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obbligatorio. Data di liquidazione del titolo. La data di liquidazione del titolo è la data, successiva alla data di emissione, in cui il titolo viene venduto al compratore."
			},
			maturity: {
				name: "maturity",
				detail: "Obbligatorio. Data di scadenza del titolo. È la data in cui il titolo scade."
			},
			coupon: {
				name: "coupon",
				detail: "Obbligatorio. Tasso di interesse annuo del titolo."
			},
			yld: {
				name: "yld",
				detail: "Obbligatorio. Rendimento annuo del titolo."
			},
			frequency: {
				name: "frequency",
				detail: "Obbligatorio. Numero di pagamenti per anno. Se i pagamenti sono annuali, num_rate = 1; se sono semestrali, num_rate = 2; se sono trimestrali, num_rate = 4."
			},
			basis: {
				name: "basis",
				detail: "Opzionale. Tipo di base da utilizzare per il conteggio dei giorni."
			}
		}
	},
	MIRR: {
		description: "Restituisce il tasso di rendimento interno modificato relativo a una serie di flussi di cassa periodici. La funzione TIR.VAR considera sia il costo dell'investimento che gli interessi maturati dal contante reinvestito.",
		abstract: "Restituisce il tasso di rendimento interno modificato relativo a una serie di flussi di cassa periodici. La funzione TIR.VAR considera sia il costo dell'investimento che gli interessi maturati dal contante reinvestito.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/mirr-function"
		}],
		functionParameter: {
			values: {
				name: "values",
				detail: "Obbligatorio. Matrice o riferimento a celle contenenti numeri. Questi numeri rappresentano una serie di pagamenti (valori negativi) e di entrate (valori positivi) che si verificano a intervalli regolari. I valori devono contenere almeno un valore positivo e uno negativo per calcolare il tasso di rendimento interno modificato. In caso contrario, TIR.RR restituirà il #DIV/0! . Se una matrice o un riferimento contiene testo, valori logici o celle vuote, tali valori verranno ignorati. Le celle contenenti il valore zero verranno invece incluse nel calcolo."
			},
			financeRate: {
				name: "finance_rate",
				detail: "Obbligatorio. Tasso di interesse corrisposto sul contante utilizzato per i flussi di cassa."
			},
			reinvestRate: {
				name: "reinvest_rate",
				detail: "Obbligatorio. Tasso di interesse percepito sui flussi di cassa nel momento in cui il contante viene reinvestito."
			}
		}
	},
	NOMINAL: {
		description: "Restituisce il tasso di interesse nominale annuo in base al tasso effettivo e al numero di periodi di capitalizzazione per anno.",
		abstract: "Restituisce il tasso di interesse nominale annuo in base al tasso effettivo e al numero di periodi di capitalizzazione per anno.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/nominal-function"
		}],
		functionParameter: {
			effectRate: {
				name: "effect_rate",
				detail: "Obbligatorio. Tasso di interesse effettivo."
			},
			npery: {
				name: "npery",
				detail: "Obbligatorio. Numero di periodi di capitalizzazione per anno."
			}
		}
	},
	NPER: {
		description: "Restituisce il numero di periodi relativi a un investimento che prevede pagamenti periodici e costanti e un tasso di interesse costante.",
		abstract: "Restituisce il numero di periodi relativi a un investimento che prevede pagamenti periodici e costanti e un tasso di interesse costante.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/nper-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Obbligatorio. Tasso di interesse per periodo."
			},
			pmt: {
				name: "pmt",
				detail: "Obbligatorio. Pagamento effettuato in ciascun periodo e non può variare nel corso dell'annualità. In genere, pagam include il capitale e gli interessi, ma non altre imposte o spese."
			},
			pv: {
				name: "pv",
				detail: "Obbligatorio. Valore attuale o somma forfettaria che rappresenta il valore attuale di una serie di pagamenti futuri."
			},
			fv: {
				name: "fv",
				detail: "Opzionale. Valore futuro o saldo in contanti che si desidera raggiungere dopo aver effettuato l'ultimo pagamento. Se val_futuro viene omesso, verrà considerato uguale a 0, ovvero il valore futuro di un prestito, ad esempio, sarà 0."
			},
			type: {
				name: "type",
				detail: "Opzionale. Corrisponde a 0 o a 1 e indica le scadenze dei pagamenti."
			}
		}
	},
	NPV: {
		description: "Calcola il valore attuale netto di un investimento utilizzando un tasso di sconto e una serie di pagamenti (valori negativi) e di entrate (valori positivi).",
		abstract: "Calcola il valore attuale netto di un investimento utilizzando un tasso di sconto e una serie di pagamenti (valori negativi) e di entrate (valori positivi).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/npv-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Obbligatorio. Tasso di sconto durante uno dei periodi."
			},
			value1: {
				name: "value1",
				detail: "Val1 è obbligatorio, i valori successivi sono facoltativi. Da 1 a 254 argomenti che rappresentano i pagamenti e le entrate. Valore1, valore2, ... devono essere collocati a distanze di tempo regolari e al termine di ogni periodo. VAN utilizza utilizza l'ordine di successione di valore1, valore2, ... dei valori per interpretare l'ordine di successione dei flussi di cassa. Assicurarsi di immettere i valori relativi alle entrate e alle uscite nella sequenza desiderata. Gli argomenti rappresentati da celle vuote, valori logici, rappresentazioni di numeri come testo, valori di errore o testo non convertibile in numeri verranno ignorati. Se un argomento è rappresentato da una matrice o da un riferimento, verranno contati solo i numeri inclusi in tale matrice o riferimento. Le celle vuote, i valori logici, il testo o i valori di errore verranno ignorati."
			},
			value2: {
				name: "value2",
				detail: "Val1 è obbligatorio, i valori successivi sono facoltativi. Da 1 a 254 argomenti che rappresentano i pagamenti e le entrate. Valore1, valore2, ... devono essere collocati a distanze di tempo regolari e al termine di ogni periodo. VAN utilizza utilizza l'ordine di successione di valore1, valore2, ... dei valori per interpretare l'ordine di successione dei flussi di cassa. Assicurarsi di immettere i valori relativi alle entrate e alle uscite nella sequenza desiderata. Gli argomenti rappresentati da celle vuote, valori logici, rappresentazioni di numeri come testo, valori di errore o testo non convertibile in numeri verranno ignorati. Se un argomento è rappresentato da una matrice o da un riferimento, verranno contati solo i numeri inclusi in tale matrice o riferimento. Le celle vuote, i valori logici, il testo o i valori di errore verranno ignorati."
			}
		}
	},
	ODDFPRICE: {
		description: "Restituisce il prezzo di un titolo dal valore nominale di € 100 avente il primo periodo (breve o lungo) di durata irregolare.",
		abstract: "Restituisce il prezzo di un titolo dal valore nominale di € 100 avente il primo periodo (breve o lungo) di durata irregolare.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/oddfprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obbligatorio. Data di liquidazione del titolo. La data di liquidazione del titolo è la data, successiva alla data di emissione, in cui il titolo viene venduto al compratore."
			},
			maturity: {
				name: "maturity",
				detail: "Obbligatorio. Data di scadenza del titolo. È la data in cui il titolo scade."
			},
			issue: {
				name: "issue",
				detail: "Obbligatorio. Data di emissione del titolo."
			},
			firstCoupon: {
				name: "first_coupon",
				detail: "Obbligatorio. Data della prima cedola."
			},
			rate: {
				name: "rate",
				detail: "Obbligatorio. Tasso di interesse del titolo."
			},
			yld: {
				name: "yld",
				detail: "Obbligatorio. Rendimento annuo del titolo."
			},
			redemption: {
				name: "redemption",
				detail: "Obbligatorio. Valore di rimborso del titolo per valore nominale di € 100."
			},
			frequency: {
				name: "frequency",
				detail: "Obbligatorio. Numero di pagamenti per anno. Se i pagamenti sono annuali, num_rate = 1; se sono semestrali, num_rate = 2; se sono trimestrali, num_rate = 4."
			},
			basis: {
				name: "basis",
				detail: "Opzionale. Tipo di base da utilizzare per il conteggio dei giorni."
			}
		}
	},
	ODDFYIELD: {
		description: "Restituisce il rendimento di un titolo avente il primo periodo, breve o lungo, di durata irregolare.",
		abstract: "Restituisce il rendimento di un titolo avente il primo periodo, breve o lungo, di durata irregolare.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/oddfyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obbligatorio. Data di liquidazione del titolo. La data di liquidazione del titolo è la data, successiva alla data di emissione, in cui il titolo viene venduto al compratore."
			},
			maturity: {
				name: "maturity",
				detail: "Obbligatorio. Data di scadenza del titolo. È la data in cui il titolo scade."
			},
			issue: {
				name: "issue",
				detail: "Obbligatorio. Data di emissione del titolo."
			},
			firstCoupon: {
				name: "first_coupon",
				detail: "Obbligatorio. Data della prima cedola."
			},
			rate: {
				name: "rate",
				detail: "Obbligatorio. Tasso di interesse del titolo."
			},
			pr: {
				name: "pr",
				detail: "Obbligatorio. Prezzo del titolo."
			},
			redemption: {
				name: "redemption",
				detail: "Obbligatorio. Valore di rimborso del titolo per valore nominale di € 100."
			},
			frequency: {
				name: "frequency",
				detail: "Obbligatorio. Numero di pagamenti per anno. Se i pagamenti sono annuali, num_rate = 1; se sono semestrali, num_rate = 2; se sono trimestrali, num_rate = 4."
			},
			basis: {
				name: "basis",
				detail: "Opzionale. Tipo di base da utilizzare per il conteggio dei giorni."
			}
		}
	},
	ODDLPRICE: {
		description: "Restituisce il prezzo di un titolo dal valore nominale di € 100 avente l'ultimo periodo (breve o lungo) di durata irregolare.",
		abstract: "Restituisce il prezzo di un titolo dal valore nominale di € 100 avente l'ultimo periodo (breve o lungo) di durata irregolare.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/oddlprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obbligatorio. Data di liquidazione del titolo. La data di liquidazione del titolo è la data, successiva alla data di emissione, in cui il titolo viene venduto al compratore."
			},
			maturity: {
				name: "maturity",
				detail: "Obbligatorio. Data di scadenza del titolo. È la data in cui il titolo scade."
			},
			lastInterest: {
				name: "last_interest",
				detail: "Obbligatorio. Data dell'ultima cedola."
			},
			rate: {
				name: "rate",
				detail: "Obbligatorio. Tasso di interesse del titolo."
			},
			yld: {
				name: "yld",
				detail: "Obbligatorio. Rendimento annuo del titolo."
			},
			redemption: {
				name: "redemption",
				detail: "Obbligatorio. Valore di rimborso del titolo per valore nominale di € 100."
			},
			frequency: {
				name: "frequency",
				detail: "Obbligatorio. Numero di pagamenti per anno. Se i pagamenti sono annuali, num_rate = 1; se sono semestrali, num_rate = 2; se sono trimestrali, num_rate = 4."
			},
			basis: {
				name: "basis",
				detail: "Opzionale. Tipo di base da utilizzare per il conteggio dei giorni."
			}
		}
	},
	ODDLYIELD: {
		description: "Restituisce il rendimento di un titolo avente l'ultimo periodo, breve o lungo, di durata irregolare.",
		abstract: "Restituisce il rendimento di un titolo avente l'ultimo periodo, breve o lungo, di durata irregolare.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/oddlyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obbligatorio. Data di liquidazione del titolo. La data di liquidazione del titolo è la data, successiva alla data di emissione, in cui il titolo viene venduto al compratore."
			},
			maturity: {
				name: "maturity",
				detail: "Obbligatorio. Data di scadenza del titolo. È la data in cui il titolo scade."
			},
			lastInterest: {
				name: "last_interest",
				detail: "Obbligatorio. Data dell'ultima cedola."
			},
			rate: {
				name: "rate",
				detail: "Obbligatorio. Tasso di interesse del titolo."
			},
			pr: {
				name: "pr",
				detail: "Obbligatorio. Prezzo del titolo."
			},
			redemption: {
				name: "redemption",
				detail: "Obbligatorio. Valore di rimborso del titolo per valore nominale di € 100."
			},
			frequency: {
				name: "frequency",
				detail: "Obbligatorio. Numero di pagamenti per anno. Se i pagamenti sono annuali, num_rate = 1; se sono semestrali, num_rate = 2; se sono trimestrali, num_rate = 4."
			},
			basis: {
				name: "basis",
				detail: "Opzionale. Tipo di base da utilizzare per il conteggio dei giorni."
			}
		}
	},
	PDURATION: {
		description: "Restituisce il numero di periodi necessari affinché un investimento raggiunga un valore specificato.",
		abstract: "Restituisce il numero di periodi necessari affinché un investimento raggiunga un valore specificato.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/pduration-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Obbligatorio. Tasso_int è il tasso di interesse per il periodo."
			},
			pv: {
				name: "pv",
				detail: "Obbligatorio. Val_attuale è il valore attuale dell'investimento."
			},
			fv: {
				name: "fv",
				detail: "Obbligatorio. Val_futuro è il valore futuro desiderato dell'investimento."
			}
		}
	},
	PMT: {
		description: "RATA , una delle funzioni finanziarie , calcola il pagamento per un prestito in base a pagamenti costanti e a un tasso di interesse costante.",
		abstract: "RATA , una delle funzioni finanziarie , calcola il pagamento per un prestito in base a pagamenti costanti e a un tasso di interesse costante.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/pmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Obbligatorio. Tasso di interesse per il prestito."
			},
			nper: {
				name: "nper",
				detail: "Obbligatorio. Numero totale di pagamenti per il prestito."
			},
			pv: {
				name: "pv",
				detail: "Obbligatorio. Valore attuale ovvero l'importo totale che rappresenta il valore attuale di una serie di pagamenti futuri, noto anche come capitale."
			},
			fv: {
				name: "fv",
				detail: "Opzionale. Valore futuro o saldo in contanti che si desidera raggiungere dopo aver effettuato l'ultimo pagamento. Se val_futuro è omesso, verrà considerato uguale a 0, ovvero il valore futuro di un prestito è pari a 0."
			},
			type: {
				name: "type",
				detail: "Opzionale. Corrisponde a 0 (zero) o a 1 e indica le scadenze dei pagamenti."
			}
		}
	},
	PPMT: {
		description: "Restituisce il pagamento sul capitale di un investimento per un dato periodo sulla base di pagamenti periodici e costanti e di un tasso di interesse costante.",
		abstract: "Restituisce il pagamento sul capitale di un investimento per un dato periodo sulla base di pagamenti periodici e costanti e di un tasso di interesse costante.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/ppmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Obbligatorio. Tasso di interesse per periodo."
			},
			per: {
				name: "per",
				detail: "Obbligatorio. Specifica il periodo e deve essere compreso tra 1 e periodi."
			},
			nper: {
				name: "nper",
				detail: "Obbligatorio. Numero totale dei periodi di pagamento in un'annualità."
			},
			pv: {
				name: "pv",
				detail: "Obbligatorio. Valore attuale o importo totale che rappresenta il valore attuale di una serie di pagamenti futuri."
			},
			fv: {
				name: "fv",
				detail: "Opzionale. Valore futuro o saldo in contanti che si desidera raggiungere dopo aver effettuato l'ultimo pagamento. Se val_futuro è omesso, verrà considerato uguale a 0, ovvero il valore futuro di un prestito è pari a 0."
			},
			type: {
				name: "type",
				detail: "Opzionale. Corrisponde a 0 o a 1 e indica le scadenze dei pagamenti."
			}
		}
	},
	PRICE: {
		description: "Restituisce il prezzo di un titolo dal valore nominale di € 100 che paga interessi periodici.",
		abstract: "Restituisce il prezzo di un titolo dal valore nominale di € 100 che paga interessi periodici.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/price-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obbligatorio. Data di liquidazione del titolo. La data di liquidazione del titolo è la data, successiva alla data di emissione, in cui il titolo viene venduto al compratore."
			},
			maturity: {
				name: "maturity",
				detail: "Obbligatorio. Data di scadenza del titolo. È la data in cui il titolo scade."
			},
			rate: {
				name: "rate",
				detail: "Obbligatorio. Tasso di interesse annuo del titolo."
			},
			yld: {
				name: "yld",
				detail: "Obbligatorio. Rendimento annuo del titolo."
			},
			redemption: {
				name: "redemption",
				detail: "Obbligatorio. Valore di rimborso del titolo per valore nominale di € 100."
			},
			frequency: {
				name: "frequency",
				detail: "Obbligatorio. Numero di pagamenti per anno. Se i pagamenti sono annuali, num_rate = 1; se sono semestrali, num_rate = 2; se sono trimestrali, num_rate = 4."
			},
			basis: {
				name: "basis",
				detail: "Opzionale. Tipo di base da utilizzare per il conteggio dei giorni."
			}
		}
	},
	PRICEDISC: {
		description: "Restituisce il prezzo di un titolo scontato dal valore nominale di € 100.",
		abstract: "Restituisce il prezzo di un titolo scontato dal valore nominale di € 100.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/pricedisc-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obbligatorio. Data di liquidazione del titolo. La data di liquidazione del titolo è la data, successiva alla data di emissione, in cui il titolo viene venduto al compratore."
			},
			maturity: {
				name: "maturity",
				detail: "Obbligatorio. Data di scadenza del titolo. È la data in cui il titolo scade."
			},
			discount: {
				name: "discount",
				detail: "Obbligatorio. Tasso di sconto del titolo."
			},
			redemption: {
				name: "redemption",
				detail: "Obbligatorio. Valore di rimborso del titolo per valore nominale di € 100."
			},
			basis: {
				name: "basis",
				detail: "Opzionale. Tipo di base da utilizzare per il conteggio dei giorni."
			}
		}
	},
	PRICEMAT: {
		description: "Restituisce il prezzo di un titolo dal valore nominale di € 100 che paga interessi alla scadenza.",
		abstract: "Restituisce il prezzo di un titolo dal valore nominale di € 100 che paga interessi alla scadenza.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/pricemat-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obbligatorio. Data di liquidazione del titolo. La data di liquidazione del titolo è la data, successiva alla data di emissione, in cui il titolo viene venduto al compratore."
			},
			maturity: {
				name: "maturity",
				detail: "Obbligatorio. Data di scadenza del titolo. È la data in cui il titolo scade."
			},
			issue: {
				name: "issue",
				detail: "Obbligatorio. Data di emissione del titolo espressa come numero seriale."
			},
			rate: {
				name: "rate",
				detail: "Obbligatorio. Tasso di interesse del titolo alla data di emissione."
			},
			yld: {
				name: "yld",
				detail: "Obbligatorio. Rendimento annuo del titolo."
			},
			basis: {
				name: "basis",
				detail: "Opzionale. Tipo di base da utilizzare per il conteggio dei giorni."
			}
		}
	},
	PV: {
		description: "VALATT , una delle funzioni finanziarie , calcola il valore attuale futuro di un prestito o un investimento sulla base di un tasso di interesse costante. È possibile usare VALATT con pagamenti periodici costanti (come un mutuo o un'altra forma di prestito) o con un valore futuro che rappresenta l'obiettivo dell'investimento.",
		abstract: "VALATT , una delle funzioni finanziarie , calcola il valore attuale futuro di un prestito o un investimento sulla base di un tasso di interesse costante. È possibile usare VALATT con pagamenti periodici costanti (come un mutuo o un'altra forma di prestito) o con un valore futuro che rappresenta l'obiettivo dell'investimento.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/pv-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Obbligatorio. Tasso di interesse per periodo. Se, ad esempio, si ottiene un prestito per l'acquisto di un'automobile a un tasso di interesse annuo del 10% e si effettuano pagamenti mensili, il tasso di interesse mensile sarà 10%/12 o 0,83%. Nella formula sarà possibile immettere 10%/12, 0,83% o 0,0083 come tasso."
			},
			nper: {
				name: "nper",
				detail: "Obbligatorio. Numero totale dei periodi di pagamento in un'annualità. Se, ad esempio, si ottiene un prestito quadriennale per l'acquisto di un'automobile e si effettuano pagamenti mensili, il prestito comprenderà 4*12 (o 48) periodi. Nella formula sarà possibile immettere 48 per periodi."
			},
			pmt: {
				name: "pmt",
				detail: "Obbligatorio. Pagamento effettuato in ciascun periodo e non può variare nel corso dell'annualità. In genere, pagam include il capitale e gli interessi, ma non altre imposte o spese. Ad esempio, i pagamenti mensili di un prestito quadriennale di € 10.000 al 12% per l'acquisto di un'automobile saranno di € 263,33. Si immetterebbe -263,33 nella formula come pagam. Se pagam viene omesso, è necessario includere l'argomento val_futuro."
			},
			fv: {
				name: "fv",
				detail: "Opzionale. Valore futuro o saldo in contanti che si desidera raggiungere dopo l'ultimo pagamento. Se val_futuro viene omesso, verrà considerato uguale a 0, ovvero il valore futuro di un prestito, ad esempio, sarà 0. Ad esempio, se si vuole risparmiare $ 50.000 per pagare un progetto speciale in 18 anni, $ 50.000 è il valore futuro. Si potrebbe quindi fare un'ipotesi conservatrice a un tasso di interesse e determinare quanto è necessario risparmiare ogni mese. Se val_futuro viene omesso, è necessario includere l'argomento pagam."
			},
			type: {
				name: "type",
				detail: "Opzionale. Corrisponde a 0 o a 1 e indica le scadenze dei pagamenti."
			}
		}
	},
	RATE: {
		description: "Restituisce il tasso di interesse per periodo di un'annualità. La funzione TASSO viene calcolata per iterazione e può avere zero o più soluzioni. Se i risultati successivi di TASSO non convergono entro 0,0000001 dopo 20 iterazioni, TASSO restituirà il #NUM! .",
		abstract: "Restituisce il tasso di interesse per periodo di un'annualità. La funzione TASSO viene calcolata per iterazione e può avere zero o più soluzioni. Se i risultati successivi di TASSO non convergono entro 0,0000001 dopo 20 iterazioni, TASSO restituirà il #NUM! .",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/rate-function"
		}],
		functionParameter: {
			nper: {
				name: "nper",
				detail: "Obbligatorio. Numero totale dei periodi di pagamento in un'annualità."
			},
			pmt: {
				name: "pmt",
				detail: "Obbligatorio. Pagamento effettuato in ciascun periodo e non può variare nel corso dell'annualità. Pagam include in genere il capitale e gli interessi, ma non altre imposte o spese. Se pagam viene omesso, sarà necessario includere l'argomento val_futuro."
			},
			pv: {
				name: "pv",
				detail: "Obbligatorio. Valore attuale o importo totale che rappresenta il valore attuale di una serie di pagamenti futuri."
			},
			fv: {
				name: "fv",
				detail: "Opzionale. Valore futuro o saldo in contanti che si desidera raggiungere dopo aver effettuato l'ultimo pagamento. Se val_futuro viene omesso, verrà considerato uguale a 0, ovvero il valore futuro di un prestito, ad esempio, sarà 0. Se val_futuro viene omesso, è necessario includere l'argomento pagam."
			},
			type: {
				name: "type",
				detail: "Opzionale. Corrisponde a 0 o a 1 e indica le scadenze dei pagamenti."
			},
			guess: {
				name: "guess",
				detail: "Opzionale. Previsione del tasso di interesse. Se ipotesi è omesso, verrà considerato uguale a 10%. Se i risultati di TASSO non convergono, provare a utilizzare dei valori differenti per ipotesi. In genere, i risultati di TASSO convergono se ipotesi è compreso tra 0 e 1."
			}
		}
	},
	RECEIVED: {
		description: "Restituisce l'ammontare ricevuto alla scadenza di un titolo interamente investito.",
		abstract: "Restituisce l'ammontare ricevuto alla scadenza di un titolo interamente investito.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/received-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obbligatorio. Data di liquidazione del titolo. La data di liquidazione del titolo è la data, successiva alla data di emissione, in cui il titolo viene venduto al compratore."
			},
			maturity: {
				name: "maturity",
				detail: "Obbligatorio. Data di scadenza del titolo. È la data in cui il titolo scade."
			},
			investment: {
				name: "investment",
				detail: "Obbligatorio. Importo investito nel titolo."
			},
			discount: {
				name: "discount",
				detail: "Obbligatorio. Tasso di sconto del titolo."
			},
			basis: {
				name: "basis",
				detail: "Opzionale. Tipo di base da utilizzare per il conteggio dei giorni."
			}
		}
	},
	RRI: {
		description: "Restituisce un tasso di interesse equivalente per la crescita di un investimento.",
		abstract: "Restituisce un tasso di interesse equivalente per la crescita di un investimento.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/rri-function"
		}],
		functionParameter: {
			nper: {
				name: "nper",
				detail: "Obbligatorio. Periodi è il numero di periodi per l'investimento."
			},
			pv: {
				name: "pv",
				detail: "Obbligatorio. Val_attuale è il valore attuale dell'investimento."
			},
			fv: {
				name: "fv",
				detail: "Obbligatorio. Val_futuro è il valore futuro dell'investimento."
			}
		}
	},
	SLN: {
		description: "Restituisce l'ammortamento costante di un bene per un periodo.",
		abstract: "Restituisce l'ammortamento costante di un bene per un periodo.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/sln-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Obbligatorio. Costo iniziale del bene."
			},
			salvage: {
				name: "salvage",
				detail: "Obbligatorio. Valore ottenuto alla fine dell'ammortamento, noto anche come valore residuo del bene."
			},
			life: {
				name: "life",
				detail: "Obbligatorio. Numero di periodi in cui il bene viene ammortizzato, noto anche come vita utile del bene."
			}
		}
	},
	SYD: {
		description: "Restituisce l'ammortamento pluriennale in cifre di un bene per un determinato periodo.",
		abstract: "Restituisce l'ammortamento pluriennale in cifre di un bene per un determinato periodo.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/syd-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Obbligatorio. Costo iniziale del bene."
			},
			salvage: {
				name: "salvage",
				detail: "Obbligatorio. Valore ottenuto alla fine dell'ammortamento, noto anche come valore residuo del bene."
			},
			life: {
				name: "life",
				detail: "Obbligatorio. Numero di periodi in cui il bene viene ammortizzato, noto anche come vita utile del bene."
			},
			per: {
				name: "per",
				detail: "Obbligatorio. Definisce il periodo per il quale devono essere utilizzate le stesse unità di misura di vita_utile."
			}
		}
	},
	TBILLEQ: {
		description: "Restituisce il rendimento equivalente a un'obbligazione per un Buono ordinario del Tesoro.",
		abstract: "Restituisce il rendimento equivalente a un'obbligazione per un Buono ordinario del Tesoro.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/tbilleq-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obbligatorio. Data di liquidazione del Buono del Tesoro. La data di liquidazione del titolo è la data successiva alla data di emissione in cui il Buono del Tesoro viene scambiato con l'acquirente."
			},
			maturity: {
				name: "maturity",
				detail: "Obbligatorio. Data di scadenza del Buono del Tesoro. La data di scadenza è la data in cui scade il Buono del Tesoro."
			},
			discount: {
				name: "discount",
				detail: "Obbligatorio. Tasso di sconto del Buono del Tesoro."
			}
		}
	},
	TBILLPRICE: {
		description: "Restituisce il prezzo di un Buono del Tesoro dal valore nominale di € 100.",
		abstract: "Restituisce il prezzo di un Buono del Tesoro dal valore nominale di € 100.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/tbillprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obbligatorio. Data di liquidazione del Buono del Tesoro. La data di liquidazione del titolo è la data successiva alla data di emissione in cui il Buono del Tesoro viene scambiato con l'acquirente."
			},
			maturity: {
				name: "maturity",
				detail: "Obbligatorio. Data di scadenza del Buono del Tesoro. La data di scadenza è la data in cui scade il Buono del Tesoro."
			},
			discount: {
				name: "discount",
				detail: "Obbligatorio. Tasso di sconto del Buono del Tesoro."
			}
		}
	},
	TBILLYIELD: {
		description: "Restituisce il rendimento di un Buono del Tesoro.",
		abstract: "Restituisce il rendimento di un Buono del Tesoro.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/tbillyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obbligatorio. Data di liquidazione del Buono del Tesoro. La data di liquidazione del titolo è la data successiva alla data di emissione in cui il Buono del Tesoro viene scambiato con l'acquirente."
			},
			maturity: {
				name: "maturity",
				detail: "Obbligatorio. Data di scadenza del Buono del Tesoro. La data di scadenza è la data in cui scade il Buono del Tesoro."
			},
			pr: {
				name: "pr",
				detail: "Obbligatorio. Prezzo del Buono del Tesoro per valore nominale di € 100."
			}
		}
	},
	VDB: {
		description: "Restituisce l'ammortamento di un bene per un periodo specificato, inclusi periodi parziali, utilizzando il metodo a doppie quote proporzionali o un altro metodo specificato. VDB significa residuo variabile decrescente.",
		abstract: "Restituisce l'ammortamento di un bene per un periodo specificato, inclusi periodi parziali, utilizzando il metodo a doppie quote proporzionali o un altro metodo specificato. VDB significa residuo variabile decrescente.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/vdb-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Obbligatorio. Costo iniziale del bene."
			},
			salvage: {
				name: "salvage",
				detail: "Obbligatorio. Valore ottenuto alla fine dell'ammortamento, noto anche come valore residuo del bene. Questo valore può essere 0."
			},
			life: {
				name: "life",
				detail: "Obbligatorio. Numero di periodi in cui il bene viene ammortizzato, noto anche come vita utile del bene."
			},
			startPeriod: {
				name: "start_period",
				detail: "Obbligatorio. Periodo iniziale per il quale si desidera calcolare l'ammortamento. Inizio deve essere espresso nella stessa unità di misura di vita_utile."
			},
			endPeriod: {
				name: "end_period",
				detail: "Obbligatorio. Periodo finale per il quale si desidera calcolare l'ammortamento. Fine deve essere espresso nella stessa unità di misura di vita_utile."
			},
			factor: {
				name: "factor",
				detail: "Opzionale. Tasso di diminuzione delle quote proporzionali ai valori residui. Se fattore viene omesso, verrà considerato uguale a 2, che corrisponde al metodo di ammortamento a doppie quote proporzionali ai valori residui. Modificare fattore se non si desidera usare questo metodo. Per una descrizione del metodo di ammortamento a doppie quote proporzionali ai valori residui, vedere la funzione AMMORT."
			},
			noSwitch: {
				name: "no_switch",
				detail: "Opzionale. Valore logico che specifica se è necessario passare all'ammortamento costante se l'ammortamento è maggiore della quota decrescente calcolata. Se nessuna_opzione è VERO, il passaggio all'ammortamento costante non avverrà anche se l'ammortamento sarà maggiore rispetto alla quota decrescente calcolata. Se nessuna_opzione è FALSO o è omesso, il passaggio all'ammortamento costante avverrà quando l'ammortamento sarà maggiore rispetto alla quota decrescente calcolata."
			}
		}
	},
	XIRR: {
		description: "Restituisce il tasso di rendimento interno di un impiego di flussi di cassa. Per calcolare il tasso di rendimento interno di una serie di flussi di cassa periodici, utilizzare la funzione TIR.COST.",
		abstract: "Restituisce il tasso di rendimento interno di un impiego di flussi di cassa. Per calcolare il tasso di rendimento interno di una serie di flussi di cassa periodici, utilizzare la funzione TIR.COST.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/xirr-function"
		}],
		functionParameter: {
			values: {
				name: "values",
				detail: "Obbligatorio. Serie di flussi di cassa che corrispondono a scadenze di pagamento. Il primo pagamento è facoltativo e corrisponde a un costo o a un pagamento che avviene all'inizio dell'investimento. Se il primo valore è un costo o un pagamento, questo dovrà essere un valore negativo. Tutti i pagamenti successivi vengono scontati secondo una base annua di 365 giorni. È necessario che la serie di valori contenga almeno un valore positivo e uno negativo."
			},
			dates: {
				name: "dates",
				detail: "Obbligatorio. Scadenze di pagamento che corrispondono ai pagamenti dei flussi di cassa. Le date possono essere ordinate in qualsiasi ordine. Le date devono essere immesse utilizzando la funzione DATA o devono essere il risultato di altre formule o funzioni. Usare ad esempio DATA(2008;5;23) per il 23 maggio 2008. Possono verificarsi dei problemi se le date vengono immesse come testo. ."
			},
			guess: {
				name: "guess",
				detail: "Opzionale. Numero che si suppone vicino al risultato di TIR.X."
			}
		}
	},
	XNPV: {
		description: "Restituisce il valore attuale netto di un impiego di flussi di cassa. Per calcolare il valore attuale netto di una serie di flussi di cassa periodici, utilizzare la funzione VAN.",
		abstract: "Restituisce il valore attuale netto di un impiego di flussi di cassa. Per calcolare il valore attuale netto di una serie di flussi di cassa periodici, utilizzare la funzione VAN.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/xnpv-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Obbligatorio. Tasso di sconto da applicare ai flussi di cassa."
			},
			values: {
				name: "values",
				detail: "Obbligatorio. Serie di flussi di cassa che corrispondono a scadenze di pagamento. Il primo pagamento è facoltativo e corrisponde a un costo o a un pagamento che avviene all'inizio dell'investimento. Se il primo valore è un costo o un pagamento, questo dovrà essere un valore negativo. Tutti i pagamenti successivi vengono scontati secondo una base annua di 365 giorni. È necessario che la serie di valori contenga almeno un valore positivo e uno negativo."
			},
			dates: {
				name: "dates",
				detail: "Obbligatorio. Scadenze di pagamento che corrispondono ai pagamenti dei flussi di cassa. L'inizio delle scadenze di pagamento è indicato dalla data del primo pagamento. Tutte le altre date devono essere posteriori, ma non è necessario che seguano un ordine particolare."
			}
		}
	},
	YIELD: {
		description: "Restituisce il rendimento di un titolo che frutta interessi periodici. Utilizzare la funzione REND per calcolare il rendimento di obbligazioni.",
		abstract: "Restituisce il rendimento di un titolo che frutta interessi periodici. Utilizzare la funzione REND per calcolare il rendimento di obbligazioni.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/yield-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obbligatorio. Data di liquidazione del titolo. La data di liquidazione del titolo è la data, successiva alla data di emissione, in cui il titolo viene venduto al compratore."
			},
			maturity: {
				name: "maturity",
				detail: "Obbligatorio. Data di scadenza del titolo. È la data in cui il titolo scade."
			},
			rate: {
				name: "rate",
				detail: "Obbligatorio. Tasso di interesse annuo del titolo."
			},
			pr: {
				name: "pr",
				detail: "Obbligatorio. Prezzo del titolo per valore nominale di € 100."
			},
			redemption: {
				name: "redemption",
				detail: "Obbligatorio. Valore di rimborso del titolo per valore nominale di € 100."
			},
			frequency: {
				name: "frequency",
				detail: "Obbligatorio. Numero di pagamenti per anno. Se i pagamenti sono annuali, num_rate = 1; se sono semestrali, num_rate = 2; se sono trimestrali, num_rate = 4."
			},
			basis: {
				name: "basis",
				detail: "Opzionale. Tipo di base da utilizzare per il conteggio dei giorni."
			}
		}
	},
	YIELDDISC: {
		description: "Restituisce il rendimento annuo di un titolo scontato.",
		abstract: "Restituisce il rendimento annuo di un titolo scontato.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/yielddisc-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obbligatorio. Data di liquidazione del titolo. La data di liquidazione del titolo è la data, successiva alla data di emissione, in cui il titolo viene venduto al compratore."
			},
			maturity: {
				name: "maturity",
				detail: "Obbligatorio. Data di scadenza del titolo. È la data in cui il titolo scade."
			},
			pr: {
				name: "pr",
				detail: "Obbligatorio. Prezzo del titolo per valore nominale di € 100."
			},
			redemption: {
				name: "redemption",
				detail: "Obbligatorio. Valore di rimborso del titolo per valore nominale di € 100."
			},
			basis: {
				name: "basis",
				detail: "Opzionale. Tipo di base da utilizzare per il conteggio dei giorni."
			}
		}
	},
	YIELDMAT: {
		description: "Restituisce il rendimento annuo alla scadenza di un titolo che paga interessi.",
		abstract: "Restituisce il rendimento annuo alla scadenza di un titolo che paga interessi.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/yieldmat-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obbligatorio. Data di liquidazione del titolo. La data di liquidazione del titolo è la data, successiva alla data di emissione, in cui il titolo viene venduto al compratore."
			},
			maturity: {
				name: "maturity",
				detail: "Obbligatorio. Data di scadenza del titolo. È la data in cui il titolo scade."
			},
			issue: {
				name: "issue",
				detail: "Obbligatorio. Data di emissione del titolo espressa come numero seriale."
			},
			rate: {
				name: "rate",
				detail: "Obbligatorio. Tasso di interesse del titolo alla data di emissione."
			},
			pr: {
				name: "pr",
				detail: "Obbligatorio. Prezzo del titolo per valore nominale di € 100."
			},
			basis: {
				name: "basis",
				detail: "Opzionale. Tipo di base da utilizzare per il conteggio dei giorni."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/information/it-IT.ts
const locale$8 = {
	CELL: {
		description: "La funzione CELLA restituisce informazioni sulla formattazione, la posizione o il contenuto di una cella. Se ad esempio si desidera verificare che in una cella sia contenuto un valore numerico anziché testo prima di eseguire un calcolo basato su tale cella, è possibile utilizzare la formula seguente:",
		abstract: "La funzione CELLA restituisce informazioni sulla formattazione, la posizione o il contenuto di una cella. Se ad esempio si desidera verificare che in una cella sia contenuto un valore numerico anziché testo prima di eseguire un calcolo basato su tale cella, è possibile utilizzare la formula seguente:",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/cell-function"
		}],
		functionParameter: {
			infoType: {
				name: "info_type",
				detail: "Valore di testo che indica il tipo di dati della cella che devono essere restituiti. Nell'elenco seguente vengono illustrati i possibili valori dell'argomento Info e i risultati corrispondenti."
			},
			reference: {
				name: "reference",
				detail: "Cella di cui si desidera ottenere informazioni. Se omesso, le informazioni specificate nell'argomento info_type vengono restituite per la cella selezionata al momento del calcolo. Se l'argomento rif è un intervallo di celle, la funzione CELLA restituirà le informazioni per la cella attiva nell'intervallo selezionato. Importante: Anche se tecnicamente il riferimento è facoltativo, è consigliabile includerlo nella formula, a meno che non si capisca l'effetto della sua assenza sul risultato della formula e non si voglia applicare tale effetto. Se si omette l'argomento rif, le informazioni su una cella specifica non vengono produrrà in modo affidabile per i motivi seguenti: In modalità di calcolo automatico, quando una cella viene modificata da un utente, il calcolo può essere attivato prima o dopo l'avanzamento della selezione, a seconda della piattaforma in uso per Excel. Ad esempio, Excel per Windows attiva attualmente il calcolo prima delle modifiche alla selezione, ma Excel per il web lo attiva in un secondo momento. Quando Co-Authoring con un altro utente che apporta una modifica, questa funzione segnala la cella attiva anziché quella dell'editor. Qualsiasi ricalcolo, ad esempio premendo F9, farà sì che la funzione restituisca un nuovo risultato anche se non si è verificata alcuna modifica della cella."
			}
		}
	},
	ERROR_TYPE: {
		description: "Restituisce un numero corrispondente a uno dei valori di errore di Microsoft Excel oppure restituisce l'errore #N/D se non vi è alcun errore. È possibile utilizzare la funzione ERRORE.TIPO all'interno di una funzione SE, in modo da determinare il tipo di errore verificatosi e restituire una stringa di testo, come un messaggio, invece del valore di errore.",
		abstract: "Restituisce un numero corrispondente a uno dei valori di errore di Microsoft Excel oppure restituisce l'errore #N/D se non vi è alcun errore. È possibile utilizzare la funzione ERRORE.TIPO all'interno di una funzione SE, in modo da determinare il tipo di errore verificatosi e restituire una stringa di testo, come un messaggio, invece del valore di errore.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/error-type-function"
		}],
		functionParameter: { errorVal: {
			name: "error_val",
			detail: "Obbligatorio. Valore di errore di cui si desidera trovare il numero di identificazione. Sebbene errore possa essere il valore di errore stesso, si tratta in genere di un riferimento a una cella contenente una formula che si desidera verificare."
		} }
	},
	INFO: {
		description: "Restituisce informazioni sull'ambiente operativo corrente.",
		abstract: "Restituisce informazioni sull'ambiente operativo corrente.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/info-function"
		}],
		functionParameter: { typeText: {
			name: "Type_text",
			detail: "Obbligatorio. Testo che specifica il tipo di informazioni che si desidera venga restituito."
		} }
	},
	ISBETWEEN: {
		description: "Verifica se un numero specificato è compreso tra altri due numeri, includendo o escludendo gli estremi.",
		abstract: "Verifica se un numero specificato è compreso tra altri due numeri, includendo o escludendo gli estremi.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/10538337?hl=it"
		}],
		functionParameter: {
			valueToCompare: {
				name: "value_to_compare",
				detail: "Valore da verificare per stabilire se è compreso tra `lower_value` e `upper_value`."
			},
			lowerValue: {
				name: "lower_value",
				detail: "Limite inferiore dell'intervallo di valori in cui può rientrare `value_to_compare`."
			},
			upperValue: {
				name: "upper_value",
				detail: "Limite superiore dell'intervallo di valori in cui può rientrare `value_to_compare`."
			},
			lowerValueIsInclusive: {
				name: "lower_value_is_inclusive",
				detail: "Indica se l'intervallo di valori include `lower_value`. Per impostazione predefinita è VERO."
			},
			upperValueIsInclusive: {
				name: "upper_value_is_inclusive",
				detail: "Indica se l'intervallo di valori include `upper_value`. Per impostazione predefinita è VERO."
			}
		}
	},
	ISBLANK: {
		description: "Ognuna di queste funzioni, definite collettivamente funzioni VAL , esamina il valore specificato e restituisce VERO o FALSO a seconda dell'esito. La funzione VAL.VUOTO ad esempio restituirà il valore logico VERO se l'argomento val è un riferimento a una cella vuota e il valore logico FALSO in caso contrario.",
		abstract: "Ognuna di queste funzioni, definite collettivamente funzioni VAL , esamina il valore specificato e restituisce VERO o FALSO a seconda dell'esito. La funzione VAL.VUOTO ad esempio restituirà il valore logico VERO se l'argomento val è un riferimento a una cella vuota e il valore logico FALSO in caso contrario.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obbligatorio. Valore da esaminare. L'argomento val può essere una cella vuota, un valore logico, numerico, di errore, di testo o di riferimento oppure un nome che si riferisce a uno di questi valori."
		} }
	},
	ISDATE: {
		description: "La funzione ISDATE indica se un valore è una data.",
		abstract: "La funzione ISDATE indica se un valore è una data.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9061381?hl=it"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Valore da verificare come data."
		} }
	},
	ISEMAIL: {
		description: "La funzione ISEMAIL verifica se un valore è un indirizzo e-mail valido. Controlla che il valore rispetti un formato comunemente accettato per gli indirizzi e-mail, ma non verifica che l'indirizzo esista.",
		abstract: "La funzione ISEMAIL verifica se un valore è un indirizzo e-mail valido. Controlla che il valore rispetti un formato comunemente accettato per gli indirizzi e-mail, ma non verifica che l'indirizzo esista.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3256503?hl=it"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Valore da verificare come indirizzo e-mail."
		} }
	},
	ISERR: {
		description: "Ognuna di queste funzioni, definite collettivamente funzioni VAL , esamina il valore specificato e restituisce VERO o FALSO a seconda dell'esito. La funzione VAL.VUOTO ad esempio restituirà il valore logico VERO se l'argomento val è un riferimento a una cella vuota e il valore logico FALSO in caso contrario.",
		abstract: "Ognuna di queste funzioni, definite collettivamente funzioni VAL , esamina il valore specificato e restituisce VERO o FALSO a seconda dell'esito. La funzione VAL.VUOTO ad esempio restituirà il valore logico VERO se l'argomento val è un riferimento a una cella vuota e il valore logico FALSO in caso contrario.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obbligatorio. Valore da esaminare. L'argomento val può essere una cella vuota, un valore logico, numerico, di errore, di testo o di riferimento oppure un nome che si riferisce a uno di questi valori."
		} }
	},
	ISERROR: {
		description: "Ognuna di queste funzioni, definite collettivamente funzioni VAL , esamina il valore specificato e restituisce VERO o FALSO a seconda dell'esito. La funzione VAL.VUOTO ad esempio restituirà il valore logico VERO se l'argomento val è un riferimento a una cella vuota e il valore logico FALSO in caso contrario.",
		abstract: "Ognuna di queste funzioni, definite collettivamente funzioni VAL , esamina il valore specificato e restituisce VERO o FALSO a seconda dell'esito. La funzione VAL.VUOTO ad esempio restituirà il valore logico VERO se l'argomento val è un riferimento a una cella vuota e il valore logico FALSO in caso contrario.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obbligatorio. Valore da esaminare. L'argomento val può essere una cella vuota, un valore logico, numerico, di errore, di testo o di riferimento oppure un nome che si riferisce a uno di questi valori."
		} }
	},
	ISEVEN: {
		description: "Restituisce VERO se num è pari oppure FALSO se num è dispari.",
		abstract: "Restituisce VERO se num è pari oppure FALSO se num è dispari.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/iseven-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obbligatorio. Valore da esaminare. Se num non è un numero intero, la parte decimale verrà troncata."
		} }
	},
	ISFORMULA: {
		description: "Controlla se esiste un riferimento a una cella che contiene una formula e restituisce VERO o FALSO.",
		abstract: "Controlla se esiste un riferimento a una cella che contiene una formula e restituisce VERO o FALSO.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/isformula-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "Obbligatorio. L'argomento è un riferimento alla cella che si vuole verificare. Il valore può essere un riferimento di cella, una formula o un nome che fa riferimento a una cella."
		} }
	},
	ISLOGICAL: {
		description: "Ognuna di queste funzioni, definite collettivamente funzioni VAL , esamina il valore specificato e restituisce VERO o FALSO a seconda dell'esito. La funzione VAL.VUOTO ad esempio restituirà il valore logico VERO se l'argomento val è un riferimento a una cella vuota e il valore logico FALSO in caso contrario.",
		abstract: "Ognuna di queste funzioni, definite collettivamente funzioni VAL , esamina il valore specificato e restituisce VERO o FALSO a seconda dell'esito. La funzione VAL.VUOTO ad esempio restituirà il valore logico VERO se l'argomento val è un riferimento a una cella vuota e il valore logico FALSO in caso contrario.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obbligatorio. Valore da esaminare. L'argomento val può essere una cella vuota, un valore logico, numerico, di errore, di testo o di riferimento oppure un nome che si riferisce a uno di questi valori."
		} }
	},
	ISNA: {
		description: "Ognuna di queste funzioni, definite collettivamente funzioni VAL , esamina il valore specificato e restituisce VERO o FALSO a seconda dell'esito. La funzione VAL.VUOTO ad esempio restituirà il valore logico VERO se l'argomento val è un riferimento a una cella vuota e il valore logico FALSO in caso contrario.",
		abstract: "Ognuna di queste funzioni, definite collettivamente funzioni VAL , esamina il valore specificato e restituisce VERO o FALSO a seconda dell'esito. La funzione VAL.VUOTO ad esempio restituirà il valore logico VERO se l'argomento val è un riferimento a una cella vuota e il valore logico FALSO in caso contrario.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obbligatorio. Valore da esaminare. L'argomento val può essere una cella vuota, un valore logico, numerico, di errore, di testo o di riferimento oppure un nome che si riferisce a uno di questi valori."
		} }
	},
	ISNONTEXT: {
		description: "Ognuna di queste funzioni, definite collettivamente funzioni VAL , esamina il valore specificato e restituisce VERO o FALSO a seconda dell'esito. La funzione VAL.VUOTO ad esempio restituirà il valore logico VERO se l'argomento val è un riferimento a una cella vuota e il valore logico FALSO in caso contrario.",
		abstract: "Ognuna di queste funzioni, definite collettivamente funzioni VAL , esamina il valore specificato e restituisce VERO o FALSO a seconda dell'esito. La funzione VAL.VUOTO ad esempio restituirà il valore logico VERO se l'argomento val è un riferimento a una cella vuota e il valore logico FALSO in caso contrario.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obbligatorio. Valore da esaminare. L'argomento val può essere una cella vuota, un valore logico, numerico, di errore, di testo o di riferimento oppure un nome che si riferisce a uno di questi valori."
		} }
	},
	ISNUMBER: {
		description: "Ognuna di queste funzioni, definite collettivamente funzioni VAL , esamina il valore specificato e restituisce VERO o FALSO a seconda dell'esito. La funzione VAL.VUOTO ad esempio restituirà il valore logico VERO se l'argomento val è un riferimento a una cella vuota e il valore logico FALSO in caso contrario.",
		abstract: "Ognuna di queste funzioni, definite collettivamente funzioni VAL , esamina il valore specificato e restituisce VERO o FALSO a seconda dell'esito. La funzione VAL.VUOTO ad esempio restituirà il valore logico VERO se l'argomento val è un riferimento a una cella vuota e il valore logico FALSO in caso contrario.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obbligatorio. Valore da esaminare. L'argomento val può essere una cella vuota, un valore logico, numerico, di errore, di testo o di riferimento oppure un nome che si riferisce a uno di questi valori."
		} }
	},
	ISODD: {
		description: "Restituisce VERO se num è dispari oppure FALSO se num è pari.",
		abstract: "Restituisce VERO se num è dispari oppure FALSO se num è pari.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/isodd-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obbligatorio. Valore da esaminare. Se num non è un numero intero, la parte decimale verrà troncata."
		} }
	},
	ISOMITTED: {
		description: "Controlla se il valore in un'espressione LAMBDA non è presente e restituisce VERO o FALSO.",
		abstract: "Controlla se il valore in un'espressione LAMBDA non è presente e restituisce VERO o FALSO.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/isomitted-function"
		}],
		functionParameter: { argument: {
			name: "discussione",
			detail: "Valore da testare, ad esempio un parametro LAMBDA."
		} }
	},
	ISREF: {
		description: "Ognuna di queste funzioni, definite collettivamente funzioni VAL , esamina il valore specificato e restituisce VERO o FALSO a seconda dell'esito. La funzione VAL.VUOTO ad esempio restituirà il valore logico VERO se l'argomento val è un riferimento a una cella vuota e il valore logico FALSO in caso contrario.",
		abstract: "Ognuna di queste funzioni, definite collettivamente funzioni VAL , esamina il valore specificato e restituisce VERO o FALSO a seconda dell'esito. La funzione VAL.VUOTO ad esempio restituirà il valore logico VERO se l'argomento val è un riferimento a una cella vuota e il valore logico FALSO in caso contrario.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obbligatorio. Valore da esaminare. L'argomento val può essere una cella vuota, un valore logico, numerico, di errore, di testo o di riferimento oppure un nome che si riferisce a uno di questi valori."
		} }
	},
	ISTEXT: {
		description: "Ognuna di queste funzioni, definite collettivamente funzioni VAL , esamina il valore specificato e restituisce VERO o FALSO a seconda dell'esito. La funzione VAL.VUOTO ad esempio restituirà il valore logico VERO se l'argomento val è un riferimento a una cella vuota e il valore logico FALSO in caso contrario.",
		abstract: "Ognuna di queste funzioni, definite collettivamente funzioni VAL , esamina il valore specificato e restituisce VERO o FALSO a seconda dell'esito. La funzione VAL.VUOTO ad esempio restituirà il valore logico VERO se l'argomento val è un riferimento a una cella vuota e il valore logico FALSO in caso contrario.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obbligatorio. Valore da esaminare. L'argomento val può essere una cella vuota, un valore logico, numerico, di errore, di testo o di riferimento oppure un nome che si riferisce a uno di questi valori."
		} }
	},
	ISURL: {
		description: "Verifica se un valore è un URL valido.",
		abstract: "Verifica se un valore è un URL valido.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3256501?hl=it"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Valore da verificare come URL."
		} }
	},
	N: {
		description: "Restituisce un valore convertito in numero.",
		abstract: "Restituisce un valore convertito in numero.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/n-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obbligatorio. Valore che si desidera convertire. NUM converte i valori elencati nella tabella seguente."
		} }
	},
	NA: {
		description: "Restituisce il valore di errore #N/D. #N/D è il valore di errore che indica che non è disponibile alcun valore. Usare ND per contrassegnare le celle vuote. Immettendo #N/D nelle celle in cui mancano delle informazioni, si può evitare di includere inavvertitamente delle celle vuote nei calcoli. Quando una formula si riferisce a una cella contenente #N/D, restituisce il valore di errore #N/D.",
		abstract: "Restituisce il valore di errore #N/D. #N/D è il valore di errore che indica che non è disponibile alcun valore. Usare ND per contrassegnare le celle vuote. Immettendo #N/D nelle celle in cui mancano delle informazioni, si può evitare di includere inavvertitamente delle celle vuote nei calcoli. Quando una formula si riferisce a una cella contenente #N/D, restituisce il valore di errore #N/D.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/na-function"
		}],
		functionParameter: {}
	},
	SHEET: {
		description: "La funzione FOGLIO restituisce il numero del foglio specificato o di un altro riferimento.",
		abstract: "La funzione FOGLIO restituisce il numero del foglio specificato o di un altro riferimento.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/sheet-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Argomento facoltativo. Consente di specificare il nome di un foglio o di un riferimento per il quale si desidera ottenere il numero del foglio. In caso contrario, la funzione restituirà il numero del foglio contenente la funzione FOGLIO."
		} }
	},
	SHEETS: {
		description: "Restituisce il numero di fogli in un riferimento.",
		abstract: "Restituisce il numero di fogli in un riferimento.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/sheets-function"
		}],
		functionParameter: {}
	},
	TYPE: {
		description: "Restituisce un numero indicante il tipo di dati di un valore. Utilizzare la funzione TIPO quando il comportamento di un'altra funzione dipende dal tipo di valore contenuto in una determinata cella.",
		abstract: "Restituisce un numero indicante il tipo di dati di un valore. Utilizzare la funzione TIPO quando il comportamento di un'altra funzione dipende dal tipo di valore contenuto in una determinata cella.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/type-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obbligatorio. Qualsiasi valore di Microsoft Excel, ad esempio un numero, del testo, un valore logico e così via."
		} }
	}
};

//#endregion
//#region src/locale/function-list/logical/it-IT.ts
const locale$7 = {
	AND: {
		description: "La funzione E restituisce VERO se tutti gli argomenti restituiscono VERO e restituisce FALSO se uno o più argomenti restituiscono FALSO.",
		abstract: "La funzione E restituisce VERO se tutti gli argomenti restituiscono VERO e restituisce FALSO se uno o più argomenti restituiscono FALSO.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/and-function"
		}],
		functionParameter: {
			logical1: {
				name: "logical1",
				detail: "Prima condizione da verificare, che può restituire VERO o FALSO."
			},
			logical2: {
				name: "logical2",
				detail: "Condizioni aggiuntive da verificare, che possono restituire VERO o FALSO, fino a un massimo di 255."
			}
		}
	},
	BYCOL: {
		description: "Applica una funzione LAMBDA a ogni colonna e restituisce una matrice dei risultati. Ad esempio, se la matrice originale è di 3 colonne per 2 righe, la matrice restituita sarà di 3 colonne per 1 riga.",
		abstract: "Applica una funzione LAMBDA a ogni colonna e restituisce una matrice dei risultati. Ad esempio, se la matrice originale è di 3 colonne per 2 righe, la matrice restituita sarà di 3 colonne per 1 riga.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/bycol-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Matrice da separare per colonna."
			},
			lambda: {
				name: "lambda",
				detail: "Funzione LAMBDA che accetta una colonna come unico parametro e calcola un risultato. Il parametro è una colonna della matrice."
			}
		}
	},
	BYROW: {
		description: "Applica una funzione LAMBDA a ogni riga e restituisce una matrice dei risultati. Ad esempio, se la matrice originale è di 3 colonne per 2 righe, la matrice restituita sarà di 1 colonna per 2 righe.",
		abstract: "Applica una funzione LAMBDA a ogni riga e restituisce una matrice dei risultati. Ad esempio, se la matrice originale è di 3 colonne per 2 righe, la matrice restituita sarà di 1 colonna per 2 righe.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/byrow-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Matrice da separare per riga."
			},
			lambda: {
				name: "lambda",
				detail: "Funzione LAMBDA che accetta una riga come unico parametro e calcola un risultato. Il parametro è una riga della matrice."
			}
		}
	},
	FALSE: {
		description: "Restituisce il valore logico FALSO.",
		abstract: "Restituisce il valore logico FALSO.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/false-function"
		}],
		functionParameter: {}
	},
	IF: {
		description: "Ad esempio, =SE(C2=\"Sì\";1;2) significa: SE(C2 = Sì, allora restituisci 1, altrimenti restituisci 2).",
		abstract: "Ad esempio, =SE(C2=\"Sì\";1;2) significa: SE(C2 = Sì, allora restituisci 1, altrimenti restituisci 2).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/if-function"
		}],
		functionParameter: {
			logicalTest: {
				name: "logical_test",
				detail: "Condizione da testare."
			},
			valueIfTrue: {
				name: "value_if_true",
				detail: "Valore che si desidera venga restituito se il risultato di logical_test è VERO."
			},
			valueIfFalse: {
				name: "value_if_false",
				detail: "Valore che si desidera venga restituito se il risultato di logical_test è FALSO."
			}
		}
	},
	IFERROR: {
		description: "È possibile usare la funzione SE.ERRORE per gestire gli errori in una formula. SE.ERRORE restituisce un valore specificato dall'utente se la formula restituisce un errore. In caso contrario, restituisce il risultato della formula.",
		abstract: "È possibile usare la funzione SE.ERRORE per gestire gli errori in una formula. SE.ERRORE restituisce un valore specificato dall'utente se la formula restituisce un errore. In caso contrario, restituisce il risultato della formula.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/iferror-function"
		}],
		functionParameter: {
			value: {
				name: "value",
				detail: "Obbligatorio. Argomento in cui viene verificata la presenza di un errore."
			},
			valueIfError: {
				name: "value_if_error",
				detail: "Obbligatorio. Valore da restituire se la formula fornisce come risultato un errore. Vengono valutati i tipi di errore seguenti: #N/D, #VALORE!, #RIF!, #DIV/0!, #NUM!, #NOME? o #NULLO!."
			}
		}
	},
	IFNA: {
		description: "La funzione SE.NON.DISP restituisce il valore specificato se una formula restituisce il valore di errore #N/D; in caso contrario, restituisce il risultato della formula.",
		abstract: "La funzione SE.NON.DISP restituisce il valore specificato se una formula restituisce il valore di errore #N/D; in caso contrario, restituisce il risultato della formula.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/ifna-function"
		}],
		functionParameter: {
			value: {
				name: "value",
				detail: "Argomento in cui viene verificata la presenza del valore di errore #N/D."
			},
			valueIfNa: {
				name: "value_if_na",
				detail: "Valore da restituire se la formula fornisce come risultato un valore di errore #N/D."
			}
		}
	},
	IFS: {
		description: "La funzione PIÙ.SE controlla se vengono soddisfatte una o più condizioni e restituisce un valore che corrisponde alla prima condizione VERA. PIÙ.SE può essere usata al posto di più istruzioni SE annidate ed è molto più facile da leggere in presenza di più condizioni.",
		abstract: "La funzione PIÙ.SE controlla se vengono soddisfatte una o più condizioni e restituisce un valore che corrisponde alla prima condizione VERA. PIÙ.SE può essere usata al posto di più istruzioni SE annidate ed è molto più facile da leggere in presenza di più condizioni.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/ifs-function"
		}],
		functionParameter: {
			logicalTest1: {
				name: "logical_test1",
				detail: "Condizione che restituisce VERO o FALSO."
			},
			valueIfTrue1: {
				name: "value_if_true1",
				detail: "Risultato da restituire se logical_test1 restituisce VERO. Può essere vuoto."
			},
			logicalTest2: {
				name: "logical_test2",
				detail: "Condizione che restituisce VERO o FALSO."
			},
			valueIfTrue2: {
				name: "value_if_true2",
				detail: "Risultato da restituire se logical_testN restituisce VERO. Ogni value_if_trueN corrisponde a una condizione logical_testN e può essere vuoto."
			}
		}
	},
	LAMBDA: {
		description: "È possibile creare una funzione per una formula di uso comune, eliminare la necessità di copiare e incollare la formula (che può essere soggetta ad errori) e aggiungere le proprie funzioni alla libreria di funzioni nativa di Excel. Inoltre, una funzione LAMBDA non richiede VBA, macro o JavaScript, quindi anche i non programmatori possono trarre vantaggio dal suo uso.",
		abstract: "È possibile creare una funzione per una formula di uso comune, eliminare la necessità di copiare e incollare la formula (che può essere soggetta ad errori) e aggiungere le proprie funzioni alla libreria di funzioni nativa di Excel. Inoltre, una funzione LAMBDA non richiede VBA, macro o JavaScript, quindi anche i non programmatori possono trarre vantaggio dal suo uso.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/lambda-function"
		}],
		functionParameter: {
			parameter: {
				name: "parameter",
				detail: "Un valore da passare alla funzione, ad esempio un riferimento di cella, una stringa o un numero. È possibile immettere fino a 253 parametri. Questo argomento è facoltativo."
			},
			calculation: {
				name: "calculation",
				detail: "La formula da eseguire e restituire come risultato della funzione. Deve essere l'ultimo argomento e deve restituire un risultato. Questo argomento è obbligatorio."
			}
		}
	},
	LET: {
		description: "La LET funzione assegna nomi ai risultati del calcolo. Questo consente di archiviare calcoli intermedi e valori o di definire i nomi all'interno di una formula. Questi nomi si applicano solo all'interno dell'ambito della LET funzione. Analogamente alle variabili nella programmazione, LET viene eseguita tramite la sintassi nativa della formula di Excel.",
		abstract: "La LET funzione assegna nomi ai risultati del calcolo. Questo consente di archiviare calcoli intermedi e valori o di definire i nomi all'interno di una formula. Questi nomi si applicano solo all'interno dell'ambito della LET funzione. Analogamente alle variabili nella programmazione, LET viene eseguita tramite la sintassi nativa della formula di Excel.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/let-function"
		}],
		functionParameter: {
			name1: {
				name: "name1",
				detail: "Primo nome da assegnare. Deve iniziare con una lettera e non può essere il risultato di una formula né entrare in conflitto con la sintassi degli intervalli."
			},
			nameValue1: {
				name: "name_value1",
				detail: "Valore assegnato a name1."
			},
			calculationOrName2: {
				name: "calculation_or_name2",
				detail: "Calcolo che usa tutti i nomi della funzione LET e deve essere l'ultimo argomento, oppure un secondo nome da assegnare a name_value2."
			},
			nameValue2: {
				name: "name_value2",
				detail: "Valore assegnato a calculation_or_name2."
			},
			calculationOrName3: {
				name: "calculation_or_name3",
				detail: "Calcolo che usa tutti i nomi della funzione LET e deve essere l'ultimo argomento, oppure un terzo nome da assegnare a name_value3."
			}
		}
	},
	MAKEARRAY: {
		description: "Restituisce una matrice calcolata di una dimensione di riga e colonna specificata applicando una funzione LAMBDA .",
		abstract: "Restituisce una matrice calcolata di una dimensione di riga e colonna specificata applicando una funzione LAMBDA .",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/makearray-function"
		}],
		functionParameter: {
			number1: {
				name: "rows",
				detail: "Numero di righe della matrice. Deve essere maggiore di zero."
			},
			number2: {
				name: "cols",
				detail: "Numero di colonne della matrice. Deve essere maggiore di zero."
			},
			value3: {
				name: "lambda",
				detail: "Funzione LAMBDA chiamata per creare la matrice. Accetta due parametri: row, indice della riga, e col, indice della colonna."
			}
		}
	},
	MAP: {
		description: "Restituisce una matrice costituita dal mapping di ogni valore delle matrici a un nuovo valore applicando un'espressione LAMBDA per creare un nuovo valore.",
		abstract: "Restituisce una matrice costituita dal mapping di ogni valore delle matrici a un nuovo valore applicando un'espressione LAMBDA per creare un nuovo valore.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/map-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Prima matrice da mappare."
			},
			array2: {
				name: "array2",
				detail: "Seconda matrice da mappare."
			},
			lambda: {
				name: "lambda",
				detail: "Funzione LAMBDA che deve essere l'ultimo argomento e avere un parametro per ogni matrice fornita."
			}
		}
	},
	NOT: {
		description: "La funzione NON inverte il valore dell'argomento.",
		abstract: "La funzione NON inverte il valore dell'argomento.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/not-function"
		}],
		functionParameter: { logical: {
			name: "logical",
			detail: "Condizione di cui si desidera invertire la logica, che può restituire VERO o FALSO."
		} }
	},
	OR: {
		description: "La funzione O restituisce VERO se uno degli argomenti restituisce VERO e restituisce FALSO se tutti gli argomenti restituiscono FALSO.",
		abstract: "La funzione O restituisce VERO se uno degli argomenti restituisce VERO e restituisce FALSO se tutti gli argomenti restituiscono FALSO.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/or-function"
		}],
		functionParameter: {
			logical1: {
				name: "logical1",
				detail: "Prima condizione da verificare, che può restituire VERO o FALSO."
			},
			logical2: {
				name: "logical2",
				detail: "Condizioni aggiuntive da verificare, che possono restituire VERO o FALSO, fino a un massimo di 255."
			}
		}
	},
	REDUCE: {
		description: "Riduce una matrice a un valore accumulato applicando un'espressione LAMBDA a ogni valore e restituendo il valore totale nell'accumulatore.",
		abstract: "Riduce una matrice a un valore accumulato applicando un'espressione LAMBDA a ogni valore e restituendo il valore totale nell'accumulatore.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/reduce-function"
		}],
		functionParameter: {
			initialValue: {
				name: "initial_value",
				detail: "Imposta il valore iniziale dell'accumulatore."
			},
			array: {
				name: "array",
				detail: "Matrice da ridurre."
			},
			lambda: {
				name: "lambda",
				detail: "Funzione LAMBDA chiamata per ridurre la matrice. Accetta il valore accumulato, il valore corrente della matrice e il calcolo applicato a ogni elemento."
			}
		}
	},
	SCAN: {
		description: "Analizza una matrice applicando un'espressione LAMBDA a ogni valore e restituisce una matrice con ogni valore intermedio.",
		abstract: "Analizza una matrice applicando un'espressione LAMBDA a ogni valore e restituisce una matrice con ogni valore intermedio.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/scan-function"
		}],
		functionParameter: {
			initialValue: {
				name: "initial_value",
				detail: "Imposta il valore iniziale dell'accumulatore."
			},
			array: {
				name: "array",
				detail: "Matrice da analizzare."
			},
			lambda: {
				name: "lambda",
				detail: "Espressione LAMBDA chiamata per ridurre la matrice. La funzione LAMBDA accetta tre parametri: Accumulatore Il valore è stato sommato e restituito come risultato finale. Valore Valore corrente della matrice. Corpo Calcolo applicato a ogni elemento della matrice."
			}
		}
	},
	SWITCH: {
		description: "La funzione SWITCH valuta un valore, chiamato espressione , rispetto a un elenco di valori e restituisce il risultato che equivale al primo valore corrispondente. Se non ci sono valori corrispondenti, verrà restituito un valore predefinito facoltativo.",
		abstract: "La funzione SWITCH valuta un valore, chiamato espressione , rispetto a un elenco di valori e restituisce il risultato che equivale al primo valore corrispondente. Se non ci sono valori corrispondenti, verrà restituito un valore predefinito facoltativo.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/switch-function"
		}],
		functionParameter: {
			expression: {
				name: "expression",
				detail: "Valore, ad esempio numero, data o testo, da confrontare con value1 fino a value126."
			},
			value1: {
				name: "value1",
				detail: "Valore da confrontare con expression."
			},
			result1: {
				name: "result1",
				detail: "Valore da restituire quando l'argomento valueN corrispondente coincide con expression. Deve essere fornito per ogni valueN."
			},
			defaultOrValue2: {
				name: "default_or_value2",
				detail: "Valore da restituire se non viene trovata alcuna corrispondenza nelle espressioni valueN. Deve essere l'ultimo argomento della funzione."
			},
			result2: {
				name: "result2",
				detail: "Valore da restituire quando l'argomento valueN corrispondente coincide con expression. Deve essere fornito per ogni valueN."
			}
		}
	},
	TRUE: {
		description: "Restituisce il valore logico VERO. È possibile usare questa funzione quando si vuole restituire il valore VERO in base a una condizione. Ad esempio:",
		abstract: "Restituisce il valore logico VERO. È possibile usare questa funzione quando si vuole restituire il valore VERO in base a una condizione. Ad esempio:",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/true-function"
		}],
		functionParameter: {}
	},
	XOR: {
		description: "La funzione XOR restituisce un or esclusivo logico di tutti gli argomenti.",
		abstract: "La funzione XOR restituisce un or esclusivo logico di tutti gli argomenti.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/xor-function"
		}],
		functionParameter: {
			logical1: {
				name: "logical1",
				detail: "Prima condizione da verificare, che può restituire VERO o FALSO."
			},
			logical2: {
				name: "logical2",
				detail: "Condizioni aggiuntive da verificare, che possono restituire VERO o FALSO, fino a un massimo di 255."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/lookup/it-IT.ts
const locale$6 = {
	ADDRESS: {
		description: "È possibile usare la funzione INDIRIZZO per ottenere l'indirizzo di una cella di un foglio di lavoro, in base a numeri di riga e di colonna specificati. Ad esempio, INDIRIZZO(2;3) restituisce $C$2 . Come altro esempio, INDIRIZZO(77.300) restituisce $KN$77 . È possibile usare altre funzioni, ad esempio RIF.RIGA e RIF.COLONNA , per fornire gli argomenti per i numeri di riga e di colonna per la funzione INDIRIZZO .",
		abstract: "È possibile usare la funzione INDIRIZZO per ottenere l'indirizzo di una cella di un foglio di lavoro, in base a numeri di riga e di colonna specificati. Ad esempio, INDIRIZZO(2;3) restituisce $C$2 . Come altro esempio, INDIRIZZO(77.300) restituisce $KN$77 . È possibile usare altre funzioni, ad esempio RIF.RIGA e RIF.COLONNA , per fornire gli argomenti per i numeri di riga e di colonna per la funzione INDIRIZZO .",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/address-function"
		}],
		functionParameter: {
			row_num: {
				name: "row number",
				detail: "Obbligatorio. Valore numerico che specifica il numero di riga da usare nel riferimento di cella."
			},
			column_num: {
				name: "column number",
				detail: "Obbligatorio. Valore numerico che specifica il numero di colonna da usare nel riferimento di cella."
			},
			abs_num: {
				name: "type of reference",
				detail: "Opzionale. Valore numerico che specifica il tipo di riferimento da restituire."
			},
			a1: {
				name: "style of reference",
				detail: "Opzionale. Valore logico che specifica lo stile di riferimento A1 o R1C1. Nello stile A1 le colonne sono etichettate alfabeticamente e le righe in ordine numerico. Nello stile di riferimento R1C1 sia le colonne che le righe vengono etichettate numericamente. Se l'argomento A1 è VERO o è omesso, la funzione INDIRIZZO restituisce un riferimento in stile A1; se è FALSO, la funzione INDIRIZZO restituisce un riferimento di stile R1C1. Nota Per cambiare lo stile di riferimento usato da Excel, fare clic sulla scheda File , fare clic su Opzioni e quindi su Formule . In Utilizzo delle formule selezionare o deselezionare la casella di controllo Stile di riferimento R1C1 ."
			},
			sheet_text: {
				name: "worksheet name",
				detail: "Opzionale. Valore di testo che specifica il nome del foglio di lavoro da usare come riferimento esterno. Ad esempio, la formula =INDIRIZZO(1;1,,,\"Foglio2\") restituisce Foglio2!$A$1 . Se l'argomento sheet_text viene omesso, non viene usato alcun nome di foglio e l'indirizzo restituito dalla funzione fa riferimento a una cella del foglio corrente."
			}
		}
	},
	AREAS: {
		description: "Restituisce il numero di aree in un riferimento. Un'area è un intervallo di celle contigue o una singola cella.",
		abstract: "Restituisce il numero di aree in un riferimento. Un'area è un intervallo di celle contigue o una singola cella.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/areas-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "Obbligatorio. Riferimento a una cella o a un intervallo di celle e può riferirsi a più aree. Se si desidera specificare più riferimenti in un unico argomento, sarà necessario includere coppie supplementari di parentesi in modo che il punto e virgola non venga interpretato da Microsoft Excel come un separatore di campo. Vedere l'esempio seguente."
		} }
	},
	CHOOSE: {
		description: "Usa indice per restituire un valore dall'elenco degli argomenti valore. Usare la funzione SCEGLI per selezionare da uno a 254 valori in base al numero di indice. Ad esempio, se i valori da valore1 a valore7 sono i giorni della settimana, SCEGLI restituirà uno dei giorni quando verrà usato come indice un numero da 1 a 7.",
		abstract: "Usa indice per restituire un valore dall'elenco degli argomenti valore. Usare la funzione SCEGLI per selezionare da uno a 254 valori in base al numero di indice. Ad esempio, se i valori da valore1 a valore7 sono i giorni della settimana, SCEGLI restituirà uno dei giorni quando verrà usato come indice un numero da 1 a 7.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/choose-function"
		}],
		functionParameter: {
			indexNum: {
				name: "index_num",
				detail: "Specifica quale argomento valore viene selezionato. Deve essere un numero da 1 a 254, una formula o un riferimento a una cella contenente tale numero."
			},
			value1: {
				name: "value1",
				detail: "Valore o azione selezionata in base a index_num. Può essere un numero, riferimento di cella, nome definito, formula, funzione o testo."
			},
			value2: {
				name: "value2",
				detail: "Da 1 a 254 argomenti valore."
			}
		}
	},
	CHOOSECOLS: {
		description: "Restituisce le colonne specificate da una matrice.",
		abstract: "Restituisce le colonne specificate da una matrice.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/choosecols-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Matrice contenente le colonne da restituire nella nuova matrice. Obbligatorio."
			},
			colNum1: {
				name: "col_num1",
				detail: "Prima colonna da restituire. Obbligatorio."
			},
			colNum2: {
				name: "col_num2",
				detail: "Colonne aggiuntive da restituire. Facoltativo."
			}
		}
	},
	CHOOSEROWS: {
		description: "Restituisce le righe specificate da una matrice.",
		abstract: "Restituisce le righe specificate da una matrice.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/chooserows-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Matrice contenente le colonne da restituire nella nuova matrice. Obbligatorio."
			},
			rowNum1: {
				name: "row_num1",
				detail: "Il numero della prima riga da restituire. Obbligatorio."
			},
			rowNum2: {
				name: "row_num2",
				detail: "Ulteriori numeri di riga da restituire. Facoltativo."
			}
		}
	},
	COLUMN: {
		description: "La funzione RIF.COLONNA restituisce il numero di colonna del riferimento di cella specificato. Ad esempio, la formula =COLONNA(D10) restituisce 4, perché la colonna D è la quarta colonna.",
		abstract: "La funzione RIF.COLONNA restituisce il numero di colonna del riferimento di cella specificato. Ad esempio, la formula =COLONNA(D10) restituisce 4, perché la colonna D è la quarta colonna.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/column-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "Cella o intervallo di celle di cui si desidera restituire il numero di colonna."
		} }
	},
	COLUMNS: {
		description: "Restituisce il numero di colonne in una matrice o in un riferimento.",
		abstract: "Restituisce il numero di colonne in una matrice o in un riferimento.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/columns-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "Obbligatorio. Una formula matrice o matrice oppure un riferimento a un intervallo di celle di cui si desidera calcolare il numero di colonne."
		} }
	},
	DROP: {
		description: "Esclude un numero specificato di righe o colonne contigue dall'inizio o dalla fine di una matrice. Questa funzione può risultare utile per rimuovere intestazioni e piè di pagina in un report di Excel per restituire solo i dati.",
		abstract: "Esclude un numero specificato di righe o colonne contigue dall'inizio o dalla fine di una matrice. Questa funzione può risultare utile per rimuovere intestazioni e piè di pagina in un report di Excel per restituire solo i dati.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/drop-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Matrice da cui rilasciare righe o colonne."
			},
			rows: {
				name: "rows",
				detail: "Numero di righe da eliminare. Un valore negativo viene eliminato dalla fine della matrice."
			},
			columns: {
				name: "columns",
				detail: "Numero di colonne da escludere. Un valore negativo viene eliminato dalla fine della matrice."
			}
		}
	},
	EXPAND: {
		description: "Espande o riempie una matrice in base alle dimensioni di riga e colonna specificate.",
		abstract: "Espande o riempie una matrice in base alle dimensioni di riga e colonna specificate.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/expand-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Matrice da espandere."
			},
			rows: {
				name: "rows",
				detail: "Numero di righe nella matrice espansa. Se mancano, le righe non verranno espanse."
			},
			columns: {
				name: "columns",
				detail: "Numero di colonne nella matrice espansa. Se mancano, le colonne non verranno espanse."
			},
			padWith: {
				name: "pad_with",
				detail: "Valore con cui inserire il tastierino. L'impostazione predefinita è #N/A."
			}
		}
	},
	FILTER: {
		description: "Nell'esempio seguente è stata usata la formula =FILTRO(A5:D20,C5:C20=H2,\"\") per restituire tutti i record per “Mela”, secondo quanto selezionato nella cella H2, e, se non ci sono \"mele\", restituire una stringa vuota (\"\").",
		abstract: "Nell'esempio seguente è stata usata la formula =FILTRO(A5:D20,C5:C20=H2,\"\") per restituire tutti i record per “Mela”, secondo quanto selezionato nella cella H2, e, se non ci sono \"mele\", restituire una stringa vuota (\"\").",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/filter-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "La matrice o l’intervallo da filtrare"
			},
			include: {
				name: "include",
				detail: "Una matrice booleana la cui altezza o larghezza equivale alla matrice"
			},
			ifEmpty: {
				name: "if_empty",
				detail: "Il valore da restituire se tutti i valori nella matrice inclusa sono vuoti (il filtro non restituisce nulla)"
			}
		}
	},
	FORMULATEXT: {
		description: "Restituisce una formula sotto forma di stringa.",
		abstract: "Restituisce una formula sotto forma di stringa.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/formulatext-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "Obbligatorio. Riferimento a una cella o un intervallo di celle."
		} }
	},
	GETPIVOTDATA: {
		description: "Restituisce i dati visibili archiviati in una tabella pivot.",
		abstract: "Restituisce i dati visibili archiviati in una tabella pivot.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/getpivotdata-function"
		}],
		functionParameter: {
			dataField: {
				name: "dataField",
				detail: "Nome del campo della tabella pivot contenente i dati che si desidera recuperare. Deve essere racchiuso tra virgolette. Esempio: =INFO.DATI.TAB.PIVOT(\"Vendite\", A3). \"Vendite\" è il campo Valori che si desidera recuperare. Poiché non viene specificato nessun altro campo, INFO.DATI.TAB.PIVOT restituisce l'importo totale delle vendite."
			},
			pivotTable: {
				name: "pivotTable",
				detail: "Riferimento a una cella, a un intervallo di celle o a un intervallo di celle denominato all'interno della tabella pivot. Questa informazione viene utilizzata per determinare quale tabella pivot contiene i dati che si desidera recuperare. Esempio: =INFO.DATI.TAB.PIVOT(\"Vendite\", A3). Qui A3 è un riferimento all'interno della tabella pivot e indica alla formula quale tabella pivot usare."
			},
			field1: {
				name: "field1",
				detail: "Da 1 a 126 coppie di nomi di campi e nomi di elementi che descrivono i dati che si desidera recuperare. Le coppie possono trovarsi in qualsiasi ordine. I nomi di campi e di elementi diversi da date e numeri devono essere racchiusi tra virgolette. Esempio: =INFO.DATI.TAB.PIVOT(\"Vendite\",A3, \"Mese\", \"Mar\"). Qui \"Mese\" è il campo e \"Mar\" è l'elemento. Per specificare più elementi per un campo, racchiuderli tra parentesi graffe (ad esempio: {\"Mar\", \"Apr\"}). Per le tabelle pivot OLAP , gli elementi possono contenere il nome dell'origine della dimensione e il nome dell'origine dell'elemento. Una coppia campo-elemento per una tabella pivot OLAP ha un aspetto simile al seguente: \"[Prodotto]\",\"[Prodotto].[Tutti i prodotti].[Alimenti].[Prodotti da forno]\""
			},
			item1: {
				name: "item1",
				detail: "Da 1 a 126 coppie di nomi di campi e nomi di elementi che descrivono i dati che si desidera recuperare. Le coppie possono trovarsi in qualsiasi ordine. I nomi di campi e di elementi diversi da date e numeri devono essere racchiusi tra virgolette. Esempio: =INFO.DATI.TAB.PIVOT(\"Vendite\",A3, \"Mese\", \"Mar\"). Qui \"Mese\" è il campo e \"Mar\" è l'elemento. Per specificare più elementi per un campo, racchiuderli tra parentesi graffe (ad esempio: {\"Mar\", \"Apr\"}). Per le tabelle pivot OLAP , gli elementi possono contenere il nome dell'origine della dimensione e il nome dell'origine dell'elemento. Una coppia campo-elemento per una tabella pivot OLAP ha un aspetto simile al seguente: \"[Prodotto]\",\"[Prodotto].[Tutti i prodotti].[Alimenti].[Prodotti da forno]\""
			}
		}
	},
	HLOOKUP: {
		description: "Cerca un valore nella riga superiore di una tabella o una matrice di valori e restituisce un valore nella stessa colonna dalla riga indicata nella tabella o nella matrice. Usare la funzione CERCA.ORIZZ quando i valori di confronto sono collocati in una riga superiore di una tabella di dati e si desidera estendere la ricerca verso il basso di un numero specifico di righe. Usare la funzione CERCA.VERT quando i valori di confronto sono collocati in una colonna a sinistra dei dati che si desidera cercare.",
		abstract: "Cerca un valore nella riga superiore di una tabella o una matrice di valori e restituisce un valore nella stessa colonna dalla riga indicata nella tabella o nella matrice. Usare la funzione CERCA.ORIZZ quando i valori di confronto sono collocati in una riga superiore di una tabella di dati e si desidera estendere la ricerca verso il basso di un numero specifico di righe. Usare la funzione CERCA.VERT quando i valori di confronto sono collocati in una colonna a sinistra dei dati che si desidera cercare.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/hlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "Obbligatorio. Valore da ricercare nella prima riga della tabella. Valore può essere un valore, un riferimento o una stringa di testo."
			},
			tableArray: {
				name: "table_array",
				detail: "Obbligatorio. Tabella di informazioni nella quale vengono cercati i dati. Usare un riferimento a un intervallo o un nome di intervallo. I valori nella prima riga di tabella_matrice possono essere testo, numeri o valori logici. Se range_lookup è VERO, i valori nella prima riga di table_array devono essere disposti in ordine crescente: ...-2, -1, 0, 1, 2,... , A-Z, FALSO, VERO; in caso contrario, CERCA.ORIZZ potrebbe non fornire il valore corretto. Se range_lookup è FALSO, non è necessario ordinare table_array. La funzione non rileva le maiuscole. Disporre i valori in ordine crescente, da sinistra a destra. Per altre informazioni, vedere Ordinare i dati in un intervallo o in una tabella ."
			},
			rowIndexNum: {
				name: "row_index_num",
				detail: "Obbligatorio. Numero di riga in table_array da cui verrà restituito il valore corrispondente. Un row_index_num di 1 restituisce il valore della prima riga in table_array, un row_index_num di 2 restituisce il valore della seconda riga in table_array e così via. Se row_index_num è minore di 1, CERCA.ORIZZ restituirà il #VALUE! valore di errore; se row_index_num è maggiore del numero di righe in table_array, CERCA.ORIZZ restituirà il #REF! ."
			},
			rangeLookup: {
				name: "range_lookup",
				detail: "Opzionale. Valore logico che specifica se si vuole che CERCA.ORIZZ trovi una corrispondenza esatta o approssimativa. Se VERO o è omesso, verrà restituita una corrispondenza approssimativa. In altre parole, se non viene trovata una corrispondenza esatta, viene restituito il valore più grande successivo minore di lookup_value. Se è FALSO, CERCA.ORIZZ troverà una corrispondenza esatta. Se non ne viene trovato uno, viene restituito il valore di errore #N/D."
			}
		}
	},
	HSTACK: {
		description: "Accoda le matrici orizzontalmente e in sequenza per restituire una matrice più grande.",
		abstract: "Accoda le matrici orizzontalmente e in sequenza per restituire una matrice più grande.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/hstack-function"
		}],
		functionParameter: {
			array1: {
				name: "array",
				detail: "Matrici da accodare."
			},
			array2: {
				name: "array",
				detail: "Matrici da accodare."
			}
		}
	},
	HYPERLINK: {
		description: "Crea un collegamento ipertestuale all'interno di una cella.",
		abstract: "Crea un collegamento ipertestuale all'interno di una cella.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3093313?hl=it"
		}],
		functionParameter: {
			url: {
				name: "url",
				detail: "URL completo della destinazione del collegamento tra virgolette o riferimento a una cella che lo contiene. Sono consentiti solo protocolli specifici; se non specificato, viene usato http://."
			},
			linkLabel: {
				name: "link_label",
				detail: "[FACOLTATIVO — url per impostazione predefinita] Testo da visualizzare nella cella come collegamento, tra virgolette o riferimento a una cella che lo contiene."
			}
		}
	},
	IMAGE: {
		description: "La funzione IMAGE inserisce immagini nelle celle da una posizione di origine insieme a un testo alternativo. È quindi possibile spostare e ridimensionare le celle, ordinare e filtrare e usare le immagini all'interno di una tabella di Excel. Usare questa funzione per migliorare visivamente elenchi di dati come inventari, giochi, dipendenti e concetti matematici.",
		abstract: "La funzione IMAGE inserisce immagini nelle celle da una posizione di origine insieme a un testo alternativo. È quindi possibile spostare e ridimensionare le celle, ordinare e filtrare e usare le immagini all'interno di una tabella di Excel. Usare questa funzione per migliorare visivamente elenchi di dati come inventari, giochi, dipendenti e concetti matematici.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/image-function"
		}],
		functionParameter: {
			source: {
				name: "source",
				detail: "Percorso URL, con protocollo \"https\", del file di immagine."
			},
			altText: {
				name: "alt_text",
				detail: "Testo alternativo che descrive l'immagine per l'accessibilità."
			},
			sizing: {
				name: "sizing",
				detail: "Specifica le dimensioni dell'immagine."
			},
			height: {
				name: "height",
				detail: "Altezza personalizzata dell'immagine in pixel."
			},
			width: {
				name: "width",
				detail: "Larghezza personalizzata dell'immagine in pixel."
			}
		}
	},
	INDEX: {
		description: "Restituisce il valore di un elemento in una tabella o una freccia, selezionato mediante gli indici dei numeri di riga e colonna.",
		abstract: "Restituisce il valore di un elemento in una tabella o una freccia, selezionato mediante gli indici dei numeri di riga e colonna.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/index-function"
		}],
		functionParameter: {
			reference: {
				name: "reference",
				detail: "Riferimento a uno o più intervalli di celle."
			},
			rowNum: {
				name: "row_num",
				detail: "Numero della riga in riferimento da cui restituire un riferimento."
			},
			columnNum: {
				name: "column_num",
				detail: "Numero della colonna in riferimento da cui restituire un riferimento."
			},
			areaNum: {
				name: "area_num",
				detail: "Seleziona un intervallo in riferimento da cui restituire l'intersezione di row_num e column_num."
			}
		}
	},
	INDIRECT: {
		description: "Restituisce il riferimento specificato da una stringa di testo. I riferimenti vengono calcolati immediatamente in modo da visualizzarne il contenuto. Usare la funzione INDIRETTO quando si desidera cambiare il riferimento a una cella all'interno di una formula senza modificare la formula stessa.",
		abstract: "Restituisce il riferimento specificato da una stringa di testo. I riferimenti vengono calcolati immediatamente in modo da visualizzarne il contenuto. Usare la funzione INDIRETTO quando si desidera cambiare il riferimento a una cella all'interno di una formula senza modificare la formula stessa.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/indirect-function"
		}],
		functionParameter: {
			refText: {
				name: "ref_text",
				detail: "Obbligatorio. Un riferimento a una cella che contiene un riferimento di tipo A1, un riferimento di tipo R1C1, un nome definito come riferimento oppure un riferimento a una cella come stringa di testo. Se rif non è un riferimento di cella valido, INDIRETTO restituirà il valore di errore #RIF! . Se rif si riferisce a un'altra cartella di lavoro (un riferimento esterno), l'altra cartella di lavoro deve essere aperta. Se la cartella di lavoro non è aperta, INDIRETTO restituirà il valore di errore #RIF! . Nota I riferimenti esterni non sono supportati in Excel Web App. Se rif si riferisce a un intervallo di celle esterno al limite di riga pari a 1.048.576 o al limite di colonna pari a 16.384 (XFD), INDIRETTO restituirà il valore di errore #RIF! ."
			},
			a1: {
				name: "a1",
				detail: "Opzionale. Valore logico che specifica il tipo di riferimento contenuto nella cella rif. Se a1 è VERO o è omesso, rif verrà interpretato come un riferimento di tipo A1. Se a1 è FALSO, rif verrà interpretato come un riferimento di tipo R1C1."
			}
		}
	},
	LOOKUP: {
		description: "La forma vettore di CERCA ricerca un valore in un intervallo di una sola riga o di una sola colonna, noto come vettore, e restituisce un valore nella stessa posizione in un secondo intervallo di una riga o di una colonna.",
		abstract: "La forma vettore di CERCA ricerca un valore in un intervallo di una sola riga o di una sola colonna, noto come vettore, e restituisce un valore nella stessa posizione in un secondo intervallo di una riga o di una colonna.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/lookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "Valore che CERCA cerca nel primo vettore. Può essere un numero, testo, valore logico, nome o riferimento a un valore."
			},
			lookupVectorOrArray: {
				name: "lookup_vectorOrArray",
				detail: "Intervallo che contiene una sola riga o una sola colonna."
			},
			resultVector: {
				name: "result_vector",
				detail: "Intervallo che contiene una sola riga o colonna e deve avere le stesse dimensioni di lookup_vector."
			}
		}
	},
	MATCH: {
		description: "La funzione CONFRONTA cerca un determinato elemento in un intervallo di celle e restituisce la posizione relativa di tale elemento nell'intervallo. Ad esempio, se l'intervallo A1:A3 include i valori 5, 25 e 38, la formula =CONFRONTA(25;A1:A3;0) restituisce il numero 2 perché 25 è il secondo elemento dell'intervallo.",
		abstract: "La funzione CONFRONTA cerca un determinato elemento in un intervallo di celle e restituisce la posizione relativa di tale elemento nell'intervallo. Ad esempio, se l'intervallo A1:A3 include i valori 5, 25 e 38, la formula =CONFRONTA(25;A1:A3;0) restituisce il numero 2 perché 25 è il secondo elemento dell'intervallo.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/match-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "CONFRONTA trova il valore più grande minore o uguale a lookup_value . I valori nell'argomento lookup_array devono essere disposti in ordine crescente, ad esempio...-2, -1, 0, 1, 2, ..., A-Z, FALSO, VERO."
			},
			lookupArray: {
				name: "lookup_array",
				detail: "CONFRONTA trova il primo valore esattamente uguale a lookup_value . I valori nell'argomento lookup_array possono essere in qualsiasi ordine."
			},
			matchType: {
				name: "match_type",
				detail: "CONFRONTA trova il valore più piccolo maggiore o uguale a lookup_value . I valori nell'argomento lookup_array devono essere disposti in ordine decrescente, ad esempio: VERO, FALSO, Z-A, ... 2, 1, 0, -1, -2, ..., e così via."
			}
		}
	},
	OFFSET: {
		description: "Restituisce un riferimento a un intervallo spostato rispetto a una cella o a un intervallo di celle di un numero specificato di righe e di colonne. Il riferimento restituito può riferirsi a una cella singola o a un intervallo. È possibile specificare il numero di righe e di colonne dell'intervallo da restituire.",
		abstract: "Restituisce un riferimento a un intervallo spostato rispetto a una cella o a un intervallo di celle di un numero specificato di righe e di colonne. Il riferimento restituito può riferirsi a una cella singola o a un intervallo. È possibile specificare il numero di righe e di colonne dell'intervallo da restituire.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/offset-function"
		}],
		functionParameter: {
			reference: {
				name: "reference",
				detail: "Obbligatorio. Riferimento da cui si desidera che inizi lo spostamento. Rif deve essere un riferimento a una cella o a un intervallo di celle adiacenti. In caso contrario, SCARTO restituirà il valore di errore #VALORE!."
			},
			rows: {
				name: "rows",
				detail: "Obbligatorio. Numero di righe, verso l'alto o verso il basso, che si desidera come riferimento per la cella superiore sinistra. Se righe è uguale a 5, significa che la cella superiore sinistra del riferimento si trova cinque righe al di sotto di rif. Righe può essere un valore positivo, che indica le righe al di sotto del riferimento iniziale, o negativo, che indica le righe al di sopra del riferimento iniziale."
			},
			cols: {
				name: "columns",
				detail: "Obbligatorio. Numero di colonne, a sinistra o a destra, che si desidera come riferimento per la cella superiore sinistra. Se colonne è uguale a 5, significa che la cella superiore sinistra del riferimento si trova cinque colonne a destra di rif. Colonne può essere un valore positivo, che indica le colonne a destra del riferimento iniziale, o negativo, che indica le colonne a sinistra del riferimento iniziale."
			},
			height: {
				name: "height",
				detail: "Opzionale. Altezza del riferimento restituito espressa in numero di righe. Altezza deve essere un valore positivo."
			},
			width: {
				name: "width",
				detail: "Opzionale. Larghezza del riferimento restituito espressa in numero di colonne. Largh deve essere un valore positivo."
			}
		}
	},
	ROW: {
		description: "Restituisce il numero di riga di un riferimento.",
		abstract: "Restituisce il numero di riga di un riferimento.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/row-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "Opzionale. Cella o intervallo di celle di cui si desidera il numero di riga. Se rif è omesso, verrà considerato uguale al riferimento della cella contenente la funzione RIF.RIGA. Se rif è un intervallo di celle e se RIF.RIGA viene immesso come matrice verticale, RIF.RIGA restituirà i numeri di riga di riferimento come matrice verticale. Rif non può contenere riferimenti a più aree."
		} }
	},
	ROWS: {
		description: "Restituisce il numero di righe in un riferimento o in una matrice.",
		abstract: "Restituisce il numero di righe in un riferimento o in una matrice.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/rows-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "Obbligatorio. Matrice, formula di matrice o riferimento a un intervallo di celle di cui si desidera calcolare il numero di righe."
		} }
	},
	RTD: {
		description: "Recupera dati in tempo reale da un programma che supporta l'automazione COM.",
		abstract: "Recupera dati in tempo reale da un programma che supporta l'automazione COM.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/rtd-function"
		}],
		functionParameter: {
			progId: {
				name: "progId",
				detail: "Obbligatorio. Nome dell'IDProg di un componente aggiuntivo di automazione COM registrato installato nel computer locale. È necessario racchiudere il nome tra virgolette."
			},
			server: {
				name: "server",
				detail: "Obbligatorio. Nome del server in cui deve essere eseguito il componente aggiuntivo. Se non vi sono server e il programma viene eseguito localmente, lasciare vuoto questo argomento. In caso contrario, racchiudere il nome del server tra virgolette (\"\"). Se la funzione DATITEMPOREALE viene usata in Visual Basic, Applications Edition (VBA), anche se il server viene eseguito localmente è necessario usare le virgolette doppie o la proprietà VBA NullString ."
			},
			topic1: {
				name: "topic1",
				detail: "Argomento1 è obbligatorio, gli argomenti successivi sono facoltativi. Da 1 a 253 parametri che rappresentano nell'insieme la porzione univoca di dati in tempo reale."
			},
			topic2: {
				name: "topic2",
				detail: "Argomento1 è obbligatorio, gli argomenti successivi sono facoltativi. Da 1 a 253 parametri che rappresentano nell'insieme la porzione univoca di dati in tempo reale."
			}
		}
	},
	SORT: {
		description: "In questo esempio si sta ordinando singolarmente per area geografica, agente di vendita e prodotto con =DATI.ORDINA(A2:A17), copiata nelle celle F2, H2 e J2.",
		abstract: "In questo esempio si sta ordinando singolarmente per area geografica, agente di vendita e prodotto con =DATI.ORDINA(A2:A17), copiata nelle celle F2, H2 e J2.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/sort-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "L'intervallo o matrice da ordinare"
			},
			sortIndex: {
				name: "sort_index",
				detail: "Numero che indica la riga o colonna in base a cui ordinare"
			},
			sortOrder: {
				name: "sort_order",
				detail: "Numero che indica il criterio di ordinamento desiderato, 1 per ordinamento crescente (impostazione predefinita), -1 per ordinamento decrescente"
			},
			byCol: {
				name: "by_col",
				detail: "Un valore logico che indica la direzione di ordinamento desiderata. FALSE per ordinare per riga (impostazione predefinita), TRUE per ordinare per colonna"
			}
		}
	},
	SORTBY: {
		description: "In questo esempio abbiamo ordinato un elenco di nomi di utenti in base alla loro età, in ordine crescente.",
		abstract: "In questo esempio abbiamo ordinato un elenco di nomi di utenti in base alla loro età, in ordine crescente.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/sortby-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "La matrice o l’intervallo da ordinare"
			},
			byArray1: {
				name: "by_array1",
				detail: "La matrice o l’intervallo in base a cui ordinare"
			},
			sortOrder1: {
				name: "sort_order1",
				detail: "L'ordine da utilizzare per l'ordinamento. 1 per ordine crescente, -1 per ordine decrescente. L'impostazione predefinita è crescente."
			},
			byArray2: {
				name: "by_array2",
				detail: "La matrice o l’intervallo in base a cui ordinare"
			},
			sortOrder2: {
				name: "sort_order2",
				detail: "L'ordine da utilizzare per l'ordinamento. 1 per ordine crescente, -1 per ordine decrescente. L'impostazione predefinita è crescente."
			}
		}
	},
	TAKE: {
		description: "Restituisce un numero specificato di righe o colonne contigue dall'inizio o fine di una matrice.",
		abstract: "Restituisce un numero specificato di righe o colonne contigue dall'inizio o fine di una matrice.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/take-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Matrice da cui prendere righe o colonne."
			},
			rows: {
				name: "rows",
				detail: "Numero di righe da accettare. Un valore negativo viene prelevato dalla fine della matrice."
			},
			columns: {
				name: "columns",
				detail: "Il numero di colonne da accettare. Un valore negativo viene prelevato dalla fine della matrice."
			}
		}
	},
	TOCOL: {
		description: "Restituisce la matrice in una singola colonna.",
		abstract: "Restituisce la matrice in una singola colonna.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/tocol-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Matrice o riferimento da restituire come colonna."
			},
			ignore: {
				name: "ignore",
				detail: "Indica se ignorare determinati tipi di valori. Per impostazione predefinita non viene ignorato alcun valore: 0 mantiene tutti, 1 ignora i vuoti, 2 gli errori, 3 entrambi."
			},
			scanByColumn: {
				name: "scan_by_column",
				detail: "Analizza la matrice per colonna. Per impostazione predefinita viene analizzata per riga; ciò determina l'ordinamento dei valori."
			}
		}
	},
	TOROW: {
		description: "Restituisce la matrice in una singola riga.",
		abstract: "Restituisce la matrice in una singola riga.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/torow-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "La matrice o il riferimento da restituire come una singola riga."
			},
			ignore: {
				name: "ignore",
				detail: "Indica se ignorare determinati tipi di valori. Per impostazione predefinita non viene ignorato alcun valore. Specificare uno dei valori seguenti:\n0 Mantieni tutti i valori (impostazione predefinita)\n1 Ignora le celle vuote\n2 Ignora gli errori\n3 Ignora le celle vuote e gli errori"
			},
			scanByColumn: {
				name: "scan_by_column",
				detail: "Indica se analizzare la matrice per colonna. Per impostazione predefinita, la matrice viene analizzata per riga. L'ordine di analisi determina se i valori vengono ordinati per riga o per colonna."
			}
		}
	},
	TRANSPOSE: {
		description: "Quando occorre trasporre o ruotare celle, è possibile farlo copiando, incollando e usando l'opzione Trasponi . In questo modo si creano però dati duplicati. Per evitarlo, è possibile digitare una formula usando la funzione MATR.TRASPOSTA. Ad esempio, nell'immagine seguente la formula =MATR.TRASPOSTA(A1:B4) dispone le celle da A1 a B4 in orizzontale.",
		abstract: "Quando occorre trasporre o ruotare celle, è possibile farlo copiando, incollando e usando l'opzione Trasponi . In questo modo si creano però dati duplicati. Per evitarlo, è possibile digitare una formula usando la funzione MATR.TRASPOSTA. Ad esempio, nell'immagine seguente la formula =MATR.TRASPOSTA(A1:B4) dispone le celle da A1 a B4 in orizzontale.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/transpose-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "Intervallo di celle o matrice in un foglio di lavoro."
		} }
	},
	UNIQUE: {
		description: "Restituisce nomi univoci da un elenco di nomi",
		abstract: "Restituisce nomi univoci da un elenco di nomi",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/unique-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "L'intervallo o matrice da cui restituire righe o colonne univoche"
			},
			byCol: {
				name: "by_col",
				detail: "L'argomento by_col è un valore logico che indica come eseguire il confronto. VERO confronta le colonne tra loro e restituisce le colonne univoche FALSO (o omesso) confronta le righe tra loro e restituisce le righe univoche"
			},
			exactlyOnce: {
				name: "exactly_once",
				detail: "L’argomento exactly_once è un valore logico che restituisce righe e colonne che ricorrono esattamente una volta in un intervallo o matrice. Questo è il concetto di database di UNICI. VERO restituisce tutte le righe e colonne univoche che ricorrono esattamente una volta in un intervallo o matrice FALSO (o omesso) restituisce tutte le righe e colonne univoche in un intervallo o matrice."
			}
		}
	},
	VLOOKUP: {
		description: "Usare la funzione CERCA.VERT per cercare un valore in una tabella.",
		abstract: "Usare la funzione CERCA.VERT per cercare un valore in una tabella.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/vlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "Valore da cercare, che deve trovarsi nella prima colonna dell'intervallo specificato in table_array."
			},
			tableArray: {
				name: "table_array",
				detail: "Intervallo di celle in cui CERCA.VERT cerca lookup_value e il valore da restituire. Può essere un intervallo denominato o una tabella."
			},
			colIndexNum: {
				name: "col_index_num",
				detail: "Numero della colonna, iniziando da 1 per la colonna più a sinistra di table_array, che contiene il valore da restituire."
			},
			rangeLookup: {
				name: "range_lookup",
				detail: "Valore logico che specifica se CERCA.VERT deve trovare una corrispondenza approssimativa (1/VERO) o esatta (0/FALSO)."
			}
		}
	},
	VSTACK: {
		description: "Accoda le matrici in verticale e in sequenza per restituire una matrice più grande.",
		abstract: "Accoda le matrici in verticale e in sequenza per restituire una matrice più grande.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/vstack-function"
		}],
		functionParameter: {
			array1: {
				name: "array",
				detail: "Matrici da accodare."
			},
			array2: {
				name: "array",
				detail: "Matrici da accodare."
			}
		}
	},
	WRAPCOLS: {
		description: "Esegue il wrapping della riga o della colonna di valori specificata per colonne dopo un numero specificato di elementi per formare una nuova matrice.",
		abstract: "Esegue il wrapping della riga o della colonna di valori specificata per colonne dopo un numero specificato di elementi per formare una nuova matrice.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/wrapcols-function"
		}],
		functionParameter: {
			vector: {
				name: "vector",
				detail: "Vettore o riferimento da mandare a capo."
			},
			wrapCount: {
				name: "wrap_count",
				detail: "Numero massimo di valori per ogni colonna."
			},
			padWith: {
				name: "pad_with",
				detail: "Valore con cui inserire il tastierino. L'impostazione predefinita è #N/A."
			}
		}
	},
	WRAPROWS: {
		description: "Esegue il wrapping della riga o colonna di valori per righe dopo un numero specificato di elementi per formare una nuova matrice.",
		abstract: "Esegue il wrapping della riga o colonna di valori per righe dopo un numero specificato di elementi per formare una nuova matrice.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/wraprows-function"
		}],
		functionParameter: {
			vector: {
				name: "vector",
				detail: "Vettore o riferimento da mandare a capo."
			},
			wrapCount: {
				name: "wrap_count",
				detail: "Numero massimo di valori per ogni riga."
			},
			padWith: {
				name: "pad_with",
				detail: "Valore con cui inserire il tastierino. L'impostazione predefinita è #N/A."
			}
		}
	},
	XLOOKUP: {
		description: "Usare la funzione CERCA.X per trovare elementi in una tabella o in un intervallo per riga. Ad esempio è possibile cercare il prezzo di un componente di un’auto in base al numero del pezzo o trovare il nome di un dipendente in base al suo ID dipendente. Con CERCA.X è possibile cercare un termine di ricerca in una colonna e ottenere un risultato nella stessa riga ma in un'altra colonna, indipendentemente dal lato in cui si trova la colonna del risultato.",
		abstract: "Usare la funzione CERCA.X per trovare elementi in una tabella o in un intervallo per riga. Ad esempio è possibile cercare il prezzo di un componente di un’auto in base al numero del pezzo o trovare il nome di un dipendente in base al suo ID dipendente. Con CERCA.X è possibile cercare un termine di ricerca in una colonna e ottenere un risultato nella stessa riga ma in un'altra colonna, indipendentemente dal lato in cui si trova la colonna del risultato.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/xlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "Il valore da cercare *Se viene omesso, CERCA.X restituirà le celle vuote che trova in lookup_array ."
			},
			lookupArray: {
				name: "lookup_array",
				detail: "La matrice o l’intervallo in cui effettuare la ricerca"
			},
			returnArray: {
				name: "return_array",
				detail: "La matrice o l’intervallo da restituire"
			},
			ifNotFound: {
				name: "if_not_found",
				detail: "Se non è stata trovata una corrispondenza valida, restituire il testo [se_non_trovato] che si specifica. Se non viene trovata una corrispondenza valida e [se_non_trovato] manca, verrà restituito #N/A ."
			},
			matchMode: {
				name: "match_mode",
				detail: "Specificare il tipo di corrispondenza: 0 - Corrispondenza esatta. Se non trovata, restituisce #N/D. Questa è l’impostazione predefinita. -1 - Corrispondenza esatta. Se non trovata, restituisce l’elemento successivo più piccolo. 1 - Corrispondenza esatta. Se non trovata, restituisce l’elemento successivo più grande. 2 - Una corrispondenza jolly in cui *, ? e ~ hanno un significato speciale ."
			},
			searchMode: {
				name: "search_mode",
				detail: "Specificare la modalità di ricerca da usare: 1 - Effettuare una ricerca a partire dal primo elemento. Questa è l’impostazione predefinita. -1 - Effettuare una ricerca inversa a partire dall’ultimo elemento. 2 - Effettuare una ricerca binaria basata sulla matrice di ricerca classificata in ordine crescente . Se non è classificata, vengono restituiti risultati non validi. - 2 - Effettuare una ricerca binaria basata sulla matrice di ricerca classificata in ordine decrescente . Se non è classificata, vengono restituiti risultati non validi."
			}
		}
	},
	XMATCH: {
		description: "Supponiamo di avere un elenco di prodotti nelle celle da C3 a C7 e di voler determinare dove si trova il prodotto della cella E3. Qui useremo CONFRONTA.X per determinare la posizione di un elemento all'interno di un elenco.",
		abstract: "Supponiamo di avere un elenco di prodotti nelle celle da C3 a C7 e di voler determinare dove si trova il prodotto della cella E3. Qui useremo CONFRONTA.X per determinare la posizione di un elemento all'interno di un elenco.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/xmatch-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "Il valore"
			},
			lookupArray: {
				name: "lookup_array",
				detail: "La matrice o l’intervallo in cui effettuare la ricerca"
			},
			matchMode: {
				name: "match_mode",
				detail: "Specificare il tipo di corrispondenza: 0 - Corrispondenza esatta (impostazione predefinita) -1 - Corrispondenza esatta o elemento successivo più piccolo 1 - Corrispondenza esatta o elemento successivo più grande 2 - Una corrispondenza jolly in cui *, ? e ~ hanno un significato speciale ."
			},
			searchMode: {
				name: "search_mode",
				detail: "Specificare il tipo di ricerca: 1 - Ricerca dal primo all'ultimo (impostazione predefinita) -1 - Ricerca dall'ultimo al primo (ricerca inversa). 2 - Effettuare una ricerca binaria basata sulla matrice di ricerca classificata in ordine crescente . Se non è classificata, vengono restituiti risultati non validi. - 2 - Effettuare una ricerca binaria basata sulla matrice di ricerca classificata in ordine decrescente . Se non è classificata, vengono restituiti risultati non validi."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/math/it-IT.ts
const locale$5 = {
	ABS: {
		description: "Restituisce il valore assoluto di un numero. Il valore assoluto di un numero è il numero privo del segno corrispondente.",
		abstract: "Restituisce il valore assoluto di un numero. Il valore assoluto di un numero è il numero privo del segno corrispondente.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/abs-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio. Numero reale di cui si vuole ottenere il valore assoluto."
		} }
	},
	ACOS: {
		description: "Restituisce l'arcocoseno, o inversa del coseno, di un numero. L'arcocoseno è l'angolo il cui coseno è num . L'angolo risultante viene espresso in radianti con un valore compreso tra 0 (zero) e pi.",
		abstract: "Restituisce l'arcocoseno, o inversa del coseno, di un numero. L'arcocoseno è l'angolo il cui coseno è num . L'angolo risultante viene espresso in radianti con un valore compreso tra 0 (zero) e pi.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/acos-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio. Coseno dell'angolo desiderato e deve essere un valore compreso tra -1 e 1."
		} }
	},
	ACOSH: {
		description: "Restituisce l'inversa del coseno iperbolico di un numero. Il numero deve essere maggiore o uguale a 1. L'inversa del coseno iperbolico è il valore il cui coseno iperbolico è num , quindi ACOSH(COSH(num)) equivale a num .",
		abstract: "Restituisce l'inversa del coseno iperbolico di un numero. Il numero deve essere maggiore o uguale a 1. L'inversa del coseno iperbolico è il valore il cui coseno iperbolico è num , quindi ACOSH(COSH(num)) equivale a num .",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/acosh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio. Numero reale qualsiasi maggiore o uguale a 1."
		} }
	},
	ACOT: {
		description: "Restituisce il valore principale dell'arcotangente, o cotangente inversa, di un numero.",
		abstract: "Restituisce il valore principale dell'arcotangente, o cotangente inversa, di un numero.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/acot-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio. Num è la cotangente dell'angolo desiderato. Questo deve essere un numero reale."
		} }
	},
	ACOTH: {
		description: "Restituisce l'inversa della cotangente iperbolica di un numero.",
		abstract: "Restituisce l'inversa della cotangente iperbolica di un numero.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/acoth-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Il valore assoluto di numero deve essere maggiore di 1."
		} }
	},
	AGGREGATE: {
		description: "Restituisce un aggregato in un elenco o database. La funzione AGGREGA può applicare funzioni di aggregazione diverse a un elenco o database con l'opzione di ignorare le righe nascoste e i valori di errore.",
		abstract: "Restituisce un aggregato in un elenco o database. La funzione AGGREGA può applicare funzioni di aggregazione diverse a un elenco o database con l'opzione di ignorare le righe nascoste e i valori di errore.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/aggregate-function"
		}],
		functionParameter: {
			functionNum: {
				name: "function_num",
				detail: "Obbligatorio. Numero compreso tra 1 e 19 che specifica la funzione da utilizzare."
			},
			options: {
				name: "options",
				detail: "Obbligatorio. Valore numerico che determina i valori da ignorare nell'intervallo di valutazione della funzione. Nota La funzione non ignorerà le righe nascoste, i subtotali annidati o le aggregazioni annidate se l'argomento matrice include un calcolo, ad esempio: =AGGREGA(14;3;A1:A100*(A1:A100>0);1)"
			},
			ref1: {
				name: "ref1",
				detail: "Obbligatorio. Primo argomento numerico per le funzioni che accettano più argomenti numerici di cui si vuole calcolare il valore aggregato."
			},
			ref2: {
				name: "ref2",
				detail: "Opzionale. Argomenti numerici da 2 a 253 di cui si desidera il valore aggregato. Per le funzioni che accettano matrici, rif1 è una matrice o una formula matrice oppure un riferimento a un intervallo di celle di cui si desidera il valore aggregato. Rif2 è un secondo argomento obbligatorio per determinate funzioni. Le funzioni seguenti richiedono un argomento rif2:"
			}
		}
	},
	ARABIC: {
		description: "Converte un numero romano in numero arabo.",
		abstract: "Converte un numero romano in numero arabo.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/arabic-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Obbligatorio. Stringa tra virgolette, stringa vuota (\"\"), o riferimento a una cella contenente testo."
		} }
	},
	ASIN: {
		description: "Restituisce l'arcoseno, o inversa del seno, di un numero. L'arcoseno è l'angolo il cui seno è num . L'angolo risultante viene espresso in radianti con un valore compreso tra -pi greco/2 e pi greco/2.",
		abstract: "Restituisce l'arcoseno, o inversa del seno, di un numero. L'arcoseno è l'angolo il cui seno è num . L'angolo risultante viene espresso in radianti con un valore compreso tra -pi greco/2 e pi greco/2.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/asin-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio. Seno dell'angolo desiderato e deve essere un valore compreso tra -1 e 1."
		} }
	},
	ASINH: {
		description: "Restituisce l'inversa del seno iperbolico di un numero. L'inversa del seno iperbolico è il valore il cui seno iperbolico è num , quindi ASINH(SINH(num)) equivale a num .",
		abstract: "Restituisce l'inversa del seno iperbolico di un numero. L'inversa del seno iperbolico è il valore il cui seno iperbolico è num , quindi ASINH(SINH(num)) equivale a num .",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/asinh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio. Numero reale."
		} }
	},
	ATAN: {
		description: "Restituisce l'arcotangente, o inversa della tangente, di un numero. L'arcotangente è l'angolo la cui tangente è num . L'angolo risultante viene espresso in radianti con un valore compreso tra -pi greco/2 e pi greco/2.",
		abstract: "Restituisce l'arcotangente, o inversa della tangente, di un numero. L'arcotangente è l'angolo la cui tangente è num . L'angolo risultante viene espresso in radianti con un valore compreso tra -pi greco/2 e pi greco/2.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/atan-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio. Tangente dell'angolo desiderato."
		} }
	},
	ATAN2: {
		description: "Restituisce l'arcotangente, o inversa della tangente, delle coordinate x e y specificate. L'arcotangente è l'angolo compreso tra l'asse x e una linea contenente l'origine (0; 0) e un punto con coordinate (x; y). L'angolo viene espresso in radianti con valori compresi tra -pi greco e pi greco, a esclusione di -pi greco.",
		abstract: "Restituisce l'arcotangente, o inversa della tangente, delle coordinate x e y specificate. L'arcotangente è l'angolo compreso tra l'asse x e una linea contenente l'origine (0; 0) e un punto con coordinate (x; y). L'angolo viene espresso in radianti con valori compresi tra -pi greco e pi greco, a esclusione di -pi greco.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/atan2-function"
		}],
		functionParameter: {
			xNum: {
				name: "x_num",
				detail: "Obbligatorio. Ascissa del punto."
			},
			yNum: {
				name: "y_num",
				detail: "Obbligatorio. Ordinata del punto."
			}
		}
	},
	ATANH: {
		description: "Restituisce l'inversa della tangente iperbolica di un numero. Num deve essere compreso tra -1 e 1 (esclusi -1 e 1). L'inversa della tangente iperbolica è il valore la cui tangente iperbolica è num , quindi ARCTANH(TANH(num)) equivale a num .",
		abstract: "Restituisce l'inversa della tangente iperbolica di un numero. Num deve essere compreso tra -1 e 1 (esclusi -1 e 1). L'inversa della tangente iperbolica è il valore la cui tangente iperbolica è num , quindi ARCTANH(TANH(num)) equivale a num .",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/atanh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio. Numero reale compreso tra 1 e -1."
		} }
	},
	BASE: {
		description: "Converte un numero in una rappresentazione in formato testo con la radice data (base).",
		abstract: "Converte un numero in una rappresentazione in formato testo con la radice data (base).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/base-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. Numero da convertire. Deve essere un numero intero maggiore o uguale a 0 e minore di 2^53."
			},
			radix: {
				name: "radix",
				detail: "Obbligatorio. Radice base nella quale si vuole convertire il numero. Deve essere un numero intero maggiore o uguale a 2 e minore o uguale a 36."
			},
			minLength: {
				name: "min_length",
				detail: "Opzionale. Lunghezza minima della stringa restituita. Deve essere un numero intero maggiore o uguale a 0."
			}
		}
	},
	CEILING: {
		description: "Restituisce un numero arrotondato per eccesso al multiplo più vicino a peso. Se ad esempio si desidera arrotondare il prezzo di un prodotto in modo da eliminare i centesimi inferiori a 5 e il prodotto costa € 4,42, utilizzare la formula =ARROTONDA.ECCESSO(4,42;0,05).",
		abstract: "Restituisce un numero arrotondato per eccesso al multiplo più vicino a peso. Se ad esempio si desidera arrotondare il prezzo di un prodotto in modo da eliminare i centesimi inferiori a 5 e il prodotto costa € 4,42, utilizzare la formula =ARROTONDA.ECCESSO(4,42;0,05).",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/ceiling-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. Valore che si desidera arrotondare."
			},
			significance: {
				name: "significance",
				detail: "Obbligatorio. Multiplo a cui si desidera arrotondare il numero."
			}
		}
	},
	CEILING_MATH: {
		description: "Il SOFFITTO. La funzione MATEMATICA arrotonda un numero per eccesso all'intero più vicino o, facoltativamente, al multiplo più vicino a peso.",
		abstract: "Il SOFFITTO. La funzione MATEMATICA arrotonda un numero per eccesso all'intero più vicino o, facoltativamente, al multiplo più vicino a peso.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/ceiling-math-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. (deve essere compreso tra -2,229E-308.e 9,99E+307.)"
			},
			significance: {
				name: "significance",
				detail: "Opzionale. Numero di cifre significative dopo la virgola decimale a cui arrotondare num ."
			},
			mode: {
				name: "mode",
				detail: "Opzionale. Controlla se i numeri negativi vengono arrotondati per eccesso o per eccesso."
			}
		}
	},
	CEILING_PRECISE: {
		description: "Restituisce un numero arrotondato per eccesso all'intero più vicino o al multiplo più vicino a peso. Indipendentemente dal segno di num, il numero viene arrotondato per eccesso. Se tuttavia num o peso è zero, verrà restituito il valore zero.",
		abstract: "Restituisce un numero arrotondato per eccesso all'intero più vicino o al multiplo più vicino a peso. Indipendentemente dal segno di num, il numero viene arrotondato per eccesso. Se tuttavia num o peso è zero, verrà restituito il valore zero.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/ceiling-precise-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. Valore da arrotondare."
			},
			significance: {
				name: "significance",
				detail: "Opzionale. Multiplo al quale arrotondare num. Se il valore di peso viene omesso, il valore predefinito è 1."
			}
		}
	},
	COMBIN: {
		description: "Restituisce il numero delle combinazioni per un numero assegnato di elementi, indipendentemente dal loro ordine. Utilizzare la funzione COMBINAZIONE per calcolare tutti i possibili gruppi che si possono formare con un determinato numero di elementi.",
		abstract: "Restituisce il numero delle combinazioni per un numero assegnato di elementi, indipendentemente dal loro ordine. Utilizzare la funzione COMBINAZIONE per calcolare tutti i possibili gruppi che si possono formare con un determinato numero di elementi.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/combin-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. Numero di elementi."
			},
			numberChosen: {
				name: "number_chosen",
				detail: "Obbligatorio. Numero di elementi in ogni combinazione."
			}
		}
	},
	COMBINA: {
		description: "Restituisce il numero delle combinazioni (con ripetizioni) per un numero assegnato di elementi.",
		abstract: "Restituisce il numero delle combinazioni (con ripetizioni) per un numero assegnato di elementi.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/combina-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. Deve essere maggiore di o uguale a 0 e maggiore di o uguale a classe. I valori non interi vengono troncati."
			},
			numberChosen: {
				name: "number_chosen",
				detail: "Obbligatorio. Deve essere maggiore di o uguale a 0. I valori non interi vengono troncati."
			}
		}
	},
	COS: {
		description: "Restituisce il coseno dell'angolo specificato.",
		abstract: "Restituisce il coseno dell'angolo specificato.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/cos-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio. Angolo in radianti di cui si desidera il coseno."
		} }
	},
	COSH: {
		description: "Restituisce il coseno iperbolico di un numero.",
		abstract: "Restituisce il coseno iperbolico di un numero.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/cosh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Qualsiasi numero reale di cui si desidera trovare il coseno iperbolico."
		} }
	},
	COT: {
		description: "Restituisce la COTgente di un angolo espresso in radianti.",
		abstract: "Restituisce la COTgente di un angolo espresso in radianti.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/cot-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio. Angolo in radianti di cui si vuole la cotangente."
		} }
	},
	COTH: {
		description: "Restituisce la cotangente iperbolico di un angolo iperbolico.",
		abstract: "Restituisce la cotangente iperbolico di un angolo iperbolico.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/coth-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio."
		} }
	},
	CSC: {
		description: "Restituisce la cosecante di un angolo espresso in radianti.",
		abstract: "Restituisce la cosecante di un angolo espresso in radianti.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/csc-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio."
		} }
	},
	CSCH: {
		description: "Restituisce la cosecante iperbolica di un angolo espresso in radianti.",
		abstract: "Restituisce la cosecante iperbolica di un angolo espresso in radianti.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/csch-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio."
		} }
	},
	DECIMAL: {
		description: "Converte la rappresentazione di un numero in formato testo di una determinata base in un numero decimale.",
		abstract: "Converte la rappresentazione di un numero in formato testo di una determinata base in un numero decimale.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/decimal-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Obbligatorio."
			},
			radix: {
				name: "radix",
				detail: "Obbligatorio. La radice deve essere un numero intero."
			}
		}
	},
	DEGREES: {
		description: "Converte i radianti in gradi.",
		abstract: "Converte i radianti in gradi.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/degrees-function"
		}],
		functionParameter: { angle: {
			name: "angle",
			detail: "Obbligatorio. Angolo espresso in radianti che si desidera convertire."
		} }
	},
	EVEN: {
		description: "Restituisce num arrotondato per eccesso all'intero pari più vicino. Questa funzione consente di elaborare elementi disponibili a gruppi di due. Una cassa da imballaggio può contenere ad esempio alcune file di uno o due articoli. La cassa sarà piena quando ci sarà corrispondenza tra il numero degli articoli, arrotondato per eccesso ai due più vicini, e la capacità della cassa.",
		abstract: "Restituisce num arrotondato per eccesso all'intero pari più vicino. Questa funzione consente di elaborare elementi disponibili a gruppi di due. Una cassa da imballaggio può contenere ad esempio alcune file di uno o due articoli. La cassa sarà piena quando ci sarà corrispondenza tra il numero degli articoli, arrotondato per eccesso ai due più vicini, e la capacità della cassa.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/even-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio. Valore da arrotondare."
		} }
	},
	EXP: {
		description: "Restituisce il numero e elevato alla potenza di num. La costante e è uguale a 2,71828182845904, la base del logaritmo naturale.",
		abstract: "Restituisce il numero e elevato alla potenza di num. La costante e è uguale a 2,71828182845904, la base del logaritmo naturale.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/exp-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio. Esponente applicato alla base e."
		} }
	},
	FACT: {
		description: "Restituisce il fattoriale di un numero. Il fattoriale di un numero è uguale a 1*2*3*...* num.",
		abstract: "Restituisce il fattoriale di un numero. Il fattoriale di un numero è uguale a 1*2*3*...* num.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/fact-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio. Numero non negativo di cui si desidera calcolare il fattoriale. Se num non è un numero intero, la parte decimale verrà troncata."
		} }
	},
	FACTDOUBLE: {
		description: "Restituisce il fattoriale doppio di un numero.",
		abstract: "Restituisce il fattoriale doppio di un numero.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/factdouble-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio. Valore di cui calcolare il fattoriale doppio. Se num non è un numero intero, la parte decimale verrà troncata."
		} }
	},
	FLOOR: {
		description: "La funzione ARROTONDA.DIFETTO di Excel arrotonda un numero specificato per difetto al multiplo specificato più vicino a peso. I numeri negativi vengono arrotondati per difetto (ulteriori negativi) al multiplo intero più vicino sotto lo zero.",
		abstract: "La funzione ARROTONDA.DIFETTO di Excel arrotonda un numero specificato per difetto al multiplo specificato più vicino a peso. I numeri negativi vengono arrotondati per difetto (ulteriori negativi) al multiplo intero più vicino sotto lo zero.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/floor-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. Valore numerico che si desidera arrotondare."
			},
			significance: {
				name: "significance",
				detail: "Obbligatorio. Multiplo a cui si desidera arrotondare il numero."
			}
		}
	},
	FLOOR_MATH: {
		description: "Arrotonda un numero per difetto all'intero più vicino o al multiplo più vicino a peso.",
		abstract: "Arrotonda un numero per difetto all'intero più vicino o al multiplo più vicino a peso.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/floor-math-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. Numero da arrotondare per difetto."
			},
			significance: {
				name: "significance",
				detail: "Opzionale. Multiplo a cui arrotondare il numero."
			},
			mode: {
				name: "mode",
				detail: "Opzionale. Direzione (per difetto o per eccesso) in cui arrotondare i numeri negativi."
			}
		}
	},
	FLOOR_PRECISE: {
		description: "Restituisce un numero arrotondato per difetto all'intero più vicino o al multiplo più vicino al peso. Indipendentemente dal segno di num, il numero viene arrotondato per difetto. Se tuttavia num o peso è zero, verrà restituito il valore zero.",
		abstract: "Restituisce un numero arrotondato per difetto all'intero più vicino o al multiplo più vicino al peso. Indipendentemente dal segno di num, il numero viene arrotondato per difetto. Se tuttavia num o peso è zero, verrà restituito il valore zero.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/floor-precise-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. Valore da arrotondare."
			},
			significance: {
				name: "significance",
				detail: "Opzionale. Multiplo al quale arrotondare num. Se il valore di peso viene omesso, il valore predefinito è 1."
			}
		}
	},
	GCD: {
		description: "Restituisce il massimo comun divisore di due o più numeri interi. Il massimo comun divisore è il più grande numero intero che divide perfettamente sia num1 che num2.",
		abstract: "Restituisce il massimo comun divisore di due o più numeri interi. Il massimo comun divisore è il più grande numero intero che divide perfettamente sia num1 che num2.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/gcd-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Num1 è obbligatorio, i numeri successivi sono facoltativi. Da 1 a 255 valori. Se uno di questi valori non è un numero intero, la relativa parte decimale verrà troncata."
			},
			number2: {
				name: "number2",
				detail: "Num1 è obbligatorio, i numeri successivi sono facoltativi. Da 1 a 255 valori. Se uno di questi valori non è un numero intero, la relativa parte decimale verrà troncata."
			}
		}
	},
	INT: {
		description: "Arrotonda un numero per difetto all'intero più vicino.",
		abstract: "Arrotonda un numero per difetto all'intero più vicino.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/int-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio. Numero reale che si desidera arrotondare per difetto a un intero."
		} }
	},
	ISO_CEILING: {
		description: "Restituisce un numero arrotondato per eccesso all'intero più vicino o al multiplo più vicino a peso. Indipendentemente dal segno di num, il numero viene arrotondato per eccesso. Se tuttavia num o peso è zero, verrà restituito il valore zero.",
		abstract: "Restituisce un numero arrotondato per eccesso all'intero più vicino o al multiplo più vicino a peso. Indipendentemente dal segno di num, il numero viene arrotondato per eccesso. Se tuttavia num o peso è zero, verrà restituito il valore zero.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/iso-ceiling-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. Valore da arrotondare."
			},
			significance: {
				name: "significance",
				detail: "Opzionale. Multiplo al quale arrotondare num. Se il valore di peso viene omesso, il valore predefinito è 1."
			}
		}
	},
	LCM: {
		description: "Restituisce il minimo comune multiplo.",
		abstract: "Restituisce il minimo comune multiplo.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/lcm-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Primo numero del minimo comune multiplo. In alternativa ai parametri separati da virgole, è possibile usare una singola matrice o un riferimento a una matrice."
			},
			number2: {
				name: "number2",
				detail: "Secondo numero di cui trovare il minimo comune multiplo. È possibile specificare fino a 255 numeri."
			}
		}
	},
	LN: {
		description: "Restituisce il logaritmo naturale di un numero. I logaritmi naturali si basano sulla costante e (2,71828182845904).",
		abstract: "Restituisce il logaritmo naturale di un numero. I logaritmi naturali si basano sulla costante e (2,71828182845904).",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/ln-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio. Numero reale positivo di cui si desidera calcolare il logaritmo naturale."
		} }
	},
	LOG: {
		description: "Restituisce il logaritmo di un numero nella base specificata.",
		abstract: "Restituisce il logaritmo di un numero nella base specificata.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/log-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. Numero reale positivo di cui si desidera calcolare il logaritmo."
			},
			base: {
				name: "base",
				detail: "Opzionale. Base del logaritmo. Se base viene omesso, verrà considerato uguale a 10."
			}
		}
	},
	LOG10: {
		description: "Restituisce il logaritmo in base 10 di un numero.",
		abstract: "Restituisce il logaritmo in base 10 di un numero.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/log10-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio. Numero reale positivo di cui si desidera calcolare il logaritmo in base 10."
		} }
	},
	MDETERM: {
		description: "Restituisce il determinante di una matrice.",
		abstract: "Restituisce il determinante di una matrice.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/mdeterm-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "Matrice numerica con lo stesso numero di righe e colonne."
		} }
	},
	MINVERSE: {
		description: "La funzione MATR.INVERSA restituisce l'inversa di una matrice memorizzata in una matrice.",
		abstract: "La funzione MATR.INVERSA restituisce l'inversa di una matrice memorizzata in una matrice.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/minverse-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "Obbligatorio. Matrice numerica quadrata."
		} }
	},
	MMULT: {
		description: "Restituisce il prodotto matriciale di due matrici.",
		abstract: "Restituisce il prodotto matriciale di due matrici.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/mmult-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Le matrici che si desidera moltiplicare."
			},
			array2: {
				name: "array2",
				detail: "Le matrici che si desidera moltiplicare."
			}
		}
	},
	MOD: {
		description: "Restituisce il resto quando dividendo viene diviso per divisore. Il segno del risultato coinciderà con quello di divisore.",
		abstract: "Restituisce il resto quando dividendo viene diviso per divisore. Il segno del risultato coinciderà con quello di divisore.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/mod-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. Numero di cui si desidera calcolare il resto."
			},
			divisor: {
				name: "divisor",
				detail: "Obbligatorio. Numero per il quale si desidera dividere il dividendo."
			}
		}
	},
	MROUND: {
		description: "ARROTONDA.MULTIPLO restituisce un numero arrotondato al multiplo desiderato.",
		abstract: "ARROTONDA.MULTIPLO restituisce un numero arrotondato al multiplo desiderato.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/mround-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. Valore da arrotondare."
			},
			multiple: {
				name: "multiple",
				detail: "Obbligatorio. Multiplo a cui si desidera arrotondare il numero."
			}
		}
	},
	MULTINOMIAL: {
		description: "Restituisce il multinomiale di un insieme di numeri.",
		abstract: "Restituisce il multinomiale di un insieme di numeri.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/multinomial-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Primo valore o intervallo da usare nel calcolo."
			},
			number2: {
				name: "number2",
				detail: "Valori o intervalli aggiuntivi da usare nel calcolo."
			}
		}
	},
	MUNIT: {
		description: "La funzione MATR.UNIT restituisce la matrice unitaria per la dimensione specificata.",
		abstract: "La funzione MATR.UNIT restituisce la matrice unitaria per la dimensione specificata.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/munit-function"
		}],
		functionParameter: { dimension: {
			name: "dimension",
			detail: "Intero che specifica la dimensione della matrice unitaria da restituire. Restituisce una matrice e la dimensione deve essere maggiore di zero."
		} }
	},
	ODD: {
		description: "Restituisce num arrotondato per eccesso all'intero dispari più vicino.",
		abstract: "Restituisce num arrotondato per eccesso all'intero dispari più vicino.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/odd-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio. Valore da arrotondare."
		} }
	},
	PI: {
		description: "Restituisce il numero 3,14159265358979, la costante matematica pi, con una precisione di 15 cifre.",
		abstract: "Restituisce il numero 3,14159265358979, la costante matematica pi, con una precisione di 15 cifre.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/pi-function"
		}],
		functionParameter: {}
	},
	POWER: {
		description: "Restituisce il risultato di un numero elevato a potenza.",
		abstract: "Restituisce il risultato di un numero elevato a potenza.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/power-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. Numero della base. Può essere qualsiasi numero reale."
			},
			power: {
				name: "power",
				detail: "Obbligatorio. Esponente a cui elevare il numero della base."
			}
		}
	},
	PRODUCT: {
		description: "La funzione PRODOTTO moltiplica tutti i numeri assegnati come argomenti e restituisce il prodotto. Ad esempio, se le celle A1 e A2 contengono numeri, è possibile usare la formula =PRODOTTO(A1, A2) per moltiplicare questi due numeri. È anche possibile eseguire la stessa operazione usando l'operatore matematico moltiplicazione ( * ), ad esempio =A1 * A2 .",
		abstract: "La funzione PRODOTTO moltiplica tutti i numeri assegnati come argomenti e restituisce il prodotto. Ad esempio, se le celle A1 e A2 contengono numeri, è possibile usare la formula =PRODOTTO(A1, A2) per moltiplicare questi due numeri. È anche possibile eseguire la stessa operazione usando l'operatore matematico moltiplicazione ( * ), ad esempio =A1 * A2 .",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/product-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obbligatorio. Primo numero o intervallo da moltiplicare."
			},
			number2: {
				name: "number2",
				detail: "Opzionale. Ulteriori numeri o intervalli da moltiplicare, fino a un massimo di 255 argomenti."
			}
		}
	},
	QUOTIENT: {
		description: "Restituisce il quoziente di una divisione. Utilizzare questa funzione quando si desidera ignorare il resto di una divisione.",
		abstract: "Restituisce il quoziente di una divisione. Utilizzare questa funzione quando si desidera ignorare il resto di una divisione.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/quotient-function"
		}],
		functionParameter: {
			numerator: {
				name: "numerator",
				detail: "Obbligatorio. Dividendo."
			},
			denominator: {
				name: "denominator",
				detail: "Obbligatorio. Divisore."
			}
		}
	},
	RADIANS: {
		description: "Converte i gradi in radianti.",
		abstract: "Converte i gradi in radianti.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/radians-function"
		}],
		functionParameter: { angle: {
			name: "angle",
			detail: "Obbligatorio. Angolo espresso in gradi che si desidera convertire."
		} }
	},
	RAND: {
		description: "CASUALE restituisce un numero reale casuale distribuito in maniera uniforme maggiore o uguale a 0 e minore di 1. Un nuovo numero reale casuale viene restituito volta che il foglio di lavoro viene calcolato.",
		abstract: "CASUALE restituisce un numero reale casuale distribuito in maniera uniforme maggiore o uguale a 0 e minore di 1. Un nuovo numero reale casuale viene restituito volta che il foglio di lavoro viene calcolato.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/rand-function"
		}],
		functionParameter: {}
	},
	RANDARRAY: {
		description: "Negli esempi seguenti viene creata una matrice composta da 5 righe e 3 colonne. Il primo esempio restituisce un set di valori casuali compresi tra 0 e 1, che è il comportamento predefinito di MATR.CASUALE. Il secondo esempio restituisce una serie di valori decimali casuali compresi tra 1 e 100. Infine, il terzo esempio restituisce una serie di numeri interi casuali compresi tra 1 e 100.",
		abstract: "Negli esempi seguenti viene creata una matrice composta da 5 righe e 3 colonne. Il primo esempio restituisce un set di valori casuali compresi tra 0 e 1, che è il comportamento predefinito di MATR.CASUALE. Il secondo esempio restituisce una serie di valori decimali casuali compresi tra 1 e 100. Infine, il terzo esempio restituisce una serie di numeri interi casuali compresi tra 1 e 100.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/randarray-function"
		}],
		functionParameter: {
			rows: {
				name: "rows",
				detail: "Il numero di righe da restituire"
			},
			columns: {
				name: "columns",
				detail: "Il numero di colonne da restituire"
			},
			min: {
				name: "min",
				detail: "Il numero minimo che si desidera venga restituito"
			},
			max: {
				name: "max",
				detail: "Il numero massimo che si desidera venga restituito"
			},
			wholeNumber: {
				name: "whole_number",
				detail: "Restituisce un numero intero o decimale VERO per un numero intero. FALSE per un numero decimale"
			}
		}
	},
	RANDBETWEEN: {
		description: "Restituisce un numero intero casuale compreso tra i numeri specificati. Un nuovo numero intero casuale viene restituito ogni volta che il foglio di lavoro viene calcolato.",
		abstract: "Restituisce un numero intero casuale compreso tra i numeri specificati. Un nuovo numero intero casuale viene restituito ogni volta che il foglio di lavoro viene calcolato.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/randbetween-function"
		}],
		functionParameter: {
			bottom: {
				name: "bottom",
				detail: "Obbligatorio. Intero più piccolo restituito da CASUALE.TRA."
			},
			top: {
				name: "top",
				detail: "Obbligatorio. Intero più grande restituito da CASUALE.TRA."
			}
		}
	},
	ROMAN: {
		description: "Restituisce il numero come numero romano sotto forma di testo.",
		abstract: "Restituisce il numero come numero romano sotto forma di testo.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/roman-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. Numero arabo che si desidera convertire."
			},
			form: {
				name: "form",
				detail: "Opzionale. Numero che specifica il tipo di numero romano desiderato. Lo stile dei numeri romani varia da Classico a Semplificato, diventando più conciso con l'aumentare del valore di forma. Vedere l'esempio relativo a ROMANO(499,0) seguente."
			}
		}
	},
	ROUND: {
		description: "La funzione ARROTONDA arrotonda un numero al numero di cifre specificato. Se ad esempio la cella A1 contiene 23,7825 e si desidera arrotondare tale valore a due posizioni decimali, sarà possibile usare la formula seguente:",
		abstract: "La funzione ARROTONDA arrotonda un numero al numero di cifre specificato. Se ad esempio la cella A1 contiene 23,7825 e si desidera arrotondare tale valore a due posizioni decimali, sarà possibile usare la formula seguente:",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/round-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. Numero da arrotondare."
			},
			numDigits: {
				name: "num_digits",
				detail: "Obbligatorio. Numero di cifre a cui arrotondare l'argomento num."
			}
		}
	},
	ROUNDBANK: {
		description: "Arrotonda un numero con il metodo dell'arrotondamento bancario.",
		abstract: "Arrotonda un numero con il metodo dell'arrotondamento bancario.",
		links: [{
			title: "Instruction",
			url: ""
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Numero che si desidera arrotondare con il metodo dell'arrotondamento bancario."
			},
			numDigits: {
				name: "num_digits",
				detail: "Numero di cifre a cui si desidera arrotondare con il metodo dell'arrotondamento bancario."
			}
		}
	},
	ROUNDDOWN: {
		description: "Arrotonda il valore assoluto di un numero per difetto.",
		abstract: "Arrotonda il valore assoluto di un numero per difetto.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/rounddown-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. Numero reale che si desidera arrotondare per difetto."
			},
			numDigits: {
				name: "num_digits",
				detail: "Obbligatorio. Numero di cifre a cui si desidera arrotondare num."
			}
		}
	},
	ROUNDUP: {
		description: "Arrotonda il valore assoluto di un numero, escluso zero, per eccesso.",
		abstract: "Arrotonda il valore assoluto di un numero, escluso zero, per eccesso.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/roundup-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. Numero reale che si desidera arrotondare per eccesso."
			},
			numDigits: {
				name: "num_digits",
				detail: "Obbligatorio. Numero di cifre a cui si desidera arrotondare num."
			}
		}
	},
	SEC: {
		description: "Restituisce la secante di un angolo.",
		abstract: "Restituisce la secante di un angolo.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/sec-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Angolo in radianti di cui si desidera ottenere la secante."
		} }
	},
	SECH: {
		description: "Restituisce la secante iperbolica di un angolo.",
		abstract: "Restituisce la secante iperbolica di un angolo.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/sech-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Angolo in radianti di cui si desidera ottenere la secante iperbolica."
		} }
	},
	SERIESSUM: {
		description: "Molte funzioni possono essere approssimate per un'espansione di serie di potenze.",
		abstract: "Molte funzioni possono essere approssimate per un'espansione di serie di potenze.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/seriessum-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obbligatorio. Valore di input della serie di potenze."
			},
			n: {
				name: "n",
				detail: "Obbligatorio. Potenza iniziale alla quale si desidera elevare x."
			},
			m: {
				name: "m",
				detail: "Obbligatorio. Incremento di n per ciascun termine della serie."
			},
			coefficients: {
				name: "coefficients",
				detail: "Obbligatorio. Insieme di coefficienti per ogni potenza successiva di x. Il numero di valori in coefficienti determina il numero di termini nella serie di potenze. Ad esempio, se coefficienti contiene tre valori, nella serie di potenze saranno presenti tre termini."
			}
		}
	},
	SEQUENCE: {
		description: "Nell'esempio seguente, viene creata una matrice alta 4 righe e larga 5 colonne con =SEQUENZA(4,5) .",
		abstract: "Nell'esempio seguente, viene creata una matrice alta 4 righe e larga 5 colonne con =SEQUENZA(4,5) .",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/sequence-function"
		}],
		functionParameter: {
			rows: {
				name: "rows",
				detail: "Il numero di righe da restituire"
			},
			columns: {
				name: "columns",
				detail: "Il numero di colonne da restituire."
			},
			start: {
				name: "start",
				detail: "Il primo numero della sequenza"
			},
			step: {
				name: "step",
				detail: "La quantità di incremento di ciascun valore successivo nella matrice"
			}
		}
	},
	SIGN: {
		description: "Determina il segno di un numero. Restituisce 1 se il numero è positivo, zero (0) se il numero è 0 e -1 se il numero è negativo.",
		abstract: "Determina il segno di un numero. Restituisce 1 se il numero è positivo, zero (0) se il numero è 0 e -1 se il numero è negativo.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/sign-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio. Numero reale."
		} }
	},
	SIN: {
		description: "Restituisce il seno dell'angolo specificato.",
		abstract: "Restituisce il seno dell'angolo specificato.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/sin-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio. Angolo in radianti di cui si desidera il seno."
		} }
	},
	SINH: {
		description: "Restituisce il seno iperbolico di un numero.",
		abstract: "Restituisce il seno iperbolico di un numero.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/sinh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio. Numero reale."
		} }
	},
	SQRT: {
		description: "Restituisce una radice quadrata positiva.",
		abstract: "Restituisce una radice quadrata positiva.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/sqrt-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio. Numero di cui si desidera la radice quadrata."
		} }
	},
	SQRTPI: {
		description: "Restituisce la radice quadrata di (num * pi).",
		abstract: "Restituisce la radice quadrata di (num * pi).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/sqrtpi-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio. Numero per il quale viene moltiplicato pi greco."
		} }
	},
	SUBTOTAL: {
		description: "Restituisce un subtotale in un elenco o in un database. In genere, risulta più semplice creare un elenco con i subtotali scegliendo Subtotale nel gruppo Struttura della scheda Dati nell'applicazione desktop Excel. Dopo la creazione dell'elenco con i subtotali, sarà possibile apportarvi delle modifiche modificando la funzione SUBTOTALE.",
		abstract: "Restituisce un subtotale in un elenco o in un database. In genere, risulta più semplice creare un elenco con i subtotali scegliendo Subtotale nel gruppo Struttura della scheda Dati nell'applicazione desktop Excel. Dopo la creazione dell'elenco con i subtotali, sarà possibile apportarvi delle modifiche modificando la funzione SUBTOTALE.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/subtotal-function"
		}],
		functionParameter: {
			functionNum: {
				name: "function_num",
				detail: "Obbligatorio. Numero 1-11 o 101-111 che specifica la funzione da usare per il subtotale. 1-11 include le righe nascoste manualmente, mentre 101-111 le esclude; le celle filtrate sono sempre escluse."
			},
			ref1: {
				name: "ref1",
				detail: "Obbligatorio. Primo riferimento o intervallo denominato del quale si desidera calcolare il subtotale."
			},
			ref2: {
				name: "ref2",
				detail: "Opzionale. Da 2 a 254 riferimenti o intervalli denominati dei quali si desidera calcolare il subtotale."
			}
		}
	},
	SUM: {
		description: "La funzione SOMMA somma i valori. È possibile sommare singoli valori, riferimenti o intervalli di celle, o una combinazione dei tre.",
		abstract: "La funzione SOMMA somma i valori. È possibile sommare singoli valori, riferimenti o intervalli di celle, o una combinazione dei tre.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/sum-function"
		}],
		functionParameter: {
			number1: {
				name: "Number 1",
				detail: "Primo numero da sommare. Il numero può essere simile a 4, a un riferimento di cella come B6 o a un intervallo di celle come B2:B8."
			},
			number2: {
				name: "Number 2",
				detail: "Secondo numero da sommare. È possibile specificare fino a 255 numeri in questo modo."
			}
		}
	},
	SUMIF: {
		description: "Usare la funzione SOMMA.SE per sommare i valori di un intervallo che soddisfano i criteri specificati. Supponiamo ad esempio di voler sommare in una colonna contenente numeri solo i valori maggiori di 5. È possibile usare la formula seguente: =SOMMA.SE(B2:B25;\">5\")",
		abstract: "Usare la funzione SOMMA.SE per sommare i valori di un intervallo che soddisfano i criteri specificati. Supponiamo ad esempio di voler sommare in una colonna contenente numeri solo i valori maggiori di 5. È possibile usare la formula seguente: =SOMMA.SE(B2:B25;\">5\")",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/sumif-function"
		}],
		functionParameter: {
			range: {
				name: "range",
				detail: "Obbligatorio. Intervallo di celle da valutare in base ai criteri. Le celle di ogni intervallo devono contenere numeri oppure nomi, matrici o riferimenti che includono numeri. Le celle vuote e i valori di testo verranno ignorati. L'intervallo selezionato può contenere date nel formato standard di Excel (vedere gli esempi di seguito)."
			},
			criteria: {
				name: "criteria",
				detail: "Obbligatorio. Criteri in forma di numero, espressione, riferimento di cella, testo o funzione che definisce le celle che verranno sommate. È possibile includere caratteri jolly: un punto interrogativo (?) per la corrispondenza con qualsiasi carattere singolo, un asterisco (*) per la corrispondenza con qualsiasi sequenza di caratteri. Per trovare un punto interrogativo o un asterisco, digitare una tilde ( ~ ) prima del carattere. Ad esempio, i criteri possono essere espressi come 32, \">32\", B5, \"3?\", \"mela*\", \"*~?\" o OGGI(). Importante Qualsiasi criterio di testo o di altro tipo comprendente simboli logici o matematici deve essere racchiuso tra virgolette doppie ( \" ). Se il criterio è numerico, le virgolette doppie non saranno necessarie."
			},
			sumRange: {
				name: "sum_range",
				detail: "Opzionale. Celle effettive da aggiungere, se si desidera aggiungere celle diverse da quelle specificate nell'argomento intervallo . Se l'argomento sum_range viene omesso, Verranno sommate le celle specificate nell'argomento intervallo , ovvero le stesse celle a cui vengono applicati i criteri. Sum_range devono avere le stesse dimensioni e la stessa forma di intervallo . In caso contrario, potrebbero verificarsi problemi di prestazioni e la formula sommerà un intervallo di celle che inizia con la prima cella di sum_range ma ha le stesse dimensioni di intervallo . Ad esempio: intervallo int_somma Celle effettive sommate A1:A5 B1:B5 B1:B5 A1:A5 B1:K5 B1:B5"
			}
		}
	},
	SUMIFS: {
		description: "La funzione SOMMA.PIÙ.SE, una delle funzioni matematiche e trigonometriche , somma tutti i suoi argomenti che soddisfano più criteri. Ad esempio, si può usare SUMIFS per sommare il numero di rivenditori del paese che (1) risiedono in un singolo codice postale e (2) i cui profitti superano un determinato valore in dollari.",
		abstract: "La funzione SOMMA.PIÙ.SE, una delle funzioni matematiche e trigonometriche , somma tutti i suoi argomenti che soddisfano più criteri. Ad esempio, si può usare SUMIFS per sommare il numero di rivenditori del paese che (1) risiedono in un singolo codice postale e (2) i cui profitti superano un determinato valore in dollari.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/sumifs-function"
		}],
		functionParameter: {
			sumRange: {
				name: "sum_range",
				detail: "Intervallo di celle da sommare."
			},
			criteriaRange1: {
				name: "criteria_range1",
				detail: "Intervallo testato con Criteri1 . Criteria_range1 e Criteri1 impostano una coppia di ricerca in base alla quale viene eseguita la ricerca di criteri specifici in un intervallo. Una volta trovati gli elementi nell'intervallo, vengono aggiunti i valori corrispondenti in Sum_range ."
			},
			criteria1: {
				name: "criteria1",
				detail: "Criteri che definiscono quali celle in Criteria_range1 verranno aggiunte. Ad esempio, i criteri possono essere immessi come 32, \"32\", B4 , \"mele\" o \"32\". For example, criteria can be entered as 32 , \">32\" , B4, \"apples\" or \"32\"."
			},
			criteriaRange2: {
				name: "criteriaRange2",
				detail: "Intervalli aggiuntivi e criteri associati. È possibile immettere fino a 127 coppie di intervalli/criteri."
			},
			criteria2: {
				name: "criteria2",
				detail: "Intervalli aggiuntivi e criteri associati. È possibile immettere fino a 127 coppie di intervalli/criteri."
			}
		}
	},
	SUMPRODUCT: {
		description: "MATR.SOMMA.PRODOTTO corrisponde a tutte le istanze dell'elemento Y/Dimensione M e le somma, quindi per questo esempio 21 più 41 è uguale a 62.",
		abstract: "MATR.SOMMA.PRODOTTO corrisponde a tutte le istanze dell'elemento Y/Dimensione M e le somma, quindi per questo esempio 21 più 41 è uguale a 62.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/sumproduct-function"
		}],
		functionParameter: {
			array1: {
				name: "array",
				detail: "Il primo argomento matrice di cui si desidera moltiplicare e quindi sommare gli elementi."
			},
			array2: {
				name: "array",
				detail: "Argomenti matrice da 2 a 255 di cui si desidera moltiplicare e quindi sommare i componenti."
			}
		}
	},
	SUMSQ: {
		description: "Restituisce la somma dei quadrati degli argomenti.",
		abstract: "Restituisce la somma dei quadrati degli argomenti.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/sumsq-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Num1 è obbligatorio. I numeri successivi sono facoltativi. Possono essere presenti un massimo di 255 argomenti di cui si desidera la somma dei quadrati."
			},
			number2: {
				name: "number2",
				detail: "Num1 è obbligatorio. I numeri successivi sono facoltativi. Possono essere presenti un massimo di 255 argomenti di cui si desidera la somma dei quadrati."
			}
		}
	},
	SUMX2MY2: {
		description: "Questa funzione di Excel restituisce la somma della differenza dei quadrati dei valori corrispondenti di due matrici.",
		abstract: "Questa funzione di Excel restituisce la somma della differenza dei quadrati dei valori corrispondenti di due matrici.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/sumx2my2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "array_x",
				detail: "Obbligatorio. Prima matrice o primo intervallo di valori."
			},
			arrayY: {
				name: "array_y",
				detail: "Obbligatorio. Seconda matrice o secondo intervallo di valori."
			}
		}
	},
	SUMX2PY2: {
		description: "Restituisce la somma della somma dei quadrati dei valori corrispondenti di due matrici. La somma della somma dei quadrati è un termine ricorrente in molte funzioni di calcolo statistico.",
		abstract: "Restituisce la somma della somma dei quadrati dei valori corrispondenti di due matrici. La somma della somma dei quadrati è un termine ricorrente in molte funzioni di calcolo statistico.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/sumx2py2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "array_x",
				detail: "Obbligatorio. Prima matrice o primo intervallo di valori."
			},
			arrayY: {
				name: "array_y",
				detail: "Obbligatorio. Seconda matrice o secondo intervallo di valori."
			}
		}
	},
	SUMXMY2: {
		description: "La funzione SUMXMY2 restituisce la somma dei quadrati delle differenze dei valori corrispondenti di due matrici.",
		abstract: "La funzione SUMXMY2 restituisce la somma dei quadrati delle differenze dei valori corrispondenti di due matrici.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/sumxmy2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "array_x",
				detail: "Prima matrice o primo intervallo di valori. Obbligatorio."
			},
			arrayY: {
				name: "array_y",
				detail: "Seconda matrice o secondo intervallo di valori. Obbligatorio."
			}
		}
	},
	TAN: {
		description: "Restituisce la tangente dell'angolo specificato.",
		abstract: "Restituisce la tangente dell'angolo specificato.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/tan-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio. Angolo in radianti di cui si desidera la tangente."
		} }
	},
	TANH: {
		description: "Restituisce la tangente iperbolica di un numero.",
		abstract: "Restituisce la tangente iperbolica di un numero.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/tanh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio. Numero reale."
		} }
	},
	TRUNC: {
		description: "La funzione TRONCA tronca un numero in un numero intero rimuovendo la parte frazionaria del numero.",
		abstract: "La funzione TRONCA tronca un numero in un numero intero rimuovendo la parte frazionaria del numero.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/trunc-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. Numero che si desidera troncare."
			},
			numDigits: {
				name: "num_digits",
				detail: "Opzionale. Numero che specifica la precisione del troncamento. Il valore predefinito di num_cifre è 0 (zero)."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/statistical/it-IT.ts
const locale$4 = {
	AVEDEV: {
		description: "Restituisce la media delle deviazioni assolute dei valori rispetto alla loro media. MEDIA.DEV è una misura della variabilità in un set di dati.",
		abstract: "Restituisce la media delle deviazioni assolute dei valori rispetto alla loro media. MEDIA.DEV è una misura della variabilità in un set di dati.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/avedev-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Num1 è obbligatorio, i numeri successivi sono facoltativi. Da 1 a 255 argomenti di cui si desidera calcolare la media delle deviazioni assolute. Anziché argomenti separati da punti e virgola, è possibile utilizzare una matrice o un riferimento a una matrice."
			},
			number2: {
				name: "number2",
				detail: "Num1 è obbligatorio, i numeri successivi sono facoltativi. Da 1 a 255 argomenti di cui si desidera calcolare la media delle deviazioni assolute. Anziché argomenti separati da punti e virgola, è possibile utilizzare una matrice o un riferimento a una matrice."
			}
		}
	},
	AVERAGE: {
		description: "Restituisce la media aritmetica degli argomenti. Ad esempio, se l'intervallo A1:A20 contiene numeri, la formula =MEDIA(A1:A20) restituisce la media di tali numeri.",
		abstract: "Restituisce la media aritmetica degli argomenti. Ad esempio, se l'intervallo A1:A20 contiene numeri, la formula =MEDIA(A1:A20) restituisce la media di tali numeri.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/average-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obbligatorio. Primo numero, riferimento di cella o intervallo di cui si desidera calcolare la media."
			},
			number2: {
				name: "number2",
				detail: "Opzionale. Altri numeri, riferimenti di cella o intervalli di cui si vuole calcolare la media, fino a un massimo di 255."
			}
		}
	},
	AVERAGE_WEIGHTED: {
		description: "La funzione AVERAGE.WEIGHTED calcola la media ponderata di un insieme di valori usando i valori e i rispettivi pesi.",
		abstract: "La funzione AVERAGE.WEIGHTED calcola la media ponderata di un insieme di valori usando i valori e i rispettivi pesi.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9084098?hl=it"
		}],
		functionParameter: {
			values: {
				name: "valori",
				detail: "I valori di cui calcolare la media. Possono essere un intervallo di celle o i valori stessi."
			},
			weights: {
				name: "pesi",
				detail: "L’elenco dei pesi corrispondenti da applicare. I pesi possono essere zero ma non negativi e almeno uno deve essere positivo. L’intervallo dei pesi deve avere lo stesso numero di righe e colonne dell’intervallo dei valori."
			},
			additionalValues: {
				name: "valori_aggiuntivi",
				detail: "Valori aggiuntivi facoltativi di cui calcolare la media."
			},
			additionalWeights: {
				name: "pesi_aggiuntivi",
				detail: "Pesi aggiuntivi facoltativi. Ogni valore_aggiuntivo deve essere seguito da un solo peso_aggiuntivo."
			}
		}
	},
	AVERAGEA: {
		description: "Restituisce la media aritmetica dei valori nell'elenco di argomenti.",
		abstract: "Restituisce la media aritmetica dei valori nell'elenco di argomenti.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/averagea-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Val1 è obbligatorio, i valori successivi sono facoltativi. Da 1 a 255 celle, intervalli di celle o valori di cui si desidera calcolare la media."
			},
			value2: {
				name: "value2",
				detail: "Val1 è obbligatorio, i valori successivi sono facoltativi. Da 1 a 255 celle, intervalli di celle o valori di cui si desidera calcolare la media."
			}
		}
	},
	AVERAGEIF: {
		description: "Restituisce la media aritmetica di tutte le celle di un intervallo che soddisfano un criterio specificato.",
		abstract: "Restituisce la media aritmetica di tutte le celle di un intervallo che soddisfano un criterio specificato.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/averageif-function"
		}],
		functionParameter: {
			range: {
				name: "range",
				detail: "Obbligatorio. Una o più celle, di cui calcolare la media, compresi numeri o nomi, matrici o riferimenti che contengono numeri."
			},
			criteria: {
				name: "criteria",
				detail: "Obbligatorio. Criteri in forma di numeri, espressioni, riferimenti di cella o testo che determinano le celle di cui verrà calcolata la media. Ad esempio, i criteri possono essere espressi come 32, \"32\", \">32\", \"mele\" o B4."
			},
			averageRange: {
				name: "average_range",
				detail: "Opzionale. Insieme effettivo di celle di cui calcolare la media. Se omesso, viene usato il valore intervallo."
			}
		}
	},
	AVERAGEIFS: {
		description: "Restituisce la media aritmetica di tutte le celle che soddisfano più criteri.",
		abstract: "Restituisce la media aritmetica di tutte le celle che soddisfano più criteri.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/averageifs-function"
		}],
		functionParameter: {
			averageRange: {
				name: "average_range",
				detail: "Obbligatorio. Una o più celle, di cui calcolare la media, compresi numeri o nomi, matrici o riferimenti che contengono numeri."
			},
			criteriaRange1: {
				name: "criteria_range1",
				detail: "Intervallo1_criteri è obbligatorio, mentre gli intervalli criteri successivi sono facoltativi. Indica da 1 a 127 intervalli in cui valutare i criteri associati."
			},
			criteria1: {
				name: "criteria1",
				detail: "Criteri1 è obbligatorio, i criteri successivi sono facoltativi. Indica da 1 a 127 criteri in forma di numeri, espressioni, riferimenti di cella o testo che determinano le celle di cui verrà calcolata la media. Ad esempio, i criteri possono essere espressi come 32, \"32\", \">32\", \"mele\" o B4."
			},
			criteriaRange2: {
				name: "criteria_range2",
				detail: "Intervallo1_criteri è obbligatorio, mentre gli intervalli criteri successivi sono facoltativi. Indica da 1 a 127 intervalli in cui valutare i criteri associati."
			},
			criteria2: {
				name: "criteria2",
				detail: "Criteri1 è obbligatorio, i criteri successivi sono facoltativi. Indica da 1 a 127 criteri in forma di numeri, espressioni, riferimenti di cella o testo che determinano le celle di cui verrà calcolata la media. Ad esempio, i criteri possono essere espressi come 32, \"32\", \">32\", \"mele\" o B4."
			}
		}
	},
	BETA_DIST: {
		description: "La distribuzione beta viene generalmente utilizzata per lo studio su campioni delle variazioni percentuali di un elemento o di una situazione qualsiasi, quale ad esempio il numero di ore che si trascorrono quotidianamente davanti al televisore.",
		abstract: "La distribuzione beta viene generalmente utilizzata per lo studio su campioni delle variazioni percentuali di un elemento o di una situazione qualsiasi, quale ad esempio il numero di ore che si trascorrono quotidianamente davanti al televisore.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/beta-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obbligatorio. Valore compreso tra A e B in cui calcolare la funzione."
			},
			alpha: {
				name: "alpha",
				detail: "Obbligatorio. Parametro della distribuzione."
			},
			beta: {
				name: "beta",
				detail: "Obbligatorio. Parametro della distribuzione."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obbligatorio. Valore logico che determina la forma assunta dalla funzione. Se cumulativo è VERO, DISTRIB.BETA.N restituirà la funzione di distribuzione cumulativa, se è FALSO restituirà la funzione densità di probabilità."
			},
			A: {
				name: "A",
				detail: "Optional. Valore per l'estremo inferiore dell'intervallo di x."
			},
			B: {
				name: "B",
				detail: "Facoltativo. Valore per l'estremo superiore dell'intervallo di x."
			}
		}
	},
	BETA_INV: {
		description: "Se probabilità = DISTRIB.BETA.N(x;...VERO), si avrà INV.BETA.N(probabilità;...) = x. Dati un tempo di durata e una variabilità previsti, la distribuzione beta può essere utilizzata nella pianificazione di progetti per calcolare i tempi di durata probabili.",
		abstract: "Se probabilità = DISTRIB.BETA.N(x;...VERO), si avrà INV.BETA.N(probabilità;...) = x. Dati un tempo di durata e una variabilità previsti, la distribuzione beta può essere utilizzata nella pianificazione di progetti per calcolare i tempi di durata probabili.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/beta-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obbligatorio. Probabilità associata alla distribuzione beta."
			},
			alpha: {
				name: "alpha",
				detail: "Obbligatorio. Parametro della distribuzione."
			},
			beta: {
				name: "beta",
				detail: "Obbligatorio. Parametro della distribuzione."
			},
			A: {
				name: "A",
				detail: "Optional. Valore per l'estremo inferiore dell'intervallo di x."
			},
			B: {
				name: "B",
				detail: "Facoltativo. Valore per l'estremo superiore dell'intervallo di x."
			}
		}
	},
	BINOM_DIST: {
		description: "Restituisce la distribuzione binomiale per il termine individuale. Utilizzare la funzione DISTRIB.BINOM.N per risolvere problemi con un numero fisso di verifiche o di prove, quando i risultati di una prova qualsiasi sono solo positivi o negativi, quando le prove sono indipendenti e quando la probabilità di successo è costante nel corso di tutto l'esperimento. La funzione DISTRIB.BINOM.N può calcolare ad esempio la probabilità che due neonati su tre siano maschi.",
		abstract: "Restituisce la distribuzione binomiale per il termine individuale. Utilizzare la funzione DISTRIB.BINOM.N per risolvere problemi con un numero fisso di verifiche o di prove, quando i risultati di una prova qualsiasi sono solo positivi o negativi, quando le prove sono indipendenti e quando la probabilità di successo è costante nel corso di tutto l'esperimento. La funzione DISTRIB.BINOM.N può calcolare ad esempio la probabilità che due neonati su tre siano maschi.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/binom-dist-function"
		}],
		functionParameter: {
			numberS: {
				name: "number_s",
				detail: "Obbligatorio. Numero di successi in prove."
			},
			trials: {
				name: "trials",
				detail: "Obbligatorio. Numero di prove indipendenti."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Obbligatorio. Probabilità di successo per ogni prova."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obbligatorio. Valore logico che determina la forma assunta dalla funzione. Se cumulativo è VERO, si tratta di BINOM. DISTRIB.N restituisce la funzione distribuzione cumulativa, ovvero la probabilità che ci siano al massimo number_s successi; se è FALSO, restituirà la funzione massa di probabilità, ovvero la probabilità che siano presenti number_s successi."
			}
		}
	},
	BINOM_DIST_RANGE: {
		description: "Restituisce la probabilità del risultato di una prova usando la distribuzione binomiale.",
		abstract: "Restituisce la probabilità del risultato di una prova usando la distribuzione binomiale.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/binom-dist-range-function"
		}],
		functionParameter: {
			trials: {
				name: "trials",
				detail: "Obbligatorio. Numero di prove indipendenti. Deve essere maggiore o uguale a 0."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Obbligatorio. Probabilità di successo per ogni prova. Deve essere maggiore o uguale a 0 e minore o uguale a 1."
			},
			numberS: {
				name: "number_s",
				detail: "Obbligatorio. Numero di successi nelle prove. Deve essere maggiore o uguale a 0 e minore o uguale all'argomento prove."
			},
			numberS2: {
				name: "number_s2",
				detail: "Opzionale. Se lo si specifica, restituisce la probabilità che il numero di prove riuscite sia compreso tra num_successi e numero_s2. Deve essere maggiore o uguale all'argomento num_successi e minore o uguale all'argomento prove."
			}
		}
	},
	BINOM_INV: {
		description: "Restituisce il più piccolo valore per il quale la distribuzione cumulativa binomiale risulta maggiore o uguale a un valore di criterio.",
		abstract: "Restituisce il più piccolo valore per il quale la distribuzione cumulativa binomiale risulta maggiore o uguale a un valore di criterio.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/binom-inv-function"
		}],
		functionParameter: {
			trials: {
				name: "trials",
				detail: "Obbligatorio. Numero delle prove di Bernoulli."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Obbligatorio. Probabilità di successo per ogni prova."
			},
			alpha: {
				name: "alpha",
				detail: "Obbligatorio. Valore di criterio."
			}
		}
	},
	CHISQ_DIST: {
		description: "Restituisce la distribuzione del chi quadrato.",
		abstract: "Restituisce la distribuzione del chi quadrato.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/chisq-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obbligatorio. Valore in cui si desidera calcolare la distribuzione."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Obbligatorio. Numero di gradi di libertà."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obbligatorio. Valore logico che determina la forma assunta dalla funzione. Se cumulativo è VERO, DISTRIB.CHI.QUAD restituirà la funzione di distribuzione cumulativa, se è FALSO restituirà la funzione densità di probabilità."
			}
		}
	},
	CHISQ_DIST_RT: {
		description: "La distribuzione χ2 è associata al test χ2. Utilizzare il test χ2 per confrontare i valori osservati con i valori previsti. Ad esempio, sulla base di un esperimento genetico si potrebbe ipotizzare che la gamma di colori della prossima generazione di piante sarà diversa da quella attuale. Confrontando i risultati osservati con quelli previsti, sarà possibile stabilire la validità dell'ipotesi formulata in origine.",
		abstract: "La distribuzione χ2 è associata al test χ2. Utilizzare il test χ2 per confrontare i valori osservati con i valori previsti. Ad esempio, sulla base di un esperimento genetico si potrebbe ipotizzare che la gamma di colori della prossima generazione di piante sarà diversa da quella attuale. Confrontando i risultati osservati con quelli previsti, sarà possibile stabilire la validità dell'ipotesi formulata in origine.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/chisq-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obbligatorio. Valore in cui si desidera calcolare la distribuzione."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Obbligatorio. Numero di gradi di libertà."
			}
		}
	},
	CHISQ_INV: {
		description: "La distribuzione del chi quadrato viene generalmente utilizzata per lo studio su campioni delle variazioni percentuali di un elemento o di una situazione qualsiasi, quale ad esempio il numero di ore che si trascorrono quotidianamente davanti al televisore.",
		abstract: "La distribuzione del chi quadrato viene generalmente utilizzata per lo studio su campioni delle variazioni percentuali di un elemento o di una situazione qualsiasi, quale ad esempio il numero di ore che si trascorrono quotidianamente davanti al televisore.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/chisq-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obbligatorio. Probabilità associata alla distribuzione del chi quadrato."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Obbligatorio. Numero di gradi di libertà."
			}
		}
	},
	CHISQ_INV_RT: {
		description: "Se probabilità = DISTRIB.CHI.QUAD.DS(x;...), verrà restituito INV.CHI.QUAD.DS(probabilità;...) = x. Utilizzare questa funzione per confrontare i risultati osservati con quelli previsti per stabilire se l'ipotesi formulata in origine è valida.",
		abstract: "Se probabilità = DISTRIB.CHI.QUAD.DS(x;...), verrà restituito INV.CHI.QUAD.DS(probabilità;...) = x. Utilizzare questa funzione per confrontare i risultati osservati con quelli previsti per stabilire se l'ipotesi formulata in origine è valida.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/chisq-inv-rt-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obbligatorio. Probabilità associata alla distribuzione del chi quadrato."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Obbligatorio. Numero di gradi di libertà."
			}
		}
	},
	CHISQ_TEST: {
		description: "Restituisce il test per l'indipendenza. La funzione TEST.CHI.QUAD restituisce il valore dalla distribuzione del chi quadrato (χ2) per un dato statistico e i gradi di libertà appropriati. È possibile utilizzare i test χ2 per stabilire se i risultati previsti vengono confermati mediante un esperimento.",
		abstract: "Restituisce il test per l'indipendenza. La funzione TEST.CHI.QUAD restituisce il valore dalla distribuzione del chi quadrato (χ2) per un dato statistico e i gradi di libertà appropriati. È possibile utilizzare i test χ2 per stabilire se i risultati previsti vengono confermati mediante un esperimento.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/chisq-test-function"
		}],
		functionParameter: {
			actualRange: {
				name: "actual_range",
				detail: "Obbligatorio. Intervallo di dati che contiene le osservazioni da confrontare con i valori previsti."
			},
			expectedRange: {
				name: "expected_range",
				detail: "Obbligatorio. Intervallo di dati che contiene la proporzione del prodotto dei totali di riga e di colonna per il totale complessivo."
			}
		}
	},
	CONFIDENCE_NORM: {
		description: "L'intervallo di confidenza è un intervallo di valori x ± CONFIDENZA.NORM in cui x è la media campione al centro dell'intervallo. Se ad esempio x è la media campione dei tempi di recapito per i prodotti ordinati tramite posta, x ± CONFIDENZA.NORM è un intervallo di medie della popolazione. Per qualsiasi media della popolazione μ0 compresa in questo intervallo, la probabilità di ottenere una media campione che si discosta maggiormente da μ0 che da x è maggiore di alfa. Per qualsiasi media della popolazione μ0 non compresa in questo intervallo, la probabilità di ottenere una media campione che si discosta maggiormente da μ0 che da x è minore di alfa. In altre parole, si supponga di utilizzare x, dev_standard, dimens per creare un test a due code al livello di significatività alfa dell'ipotesi secondo cui la media della popolazione è μ0. Tale ipotesi non verrà quindi rifiutata se μ0 è compreso nell'intervallo di confidenza, mentre verrà respinta se μ0 non è compreso nell'intervallo di confidenza. L'intervallo di confidenza non consente di dedurre che esiste una probabilità 1 – alfa che il pacchetto successivo richiederà un tempo di recapito compreso nell'intervallo di confidenza.",
		abstract: "L'intervallo di confidenza è un intervallo di valori x ± CONFIDENZA.NORM in cui x è la media campione al centro dell'intervallo. Se ad esempio x è la media campione dei tempi di recapito per i prodotti ordinati tramite posta, x ± CONFIDENZA.NORM è un intervallo di medie della popolazione. Per qualsiasi media della popolazione μ0 compresa in questo intervallo, la probabilità di ottenere una media campione che si discosta maggiormente da μ0 che da x è maggiore di alfa. Per qualsiasi media della popolazione μ0 non compresa in questo intervallo, la probabilità di ottenere una media campione che si discosta maggiormente da μ0 che da x è minore di alfa. In altre parole, si supponga di utilizzare x, dev_standard, dimens per creare un test a due code al livello di significatività alfa dell'ipotesi secondo cui la media della popolazione è μ0. Tale ipotesi non verrà quindi rifiutata se μ0 è compreso nell'intervallo di confidenza, mentre verrà respinta se μ0 non è compreso nell'intervallo di confidenza. L'intervallo di confidenza non consente di dedurre che esiste una probabilità 1 – alfa che il pacchetto successivo richiederà un tempo di recapito compreso nell'intervallo di confidenza.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/confidence-norm-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "Obbligatorio. Livello di significatività utilizzato per calcolare il livello di confidenza. Il livello di probabilità è uguale a 100*(1 - alfa)% o, in altre parole, un valore alfa di 0,05 indica un livello di probabilità del 95%."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Obbligatorio. Deviazione standard della popolazione per l'intervallo di dati e si presuppone che sia nota."
			},
			size: {
				name: "size",
				detail: "Obbligatorio. Dimensione del campione."
			}
		}
	},
	CONFIDENCE_T: {
		description: "Restituisce l'intervallo di confidenza per una media di popolazione utilizzando una distribuzione t di Student.",
		abstract: "Restituisce l'intervallo di confidenza per una media di popolazione utilizzando una distribuzione t di Student.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/confidence-t-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "Obbligatorio. Livello di significatività utilizzato per calcolare il livello di confidenza. Il livello di probabilità è uguale a 100*(1 - alfa)% o, in altre parole, un valore alfa di 0,05 indica un livello di probabilità del 95%."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Obbligatorio. Deviazione standard della popolazione per l'intervallo di dati e si presuppone che sia nota."
			},
			size: {
				name: "size",
				detail: "Obbligatorio. Dimensione del campione."
			}
		}
	},
	CORREL: {
		description: "La funzione CORRELAZIONE restituisce il coefficiente di correlazione di due intervalli di celle. Utilizzare il coefficiente di correlazione per stabilire la relazione tra due proprietà. È possibile ad esempio esaminare la relazione tra la temperatura media di un ambiente e l'utilizzo di condizionatori d'aria.",
		abstract: "La funzione CORRELAZIONE restituisce il coefficiente di correlazione di due intervalli di celle. Utilizzare il coefficiente di correlazione per stabilire la relazione tra due proprietà. È possibile ad esempio esaminare la relazione tra la temperatura media di un ambiente e l'utilizzo di condizionatori d'aria.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/correl-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Obbligatorio. Un intervallo di valori di cella."
			},
			array2: {
				name: "array2",
				detail: "Obbligatorio. Secondo intervallo di valori delle celle."
			}
		}
	},
	COUNT: {
		description: "La funzione CONTA.NUMERI conta il numero di celle che contengono numeri e i numeri all'interno dell'elenco di argomenti. Usare la funzione CONTA.NUMERI per determinare il numero di voci di un campo numerico contenuto in un intervallo o in una matrice di numeri. È ad esempio possibile immettere la formula seguente per contare i numeri nell'intervallo A1:A20: =CONTA.NUMERI(A1:A20) . In questo esempio, se cinque celle dell'intervallo contengono numeri, il risultato è 5 .",
		abstract: "La funzione CONTA.NUMERI conta il numero di celle che contengono numeri e i numeri all'interno dell'elenco di argomenti. Usare la funzione CONTA.NUMERI per determinare il numero di voci di un campo numerico contenuto in un intervallo o in una matrice di numeri. È ad esempio possibile immettere la formula seguente per contare i numeri nell'intervallo A1:A20: =CONTA.NUMERI(A1:A20) . In questo esempio, se cinque celle dell'intervallo contengono numeri, il risultato è 5 .",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/count-function"
		}],
		functionParameter: {
			value1: {
				name: "value 1",
				detail: "Obbligatorio. Primo elemento, riferimento di cella o intervallo in cui si desidera contare i numeri."
			},
			value2: {
				name: "value 2",
				detail: "Opzionale. Fino a 255 elementi, riferimenti di cella o intervalli aggiuntivi in cui contare i numeri."
			}
		}
	},
	COUNTA: {
		description: "La funzione CONTA.VALORI conta il numero di celle non vuote in un intervallo.",
		abstract: "La funzione CONTA.VALORI conta il numero di celle non vuote in un intervallo.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/counta-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Val1 è obbligatorio, i valori successivi sono facoltativi. Da 1 a 255 celle, intervalli di celle o valori di cui si desidera calcolare la media."
			},
			value2: {
				name: "value2",
				detail: "Val1 è obbligatorio, i valori successivi sono facoltativi. Da 1 a 255 celle, intervalli di celle o valori di cui si desidera calcolare la media."
			}
		}
	},
	COUNTBLANK: {
		description: "Usare la funzione CONTA.VUOTE , una delle funzioni statistiche , per contare il numero di celle vuote in un intervallo di celle.",
		abstract: "Usare la funzione CONTA.VUOTE , una delle funzioni statistiche , per contare il numero di celle vuote in un intervallo di celle.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/countblank-function"
		}],
		functionParameter: { range: {
			name: "range",
			detail: "Obbligatorio. Intervallo a partire dal quale si desidera contare le celle vuote."
		} }
	},
	COUNTIF: {
		description: "Usare CONTA.SE, una delle funzioni statistiche , per contare il numero di celle che soddisfano un determinato criterio, ad esempio per contare il numero di volte in cui una particolare città compare in un elenco clienti.",
		abstract: "Usare CONTA.SE, una delle funzioni statistiche , per contare il numero di celle che soddisfano un determinato criterio, ad esempio per contare il numero di volte in cui una particolare città compare in un elenco clienti.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/use-the-countif-function-in-microsoft-excel"
		}],
		functionParameter: {
			range: {
				name: "range",
				detail: "Il gruppo di celle da contare. L'intervallo può contenere numeri, matrici, un intervallo denominato o riferimenti che contengono numeri. Le celle vuote e i valori di testo vengono ignorati. Informazioni su come selezionare intervalli in un foglio di lavoro ."
			},
			criteria: {
				name: "criteria",
				detail: "Numero, espressione, riferimento di cella o stringa di testo che determina quali celle verranno contate. Ad esempio, è possibile usare un numero come 32, un confronto come \">32\", una cella come B4 o una parola come \"mele\". CONTA.SE usa un solo criterio. Se si vogliono usare più criteri, usare CONTA.PIÙ.SE ."
			}
		}
	},
	COUNTIFS: {
		description: "La funzione CONTA.PIÙ.SE applica criteri alle celle di più intervalli e conta il numero di volte in cui tutti i criteri vengono soddisfatti.",
		abstract: "La funzione CONTA.PIÙ.SE applica criteri alle celle di più intervalli e conta il numero di volte in cui tutti i criteri vengono soddisfatti.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/countifs-function"
		}],
		functionParameter: {
			criteriaRange1: {
				name: "criteria_range1",
				detail: "Obbligatorio. Primo intervallo in cui valutare i criteri associati."
			},
			criteria1: {
				name: "criteria1",
				detail: "Obbligatorio. Criteri in forma di numero, espressione, riferimento di cella o testo che determinano quali celle verranno contate. Ad esempio, i criteri possono essere espressi come 32, \">32\", B4, \"mele\" o \"32\"."
			},
			criteriaRange2: {
				name: "criteria_range2",
				detail: "Opzionale. Ulteriori intervalli e criteri associati. È consentito un massimo di 127 coppie intervallo/criteri."
			},
			criteria2: {
				name: "criteria2",
				detail: "Opzionale. Ulteriori intervalli e criteri associati. È consentito un massimo di 127 coppie intervallo/criteri."
			}
		}
	},
	COVARIANCE_P: {
		description: "Restituisce la covarianza della popolazione, vale a dire la media dei prodotti delle deviazioni di ciascuna coppia di dati in due set di dati. La covarianza consente di determinare la relazione che sussiste tra due set di dati. È possibile ad esempio stabilire se a un reddito superiore corrispondano livelli di istruzione superiori.",
		abstract: "Restituisce la covarianza della popolazione, vale a dire la media dei prodotti delle deviazioni di ciascuna coppia di dati in due set di dati. La covarianza consente di determinare la relazione che sussiste tra due set di dati. È possibile ad esempio stabilire se a un reddito superiore corrispondano livelli di istruzione superiori.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/covariance-p-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Obbligatorio. Primo intervallo di celle costituito da interi."
			},
			array2: {
				name: "array2",
				detail: "Obbligatorio. Secondo intervallo di celle costituito da interi."
			}
		}
	},
	COVARIANCE_S: {
		description: "Restituisce la covarianza del campione, ovvero la media dei prodotti delle deviazioni di ogni coppia di coordinate in due set di dati.",
		abstract: "Restituisce la covarianza del campione, ovvero la media dei prodotti delle deviazioni di ogni coppia di coordinate in due set di dati.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/covariance-s-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Obbligatorio. Primo intervallo di celle costituito da interi."
			},
			array2: {
				name: "array2",
				detail: "Obbligatorio. Secondo intervallo di celle costituito da interi."
			}
		}
	},
	DEVSQ: {
		description: "Restituisce la somma dei quadrati delle deviazioni dei dati dalla relativa media campione.",
		abstract: "Restituisce la somma dei quadrati delle deviazioni dei dati dalla relativa media campione.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/devsq-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Num1 è obbligatorio, i numeri successivi sono facoltativi. Da 1 a 255 argomenti di cui si desidera calcolare la somma delle deviazioni quadrate. Anziché argomenti separati da punti e virgola, è inoltre possibile utilizzare una matrice o un riferimento a una matrice."
			},
			number2: {
				name: "number2",
				detail: "Num1 è obbligatorio, i numeri successivi sono facoltativi. Da 1 a 255 argomenti di cui si desidera calcolare la somma delle deviazioni quadrate. Anziché argomenti separati da punti e virgola, è inoltre possibile utilizzare una matrice o un riferimento a una matrice."
			}
		}
	},
	EXPON_DIST: {
		description: "Restituisce la distribuzione esponenziale. Utilizzare la funzione DISTRIB.EXP.N per calcolare il tempo che intercorre tra due eventi, quale il tempo impiegato da uno sportello automatico per fornire la somma in contanti richiesta. È possibile ad esempio utilizzare questa funzione per determinare la probabilità che questa operazione richieda al massimo un minuto.",
		abstract: "Restituisce la distribuzione esponenziale. Utilizzare la funzione DISTRIB.EXP.N per calcolare il tempo che intercorre tra due eventi, quale il tempo impiegato da uno sportello automatico per fornire la somma in contanti richiesta. È possibile ad esempio utilizzare questa funzione per determinare la probabilità che questa operazione richieda al massimo un minuto.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/expon-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obbligatorio. Valore della funzione."
			},
			lambda: {
				name: "lambda",
				detail: "Obbligatorio. Valore del parametro."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obbligatorio. Valore logico che indica la forma della funzione esponenziale. Se cumulativo è VERO, DISTRIB.EXP.N restituirà la funzione distribuzione cumulativa, se è FALSO restituirà la funzione densità di probabilità."
			}
		}
	},
	F_DIST: {
		description: "Restituisce la distribuzione di probabilità F. È possibile utilizzare questa funzione per determinare se due set di dati presentano gradi di diversità differenti. Ad esempio, è possibile esaminare i punteggi dei test per l'ingresso di uomini e donne al liceo e determinare se la variabilità delle donne è diversa da quella riscontrata nei maschi.",
		abstract: "Restituisce la distribuzione di probabilità F. È possibile utilizzare questa funzione per determinare se due set di dati presentano gradi di diversità differenti. Ad esempio, è possibile esaminare i punteggi dei test per l'ingresso di uomini e donne al liceo e determinare se la variabilità delle donne è diversa da quella riscontrata nei maschi.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/f-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obbligatorio. Valore in cui calcolare la funzione."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Obbligatorio. Gradi di libertà al numeratore."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Obbligatorio. Gradi di libertà al denominatore."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obbligatorio. Valore logico che determina la forma assunta dalla funzione. Se cumulativo è VERO, DISTRIBF restituirà la funzione di distribuzione cumulativa, se è FALSO restituirà la funzione densità di probabilità."
			}
		}
	},
	F_DIST_RT: {
		description: "Restituisce la distribuzione di probabilità F (coda destra) (grado di diversità) per due set di dati. È possibile utilizzare questa funzione per determinare se due set di dati presentano gradi di diversità differenti. È possibile ad esempio esaminare i punteggi dei test per l'ammissione all'università assegnati a studentesse e a studenti e stabilire se esistono differenze di variabilità tra il gruppo femminile e quello maschile.",
		abstract: "Restituisce la distribuzione di probabilità F (coda destra) (grado di diversità) per due set di dati. È possibile utilizzare questa funzione per determinare se due set di dati presentano gradi di diversità differenti. È possibile ad esempio esaminare i punteggi dei test per l'ammissione all'università assegnati a studentesse e a studenti e stabilire se esistono differenze di variabilità tra il gruppo femminile e quello maschile.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/f-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obbligatorio. Valore in cui calcolare la funzione."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Obbligatorio. Gradi di libertà al numeratore."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Obbligatorio. Gradi di libertà al denominatore."
			}
		}
	},
	F_INV: {
		description: "Restituisce l'inversa della distribuzione di probabilità F. Se p = DISTRIB.F.N(x,...), inV.F(p,...) = x. La distribuzione F può essere usata in un test F che confronta il grado di variabilità di due set di dati. È possibile ad esempio analizzare la distribuzione del reddito in Italia e in Francia per stabilire se i due paesi hanno un grado di diversità di reddito simile.",
		abstract: "Restituisce l'inversa della distribuzione di probabilità F. Se p = DISTRIB.F.N(x,...), inV.F(p,...) = x. La distribuzione F può essere usata in un test F che confronta il grado di variabilità di due set di dati. È possibile ad esempio analizzare la distribuzione del reddito in Italia e in Francia per stabilire se i due paesi hanno un grado di diversità di reddito simile.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/f-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obbligatorio. Probabilità associata alla distribuzione cumulativa F."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Obbligatorio. Gradi di libertà al numeratore."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Obbligatorio. Gradi di libertà al denominatore."
			}
		}
	},
	F_INV_RT: {
		description: "Restituisce l'inversa della distribuzione di probabilità F (coda destra). Se p = DISTRIB.F.DS(x;...), si avrà INV.F.DS(p;...) = x. La distribuzione F può essere usata in un test F che confronta il grado di variabilità di due set di dati. È possibile ad esempio analizzare la distribuzione del reddito in Italia e in Francia per stabilire se i due paesi hanno un grado di diversità di reddito simile.",
		abstract: "Restituisce l'inversa della distribuzione di probabilità F (coda destra). Se p = DISTRIB.F.DS(x;...), si avrà INV.F.DS(p;...) = x. La distribuzione F può essere usata in un test F che confronta il grado di variabilità di due set di dati. È possibile ad esempio analizzare la distribuzione del reddito in Italia e in Francia per stabilire se i due paesi hanno un grado di diversità di reddito simile.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/f-inv-rt-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obbligatorio. Probabilità associata alla distribuzione cumulativa F."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Obbligatorio. Gradi di libertà al numeratore."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Obbligatorio. Gradi di libertà al denominatore."
			}
		}
	},
	F_TEST: {
		description: "Utilizzare questa funzione per determinare se due campioni hanno varianze diverse. Ad esempio, sulla base dei punteggi di un test effettuato in scuole pubbliche e private, è possibile verificare se la diversità dei punteggi del test di queste scuole si estende su più livelli.",
		abstract: "Utilizzare questa funzione per determinare se due campioni hanno varianze diverse. Ad esempio, sulla base dei punteggi di un test effettuato in scuole pubbliche e private, è possibile verificare se la diversità dei punteggi del test di queste scuole si estende su più livelli.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/f-test-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Obbligatorio. Prima matrice o primo intervallo di dati."
			},
			array2: {
				name: "array2",
				detail: "Obbligatorio. Seconda matrice o secondo intervallo di dati."
			}
		}
	},
	FISHER: {
		description: "Restituisce la trasformazione di Fisher a x. Questa trasformazione genera una funzione caratterizzata da una distribuzione più uniforme che asimmetrica. Utilizzare questa funzione per eseguire una verifica di ipotesi sul coefficiente di correlazione.",
		abstract: "Restituisce la trasformazione di Fisher a x. Questa trasformazione genera una funzione caratterizzata da una distribuzione più uniforme che asimmetrica. Utilizzare questa funzione per eseguire una verifica di ipotesi sul coefficiente di correlazione.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/fisher-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Obbligatorio. Valore numerico per il quale si desidera eseguire la trasformazione."
		} }
	},
	FISHERINV: {
		description: "Restituisce l'inversa della trasformazione di Fisher. Utilizzare questa trasformazione durante l'analisi delle correlazioni tra intervalli o matrici di dati. Se y = FISHER(x), si avrà INV.FISHER(y) = x.",
		abstract: "Restituisce l'inversa della trasformazione di Fisher. Utilizzare questa trasformazione durante l'analisi delle correlazioni tra intervalli o matrici di dati. Se y = FISHER(x), si avrà INV.FISHER(y) = x.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/fisherinv-function"
		}],
		functionParameter: { y: {
			name: "y",
			detail: "Obbligatorio. Valore per il quale si desidera eseguire l'inversa della trasformazione."
		} }
	},
	FORECAST: {
		description: "Calcolare o prevedere un valore futuro usando valori esistenti. Il valore futuro è un valore y per un valore x specificato. I valori esistenti sono valori x e y noti e il valore futuro viene previsto usando la regressione lineare. È possibile usare queste funzioni per prevedere le vendite future, i requisiti di inventario o le tendenze dei consumatori.",
		abstract: "Calcolare o prevedere un valore futuro usando valori esistenti. Il valore futuro è un valore y per un valore x specificato. I valori esistenti sono valori x e y noti e il valore futuro viene previsto usando la regressione lineare. È possibile usare queste funzioni per prevedere le vendite future, i requisiti di inventario o le tendenze dei consumatori.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/forecast-and-forecast-linear-functions"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "sì Coordinata di cui si desidera prevedere un valore."
			},
			knownYs: {
				name: "known_y's",
				detail: "sì Matrice o intervallo di dati dipendente."
			},
			knownXs: {
				name: "known_x's",
				detail: "sì Matrice o intervallo di dati indipendente."
			}
		}
	},
	FORECAST_ETS: {
		description: "Prevede un valore futuro in base ai valori esistenti usando una versione AAA dell'algoritmo di livellamento esponenziale ETS.",
		abstract: "Prevede un valore futuro in base ai valori esistenti usando una versione AAA dell'algoritmo di livellamento esponenziale ETS.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/forecast-ets-function"
		}],
		functionParameter: {
			targetDate: {
				name: "Data obiettivo",
				detail: "Il punto dati per il quale prevedere un valore."
			},
			values: {
				name: "Valori",
				detail: "I valori cronologici usati per la previsione."
			},
			timeline: {
				name: "Sequenza temporale",
				detail: "Un intervallo o una matrice indipendente di date o ore numeriche con passo costante."
			},
			seasonality: {
				name: "Stagionalità",
				detail: "Facoltativo. Lunghezza stagionale; 1 per il rilevamento automatico e 0 senza stagionalità."
			},
			dataCompletion: {
				name: "Completamento dati",
				detail: "Facoltativo. Usare 1 per interpolare i punti mancanti o 0 per considerarli zero."
			},
			aggregation: {
				name: "Aggregazione",
				detail: "Facoltativo. Un valore da 1 a 7 specifica come aggregare timestamp duplicati."
			}
		}
	},
	FORECAST_ETS_CONFINT: {
		description: "Restituisce l'intervallo di confidenza per un valore futuro previsto usando una versione AAA dell'algoritmo ETS.",
		abstract: "Restituisce l'intervallo di confidenza per un valore futuro previsto usando una versione AAA dell'algoritmo ETS.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/forecast-ets-confint-function"
		}],
		functionParameter: {
			targetDate: {
				name: "Data obiettivo",
				detail: "Il punto dati per il quale prevedere un valore."
			},
			values: {
				name: "Valori",
				detail: "I valori cronologici usati per la previsione."
			},
			timeline: {
				name: "Sequenza temporale",
				detail: "Un intervallo o una matrice indipendente di date o ore numeriche con passo costante."
			},
			confidenceLevel: {
				name: "Livello di confidenza",
				detail: "Facoltativo. Un numero tra 0 e 1; il valore predefinito è 0,95."
			},
			seasonality: {
				name: "Stagionalità",
				detail: "Facoltativo. Lunghezza stagionale; 1 per il rilevamento automatico e 0 senza stagionalità."
			},
			dataCompletion: {
				name: "Completamento dati",
				detail: "Facoltativo. Usare 1 per interpolare i punti mancanti o 0 per considerarli zero."
			},
			aggregation: {
				name: "Aggregazione",
				detail: "Facoltativo. Un valore da 1 a 7 specifica come aggregare timestamp duplicati."
			}
		}
	},
	FORECAST_ETS_SEASONALITY: {
		description: "Restituisce la durata del modello stagionale rilevato dall'algoritmo ETS.",
		abstract: "Restituisce la durata del modello stagionale rilevato dall'algoritmo ETS.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/forecast-ets-seasonality-function"
		}],
		functionParameter: {
			values: {
				name: "Valori",
				detail: "I valori cronologici usati per la previsione."
			},
			timeline: {
				name: "Sequenza temporale",
				detail: "Un intervallo o una matrice indipendente di date o ore numeriche con passo costante."
			},
			dataCompletion: {
				name: "Completamento dati",
				detail: "Facoltativo. Usare 1 per interpolare i punti mancanti o 0 per considerarli zero."
			},
			aggregation: {
				name: "Aggregazione",
				detail: "Facoltativo. Un valore da 1 a 7 specifica come aggregare timestamp duplicati."
			}
		}
	},
	FORECAST_ETS_STAT: {
		description: "Restituisce un valore statistico risultante dalla previsione di serie temporali usando una versione AAA dell'algoritmo ETS.",
		abstract: "Restituisce un valore statistico risultante dalla previsione di serie temporali usando una versione AAA dell'algoritmo ETS.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/forecast-ets-stat-function"
		}],
		functionParameter: {
			values: {
				name: "Valori",
				detail: "I valori cronologici usati per la previsione."
			},
			timeline: {
				name: "Sequenza temporale",
				detail: "Un intervallo o una matrice indipendente di date o ore numeriche con passo costante."
			},
			statisticType: {
				name: "Tipo di statistica",
				detail: "Un valore da 1 a 8 specifica la statistica di previsione da restituire."
			},
			seasonality: {
				name: "Stagionalità",
				detail: "Facoltativo. Lunghezza stagionale; 1 per il rilevamento automatico e 0 senza stagionalità."
			},
			dataCompletion: {
				name: "Completamento dati",
				detail: "Facoltativo. Usare 1 per interpolare i punti mancanti o 0 per considerarli zero."
			},
			aggregation: {
				name: "Aggregazione",
				detail: "Facoltativo. Un valore da 1 a 7 specifica come aggregare timestamp duplicati."
			}
		}
	},
	FORECAST_LINEAR: {
		description: "Calcolare o prevedere un valore futuro usando valori esistenti. Il valore futuro è un valore y per un valore x specificato. I valori esistenti sono valori x e y noti e il valore futuro viene previsto usando la regressione lineare. È possibile usare queste funzioni per prevedere le vendite future, i requisiti di inventario o le tendenze dei consumatori.",
		abstract: "Calcolare o prevedere un valore futuro usando valori esistenti. Il valore futuro è un valore y per un valore x specificato. I valori esistenti sono valori x e y noti e il valore futuro viene previsto usando la regressione lineare. È possibile usare queste funzioni per prevedere le vendite future, i requisiti di inventario o le tendenze dei consumatori.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/forecast-and-forecast-linear-functions"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "sì Coordinata di cui si desidera prevedere un valore."
			},
			knownYs: {
				name: "known_y's",
				detail: "sì Matrice o intervallo di dati dipendente."
			},
			knownXs: {
				name: "known_x's",
				detail: "sì Matrice o intervallo di dati indipendente."
			}
		}
	},
	FREQUENCY: {
		description: "La funzione FREQUENZA calcola la frequenza con cui i valori si verificano all'interno di un intervallo di valori e quindi restituisce una matrice verticale di numeri. È ad esempio possibile usare FREQUENZA per contare il numero di test che ottengono un punteggio compreso in un dato intervallo. Dal momento che FREQUENZA restituisce una matrice, deve essere immessa come formula in forma di matrice.",
		abstract: "La funzione FREQUENZA calcola la frequenza con cui i valori si verificano all'interno di un intervallo di valori e quindi restituisce una matrice verticale di numeri. È ad esempio possibile usare FREQUENZA per contare il numero di test che ottengono un punteggio compreso in un dato intervallo. Dal momento che FREQUENZA restituisce una matrice, deve essere immessa come formula in forma di matrice.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/frequency-function"
		}],
		functionParameter: {
			dataArray: {
				name: "data_array",
				detail: "Obbligatorio. Matrice o riferimento a un insieme di valori di cui si desidera calcolare la frequenza. Se matrice_dati non contiene alcun valore, FREQUENZA restituirà una matrice di zeri."
			},
			binsArray: {
				name: "bins_array",
				detail: "Obbligatorio. Matrice o riferimento agli intervalli in cui si desidera raggruppare i valori contenuti in matrice_dati. Se matrice_classi non contiene alcun valore, FREQUENZA restituirà il numero degli elementi contenuti in matrice_dati."
			}
		}
	},
	GAMMA: {
		description: "Restituisce il valore di funzione GAMMA.",
		abstract: "Restituisce il valore di funzione GAMMA.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/gamma-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio. Restituisce un numero."
		} }
	},
	GAMMA_DIST: {
		description: "Restituisce la distribuzione gamma. È possibile utilizzare questa funzione per studiare le variabili che potrebbero avere una distribuzione asimmetrica. La distribuzione gamma viene in genere utilizzata nell'analisi delle code.",
		abstract: "Restituisce la distribuzione gamma. È possibile utilizzare questa funzione per studiare le variabili che potrebbero avere una distribuzione asimmetrica. La distribuzione gamma viene in genere utilizzata nell'analisi delle code.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/gamma-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obbligatorio. Valore in cui si desidera calcolare la distribuzione."
			},
			alpha: {
				name: "alpha",
				detail: "Obbligatorio. Parametro per la distribuzione."
			},
			beta: {
				name: "beta",
				detail: "Obbligatorio. Parametro per la distribuzione. Se beta = 1, DISTRIB.GAMMA.N restituirà la distribuzione gamma standard."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obbligatorio. Valore logico che determina la forma assunta dalla funzione. Se cumulativo è VERO, DISTRIB.GAMMA.N restituirà la funzione di distribuzione cumulativa, se è FALSO restituirà la funzione densità di probabilità."
			}
		}
	},
	GAMMA_INV: {
		description: "Restituisce l'inversa della distribuzione cumulativa gamma. Se p = DISTRIB.GAMMA.N(x;...), si avrà INV.GAMMA.N(p;...) = x. È possibile usare questa funzione per studiare una variabile la cui distribuzione potrebbe essere asimmetrica.",
		abstract: "Restituisce l'inversa della distribuzione cumulativa gamma. Se p = DISTRIB.GAMMA.N(x;...), si avrà INV.GAMMA.N(p;...) = x. È possibile usare questa funzione per studiare una variabile la cui distribuzione potrebbe essere asimmetrica.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/gamma-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obbligatorio. Probabilità associata alla distribuzione gamma."
			},
			alpha: {
				name: "alpha",
				detail: "Obbligatorio. Parametro per la distribuzione."
			},
			beta: {
				name: "beta",
				detail: "Obbligatorio. Parametro per la distribuzione. Se beta = 1, INV.GAMMA.N restituirà la distribuzione gamma standard."
			}
		}
	},
	GAMMALN: {
		description: "Restituisce il logaritmo naturale di una funzione gamma, Γ(x).",
		abstract: "Restituisce il logaritmo naturale di una funzione gamma, Γ(x).",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/gammaln-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Obbligatorio. Valore per il quale si desidera calcolare LN.GAMMA."
		} }
	},
	GAMMALN_PRECISE: {
		description: "Restituisce il logaritmo naturale di una funzione gamma, Γ(x).",
		abstract: "Restituisce il logaritmo naturale di una funzione gamma, Γ(x).",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/gammaln-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Obbligatorio. Valore per il quale si desidera calcolare LN.GAMMA.PRECISA."
		} }
	},
	GAUSS: {
		description: "Calcola la probabilità che un membro di una popolazione normale standard sia compreso tra la deviazione media e la deviazione standard z rispetto alla media.",
		abstract: "Calcola la probabilità che un membro di una popolazione normale standard sia compreso tra la deviazione media e la deviazione standard z rispetto alla media.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/gauss-function"
		}],
		functionParameter: { z: {
			name: "z",
			detail: "Obbligatorio. Restituisce un numero."
		} }
	},
	GEOMEAN: {
		description: "Restituisce la media geometrica di una matrice o di un intervallo di dati positivi. È possibile, ad esempio, utilizzare la funzione MEDIA.GEOMETRICA per calcolare il tasso di crescita media in base a un interesse composto con tassi variabili.",
		abstract: "Restituisce la media geometrica di una matrice o di un intervallo di dati positivi. È possibile, ad esempio, utilizzare la funzione MEDIA.GEOMETRICA per calcolare il tasso di crescita media in base a un interesse composto con tassi variabili.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/geomean-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Num1 è obbligatorio, i numeri successivi sono facoltativi. Da 1 a 255 argomenti di cui si desidera calcolare il valore medio. Anziché argomenti separati da punti e virgola, è inoltre possibile utilizzare una matrice o un riferimento a una matrice."
			},
			number2: {
				name: "number2",
				detail: "Num1 è obbligatorio, i numeri successivi sono facoltativi. Da 1 a 255 argomenti di cui si desidera calcolare il valore medio. Anziché argomenti separati da punti e virgola, è inoltre possibile utilizzare una matrice o un riferimento a una matrice."
			}
		}
	},
	GROWTH: {
		description: "Calcola la crescita esponenziale prevista in base ai dati esistenti. CRESCITA restituisce i valori y corrispondenti a una serie di valori x nuovi, specificati in base a valori x e y esistenti. È inoltre possibile utilizzare la funzione del foglio di lavoro CRESCITA per adattare una curva esponenziale a valori x e y esistenti.",
		abstract: "Calcola la crescita esponenziale prevista in base ai dati esistenti. CRESCITA restituisce i valori y corrispondenti a una serie di valori x nuovi, specificati in base a valori x e y esistenti. È inoltre possibile utilizzare la funzione del foglio di lavoro CRESCITA per adattare una curva esponenziale a valori x e y esistenti.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/growth-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Obbligatorio. Insieme dei valori y già noti dalla relazione y = b*m^x. Se la matrice y_nota è in una singola colonna, ogni colonna di x_nota verrà interpretata come una variabile distinta. Se la matrice y_nota è in una singola riga, ogni riga di x_nota verrà interpretata come una variabile distinta. Se uno dei numeri in known_y è 0 o negativo, CRESCITA restituirà il #NUM! ."
			},
			knownXs: {
				name: "known_x's",
				detail: "Opzionale. Insieme facoltativo di valori x che possono essere già noti dalla relazione y = b*m^x. La matrice x_nota può comprendere uno o più insiemi di variabili. Se viene utilizzata una sola variabile, y_note e x_note potranno essere intervalli di forma qualsiasi, purché con dimensioni uguali. Se vengono utilizzate più variabili, y_note dovrà essere un vettore, ovvero un intervallo con altezza di una riga o larghezza di una colonna. Se x_note è omesso, verrà considerato uguale alla matrice {1;2;3;...} che ha le stesse dimensioni di y_note."
			},
			newXs: {
				name: "new_x's",
				detail: "Opzionale. Nuovi valori x per i quali CRESCITA restituirà i valori y corrispondenti. Analogamente a x_nota, nuova_x deve includere una colonna (o una riga) per ciascuna variabile indipendente. Di conseguenza, se Y_nota è in una singola colonna, X_nota e Nuova_x dovrebbero avere lo stesso numero di colonne. Se y_nota è in una singola riga, x_nota e nuova_x dovrebbero avere lo stesso numero di righe. Se nuova_x è omesso, verrà considerato uguale a x_nota. Se entrambi x_nota e nuova_x sono omessi, verranno considerati uguali alla matrice {1;2;3;...} che ha le stesse dimensioni di y_nota."
			},
			constb: {
				name: "const",
				detail: "Opzionale. Valore logico che specifica se la costante b deve essere uguale a 1. Se cost è VERO o è omesso, b verrà calcolata secondo la normale procedura. Se cost è FALSO, b verrà impostata a 1 e i valori m verranno corretti in modo che y = m^x."
			}
		}
	},
	HARMEAN: {
		description: "Restituisce la media armonica di un set di dati. La media armonica è il reciproco della media aritmetica dei reciproci.",
		abstract: "Restituisce la media armonica di un set di dati. La media armonica è il reciproco della media aritmetica dei reciproci.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/harmean-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Num1 è obbligatorio, i numeri successivi sono facoltativi. Da 1 a 255 argomenti di cui si desidera calcolare il valore medio. Anziché argomenti separati da punti e virgola, è inoltre possibile utilizzare una matrice o un riferimento a una matrice."
			},
			number2: {
				name: "number2",
				detail: "Num1 è obbligatorio, i numeri successivi sono facoltativi. Da 1 a 255 argomenti di cui si desidera calcolare il valore medio. Anziché argomenti separati da punti e virgola, è inoltre possibile utilizzare una matrice o un riferimento a una matrice."
			}
		}
	},
	HYPGEOM_DIST: {
		description: "Restituisce la distribuzione ipergeometrica. DISTRIB.IPERGEOM.N restituisce la probabilità di un dato numero di successi campione in base alla dimensione del campione, ai successi e alla dimensione della popolazione. Usare la funzione DISTRIB.IPERGEOM.N per risolvere i problemi con una popolazione limitata, dove ciascuna osservazione può essere tanto un successo quanto un insuccesso e dove ciascun sottoinsieme di una data dimensione viene scelto con uguale probabilità.",
		abstract: "Restituisce la distribuzione ipergeometrica. DISTRIB.IPERGEOM.N restituisce la probabilità di un dato numero di successi campione in base alla dimensione del campione, ai successi e alla dimensione della popolazione. Usare la funzione DISTRIB.IPERGEOM.N per risolvere i problemi con una popolazione limitata, dove ciascuna osservazione può essere tanto un successo quanto un insuccesso e dove ciascun sottoinsieme di una data dimensione viene scelto con uguale probabilità.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/hypgeom-dist-function"
		}],
		functionParameter: {
			sampleS: {
				name: "sample_s",
				detail: "Obbligatorio. Numero di successi nel campione."
			},
			numberSample: {
				name: "number_sample",
				detail: "Obbligatorio. Dimensione del campione."
			},
			populationS: {
				name: "population_s",
				detail: "Obbligatorio. Numero di successi nella popolazione."
			},
			numberPop: {
				name: "number_pop",
				detail: "Obbligatorio. Dimensione della popolazione."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obbligatorio. Valore logico che determina la forma assunta dalla funzione. Se cumulativo è VERO, DISTRIB.IPERGEOM.N restituirà la funzione di distribuzione cumulativa, se è FALSO restituirà la funzione massa di probabilità."
			}
		}
	},
	INTERCEPT: {
		description: "Calcola il punto in cui una retta interseca l'asse y utilizzando i valori x e y esistenti. Tale punto è basato su una retta di regressione lineare ottimale tracciata attraverso i valori x_nota e y_nota. Utilizzare la funzione INTERCETTA per determinare il valore della variabile dipendente nel caso in cui la variabile indipendente sia uguale a 0 (zero). Ad esempio, è possibile utilizzare la funzione INTERCETTA per stimare la resistenza elettrica di un metallo alla temperatura di 0° C nel caso in cui i dati disponibili siano stati rilevati a temperature ambiente e a temperature superiori.",
		abstract: "Calcola il punto in cui una retta interseca l'asse y utilizzando i valori x e y esistenti. Tale punto è basato su una retta di regressione lineare ottimale tracciata attraverso i valori x_nota e y_nota. Utilizzare la funzione INTERCETTA per determinare il valore della variabile dipendente nel caso in cui la variabile indipendente sia uguale a 0 (zero). Ad esempio, è possibile utilizzare la funzione INTERCETTA per stimare la resistenza elettrica di un metallo alla temperatura di 0° C nel caso in cui i dati disponibili siano stati rilevati a temperature ambiente e a temperature superiori.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/intercept-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Obbligatorio. Insieme dipendente di osservazioni o di dati."
			},
			knownXs: {
				name: "known_x's",
				detail: "Obbligatorio. Insieme indipendente di osservazioni o dati."
			}
		}
	},
	KURT: {
		description: "Restituisce la curtosi di un set di dati.",
		abstract: "Restituisce la curtosi di un set di dati.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/kurt-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Primo numero, riferimento di cella o intervallo di cui si desidera calcolare la curtosi."
			},
			number2: {
				name: "number2",
				detail: "Numeri, riferimenti di cella o intervalli aggiuntivi di cui si desidera calcolare la curtosi, fino a un massimo di 255."
			}
		}
	},
	LARGE: {
		description: "Restituisce il k-esimo valore più grande in un set di dati. È possibile usare questa funzione per selezionare un valore in base alla sua condizione relativa. Ad esempio, è possibile usare GRANDE per restituire il punteggio più alto, secondo o terzo posto.",
		abstract: "Restituisce il k-esimo valore più grande in un set di dati. È possibile usare questa funzione per selezionare un valore in base alla sua condizione relativa. Ad esempio, è possibile usare GRANDE per restituire il punteggio più alto, secondo o terzo posto.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/large-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Obbligatorio. Matrice o intervallo di dati di cui si desidera determinare il k-esimo valore più grande."
			},
			k: {
				name: "k",
				detail: "Obbligatorio. Posizione, partendo dal valore più grande, nella matrice o nell'intervallo di celle dei dati da restituire."
			}
		}
	},
	LINEST: {
		description: "La funzione REGR.LIN calcola le statistiche per una linea utilizzando il metodo dei minimi quadrati per calcolare la retta che meglio rappresenta i dati e restituisce una matrice che descrive la retta. È inoltre possibile combinare REGR.LIN con altre funzioni per calcolare le statistiche per altri tipi di modelli con parametri sconosciuti lineari, come le serie polinomiali, logaritmiche, esponenziali e di potenze. Dal momento che questa funzione restituisce una matrice di valori, deve essere immessa come formula in forma di matrice. Le istruzioni sono riportate dopo gli esempi di questo articolo.",
		abstract: "La funzione REGR.LIN calcola le statistiche per una linea utilizzando il metodo dei minimi quadrati per calcolare la retta che meglio rappresenta i dati e restituisce una matrice che descrive la retta. È inoltre possibile combinare REGR.LIN con altre funzioni per calcolare le statistiche per altri tipi di modelli con parametri sconosciuti lineari, come le serie polinomiali, logaritmiche, esponenziali e di potenze. Dal momento che questa funzione restituisce una matrice di valori, deve essere immessa come formula in forma di matrice. Le istruzioni sono riportate dopo gli esempi di questo articolo.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/linest-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Obbligatorio. Insieme dei valori y già noti nella relazione y = mx + b. Se l'intervallo di known_y si trova in una singola colonna, ogni colonna di known_x viene interpretata come una variabile distinta. Se l'intervallo di known_y è contenuto in una singola riga, ogni riga di known_x viene interpretata come una variabile distinta."
			},
			knownXs: {
				name: "known_x's",
				detail: "Opzionale. Insieme dei valori x che possono essere già noti nella relazione y = mx + b. L'intervallo di known_x può includere uno o più set di variabili. Se viene usata una sola variabile, known_y e known_x possono essere intervalli di qualsiasi forma, purché abbiano dimensioni uguali. Se vengono utilizzate più variabili, known_y deve essere un vettore, ovvero un intervallo con altezza di una riga o larghezza di una colonna. Se known_x's viene omesso, verrà considerato uguale alla matrice {1,2,3,...} che ha le stesse dimensioni di known_y ."
			},
			constb: {
				name: "const",
				detail: "Opzionale. Valore logico che specifica se la costante b deve essere uguale a 0. Se cost è VERO o è omesso, b verrà calcolata normalmente. Se cost è FALSO, b verrà impostata su 0 e i valori m verranno adattati a y = mx."
			},
			stats: {
				name: "stats",
				detail: "Opzionale. Valore logico che specifica se restituire statistiche aggiuntive di regressione. Se stat è VERO, REGR.LIN restituirà le statistiche aggiuntive di regressione; di conseguenza, la matrice restituita è {mn,mn-1,...,m1,b; sen,sen-1,...,se1,seb; r 2 , sey; F;gdl; ssreg,ssresid} . Se stat è FALSO o è omesso, REGR.LIN restituirà solo i coefficienti m e la costante b. Le statistiche aggiuntive di regressione sono le seguenti:"
			}
		}
	},
	LOGEST: {
		description: "L'equazione della curva è:",
		abstract: "L'equazione della curva è:",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/logest-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Obbligatorio. Insieme dei valori y già noti dalla relazione y = b*m^x. Se la matrice y_nota è in una singola colonna, ogni colonna di x_nota verrà interpretata come una variabile distinta. Se la matrice y_note è in una singola riga, ogni riga di x_note verrà interpretata come una variabile distinta."
			},
			knownXs: {
				name: "known_x's",
				detail: "Opzionale. Insieme facoltativo di valori x che possono essere già noti dalla relazione y = b*m^x. La matrice x_nota può comprendere uno o più insiemi di variabili. Se viene utilizzata una sola variabile, y_nota e x_nota potranno essere intervalli di forma qualsiasi, purché con dimensioni uguali. Se vengono utilizzate più variabili, y_nota dovrà essere un intervallo di celle con altezza di una riga o larghezza di una colonna, denominato anche vettore. Se x_nota è omesso, verrà considerato uguale alla matrice {1;2;3;...} che ha le stesse dimensioni di y_nota."
			},
			constb: {
				name: "const",
				detail: "Opzionale. Valore logico che specifica se la costante b deve essere uguale a 1. Se cost è VERO o è omesso, b verrà calcolata secondo la normale procedura. Se cost è FALSO, b verrà impostata a 1 e i valori m verranno corretti in modo che y = m^x."
			},
			stats: {
				name: "stats",
				detail: "Opzionale. Valore logico che specifica se restituire statistiche aggiuntive di regressione. Se stat è VERO, REGR.LOG restituirà le statistiche aggiuntive di regressione. Di conseguenza, la matrice restituita sarà {mn;mn-1;...;m1;b\\sn;sn-1;...;s1;sb\\r 2;sy\\ F;gdl\\sqreg;sqres}. Se stat è FALSO o è omesso, REGR.LOG restituirà solo i coefficienti m e la costante b."
			}
		}
	},
	LOGNORM_DIST: {
		description: "Utilizzare questa funzione per analizzare i dati che sono stati trasformati in logaritmi.",
		abstract: "Utilizzare questa funzione per analizzare i dati che sono stati trasformati in logaritmi.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/lognorm-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obbligatorio. Valore in cui calcolare la funzione."
			},
			mean: {
				name: "mean",
				detail: "Obbligatorio. Media di ln(x)."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Obbligatorio. Deviazione standard di ln(x)."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obbligatorio. Valore logico che determina la forma assunta dalla funzione. Se cumulativo è VERO, DISTRIB.LOGNORM.N restituirà la funzione di distribuzione cumulativa, se è FALSO restituirà la funzione densità di probabilità."
			}
		}
	},
	LOGNORM_INV: {
		description: "Restituisce l'inversa della distribuzione lognormale cumulativa.",
		abstract: "Restituisce l'inversa della distribuzione lognormale cumulativa.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/lognorm-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Probabilità corrispondente alla distribuzione lognormale."
			},
			mean: {
				name: "mean",
				detail: "Media aritmetica della distribuzione."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Deviazione standard della distribuzione."
			}
		}
	},
	MARGINOFERROR: {
		description: "Questa funzione calcola il margine di errore da un intervallo di valori e da un livello di confidenza.",
		abstract: "Questa funzione calcola il margine di errore da un intervallo di valori e da un livello di confidenza.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/12487850?hl=it"
		}],
		functionParameter: {
			range: {
				name: "range",
				detail: "Intervallo di valori usato per calcolare il margine di errore."
			},
			confidence: {
				name: "confidence",
				detail: "Livello di confidenza desiderato compreso tra 0 e 1."
			}
		}
	},
	MAX: {
		description: "Restituisce il valore maggiore di un insieme di valori.",
		abstract: "Restituisce il valore maggiore di un insieme di valori.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/max-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Num1 è obbligatorio, i numeri successivi sono facoltativi. Da 1 a 255 numeri tra cui si desidera individuare il valore massimo."
			},
			number2: {
				name: "number2",
				detail: "Num1 è obbligatorio, i numeri successivi sono facoltativi. Da 1 a 255 numeri tra cui si desidera individuare il valore massimo."
			}
		}
	},
	MAXA: {
		description: "Restituisce il valore più grande di un elenco di argomenti.",
		abstract: "Restituisce il valore più grande di un elenco di argomenti.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/maxa-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Obbligatorio. Il primo argomento numerico di quelli tra cui si desidera individuare il più grande."
			},
			value2: {
				name: "value2",
				detail: "Opzionale. Argomenti numerici da 2 a 255 tra cui si desidera individuare il più grande."
			}
		}
	},
	MAXIFS: {
		description: "La funzione MAX.PIÙ.SE restituisce il valore massimo tra le celle specificate da un dato set di condizioni o criteri.",
		abstract: "La funzione MAX.PIÙ.SE restituisce il valore massimo tra le celle specificate da un dato set di condizioni o criteri.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/maxifs-function"
		}],
		functionParameter: {
			maxRange: {
				name: "sum_range",
				detail: "L'intervallo effettivo di celle in cui verrà determinato il valore massimo."
			},
			criteriaRange1: {
				name: "criteria_range1",
				detail: "Il set di celle da valutare con i criteri."
			},
			criteria1: {
				name: "criteria1",
				detail: "I criteri sotto forma di numero, espressione o testo che definiscono quali celle valutare come massimo. Lo stesso set di criteri è supportato per le funzioni MIN.PIÙ.SE , SOMMA.PIÙ.SE e MEDIA.PIÙ.SE ."
			},
			criteriaRange2: {
				name: "criteriaRange2",
				detail: "Altri intervalli e criteri associati. È possibile immettere fino a 126 coppie di intervalli/criteri."
			},
			criteria2: {
				name: "criteria2",
				detail: "Altri intervalli e criteri associati. È possibile immettere fino a 126 coppie di intervalli/criteri."
			}
		}
	},
	MEDIAN: {
		description: "Restituisce la mediana dei numeri specificati. La mediana è il numero che occupa la posizione centrale di un insieme di numeri.",
		abstract: "Restituisce la mediana dei numeri specificati. La mediana è il numero che occupa la posizione centrale di un insieme di numeri.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/median-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Num1 è obbligatorio, i numeri successivi sono facoltativi. Da 1 a 255 numeri per cui si desidera calcolare il valore mediano."
			},
			number2: {
				name: "number2",
				detail: "Num1 è obbligatorio, i numeri successivi sono facoltativi. Da 1 a 255 numeri per cui si desidera calcolare il valore mediano."
			}
		}
	},
	MIN: {
		description: "Restituisce il numero più piccolo di un insieme di valori.",
		abstract: "Restituisce il numero più piccolo di un insieme di valori.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/min-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Num1 è facoltativo, i numeri successivi sono facoltativi. Da 1 a 255 numeri tra cui si desidera individuare il valore minimo."
			},
			number2: {
				name: "number2",
				detail: "Num1 è facoltativo, i numeri successivi sono facoltativi. Da 1 a 255 numeri tra cui si desidera individuare il valore minimo."
			}
		}
	},
	MINA: {
		description: "Restituisce il valore più piccolo di un elenco di argomenti.",
		abstract: "Restituisce il valore più piccolo di un elenco di argomenti.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/mina-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Val1 è obbligatorio, i valori successivi sono facoltativi. Da 1 a 255 valori tra cui si desidera individuare il più piccolo."
			},
			value2: {
				name: "value2",
				detail: "Val1 è obbligatorio, i valori successivi sono facoltativi. Da 1 a 255 valori tra cui si desidera individuare il più piccolo."
			}
		}
	},
	MINIFS: {
		description: "La funzione MIN.PIÙ.SE restituisce il valore minimo tra le celle specificate da un dato set di condizioni o criteri.",
		abstract: "La funzione MIN.PIÙ.SE restituisce il valore minimo tra le celle specificate da un dato set di condizioni o criteri.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/minifs-function"
		}],
		functionParameter: {
			minRange: {
				name: "min_range",
				detail: "L'intervallo effettivo di celle in cui verrà determinato il valore minimo."
			},
			criteriaRange1: {
				name: "criteria_range1",
				detail: "Il set di celle da valutare con i criteri."
			},
			criteria1: {
				name: "criteria1",
				detail: "I criteri sotto forma di numero, espressione o testo che definiscono quali celle valutare come minimo. Lo stesso set di criteri è supportato per le funzioni MAX.PIÙ.SE , SOMMA.PIÙ.SE e MEDIA.PIÙ.SE ."
			},
			criteriaRange2: {
				name: "criteria_range2",
				detail: "Altri intervalli e criteri associati. È possibile immettere fino a 126 coppie di intervalli/criteri."
			},
			criteria2: {
				name: "criteria2",
				detail: "Altri intervalli e criteri associati. È possibile immettere fino a 126 coppie di intervalli/criteri."
			}
		}
	},
	MODE_MULT: {
		description: "Se sono presenti più mode, verranno restituiti più risultati. Dal momento che questa funzione restituisce una matrice di valori, deve essere immessa come una formula della matrice.",
		abstract: "Se sono presenti più mode, verranno restituiti più risultati. Dal momento che questa funzione restituisce una matrice di valori, deve essere immessa come una formula della matrice.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/mode-mult-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obbligatorio. Primo argomento numerico di cui si desidera calcolare la moda."
			},
			number2: {
				name: "number2",
				detail: "Opzionale. Argomenti numerici da 2 a 254 di cui si desidera calcolare la moda. È inoltre possibile utilizzare un'unica matrice o un riferimento a una matrice anziché argomenti separati da punti e virgola."
			}
		}
	},
	MODE_SNGL: {
		description: "Restituisce il valore più ricorrente o ripetitivo di una matrice o di un intervallo di dati.",
		abstract: "Restituisce il valore più ricorrente o ripetitivo di una matrice o di un intervallo di dati.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/mode-sngl-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obbligatorio. Primo argomento di cui si desidera calcolare la moda."
			},
			number2: {
				name: "number2",
				detail: "Opzionale. Argomenti da 2 a 254 di cui si desidera calcolare la moda. È inoltre possibile utilizzare un'unica matrice o un riferimento a una matrice anziché argomenti separati da punti e virgola."
			}
		}
	},
	NEGBINOM_DIST: {
		description: "Restituisce la distribuzione binomiale negativa, la probabilità che un numero di insuccessi pari a Num_insuccessi si verifichi prima del successo Num_successi, data la probabilità di successo Probabilità_s.",
		abstract: "Restituisce la distribuzione binomiale negativa, la probabilità che un numero di insuccessi pari a Num_insuccessi si verifichi prima del successo Num_successi, data la probabilità di successo Probabilità_s.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/negbinom-dist-function"
		}],
		functionParameter: {
			numberF: {
				name: "number_f",
				detail: "Obbligatorio. Numero degli insuccessi."
			},
			numberS: {
				name: "number_s",
				detail: "Obbligatorio. Numero di soglia per i successi."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Obbligatorio. Probabilità di ottenere un successo."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obbligatorio. Valore logico che determina la forma assunta dalla funzione. Se cumulativo è VERO, DISTRIB.BINOM.NEG.N restituirà la funzione di distribuzione cumulativa, se è FALSO restituirà la funzione densità di probabilità."
			}
		}
	},
	NORM_DIST: {
		description: "Restituisce la distribuzione normale per la media e la distribuzione standard specificate. Questa funzione ha una vasta gamma di applicazioni in statistica, inclusa la verifica di ipotesi.",
		abstract: "Restituisce la distribuzione normale per la media e la distribuzione standard specificate. Questa funzione ha una vasta gamma di applicazioni in statistica, inclusa la verifica di ipotesi.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/norm-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obbligatorio. Valore per il quale si vuole calcolare la distribuzione."
			},
			mean: {
				name: "mean",
				detail: "Obbligatorio. Media aritmetica della distribuzione."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Obbligatorio. Deviazione standard della distribuzione."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obbligatorio. Valore logico che determina la forma assunta dalla funzione. Se cumulativo è VERO, NORM. DISTRIB.N restituisce la funzione di distribuzione cumulativa; se è FALSO restituirà la funzione densità di probabilità."
			}
		}
	},
	NORM_INV: {
		description: "Restituisce l'inversa della distribuzione normale cumulativa per la media e la deviazione standard specificate.",
		abstract: "Restituisce l'inversa della distribuzione normale cumulativa per la media e la deviazione standard specificate.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/norm-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obbligatorio. Probabilità corrispondente alla distribuzione normale."
			},
			mean: {
				name: "mean",
				detail: "Obbligatorio. Media aritmetica della distribuzione."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Obbligatorio. Deviazione standard della distribuzione."
			}
		}
	},
	NORM_S_DIST: {
		description: "La funzione NORM. La funzione DISTRIB.S.N di Excel restituisce la distribuzione normale standard , ovvero ha una media uguale a zero e una deviazione standard di uno . È possibile usare questa funzione al posto di una tabella delle aree della curva normale standard.",
		abstract: "La funzione NORM. La funzione DISTRIB.S.N di Excel restituisce la distribuzione normale standard , ovvero ha una media uguale a zero e una deviazione standard di uno . È possibile usare questa funzione al posto di una tabella delle aree della curva normale standard.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/norm-s-dist-function"
		}],
		functionParameter: {
			z: {
				name: "z",
				detail: "Obbligatorio. Questo è il valore per il quale si desidera la distribuzione."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obbligatorio. L'argomento cumulativo può essere VERO o FALSO . Questo valore logico determina la forma della funzione. Se cumulativo è VERO, la funzione NORM. DISTRIB.S.N restituisce la funzione di distribuzione cumulativa . Se è FALSO, restituirà la funzione massa di probabilità ."
			}
		}
	},
	NORM_S_INV: {
		description: "Restituisce l'inversa della distribuzione normale standard cumulativa. La distribuzione ha una media uguale a zero e una deviazione standard uguale a uno.",
		abstract: "Restituisce l'inversa della distribuzione normale standard cumulativa. La distribuzione ha una media uguale a zero e una deviazione standard uguale a uno.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/norm-s-inv-function"
		}],
		functionParameter: { probability: {
			name: "probability",
			detail: "Obbligatorio. Probabilità corrispondente alla distribuzione normale."
		} }
	},
	PEARSON: {
		description: "Restituisce il coefficiente di correlazione del momento prodotto di Pearson, r, un indice adimensionale compreso tra -1 e 1 inclusi che riflette l'estensione di una relazione lineare tra due set di dati.",
		abstract: "Restituisce il coefficiente di correlazione del momento prodotto di Pearson, r, un indice adimensionale compreso tra -1 e 1 inclusi che riflette l'estensione di una relazione lineare tra due set di dati.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/pearson-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Obbligatorio. Insieme di valori indipendenti."
			},
			array2: {
				name: "array2",
				detail: "Obbligatorio. Insieme di valori dipendenti."
			}
		}
	},
	PERCENTILE_EXC: {
		description: "The PERCENTILE. La funzione ESC restituisce il k-esimo dato percentile dei valori in un intervallo, dove k si trova nell'intervallo 0..1, valore esclusivo.",
		abstract: "The PERCENTILE. La funzione ESC restituisce il k-esimo dato percentile dei valori in un intervallo, dove k si trova nell'intervallo 0..1, valore esclusivo.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/percentile-exc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Obbligatorio. Matrice o intervallo di dati che definisce la condizione relativa."
			},
			k: {
				name: "k",
				detail: "Obbligatorio. Valore percentile nell'intervallo 0 < k < 1."
			}
		}
	},
	PERCENTILE_INC: {
		description: "Restituisce il k-esimo dato percentile dei valori in un intervallo, dove k è compreso nell'intervallo da 0 a 1, inclusi.",
		abstract: "Restituisce il k-esimo dato percentile dei valori in un intervallo, dove k è compreso nell'intervallo da 0 a 1, inclusi.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/percentile-inc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Obbligatorio. Matrice o intervallo di dati che definisce la condizione relativa."
			},
			k: {
				name: "k",
				detail: "Obbligatorio. Valore percentile nell'intervallo compreso tra 0 e 1 inclusi."
			}
		}
	},
	PERCENTRANK_EXC: {
		description: "Restituisce il rango di un valore in un set di dati come percentuale (0..1, estremi esclusi) del set di dati.",
		abstract: "Restituisce il rango di un valore in un set di dati come percentuale (0..1, estremi esclusi) del set di dati.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/percentrank-exc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Obbligatorio. Matrice o intervallo di dati con valori numerici che definisce la condizione relativa."
			},
			x: {
				name: "x",
				detail: "Obbligatorio. Valore del quale si desidera conoscere il rango."
			},
			significance: {
				name: "significance",
				detail: "Opzionale. Valore che identifica il numero di cifre significative per la percentuale restituita. Se questo argomento viene omesso, ESC.PERCENT.RANGO utilizzerà tre cifre (0,xxx)."
			}
		}
	},
	PERCENTRANK_INC: {
		description: "Questa funzione può essere utilizzata per calcolare la condizione relativa di un valore in un set di dati. È ad esempio possibile utilizzare INC.PERCENT.RANGO per calcolare la condizione di un punteggio di un test attitudinale rispetto a tutti gli altri punteggi dello stesso test.",
		abstract: "Questa funzione può essere utilizzata per calcolare la condizione relativa di un valore in un set di dati. È ad esempio possibile utilizzare INC.PERCENT.RANGO per calcolare la condizione di un punteggio di un test attitudinale rispetto a tutti gli altri punteggi dello stesso test.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/percentrank-inc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Obbligatorio. Matrice o intervallo di dati con valori numerici che definisce la condizione relativa."
			},
			x: {
				name: "x",
				detail: "Obbligatorio. Valore del quale si desidera conoscere il rango."
			},
			significance: {
				name: "significance",
				detail: "Opzionale. Valore che identifica il numero di cifre significative per la percentuale restituita. Se questo argomento viene omesso, INC.PERCENT.RANGO utilizzerà tre cifre (0,xxx)."
			}
		}
	},
	PERMUT: {
		description: "Restituisce il numero delle permutazioni per un numero assegnato di oggetti che è possibile selezionare da oggetti numerici. Una permutazione è un qualsiasi insieme o sottoinsieme di oggetti o eventi il cui ordine interno sia significativo. Le permutazioni sono diverse dalle combinazioni il cui ordine interno non è significativo. Utilizzare questa funzione per i calcoli delle probabilità, tipo quelli che si eseguono per le lotterie.",
		abstract: "Restituisce il numero delle permutazioni per un numero assegnato di oggetti che è possibile selezionare da oggetti numerici. Una permutazione è un qualsiasi insieme o sottoinsieme di oggetti o eventi il cui ordine interno sia significativo. Le permutazioni sono diverse dalle combinazioni il cui ordine interno non è significativo. Utilizzare questa funzione per i calcoli delle probabilità, tipo quelli che si eseguono per le lotterie.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/permut-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. Intero che descrive il numero di oggetti."
			},
			numberChosen: {
				name: "number_chosen",
				detail: "Obbligatorio. Intero che descrive il numero di oggetti per ogni permutazione."
			}
		}
	},
	PERMUTATIONA: {
		description: "Restituisce il numero delle permutazioni per un dato numero di oggetti (con ripetizioni) che possono essere selezionati dagli oggetti totali.",
		abstract: "Restituisce il numero delle permutazioni per un dato numero di oggetti (con ripetizioni) che possono essere selezionati dagli oggetti totali.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/permutationa-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. Intero che descrive il numero totale di oggetti."
			},
			numberChosen: {
				name: "number_chosen",
				detail: "Obbligatorio. Intero che descrive il numero di oggetti in ogni permutazione."
			}
		}
	},
	PHI: {
		description: "Restituisce il valore della funzione densità per una distribuzione normale standard.",
		abstract: "Restituisce il valore della funzione densità per una distribuzione normale standard.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/phi-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Obbligatorio. X è il numero per cui si vuole la densità della distribuzione normale standard."
		} }
	},
	POISSON_DIST: {
		description: "Restituisce la distribuzione di probabilità di Poisson. La distribuzione di Poisson viene in genere applicata per la previsione del numero di eventi in un arco di tempo specifico, come il numero di automobili che transitano per un casello autostradale in 1 minuto.",
		abstract: "Restituisce la distribuzione di probabilità di Poisson. La distribuzione di Poisson viene in genere applicata per la previsione del numero di eventi in un arco di tempo specifico, come il numero di automobili che transitano per un casello autostradale in 1 minuto.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/poisson-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obbligatorio. Numero degli eventi."
			},
			mean: {
				name: "mean",
				detail: "Obbligatorio. Valore numerico previsto."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obbligatorio. Valore logico che determina la forma della distribuzione di probabilità restituita. Se cumulativo è VERO, POISSON. DISTRIB.N restituisce la probabilità cumulativa di Poisson che il numero di eventi casuali sia compreso tra zero e x inclusi; se è FALSO, restituirà la funzione massa di probabilità di Poisson che il numero di eventi che si verificano sarà esattamente x."
			}
		}
	},
	PROB: {
		description: "Restituisce la probabilità che dei valori in un intervallo siano compresi tra due limiti. Se limite_sup è omesso, la funzione restituirà la probabilità che i valori in int_x siano uguali a limite_inf.",
		abstract: "Restituisce la probabilità che dei valori in un intervallo siano compresi tra due limiti. Se limite_sup è omesso, la funzione restituirà la probabilità che i valori in int_x siano uguali a limite_inf.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/prob-function"
		}],
		functionParameter: {
			xRange: {
				name: "x_range",
				detail: "Obbligatorio. Intervallo dei valori numerici per x a cui sono associate delle probabilità."
			},
			probRange: {
				name: "prob_range",
				detail: "Obbligatorio. Insieme delle probabilità associate ai valori di int_x."
			},
			lowerLimit: {
				name: "lower_limit",
				detail: "Opzionale. Limite inferiore del valore per il quale si desidera calcolare la probabilità."
			},
			upperLimit: {
				name: "upper_limit",
				detail: "Opzionale. Limite superiore del valore per il quale si desidera calcolare la probabilità."
			}
		}
	},
	QUARTILE_EXC: {
		description: "Restituisce il quartile del set di dati, in base ai valori percentili compresi tra 0 e 1, esclusi.",
		abstract: "Restituisce il quartile del set di dati, in base ai valori percentili compresi tra 0 e 1, esclusi.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/quartile-exc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Obbligatorio. Matrice o intervallo di celle di valori numerici per cui si desidera calcolare il valore quartile."
			},
			quart: {
				name: "quart",
				detail: "Obbligatorio. Indica il valore da restituire."
			}
		}
	},
	QUARTILE_INC: {
		description: "I quartili vengono spesso utilizzati nelle indagini di mercato e nei dati statistici per suddividere le popolazioni in gruppi. Ad esempio, è possibile utilizzare INC.QUARTILE per trovare il 25% dei redditi più elevati in una popolazione.",
		abstract: "I quartili vengono spesso utilizzati nelle indagini di mercato e nei dati statistici per suddividere le popolazioni in gruppi. Ad esempio, è possibile utilizzare INC.QUARTILE per trovare il 25% dei redditi più elevati in una popolazione.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/quartile-inc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Obbligatorio. Matrice o intervallo di celle di valori numerici per cui si desidera calcolare il valore quartile."
			},
			quart: {
				name: "quart",
				detail: "Obbligatorio. Valore da restituire."
			}
		}
	},
	RANK_AVG: {
		description: "Restituisce il rango di un numero in un elenco di numeri, ovvero la sua dimensione rispetto agli altri valori dell'elenco. Se più valori hanno lo stesso rango, viene restituito il rango medio.",
		abstract: "Restituisce il rango di un numero in un elenco di numeri, ovvero la sua dimensione rispetto agli altri valori dell'elenco. Se più valori hanno lo stesso rango, viene restituito il rango medio.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/rank-avg-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. Numero di cui si desidera trovare il rango."
			},
			ref: {
				name: "ref",
				detail: "Obbligatorio. Matrice di numeri o riferimento a un elenco di numeri. I valori in Rif che non sono di tipo numerico vengono ignorati."
			},
			order: {
				name: "order",
				detail: "Opzionale. Numero che specifica come classificare num."
			}
		}
	},
	RANK_EQ: {
		description: "Restituisce il rango di un numero in un elenco di numeri.",
		abstract: "Restituisce il rango di un numero in un elenco di numeri.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/rank-eq-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Numero di cui si desidera trovare il rango."
			},
			ref: {
				name: "ref",
				detail: "Riferimento a un elenco di numeri. I valori non numerici in ref vengono ignorati."
			},
			order: {
				name: "order",
				detail: "Numero che specifica come classificare number. Se è 0 o omesso, viene usato un ordine decrescente; qualsiasi valore diverso da zero usa l'ordine crescente."
			}
		}
	},
	RSQ: {
		description: "Restituisce il quadrato del coefficiente di correlazione del momento prodotto di Pearson.",
		abstract: "Restituisce il quadrato del coefficiente di correlazione del momento prodotto di Pearson.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/rsq-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Matrice o intervallo di dati dipendente."
			},
			knownXs: {
				name: "known_x's",
				detail: "Matrice o intervallo di dati indipendente."
			}
		}
	},
	SKEW: {
		description: "Restituisce l'asimmetria di una distribuzione.",
		abstract: "Restituisce l'asimmetria di una distribuzione.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/skew-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Primo numero, riferimento di cella o intervallo di cui si desidera calcolare l'asimmetria."
			},
			number2: {
				name: "number2",
				detail: "Numeri, riferimenti di cella o intervalli aggiuntivi di cui si desidera calcolare l'asimmetria, fino a un massimo di 255."
			}
		}
	},
	SKEW_P: {
		description: "Restituisce l'asimmetria di una distribuzione in base a un'intera popolazione.",
		abstract: "Restituisce l'asimmetria di una distribuzione in base a un'intera popolazione.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/skew-p-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Primo numero, riferimento di cella o intervallo di cui si desidera calcolare l'asimmetria."
			},
			number2: {
				name: "number2",
				detail: "Numeri, riferimenti di cella o intervalli aggiuntivi di cui si desidera calcolare l'asimmetria, fino a un massimo di 255."
			}
		}
	},
	SLOPE: {
		description: "Restituisce la pendenza della retta di regressione lineare.",
		abstract: "Restituisce la pendenza della retta di regressione lineare.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/slope-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Matrice o intervallo di dati dipendente."
			},
			knownXs: {
				name: "known_x's",
				detail: "Matrice o intervallo di dati indipendente."
			}
		}
	},
	SMALL: {
		description: "Restituisce il k-esimo valore più piccolo di un set di dati. Utilizzare questa funzione per restituire i valori con una particolare condizione relativa in un set di dati.",
		abstract: "Restituisce il k-esimo valore più piccolo di un set di dati. Utilizzare questa funzione per restituire i valori con una particolare condizione relativa in un set di dati.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/small-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Obbligatorio. Matrice o intervallo di dati numerici di cui si desidera determinare il k-esimo valore più piccolo."
			},
			k: {
				name: "k",
				detail: "Obbligatorio. Posizione del valore da restituire, partendo dal più piccolo, nella matrice o nell'intervallo."
			}
		}
	},
	STANDARDIZE: {
		description: "Restituisce un valore normalizzato da una distribuzione caratterizzata da media e dev_standard.",
		abstract: "Restituisce un valore normalizzato da una distribuzione caratterizzata da media e dev_standard.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/standardize-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obbligatorio. Valore che si desidera normalizzare."
			},
			mean: {
				name: "mean",
				detail: "Obbligatorio. Media aritmetica della distribuzione."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Obbligatorio. Deviazione standard della distribuzione."
			}
		}
	},
	STDEV_P: {
		description: "La deviazione standard è una misura che indica quanto i valori si discostino dal valore medio (la media).",
		abstract: "La deviazione standard è una misura che indica quanto i valori si discostino dal valore medio (la media).",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/stdev-p-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obbligatorio. Primo argomento numerico corrispondente a una popolazione."
			},
			number2: {
				name: "number2",
				detail: "Opzionale. Da 2 a 254 argomenti numerici corrispondenti a una popolazione. Anziché argomenti separati da punti e virgola, è inoltre possibile utilizzare una singola matrice o un riferimento a una matrice."
			}
		}
	},
	STDEV_S: {
		description: "La deviazione standard è una misura che indica quanto si discostano i valori dal valore medio, ovvero la media.",
		abstract: "La deviazione standard è una misura che indica quanto si discostano i valori dal valore medio, ovvero la media.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/stdev-s-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obbligatorio. Primo argomento numerico corrispondente a un campione di popolazione. Anziché argomenti separati da punti e virgola, è inoltre possibile utilizzare una singola matrice o un riferimento a una matrice."
			},
			number2: {
				name: "number2",
				detail: "Opzionale. Da 2 a 254 argomenti numerici corrispondenti a un campione di popolazione. Anziché argomenti separati da punti e virgola, è inoltre possibile utilizzare una singola matrice o un riferimento a una matrice."
			}
		}
	},
	STDEVA: {
		description: "Stima la deviazione standard in base a un campione, includendo numeri, testo e valori logici.",
		abstract: "Stima la deviazione standard in base a un campione, includendo numeri, testo e valori logici.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/stdeva-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Primo argomento valore corrispondente a un campione di popolazione. In alternativa agli argomenti separati da virgole, è possibile usare una singola matrice o un riferimento a una matrice."
			},
			value2: {
				name: "value2",
				detail: "Argomenti valore da 2 a 254 corrispondenti a un campione di popolazione. In alternativa, è possibile usare una singola matrice o un riferimento a una matrice."
			}
		}
	},
	STDEVPA: {
		description: "Restituisce la deviazione standard sulla base dell'intera popolazione specificata sotto forma di argomenti, compresi il testo e i valori logici. La deviazione standard è una misura che indica quanto i valori si discostano dal valore medio, ovvero dalla media.",
		abstract: "Restituisce la deviazione standard sulla base dell'intera popolazione specificata sotto forma di argomenti, compresi il testo e i valori logici. La deviazione standard è una misura che indica quanto i valori si discostano dal valore medio, ovvero dalla media.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/stdevpa-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Val1 è obbligatorio, i valori successivi sono facoltativi. Da 1 a 255 valori corrispondenti a una popolazione. Anziché argomenti separati dal punti e virgola, è inoltre possibile utilizzare una singola matrice o un riferimento a una matrice."
			},
			value2: {
				name: "value2",
				detail: "Val1 è obbligatorio, i valori successivi sono facoltativi. Da 1 a 255 valori corrispondenti a una popolazione. Anziché argomenti separati dal punti e virgola, è inoltre possibile utilizzare una singola matrice o un riferimento a una matrice."
			}
		}
	},
	STEYX: {
		description: "Restituisce l'errore standard del valore y previsto per ogni valore x nella regressione.",
		abstract: "Restituisce l'errore standard del valore y previsto per ogni valore x nella regressione.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/steyx-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Matrice o intervallo di dati dipendente."
			},
			knownXs: {
				name: "known_x's",
				detail: "Matrice o intervallo di dati indipendente."
			}
		}
	},
	T_DIST: {
		description: "Restituisce la distribuzione t a una coda sinistra di Student. La distribuzione t viene utilizzata nelle verifiche di ipotesi su piccoli set di dati presi come campione. Utilizzare questa funzione al posto di una tabella di valori critici per il calcolo della distribuzione t.",
		abstract: "Restituisce la distribuzione t a una coda sinistra di Student. La distribuzione t viene utilizzata nelle verifiche di ipotesi su piccoli set di dati presi come campione. Utilizzare questa funzione al posto di una tabella di valori critici per il calcolo della distribuzione t.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/t-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obbligatorio. Valore numerico in cui calcolare la distribuzione."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Obbligatorio. Intero che indica il numero di gradi di libertà."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obbligatorio. Valore logico che determina la forma assunta dalla funzione. Se cumulativo è VERO, DISTRIB.T.N restituirà la funzione di distribuzione cumulativa, se è FALSO restituirà la funzione densità di probabilità."
			}
		}
	},
	T_DIST_2T: {
		description: "Restituisce la probabilità per la distribuzione t di Student (a due code).",
		abstract: "Restituisce la probabilità per la distribuzione t di Student (a due code).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/t-dist-2t-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Valore numerico in corrispondenza del quale valutare la distribuzione."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Intero che indica il numero di gradi di libertà."
			}
		}
	},
	T_DIST_RT: {
		description: "Restituisce la probabilità per la distribuzione t di Student (a una coda destra).",
		abstract: "Restituisce la probabilità per la distribuzione t di Student (a una coda destra).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/t-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Valore numerico in corrispondenza del quale valutare la distribuzione."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Intero che indica il numero di gradi di libertà."
			}
		}
	},
	T_INV: {
		description: "Restituisce l'inversa della probabilità per la distribuzione t di Student.",
		abstract: "Restituisce l'inversa della probabilità per la distribuzione t di Student.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/t-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Probabilità associata alla distribuzione t di Student."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Intero che indica il numero di gradi di libertà."
			}
		}
	},
	T_INV_2T: {
		description: "Restituisce l'inversa della probabilità per la distribuzione t di Student (a due code).",
		abstract: "Restituisce l'inversa della probabilità per la distribuzione t di Student (a due code).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/t-inv-2t-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Probabilità associata alla distribuzione t di Student."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Intero che indica il numero di gradi di libertà."
			}
		}
	},
	T_TEST: {
		description: "Restituisce la probabilità associata a un test t di Student.",
		abstract: "Restituisce la probabilità associata a un test t di Student.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/t-test-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Prima matrice o intervallo di dati."
			},
			array2: {
				name: "array2",
				detail: "Seconda matrice o intervallo di dati."
			},
			tails: {
				name: "tails",
				detail: "Specifica il numero di code della distribuzione. Se è 1, TEST.T usa la distribuzione a una coda; se è 2, quella a due code."
			},
			type: {
				name: "type",
				detail: "Tipo di test t da eseguire."
			}
		}
	},
	TREND: {
		description: "La funzione TENDENZA restituisce i valori lungo una tendenza lineare. Adatta una linea retta (usando il metodo dei minimi quadrati) alle y_note e x_note della matrice. TENDENZA restituisce i valori y lungo tale riga per la matrice di Nuova_x specificata.",
		abstract: "La funzione TENDENZA restituisce i valori lungo una tendenza lineare. Adatta una linea retta (usando il metodo dei minimi quadrati) alle y_note e x_note della matrice. TENDENZA restituisce i valori y lungo tale riga per la matrice di Nuova_x specificata.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/trend-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Insieme dei valori y già noti nella relazione y = mx + b. Se la matrice y_note è in una singola colonna, ogni colonna di x_note verrà interpretata come una variabile distinta. Se la matrice y_note è in una singola riga, ogni riga di x_note verrà interpretata come una variabile distinta."
			},
			knownXs: {
				name: "known_x's",
				detail: "Insieme facoltativo di valori x che possono essere già noti dalla relazione y = mx + b La matrice x_note può comprendere uno o più insiemi di variabili. Se viene utilizzata una sola variabile, y_note e x_note potranno essere intervalli di forma qualsiasi, purché con dimensioni uguali. Se vengono utilizzate più variabili, y_note dovrà essere un vettore, ovvero un intervallo con altezza di una riga o larghezza di una colonna. Se x_note è omesso, verrà considerato uguale alla matrice {1;2;3;...} che ha le stesse dimensioni di y_note."
			},
			newXs: {
				name: "new_x's",
				detail: "Nuovi valori x per i quali TENDENZA restituirà i valori y corrispondenti. Analogamente a X_nota, Nuova_x deve includere una colonna (o una riga) per ciascuna variabile indipendente. Di conseguenza, se Y_nota è in una singola colonna, X_nota e Nuova_x dovrebbero avere lo stesso numero di colonne. Se Y_nota è in una singola riga, X_nota e Nuova_x dovrebbero avere lo stesso numero di righe. Se Nuova_x è omesso, verrà considerato uguale a X_nota. Se entrambi X_nota e Nuova_x sono omessi, verranno considerati uguali alla matrice {1;2;3;...} che ha le stesse dimensioni di Y_nota."
			},
			constb: {
				name: "const",
				detail: "Valore logico che specifica se la costante b deve essere uguale a 0. Se cost è VERO o è omesso, b verrà calcolata secondo la normale procedura. Se cost è FALSO, b verrà impostata a 0 e i valori m verranno corretti in modo che y = mx."
			}
		}
	},
	TRIMMEAN: {
		description: "Restituisce la media della parte interna di un set di dati. La funzione MEDIA.TRONCATA calcola la media ricavata dall'esclusione di una percentuale di valori dalla coda superiore e dalla coda inferiore di un set di dati. È possibile utilizzare questa funzione quando si desidera escludere i dati esterni dall'analisi.",
		abstract: "Restituisce la media della parte interna di un set di dati. La funzione MEDIA.TRONCATA calcola la media ricavata dall'esclusione di una percentuale di valori dalla coda superiore e dalla coda inferiore di un set di dati. È possibile utilizzare questa funzione quando si desidera escludere i dati esterni dall'analisi.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/trimmean-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Obbligatorio. Matrice o intervallo di valori da troncare e di cui calcolare la media."
			},
			percent: {
				name: "percent",
				detail: "Obbligatorio. Numero frazionario di coordinate da escludere dal calcolo. Se ad esempio percento = 0,2, verranno esclusi 4 punti da un set di dati di 20 punti (20 x 0,2), ovvero 2 punti dalla parte superiore e 2 dalla parte inferiore del set."
			}
		}
	},
	VAR_P: {
		description: "Restituisce la varianza sulla base dell'intera popolazione. Ignora i valori logici e il testo nella popolazione.",
		abstract: "Restituisce la varianza sulla base dell'intera popolazione. Ignora i valori logici e il testo nella popolazione.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/var-p-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obbligatorio. Primo argomento numerico corrispondente a una popolazione."
			},
			number2: {
				name: "number2",
				detail: "Opzionale. Da 2 a 254 argomenti numerici corrispondenti a una popolazione."
			}
		}
	},
	VAR_S: {
		description: "Stima la varianza sulla base di un campione. Ignora i valori logici e il testo nel campione.",
		abstract: "Stima la varianza sulla base di un campione. Ignora i valori logici e il testo nel campione.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/var-s-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obbligatorio. Primo argomento numerico corrispondente a un campione di popolazione."
			},
			number2: {
				name: "number2",
				detail: "Opzionale. Da 2 a 254 argomenti numerici corrispondenti a un campione di popolazione."
			}
		}
	},
	VARA: {
		description: "Stima la varianza sulla base di un campione.",
		abstract: "Stima la varianza sulla base di un campione.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/vara-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Val1 è obbligatorio, i valori successivi sono facoltativi. Da 1 a 255 argomenti di valori corrispondenti a un campione di popolazione."
			},
			value2: {
				name: "value2",
				detail: "Val1 è obbligatorio, i valori successivi sono facoltativi. Da 1 a 255 argomenti di valori corrispondenti a un campione di popolazione."
			}
		}
	},
	VARPA: {
		description: "Restituisce la varianza sulla base dell'intera popolazione.",
		abstract: "Restituisce la varianza sulla base dell'intera popolazione.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/varpa-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Val1 è obbligatorio, i valori successivi sono facoltativi. Da 1 a 255 argomenti di valori corrispondenti a una popolazione."
			},
			value2: {
				name: "value2",
				detail: "Val1 è obbligatorio, i valori successivi sono facoltativi. Da 1 a 255 argomenti di valori corrispondenti a una popolazione."
			}
		}
	},
	WEIBULL_DIST: {
		description: "Restituisce la distribuzione di Weibull. Utilizzare questa distribuzione nelle analisi di affidabilità, come il calcolo della durata media di un dispositivo.",
		abstract: "Restituisce la distribuzione di Weibull. Utilizzare questa distribuzione nelle analisi di affidabilità, come il calcolo della durata media di un dispositivo.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/weibull-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obbligatorio. Valore in cui calcolare la funzione."
			},
			alpha: {
				name: "alpha",
				detail: "Obbligatorio. Parametro per la distribuzione."
			},
			beta: {
				name: "beta",
				detail: "Obbligatorio. Parametro per la distribuzione."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obbligatorio. Determina la forma assunta dalla funzione."
			}
		}
	},
	Z_TEST: {
		description: "Per informazioni sulla modalità di utilizzo di TESTZ per il calcolo di un valore di probabilità a due code, vedere la sezione Osservazioni riportata di seguito.",
		abstract: "Per informazioni sulla modalità di utilizzo di TESTZ per il calcolo di un valore di probabilità a due code, vedere la sezione Osservazioni riportata di seguito.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/z-test-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Obbligatorio. Matrice o intervallo di dati in base al quale verificare x"
			},
			x: {
				name: "x",
				detail: "Obbligatorio. Valore da verificare."
			},
			sigma: {
				name: "sigma",
				detail: "Opzionale. Deviazione standard della popolazione (nota). Se questo argomento viene omesso, verrà utilizzata la deviazione standard campione."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/text/it-IT.ts
const locale$3 = {
	ASC: {
		description: "Nelle lingue che utilizzano set di caratteri a byte doppio (DBCS, Double-Byte Character Set), la funzione converte i caratteri latini a byte doppio (DB, Double-Byte) in caratteri a byte singolo (SB, Single-Byte).",
		abstract: "Nelle lingue che utilizzano set di caratteri a byte doppio (DBCS, Double-Byte Character Set), la funzione converte i caratteri latini a byte doppio (DB, Double-Byte) in caratteri a byte singolo (SB, Single-Byte).",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/asc-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Obbligatorio. Testo o riferimento a una cella che contiene il testo che si desidera modificare. Se il testo non contiene caratteri a byte doppio, non verrà modificato."
		} }
	},
	ARRAYTOTEXT: {
		description: "La funzione MATRICE.A.TESTO restituisce una matrice di valori di testo da qualsiasi intervallo specificato. Passa i valori testuali invariati e converte i valori non testuali in testo.",
		abstract: "La funzione MATRICE.A.TESTO restituisce una matrice di valori di testo da qualsiasi intervallo specificato. Passa i valori testuali invariati e converte i valori non testuali in testo.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/arraytotext-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Matrice da restituire come testo. Obbligatorio."
			},
			format: {
				name: "format",
				detail: "Il formato dei dati restituiti. Facoltativo. Può essere uno dei due valori seguenti: 0 Impostazione predefinita. Formato conciso semplice da leggere. Il testo restituito sarà uguale al testo visualizzato in una cella a cui è applicata la formattazione generale. 1 Formato Strict che include caratteri di escape e delimitatori di riga. Genera una stringa che può essere analizzata quando viene immessa nella barra della formula. Incapsula le stringhe restituite tra virgolette, esclusi valori booleani, numeri ed errori."
			}
		}
	},
	BAHTTEXT: {
		description: "Converte un numero in testo Thai e aggiunge il suffisso \"Baht\".",
		abstract: "Converte un numero in testo Thai e aggiunge il suffisso \"Baht\".",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/bahttext-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio. Numero che si desidera convertire in testo, riferimento a una cella contenente un numero o formula che restituisce un numero."
		} }
	},
	CHAR: {
		description: "Restituisce il carattere specificato da un numero. Utilizzare CODICE.CARATT per convertire in caratteri i numeri della tabella codici eventualmente ottenuti da file residenti in altri tipi di computer.",
		abstract: "Restituisce il carattere specificato da un numero. Utilizzare CODICE.CARATT per convertire in caratteri i numeri della tabella codici eventualmente ottenuti da file residenti in altri tipi di computer.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/char-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio. Numero compreso tra 1 e 255 che specifica il carattere desiderato. Il carattere fa parte del set di caratteri utilizzato dal computer. Nota Excel per il Web supporta solo CODICE.CARATT(9), CODICE.CARATT(10), CODICE.CARATT(13) e CODICE.CARATT(32) e versioni successive."
		} }
	},
	CLEAN: {
		description: "Rimuove dal testo tutti i caratteri che non possono essere stampati. Applicare la funzione LIBERA a un testo importato da altre applicazioni contenente caratteri che potrebbero non essere stampati tramite il sistema operativo in uso. È possibile, ad esempio, utilizzare LIBERA per rimuovere codici a basso livello che si trovano di frequente all'inizio e alla fine dei file di dati e che non possono essere stampati.",
		abstract: "Rimuove dal testo tutti i caratteri che non possono essere stampati. Applicare la funzione LIBERA a un testo importato da altre applicazioni contenente caratteri che potrebbero non essere stampati tramite il sistema operativo in uso. È possibile, ad esempio, utilizzare LIBERA per rimuovere codici a basso livello che si trovano di frequente all'inizio e alla fine dei file di dati e che non possono essere stampati.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/clean-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Obbligatorio. Qualsiasi informazione del foglio di lavoro dalla quale si desidera rimuovere i caratteri che non possono essere stampati."
		} }
	},
	CODE: {
		description: "Restituisce un codice numerico per il primo carattere di una stringa di testo. Il codice restituito corrisponde al set di caratteri utilizzato dal computer.",
		abstract: "Restituisce un codice numerico per il primo carattere di una stringa di testo. Il codice restituito corrisponde al set di caratteri utilizzato dal computer.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/code-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Obbligatorio. Testo di cui si desidera il codice del primo carattere."
		} }
	},
	CONCAT: {
		description: "La funzione CONCAT combina il testo di più intervalli e/o stringhe, ma non fornisce delimitatore o argomenti IgnoraEmpty.",
		abstract: "La funzione CONCAT combina il testo di più intervalli e/o stringhe, ma non fornisce delimitatore o argomenti IgnoraEmpty.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/concat-function"
		}],
		functionParameter: {
			text1: {
				name: "text1",
				detail: "L'elemento di testo da unire. Una stringa o una matrice di stringhe, ad esempio un intervallo di celle."
			},
			text2: {
				name: "text2",
				detail: "Altri elementi di testo da unire. Per gli elementi di testo è possibile usare un massimo di 253 argomenti di testo. Ognuno può essere una stringa o una matrice di stringhe, ad esempio un intervallo di celle."
			}
		}
	},
	CONCATENATE: {
		description: "Usare CONCATENA , una delle funzioni di testo , per unire due o più stringhe di testo in una sola stringa.",
		abstract: "Usare CONCATENA , una delle funzioni di testo , per unire due o più stringhe di testo in una sola stringa.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/concatenate-function"
		}],
		functionParameter: {
			text1: {
				name: "text1",
				detail: "Primo elemento da unire. Può essere testo, numero o riferimento di cella."
			},
			text2: {
				name: "text2",
				detail: "Elementi di testo aggiuntivi da unire. Sono consentiti fino a 255 elementi, per un totale massimo di 8.192 caratteri."
			}
		}
	},
	DBCS: {
		description: "La funzione descritta in questo argomento della Guida converte i caratteri ridotti (a singolo byte) di una stringa di caratteri in caratteri interi (a doppio byte). Il nome della funzione e i caratteri oggetto della conversione dipendono dalle impostazioni della lingua.",
		abstract: "La funzione descritta in questo argomento della Guida converte i caratteri ridotti (a singolo byte) di una stringa di caratteri in caratteri interi (a doppio byte). Il nome della funzione e i caratteri oggetto della conversione dipendono dalle impostazioni della lingua.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/dbcs-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Obbligatorio. Testo o riferimento a una cella contenente il testo da modificare. Se il testo non contiene caratteri latini o katakana a byte singolo, non verrà modificato."
		} }
	},
	DOLLAR: {
		description: "La funzione VALUTA , una delle funzioni TESTO , converte un numero in testo usando il formato valuta, con i decimali arrotondati al numero di posizioni specificato. VALUTA usa il valore $#.##0,00_); Formato numero ($#,##0,00), anche se il simbolo di valuta applicato dipende dalle impostazioni della lingua locale.",
		abstract: "La funzione VALUTA , una delle funzioni TESTO , converte un numero in testo usando il formato valuta, con i decimali arrotondati al numero di posizioni specificato. VALUTA usa il valore $#.##0,00_); Formato numero ($#,##0,00), anche se il simbolo di valuta applicato dipende dalle impostazioni della lingua locale.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/dollar-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. Numero, riferimento a una cella che contiene un numero oppure formula che restituisce un numero."
			},
			decimals: {
				name: "decimals",
				detail: "Opzionale. Numero di cifre a destra della virgola decimale. Se questo valore è negativo, il numero viene arrotondato a sinistra della virgola decimale. Se decimali è omesso, verrà considerato uguale a 2."
			}
		}
	},
	EXACT: {
		description: "Confronta due stringhe di testo e restituisce VERO se le stringhe sono identiche e FALSO in caso contrario. IDENTICO rileva le maiuscole, ma ignora le differenze di formattazione. Utilizzare la funzione IDENTICO per esaminare il testo immesso in un documento.",
		abstract: "Confronta due stringhe di testo e restituisce VERO se le stringhe sono identiche e FALSO in caso contrario. IDENTICO rileva le maiuscole, ma ignora le differenze di formattazione. Utilizzare la funzione IDENTICO per esaminare il testo immesso in un documento.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/exact-function"
		}],
		functionParameter: {
			text1: {
				name: "text1",
				detail: "Obbligatorio. Prima stringa di testo."
			},
			text2: {
				name: "text2",
				detail: "Obbligatorio. Seconda stringa di testo."
			}
		}
	},
	FIND: {
		description: "Trova un valore di testo all'interno di un altro (con distinzione tra maiuscole e minuscole).",
		abstract: "Trova un valore di testo all'interno di un altro (con distinzione tra maiuscole e minuscole).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/this-article-has-been-retired"
		}],
		functionParameter: {
			findText: {
				name: "find_text",
				detail: "Testo che si desidera trovare."
			},
			withinText: {
				name: "within_text",
				detail: "Testo che contiene il testo da trovare."
			},
			startNum: {
				name: "start_num",
				detail: "Specifica il carattere da cui iniziare la ricerca. Se omesso, è considerato 1."
			}
		}
	},
	FINDB: {
		description: "Trova un valore di testo all'interno di un altro (con distinzione tra maiuscole e minuscole).",
		abstract: "Trova un valore di testo all'interno di un altro (con distinzione tra maiuscole e minuscole).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/this-article-has-been-retired"
		}],
		functionParameter: {
			findText: {
				name: "find_text",
				detail: "Testo che si desidera trovare."
			},
			withinText: {
				name: "within_text",
				detail: "Testo che contiene il testo da trovare."
			},
			startNum: {
				name: "start_num",
				detail: "Specifica il carattere da cui iniziare la ricerca. Se omesso, è considerato 1."
			}
		}
	},
	FIXED: {
		description: "Arrotonda un numero al numero specificato di decimali, formattandolo con i separatori delle migliaia e la virgola decimale, e restituisce il risultato in forma di testo.",
		abstract: "Arrotonda un numero al numero specificato di decimali, formattandolo con i separatori delle migliaia e la virgola decimale, e restituisce il risultato in forma di testo.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/fixed-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obbligatorio. Numero che si desidera arrotondare e convertire in testo."
			},
			decimals: {
				name: "decimals",
				detail: "Opzionale. Numero di cifre a destra della virgola decimale."
			},
			noCommas: {
				name: "no_commas",
				detail: "Opzionale. Un valore logico che, se VERO, non consente a FISSO di includere i separatori delle migliaia nel testo restituito."
			}
		}
	},
	LEFT: {
		description: "Restituisce i caratteri più a sinistra di un valore di testo.",
		abstract: "Restituisce i caratteri più a sinistra di un valore di testo.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/left-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Stringa di testo contenente i caratteri da estrarre."
			},
			numChars: {
				name: "num_chars",
				detail: "Specifica il numero di caratteri che SINISTRA deve estrarre."
			}
		}
	},
	LEFTB: {
		description: "Restituisce i caratteri più a sinistra di un valore di testo.",
		abstract: "Restituisce i caratteri più a sinistra di un valore di testo.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/left-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Stringa di testo contenente i caratteri da estrarre."
			},
			numBytes: {
				name: "num_bytes",
				detail: "Specifica il numero di caratteri che SINISTRA.B deve estrarre, in base ai byte."
			}
		}
	},
	LEN: {
		description: "Restituisce il numero di caratteri in una stringa di testo.",
		abstract: "Restituisce il numero di caratteri in una stringa di testo.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/len-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Testo di cui si desidera trovare la lunghezza. Gli spazi contano come caratteri."
		} }
	},
	LENB: {
		description: "Restituisce il numero di byte usati per rappresentare i caratteri in una stringa di testo.",
		abstract: "Restituisce il numero di byte usati per rappresentare i caratteri in una stringa di testo.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/len-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Testo di cui si desidera trovare la lunghezza. Gli spazi contano come caratteri."
		} }
	},
	LOWER: {
		description: "Converte in minuscolo tutte le lettere maiuscole contenute in una stringa di testo.",
		abstract: "Converte in minuscolo tutte le lettere maiuscole contenute in una stringa di testo.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/lower-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Obbligatorio. Testo che si desidera convertire in minuscolo. La funzione MINUSC modifica solo le lettere presenti nel testo e non altri tipi di carattere."
		} }
	},
	MID: {
		description: "Restituisce un numero specificato di caratteri da una stringa di testo, a partire dalla posizione indicata.",
		abstract: "Restituisce un numero specificato di caratteri da una stringa di testo, a partire dalla posizione indicata.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/mid-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Stringa di testo contenente i caratteri da estrarre."
			},
			startNum: {
				name: "start_num",
				detail: "Posizione, nel testo, del primo carattere da estrarre."
			},
			numChars: {
				name: "num_chars",
				detail: "Specifica il numero di caratteri che STRINGA.ESTRAI deve estrarre."
			}
		}
	},
	MIDB: {
		description: "Restituisce un numero specificato di caratteri da una stringa di testo, a partire dalla posizione indicata.",
		abstract: "Restituisce un numero specificato di caratteri da una stringa di testo, a partire dalla posizione indicata.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/mid-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Stringa di testo contenente i caratteri da estrarre."
			},
			startNum: {
				name: "start_num",
				detail: "Posizione, nel testo, del primo carattere da estrarre."
			},
			numBytes: {
				name: "num_bytes",
				detail: "Specifica il numero di caratteri che STRINGA.ESTRAI.B deve estrarre, in base ai byte."
			}
		}
	},
	NUMBERSTRING: {
		description: "Converte i numeri in stringhe cinesi.",
		abstract: "Converte i numeri in stringhe cinesi.",
		links: [{
			title: "Instruction",
			url: "https://www.wps.cn/learning/course/detail/id/340.html?chan=pc_kdocs_function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Valore convertito in una stringa cinese."
			},
			type: {
				name: "type",
				detail: "Tipo di risultato restituito: 1, cinese minuscolo; 2, cinese maiuscolo; 3, caratteri cinesi di lettura e scrittura."
			}
		}
	},
	NUMBERVALUE: {
		description: "Converte il testo in numero in modo indipendente dalle impostazioni locali.",
		abstract: "Converte il testo in numero in modo indipendente dalle impostazioni locali.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/numbervalue-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Obbligatorio. Testo da convertire in numero."
			},
			decimalSeparator: {
				name: "decimal_separator",
				detail: "Opzionale. Carattere usato per separare la parte intera e frazionaria del risultato."
			},
			groupSeparator: {
				name: "group_separator",
				detail: "Opzionale. Carattere usato per separare i raggruppamenti di numeri, come le migliaia dalla centinaia e i milioni dalle migliaia."
			}
		}
	},
	PHONETIC: {
		description: "Estrae i caratteri fonetici (furigana) da una stringa di testo.",
		abstract: "Estrae i caratteri fonetici (furigana) da una stringa di testo.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/phonetic-function"
		}],
		functionParameter: { reference: {
			name: "Riferimento",
			detail: "Obbligatorio. Stringa di testo o riferimento a una singola cella o a un intervallo di celle contenenti una stringa di testo furigana."
		} }
	},
	PROPER: {
		description: "Converte in maiuscolo la prima lettera di una stringa di testo e tutte le altre lettere che seguono un qualsiasi carattere diverso da una lettera. Le rimanenti lettere vengono convertite in minuscolo.",
		abstract: "Converte in maiuscolo la prima lettera di una stringa di testo e tutte le altre lettere che seguono un qualsiasi carattere diverso da una lettera. Le rimanenti lettere vengono convertite in minuscolo.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/proper-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Obbligatorio. Testo racchiuso tra virgolette, formula che restituisce del testo o riferimento a una cella contenente del testo che si desidera convertire parzialmente in maiuscolo."
		} }
	},
	REGEXEXTRACT: {
		description: "Estrae la prima sottostringa che corrisponde a un'espressione regolare.",
		abstract: "Estrae la prima sottostringa che corrisponde a un'espressione regolare.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3098244?hl=it"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Testo di input."
			},
			regularExpression: {
				name: "regular_expression",
				detail: "Viene restituita la prima parte del testo che corrisponde a questa espressione."
			}
		}
	},
	REGEXMATCH: {
		description: "Indica se un testo corrisponde a un'espressione regolare.",
		abstract: "Indica se un testo corrisponde a un'espressione regolare.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3098292?hl=it"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Testo da verificare rispetto all'espressione regolare."
			},
			regularExpression: {
				name: "regular_expression",
				detail: "Espressione regolare con cui verificare il testo."
			}
		}
	},
	REGEXREPLACE: {
		description: "Sostituisce una parte di una stringa di testo con un'altra stringa usando espressioni regolari.",
		abstract: "Sostituisce una parte di una stringa di testo con un'altra stringa usando espressioni regolari.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3098245?hl=it"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Testo di cui verrà sostituita una parte."
			},
			regularExpression: {
				name: "regular_expression",
				detail: "Espressione regolare. Tutte le occorrenze corrispondenti nel testo verranno sostituite."
			},
			replacement: {
				name: "replacement",
				detail: "Testo che verrà inserito nel testo originale."
			}
		}
	},
	REPLACE: {
		description: "Sostituisce caratteri all'interno di un testo.",
		abstract: "Sostituisce caratteri all'interno di un testo.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/replace-function"
		}],
		functionParameter: {
			oldText: {
				name: "old_text",
				detail: "Testo in cui si desidera sostituire alcuni caratteri."
			},
			startNum: {
				name: "start_num",
				detail: "Posizione in old_text del carattere che si desidera sostituire con new_text."
			},
			numChars: {
				name: "num_chars",
				detail: "Numero di caratteri in old_text che SOSTITUISCI deve sostituire con new_text."
			},
			newText: {
				name: "new_text",
				detail: "Testo che sostituirà i caratteri in old_text."
			}
		}
	},
	REPLACEB: {
		description: "Sostituisce caratteri all'interno di un testo.",
		abstract: "Sostituisce caratteri all'interno di un testo.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/replace-function"
		}],
		functionParameter: {
			oldText: {
				name: "old_text",
				detail: "Testo in cui si desidera sostituire alcuni caratteri."
			},
			startNum: {
				name: "start_num",
				detail: "Posizione in old_text del carattere che si desidera sostituire con new_text."
			},
			numBytes: {
				name: "num_bytes",
				detail: "Numero di byte in old_text che SOSTITUISCI.B deve sostituire con new_text."
			},
			newText: {
				name: "new_text",
				detail: "Testo che sostituirà i caratteri in old_text."
			}
		}
	},
	REPT: {
		description: "Ripete un testo per il numero di volte specificato. Utilizzare la funzione RIPETI per riempire una cella con una stringa di testo ripetuta più volte.",
		abstract: "Ripete un testo per il numero di volte specificato. Utilizzare la funzione RIPETI per riempire una cella con una stringa di testo ripetuta più volte.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/rept-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Obbligatorio. Testo che si desidera ripetere."
			},
			numberTimes: {
				name: "number_times",
				detail: "Obbligatorio. Numero positivo che specifica il numero di volte che si desidera ripetere il testo."
			}
		}
	},
	RIGHT: {
		description: "Restituisce i caratteri più a destra di un valore di testo.",
		abstract: "Restituisce i caratteri più a destra di un valore di testo.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/right-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Stringa di testo contenente i caratteri da estrarre."
			},
			numChars: {
				name: "num_chars",
				detail: "Specifica il numero di caratteri che DESTRA deve estrarre."
			}
		}
	},
	RIGHTB: {
		description: "Restituisce i caratteri più a destra di un valore di testo.",
		abstract: "Restituisce i caratteri più a destra di un valore di testo.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/right-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Stringa di testo contenente i caratteri da estrarre."
			},
			numBytes: {
				name: "num_bytes",
				detail: "Specifica il numero di caratteri che DESTRA.B deve estrarre, in base ai byte."
			}
		}
	},
	SEARCH: {
		description: "Trova un valore di testo all'interno di un altro (senza distinzione tra maiuscole e minuscole).",
		abstract: "Trova un valore di testo all'interno di un altro (senza distinzione tra maiuscole e minuscole).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/search-function"
		}],
		functionParameter: {
			findText: {
				name: "find_text",
				detail: "Testo che si desidera trovare."
			},
			withinText: {
				name: "within_text",
				detail: "Testo che contiene il testo da trovare."
			},
			startNum: {
				name: "start_num",
				detail: "Specifica il carattere da cui iniziare la ricerca. Se omesso, è considerato 1."
			}
		}
	},
	SEARCHB: {
		description: "Trova un valore di testo all'interno di un altro (senza distinzione tra maiuscole e minuscole).",
		abstract: "Trova un valore di testo all'interno di un altro (senza distinzione tra maiuscole e minuscole).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/search-function"
		}],
		functionParameter: {
			findText: {
				name: "find_text",
				detail: "Testo che si desidera trovare."
			},
			withinText: {
				name: "within_text",
				detail: "Testo che contiene il testo da trovare."
			},
			startNum: {
				name: "start_num",
				detail: "Specifica il carattere da cui iniziare la ricerca. Se omesso, è considerato 1."
			}
		}
	},
	SUBSTITUTE: {
		description: "Sostituisce new_text a old_text in una stringa di testo. Usare SOSTITUISCI quando si vuole sostituire testo specifico in una stringa di testo; usare SOSTITUISCI quando si vuole sostituire il testo presente in una posizione specifica di una stringa di testo.",
		abstract: "Sostituisce new_text a old_text in una stringa di testo. Usare SOSTITUISCI quando si vuole sostituire testo specifico in una stringa di testo; usare SOSTITUISCI quando si vuole sostituire il testo presente in una posizione specifica di una stringa di testo.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/substitute-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Obbligatorio. Testo o riferimento a una cella contenente testo di cui si desidera sostituire i caratteri."
			},
			oldText: {
				name: "old_text",
				detail: "Obbligatorio. Testo che si desidera sostituire."
			},
			newText: {
				name: "new_text",
				detail: "Obbligatorio. Testo che si desidera sostituire a testo_prec."
			},
			instanceNum: {
				name: "instance_num",
				detail: "Opzionale. Occorrenza di testo_prec che si desidera sostituire con nuovo_testo. Se occorrenza viene specificata, verrà sostituita solo l'istanza di testo_prec specificata. In caso contrario, tutte le occorrenze di testo_prec contenute in testo verranno sostituite con nuovo_testo."
			}
		}
	},
	T: {
		description: "Restituisce il testo a cui si riferisce val.",
		abstract: "Restituisce il testo a cui si riferisce val.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/t-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obbligatorio. Valore che si desidera esaminare."
		} }
	},
	TEXT: {
		description: "La funzione TESTO permette di modificare il modo di visualizzare un numero tramite l'applicazione di formattazione con codici formato . È una funzione utile in situazioni in cui si vuole visualizzare i numeri in un formato più leggibile o combinarli con testo o simboli.",
		abstract: "La funzione TESTO permette di modificare il modo di visualizzare un numero tramite l'applicazione di formattazione con codici formato . È una funzione utile in situazioni in cui si vuole visualizzare i numeri in un formato più leggibile o combinarli con testo o simboli.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/text-function"
		}],
		functionParameter: {
			value: {
				name: "value",
				detail: "Valore numerico da convertire in testo."
			},
			formatText: {
				name: "format_text",
				detail: "Stringa di testo che definisce la formattazione da applicare al valore fornito."
			}
		}
	},
	TEXTAFTER: {
		description: "Restituisce il testo che si verifica dopo il carattere o la stringa specificata. È l'opposto della funzione TESTO.DOPO .",
		abstract: "Restituisce il testo che si verifica dopo il carattere o la stringa specificata. È l'opposto della funzione TESTO.DOPO .",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/textafter-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Testo in cui effettuare la ricerca. I caratteri jolly non sono consentiti."
			},
			delimiter: {
				name: "delimiter",
				detail: "Testo che indica il punto dopo il quale si desidera estrarre."
			},
			instanceNum: {
				name: "instance_num",
				detail: "Occorrenza del delimitatore dopo la quale si desidera estrarre il testo."
			},
			matchMode: {
				name: "match_mode",
				detail: "Determina se la ricerca distingue tra maiuscole e minuscole. Per impostazione predefinita, la distinzione è attiva."
			},
			matchEnd: {
				name: "match_end",
				detail: "Tratta la fine del testo come delimitatore. Per impostazione predefinita, il testo deve corrispondere esattamente."
			},
			ifNotFound: {
				name: "if_not_found",
				detail: "Valore restituito se non viene trovata alcuna corrispondenza. Per impostazione predefinita viene restituito #N/D."
			}
		}
	},
	TEXTBEFORE: {
		description: "Restituisce il testo che si verifica prima di un carattere o di una stringa specificata. È l'opposto della funzione TESTO.DOPO .",
		abstract: "Restituisce il testo che si verifica prima di un carattere o di una stringa specificata. È l'opposto della funzione TESTO.DOPO .",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/it-it/excel/functions/textbefore-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Testo in cui effettuare la ricerca. I caratteri jolly non sono consentiti."
			},
			delimiter: {
				name: "delimiter",
				detail: "Testo che indica il punto prima del quale si desidera estrarre."
			},
			instanceNum: {
				name: "instance_num",
				detail: "Occorrenza del delimitatore prima della quale si desidera estrarre il testo."
			},
			matchMode: {
				name: "match_mode",
				detail: "Determina se la ricerca distingue tra maiuscole e minuscole. Per impostazione predefinita, la distinzione è attiva."
			},
			matchEnd: {
				name: "match_end",
				detail: "Tratta la fine del testo come delimitatore. Per impostazione predefinita, il testo deve corrispondere esattamente."
			},
			ifNotFound: {
				name: "if_not_found",
				detail: "Valore restituito se non viene trovata alcuna corrispondenza. Per impostazione predefinita viene restituito #N/D."
			}
		}
	},
	TEXTJOIN: {
		description: "La funzione TESTO.UNISCI combina il testo di più intervalli e/o stringhe e include un delimitatore specificato dall'utente tra ogni valore di testo da unire. Se il delimitatore è una stringa di testo vuota, la funzione concatena correttamente gli intervalli.",
		abstract: "La funzione TESTO.UNISCI combina il testo di più intervalli e/o stringhe e include un delimitatore specificato dall'utente tra ogni valore di testo da unire. Se il delimitatore è una stringa di testo vuota, la funzione concatena correttamente gli intervalli.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/textjoin-function"
		}],
		functionParameter: {
			delimiter: {
				name: "delimiter",
				detail: "Stringa di testo, vuota o costituita da uno o più caratteri racchiusi tra virgolette doppie oppure riferimento a una stringa di testo valida. Se si specifica un numero, viene trattato come testo."
			},
			ignoreEmpty: {
				name: "ignore_empty",
				detail: "Se VERO, ignora le celle vuote."
			},
			text1: {
				name: "text1",
				detail: "L'elemento di testo da unire. Una stringa di testo o una matrice di stringhe, ad esempio un intervallo di celle."
			},
			text2: {
				name: "text2",
				detail: "Altri elementi di testo da unire. Per gli elementi di testo è possibile usare un massimo di 252 argomenti di testo, incluso testo1 . Ognuno può essere una stringa di testo o una matrice di stringhe, come un intervallo di celle."
			}
		}
	},
	TEXTSPLIT: {
		description: "La funzione DIVIDI.TESTO funziona come la procedura guidata Text-to-Columns , ma in forma di formula. Consente di dividere le colonne o per righe. È l'inversa della funzione TESTO.UNISCI .",
		abstract: "La funzione DIVIDI.TESTO funziona come la procedura guidata Text-to-Columns , ma in forma di formula. Consente di dividere le colonne o per righe. È l'inversa della funzione TESTO.UNISCI .",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/textsplit-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Testo da dividere. Obbligatorio."
			},
			colDelimiter: {
				name: "col_delimiter",
				detail: "Testo che indica il punto in cui si espande il testo tra le colonne."
			},
			rowDelimiter: {
				name: "row_delimiter",
				detail: "Testo che contrassegna il punto in cui si espande il testo verso il basso nelle righe. Facoltativo."
			},
			ignoreEmpty: {
				name: "ignore_empty",
				detail: "Specificare VERO per ignorare i delimitatori consecutivi. Il valore predefinito è FALSE che crea una cella vuota. Facoltativo."
			},
			matchMode: {
				name: "match_mode",
				detail: "Specificare 1 per eseguire una corrispondenza senza distinzione tra maiuscole e minuscole. Il valore predefinito è 0 che esegue una corrispondenza con distinzione tra maiuscole e minuscole. Facoltativo."
			},
			padWith: {
				name: "pad_with",
				detail: "Valore con cui riempire il risultato. L'impostazione predefinita è #N/A."
			}
		}
	},
	TRIM: {
		description: "Rimuove tutti gli spazi dal testo ad eccezione dei singoli spazi tra le parole. Utilizzare la funzione ANNULLA.SPAZI sul testo creato con altre applicazioni che può presentare una distribuzione irregolare degli spazi.",
		abstract: "Rimuove tutti gli spazi dal testo ad eccezione dei singoli spazi tra le parole. Utilizzare la funzione ANNULLA.SPAZI sul testo creato con altre applicazioni che può presentare una distribuzione irregolare degli spazi.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/trim-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Testo da cui si desidera rimuovere gli spazi. Il testo deve essere racchiuso tra virgolette."
		} }
	},
	UNICHAR: {
		description: "Restituisce il carattere Unicode a cui fa riferimento il valore numerico assegnato.",
		abstract: "Restituisce il carattere Unicode a cui fa riferimento il valore numerico assegnato.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/unichar-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obbligatorio. Num è il numero Unicode che rappresenta il carattere."
		} }
	},
	UNICODE: {
		description: "Restituisce il numero (punto di codice) corrispondente al primo carattere del testo.",
		abstract: "Restituisce il numero (punto di codice) corrispondente al primo carattere del testo.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/unicode-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Obbligatorio. Testo è il carattere per cui si desidera il valore Unicode."
		} }
	},
	UPPER: {
		description: "Converte il testo in maiuscolo.",
		abstract: "Converte il testo in maiuscolo.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/upper-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Obbligatorio. Testo che si desidera convertire in maiuscolo. Può essere un riferimento o una stringa di testo."
		} }
	},
	VALUE: {
		description: "Converte una stringa di testo rappresentante un numero nel numero corrispondente.",
		abstract: "Converte una stringa di testo rappresentante un numero nel numero corrispondente.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/value-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Obbligatorio. Testo racchiuso tra virgolette o riferimento a una cella contenente il testo che si desidera convertire."
		} }
	},
	VALUETOTEXT: {
		description: "La funzione VALUETOTEXT restituisce del testo da qualsiasi valore specificato. Passa i valori testuali invariati e converte i valori non testuali in testo.",
		abstract: "La funzione VALUETOTEXT restituisce del testo da qualsiasi valore specificato. Passa i valori testuali invariati e converte i valori non testuali in testo.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/valuetotext-function"
		}],
		functionParameter: {
			value: {
				name: "value",
				detail: "Il valore da restituire come testo. Obbligatorio."
			},
			format: {
				name: "format",
				detail: "Il formato dei dati restituiti. Facoltativo. Può essere uno dei due valori seguenti: 0 Impostazione predefinita. Formato conciso semplice da leggere. Il testo restituito sarà uguale al testo visualizzato in una cella a cui è applicata la formattazione generale. 1 Formato Strict che include caratteri di escape e delimitatori di riga. Genera una stringa che può essere analizzata quando viene immessa nella barra della formula. Incapsula le stringhe restituite tra virgolette, esclusi valori booleani, numeri ed errori."
			}
		}
	},
	CALL: {
		description: "Richiama una procedura da una libreria a collegamento dinamico o da una risorsa codice. Questa funzione dispone di due sintassi. Utilizzare la sintassi 1 solo con una risorsa codice registrata precedentemente, che utilizza gli argomenti della funzione REGISTRO. Utilizzare la sintassi 2a o 2b per registrare e contemporaneamente richiamare una risorsa codice.",
		abstract: "Richiama una procedura da una libreria a collegamento dinamico o da una risorsa codice. Questa funzione dispone di due sintassi. Utilizzare la sintassi 1 solo con una risorsa codice registrata precedentemente, che utilizza gli argomenti della funzione REGISTRO. Utilizzare la sintassi 2a o 2b per registrare e contemporaneamente richiamare una risorsa codice.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/call-function"
		}],
		functionParameter: {
			moduleText: {
				name: "Module_text",
				detail: "Obbligatorio. Testo racchiuso tra virgolette nel quale è specificato il nome della DLL che contiene la procedura in Microsoft Excel per Windows."
			},
			procedure: {
				name: "Procedura",
				detail: "Obbligatorio. Testo che specifica il nome della funzione nella DLL di Microsoft Excel per Windows. È inoltre possibile utilizzare il valore ordinale della funzione proveniente dall'istruzione EXPORTS del file DEF (File di definizione dei moduli, Module-Definition File). Il valore ordinale non deve essere in formato testo."
			},
			typeText: {
				name: "Type_text",
				detail: "Obbligatorio. Testo che specifica il tipo di dati del valore restituito e i tipi di dati di tutti gli argomenti nella DLL o risorsa codice. La prima lettera di tipo specifica il valore restituito. I codici da utilizzare per tipo sono descritti in dettaglio in Utilizzo delle funzioni RICHIAMA e REGISTRO . Nel caso di file DLL autonomi o di risorse codice autonome (XLL), è possibile omettere questo argomento."
			},
			argument1: {
				name: "Argomento1,...",
				detail: "Opzionale. Argomenti da sottoporre alla procedura."
			}
		}
	},
	EUROCONVERT: {
		description: "Consente di convertire un numero in euro, un valore dal formato euro a un formato in una valuta dei paesi membri dell'Unione Europea, oppure un valore da una delle valute dei paesi dell'Unione Europea in quella di un altro stato utilizzando l'euro come intermediario (triangolazione). Le valute disponibili per la conversione sono quelle dei paesi membri dell'Unione Europea che hanno adottato l'euro. La funzione utilizza tassi di conversione fissi stabiliti dall'Unione Europea.",
		abstract: "Consente di convertire un numero in euro, un valore dal formato euro a un formato in una valuta dei paesi membri dell'Unione Europea, oppure un valore da una delle valute dei paesi dell'Unione Europea in quella di un altro stato utilizzando l'euro come intermediario (triangolazione). Le valute disponibili per la conversione sono quelle dei paesi membri dell'Unione Europea che hanno adottato l'euro. La funzione utilizza tassi di conversione fissi stabiliti dall'Unione Europea.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/euroconvert-function"
		}],
		functionParameter: {
			number: {
				name: "num",
				detail: "Obbligatorio. Valore in valuta da convertire oppure riferimento a una cella che contiene il valore."
			},
			source: {
				name: "Fonte",
				detail: "Obbligatorio. Stringa di tre lettere oppure riferimento a una cella che contiene la stringa che corrisponde al codice ISO della valuta di origine. Di seguito è riportato un elenco dei codici disponibili per la funzione EUROCONVERT:"
			},
			target: {
				name: "Bersaglio",
				detail: "Obbligatorio. Stringa di tre lettere o riferimento a una cella che corrisponde al codice ISO della valuta in cui convertire il valore di origine. Per un elenco dei codici ISO, vedere la tabella precedente relativa ai codici di origine."
			},
			fullPrecision: {
				name: "Full_precision",
				detail: "Obbligatorio. Valore logico (VERO o FALSO) oppure espressione che dà come risultato un valore VERO o FALSO, in relazione all'arrotondamento del risultato."
			},
			triangulationPrecision: {
				name: "Triangulation_precision",
				detail: "Obbligatorio. Intero uguale o maggiore di 3 che specifica il numero di cifre significative da utilizzare per il valore intermedio dell'euro in caso di conversione tra due valute di paesi membri dell'Unione Europea che hanno adottato l'euro. Se si omette tale argomento, il valore intermedio dell'euro non verrà arrotondato. Se si include questo argomento per la conversione in euro da una valuta di uno stato membro, verrà calcolato il valore intermedio dell'euro che potrà quindi essere utilizzato per la conversione nella valuta di un altro stato membro."
			}
		}
	},
	REGISTER_ID: {
		description: "Restituisce l'identificatore della DLL (Libreria a collegamento dinamico, Dynamic Link Library) o della risorsa codice specificata che è stata registrata in precedenza. Qualora la registrazione del DLL o della risorsa non sia stata effettuata, la funzione provvederà ad eseguire l'operazione, quindi visualizzerà l'identificatore.",
		abstract: "Restituisce l'identificatore della DLL (Libreria a collegamento dinamico, Dynamic Link Library) o della risorsa codice specificata che è stata registrata in precedenza. Qualora la registrazione del DLL o della risorsa non sia stata effettuata, la funzione provvederà ad eseguire l'operazione, quindi visualizzerà l'identificatore.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/register-id-function"
		}],
		functionParameter: {
			moduleText: {
				name: "Module_text",
				detail: "Obbligatorio. Testo che specifica il nome della DLL che contiene la funzione in Microsoft Excel per Windows."
			},
			procedure: {
				name: "Procedura",
				detail: "Obbligatorio. Testo che specifica il nome della funzione nella DLL di Microsoft Excel per Windows. È inoltre possibile utilizzare il valore ordinale della funzione proveniente dall'istruzione EXPORTS nel file DEF (File di definizione dei moduli, Module-Definition File). Il valore ordinale o il numero ID della risorsa non devono essere in formato testo."
			},
			typeText: {
				name: "Type_text",
				detail: "Opzionale. Testo che specifica il tipo di dati del valore restituito e i tipi di dati di tutti gli argomenti per la DLL. La prima lettera di tipo specifica il valore restituito. Se la funzione o la risorsa codice è già stata registrata, sarà possibile omettere questo argomento."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/univer/it-IT.ts
const locale$2 = {};

//#endregion
//#region src/locale/function-list/web/it-IT.ts
const locale$1 = {
	ENCODEURL: {
		description: "La funzione CODIFICA.URL restituisce una stringa con codifica URL, sostituendo alcuni caratteri non alfanumerici con il simbolo percentuale (%) e un numero esadecimale.",
		abstract: "La funzione CODIFICA.URL restituisce una stringa con codifica URL, sostituendo alcuni caratteri non alfanumerici con il simbolo percentuale (%) e un numero esadecimale.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/encodeurl-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Stringa da codificare per l'URL"
		} }
	},
	FILTERXML: {
		description: "La funzione FILTERXML restituisce dati specifici dal contenuto XML usando il percorso x specificato.",
		abstract: "La funzione FILTERXML restituisce dati specifici dal contenuto XML usando il percorso x specificato.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/filterxml-function"
		}],
		functionParameter: {
			xml: {
				name: "xml",
				detail: "Stringa in formato XML valido."
			},
			xpath: {
				name: "xpath",
				detail: "Stringa in formato XPath standard."
			}
		}
	},
	WEBSERVICE: {
		description: "La funzione SERVIZIO.WEB restituisce dati da un servizio Web su Internet o Intranet.",
		abstract: "La funzione SERVIZIO.WEB restituisce dati da un servizio Web su Internet o Intranet.",
		links: [{
			title: "Istruzioni",
			url: "https://support.microsoft.com/it-it/excel/functions/webservice-function"
		}],
		functionParameter: { url: {
			name: "url",
			detail: "L’URL del servizio Web."
		} }
	}
};

//#endregion
//#region src/locale/it-IT.ts
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