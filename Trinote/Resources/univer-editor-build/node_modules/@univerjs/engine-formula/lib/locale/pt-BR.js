//#region src/locale/function-list/array/pt-BR.ts
const locale$15 = {
	ARRAY_CONSTRAIN: {
		description: "Restringe o resultado de uma matriz ao tamanho especificado.",
		abstract: "Restringe o resultado de uma matriz ao tamanho especificado.",
		links: [{
			title: "Instruções",
			url: "https://support.google.com/docs/answer/3267036?hl=pt-BR"
		}],
		functionParameter: {
			inputRange: {
				name: "intervalo_de_entrada",
				detail: "O intervalo a ser restringido."
			},
			numRows: {
				name: "número_de_linhas",
				detail: "O número de linhas que o resultado deve conter."
			},
			numCols: {
				name: "número_de_colunas",
				detail: "O número de colunas que o resultado deve conter."
			}
		}
	},
	FLATTEN: {
		description: "Reúne todos os valores de um ou mais intervalos em uma única coluna.",
		abstract: "Reúne todos os valores de um ou mais intervalos em uma única coluna.",
		links: [{
			title: "Instruções",
			url: "https://support.google.com/docs/answer/10307761?hl=pt-BR"
		}],
		functionParameter: {
			range1: {
				name: "intervalo1",
				detail: "O primeiro intervalo a ser reunido."
			},
			range2: {
				name: "intervalo2",
				detail: "[opcional, repetível] Outros intervalos a serem reunidos."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/compatibility/pt-BR.ts
const locale$14 = {
	BETADIST: {
		description: "Retorna a função de densidade de probabilidade beta cumulativa. A distribuição beta geralmente é usada para estudar a variação na porcentagem de determinado valor em amostras, como a fração do dia que as pessoas passam assistindo televisão.",
		abstract: "Retorna a função de densidade de probabilidade beta cumulativa. A distribuição beta geralmente é usada para estudar a variação na porcentagem de determinado valor em amostras, como a fração do dia que as pessoas passam assistindo televisão.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/betadist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obrigatório. O valor entre A e B no qual se avalia a função."
			},
			alpha: {
				name: "alpha",
				detail: "Obrigatório. Um parâmetro da distribuição."
			},
			beta: {
				name: "beta",
				detail: "Obrigatório. Um parâmetro da distribuição."
			},
			A: {
				name: "A",
				detail: "Um limite inferior para o intervalo de x."
			},
			B: {
				name: "B",
				detail: "Opcional. Um limite superior para o intervalo de x."
			}
		}
	},
	BETAINV: {
		description: "Retorna o inverso da função de densidade de probabilidade beta cumulativa para uma distribuição beta especificada. Ou seja, se probabilidade = DISTBETA(x;...), BETA.ACUM.INV(probabilidade;...) = x. A distribuição beta pode ser usada no planejamento do projeto para criar modelos de tempos de conclusão provável de acordo com determinado tempo de conclusão e variabilidade esperados.",
		abstract: "Retorna o inverso da função de densidade de probabilidade beta cumulativa para uma distribuição beta especificada. Ou seja, se probabilidade = DISTBETA(x;...), BETA.ACUM.INV(probabilidade;...) = x. A distribuição beta pode ser usada no planejamento do projeto para criar modelos de tempos de conclusão provável de acordo com determinado tempo de conclusão e variabilidade esperados.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/betainv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Necessário. Uma probabilidade associada à distribuição beta."
			},
			alpha: {
				name: "alpha",
				detail: "Necessário. Um parâmetro da distribuição."
			},
			beta: {
				name: "beta",
				detail: "Necessário. Um parâmetro da distribuição."
			},
			A: {
				name: "A",
				detail: "Opcional. Um limite inferior para o intervalo de x."
			},
			B: {
				name: "B",
				detail: "Opcional. Um limite superior para o intervalo de x."
			}
		}
	},
	BINOMDIST: {
		description: "Retorna a probabilidade de distribuição binomial do termo individual. Use DISTRBINOM em problemas com um número fixo de testes ou tentativas, quando os resultados de determinada tentativa forem apenas sucesso ou fracasso, quando as tentativas forem independentes e quando a probabilidade de sucesso for constante durante toda a experiência. Por exemplo, DISTRBINOM pode calcular a probabilidade de que dois dos próximos três bebês sejam meninos.",
		abstract: "Retorna a probabilidade de distribuição binomial do termo individual. Use DISTRBINOM em problemas com um número fixo de testes ou tentativas, quando os resultados de determinada tentativa forem apenas sucesso ou fracasso, quando as tentativas forem independentes e quando a probabilidade de sucesso for constante durante toda a experiência. Por exemplo, DISTRBINOM pode calcular a probabilidade de que dois dos próximos três bebês sejam meninos.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/binomdist-function"
		}],
		functionParameter: {
			numberS: {
				name: "number_s",
				detail: "Obrigatório. O número de tentativas bem-sucedidas."
			},
			trials: {
				name: "trials",
				detail: "Obrigatório. O número de tentativas independentes."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Obrigatório. A probabilidade de sucesso em cada tentativa."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obrigatório. Um valor lógico que determina a forma da função. Se cumulativo for VERDADEIRO, DISTRBINOM retornará a função de distribuição cumulativa, que é a probabilidade de que exista no máximo núm_s sucessos; se for FALSO, retornará a função massa de probabilidade, que é a probabilidade de que exista núm_s sucessos."
			}
		}
	},
	CHIDIST: {
		description: "Retorna a probabilidade de cauda direita da distribuição qui-quadrada. A distribuição χ2 está associada ao teste χ2. Use o teste χ2 para comparar os valores observados e os esperados. Por exemplo, uma experiência genética pode gerar a hipótese de que a próxima geração de plantas exibirá determinado conjunto de cores. Comparando os resultados observados com os esperados, você poderá decidir se a hipótese original é válida.",
		abstract: "Retorna a probabilidade de cauda direita da distribuição qui-quadrada. A distribuição χ2 está associada ao teste χ2. Use o teste χ2 para comparar os valores observados e os esperados. Por exemplo, uma experiência genética pode gerar a hipótese de que a próxima geração de plantas exibirá determinado conjunto de cores. Comparando os resultados observados com os esperados, você poderá decidir se a hipótese original é válida.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/chidist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obrigatório. O valor no qual a distribuição será avaliada."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Obrigatório. O número de graus de liberdade."
			}
		}
	},
	CHIINV: {
		description: "Retorna o inverso da probabilidade de cauda direita da distribuição qui-quadrada. Se probabilidade = CHIDIST(x,...), em seguida, CHIINV(probabilidade,...) = x. Use esta função para comparar os resultados observados com os esperados para decidir se a sua hipótese original é válida.",
		abstract: "Retorna o inverso da probabilidade de cauda direita da distribuição qui-quadrada. Se probabilidade = CHIDIST(x,...), em seguida, CHIINV(probabilidade,...) = x. Use esta função para comparar os resultados observados com os esperados para decidir se a sua hipótese original é válida.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/chiinv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Necessário. Uma probabilidade associada à distribuição qui-quadrada."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Necessário. O número de graus de liberdade."
			}
		}
	},
	CHITEST: {
		description: "Retorna o teste para independência. TESTE.QUI retorna o valor da distribuição qui-quadrada (χ2) para a estatística e os graus apropriados de liberdade. Você pode usar os testes χ2 para determinar se os resultados hipotéticos são verificados por uma experiência.",
		abstract: "Retorna o teste para independência. TESTE.QUI retorna o valor da distribuição qui-quadrada (χ2) para a estatística e os graus apropriados de liberdade. Você pode usar os testes χ2 para determinar se os resultados hipotéticos são verificados por uma experiência.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/chitest-function"
		}],
		functionParameter: {
			actualRange: {
				name: "actual_range",
				detail: "Obrigatório. O intervalo de dados que contém observações a serem comparadas com os valores esperados."
			},
			expectedRange: {
				name: "expected_range",
				detail: "Obrigatório. O intervalo de dados que contém a razão entre o produto dos totais de linhas e dos totais de colunas e o total geral."
			}
		}
	},
	CONFIDENCE: {
		description: "Retorna o intervalo de confiança para uma média da população, usando uma distribuição normal.",
		abstract: "Retorna o intervalo de confiança para uma média da população, usando uma distribuição normal.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/confidence-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "Obrigatório. O nível de significância usado para calcular o nível de confiança. O nível de confiança é igual a 100*(1 - alfa)% ou, em outras palavras, um alfa de 0,05 indica um nível de confiança de 95%."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Obrigatório. O desvio-padrão da população para o intervalo de dados e é assumido como conhecido."
			},
			size: {
				name: "size",
				detail: "Obrigatório. O tamanho da amostra."
			}
		}
	},
	COVAR: {
		description: "Devolve covariância, a média dos produtos de desvios para cada par de pontos de dados em dois conjuntos de dados.",
		abstract: "Devolve covariância, a média dos produtos de desvios para cada par de pontos de dados em dois conjuntos de dados.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/covar-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Obrigatório. O primeiro intervalo de células de inteiros."
			},
			array2: {
				name: "array2",
				detail: "Obrigatório. O segundo intervalo de células de inteiros."
			}
		}
	},
	CRITBINOM: {
		description: "Retorna o menor valor para o qual a distribuição binomial cumulativa é maior ou igual ao valor padrão. Use esta função para aplicações de garantia de qualidade. Por exemplo, use CRIT.BINOM para determinar o número máximo de peças defeituosas que pode sair de uma linha de montagem sem rejeitar o lote inteiro.",
		abstract: "Retorna o menor valor para o qual a distribuição binomial cumulativa é maior ou igual ao valor padrão. Use esta função para aplicações de garantia de qualidade. Por exemplo, use CRIT.BINOM para determinar o número máximo de peças defeituosas que pode sair de uma linha de montagem sem rejeitar o lote inteiro.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/critbinom-function"
		}],
		functionParameter: {
			trials: {
				name: "trials",
				detail: "Obrigatório. O número de tentativas de Bernoulli."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Obrigatório. A probabilidade de sucesso em cada tentativa."
			},
			alpha: {
				name: "alpha",
				detail: "Obrigatório. O valor padrão."
			}
		}
	},
	EXPONDIST: {
		description: "Retorna a distribuição exponencial. Use DISTEXPON para criar um modelo do tempo entre os eventos, como quanto tempo determinado caixa eletrônico leva para liberar o dinheiro. Por exemplo, você pode usar DISTEXPON para determinar a probabilidade de que o processo leve no máximo um minuto.",
		abstract: "Retorna a distribuição exponencial. Use DISTEXPON para criar um modelo do tempo entre os eventos, como quanto tempo determinado caixa eletrônico leva para liberar o dinheiro. Por exemplo, você pode usar DISTEXPON para determinar a probabilidade de que o processo leve no máximo um minuto.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/expondist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obrigatório. O valor da função."
			},
			lambda: {
				name: "lambda",
				detail: "Obrigatório. O valor do parâmetro."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obrigatório. Um valor lógico que indica a forma da função exponencial a ser fornecida. Se cumulativo for VERDADEIRO, DISTEXPON retornará a função de distribuição cumulativa; se for FALSO, retornará a função de densidade de probabilidade."
			}
		}
	},
	FDIST: {
		description: "Retorna a distribuição de probabilidade F (de cauda direita) (nível de diversidade) para dois conjuntos de dados. Você pode usar esta função para determinar se dois conjuntos de dados têm graus de diversidade diferentes. Por exemplo, é possível examinar os resultados dos testes de homens e mulheres que ingressam no 2º grau e determinar se a variabilidade entre as mulheres é diferente daquela encontrada entre os homens.",
		abstract: "Retorna a distribuição de probabilidade F (de cauda direita) (nível de diversidade) para dois conjuntos de dados. Você pode usar esta função para determinar se dois conjuntos de dados têm graus de diversidade diferentes. Por exemplo, é possível examinar os resultados dos testes de homens e mulheres que ingressam no 2º grau e determinar se a variabilidade entre as mulheres é diferente daquela encontrada entre os homens.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/fdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obrigatório. O valor no qual se avalia a função."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Obrigatório. O grau de liberdade do numerador."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Obrigatório. O grau de liberdade do denominador."
			}
		}
	},
	FINV: {
		description: "Retorna o inverso da distribuição de probabilidades F (de cauda direita). Se p = DISTF(x;...), então INVF(p;...) = x.",
		abstract: "Retorna o inverso da distribuição de probabilidades F (de cauda direita). Se p = DISTF(x;...), então INVF(p;...) = x.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/finv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obrigatório. Uma probabilidade associada à distribuição cumulativa F."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Obrigatório. O grau de liberdade do numerador."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Obrigatório. O grau de liberdade do denominador."
			}
		}
	},
	FTEST: {
		description: "Devolve o resultado de um teste F. Um teste F devolve a probabilidade bicaudal de que as variâncias na matriz1 e na matriz2 não são significativamente diferentes. Use esta função para determinar se duas amostras possuem variações diferentes. Por exemplo, a partir de resultados de testes fornecidos por escolas públicas e particulares, você pode verificar se essas escolas têm diferentes níveis de diversidade da pontuação de teste.",
		abstract: "Devolve o resultado de um teste F. Um teste F devolve a probabilidade bicaudal de que as variâncias na matriz1 e na matriz2 não são significativamente diferentes. Use esta função para determinar se duas amostras possuem variações diferentes. Por exemplo, a partir de resultados de testes fornecidos por escolas públicas e particulares, você pode verificar se essas escolas têm diferentes níveis de diversidade da pontuação de teste.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/ftest-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Obrigatório. A primeira matriz ou intervalo de dados."
			},
			array2: {
				name: "array2",
				detail: "Obrigatório. A segunda matriz ou intervalo de dados."
			}
		}
	},
	GAMMADIST: {
		description: "Retorna a distribuição gama. Você pode usar esta função para estudar variáveis que possam apresentar uma distribuição enviesada. A distribuição gama é comumente utilizada em análise de filas.",
		abstract: "Retorna a distribuição gama. Você pode usar esta função para estudar variáveis que possam apresentar uma distribuição enviesada. A distribuição gama é comumente utilizada em análise de filas.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/gammadist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obrigatório. O valor no qual a distribuição será avaliada."
			},
			alpha: {
				name: "alpha",
				detail: "Obrigatório. Um parâmetro da distribuição."
			},
			beta: {
				name: "beta",
				detail: "(em inglês) Obrigatório. Um parâmetro da distribuição. Se beta = 1, DISTGAMA retorna a distribuição gama padrão."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obrigatório. Um valor lógico que determina a forma da função. Se cumulativo for VERDADEIRO, DISTGAMA retornará a função de distribuição cumulativa; se for FALSO, retornará a função de densidade de probabilidade."
			}
		}
	},
	GAMMAINV: {
		description: "Retorna o inverso da distribuição cumulativa gama. Se p = DISTGAMA(x;...), então INVGAMA(p;...) = x. Você pode usar essa função para estudar uma variável cuja distribuição pode ser enviesada.",
		abstract: "Retorna o inverso da distribuição cumulativa gama. Se p = DISTGAMA(x;...), então INVGAMA(p;...) = x. Você pode usar essa função para estudar uma variável cuja distribuição pode ser enviesada.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/gammainv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obrigatório. A probabilidade associada à distribuição gama."
			},
			alpha: {
				name: "alpha",
				detail: "Obrigatório. Um parâmetro da distribuição."
			},
			beta: {
				name: "beta",
				detail: "Obrigatório. Um parâmetro da distribuição. Se beta = 1, INVGAMA retornará a distribuição gama padrão."
			}
		}
	},
	HYPGEOMDIST: {
		description: "Retorna a distribuição hipergeométrica. DIST.HIPERGEOM retorna a probabilidade de um determinado número de sucessos de uma amostra, de acordo com o tamanho da amostra, sucessos da população e tamanho da população. Use DIST.HIPERGEOM para problemas com uma população finita, onde cada observação seja equivalente a um sucesso ou a um fracasso, e onde cada subconjunto de um determinado tamanho seja escolhido com igual probabilidade.",
		abstract: "Retorna a distribuição hipergeométrica. DIST.HIPERGEOM retorna a probabilidade de um determinado número de sucessos de uma amostra, de acordo com o tamanho da amostra, sucessos da população e tamanho da população. Use DIST.HIPERGEOM para problemas com uma população finita, onde cada observação seja equivalente a um sucesso ou a um fracasso, e onde cada subconjunto de um determinado tamanho seja escolhido com igual probabilidade.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/hypgeomdist-function"
		}],
		functionParameter: {
			sampleS: {
				name: "sample_s",
				detail: "Necessário. O número de sucessos em uma amostra."
			},
			numberSample: {
				name: "number_sample",
				detail: "Necessário. O tamanho da amostra."
			},
			populationS: {
				name: "population_s",
				detail: "Necessário. O número de sucessos na população."
			},
			numberPop: {
				name: "number_pop",
				detail: "Necessário. O tamanho da população."
			}
		}
	},
	LOGINV: {
		description: "Retorna o inverso da função de distribuição cumulativa lognormal de x, em que ln(x) normalmente é distribuída com os parâmetros média e desv_padrão. Se p = DIST.LOGNORMAL(x;...) então INVLOG(p;...) = x.",
		abstract: "Retorna o inverso da função de distribuição cumulativa lognormal de x, em que ln(x) normalmente é distribuída com os parâmetros média e desv_padrão. Se p = DIST.LOGNORMAL(x;...) então INVLOG(p;...) = x.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/loginv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Necessário. Uma probabilidade associada à distribuição lognormal."
			},
			mean: {
				name: "mean",
				detail: "Necessário. A média do ln(x)."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Necessário. O desvio padrão do ln(x)."
			}
		}
	},
	LOGNORMDIST: {
		description: "Retorna a distribuição log-normal de x, onde ln (x) costuma ser distribuído com média de parâmetros e desv_padrão. Use esta função para analisar os dados que forem transformados através de logaritmos.",
		abstract: "Retorna a distribuição log-normal de x, onde ln (x) costuma ser distribuído com média de parâmetros e desv_padrão. Use esta função para analisar os dados que forem transformados através de logaritmos.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/lognormdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obrigatório. O valor no qual se avalia a função."
			},
			mean: {
				name: "mean",
				detail: "Necessário. A média do ln(x)."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Necessário. O desvio padrão do ln(x)."
			}
		}
	},
	MODE: {
		description: "Digamos que quer descobrir o número mais comum de espécies de aves avistadas numa amostra de contagem de aves numa zona húmida crítica durante um período de 30 anos, ou quer descobrir o número mais frequente de chamadas telefónicas num centro de suporte telefónico durante as horas de ponta. Para calcular o modo de um grupo de números, utilize a função MODE .",
		abstract: "Digamos que quer descobrir o número mais comum de espécies de aves avistadas numa amostra de contagem de aves numa zona húmida crítica durante um período de 30 anos, ou quer descobrir o número mais frequente de chamadas telefónicas num centro de suporte telefónico durante as horas de ponta. Para calcular o modo de um grupo de números, utilize a função MODE .",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/mode-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obrigatório. O primeiro argumento de número cujo modo você deseja calcular."
			},
			number2: {
				name: "number2",
				detail: "Opcional. Argumentos de número de 2 a 255 para os quais você deseja calcular o modo. Você também pode usar uma única matriz ou referência a uma matriz em vez de argumentos separados por ponto-e-vírgulas."
			}
		}
	},
	NEGBINOMDIST: {
		description: "Retorna a distribuição binomial negativa. DIST.BIN.NEG retorna a probabilidade de ocorrer núm_f fracassos antes de núm_s-ésimo sucesso, quando a probabilidade constante de um sucesso é probabilidade_s. Esta função é semelhante à distribuição binomial, exceto pelo fato de que o número de sucessos é fixo e o numero de tentativas é variável. Como ocorre na distribuição binomial, as tentativas são consideradas independentes.",
		abstract: "Retorna a distribuição binomial negativa. DIST.BIN.NEG retorna a probabilidade de ocorrer núm_f fracassos antes de núm_s-ésimo sucesso, quando a probabilidade constante de um sucesso é probabilidade_s. Esta função é semelhante à distribuição binomial, exceto pelo fato de que o número de sucessos é fixo e o numero de tentativas é variável. Como ocorre na distribuição binomial, as tentativas são consideradas independentes.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/negbinomdist-function"
		}],
		functionParameter: {
			numberF: {
				name: "number_f",
				detail: "Necessário. O número de insucessos."
			},
			numberS: {
				name: "number_s",
				detail: "Necessário. O número a partir do qual se considera haver sucesso."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Necessário. A probabilidade de sucesso."
			}
		}
	},
	NORMDIST: {
		description: "A função NORMDIST retorna a distribuição normal para a média especificada e o desvio padrão. Essa função tem uma ampla gama de aplicativos em estatísticas, incluindo testes de hipótese.",
		abstract: "A função NORMDIST retorna a distribuição normal para a média especificada e o desvio padrão. Essa função tem uma ampla gama de aplicativos em estatísticas, incluindo testes de hipótese.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/normdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obrigatório. O valor para o qual você deseja a distribuição"
			},
			mean: {
				name: "mean",
				detail: "Necessário. A média aritmética da distribuição"
			},
			standardDev: {
				name: "standard_dev",
				detail: "Necessário. O desvio padrão da distribuição"
			},
			cumulative: {
				name: "cumulative",
				detail: "Necessário. Um valor lógico que determina a forma da função. Se cumulativo for TRUE, NORMDIST retornará a função de distribuição cumulativa; se cumulativo for FALSE, ele retornará a função de massa de probabilidade."
			}
		}
	},
	NORMINV: {
		description: "Retorna o inverso da distribuição cumulativa normal para a média específica e o desvio padrão.",
		abstract: "Retorna o inverso da distribuição cumulativa normal para a média específica e o desvio padrão.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/norminv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obrigatório. Uma probabilidade correspondente à distribuição normal."
			},
			mean: {
				name: "mean",
				detail: "Obrigatório. A média aritmética da distribuição."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Obrigatório. O desvio padrão da distribuição."
			}
		}
	},
	NORMSDIST: {
		description: "Retorna a função da distribuição cumulativa normal padrão. A distribuição possui uma média igual a zero e um desvio padrão igual a um. Use esta função no lugar de uma tabela de áreas de curva normal padrão.",
		abstract: "Retorna a função da distribuição cumulativa normal padrão. A distribuição possui uma média igual a zero e um desvio padrão igual a um. Use esta função no lugar de uma tabela de áreas de curva normal padrão.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/normsdist-function"
		}],
		functionParameter: { z: {
			name: "z",
			detail: "Obrigatório. O valor cuja distribuição você deseja obter."
		} }
	},
	NORMSINV: {
		description: "Retorna o inverso da distribuição cumulativa normal padrão. A distribuição possui uma média igual a zero e um desvio padrão igual a um.",
		abstract: "Retorna o inverso da distribuição cumulativa normal padrão. A distribuição possui uma média igual a zero e um desvio padrão igual a um.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/normsinv-function"
		}],
		functionParameter: { probability: {
			name: "probability",
			detail: "Obrigatório. Uma probabilidade correspondente à distribuição normal."
		} }
	},
	PERCENTILE: {
		description: "Retorna o k-ésimo percentil de valores em um intervalo. Você pode usar esta função para estabelecer um limite de aceitação. Por exemplo, você pode decidir examinar candidatos com pontuação acima do 90º percentil.",
		abstract: "Retorna o k-ésimo percentil de valores em um intervalo. Você pode usar esta função para estabelecer um limite de aceitação. Por exemplo, você pode decidir examinar candidatos com pontuação acima do 90º percentil.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/percentile-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Necessário. A matriz ou intervalo de dados que define a posição relativa."
			},
			k: {
				name: "k",
				detail: "Obrigatório. O valor do percentil no intervalo 0..1, inclusivo."
			}
		}
	},
	PERCENTRANK: {
		description: "A função PERCENTRANK retorna a classificação de um valor em um conjunto de dados como uma porcentagem do conjunto de dados -- essencialmente, a posição relativa de um valor dentro de todo o conjunto de dados. Por exemplo, você pode usar PERCENTRANK para determinar a posição da pontuação de teste de um indivíduo entre o campo de todas as pontuações para o mesmo teste.",
		abstract: "A função PERCENTRANK retorna a classificação de um valor em um conjunto de dados como uma porcentagem do conjunto de dados -- essencialmente, a posição relativa de um valor dentro de todo o conjunto de dados. Por exemplo, você pode usar PERCENTRANK para determinar a posição da pontuação de teste de um indivíduo entre o campo de todas as pontuações para o mesmo teste.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/percentrank-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Necessário. O intervalo de dados (ou matriz pré-definida) de valores numéricos dentro dos quais a classificação percentual é determinada."
			},
			x: {
				name: "x",
				detail: "Obrigatório. O valor para o qual você deseja saber a classificação dentro da matriz."
			},
			significance: {
				name: "significance",
				detail: "Opcional. Um valor opcional que identifica o número de dígitos significativos para o valor de porcentagem retornado. Se omitido, ORDEM.PORCENTUAL usará três dígitos (0,xxx)."
			}
		}
	},
	POISSON: {
		description: "Retorna a distribuição Poisson. Uma aplicação comum da distribuição Poisson é prever o número de eventos em um determinado período de tempo, como o número de carros que chega ao ponto de pedágio em um minuto.",
		abstract: "Retorna a distribuição Poisson. Uma aplicação comum da distribuição Poisson é prever o número de eventos em um determinado período de tempo, como o número de carros que chega ao ponto de pedágio em um minuto.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/poisson-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obrigatório. O número de eventos."
			},
			mean: {
				name: "mean",
				detail: "Obrigatório. O valor numérico esperado."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obrigatório. Um valor lógico que determina a forma da distribuição de probabilidade fornecida. Se cumulativo for VERDADEIRO, POISSON retornará a probabilidade Poisson de que o número de eventos aleatórios estará entre zero e x inclusive; se FALSO, retornará a função massa da probabilidade Poisson de que o número de eventos será equivalente a x."
			}
		}
	},
	QUARTILE: {
		description: "Retorna o quartil do conjunto de dados. Quartis são comumente usados em dados de vendas e de pesquisas para dividir a população em grupos. Por exemplo, você pode usar QUARTIL para descobrir 25% de maior renda de uma população.",
		abstract: "Retorna o quartil do conjunto de dados. Quartis são comumente usados em dados de vendas e de pesquisas para dividir a população em grupos. Por exemplo, você pode usar QUARTIL para descobrir 25% de maior renda de uma população.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/quartile-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Obrigatório. A matriz ou intervalo de célula de valores numéricos cujo valor quartil você deseja obter."
			},
			quart: {
				name: "quart",
				detail: "Obrigatório. Indica o valor a ser retornado."
			}
		}
	},
	RANK: {
		description: "Retorna a posição de um número em uma lista de números. A ordem de um número é seu tamanho em relação a outros valores de uma lista. (Se você fosse classificar a lista, a ordem do número seria a sua posição.)",
		abstract: "Retorna a posição de um número em uma lista de números. A ordem de um número é seu tamanho em relação a outros valores de uma lista. (Se você fosse classificar a lista, a ordem do número seria a sua posição.)",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/rank-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. O número cuja posição se deseja encontrar."
			},
			ref: {
				name: "ref",
				detail: "Obrigatório. Uma referência a uma lista de números. Valores não numéricos em ref são ignorados."
			},
			order: {
				name: "order",
				detail: "Opcional. Um número que especifica como posicionar um número em uma ordem. Se ordem for 0 ou omitido, o Microsoft Excel ordenará o número como se ref fosse uma lista classificada na ordem descendente. Se ordem for qualquer valor diferente de zero, o Microsoft Excel ordenará o número como se ref fosse uma lista classificada na ordem ascendente."
			}
		}
	},
	STDEV: {
		description: "Estima o desvio padrão com base em uma amostra. O desvio padrão é uma medida do grau de dispersão dos valores em relação ao valor médio (a média).",
		abstract: "Estima o desvio padrão com base em uma amostra. O desvio padrão é uma medida do grau de dispersão dos valores em relação ao valor médio (a média).",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/stdev-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obrigatório. O primeiro argumento numérico correspondente a uma amostra de população."
			},
			number2: {
				name: "number2",
				detail: "Opcional. Argumentos numéricos de 2 a 255 correspondentes a uma amostra de população. Você também pode usar uma única matriz ou uma referência a uma matriz em vez de argumentos separados por ponto-e-vírgula."
			}
		}
	},
	STDEVP: {
		description: "Calcula o desvio padrão com base na população total fornecida como argumentos. O desvio padrão é uma medida do grau de dispersão dos valores em relação ao valor médio (a média).",
		abstract: "Calcula o desvio padrão com base na população total fornecida como argumentos. O desvio padrão é uma medida do grau de dispersão dos valores em relação ao valor médio (a média).",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/stdevp-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Necessário. O primeiro argumento numérico correspondente a uma população."
			},
			number2: {
				name: "number2",
				detail: "Opcional. Argumentos numéricos de 2 a 255 correspondentes a uma população. Você também pode usar uma única matriz ou uma referência a uma matriz em vez de argumentos separados por ponto-e-vírgula."
			}
		}
	},
	TDIST: {
		description: "Retorna os pontos percentuais (probabilidade) para a distribuição t de Student, onde o valor numérico (x) é um valor calculado de t para o qual os pontos percentuais devem ser computados. A distribuição t é usada no teste de hipóteses de pequenos conjuntos de dados de amostras. Use esta função em vez de uma tabela de valores críticos para a distribuição t.",
		abstract: "Retorna os pontos percentuais (probabilidade) para a distribuição t de Student, onde o valor numérico (x) é um valor calculado de t para o qual os pontos percentuais devem ser computados. A distribuição t é usada no teste de hipóteses de pequenos conjuntos de dados de amostras. Use esta função em vez de uma tabela de valores críticos para a distribuição t.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/tdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obrigatório. O valor numérico em que se avalia a distribuição."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Necessário. Um número inteiro indicando o número de graus de liberdade."
			},
			tails: {
				name: "tails",
				detail: "Necessário. Especifica o número de caudas da distribuição a ser retornado. Se Caudas = 1, DISTT retornará a distribuição unicaudal. Se Caudas = 2, DISTT retornará a distribuição bicaudal."
			}
		}
	},
	TINV: {
		description: "Retorna o inverso bicaudal da distribuição t de Student",
		abstract: "Retorna o inverso bicaudal da distribuição t de Student",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/tinv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obrigatório. A probabilidade associada à distribuição t de Student bicaudal."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Obrigatório. O número de graus de liberdade que caracteriza a distribuição."
			}
		}
	},
	TTEST: {
		description: "Retorna a probabilidade associada ao teste t de Student. Use TESTET para determinar se duas amostras poderão ser provenientes de duas populações subjacentes que possuem a mesma média.",
		abstract: "Retorna a probabilidade associada ao teste t de Student. Use TESTET para determinar se duas amostras poderão ser provenientes de duas populações subjacentes que possuem a mesma média.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/ttest-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Obrigatório. O primeiro conjunto de dados."
			},
			array2: {
				name: "array2",
				detail: "Obrigatório. O segundo conjunto de dados."
			},
			tails: {
				name: "tails",
				detail: "Obrigatório. Especifica o número de caudas da distribuição. Se caudas = 1, TESTET usará a distribuição unicaudal. Se caudas = 2, TESTET usará a distribuição bicaudal."
			},
			type: {
				name: "type",
				detail: "Obrigatório. O tipo de Teste t a ser executado."
			}
		}
	},
	VAR: {
		description: "Estima a variação com base em uma amostra.",
		abstract: "Estima a variação com base em uma amostra.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/var-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obrigatório. O primeiro argumento numérico correspondente a uma amostra de população."
			},
			number2: {
				name: "number2",
				detail: "Opcional. Argumentos numéricos de 2 a 255 correspondentes a uma amostra de população."
			}
		}
	},
	VARP: {
		description: "Calcula a variação com base na população inteira.",
		abstract: "Calcula a variação com base na população inteira.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/varp-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obrigatório. O primeiro argumento numérico correspondente a uma população."
			},
			number2: {
				name: "number2",
				detail: "Opcional. Argumentos numéricos de 2 a 255 correspondentes a uma população."
			}
		}
	},
	WEIBULL: {
		description: "Retorna a distribuição Weibull. Use esta distribuição na análise de confiabilidade, como no cálculo do tempo médio de falha para determinado dispositivo.",
		abstract: "Retorna a distribuição Weibull. Use esta distribuição na análise de confiabilidade, como no cálculo do tempo médio de falha para determinado dispositivo.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/weibull-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obrigatório. O valor no qual se avalia a função."
			},
			alpha: {
				name: "alpha",
				detail: "Obrigatório. Um parâmetro da distribuição."
			},
			beta: {
				name: "beta",
				detail: "(em inglês) Obrigatório. Um parâmetro da distribuição."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obrigatório. Determina a forma da função."
			}
		}
	},
	ZTEST: {
		description: "Retorna o valor de probabilidade uni-caudal de um teste-z. Para uma média de população hipotética, μ0, TESTEZ retorna a probabilidade de que a média da população seja maior que a média de observações no conjunto de dados (matriz) — ou seja, a média da amostra observada.",
		abstract: "Retorna o valor de probabilidade uni-caudal de um teste-z. Para uma média de população hipotética, μ0, TESTEZ retorna a probabilidade de que a média da população seja maior que a média de observações no conjunto de dados (matriz) — ou seja, a média da amostra observada.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/ztest-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Obrigatório. A matriz ou o intervalo de dados em que x será testado."
			},
			x: {
				name: "x",
				detail: "Obrigatório. O valor a ser testado."
			},
			sigma: {
				name: "sigma",
				detail: "Opcional. O desvio padrão da população (conhecido). Quando não especificado, o desvio padrão de amostra será usado."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/cube/pt-BR.ts
const locale$13 = {
	CUBEKPIMEMBER: {
		description: "Retorna a propriedade de um indicador chave de desempenho (KPI) e exibe o nome do KPI na célula. Um KPI é uma medida quantificável, como o lucro bruto mensal ou a rotatividade trimestral de funcionários, usada para monitorar o desempenho de uma organização.",
		abstract: "Retorna a propriedade de um indicador chave de desempenho (KPI) e exibe o nome do KPI na célula. Um KPI é uma medida quantificável, como o lucro bruto mensal ou a rotatividade trimestral de funcionários, usada para monitorar o desempenho de uma organização.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/cubekpimember-function"
		}],
		functionParameter: {
			connection: {
				name: "Conexão",
				detail: "Necessário. Uma cadeia de texto do nome da conexão com o cubo."
			},
			kpiName: {
				name: "Kpi_name",
				detail: "Necessário. Uma cadeia de texto do nome do KPI no cubo."
			},
			kpiProperty: {
				name: "Kpi_property",
				detail: "Necessário. O componente KPI retornado e pode ser uma das seguintes opções:"
			},
			caption: {
				name: "Legenda",
				detail: "Opcional. Uma cadeia de texto alternativa exibida na célula em vez de kpi_name e kpi_property."
			}
		}
	},
	CUBEMEMBER: {
		description: "Retorna um membro ou uma tupla a partir de um cubo. Use para validar a existência do membro ou da tupla no cubo.",
		abstract: "Retorna um membro ou uma tupla a partir de um cubo. Use para validar a existência do membro ou da tupla no cubo.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/cubemember-function"
		}],
		functionParameter: {
			connection: {
				name: "Conexão",
				detail: "Necessário. Uma cadeia de texto do nome da conexão com o cubo."
			},
			memberExpression: {
				name: "Member_expression",
				detail: "Necessário. Uma cadeia de texto de uma expressão multidimensional (MDX) que resulta em um único membro no cubo. De modo alternativo, expressão_membro pode ser uma tupla, especificada como um intervalo de células ou uma constante de matriz."
			},
			caption: {
				name: "Legenda",
				detail: "Opcional. Uma cadeia de texto exibida na célula em vez da legenda do cubo, se uma estiver definida. Quando uma tupla é retornada, a legenda usada é aquela do último membro da tupla."
			}
		}
	},
	CUBEMEMBERPROPERTY: {
		description: "A função PROPRIEDADEMEMBROCUBO , uma das funções Cubo no Excel, devolve o valor de uma propriedade membro de um cubo. Use-a para validar a existência do nome do membro no cubo e para retornar a propriedade especificada para esse membro.",
		abstract: "A função PROPRIEDADEMEMBROCUBO , uma das funções Cubo no Excel, devolve o valor de uma propriedade membro de um cubo. Use-a para validar a existência do nome do membro no cubo e para retornar a propriedade especificada para esse membro.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/cubememberproperty-function"
		}],
		functionParameter: {
			connection: {
				name: "Ligação",
				detail: "Obrigatório. Uma cadeia de texto do nome da conexão com o cubo."
			},
			memberExpression: {
				name: "Member_expression",
				detail: "Obrigatório. Uma cadeia de texto de uma expressão multidimensional (MDX) de um membro no cubo."
			},
			property: {
				name: "Propriedade",
				detail: "Obrigatório. Uma cadeia de texto do nome da propriedade retornado ou uma referência a uma célula que contém o nome da propriedade."
			}
		}
	},
	CUBERANKEDMEMBER: {
		description: "Retorna o enésimo membro, ou o membro ordenado, em um conjunto. Use para retornar um ou mais elementos em um conjunto, assim como o melhor vendedor ou os dez melhores alunos.",
		abstract: "Retorna o enésimo membro, ou o membro ordenado, em um conjunto. Use para retornar um ou mais elementos em um conjunto, assim como o melhor vendedor ou os dez melhores alunos.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/cuberankedmember-function"
		}],
		functionParameter: {
			connection: {
				name: "Ligação",
				detail: "Obrigatório. Uma cadeia de texto do nome da conexão com o cubo."
			},
			setExpression: {
				name: "Set_expression",
				detail: "Obrigatório. Uma cadeia de texto de uma expressão de um conjunto, como \"{[Item1].children}\". Expressão_conjunto também pode ser a função CONJUNTOCUBO ou uma referência a uma célula que contém a função CONJUNTOCUBO."
			},
			rank: {
				name: "Classificação",
				detail: "Obrigatório. Um valor inteiro que especifica o valor superior a retornar. Se a classificação for um valor 1, ela retornará o valor superior, se for um valor 2, retornará o segundo valor mais superior, e assim por diante. Para retornar os cinco valores superiores, use a função MEMBROCLASSIFICADOCUBO cinco vezes, especificando uma classificação diferente, de 1 a 5, por vez."
			},
			caption: {
				name: "Legenda",
				detail: "Opcional. Uma cadeia de texto exibida na célula em vez da legenda do cubo, se uma estiver definida."
			}
		}
	},
	CUBESET: {
		description: "Define um conjunto calculado de membros ou tuplas enviando uma expressão do conjunto para o cubo no servidor, que cria o conjunto e o retorna para o Microsoft Excel.",
		abstract: "Define um conjunto calculado de membros ou tuplas enviando uma expressão do conjunto para o cubo no servidor, que cria o conjunto e o retorna para o Microsoft Excel.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/cubeset-function"
		}],
		functionParameter: {
			connection: {
				name: "Conexão",
				detail: "Necessário. Uma cadeia de texto do nome da conexão com o cubo."
			},
			setExpression: {
				name: "Set_expression",
				detail: "Necessário. Uma cadeia de texto de uma expressão de um conjunto que resulta em um conjunto de membros ou tuplas. Expressão_conjunto também pode ser uma referência de célula para um intervalo do Excel que contém um ou mais membros, tuplas ou conjuntos incluídos no conjunto."
			},
			caption: {
				name: "Legenda",
				detail: "Opcional. Uma cadeia de texto exibida na célula ao invés da legenda do cubo, se houver uma definida."
			},
			sortOrder: {
				name: "Sort_order",
				detail: "Opcional. O tipo de classificação, se houver, a ser executada e pode corresponder a uma das seguintes opções:"
			},
			sortBy: {
				name: "Sort_by",
				detail: "Opcional. Uma cadeia de texto do valor pelo qual classificar. Por exemplo, para obter a cidade com as vendas mais altas, set_expression seria um conjunto de cidades, e sort_by seria a medida de vendas. Ou, para obter a cidade com a maior população, set_expression seria um conjunto de cidades, e sort_by seria a medida populacional. Se sort_order exigir sort_by e sort_by for omitido, o CUBESET retornará o #VALUE! mensagem de erro."
			}
		}
	},
	CUBESETCOUNT: {
		description: "Retorna o número de itens em um conjunto.",
		abstract: "Retorna o número de itens em um conjunto.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/cubesetcount-function"
		}],
		functionParameter: { set: {
			name: "Definir",
			detail: "Necessário. Uma cadeia de texto de uma expressão do Microsoft Excel que resulta em um conjunto definido pela função CONJUNTOCUBO. Conjunto também pode ser a função CONJUNTOCUBO ou uma referência a uma célula que contém a função CONJUNTOCUBO."
		} }
	},
	CUBEVALUE: {
		description: "Retorna um valor agregado do cubo.",
		abstract: "Retorna um valor agregado do cubo.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/cubevalue-function"
		}],
		functionParameter: {
			connection: {
				name: "Conexão",
				detail: "Necessário. Uma cadeia de texto do nome da conexão com o cubo."
			},
			memberExpression: {
				name: "Member_expression",
				detail: "Opcional. Uma cadeia de texto de uma expressão multidimensional (MDX) que resulta em um membro ou em uma tupla no cubo. De maneira alternativa, expressão_membro pode ser um conjunto definido com a função CONJUNTOCUBO. Use expressão_membro como um slicer para definir a porção do cubo para a qual o valor agregado é retornado. Se nenhuma medida for especificada na expressão_membro, será usada a medida padrão para esse cubo."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/database/pt-BR.ts
const locale$12 = {
	DAVERAGE: {
		description: "Obtém uma média dos valores em um campo (coluna) de registros em uma lista ou banco de dados que coincidem com as condições especificadas.",
		abstract: "Obtém uma média dos valores em um campo (coluna) de registros em uma lista ou banco de dados que coincidem com as condições especificadas.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/daverage-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "é o intervalo de células que compõe a lista ou base de dados. Um banco de dados é uma lista de dados relacionados em que as linhas de informações relacionadas são os registros e as colunas de dados são os campos. A primeira linha da lista contém os rótulos de cada coluna."
			},
			field: {
				name: "field",
				detail: "indica que coluna é utilizada na função . Digite o rótulo da coluna entre aspas, como \"Idade\" ou \"Rendimento\", ou como um número (sem aspas) que represente a posição da coluna dentro da lista: 1 para a primeira coluna, 2 para a segunda coluna e assim por diante."
			},
			criteria: {
				name: "criteria",
				detail: "é o intervalo de células que contém as condições que especificar. Você pode usar qualquer intervalo para o argumento de critérios, desde que ele inclua pelo menos um rótulo de coluna e pelo menos uma célula abaixo do rótulo de coluna para especificar uma condição para a coluna."
			}
		}
	},
	DCOUNT: {
		description: "Conta as células que contêm números em um campo (coluna) de registros em uma lista ou banco de dados que coincidirem com as condições especificadas.",
		abstract: "Conta as células que contêm números em um campo (coluna) de registros em uma lista ou banco de dados que coincidirem com as condições especificadas.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/dcount-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Obrigatório. O intervalo de células da lista ou do banco de dados. Um banco de dados é uma lista de dados relacionados em que as linhas de informações relacionadas são os registros e as colunas de dados são os campos. A primeira linha da lista contém os rótulos de cada coluna."
			},
			field: {
				name: "field",
				detail: "Obrigatório. Indica a coluna que será usada na função. Digite o rótulo da coluna entre aspas, como \"Idade\" ou \"Rendimento\", ou como um número (sem aspas) que represente a posição da coluna dentro da lista: 1 para a primeira coluna, 2 para a segunda coluna e assim por diante."
			},
			criteria: {
				name: "criteria",
				detail: "Obrigatório. O intervalo de células que contém as condições especificadas. Você pode usar qualquer intervalo para o argumento de critérios, desde que ele inclua pelo menos um rótulo de coluna e pelo menos uma célula abaixo do rótulo de coluna para especificar uma condição para a coluna."
			}
		}
	},
	DCOUNTA: {
		description: "Conta as células não vazias em um campo (coluna) de registros em uma lista ou banco de dados que coincidirem com as condições especificadas.",
		abstract: "Conta as células não vazias em um campo (coluna) de registros em uma lista ou banco de dados que coincidirem com as condições especificadas.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/dcounta-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Obrigatório. O intervalo de células da lista ou do banco de dados. Um banco de dados é uma lista de dados relacionados em que as linhas de informações relacionadas são os registros e as colunas de dados são os campos. A primeira linha da lista contém os rótulos de cada coluna."
			},
			field: {
				name: "field",
				detail: "Opcional. Indica a coluna que será usada na função. Digite o rótulo da coluna entre aspas, como \"Idade\" ou \"Rendimento\", ou como um número (sem aspas) que represente a posição da coluna dentro da lista: 1 para a primeira coluna, 2 para a segunda coluna e assim por diante."
			},
			criteria: {
				name: "criteria",
				detail: "Obrigatório. O intervalo de células que contém as condições especificadas. Você pode usar qualquer intervalo para o argumento de critérios, desde que ele inclua pelo menos um rótulo de coluna e pelo menos uma célula abaixo do rótulo de coluna para especificar uma condição para a coluna."
			}
		}
	},
	DGET: {
		description: "Extrai um único valor em uma coluna de uma lista ou banco de dados que coincide com as condições especificadas.",
		abstract: "Extrai um único valor em uma coluna de uma lista ou banco de dados que coincide com as condições especificadas.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/dget-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Necessário. O intervalo de células da lista ou do banco de dados. Um banco de dados é uma lista de dados relacionados em que as linhas de informações relacionadas são os registros e as colunas de dados são os campos. A primeira linha da lista contém os rótulos de cada coluna."
			},
			field: {
				name: "field",
				detail: "Necessário. Indica a coluna que será usada na função. Digite o rótulo da coluna entre aspas, como \"Idade\" ou \"Rendimento\", ou como um número (sem aspas) que represente a posição da coluna dentro da lista: 1 para a primeira coluna, 2 para a segunda coluna e assim por diante."
			},
			criteria: {
				name: "criteria",
				detail: "Necessário. O intervalo de células que contém as condições especificadas. Você pode usar qualquer intervalo para o argumento de critérios, desde que ele inclua pelo menos um rótulo de coluna e pelo menos uma célula abaixo do rótulo de coluna para especificar uma condição para a coluna."
			}
		}
	},
	DMAX: {
		description: "Retorna o maior número em um campo (coluna) de registros em uma lista ou banco de dados que coincida com as condições especificadas.",
		abstract: "Retorna o maior número em um campo (coluna) de registros em uma lista ou banco de dados que coincida com as condições especificadas.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/dmax-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Necessário. O intervalo de células da lista ou do banco de dados. Um banco de dados é uma lista de dados relacionados em que as linhas de informações relacionadas são os registros e as colunas de dados são os campos. A primeira linha da lista contém os rótulos de cada coluna."
			},
			field: {
				name: "field",
				detail: "Necessário. Indica a coluna que será usada na função. Digite o rótulo da coluna entre aspas, como \"Idade\" ou \"Rendimento\", ou como um número (sem aspas) que represente a posição da coluna dentro da lista: 1 para a primeira coluna, 2 para a segunda coluna e assim por diante."
			},
			criteria: {
				name: "criteria",
				detail: "Necessário. O intervalo de células que contém as condições especificadas. Você pode usar qualquer intervalo para o argumento de critérios, desde que ele inclua pelo menos um rótulo de coluna e pelo menos uma célula abaixo do rótulo de coluna para especificar uma condição para a coluna."
			}
		}
	},
	DMIN: {
		description: "Retorna o menor número em um campo (coluna) de registros em uma lista ou banco de dados que coincida com as condições especificadas.",
		abstract: "Retorna o menor número em um campo (coluna) de registros em uma lista ou banco de dados que coincida com as condições especificadas.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/dmin-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Necessário. O intervalo de células da lista ou do banco de dados. Um banco de dados é uma lista de dados relacionados em que as linhas de informações relacionadas são os registros e as colunas de dados são os campos. A primeira linha da lista contém os rótulos de cada coluna."
			},
			field: {
				name: "field",
				detail: "Necessário. Indica a coluna que será usada na função. Digite o rótulo da coluna entre aspas, como \"Idade\" ou \"Rendimento\", ou como um número (sem aspas) que represente a posição da coluna dentro da lista: 1 para a primeira coluna, 2 para a segunda coluna e assim por diante."
			},
			criteria: {
				name: "criteria",
				detail: "Necessário. O intervalo de células que contém as condições especificadas. Você pode usar qualquer intervalo para o argumento de critérios, desde que ele inclua pelo menos um rótulo de coluna e pelo menos uma célula abaixo do rótulo de coluna para especificar uma condição para a coluna."
			}
		}
	},
	DPRODUCT: {
		description: "Multiplica os valores em um campo (coluna) de registros em uma lista ou banco de dados que coincidem com as condições especificadas.",
		abstract: "Multiplica os valores em um campo (coluna) de registros em uma lista ou banco de dados que coincidem com as condições especificadas.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/dproduct-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Necessário. O intervalo de células da lista ou do banco de dados. Um banco de dados é uma lista de dados relacionados em que as linhas de informações relacionadas são os registros e as colunas de dados são os campos. A primeira linha da lista contém os rótulos de cada coluna."
			},
			field: {
				name: "field",
				detail: "Necessário. Indica a coluna que será usada na função. Digite o rótulo da coluna entre aspas, como \"Idade\" ou \"Rendimento\", ou como um número (sem aspas) que represente a posição da coluna dentro da lista: 1 para a primeira coluna, 2 para a segunda coluna e assim por diante."
			},
			criteria: {
				name: "criteria",
				detail: "Necessário. O intervalo de células que contém as condições especificadas. Você pode usar qualquer intervalo para o argumento de critérios, desde que ele inclua pelo menos um rótulo de coluna e pelo menos uma célula abaixo do rótulo de coluna para especificar uma condição para a coluna."
			}
		}
	},
	DSTDEV: {
		description: "Estima o desvio padrão de uma população com base em uma amostra, usando os números em um campo (coluna) de registros em uma lista ou banco de dados que coincidirem com as condições especificadas.",
		abstract: "Estima o desvio padrão de uma população com base em uma amostra, usando os números em um campo (coluna) de registros em uma lista ou banco de dados que coincidirem com as condições especificadas.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/dstdev-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Necessário. O intervalo de células da lista ou do banco de dados. Um banco de dados é uma lista de dados relacionados em que as linhas de informações relacionadas são os registros e as colunas de dados são os campos. A primeira linha da lista contém os rótulos de cada coluna."
			},
			field: {
				name: "field",
				detail: "Necessário. Indica a coluna que será usada na função. Digite o rótulo da coluna entre aspas, como \"Idade\" ou \"Rendimento\", ou como um número (sem aspas) que represente a posição da coluna dentro da lista: 1 para a primeira coluna, 2 para a segunda coluna e assim por diante."
			},
			criteria: {
				name: "criteria",
				detail: "Necessário. O intervalo de células que contém as condições especificadas. Você pode usar qualquer intervalo para o argumento de critérios, desde que ele inclua pelo menos um rótulo de coluna e pelo menos uma célula abaixo do rótulo de coluna para especificar uma condição para a coluna."
			}
		}
	},
	DSTDEVP: {
		description: "Calcula o desvio padrão de uma população com base na população total, usando os números em um campo (coluna) de registros em uma lista ou banco de dados que coincidirem com as condições especificadas.",
		abstract: "Calcula o desvio padrão de uma população com base na população total, usando os números em um campo (coluna) de registros em uma lista ou banco de dados que coincidirem com as condições especificadas.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/dstdevp-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Obrigatório. O intervalo de células da lista ou do banco de dados. Um banco de dados é uma lista de dados relacionados em que as linhas de informações relacionadas são os registros e as colunas de dados são os campos. A primeira linha da lista contém os rótulos de cada coluna."
			},
			field: {
				name: "field",
				detail: "Obrigatório. Indica a coluna que será usada na função. Digite o rótulo da coluna entre aspas, como \"Idade\" ou \"Rendimento\", ou como um número (sem aspas) que represente a posição da coluna dentro da lista: 1 para a primeira coluna, 2 para a segunda coluna e assim por diante."
			},
			criteria: {
				name: "criteria",
				detail: "Obrigatório. O intervalo de células que contém as condições especificadas. Você pode usar qualquer intervalo para o argumento de critérios, desde que ele inclua pelo menos um rótulo de coluna e pelo menos uma célula abaixo do rótulo de coluna para especificar uma condição para a coluna."
			}
		}
	},
	DSUM: {
		description: "Em uma lista ou banco de dados, o DSUM fornece a soma dos números em campos (colunas) de registros que correspondem às suas condições especificadas.",
		abstract: "Em uma lista ou banco de dados, o DSUM fornece a soma dos números em campos (colunas) de registros que correspondem às suas condições especificadas.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/dsum-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Necessário. Esse é o intervalo de células que compõe a lista ou o banco de dados. Um banco de dados é uma lista de dados relacionados em que linhas de informações relacionadas são registros e colunas de dados são campos . A primeira linha de uma lista contém rótulos para cada coluna nela."
			},
			field: {
				name: "field",
				detail: "Necessário. Isso especifica qual coluna é usada na função. Especifique o rótulo de coluna entre aspas duplas, como \"Age\" ou \"Yield\", por exemplo. Como alternativa, você pode especificar um número (sem aspas) que representa a posição da coluna dentro da lista: por exemplo, 1 para a primeira coluna, 2 para a segunda coluna e assim por diante."
			},
			criteria: {
				name: "criteria",
				detail: "Necessário. Esse é o intervalo de células que contém as condições especificadas. Você pode usar qualquer intervalo para o argumento de critérios, desde que ele inclua pelo menos um rótulo de coluna e pelo menos uma célula abaixo do rótulo de coluna para especificar uma condição para a coluna."
			}
		}
	},
	DVAR: {
		description: "Estima a variação de uma população com base em uma amostra, usando os números em um campo (coluna) de registros em uma lista ou banco de dados que coincidem com as condições especificadas.",
		abstract: "Estima a variação de uma população com base em uma amostra, usando os números em um campo (coluna) de registros em uma lista ou banco de dados que coincidem com as condições especificadas.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/dvar-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Necessário. O intervalo de células da lista ou do banco de dados. Um banco de dados é uma lista de dados relacionados em que as linhas de informações relacionadas são os registros e as colunas de dados são os campos. A primeira linha da lista contém os rótulos de cada coluna."
			},
			field: {
				name: "field",
				detail: "Necessário. Indica a coluna que será usada na função. Digite o rótulo da coluna entre aspas, como \"Idade\" ou \"Rendimento\", ou como um número (sem aspas) que represente a posição da coluna dentro da lista: 1 para a primeira coluna, 2 para a segunda coluna e assim por diante."
			},
			criteria: {
				name: "criteria",
				detail: "Necessário. O intervalo de células que contém as condições especificadas. Você pode usar qualquer intervalo para o argumento de critérios, desde que ele inclua pelo menos um rótulo de coluna e pelo menos uma célula abaixo do rótulo de coluna para especificar uma condição para a coluna."
			}
		}
	},
	DVARP: {
		description: "Calcula a variação de uma população com base na população total, usando os números em um campo (coluna) de registros em uma lista ou banco de dados que coincidem com as condições especificadas.",
		abstract: "Calcula a variação de uma população com base na população total, usando os números em um campo (coluna) de registros em uma lista ou banco de dados que coincidem com as condições especificadas.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/dvarp-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Necessário. O intervalo de células da lista ou do banco de dados. Um banco de dados é uma lista de dados relacionados em que as linhas de informações relacionadas são os registros e as colunas de dados são os campos. A primeira linha da lista contém os rótulos de cada coluna."
			},
			field: {
				name: "field",
				detail: "Necessário. Indica a coluna que será usada na função. Digite o rótulo da coluna entre aspas, como \"Idade\" ou \"Rendimento\", ou como um número (sem aspas) que represente a posição da coluna dentro da lista: 1 para a primeira coluna, 2 para a segunda coluna e assim por diante."
			},
			criteria: {
				name: "criteria",
				detail: "Necessário. O intervalo de células que contém as condições especificadas. Você pode usar qualquer intervalo para o argumento de critérios, desde que ele inclua pelo menos um rótulo de coluna e pelo menos uma célula abaixo do rótulo de coluna para especificar uma condição para a coluna."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/date/pt-BR.ts
const locale$11 = {
	DATE: {
		description: "A função DATA retorna o número de série sequencial que representa uma determinada data.",
		abstract: "A função DATA retorna o número de série sequencial que representa uma determinada data.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/date-function"
		}],
		functionParameter: {
			year: {
				name: "year",
				detail: "O valor do argumento ano pode conter de um a quatro dígitos. O Excel interpreta-o de acordo com o sistema de datas usado pelo computador; por padrão, o Univer usa o sistema de datas de 1900."
			},
			month: {
				name: "month",
				detail: "Um inteiro positivo ou negativo que representa o mês do ano, de 1 a 12 (janeiro a dezembro)."
			},
			day: {
				name: "day",
				detail: "Um inteiro positivo ou negativo que representa o dia do mês, de 1 a 31."
			}
		}
	},
	DATEDIF: {
		description: "Calcula o número de dias, meses ou anos entre duas datas.",
		abstract: "Calcula o número de dias, meses ou anos entre duas datas.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/datedif-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Uma data que representa a primeira ou a data de início de um determinado período. As datas podem ser inseridas como cadeias de texto entre aspas (por exemplo, \"30/1/2001\"), como números de série (por exemplo, 36921, que representa 30 de janeiro de 2001, se você estiver usando o sistema de data 1900) ou como resultado de outras fórmulas ou funções (por exemplo, DATA.VALOR(\"30/1/2001\"))."
			},
			endDate: {
				name: "end_date",
				detail: "Uma data que representa a última data, ou final, do período."
			},
			unit: {
				name: "Unidade",
				detail: "O tipo de informação que pretende que sejam devolvidas, em que: Unidade****Devolve \" Y \"O número de anos completos no período.\". M \"O número de meses completos no período.\" D \"O número de dias no período.\" MD : a diferença entre os dias em start_date e end_date. Os meses e os anos das datas são ignorados. Importante: Não recomendamos a utilização do argumento \"MD\", uma vez que existem limitações conhecidas com o mesmo. Veja a secção de problemas conhecidos abaixo.\" YM \"A diferença entre os meses em start_date e end_date. Os dias e anos das datas são ignorados\" YD \"A diferença entre os dias de start_date e end_date. Os anos das datas são ignorados."
			}
		}
	},
	DATEVALUE: {
		description: "A função DATA.VALOR converte uma data armazenada como texto em um número de série que o Excel reconhece como data. Por exemplo, a fórmula =DATA.VALOR(\"1/1/2008\") retorna 39448, o número de série da data 1/1/2008. Lembre-se, no entanto,de que a configuração de sistema de data de seu computador pode fazer com que os resultados da função DATA.VALOR difiram deste exemplo.",
		abstract: "A função DATA.VALOR converte uma data armazenada como texto em um número de série que o Excel reconhece como data. Por exemplo, a fórmula =DATA.VALOR(\"1/1/2008\") retorna 39448, o número de série da data 1/1/2008. Lembre-se, no entanto,de que a configuração de sistema de data de seu computador pode fazer com que os resultados da função DATA.VALOR difiram deste exemplo.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/datevalue-function"
		}],
		functionParameter: { dateText: {
			name: "date_text",
			detail: "Obrigatório. Texto que representa uma data em um formato de data do Excel ou uma referência a uma célula que contém texto representando uma data em um formato de data do Excel. Por exemplo \"1/30/2008\" ou \"30-Jan-2008\" são cadeias de texto entre aspas que representam datas. Utilizando o sistema de datas predefinido no Microsoft Excel para Windows, o argumento date_text tem de representar uma data entre 1 de janeiro de 1900 e 31 de dezembro de 9999. A função DATA.VALOR retornará o valor de erro #VALOR! se o valor do argumento date_text estiver fora deste intervalo. Se a parte do ano do argumento date_text for omitida, a função DATA.VALOR utiliza o ano atual do relógio incorporado do computador. As informações de tempo no argumento date_text são ignoradas."
		} }
	},
	DAY: {
		description: "Retorna o dia de uma data representado por um número de série. O dia é dado como um inteiro que varia de 1 a 31.",
		abstract: "Retorna o dia de uma data representado por um número de série. O dia é dado como um inteiro que varia de 1 a 31.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/day-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Obrigatório. A data do dia que você está tentando encontrar. As datas devem ser inseridas com a função DATA ou como resultado de outras fórmulas ou funções. Por exemplo, use DATA(2008;5;23) para 23 de maio de 2008. Poderão ocorrer problemas se as datas forem inseridas como texto ."
		} }
	},
	DAYS: {
		description: "Retorna o número de dias entre duas datas",
		abstract: "Retorna o número de dias entre duas datas",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/days-function"
		}],
		functionParameter: {
			endDate: {
				name: "end_date",
				detail: "Necessário. Data_inicial e Data_final são as duas datas entre as quais você deseja saber o número de dias."
			},
			startDate: {
				name: "start_date",
				detail: "Necessário. Data_inicial e Data_final são as duas datas entre as quais você deseja saber o número de dias."
			}
		}
	},
	DAYS360: {
		description: "A função DIAS360 retorna o número de dias entre duas datas com base em um ano de 360 dias (doze meses de 30 dias). Use essa função para ajudar no cálculo de pagamentos, se o seu sistema contábil estiver baseado em doze meses de 30 dias.",
		abstract: "A função DIAS360 retorna o número de dias entre duas datas com base em um ano de 360 dias (doze meses de 30 dias). Use essa função para ajudar no cálculo de pagamentos, se o seu sistema contábil estiver baseado em doze meses de 30 dias.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/days360-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "As duas datas entre as quais você deseja saber o número de dias."
			},
			endDate: {
				name: "end_date",
				detail: "As duas datas entre as quais você deseja saber o número de dias."
			},
			method: {
				name: "method",
				detail: "Um valor lógico que especifica se o cálculo deve usar o método dos EUA ou o europeu."
			}
		}
	},
	EDATE: {
		description: "Retorna um número de série de data que é o número de meses indicado antes ou depois de data_inicial. Use DATAM para calcular datas de liquidação ou datas de vencimento que caem no mesmo dia do mês da data de emissão.",
		abstract: "Retorna um número de série de data que é o número de meses indicado antes ou depois de data_inicial. Use DATAM para calcular datas de liquidação ou datas de vencimento que caem no mesmo dia do mês da data de emissão.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/edate-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Necessário. Uma data que representa a data inicial. As datas devem ser inseridas com a função DATA ou como resultado de outras fórmulas ou funções. Por exemplo, use DATA(2008;5;23) para 23 de maio de 2008. Poderão ocorrer problemas se as datas forem inseridas como texto ."
			},
			months: {
				name: "months",
				detail: "Necessário. O número de meses antes ou depois de data_inicial. Um valor positivo para meses gera uma data futura; um valor negativo gera uma data passada."
			}
		}
	},
	EOMONTH: {
		description: "Retorna o número de série para o último dia do mês que é o número indicado de meses antes ou depois de data_inicial. Use FIMMÊS para calcular as datas de vencimento que caem no último dia do mês.",
		abstract: "Retorna o número de série para o último dia do mês que é o número indicado de meses antes ou depois de data_inicial. Use FIMMÊS para calcular as datas de vencimento que caem no último dia do mês.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/eomonth-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Necessário. Uma data que representa a data inicial. As datas devem ser inseridas com a função DATA ou como resultado de outras fórmulas ou funções. Por exemplo, use DATA(2008;5;23) para 23 de maio de 2008. Poderão ocorrer problemas se as datas forem inseridas como texto ."
			},
			months: {
				name: "months",
				detail: "Necessário. O número de meses antes ou depois de data_inicial. Um valor positivo para meses gera uma data futura; um valor negativo gera uma data passada. Observação Se meses não for um número inteiro, será truncado."
			}
		}
	},
	EPOCHTODATE: {
		description: "Converte um carimbo de data e hora da época Unix em segundos, milissegundos ou microssegundos em uma data e hora no Tempo Universal Coordenado (UTC).",
		abstract: "Converte um carimbo de data e hora da época Unix em segundos, milissegundos ou microssegundos em uma data e hora no Tempo Universal Coordenado (UTC).",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/13193461?hl=pt-BR"
		}],
		functionParameter: {
			timestamp: {
				name: "timestamp",
				detail: "Um carimbo de data e hora da época Unix, em segundos, milissegundos ou microssegundos."
			},
			unit: {
				name: "unit",
				detail: "[OPCIONAL — 1 por padrão]: a unidade de tempo em que o carimbo de data e hora é expresso."
			}
		}
	},
	HOUR: {
		description: "Retorna a hora de um valor de tempo. A hora é retornada como um inteiro, variando de 0 (12:00 A.M.) a 23 (11:00 P.M.).",
		abstract: "Retorna a hora de um valor de tempo. A hora é retornada como um inteiro, variando de 0 (12:00 A.M.) a 23 (11:00 P.M.).",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/hour-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Necessário. O horário que contém a hora que você deseja encontrar. Os horários podem ser inseridos como cadeias de texto entre aspas (por exemplo, \"6:45 PM\"), como números decimais (por exemplo, 0,78125, que representa 6:45 PM) ou como resultados de outras fórmulas ou funções (por exemplo, VALOR.TEMPO(\"6:45 PM\"))."
		} }
	},
	ISOWEEKNUM: {
		description: "Retorna o número da semana ISO do ano para uma determinada data.",
		abstract: "Retorna o número da semana ISO do ano para uma determinada data.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/isoweeknum-function"
		}],
		functionParameter: { date: {
			name: "date",
			detail: "Obrigatório. A data é o código de data-hora usado pelo Excel para cálculos de data e hora."
		} }
	},
	MINUTE: {
		description: "Retorna os minutos de um valor de tempo. O minuto é dado como um número inteiro, que vai de 0 a 59.",
		abstract: "Retorna os minutos de um valor de tempo. O minuto é dado como um número inteiro, que vai de 0 a 59.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/minute-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Obrigatório. O horário que contém o minuto que você deseja encontrar. Os horários podem ser inseridos como cadeias de texto entre aspas (por exemplo, \"6:45 PM\"), como números decimais (por exemplo, 0,78125, que representa 6:45 PM) ou como resultados de outras fórmulas ou funções (por exemplo, VALOR.TEMPO(\"6:45 PM\"))."
		} }
	},
	MONTH: {
		description: "Retorna o mês de uma data representado por um número de série. O mês é fornecido como um inteiro, variando de 1 (janeiro) a 12 (dezembro).",
		abstract: "Retorna o mês de uma data representado por um número de série. O mês é fornecido como um inteiro, variando de 1 (janeiro) a 12 (dezembro).",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/month-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Obrigatório. A data do mês que você está tentando encontrar. As datas devem ser inseridas com a função DATA ou como resultado de outras fórmulas ou funções. Por exemplo, use DATA(2008;5;23) para 23 de maio de 2008. Poderão ocorrer problemas se as datas forem inseridas como texto ."
		} }
	},
	NETWORKDAYS: {
		description: "Retorna o número de dias úteis inteiros entre data_inicial e data_final. Os dias úteis excluem os fins de semana e quaisquer datas identificadas em feriados. Use DIATRABALHOTOTAL para calcular os benefícios aos empregados que recebem com base no número de dias trabalhados durante um período específico.",
		abstract: "Retorna o número de dias úteis inteiros entre data_inicial e data_final. Os dias úteis excluem os fins de semana e quaisquer datas identificadas em feriados. Use DIATRABALHOTOTAL para calcular os benefícios aos empregados que recebem com base no número de dias trabalhados durante um período específico.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/networkdays-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Obrigatório. Uma data que representa a data inicial."
			},
			endDate: {
				name: "end_date",
				detail: "Obrigatório. A data que representa a data final."
			},
			holidays: {
				name: "holidays",
				detail: "Opcional. Um intervalo opcional de uma ou mais datas a serem excluídas do calendário de dias de trabalho, como feriados estaduais e federais, e feriados móveis. A lista pode ser um intervalo de células que contém as datas ou uma constante de matriz dos números de série que representam as datas."
			}
		}
	},
	NETWORKDAYS_INTL: {
		description: "Retorna o número de dias úteis inteiros entre duas datas usando parâmetros para indicar quais e quantos dias são dias de fim de semana. Dias de fim de semana e quaisquer dias especificados como feriados não são considerados como dias úteis.",
		abstract: "Retorna o número de dias úteis inteiros entre duas datas usando parâmetros para indicar quais e quantos dias são dias de fim de semana. Dias de fim de semana e quaisquer dias especificados como feriados não são considerados como dias úteis.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/networkdays-intl-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Uma data que representa a data inicial."
			},
			endDate: {
				name: "end_date",
				detail: "Uma data que representa a data final."
			},
			weekend: {
				name: "weekend",
				detail: "Um número ou texto que especifica quando ocorrem os fins de semana."
			},
			holidays: {
				name: "holidays",
				detail: "Um intervalo opcional de uma ou mais datas a excluir do calendário de trabalho, como feriados nacionais, estaduais ou móveis."
			}
		}
	},
	NOW: {
		description: "Retorna o número de série da data e da hora atual. Se o formato da célula era Geral antes de a função ter sido inserida, o Excel transformará o formato dessa célula para que ele corresponda ao mesmo formato de data e hora de suas configurações regionais. Você pode alterar o formato de data e hora da célula usando os comandos no grupo Número da guia Página Inicial , na Faixa de Opções.",
		abstract: "Retorna o número de série da data e da hora atual. Se o formato da célula era Geral antes de a função ter sido inserida, o Excel transformará o formato dessa célula para que ele corresponda ao mesmo formato de data e hora de suas configurações regionais. Você pode alterar o formato de data e hora da célula usando os comandos no grupo Número da guia Página Inicial , na Faixa de Opções.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/now-function"
		}],
		functionParameter: {}
	},
	SECOND: {
		description: "Retorna os segundos de um valor de hora. O segundo é fornecido como um inteiro no intervalo de 0 (zero) a 59.",
		abstract: "Retorna os segundos de um valor de hora. O segundo é fornecido como um inteiro no intervalo de 0 (zero) a 59.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/second-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Obrigatório. A hora que contém os segundos que você deseja localizar. Horas podem ser inseridas como cadeias de texto entre aspas duplas (por exemplo, \"6:45 PM\"), como números decimais (por exemplo, 0,78125, que representa 6:45 PM) ou como resultado de outras fórmulas e funções (por exemplo, VALOR.TEMPO(\"6:45 PM\"))."
		} }
	},
	TIME: {
		description: "Retorna o número decimal para uma determinada hora. Se o formato da célula era Geral antes de a função ser inserida, o resultado será formatado como uma data.",
		abstract: "Retorna o número decimal para uma determinada hora. Se o formato da célula era Geral antes de a função ser inserida, o resultado será formatado como uma data.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/time-function"
		}],
		functionParameter: {
			hour: {
				name: "hour",
				detail: "Necessário. Um número de 0 (zero) a 32767 que representa a hora. Qualquer valor maior que 23 será dividido por 24 e o restante será tratado como o valor de hora. Por exemplo, TEMPO(27;0;0) = TEMPO(3;0;0) = ,125 ou 3:00 AM."
			},
			minute: {
				name: "minute",
				detail: "Necessário. Um número de 0 a 32767 que representa o minuto. Qualquer valor maior que 59 será convertido em horas e minutos. Por exemplo, TEMPO(0;750;0) = TEMPO(12;30;0) = ,520833 ou 12:30 PM."
			},
			second: {
				name: "second",
				detail: "Necessário. Um número de 0 a 32767 que representa o segundo. Qualquer valor maior que 59 será convertido em horas e minutos. Por exemplo, TEMPO(0;0;2000) = TEMPO(0;33;22) = ,023148 ou 12:33:20 AM"
			}
		}
	},
	TIMEVALUE: {
		description: "Retorna o número decimal da hora representada por uma cadeia de texto. O número decimal é um valor que varia de 0 (zero) a 0,99988426 e que representa as horas entre 0:00:00 (12:00:00 AM) e 23:59:59 (11:59:59 PM).",
		abstract: "Retorna o número decimal da hora representada por uma cadeia de texto. O número decimal é um valor que varia de 0 (zero) a 0,99988426 e que representa as horas entre 0:00:00 (12:00:00 AM) e 23:59:59 (11:59:59 PM).",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/timevalue-function"
		}],
		functionParameter: { timeText: {
			name: "time_text",
			detail: "Obrigatório. Uma cadeia de texto que representa uma hora em qualquer um dos formatos de hora do Microsoft Excel, por exemplo, as cadeias de texto entre aspas \"6:45 PM\" e \"18:45\" representam hora."
		} }
	},
	TO_DATE: {
		description: "Converte um número fornecido em uma data.",
		abstract: "Converte um número fornecido em uma data.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3094239?hl=pt-BR"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "O argumento ou referência de célula a converter em data. Se for um número, será interpretado como a quantidade de dias desde 30 de dezembro de 1899; valores negativos são dias anteriores e valores fracionários representam a hora após a meia-noite. Valores não numéricos são retornados sem alteração."
		} }
	},
	TODAY: {
		description: "A função HOJE devolve o número de série da data atual. O número de série é o código de data/hora usado pelo Excel para cálculos de data e hora. Se o formato da célula era Geral antes de a função ser inserida, o Excel irá transformar o formato da célula em Data . Se quiser exibir o número de série, será necessário alterar o formato das células para Geral ou Número .",
		abstract: "A função HOJE devolve o número de série da data atual. O número de série é o código de data/hora usado pelo Excel para cálculos de data e hora. Se o formato da célula era Geral antes de a função ser inserida, o Excel irá transformar o formato da célula em Data . Se quiser exibir o número de série, será necessário alterar o formato das células para Geral ou Número .",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/today-function"
		}],
		functionParameter: {}
	},
	WEEKDAY: {
		description: "Retorna o dia da semana correspondente a uma data. O dia é dado como um inteiro, variando de 1 (domingo) a 7 (sábado), por padrão.",
		abstract: "Retorna o dia da semana correspondente a uma data. O dia é dado como um inteiro, variando de 1 (domingo) a 7 (sábado), por padrão.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/weekday-function"
		}],
		functionParameter: {
			serialNumber: {
				name: "serial_number",
				detail: "Obrigatório. Um número sequencial que representa a data do dia que você está tentando encontrar. As datas devem ser inseridas com a função DATA ou como resultado de outras fórmulas ou funções. Por exemplo, use DATA(2008;5;23) para 23 de maio de 2008. Poderão ocorrer problemas se as datas forem inseridas como texto."
			},
			returnType: {
				name: "return_type",
				detail: "Opcional. Um número que determina o tipo do valor retornado."
			}
		}
	},
	WEEKNUM: {
		description: "Retorna o número da semana de uma data específica. Por exemplo, a semana que contém 1 de janeiro é a primeira semana do ano e é numerada semana 1.",
		abstract: "Retorna o número da semana de uma data específica. Por exemplo, a semana que contém 1 de janeiro é a primeira semana do ano e é numerada semana 1.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/weeknum-function"
		}],
		functionParameter: {
			serialNumber: {
				name: "serial_number",
				detail: "Necessário. Uma data na semana. As datas devem ser inseridas com a função DATA ou como resultado de outras fórmulas ou funções. Por exemplo, use DATA(2008;5;23) para 23 de maio de 2008. Poderão ocorrer problemas se as datas forem inseridas como texto."
			},
			returnType: {
				name: "return_type",
				detail: "Opcional. É um número que determina em que dia a semana começa. O valor padrão é 1."
			}
		}
	},
	WORKDAY: {
		description: "Retorna um número que representa uma data que é o número indicado de dias úteis antes ou após uma data (a data inicial). Os dias úteis excluem fins de semana e quaisquer datas identificadas como feriados. Use DIATRABALHO para excluir os fins de semana ou feriados ao calcular as datas de vencimento de fatura, horas de entrega esperadas ou o número de dias de trabalho executado.",
		abstract: "Retorna um número que representa uma data que é o número indicado de dias úteis antes ou após uma data (a data inicial). Os dias úteis excluem fins de semana e quaisquer datas identificadas como feriados. Use DIATRABALHO para excluir os fins de semana ou feriados ao calcular as datas de vencimento de fatura, horas de entrega esperadas ou o número de dias de trabalho executado.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/workday-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Obrigatório. Uma data que representa a data inicial."
			},
			days: {
				name: "days",
				detail: "Obrigatório. O número de dias úteis antes ou depois de data_inicial. Um valor positivo para gera uma data futura; um valor negativo gera uma data passada."
			},
			holidays: {
				name: "holidays",
				detail: "Opcional. Uma lista opcional com uma ou mais datas a serem excluídas do calendário de trabalho, como feriados estaduais, federais e flutuantes. A lista pode ser um intervalo de células que contém as datas ou uma constante de matriz dos números de série que representam as datas."
			}
		}
	},
	WORKDAY_INTL: {
		description: "Essa função retorna o número de série da data antes ou depois de um número especificado de dias úteis com parâmetros personalizados de fim de semana. Parâmetros opcionais de fim de semana podem indicar quais e quantos dias são dias de fim de semana. Observe que os dias de fim de semana e todos os dias especificados como feriados não são considerados como dias úteis.",
		abstract: "Essa função retorna o número de série da data antes ou depois de um número especificado de dias úteis com parâmetros personalizados de fim de semana. Parâmetros opcionais de fim de semana podem indicar quais e quantos dias são dias de fim de semana. Observe que os dias de fim de semana e todos os dias especificados como feriados não são considerados como dias úteis.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/workday-intl-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Necessário. A data de início, truncada para que apareça como um número inteiro."
			},
			days: {
				name: "days",
				detail: "Necessário. O número de dias úteis antes ou depois de data_inicial. Um valor positivo gera uma data futura; um valor negativo gera uma data passada; um valor zero gera o start_date já especificado . O deslocamento do dia é truncado para um inteiro."
			},
			weekend: {
				name: "weekend",
				detail: "Opcional. Se usado, isso indica os dias da semana que são dias de fim de semana e não são considerados dias úteis. O argumento do fim de semana é um número ou cadeia de caracteres de fim de semana que especifica quando os fins de semana ocorrem. Os valores do número do fim de semana indicam dias de fim de semana, conforme mostrado abaixo."
			},
			holidays: {
				name: "holidays",
				detail: "Esse é um argumento opcional no final da sintaxe. Ele especifica um conjunto opcional de uma ou mais datas que devem ser excluídas do calendário do dia útil. Feriados devem ser um intervalo de células que contêm as datas -- ou uma constante de matriz dos valores serial que representam essas datas. A ordem de datas ou valores consecutivos em feriados podem ser arbitrários."
			}
		}
	},
	YEAR: {
		description: "Retorna o ano correspondente a uma data. O ano é retornado como um inteiro no intervalo de 1900-9999.",
		abstract: "Retorna o ano correspondente a uma data. O ano é retornado como um inteiro no intervalo de 1900-9999.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/year-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Obrigatório. A data do ano que você deseja encontrar. As datas devem ser inseridas com a função DATA ou como resultados de outras fórmulas ou funções. Por exemplo, utilize DATA(2025;5;23) para o dia 23 de maio de 2025. Poderão ocorrer problemas se as datas forem inseridas como texto."
		} }
	},
	YEARFRAC: {
		description: "FRAÇÃOANO calcula a fração do ano representada pelo número de dias inteiros entre duas datas (a data_inicial e a data_final ). Por exemplo, você pode usar o FRAÇÃOANO para identificar a proporção dos benefícios de um ano inteiro, ou obrigações a serem atribuídas a um termo específico.",
		abstract: "FRAÇÃOANO calcula a fração do ano representada pelo número de dias inteiros entre duas datas (a data_inicial e a data_final ). Por exemplo, você pode usar o FRAÇÃOANO para identificar a proporção dos benefícios de um ano inteiro, ou obrigações a serem atribuídas a um termo específico.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/yearfrac-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Uma data que representa a data inicial."
			},
			endDate: {
				name: "end_date",
				detail: "Uma data que representa a data final."
			},
			basis: {
				name: "basis",
				detail: "O tipo de base de contagem de dias a ser usado."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/engineering/pt-BR.ts
const locale$10 = {
	BESSELI: {
		description: "Retorna a função de Bessel modificada, que equivale à função de Bessel avaliada por argumentos puramente imaginários.",
		abstract: "Retorna a função de Bessel modificada, que equivale à função de Bessel avaliada por argumentos puramente imaginários.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/besseli-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "Obrigatório. O valor no qual se avalia a função."
			},
			n: {
				name: "N",
				detail: "Obrigatório. A ordem da função Bessel. Se n não for um inteiro, será truncado."
			}
		}
	},
	BESSELJ: {
		description: "Retorna a função de Bessel.",
		abstract: "Retorna a função de Bessel.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/besselj-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "Obrigatório. O valor no qual se avalia a função."
			},
			n: {
				name: "N",
				detail: "Obrigatório. A ordem da função Bessel. Se n não for um inteiro, será truncado."
			}
		}
	},
	BESSELK: {
		description: "Retorna a função de Bessel modificada, que equivale às funções de Bessel avaliadas por argumentos puramente imaginários.",
		abstract: "Retorna a função de Bessel modificada, que equivale às funções de Bessel avaliadas por argumentos puramente imaginários.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/besselk-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "Obrigatório. O valor no qual se avalia a função."
			},
			n: {
				name: "N",
				detail: "Obrigatório. A ordem da função. Se n não for um inteiro, será truncado."
			}
		}
	},
	BESSELY: {
		description: "Retorna a função de Bessel, também chamada de função de Weber ou de Newmann.",
		abstract: "Retorna a função de Bessel, também chamada de função de Weber ou de Newmann.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/bessely-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "Obrigatório. O valor no qual se avalia a função."
			},
			n: {
				name: "N",
				detail: "Obrigatório. A ordem da função. Se n não for um inteiro, será truncado."
			}
		}
	},
	BIN2DEC: {
		description: "Converte um número binário em decimal.",
		abstract: "Converte um número binário em decimal.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/bin2dec-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório. O número binário que você deseja converter. Núm não pode conter mais de 10 caracteres (10 bits). O bit mais significativo de núm é o bit de sinal. Os 9 bits restantes são bits de magnitude. Os números negativos são representados através da notação de complemento a dois."
		} }
	},
	BIN2HEX: {
		description: "Converte um número binário em hexadecimal.",
		abstract: "Converte um número binário em hexadecimal.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/bin2hex-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. O número binário que você deseja converter. Núm não pode conter mais de 10 caracteres (10 bits). O bit mais significativo de núm é o bit de sinal. Os 9 bits restantes são bits de magnitude. Os números negativos são representados através da notação de complemento a dois."
			},
			places: {
				name: "places",
				detail: "Opcional. O número de caracteres a ser usado. Se casas for omitido, BINAHEX usará o número mínimo de caracteres necessários. Casas é útil para preencher o valor de retorno com 0s (zeros) à esquerda."
			}
		}
	},
	BIN2OCT: {
		description: "Converte um número binário em octal.",
		abstract: "Converte um número binário em octal.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/bin2oct-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. O número binário que você deseja converter. Núm não pode conter mais de 10 caracteres (10 bits). O bit mais significativo de núm é o bit de sinal. Os 9 bits restantes são bits de magnitude. Os números negativos são representados através da notação de complemento a dois."
			},
			places: {
				name: "places",
				detail: "Opcional. O número de caracteres a ser usado. Se casas for omitido, BINAOCT usará o número mínimo de caracteres necessários. Casas é útil para preencher o valor de retorno com 0s (zeros) à esquerda."
			}
		}
	},
	BITAND: {
		description: "Retorna um bit 'AND' de dois números.",
		abstract: "Retorna um bit 'AND' de dois números.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/bitand-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obrigatório. Deve ser no formato de decimal e maior que ou igual a 0."
			},
			number2: {
				name: "number2",
				detail: "Obrigatório. Deve ser no formato de decimal e maior que ou igual a 0."
			}
		}
	},
	BITLSHIFT: {
		description: "Retorna um número deslocado para a esquerda em número de bits especificado.",
		abstract: "Retorna um número deslocado para a esquerda em número de bits especificado.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/bitlshift-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. O número deve ser um número inteiro maior que ou igual a 0."
			},
			shiftAmount: {
				name: "shift_amount",
				detail: "Necessário. O valor_deslocamento deve ser um número inteiro."
			}
		}
	},
	BITOR: {
		description: "Retorna um bit 'OU' de dois números.",
		abstract: "Retorna um bit 'OU' de dois números.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/bitor-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Necessário. Deve ser no formato de decimal e maior que ou igual a 0."
			},
			number2: {
				name: "number2",
				detail: "Necessário. Deve ser no formato de decimal e maior que ou igual a 0."
			}
		}
	},
	BITRSHIFT: {
		description: "Retorna um número deslocado para a direita em número de bits especificado.",
		abstract: "Retorna um número deslocado para a direita em número de bits especificado.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/bitrshift-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. Deve ser um número inteiro maior que ou igual a 0."
			},
			shiftAmount: {
				name: "shift_amount",
				detail: "Necessário. Deve ser um número inteiro."
			}
		}
	},
	BITXOR: {
		description: "Retorna um bit 'XOR' de dois números.",
		abstract: "Retorna um bit 'XOR' de dois números.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/bitxor-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Necessário. Deve ser maior que ou igual a 0."
			},
			number2: {
				name: "number2",
				detail: "Necessário. Deve ser maior que ou igual a 0."
			}
		}
	},
	COMPLEX: {
		description: "Converte coeficientes reais e imaginários em números complexos no formato x + yi ou x + yj.",
		abstract: "Converte coeficientes reais e imaginários em números complexos no formato x + yi ou x + yj.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/complex-function"
		}],
		functionParameter: {
			realNum: {
				name: "real_num",
				detail: "Necessário. O coeficiente real do número complexo."
			},
			iNum: {
				name: "i_num",
				detail: "Necessário. O coeficiente imaginário do número complexo."
			},
			suffix: {
				name: "suffix",
				detail: "Opcional. O sufixo para o componente imaginário do número complexo. Se for omitido, sufixo será considerado \"i\"."
			}
		}
	},
	CONVERT: {
		description: "Converte um número de um sistema de medida para outro. Por exemplo, CONVERTER pode traduzir uma tabela de distâncias em milhas para uma tabela de distâncias em quilômetros.",
		abstract: "Converte um número de um sistema de medida para outro. Por exemplo, CONVERTER pode traduzir uma tabela de distâncias em milhas para uma tabela de distâncias em quilômetros.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/convert-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "O valor em from_unit a ser convertido."
			},
			fromUnit: {
				name: "from_unit",
				detail: "A unidade do número."
			},
			toUnit: {
				name: "to_unit",
				detail: "A unidade do resultado."
			}
		}
	},
	DEC2BIN: {
		description: "Converte um número decimal em binário.",
		abstract: "Converte um número decimal em binário.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/dec2bin-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. O inteiro decimal que você deseja converter. Se núm for negativo, o valor válido de casa será ignorado e DECABIN retornará um número binário de 10 caracteres (10 bits) em que o bit mais significativo é o bit de sinal. Os 9 bits restantes são bits de magnitude. Os números negativos são representados através da notação de complemento a dois."
			},
			places: {
				name: "places",
				detail: "Opcional. O número de caracteres a ser usado. Se casas for omitido, DECABIN usa o número mínimo de caracteres necessário. Casas é útil para preencher o valor de retorno com 0s (zeros) à esquerda."
			}
		}
	},
	DEC2HEX: {
		description: "Converte um número decimal em hexadecimal.",
		abstract: "Converte um número decimal em hexadecimal.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/dec2hex-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. O inteiro decimal que você deseja converter. Se núm for negativo, casas serão ignoradas e DECAHEX retornará um número hexadecimal de 10 caracteres (40 bits) em que o bit mais significativo é o bit de sinal. Os 39 bits restantes são bits de magnitude. Os números negativos são representados com o uso de notação de complemento a dois."
			},
			places: {
				name: "places",
				detail: "Opcional. O número de caracteres a serem usados. Se casas for omitido, DECAHEX usa o número mínimo de caracteres necessário. Casas é útil para preencher o valor de retorno com 0s (zeros) à esquerda."
			}
		}
	},
	DEC2OCT: {
		description: "Converte um número decimal em octal.",
		abstract: "Converte um número decimal em octal.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/dec2oct-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. O inteiro decimal que você deseja converter. Se núm for negativo, casas serão ignoradas e DECAOCT retornará um número octal de 10 caracteres (30 bits) em que o bit mais significativo é o bit de sinal. Os demais 29 bits são bits de magnitude. Os números negativos são representados com o uso de notação de complemento a dois."
			},
			places: {
				name: "places",
				detail: "Opcional. O número de caracteres a ser usado. Se casas for omitido, DECAOCT usa o número mínimo de caracteres necessário. Casas é útil para preencher o valor de retorno com 0s (zeros) à esquerda."
			}
		}
	},
	DELTA: {
		description: "Testa se dois valores são iguais. Retorna 1 se núm1 = núm2; caso contrário, retornará 0. Utilize esta função para filtrar um conjunto de valores. Por exemplo, somando várias funções DELTA, você pode calcular a contagem de pares iguais. Esta função também é chamada função Kronecker Delta.",
		abstract: "Testa se dois valores são iguais. Retorna 1 se núm1 = núm2; caso contrário, retornará 0. Utilize esta função para filtrar um conjunto de valores. Por exemplo, somando várias funções DELTA, você pode calcular a contagem de pares iguais. Esta função também é chamada função Kronecker Delta.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/delta-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obrigatório. O primeiro número."
			},
			number2: {
				name: "number2",
				detail: "Opcional. O segundo número. Se omitido, núm2 será considerado zero."
			}
		}
	},
	ERF: {
		description: "Retorna a função de erro integrada entre limite_inferior e limite_superior.",
		abstract: "Retorna a função de erro integrada entre limite_inferior e limite_superior.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/erf-function"
		}],
		functionParameter: {
			lowerLimit: {
				name: "lower_limit",
				detail: "Obrigatório. O limite inferior na integração de FUNERRO."
			},
			upperLimit: {
				name: "upper_limit",
				detail: "Opcional. O limite superior na integração de FUNERRO. Se omitido, FUNERRO integrará entre zero e limite_inferior."
			}
		}
	},
	ERF_PRECISE: {
		description: "Retorna a função de erro.",
		abstract: "Retorna a função de erro.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/erf-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Obrigatório. O limite inferior na integração de FUNERRO.PRECISO."
		} }
	},
	ERFC: {
		description: "Retorna a função FUNERRO complementar integrada entre x e infinito.",
		abstract: "Retorna a função FUNERRO complementar integrada entre x e infinito.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/erfc-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Obrigatório. O limite inferior na integração de FUNERROCOMPL."
		} }
	},
	ERFC_PRECISE: {
		description: "Retorna a função FUNERRO complementar integrada entre x e infinito.",
		abstract: "Retorna a função FUNERRO complementar integrada entre x e infinito.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/erfc-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Obrigatório. O limite inferior na integração de ERFC.PRECISE."
		} }
	},
	GESTEP: {
		description: "Retorna 1 se núm ≥ passo; caso contrário, retornará 0. Use esta função para filtrar um conjunto de valores. Por exemplo, somando várias funções DEGRAU você calcula a contagem dos valores que excedem um limite.",
		abstract: "Retorna 1 se núm ≥ passo; caso contrário, retornará 0. Use esta função para filtrar um conjunto de valores. Por exemplo, somando várias funções DEGRAU você calcula a contagem dos valores que excedem um limite.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/gestep-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. O valor a ser testado em relação a passo."
			},
			step: {
				name: "step",
				detail: "Opcional. O valor-limite. Se você omitir o valor para passo, DEGRAU usará zero."
			}
		}
	},
	HEX2BIN: {
		description: "Converte um número hexadecimal em binário.",
		abstract: "Converte um número hexadecimal em binário.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/hex2bin-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. O número hexadecimal que você deseja converter. Núm não pode conter mais de 10 caracteres. O bit mais significativo é o bit de sinal (40° bit da direita). Os 9 bits restantes são bits de magnitude. Os números negativos são representados através da notação de complemento a dois."
			},
			places: {
				name: "places",
				detail: "Opcional. O número de caracteres a ser usado. Se casas for omitido, HEXABIN usará o número mínimo de caracteres necessário. Casas é útil para preencher o valor retornado com 0s (zeros) à esquerda."
			}
		}
	},
	HEX2DEC: {
		description: "Converte um número hexadecimal em decimal.",
		abstract: "Converte um número hexadecimal em decimal.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/hex2dec-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório. O número hexadecimal que você deseja converter. Núm não pode conter mais de 10 caracteres (40 bits). O bit mais significativo de núm é o bit de sinal. Os 39 bits restantes são bits de magnitude. Os números negativos são representados com o uso de notação de complemento a dois."
		} }
	},
	HEX2OCT: {
		description: "Converte um número hexadecimal em octal.",
		abstract: "Converte um número hexadecimal em octal.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/hex2oct-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. O número hexadecimal que você deseja converter. Núm não pode conter mais de 10 caracteres. O bit mais significativo de núm é o bit de sinal. Os 39 bits restantes são bits de magnitude. Os números negativos são representados com o uso de notação de complemento a dois."
			},
			places: {
				name: "places",
				detail: "Opcional. O número de caracteres a ser usado. Se casas for omitido, HEXAOCT usará o número mínimo de caracteres necessário. Casas é útil para preencher o valor retornado com 0s (zeros) à esquerda."
			}
		}
	},
	IMABS: {
		description: "Retorna o valor absoluto (módulo) de um número complexo no formato de texto x + yi ou x + yj.",
		abstract: "Retorna o valor absoluto (módulo) de um número complexo no formato de texto x + yi ou x + yj.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/imabs-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Necessário. Um número complexo do qual você deseja obter o valor absoluto."
		} }
	},
	IMAGINARY: {
		description: "Retorna o coeficiente imaginário de um número complexo no formato de texto x + yi ou x + yj.",
		abstract: "Retorna o coeficiente imaginário de um número complexo no formato de texto x + yi ou x + yj.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/imaginary-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obrigatório. Um número complexo do qual se deseja obter um coeficiente imaginário."
		} }
	},
	IMARGUMENT: {
		description: "Retorna o argumento ), um ângulo expresso em radianos, de modo que:",
		abstract: "Retorna o argumento ), um ângulo expresso em radianos, de modo que:",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/imargument-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Necessário. Um número complexo para o qual você deseja o argumento ."
		} }
	},
	IMCONJUGATE: {
		description: "Retorna o conjugado complexo de um número complexo no formato de texto x + yi ou x + yj.",
		abstract: "Retorna o conjugado complexo de um número complexo no formato de texto x + yi ou x + yj.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/imconjugate-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Necessário. Um número complexo do qual se deseja encontrar o conjugado."
		} }
	},
	IMCOS: {
		description: "Retorna o cosseno de um número complexo no formato de texto x + yi ou x + yj.",
		abstract: "Retorna o cosseno de um número complexo no formato de texto x + yi ou x + yj.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/imcos-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Necessário. Um número complexo do qual se deseja obter o cosseno."
		} }
	},
	IMCOSH: {
		description: "Retorna um cosseno hiperbólico de um número complexo em formato de texto x+yi ou x+yj.",
		abstract: "Retorna um cosseno hiperbólico de um número complexo em formato de texto x+yi ou x+yj.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/imcosh-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Necessário. Um número complexo do qual se deseja obter o cosseno hiperbólico."
		} }
	},
	IMCOT: {
		description: "Retorna a cotangente de um número complexo em formato de texto x+yi ou x+yj.",
		abstract: "Retorna a cotangente de um número complexo em formato de texto x+yi ou x+yj.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/imcot-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "O número complexo para o qual você deseja obter a cotangente."
		} }
	},
	IMCOTH: {
		description: "A função IMCOTH retorna a cotangente hiperbólica do número complexo fornecido. Por exemplo, para o número complexo \"x+yi\", retorna \"coth(x+yi)\".",
		abstract: "A função IMCOTH retorna a cotangente hiperbólica do número complexo fornecido. Por exemplo, para o número complexo \"x+yi\", retorna \"coth(x+yi)\".",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9366256?hl=pt-BR"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "O número complexo para o qual você deseja obter a cotangente hiperbólica. Pode ser o resultado de COMPLEX, um número real interpretado como complexo com parte imaginária igual a 0 ou texto no formato “x+yi”, em que x e y são numéricos."
		} }
	},
	IMCSC: {
		description: "Retorna a cossecante de um número complexo em formato de texto x+yi ou x+yj.",
		abstract: "Retorna a cossecante de um número complexo em formato de texto x+yi ou x+yj.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/imcsc-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obrigatório. Um número complexo do qual se deseja obter a cossecante."
		} }
	},
	IMCSCH: {
		description: "Devolve a cossecante hiperbólica de um número complexo no formato de texto x+yi ou x+yj.",
		abstract: "Devolve a cossecante hiperbólica de um número complexo no formato de texto x+yi ou x+yj.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/imcsch-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obrigatório. Um número complexo do qual se deseja obter a cossecante hiperbólica."
		} }
	},
	IMDIV: {
		description: "Retorna o quociente de dois números complexos no formato de texto x + yi ou x + yj.",
		abstract: "Retorna o quociente de dois números complexos no formato de texto x + yi ou x + yj.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/imdiv-function"
		}],
		functionParameter: {
			inumber1: {
				name: "inumber1",
				detail: "Necessário. O numerador ou dividendo complexo."
			},
			inumber2: {
				name: "inumber2",
				detail: "Necessário. O denominador ou divisor complexo."
			}
		}
	},
	IMEXP: {
		description: "Retorna o exponencial de um número complexo no formato de texto x + yi ou x + yj.",
		abstract: "Retorna o exponencial de um número complexo no formato de texto x + yi ou x + yj.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/imexp-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Necessário. Um número complexo do qual se deseja obter o exponencial."
		} }
	},
	IMLN: {
		description: "Retorna o logaritmo natural de um número complexo no formato de texto x + yi ou x + yj.",
		abstract: "Retorna o logaritmo natural de um número complexo no formato de texto x + yi ou x + yj.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/imln-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Necessário. Um número complexo do qual se deseja obter o logaritmo natural."
		} }
	},
	IMLOG: {
		description: "A função IMLOG retorna o logaritmo de um número complexo para uma base especificada.",
		abstract: "A função IMLOG retorna o logaritmo de um número complexo para uma base especificada.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9366486?hl=pt-BR"
		}],
		functionParameter: {
			inumber: {
				name: "inumber",
				detail: "O valor de entrada da função logaritmo. Pode ser um número simples, como 1, interpretado como real, ou texto entre aspas que especifique os coeficientes real e imaginário."
			},
			base: {
				name: "base",
				detail: "A base usada para calcular o logaritmo. Deve ser um número real positivo."
			}
		}
	},
	IMLOG10: {
		description: "Retorna o logaritmo comum (base 10) de um número complexo no formato de texto x + yi ou x + yj.",
		abstract: "Retorna o logaritmo comum (base 10) de um número complexo no formato de texto x + yi ou x + yj.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/imlog10-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obrigatório. Um número complexo do qual se deseja obter o logaritmo comum."
		} }
	},
	IMLOG2: {
		description: "Retorna o logaritmo de base 2 de um número complexo no formato de texto x + yi ou x + yj.",
		abstract: "Retorna o logaritmo de base 2 de um número complexo no formato de texto x + yi ou x + yj.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/imlog2-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obrigatório. Um número complexo do qual se deseja obter o logaritmo de base 2."
		} }
	},
	IMPOWER: {
		description: "Retorna o número complexo no formato de texto x + yi ou x + yj, elevado a uma potência.",
		abstract: "Retorna o número complexo no formato de texto x + yi ou x + yj, elevado a uma potência.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/impower-function"
		}],
		functionParameter: {
			inumber: {
				name: "inumber",
				detail: "Obrigatório. Um número complexo que se deseja elevar a uma potência."
			},
			number: {
				name: "number",
				detail: "Obrigatório. A potência a que se deseja elevar o número complexo."
			}
		}
	},
	IMPRODUCT: {
		description: "Retorna o produto de 1 a 255 números complexos no formato de texto x + yi ou x + yj.",
		abstract: "Retorna o produto de 1 a 255 números complexos no formato de texto x + yi ou x + yj.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/improduct-function"
		}],
		functionParameter: {
			inumber1: {
				name: "inumber1",
				detail: "De 1 a 255 números complexos a multiplicar."
			},
			inumber2: {
				name: "inumber2",
				detail: "De 1 a 255 números complexos a multiplicar."
			}
		}
	},
	IMREAL: {
		description: "Retorna o coeficiente real de um número complexo no formato de texto x + yi ou x + yj.",
		abstract: "Retorna o coeficiente real de um número complexo no formato de texto x + yi ou x + yj.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/imreal-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Necessário. Um número complexo do qual se deseja obter o coeficiente real."
		} }
	},
	IMSEC: {
		description: "Retorna a secante de um número complexo em formato de texto x+yi ou x+yj.",
		abstract: "Retorna a secante de um número complexo em formato de texto x+yi ou x+yj.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/imsec-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Necessário. Um número complexo do qual se deseja obter a secante."
		} }
	},
	IMSECH: {
		description: "Retorna a secante hiperbólica de um número complexo em formato de texto x+yi ou x+yj.",
		abstract: "Retorna a secante hiperbólica de um número complexo em formato de texto x+yi ou x+yj.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/imsech-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Necessário. Um número complexo do qual se deseja obter a secante hiperbólica."
		} }
	},
	IMSIN: {
		description: "Retorna o seno de um número complexo no formato de texto x + yi ou x + yj.",
		abstract: "Retorna o seno de um número complexo no formato de texto x + yi ou x + yj.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/imsin-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Necessário. Um número complexo do qual se deseja obter o seno."
		} }
	},
	IMSINH: {
		description: "A função IMSINH devolve o seno hiperbólico de um número complexo no formato de texto x+yi ou x+yj.",
		abstract: "A função IMSINH devolve o seno hiperbólico de um número complexo no formato de texto x+yi ou x+yj.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/imsinh-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obrigatório. Um número complexo do qual se deseja obter o seno hiperbólico."
		} }
	},
	IMSQRT: {
		description: "Retorna a raiz quadrada de um número complexo no formato de texto x + yi ou x + yj.",
		abstract: "Retorna a raiz quadrada de um número complexo no formato de texto x + yi ou x + yj.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/imsqrt-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Necessário. Um número complexo do qual se deseja obter a raiz quadrada."
		} }
	},
	IMSUB: {
		description: "Retorna a diferença entre dois números complexos no formato de texto x + yi ou x + yj.",
		abstract: "Retorna a diferença entre dois números complexos no formato de texto x + yi ou x + yj.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/imsub-function"
		}],
		functionParameter: {
			inumber1: {
				name: "inumber1",
				detail: "Obrigatório. O número complexo do qual se deseja subtrair inúm2."
			},
			inumber2: {
				name: "inumber2",
				detail: "Obrigatório. O número complexo do qual se deseja subtrair de inúm1."
			}
		}
	},
	IMSUM: {
		description: "Retorna a soma de dois ou mais números complexos no formato de texto x + yi ou x + yj .",
		abstract: "Retorna a soma de dois ou mais números complexos no formato de texto x + yi ou x + yj .",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/imsum-function"
		}],
		functionParameter: {
			inumber1: {
				name: "inumber1",
				detail: "De 1 a 255 números complexos a somar."
			},
			inumber2: {
				name: "inumber2",
				detail: "De 1 a 255 números complexos a somar."
			}
		}
	},
	IMTAN: {
		description: "Retorna a tangente de um número complexo em formato de texto x+yi ou x+yj.",
		abstract: "Retorna a tangente de um número complexo em formato de texto x+yi ou x+yj.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/imtan-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Necessário. Um número complexo do qual se deseja obter a tangente."
		} }
	},
	IMTANH: {
		description: "A função IMTANH retorna a tangente hiperbólica do número complexo fornecido. Por exemplo, para o número complexo \"x+yi\", retorna \"tanh(x+yi)\".",
		abstract: "A função IMTANH retorna a tangente hiperbólica do número complexo fornecido. Por exemplo, para o número complexo \"x+yi\", retorna \"tanh(x+yi)\".",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9366655?hl=pt-BR"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "O número complexo para o qual você deseja obter a tangente hiperbólica. Pode ser o resultado de COMPLEX, um número real interpretado como complexo com parte imaginária igual a 0 ou texto no formato “x+yi”, em que x e y são numéricos."
		} }
	},
	OCT2BIN: {
		description: "Converte um número octal em binário.",
		abstract: "Converte um número octal em binário.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/oct2bin-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. O número octal que você deseja converter. O número não pode conter mais que 10 caracteres. O bit mais significativo do número é o bit de sinal. Os outros 29 bits são bits de magnitudes. Os números negativos são representados com o uso de notação de complemento a dois."
			},
			places: {
				name: "places",
				detail: "Opcional. O número de caracteres a ser usado. Se casas for omitido, OCTABIN usará o número mínimo de caracteres necessário. Casas é útil para preencher o valor retornado com 0 (zeros) à esquerda."
			}
		}
	},
	OCT2DEC: {
		description: "Converte um número octal em decimal.",
		abstract: "Converte um número octal em decimal.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/oct2dec-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório. O número octal que você deseja converter. Núm não pode conter mais de 10 caracteres octais (30 bits). Os bits mais significativos de núm é o bit de sinal. Os outros 29 bits são bits de magnitudes. Os números negativos são representados com o uso de notação de complemento a dois."
		} }
	},
	OCT2HEX: {
		description: "Converte um número octal em hexadecimal.",
		abstract: "Converte um número octal em hexadecimal.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/oct2hex-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. O número octal que você deseja converter. Núm não pode conter mais de 10 caracteres octais (30 bits). Os bits mais significativos de núm é o bit de sinal. Os outros 29 bits são bits de magnitudes. Os números negativos são representados com o uso de notação de complemento a dois."
			},
			places: {
				name: "places",
				detail: "Opcional. O número de caracteres a ser usado. Se casas for omitido, OCTAHEX usará o número mínimo de caracteres necessário. Casas é útil para preencher o valor retornado com 0 (zeros) à esquerda."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/financial/pt-BR.ts
const locale$9 = {
	ACCRINT: {
		description: "Retorna a taxa de juros acumulados de um título que paga uma taxa periódica de juros.",
		abstract: "Retorna a taxa de juros acumulados de um título que paga uma taxa periódica de juros.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/accrint-function"
		}],
		functionParameter: {
			issue: {
				name: "issue",
				detail: "Obrigatório. A data de emissão do título."
			},
			firstInterest: {
				name: "first_interest",
				detail: "Obrigatório. A primeira data de juros do título."
			},
			settlement: {
				name: "settlement",
				detail: "Obrigatório. A data de liquidação do título. A data de liquidação do título é a data após a data de emissão em que o título foi negociado com o cliente."
			},
			rate: {
				name: "rate",
				detail: "Obrigatório. A taxa de cupom anual do título."
			},
			par: {
				name: "par",
				detail: "Obrigatório. O valor nominal do título. Se ele for omitido, JUROSACUM usará R$ 1.000."
			},
			frequency: {
				name: "frequency",
				detail: "Obrigatório. O número de pagamentos de cupom por ano. Para pagamento anual, frequência = 1; para semestral, frequência = 2; para trimestral, frequência = 4."
			},
			basis: {
				name: "basis",
				detail: "Opcional. O tipo de base de contagem diária a ser usado."
			},
			calcMethod: {
				name: "calc_method",
				detail: "Opcional. Um valor lógico que especifica o modo de calcular o total de juros acumulados quando a data da liquidação for posterior à data do primeiro_juro. Um valor VERDADEIRO (1) retorna o total de juros acumulados desde a emissão até a liquidação. Um valor FALSO (0) retorna os juros acumulados de primeiro_juro até a liquidação. Se você não inserir o argumento, ele será padronizado como VERDADEIRO."
			}
		}
	},
	ACCRINTM: {
		description: "Retorna os juros acumulados de um título que paga juros no vencimento.",
		abstract: "Retorna os juros acumulados de um título que paga juros no vencimento.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/accrintm-function"
		}],
		functionParameter: {
			issue: {
				name: "issue",
				detail: "Necessário. A data de emissão do título."
			},
			settlement: {
				name: "settlement",
				detail: "Necessário. A data de vencimento do título."
			},
			rate: {
				name: "rate",
				detail: "Necessário. A taxa de cupom anual do título."
			},
			par: {
				name: "par",
				detail: "Necessário. O valor nominal do título. Se ele for omitido, JUROSACUMV usará R$ 1.000."
			},
			basis: {
				name: "basis",
				detail: "Opcional. O tipo de base de contagem diária a ser usado."
			}
		}
	},
	AMORDEGRC: {
		description: "Retorna a depreciação para cada período contábil. Esta função é fornecida para o sistema contábil francês. Se um ativo for adquirido no meio do período contábil, a depreciação pro rata deverá ser considerada. A função é semelhante a AMORLINC, a única diferença é que um coeficiente de depreciação é aplicado no cálculo dependendo do tempo de vida do ativo.",
		abstract: "Retorna a depreciação para cada período contábil. Esta função é fornecida para o sistema contábil francês. Se um ativo for adquirido no meio do período contábil, a depreciação pro rata deverá ser considerada. A função é semelhante a AMORLINC, a única diferença é que um coeficiente de depreciação é aplicado no cálculo dependendo do tempo de vida do ativo.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/amordegrc-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Obrigatório. O custo do ativo."
			},
			datePurchased: {
				name: "date_purchased",
				detail: "Obrigatório. A data em que o ativo foi comprado."
			},
			firstPeriod: {
				name: "first_period",
				detail: "Obrigatório. A data do final do primeiro período."
			},
			salvage: {
				name: "salvage",
				detail: "Obrigatório. O valor de recuperação no final da vida útil do ativo."
			},
			period: {
				name: "period",
				detail: "Obrigatório. O período."
			},
			rate: {
				name: "rate",
				detail: "Obrigatório. A taxa de depreciação."
			},
			basis: {
				name: "basis",
				detail: "Opcional. O ano-base a ser adotado."
			}
		}
	},
	AMORLINC: {
		description: "Retorna a depreciação para cada período contábil. Esta função é fornecida para o sistema contábil francês. Se um ativo for adquirido no meio do período contábil, a depreciação pro rata deverá ser considerada.",
		abstract: "Retorna a depreciação para cada período contábil. Esta função é fornecida para o sistema contábil francês. Se um ativo for adquirido no meio do período contábil, a depreciação pro rata deverá ser considerada.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/amorlinc-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Obrigatório. O custo do ativo."
			},
			datePurchased: {
				name: "date_purchased",
				detail: "Obrigatório. A data em que o ativo foi comprado."
			},
			firstPeriod: {
				name: "first_period",
				detail: "Obrigatório. A data do final do primeiro período."
			},
			salvage: {
				name: "salvage",
				detail: "Obrigatório. O valor de recuperação no final da vida útil do ativo."
			},
			period: {
				name: "period",
				detail: "Obrigatório. O período."
			},
			rate: {
				name: "rate",
				detail: "Obrigatório. A taxa de depreciação."
			},
			basis: {
				name: "basis",
				detail: "Opcional. O ano-base a ser adotado."
			}
		}
	},
	COUPDAYBS: {
		description: "A função CUPDIASINLIQ retorna o número de dias entre o início do período do cupom e sua data de liquidação.",
		abstract: "A função CUPDIASINLIQ retorna o número de dias entre o início do período do cupom e sua data de liquidação.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/coupdaybs-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Necessário. A data de liquidação do título. A data de liquidação do título é a data após a data de emissão em que o título foi negociado com o cliente."
			},
			maturity: {
				name: "maturity",
				detail: "Necessário. A data de vencimento do título. A data de vencimento é a data em que o título expira."
			},
			frequency: {
				name: "frequency",
				detail: "Necessário. O número de pagamentos de cupom por ano. Para pagamento anual, frequência = 1; para semestral, frequência = 2; para trimestral, frequência = 4."
			},
			basis: {
				name: "basis",
				detail: "Opcional. O tipo de base de contagem diária a ser usado."
			}
		}
	},
	COUPDAYS: {
		description: "Retorna o número de dias no período de cupom que contém a data de quitação.",
		abstract: "Retorna o número de dias no período de cupom que contém a data de quitação.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/coupdays-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obrigatório. A data de liquidação do título. A data de liquidação do título é a data após a data de emissão em que o título foi negociado com o cliente."
			},
			maturity: {
				name: "maturity",
				detail: "Obrigatório. A data de vencimento do título. A data de vencimento é a data em que o título expira."
			},
			frequency: {
				name: "frequency",
				detail: "Obrigatório. O número de pagamentos de cupom por ano. Para pagamento anual, frequência = 1; para semestral, frequência = 2; para trimestral, frequência = 4."
			},
			basis: {
				name: "basis",
				detail: "Opcional. O tipo de base de contagem diária a ser usado."
			}
		}
	},
	COUPDAYSNC: {
		description: "Retorna o número de dias da data de liquidação até a data do próximo cupom.",
		abstract: "Retorna o número de dias da data de liquidação até a data do próximo cupom.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/coupdaysnc-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Necessário. A data de liquidação do título. A data de liquidação do título é a data após a data de emissão em que o título foi negociado com o cliente."
			},
			maturity: {
				name: "maturity",
				detail: "Necessário. A data de vencimento do título. A data de vencimento é a data em que o título expira."
			},
			frequency: {
				name: "frequency",
				detail: "Necessário. O número de pagamentos de cupom por ano. Para pagamento anual, frequência = 1; para semestral, frequência = 2; para trimestral, frequência = 4."
			},
			basis: {
				name: "basis",
				detail: "Opcional. O tipo de base de contagem diária a ser usado."
			}
		}
	},
	COUPNCD: {
		description: "Retorna um número que representa a próxima data de cupom após a data de liquidação.",
		abstract: "Retorna um número que representa a próxima data de cupom após a data de liquidação.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/coupncd-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Necessário. A data de liquidação do título. A data de liquidação do título é a data após a data de emissão em que o título foi negociado com o cliente."
			},
			maturity: {
				name: "maturity",
				detail: "Necessário. A data de vencimento do título. A data de vencimento é a data em que o título expira."
			},
			frequency: {
				name: "frequency",
				detail: "Necessário. O número de pagamentos de cupom por ano. Para pagamento anual, frequência = 1; para semestral, frequência = 2; para trimestral, frequência = 4."
			},
			basis: {
				name: "basis",
				detail: "Opcional. O tipo de base de contagem diária a ser usado."
			}
		}
	},
	COUPNUM: {
		description: "Retorna o número de cupons pagáveis entre a data de liquidação e a data de vencimento, arredondado para o próximo cupom inteiro.",
		abstract: "Retorna o número de cupons pagáveis entre a data de liquidação e a data de vencimento, arredondado para o próximo cupom inteiro.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/coupnum-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Necessário. A data de liquidação do título. A data de liquidação do título é a data após a data de emissão em que o título foi negociado com o cliente."
			},
			maturity: {
				name: "maturity",
				detail: "Necessário. A data de vencimento do título. A data de vencimento é a data em que o título expira."
			},
			frequency: {
				name: "frequency",
				detail: "Necessário. O número de pagamentos de cupom por ano. Para pagamento anual, frequência = 1; para semestral, frequência = 2; para trimestral, frequência = 4."
			},
			basis: {
				name: "basis",
				detail: "Opcional. O tipo de base de contagem diária a ser usado."
			}
		}
	},
	COUPPCD: {
		description: "Retorna um número que representa a data de cupom antes da data de liquidação.",
		abstract: "Retorna um número que representa a data de cupom antes da data de liquidação.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/couppcd-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Necessário. A data de liquidação do título. A data de liquidação do título é a data após a data de emissão em que o título foi negociado com o cliente."
			},
			maturity: {
				name: "maturity",
				detail: "Necessário. A data de vencimento do título. A data de vencimento é a data em que o título expira."
			},
			frequency: {
				name: "frequency",
				detail: "Necessário. O número de pagamentos de cupom por ano. Para pagamento anual, frequência = 1; para semestral, frequência = 2; para trimestral, frequência = 4."
			},
			basis: {
				name: "basis",
				detail: "Opcional. O tipo de base de contagem diária a ser usado."
			}
		}
	},
	CUMIPMT: {
		description: "Retorna os juros acumulados pagos por um empréstimo entre início_período e final_período.",
		abstract: "Retorna os juros acumulados pagos por um empréstimo entre início_período e final_período.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/cumipmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Necessário. A taxa de juros."
			},
			nper: {
				name: "nper",
				detail: "Necessário. O número total de períodos de pagamentos."
			},
			pv: {
				name: "pv",
				detail: "Necessário. O valor presente."
			},
			startPeriod: {
				name: "start_period",
				detail: "Necessário. O primeiro período no cálculo. Os períodos de pagamento são numerados começando por 1."
			},
			endPeriod: {
				name: "end_period",
				detail: "Necessário. O último período no cálculo."
			},
			type: {
				name: "type",
				detail: "Necessário. Indica quando o pagamento será efetuado."
			}
		}
	},
	CUMPRINC: {
		description: "Retorna o capital acumulado pago sobre um empréstimo entre início_período e final_período.",
		abstract: "Retorna o capital acumulado pago sobre um empréstimo entre início_período e final_período.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/cumprinc-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Obrigatório. A taxa de juros."
			},
			nper: {
				name: "nper",
				detail: "Obrigatório. O número total de períodos de pagamentos."
			},
			pv: {
				name: "pv",
				detail: "Obrigatório. O valor presente."
			},
			startPeriod: {
				name: "start_period",
				detail: "Obrigatório. O primeiro período no cálculo. Os períodos de pagamento são numerados começando por 1."
			},
			endPeriod: {
				name: "end_period",
				detail: "Obrigatório. O último período no cálculo."
			},
			type: {
				name: "type",
				detail: "Obrigatório. Indica quando o pagamento será efetuado."
			}
		}
	},
	DB: {
		description: "Retorna a depreciação de um ativo para um período especificado, usando o método de balanço de declínio fixo.",
		abstract: "Retorna a depreciação de um ativo para um período especificado, usando o método de balanço de declínio fixo.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/db-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Obrigatório. O custo inicial do ativo."
			},
			salvage: {
				name: "salvage",
				detail: "Obrigatório. O valor no final da depreciação (às vezes chamado de valor de recuperação do ativo)."
			},
			life: {
				name: "life",
				detail: "Obrigatório. O número de períodos em que o ativo está se depreciando (às vezes chamado de vida útil do ativo)."
			},
			period: {
				name: "period",
				detail: "Obrigatório. O período com relação ao qual você deseja calcular a depreciação. O período deve usar as mesmas unidades de vida útil."
			},
			month: {
				name: "month",
				detail: "Opcional. O número de meses do primeiro ano. Se mês for omitido, será presumido como 12."
			}
		}
	},
	DDB: {
		description: "Retorna a depreciação de um ativo para um período especificado usando o método de saldo decrescente duplo ou outro método que você especificar.",
		abstract: "Retorna a depreciação de um ativo para um período especificado usando o método de saldo decrescente duplo ou outro método que você especificar.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/ddb-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "O custo inicial do ativo."
			},
			salvage: {
				name: "salvage",
				detail: "O valor ao final da depreciação, também chamado de valor residual do ativo."
			},
			life: {
				name: "life",
				detail: "O número de períodos durante os quais o ativo será depreciado, também chamado de vida útil do ativo."
			},
			period: {
				name: "period",
				detail: "O período para o qual você deseja calcular a depreciação."
			},
			factor: {
				name: "factor",
				detail: "A taxa de redução do saldo. Se omitido, será considerado 2, pelo método de saldo decrescente duplo."
			}
		}
	},
	DISC: {
		description: "Retorna a taxa de desconto de um título.",
		abstract: "Retorna a taxa de desconto de um título.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/disc-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obrigatório. A data de liquidação do título. A data de liquidação do título é a data após a data de emissão em que o título foi negociado com o cliente."
			},
			maturity: {
				name: "maturity",
				detail: "Obrigatório. A data de vencimento do título. A data de vencimento é a data em que o título expira."
			},
			pr: {
				name: "pr",
				detail: "Obrigatório. O preço do título por R$ 100 de valor nominal."
			},
			redemption: {
				name: "redemption",
				detail: "Obrigatório. O valor de resgate do título por R$ 100 de valor nominal."
			},
			basis: {
				name: "basis",
				detail: "Opcional. O tipo de base de contagem diária a ser usado."
			}
		}
	},
	DOLLARDE: {
		description: "Converte um preço em dólares expresso como fração em um preço em dólares expresso como número decimal.",
		abstract: "Converte um preço em dólares expresso como fração em um preço em dólares expresso como número decimal.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/dollarde-function"
		}],
		functionParameter: {
			fractionalDollar: {
				name: "fractional_dollar",
				detail: "Um número expresso como parte inteira e parte fracionária, separadas por um símbolo decimal."
			},
			fraction: {
				name: "fraction",
				detail: "O inteiro a ser usado no denominador da fração."
			}
		}
	},
	DOLLARFR: {
		description: "Use MOEDAFRA para converter preços em forma decimal, em frações, como preços de seguros.",
		abstract: "Use MOEDAFRA para converter preços em forma decimal, em frações, como preços de seguros.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/dollarfr-function"
		}],
		functionParameter: {
			decimalDollar: {
				name: "decimal_dollar",
				detail: "Necessário. Um número decimal."
			},
			fraction: {
				name: "fraction",
				detail: "Necessário. O inteiro a ser usado no denominador da fração."
			}
		}
	},
	DURATION: {
		description: "A função DURAÇÃO , uma das funções Financeiras , devolve a duração de Macauley para um valor nominal assumido de 100 $. A duração é definida como a média ponderada do valor atual dos fluxos monetários e é utilizada como medida da resposta do preço de uma obrigação às alterações no rendimento.",
		abstract: "A função DURAÇÃO , uma das funções Financeiras , devolve a duração de Macauley para um valor nominal assumido de 100 $. A duração é definida como a média ponderada do valor atual dos fluxos monetários e é utilizada como medida da resposta do preço de uma obrigação às alterações no rendimento.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/duration-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obrigatório. A data de liquidação do título. A data de liquidação do título é a data após a data de emissão em que o título foi negociado com o cliente."
			},
			maturity: {
				name: "maturity",
				detail: "Obrigatório. A data de vencimento do título. A data de vencimento é a data em que o título expira."
			},
			coupon: {
				name: "coupon",
				detail: "Obrigatório. A taxa de cupom anual do título."
			},
			yld: {
				name: "yld",
				detail: "Obrigatório. O rendimento anual do título."
			},
			frequency: {
				name: "frequency",
				detail: "Obrigatório. O número de pagamentos de cupom por ano. Para pagamento anual, frequência = 1; para semestral, frequência = 2; para trimestral, frequência = 4."
			},
			basis: {
				name: "basis",
				detail: "Opcional. O tipo de base de contagem diária a ser usado."
			}
		}
	},
	EFFECT: {
		description: "Retorna a taxa de juros anual efetiva, dados a taxa de juros anual nominal e o número de períodos compostos por ano.",
		abstract: "Retorna a taxa de juros anual efetiva, dados a taxa de juros anual nominal e o número de períodos compostos por ano.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/effect-function"
		}],
		functionParameter: {
			nominalRate: {
				name: "nominal_rate",
				detail: "Obrigatório. A taxa de juros nominal."
			},
			npery: {
				name: "npery",
				detail: "Obrigatório. O número de períodos compostos por ano."
			}
		}
	},
	FV: {
		description: "VF , uma das funções financeiras , calcula o valor futuro de um investimento com base em uma taxa de juros constante. Você pode usar VF com pagamentos periódicos e constantes ou um pagamento de quantia única.",
		abstract: "VF , uma das funções financeiras , calcula o valor futuro de um investimento com base em uma taxa de juros constante. Você pode usar VF com pagamentos periódicos e constantes ou um pagamento de quantia única.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/fv-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Obrigatório. A taxa de juros por período."
			},
			nper: {
				name: "nper",
				detail: "Obrigatório. O número total de períodos de pagamento em uma anuidade."
			},
			pmt: {
				name: "pmt",
				detail: "Obrigatório. O pagamento feito a cada período; não pode mudar durante a vigência da anuidade. Geralmente, pgto contém o capital e os juros e nenhuma outra tarifa ou taxas. Se pgto for omitido, você deverá incluir o argumento vp."
			},
			pv: {
				name: "pv",
				detail: "Opcional. O valor presente ou a soma total correspondente ao valor presente de uma série de pagamentos futuros. Se vp for omitido, será considerado 0 (zero) e a inclusão do argumento pgto será obrigatória."
			},
			type: {
				name: "type",
				detail: "Opcional. O número 0 ou 1 e indica as datas de vencimento dos pagamentos. Se tipo for omitido, será considerado 0."
			}
		}
	},
	FVSCHEDULE: {
		description: "Retorna o valor futuro de um capital inicial após a aplicação de uma série de taxas de juros compostos. Use VFPLANO para calcular o valor futuro de um investimento com uma taxa variável ou ajustável.",
		abstract: "Retorna o valor futuro de um capital inicial após a aplicação de uma série de taxas de juros compostos. Use VFPLANO para calcular o valor futuro de um investimento com uma taxa variável ou ajustável.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/fvschedule-function"
		}],
		functionParameter: {
			principal: {
				name: "principal",
				detail: "Necessário. O valor presente."
			},
			schedule: {
				name: "schedule",
				detail: "Necessário. Uma matriz de taxas de juros a ser aplicada."
			}
		}
	},
	INTRATE: {
		description: "Retorna a taxa de juros de um título totalmente investido.",
		abstract: "Retorna a taxa de juros de um título totalmente investido.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/intrate-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Necessário. A data de liquidação do título. A data de liquidação do título é a data após a data de emissão em que o título foi negociado com o cliente."
			},
			maturity: {
				name: "maturity",
				detail: "Necessário. A data de vencimento do título. A data de vencimento é a data em que o título expira."
			},
			investment: {
				name: "investment",
				detail: "Necessário. A quantia investida no título."
			},
			redemption: {
				name: "redemption",
				detail: "Necessário. A quantia recebida no vencimento."
			},
			basis: {
				name: "basis",
				detail: "Opcional. O tipo de base de contagem diária a ser usado."
			}
		}
	},
	IPMT: {
		description: "Retorna o pagamento de juros para um determinado período de investimento de acordo com pagamentos periódicos e constantes e com uma taxa de juros constante.",
		abstract: "Retorna o pagamento de juros para um determinado período de investimento de acordo com pagamentos periódicos e constantes e com uma taxa de juros constante.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/ipmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Obrigatório. A taxa de juros por período."
			},
			per: {
				name: "per",
				detail: "Obrigatório. O período cujos juros se deseja saber e deve estar no intervalo entre 1 e nper."
			},
			nper: {
				name: "nper",
				detail: "Obrigatório. O número total de períodos de pagamento em uma anuidade."
			},
			pv: {
				name: "pv",
				detail: "Obrigatório. O valor presente ou a soma total correspondente ao valor presente de uma série de pagamentos futuros."
			},
			fv: {
				name: "fv",
				detail: "Opcional. O valor futuro, ou o saldo, que você deseja obter depois do último pagamento. Se vf for omitido, será considerado 0 (o valor futuro de um empréstimo, por exemplo, é 0)."
			},
			type: {
				name: "type",
				detail: "Opcional. O número 0 ou 1 e indica as datas de vencimento dos pagamentos. Se tipo for omitido, será considerado 0."
			}
		}
	},
	IRR: {
		description: "Retorna a taxa interna de retorno de uma sequência de fluxos de caixa representada pelos números em valores. Estes fluxos de caixa não precisam ser iguais como no caso de uma anuidade. Entretanto, os fluxos de caixa devem ser feitos em intervalos regulares, como mensalmente ou anualmente. A taxa interna de retorno é a taxa de juros recebida para um investimento que consiste em pagamentos (valores negativos) e receitas (valores positivos) que ocorrem em períodos regulares.",
		abstract: "Retorna a taxa interna de retorno de uma sequência de fluxos de caixa representada pelos números em valores. Estes fluxos de caixa não precisam ser iguais como no caso de uma anuidade. Entretanto, os fluxos de caixa devem ser feitos em intervalos regulares, como mensalmente ou anualmente. A taxa interna de retorno é a taxa de juros recebida para um investimento que consiste em pagamentos (valores negativos) e receitas (valores positivos) que ocorrem em períodos regulares.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/irr-function"
		}],
		functionParameter: {
			values: {
				name: "values",
				detail: "Uma matriz ou referência a células que contêm os números para os quais você deseja calcular a taxa interna de retorno. Deve conter pelo menos um valor positivo e um negativo; texto, valores lógicos e células vazias são ignorados."
			},
			guess: {
				name: "guess",
				detail: "Um número que você estima estar próximo do resultado de TIR."
			}
		}
	},
	ISPMT: {
		description: "Calcula os juros pagos durante um período específico de um investimento.",
		abstract: "Calcula os juros pagos durante um período específico de um investimento.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/ispmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "A taxa de juros do investimento."
			},
			per: {
				name: "per",
				detail: "O período para o qual você deseja encontrar os juros; deve estar entre 1 e nper."
			},
			nper: {
				name: "nper",
				detail: "O número total de períodos de pagamento do investimento."
			},
			pv: {
				name: "pv",
				detail: "O valor presente do investimento. Para um empréstimo, pv é o valor do empréstimo."
			}
		}
	},
	MDURATION: {
		description: "Retorna a duração Macauley modificada para um título com um valor de paridade equivalente a R$ 100.",
		abstract: "Retorna a duração Macauley modificada para um título com um valor de paridade equivalente a R$ 100.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/mduration-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Necessário. A data de liquidação do título. A data de liquidação do título é a data após a data de emissão em que o título foi negociado com o cliente."
			},
			maturity: {
				name: "maturity",
				detail: "Necessário. A data de vencimento do título. A data de vencimento é a data em que o título expira."
			},
			coupon: {
				name: "coupon",
				detail: "Necessário. A taxa de cupom anual do título."
			},
			yld: {
				name: "yld",
				detail: "Necessário. O rendimento anual do título."
			},
			frequency: {
				name: "frequency",
				detail: "Necessário. O número de pagamentos de cupom por ano. Para pagamento anual, frequência = 1; para semestral, frequência = 2; para trimestral, frequência = 4."
			},
			basis: {
				name: "basis",
				detail: "Opcional. O tipo de base de contagem diária a ser usado."
			}
		}
	},
	MIRR: {
		description: "Retorna a taxa interna de retorno modificada para uma série de fluxos de caixa periódicos. MTIR considera o custo do investimento e os juros recebidos no reinvestimento do capital.",
		abstract: "Retorna a taxa interna de retorno modificada para uma série de fluxos de caixa periódicos. MTIR considera o custo do investimento e os juros recebidos no reinvestimento do capital.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/mirr-function"
		}],
		functionParameter: {
			values: {
				name: "values",
				detail: "Obrigatório. Uma matriz ou referência a células que contêm números. Estes números representam uma série de pagamentos (valores negativos) e receitas (valores positivos) que ocorrem em períodos regulares. Os valores têm de conter pelo menos um valor positivo e um valor negativo para calcular a taxa interna de retorno modificada. Caso contrário, o MIRR devolve o #DIV/0! valor de erro. Se uma matriz ou argumento de referência contiver texto, valores lógicos ou células vazias, estes valores serão ignorados; no entanto, células com valor zero serão incluídas."
			},
			financeRate: {
				name: "finance_rate",
				detail: "Obrigatório. A taxa de juros paga sobre o dinheiro usado nos fluxos de caixa."
			},
			reinvestRate: {
				name: "reinvest_rate",
				detail: "Obrigatório. A taxa de juros recebida nos fluxos de caixa ao reinvesti-los."
			}
		}
	},
	NOMINAL: {
		description: "Retorna a taxa de juros nominal anual.",
		abstract: "Retorna a taxa de juros nominal anual.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/nominal-function"
		}],
		functionParameter: {
			effectRate: {
				name: "effect_rate",
				detail: "A taxa de juros efetiva."
			},
			npery: {
				name: "npery",
				detail: "O número de períodos de capitalização por ano."
			}
		}
	},
	NPER: {
		description: "Retorna o número de períodos para investimento de acordo com pagamentos constantes e periódicos e uma taxa de juros constante.",
		abstract: "Retorna o número de períodos para investimento de acordo com pagamentos constantes e periódicos e uma taxa de juros constante.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/nper-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Obrigatório. A taxa de juros por período."
			},
			pmt: {
				name: "pmt",
				detail: "Obrigatório. O pagamento feito a cada período; não pode mudar durante a vigência da anuidade. Geralmente, pgto contém o capital e os juros e nenhuma outra tarifa ou taxas."
			},
			pv: {
				name: "pv",
				detail: "Obrigatório. O valor presente ou a soma total correspondente ao valor presente de uma série de pagamentos futuros."
			},
			fv: {
				name: "fv",
				detail: "Opcional. O valor futuro, ou o saldo, que você deseja obter depois do último pagamento. Se vf for omitido, será considerado 0 (o valor futuro de um empréstimo, por exemplo, é 0)."
			},
			type: {
				name: "type",
				detail: "Opcional. O número 0 ou 1 e indica as datas de vencimento."
			}
		}
	},
	NPV: {
		description: "Retorna o valor presente líquido de um investimento com base em uma série de fluxos de caixa periódicos e uma taxa de desconto.",
		abstract: "Retorna o valor presente líquido de um investimento com base em uma série de fluxos de caixa periódicos e uma taxa de desconto.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/npv-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "A taxa de desconto durante um período."
			},
			value1: {
				name: "value1",
				detail: "De 1 a 254 argumentos que representam pagamentos e receitas."
			},
			value2: {
				name: "value2",
				detail: "De 1 a 254 argumentos que representam pagamentos e receitas."
			}
		}
	},
	ODDFPRICE: {
		description: "Retorna o preço por valor nominal de $100 de um título com primeiro período irregular.",
		abstract: "Retorna o preço por valor nominal de $100 de um título com primeiro período irregular.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/oddfprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "A data de liquidação do título."
			},
			maturity: {
				name: "maturity",
				detail: "A data de vencimento do título."
			},
			issue: {
				name: "issue",
				detail: "A data de emissão do título."
			},
			firstCoupon: {
				name: "first_coupon",
				detail: "A data do primeiro cupom do título."
			},
			rate: {
				name: "rate",
				detail: "A taxa de juros do título."
			},
			yld: {
				name: "yld",
				detail: "O rendimento anual do título."
			},
			redemption: {
				name: "redemption",
				detail: "O valor de resgate do título por R$ 100 de valor nominal."
			},
			frequency: {
				name: "frequency",
				detail: "O número de pagamentos de cupom por ano: 1 para anual, 2 para semestral e 4 para trimestral."
			},
			basis: {
				name: "basis",
				detail: "O tipo de base de contagem de dias a ser usado."
			}
		}
	},
	ODDFYIELD: {
		description: "Retorna o rendimento de um título com primeiro período irregular.",
		abstract: "Retorna o rendimento de um título com primeiro período irregular.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/oddfyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "A data de liquidação do título."
			},
			maturity: {
				name: "maturity",
				detail: "A data de vencimento do título."
			},
			issue: {
				name: "issue",
				detail: "A data de emissão do título."
			},
			firstCoupon: {
				name: "first_coupon",
				detail: "A data do primeiro cupom do título."
			},
			rate: {
				name: "rate",
				detail: "A taxa de juros do título."
			},
			pr: {
				name: "pr",
				detail: "O preço do título."
			},
			redemption: {
				name: "redemption",
				detail: "O valor de resgate do título por R$ 100 de valor nominal."
			},
			frequency: {
				name: "frequency",
				detail: "O número de pagamentos de cupom por ano: 1 para anual, 2 para semestral e 4 para trimestral."
			},
			basis: {
				name: "basis",
				detail: "O tipo de base de contagem de dias a ser usado."
			}
		}
	},
	ODDLPRICE: {
		description: "Retorna o preço por R$ 100,00 de valor nominal de um título com um último período de cupom (curto ou longo) indefinido.",
		abstract: "Retorna o preço por R$ 100,00 de valor nominal de um título com um último período de cupom (curto ou longo) indefinido.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/oddlprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Necessário. A data de liquidação do título. A data de liquidação do título é a data após a data de emissão em que o título foi negociado com o cliente."
			},
			maturity: {
				name: "maturity",
				detail: "Necessário. A data de vencimento do título. A data de vencimento é a data em que o título expira."
			},
			lastInterest: {
				name: "last_interest",
				detail: "Necessário. A data do último cupom do título."
			},
			rate: {
				name: "rate",
				detail: "Necessário. A taxa de juros do título."
			},
			yld: {
				name: "yld",
				detail: "Necessário. O rendimento anual do título."
			},
			redemption: {
				name: "redemption",
				detail: "Necessário. O valor de resgate do título por R$ 100 de valor nominal."
			},
			frequency: {
				name: "frequency",
				detail: "Necessário. O número de pagamentos de cupom por ano. Para pagamento anual, frequência = 1; para semestral, frequência = 2; para trimestral, frequência = 4."
			},
			basis: {
				name: "basis",
				detail: "Opcional. O tipo de base de contagem diária a ser usado."
			}
		}
	},
	ODDLYIELD: {
		description: "Retorna o rendimento de um título com um último período (curto ou longo) indefinido.",
		abstract: "Retorna o rendimento de um título com um último período (curto ou longo) indefinido.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/oddlyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obrigatório. A data de liquidação do título. A data de liquidação do título é a data após a data de emissão em que o título foi negociado com o cliente."
			},
			maturity: {
				name: "maturity",
				detail: "Obrigatório. A data de vencimento do título. A data de vencimento é a data em que o título expira."
			},
			lastInterest: {
				name: "last_interest",
				detail: "Obrigatório. A data do último cupom do título."
			},
			rate: {
				name: "rate",
				detail: "Obrigatório. A taxa de juros do título"
			},
			pr: {
				name: "pr",
				detail: "Obrigatório. O preço do título."
			},
			redemption: {
				name: "redemption",
				detail: "Obrigatório. O valor de resgate do título por R$ 100 de valor nominal."
			},
			frequency: {
				name: "frequency",
				detail: "Obrigatório. O número de pagamentos de cupom por ano. Para pagamento anual, frequência = 1; para semestral, frequência = 2; para trimestral, frequência = 4."
			},
			basis: {
				name: "basis",
				detail: "Opcional. O tipo de base de contagem diária a ser usado."
			}
		}
	},
	PDURATION: {
		description: "Retorna o número de períodos necessários para um investimento alcançar um valor especificado.",
		abstract: "Retorna o número de períodos necessários para um investimento alcançar um valor especificado.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/pduration-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Obrigatório. Taxa é a taxa de juros por período."
			},
			pv: {
				name: "pv",
				detail: "Obrigatório. Va é o valor atual do investimento."
			},
			fv: {
				name: "fv",
				detail: "Obrigatório. Vf é o valor futuro desejado do investimento."
			}
		}
	},
	PMT: {
		description: "PGTO , uma das funções financeiras , calcula o pagamento de um empréstimo de acordo com pagamentos constantes e com uma taxa de juros constante.",
		abstract: "PGTO , uma das funções financeiras , calcula o pagamento de um empréstimo de acordo com pagamentos constantes e com uma taxa de juros constante.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/pmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Obrigatório. A taxa de juros para o empréstimo."
			},
			nper: {
				name: "nper",
				detail: "Obrigatório. O número total de pagamentos pelo empréstimo."
			},
			pv: {
				name: "pv",
				detail: "Obrigatório. O valor presente, ou a quantia total agora equivalente a uma série de pagamentos futuros; também conhecido como principal."
			},
			fv: {
				name: "fv",
				detail: "Opcional. O valor futuro, ou o saldo, que você deseja obter depois do último pagamento. Se vf for omitido, será considerado 0 (o valor futuro de determinado empréstimo, por exemplo, 0)."
			},
			type: {
				name: "type",
				detail: "Opcional. O número 0 (zero) ou 1 e indica o vencimento dos pagamentos."
			}
		}
	},
	PPMT: {
		description: "Retorna o pagamento do principal de um investimento em um período determinado.",
		abstract: "Retorna o pagamento do principal de um investimento em um período determinado.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/ppmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "A taxa de juros por período."
			},
			per: {
				name: "per",
				detail: "O período para o qual você deseja encontrar os juros; deve estar no intervalo de 1 a nper."
			},
			nper: {
				name: "nper",
				detail: "O número total de períodos de pagamento de uma anuidade."
			},
			pv: {
				name: "pv",
				detail: "O valor presente, ou o valor total que uma série de pagamentos futuros vale agora."
			},
			fv: {
				name: "fv",
				detail: "O valor futuro, ou o saldo em dinheiro que você deseja atingir após o último pagamento."
			},
			type: {
				name: "type",
				detail: "O número 0 ou 1 que indica quando os pagamentos vencem."
			}
		}
	},
	PRICE: {
		description: "Retorna a preço por R$ 100,00 de valor nominal de um título que paga juros periódicos.",
		abstract: "Retorna a preço por R$ 100,00 de valor nominal de um título que paga juros periódicos.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/price-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obrigatório. A data de liquidação do título. A data de liquidação do título é a data após a data de emissão em que o título foi negociado com o cliente."
			},
			maturity: {
				name: "maturity",
				detail: "Obrigatório. A data de vencimento do título. A data de vencimento é a data em que o título expira."
			},
			rate: {
				name: "rate",
				detail: "Obrigatório. A taxa de cupom anual do título."
			},
			yld: {
				name: "yld",
				detail: "Obrigatório. O rendimento anual do título."
			},
			redemption: {
				name: "redemption",
				detail: "Obrigatório. O valor de resgate do título por R$ 100 de valor nominal."
			},
			frequency: {
				name: "frequency",
				detail: "Obrigatório. O número de pagamentos de cupom por ano. Para pagamento anual, frequência = 1; para semestral, frequência = 2; para trimestral, frequência = 4."
			},
			basis: {
				name: "basis",
				detail: "Opcional. O tipo de base de contagem diária a ser usado."
			}
		}
	},
	PRICEDISC: {
		description: "Retorna o preço por R$ 100,00 de valor nominal de um título descontado.",
		abstract: "Retorna o preço por R$ 100,00 de valor nominal de um título descontado.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/pricedisc-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obrigatório. A data de liquidação do título. A data de liquidação do título é a data após a data de emissão em que o título foi negociado com o cliente."
			},
			maturity: {
				name: "maturity",
				detail: "Obrigatório. A data de vencimento do título. A data de vencimento é a data em que o título expira."
			},
			discount: {
				name: "discount",
				detail: "Obrigatório. A taxa de desconto do título."
			},
			redemption: {
				name: "redemption",
				detail: "Obrigatório. O valor de resgate do título por R$ 100 de valor nominal."
			},
			basis: {
				name: "basis",
				detail: "Opcional. O tipo de base de contagem diária a ser usado."
			}
		}
	},
	PRICEMAT: {
		description: "Retorna o preço por R$ 100,00 de valor nominal de um título que paga juros no vencimento.",
		abstract: "Retorna o preço por R$ 100,00 de valor nominal de um título que paga juros no vencimento.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/pricemat-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Necessário. A data de liquidação do título. A data de liquidação do título é a data após a data de emissão em que o título foi negociado com o cliente."
			},
			maturity: {
				name: "maturity",
				detail: "Necessário. A data de vencimento do título. A data de vencimento é a data em que o título expira."
			},
			issue: {
				name: "issue",
				detail: "Necessário. A data de emissão do título, expressa como número de série de data."
			},
			rate: {
				name: "rate",
				detail: "Necessário. A taxa de juros do título na data da emissão."
			},
			yld: {
				name: "yld",
				detail: "Necessário. O rendimento anual do título."
			},
			basis: {
				name: "basis",
				detail: "Opcional. O tipo de base de contagem diária a ser usado."
			}
		}
	},
	PV: {
		description: "VP , uma das funções financeiras , calcula o valor presente de um empréstimo ou investimento com base em uma taxa de juros constante. Você pode usar VP com pagamentos periódicos e constantes (como uma hipoteca ou outro empréstimo) ou um valor futuro que é sua meta de investimento.",
		abstract: "VP , uma das funções financeiras , calcula o valor presente de um empréstimo ou investimento com base em uma taxa de juros constante. Você pode usar VP com pagamentos periódicos e constantes (como uma hipoteca ou outro empréstimo) ou um valor futuro que é sua meta de investimento.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/pv-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Obrigatório. A taxa de juros por período. Por exemplo, se você tiver um empréstimo para um automóvel com taxa de de juros de 10% ano ano e fizer pagamentos mensais, sua taxa de juros mensal será de 10%/12 ou 0,83%. Você deveria inserir 10%/12 ou 0,83%, ou 0,0083, na fórmula como taxa."
			},
			nper: {
				name: "nper",
				detail: "Obrigatório. O número total de períodos de pagamento em uma anuidade. Por exemplo, se você conseguir um empréstimo de carro de quatro anos e fizer pagamentos mensais, seu empréstimo terá 4*12 (ou 48) períodos. Você deveria inserir 48 na fórmula para nper."
			},
			pmt: {
				name: "pmt",
				detail: "Obrigatório. O pagamento feito em cada período e não pode mudar durante a vigência da anuidade. Geralmente, pgto inclui o principal e os juros e nenhuma outra taxa ou tributo. Por exemplo, os pagamentos mensais de R$ 10.000 de um empréstimo de quatro anos para um carro serão de R$ 263,33. Você inseriria -263,33 na fórmula como o pmt. Se pmt for omitido, você deverá incluir o argumento fv."
			},
			fv: {
				name: "fv",
				detail: "Opcional. O valor futuro ou um saldo em dinheiro que você deseja obter depois do último pagamento. Se vf for omitido, será considerado 0 (o valor futuro de um empréstimo, por exemplo, é 0). Por exemplo, se você deseja economizar R$ 50.000 para pagar um projeto especial em 18 anos, então o valor futuro será de R$ 50.000. Você poderia então fazer uma estimativa conservadora na taxa de juros e concluir quanto economizaria por mês. Se vf for omitido, você deverá incluir o argumento pgto."
			},
			type: {
				name: "type",
				detail: "Opcional. O número 0 ou 1 e indica as datas de vencimento."
			}
		}
	},
	RATE: {
		description: "Retorna a taxa de juros por período de uma anuidade. A TAXA é calculada por iteração e pode ter zero ou mais soluções. Se os resultados sucessivos de RATE não convergirem para dentro de 0,0000001 após 20 iterações, RATE retornará o #NUM! valor de erro.",
		abstract: "Retorna a taxa de juros por período de uma anuidade. A TAXA é calculada por iteração e pode ter zero ou mais soluções. Se os resultados sucessivos de RATE não convergirem para dentro de 0,0000001 após 20 iterações, RATE retornará o #NUM! valor de erro.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/rate-function"
		}],
		functionParameter: {
			nper: {
				name: "nper",
				detail: "Necessário. O número total de períodos de pagamento em uma anuidade."
			},
			pmt: {
				name: "pmt",
				detail: "Necessário. O pagamento feito em cada período e não pode mudar durante a vigência da anuidade. Geralmente, pgto inclui o principal e os juros e nenhuma outra taxa ou tributo. Se pgto for omitido, você deverá incluir o argumento vf."
			},
			pv: {
				name: "pv",
				detail: "Necessário. O valor presente — o valor total correspondente ao valor atual de uma série de pagamentos futuros."
			},
			fv: {
				name: "fv",
				detail: "Opcional. O valor futuro, ou o saldo, que você deseja obter depois do último pagamento. Se vf for omitido, será considerado 0 (o valor futuro de um empréstimo, por exemplo, é 0). Se vf for omitido, deve-se incluir o argumento pgto."
			},
			type: {
				name: "type",
				detail: "Opcional. O número 0 ou 1 e indica as datas de vencimento."
			},
			guess: {
				name: "guess",
				detail: "Opcional. A sua estimativa para a taxa. Se você omitir estimativa, este argumento será considerado 10%. Se TAXA não convergir, atribua valores diferentes para estimativa. Em geral, TAXA converge se estimativa estiver entre 0 e 1."
			}
		}
	},
	RECEIVED: {
		description: "Retorna a quantia recebida no vencimento de um título totalmente investido.",
		abstract: "Retorna a quantia recebida no vencimento de um título totalmente investido.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/received-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obrigatório. A data de liquidação do título. A data de liquidação do título é a data após a data de emissão em que o título foi negociado com o cliente."
			},
			maturity: {
				name: "maturity",
				detail: "Obrigatório. A data de vencimento do título. A data de vencimento é a data em que o título expira."
			},
			investment: {
				name: "investment",
				detail: "Obrigatório. A quantia investida no título."
			},
			discount: {
				name: "discount",
				detail: "Obrigatório. A taxa de desconto do título."
			},
			basis: {
				name: "basis",
				detail: "Opcional. O tipo de base de contagem diária a ser usado."
			}
		}
	},
	RRI: {
		description: "Retorna uma taxa de juros equivalente para o crescimento de um investimento.",
		abstract: "Retorna uma taxa de juros equivalente para o crescimento de um investimento.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/rri-function"
		}],
		functionParameter: {
			nper: {
				name: "nper",
				detail: "Necessário. Nper é o número de períodos para o investimento."
			},
			pv: {
				name: "pv",
				detail: "Necessário. Va é o valor atual do investimento."
			},
			fv: {
				name: "fv",
				detail: "Necessário. Vf é o valor futuro do investimento."
			}
		}
	},
	SLN: {
		description: "Retorna a depreciação em linha reta de um ativo durante um período.",
		abstract: "Retorna a depreciação em linha reta de um ativo durante um período.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/sln-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Necessário. O custo inicial do ativo."
			},
			salvage: {
				name: "salvage",
				detail: "Necessário. O valor no final da depreciação (às vezes chamado de valor de recuperação do ativo)."
			},
			life: {
				name: "life",
				detail: "Necessário. O número de períodos durante os quais o ativo é depreciado (às vezes chamado vida útil do ativo)."
			}
		}
	},
	SYD: {
		description: "Retorna a depreciação dos dígitos da soma dos anos de um ativo para um período especificado.",
		abstract: "Retorna a depreciação dos dígitos da soma dos anos de um ativo para um período especificado.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/syd-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Necessário. O custo inicial do ativo."
			},
			salvage: {
				name: "salvage",
				detail: "Necessário. O valor no final da depreciação (às vezes chamado de valor de recuperação do ativo)."
			},
			life: {
				name: "life",
				detail: "Necessário. O número de períodos durante os quais o ativo é depreciado (às vezes chamado vida útil do ativo)."
			},
			per: {
				name: "per",
				detail: "Necessário. O período e deve utilizar as mesmas unidades de vida útil."
			}
		}
	},
	TBILLEQ: {
		description: "Retorna o rendimento de um título equivalente a uma obrigação do Tesouro.",
		abstract: "Retorna o rendimento de um título equivalente a uma obrigação do Tesouro.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/tbilleq-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Necessário. A data de quitação da obrigação do Tesouro. A data de liquidação do título é a data após a data de emissão quando a obrigação do Tesouro é negociada com o comprador."
			},
			maturity: {
				name: "maturity",
				detail: "Necessário. A data de vencimento da obrigação do Tesouro. A data de vencimento é a data em que a obrigação do Tesouro expira."
			},
			discount: {
				name: "discount",
				detail: "Necessário. A taxa de desconto da obrigação do Tesouro."
			}
		}
	},
	TBILLPRICE: {
		description: "Retorna o preço por R$ 100,00 de valor nominal de uma obrigação do Tesouro.",
		abstract: "Retorna o preço por R$ 100,00 de valor nominal de uma obrigação do Tesouro.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/tbillprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Necessário. A data de quitação da obrigação do Tesouro. A data de liquidação do título é a data após a data de emissão quando a obrigação do Tesouro é negociada com o comprador."
			},
			maturity: {
				name: "maturity",
				detail: "Necessário. A data de vencimento da obrigação do Tesouro. A data de vencimento é a data em que a obrigação do Tesouro expira."
			},
			discount: {
				name: "discount",
				detail: "Necessário. A taxa de desconto da obrigação do Tesouro."
			}
		}
	},
	TBILLYIELD: {
		description: "Retorna o rendimento de uma obrigação do Tesouro.",
		abstract: "Retorna o rendimento de uma obrigação do Tesouro.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/tbillyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obrigatório. A data de quitação da obrigação do Tesouro. A data de liquidação do título é a data após a data de emissão quando a obrigação do Tesouro é negociada com o comprador."
			},
			maturity: {
				name: "maturity",
				detail: "Obrigatório. A data de vencimento da obrigação do Tesouro. A data de vencimento é a data em que a obrigação do Tesouro expira."
			},
			pr: {
				name: "pr",
				detail: "Obrigatório. O preço da obrigação do Tesouro por R$ 100,00 de valor nominal."
			}
		}
	},
	VDB: {
		description: "Retorna a depreciação de um ativo para o período que você especificar, incluindo períodos parciais, usando o método balanço declinante duplo ou algum outro método especificado. BDV é o balanço de declínio variável.",
		abstract: "Retorna a depreciação de um ativo para o período que você especificar, incluindo períodos parciais, usando o método balanço declinante duplo ou algum outro método especificado. BDV é o balanço de declínio variável.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/vdb-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Necessário. O custo inicial do ativo."
			},
			salvage: {
				name: "salvage",
				detail: "Necessário. O valor no final da depreciação (às vezes chamado de valor residual do ativo). Este valor pode ser 0."
			},
			life: {
				name: "life",
				detail: "Necessário. O número de períodos durante os quais o ativo é depreciado (às vezes chamado vida útil do ativo)."
			},
			startPeriod: {
				name: "start_period",
				detail: "Necessário. O período inicial para o qual se deseja calcular a depreciação. Início_período deve usar as mesmas unidades que vida_útil."
			},
			endPeriod: {
				name: "end_period",
				detail: "Necessário. O período final para o qual se deseja calcular a depreciação. Final_período deve usar as mesmas unidades que vida_útil."
			},
			factor: {
				name: "factor",
				detail: "Opcional. A taxa em que o balanço declina. Se o fator for omitido, será considerado 2 (método balanço de declínio duplo). Altere o fator caso não deseje usar o método balanço de declínio duplo. Para obter uma descrição do método balanço de declínio duplo, consulte BDD."
			},
			noSwitch: {
				name: "no_switch",
				detail: "Opcional. Um valor lógico que especifica se deve haver mudança para depreciação de linha reta quando a depreciação for maior do que o cálculo do balanço de declínio. Se sem_mudança for VERDADEIRO, o Microsoft Excel não muda para depreciação de linha reta mesmo quando a depreciação for maior do que o cálculo do balanço declínio. Se sem_mudança for FALSO ou omitido, o Excel mudará para depreciação em linha reta quando a depreciação for maior do que o cálculo do balanço decrescente."
			}
		}
	},
	XIRR: {
		description: "Fornece a taxa interna de retorno para um programa de fluxos de caixa que não é necessariamente periódico. Para calcular a taxa interna de retorno para uma sequência de fluxos de caixa periódicos, use a função TIR.",
		abstract: "Fornece a taxa interna de retorno para um programa de fluxos de caixa que não é necessariamente periódico. Para calcular a taxa interna de retorno para uma sequência de fluxos de caixa periódicos, use a função TIR.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/xirr-function"
		}],
		functionParameter: {
			values: {
				name: "values",
				detail: "Necessário. Uma sequência de fluxos de caixa que corresponde a um cronograma de pagamentos em datas. O primeiro pagamento é opcional e corresponde a um custo ou pagamento que ocorre no início do investimento. Se o primeiro valor for um custo ou pagamento, ele deverá ser negativo. Todos os pagamentos subsequentes são descontados com base em um ano de 365 dias. A série de valores deve conter pelo menos um valor positivo e um negativo."
			},
			dates: {
				name: "dates",
				detail: "Necessário. Um cronograma de datas de pagamentos que corresponde aos pagamentos de fluxo de caixa. As datas podem ocorrer em qualquer ordem. As datas devem ser inseridas com a função DATA ou como resultado de outras fórmulas ou funções. Por exemplo, use DATA(2008;5;23) para 23 de maio de 2008. Poderão ocorrer problemas se as datas forem inseridas como texto. ."
			},
			guess: {
				name: "guess",
				detail: "Opcional. Um número que você supõe estar próximo do resultado de XTIR."
			}
		}
	},
	XNPV: {
		description: "Retorna o valor presente líquido de um programa de fluxos de caixa que não é necessariamente periódico. Para calcular o valor presente líquido para uma sequência de fluxos de caixa que é periódica, use a função VPL.",
		abstract: "Retorna o valor presente líquido de um programa de fluxos de caixa que não é necessariamente periódico. Para calcular o valor presente líquido para uma sequência de fluxos de caixa que é periódica, use a função VPL.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/xnpv-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Obrigatório. A taxa de desconto a ser aplicada ao fluxo de caixa."
			},
			values: {
				name: "values",
				detail: "Obrigatório. Uma sequência de fluxos de caixa que corresponde a um cronograma de pagamentos em datas. O primeiro pagamento é opcional e corresponde a um custo ou pagamento que ocorre no início do investimento. Se o primeiro valor for um custo ou pagamento, ele deverá ser negativo. Todos os pagamentos subsequentes são descontados com base em um ano de 365 dias. A série de valores deve conter pelo menos um valor positivo e um negativo."
			},
			dates: {
				name: "dates",
				detail: "Obrigatório. Um cronograma de datas de pagamentos que corresponde aos pagamentos de fluxo de caixa. A primeira data de pagamento indica o início do cronograma de pagamentos. Todas as outras datas devem ser posteriores a essa data, mas podem estar em qualquer ordem."
			}
		}
	},
	YIELD: {
		description: "Retorna o rendimento de um título que paga juros periódicos.",
		abstract: "Retorna o rendimento de um título que paga juros periódicos.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/yield-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "A data de liquidação do título."
			},
			maturity: {
				name: "maturity",
				detail: "A data de vencimento do título."
			},
			rate: {
				name: "rate",
				detail: "A taxa de juros do título."
			},
			pr: {
				name: "pr",
				detail: "O preço do título por R$ 100 de valor nominal."
			},
			redemption: {
				name: "redemption",
				detail: "O valor de resgate do título por R$ 100 de valor nominal."
			},
			frequency: {
				name: "frequency",
				detail: "O número de pagamentos de cupom por ano: 1 para anual, 2 para semestral e 4 para trimestral."
			},
			basis: {
				name: "basis",
				detail: "O tipo de base de contagem de dias a ser usado."
			}
		}
	},
	YIELDDISC: {
		description: "Retorna o lucro anual de um título descontado.",
		abstract: "Retorna o lucro anual de um título descontado.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/yielddisc-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Necessário. A data de liquidação do título. A data de liquidação do título é a data após a data de emissão em que o título foi negociado com o cliente."
			},
			maturity: {
				name: "maturity",
				detail: "Necessário. A data de vencimento do título. A data de vencimento é a data em que o título expira."
			},
			pr: {
				name: "pr",
				detail: "Necessário. O preço do título por R$ 100 de valor nominal."
			},
			redemption: {
				name: "redemption",
				detail: "Necessário. O valor de resgate do título por R$ 100 de valor nominal."
			},
			basis: {
				name: "basis",
				detail: "Opcional. O tipo de base de contagem diária a ser usado."
			}
		}
	},
	YIELDMAT: {
		description: "Retorna o lucro anual de um título que paga juros no vencimento.",
		abstract: "Retorna o lucro anual de um título que paga juros no vencimento.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/yieldmat-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obrigatório. A data de liquidação do título. A data de liquidação do título é a data após a data de emissão em que o título foi negociado com o cliente."
			},
			maturity: {
				name: "maturity",
				detail: "Obrigatório. A data de vencimento do título. A data de vencimento é a data em que o título expira."
			},
			issue: {
				name: "issue",
				detail: "Obrigatório. A data de emissão do título, expressa como número de série de data."
			},
			rate: {
				name: "rate",
				detail: "Obrigatório. A taxa de juros do título na data da emissão."
			},
			pr: {
				name: "pr",
				detail: "Obrigatório. O preço do título por R$ 100 de valor nominal."
			},
			basis: {
				name: "basis",
				detail: "Opcional. O tipo de base de contagem diária a ser usado."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/information/pt-BR.ts
const locale$8 = {
	CELL: {
		description: "A função CÉL retorna informações sobre a formatação, o local ou o conteúdo de uma célula. Por exemplo, se você deseja verificar se uma célula contém um valor numérico em vez de texto antes de realizar um cálculo nela, use a seguinte fórmula:",
		abstract: "A função CÉL retorna informações sobre a formatação, o local ou o conteúdo de uma célula. Por exemplo, se você deseja verificar se uma célula contém um valor numérico em vez de texto antes de realizar um cálculo nela, use a seguinte fórmula:",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/cell-function"
		}],
		functionParameter: {
			infoType: {
				name: "info_type",
				detail: "Um valor de texto que especifica que tipo de informações de célula você deseja retornar. A lista a seguir mostra os valores possíveis do argumento tipo_info e os resultados correspondentes."
			},
			reference: {
				name: "reference",
				detail: "A célula sobre a qual você deseja informações. Se omitido, as informações especificadas no argumento info_type serão retornadas para a célula selecionada no momento do cálculo. Se o argumento de referência for um intervalo de células, a função CÉL retornará as informações para a célula ativa no intervalo selecionado. Importante: Embora tecnicamente a referência seja opcional, é recomendável incluí-la em sua fórmula, a menos que você entenda o efeito que sua ausência tem sobre o resultado da fórmula e queira que esse efeito seja aplicado. Omitir o argumento de referência não produz informações confiáveis sobre uma célula específica, pelos seguintes motivos: No modo de cálculo automático, quando uma célula é modificada por um usuário, o cálculo pode ser disparado antes ou depois do progresso da seleção, dependendo da plataforma que você estiver usando para o Excel. Por exemplo, o Excel para Windows atualmente dispara o cálculo antes das alterações de seleção, mas Excel para a Web o dispara posteriormente. Quando Co-Authoring com outro usuário que faz uma edição, esta função relatará sua célula ativa em vez da do editor. Qualquer recálculo, por exemplo, pressionando F9, fará com que a função retorne um novo resultado, mesmo que nenhuma edição de célula tenha ocorrido."
			}
		}
	},
	ERROR_TYPE: {
		description: "Retorna um número que corresponde a um dos valores de erro do Microsoft Excel ou retorna o erro #N/D se não houver erro. Você pode usar TIPO.ERRO em uma função SE para testar um valor de erro e retornar uma cadeia de texto, como uma mensagem, em vez de um valor de erro.",
		abstract: "Retorna um número que corresponde a um dos valores de erro do Microsoft Excel ou retorna o erro #N/D se não houver erro. Você pode usar TIPO.ERRO em uma função SE para testar um valor de erro e retornar uma cadeia de texto, como uma mensagem, em vez de um valor de erro.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/error-type-function"
		}],
		functionParameter: { errorVal: {
			name: "error_val",
			detail: "Necessário. O valor de erro cujo número de identificação você deseja localizar. Apesar de val_erro poder ser o valor de erro real, ele será normalmente uma referência a uma célula que contenha uma fórmula que se deseje testar."
		} }
	},
	INFO: {
		description: "Retorna informações sobre o ambiente operacional atual.",
		abstract: "Retorna informações sobre o ambiente operacional atual.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/info-function"
		}],
		functionParameter: { typeText: {
			name: "Type_text",
			detail: "Necessário. O texto que especifica o tipo de informação a ser retornado."
		} }
	},
	ISBETWEEN: {
		description: "Verifica se um número fornecido está entre outros dois números, de forma inclusiva ou exclusiva.",
		abstract: "Verifica se um número fornecido está entre outros dois números, de forma inclusiva ou exclusiva.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/10538337?hl=pt-BR"
		}],
		functionParameter: {
			valueToCompare: {
				name: "value_to_compare",
				detail: "O valor a testar para verificar se está entre `lower_value` e `upper_value`."
			},
			lowerValue: {
				name: "lower_value",
				detail: "O limite inferior do intervalo de valores no qual `value_to_compare` pode estar."
			},
			upperValue: {
				name: "upper_value",
				detail: "O limite superior do intervalo de valores no qual `value_to_compare` pode estar."
			},
			lowerValueIsInclusive: {
				name: "lower_value_is_inclusive",
				detail: "Indica se o intervalo de valores inclui `lower_value`. Por padrão, é VERDADEIRO."
			},
			upperValueIsInclusive: {
				name: "upper_value_is_inclusive",
				detail: "Indica se o intervalo de valores inclui `upper_value`. Por padrão, é VERDADEIRO."
			}
		}
	},
	ISBLANK: {
		description: "Cada uma dessas funções, chamada coletivamente de funções É , verifica o valor especificado e retorna VERDADEIRO ou FALSO, dependendo do resultado. Por exemplo, a função ÉCÉL.VAZIA retornará o valor lógico VERDADEIRO se o argumento de valor for uma referência a uma célula vazia; caso contrário, ele retornará FALSO.",
		abstract: "Cada uma dessas funções, chamada coletivamente de funções É , verifica o valor especificado e retorna VERDADEIRO ou FALSO, dependendo do resultado. Por exemplo, a função ÉCÉL.VAZIA retornará o valor lógico VERDADEIRO se o argumento de valor for uma referência a uma célula vazia; caso contrário, ele retornará FALSO.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obrigatório. O valor que você deseja testar. O argumento de valor pode ser um espaço em branco (célula vazia), um erro, um valor lógico, um texto, um número ou um valor de referência ou ainda um nome que faz referência a qualquer um desses elementos."
		} }
	},
	ISDATE: {
		description: "A função ISDATE informa se um valor é uma data.",
		abstract: "A função ISDATE informa se um valor é uma data.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9061381?hl=pt-BR"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "O valor a ser verificado como data."
		} }
	},
	ISEMAIL: {
		description: "A função ISEMAIL verifica se um valor é um endereço de e-mail válido. Ela verifica se o valor segue um formato de e-mail geralmente aceito, mas não confirma se o endereço existe.",
		abstract: "A função ISEMAIL verifica se um valor é um endereço de e-mail válido. Ela verifica se o valor segue um formato de e-mail geralmente aceito, mas não confirma se o endereço existe.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3256503?hl=pt-BR"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "O valor a ser verificado como endereço de e-mail."
		} }
	},
	ISERR: {
		description: "Cada uma dessas funções, chamada coletivamente de funções É , verifica o valor especificado e retorna VERDADEIRO ou FALSO, dependendo do resultado. Por exemplo, a função ÉCÉL.VAZIA retornará o valor lógico VERDADEIRO se o argumento de valor for uma referência a uma célula vazia; caso contrário, ele retornará FALSO.",
		abstract: "Cada uma dessas funções, chamada coletivamente de funções É , verifica o valor especificado e retorna VERDADEIRO ou FALSO, dependendo do resultado. Por exemplo, a função ÉCÉL.VAZIA retornará o valor lógico VERDADEIRO se o argumento de valor for uma referência a uma célula vazia; caso contrário, ele retornará FALSO.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obrigatório. O valor que você deseja testar. O argumento de valor pode ser um espaço em branco (célula vazia), um erro, um valor lógico, um texto, um número ou um valor de referência ou ainda um nome que faz referência a qualquer um desses elementos."
		} }
	},
	ISERROR: {
		description: "Cada uma dessas funções, chamada coletivamente de funções É , verifica o valor especificado e retorna VERDADEIRO ou FALSO, dependendo do resultado. Por exemplo, a função ÉCÉL.VAZIA retornará o valor lógico VERDADEIRO se o argumento de valor for uma referência a uma célula vazia; caso contrário, ele retornará FALSO.",
		abstract: "Cada uma dessas funções, chamada coletivamente de funções É , verifica o valor especificado e retorna VERDADEIRO ou FALSO, dependendo do resultado. Por exemplo, a função ÉCÉL.VAZIA retornará o valor lógico VERDADEIRO se o argumento de valor for uma referência a uma célula vazia; caso contrário, ele retornará FALSO.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obrigatório. O valor que você deseja testar. O argumento de valor pode ser um espaço em branco (célula vazia), um erro, um valor lógico, um texto, um número ou um valor de referência ou ainda um nome que faz referência a qualquer um desses elementos."
		} }
	},
	ISEVEN: {
		description: "Retorna VERDADEIRO se o número for par, ou FALSO caso o número seja ímpar.",
		abstract: "Retorna VERDADEIRO se o número for par, ou FALSO caso o número seja ímpar.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/iseven-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obrigatório. O valor a ser testado. Se núm não for um inteiro, será truncado."
		} }
	},
	ISFORMULA: {
		description: "Verifica se há uma referência a uma célula que contenha uma fórmula e retorna VERDADEIRO ou FALSO.",
		abstract: "Verifica se há uma referência a uma célula que contenha uma fórmula e retorna VERDADEIRO ou FALSO.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/isformula-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "Necessário. Referência é uma referência à célula que você deseja testar. Referência pode ser uma referência de célula, uma fórmula ou um nome que faça referência a uma célula."
		} }
	},
	ISLOGICAL: {
		description: "Cada uma dessas funções, chamada coletivamente de funções É , verifica o valor especificado e retorna VERDADEIRO ou FALSO, dependendo do resultado. Por exemplo, a função ÉCÉL.VAZIA retornará o valor lógico VERDADEIRO se o argumento de valor for uma referência a uma célula vazia; caso contrário, ele retornará FALSO.",
		abstract: "Cada uma dessas funções, chamada coletivamente de funções É , verifica o valor especificado e retorna VERDADEIRO ou FALSO, dependendo do resultado. Por exemplo, a função ÉCÉL.VAZIA retornará o valor lógico VERDADEIRO se o argumento de valor for uma referência a uma célula vazia; caso contrário, ele retornará FALSO.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obrigatório. O valor que você deseja testar. O argumento de valor pode ser um espaço em branco (célula vazia), um erro, um valor lógico, um texto, um número ou um valor de referência ou ainda um nome que faz referência a qualquer um desses elementos."
		} }
	},
	ISNA: {
		description: "Cada uma dessas funções, chamada coletivamente de funções É , verifica o valor especificado e retorna VERDADEIRO ou FALSO, dependendo do resultado. Por exemplo, a função ÉCÉL.VAZIA retornará o valor lógico VERDADEIRO se o argumento de valor for uma referência a uma célula vazia; caso contrário, ele retornará FALSO.",
		abstract: "Cada uma dessas funções, chamada coletivamente de funções É , verifica o valor especificado e retorna VERDADEIRO ou FALSO, dependendo do resultado. Por exemplo, a função ÉCÉL.VAZIA retornará o valor lógico VERDADEIRO se o argumento de valor for uma referência a uma célula vazia; caso contrário, ele retornará FALSO.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obrigatório. O valor que você deseja testar. O argumento de valor pode ser um espaço em branco (célula vazia), um erro, um valor lógico, um texto, um número ou um valor de referência ou ainda um nome que faz referência a qualquer um desses elementos."
		} }
	},
	ISNONTEXT: {
		description: "Cada uma dessas funções, chamada coletivamente de funções É , verifica o valor especificado e retorna VERDADEIRO ou FALSO, dependendo do resultado. Por exemplo, a função ÉCÉL.VAZIA retornará o valor lógico VERDADEIRO se o argumento de valor for uma referência a uma célula vazia; caso contrário, ele retornará FALSO.",
		abstract: "Cada uma dessas funções, chamada coletivamente de funções É , verifica o valor especificado e retorna VERDADEIRO ou FALSO, dependendo do resultado. Por exemplo, a função ÉCÉL.VAZIA retornará o valor lógico VERDADEIRO se o argumento de valor for uma referência a uma célula vazia; caso contrário, ele retornará FALSO.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obrigatório. O valor que você deseja testar. O argumento de valor pode ser um espaço em branco (célula vazia), um erro, um valor lógico, um texto, um número ou um valor de referência ou ainda um nome que faz referência a qualquer um desses elementos."
		} }
	},
	ISNUMBER: {
		description: "Cada uma dessas funções, chamada coletivamente de funções É , verifica o valor especificado e retorna VERDADEIRO ou FALSO, dependendo do resultado. Por exemplo, a função ÉCÉL.VAZIA retornará o valor lógico VERDADEIRO se o argumento de valor for uma referência a uma célula vazia; caso contrário, ele retornará FALSO.",
		abstract: "Cada uma dessas funções, chamada coletivamente de funções É , verifica o valor especificado e retorna VERDADEIRO ou FALSO, dependendo do resultado. Por exemplo, a função ÉCÉL.VAZIA retornará o valor lógico VERDADEIRO se o argumento de valor for uma referência a uma célula vazia; caso contrário, ele retornará FALSO.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obrigatório. O valor que você deseja testar. O argumento de valor pode ser um espaço em branco (célula vazia), um erro, um valor lógico, um texto, um número ou um valor de referência ou ainda um nome que faz referência a qualquer um desses elementos."
		} }
	},
	ISODD: {
		description: "Retorna VERDADEIRO se núm for ímpar, ou FALSO se núm for par.",
		abstract: "Retorna VERDADEIRO se núm for ímpar, ou FALSO se núm for par.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/isodd-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obrigatório. O valor a ser testado. Se núm não for um inteiro, será truncado."
		} }
	},
	ISOMITTED: {
		description: "Verifica se o valor em um LAMBDA está ausente e retorna TRUE ou FALSE.",
		abstract: "Verifica se o valor em um LAMBDA está ausente e retorna TRUE ou FALSE.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/isomitted-function"
		}],
		functionParameter: { argument: {
			name: "Argumento",
			detail: "O valor que você deseja testar, como um parâmetro LAMBDA."
		} }
	},
	ISREF: {
		description: "Cada uma dessas funções, chamada coletivamente de funções É , verifica o valor especificado e retorna VERDADEIRO ou FALSO, dependendo do resultado. Por exemplo, a função ÉCÉL.VAZIA retornará o valor lógico VERDADEIRO se o argumento de valor for uma referência a uma célula vazia; caso contrário, ele retornará FALSO.",
		abstract: "Cada uma dessas funções, chamada coletivamente de funções É , verifica o valor especificado e retorna VERDADEIRO ou FALSO, dependendo do resultado. Por exemplo, a função ÉCÉL.VAZIA retornará o valor lógico VERDADEIRO se o argumento de valor for uma referência a uma célula vazia; caso contrário, ele retornará FALSO.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obrigatório. O valor que você deseja testar. O argumento de valor pode ser um espaço em branco (célula vazia), um erro, um valor lógico, um texto, um número ou um valor de referência ou ainda um nome que faz referência a qualquer um desses elementos."
		} }
	},
	ISTEXT: {
		description: "Cada uma dessas funções, chamada coletivamente de funções É , verifica o valor especificado e retorna VERDADEIRO ou FALSO, dependendo do resultado. Por exemplo, a função ÉCÉL.VAZIA retornará o valor lógico VERDADEIRO se o argumento de valor for uma referência a uma célula vazia; caso contrário, ele retornará FALSO.",
		abstract: "Cada uma dessas funções, chamada coletivamente de funções É , verifica o valor especificado e retorna VERDADEIRO ou FALSO, dependendo do resultado. Por exemplo, a função ÉCÉL.VAZIA retornará o valor lógico VERDADEIRO se o argumento de valor for uma referência a uma célula vazia; caso contrário, ele retornará FALSO.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obrigatório. O valor que você deseja testar. O argumento de valor pode ser um espaço em branco (célula vazia), um erro, um valor lógico, um texto, um número ou um valor de referência ou ainda um nome que faz referência a qualquer um desses elementos."
		} }
	},
	ISURL: {
		description: "Verifica se um valor é uma URL válida.",
		abstract: "Verifica se um valor é uma URL válida.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3256501?hl=pt-BR"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "O valor a ser verificado como URL."
		} }
	},
	N: {
		description: "Retorna um valor convertido em um número.",
		abstract: "Retorna um valor convertido em um número.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/n-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Necessário. O valor que você deseja converter. N converte os valores listados na tabela abaixo."
		} }
	},
	NA: {
		description: "Retorna o valor de erro #N/D. #N/D é o valor de erro que significa que \"não existe nenhum valor disponível\". Utilize NA para marcar células vazias. Ao inserir #N/D nas células onde estão faltando informações, você pode evitar o problema de incluir, não intencionalmente, células vazias nos seus cálculos. Quando uma fórmula se refere a uma célula que contém #N/D, a fórmula retornará o valor de erro #N/D.",
		abstract: "Retorna o valor de erro #N/D. #N/D é o valor de erro que significa que \"não existe nenhum valor disponível\". Utilize NA para marcar células vazias. Ao inserir #N/D nas células onde estão faltando informações, você pode evitar o problema de incluir, não intencionalmente, células vazias nos seus cálculos. Quando uma fórmula se refere a uma célula que contém #N/D, a fórmula retornará o valor de erro #N/D.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/na-function"
		}],
		functionParameter: {}
	},
	SHEET: {
		description: "A função SHEET retorna o número da planilha especificada ou outra referência.",
		abstract: "A função SHEET retorna o número da planilha especificada ou outra referência.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/sheet-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Argumento opcional. Use isso para especificar o nome de uma planilha ou uma referência para a qual você deseja obter o número da planilha. Caso contrário, a função retornará o número da planilha que contém a função SHEET."
		} }
	},
	SHEETS: {
		description: "Retorna o número de PLANS em uma referência.",
		abstract: "Retorna o número de PLANS em uma referência.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/sheets-function"
		}],
		functionParameter: {}
	},
	TYPE: {
		description: "Retorna o tipo de valor. Use TIPO quando o comportamento de outra função depender do tipo de valor de uma determinada célula.",
		abstract: "Retorna o tipo de valor. Use TIPO quando o comportamento de outra função depender do tipo de valor de uma determinada célula.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/type-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Necessário. Pode ser qualquer valor do Microsoft Excel, como um número, texto, valor lógico e assim por diante."
		} }
	}
};

//#endregion
//#region src/locale/function-list/logical/pt-BR.ts
const locale$7 = {
	AND: {
		description: "A função E retornará VERDADEIRO se todos os seus argumentos forem avaliados como VERDADEIRO e retornará FALSO se um ou mais argumentos forem avaliados como FALSO.",
		abstract: "A função E retornará VERDADEIRO se todos os seus argumentos forem avaliados como VERDADEIRO e retornará FALSO se um ou mais argumentos forem avaliados como FALSO.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/and-function"
		}],
		functionParameter: {
			logical1: {
				name: "logical1",
				detail: "A primeira condição que você deseja testar, que pode resultar em VERDADEIRO ou FALSO."
			},
			logical2: {
				name: "logical2",
				detail: "Condições adicionais que você deseja testar, que podem resultar em VERDADEIRO ou FALSO, até o máximo de 255 condições."
			}
		}
	},
	BYCOL: {
		description: "Aplica um LAMBDA a cada coluna e devolve uma matriz dos resultados. Por exemplo, se a matriz original é 3 colunas por 2 linhas, a matriz retornada é 3 colunas por 1 linha.",
		abstract: "Aplica um LAMBDA a cada coluna e devolve uma matriz dos resultados. Por exemplo, se a matriz original é 3 colunas por 2 linhas, a matriz retornada é 3 colunas por 1 linha.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/bycol-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Uma matriz a ser separada por coluna."
			},
			lambda: {
				name: "lambda",
				detail: "Um LAMBDA que recebe uma coluna como único parâmetro e calcula um resultado. O parâmetro é uma coluna da matriz."
			}
		}
	},
	BYROW: {
		description: "Aplica um LAMBDA a cada linha e retorna uma matriz dos resultados. Por exemplo, se a matriz original é de 3 colunas por 2 linhas, a matriz devolvida é de 1 coluna por 2 linhas.",
		abstract: "Aplica um LAMBDA a cada linha e retorna uma matriz dos resultados. Por exemplo, se a matriz original é de 3 colunas por 2 linhas, a matriz devolvida é de 1 coluna por 2 linhas.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/byrow-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Uma matriz a ser separada por linha."
			},
			lambda: {
				name: "lambda",
				detail: "Um LAMBDA que recebe uma linha como único parâmetro e calcula um resultado. O parâmetro é uma linha da matriz."
			}
		}
	},
	FALSE: {
		description: "Retorna o valor lógico FALSO.",
		abstract: "Retorna o valor lógico FALSO.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/false-function"
		}],
		functionParameter: {}
	},
	IF: {
		description: "Por exemplo, =SE(C2 =”Sim”, 1,2) diz SE(C2 = Sim, então retorne a 1, caso contrário retorne a 2).",
		abstract: "Por exemplo, =SE(C2 =”Sim”, 1,2) diz SE(C2 = Sim, então retorne a 1, caso contrário retorne a 2).",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/if-function"
		}],
		functionParameter: {
			logicalTest: {
				name: "logical_test",
				detail: "A condição que você deseja testar."
			},
			valueIfTrue: {
				name: "value_if_true",
				detail: "O valor que você deseja retornar se o resultado de logical_test for TRUE."
			},
			valueIfFalse: {
				name: "value_if_false",
				detail: "O valor que você deseja retornar se o resultado de logical_test for FALSO."
			}
		}
	},
	IFERROR: {
		description: "Você pode usar a função SEERRO para lidar com erros em uma fórmula. SEERRO retornará um valor que você especificará se uma fórmula for avaliada como um erro; caso contrário, ele retornará o resultado da fórmula.",
		abstract: "Você pode usar a função SEERRO para lidar com erros em uma fórmula. SEERRO retornará um valor que você especificará se uma fórmula for avaliada como um erro; caso contrário, ele retornará o resultado da fórmula.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/iferror-function"
		}],
		functionParameter: {
			value: {
				name: "value",
				detail: "Obrigatório. O argumento verificado quanto ao erro."
			},
			valueIfError: {
				name: "value_if_error",
				detail: "Obrigatório. O valor a ser retornado se a fórmula for avaliada como um erro. Os seguintes tipos de erro são avaliados: # n/d, #VALOR!, #REF!, #DIV/0!, #NÚM!, #NOME? ou #NOME!."
			}
		}
	},
	IFNA: {
		description: "A função IFNA retorna o valor que você especifica se uma fórmula retorna o valor de erro #N/A; caso contrário, ele retorna o resultado da fórmula.",
		abstract: "A função IFNA retorna o valor que você especifica se uma fórmula retorna o valor de erro #N/A; caso contrário, ele retorna o resultado da fórmula.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/ifna-function"
		}],
		functionParameter: {
			value: {
				name: "value",
				detail: "O argumento que é verificado para o valor de erro #N/D."
			},
			valueIfNa: {
				name: "value_if_na",
				detail: "O valor a retornar se a fórmula é avaliada com o valor de erro #N/D."
			}
		}
	},
	IFS: {
		description: "A função SES verifica se uma ou mais condições são satisfeitas e retorna um valor que corresponde à primeira condição VERDADEIRO. A função SES pode ser usada como substituta de várias instruções SE aninhadas, além de ser muito mais fácil de ser lida quando condições múltiplas são usadas.",
		abstract: "A função SES verifica se uma ou mais condições são satisfeitas e retorna um valor que corresponde à primeira condição VERDADEIRO. A função SES pode ser usada como substituta de várias instruções SE aninhadas, além de ser muito mais fácil de ser lida quando condições múltiplas são usadas.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/ifs-function"
		}],
		functionParameter: {
			logicalTest1: {
				name: "logical_test1",
				detail: "Uma condição que resulta em VERDADEIRO ou FALSO."
			},
			valueIfTrue1: {
				name: "value_if_true1",
				detail: "O resultado retornado se logical_test1 resultar em VERDADEIRO. Pode estar vazio."
			},
			logicalTest2: {
				name: "logical_test2",
				detail: "Uma condição que resulta em VERDADEIRO ou FALSO."
			},
			valueIfTrue2: {
				name: "value_if_true2",
				detail: "O resultado retornado se logical_testN resultar em VERDADEIRO. Cada value_if_trueN corresponde a uma condição logical_testN e pode estar vazio."
			}
		}
	},
	LAMBDA: {
		description: "Você pode criar uma função para uma fórmula comumente usada, eliminar a necessidade de copiar e colar essa fórmula (que pode ser propensa a erros) e adicionar efetivamente suas próprias funções à biblioteca de funções nativas do Excel. Além disso, uma função LAMBDA não requer VBA, macros ou JavaScript, pelo que os não programadores também podem beneficiar da sua utilização.",
		abstract: "Você pode criar uma função para uma fórmula comumente usada, eliminar a necessidade de copiar e colar essa fórmula (que pode ser propensa a erros) e adicionar efetivamente suas próprias funções à biblioteca de funções nativas do Excel. Além disso, uma função LAMBDA não requer VBA, macros ou JavaScript, pelo que os não programadores também podem beneficiar da sua utilização.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/lambda-function"
		}],
		functionParameter: {
			parameter: {
				name: "parameter",
				detail: "Um valor que você deseja passar para a função, como uma referência de célula, cadeia de caracteres ou número. Você pode incluir até 253 destinatários. O segundo argumento é opcional."
			},
			calculation: {
				name: "calculation",
				detail: "A fórmula que você deseja executar e retornar como resultado da função. Ele deve ser o último argumento e deve retornar um resultado. Esse argumento é necessário."
			}
		}
	},
	LET: {
		description: "A LET função atribui nomes a resultados de cálculo. Isso permite armazenar cálculos intermediários, valores ou definir nomes dentro de uma fórmula. Estes nomes só se aplicam no âmbito da LET função. Semelhante às variáveis na programação, LET é realizado através da sintaxe da fórmula nativa do Excel.",
		abstract: "A LET função atribui nomes a resultados de cálculo. Isso permite armazenar cálculos intermediários, valores ou definir nomes dentro de uma fórmula. Estes nomes só se aplicam no âmbito da LET função. Semelhante às variáveis na programação, LET é realizado através da sintaxe da fórmula nativa do Excel.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/let-function"
		}],
		functionParameter: {
			name1: {
				name: "name1",
				detail: "O primeiro nome a atribuir. Deve começar com uma letra e não pode ser o resultado de uma fórmula nem conflitar com a sintaxe de intervalo."
			},
			nameValue1: {
				name: "name_value1",
				detail: "O valor atribuído a name1."
			},
			calculationOrName2: {
				name: "calculation_or_name2",
				detail: "Um cálculo que usa todos os nomes de LET e deve ser seu último argumento, ou um segundo nome a atribuir a name_value2."
			},
			nameValue2: {
				name: "name_value2",
				detail: "O valor atribuído a calculation_or_name2."
			},
			calculationOrName3: {
				name: "calculation_or_name3",
				detail: "Um cálculo que usa todos os nomes de LET e deve ser seu último argumento, ou um terceiro nome a atribuir a name_value3."
			}
		}
	},
	MAKEARRAY: {
		description: "Retorna uma matriz calculada de uma linha especificada e tamanho de coluna, aplicando uma função LAMBDA .",
		abstract: "Retorna uma matriz calculada de uma linha especificada e tamanho de coluna, aplicando uma função LAMBDA .",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/makearray-function"
		}],
		functionParameter: {
			number1: {
				name: "rows",
				detail: "O número de linhas da matriz. Deve ser maior que zero."
			},
			number2: {
				name: "cols",
				detail: "O número de colunas da matriz. Deve ser maior que zero."
			},
			value3: {
				name: "lambda",
				detail: "O LAMBDA chamado para criar a matriz. Recebe dois parâmetros: row, o índice da linha, e col, o índice da coluna."
			}
		}
	},
	MAP: {
		description: "Devolve uma matriz formada ao mapear cada valor nas matrizes para um novo valor ao aplicar um LAMBDA para criar um novo valor.",
		abstract: "Devolve uma matriz formada ao mapear cada valor nas matrizes para um novo valor ao aplicar um LAMBDA para criar um novo valor.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/map-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Uma primeira matriz a ser mapeada."
			},
			array2: {
				name: "array2",
				detail: "Uma segunda matriz a ser mapeada."
			},
			lambda: {
				name: "lambda",
				detail: "Um LAMBDA que deve ser o último argumento e ter um parâmetro para cada matriz fornecida."
			}
		}
	},
	NOT: {
		description: "A função NÃO inverte o valor do argumento.",
		abstract: "A função NÃO inverte o valor do argumento.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/not-function"
		}],
		functionParameter: { logical: {
			name: "logical",
			detail: "A condição cuja lógica você deseja inverter, que pode resultar em VERDADEIRO ou FALSO."
		} }
	},
	OR: {
		description: "A função OU retornará VERDADEIRO se qualquer um dos argumentos for avaliado como VERDADEIRO e retornará FALSO se todos os argumentos forem avaliados como FALSO.",
		abstract: "A função OU retornará VERDADEIRO se qualquer um dos argumentos for avaliado como VERDADEIRO e retornará FALSO se todos os argumentos forem avaliados como FALSO.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/or-function"
		}],
		functionParameter: {
			logical1: {
				name: "logical1",
				detail: "A primeira condição que você deseja testar, que pode resultar em VERDADEIRO ou FALSO."
			},
			logical2: {
				name: "logical2",
				detail: "Condições adicionais que você deseja testar, que podem resultar em VERDADEIRO ou FALSO, até o máximo de 255 condições."
			}
		}
	},
	REDUCE: {
		description: "Reduz uma matriz a um valor acumulado aplicando um LAMBDA a cada valor e retornando o valor total no acumulador.",
		abstract: "Reduz uma matriz a um valor acumulado aplicando um LAMBDA a cada valor e retornando o valor total no acumulador.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/reduce-function"
		}],
		functionParameter: {
			initialValue: {
				name: "initial_value",
				detail: "Define o valor inicial do acumulador."
			},
			array: {
				name: "array",
				detail: "Uma matriz a ser reduzida."
			},
			lambda: {
				name: "lambda",
				detail: "Um LAMBDA chamado para reduzir a matriz. Recebe três parâmetros: o valor acumulado, o valor atual da matriz e o cálculo aplicado a cada elemento."
			}
		}
	},
	SCAN: {
		description: "Verifica uma matriz aplicando um LAMBDA a cada valor e retorna uma matriz que tem cada valor intermediário.",
		abstract: "Verifica uma matriz aplicando um LAMBDA a cada valor e retorna uma matriz que tem cada valor intermediário.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/scan-function"
		}],
		functionParameter: {
			initialValue: {
				name: "initial_value",
				detail: "Define o valor inicial do acumulador."
			},
			array: {
				name: "array",
				detail: "Uma matriz a ser examinada."
			},
			lambda: {
				name: "lambda",
				detail: "Um LAMBDA que é chamado para reduzir a matriz. O LAMBDA usa três parâmetros: Acumulador O valor totalizado e retornado como o resultado final. Valor O valor atual da matriz. Corpo O cálculo aplicado a cada elemento na matriz."
			}
		}
	},
	SWITCH: {
		description: "A função PARÂMETRO avalia um valor (chamado de expressão) em relação a uma lista de valores e retorna o resultado correspondente ao primeiro valor coincidente. Se não houver nenhuma correspondência, um valor padrão opcional poderá ser retornado.",
		abstract: "A função PARÂMETRO avalia um valor (chamado de expressão) em relação a uma lista de valores e retorna o resultado correspondente ao primeiro valor coincidente. Se não houver nenhuma correspondência, um valor padrão opcional poderá ser retornado.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/switch-function"
		}],
		functionParameter: {
			expression: {
				name: "expression",
				detail: "O valor, como número, data ou texto, que será comparado com value1 a value126."
			},
			value1: {
				name: "value1",
				detail: "Um valor que será comparado com expression."
			},
			result1: {
				name: "result1",
				detail: "O valor retornado quando o argumento valueN correspondente coincidir com expression. Deve ser fornecido para cada valueN."
			},
			defaultOrValue2: {
				name: "default_or_value2",
				detail: "O valor retornado se não houver correspondência nas expressões valueN. Deve ser o último argumento da função."
			},
			result2: {
				name: "result2",
				detail: "O valor retornado quando o argumento valueN correspondente coincidir com expression. Deve ser fornecido para cada valueN."
			}
		}
	},
	TRUE: {
		description: "Retorna o valor lógico VERDADEIRO. Pode utilizar esta função quando pretender devolver o valor VERDADEIRO com base numa condição. Por exemplo:",
		abstract: "Retorna o valor lógico VERDADEIRO. Pode utilizar esta função quando pretender devolver o valor VERDADEIRO com base numa condição. Por exemplo:",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/true-function"
		}],
		functionParameter: {}
	},
	XOR: {
		description: "A função XOR devolve um Exclusivo lógico Ou de todos os argumentos.",
		abstract: "A função XOR devolve um Exclusivo lógico Ou de todos os argumentos.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/xor-function"
		}],
		functionParameter: {
			logical1: {
				name: "logical1",
				detail: "A primeira condição que você deseja testar, que pode resultar em VERDADEIRO ou FALSO."
			},
			logical2: {
				name: "logical2",
				detail: "Condições adicionais que você deseja testar, que podem resultar em VERDADEIRO ou FALSO, até o máximo de 255 condições."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/lookup/pt-BR.ts
const locale$6 = {
	ADDRESS: {
		description: "Você pode usar a função ENDEREÇO para obter o endereço de uma célula em uma planilha, com base em números de linha e de coluna. Por exemplo, ADDRESS(2,3) retorna $C$2 . Como outro exemplo, ADDRESS(77.300) retorna $KN US$ 77 . Você pode usar outras funções, como as funções LIN e COL , para fornecer os argumentos de número de linha e de coluna para a função ENDEREÇO .",
		abstract: "Você pode usar a função ENDEREÇO para obter o endereço de uma célula em uma planilha, com base em números de linha e de coluna. Por exemplo, ADDRESS(2,3) retorna $C$2 . Como outro exemplo, ADDRESS(77.300) retorna $KN US$ 77 . Você pode usar outras funções, como as funções LIN e COL , para fornecer os argumentos de número de linha e de coluna para a função ENDEREÇO .",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/address-function"
		}],
		functionParameter: {
			row_num: {
				name: "row number",
				detail: "Necessário. Um valor numérico que especifica o número de linha a ser usado na referência de célula."
			},
			column_num: {
				name: "column number",
				detail: "Necessário. Um valor numérico que especifica o número de coluna a ser usado na referência de célula."
			},
			abs_num: {
				name: "type of reference",
				detail: "Opcional. Um valor numérico que especifica o tipo de referência a ser retornado."
			},
			a1: {
				name: "style of reference",
				detail: "Opcional. Um valor lógico que especifica o estilo de referência A1 ou L1C1. No estilo A1, as colunas são rotuladas alfabeticamente e as linhas são rotuladas numericamente. No estilo de referência L1C1, tanto as colunas quanto as linhas são rotuladas numericamente. Se o argumento A1 for VERDADEIRO ou omitido, a função ENDEREÇO retornará uma referência de estilo A1; se for FALSO, a função ENDEREÇO retornará uma referência de estilo L1C1. Observação Para alterar o estilo de referência que o Excel usa, clique na guia Arquivo , clique em Opções e clique em Fórmulas . Em Trabalhando com fórmulas , marque ou desmarque a caixa de seleção Estilo de referência L1C1 ."
			},
			sheet_text: {
				name: "worksheet name",
				detail: "Opcional. Um valor de texto que especifica o nome da planilha a ser usada como referência externa. Por exemplo, a fórmula =ADDRESS(1,1,,,\"Sheet2\") retorna Sheet2!$A$1 . Se o argumento sheet_text for omitido, nenhum nome da planilha será usado e o endereço retornado pela função se referirá a uma célula na planilha atual."
			}
		}
	},
	AREAS: {
		description: "Retorna o número de áreas em uma referência. Uma área é um intervalo de células contíguas ou uma célula única.",
		abstract: "Retorna o número de áreas em uma referência. Uma área é um intervalo de células contíguas ou uma célula única.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/areas-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "Necessário. Uma referência a uma célula ou a um intervalo de células e pode referir-se a várias áreas. Se você desejar especificar várias referências como um argumento único, deverá incluir grupos adicionais de parênteses para que o Microsoft Excel não interprete o ponto-e-vírgula como um separador de campo. Veja o exemplo a seguir."
		} }
	},
	CHOOSE: {
		description: "Use núm_índice para retornar um valor da lista de argumentos de valor. Use ESCOLHER para selecionar um valor entre 254 valores que se baseie no número de índice. Por exemplo, se do valor1 até o valor7 forem os números da semana, ESCOLHER retorna um dos dias quando um número entre 1 e 7 for usado como núm_índice.",
		abstract: "Use núm_índice para retornar um valor da lista de argumentos de valor. Use ESCOLHER para selecionar um valor entre 254 valores que se baseie no número de índice. Por exemplo, se do valor1 até o valor7 forem os números da semana, ESCOLHER retorna um dos dias quando um número entre 1 e 7 for usado como núm_índice.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/choose-function"
		}],
		functionParameter: {
			indexNum: {
				name: "index_num",
				detail: "Especifica qual argumento de valor será selecionado. Deve ser um número de 1 a 254, uma fórmula ou uma referência a uma célula que contenha esse número."
			},
			value1: {
				name: "value1",
				detail: "O valor ou a ação selecionada conforme index_num. Pode ser um número, referência de célula, nome definido, fórmula, função ou texto."
			},
			value2: {
				name: "value2",
				detail: "De 1 a 254 argumentos de valor."
			}
		}
	},
	CHOOSECOLS: {
		description: "Retorna as colunas especificadas de uma matriz.",
		abstract: "Retorna as colunas especificadas de uma matriz.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/choosecols-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "A matriz que contém as colunas a serem retornadas na nova matriz. Obrigatório."
			},
			colNum1: {
				name: "col_num1",
				detail: "A primeira coluna a ser retornada. Obrigatório."
			},
			colNum2: {
				name: "col_num2",
				detail: "Colunas adicionais a serem retornadas. Opcional."
			}
		}
	},
	CHOOSEROWS: {
		description: "Retorna as linhas especificadas de uma matriz.",
		abstract: "Retorna as linhas especificadas de uma matriz.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/chooserows-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "A matriz que contém as colunas a devolver na nova matriz. Obrigatório."
			},
			rowNum1: {
				name: "row_num1",
				detail: "O número da primeira linha a ser devolvido. Obrigatório."
			},
			rowNum2: {
				name: "row_num2",
				detail: "Números de linha adicionais a serem devolvidos. Opcional."
			}
		}
	},
	COLUMN: {
		description: "A função COLUMN devolve o número de coluna da referência de célula especificada. Por exemplo, a fórmula =COLUNA(D10) devolve 4, porque a coluna D é a quarta coluna.",
		abstract: "A função COLUMN devolve o número de coluna da referência de célula especificada. Por exemplo, a fórmula =COLUNA(D10) devolve 4, porque a coluna D é a quarta coluna.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/column-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "A célula ou o intervalo de células para o qual você deseja retornar o número da coluna."
		} }
	},
	COLUMNS: {
		description: "Retorna o número de colunas em uma matriz ou referência.",
		abstract: "Retorna o número de colunas em uma matriz ou referência.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/columns-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "Necessário. Uma fórmula de matriz ou matriz ou uma referência a um intervalo de células para as quais você deseja o número de colunas."
		} }
	},
	DROP: {
		description: "Exclui um número especificado de linhas ou colunas do início ou fim de uma matriz. Você pode achar essa função útil para remover cabeçalhos e rodapés em um relatório do Excel para retornar apenas os dados.",
		abstract: "Exclui um número especificado de linhas ou colunas do início ou fim de uma matriz. Você pode achar essa função útil para remover cabeçalhos e rodapés em um relatório do Excel para retornar apenas os dados.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/drop-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "A matriz a partir da qual remover linhas ou colunas."
			},
			rows: {
				name: "rows",
				detail: "O número de linhas a largar. Um valor negativo cai do final da matriz."
			},
			columns: {
				name: "columns",
				detail: "O número de colunas a excluir. Um valor negativo cai do final da matriz."
			}
		}
	},
	EXPAND: {
		description: "Expande ou preenche uma matriz para dimensões de linha e coluna especificadas.",
		abstract: "Expande ou preenche uma matriz para dimensões de linha e coluna especificadas.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/expand-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "A matriz a ser expandida."
			},
			rows: {
				name: "rows",
				detail: "O número de linhas na matriz expandida. Se estiverem ausentes, as linhas não serão expandidas."
			},
			columns: {
				name: "columns",
				detail: "O número de colunas na matriz expandida. Se estiverem ausente, as linhas não serão expandidas."
			},
			padWith: {
				name: "pad_with",
				detail: "O valor com o qual fazer pad. O padrão é #N/A."
			}
		}
	},
	FILTER: {
		description: "No exemplo a seguir, usamos a fórmula =FILTER(A5:D20,C5:C20=H2\",\") para retornar todos os registros para a Apple, conforme selecionado na célula H2 e, se não houver maçãs, retorne uma cadeia de caracteres vazia (\"\").",
		abstract: "No exemplo a seguir, usamos a fórmula =FILTER(A5:D20,C5:C20=H2\",\") para retornar todos os registros para a Apple, conforme selecionado na célula H2 e, se não houver maçãs, retorne uma cadeia de caracteres vazia (\"\").",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/filter-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "A matriz ou intervalo a filtrar"
			},
			include: {
				name: "include",
				detail: "Uma matriz booliana cuja altura ou largura é a mesma da matriz"
			},
			ifEmpty: {
				name: "if_empty",
				detail: "O valor a retornar se todos os valores na matriz incluída estiverem vazios (o filtro não retorna nada)"
			}
		}
	},
	FORMULATEXT: {
		description: "Retorna uma fórmula como uma cadeia de caracteres.",
		abstract: "Retorna uma fórmula como uma cadeia de caracteres.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/formulatext-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "Necessário. Uma referência a uma célula ou a um intervalo de células."
		} }
	},
	GETPIVOTDATA: {
		description: "Retorna dados visíveis armazenados em uma Tabela Dinâmica.",
		abstract: "Retorna dados visíveis armazenados em uma Tabela Dinâmica.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/getpivotdata-function"
		}],
		functionParameter: {
			dataField: {
				name: "dataField",
				detail: "O nome do campo da Tabela Dinâmica que contém os dados que você deseja recuperar. Isso precisa estar entre aspas. Exemplo: =GETPIVOTDATA(\"Vendas\", A3). Aqui, \"Vendas\" é o campo Valores que queremos obter. Uma vez que nenhum outro campo é especificado, GETPIVOTDATA devolve o valor total de vendas."
			},
			pivotTable: {
				name: "pivotTable",
				detail: "Uma referência a qualquer célula, intervalo de células ou intervalo nomeado de células em uma Tabela Dinâmica. Essas informações são usadas para determinar qual Tabela Dinâmica contém os dados que você deseja recuperar. Exemplo: =GETPIVOTDATA(\"Vendas\", A3). Aqui, a A3 é uma referência dentro da Tabela Dinâmica e indica à fórmula que tabela dinâmica deve utilizar."
			},
			field1: {
				name: "field1",
				detail: "De 1 a 126 pares de nomes de campo e item que descrevem os dados que você deseja recuperar. Os pares podem estar em qualquer ordem. Nomes de campos e nomes para itens diferentes de datas e números devem ser colocados entre aspas. Exemplo: =GETPIVOTDATA(\"Vendas\", A3, \"Mês\", \"Mar\"). Aqui, \"Mês\" é o campo e \"Mar\" é o item. Para especificar múltiplos itens para um campo, coloque-os entre chavetas (por exemplo: {\"Mar\", \"Abr\"}). Para Tabelas Dinâmicas OLAP , os itens podem conter o nome da fonte da dimensão e também o nome da fonte do item. Um par de campo e item de uma tabela dinâmica de OLAP poderia ter esta aparência: \"[Produto]\",\"[Produto].[Todos produtos].[Alimentos].[Confeitaria]\""
			},
			item1: {
				name: "item1",
				detail: "De 1 a 126 pares de nomes de campo e item que descrevem os dados que você deseja recuperar. Os pares podem estar em qualquer ordem. Nomes de campos e nomes para itens diferentes de datas e números devem ser colocados entre aspas. Exemplo: =GETPIVOTDATA(\"Vendas\", A3, \"Mês\", \"Mar\"). Aqui, \"Mês\" é o campo e \"Mar\" é o item. Para especificar múltiplos itens para um campo, coloque-os entre chavetas (por exemplo: {\"Mar\", \"Abr\"}). Para Tabelas Dinâmicas OLAP , os itens podem conter o nome da fonte da dimensão e também o nome da fonte do item. Um par de campo e item de uma tabela dinâmica de OLAP poderia ter esta aparência: \"[Produto]\",\"[Produto].[Todos produtos].[Alimentos].[Confeitaria]\""
			}
		}
	},
	HLOOKUP: {
		description: "Procura um valor na linha superior de uma tabela ou uma matriz de valores e retorna um valor na mesma coluna de uma linha especificada na tabela ou matriz. Use PROCH quando seus valores de comparação estiverem localizados em uma linha ao longo da parte superior de uma tabela de dados e você quiser observar um número específico de linhas mais abaixo. Use PROCV quando os valores de comparação estiverem em uma coluna à esquerda dos dados que você deseja localizar.",
		abstract: "Procura um valor na linha superior de uma tabela ou uma matriz de valores e retorna um valor na mesma coluna de uma linha especificada na tabela ou matriz. Use PROCH quando seus valores de comparação estiverem localizados em uma linha ao longo da parte superior de uma tabela de dados e você quiser observar um número específico de linhas mais abaixo. Use PROCV quando os valores de comparação estiverem em uma coluna à esquerda dos dados que você deseja localizar.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/hlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "Necessário. O valor a ser localizado na primeira linha da tabela. Valor_procurado pode ser um valor, uma referência ou uma cadeia de texto."
			},
			tableArray: {
				name: "table_array",
				detail: "Necessário. Uma tabela de informações onde os dados devem ser procurados. Use uma referência para um intervalo ou um nome de intervalo. Os valores na primeira linha de matriz_tabela podem ser texto, números ou valores lógicos. Se procurar_intervalo for VERDADEIRO, os valores na primeira linha de matriz_tabela deverão ser colocados em ordem ascendente: ...-2, -1, 0, 1, 2,... , A-Z, FALSO, VERDADEIRO, caso contrário, PROCH pode não retornar o valor correto. Se procurar_intervalo for FALSO, matriz_tabela não precisará ser ordenada. Textos em maiúsculas e minúsculas são equivalentes. Classifique os valores em ordem crescente, da esquerda para a direita. Para saber mais, confira Classificar dados em um intervalo ou tabela ."
			},
			rowIndexNum: {
				name: "row_index_num",
				detail: "Necessário. O número da linha em table_array do qual o valor correspondente será retornado. Um row_index_num de 1 retorna o valor da primeira linha em table_array, um row_index_num de 2 retorna o valor da segunda linha em table_array e assim por diante. Se row_index_num for menor que 1, PROCH retornará o #VALUE! valor de erro; se row_index_num for maior que o número de linhas em table_array, HLOOKUP retornará o #REF! valor de erro."
			},
			rangeLookup: {
				name: "range_lookup",
				detail: "Opcional. Um valor lógico que especifica se você quer que PROCH localize uma correspondência exata ou aproximada. Se VERDADEIRO ou omitido, uma correspondência aproximada é retornada. Em outras palavras, se uma correspondência exata não for localizada, o valor maior mais próximo que seja menor que o valor_procurado é retornado. Se FALSO, PROCH encontrará uma correspondência exata. Se nenhuma correspondência for localizada, o valor de erro #N/D será retornado."
			}
		}
	},
	HSTACK: {
		description: "Acrescenta matrizes horizontalmente e em sequência para retornar uma matriz maior.",
		abstract: "Acrescenta matrizes horizontalmente e em sequência para retornar uma matriz maior.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/hstack-function"
		}],
		functionParameter: {
			array1: {
				name: "array",
				detail: "As matrizes a anexar."
			},
			array2: {
				name: "array",
				detail: "As matrizes a anexar."
			}
		}
	},
	HYPERLINK: {
		description: "Cria um hiperlink dentro de uma célula.",
		abstract: "Cria um hiperlink dentro de uma célula.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3093313?hl=pt-BR"
		}],
		functionParameter: {
			url: {
				name: "url",
				detail: "A URL completa do destino do link entre aspas, ou uma referência a uma célula que contenha essa URL. São aceitos apenas protocolos específicos; se nenhum for informado, será usado http://."
			},
			linkLabel: {
				name: "link_label",
				detail: "[OPCIONAL — url por padrão] O texto a exibir na célula como link, entre aspas, ou uma referência a uma célula que contenha esse rótulo."
			}
		}
	},
	IMAGE: {
		description: "A função IMAGEM insere imagens em células de um local de origem juntamente com texto alternativo. Em seguida, você pode mover e redimensionar células, classificar e filtrar e trabalhar com imagens em uma tabela do Excel. Use essa função para aprimorar visualmente as listas de dados, como inventários, jogos, funcionários e conceitos matemáticos.",
		abstract: "A função IMAGEM insere imagens em células de um local de origem juntamente com texto alternativo. Em seguida, você pode mover e redimensionar células, classificar e filtrar e trabalhar com imagens em uma tabela do Excel. Use essa função para aprimorar visualmente as listas de dados, como inventários, jogos, funcionários e conceitos matemáticos.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/image-function"
		}],
		functionParameter: {
			source: {
				name: "source",
				detail: "O caminho da URL do arquivo de imagem, usando o protocolo \"https\"."
			},
			altText: {
				name: "alt_text",
				detail: "Texto alternativo que descreve a imagem para acessibilidade."
			},
			sizing: {
				name: "sizing",
				detail: "Especifica as dimensões da imagem."
			},
			height: {
				name: "height",
				detail: "A altura personalizada da imagem em pixels."
			},
			width: {
				name: "width",
				detail: "A largura personalizada da imagem em pixels."
			}
		}
	},
	INDEX: {
		description: "Retorna o valor de um elemento em uma tabela ou matriz, selecionada pelos índices de número de linha e coluna.",
		abstract: "Retorna o valor de um elemento em uma tabela ou matriz, selecionada pelos índices de número de linha e coluna.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/index-function"
		}],
		functionParameter: {
			reference: {
				name: "reference",
				detail: "Uma referência a um ou mais intervalos de células."
			},
			rowNum: {
				name: "row_num",
				detail: "O número da linha em referência da qual retornar uma referência."
			},
			columnNum: {
				name: "column_num",
				detail: "O número da coluna em referência da qual retornar uma referência."
			},
			areaNum: {
				name: "area_num",
				detail: "Seleciona um intervalo em referência do qual retornar a interseção de row_num e column_num."
			}
		}
	},
	INDIRECT: {
		description: "Retorna a referência especificada por uma cadeia de texto. As referências são imediatamente avaliadas para exibir seu conteúdo. Use INDIRETO quando quiser mudar a referência a uma célula em uma fórmula sem mudar a própria fórmula.",
		abstract: "Retorna a referência especificada por uma cadeia de texto. As referências são imediatamente avaliadas para exibir seu conteúdo. Use INDIRETO quando quiser mudar a referência a uma célula em uma fórmula sem mudar a própria fórmula.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/indirect-function"
		}],
		functionParameter: {
			refText: {
				name: "ref_text",
				detail: "Necessário. Uma referência a uma célula que contém uma referência de estilo A1, uma referência no estilo R1C1, um nome definido como uma referência ou uma referência a uma célula como uma cadeia de caracteres de texto. Se ref_text não for uma referência de célula válida, o INDIRECT retornará o #REF! valor de erro. Se ref_text se referir a outra pasta de trabalho (uma referência externa), a outra pasta de trabalho deverá estar aberta. Se a pasta de trabalho de origem não estiver aberta, o INDIRECT retornará o #REF! valor de erro. Observação Não há suporte para referências externas no Excel Web App. Se ref_text se referir a um intervalo de células fora do limite de linha de 1.048.576 ou o limite de coluna de 16.384 (XFD), o INDIRECT retornará um #REF! Erro."
			},
			a1: {
				name: "a1",
				detail: "Opcional. Um valor lógico que especifica o tipo de referência contido na célula texto_ref. Se a1 for VERDADEIRO ou omitido, texto_ref será interpretado como uma referência em estilo A1. Se a1 for FALSO, texto_ref será interpretado como uma referência em estilo L1C1."
			}
		}
	},
	LOOKUP: {
		description: "A forma vetorial de PROC procura um valor em um intervalo de uma linha ou coluna (conhecido como vetor) e retorna um valor da mesma posição em um segundo intervalo de uma linha ou coluna.",
		abstract: "A forma vetorial de PROC procura um valor em um intervalo de uma linha ou coluna (conhecido como vetor) e retorna um valor da mesma posição em um segundo intervalo de uma linha ou coluna.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/lookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "O valor que PROC procura no primeiro vetor. Pode ser um número, texto, valor lógico, nome ou referência a um valor."
			},
			lookupVectorOrArray: {
				name: "lookup_vectorOrArray",
				detail: "Um intervalo que contém apenas uma linha ou uma coluna."
			},
			resultVector: {
				name: "result_vector",
				detail: "Um intervalo que contém apenas uma linha ou coluna e deve ter o mesmo tamanho de lookup_vector."
			}
		}
	},
	MATCH: {
		description: "A função CORRESP procura um item especificado em um intervalo de células e retorna a posição relativa desse item no intervalo. Por exemplo, se o intervalo A1:A3 contiver os valores 5, 25 e 38, a fórmula =CORRESP(25,A1:A3,0) retornará o número 2, porque 25 é o segundo item no intervalo.",
		abstract: "A função CORRESP procura um item especificado em um intervalo de células e retorna a posição relativa desse item no intervalo. Por exemplo, se o intervalo A1:A3 contiver os valores 5, 25 e 38, a fórmula =CORRESP(25,A1:A3,0) retornará o número 2, porque 25 é o segundo item no intervalo.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/match-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "Match localiza o maior valor que é menor ou igual a lookup_value . Os valores no argumento lookup_array devem ser colocados em ordem crescente, por exemplo: ...-2, -1, 0, 1, 2, ..., A-Z, FALSE, TRUE."
			},
			lookupArray: {
				name: "lookup_array",
				detail: "MATCH localiza o primeiro valor exatamente igual a lookup_value . Os valores no argumento lookup_array podem estar em qualquer ordem."
			},
			matchType: {
				name: "match_type",
				detail: "MATCH localiza o menor valor que é maior ou igual a lookup_value . Os valores no argumento lookup_array devem ser colocados em ordem decrescente, por exemplo: TRUE, FALSE, Z-A, ... 2, 1, 0, -1, -2, ..., e assim por diante."
			}
		}
	},
	OFFSET: {
		description: "Retorna uma referência para um intervalo, que é um número especificado de linhas e colunas de uma célula ou intervalo de células. A referência retornada pode ser uma única célula ou um intervalo de células. Você pode especificar o número de linhas e de colunas a serem retornadas.",
		abstract: "Retorna uma referência para um intervalo, que é um número especificado de linhas e colunas de uma célula ou intervalo de células. A referência retornada pode ser uma única célula ou um intervalo de células. Você pode especificar o número de linhas e de colunas a serem retornadas.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/offset-function"
		}],
		functionParameter: {
			reference: {
				name: "reference",
				detail: "Necessário. A referência da qual você quer basear o deslocamento. A referência deve ser de uma célula ou intervalo de células adjacentes. Caso contrário, DESLOC retornará #VALOR! como valor de erro."
			},
			rows: {
				name: "rows",
				detail: "Necessário. O número de linhas, acima ou abaixo, a que se deseja que a célula superior esquerda se refira. Usar 5 como o argumento de linhas, especifica que a célula superior esquerda na referência está cinco linhas abaixo da referência. Lins podem ser positivas (que significa abaixo da referência inicial) ou negativas (acima da referência inicial)."
			},
			cols: {
				name: "columns",
				detail: "Necessário. O número de colunas, à esquerda ou à direita, a que se deseja que a célula superior esquerda do resultado se refira. Usar 5 como o argumento de colunas, especifica que a célula superior esquerda na referência está cinco colunas à direita da referência. Cols pode ser positivo (que significa à direita da referência inicial) ou negativo (à esquerda da referência inicial)."
			},
			height: {
				name: "height",
				detail: "Opcional. A altura, em número de linhas, que se deseja para a referência fornecida. Altura deve ser um número positivo."
			},
			width: {
				name: "width",
				detail: "Opcional. A largura, em número de colunas, que se deseja para a referência fornecida. Largura deve ser um número positivo."
			}
		}
	},
	ROW: {
		description: "Retorna o número da linha de uma referência.",
		abstract: "Retorna o número da linha de uma referência.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/row-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "Opcional. A célula ou intervalo de células cujo número da linha você deseja obter. Se ref for omitido, será equivalente à referência da célula na qual a função LIN aparecer. Se referência for um intervalo de células e se LIN for introduzido como uma matriz vertical, LIN devolve os números de linha de referência como uma matriz vertical. Ref não pode se referir a áreas múltiplas."
		} }
	},
	ROWS: {
		description: "Retorna o número de linhas em uma referência ou matriz.",
		abstract: "Retorna o número de linhas em uma referência ou matriz.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/rows-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "Necessário. Uma matriz, uma fórmula de matriz ou uma referência a um intervalo de células para as quais você deseja o número de linhas."
		} }
	},
	RTD: {
		description: "Recupera dados em tempo real de um programa compatível com a automação COM.",
		abstract: "Recupera dados em tempo real de um programa compatível com a automação COM.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/rtd-function"
		}],
		functionParameter: {
			progId: {
				name: "progId",
				detail: "Obrigatório. O nome do ProgID de um suplemento de automatização COM registado que foi instalado no computador local. Coloque o nome entre aspas."
			},
			server: {
				name: "server",
				detail: "Obrigatório. O nome do servidor em que o suplemento deverá ser executado. Se não houver servidor e o programa for executado localmente, deixe o argumento em branco. Caso contrário, coloque o nome do servidor entre aspas (\"\"). Ao usar RTD no Visual Basic for Applications (VBA), é necessário usar aspas duplas ou a propriedade NullString do VBA para o servidor, mesmo que a execução seja local."
			},
			topic1: {
				name: "topic1",
				detail: "O tópico1 é obrigatório, os tópicos subsequentes são opcionais. Parâmetros de 1 a 253 que, juntos, representam uma parte exclusiva de dados em tempo real."
			},
			topic2: {
				name: "topic2",
				detail: "O tópico1 é obrigatório, os tópicos subsequentes são opcionais. Parâmetros de 1 a 253 que, juntos, representam uma parte exclusiva de dados em tempo real."
			}
		}
	},
	SORT: {
		description: "Neste exemplo, classificaremos por Região, Representante de vendas e Produto individualmente usando =CLASSIFICAR(A2:A17), com valores copiados entre as células F2, H2 e J2.",
		abstract: "Neste exemplo, classificaremos por Região, Representante de vendas e Produto individualmente usando =CLASSIFICAR(A2:A17), com valores copiados entre as células F2, H2 e J2.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/sort-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "O intervalo ou uma matriz a ser classificado"
			},
			sortIndex: {
				name: "sort_index",
				detail: "Um número indicando a linha ou a coluna pela qual realizar a classificação"
			},
			sortOrder: {
				name: "sort_order",
				detail: "Um número que indica a ordem de classificação desejada; 1 para ordem crescente (padrão), -1 para ordem decrescente"
			},
			byCol: {
				name: "by_col",
				detail: "Um valor lógico que indica a direção de classificação desejada; FALSO para classificar por linha (padrão), VERDADEIRO para classificar por coluna"
			}
		}
	},
	SORTBY: {
		description: "Neste exemplo, classificamos uma lista de nomes de pessoas pela respectiva idade, em ordem crescente.",
		abstract: "Neste exemplo, classificamos uma lista de nomes de pessoas pela respectiva idade, em ordem crescente.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/sortby-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "A matriz ou intervalo a classificar"
			},
			byArray1: {
				name: "by_array1",
				detail: "A matriz ou intervalo no qual classificar"
			},
			sortOrder1: {
				name: "sort_order1",
				detail: "A ordem a utilizar para classificação. 1 para ordem crescente, -1 para ordem decrescente. O padrão é crescente."
			},
			byArray2: {
				name: "by_array2",
				detail: "A matriz ou intervalo no qual classificar"
			},
			sortOrder2: {
				name: "sort_order2",
				detail: "A ordem a utilizar para classificação. 1 para ordem crescente, -1 para ordem decrescente. O padrão é crescente."
			}
		}
	},
	TAKE: {
		description: "Retorna um número especificado de linhas ou colunas contíguas do início ou do fim de uma matriz.",
		abstract: "Retorna um número especificado de linhas ou colunas contíguas do início ou do fim de uma matriz.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/take-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "A matriz da qual usar linhas ou colunas."
			},
			rows: {
				name: "rows",
				detail: "O número de linhas a serem tomadas. Um valor negativo é removido do final da matriz."
			},
			columns: {
				name: "columns",
				detail: "O número de colunas a serem tomadas. Um valor negativo é removido do final da matriz."
			}
		}
	},
	TOCOL: {
		description: "Retorna a matriz em uma única coluna.",
		abstract: "Retorna a matriz em uma única coluna.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/tocol-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "A matriz ou referência a retornar como coluna."
			},
			ignore: {
				name: "ignore",
				detail: "Indica se determinados tipos de valores devem ser ignorados. Por padrão, nenhum é ignorado: 0 mantém todos, 1 ignora vazios, 2 ignora erros e 3 ignora vazios e erros."
			},
			scanByColumn: {
				name: "scan_by_column",
				detail: "Examina a matriz por coluna. Por padrão, ela é examinada por linha; isso determina se os valores são ordenados por linha ou por coluna."
			}
		}
	},
	TOROW: {
		description: "Retorna a matriz em uma única linha.",
		abstract: "Retorna a matriz em uma única linha.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/torow-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "A matriz ou referência a retornar como linha."
			},
			ignore: {
				name: "ignore",
				detail: "Indica se determinados tipos de valores devem ser ignorados. Por padrão, nenhum é ignorado: 0 mantém todos, 1 ignora vazios, 2 ignora erros e 3 ignora vazios e erros."
			},
			scanByColumn: {
				name: "scan_by_column",
				detail: "Examina a matriz por coluna. Por padrão, ela é examinada por linha; isso determina se os valores são ordenados por linha ou por coluna."
			}
		}
	},
	TRANSPOSE: {
		description: "Às vezes, será necessário alternar ou girar células. É possível fazer isso copiando, colando e usando a opção Transpor . Mas essa ação cria dados duplicados. Se não for isso que você deseja, digite uma fórmula que use a função TRANSPOR. Por exemplo, na imagem a seguir a fórmula =TRANSPOR(A1:B4) organiza horizontalmente as células de A1 a B4.",
		abstract: "Às vezes, será necessário alternar ou girar células. É possível fazer isso copiando, colando e usando a opção Transpor . Mas essa ação cria dados duplicados. Se não for isso que você deseja, digite uma fórmula que use a função TRANSPOR. Por exemplo, na imagem a seguir a fórmula =TRANSPOR(A1:B4) organiza horizontalmente as células de A1 a B4.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/transpose-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "Um intervalo de células ou uma matriz em uma planilha."
		} }
	},
	UNIQUE: {
		description: "Retornar nomes exclusivos de uma lista de nomes",
		abstract: "Retornar nomes exclusivos de uma lista de nomes",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/unique-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "O intervalo ou matriz do qual retornar linhas ou colunas exclusivas"
			},
			byCol: {
				name: "by_col",
				detail: "O argumento by_col é um valor lógico que indica como comparar. VERDADEIRO comparará colunas umas com as outras e retornará as colunas exclusivas FALSO (ou oculto) comparará linhas umas com as outras e retornará as linhas exclusivas"
			},
			exactlyOnce: {
				name: "exactly_once",
				detail: "O argumento exactly_once é um valor lógico que retornará linhas ou colunas que ocorrem exatamente uma vez no intervalo ou na matriz. Esse é o conceito de banco de dados exclusivo. VERDADEIRO retornará todas as linhas ou colunas distintas que ocorrem exatamente uma vez do intervalo ou da matriz FALSO (ou oculto) retornará todas as linhas ou colunas do intervalo ou da matriz"
			}
		}
	},
	VLOOKUP: {
		description: "Use a função PROCV para pesquisar um valor em uma tabela.",
		abstract: "Use a função PROCV para pesquisar um valor em uma tabela.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/vlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "O valor que você deseja procurar. Ele deve estar na primeira coluna do intervalo especificado em table_array."
			},
			tableArray: {
				name: "table_array",
				detail: "O intervalo de células em que PROCV procura lookup_value e o valor de retorno. Pode ser um intervalo nomeado ou uma tabela."
			},
			colIndexNum: {
				name: "col_index_num",
				detail: "O número da coluna, começando em 1 para a coluna mais à esquerda de table_array, que contém o valor de retorno."
			},
			rangeLookup: {
				name: "range_lookup",
				detail: "Um valor lógico que especifica se PROCV deve encontrar uma correspondência aproximada (1/VERDADEIRO) ou exata (0/FALSO)."
			}
		}
	},
	VSTACK: {
		description: "Acrescenta matrizes verticalmente e em sequência para retornar uma matriz maior.",
		abstract: "Acrescenta matrizes verticalmente e em sequência para retornar uma matriz maior.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/vstack-function"
		}],
		functionParameter: {
			array1: {
				name: "array",
				detail: "As matrizes a anexar."
			},
			array2: {
				name: "array",
				detail: "As matrizes a anexar."
			}
		}
	},
	WRAPCOLS: {
		description: "Envolve a linha ou coluna de valores fornecida por colunas após um número especificado de elementos para formar uma nova matriz.",
		abstract: "Envolve a linha ou coluna de valores fornecida por colunas após um número especificado de elementos para formar uma nova matriz.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/wrapcols-function"
		}],
		functionParameter: {
			vector: {
				name: "vector",
				detail: "O vetor ou referência ao wrap."
			},
			wrapCount: {
				name: "wrap_count",
				detail: "O número máximo de valores para cada coluna."
			},
			padWith: {
				name: "pad_with",
				detail: "O valor com o qual fazer pad. O padrão é #N/A."
			}
		}
	},
	WRAPROWS: {
		description: "Envolve a linha ou coluna de valores fornecida por linhas após um número especificado de elementos para formar uma nova matriz.",
		abstract: "Envolve a linha ou coluna de valores fornecida por linhas após um número especificado de elementos para formar uma nova matriz.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/wraprows-function"
		}],
		functionParameter: {
			vector: {
				name: "vector",
				detail: "O vetor ou referência ao wrap."
			},
			wrapCount: {
				name: "wrap_count",
				detail: "O número máximo de valores para cada linha."
			},
			padWith: {
				name: "pad_with",
				detail: "O valor com o qual fazer pad. O padrão é #N/A."
			}
		}
	},
	XLOOKUP: {
		description: "Use a função PROCX quando precisar localizar coisas em linhas de uma tabela ou de um intervalo. Por exemplo, procure o preço de uma peça automotiva pelo número da peça ou encontre um nome de funcionário com base na ID do funcionário. Com o PROCX, você pode procurar em uma coluna por um termo de pesquisa e retornar um resultado da mesma linha em outra coluna, independentemente de qual lado a coluna de retorno esteja.",
		abstract: "Use a função PROCX quando precisar localizar coisas em linhas de uma tabela ou de um intervalo. Por exemplo, procure o preço de uma peça automotiva pelo número da peça ou encontre um nome de funcionário com base na ID do funcionário. Com o PROCX, você pode procurar em uma coluna por um termo de pesquisa e retornar um resultado da mesma linha em outra coluna, independentemente de qual lado a coluna de retorno esteja.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/xlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "O valor a procurar *Se for omitido, PROCX devolve células em branco que encontra no lookup_array ."
			},
			lookupArray: {
				name: "lookup_array",
				detail: "A matriz ou intervalo a classificar"
			},
			returnArray: {
				name: "return_array",
				detail: "A matriz ou intervalo a retornar"
			},
			ifNotFound: {
				name: "if_not_found",
				detail: "Quando uma coincidência válida não é encontrada, retorna o texto [if_not_found] que você fornece. Se uma correspondência válida não for encontrada e [if_not_found] estiver ausente, #N/A será retornado."
			},
			matchMode: {
				name: "match_mode",
				detail: "Especificar o tipo de correspondência: 0 – Correspondência exata. Se nenhum for encontrado, retornar #N/A. Esse é o padrão. -1 – Correspondência exata. Se nenhum for encontrado, retorna o próximo item menor. 1 – Correspondência exata. Se nenhum for encontrado, retorna o próximo item maior. 2 – Uma correspondência de curingas, em que *,? e ~ têm um significado especial ."
			},
			searchMode: {
				name: "search_mode",
				detail: "Especificar o modo de pesquisa a ser usado: 1 – Executar uma pesquisa começando do primeiro item. Esse é o padrão. -1 – Executar uma pesquisa reversa começando do último item. 2 – Executar uma pesquisa binária que dependa da classificação da matriz_procurada em ordem crescente . Caso contrário, resultados inválidos serão retornados. -2 – Executar uma pesquisa binária que dependa da classificação da matriz_procurada em ordem decrescente . Caso contrário, resultados inválidos serão retornados."
			}
		}
	},
	XMATCH: {
		description: "Suponha que tenhamos uma lista de produtos nas células C3 a C7 e que desejemos determinar em que parte da lista está localizado o produto da célula E3. Aqui, usaremos o CORRESPX para determinar a posição de um item em uma lista.",
		abstract: "Suponha que tenhamos uma lista de produtos nas células C3 a C7 e que desejemos determinar em que parte da lista está localizado o produto da célula E3. Aqui, usaremos o CORRESPX para determinar a posição de um item em uma lista.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/xmatch-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "O valor de pesquisa"
			},
			lookupArray: {
				name: "lookup_array",
				detail: "A matriz ou intervalo a classificar"
			},
			matchMode: {
				name: "match_mode",
				detail: "Especificar o tipo de correspondência: 0 - Correspondência exata (padrão) -1 – Correspondência exata ou o próximo item menor 1 – Correspondência exata ou o próximo item maior 2 – Uma correspondência de curingas, em que *,? e ~ têm um significado especial ."
			},
			searchMode: {
				name: "search_mode",
				detail: "Especificar o tipo de pesquisa: 1 – Pesquisar do primeiro ao último (padrão) -1 – Pesquisar do último ao primeiro (pesquisa inversa). 2 – Executar uma pesquisa binária que dependa da classificação da matriz_procurada em ordem crescente . Caso contrário, resultados inválidos serão retornados. -2 – Executar uma pesquisa binária que dependa da classificação da matriz_procurada em ordem decrescente . Caso contrário, resultados inválidos serão retornados."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/math/pt-BR.ts
const locale$5 = {
	ABS: {
		description: "Retorna o valor absoluto de um número. Esse valor é o número sem o seu sinal.",
		abstract: "Retorna o valor absoluto de um número. Esse valor é o número sem o seu sinal.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/abs-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório. O número real cujo valor absoluto você deseja obter."
		} }
	},
	ACOS: {
		description: "Retorna o arco cosseno ou o cosseno inverso de um número. O arco cosseno é o ângulo cujo cosseno é núm . O ângulo retornado é fornecido em radianos no intervalo de 0 (zero) a pi.",
		abstract: "Retorna o arco cosseno ou o cosseno inverso de um número. O arco cosseno é o ângulo cujo cosseno é núm . O ângulo retornado é fornecido em radianos no intervalo de 0 (zero) a pi.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/acos-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório. O cosseno do ângulo desejado e deve estar entre -1 e 1."
		} }
	},
	ACOSH: {
		description: "Retorna o cosseno hiperbólico inverso de um número. O número deve ser maior ou igual a 1. O cosseno hiperbólico inverso é o valor cujo cosseno hiperbólico é núm , de modo que ACOSH(COSH(núm)) é igual a núm .",
		abstract: "Retorna o cosseno hiperbólico inverso de um número. O número deve ser maior ou igual a 1. O cosseno hiperbólico inverso é o valor cujo cosseno hiperbólico é núm , de modo que ACOSH(COSH(núm)) é igual a núm .",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/acosh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório. Qualquer número real maior ou igual a 1."
		} }
	},
	ACOT: {
		description: "Retorna o valor principal do arco cotangente, ou cotangente inverso, de um número.",
		abstract: "Retorna o valor principal do arco cotangente, ou cotangente inverso, de um número.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/acot-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório. O número é o cotangente do ângulo desejado. Esse deve ser um número real."
		} }
	},
	ACOTH: {
		description: "Retorna o cotangente hiperbólico inverso de um número.",
		abstract: "Retorna o cotangente hiperbólico inverso de um número.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/acoth-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "O valor absoluto de número deve ser maior que 1."
		} }
	},
	AGGREGATE: {
		description: "Retorna uma agregação em uma lista ou banco de dados. A função AGREGAR pode aplicar diferentes funções de agregação a uma lista ou a um banco de dados com a opção de ignorar linhas ocultas e valores de erro.",
		abstract: "Retorna uma agregação em uma lista ou banco de dados. A função AGREGAR pode aplicar diferentes funções de agregação a uma lista ou a um banco de dados com a opção de ignorar linhas ocultas e valores de erro.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/aggregate-function"
		}],
		functionParameter: {
			functionNum: {
				name: "function_num",
				detail: "Obrigatório. Um número de 1 a 19 que especifica qual função usar."
			},
			options: {
				name: "options",
				detail: "Obrigatório. Um valor numérico que determina quais valores ignorar no intervalo de avaliação da função. Observação A função não ignorará linhas ocultas, subtotais aninhados ou agregados aninhados se o argumento de matriz incluir um cálculo, por exemplo: =AGREGAR(14;3;A1:A100*(A1:A100>0),1)"
			},
			ref1: {
				name: "ref1",
				detail: "Obrigatório. O primeiro argumento numérico para funções que usam vários argumentos numéricos para os quais você quer agregar o valor."
			},
			ref2: {
				name: "ref2",
				detail: "Opcional. Argumentos numéricos de 2 a 253 dos quais você quer o valor de agregação. Para funções que usam uma matriz, ref1 é uma matriz, uma fórmula de matriz ou uma referência a um intervalo de células das quais você quer o valor de agregação. Ref2 é um segundo argumento requerido para certas funções. As funções a seguir requerem um argumento ref2:"
			}
		}
	},
	ARABIC: {
		description: "Converte um algarismo romano em um arábico.",
		abstract: "Converte um algarismo romano em um arábico.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/arabic-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Obrigatório. Uma cadeia de caracteres entre aspas, uma cadeia de caracteres vazia(\"\") ou uma referência a uma célula que contém texto."
		} }
	},
	ASIN: {
		description: "Retorna o arco seno ou o seno inverso de um número. O arco seno é o ângulo cujo seno é núm . O ângulo retornado é fornecido em radianos no intervalo de -pi/2 a pi/2.",
		abstract: "Retorna o arco seno ou o seno inverso de um número. O arco seno é o ângulo cujo seno é núm . O ângulo retornado é fornecido em radianos no intervalo de -pi/2 a pi/2.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/asin-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório. O seno do ângulo desejado e deve estar entre -1 e 1."
		} }
	},
	ASINH: {
		description: "Retorna o seno hiperbólico inverso de um número. O seno hiperbólico inverso é o valor cujo seno hiperbólico é núm , de modo que ASENH(SENH(núm)) é igual a núm .",
		abstract: "Retorna o seno hiperbólico inverso de um número. O seno hiperbólico inverso é o valor cujo seno hiperbólico é núm , de modo que ASENH(SENH(núm)) é igual a núm .",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/asinh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório. Qualquer número real."
		} }
	},
	ATAN: {
		description: "Retorna o arco tangente, ou a tangente inversa, de um número. O arco tangente é o ângulo cuja tangente é núm . O ângulo retornado é fornecido em radianos no intervalo -pi/2 a pi/2.",
		abstract: "Retorna o arco tangente, ou a tangente inversa, de um número. O arco tangente é o ângulo cuja tangente é núm . O ângulo retornado é fornecido em radianos no intervalo -pi/2 a pi/2.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/atan-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório. A tangente do ângulo desejado."
		} }
	},
	ATAN2: {
		description: "Retorna o arco tangente, ou a tangente inversa, das coordenadas x e y especificadas. O arco tangente é o ângulo entre eixo x e uma linha que contém a origem (0, 0) e um ponto com coordenadas (núm_x; núm_y). O ângulo é fornecido em radianos entre -pi e pi, excluindo -pi.",
		abstract: "Retorna o arco tangente, ou a tangente inversa, das coordenadas x e y especificadas. O arco tangente é o ângulo entre eixo x e uma linha que contém a origem (0, 0) e um ponto com coordenadas (núm_x; núm_y). O ângulo é fornecido em radianos entre -pi e pi, excluindo -pi.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/atan2-function"
		}],
		functionParameter: {
			xNum: {
				name: "x_num",
				detail: "Obrigatório. A coordenada x do ponto."
			},
			yNum: {
				name: "y_num",
				detail: "Obrigatório. A coordenada y do ponto."
			}
		}
	},
	ATANH: {
		description: "Retorna a tangente hiperbólica inversa de um número. O número deve estar entre -1 e 1 (excluindo -1 e 1). A tangente hiperbólica inversa é o valor cuja tangente hiperbólica é núm , de modo que ATANH(TANH(núm)) é igual a núm .",
		abstract: "Retorna a tangente hiperbólica inversa de um número. O número deve estar entre -1 e 1 (excluindo -1 e 1). A tangente hiperbólica inversa é o valor cuja tangente hiperbólica é núm , de modo que ATANH(TANH(núm)) é igual a núm .",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/atanh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório. Qualquer número real entre 1 e -1."
		} }
	},
	BASE: {
		description: "Converte um número em uma representação de texto com a base fornecida.",
		abstract: "Converte um número em uma representação de texto com a base fornecida.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/base-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. O número que você deseja converter. Deve ser um número inteiro maior que ou igual a 0 e menor que 2^53."
			},
			radix: {
				name: "radix",
				detail: "Obrigatório. A base para a qual você deseja converter o número. Deve ser um número inteiro maior que ou igual a 2 e menor que ou igual a 36."
			},
			minLength: {
				name: "min_length",
				detail: "Opcional. A extensão mínima da cadeia de caracteres retornada. Deve ser um número inteiro maior que ou igual a 0."
			}
		}
	},
	CEILING: {
		description: "Retorna um núm arredondado para cima, afastando-o de zero, até o múltiplo mais próximo de significância. Por exemplo, se quiser evitar usar centavos nos preços e o seu produto custar $ 4,42, use a fórmula =TETO(4;42;0;05) para arredondar os preços para cima até o valor inteiro mais próximo.",
		abstract: "Retorna um núm arredondado para cima, afastando-o de zero, até o múltiplo mais próximo de significância. Por exemplo, se quiser evitar usar centavos nos preços e o seu produto custar $ 4,42, use a fórmula =TETO(4;42;0;05) para arredondar os preços para cima até o valor inteiro mais próximo.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/ceiling-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. O valor que você deseja arredondar."
			},
			significance: {
				name: "significance",
				detail: "Obrigatório. O múltiplo para o qual você deseja arredondar."
			}
		}
	},
	CEILING_MATH: {
		description: "O TETO. A função MATH arredonda um número até o inteiro mais próximo ou, opcionalmente, para o múltiplo de significado mais próximo.",
		abstract: "O TETO. A função MATH arredonda um número até o inteiro mais próximo ou, opcionalmente, para o múltiplo de significado mais próximo.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/ceiling-math-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Necessário. (deve estar entre -2.229E-308.e 9.99E+307.)"
			},
			significance: {
				name: "significance",
				detail: "Opcional. Esse é o número de dígitos significativos após o ponto decimal para o qual o número deve ser arredondado."
			},
			mode: {
				name: "mode",
				detail: "Opcional. Isso controla se os números negativos são arredondados para ou longe de zero."
			}
		}
	},
	CEILING_PRECISE: {
		description: "Retorna um número que é arredondado para o inteiro mais próximo ou para o múltiplo mais próximo de significância. Independentemente do sinal de núm, um valor será arredondado. No entanto, se núm ou significância for zero, zero será retornado.",
		abstract: "Retorna um número que é arredondado para o inteiro mais próximo ou para o múltiplo mais próximo de significância. Independentemente do sinal de núm, um valor será arredondado. No entanto, se núm ou significância for zero, zero será retornado.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/ceiling-precise-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. O valor a ser arredondado."
			},
			significance: {
				name: "significance",
				detail: "Opcional. O múltiplo para o qual o número será arredondado. Se a significância for omitida, o valor padrão será 1."
			}
		}
	},
	COMBIN: {
		description: "Retorna o número de combinações de um determinado número de itens. Use COMBIN para determinar o número total possível de grupos para determinado número de objetos.",
		abstract: "Retorna o número de combinações de um determinado número de itens. Use COMBIN para determinar o número total possível de grupos para determinado número de objetos.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/combin-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. O número de itens."
			},
			numberChosen: {
				name: "number_chosen",
				detail: "Necessário. O número de itens em cada combinação."
			}
		}
	},
	COMBINA: {
		description: "Retorna o número de combinações (com repetições) de um determinado número de itens.",
		abstract: "Retorna o número de combinações (com repetições) de um determinado número de itens.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/combina-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. Deve ser maior que ou igual a 0 e maior que ou igual a Núm_escolhido. Os valores que não forem inteiros serão truncados."
			},
			numberChosen: {
				name: "number_chosen",
				detail: "Necessário. Deve ser maior que ou igual a 0. Os valores que não forem inteiros serão truncados."
			}
		}
	},
	COS: {
		description: "Retorna o cosseno do ângulo dado.",
		abstract: "Retorna o cosseno do ângulo dado.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/cos-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório. O ângulo em radianos cujo cosseno você deseja obter."
		} }
	},
	COSH: {
		description: "Retorna o cosseno hiperbólico de um número.",
		abstract: "Retorna o cosseno hiperbólico de um número.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/cosh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório. Qualquer número real cujo cosseno hiperbólico você deseja calcular."
		} }
	},
	COT: {
		description: "Retorna o cotangente de um ângulo especificado em radianos.",
		abstract: "Retorna o cotangente de um ângulo especificado em radianos.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/cot-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório. O ângulo em radianos para o qual você deseja o cotangente."
		} }
	},
	COTH: {
		description: "Devolver a cotangente hiperbólica de um ângulo hiperbólico.",
		abstract: "Devolver a cotangente hiperbólica de um ângulo hiperbólico.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/coth-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório."
		} }
	},
	CSC: {
		description: "Retorna a cossecante de um ângulo especificado em radianos.",
		abstract: "Retorna a cossecante de um ângulo especificado em radianos.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/csc-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório."
		} }
	},
	CSCH: {
		description: "Retorna a hiperbólica da cossecante de um ângulo especificado em radianos.",
		abstract: "Retorna a hiperbólica da cossecante de um ângulo especificado em radianos.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/csch-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório."
		} }
	},
	DECIMAL: {
		description: "Converte uma representação de texto de um número em uma determinada base em um número decimal.",
		abstract: "Converte uma representação de texto de um número em uma determinada base em um número decimal.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/decimal-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Obrigatório."
			},
			radix: {
				name: "radix",
				detail: "Necessário. O radix deve ser um número inteiro."
			}
		}
	},
	DEGREES: {
		description: "Converte radianos em graus.",
		abstract: "Converte radianos em graus.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/degrees-function"
		}],
		functionParameter: { angle: {
			name: "angle",
			detail: "Necessário. O ângulo em radianos que se deseja converter."
		} }
	},
	EVEN: {
		description: "Retorna o núm arredondado para o inteiro par mais próximo. Esta função pode ser usada para processar itens que aparecem em pares. Por exemplo, um engradado aceita fileiras de um ou dois itens. O engradado está cheio quando o número de itens, arredondado para mais até o par mais próximo, preencher sua capacidade.",
		abstract: "Retorna o núm arredondado para o inteiro par mais próximo. Esta função pode ser usada para processar itens que aparecem em pares. Por exemplo, um engradado aceita fileiras de um ou dois itens. O engradado está cheio quando o número de itens, arredondado para mais até o par mais próximo, preencher sua capacidade.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/even-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório. O valor a ser arredondado."
		} }
	},
	EXP: {
		description: "Retorna e elevado à potência de núm. A constante e é igual a 2,71828182845904, a base do logaritmo natural.",
		abstract: "Retorna e elevado à potência de núm. A constante e é igual a 2,71828182845904, a base do logaritmo natural.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/exp-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório. O expoente aplicado à base e."
		} }
	},
	FACT: {
		description: "Retorna o FATORIALrial de um número. O FATORIALrial de um número é igual ao número 1*2*3*...*.",
		abstract: "Retorna o FATORIALrial de um número. O FATORIALrial de um número é igual ao número 1*2*3*...*.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/fact-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório. O número não negativo para o qual você deseja obter o FATORIALrial. Se o número não for um inteiro, ele será truncado."
		} }
	},
	FACTDOUBLE: {
		description: "Retorna o fatorial duplo de um número.",
		abstract: "Retorna o fatorial duplo de um número.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/factdouble-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório. O valor para o qual você deseja retornar o fatorial duplo. Se núm não for um inteiro, será truncado."
		} }
	},
	FLOOR: {
		description: "A função FLOOR no Excel arredonda um número especificado para baixo para o múltiplo de significado especificado mais próximo. Os números negativos são arredondados para baixo (mais negativos) para vários inteiros mais próximos abaixo de zero.",
		abstract: "A função FLOOR no Excel arredonda um número especificado para baixo para o múltiplo de significado especificado mais próximo. Os números negativos são arredondados para baixo (mais negativos) para vários inteiros mais próximos abaixo de zero.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/floor-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. O valor numérico que você deseja arredondar."
			},
			significance: {
				name: "significance",
				detail: "Necessário. O múltiplo para o qual você deseja arredondar."
			}
		}
	},
	FLOOR_MATH: {
		description: "Arredonda um número para baixo, para o número inteiro mais próximo ou para o próximo múltiplo significativo.",
		abstract: "Arredonda um número para baixo, para o número inteiro mais próximo ou para o próximo múltiplo significativo.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/floor-math-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. O número a ser arredondado para baixo."
			},
			significance: {
				name: "significance",
				detail: "Opcional. O múltiplo para o qual você deseja arredondar."
			},
			mode: {
				name: "mode",
				detail: "Opcional. A direção (aproximando-se ou afastando-se de 0) na qual os números negativos devem ser arredondados."
			}
		}
	},
	FLOOR_PRECISE: {
		description: "Retorna um número que é arredondado para baixo para o inteiro mais próximo ou para o múltiplo mais próximo de significância. Independentemente do sinal do número, ele será arredondado para baixo. No entanto, se o número ou a significância for zero, zero será retornado.",
		abstract: "Retorna um número que é arredondado para baixo para o inteiro mais próximo ou para o múltiplo mais próximo de significância. Independentemente do sinal do número, ele será arredondado para baixo. No entanto, se o número ou a significância for zero, zero será retornado.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/floor-precise-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. O valor a ser arredondado."
			},
			significance: {
				name: "significance",
				detail: "Opcional. O múltiplo para o qual o número será arredondado. Se a significância for omitida, o valor padrão será 1."
			}
		}
	},
	GCD: {
		description: "Retorna o máximo divisor comum de dois ou mais inteiros. O máximo divisor comum é o maior inteiro que divide núm1 e núm2 sem resto.",
		abstract: "Retorna o máximo divisor comum de dois ou mais inteiros. O máximo divisor comum é o maior inteiro que divide núm1 e núm2 sem resto.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/gcd-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Número1 é necessário, números subsequentes são opcionais. Valores de 1 a 255. Se o valor não for um inteiro, será truncado."
			},
			number2: {
				name: "number2",
				detail: "Número1 é necessário, números subsequentes são opcionais. Valores de 1 a 255. Se o valor não for um inteiro, será truncado."
			}
		}
	},
	INT: {
		description: "Arredonda um número para baixo até o número inteiro mais próximo.",
		abstract: "Arredonda um número para baixo até o número inteiro mais próximo.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/int-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório. O número real que se deseja arredondar para baixo até um inteiro."
		} }
	},
	ISO_CEILING: {
		description: "Retorna um número que é arredondado para o inteiro mais próximo ou para o múltiplo mais próximo de significância. Independentemente do sinal de núm, um valor será arredondado. No entanto, se núm ou significância for zero, zero será retornado.",
		abstract: "Retorna um número que é arredondado para o inteiro mais próximo ou para o múltiplo mais próximo de significância. Independentemente do sinal de núm, um valor será arredondado. No entanto, se núm ou significância for zero, zero será retornado.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/iso-ceiling-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. O valor a ser arredondado."
			},
			significance: {
				name: "significance",
				detail: "Opcional. O múltiplo para o qual o número será arredondado. Se a significância for omitida, o valor padrão será 1."
			}
		}
	},
	LCM: {
		description: "Retorna o mínimo múltiplo comum de inteiros. O mínimo múltiplo comum é o menor inteiro positivo múltiplo de todos os argumentos inteiros núm1, núm 2, e assim por diante. Use MMC para incluir frações com denominadores diferentes.",
		abstract: "Retorna o mínimo múltiplo comum de inteiros. O mínimo múltiplo comum é o menor inteiro positivo múltiplo de todos os argumentos inteiros núm1, núm 2, e assim por diante. Use MMC para incluir frações com denominadores diferentes.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/lcm-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Número1 é necessário, números subsequentes são opcionais. Valores de 1 a 255 para os quais você deseja obter o mínimo múltiplo comum. Se o valor não for um inteiro, será truncado."
			},
			number2: {
				name: "number2",
				detail: "Número1 é necessário, números subsequentes são opcionais. Valores de 1 a 255 para os quais você deseja obter o mínimo múltiplo comum. Se o valor não for um inteiro, será truncado."
			}
		}
	},
	LN: {
		description: "Retorna o logaritmo natural de um número. Os logaritmos naturais se baseiam na constante e (2,71828182845904).",
		abstract: "Retorna o logaritmo natural de um número. Os logaritmos naturais se baseiam na constante e (2,71828182845904).",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/ln-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório. O número real positivo para o qual você deseja obter o logaritmo natural."
		} }
	},
	LOG: {
		description: "Retorna o logaritmo de um número de uma base especificada.",
		abstract: "Retorna o logaritmo de um número de uma base especificada.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/log-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. O número real positivo para o qual você deseja obter o logaritmo."
			},
			base: {
				name: "base",
				detail: "Opcional. A base do logaritmo. Se base for omitido, será considerado 10."
			}
		}
	},
	LOG10: {
		description: "Retorna o logaritmo de base 10 de um número.",
		abstract: "Retorna o logaritmo de base 10 de um número.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/log10-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório. O número real positivo para o qual você deseja obter o logaritmo na base 10."
		} }
	},
	MDETERM: {
		description: "Retorna o determinante de uma matriz de uma variável do tipo matriz.",
		abstract: "Retorna o determinante de uma matriz de uma variável do tipo matriz.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/mdeterm-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "Necessário. Uma matriz numérica com um número igual de linhas e colunas."
		} }
	},
	MINVERSE: {
		description: "A função MINVERSE devolve a matriz inversa de uma matriz armazenada numa matriz.",
		abstract: "A função MINVERSE devolve a matriz inversa de uma matriz armazenada numa matriz.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/minverse-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "Obrigatório. Uma matriz numérica com um número igual de linhas e colunas."
		} }
	},
	MMULT: {
		description: "A função MMULT retorna o produto de matriz de duas matrizes. O resultado é uma matriz com o mesmo número de linhas que matriz1 e com o mesmo número de colunas que matriz2.",
		abstract: "A função MMULT retorna o produto de matriz de duas matrizes. O resultado é uma matriz com o mesmo número de linhas que matriz1 e com o mesmo número de colunas que matriz2.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/mmult-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "As matrizes que você deseja multiplicar."
			},
			array2: {
				name: "array2",
				detail: "As matrizes que você deseja multiplicar."
			}
		}
	},
	MOD: {
		description: "Retorna o resto depois da divisão de número por divisor. O resultado possui o mesmo sinal que divisor.",
		abstract: "Retorna o resto depois da divisão de número por divisor. O resultado possui o mesmo sinal que divisor.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/mod-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. O número para o qual você deseja encontrar o resto."
			},
			divisor: {
				name: "divisor",
				detail: "Necessário. O número pelo qual você deseja dividir o número."
			}
		}
	},
	MROUND: {
		description: "MROUND devolve um número arredondado para o múltiplo pretendido.",
		abstract: "MROUND devolve um número arredondado para o múltiplo pretendido.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/mround-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. O valor a ser arredondado."
			},
			multiple: {
				name: "multiple",
				detail: "Obrigatório. O múltiplo para o qual se deseja arredondar núm."
			}
		}
	},
	MULTINOMIAL: {
		description: "Retorna a razão do fatorial de uma soma de valores para o produto de fatoriais.",
		abstract: "Retorna a razão do fatorial de uma soma de valores para o produto de fatoriais.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/multinomial-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Número1 é necessário, números subsequentes são opcionais. De 1 a 255 cujo multinominal você deseja obter."
			},
			number2: {
				name: "number2",
				detail: "Número1 é necessário, números subsequentes são opcionais. De 1 a 255 cujo multinominal você deseja obter."
			}
		}
	},
	MUNIT: {
		description: "A função MUNIT devolve a matriz de unidades para a dimensão especificada.",
		abstract: "A função MUNIT devolve a matriz de unidades para a dimensão especificada.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/munit-function"
		}],
		functionParameter: { dimension: {
			name: "dimension",
			detail: "Um inteiro que especifica a dimensão da matriz identidade a retornar. Retorna uma matriz e a dimensão deve ser maior que zero."
		} }
	},
	ODD: {
		description: "Retorna o número arredondado para cima até o inteiro ímpar mais próximo.",
		abstract: "Retorna o número arredondado para cima até o inteiro ímpar mais próximo.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/odd-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Necessário. O valor a ser arredondado."
		} }
	},
	PI: {
		description: "Retorna o número 3,14159265358979, a constante matemática pi, com precisão de até 15 dígitos.",
		abstract: "Retorna o número 3,14159265358979, a constante matemática pi, com precisão de até 15 dígitos.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/pi-function"
		}],
		functionParameter: {}
	},
	POWER: {
		description: "Fornece o resultado de um número elevado a uma potência.",
		abstract: "Fornece o resultado de um número elevado a uma potência.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/power-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. O número base. Pode ser qualquer número real."
			},
			power: {
				name: "power",
				detail: "Necessário. O expoente para o qual a base é elevada."
			}
		}
	},
	PRODUCT: {
		description: "A função MULT multiplica todos os números dados como argumentos e retorna o produto. Por exemplo, se as células A1 e A2 contiverem números, você poderá usar a fórmula =PRODUCT(A1, A2) para multiplicar esses dois números juntos. Você também pode executar a mesma operação usando o operador matemático ( * ); por exemplo, =A1 * A2 .",
		abstract: "A função MULT multiplica todos os números dados como argumentos e retorna o produto. Por exemplo, se as células A1 e A2 contiverem números, você poderá usar a fórmula =PRODUCT(A1, A2) para multiplicar esses dois números juntos. Você também pode executar a mesma operação usando o operador matemático ( * ); por exemplo, =A1 * A2 .",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/product-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Necessário. O primeiro número ou intervalo que você deseja multiplicar."
			},
			number2: {
				name: "number2",
				detail: "Opcional. Números ou intervalos adicionais que você deseja multiplicar, até um máximo de 255 argumentos."
			}
		}
	},
	QUOTIENT: {
		description: "Retorna a parte inteira de uma divisão. Use esta função para descartar o resto de uma divisão.",
		abstract: "Retorna a parte inteira de uma divisão. Use esta função para descartar o resto de uma divisão.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/quotient-function"
		}],
		functionParameter: {
			numerator: {
				name: "numerator",
				detail: "Obrigatório. O dividendo."
			},
			denominator: {
				name: "denominator",
				detail: "Obrigatório. O divisor."
			}
		}
	},
	RADIANS: {
		description: "Converte graus em radianos.",
		abstract: "Converte graus em radianos.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/radians-function"
		}],
		functionParameter: { angle: {
			name: "angle",
			detail: "Necessário. Um ângulo em graus que você deseja converter."
		} }
	},
	RAND: {
		description: "ALEATÓRIO retorna um número aleatório real maior que ou igual a 0 e menor que 1 distribuído uniformemente. Um novo número aleatório real é retornado sempre que a planilha é calculada.",
		abstract: "ALEATÓRIO retorna um número aleatório real maior que ou igual a 0 e menor que 1 distribuído uniformemente. Um novo número aleatório real é retornado sempre que a planilha é calculada.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/rand-function"
		}],
		functionParameter: {}
	},
	RANDARRAY: {
		description: "Nos exemplos a seguir, foi criada uma matriz de 5 linhas de altura e 3 colunas de largura. O primeiro retorna um conjunto de valores aleatório entre 0 e 1, que é o comportamento padrão da MATRIZALEATÓRIA. O segundo retorna uma série de valores decimais aleatórios entre 1 e 100. Por fim, o terceiro exemplo retorna uma série de números inteiros aleatórios entre 1 e 100.",
		abstract: "Nos exemplos a seguir, foi criada uma matriz de 5 linhas de altura e 3 colunas de largura. O primeiro retorna um conjunto de valores aleatório entre 0 e 1, que é o comportamento padrão da MATRIZALEATÓRIA. O segundo retorna uma série de valores decimais aleatórios entre 1 e 100. Por fim, o terceiro exemplo retorna uma série de números inteiros aleatórios entre 1 e 100.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/randarray-function"
		}],
		functionParameter: {
			rows: {
				name: "rows",
				detail: "O número de linhas a serem retornadas"
			},
			columns: {
				name: "columns",
				detail: "O número de colunas a serem retornadas"
			},
			min: {
				name: "min",
				detail: "O número mínimo que você deseja que seja retornado"
			},
			max: {
				name: "max",
				detail: "O número máximo que você deseja que seja retornada"
			},
			wholeNumber: {
				name: "whole_number",
				detail: "Retornar um número inteiro ou um valor decimal VERDADEIRO para um número inteiro FALSE para um número decimal"
			}
		}
	},
	RANDBETWEEN: {
		description: "Retorna um número aleatório inteiro entre os números especificados. Um novo número aleatório inteiro será retornado sempre que a planilha for calculada.",
		abstract: "Retorna um número aleatório inteiro entre os números especificados. Um novo número aleatório inteiro será retornado sempre que a planilha for calculada.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/randbetween-function"
		}],
		functionParameter: {
			bottom: {
				name: "bottom",
				detail: "Obrigatório. O menor inteiro que ALEATÓRIOENTRE retornará."
			},
			top: {
				name: "top",
				detail: "Obrigatório. O maior inteiro que ALEATÓRIOENTRE retornará."
			}
		}
	},
	ROMAN: {
		description: "Converte um algarismo arábico em romano, como texto.",
		abstract: "Converte um algarismo arábico em romano, como texto.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/roman-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. O algarismo arábico a ser convertido."
			},
			form: {
				name: "form",
				detail: "Opcional. O algarismo que especifica o tipo de algarismo romano desejado. O estilo do algarismo romano varia de clássico a simplificado, tornando-se mais conciso à medida que o valor da forma aumenta. Consulte o exemplo de ROMANO(499,0) seguinte."
			}
		}
	},
	ROUND: {
		description: "A função ARRED arredonda um número para um número especificado de dígitos. Por exemplo, se a célula A1 contiver 23,7825 e você quiser arredondar esse valor para duas casas decimais, poderá usar a seguinte fórmula:",
		abstract: "A função ARRED arredonda um número para um número especificado de dígitos. Por exemplo, se a célula A1 contiver 23,7825 e você quiser arredondar esse valor para duas casas decimais, poderá usar a seguinte fórmula:",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/round-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. O número que você deseja arredondar."
			},
			numDigits: {
				name: "num_digits",
				detail: "Obrigatório. O número de dígitos para o qual você deseja arredondar o argumento número."
			}
		}
	},
	ROUNDBANK: {
		description: "Arredonda um número pelo método de arredondamento bancário.",
		abstract: "Arredonda um número pelo método de arredondamento bancário.",
		links: [{
			title: "Instruction",
			url: ""
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "O número que você deseja arredondar pelo método de arredondamento bancário."
			},
			numDigits: {
				name: "num_digits",
				detail: "O número de dígitos para o qual você deseja arredondar pelo método de arredondamento bancário."
			}
		}
	},
	ROUNDDOWN: {
		description: "Arredonda um número para baixo até zero.",
		abstract: "Arredonda um número para baixo até zero.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/rounddown-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. Qualquer número real que se deseja arredondar para baixo."
			},
			numDigits: {
				name: "num_digits",
				detail: "Obrigatório. O número de dígitos para o qual se deseja arredondar núm."
			}
		}
	},
	ROUNDUP: {
		description: "Arredonda um número para cima afastando-o de zero.",
		abstract: "Arredonda um número para cima afastando-o de zero.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/roundup-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. Qualquer número real que se deseja arredondar para cima."
			},
			numDigits: {
				name: "num_digits",
				detail: "Obrigatório. O número de dígitos para o qual se deseja arredondar núm."
			}
		}
	},
	SEC: {
		description: "Retorna a secante de um ângulo.",
		abstract: "Retorna a secante de um ângulo.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/sec-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "O ângulo em radianos para o qual você deseja obter a secante."
		} }
	},
	SECH: {
		description: "Retorna a secante hiperbólica de um ângulo.",
		abstract: "Retorna a secante hiperbólica de um ângulo.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/sech-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "O ângulo em radianos para o qual você deseja obter a secante hiperbólica."
		} }
	},
	SERIESSUM: {
		description: "Muitas funções podem ser aproximadas por uma expansão da série polinomial.",
		abstract: "Muitas funções podem ser aproximadas por uma expansão da série polinomial.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/seriessum-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obrigatório. O valor de entrada da série polinomial."
			},
			n: {
				name: "n",
				detail: "Obrigatório. A potência inicial à qual você deseja elevar x."
			},
			m: {
				name: "m",
				detail: "Obrigatório. O passo pelo qual se acrescenta n a cada termo na sequência."
			},
			coefficients: {
				name: "coefficients",
				detail: "Necessário. Um conjunto de coeficientes pelo qual cada potência de x é multiplicada. O número de valores em coeficientes determina o número de termos na série polinomial. Por exemplo, se houver três valores em coeficientes, haverá três termos na série polinomial."
			}
		}
	},
	SEQUENCE: {
		description: "No exemplo a seguir, criamos uma matriz de 4 linhas de altura por 5 colunas de largura usando a fórmula =SEQUÊNCIA(4;5) .",
		abstract: "No exemplo a seguir, criamos uma matriz de 4 linhas de altura por 5 colunas de largura usando a fórmula =SEQUÊNCIA(4;5) .",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/sequence-function"
		}],
		functionParameter: {
			rows: {
				name: "rows",
				detail: "O número de linhas a serem retornadas"
			},
			columns: {
				name: "columns",
				detail: "O número de colunas a serem retornadas"
			},
			start: {
				name: "start",
				detail: "O primeiro número na sequência"
			},
			step: {
				name: "step",
				detail: "O valor a ser aumentado a cada valor subsequente na matriz"
			}
		}
	},
	SIGN: {
		description: "Determina o sinal de um número. Fornece 1 se núm for positivo, zero (0) se núm for 0, e -1 se núm for negativo.",
		abstract: "Determina o sinal de um número. Fornece 1 se núm for positivo, zero (0) se núm for 0, e -1 se núm for negativo.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/sign-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório. Qualquer número real."
		} }
	},
	SIN: {
		description: "Retorna o seno de um ângulo dado.",
		abstract: "Retorna o seno de um ângulo dado.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/sin-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório. O ângulo em radianos para o qual você deseja obter o seno."
		} }
	},
	SINH: {
		description: "Retorna o seno hiperbólico de um número.",
		abstract: "Retorna o seno hiperbólico de um número.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/sinh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório. Qualquer número real."
		} }
	},
	SQRT: {
		description: "Retorna uma raiz quadrada positiva.",
		abstract: "Retorna uma raiz quadrada positiva.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/sqrt-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório. O número do qual você deseja obter a raiz quadrada."
		} }
	},
	SQRTPI: {
		description: "Retorna a raiz quadrada de (núm* pi).",
		abstract: "Retorna a raiz quadrada de (núm* pi).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/sqrtpi-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório. O número pelo qual se multiplica pi."
		} }
	},
	SUBTOTAL: {
		description: "Retorna um subtotal em uma lista ou em um banco de dados. É geralmente mais fácil criar uma lista com subtotais usando o comando Subtotais , grupo Contorno , na guia Dados no aplicativo de desktop do Excel. Assim que a lista de subtotais for criada, você poderá modificá-la editando a função SUBTOTAL.",
		abstract: "Retorna um subtotal em uma lista ou em um banco de dados. É geralmente mais fácil criar uma lista com subtotais usando o comando Subtotais , grupo Contorno , na guia Dados no aplicativo de desktop do Excel. Assim que a lista de subtotais for criada, você poderá modificá-la editando a função SUBTOTAL.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/subtotal-function"
		}],
		functionParameter: {
			functionNum: {
				name: "function_num",
				detail: "Necessário. O número 1-11 ou 101-111 que especifica a função a ser usada para o subtotal. 1-11 inclui linhas ocultas manualmente, enquanto 101-111 as exclui; células filtradas sempre são excluídas."
			},
			ref1: {
				name: "ref1",
				detail: "Necessário. O primeiro intervalo nomeado ou referência cujo subtotal você deseja."
			},
			ref2: {
				name: "ref2",
				detail: "Opcional. Intervalos nomeados ou referências de 2 a 254 cujo subtotal você deseja."
			}
		}
	},
	SUM: {
		description: "A função SUM adiciona valores. É possível adicionar valores individuais, referências de célula ou intervalos, ou uma mistura dos três.",
		abstract: "A função SUM adiciona valores. É possível adicionar valores individuais, referências de célula ou intervalos, ou uma mistura dos três.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/sum-function"
		}],
		functionParameter: {
			number1: {
				name: "Number 1",
				detail: "O primeiro número que você deseja somar. O número pode ser como 4, uma referência de célula como B6 ou um intervalo de células como B2:B8."
			},
			number2: {
				name: "Number 2",
				detail: "Este é o segundo número que você deseja somar. Você pode especificar até 255 números adicionais dessa maneira."
			}
		}
	},
	SUMIF: {
		description: "Você usa a função SUMIF para resumir os valores em um intervalo que atenda aos critérios especificados. Por exemplo, suponha que em uma coluna que contém números, você deseja somar apenas os valores maiores que 5. Você pode usar a seguinte fórmula: =SUMIF(B2:B25\">5\")",
		abstract: "Você usa a função SUMIF para resumir os valores em um intervalo que atenda aos critérios especificados. Por exemplo, suponha que em uma coluna que contém números, você deseja somar apenas os valores maiores que 5. Você pode usar a seguinte fórmula: =SUMIF(B2:B25\">5\")",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/sumif-function"
		}],
		functionParameter: {
			range: {
				name: "range",
				detail: "Necessário. O intervalo de células que se deseja calcular por critérios. As células em cada intervalo devem ser números ou nomes, matrizes ou referências que contêm números. Espaços em branco e valores de texto são ignorados. O intervalo selecionado deve conter datas no formato padrão do Excel (exemplos abaixo)."
			},
			criteria: {
				name: "criteria",
				detail: "Necessário. Os critérios na forma de um número, expressão, referência de célula, texto ou função que define quais células serão adicionadas. Caracteres curinga podem ser incluídos – um ponto de interrogação (?) para corresponder a qualquer caractere, um asterisco (*) para corresponder a qualquer sequência de caracteres. Se você quiser encontrar um ponto de interrogação ou um asterisco real, digite um bloco ( ~ ) anterior ao caractere. Por exemplo, os critérios podem ser expressos como 32, \">32\", B5, \"3?\", \"apple*\", \"*~?\", ou TODAY(). Importante Qualquer critério de texto ou qualquer critério que inclua símbolos lógicos ou matemáticos deve estar entre aspas duplas ( \" ). Se os critérios forem numéricos, as aspas duplas não serão necessárias."
			},
			sumRange: {
				name: "sum_range",
				detail: "Opcional. As células reais a serem adicionadas, se você quiser adicionar células diferentes daquelas especificadas no argumento de intervalo . Se o argumento sum_range for omitido, o Excel adicionará as células especificadas no argumento de intervalo (as mesmas células às quais os critérios são aplicados). Sum_range deve ter o mesmo tamanho e forma que o intervalo . Se não for, o desempenho poderá sofrer, e a fórmula somará um intervalo de células que começa com a primeira célula em sum_range , mas tem as mesmas dimensões que o intervalo . Por exemplo: intervalo intervalo_soma Células resumidas reais A1:A5 B1:B5 B1:B5 A1:A5 B1:K5 B1:B5"
			}
		}
	},
	SUMIFS: {
		description: "A função SOMASES, uma das funções de matemática e trigonometria , adiciona todos os seus argumentos que atendem a vários critérios. Por exemplo, você usaria SOMASES para somar o número de varejistas no país/região que (1) residem em um único CEP e (2) cujos lucros excedem um valor específico em dólar.",
		abstract: "A função SOMASES, uma das funções de matemática e trigonometria , adiciona todos os seus argumentos que atendem a vários critérios. Por exemplo, você usaria SOMASES para somar o número de varejistas no país/região que (1) residem em um único CEP e (2) cujos lucros excedem um valor específico em dólar.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/sumifs-function"
		}],
		functionParameter: {
			sumRange: {
				name: "sum_range",
				detail: "O intervalo de células para somar."
			},
			criteriaRange1: {
				name: "criteria_range1",
				detail: "O intervalo testado usando os Critérios1 . Criteria_range1 e Critérios1 configuram um par de pesquisa no qual um intervalo é pesquisado em busca de critérios específicos. Quando os itens do intervalo são encontrados, seus valores correspondentes em Sum_range são adicionados."
			},
			criteria1: {
				name: "criteria1",
				detail: "Os critérios que definem quais células em Criteria_range1 serão adicionadas. Por exemplo, os critérios podem ser inseridos como 32 , \">32\" , B4 , \"maçãs\" ou \"32\"."
			},
			criteriaRange2: {
				name: "criteriaRange2",
				detail: "Intervalos adicionais e seus critérios associados. Você pode inserir até 127 pares de intervalo/critérios."
			},
			criteria2: {
				name: "criteria2",
				detail: "Intervalos adicionais e seus critérios associados. Você pode inserir até 127 pares de intervalo/critérios."
			}
		}
	},
	SUMPRODUCT: {
		description: "SUMPRODUCT corresponde a todas as instâncias do Item Y/Tamanho M e as soma, portanto, para este exemplo, 21 mais 41 são iguais a 62.",
		abstract: "SUMPRODUCT corresponde a todas as instâncias do Item Y/Tamanho M e as soma, portanto, para este exemplo, 21 mais 41 são iguais a 62.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/sumproduct-function"
		}],
		functionParameter: {
			array1: {
				name: "array",
				detail: "O primeiro argumento matricial cujos componentes você deseja multiplicar e depois somar."
			},
			array2: {
				name: "array",
				detail: "Argumentos matriciais de 2 a 255 cujos componentes você deseja multiplicar e depois somar."
			}
		}
	},
	SUMSQ: {
		description: "Retorna a soma dos quadrados dos argumentos.",
		abstract: "Retorna a soma dos quadrados dos argumentos.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/sumsq-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Núm1 é obrigatório. Os números subsequentes são opcionais. Podem existir até 255 argumentos para os quais pretende obter a soma dos quadrados."
			},
			number2: {
				name: "number2",
				detail: "Núm1 é obrigatório. Os números subsequentes são opcionais. Podem existir até 255 argumentos para os quais pretende obter a soma dos quadrados."
			}
		}
	},
	SUMX2MY2: {
		description: "Esta função do Excel devolve a soma da diferença dos quadrados dos valores correspondentes em duas matrizes.",
		abstract: "Esta função do Excel devolve a soma da diferença dos quadrados dos valores correspondentes em duas matrizes.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/sumx2my2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "array_x",
				detail: "Obrigatório. A primeira matriz ou intervalo de valores."
			},
			arrayY: {
				name: "array_y",
				detail: "Obrigatório. A segunda matriz ou intervalo de valores."
			}
		}
	},
	SUMX2PY2: {
		description: "Retorna a soma da soma dos quadrados dos valores correspondentes em duas matrizes. A soma da soma dos quadrados é um termo comum em muitos cálculos estatísticos.",
		abstract: "Retorna a soma da soma dos quadrados dos valores correspondentes em duas matrizes. A soma da soma dos quadrados é um termo comum em muitos cálculos estatísticos.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/sumx2py2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "array_x",
				detail: "Necessário. A primeira matriz ou intervalo de valores."
			},
			arrayY: {
				name: "array_y",
				detail: "Necessário. A segunda matriz ou intervalo de valores."
			}
		}
	},
	SUMXMY2: {
		description: "A função SUMXMY2 devolve a soma de quadrados de diferenças dos valores correspondentes em duas matrizes.",
		abstract: "A função SUMXMY2 devolve a soma de quadrados de diferenças dos valores correspondentes em duas matrizes.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/sumxmy2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "array_x",
				detail: "A primeira matriz ou intervalo de valores. Obrigatório."
			},
			arrayY: {
				name: "array_y",
				detail: "A segunda matriz ou intervalo de valores. Obrigatório."
			}
		}
	},
	TAN: {
		description: "Retorna a tangente de um determinado ângulo.",
		abstract: "Retorna a tangente de um determinado ângulo.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/tan-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório. O ângulo em radianos para o qual você deseja obter a tangente."
		} }
	},
	TANH: {
		description: "Retorna a tangente hiperbólica de um número.",
		abstract: "Retorna a tangente hiperbólica de um número.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/tanh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório. Qualquer número real."
		} }
	},
	TRUNC: {
		description: "As funções TRUNC truncam um número para um número inteiro ao remover a parte fracionária do número.",
		abstract: "As funções TRUNC truncam um número para um número inteiro ao remover a parte fracionária do número.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/trunc-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. O número que se deseja truncar."
			},
			numDigits: {
				name: "num_digits",
				detail: "Opcional. Um número que especifica a precisão da operação. O valor padrão para núm_dígitos é 0 (zero)."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/statistical/pt-BR.ts
const locale$4 = {
	AVEDEV: {
		description: "Retorna a média aritmética dos desvios médios dos pontos de dados a partir de sua média. DESV.MÉDIO é uma medida da variabilidade em um conjunto de dados.",
		abstract: "Retorna a média aritmética dos desvios médios dos pontos de dados a partir de sua média. DESV.MÉDIO é uma medida da variabilidade em um conjunto de dados.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/avedev-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Número1 é necessário, números subsequentes são opcionais. Argumentos de 1 a 255 para os quais você deseja obter a média aritmética dos desvios absolutos. Você também pode usar uma matriz única ou uma referência a matriz, em vez dos argumentos separados por ponto-e-vírgula."
			},
			number2: {
				name: "number2",
				detail: "Número1 é necessário, números subsequentes são opcionais. Argumentos de 1 a 255 para os quais você deseja obter a média aritmética dos desvios absolutos. Você também pode usar uma matriz única ou uma referência a matriz, em vez dos argumentos separados por ponto-e-vírgula."
			}
		}
	},
	AVERAGE: {
		description: "Retorna a média aritmética dos argumentos. Por exemplo, se o intervalo A1:A20 contiver números, a fórmula =AVERAGE(A1:A20) retornará a média desses números.",
		abstract: "Retorna a média aritmética dos argumentos. Por exemplo, se o intervalo A1:A20 contiver números, a fórmula =AVERAGE(A1:A20) retornará a média desses números.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/average-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Necessário. O primeiro número, referência de célula ou intervalo para o qual você deseja a média."
			},
			number2: {
				name: "number2",
				detail: "Opcional. Números adicionais, referências de célula ou intervalos para os quais você deseja a média, até no máximo 255."
			}
		}
	},
	AVERAGE_WEIGHTED: {
		description: "A função AVERAGE.WEIGHTED calcula a média ponderada de um conjunto de valores usando os valores e seus pesos correspondentes.",
		abstract: "A função AVERAGE.WEIGHTED calcula a média ponderada de um conjunto de valores usando os valores e seus pesos correspondentes.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9084098?hl=pt-BR"
		}],
		functionParameter: {
			values: {
				name: "valores",
				detail: "Os valores cuja média será calculada. Pode ser um intervalo de células ou os próprios valores."
			},
			weights: {
				name: "pesos",
				detail: "A lista correspondente de pesos a aplicar. Os pesos podem ser zero, mas não negativos, e pelo menos um deve ser positivo. O intervalo de pesos deve ter o mesmo número de linhas e colunas que o intervalo de valores."
			},
			additionalValues: {
				name: "valores_adicionais",
				detail: "Valores adicionais opcionais cuja média será calculada."
			},
			additionalWeights: {
				name: "pesos_adicionais",
				detail: "Pesos adicionais opcionais. Cada valor_adicional deve ser seguido por exatamente um peso_adicional."
			}
		}
	},
	AVERAGEA: {
		description: "Calcula a média (aritmética) dos valores na lista de argumentos.",
		abstract: "Calcula a média (aritmética) dos valores na lista de argumentos.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/averagea-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Valor1 é obrigatório, os valores subsequentes são opcionais. De 1 a 255 células, intervalos de células ou valores cuja média você deseja obter."
			},
			value2: {
				name: "value2",
				detail: "Valor1 é obrigatório, os valores subsequentes são opcionais. De 1 a 255 células, intervalos de células ou valores cuja média você deseja obter."
			}
		}
	},
	AVERAGEIF: {
		description: "Retorna a média (média aritmética) de todas as células em um intervalo que satisfazem um determinado critério.",
		abstract: "Retorna a média (média aritmética) de todas as células em um intervalo que satisfazem um determinado critério.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/averageif-function"
		}],
		functionParameter: {
			range: {
				name: "range",
				detail: "Necessário. Uma ou mais células a serem usadas para o cálculo da média, incluindo números ou nomes, matrizes ou referências que contêm números."
			},
			criteria: {
				name: "criteria",
				detail: "Necessário. Os critérios na forma de um número, uma expressão, uma referência de célula ou um texto que define quais células serão usadas para o cálculo da média. Por exemplo, os critérios podem ser expressos como 32, \"32\", \">32\", \"maçãs\" ou B4."
			},
			averageRange: {
				name: "average_range",
				detail: "Opcional. O conjunto real de células que será usado para calcular a média. Se omitido, será usado o intervalo."
			}
		}
	},
	AVERAGEIFS: {
		description: "Retorna a média (média aritmética) de todas as células que satisfazem vários critérios.",
		abstract: "Retorna a média (média aritmética) de todas as células que satisfazem vários critérios.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/averageifs-function"
		}],
		functionParameter: {
			averageRange: {
				name: "average_range",
				detail: "Necessário. Uma ou mais células a serem usadas para o cálculo da média, incluindo números ou nomes, matrizes ou referências que contêm números."
			},
			criteriaRange1: {
				name: "criteria_range1",
				detail: "Intervalo_critérios1 é obrigatório, intervalos_critérios subsequentes são opcionais. De 1 a 127 intervalos para avaliar os critérios associados."
			},
			criteria1: {
				name: "criteria1",
				detail: "Critérios1 é necessário, critérios subsequentes são opcionais. Os critérios de 1 a 127 na forma de um número, uma expressão, uma referência de célula ou um texto que define quais células serão usadas para calcular a média. Por exemplo, os critérios podem ser expressos como 32, \"32\", \">32\", \"maçãs\" ou B4."
			},
			criteriaRange2: {
				name: "criteria_range2",
				detail: "Intervalo_critérios1 é obrigatório, intervalos_critérios subsequentes são opcionais. De 1 a 127 intervalos para avaliar os critérios associados."
			},
			criteria2: {
				name: "criteria2",
				detail: "Critérios1 é necessário, critérios subsequentes são opcionais. Os critérios de 1 a 127 na forma de um número, uma expressão, uma referência de célula ou um texto que define quais células serão usadas para calcular a média. Por exemplo, os critérios podem ser expressos como 32, \"32\", \">32\", \"maçãs\" ou B4."
			}
		}
	},
	BETA_DIST: {
		description: "A distribuição beta geralmente é usada para estudar a variação na porcentagem de determinado valor em amostras, como a fração do dia que as pessoas passam assistindo televisão.",
		abstract: "A distribuição beta geralmente é usada para estudar a variação na porcentagem de determinado valor em amostras, como a fração do dia que as pessoas passam assistindo televisão.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/beta-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obrigatório. O valor entre A e B no qual se avalia a função."
			},
			alpha: {
				name: "alpha",
				detail: "Necessário. Um parâmetro da distribuição."
			},
			beta: {
				name: "beta",
				detail: "Necessário. Um parâmetro da distribuição."
			},
			cumulative: {
				name: "cumulative",
				detail: "Necessário. Um valor lógico que determina a forma da função. Se cumulativo for VERDADEIRO, DIST.BETA retornará a função de distribuição cumulativa; se for FALSO, retornará a função de densidade de probabilidade."
			},
			A: {
				name: "A",
				detail: "Opcional. Um limite inferior para o intervalo de x."
			},
			B: {
				name: "B",
				detail: "Opcional. Um limite superior para o intervalo de x."
			}
		}
	},
	BETA_INV: {
		description: "Se probabilidade = DIST.BETA(x,...VERDADEIRO), INV.BETA(probabilidade,...) = x. A distribuição beta pode ser usada no planejamento do projeto para criar modelos de tempos de conclusão provável de acordo com determinado tempo de conclusão e variabilidade esperados.",
		abstract: "Se probabilidade = DIST.BETA(x,...VERDADEIRO), INV.BETA(probabilidade,...) = x. A distribuição beta pode ser usada no planejamento do projeto para criar modelos de tempos de conclusão provável de acordo com determinado tempo de conclusão e variabilidade esperados.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/beta-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Necessário. Uma probabilidade associada à distribuição beta."
			},
			alpha: {
				name: "alpha",
				detail: "Necessário. Um parâmetro da distribuição."
			},
			beta: {
				name: "beta",
				detail: "Necessário. Um parâmetro da distribuição."
			},
			A: {
				name: "A",
				detail: "Opcional. Um limite inferior para o intervalo de x."
			},
			B: {
				name: "B",
				detail: "Opcional. Um limite superior para o intervalo de x."
			}
		}
	},
	BINOM_DIST: {
		description: "Retorna a probabilidade de distribuição binomial do termo individual. Use DISTR.BINOM em problemas com um número fixo de testes ou tentativas, quando os resultados de determinada tentativa forem apenas sucesso ou fracasso, quando as tentativas forem independentes e quando a probabilidade de sucesso for constante durante toda a experiência. Por exemplo, DISTR.BINOM pode calcular a probabilidade de que dois dos próximos três bebês sejam meninos.",
		abstract: "Retorna a probabilidade de distribuição binomial do termo individual. Use DISTR.BINOM em problemas com um número fixo de testes ou tentativas, quando os resultados de determinada tentativa forem apenas sucesso ou fracasso, quando as tentativas forem independentes e quando a probabilidade de sucesso for constante durante toda a experiência. Por exemplo, DISTR.BINOM pode calcular a probabilidade de que dois dos próximos três bebês sejam meninos.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/binom-dist-function"
		}],
		functionParameter: {
			numberS: {
				name: "number_s",
				detail: "Necessário. O número de tentativas bem-sucedidas."
			},
			trials: {
				name: "trials",
				detail: "Necessário. O número de tentativas independentes."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Necessário. A probabilidade de sucesso em cada tentativa."
			},
			cumulative: {
				name: "cumulative",
				detail: "Necessário. Um valor lógico que determina a forma da função. Se cumulativo for VERDADEIRO, DISTR.BINOM retornará a função de distribuição cumulativa, que é a probabilidade de que exista no máximo núm_s sucessos; se for FALSO, retornará a função massa de probabilidade, que é a probabilidade de que exista núm_s sucessos."
			}
		}
	},
	BINOM_DIST_RANGE: {
		description: "Retorna a probabilidade de um resultado de tentativa usando uma distribuição binomial.",
		abstract: "Retorna a probabilidade de um resultado de tentativa usando uma distribuição binomial.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/binom-dist-range-function"
		}],
		functionParameter: {
			trials: {
				name: "trials",
				detail: "Obrigatório. O número de tentativas independentes. Deve ser maior que ou igual a 0."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Obrigatório. A probabilidade de sucesso em cada tentativa. Deve ser maior que ou igual a 0 e menor que ou igual a 1."
			},
			numberS: {
				name: "number_s",
				detail: "Obrigatório. O número de tentativas bem-sucedidas. Deve ser maior que ou igual a 0 e menor que ou igual a Tentativas."
			},
			numberS2: {
				name: "number_s2",
				detail: "Opcional. Se fornecido, retorna a probabilidade de que o número de tentativas bem-sucedidas ficará entre Número_s e número _s2. Deve ser maior que ou igual a Número_s e menor que ou igual a Tentativas."
			}
		}
	},
	BINOM_INV: {
		description: "Retorna o menor valor para o qual a distribuição binomial cumulativa é maior ou igual ao valor padrão.",
		abstract: "Retorna o menor valor para o qual a distribuição binomial cumulativa é maior ou igual ao valor padrão.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/binom-inv-function"
		}],
		functionParameter: {
			trials: {
				name: "trials",
				detail: "Necessário. O número de tentativas de Bernoulli."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Necessário. A probabilidade de sucesso em cada tentativa."
			},
			alpha: {
				name: "alpha",
				detail: "Necessário. O valor padrão."
			}
		}
	},
	CHISQ_DIST: {
		description: "Retorna a probabilidade unilateral à esquerda da distribuição qui-quadrado.",
		abstract: "Retorna a probabilidade unilateral à esquerda da distribuição qui-quadrado.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/chisq-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "O valor no qual você deseja avaliar a distribuição."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "O número de graus de liberdade."
			},
			cumulative: {
				name: "cumulative",
				detail: "Um valor lógico que determina a forma da função. Se for VERDADEIRO, retorna a função de distribuição cumulativa; se for FALSO, retorna a função de densidade de probabilidade."
			}
		}
	},
	CHISQ_DIST_RT: {
		description: "A distribuição χ2 está associada ao teste χ2. Use o teste χ2 para comparar os valores observados e os esperados. Por exemplo, uma experiência genética pode gerar a hipótese de que a próxima geração de plantas exibirá determinado conjunto de cores. Comparando os resultados observados com os esperados, você poderá decidir se a hipótese original é válida.",
		abstract: "A distribuição χ2 está associada ao teste χ2. Use o teste χ2 para comparar os valores observados e os esperados. Por exemplo, uma experiência genética pode gerar a hipótese de que a próxima geração de plantas exibirá determinado conjunto de cores. Comparando os resultados observados com os esperados, você poderá decidir se a hipótese original é válida.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/chisq-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obrigatório. O valor no qual a distribuição será avaliada."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Necessário. O número de graus de liberdade."
			}
		}
	},
	CHISQ_INV: {
		description: "A distribuição qui-quadrada geralmente é usada para estudar a variação na porcentagem de determinado valor em amostras, como a fração do dia que as pessoas passam assistindo televisão.",
		abstract: "A distribuição qui-quadrada geralmente é usada para estudar a variação na porcentagem de determinado valor em amostras, como a fração do dia que as pessoas passam assistindo televisão.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/chisq-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obrigatório. Uma probabilidade associada à distribuição qui-quadrada."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Obrigatório. O número de graus de liberdade."
			}
		}
	},
	CHISQ_INV_RT: {
		description: "Se a probabilidade = DIST.QUIQUA.CD(x,...), então INV.QUIQUA.CD(probabilidade,...) = x. Use esta função para comparar os resultados observados com os esperados para decidir se a sua hipótese original é válida.",
		abstract: "Se a probabilidade = DIST.QUIQUA.CD(x,...), então INV.QUIQUA.CD(probabilidade,...) = x. Use esta função para comparar os resultados observados com os esperados para decidir se a sua hipótese original é válida.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/chisq-inv-rt-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obrigatório. Uma probabilidade associada à distribuição qui-quadrada."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Obrigatório. O número de graus de liberdade."
			}
		}
	},
	CHISQ_TEST: {
		description: "Retorna o teste para independência. TESTE.QUIQUA retorna o valor da distribuição qui-quadrada (χ2) para a estatística e os graus apropriados de liberdade. Você pode usar os testes χ2 para determinar se os resultados hipotéticos são verificados por uma experiência.",
		abstract: "Retorna o teste para independência. TESTE.QUIQUA retorna o valor da distribuição qui-quadrada (χ2) para a estatística e os graus apropriados de liberdade. Você pode usar os testes χ2 para determinar se os resultados hipotéticos são verificados por uma experiência.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/chisq-test-function"
		}],
		functionParameter: {
			actualRange: {
				name: "actual_range",
				detail: "Necessário. O intervalo de dados que contém observações a serem comparadas com os valores esperados."
			},
			expectedRange: {
				name: "expected_range",
				detail: "Necessário. O intervalo de dados que contém a razão entre o produto dos totais de linhas e dos totais de colunas e o total geral."
			}
		}
	},
	CONFIDENCE_NORM: {
		description: "O intervalo de confiança é um intervalo de valores. A média das suas amostras, x, encontra-se no centro desse intervalo, e o intervalo é x ± INT.CONFIANÇA.NORM. Por exemplo, se x for a média das amostras de tempos de entrega para produtos encomendados pelo correio, x ± INT.CONFIANÇA.NORM será o intervalo de médias da população. Para toda média de população, μ0, nesse intervalo, a probabilidade de se obter uma média de amostras mais distante de μ0 que x é maior que alfa; para qualquer média da população, μ0, não nesse intervalo, a probabilidade de se obter uma média de amostras mais distante de μ0 que x é menor que alfa. Em outras palavras, suponha que utilizemos x, desv_padrão e tamanho para construir um teste bicaudal em nível alfa de significância da hipótese de que a média da população seja μ0. Depois, não rejeitaremos essa hipótese se μ0 estiver no intervalo de confiança e rejeitaremos essa hipótese se μ0 não estiver no intervalo de confiança. O intervalo de confiança não nos permite inferir se há probabilidade 1 – alfa de que nosso próximo pacote levará um tempo de entrega que esteja no intervalo de confiança.",
		abstract: "O intervalo de confiança é um intervalo de valores. A média das suas amostras, x, encontra-se no centro desse intervalo, e o intervalo é x ± INT.CONFIANÇA.NORM. Por exemplo, se x for a média das amostras de tempos de entrega para produtos encomendados pelo correio, x ± INT.CONFIANÇA.NORM será o intervalo de médias da população. Para toda média de população, μ0, nesse intervalo, a probabilidade de se obter uma média de amostras mais distante de μ0 que x é maior que alfa; para qualquer média da população, μ0, não nesse intervalo, a probabilidade de se obter uma média de amostras mais distante de μ0 que x é menor que alfa. Em outras palavras, suponha que utilizemos x, desv_padrão e tamanho para construir um teste bicaudal em nível alfa de significância da hipótese de que a média da população seja μ0. Depois, não rejeitaremos essa hipótese se μ0 estiver no intervalo de confiança e rejeitaremos essa hipótese se μ0 não estiver no intervalo de confiança. O intervalo de confiança não nos permite inferir se há probabilidade 1 – alfa de que nosso próximo pacote levará um tempo de entrega que esteja no intervalo de confiança.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/confidence-norm-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "Obrigatório. O nível de significância usado para calcular o nível de confiança. O nível de confiança é igual a 100*(1 - alfa)% ou, em outras palavras, um alfa de 0,05 indica um nível de confiança de 95%."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Obrigatório. O desvio-padrão da população para o intervalo de dados e é assumido como conhecido."
			},
			size: {
				name: "size",
				detail: "Obrigatório. O tamanho da amostra."
			}
		}
	},
	CONFIDENCE_T: {
		description: "Retorna o intervalo de confiança para uma média da população, usando uma distribuição t de Student.",
		abstract: "Retorna o intervalo de confiança para uma média da população, usando uma distribuição t de Student.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/confidence-t-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "Necessário. O nível de significância usado para calcular o nível de confiança. O nível de confiança é igual a 100*(1 - alfa)% ou, em outras palavras, um alfa de 0,05 indica um nível de confiança de 95%."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Necessário. O desvio padrão de população para o intervalo de dados e é considerado conhecido."
			},
			size: {
				name: "size",
				detail: "Necessário. O tamanho da amostra."
			}
		}
	},
	CORREL: {
		description: "A função CORREL devolve o coeficiente de correlação de dois intervalos de células. Use o coeficiente de correlação para determinar a relação entre duas propriedades. Por exemplo, você pode examinar a relação entre a temperatura média de um local e o uso de aparelhos de ar condicionado.",
		abstract: "A função CORREL devolve o coeficiente de correlação de dois intervalos de células. Use o coeficiente de correlação para determinar a relação entre duas propriedades. Por exemplo, você pode examinar a relação entre a temperatura média de um local e o uso de aparelhos de ar condicionado.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/correl-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Obrigatório. Um intervalo de valores de células."
			},
			array2: {
				name: "array2",
				detail: "Obrigatório. Um segundo intervalo de valores de células."
			}
		}
	},
	COUNT: {
		description: "A função CONT.NÚM conta o número de células que contêm números e conta os números na lista de argumentos. Use a função CONT.NÚM para obter o número de entradas em um campo de número que esteja em um intervalo ou uma matriz de números. Por exemplo, você pode inserir a seguinte fórmula para contar os números no intervalo A1:A20: =CONT.NÚM(A1:A20) . Nesse exemplo, se cinco células no intervalo contiverem números, o resultado será 5 .",
		abstract: "A função CONT.NÚM conta o número de células que contêm números e conta os números na lista de argumentos. Use a função CONT.NÚM para obter o número de entradas em um campo de número que esteja em um intervalo ou uma matriz de números. Por exemplo, você pode inserir a seguinte fórmula para contar os números no intervalo A1:A20: =CONT.NÚM(A1:A20) . Nesse exemplo, se cinco células no intervalo contiverem números, o resultado será 5 .",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/count-function"
		}],
		functionParameter: {
			value1: {
				name: "value 1",
				detail: "Obrigatório. O primeiro item, referência de célula ou intervalo em que você deseja contar números."
			},
			value2: {
				name: "value 2",
				detail: "Opcional. Até 255 itens, referências de célula ou intervalos adicionais em que você deseja contar números."
			}
		}
	},
	COUNTA: {
		description: "A função CONTAR.VAL conta o número de células que não estão vazias num intervalo.",
		abstract: "A função CONTAR.VAL conta o número de células que não estão vazias num intervalo.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/counta-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Valor1 é obrigatório, os valores subsequentes são opcionais. De 1 a 255 células, intervalos de células ou valores cuja média você deseja obter."
			},
			value2: {
				name: "value2",
				detail: "Valor1 é obrigatório, os valores subsequentes são opcionais. De 1 a 255 células, intervalos de células ou valores cuja média você deseja obter."
			}
		}
	},
	COUNTBLANK: {
		description: "Utilize a função CONTAR.VAZIO , uma das funções Estatísticas , para contar o número de células vazias num intervalo de células.",
		abstract: "Utilize a função CONTAR.VAZIO , uma das funções Estatísticas , para contar o número de células vazias num intervalo de células.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/countblank-function"
		}],
		functionParameter: { range: {
			name: "range",
			detail: "Obrigatório. O intervalo no qual as células em branco serão contadas."
		} }
	},
	COUNTIF: {
		description: "Use CONT.SE, uma das funções estatísticas , para contar o número de células que atendem a um critério; por exemplo, para contar o número de vezes que uma cidade específica aparece em uma lista de clientes.",
		abstract: "Use CONT.SE, uma das funções estatísticas , para contar o número de células que atendem a um critério; por exemplo, para contar o número de vezes que uma cidade específica aparece em uma lista de clientes.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/use-the-countif-function-in-microsoft-excel"
		}],
		functionParameter: {
			range: {
				name: "range",
				detail: "O grupo de células que você deseja contar. Intervalo pode conter números, matrizes, um intervalo nomeado ou referências que contenham números. Valores em branco e de texto são ignorados. Saiba como selecionar intervalos em uma planilha ."
			},
			criteria: {
				name: "criteria",
				detail: "Um número, expressão, referência de célula ou cadeia de texto que determina quais células serão contadas. Por exemplo, você pode usar um número como 32, uma comparação como \">32\", uma célula como B4 ou uma palavra como \"maçãs\". CONT.SE usa apenas um único critério. Use CONT.SES se você quiser usar vários critérios."
			}
		}
	},
	COUNTIFS: {
		description: "A função COUNTIFS aplica critérios a células em vários intervalos e conta o número de vezes que todos os critérios são atendidos.",
		abstract: "A função COUNTIFS aplica critérios a células em vários intervalos e conta o número de vezes que todos os critérios são atendidos.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/countifs-function"
		}],
		functionParameter: {
			criteriaRange1: {
				name: "criteria_range1",
				detail: "Necessário. O primeiro intervalo no qual avaliar os critérios associados."
			},
			criteria1: {
				name: "criteria1",
				detail: "Necessário. Os critérios no formato de um número, uma expressão, uma referência de célula ou um texto que define quais células serão contadas. Por exemplo, os critérios podem ser expressos como 32, \">32\", B4, \"maçãs\" ou \"32\"."
			},
			criteriaRange2: {
				name: "criteria_range2",
				detail: "Opcional. Intervalos adicionais e seus critérios associados. Até 127 intervalo/critérios pares são permitidos."
			},
			criteria2: {
				name: "criteria2",
				detail: "Opcional. Intervalos adicionais e seus critérios associados. Até 127 intervalo/critérios pares são permitidos."
			}
		}
	},
	COVARIANCE_P: {
		description: "Retorna a covariação da população, a média dos produtos dos desvios para cada par de pontos de dados em dois conjuntos de dados. Use a covariação para determinar a relação entre dois conjuntos de dados. Por exemplo, você pode verificar se uma receita maior é acompanhada por maiores níveis de instrução.",
		abstract: "Retorna a covariação da população, a média dos produtos dos desvios para cada par de pontos de dados em dois conjuntos de dados. Use a covariação para determinar a relação entre dois conjuntos de dados. Por exemplo, você pode verificar se uma receita maior é acompanhada por maiores níveis de instrução.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/covariance-p-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Obrigatório. O primeiro intervalo de células de inteiros."
			},
			array2: {
				name: "array2",
				detail: "Obrigatório. O segundo intervalo de células de inteiros."
			}
		}
	},
	COVARIANCE_S: {
		description: "Retorna a covariação de amostra, a média dos produtos dos desvios para cada par de pontos de dados em dois conjuntos de dados.",
		abstract: "Retorna a covariação de amostra, a média dos produtos dos desvios para cada par de pontos de dados em dois conjuntos de dados.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/covariance-s-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Obrigatório. O primeiro intervalo de células de inteiros."
			},
			array2: {
				name: "array2",
				detail: "Obrigatório. O segundo intervalo de células de inteiros."
			}
		}
	},
	DEVSQ: {
		description: "Retorna a soma dos quadrados dos desvios de pontos de dados da média da amostra.",
		abstract: "Retorna a soma dos quadrados dos desvios de pontos de dados da média da amostra.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/devsq-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Número1 é necessário, números subsequentes são opcionais. De 1 a 255 argumentos para os quais se deseja calcular a soma dos desvios quadrados. Você pode também usar uma única matriz ou referência a uma matriz em vez dos argumentos separados por ponto-e-vírgulas."
			},
			number2: {
				name: "number2",
				detail: "Número1 é necessário, números subsequentes são opcionais. De 1 a 255 argumentos para os quais se deseja calcular a soma dos desvios quadrados. Você pode também usar uma única matriz ou referência a uma matriz em vez dos argumentos separados por ponto-e-vírgulas."
			}
		}
	},
	EXPON_DIST: {
		description: "Retorna a distribuição exponencial. Use DISTR.EXPON para criar um modelo do tempo entre os eventos, como quanto tempo determinado caixa eletrônico leva para liberar o dinheiro. Por exemplo, você pode usar DISTR.EXPON para determinar a probabilidade de que o processo leve no máximo um minuto.",
		abstract: "Retorna a distribuição exponencial. Use DISTR.EXPON para criar um modelo do tempo entre os eventos, como quanto tempo determinado caixa eletrônico leva para liberar o dinheiro. Por exemplo, você pode usar DISTR.EXPON para determinar a probabilidade de que o processo leve no máximo um minuto.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/expon-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obrigatório. O valor da função."
			},
			lambda: {
				name: "lambda",
				detail: "Necessário. O valor do parâmetro."
			},
			cumulative: {
				name: "cumulative",
				detail: "Necessário. Um valor lógico que indica a forma da função exponencial a ser fornecida. Se cumulativo for VERDADEIRO, DISTR.EXPON retornará a função de distribuição cumulativa; se for FALSO, retornará a função de densidade de probabilidade."
			}
		}
	},
	F_DIST: {
		description: "Retorna a distribuição de probabilidade F. Você pode usar esta função para determinar se dois conjuntos de dados têm graus de diversidade diferentes. Por exemplo, você pode examinar as pontuações de teste de homens e mulheres que entram no ensino médio e determinar se a variabilidade nas fêmeas é diferente da encontrada nos homens.",
		abstract: "Retorna a distribuição de probabilidade F. Você pode usar esta função para determinar se dois conjuntos de dados têm graus de diversidade diferentes. Por exemplo, você pode examinar as pontuações de teste de homens e mulheres que entram no ensino médio e determinar se a variabilidade nas fêmeas é diferente da encontrada nos homens.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/f-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obrigatório. O valor no qual se avalia a função."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Necessário. O grau de liberdade do numerador."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Necessário. O grau de liberdade do denominador."
			},
			cumulative: {
				name: "cumulative",
				detail: "Necessário. Um valor lógico que determina a forma da função. Se cumulativo for VERDADEIRO, DIST.F retornará a função de distribuição cumulativa; se for FALSO, retornará a função de densidade de probabilidade."
			}
		}
	},
	F_DIST_RT: {
		description: "Retorna a distribuição de probabilidade F (de cauda direita) (nível de diversidade) para dois conjuntos de dados. Você pode usar esta função para determinar se dois conjuntos de dados têm graus de diversidade diferentes. Por exemplo, é possível examinar os resultados dos testes de homens e mulheres que ingressam no 2º grau e determinar se a variabilidade entre as mulheres é diferente daquela encontrada entre os homens.",
		abstract: "Retorna a distribuição de probabilidade F (de cauda direita) (nível de diversidade) para dois conjuntos de dados. Você pode usar esta função para determinar se dois conjuntos de dados têm graus de diversidade diferentes. Por exemplo, é possível examinar os resultados dos testes de homens e mulheres que ingressam no 2º grau e determinar se a variabilidade entre as mulheres é diferente daquela encontrada entre os homens.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/f-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obrigatório. O valor no qual se avalia a função."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Obrigatório. O grau de liberdade do numerador."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Obrigatório. O grau de liberdade do denominador."
			}
		}
	},
	F_INV: {
		description: "Devolve o inverso da distribuição da probabilidade F. Se p = DIST.F(x,...), INV.F(p,...) = x. A distribuição F pode ser usada em um teste F que compara o grau de variabilidade em dois conjuntos de dados. Por exemplo, você pode analisar as distribuições de renda nos Estados Unidos e Canadá para determinar se os dois países têm um grau de diversidade de renda semelhante.",
		abstract: "Devolve o inverso da distribuição da probabilidade F. Se p = DIST.F(x,...), INV.F(p,...) = x. A distribuição F pode ser usada em um teste F que compara o grau de variabilidade em dois conjuntos de dados. Por exemplo, você pode analisar as distribuições de renda nos Estados Unidos e Canadá para determinar se os dois países têm um grau de diversidade de renda semelhante.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/f-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obrigatório. Uma probabilidade associada à distribuição cumulativa F."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Obrigatório. O grau de liberdade do numerador."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Obrigatório. O grau de liberdade do denominador."
			}
		}
	},
	F_INV_RT: {
		description: "Retorna o inverso da distribuição de probabilidades F (de cauda direita). Se p = DIST.F.CD(x,...), então INV.F.CD(p,...) = x. A distribuição F pode ser usada em um teste F que compara o grau de variabilidade em dois conjuntos de dados. Por exemplo, você pode analisar as distribuições de renda nos Estados Unidos e Canadá para determinar se os dois países têm um grau de diversidade de renda semelhante.",
		abstract: "Retorna o inverso da distribuição de probabilidades F (de cauda direita). Se p = DIST.F.CD(x,...), então INV.F.CD(p,...) = x. A distribuição F pode ser usada em um teste F que compara o grau de variabilidade em dois conjuntos de dados. Por exemplo, você pode analisar as distribuições de renda nos Estados Unidos e Canadá para determinar se os dois países têm um grau de diversidade de renda semelhante.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/f-inv-rt-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obrigatório. Uma probabilidade associada à distribuição cumulativa F."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Obrigatório. O grau de liberdade do numerador."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Obrigatório. O grau de liberdade do denominador."
			}
		}
	},
	F_TEST: {
		description: "Use esta função para determinar se duas amostras possuem variações diferentes. Por exemplo, a partir de resultados de testes fornecidos por escolas públicas e particulares, você pode verificar se essas escolas têm diferentes níveis de diversidade da pontuação de teste.",
		abstract: "Use esta função para determinar se duas amostras possuem variações diferentes. Por exemplo, a partir de resultados de testes fornecidos por escolas públicas e particulares, você pode verificar se essas escolas têm diferentes níveis de diversidade da pontuação de teste.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/f-test-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Obrigatório. A primeira matriz ou intervalo de dados."
			},
			array2: {
				name: "array2",
				detail: "Obrigatório. A segunda matriz ou intervalo de dados."
			}
		}
	},
	FISHER: {
		description: "Retorna a transformação Fisher em x. Essa transformação produz uma função que é normalmente distribuída em vez de distorcida. Use esta função para executar testes de hipóteses no coeficiente de correlação.",
		abstract: "Retorna a transformação Fisher em x. Essa transformação produz uma função que é normalmente distribuída em vez de distorcida. Use esta função para executar testes de hipóteses no coeficiente de correlação.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/fisher-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Obrigatório. Um valor numérico para o qual se deseja a transformação."
		} }
	},
	FISHERINV: {
		description: "Retorna o inverso da transformação Fisher. Use esta transformação ao analisar correlações entre intervalos ou matrizes de dados. Se y = FISHER(x), então FISHERINV(y) = x.",
		abstract: "Retorna o inverso da transformação Fisher. Use esta transformação ao analisar correlações entre intervalos ou matrizes de dados. Se y = FISHER(x), então FISHERINV(y) = x.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/fisherinv-function"
		}],
		functionParameter: { y: {
			name: "y",
			detail: "Obrigatório. O valor para o qual se deseja efetuar o inverso da transformação."
		} }
	},
	FORECAST: {
		description: "Calcule ou preveja um valor futuro com valores existentes. O valor futuro é um valor y para um determinado valor x. Os valores existentes são valores x conhecidos e valores y e o valor futuro é previsto através da regressão linear. Pode utilizar estas funções para prever futuras vendas, requisitos de inventário ou tendências de consumidor.",
		abstract: "Calcule ou preveja um valor futuro com valores existentes. O valor futuro é um valor y para um determinado valor x. Os valores existentes são valores x conhecidos e valores y e o valor futuro é previsto através da regressão linear. Pode utilizar estas funções para prever futuras vendas, requisitos de inventário ou tendências de consumidor.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/forecast-and-forecast-linear-functions"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "sim O ponto de dados cujo valor você deseja prever."
			},
			knownYs: {
				name: "known_y's",
				detail: "sim O intervalo de dados ou matriz dependente."
			},
			knownXs: {
				name: "known_x's",
				detail: "sim O intervalo de dados ou matriz independente."
			}
		}
	},
	FORECAST_ETS: {
		description: "Prevê um valor futuro com base em valores existentes usando uma versão AAA do algoritmo de Suavização Exponencial (ETS).",
		abstract: "Prevê um valor futuro com base em valores existentes usando uma versão AAA do algoritmo de Suavização Exponencial (ETS).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/forecast-ets-function"
		}],
		functionParameter: {
			targetDate: {
				name: "Data de destino",
				detail: "O ponto de dados para o qual você deseja prever um valor."
			},
			values: {
				name: "Valores",
				detail: "Os valores históricos usados na previsão."
			},
			timeline: {
				name: "Linha do tempo",
				detail: "Um intervalo ou matriz independente de datas ou horas numéricas com etapa constante."
			},
			seasonality: {
				name: "Sazonalidade",
				detail: "Opcional. 1 para detecção automática e 0 para nenhuma sazonalidade."
			},
			dataCompletion: {
				name: "Conclusão de dados",
				detail: "Opcional. Use 1 para interpolar pontos ausentes ou 0 para tratá-los como zero."
			},
			aggregation: {
				name: "Agregação",
				detail: "Opcional. Um valor de 1 a 7 especifica a agregação de carimbos de data/hora duplicados."
			}
		}
	},
	FORECAST_ETS_CONFINT: {
		description: "Retorna o intervalo de confiança de um valor futuro previsto usando uma versão AAA do algoritmo de Suavização Exponencial (ETS).",
		abstract: "Retorna o intervalo de confiança de um valor futuro previsto usando uma versão AAA do algoritmo de Suavização Exponencial (ETS).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/forecast-ets-confint-function"
		}],
		functionParameter: {
			targetDate: {
				name: "Data de destino",
				detail: "O ponto de dados para o qual você deseja prever um valor."
			},
			values: {
				name: "Valores",
				detail: "Os valores históricos usados na previsão."
			},
			timeline: {
				name: "Linha do tempo",
				detail: "Um intervalo ou matriz independente de datas ou horas numéricas com etapa constante."
			},
			confidenceLevel: {
				name: "Nível de confiança",
				detail: "Opcional. Um número entre 0 e 1; o padrão é 0,95."
			},
			seasonality: {
				name: "Sazonalidade",
				detail: "Opcional. 1 para detecção automática e 0 para nenhuma sazonalidade."
			},
			dataCompletion: {
				name: "Conclusão de dados",
				detail: "Opcional. Use 1 para interpolar pontos ausentes ou 0 para tratá-los como zero."
			},
			aggregation: {
				name: "Agregação",
				detail: "Opcional. Um valor de 1 a 7 especifica a agregação de carimbos de data/hora duplicados."
			}
		}
	},
	FORECAST_ETS_SEASONALITY: {
		description: "Retorna a duração do padrão sazonal detectado pelo algoritmo de Suavização Exponencial (ETS).",
		abstract: "Retorna a duração do padrão sazonal detectado pelo algoritmo de Suavização Exponencial (ETS).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/forecast-ets-seasonality-function"
		}],
		functionParameter: {
			values: {
				name: "Valores",
				detail: "Os valores históricos usados na previsão."
			},
			timeline: {
				name: "Linha do tempo",
				detail: "Um intervalo ou matriz independente de datas ou horas numéricas com etapa constante."
			},
			dataCompletion: {
				name: "Conclusão de dados",
				detail: "Opcional. Use 1 para interpolar pontos ausentes ou 0 para tratá-los como zero."
			},
			aggregation: {
				name: "Agregação",
				detail: "Opcional. Um valor de 1 a 7 especifica a agregação de carimbos de data/hora duplicados."
			}
		}
	},
	FORECAST_ETS_STAT: {
		description: "Retorna um valor estatístico como resultado da previsão de série temporal usando uma versão AAA do algoritmo de Suavização Exponencial (ETS).",
		abstract: "Retorna um valor estatístico como resultado da previsão de série temporal usando uma versão AAA do algoritmo de Suavização Exponencial (ETS).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/forecast-ets-stat-function"
		}],
		functionParameter: {
			values: {
				name: "Valores",
				detail: "Os valores históricos usados na previsão."
			},
			timeline: {
				name: "Linha do tempo",
				detail: "Um intervalo ou matriz independente de datas ou horas numéricas com etapa constante."
			},
			statisticType: {
				name: "Tipo de estatística",
				detail: "Um valor de 1 a 8 especifica a estatística de previsão retornada."
			},
			seasonality: {
				name: "Sazonalidade",
				detail: "Opcional. 1 para detecção automática e 0 para nenhuma sazonalidade."
			},
			dataCompletion: {
				name: "Conclusão de dados",
				detail: "Opcional. Use 1 para interpolar pontos ausentes ou 0 para tratá-los como zero."
			},
			aggregation: {
				name: "Agregação",
				detail: "Opcional. Um valor de 1 a 7 especifica a agregação de carimbos de data/hora duplicados."
			}
		}
	},
	FORECAST_LINEAR: {
		description: "Calcule ou preveja um valor futuro com valores existentes. O valor futuro é um valor y para um determinado valor x. Os valores existentes são valores x conhecidos e valores y e o valor futuro é previsto através da regressão linear. Pode utilizar estas funções para prever futuras vendas, requisitos de inventário ou tendências de consumidor.",
		abstract: "Calcule ou preveja um valor futuro com valores existentes. O valor futuro é um valor y para um determinado valor x. Os valores existentes são valores x conhecidos e valores y e o valor futuro é previsto através da regressão linear. Pode utilizar estas funções para prever futuras vendas, requisitos de inventário ou tendências de consumidor.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/forecast-and-forecast-linear-functions"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "sim O ponto de dados cujo valor você deseja prever."
			},
			knownYs: {
				name: "known_y's",
				detail: "sim O intervalo de dados ou matriz dependente."
			},
			knownXs: {
				name: "known_x's",
				detail: "sim O intervalo de dados ou matriz independente."
			}
		}
	},
	FREQUENCY: {
		description: "A função FREQUÊNCIA calcula a frequência com que os valores ocorrem em um intervalo de valores e, em seguida, retorna uma matriz vertical de números. Por exemplo, use FREQÜÊNCIA para contar o número de resultados de teste. Pelo fato de FREQÜÊNCIA retornar uma matriz, deve ser inserida como uma fórmula matricial.",
		abstract: "A função FREQUÊNCIA calcula a frequência com que os valores ocorrem em um intervalo de valores e, em seguida, retorna uma matriz vertical de números. Por exemplo, use FREQÜÊNCIA para contar o número de resultados de teste. Pelo fato de FREQÜÊNCIA retornar uma matriz, deve ser inserida como uma fórmula matricial.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/frequency-function"
		}],
		functionParameter: {
			dataArray: {
				name: "data_array",
				detail: "Necessário. Uma matriz ou uma referência a um conjunto de valores cujas frequências você deseja contar. Se matriz_dados não contiver valores, FREQÜÊNCIA retornará uma matriz de zeros."
			},
			binsArray: {
				name: "bins_array",
				detail: "Necessário. Uma matriz ou referência a intervalos nos quais você deseja agrupar os valores contidos em matriz_dados. Se matriz_bin não contiver valores, FREQÜÊNCIA retornará o número de elementos em matriz_dados."
			}
		}
	},
	GAMMA: {
		description: "Retorna o valor da função GAMA.",
		abstract: "Retorna o valor da função GAMA.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/gamma-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório. Retorna um número."
		} }
	},
	GAMMA_DIST: {
		description: "Retorna a distribuição gama. Você pode usar esta função para estudar variáveis que possam apresentar uma distribuição enviesada. A distribuição gama é comumente utilizada em análise de filas.",
		abstract: "Retorna a distribuição gama. Você pode usar esta função para estudar variáveis que possam apresentar uma distribuição enviesada. A distribuição gama é comumente utilizada em análise de filas.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/gamma-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obrigatório. O valor no qual a distribuição será avaliada."
			},
			alpha: {
				name: "alpha",
				detail: "Obrigatório. Um parâmetro da distribuição."
			},
			beta: {
				name: "beta",
				detail: "Obrigatório. Um parâmetro da distribuição. Se beta = 1, DIST.GAMA retornará a distribuição gama padrão."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obrigatório. Um valor lógico que determina a forma da função. Se cumulativo for VERDADEIRO, DIST.GAMA retornará a função de distribuição cumulativa; se for FALSO, retornará a função densidade de probabilidade."
			}
		}
	},
	GAMMA_INV: {
		description: "Retorna o inverso da distribuição cumulativa gama. Se p = DIST.GAMA(x;...), então INV.GAMA(p;...) = x. Você pode usar essa função para estudar uma variável cuja distribuição pode ser enviesada.",
		abstract: "Retorna o inverso da distribuição cumulativa gama. Se p = DIST.GAMA(x;...), então INV.GAMA(p;...) = x. Você pode usar essa função para estudar uma variável cuja distribuição pode ser enviesada.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/gamma-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Necessário. A probabilidade associada à distribuição gama."
			},
			alpha: {
				name: "alpha",
				detail: "Necessário. Um parâmetro da distribuição."
			},
			beta: {
				name: "beta",
				detail: "Necessário. Um parâmetro da distribuição. Se beta = 1, INV.GAMA retornará a distribuição gama padrão."
			}
		}
	},
	GAMMALN: {
		description: "Retorna o logaritmo natural da função gama, Γ(x).",
		abstract: "Retorna o logaritmo natural da função gama, Γ(x).",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/gammaln-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Obrigatório. O valor para o qual você deseja calcular LNGAMA."
		} }
	},
	GAMMALN_PRECISE: {
		description: "Retorna o logaritmo natural da função gama, Γ(x).",
		abstract: "Retorna o logaritmo natural da função gama, Γ(x).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/gammaln-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Obrigatório. O valor para o qual você deseja calcular LNGAMA.PRECISO."
		} }
	},
	GAUSS: {
		description: "Calcula a probabilidade em que um membro de uma população padrão normal irá se situar entre a média e os desvios z padrão da média.",
		abstract: "Calcula a probabilidade em que um membro de uma população padrão normal irá se situar entre a média e os desvios z padrão da média.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/gauss-function"
		}],
		functionParameter: { z: {
			name: "z",
			detail: "Obrigatório. Retorna um número."
		} }
	},
	GEOMEAN: {
		description: "Retorna a média geométrica de uma matriz ou de um intervalo de dados positivos. Por exemplo, você pode usar MÉDIA.GEOMÉTRICA para calcular o crescimento médio considerando-se juros compostos com taxas variáveis.",
		abstract: "Retorna a média geométrica de uma matriz ou de um intervalo de dados positivos. Por exemplo, você pode usar MÉDIA.GEOMÉTRICA para calcular o crescimento médio considerando-se juros compostos com taxas variáveis.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/geomean-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Núm1 é obrigatório, os números subsequentes são opcionais. De 1 a 255 argumentos para os quais você deseja calcular a média. Você também pode usar uma única matriz ou referência a uma matriz em vez de argumentos separados por ponto-e-vírgulas."
			},
			number2: {
				name: "number2",
				detail: "Núm1 é obrigatório, os números subsequentes são opcionais. De 1 a 255 argumentos para os quais você deseja calcular a média. Você também pode usar uma única matriz ou referência a uma matriz em vez de argumentos separados por ponto-e-vírgulas."
			}
		}
	},
	GROWTH: {
		description: "Calcula o crescimento exponencial previsto usando dados existentes. CRESCIMENTO retorna os valores y para uma série de novos valores x que você especifica usando valores x e y existentes. Você também pode usar a função de planilha CRESCIMENTO para ajustar uma curva exponencial em valores x e y.",
		abstract: "Calcula o crescimento exponencial previsto usando dados existentes. CRESCIMENTO retorna os valores y para uma série de novos valores x que você especifica usando valores x e y existentes. Você também pode usar a função de planilha CRESCIMENTO para ajustar uma curva exponencial em valores x e y.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/growth-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Obrigatório. O conjunto de valores y que você já conhece na relação y = b*m^x. Se a matriz val_conhecidos_y estiver em uma única coluna, cada coluna de val_conhecidos_x será interpretada como uma variável separada. Se a matriz val_conhecidos_y for uma única linha, cada linha de val_conhecidos_x será interpretada como uma variável separada. Se algum dos números em known_y for 0 ou negativo, CRESCIMENTO devolve o #NUM! valor de erro."
			},
			knownXs: {
				name: "known_x's",
				detail: "Opcional. Um conjunto opcional de valores x que você talvez conheça na relação y = b*m^x. A matriz val_conhecidos_x pode incluir um ou mais conjuntos de variáveis. Se apenas uma variável for usada, val_conhecidos_y e val_conhecidos_x podem ser intervalos de qualquer formato, desde que tenham dimensões iguais. Se mais de uma variável for usada, val_conhecidos_y deve ser um vetor (ou seja, um intervalo com altura de uma linha ou largura de uma coluna). Se val_conhecidos_x for omitido, pressupõe-se que a matriz {1,2,3....} é do mesmo tamanho que val_conhecidos_y."
			},
			newXs: {
				name: "new_x's",
				detail: "Opcional. São novos valores x para os quais você deseja que CRESCIMENTO retorne valores y correspondentes. Novos_valores_x deve incluir uma coluna (ou linha) para cada variável independente, da mesma forma que val_conhecidos_x. Portanto, se val_conhecidos_y estiver em uma única coluna, val_conhecidos_x e novos_valores_x devem ter o mesmo número de colunas. Se val_conhecidos_y estiver em uma única linha, val_conhecidos_x e novos_valores_x devem ter o mesmo número de linhas. Se novos_valores_x for omitido, será considerado como equivalente a val_conhecidos_x. Se val_conhecidos_x e novos_valores_x forem omitidos, serão considerados como equivalentes à matriz {1,2,3,...} que é do mesmo tamanho de val_conhecidos_y."
			},
			constb: {
				name: "const",
				detail: "Opcional. Um valor lógico que força ou não a constante b a se igualar a 1. Se constante for VERDADEIRO ou omitida, b será calculado normalmente. Se constante for FALSO, b será definido como 1 e os valores m serão ajustados para que y = m^x."
			}
		}
	},
	HARMEAN: {
		description: "Retorna a média harmônica de um conjunto de dados. A média harmônica é a recíproca da média aritmética das recíprocas.",
		abstract: "Retorna a média harmônica de um conjunto de dados. A média harmônica é a recíproca da média aritmética das recíprocas.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/harmean-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Número1 é necessário, números subsequentes são opcionais. De 1 a 255 argumentos para os quais você deseja calcular a média. Você também pode usar uma única matriz ou referência a uma matriz em vez de argumentos separados por ponto-e-vírgulas."
			},
			number2: {
				name: "number2",
				detail: "Número1 é necessário, números subsequentes são opcionais. De 1 a 255 argumentos para os quais você deseja calcular a média. Você também pode usar uma única matriz ou referência a uma matriz em vez de argumentos separados por ponto-e-vírgulas."
			}
		}
	},
	HYPGEOM_DIST: {
		description: "Retorna a distribuição hipergeométrica. DIST.HIPERGEOM.N retorna a probabilidade de um determinado número de sucessos de uma amostra, de acordo com o tamanho da amostra, sucessos da população e tamanho da população. Use DIST.HIPERGEOM.N para problemas com uma população finita, em que cada observação é equivalente a um sucesso ou a um fracasso, e em que cada subconjunto de um determinado tamanho é escolhido com igual probabilidade.",
		abstract: "Retorna a distribuição hipergeométrica. DIST.HIPERGEOM.N retorna a probabilidade de um determinado número de sucessos de uma amostra, de acordo com o tamanho da amostra, sucessos da população e tamanho da população. Use DIST.HIPERGEOM.N para problemas com uma população finita, em que cada observação é equivalente a um sucesso ou a um fracasso, e em que cada subconjunto de um determinado tamanho é escolhido com igual probabilidade.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/hypgeom-dist-function"
		}],
		functionParameter: {
			sampleS: {
				name: "sample_s",
				detail: "Necessário. O número de sucessos em uma amostra."
			},
			numberSample: {
				name: "number_sample",
				detail: "Necessário. O tamanho da amostra."
			},
			populationS: {
				name: "population_s",
				detail: "Necessário. O número de sucessos na população."
			},
			numberPop: {
				name: "number_pop",
				detail: "Necessário. O tamanho da população."
			},
			cumulative: {
				name: "cumulative",
				detail: "Necessário. Um valor lógico que determina a forma da função. Se cumulativo for VERDADEIRO, DIST.HIPERGEOM.N retornará a função de distribuição cumulativa; se for FALSO, retornará a função de probabilidade de massa."
			}
		}
	},
	INTERCEPT: {
		description: "Calcula o ponto no qual uma linha irá interceptar o eixo y usando valores de x e y existentes. O ponto de interseção é baseado em uma linha de regressão de melhor ajuste plotada pelos valores de x e y conhecidos. Use a função INTERCEPÇÃO quando você quiser determinar o valor da variável dependente e a variável independente for 0 (zero). Por exemplo, você pode usar a função INTERCEPÇÃO para prever a resistência elétrica de um metal a 0°C quando os pontos de dados forem medidos em temperatura ambiente ou mais elevada.",
		abstract: "Calcula o ponto no qual uma linha irá interceptar o eixo y usando valores de x e y existentes. O ponto de interseção é baseado em uma linha de regressão de melhor ajuste plotada pelos valores de x e y conhecidos. Use a função INTERCEPÇÃO quando você quiser determinar o valor da variável dependente e a variável independente for 0 (zero). Por exemplo, você pode usar a função INTERCEPÇÃO para prever a resistência elétrica de um metal a 0°C quando os pontos de dados forem medidos em temperatura ambiente ou mais elevada.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/intercept-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Necessário. O conjunto dependente de observações ou dados."
			},
			knownXs: {
				name: "known_x's",
				detail: "Necessário. O conjunto independente de observações ou dados."
			}
		}
	},
	KURT: {
		description: "Retorna a curtose de um conjunto de dados. A curtose caracteriza uma distribuição em cume ou plana se comparada à distribuição normal. A curtose positiva indica uma distribuição relativamente em cume. A curtose negativa indica uma distribuição relativamente plana.",
		abstract: "Retorna a curtose de um conjunto de dados. A curtose caracteriza uma distribuição em cume ou plana se comparada à distribuição normal. A curtose positiva indica uma distribuição relativamente em cume. A curtose negativa indica uma distribuição relativamente plana.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/kurt-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Núm1 é obrigatório, os números subsequentes são opcionais. De 1 a 255 argumentos para os quais você deseja calcular a curtose. Você também pode usar uma única matriz ou referência a uma matriz em vez de argumentos separados por ponto-e-vírgulas."
			},
			number2: {
				name: "number2",
				detail: "Núm1 é obrigatório, os números subsequentes são opcionais. De 1 a 255 argumentos para os quais você deseja calcular a curtose. Você também pode usar uma única matriz ou referência a uma matriz em vez de argumentos separados por ponto-e-vírgulas."
			}
		}
	},
	LARGE: {
		description: "Retorna o maior valor k-ésimo de um conjunto de dados. Você pode usar esta função para selecionar um valor de acordo com a sua posição relativa. Por exemplo, você pode usar MAIOR para obter o primeiro, o segundo e o terceiro resultados.",
		abstract: "Retorna o maior valor k-ésimo de um conjunto de dados. Você pode usar esta função para selecionar um valor de acordo com a sua posição relativa. Por exemplo, você pode usar MAIOR para obter o primeiro, o segundo e o terceiro resultados.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/large-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Necessário. A matriz ou intervalo de dados cujo maior valor k-ésimo você deseja determinar."
			},
			k: {
				name: "k",
				detail: "Obrigatório. A posição (do maior) na matriz ou intervalo de célula de dados a ser fornecida."
			}
		}
	},
	LINEST: {
		description: "A função PROJ.LIN calcula as estatísticas para uma linha usando o método \"quadrados mínimos\" para calcular uma linha reta que melhor se ajusta aos seus dados e retorna uma matriz que descreve essa linha. Você também pode combinar a função PROJ.LIN com outras funções para calcular as estatísticas de outros tipos de modelos que são lineares nos parâmetros desconhecidos, incluindo séries polinomiais, logarítmicas, exponenciais e de potência. Como essa função retorna uma matriz de valores, ela deve ser inserida como uma fórmula de matriz. Instruções acompanham os exemplos neste artigo.",
		abstract: "A função PROJ.LIN calcula as estatísticas para uma linha usando o método \"quadrados mínimos\" para calcular uma linha reta que melhor se ajusta aos seus dados e retorna uma matriz que descreve essa linha. Você também pode combinar a função PROJ.LIN com outras funções para calcular as estatísticas de outros tipos de modelos que são lineares nos parâmetros desconhecidos, incluindo séries polinomiais, logarítmicas, exponenciais e de potência. Como essa função retorna uma matriz de valores, ela deve ser inserida como uma fórmula de matriz. Instruções acompanham os exemplos neste artigo.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/linest-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Obrigatório. O conjunto de valores y que você já conhece na relação y = mx + b. Se o intervalo de known_y estiver em uma única coluna, cada coluna de known_x será interpretada como uma variável separada. Se o intervalo de known_y estiver contido em uma única linha, cada linha de known_x será interpretada como uma variável separada."
			},
			knownXs: {
				name: "known_x's",
				detail: "Opcional. Um conjunto opcional de valores x que talvez você já conheça na relação y = mx + b. O intervalo de known_x pode incluir um ou mais conjuntos de variáveis. Se apenas uma variável for usada, known_y e known_x poderão ser intervalos de qualquer formato, desde que tenham dimensões iguais. Se mais de uma variável for usada, known_y deve ser um vetor (ou seja, um intervalo com altura de uma linha ou largura de uma coluna). Se known_x for omitido, será considerado a matriz {1,2,3,...} com o mesmo tamanho que known_y ."
			},
			constb: {
				name: "const",
				detail: "Opcional. Um valor lógico que especifica se a constante b será ou não forçada a se igualar a 0. Se constante for VERDADEIRO ou omitido, b será calculado normalmente. Se constante for FALSO, b será definido como igual a 0 e os valores m serão ajustados para se adaptarem a y = mx."
			},
			stats: {
				name: "stats",
				detail: "Opcional. O valor lógico que especifica se estatísticas de regressão adicionais serão retornadas. Se estatística for VERDADEIRO, PROJ.LIN retornará as estatísticas de regressão adicionais; Como resultado, a matriz retornada é {mn,mn-1,...,m1,b; sen,sen-1,...,se1,seb; r 2 , sey; F,df; ssreg,ssresid} . Se estatística for FALSO ou omitido, PROJ.LIN retornará somente os coeficientes m e a constante b. Os dados estatísticos de regressão adicionais são:"
			}
		}
	},
	LOGEST: {
		description: "A equação para a curva é:",
		abstract: "A equação para a curva é:",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/logest-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Necessário. O conjunto de valores y que você já conhece na relação y = b*m^x. Se a matriz val_conhecidos_y estiver em uma única coluna, cada coluna de val_conhecidos_x será interpretada como uma variável separada. Se a matriz val_conhecidos_y for uma única linha, cada linha de val_conhecidos_x será interpretada como uma variável separada."
			},
			knownXs: {
				name: "known_x's",
				detail: "Opcional. Um conjunto opcional de valores x que você talvez conheça na relação y = b*m^x. A matriz val_conhecidos_x pode incluir um ou mais conjuntos de variáveis. Se apenas uma variável for usada, val_conhecidos_y e val_conhecidos_x podem ser intervalos de qualquer formato, desde que tenham dimensões iguais. Se mais de uma variável for usada, val_conhecidos_y deve ser um vetor (ou seja, um intervalo com altura de uma linha ou largura de uma coluna). Se val_conhecidos_x for omitido, pressupõe-se que a matriz {1,2,3,...} seja do mesmo tamanho que val_conhecidos_y."
			},
			constb: {
				name: "const",
				detail: "Opcional. Um valor lógico que força ou não a constante b a se igualar a 1. Se constante for VERDADEIRO ou omitido, b será calculado normalmente. Se constante for FALSO, b será o conjunto igual a 1, e os valores m são ajustados para y = m^x."
			},
			stats: {
				name: "stats",
				detail: "Opcional. O valor lógico que especifica se estatísticas de regressão adicionais serão retornadas. Se estatística for VERDADEIRO, PROJ.LOG retornará a estatística de regressão adicional, de forma que a matriz retornada será {mn,mn-1,...,m1,b;sen,sen-1,...,se1,seb;r 2,sey; F,df;ssreg,ssresid}. Se estatística for FALSO ou omitido, PROJ.LOG retornará apenas os coeficientes m e a constante b."
			}
		}
	},
	LOGNORM_DIST: {
		description: "Use esta função para analisar os dados que forem transformados através de logaritmos.",
		abstract: "Use esta função para analisar os dados que forem transformados através de logaritmos.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/lognorm-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obrigatório. O valor no qual se avalia a função."
			},
			mean: {
				name: "mean",
				detail: "Obrigatório. A média do ln(x)."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Obrigatório. O desvio padrão do ln(x)."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obrigatório. Um valor lógico que determina a forma da função. Se cumulativo for VERDADEIRO, DIST.LOGNORMAL.N retornará a função de distribuição cumulativa; se for FALSO, retornará a função de densidade de probabilidade."
			}
		}
	},
	LOGNORM_INV: {
		description: "Retorna o inverso da função de distribuição cumulativa lognormal de x, em que ln(x) normalmente é distribuída com os parâmetros Média e Desv_padrão. Se p = DIST.LOGNORMAL.N(x,...) então INV.LOGNORMAL(p,...) = x.",
		abstract: "Retorna o inverso da função de distribuição cumulativa lognormal de x, em que ln(x) normalmente é distribuída com os parâmetros Média e Desv_padrão. Se p = DIST.LOGNORMAL.N(x,...) então INV.LOGNORMAL(p,...) = x.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/lognorm-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Necessário. Uma probabilidade associada à distribuição lognormal."
			},
			mean: {
				name: "mean",
				detail: "Necessário. A média do ln(x)."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Necessário. O desvio padrão do ln(x)."
			}
		}
	},
	MARGINOFERROR: {
		description: "Esta função calcula a margem de erro a partir de um intervalo de valores e de um nível de confiança.",
		abstract: "Esta função calcula a margem de erro a partir de um intervalo de valores e de um nível de confiança.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/12487850?hl=pt-BR"
		}],
		functionParameter: {
			range: {
				name: "range",
				detail: "O intervalo de valores usado para calcular a margem de erro."
			},
			confidence: {
				name: "confidence",
				detail: "O nível de confiança desejado entre 0 e 1."
			}
		}
	},
	MAX: {
		description: "Retorna o valor máximo de um conjunto de valores.",
		abstract: "Retorna o valor máximo de um conjunto de valores.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/max-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Número1 é necessário, números subsequentes são opcionais. De 1 a 255 números cujo valor máximo você deseja saber."
			},
			number2: {
				name: "number2",
				detail: "Número1 é necessário, números subsequentes são opcionais. De 1 a 255 números cujo valor máximo você deseja saber."
			}
		}
	},
	MAXA: {
		description: "Retorna o maior valor em uma lista de argumentos.",
		abstract: "Retorna o maior valor em uma lista de argumentos.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/maxa-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Obrigatório. O primeiro argumento de número para o qual você deseja localizar o maior valor."
			},
			value2: {
				name: "value2",
				detail: "Opcional. Argumentos de número de 2 a 255 cujo valor máximo você deseja saber."
			}
		}
	},
	MAXIFS: {
		description: "A função MÁXIMOSES retorna o valor máximo entre as células especificadas por um determinado conjunto de critérios ou condições.",
		abstract: "A função MÁXIMOSES retorna o valor máximo entre as células especificadas por um determinado conjunto de critérios ou condições.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/maxifs-function"
		}],
		functionParameter: {
			maxRange: {
				name: "sum_range",
				detail: "O intervalo real das células em que o valor máximo vai ser determinado."
			},
			criteriaRange1: {
				name: "criteria_range1",
				detail: "É o conjunto de células a serem avaliadas com os critérios."
			},
			criteria1: {
				name: "criteria1",
				detail: "São os critérios na forma de um número, expressão ou texto que definem quais células serão avaliadas como o máximo. O mesmo conjunto de critérios funciona para as funções MÍNIMOSES , SOMASES e MÉDIASES ."
			},
			criteriaRange2: {
				name: "criteriaRange2",
				detail: "Os intervalos adicionais e seus critérios associados. Você pode inserir até 126 pares de intervalo/critérios."
			},
			criteria2: {
				name: "criteria2",
				detail: "Os intervalos adicionais e seus critérios associados. Você pode inserir até 126 pares de intervalo/critérios."
			}
		}
	},
	MEDIAN: {
		description: "Retorna a mediana dos números indicados. A mediana é o número no centro de um conjunto de números.",
		abstract: "Retorna a mediana dos números indicados. A mediana é o número no centro de um conjunto de números.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/median-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Número1 é necessário, números subsequentes são opcionais. De 1 a 255 números dos quais você deseja obter a mediana."
			},
			number2: {
				name: "number2",
				detail: "Número1 é necessário, números subsequentes são opcionais. De 1 a 255 números dos quais você deseja obter a mediana."
			}
		}
	},
	MIN: {
		description: "Retorna o menor número na lista de argumentos.",
		abstract: "Retorna o menor número na lista de argumentos.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/min-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Núm1 é opcional, os números subsequentes são opcionais. De 1 a 255 números cujo valor MÍNIMO você deseja saber."
			},
			number2: {
				name: "number2",
				detail: "Núm1 é opcional, os números subsequentes são opcionais. De 1 a 255 números cujo valor MÍNIMO você deseja saber."
			}
		}
	},
	MINA: {
		description: "Retorna o menor valor na lista de argumentos.",
		abstract: "Retorna o menor valor na lista de argumentos.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/mina-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Valor1 é obrigatório, os valores subsequentes são opcionais. De 1 a 255 valores cujo menor valor você deseja saber."
			},
			value2: {
				name: "value2",
				detail: "Valor1 é obrigatório, os valores subsequentes são opcionais. De 1 a 255 valores cujo menor valor você deseja saber."
			}
		}
	},
	MINIFS: {
		description: "A função MÍNIMOSES retorna o valor mínimo entre as células especificadas por um determinado conjunto de critérios ou condições.",
		abstract: "A função MÍNIMOSES retorna o valor mínimo entre as células especificadas por um determinado conjunto de critérios ou condições.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/minifs-function"
		}],
		functionParameter: {
			minRange: {
				name: "min_range",
				detail: "O intervalo real das células em que o valor mínimo vai ser determinado."
			},
			criteriaRange1: {
				name: "criteria_range1",
				detail: "É o conjunto de células a serem avaliadas com os critérios."
			},
			criteria1: {
				name: "criteria1",
				detail: "São os critérios na forma de um número, de uma expressão ou de um texto que definem quais células serão avaliadas como o mínimo. O mesmo conjunto de critérios funciona para as funções MÁXIMOSES , SOMASES e MÉDIASES ."
			},
			criteriaRange2: {
				name: "criteria_range2",
				detail: "Os intervalos adicionais e seus critérios associados. Você pode inserir até 126 pares de intervalo/critérios."
			},
			criteria2: {
				name: "criteria2",
				detail: "Os intervalos adicionais e seus critérios associados. Você pode inserir até 126 pares de intervalo/critérios."
			}
		}
	},
	MODE_MULT: {
		description: "Isso retornará mais de um resultado se existirem modos múltiplos. Como essa função retorna uma matriz de valores, ela deve ser inserida como uma fórmula de matriz.",
		abstract: "Isso retornará mais de um resultado se existirem modos múltiplos. Como essa função retorna uma matriz de valores, ela deve ser inserida como uma fórmula de matriz.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/mode-mult-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Necessário. O primeiro argumento de número cujo modo você deseja calcular."
			},
			number2: {
				name: "number2",
				detail: "Opcional. Argumentos de número de 2 a 254 para os quais você deseja calcular o modo. Você também pode usar uma única matriz ou referência a uma matriz em vez de argumentos separados por ponto-e-vírgulas."
			}
		}
	},
	MODE_SNGL: {
		description: "Retorna o valor que ocorre com mais frequência em uma matriz ou intervalo de dados.",
		abstract: "Retorna o valor que ocorre com mais frequência em uma matriz ou intervalo de dados.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/mode-sngl-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obrigatório. O primeiro argumento cujo modo você deseja calcular."
			},
			number2: {
				name: "number2",
				detail: "Opcional. Argumentos de 2 a 254 para os quais você deseja calcular o modo. Você também pode usar uma única matriz ou referência a uma matriz em vez de argumentos separados por ponto-e-vírgulas."
			}
		}
	},
	NEGBINOM_DIST: {
		description: "Retorna a distribuição binominal negativa, a probabilidade de ocorrer núm_f fracassos antes de núm_s-ésimo sucesso, quando a probabilidade constante de um sucesso é probabilidade_s.",
		abstract: "Retorna a distribuição binominal negativa, a probabilidade de ocorrer núm_f fracassos antes de núm_s-ésimo sucesso, quando a probabilidade constante de um sucesso é probabilidade_s.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/negbinom-dist-function"
		}],
		functionParameter: {
			numberF: {
				name: "number_f",
				detail: "Necessário. O número de insucessos."
			},
			numberS: {
				name: "number_s",
				detail: "Necessário. O número a partir do qual se considera haver sucesso."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Necessário. A probabilidade de sucesso."
			},
			cumulative: {
				name: "cumulative",
				detail: "Necessário. Um valor lógico que determina a forma da função. Se cumulativo for VERDADEIRO, DIST.BIN.NEG.N retornará a função de distribuição cumulativa; se for FALSO, retornará a função de densidade de probabilidade."
			}
		}
	},
	NORM_DIST: {
		description: "Retorna a distribuição cumulativa normal para a média especificada e o desvio padrão. Esta função tem uma enorme variedade de aplicações em estatística, incluindo verificação de hipóteses.",
		abstract: "Retorna a distribuição cumulativa normal para a média especificada e o desvio padrão. Esta função tem uma enorme variedade de aplicações em estatística, incluindo verificação de hipóteses.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/norm-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obrigatório. O valor cuja distribuição você deseja obter."
			},
			mean: {
				name: "mean",
				detail: "Obrigatório. A média aritmética da distribuição."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Obrigatório. O desvio padrão da distribuição."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obrigatório. Um valor lógico que determina a forma da função. Se cumulativo for VERDADEIRO, NORM. DIST devolve a função de distribuição cumulativa; se FOR FALSO, devolve a função de densidade de probabilidade."
			}
		}
	},
	NORM_INV: {
		description: "Retorna o inverso da distribuição cumulativa normal para a média específica e o desvio padrão.",
		abstract: "Retorna o inverso da distribuição cumulativa normal para a média específica e o desvio padrão.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/norm-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Necessário. Uma probabilidade correspondente à distribuição normal."
			},
			mean: {
				name: "mean",
				detail: "Necessário. A média aritmética da distribuição."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Necessário. O desvio padrão da distribuição."
			}
		}
	},
	NORM_S_DIST: {
		description: "A NORMA. A função DIST.S no Excel devolve a distribuição normal padrão ( ou seja, tem uma média de zero e um desvio padrão de um ). Pode utilizar esta função em vez de utilizar uma tabela de áreas curvas normais padrão.",
		abstract: "A NORMA. A função DIST.S no Excel devolve a distribuição normal padrão ( ou seja, tem uma média de zero e um desvio padrão de um ). Pode utilizar esta função em vez de utilizar uma tabela de áreas curvas normais padrão.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/norm-s-dist-function"
		}],
		functionParameter: {
			z: {
				name: "z",
				detail: "Obrigatório. Este é o valor para o qual pretende obter a distribuição."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obrigatório. O argumento cumulativo pode ser VERDADEIRO ou FALSO . Este valor lógico determina a forma da função. Se cumulativo for VERDADEIRO, NORM. DIST.S devolve a função de distribuição cumulativa . Se for FALSO, devolve a função de densidade de probabilidade ."
			}
		}
	},
	NORM_S_INV: {
		description: "Retorna o inverso da distribuição cumulativa normal padrão. A distribuição possui uma média igual a zero e um desvio padrão igual a um.",
		abstract: "Retorna o inverso da distribuição cumulativa normal padrão. A distribuição possui uma média igual a zero e um desvio padrão igual a um.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/norm-s-inv-function"
		}],
		functionParameter: { probability: {
			name: "probability",
			detail: "Necessário. Uma probabilidade correspondente à distribuição normal."
		} }
	},
	PEARSON: {
		description: "Retorna o coeficiente de correlação do momento do produto Pearson, r, um índice sem dimensão situado ente -1,0 e 1.0 inclusive, que reflete a extensão de uma relação linear entre dois conjuntos de dados.",
		abstract: "Retorna o coeficiente de correlação do momento do produto Pearson, r, um índice sem dimensão situado ente -1,0 e 1.0 inclusive, que reflete a extensão de uma relação linear entre dois conjuntos de dados.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/pearson-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Necessário. Um conjunto de valores independentes."
			},
			array2: {
				name: "array2",
				detail: "Necessário. Um conjunto de valores dependentes."
			}
		}
	},
	PERCENTILE_EXC: {
		description: "O PERCENTIL. A função EXC devolve o percentil k de valores num intervalo, em que k está no intervalo 0..1, exclusivo.",
		abstract: "O PERCENTIL. A função EXC devolve o percentil k de valores num intervalo, em que k está no intervalo 0..1, exclusivo.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/percentile-exc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Necessário. A matriz ou intervalo de dados que define a posição relativa."
			},
			k: {
				name: "k",
				detail: "Obrigatório. Um valor de percentil no intervalo 0 < k < 1."
			}
		}
	},
	PERCENTILE_INC: {
		description: "Devolve o n-ésimo percentil de valores num intervalo, em que k está no intervalo de 0 a 1, inclusive.",
		abstract: "Devolve o n-ésimo percentil de valores num intervalo, em que k está no intervalo de 0 a 1, inclusive.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/percentile-inc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Obrigatório. A matriz ou intervalo de dados que define a posição relativa."
			},
			k: {
				name: "k",
				detail: "Obrigatório. O valor de percentil no intervalo de 0 a 1, inclusive."
			}
		}
	},
	PERCENTRANK_EXC: {
		description: "Retorna a ordem percentual de um valor em um conjunto de dados como um percentual (0..1, exclusivo) do conjunto de dados.",
		abstract: "Retorna a ordem percentual de um valor em um conjunto de dados como um percentual (0..1, exclusivo) do conjunto de dados.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/percentrank-exc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Obrigatório. A matriz ou intervalo de dados com valores numéricos que define uma posição relativa"
			},
			x: {
				name: "x",
				detail: "Obrigatório. O valor cuja ordem você deseja saber."
			},
			significance: {
				name: "significance",
				detail: "Opcional. Um valor opcional que identifica o número de dígitos significativos para o valor de porcentagem retornado. Se omitido, ORDEM.PORCENTUAL.EXC usará três dígitos (0,xxx)."
			}
		}
	},
	PERCENTRANK_INC: {
		description: "Retorna a ordem percentual de um valor em um conjunto de dados como um percentual (0..1, inclusivo) do conjunto de dados.",
		abstract: "Retorna a ordem percentual de um valor em um conjunto de dados como um percentual (0..1, inclusivo) do conjunto de dados.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/percentrank-inc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Necessário. A matriz ou intervalo de dados com valores numéricos que define uma posição relativa."
			},
			x: {
				name: "x",
				detail: "Obrigatório. O valor cuja ordem você deseja saber."
			},
			significance: {
				name: "significance",
				detail: "Opcional. Um valor opcional que identifica o número de dígitos significativos para o valor de porcentagem retornado. Se omitido, ORDEM.PORCENTUAL.INC usará três dígitos (0,xxx)."
			}
		}
	},
	PERMUT: {
		description: "Retorna o número de permutações para um determinado número de objetos.",
		abstract: "Retorna o número de permutações para um determinado número de objetos.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/permut-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "O número de itens."
			},
			numberChosen: {
				name: "number_chosen",
				detail: "O número de itens em cada permutação."
			}
		}
	},
	PERMUTATIONA: {
		description: "Retorna o número de permutações para um determinado número de objetos (com repetições) que podem ser selecionados do total de objetos.",
		abstract: "Retorna o número de permutações para um determinado número de objetos (com repetições) que podem ser selecionados do total de objetos.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/permutationa-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. Um inteiro que descreve o número total de objetos."
			},
			numberChosen: {
				name: "number_chosen",
				detail: "Necessário. Um número inteiro que descreve o número de objetos em cada permutação."
			}
		}
	},
	PHI: {
		description: "Retorna o valor da função de densidade para uma distribuição normal padrão.",
		abstract: "Retorna o valor da função de densidade para uma distribuição normal padrão.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/phi-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Obrigatório. X é o número do qual você quer a densidade da distribuição normal padrão."
		} }
	},
	POISSON_DIST: {
		description: "Retorna a distribuição Poisson. Uma aplicação comum da distribuição Poisson é prever o número de eventos em um determinado período de tempo, como o número de carros que chega ao ponto de pedágio em um minuto.",
		abstract: "Retorna a distribuição Poisson. Uma aplicação comum da distribuição Poisson é prever o número de eventos em um determinado período de tempo, como o número de carros que chega ao ponto de pedágio em um minuto.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/poisson-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obrigatório. O número de eventos."
			},
			mean: {
				name: "mean",
				detail: "Necessário. O valor numérico esperado."
			},
			cumulative: {
				name: "cumulative",
				detail: "Necessário. Um valor lógico que determina a forma da distribuição de probabilidade fornecida. Se cumulativo for VERDADEIRO, DIST.POISSON retornará a probabilidade Poisson de que o número de eventos aleatórios estará entre zero e x inclusive; se FALSO, retornará a função massa da probabilidade Poisson de que o número de eventos será equivalente a x."
			}
		}
	},
	PROB: {
		description: "Retorna a probabilidade de valores em um intervalo estarem entre dois limites. Se o limite_superior não for fornecido, retornará a probabilidade de que os valores no intervalo_ x sejam iguais ao limite_inferior.",
		abstract: "Retorna a probabilidade de valores em um intervalo estarem entre dois limites. Se o limite_superior não for fornecido, retornará a probabilidade de que os valores no intervalo_ x sejam iguais ao limite_inferior.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/prob-function"
		}],
		functionParameter: {
			xRange: {
				name: "x_range",
				detail: "Obrigatório. O intervalo de valores numéricos de x com os quais são associadas probabilidades."
			},
			probRange: {
				name: "prob_range",
				detail: "Obrigatório. Um conjunto de probabilidades associado com valores no intervalo_x."
			},
			lowerLimit: {
				name: "lower_limit",
				detail: "Opcional. O limite inferior do valor cuja probabilidade você deseja obter."
			},
			upperLimit: {
				name: "upper_limit",
				detail: "Opcional. O limite superior opcional do valor cuja probabilidade você deseja obter."
			}
		}
	},
	QUARTILE_EXC: {
		description: "Devolve o quartil do conjunto de dados, com base em valores de percentil de 0 a 1, exclusivos.",
		abstract: "Devolve o quartil do conjunto de dados, com base em valores de percentil de 0 a 1, exclusivos.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/quartile-exc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Obrigatório. A matriz ou intervalo de célula de valores numéricos cujo valor quartil você deseja obter."
			},
			quart: {
				name: "quart",
				detail: "Obrigatório. Indica o valor a ser retornado."
			}
		}
	},
	QUARTILE_INC: {
		description: "Retorna o quartil de um conjunto de dados, com base em valores de percentil de 0..1, inclusivo.",
		abstract: "Retorna o quartil de um conjunto de dados, com base em valores de percentil de 0..1, inclusivo.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/quartile-inc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Necessário. A matriz ou intervalo de célula de valores numéricos cujo valor quartil você deseja obter."
			},
			quart: {
				name: "quart",
				detail: "Necessário. Indica o valor a ser retornado."
			}
		}
	},
	RANK_AVG: {
		description: "Devolve a classificação de um número numa lista de números: o respetivo tamanho em relação a outros valores na lista. Se mais do que um valor tiver a mesma classificação, é devolvida a classificação média.",
		abstract: "Devolve a classificação de um número numa lista de números: o respetivo tamanho em relação a outros valores na lista. Se mais do que um valor tiver a mesma classificação, é devolvida a classificação média.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/rank-avg-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. O número cuja posição se deseja encontrar."
			},
			ref: {
				name: "ref",
				detail: "Obrigatório. Uma matriz ou referência a uma lista de números. Valores não numéricos em Ref são ignorados."
			},
			order: {
				name: "order",
				detail: "Opcional. Um número que especifica como posicionar um número em uma ordem."
			}
		}
	},
	RANK_EQ: {
		description: "Retorna a posição de um número em uma lista de números. Seu tamanho em relação a outros valores de uma lista; se mais de um valor tiver a mesma posição, a posição superior desse conjunto de valores será retornada.",
		abstract: "Retorna a posição de um número em uma lista de números. Seu tamanho em relação a outros valores de uma lista; se mais de um valor tiver a mesma posição, a posição superior desse conjunto de valores será retornada.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/rank-eq-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. O número cuja posição se deseja encontrar."
			},
			ref: {
				name: "ref",
				detail: "Necessário. Uma matriz ou referência a uma lista de números. Valores não numéricos em Ref são ignorados."
			},
			order: {
				name: "order",
				detail: "Opcional. Um número que especifica como posicionar um número em uma ordem."
			}
		}
	},
	RSQ: {
		description: "Retorna o quadrado do coeficiente de correlação do momento do produto de Pearson através dos pontos de dados em val_conhecidos_y e val_conhecidos_x. Para saber mais, veja a função PEARSON . O valor r2 pode ser interpretado como a proporção da variação em y que pode ser atribuída à variação em x.",
		abstract: "Retorna o quadrado do coeficiente de correlação do momento do produto de Pearson através dos pontos de dados em val_conhecidos_y e val_conhecidos_x. Para saber mais, veja a função PEARSON . O valor r2 pode ser interpretado como a proporção da variação em y que pode ser atribuída à variação em x.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/rsq-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Necessário. Uma matriz ou intervalo de células de pontos de dados dependentes e numéricos."
			},
			knownXs: {
				name: "known_x's",
				detail: "Necessário. O conjunto de pontos de dados independentes."
			}
		}
	},
	SKEW: {
		description: "Retorna a distorção de uma distribuição. O valor enviesado caracteriza o grau de assimetria de uma distribuição em torno de sua média. Um valor enviesado positivo indica uma distribuição com uma ponta assimétrica que se estende em direção a valores mais positivos. Um valor enviesado negativo indica uma distribuição com uma ponta assimétrica que se estende em direção a valores mais negativos.",
		abstract: "Retorna a distorção de uma distribuição. O valor enviesado caracteriza o grau de assimetria de uma distribuição em torno de sua média. Um valor enviesado positivo indica uma distribuição com uma ponta assimétrica que se estende em direção a valores mais positivos. Um valor enviesado negativo indica uma distribuição com uma ponta assimétrica que se estende em direção a valores mais negativos.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/skew-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Número1 é necessário, números subsequentes são opcionais. Argumentos de 1 a 255 para os quais você deseja calcular a distorção. Você também pode usar uma única matriz ou referência a uma matriz em vez de argumentos separados por ponto-e-vírgula."
			},
			number2: {
				name: "number2",
				detail: "Número1 é necessário, números subsequentes são opcionais. Argumentos de 1 a 255 para os quais você deseja calcular a distorção. Você também pode usar uma única matriz ou referência a uma matriz em vez de argumentos separados por ponto-e-vírgula."
			}
		}
	},
	SKEW_P: {
		description: "Retorna a DISTORÇÃO de uma distribuição com base em uma população: uma caracterização do grau de assimetria de uma distribuição em torno de seu meio.",
		abstract: "Retorna a DISTORÇÃO de uma distribuição com base em uma população: uma caracterização do grau de assimetria de uma distribuição em torno de seu meio.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/skew-p-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "O primeiro número, referência de célula ou intervalo para o qual você deseja calcular a assimetria."
			},
			number2: {
				name: "number2",
				detail: "Números, referências de célula ou intervalos adicionais para os quais você deseja calcular a assimetria, até o máximo de 255."
			}
		}
	},
	SLOPE: {
		description: "Retorna a inclinação da linha de regressão linear através de pontos de dados em val_conhecidos_y e val_conhecidos_x. A inclinação é a distância vertical dividida pela distância horizontal entre dois pontos quaisquer na linha, que é a taxa de mudança ao longo da linha de regressão.",
		abstract: "Retorna a inclinação da linha de regressão linear através de pontos de dados em val_conhecidos_y e val_conhecidos_x. A inclinação é a distância vertical dividida pela distância horizontal entre dois pontos quaisquer na linha, que é a taxa de mudança ao longo da linha de regressão.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/slope-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Necessário. Uma matriz ou intervalo de células de pontos de dados dependentes e numéricos."
			},
			knownXs: {
				name: "known_x's",
				detail: "Necessário. O conjunto de pontos de dados independentes."
			}
		}
	},
	SMALL: {
		description: "Retorna o menor valor k-ésimo do conjunto de dados. Use esta função para retornar valores com uma posição específica relativa em um conjunto de dados.",
		abstract: "Retorna o menor valor k-ésimo do conjunto de dados. Use esta função para retornar valores com uma posição específica relativa em um conjunto de dados.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/small-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Necessário. Uma matriz ou intervalo de dados numéricos cujo menor valor k-ésimo você deseja determinar."
			},
			k: {
				name: "k",
				detail: "Obrigatório. A posição (a partir do menor) na matriz ou intervalo de dados a ser fornecido."
			}
		}
	},
	STANDARDIZE: {
		description: "Retorna um valor normalizado de uma distribuição caracterizada por média e desv_padrão.",
		abstract: "Retorna um valor normalizado de uma distribuição caracterizada por média e desv_padrão.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/standardize-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obrigatório. O valor que você deseja normalizar."
			},
			mean: {
				name: "mean",
				detail: "Obrigatório. A média aritmética da distribuição."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Obrigatório. O desvio padrão da distribuição."
			}
		}
	},
	STDEV_P: {
		description: "O desvio padrão é uma medida do grau de dispersão dos valores em relação ao valor médio (a média).",
		abstract: "O desvio padrão é uma medida do grau de dispersão dos valores em relação ao valor médio (a média).",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/stdev-p-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Necessário. O primeiro argumento numérico correspondente a uma população."
			},
			number2: {
				name: "number2",
				detail: "Opcional. Argumentos numéricos de 2 a 254 correspondentes a uma população. Você também pode usar uma única matriz ou uma referência a uma matriz em vez de argumentos separados por ponto-e-vírgula."
			}
		}
	},
	STDEV_S: {
		description: "O desvio padrão é uma medida do grau de dispersão dos valores em relação ao valor médio (a média).",
		abstract: "O desvio padrão é uma medida do grau de dispersão dos valores em relação ao valor médio (a média).",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/stdev-s-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Necessário. O primeiro argumento numérico correspondente a uma amostra de população. Você também pode usar uma única matriz ou uma referência a uma matriz em vez de argumentos separados por ponto-e-vírgula."
			},
			number2: {
				name: "number2",
				detail: "Opcional. Argumentos numéricos de 2 a 254 correspondentes a uma amostra de população. Você também pode usar uma única matriz ou uma referência a uma matriz em vez de argumentos separados por ponto-e-vírgula."
			}
		}
	},
	STDEVA: {
		description: "Estima o desvio padrão com base em uma amostra. O desvio padrão é uma medida do grau de dispersão dos valores em relação ao valor médio (a média).",
		abstract: "Estima o desvio padrão com base em uma amostra. O desvio padrão é uma medida do grau de dispersão dos valores em relação ao valor médio (a média).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/stdeva-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Valor1 é obrigatório, os valores subsequentes são opcionais. Valores de 1 a 255 correspondentes a uma amostra de população. Você também pode usar uma única matriz ou uma referência a uma matriz em vez de argumentos separados por ponto-e-vírgula."
			},
			value2: {
				name: "value2",
				detail: "Valor1 é obrigatório, os valores subsequentes são opcionais. Valores de 1 a 255 correspondentes a uma amostra de população. Você também pode usar uma única matriz ou uma referência a uma matriz em vez de argumentos separados por ponto-e-vírgula."
			}
		}
	},
	STDEVPA: {
		description: "Calcula o desvio padrão com base na população inteira dada como argumentos, incluindo os valores lógicos e de texto. O desvio padrão é uma medida do grau de dispersão dos valores em relação ao valor médio (a média).",
		abstract: "Calcula o desvio padrão com base na população inteira dada como argumentos, incluindo os valores lógicos e de texto. O desvio padrão é uma medida do grau de dispersão dos valores em relação ao valor médio (a média).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/stdevpa-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Value1 é necessário, os valores subsequentes são opcionais. Valores de 1 a 255 correspondentes a uma população. Você também pode usar uma única matriz ou uma referência a uma matriz em vez de argumentos separados por ponto-e-vírgula."
			},
			value2: {
				name: "value2",
				detail: "Value1 é necessário, os valores subsequentes são opcionais. Valores de 1 a 255 correspondentes a uma população. Você também pode usar uma única matriz ou uma referência a uma matriz em vez de argumentos separados por ponto-e-vírgula."
			}
		}
	},
	STEYX: {
		description: "Retorna o erro padrão do valor-y previsto para cada x da regressão. O erro padrão é uma medida da quantidade de erro na previsão de y para um x individual.",
		abstract: "Retorna o erro padrão do valor-y previsto para cada x da regressão. O erro padrão é uma medida da quantidade de erro na previsão de y para um x individual.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/steyx-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Obrigatório. Uma matriz ou intervalo de pontos de dados dependentes."
			},
			knownXs: {
				name: "known_x's",
				detail: "Obrigatório. Uma matriz ou intervalo de pontos de dados independentes."
			}
		}
	},
	T_DIST: {
		description: "Retorna a distribuição t caudal esquerda de Student. A distribuição t é usada no teste de hipóteses de pequenos conjuntos de dados de amostras. Use esta função em vez de uma tabela de valores críticos para a distribuição t.",
		abstract: "Retorna a distribuição t caudal esquerda de Student. A distribuição t é usada no teste de hipóteses de pequenos conjuntos de dados de amostras. Use esta função em vez de uma tabela de valores críticos para a distribuição t.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/t-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obrigatório. O valor numérico em que se avalia a distribuição"
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Obrigatório. Um número inteiro indicando o número de graus de liberdade."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obrigatório. Um valor lógico que determina a forma da função. Se cumulativo for VERDADEIRO, DIST.T retornará a função de distribuição cumulativa; se for FALSO, retornará a função densidade de probabilidade."
			}
		}
	},
	T_DIST_2T: {
		description: "A distribuição t de Student é usada no teste de hipóteses de pequenos conjuntos de dados de amostras. Use esta função em vez de uma tabela de valores críticos para a distribuição t.",
		abstract: "A distribuição t de Student é usada no teste de hipóteses de pequenos conjuntos de dados de amostras. Use esta função em vez de uma tabela de valores críticos para a distribuição t.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/t-dist-2t-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obrigatório. O valor numérico em que se avalia a distribuição."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Obrigatório. Um número inteiro indicando o número de graus de liberdade."
			}
		}
	},
	T_DIST_RT: {
		description: "A distribuição t é usada no teste de hipóteses de pequenos conjuntos de dados de amostras. Use esta função em vez de uma tabela de valores críticos para a distribuição t.",
		abstract: "A distribuição t é usada no teste de hipóteses de pequenos conjuntos de dados de amostras. Use esta função em vez de uma tabela de valores críticos para a distribuição t.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/t-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obrigatório. O valor numérico em que se avalia a distribuição."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Obrigatório. Um número inteiro indicando o número de graus de liberdade."
			}
		}
	},
	T_INV: {
		description: "Retorna o inverso caudal esquerdo da distribuição t de Student",
		abstract: "Retorna o inverso caudal esquerdo da distribuição t de Student",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/t-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obrigatório. A probabilidade associada à distribuição t de Student caudal esquerdo."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Obrigatório. O número de graus de liberdade que caracteriza a distribuição."
			}
		}
	},
	T_INV_2T: {
		description: "Retorna o inverso bicaudal da distribuição t de Student",
		abstract: "Retorna o inverso bicaudal da distribuição t de Student",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/t-inv-2t-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Necessário. A probabilidade associada à distribuição t de Student caudal esquerdo."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Necessário. O número de graus de liberdade que caracteriza a distribuição."
			}
		}
	},
	T_TEST: {
		description: "Retorna a probabilidade associada ao teste t de Student. Use TESTE.T para determinar se duas amostras poderão ser provenientes de duas populações subjacentes que possuem a mesma média.",
		abstract: "Retorna a probabilidade associada ao teste t de Student. Use TESTE.T para determinar se duas amostras poderão ser provenientes de duas populações subjacentes que possuem a mesma média.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/t-test-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Necessário. O primeiro conjunto de dados."
			},
			array2: {
				name: "array2",
				detail: "Necessário. O segundo conjunto de dados."
			},
			tails: {
				name: "tails",
				detail: "Necessário. Especifica o número de caudas da distribuição. Se caudas = 1, TESTE.T usará a distribuição unicaudal. Se caudas = 2, TESTE.T usará a distribuição bicaudal."
			},
			type: {
				name: "type",
				detail: "Necessário. O tipo de Teste t a ser executado."
			}
		}
	},
	TREND: {
		description: "A função TREND retorna valores ao longo de uma tendência linear. Ele se encaixa em uma linha reta (usando o método de menos quadrados) aos known_y e known_x da matriz. TREND retorna os valores y ao longo dessa linha para a matriz de new_x que você especifica.",
		abstract: "A função TREND retorna valores ao longo de uma tendência linear. Ele se encaixa em uma linha reta (usando o método de menos quadrados) aos known_y e known_x da matriz. TREND retorna os valores y ao longo dessa linha para a matriz de new_x que você especifica.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/trend-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "O conjunto de valores y que você já conhece na relação y = mx + b Se a matriz val_conhecidos_y estiver em uma única coluna, cada coluna de val_conhecidos_x será interpretada como uma variável separada. Se a matriz val_conhecidos_y for uma única linha, cada linha de val_conhecidos_x será interpretada como uma variável separada."
			},
			knownXs: {
				name: "known_x's",
				detail: "Um conjunto opcional de valores x que você já pode conhecer na relação y = mx + b A matriz val_conhecidos_x pode incluir um ou mais conjuntos de variáveis. Se apenas uma variável for usada, val_conhecidos_y e val_conhecidos_x podem ser intervalos de qualquer formato, desde que tenham dimensões iguais. Se mais de uma variável for usada, val_conhecidos_y deve ser um vetor (ou seja, um intervalo com altura de uma linha ou largura de uma coluna). Se val_conhecidos_x for omitido, pressupõe-se que a matriz {1,2,3....} é do mesmo tamanho que val_conhecidos_y."
			},
			newXs: {
				name: "new_x's",
				detail: "Novos valores x para os quais você deseja que a TREND retorne valores y correspondentes Novos_valores_x deve incluir uma coluna (ou linha) para cada variável independente, da mesma forma que val_conhecidos_x. Portanto, se val_conhecidos_y estiver em uma única coluna, val_conhecidos_x e novos_valores_x devem ter o mesmo número de colunas. Se val_conhecidos_y estiver em uma única linha, val_conhecidos_x e novos_valores_x devem ter o mesmo número de linhas. Se você omitir novos_valores_x, pressupõe-se que seja igual a val_conhecidos_x. Se você omitir val_conhecidos_x e novos_valores_x, eles serão considerados como a matriz {1,2,3,...} que é do mesmo tamanho que val_conhecidos_y."
			},
			constb: {
				name: "const",
				detail: "Um valor lógico que especifica se deve forçar a constante b a igual a 0 Se constante for VERDADEIRO ou omitido, b será calculado normalmente. Se constante for FALSO, b será definido como 0 (zero) e os valores m serão ajustados de forma que y = mx."
			}
		}
	},
	TRIMMEAN: {
		description: "Retorna a média do interior de um conjunto de dados. MÉDIA.INTERNA calcula a média obtida excluindo-se uma porcentagem dos pontos de dados das pontas superior e inferior de um conjunto de dados. Você pode usar esta função quando quiser excluir dados externos à sua análise.",
		abstract: "Retorna a média do interior de um conjunto de dados. MÉDIA.INTERNA calcula a média obtida excluindo-se uma porcentagem dos pontos de dados das pontas superior e inferior de um conjunto de dados. Você pode usar esta função quando quiser excluir dados externos à sua análise.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/trimmean-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Obrigatório. A matriz ou intervalo de valores a se calcular a média desprezando os desvios."
			},
			percent: {
				name: "percent",
				detail: "Obrigatório. O número fracionário de ponto de dados a ser excluído do cálculo. Por exemplo, se porcentagem = 0,2, serão arrumados 4 pontos de um conjunto de dados de 20 pontos (20 x 0,2): 2 da parte superior e 2 da parte inferior do conjunto."
			}
		}
	},
	VAR_P: {
		description: "Calcula a variação com base na população inteira (ignora valores lógicos e de texto na população).",
		abstract: "Calcula a variação com base na população inteira (ignora valores lógicos e de texto na população).",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/var-p-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Necessário. O primeiro argumento numérico correspondente a uma população."
			},
			number2: {
				name: "number2",
				detail: "Opcional. Argumentos numéricos de 2 a 254 correspondentes a uma população."
			}
		}
	},
	VAR_S: {
		description: "Estima a variação com base em uma amostra (ignora valores lógicos e de texto na amostra).",
		abstract: "Estima a variação com base em uma amostra (ignora valores lógicos e de texto na amostra).",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/var-s-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obrigatório. O primeiro argumento numérico correspondente a uma amostra de população."
			},
			number2: {
				name: "number2",
				detail: "Opcional. Argumentos numéricos de 2 a 254 correspondentes a uma amostra de população."
			}
		}
	},
	VARA: {
		description: "Estima a variação com base em uma amostra.",
		abstract: "Estima a variação com base em uma amostra.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/vara-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Value1 é necessário, os valores subsequentes são opcionais. Argumentos de valor de 1 a 255 correspondentes a uma amostra de população."
			},
			value2: {
				name: "value2",
				detail: "Value1 é necessário, os valores subsequentes são opcionais. Argumentos de valor de 1 a 255 correspondentes a uma amostra de população."
			}
		}
	},
	VARPA: {
		description: "Calcula a variação com base na população inteira.",
		abstract: "Calcula a variação com base na população inteira.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/varpa-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Valor1 é obrigatório, os valores subsequentes são opcionais. Argumentos de valor de 1 a 255 correspondentes a uma população."
			},
			value2: {
				name: "value2",
				detail: "Valor1 é obrigatório, os valores subsequentes são opcionais. Argumentos de valor de 1 a 255 correspondentes a uma população."
			}
		}
	},
	WEIBULL_DIST: {
		description: "Retorna a distribuição Weibull. Use esta distribuição na análise de confiabilidade, como no cálculo do tempo médio de falha para determinado dispositivo.",
		abstract: "Retorna a distribuição Weibull. Use esta distribuição na análise de confiabilidade, como no cálculo do tempo médio de falha para determinado dispositivo.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/weibull-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obrigatório. O valor no qual se avalia a função."
			},
			alpha: {
				name: "alpha",
				detail: "Obrigatório. Um parâmetro da distribuição."
			},
			beta: {
				name: "beta",
				detail: "Obrigatório. Um parâmetro da distribuição."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obrigatório. Determina a forma da função."
			}
		}
	},
	Z_TEST: {
		description: "Para ver como o TESTE.Z pode ser usado em uma fórmula para calcular um valor de probabilidade bicaudal, consulte a seção Comentários abaixo.",
		abstract: "Para ver como o TESTE.Z pode ser usado em uma fórmula para calcular um valor de probabilidade bicaudal, consulte a seção Comentários abaixo.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/z-test-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Necessário. A matriz ou o intervalo de dados em que x será testado."
			},
			x: {
				name: "x",
				detail: "Obrigatório. O valor a ser testado."
			},
			sigma: {
				name: "sigma",
				detail: "Opcional. O desvio padrão da população (conhecido). Quando não especificado, o desvio padrão de amostra será usado."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/text/pt-BR.ts
const locale$3 = {
	ASC: {
		description: "Para idiomas do conjunto de caracteres de dois bytes (DBCS), a função altera os caracteres de largura total (byte duplo) para caracteres de meia largura (byte único).",
		abstract: "Para idiomas do conjunto de caracteres de dois bytes (DBCS), a função altera os caracteres de largura total (byte duplo) para caracteres de meia largura (byte único).",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/asc-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Obrigatório. O texto ou uma referência a uma célula que contém o texto a ser alterado. Se o texto não contiver letras de largura total, ele não será alterado."
		} }
	},
	ARRAYTOTEXT: {
		description: "A função MATRIZPARATEXTO retorna uma matriz de valores de texto de qualquer intervalo especificado. Ele passa valores de texto inalterados e converte valores não textuais em texto.",
		abstract: "A função MATRIZPARATEXTO retorna uma matriz de valores de texto de qualquer intervalo especificado. Ele passa valores de texto inalterados e converte valores não textuais em texto.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/arraytotext-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "A matriz para retornar como texto. Obrigatório."
			},
			format: {
				name: "format",
				detail: "O formato dos dados retornados. Opcional. Pode ser um dos dois valores: 0 Padrão. Formato conciso e fácil de ler. O texto retornado será o mesmo que o texto renderizado em uma célula que possui formatação geral aplicada. 1 Formato estrito que inclui caracteres de escape e delimitadores de linha. Gera uma cadeia de caracteres que pode ser analisada quando inserida na barra de fórmulas. Encapsula cadeia de caracteres retornadas entre aspas, exceto para Booleanos, Números e Erros."
			}
		}
	},
	BAHTTEXT: {
		description: "Converte um número em texto em tailandês e adiciona o sufixo \"Baht\".",
		abstract: "Converte um número em texto em tailandês e adiciona o sufixo \"Baht\".",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/bahttext-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório. Um número que você deseja converter em texto, a referência a uma célula que contenha um número ou uma fórmula que retornará um número."
		} }
	},
	CHAR: {
		description: "Retorna o caractere especificado por um número. Use CARACT para converter em caracteres números de páginas de código que você pode obter em arquivos de outros tipos de computador.",
		abstract: "Retorna o caractere especificado por um número. Use CARACT para converter em caracteres números de páginas de código que você pode obter em arquivos de outros tipos de computador.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/char-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório. Um número entre 1 e 255 que especifica o caractere desejado. O caractere pertence ao conjunto de caracteres usado pelo seu computador. Observação O Excel para a Web suporta apenas CHAR(9), CHAR(10), CHAR(13) e CHAR(32) e superior."
		} }
	},
	CLEAN: {
		description: "Remove todos os caracteres do texto que não podem ser impressos. Use TIRAR em textos importados de outros aplicativos que contêm caracteres que talvez não possam ser impressos no seu sistema operacional. Por exemplo, você pode utilizar TIRAR para remover um código de computador de baixo nível frequentemente localizado no início e no fim de arquivos de dados e que não pode ser impresso.",
		abstract: "Remove todos os caracteres do texto que não podem ser impressos. Use TIRAR em textos importados de outros aplicativos que contêm caracteres que talvez não possam ser impressos no seu sistema operacional. Por exemplo, você pode utilizar TIRAR para remover um código de computador de baixo nível frequentemente localizado no início e no fim de arquivos de dados e que não pode ser impresso.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/clean-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Obrigatório. Qualquer informação na planilha da qual você deseja remover caracteres não imprimíveis."
		} }
	},
	CODE: {
		description: "Retorna um código numérico para o primeiro caractere de uma cadeia de texto. O código retornado corresponde ao conjunto de caracteres usado pelo seu computador.",
		abstract: "Retorna um código numérico para o primeiro caractere de uma cadeia de texto. O código retornado corresponde ao conjunto de caracteres usado pelo seu computador.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/code-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Obrigatório. O texto cujo código do primeiro caractere você deseja obter."
		} }
	},
	CONCAT: {
		description: "A função CONCAT combina o texto de vários intervalos e/ou cadeias de caracteres, mas não fornece argumentos delimitadores ou IgnoreEmpty.",
		abstract: "A função CONCAT combina o texto de vários intervalos e/ou cadeias de caracteres, mas não fornece argumentos delimitadores ou IgnoreEmpty.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/concat-function"
		}],
		functionParameter: {
			text1: {
				name: "text1",
				detail: "Item de texto a ser unido. Uma cadeia de caracteres ou uma matriz de cadeias de caracteres, como um intervalo de células."
			},
			text2: {
				name: "text2",
				detail: "Itens de texto adicionais a serem unidos. Pode haver um máximo de 253 argumentos de texto para os itens de texto. Cada um pode ser uma cadeia de caracteres ou uma matriz de cadeias de caracteres, como um intervalo de células."
			}
		}
	},
	CONCATENATE: {
		description: "Use CONCATENAR , umas das funções de texto , para unir duas ou mais cadeias de texto em uma única cadeia.",
		abstract: "Use CONCATENAR , umas das funções de texto , para unir duas ou mais cadeias de texto em uma única cadeia.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/concatenate-function"
		}],
		functionParameter: {
			text1: {
				name: "text1",
				detail: "O primeiro item a unir. Pode ser texto, número ou referência de célula."
			},
			text2: {
				name: "text2",
				detail: "Itens de texto adicionais a unir. Você pode ter até 255 itens, totalizando até 8.192 caracteres."
			}
		}
	},
	DBCS: {
		description: "A função descrita neste tópico da Ajuda converte letras de meia largura (byte único) dentro de uma cadeia de caracteres em caracteres de largura total (bytes duplos). O nome da função (e os caracteres que ela converte) depende das suas configurações de idioma.",
		abstract: "A função descrita neste tópico da Ajuda converte letras de meia largura (byte único) dentro de uma cadeia de caracteres em caracteres de largura total (bytes duplos). O nome da função (e os caracteres que ela converte) depende das suas configurações de idioma.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/dbcs-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Obrigatório. O texto ou uma referência a uma célula que contém o texto a ser alterado. Se o texto não contiver qualquer letra de meia largura do inglês ou katakana, ele não será alterado."
		} }
	},
	DOLLAR: {
		description: "A função DOLLAR , uma das funções TEXT , converte um número em texto usando o formato de moeda, com os decimais arredondados para o número de lugares especificados. DOLLAR usa o $#,##0.00_); Formato de número ($#,##0.00), embora o símbolo de moeda aplicado dependa das configurações de idioma local.",
		abstract: "A função DOLLAR , uma das funções TEXT , converte um número em texto usando o formato de moeda, com os decimais arredondados para o número de lugares especificados. DOLLAR usa o $#,##0.00_); Formato de número ($#,##0.00), embora o símbolo de moeda aplicado dependa das configurações de idioma local.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/dollar-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. Um número, uma referência a uma célula contendo um número ou uma fórmula que avalia um número."
			},
			decimals: {
				name: "decimals",
				detail: "Opcional. O número de dígitos à direita da vírgula decimal. Se isso for negativo, o número será arredondado para a esquerda do ponto decimal. Se você omitir decimais, ele será considerado 2."
			}
		}
	},
	EXACT: {
		description: "Compara duas cadeias de texto e retorna VERDADEIRO se elas forem exatamente iguais e FALSO caso contrário. EXATO faz diferenciação entre maiúsculas e minúsculas, mas ignora diferenças de formatação. Use EXATO para testar o texto inserido em um documento.",
		abstract: "Compara duas cadeias de texto e retorna VERDADEIRO se elas forem exatamente iguais e FALSO caso contrário. EXATO faz diferenciação entre maiúsculas e minúsculas, mas ignora diferenças de formatação. Use EXATO para testar o texto inserido em um documento.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/exact-function"
		}],
		functionParameter: {
			text1: {
				name: "text1",
				detail: "Necessário. A primeira cadeia de texto."
			},
			text2: {
				name: "text2",
				detail: "Necessário. A segunda cadeia de texto."
			}
		}
	},
	FIND: {
		description: "Localiza um valor de texto dentro de outro, diferenciando maiúsculas de minúsculas.",
		abstract: "Localiza um valor de texto dentro de outro, diferenciando maiúsculas de minúsculas.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/this-article-has-been-retired"
		}],
		functionParameter: {
			findText: {
				name: "find_text",
				detail: "O texto que você deseja localizar."
			},
			withinText: {
				name: "within_text",
				detail: "O texto que contém o texto que você deseja localizar."
			},
			startNum: {
				name: "start_num",
				detail: "Especifica o caractere no qual iniciar a pesquisa. Se omitido, será considerado 1."
			}
		}
	},
	FINDB: {
		description: "Localiza um valor de texto dentro de outro, diferenciando maiúsculas de minúsculas.",
		abstract: "Localiza um valor de texto dentro de outro, diferenciando maiúsculas de minúsculas.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/this-article-has-been-retired"
		}],
		functionParameter: {
			findText: {
				name: "find_text",
				detail: "O texto que você deseja localizar."
			},
			withinText: {
				name: "within_text",
				detail: "O texto que contém o texto que você deseja localizar."
			},
			startNum: {
				name: "start_num",
				detail: "Especifica o caractere no qual iniciar a pesquisa. Se omitido, será considerado 1."
			}
		}
	},
	FIXED: {
		description: "Arredonda o número para o número especificado de decimais, formata o número no formato decimal usando vírgula e pontos e retorna o resultado como texto.",
		abstract: "Arredonda o número para o número especificado de decimais, formata o número no formato decimal usando vírgula e pontos e retorna o resultado como texto.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/fixed-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obrigatório. O número que você deseja arredondar e converter em texto."
			},
			decimals: {
				name: "decimals",
				detail: "Opcional. O número de dígitos à direita da vírgula decimal."
			},
			noCommas: {
				name: "no_commas",
				detail: "Opcional. Um valor lógico que, se VERDADEIRO, impede que DEF.NÚM.DEC inclua vírgulas no texto retornado."
			}
		}
	},
	LEFT: {
		description: "Retorna os caracteres mais à esquerda de um valor de texto.",
		abstract: "Retorna os caracteres mais à esquerda de um valor de texto.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/left-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "A cadeia de texto que contém os caracteres que você deseja extrair."
			},
			numChars: {
				name: "num_chars",
				detail: "Especifica o número de caracteres que você deseja que ESQUERDA extraia."
			}
		}
	},
	LEFTB: {
		description: "Retorna os caracteres mais à esquerda de um valor de texto.",
		abstract: "Retorna os caracteres mais à esquerda de um valor de texto.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/left-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "A cadeia de texto que contém os caracteres que você deseja extrair."
			},
			numBytes: {
				name: "num_bytes",
				detail: "Especifica o número de caracteres que você deseja que ESQUERDAB extraia, com base em bytes."
			}
		}
	},
	LEN: {
		description: "Retorna o número de caracteres em uma cadeia de texto.",
		abstract: "Retorna o número de caracteres em uma cadeia de texto.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/len-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "O texto cujo comprimento você deseja encontrar. Espaços contam como caracteres."
		} }
	},
	LENB: {
		description: "Retorna o número de bytes usados para representar os caracteres em uma cadeia de texto.",
		abstract: "Retorna o número de bytes usados para representar os caracteres em uma cadeia de texto.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/len-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "O texto cujo comprimento você deseja encontrar. Espaços contam como caracteres."
		} }
	},
	LOWER: {
		description: "Converte todas as letras maiúsculas em uma cadeia de texto para minúsculas.",
		abstract: "Converte todas as letras maiúsculas em uma cadeia de texto para minúsculas.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/lower-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Obrigatório. O texto que você deseja converter para minúscula. MINÚSCULA só muda caracteres de letras para texto."
		} }
	},
	MID: {
		description: "Retorna um número específico de caracteres de uma cadeia de texto, a partir da posição indicada.",
		abstract: "Retorna um número específico de caracteres de uma cadeia de texto, a partir da posição indicada.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/mid-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "A cadeia de texto que contém os caracteres que você deseja extrair."
			},
			startNum: {
				name: "start_num",
				detail: "A posição, em texto, do primeiro caractere que você deseja extrair."
			},
			numChars: {
				name: "num_chars",
				detail: "Especifica o número de caracteres que você deseja que EXT.TEXTO extraia."
			}
		}
	},
	MIDB: {
		description: "Retorna um número específico de caracteres de uma cadeia de texto, a partir da posição indicada.",
		abstract: "Retorna um número específico de caracteres de uma cadeia de texto, a partir da posição indicada.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/mid-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "A cadeia de texto que contém os caracteres que você deseja extrair."
			},
			startNum: {
				name: "start_num",
				detail: "A posição, em texto, do primeiro caractere que você deseja extrair."
			},
			numBytes: {
				name: "num_bytes",
				detail: "Especifica o número de caracteres que você deseja que EXT.TEXTOB extraia, com base em bytes."
			}
		}
	},
	NUMBERSTRING: {
		description: "Converte números em cadeias de caracteres chinesas.",
		abstract: "Converte números em cadeias de caracteres chinesas.",
		links: [{
			title: "Instruction",
			url: "https://www.wps.cn/learning/course/detail/id/340.html?chan=pc_kdocs_function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "O valor convertido em uma cadeia de caracteres chinesa."
			},
			type: {
				name: "type",
				detail: "O tipo do resultado retornado: 1, chinês em minúsculas; 2, chinês em maiúsculas; 3, caracteres chineses de leitura e escrita."
			}
		}
	},
	NUMBERVALUE: {
		description: "Converte texto em um número, de maneira independente de localidade.",
		abstract: "Converte texto em um número, de maneira independente de localidade.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/numbervalue-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Obrigatório. O texto a ser convertido em um número."
			},
			decimalSeparator: {
				name: "decimal_separator",
				detail: "Opcional. O caractere usado para separar o inteiro e a parte fracional do resultado."
			},
			groupSeparator: {
				name: "group_separator",
				detail: "Opcional. O caractere usado para separar agrupamentos de números, como milhares de centenas e milhões de milhares."
			}
		}
	},
	PHONETIC: {
		description: "Extrai os caracteres fonéticos (furigana) de uma cadeia de texto.",
		abstract: "Extrai os caracteres fonéticos (furigana) de uma cadeia de texto.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/phonetic-function"
		}],
		functionParameter: { reference: {
			name: "Referência",
			detail: "Necessário. Uma cadeia de texto ou uma referência a uma única célula ou a um intervalo de células que contém uma cadeia de texto furigana."
		} }
	},
	PROPER: {
		description: "Coloca a primeira letra de uma cadeia de texto em maiúscula e todas as outras letras do texto depois de qualquer caractere diferente de uma letra. Converte todas as outras letras para minúsculas.",
		abstract: "Coloca a primeira letra de uma cadeia de texto em maiúscula e todas as outras letras do texto depois de qualquer caractere diferente de uma letra. Converte todas as outras letras para minúsculas.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/proper-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Obrigatório. O texto entre aspas, uma fórmula que retorna o texto ou uma referência a uma célula que contenha o texto que você deseja colocar parcialmente em maiúscula."
		} }
	},
	REGEXEXTRACT: {
		description: "Extrai a primeira substring correspondente de acordo com uma expressão regular.",
		abstract: "Extrai a primeira substring correspondente de acordo com uma expressão regular.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3098244?hl=pt-BR"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "O texto de entrada."
			},
			regularExpression: {
				name: "regular_expression",
				detail: "A primeira parte do texto que corresponder a esta expressão será retornada."
			}
		}
	},
	REGEXMATCH: {
		description: "Indica se um trecho de texto corresponde a uma expressão regular.",
		abstract: "Indica se um trecho de texto corresponde a uma expressão regular.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3098292?hl=pt-BR"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "O texto a ser testado em relação à expressão regular."
			},
			regularExpression: {
				name: "regular_expression",
				detail: "A expressão regular usada para testar o texto."
			}
		}
	},
	REGEXREPLACE: {
		description: "Substitui parte de uma cadeia de texto por outra usando expressões regulares.",
		abstract: "Substitui parte de uma cadeia de texto por outra usando expressões regulares.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3098245?hl=pt-BR"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "O texto cuja parte será substituída."
			},
			regularExpression: {
				name: "regular_expression",
				detail: "A expressão regular. Todas as ocorrências correspondentes no texto serão substituídas."
			},
			replacement: {
				name: "replacement",
				detail: "O texto que será inserido no texto original."
			}
		}
	},
	REPLACE: {
		description: "Substitui caracteres dentro de um texto.",
		abstract: "Substitui caracteres dentro de um texto.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/replace-function"
		}],
		functionParameter: {
			oldText: {
				name: "old_text",
				detail: "O texto no qual você deseja substituir alguns caracteres."
			},
			startNum: {
				name: "start_num",
				detail: "A posição em old_text do caractere que você deseja substituir por new_text."
			},
			numChars: {
				name: "num_chars",
				detail: "O número de caracteres em old_text que SUBSTITUIR deve trocar por new_text."
			},
			newText: {
				name: "new_text",
				detail: "O texto que substituirá caracteres em old_text."
			}
		}
	},
	REPLACEB: {
		description: "Substitui caracteres dentro de um texto.",
		abstract: "Substitui caracteres dentro de um texto.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/replace-function"
		}],
		functionParameter: {
			oldText: {
				name: "old_text",
				detail: "O texto no qual você deseja substituir alguns caracteres."
			},
			startNum: {
				name: "start_num",
				detail: "A posição em old_text do caractere que você deseja substituir por new_text."
			},
			numBytes: {
				name: "num_bytes",
				detail: "O número de bytes em old_text que SUBSTITUIRB deve trocar por new_text."
			},
			newText: {
				name: "new_text",
				detail: "O texto que substituirá caracteres em old_text."
			}
		}
	},
	REPT: {
		description: "Repete o texto um determinado número de vezes. Utilize REPT para preencher uma célula com um número de repetições de uma cadeia de texto.",
		abstract: "Repete o texto um determinado número de vezes. Utilize REPT para preencher uma célula com um número de repetições de uma cadeia de texto.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/rept-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Obrigatório. O texto que você deseja repetir."
			},
			numberTimes: {
				name: "number_times",
				detail: "Obrigatório. Um número positivo que especifica o número de vezes que você deseja repetir texto."
			}
		}
	},
	RIGHT: {
		description: "Retorna os caracteres mais à direita de um valor de texto.",
		abstract: "Retorna os caracteres mais à direita de um valor de texto.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/right-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "A cadeia de texto que contém os caracteres que você deseja extrair."
			},
			numChars: {
				name: "num_chars",
				detail: "Especifica o número de caracteres que você deseja que DIREITA extraia."
			}
		}
	},
	RIGHTB: {
		description: "Retorna os caracteres mais à direita de um valor de texto.",
		abstract: "Retorna os caracteres mais à direita de um valor de texto.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/right-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "A cadeia de texto que contém os caracteres que você deseja extrair."
			},
			numBytes: {
				name: "num_bytes",
				detail: "Especifica o número de caracteres que você deseja que DIREITAB extraia, com base em bytes."
			}
		}
	},
	SEARCH: {
		description: "Localiza um valor de texto dentro de outro, sem diferenciar maiúsculas de minúsculas.",
		abstract: "Localiza um valor de texto dentro de outro, sem diferenciar maiúsculas de minúsculas.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/search-function"
		}],
		functionParameter: {
			findText: {
				name: "find_text",
				detail: "O texto que você deseja localizar."
			},
			withinText: {
				name: "within_text",
				detail: "O texto que contém o texto que você deseja localizar."
			},
			startNum: {
				name: "start_num",
				detail: "Especifica o caractere no qual iniciar a pesquisa. Se omitido, será considerado 1."
			}
		}
	},
	SEARCHB: {
		description: "Localiza um valor de texto dentro de outro, sem diferenciar maiúsculas de minúsculas.",
		abstract: "Localiza um valor de texto dentro de outro, sem diferenciar maiúsculas de minúsculas.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/search-function"
		}],
		functionParameter: {
			findText: {
				name: "find_text",
				detail: "O texto que você deseja localizar."
			},
			withinText: {
				name: "within_text",
				detail: "O texto que contém o texto que você deseja localizar."
			},
			startNum: {
				name: "start_num",
				detail: "Especifica o caractere no qual iniciar a pesquisa. Se omitido, será considerado 1."
			}
		}
	},
	SUBSTITUTE: {
		description: "Coloca novo_texto no lugar de texto_antigo em uma cadeia de texto. Use SUBSTITUIR quando quiser substituir texto específico em uma cadeia de texto; use MUDAR quando quiser substituir qualquer texto que ocorra em um local específico de uma cadeia de texto.",
		abstract: "Coloca novo_texto no lugar de texto_antigo em uma cadeia de texto. Use SUBSTITUIR quando quiser substituir texto específico em uma cadeia de texto; use MUDAR quando quiser substituir qualquer texto que ocorra em um local específico de uma cadeia de texto.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/substitute-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Obrigatório. O texto ou a referência a uma célula que contém o texto no qual deseja substituir caracteres."
			},
			oldText: {
				name: "old_text",
				detail: "Obrigatório. O texto que se deseja substituir."
			},
			newText: {
				name: "new_text",
				detail: "Obrigatório. O texto pelo qual deseja substituir texto_antigo."
			},
			instanceNum: {
				name: "instance_num",
				detail: "Opcional. Especifica que ocorrência de texto_antigo se deseja substituir por novo_texto. Se especificar núm_da_ocorrência, apenas aquela ocorrência de texto_antigo será substituída. Caso contrário, cada ocorrência de texto_antigo no texto é alterada para novo_texto."
			}
		}
	},
	T: {
		description: "Retorna o texto referido por valor.",
		abstract: "Retorna o texto referido por valor.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/t-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Necessário. O valor que você deseja testar."
		} }
	},
	TEXT: {
		description: "A função TEXTO permite que você altere a maneira de exibir um número aplicando formatação a ele com códigos de formatação . Isso é útil quando você deseja exibir números em um formato mais legível ou deseja combinar números com texto ou símbolos.",
		abstract: "A função TEXTO permite que você altere a maneira de exibir um número aplicando formatação a ele com códigos de formatação . Isso é útil quando você deseja exibir números em um formato mais legível ou deseja combinar números com texto ou símbolos.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/text-function"
		}],
		functionParameter: {
			value: {
				name: "value",
				detail: "Um valor numérico que você deseja converter em texto."
			},
			formatText: {
				name: "format_text",
				detail: "Uma cadeia de texto que define a formatação a aplicar ao valor fornecido."
			}
		}
	},
	TEXTAFTER: {
		description: "Retorna o texto que ocorre depois de um caractere ou cadeia fornecida.",
		abstract: "Retorna o texto que ocorre depois de um caractere ou cadeia fornecida.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/textafter-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "O texto no qual pesquisar. Caracteres curinga não são permitidos."
			},
			delimiter: {
				name: "delimiter",
				detail: "O texto que marca o ponto após o qual você deseja extrair."
			},
			instanceNum: {
				name: "instance_num",
				detail: "A ocorrência do delimitador após a qual você deseja extrair o texto."
			},
			matchMode: {
				name: "match_mode",
				detail: "Determina se a pesquisa diferencia maiúsculas de minúsculas. Por padrão, diferencia."
			},
			matchEnd: {
				name: "match_end",
				detail: "Trata o fim do texto como delimitador. Por padrão, o texto deve corresponder exatamente."
			},
			ifNotFound: {
				name: "if_not_found",
				detail: "O valor retornado se nenhuma correspondência for encontrada. Por padrão, retorna #N/D."
			}
		}
	},
	TEXTBEFORE: {
		description: "Retorna o texto que ocorre antes de um determinado caractere ou cadeia de caracteres. É o oposto da função TEXTWAFTER .",
		abstract: "Retorna o texto que ocorre antes de um determinado caractere ou cadeia de caracteres. É o oposto da função TEXTWAFTER .",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/pt-br/excel/functions/textbefore-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "O texto no qual pesquisar. Caracteres curinga não são permitidos."
			},
			delimiter: {
				name: "delimiter",
				detail: "O texto que marca o ponto antes do qual você deseja extrair."
			},
			instanceNum: {
				name: "instance_num",
				detail: "A ocorrência do delimitador antes da qual você deseja extrair o texto."
			},
			matchMode: {
				name: "match_mode",
				detail: "Determina se a pesquisa diferencia maiúsculas de minúsculas. Por padrão, diferencia."
			},
			matchEnd: {
				name: "match_end",
				detail: "Trata o fim do texto como delimitador. Por padrão, o texto deve corresponder exatamente."
			},
			ifNotFound: {
				name: "if_not_found",
				detail: "O valor retornado se nenhuma correspondência for encontrada. Por padrão, retorna #N/D."
			}
		}
	},
	TEXTJOIN: {
		description: "A função UNIRTEXTO combina o texto de vários intervalos e/ou cadeias de caracteres e inclui um delimitador especificado por você entre cada valor de texto que será combinado. Se o delimitador for uma cadeia de caracteres de texto vazia, essa função concatenará efetivamente os intervalos.",
		abstract: "A função UNIRTEXTO combina o texto de vários intervalos e/ou cadeias de caracteres e inclui um delimitador especificado por você entre cada valor de texto que será combinado. Se o delimitador for uma cadeia de caracteres de texto vazia, essa função concatenará efetivamente os intervalos.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/textjoin-function"
		}],
		functionParameter: {
			delimiter: {
				name: "delimiter",
				detail: "Uma cadeia de texto, seja vazia ou com um ou mais caracteres delimitados por aspas duplas, ou uma referência a uma cadeia de texto válida. Se for fornecido um número, ele será tratado como texto."
			},
			ignoreEmpty: {
				name: "ignore_empty",
				detail: "Se VERDADEIRO, ignora as células vazias."
			},
			text1: {
				name: "text1",
				detail: "Item de texto a ser unido. Uma cadeia de texto ou uma matriz de cadeias de caracteres, como um intervalo de células."
			},
			text2: {
				name: "text2",
				detail: "Itens de texto adicionais a serem unidos. Pode haver, no máximo, 252 argumentos de texto para os itens de texto, incluindo texto1 . Cada um pode ser uma cadeia de caracteres ou uma matriz de cadeias de caracteres, como um intervalo de células."
			}
		}
	},
	TEXTSPLIT: {
		description: "A função DIVIDIRTEXTO funciona da mesma forma que o assistente de Texto para Colunas , mas na forma de fórmula. Ele permite dividir entre colunas ou para baixo por linhas. É o inverso da função TEXTJOIN .",
		abstract: "A função DIVIDIRTEXTO funciona da mesma forma que o assistente de Texto para Colunas , mas na forma de fórmula. Ele permite dividir entre colunas ou para baixo por linhas. É o inverso da função TEXTJOIN .",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/textsplit-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "O texto que você deseja dividir. Obrigatório."
			},
			colDelimiter: {
				name: "col_delimiter",
				detail: "O texto que marca o ponto em que o texto é derramado entre colunas."
			},
			rowDelimiter: {
				name: "row_delimiter",
				detail: "O texto que marca o ponto em que o texto é derramado para baixo das linhas. Opcional."
			},
			ignoreEmpty: {
				name: "ignore_empty",
				detail: "Especifique TRUE para ignorar delimitadores consecutivos. O padrão é FALSO, que cria uma célula vazia. Opcional."
			},
			matchMode: {
				name: "match_mode",
				detail: "Especifique 1 para executar uma correspondência sem maiúsculas de maiúsculas de minúsculas. O padrão é 0, que faz uma correspondência que diferencia maiúsculas de minúsculas. Opcional."
			},
			padWith: {
				name: "pad_with",
				detail: "O valor com o qual adicionar o resultado. O padrão é #N/A."
			}
		}
	},
	TRIM: {
		description: "Remove todos os espaços do texto exceto os espaços únicos entre palavras. Use ARRUMAR no texto que recebeu de outro aplicativo que pode ter espaçamento irregular.",
		abstract: "Remove todos os espaços do texto exceto os espaços únicos entre palavras. Use ARRUMAR no texto que recebeu de outro aplicativo que pode ter espaçamento irregular.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/trim-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "O texto do qual você deseja que os espaços sejam removidos. O texto deve ser contido entre aspas."
		} }
	},
	UNICHAR: {
		description: "Retorna o caractere Unicode referenciado pelo determinado valor numérico.",
		abstract: "Retorna o caractere Unicode referenciado pelo determinado valor numérico.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/unichar-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obrigatório. Número é o número Unicode que representa o caractere."
		} }
	},
	UNICODE: {
		description: "Retorna o número (ponto de código) correspondente ao primeiro caractere do texto.",
		abstract: "Retorna o número (ponto de código) correspondente ao primeiro caractere do texto.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/unicode-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Obrigatório. Texto é o caractere para o qual você deseja o valor Unicode."
		} }
	},
	UPPER: {
		description: "Converte o texto em maiúsculas.",
		abstract: "Converte o texto em maiúsculas.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/upper-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Obrigatório. O texto que se deseja converter para maiúsculas. Texto pode ser uma referência ou uma cadeia de texto."
		} }
	},
	VALUE: {
		description: "Converte em um número uma cadeia de texto que representa um número.",
		abstract: "Converte em um número uma cadeia de texto que representa um número.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/value-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Obrigatório. O texto entre aspas ou uma referência a uma célula que contém o texto a ser convertido."
		} }
	},
	VALUETOTEXT: {
		description: "A função VALORPARATEXTO retorna um texto a partir de qualquer valor especificado. Ele passa valores de texto inalterados e converte valores não textuais em texto.",
		abstract: "A função VALORPARATEXTO retorna um texto a partir de qualquer valor especificado. Ele passa valores de texto inalterados e converte valores não textuais em texto.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/valuetotext-function"
		}],
		functionParameter: {
			value: {
				name: "value",
				detail: "O valor para retornar como texto. Obrigatório."
			},
			format: {
				name: "format",
				detail: "O formato dos dados retornados. Opcional. Pode ser um dos dois valores: 0 Padrão. Formato conciso e fácil de ler. O texto retornado será o mesmo que o texto renderizado em uma célula que possui formatação geral aplicada. 1 Formato estrito que inclui caracteres de escape e delimitadores de linha. Gera uma cadeia de caracteres que pode ser analisada quando inserida na barra de fórmulas. Encapsula cadeia de caracteres retornadas entre aspas, exceto para Booleanos, Números e Erros."
			}
		}
	},
	CALL: {
		description: "Chama um procedimento em uma biblioteca de vínculos dinâmicos ou recurso de código. Há duas formas de sintaxe desta função. Use a sintaxe 1 apenas com um recurso de código previamente registrado que use argumentos da função REGISTRO. Use a sintaxe 2a ou 2b para registrar e chamar simultaneamente um recurso de código.",
		abstract: "Chama um procedimento em uma biblioteca de vínculos dinâmicos ou recurso de código. Há duas formas de sintaxe desta função. Use a sintaxe 1 apenas com um recurso de código previamente registrado que use argumentos da função REGISTRO. Use a sintaxe 2a ou 2b para registrar e chamar simultaneamente um recurso de código.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/call-function"
		}],
		functionParameter: {
			moduleText: {
				name: "Module_text",
				detail: "Obrigatório. Texto entre aspas que especifica o nome da DLL (biblioteca de vínculo dinâmico) que contém o procedimento no Microsoft Excel para Windows."
			},
			procedure: {
				name: "Procedimento",
				detail: "Obrigatório. Texto que especifica o nome da função da DLL no Microsoft Excel para Windows. Você também pode usar o valor ordinal da função da instrução EXPORTS do arquivo de definição de módulo (.DEF). O valor ordinal não deve estar em forma de texto."
			},
			typeText: {
				name: "Type_text",
				detail: "Obrigatório. Texto que especifica o tipo de dados do valor de retorno e os tipos de dados de todos os argumentos para a DLL ou o recurso de código. A primeira letra de tipo_texto especifica o valor de retorno. Os códigos usados para tipo_texto encontram-se descritos de forma detalhada em Usando as funções CHAMAR e REGISTRO . No caso de DLLs autônomas ou recursos de código (XLLs), você pode omitir este argumento."
			},
			argument1: {
				name: "Argumento1,...",
				detail: "Opcional. Os argumentos a serem passados ao procedimento."
			}
		}
	},
	EUROCONVERT: {
		description: "Converte um número em euros, converte um número de euros em uma moeda de um membro do euro ou converte um número de uma moeda de um membro do euro em outra moeda usando o euro como intermediário (triangulação). As moedas disponíveis para conversão são aquelas de membros da União Europeia (UE) que adotaram o Euro. A função usa taxas fixas de conversão, estabelecidas pela UE.",
		abstract: "Converte um número em euros, converte um número de euros em uma moeda de um membro do euro ou converte um número de uma moeda de um membro do euro em outra moeda usando o euro como intermediário (triangulação). As moedas disponíveis para conversão são aquelas de membros da União Europeia (UE) que adotaram o Euro. A função usa taxas fixas de conversão, estabelecidas pela UE.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/euroconvert-function"
		}],
		functionParameter: {
			number: {
				name: "Número",
				detail: "Obrigatório. O valor da moeda que você deseja converter ou a referência à célula contendo o valor."
			},
			source: {
				name: "Origem",
				detail: "Obrigatório. Uma cadeia de três letras ou referência à célula contendo a cadeia correspondente ao código ISO para a moeda fonte. Os seguintes códigos de moeda estão disponíveis na função EUROCONVERT:"
			},
			target: {
				name: "Destino",
				detail: "Obrigatório. Uma cadeia de três letras ou referência de célula correspondente ao código ISO da moeda que você deseja converter em número. Consulte a tabela Fonte anterior para os códigos ISO."
			},
			fullPrecision: {
				name: "Full_precision",
				detail: "Obrigatório. Um valor lógico (VERDADEIRO ou FALSO) ou uma expressão que avalia o valor de VERDADEIRO ou FALSO e que especifica como o resultado é mostrado."
			},
			triangulationPrecision: {
				name: "Triangulation_precision",
				detail: "Necessário. Um número inteiro igual ou maior que 3 que especifica o número de dígitos significativos a ser usado para o valor intermediário do euro ao convertê-lo entre as duas moedas de membros do euro. Se você omitir esse argumento, o Excel arredondará o valor intermediário do euro. Se você incluir este argumento ao converter de uma moeda de um membro do euro para o euro, o Excel calcula o valor intermediário do euro que poderia ser convertido para uma moeda de um membro do euro."
			}
		}
	},
	REGISTER_ID: {
		description: "Retorna a identificação de registro da DLL (biblioteca de vínculo dinâmico) especificada ou o recurso de código anteriormente registrado. Se a DLL ou o recurso de código não tiver sido registrado, essa função registrará a DLL ou o recurso de código e retornará a identificação do registro.",
		abstract: "Retorna a identificação de registro da DLL (biblioteca de vínculo dinâmico) especificada ou o recurso de código anteriormente registrado. Se a DLL ou o recurso de código não tiver sido registrado, essa função registrará a DLL ou o recurso de código e retornará a identificação do registro.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/register-id-function"
		}],
		functionParameter: {
			moduleText: {
				name: "Module_text",
				detail: "Obrigatório. O texto que especifica o nome da DLL que contém a função no Microsoft Excel para Windows."
			},
			procedure: {
				name: "Procedimento",
				detail: "Obrigatório. Texto que especifica o nome da função da DLL no Microsoft Excel para Windows. Você também pode usar o valor ordinal da função na instrução EXPORTS no arquivo de definição de módulo (.DEF). O valor ordinal ou o número da identificação do recurso não deve estar na forma de texto."
			},
			typeText: {
				name: "Type_text",
				detail: "Opcional. O texto que especifica o tipo de dados do valor de retorno e os tipos de dados de todos os argumentos para a DLL. A primeira letra de tipo_texto especifica o valor de retorno. Se a função ou o recurso de código já estiver registrado, você poderá omitir esse argumento."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/univer/pt-BR.ts
const locale$2 = {};

//#endregion
//#region src/locale/function-list/web/pt-BR.ts
const locale$1 = {
	ENCODEURL: {
		description: "A função ENCODEURL retorna uma cadeia de caracteres codificada por URL, substituindo determinados caracteres não alfanuméricos pelo símbolo percentual (%) e um número hexadecimal.",
		abstract: "A função ENCODEURL retorna uma cadeia de caracteres codificada por URL, substituindo determinados caracteres não alfanuméricos pelo símbolo percentual (%) e um número hexadecimal.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/encodeurl-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Uma cadeia de caracteres a ser codificada por URL"
		} }
	},
	FILTERXML: {
		description: "A função FILTERXML devolve dados específicos do conteúdo XML com o xpath especificado.",
		abstract: "A função FILTERXML devolve dados específicos do conteúdo XML com o xpath especificado.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/filterxml-function"
		}],
		functionParameter: {
			xml: {
				name: "xml",
				detail: "Uma cadeia no formato XML válido."
			},
			xpath: {
				name: "xpath",
				detail: "Uma cadeia no formato XPath padrão."
			}
		}
	},
	WEBSERVICE: {
		description: "A função WEBSERVICE retorna dados de um serviço Web na Internet ou intranet.",
		abstract: "A função WEBSERVICE retorna dados de um serviço Web na Internet ou intranet.",
		links: [{
			title: "Instruções",
			url: "https://support.microsoft.com/pt-br/excel/functions/webservice-function"
		}],
		functionParameter: { url: {
			name: "url",
			detail: "A URL do serviço Web."
		} }
	}
};

//#endregion
//#region src/locale/pt-BR.ts
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