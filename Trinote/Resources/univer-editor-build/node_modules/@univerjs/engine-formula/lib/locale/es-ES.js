//#region src/locale/function-list/array/es-ES.ts
const locale$15 = {
	ARRAY_CONSTRAIN: {
		description: "Restringe un resultado de matriz a un tamaño especificado.",
		abstract: "Restringe un resultado de matriz a un tamaño especificado.",
		links: [{
			title: "Instrucción",
			url: "https://support.google.com/docs/answer/3267036?hl=es"
		}],
		functionParameter: {
			inputRange: {
				name: "rango_entrada",
				detail: "ARRAY_CONSTRAIN(SORT(A1:F100, 1, TRUE), 10, 6)"
			},
			numRows: {
				name: "num_filas",
				detail: "El número de filas que debe contener el resultado."
			},
			numCols: {
				name: "num_columnas",
				detail: "El número de columnas que debe contener el resultado"
			}
		}
	},
	FLATTEN: {
		description: "Combina todos los valores de uno o varios intervalos en una sola columna.",
		abstract: "Combina todos los valores de uno o varios intervalos en una sola columna.",
		links: [{
			title: "Instrucción",
			url: "https://support.google.com/docs/answer/10307761?hl=es"
		}],
		functionParameter: {
			range1: {
				name: "rango1",
				detail: "Es el primer intervalo que se va a combinar."
			},
			range2: {
				name: "rango2",
				detail: "[opcional] repetible Otros intervalos que se pueden combinar."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/compatibility/es-ES.ts
const locale$14 = {
	BETADIST: {
		description: "Devuelve la probabilidad para una variable aleatoria continua siguiendo una función de densidad de probabilidad beta acumulativa. La distribución beta se usa generalmente para estudiar las variaciones, a través de varias muestras, de un porcentaje que representa algún fenómeno, por ejemplo, el tiempo diario que la gente dedica a mirar televisión.",
		abstract: "Devuelve la probabilidad para una variable aleatoria continua siguiendo una función de densidad de probabilidad beta acumulativa. La distribución beta se usa generalmente para estudiar las variaciones, a través de varias muestras, de un porcentaje que representa algún fenómeno, por ejemplo, el tiempo diario que la gente dedica a mirar televisión.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/betadist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obligatorio. Valor, comprendido entre A y B, con el que se debe evaluar la función."
			},
			alpha: {
				name: "alfa",
				detail: "Obligatorio. Un parámetro de la distribución."
			},
			beta: {
				name: "beta",
				detail: "Obligatorio. Un parámetro de la distribución."
			},
			A: {
				name: "A",
				detail: "Opcional. Un límite inferior del intervalo de x."
			},
			B: {
				name: "B",
				detail: "Opcional. Un límite superior del intervalo de x."
			}
		}
	},
	BETAINV: {
		description: "Devuelve la función inversa de la función de densidad de probabilidad beta acumulativa de una distribución beta especificada. Es decir, si el argumento probabilidad = DISTR.BETA(x;...), entonces DISTR.BETA.INV(probabilidad;...) = x. La distribución beta puede emplearse en la organización de proyectos para crear modelos con fechas de finalización probables, de acuerdo con un plazo de finalización y variabilidad esperados.",
		abstract: "Devuelve la función inversa de la función de densidad de probabilidad beta acumulativa de una distribución beta especificada. Es decir, si el argumento probabilidad = DISTR.BETA(x;...), entonces DISTR.BETA.INV(probabilidad;...) = x. La distribución beta puede emplearse en la organización de proyectos para crear modelos con fechas de finalización probables, de acuerdo con un plazo de finalización y variabilidad esperados.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/betainv-function"
		}],
		functionParameter: {
			probability: {
				name: "probabilidad",
				detail: "Obligatorio. Una probabilidad asociada con la distribución beta."
			},
			alpha: {
				name: "alfa",
				detail: "Obligatorio. Un parámetro de la distribución."
			},
			beta: {
				name: "beta",
				detail: "Obligatorio. Un parámetro de la distribución."
			},
			A: {
				name: "A",
				detail: "Opcional. Un límite inferior del intervalo de x."
			},
			B: {
				name: "B",
				detail: "Opcional. Un límite superior del intervalo de x."
			}
		}
	},
	BINOMDIST: {
		description: "Devuelve la probabilidad de una variable aleatoria discreta siguiendo una distribución binomial. Use DISTR.BINOM en problemas con un número fijo de pruebas o ensayos, cuando los resultados de un ensayo son solo éxito o fracaso, cuando los ensayos son independientes y cuando la probabilidad de éxito es constante durante todo el experimento. Por ejemplo, DISTR.BINOM puede calcular la probabilidad de que dos de los próximos tres bebés que nazcan sean hombres.",
		abstract: "Devuelve la probabilidad de una variable aleatoria discreta siguiendo una distribución binomial. Use DISTR.BINOM en problemas con un número fijo de pruebas o ensayos, cuando los resultados de un ensayo son solo éxito o fracaso, cuando los ensayos son independientes y cuando la probabilidad de éxito es constante durante todo el experimento. Por ejemplo, DISTR.BINOM puede calcular la probabilidad de que dos de los próximos tres bebés que nazcan sean hombres.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/binomdist-function"
		}],
		functionParameter: {
			numberS: {
				name: "núm_éxito",
				detail: "Obligatorio. El número de éxitos en los ensayos."
			},
			trials: {
				name: "ensayos",
				detail: "Obligatorio. El número de ensayos independientes."
			},
			probabilityS: {
				name: "prob_éxito",
				detail: "Obligatorio. La probabilidad de éxito en cada ensayo."
			},
			cumulative: {
				name: "acumulado",
				detail: "Obligatorio. Un valor lógico que determina la forma de la función. Si el argumento acumulado es VERDADERO, DISTR.BINOM devuelve la función de distribución acumulativa, que es la probabilidad de que exista el máximo número de éxitos; si es FALSO, devuelve la función de masa de probabilidad, que es la probabilidad de que un evento se reproduzca un número de veces igual al argumento núm_éxito."
			}
		}
	},
	CHIDIST: {
		description: "Devuelve la probabilidad de cola derecha de la distribución chi cuadrado. La distribución χ2 está asociada a una prueba χ2. Use la prueba χ2 para comparar los valores observados con los esperados. Por ejemplo, un experimento genético podría formular la hipótesis de que la próxima generación de plantas presentará un conjunto determinado de colores. Al comparar los resultados observados con los resultados esperados, puede decidir si su hipótesis original es válida.",
		abstract: "Devuelve la probabilidad de cola derecha de la distribución chi cuadrado. La distribución χ2 está asociada a una prueba χ2. Use la prueba χ2 para comparar los valores observados con los esperados. Por ejemplo, un experimento genético podría formular la hipótesis de que la próxima generación de plantas presentará un conjunto determinado de colores. Al comparar los resultados observados con los resultados esperados, puede decidir si su hipótesis original es válida.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/chidist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obligatorio. El valor en el que se desea evaluar la distribución."
			},
			degFreedom: {
				name: "grados_libertad",
				detail: "Obligatorio. El número de grados de libertad."
			}
		}
	},
	CHIINV: {
		description: "Devuelve el inverso de una probabilidad dada, de una cola derecha, en una distribución chi cuadrado. Si la probabilidad = DISTR.CHI(x;...), PRUEBA.CHI.INV(probabilidad;...) = x. Use esta función para comparar los resultados observados con los esperados y determinar si la hipótesis original es válida.",
		abstract: "Devuelve el inverso de una probabilidad dada, de una cola derecha, en una distribución chi cuadrado. Si la probabilidad = DISTR.CHI(x;...), PRUEBA.CHI.INV(probabilidad;...) = x. Use esta función para comparar los resultados observados con los esperados y determinar si la hipótesis original es válida.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/chiinv-function"
		}],
		functionParameter: {
			probability: {
				name: "probabilidad",
				detail: "Obligatorio. Una probabilidad asociada con la distribución chi cuadrado."
			},
			degFreedom: {
				name: "grados_libertad",
				detail: "Obligatorio. El número de grados de libertad."
			}
		}
	},
	CHITEST: {
		description: "Devuelve la prueba de independencia. PRUEBA.CHI devuelve el valor de la distribución chi cuadrado (χ2) para la estadística y los grados de libertad apropiados. Las pruebas χ2 pueden usarse para determinar si un experimento se ajusta a los resultados teóricos.",
		abstract: "Devuelve la prueba de independencia. PRUEBA.CHI devuelve el valor de la distribución chi cuadrado (χ2) para la estadística y los grados de libertad apropiados. Las pruebas χ2 pueden usarse para determinar si un experimento se ajusta a los resultados teóricos.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/chitest-function"
		}],
		functionParameter: {
			actualRange: {
				name: "rango_real",
				detail: "Obligatorio. El rango de datos que contiene las observaciones que se contrastarán con los valores esperados."
			},
			expectedRange: {
				name: "rango_esperado",
				detail: "Obligatorio. El rango de datos que contiene la relación del producto de los totales de filas y columnas con el total global."
			}
		}
	},
	CONFIDENCE: {
		description: "Devuelve el intervalo de confianza para la media de una población con distribución normal.",
		abstract: "Devuelve el intervalo de confianza para la media de una población con distribución normal.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/confidence-function"
		}],
		functionParameter: {
			alpha: {
				name: "alfa",
				detail: "Obligatorio. El nivel de significación usado para calcular el nivel de confianza. El nivel de confianza es igual a 100*(1 - alfa)%, es decir, un alfa de 0,05 indica un nivel de confianza del 95%."
			},
			standardDev: {
				name: "desv_estándar",
				detail: "Obligatorio. La desviación estándar de la población para el rango de datos; se presupone que es conocida."
			},
			size: {
				name: "tamaño",
				detail: "Obligatorio. El tamaño de la muestra."
			}
		}
	},
	COVAR: {
		description: "Devuelve la covarianza, el promedio de los productos de las desviaciones para cada pareja de puntos de datos en dos conjuntos de datos.",
		abstract: "Devuelve la covarianza, el promedio de los productos de las desviaciones para cada pareja de puntos de datos en dos conjuntos de datos.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/covar-function"
		}],
		functionParameter: {
			array1: {
				name: "matriz1",
				detail: "Obligatorio. El primer rango de celdas de números enteros."
			},
			array2: {
				name: "matriz2",
				detail: "Obligatorio. El segundo rango de celdas de números enteros."
			}
		}
	},
	CRITBINOM: {
		description: "Devuelve el menor valor cuya distribución binomial acumulativa es menor o igual que un valor de criterio. Use esta función en aplicaciones de control de calidad. Por ejemplo, use BINOM.CRIT para determinar el mayor número de piezas defectuosas que una cadena de montaje pueda producir sin tener por ello que rechazar todo el lote.",
		abstract: "Devuelve el menor valor cuya distribución binomial acumulativa es menor o igual que un valor de criterio. Use esta función en aplicaciones de control de calidad. Por ejemplo, use BINOM.CRIT para determinar el mayor número de piezas defectuosas que una cadena de montaje pueda producir sin tener por ello que rechazar todo el lote.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/critbinom-function"
		}],
		functionParameter: {
			trials: {
				name: "ensayos",
				detail: "Obligatorio. El número de ensayos de Bernoulli."
			},
			probabilityS: {
				name: "prob_éxito",
				detail: "Obligatorio. La probabilidad de éxito en cada ensayo."
			},
			alpha: {
				name: "alfa",
				detail: "Obligatorio. El valor del criterio."
			}
		}
	},
	EXPONDIST: {
		description: "Devuelve la distribución exponencial. Use DISTR.EXP para establecer el tiempo entre eventos, como el tiempo que tarda un cajero automático en entregar el efectivo. Por ejemplo, la función DISTR.EXP puede usarse para determinar la probabilidad de que el proceso tarde un minuto como máximo.",
		abstract: "Devuelve la distribución exponencial. Use DISTR.EXP para establecer el tiempo entre eventos, como el tiempo que tarda un cajero automático en entregar el efectivo. Por ejemplo, la función DISTR.EXP puede usarse para determinar la probabilidad de que el proceso tarde un minuto como máximo.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/expondist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obligatorio. Es el valor de la función."
			},
			lambda: {
				name: "lambda",
				detail: "Obligatorio. Es el valor del parámetro."
			},
			cumulative: {
				name: "acumulado",
				detail: "Obligatorio. Es un valor lógico que indica la forma de la función exponencial que va a aplicar. Si el valor de acum es VERDADERO, DISTR.EXP devuelve la función de distribución acumulativa; si es FALSO, devuelve la función de densidad de probabilidad."
			}
		}
	},
	FDIST: {
		description: "Devuelve la distribución de probabilidad F (grado de diversidad) (de cola derecha) de dos conjuntos de datos. Use esta función para determinar si dos conjuntos de datos tienen diferentes grados de diversidad. Por ejemplo, para examinar los resultados de los exámenes de acceso a la enseñanza secundaria de mujeres y hombres, y determinar si la variabilidad entre las mujeres es diferente de la de los hombres.",
		abstract: "Devuelve la distribución de probabilidad F (grado de diversidad) (de cola derecha) de dos conjuntos de datos. Use esta función para determinar si dos conjuntos de datos tienen diferentes grados de diversidad. Por ejemplo, para examinar los resultados de los exámenes de acceso a la enseñanza secundaria de mujeres y hombres, y determinar si la variabilidad entre las mujeres es diferente de la de los hombres.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/fdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obligatorio. Es el valor en el que desea evaluar la función."
			},
			degFreedom1: {
				name: "grados_libertad1",
				detail: "Obligatorio. Es el número de grados de libertad del numerador."
			},
			degFreedom2: {
				name: "grados_libertad2",
				detail: "Obligatorio. Es el número de grados de libertad del denominador."
			}
		}
	},
	FINV: {
		description: "Devuelve el inverso de la distribución de probabilidad F (de cola derecha). Si p = DISTR.F(x,...), entonces DISTR.F.INV(p,...) = x.",
		abstract: "Devuelve el inverso de la distribución de probabilidad F (de cola derecha). Si p = DISTR.F(x,...), entonces DISTR.F.INV(p,...) = x.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/finv-function"
		}],
		functionParameter: {
			probability: {
				name: "probabilidad",
				detail: "Obligatorio. Es una probabilidad asociada a la distribución acumulativa F."
			},
			degFreedom1: {
				name: "grados_libertad1",
				detail: "Obligatorio. Es el número de grados de libertad del numerador."
			},
			degFreedom2: {
				name: "grados_libertad2",
				detail: "Obligatorio. Es el número de grados de libertad del denominador."
			}
		}
	},
	FTEST: {
		description: "Devuelve el resultado de una prueba F. Una prueba F devuelve la probabilidad de dos colas de que las varianzas de matriz1 y matriz2 no sean significativamente diferentes. Use esta función para determinar si las varianzas de dos muestras son diferentes. Por ejemplo, dados los resultados de los exámenes de escuelas públicas y privadas, puede comprobar si estas escuelas tienen distintos niveles de diversidad en los resultados.",
		abstract: "Devuelve el resultado de una prueba F. Una prueba F devuelve la probabilidad de dos colas de que las varianzas de matriz1 y matriz2 no sean significativamente diferentes. Use esta función para determinar si las varianzas de dos muestras son diferentes. Por ejemplo, dados los resultados de los exámenes de escuelas públicas y privadas, puede comprobar si estas escuelas tienen distintos niveles de diversidad en los resultados.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/ftest-function"
		}],
		functionParameter: {
			array1: {
				name: "matriz1",
				detail: "Obligatorio. Es la primera matriz o rango de datos."
			},
			array2: {
				name: "matriz2",
				detail: "Obligatorio. Es la segunda matriz o rango de datos."
			}
		}
	},
	GAMMADIST: {
		description: "Devuelve la distribución gamma. Use esta función para estudiar variables cuya distribución podría ser sesgada. La distribución gamma es de uso corriente en análisis de las colas de espera.",
		abstract: "Devuelve la distribución gamma. Use esta función para estudiar variables cuya distribución podría ser sesgada. La distribución gamma es de uso corriente en análisis de las colas de espera.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/gammadist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obligatorio. El valor en el que se desea evaluar la distribución."
			},
			alpha: {
				name: "alfa",
				detail: "Obligatorio. Es un parámetro de la distribución."
			},
			beta: {
				name: "beta",
				detail: "Obligatorio. Es un parámetro de la distribución. Si beta = 1, DISTR.GAMMA devuelve la distribución gamma estándar."
			},
			cumulative: {
				name: "acumulado",
				detail: "Obligatorio. Es un valor lógico que determina la forma de la función. Si el argumento acumulado es VERDADERO, DISTR.GAMMA devuelve la función de distribución acumulativa; si es FALSO, devuelve la función de densidad de probabilidad."
			}
		}
	},
	GAMMAINV: {
		description: "Devuelve el inverso de la distribución gamma acumulativa. Si p = DISTR.GAMMA(x,...), entonces DISTR.GAMMA.INV(p,...) = x. Use esta función para estudiar variables cuya distribución puede ser sesgada.",
		abstract: "Devuelve el inverso de la distribución gamma acumulativa. Si p = DISTR.GAMMA(x,...), entonces DISTR.GAMMA.INV(p,...) = x. Use esta función para estudiar variables cuya distribución puede ser sesgada.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/gammainv-function"
		}],
		functionParameter: {
			probability: {
				name: "probabilidad",
				detail: "Obligatorio. Es la probabilidad asociada con la distribución gamma."
			},
			alpha: {
				name: "alfa",
				detail: "Obligatorio. Es un parámetro de la distribución."
			},
			beta: {
				name: "beta",
				detail: "Obligatorio. Un parámetro de la distribución. Si beta = 1, DISTR.GAMMA.INV devuelve la distribución gamma estándar."
			}
		}
	},
	HYPGEOMDIST: {
		description: "Devuelve la distribución hipergeométrica. La función DISTR.HIPERGEOM devuelve la probabilidad de obtener un número determinado de \"éxitos\" en una muestra, conocidos el tamaño de la muestra, el número de éxitos de la población y el tamaño de la población. Use DISTR.HIPERGEOM en problemas con una población finita, donde cada observación sea un éxito o un fracaso, y pueda elegir cada subconjunto de un tamaño determinado con la misma probabilidad.",
		abstract: "Devuelve la distribución hipergeométrica. La función DISTR.HIPERGEOM devuelve la probabilidad de obtener un número determinado de \"éxitos\" en una muestra, conocidos el tamaño de la muestra, el número de éxitos de la población y el tamaño de la población. Use DISTR.HIPERGEOM en problemas con una población finita, donde cada observación sea un éxito o un fracaso, y pueda elegir cada subconjunto de un tamaño determinado con la misma probabilidad.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/hypgeomdist-function"
		}],
		functionParameter: {
			sampleS: {
				name: "muestra_éxito",
				detail: "Obligatorio. Es el número de éxitos en la muestra."
			},
			numberSample: {
				name: "núm_muestra",
				detail: "Obligatorio. Es el tamaño de la muestra."
			},
			populationS: {
				name: "población_éxito",
				detail: "Obligatorio. Es el número de éxitos en la población."
			},
			numberPop: {
				name: "núm_población",
				detail: "Obligatorio. Es el tamaño de la población."
			}
		}
	},
	LOGINV: {
		description: "Devuelve el inverso de la función de distribución logarítmico-normal acumulativa de x, donde ln(x) se distribuye normalmente con los parámetros media y desv_estándar. Si p = DISTR.LOG.NORM(x,...) entonces DISTR.LOG.INV(p,...) = x.",
		abstract: "Devuelve el inverso de la función de distribución logarítmico-normal acumulativa de x, donde ln(x) se distribuye normalmente con los parámetros media y desv_estándar. Si p = DISTR.LOG.NORM(x,...) entonces DISTR.LOG.INV(p,...) = x.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/loginv-function"
		}],
		functionParameter: {
			probability: {
				name: "probabilidad",
				detail: "Obligatorio. Es la probabilidad asociada con la distribución logarítmica normal."
			},
			mean: {
				name: "media",
				detail: "Obligatorio. Es la media de In(x)."
			},
			standardDev: {
				name: "desv_estándar",
				detail: "Obligatorio. Es la desviación estándar de In(x)."
			}
		}
	},
	LOGNORMDIST: {
		description: "Devuelve la distribución logarítmico-normal acumulativa de x, donde ln(x) se distribuye normalmente con los parámetros media y desv_estándar. Use esta función para analizar datos que se han transformado logarítmicamente.",
		abstract: "Devuelve la distribución logarítmico-normal acumulativa de x, donde ln(x) se distribuye normalmente con los parámetros media y desv_estándar. Use esta función para analizar datos que se han transformado logarítmicamente.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/lognormdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obligatorio. Es el valor en el que desea evaluar la función."
			},
			mean: {
				name: "media",
				detail: "Obligatorio. Es la media de In(x)."
			},
			standardDev: {
				name: "desv_estándar",
				detail: "Obligatorio. Es la desviación estándar de In(x)."
			}
		}
	},
	MODE: {
		description: "Supongamos que desea conocer el número más común de especies de aves observadas en una muestra de recuentos de aves en un humedal crítico durante un período de tiempo de 30 años, o desea conocer el número de llamadas telefónicas que se producen con más frecuencia en un centro de soporte telefónico durante las horas de poca actividad. Para calcular el modo de un grupo de números, use la función MODA .",
		abstract: "Supongamos que desea conocer el número más común de especies de aves observadas en una muestra de recuentos de aves en un humedal crítico durante un período de tiempo de 30 años, o desea conocer el número de llamadas telefónicas que se producen con más frecuencia en un centro de soporte telefónico durante las horas de poca actividad. Para calcular el modo de un grupo de números, use la función MODA .",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/mode-function"
		}],
		functionParameter: {
			number1: {
				name: "número1",
				detail: "Obligatorio. Es el primer argumento numérico para el que desea calcular la moda."
			},
			number2: {
				name: "número2",
				detail: "Opcional. De 2 a 255 argumentos numéricos cuya moda desea calcular. También puede usar una matriz única o una referencia de matriz en lugar de argumentos separados por comas."
			}
		}
	},
	NEGBINOMDIST: {
		description: "Devuelve la distribución binomial negativa. NEGBINOMDIST devuelve la probabilidad de obtener un valor de núm_fracasos antes que de núm_éxitos, con una probabilidad constante de éxitos de prob_éxito. Esta función es similar a la distribución binomial, con la excepción de que el número de éxitos es fijo y el número de ensayos es variable. Al igual que la distribución binomial, se supone que los ensayos son independientes.",
		abstract: "Devuelve la distribución binomial negativa. NEGBINOMDIST devuelve la probabilidad de obtener un valor de núm_fracasos antes que de núm_éxitos, con una probabilidad constante de éxitos de prob_éxito. Esta función es similar a la distribución binomial, con la excepción de que el número de éxitos es fijo y el número de ensayos es variable. Al igual que la distribución binomial, se supone que los ensayos son independientes.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/negbinomdist-function"
		}],
		functionParameter: {
			numberF: {
				name: "núm_fracasos",
				detail: "Obligatorio. Es el número de fracasos."
			},
			numberS: {
				name: "núm_éxitos",
				detail: "Obligatorio. Es el número límite de éxitos."
			},
			probabilityS: {
				name: "prob_éxito",
				detail: "Obligatorio. Es la probabilidad de obtener un éxito."
			}
		}
	},
	NORMDIST: {
		description: "La función DISTR.NORM devuelve la distribución normal para la media y desviación estándar especificadas. Esta función tiene una amplia gama de aplicaciones en estadísticas, incluidas las pruebas de hipótesis.",
		abstract: "La función DISTR.NORM devuelve la distribución normal para la media y desviación estándar especificadas. Esta función tiene una amplia gama de aplicaciones en estadísticas, incluidas las pruebas de hipótesis.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/normdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obligatorio. El valor para el que desea la distribución"
			},
			mean: {
				name: "media",
				detail: "Obligatorio. La media aritmética de la distribución"
			},
			standardDev: {
				name: "desv_estándar",
				detail: "Obligatorio. La desviación estándar de la distribución"
			},
			cumulative: {
				name: "acumulado",
				detail: "Obligatorio. Es un valor lógico que determina la forma de la función. Si el argumento acumulado es VERDADERO, DISTR.NORM devuelve la función de distribución acumulativa; si el argumento acumulado es FALSO, devuelve la función de masa de probabilidad."
			}
		}
	},
	NORMINV: {
		description: "Devuelve el inverso de la distribución normal acumulativa para la media y desviación estándar especificadas.",
		abstract: "Devuelve el inverso de la distribución normal acumulativa para la media y desviación estándar especificadas.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/norminv-function"
		}],
		functionParameter: {
			probability: {
				name: "probabilidad",
				detail: "Obligatorio. Es una probabilidad correspondiente a la distribución normal."
			},
			mean: {
				name: "media",
				detail: "Obligatorio. Es la media aritmética de la distribución."
			},
			standardDev: {
				name: "desv_estándar",
				detail: "Obligatorio. Es la desviación estándar de la distribución."
			}
		}
	},
	NORMSDIST: {
		description: "Devuelve la función de distribución normal estándar acumulativa. La distribución tiene una media de 0 (cero) y una desviación estándar de uno. Use esta función en lugar de una tabla estándar de áreas de curvas normales.",
		abstract: "Devuelve la función de distribución normal estándar acumulativa. La distribución tiene una media de 0 (cero) y una desviación estándar de uno. Use esta función en lugar de una tabla estándar de áreas de curvas normales.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/normsdist-function"
		}],
		functionParameter: { z: {
			name: "z",
			detail: "Obligatorio. Es el valor cuya distribución desea obtener."
		} }
	},
	NORMSINV: {
		description: "Devuelve el inverso de la distribución normal estándar acumulativa. La distribución tiene una media de cero y una desviación estándar de uno.",
		abstract: "Devuelve el inverso de la distribución normal estándar acumulativa. La distribución tiene una media de cero y una desviación estándar de uno.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/normsinv-function"
		}],
		functionParameter: { probability: {
			name: "probabilidad",
			detail: "Obligatorio. Es una probabilidad correspondiente a la distribución normal."
		} }
	},
	PERCENTILE: {
		description: "Devuelve el k-ésimo percentil de los valores de un rango. Esta función permite establecer un umbral de aceptación. Por ejemplo, podrá examinar a los candidatos cuya calificación sea superior al nonagésimo percentil.",
		abstract: "Devuelve el k-ésimo percentil de los valores de un rango. Esta función permite establecer un umbral de aceptación. Por ejemplo, podrá examinar a los candidatos cuya calificación sea superior al nonagésimo percentil.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/percentile-function"
		}],
		functionParameter: {
			array: {
				name: "matriz",
				detail: "Obligatorio. Es la matriz o el rango de datos que define la posición relativa."
			},
			k: {
				name: "k",
				detail: "Obligatorio. Es el valor de percentil en el rango de 0 a 1, ambos incluidos."
			}
		}
	},
	PERCENTRANK: {
		description: "La función RANGO.PERCENTIL devuelve la jerarquía de un valor en un conjunto de datos como un porcentaje del conjunto de datos( básicamente, la posición relativa de un valor dentro de todo el conjunto de datos). Por ejemplo, puede usar RANGO.PERCENTIL para determinar la posición del resultado de una prueba individual entre el campo de todos los resultados de la misma prueba.",
		abstract: "La función RANGO.PERCENTIL devuelve la jerarquía de un valor en un conjunto de datos como un porcentaje del conjunto de datos( básicamente, la posición relativa de un valor dentro de todo el conjunto de datos). Por ejemplo, puede usar RANGO.PERCENTIL para determinar la posición del resultado de una prueba individual entre el campo de todos los resultados de la misma prueba.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/percentrank-function"
		}],
		functionParameter: {
			array: {
				name: "matriz",
				detail: "Obligatorio. El rango de datos (o matriz predefinida) de valores numéricos dentro del cual se determina el rango de porcentaje."
			},
			x: {
				name: "x",
				detail: "Obligatorio. Es el valor cuyo rango dentro de la matriz desea conocer."
			},
			significance: {
				name: "cifras_significativas",
				detail: "Opcional. Es un valor opcional que identifica el número de cifras significativas para el valor de porcentaje devuelto. Si omite este argumento, RANGO.PERCENTIL usa tres dígitos (0,xxx)."
			}
		}
	},
	POISSON: {
		description: "Devuelve la distribución de Poisson. Una de las aplicaciones comunes de la distribución de Poisson es la predicción del número de eventos en un determinado período de tiempo, como por ejemplo, el número de automóviles que se presenta a una zona de peaje en el intervalo de un minuto.",
		abstract: "Devuelve la distribución de Poisson. Una de las aplicaciones comunes de la distribución de Poisson es la predicción del número de eventos en un determinado período de tiempo, como por ejemplo, el número de automóviles que se presenta a una zona de peaje en el intervalo de un minuto.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/poisson-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obligatorio. Es el número de eventos."
			},
			mean: {
				name: "media",
				detail: "Obligatorio. Es el valor numérico esperado."
			},
			cumulative: {
				name: "acumulado",
				detail: "Obligatorio. Es un valor lógico que determina la forma de la distribución de probabilidad devuelta. Si el argumento acumulado es VERDADERO, POISSON devuelve la probabilidad de Poisson de que un evento aleatorio ocurra un número de veces comprendido entre 0 y x, ambos incluidos; si el argumento acumulado es FALSO, la función devuelve la probabilidad de Poisson de que un evento ocurra exactamente x veces."
			}
		}
	},
	QUARTILE: {
		description: "Devuelve el cuartil de un conjunto de datos. Los cuartiles se usan con frecuencia en los datos de ventas y encuestas para dividir las poblaciones en grupos. Por ejemplo, use la función CUARTIL para determinar el 25 por ciento de ingresos más altos en una población.",
		abstract: "Devuelve el cuartil de un conjunto de datos. Los cuartiles se usan con frecuencia en los datos de ventas y encuestas para dividir las poblaciones en grupos. Por ejemplo, use la función CUARTIL para determinar el 25 por ciento de ingresos más altos en una población.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/quartile-function"
		}],
		functionParameter: {
			array: {
				name: "matriz",
				detail: "Obligatorio. Es la matriz o el rango de celdas de valores numéricos cuyo cuartil desea obtener."
			},
			quart: {
				name: "cuartil",
				detail: "Obligatorio. Indica el valor que se devolverá."
			}
		}
	},
	RANK: {
		description: "Devuelve la jerarquía de un número en una lista de números. La jerarquía de un número es su tamaño en comparación con otros valores de la lista. (Si ordenara la lista, la jerarquía del número sería su posición.)",
		abstract: "Devuelve la jerarquía de un número en una lista de números. La jerarquía de un número es su tamaño en comparación con otros valores de la lista. (Si ordenara la lista, la jerarquía del número sería su posición.)",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/rank-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "Obligatorio. Es el número cuya jerarquía (clasificación) desea conocer."
			},
			ref: {
				name: "ref",
				detail: "Obligatorio. Es una referencia a una lista de números. Los valores no numéricos se pasan por alto."
			},
			order: {
				name: "orden",
				detail: "Opcional. Es un número que especifica cómo clasificar el argumento número. Si omite el argumento orden o es 0 (cero), Microsoft Excel determina la jerarquía de un número como si la lista definida por el argumento referencia se ordenara en forma descendente. Si el argumento orden es diferente de cero, Microsoft Excel determina la jerarquía de un número como si la lista definida por el argumento referencia se ordenara en forma ascendente."
			}
		}
	},
	STDEV: {
		description: "Calcula la desviación estándar de una muestra. La desviación estándar es la medida de la dispersión de los valores respecto a la media (valor promedio).",
		abstract: "Calcula la desviación estándar de una muestra. La desviación estándar es la medida de la dispersión de los valores respecto a la media (valor promedio).",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/stdev-function"
		}],
		functionParameter: {
			number1: {
				name: "número1",
				detail: "Obligatorio. Es el primer argumento numérico correspondiente a una muestra de una población."
			},
			number2: {
				name: "número2",
				detail: "Opcional. De 2 a 255 argumentos numéricos correspondientes a una muestra de una población. También puede usar una matriz única o una referencia de matriz en lugar de argumentos separados por comas."
			}
		}
	},
	STDEVP: {
		description: "Calcula la desviación estándar de la población total determinada por los argumentos. La desviación estándar es la medida de la dispersión de los valores respecto a la media (valor promedio).",
		abstract: "Calcula la desviación estándar de la población total determinada por los argumentos. La desviación estándar es la medida de la dispersión de los valores respecto a la media (valor promedio).",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/stdevp-function"
		}],
		functionParameter: {
			number1: {
				name: "número1",
				detail: "Obligatorio. Es el primer argumento numérico correspondiente a una población."
			},
			number2: {
				name: "número2",
				detail: "Opcional. De 2 a 255 argumentos numéricos correspondientes a una población. También puede usar una matriz única o una referencia de matriz en lugar de argumentos separados por comas."
			}
		}
	},
	TDIST: {
		description: "Devuelve los puntos porcentuales (probabilidad) de la distribución t de Student, donde un valor numérico (x) es un valor calculado de t para el que debe calcular los puntos porcentuales. Puede usar la distribución t de Student para comprobar pruebas de hipótesis cuando el tamaño de la muestra es pequeño. Use esta función en lugar de una tabla de valores críticos para la distribución t.",
		abstract: "Devuelve los puntos porcentuales (probabilidad) de la distribución t de Student, donde un valor numérico (x) es un valor calculado de t para el que debe calcular los puntos porcentuales. Puede usar la distribución t de Student para comprobar pruebas de hipótesis cuando el tamaño de la muestra es pequeño. Use esta función en lugar de una tabla de valores críticos para la distribución t.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/tdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obligatorio. Es el valor numérico al que debe evaluar la distribución."
			},
			degFreedom: {
				name: "grados_libertad",
				detail: "Obligatorio. Es un número entero que indica el número de grados de libertad."
			},
			tails: {
				name: "colas",
				detail: "Obligatorio. Especifica el número de colas de la distribución que deben devolverse. Si colas = 1, DISTR.T devuelve la distribución de una cola. Si colas = 2, DISTR.T devuelve la distribución de dos colas."
			}
		}
	},
	TINV: {
		description: "Devuelve el inverso de la distribución t de Student de dos colas.",
		abstract: "Devuelve el inverso de la distribución t de Student de dos colas.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/tinv-function"
		}],
		functionParameter: {
			probability: {
				name: "probabilidad",
				detail: "Obligatorio. Es la probabilidad asociada con la distribución t de Student de dos colas."
			},
			degFreedom: {
				name: "grados_libertad",
				detail: "Obligatorio. Es el número de grados de libertad que caracteriza la distribución."
			}
		}
	},
	TTEST: {
		description: "Devuelve la probabilidad asociada con la prueba t de Student. Use PRUEBA.T para determinar la probabilidad de que dos muestras puedan proceder de dos poblaciones subyacentes con igual media.",
		abstract: "Devuelve la probabilidad asociada con la prueba t de Student. Use PRUEBA.T para determinar la probabilidad de que dos muestras puedan proceder de dos poblaciones subyacentes con igual media.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/ttest-function"
		}],
		functionParameter: {
			array1: {
				name: "matriz1",
				detail: "Obligatorio. Es el primer conjunto de datos."
			},
			array2: {
				name: "matriz2",
				detail: "Obligatorio. Es el segundo conjunto de datos."
			},
			tails: {
				name: "colas",
				detail: "Obligatorio. Especifica el número de colas de la distribución. Si el argumento colas = 1, PRUEBA.T usa la distribución de una cola. Si colas = 2, PRUEBA.T usa la distribución de dos colas."
			},
			type: {
				name: "tipo",
				detail: "Obligatorio. Es el tipo de prueba t realizada."
			}
		}
	},
	VAR: {
		description: "Calcula la varianza de una muestra.",
		abstract: "Calcula la varianza de una muestra.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/var-function"
		}],
		functionParameter: {
			number1: {
				name: "número1",
				detail: "Obligatorio. Es el primer argumento numérico correspondiente a una muestra de una población."
			},
			number2: {
				name: "número2",
				detail: "Opcional. De 2 a 255 argumentos numéricos correspondientes a una muestra de una población."
			}
		}
	},
	VARP: {
		description: "Calcula la varianza en función de toda la población.",
		abstract: "Calcula la varianza en función de toda la población.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/varp-function"
		}],
		functionParameter: {
			number1: {
				name: "número1",
				detail: "Obligatorio. Es el primer argumento numérico correspondiente a una población."
			},
			number2: {
				name: "número2",
				detail: "Opcional. De 2 a 255 argumentos numéricos correspondientes a una población."
			}
		}
	},
	WEIBULL: {
		description: "Devuelve la distribución de Weibull. Use esta distribución en los análisis de confiabilidad para calcular, por ejemplo, el período medio de vida de un componente hasta que se produce un error.",
		abstract: "Devuelve la distribución de Weibull. Use esta distribución en los análisis de confiabilidad para calcular, por ejemplo, el período medio de vida de un componente hasta que se produce un error.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/weibull-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obligatorio. Es el valor en el que desea evaluar la función."
			},
			alpha: {
				name: "alfa",
				detail: "Obligatorio. Es un parámetro de la distribución."
			},
			beta: {
				name: "beta",
				detail: "Obligatorio. Es un parámetro de la distribución."
			},
			cumulative: {
				name: "acumulado",
				detail: "Obligatorio. Determina la forma de la función."
			}
		}
	},
	ZTEST: {
		description: "Devuelve el valor de probabilidad de una cola de una prueba z. En una hipótesis para una media de población, µ0, PRUEBA.Z devuelve la probabilidad de que la media de la muestra sea mayor que el promedio de las observaciones del conjunto (matriz) de datos (es decir, la medida observada de la muestra).",
		abstract: "Devuelve el valor de probabilidad de una cola de una prueba z. En una hipótesis para una media de población, µ0, PRUEBA.Z devuelve la probabilidad de que la media de la muestra sea mayor que el promedio de las observaciones del conjunto (matriz) de datos (es decir, la medida observada de la muestra).",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/ztest-function"
		}],
		functionParameter: {
			array: {
				name: "matriz",
				detail: "Obligatorio. Es la matriz o el rango de datos con que ha de comprobar x."
			},
			x: {
				name: "x",
				detail: "Obligatorio. Es el valor que va a comprobar."
			},
			sigma: {
				name: "sigma",
				detail: "Opcional. Es la desviación estándar (conocida) de la población. Si la omite, se usa la desviación estándar de la muestra."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/cube/es-ES.ts
const locale$13 = {
	CUBEKPIMEMBER: {
		description: "Devuelve una propiedad de indicador clave de rendimiento (KPI) y muestra el nombre del KPI en la celda. Un KPI es una medida cuantificable, como los beneficios brutos mensuales o la facturación trimestral por empleado, que se usa para supervisar el rendimiento de una organización.",
		abstract: "Devuelve una propiedad de indicador clave de rendimiento (KPI) y muestra el nombre del KPI en la celda. Un KPI es una medida cuantificable, como los beneficios brutos mensuales o la facturación trimestral por empleado, que se usa para supervisar el rendimiento de una organización.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/cubekpimember-function"
		}],
		functionParameter: {
			connection: {
				name: "Conexión",
				detail: "Obligatorio. Una cadena de texto del nombre de la conexión al cubo."
			},
			kpiName: {
				name: "Kpi_name",
				detail: "Obligatorio. Una cadena de texto del nombre del KPI en el cubo."
			},
			kpiProperty: {
				name: "Kpi_property",
				detail: "Obligatorio. El componente KPI devuelto, que puede ser uno de los siguientes:"
			},
			caption: {
				name: "Título",
				detail: "Opcional. Una cadena de texto alternativa que se muestra en la celda en lugar de nombre_kpi y propiedad_kpi."
			}
		}
	},
	CUBEMEMBER: {
		description: "Devuelve un miembro o tupla del cubo. Se usa para validar la existencia del miembro o tupla en el cubo.",
		abstract: "Devuelve un miembro o tupla del cubo. Se usa para validar la existencia del miembro o tupla en el cubo.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/cubemember-function"
		}],
		functionParameter: {
			connection: {
				name: "Conexión",
				detail: "Obligatorio. Una cadena de texto del nombre de la conexión al cubo."
			},
			memberExpression: {
				name: "Member_expression",
				detail: "Obligatorio. Una cadena de texto de una expresión multidimensional (MDX) que evalúa en un miembro único del cubo. Como alternativa, expresión_miembro puede ser una tupla, especificada como un rango de celdas o una constante matricial."
			},
			caption: {
				name: "Título",
				detail: "Opcional. Una cadena de texto mostrada en la celda en vez del título, si se define uno, del cubo. Cuando se devuelve una tupla, el título usado es el del último miembro de la tupla."
			}
		}
	},
	CUBEMEMBERPROPERTY: {
		description: "La función PROPIEDADMIEMBROCUBO , una de las funciones de Cubo en Excel, devuelve el valor de una propiedad miembro de un cubo. Se usa para validar la existencia de un nombre de miembro en el cubo y para devolver la propiedad especificada para este miembro.",
		abstract: "La función PROPIEDADMIEMBROCUBO , una de las funciones de Cubo en Excel, devuelve el valor de una propiedad miembro de un cubo. Se usa para validar la existencia de un nombre de miembro en el cubo y para devolver la propiedad especificada para este miembro.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/cubememberproperty-function"
		}],
		functionParameter: {
			connection: {
				name: "Conexión",
				detail: "Obligatorio. Una cadena de texto del nombre de la conexión al cubo."
			},
			memberExpression: {
				name: "Member_expression",
				detail: "Obligatorio. Una cadena de texto de una expresión multidimensional (MDX) de un miembro dentro del cubo."
			},
			property: {
				name: "Propiedad",
				detail: "Obligatorio. Una cadena de texto del nombre de la propiedad devuelta o una referencia a una celda que contiene el nombre de la propiedad."
			}
		}
	},
	CUBERANKEDMEMBER: {
		description: "Devuelve el miembro n, o clasificado, en un conjunto. Se usa para devolver uno o más elementos de un conjunto, por ejemplo, el cantante que más discos vende o los 10 mejores alumnos.",
		abstract: "Devuelve el miembro n, o clasificado, en un conjunto. Se usa para devolver uno o más elementos de un conjunto, por ejemplo, el cantante que más discos vende o los 10 mejores alumnos.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/cuberankedmember-function"
		}],
		functionParameter: {
			connection: {
				name: "Conexión",
				detail: "Obligatorio. Una cadena de texto del nombre de la conexión al cubo."
			},
			setExpression: {
				name: "Set_expression",
				detail: "Obligatorio. Una cadena de texto de una expresión de conjunto, como \"{[Elemento1].hijos}\". Expresión_conjunto también puede ser la función CONJUNTOCUBO o una referencia a una celda que contiene la función CONJUNTOCUBO."
			},
			rank: {
				name: "Rango",
				detail: "Obligatorio. Un valor entero que especifica el valor superior que se va a devolver. Si la clasificación es un valor de 1, devuelve el valor superior, si la clasificación es un valor de 2, devuelve el segundo más alto y así sucesivamente. Para devolver los 5 primeros valores, use MIEMBRORANGOCUBO cinco veces, especificando una clasificación diferente, del 1 al 5, cada vez."
			},
			caption: {
				name: "Título",
				detail: "Opcional. Una cadena de texto mostrada en la celda en vez del título, si se define uno, del cubo."
			}
		}
	},
	CUBESET: {
		description: "Define un conjunto calculado de miembros o tuplas mediante el envío de una expresión de conjunto al cubo en el servidor, lo que crea el conjunto y, después, devuelve dicho conjunto a Microsoft Excel.",
		abstract: "Define un conjunto calculado de miembros o tuplas mediante el envío de una expresión de conjunto al cubo en el servidor, lo que crea el conjunto y, después, devuelve dicho conjunto a Microsoft Excel.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/cubeset-function"
		}],
		functionParameter: {
			connection: {
				name: "Conexión",
				detail: "Obligatorio. Una cadena de texto del nombre de la conexión al cubo."
			},
			setExpression: {
				name: "Set_expression",
				detail: "Obligatorio. Una cadena de texto de una expresión de conjunto que tiene como resultado un conjunto de miembros o tuplas. Expresión_conjunto también puede ser una referencia de celda a un rango de Excel que contiene uno o más miembros, tuplas o conjuntos incluidos en el conjunto."
			},
			caption: {
				name: "Título",
				detail: "Opcional. Una cadena de texto mostrada en la celda en vez del título, si se define uno, del cubo."
			},
			sortOrder: {
				name: "Sort_order",
				detail: "Opcional. El tipo de ordenación, de haber alguno, que se va a realizar, que puede ser uno de los siguientes:"
			},
			sortBy: {
				name: "Sort_by",
				detail: "Opcional. Una cadena de texto del valor por el que ordenar. Por ejemplo, para obtener la ciudad con las ventas más elevadas, expresión_conjunto sería un conjunto de ciudades y ordenar_por sería la medición de ventas. O bien, para obtener la ciudad con la población más elevada, expresión_conjunto sería un conjunto de ciudades y ordenar_por sería la medición de la población. Si criterio_ordenación requiere ordenar_por, y ordenar_por se omite, CONJUNTOCUBO devuelve el mensaje de error #¡VALOR!. mensaje de error."
			}
		}
	},
	CUBESETCOUNT: {
		description: "Devuelve el número de elementos de un conjunto.",
		abstract: "Devuelve el número de elementos de un conjunto.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/cubesetcount-function"
		}],
		functionParameter: { set: {
			name: "Establecer",
			detail: "Obligatorio. Una cadena de texto de una expresión de Microsoft Excel que se evalúa como un conjunto definido por la función CONJUNTOCUBO. El conjunto también puede ser la función CONJUNTOCUBO o una referencia a una celda que contiene la función CONJUNTOCUBO."
		} }
	},
	CUBEVALUE: {
		description: "Devuelve un valor agregado del cubo.",
		abstract: "Devuelve un valor agregado del cubo.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/cubevalue-function"
		}],
		functionParameter: {
			connection: {
				name: "Conexión",
				detail: "Obligatorio. Una cadena de texto del nombre de la conexión al cubo."
			},
			memberExpression: {
				name: "Member_expression",
				detail: "Opcional. Una cadena de texto de una expresión multidimensional (MDX) que se evalúa como un miembro o tupla dentro del cubo. Como alternativa, expresión_miembro puede ser un conjunto definido con la función CONJUNTOCUBO. Use expresión_miembro como rebanador para definir la parte del cubo para la que se devuelve el valor agregado. Si no se especifica ninguna medida en expresión_miembro, se usa la medida predeterminada para dicho cubo."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/database/es-ES.ts
const locale$12 = {
	DAVERAGE: {
		description: "Devuelve el promedio de los valores de un campo (columna) de registros en una lista o base de datos que cumple las condiciones especificadas.",
		abstract: "Devuelve el promedio de los valores de un campo (columna) de registros en una lista o base de datos que cumple las condiciones especificadas.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/daverage-function"
		}],
		functionParameter: {
			database: {
				name: "base_datos",
				detail: "es el rango de celdas que compone la lista o base de datos. Una base de datos es una lista de datos relacionados en la que las filas de información son registros y las columnas de datos, campos. La primera fila de la lista contiene los rótulos de cada columna."
			},
			field: {
				name: "campo",
				detail: "indica qué columna se usa en la función. Escriba el rótulo de la columna entre comillas, como por ejemplo \"Edad\" o \"Rendimiento\", o un número (sin las comillas) que represente la posición de la columna en la lista: 1 para la primera columna, 2 para la segunda y así sucesivamente."
			},
			criteria: {
				name: "criterios",
				detail: "es el rango de celdas que contiene las condiciones especificadas. Puede usar cualquier rango en el argumento criterios mientras este incluya al menos un rótulo de columna y una celda debajo del mismo en la que se pueda especificar una condición para la columna."
			}
		}
	},
	DCOUNT: {
		description: "Cuenta las celdas que contienen números en un campo (columna) de registros de una lista o base de datos que cumplen las condiciones especificadas.",
		abstract: "Cuenta las celdas que contienen números en un campo (columna) de registros de una lista o base de datos que cumplen las condiciones especificadas.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/dcount-function"
		}],
		functionParameter: {
			database: {
				name: "base_datos",
				detail: "Obligatorio. El rango de celdas que compone la lista o base de datos. Una base de datos es una lista de datos relacionados en la que las filas de información son registros y las columnas de datos, campos. La primera fila de la lista contiene los rótulos de cada columna."
			},
			field: {
				name: "campo",
				detail: "Obligatorio. Indica qué columna se usa en la función. Escriba el rótulo de la columna entre comillas, como por ejemplo \"Edad\" o \"Rendimiento\", o un número (sin las comillas) que represente la posición de la columna en la lista: 1 para la primera columna, 2 para la segunda y así sucesivamente."
			},
			criteria: {
				name: "criterios",
				detail: "Obligatorio. El rango de celdas que contiene las condiciones especificadas. Puede usar cualquier rango en el argumento Criterios mientras este incluya por lo menos un rótulo de columna y al menos una celda debajo del rótulo de columna en la que se pueda especificar una condición de columna."
			}
		}
	},
	DCOUNTA: {
		description: "Cuenta las celdas que no están en blanco de un campo (columna) de registros de una lista o base de datos que cumplen las condiciones especificadas.",
		abstract: "Cuenta las celdas que no están en blanco de un campo (columna) de registros de una lista o base de datos que cumplen las condiciones especificadas.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/dcounta-function"
		}],
		functionParameter: {
			database: {
				name: "base_datos",
				detail: "Obligatorio. El rango de celdas que compone la lista o base de datos. Una base de datos es una lista de datos relacionados en la que las filas de información son registros y las columnas de datos, campos. La primera fila de la lista contiene los rótulos de cada columna."
			},
			field: {
				name: "campo",
				detail: "Opcional. Indica qué columna se usa en la función. Escriba el rótulo de la columna entre comillas, como por ejemplo \"Edad\" o \"Rendimiento\", o un número (sin las comillas) que represente la posición de la columna en la lista: 1 para la primera columna, 2 para la segunda y así sucesivamente."
			},
			criteria: {
				name: "criterios",
				detail: "Obligatorio. Es el rango de celdas que contiene las condiciones especificadas. Puede usar cualquier rango en el argumento criterios mientras este incluya al menos un rótulo de columna y una celda debajo del mismo en la que se pueda especificar una condición para la columna."
			}
		}
	},
	DGET: {
		description: "Extrae un único valor de una columna de una lista o una base de datos que cumple las condiciones especificadas.",
		abstract: "Extrae un único valor de una columna de una lista o una base de datos que cumple las condiciones especificadas.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/dget-function"
		}],
		functionParameter: {
			database: {
				name: "base_datos",
				detail: "Obligatorio. El rango de celdas que compone la lista o base de datos. Una base de datos es una lista de datos relacionados en la que las filas de información son registros y las columnas de datos, campos. La primera fila de la lista contiene los rótulos de cada columna."
			},
			field: {
				name: "campo",
				detail: "Obligatorio. Indica qué columna se usa en la función. Escriba el rótulo de la columna entre comillas, como por ejemplo \"Edad\" o \"Rendimiento\", o un número (sin las comillas) que represente la posición de la columna en la lista: 1 para la primera columna, 2 para la segunda y así sucesivamente."
			},
			criteria: {
				name: "criterios",
				detail: "Obligatorio. Es el rango de celdas que contiene las condiciones especificadas. Puede usar cualquier rango en el argumento criterios mientras este incluya al menos un rótulo de columna y una celda debajo del mismo en la que se pueda especificar una condición para la columna."
			}
		}
	},
	DMAX: {
		description: "Devuelve el valor máximo de un campo (columna) de registros en una lista o base de datos que cumple las condiciones especificadas.",
		abstract: "Devuelve el valor máximo de un campo (columna) de registros en una lista o base de datos que cumple las condiciones especificadas.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/dmax-function"
		}],
		functionParameter: {
			database: {
				name: "base_datos",
				detail: "Obligatorio. El rango de celdas que compone la lista o base de datos. Una base de datos es una lista de datos relacionados en la que las filas de información son registros y las columnas de datos, campos. La primera fila de la lista contiene los rótulos de cada columna."
			},
			field: {
				name: "campo",
				detail: "Obligatorio. Indica qué columna se usa en la función. Escriba el rótulo de la columna entre comillas, como por ejemplo \"Edad\" o \"Rendimiento\", o un número (sin las comillas) que represente la posición de la columna en la lista: 1 para la primera columna, 2 para la segunda y así sucesivamente."
			},
			criteria: {
				name: "criterios",
				detail: "Obligatorio. Es el rango de celdas que contiene las condiciones especificadas. Puede usar cualquier rango en el argumento criterios mientras este incluya al menos un rótulo de columna y una celda debajo del mismo en la que se pueda especificar una condición para la columna."
			}
		}
	},
	DMIN: {
		description: "Devuelve el valor mínimo de un campo (columna) de registros en una lista o base de datos que cumple las condiciones especificadas.",
		abstract: "Devuelve el valor mínimo de un campo (columna) de registros en una lista o base de datos que cumple las condiciones especificadas.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/dmin-function"
		}],
		functionParameter: {
			database: {
				name: "base_datos",
				detail: "Obligatorio. El rango de celdas que compone la lista o base de datos. Una base de datos es una lista de datos relacionados en la que las filas de información son registros y las columnas de datos, campos. La primera fila de la lista contiene los rótulos de cada columna."
			},
			field: {
				name: "campo",
				detail: "Obligatorio. Indica qué columna se usa en la función. Escriba el rótulo de la columna entre comillas, como por ejemplo \"Edad\" o \"Rendimiento\", o un número (sin las comillas) que represente la posición de la columna en la lista: 1 para la primera columna, 2 para la segunda y así sucesivamente."
			},
			criteria: {
				name: "criterios",
				detail: "Obligatorio. Es el rango de celdas que contiene las condiciones especificadas. Puede usar cualquier rango en el argumento criterios mientras este incluya al menos un rótulo de columna y una celda debajo del mismo en la que se pueda especificar una condición para la columna."
			}
		}
	},
	DPRODUCT: {
		description: "Multiplica los valores de un campo (columna) de registros de una lista o base de datos que cumplen las condiciones especificadas.",
		abstract: "Multiplica los valores de un campo (columna) de registros de una lista o base de datos que cumplen las condiciones especificadas.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/dproduct-function"
		}],
		functionParameter: {
			database: {
				name: "base_datos",
				detail: "Obligatorio. El rango de celdas que compone la lista o base de datos. Una base de datos es una lista de datos relacionados en la que las filas de información son registros y las columnas de datos, campos. La primera fila de la lista contiene los rótulos de cada columna."
			},
			field: {
				name: "campo",
				detail: "Obligatorio. Indica qué columna se usa en la función. Escriba el rótulo de la columna entre comillas, como por ejemplo \"Edad\" o \"Rendimiento\", o un número (sin las comillas) que represente la posición de la columna en la lista: 1 para la primera columna, 2 para la segunda y así sucesivamente."
			},
			criteria: {
				name: "criterios",
				detail: "Obligatorio. Es el rango de celdas que contiene las condiciones especificadas. Puede usar cualquier rango en el argumento criterios mientras este incluya al menos un rótulo de columna y una celda debajo del mismo en la que se pueda especificar una condición para la columna."
			}
		}
	},
	DSTDEV: {
		description: "Calcula la desviación estándar de una población basándose en una muestra y usando los números de un campo (columna) de registros en una lista o base de datos que cumplen las condiciones especificadas.",
		abstract: "Calcula la desviación estándar de una población basándose en una muestra y usando los números de un campo (columna) de registros en una lista o base de datos que cumplen las condiciones especificadas.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/dstdev-function"
		}],
		functionParameter: {
			database: {
				name: "base_datos",
				detail: "Obligatorio. El rango de celdas que compone la lista o base de datos. Una base de datos es una lista de datos relacionados en la que las filas de información son registros y las columnas de datos, campos. La primera fila de la lista contiene los rótulos de cada columna."
			},
			field: {
				name: "campo",
				detail: "Obligatorio. Indica qué columna se usa en la función. Escriba el rótulo de la columna entre comillas, como por ejemplo \"Edad\" o \"Rendimiento\", o un número (sin las comillas) que represente la posición de la columna en la lista: 1 para la primera columna, 2 para la segunda y así sucesivamente."
			},
			criteria: {
				name: "criterios",
				detail: "Obligatorio. Es el rango de celdas que contiene las condiciones especificadas. Puede usar cualquier rango en el argumento criterios mientras este incluya al menos un rótulo de columna y una celda debajo del mismo en la que se pueda especificar una condición para la columna."
			}
		}
	},
	DSTDEVP: {
		description: "Calcula la desviación estándar de una población basándose en toda la población y usa los números de un campo (columna) de registros de una lista o base de datos que cumplen las condiciones especificadas.",
		abstract: "Calcula la desviación estándar de una población basándose en toda la población y usa los números de un campo (columna) de registros de una lista o base de datos que cumplen las condiciones especificadas.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/dstdevp-function"
		}],
		functionParameter: {
			database: {
				name: "base_datos",
				detail: "Obligatorio. El rango de celdas que compone la lista o base de datos. Una base de datos es una lista de datos relacionados en la que las filas de información son registros y las columnas de datos, campos. La primera fila de la lista contiene los rótulos de cada columna."
			},
			field: {
				name: "campo",
				detail: "Obligatorio. Indica qué columna se usa en la función. Escriba el rótulo de la columna entre comillas, como por ejemplo \"Edad\" o \"Rendimiento\", o un número (sin las comillas) que represente la posición de la columna en la lista: 1 para la primera columna, 2 para la segunda y así sucesivamente."
			},
			criteria: {
				name: "criterios",
				detail: "Obligatorio. Es el rango de celdas que contiene las condiciones especificadas. Puede usar cualquier rango en el argumento criterios mientras este incluya al menos un rótulo de columna y una celda debajo del mismo en la que se pueda especificar una condición para la columna."
			}
		}
	},
	DSUM: {
		description: "En una lista o base de datos, DSUMA proporciona la suma de los números de los campos (columnas) de registros que cumplen las condiciones especificadas.",
		abstract: "En una lista o base de datos, DSUMA proporciona la suma de los números de los campos (columnas) de registros que cumplen las condiciones especificadas.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/dsum-function"
		}],
		functionParameter: {
			database: {
				name: "base_datos",
				detail: "Obligatorio. Este es el rango de celdas que compone la lista o base de datos. Una base de datos es una lista de datos relacionados en la que las filas de información son registros y las columnas de datos son campos . La primera fila de una lista contiene etiquetas para cada columna en ella."
			},
			field: {
				name: "campo",
				detail: "Obligatorio. Esto especifica qué columna se usa en la función. Especifique el rótulo de columna entre comillas, como \"Edad\" o \"Rendimiento\", por ejemplo. Como alternativa, puede especificar un número (sin comillas) que represente la posición de la columna dentro de la lista: por ejemplo, 1 para la primera columna, 2 para la segunda, etc."
			},
			criteria: {
				name: "criterios",
				detail: "Obligatorio. Este es el rango de celdas que contiene las condiciones especificadas. Puede usar cualquier rango en el argumento criterios mientras este incluya al menos un rótulo de columna y una celda debajo del mismo en la que se pueda especificar una condición para la columna."
			}
		}
	},
	DVAR: {
		description: "Calcula la varianza de una población basándose en una muestra y usando los números de un campo (columna) de registros de una lista o base de datos que cumplen las condiciones especificadas.",
		abstract: "Calcula la varianza de una población basándose en una muestra y usando los números de un campo (columna) de registros de una lista o base de datos que cumplen las condiciones especificadas.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/dvar-function"
		}],
		functionParameter: {
			database: {
				name: "base_datos",
				detail: "Obligatorio. El rango de celdas que compone la lista o base de datos. Una base de datos es una lista de datos relacionados en la que las filas de información son registros y las columnas de datos, campos. La primera fila de la lista contiene los rótulos de cada columna."
			},
			field: {
				name: "campo",
				detail: "Obligatorio. Indica qué columna se usa en la función. Escriba el rótulo de la columna entre comillas, como por ejemplo \"Edad\" o \"Rendimiento\", o un número (sin las comillas) que represente la posición de la columna en la lista: 1 para la primera columna, 2 para la segunda y así sucesivamente."
			},
			criteria: {
				name: "criterios",
				detail: "Obligatorio. Es el rango de celdas que contiene las condiciones especificadas. Puede usar cualquier rango en el argumento criterios mientras este incluya al menos un rótulo de columna y una celda debajo del mismo en la que se pueda especificar una condición para la columna."
			}
		}
	},
	DVARP: {
		description: "Calcula la varianza de una población basándose en toda la población y usando los números de un campo (columna) de registros en una lista o una base de datos que cumplen las condiciones especificadas.",
		abstract: "Calcula la varianza de una población basándose en toda la población y usando los números de un campo (columna) de registros en una lista o una base de datos que cumplen las condiciones especificadas.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/dvarp-function"
		}],
		functionParameter: {
			database: {
				name: "base_datos",
				detail: "Obligatorio. El rango de celdas que compone la lista o base de datos. Una base de datos es una lista de datos relacionados en la que las filas de información son registros y las columnas de datos, campos. La primera fila de la lista contiene los rótulos de cada columna."
			},
			field: {
				name: "campo",
				detail: "Obligatorio. Indica qué columna se usa en la función. Escriba el rótulo de la columna entre comillas, como por ejemplo \"Edad\" o \"Rendimiento\", o un número (sin las comillas) que represente la posición de la columna en la lista: 1 para la primera columna, 2 para la segunda y así sucesivamente."
			},
			criteria: {
				name: "criterios",
				detail: "Obligatorio. Es el rango de celdas que contiene las condiciones especificadas. Puede usar cualquier rango en el argumento criterios mientras este incluya al menos un rótulo de columna y una celda debajo del mismo en la que se pueda especificar una condición para la columna."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/date/es-ES.ts
const locale$11 = {
	DATE: {
		description: "Devuelve el número de serie de una fecha particular",
		abstract: "Devuelve el número de serie de una fecha particular",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/date-function"
		}],
		functionParameter: {
			year: {
				name: "año",
				detail: "El valor del argumento año puede incluir de uno a cuatro dígitos. Excel interpreta el argumento año según el sistema de fechas que use su equipo. De forma predeterminada, Univer usa el sistema de fechas de 1900, lo que significa que la primera fecha es el 1 de enero de 1900."
			},
			month: {
				name: "mes",
				detail: "Un entero positivo o negativo que representa el mes del año del 1 al 12 (enero a diciembre)."
			},
			day: {
				name: "día",
				detail: "Un entero positivo o negativo que representa el día del mes del 1 al 31."
			}
		}
	},
	DATEDIF: {
		description: "Calcula el número de días, meses o años entre dos fechas. Esta función es útil en fórmulas donde necesita calcular una edad.",
		abstract: "Calcula el número de días, meses o años entre dos fechas. Esta función es útil en fórmulas donde necesita calcular una edad.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/datedif-function"
		}],
		functionParameter: {
			startDate: {
				name: "fecha_inicial",
				detail: "Es una fecha que representa la primera o la fecha inicial de un período determinado. Las fechas pueden escribirse como cadenas de texto entre comillas (por ejemplo, \"30/01/2001\") como números de serie (por ejemplo, 36921, que representa el 30 de junio de 2001, si usa el sistema de fechas de 1900), o bien como resultado de otras fórmulas o funciones (por ejemplo FECHANUMERO(\"30/01/2001\"))."
			},
			endDate: {
				name: "fecha_final",
				detail: "Una fecha que representa la última del período o al fecha de finalización."
			},
			unit: {
				name: "Unidad",
				detail: "El tipo de información que desea devolver, donde: Unidad***Devuelve \" Y \"El número de años completos en el período.\" M \"El número de meses completos en el período\". D \"El número de días del período\". MD \"La diferencia entre los días de start_date y end_date. Los meses y años de las fechas se pasan por alto. Importante: No se recomienda usar el argumento \"MD\", ya que existen limitaciones conocidas con él. Consulta la sección de problemas conocidos que viene a continuación\". YM \"La diferencia entre los meses de start_date y end_date. Los días y años de las fechas se pasan por alto\" YD \"La diferencia entre los días de start_date y end_date. Los años de las fechas se pasan por alto."
			}
		}
	},
	DATEVALUE: {
		description: "Convierte una fecha en forma de texto a un número de serie.",
		abstract: "Convierte una fecha en forma de texto a un número de serie",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/datevalue-function"
		}],
		functionParameter: { dateText: {
			name: "texto_fecha",
			detail: "Texto que representa una fecha en un formato de fecha de Excel, o una referencia a una celda que contiene texto que representa una fecha en un formato de fecha de Excel. Por ejemplo, \"30/1/2008\" o \"30-Ene-2008\" son cadenas de texto entre comillas que representan fechas.\\nUsando el sistema de fechas predeterminado en Microsoft Excel para Windows, el argumento texto_fecha debe representar una fecha entre el 1 de enero de 1900 y el 31 de diciembre de 9999. La función DATEVALUE devuelve el valor de error #VALUE! si el valor del argumento texto_fecha está fuera de este rango.\\nSi se omite la parte del año del argumento texto_fecha, la función DATEVALUE usa el año actual del reloj integrado de su equipo. La información de hora en el argumento texto_fecha se ignora."
		} }
	},
	DAY: {
		description: "Devuelve el día de una fecha, representado por un número de serie. El día se proporciona como un entero que va del 1 al 31.",
		abstract: "Convierte un número de serie a un día del mes",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/day-function"
		}],
		functionParameter: { serialNumber: {
			name: "número_serie",
			detail: "La fecha del día que intenta encontrar. Las fechas deben introducirse usando la función DATE, o como resultados de otras fórmulas o funciones. Por ejemplo, use DATE(2008,5,23) para el día 23 de mayo de 2008."
		} }
	},
	DAYS: {
		description: "Devuelve el número de días entre dos fechas",
		abstract: "Devuelve el número de días entre dos fechas",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/days-function"
		}],
		functionParameter: {
			endDate: {
				name: "fecha_final",
				detail: "Fecha_inicial y Fecha_final son las dos fechas entre las que desea conocer el número de días."
			},
			startDate: {
				name: "fecha_inicial",
				detail: "Fecha_inicial y Fecha_final son las dos fechas entre las que desea conocer el número de días."
			}
		}
	},
	DAYS360: {
		description: "Calcula el número de días entre dos fechas basándose en un año de 360 días",
		abstract: "Calcula el número de días entre dos fechas basándose en un año de 360 días",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/days360-function"
		}],
		functionParameter: {
			startDate: {
				name: "fecha_inicial",
				detail: "Fecha_inicial y Fecha_final son las dos fechas entre las que desea conocer el número de días."
			},
			endDate: {
				name: "fecha_final",
				detail: "Fecha_inicial y Fecha_final son las dos fechas entre las que desea conocer el número de días."
			},
			method: {
				name: "método",
				detail: "Un valor lógico que especifica si se usa el método estadounidense o europeo en el cálculo."
			}
		}
	},
	EDATE: {
		description: "Devuelve el número de serie que representa la fecha que está el número indicado de meses antes o después de una fecha especificada (la fecha_inicial). Use EDATE para calcular fechas de vencimiento o fechas de vencimiento que caen en el mismo día del mes que la fecha de emisión.",
		abstract: "Devuelve el número de serie de la fecha que está el número indicado de meses antes o después de la fecha inicial",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/edate-function"
		}],
		functionParameter: {
			startDate: {
				name: "fecha_inicial",
				detail: "Una fecha que representa la fecha inicial. Las fechas deben introducirse usando la función DATE, o como resultados de otras fórmulas o funciones. Por ejemplo, use DATE(2008,5,23) para el día 23 de mayo de 2008. Pueden ocurrir problemas si las fechas se introducen como texto."
			},
			months: {
				name: "meses",
				detail: "El número de meses antes o después de fecha_inicial. Un valor positivo para meses produce una fecha futura; un valor negativo produce una fecha pasada."
			}
		}
	},
	EOMONTH: {
		description: "Devuelve el número de serie del último día del mes antes o después de un número especificado de meses",
		abstract: "Devuelve el número de serie del último día del mes antes o después de un número especificado de meses",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/eomonth-function"
		}],
		functionParameter: {
			startDate: {
				name: "fecha_inicial",
				detail: "Una fecha que representa la fecha inicial."
			},
			months: {
				name: "meses",
				detail: "El número de meses antes o después de fecha_inicial."
			}
		}
	},
	EPOCHTODATE: {
		description: "Convierte una marca de tiempo UNIX en segundos, milisegundos o microsegundos en un valor de fecha y hora en tiempo universal coordinado (UTC).",
		abstract: "Convierte una marca de tiempo UNIX en segundos, milisegundos o microsegundos en un valor de fecha y hora en tiempo universal coordinado (UTC).",
		links: [{
			title: "Instrucciones",
			url: "https://support.google.com/docs/answer/13193461?hl=es"
		}],
		functionParameter: {
			timestamp: {
				name: "marca_tiempo",
				detail: "EPOCHTODATE(1655908429662;2)"
			},
			unit: {
				name: "unidad",
				detail: "EPOCHTODATE(1655906710)"
			}
		}
	},
	HOUR: {
		description: "Convierte un número de serie a una hora",
		abstract: "Convierte un número de serie a una hora",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/hour-function"
		}],
		functionParameter: { serialNumber: {
			name: "número_serie",
			detail: "La fecha del día que intenta encontrar. Las fechas deben introducirse usando la función DATE, o como resultados de otras fórmulas o funciones. Por ejemplo, use DATE(2008,5,23) para el día 23 de mayo de 2008."
		} }
	},
	ISOWEEKNUM: {
		description: "Devuelve el número de semana ISO del año para una fecha determinada.",
		abstract: "Devuelve el número de semana ISO del año para una fecha determinada.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/isoweeknum-function"
		}],
		functionParameter: { date: {
			name: "fecha",
			detail: "Obligatorio. Fecha es el código de fecha-hora que Excel usa para los cálculos de fecha y hora."
		} }
	},
	MINUTE: {
		description: "Devuelve los minutos de un valor de hora. Los minutos se expresan como números enteros comprendidos entre 0 y 59.",
		abstract: "Devuelve los minutos de un valor de hora. Los minutos se expresan como números enteros comprendidos entre 0 y 59.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/minute-function"
		}],
		functionParameter: { serialNumber: {
			name: "número_serie",
			detail: "Obligatorio. Es la hora que contiene el valor de minutos que desea buscar. Las horas pueden escribirse como cadenas de texto entre comillas (por ejemplo, \"6:45 p.m.\"), como números decimales (por ejemplo, 0,78125, que representa las 6:45 p.m.), o bien como resultado de otras fórmulas o funciones, por ejemplo HORANUMERO(\"6:45 p.m.\")."
		} }
	},
	MONTH: {
		description: "Devuelve el mes de una fecha representada por un número de serie. El mes se expresa como número entero comprendido entre 1 (enero) y 12 (diciembre).",
		abstract: "Devuelve el mes de una fecha representada por un número de serie. El mes se expresa como número entero comprendido entre 1 (enero) y 12 (diciembre).",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/month-function"
		}],
		functionParameter: { serialNumber: {
			name: "número_serie",
			detail: "Obligatorio. Es la fecha del mes que intenta buscar. Inserte las fechas con la función FECHA o como resultado de otras fórmulas o funciones. Por ejemplo, use FECHA(2008,5,23) para el día 23 de mayo de 2008. Puede tener problemas al escribir las fechas como texto ."
		} }
	},
	NETWORKDAYS: {
		description: "Devuelve el número de días laborables entre fecha_inicial y fecha_final. Los días laborables no incluyen los fines de semana ni otras fechas que se identifiquen en el argumento vacaciones. Use DIAS.LAB para calcular el incremento de los beneficios acumulados de los empleados basándose en el número de días trabajados durante un período específico.",
		abstract: "Devuelve el número de días laborables entre fecha_inicial y fecha_final. Los días laborables no incluyen los fines de semana ni otras fechas que se identifiquen en el argumento vacaciones. Use DIAS.LAB para calcular el incremento de los beneficios acumulados de los empleados basándose en el número de días trabajados durante un período específico.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/networkdays-function"
		}],
		functionParameter: {
			startDate: {
				name: "fecha_inicial",
				detail: "Obligatorio. Es una fecha que representa la fecha inicial."
			},
			endDate: {
				name: "fecha_final",
				detail: "Obligatorio. Es una fecha que representa la fecha final."
			},
			holidays: {
				name: "días_festivos",
				detail: "Opcional. Es un rango opcional de una o varias fechas que deben excluirse del calendario laboral, como los días festivos nacionales y locales. La lista puede ser un rango de celdas que contengan las fechas o una constante de matriz de los números de serie que representen las fechas."
			}
		}
	},
	NETWORKDAYS_INTL: {
		description: "Devuelve el número de todos los días laborables entre dos fechas mediante parámetros para indicar cuáles y cuántos son días de fin de semana. Los días de fin de semana y los días que se especifiquen como días festivos no se consideran días laborables.",
		abstract: "Devuelve el número de todos los días laborables entre dos fechas mediante parámetros para indicar cuáles y cuántos son días de fin de semana. Los días de fin de semana y los días que se especifiquen como días festivos no se consideran días laborables.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/networkdays-intl-function"
		}],
		functionParameter: {
			startDate: {
				name: "fecha_inicial",
				detail: "Una fecha que representa la fecha inicial."
			},
			endDate: {
				name: "fecha_final",
				detail: "Una fecha que representa la fecha final."
			},
			weekend: {
				name: "fin_semana",
				detail: "es un número o cadena de fin de semana que especifica cuándo ocurren los fines de semana."
			},
			holidays: {
				name: "días_festivos",
				detail: "Un rango opcional de una o más fechas para excluir del calendario laboral, como días festivos estatales y federales y días festivos flotantes."
			}
		}
	},
	NOW: {
		description: "Devuelve el número de serie de la fecha y hora actuales. Si el formato de celda es General antes de especificar la función, Excel cambia el formato de celda para que coincida con el formato de fecha y hora de la configuración regional. Puede cambiar el formato de fecha y hora para la celda con los comandos en el grupo Número de la pestaña Inicio de la cinta.",
		abstract: "Devuelve el número de serie de la fecha y hora actuales. Si el formato de celda es General antes de especificar la función, Excel cambia el formato de celda para que coincida con el formato de fecha y hora de la configuración regional. Puede cambiar el formato de fecha y hora para la celda con los comandos en el grupo Número de la pestaña Inicio de la cinta.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/now-function"
		}],
		functionParameter: {}
	},
	SECOND: {
		description: "Devuelve los segundos de un valor de hora. El segundo se expresa como número entero comprendido entre 0 (cero) y 59.",
		abstract: "Devuelve los segundos de un valor de hora. El segundo se expresa como número entero comprendido entre 0 (cero) y 59.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/second-function"
		}],
		functionParameter: { serialNumber: {
			name: "número_serie",
			detail: "Obligatorio. Es la hora que contiene los segundos que se desea buscar. Las horas pueden escribirse como cadenas de texto entre comillas (por ejemplo, \"6:45 p.m.\"), como números decimales (por ejemplo, 0,78125, que representa las 6:45 p.m.), o bien como resultado de otras fórmulas o funciones, por ejemplo HORANUMERO(\"6:45 p.m.\")."
		} }
	},
	TIME: {
		description: "Devuelve el número de serie de una hora particular.",
		abstract: "Devuelve el número de serie de una hora particular",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/time-function"
		}],
		functionParameter: {
			hour: {
				name: "hora",
				detail: "Un número del 0 (cero) al 32767 que representa la hora. Cualquier valor mayor que 23 se dividirá por 24 y el resto se tratará como el valor de la hora. Por ejemplo, TIME(27,0,0) = TIME(3,0,0) = .125 o 3:00 AM."
			},
			minute: {
				name: "minuto",
				detail: "Un número del 0 al 32767 que representa el minuto. Cualquier valor mayor que 59 se convertirá a horas y minutos. Por ejemplo, TIME(0,750,0) = TIME(12,30,0) = .520833 o 12:30 PM."
			},
			second: {
				name: "segundo",
				detail: "Un número del 0 al 32767 que representa el segundo. Cualquier valor mayor que 59 se convertirá a horas, minutos y segundos. Por ejemplo, TIME(0,0,2000) = TIME(0,33,22) = .023148 o 12:33:20 AM."
			}
		}
	},
	TIMEVALUE: {
		description: "Devuelve el número decimal de la hora representada por una cadena de texto. El número decimal es un valor comprendido entre 0 (cero) y 0,99988426 que representa las horas entre 0:00:00 (12:00:00 a.m.) y 23:59:59 (11:59:59 p.m.).",
		abstract: "Devuelve el número decimal de la hora representada por una cadena de texto. El número decimal es un valor comprendido entre 0 (cero) y 0,99988426 que representa las horas entre 0:00:00 (12:00:00 a.m.) y 23:59:59 (11:59:59 p.m.).",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/timevalue-function"
		}],
		functionParameter: { timeText: {
			name: "texto_hora",
			detail: "Obligatorio. Es una cadena de texto que representa una hora en uno de los formatos de hora de Microsoft Excel, por ejemplo, las cadenas de texto entre comillas \"6:45 p.m.\" y \"18:45\" representan la hora."
		} }
	},
	TO_DATE: {
		description: "Convierte un número en una fecha.",
		abstract: "Convierte un número en una fecha.",
		links: [{
			title: "Instrucciones",
			url: "https://support.google.com/docs/answer/3094239?hl=es"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "TO_DATE(A2)"
		} }
	},
	TODAY: {
		description: "Devuelve el número de serie de la fecha de hoy",
		abstract: "Devuelve el número de serie de la fecha de hoy",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/today-function"
		}],
		functionParameter: {}
	},
	WEEKDAY: {
		description: "Convierte un número de serie a un día de la semana",
		abstract: "Convierte un número de serie a un día de la semana",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/weekday-function"
		}],
		functionParameter: {
			serialNumber: {
				name: "número_serie",
				detail: "Un número secuencial que representa la fecha del día que intenta encontrar."
			},
			returnType: {
				name: "tipo_devuelto",
				detail: "Un número que determina el tipo de valor devuelto."
			}
		}
	},
	WEEKNUM: {
		description: "Convierte un número de serie a un número que representa dónde cae la semana numéricamente dentro de un año",
		abstract: "Convierte un número de serie a un número que representa dónde cae la semana numéricamente dentro de un año",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/weeknum-function"
		}],
		functionParameter: {
			serialNumber: {
				name: "número_serie",
				detail: "Una fecha dentro de la semana."
			},
			returnType: {
				name: "tipo_devuelto",
				detail: "Un número que determina en qué día comienza la semana. El predeterminado es 1."
			}
		}
	},
	WORKDAY: {
		description: "Devuelve el número de serie de la fecha antes o después de un número especificado de días laborables",
		abstract: "Devuelve el número de serie de la fecha antes o después de un número especificado de días laborables",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/workday-function"
		}],
		functionParameter: {
			startDate: {
				name: "fecha_inicial",
				detail: "Una fecha que representa la fecha inicial."
			},
			days: {
				name: "días",
				detail: "El número de días no fines de semana y no festivos antes o después de fecha_inicial. Un valor positivo para días produce una fecha futura; un valor negativo produce una fecha pasada."
			},
			holidays: {
				name: "días_festivos",
				detail: "Un rango opcional de una o más fechas para excluir del calendario laboral, como días festivos estatales y federales y días festivos flotantes."
			}
		}
	},
	WORKDAY_INTL: {
		description: "Devuelve el número de serie de la fecha antes o después de un número especificado de días laborables usando parámetros para indicar cuáles y cuántos días son días de fin de semana",
		abstract: "Devuelve el número de serie de la fecha antes o después de un número especificado de días laborables usando parámetros para indicar cuáles y cuántos días son días de fin de semana",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/workday-intl-function"
		}],
		functionParameter: {
			startDate: {
				name: "fecha_inicial",
				detail: "Una fecha que representa la fecha inicial."
			},
			days: {
				name: "días",
				detail: "El número de días no fines de semana y no festivos antes o después de fecha_inicial. Un valor positivo para días produce una fecha futura; un valor negativo produce una fecha pasada."
			},
			weekend: {
				name: "fin_semana",
				detail: "es un número o cadena de fin de semana que especifica cuándo ocurren los fines de semana."
			},
			holidays: {
				name: "días_festivos",
				detail: "Un rango opcional de una o más fechas para excluir del calendario laboral, como días festivos estatales y federales y días festivos flotantes."
			}
		}
	},
	YEAR: {
		description: "Devuelve el año correspondiente a una fecha. El año se devuelve como un entero en el rango 1900-9999.",
		abstract: "Convierte un número de serie a un año",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/year-function"
		}],
		functionParameter: { serialNumber: {
			name: "número_serie",
			detail: "La fecha del año que desea encontrar. Las fechas deben introducirse usando la función DATE, o como resultados de otras fórmulas o funciones. Por ejemplo, use DATE(2008,5,23) para el día 23 de mayo de 2008. Pueden ocurrir problemas si las fechas se introducen como texto."
		} }
	},
	YEARFRAC: {
		description: "Devuelve la fracción de año que representa el número de días completos entre fecha_inicial y fecha_final",
		abstract: "Devuelve la fracción de año que representa el número de días completos entre fecha_inicial y fecha_final",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/yearfrac-function"
		}],
		functionParameter: {
			startDate: {
				name: "fecha_inicial",
				detail: "Una fecha que representa la fecha inicial."
			},
			endDate: {
				name: "fecha_final",
				detail: "Una fecha que representa la fecha final."
			},
			basis: {
				name: "base",
				detail: "El tipo de base de recuento de días que se utilizará."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/engineering/es-ES.ts
const locale$10 = {
	BESSELI: {
		description: "Devuelve la función de Bessel modificada In(x)",
		abstract: "Devuelve la función de Bessel modificada In(x)",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/besseli-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "El valor en el que se evalúa la función."
			},
			n: {
				name: "N",
				detail: "El orden de la función de Bessel. Si n no es un entero, se trunca."
			}
		}
	},
	BESSELJ: {
		description: "Devuelve la función de Bessel Jn(x)",
		abstract: "Devuelve la función de Bessel Jn(x)",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/besselj-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "El valor en el que se evalúa la función."
			},
			n: {
				name: "N",
				detail: "El orden de la función de Bessel. Si n no es un entero, se trunca."
			}
		}
	},
	BESSELK: {
		description: "Devuelve la función de Bessel modificada Kn(x)",
		abstract: "Devuelve la función de Bessel modificada Kn(x)",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/besselk-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "El valor en el que se evalúa la función."
			},
			n: {
				name: "N",
				detail: "El orden de la función de Bessel. Si n no es un entero, se trunca."
			}
		}
	},
	BESSELY: {
		description: "Devuelve la función de Bessel Yn(x)",
		abstract: "Devuelve la función de Bessel Yn(x)",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/bessely-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "El valor en el que se evalúa la función."
			},
			n: {
				name: "N",
				detail: "El orden de la función de Bessel. Si n no es un entero, se trunca."
			}
		}
	},
	BIN2DEC: {
		description: "Convierte un número binario a decimal",
		abstract: "Convierte un número binario a decimal",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/bin2dec-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "El número binario que desea convertir."
		} }
	},
	BIN2HEX: {
		description: "Convierte un número binario a hexadecimal",
		abstract: "Convierte un número binario a hexadecimal",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/bin2hex-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El número binario que desea convertir."
			},
			places: {
				name: "posiciones",
				detail: "El número de caracteres que se van a usar."
			}
		}
	},
	BIN2OCT: {
		description: "Convierte un número binario a octal",
		abstract: "Convierte un número binario a octal",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/bin2oct-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El número binario que desea convertir."
			},
			places: {
				name: "posiciones",
				detail: "El número de caracteres que se van a usar."
			}
		}
	},
	BITAND: {
		description: "Devuelve una \"Y bit a bit\" de dos números",
		abstract: "Devuelve una \"Y bit a bit\" de dos números",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/bitand-function"
		}],
		functionParameter: {
			number1: {
				name: "número1",
				detail: "Debe estar en forma decimal y ser mayor o igual a 0."
			},
			number2: {
				name: "número2",
				detail: "Debe estar en forma decimal y ser mayor o igual a 0."
			}
		}
	},
	BITLSHIFT: {
		description: "Devuelve un número de valor desplazado a la izquierda por cantidad_desplazamiento bits",
		abstract: "Devuelve un número de valor desplazado a la izquierda por cantidad_desplazamiento bits",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/bitlshift-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "Número debe ser un entero mayor o igual a 0."
			},
			shiftAmount: {
				name: "cantidad_desplazamiento",
				detail: "Cantidad_desplazamiento debe ser un entero."
			}
		}
	},
	BITOR: {
		description: "Devuelve un O bit a bit de 2 números",
		abstract: "Devuelve un O bit a bit de 2 números",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/bitor-function"
		}],
		functionParameter: {
			number1: {
				name: "número1",
				detail: "Debe estar en forma decimal y ser mayor o igual a 0."
			},
			number2: {
				name: "número2",
				detail: "Debe estar en forma decimal y ser mayor o igual a 0."
			}
		}
	},
	BITRSHIFT: {
		description: "Devuelve un número de valor desplazado a la derecha por cantidad_desplazamiento bits",
		abstract: "Devuelve un número de valor desplazado a la derecha por cantidad_desplazamiento bits",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/bitrshift-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "Número debe ser un entero mayor o igual a 0."
			},
			shiftAmount: {
				name: "cantidad_desplazamiento",
				detail: "Cantidad_desplazamiento debe ser un entero."
			}
		}
	},
	BITXOR: {
		description: "Devuelve un \"O exclusivo\" bit a bit de dos números",
		abstract: "Devuelve un \"O exclusivo\" bit a bit de dos números",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/bitxor-function"
		}],
		functionParameter: {
			number1: {
				name: "número1",
				detail: "Debe estar en forma decimal y ser mayor o igual a 0."
			},
			number2: {
				name: "número2",
				detail: "Debe estar en forma decimal y ser mayor o igual a 0."
			}
		}
	},
	COMPLEX: {
		description: "Convierte coeficientes reales e imaginarios en un número complejo",
		abstract: "Convierte coeficientes reales e imaginarios en un número complejo",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/complex-function"
		}],
		functionParameter: {
			realNum: {
				name: "núm_real",
				detail: "El coeficiente real del número complejo."
			},
			iNum: {
				name: "núm_i",
				detail: "El coeficiente imaginario del número complejo."
			},
			suffix: {
				name: "sufijo",
				detail: "El sufijo para el componente imaginario del número complejo. Si se omite, se supone que el sufijo es \"i\"."
			}
		}
	},
	CONVERT: {
		description: "Convierte un número de un sistema de medida a otro",
		abstract: "Convierte un número de un sistema de medida a otro",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/convert-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "es el valor en unidades_origen que se va a convertir."
			},
			fromUnit: {
				name: "unidad_origen",
				detail: "son las unidades de número."
			},
			toUnit: {
				name: "unidad_destino",
				detail: "son las unidades para el resultado."
			}
		}
	},
	DEC2BIN: {
		description: "Convierte un número decimal a binario",
		abstract: "Convierte un número decimal a binario",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/dec2bin-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El número decimal que desea convertir."
			},
			places: {
				name: "posiciones",
				detail: "El número de caracteres que se van a usar."
			}
		}
	},
	DEC2HEX: {
		description: "Convierte un número decimal a hexadecimal",
		abstract: "Convierte un número decimal a hexadecimal",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/dec2hex-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El número decimal que desea convertir."
			},
			places: {
				name: "posiciones",
				detail: "El número de caracteres que se van a usar."
			}
		}
	},
	DEC2OCT: {
		description: "Convierte un número decimal a octal",
		abstract: "Convierte un número decimal a octal",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/dec2oct-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El número decimal que desea convertir."
			},
			places: {
				name: "posiciones",
				detail: "El número de caracteres que se van a usar."
			}
		}
	},
	DELTA: {
		description: "Comprueba si dos valores son iguales",
		abstract: "Comprueba si dos valores son iguales",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/delta-function"
		}],
		functionParameter: {
			number1: {
				name: "número1",
				detail: "El primer número."
			},
			number2: {
				name: "número2",
				detail: "El segundo número. Si se omite, se supone que número2 es cero."
			}
		}
	},
	ERF: {
		description: "Devuelve la función de error",
		abstract: "Devuelve la función de error",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/erf-function"
		}],
		functionParameter: {
			lowerLimit: {
				name: "límite_inferior",
				detail: "El límite inferior para integrar ERF."
			},
			upperLimit: {
				name: "límite_superior",
				detail: "El límite superior para integrar ERF. Si se omite, ERF integra entre cero y límite_inferior."
			}
		}
	},
	ERF_PRECISE: {
		description: "Devuelve la función de error",
		abstract: "Devuelve la función de error",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/erf-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "El límite inferior para integrar ERF.PRECISE."
		} }
	},
	ERFC: {
		description: "Devuelve la función de error complementaria",
		abstract: "Devuelve la función de error complementaria",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/erfc-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "El límite inferior para integrar ERFC."
		} }
	},
	ERFC_PRECISE: {
		description: "Devuelve la función ERF complementaria integrada entre x e infinito",
		abstract: "Devuelve la función ERF complementaria integrada entre x e infinito",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/erfc-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "El límite inferior para integrar ERFC.PRECISE."
		} }
	},
	GESTEP: {
		description: "Comprueba si un número es mayor que un valor umbral",
		abstract: "Comprueba si un número es mayor que un valor umbral",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/gestep-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El valor que se va a probar contra escalón."
			},
			step: {
				name: "escalón",
				detail: "El valor umbral. Si omite un valor para escalón, GESTEP usa cero."
			}
		}
	},
	HEX2BIN: {
		description: "Convierte un número hexadecimal a binario",
		abstract: "Convierte un número hexadecimal a binario",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/hex2bin-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El número hexadecimal que desea convertir."
			},
			places: {
				name: "posiciones",
				detail: "El número de caracteres que se van a usar."
			}
		}
	},
	HEX2DEC: {
		description: "Convierte un número hexadecimal a decimal",
		abstract: "Convierte un número hexadecimal a decimal",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/hex2dec-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "El número hexadecimal que desea convertir."
		} }
	},
	HEX2OCT: {
		description: "Convierte un número hexadecimal a octal",
		abstract: "Convierte un número hexadecimal a octal",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/hex2oct-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El número hexadecimal que desea convertir."
			},
			places: {
				name: "posiciones",
				detail: "El número de caracteres que se van a usar."
			}
		}
	},
	IMABS: {
		description: "Devuelve el valor absoluto (módulo) de un número complejo",
		abstract: "Devuelve el valor absoluto (módulo) de un número complejo",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/imabs-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginario",
			detail: "Un número complejo del que desea obtener el valor absoluto."
		} }
	},
	IMAGINARY: {
		description: "Devuelve el coeficiente imaginario de un número complejo",
		abstract: "Devuelve el coeficiente imaginario de un número complejo",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/imaginary-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginario",
			detail: "Un número complejo del que desea obtener el coeficiente imaginario."
		} }
	},
	IMARGUMENT: {
		description: "Devuelve el argumento (theta), un ángulo expresado en radianes, de tal forma que:",
		abstract: "Devuelve el argumento (theta), un ángulo expresado en radianes, de tal forma que:",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/imargument-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginario",
			detail: "Obligatorio. Es el número complejo cuyo argumento desea conocer."
		} }
	},
	IMCONJUGATE: {
		description: "Devuelve el conjugado complejo de un número complejo",
		abstract: "Devuelve el conjugado complejo de un número complejo",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/imconjugate-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginario",
			detail: "Un número complejo del que desea obtener el conjugado."
		} }
	},
	IMCOS: {
		description: "Devuelve el coseno de un número complejo",
		abstract: "Devuelve el coseno de un número complejo",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/imcos-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginario",
			detail: "Un número complejo del que desea obtener el coseno."
		} }
	},
	IMCOSH: {
		description: "Devuelve el coseno hiperbólico de un número complejo",
		abstract: "Devuelve el coseno hiperbólico de un número complejo",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/imcosh-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginario",
			detail: "Un número complejo del que desea obtener el coseno hiperbólico."
		} }
	},
	IMCOT: {
		description: "Devuelve la cotangente de un número complejo",
		abstract: "Devuelve la cotangente de un número complejo",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/imcot-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginario",
			detail: "Un número complejo del que desea obtener la cotangente."
		} }
	},
	IMCOTH: {
		description: "La función IM.COTH devuelve la cotangente hiperbólica del número complejo especificado. Por ejemplo, un número complejo dado, como \"x+yi\", devuelve \"coth(x+yi)\".",
		abstract: "La función IM.COTH devuelve la cotangente hiperbólica del número complejo especificado. Por ejemplo, un número complejo dado, como \"x+yi\", devuelve \"coth(x+yi)\".",
		links: [{
			title: "Instrucciones",
			url: "https://support.google.com/docs/answer/9366256?hl=es"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginario",
			detail: "Número complejo del que se desea calcular la cotangente hiperbólica. Este argumento puede ser el resultado de la función COMPLEJO, un número real (que se interpreta como un número complejo con las partes imaginarias igual a 0), o una cadena con el formato \"x + yi\", donde x e y son números."
		} }
	},
	IMCSC: {
		description: "Devuelve la cosecante de un número complejo",
		abstract: "Devuelve la cosecante de un número complejo",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/imcsc-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginario",
			detail: "Un número complejo del que desea obtener la cosecante."
		} }
	},
	IMCSCH: {
		description: "Devuelve la cosecante hiperbólica de un número complejo",
		abstract: "Devuelve la cosecante hiperbólica de un número complejo",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/imcsch-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginario",
			detail: "Un número complejo del que desea obtener la cosecante hiperbólica."
		} }
	},
	IMDIV: {
		description: "Devuelve el cociente de dos números complejos",
		abstract: "Devuelve el cociente de dos números complejos",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/imdiv-function"
		}],
		functionParameter: {
			inumber1: {
				name: "núm_imaginario1",
				detail: "El numerador o dividendo complejo."
			},
			inumber2: {
				name: "núm_imaginario2",
				detail: "El denominador o divisor complejo."
			}
		}
	},
	IMEXP: {
		description: "Devuelve el valor exponencial de un número complejo con el formato de texto x + yi o x + yj.",
		abstract: "Devuelve el valor exponencial de un número complejo con el formato de texto x + yi o x + yj.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/imexp-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginario",
			detail: "Obligatorio. Es el número complejo cuyo valor exponencial desea calcular."
		} }
	},
	IMLN: {
		description: "Devuelve el logaritmo natural de un número complejo",
		abstract: "Devuelve el logaritmo natural de un número complejo",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/imln-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginario",
			detail: "Un número complejo del que desea obtener el logaritmo natural."
		} }
	},
	IMLOG: {
		description: "La función IM.LOG devuelve el logaritmo de un número complejo en la base especificada.",
		abstract: "La función IM.LOG devuelve el logaritmo de un número complejo en la base especificada.",
		links: [{
			title: "Instrucciones",
			url: "https://support.google.com/docs/answer/9366486?hl=es"
		}],
		functionParameter: {
			inumber: {
				name: "núm_imaginario",
				detail: "Valor introducido de la función de logaritmo. El número se puede introducir solo, por ejemplo, 1, y se interpretará como un número real. También se pueden introducir números entre comillas para especificar tanto los coeficientes reales como los complejos."
			},
			base: {
				name: "base",
				detail: "Base que se va a usar para calcular el logaritmo. Debe ser un número real positivo."
			}
		}
	},
	IMLOG10: {
		description: "Devuelve el logaritmo en base 10 de un número complejo",
		abstract: "Devuelve el logaritmo en base 10 de un número complejo",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/imlog10-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginario",
			detail: "Un número complejo del que desea obtener el logaritmo común."
		} }
	},
	IMLOG2: {
		description: "Devuelve el logaritmo en base 2 de un número complejo",
		abstract: "Devuelve el logaritmo en base 2 de un número complejo",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/imlog2-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginario",
			detail: "Un número complejo del que desea obtener el logaritmo en base 2."
		} }
	},
	IMPOWER: {
		description: "Devuelve un número complejo elevado a una potencia entera",
		abstract: "Devuelve un número complejo elevado a una potencia entera",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/impower-function"
		}],
		functionParameter: {
			inumber: {
				name: "núm_imaginario",
				detail: "Un número complejo que desea elevar a una potencia."
			},
			number: {
				name: "número",
				detail: "La potencia a la que desea elevar el número complejo."
			}
		}
	},
	IMPRODUCT: {
		description: "Devuelve el producto de 1 a 255 números complejos",
		abstract: "Devuelve el producto de 1 a 255 números complejos",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/improduct-function"
		}],
		functionParameter: {
			inumber1: {
				name: "núm_imaginario1",
				detail: "De 1 a 255 números complejos para multiplicar."
			},
			inumber2: {
				name: "núm_imaginario2",
				detail: "De 1 a 255 números complejos para multiplicar."
			}
		}
	},
	IMREAL: {
		description: "Devuelve el coeficiente real de un número complejo",
		abstract: "Devuelve el coeficiente real de un número complejo",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/imreal-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginario",
			detail: "Un número complejo del que desea obtener el coeficiente real."
		} }
	},
	IMSEC: {
		description: "Devuelve la secante de un número complejo",
		abstract: "Devuelve la secante de un número complejo",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/imsec-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginario",
			detail: "Un número complejo del que desea obtener la secante."
		} }
	},
	IMSECH: {
		description: "Devuelve la secante hiperbólica de un número complejo",
		abstract: "Devuelve la secante hiperbólica de un número complejo",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/imsech-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginario",
			detail: "Un número complejo del que desea obtener la secante hiperbólica."
		} }
	},
	IMSIN: {
		description: "Devuelve el seno de un número complejo",
		abstract: "Devuelve el seno de un número complejo",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/imsin-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginario",
			detail: "Un número complejo del que desea obtener el seno."
		} }
	},
	IMSINH: {
		description: "Devuelve el seno hiperbólico de un número complejo",
		abstract: "Devuelve el seno hiperbólico de un número complejo",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/imsinh-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginario",
			detail: "Un número complejo del que desea obtener el seno hiperbólico."
		} }
	},
	IMSQRT: {
		description: "Devuelve la raíz cuadrada de un número complejo",
		abstract: "Devuelve la raíz cuadrada de un número complejo",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/imsqrt-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginario",
			detail: "Un número complejo del que desea obtener la raíz cuadrada."
		} }
	},
	IMSUB: {
		description: "Devuelve la diferencia entre dos números complejos",
		abstract: "Devuelve la diferencia entre dos números complejos",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/imsub-function"
		}],
		functionParameter: {
			inumber1: {
				name: "núm_imaginario1",
				detail: "núm_imaginario1."
			},
			inumber2: {
				name: "núm_imaginario2",
				detail: "núm_imaginario2."
			}
		}
	},
	IMSUM: {
		description: "Devuelve la suma de números complejos",
		abstract: "Devuelve la suma de números complejos",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/imsum-function"
		}],
		functionParameter: {
			inumber1: {
				name: "núm_imaginario1",
				detail: "De 1 a 255 números complejos para sumar."
			},
			inumber2: {
				name: "núm_imaginario2",
				detail: "De 1 a 255 números complejos para sumar."
			}
		}
	},
	IMTAN: {
		description: "Devuelve la tangente de un número complejo",
		abstract: "Devuelve la tangente de un número complejo",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/imtan-function"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginario",
			detail: "Un número complejo del que desea obtener la tangente."
		} }
	},
	IMTANH: {
		description: "La función IM.TANH devuelve la tangente hiperbólica del número complejo especificado. Por ejemplo, un número complejo dado, como \"x+yi\", devuelve \"tanh(x+yi)\".",
		abstract: "La función IM.TANH devuelve la tangente hiperbólica del número complejo especificado. Por ejemplo, un número complejo dado, como \"x+yi\", devuelve \"tanh(x+yi)\".",
		links: [{
			title: "Instrucciones",
			url: "https://support.google.com/docs/answer/9366655?hl=es"
		}],
		functionParameter: { inumber: {
			name: "núm_imaginario",
			detail: "Número complejo del que se desea calcular la tangente hiperbólica. Este argumento puede ser el resultado de la función COMPLEJO, un número real (que se interpreta como un número complejo con las partes imaginarias igual a 0), o una cadena con el formato \"x + yi\", donde x e y son números."
		} }
	},
	OCT2BIN: {
		description: "Convierte un número octal a binario",
		abstract: "Convierte un número octal a binario",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/oct2bin-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El número octal que desea convertir."
			},
			places: {
				name: "posiciones",
				detail: "El número de caracteres que se van a usar."
			}
		}
	},
	OCT2DEC: {
		description: "Convierte un número octal a decimal",
		abstract: "Convierte un número octal a decimal",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/oct2dec-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "El número octal que desea convertir."
		} }
	},
	OCT2HEX: {
		description: "Convierte un número octal a hexadecimal",
		abstract: "Convierte un número octal a hexadecimal",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/oct2hex-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El número octal que desea convertir."
			},
			places: {
				name: "posiciones",
				detail: "El número de caracteres que se van a usar."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/financial/es-ES.ts
const locale$9 = {
	ACCRINT: {
		description: "Devuelve el interés acumulado de un valor que paga intereses periódicos",
		abstract: "Devuelve el interés acumulado de un valor que paga intereses periódicos",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/accrint-function"
		}],
		functionParameter: {
			issue: {
				name: "emisión",
				detail: "La fecha de emisión del valor."
			},
			firstInterest: {
				name: "primer_interés",
				detail: "La fecha del primer interés del valor."
			},
			settlement: {
				name: "liquidación",
				detail: "La fecha de vencimiento del valor."
			},
			rate: {
				name: "tasa",
				detail: "La tasa de cupón anual del valor."
			},
			par: {
				name: "valor_nominal",
				detail: "El valor nominal del valor."
			},
			frequency: {
				name: "frecuencia",
				detail: "El número de pagos de cupón por año."
			},
			basis: {
				name: "base",
				detail: "El tipo de base de recuento de días que se usará."
			},
			calcMethod: {
				name: "método_cálculo",
				detail: "Es un valor lógico: el interés se acumula desde la fecha de emisión = VERDADERO o se ignora; el interés se acumula desde la fecha del último pago de cupón = FALSO."
			}
		}
	},
	ACCRINTM: {
		description: "Devuelve el interés acumulado de un valor que paga intereses al vencimiento",
		abstract: "Devuelve el interés acumulado de un valor que paga intereses al vencimiento",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/accrintm-function"
		}],
		functionParameter: {
			issue: {
				name: "emisión",
				detail: "La fecha de emisión del valor."
			},
			settlement: {
				name: "liquidación",
				detail: "La fecha de vencimiento del valor."
			},
			rate: {
				name: "tasa",
				detail: "La tasa de cupón anual del valor."
			},
			par: {
				name: "valor_nominal",
				detail: "El valor nominal del valor."
			},
			basis: {
				name: "base",
				detail: "El tipo de base de recuento de días que se usará."
			}
		}
	},
	AMORDEGRC: {
		description: "Devuelve la depreciación de cada periodo contable mediante un coeficiente de depreciación",
		abstract: "Devuelve la depreciación de cada periodo contable mediante un coeficiente de depreciación",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/amordegrc-function"
		}],
		functionParameter: {
			cost: {
				name: "costo",
				detail: "El costo del activo."
			},
			datePurchased: {
				name: "fecha_compra",
				detail: "La fecha de compra del activo."
			},
			firstPeriod: {
				name: "primer_periodo",
				detail: "La fecha del final del primer periodo."
			},
			salvage: {
				name: "valor_residual",
				detail: "El valor residual al final de la vida del activo."
			},
			period: {
				name: "periodo",
				detail: "El periodo."
			},
			rate: {
				name: "tasa",
				detail: "La tasa de depreciación."
			},
			basis: {
				name: "base",
				detail: "La base del año que se usará."
			}
		}
	},
	AMORLINC: {
		description: "Devuelve la depreciación de cada periodo contable",
		abstract: "Devuelve la depreciación de cada periodo contable",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/amorlinc-function"
		}],
		functionParameter: {
			cost: {
				name: "costo",
				detail: "El costo del activo."
			},
			datePurchased: {
				name: "fecha_compra",
				detail: "La fecha de compra del activo."
			},
			firstPeriod: {
				name: "primer_periodo",
				detail: "La fecha del final del primer periodo."
			},
			salvage: {
				name: "valor_residual",
				detail: "El valor residual al final de la vida del activo."
			},
			period: {
				name: "periodo",
				detail: "El periodo."
			},
			rate: {
				name: "tasa",
				detail: "La tasa de depreciación."
			},
			basis: {
				name: "base",
				detail: "La base del año que se usará."
			}
		}
	},
	COUPDAYBS: {
		description: "Devuelve el número de días desde el principio del periodo de cupón hasta la fecha de liquidación",
		abstract: "Devuelve el número de días desde el principio del periodo de cupón hasta la fecha de liquidación",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/coupdaybs-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidación",
				detail: "La fecha de liquidación del valor."
			},
			maturity: {
				name: "vencimiento",
				detail: "La fecha de vencimiento del valor."
			},
			frequency: {
				name: "frecuencia",
				detail: "El número de pagos de cupón por año."
			},
			basis: {
				name: "base",
				detail: "El tipo de base de recuento de días que se usará."
			}
		}
	},
	COUPDAYS: {
		description: "Devuelve el número de días del periodo de cupón que contiene la fecha de liquidación",
		abstract: "Devuelve el número de días del periodo de cupón que contiene la fecha de liquidación",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/coupdays-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidación",
				detail: "La fecha de liquidación del valor."
			},
			maturity: {
				name: "vencimiento",
				detail: "La fecha de vencimiento del valor."
			},
			frequency: {
				name: "frecuencia",
				detail: "El número de pagos de cupón por año."
			},
			basis: {
				name: "base",
				detail: "El tipo de base de recuento de días que se usará."
			}
		}
	},
	COUPDAYSNC: {
		description: "Devuelve el número de días desde la fecha de liquidación hasta la siguiente fecha de cupón",
		abstract: "Devuelve el número de días desde la fecha de liquidación hasta la siguiente fecha de cupón",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/coupdaysnc-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidación",
				detail: "La fecha de liquidación del valor."
			},
			maturity: {
				name: "vencimiento",
				detail: "La fecha de vencimiento del valor."
			},
			frequency: {
				name: "frecuencia",
				detail: "El número de pagos de cupón por año."
			},
			basis: {
				name: "base",
				detail: "El tipo de base de recuento de días que se usará."
			}
		}
	},
	COUPNCD: {
		description: "Devuelve la siguiente fecha de cupón después de la fecha de liquidación",
		abstract: "Devuelve la siguiente fecha de cupón después de la fecha de liquidación",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/coupncd-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidación",
				detail: "La fecha de liquidación del valor."
			},
			maturity: {
				name: "vencimiento",
				detail: "La fecha de vencimiento del valor."
			},
			frequency: {
				name: "frecuencia",
				detail: "El número de pagos de cupón por año."
			},
			basis: {
				name: "base",
				detail: "El tipo de base de recuento de días que se usará."
			}
		}
	},
	COUPNUM: {
		description: "Devuelve el número de cupones pagaderos entre la fecha de liquidación y la fecha de vencimiento",
		abstract: "Devuelve el número de cupones pagaderos entre la fecha de liquidación y la fecha de vencimiento",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/coupnum-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidación",
				detail: "La fecha de liquidación del valor."
			},
			maturity: {
				name: "vencimiento",
				detail: "La fecha de vencimiento del valor."
			},
			frequency: {
				name: "frecuencia",
				detail: "El número de pagos de cupón por año."
			},
			basis: {
				name: "base",
				detail: "El tipo de base de recuento de días que se usará."
			}
		}
	},
	COUPPCD: {
		description: "Devuelve la fecha de cupón anterior antes de la fecha de liquidación",
		abstract: "Devuelve la fecha de cupón anterior antes de la fecha de liquidación",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/couppcd-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidación",
				detail: "La fecha de liquidación del valor."
			},
			maturity: {
				name: "vencimiento",
				detail: "La fecha de vencimiento del valor."
			},
			frequency: {
				name: "frecuencia",
				detail: "El número de pagos de cupón por año."
			},
			basis: {
				name: "base",
				detail: "El tipo de base de recuento de días que se usará."
			}
		}
	},
	CUMIPMT: {
		description: "Devuelve el interés acumulativo pagado entre dos periodos",
		abstract: "Devuelve el interés acumulativo pagado entre dos periodos",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/cumipmt-function"
		}],
		functionParameter: {
			rate: {
				name: "tasa",
				detail: "La tasa de interés."
			},
			nper: {
				name: "núm_pagos",
				detail: "El número total de periodos de pago."
			},
			pv: {
				name: "va",
				detail: "El valor actual."
			},
			startPeriod: {
				name: "periodo_inicial",
				detail: "El primer periodo en el cálculo. Los periodos de pago se numeran comenzando con 1."
			},
			endPeriod: {
				name: "periodo_final",
				detail: "El último periodo en el cálculo."
			},
			type: {
				name: "tipo",
				detail: "El momento del pago."
			}
		}
	},
	CUMPRINC: {
		description: "Devuelve el capital acumulativo pagado de un préstamo entre dos periodos",
		abstract: "Devuelve el capital acumulativo pagado de un préstamo entre dos periodos",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/cumprinc-function"
		}],
		functionParameter: {
			rate: {
				name: "tasa",
				detail: "La tasa de interés."
			},
			nper: {
				name: "núm_pagos",
				detail: "El número total de periodos de pago."
			},
			pv: {
				name: "va",
				detail: "El valor actual."
			},
			startPeriod: {
				name: "periodo_inicial",
				detail: "El primer periodo en el cálculo. Los periodos de pago se numeran comenzando con 1."
			},
			endPeriod: {
				name: "periodo_final",
				detail: "El último periodo en el cálculo."
			},
			type: {
				name: "tipo",
				detail: "El momento del pago."
			}
		}
	},
	DB: {
		description: "Devuelve la depreciación de un activo durante un periodo especificado, usando el método de saldo de disminución fija",
		abstract: "Devuelve la depreciación de un activo durante un periodo especificado, usando el método de saldo de disminución fija",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/db-function"
		}],
		functionParameter: {
			cost: {
				name: "costo",
				detail: "El costo inicial del activo."
			},
			salvage: {
				name: "valor_residual",
				detail: "El valor al final de la depreciación (a veces llamado el valor residual del activo)."
			},
			life: {
				name: "vida",
				detail: "El número de periodos durante los cuales se deprecia el activo (a veces llamado la vida útil del activo)."
			},
			period: {
				name: "periodo",
				detail: "El periodo para el cual desea calcular la depreciación."
			},
			month: {
				name: "mes",
				detail: "El número de meses del primer año. Si se omite el mes, se supone que es 12."
			}
		}
	},
	DDB: {
		description: "Devuelve la depreciación de un activo durante un periodo especificado usando el método de saldo de doble disminución u otro método que especifique",
		abstract: "Devuelve la depreciación de un activo durante un periodo especificado usando el método de saldo de doble disminución u otro método que especifique",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/ddb-function"
		}],
		functionParameter: {
			cost: {
				name: "costo",
				detail: "El costo inicial del activo."
			},
			salvage: {
				name: "valor_residual",
				detail: "El valor al final de la depreciación (a veces llamado el valor residual del activo)."
			},
			life: {
				name: "vida",
				detail: "El número de periodos durante los cuales se deprecia el activo (a veces llamado la vida útil del activo)."
			},
			period: {
				name: "periodo",
				detail: "El periodo para el cual desea calcular la depreciación."
			},
			factor: {
				name: "factor",
				detail: "La tasa a la que disminuye el saldo. Si se omite el factor, se supone que es 2 (el método de saldo de doble disminución)."
			}
		}
	},
	DISC: {
		description: "Devuelve la tasa de descuento de un valor",
		abstract: "Devuelve la tasa de descuento de un valor",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/disc-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidación",
				detail: "La fecha de liquidación del valor."
			},
			maturity: {
				name: "vencimiento",
				detail: "La fecha de vencimiento del valor."
			},
			pr: {
				name: "precio",
				detail: "El precio del valor por $100 de valor nominal."
			},
			redemption: {
				name: "rescate",
				detail: "El valor de rescate del valor por $100 de valor nominal."
			},
			basis: {
				name: "base",
				detail: "El tipo de base de recuento de días que se usará."
			}
		}
	},
	DOLLARDE: {
		description: "Convierte un precio en dólares, expresado como fracción, en un precio en dólares, expresado como número decimal",
		abstract: "Convierte un precio en dólares, expresado como fracción, en un precio en dólares, expresado como número decimal",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/dollarde-function"
		}],
		functionParameter: {
			fractionalDollar: {
				name: "dólar_fraccionario",
				detail: "Un número expresado como una parte entera y una parte fraccionaria, separadas por un símbolo decimal."
			},
			fraction: {
				name: "fracción",
				detail: "El entero que se usará en el denominador de la fracción."
			}
		}
	},
	DOLLARFR: {
		description: "Convierte un precio en dólares, expresado como número decimal, en un precio en dólares, expresado como fracción",
		abstract: "Convierte un precio en dólares, expresado como número decimal, en un precio en dólares, expresado como fracción",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/dollarfr-function"
		}],
		functionParameter: {
			decimalDollar: {
				name: "dólar_decimal",
				detail: "Un número decimal."
			},
			fraction: {
				name: "fracción",
				detail: "El entero que se usará en el denominador de la fracción."
			}
		}
	},
	DURATION: {
		description: "Devuelve la duración anual de un valor con pagos de intereses periódicos",
		abstract: "Devuelve la duración anual de un valor con pagos de intereses periódicos",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/duration-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidación",
				detail: "La fecha de liquidación del valor."
			},
			maturity: {
				name: "vencimiento",
				detail: "La fecha de vencimiento del valor."
			},
			coupon: {
				name: "cupón",
				detail: "La tasa de cupón anual del valor."
			},
			yld: {
				name: "rendimiento",
				detail: "El rendimiento anual del valor."
			},
			frequency: {
				name: "frecuencia",
				detail: "El número de pagos de cupón por año."
			},
			basis: {
				name: "base",
				detail: "El tipo de base de recuento de días que se usará."
			}
		}
	},
	EFFECT: {
		description: "Devuelve la tasa de interés anual efectiva",
		abstract: "Devuelve la tasa de interés anual efectiva",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/effect-function"
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
		description: "Devuelve el valor futuro de una inversión",
		abstract: "Devuelve el valor futuro de una inversión",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/fv-function"
		}],
		functionParameter: {
			rate: {
				name: "tasa",
				detail: "La tasa de interés por periodo."
			},
			nper: {
				name: "núm_pagos",
				detail: "El número total de periodos de pago en una anualidad."
			},
			pmt: {
				name: "pago",
				detail: "El pago realizado cada periodo; no puede cambiar durante la vida de la anualidad."
			},
			pv: {
				name: "va",
				detail: "El valor actual, o la cantidad total que vale ahora una serie de pagos futuros."
			},
			type: {
				name: "tipo",
				detail: "El número 0 o 1 e indica cuándo vencen los pagos."
			}
		}
	},
	FVSCHEDULE: {
		description: "Devuelve el valor futuro de un capital inicial después de aplicar una serie de tasas de interés compuesto",
		abstract: "Devuelve el valor futuro de un capital inicial después de aplicar una serie de tasas de interés compuesto",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/fvschedule-function"
		}],
		functionParameter: {
			principal: {
				name: "capital",
				detail: "El valor actual."
			},
			schedule: {
				name: "programa",
				detail: "Una matriz de tasas de interés que aplicar."
			}
		}
	},
	INTRATE: {
		description: "Devuelve la tasa de interés para la inversión total en un valor bursátil.",
		abstract: "Devuelve la tasa de interés para la inversión total en un valor bursátil.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/intrate-function"
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
			url: "https://support.microsoft.com/es-es/excel/functions/ipmt-function"
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
		description: "Devuelve la tasa interna de retorno de los flujos de caja representados por los números del argumento valores. Estos flujos de caja no tienen por qué ser constantes, como es el caso en una anualidad. Sin embargo, los flujos de caja deben ocurrir en intervalos regulares, como meses o años. La tasa interna de retorno equivale a la tasa de interés producida por un proyecto de inversión con pagos (valores negativos) e ingresos (valores positivos) que se producen en períodos regulares.",
		abstract: "Devuelve la tasa interna de retorno de los flujos de caja representados por los números del argumento valores. Estos flujos de caja no tienen por qué ser constantes, como es el caso en una anualidad. Sin embargo, los flujos de caja deben ocurrir en intervalos regulares, como meses o años. La tasa interna de retorno equivale a la tasa de interés producida por un proyecto de inversión con pagos (valores negativos) e ingresos (valores positivos) que se producen en períodos regulares.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/irr-function"
		}],
		functionParameter: {
			values: {
				name: "valores",
				detail: "Una matriz o una referencia a celdas que contienen números para los cuales desea calcular la tasa interna de retorno.\n1.Los valores deben contener al menos un valor positivo y uno negativo para calcular la tasa interna de retorno.\n2.TIR usa el orden de valores para interpretar el orden de los flujos de efectivo. Asegúrese de introducir los valores de pago e ingresos en la secuencia que desee.\n3.Si un argumento de matriz o referencia contiene texto, valores lógicos o celdas vacías, esos valores se ignoran."
			},
			guess: {
				name: "estimación",
				detail: "Un número que estima está cerca del resultado de TIR."
			}
		}
	},
	ISPMT: {
		description: "Calcula el interés pagado durante un periodo específico de una inversión",
		abstract: "Calcula el interés pagado durante un periodo específico de una inversión",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/ispmt-function"
		}],
		functionParameter: {
			rate: {
				name: "tasa",
				detail: "La tasa de interés para la inversión."
			},
			per: {
				name: "periodo",
				detail: "El periodo para el cual desea buscar el interés, y debe estar entre 1 y Núm_pagos."
			},
			nper: {
				name: "núm_pagos",
				detail: "El número total de periodos de pago para la inversión."
			},
			pv: {
				name: "va",
				detail: "El valor actual de la inversión. Para un préstamo, Va es la cantidad del préstamo."
			}
		}
	},
	MDURATION: {
		description: "Devuelve la duración modificada de Macauley para un valor con un valor nominal asumido de $100",
		abstract: "Devuelve la duración modificada de Macauley para un valor con un valor nominal asumido de $100",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/mduration-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidación",
				detail: "La fecha de liquidación del valor."
			},
			maturity: {
				name: "vencimiento",
				detail: "La fecha de vencimiento del valor."
			},
			coupon: {
				name: "cupón",
				detail: "La tasa de cupón anual del valor."
			},
			yld: {
				name: "rendimiento",
				detail: "El rendimiento anual del valor."
			},
			frequency: {
				name: "frecuencia",
				detail: "El número de pagos de cupón por año."
			},
			basis: {
				name: "base",
				detail: "El tipo de base de recuento de días que se usará."
			}
		}
	},
	MIRR: {
		description: "Devuelve la tasa interna de retorno donde los flujos de efectivo positivos y negativos se financian a diferentes tasas",
		abstract: "Devuelve la tasa interna de retorno donde los flujos de efectivo positivos y negativos se financian a diferentes tasas",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/mirr-function"
		}],
		functionParameter: {
			values: {
				name: "valores",
				detail: "Una matriz o una referencia a celdas que contienen números. Estos números representan una serie de pagos (valores negativos) e ingresos (valores positivos) que ocurren en periodos regulares.\n1.Los valores deben contener al menos un valor positivo y uno negativo para calcular la tasa interna de retorno modificada. De lo contrario, TIRM devuelve el valor de error #¡DIV/0!.\n2.Si un argumento de matriz o referencia contiene texto, valores lógicos o celdas vacías, esos valores se ignoran; sin embargo, se incluyen las celdas con el valor cero."
			},
			financeRate: {
				name: "tasa_financiamiento",
				detail: "La tasa de interés que paga sobre el dinero usado en los flujos de efectivo."
			},
			reinvestRate: {
				name: "tasa_reinversión",
				detail: "La tasa de interés que recibe sobre los flujos de efectivo cuando los reinvierte."
			}
		}
	},
	NOMINAL: {
		description: "Devuelve la tasa de interés nominal anual",
		abstract: "Devuelve la tasa de interés nominal anual",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/nominal-function"
		}],
		functionParameter: {
			effectRate: {
				name: "tasa_efectiva",
				detail: "La tasa de interés efectiva."
			},
			npery: {
				name: "núm_per_año",
				detail: "El número de periodos de composición por año."
			}
		}
	},
	NPER: {
		description: "Devuelve el número de periodos para una inversión",
		abstract: "Devuelve el número de periodos para una inversión",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/nper-function"
		}],
		functionParameter: {
			rate: {
				name: "tasa",
				detail: "La tasa de interés por periodo."
			},
			pmt: {
				name: "pago",
				detail: "El pago realizado cada periodo; no puede cambiar durante la vida de la anualidad."
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
	NPV: {
		description: "Devuelve el valor actual neto de una inversión basada en una serie de flujos de efectivo periódicos y una tasa de descuento",
		abstract: "Devuelve el valor actual neto de una inversión basada en una serie de flujos de efectivo periódicos y una tasa de descuento",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/npv-function"
		}],
		functionParameter: {
			rate: {
				name: "tasa",
				detail: "La tasa de descuento durante la duración de un periodo."
			},
			value1: {
				name: "valor1",
				detail: "De 1 a 254 argumentos que representan los pagos e ingresos."
			},
			value2: {
				name: "valor2",
				detail: "De 1 a 254 argumentos que representan los pagos e ingresos."
			}
		}
	},
	ODDFPRICE: {
		description: "Devuelve el precio por $100 de valor nominal de un valor con un primer periodo impar",
		abstract: "Devuelve el precio por $100 de valor nominal de un valor con un primer periodo impar",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/oddfprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidación",
				detail: "La fecha de liquidación del valor."
			},
			maturity: {
				name: "vencimiento",
				detail: "La fecha de vencimiento del valor."
			},
			issue: {
				name: "emisión",
				detail: "La fecha de emisión del valor."
			},
			firstCoupon: {
				name: "primer_cupón",
				detail: "La fecha del primer cupón del valor."
			},
			rate: {
				name: "tasa",
				detail: "La tasa de interés del valor."
			},
			yld: {
				name: "rendimiento",
				detail: "El rendimiento anual del valor."
			},
			redemption: {
				name: "rescate",
				detail: "El valor de rescate del valor por $100 de valor nominal."
			},
			frequency: {
				name: "frecuencia",
				detail: "El número de pagos de cupón por año. Para pagos anuales, frecuencia = 1; para semestrales, frecuencia = 2; para trimestrales, frecuencia = 4."
			},
			basis: {
				name: "base",
				detail: "El tipo de base de recuento de días que se usará."
			}
		}
	},
	ODDFYIELD: {
		description: "Devuelve el rendimiento de un valor con un primer periodo impar",
		abstract: "Devuelve el rendimiento de un valor con un primer periodo impar",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/oddfyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidación",
				detail: "La fecha de liquidación del valor."
			},
			maturity: {
				name: "vencimiento",
				detail: "La fecha de vencimiento del valor."
			},
			issue: {
				name: "emisión",
				detail: "La fecha de emisión del valor."
			},
			firstCoupon: {
				name: "primer_cupón",
				detail: "La fecha del primer cupón del valor."
			},
			rate: {
				name: "tasa",
				detail: "La tasa de interés del valor."
			},
			pr: {
				name: "precio",
				detail: "El precio del valor."
			},
			redemption: {
				name: "rescate",
				detail: "El valor de rescate del valor por $100 de valor nominal."
			},
			frequency: {
				name: "frecuencia",
				detail: "El número de pagos de cupón por año. Para pagos anuales, frecuencia = 1; para semestrales, frecuencia = 2; para trimestrales, frecuencia = 4."
			},
			basis: {
				name: "base",
				detail: "El tipo de base de recuento de días que se usará."
			}
		}
	},
	ODDLPRICE: {
		description: "Devuelve el precio por $100 de valor nominal de un valor con un último periodo impar",
		abstract: "Devuelve el precio por $100 de valor nominal de un valor con un último periodo impar",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/oddlprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidación",
				detail: "La fecha de liquidación del valor."
			},
			maturity: {
				name: "vencimiento",
				detail: "La fecha de vencimiento del valor."
			},
			lastInterest: {
				name: "último_interés",
				detail: "La fecha del último cupón del valor."
			},
			rate: {
				name: "tasa",
				detail: "La tasa de interés del valor."
			},
			yld: {
				name: "rendimiento",
				detail: "El rendimiento anual del valor."
			},
			redemption: {
				name: "rescate",
				detail: "El valor de rescate del valor por $100 de valor nominal."
			},
			frequency: {
				name: "frecuencia",
				detail: "El número de pagos de cupón por año. Para pagos anuales, frecuencia = 1; para semestrales, frecuencia = 2; para trimestrales, frecuencia = 4."
			},
			basis: {
				name: "base",
				detail: "El tipo de base de recuento de días que se usará."
			}
		}
	},
	ODDLYIELD: {
		description: "Devuelve el rendimiento de un valor con un último periodo impar",
		abstract: "Devuelve el rendimiento de un valor con un último periodo impar",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/oddlyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidación",
				detail: "La fecha de liquidación del valor."
			},
			maturity: {
				name: "vencimiento",
				detail: "La fecha de vencimiento del valor."
			},
			lastInterest: {
				name: "último_interés",
				detail: "La fecha del último cupón del valor."
			},
			rate: {
				name: "tasa",
				detail: "La tasa de interés del valor."
			},
			pr: {
				name: "precio",
				detail: "El precio del valor."
			},
			redemption: {
				name: "rescate",
				detail: "El valor de rescate del valor por $100 de valor nominal."
			},
			frequency: {
				name: "frecuencia",
				detail: "El número de pagos de cupón por año. Para pagos anuales, frecuencia = 1; para semestrales, frecuencia = 2; para trimestrales, frecuencia = 4."
			},
			basis: {
				name: "base",
				detail: "El tipo de base de recuento de días que se usará."
			}
		}
	},
	PDURATION: {
		description: "Devuelve el número de periodos requeridos por una inversión para alcanzar un valor especificado",
		abstract: "Devuelve el número de periodos requeridos por una inversión para alcanzar un valor especificado",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/pduration-function"
		}],
		functionParameter: {
			rate: {
				name: "tasa",
				detail: "Tasa es la tasa de interés por periodo."
			},
			pv: {
				name: "va",
				detail: "Va es el valor actual de la inversión."
			},
			fv: {
				name: "vf",
				detail: "Vf es el valor futuro deseado de la inversión."
			}
		}
	},
	PMT: {
		description: "Devuelve el pago periódico de una anualidad",
		abstract: "Devuelve el pago periódico de una anualidad",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/pmt-function"
		}],
		functionParameter: {
			rate: {
				name: "tasa",
				detail: "La tasa de interés por periodo."
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
	PPMT: {
		description: "Devuelve el pago del capital de una inversión durante un periodo determinado",
		abstract: "Devuelve el pago del capital de una inversión durante un periodo determinado",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/ppmt-function"
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
	PRICE: {
		description: "Devuelve el precio por $100 de valor nominal de un valor que paga intereses periódicos",
		abstract: "Devuelve el precio por $100 de valor nominal de un valor que paga intereses periódicos",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/price-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidación",
				detail: "La fecha de liquidación del valor."
			},
			maturity: {
				name: "vencimiento",
				detail: "La fecha de vencimiento del valor."
			},
			rate: {
				name: "tasa",
				detail: "La tasa de interés del valor."
			},
			yld: {
				name: "rendimiento",
				detail: "El rendimiento anual del valor."
			},
			redemption: {
				name: "rescate",
				detail: "El valor de rescate del valor por $100 de valor nominal."
			},
			frequency: {
				name: "frecuencia",
				detail: "El número de pagos de cupón por año. Para pagos anuales, frecuencia = 1; para semestrales, frecuencia = 2; para trimestrales, frecuencia = 4."
			},
			basis: {
				name: "base",
				detail: "El tipo de base de recuento de días que se usará."
			}
		}
	},
	PRICEDISC: {
		description: "Devuelve el precio por $100 de valor nominal de un valor descontado",
		abstract: "Devuelve el precio por $100 de valor nominal de un valor descontado",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/pricedisc-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidación",
				detail: "La fecha de liquidación del valor."
			},
			maturity: {
				name: "vencimiento",
				detail: "La fecha de vencimiento del valor."
			},
			discount: {
				name: "descuento",
				detail: "La tasa de descuento del valor."
			},
			redemption: {
				name: "rescate",
				detail: "El valor de rescate del valor por $100 de valor nominal."
			},
			basis: {
				name: "base",
				detail: "El tipo de base de recuento de días que se usará."
			}
		}
	},
	PRICEMAT: {
		description: "Devuelve el precio por $100 de valor nominal de un valor que paga intereses al vencimiento",
		abstract: "Devuelve el precio por $100 de valor nominal de un valor que paga intereses al vencimiento",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/pricemat-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidación",
				detail: "La fecha de liquidación del valor."
			},
			maturity: {
				name: "vencimiento",
				detail: "La fecha de vencimiento del valor."
			},
			issue: {
				name: "emisión",
				detail: "La fecha de emisión del valor."
			},
			rate: {
				name: "tasa",
				detail: "La tasa de interés del valor."
			},
			yld: {
				name: "rendimiento",
				detail: "El rendimiento anual del valor."
			},
			basis: {
				name: "base",
				detail: "El tipo de base de recuento de días que se usará."
			}
		}
	},
	PV: {
		description: "Devuelve el valor actual de una inversión",
		abstract: "Devuelve el valor actual de una inversión",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/pv-function"
		}],
		functionParameter: {
			rate: {
				name: "tasa",
				detail: "La tasa de interés por periodo."
			},
			nper: {
				name: "núm_pagos",
				detail: "El número total de periodos de pago en una anualidad."
			},
			pmt: {
				name: "pago",
				detail: "El pago realizado cada periodo; no puede cambiar durante la vida de la anualidad."
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
	RATE: {
		description: "Devuelve la tasa de interés por periodo de una anualidad",
		abstract: "Devuelve la tasa de interés por periodo de una anualidad",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/rate-function"
		}],
		functionParameter: {
			nper: {
				name: "núm_pagos",
				detail: "El número total de periodos de pago en una anualidad."
			},
			pmt: {
				name: "pago",
				detail: "El pago realizado cada periodo; no puede cambiar durante la vida de la anualidad."
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
			},
			guess: {
				name: "estimación",
				detail: "Su estimación de cuál será la tasa."
			}
		}
	},
	RECEIVED: {
		description: "Devuelve la cantidad recibida al vencimiento para un valor completamente invertido",
		abstract: "Devuelve la cantidad recibida al vencimiento para un valor completamente invertido",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/received-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidación",
				detail: "La fecha de liquidación del valor."
			},
			maturity: {
				name: "vencimiento",
				detail: "La fecha de vencimiento del valor."
			},
			investment: {
				name: "inversión",
				detail: "La cantidad invertida en el valor."
			},
			discount: {
				name: "descuento",
				detail: "La tasa de descuento del valor."
			},
			basis: {
				name: "base",
				detail: "El tipo de base de recuento de días que se usará."
			}
		}
	},
	RRI: {
		description: "Devuelve una tasa de interés equivalente para el crecimiento de una inversión",
		abstract: "Devuelve una tasa de interés equivalente para el crecimiento de una inversión",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/rri-function"
		}],
		functionParameter: {
			nper: {
				name: "núm_pagos",
				detail: "Núm_pagos es el número de periodos para la inversión."
			},
			pv: {
				name: "va",
				detail: "Va es el valor actual de la inversión."
			},
			fv: {
				name: "vf",
				detail: "Vf es el valor futuro de la inversión."
			}
		}
	},
	SLN: {
		description: "Devuelve la depreciación por método directo de un activo en un periodo",
		abstract: "Devuelve la depreciación por método directo de un activo en un periodo",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/sln-function"
		}],
		functionParameter: {
			cost: {
				name: "costo",
				detail: "El costo inicial del activo."
			},
			salvage: {
				name: "valor_residual",
				detail: "El valor al final de la depreciación (a veces llamado el valor residual del activo)."
			},
			life: {
				name: "vida",
				detail: "El número de periodos durante los cuales se deprecia el activo (a veces llamado la vida útil del activo)."
			}
		}
	},
	SYD: {
		description: "Devuelve la depreciación por suma de años de los dígitos de un activo durante un periodo especificado",
		abstract: "Devuelve la depreciación por suma de años de los dígitos de un activo durante un periodo especificado",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/syd-function"
		}],
		functionParameter: {
			cost: {
				name: "costo",
				detail: "El costo inicial del activo."
			},
			salvage: {
				name: "valor_residual",
				detail: "El valor al final de la depreciación (a veces llamado el valor residual del activo)."
			},
			life: {
				name: "vida",
				detail: "El número de periodos durante los cuales se deprecia el activo (a veces llamado la vida útil del activo)."
			},
			per: {
				name: "periodo",
				detail: "El periodo y debe usar las mismas unidades que vida."
			}
		}
	},
	TBILLEQ: {
		description: "Devuelve el rendimiento equivalente de un bono del Tesoro",
		abstract: "Devuelve el rendimiento equivalente de un bono del Tesoro",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/tbilleq-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidación",
				detail: "La fecha de liquidación del pagaré del Tesoro."
			},
			maturity: {
				name: "vencimiento",
				detail: "La fecha de vencimiento del pagaré del Tesoro."
			},
			discount: {
				name: "descuento",
				detail: "La tasa de descuento del pagaré del Tesoro."
			}
		}
	},
	TBILLPRICE: {
		description: "Devuelve el precio por $100 de valor nominal de un pagaré del Tesoro",
		abstract: "Devuelve el precio por $100 de valor nominal de un pagaré del Tesoro",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/tbillprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidación",
				detail: "La fecha de liquidación del pagaré del Tesoro."
			},
			maturity: {
				name: "vencimiento",
				detail: "La fecha de vencimiento del pagaré del Tesoro."
			},
			discount: {
				name: "descuento",
				detail: "La tasa de descuento del pagaré del Tesoro."
			}
		}
	},
	TBILLYIELD: {
		description: "Devuelve el rendimiento de un pagaré del Tesoro",
		abstract: "Devuelve el rendimiento de un pagaré del Tesoro",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/tbillyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidación",
				detail: "La fecha de liquidación del pagaré del Tesoro."
			},
			maturity: {
				name: "vencimiento",
				detail: "La fecha de vencimiento del pagaré del Tesoro."
			},
			pr: {
				name: "precio",
				detail: "El precio del pagaré del Tesoro por $100 de valor nominal."
			}
		}
	},
	VDB: {
		description: "Devuelve la depreciación de un activo durante un periodo especificado o parcial usando un método de saldo decreciente",
		abstract: "Devuelve la depreciación de un activo durante un periodo especificado o parcial usando un método de saldo decreciente",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/vdb-function"
		}],
		functionParameter: {
			cost: {
				name: "costo",
				detail: "El costo inicial del activo."
			},
			salvage: {
				name: "valor_residual",
				detail: "El valor al final de la depreciación (a veces llamado el valor residual del activo)."
			},
			life: {
				name: "vida",
				detail: "El número de periodos durante los cuales se está depreciando el activo (a veces llamado la vida útil del activo)."
			},
			startPeriod: {
				name: "periodo_inicial",
				detail: "El periodo inicial para el cual desea calcular la depreciación."
			},
			endPeriod: {
				name: "periodo_final",
				detail: "El periodo final para el cual desea calcular la depreciación."
			},
			factor: {
				name: "factor",
				detail: "La tasa a la que disminuye el saldo. Si se omite el factor, se supone que es 2 (el método de saldo de doble disminución)."
			},
			noSwitch: {
				name: "no_cambiar",
				detail: "Un valor lógico que especifica si se debe cambiar a depreciación en línea recta cuando la depreciación es mayor que el cálculo de saldo decreciente."
			}
		}
	},
	XIRR: {
		description: "Devuelve la tasa interna de retorno para un flujo de efectivo que no es necesariamente periódico",
		abstract: "Devuelve la tasa interna de retorno para un flujo de efectivo que no es necesariamente periódico",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/xirr-function"
		}],
		functionParameter: {
			values: {
				name: "valores",
				detail: "Una serie de flujos de efectivo que corresponde a un programa de pagos en fechas. El primer pago es opcional y corresponde a un costo o pago que ocurre al principio de la inversión. Si el primer valor es un costo o pago, debe ser un valor negativo. Todos los pagos sucesivos se descuentan basándose en un año de 365 días. La serie de valores debe contener al menos un valor positivo y uno negativo."
			},
			dates: {
				name: "fechas",
				detail: "Un programa de fechas de pago que corresponde a los pagos de flujo de efectivo. Las fechas pueden ocurrir en cualquier orden."
			},
			guess: {
				name: "estimación",
				detail: "Un número que estima está cerca del resultado de TIRX."
			}
		}
	},
	XNPV: {
		description: "Devuelve el valor actual neto para un flujo de efectivo que no es necesariamente periódico",
		abstract: "Devuelve el valor actual neto para un flujo de efectivo que no es necesariamente periódico",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/xnpv-function"
		}],
		functionParameter: {
			rate: {
				name: "tasa",
				detail: "La tasa de descuento que aplicar a los flujos de efectivo."
			},
			values: {
				name: "valores",
				detail: "Una serie de flujos de efectivo que corresponde a un programa de pagos en fechas. El primer pago es opcional y corresponde a un costo o pago que ocurre al principio de la inversión. Si el primer valor es un costo o pago, debe ser un valor negativo. Todos los pagos sucesivos se descuentan basándose en un año de 365 días. La serie de valores debe contener al menos un valor positivo y uno negativo."
			},
			dates: {
				name: "fechas",
				detail: "Un programa de fechas de pago que corresponde a los pagos de flujo de efectivo. Las fechas pueden ocurrir en cualquier orden."
			}
		}
	},
	YIELD: {
		description: "Devuelve el rendimiento de un valor que paga intereses periódicos",
		abstract: "Devuelve el rendimiento de un valor que paga intereses periódicos",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/yield-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidación",
				detail: "La fecha de liquidación del valor."
			},
			maturity: {
				name: "vencimiento",
				detail: "La fecha de vencimiento del valor."
			},
			rate: {
				name: "tasa",
				detail: "La tasa de interés del valor."
			},
			pr: {
				name: "precio",
				detail: "El precio del valor por $100 de valor nominal."
			},
			redemption: {
				name: "rescate",
				detail: "El valor de rescate del valor por $100 de valor nominal."
			},
			frequency: {
				name: "frecuencia",
				detail: "El número de pagos de cupón por año. Para pagos anuales, frecuencia = 1; para semestrales, frecuencia = 2; para trimestrales, frecuencia = 4."
			},
			basis: {
				name: "base",
				detail: "El tipo de base de recuento de días que se usará."
			}
		}
	},
	YIELDDISC: {
		description: "Devuelve el rendimiento anual de un valor descontado; por ejemplo, un pagaré del Tesoro",
		abstract: "Devuelve el rendimiento anual de un valor descontado; por ejemplo, un pagaré del Tesoro",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/yielddisc-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidación",
				detail: "La fecha de liquidación del valor."
			},
			maturity: {
				name: "vencimiento",
				detail: "La fecha de vencimiento del valor."
			},
			pr: {
				name: "precio",
				detail: "El precio del valor por $100 de valor nominal."
			},
			redemption: {
				name: "rescate",
				detail: "El valor de rescate del valor por $100 de valor nominal."
			},
			basis: {
				name: "base",
				detail: "El tipo de base de recuento de días que se usará."
			}
		}
	},
	YIELDMAT: {
		description: "Devuelve el rendimiento anual de un valor que paga intereses al vencimiento",
		abstract: "Devuelve el rendimiento anual de un valor que paga intereses al vencimiento",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/yieldmat-function"
		}],
		functionParameter: {
			settlement: {
				name: "liquidación",
				detail: "La fecha de liquidación del valor."
			},
			maturity: {
				name: "vencimiento",
				detail: "La fecha de vencimiento del valor."
			},
			issue: {
				name: "emisión",
				detail: "La fecha de emisión del valor."
			},
			rate: {
				name: "tasa",
				detail: "La tasa de interés del valor."
			},
			pr: {
				name: "precio",
				detail: "El precio del valor por $100 de valor nominal."
			},
			basis: {
				name: "base",
				detail: "El tipo de base de recuento de días que se usará."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/information/es-ES.ts
const locale$8 = {
	CELL: {
		description: "Devuelve información sobre el formato, la ubicación o el contenido de una celda",
		abstract: "Devuelve información sobre el formato, la ubicación o el contenido de una celda",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/cell-function"
		}],
		functionParameter: {
			infoType: {
				name: "tipo_info",
				detail: "Un valor de texto que especifica qué tipo de información de celda desea devolver."
			},
			reference: {
				name: "referencia",
				detail: "La celda sobre la que desea obtener información."
			}
		}
	},
	ERROR_TYPE: {
		description: "Devuelve un número correspondiente a un tipo de error",
		abstract: "Devuelve un número correspondiente a un tipo de error",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/error-type-function"
		}],
		functionParameter: { errorVal: {
			name: "valor_error",
			detail: "El valor de error cuyo número de identificación desea encontrar."
		} }
	},
	INFO: {
		description: "Devuelve información sobre el entorno operativo actual",
		abstract: "Devuelve información sobre el entorno operativo actual",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/info-function"
		}],
		functionParameter: { typeText: {
			name: "Tipo de texto",
			detail: "Texto que especifica el tipo de información que se devuelve."
		} }
	},
	ISBETWEEN: {
		description: "Comprueba si un número proporcionado se encuentra entre otros dos números, ya sea de forma inclusiva o exclusiva.",
		abstract: "Comprueba si un número proporcionado se encuentra entre otros dos números, ya sea de forma inclusiva o exclusiva.",
		links: [{
			title: "Instrucción",
			url: "https://support.google.com/docs/answer/10538337?hl=es"
		}],
		functionParameter: {
			valueToCompare: {
				name: "valor_a_comparar",
				detail: "Valor que se va a comprobar si se encuentra entre `valor_inferior` y `valor_superior`."
			},
			lowerValue: {
				name: "valor_inferior",
				detail: "Límite inferior del intervalo de valores dentro del cual puede encontrarse el `valor_para_comparar`."
			},
			upperValue: {
				name: "valor_superior",
				detail: "Límite superior del intervalo de valores dentro del cual puede encontrarse el `valor_para_comparar`."
			},
			lowerValueIsInclusive: {
				name: "valor_inferior_es_inclusivo",
				detail: "Comprueba si el intervalo de valores incluye el `valor_inferior`; de manera predeterminada, está establecido en TRUE"
			},
			upperValueIsInclusive: {
				name: "valor_superior_es_inclusivo",
				detail: "Comprueba si el intervalo de valores incluye el `valor_superior`; de manera predeterminada, está establecido en TRUE"
			}
		}
	},
	ISBLANK: {
		description: "Devuelve VERDADERO si el valor está en blanco",
		abstract: "Devuelve VERDADERO si el valor está en blanco",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "El valor que desea probar. El argumento de valor puede ser una celda en blanco (vacía), error, valor lógico, texto, número o valor de referencia, o un nombre que se refiera a cualquiera de estos."
		} }
	},
	ISDATE: {
		description: "La función ISDATE devuelve si el valor es una fecha.",
		abstract: "La función ISDATE devuelve si el valor es una fecha.",
		links: [{
			title: "Instrucción",
			url: "https://support.google.com/docs/answer/9061381?hl=es"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "Valor que se comprueba si es una fecha."
		} }
	},
	ISEMAIL: {
		description: "Para comprobar si un valor es una dirección de correo válida, usa la función ISEMAIL. Comprueba si el valor sigue un formato aceptado habitualmente para las direcciones de correo, pero no verifica si existe.",
		abstract: "Para comprobar si un valor es una dirección de correo válida, usa la función ISEMAIL. Comprueba si el valor sigue un formato aceptado habitualmente para las direcciones de correo, pero no verifica si existe.",
		links: [{
			title: "Instrucción",
			url: "https://support.google.com/docs/answer/3256503?hl=es"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "ISEMAIL(\"juangarcia@tunombre.com\")"
		} }
	},
	ISERR: {
		description: "Devuelve VERDADERO si el valor es cualquier valor de error excepto #N/A",
		abstract: "Devuelve VERDADERO si el valor es cualquier valor de error excepto #N/A",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "El valor que desea probar. El argumento de valor puede ser una celda en blanco (vacía), error, valor lógico, texto, número o valor de referencia, o un nombre que se refiera a cualquiera de estos."
		} }
	},
	ISERROR: {
		description: "Devuelve VERDADERO si el valor es cualquier valor de error",
		abstract: "Devuelve VERDADERO si el valor es cualquier valor de error",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "El valor que desea probar. El argumento de valor puede ser una celda en blanco (vacía), error, valor lógico, texto, número o valor de referencia, o un nombre que se refiera a cualquiera de estos."
		} }
	},
	ISEVEN: {
		description: "Devuelve VERDADERO si el número es par y FALSO si el número es impar.",
		abstract: "Devuelve VERDADERO si el número es par y FALSO si el número es impar.",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/iseven-function"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "Obligatorio. El valor que se desea probar. Si el argumento número no es un entero, se trunca."
		} }
	},
	ISFORMULA: {
		description: "Comprueba si existe una referencia a una celda que contiene una fórmula y devuelve TRUE o FALSE.",
		abstract: "Comprueba si existe una referencia a una celda que contiene una fórmula y devuelve TRUE o FALSE.",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/isformula-function"
		}],
		functionParameter: { reference: {
			name: "referencia",
			detail: "Obligatorio. Referencia es una referencia a la celda que se desea probar. Referencia puede ser una referencia de celda, una fórmula o un nombre que hace referencia a una celda."
		} }
	},
	ISLOGICAL: {
		description: "Devuelve VERDADERO si el valor es un valor lógico",
		abstract: "Devuelve VERDADERO si el valor es un valor lógico",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "El valor que desea probar. El argumento de valor puede ser una celda en blanco (vacía), error, valor lógico, texto, número o valor de referencia, o un nombre que se refiera a cualquiera de estos."
		} }
	},
	ISNA: {
		description: "Devuelve VERDADERO si el valor es el valor de error #N/A",
		abstract: "Devuelve VERDADERO si el valor es el valor de error #N/A",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "El valor que desea probar. El argumento de valor puede ser una celda en blanco (vacía), error, valor lógico, texto, número o valor de referencia, o un nombre que se refiera a cualquiera de estos."
		} }
	},
	ISNONTEXT: {
		description: "Devuelve VERDADERO si el valor no es texto",
		abstract: "Devuelve VERDADERO si el valor no es texto",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "El valor que desea probar. El argumento de valor puede ser una celda en blanco (vacía), error, valor lógico, texto, número o valor de referencia, o un nombre que se refiera a cualquiera de estos."
		} }
	},
	ISNUMBER: {
		description: "Devuelve VERDADERO si el valor es un número",
		abstract: "Devuelve VERDADERO si el valor es un número",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "El valor que desea probar. El argumento de valor puede ser una celda en blanco (vacía), error, valor lógico, texto, número o valor de referencia, o un nombre que se refiera a cualquiera de estos."
		} }
	},
	ISODD: {
		description: "Devuelve VERDADERO si el número es impar",
		abstract: "Devuelve VERDADERO si el número es impar",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/isodd-function"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "El valor a probar. Si el número no es un entero, se trunca."
		} }
	},
	ISOMITTED: {
		description: "Comprueba si falta el valor en una\xA0LAMBDA\xA0y devuelve VERDADERO o FALSO",
		abstract: "Comprueba si falta el valor en una\xA0LAMBDA\xA0y devuelve VERDADERO o FALSO",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/isomitted-function"
		}],
		functionParameter: { argument: {
			name: "Argumento",
			detail: "Valor que se comprueba para determinar si se ha omitido, como un parámetro de LAMBDA."
		} }
	},
	ISREF: {
		description: "Devuelve VERDADERO si el valor es una referencia",
		abstract: "Devuelve VERDADERO si el valor es una referencia",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "El valor que desea probar. El argumento de valor puede ser una celda en blanco (vacía), error, valor lógico, texto, número o valor de referencia, o un nombre que se refiera a cualquiera de estos."
		} }
	},
	ISTEXT: {
		description: "Devuelve VERDADERO si el valor es texto",
		abstract: "Devuelve VERDADERO si el valor es texto",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "El valor que desea probar. El argumento de valor puede ser una celda en blanco (vacía), error, valor lógico, texto, número o valor de referencia, o un nombre que se refiera a cualquiera de estos."
		} }
	},
	ISURL: {
		description: "Comprueba si un valor es una URL válida.",
		abstract: "Comprueba si un valor es una URL válida.",
		links: [{
			title: "Instrucción",
			url: "https://support.google.com/docs/answer/3256501?hl=es"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "ISURL(\"www.google.com\")"
		} }
	},
	N: {
		description: "Devuelve un valor convertido en un número",
		abstract: "Devuelve un valor convertido en un número",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/n-function"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "El valor que desea convertir."
		} }
	},
	NA: {
		description: "Devuelve el valor de error #N/A",
		abstract: "Devuelve el valor de error #N/A",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/na-function"
		}],
		functionParameter: {}
	},
	SHEET: {
		description: "Devuelve el número de hoja de la hoja de referencia",
		abstract: "Devuelve el número de hoja de la hoja de referencia",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/sheet-function"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "Valor es el nombre de una hoja o una referencia para la que desea el número de hoja. Si se omite el valor, HOJA devuelve el número de la hoja que contiene la función."
		} }
	},
	SHEETS: {
		description: "Devuelve el número de hojas en un libro",
		abstract: "Devuelve el número de hojas en un libro",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/sheets-function"
		}],
		functionParameter: {}
	},
	TYPE: {
		description: "Devuelve un número que indica el tipo de datos de un valor",
		abstract: "Devuelve un número que indica el tipo de datos de un valor",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/type-function"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "Puede ser cualquier valor, como un número, texto, valor lógico, etc."
		} }
	}
};

//#endregion
//#region src/locale/function-list/logical/es-ES.ts
const locale$7 = {
	AND: {
		description: "Devuelve VERDADERO si todos sus argumentos son VERDADERO",
		abstract: "Devuelve VERDADERO si todos sus argumentos son VERDADERO",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/and-function"
		}],
		functionParameter: {
			logical1: {
				name: "lógico1",
				detail: "La primera condición que se desea comprobar y que puede evaluarse como VERDADERO o FALSO."
			},
			logical2: {
				name: "lógico2",
				detail: "Otras condiciones que se desean comprobar, hasta un máximo de 255, que pueden evaluarse como VERDADERO o FALSO."
			}
		}
	},
	BYCOL: {
		description: "Aplica una función LAMBDA a cada columna y devuelve una matriz de los resultados",
		abstract: "Aplica una función LAMBDA a cada columna y devuelve una matriz de los resultados",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/bycol-function"
		}],
		functionParameter: {
			array: {
				name: "matriz",
				detail: "Matriz que se va a separar por columnas."
			},
			lambda: {
				name: "lambda",
				detail: "Una función LAMBDA que toma una columna como un único parámetro y calcula un resultado. La función LAMBDA toma un único parámetro: una columna de la matriz."
			}
		}
	},
	BYROW: {
		description: "Aplica una función LAMBDA a cada fila y devuelve una matriz de los resultados",
		abstract: "Aplica una función LAMBDA a cada fila y devuelve una matriz de los resultados",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/byrow-function"
		}],
		functionParameter: {
			array: {
				name: "matriz",
				detail: "Matriz que se va a separar por filas."
			},
			lambda: {
				name: "lambda",
				detail: "Una función LAMBDA que toma una fila como un único parámetro y calcula un resultado. La función LAMBDA toma un único parámetro: una fila de la matriz."
			}
		}
	},
	FALSE: {
		description: "Devuelve el valor lógico FALSO.",
		abstract: "Devuelve el valor lógico FALSO.",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/false-function"
		}],
		functionParameter: {}
	},
	IF: {
		description: "Especifica una prueba lógica que realizar",
		abstract: "Especifica una prueba lógica que realizar",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/if-function"
		}],
		functionParameter: {
			logicalTest: {
				name: "prueba_lógica",
				detail: "La condición que desea probar."
			},
			valueIfTrue: {
				name: "valor_si_verdadero",
				detail: "El valor que desea que se devuelva si el resultado de la prueba_lógica es VERDADERO."
			},
			valueIfFalse: {
				name: "valor_si_falso",
				detail: "El valor que desea que se devuelva si el resultado de la prueba_lógica es FALSO."
			}
		}
	},
	IFERROR: {
		description: "Devuelve un valor que se especifica si una fórmula se evalúa como un error; de lo contrario, devuelve el resultado de la fórmula",
		abstract: "Devuelve un valor que se especifica si una fórmula se evalúa como un error; de lo contrario, devuelve el resultado de la fórmula",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/iferror-function"
		}],
		functionParameter: {
			value: {
				name: "valor",
				detail: "El argumento que se comprueba en busca de un error."
			},
			valueIfError: {
				name: "valor_si_error",
				detail: "El valor que se devolverá si la fórmula se evalúa como un error. Se evalúan los siguientes tipos de error: #N/A, #¡VALOR!, #¡REF!, #¡DIV/0!, #¡NUM!, #¿NOMBRE? o #¡NULO!."
			}
		}
	},
	IFNA: {
		description: "Devuelve el valor que se especifica si la expresión se resuelve en #N/A; de lo contrario, devuelve el resultado de la expresión",
		abstract: "Devuelve el valor que se especifica si la expresión se resuelve en #N/A; de lo contrario, devuelve el resultado de la expresión",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/ifna-function"
		}],
		functionParameter: {
			value: {
				name: "valor",
				detail: "El argumento en el que se busca el valor de error #N/A."
			},
			valueIfNa: {
				name: "valor_si_na",
				detail: "El valor que se devolverá si la fórmula se evalúa con el valor de error #N/A."
			}
		}
	},
	IFS: {
		description: "Comprueba si se cumplen una o más condiciones y devuelve un valor que corresponde a la primera condición VERDADERA.",
		abstract: "Comprueba si se cumplen una o más condiciones y devuelve un valor que corresponde a la primera condición VERDADERA.",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/ifs-function"
		}],
		functionParameter: {
			logicalTest1: {
				name: "prueba_lógica1",
				detail: "Condición que se evalúa como VERDADERO o FALSO."
			},
			valueIfTrue1: {
				name: "valor_si_verdadero1",
				detail: "Resultado que se devolverá si prueba_lógica1 se evalúa como VERDADERO. Puede estar vacío."
			},
			logicalTest2: {
				name: "prueba_lógica2",
				detail: "Condición que se evalúa como VERDADERO o FALSO."
			},
			valueIfTrue2: {
				name: "valor_si_verdadero2",
				detail: "Resultado que se devolverá si prueba_lógicaN se evalúa como VERDADERO. Cada valor_si_verdaderoN se corresponde con una condición prueba_lógicaN. Puede estar vacío."
			}
		}
	},
	LAMBDA: {
		description: "Use una función LAMBDA para crear funciones personalizadas y reutilizables, y llámelas con un nombre descriptivo. La nueva función está disponible en todo el libro y se llama como las funciones nativas de Excel.",
		abstract: "Crea funciones personalizadas y reutilizables y llámalas por un nombre descriptivo",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/lambda-function"
		}],
		functionParameter: {
			parameter: {
				name: "parámetro",
				detail: "Un valor que desea pasar a la función, como una referencia de celda, una cadena o un número. Puede introducir hasta 253 parámetros. Este argumento es opcional."
			},
			calculation: {
				name: "cálculo",
				detail: "La fórmula que desea ejecutar y devolver como resultado de la función. Debe ser el último argumento y debe devolver un resultado. Este argumento es obligatorio."
			}
		}
	},
	LET: {
		description: "Asigna nombres a los resultados de los cálculos",
		abstract: "Asigna nombres a los resultados de los cálculos",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/let-function"
		}],
		functionParameter: {
			name1: {
				name: "nombre1",
				detail: "El primer nombre que se va a asignar. Debe empezar con una letra. No puede ser el resultado de una fórmula ni entrar en conflicto con la sintaxis de rango."
			},
			nameValue1: {
				name: "valor_nombre1",
				detail: "El valor que se asigna a nombre1."
			},
			calculationOrName2: {
				name: "cálculo_o_nombre2",
				detail: "Uno de los siguientes:\n1.Un cálculo que use todos los nombres de la función LET. Debe ser el último argumento de la función LET.\n2.Un segundo nombre para asignar a un segundo valor_nombre. Si se especifica un nombre, valor_nombre2 y cálculo_o_nombre3 son obligatorios."
			},
			nameValue2: {
				name: "valor_nombre2",
				detail: "El valor que se asigna a cálculo_o_nombre2."
			},
			calculationOrName3: {
				name: "cálculo_o_nombre3",
				detail: "Uno de los siguientes:\n1.Un cálculo que use todos los nombres de la función LET. El último argumento de la función LET debe ser un cálculo.\n2.Un tercer nombre para asignar a un tercer valor_nombre. Si se especifica un nombre, valor_nombre3 y cálculo_o_nombre4 son obligatorios."
			}
		}
	},
	MAKEARRAY: {
		description: "Devuelve una matriz calculada de un tamaño de fila y columna especificado, mediante la aplicación de una LAMBDA",
		abstract: "Devuelve una matriz calculada de un tamaño de fila y columna especificado, mediante la aplicación de una LAMBDA",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/makearray-function"
		}],
		functionParameter: {
			number1: {
				name: "filas",
				detail: "El número de filas de la matriz. Debe ser mayor que cero."
			},
			number2: {
				name: "columnas",
				detail: "El número de columnas de la matriz. Debe ser mayor que cero."
			},
			value3: {
				name: "lambda",
				detail: "Una función LAMBDA que se llama para crear la matriz. La función LAMBDA toma dos parámetros: fila (el índice de fila de la matriz), columna (el índice de columna de la matriz)."
			}
		}
	},
	MAP: {
		description: "Devuelve una matriz formada al asignar cada valor de las matrices a un nuevo valor aplicando una LAMBDA para crear un nuevo valor.",
		abstract: "Devuelve una matriz formada al asignar cada valor de las matrices a un nuevo valor aplicando una LAMBDA para crear un nuevo valor.",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/map-function"
		}],
		functionParameter: {
			array1: {
				name: "matriz1",
				detail: "Una matriz1 que se va a asignar."
			},
			array2: {
				name: "matriz2",
				detail: "Una matriz2 que se va a asignar."
			},
			lambda: {
				name: "lambda",
				detail: "Una función LAMBDA que debe ser el último argumento y que debe tener un parámetro para cada matriz pasada."
			}
		}
	},
	NOT: {
		description: "Invierte el valor lógico de su argumento.",
		abstract: "Invierte el valor lógico de su argumento.",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/not-function"
		}],
		functionParameter: { logical: {
			name: "lógico",
			detail: "La condición para la que desea invertir la lógica, que puede evaluarse como VERDADERO o FALSO."
		} }
	},
	OR: {
		description: "Devuelve VERDADERO si alguno de sus argumentos se evalúa como VERDADERO, y devuelve FALSO si todos sus argumentos se evalúan como FALSO.",
		abstract: "Devuelve VERDADERO si algún argumento es VERDADERO",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/or-function"
		}],
		functionParameter: {
			logical1: {
				name: "lógico1",
				detail: "La primera condición que se desea comprobar y que puede evaluarse como VERDADERO o FALSO."
			},
			logical2: {
				name: "lógico2",
				detail: "Otras condiciones que se desean comprobar, hasta un máximo de 255, que pueden evaluarse como VERDADERO o FALSO."
			}
		}
	},
	REDUCE: {
		description: "Reduce una matriz a un valor acumulado aplicando una LAMBDA a cada valor y devolviendo el valor total en el acumulador.",
		abstract: "Reduce una matriz a un valor acumulado aplicando una LAMBDA a cada valor y devolviendo el valor total en el acumulador.",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/reduce-function"
		}],
		functionParameter: {
			initialValue: {
				name: "valor_inicial",
				detail: "Establece el valor inicial para el acumulador."
			},
			array: {
				name: "matriz",
				detail: "Una matriz que se va a reducir."
			},
			lambda: {
				name: "lambda",
				detail: "Una función LAMBDA que se llama para reducir la matriz. La función LAMBDA toma tres parámetros: 1.El valor totalizado y devuelto como resultado final. 2.El valor actual de la matriz. 3.El cálculo aplicado a cada elemento de la matriz."
			}
		}
	},
	SCAN: {
		description: "Examina una matriz aplicando una LAMBDA a cada valor y devuelve una matriz que tiene cada valor intermedio.",
		abstract: "Examina una matriz aplicando una LAMBDA a cada valor y devuelve una matriz que tiene cada valor intermedio.",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/scan-function"
		}],
		functionParameter: {
			initialValue: {
				name: "valor_inicial",
				detail: "Establece el valor inicial para el acumulador."
			},
			array: {
				name: "matriz",
				detail: "Una matriz que se va a examinar."
			},
			lambda: {
				name: "lambda",
				detail: "Una función LAMBDA que se llama para examinar la matriz. La función LAMBDA toma tres parámetros: 1.El valor totalizado y devuelto como resultado final. 2.El valor actual de la matriz. 3.El cálculo aplicado a cada elemento de la matriz."
			}
		}
	},
	SWITCH: {
		description: "Evalúa una expresión comparándola con una lista de valores y devuelve el resultado correspondiente al primer valor coincidente. Si no hay ninguna coincidencia, puede devolverse un valor predeterminado opcional.",
		abstract: "Evalúa una expresión comparándola con una lista de valores y devuelve el resultado correspondiente al primer valor coincidente. Si no hay ninguna coincidencia, puede devolverse un valor predeterminado opcional.",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/switch-function"
		}],
		functionParameter: {
			expression: {
				name: "expresión",
				detail: "Expresión es el valor (como un número, fecha o texto) que se comparará con valor1...valor126."
			},
			value1: {
				name: "valor1",
				detail: "ValorN es un valor que se comparará con la expresión."
			},
			result1: {
				name: "resultado1",
				detail: "ResultadoN es el valor que se devolverá cuando el argumento valorN correspondiente coincida con la expresión. ResultadoN debe proporcionarse para cada argumento valorN correspondiente."
			},
			defaultOrValue2: {
				name: "predeterminado_o_valor2",
				detail: "Predeterminado es el valor que se devolverá en caso de que no se encuentren coincidencias en las expresiones valorN. El argumento Predeterminado se identifica por no tener una expresión resultadoN correspondiente (consulte los ejemplos). Predeterminado debe ser el último argumento de la función."
			},
			result2: {
				name: "resultado2",
				detail: "ResultadoN es el valor que se devolverá cuando el argumento valorN correspondiente coincida con la expresión. ResultadoN debe proporcionarse para cada argumento valorN correspondiente."
			}
		}
	},
	TRUE: {
		description: "Devuelve el valor lógico VERDADERO.",
		abstract: "Devuelve el valor lógico VERDADERO.",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/true-function"
		}],
		functionParameter: {}
	},
	XOR: {
		description: "Devuelve VERDADERO si un número impar de sus argumentos se evalúa como VERDADERO, y FALSO si un número par de sus argumentos se evalúa como VERDADERO.",
		abstract: "Devuelve VERDADERO si un número impar de argumentos son VERDADERO",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/xor-function"
		}],
		functionParameter: {
			logical1: {
				name: "lógico1",
				detail: "La primera condición que se desea comprobar y que puede evaluarse como VERDADERO o FALSO."
			},
			logical2: {
				name: "lógico2",
				detail: "Otras condiciones que se desean comprobar, hasta un máximo de 255, que pueden evaluarse como VERDADERO o FALSO."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/lookup/es-ES.ts
const locale$6 = {
	ADDRESS: {
		description: "Obtiene la dirección de una celda en una hoja de cálculo, dados los números de fila y columna especificados. Por ejemplo, DIRECCION(2,3) devuelve $C$2. Como otro ejemplo, DIRECCION(77,300) devuelve $KN$77. Puede usar otras funciones, como las funciones FILA y COLUMNA, para proporcionar los argumentos de número de fila y columna para la función DIRECCION.",
		abstract: "Devuelve una referencia como texto a una celda única en una hoja de cálculo",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/address-function"
		}],
		functionParameter: {
			row_num: {
				name: "número de fila",
				detail: "Un valor numérico que especifica el número de fila a usar en la referencia de celda."
			},
			column_num: {
				name: "número de columna",
				detail: "Un valor numérico que especifica el número de columna a usar en la referencia de celda."
			},
			abs_num: {
				name: "tipo de referencia",
				detail: "Un valor numérico que especifica el tipo de referencia a devolver."
			},
			a1: {
				name: "estilo de referencia",
				detail: "Un valor lógico que especifica el estilo de referencia A1 o F1C1. En el estilo A1, las columnas se etiquetan alfabéticamente y las filas numéricamente. En el estilo de referencia F1C1, tanto las columnas como las filas se etiquetan numéricamente. Si el argumento A1 es VERDADERO o se omite, la función DIRECCION devuelve una referencia de estilo A1; si es FALSO, la función DIRECCION devuelve una referencia de estilo F1C1."
			},
			sheet_text: {
				name: "nombre de la hoja",
				detail: "Un valor de texto que especifica el nombre de la hoja de cálculo que se utilizará como referencia externa. Por ejemplo, la fórmula =DIRECCION(1,1,,,\"Hoja2\") devuelve Hoja2!$A$1. Si se omite el argumento nombre_hoja, no se usa ningún nombre de hoja y la dirección devuelta por la función se refiere a una celda en la hoja actual."
			}
		}
	},
	AREAS: {
		description: "Devuelve el número de áreas en una referencia",
		abstract: "Devuelve el número de áreas en una referencia",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/areas-function"
		}],
		functionParameter: { reference: {
			name: "referencia",
			detail: "Una referencia a una celda o rango de celdas y puede referirse a múltiples áreas."
		} }
	},
	CHOOSE: {
		description: "Elige un valor de una lista de valores.",
		abstract: "Elige un valor de una lista de valores",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/choose-function"
		}],
		functionParameter: {
			indexNum: {
				name: "núm_índice",
				detail: "Especifica qué argumento de valor se selecciona. Núm_índice debe ser un número entre 1 y 254, o una fórmula o referencia a una celda que contenga un número entre 1 y 254.\nSi núm_índice es 1, ELEGIR devuelve valor1; si es 2, ELEGIR devuelve valor2; y así sucesivamente.\nSi núm_índice es menor que 1 o mayor que el número del último valor de la lista, ELEGIR devuelve el valor de error #¡VALOR!.\nSi núm_índice es una fracción, se trunca al entero inferior antes de ser utilizado."
			},
			value1: {
				name: "valor1",
				detail: "ELEGIR selecciona un valor o una acción a realizar en función de núm_índice. Los argumentos pueden ser números, referencias de celda, nombres definidos, fórmulas, funciones o texto."
			},
			value2: {
				name: "valor2",
				detail: "De 1 a 254 argumentos de valor."
			}
		}
	},
	CHOOSECOLS: {
		description: "Devuelve las columnas especificadas de una matriz",
		abstract: "Devuelve las columnas especificadas de una matriz",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/choosecols-function"
		}],
		functionParameter: {
			array: {
				name: "matriz",
				detail: "La matriz que contiene las columnas que se devolverán en la nueva matriz."
			},
			colNum1: {
				name: "col_núm1",
				detail: "La primera columna que se devolverá."
			},
			colNum2: {
				name: "col_núm2",
				detail: "Columnas adicionales que se devolverán."
			}
		}
	},
	CHOOSEROWS: {
		description: "Devuelve las filas especificadas de una matriz",
		abstract: "Devuelve las filas especificadas de una matriz",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/chooserows-function"
		}],
		functionParameter: {
			array: {
				name: "matriz",
				detail: "La matriz que contiene las filas que se devolverán en la nueva matriz."
			},
			rowNum1: {
				name: "fila_núm1",
				detail: "El número de la primera fila que se devolverá."
			},
			rowNum2: {
				name: "fila_núm2",
				detail: "Números de filas adicionales que se devolverán."
			}
		}
	},
	COLUMN: {
		description: "Devuelve el número de columna de la referencia de celda dada.",
		abstract: "Devuelve el número de columna de una referencia",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/column-function"
		}],
		functionParameter: { reference: {
			name: "referencia",
			detail: "La celda o rango de celdas para el cual desea devolver el número de columna."
		} }
	},
	COLUMNS: {
		description: "Devuelve el número de columnas en una matriz o referencia.",
		abstract: "Devuelve el número de columnas en una referencia",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/columns-function"
		}],
		functionParameter: { array: {
			name: "matriz",
			detail: "Una matriz o fórmula de matriz, o una referencia a un rango de celdas para el cual desea el número de columnas."
		} }
	},
	DROP: {
		description: "Excluye un número especificado de filas o columnas desde el inicio o el final de una matriz",
		abstract: "Excluye un número especificado de filas o columnas desde el inicio o el final de una matriz",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/drop-function"
		}],
		functionParameter: {
			array: {
				name: "matriz",
				detail: "La matriz de la que se soltarán filas o columnas."
			},
			rows: {
				name: "filas",
				detail: "El número de filas a soltar. Un valor negativo suelta desde el final de la matriz."
			},
			columns: {
				name: "columnas",
				detail: "El número de columnas a excluir. Un valor negativo suelta desde el final de la matriz."
			}
		}
	},
	EXPAND: {
		description: "Expande o rellena una matriz a las dimensiones de fila y columna especificadas",
		abstract: "Expande o rellena una matriz a las dimensiones de fila y columna especificadas",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/expand-function"
		}],
		functionParameter: {
			array: {
				name: "matriz",
				detail: "La matriz a expandir."
			},
			rows: {
				name: "filas",
				detail: "El número de filas en la matriz expandida. Si falta, las filas no se expandirán."
			},
			columns: {
				name: "columnas",
				detail: "El número de columnas en la matriz expandida. Si falta, las columnas no se expandirán."
			},
			padWith: {
				name: "rellenar_con",
				detail: "El valor con el que rellenar. El valor predeterminado es #N/A."
			}
		}
	},
	FILTER: {
		description: "Filtra un rango de datos en función de los criterios que defina",
		abstract: "Filtra un rango de datos en función de los criterios que defina",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/filter-function"
		}],
		functionParameter: {
			array: {
				name: "matriz",
				detail: "El rango o matriz a filtrar."
			},
			include: {
				name: "incluir",
				detail: "Una matriz de valores booleanos donde VERDADERO indica que se debe retener una fila o columna."
			},
			ifEmpty: {
				name: "si_vacío",
				detail: "Si no se reservan elementos, devolver."
			}
		}
	},
	FORMULATEXT: {
		description: "Devuelve la fórmula en la referencia dada como texto",
		abstract: "Devuelve la fórmula en la referencia dada como texto",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/formulatext-function"
		}],
		functionParameter: { reference: {
			name: "referencia",
			detail: "Una referencia a una celda o rango de celdas."
		} }
	},
	GETPIVOTDATA: {
		description: "La captura de pantalla siguiente muestra el diseño de tabla dinámica que se usa en las siguientes secciones. En este ejemplo, =IMPORTARDATOSDINAMICOS(\"Ventas\",A3) devuelve el importe total de ventas:",
		abstract: "La captura de pantalla siguiente muestra el diseño de tabla dinámica que se usa en las siguientes secciones. En este ejemplo, =IMPORTARDATOSDINAMICOS(\"Ventas\",A3) devuelve el importe total de ventas:",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/getpivotdata-function"
		}],
		functionParameter: {
			dataField: {
				name: "dataField",
				detail: "Nombre del campo de tabla dinámica que contiene los datos que quiere recuperar. Debe estar entre comillas. Ejemplo: =IMPORTARDATOSDINAMICOS(\"Ventas\"; A3). Aquí, \"Ventas\" es el campo Valores que queremos recuperar. Dado que no se especifica ningún otro campo, IMPORTARDATOSDINAMICOS devuelve el importe total de ventas."
			},
			pivotTable: {
				name: "pivotTable",
				detail: "Es una referencia a cualquier celda, rango de celdas o rango de celdas en una tabla dinámica. Esta información se usa para determinar cuál tabla dinámica contiene los datos que desea recuperar. Ejemplo: =IMPORTARDATOSDINAMICOS(\"Ventas\"; A3). Aquí, A3 es una referencia dentro de la tabla dinámica e indica a la fórmula qué tabla dinámica usar."
			},
			field1: {
				name: "field1",
				detail: "De 1 a 126 parejas de nombres de campo y elemento que describen los datos que desea recuperar. Las parejas pueden estar en cualquier orden. Los nombres de campo y elemento que no son fechas ni números deben estar entre comillas. Ejemplo: =IMPORTARDATOSDINAMICOS(\"Ventas\"; A3; \"Mes\"; \"Mar\"). Aquí, \"Mes\" es el campo y \"Mar\" es el elemento. Para especificar varios elementos para un campo, escríbalos entre llaves (por ejemplo: {\"Mar\", \"Abr\"}). En las tablas dinámicas OLAP , los elementos pueden contener el nombre de origen de la dimensión y también el nombre de origen del elemento. Una pareja de campo y elemento de una tabla dinámica OLAP puede tener el siguiente aspecto: \"[Producto]\",\"[Producto].[Todos los productos].[Alimentos].[Bollería]\""
			},
			item1: {
				name: "item1",
				detail: "De 1 a 126 parejas de nombres de campo y elemento que describen los datos que desea recuperar. Las parejas pueden estar en cualquier orden. Los nombres de campo y elemento que no son fechas ni números deben estar entre comillas. Ejemplo: =IMPORTARDATOSDINAMICOS(\"Ventas\"; A3; \"Mes\"; \"Mar\"). Aquí, \"Mes\" es el campo y \"Mar\" es el elemento. Para especificar varios elementos para un campo, escríbalos entre llaves (por ejemplo: {\"Mar\", \"Abr\"}). En las tablas dinámicas OLAP , los elementos pueden contener el nombre de origen de la dimensión y también el nombre de origen del elemento. Una pareja de campo y elemento de una tabla dinámica OLAP puede tener el siguiente aspecto: \"[Producto]\",\"[Producto].[Todos los productos].[Alimentos].[Bollería]\""
			}
		}
	},
	HLOOKUP: {
		description: "Busca un valor en la fila superior de una tabla o una matriz de valores y, después, devuelve un valor en la misma columna de una fila especificada en la tabla o matriz. Use BUSCARH cuando los valores de comparación se encuentren en una fila en la parte superior de una tabla de datos y desee encontrar información que se halle dentro de un número especificado de filas. Use BUSCARV cuando los valores de comparación se encuentren en una columna a la izquierda de los datos que desea encontrar.",
		abstract: "Busca un valor en la fila superior de una tabla o una matriz de valores y, después, devuelve un valor en la misma columna de una fila especificada en la tabla o matriz. Use BUSCARH cuando los valores de comparación se encuentren en una fila en la parte superior de una tabla de datos y desee encontrar información que se halle dentro de un número especificado de filas. Use BUSCARV cuando los valores de comparación se encuentren en una columna a la izquierda de los datos que desea encontrar.",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/hlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "valor_buscado",
				detail: "Obligatorio. Es el valor que se busca en la primera fila de la tabla. Valor_buscado puede ser un valor, una referencia o una cadena de texto."
			},
			tableArray: {
				name: "tabla_matriz",
				detail: "Obligatorio. Es una tabla de información en la que se buscan los datos. Use una referencia a un rango o el nombre de un rango. Los valores de la primera fila del argumento matriz_buscar_en pueden ser texto, números o valores lógicos. Si ordenado es VERDADERO, los valores de la primera fila de matriz_buscar_en deben colocarse en orden ascendente: ...-2, -1, 0, 1, 2, ..., A-Z, FALSO, VERDADERO; de lo contrario, BUSCARH puede devolver un valor incorrecto. Si ordenado es FALSO, no es necesario ordenar matriz_buscar_en. Las mayúsculas y minúsculas del texto son equivalentes. Ordene los valores en orden ascendente, de izquierda a derecha. Para obtener más información, vea Ordenar datos en un rango o tabla ."
			},
			rowIndexNum: {
				name: "índice_fila_núm",
				detail: "Obligatorio. El número de fila en matriz_tabla desde el cual se devolverá el valor coincidente. Un indicador_filas de 1, devuelve el primer valor de la fila en matriz_tabla, un indicador_filas de 2 devuelve el segundo valor de la fila en matriz_tabla y así sucesivamente. Si indicador_filas es menor que 1, BUSCARH devuelve el valor de error #¡VALOR!; si indicador_filas es mayor que el número de filas en tabla_matriz BUSCARH devuelve el valor de error #¡REF!. error #¡NUM!."
			},
			rangeLookup: {
				name: "búsqueda_rango",
				detail: "Opcional. Es un valor lógico que especifica si BUSCARH debe localizar una coincidencia exacta o aproximada. Si lo omite o es VERDADERO, devolverá una coincidencia aproximada. Es decir, si no encuentra ninguna coincidencia exacta, devolverá el siguiente valor mayor que sea inferior a valor_buscado. Si es FALSO, BUSCARH encontrará una coincidencia exacta. Si no encuentra ninguna, devolverá el valor de error #N/A."
			}
		}
	},
	HSTACK: {
		description: "Anexa matrices horizontalmente y en secuencia para devolver una matriz más grande",
		abstract: "Anexa matrices horizontalmente y en secuencia para devolver una matriz más grande",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/hstack-function"
		}],
		functionParameter: {
			array1: {
				name: "matriz",
				detail: "Las matrices a anexar."
			},
			array2: {
				name: "matriz",
				detail: "Las matrices a anexar."
			}
		}
	},
	HYPERLINK: {
		description: "Crea un hiperenlace en una celda.",
		abstract: "Crea un hiperenlace en una celda.",
		links: [{
			title: "Instrucción",
			url: "https://support.google.com/docs/answer/3093313?hl=es"
		}],
		functionParameter: {
			url: {
				name: "url",
				detail: "URL completa de la ubicación del enlace escrita entre comillas, o una referencia a una celda que contenga dicha URL. Solo se permiten determinados tipos de enlaces: http:// , https:// , mailto: , aim: , ftp:// , gopher:// , telnet:// y news:// . El resto están prohibidos. Si se especifica otro protocolo, se mostrará link_label en la celda, pero no se creará un hiperenlace. Si no se especifica ningún protocolo, se utilizará http:// de forma predeterminada y se antepondrá a url ."
			},
			linkLabel: {
				name: "etiqueta_enlace",
				detail: "[ OPCIONAL: url de forma predeterminada ] : texto que se muestra en la celda como enlace, entre comillas, o referencia a una celda que contenga dicha etiqueta. Si link_label es una referencia a una celda vacía, url se mostrará como un enlace si es válida o como texto sin formato en caso contrario. Si link_label es la cadena literal vacía (\"\"), la celda aparecerá vacía, pero se podrá acceder al enlace haciendo clic en la celda o moviéndose hasta ella."
			}
		}
	},
	IMAGE: {
		description: "La función IMAGEN inserta imágenes en celdas desde una ubicación de origen junto con texto alternativo. Después, puede mover y cambiar el tamaño de las celdas, ordenar y filtrar, y trabajar con imágenes dentro de una tabla de Excel. Use esta función para mejorar visualmente listas de datos, como inventarios, juegos, empleados y conceptos matemáticos.",
		abstract: "La función IMAGEN inserta imágenes en celdas desde una ubicación de origen junto con texto alternativo. Después, puede mover y cambiar el tamaño de las celdas, ordenar y filtrar, y trabajar con imágenes dentro de una tabla de Excel. Use esta función para mejorar visualmente listas de datos, como inventarios, juegos, empleados y conceptos matemáticos.",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/image-function"
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
		description: "Devuelve la referencia de la celda en la intersección de una fila y columna particulares. Si la referencia está compuesta por selecciones no adyacentes, puede elegir la selección en la que buscar.",
		abstract: "Usa un índice para elegir un valor de una referencia o matriz",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/index-function"
		}],
		functionParameter: {
			reference: {
				name: "referencia",
				detail: "Una referencia a uno o más rangos de celdas."
			},
			rowNum: {
				name: "fila_núm",
				detail: "El número de la fila en la referencia desde la cual devolver una referencia."
			},
			columnNum: {
				name: "columna_núm",
				detail: "El número de la columna en la referencia desde la cual devolver una referencia."
			},
			areaNum: {
				name: "área_núm",
				detail: "Selecciona un rango en la referencia desde el cual devolver la intersección de fila_núm y columna_núm."
			}
		}
	},
	INDIRECT: {
		description: "Devuelve la referencia especificada por una cadena de texto. Las referencias se evalúan inmediatamente para mostrar su contenido.",
		abstract: "Devuelve una referencia indicada por un valor de texto",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/indirect-function"
		}],
		functionParameter: {
			refText: {
				name: "ref_texto",
				detail: "Una referencia a una celda que contiene una referencia de estilo A1, una referencia de estilo F1C1, un nombre definido como una referencia o una referencia a una celda como una cadena de texto."
			},
			a1: {
				name: "a1",
				detail: "Un valor lógico que especifica qué tipo de referencia está contenida en la celda ref_texto."
			}
		}
	},
	LOOKUP: {
		description: "Cuando necesite buscar en una sola fila o columna y encontrar un valor desde la misma posición en una segunda fila o columna",
		abstract: "Busca valores en un vector o matriz",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/lookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "valor_buscado",
				detail: "Un valor que BUSCAR busca en el primer vector. Valor_buscado puede ser un número, texto, un valor lógico, o un nombre o referencia que se refiera a un valor."
			},
			lookupVectorOrArray: {
				name: "vector_o_matriz_buscado",
				detail: "Un rango que contiene solo una fila o una columna"
			},
			resultVector: {
				name: "vector_resultado",
				detail: "Un rango que contiene solo una fila o columna. El argumento vector_resultado debe tener el mismo tamaño que vector_buscado."
			}
		}
	},
	MATCH: {
		description: "La función COINCIDIR busca un elemento especificado en un rango de celdas y luego devuelve la posición relativa de ese elemento en el rango.",
		abstract: "Busca valores en una referencia o matriz",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/match-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "valor_buscado",
				detail: "El valor que desea hacer coincidir en matriz_buscada."
			},
			lookupArray: {
				name: "matriz_buscada",
				detail: "El rango de celdas que se está buscando."
			},
			matchType: {
				name: "tipo_coincidencia",
				detail: "El número -1, 0 o 1."
			}
		}
	},
	OFFSET: {
		description: "Devuelve una referencia desplazada desde una referencia dada",
		abstract: "Devuelve una referencia desplazada desde una referencia dada",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/offset-function"
		}],
		functionParameter: {
			reference: {
				name: "referencia",
				detail: "La referencia desde la que desea basar el desplazamiento."
			},
			rows: {
				name: "filas",
				detail: "El número de filas, hacia arriba o hacia abajo, a las que desea que se refiera la celda superior izquierda."
			},
			cols: {
				name: "columnas",
				detail: "El número de columnas, a la izquierda o a la derecha, a las que desea que se refiera la celda superior izquierda del resultado."
			},
			height: {
				name: "altura",
				detail: "La altura, en número de filas, que desea que tenga la referencia devuelta. La altura debe ser un número positivo."
			},
			width: {
				name: "anchura",
				detail: "La anchura, en número de columnas, que desea que tenga la referencia devuelta. La anchura debe ser un número positivo."
			}
		}
	},
	ROW: {
		description: "Devuelve el número de fila de una referencia",
		abstract: "Devuelve el número de fila de una referencia",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/row-function"
		}],
		functionParameter: { reference: {
			name: "referencia",
			detail: "La celda o rango de celdas para el cual desea el número de fila."
		} }
	},
	ROWS: {
		description: "Devuelve el número de filas en una matriz o referencia.",
		abstract: "Devuelve el número de filas en una referencia",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/rows-function"
		}],
		functionParameter: { array: {
			name: "matriz",
			detail: "Una matriz, una fórmula de matriz o una referencia a un rango de celdas para el cual desea el número de filas."
		} }
	},
	RTD: {
		description: "Recupera datos en tiempo real de un programa que admite la automatización COM",
		abstract: "Recupera datos en tiempo real de un programa que admite la automatización COM",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/rtd-function"
		}],
		functionParameter: {
			progId: {
				name: "Identificador de programa",
				detail: "Nombre del identificador de programa del complemento de automatización COM instalado localmente."
			},
			server: {
				name: "Servidor",
				detail: "Nombre del servidor donde se ejecuta el complemento; use una cadena vacía para el servidor local."
			},
			topic1: {
				name: "Tema 1",
				detail: "Primer texto que especifica los datos en tiempo real que se recuperan."
			},
			topic2: {
				name: "Tema 2",
				detail: "Opcional. Textos adicionales que especifican los datos en tiempo real."
			}
		}
	},
	SORT: {
		description: "Ordena el contenido de un rango o matriz",
		abstract: "Ordena el contenido de un rango o matriz",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/sort-function"
		}],
		functionParameter: {
			array: {
				name: "matriz",
				detail: "El rango o matriz a ordenar."
			},
			sortIndex: {
				name: "índice_ordenación",
				detail: "Un número que indica el orden de clasificación (por fila o por columna)."
			},
			sortOrder: {
				name: "orden_clasificación",
				detail: "Un número que representa el orden de clasificación deseado; 1 para ascendente (predeterminado), -1 para descendente."
			},
			byCol: {
				name: "por_col",
				detail: "Valor lógico que indica la dirección de clasificación deseada; FALSO ordena por filas (predeterminado), VERDADERO ordena por columnas."
			}
		}
	},
	SORTBY: {
		description: "Ordena el contenido de un rango o matriz en función de los valores en un rango o matriz correspondiente",
		abstract: "Ordena el contenido de un rango o matriz en función de los valores en un rango o matriz correspondiente",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/sortby-function"
		}],
		functionParameter: {
			array: {
				name: "matriz",
				detail: "El rango o matriz a ordenar."
			},
			byArray1: {
				name: "por_matriz1",
				detail: "El rango o matriz en función del cual ordenar."
			},
			sortOrder1: {
				name: "orden_clasificación1",
				detail: "Un número que representa el orden de clasificación deseado; 1 para ascendente (predeterminado), -1 para descendente."
			},
			byArray2: {
				name: "por_matriz2",
				detail: "El rango o matriz en función del cual ordenar."
			},
			sortOrder2: {
				name: "orden_clasificación2",
				detail: "Un número que representa el orden de clasificación deseado; 1 para ascendente (predeterminado), -1 para descendente."
			}
		}
	},
	TAKE: {
		description: "Devuelve un número especificado de filas o columnas contiguas desde el inicio o el final de una matriz",
		abstract: "Devuelve un número especificado de filas o columnas contiguas desde el inicio o el final de una matriz",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/take-function"
		}],
		functionParameter: {
			array: {
				name: "matriz",
				detail: "La matriz de la que se tomarán filas o columnas."
			},
			rows: {
				name: "filas",
				detail: "El número de filas a tomar. Un valor negativo toma desde el final de la matriz."
			},
			columns: {
				name: "columnas",
				detail: "El número de columnas a tomar. Un valor negativo toma desde el final de la matriz."
			}
		}
	},
	TOCOL: {
		description: "Devuelve la matriz en una sola columna",
		abstract: "Devuelve la matriz en una sola columna",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/tocol-function"
		}],
		functionParameter: {
			array: {
				name: "matriz",
				detail: "La matriz o referencia a devolver como una columna."
			},
			ignore: {
				name: "ignorar",
				detail: "Si se deben ignorar ciertos tipos de valores. Por defecto, no se ignora ningún valor. Especifique uno de los siguientes:\n0 Mantener todos los valores (predeterminado)\n1 Ignorar espacios en blanco\n2 Ignorar errores\n3 Ignorar espacios en blanco y errores"
			},
			scanByColumn: {
				name: "escanear_por_columna",
				detail: "Escanear la matriz por columna. Por defecto, la matriz se escanea por fila. El escaneo determina si los valores se ordenan por fila o por columna."
			}
		}
	},
	TOROW: {
		description: "Devuelve la matriz en una sola fila",
		abstract: "Devuelve la matriz en una sola fila",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/torow-function"
		}],
		functionParameter: {
			array: {
				name: "matriz",
				detail: "La matriz o referencia a devolver como una fila."
			},
			ignore: {
				name: "ignorar",
				detail: "Si se deben ignorar ciertos tipos de valores. Por defecto, no se ignora ningún valor. Especifique uno de los siguientes:\n0 Mantener todos los valores (predeterminado)\n1 Ignorar espacios en blanco\n2 Ignorar errores\n3 Ignorar espacios en blanco y errores"
			},
			scanByColumn: {
				name: "escanear_por_columna",
				detail: "Escanear la matriz por columna. Por defecto, la matriz se escanea por fila. El escaneo determina si los valores se ordenan por fila o por columna."
			}
		}
	},
	TRANSPOSE: {
		description: "Devuelve la transpuesta de una matriz",
		abstract: "Devuelve la transpuesta de una matriz",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/transpose-function"
		}],
		functionParameter: { array: {
			name: "matriz",
			detail: "Un rango de celdas o una matriz en una hoja de cálculo."
		} }
	},
	UNIQUE: {
		description: "Devuelve una lista de valores únicos en una lista o rango",
		abstract: "Devuelve una lista de valores únicos en una lista o rango",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/unique-function"
		}],
		functionParameter: {
			array: {
				name: "matriz",
				detail: "El rango o matriz desde el cual se devuelven filas o columnas únicas."
			},
			byCol: {
				name: "por_col",
				detail: "Es un valor lógico: compara filas entre sí y devuelve valores únicos = FALSO, o se omite; compara columnas entre sí y devuelve valores únicos = VERDADERO."
			},
			exactlyOnce: {
				name: "exactamente_una_vez",
				detail: "Es un valor lógico: devuelve filas o columnas de la matriz que aparecen solo una vez = VERDADERO; devuelve todas las filas o columnas distintas de la matriz = FALSO, o se ha omitido."
			}
		}
	},
	VLOOKUP: {
		description: "Use BUSCARV cuando necesite encontrar cosas en una tabla o un rango por fila. Por ejemplo, busque el precio de una pieza de automóvil por el número de pieza, o encuentre el nombre de un empleado en función de su ID de empleado.",
		abstract: "Busca en la primera columna de una matriz y se mueve a través de la fila para devolver el valor de una celda",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/vlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "valor_buscado",
				detail: "El valor que desea buscar. El valor que desea buscar debe estar en la primera columna del rango de celdas que especifique en el argumento tabla_matriz."
			},
			tableArray: {
				name: "tabla_matriz",
				detail: "El rango de celdas en el que BUSCARV buscará el valor_buscado y el valor de retorno. Puede usar un rango con nombre o una tabla, y puede usar nombres en el argumento en lugar de referencias de celda."
			},
			colIndexNum: {
				name: "col_índice_núm",
				detail: "El número de columna (comenzando con 1 para la columna más a la izquierda de tabla_matriz) que contiene el valor de retorno."
			},
			rangeLookup: {
				name: "búsqueda_rango",
				detail: "Un valor lógico que especifica si desea que BUSCARV encuentre una coincidencia aproximada o exacta: Coincidencia aproximada - 1/VERDADERO, Coincidencia exacta - 0/FALSO"
			}
		}
	},
	VSTACK: {
		description: "Anexa matrices verticalmente y en secuencia para devolver una matriz más grande",
		abstract: "Anexa matrices verticalmente y en secuencia para devolver una matriz más grande",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/vstack-function"
		}],
		functionParameter: {
			array1: {
				name: "matriz",
				detail: "Las matrices a anexar."
			},
			array2: {
				name: "matriz",
				detail: "Las matrices a anexar."
			}
		}
	},
	WRAPCOLS: {
		description: "Envuelve la fila o columna de valores proporcionada por columnas después de un número específico de elementos",
		abstract: "Envuelve la fila o columna de valores proporcionada por columnas después de un número específico de elementos",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/wrapcols-function"
		}],
		functionParameter: {
			vector: {
				name: "vector",
				detail: "El vector o referencia a envolver."
			},
			wrapCount: {
				name: "conteo_envoltura",
				detail: "El número máximo de valores para cada columna."
			},
			padWith: {
				name: "rellenar_con",
				detail: "El valor con el que rellenar. El valor predeterminado es #N/A."
			}
		}
	},
	WRAPROWS: {
		description: "Envuelve la fila o columna de valores proporcionada por filas después de un número específico de elementos",
		abstract: "Envuelve la fila o columna de valores proporcionada por filas después de un número específico de elementos",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/wraprows-function"
		}],
		functionParameter: {
			vector: {
				name: "vector",
				detail: "El vector o referencia a envolver."
			},
			wrapCount: {
				name: "conteo_envoltura",
				detail: "El número máximo de valores para cada fila."
			},
			padWith: {
				name: "rellenar_con",
				detail: "El valor con el que rellenar. El valor predeterminado es #N/A."
			}
		}
	},
	XLOOKUP: {
		description: "Busca un rango o una matriz, y devuelve un elemento correspondiente a la primera coincidencia que encuentra. Si no existe una coincidencia, entonces BUSCARX puede devolver la coincidencia más cercana (aproximada).",
		abstract: "Busca un rango o una matriz, y devuelve un elemento correspondiente a la primera coincidencia que encuentra. Si no existe una coincidencia, entonces BUSCARX puede devolver la coincidencia más cercana (aproximada).",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/xlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "valor_buscado",
				detail: "El valor a buscar. Si se omite, BUSCARX devuelve las celdas en blanco que encuentra en matriz_buscada."
			},
			lookupArray: {
				name: "matriz_buscada",
				detail: "La matriz o rango a buscar"
			},
			returnArray: {
				name: "matriz_devuelta",
				detail: "La matriz o rango a devolver"
			},
			ifNotFound: {
				name: "si_no_encontrado",
				detail: "Donde no se encuentra una coincidencia válida, devuelve el texto [si_no_encontrado] que proporcione. Si no se encuentra una coincidencia válida, y [si_no_encontrado] falta, se devuelve #N/A."
			},
			matchMode: {
				name: "modo_coincidencia",
				detail: "Especifique el tipo de coincidencia: 0 - Coincidencia exacta. Si no se encuentra ninguna, devuelve #N/A. Este es el predeterminado. -1 - Coincidencia exacta. Si no se encuentra ninguna, devuelve el siguiente elemento más pequeño. 1 - Coincidencia exacta. Si no se encuentra ninguna, devuelve el siguiente elemento más grande. 2 - Una coincidencia con comodines donde *, ?, y ~ tienen un significado especial."
			},
			searchMode: {
				name: "modo_búsqueda",
				detail: "Especifique el modo de búsqueda a usar: 1 - Realiza una búsqueda comenzando en el primer elemento. Este es el predeterminado. -1 - Realiza una búsqueda inversa comenzando en el último elemento. 2 - Realiza una búsqueda binaria que depende de que matriz_buscada esté ordenada en orden ascendente. Si no está ordenada, se devolverán resultados no válidos. -2 - Realiza una búsqueda binaria que depende de que matriz_buscada esté ordenada en orden descendente. Si no está ordenada, se devolverán resultados no válidos."
			}
		}
	},
	XMATCH: {
		description: "Busca un elemento especificado en una matriz o rango de celdas, y luego devuelve la posición relativa del elemento.",
		abstract: "Devuelve la posición relativa de un elemento en una matriz o rango de celdas.",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/xmatch-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "valor_buscado",
				detail: "El valor de búsqueda"
			},
			lookupArray: {
				name: "matriz_buscada",
				detail: "La matriz o rango a buscar"
			},
			matchMode: {
				name: "modo_coincidencia",
				detail: "Especifique el tipo de coincidencia:\n0 - Coincidencia exacta (predeterminado)\n-1 - Coincidencia exacta o siguiente elemento más pequeño\n1 - Coincidencia exacta o siguiente elemento más grande\n2 - Una coincidencia con comodines donde *, ?, y ~ tienen un significado especial."
			},
			searchMode: {
				name: "modo_búsqueda",
				detail: "Especifique el tipo de búsqueda:\n1 - Buscar de primero a último (predeterminado)\n-1 - Buscar de último a primero (búsqueda inversa).\n2 - Realizar una búsqueda binaria que depende de que matriz_buscada esté ordenada en orden ascendente. Si no está ordenada, se devolverán resultados no válidos.\n-2 - Realizar una búsqueda binaria que depende de que matriz_buscada esté ordenada en orden descendente. Si no está ordenada, se devolverán resultados no válidos."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/math/es-ES.ts
const locale$5 = {
	ABS: {
		description: "Devuelve el valor absoluto de un número. El valor absoluto de un número es el número sin su signo.",
		abstract: "Devuelve el valor absoluto de un número",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/abs-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "El número real del que desea obtener el valor absoluto."
		} }
	},
	ACOS: {
		description: "Devuelve el arcocoseno, o coseno inverso, de un número. El arcocoseno es el ángulo cuyo coseno es el número. El ángulo devuelto se da en radianes en el rango de 0 (cero) a pi.",
		abstract: "Devuelve el arcocoseno de un número",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/acos-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "El coseno del ángulo que desea y debe estar entre -1 y 1."
		} }
	},
	ACOSH: {
		description: "Devuelve el coseno hiperbólico inverso de un número. El número debe ser mayor o igual que 1. El coseno hiperbólico inverso es el valor cuyo coseno hiperbólico es el número, por lo que ACOSH(COSH(número)) es igual a número.",
		abstract: "Devuelve el coseno hiperbólico inverso de un número",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/acosh-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "Cualquier número real igual o mayor que 1."
		} }
	},
	ACOT: {
		description: "Devuelve el valor principal del arcocotangente, o cotangente inversa, de un número.",
		abstract: "Devuelve el arcocotangente de un número",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/acot-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "Número es la cotangente del ángulo que desea. Debe ser un número real."
		} }
	},
	ACOTH: {
		description: "Devuelve el arcocotangente hiperbólico de un número",
		abstract: "Devuelve el arcocotangente hiperbólico de un número",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/acoth-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "El valor absoluto de Número debe ser mayor que 1."
		} }
	},
	AGGREGATE: {
		description: "Devuelve un agregado en una lista o base de datos",
		abstract: "Devuelve un agregado en una lista o base de datos",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/aggregate-function"
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
		description: "Convierte un número romano a arábigo, como un número",
		abstract: "Convierte un número romano a arábigo, como un número",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/arabic-function"
		}],
		functionParameter: { text: {
			name: "texto",
			detail: "Una cadena entre comillas, una cadena vacía (\"\"), o una referencia a una celda que contiene texto."
		} }
	},
	ASIN: {
		description: "Devuelve el arcoseno de un número.",
		abstract: "Devuelve el arcoseno de un número",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/asin-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "El seno del ángulo que desea y debe estar entre -1 y 1."
		} }
	},
	ASINH: {
		description: "Devuelve el seno hiperbólico inverso de un número.",
		abstract: "Devuelve el seno hiperbólico inverso de un número",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/asinh-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "Cualquier número real."
		} }
	},
	ATAN: {
		description: "Devuelve el arcotangente de un número.",
		abstract: "Devuelve el arcotangente de un número",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/atan-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "La tangente del ángulo que desea."
		} }
	},
	ATAN2: {
		description: "Devuelve el arcotangente de las coordenadas x e y.",
		abstract: "Devuelve el arcotangente de las coordenadas x e y",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/atan2-function"
		}],
		functionParameter: {
			xNum: {
				name: "x_núm",
				detail: "La coordenada x del punto."
			},
			yNum: {
				name: "y_núm",
				detail: "La coordenada y del punto."
			}
		}
	},
	ATANH: {
		description: "Devuelve la tangente hiperbólica inversa de un número. El número debe estar entre -1 y 1 (excluyendo -1 y 1). La tangente hiperbólica inversa es el valor cuya tangente hiperbólica es número , de modo que ATANH(TANH(número)) es igual a número .",
		abstract: "Devuelve la tangente hiperbólica inversa de un número. El número debe estar entre -1 y 1 (excluyendo -1 y 1). La tangente hiperbólica inversa es el valor cuya tangente hiperbólica es número , de modo que ATANH(TANH(número)) es igual a número .",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/atanh-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "Obligatorio. Cualquier número real entre 1 y -1."
		} }
	},
	BASE: {
		description: "Convierte un número en una representación de texto con la base dada.",
		abstract: "Convierte un número en una representación de texto con la base dada.",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/base-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "Obligatorio. El número que desea convertir. Debe ser un entero mayor o igual que 0 y menor que 2^53."
			},
			radix: {
				name: "base",
				detail: "Obligatorio. La base a la que desea convertir el número. Debe ser un entero mayor o igual a 2 y menor o igual a 36."
			},
			minLength: {
				name: "longitud_mínima",
				detail: "Opcional. La longitud mínima de la cadena que se devuelve. Debe ser un entero mayor o igual a 0."
			}
		}
	},
	CEILING: {
		description: "Redondea un número al entero más cercano o al múltiplo más cercano de la cifra significativa",
		abstract: "Redondea un número al entero más cercano o al múltiplo más cercano de la cifra significativa",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/ceiling-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El valor que desea redondear."
			},
			significance: {
				name: "cifra_significativa",
				detail: "El múltiplo al que desea redondear."
			}
		}
	},
	CEILING_MATH: {
		description: "Redondea un número hacia arriba, al entero más cercano o al múltiplo más cercano de la cifra significativa",
		abstract: "Redondea un número hacia arriba, al entero más cercano o al múltiplo más cercano de la cifra significativa",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/ceiling-math-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El valor que desea redondear."
			},
			significance: {
				name: "cifra_significativa",
				detail: "El múltiplo al que desea redondear."
			},
			mode: {
				name: "modo",
				detail: "Para números negativos, controla si el Número se redondea hacia cero o en dirección contraria a cero."
			}
		}
	},
	CEILING_PRECISE: {
		description: "Redondea un número al entero más cercano o al múltiplo más cercano de la cifra significativa. Independientemente del signo del número, el número se redondea hacia arriba.",
		abstract: "Redondea un número al entero más cercano o al múltiplo más cercano de la cifra significativa. Independientemente del signo del número, el número se redondea hacia arriba.",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/ceiling-precise-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El valor que desea redondear."
			},
			significance: {
				name: "cifra_significativa",
				detail: "El múltiplo al que desea redondear."
			}
		}
	},
	COMBIN: {
		description: "Devuelve el número de combinaciones para un número dado de objetos",
		abstract: "Devuelve el número de combinaciones para un número dado de objetos",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/combin-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El número de elementos."
			},
			numberChosen: {
				name: "número_elegido",
				detail: "El número de elementos en cada combinación."
			}
		}
	},
	COMBINA: {
		description: "Devuelve el número de combinaciones con repeticiones para un número dado de elementos",
		abstract: "Devuelve el número de combinaciones con repeticiones para un número dado de elementos",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/combina-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El número de elementos."
			},
			numberChosen: {
				name: "número_elegido",
				detail: "El número de elementos en cada combinación."
			}
		}
	},
	COS: {
		description: "Devuelve el coseno de un número.",
		abstract: "Devuelve el coseno de un número",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/cos-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "El ángulo en radianes del que desea el coseno."
		} }
	},
	COSH: {
		description: "Devuelve el coseno hiperbólico de un número",
		abstract: "Devuelve el coseno hiperbólico de un número",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/cosh-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "Cualquier número real del que desee encontrar el coseno hiperbólico."
		} }
	},
	COT: {
		description: "Devuelve la cotangente de un ángulo",
		abstract: "Devuelve la cotangente de un ángulo",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/cot-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "El ángulo en radianes del que desea la cotangente."
		} }
	},
	COTH: {
		description: "Devuelve la cotangente hiperbólica de un número",
		abstract: "Devuelve la cotangente hiperbólica de un número",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/coth-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "Cualquier número real del que desee encontrar la cotangente hiperbólica."
		} }
	},
	CSC: {
		description: "Devuelve la cosecante de un ángulo",
		abstract: "Devuelve la cosecante de un ángulo",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/csc-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "El ángulo en radianes del que desea la cosecante."
		} }
	},
	CSCH: {
		description: "Devuelve la cosecante hiperbólica de un ángulo",
		abstract: "Devuelve la cosecante hiperbólica de un ángulo",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/csch-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "El ángulo en radianes del que desea la cosecante hiperbólica."
		} }
	},
	DECIMAL: {
		description: "Convierte una representación de texto de un número en una base dada en un número decimal",
		abstract: "Convierte una representación de texto de un número en una base dada en un número decimal",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/decimal-function"
		}],
		functionParameter: {
			text: {
				name: "texto",
				detail: "La longitud de la cadena de Texto debe ser menor o igual a 255 caracteres."
			},
			radix: {
				name: "base",
				detail: "La base a la que desea convertir el número. Debe ser un entero mayor o igual a 2 y menor o igual a 36."
			}
		}
	},
	DEGREES: {
		description: "Convierte radianes a grados",
		abstract: "Convierte radianes a grados",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/degrees-function"
		}],
		functionParameter: { angle: {
			name: "ángulo",
			detail: "El ángulo en radianes que desea convertir."
		} }
	},
	EVEN: {
		description: "Redondea un número hacia arriba al entero par más cercano",
		abstract: "Redondea un número hacia arriba al entero par más cercano",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/even-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "El valor a redondear."
		} }
	},
	EXP: {
		description: "Devuelve e elevado a la potencia de un número dado",
		abstract: "Devuelve e elevado a la potencia de un número dado",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/exp-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "El exponente aplicado a la base e."
		} }
	},
	FACT: {
		description: "Devuelve el factorial de un número",
		abstract: "Devuelve el factorial de un número",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/fact-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "El número no negativo del que desea el factorial. Si el número no es un entero, se trunca."
		} }
	},
	FACTDOUBLE: {
		description: "Devuelve el doble factorial de un número",
		abstract: "Devuelve el doble factorial de un número",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/factdouble-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "El número no negativo del que desea el doble factorial. Si el número no es un entero, se trunca."
		} }
	},
	FLOOR: {
		description: "Redondea un número hacia abajo, hacia cero",
		abstract: "Redondea un número hacia abajo, hacia cero",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/floor-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El valor que desea redondear."
			},
			significance: {
				name: "cifra_significativa",
				detail: "El múltiplo al que desea redondear."
			}
		}
	},
	FLOOR_MATH: {
		description: "Redondea un número hacia abajo, al entero más cercano o al múltiplo más cercano de la cifra significativa",
		abstract: "Redondea un número hacia abajo, al entero más cercano o al múltiplo más cercano de la cifra significativa",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/floor-math-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El valor que desea redondear."
			},
			significance: {
				name: "cifra_significativa",
				detail: "El múltiplo al que desea redondear."
			},
			mode: {
				name: "modo",
				detail: "Para números negativos, controla si el Número se redondea hacia cero o en dirección contraria a cero."
			}
		}
	},
	FLOOR_PRECISE: {
		description: "Redondea un número hacia abajo al entero más cercano o al múltiplo más cercano de la cifra significativa. Independientemente del signo del número, el número se redondea hacia abajo.",
		abstract: "Redondea un número hacia abajo al entero más cercano o al múltiplo más cercano de la cifra significativa.",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/floor-precise-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El valor que desea redondear."
			},
			significance: {
				name: "cifra_significativa",
				detail: "El múltiplo al que desea redondear."
			}
		}
	},
	GCD: {
		description: "Devuelve el máximo común divisor",
		abstract: "Devuelve el máximo común divisor",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/gcd-function"
		}],
		functionParameter: {
			number1: {
				name: "número1",
				detail: "Para encontrar el primer número del máximo común divisor, también puede usar una sola matriz o una referencia a una matriz en lugar de los parámetros separados por comas."
			},
			number2: {
				name: "número2",
				detail: "El segundo número cuyo máximo común divisor se va a encontrar. Se pueden especificar hasta 255 números de esta manera."
			}
		}
	},
	INT: {
		description: "Redondea un número hacia abajo al entero más cercano",
		abstract: "Redondea un número hacia abajo al entero más cercano",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/int-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "El número real que desea redondear hacia abajo a un entero."
		} }
	},
	ISO_CEILING: {
		description: "Devuelve un número redondeado hacia arriba al entero más cercano o al múltiplo más cercano de la cifra significativa",
		abstract: "Devuelve un número redondeado hacia arriba al entero más cercano o al múltiplo más cercano de la cifra significativa",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/iso-ceiling-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El valor que desea redondear."
			},
			significance: {
				name: "cifra_significativa",
				detail: "El múltiplo al que desea redondear."
			}
		}
	},
	LCM: {
		description: "Devuelve el mínimo común múltiplo",
		abstract: "Devuelve el mínimo común múltiplo",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/lcm-function"
		}],
		functionParameter: {
			number1: {
				name: "número1",
				detail: "Para encontrar el primer número del mínimo común múltiplo, también puede usar una sola matriz o una referencia a una matriz en lugar de los parámetros separados por comas."
			},
			number2: {
				name: "número2",
				detail: "El segundo número cuyo mínimo común múltiplo se va a encontrar. Se pueden especificar hasta 255 números de esta manera."
			}
		}
	},
	LN: {
		description: "Devuelve el logaritmo natural de un número",
		abstract: "Devuelve el logaritmo natural de un número",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/ln-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "El número real positivo del que desea el logaritmo natural."
		} }
	},
	LOG: {
		description: "Devuelve el logaritmo de un número en una base especificada",
		abstract: "Devuelve el logaritmo de un número en una base especificada",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/log-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El número real positivo del que desea el logaritmo."
			},
			base: {
				name: "base",
				detail: "La base del logaritmo. Si se omite la base, se asume que es 10."
			}
		}
	},
	LOG10: {
		description: "Devuelve el logaritmo en base 10 de un número",
		abstract: "Devuelve el logaritmo en base 10 de un número",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/log10-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "El número real positivo del que desea el logaritmo en base 10."
		} }
	},
	MDETERM: {
		description: "Devuelve el determinante matricial de una matriz",
		abstract: "Devuelve el determinante matricial de una matriz",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/mdeterm-function"
		}],
		functionParameter: { array: {
			name: "matriz",
			detail: "Una matriz numérica con un número igual de filas y columnas."
		} }
	},
	MINVERSE: {
		description: "Devuelve la matriz inversa de una matriz",
		abstract: "Devuelve la matriz inversa de una matriz",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/minverse-function"
		}],
		functionParameter: { array: {
			name: "matriz",
			detail: "Una matriz numérica con un número igual de filas y columnas."
		} }
	},
	MMULT: {
		description: "Devuelve el producto matricial de dos matrices",
		abstract: "Devuelve el producto matricial de dos matrices",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/mmult-function"
		}],
		functionParameter: {
			array1: {
				name: "matriz1",
				detail: "Las matrices que desea multiplicar."
			},
			array2: {
				name: "matriz2",
				detail: "Las matrices que desea multiplicar."
			}
		}
	},
	MOD: {
		description: "Devuelve el resto después de que el número se divida por el divisor. El resultado tiene el mismo signo que el divisor.",
		abstract: "Devuelve el resto de la división",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/mod-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El número del que desea encontrar el resto."
			},
			divisor: {
				name: "divisor",
				detail: "El número por el que desea dividir el número."
			}
		}
	},
	MROUND: {
		description: "Devuelve un número redondeado al múltiplo deseado",
		abstract: "Devuelve un número redondeado al múltiplo deseado",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/mround-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El valor a redondear."
			},
			multiple: {
				name: "múltiplo",
				detail: "El múltiplo al que desea redondear el número."
			}
		}
	},
	MULTINOMIAL: {
		description: "Devuelve el multinomial de un conjunto de números",
		abstract: "Devuelve el multinomial de un conjunto de números",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/multinomial-function"
		}],
		functionParameter: {
			number1: {
				name: "número1",
				detail: "El primer valor o rango a usar en el cálculo."
			},
			number2: {
				name: "número2",
				detail: "Valores o rangos adicionales a usar en los cálculos."
			}
		}
	},
	MUNIT: {
		description: "Devuelve la matriz unitaria o la dimensión especificada",
		abstract: "Devuelve la matriz unitaria o la dimensión especificada",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/munit-function"
		}],
		functionParameter: { dimension: {
			name: "dimensión",
			detail: "Dimensión es un entero que especifica la dimensión de la matriz unitaria que desea devolver. Devuelve una matriz. La dimensión debe ser mayor que cero."
		} }
	},
	ODD: {
		description: "Redondea un número hacia arriba al entero impar más cercano",
		abstract: "Redondea un número hacia arriba al entero impar más cercano",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/odd-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "El valor a redondear."
		} }
	},
	PI: {
		description: "Devuelve el valor de pi",
		abstract: "Devuelve el valor de pi",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/pi-function"
		}],
		functionParameter: {}
	},
	POWER: {
		description: "Devuelve el resultado de un número elevado a una potencia.",
		abstract: "Devuelve el resultado de un número elevado a una potencia",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/power-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El número base. Puede ser cualquier número real."
			},
			power: {
				name: "potencia",
				detail: "El exponente al que se eleva el número base."
			}
		}
	},
	PRODUCT: {
		description: "Multiplica todos los números dados como argumentos y devuelve el producto.",
		abstract: "Multiplica sus argumentos",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/product-function"
		}],
		functionParameter: {
			number1: {
				name: "número1",
				detail: "El primer número o rango que desea multiplicar."
			},
			number2: {
				name: "número2",
				detail: "Números o rangos adicionales que desea multiplicar, hasta un máximo de 255 argumentos."
			}
		}
	},
	QUOTIENT: {
		description: "Devuelve la parte entera de una división",
		abstract: "Devuelve la parte entera de una división",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/quotient-function"
		}],
		functionParameter: {
			numerator: {
				name: "numerador",
				detail: "El dividendo."
			},
			denominator: {
				name: "denominador",
				detail: "El divisor."
			}
		}
	},
	RADIANS: {
		description: "Convierte grados a radianes",
		abstract: "Convierte grados a radianes",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/radians-function"
		}],
		functionParameter: { angle: {
			name: "ángulo",
			detail: "Un ángulo en grados que desea convertir."
		} }
	},
	RAND: {
		description: "Devuelve un número aleatorio entre 0 y 1",
		abstract: "Devuelve un número aleatorio entre 0 y 1",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/rand-function"
		}],
		functionParameter: {}
	},
	RANDARRAY: {
		description: "Devuelve una matriz de números aleatorios entre 0 y 1. Sin embargo, puede especificar el número de filas y columnas a rellenar, los valores mínimos y máximos, y si se devuelven números enteros o valores decimales.",
		abstract: "Devuelve una matriz de números aleatorios entre 0 y 1.",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/randarray-function"
		}],
		functionParameter: {
			rows: {
				name: "filas",
				detail: "El número de filas que se devolverán"
			},
			columns: {
				name: "columnas",
				detail: "El número de columnas que se devolverán"
			},
			min: {
				name: "min",
				detail: "El número mínimo que le gustaría que se devolviera"
			},
			max: {
				name: "max",
				detail: "El número máximo que le gustaría que se devolviera"
			},
			wholeNumber: {
				name: "número_entero",
				detail: "Devolver un número entero o un valor decimal"
			}
		}
	},
	RANDBETWEEN: {
		description: "Devuelve un número aleatorio entre los números que especifique",
		abstract: "Devuelve un número aleatorio entre los números que especifique",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/randbetween-function"
		}],
		functionParameter: {
			bottom: {
				name: "inferior",
				detail: "El entero más pequeño que devolverá ALEATORIO.ENTRE."
			},
			top: {
				name: "superior",
				detail: "El entero más grande que devolverá ALEATORIO.ENTRE."
			}
		}
	},
	ROMAN: {
		description: "Convierte un número arábigo a romano, como texto",
		abstract: "Convierte un número arábigo a romano, como texto",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/roman-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El número arábigo que desea convertir."
			},
			form: {
				name: "forma",
				detail: "Un número que especifica el tipo de número romano que desea. El estilo del número romano varía de Clásico a Simplificado, volviéndose más conciso a medida que aumenta el valor de la forma."
			}
		}
	},
	ROUND: {
		description: "Redondea un número a un número especificado de dígitos",
		abstract: "Redondea un número a un número especificado de dígitos",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/round-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El número que desea redondear."
			},
			numDigits: {
				name: "num_dígitos",
				detail: "El número de dígitos al que desea redondear el argumento de número."
			}
		}
	},
	ROUNDBANK: {
		description: "Redondea un número con redondeo bancario",
		abstract: "Redondea un número con redondeo bancario",
		links: [{
			title: "Instrucción",
			url: ""
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El número que desea redondear con redondeo bancario."
			},
			numDigits: {
				name: "num_dígitos",
				detail: "El número de dígitos al que desea redondear con redondeo bancario."
			}
		}
	},
	ROUNDDOWN: {
		description: "Redondea un número hacia abajo, hacia cero",
		abstract: "Redondea un número hacia abajo, hacia cero",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/rounddown-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El número que desea redondear."
			},
			numDigits: {
				name: "num_dígitos",
				detail: "El número de dígitos al que desea redondear el argumento de número."
			}
		}
	},
	ROUNDUP: {
		description: "Redondea un número hacia arriba, en dirección contraria a cero",
		abstract: "Redondea un número hacia arriba, en dirección contraria a cero",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/roundup-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El número que desea redondear."
			},
			numDigits: {
				name: "num_dígitos",
				detail: "El número de dígitos al que desea redondear el argumento de número."
			}
		}
	},
	SEC: {
		description: "Devuelve la secante de un ángulo",
		abstract: "Devuelve la secante de un ángulo",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/sec-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "Número es el ángulo en radianes del que desea la secante."
		} }
	},
	SECH: {
		description: "Devuelve la secante hiperbólica de un ángulo",
		abstract: "Devuelve la secante hiperbólica de un ángulo",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/sech-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "Número es el ángulo en radianes del que desea la secante hiperbólica."
		} }
	},
	SERIESSUM: {
		description: "Devuelve la suma de una serie de potencias basada en la fórmula",
		abstract: "Devuelve la suma de una serie de potencias basada en la fórmula",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/seriessum-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor de entrada a la serie de potencias."
			},
			n: {
				name: "n",
				detail: "La potencia inicial a la que desea elevar x."
			},
			m: {
				name: "m",
				detail: "El paso por el cual aumentar n para cada término de la serie."
			},
			coefficients: {
				name: "coeficientes",
				detail: "Un conjunto de coeficientes por los que se multiplica cada potencia sucesiva de x."
			}
		}
	},
	SEQUENCE: {
		description: "Genera una lista de números secuenciales en una matriz, como 1, 2, 3, 4",
		abstract: "Genera una lista de números secuenciales en una matriz, como 1, 2, 3, 4",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/sequence-function"
		}],
		functionParameter: {
			rows: {
				name: "filas",
				detail: "El número de filas a devolver."
			},
			columns: {
				name: "columnas",
				detail: "El número de columnas a devolver."
			},
			start: {
				name: "inicio",
				detail: "El primer número en la secuencia."
			},
			step: {
				name: "paso",
				detail: "La cantidad a incrementar cada valor subsiguiente en la matriz."
			}
		}
	},
	SIGN: {
		description: "Devuelve el signo de un número",
		abstract: "Devuelve el signo de un número",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/sign-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "Cualquier número real."
		} }
	},
	SIN: {
		description: "Devuelve el seno del ángulo dado",
		abstract: "Devuelve el seno del ángulo dado",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/sin-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "El ángulo en radianes del que desea el seno."
		} }
	},
	SINH: {
		description: "Devuelve el seno hiperbólico de un número",
		abstract: "Devuelve el seno hiperbólico de un número",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/sinh-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "Cualquier número real."
		} }
	},
	SQRT: {
		description: "Devuelve una raíz cuadrada positiva",
		abstract: "Devuelve una raíz cuadrada positiva",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/sqrt-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "El número del que desea la raíz cuadrada."
		} }
	},
	SQRTPI: {
		description: "Devuelve la raíz cuadrada de (número * pi)",
		abstract: "Devuelve la raíz cuadrada de (número * pi)",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/sqrtpi-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "El número por el que se multiplica pi."
		} }
	},
	SUBTOTAL: {
		description: "Devuelve un subtotal en una lista o base de datos.",
		abstract: "Devuelve un subtotal en una lista o base de datos",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/subtotal-function"
		}],
		functionParameter: {
			functionNum: {
				name: "núm_función",
				detail: "El número 1-11 o 101-111 que especifica la función a usar para el subtotal. 1-11 incluye filas ocultas manualmente, mientras que 101-111 las excluye; las celdas filtradas siempre se excluyen."
			},
			ref1: {
				name: "ref1",
				detail: "El primer rango con nombre o referencia para el que desea el subtotal."
			},
			ref2: {
				name: "ref2",
				detail: "Rangos con nombre o referencias 2 a 254 para los que desea el subtotal."
			}
		}
	},
	SUM: {
		description: "Puede sumar valores individuales, referencias de celda o rangos, o una mezcla de los tres.",
		abstract: "Suma sus argumentos",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/sum-function"
		}],
		functionParameter: {
			number1: {
				name: "Número 1",
				detail: "El primer número que desea sumar. El número puede ser como 4, una referencia de celda como B6, o un rango de celdas como B2:B8."
			},
			number2: {
				name: "Número 2",
				detail: "Este es el segundo número que desea sumar. Puede especificar hasta 255 números de esta manera."
			}
		}
	},
	SUMIF: {
		description: "Suma los valores en un rango que cumplen con los criterios que especifique.",
		abstract: "Suma las celdas especificadas por un criterio dado",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/sumif-function"
		}],
		functionParameter: {
			range: {
				name: "rango",
				detail: "El rango de celdas que desea evaluar por criterios."
			},
			criteria: {
				name: "criterio",
				detail: "El criterio en forma de número, expresión, una referencia de celda, texto o una función que define qué celdas se sumarán. Se pueden incluir caracteres comodín: un signo de interrogación (?) para coincidir con cualquier carácter individual, un asterisco (*) para coincidir con cualquier secuencia de caracteres. Si desea encontrar un signo de interrogación o asterisco real, escriba una tilde (~) antes del carácter."
			},
			sumRange: {
				name: "rango_suma",
				detail: "Las celdas reales a sumar, si desea sumar celdas distintas a las especificadas en el argumento de rango. Si se omite el argumento rango_suma, Excel suma las celdas especificadas en el argumento de rango (las mismas celdas a las que se aplica el criterio)."
			}
		}
	},
	SUMIFS: {
		description: "Suma todos sus argumentos que cumplen con múltiples criterios.",
		abstract: "Suma todos sus argumentos que cumplen con múltiples criterios.",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/sumifs-function"
		}],
		functionParameter: {
			sumRange: {
				name: "rango_suma",
				detail: "El rango de celdas a sumar."
			},
			criteriaRange1: {
				name: "rango_criterio1 ",
				detail: "El rango que se prueba usando criterio1. rango_criterio1 y criterio1 establecen un par de búsqueda mediante el cual se busca un rango para criterios específicos. Una vez que se encuentran los elementos en el rango, se suman sus valores correspondientes en rango_suma."
			},
			criteria1: {
				name: "criterio1",
				detail: "El criterio que define qué celdas en rango_criterio1 se sumarán. Por ejemplo, el criterio se puede introducir como 32, \">32\", B4, \"manzanas\" o \"32\"."
			},
			criteriaRange2: {
				name: "rango_criterio2",
				detail: "Rangos adicionales. Puede introducir hasta 127 pares de rangos."
			},
			criteria2: {
				name: "criterio2",
				detail: "Criterios asociados adicionales. Puede introducir hasta 127 pares de criterios."
			}
		}
	},
	SUMPRODUCT: {
		description: "Devuelve la suma de los productos de los componentes correspondientes de la matriz",
		abstract: "Devuelve la suma de los productos de los componentes correspondientes de la matriz",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/sumproduct-function"
		}],
		functionParameter: {
			array1: {
				name: "matriz",
				detail: "El primer argumento de matriz cuyos componentes desea multiplicar y luego sumar."
			},
			array2: {
				name: "matriz",
				detail: "Argumentos de matriz 2 a 255 cuyos componentes desea multiplicar y luego sumar."
			}
		}
	},
	SUMSQ: {
		description: "Devuelve la suma de los cuadrados de los argumentos",
		abstract: "Devuelve la suma de los cuadrados de los argumentos",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/sumsq-function"
		}],
		functionParameter: {
			number1: {
				name: "número1",
				detail: "Para elevar al cuadrado y encontrar el primer número, también puede usar una sola matriz o una referencia a una matriz en lugar de parámetros separados por comas."
			},
			number2: {
				name: "número2",
				detail: "El segundo número que se elevará al cuadrado y se sumará. Se pueden especificar hasta 255 números de esta manera."
			}
		}
	},
	SUMX2MY2: {
		description: "Devuelve la suma de la diferencia de cuadrados de los valores correspondientes en dos matrices",
		abstract: "Devuelve la suma de la diferencia de cuadrados de los valores correspondientes en dos matrices",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/sumx2my2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "matriz_x",
				detail: "La primera matriz o rango de valores."
			},
			arrayY: {
				name: "matriz_y",
				detail: "La segunda matriz o rango de valores."
			}
		}
	},
	SUMX2PY2: {
		description: "Devuelve la suma de la suma de cuadrados de los valores correspondientes en dos matrices",
		abstract: "Devuelve la suma de la suma de cuadrados de los valores correspondientes en dos matrices",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/sumx2py2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "matriz_x",
				detail: "La primera matriz o rango de valores."
			},
			arrayY: {
				name: "matriz_y",
				detail: "La segunda matriz o rango de valores."
			}
		}
	},
	SUMXMY2: {
		description: "Devuelve la suma de los cuadrados de las diferencias de los valores correspondientes en dos matrices",
		abstract: "Devuelve la suma de los cuadrados de las diferencias de los valores correspondientes en dos matrices",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/sumxmy2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "matriz_x",
				detail: "La primera matriz o rango de valores."
			},
			arrayY: {
				name: "matriz_y",
				detail: "La segunda matriz o rango de valores."
			}
		}
	},
	TAN: {
		description: "Devuelve la tangente de un número.",
		abstract: "Devuelve la tangente de un número",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/tan-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "El ángulo en radianes del que desea la tangente."
		} }
	},
	TANH: {
		description: "Devuelve la tangente hiperbólica de un número.",
		abstract: "Devuelve la tangente hiperbólica de un número",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/tanh-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "Cualquier número real."
		} }
	},
	TRUNC: {
		description: "Trunca un número a un entero",
		abstract: "Trunca un número a un entero",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/trunc-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El número que desea truncar."
			},
			numDigits: {
				name: "num_dígitos",
				detail: "Un número que especifica la precisión del truncamiento. El valor predeterminado para num_dígitos es 0 (cero)."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/statistical/es-ES.ts
const locale$4 = {
	AVEDEV: {
		description: "Devuelve el promedio de las desviaciones absolutas de los puntos de datos con respecto a su media.",
		abstract: "Devuelve el promedio de las desviaciones absolutas de los puntos de datos con respecto a su media",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/avedev-function"
		}],
		functionParameter: {
			number1: {
				name: "número1",
				detail: "El primer número, referencia de celda o rango para el que desea el promedio."
			},
			number2: {
				name: "número2",
				detail: "Números adicionales, referencias de celda o rangos para los que desea el promedio, hasta un máximo de 255."
			}
		}
	},
	AVERAGE: {
		description: "Devuelve el promedio (media aritmética) de los argumentos.",
		abstract: "Devuelve el promedio de sus argumentos",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/average-function"
		}],
		functionParameter: {
			number1: {
				name: "número1",
				detail: "El primer número, referencia de celda o rango para el que desea el promedio."
			},
			number2: {
				name: "número2",
				detail: "Números adicionales, referencias de celda o rangos para los que desea el promedio, hasta un máximo de 255."
			}
		}
	},
	AVERAGE_WEIGHTED: {
		description: "La función AVERAGE.WEIGHTED calcula la media ponderada de un conjunto de valores a partir de dichos valores y sus ponderaciones correspondientes.",
		abstract: "La función AVERAGE.WEIGHTED calcula la media ponderada de un conjunto de valores a partir de dichos valores y sus ponderaciones correspondientes.",
		links: [{
			title: "Instrucciones",
			url: "https://support.google.com/docs/answer/9084098?hl=es"
		}],
		functionParameter: {
			values: {
				name: "valores",
				detail: "Valores de los que se va a calcular la media. Puede hacer referencia a un intervalo de celdas o incluir los propios valores."
			},
			weights: {
				name: "ponderaciones",
				detail: "Lista correspondiente de pesos que se van a aplicar. Puede hacer referencia a un intervalo de celdas o incluir los propios pesos. Los pesos no pueden ser negativos, aunque pueden ser cero. Al menos uno de los pesos debe ser positivo. Si se usa un intervalo de celdas, este debe tener el mismo número de filas y columnas que el intervalo de valores."
			},
			additionalValues: {
				name: "valores_adicionales",
				detail: "Otros valores con los que calcular la media. Los valores adicionales son opcionales."
			},
			additionalWeights: {
				name: "ponderaciones_adicionales",
				detail: "Otros pesos que se pueden aplicar. Los pesos adicionales son opcionales, pero cada valor_adicional debe ir seguido exactamente de un peso_adicional ."
			}
		}
	},
	AVERAGEA: {
		description: "Devuelve el promedio de sus argumentos, incluyendo números, texto y valores lógicos.",
		abstract: "Devuelve el promedio de sus argumentos, incluyendo números, texto y valores lógicos",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/averagea-function"
		}],
		functionParameter: {
			value1: {
				name: "valor1",
				detail: "El primer número, referencia de celda o rango para el que desea el promedio."
			},
			value2: {
				name: "valor2",
				detail: "Números adicionales, referencias de celda o rangos para los que desea el promedio, hasta un máximo de 255."
			}
		}
	},
	AVERAGEIF: {
		description: "Devuelve el promedio (media aritmética) de todas las celdas en un rango que cumplen un criterio determinado.",
		abstract: "Devuelve el promedio (media aritmética) de todas las celdas en un rango que cumplen un criterio determinado",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/averageif-function"
		}],
		functionParameter: {
			range: {
				name: "rango",
				detail: "Una o más celdas para promediar, incluyendo números o nombres, matrices o referencias que contengan números."
			},
			criteria: {
				name: "criterio",
				detail: "El criterio en forma de número, expresión, referencia de celda o texto que define qué celdas se promedian. Por ejemplo, el criterio puede expresarse como 32, \"32\", \">32\", \"manzanas\" o B4."
			},
			averageRange: {
				name: "rango_promedio",
				detail: "El conjunto real de celdas a promediar. Si se omite, se utiliza el rango."
			}
		}
	},
	AVERAGEIFS: {
		description: "Devuelve el promedio (media aritmética) de todas las celdas que cumplen múltiples criterios.",
		abstract: "Devuelve el promedio (media aritmética) de todas las celdas que cumplen múltiples criterios",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/averageifs-function"
		}],
		functionParameter: {
			averageRange: {
				name: "rango_promedio",
				detail: "Una o más celdas para promediar, incluyendo números o nombres, matrices o referencias que contengan números."
			},
			criteriaRange1: {
				name: "rango_criterios1",
				detail: "Es el conjunto de celdas a evaluar con el criterio."
			},
			criteria1: {
				name: "criterio1",
				detail: "Se utiliza para definir las celdas cuyo promedio se calculará. Por ejemplo, el criterio puede expresarse como 32, \"32\", \">32\", \"manzana\" o B4"
			},
			criteriaRange2: {
				name: "rango_criterios2",
				detail: "Rangos adicionales. Puede introducir hasta 127 rangos."
			},
			criteria2: {
				name: "criterio2",
				detail: "Criterios adicionales asociados. Puede introducir hasta 127 criterios."
			}
		}
	},
	BETA_DIST: {
		description: "Devuelve la función de distribución acumulativa beta",
		abstract: "Devuelve la función de distribución acumulativa beta",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/beta-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor entre A y B en el que se evalúa la función."
			},
			alpha: {
				name: "alfa",
				detail: "Un parámetro de la distribución."
			},
			beta: {
				name: "beta",
				detail: "Un parámetro de la distribución."
			},
			cumulative: {
				name: "acumulativo",
				detail: "Un valor lógico que determina la forma de la función. Si es VERDADERO, DISTR.BETA devuelve la función de distribución acumulativa; si es FALSO, devuelve la función de densidad de probabilidad."
			},
			A: {
				name: "A",
				detail: "Un límite inferior para el intervalo de x."
			},
			B: {
				name: "B",
				detail: "Un límite superior para el intervalo de x."
			}
		}
	},
	BETA_INV: {
		description: "Devuelve la inversa de la función de distribución acumulativa para una distribución beta especificada",
		abstract: "Devuelve la inversa de la función de distribución acumulativa para una distribución beta especificada",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/beta-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probabilidad",
				detail: "Una probabilidad asociada con la distribución beta."
			},
			alpha: {
				name: "alfa",
				detail: "Un parámetro de la distribución."
			},
			beta: {
				name: "beta",
				detail: "Un parámetro de la distribución."
			},
			A: {
				name: "A",
				detail: "Un límite inferior para el intervalo de x."
			},
			B: {
				name: "B",
				detail: "Un límite superior para el intervalo de x."
			}
		}
	},
	BINOM_DIST: {
		description: "Devuelve la probabilidad de una variable aleatoria discreta siguiendo una distribución binomial",
		abstract: "Devuelve la probabilidad de una variable aleatoria discreta siguiendo una distribución binomial",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/binom-dist-function"
		}],
		functionParameter: {
			numberS: {
				name: "núm_éxito",
				detail: "El número de éxitos en los ensayos."
			},
			trials: {
				name: "ensayos",
				detail: "El número de ensayos independientes."
			},
			probabilityS: {
				name: "prob_éxito",
				detail: "La probabilidad de éxito en cada ensayo."
			},
			cumulative: {
				name: "acumulativo",
				detail: "Un valor lógico que determina la forma de la función. Si es VERDADERO, DISTR.BINOM devuelve la función de distribución acumulativa; si es FALSO, devuelve la función de densidad de probabilidad."
			}
		}
	},
	BINOM_DIST_RANGE: {
		description: "Devuelve la probabilidad de un resultado de ensayo usando una distribución binomial",
		abstract: "Devuelve la probabilidad de un resultado de ensayo usando una distribución binomial",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/binom-dist-range-function"
		}],
		functionParameter: {
			trials: {
				name: "ensayos",
				detail: "El número de ensayos independientes."
			},
			probabilityS: {
				name: "prob_éxito",
				detail: "La probabilidad de éxito en cada ensayo."
			},
			numberS: {
				name: "núm_éxito",
				detail: "El número de éxitos en los ensayos."
			},
			numberS2: {
				name: "núm_éxito2",
				detail: "Si se proporciona, devuelve la probabilidad de que el número de ensayos exitosos se encuentre entre núm_éxito y núm_éxito2."
			}
		}
	},
	BINOM_INV: {
		description: "Devuelve el menor valor para el cual la distribución binomial acumulativa es menor o igual a un valor de criterio",
		abstract: "Devuelve el menor valor para el cual la distribución binomial acumulativa es menor o igual a un valor de criterio",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/binom-inv-function"
		}],
		functionParameter: {
			trials: {
				name: "ensayos",
				detail: "El número de ensayos de Bernoulli."
			},
			probabilityS: {
				name: "prob_éxito",
				detail: "La probabilidad de éxito en cada ensayo."
			},
			alpha: {
				name: "alfa",
				detail: "El valor de criterio."
			}
		}
	},
	CHISQ_DIST: {
		description: "Devuelve la probabilidad de cola izquierda de la distribución chi-cuadrado.",
		abstract: "Devuelve la probabilidad de cola izquierda de la distribución chi-cuadrado.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/chisq-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor en el que se desea evaluar la distribución."
			},
			degFreedom: {
				name: "grados_libertad",
				detail: "El número de grados de libertad."
			},
			cumulative: {
				name: "acumulativo",
				detail: "Un valor lógico que determina la forma de la función. Si es VERDADERO, DISTR.CHI devuelve la función de distribución acumulativa; si es FALSO, devuelve la función de densidad de probabilidad."
			}
		}
	},
	CHISQ_DIST_RT: {
		description: "Devuelve la probabilidad de cola derecha de la distribución chi-cuadrado.",
		abstract: "Devuelve la probabilidad de cola derecha de la distribución chi-cuadrado.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/chisq-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor en el que se desea evaluar la distribución."
			},
			degFreedom: {
				name: "grados_libertad",
				detail: "El número de grados de libertad."
			}
		}
	},
	CHISQ_INV: {
		description: "Devuelve la inversa de la probabilidad de cola izquierda de la distribución chi-cuadrado.",
		abstract: "Devuelve la inversa de la probabilidad de cola izquierda de la distribución chi-cuadrado.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/chisq-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probabilidad",
				detail: "Una probabilidad asociada con la distribución chi-cuadrado."
			},
			degFreedom: {
				name: "grados_libertad",
				detail: "El número de grados de libertad."
			}
		}
	},
	CHISQ_INV_RT: {
		description: "Devuelve la inversa de la probabilidad de cola derecha de la distribución chi-cuadrado.",
		abstract: "Devuelve la inversa de la probabilidad de cola derecha de la distribución chi-cuadrado.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/chisq-inv-rt-function"
		}],
		functionParameter: {
			probability: {
				name: "probabilidad",
				detail: "Una probabilidad asociada con la distribución chi-cuadrado."
			},
			degFreedom: {
				name: "grados_libertad",
				detail: "El número de grados de libertad."
			}
		}
	},
	CHISQ_TEST: {
		description: "Devuelve la prueba de independencia",
		abstract: "Devuelve la prueba de independencia",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/chisq-test-function"
		}],
		functionParameter: {
			actualRange: {
				name: "rango_real",
				detail: "El rango de datos que contiene las observaciones para contrastar con los valores esperados."
			},
			expectedRange: {
				name: "rango_esperado",
				detail: "El rango de datos que contiene la proporción del producto de los totales de fila y los totales de columna con respecto al total general."
			}
		}
	},
	CONFIDENCE_NORM: {
		description: "Devuelve el intervalo de confianza para la media de una población, usando una distribución normal.",
		abstract: "Devuelve el intervalo de confianza para la media de una población, usando una distribución normal.",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/confidence-norm-function"
		}],
		functionParameter: {
			alpha: {
				name: "alfa",
				detail: "El nivel de significación usado para calcular el nivel de confianza. El nivel de confianza es igual a 100*(1 - alfa)%, o en otras palabras, un alfa de 0,05 indica un nivel de confianza del 95 por ciento."
			},
			standardDev: {
				name: "desv_estándar",
				detail: "La desviación estándar de la población para el rango de datos y se asume que es conocida."
			},
			size: {
				name: "tamaño",
				detail: "El tamaño de la muestra."
			}
		}
	},
	CONFIDENCE_T: {
		description: "Devuelve el intervalo de confianza para la media de una población, usando una distribución t de Student",
		abstract: "Devuelve el intervalo de confianza para la media de una población, usando una distribución t de Student",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/confidence-t-function"
		}],
		functionParameter: {
			alpha: {
				name: "alfa",
				detail: "El nivel de significación usado para calcular el nivel de confianza. El nivel de confianza es igual a 100*(1 - alfa)%, o en otras palabras, un alfa de 0,05 indica un nivel de confianza del 95 por ciento."
			},
			standardDev: {
				name: "desv_estándar",
				detail: "La desviación estándar de la población para el rango de datos y se asume que es conocida."
			},
			size: {
				name: "tamaño",
				detail: "El tamaño de la muestra."
			}
		}
	},
	CORREL: {
		description: "Devuelve el coeficiente de correlación entre dos conjuntos de datos",
		abstract: "Devuelve el coeficiente de correlación entre dos conjuntos de datos",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/correl-function"
		}],
		functionParameter: {
			array1: {
				name: "matriz1",
				detail: "Un primer rango de valores de celda."
			},
			array2: {
				name: "matriz2",
				detail: "Un segundo rango de valores de celda."
			}
		}
	},
	COUNT: {
		description: "Cuenta el número de celdas que contienen números y cuenta los números dentro de la lista de argumentos.",
		abstract: "Cuenta cuántos números hay en la lista de argumentos",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/count-function"
		}],
		functionParameter: {
			value1: {
				name: "valor1",
				detail: "El primer elemento, referencia de celda o rango dentro del cual desea contar números."
			},
			value2: {
				name: "valor2",
				detail: "Hasta 255 elementos, referencias de celda o rangos adicionales dentro de los cuales desea contar números."
			}
		}
	},
	COUNTA: {
		description: `Cuenta las celdas que contienen cualquier tipo de información, incluyendo valores de error y texto vacío ("")
        Si no necesita contar valores lógicos, texto o valores de error`,
		abstract: "Cuenta cuántos valores hay en la lista de argumentos",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/counta-function"
		}],
		functionParameter: {
			value1: {
				name: "valor1",
				detail: "El primer número, referencia de celda o rango para el que desea el promedio."
			},
			value2: {
				name: "valor2",
				detail: "Números adicionales, referencias de celda o rangos para los que desea el promedio, hasta un máximo de 255."
			}
		}
	},
	COUNTBLANK: {
		description: "Cuenta el número de celdas en blanco dentro de un rango.",
		abstract: "Cuenta el número de celdas en blanco dentro de un rango",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/countblank-function"
		}],
		functionParameter: { range: {
			name: "rango",
			detail: "El rango desde el cual desea contar las celdas en blanco."
		} }
	},
	COUNTIF: {
		description: "Cuenta el número de celdas dentro de un rango que cumplen el criterio dado.",
		abstract: "Cuenta el número de celdas dentro de un rango que cumplen el criterio dado",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/use-the-countif-function-in-microsoft-excel"
		}],
		functionParameter: {
			range: {
				name: "rango",
				detail: "El grupo de celdas que desea contar. El rango puede contener números, matrices, un rango con nombre o referencias que contengan números. Los valores en blanco y de texto se ignoran."
			},
			criteria: {
				name: "criterio",
				detail: "Un número, expresión, referencia de celda o cadena de texto que determina qué celdas se contarán.\nPor ejemplo, puede usar un número como 32, una comparación como \">32\", una celda como B4 o una palabra como \"manzanas\".\nCONTAR.SI usa solo un único criterio. Use CONTAR.SI.CONJUNTO si desea usar múltiples criterios."
			}
		}
	},
	COUNTIFS: {
		description: "Cuenta el número de celdas dentro de un rango que cumplen múltiples criterios.",
		abstract: "Cuenta el número de celdas dentro de un rango que cumplen múltiples criterios",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/countifs-function"
		}],
		functionParameter: {
			criteriaRange1: {
				name: "rango_criterios1",
				detail: "El primer rango en el que evaluar los criterios asociados."
			},
			criteria1: {
				name: "criterio1",
				detail: "El criterio en forma de número, expresión, referencia de celda o texto que define qué celdas se contarán. Por ejemplo, los criterios pueden expresarse como 32, \">32\", B4, \"manzanas\" o \"32\"."
			},
			criteriaRange2: {
				name: "rango_criterios2",
				detail: "Rangos adicionales. Puede introducir hasta 127 rangos."
			},
			criteria2: {
				name: "criterio2",
				detail: "Criterios adicionales asociados. Puede introducir hasta 127 criterios."
			}
		}
	},
	COVARIANCE_P: {
		description: "Devuelve la covarianza de la población, el promedio de los productos de las desviaciones para cada pareja de puntos de datos en dos conjuntos de datos.",
		abstract: "Devuelve la covarianza de la población",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/covariance-p-function"
		}],
		functionParameter: {
			array1: {
				name: "matriz1",
				detail: "Un primer rango de valores de celda."
			},
			array2: {
				name: "matriz2",
				detail: "Un segundo rango de valores de celda."
			}
		}
	},
	COVARIANCE_S: {
		description: "Devuelve la covarianza de la muestra, el promedio de los productos de las desviaciones para cada pareja de puntos de datos en dos conjuntos de datos.",
		abstract: "Devuelve la covarianza de la muestra",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/covariance-s-function"
		}],
		functionParameter: {
			array1: {
				name: "matriz1",
				detail: "Un primer rango de valores de celda."
			},
			array2: {
				name: "matriz2",
				detail: "Un segundo rango de valores de celda."
			}
		}
	},
	DEVSQ: {
		description: "Devuelve la suma de los cuadrados de las desviaciones",
		abstract: "Devuelve la suma de los cuadrados de las desviaciones",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/devsq-function"
		}],
		functionParameter: {
			number1: {
				name: "número1",
				detail: "El primer argumento para el que desea calcular la suma de las desviaciones al cuadrado."
			},
			number2: {
				name: "número2",
				detail: "Los argumentos del 2 al 255 para los que desea calcular la suma de las desviaciones al cuadrado."
			}
		}
	},
	EXPON_DIST: {
		description: "Devuelve la distribución exponencial",
		abstract: "Devuelve la distribución exponencial",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/expon-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor en el que se desea evaluar la distribución."
			},
			lambda: {
				name: "lambda",
				detail: "El valor del parámetro."
			},
			cumulative: {
				name: "acumulativo",
				detail: "Un valor lógico que determina la forma de la función. Si es VERDADERO, DISTR.EXP devuelve la función de distribución acumulativa; si es FALSO, devuelve la función de densidad de probabilidad."
			}
		}
	},
	F_DIST: {
		description: "Devuelve la distribución de probabilidad F",
		abstract: "Devuelve la distribución de probabilidad F",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/f-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor en el que se evalúa la función."
			},
			degFreedom1: {
				name: "grados_libertad1",
				detail: "Los grados de libertad del numerador."
			},
			degFreedom2: {
				name: "grados_libertad2",
				detail: "Los grados de libertad del denominador."
			},
			cumulative: {
				name: "acumulativo",
				detail: "Un valor lógico que determina la forma de la función. Si es VERDADERO, DISTR.F devuelve la función de distribución acumulativa; si es FALSO, devuelve la función de densidad de probabilidad."
			}
		}
	},
	F_DIST_RT: {
		description: "Devuelve la distribución de probabilidad F (de cola derecha)",
		abstract: "Devuelve la distribución de probabilidad F (de cola derecha)",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/f-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor en el que se evalúa la función."
			},
			degFreedom1: {
				name: "grados_libertad1",
				detail: "Los grados de libertad del numerador."
			},
			degFreedom2: {
				name: "grados_libertad2",
				detail: "Los grados de libertad del denominador."
			}
		}
	},
	F_INV: {
		description: "Devuelve la inversa de la distribución de probabilidad F",
		abstract: "Devuelve la inversa de la distribución de probabilidad F",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/f-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probabilidad",
				detail: "Una probabilidad asociada con la distribución F acumulativa."
			},
			degFreedom1: {
				name: "grados_libertad1",
				detail: "Los grados de libertad del numerador."
			},
			degFreedom2: {
				name: "grados_libertad2",
				detail: "Los grados de libertad del denominador."
			}
		}
	},
	F_INV_RT: {
		description: "Devuelve la inversa de la distribución de probabilidad F (de cola derecha)",
		abstract: "Devuelve la inversa de la distribución de probabilidad F (de cola derecha)",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/f-inv-rt-function"
		}],
		functionParameter: {
			probability: {
				name: "probabilidad",
				detail: "Una probabilidad asociada con la distribución F acumulativa."
			},
			degFreedom1: {
				name: "grados_libertad1",
				detail: "Los grados de libertad del numerador."
			},
			degFreedom2: {
				name: "grados_libertad2",
				detail: "Los grados de libertad del denominador."
			}
		}
	},
	F_TEST: {
		description: "Devuelve el resultado de una prueba F",
		abstract: "Devuelve el resultado de una prueba F",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/f-test-function"
		}],
		functionParameter: {
			array1: {
				name: "matriz1",
				detail: "La primera matriz o rango de datos."
			},
			array2: {
				name: "matriz2",
				detail: "La segunda matriz o rango de datos."
			}
		}
	},
	FISHER: {
		description: "Devuelve la transformación de Fisher",
		abstract: "Devuelve la transformación de Fisher",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/fisher-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Un valor numérico para el que desea la transformación."
		} }
	},
	FISHERINV: {
		description: "Devuelve la inversa de la transformación de Fisher",
		abstract: "Devuelve la inversa de la transformación de Fisher",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/fisherinv-function"
		}],
		functionParameter: { y: {
			name: "y",
			detail: "El valor para el que desea realizar la inversa de la transformación."
		} }
	},
	FORECAST: {
		description: "Devuelve un valor a lo largo de una tendencia lineal",
		abstract: "Devuelve un valor a lo largo de una tendencia lineal",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/forecast-and-forecast-linear-functions"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El punto de datos para el que desea predecir un valor."
			},
			knownYs: {
				name: "conocido_y",
				detail: "La matriz o rango de datos dependiente."
			},
			knownXs: {
				name: "conocido_x",
				detail: "La matriz o rango de datos independiente."
			}
		}
	},
	FORECAST_ETS: {
		description: "Devuelve un valor futuro basado en valores existentes (históricos) utilizando la versión AAA del algoritmo de Suavizado Exponencial (ETS)",
		abstract: "Devuelve un valor futuro basado en valores existentes (históricos) utilizando la versión AAA del algoritmo de Suavizado Exponencial (ETS)",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/forecast-ets-function"
		}],
		functionParameter: {
			targetDate: {
				name: "Fecha de destino",
				detail: "El punto de datos para el que desea predecir un valor."
			},
			values: {
				name: "Valores",
				detail: "Los valores históricos utilizados para la previsión."
			},
			timeline: {
				name: "Escala de tiempo",
				detail: "Un rango o matriz independiente de fechas u horas numéricas con un paso constante."
			},
			seasonality: {
				name: "Estacionalidad",
				detail: "Opcional. Longitud estacional; 1 para detección automática y 0 sin estacionalidad."
			},
			dataCompletion: {
				name: "Relleno de datos",
				detail: "Opcional. Use 1 para interpolar los puntos que faltan o 0 para tratarlos como cero."
			},
			aggregation: {
				name: "Agregación",
				detail: "Opcional. Un valor de 1 a 7 indica cómo agregar marcas de tiempo duplicadas."
			}
		}
	},
	FORECAST_ETS_CONFINT: {
		description: "Devuelve un intervalo de confianza para el valor de pronóstico en la fecha objetivo especificada",
		abstract: "Devuelve un intervalo de confianza para el valor de pronóstico en la fecha objetivo especificada",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/forecast-ets-confint-function"
		}],
		functionParameter: {
			targetDate: {
				name: "Fecha de destino",
				detail: "El punto de datos para el que desea predecir un valor."
			},
			values: {
				name: "Valores",
				detail: "Los valores históricos utilizados para la previsión."
			},
			timeline: {
				name: "Escala de tiempo",
				detail: "Un rango o matriz independiente de fechas u horas numéricas con un paso constante."
			},
			confidenceLevel: {
				name: "Nivel de confianza",
				detail: "Opcional. Un número entre 0 y 1; el valor predeterminado es 0,95."
			},
			seasonality: {
				name: "Estacionalidad",
				detail: "Opcional. Longitud estacional; 1 para detección automática y 0 sin estacionalidad."
			},
			dataCompletion: {
				name: "Relleno de datos",
				detail: "Opcional. Use 1 para interpolar los puntos que faltan o 0 para tratarlos como cero."
			},
			aggregation: {
				name: "Agregación",
				detail: "Opcional. Un valor de 1 a 7 indica cómo agregar marcas de tiempo duplicadas."
			}
		}
	},
	FORECAST_ETS_SEASONALITY: {
		description: "Devuelve la longitud del patrón repetitivo que Excel detecta para la serie temporal especificada",
		abstract: "Devuelve la longitud del patrón repetitivo que Excel detecta para la serie temporal especificada",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/forecast-ets-seasonality-function"
		}],
		functionParameter: {
			values: {
				name: "Valores",
				detail: "Los valores históricos utilizados para la previsión."
			},
			timeline: {
				name: "Escala de tiempo",
				detail: "Un rango o matriz independiente de fechas u horas numéricas con un paso constante."
			},
			dataCompletion: {
				name: "Relleno de datos",
				detail: "Opcional. Use 1 para interpolar los puntos que faltan o 0 para tratarlos como cero."
			},
			aggregation: {
				name: "Agregación",
				detail: "Opcional. Un valor de 1 a 7 indica cómo agregar marcas de tiempo duplicadas."
			}
		}
	},
	FORECAST_ETS_STAT: {
		description: "Devuelve un valor estadístico como resultado de la previsión de series temporales",
		abstract: "Devuelve un valor estadístico como resultado de la previsión de series temporales",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/forecast-ets-stat-function"
		}],
		functionParameter: {
			values: {
				name: "Valores",
				detail: "Los valores históricos utilizados para la previsión."
			},
			timeline: {
				name: "Escala de tiempo",
				detail: "Un rango o matriz independiente de fechas u horas numéricas con un paso constante."
			},
			statisticType: {
				name: "Tipo de estadística",
				detail: "Un valor de 1 a 8 indica la estadística de previsión que se devuelve."
			},
			seasonality: {
				name: "Estacionalidad",
				detail: "Opcional. Longitud estacional; 1 para detección automática y 0 sin estacionalidad."
			},
			dataCompletion: {
				name: "Relleno de datos",
				detail: "Opcional. Use 1 para interpolar los puntos que faltan o 0 para tratarlos como cero."
			},
			aggregation: {
				name: "Agregación",
				detail: "Opcional. Un valor de 1 a 7 indica cómo agregar marcas de tiempo duplicadas."
			}
		}
	},
	FORECAST_LINEAR: {
		description: "Devuelve un valor futuro basado en valores existentes",
		abstract: "Devuelve un valor futuro basado en valores existentes",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/forecast-and-forecast-linear-functions"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El punto de datos para el que desea predecir un valor."
			},
			knownYs: {
				name: "conocido_y",
				detail: "La matriz o rango de datos dependiente."
			},
			knownXs: {
				name: "conocido_x",
				detail: "La matriz o rango de datos independiente."
			}
		}
	},
	FREQUENCY: {
		description: "Devuelve una distribución de frecuencia como una matriz vertical",
		abstract: "Devuelve una distribución de frecuencia como una matriz vertical",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/frequency-function"
		}],
		functionParameter: {
			dataArray: {
				name: "matriz_datos",
				detail: "Una matriz o referencia a un conjunto de valores para los que desea contar frecuencias. Si matriz_datos no contiene valores, FRECUENCIA devuelve una matriz de ceros."
			},
			binsArray: {
				name: "matriz_bins",
				detail: "Una matriz o referencia a intervalos en los que desea agrupar los valores de matriz_datos. Si matriz_bins no contiene valores, FRECUENCIA devuelve el número de elementos en matriz_datos."
			}
		}
	},
	GAMMA: {
		description: "Devuelve el valor de la función Gamma",
		abstract: "Devuelve el valor de la función Gamma",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/gamma-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "Valor de entrada para la función gamma."
		} }
	},
	GAMMA_DIST: {
		description: "Devuelve la distribución gamma",
		abstract: "Devuelve la distribución gamma",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/gamma-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor para el que desea la distribución."
			},
			alpha: {
				name: "alfa",
				detail: "Un parámetro de la distribución."
			},
			beta: {
				name: "beta",
				detail: "Un parámetro de la distribución."
			},
			cumulative: {
				name: "acumulativo",
				detail: "Un valor lógico que determina la forma de la función. Si es VERDADERO, DISTR.GAMMA devuelve la función de distribución acumulativa; si es FALSO, devuelve la función de densidad de probabilidad."
			}
		}
	},
	GAMMA_INV: {
		description: "Devuelve la inversa de la distribución gamma acumulativa",
		abstract: "Devuelve la inversa de la distribución gamma acumulativa",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/gamma-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probabilidad",
				detail: "Una probabilidad asociada con la distribución gamma."
			},
			alpha: {
				name: "alfa",
				detail: "Un parámetro de la distribución."
			},
			beta: {
				name: "beta",
				detail: "Un parámetro de la distribución."
			}
		}
	},
	GAMMALN: {
		description: "Devuelve el logaritmo natural de la función gamma, Γ(x)",
		abstract: "Devuelve el logaritmo natural de la función gamma, Γ(x)",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/gammaln-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "El valor para el que desea calcular GAMMALN."
		} }
	},
	GAMMALN_PRECISE: {
		description: "Devuelve el logaritmo natural de la función gamma, Γ(x)",
		abstract: "Devuelve el logaritmo natural de la función gamma, Γ(x)",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/gammaln-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "El valor para el que desea calcular GAMMALN.PRECISO."
		} }
	},
	GAUSS: {
		description: "Devuelve 0.5 menos que la distribución normal acumulativa estándar",
		abstract: "Devuelve 0.5 menos que la distribución normal acumulativa estándar",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/gauss-function"
		}],
		functionParameter: { z: {
			name: "z",
			detail: "El valor para el que desea la distribución."
		} }
	},
	GEOMEAN: {
		description: "Devuelve la media geométrica",
		abstract: "Devuelve la media geométrica",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/geomean-function"
		}],
		functionParameter: {
			number1: {
				name: "número1",
				detail: "El primer número, referencia de celda o rango para el que desea la media geométrica."
			},
			number2: {
				name: "número2",
				detail: "Números adicionales, referencias de celda o rangos para los que desea la media geométrica, hasta un máximo de 255."
			}
		}
	},
	GROWTH: {
		description: "Devuelve valores a lo largo de una tendencia exponencial",
		abstract: "Devuelve valores a lo largo de una tendencia exponencial",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/growth-function"
		}],
		functionParameter: {
			knownYs: {
				name: "conocido_y",
				detail: "El conjunto de valores y que ya conoce en la relación y = b*m^x."
			},
			knownXs: {
				name: "conocido_x",
				detail: "El conjunto de valores x que ya conoce en la relación y = b*m^x."
			},
			newXs: {
				name: "nuevo_x",
				detail: "Son nuevos valores x para los que desea que CRECIMIENTO devuelva los valores y correspondientes."
			},
			constb: {
				name: "constante",
				detail: "Un valor lógico que especifica si se debe forzar que la constante b sea igual a 1."
			}
		}
	},
	HARMEAN: {
		description: "Devuelve la media armónica",
		abstract: "Devuelve la media armónica",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/harmean-function"
		}],
		functionParameter: {
			number1: {
				name: "número1",
				detail: "El primer número, referencia de celda o rango para el que desea la media armónica."
			},
			number2: {
				name: "número2",
				detail: "Números adicionales, referencias de celda o rangos para los que desea la media armónica, hasta un máximo de 255."
			}
		}
	},
	HYPGEOM_DIST: {
		description: "Devuelve la distribución hipergeométrica",
		abstract: "Devuelve la distribución hipergeométrica",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/hypgeom-dist-function"
		}],
		functionParameter: {
			sampleS: {
				name: "muestra_éxito",
				detail: "El número de éxitos en la muestra."
			},
			numberSample: {
				name: "núm_muestra",
				detail: "El tamaño de la muestra."
			},
			populationS: {
				name: "población_éxito",
				detail: "El número de éxitos en la población."
			},
			numberPop: {
				name: "núm_población",
				detail: "El tamaño de la población."
			},
			cumulative: {
				name: "acumulativo",
				detail: "Un valor lógico que determina la forma de la función. Si es VERDADERO, DISTR.HIPERGEOM devuelve la función de distribución acumulativa; si es FALSO, devuelve la función de densidad de probabilidad."
			}
		}
	},
	INTERCEPT: {
		description: "Devuelve la intersección de la línea de regresión lineal",
		abstract: "Devuelve la intersección de la línea de regresión lineal",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/intercept-function"
		}],
		functionParameter: {
			knownYs: {
				name: "conocido_y",
				detail: "La matriz o rango de datos dependiente."
			},
			knownXs: {
				name: "conocido_x",
				detail: "La matriz o rango de datos independiente."
			}
		}
	},
	KURT: {
		description: "Devuelve la curtosis de un conjunto de datos",
		abstract: "Devuelve la curtosis de un conjunto de datos",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/kurt-function"
		}],
		functionParameter: {
			number1: {
				name: "número1",
				detail: "El primer número, referencia de celda o rango para el que desea la curtosis."
			},
			number2: {
				name: "número2",
				detail: "Números adicionales, referencias de celda o rangos para los que desea la curtosis, hasta un máximo de 255."
			}
		}
	},
	LARGE: {
		description: "Devuelve el k-ésimo valor más grande de un conjunto de datos",
		abstract: "Devuelve el k-ésimo valor más grande de un conjunto de datos",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/large-function"
		}],
		functionParameter: {
			array: {
				name: "matriz",
				detail: "La matriz o rango de datos para el que desea determinar el k-ésimo valor más grande."
			},
			k: {
				name: "k",
				detail: "La posición (desde el más grande) en la matriz o rango de celdas de datos a devolver."
			}
		}
	},
	LINEST: {
		description: "Devuelve los parámetros de una tendencia lineal",
		abstract: "Devuelve los parámetros de una tendencia lineal",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/linest-function"
		}],
		functionParameter: {
			knownYs: {
				name: "conocido_y",
				detail: "El conjunto de valores y que ya conoce en la relación y = m*x+b."
			},
			knownXs: {
				name: "conocido_x",
				detail: "El conjunto de valores x que ya conoce en la relación y = m*x+b."
			},
			constb: {
				name: "constante",
				detail: "Un valor lógico que especifica si se debe forzar que la constante b sea igual a 0."
			},
			stats: {
				name: "estadísticas",
				detail: "Un valor lógico que especifica si se deben devolver estadísticas de regresión adicionales."
			}
		}
	},
	LOGEST: {
		description: "Devuelve los parámetros de una tendencia exponencial",
		abstract: "Devuelve los parámetros de una tendencia exponencial",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/logest-function"
		}],
		functionParameter: {
			knownYs: {
				name: "conocido_y",
				detail: "El conjunto de valores y que ya conoce en la relación y = b*m^x."
			},
			knownXs: {
				name: "conocido_x",
				detail: "El conjunto de valores x que ya conoce en la relación y = b*m^x."
			},
			constb: {
				name: "constante",
				detail: "Un valor lógico que especifica si se debe forzar que la constante b sea igual a 1."
			},
			stats: {
				name: "estadísticas",
				detail: "Un valor lógico que especifica si se deben devolver estadísticas de regresión adicionales."
			}
		}
	},
	LOGNORM_DIST: {
		description: "Devuelve la distribución logarítmico-normal acumulativa",
		abstract: "Devuelve la distribución logarítmico-normal acumulativa",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/lognorm-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor para el que desea la distribución."
			},
			mean: {
				name: "media",
				detail: "La media aritmética de la distribución."
			},
			standardDev: {
				name: "desv_estándar",
				detail: "La desviación estándar de la distribución."
			},
			cumulative: {
				name: "acumulativo",
				detail: "Un valor lógico que determina la forma de la función. Si es VERDADERO, DIST.LOGNORM devuelve la función de distribución acumulativa; si es FALSO, devuelve la función de densidad de probabilidad."
			}
		}
	},
	LOGNORM_INV: {
		description: "Devuelve la inversa de la distribución logarítmico-normal acumulativa",
		abstract: "Devuelve la inversa de la distribución logarítmico-normal acumulativa",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/lognorm-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probabilidad",
				detail: "Una probabilidad correspondiente a la distribución logarítmico-normal."
			},
			mean: {
				name: "media",
				detail: "La media aritmética de la distribución."
			},
			standardDev: {
				name: "desv_estándar",
				detail: "La desviación estándar de la distribución."
			}
		}
	},
	MARGINOFERROR: {
		description: "Esta función calcula el margen de error a partir de un intervalo de valores y un nivel de confianza.",
		abstract: "Esta función calcula el margen de error a partir de un intervalo de valores y un nivel de confianza.",
		links: [{
			title: "Instrucciones",
			url: "https://support.google.com/docs/answer/12487850?hl=es"
		}],
		functionParameter: {
			range: {
				name: "rango",
				detail: "MARGINOFERROR(A1:C3, 0.99)"
			},
			confidence: {
				name: "confianza",
				detail: "El nivel de confianza deseado entre (0, 1)."
			}
		}
	},
	MAX: {
		description: "Devuelve el valor más grande de un conjunto de valores.",
		abstract: "Devuelve el valor máximo en una lista de argumentos",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/max-function"
		}],
		functionParameter: {
			number1: {
				name: "número1",
				detail: "El primer número, referencia de celda o rango del que calcular el valor máximo."
			},
			number2: {
				name: "número2",
				detail: "Números adicionales, referencias de celda o rangos de los que calcular el valor máximo, hasta un máximo de 255."
			}
		}
	},
	MAXA: {
		description: "Devuelve el valor máximo de una lista de argumentos, incluyendo números, texto y valores lógicos.",
		abstract: "Devuelve el valor máximo de una lista de argumentos, incluyendo números, texto y valores lógicos",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/maxa-function"
		}],
		functionParameter: {
			value1: {
				name: "valor1",
				detail: "El primer argumento numérico para el que desea encontrar el valor más grande."
			},
			value2: {
				name: "valor2",
				detail: "Argumentos numéricos de 2 a 255 para los que desea encontrar el valor más grande."
			}
		}
	},
	MAXIFS: {
		description: "Devuelve el valor máximo entre las celdas especificadas por un conjunto dado de condiciones o criterios.",
		abstract: "Devuelve el valor máximo entre las celdas especificadas por un conjunto dado de condiciones o criterios",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/maxifs-function"
		}],
		functionParameter: {
			maxRange: {
				name: "rango_max",
				detail: "El rango de celdas a maximizar."
			},
			criteriaRange1: {
				name: "rango_criterios1",
				detail: "Es el conjunto de celdas a evaluar con el criterio."
			},
			criteria1: {
				name: "criterio1",
				detail: "Es el criterio en forma de número, expresión o texto que define qué celdas se evaluarán como máximo."
			},
			criteriaRange2: {
				name: "rango_criterios2",
				detail: "Rangos adicionales. Puede introducir hasta 127 rangos."
			},
			criteria2: {
				name: "criterio2",
				detail: "Criterios adicionales asociados. Puede introducir hasta 127 criterios."
			}
		}
	},
	MEDIAN: {
		description: "Devuelve la mediana de los números dados",
		abstract: "Devuelve la mediana de los números dados",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/median-function"
		}],
		functionParameter: {
			number1: {
				name: "número1",
				detail: "El primer número, referencia de celda o rango para el que desea los números dados."
			},
			number2: {
				name: "número2",
				detail: "Números adicionales, referencias de celda o rangos para los que desea los números dados, hasta un máximo de 255."
			}
		}
	},
	MIN: {
		description: "Devuelve el número más pequeño de un conjunto de valores.",
		abstract: "Devuelve el valor mínimo en una lista de argumentos",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/min-function"
		}],
		functionParameter: {
			number1: {
				name: "número1",
				detail: "El primer número, referencia de celda o rango del que calcular el valor mínimo."
			},
			number2: {
				name: "número2",
				detail: "Números adicionales, referencias de celda o rangos de los que calcular el valor mínimo, hasta un máximo de 255."
			}
		}
	},
	MINA: {
		description: "Devuelve el valor más pequeño en una lista de argumentos, incluyendo números, texto y valores lógicos",
		abstract: "Devuelve el valor más pequeño en una lista de argumentos, incluyendo números, texto y valores lógicos",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/mina-function"
		}],
		functionParameter: {
			value1: {
				name: "valor1",
				detail: "El primer número, referencia de celda o rango del que calcular el valor mínimo."
			},
			value2: {
				name: "valor2",
				detail: "Números adicionales, referencias de celda o rangos de los que calcular el valor mínimo, hasta un máximo de 255."
			}
		}
	},
	MINIFS: {
		description: "Devuelve el valor mínimo entre las celdas especificadas por un conjunto dado de condiciones o criterios.",
		abstract: "Devuelve el valor mínimo entre las celdas especificadas por un conjunto dado de condiciones o criterios",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/minifs-function"
		}],
		functionParameter: {
			minRange: {
				name: "rango_min",
				detail: "El rango real de celdas en el que se determinará el valor mínimo."
			},
			criteriaRange1: {
				name: "rango_criterios1",
				detail: "Es el conjunto de celdas a evaluar con el criterio."
			},
			criteria1: {
				name: "criterio1",
				detail: "Es el criterio en forma de número, expresión o texto que define qué celdas se evaluarán como mínimo. El mismo conjunto de criterios funciona para las funciones MAXIFS, SUMIFS y AVERAGEIFS."
			},
			criteriaRange2: {
				name: "rango_criterios2",
				detail: "Rangos adicionales. Puede introducir hasta 127 rangos."
			},
			criteria2: {
				name: "criterio2",
				detail: "Criterios adicionales asociados. Puede introducir hasta 127 criterios."
			}
		}
	},
	MODE_MULT: {
		description: "Devuelve una matriz vertical de los valores más frecuentes o repetitivos en una matriz o rango de datos",
		abstract: "Devuelve una matriz vertical de los valores más frecuentes o repetitivos en una matriz o rango de datos",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/mode-mult-function"
		}],
		functionParameter: {
			number1: {
				name: "número1",
				detail: "El primer número, referencia de celda o rango para el que desea calcular la moda."
			},
			number2: {
				name: "número2",
				detail: "Números adicionales, referencias de celda o rangos para los que desea calcular la moda, hasta un máximo de 255."
			}
		}
	},
	MODE_SNGL: {
		description: "Devuelve el valor más común en un conjunto de datos",
		abstract: "Devuelve el valor más común en un conjunto de datos",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/mode-sngl-function"
		}],
		functionParameter: {
			number1: {
				name: "número1",
				detail: "El primer número, referencia de celda o rango para el que desea calcular la moda."
			},
			number2: {
				name: "número2",
				detail: "Números adicionales, referencias de celda o rangos para los que desea calcular la moda, hasta un máximo de 255."
			}
		}
	},
	NEGBINOM_DIST: {
		description: "Devuelve la distribución binomial negativa",
		abstract: "Devuelve la distribución binomial negativa",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/negbinom-dist-function"
		}],
		functionParameter: {
			numberF: {
				name: "núm_fracasos",
				detail: "El número de fracasos."
			},
			numberS: {
				name: "núm_éxitos",
				detail: "El número umbral de éxitos."
			},
			probabilityS: {
				name: "prob_éxito",
				detail: "La probabilidad de un éxito."
			},
			cumulative: {
				name: "acumulativo",
				detail: "Un valor lógico que determina la forma de la función. Si es VERDADERO, DISTR.NEGBINOM devuelve la función de distribución acumulativa; si es FALSO, devuelve la función de densidad de probabilidad."
			}
		}
	},
	NORM_DIST: {
		description: "Devuelve la distribución normal acumulativa",
		abstract: "Devuelve la distribución normal acumulativa",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/norm-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor para el que desea la distribución."
			},
			mean: {
				name: "media",
				detail: "La media aritmética de la distribución."
			},
			standardDev: {
				name: "desv_estándar",
				detail: "La desviación estándar de la distribución."
			},
			cumulative: {
				name: "acumulativo",
				detail: "Un valor lógico que determina la forma de la función. Si es VERDADERO, DISTR.NORM devuelve la función de distribución acumulativa; si es FALSO, devuelve la función de densidad de probabilidad."
			}
		}
	},
	NORM_INV: {
		description: "Devuelve la inversa de la distribución normal acumulativa",
		abstract: "Devuelve la inversa de la distribución normal acumulativa",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/norm-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probabilidad",
				detail: "Una probabilidad correspondiente a la distribución normal."
			},
			mean: {
				name: "media",
				detail: "La media aritmética de la distribución."
			},
			standardDev: {
				name: "desv_estándar",
				detail: "La desviación estándar de la distribución."
			}
		}
	},
	NORM_S_DIST: {
		description: "Devuelve la distribución normal estándar acumulativa",
		abstract: "Devuelve la distribución normal estándar acumulativa",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/norm-s-dist-function"
		}],
		functionParameter: {
			z: {
				name: "z",
				detail: "El valor para el que desea la distribución."
			},
			cumulative: {
				name: "acumulativo",
				detail: "Un valor lógico que determina la forma de la función. Si es VERDADERO, DISTR.NORM.S devuelve la función de distribución acumulativa; si es FALSO, devuelve la función de densidad de probabilidad."
			}
		}
	},
	NORM_S_INV: {
		description: "Devuelve la inversa de la distribución normal estándar acumulativa",
		abstract: "Devuelve la inversa de la distribución normal estándar acumulativa",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/norm-s-inv-function"
		}],
		functionParameter: { probability: {
			name: "probabilidad",
			detail: "Una probabilidad correspondiente a la distribución normal."
		} }
	},
	PEARSON: {
		description: "Devuelve el coeficiente de correlación del producto momento de Pearson",
		abstract: "Devuelve el coeficiente de correlación del producto momento de Pearson",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/pearson-function"
		}],
		functionParameter: {
			array1: {
				name: "matriz1",
				detail: "La matriz o rango de datos dependiente."
			},
			array2: {
				name: "matriz2",
				detail: "La matriz o rango de datos independiente."
			}
		}
	},
	PERCENTILE_EXC: {
		description: "Devuelve el k-ésimo percentil de los valores de un conjunto de datos (excluye 0 y 1).",
		abstract: "Devuelve el k-ésimo percentil de los valores de un conjunto de datos (excluye 0 y 1).",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/percentile-exc-function"
		}],
		functionParameter: {
			array: {
				name: "matriz",
				detail: "La matriz o rango de datos que define la posición relativa."
			},
			k: {
				name: "k",
				detail: "El valor del percentil en el rango 0 y 1 (excluye 0 y 1)."
			}
		}
	},
	PERCENTILE_INC: {
		description: "Devuelve el k-ésimo percentil de los valores de un conjunto de datos (incluye 0 y 1)",
		abstract: "Devuelve el k-ésimo percentil de los valores de un conjunto de datos (incluye 0 y 1)",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/percentile-inc-function"
		}],
		functionParameter: {
			array: {
				name: "matriz",
				detail: "La matriz o rango de datos que define la posición relativa."
			},
			k: {
				name: "k",
				detail: "El valor del percentil en el rango 0 y 1 (incluye 0 y 1)."
			}
		}
	},
	PERCENTRANK_EXC: {
		description: "Devuelve el rango porcentual de un valor en un conjunto de datos (excluye 0 y 1)",
		abstract: "Devuelve el rango porcentual de un valor en un conjunto de datos (excluye 0 y 1)",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/percentrank-exc-function"
		}],
		functionParameter: {
			array: {
				name: "matriz",
				detail: "La matriz o rango de datos que define la posición relativa."
			},
			x: {
				name: "x",
				detail: "El valor cuyo rango desea conocer."
			},
			significance: {
				name: "cifras_significativas",
				detail: "Un valor que identifica el número de dígitos significativos para el valor de porcentaje devuelto. Si se omite, RANGO.PERCENTIL.EXC usa tres dígitos (0,xxx)."
			}
		}
	},
	PERCENTRANK_INC: {
		description: "Devuelve el rango porcentual de un valor en un conjunto de datos (incluye 0 y 1)",
		abstract: "Devuelve el rango porcentual de un valor en un conjunto de datos (incluye 0 y 1)",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/percentrank-inc-function"
		}],
		functionParameter: {
			array: {
				name: "matriz",
				detail: "La matriz o rango de datos que define la posición relativa."
			},
			x: {
				name: "x",
				detail: "El valor cuyo rango desea conocer."
			},
			significance: {
				name: "cifras_significativas",
				detail: "Un valor que identifica el número de dígitos significativos para el valor de porcentaje devuelto. Si se omite, RANGO.PERCENTIL.INC usa tres dígitos (0,xxx)."
			}
		}
	},
	PERMUT: {
		description: "Devuelve el número de permutaciones para un número dado de objetos",
		abstract: "Devuelve el número de permutaciones para un número dado de objetos",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/permut-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El número de elementos."
			},
			numberChosen: {
				name: "número_elegido",
				detail: "El número de elementos en cada permutación."
			}
		}
	},
	PERMUTATIONA: {
		description: "Devuelve el número de permutaciones para un número dado de objetos (con repeticiones) que pueden ser seleccionados del total de objetos",
		abstract: "Devuelve el número de permutaciones para un número dado de objetos (con repeticiones) que pueden ser seleccionados del total de objetos",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/permutationa-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El número de elementos."
			},
			numberChosen: {
				name: "número_elegido",
				detail: "El número de elementos en cada permutación."
			}
		}
	},
	PHI: {
		description: "Devuelve el valor de la función de densidad para una distribución normal estándar",
		abstract: "Devuelve el valor de la función de densidad para una distribución normal estándar",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/phi-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "X es el número para el que desea la densidad de la distribución normal estándar."
		} }
	},
	POISSON_DIST: {
		description: "Devuelve la distribución de Poisson",
		abstract: "Devuelve la distribución de Poisson",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/poisson-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor para el que desea la distribución."
			},
			mean: {
				name: "media",
				detail: "La media aritmética de la distribución."
			},
			cumulative: {
				name: "acumulativo",
				detail: "Un valor lógico que determina la forma de la función. Si es VERDADERO, POISSON.DIST devuelve la función de distribución acumulativa; si es FALSO, devuelve la función de densidad de probabilidad."
			}
		}
	},
	PROB: {
		description: "Devuelve la probabilidad de que los valores en un rango estén entre dos límites",
		abstract: "Devuelve la probabilidad de que los valores en un rango estén entre dos límites",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/prob-function"
		}],
		functionParameter: {
			xRange: {
				name: "rango_x",
				detail: "El rango de valores numéricos de x con los que hay probabilidades asociadas."
			},
			probRange: {
				name: "rango_prob",
				detail: "Un conjunto de probabilidades asociadas con los valores en rango_x."
			},
			lowerLimit: {
				name: "límite_inferior",
				detail: "El límite inferior del valor para el que desea una probabilidad."
			},
			upperLimit: {
				name: "límite_superior",
				detail: "El límite superior del valor para el que desea una probabilidad."
			}
		}
	},
	QUARTILE_EXC: {
		description: "Devuelve el cuartil de un conjunto de datos (excluye 0 y 1)",
		abstract: "Devuelve el cuartil de un conjunto de datos (excluye 0 y 1)",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/quartile-exc-function"
		}],
		functionParameter: {
			array: {
				name: "matriz",
				detail: "La matriz o rango de datos para el que desea los valores de cuartil."
			},
			quart: {
				name: "cuartil",
				detail: "El valor de cuartil a devolver."
			}
		}
	},
	QUARTILE_INC: {
		description: "Devuelve el cuartil de un conjunto de datos (incluye 0 y 1)",
		abstract: "Devuelve el cuartil de un conjunto de datos (incluye 0 y 1)",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/quartile-inc-function"
		}],
		functionParameter: {
			array: {
				name: "matriz",
				detail: "La matriz o rango de datos para el que desea los valores de cuartil."
			},
			quart: {
				name: "cuartil",
				detail: "El valor de cuartil a devolver."
			}
		}
	},
	RANK_AVG: {
		description: "Devuelve el rango de un número en una lista de números",
		abstract: "Devuelve el rango de un número en una lista de números",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/rank-avg-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El número cuyo rango desea encontrar."
			},
			ref: {
				name: "ref",
				detail: "Una referencia a una lista de números. Los valores no numéricos en ref se ignoran."
			},
			order: {
				name: "orden",
				detail: "Un número que especifica cómo clasificar el número. Si el orden es 0 (cero) u se omite, Microsoft Excel clasifica el número como si ref fuera una lista ordenada en orden descendente. Si el orden es cualquier valor distinto de cero, Microsoft Excel clasifica el número como si ref fuera una lista ordenada en orden ascendente."
			}
		}
	},
	RANK_EQ: {
		description: "Devuelve el rango de un número en una lista de números",
		abstract: "Devuelve el rango de un número en una lista de números",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/rank-eq-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El número cuyo rango desea encontrar."
			},
			ref: {
				name: "ref",
				detail: "Una referencia a una lista de números. Los valores no numéricos en ref se ignoran."
			},
			order: {
				name: "orden",
				detail: "Un número que especifica cómo clasificar el número. Si el orden es 0 (cero) u se omite, Microsoft Excel clasifica el número como si ref fuera una lista ordenada en orden descendente. Si el orden es cualquier valor distinto de cero, Microsoft Excel clasifica el número como si ref fuera una lista ordenada en orden ascendente."
			}
		}
	},
	RSQ: {
		description: "Devuelve el cuadrado del coeficiente de correlación del producto momento de Pearson",
		abstract: "Devuelve el cuadrado del coeficiente de correlación del producto momento de Pearson",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/rsq-function"
		}],
		functionParameter: {
			knownYs: {
				name: "conocido_y",
				detail: "La matriz o rango de datos dependiente."
			},
			knownXs: {
				name: "conocido_x",
				detail: "La matriz o rango de datos independiente."
			}
		}
	},
	SKEW: {
		description: "Devuelve la asimetría de una distribución",
		abstract: "Devuelve la asimetría de una distribución",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/skew-function"
		}],
		functionParameter: {
			number1: {
				name: "número1",
				detail: "El primer número, referencia de celda o rango para el que desea la asimetría."
			},
			number2: {
				name: "número2",
				detail: "Números adicionales, referencias de celda o rangos para los que desea la asimetría, hasta un máximo de 255."
			}
		}
	},
	SKEW_P: {
		description: "Devuelve la asimetría de una distribución basada en una población",
		abstract: "Devuelve la asimetría de una distribución basada en una población",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/skew-p-function"
		}],
		functionParameter: {
			number1: {
				name: "número1",
				detail: "El primer número, referencia de celda o rango para el que desea la asimetría."
			},
			number2: {
				name: "número2",
				detail: "Números adicionales, referencias de celda o rangos para los que desea la asimetría, hasta un máximo de 255."
			}
		}
	},
	SLOPE: {
		description: "Devuelve la pendiente de la línea de regresión lineal",
		abstract: "Devuelve la pendiente de la línea de regresión lineal",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/slope-function"
		}],
		functionParameter: {
			knownYs: {
				name: "conocido_y",
				detail: "La matriz o rango de datos dependiente."
			},
			knownXs: {
				name: "conocido_x",
				detail: "La matriz o rango de datos independiente."
			}
		}
	},
	SMALL: {
		description: "Devuelve el k-ésimo valor más pequeño de un conjunto de datos",
		abstract: "Devuelve el k-ésimo valor más pequeño de un conjunto de datos",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/small-function"
		}],
		functionParameter: {
			array: {
				name: "matriz",
				detail: "La matriz o rango de datos para el que desea determinar el k-ésimo valor más pequeño."
			},
			k: {
				name: "k",
				detail: "La posición (desde el más pequeño) en la matriz o rango de celdas de datos a devolver."
			}
		}
	},
	STANDARDIZE: {
		description: "Devuelve un valor normalizado",
		abstract: "Devuelve un valor normalizado",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/standardize-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor que desea normalizar."
			},
			mean: {
				name: "media",
				detail: "La media aritmética de la distribución."
			},
			standardDev: {
				name: "desv_estándar",
				detail: "La desviación estándar de la distribución."
			}
		}
	},
	STDEV_P: {
		description: "Calcula la desviación estándar basada en toda la población dada como argumentos (ignora valores lógicos y texto).",
		abstract: "Calcula la desviación estándar basada en toda la población",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/stdev-p-function"
		}],
		functionParameter: {
			number1: {
				name: "número1",
				detail: "El primer argumento numérico correspondiente a una población."
			},
			number2: {
				name: "número2",
				detail: "Argumentos numéricos de 2 a 254 correspondientes a una población. También puede usar una sola matriz o una referencia a una matriz en lugar de argumentos separados por comas."
			}
		}
	},
	STDEV_S: {
		description: "Estima la desviación estándar basada en una muestra (ignora valores lógicos y texto en la muestra).",
		abstract: "Estima la desviación estándar basada en una muestra",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/stdev-s-function"
		}],
		functionParameter: {
			number1: {
				name: "número1",
				detail: "El primer argumento numérico correspondiente a una muestra de una población. También puede usar una sola matriz o una referencia a una matriz en lugar de argumentos separados por comas."
			},
			number2: {
				name: "número2",
				detail: "Argumentos numéricos de 2 a 254 correspondientes a una muestra de una población. También puede usar una sola matriz o una referencia a una matriz en lugar de argumentos separados por comas."
			}
		}
	},
	STDEVA: {
		description: "Estima la desviación estándar basada en una muestra, incluyendo números, texto y valores lógicos.",
		abstract: "Estima la desviación estándar basada en una muestra, incluyendo números, texto y valores lógicos",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/stdeva-function"
		}],
		functionParameter: {
			value1: {
				name: "valor1",
				detail: "El primer argumento de valor correspondiente a una muestra de una población. También puede usar una sola matriz o una referencia a una matriz en lugar de argumentos separados por comas."
			},
			value2: {
				name: "valor2",
				detail: "Argumentos de valor de 2 a 254 correspondientes a una muestra de una población. También puede usar una sola matriz o una referencia a una matriz en lugar de argumentos separados por comas."
			}
		}
	},
	STDEVPA: {
		description: "Calcula la desviación estándar basada en toda la población dada como argumentos, incluyendo texto y valores lógicos.",
		abstract: "Calcula la desviación estándar basada en toda la población, incluyendo números, texto y valores lógicos",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/stdevpa-function"
		}],
		functionParameter: {
			value1: {
				name: "valor1",
				detail: "El primer argumento de valor correspondiente a una población."
			},
			value2: {
				name: "valor2",
				detail: "Argumentos de valor de 2 a 254 correspondientes a una población. También puede usar una sola matriz o una referencia a una matriz en lugar de argumentos separados por comas."
			}
		}
	},
	STEYX: {
		description: "Devuelve el error estándar del valor y predicho para cada x en la regresión",
		abstract: "Devuelve el error estándar del valor y predicho para cada x en la regresión",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/steyx-function"
		}],
		functionParameter: {
			knownYs: {
				name: "conocido_y",
				detail: "La matriz o rango de datos dependiente."
			},
			knownXs: {
				name: "conocido_x",
				detail: "La matriz o rango de datos independiente."
			}
		}
	},
	T_DIST: {
		description: "Devuelve la probabilidad para la distribución t de Student",
		abstract: "Devuelve la probabilidad para la distribución t de Student",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/t-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor numérico en el que evaluar la distribución"
			},
			degFreedom: {
				name: "grados_libertad",
				detail: "Un entero que indica el número de grados de libertad."
			},
			cumulative: {
				name: "acumulativo",
				detail: "Un valor lógico que determina la forma de la función. Si es VERDADERO, DIST.T devuelve la función de distribución acumulativa; si es FALSO, devuelve la función de densidad de probabilidad."
			}
		}
	},
	T_DIST_2T: {
		description: "Devuelve la probabilidad para la distribución t de Student (dos colas)",
		abstract: "Devuelve la probabilidad para la distribución t de Student (dos colas)",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/t-dist-2t-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor numérico en el que evaluar la distribución"
			},
			degFreedom: {
				name: "grados_libertad",
				detail: "Un entero que indica el número de grados de libertad."
			}
		}
	},
	T_DIST_RT: {
		description: "Devuelve la probabilidad para la distribución t de Student (cola derecha)",
		abstract: "Devuelve la probabilidad para la distribución t de Student (cola derecha)",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/t-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor numérico en el que evaluar la distribución"
			},
			degFreedom: {
				name: "grados_libertad",
				detail: "Un entero que indica el número de grados de libertad."
			}
		}
	},
	T_INV: {
		description: "Devuelve la inversa de la probabilidad para la distribución t de Student",
		abstract: "Devuelve la inversa de la probabilidad para la distribución t de Student",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/t-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probabilidad",
				detail: "La probabilidad asociada con la distribución t de Student."
			},
			degFreedom: {
				name: "grados_libertad",
				detail: "Un entero que indica el número de grados de libertad."
			}
		}
	},
	T_INV_2T: {
		description: "Devuelve la inversa de la probabilidad para la distribución t de Student (dos colas)",
		abstract: "Devuelve la inversa de la probabilidad para la distribución t de Student (dos colas)",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/t-inv-2t-function"
		}],
		functionParameter: {
			probability: {
				name: "probabilidad",
				detail: "La probabilidad asociada con la distribución t de Student."
			},
			degFreedom: {
				name: "grados_libertad",
				detail: "Un entero que indica el número de grados de libertad."
			}
		}
	},
	T_TEST: {
		description: "Devuelve la probabilidad asociada con una prueba t de Student",
		abstract: "Devuelve la probabilidad asociada con una prueba t de Student",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/t-test-function"
		}],
		functionParameter: {
			array1: {
				name: "matriz1",
				detail: "La primera matriz o rango de datos."
			},
			array2: {
				name: "matriz2",
				detail: "La segunda matriz o rango de datos."
			},
			tails: {
				name: "colas",
				detail: "Especifica el número de colas de distribución. Si colas = 1, PRUEBA.T usa la distribución de una cola. Si colas = 2, PRUEBA.T usa la distribución de dos colas."
			},
			type: {
				name: "tipo",
				detail: "El tipo de prueba t a realizar."
			}
		}
	},
	TREND: {
		description: "Devuelve valores a lo largo de una tendencia lineal",
		abstract: "Devuelve valores a lo largo de una tendencia lineal",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/trend-function"
		}],
		functionParameter: {
			knownYs: {
				name: "conocido_y",
				detail: "El conjunto de valores y que ya conoce en la relación y = m*x+b."
			},
			knownXs: {
				name: "conocido_x",
				detail: "El conjunto de valores x que ya conoce en la relación y = m*x+b."
			},
			newXs: {
				name: "nuevo_x",
				detail: "Son nuevos valores x para los que desea que TENDENCIA devuelva los valores y correspondientes."
			},
			constb: {
				name: "constante",
				detail: "Un valor lógico que especifica si se debe forzar que la constante b sea igual a 0."
			}
		}
	},
	TRIMMEAN: {
		description: "Devuelve la media del interior de un conjunto de datos",
		abstract: "Devuelve la media del interior de un conjunto de datos",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/trimmean-function"
		}],
		functionParameter: {
			array: {
				name: "matriz",
				detail: "La matriz o rango de valores a recortar y promediar."
			},
			percent: {
				name: "porcentaje",
				detail: "El número fraccional de puntos de datos a excluir del cálculo."
			}
		}
	},
	VAR_P: {
		description: "Calcula la varianza basada en toda la población (ignora valores lógicos y texto en la población).",
		abstract: "Calcula la varianza basada en toda la población",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/var-p-function"
		}],
		functionParameter: {
			number1: {
				name: "número1",
				detail: "El primer argumento numérico correspondiente a una población."
			},
			number2: {
				name: "número2",
				detail: "Argumentos numéricos de 2 a 254 correspondientes a una población."
			}
		}
	},
	VAR_S: {
		description: "Estima la varianza basada en una muestra (ignora valores lógicos y texto en la muestra).",
		abstract: "Estima la varianza basada en una muestra",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/var-s-function"
		}],
		functionParameter: {
			number1: {
				name: "número1",
				detail: "El primer argumento numérico correspondiente a una muestra de una población."
			},
			number2: {
				name: "número2",
				detail: "Argumentos numéricos de 2 a 254 correspondientes a una muestra de una población."
			}
		}
	},
	VARA: {
		description: "Estima la varianza basada en una muestra, incluyendo números, texto y valores lógicos",
		abstract: "Estima la varianza basada en una muestra, incluyendo números, texto y valores lógicos",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/vara-function"
		}],
		functionParameter: {
			value1: {
				name: "valor1",
				detail: "El primer argumento de valor correspondiente a una muestra de una población."
			},
			value2: {
				name: "valor2",
				detail: "Argumentos de valor de 2 a 254 correspondientes a una muestra de una población."
			}
		}
	},
	VARPA: {
		description: "Calcula la varianza basada en toda la población, incluyendo números, texto y valores lógicos",
		abstract: "Calcula la varianza basada en toda la población, incluyendo números, texto y valores lógicos",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/varpa-function"
		}],
		functionParameter: {
			value1: {
				name: "valor1",
				detail: "El primer argumento de valor correspondiente a una población."
			},
			value2: {
				name: "valor2",
				detail: "Argumentos de valor de 2 a 254 correspondientes a una población."
			}
		}
	},
	WEIBULL_DIST: {
		description: "Devuelve la distribución de Weibull",
		abstract: "Devuelve la distribución de Weibull",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/weibull-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "El valor para el que desea la distribución."
			},
			alpha: {
				name: "alfa",
				detail: "Un parámetro de la distribución."
			},
			beta: {
				name: "beta",
				detail: "Un parámetro de la distribución."
			},
			cumulative: {
				name: "acumulativo",
				detail: "Un valor lógico que determina la forma de la función. Si es VERDADERO, WEIBULL.DIST devuelve la función de distribución acumulativa; si es FALSO, devuelve la función de densidad de probabilidad."
			}
		}
	},
	Z_TEST: {
		description: "Devuelve el valor de probabilidad de una cola de una prueba z",
		abstract: "Devuelve el valor de probabilidad de una cola de una prueba z",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/z-test-function"
		}],
		functionParameter: {
			array: {
				name: "matriz",
				detail: "La matriz o rango de datos contra el que probar x."
			},
			x: {
				name: "x",
				detail: "El valor a probar."
			},
			sigma: {
				name: "sigma",
				detail: "La desviación estándar de la población (conocida). Si se omite, se usa la desviación estándar de la muestra."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/text/es-ES.ts
const locale$3 = {
	ASC: {
		description: "Cambia las letras inglesas o katakana de ancho completo (doble byte) dentro de una cadena de caracteres a caracteres de ancho medio (un solo byte)",
		abstract: "Cambia las letras inglesas o katakana de ancho completo (doble byte) dentro de una cadena de caracteres a caracteres de ancho medio (un solo byte)",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/asc-function"
		}],
		functionParameter: { text: {
			name: "texto",
			detail: "El texto o una referencia a una celda que contiene el texto que desea cambiar. Si el texto no contiene ninguna letra de ancho completo, el texto no se cambia."
		} }
	},
	ARRAYTOTEXT: {
		description: "Devuelve una matriz de valores de texto desde cualquier rango especificado",
		abstract: "Devuelve una matriz de valores de texto desde cualquier rango especificado",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/arraytotext-function"
		}],
		functionParameter: {
			array: {
				name: "matriz",
				detail: "La matriz a devolver como texto."
			},
			format: {
				name: "formato",
				detail: "El formato de los datos devueltos. Puede ser uno de dos valores: \n0 Predeterminado. Formato conciso y fácil de leer. \n1 Formato estricto que incluye caracteres de escape y delimitadores de fila. Genera una cadena que se puede analizar al introducirla en la barra de fórmulas. Encapsula las cadenas devueltas entre comillas, excepto para valores booleanos, números y errores."
			}
		}
	},
	BAHTTEXT: {
		description: "Convierte un número a texto, usando el formato de moneda ß (baht)",
		abstract: "Convierte un número a texto, usando el formato de moneda ß (baht)",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/bahttext-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "Un número que desea convertir a texto, o una referencia a una celda que contiene un número, o una fórmula que se evalúa como un número."
		} }
	},
	CHAR: {
		description: "Devuelve el carácter especificado por el número de código",
		abstract: "Devuelve el carácter especificado por el número de código",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/char-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "Un número entre 1 y 255 que especifica qué carácter desea. El carácter es del juego de caracteres utilizado por su ordenador."
		} }
	},
	CLEAN: {
		description: "Elimina todos los caracteres no imprimibles del texto",
		abstract: "Elimina todos los caracteres no imprimibles del texto",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/clean-function"
		}],
		functionParameter: { text: {
			name: "texto",
			detail: "Cualquier información de la hoja de cálculo de la que desee eliminar caracteres no imprimibles."
		} }
	},
	CODE: {
		description: "Devuelve un código numérico para el primer carácter de una cadena de texto",
		abstract: "Devuelve un código numérico para el primer carácter de una cadena de texto",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/code-function"
		}],
		functionParameter: { text: {
			name: "texto",
			detail: "El texto del que desea el código del primer carácter."
		} }
	},
	CONCAT: {
		description: "Combina el texto de múltiples rangos y/o cadenas, pero no proporciona los argumentos de delimitador o IgnoreEmpty.",
		abstract: "Combina el texto de múltiples rangos y/o cadenas, pero no proporciona los argumentos de delimitador o IgnoreEmpty",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/concat-function"
		}],
		functionParameter: {
			text1: {
				name: "texto1",
				detail: "Elemento de texto a unir. Una cadena, o una matriz de cadenas, como un rango de celdas."
			},
			text2: {
				name: "texto2",
				detail: "Elementos de texto adicionales a unir. Puede haber un máximo de 253 argumentos de texto para los elementos de texto. Cada uno puede ser una cadena, o una matriz de cadenas, como un rango de celdas."
			}
		}
	},
	CONCATENATE: {
		description: "Une varios elementos de texto en uno solo",
		abstract: "Une varios elementos de texto en uno solo",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/concatenate-function"
		}],
		functionParameter: {
			text1: {
				name: "texto1",
				detail: "El primer elemento a unir. El elemento puede ser un valor de texto, un número o una referencia de celda."
			},
			text2: {
				name: "texto2",
				detail: "Elementos de texto adicionales a unir. Puede tener hasta 255 elementos, hasta un total de 8,192 caracteres."
			}
		}
	},
	DBCS: {
		description: "Cambia las letras inglesas o katakana de ancho medio (un solo byte) dentro de una cadena de caracteres a caracteres de ancho completo (doble byte)",
		abstract: "Cambia las letras inglesas o katakana de ancho medio (un solo byte) dentro de una cadena de caracteres a caracteres de ancho completo (doble byte)",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/dbcs-function"
		}],
		functionParameter: { text: {
			name: "texto",
			detail: "El texto o una referencia a una celda que contiene el texto que desea cambiar. Si el texto no contiene ninguna letra inglesa de ancho medio o katakana, el texto no se cambia."
		} }
	},
	DOLLAR: {
		description: "Convierte un número a texto usando el formato de moneda",
		abstract: "Convierte un número a texto usando el formato de moneda",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/dollar-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "Un número, una referencia a una celda que contiene un número, o una fórmula que se evalúa como un número."
			},
			decimals: {
				name: "decimales",
				detail: "El número de dígitos a la derecha del punto decimal. Si es negativo, el número se redondea a la izquierda del punto decimal. Si omite los decimales, se asume que son 2."
			}
		}
	},
	EXACT: {
		description: "Comprueba si dos valores de texto son idénticos",
		abstract: "Comprueba si dos valores de texto son idénticos",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/exact-function"
		}],
		functionParameter: {
			text1: {
				name: "texto1",
				detail: "La primera cadena de texto."
			},
			text2: {
				name: "texto2",
				detail: "La segunda cadena de texto."
			}
		}
	},
	FIND: {
		description: "Busca un valor de texto dentro de otro (distingue mayúsculas y minúsculas)",
		abstract: "Busca un valor de texto dentro de otro (distingue mayúsculas y minúsculas)",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/this-article-has-been-retired"
		}],
		functionParameter: {
			findText: {
				name: "texto_buscado",
				detail: "El texto que desea buscar."
			},
			withinText: {
				name: "dentro_del_texto",
				detail: "El texto que contiene el texto que desea buscar."
			},
			startNum: {
				name: "núm_inicial",
				detail: "Especifica el carácter en el que iniciar la búsqueda. Si omite núm_inicial, se asume que es 1."
			}
		}
	},
	FINDB: {
		description: "Busca un valor de texto dentro de otro (distingue mayúsculas y minúsculas)",
		abstract: "Busca un valor de texto dentro de otro (distingue mayúsculas y minúsculas)",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/this-article-has-been-retired"
		}],
		functionParameter: {
			findText: {
				name: "texto_buscado",
				detail: "El texto que desea buscar."
			},
			withinText: {
				name: "dentro_del_texto",
				detail: "El texto que contiene el texto que desea buscar."
			},
			startNum: {
				name: "núm_inicial",
				detail: "Especifica el carácter en el que iniciar la búsqueda. Si omite núm_inicial, se asume que es 1."
			}
		}
	},
	FIXED: {
		description: "Formatea un número como texto con un número fijo de decimales",
		abstract: "Formatea un número como texto con un número fijo de decimales",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/fixed-function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El número que desea redondear y convertir a texto."
			},
			decimals: {
				name: "decimales",
				detail: "El número de dígitos a la derecha del punto decimal. Si es negativo, el número se redondea a la izquierda del punto decimal. Si omite los decimales, se asume que son 2."
			},
			noCommas: {
				name: "sin_comas",
				detail: "Un valor lógico que, si es VERDADERO, evita que DECIMAL incluya comas en el texto devuelto."
			}
		}
	},
	LEFT: {
		description: "Devuelve los caracteres del principio de una cadena de texto",
		abstract: "Devuelve los caracteres del principio de una cadena de texto",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/left-function"
		}],
		functionParameter: {
			text: {
				name: "texto",
				detail: "La cadena de texto que contiene los caracteres que desea extraer."
			},
			numChars: {
				name: "núm_de_caracteres",
				detail: "Especifica el número de caracteres que desea que IZQUIERDA extraiga."
			}
		}
	},
	LEFTB: {
		description: "Devuelve los caracteres del principio de una cadena de texto",
		abstract: "Devuelve los caracteres del principio de una cadena de texto",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/left-function"
		}],
		functionParameter: {
			text: {
				name: "texto",
				detail: "La cadena de texto que contiene los caracteres que desea extraer."
			},
			numBytes: {
				name: "núm_de_bytes",
				detail: "Especifica el número de caracteres que desea que IZQUIERDAB extraiga, basado en bytes."
			}
		}
	},
	LEN: {
		description: "Devuelve el número de caracteres de una cadena de texto",
		abstract: "Devuelve el número de caracteres de una cadena de texto",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/len-function"
		}],
		functionParameter: { text: {
			name: "texto",
			detail: "El texto cuya longitud desea encontrar. Los espacios cuentan como caracteres."
		} }
	},
	LENB: {
		description: "Devuelve el número de bytes utilizados para representar los caracteres de una cadena de texto.",
		abstract: "Devuelve el número de bytes utilizados para representar los caracteres de una cadena de texto",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/len-function"
		}],
		functionParameter: { text: {
			name: "texto",
			detail: "El texto cuya longitud desea encontrar. Los espacios cuentan como caracteres."
		} }
	},
	LOWER: {
		description: "Convierte el texto a minúsculas.",
		abstract: "Convierte el texto a minúsculas",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/lower-function"
		}],
		functionParameter: { text: {
			name: "texto",
			detail: "El texto que desea convertir a minúsculas."
		} }
	},
	MID: {
		description: "Devuelve un número específico de caracteres de una cadena de texto, comenzando en la posición que especifique.",
		abstract: "Devuelve un número específico de caracteres de una cadena de texto, comenzando en la posición que especifique",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/mid-function"
		}],
		functionParameter: {
			text: {
				name: "texto",
				detail: "La cadena de texto que contiene los caracteres que desea extraer."
			},
			startNum: {
				name: "núm_inicial",
				detail: "La posición del primer carácter que desea extraer en el texto."
			},
			numChars: {
				name: "núm_de_caracteres",
				detail: "Especifica el número de caracteres que desea que EXTRAE extraiga."
			}
		}
	},
	MIDB: {
		description: "Devuelve un número específico de caracteres de una cadena de texto, comenzando en la posición que especifique",
		abstract: "Devuelve un número específico de caracteres de una cadena de texto, comenzando en la posición que especifique",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/mid-function"
		}],
		functionParameter: {
			text: {
				name: "texto",
				detail: "La cadena de texto que contiene los caracteres que desea extraer."
			},
			startNum: {
				name: "núm_inicial",
				detail: "La posición del primer carácter que desea extraer en el texto."
			},
			numBytes: {
				name: "núm_de_bytes",
				detail: "Especifica el número de caracteres que desea que EXTRAEB extraiga, basado en bytes."
			}
		}
	},
	NUMBERSTRING: {
		description: "Convertir números a cadenas chinas",
		abstract: "Convertir números a cadenas chinas",
		links: [{
			title: "Instrucciones",
			url: "https://www.wps.cn/learning/course/detail/id/340.html?chan=pc_kdocs_function"
		}],
		functionParameter: {
			number: {
				name: "número",
				detail: "El valor convertido a una cadena china."
			},
			type: {
				name: "tipo",
				detail: "El tipo del resultado devuelto. \n1. Minúsculas chinas \n2. Mayúsculas chinas \n3. Caracteres chinos para lectura y escritura"
			}
		}
	},
	NUMBERVALUE: {
		description: "Convierte texto a número de una manera independiente de la configuración regional",
		abstract: "Convierte texto a número de una manera independiente de la configuración regional",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/numbervalue-function"
		}],
		functionParameter: {
			text: {
				name: "texto",
				detail: "El texto a convertir en número."
			},
			decimalSeparator: {
				name: "separador_decimal",
				detail: "El carácter utilizado para separar la parte entera y la fraccionaria del resultado."
			},
			groupSeparator: {
				name: "separador_de_grupo",
				detail: "El carácter utilizado para separar agrupaciones de números."
			}
		}
	},
	PHONETIC: {
		description: "Extrae los caracteres fonéticos (furigana) de una cadena de texto",
		abstract: "Extrae los caracteres fonéticos (furigana) de una cadena de texto",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/phonetic-function"
		}],
		functionParameter: { reference: {
			name: "Referencia",
			detail: "Texto, rango o referencia que contiene el texto fonético que desea extraer."
		} }
	},
	PROPER: {
		description: "Pone en mayúscula la primera letra de cada palabra de un valor de texto",
		abstract: "Pone en mayúscula la primera letra de cada palabra de un valor de texto",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/proper-function"
		}],
		functionParameter: { text: {
			name: "texto",
			detail: "Texto entre comillas, una fórmula que devuelve texto o una referencia a una celda que contiene el texto que desea capitalizar parcialmente."
		} }
	},
	REGEXEXTRACT: {
		description: "Extrae las primeras cadenas secundarias que coincidan con una expresión regular.",
		abstract: "Extrae las primeras cadenas secundarias que coincidan con una expresión regular.",
		links: [{
			title: "Instrucciones",
			url: "https://support.google.com/docs/answer/3098244?hl=es"
		}],
		functionParameter: {
			text: {
				name: "texto",
				detail: "Nota: El ejemplo anterior devolverá dos columnas de datos, \"extraer\" en la primera y \"valores\" en la segunda."
			},
			regularExpression: {
				name: "expresión_regular",
				detail: "Se devolverá la primera parte del texto que coincida con esta expresión."
			}
		}
	},
	REGEXMATCH: {
		description: "Indica si parte de un texto coincide con una expresión regular.",
		abstract: "Indica si parte de un texto coincide con una expresión regular.",
		links: [{
			title: "Instrucciones",
			url: "https://support.google.com/docs/answer/3098292?hl=es"
		}],
		functionParameter: {
			text: {
				name: "texto",
				detail: "texto que se va a comprobar con la expresión regular."
			},
			regularExpression: {
				name: "expresión_regular",
				detail: "expresión regular que se va a usar para comprobar el texto."
			}
		}
	},
	REGEXREPLACE: {
		description: "Sustituye parte de una cadena de texto por otra cadena mediante expresiones regulares.",
		abstract: "Sustituye parte de una cadena de texto por otra cadena mediante expresiones regulares.",
		links: [{
			title: "Instrucciones",
			url: "https://support.google.com/docs/answer/3098245?hl=es"
		}],
		functionParameter: {
			text: {
				name: "texto",
				detail: "texto del que se va a sustituir una parte."
			},
			regularExpression: {
				name: "expresión_regular",
				detail: "la expresión regular. Se sustituirán todas las instancias que coincidan con texto ."
			},
			replacement: {
				name: "reemplazo",
				detail: "texto que se insertará en el texto original."
			}
		}
	},
	REPLACE: {
		description: "Reemplaza caracteres dentro del texto",
		abstract: "Reemplaza caracteres dentro del texto",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/replace-function"
		}],
		functionParameter: {
			oldText: {
				name: "texto_antiguo",
				detail: "Texto en el que desea reemplazar algunos caracteres."
			},
			startNum: {
				name: "núm_inicial",
				detail: "La posición del carácter en texto_antiguo que desea reemplazar con texto_nuevo."
			},
			numChars: {
				name: "núm_de_caracteres",
				detail: "El número de caracteres en texto_antiguo que desea que REEMPLAZAR reemplace con texto_nuevo."
			},
			newText: {
				name: "texto_nuevo",
				detail: "El texto que reemplazará los caracteres en texto_antiguo."
			}
		}
	},
	REPLACEB: {
		description: "Reemplaza caracteres dentro del texto",
		abstract: "Reemplaza caracteres dentro del texto",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/replace-function"
		}],
		functionParameter: {
			oldText: {
				name: "texto_antiguo",
				detail: "Texto en el que desea reemplazar algunos caracteres."
			},
			startNum: {
				name: "núm_inicial",
				detail: "La posición del carácter en texto_antiguo que desea reemplazar con texto_nuevo."
			},
			numBytes: {
				name: "núm_de_bytes",
				detail: "El número de bytes en texto_antiguo que desea que REEMPLAZARB reemplace con texto_nuevo."
			},
			newText: {
				name: "texto_nuevo",
				detail: "El texto que reemplazará los caracteres en texto_antiguo."
			}
		}
	},
	REPT: {
		description: "Repite el texto un número determinado de veces",
		abstract: "Repite el texto un número determinado de veces",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/rept-function"
		}],
		functionParameter: {
			text: {
				name: "texto",
				detail: "El texto que desea repetir."
			},
			numberTimes: {
				name: "núm_de_veces",
				detail: "Un número positivo que especifica el número de veces que se debe repetir el texto."
			}
		}
	},
	RIGHT: {
		description: "Devuelve los caracteres del final de una cadena de texto",
		abstract: "Devuelve los caracteres del final de una cadena de texto",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/right-function"
		}],
		functionParameter: {
			text: {
				name: "texto",
				detail: "La cadena de texto que contiene los caracteres que desea extraer."
			},
			numChars: {
				name: "núm_de_caracteres",
				detail: "Especifica el número de caracteres que desea que DERECHA extraiga."
			}
		}
	},
	RIGHTB: {
		description: "Devuelve los caracteres del final de una cadena de texto",
		abstract: "Devuelve los caracteres del final de una cadena de texto",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/right-function"
		}],
		functionParameter: {
			text: {
				name: "texto",
				detail: "La cadena de texto que contiene los caracteres que desea extraer."
			},
			numBytes: {
				name: "núm_de_bytes",
				detail: "Especifica el número de caracteres que desea que DERECHAB extraiga, basado en bytes."
			}
		}
	},
	SEARCH: {
		description: "Busca un valor de texto dentro de otro (no distingue mayúsculas y minúsculas)",
		abstract: "Busca un valor de texto dentro de otro (no distingue mayúsculas y minúsculas)",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/search-function"
		}],
		functionParameter: {
			findText: {
				name: "texto_buscado",
				detail: "El texto que desea buscar."
			},
			withinText: {
				name: "dentro_del_texto",
				detail: "El texto que contiene el texto que desea buscar."
			},
			startNum: {
				name: "núm_inicial",
				detail: "Especifica el carácter en el que iniciar la búsqueda. Si omite núm_inicial, se asume que es 1."
			}
		}
	},
	SEARCHB: {
		description: "Busca un valor de texto dentro de otro (no distingue mayúsculas y minúsculas)",
		abstract: "Busca un valor de texto dentro de otro (no distingue mayúsculas y minúsculas)",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/search-function"
		}],
		functionParameter: {
			findText: {
				name: "texto_buscado",
				detail: "El texto que desea buscar."
			},
			withinText: {
				name: "dentro_del_texto",
				detail: "El texto que contiene el texto que desea buscar."
			},
			startNum: {
				name: "núm_inicial",
				detail: "Especifica el carácter en el que iniciar la búsqueda. Si omite núm_inicial, se asume que es 1."
			}
		}
	},
	SUBSTITUTE: {
		description: "Sustituye el texto antiguo por texto nuevo en una cadena de texto",
		abstract: "Sustituye el texto antiguo por texto nuevo en una cadena de texto",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/substitute-function"
		}],
		functionParameter: {
			text: {
				name: "texto",
				detail: "El texto o la referencia a una celda que contiene el texto en el que desea sustituir caracteres."
			},
			oldText: {
				name: "texto_antiguo",
				detail: "El texto que desea reemplazar."
			},
			newText: {
				name: "texto_nuevo",
				detail: "El texto con el que desea reemplazar texto_antiguo."
			},
			instanceNum: {
				name: "núm_de_instancia",
				detail: "Especifica qué ocurrencia de texto_antiguo desea reemplazar con texto_nuevo. Si especifica núm_de_instancia, solo se reemplaza esa instancia de texto_antiguo. De lo contrario, cada ocurrencia de texto_antiguo en texto se cambia por texto_nuevo."
			}
		}
	},
	T: {
		description: "Convierte sus argumentos a texto",
		abstract: "Convierte sus argumentos a texto",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/t-function"
		}],
		functionParameter: { value: {
			name: "valor",
			detail: "El valor que desea probar."
		} }
	},
	TEXT: {
		description: "Da formato a un número y lo convierte en texto",
		abstract: "Da formato a un número y lo convierte en texto",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/text-function"
		}],
		functionParameter: {
			value: {
				name: "valor",
				detail: "Un valor numérico que desea convertir a texto."
			},
			formatText: {
				name: "formato_texto",
				detail: "Una cadena de texto que define el formato que desea aplicar al valor suministrado."
			}
		}
	},
	TEXTAFTER: {
		description: "Devuelve el texto que aparece después de un carácter o cadena dados",
		abstract: "Devuelve el texto que aparece después de un carácter o cadena dados",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/textafter-function"
		}],
		functionParameter: {
			text: {
				name: "texto",
				detail: "El texto en el que está buscando. No se permiten caracteres comodín."
			},
			delimiter: {
				name: "delimitador",
				detail: "El texto que marca el punto después del cual desea extraer."
			},
			instanceNum: {
				name: "núm_de_instancia",
				detail: "La instancia del delimitador después de la cual desea extraer el texto."
			},
			matchMode: {
				name: "modo_de_coincidencia",
				detail: "Determina si la búsqueda de texto distingue entre mayúsculas y minúsculas. El valor predeterminado es sensible a mayúsculas y minúsculas."
			},
			matchEnd: {
				name: "coincidir_final",
				detail: "Trata el final del texto como un delimitador. Por defecto, el texto es una coincidencia exacta."
			},
			ifNotFound: {
				name: "si_no_se_encuentra",
				detail: "Valor devuelto si no se encuentra ninguna coincidencia. Por defecto, se devuelve #N/A."
			}
		}
	},
	TEXTBEFORE: {
		description: "Devuelve el texto que aparece antes de un carácter o cadena dados",
		abstract: "Devuelve el texto que aparece antes de un carácter o cadena dados",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/textbefore-function"
		}],
		functionParameter: {
			text: {
				name: "texto",
				detail: "El texto en el que está buscando. No se permiten caracteres comodín."
			},
			delimiter: {
				name: "delimitador",
				detail: "El texto que marca el punto antes del cual desea extraer."
			},
			instanceNum: {
				name: "núm_de_instancia",
				detail: "La instancia del delimitador antes de la cual desea extraer el texto."
			},
			matchMode: {
				name: "modo_de_coincidencia",
				detail: "Determina si la búsqueda de texto distingue entre mayúsculas y minúsculas. El valor predeterminado es sensible a mayúsculas y minúsculas."
			},
			matchEnd: {
				name: "coincidir_final",
				detail: "Trata el final del texto como un delimitador. Por defecto, el texto es una coincidencia exacta."
			},
			ifNotFound: {
				name: "si_no_se_encuentra",
				detail: "Valor devuelto si no se encuentra ninguna coincidencia. Por defecto, se devuelve #N/A."
			}
		}
	},
	TEXTJOIN: {
		description: "Texto: Combina el texto de múltiples rangos y/o cadenas",
		abstract: "Texto: Combina el texto de múltiples rangos y/o cadenas",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/textjoin-function"
		}],
		functionParameter: {
			delimiter: {
				name: "delimitador",
				detail: "Una cadena de texto, ya sea vacía, o uno o más caracteres entre comillas dobles, o una referencia a una cadena de texto válida."
			},
			ignoreEmpty: {
				name: "ignorar_vacías",
				detail: "Si es VERDADERO, ignora las celdas vacías."
			},
			text1: {
				name: "texto1",
				detail: "Elemento de texto a unir. Una cadena de texto, o una matriz de cadenas, como un rango de celdas."
			},
			text2: {
				name: "texto2",
				detail: "Elementos de texto adicionales a unir. Puede haber un máximo de 252 argumentos de texto para los elementos de texto, incluido texto1. Cada uno puede ser una cadena de texto, o una matriz de cadenas, como un rango de celdas."
			}
		}
	},
	TEXTSPLIT: {
		description: "Divide cadenas de texto usando delimitadores de columna y fila",
		abstract: "Divide cadenas de texto usando delimitadores de columna y fila",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/textsplit-function"
		}],
		functionParameter: {
			text: {
				name: "texto",
				detail: "El texto a dividir."
			},
			colDelimiter: {
				name: "delimitador_col",
				detail: "El carácter o cadena por el cual dividir la columna."
			},
			rowDelimiter: {
				name: "delimitador_fila",
				detail: "El carácter o cadena en el que dividir la línea."
			},
			ignoreEmpty: {
				name: "ignorar_vacías",
				detail: "Si se deben ignorar las celdas vacías. El valor predeterminado es FALSO."
			},
			matchMode: {
				name: "modo_de_coincidencia",
				detail: "Busca una coincidencia de delimitador en el texto. Por defecto, se realiza una coincidencia sensible a mayúsculas y minúsculas."
			},
			padWith: {
				name: "rellenar_con",
				detail: "El valor a usar para el relleno. Por defecto, se usa #N/A."
			}
		}
	},
	TRIM: {
		description: "Elimina todos los espacios del texto excepto los espacios individuales entre palabras.",
		abstract: "Elimina espacios del texto",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/trim-function"
		}],
		functionParameter: { text: {
			name: "texto",
			detail: "El texto del que desea eliminar los espacios."
		} }
	},
	UNICHAR: {
		description: "Devuelve el carácter Unicode al que hace referencia el valor numérico dado",
		abstract: "Devuelve el carácter Unicode al que hace referencia el valor numérico dado",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/unichar-function"
		}],
		functionParameter: { number: {
			name: "número",
			detail: "Número es el número Unicode que representa el carácter."
		} }
	},
	UNICODE: {
		description: "Devuelve el número (punto de código) que corresponde al primer carácter del texto",
		abstract: "Devuelve el número (punto de código) que corresponde al primer carácter del texto",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/unicode-function"
		}],
		functionParameter: { text: {
			name: "texto",
			detail: "Texto es el carácter del que desea el valor Unicode."
		} }
	},
	UPPER: {
		description: "Convierte el texto a mayúsculas",
		abstract: "Convierte el texto a mayúsculas",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/upper-function"
		}],
		functionParameter: { text: {
			name: "texto",
			detail: "El texto que desea convertir a mayúsculas."
		} }
	},
	VALUE: {
		description: "Convierte un argumento de texto a un número",
		abstract: "Convierte un argumento de texto a un número",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/value-function"
		}],
		functionParameter: { text: {
			name: "texto",
			detail: "El texto entre comillas o una referencia a una celda que contiene el texto que desea convertir."
		} }
	},
	VALUETOTEXT: {
		description: "Devuelve texto desde cualquier valor especificado",
		abstract: "Devuelve texto desde cualquier valor especificado",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/valuetotext-function"
		}],
		functionParameter: {
			value: {
				name: "valor",
				detail: "El valor a devolver como texto."
			},
			format: {
				name: "formato",
				detail: "El formato de los datos devueltos. Puede ser uno de dos valores: \n0 Predeterminado. Formato conciso y fácil de leer. \n1 Formato estricto que incluye caracteres de escape y delimitadores de fila. Genera una cadena que se puede analizar al introducirla en la barra de fórmulas. Encapsula las cadenas devueltas entre comillas, excepto para valores booleanos, números y errores."
			}
		}
	},
	CALL: {
		description: "Llama a un procedimiento en una biblioteca de vínculos dinámicos o recurso de código",
		abstract: "Llama a un procedimiento en una biblioteca de vínculos dinámicos o recurso de código",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/call-function"
		}],
		functionParameter: {
			moduleText: {
				name: "Texto del módulo",
				detail: "Nombre de la biblioteca de vínculos dinámicos (DLL) que contiene el procedimiento."
			},
			procedure: {
				name: "Procedimiento",
				detail: "Nombre o número ordinal del procedimiento de la DLL."
			},
			typeText: {
				name: "Texto del tipo",
				detail: "Texto que especifica los tipos de datos de los argumentos y del valor devuelto."
			},
			argument1: {
				name: "Argumento 1",
				detail: "Opcional. Primer argumento que se pasa al procedimiento."
			}
		}
	},
	EUROCONVERT: {
		description: "Convierte un número a euros, convierte un número de euros a una moneda de un miembro del euro, o convierte un número de una moneda de un miembro del euro a otra usando el euro como intermediario (triangulación)",
		abstract: "Convierte un número a euros, convierte un número de euros a una moneda de un miembro del euro, o convierte un número de una moneda de un miembro del euro a otra usando el euro como intermediario (triangulación)",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/euroconvert-function"
		}],
		functionParameter: {
			number: {
				name: "Número",
				detail: "Valor de moneda que se va a convertir."
			},
			source: {
				name: "Origen",
				detail: "Código de la moneda de origen."
			},
			target: {
				name: "Destino",
				detail: "Código de la moneda de destino."
			},
			fullPrecision: {
				name: "Precisión completa",
				detail: "Valor lógico que controla el redondeo según las reglas específicas de la moneda."
			},
			triangulationPrecision: {
				name: "Precisión de triangulación",
				detail: "Opcional. Número de dígitos significativos de la conversión intermedia a euros."
			}
		}
	},
	REGISTER_ID: {
		description: "Devuelve el ID de registro de la biblioteca de vínculos dinámicos (DLL) especificada o del recurso de código que se ha registrado previamente",
		abstract: "Devuelve el ID de registro de la biblioteca de vínculos dinámicos (DLL) especificada o del recurso de código que se ha registrado previamente",
		links: [{
			title: "Instrucciones",
			url: "https://support.microsoft.com/es-es/excel/functions/register-id-function"
		}],
		functionParameter: {
			moduleText: {
				name: "Texto del módulo",
				detail: "Nombre de la DLL o del recurso de código que contiene el procedimiento."
			},
			procedure: {
				name: "Procedimiento",
				detail: "Nombre o número ordinal del procedimiento."
			},
			typeText: {
				name: "Texto del tipo",
				detail: "Opcional. Texto que especifica los tipos de datos de los argumentos y del valor devuelto."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/univer/es-ES.ts
const locale$2 = {};

//#endregion
//#region src/locale/function-list/web/es-ES.ts
const locale$1 = {
	ENCODEURL: {
		description: "La función URLCODIF devuelve una cadena con codificación URL que reemplaza ciertos caracteres no alfanuméricos por el símbolo de porcentaje (%) y un número hexadecimal.",
		abstract: "La función URLCODIF devuelve una cadena con codificación URL que reemplaza ciertos caracteres no alfanuméricos por el símbolo de porcentaje (%) y un número hexadecimal.",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/encodeurl-function"
		}],
		functionParameter: { text: {
			name: "texto",
			detail: "Una cadena a la que se va a codificar la dirección URL"
		} }
	},
	FILTERXML: {
		description: "La función XMLFILTRO devuelve datos específicos del contenido XML mediante la ruta x especificada.",
		abstract: "La función XMLFILTRO devuelve datos específicos del contenido XML mediante la ruta x especificada.",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/filterxml-function"
		}],
		functionParameter: {
			xml: {
				name: "xml",
				detail: "Una cadena en formato XML válido."
			},
			xpath: {
				name: "xpath",
				detail: "Una cadena con formato XPath estándar."
			}
		}
	},
	WEBSERVICE: {
		description: "La función SERVICIOWEB devuelve datos de un servicio web en Internet o en la Intranet.",
		abstract: "La función SERVICIOWEB devuelve datos de un servicio web en Internet o en la Intranet.",
		links: [{
			title: "Instrucción",
			url: "https://support.microsoft.com/es-es/excel/functions/webservice-function"
		}],
		functionParameter: { url: {
			name: "url",
			detail: "La dirección URL del servicio web."
		} }
	}
};

//#endregion
//#region src/locale/es-ES.ts
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