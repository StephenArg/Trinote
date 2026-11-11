//#region src/locale/function-list/array/fr-FR.ts
const locale$15 = {
	ARRAY_CONSTRAIN: {
		description: "Limite le résultat d'un tableau à une taille donnée.",
		abstract: "Limite le résultat d'un tableau à une taille donnée.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3267036?hl=fr"
		}],
		functionParameter: {
			inputRange: {
				name: "input_range",
				detail: "ARRAY_CONSTRAIN(SORT(A1:F100, 1, TRUE), 10, 6)"
			},
			numRows: {
				name: "num_rows",
				detail: "Le nombre de lignes que le résultat doit contenir."
			},
			numCols: {
				name: "num_cols",
				detail: "Le nombre de colonnes que le résultat doit contenir."
			}
		}
	},
	FLATTEN: {
		description: "Agrège toutes les valeurs d'une ou de plusieurs plages en une seule colonne.",
		abstract: "Agrège toutes les valeurs d'une ou de plusieurs plages en une seule colonne.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/10307761?hl=fr"
		}],
		functionParameter: {
			range1: {
				name: "range1",
				detail: "Première plage à agréger."
			},
			range2: {
				name: "range2",
				detail: "[facultatif] répétable Autres plages à agréger."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/compatibility/fr-FR.ts
const locale$14 = {
	BETADIST: {
		description: "Renvoie la fonction de densité de distribution de la probabilité suivant une loi bêta cumulée. Cette fonction de distribution bêta est généralement utilisée pour étudier la variation du pourcentage d’un élément présent dans des échantillonnages, par exemple, la durée quotidienne pendant laquelle les gens regardent la télévision.",
		abstract: "Renvoie la fonction de densité de distribution de la probabilité suivant une loi bêta cumulée. Cette fonction de distribution bêta est généralement utilisée pour étudier la variation du pourcentage d’un élément présent dans des échantillonnages, par exemple, la durée quotidienne pendant laquelle les gens regardent la télévision.",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/betadist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obligatoire. Représente la valeur comprise entre A et B à laquelle la fonction doit être calculée."
			},
			alpha: {
				name: "alpha",
				detail: "Obligatoire. Représente un paramètre de la distribution."
			},
			beta: {
				name: "beta",
				detail: "Obligatoire. Représente un paramètre de la distribution."
			},
			A: {
				name: "A",
				detail: "Représente une limite inférieure de l’intervalle des x."
			},
			B: {
				name: "B",
				detail: "Facultatif. Représente une limite supérieure de l’intervalle des x."
			}
		}
	},
	BETAINV: {
		description: "Renvoie l’inverse de la fonction de densité de distribution de la probabilité suivant une loi bêta cumulée. Si probabilité = LOI.BETA(x,...), alors BETA.INVERSE(probabilité,...) = x. La distribution bêta peut être utilisée en planification de projets afin de prévoir les dates d’achèvement probables en fonction d’une durée et d’une dispersion prévues.",
		abstract: "Renvoie l’inverse de la fonction de densité de distribution de la probabilité suivant une loi bêta cumulée. Si probabilité = LOI.BETA(x,...), alors BETA.INVERSE(probabilité,...) = x. La distribution bêta peut être utilisée en planification de projets afin de prévoir les dates d’achèvement probables en fonction d’une durée et d’une dispersion prévues.",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/betainv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obligatoire. Représente la probabilité associée à la distribution bêta."
			},
			alpha: {
				name: "alpha",
				detail: "Obligatoire. Représente un paramètre de la distribution."
			},
			beta: {
				name: "beta",
				detail: "Obligatoire. Représente un paramètre de la distribution."
			},
			A: {
				name: "A",
				detail: "Représente une limite inférieure de l’intervalle des x."
			},
			B: {
				name: "B",
				detail: "Facultatif. Représente une limite supérieure de l’intervalle des x."
			}
		}
	},
	BINOMDIST: {
		description: "Renvoie la probabilité d’une variable aléatoire discrète suivant la loi binomiale. Utilisez la fonction LOI.BINOMIALE pour résoudre des problèmes comportant un nombre de tests ou d’essais déterminé, lorsque le résultat des essais ne peut être qu’un succès ou un échec, lorsque les essais sont indépendants ou lorsque la probabilité de succès est constante au cours des expérimentations. La fonction LOI.BINOMIALE peut, par exemple, calculer la probabilité pour que deux des trois enfants à naître soient des garçons.",
		abstract: "Renvoie la probabilité d’une variable aléatoire discrète suivant la loi binomiale. Utilisez la fonction LOI.BINOMIALE pour résoudre des problèmes comportant un nombre de tests ou d’essais déterminé, lorsque le résultat des essais ne peut être qu’un succès ou un échec, lorsque les essais sont indépendants ou lorsque la probabilité de succès est constante au cours des expérimentations. La fonction LOI.BINOMIALE peut, par exemple, calculer la probabilité pour que deux des trois enfants à naître soient des garçons.",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/binomdist-function"
		}],
		functionParameter: {
			numberS: {
				name: "number_s",
				detail: "Obligatoire. Représente le nombre d’essais réussis."
			},
			trials: {
				name: "trials",
				detail: "Obligatoire. Représente le nombre d’essais indépendants."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Obligatoire. Représente la probabilité de succès de chaque essai."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obligatoire. Représente une valeur logique qui détermine le mode de calcul de la fonction. Si l’argument cumulative a la valeur VRAI, alors LOI.BINOMIALE renvoie la fonction de distribution cumulée qui représente la probabilité qu’il y ait au plus nombre_s succès ; si l’argument cumulative a la valeur FAUX, LOI.BINOMIALE renvoie la fonction de probabilité de masse qui représente la probabilité qu’il y ait nombre_s succès."
			}
		}
	},
	CHIDIST: {
		description: "Renvoie la probabilité unilatérale à droite de la distribution khi-deux. La distribution χ2 est associée à un test χ2. Utilisez un test χ2 pour comparer les valeurs obtenues aux valeurs prévues. Par exemple, une expérience génétique fait l’hypothèse que la prochaine génération de plantes présentera un ensemble de couleurs donné. En comparant les résultats obtenus aux résultats prévus, vous pouvez déterminer si votre hypothèse de départ était correcte.",
		abstract: "Renvoie la probabilité unilatérale à droite de la distribution khi-deux. La distribution χ2 est associée à un test χ2. Utilisez un test χ2 pour comparer les valeurs obtenues aux valeurs prévues. Par exemple, une expérience génétique fait l’hypothèse que la prochaine génération de plantes présentera un ensemble de couleurs donné. En comparant les résultats obtenus aux résultats prévus, vous pouvez déterminer si votre hypothèse de départ était correcte.",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/chidist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obligatoire. Représente la valeur à laquelle vous voulez évaluer la distribution."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Obligatoire. Représente le nombre de degrés de liberté."
			}
		}
	},
	CHIINV: {
		description: "Renvoie l’inverse de la probabilité unilatérale à droite de la distribution khi-deux. Si probabilité = LOI.KHIDEUX(x,...), alors KHIDEUX.INVERSE(probabilité,...) = x. Utilisez cette fonction pour comparer les résultats obtenus aux résultats prévus, afin de déterminer si votre hypothèse de départ était juste.",
		abstract: "Renvoie l’inverse de la probabilité unilatérale à droite de la distribution khi-deux. Si probabilité = LOI.KHIDEUX(x,...), alors KHIDEUX.INVERSE(probabilité,...) = x. Utilisez cette fonction pour comparer les résultats obtenus aux résultats prévus, afin de déterminer si votre hypothèse de départ était juste.",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/chiinv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obligatoire. Représente une probabilité associée à la distribution khi-deux."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Obligatoire. Représente le nombre de degrés de liberté."
			}
		}
	},
	CHITEST: {
		description: "Renvoie le test d’indépendance. TEST.KHIDEUX renvoie la valeur de la distribution khi-deux (χ2) pour la statistique et les degrés de liberté appropriés. Utilisez les tests χ2 pour déterminer si les résultats prévus sont vérifiés par une expérimentation.",
		abstract: "Renvoie le test d’indépendance. TEST.KHIDEUX renvoie la valeur de la distribution khi-deux (χ2) pour la statistique et les degrés de liberté appropriés. Utilisez les tests χ2 pour déterminer si les résultats prévus sont vérifiés par une expérimentation.",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/chitest-function"
		}],
		functionParameter: {
			actualRange: {
				name: "actual_range",
				detail: "Obligatoire. Représente la plage de données contenant les observations à comparer aux valeurs prévues."
			},
			expectedRange: {
				name: "expected_range",
				detail: "Obligatoire. Représente la plage de données contenant le rapport du produit des totaux de ligne et de colonne avec le total général."
			}
		}
	},
	CONFIDENCE: {
		description: "Renvoie l’intervalle de confiance pour la moyenne d’une population, à l’aide d’une distribution normale.",
		abstract: "Renvoie l’intervalle de confiance pour la moyenne d’une population, à l’aide d’une distribution normale.",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/confidence-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "Obligatoire. Niveau de précision utilisé pour calculer le niveau de confiance. Le niveau de confiance est égal à 100*(1 - alpha) %, ou en d’autres termes, un alpha de 0,05 indique un niveau de confiance de 95 %."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Obligatoire. Représente l’écart-type de population pour la plage de données ; cet argument est supposé être connu."
			},
			size: {
				name: "size",
				detail: "Obligatoire. Représente la taille de l’échantillon."
			}
		}
	},
	COVAR: {
		description: "Retourne la covariance, la moyenne des produits des écarts pour chaque paire de points de données dans deux jeux de données.",
		abstract: "Retourne la covariance, la moyenne des produits des écarts pour chaque paire de points de données dans deux jeux de données.",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/covar-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Obligatoire. Représente la première plage de cellules de nombres entiers."
			},
			array2: {
				name: "array2",
				detail: "Obligatoire. Représente la seconde plage de cellules de nombres entiers."
			}
		}
	},
	CRITBINOM: {
		description: "Renvoie la plus petite valeur pour laquelle la distribution binomiale cumulée est supérieure ou égale à une valeur de critère. Utilisez cette fonction pour des applications d’assurance qualité. Par exemple, la fonction CRITERE.LOI.BINOMIALE vous permet de déterminer le nombre maximal de pièces défectueuses autorisées à la sortie d’une chaîne d’assemblage sans que le lot entier soit rejeté.",
		abstract: "Renvoie la plus petite valeur pour laquelle la distribution binomiale cumulée est supérieure ou égale à une valeur de critère. Utilisez cette fonction pour des applications d’assurance qualité. Par exemple, la fonction CRITERE.LOI.BINOMIALE vous permet de déterminer le nombre maximal de pièces défectueuses autorisées à la sortie d’une chaîne d’assemblage sans que le lot entier soit rejeté.",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/critbinom-function"
		}],
		functionParameter: {
			trials: {
				name: "trials",
				detail: "Obligatoire. Représente le nombre d’essais de Bernoulli."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Obligatoire. Représente la probabilité de succès de chaque essai."
			},
			alpha: {
				name: "alpha",
				detail: "Obligatoire. Représente la valeur de critère."
			}
		}
	},
	EXPONDIST: {
		description: "Renvoie la distribution exponentielle. Utilisez la fonction LOI.EXPONENTIELLE pour prévoir la durée séparant des événements, tel le temps mis par un distributeur automatique bancaire pour délivrer de l’argent. Par exemple, vous pouvez utiliser LOI.EXPONENTIELLE pour calculer la probabilité que l’opération dure moins d’une minute.",
		abstract: "Renvoie la distribution exponentielle. Utilisez la fonction LOI.EXPONENTIELLE pour prévoir la durée séparant des événements, tel le temps mis par un distributeur automatique bancaire pour délivrer de l’argent. Par exemple, vous pouvez utiliser LOI.EXPONENTIELLE pour calculer la probabilité que l’opération dure moins d’une minute.",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/expondist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obligatoire. Représente la valeur de la fonction."
			},
			lambda: {
				name: "lambda",
				detail: "Obligatoire. Représente la valeur du paramètre."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obligatoire. Valeur logique qui indique la forme de la fonction exponentielle à fournir. Si cumulative a la valeur TRUE, EXPONDIST retourne la fonction de distribution cumulative ; si la valeur est FALSE, elle retourne la fonction de densité de probabilité."
			}
		}
	},
	FDIST: {
		description: "Renvoie la probabilité (unilatérale à droite) d’une variable aléatoire suivant une loi F pour deux jeux de données. Vous pouvez utiliser cette fonction pour déterminer si deux jeux de données ont des degrés de diversité différents. Par exemple, vous pouvez comparer les résultats de tests soumis aux garçons et aux filles à l’entrée à l’université et déterminer si la dispersion parmi les filles est la même que parmi les garçons.",
		abstract: "Renvoie la probabilité (unilatérale à droite) d’une variable aléatoire suivant une loi F pour deux jeux de données. Vous pouvez utiliser cette fonction pour déterminer si deux jeux de données ont des degrés de diversité différents. Par exemple, vous pouvez comparer les résultats de tests soumis aux garçons et aux filles à l’entrée à l’université et déterminer si la dispersion parmi les filles est la même que parmi les garçons.",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/fdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obligatoire. Représente la variable avec laquelle la fonction doit être calculée."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Obligatoire. Représente le numérateur des degrés de liberté."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Obligatoire. Représente le dénominateur des degrés de liberté."
			}
		}
	},
	FINV: {
		description: "Renvoie l’inverse de la distribution de probabilité F (unilatérale à droite). Si p = LOI.F(x,...), alors INVERSE.LOI.F(p,...) = x.",
		abstract: "Renvoie l’inverse de la distribution de probabilité F (unilatérale à droite). Si p = LOI.F(x,...), alors INVERSE.LOI.F(p,...) = x.",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/finv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obligatoire. Représente une probabilité associée à la distribution cumulée F."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Obligatoire. Représente le numérateur des degrés de liberté."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Obligatoire. Représente le dénominateur des degrés de liberté."
			}
		}
	},
	FTEST: {
		description: "Retourne le résultat d’un test F. Un test F renvoie la probabilité bi-tailed que les variances dans array1 et array2 ne soient pas significativement différentes. Utilisez cette fonction pour comparer les variances de deux échantillons. Par exemple, à partir des résultats d’examens dans des écoles publiques et privées, vous pouvez déterminer si ces écoles présentent des degrés de diversité différents en termes de résultats.",
		abstract: "Retourne le résultat d’un test F. Un test F renvoie la probabilité bi-tailed que les variances dans array1 et array2 ne soient pas significativement différentes. Utilisez cette fonction pour comparer les variances de deux échantillons. Par exemple, à partir des résultats d’examens dans des écoles publiques et privées, vous pouvez déterminer si ces écoles présentent des degrés de diversité différents en termes de résultats.",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/ftest-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Obligatoire. Représente la première matrice ou plage de données."
			},
			array2: {
				name: "array2",
				detail: "Obligatoire. Représente la seconde matrice ou plage de données."
			}
		}
	},
	GAMMADIST: {
		description: "Renvoie la probabilité d’une variable aléatoire suivant une loi Gamma. Vous pouvez utiliser cette fonction pour étudier des variables dont la distribution est susceptible d’être asymétrique. La loi gamma est couramment utilisée dans l’étude de files d’attente.",
		abstract: "Renvoie la probabilité d’une variable aléatoire suivant une loi Gamma. Vous pouvez utiliser cette fonction pour étudier des variables dont la distribution est susceptible d’être asymétrique. La loi gamma est couramment utilisée dans l’étude de files d’attente.",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/gammadist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obligatoire. Représente la valeur à laquelle vous voulez évaluer la distribution."
			},
			alpha: {
				name: "alpha",
				detail: "Obligatoire. Représente un paramètre de la distribution."
			},
			beta: {
				name: "beta",
				detail: "Obligatoire. Représente un paramètre de la distribution. Si bêta = 1, LOI.GAMMA renvoie la loi Gamma standard."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obligatoire. Représente une valeur logique déterminant le mode de calcul de la fonction : cumulatif ou non. Si l’argument cumulative est VRAI, la fonction LOI.GAMMA renvoie la fonction de distribution cumulée ; si l’argument cumulative est FAUX, la fonction renvoie la fonction de densité de probabilité."
			}
		}
	},
	GAMMAINV: {
		description: "Renvoie l’inverse de la distribution cumulée suivant une loi Gamma. Si l’argument p = LOI.GAMMA(x;...), la fonction LOI.GAMMA.INVERSE(p;...) = x. Vous pouvez utiliser cette fonction pour étudier une variable dont la distribution est susceptible d’être asymétrique.",
		abstract: "Renvoie l’inverse de la distribution cumulée suivant une loi Gamma. Si l’argument p = LOI.GAMMA(x;...), la fonction LOI.GAMMA.INVERSE(p;...) = x. Vous pouvez utiliser cette fonction pour étudier une variable dont la distribution est susceptible d’être asymétrique.",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/gammainv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obligatoire. Représente la probabilité associée à la loi Gamma."
			},
			alpha: {
				name: "alpha",
				detail: "Obligatoire. Représente un paramètre de la distribution."
			},
			beta: {
				name: "beta",
				detail: "Obligatoire. Représente un paramètre de la distribution. Si bêta = 1, LOI.GAMMA.INVERSE renvoie la loi Gamma standard."
			}
		}
	},
	HYPGEOMDIST: {
		description: "Renvoie la loi hypergéométrique. La fonction LOI.HYPERGEOMETRIQUE renvoie la probabilité d’obtenir un nombre donné de tirages « succès » sur un échantillon, connaissant la taille de l’échantillon, le nombre de succès de la population et sa taille. Utilisez la fonction LOI.HYPERGEOMETRIQUE dans des problèmes supposant une population déterminée, dans lesquels chaque observation est soit un succès, soit un échec et où chaque sous-ensemble d’une taille donnée est constitué avec la même vraisemblance.",
		abstract: "Renvoie la loi hypergéométrique. La fonction LOI.HYPERGEOMETRIQUE renvoie la probabilité d’obtenir un nombre donné de tirages « succès » sur un échantillon, connaissant la taille de l’échantillon, le nombre de succès de la population et sa taille. Utilisez la fonction LOI.HYPERGEOMETRIQUE dans des problèmes supposant une population déterminée, dans lesquels chaque observation est soit un succès, soit un échec et où chaque sous-ensemble d’une taille donnée est constitué avec la même vraisemblance.",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/hypgeomdist-function"
		}],
		functionParameter: {
			sampleS: {
				name: "sample_s",
				detail: "Obligatoire. Représente le nombre de succès de l’échantillon."
			},
			numberSample: {
				name: "number_sample",
				detail: "Obligatoire. Représente la taille de l’échantillon."
			},
			populationS: {
				name: "population_s",
				detail: "Obligatoire. Représente le nombre de succès de la population."
			},
			numberPop: {
				name: "number_pop",
				detail: "Obligatoire. Représente la taille de la population."
			}
		}
	},
	LOGINV: {
		description: "Renvoie l’inverse de la fonction de distribution de x suivant la loi lognormale cumulée, où ln(x) est normalement distribué avec les paramètres espérance et écart_type. Si p = LOI.LOGNORMALE(x;...), alors LOI.LOGNORMALE.INVERSE(p;...) = x.",
		abstract: "Renvoie l’inverse de la fonction de distribution de x suivant la loi lognormale cumulée, où ln(x) est normalement distribué avec les paramètres espérance et écart_type. Si p = LOI.LOGNORMALE(x;...), alors LOI.LOGNORMALE.INVERSE(p;...) = x.",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/loginv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obligatoire. Représente une probabilité associée à la distribution lognormale."
			},
			mean: {
				name: "mean",
				detail: "Obligatoire. Représente l’espérance mathématique de ln(x)."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Obligatoire. Représente l’écart type de ln(x)."
			}
		}
	},
	LOGNORMDIST: {
		description: "Renvoie la distribution de x suivant une loi lognormale cumulée, où ln(x) est normalement distribué à l’aide des paramètres moyenne et écart_type. Cette fonction vous permet d’analyser des données après leur transformation logarithmique.",
		abstract: "Renvoie la distribution de x suivant une loi lognormale cumulée, où ln(x) est normalement distribué à l’aide des paramètres moyenne et écart_type. Cette fonction vous permet d’analyser des données après leur transformation logarithmique.",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/lognormdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obligatoire. Représente la variable avec laquelle la fonction doit être calculée."
			},
			mean: {
				name: "mean",
				detail: "Obligatoire. Représente l’espérance mathématique de ln(x)."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Obligatoire. Représente l’écart type de ln(x)."
			}
		}
	},
	MODE: {
		description: "Supposons que vous souhaitez connaître le nombre d’espèces d’oiseaux les plus courantes observées dans un échantillon de nombre d’oiseaux dans une zone humide critique sur une période de 30 ans, ou que vous souhaitez connaître le nombre d’appels téléphoniques les plus fréquents dans un centre de support téléphonique pendant les heures creuses. Pour calculer le mode d’un groupe de nombres, utilisez la fonction MODE .",
		abstract: "Supposons que vous souhaitez connaître le nombre d’espèces d’oiseaux les plus courantes observées dans un échantillon de nombre d’oiseaux dans une zone humide critique sur une période de 30 ans, ou que vous souhaitez connaître le nombre d’appels téléphoniques les plus fréquents dans un centre de support téléphonique pendant les heures creuses. Pour calculer le mode d’un groupe de nombres, utilisez la fonction MODE .",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/mode-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obligatoire. Représente le premier argument numérique pour lequel vous souhaitez calculer le mode."
			},
			number2: {
				name: "number2",
				detail: "Optionnel. Représente les arguments numériques 2 à 255 dont vous souhaitez déterminer le mode. Vous pouvez également utiliser une matrice unique ou une référence à une matrice, au lieu d’arguments séparés par des points-virgules."
			}
		}
	},
	NEGBINOMDIST: {
		description: "Renvoie la probabilité d’une variable aléatoire discrète suivant une loi binomiale négative. La fonction LOI.BINOMIALE.NEG renvoie la probabilité d’obtenir un nombre d’échecs égal à l’argument nombre_échecs avant de parvenir au succès dont le rang est donné par l’argument nombre_succès, lorsque la probabilité de succès, définie par l’argument probabilité_succès, est constante. Cette fonction est similaire à la loi binomiale, à la différence que le nombre de succès est fixe et le nombre d’essais variable. Comme pour la loi binomiale, les essais sont supposés indépendants.",
		abstract: "Renvoie la probabilité d’une variable aléatoire discrète suivant une loi binomiale négative. La fonction LOI.BINOMIALE.NEG renvoie la probabilité d’obtenir un nombre d’échecs égal à l’argument nombre_échecs avant de parvenir au succès dont le rang est donné par l’argument nombre_succès, lorsque la probabilité de succès, définie par l’argument probabilité_succès, est constante. Cette fonction est similaire à la loi binomiale, à la différence que le nombre de succès est fixe et le nombre d’essais variable. Comme pour la loi binomiale, les essais sont supposés indépendants.",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/negbinomdist-function"
		}],
		functionParameter: {
			numberF: {
				name: "number_f",
				detail: "Obligatoire. Représente le nombre d’échecs."
			},
			numberS: {
				name: "number_s",
				detail: "Obligatoire. Représente le nombre de succès à obtenir."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Obligatoire. Représente la probabilité d’obtenir un succès."
			}
		}
	},
	NORMDIST: {
		description: "La fonction NORMDIST retourne la distribution normale pour la moyenne et l’écart type spécifiés. Cette fonction a un large éventail d’applications en statistiques, y compris les tests d’hypothèses.",
		abstract: "La fonction NORMDIST retourne la distribution normale pour la moyenne et l’écart type spécifiés. Cette fonction a un large éventail d’applications en statistiques, y compris les tests d’hypothèses.",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/normdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obligatoire. Valeur pour laquelle vous souhaitez la distribution"
			},
			mean: {
				name: "mean",
				detail: "Obligatoire. Moyenne arithmétique de la distribution"
			},
			standardDev: {
				name: "standard_dev",
				detail: "Obligatoire. Écart type de la distribution"
			},
			cumulative: {
				name: "cumulative",
				detail: "Obligatoire. Représente une valeur logique déterminant le mode de calcul de la fonction : cumulatif ou non. Si cumulative a la valeur TRUE, NORMDIST retourne la fonction de distribution cumulative ; si cumulative a la valeur FALSE, elle retourne la fonction de probabilité de masse."
			}
		}
	},
	NORMINV: {
		description: "Renvoie, pour une probabilité donnée, la valeur d’une variable aléatoire suivant une loi normale pour la moyenne et l’écart type spécifiés.",
		abstract: "Renvoie, pour une probabilité donnée, la valeur d’une variable aléatoire suivant une loi normale pour la moyenne et l’écart type spécifiés.",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/norminv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obligatoire. Représente une probabilité correspondant à la distribution normale."
			},
			mean: {
				name: "mean",
				detail: "Obligatoire. Représente la moyenne arithmétique de la distribution."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Obligatoire. Représente l’écart type de la distribution."
			}
		}
	},
	NORMSDIST: {
		description: "Renvoie la probabilité d’une variable aléatoire continue suivant une loi normale standard (ou centrée réduite). Cette distribution a une moyenne égale à 0 (zéro) et un écart type égal à 1. La présente fonction remplace l’usage de la table donnant la valeur des aires comprises sous une courbe normale centrée réduite.",
		abstract: "Renvoie la probabilité d’une variable aléatoire continue suivant une loi normale standard (ou centrée réduite). Cette distribution a une moyenne égale à 0 (zéro) et un écart type égal à 1. La présente fonction remplace l’usage de la table donnant la valeur des aires comprises sous une courbe normale centrée réduite.",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/normsdist-function"
		}],
		functionParameter: { z: {
			name: "z",
			detail: "Obligatoire. Représente la valeur dont vous recherchez la distribution."
		} }
	},
	NORMSINV: {
		description: "Renvoie, pour une probabilité donnée, la valeur d’une variable aléatoire suivant une loi normale standard (ou centrée réduite). Cette distribution a une moyenne égale à zéro et un écart type égal à 1.",
		abstract: "Renvoie, pour une probabilité donnée, la valeur d’une variable aléatoire suivant une loi normale standard (ou centrée réduite). Cette distribution a une moyenne égale à zéro et un écart type égal à 1.",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/normsinv-function"
		}],
		functionParameter: { probability: {
			name: "probability",
			detail: "Obligatoire. Représente une probabilité correspondant à la distribution normale."
		} }
	},
	PERCENTILE: {
		description: "Renvoie le k-ième centile des valeurs d’une plage. Cette fonction vous permet de définir un seuil d’acceptation. Par exemple, vous pouvez décider de n’étudier que les candidats ayant obtenu un résultat supérieur au 90e centile.",
		abstract: "Renvoie le k-ième centile des valeurs d’une plage. Cette fonction vous permet de définir un seuil d’acceptation. Par exemple, vous pouvez décider de n’étudier que les candidats ayant obtenu un résultat supérieur au 90e centile.",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/percentile-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Obligatoire. Représente la matrice ou la plage de données définissant l’étendue relative."
			},
			k: {
				name: "k",
				detail: "Obligatoire. Représente le centile ; celui-ci doit être compris entre 0 et 1 inclus."
			}
		}
	},
	PERCENTRANK: {
		description: "La fonction PERCENTRANK retourne le rang d’une valeur dans un jeu de données sous la forme d’un pourcentage du jeu de données, essentiellement le statut relatif d’une valeur dans l’ensemble du jeu de données. Par exemple, vous pouvez utiliser PERCENTRANK pour déterminer la position d’une personne au test dans le champ de toutes les notes du même test.",
		abstract: "La fonction PERCENTRANK retourne le rang d’une valeur dans un jeu de données sous la forme d’un pourcentage du jeu de données, essentiellement le statut relatif d’une valeur dans l’ensemble du jeu de données. Par exemple, vous pouvez utiliser PERCENTRANK pour déterminer la position d’une personne au test dans le champ de toutes les notes du même test.",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/percentrank-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Obligatoire. Plage de données (ou tableau prédéfini) de valeurs numériques dans laquelle le rang en pourcentage est déterminé."
			},
			x: {
				name: "x",
				detail: "Obligatoire. Valeur pour laquelle vous souhaitez connaître le rang dans le tableau."
			},
			significance: {
				name: "significance",
				detail: "Optionnel. Représente une valeur indiquant le nombre de décimales du pourcentage renvoyé. Si cet argument est omis, la fonction RANG.POURCENTAGE conserve trois décimales (0,xxx)."
			}
		}
	},
	POISSON: {
		description: "Renvoie la probabilité d’une variable aléatoire suivant une loi de Poisson. Une application courante de la loi de Poisson est la prédiction du nombre d’événements susceptibles de se produire sur une période de temps déterminée, par exemple, le nombre de voitures qui se présentent à un poste de péage en l’espace d’une minute.",
		abstract: "Renvoie la probabilité d’une variable aléatoire suivant une loi de Poisson. Une application courante de la loi de Poisson est la prédiction du nombre d’événements susceptibles de se produire sur une période de temps déterminée, par exemple, le nombre de voitures qui se présentent à un poste de péage en l’espace d’une minute.",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/poisson-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obligatoire. Représente le nombre d’événements."
			},
			mean: {
				name: "mean",
				detail: "Obligatoire. Représente la valeur numérique attendue."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obligatoire. Valeur logique qui détermine la forme de la distribution de probabilité retournée. Si cumulative a la valeur TRUE, POISSON renvoie la probabilité poisson cumulée que le nombre d’événements aléatoires se produisant soit compris entre zéro et x inclus ; si la valeur est FALSE, elle renvoie la fonction de masse de probabilité de Poisson qui indique que le nombre d’événements qui se produisent sera exactement x."
			}
		}
	},
	QUARTILE: {
		description: "Renvoie le quartile d’une série de données. Les quartiles sont souvent utilisés pour les données relatives aux ventes et aux enquêtes afin de séparer les populations en groupes. Ainsi, vous pouvez utiliser la fonction QUARTILE pour déterminer les vingt-cinq pour cent de revenus les plus élevés d’une population.",
		abstract: "Renvoie le quartile d’une série de données. Les quartiles sont souvent utilisés pour les données relatives aux ventes et aux enquêtes afin de séparer les populations en groupes. Ainsi, vous pouvez utiliser la fonction QUARTILE pour déterminer les vingt-cinq pour cent de revenus les plus élevés d’une population.",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/quartile-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Obligatoire. Représente la matrice ou la plage de cellules de valeurs numériques pour laquelle vous recherchez la valeur du quartile."
			},
			quart: {
				name: "quart",
				detail: "Obligatoire. Indique quelle valeur renvoyer."
			}
		}
	},
	RANK: {
		description: "Renvoie le rang d’un nombre dans une liste d’arguments. Le rang d’un nombre est donné par sa taille comparée aux autres valeurs de la liste. (Si vous deviez trier la liste, le rang d’un nombre serait sa position).",
		abstract: "Renvoie le rang d’un nombre dans une liste d’arguments. Le rang d’un nombre est donné par sa taille comparée aux autres valeurs de la liste. (Si vous deviez trier la liste, le rang d’un nombre serait sa position).",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/rank-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Représente le nombre dont vous voulez connaître le rang."
			},
			ref: {
				name: "ref",
				detail: "Obligatoire. Référence à une liste de nombres. Les valeurs non numériques dans référence sont ignorées."
			},
			order: {
				name: "order",
				detail: "Optionnel. Représente un numéro qui spécifie comment déterminer le rang de l’argument nombre. Si l’argument ordre a la valeur 0 (zéro) ou si cet argument est omis, Microsoft Excel calcule le rang d’un nombre comme si la liste définie par l’argument référence était triée par ordre décroissant. Si la valeur de l’argument ordre est différente de zéro, Microsoft Excel calcule le rang d’un nombre comme si la liste définie par l’argument référence était triée par ordre croissant."
			}
		}
	},
	STDEV: {
		description: "Calcule l’écart type sur la base d’un échantillon. L’écart type mesure la dispersion des valeurs par rapport à la moyenne (valeur moyenne).",
		abstract: "Calcule l’écart type sur la base d’un échantillon. L’écart type mesure la dispersion des valeurs par rapport à la moyenne (valeur moyenne).",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/stdev-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obligatoire. Premier argument numérique correspondant à un échantillon de population."
			},
			number2: {
				name: "number2",
				detail: "Optionnel. Arguments numériques 2 à 255 correspondant à un échantillon de population. Vous pouvez aussi utiliser une matrice ou une référence à une matrice plutôt que des arguments séparés par des points-virgules."
			}
		}
	},
	STDEVP: {
		description: "Calcule l’écart type d’une population à partir de la population entière telle que la déterminent les arguments. L’écart type est une mesure de la dispersion des valeurs par rapport à la moyenne (valeur moyenne).",
		abstract: "Calcule l’écart type d’une population à partir de la population entière telle que la déterminent les arguments. L’écart type est une mesure de la dispersion des valeurs par rapport à la moyenne (valeur moyenne).",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/stdevp-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obligatoire. Premier argument numérique correspondant à une population."
			},
			number2: {
				name: "number2",
				detail: "Optionnel. Arguments numériques 2 à 255 correspondant à une population entière. Vous pouvez aussi utiliser une matrice ou une référence à une matrice plutôt que des arguments séparés par des points-virgules."
			}
		}
	},
	TDIST: {
		description: "Renvoie la probabilité d’une variable aléatoire suivant la loi de t de Student, dans laquelle une valeur numérique (x) est une valeur calculée de t dont il faut calculer la probabilité. La loi de t est utilisée pour les tests d’hypothèse sur des échantillons de petite taille. Utilisez cette fonction au lieu d’une table des valeurs critiques de la loi de t.",
		abstract: "Renvoie la probabilité d’une variable aléatoire suivant la loi de t de Student, dans laquelle une valeur numérique (x) est une valeur calculée de t dont il faut calculer la probabilité. La loi de t est utilisée pour les tests d’hypothèse sur des échantillons de petite taille. Utilisez cette fonction au lieu d’une table des valeurs critiques de la loi de t.",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/tdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obligatoire. Représente la valeur numérique à laquelle la distribution doit être évaluée."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Obligatoire. Représente un nombre entier indiquant le nombre de degrés de liberté."
			},
			tails: {
				name: "tails",
				detail: "Obligatoire. Indique le type de distribution à renvoyer : unilatérale ou bilatérale. Si l’argument uni/bilatéral = 1, la fonction LOI.STUDENT renvoie la distribution unilatérale. Si l’argument uni/bilatéral = 2, la fonction LOI.STUDENT renvoie la distribution bilatérale."
			}
		}
	},
	TINV: {
		description: "Renvoie, pour une probabilité donnée, la valeur inverse bilatérale d’une variable aléatoire suivant une loi T de Student.",
		abstract: "Renvoie, pour une probabilité donnée, la valeur inverse bilatérale d’une variable aléatoire suivant une loi T de Student.",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/tinv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obligatoire. Représente la probabilité associée à la loi bilatérale T de Student."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Obligatoire. Représente le nombre de degrés de liberté utilisés pour caractériser la distribution."
			}
		}
	},
	TTEST: {
		description: "Renvoie la probabilité associée à un test T de Student. Utilisez la fonction TEST.STUDENT pour déterminer dans quelle mesure deux échantillons sont susceptibles de provenir de deux populations sous-jacentes ayant la même moyenne.",
		abstract: "Renvoie la probabilité associée à un test T de Student. Utilisez la fonction TEST.STUDENT pour déterminer dans quelle mesure deux échantillons sont susceptibles de provenir de deux populations sous-jacentes ayant la même moyenne.",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/ttest-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Obligatoire. Représente la première série de données."
			},
			array2: {
				name: "array2",
				detail: "Obligatoire. Représente la seconde série de données."
			},
			tails: {
				name: "tails",
				detail: "Obligatoire. Indique le type de distribution à renvoyer : unilatérale ou bilatérale. Si l’argument uni/bilatéral = 1, la fonction TEST.STUDENT utilise la distribution unilatérale. Si l’argument uni/bilatéral = 2, la fonction TEST.STUDENT utilise la distribution bilatérale."
			},
			type: {
				name: "type",
				detail: "Obligatoire. Représente le type de test T à effectuer."
			}
		}
	},
	VAR: {
		description: "Calcule la variance sur la base d’un échantillon.",
		abstract: "Calcule la variance sur la base d’un échantillon.",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/var-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obligatoire. Premier argument numérique correspondant à un échantillon de population."
			},
			number2: {
				name: "number2",
				detail: "Optionnel. Arguments numériques 2 à 255 correspondant à un échantillon de population."
			}
		}
	},
	VARP: {
		description: "Calcule la variance sur la base de l’ensemble de la population.",
		abstract: "Calcule la variance sur la base de l’ensemble de la population.",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/varp-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obligatoire. Premier argument numérique correspondant à une population."
			},
			number2: {
				name: "number2",
				detail: "Optionnel. Arguments numériques 2 à 255 correspondant à une population entière."
			}
		}
	},
	WEIBULL: {
		description: "Renvoie la probabilité d’une variable aléatoire suivant une loi Weibull. Utilisez cette distribution dans une analyse de fiabilité telle que le calcul du temps moyen de fonctionnement sans panne d’un appareil.",
		abstract: "Renvoie la probabilité d’une variable aléatoire suivant une loi Weibull. Utilisez cette distribution dans une analyse de fiabilité telle que le calcul du temps moyen de fonctionnement sans panne d’un appareil.",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/weibull-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obligatoire. Représente la variable avec laquelle la fonction doit être calculée."
			},
			alpha: {
				name: "alpha",
				detail: "Obligatoire. Représente un paramètre de la distribution."
			},
			beta: {
				name: "beta",
				detail: "Obligatoire. Représente un paramètre de la distribution."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obligatoire. Détermine la forme de la fonction."
			}
		}
	},
	ZTEST: {
		description: "Renvoie la valeur-probabilité unilatérale d’un test z. Pour une moyenne de population supposée donnée, μ0, TEST.Z renvoie la probabilité que la moyenne d’échantillonnage soit supérieure à la moyenne des observations dans l’ensemble de données (matrice), à savoir la moyenne d’échantillonnage observée.",
		abstract: "Renvoie la valeur-probabilité unilatérale d’un test z. Pour une moyenne de population supposée donnée, μ0, TEST.Z renvoie la probabilité que la moyenne d’échantillonnage soit supérieure à la moyenne des observations dans l’ensemble de données (matrice), à savoir la moyenne d’échantillonnage observée.",
		links: [{
			title: "Instructions",
			url: "https://support.microsoft.com/fr-fr/excel/functions/ztest-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Obligatoire. Représente la matrice ou la plage de données par rapport à laquelle tester x."
			},
			x: {
				name: "x",
				detail: "Obligatoire. Représente la valeur à tester."
			},
			sigma: {
				name: "sigma",
				detail: "Optionnel. Représente l’écart type (connu) de la population. Si l’argument est omis, la valeur de l’argument par défaut est l’écart type de l’échantillon."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/cube/fr-FR.ts
const locale$13 = {
	CUBEKPIMEMBER: {
		description: "Renvoie une propriété d’indicateur de performance clé et affiche le nom de l’indicateur dans la cellule. Un indicateur de performance clé est une mesure quantifiable, telle que la marge bénéficiaire brute mensuelle ou la rotation trimestrielle du personnel, utilisée pour évaluer les performances d’une entreprise.",
		abstract: "Renvoie une propriété d’indicateur de performance clé et affiche le nom de l’indicateur dans la cellule. Un indicateur de performance clé est une mesure quantifiable, telle que la marge bénéficiaire brute mensuelle ou la rotation trimestrielle du personnel, utilisée pour évaluer les performances d’une entreprise.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/cubekpimember-function"
		}],
		functionParameter: {
			connection: {
				name: "Connexion",
				detail: "Obligatoire. Chaîne de texte qui représente le nom de la connexion au cube."
			},
			kpiName: {
				name: "Kpi_name",
				detail: "Obligatoire. Chaîne de texte qui représente le nom de l’indicateur de performance clé dans le cube."
			},
			kpiProperty: {
				name: "Kpi_property",
				detail: "Obligatoire. Le composant d’indicateur de performance clé retourné et peut être l’un des éléments suivants :"
			},
			caption: {
				name: "Légende",
				detail: "Optionnel. Chaîne de texte alternative affichée dans la cellule à la place de nom_icp et propriété_icp."
			}
		}
	},
	CUBEMEMBER: {
		description: "Renvoie un membre ou un tuple du cube. Utilisez cette fonction pour valider l’existence du membre ou du tuple dans le cube.",
		abstract: "Renvoie un membre ou un tuple du cube. Utilisez cette fonction pour valider l’existence du membre ou du tuple dans le cube.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/cubemember-function"
		}],
		functionParameter: {
			connection: {
				name: "Connexion",
				detail: "Obligatoire. Chaîne de texte qui représente le nom de la connexion au cube."
			},
			memberExpression: {
				name: "Member_expression",
				detail: "Obligatoire. Chaîne de texte d’une expression multidimensionnelle (MDX) qui indique un membre du cube. Cet argument peut également être un tuple, spécifié en tant que plage de cellules ou de constante matricielle."
			},
			caption: {
				name: "Légende",
				detail: "Optionnel. Chaîne de texte affichée dans la cellule à la place de la légende provenant du cube, si celle-ci est définie. Lorsqu’un tuple est renvoyé, la légende utilisée est celle du dernier membre dans le tuple."
			}
		}
	},
	CUBEMEMBERPROPERTY: {
		description: "La fonction CUBEMEMBERPROPERTY , l’une des fonctions Cube dans Excel, retourne la valeur d’une propriété membre à partir d’un cube. Utilisez cette fonction pour valider l’existence d’un nom de membre dans le cube et pour renvoyer la propriété spécifiée pour ce membre.",
		abstract: "La fonction CUBEMEMBERPROPERTY , l’une des fonctions Cube dans Excel, retourne la valeur d’une propriété membre à partir d’un cube. Utilisez cette fonction pour valider l’existence d’un nom de membre dans le cube et pour renvoyer la propriété spécifiée pour ce membre.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/cubememberproperty-function"
		}],
		functionParameter: {
			connection: {
				name: "Connexion",
				detail: "Obligatoire. Chaîne de texte qui représente le nom de la connexion au cube."
			},
			memberExpression: {
				name: "Member_expression",
				detail: "Obligatoire. Chaîne de texte d’une expression multidimensionnelle (MDX) d’un membre dans le cube."
			},
			property: {
				name: "Propriété",
				detail: "Obligatoire. Chaîne de texte qui représente le nom de la propriété renvoyée ou une référence à une cellule qui contient le nom de la propriété."
			}
		}
	},
	CUBERANKEDMEMBER: {
		description: "Renvoie le nième membre ou le membre placé à un certain rang dans un ensemble. Utilisez cette fonction pour renvoyer un ou plusieurs éléments d’un ensemble, tels que les meilleurs vendeurs ou les 10 meilleurs étudiants.",
		abstract: "Renvoie le nième membre ou le membre placé à un certain rang dans un ensemble. Utilisez cette fonction pour renvoyer un ou plusieurs éléments d’un ensemble, tels que les meilleurs vendeurs ou les 10 meilleurs étudiants.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/cuberankedmember-function"
		}],
		functionParameter: {
			connection: {
				name: "Connexion",
				detail: "Obligatoire. Chaîne de texte qui représente le nom de la connexion au cube."
			},
			setExpression: {
				name: "Set_expression",
				detail: "Obligatoire. Chaîne de texte qui représente une expression définie, telle que \"{[Élément1].enfants}\". L’argument expression_données peut également être la fonction JEUCUBE ou une référence à une cellule contenant la fonction JEUCUBE."
			},
			rank: {
				name: "Rang",
				detail: "Obligatoire. Représente une valeur entière spécifiant la valeur supérieure. Si la valeur du rang est 1, la valeur supérieure est renvoyée, si la valeur du rang est 2, la valeur venant en second après la valeur supérieure est renvoyée, et ainsi de suite. Pour renvoyer les 5 valeurs supérieures, utilisez RANGMEMBRECUBE cinq fois, en spécifiant à chaque fois un rang différent, de 1 à 5."
			},
			caption: {
				name: "Légende",
				detail: "Optionnel. Chaîne de texte affichée dans la cellule à la place de la légende provenant du cube, si celle-ci est définie."
			}
		}
	},
	CUBESET: {
		description: "Définit un ensemble calculé de membres ou de tuples en envoyant une expression définie au cube sur le serveur qui crée l’ensemble et le renvoie à Microsoft Excel.",
		abstract: "Définit un ensemble calculé de membres ou de tuples en envoyant une expression définie au cube sur le serveur qui crée l’ensemble et le renvoie à Microsoft Excel.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/cubeset-function"
		}],
		functionParameter: {
			connection: {
				name: "Connexion",
				detail: "Obligatoire. Chaîne de texte qui représente le nom de la connexion au cube."
			},
			setExpression: {
				name: "Set_expression",
				detail: "Obligatoire. Chaîne de texte qui représente une expression de données qui produit un ensemble de membres ou de tuples. Cet argument peut également être une référence de cellule renvoyant à une plage Excel qui contient un ou plusieurs membres, tuples ou ensembles inclus dans l’ensemble."
			},
			caption: {
				name: "Légende",
				detail: "Optionnel. Chaîne de texte affichée dans la cellule à la place de la légende provenant du cube, si celle-ci est définie."
			},
			sortOrder: {
				name: "Sort_order",
				detail: "Optionnel. Représente le type de tri, le cas échéant, à effectuer et peut être ce qui suit :"
			},
			sortBy: {
				name: "Sort_by",
				detail: "Optionnel. Chaîne de texte de la valeur par laquelle trier. Par exemple, pour obtenir la ville avec les ventes les plus élevées, set_expression serait un ensemble de villes, et sort_by serait la mesure des ventes. Ou, pour obtenir la ville avec la population la plus élevée, set_expression serait un ensemble de villes, et sort_by serait la mesure de la population. Si sort_order nécessite sort_by et que sort_by est omis, CUBESET renvoie la #VALUE ! est renvoyé."
			}
		}
	},
	CUBESETCOUNT: {
		description: "Renvoie le nombre d’éléments dans un ensemble.",
		abstract: "Renvoie le nombre d’éléments dans un ensemble.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/cubesetcount-function"
		}],
		functionParameter: { set: {
			name: "Ensemble",
			detail: "Obligatoire. Chaîne de texte qui représente une expression Microsoft Excel qui indique un ensemble défini par la fonction JEUCUBE. L’argument ensemble peut également être la fonction JEUCUBE ou une référence à une cellule qui contient la fonction JEUCUBE."
		} }
	},
	CUBEVALUE: {
		description: "Renvoie une valeur d’agrégation issue du cube.",
		abstract: "Renvoie une valeur d’agrégation issue du cube.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/cubevalue-function"
		}],
		functionParameter: {
			connection: {
				name: "Connexion",
				detail: "Obligatoire. Chaîne de texte qui représente le nom de la connexion au cube."
			},
			memberExpression: {
				name: "Member_expression",
				detail: "Optionnel. Chaîne de texte qui représente une expression multidimensionnelle (MDX) qui indique un membre ou un tuple dans le cube. L’argument expression_membre peut également être un ensemble défini avec la fonction JEUCUBE. Utilisez l’argument expression_membre comme délimiteur pour définir la partie du cube pour laquelle la valeur d’agrégation est renvoyée. Si aucune mesure n’est spécifiée dans l’argument expression_membre, la mesure par défaut pour ce cube est utilisée."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/database/fr-FR.ts
const locale$12 = {
	DAVERAGE: {
		description: "Calcule la moyenne des valeurs d’un champ (colonne) d’enregistrements dans une liste ou une base de données qui remplissent les conditions spécifiées.",
		abstract: "Calcule la moyenne des valeurs d’un champ (colonne) d’enregistrements dans une liste ou une base de données qui remplissent les conditions spécifiées.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/daverage-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "est la plage de cellules qui compose la liste ou la base de données. Une base de données est une liste de données liées dans laquelle les lignes d’informations liées sont des enregistrements et les colonnes de données sont des champs. La première ligne de la liste contient les étiquettes de chaque colonne."
			},
			field: {
				name: "field",
				detail: "indique la colonne utilisée dans la fonction . Entrez l’étiquette de la colonne placée entre guillemets doubles, par exemple \"Âge\" ou \"Rendement\", ou un nombre (sans guillemets) représentant la position de la colonne dans la liste : 1 pour la première colonne, 2 pour la seconde, et ainsi de suite."
			},
			criteria: {
				name: "criteria",
				detail: "est la plage de cellules qui contient les conditions que vous spécifiez. Vous pouvez utiliser n’importe quelle plage comme argument critères, à condition toutefois qu’elle comprenne au moins une étiquette de colonne et au moins une cellule sous celle-ci dans laquelle vous spécifiez une condition pour la colonne."
			}
		}
	},
	DCOUNT: {
		description: "Compte les cellules d’un champ (colonne) d’enregistrements d’une liste ou d’une base de données qui contiennent des nombres répondant aux conditions spécifiées.",
		abstract: "Compte les cellules d’un champ (colonne) d’enregistrements d’une liste ou d’une base de données qui contiennent des nombres répondant aux conditions spécifiées.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/dcount-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Obligatoire. Représente la plage de cellules qui constitue la liste ou la base de données. Une base de données est une liste de données liées dans laquelle les lignes d’informations liées sont des enregistrements et les colonnes de données sont des champs. La première ligne de la liste contient les étiquettes de chaque colonne."
			},
			field: {
				name: "field",
				detail: "Obligatoire. Indique la colonne utilisée dans la fonction. Entrez l’étiquette de la colonne placée entre guillemets doubles, par exemple \"Âge\" ou \"Rendement\", ou un nombre (sans guillemets) représentant la position de la colonne dans la liste : 1 pour la première colonne, 2 pour la seconde, et ainsi de suite."
			},
			criteria: {
				name: "criteria",
				detail: "Obligatoire. Représente la plage de cellules qui contient les conditions spécifiées. Vous pouvez utiliser n’importe quelle plage comme argument critères, à condition toutefois que celui-ci comprenne au moins une étiquette de colonne et au moins une cellule sous celle-ci dans laquelle vous spécifiez une condition pour la colonne."
			}
		}
	},
	DCOUNTA: {
		description: "Compte les cellules non vides dans un champ (colonne) d’enregistrements d’une liste ou d’une base de données qui remplissent les conditions que vous spécifiez.",
		abstract: "Compte les cellules non vides dans un champ (colonne) d’enregistrements d’une liste ou d’une base de données qui remplissent les conditions que vous spécifiez.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/dcounta-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Obligatoire. Représente la plage de cellules qui constitue la liste ou la base de données. Une base de données est une liste de données liées dans laquelle les lignes d’informations liées sont des enregistrements et les colonnes de données sont des champs. La première ligne de la liste contient les étiquettes de chaque colonne."
			},
			field: {
				name: "field",
				detail: "Optionnel. Indique la colonne utilisée dans la fonction. Entrez l’étiquette de la colonne placée entre guillemets doubles, par exemple \"Âge\" ou \"Rendement\", ou un nombre (sans guillemets) représentant la position de la colonne dans la liste : 1 pour la première colonne, 2 pour la seconde, et ainsi de suite."
			},
			criteria: {
				name: "criteria",
				detail: "Obligatoire. Représente la plage de cellules qui contient les conditions que vous spécifiez. Vous pouvez utiliser n’importe quelle plage comme argument critères, à condition toutefois qu’elle comprenne au moins une étiquette de colonne et au moins une cellule sous celle-ci dans laquelle vous spécifiez une condition pour la colonne."
			}
		}
	},
	DGET: {
		description: "Extrait une seule valeur répondant aux conditions spécifiées à partir d’une colonne d’une liste ou d’une base de données.",
		abstract: "Extrait une seule valeur répondant aux conditions spécifiées à partir d’une colonne d’une liste ou d’une base de données.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/dget-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Obligatoire. Représente la plage de cellules qui constitue la liste ou la base de données. Une base de données est une liste de données liées dans laquelle les lignes d’informations liées sont des enregistrements et les colonnes de données sont des champs. La première ligne de la liste contient les étiquettes de chaque colonne."
			},
			field: {
				name: "field",
				detail: "Obligatoire. Indique la colonne utilisée dans la fonction. Entrez l’étiquette de la colonne placée entre guillemets doubles, par exemple \"Âge\" ou \"Rendement\", ou un nombre (sans guillemets) représentant la position de la colonne dans la liste : 1 pour la première colonne, 2 pour la seconde, et ainsi de suite."
			},
			criteria: {
				name: "criteria",
				detail: "Obligatoire. Représente la plage de cellules qui contient les conditions que vous spécifiez. Vous pouvez utiliser n’importe quelle plage comme argument critères, à condition toutefois qu’elle comprenne au moins une étiquette de colonne et au moins une cellule sous celle-ci dans laquelle vous spécifiez une condition pour la colonne."
			}
		}
	},
	DMAX: {
		description: "Renvoie le plus grand nombre dans un champ (colonne) d’enregistrements d’une liste ou d’une base de données qui remplissent les conditions que vous spécifiez.",
		abstract: "Renvoie le plus grand nombre dans un champ (colonne) d’enregistrements d’une liste ou d’une base de données qui remplissent les conditions que vous spécifiez.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/dmax-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Obligatoire. Représente la plage de cellules qui constitue la liste ou la base de données. Une base de données est une liste de données liées dans laquelle les lignes d’informations liées sont des enregistrements et les colonnes de données sont des champs. La première ligne de la liste contient les étiquettes de chaque colonne."
			},
			field: {
				name: "field",
				detail: "Obligatoire. Indique la colonne utilisée dans la fonction. Entrez l’étiquette de la colonne placée entre guillemets doubles, par exemple \"Âge\" ou \"Rendement\", ou un nombre (sans guillemets) représentant la position de la colonne dans la liste : 1 pour la première colonne, 2 pour la seconde, et ainsi de suite."
			},
			criteria: {
				name: "criteria",
				detail: "Obligatoire. Représente la plage de cellules qui contient les conditions que vous spécifiez. Vous pouvez utiliser n’importe quelle plage comme argument critères, à condition toutefois qu’elle comprenne au moins une étiquette de colonne et au moins une cellule sous celle-ci dans laquelle vous spécifiez une condition pour la colonne."
			}
		}
	},
	DMIN: {
		description: "Renvoie le plus petit nombre dans un champ (colonne) d’enregistrements d’une liste ou d’une base de données qui remplissent les conditions que vous spécifiez.",
		abstract: "Renvoie le plus petit nombre dans un champ (colonne) d’enregistrements d’une liste ou d’une base de données qui remplissent les conditions que vous spécifiez.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/dmin-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Obligatoire. Représente la plage de cellules qui constitue la liste ou la base de données. Une base de données est une liste de données liées dans laquelle les lignes d’informations liées sont des enregistrements et les colonnes de données sont des champs. La première ligne de la liste contient les étiquettes de chaque colonne."
			},
			field: {
				name: "field",
				detail: "Obligatoire. Indique la colonne utilisée dans la fonction. Entrez l’étiquette de la colonne placée entre guillemets doubles, par exemple \"Âge\" ou \"Rendement\", ou un nombre (sans guillemets) représentant la position de la colonne dans la liste : 1 pour la première colonne, 2 pour la seconde, et ainsi de suite."
			},
			criteria: {
				name: "criteria",
				detail: "Obligatoire. Représente la plage de cellules qui contient les conditions que vous spécifiez. Vous pouvez utiliser n’importe quelle plage comme argument critères, à condition toutefois qu’elle comprenne au moins une étiquette de colonne et au moins une cellule sous celle-ci dans laquelle vous spécifiez une condition pour la colonne."
			}
		}
	},
	DPRODUCT: {
		description: "Multiplie les valeurs d’un champ (colonne) d’enregistrements dans une liste ou une base de données qui remplissent les conditions spécifiées.",
		abstract: "Multiplie les valeurs d’un champ (colonne) d’enregistrements dans une liste ou une base de données qui remplissent les conditions spécifiées.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/dproduct-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Obligatoire. Représente la plage de cellules qui constitue la liste ou la base de données. Une base de données est une liste de données liées dans laquelle les lignes d’informations liées sont des enregistrements et les colonnes de données sont des champs. La première ligne de la liste contient les étiquettes de chaque colonne."
			},
			field: {
				name: "field",
				detail: "Obligatoire. Indique la colonne utilisée dans la fonction. Entrez l’étiquette de la colonne placée entre guillemets doubles, par exemple \"Âge\" ou \"Rendement\", ou un nombre (sans guillemets) représentant la position de la colonne dans la liste : 1 pour la première colonne, 2 pour la seconde, et ainsi de suite."
			},
			criteria: {
				name: "criteria",
				detail: "Obligatoire. Représente la plage de cellules qui contient les conditions que vous spécifiez. Vous pouvez utiliser n’importe quelle plage comme argument critères, à condition toutefois qu’elle comprenne au moins une étiquette de colonne et au moins une cellule sous celle-ci dans laquelle vous spécifiez une condition pour la colonne."
			}
		}
	},
	DSTDEV: {
		description: "Calcule l’écart-type standard d’une population sur la base d’un échantillon en utilisant les valeurs contenues dans un champ (colonne) d’enregistrements d’une liste ou d’une base de données qui remplissent les conditions spécifiées.",
		abstract: "Calcule l’écart-type standard d’une population sur la base d’un échantillon en utilisant les valeurs contenues dans un champ (colonne) d’enregistrements d’une liste ou d’une base de données qui remplissent les conditions spécifiées.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/dstdev-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Obligatoire. Représente la plage de cellules qui constitue la liste ou la base de données. Une base de données est une liste de données liées dans laquelle les lignes d’informations liées sont des enregistrements et les colonnes de données sont des champs. La première ligne de la liste contient les étiquettes de chaque colonne."
			},
			field: {
				name: "field",
				detail: "Obligatoire. Indique la colonne utilisée dans la fonction. Entrez l’étiquette de la colonne placée entre guillemets doubles, par exemple \"Âge\" ou \"Rendement\", ou un nombre (sans guillemets) représentant la position de la colonne dans la liste : 1 pour la première colonne, 2 pour la seconde, et ainsi de suite."
			},
			criteria: {
				name: "criteria",
				detail: "Obligatoire. Représente la plage de cellules qui contient les conditions que vous spécifiez. Vous pouvez utiliser n’importe quelle plage comme argument critères, à condition toutefois qu’elle comprenne au moins une étiquette de colonne et au moins une cellule sous celle-ci dans laquelle vous spécifiez une condition pour la colonne."
			}
		}
	},
	DSTDEVP: {
		description: "Calcule l’écart-type standard d’une population en prenant en compte toute la population et en utilisant les valeurs contenues dans un champ (colonne) d’enregistrements d’une liste ou d’une base de données qui remplissent les conditions spécifiées.",
		abstract: "Calcule l’écart-type standard d’une population en prenant en compte toute la population et en utilisant les valeurs contenues dans un champ (colonne) d’enregistrements d’une liste ou d’une base de données qui remplissent les conditions spécifiées.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/dstdevp-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Obligatoire. Représente la plage de cellules qui constitue la liste ou la base de données. Une base de données est une liste de données liées dans laquelle les lignes d’informations liées sont des enregistrements et les colonnes de données sont des champs. La première ligne de la liste contient les étiquettes de chaque colonne."
			},
			field: {
				name: "field",
				detail: "Obligatoire. Indique la colonne utilisée dans la fonction. Entrez l’étiquette de la colonne placée entre guillemets doubles, par exemple \"Âge\" ou \"Rendement\", ou un nombre (sans guillemets) représentant la position de la colonne dans la liste : 1 pour la première colonne, 2 pour la seconde, et ainsi de suite."
			},
			criteria: {
				name: "criteria",
				detail: "Obligatoire. Représente la plage de cellules qui contient les conditions que vous spécifiez. Vous pouvez utiliser n’importe quelle plage comme argument critères, à condition toutefois qu’elle comprenne au moins une étiquette de colonne et au moins une cellule sous celle-ci dans laquelle vous spécifiez une condition pour la colonne."
			}
		}
	},
	DSUM: {
		description: "Dans une liste ou une base de données, DSUM fournit la somme des nombres dans les champs (colonnes) des enregistrements qui correspondent à vos conditions spécifiées.",
		abstract: "Dans une liste ou une base de données, DSUM fournit la somme des nombres dans les champs (colonnes) des enregistrements qui correspondent à vos conditions spécifiées.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/dsum-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Obligatoire. Il s’agit de la plage de cellules qui compose la liste ou la base de données. Une base de données est une liste de données associées dans laquelle les lignes d’informations associées sont des enregistrements et les colonnes de données sont des champs . La première ligne d’une liste contient des étiquettes pour chaque colonne qui s’y trouve."
			},
			field: {
				name: "field",
				detail: "Obligatoire. Cela spécifie la colonne utilisée dans la fonction . Spécifiez l’étiquette de colonne entre guillemets doubles, par exemple « Âge » ou « Rendement ». Vous pouvez également spécifier un nombre (sans guillemets) qui représente la position de la colonne dans la liste : par exemple, 1 pour la première colonne, 2 pour la deuxième colonne, etc."
			},
			criteria: {
				name: "criteria",
				detail: "Obligatoire. Il s’agit de la plage de cellules qui contient les conditions que vous spécifiez. Vous pouvez utiliser n’importe quelle plage comme argument critères, à condition toutefois qu’elle comprenne au moins une étiquette de colonne et au moins une cellule sous celle-ci dans laquelle vous spécifiez une condition pour la colonne."
			}
		}
	},
	DVAR: {
		description: "Calcule la variance d’une population sur la base d’un échantillon en utilisant les valeurs contenues dans un champ (colonne) d’enregistrements d’une liste ou d’une base de données qui remplissent les conditions spécifiées.",
		abstract: "Calcule la variance d’une population sur la base d’un échantillon en utilisant les valeurs contenues dans un champ (colonne) d’enregistrements d’une liste ou d’une base de données qui remplissent les conditions spécifiées.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/dvar-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Obligatoire. Représente la plage de cellules qui constitue la liste ou la base de données. Une base de données est une liste de données liées dans laquelle les lignes d’informations liées sont des enregistrements et les colonnes de données sont des champs. La première ligne de la liste contient les étiquettes de chaque colonne."
			},
			field: {
				name: "field",
				detail: "Obligatoire. Indique la colonne utilisée dans la fonction. Entrez l’étiquette de la colonne placée entre guillemets doubles, par exemple \"Âge\" ou \"Rendement\", ou un nombre (sans guillemets) représentant la position de la colonne dans la liste : 1 pour la première colonne, 2 pour la seconde, et ainsi de suite."
			},
			criteria: {
				name: "criteria",
				detail: "Obligatoire. Représente la plage de cellules qui contient les conditions que vous spécifiez. Vous pouvez utiliser n’importe quelle plage comme argument critères, à condition toutefois qu’elle comprenne au moins une étiquette de colonne et au moins une cellule sous celle-ci dans laquelle vous spécifiez une condition pour la colonne."
			}
		}
	},
	DVARP: {
		description: "Calcule la variance d’une population en prenant en compte toute la population et en utilisant les valeurs contenues dans un champ (colonne) d’enregistrements d’une liste ou d’une base de données qui remplissent les conditions spécifiées.",
		abstract: "Calcule la variance d’une population en prenant en compte toute la population et en utilisant les valeurs contenues dans un champ (colonne) d’enregistrements d’une liste ou d’une base de données qui remplissent les conditions spécifiées.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/dvarp-function"
		}],
		functionParameter: {
			database: {
				name: "database",
				detail: "Obligatoire. Représente la plage de cellules qui constitue la liste ou la base de données. Une base de données est une liste de données liées dans laquelle les lignes d’informations liées sont des enregistrements et les colonnes de données sont des champs. La première ligne de la liste contient les étiquettes de chaque colonne."
			},
			field: {
				name: "field",
				detail: "Obligatoire. Indique la colonne utilisée dans la fonction. Entrez l’étiquette de la colonne placée entre guillemets doubles, par exemple \"Âge\" ou \"Rendement\", ou un nombre (sans guillemets) représentant la position de la colonne dans la liste : 1 pour la première colonne, 2 pour la seconde, et ainsi de suite."
			},
			criteria: {
				name: "criteria",
				detail: "Obligatoire. Représente la plage de cellules qui contient les conditions que vous spécifiez. Vous pouvez utiliser n’importe quelle plage comme argument critères, à condition toutefois qu’elle comprenne au moins une étiquette de colonne et au moins une cellule sous celle-ci dans laquelle vous spécifiez une condition pour la colonne."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/date/fr-FR.ts
const locale$11 = {
	DATE: {
		description: "La fonction DATE renvoie le numéro de série séquentiel qui représente une date particulière.",
		abstract: "La fonction DATE renvoie le numéro de série séquentiel qui représente une date particulière.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/date-function"
		}],
		functionParameter: {
			year: {
				name: "year",
				detail: "La valeur de l’argument year peut comporter de un à quatre chiffres. Excel interprète year selon le système de dates utilisé par votre ordinateur. Par défaut, Univer utilise le système de dates 1900, dont la première date est le 1er janvier 1900."
			},
			month: {
				name: "month",
				detail: "Un entier positif ou négatif représentant le mois de l’année de 1 à 12 (janvier à décembre)."
			},
			day: {
				name: "day",
				detail: "Un entier positif ou négatif représentant le jour du mois de 1 à 31."
			}
		}
	},
	DATEDIF: {
		description: "Calcule le nombre de jours, de mois ou d’années qui séparent deux dates.",
		abstract: "Calcule le nombre de jours, de mois ou d’années qui séparent deux dates.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/datedif-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Date qui représente la première ou la date de début d’une période donnée. Les dates doivent être entrées sous forme de chaînes de texte placées entre guillemets (par exemple, « 30/01/2001 »), comme numéros de série (par exemple, 36921, qui représente le 30 janvier 2001, si vous utilisez le calendrier depuis 1900) ou sous forme de résultat d’autres formules ou fonctions (par exemple, DATEVAL(\"30/01/2001\"))."
			},
			endDate: {
				name: "end_date",
				detail: "Date qui représente la dernière date ou la date de fin de la période."
			},
			unit: {
				name: "unité",
				detail: "Type d’informations que vous souhaitez renvoyer, où : Unit****Returns \" Y \"Le nombre d’années complètes dans la période. » M « Nombre de mois complets dans la période . » D « Nombre de jours de la période ». MD : différence entre les jours en start_date et en end_date. Les mois et les années des dates sont ignorés. Important: Nous vous déconseillons d’utiliser l’argument « MD », car il comporte des limitations connues. Consultez la section problèmes connus ci-dessous. » YM \"Différence entre les mois en start_date et end_date. Les jours et les années des dates sont ignorés\" YD \"Différence entre les jours de start_date et end_date. Les années des dates sont ignorées."
			}
		}
	},
	DATEVALUE: {
		description: "La fonction DATEVAL convertit une date stockée sous forme de texte en numéro de série reconnu par Excel comme une date. Par exemple, la formule =DATEVAL(\"1/1/2008\") renvoie 39448, le numéro de série de la date 1/1/2008. Souvenez-vous toutefois que le paramètre de date système de votre ordinateur peut faire en sorte que les résultats d’une fonction DATEVAL diffèrent de cet exemple.",
		abstract: "La fonction DATEVAL convertit une date stockée sous forme de texte en numéro de série reconnu par Excel comme une date. Par exemple, la formule =DATEVAL(\"1/1/2008\") renvoie 39448, le numéro de série de la date 1/1/2008. Souvenez-vous toutefois que le paramètre de date système de votre ordinateur peut faire en sorte que les résultats d’une fonction DATEVAL diffèrent de cet exemple.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/datevalue-function"
		}],
		functionParameter: { dateText: {
			name: "date_text",
			detail: "Obligatoire. Texte qui correspond à une date dans un format de date Excel, ou une référence à une cellule contenant du texte qui correspond à une date dans un format de date Excel. Par exemple, « 1/30/2008 » et « 30-Jan-2008 » sont des chaînes de texte entre guillemets qui correspondent à des dates. À l’aide du système de date par défaut dans Microsoft Excel pour Windows, l’argument date_text doit représenter une date comprise entre le 1er janvier 1900 et le 31 décembre 9999. La fonction DATEVAL renvoie la valeur d’erreur #VALEUR! valeur d’erreur si la valeur de l’argument date_text est en dehors de cette plage. Si la partie année de l’argument date_text est omise, la fonction DATEVALUE utilise l’année en cours à partir de l’horloge intégrée de votre ordinateur. Les informations de temps dans l’argument date_text sont ignorées."
		} }
	},
	DAY: {
		description: "Renvoie le jour du mois correspondant à l’argument numéro_de_série. Ce jour est représenté sous la forme d’un nombre entier compris entre 1 et 31.",
		abstract: "Renvoie le jour du mois correspondant à l’argument numéro_de_série. Ce jour est représenté sous la forme d’un nombre entier compris entre 1 et 31.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/day-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Obligatoire. Représente le code de date du jour que vous voulez rechercher. Les dates doivent être entrées à l’aide de la fonction DATE ou sous la forme de résultats d’autres formules ou fonctions. Par exemple, utilisez DATE(2008,5,23) pour le 23e jour du mois de mai 2008. Certains problèmes peuvent survenir si les dates sont entrées sous forme de texte ."
		} }
	},
	DAYS: {
		description: "Renvoie le nombre de jours entre deux dates.",
		abstract: "Renvoie le nombre de jours entre deux dates.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/days-function"
		}],
		functionParameter: {
			endDate: {
				name: "end_date",
				detail: "Obligatoire. Date_début et Date_fin sont deux dates dont vous voulez connaître le nombre de jours qui les séparent."
			},
			startDate: {
				name: "start_date",
				detail: "Obligatoire. Date_début et Date_fin sont deux dates dont vous voulez connaître le nombre de jours qui les séparent."
			}
		}
	},
	DAYS360: {
		description: "La fonction JOURS360 renvoie le nombre de jours compris entre deux dates sur la base d’une année de 360 jours (12 mois de 30 jours), qui est utilisée dans certains calculs comptables. Utilisez cette fonction pour le calcul des paiements si votre système comptable est basé sur 12 mois de 30 jours.",
		abstract: "La fonction JOURS360 renvoie le nombre de jours compris entre deux dates sur la base d’une année de 360 jours (12 mois de 30 jours), qui est utilisée dans certains calculs comptables. Utilisez cette fonction pour le calcul des paiements si votre système comptable est basé sur 12 mois de 30 jours.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/days360-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "start_date et end_date sont les deux dates entre lesquelles vous souhaitez connaître le nombre de jours."
			},
			endDate: {
				name: "end_date",
				detail: "start_date et end_date sont les deux dates entre lesquelles vous souhaitez connaître le nombre de jours."
			},
			method: {
				name: "method",
				detail: "Valeur logique indiquant si la méthode américaine ou européenne doit être utilisée pour le calcul."
			}
		}
	},
	EDATE: {
		description: "Renvoie le numéro de série qui représente la date correspondant à une date spécifiée (l’argument date_départ), corrigée en plus ou en moins du nombre de mois indiqué. Utilisez la fonction MOIS.DECALER pour calculer des dates d’échéance ou de coupon tombant le même jour du mois que la date d’émission.",
		abstract: "Renvoie le numéro de série qui représente la date correspondant à une date spécifiée (l’argument date_départ), corrigée en plus ou en moins du nombre de mois indiqué. Utilisez la fonction MOIS.DECALER pour calculer des dates d’échéance ou de coupon tombant le même jour du mois que la date d’émission.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/edate-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Obligatoire. Il s’agit d’une date qui représente la date de début. Les dates doivent être entrées en utilisant la fonction DATE, ou sous la forme de résultats d’autres formules ou fonctions. Par exemple, utilisez DATE(2008,5,23) pour le 23e jour du mois de mai 2008. Certains problèmes peuvent survenir si les dates sont entrées sous forme de texte ."
			},
			months: {
				name: "months",
				detail: "Obligatoire. Représente le nombre de mois avant ou après date_départ. Une valeur de mois positive donne une date future, tandis qu’une valeur négative donne une date passée."
			}
		}
	},
	EOMONTH: {
		description: "Renvoie le numéro de série du dernier jour du mois précédant ou suivant date_départ du nombre de mois indiqué. Utilisez FIN.MOIS pour calculer des dates d’échéance ou des dates d’échéance tombant le dernier jour du mois.",
		abstract: "Renvoie le numéro de série du dernier jour du mois précédant ou suivant date_départ du nombre de mois indiqué. Utilisez FIN.MOIS pour calculer des dates d’échéance ou des dates d’échéance tombant le dernier jour du mois.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/eomonth-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Obligatoire. Il s’agit d’une date qui représente la date de début. Les dates doivent être entrées en utilisant la fonction DATE, ou sous la forme de résultats d’autres formules ou fonctions. Par exemple, utilisez DATE(2008,5,23) pour le 23e jour du mois de mai 2008. Certains problèmes peuvent survenir si les dates sont entrées sous forme de texte ."
			},
			months: {
				name: "months",
				detail: "Obligatoire. Représente le nombre de mois avant ou après date_départ. Une valeur de mois positive donne une date future, tandis qu’une valeur négative donne une date passée. Remarque Si mois n’est pas un nombre entier, il est tronqué à sa partie entière."
			}
		}
	},
	EPOCHTODATE: {
		description: "Convertit un code temporel d'époque Unix en secondes, millisecondes ou microsecondes en date et heure UTC (temps universel coordonné).",
		abstract: "Convertit un code temporel d'époque Unix en secondes, millisecondes ou microsecondes en date et heure UTC (temps universel coordonné).",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/13193461?hl=fr"
		}],
		functionParameter: {
			timestamp: {
				name: "timestamp",
				detail: "code temporel d'epoch Unix en secondes, millisecondes ou microsecondes."
			},
			unit: {
				name: "unit",
				detail: "[FACULTATIF – 1 par défaut] : unité de temps dans laquelle le code temporel est exprimé."
			}
		}
	},
	HOUR: {
		description: "Renvoie l’heure correspondant à la valeur de l’heure. L’heure est un nombre entier compris entre 0 (12:00 AM) et 23 (11:00 PM).",
		abstract: "Renvoie l’heure correspondant à la valeur de l’heure. L’heure est un nombre entier compris entre 0 (12:00 AM) et 23 (11:00 PM).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/hour-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Obligatoire. Représente le code de temps contenant l’heure que vous voulez trouver. Les codes de temps peuvent être entrés sous la forme de chaînes de texte entre guillemets (par exemple, \"18:45\"), de caractères décimaux (par exemple, 0,78125, qui représente 18:45), ou de résultats d’autres formules ou fonctions (par exemple, TEMPSVAL(\"18:45\"))."
		} }
	},
	ISOWEEKNUM: {
		description: "Renvoie le numéro de la semaine ISO de l’année pour une date donnée.",
		abstract: "Renvoie le numéro de la semaine ISO de l’année pour une date donnée.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/isoweeknum-function"
		}],
		functionParameter: { date: {
			name: "date",
			detail: "Obligatoire. Date est le code de date et d’heure utilisé par Excel pour le calcul de date et d’heure."
		} }
	},
	MINUTE: {
		description: "Renvoie les minutes correspondant à une valeur d’heure. La minute est donnée sous la forme d’un nombre entier compris entre 0 et 59.",
		abstract: "Renvoie les minutes correspondant à une valeur d’heure. La minute est donnée sous la forme d’un nombre entier compris entre 0 et 59.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/minute-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Obligatoire. Représente le code de temps contenant la minute que vous voulez trouver. Les codes de temps peuvent être entrés sous la forme de chaînes de texte entre guillemets (par exemple, \"18:45\"), de caractères décimaux (par exemple, 0,78125, qui représente 18:45), ou de résultats d’autres formules ou fonctions (par exemple, TEMPSVAL(\"18:45\"))."
		} }
	},
	MONTH: {
		description: "Renvoie le mois d’une date représentée par un numéro de série. Le mois est donné sous la forme d’un nombre entier compris entre 1 (janvier) et 12 (décembre).",
		abstract: "Renvoie le mois d’une date représentée par un numéro de série. Le mois est donné sous la forme d’un nombre entier compris entre 1 (janvier) et 12 (décembre).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/month-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Obligatoire. Représente le code de date du mois que vous recherchez. Les dates doivent être entrées à l’aide de la fonction DATE ou sous la forme de résultats d’autres formules ou fonctions. Par exemple, utilisez DATE(2008,5,23) pour le 23e jour du mois de mai 2008. Certains problèmes peuvent survenir si les dates sont entrées sous forme de texte ."
		} }
	},
	NETWORKDAYS: {
		description: "Renvoie le nombre de jours ouvrés entiers compris entre date_début et date_fin. Les jours ouvrés excluent les fins de semaine et toutes les dates identifiées comme étant des jours fériés. Utilisez NB.JOURS.OUVRES pour calculer les charges salariales au prorata du nombre de jours ouvrés pendant une période donnée.",
		abstract: "Renvoie le nombre de jours ouvrés entiers compris entre date_début et date_fin. Les jours ouvrés excluent les fins de semaine et toutes les dates identifiées comme étant des jours fériés. Utilisez NB.JOURS.OUVRES pour calculer les charges salariales au prorata du nombre de jours ouvrés pendant une période donnée.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/networkdays-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Obligatoire. Date qui représente la date de début."
			},
			endDate: {
				name: "end_date",
				detail: "Obligatoire. Date qui représente la date de fin."
			},
			holidays: {
				name: "holidays",
				detail: "Optionnel. Représente une plage facultative d’une ou de plusieurs dates à exclure du calendrier des jours ouvrés, comme les jours fériés ou d’autres jours contractuellement chômés. La liste peut être soit une plage de cellules contenant les dates, soit une constante de matrice des numéros de série qui représentent les dates."
			}
		}
	},
	NETWORKDAYS_INTL: {
		description: "Renvoie le nombre de jours ouvrés entiers compris entre deux dates à l’aide de paramètres identifiant les jours du week-end et leur nombre. Les jours du week-end et ceux qui sont désignés comme des jours fériés ne sont pas considérés comme des jours ouvrés.",
		abstract: "Renvoie le nombre de jours ouvrés entiers compris entre deux dates à l’aide de paramètres identifiant les jours du week-end et leur nombre. Les jours du week-end et ceux qui sont désignés comme des jours fériés ne sont pas considérés comme des jours ouvrés.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/networkdays-intl-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Date représentant la date de début."
			},
			endDate: {
				name: "end_date",
				detail: "Date représentant la date de fin."
			},
			weekend: {
				name: "weekend",
				detail: "Nombre ou chaîne de caractères indiquant quand les week-ends surviennent."
			},
			holidays: {
				name: "holidays",
				detail: "Plage facultative d’une ou plusieurs dates à exclure du calendrier de travail, par exemple les jours fériés nationaux, régionaux ou mobiles."
			}
		}
	},
	NOW: {
		description: "Donne le numéro de série de la date et de l’heure en cours. Si le format de cellule était Général avant l’application de la fonction, Excel modifie le format de cellule pour qu’il corresponde au format de date et heure des paramètres régionaux. Vous pouvez modifier le format de date et heure d’une cellule à l’aide des commandes du groupe Nombre de l’onglet Accueil du ruban.",
		abstract: "Donne le numéro de série de la date et de l’heure en cours. Si le format de cellule était Général avant l’application de la fonction, Excel modifie le format de cellule pour qu’il corresponde au format de date et heure des paramètres régionaux. Vous pouvez modifier le format de date et heure d’une cellule à l’aide des commandes du groupe Nombre de l’onglet Accueil du ruban.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/now-function"
		}],
		functionParameter: {}
	},
	SECOND: {
		description: "Renvoie les secondes d’une valeur de temps. Les secondes sont représentées par un nombre entier compris entre 0 (zéro) et 59.",
		abstract: "Renvoie les secondes d’une valeur de temps. Les secondes sont représentées par un nombre entier compris entre 0 (zéro) et 59.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/second-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Obligatoire. Représente le code de temps contenant l’heure que vous voulez trouver. Les codes de temps peuvent être entrés sous la forme de chaînes de texte entre guillemets (par exemple, \"18:45\"), de caractères décimaux (par exemple, 0,78125, qui représente 18:45) ou de résultats d’autres formules ou fonctions (par exemple, TEMPSVAL(\"18:45\"))."
		} }
	},
	TIME: {
		description: "Renvoie le nombre décimal d’une heure précise. Si le format de cellule était Standard avant que la fonction ne soit entrée, le résultat est mis en forme en tant que date.",
		abstract: "Renvoie le nombre décimal d’une heure précise. Si le format de cellule était Standard avant que la fonction ne soit entrée, le résultat est mis en forme en tant que date.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/time-function"
		}],
		functionParameter: {
			hour: {
				name: "hour",
				detail: "Obligatoire. Représente un nombre compris entre 0 (zéro) et 32767 indiquant l’heure. Toute valeur supérieure à 23 sera divisée par 24 et le reste sera traité comme la valeur horaire. Par exemple, TEMPS(27;0;0) = TEMPS(3;0;0) = 0,125 ou 03:00 (03:00 AM)."
			},
			minute: {
				name: "minute",
				detail: "Obligatoire. Représente un nombre compris entre 0 et 32767 indiquant les minutes. Toute valeur supérieure à 59 sera convertie en heures et en minutes. Par exemple, TEMPS(0;750;0) = TEMPS (12;30;0) = 0,520833 ou 12:30 (12:30 PM)."
			},
			second: {
				name: "second",
				detail: "Obligatoire. Représente un nombre compris entre 0 et 32767 indiquant les secondes. Toute valeur supérieure à 59 sera convertie en heures, minutes et secondes. Par exemple, TEMPS(0;0;2000) = TEMPS(0;33;22) = 0,023148 ou 00:33:20 (12:33:20 AM)"
			}
		}
	},
	TIMEVALUE: {
		description: "Renvoie le nombre décimal de l’heure représentée par une chaîne de texte. Ce nombre décimal est une valeur comprise entre 0 (zéro) et 0,99988426, qui représente l’heure, de 0:00:00 (12:00:00 AM) à 23:59:59 (11:59:59 PM).",
		abstract: "Renvoie le nombre décimal de l’heure représentée par une chaîne de texte. Ce nombre décimal est une valeur comprise entre 0 (zéro) et 0,99988426, qui représente l’heure, de 0:00:00 (12:00:00 AM) à 23:59:59 (11:59:59 PM).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/timevalue-function"
		}],
		functionParameter: { timeText: {
			name: "time_text",
			detail: "Obligatoire. Représente une chaîne de texte qui indique une heure dans l’un des formats d’heure de Microsoft Excel, telle que les chaînes de texte \"6:45 PM\" et \"18:45\" entre guillemets."
		} }
	},
	TO_DATE: {
		description: "Convertit un nombre en date.",
		abstract: "Convertit un nombre en date.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3094239?hl=fr"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "TO_DATE(A2)"
		} }
	},
	TODAY: {
		description: "La fonction AUJOURDHUI retourne le numéro de série de la date actuelle. Le numéro de série est le code de date et d’heure utilisé par Microsoft Excel pour les calculs de date et d’heure. Si le format de la cellule était Standard avant que la fonction ne soit entrée, Excel modifie le format de la cellule en Date . Pour afficher le numéro de série, changez le format de la cellule en Standard ou Nombre .",
		abstract: "La fonction AUJOURDHUI retourne le numéro de série de la date actuelle. Le numéro de série est le code de date et d’heure utilisé par Microsoft Excel pour les calculs de date et d’heure. Si le format de la cellule était Standard avant que la fonction ne soit entrée, Excel modifie le format de la cellule en Date . Pour afficher le numéro de série, changez le format de la cellule en Standard ou Nombre .",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/today-function"
		}],
		functionParameter: {}
	},
	WEEKDAY: {
		description: "Renvoie le jour de la semaine correspondant à une date. Par défaut, le jour est donné sous forme d’un nombre entier compris entre 0 et 7.",
		abstract: "Renvoie le jour de la semaine correspondant à une date. Par défaut, le jour est donné sous forme d’un nombre entier compris entre 0 et 7.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/weekday-function"
		}],
		functionParameter: {
			serialNumber: {
				name: "serial_number",
				detail: "Obligatoire. Représente un numéro séquentiel représentant la date du jour que vous cherchez. Les dates doivent être entrées en utilisant la fonction DATE, ou sous la forme de résultats d’autres formules ou fonctions. Par exemple, utilisez DATE(2008;5;23) pour le 23e jour du mois de mai 2008. Des problèmes peuvent survenir si les dates sont entrées sous forme de texte."
			},
			returnType: {
				name: "return_type",
				detail: "Optionnel. Représente le chiffre qui détermine le type d’information que la fonction renvoie."
			}
		}
	},
	WEEKNUM: {
		description: "Renvoie le numéro de semaine d’une date spécifique. Par exemple, la semaine contenant le 1er janvier est la première semaine de l’année ; elle est numérotée semaine 1.",
		abstract: "Renvoie le numéro de semaine d’une date spécifique. Par exemple, la semaine contenant le 1er janvier est la première semaine de l’année ; elle est numérotée semaine 1.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/weeknum-function"
		}],
		functionParameter: {
			serialNumber: {
				name: "serial_number",
				detail: "Obligatoire. Représente une date de la semaine. Les dates doivent être entrées en utilisant la fonction DATE, ou sous la forme de résultats d’autres formules ou fonctions. Par exemple, utilisez DATE(2008;5;23) pour le 23e jour du mois de mai 2008. Des problèmes peuvent survenir si les dates sont entrées sous forme de texte."
			},
			returnType: {
				name: "return_type",
				detail: "Optionnel. Détermine quel jour est considéré comme le début de la semaine. La valeur par défaut est 1."
			}
		}
	},
	WORKDAY: {
		description: "Renvoie un nombre qui représente une date correspondant à une date (date de début) plus ou moins le nombre de jours ouvrés spécifié. Les jours ouvrés excluent les fins de semaine et toutes les dates identifiées comme étant des jours fériés. Utilisez la fonction SERIE.JOUR.OUVRE pour exclure les fins de semaine et les jours fériés lorsque vous calculez des échéances de factures, des heures de livraisons attendues ou le nombre de jours de travail effectués.",
		abstract: "Renvoie un nombre qui représente une date correspondant à une date (date de début) plus ou moins le nombre de jours ouvrés spécifié. Les jours ouvrés excluent les fins de semaine et toutes les dates identifiées comme étant des jours fériés. Utilisez la fonction SERIE.JOUR.OUVRE pour exclure les fins de semaine et les jours fériés lorsque vous calculez des échéances de factures, des heures de livraisons attendues ou le nombre de jours de travail effectués.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/workday-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Obligatoire. Date qui représente la date de début."
			},
			days: {
				name: "days",
				detail: "Obligatoire. Nombre de jours non hebdomadaires et non-hebdomadaires avant ou après start_date. Une valeur positive pour les jours donne une date future ; une valeur négative génère une date passée."
			},
			holidays: {
				name: "holidays",
				detail: "Optionnel. Représente une liste facultative d'une ou plusieurs dates à exclure du calendrier des jours de travail, comme les jours fériés ou d'autres jours contractuellement chômés. Cette liste peut être soit une plage de cellules contenant les dates, soit une constante de matrice des numéros de série qui représentent les dates."
			}
		}
	},
	WORKDAY_INTL: {
		description: "Cette fonction retourne le numéro de série de la date avant ou après un nombre spécifié de jours ouvrés avec des paramètres de week-end personnalisés. Les paramètres week-end facultatifs peuvent indiquer les jours de week-end et le nombre de jours. Notez que les jours de week-end et tous les jours spécifiés comme jours fériés ne sont pas considérés comme des jours ouvrés.",
		abstract: "Cette fonction retourne le numéro de série de la date avant ou après un nombre spécifié de jours ouvrés avec des paramètres de week-end personnalisés. Les paramètres week-end facultatifs peuvent indiquer les jours de week-end et le nombre de jours. Notez que les jours de week-end et tous les jours spécifiés comme jours fériés ne sont pas considérés comme des jours ouvrés.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/workday-intl-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Obligatoire. Date de départ, tronquée à sa partie entière."
			},
			days: {
				name: "days",
				detail: "Obligatoire. Nombre de jours ouvrés avant ou après la date_départ. Une valeur positive donne une date future ; une valeur négative génère une date passée ; une valeur zéro produit le start_date déjà spécifié . L’offset de jour est tronqué en entier."
			},
			weekend: {
				name: "weekend",
				detail: "Optionnel. S’il est utilisé, cela indique les jours de la semaine qui sont des jours de week-end et qui ne sont pas considérés comme des jours ouvrés. L’argument week-end est un nombre ou une chaîne de week-end qui spécifie quand les week-ends se produisent. Les valeurs du nombre de week-ends indiquent les jours du week-end comme indiqué ci-dessous."
			},
			holidays: {
				name: "holidays",
				detail: "Il s’agit d’un argument facultatif à la fin de la syntaxe. Il spécifie un ensemble facultatif d’une ou plusieurs dates qui doivent être exclues du calendrier des jours ouvrés. Les jours fériés doivent être une plage de cellules qui contiennent les dates ou une constante de tableau des valeurs de série qui représentent ces dates. Le tri des dates ou des valeurs sérielles de l’argument jours_fériés peut être arbitraire."
			}
		}
	},
	YEAR: {
		description: "Renvoie l’année correspondant à une date. L’année est renvoyée sous la forme d’un nombre entier dans la plage 1900-9999.",
		abstract: "Renvoie l’année correspondant à une date. L’année est renvoyée sous la forme d’un nombre entier dans la plage 1900-9999.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/year-function"
		}],
		functionParameter: { serialNumber: {
			name: "serial_number",
			detail: "Obligatoire. Représente le code de date de l’année que vous voulez trouver. Les dates doivent être entrées en utilisant la fonction DATE ou sous la forme de résultats d’autres formules ou fonctions. Par exemple, utilisez DATE(2025,5,23) pour le 23e jour de mai 2025. Des problèmes peuvent survenir si les dates sont entrées sous forme de texte."
		} }
	},
	YEARFRAC: {
		description: "FRACTION.ANNEE calcule la fraction de l’année représentée par le nombre de jours entre deux dates (la date_ début et la date_ fin ). Par exemple, vous pouvez utiliser la fonction de feuille de calcul FRACTION.ANNEE pour déterminer la proportion des profits ou des engagements d’une année entière correspondant à un terme donné.",
		abstract: "FRACTION.ANNEE calcule la fraction de l’année représentée par le nombre de jours entre deux dates (la date_ début et la date_ fin ). Par exemple, vous pouvez utiliser la fonction de feuille de calcul FRACTION.ANNEE pour déterminer la proportion des profits ou des engagements d’une année entière correspondant à un terme donné.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/yearfrac-function"
		}],
		functionParameter: {
			startDate: {
				name: "start_date",
				detail: "Obligatoire. Date qui représente la date de début."
			},
			endDate: {
				name: "end_date",
				detail: "Obligatoire. Date qui représente la date de fin."
			},
			basis: {
				name: "basis",
				detail: "Optionnel. Représente le type de la base de comptage des jours à utiliser."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/engineering/fr-FR.ts
const locale$10 = {
	BESSELI: {
		description: "Renvoie la fonction de Bessel modifiée In(x) qui équivaut à la fonction de Bessel évaluée pour des arguments purement imaginaires.",
		abstract: "Renvoie la fonction de Bessel modifiée In(x) qui équivaut à la fonction de Bessel évaluée pour des arguments purement imaginaires.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/besseli-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "Obligatoire. Représente la variable avec laquelle la fonction doit être calculée."
			},
			n: {
				name: "N",
				detail: "Obligatoire. Représente l’indice de la fonction de Bessel. Si n n’est pas un nombre entier, il est tronqué à sa partie entière."
			}
		}
	},
	BESSELJ: {
		description: "Renvoie la fonction de Bessel Jn(x).",
		abstract: "Renvoie la fonction de Bessel Jn(x).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/besselj-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "Obligatoire. Représente la variable avec laquelle la fonction doit être calculée."
			},
			n: {
				name: "N",
				detail: "Obligatoire. Représente l’indice de la fonction de Bessel. Si n n’est pas un nombre entier, il est tronqué à sa partie entière."
			}
		}
	},
	BESSELK: {
		description: "Renvoie la fonction de Bessel modifiée Kn(x).",
		abstract: "Renvoie la fonction de Bessel modifiée Kn(x).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/besselk-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "Obligatoire. Représente la variable avec laquelle la fonction doit être calculée."
			},
			n: {
				name: "N",
				detail: "Obligatoire. Représente l’indice de la fonction. Si n n’est pas un nombre entier, il est tronqué à sa partie entière."
			}
		}
	},
	BESSELY: {
		description: "Renvoie la fonction de Bessel Yn(x), également appelée fonction de Weber ou fonction de Neumann.",
		abstract: "Renvoie la fonction de Bessel Yn(x), également appelée fonction de Weber ou fonction de Neumann.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/bessely-function"
		}],
		functionParameter: {
			x: {
				name: "X",
				detail: "Obligatoire. Représente la variable avec laquelle la fonction doit être calculée."
			},
			n: {
				name: "N",
				detail: "Obligatoire. Représente l’indice de la fonction. Si n n’est pas un nombre entier, il est tronqué à sa partie entière."
			}
		}
	},
	BIN2DEC: {
		description: "Convertit un nombre binaire en nombre décimal.",
		abstract: "Convertit un nombre binaire en nombre décimal.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/bin2dec-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire. Représente le nombre binaire à convertir. L’argument nombre ne peut pas comporter plus de 10 caractères (10 bits). Le bit de poids fort de l’argument nombre est le bit de signe. Les 9 autres bits sont des bits de grandeur. Les nombres négatifs sont représentés à l’aide de la notation de complément à 2."
		} }
	},
	BIN2HEX: {
		description: "Convertit un nombre binaire en nombre hexadécimal.",
		abstract: "Convertit un nombre binaire en nombre hexadécimal.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/bin2hex-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Représente le nombre binaire à convertir. L’argument nombre ne peut pas comporter plus de 10 caractères (10 bits). Le bit de poids fort de l’argument nombre est le bit de signe. Les 9 autres bits sont des bits de grandeur. Les nombres négatifs sont représentés à l’aide de la notation de complément à 2."
			},
			places: {
				name: "places",
				detail: "Optionnel. Représente le nombre de caractères à utiliser. Si l’argument nb_car est omis, BINHEX utilise le nombre de caractères minimal nécessaire. L’argument nb_car sert notamment à compléter la valeur renvoyée avec des zéros (0) non significatifs."
			}
		}
	},
	BIN2OCT: {
		description: "Convertit un nombre binaire en nombre octal.",
		abstract: "Convertit un nombre binaire en nombre octal.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/bin2oct-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Représente le nombre binaire à convertir. L’argument nombre ne peut pas comporter plus de 10 caractères (10 bits). Le bit de poids fort de l’argument nombre est le bit de signe. Les 9 autres bits sont des bits de grandeur. Les nombres négatifs sont représentés à l’aide de la notation de complément à 2."
			},
			places: {
				name: "places",
				detail: "Optionnel. Représente le nombre de caractères à utiliser. Si l’argument nb_car est omis, BINOCT utilise le nombre de caractères minimal nécessaire. L’argument nb_car sert notamment à compléter la valeur renvoyée avec des zéros (0) non significatifs."
			}
		}
	},
	BITAND: {
		description: "Renvoie une opération binaire « ET » de deux nombres.",
		abstract: "Renvoie une opération binaire « ET » de deux nombres.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/bitand-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obligatoire. Doit être au format décimal et supérieur ou égal à 0."
			},
			number2: {
				name: "number2",
				detail: "Obligatoire. Doit être au format décimal et supérieur ou égal à 0."
			}
		}
	},
	BITLSHIFT: {
		description: "Renvoie un nombre décalé vers la gauche du nombre de bits spécifié.",
		abstract: "Renvoie un nombre décalé vers la gauche du nombre de bits spécifié.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/bitlshift-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Doit être un entier supérieur ou égal à 0."
			},
			shiftAmount: {
				name: "shift_amount",
				detail: "Obligatoire. Doit être un entier."
			}
		}
	},
	BITOR: {
		description: "Renvoie une opération binaire « OU » de deux nombres.",
		abstract: "Renvoie une opération binaire « OU » de deux nombres.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/bitor-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obligatoire. Doit être au format décimal et supérieur ou égal à 0."
			},
			number2: {
				name: "number2",
				detail: "Obligatoire. Doit être au format décimal et supérieur ou égal à 0."
			}
		}
	},
	BITRSHIFT: {
		description: "Renvoie un nombre décalé vers la droite du nombre de bits spécifié.",
		abstract: "Renvoie un nombre décalé vers la droite du nombre de bits spécifié.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/bitrshift-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Doit être un entier supérieur ou égal à 0."
			},
			shiftAmount: {
				name: "shift_amount",
				detail: "Obligatoire. Doit être un entier."
			}
		}
	},
	BITXOR: {
		description: "Renvoie une opération binaire « XOU » de deux nombres.",
		abstract: "Renvoie une opération binaire « XOU » de deux nombres.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/bitxor-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obligatoire. Doit être supérieur ou égal à 0."
			},
			number2: {
				name: "number2",
				detail: "Obligatoire. Doit être supérieur ou égal à 0."
			}
		}
	},
	COMPLEX: {
		description: "Cette fonction convertit des coefficients réels et imaginaires en un nombre complexe de la forme x + yi ou x + yj.",
		abstract: "Cette fonction convertit des coefficients réels et imaginaires en un nombre complexe de la forme x + yi ou x + yj.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/complex-function"
		}],
		functionParameter: {
			realNum: {
				name: "real_num",
				detail: "Obligatoire. Représente le coefficient réel du nombre complexe."
			},
			iNum: {
				name: "i_num",
				detail: "Obligatoire. Représente le coefficient imaginaire du nombre complexe."
			},
			suffix: {
				name: "suffix",
				detail: "Optionnel. Représente le suffixe de la partie imaginaire du nombre complexe. Si l’argument suffixe est omis, sa valeur par défaut est « i »."
			}
		}
	},
	CONVERT: {
		description: "Convertit un nombre d’une unité à une autre unité. Par exemple, la fonction CONVERT peut traduire un tableau de distances en milles en un tableau de distances exprimées en kilomètres.",
		abstract: "Convertit un nombre d’une unité à une autre unité. Par exemple, la fonction CONVERT peut traduire un tableau de distances en milles en un tableau de distances exprimées en kilomètres.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/convert-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "La valeur en from_unit à convertir."
			},
			fromUnit: {
				name: "from_unit",
				detail: "L’unité de number."
			},
			toUnit: {
				name: "to_unit",
				detail: "L’unité du résultat."
			}
		}
	},
	DEC2BIN: {
		description: "Convertit un nombre décimal en nombre binaire.",
		abstract: "Convertit un nombre décimal en nombre binaire.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/dec2bin-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Représente le nombre entier décimal à convertir. Si nombre est négatif, les valeurs nb_car valides ne sont pas prises en compte, et DECBIN renvoie un nombre binaire de 10 caractères (10 bits), dans lequel le bit de poids fort est le bit de signe. Les 9 autres bits sont des bits de grandeur. Les nombres négatifs sont représentés à l’aide de la notation de complément à 2."
			},
			places: {
				name: "places",
				detail: "Optionnel. Représente le nombre de caractères à utiliser. Si nb_car est omis, DECBIN utilise le nombre de caractères minimal nécessaire. L’argument nb_car sert notamment à compléter la valeur renvoyée avec des zéros (0) non significatifs."
			}
		}
	},
	DEC2HEX: {
		description: "Convertit un nombre décimal en nombre hexadécimal.",
		abstract: "Convertit un nombre décimal en nombre hexadécimal.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/dec2hex-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Représente le nombre entier décimal à convertir. Si nombre est négatif, nb_car n’est pas pris en compte, et DECHEX renvoie un nombre hexadécimal de 10 caractères (40 bits), dans lequel le bit de poids fort est le bit de signe. Les 39 autres bits sont des bits de grandeur. Les nombres négatifs sont représentés à l’aide de la notation de complément à 2."
			},
			places: {
				name: "places",
				detail: "Facultatif. Représente le nombre de caractères à utiliser. Si nb_car est omis, DECHEX utilise le nombre de caractères minimal nécessaire. L’argument nb_car sert notamment à compléter la valeur renvoyée avec des zéros (0) non significatifs."
			}
		}
	},
	DEC2OCT: {
		description: "Convertit un nombre décimal en nombre octal.",
		abstract: "Convertit un nombre décimal en nombre octal.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/dec2oct-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Représente le nombre entier décimal à convertir. Si nombre est négatif, l’argument nb_car n’est pas pris en compte, et DECOCT renvoie un nombre octal de 10 caractères (30 bits), dans lequel le bit de poids fort est le bit de signe. Les 29 autres bits sont des bits de grandeur. Les nombres négatifs sont représentés à l’aide de la notation de complément à 2."
			},
			places: {
				name: "places",
				detail: "Optionnel. Représente le nombre de caractères à utiliser. Si nb_car est omis, DECOCT utilise le nombre de caractères minimal nécessaire. L’argument nb_car sert notamment à compléter la valeur renvoyée avec des zéros (0) non significatifs."
			}
		}
	},
	DELTA: {
		description: "Teste l’égalité de deux nombres. Renvoie 1 si l’argument nombre1 est égal à l’argument nombre2 ; sinon, renvoie 0. Utilisez cette fonction pour filtrer un ensemble de valeurs. Ainsi, en additionnant les résultats de plusieurs fonctions DELTA, vous calculez le nombre de paires égales. Cette fonction est également connue sous le nom de fonction Delta de Kronecker.",
		abstract: "Teste l’égalité de deux nombres. Renvoie 1 si l’argument nombre1 est égal à l’argument nombre2 ; sinon, renvoie 0. Utilisez cette fonction pour filtrer un ensemble de valeurs. Ainsi, en additionnant les résultats de plusieurs fonctions DELTA, vous calculez le nombre de paires égales. Cette fonction est également connue sous le nom de fonction Delta de Kronecker.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/delta-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obligatoire. Représente le premier nombre."
			},
			number2: {
				name: "number2",
				detail: "Optionnel. Représente le second nombre. S’il est omis, nombre2 est supposé être égal à zéro."
			}
		}
	},
	ERF: {
		description: "Renvoie la valeur de la fonction d’erreur entre limite_inf et limite_sup.",
		abstract: "Renvoie la valeur de la fonction d’erreur entre limite_inf et limite_sup.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/erf-function"
		}],
		functionParameter: {
			lowerLimit: {
				name: "lower_limit",
				detail: "Obligatoire. Représente la limite inférieure pour l’intégration de la fonction ERF."
			},
			upperLimit: {
				name: "upper_limit",
				detail: "Optionnel. Représente la limite supérieure pour l’intégration de la fonction ERF. Si cette limite est omise, ERF s’intègre entre zéro et limite_inf."
			}
		}
	},
	ERF_PRECISE: {
		description: "Renvoie la fonction d’erreur.",
		abstract: "Renvoie la fonction d’erreur.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/erf-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Obligatoire. Représente la limite inférieure pour l’intégration de la fonction ERF.PRECIS."
		} }
	},
	ERFC: {
		description: "Renvoie la fonction ERF complémentaire intégrée entre x et l’infini.",
		abstract: "Renvoie la fonction ERF complémentaire intégrée entre x et l’infini.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/erfc-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Obligatoire. Représente la limite inférieure pour l’intégration de la fonction ERFC."
		} }
	},
	ERFC_PRECISE: {
		description: "Renvoie la fonction ERF complémentaire intégrée entre x et l’infini.",
		abstract: "Renvoie la fonction ERF complémentaire intégrée entre x et l’infini.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/erfc-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Obligatoire. Représente la limite inférieure pour l’intégration de la fonction ERFC.PRECIS."
		} }
	},
	GESTEP: {
		description: "Renvoie 1 si l’argument nombre est supérieur ou égal à l’argument seuil ou 0 (zéro) dans le cas contraire. Utilisez cette fonction pour filtrer un ensemble de valeurs. Ainsi, en additionnant les résultats de plusieurs fonctions SUP.SEUIL, vous déterminez le nombre de valeurs supérieures à un seuil.",
		abstract: "Renvoie 1 si l’argument nombre est supérieur ou égal à l’argument seuil ou 0 (zéro) dans le cas contraire. Utilisez cette fonction pour filtrer un ensemble de valeurs. Ainsi, en additionnant les résultats de plusieurs fonctions SUP.SEUIL, vous déterminez le nombre de valeurs supérieures à un seuil.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/gestep-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Représente la valeur à comparer à l’argument seuil."
			},
			step: {
				name: "step",
				detail: "Optionnel. Représente la valeur seuil. Si vous n’indiquez pas de valeur pour seuil, SUP.SEUIL utilise zéro."
			}
		}
	},
	HEX2BIN: {
		description: "Convertit un nombre hexadécimal en nombre binaire.",
		abstract: "Convertit un nombre hexadécimal en nombre binaire.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/hex2bin-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Représente le nombre hexadécimal à convertir. L’argument nombre ne peut pas comporter plus de 10 caractères. Le bit de poids fort de nombre est le bit de signe. Les 9 autres bits sont des bits de grandeur. Les nombres négatifs sont représentés à l’aide de la notation de complément à 2."
			},
			places: {
				name: "places",
				detail: "Facultatif. Représente le nombre de caractères à utiliser. Si nb_car est omis, HEXBIN utilise le nombre de caractères minimal nécessaire. L’argument nb_car sert notamment à compléter la valeur renvoyée avec des zéros (0) non significatifs."
			}
		}
	},
	HEX2DEC: {
		description: "Convertit un nombre hexadécimal en nombre décimal.",
		abstract: "Convertit un nombre hexadécimal en nombre décimal.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/hex2dec-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire. Représente le nombre hexadécimal à convertir. L’argument nombre ne peut pas comporter plus de 10 caractères (40 bits). Le bit poids fort de l’argument nombre est le bit de signe. Les 39 autres bits sont des bits de grandeur. Les nombres négatifs sont représentés à l’aide de la notation de complément à 2."
		} }
	},
	HEX2OCT: {
		description: "Convertit un nombre hexadécimal en nombre octal.",
		abstract: "Convertit un nombre hexadécimal en nombre octal.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/hex2oct-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Représente le nombre hexadécimal à convertir. L’argument nombre ne peut pas comporter plus de 10 caractères. Le bit de poids fort de l’argument nombre est le bit de signe. Les 39 autres bits sont des bits de grandeur. Les nombres négatifs sont représentés à l’aide de la notation de complément à 2."
			},
			places: {
				name: "places",
				detail: "Facultatif. Indique le nombre de caractères à utiliser. Si nb_car est omis, HEXOCT utilise le nombre de caractères minimal nécessaire. L’argument nb_car sert notamment à compléter la valeur renvoyée avec des zéros (0) non significatifs."
			}
		}
	},
	IMABS: {
		description: "Cette fonction renvoie la valeur absolue (le module) d’un nombre complexe en format texte x + yi ou x + yj.",
		abstract: "Cette fonction renvoie la valeur absolue (le module) d’un nombre complexe en format texte x + yi ou x + yj.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/imabs-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obligatoire. Représente un nombre complexe dont vous recherchez la valeur absolue."
		} }
	},
	IMAGINARY: {
		description: "Cette fonction renvoie le coefficient imaginaire d’un nombre complexe en format texte x + yi ou x + yj.",
		abstract: "Cette fonction renvoie le coefficient imaginaire d’un nombre complexe en format texte x + yi ou x + yj.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/imaginary-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obligatoire. Représente un nombre complexe dont vous recherchez le coefficient imaginaire."
		} }
	},
	IMARGUMENT: {
		description: "Retourne l’argument (theta), un angle exprimé en radians, de sorte que :",
		abstract: "Retourne l’argument (theta), un angle exprimé en radians, de sorte que :",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/imargument-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obligatoire. Nombre complexe pour lequel vous souhaitez l’argument ."
		} }
	},
	IMCONJUGATE: {
		description: "Cette fonction renvoie le nombre complexe conjugué d’un nombre complexe en format texte x + yi ou x + yj.",
		abstract: "Cette fonction renvoie le nombre complexe conjugué d’un nombre complexe en format texte x + yi ou x + yj.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/imconjugate-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obligatoire. Représente un nombre complexe dont vous recherchez le conjugué."
		} }
	},
	IMCOS: {
		description: "Cette fonction renvoie le cosinus d’un nombre complexe en format texte x + yi ou x + yj.",
		abstract: "Cette fonction renvoie le cosinus d’un nombre complexe en format texte x + yi ou x + yj.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/imcos-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obligatoire. Représente un nombre complexe dont vous recherchez le cosinus."
		} }
	},
	IMCOSH: {
		description: "Renvoie le cosinus hyperbolique d’un nombre complexe au format texte x+yi ou x+yj.",
		abstract: "Renvoie le cosinus hyperbolique d’un nombre complexe au format texte x+yi ou x+yj.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/imcosh-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obligatoire. Un nombre complexe pour lequel vous souhaitez obtenir le cosinus hyperbolique."
		} }
	},
	IMCOT: {
		description: "Retourne la cotangente d’un nombre complexe au format texte x+yi ou x+yj.",
		abstract: "Retourne la cotangente d’un nombre complexe au format texte x+yi ou x+yj.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/imcot-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Le nombre complexe dont vous souhaitez obtenir la cotangente."
		} }
	},
	IMCOTH: {
		description: "La fonction IMCOTH affiche la cotangente hyperbolique du nombre complexe donné. Par exemple, le nombre complexe \"x+yi\" affiche \"coth(x+yi)\".",
		abstract: "La fonction IMCOTH affiche la cotangente hyperbolique du nombre complexe donné. Par exemple, le nombre complexe \"x+yi\" affiche \"coth(x+yi)\".",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9366256?hl=fr"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Nombre complexe dont vous souhaitez afficher la cotangente hyperbolique. Cela peut être le résultat de la fonction COMPLEXE, un nombre réel interprété comme un nombre complexe avec des parties imaginaires égales à 0, ou une chaîne au format \"x+yi\" où x et y sont numériques."
		} }
	},
	IMCSC: {
		description: "Retourne la cosécante d’un nombre complexe au format texte x+yi ou x+yj.",
		abstract: "Retourne la cosécante d’un nombre complexe au format texte x+yi ou x+yj.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/imcsc-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obligatoire. Un nombre complexe pour lequel vous souhaitez obtenir la cosécante."
		} }
	},
	IMCSCH: {
		description: "Renvoie la cosécante hyperbolique d’un nombre complexe.",
		abstract: "Renvoie la cosécante hyperbolique d’un nombre complexe.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/imcsch-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obligatoire. Un nombre complexe pour lequel vous souhaitez obtenir la cosécante hyperbolique."
		} }
	},
	IMDIV: {
		description: "Cette fonction renvoie le quotient de deux nombres complexes en format texte x + yi ou x + yj.",
		abstract: "Cette fonction renvoie le quotient de deux nombres complexes en format texte x + yi ou x + yj.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/imdiv-function"
		}],
		functionParameter: {
			inumber1: {
				name: "inumber1",
				detail: "Obligatoire. Représente le nombre complexe numérateur ou dividende."
			},
			inumber2: {
				name: "inumber2",
				detail: "Obligatoire. Représente le nombre complexe dénominateur ou diviseur."
			}
		}
	},
	IMEXP: {
		description: "Cette fonction renvoie la fonction exponentielle d’un nombre complexe en format texte x + yi ou x + yj.",
		abstract: "Cette fonction renvoie la fonction exponentielle d’un nombre complexe en format texte x + yi ou x + yj.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/imexp-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obligatoire. Représente un nombre complexe dont vous recherchez la fonction exponentielle."
		} }
	},
	IMLN: {
		description: "Cette fonction renvoie le logarithme népérien d’un nombre complexe en format texte x + yi ou x + yj.",
		abstract: "Cette fonction renvoie le logarithme népérien d’un nombre complexe en format texte x + yi ou x + yj.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/imln-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obligatoire. Représente un nombre complexe dont vous recherchez le logarithme népérien."
		} }
	},
	IMLOG: {
		description: "La fonction COMPLEXE.LOG affiche le logarithme d'un nombre complexe pour une base spécifiée.",
		abstract: "La fonction COMPLEXE.LOG affiche le logarithme d'un nombre complexe pour une base spécifiée.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9366486?hl=fr"
		}],
		functionParameter: {
			inumber: {
				name: "inumber",
				detail: "Valeur d'entrée de la fonction logarithme. Le nombre peut être écrit sous forme brute (1, par exemple) et sera alors interprété comme un nombre réel. Le nombre peut être entouré de guillemets, pour spécifier à la fois les coefficients réels et complexes."
			},
			base: {
				name: "base",
				detail: "Base servant à calculer le logarithme. Doit être un nombre réel positif."
			}
		}
	},
	IMLOG10: {
		description: "Cette fonction renvoie le logarithme en base 10 d’un nombre complexe en format texte x + yi ou x + yj.",
		abstract: "Cette fonction renvoie le logarithme en base 10 d’un nombre complexe en format texte x + yi ou x + yj.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/imlog10-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obligatoire. Représente un nombre complexe dont vous recherchez le logarithme."
		} }
	},
	IMLOG2: {
		description: "Cette fonction renvoie le logarithme en base 2 d’un nombre complexe en format texte x + yi ou x + yj.",
		abstract: "Cette fonction renvoie le logarithme en base 2 d’un nombre complexe en format texte x + yi ou x + yj.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/imlog2-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obligatoire. Représente un nombre complexe dont vous recherchez le logarithme de base 2."
		} }
	},
	IMPOWER: {
		description: "Cette fonction renvoie un nombre complexe en format texte x + yi ou x + yj, après l’avoir élevé à une puissance.",
		abstract: "Cette fonction renvoie un nombre complexe en format texte x + yi ou x + yj, après l’avoir élevé à une puissance.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/impower-function"
		}],
		functionParameter: {
			inumber: {
				name: "inumber",
				detail: "Obligatoire. Représente le nombre complexe que vous voulez élever à une puissance."
			},
			number: {
				name: "number",
				detail: "Obligatoire. Représente la puissance à laquelle vous voulez élever ce nombre complexe."
			}
		}
	},
	IMPRODUCT: {
		description: "Cette fonction renvoie le produit de 1 à 255 nombres complexes au format texte x + yi ou x + yj.",
		abstract: "Cette fonction renvoie le produit de 1 à 255 nombres complexes au format texte x + yi ou x + yj.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/improduct-function"
		}],
		functionParameter: {
			inumber1: {
				name: "inumber1",
				detail: "nombre_complexe1 est obligatoire, mais les nombres_complexes suivants ne le sont pas. Il s’agit des nombres complexes de 1 à 255 à multiplier."
			},
			inumber2: {
				name: "inumber2",
				detail: "nombre_complexe1 est obligatoire, mais les nombres_complexes suivants ne le sont pas. Il s’agit des nombres complexes de 1 à 255 à multiplier."
			}
		}
	},
	IMREAL: {
		description: "Cette fonction renvoie le coefficient réel d’un nombre complexe en format texte x + yi ou x + yj.",
		abstract: "Cette fonction renvoie le coefficient réel d’un nombre complexe en format texte x + yi ou x + yj.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/imreal-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obligatoire. Représente un nombre complexe dont vous recherchez le coefficient réel."
		} }
	},
	IMSEC: {
		description: "Retourne la sécante d’un nombre complexe au format texte x+yi ou x+yj.",
		abstract: "Retourne la sécante d’un nombre complexe au format texte x+yi ou x+yj.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/imsec-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obligatoire. Un nombre complexe pour lequel vous souhaitez obtenir la sécante."
		} }
	},
	IMSECH: {
		description: "Renvoie la sécante hyperbolique d’un nombre complexe.",
		abstract: "Renvoie la sécante hyperbolique d’un nombre complexe.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/imsech-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obligatoire. Un nombre complexe pour lequel vous souhaitez obtenir la sécante hyperbolique."
		} }
	},
	IMSIN: {
		description: "Cette fonction renvoie le sinus d’un nombre complexe en format texte x + yi ou x + yj.",
		abstract: "Cette fonction renvoie le sinus d’un nombre complexe en format texte x + yi ou x + yj.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/imsin-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obligatoire. Représente un nombre complexe dont vous recherchez le sinus."
		} }
	},
	IMSINH: {
		description: "La fonction IMSINH retourne le sinus hyperbolique d’un nombre complexe au format texte x+yi ou x+yj.",
		abstract: "La fonction IMSINH retourne le sinus hyperbolique d’un nombre complexe au format texte x+yi ou x+yj.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/imsinh-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obligatoire. Un nombre complexe pour lequel vous souhaitez obtenir le sinus hyperbolique."
		} }
	},
	IMSQRT: {
		description: "Cette fonction renvoie la racine carrée d’un nombre complexe en format texte x + yi ou x + yj.",
		abstract: "Cette fonction renvoie la racine carrée d’un nombre complexe en format texte x + yi ou x + yj.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/imsqrt-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obligatoire. Représente un nombre complexe dont vous recherchez la racine carrée."
		} }
	},
	IMSUB: {
		description: "Cette fonction renvoie la différence entre deux nombres complexes au format texte x + yi ou x + yj.",
		abstract: "Cette fonction renvoie la différence entre deux nombres complexes au format texte x + yi ou x + yj.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/imsub-function"
		}],
		functionParameter: {
			inumber1: {
				name: "inumber1",
				detail: "Obligatoire. Représente le nombre complexe duquel vous voulez soustraire l’argument nombre_complexe2."
			},
			inumber2: {
				name: "inumber2",
				detail: "Obligatoire. Représente le nombre complexe à soustraire de l’argument nombre_complexe1."
			}
		}
	},
	IMSUM: {
		description: "Renvoie la somme de nombres complexes.",
		abstract: "Renvoie la somme de nombres complexes.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/imsum-function"
		}],
		functionParameter: {
			inumber1: {
				name: "inumber1",
				detail: "1 à 255 nombres complexes à additionner."
			},
			inumber2: {
				name: "inumber2",
				detail: "Nombre complexe supplémentaire à additionner."
			}
		}
	},
	IMTAN: {
		description: "Renvoie la tangente d’un nombre complexe.",
		abstract: "Renvoie la tangente d’un nombre complexe.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/imtan-function"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Obligatoire. Un nombre complexe pour lequel vous souhaitez obtenir la tangente."
		} }
	},
	IMTANH: {
		description: "La fonction IMTANH affiche la tangente hyperbolique du nombre complexe donné. Par exemple, le nombre complexe \"x+yi\" affiche \"tanh(x+yi)\".",
		abstract: "La fonction IMTANH affiche la tangente hyperbolique du nombre complexe donné. Par exemple, le nombre complexe \"x+yi\" affiche \"tanh(x+yi)\".",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9366655?hl=fr"
		}],
		functionParameter: { inumber: {
			name: "inumber",
			detail: "Nombre complexe dont vous souhaitez afficher la tangente hyperbolique. Cela peut être le résultat de la fonction COMPLEXE, un nombre réel interprété comme un nombre complexe avec des parties imaginaires égales à 0, ou une chaîne au format \"x+yi\" où x et y sont numériques."
		} }
	},
	OCT2BIN: {
		description: "Convertit un nombre octal en nombre binaire.",
		abstract: "Convertit un nombre octal en nombre binaire.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/oct2bin-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Représente le nombre octal à convertir. Il ne doit pas comporter plus de 10 caractères; le bit de poids fort est le bit de signe."
			},
			places: {
				name: "places",
				detail: "Facultatif. Représente le nombre de caractères à utiliser. S’il est omis, OCT2BIN utilise le nombre minimal nécessaire."
			}
		}
	},
	OCT2DEC: {
		description: "Convertit un nombre octal en nombre décimal.",
		abstract: "Convertit un nombre octal en nombre décimal.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/oct2dec-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire. Représente le nombre octal à convertir. Il ne doit pas comporter plus de 10 caractères octaux; le bit de poids fort est le bit de signe."
		} }
	},
	OCT2HEX: {
		description: "Convertit un nombre octal en nombre hexadécimal.",
		abstract: "Convertit un nombre octal en nombre hexadécimal.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/oct2hex-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Représente le nombre octal à convertir. Il ne doit pas comporter plus de 10 caractères octaux; le bit de poids fort est le bit de signe."
			},
			places: {
				name: "places",
				detail: "Optionnel. Représente le nombre de caractères à utiliser. S’il est omis, OCT2HEX utilise le nombre minimal nécessaire."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/financial/fr-FR.ts
const locale$9 = {
	ACCRINT: {
		description: "Renvoie l’intérêt couru non échu d’un titre dont l’intérêt est perçu périodiquement.",
		abstract: "Renvoie l’intérêt couru non échu d’un titre dont l’intérêt est perçu périodiquement.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/accrint-function"
		}],
		functionParameter: {
			issue: {
				name: "issue",
				detail: "Obligatoire. Représente la date d’émission du titre."
			},
			firstInterest: {
				name: "first_interest",
				detail: "Obligatoire. Représente la date du premier paiement d’intérêt du titre."
			},
			settlement: {
				name: "settlement",
				detail: "Obligatoire. Représente la date de règlement du titre. Cette date correspond à la date suivant la date d’émission, lorsque le titre est cédé à l’acheteur."
			},
			rate: {
				name: "rate",
				detail: "Obligatoire. Représente le taux annuel du coupon du titre."
			},
			par: {
				name: "par",
				detail: "Obligatoire. Représente la valeur nominale du titre. Si vous omettez cet argument, la fonction INTERET.ACC utilise 1 000 €."
			},
			frequency: {
				name: "frequency",
				detail: "Obligatoire. Représente le nombre de coupons payés par an. Si le paiement est annuel, la fréquence = 1 ; s’il est semestriel, la fréquence = 2 ; et s’il est trimestriel, la fréquence = 4."
			},
			basis: {
				name: "basis",
				detail: "Optionnel. Représente le type de la base de comptage des jours à utiliser."
			},
			calcMethod: {
				name: "calc_method",
				detail: "Optionnel. Représente une valeur logique qui spécifie les périodes utilisées pour calculer l’intérêt couru à partir de la date d’émission. La valeur VRAI (1) renvoie l’intérêt couru pour toutes les périodes. La valeur FAUX (0) renvoie l’intérêt couru à partir de la date du paiement du premier coupon. Si vous n’entrez pas d’argument, la valeur par défaut est VRAI."
			}
		}
	},
	ACCRINTM: {
		description: "Renvoie l’intérêt couru non échu d’un titre dont l’intérêt est perçu à l’échéance.",
		abstract: "Renvoie l’intérêt couru non échu d’un titre dont l’intérêt est perçu à l’échéance.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/accrintm-function"
		}],
		functionParameter: {
			issue: {
				name: "issue",
				detail: "Obligatoire. Représente la date d’émission du titre."
			},
			settlement: {
				name: "settlement",
				detail: "Obligatoire. Représente la date d’échéance du titre."
			},
			rate: {
				name: "rate",
				detail: "Obligatoire. Représente le taux annuel du coupon du titre."
			},
			par: {
				name: "par",
				detail: "Obligatoire. Représente la valeur nominale du titre. Si vous omettez la valeur nominale, INTERET.ACC.MAT utilise 1 000 €."
			},
			basis: {
				name: "basis",
				detail: "Optionnel. Représente le type de la base de comptage des jours à utiliser."
			}
		}
	},
	AMORDEGRC: {
		description: "Renvoie l’amortissement linéaire complet d’un bien à la fin d’une période fiscale donnée. Cette fonction est destinée à prendre en compte les règles comptables françaises. Si un bien est acquis en cours de période comptable, la règle du prorata temporis s’applique au calcul de l’amortissement. Cette fonction est similaire à la fonction AMORLINC, à ceci près qu’un coefficient d’amortissement est pris en compte dans le calcul, en fonction de la durée de vie du bien.",
		abstract: "Renvoie l’amortissement linéaire complet d’un bien à la fin d’une période fiscale donnée. Cette fonction est destinée à prendre en compte les règles comptables françaises. Si un bien est acquis en cours de période comptable, la règle du prorata temporis s’applique au calcul de l’amortissement. Cette fonction est similaire à la fonction AMORLINC, à ceci près qu’un coefficient d’amortissement est pris en compte dans le calcul, en fonction de la durée de vie du bien.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/amordegrc-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Obligatoire. Représente le coût d’acquisition du bien."
			},
			datePurchased: {
				name: "date_purchased",
				detail: "Obligatoire. Représente la date d’acquisition du bien."
			},
			firstPeriod: {
				name: "first_period",
				detail: "Obligatoire. Représente la date de la fin de la première période."
			},
			salvage: {
				name: "salvage",
				detail: "Obligatoire. Représente la valeur du bien au terme de la durée d’amortissement, ou valeur résiduelle."
			},
			period: {
				name: "period",
				detail: "Obligatoire. Représente la période."
			},
			rate: {
				name: "rate",
				detail: "Obligatoire. Représente le taux d’amortissement."
			},
			basis: {
				name: "basis",
				detail: "Optionnel. Représente la base annuelle à utiliser."
			}
		}
	},
	AMORLINC: {
		description: "Renvoie l’amortissement linéaire complet d’un bien à la fin d’une période fiscale donnée. Cette fonction est destinée à prendre en compte les règles comptables françaises. Si une immobilisation est acquise en cours de période comptable, la règle du prorata temporis s’applique au calcul de l’amortissement.",
		abstract: "Renvoie l’amortissement linéaire complet d’un bien à la fin d’une période fiscale donnée. Cette fonction est destinée à prendre en compte les règles comptables françaises. Si une immobilisation est acquise en cours de période comptable, la règle du prorata temporis s’applique au calcul de l’amortissement.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/amorlinc-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Obligatoire. Représente le coût d’acquisition du bien."
			},
			datePurchased: {
				name: "date_purchased",
				detail: "Obligatoire. Représente la date d’acquisition du bien."
			},
			firstPeriod: {
				name: "first_period",
				detail: "Obligatoire. Représente la date de la fin de la première période."
			},
			salvage: {
				name: "salvage",
				detail: "Obligatoire. Représente la valeur du bien au terme de la durée d’amortissement, ou valeur résiduelle."
			},
			period: {
				name: "period",
				detail: "Obligatoire. Représente la période."
			},
			rate: {
				name: "rate",
				detail: "Obligatoire. Représente le taux d’amortissement."
			},
			basis: {
				name: "basis",
				detail: "Optionnel. Représente la base annuelle à utiliser."
			}
		}
	},
	COUPDAYBS: {
		description: "La fonction NB.JOURS.COUPON.PREC renvoie le nombre de jours entre le début de la période d’un coupon et sa date de liquidation.",
		abstract: "La fonction NB.JOURS.COUPON.PREC renvoie le nombre de jours entre le début de la période d’un coupon et sa date de liquidation.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/coupdaybs-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obligatoire. Représente la date de règlement du titre. Cette date correspond à la date suivant la date d’émission, lorsque le titre est cédé à l’acheteur."
			},
			maturity: {
				name: "maturity",
				detail: "Obligatoire. Représente la date d’échéance du titre. Cette date correspond à la date d’expiration du titre."
			},
			frequency: {
				name: "frequency",
				detail: "Obligatoire. Représente le nombre de coupons payés par an. Si le paiement est annuel, la fréquence = 1 ; s’il est semestriel, la fréquence = 2 ; et s’il est trimestriel, la fréquence = 4."
			},
			basis: {
				name: "basis",
				detail: "Optionnel. Représente le type de la base de comptage des jours à utiliser."
			}
		}
	},
	COUPDAYS: {
		description: "Affiche le nombre de jours pour la période du coupon contenant la date de liquidation.",
		abstract: "Affiche le nombre de jours pour la période du coupon contenant la date de liquidation.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/coupdays-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obligatoire. Représente la date de règlement du titre. Cette date correspond à la date suivant la date d’émission, lorsque le titre est cédé à l’acheteur."
			},
			maturity: {
				name: "maturity",
				detail: "Obligatoire. Représente la date d’échéance du titre. Cette date correspond à la date d’expiration du titre."
			},
			frequency: {
				name: "frequency",
				detail: "Obligatoire. Représente le nombre de coupons payés par an. Si le paiement est annuel, la fréquence = 1 ; s’il est semestriel, la fréquence = 2 ; et s’il est trimestriel, la fréquence = 4."
			},
			basis: {
				name: "basis",
				detail: "Optionnel. Représente le type de la base de comptage des jours à utiliser."
			}
		}
	},
	COUPDAYSNC: {
		description: "Calcule le nombre de jours entre la date de liquidation et la date du coupon suivant la date de liquidation.",
		abstract: "Calcule le nombre de jours entre la date de liquidation et la date du coupon suivant la date de liquidation.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/coupdaysnc-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obligatoire. Représente la date de règlement du titre. Cette date correspond à la date suivant la date d’émission, lorsque le titre est cédé à l’acheteur."
			},
			maturity: {
				name: "maturity",
				detail: "Obligatoire. Représente la date d’échéance du titre. Cette date correspond à la date d’expiration du titre."
			},
			frequency: {
				name: "frequency",
				detail: "Obligatoire. Représente le nombre de coupons payés par an. Si le paiement est annuel, la fréquence = 1 ; s’il est semestriel, la fréquence = 2 ; et s’il est trimestriel, la fréquence = 4."
			},
			basis: {
				name: "basis",
				detail: "Optionnel. Représente le type de la base de comptage des jours à utiliser."
			}
		}
	},
	COUPNCD: {
		description: "Renvoie un nombre qui représente la date du coupon suivant la date de liquidation.",
		abstract: "Renvoie un nombre qui représente la date du coupon suivant la date de liquidation.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/coupncd-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obligatoire. Représente la date de règlement du titre. Cette date correspond à la date suivant la date d’émission, lorsque le titre est cédé à l’acheteur."
			},
			maturity: {
				name: "maturity",
				detail: "Obligatoire. Représente la date d’échéance du titre. Cette date correspond à la date d’expiration du titre."
			},
			frequency: {
				name: "frequency",
				detail: "Obligatoire. Représente le nombre de coupons payés par an. Si le paiement est annuel, la fréquence = 1 ; s’il est semestriel, la fréquence = 2 ; et s’il est trimestriel, la fréquence = 4."
			},
			basis: {
				name: "basis",
				detail: "Optionnel. Représente le type de la base de comptage des jours à utiliser."
			}
		}
	},
	COUPNUM: {
		description: "Renvoie le nombre de coupons dus entre la date de liquidation et la date d’échéance, arrondi au nombre entier de coupons le plus proche.",
		abstract: "Renvoie le nombre de coupons dus entre la date de liquidation et la date d’échéance, arrondi au nombre entier de coupons le plus proche.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/coupnum-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obligatoire. Représente la date de règlement du titre. Cette date correspond à la date suivant la date d’émission, lorsque le titre est cédé à l’acheteur."
			},
			maturity: {
				name: "maturity",
				detail: "Obligatoire. Représente la date d’échéance du titre. Cette date correspond à la date d’expiration du titre."
			},
			frequency: {
				name: "frequency",
				detail: "Obligatoire. Représente le nombre de coupons payés par an. Si le paiement est annuel, la fréquence = 1 ; s’il est semestriel, la fréquence = 2 ; et s’il est trimestriel, la fréquence = 4."
			},
			basis: {
				name: "basis",
				detail: "Optionnel. Représente le type de la base de comptage des jours à utiliser."
			}
		}
	},
	COUPPCD: {
		description: "Renvoie un nombre qui représente la date du coupon précédant la date de liquidation.",
		abstract: "Renvoie un nombre qui représente la date du coupon précédant la date de liquidation.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/couppcd-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obligatoire. Représente la date de règlement du titre. Cette date correspond à la date suivant la date d’émission, lorsque le titre est cédé à l’acheteur."
			},
			maturity: {
				name: "maturity",
				detail: "Obligatoire. Représente la date d’échéance du titre. Cette date correspond à la date d’expiration du titre."
			},
			frequency: {
				name: "frequency",
				detail: "Obligatoire. Représente le nombre de coupons payés par an. Si le paiement est annuel, la fréquence = 1 ; s’il est semestriel, la fréquence = 2 ; et s’il est trimestriel, la fréquence = 4."
			},
			basis: {
				name: "basis",
				detail: "Optionnel. Représente le type de la base de comptage des jours à utiliser."
			}
		}
	},
	CUMIPMT: {
		description: "Cette fonction renvoie l’intérêt cumulé payé sur un emprunt entre l’argument période_début et l’argument période_fin.",
		abstract: "Cette fonction renvoie l’intérêt cumulé payé sur un emprunt entre l’argument période_début et l’argument période_fin.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/cumipmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Obligatoire. Représente le taux d’intérêt."
			},
			nper: {
				name: "nper",
				detail: "Obligatoire. Représente le nombre total de périodes de remboursement."
			},
			pv: {
				name: "pv",
				detail: "Obligatoire. Représente la valeur actuelle."
			},
			startPeriod: {
				name: "start_period",
				detail: "Obligatoire. Représente la première période incluse dans le calcul. Les périodes de remboursement sont numérotées à partir de 1."
			},
			endPeriod: {
				name: "end_period",
				detail: "Obligatoire. Représente la dernière période incluse dans le calcul."
			},
			type: {
				name: "type",
				detail: "Obligatoire. Correspond à l’échéance des remboursements."
			}
		}
	},
	CUMPRINC: {
		description: "Renvoie le principal cumulé payé sur un emprunt entre deux périodes.",
		abstract: "Renvoie le principal cumulé payé sur un emprunt entre deux périodes.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/cumprinc-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Obligatoire. Représente le taux d’intérêt."
			},
			nper: {
				name: "nper",
				detail: "Obligatoire. Représente le nombre total de périodes de remboursement."
			},
			pv: {
				name: "pv",
				detail: "Obligatoire. Représente la valeur actuelle."
			},
			startPeriod: {
				name: "start_period",
				detail: "Obligatoire. Représente la première période incluse dans le calcul. Les périodes de remboursement sont numérotées à partir de 1."
			},
			endPeriod: {
				name: "end_period",
				detail: "Obligatoire. Représente la dernière période incluse dans le calcul."
			},
			type: {
				name: "type",
				detail: "Obligatoire. Correspond à l’échéance des remboursements."
			}
		}
	},
	DB: {
		description: "Renvoie l’amortissement d’un bien pour une période donnée selon la méthode de l’amortissement dégressif à taux fixe.",
		abstract: "Renvoie l’amortissement d’un bien pour une période donnée selon la méthode de l’amortissement dégressif à taux fixe.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/db-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Obligatoire. Représente le coût initial du bien."
			},
			salvage: {
				name: "salvage",
				detail: "Obligatoire. Représente la valeur du bien au terme de l’amortissement, aussi appelée valeur résiduelle du bien."
			},
			life: {
				name: "life",
				detail: "Obligatoire. Représente le nombre de périodes pendant lesquelles le bien est amorti, aussi appelée durée de vie utile du bien."
			},
			period: {
				name: "period",
				detail: "Obligatoire. Représente la période pour laquelle vous voulez calculer un amortissement. La période doit être exprimée dans la même unité que la durée."
			},
			month: {
				name: "month",
				detail: "Optionnel. Représente le nombre de mois de la première année. Si l’argument mois est omis, sa valeur par défaut est 12."
			}
		}
	},
	DDB: {
		description: "Renvoie l’amortissement d’un bien pour une période donnée selon la méthode de l’amortissement dégressif double ou une autre méthode indiquée.",
		abstract: "Renvoie l’amortissement d’un bien pour une période donnée selon la méthode de l’amortissement dégressif double ou une autre méthode indiquée.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/ddb-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Obligatoire. Représente le coût initial du bien."
			},
			salvage: {
				name: "salvage",
				detail: "Obligatoire. Représente la valeur du bien au terme de l’amortissement, aussi appelée valeur résiduelle du bien. Cette valeur peut être 0."
			},
			life: {
				name: "life",
				detail: "Obligatoire. Représente le nombre de périodes pendant lesquelles le bien est amorti, aussi appelée durée de vie utile du bien."
			},
			period: {
				name: "period",
				detail: "Obligatoire. Représente la période pour laquelle vous voulez calculer un amortissement. La période doit être exprimée dans la même unité que la durée."
			},
			factor: {
				name: "factor",
				detail: "Optionnel. Représente le taux de l’amortissement dégressif. Si facteur est omis, la valeur par défaut est 2, méthode de l’amortissement dégressif à taux double."
			}
		}
	},
	DISC: {
		description: "Renvoie le taux d’escompte d’un titre.",
		abstract: "Renvoie le taux d’escompte d’un titre.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/disc-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "La date de règlement du titre."
			},
			maturity: {
				name: "maturity",
				detail: "La date d’échéance du titre."
			},
			pr: {
				name: "pr",
				detail: "Le prix du titre pour une valeur nominale de 100 $."
			},
			redemption: {
				name: "redemption",
				detail: "La valeur de remboursement du titre pour une valeur nominale de 100 $."
			},
			basis: {
				name: "basis",
				detail: "Le type de base de décompte des jours à utiliser."
			}
		}
	},
	DOLLARDE: {
		description: "Convertit un prix en dollars exprimé sous forme de fraction en prix en dollars exprimé sous forme décimale.",
		abstract: "Convertit un prix en dollars exprimé sous forme de fraction en prix en dollars exprimé sous forme décimale.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/dollarde-function"
		}],
		functionParameter: {
			fractionalDollar: {
				name: "fractional_dollar",
				detail: "Obligatoire. Représente un nombre exprimé sous la forme de parties entière et fractionnaire, séparées par un symbole décimal."
			},
			fraction: {
				name: "fraction",
				detail: "Obligatoire. Représente le nombre entier à utiliser comme dénominateur de la fraction."
			}
		}
	},
	DOLLARFR: {
		description: "Convertit un prix en dollars exprimé sous forme décimale en prix en dollars exprimé sous forme de fraction.",
		abstract: "Convertit un prix en dollars exprimé sous forme décimale en prix en dollars exprimé sous forme de fraction.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/dollarfr-function"
		}],
		functionParameter: {
			decimalDollar: {
				name: "decimal_dollar",
				detail: "Obligatoire. Nombre décimal."
			},
			fraction: {
				name: "fraction",
				detail: "Obligatoire. Représente le nombre entier à utiliser comme dénominateur de la fraction."
			}
		}
	},
	DURATION: {
		description: "La fonction DURATION , l’une des fonctions Financières , retourne la durée de Macauley pour une valeur nominale supposée de 100 $. La durée est définie comme la moyenne pondérée de la valeur actuelle des flux de trésorerie et est utilisée comme mesure de la réponse du prix d’une obligation à l’évolution du rendement.",
		abstract: "La fonction DURATION , l’une des fonctions Financières , retourne la durée de Macauley pour une valeur nominale supposée de 100 $. La durée est définie comme la moyenne pondérée de la valeur actuelle des flux de trésorerie et est utilisée comme mesure de la réponse du prix d’une obligation à l’évolution du rendement.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/duration-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obligatoire. Représente la date de règlement du titre. Cette date correspond à la date suivant la date d’émission, lorsque le titre est cédé à l’acheteur."
			},
			maturity: {
				name: "maturity",
				detail: "Obligatoire. Représente la date d’échéance du titre. Cette date correspond à la date d’expiration du titre."
			},
			coupon: {
				name: "coupon",
				detail: "Obligatoire. Représente le taux annuel du coupon du titre."
			},
			yld: {
				name: "yld",
				detail: "Obligatoire. Représente le taux de rendement annuel du titre."
			},
			frequency: {
				name: "frequency",
				detail: "Obligatoire. Représente le nombre de coupons payés par an. Si le paiement est annuel, la fréquence = 1 ; s’il est semestriel, la fréquence = 2 ; et s’il est trimestriel, la fréquence = 4."
			},
			basis: {
				name: "basis",
				detail: "Optionnel. Représente le type de la base de comptage des jours à utiliser."
			}
		}
	},
	EFFECT: {
		description: "Cette fonction renvoie le taux d’intérêt annuel effectif.",
		abstract: "Taux d’intérêt annuel effectif.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/effect-function"
		}],
		functionParameter: {
			nominalRate: {
				name: "taux_nominal",
				detail: "Représente le taux d’intérêt nominal."
			},
			npery: {
				name: "nb_périodes",
				detail: "Nombre de périodes annuelles pour le calcul des intérêts composés."
			}
		}
	},
	FV: {
		description: "VC , l’une des fonctions Financier , calcule valeur capitalisée d’un investissement sur la base d’un taux d’intérêt constant. Vous pouvez utiliser la fonction VC pour calculer des paiements périodiques, constants, ou un montant forfaitaire unique.",
		abstract: "VC , l’une des fonctions Financier , calcule valeur capitalisée d’un investissement sur la base d’un taux d’intérêt constant. Vous pouvez utiliser la fonction VC pour calculer des paiements périodiques, constants, ou un montant forfaitaire unique.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/fv-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Obligatoire. Représente le taux d’intérêt par période."
			},
			nper: {
				name: "nper",
				detail: "Obligatoire. Représente le nombre total de périodes de remboursement au cours de l’opération."
			},
			pmt: {
				name: "pmt",
				detail: "Obligatoire. Représente le montant d’un versement périodique ; celui-ci reste constant pendant toute la durée de l’opération. En règle générale, vpm comprend le principal et les intérêts, mais aucune autre charge, ni impôt. Si pmt est omis, vous devez inclure l’argument pv."
			},
			pv: {
				name: "pv",
				detail: "Optionnel. Représente la valeur actuelle ou la somme forfaitaire représentant aujourd’hui une série de remboursements futurs. Si l’argument va n’est pas spécifié, la valeur prise en compte par défaut est 0 (zéro), et vous devez inclure l’argument vpm."
			},
			type: {
				name: "type",
				detail: "Optionnel. Peut prendre les valeurs 0 ou 1, et indique l’échéance des paiements. Si vous ne spécifiez pas l’argument type, sa valeur par défaut est 0."
			}
		}
	},
	FVSCHEDULE: {
		description: "Calcule la valeur capitalisée d’un investissement en appliquant une série de taux d’intérêt composites. Utilisez la fonction VC.PAIEMENTS pour calculer la valeur capitalisée d’un investissement à taux variable ou révisable.",
		abstract: "Calcule la valeur capitalisée d’un investissement en appliquant une série de taux d’intérêt composites. Utilisez la fonction VC.PAIEMENTS pour calculer la valeur capitalisée d’un investissement à taux variable ou révisable.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/fvschedule-function"
		}],
		functionParameter: {
			principal: {
				name: "principal",
				detail: "Obligatoire. Représente la valeur actuelle."
			},
			schedule: {
				name: "schedule",
				detail: "Obligatoire. Représente la matrice des taux d’intérêt à appliquer."
			}
		}
	},
	INTRATE: {
		description: "Affiche le taux d’intérêt d’un titre totalement investi.",
		abstract: "Affiche le taux d’intérêt d’un titre totalement investi.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/intrate-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obligatoire. Représente la date de règlement du titre. Cette date correspond à la date suivant la date d’émission, lorsque le titre est cédé à l’acheteur."
			},
			maturity: {
				name: "maturity",
				detail: "Obligatoire. Représente la date d’échéance du titre. Cette date correspond à la date d’expiration du titre."
			},
			investment: {
				name: "investment",
				detail: "Obligatoire. Représente le montant investi dans le titre."
			},
			redemption: {
				name: "redemption",
				detail: "Obligatoire. Représente le montant à percevoir à l’échéance."
			},
			basis: {
				name: "basis",
				detail: "Optionnel. Représente le type de la base de comptage des jours à utiliser."
			}
		}
	},
	IPMT: {
		description: "Renvoie, pour une période donnée, le montant des intérêts dus pour un emprunt remboursé par des versements périodiques constants, avec un taux d’intérêt constant.",
		abstract: "Renvoie, pour une période donnée, le montant des intérêts dus pour un emprunt remboursé par des versements périodiques constants, avec un taux d’intérêt constant.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/ipmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Obligatoire. Représente le taux d’intérêt par période."
			},
			per: {
				name: "per",
				detail: "Obligatoire. Période pour laquelle vous souhaitez trouver l’intérêt et doit être comprise entre 1 et nper."
			},
			nper: {
				name: "nper",
				detail: "Obligatoire. Représente le nombre total de périodes de remboursement au cours de l’opération."
			},
			pv: {
				name: "pv",
				detail: "Obligatoire. Représente la valeur actuelle ou la somme forfaitaire représentant aujourd’hui une série de remboursements futurs."
			},
			fv: {
				name: "fv",
				detail: "Optionnel. Représente la valeur capitalisée, c’est-à-dire le montant que vous souhaitez obtenir après le dernier paiement. Si vc est omis, la valeur par défaut est 0 (par exemple, la valeur capitalisée d’un emprunt est égale à 0)."
			},
			type: {
				name: "type",
				detail: "Optionnel. Peut prendre les valeurs 0 ou 1, et indique l’échéance des paiements. Si vous ne spécifiez pas l’argument type, sa valeur par défaut est 0."
			}
		}
	},
	IRR: {
		description: "Retourne le taux de rendement interne d’une série de flux de trésorerie représentés par les nombres en valeurs. Ces flux de trésorerie n’ont pas besoin d’être pairs, comme ils le seraient pour une annuité. Toutefois, les flux de trésorerie doivent se produire à intervalles réguliers, par exemple mensuellement ou annuellement. Le taux de rendement interne est le taux d’intérêt reçu pour un investissement composé de paiements (valeurs négatives) et de revenus (valeurs positives) qui se produisent à des périodes régulières.",
		abstract: "Retourne le taux de rendement interne d’une série de flux de trésorerie représentés par les nombres en valeurs. Ces flux de trésorerie n’ont pas besoin d’être pairs, comme ils le seraient pour une annuité. Toutefois, les flux de trésorerie doivent se produire à intervalles réguliers, par exemple mensuellement ou annuellement. Le taux de rendement interne est le taux d’intérêt reçu pour un investissement composé de paiements (valeurs négatives) et de revenus (valeurs positives) qui se produisent à des périodes régulières.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/irr-function"
		}],
		functionParameter: {
			values: {
				name: "values",
				detail: "Matrice ou référence à des cellules contenant les nombres pour lesquels vous souhaitez calculer le taux de rentabilité interne.\n1. values doit contenir au moins une valeur positive et une valeur négative.\n2. IRR utilise l’ordre des valeurs pour interpréter l’ordre des flux de trésorerie. Saisissez les paiements et recettes dans l’ordre souhaité.\n3. Si une matrice ou une référence contient du texte, des valeurs logiques ou des cellules vides, ces valeurs sont ignorées."
			},
			guess: {
				name: "guess",
				detail: "Nombre que vous estimez proche du résultat de IRR."
			}
		}
	},
	ISPMT: {
		description: "Calcule les intérêts payés (ou reçus) pour la période spécifiée d’un prêt (ou d’un investissement) avec des paiements de capital pairs.",
		abstract: "Calcule les intérêts payés (ou reçus) pour la période spécifiée d’un prêt (ou d’un investissement) avec des paiements de capital pairs.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/ispmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Obligatoire. Représente le taux d’intérêt de l’investissement."
			},
			per: {
				name: "per",
				detail: "Obligatoire. Période pour laquelle vous souhaitez trouver l’intérêt, et doit être comprise entre 1 et Nper."
			},
			nper: {
				name: "nper",
				detail: "Obligatoire. Représente le nombre total de périodes de remboursement pour l’investissement."
			},
			pv: {
				name: "pv",
				detail: "Obligatoire. Représente la valeur actuelle d’un investissement. Pour un prêt, Pv est le montant du prêt."
			}
		}
	},
	MDURATION: {
		description: "Renvoie la durée de Macauley modifiée pour un titre ayant une valeur nominale hypothétique de 100 €.",
		abstract: "Renvoie la durée de Macauley modifiée pour un titre ayant une valeur nominale hypothétique de 100 €.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/mduration-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obligatoire. Représente la date de règlement du titre. Cette date correspond à la date suivant la date d’émission, lorsque le titre est cédé à l’acheteur."
			},
			maturity: {
				name: "maturity",
				detail: "Obligatoire. Représente la date d’échéance du titre. Cette date correspond à la date d’expiration du titre."
			},
			coupon: {
				name: "coupon",
				detail: "Obligatoire. Représente le taux annuel du coupon du titre."
			},
			yld: {
				name: "yld",
				detail: "Obligatoire. Représente le taux de rendement annuel du titre."
			},
			frequency: {
				name: "frequency",
				detail: "Obligatoire. Représente le nombre de coupons payés par an. Si le paiement est annuel, la fréquence = 1 ; s’il est semestriel, la fréquence = 2 ; et s’il est trimestriel, la fréquence = 4."
			},
			basis: {
				name: "basis",
				detail: "Optionnel. Représente le type de la base de comptage des jours à utiliser."
			}
		}
	},
	MIRR: {
		description: "Renvoie le taux interne de rentabilité modifié, pour une série de flux financiers périodiques. TRIM prend en compte le coût de l’investissement et l’intérêt perçu sur le placement des liquidités.",
		abstract: "Renvoie le taux interne de rentabilité modifié, pour une série de flux financiers périodiques. TRIM prend en compte le coût de l’investissement et l’intérêt perçu sur le placement des liquidités.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/mirr-function"
		}],
		functionParameter: {
			values: {
				name: "values",
				detail: "Obligatoire. Représente une matrice ou une référence à des cellules contenant des nombres. Ces nombres correspondent à une série de décaissements (valeurs négatives) et d’encaissements (valeurs positives) périodiques. Les valeurs doivent contenir au moins une valeur positive et une valeur négative pour calculer le taux de retour interne modifié. Sinon, la fonction MIRR renvoie le #DIV/0 ! #VALEUR!. Si une matrice ou une référence utilisée comme argument contient du texte, des valeurs logiques ou des cellules vides, ces valeurs ne sont pas prises en compte. En revanche, les cellules contenant la valeur 0 sont prises en compte."
			},
			financeRate: {
				name: "finance_rate",
				detail: "Obligatoire. Représente le taux d’intérêt payé pour le financement de la trésorerie."
			},
			reinvestRate: {
				name: "reinvest_rate",
				detail: "Obligatoire. Représente le taux d’intérêt perçu sur le placement de la trésorerie excédentaire."
			}
		}
	},
	NOMINAL: {
		description: "Cette fonction renvoie le taux d’intérêt nominal annuel calculé à partir du taux effectif et du nombre de périodes par an pour le calcul des intérêts composés.",
		abstract: "Cette fonction renvoie le taux d’intérêt nominal annuel calculé à partir du taux effectif et du nombre de périodes par an pour le calcul des intérêts composés.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/nominal-function"
		}],
		functionParameter: {
			effectRate: {
				name: "effect_rate",
				detail: "Obligatoire. Représente le taux d’intérêt effectif."
			},
			npery: {
				name: "npery",
				detail: "Obligatoire. Représente le nombre de périodes par an pour le calcul des intérêts composés."
			}
		}
	},
	NPER: {
		description: "Renvoie le nombre de versements nécessaires pour rembourser un emprunt à taux d’intérêt constant, sachant que ces versements doivent être constants et périodiques.",
		abstract: "Renvoie le nombre de versements nécessaires pour rembourser un emprunt à taux d’intérêt constant, sachant que ces versements doivent être constants et périodiques.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/nper-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Obligatoire. Représente le taux d’intérêt par période."
			},
			pmt: {
				name: "pmt",
				detail: "Obligatoire. Représente le montant d’un versement périodique ; celui-ci reste constant pendant toute la durée de l’opération. En règle générale, vpm comprend le principal et les intérêts, mais aucune autre charge, ni impôt."
			},
			pv: {
				name: "pv",
				detail: "Obligatoire. Représente la valeur actuelle ou la somme forfaitaire représentant aujourd’hui une série de remboursements futurs."
			},
			fv: {
				name: "fv",
				detail: "Optionnel. Représente la valeur capitalisée, c’est-à-dire le montant que vous souhaitez obtenir après le dernier paiement. Si vc est omis, la valeur par défaut est 0 (par exemple, la valeur capitalisée d’un emprunt est égale à 0)."
			},
			type: {
				name: "type",
				detail: "Optionnel. Représente le nombre 0 ou 1, et indique quand les paiements doivent être effectués."
			}
		}
	},
	NPV: {
		description: "Calcule la valeur actuelle nette d’un investissement en utilisant un taux d’escompte ainsi qu’une série de décaissements (valeurs négatives) et d’encaissements (valeurs positives) futurs.",
		abstract: "Calcule la valeur actuelle nette d’un investissement en utilisant un taux d’escompte ainsi qu’une série de décaissements (valeurs négatives) et d’encaissements (valeurs positives) futurs.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/npv-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Obligatoire. Représente le taux d’actualisation pour une période."
			},
			value1: {
				name: "value1",
				detail: "Value1 est obligatoire, les valeurs suivantes sont facultatives. Elles représentent 1 à 254 arguments représentant les encaissements et les décaissements. valeur1, valeur2,... doivent intervenir à intervalles réguliers et à la fin de chaque période. VAN utilise l’ordre de valeur1, valeur2,... pour interpréter celui des flux financiers. Il convient donc de veiller à entrer les décaissements et encaissements dans le bon ordre. Les arguments représentant des cellules vides, des valeurs logiques ou des nombres représentés sous forme de texte, des valeurs d’erreur ou du texte ne pouvant pas être converti en nombre ne sont pas pris en compte. Si un argument est une matrice ou une référence, seuls les nombres contenus dans cette matrice ou cette référence sont pris en compte. Les cellules vides, les valeurs logiques, le texte ou les valeurs d’erreur figurant dans la matrice ou la référence ne sont pas pris en compte."
			},
			value2: {
				name: "value2",
				detail: "Value1 est obligatoire, les valeurs suivantes sont facultatives. Elles représentent 1 à 254 arguments représentant les encaissements et les décaissements. valeur1, valeur2,... doivent intervenir à intervalles réguliers et à la fin de chaque période. VAN utilise l’ordre de valeur1, valeur2,... pour interpréter celui des flux financiers. Il convient donc de veiller à entrer les décaissements et encaissements dans le bon ordre. Les arguments représentant des cellules vides, des valeurs logiques ou des nombres représentés sous forme de texte, des valeurs d’erreur ou du texte ne pouvant pas être converti en nombre ne sont pas pris en compte. Si un argument est une matrice ou une référence, seuls les nombres contenus dans cette matrice ou cette référence sont pris en compte. Les cellules vides, les valeurs logiques, le texte ou les valeurs d’erreur figurant dans la matrice ou la référence ne sont pas pris en compte."
			}
		}
	},
	ODDFPRICE: {
		description: "Cette fonction renvoie le prix par tranche de valeur nominale de 100 € d’un titre dont la première période est irrégulière (courte ou longue).",
		abstract: "Cette fonction renvoie le prix par tranche de valeur nominale de 100 € d’un titre dont la première période est irrégulière (courte ou longue).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/oddfprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obligatoire. Représente la date de règlement du titre. Cette date correspond à la date suivant la date d’émission, lorsque le titre est cédé à l’acheteur."
			},
			maturity: {
				name: "maturity",
				detail: "Obligatoire. Représente la date d’échéance du titre. Cette date correspond à la date d’expiration du titre."
			},
			issue: {
				name: "issue",
				detail: "Obligatoire. Représente la date d’émission du titre."
			},
			firstCoupon: {
				name: "first_coupon",
				detail: "Obligatoire. Représente la date du premier coupon du titre."
			},
			rate: {
				name: "rate",
				detail: "Obligatoire. Représente le taux d’intérêt du titre."
			},
			yld: {
				name: "yld",
				detail: "Obligatoire. Représente le taux de rendement annuel du titre."
			},
			redemption: {
				name: "redemption",
				detail: "Obligatoire. Représente la valeur de remboursement du titre par tranche de valeur nominale de 100 €."
			},
			frequency: {
				name: "frequency",
				detail: "Obligatoire. Représente le nombre de coupons payés par an. Si le paiement est annuel, la fréquence = 1 ; s’il est semestriel, la fréquence = 2 ; et s’il est trimestriel, la fréquence = 4."
			},
			basis: {
				name: "basis",
				detail: "Optionnel. Représente le type de la base de comptage des jours à utiliser."
			}
		}
	},
	ODDFYIELD: {
		description: "Cette fonction calcule le rendement d’un titre dont la première période de coupon est irrégulière (courte ou longue).",
		abstract: "Cette fonction calcule le rendement d’un titre dont la première période de coupon est irrégulière (courte ou longue).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/oddfyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obligatoire. Représente la date de règlement du titre. Cette date correspond à la date suivant la date d’émission, lorsque le titre est cédé à l’acheteur."
			},
			maturity: {
				name: "maturity",
				detail: "Obligatoire. Représente la date d’échéance du titre. Cette date correspond à la date d’expiration du titre."
			},
			issue: {
				name: "issue",
				detail: "Obligatoire. Représente la date d’émission du titre."
			},
			firstCoupon: {
				name: "first_coupon",
				detail: "Obligatoire. Représente la date du premier coupon du titre."
			},
			rate: {
				name: "rate",
				detail: "Obligatoire. Représente le taux d’intérêt du titre."
			},
			pr: {
				name: "pr",
				detail: "Obligatoire. Représente le prix du titre."
			},
			redemption: {
				name: "redemption",
				detail: "Obligatoire. Représente la valeur de remboursement du titre par tranche de valeur nominale de 100 €."
			},
			frequency: {
				name: "frequency",
				detail: "Obligatoire. Représente le nombre de coupons payés par an. Si le paiement est annuel, la fréquence = 1 ; s’il est semestriel, la fréquence = 2 ; et s’il est trimestriel, la fréquence = 4."
			},
			basis: {
				name: "basis",
				detail: "Optionnel. Représente le type de la base de comptage des jours à utiliser."
			}
		}
	},
	ODDLPRICE: {
		description: "Cette fonction renvoie le prix par tranche de valeur nominale de 100 € d’un titre dont la dernière période de coupon est irrégulière (courte ou longue).",
		abstract: "Cette fonction renvoie le prix par tranche de valeur nominale de 100 € d’un titre dont la dernière période de coupon est irrégulière (courte ou longue).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/oddlprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obligatoire. Représente la date de règlement du titre. Cette date correspond à la date suivant la date d’émission, lorsque le titre est cédé à l’acheteur."
			},
			maturity: {
				name: "maturity",
				detail: "Obligatoire. Représente la date d’échéance du titre. Cette date correspond à la date d’expiration du titre."
			},
			lastInterest: {
				name: "last_interest",
				detail: "Obligatoire. Représente la date du dernier paiement d’intérêt du titre."
			},
			rate: {
				name: "rate",
				detail: "Obligatoire. Représente le taux d’intérêt du titre."
			},
			yld: {
				name: "yld",
				detail: "Obligatoire. Représente le taux de rendement annuel du titre."
			},
			redemption: {
				name: "redemption",
				detail: "Obligatoire. Représente la valeur de remboursement du titre par tranche de valeur nominale de 100 €."
			},
			frequency: {
				name: "frequency",
				detail: "Obligatoire. Représente le nombre de coupons payés par an. Si le paiement est annuel, la fréquence = 1 ; s’il est semestriel, la fréquence = 2 ; et s’il est trimestriel, la fréquence = 4."
			},
			basis: {
				name: "basis",
				detail: "Optionnel. Représente le type de la base de comptage des jours à utiliser."
			}
		}
	},
	ODDLYIELD: {
		description: "Cette fonction calcule le rendement d’un titre dont la dernière période de coupon est irrégulière (courte ou longue).",
		abstract: "Cette fonction calcule le rendement d’un titre dont la dernière période de coupon est irrégulière (courte ou longue).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/oddlyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obligatoire. Représente la date de règlement du titre. Cette date correspond à la date suivant la date d’émission, lorsque le titre est cédé à l’acheteur."
			},
			maturity: {
				name: "maturity",
				detail: "Obligatoire. Représente la date d’échéance du titre. Cette date correspond à la date d’expiration du titre."
			},
			lastInterest: {
				name: "last_interest",
				detail: "Obligatoire. Représente la date du dernier paiement d’intérêt du titre."
			},
			rate: {
				name: "rate",
				detail: "Obligatoire. Représente le taux d’intérêt du titre."
			},
			pr: {
				name: "pr",
				detail: "Obligatoire. Représente le prix du titre."
			},
			redemption: {
				name: "redemption",
				detail: "Obligatoire. Représente la valeur de remboursement du titre par tranche de valeur nominale de 100 €."
			},
			frequency: {
				name: "frequency",
				detail: "Obligatoire. Représente le nombre de coupons payés par an. Si le paiement est annuel, la fréquence = 1 ; s’il est semestriel, la fréquence = 2 ; et s’il est trimestriel, la fréquence = 4."
			},
			basis: {
				name: "basis",
				detail: "Optionnel. Représente le type de la base de comptage des jours à utiliser."
			}
		}
	},
	PDURATION: {
		description: "Renvoie le nombre de périodes requises pour qu’un investissement atteigne une valeur spécifiée.",
		abstract: "Renvoie le nombre de périodes requises pour qu’un investissement atteigne une valeur spécifiée.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/pduration-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Obligatoire. Taux est le taux d’intérêt par période."
			},
			pv: {
				name: "pv",
				detail: "Obligatoire. Va représente la valeur actuelle de l’investissement."
			},
			fv: {
				name: "fv",
				detail: "Obligatoire. Vc est la valeur future souhaitée de l’investissement."
			}
		}
	},
	PMT: {
		description: "VPM , l’une des fonctions financières , calcule le remboursement d’un emprunt sur la base de remboursements et d’un taux d’intérêt constants.",
		abstract: "VPM , l’une des fonctions financières , calcule le remboursement d’un emprunt sur la base de remboursements et d’un taux d’intérêt constants.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/pmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Obligatoire. Représente le taux d’intérêt de l’emprunt."
			},
			nper: {
				name: "nper",
				detail: "Obligatoire. Représente le nombre de remboursements pour l’emprunt."
			},
			pv: {
				name: "pv",
				detail: "Obligatoire. Représente la valeur actuelle ou la valeur que représente à la date d’aujourd’hui une série de remboursements futurs ; il s’agit du principal de l’emprunt."
			},
			fv: {
				name: "fv",
				detail: "Optionnel. Représente la valeur capitalisée, c’est-à-dire le montant que vous souhaitez obtenir après le dernier paiement. Si vc est omis, la valeur par défaut est 0 (zéro), c’est-à-dire que la valeur capitalisée d’un emprunt est égale à 0."
			},
			type: {
				name: "type",
				detail: "Optionnel. Représente le nombre 0 (zéro) ou 1 et indique quand les paiements doivent être effectués."
			}
		}
	},
	PPMT: {
		description: "Calcule, pour une période donnée, la part de remboursement du principal d’un investissement sur la base de remboursements périodiques et d’un taux d’intérêt constants.",
		abstract: "Calcule, pour une période donnée, la part de remboursement du principal d’un investissement sur la base de remboursements périodiques et d’un taux d’intérêt constants.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/ppmt-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Obligatoire. Représente le taux d’intérêt par période."
			},
			per: {
				name: "per",
				detail: "Obligatoire. Indique la période et doit être compris entre 1 et npm."
			},
			nper: {
				name: "nper",
				detail: "Obligatoire. Représente le nombre total de périodes de remboursement au cours de l’opération."
			},
			pv: {
				name: "pv",
				detail: "Obligatoire. Représente la valeur actuelle, c’est-à-dire la valeur que représente à la date d’aujourd’hui une série de remboursements futurs."
			},
			fv: {
				name: "fv",
				detail: "Optionnel. Représente la valeur capitalisée, c’est-à-dire le montant que vous souhaitez obtenir après le dernier paiement. Si vc est omis, la valeur par défaut est 0 (zéro), c’est-à-dire que la valeur capitalisée d’un emprunt est égale à 0."
			},
			type: {
				name: "type",
				detail: "Optionnel. Représente le nombre 0 ou 1, et indique quand les paiements doivent être effectués."
			}
		}
	},
	PRICE: {
		description: "Renvoie le prix d’un titre rapportant des intérêts périodiques, pour une valeur nominale de 100 €.",
		abstract: "Renvoie le prix d’un titre rapportant des intérêts périodiques, pour une valeur nominale de 100 €.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/price-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obligatoire. Représente la date de règlement du titre. Cette date correspond à la date suivant la date d’émission, lorsque le titre est cédé à l’acheteur."
			},
			maturity: {
				name: "maturity",
				detail: "Obligatoire. Représente la date d’échéance du titre. Cette date correspond à la date d’expiration du titre."
			},
			rate: {
				name: "rate",
				detail: "Obligatoire. Représente le taux annuel du coupon du titre."
			},
			yld: {
				name: "yld",
				detail: "Obligatoire. Représente le taux de rendement annuel du titre."
			},
			redemption: {
				name: "redemption",
				detail: "Obligatoire. Représente la valeur de remboursement du titre par tranche de valeur nominale de 100 €."
			},
			frequency: {
				name: "frequency",
				detail: "Obligatoire. Représente le nombre de coupons payés par an. Si le paiement est annuel, la fréquence = 1 ; s’il est semestriel, la fréquence = 2 ; et s’il est trimestriel, la fréquence = 4."
			},
			basis: {
				name: "basis",
				detail: "Optionnel. Représente le type de la base de comptage des jours à utiliser."
			}
		}
	},
	PRICEDISC: {
		description: "Renvoie la valeur d’encaissement d’un escompte sur un titre, pour une valeur nominale de 100 €.",
		abstract: "Renvoie la valeur d’encaissement d’un escompte sur un titre, pour une valeur nominale de 100 €.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/pricedisc-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obligatoire. Représente la date de règlement du titre. Cette date correspond à la date suivant la date d’émission, lorsque le titre est cédé à l’acheteur."
			},
			maturity: {
				name: "maturity",
				detail: "Obligatoire. Représente la date d’échéance du titre. Cette date correspond à la date d’expiration du titre."
			},
			discount: {
				name: "discount",
				detail: "Obligatoire. Représente le taux d’escompte du titre."
			},
			redemption: {
				name: "redemption",
				detail: "Obligatoire. Représente la valeur de remboursement du titre par tranche de valeur nominale de 100 €."
			},
			basis: {
				name: "basis",
				detail: "Optionnel. Représente le type de la base de comptage des jours à utiliser."
			}
		}
	},
	PRICEMAT: {
		description: "Renvoie le prix d’un titre dont la valeur nominale est 100 € et qui rapporte des intérêts à l’échéance.",
		abstract: "Renvoie le prix d’un titre dont la valeur nominale est 100 € et qui rapporte des intérêts à l’échéance.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/pricemat-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obligatoire. Représente la date de règlement du titre. Cette date correspond à la date suivant la date d’émission, lorsque le titre est cédé à l’acheteur."
			},
			maturity: {
				name: "maturity",
				detail: "Obligatoire. Représente la date d’échéance du titre. Cette date correspond à la date d’expiration du titre."
			},
			issue: {
				name: "issue",
				detail: "Obligatoire. Représente la date d’émission du titre, exprimée sous la forme d’un numéro de série."
			},
			rate: {
				name: "rate",
				detail: "Obligatoire. Représente le taux d’intérêt du titre à la date d’émission."
			},
			yld: {
				name: "yld",
				detail: "Obligatoire. Représente le taux de rendement annuel du titre."
			},
			basis: {
				name: "basis",
				detail: "Optionnel. Représente le type de la base de comptage des jours à utiliser."
			}
		}
	},
	PV: {
		description: "VA , l’une des fonctions Financier , calcule la valeur actuelle d’un emprunt ou d’un investissement sur la base d’un taux d’intérêt constant. Vous pouvez utiliser la fonction VA pour calculer des paiements périodiques et constants (comme un crédit immobilier ou tout autre type de prêt) ou la valeur capitalisée de votre objectif d’investissement.",
		abstract: "VA , l’une des fonctions Financier , calcule la valeur actuelle d’un emprunt ou d’un investissement sur la base d’un taux d’intérêt constant. Vous pouvez utiliser la fonction VA pour calculer des paiements périodiques et constants (comme un crédit immobilier ou tout autre type de prêt) ou la valeur capitalisée de votre objectif d’investissement.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/pv-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Obligatoire. Représente le taux d’intérêt par période. Par exemple, si vous obtenez un emprunt pour l’achat d’une voiture à un taux d’intérêt annuel de 10 % et que vos remboursements sont mensuels, le taux d’intérêt mensuel sera de 10 %/12, soit 0,83 %. Le chiffre entré dans la formule en tant que taux peut être 10 %/12, 0,83 % ou 0,0083."
			},
			nper: {
				name: "nper",
				detail: "Obligatoire. Représente le nombre total de périodes de paiement au cours de l’opération. Si, pour l’achat d’une voiture, vous obtenez un emprunt sur quatre ans, remboursable mensuellement, cet emprunt s’étend sur 4*12 (ou 48) périodes. Le chiffre entré dans la formule en tant qu’argument npm sera 48."
			},
			pmt: {
				name: "pmt",
				detail: "Obligatoire. Représente le montant du paiement pour chaque période et reste constant pendant toute la durée de l’opération. En règle générale, vpm comprend le montant principal et les intérêts mais exclut toute autre charge ou tout autre impôt. Par exemple, les paiements mensuels sur un prêt auto de 10 000 $ et de quatre ans à 12 % sont de 263,33 $. Vous devez entrer -263,33 dans la formule en tant que pmt. Si pmt est omis, vous devez inclure l’argument fv."
			},
			fv: {
				name: "fv",
				detail: "Optionnel. La valeur future ou le solde en espèces que vous souhaitez atteindre après le dernier paiement. Si vc est omis, la valeur par défaut est 0 (par exemple, la valeur capitalisée d’un emprunt est égale à 0). Ainsi, si vous souhaitez économiser 50 000 € pour financer un projet précis dans 18 ans, 50 000 € est la valeur capitalisée à atteindre. Vous pouvez faire une estimation du taux d’intérêt et déterminer le montant que vous devez épargner chaque mois. Si l’argument vc est omis, vous devez inclure l’argument vpm."
			},
			type: {
				name: "type",
				detail: "Optionnel. Représente le nombre 0 ou 1, et indique quand les paiements doivent être effectués."
			}
		}
	},
	RATE: {
		description: "Calcule le taux d’intérêt par période d’un investissement donné. La fonction TAUX est calculée par itération et peut n’avoir aucune solution ou en avoir plusieurs. La fonction renvoie la valeur d’erreur #NOMBRE! si, après 20 itérations, les résultats ne convergent pas à 0,0000001 près.",
		abstract: "Calcule le taux d’intérêt par période d’un investissement donné. La fonction TAUX est calculée par itération et peut n’avoir aucune solution ou en avoir plusieurs. La fonction renvoie la valeur d’erreur #NOMBRE! si, après 20 itérations, les résultats ne convergent pas à 0,0000001 près.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/rate-function"
		}],
		functionParameter: {
			nper: {
				name: "nper",
				detail: "Obligatoire. Représente le nombre total de périodes de remboursement au cours de l’opération."
			},
			pmt: {
				name: "pmt",
				detail: "Obligatoire. Représente le montant du paiement pour chaque période et reste constant pendant toute la durée de l’opération. En règle générale, vpm comprend le montant principal et les intérêts mais exclut toute autre charge ou tout autre impôt. Si l’argument vpm est omis, vous devez inclure l’argument vc."
			},
			pv: {
				name: "pv",
				detail: "Obligatoire. Représente la valeur actuelle, c’est-à-dire la valeur que représente à la date d’aujourd’hui une série de remboursements futurs."
			},
			fv: {
				name: "fv",
				detail: "Optionnel. Représente la valeur capitalisée, c’est-à-dire le montant que vous souhaitez obtenir après le dernier paiement. Si vc est omis, la valeur par défaut est 0 (par exemple, la valeur capitalisée d’un emprunt est égale à 0). Si l’argument vc est omis, vous devez inclure l’argument vpm."
			},
			type: {
				name: "type",
				detail: "Optionnel. Représente le nombre 0 ou 1, et indique quand les paiements doivent être effectués."
			},
			guess: {
				name: "guess",
				detail: "Optionnel. Représente votre estimation quant à la valeur du taux. Si l’argument estimation est omis, la valeur par défaut est 10 %. Si les résultats de la fonction TAUX ne convergent pas, essayez différentes valeurs pour l’argument estimation. Normalement, les résultats de TAUX convergent si l’argument estimation est compris entre 0 et 1."
			}
		}
	},
	RECEIVED: {
		description: "Renvoie le montant perçu à l’échéance pour un titre entièrement investi.",
		abstract: "Renvoie le montant perçu à l’échéance pour un titre entièrement investi.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/received-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obligatoire. Représente la date de règlement du titre. Cette date correspond à la date suivant la date d’émission, lorsque le titre est cédé à l’acheteur."
			},
			maturity: {
				name: "maturity",
				detail: "Obligatoire. Représente la date d’échéance du titre. Cette date correspond à la date d’expiration du titre."
			},
			investment: {
				name: "investment",
				detail: "Obligatoire. Représente le montant investi dans le titre."
			},
			discount: {
				name: "discount",
				detail: "Obligatoire. Représente le taux d’escompte du titre."
			},
			basis: {
				name: "basis",
				detail: "Optionnel. Représente le type de la base de comptage des jours à utiliser."
			}
		}
	},
	RRI: {
		description: "Renvoie un taux d’intérêt équivalent pour la croissance d’un investissement.",
		abstract: "Renvoie un taux d’intérêt équivalent pour la croissance d’un investissement.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/rri-function"
		}],
		functionParameter: {
			nper: {
				name: "nper",
				detail: "Obligatoire. Npm est le nombre de périodes pour l’investissement."
			},
			pv: {
				name: "pv",
				detail: "Obligatoire. Va représente la valeur actuelle de l’investissement."
			},
			fv: {
				name: "fv",
				detail: "Obligatoire. Vf est la valeur future de l’investissement."
			}
		}
	},
	SLN: {
		description: "Calcule l’amortissement linéaire d’un bien pour une période donnée.",
		abstract: "Calcule l’amortissement linéaire d’un bien pour une période donnée.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/sln-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Obligatoire. Représente le coût initial du bien."
			},
			salvage: {
				name: "salvage",
				detail: "Obligatoire. Représente la valeur du bien au terme de l’amortissement (aussi appelée valeur résiduelle du bien)."
			},
			life: {
				name: "life",
				detail: "Obligatoire. Représente le nombre de périodes pendant lesquelles le bien est amorti (aussi appelée durée de vie utile du bien)."
			}
		}
	},
	SYD: {
		description: "Calcule l’amortissement d’un bien pour une période donnée sur la base de la méthode américaine Sum-of-Years Digits (amortissement dégressif à taux décroissant appliqué à une valeur constante).",
		abstract: "Calcule l’amortissement d’un bien pour une période donnée sur la base de la méthode américaine Sum-of-Years Digits (amortissement dégressif à taux décroissant appliqué à une valeur constante).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/syd-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Obligatoire. Représente le coût initial du bien."
			},
			salvage: {
				name: "salvage",
				detail: "Obligatoire. Représente la valeur du bien au terme de l’amortissement (aussi appelée valeur résiduelle du bien)."
			},
			life: {
				name: "life",
				detail: "Obligatoire. Représente le nombre de périodes pendant lesquelles le bien est amorti (aussi appelée durée de vie utile du bien)."
			},
			per: {
				name: "per",
				detail: "Obligatoire. Représente la période et doit être exprimée dans la même unité que la durée."
			}
		}
	},
	TBILLEQ: {
		description: "Renvoie le taux d’escompte rationnel d’un bon du Trésor.",
		abstract: "Renvoie le taux d’escompte rationnel d’un bon du Trésor.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/tbilleq-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obligatoire. Représente la date de règlement du bon du Trésor. Cette date correspond à la date suivant la date d’émission, lorsque le bon du Trésor est cédé à l’acheteur."
			},
			maturity: {
				name: "maturity",
				detail: "Obligatoire. Représente la date d’échéance du bon du Trésor. Cette date correspond à la date d’expiration du bon du Trésor."
			},
			discount: {
				name: "discount",
				detail: "Obligatoire. Représente le taux d’escompte du bon du Trésor."
			}
		}
	},
	TBILLPRICE: {
		description: "Renvoie le prix d’un bon du Trésor d’une valeur nominale de 100 €.",
		abstract: "Renvoie le prix d’un bon du Trésor d’une valeur nominale de 100 €.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/tbillprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obligatoire. Représente la date de règlement du bon du Trésor. Cette date correspond à la date suivant la date d’émission, lorsque le bon du Trésor est cédé à l’acheteur."
			},
			maturity: {
				name: "maturity",
				detail: "Obligatoire. Représente la date d’échéance du bon du Trésor. Cette date correspond à la date d’expiration du bon du Trésor."
			},
			discount: {
				name: "discount",
				detail: "Obligatoire. Représente le taux d’escompte du bon du Trésor."
			}
		}
	},
	TBILLYIELD: {
		description: "Calcule le taux de rendement d’un bon du Trésor.",
		abstract: "Calcule le taux de rendement d’un bon du Trésor.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/tbillyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obligatoire. Représente la date de règlement du bon du Trésor. Cette date correspond à la date suivant la date d’émission, lorsque le bon du Trésor est cédé à l’acheteur."
			},
			maturity: {
				name: "maturity",
				detail: "Obligatoire. Représente la date d’échéance du bon du Trésor. Cette date correspond à la date d’expiration du bon du Trésor."
			},
			pr: {
				name: "pr",
				detail: "Obligatoire. Représente le prix du bon du Trésor par tranche de valeur nominale de 100 €."
			}
		}
	},
	VDB: {
		description: "Calcule l’amortissement d’un bien pour toute période spécifiée, y compris une période partielle, en utilisant la méthode de l’amortissement dégressif à taux double ou selon un coefficient à spécifier. VDB signifie « variable declining balance », qui est l’équivalent d’amortissement dégressif à taux variable.",
		abstract: "Calcule l’amortissement d’un bien pour toute période spécifiée, y compris une période partielle, en utilisant la méthode de l’amortissement dégressif à taux double ou selon un coefficient à spécifier. VDB signifie « variable declining balance », qui est l’équivalent d’amortissement dégressif à taux variable.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/vdb-function"
		}],
		functionParameter: {
			cost: {
				name: "cost",
				detail: "Obligatoire. Représente le coût initial du bien."
			},
			salvage: {
				name: "salvage",
				detail: "Obligatoire. Représente la valeur du bien au terme de l’amortissement (aussi appelée valeur résiduelle du bien). Cette valeur peut être 0."
			},
			life: {
				name: "life",
				detail: "Obligatoire. Représente le nombre de périodes pendant lesquelles le bien est amorti (aussi appelée durée de vie utile du bien)."
			},
			startPeriod: {
				name: "start_period",
				detail: "Obligatoire. Représente le début de la période pour laquelle vous voulez calculer un amortissement. L’argument période_début doit être exprimé dans la même unité que durée."
			},
			endPeriod: {
				name: "end_period",
				detail: "Obligatoire. Représente la fin de la période pour laquelle vous voulez calculer un amortissement. L’argument période_fin doit être exprimé dans la même unité que l’argument durée."
			},
			factor: {
				name: "factor",
				detail: "Optionnel. Représente le taux de l’amortissement dégressif. Si facteur est omis, la valeur par défaut est 2 (méthode de l’amortissement dégressif à taux double). Modifiez la valeur de facteur si vous ne souhaitez pas utiliser la méthode de l’amortissement dégressif à taux double. Pour plus d’informations sur cette méthode, reportez-vous à la fonction DDB."
			},
			noSwitch: {
				name: "no_switch",
				detail: "Optionnel. Représente une valeur logique indiquant s’il faut utiliser la méthode de l’amortissement linéaire lorsqu’elle donne un résultat supérieur à celui obtenu avec la méthode de l’amortissement dégressif. Si valeur_log est VRAI, Microsoft Excel n’applique pas la méthode de l’amortissement linéaire, même si cette méthode donne un résultat supérieur à celui qui serait obtenu avec la méthode de l’amortissement dégressif. Si l’argument valeur_log est FAUX ou omis, Microsoft Excel applique la méthode de l’amortissement linéaire lorsque cette méthode donne un résultat supérieur à celui qui serait obtenu avec la méthode de l’amortissement dégressif."
			}
		}
	},
	XIRR: {
		description: "Calcule le taux de rentabilité interne d’un ensemble de paiements. Pour calculer le taux de rentabilité interne d’un ensemble de paiements périodiques, utilisez la fonction TRI.",
		abstract: "Calcule le taux de rentabilité interne d’un ensemble de paiements. Pour calculer le taux de rentabilité interne d’un ensemble de paiements périodiques, utilisez la fonction TRI.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/xirr-function"
		}],
		functionParameter: {
			values: {
				name: "values",
				detail: "Obligatoire. Représente une série de flux nets de trésorerie correspondant à l’échéancier de paiement déterminé par l’argument date. Le premier paiement, facultatif, représente le coût ou le versement éventuellement effectué en début de période d’investissement. Si la première valeur est un coût ou un paiement, elle doit être négative. Tous les paiements qui suivent sont actualisés sur la base d’une année de 365 jours. La série de valeurs doit contenir au moins une valeur positive et une valeur négative."
			},
			dates: {
				name: "dates",
				detail: "Obligatoire. Représente l’échéancier de paiement correspondant aux flux nets de trésorerie. Les dates peuvent se produire dans n’importe quel ordre. Les dates doivent être entrées en utilisant la fonction DATE, ou sous la forme de résultats d’autres formules ou fonctions. Par exemple, utilisez DATE(2008;5;23) pour le 23e jour du mois de mai 2008. Des problèmes peuvent survenir si les dates sont entrées sous forme de texte. ."
			},
			guess: {
				name: "guess",
				detail: "Optionnel. Représente un nombre que vous supposez proche du résultat attendu de la fonction TRI.PAIEMENTS."
			}
		}
	},
	XNPV: {
		description: "Donne la valeur actuelle nette d’un ensemble de paiements. Pour calculer la valeur actuelle nette d’un ensemble de paiements périodiques, utilisez la fonction VAN.",
		abstract: "Donne la valeur actuelle nette d’un ensemble de paiements. Pour calculer la valeur actuelle nette d’un ensemble de paiements périodiques, utilisez la fonction VAN.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/xnpv-function"
		}],
		functionParameter: {
			rate: {
				name: "rate",
				detail: "Obligatoire. Représente le taux d’actualisation applicable aux flux nets de trésorerie."
			},
			values: {
				name: "values",
				detail: "Obligatoire. Représente une série de flux nets de trésorerie correspondant à l’échéancier de paiement déterminé par l’argument date. Le premier paiement, facultatif, représente le coût ou le versement éventuellement effectué en début de période d’investissement. Si la première valeur est un coût ou un paiement, elle doit être négative. Tous les paiements qui suivent sont actualisés sur la base d’une année de 365 jours. La série de valeurs doit contenir au moins une valeur positive et une valeur négative."
			},
			dates: {
				name: "dates",
				detail: "Obligatoire. Représente l’échéancier de paiement correspondant aux flux nets de trésorerie. La première date de paiement indique le point de départ de l’échéancier. Toutes les autres dates doivent lui être postérieures, mais leur ordre d’intervention est indifférent."
			}
		}
	},
	YIELD: {
		description: "Calcule le rendement d’un titre rapportant des intérêts périodiquement. Utilisez la fonction RENDEMENT.TITRE pour calculer le taux de rendement d’une obligation.",
		abstract: "Calcule le rendement d’un titre rapportant des intérêts périodiquement. Utilisez la fonction RENDEMENT.TITRE pour calculer le taux de rendement d’une obligation.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/yield-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obligatoire. Représente la date de règlement du titre. Cette date correspond à la date suivant la date d’émission, lorsque le titre est cédé à l’acheteur."
			},
			maturity: {
				name: "maturity",
				detail: "Obligatoire. Représente la date d’échéance du titre. Cette date correspond à la date d’expiration du titre."
			},
			rate: {
				name: "rate",
				detail: "Obligatoire. Représente le taux annuel du coupon du titre."
			},
			pr: {
				name: "pr",
				detail: "Obligatoire. Représente le prix du titre par tranche de valeur nominale de 100 €."
			},
			redemption: {
				name: "redemption",
				detail: "Obligatoire. Représente la valeur de remboursement du titre par tranche de valeur nominale de 100 €."
			},
			frequency: {
				name: "frequency",
				detail: "Obligatoire. Représente le nombre de coupons payés par an. Si le paiement est annuel, la fréquence = 1 ; s’il est semestriel, la fréquence = 2 ; et s’il est trimestriel, la fréquence = 4."
			},
			basis: {
				name: "basis",
				detail: "Optionnel. Représente le type de la base de comptage des jours à utiliser."
			}
		}
	},
	YIELDDISC: {
		description: "Calcule le taux de rendement d’un emprunt à intérêt simple.",
		abstract: "Calcule le taux de rendement d’un emprunt à intérêt simple.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/yielddisc-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obligatoire. Représente la date de règlement du titre. Cette date correspond à la date suivant la date d’émission, lorsque le titre est cédé à l’acheteur."
			},
			maturity: {
				name: "maturity",
				detail: "Obligatoire. Représente la date d’échéance du titre. Cette date correspond à la date d’expiration du titre."
			},
			pr: {
				name: "pr",
				detail: "Obligatoire. Représente le prix du titre par tranche de valeur nominale de 100 €."
			},
			redemption: {
				name: "redemption",
				detail: "Obligatoire. Représente la valeur de remboursement du titre par tranche de valeur nominale de 100 €."
			},
			basis: {
				name: "basis",
				detail: "Optionnel. Représente le type de la base de comptage des jours à utiliser."
			}
		}
	},
	YIELDMAT: {
		description: "Renvoie le rendement annuel d’un titre qui rapporte des intérêts à l’échéance.",
		abstract: "Renvoie le rendement annuel d’un titre qui rapporte des intérêts à l’échéance.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/yieldmat-function"
		}],
		functionParameter: {
			settlement: {
				name: "settlement",
				detail: "Obligatoire. Représente la date de règlement du titre. Cette date correspond à la date suivant la date d’émission, lorsque le titre est cédé à l’acheteur."
			},
			maturity: {
				name: "maturity",
				detail: "Obligatoire. Représente la date d’échéance du titre. Cette date correspond à la date d’expiration du titre."
			},
			issue: {
				name: "issue",
				detail: "Obligatoire. Représente la date d’émission du titre, exprimée sous la forme d’un numéro de série."
			},
			rate: {
				name: "rate",
				detail: "Obligatoire. Représente le taux d’intérêt du titre à la date d’émission."
			},
			pr: {
				name: "pr",
				detail: "Obligatoire. Représente le prix du titre par tranche de valeur nominale de 100 €."
			},
			basis: {
				name: "basis",
				detail: "Optionnel. Représente le type de la base de comptage des jours à utiliser."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/information/fr-FR.ts
const locale$8 = {
	CELL: {
		description: "La fonction CELLULE renvoie des informations sur la mise en forme, l’emplacement ou le contenu d’une cellule. Par exemple, si vous voulez vérifier qu’une cellule contient bien une valeur numérique et non du texte avant de l’inclure dans un calcul, vous pouvez utiliser la formule suivante :",
		abstract: "La fonction CELLULE renvoie des informations sur la mise en forme, l’emplacement ou le contenu d’une cellule. Par exemple, si vous voulez vérifier qu’une cellule contient bien une valeur numérique et non du texte avant de l’inclure dans un calcul, vous pouvez utiliser la formule suivante :",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/cell-function"
		}],
		functionParameter: {
			infoType: {
				name: "info_type",
				detail: "Valeur de texte qui spécifie le type d’informations de cellule que vous voulez obtenir. La liste suivante affiche les valeurs possibles de l’argument type_info et les résultats correspondants."
			},
			reference: {
				name: "reference",
				detail: "Représente la cellule dont vous voulez obtenir des informations. En cas d’omission, les informations spécifiées dans l’argument info_type sont retournées pour la cellule sélectionnée au moment du calcul. Si l’argument référence est une plage de cellules, la fonction CELL renvoie les informations relatives à la cellule active dans la plage sélectionnée. Important: Bien que la référence technique soit facultative, il est recommandé de l’inclure dans votre formule, sauf si vous comprenez l’effet de son absence sur le résultat de votre formule et que vous souhaitez que cet effet soit en place. L’omission de l’argument de référence ne produit pas de manière fiable des informations sur une cellule spécifique, pour les raisons suivantes : En mode de calcul automatique, lorsqu’une cellule est modifiée par un utilisateur, le calcul peut être déclenché avant ou après la progression de la sélection, en fonction de la plateforme que vous utilisez pour Excel. Par exemple, Excel pour Windows déclenche actuellement le calcul avant la modification de la sélection, mais Excel sur le Web le déclenche par la suite. Lorsque Co-Authoring avec un autre utilisateur qui effectue une modification, cette fonction signale votre cellule active plutôt que celle de l’éditeur. Tout recalcul, pour instance appuyant sur F9, entraîne le retour d’un nouveau résultat par la fonction même si aucune modification de cellule n’a eu lieu."
			}
		}
	},
	ERROR_TYPE: {
		description: "Renvoie un nombre correspondant à l’une des valeurs d’erreur de Microsoft Excel ou la valeur #N/A s’il n’y a pas d’erreur. Vous pouvez utiliser la fonction TYPE.ERREUR dans une fonction SI pour tester une valeur d’erreur et renvoyer une chaîne de caractères telle qu’un message à la place de la valeur d’erreur.",
		abstract: "Renvoie un nombre correspondant à l’une des valeurs d’erreur de Microsoft Excel ou la valeur #N/A s’il n’y a pas d’erreur. Vous pouvez utiliser la fonction TYPE.ERREUR dans une fonction SI pour tester une valeur d’erreur et renvoyer une chaîne de caractères telle qu’un message à la place de la valeur d’erreur.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/error-type-function"
		}],
		functionParameter: { errorVal: {
			name: "error_val",
			detail: "Obligatoire. Il s’agit de la valeur d’erreur dont vous voulez trouver le numéro. Bien que l’argument valeur puisse être une valeur d’erreur proprement dite, il est généralement donné sous forme de référence à une cellule contenant une formule que vous souhaitez tester."
		} }
	},
	INFO: {
		description: "Renvoie des informations sur l’environnement d’exploitation en cours.",
		abstract: "Renvoie des informations sur l’environnement d’exploitation en cours.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/info-function"
		}],
		functionParameter: { typeText: {
			name: "Type_text",
			detail: "Obligatoire. Représente le texte qui spécifie le type d’informations à renvoyer."
		} }
	},
	ISBETWEEN: {
		description: "Vérifie si le nombre fourni est compris entre deux autres nombres (inclus ou exclus).",
		abstract: "Vérifie si le nombre fourni est compris entre deux autres nombres (inclus ou exclus).",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/10538337?hl=fr"
		}],
		functionParameter: {
			valueToCompare: {
				name: "value_to_compare",
				detail: "Valeur à tester comme se trouvant entre \"valeur_inférieure\" et \"valeur_supérieure\"."
			},
			lowerValue: {
				name: "lower_value",
				detail: "Limite inférieure de la plage de valeurs dans laquelle peut se trouver \"valeur_à_comparer\"."
			},
			upperValue: {
				name: "upper_value",
				detail: "Limite supérieure de la plage de valeurs dans laquelle peut se trouver \"valeur_à_comparer\"."
			},
			lowerValueIsInclusive: {
				name: "lower_value_is_inclusive",
				detail: "Détermine si la plage de valeurs inclut \"valeur_inférieure\". TRUE par défaut"
			},
			upperValueIsInclusive: {
				name: "upper_value_is_inclusive",
				detail: "Détermine si la plage de valeurs inclut \"valeur_supérieure\". TRUE par défaut"
			}
		}
	},
	ISBLANK: {
		description: "Chacune de ces fonctions, regroupées sous l’appellation de fonctions EST , vérifie la valeur spécifiée et renvoie VRAI ou FAUX, selon le cas. Par exemple, la fonction ESTVIDE renvoie la valeur logique VRAI si l’argument valeur est une référence à une cellule vide et la valeur logique FAUX dans les autres cas.",
		abstract: "Chacune de ces fonctions, regroupées sous l’appellation de fonctions EST , vérifie la valeur spécifiée et renvoie VRAI ou FAUX, selon le cas. Par exemple, la fonction ESTVIDE renvoie la valeur logique VRAI si l’argument valeur est une référence à une cellule vide et la valeur logique FAUX dans les autres cas.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obligatoire. Valeur à tester. L’argument valeur peut être une valeur vide (cellule vide), d’erreur, une valeur logique, de texte, de nombre ou une valeur de référence ou un nom s’y référant."
		} }
	},
	ISDATE: {
		description: "La fonction ISDATE indique si une valeur est une date.",
		abstract: "La fonction ISDATE indique si une valeur est une date.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9061381?hl=fr"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Valeur à vérifier en tant que date."
		} }
	},
	ISEMAIL: {
		description: "Pour vérifier si une valeur est une adresse e-mail valide, utilisez la fonction ISEMAIL. Cette vérification permet de déterminer si la valeur suit un format d'adresse e-mail couramment accepté, mais ne vérifie pas son existence.",
		abstract: "Pour vérifier si une valeur est une adresse e-mail valide, utilisez la fonction ISEMAIL. Cette vérification permet de déterminer si la valeur suit un format d'adresse e-mail couramment accepté, mais ne vérifie pas son existence.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3256503?hl=fr"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "ISEMAIL(\"johndoe@yourname.com\")"
		} }
	},
	ISERR: {
		description: "Chacune de ces fonctions, regroupées sous l’appellation de fonctions EST , vérifie la valeur spécifiée et renvoie VRAI ou FAUX, selon le cas. Par exemple, la fonction ESTVIDE renvoie la valeur logique VRAI si l’argument valeur est une référence à une cellule vide et la valeur logique FAUX dans les autres cas.",
		abstract: "Chacune de ces fonctions, regroupées sous l’appellation de fonctions EST , vérifie la valeur spécifiée et renvoie VRAI ou FAUX, selon le cas. Par exemple, la fonction ESTVIDE renvoie la valeur logique VRAI si l’argument valeur est une référence à une cellule vide et la valeur logique FAUX dans les autres cas.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obligatoire. Valeur à tester. L’argument valeur peut être une valeur vide (cellule vide), d’erreur, une valeur logique, de texte, de nombre ou une valeur de référence ou un nom s’y référant."
		} }
	},
	ISERROR: {
		description: "Chacune de ces fonctions, regroupées sous l’appellation de fonctions EST , vérifie la valeur spécifiée et renvoie VRAI ou FAUX, selon le cas. Par exemple, la fonction ESTVIDE renvoie la valeur logique VRAI si l’argument valeur est une référence à une cellule vide et la valeur logique FAUX dans les autres cas.",
		abstract: "Chacune de ces fonctions, regroupées sous l’appellation de fonctions EST , vérifie la valeur spécifiée et renvoie VRAI ou FAUX, selon le cas. Par exemple, la fonction ESTVIDE renvoie la valeur logique VRAI si l’argument valeur est une référence à une cellule vide et la valeur logique FAUX dans les autres cas.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obligatoire. Valeur à tester. L’argument valeur peut être une valeur vide (cellule vide), d’erreur, une valeur logique, de texte, de nombre ou une valeur de référence ou un nom s’y référant."
		} }
	},
	ISEVEN: {
		description: "Renvoie la valeur VRAI si le nombre est pair et FAUX s’il est impair.",
		abstract: "Renvoie la valeur VRAI si le nombre est pair et FAUX s’il est impair.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/iseven-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obligatoire. Représente la valeur à tester. Si nombre n’est pas un nombre entier, il est tronqué à sa partie entière."
		} }
	},
	ISFORMULA: {
		description: "Vérifie s’il existe une référence à une cellule qui contient une formule et renvoie VRAI ou FAUX.",
		abstract: "Vérifie s’il existe une référence à une cellule qui contient une formule et renvoie VRAI ou FAUX.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/isformula-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "Obligatoire. Référence est une référence à la cellule que vous souhaitez tester. Référence peut être une référence de cellule, une formule ou un nom qui fait référence à une cellule."
		} }
	},
	ISLOGICAL: {
		description: "Chacune de ces fonctions, regroupées sous l’appellation de fonctions EST , vérifie la valeur spécifiée et renvoie VRAI ou FAUX, selon le cas. Par exemple, la fonction ESTVIDE renvoie la valeur logique VRAI si l’argument valeur est une référence à une cellule vide et la valeur logique FAUX dans les autres cas.",
		abstract: "Chacune de ces fonctions, regroupées sous l’appellation de fonctions EST , vérifie la valeur spécifiée et renvoie VRAI ou FAUX, selon le cas. Par exemple, la fonction ESTVIDE renvoie la valeur logique VRAI si l’argument valeur est une référence à une cellule vide et la valeur logique FAUX dans les autres cas.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obligatoire. Valeur à tester. L’argument valeur peut être une valeur vide (cellule vide), d’erreur, une valeur logique, de texte, de nombre ou une valeur de référence ou un nom s’y référant."
		} }
	},
	ISNA: {
		description: "Chacune de ces fonctions, regroupées sous l’appellation de fonctions EST , vérifie la valeur spécifiée et renvoie VRAI ou FAUX, selon le cas. Par exemple, la fonction ESTVIDE renvoie la valeur logique VRAI si l’argument valeur est une référence à une cellule vide et la valeur logique FAUX dans les autres cas.",
		abstract: "Chacune de ces fonctions, regroupées sous l’appellation de fonctions EST , vérifie la valeur spécifiée et renvoie VRAI ou FAUX, selon le cas. Par exemple, la fonction ESTVIDE renvoie la valeur logique VRAI si l’argument valeur est une référence à une cellule vide et la valeur logique FAUX dans les autres cas.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obligatoire. Valeur à tester. L’argument valeur peut être une valeur vide (cellule vide), d’erreur, une valeur logique, de texte, de nombre ou une valeur de référence ou un nom s’y référant."
		} }
	},
	ISNONTEXT: {
		description: "Chacune de ces fonctions, regroupées sous l’appellation de fonctions EST , vérifie la valeur spécifiée et renvoie VRAI ou FAUX, selon le cas. Par exemple, la fonction ESTVIDE renvoie la valeur logique VRAI si l’argument valeur est une référence à une cellule vide et la valeur logique FAUX dans les autres cas.",
		abstract: "Chacune de ces fonctions, regroupées sous l’appellation de fonctions EST , vérifie la valeur spécifiée et renvoie VRAI ou FAUX, selon le cas. Par exemple, la fonction ESTVIDE renvoie la valeur logique VRAI si l’argument valeur est une référence à une cellule vide et la valeur logique FAUX dans les autres cas.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obligatoire. Valeur à tester. L’argument valeur peut être une valeur vide (cellule vide), d’erreur, une valeur logique, de texte, de nombre ou une valeur de référence ou un nom s’y référant."
		} }
	},
	ISNUMBER: {
		description: "Chacune de ces fonctions, regroupées sous l’appellation de fonctions EST , vérifie la valeur spécifiée et renvoie VRAI ou FAUX, selon le cas. Par exemple, la fonction ESTVIDE renvoie la valeur logique VRAI si l’argument valeur est une référence à une cellule vide et la valeur logique FAUX dans les autres cas.",
		abstract: "Chacune de ces fonctions, regroupées sous l’appellation de fonctions EST , vérifie la valeur spécifiée et renvoie VRAI ou FAUX, selon le cas. Par exemple, la fonction ESTVIDE renvoie la valeur logique VRAI si l’argument valeur est une référence à une cellule vide et la valeur logique FAUX dans les autres cas.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obligatoire. Valeur à tester. L’argument valeur peut être une valeur vide (cellule vide), d’erreur, une valeur logique, de texte, de nombre ou une valeur de référence ou un nom s’y référant."
		} }
	},
	ISODD: {
		description: "Renvoie la valeur VRAI si nombre est impair et FAUX si nombre est pair.",
		abstract: "Renvoie la valeur VRAI si nombre est impair et FAUX si nombre est pair.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/isodd-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obligatoire. Représente la valeur à tester. Si nombre n’est pas un nombre entier, il est tronqué à sa partie entière."
		} }
	},
	ISOMITTED: {
		description: "Vérifie si la valeur d’un lambda est manquante et retourne TRUE ou FALSE.",
		abstract: "Vérifie si la valeur d’un lambda est manquante et retourne TRUE ou FALSE.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/isomitted-function"
		}],
		functionParameter: { argument: {
			name: "Argument",
			detail: "Valeur que vous souhaitez tester, telle qu’un paramètre LAMBDA."
		} }
	},
	ISREF: {
		description: "Chacune de ces fonctions, regroupées sous l’appellation de fonctions EST , vérifie la valeur spécifiée et renvoie VRAI ou FAUX, selon le cas. Par exemple, la fonction ESTVIDE renvoie la valeur logique VRAI si l’argument valeur est une référence à une cellule vide et la valeur logique FAUX dans les autres cas.",
		abstract: "Chacune de ces fonctions, regroupées sous l’appellation de fonctions EST , vérifie la valeur spécifiée et renvoie VRAI ou FAUX, selon le cas. Par exemple, la fonction ESTVIDE renvoie la valeur logique VRAI si l’argument valeur est une référence à une cellule vide et la valeur logique FAUX dans les autres cas.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obligatoire. Valeur à tester. L’argument valeur peut être une valeur vide (cellule vide), d’erreur, une valeur logique, de texte, de nombre ou une valeur de référence ou un nom s’y référant."
		} }
	},
	ISTEXT: {
		description: "Chacune de ces fonctions, regroupées sous l’appellation de fonctions EST , vérifie la valeur spécifiée et renvoie VRAI ou FAUX, selon le cas. Par exemple, la fonction ESTVIDE renvoie la valeur logique VRAI si l’argument valeur est une référence à une cellule vide et la valeur logique FAUX dans les autres cas.",
		abstract: "Chacune de ces fonctions, regroupées sous l’appellation de fonctions EST , vérifie la valeur spécifiée et renvoie VRAI ou FAUX, selon le cas. Par exemple, la fonction ESTVIDE renvoie la valeur logique VRAI si l’argument valeur est une référence à une cellule vide et la valeur logique FAUX dans les autres cas.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obligatoire. Valeur à tester. L’argument valeur peut être une valeur vide (cellule vide), d’erreur, une valeur logique, de texte, de nombre ou une valeur de référence ou un nom s’y référant."
		} }
	},
	ISURL: {
		description: "Vérifie si une valeur est une URL valide.",
		abstract: "Vérifie si une valeur est une URL valide.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3256501?hl=fr"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "ISURL(\"www.google.com\")"
		} }
	},
	N: {
		description: "Renvoie une valeur convertie en nombre.",
		abstract: "Renvoie une valeur convertie en nombre.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/n-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obligatoire. Représente la valeur à convertir. N convertit les valeurs en suivant les règles décrites dans le tableau suivant."
		} }
	},
	NA: {
		description: "Retourne la valeur d’erreur #N/A. #N/A est la valeur d’erreur qui signifie « aucune valeur n’est disponible ». Utilisez NA pour marquer des cellules vides. En entrant #N/A dans les cellules où vous manquez des informations, vous pouvez éviter le problème d’inclure involontairement des cellules vides dans vos calculs. (Lorsqu’une formule fait référence à une cellule contenant #N/A, la formule renvoie la valeur d’erreur #N/A.)",
		abstract: "Retourne la valeur d’erreur #N/A. #N/A est la valeur d’erreur qui signifie « aucune valeur n’est disponible ». Utilisez NA pour marquer des cellules vides. En entrant #N/A dans les cellules où vous manquez des informations, vous pouvez éviter le problème d’inclure involontairement des cellules vides dans vos calculs. (Lorsqu’une formule fait référence à une cellule contenant #N/A, la formule renvoie la valeur d’erreur #N/A.)",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/na-function"
		}],
		functionParameter: {}
	},
	SHEET: {
		description: "La fonction SHEET retourne le numéro de feuille de la feuille spécifiée ou une autre référence.",
		abstract: "La fonction SHEET retourne le numéro de feuille de la feuille spécifiée ou une autre référence.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/sheet-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Argument facultatif. Utilisez cette option pour spécifier le nom d’une feuille ou d’une référence pour laquelle vous souhaitez obtenir le numéro de feuille. Sinon, la fonction retourne le numéro de la feuille contenant la fonction SHEET."
		} }
	},
	SHEETS: {
		description: "Renvoie le nombre de feuilles dans une référence.",
		abstract: "Renvoie le nombre de feuilles dans une référence.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/sheets-function"
		}],
		functionParameter: {}
	},
	TYPE: {
		description: "Renvoie un nombre indiquant le type de données d’une valeur.",
		abstract: "Renvoie un nombre indiquant le type de données d’une valeur.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/type-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Peut être n’importe quelle valeur, par exemple un nombre, du texte ou une valeur logique."
		} }
	}
};

//#endregion
//#region src/locale/function-list/logical/fr-FR.ts
const locale$7 = {
	AND: {
		description: "La fonction ET renvoie la valeur VRAI si tous ses arguments produisent un résultat vrai, et la valeur FAUX si au moins l’un des arguments produit un résultat faux.",
		abstract: "La fonction ET renvoie la valeur VRAI si tous ses arguments produisent un résultat vrai, et la valeur FAUX si au moins l’un des arguments produit un résultat faux.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/and-function"
		}],
		functionParameter: {
			logical1: {
				name: "logical1",
				detail: "Première condition à tester, pouvant prendre la valeur TRUE ou FALSE."
			},
			logical2: {
				name: "logical2",
				detail: "Conditions supplémentaires à tester, pouvant prendre la valeur TRUE ou FALSE, dans la limite de 255 conditions."
			}
		}
	},
	BYCOL: {
		description: "Applique une expression LAMBDA à chaque colonne et retourne un tableau des résultats. Par exemple, si le tableau d’origine est de 3 colonnes par 2 lignes, le tableau retourné est de 3 colonnes par 1 ligne.",
		abstract: "Applique une expression LAMBDA à chaque colonne et retourne un tableau des résultats. Par exemple, si le tableau d’origine est de 3 colonnes par 2 lignes, le tableau retourné est de 3 colonnes par 1 ligne.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/bycol-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Tableau à séparer par colonne."
			},
			lambda: {
				name: "lambda",
				detail: "Lambda qui prend une colonne comme paramètre unique et calcule un résultat. LambDA accepte un seul paramètre :"
			}
		}
	},
	BYROW: {
		description: "Applique un lambda à chaque ligne et retourne un tableau des résultats. Par exemple, si le tableau d’origine est de 3 colonnes par 2 lignes, le tableau retourné est de 1 colonne par 2 lignes.",
		abstract: "Applique un lambda à chaque ligne et retourne un tableau des résultats. Par exemple, si le tableau d’origine est de 3 colonnes par 2 lignes, le tableau retourné est de 1 colonne par 2 lignes.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/byrow-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Tableau à séparer par ligne."
			},
			lambda: {
				name: "lambda",
				detail: "Lambda qui prend une ligne comme paramètre unique et calcule un résultat. LambDA accepte un seul paramètre :"
			}
		}
	},
	FALSE: {
		description: "Renvoie la valeur logique FAUX.",
		abstract: "Renvoie la valeur logique FAUX.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/false-function"
		}],
		functionParameter: {}
	},
	IF: {
		description: "Par exemple, SI(C2=\"Oui\";1;2) indique SI(C2 = Oui, renvoyer un 1, sinon renvoyer un 2)",
		abstract: "Par exemple, SI(C2=\"Oui\";1;2) indique SI(C2 = Oui, renvoyer un 1, sinon renvoyer un 2)",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/if-function"
		}],
		functionParameter: {
			logicalTest: {
				name: "logical_test",
				detail: "Condition que vous souhaitez tester."
			},
			valueIfTrue: {
				name: "value_if_true",
				detail: "Valeur que vous souhaitez retourner si le résultat de logical_test est TRUE."
			},
			valueIfFalse: {
				name: "value_if_false",
				detail: "Valeur que vous souhaitez retourner si le résultat de logical_test est FALSE."
			}
		}
	},
	IFERROR: {
		description: "Vous pouvez utiliser la fonction SIERREUR pour gérer les erreurs dans une formule. La fonction SIERREUR renvoie une valeur que vous spécifiez si une formule génère une erreur ; sinon, elle renvoie le résultat de la formule.",
		abstract: "Vous pouvez utiliser la fonction SIERREUR pour gérer les erreurs dans une formule. La fonction SIERREUR renvoie une valeur que vous spécifiez si une formule génère une erreur ; sinon, elle renvoie le résultat de la formule.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/iferror-function"
		}],
		functionParameter: {
			value: {
				name: "value",
				detail: "Obligatoire. Représente l’argument vérifié."
			},
			valueIfError: {
				name: "value_if_error",
				detail: "Obligatoire. Représente la valeur à renvoyer si une formule génère une erreur. Les types d’erreur suivants sont évalués : #N/A, #VALEUR!, #REF!, #DIV/0!, #NOMBRE!, #NOM?, ou #NUL!."
			}
		}
	},
	IFNA: {
		description: "La fonction IFNA retourne la valeur que vous spécifiez si une formule retourne la valeur d’erreur #N/A ; sinon, elle retourne le résultat de la formule.",
		abstract: "La fonction IFNA retourne la valeur que vous spécifiez si une formule retourne la valeur d’erreur #N/A ; sinon, elle retourne le résultat de la formule.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/ifna-function"
		}],
		functionParameter: {
			value: {
				name: "value",
				detail: "L’argument dans lequel la valeur d’erreur #N/A est contrôlée."
			},
			valueIfNa: {
				name: "value_if_na",
				detail: "La valeur à retourner si la formule produit une valeur d’erreur #N/A."
			}
		}
	},
	IFS: {
		description: "La fonction SI.CONDITIONS vérifie si une ou plusieurs conditions sont remplies et renvoie une valeur correspondant à la première condition vraie. L’utilisation de cette fonction revient à utiliser plusieurs instructions SI imbriquées, mais elle reste bien plus facile à lire quand plusieurs conditions se suivent.",
		abstract: "La fonction SI.CONDITIONS vérifie si une ou plusieurs conditions sont remplies et renvoie une valeur correspondant à la première condition vraie. L’utilisation de cette fonction revient à utiliser plusieurs instructions SI imbriquées, mais elle reste bien plus facile à lire quand plusieurs conditions se suivent.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/ifs-function"
		}],
		functionParameter: {
			logicalTest1: {
				name: "logical_test1",
				detail: "Condition qui renvoie TRUE ou FALSE."
			},
			valueIfTrue1: {
				name: "value_if_true1",
				detail: "Résultat à renvoyer si logical_test1 renvoie TRUE. Peut être vide."
			},
			logicalTest2: {
				name: "logical_test2",
				detail: "Condition qui renvoie TRUE ou FALSE."
			},
			valueIfTrue2: {
				name: "value_if_true2",
				detail: "Résultat à renvoyer si logical_testN renvoie TRUE. Chaque value_if_trueN correspond à une condition logical_testN. Peut être vide."
			}
		}
	},
	LAMBDA: {
		description: "Vous pouvez créer une fonction pour une formule couramment utilisée. Cela vous permet de ne plus copier-coller cette formule, ce qui peut entraîner des erreurs. Vous pouvez également ajouter de façon efficace vos propres fonctions à la bibliothèque de fonctions Excel native. En outre, une fonction LAMBDA ne nécessite pas de VBA, de macros ou de JavaScript, de sorte que les non-programmeurs peuvent également tirer parti de son utilisation.",
		abstract: "Vous pouvez créer une fonction pour une formule couramment utilisée. Cela vous permet de ne plus copier-coller cette formule, ce qui peut entraîner des erreurs. Vous pouvez également ajouter de façon efficace vos propres fonctions à la bibliothèque de fonctions Excel native. En outre, une fonction LAMBDA ne nécessite pas de VBA, de macros ou de JavaScript, de sorte que les non-programmeurs peuvent également tirer parti de son utilisation.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/lambda-function"
		}],
		functionParameter: {
			parameter: {
				name: "parameter",
				detail: "Une valeur que vous souhaitez transmettre à la fonction, comme une référence de cellule, une chaîne ou un nombre. Vous pouvez entrer jusqu’à 253 paramètres. Cet argument est facultatif."
			},
			calculation: {
				name: "calculation",
				detail: "La formule que vous souhaitez exécuter et renvoyer comme résultat de la fonction. Cette formule doit être le dernier argument et doit renvoyer un résultat. Il s’agit d’un argument obligatoire."
			}
		}
	},
	LET: {
		description: "La LET fonction affecte des noms aux résultats de calcul. Cela permet de stocker des calculs intermédiaires, des valeurs ou de définir des noms à l'intérieur d'une formule. Ces noms s’appliquent uniquement dans l’étendue de la LET fonction. À l’instar des variables en programmation, LET s’effectue par le biais de la syntaxe de formule native d’Excel.",
		abstract: "La LET fonction affecte des noms aux résultats de calcul. Cela permet de stocker des calculs intermédiaires, des valeurs ou de définir des noms à l'intérieur d'une formule. Ces noms s’appliquent uniquement dans l’étendue de la LET fonction. À l’instar des variables en programmation, LET s’effectue par le biais de la syntaxe de formule native d’Excel.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/let-function"
		}],
		functionParameter: {
			name1: {
				name: "name1",
				detail: "Premier nom à attribuer. Il doit commencer par une lettre. Il ne peut pas être le résultat d’une formule ni entrer en conflit avec la syntaxe de plage."
			},
			nameValue1: {
				name: "name_value1",
				detail: "Valeur attribuée à name1."
			},
			calculationOrName2: {
				name: "calculation_or_name2",
				detail: "L’un des éléments suivants :\n1. Un calcul utilisant tous les noms de la fonction LET. Il doit être le dernier argument de LET.\n2. Un deuxième nom auquel attribuer un deuxième name_value. Si un nom est spécifié, name_value2 et calculation_or_name3 deviennent obligatoires."
			},
			nameValue2: {
				name: "name_value2",
				detail: "Valeur attribuée à calculation_or_name2."
			},
			calculationOrName3: {
				name: "calculation_or_name3",
				detail: "L’un des éléments suivants :\n1. Un calcul utilisant tous les noms de la fonction LET. Le dernier argument de LET doit être un calcul.\n2. Un troisième nom auquel attribuer un troisième name_value. Si un nom est spécifié, name_value3 et calculation_or_name4 deviennent obligatoires."
			}
		}
	},
	MAKEARRAY: {
		description: "Retourne un tableau calculé d’une taille de ligne et de colonne spécifiée, en appliquant une fonction LAMBDA .",
		abstract: "Retourne un tableau calculé d’une taille de ligne et de colonne spécifiée, en appliquant une fonction LAMBDA .",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/makearray-function"
		}],
		functionParameter: {
			number1: {
				name: "rows",
				detail: "Nombre de lignes dans le tableau. Doit être supérieur à zéro."
			},
			number2: {
				name: "cols",
				detail: "Nombre de colonnes dans le tableau. Doit être supérieur à zéro."
			},
			value3: {
				name: "lambda",
				detail: "Lambda appelé pour créer le tableau. Le LAMBDA prend deux paramètres : Ligne Index de ligne du tableau. col Index de colonne du tableau."
			}
		}
	},
	MAP: {
		description: "Retourne un tableau formé en mappant chaque valeur du ou des tableaux à une nouvelle valeur en appliquant une expression LAMBDA pour créer une valeur.",
		abstract: "Retourne un tableau formé en mappant chaque valeur du ou des tableaux à une nouvelle valeur en appliquant une expression LAMBDA pour créer une valeur.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/map-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Tableau array1 à mapper."
			},
			array2: {
				name: "array2",
				detail: "Tableau array2 à mapper."
			},
			lambda: {
				name: "lambda",
				detail: "Expression LAMBDA qui doit être le dernier argument et comporter un paramètre pour chaque tableau transmis."
			}
		}
	},
	NOT: {
		description: "Inverse la logique de son argument.",
		abstract: "Inverse la logique de son argument.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/not-function"
		}],
		functionParameter: { logical: {
			name: "logical",
			detail: "Condition dont vous souhaitez inverser la logique et qui peut prendre la valeur TRUE ou FALSE."
		} }
	},
	OR: {
		description: "La fonction OU renvoie VRAI si l’un de ses arguments a pour résultat VRAI, et renvoie FAUX si l’un de ses arguments a pour résultat FAUX.",
		abstract: "La fonction OU renvoie VRAI si l’un de ses arguments a pour résultat VRAI, et renvoie FAUX si l’un de ses arguments a pour résultat FAUX.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/or-function"
		}],
		functionParameter: {
			logical1: {
				name: "logical1",
				detail: "Première condition à tester, pouvant prendre la valeur TRUE ou FALSE."
			},
			logical2: {
				name: "logical2",
				detail: "Conditions supplémentaires à tester, pouvant prendre la valeur TRUE ou FALSE, dans la limite de 255 conditions."
			}
		}
	},
	REDUCE: {
		description: "Réduit un tableau à une valeur cumulée en appliquant un LAMBDA à chaque valeur et en retournant la valeur totale dans l’accumulateur.",
		abstract: "Réduit un tableau à une valeur cumulée en appliquant un LAMBDA à chaque valeur et en retournant la valeur totale dans l’accumulateur.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/reduce-function"
		}],
		functionParameter: {
			initialValue: {
				name: "initial_value",
				detail: "Définit la valeur de départ de l’accumulateur."
			},
			array: {
				name: "array",
				detail: "Tableau à réduire."
			},
			lambda: {
				name: "lambda",
				detail: "Lambda appelé pour réduire le tableau. Le lambda prend trois paramètres : Accumulateur Valeur cumulée et retournée comme résultat final. Valeur Valeur actuelle du tableau. Corps Calcul appliqué à chaque élément du tableau."
			}
		}
	},
	SCAN: {
		description: "Analyse un tableau en appliquant un LAMBDA à chaque valeur et retourne un tableau qui a chaque valeur intermédiaire.",
		abstract: "Analyse un tableau en appliquant un LAMBDA à chaque valeur et retourne un tableau qui a chaque valeur intermédiaire.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/scan-function"
		}],
		functionParameter: {
			initialValue: {
				name: "initial_value",
				detail: "Définit la valeur de départ de l’accumulateur."
			},
			array: {
				name: "array",
				detail: "Tableau à analyser."
			},
			lambda: {
				name: "lambda",
				detail: "Lambda appelé pour réduire le tableau. Le lambda prend trois paramètres : Accumulateur Valeur cumulée et retournée comme résultat final. Valeur Valeur actuelle du tableau. Corps Calcul appliqué à chaque élément du tableau."
			}
		}
	},
	SWITCH: {
		description: "Évalue une expression par rapport à une liste de valeurs et renvoie le résultat correspondant à la première valeur qui concorde. En l’absence de concordance, une valeur par défaut facultative peut être renvoyée.",
		abstract: "Évalue une expression par rapport à une liste de valeurs et renvoie le résultat correspondant à la première valeur qui concorde. En l’absence de concordance, une valeur par défaut facultative peut être renvoyée.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/switch-function"
		}],
		functionParameter: {
			expression: {
				name: "expression",
				detail: "Expression est la valeur (un nombre, une date ou du texte, par exemple) comparée à value1…value126."
			},
			value1: {
				name: "value1",
				detail: "ValueN est une valeur comparée à expression."
			},
			result1: {
				name: "result1",
				detail: "ResultN est la valeur renvoyée lorsque l’argument valueN correspondant concorde avec expression. Un ResultN doit être fourni pour chaque argument valueN correspondant."
			},
			defaultOrValue2: {
				name: "default_or_value2",
				detail: "Default est la valeur renvoyée lorsqu’aucune concordance n’est trouvée dans les expressions valueN. L’argument Default est identifié par l’absence d’expression resultN correspondante. Default doit être le dernier argument de la fonction."
			},
			result2: {
				name: "result2",
				detail: "ResultN est la valeur renvoyée lorsque l’argument valueN correspondant concorde avec expression. Un ResultN doit être fourni pour chaque argument valueN correspondant."
			}
		}
	},
	TRUE: {
		description: "Renvoie la valeur logique VRAI.",
		abstract: "Renvoie la valeur logique VRAI.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/true-function"
		}],
		functionParameter: {}
	},
	XOR: {
		description: "Renvoie VRAI si un nombre impair de ses arguments est évalué à VRAI, et FAUX si un nombre pair de ses arguments est évalué à VRAI.",
		abstract: "Renvoie VRAI si un nombre impair de ses arguments est évalué à VRAI, et FAUX si un nombre pair de ses arguments est évalué à VRAI.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/xor-function"
		}],
		functionParameter: {
			logical1: {
				name: "logical1",
				detail: "Première condition à tester, pouvant prendre la valeur TRUE ou FALSE."
			},
			logical2: {
				name: "logical2",
				detail: "Conditions supplémentaires à tester, pouvant prendre la valeur TRUE ou FALSE, dans la limite de 255 conditions."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/lookup/fr-FR.ts
const locale$6 = {
	ADDRESS: {
		description: "Vous pouvez utiliser la fonction ADRESSE pour obtenir l’adresse d’une cellule dans une feuille de calcul, selon des numéros de lignes et de colonnes spécifiés. Par exemple, ADDRESS(2,3) retourne $C$2 . Autre exemple, ADDRESS(77 300) renvoie $KN 77 $ . D’autres fonctions, telles que les fonctions LIGNE et COLONNE , permettent de fournir les arguments des numéros de lignes et de colonnes pour la fonction ADRESSE .",
		abstract: "Vous pouvez utiliser la fonction ADRESSE pour obtenir l’adresse d’une cellule dans une feuille de calcul, selon des numéros de lignes et de colonnes spécifiés. Par exemple, ADDRESS(2,3) retourne $C$2 . Autre exemple, ADDRESS(77 300) renvoie $KN 77 $ . D’autres fonctions, telles que les fonctions LIGNE et COLONNE , permettent de fournir les arguments des numéros de lignes et de colonnes pour la fonction ADRESSE .",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/address-function"
		}],
		functionParameter: {
			row_num: {
				name: "row number",
				detail: "Obligatoire. Valeur numérique spécifiant le numéro de ligne à utiliser dans la référence de la cellule."
			},
			column_num: {
				name: "column number",
				detail: "Obligatoire. Valeur numérique spécifiant le numéro de colonne à utiliser dans la référence de la cellule."
			},
			abs_num: {
				name: "type of reference",
				detail: "Optionnel. Valeur numérique spécifiant le type de référence à renvoyer."
			},
			a1: {
				name: "style of reference",
				detail: "Optionnel. Valeur logique indiquant si le style de référence est A1 ou L1C1. Dans le style A1, les colonnes sont étiquetées par ordre alphabétique et les lignes sont étiquetées numériquement. Dans le style de référence L1C1, les colonnes et les lignes sont toutes étiquetées numériquement. Si l’argument A1 est VRAI ou omis, la fonction ADRESSE renvoie une référence au style A1 ; s’il est FAUX, la fonction ADRESSE renvoie une référence au style L1C1. Remarque Pour modifier le style de référence utilisé par Excel, cliquez sur l’onglet Fichier , cliquez sur Options , puis cliquez sur Formules . Sous Manipulation de formules , activez ou désactivez la case à cocher Style de référence L1C1 ."
			},
			sheet_text: {
				name: "worksheet name",
				detail: "Optionnel. Une valeur de texte qui spécifie le nom de la feuille de calcul à utiliser comme référence externe. Par exemple, la formule =ADDRESS(1,1,,,\"Sheet2 ») renvoie Sheet2 !$A$1 . Si l’argument sheet_text est omis, aucun nom de feuille n’est utilisé et l’adresse retournée par la fonction fait référence à une cellule de la feuille active."
			}
		}
	},
	AREAS: {
		description: "Renvoie le nombre de zones dans une référence. Une zone se compose d’une plage de cellules adjacentes ou d’une cellule unique.",
		abstract: "Renvoie le nombre de zones dans une référence. Une zone se compose d’une plage de cellules adjacentes ou d’une cellule unique.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/areas-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "Obligatoire. Représente une référence à une cellule ou à une plage de cellules, et peut se référer à plusieurs zones. Si vous souhaitez spécifier un argument unique comprenant plusieurs références, vous devez inclure une paire de parenthèses supplémentaire, pour éviter que Microsoft Excel n’interprète le point-virgule comme un séparateur de champ. Voir l’exemple suivant."
		} }
	},
	CHOOSE: {
		description: "Utilise l’argument no_index pour renvoyer l’une des valeurs de la liste des arguments valeur. Utilisez la fonction CHOISIR pour sélectionner l’une des 254 valeurs possibles à partir du rang donné par l’argument no_index. Ainsi, si les arguments valeur1 à valeur7 représentent les jours de la semaine, la fonction CHOISIR renvoie l’un de ces jours lorsque la valeur de l’argument no_index est un nombre compris entre 1 et 7.",
		abstract: "Utilise l’argument no_index pour renvoyer l’une des valeurs de la liste des arguments valeur. Utilisez la fonction CHOISIR pour sélectionner l’une des 254 valeurs possibles à partir du rang donné par l’argument no_index. Ainsi, si les arguments valeur1 à valeur7 représentent les jours de la semaine, la fonction CHOISIR renvoie l’un de ces jours lorsque la valeur de l’argument no_index est un nombre compris entre 1 et 7.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/choose-function"
		}],
		functionParameter: {
			indexNum: {
				name: "index_num",
				detail: "Obligatoire. Désigne l’argument valeur qui doit être sélectionné. L’argument no_index doit être un nombre compris entre 1 et 254, ou une formule, ou une référence à une cellule contenant un nombre compris entre 1 et 254. Si la valeur de l’argument no_index est égale à 1, la fonction CHOISIR renvoie l’argument valeur1, si elle est égale à 2, elle renvoie l’argument valeur2, et ainsi de suite. Si index_num est inférieur à 1 ou supérieur au nombre de la dernière valeur de la liste, CHOOSE renvoie la #VALUE ! #VALEUR!. Si la valeur de l’argument no_index est une fraction, il est ramené par troncature au nombre entier immédiatement inférieur avant d’être pris en compte."
			},
			value1: {
				name: "value1",
				detail: "La valeur 1 est obligatoire, les valeurs suivantes sont facultatives. Il s’agit des 1 à 254 arguments valeur parmi lesquels la fonction CHOISIR sélectionne une valeur ou une action à exécuter en fonction de l’argument no_index spécifié. Ces arguments peuvent être des nombres, des références de cellule, des noms définis, des formules, des fonctions ou du texte."
			},
			value2: {
				name: "value2",
				detail: "La valeur 1 est obligatoire, les valeurs suivantes sont facultatives. Il s’agit des 1 à 254 arguments valeur parmi lesquels la fonction CHOISIR sélectionne une valeur ou une action à exécuter en fonction de l’argument no_index spécifié. Ces arguments peuvent être des nombres, des références de cellule, des noms définis, des formules, des fonctions ou du texte."
			}
		}
	},
	CHOOSECOLS: {
		description: "Renvoie les colonnes spécifiées à partir d’une matrice.",
		abstract: "Renvoie les colonnes spécifiées à partir d’une matrice.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/choosecols-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Tableau contenant les colonnes à retourner dans le nouveau tableau. Obligatoire."
			},
			colNum1: {
				name: "col_num1",
				detail: "Première colonne à retourner. Obligatoire."
			},
			colNum2: {
				name: "col_num2",
				detail: "Colonnes supplémentaires à retourner. Facultatif."
			}
		}
	},
	CHOOSEROWS: {
		description: "Renvoie les lignes spécifiées à partir d’une matrice.",
		abstract: "Renvoie les lignes spécifiées à partir d’une matrice.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/chooserows-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Tableau contenant les colonnes à retourner dans le nouveau tableau. Obligatoire."
			},
			rowNum1: {
				name: "row_num1",
				detail: "Numéro de la première ligne à retourner. Obligatoire."
			},
			rowNum2: {
				name: "row_num2",
				detail: "Numéros de ligne supplémentaires à retourner. Facultatif."
			}
		}
	},
	COLUMN: {
		description: "La fonction COLUMN retourne le numéro de colonne de la référence de cellule donnée. Par exemple, la formule =COLUMN(D10) retourne 4, car la colonne D est la quatrième colonne.",
		abstract: "La fonction COLUMN retourne le numéro de colonne de la référence de cellule donnée. Par exemple, la formule =COLUMN(D10) retourne 4, car la colonne D est la quatrième colonne.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/column-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "Optionnel. Cellule ou plage de cellules pour lesquelles vous souhaitez retourner le numéro de colonne. Si l’argument référence est omis ou correspond à une plage de cellules et que la fonction COLONNE est entrée en tant que formule de tableau horizontal, la fonction COLONNE renvoie les numéros de colonne de la référence sous forme de tableau horizontal. Remarque Si vous disposez d’une version actuelle de Microsoft 365 , vous pouvez simplement entrer la formule dans la cellule supérieure gauche de la plage de sortie, puis appuyer sur Entrée pour confirmer la formule en tant que formule de tableau dynamique. Sinon, vous devez entrer la formule comme une formule de tableau héritée : sélectionnez la plage de sortie, entrez la formule dans la cellule en haut à gauche de la plage de sortie, puis appuyez sur Ctrl+Maj+Entrée pour confirmer la formule. Excel ajoute automatiquement des accolades au début et à la fin de la formule. Pour plus d’informations sur les formules de tableau, voir Instructions et exemples de formules de tableau . Si l’argument référence est une plage de cellules et que la fonction COLONNE n’est pas entrée en tant que formule de tableau horizontal, la fonction COLONNE renvoie le numéro de la dernière colonne de gauche. Si l’argument référence est omis, l’argument par défaut est la référence de la cellule dans laquelle est placée la fonction COLONNE. L’argument référence ne peut pas faire référence à plusieurs zones."
		} }
	},
	COLUMNS: {
		description: "Retourne le nombre de colonnes dans un tableau ou une référence.",
		abstract: "Retourne le nombre de colonnes dans un tableau ou une référence.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/columns-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "Obligatoire. Une formule de tableau ou de tableau, ou une référence à une plage de cellules pour laquelle vous souhaitez le nombre de colonnes."
		} }
	},
	DROP: {
		description: "Exclut un nombre spécifié de lignes ou de colonnes du début ou de la fin d’un tableau. Cette fonction peut vous être utile pour supprimer les en-têtes et pieds de page d’un rapport Excel afin de retourner uniquement les données.",
		abstract: "Exclut un nombre spécifié de lignes ou de colonnes du début ou de la fin d’un tableau. Cette fonction peut vous être utile pour supprimer les en-têtes et pieds de page d’un rapport Excel afin de retourner uniquement les données.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/drop-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Tableau à partir duquel supprimer des lignes ou des colonnes."
			},
			rows: {
				name: "rows",
				detail: "Nombre de lignes à supprimer. Une valeur négative est exclue de la fin du tableau."
			},
			columns: {
				name: "columns",
				detail: "Nombre de colonnes à exclure. Une valeur négative est exclue de la fin du tableau."
			}
		}
	},
	EXPAND: {
		description: "Permet d’étendre ou de remplir un tableau aux dimensions spécifiées des lignes et des colonnes.",
		abstract: "Permet d’étendre ou de remplir un tableau aux dimensions spécifiées des lignes et des colonnes.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/expand-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Tableau à développer."
			},
			rows: {
				name: "rows",
				detail: "Nombre de lignes dans le tableau développé. S’il est manquant, les lignes ne sont pas développées."
			},
			columns: {
				name: "columns",
				detail: "Nombre de colonnes dans le tableau développé. S’il est manquant, les colonnes ne sont pas développées."
			},
			padWith: {
				name: "pad_with",
				detail: "Valeur avec laquelle effectuer le remplissage. La valeur par défaut est #N/A."
			}
		}
	},
	FILTER: {
		description: "Dans l’exemple suivant, nous avons utilisé la formule =FILTRE(A5:D20;C5:C20=H2;\"\") pour renvoyer tous les enregistrements pour Pomme, tel que sélectionné dans la cellule H2 et s’il n’y a pas de pommes, renvoyer une chaîne vide (« »).",
		abstract: "Dans l’exemple suivant, nous avons utilisé la formule =FILTRE(A5:D20;C5:C20=H2;\"\") pour renvoyer tous les enregistrements pour Pomme, tel que sélectionné dans la cellule H2 et s’il n’y a pas de pommes, renvoyer une chaîne vide (« »).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/filter-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "La fonction FILTRE renvoie une matrice qui débordera si c’est le résultat final d’une formule. Cela signifie qu’Excel crée dynamiquement la plage de tableau de dimension appropriée lorsque vous appuyez sur entrée . Si vos données de prise en charge se trouvent dans un tableau Excel , la matrice est automatiquement redimensionnée quand vous ajoutez ou supprimez des données dans votre plage de tableau si vous utilisez les références structurées . Pour plus d’informations, consultez cet article sur comportement de matrice renversé ."
			},
			include: {
				name: "include",
				detail: "Si votre ensemble de données comporte le potentiel de renvoyer une valeur vide, utilisez le 3ème argument ( [if_empty] ). Sinon, une erreur #CALC ! se produit, car Excel ne prend actuellement pas en charge les tableaux vides."
			},
			ifEmpty: {
				name: "if_empty",
				detail: "Si une valeur de l’argument include est une erreur (#N/A, #VALUE, etc.) ou ne peut pas être convertie en booléen, la fonction FILTER renvoie une erreur."
			}
		}
	},
	FORMULATEXT: {
		description: "Renvoie une formule sous forme de chaîne.",
		abstract: "Renvoie une formule sous forme de chaîne.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/formulatext-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "Obligatoire. Référence à une cellule ou à une plage de cellules."
		} }
	},
	GETPIVOTDATA: {
		description: "La capture d’écran ci-dessous montre la disposition de tableau croisé dynamique utilisée dans les sections suivantes. Dans cet exemple, =LIREDONNEESTABCROISDYNAMIQUE(\"Ventes\";A3) retourne le montant total des ventes :",
		abstract: "La capture d’écran ci-dessous montre la disposition de tableau croisé dynamique utilisée dans les sections suivantes. Dans cet exemple, =LIREDONNEESTABCROISDYNAMIQUE(\"Ventes\";A3) retourne le montant total des ventes :",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/getpivotdata-function"
		}],
		functionParameter: {
			dataField: {
				name: "champ_données",
				detail: "Nom du champ du tableau croisé dynamique contenant les données à récupérer. Il doit être placé entre guillemets."
			},
			pivotTable: {
				name: "tableau_croisé_dyn",
				detail: "Référence à une cellule, une plage ou une plage nommée du tableau croisé dynamique contenant les données."
			},
			field1: {
				name: "champ1",
				detail: "Paire facultative de noms de champ et d’élément décrivant les données à récupérer."
			},
			item1: {
				name: "élément1",
				detail: "Paire facultative de noms de champ et d’élément décrivant les données à récupérer."
			}
		}
	},
	HLOOKUP: {
		description: "Recherche une valeur dans la ligne supérieure d’une table ou d’un tableau de valeurs, puis renvoie une valeur dans la même colonne à partir d’une ligne que vous spécifiez dans la table ou le tableau. Utilisez la fonction RECHERCHEH lorsque les valeurs de comparaison sont situées dans une ligne en haut de la table de données, et que vous souhaitez effectuer la recherche n lignes plus bas. Utilisez la fonction RECHERCHEV lorsque les valeurs de comparaison se trouvent dans une colonne située à gauche des données recherchées.",
		abstract: "Recherche une valeur dans la ligne supérieure d’une table ou d’un tableau de valeurs, puis renvoie une valeur dans la même colonne à partir d’une ligne que vous spécifiez dans la table ou le tableau. Utilisez la fonction RECHERCHEH lorsque les valeurs de comparaison sont situées dans une ligne en haut de la table de données, et que vous souhaitez effectuer la recherche n lignes plus bas. Utilisez la fonction RECHERCHEV lorsque les valeurs de comparaison se trouvent dans une colonne située à gauche des données recherchées.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/hlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "Obligatoire. Représente la valeur à rechercher dans la première ligne de la table. Il peut s’agir d’une valeur, d’une référence ou d’une chaîne de texte."
			},
			tableArray: {
				name: "table_array",
				detail: "Obligatoire. Représente la table de données dans laquelle est exécutée la recherche de la valeur. Utilisez une référence à une plage ou un nom de plage. Les valeurs de la première ligne de table_matrice peuvent être du texte, des chiffres ou des valeurs logiques. Si range_lookup a la valeur TRUE, les valeurs de la première ligne de table_array doivent être placées dans l’ordre croissant : ...-2, -1, 0, 1, 2,... , A-Z, FALSE, TRUE ; dans le cas contraire, RECHERCHEH risque de ne pas donner la valeur correcte. Si range_lookup a la valeur FALSE, table_array n’a pas besoin d’être trié. La fonction ne fait pas de distinction entre les majuscules et les minuscules. Trier les valeurs dans l’ordre croissant, de gauche à droite. Pour plus d’informations, voir Trier les données d’une plage ou d’un tableau ."
			},
			rowIndexNum: {
				name: "row_index_num",
				detail: "Obligatoire. Numéro de ligne dans table_array à partir duquel la valeur correspondante sera retournée. Une row_index_num de 1 retourne la première valeur de ligne dans table_array, une row_index_num de 2 renvoie la valeur de la deuxième ligne dans table_array, etc. Si row_index_num est inférieur à 1, rechercheH renvoie le #VALUE ! valeur d’erreur ; si row_index_num est supérieur au nombre de lignes sur table_array, RECHERCHEH renvoie le #REF ! #VALEUR!."
			},
			rangeLookup: {
				name: "range_lookup",
				detail: "Optionnel. Représente une valeur logique qui spécifie si vous voulez que RECHERCHEH trouve une correspondance exacte ou approximative. Si cet argument est VRAI ou omis, une donnée proche est renvoyée. En d’autres termes, si aucune valeur exacte n’est trouvée, la valeur immédiatement inférieure à valeur_cherchée est renvoyée. Si cet argument est FAUX, RECHERCHEH recherche une correspondance exacte. S’il n’en trouve pas, la valeur d’erreur #N/A est renvoyée."
			}
		}
	},
	HSTACK: {
		description: "Ajoute des tableaux horizontalement et dans l’ordre pour renvoyer un tableau plus grand.",
		abstract: "Ajoute des tableaux horizontalement et dans l’ordre pour renvoyer un tableau plus grand.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/hstack-function"
		}],
		functionParameter: {
			array1: {
				name: "array",
				detail: "Nombre maximal de lignes de chacun des arguments du tableau."
			},
			array2: {
				name: "array",
				detail: "Nombre combiné de toutes les colonnes de chacun des arguments du tableau."
			}
		}
	},
	HYPERLINK: {
		description: "Crée un lien hypertexte dans une cellule.",
		abstract: "Crée un lien hypertexte dans une cellule.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3093313?hl=fr"
		}],
		functionParameter: {
			url: {
				name: "url",
				detail: "URL intégrale de l'emplacement du lien, entre guillemets, ou référence à une cellule contenant cette URL. Seuls certains types de liens sont autorisés. Les liens http:// , https:// , mailto: , aim: , ftp:// , gopher:// , telnet:// et news:// sont autorisés, mais les autres sont explicitement interdits. Si un autre protocole est spécifié, link_label s'affiche dans la cellule, mais ne constitue pas un lien hypertexte. Si aucun protocole n'est spécifié, http:// est utilisé par défaut et ajouté en préfixe à url ."
			},
			linkLabel: {
				name: "link_label",
				detail: "[ FACULTATIF – url par défaut ] : texte à afficher dans la cellule en tant que lien, entre guillemets, ou référence à une cellule contenant un tel libellé. Si link_label est une référence à une cellule vide, url s'affiche sous forme de lien si elle est valide, ou sous forme de texte brut dans le cas contraire. Si link_label est la chaîne littérale vide (\"\"), la cellule s'affiche comme étant vide, mais le lien reste accessible en cliquant sur la cellule ou en y accédant."
			}
		}
	},
	IMAGE: {
		description: "La fonction IMAGE insère des images dans des cellules à partir d’un emplacement source, ainsi qu’un texte de remplacement. Vous pouvez ensuite déplacer et redimensionner des cellules, trier et filtrer, et utiliser des images dans un tableau Excel. Utilisez cette fonction pour améliorer visuellement des listes de données telles que les inventaires, les jeux, les employés et les concepts mathématiques.",
		abstract: "La fonction IMAGE insère des images dans des cellules à partir d’un emplacement source, ainsi qu’un texte de remplacement. Vous pouvez ensuite déplacer et redimensionner des cellules, trier et filtrer, et utiliser des images dans un tableau Excel. Utilisez cette fonction pour améliorer visuellement des listes de données telles que les inventaires, les jeux, les employés et les concepts mathématiques.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/image-function"
		}],
		functionParameter: {
			source: {
				name: "source",
				detail: "Chemin URL du fichier image utilisant le protocole « https »."
			},
			altText: {
				name: "alt_text",
				detail: "Texte de remplacement décrivant l’image à des fins d’accessibilité."
			},
			sizing: {
				name: "sizing",
				detail: "Indique les dimensions de l’image."
			},
			height: {
				name: "height",
				detail: "Hauteur personnalisée de l’image en pixels."
			},
			width: {
				name: "width",
				detail: "Largeur personnalisée de l’image en pixels."
			}
		}
	},
	INDEX: {
		description: "Renvoie la valeur d’un élément d’un tableau ou d’une matrice, sélectionné à partir des index de numéros de ligne et de colonne.",
		abstract: "Renvoie la valeur d’un élément d’un tableau ou d’une matrice, sélectionné à partir des index de numéros de ligne et de colonne.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/index-function"
		}],
		functionParameter: {
			reference: {
				name: "reference",
				detail: "Référence à une ou plusieurs plages de cellules."
			},
			rowNum: {
				name: "row_num",
				detail: "Numéro de la ligne de reference à partir de laquelle renvoyer une référence."
			},
			columnNum: {
				name: "column_num",
				detail: "Numéro de la colonne de reference à partir de laquelle renvoyer une référence."
			},
			areaNum: {
				name: "area_num",
				detail: "Sélectionne dans reference une plage dont l’intersection de row_num et column_num doit être renvoyée."
			}
		}
	},
	INDIRECT: {
		description: "Renvoie la référence spécifiée par une chaîne de caractères. Les références sont immédiatement évaluées afin d’afficher leur contenu. Utilisez la fonction INDIRECT lorsque vous voulez modifier la référence à une cellule à l’intérieur d’une formule sans modifier la formule à proprement parler.",
		abstract: "Renvoie la référence spécifiée par une chaîne de caractères. Les références sont immédiatement évaluées afin d’afficher leur contenu. Utilisez la fonction INDIRECT lorsque vous voulez modifier la référence à une cellule à l’intérieur d’une formule sans modifier la formule à proprement parler.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/indirect-function"
		}],
		functionParameter: {
			refText: {
				name: "ref_text",
				detail: "Obligatoire. Référence à une cellule qui contient une référence de style A1, une référence de style R1C1, un nom défini comme référence ou une référence à une cellule sous forme de chaîne de texte. Si ref_text n’est pas une référence de cellule valide, INDIRECT retourne la #REF ! #VALEUR!. Si ref_text fait référence à un autre classeur (une référence externe), l’autre classeur doit être ouvert. Si le classeur source n’est pas ouvert, INDIRECT retourne le #REF ! #VALEUR!. Remarque Les références externes ne sont pas prises en charge dans Excel Web App. Si ref_text fait référence à une plage de cellules en dehors de la limite de lignes de 1 048 576 ou de la limite de colonne de 16 384 (XFD), INDIRECT renvoie une #REF ! erreur."
			},
			a1: {
				name: "a1",
				detail: "Optionnel. Représente une valeur logique qui indique le type de référence contenu dans la cellule de l’argument réf_texte. Si l’argument a1 est VRAI ou omis, l’argument réf_texte est interprété comme une référence de type A1. Si l’argument a1 est FAUX, l’argument réf_texte est interprété comme une référence de type L1C1."
			}
		}
	},
	LOOKUP: {
		description: "La forme vectorielle de la fonction RECHERCHE recherche une valeur dans une plage à une ligne ou colonne (appelée vecteur) et renvoie une valeur à partir de la même position dans une seconde plage à une ligne ou colonne.",
		abstract: "La forme vectorielle de la fonction RECHERCHE recherche une valeur dans une plage à une ligne ou colonne (appelée vecteur) et renvoie une valeur à partir de la même position dans une seconde plage à une ligne ou colonne.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/lookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "Valeur recherchée par LOOKUP dans le premier vecteur. lookup_value peut être un nombre, du texte, une valeur logique, un nom ou une référence qui désigne une valeur."
			},
			lookupVectorOrArray: {
				name: "lookup_vectorOrArray",
				detail: "Plage ne contenant qu’une ligne ou qu’une colonne."
			},
			resultVector: {
				name: "result_vector",
				detail: "Plage ne contenant qu’une ligne ou qu’une colonne. result_vector doit avoir la même taille que lookup_vector."
			}
		}
	},
	MATCH: {
		description: "La fonction EQUIV recherche un élément spécifié dans une plage de cellules, puis renvoie la position relative de cet élément dans la plage. Par exemple, si la plage A1:A3 contient les valeurs 5, 25 et 38, la formule =EQUIV(25;A1:A3;0) renvoie le chiffre 2 étant donné que 25 est le deuxième élément dans la plage.",
		abstract: "La fonction EQUIV recherche un élément spécifié dans une plage de cellules, puis renvoie la position relative de cet élément dans la plage. Par exemple, si la plage A1:A3 contient les valeurs 5, 25 et 38, la formule =EQUIV(25;A1:A3;0) renvoie le chiffre 2 étant donné que 25 est le deuxième élément dans la plage.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/match-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "MATCH recherche la plus grande valeur inférieure ou égale à lookup_value . Les valeurs de l’argument lookup_array doivent être placées dans l’ordre croissant, par exemple : ...-2, -1, 0, 1, 2, ..., A-Z, FALSE, TRUE."
			},
			lookupArray: {
				name: "lookup_array",
				detail: "MATCH recherche la première valeur qui est exactement égale à lookup_value . Les valeurs de l’argument lookup_array peuvent être dans n’importe quel ordre."
			},
			matchType: {
				name: "match_type",
				detail: "MATCH recherche la plus petite valeur supérieure ou égale à lookup_value . Les valeurs de l’argument lookup_array doivent être placées dans l’ordre décroissant, par exemple : TRUE, FALSE, Z-A, ... 2, 1, 0, -1, -2, ..., etc."
			}
		}
	},
	OFFSET: {
		description: "Renvoie une référence à une plage qui correspond à un nombre déterminé de lignes et de colonnes d’une cellule ou plage de cellules. La référence qui est renvoyée peut être une cellule unique ou une plage de cellules. Vous pouvez spécifier le nombre de lignes et de colonnes à renvoyer.",
		abstract: "Renvoie une référence à une plage qui correspond à un nombre déterminé de lignes et de colonnes d’une cellule ou plage de cellules. La référence qui est renvoyée peut être une cellule unique ou une plage de cellules. Vous pouvez spécifier le nombre de lignes et de colonnes à renvoyer.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/offset-function"
		}],
		functionParameter: {
			reference: {
				name: "reference",
				detail: "Obligatoire. Représente la référence par rapport à laquelle le décalage doit être opéré. La référence doit désigner une cellule ou une plage de cellules adjacentes ; sinon, la fonction DECALER renvoie la valeur d’erreur #VALEUR! ."
			},
			rows: {
				name: "rows",
				detail: "Obligatoire. Représente le nombre de lignes vers le haut ou vers le bas dont la cellule supérieure gauche de la référence renvoyée doit être décalée. Si l’argument lignes est égal à 5, la cellule supérieure gauche de la référence est décalée de cinq lignes en dessous de la référence. L’argument lignes peut être positif (c’est-à-dire en dessous de la référence de départ) ou négatif (c’est-à-dire au-dessus de la référence de départ)."
			},
			cols: {
				name: "columns",
				detail: "Obligatoire. Représente le nombre de colonnes vers la droite ou vers la gauche dont la cellule supérieure gauche de la référence renvoyée doit être décalée. Si l’argument colonnes est égal à 5, la cellule supérieure gauche de la référence est décalée de cinq colonnes vers la droite par rapport à la référence. L’argument colonnes peut être positif (c’est-à-dire à droite de la référence de départ) ou négatif (c’est-à-dire à gauche de la référence de départ)."
			},
			height: {
				name: "height",
				detail: "Optionnel. Représente la hauteur, exprimée en nombre de lignes que la référence renvoyée doit avoir. L’argument hauteur doit être un nombre positif."
			},
			width: {
				name: "width",
				detail: "Optionnel. Représente la largeur, exprimée en nombre de colonnes que la référence renvoyée doit avoir. L’argument largeur doit être un nombre positif."
			}
		}
	},
	ROW: {
		description: "Donne le numéro de ligne d’une référence.",
		abstract: "Donne le numéro de ligne d’une référence.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/row-function"
		}],
		functionParameter: { reference: {
			name: "reference",
			detail: "Optionnel. Représente la cellule ou la plage de cellules dont vous voulez obtenir le numéro de ligne. Si l’argument référence est omis, la référence par défaut est celle de la cellule dans laquelle la fonction LIGNE apparaît. Si référence est une plage de cellules et si ROW est entré en tant que tableau vertical, ROW renvoie les numéros de ligne de référence sous forme de tableau vertical. L’argument référence ne peut pas faire référence à des zones multiples."
		} }
	},
	ROWS: {
		description: "Renvoie le nombre de lignes d’une matrice ou d’une référence.",
		abstract: "Renvoie le nombre de lignes d’une matrice ou d’une référence.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/rows-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "Obligatoire. Tableau, formule matricielle ou référence à une plage de cellules pour laquelle vous souhaitez le nombre de lignes."
		} }
	},
	RTD: {
		description: "Récupère des données en temps réel d’un programme qui prend en charge l’automatisation COM.",
		abstract: "Récupère des données en temps réel d’un programme qui prend en charge l’automatisation COM.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/rtd-function"
		}],
		functionParameter: {
			progId: {
				name: "progId",
				detail: "Obligatoire. Nom du ProgID d’un complément Com Automation inscrit qui a été installé sur l’ordinateur local. Placez des guillemets de part et d’autre de ce nom."
			},
			server: {
				name: "server",
				detail: "Obligatoire. Nom du serveur sur lequel le complément doit être exécuté. Si vous ne disposez pas d’un serveur et si le programme est exécuté localement, laissez l’argument vide. Sinon, tapez des guillemets (\"\") de part et d’autre du nom du serveur. Si vous utilisez RTD dans Visual Basic pour Applications (VBA), des guillemets doubles ou la propriété VBA NullString sont requis pour le serveur, même si celui-ci est exécuté localement."
			},
			topic1: {
				name: "topic1",
				detail: "Topic1 est obligatoire, les rubriques suivantes sont facultatives. Paramètres 1 à 253 qui, ensemble, représentent une donnée unique en temps réel."
			},
			topic2: {
				name: "topic2",
				detail: "Topic1 est obligatoire, les rubriques suivantes sont facultatives. Paramètres 1 à 253 qui, ensemble, représentent une donnée unique en temps réel."
			}
		}
	},
	SORT: {
		description: "Dans cet exemple, nous faisons le tri par région, représentant commercial et produit individuellement avec =TRIER(A2:A17) copié sur les cellules F2, H2 et J2.",
		abstract: "Dans cet exemple, nous faisons le tri par région, représentant commercial et produit individuellement avec =TRIER(A2:A17) copié sur les cellules F2, H2 et J2.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/sort-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "La plage ou tableau à trier"
			},
			sortIndex: {
				name: "sort_index",
				detail: "Un nombre indiquant la ligne ou colonne à trier"
			},
			sortOrder: {
				name: "sort_order",
				detail: "Un nombre indiquant l’ordre de tri désiré ; 1 pour l’ordre croissant (par défaut) -1 pour l’ordre décroissant"
			},
			byCol: {
				name: "by_col",
				detail: "Une valeur logique indiquant le sens de tri désiré ; FAUX pour effectuer le tri par ligne (par défaut), VRAI pour trier par colonne"
			}
		}
	},
	SORTBY: {
		description: "Dans cet exemple, nous trions une liste de noms de personnes selon l’âge, dans l’ordre croissant.",
		abstract: "Dans cet exemple, nous trions une liste de noms de personnes selon l’âge, dans l’ordre croissant.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/sortby-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "La matrice ou plage à trier"
			},
			byArray1: {
				name: "by_array1",
				detail: "La matrice ou plage selon laquelle trier"
			},
			sortOrder1: {
				name: "sort_order1",
				detail: "L’ordre à appliquer pour le tri. 1 pour l’ordre croissant, -1 pour l’ordre décroissant. L’ordre par défaut est croissant."
			},
			byArray2: {
				name: "by_array2",
				detail: "La matrice ou plage selon laquelle trier"
			},
			sortOrder2: {
				name: "sort_order2",
				detail: "L’ordre à appliquer pour le tri. 1 pour l’ordre croissant, -1 pour l’ordre décroissant. L’ordre par défaut est croissant."
			}
		}
	},
	TAKE: {
		description: "Renvoie un nombre donné de lignes ou de colonnes contiguës depuis le début ou la fin d’une matrice.",
		abstract: "Renvoie un nombre donné de lignes ou de colonnes contiguës depuis le début ou la fin d’une matrice.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/take-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Tableau à partir duquel prendre des lignes ou des colonnes."
			},
			rows: {
				name: "rows",
				detail: "Nombre de lignes à prendre. Une valeur négative prend à partir de la fin du tableau."
			},
			columns: {
				name: "columns",
				detail: "Nombre de colonnes à prendre. Une valeur négative prend à partir de la fin du tableau."
			}
		}
	},
	TOCOL: {
		description: "Renvoie la matrice dans une seule colonne.",
		abstract: "Renvoie la matrice dans une seule colonne.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/tocol-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Tableau ou référence à renvoyer sous forme de colonne."
			},
			ignore: {
				name: "ignore",
				detail: "Indique s’il faut ignorer certains types de valeurs. Par défaut, aucune valeur n’est ignorée :\n0 Conserver toutes les valeurs (par défaut)\n1 Ignorer les cellules vides\n2 Ignorer les erreurs\n3 Ignorer les cellules vides et les erreurs"
			},
			scanByColumn: {
				name: "scan_by_column",
				detail: "Analyse le tableau par colonne. Par défaut, il est analysé par ligne. L’analyse détermine si les valeurs sont ordonnées par ligne ou par colonne."
			}
		}
	},
	TOROW: {
		description: "Renvoie la matrice dans une seule ligne.",
		abstract: "Renvoie la matrice dans une seule ligne.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/torow-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Tableau ou référence à renvoyer sous forme de ligne."
			},
			ignore: {
				name: "ignore",
				detail: "Indique s’il faut ignorer certains types de valeurs. Par défaut, aucune valeur n’est ignorée :\n0 Conserver toutes les valeurs (par défaut)\n1 Ignorer les cellules vides\n2 Ignorer les erreurs\n3 Ignorer les cellules vides et les erreurs"
			},
			scanByColumn: {
				name: "scan_by_column",
				detail: "Analyse le tableau par colonne. Par défaut, il est analysé par ligne. L’analyse détermine si les valeurs sont ordonnées par ligne ou par colonne."
			}
		}
	},
	TRANSPOSE: {
		description: "Vous devez parfois basculer ou faire pivoter des cellules. Vous pouvez effectuer ceci par copier-coller ou à l’aide de l’option TRANSPOSE . L’utilisation de celle-ci crée toutefois des données en double. Pour éviter cela, vous pouvez taper une formule plutôt que d’utiliser la fonction TRANSPOSE. Par exemple, dans l’image suivante, la formule =TRANSPOSE(A1:B4) utilise les cellules A1 à B4 et les réorganise horizontalement.",
		abstract: "Vous devez parfois basculer ou faire pivoter des cellules. Vous pouvez effectuer ceci par copier-coller ou à l’aide de l’option TRANSPOSE . L’utilisation de celle-ci crée toutefois des données en double. Pour éviter cela, vous pouvez taper une formule plutôt que d’utiliser la fonction TRANSPOSE. Par exemple, dans l’image suivante, la formule =TRANSPOSE(A1:B4) utilise les cellules A1 à B4 et les réorganise horizontalement.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/transpose-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "Plage de cellules ou tableau dans une feuille de calcul."
		} }
	},
	UNIQUE: {
		description: "Renvoyer des noms uniques à partir d’une liste de noms",
		abstract: "Renvoyer des noms uniques à partir d’une liste de noms",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/unique-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Plage ou tableau à partir duquel retourner des lignes ou des colonnes uniques"
			},
			byCol: {
				name: "by_col",
				detail: "L’argument by_col est une valeur logique indiquant comment effectuer une comparaison. TRUE compare les colonnes les unes aux autres et retourne les colonnes uniques FALSE (ou omis) compare les lignes les unes aux autres et retourne les lignes uniques"
			},
			exactlyOnce: {
				name: "exactly_once",
				detail: "L’argument exactly_once est une valeur logique qui retourne des lignes ou des colonnes qui se produisent exactement une fois dans la plage ou le tableau. Il s’agit du concept de base de données unique. TRUE retourne toutes les lignes ou colonnes distinctes qui se produisent exactement une fois à partir de la plage ou du tableau FALSE (ou omis) retourne toutes les lignes ou colonnes distinctes de la plage ou du tableau"
			}
		}
	},
	VLOOKUP: {
		description: "Utilisez VLOOKUP lorsque vous devez rechercher des éléments par ligne dans un tableau ou une plage. Par exemple, recherchez le prix d’une pièce automobile par son numéro, ou le nom d’un employé à partir de son identifiant.",
		abstract: "Utilisez VLOOKUP lorsque vous devez rechercher des éléments par ligne dans un tableau ou une plage.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/vlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "Valeur à rechercher. Elle doit se trouver dans la première colonne de la plage de cellules indiquée dans l’argument table_array."
			},
			tableArray: {
				name: "table_array",
				detail: "Plage de cellules dans laquelle VLOOKUP recherche lookup_value et la valeur de retour. Vous pouvez utiliser une plage nommée ou un tableau, ainsi que des noms au lieu de références de cellules."
			},
			colIndexNum: {
				name: "col_index_num",
				detail: "Numéro de la colonne contenant la valeur de retour, en commençant par 1 pour la colonne la plus à gauche de table_array."
			},
			rangeLookup: {
				name: "range_lookup",
				detail: "Valeur logique indiquant si VLOOKUP doit trouver une concordance approximative ou exacte : approximative – 1/TRUE, exacte – 0/FALSE."
			}
		}
	},
	VSTACK: {
		description: "Ajoute des matrices verticalement et dans l’ordre afin de renvoyer une matrice plus grande.",
		abstract: "Ajoute des matrices verticalement et dans l’ordre afin de renvoyer une matrice plus grande.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/vstack-function"
		}],
		functionParameter: {
			array1: {
				name: "array",
				detail: "Les tableaux à ajouter."
			},
			array2: {
				name: "array",
				detail: "Les tableaux à ajouter."
			}
		}
	},
	WRAPCOLS: {
		description: "Répartit la ligne ou colonne de valeurs fournie par colonnes après un nombre d’éléments indiqué.",
		abstract: "Répartit la ligne ou colonne de valeurs fournie par colonnes après un nombre d’éléments indiqué.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/wrapcols-function"
		}],
		functionParameter: {
			vector: {
				name: "vector",
				detail: "Vecteur ou référence à répartir."
			},
			wrapCount: {
				name: "wrap_count",
				detail: "Nombre maximal de valeurs pour chaque colonne."
			},
			padWith: {
				name: "pad_with",
				detail: "Valeur à utiliser pour le remplissage. La valeur par défaut est #N/A."
			}
		}
	},
	WRAPROWS: {
		description: "Répartit la ligne ou colonne de valeurs fournie par lignes après un nombre d’éléments indiqué.",
		abstract: "Répartit la ligne ou colonne de valeurs fournie par lignes après un nombre d’éléments indiqué.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/wraprows-function"
		}],
		functionParameter: {
			vector: {
				name: "vector",
				detail: "Vecteur ou référence à répartir."
			},
			wrapCount: {
				name: "wrap_count",
				detail: "Nombre maximal de valeurs pour chaque ligne."
			},
			padWith: {
				name: "pad_with",
				detail: "Valeur à utiliser pour le remplissage. La valeur par défaut est #N/A."
			}
		}
	},
	XLOOKUP: {
		description: "Recherche dans une plage ou une matrice et renvoie l’élément correspondant à la première concordance trouvée. En l’absence de concordance, XLOOKUP peut renvoyer la concordance la plus proche (approximative).",
		abstract: "Recherche dans une plage ou une matrice et renvoie l’élément correspondant à la première concordance trouvée.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/xlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "Valeur à rechercher. Si elle est omise, XLOOKUP renvoie les cellules vides trouvées dans lookup_array."
			},
			lookupArray: {
				name: "lookup_array",
				detail: "Tableau ou plage dans lequel effectuer la recherche."
			},
			returnArray: {
				name: "return_array",
				detail: "Tableau ou plage à renvoyer."
			},
			ifNotFound: {
				name: "if_not_found",
				detail: "Lorsqu’aucune concordance valide n’est trouvée, renvoie le texte [if_not_found] fourni. Si [if_not_found] est absent, #N/A est renvoyé."
			},
			matchMode: {
				name: "match_mode",
				detail: "Indique le type de concordance : 0 – exacte, renvoie #N/A si aucune n’est trouvée (par défaut) ; -1 – exacte ou élément immédiatement inférieur ; 1 – exacte ou élément immédiatement supérieur ; 2 – concordance générique où *, ? et ~ ont une signification particulière."
			},
			searchMode: {
				name: "search_mode",
				detail: "Indique le mode de recherche : 1 – depuis le premier élément (par défaut) ; -1 – recherche inversée depuis le dernier ; 2 – recherche binaire nécessitant lookup_array trié par ordre croissant ; -2 – recherche binaire nécessitant lookup_array trié par ordre décroissant. Sans tri requis, des résultats non valides peuvent être renvoyés."
			}
		}
	},
	XMATCH: {
		description: "Recherche un élément donné dans une matrice ou une plage de cellules, puis renvoie sa position relative.",
		abstract: "Recherche un élément donné dans une matrice ou une plage de cellules, puis renvoie sa position relative.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/xmatch-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "lookup_value",
				detail: "Valeur de recherche."
			},
			lookupArray: {
				name: "lookup_array",
				detail: "Le tableau ou la plage à rechercher."
			},
			matchMode: {
				name: "match_mode",
				detail: "Type de correspondance : 0, exacte par défaut; -1, exacte ou élément immédiatement inférieur; 1, exacte ou élément immédiatement supérieur; 2, correspondance générique avec *, ? et ~."
			},
			searchMode: {
				name: "search_mode",
				detail: "Type de recherche : 1, du premier au dernier par défaut; -1, du dernier au premier; 2, recherche binaire sur un tableau trié par ordre croissant; -2, recherche binaire sur un tableau trié par ordre décroissant."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/math/fr-FR.ts
const locale$5 = {
	ABS: {
		description: "Renvoie la valeur absolue d’un nombre. La valeur absolue d’un nombre est le nombre sans son signe.",
		abstract: "Renvoie la valeur absolue d’un nombre. La valeur absolue d’un nombre est le nombre sans son signe.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/abs-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire. Représente le nombre réel dont vous voulez obtenir la valeur absolue."
		} }
	},
	ACOS: {
		description: "Renvoie l’arccosinus d’un nombre. L’arccosinus, ou inverse du cosinus, est l’angle dont le cosinus est l’argument nombre . L’angle renvoyé, exprimé en radians, est compris entre 0 (zéro) et pi.",
		abstract: "Renvoie l’arccosinus d’un nombre. L’arccosinus, ou inverse du cosinus, est l’angle dont le cosinus est l’argument nombre . L’angle renvoyé, exprimé en radians, est compris entre 0 (zéro) et pi.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/acos-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire. Cosinus de l’angle souhaité et doit être de -1 à 1."
		} }
	},
	ACOSH: {
		description: "Renvoie le cosinus hyperbolique inverse d’un nombre. L’argument Nombre doit être supérieur ou égal à 1. Le cosinus hyperbolique inverse est la valeur dont le cosinus hyperbolique est nombre , de sorte que ACOSH(COSH(nombre)) égale nombre .",
		abstract: "Renvoie le cosinus hyperbolique inverse d’un nombre. L’argument Nombre doit être supérieur ou égal à 1. Le cosinus hyperbolique inverse est la valeur dont le cosinus hyperbolique est nombre , de sorte que ACOSH(COSH(nombre)) égale nombre .",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/acosh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire. Représente un nombre réel quelconque supérieur ou égal à 1."
		} }
	},
	ACOT: {
		description: "Renvoie la valeur principale de l’arccotangente, ou cotangente inverse, d’un nombre.",
		abstract: "Renvoie la valeur principale de l’arccotangente, ou cotangente inverse, d’un nombre.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/acot-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire. Ce nombre représente la cotangente de l’angle souhaité. Il doit s’agit d’un nombre réel."
		} }
	},
	ACOTH: {
		description: "Renvoie la cotangente hyperbolique inverse d’un nombre.",
		abstract: "Renvoie la cotangente hyperbolique inverse d’un nombre.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/acoth-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "La valeur absolue de number doit être supérieure à 1."
		} }
	},
	AGGREGATE: {
		description: "Renvoie un agrégat dans une liste ou une base de données. La fonction AGREGAT peut appliquer diverses fonctions d’agrégation à une liste ou à une base de données en proposant l’option d’ignorer les lignes masquées et les valeurs d’erreur.",
		abstract: "Renvoie un agrégat dans une liste ou une base de données. La fonction AGREGAT peut appliquer diverses fonctions d’agrégation à une liste ou à une base de données en proposant l’option d’ignorer les lignes masquées et les valeurs d’erreur.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/aggregate-function"
		}],
		functionParameter: {
			functionNum: {
				name: "function_num",
				detail: "Obligatoire. Un nombre compris entre 1 et 19 et incluant ces valeurs qui spécifie la fonction à utiliser."
			},
			options: {
				name: "options",
				detail: "Obligatoire. Valeur numérique qui détermine les valeurs à ignorer dans la plage d’évaluation de la fonction. Remarque La fonction n’ignore pas les lignes masquées, les sous-totaux imbriqués ou les agrégats imbriqués si l’argument de tableau inclut un calcul, par exemple : =AGGREGATE(14,3,A1 :A100*(A1 :A100>0),1)"
			},
			ref1: {
				name: "ref1",
				detail: "Obligatoire. Premier argument numérique des fonctions qui acceptent plusieurs arguments numériques pour lesquels vous souhaitez obtenir la valeur d’agrégation."
			},
			ref2: {
				name: "ref2",
				detail: "Optionnel. Arguments numériques compris entre 2 et 253 pour lesquels vous souhaitez obtenir la valeur d’agrégation. Pour les fonctions qui acceptent une matrice, réf1 est une matrice, une formule matricielle ou une référence à une plage de cellules pour lesquelles vous souhaitez obtenir la valeur d’agrégation. Réf2 est un deuxième argument obligatoire pour certaines fonctions. Les fonctions suivantes exigent un argument réf2 :"
			}
		}
	},
	ARABIC: {
		description: "Convertit un chiffre romain en chiffre arabe.",
		abstract: "Convertit un chiffre romain en chiffre arabe.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/arabic-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Obligatoire. Chaîne placée entre guillemets, chaîne vide (\"\") ou référence à une cellule contenant du texte."
		} }
	},
	ASIN: {
		description: "Renvoie l’arcsinus, ou sinus inverse, d’un nombre. L’arcsinus est l’angle dont le sinus est ce nombre. L’angle renvoyé est exprimé en radians entre -pi/2 et pi/2.",
		abstract: "Renvoie l’arcsinus, ou sinus inverse, d’un nombre.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/asin-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire. Sinus de l’angle souhaité; il doit être compris entre -1 et 1."
		} }
	},
	ASINH: {
		description: "Renvoie le sinus hyperbolique inverse d’un nombre. Le sinus hyperbolique inverse est la valeur dont le sinus hyperbolique est ce nombre ; ainsi ASINH(SINH(nombre)) est égal à nombre.",
		abstract: "Renvoie le sinus hyperbolique inverse d’un nombre.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/asinh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire. Tout nombre réel."
		} }
	},
	ATAN: {
		description: "Renvoie l’arctangente ou la tangente inverse d’un nombre. L’arctangente est l’angle dont la tangente est l’argument nombre . L’angle renvoyé, exprimé en radians, est compris entre -pi/2 et pi/2.",
		abstract: "Renvoie l’arctangente ou la tangente inverse d’un nombre. L’arctangente est l’angle dont la tangente est l’argument nombre . L’angle renvoyé, exprimé en radians, est compris entre -pi/2 et pi/2.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/atan-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire. Représente la tangente de l’angle."
		} }
	},
	ATAN2: {
		description: "Renvoie l’arctangente ou la tangente inverse des coordonnées x et y spécifiées. L’arctangente est l’angle formé par l’axe des abscisses (x) et une droite passant par l’origine (0, 0) et un point dont les coordonnées sont (no_x, no_y). Cet angle, exprimé en radians, est compris entre -pi et pi, -pi non compris.",
		abstract: "Renvoie l’arctangente ou la tangente inverse des coordonnées x et y spécifiées. L’arctangente est l’angle formé par l’axe des abscisses (x) et une droite passant par l’origine (0, 0) et un point dont les coordonnées sont (no_x, no_y). Cet angle, exprimé en radians, est compris entre -pi et pi, -pi non compris.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/atan2-function"
		}],
		functionParameter: {
			xNum: {
				name: "x_num",
				detail: "Obligatoire. Représente l’abscisse du point (coordonnée sur l’axe des x)."
			},
			yNum: {
				name: "y_num",
				detail: "Obligatoire. Représente l’ordonnée du point (coordonnée sur l’axe des y)."
			}
		}
	},
	ATANH: {
		description: "Renvoie la tangente hyperbolique inverse d’un nombre. L’argument nombre doit être strictement compris entre -1 et 1 (-1 et 1 non compris). La tangente hyperbolique inverse est la valeur dont la tangente hyperbolique est l’argument nombre , de sorte que ATANH(TANH(nombre)) égale nombre .",
		abstract: "Renvoie la tangente hyperbolique inverse d’un nombre. L’argument nombre doit être strictement compris entre -1 et 1 (-1 et 1 non compris). La tangente hyperbolique inverse est la valeur dont la tangente hyperbolique est l’argument nombre , de sorte que ATANH(TANH(nombre)) égale nombre .",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/atanh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire. Représente un nombre réel quelconque compris entre -1 et 1."
		} }
	},
	BASE: {
		description: "Convertit un nombre en une représentation textuelle avec la base donnée.",
		abstract: "Convertit un nombre en une représentation textuelle avec la base donnée.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/base-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Nombre à convertir. Doit être un entier supérieur ou égal à 0 et inférieur à 2^53."
			},
			radix: {
				name: "radix",
				detail: "Obligatoire. Base dans laquelle convertir le nombre. Doit être un entier supérieur ou égal à 2 et inférieur ou égal à 36."
			},
			minLength: {
				name: "min_length",
				detail: "Optionnel. Longueur minimale de la chaîne renvoyée. Doit être un entier supérieur ou égal à 0."
			}
		}
	},
	CEILING: {
		description: "Renvoie l’argument nombre après l’avoir arrondi au multiple de l’argument précision en s’éloignant de zéro. Par exemple, si vous voulez que la valeur décimale de vos prix soit toujours un multiple de 5 centimes, et que le prix de votre produit est 4,42 F, utilisez la formule =PLAFOND(4,42;0,05) pour arrondir les centimes au multiple de 5 supérieur.",
		abstract: "Renvoie l’argument nombre après l’avoir arrondi au multiple de l’argument précision en s’éloignant de zéro. Par exemple, si vous voulez que la valeur décimale de vos prix soit toujours un multiple de 5 centimes, et que le prix de votre produit est 4,42 F, utilisez la formule =PLAFOND(4,42;0,05) pour arrondir les centimes au multiple de 5 supérieur.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/ceiling-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Représente la valeur à arrondir."
			},
			significance: {
				name: "significance",
				detail: "Obligatoire. Représente le multiple auquel vous souhaitez arrondir."
			}
		}
	},
	CEILING_MATH: {
		description: "Le PLAFOND. La fonction MATH arrondit un nombre jusqu’à l’entier le plus proche ou, éventuellement, au multiple de précision le plus proche.",
		abstract: "Le PLAFOND. La fonction MATH arrondit un nombre jusqu’à l’entier le plus proche ou, éventuellement, au multiple de précision le plus proche.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/ceiling-math-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. (doit être compris entre -2.229E-308.et 9.99E+307.)"
			},
			significance: {
				name: "significance",
				detail: "Optionnel. Il s’agit du nombre de chiffres significatifs après la virgule décimale à laquelle le nombre doit être arrondi."
			},
			mode: {
				name: "mode",
				detail: "Optionnel. Cela contrôle si les nombres négatifs sont arrondis vers ou loin de zéro."
			}
		}
	},
	CEILING_PRECISE: {
		description: "Renvoie un nombre arrondi au nombre entier le plus proche ou au multiple le plus proche de l’argument précision en s’éloignant de zéro. Quel que soit son signe, ce nombre est arrondi à l’entier supérieur. Toutefois, si le nombre ou l’argument précision est égal à zéro, zéro est retourné.",
		abstract: "Renvoie un nombre arrondi au nombre entier le plus proche ou au multiple le plus proche de l’argument précision en s’éloignant de zéro. Quel que soit son signe, ce nombre est arrondi à l’entier supérieur. Toutefois, si le nombre ou l’argument précision est égal à zéro, zéro est retourné.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/ceiling-precise-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Représente la valeur à arrondir."
			},
			significance: {
				name: "significance",
				detail: "Optionnel. Multiple auquel le nombre doit être arrondi. Si l’argument précision est omis, sa valeur par défaut est 1."
			}
		}
	},
	COMBIN: {
		description: "Renvoie le nombre de combinaisons pour un nombre donné d’éléments. Utilisez COMBIN pour déterminer le nombre total de groupes qu’il est possible de former à partir d’un nombre donné d’éléments.",
		abstract: "Renvoie le nombre de combinaisons pour un nombre donné d’éléments. Utilisez COMBIN pour déterminer le nombre total de groupes qu’il est possible de former à partir d’un nombre donné d’éléments.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/combin-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Représente le nombre d’éléments."
			},
			numberChosen: {
				name: "number_chosen",
				detail: "Obligatoire. Représente le nombre d’éléments dans chaque combinaison."
			}
		}
	},
	COMBINA: {
		description: "Renvoie le nombre de combinaisons (avec répétitions) pour un nombre d’éléments donné.",
		abstract: "Renvoie le nombre de combinaisons (avec répétitions) pour un nombre d’éléments donné.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/combina-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Doit être supérieur ou égal à 0 et supérieur ou égal à Number_chosen. Les valeurs non entières sont tronquées."
			},
			numberChosen: {
				name: "number_chosen",
				detail: "Obligatoire. Doit être supérieur ou égal à 0. Les valeurs non entières sont tronquées."
			}
		}
	},
	COS: {
		description: "Renvoie le cosinus de l’angle spécifié.",
		abstract: "Renvoie le cosinus de l’angle spécifié.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/cos-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire. Représente l’angle, exprimé en radians, dont vous voulez obtenir le cosinus."
		} }
	},
	COSH: {
		description: "Renvoie le cosinus hyperbolique d’un nombre.",
		abstract: "Renvoie le cosinus hyperbolique d’un nombre.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/cosh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire. Représente n’importe quel nombre réel dont vous voulez le cosinus hyperbolique."
		} }
	},
	COT: {
		description: "Renvoie la cotangente d’un angle spécifié en radians.",
		abstract: "Renvoie la cotangente d’un angle spécifié en radians.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/cot-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire. Angle exprimé en radians dont vous voulez calculer la cotangente."
		} }
	},
	COTH: {
		description: "Retourne la cotangente hyperbolique d’un angle hyperbolique.",
		abstract: "Retourne la cotangente hyperbolique d’un angle hyperbolique.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/coth-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire."
		} }
	},
	CSC: {
		description: "Renvoie la cosécante d’un angle spécifié en radians.",
		abstract: "Renvoie la cosécante d’un angle spécifié en radians.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/csc-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire."
		} }
	},
	CSCH: {
		description: "Renvoie la cosécante hyperbolique d’un angle spécifié en radians.",
		abstract: "Renvoie la cosécante hyperbolique d’un angle spécifié en radians.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/csch-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire."
		} }
	},
	DECIMAL: {
		description: "Convertit une représentation textuelle d’un nombre dans une base donnée en nombre décimal.",
		abstract: "Convertit une représentation textuelle d’un nombre dans une base donnée en nombre décimal.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/decimal-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Obligatoire."
			},
			radix: {
				name: "radix",
				detail: "Obligatoire. La base doit être un entier."
			}
		}
	},
	DEGREES: {
		description: "Cette fonction convertit les radians en degrés.",
		abstract: "Cette fonction convertit les radians en degrés.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/degrees-function"
		}],
		functionParameter: { angle: {
			name: "angle",
			detail: "Obligatoire. Représente l’angle en radians que vous souhaitez convertir."
		} }
	},
	EVEN: {
		description: "Retourne un nombre arrondi à l’entier pair le plus proche. Vous pouvez utiliser cette fonction pour traiter les éléments qui sont fournis en deux. Par exemple, une caisse d’emballage accepte des lignes d’un ou deux éléments. La caisse est pleine lorsque le nombre d’éléments, arrondi aux deux plus proches, correspond à la capacité de la caisse.",
		abstract: "Retourne un nombre arrondi à l’entier pair le plus proche. Vous pouvez utiliser cette fonction pour traiter les éléments qui sont fournis en deux. Par exemple, une caisse d’emballage accepte des lignes d’un ou deux éléments. La caisse est pleine lorsque le nombre d’éléments, arrondi aux deux plus proches, correspond à la capacité de la caisse.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/even-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire. Représente la valeur à arrondir."
		} }
	},
	EXP: {
		description: "Renvoie la constante e élevée à la puissance de l’argument nombre. La constante e est égale à 2,71828182845904, soit la base du logarithme népérien.",
		abstract: "Renvoie la constante e élevée à la puissance de l’argument nombre. La constante e est égale à 2,71828182845904, soit la base du logarithme népérien.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/exp-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire. Représente l’exposant de la base e."
		} }
	},
	FACT: {
		description: "Donne la factorielle d’un nombre. La factorielle de l’argument nombre est égale à 1*2*3*...* nombre.",
		abstract: "Donne la factorielle d’un nombre. La factorielle de l’argument nombre est égale à 1*2*3*...* nombre.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/fact-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire. Représente le nombre non négatif dont vous voulez obtenir la factorielle. Si ce nombre n’est pas un nombre entier, il sera tronqué à sa partie entière."
		} }
	},
	FACTDOUBLE: {
		description: "Renvoie la factorielle double d’un nombre.",
		abstract: "Renvoie la factorielle double d’un nombre.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/factdouble-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire. Représente la valeur dont vous voulez obtenir la factorielle double. Si nombre n’est pas un nombre entier, il est tronqué à sa partie entière."
		} }
	},
	FLOOR: {
		description: "La fonction FLOOR dans Excel arrondit un nombre spécifié au multiple de précision spécifié le plus proche. Les nombres négatifs sont arrondis vers le bas (négatif supplémentaire) au multiple entier le plus proche en dessous de zéro.",
		abstract: "La fonction FLOOR dans Excel arrondit un nombre spécifié au multiple de précision spécifié le plus proche. Les nombres négatifs sont arrondis vers le bas (négatif supplémentaire) au multiple entier le plus proche en dessous de zéro.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/floor-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Représente la valeur numérique à arrondir."
			},
			significance: {
				name: "significance",
				detail: "Obligatoire. Représente le multiple auquel vous souhaitez arrondir."
			}
		}
	},
	FLOOR_MATH: {
		description: "Arrondir un nombre au nombre entier inférieur le plus proche ou au multiple le plus proche de l’argument précision en tendant vers zéro.",
		abstract: "Arrondir un nombre au nombre entier inférieur le plus proche ou au multiple le plus proche de l’argument précision en tendant vers zéro.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/floor-math-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Nombre à arrondir vers le bas."
			},
			significance: {
				name: "significance",
				detail: "Optionnel. Multiple auquel vous souhaitez arrondir."
			},
			mode: {
				name: "mode",
				detail: "Optionnel. Direction (vers 0 ou en s’éloignant de 0) pour l’arrondi des nombres négatifs."
			}
		}
	},
	FLOOR_PRECISE: {
		description: "Renvoie un nombre arrondi au nombre entier inférieur le plus proche ou au multiple le plus proche de l’argument précision en s’éloignant de zéro. Quel que soit son signe, ce nombre est arrondi à l’entier inférieur. Toutefois, si le nombre ou l’argument précision est égal à zéro, zéro est retourné.",
		abstract: "Renvoie un nombre arrondi au nombre entier inférieur le plus proche ou au multiple le plus proche de l’argument précision en s’éloignant de zéro. Quel que soit son signe, ce nombre est arrondi à l’entier inférieur. Toutefois, si le nombre ou l’argument précision est égal à zéro, zéro est retourné.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/floor-precise-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Représente la valeur à arrondir."
			},
			significance: {
				name: "significance",
				detail: "Optionnel. Multiple auquel le nombre doit être arrondi. Si l’argument précision est omis, sa valeur par défaut est 1."
			}
		}
	},
	GCD: {
		description: "Renvoie le plus grand commun diviseur de plusieurs nombres entiers. Le plus grand commun diviseur est le nombre entier le plus grand qui puisse diviser nombre1 et nombre2 sans qu’il y ait de reste.",
		abstract: "Renvoie le plus grand commun diviseur de plusieurs nombres entiers. Le plus grand commun diviseur est le nombre entier le plus grand qui puisse diviser nombre1 et nombre2 sans qu’il y ait de reste.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/gcd-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Number1 est obligatoire, les numéros suivants sont facultatifs. Ils représentent 1 à 255 valeurs. Si une valeur n’est pas un nombre entier, elle sera tronquée à sa partie entière."
			},
			number2: {
				name: "number2",
				detail: "Number1 est obligatoire, les numéros suivants sont facultatifs. Ils représentent 1 à 255 valeurs. Si une valeur n’est pas un nombre entier, elle sera tronquée à sa partie entière."
			}
		}
	},
	INT: {
		description: "Arrondit un nombre à l’entier immédiatement inférieur.",
		abstract: "Arrondit un nombre à l’entier immédiatement inférieur.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/int-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire. Représente le nombre réel que vous souhaitez arrondir au nombre entier immédiatement inférieur."
		} }
	},
	ISO_CEILING: {
		description: "Renvoie un nombre arrondi à l’entier supérieur le plus proche ou au multiple de précision supérieur le plus proche.",
		abstract: "Renvoie un nombre arrondi à l’entier supérieur le plus proche ou au multiple de précision supérieur le plus proche.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/iso-ceiling-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Représente la valeur à arrondir."
			},
			significance: {
				name: "significance",
				detail: "Optionnel. Multiple auquel le nombre doit être arrondi. Si l’argument précision est omis, sa valeur par défaut est 1."
			}
		}
	},
	LCM: {
		description: "Retourne le multiple le moins commun d’entiers. Le multiple le moins commun est le plus petit entier positif qui est un multiple de tous les arguments entiers nombre1, nombre2, etc. Utilisez LCM pour ajouter des fractions avec différents dénominateurs.",
		abstract: "Retourne le multiple le moins commun d’entiers. Le multiple le moins commun est le plus petit entier positif qui est un multiple de tous les arguments entiers nombre1, nombre2, etc. Utilisez LCM pour ajouter des fractions avec différents dénominateurs.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/lcm-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Number1 est obligatoire, les numéros suivants sont facultatifs. Ils représentent les 1 à 255 valeurs dont vous recherchez le plus petit commun multiple. Si une valeur n’est pas un nombre entier, elle est tronquée à sa partie entière."
			},
			number2: {
				name: "number2",
				detail: "Number1 est obligatoire, les numéros suivants sont facultatifs. Ils représentent les 1 à 255 valeurs dont vous recherchez le plus petit commun multiple. Si une valeur n’est pas un nombre entier, elle est tronquée à sa partie entière."
			}
		}
	},
	LN: {
		description: "Donne le logarithme népérien d’un nombre. Les logarithmes népériens sont ceux dont la base est la constante e (2,71828182845904).",
		abstract: "Donne le logarithme népérien d’un nombre. Les logarithmes népériens sont ceux dont la base est la constante e (2,71828182845904).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/ln-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire. Représente le nombre réel positif dont vous souhaitez obtenir le logarithme népérien."
		} }
	},
	LOG: {
		description: "Renvoie le logarithme d’un nombre de la base spécifiée.",
		abstract: "Renvoie le logarithme d’un nombre de la base spécifiée.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/log-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Représente le nombre réel positif dont vous souhaitez obtenir le logarithme."
			},
			base: {
				name: "base",
				detail: "Optionnel. Représente la base du logarithme. Si base est omis, la valeur par défaut est 10."
			}
		}
	},
	LOG10: {
		description: "Calcule le logarithme en base 10 d’un nombre.",
		abstract: "Calcule le logarithme en base 10 d’un nombre.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/log10-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire. Représente le nombre réel positif dont vous souhaitez obtenir le logarithme en base 10."
		} }
	},
	MDETERM: {
		description: "Renvoie le déterminant matriciel d’une matrice.",
		abstract: "Renvoie le déterminant matriciel d’une matrice.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/mdeterm-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "Obligatoire. Représente une matrice numérique comportant un nombre égal de lignes et de colonnes."
		} }
	},
	MINVERSE: {
		description: "Renvoie l’inverse matricielle d’une matrice.",
		abstract: "Renvoie l’inverse matricielle d’une matrice.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/minverse-function"
		}],
		functionParameter: { array: {
			name: "array",
			detail: "Tableau numérique comportant le même nombre de lignes et de colonnes."
		} }
	},
	MMULT: {
		description: "Renvoie le produit matriciel de deux matrices.",
		abstract: "Renvoie le produit matriciel de deux matrices.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/mmult-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Les tableaux à multiplier."
			},
			array2: {
				name: "array2",
				detail: "Les tableaux à multiplier."
			}
		}
	},
	MOD: {
		description: "Renvoie le reste de la division de l’argument nombre par l’argument diviseur. Le résultat est du même signe que diviseur.",
		abstract: "Renvoie le reste de la division de l’argument nombre par l’argument diviseur. Le résultat est du même signe que diviseur.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/mod-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Représente le nombre à diviser pour obtenir le reste."
			},
			divisor: {
				name: "divisor",
				detail: "Obligatoire. Représente le nombre par lequel vous souhaitez diviser le nombre."
			}
		}
	},
	MROUND: {
		description: "MROUND retourne un nombre arrondi au multiple souhaité.",
		abstract: "MROUND retourne un nombre arrondi au multiple souhaité.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/mround-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Représente la valeur à arrondir."
			},
			multiple: {
				name: "multiple",
				detail: "Obligatoire. Représente le multiple auquel vous souhaitez arrondir le nombre."
			}
		}
	},
	MULTINOMIAL: {
		description: "Renvoie le rapport de la factorielle d’une somme de valeurs sur le produit des factorielles.",
		abstract: "Renvoie le rapport de la factorielle d’une somme de valeurs sur le produit des factorielles.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/multinomial-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Number1 est obligatoire, les numéros suivants sont facultatifs. Ils représentent les 1 à 255 valeurs dont vous souhaitez obtenir la multinomiale."
			},
			number2: {
				name: "number2",
				detail: "Number1 est obligatoire, les numéros suivants sont facultatifs. Ils représentent les 1 à 255 valeurs dont vous souhaitez obtenir la multinomiale."
			}
		}
	},
	MUNIT: {
		description: "La fonction MUNIT retourne la matrice d’unités pour la dimension spécifiée.",
		abstract: "La fonction MUNIT retourne la matrice d’unités pour la dimension spécifiée.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/munit-function"
		}],
		functionParameter: { dimension: {
			name: "dimension",
			detail: "Entier indiquant la dimension de la matrice unité à renvoyer. La fonction renvoie un tableau. Dimension doit être supérieure à zéro."
		} }
	},
	ODD: {
		description: "Renvoie le nombre, arrondi à la valeur du nombre entier impair le plus proche en s’éloignant de zéro.",
		abstract: "Renvoie le nombre, arrondi à la valeur du nombre entier impair le plus proche en s’éloignant de zéro.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/odd-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire. Représente la valeur à arrondir."
		} }
	},
	PI: {
		description: "Renvoie la valeur 3,14159265358979, la constante mathématique pi, avec une précision de 15 décimales.",
		abstract: "Renvoie la valeur 3,14159265358979, la constante mathématique pi, avec une précision de 15 décimales.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/pi-function"
		}],
		functionParameter: {}
	},
	POWER: {
		description: "Renvoie la valeur du nombre élevé à une puissance.",
		abstract: "Renvoie la valeur du nombre élevé à une puissance.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/power-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Numéro de base. Il peut s’agir de n’importe quel nombre réel."
			},
			power: {
				name: "power",
				detail: "Obligatoire. Représente l’exposant auquel le nombre de base est élevé."
			}
		}
	},
	PRODUCT: {
		description: "La fonction PRODUIT multiplie tous les nombres donnés comme arguments et renvoie le produit. Par exemple, si les cellules A1 et A2 contiennent des nombres, vous pouvez utiliser la formule =PRODUCT(A1, A2) pour multiplier ces deux nombres ensemble. Vous pouvez également effectuer la même opération à l’aide de l’opérateur mathématique de multiplication ( * ), par exemple, =A1*A2 .",
		abstract: "La fonction PRODUIT multiplie tous les nombres donnés comme arguments et renvoie le produit. Par exemple, si les cellules A1 et A2 contiennent des nombres, vous pouvez utiliser la formule =PRODUCT(A1, A2) pour multiplier ces deux nombres ensemble. Vous pouvez également effectuer la même opération à l’aide de l’opérateur mathématique de multiplication ( * ), par exemple, =A1*A2 .",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/product-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obligatoire. Premier nombre ou plage que vous souhaitez multiplier."
			},
			number2: {
				name: "number2",
				detail: "Optionnel. Nombres ou plages supplémentaires que vous voulez multiplier, jusqu’à un maximum de 255 arguments."
			}
		}
	},
	QUOTIENT: {
		description: "Renvoie la partie entière du résultat d’une division. Utilisez cette fonction lorsque vous voulez ignorer le reste d’une division.",
		abstract: "Renvoie la partie entière du résultat d’une division. Utilisez cette fonction lorsque vous voulez ignorer le reste d’une division.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/quotient-function"
		}],
		functionParameter: {
			numerator: {
				name: "numerator",
				detail: "Obligatoire. Représente le dividende."
			},
			denominator: {
				name: "denominator",
				detail: "Obligatoire. Représente le diviseur."
			}
		}
	},
	RADIANS: {
		description: "Convertit des degrés en radians.",
		abstract: "Convertit des degrés en radians.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/radians-function"
		}],
		functionParameter: { angle: {
			name: "angle",
			detail: "Obligatoire. Désigne l’angle en degrés que vous souhaitez convertir."
		} }
	},
	RAND: {
		description: "ALEA renvoie un nombre réel aléatoire distribué de manière symétrique supérieur ou égal à 0 et inférieur à 1. Un nouveau nombre réel aléatoire est renvoyé chaque fois que la feuille de calcul est recalculée.",
		abstract: "ALEA renvoie un nombre réel aléatoire distribué de manière symétrique supérieur ou égal à 0 et inférieur à 1. Un nouveau nombre réel aléatoire est renvoyé chaque fois que la feuille de calcul est recalculée.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/rand-function"
		}],
		functionParameter: {}
	},
	RANDARRAY: {
		description: "Dans l’exemple suivant, nous avons créé un tableau de 5 lignes en hauteur x 3 colonnes de large. La première renvoie un ensemble de valeurs aléatoire compris entre 0 et 1, c'est-à-dire le comportement par défaut de TABLEAU. ALEA. L’autre renvoie une série de valeurs décimales aléatoires compris entre 1 et 100. Enfin, le troisième exemple renvoie une série de nombres entiers aléatoires compris entre 1 et 100.",
		abstract: "Dans l’exemple suivant, nous avons créé un tableau de 5 lignes en hauteur x 3 colonnes de large. La première renvoie un ensemble de valeurs aléatoire compris entre 0 et 1, c'est-à-dire le comportement par défaut de TABLEAU. ALEA. L’autre renvoie une série de valeurs décimales aléatoires compris entre 1 et 100. Enfin, le troisième exemple renvoie une série de nombres entiers aléatoires compris entre 1 et 100.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/randarray-function"
		}],
		functionParameter: {
			rows: {
				name: "rows",
				detail: "Nombre de lignes à renvoyer"
			},
			columns: {
				name: "columns",
				detail: "Nombre de colonnes à renvoyer"
			},
			min: {
				name: "min",
				detail: "Le nombre minimal que vous souhaitez renvoyé"
			},
			max: {
				name: "max",
				detail: "Le nombre maximal que vous souhaitez renvoyé"
			},
			wholeNumber: {
				name: "whole_number",
				detail: "Renvoyer un nombre entier ou une valeur décimale Vrai pour un nombre entier FALSE pour un nombre décimal"
			}
		}
	},
	RANDBETWEEN: {
		description: "Renvoie un nombre entier aléatoire entre les nombres que vous spécifiez. Un nouveau nombre entier aléatoire est renvoyé chaque fois que la feuille de calcul est calculée.",
		abstract: "Renvoie un nombre entier aléatoire entre les nombres que vous spécifiez. Un nouveau nombre entier aléatoire est renvoyé chaque fois que la feuille de calcul est calculée.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/randbetween-function"
		}],
		functionParameter: {
			bottom: {
				name: "bottom",
				detail: "Obligatoire. Représente le plus petit nombre entier que la fonction ALEA.ENTRE.BORNES peut renvoyer."
			},
			top: {
				name: "top",
				detail: "Obligatoire. Représente le plus grand nombre entier que la fonction ALEA.ENTRE.BORNES peut renvoyer."
			}
		}
	},
	ROMAN: {
		description: "Convertit un nombre arabe en nombre romain, sous forme de texte.",
		abstract: "Convertit un nombre arabe en nombre romain, sous forme de texte.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/roman-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Représente le chiffre arabe que vous souhaitez convertir."
			},
			form: {
				name: "form",
				detail: "Optionnel. Représente un argument déterminant le type de chiffres romains que vous souhaitez obtenir. Le style peut aller de Classique à Simplifié, c’est-à-dire devenir plus concis à mesure que les valeurs augmentent. Reportez-vous à l’exemple ROMAN(499,0) ci-dessous."
			}
		}
	},
	ROUND: {
		description: "La fonction ARRONDI arrondi un nombre à un nombre spécifié de chiffres. Par exemple, si la cellule A1 contient la valeur 23,7825 et que vous voulez l’arrondir à deux décimales, vous pouvez utiliser la formule suivante :",
		abstract: "La fonction ARRONDI arrondi un nombre à un nombre spécifié de chiffres. Par exemple, si la cellule A1 contient la valeur 23,7825 et que vous voulez l’arrondir à deux décimales, vous pouvez utiliser la formule suivante :",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/round-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Nombre à arrondir."
			},
			numDigits: {
				name: "num_digits",
				detail: "Obligatoire. Nombre de chiffres auquel vous voulez arrondir l’argument nombre."
			}
		}
	},
	ROUNDBANK: {
		description: "Arrondit un nombre selon la méthode de l’arrondi bancaire.",
		abstract: "Arrondit un nombre selon la méthode de l’arrondi bancaire.",
		links: [{
			title: "Instruction",
			url: ""
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Nombre à arrondir selon la méthode de l’arrondi bancaire."
			},
			numDigits: {
				name: "num_digits",
				detail: "Nombre de chiffres auquel effectuer l’arrondi bancaire."
			}
		}
	},
	ROUNDDOWN: {
		description: "Arrondit un nombre en tendant vers 0 (zéro).",
		abstract: "Arrondit un nombre en tendant vers 0 (zéro).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/rounddown-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Représente un nombre réel quelconque à arrondir en tendant vers zéro."
			},
			numDigits: {
				name: "num_digits",
				detail: "Obligatoire. Représente le nombre de chiffres à prendre en compte pour arrondir l’argument nombre."
			}
		}
	},
	ROUNDUP: {
		description: "Arrondit un nombre en s’éloignant de 0 (zéro).",
		abstract: "Arrondit un nombre en s’éloignant de 0 (zéro).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/roundup-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Représente un nombre réel quelconque à arrondir en s’éloignant de zéro."
			},
			numDigits: {
				name: "num_digits",
				detail: "Obligatoire. Représente le nombre de chiffres à prendre en compte pour arrondir l’argument nombre."
			}
		}
	},
	SEC: {
		description: "Renvoie la sécante d’un angle.",
		abstract: "Renvoie la sécante d’un angle.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/sec-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Angle en radians dont vous souhaitez obtenir la sécante."
		} }
	},
	SECH: {
		description: "Renvoie la sécante hyperbolique d’un angle.",
		abstract: "Renvoie la sécante hyperbolique d’un angle.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/sech-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Angle en radians dont vous souhaitez obtenir la sécante hyperbolique."
		} }
	},
	SERIESSUM: {
		description: "Renvoie la somme d’une série géométrique en s’appuyant sur la formule suivante :",
		abstract: "Renvoie la somme d’une série géométrique en s’appuyant sur la formule suivante :",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/seriessum-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obligatoire. Représente la valeur d’entrée de la série de puissances."
			},
			n: {
				name: "n",
				detail: "Obligatoire. Représente la puissance initiale à laquelle vous voulez élever x."
			},
			m: {
				name: "m",
				detail: "Obligatoire. Représente le degré d’accroissement de la valeur de l’argument n pour chacun des termes de la série."
			},
			coefficients: {
				name: "coefficients",
				detail: "Obligatoire. Représente un ensemble de coefficients multiplicateurs de chaque puissance successive de l’argument x. Le nombre de valeurs de l’argument coefficients détermine le nombre de termes de la série de puissances. Ainsi, si l’argument coefficients est composé de trois valeurs, la série comporte trois termes."
			}
		}
	},
	SEQUENCE: {
		description: "Dans l’exemple suivant, nous avons créé un tableau de 4 lignes x 5 colonnes avec la formule =SEQUENCE(4;5) .",
		abstract: "Dans l’exemple suivant, nous avons créé un tableau de 4 lignes x 5 colonnes avec la formule =SEQUENCE(4;5) .",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/sequence-function"
		}],
		functionParameter: {
			rows: {
				name: "rows",
				detail: "Nombre de lignes à renvoyer"
			},
			columns: {
				name: "columns",
				detail: "Nombre de colonnes à renvoyer"
			},
			start: {
				name: "start",
				detail: "Premier nombre de la séquence"
			},
			step: {
				name: "step",
				detail: "Montant à appliquer pour incrémenter chaque valeur suivante dans le tableau"
			}
		}
	},
	SIGN: {
		description: "Détermine le signe d’un nombre. Renvoie 1 si le nombre est positif, zéro (0) si le nombre est égal à 0 et -1 si le nombre est négatif.",
		abstract: "Détermine le signe d’un nombre. Renvoie 1 si le nombre est positif, zéro (0) si le nombre est égal à 0 et -1 si le nombre est négatif.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/sign-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire. Représente n’importe quel nombre réel."
		} }
	},
	SIN: {
		description: "Renvoie le sinus d’un nombre.",
		abstract: "Renvoie le sinus d’un nombre.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/sin-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire. Représente l’angle exprimé en radians dont vous voulez obtenir le sinus."
		} }
	},
	SINH: {
		description: "Renvoie le sinus hyperbolique d’un nombre.",
		abstract: "Renvoie le sinus hyperbolique d’un nombre.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/sinh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire. Représente n’importe quel nombre réel."
		} }
	},
	SQRT: {
		description: "Donne la racine carrée d’un nombre.",
		abstract: "Donne la racine carrée d’un nombre.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/sqrt-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire. Représente le nombre dont vous voulez obtenir la racine carrée."
		} }
	},
	SQRTPI: {
		description: "Renvoie la racine carrée de (nombre * pi).",
		abstract: "Renvoie la racine carrée de (nombre * pi).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/sqrtpi-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire. Représente le nombre par lequel pi est multiplié."
		} }
	},
	SUBTOTAL: {
		description: "Renvoie un sous-total dans une liste ou une base de données. Il est généralement plus facile de créer une liste comportant des sous-totaux à l’aide de la commande Sous-total du groupe Contour dans l’onglet Données de l’application de bureau Excel. Une fois cette liste de sous-totaux créée, vous pouvez la modifier en changeant la fonction SOUS.TOTAL.",
		abstract: "Renvoie un sous-total dans une liste ou une base de données. Il est généralement plus facile de créer une liste comportant des sous-totaux à l’aide de la commande Sous-total du groupe Contour dans l’onglet Données de l’application de bureau Excel. Une fois cette liste de sous-totaux créée, vous pouvez la modifier en changeant la fonction SOUS.TOTAL.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/subtotal-function"
		}],
		functionParameter: {
			functionNum: {
				name: "function_num",
				detail: "Obligatoire. Le nombre 1 à 11 ou 101 à 111 qui spécifie la fonction à utiliser pour calculer le sous-total. 1 à 11 inclut les lignes masquées manuellement, tandis que 101 à 111 les exclut ; les cellules filtrées sont toujours exclues."
			},
			ref1: {
				name: "ref1",
				detail: "Obligatoire. Première référence ou plage nommée dont vous souhaitez calculer le sous-total."
			},
			ref2: {
				name: "ref2",
				detail: "Optionnel. Plages ou références nommées 2 à 254 dont vous souhaitez calculer le sous-total."
			}
		}
	},
	SUM: {
		description: "La fonction SUM ajoute des valeurs. Vous pouvez ajouter des valeurs individuelles, des références ou des plages de cellules, ou une combinaison des trois.",
		abstract: "La fonction SUM ajoute des valeurs. Vous pouvez ajouter des valeurs individuelles, des références ou des plages de cellules, ou une combinaison des trois.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/sum-function"
		}],
		functionParameter: {
			number1: {
				name: "Number 1",
				detail: "Premier nombre à additionner. Le nombre peut être comme 4, une référence de cellule comme B6 ou une plage de cellules comme B2 :B8."
			},
			number2: {
				name: "Number 2",
				detail: "Il s’agit du deuxième nombre à additionner. Vous pouvez spécifier jusqu’à 255 nombres de cette façon."
			}
		}
	},
	SUMIF: {
		description: "Vous utilisez la fonction SUMIF pour additionner les valeurs d’une plage qui répondent aux critères que vous spécifiez. Par exemple, supposons que dans une colonne contenant des nombres, vous vouliez uniquement calculer la somme des valeurs supérieures à 5. Vous pouvez utiliser la formule suivante : =SUMIF(B2 :B25,\">5 »)",
		abstract: "Vous utilisez la fonction SUMIF pour additionner les valeurs d’une plage qui répondent aux critères que vous spécifiez. Par exemple, supposons que dans une colonne contenant des nombres, vous vouliez uniquement calculer la somme des valeurs supérieures à 5. Vous pouvez utiliser la formule suivante : =SUMIF(B2 :B25,\">5 »)",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/sumif-function"
		}],
		functionParameter: {
			range: {
				name: "range",
				detail: "Obligatoire. Plage de cellules à calculer en fonction du critère. Les cellules de chaque plage doivent être des nombres ou des noms, des matrices ou des références contenant des nombres. Les valeurs vides ou textuelles ne sont pas prises en compte. La plage sélectionnée peut contenir des dates au format Excel standard (voir exemples ci-dessous)."
			},
			criteria: {
				name: "criteria",
				detail: "Obligatoire. Critère, exprimé sous forme de nombre, d’expression, de référence de cellule, de texte ou de fonction qui définit les cellules à ajouter. Des caractères génériques peuvent être inclus : un point d’interrogation ( ?) pour correspondre à n’importe quel caractère, un astérisque (*) pour correspondre à n’importe quelle séquence de caractères. Si vous souhaitez trouver un point d’interrogation ou un astérisque réel, tapez un tilde ( ~ ) qui précède le caractère. Par exemple, les critères peuvent être exprimés sous la forme 32, «> 32 », « B5 », « 3 ? », « apple* », « *~ ? » ou TODAY(). Important Tous les critères textuels et tous les critères qui contiennent des symboles mathématiques ou logiques doivent être placés entre guillemets ( \" ). En revanche, les guillemets ne sont pas nécessaires pour les critères numériques."
			},
			sumRange: {
				name: "sum_range",
				detail: "Optionnel. Cellules réelles à ajouter, si vous souhaitez ajouter des cellules autres que celles spécifiées dans l’argument plage . Si l’argument sum_range est omis, Excel ajoute les cellules spécifiées dans l’argument range (les cellules auxquelles les critères sont appliqués). Sum_range doit avoir la même taille et la même forme que la plage . Si ce n’est pas le cas, les performances peuvent en pâtir et la formule additionne une plage de cellules qui commence par la première cellule de sum_range mais a les mêmes dimensions que la plage . Par exemple : plage plage_somme Cellules additionnées réelles A1:A5 B1:B5 B1:B5 A1:A5 B1:K5 B1:B5"
			}
		}
	},
	SUMIFS: {
		description: "Additionne tous les arguments qui répondent à plusieurs critères.",
		abstract: "Additionne tous les arguments qui répondent à plusieurs critères.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/sumifs-function"
		}],
		functionParameter: {
			sumRange: {
				name: "sum_range",
				detail: "Plage de cellules à additionner."
			},
			criteriaRange1: {
				name: "criteria_range1",
				detail: "Plage testée avec criteria1. criteria_range1 et criteria1 forment une paire de recherche : la plage est recherchée selon des critères précis, puis les valeurs correspondantes de sum_range sont additionnées."
			},
			criteria1: {
				name: "criteria1",
				detail: "Critère définissant les cellules de criteria_range1 à ajouter. Par exemple : 32, \">32\", B4, \"pommes\" ou \"32\"."
			},
			criteriaRange2: {
				name: "criteriaRange2",
				detail: "Plages supplémentaires. Vous pouvez saisir jusqu’à 127 paires de plages."
			},
			criteria2: {
				name: "criteria2",
				detail: "Critères associés supplémentaires. Vous pouvez saisir jusqu’à 127 paires de critères."
			}
		}
	},
	SUMPRODUCT: {
		description: "La fonction SUMPRODUCT retourne la somme des produits des plages ou tableaux correspondants. L’opération par défaut est la multiplication, mais l’addition, la soustraction et la division sont également possibles.",
		abstract: "La fonction SUMPRODUCT retourne la somme des produits des plages ou tableaux correspondants. L’opération par défaut est la multiplication, mais l’addition, la soustraction et la division sont également possibles.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/sumproduct-function"
		}],
		functionParameter: {
			array1: {
				name: "array",
				detail: "Représente le premier argument de matrice dont vous voulez multiplier les valeurs pour ensuite additionner leur produit."
			},
			array2: {
				name: "array",
				detail: "Arguments de matrices 2 à 255 dont vous voulez multiplier les valeurs pour ensuite additionner leur produit."
			}
		}
	},
	SUMSQ: {
		description: "Renvoie la somme des carrés des arguments.",
		abstract: "Renvoie la somme des carrés des arguments.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/sumsq-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Number1 est obligatoire. Les numéros suivants sont facultatifs. Il peut y avoir jusqu’à 255 arguments pour lesquels vous souhaitez la somme des carrés."
			},
			number2: {
				name: "number2",
				detail: "Number1 est obligatoire. Les numéros suivants sont facultatifs. Il peut y avoir jusqu’à 255 arguments pour lesquels vous souhaitez la somme des carrés."
			}
		}
	},
	SUMX2MY2: {
		description: "Renvoie la somme des différences des carrés des valeurs correspondantes de deux matrices.",
		abstract: "Renvoie la somme des différences des carrés des valeurs correspondantes de deux matrices.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/sumx2my2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "array_x",
				detail: "Obligatoire. Représente la première matrice ou plage de valeurs."
			},
			arrayY: {
				name: "array_y",
				detail: "Obligatoire. Représente la seconde matrice ou plage de valeurs."
			}
		}
	},
	SUMX2PY2: {
		description: "Renvoie la somme des sommes des carrés des valeurs correspondantes de deux matrices.",
		abstract: "Renvoie la somme des sommes des carrés des valeurs correspondantes de deux matrices.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/sumx2py2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "array_x",
				detail: "Premier tableau ou première plage de valeurs."
			},
			arrayY: {
				name: "array_y",
				detail: "Deuxième tableau ou deuxième plage de valeurs."
			}
		}
	},
	SUMXMY2: {
		description: "La fonction SUMXMY2 retourne la somme des carrés des différences de valeurs correspondantes dans deux tableaux.",
		abstract: "La fonction SUMXMY2 retourne la somme des carrés des différences de valeurs correspondantes dans deux tableaux.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/sumxmy2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "array_x",
				detail: "Premier tableau ou plage de valeurs. Obligatoire."
			},
			arrayY: {
				name: "array_y",
				detail: "Deuxième tableau ou plage de valeurs. Obligatoire."
			}
		}
	},
	TAN: {
		description: "Renvoie la tangente de l’angle donné.",
		abstract: "Renvoie la tangente de l’angle donné.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/tan-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire. Représente l’angle exprimé en radians dont vous voulez calculer la tangente."
		} }
	},
	TANH: {
		description: "Donne la tangente hyperbolique d’un nombre.",
		abstract: "Donne la tangente hyperbolique d’un nombre.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/tanh-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire. Représente n’importe quel nombre réel."
		} }
	},
	TRUNC: {
		description: "Les fonctions TRUNC tronquent un nombre en entier en supprimant la partie fractionnaire du nombre.",
		abstract: "Les fonctions TRUNC tronquent un nombre en entier en supprimant la partie fractionnaire du nombre.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/trunc-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Représente le nombre à tronquer."
			},
			numDigits: {
				name: "num_digits",
				detail: "Optionnel. Représente le nombre de décimales apparaissant à droite de la virgule après que le chiffre a été tronqué. La valeur par défaut de no_chiffres est 0 (zéro)."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/statistical/fr-FR.ts
const locale$4 = {
	AVEDEV: {
		description: "Renvoie la moyenne des écarts absolus des observations par rapport à leur moyenne arithmétique. ECART.MOYEN mesure la dispersion dans un ensemble de données.",
		abstract: "Renvoie la moyenne des écarts absolus des observations par rapport à leur moyenne arithmétique. ECART.MOYEN mesure la dispersion dans un ensemble de données.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/avedev-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Number1 est obligatoire, les numéros suivants sont facultatifs. Il s’agit des 1 à 255 arguments pour lesquels vous recherchez la moyenne des écarts par rapport à leur moyenne. Vous pouvez également substituer à des arguments séparés par un point-virgule, une matrice unique ou une référence à une matrice."
			},
			number2: {
				name: "number2",
				detail: "Number1 est obligatoire, les numéros suivants sont facultatifs. Il s’agit des 1 à 255 arguments pour lesquels vous recherchez la moyenne des écarts par rapport à leur moyenne. Vous pouvez également substituer à des arguments séparés par un point-virgule, une matrice unique ou une référence à une matrice."
			}
		}
	},
	AVERAGE: {
		description: "Retourne la moyenne (arithmétique) des arguments. Par exemple, si la plage A1 :A20 contient des nombres, la formule =AVERAGE(A1 :A20) retourne la moyenne de ces nombres.",
		abstract: "Retourne la moyenne (arithmétique) des arguments. Par exemple, si la plage A1 :A20 contient des nombres, la formule =AVERAGE(A1 :A20) retourne la moyenne de ces nombres.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/average-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obligatoire. Premier nombre, référence de cellule ou plage pour lequel vous souhaitez obtenir la moyenne."
			},
			number2: {
				name: "number2",
				detail: "Optionnel. Nombres, références de cellules ou plages supplémentaires dont vous voulez obtenir la moyenne (255 maximum)."
			}
		}
	},
	AVERAGE_WEIGHTED: {
		description: "La fonction AVERAGE.WEIGHTED calcule la moyenne pondérée d’un ensemble de valeurs à partir de ces valeurs et de leurs pondérations respectives.",
		abstract: "La fonction AVERAGE.WEIGHTED calcule la moyenne pondérée d’un ensemble de valeurs à partir de ces valeurs et de leurs pondérations respectives.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/9084098?hl=fr"
		}],
		functionParameter: {
			values: {
				name: "valeurs",
				detail: "AVERAGE.WEIGHTED(A1:A2; B1:B2)"
			},
			weights: {
				name: "pondérations",
				detail: "AVERAGE.WEIGHTED(A1:A2; B1:B2; C1; C2)"
			},
			additionalValues: {
				name: "valeurs_supplémentaires",
				detail: "Valeurs supplémentaires dont calculer la moyenne. Ces valeurs sont facultatives."
			},
			additionalWeights: {
				name: "pondérations_supplémentaires",
				detail: "Pondérations supplémentaires à appliquer. Elles sont facultatives, mais chaque valeur_supplémentaire doit être suivie d’exactement une pondération_supplémentaire."
			}
		}
	},
	AVERAGEA: {
		description: "Calcule la moyenne (arithmétique) des valeurs contenues dans la liste des arguments.",
		abstract: "Calcule la moyenne (arithmétique) des valeurs contenues dans la liste des arguments.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/averagea-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Value1 est obligatoire, les valeurs suivantes sont facultatives. Il s’agit des 1 à 255 cellules, plages de cellules ou valeurs dont vous voulez calculer la moyenne."
			},
			value2: {
				name: "value2",
				detail: "Value1 est obligatoire, les valeurs suivantes sont facultatives. Il s’agit des 1 à 255 cellules, plages de cellules ou valeurs dont vous voulez calculer la moyenne."
			}
		}
	},
	AVERAGEIF: {
		description: "Renvoie la moyenne (arithmétique) de toutes les cellules d’une plage qui répondent à des critères donnés.",
		abstract: "Renvoie la moyenne (arithmétique) de toutes les cellules d’une plage qui répondent à des critères donnés.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/averageif-function"
		}],
		functionParameter: {
			range: {
				name: "range",
				detail: "Obligatoire. Une ou plusieurs cellules dont la moyenne doit être calculée, y compris des nombres ou des noms, des tableaux ou des références qui contiennent des nombres."
			},
			criteria: {
				name: "criteria",
				detail: "Obligatoire. Représente le critère, sous forme de nombre, d’expression, de référence de cellule ou de texte, qui détermine les cellules dont la moyenne est à calculer. Par exemple, les critères peuvent être exprimés sous la forme 32, « 32 », «> 32 », « pommes » ou B4."
			},
			averageRange: {
				name: "average_range",
				detail: "Optionnel. Représente l’ensemble des cellules dont la moyenne est à calculer. Si cet argument est omis, l’argument plage est utilisé."
			}
		}
	},
	AVERAGEIFS: {
		description: "Renvoie la moyenne (arithmétique) de toutes les cellules qui répondent à plusieurs critères.",
		abstract: "Renvoie la moyenne (arithmétique) de toutes les cellules qui répondent à plusieurs critères.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/averageifs-function"
		}],
		functionParameter: {
			averageRange: {
				name: "average_range",
				detail: "Obligatoire. Une ou plusieurs cellules dont la moyenne doit être calculée, y compris des nombres ou des noms, des tableaux ou des références qui contiennent des nombres."
			},
			criteriaRange1: {
				name: "criteria_range1",
				detail: "Plage_critères1 est obligatoire, les plages_critères supplémentaires sont facultatives. Représente de 1 à 127 plages dans lesquelles les critères associés sont à évaluer."
			},
			criteria1: {
				name: "criteria1",
				detail: "Criteria1 est obligatoire, les critères suivants sont facultatifs. Représente de 1 à 127 critères, sous forme de nombre, d’expression, de référence de cellule ou de texte, qui déterminent les cellules dont la moyenne doit être calculée. Par exemple, les critères peuvent être exprimés sous la forme 32, « 32 », «> 32 », « pommes » ou B4."
			},
			criteriaRange2: {
				name: "criteria_range2",
				detail: "Plage_critères1 est obligatoire, les plages_critères supplémentaires sont facultatives. Représente de 1 à 127 plages dans lesquelles les critères associés sont à évaluer."
			},
			criteria2: {
				name: "criteria2",
				detail: "Criteria1 est obligatoire, les critères suivants sont facultatifs. Représente de 1 à 127 critères, sous forme de nombre, d’expression, de référence de cellule ou de texte, qui déterminent les cellules dont la moyenne doit être calculée. Par exemple, les critères peuvent être exprimés sous la forme 32, « 32 », «> 32 », « pommes » ou B4."
			}
		}
	},
	BETA_DIST: {
		description: "Cette fonction de distribution bêta est généralement utilisée pour étudier la variation du pourcentage d’un élément présent dans des échantillonnages, par exemple, la durée quotidienne pendant laquelle les gens regardent la télévision.",
		abstract: "Cette fonction de distribution bêta est généralement utilisée pour étudier la variation du pourcentage d’un élément présent dans des échantillonnages, par exemple, la durée quotidienne pendant laquelle les gens regardent la télévision.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/beta-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obligatoire. Représente la valeur comprise entre A et B à laquelle la fonction doit être calculée."
			},
			alpha: {
				name: "alpha",
				detail: "Obligatoire. Représente un paramètre de la distribution."
			},
			beta: {
				name: "beta",
				detail: "Obligatoire. Représente un paramètre de la distribution."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obligatoire. Représente une valeur logique déterminant le mode de calcul de la fonction : cumulatif ou non. Si l’argument cumulative est VRAI, la fonction LOI.BETA.N renvoie la fonction de distribution cumulée ; si l’argument cumulative est FAUX, la fonction renvoie la fonction de densité de probabilité."
			},
			A: {
				name: "A",
				detail: "Représente une limite inférieure de l’intervalle des x."
			},
			B: {
				name: "B",
				detail: "Facultatif. Représente une limite supérieure de l’intervalle des x."
			}
		}
	},
	BETA_INV: {
		description: "Si probabilité = LOI.BETA.N(x,...VRAI), alors BETA.INVERSE.N(probabilité,...) = x. La distribution bêta peut être utilisée en planification de projets afin de prévoir les dates d’achèvement probables en fonction d’une durée et d’une dispersion prévues.",
		abstract: "Si probabilité = LOI.BETA.N(x,...VRAI), alors BETA.INVERSE.N(probabilité,...) = x. La distribution bêta peut être utilisée en planification de projets afin de prévoir les dates d’achèvement probables en fonction d’une durée et d’une dispersion prévues.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/beta-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obligatoire. Représente la probabilité associée à la distribution bêta."
			},
			alpha: {
				name: "alpha",
				detail: "Obligatoire. Représente un paramètre de la distribution."
			},
			beta: {
				name: "beta",
				detail: "Obligatoire. Représente un paramètre de la distribution."
			},
			A: {
				name: "A",
				detail: "Représente une limite inférieure de l’intervalle des x."
			},
			B: {
				name: "B",
				detail: "Facultatif. Représente une limite supérieure de l’intervalle des x."
			}
		}
	},
	BINOM_DIST: {
		description: "Renvoie la probabilité d’une variable aléatoire discrète suivant la loi binomiale. Utilisez la fonction LOI.BINOMIALE.N pour résoudre des problèmes comportant un nombre de tests ou d’essais déterminé, lorsque le résultat des essais ne peut être qu’un succès ou un échec, lorsque les essais sont indépendants, ou lorsque la probabilité de succès est constante au cours des expérimentations. La fonction LOI.BINOMIALE.N peut, par exemple, calculer la probabilité pour que deux des trois enfants à naître soient des garçons.",
		abstract: "Renvoie la probabilité d’une variable aléatoire discrète suivant la loi binomiale. Utilisez la fonction LOI.BINOMIALE.N pour résoudre des problèmes comportant un nombre de tests ou d’essais déterminé, lorsque le résultat des essais ne peut être qu’un succès ou un échec, lorsque les essais sont indépendants, ou lorsque la probabilité de succès est constante au cours des expérimentations. La fonction LOI.BINOMIALE.N peut, par exemple, calculer la probabilité pour que deux des trois enfants à naître soient des garçons.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/binom-dist-function"
		}],
		functionParameter: {
			numberS: {
				name: "number_s",
				detail: "Obligatoire. Représente le nombre d’essais réussis."
			},
			trials: {
				name: "trials",
				detail: "Obligatoire. Représente le nombre d’essais indépendants."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Obligatoire. Représente la probabilité de succès de chaque essai."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obligatoire. Représente une valeur logique qui détermine le mode de calcul de la fonction. Si l’argument cumulative a la valeur VRAI, alors LOI.BINOMIALE.N renvoie la fonction de distribution cumulée qui représente la probabilité qu’il y ait au plus nombre_s succès ; si l’argument cumulative a la valeur FAUX, LOI.BINOMIALE.N renvoie la fonction de probabilité de masse qui représente la probabilité qu’il y ait nombre_s succès."
			}
		}
	},
	BINOM_DIST_RANGE: {
		description: "Renvoie la probabilité d’un résultat d’essai à l’aide d’une distribution binomiale.",
		abstract: "Renvoie la probabilité d’un résultat d’essai à l’aide d’une distribution binomiale.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/binom-dist-range-function"
		}],
		functionParameter: {
			trials: {
				name: "trials",
				detail: "Obligatoire. Nombre d’essais indépendants. Doit être supérieur ou égal à 0."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Obligatoire. Représente la probabilité de succès de chaque essai. Doit être supérieur ou égal à 0 et inférieur ou égal à 1."
			},
			numberS: {
				name: "number_s",
				detail: "Obligatoire. Représente le nombre de succès lors des essais. Doit être supérieur ou égal à 0 et inférieur ou égal à Essais."
			},
			numberS2: {
				name: "number_s2",
				detail: "Optionnel. Si cet argument est fourni, renvoie la probabilité que le nombre d’essais réussis soit compris entre Nombre_succès et nombre_succès2. Doit être supérieur ou égal à Nombre_succès et inférieur ou égal à Essais."
			}
		}
	},
	BINOM_INV: {
		description: "Renvoie la plus petite valeur pour laquelle la distribution binomiale cumulée est supérieure ou égale à une valeur de critère.",
		abstract: "Renvoie la plus petite valeur pour laquelle la distribution binomiale cumulée est supérieure ou égale à une valeur de critère.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/binom-inv-function"
		}],
		functionParameter: {
			trials: {
				name: "trials",
				detail: "Obligatoire. Représente le nombre d’essais de Bernoulli."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Obligatoire. Représente la probabilité de succès de chaque essai."
			},
			alpha: {
				name: "alpha",
				detail: "Obligatoire. Représente la valeur de critère."
			}
		}
	},
	CHISQ_DIST: {
		description: "Renvoie la distribution du Khi-deux.",
		abstract: "Renvoie la distribution du Khi-deux.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/chisq-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obligatoire. Représente la valeur à laquelle vous voulez évaluer la distribution."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Obligatoire. Représente le nombre de degrés de liberté."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obligatoire. Représente une valeur logique déterminant le mode de calcul de la fonction : cumulatif ou non. Si l’argument cumulative est VRAI, la fonction LOI.KHIDEUX.N renvoie la fonction de distribution cumulée ; si l’argument cumulative est FAUX, la fonction renvoie la fonction de densité de probabilité."
			}
		}
	},
	CHISQ_DIST_RT: {
		description: "La distribution χ2 est associée à un test χ2. Utilisez un test χ2 pour comparer les valeurs obtenues aux valeurs prévues. Par exemple, une expérience génétique fait l’hypothèse que la prochaine génération de plantes présentera un ensemble de couleurs donné. En comparant les résultats obtenus aux résultats prévus, vous pouvez déterminer si votre hypothèse de départ était correcte.",
		abstract: "La distribution χ2 est associée à un test χ2. Utilisez un test χ2 pour comparer les valeurs obtenues aux valeurs prévues. Par exemple, une expérience génétique fait l’hypothèse que la prochaine génération de plantes présentera un ensemble de couleurs donné. En comparant les résultats obtenus aux résultats prévus, vous pouvez déterminer si votre hypothèse de départ était correcte.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/chisq-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obligatoire. Représente la valeur à laquelle vous voulez évaluer la distribution."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Obligatoire. Représente le nombre de degrés de liberté."
			}
		}
	},
	CHISQ_INV: {
		description: "La distribution khi-deux est généralement utilisée pour étudier la variation du pourcentage d’un élément présent dans des échantillonnages, par exemple, la durée quotidienne pendant laquelle les gens regardent la télévision.",
		abstract: "La distribution khi-deux est généralement utilisée pour étudier la variation du pourcentage d’un élément présent dans des échantillonnages, par exemple, la durée quotidienne pendant laquelle les gens regardent la télévision.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/chisq-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obligatoire. Représente une probabilité associée à la distribution khi-deux."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Obligatoire. Représente le nombre de degrés de liberté."
			}
		}
	},
	CHISQ_INV_RT: {
		description: "Si probabilité = LOI.KHIDEUX.DROITE(x,...), alors LOI.KHIDEUX.INVERSE.DROITE(probabilité,...) = x. Utilisez cette fonction pour comparer les résultats obtenus aux résultats prévus afin de déterminer si votre hypothèse de départ était juste.",
		abstract: "Si probabilité = LOI.KHIDEUX.DROITE(x,...), alors LOI.KHIDEUX.INVERSE.DROITE(probabilité,...) = x. Utilisez cette fonction pour comparer les résultats obtenus aux résultats prévus afin de déterminer si votre hypothèse de départ était juste.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/chisq-inv-rt-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obligatoire. Représente une probabilité associée à la distribution khi-deux."
			},
			degFreedom: {
				name: "deg_freedom",
				detail: "Obligatoire. Représente le nombre de degrés de liberté."
			}
		}
	},
	CHISQ_TEST: {
		description: "Renvoie le test d’indépendance. CHISQ.TEST renvoie la valeur de la distribution khi-deux (χ2) pour la statistique et les degrés de liberté appropriés. Utilisez les tests χ2 pour déterminer si les résultats prévus sont vérifiés par une expérimentation.",
		abstract: "Renvoie le test d’indépendance. CHISQ.TEST renvoie la valeur de la distribution khi-deux (χ2) pour la statistique et les degrés de liberté appropriés. Utilisez les tests χ2 pour déterminer si les résultats prévus sont vérifiés par une expérimentation.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/chisq-test-function"
		}],
		functionParameter: {
			actualRange: {
				name: "actual_range",
				detail: "Obligatoire. Représente la plage de données contenant les observations à comparer aux valeurs prévues."
			},
			expectedRange: {
				name: "expected_range",
				detail: "Obligatoire. Représente la plage de données contenant le rapport du produit des totaux de ligne et de colonne avec le total général."
			}
		}
	},
	CONFIDENCE_NORM: {
		description: "L’intervalle de confiance est une plage de valeurs. Votre moyenne d’échantillonnage, x, se trouve au centre de cette plage, et la plage est x ± INTERVALLE.CONFIANCE.NORMAL. Par exemple, si x est la moyenne d’échantillonnage des délais de livraison des articles commandés par courrier, x ± INTERVALLE.CONFIANCE.NORMAL est une plage de moyennes d’échantillonnage. Pour une moyenne de population au hasard, µ0, dans cette plage, la probabilité d’obtenir une moyenne d’échantillonnage plus éloignée de µ0 que x est plus élevée que alpha ; pour une moyenne de population au hasard, µ0, en dehors de cette plage, la probabilité d’obtenir une moyenne d’échantillonnage plus éloignée de µ0 que x est inférieure à alpha. En d’autres termes, supposons que nous utilisons x, standard_dev et size pour construire un test bilatéral au niveau critique alpha de l’hypothèse selon laquelle la moyenne de population est µ0. Dans ce cas, nous ne rejetterons pas l’hypothèse si µ0 se trouve dans l’intervalle de confiance, mais bien si µ0 ne s’y trouve pas. L’intervalle de confiance ne nous permet pas de déduire qu’il y a une probabilité de 1 – alpha que notre prochain paquet ait un délai de livraison situé dans l’intervalle de confiance.",
		abstract: "L’intervalle de confiance est une plage de valeurs. Votre moyenne d’échantillonnage, x, se trouve au centre de cette plage, et la plage est x ± INTERVALLE.CONFIANCE.NORMAL. Par exemple, si x est la moyenne d’échantillonnage des délais de livraison des articles commandés par courrier, x ± INTERVALLE.CONFIANCE.NORMAL est une plage de moyennes d’échantillonnage. Pour une moyenne de population au hasard, µ0, dans cette plage, la probabilité d’obtenir une moyenne d’échantillonnage plus éloignée de µ0 que x est plus élevée que alpha ; pour une moyenne de population au hasard, µ0, en dehors de cette plage, la probabilité d’obtenir une moyenne d’échantillonnage plus éloignée de µ0 que x est inférieure à alpha. En d’autres termes, supposons que nous utilisons x, standard_dev et size pour construire un test bilatéral au niveau critique alpha de l’hypothèse selon laquelle la moyenne de population est µ0. Dans ce cas, nous ne rejetterons pas l’hypothèse si µ0 se trouve dans l’intervalle de confiance, mais bien si µ0 ne s’y trouve pas. L’intervalle de confiance ne nous permet pas de déduire qu’il y a une probabilité de 1 – alpha que notre prochain paquet ait un délai de livraison situé dans l’intervalle de confiance.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/confidence-norm-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "Obligatoire. Niveau de précision utilisé pour calculer le niveau de confiance. Le niveau de confiance est égal à 100*(1 - alpha) %, ou en d’autres termes, un alpha de 0,05 indique un niveau de confiance de 95 %."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Obligatoire. Représente l’écart-type de population pour la plage de données ; cet argument est supposé être connu."
			},
			size: {
				name: "size",
				detail: "Obligatoire. Représente la taille de l’échantillon."
			}
		}
	},
	CONFIDENCE_T: {
		description: "Renvoie l’intervalle de confiance pour la moyenne d’une population, à l’aide d’une distribution t de Student.",
		abstract: "Renvoie l’intervalle de confiance pour la moyenne d’une population, à l’aide d’une distribution t de Student.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/confidence-t-function"
		}],
		functionParameter: {
			alpha: {
				name: "alpha",
				detail: "Obligatoire. Niveau de précision utilisé pour calculer le niveau de confiance. Le niveau de confiance est égal à 100*(1 - alpha) %, ou en d’autres termes, un alpha de 0,05 indique un niveau de confiance de 95 %."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Obligatoire. Représente l’écart-type de population pour la plage de données ; cet argument est supposé être connu."
			},
			size: {
				name: "size",
				detail: "Obligatoire. Représente la taille de l’échantillon."
			}
		}
	},
	CORREL: {
		description: "Renvoie le coefficient de corrélation entre deux jeux de données.",
		abstract: "Renvoie le coefficient de corrélation entre deux jeux de données.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/correl-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Première plage de valeurs de cellules."
			},
			array2: {
				name: "array2",
				detail: "Deuxième plage de valeurs de cellules."
			}
		}
	},
	COUNT: {
		description: "La fonction NB compte le nombre de cellules contenant des nombres et les nombres compris dans la liste des arguments. Utilisez la fonction NB pour obtenir le nombre d’entrées numériques dans un champ numérique d’une plage ou d’une matrice de nombres. Vous pouvez, par exemple, entrer la formule suivante pour compter les nombres de la plage A1:A20 : =NB(A1:A20) . Dans cet exemple, si 5 des cellules de la plage contiennent des nombres, le résultat est 5 .",
		abstract: "La fonction NB compte le nombre de cellules contenant des nombres et les nombres compris dans la liste des arguments. Utilisez la fonction NB pour obtenir le nombre d’entrées numériques dans un champ numérique d’une plage ou d’une matrice de nombres. Vous pouvez, par exemple, entrer la formule suivante pour compter les nombres de la plage A1:A20 : =NB(A1:A20) . Dans cet exemple, si 5 des cellules de la plage contiennent des nombres, le résultat est 5 .",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/count-function"
		}],
		functionParameter: {
			value1: {
				name: "value 1",
				detail: "Obligatoire. Premier élément, référence de la cellule ou plage dans laquelle vous souhaitez compter les nombres."
			},
			value2: {
				name: "value 2",
				detail: "Optionnel. Jusqu’à 255 éléments supplémentaires, références de cellules ou plages dans lesquelles vous souhaitez compter les nombres."
			}
		}
	},
	COUNTA: {
		description: "La fonction COUNTA compte le nombre de cellules qui ne sont pas vides dans une plage.",
		abstract: "La fonction COUNTA compte le nombre de cellules qui ne sont pas vides dans une plage.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/counta-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Value1 est obligatoire, les valeurs suivantes sont facultatives. Il s’agit des 1 à 255 cellules, plages de cellules ou valeurs dont vous voulez calculer la moyenne."
			},
			value2: {
				name: "value2",
				detail: "Value1 est obligatoire, les valeurs suivantes sont facultatives. Il s’agit des 1 à 255 cellules, plages de cellules ou valeurs dont vous voulez calculer la moyenne."
			}
		}
	},
	COUNTBLANK: {
		description: "Utilisez la fonction COUNTBLANK , l’une des fonctions statistiques , pour compter le nombre de cellules vides dans une plage de cellules.",
		abstract: "Utilisez la fonction COUNTBLANK , l’une des fonctions statistiques , pour compter le nombre de cellules vides dans une plage de cellules.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/countblank-function"
		}],
		functionParameter: { range: {
			name: "range",
			detail: "Obligatoire. Représente la plage dans laquelle vous voulez compter les cellules vides."
		} }
	},
	COUNTIF: {
		description: "NB.SI, l’une des fonctions Statistiques , permet de compter le nombre de cellules qui répondent à un critère ; par exemple, pour compter le nombre de fois où le nom d’une ville apparaît dans une liste de clients.",
		abstract: "NB.SI, l’une des fonctions Statistiques , permet de compter le nombre de cellules qui répondent à un critère ; par exemple, pour compter le nombre de fois où le nom d’une ville apparaît dans une liste de clients.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/use-the-countif-function-in-microsoft-excel"
		}],
		functionParameter: {
			range: {
				name: "range",
				detail: "Le groupe de cellules à compter. La plage peut contenir des nombres, des tableaux, une plage nommée ou des références qui contiennent des nombres. Les valeurs vides et textuelles sont ignorées. Découvrez comment sélectionner des plages dans une feuille de calcul ."
			},
			criteria: {
				name: "criteria",
				detail: "Nombre, expression, référence de cellule ou chaîne de texte qui détermine les cellules à compter. Par exemple, vous pouvez utiliser un nombre comme 32, une comparaison comme «> 32 », une cellule comme B4 ou un mot comme « pommes ». NB.SI utilise un seul critère. Utilisez NB.SI.ENS Si vous voulez utiliser plusieurs critères."
			}
		}
	},
	COUNTIFS: {
		description: "La fonction COUNTIFS applique des critères à des cellules sur plusieurs plages et compte le nombre de fois où tous les critères sont remplis.",
		abstract: "La fonction COUNTIFS applique des critères à des cellules sur plusieurs plages et compte le nombre de fois où tous les critères sont remplis.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/countifs-function"
		}],
		functionParameter: {
			criteriaRange1: {
				name: "criteria_range1",
				detail: "Obligatoire. La première plage dans laquelle évaluer les critères associés."
			},
			criteria1: {
				name: "criteria1",
				detail: "Obligatoire. Critères, sous forme de nombre, d’expression, de référence de cellule ou de texte, qui déterminent les cellules à compter. Par exemple, les critères peuvent être exprimés sous la forme 32, «> 32 », B4, « pommes » ou « 32 »."
			},
			criteriaRange2: {
				name: "criteria_range2",
				detail: "Optionnel. Plages supplémentaires et leurs critères associés. Jusqu’à 127 paires plage/critères sont autorisées."
			},
			criteria2: {
				name: "criteria2",
				detail: "Optionnel. Plages supplémentaires et leurs critères associés. Jusqu’à 127 paires plage/critères sont autorisées."
			}
		}
	},
	COVARIANCE_P: {
		description: "Renvoie la covariance de population, moyenne des produits des écarts pour chaque paire de points de données dans deux jeux de données. Utilisez la covariance pour déterminer la relation entre deux jeux de données. Par exemple, vous pouvez examiner si des revenus plus élevés correspondent à un meilleur niveau d’éducation.",
		abstract: "Renvoie la covariance de population, moyenne des produits des écarts pour chaque paire de points de données dans deux jeux de données. Utilisez la covariance pour déterminer la relation entre deux jeux de données. Par exemple, vous pouvez examiner si des revenus plus élevés correspondent à un meilleur niveau d’éducation.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/covariance-p-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Obligatoire. Représente la première plage de cellules de nombres entiers."
			},
			array2: {
				name: "array2",
				detail: "Obligatoire. Représente la seconde plage de cellules de nombres entiers."
			}
		}
	},
	COVARIANCE_S: {
		description: "Renvoie la covariance d’échantillon, moyenne des produits des écarts pour chaque paire de points de deux jeux de données.",
		abstract: "Renvoie la covariance d’échantillon, moyenne des produits des écarts pour chaque paire de points de deux jeux de données.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/covariance-s-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Obligatoire. Représente la première plage de cellules de nombres entiers."
			},
			array2: {
				name: "array2",
				detail: "Obligatoire. Représente la seconde plage de cellules de nombres entiers."
			}
		}
	},
	DEVSQ: {
		description: "Renvoie la somme des carrés des écarts entre les points de données et leur moyenne échantillonnée.",
		abstract: "Renvoie la somme des carrés des écarts entre les points de données et leur moyenne échantillonnée.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/devsq-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Number1 est obligatoire, les numéros suivants sont facultatifs. Il s’agit des 1 à 255 arguments pour lesquels vous voulez calculer la somme des carrés des écarts. Vous pouvez aussi utiliser une matrice ou une référence à une matrice, plutôt que des arguments séparés par des points-virgules."
			},
			number2: {
				name: "number2",
				detail: "Number1 est obligatoire, les numéros suivants sont facultatifs. Il s’agit des 1 à 255 arguments pour lesquels vous voulez calculer la somme des carrés des écarts. Vous pouvez aussi utiliser une matrice ou une référence à une matrice, plutôt que des arguments séparés par des points-virgules."
			}
		}
	},
	EXPON_DIST: {
		description: "Renvoie la distribution exponentielle. Utilisez la fonction LOI.EXPONENTIELLE.N pour prévoir la durée séparant des événements, tel le temps mis par un distributeur automatique bancaire pour délivrer de l’argent. Par exemple, vous pouvez utiliser LOI.EXPONENTIELLE.N pour calculer la probabilité que l’opération dure moins d’une minute.",
		abstract: "Renvoie la distribution exponentielle. Utilisez la fonction LOI.EXPONENTIELLE.N pour prévoir la durée séparant des événements, tel le temps mis par un distributeur automatique bancaire pour délivrer de l’argent. Par exemple, vous pouvez utiliser LOI.EXPONENTIELLE.N pour calculer la probabilité que l’opération dure moins d’une minute.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/expon-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obligatoire. Représente la valeur de la fonction."
			},
			lambda: {
				name: "lambda",
				detail: "Obligatoire. Représente la valeur du paramètre."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obligatoire. Valeur logique qui indique la forme de la fonction exponentielle à fournir. Si cumulative a la valeur TRUE, EXPON. DIST retourne la fonction de distribution cumulée ; si la valeur est FALSE, elle retourne la fonction de densité de probabilité."
			}
		}
	},
	F_DIST: {
		description: "Renvoie la distribution de probabilité F.",
		abstract: "Renvoie la distribution de probabilité F.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/f-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Valeur à laquelle évaluer la fonction."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Degrés de liberté du numérateur."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Degrés de liberté du dénominateur."
			},
			cumulative: {
				name: "cumulative",
				detail: "Valeur logique qui détermine la forme de la fonction. Si cumulative vaut TRUE, F.DIST renvoie la fonction de distribution cumulée ; sinon, la fonction de densité de probabilité."
			}
		}
	},
	F_DIST_RT: {
		description: "Renvoie la distribution de probabilité F unilatérale à droite.",
		abstract: "Renvoie la distribution de probabilité F unilatérale à droite.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/f-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Valeur à laquelle évaluer la fonction."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Degrés de liberté du numérateur."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Degrés de liberté du dénominateur."
			}
		}
	},
	F_INV: {
		description: "Renvoie l’inverse de la distribution de probabilité F.",
		abstract: "Renvoie l’inverse de la distribution de probabilité F.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/f-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Probabilité associée à la distribution F cumulée."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Degrés de liberté du numérateur."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Degrés de liberté du dénominateur."
			}
		}
	},
	F_INV_RT: {
		description: "Renvoie l’inverse de la distribution de probabilité F unilatérale à droite.",
		abstract: "Renvoie l’inverse de la distribution de probabilité F unilatérale à droite.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/f-inv-rt-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Probabilité associée à la distribution F cumulée."
			},
			degFreedom1: {
				name: "deg_freedom1",
				detail: "Degrés de liberté du numérateur."
			},
			degFreedom2: {
				name: "deg_freedom2",
				detail: "Degrés de liberté du dénominateur."
			}
		}
	},
	F_TEST: {
		description: "Renvoie le résultat d’un test F.",
		abstract: "Renvoie le résultat d’un test F.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/f-test-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Premier tableau ou première plage de données."
			},
			array2: {
				name: "array2",
				detail: "Deuxième tableau ou deuxième plage de données."
			}
		}
	},
	FISHER: {
		description: "Renvoie la transformation de Fisher.",
		abstract: "Renvoie la transformation de Fisher.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/fisher-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Valeur numérique dont vous souhaitez obtenir la transformation."
		} }
	},
	FISHERINV: {
		description: "Renvoie l’inverse de la transformation de Fisher. Utilisez cette transformation pour analyser des corrélations entre plages ou matrices de données. Si y = FISHER(x), alors FISHER.INVERSE(y) = x.",
		abstract: "Renvoie l’inverse de la transformation de Fisher. Utilisez cette transformation pour analyser des corrélations entre plages ou matrices de données. Si y = FISHER(x), alors FISHER.INVERSE(y) = x.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/fisherinv-function"
		}],
		functionParameter: { y: {
			name: "y",
			detail: "Obligatoire. Représente la valeur pour laquelle vous voulez réaliser l’inverse de la transformation."
		} }
	},
	FORECAST: {
		description: "Calculer ou prédire une valeur future à l’aide de valeurs existantes. La valeur future est une valeur y pour une valeur x donnée. Les valeurs existantes sont des valeurs x et y connues, et la valeur future est prédite à l’aide de la régression linéaire. Vous pouvez utiliser ces fonctions pour prédire les ventes futures, les besoins en stock ou les tendances des consommateurs.",
		abstract: "Calculer ou prédire une valeur future à l’aide de valeurs existantes. La valeur future est une valeur y pour une valeur x donnée. Les valeurs existantes sont des valeurs x et y connues, et la valeur future est prédite à l’aide de la régression linéaire. Vous pouvez utiliser ces fonctions pour prédire les ventes futures, les besoins en stock ou les tendances des consommateurs.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/forecast-and-forecast-linear-functions"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "oui Représente le point de données dont vous voulez prévoir la valeur."
			},
			knownYs: {
				name: "known_y's",
				detail: "oui Représente la matrice ou la plage de données dépendante."
			},
			knownXs: {
				name: "known_x's",
				detail: "oui Représente la matrice ou la plage de données indépendante."
			}
		}
	},
	FORECAST_ETS: {
		description: "Calcule ou prédit une valeur future à partir de valeurs existantes à l’aide de la version AAA de l’algorithme de lissage exponentiel (ETS).",
		abstract: "Calcule ou prédit une valeur future à partir de valeurs existantes à l’aide de la version AAA de l’algorithme de lissage exponentiel (ETS).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/forecast-ets-function"
		}],
		functionParameter: {
			targetDate: {
				name: "Date cible",
				detail: "Le point de données pour lequel vous souhaitez prévoir une valeur."
			},
			values: {
				name: "Valeurs",
				detail: "Les valeurs historiques utilisées pour la prévision."
			},
			timeline: {
				name: "Chronologie",
				detail: "Une plage ou matrice indépendante de dates ou heures numériques avec un pas constant."
			},
			seasonality: {
				name: "Caractère saisonnier",
				detail: "Facultatif. Longueur saisonnière ; 1 pour la détection automatique et 0 sans saisonnalité."
			},
			dataCompletion: {
				name: "Saisie semi-automatique",
				detail: "Facultatif. Utilisez 1 pour interpoler les points manquants ou 0 pour les traiter comme zéro."
			},
			aggregation: {
				name: "Agrégation",
				detail: "Facultatif. Une valeur de 1 à 7 indique comment agréger les horodatages en double."
			}
		}
	},
	FORECAST_ETS_CONFINT: {
		description: "Renvoie l’intervalle de confiance d’une valeur prévisionnelle à la date cible spécifiée.",
		abstract: "Renvoie l’intervalle de confiance d’une valeur prévisionnelle à la date cible spécifiée.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/forecast-ets-confint-function"
		}],
		functionParameter: {
			targetDate: {
				name: "Date cible",
				detail: "Le point de données pour lequel vous souhaitez prévoir une valeur."
			},
			values: {
				name: "Valeurs",
				detail: "Les valeurs historiques utilisées pour la prévision."
			},
			timeline: {
				name: "Chronologie",
				detail: "Une plage ou matrice indépendante de dates ou heures numériques avec un pas constant."
			},
			confidenceLevel: {
				name: "Niveau de confiance",
				detail: "Facultatif. Un nombre compris entre 0 et 1 ; la valeur par défaut est 0,95."
			},
			seasonality: {
				name: "Caractère saisonnier",
				detail: "Facultatif. Longueur saisonnière ; 1 pour la détection automatique et 0 sans saisonnalité."
			},
			dataCompletion: {
				name: "Saisie semi-automatique",
				detail: "Facultatif. Utilisez 1 pour interpoler les points manquants ou 0 pour les traiter comme zéro."
			},
			aggregation: {
				name: "Agrégation",
				detail: "Facultatif. Une valeur de 1 à 7 indique comment agréger les horodatages en double."
			}
		}
	},
	FORECAST_ETS_SEASONALITY: {
		description: "Renvoie la longueur du modèle répétitif détecté par Excel pour la série chronologique spécifiée.",
		abstract: "Renvoie la longueur du modèle répétitif détecté par Excel pour la série chronologique spécifiée.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/forecast-ets-seasonality-function"
		}],
		functionParameter: {
			values: {
				name: "Valeurs",
				detail: "Les valeurs historiques utilisées pour la prévision."
			},
			timeline: {
				name: "Chronologie",
				detail: "Une plage ou matrice indépendante de dates ou heures numériques avec un pas constant."
			},
			dataCompletion: {
				name: "Saisie semi-automatique",
				detail: "Facultatif. Utilisez 1 pour interpoler les points manquants ou 0 pour les traiter comme zéro."
			},
			aggregation: {
				name: "Agrégation",
				detail: "Facultatif. Une valeur de 1 à 7 indique comment agréger les horodatages en double."
			}
		}
	},
	FORECAST_ETS_STAT: {
		description: "Renvoie une valeur statistique résultant de la prévision d’une série chronologique.",
		abstract: "Renvoie une valeur statistique résultant de la prévision d’une série chronologique.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/forecast-ets-stat-function"
		}],
		functionParameter: {
			values: {
				name: "Valeurs",
				detail: "Les valeurs historiques utilisées pour la prévision."
			},
			timeline: {
				name: "Chronologie",
				detail: "Une plage ou matrice indépendante de dates ou heures numériques avec un pas constant."
			},
			statisticType: {
				name: "Type de statistique",
				detail: "Une valeur de 1 à 8 indique la statistique de prévision à renvoyer."
			},
			seasonality: {
				name: "Caractère saisonnier",
				detail: "Facultatif. Longueur saisonnière ; 1 pour la détection automatique et 0 sans saisonnalité."
			},
			dataCompletion: {
				name: "Saisie semi-automatique",
				detail: "Facultatif. Utilisez 1 pour interpoler les points manquants ou 0 pour les traiter comme zéro."
			},
			aggregation: {
				name: "Agrégation",
				detail: "Facultatif. Une valeur de 1 à 7 indique comment agréger les horodatages en double."
			}
		}
	},
	FORECAST_LINEAR: {
		description: "Calculer ou prédire une valeur future à l’aide de valeurs existantes. La valeur future est une valeur y pour une valeur x donnée. Les valeurs existantes sont des valeurs x et y connues, et la valeur future est prédite à l’aide de la régression linéaire. Vous pouvez utiliser ces fonctions pour prédire les ventes futures, les besoins en stock ou les tendances des consommateurs.",
		abstract: "Calculer ou prédire une valeur future à l’aide de valeurs existantes. La valeur future est une valeur y pour une valeur x donnée. Les valeurs existantes sont des valeurs x et y connues, et la valeur future est prédite à l’aide de la régression linéaire. Vous pouvez utiliser ces fonctions pour prédire les ventes futures, les besoins en stock ou les tendances des consommateurs.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/forecast-and-forecast-linear-functions"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "oui Représente le point de données dont vous voulez prévoir la valeur."
			},
			knownYs: {
				name: "known_y's",
				detail: "oui Représente la matrice ou la plage de données dépendante."
			},
			knownXs: {
				name: "known_x's",
				detail: "oui Représente la matrice ou la plage de données indépendante."
			}
		}
	},
	FREQUENCY: {
		description: "La fonction FREQUENCE calcule la fréquence à laquelle les valeurs se produisent dans une plage de valeurs, puis retourne un tableau vertical de nombres. Par exemple, utilisez la fonction FREQUENCE pour déterminer combien de résultats d’un test entrent dans une plage de résultats donnée. Dans la mesure où la fonction FREQUENCE renvoie une matrice, elle doit être tapée sous forme de formule matricielle.",
		abstract: "La fonction FREQUENCE calcule la fréquence à laquelle les valeurs se produisent dans une plage de valeurs, puis retourne un tableau vertical de nombres. Par exemple, utilisez la fonction FREQUENCE pour déterminer combien de résultats d’un test entrent dans une plage de résultats donnée. Dans la mesure où la fonction FREQUENCE renvoie une matrice, elle doit être tapée sous forme de formule matricielle.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/frequency-function"
		}],
		functionParameter: {
			dataArray: {
				name: "data_array",
				detail: "Obligatoire. Représente une matrice de valeurs ou une référence au jeu de valeurs dont vous souhaitez calculer les fréquences. Si l’argument tableau_données ne contient aucune valeur, la fonction FREQUENCE renvoie une matrice de zéros."
			},
			binsArray: {
				name: "bins_array",
				detail: "Obligatoire. Représente une matrice d’intervalles ou une référence aux intervalles dans lesquels vous voulez regrouper les valeurs de l’argument tableau_données. Si l’argument matrice_intervalles ne contient aucune valeur, la fonction FREQUENCE renvoie le nombre d’éléments contenu dans l’argument tableau_données."
			}
		}
	},
	GAMMA: {
		description: "Renvoyer la valeur de fonction gamma.",
		abstract: "Renvoyer la valeur de fonction gamma.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/gamma-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire. Renvoie un nombre."
		} }
	},
	GAMMA_DIST: {
		description: "Renvoie la probabilité d’une variable aléatoire suivant une loi Gamma. Vous pouvez utiliser cette fonction pour étudier des variables dont la distribution est susceptible d’être asymétrique. La loi gamma est couramment utilisée dans l’étude de files d’attente.",
		abstract: "Renvoie la probabilité d’une variable aléatoire suivant une loi Gamma. Vous pouvez utiliser cette fonction pour étudier des variables dont la distribution est susceptible d’être asymétrique. La loi gamma est couramment utilisée dans l’étude de files d’attente.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/gamma-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obligatoire. Représente la valeur à laquelle vous voulez évaluer la distribution."
			},
			alpha: {
				name: "alpha",
				detail: "Obligatoire. Représente un paramètre de la distribution."
			},
			beta: {
				name: "beta",
				detail: "Obligatoire. Représente un paramètre de la distribution. Si bêta = 1, LOI.GAMMA.N renvoie la loi Gamma standard."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obligatoire. Représente une valeur logique déterminant le mode de calcul de la fonction : cumulatif ou non. Si l’argument cumulative est VRAI, la fonction LOI.GAMMA.N renvoie la fonction de distribution cumulée ; si l’argument cumulative est FAUX, la fonction renvoie la fonction de densité de probabilité."
			}
		}
	},
	GAMMA_INV: {
		description: "Renvoie l’inverse de la distribution cumulée suivant une loi Gamma. Si l’argument p = LOI.GAMMA.N(x;...), la fonction LOI.GAMMA.INVERSE.N(p;...) = x. Vous pouvez utiliser cette fonction pour étudier une variable dont la distribution est susceptible d’être asymétrique.",
		abstract: "Renvoie l’inverse de la distribution cumulée suivant une loi Gamma. Si l’argument p = LOI.GAMMA.N(x;...), la fonction LOI.GAMMA.INVERSE.N(p;...) = x. Vous pouvez utiliser cette fonction pour étudier une variable dont la distribution est susceptible d’être asymétrique.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/gamma-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obligatoire. Représente la probabilité associée à la loi Gamma."
			},
			alpha: {
				name: "alpha",
				detail: "Obligatoire. Représente un paramètre de la distribution."
			},
			beta: {
				name: "beta",
				detail: "Obligatoire. Représente un paramètre de la distribution. Si bêta = 1, LOI.GAMMA.INVERSE.N renvoie la loi Gamma standard."
			}
		}
	},
	GAMMALN: {
		description: "Renvoie le logarithme népérien de la fonction Gamma.",
		abstract: "Renvoie le logarithme népérien de la fonction Gamma.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/gammaln-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Obligatoire. Représente la valeur pour laquelle vous souhaitez calculer LNGAMMA."
		} }
	},
	GAMMALN_PRECISE: {
		description: "Renvoie le logarithme népérien de la fonction Gamma.",
		abstract: "Renvoie le logarithme népérien de la fonction Gamma.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/gammaln-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Obligatoire. Représente la valeur pour laquelle vous souhaitez calculer LNGAMMA.PRECIS."
		} }
	},
	GAUSS: {
		description: "Calcule la probabilité qu’un membre d’une population normale standard se situe entre la moyenne et les z déviations standard par rapport à la moyenne.",
		abstract: "Calcule la probabilité qu’un membre d’une population normale standard se situe entre la moyenne et les z déviations standard par rapport à la moyenne.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/gauss-function"
		}],
		functionParameter: { z: {
			name: "z",
			detail: "Obligatoire. Renvoie un nombre."
		} }
	},
	GEOMEAN: {
		description: "Renvoie la moyenne géométrique d’une matrice ou d’une plage de données positives. Par exemple, vous pouvez utiliser la fonction MOYENNE.GEOMETRIQUE pour calculer un taux de croissance moyen à partir d’un intérêt composé à taux variables.",
		abstract: "Renvoie la moyenne géométrique d’une matrice ou d’une plage de données positives. Par exemple, vous pouvez utiliser la fonction MOYENNE.GEOMETRIQUE pour calculer un taux de croissance moyen à partir d’un intérêt composé à taux variables.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/geomean-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Number1 est obligatoire, les numéros suivants sont facultatifs. Il s’agit des 1 à 255 arguments dont vous souhaitez calculer la moyenne. Vous pouvez aussi utiliser une matrice ou une référence à une matrice, plutôt que des arguments séparés par des points-virgules."
			},
			number2: {
				name: "number2",
				detail: "Number1 est obligatoire, les numéros suivants sont facultatifs. Il s’agit des 1 à 255 arguments dont vous souhaitez calculer la moyenne. Vous pouvez aussi utiliser une matrice ou une référence à une matrice, plutôt que des arguments séparés par des points-virgules."
			}
		}
	},
	GROWTH: {
		description: "Calcule la croissance exponentielle prévue à partir des données existantes. La fonction CROISSANCE renvoie les valeurs y pour une série de nouvelles valeurs x que vous spécifiez, en utilisant des valeurs x et y existantes. Vous pouvez également utiliser la fonction de feuille de calcul CROISSANCE afin d’ajuster une courbe exponentielle à des valeurs x et y existantes.",
		abstract: "Calcule la croissance exponentielle prévue à partir des données existantes. La fonction CROISSANCE renvoie les valeurs y pour une série de nouvelles valeurs x que vous spécifiez, en utilisant des valeurs x et y existantes. Vous pouvez également utiliser la fonction de feuille de calcul CROISSANCE afin d’ajuster une courbe exponentielle à des valeurs x et y existantes.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/growth-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Obligatoire. Représente la série des valeurs y déjà connues dans l’équation y = b*m^x. Si la matrice définie par l’argument y_connus occupe une seule colonne, chaque colonne de l’argument x_connus est interprétée comme étant une variable distincte. Si la matrice définie par l’argument y_connus occupe une seule ligne, chaque ligne de l’argument x_connus est interprétée comme étant une variable distincte. Si l’un des nombres de known_y est 0 ou négatif, GROWTH renvoie la #NUM ! #VALEUR!."
			},
			knownXs: {
				name: "known_x's",
				detail: "Optionnel. Représente une série facultative de valeurs x, éventuellement déjà connues dans la relation y = b*m^x. L’argument x_connus peut contenir une ou plusieurs séries de variables. Si vous utilisez une seule variable, les arguments y_connus et x_connus peuvent être des plages de forme différente, à condition qu’elles aient la même dimension. Si vous utilisez plusieurs variables, l’argument y_connus doit être un vecteur (en d’autres termes, une plage comportant une seule ligne ou une seule colonne). Si l’argument x_connus est omis, il est supposé égal à la matrice {1.2.3....}, de même ordre que l’argument y_connus."
			},
			newXs: {
				name: "new_x's",
				detail: "Optionnel. Représente la nouvelle série de variables x pour lesquelles vous voulez que CROISSANCE renvoie les valeurs y correspondantes. L’argument x_nouveaux doit comporter une colonne (ou une ligne) pour chaque variable indépendante, comme c’est le cas pour l’argument x_connus. Par conséquent, si l’argument y_connus occupe une seule colonne, les arguments x_connus et x_nouveaux doivent avoir le même nombre de colonnes. Si l’argument y_connus occupe une seule ligne, les arguments x_connus et x_nouveaux doivent avoir le même nombre de lignes. Si l’argument x_nouveaux est omis, l’argument par défaut est l’argument x_connus. Si les arguments x_connus et x_nouveaux sont omis, les matrices par défaut sont {1.2.3....}, de même ordre que l’argument y_connus."
			},
			constb: {
				name: "const",
				detail: "Optionnel. Représente une valeur logique précisant si la constante b doit être égale à 1. Si l’argument constante est VRAI ou omis, la constante b est calculée normalement. Si l’argument constante est FAUX, b est égal à 1 et les valeurs m sont ajustées de façon à ce que y = m^x."
			}
		}
	},
	HARMEAN: {
		description: "Renvoie la moyenne harmonique d’une série de données. La moyenne harmonique est l’inverse de la moyenne arithmétique des inverses des observations.",
		abstract: "Renvoie la moyenne harmonique d’une série de données. La moyenne harmonique est l’inverse de la moyenne arithmétique des inverses des observations.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/harmean-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Number1 est obligatoire, les numéros suivants sont facultatifs. Il s’agit des 1 à 255 arguments dont vous souhaitez calculer la moyenne. Vous pouvez aussi utiliser une matrice ou une référence à une matrice, plutôt que des arguments séparés par des points-virgules."
			},
			number2: {
				name: "number2",
				detail: "Number1 est obligatoire, les numéros suivants sont facultatifs. Il s’agit des 1 à 255 arguments dont vous souhaitez calculer la moyenne. Vous pouvez aussi utiliser une matrice ou une référence à une matrice, plutôt que des arguments séparés par des points-virgules."
			}
		}
	},
	HYPGEOM_DIST: {
		description: "Renvoie la loi hypergéométrique. La fonction LOI.HYPERGEOMETRIQUE.N renvoie la probabilité d’obtenir un nombre donné de tirages « succès » sur un échantillon, connaissant la taille de l’échantillon, le nombre de succès de la population et sa taille. Utilisez la fonction LOI.HYPERGEOMETRIQUE.N dans des problèmes supposant une population déterminée, dans lesquels chaque observation est soit un succès, soit un échec et où chaque sous-ensemble d’une taille donnée est constitué avec la même vraisemblance.",
		abstract: "Renvoie la loi hypergéométrique. La fonction LOI.HYPERGEOMETRIQUE.N renvoie la probabilité d’obtenir un nombre donné de tirages « succès » sur un échantillon, connaissant la taille de l’échantillon, le nombre de succès de la population et sa taille. Utilisez la fonction LOI.HYPERGEOMETRIQUE.N dans des problèmes supposant une population déterminée, dans lesquels chaque observation est soit un succès, soit un échec et où chaque sous-ensemble d’une taille donnée est constitué avec la même vraisemblance.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/hypgeom-dist-function"
		}],
		functionParameter: {
			sampleS: {
				name: "sample_s",
				detail: "Obligatoire. Représente le nombre de succès de l’échantillon."
			},
			numberSample: {
				name: "number_sample",
				detail: "Obligatoire. Représente la taille de l’échantillon."
			},
			populationS: {
				name: "population_s",
				detail: "Obligatoire. Représente le nombre de succès de la population."
			},
			numberPop: {
				name: "number_pop",
				detail: "Obligatoire. Représente la taille de la population."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obligatoire. Représente une valeur logique déterminant le mode de calcul de la fonction : cumulatif ou non. Si l’argument cumulative est VRAI, la fonction LOI.HYPERGEOMETRIQUE.N renvoie la fonction de distribution cumulée ; si l’argument cumulative est FAUX, la fonction renvoie la fonction de probabilité de masse."
			}
		}
	},
	INTERCEPT: {
		description: "Calcule le point auquel une droite doit couper l’axe des ordonnées en utilisant les valeurs x et y existantes. L’ordonnée à l’origine est déterminée en traçant une droite de régression linéaire qui passe par les valeurs x et y connues. Utilisez la fonction ORDONNEE.ORIGINE pour déterminer la valeur de la variable dépendante lorsque la variable indépendante est égale à 0 (zéro). Par exemple, vous pouvez utiliser la fonction ORDONNEE.ORIGINE pour prévoir la résistance électrique d’un métal à 0°C lorsque vos points de données ont été établis à des températures égales et supérieures à la température ambiante.",
		abstract: "Calcule le point auquel une droite doit couper l’axe des ordonnées en utilisant les valeurs x et y existantes. L’ordonnée à l’origine est déterminée en traçant une droite de régression linéaire qui passe par les valeurs x et y connues. Utilisez la fonction ORDONNEE.ORIGINE pour déterminer la valeur de la variable dépendante lorsque la variable indépendante est égale à 0 (zéro). Par exemple, vous pouvez utiliser la fonction ORDONNEE.ORIGINE pour prévoir la résistance électrique d’un métal à 0°C lorsque vos points de données ont été établis à des températures égales et supérieures à la température ambiante.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/intercept-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Obligatoire. Représente la série dépendante d’observations ou de données."
			},
			knownXs: {
				name: "known_x's",
				detail: "Obligatoire. Représente la série indépendante d’observations ou de données."
			}
		}
	},
	KURT: {
		description: "Retourne le kurtosis d’un jeu de données. Kurtosis caractérise le pic relatif ou planness d’une distribution par rapport à la distribution normale. Le kurtosis positif indique une distribution relativement maximale. Le kurtosis négatif indique une distribution relativement plate.",
		abstract: "Retourne le kurtosis d’un jeu de données. Kurtosis caractérise le pic relatif ou planness d’une distribution par rapport à la distribution normale. Le kurtosis positif indique une distribution relativement maximale. Le kurtosis négatif indique une distribution relativement plate.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/kurt-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Number1 est obligatoire, les numéros suivants sont facultatifs. Il s’agit des 1 à 255 arguments dont vous souhaitez calculer le kurtosis. Vous pouvez aussi utiliser une matrice ou une référence à une matrice, plutôt que des arguments séparés par des points-virgules."
			},
			number2: {
				name: "number2",
				detail: "Number1 est obligatoire, les numéros suivants sont facultatifs. Il s’agit des 1 à 255 arguments dont vous souhaitez calculer le kurtosis. Vous pouvez aussi utiliser une matrice ou une référence à une matrice, plutôt que des arguments séparés par des points-virgules."
			}
		}
	},
	LARGE: {
		description: "Renvoie la k-ième plus grande valeur d’une série de données. Vous pouvez utiliser cette fonction pour sélectionner une valeur en fonction de son rang. Ainsi, vous pouvez utiliser la fonction GRANDE.VALEUR pour renvoyer le résultat le plus élevé, le deuxième résultat ou le troisième.",
		abstract: "Renvoie la k-ième plus grande valeur d’une série de données. Vous pouvez utiliser cette fonction pour sélectionner une valeur en fonction de son rang. Ainsi, vous pouvez utiliser la fonction GRANDE.VALEUR pour renvoyer le résultat le plus élevé, le deuxième résultat ou le troisième.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/large-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Obligatoire. Représente la matrice ou la plage de données dans laquelle vous recherchez la k-ième plus grande valeur."
			},
			k: {
				name: "k",
				detail: "Obligatoire. Représente, dans la matrice ou la plage de cellules, la position de la valeur à renvoyer, déterminée à partir de la valeur la plus grande."
			}
		}
	},
	LINEST: {
		description: "La fonction DROITEREG calcule les statistiques d’une droite par la méthode des moindres carrés afin de calculer une droite s’ajustant au plus près de vos données, puis renvoie une matrice qui décrit cette droite. Vous pouvez également combiner la fonction DROITEREG avec d’autres fonctions pour calculer les statistiques d’autres types de modèles linéaires dans les paramètres inconnus, y compris polynomial, logarithmique, exponentiel et série de puissances. Dans la mesure où cette fonction renvoie une matrice de valeurs, elle doit être tapée sous la forme d’une formule matricielle. Vous trouverez des instructions sous les exemples proposés dans cet article.",
		abstract: "La fonction DROITEREG calcule les statistiques d’une droite par la méthode des moindres carrés afin de calculer une droite s’ajustant au plus près de vos données, puis renvoie une matrice qui décrit cette droite. Vous pouvez également combiner la fonction DROITEREG avec d’autres fonctions pour calculer les statistiques d’autres types de modèles linéaires dans les paramètres inconnus, y compris polynomial, logarithmique, exponentiel et série de puissances. Dans la mesure où cette fonction renvoie une matrice de valeurs, elle doit être tapée sous la forme d’une formule matricielle. Vous trouverez des instructions sous les exemples proposés dans cet article.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/linest-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Obligatoire. Série des valeurs y déjà connues par la relation y = mx + b. Si la plage de known_y se trouve dans une seule colonne, chaque colonne de known_x est interprétée comme une variable distincte. Si la plage de known_y est contenue dans une seule ligne, chaque ligne de known_x est interprétée comme une variable distincte."
			},
			knownXs: {
				name: "known_x's",
				detail: "Optionnel. Série de valeurs x éventuellement déjà connues par la relation y = mx + b. La plage de known_x peut inclure un ou plusieurs ensembles de variables. Si une seule variable est utilisée, les known_y et known_x peuvent être des plages de n’importe quelle forme, tant qu’elles ont des dimensions égales. Si plusieurs variables sont utilisées, known_y doit être un vecteur (autrement dit, une plage avec une hauteur d’une ligne ou une largeur d’une colonne). Si known_x est omis, il est supposé être le tableau {1,2,3,...} qui a la même taille que known_y ."
			},
			constb: {
				name: "const",
				detail: "Optionnel. Valeur logique précisant si la constante b doit être forcée à 0. Si const est TRUE ou omis, b est calculé normalement. Si const a la valeur FALSE, b est défini sur 0 et les valeurs m sont ajustées pour ajuster y = mx."
			},
			stats: {
				name: "stats",
				detail: "Optionnel. Représente une valeur logique indiquant si d’autres statistiques de régression doivent être renvoyées. Si les statistiques ont la valeur TRUE, LINEST retourne les statistiques de régression supplémentaires ; par conséquent, le tableau retourné est {mn,mn-1,...,m1,b ; sen,sen-1,...,se1,seb ; r 2,sey ; F,df ; ssreg,ssresid} . Si les statistiques ont la valeur FALSE ou sont omises , LINEST retourne uniquement les coefficients m et la constante b. Les statistiques de régression supplémentaires sont les suivantes :"
			}
		}
	},
	LOGEST: {
		description: "L’équation de la courbe est la suivante :",
		abstract: "L’équation de la courbe est la suivante :",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/logest-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Obligatoire. Représente la série des valeurs y déjà connues dans l’équation y = b*m^x. Si la matrice définie par l’argument y_connus occupe une seule colonne, chaque colonne de l’argument x_connus est interprétée comme étant une variable distincte. Si la matrice définie par l’argument y_connus occupe une seule ligne, chaque ligne de l’argument x_connus est interprétée comme étant une variable distincte."
			},
			knownXs: {
				name: "known_x's",
				detail: "Optionnel. Représente une série facultative de valeurs x, éventuellement déjà connues dans la relation y = b*m^x. L’argument x_connus peut contenir une ou plusieurs séries de variables. Si une seule variable est utilisée, y_connus et x_connus peuvent prendre différentes formes, à condition d’avoir la même dimension. Si plusieurs variables sont utilisées, y_connus doit être une plage de cellules dont la hauteur est une seule ligne ou la largeur, une seule colonne (également connu sous le nom de vecteur). Si l’argument x_connus est omis, il est supposé égal à la matrice {1.2.3....}, de même ordre que l’argument y_connus."
			},
			constb: {
				name: "const",
				detail: "Optionnel. Représente une valeur logique précisant si la constante b doit être égale à 1. Si l’argument constante est VRAI ou omis, la constante b est calculée normalement. Si constante est FAUX, b se voit attribuer la valeur 1 et les valeurs m sont ajustées pour que y = m^x."
			},
			stats: {
				name: "stats",
				detail: "Optionnel. Représente une valeur logique indiquant si d’autres statistiques de régression doivent être renvoyées. Si statistiques est VRAI, LOGREG renvoie les statistiques de régression supplémentaires, sous la forme d’une matrice {mn.mn-1.....m1.b;sen.sen-1.....se1.seb;r 2.sey; F.df;ssreg.ssresid}. Si statistiques est FAUX ou omis, LOGREG renvoie uniquement les coefficients m et la constante b."
			}
		}
	},
	LOGNORM_DIST: {
		description: "Renvoie la distribution de x suivant une loi lognormale, où ln(x) est normalement distribué à l’aide des paramètres moyenne et écart_type.",
		abstract: "Renvoie la distribution de x suivant une loi lognormale, où ln(x) est normalement distribué à l’aide des paramètres moyenne et écart_type.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/lognorm-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obligatoire. Représente la variable avec laquelle la fonction doit être calculée."
			},
			mean: {
				name: "mean",
				detail: "Obligatoire. Représente l’espérance mathématique de ln(x)."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Obligatoire. Représente l’écart type de ln(x)."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obligatoire. Représente une valeur logique déterminant le mode de calcul de la fonction : cumulatif ou non. Si l’argument cumulative est VRAI, la fonction LOI.LOGNORMALE.N renvoie la fonction de distribution cumulée ; si l’argument cumulative est FAUX, la fonction renvoie la fonction de densité de probabilité."
			}
		}
	},
	LOGNORM_INV: {
		description: "Renvoie l’inverse de la fonction de distribution de x suivant la loi lognormale cumulée, où ln(x) est normalement distribué avec les paramètres espérance et écart_type. Si p = LOI.LOGNORMALE.N(x,...), alors LOI.LOGNORMALE.INVERSE.N(p,...) = x.",
		abstract: "Renvoie l’inverse de la fonction de distribution de x suivant la loi lognormale cumulée, où ln(x) est normalement distribué avec les paramètres espérance et écart_type. Si p = LOI.LOGNORMALE.N(x,...), alors LOI.LOGNORMALE.INVERSE.N(p,...) = x.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/lognorm-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obligatoire. Représente une probabilité associée à la distribution lognormale."
			},
			mean: {
				name: "mean",
				detail: "Obligatoire. Représente l’espérance mathématique de ln(x)."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Obligatoire. Représente l’écart type de ln(x)."
			}
		}
	},
	MARGINOFERROR: {
		description: "Cette fonction calcule la marge d'erreur à partir d'une plage de valeurs et d'un niveau de confiance.",
		abstract: "Cette fonction calcule la marge d'erreur à partir d'une plage de valeurs et d'un niveau de confiance.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/12487850?hl=fr"
		}],
		functionParameter: {
			range: {
				name: "range",
				detail: "MARGINOFERROR(A1:C3, 0.99)"
			},
			confidence: {
				name: "confidence",
				detail: "Confidence – Niveau de confiance souhaité entre 0 et 1."
			}
		}
	},
	MAX: {
		description: "Renvoie le plus grand nombre de la série de valeurs.",
		abstract: "Renvoie le plus grand nombre de la série de valeurs.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/max-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Number1 est obligatoire, les numéros suivants sont facultatifs. Ils représentent les 1 à 255 nombres parmi lesquels vous souhaitez trouver la valeur la plus grande."
			},
			number2: {
				name: "number2",
				detail: "Number1 est obligatoire, les numéros suivants sont facultatifs. Ils représentent les 1 à 255 nombres parmi lesquels vous souhaitez trouver la valeur la plus grande."
			}
		}
	},
	MAXA: {
		description: "Renvoie la plus grande valeur contenue dans une liste d’arguments.",
		abstract: "Renvoie la plus grande valeur contenue dans une liste d’arguments.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/maxa-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Obligatoire. Le premier argument numérique pour lequel vous voulez rechercher la plus grande valeur."
			},
			value2: {
				name: "value2",
				detail: "Optionnel. Représente les arguments numériques 2 à 255 parmi lesquels vous voulez rechercher la plus grande valeur."
			}
		}
	},
	MAXIFS: {
		description: "La fonction MAX.SI.ENS renvoie la valeur maximale parmi les cellules spécifiées par un ensemble de conditions ou critères.",
		abstract: "La fonction MAX.SI.ENS renvoie la valeur maximale parmi les cellules spécifiées par un ensemble de conditions ou critères.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/maxifs-function"
		}],
		functionParameter: {
			maxRange: {
				name: "sum_range",
				detail: "La plage de cellules réelle dans laquelle la valeur maximale sera déterminée."
			},
			criteriaRange1: {
				name: "criteria_range1",
				detail: "Est l’ensemble des cellules à comparer au critère."
			},
			criteria1: {
				name: "criteria1",
				detail: "Représente le critère sous la forme d’un nombre, d’une expression ou d’un texte qui définit quelles cellules seront évaluées comme valeur maximale. Le même jeu de critères est valable pour les fonctions MIN.SI.ENS , SOMME.SI.ENS et MOYENNE.SI.ENS ."
			},
			criteriaRange2: {
				name: "criteriaRange2",
				detail: "Plages supplémentaires et leurs critères associés. Vous pouvez entrer jusqu’à 126 paires plage/critères."
			},
			criteria2: {
				name: "criteria2",
				detail: "Plages supplémentaires et leurs critères associés. Vous pouvez entrer jusqu’à 126 paires plage/critères."
			}
		}
	},
	MEDIAN: {
		description: "Renvoie la valeur médiane des nombres. La médiane est la valeur qui se trouve au centre d’un ensemble de nombres.",
		abstract: "Renvoie la valeur médiane des nombres. La médiane est la valeur qui se trouve au centre d’un ensemble de nombres.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/median-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Number1 est obligatoire, les numéros suivants sont facultatifs. Ils représentent les 1 à 255 nombres dont vous souhaitez obtenir la médiane."
			},
			number2: {
				name: "number2",
				detail: "Number1 est obligatoire, les numéros suivants sont facultatifs. Ils représentent les 1 à 255 nombres dont vous souhaitez obtenir la médiane."
			}
		}
	},
	MIN: {
		description: "Renvoie le plus petit nombre de la série de valeurs.",
		abstract: "Renvoie le plus petit nombre de la série de valeurs.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/min-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Number1 est facultatif, les numéros suivants sont facultatifs. Ils représentent les 1 à 255 nombres parmi lesquels vous souhaitez trouver la valeur minimale."
			},
			number2: {
				name: "number2",
				detail: "Number1 est facultatif, les numéros suivants sont facultatifs. Ils représentent les 1 à 255 nombres parmi lesquels vous souhaitez trouver la valeur minimale."
			}
		}
	},
	MINA: {
		description: "Renvoie la plus petite valeur contenue dans une liste d’arguments.",
		abstract: "Renvoie la plus petite valeur contenue dans une liste d’arguments.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/mina-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Value1 est obligatoire, les valeurs suivantes sont facultatives. Il s’agit des 1 à 255 des valeurs parmi lesquelles vous voulez rechercher la plus petite."
			},
			value2: {
				name: "value2",
				detail: "Value1 est obligatoire, les valeurs suivantes sont facultatives. Il s’agit des 1 à 255 des valeurs parmi lesquelles vous voulez rechercher la plus petite."
			}
		}
	},
	MINIFS: {
		description: "La fonction MIN.SI.ENS renvoie la valeur minimale parmi les cellules spécifiées par un ensemble de conditions ou critères.",
		abstract: "La fonction MIN.SI.ENS renvoie la valeur minimale parmi les cellules spécifiées par un ensemble de conditions ou critères.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/minifs-function"
		}],
		functionParameter: {
			minRange: {
				name: "min_range",
				detail: "La plage de cellules réelle dans laquelle la valeur minimale sera déterminée."
			},
			criteriaRange1: {
				name: "criteria_range1",
				detail: "Est l’ensemble des cellules à comparer au critère."
			},
			criteria1: {
				name: "criteria1",
				detail: "Représente le critère sous la forme d’un nombre, d’une expression ou d’un texte qui définit quelles cellules seront évaluées comme valeur minimale. Le même jeu de critères est valable pour les fonctions MAX.SI.ENS , SOMME.SI.ENS et MOYENNE.SI.ENS ."
			},
			criteriaRange2: {
				name: "criteria_range2",
				detail: "Plages supplémentaires et leurs critères associés. Vous pouvez entrer jusqu’à 126 paires plage/critères."
			},
			criteria2: {
				name: "criteria2",
				detail: "Plages supplémentaires et leurs critères associés. Vous pouvez entrer jusqu’à 126 paires plage/critères."
			}
		}
	},
	MODE_MULT: {
		description: "En présence de plusieurs modes, plusieurs résultats seront renvoyés. Dans la mesure où cette fonction renvoie une matrice de valeurs, elle doit être tapée sous la forme d’une formule matricielle.",
		abstract: "En présence de plusieurs modes, plusieurs résultats seront renvoyés. Dans la mesure où cette fonction renvoie une matrice de valeurs, elle doit être tapée sous la forme d’une formule matricielle.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/mode-mult-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obligatoire. Représente le premier argument numérique pour lequel vous souhaitez calculer le mode."
			},
			number2: {
				name: "number2",
				detail: "Optionnel. Représente les arguments numériques 2 à 254 dont vous souhaitez déterminer le mode. Vous pouvez également utiliser une matrice unique ou une référence à une matrice, au lieu d’arguments séparés par des points-virgules."
			}
		}
	},
	MODE_SNGL: {
		description: "Renvoie la valeur la plus fréquente ou la plus répétitive dans une matrice ou une plage de données.",
		abstract: "Renvoie la valeur la plus fréquente ou la plus répétitive dans une matrice ou une plage de données.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/mode-sngl-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obligatoire. Représente le premier argument pour lequel vous souhaitez calculer le mode."
			},
			number2: {
				name: "number2",
				detail: "Optionnel. Représente les arguments 2 à 254 dont vous souhaitez déterminer le mode. Vous pouvez également utiliser une matrice unique ou une référence à une matrice, au lieu d’arguments séparés par des points-virgules."
			}
		}
	},
	NEGBINOM_DIST: {
		description: "Renvoie la probabilité d’une variable aléatoire discrète suivant une loi binomiale négative, la probabilité d’obtenir un nombre d’échecs égal à l’argument nombre_échecs avant de parvenir au succès dont le rang est donné par l’argument nombre_succès, avec la probabilité probabilité_succès d’un succès.",
		abstract: "Renvoie la probabilité d’une variable aléatoire discrète suivant une loi binomiale négative, la probabilité d’obtenir un nombre d’échecs égal à l’argument nombre_échecs avant de parvenir au succès dont le rang est donné par l’argument nombre_succès, avec la probabilité probabilité_succès d’un succès.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/negbinom-dist-function"
		}],
		functionParameter: {
			numberF: {
				name: "number_f",
				detail: "Obligatoire. Représente le nombre d’échecs."
			},
			numberS: {
				name: "number_s",
				detail: "Obligatoire. Représente le nombre de succès à obtenir."
			},
			probabilityS: {
				name: "probability_s",
				detail: "Obligatoire. Représente la probabilité d’obtenir un succès."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obligatoire. Représente une valeur logique déterminant le mode de calcul de la fonction : cumulatif ou non. Si l’argument cumulative est VRAI, la fonction LOI.BINOMIALE.NEG.N renvoie la fonction de distribution cumulée ; si l’argument cumulative est FAUX, la fonction renvoie la fonction de densité de probabilité."
			}
		}
	},
	NORM_DIST: {
		description: "Renvoie la distribution normale pour la moyenne et l’écart type spécifiés. Cette fonction a de nombreuses applications en statistique, y compris dans les tests d’hypothèse.",
		abstract: "Renvoie la distribution normale pour la moyenne et l’écart type spécifiés. Cette fonction a de nombreuses applications en statistique, y compris dans les tests d’hypothèse.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/norm-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obligatoire. Représente la valeur dont vous recherchez la distribution."
			},
			mean: {
				name: "mean",
				detail: "Obligatoire. Représente la moyenne arithmétique de la distribution."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Obligatoire. Représente l’écart type de la distribution."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obligatoire. Représente une valeur logique déterminant le mode de calcul de la fonction : cumulatif ou non. Si cumulative a la valeur TRUE, NORM. DIST retourne la fonction de distribution cumulée ; si la valeur est FALSE, elle retourne la fonction de densité de probabilité."
			}
		}
	},
	NORM_INV: {
		description: "Renvoie, pour une probabilité donnée, la valeur d’une variable aléatoire suivant une loi normale pour la moyenne et l’écart type spécifiés.",
		abstract: "Renvoie, pour une probabilité donnée, la valeur d’une variable aléatoire suivant une loi normale pour la moyenne et l’écart type spécifiés.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/norm-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obligatoire. Représente une probabilité correspondant à la distribution normale."
			},
			mean: {
				name: "mean",
				detail: "Obligatoire. Représente la moyenne arithmétique de la distribution."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Obligatoire. Représente l’écart type de la distribution."
			}
		}
	},
	NORM_S_DIST: {
		description: "Renvoie la distribution normale cumulative standard.",
		abstract: "Renvoie la distribution normale cumulative standard.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/norm-s-dist-function"
		}],
		functionParameter: {
			z: {
				name: "z",
				detail: "Valeur dont vous souhaitez obtenir la distribution."
			},
			cumulative: {
				name: "cumulative",
				detail: "Valeur logique qui détermine la forme de la fonction. Si cumulative vaut TRUE, NORM.DIST renvoie la fonction de distribution cumulée ; sinon, la fonction de densité de probabilité."
			}
		}
	},
	NORM_S_INV: {
		description: "Renvoie, pour une probabilité donnée, la valeur d’une variable aléatoire suivant une loi normale standard (ou centrée réduite). Cette distribution a une moyenne égale à zéro et un écart type égal à 1.",
		abstract: "Renvoie, pour une probabilité donnée, la valeur d’une variable aléatoire suivant une loi normale standard (ou centrée réduite). Cette distribution a une moyenne égale à zéro et un écart type égal à 1.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/norm-s-inv-function"
		}],
		functionParameter: { probability: {
			name: "probability",
			detail: "Obligatoire. Représente une probabilité correspondant à la distribution normale."
		} }
	},
	PEARSON: {
		description: "Renvoie le coefficient de corrélation d’échantillonnage de Pearson r, un indice dont la valeur varie entre -1,0 et 1,0 inclus qui reflète le degré de linéarité entre deux séries de données.",
		abstract: "Renvoie le coefficient de corrélation d’échantillonnage de Pearson r, un indice dont la valeur varie entre -1,0 et 1,0 inclus qui reflète le degré de linéarité entre deux séries de données.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/pearson-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Obligatoire. Représente un jeu de valeurs indépendantes."
			},
			array2: {
				name: "array2",
				detail: "Obligatoire. Représente un jeu de valeurs dépendantes."
			}
		}
	},
	PERCENTILE_EXC: {
		description: "CENTILE. La fonction EXC retourne le k-ième centile des valeurs d’une plage, où k est dans la plage 0..1, exclusive.",
		abstract: "CENTILE. La fonction EXC retourne le k-ième centile des valeurs d’une plage, où k est dans la plage 0..1, exclusive.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/percentile-exc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Obligatoire. Représente la matrice ou la plage de données définissant l’étendue relative."
			},
			k: {
				name: "k",
				detail: "Obligatoire. Valeur de centile dans la plage 0 < k < 1."
			}
		}
	},
	PERCENTILE_INC: {
		description: "Retourne le k-ième centile des valeurs d’une plage, où k est compris dans la plage comprise entre 0 et 1.",
		abstract: "Retourne le k-ième centile des valeurs d’une plage, où k est compris dans la plage comprise entre 0 et 1.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/percentile-inc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Obligatoire. Représente la matrice ou la plage de données définissant l’étendue relative."
			},
			k: {
				name: "k",
				detail: "Obligatoire. Valeur de centile comprise entre 0 et 1, inclus."
			}
		}
	},
	PERCENTRANK_EXC: {
		description: "Renvoie le rang d’une valeur d’un jeu de données sous forme de pourcentage (0..1, exclus).",
		abstract: "Renvoie le rang d’une valeur d’un jeu de données sous forme de pourcentage (0..1, exclus).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/percentrank-exc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Obligatoire. Représente la matrice ou la plage de données de valeurs numériques définissant l’étendue relative."
			},
			x: {
				name: "x",
				detail: "Obligatoire. Représente la valeur dont vous voulez connaître le rang."
			},
			significance: {
				name: "significance",
				detail: "Optionnel. Représente une valeur indiquant le nombre de décimales du pourcentage renvoyé. Si cet argument est omis, la fonction RANG.POURCENTAGE.EXCLURE conserve trois décimales (0,xxx)."
			}
		}
	},
	PERCENTRANK_INC: {
		description: "Renvoie le rang d’une valeur d’un jeu de données sous forme de pourcentage (0..1, inclus).",
		abstract: "Renvoie le rang d’une valeur d’un jeu de données sous forme de pourcentage (0..1, inclus).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/percentrank-inc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Obligatoire. Représente la matrice ou la plage de données de valeurs numériques définissant l’étendue relative."
			},
			x: {
				name: "x",
				detail: "Obligatoire. Représente la valeur dont vous voulez connaître le rang."
			},
			significance: {
				name: "significance",
				detail: "Optionnel. Représente une valeur indiquant le nombre de décimales du pourcentage renvoyé. Si cet argument est omis, la fonction RANG.POURCENTAGE.INCLURE conserve trois décimales (0,xxx)."
			}
		}
	},
	PERMUT: {
		description: "Renvoie le nombre de permutations pour un nombre donné d’objets pouvant être sélectionnés à partir d’un nombre d’objets déterminé par l’argument nombre. Une permutation est un ensemble ou un sous-ensemble d’objets ou d’événements ordonnés de façon précise et significative. En cela, les permutations diffèrent des combinaisons pour lesquelles l’ordre des éléments n’est pas significatif. Utilisez cette fonction dans les calculs de probabilité de type loterie.",
		abstract: "Renvoie le nombre de permutations pour un nombre donné d’objets pouvant être sélectionnés à partir d’un nombre d’objets déterminé par l’argument nombre. Une permutation est un ensemble ou un sous-ensemble d’objets ou d’événements ordonnés de façon précise et significative. En cela, les permutations diffèrent des combinaisons pour lesquelles l’ordre des éléments n’est pas significatif. Utilisez cette fonction dans les calculs de probabilité de type loterie.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/permut-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Représente un nombre entier correspondant au nombre d’objets."
			},
			numberChosen: {
				name: "number_chosen",
				detail: "Obligatoire. Représente un nombre entier correspondant au nombre d’objets dans chaque permutation."
			}
		}
	},
	PERMUTATIONA: {
		description: "Renvoie le nombre de permutations pour un nombre d’objets donné (avec répétitions) pouvant être sélectionnés à partir du nombre total d’objets.",
		abstract: "Renvoie le nombre de permutations pour un nombre d’objets donné (avec répétitions) pouvant être sélectionnés à partir du nombre total d’objets.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/permutationa-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Nombre entier correspondant au nombre total d’objets."
			},
			numberChosen: {
				name: "number_chosen",
				detail: "Obligatoire. Nombre entier correspondant au nombre d’objets dans chaque permutation."
			}
		}
	},
	PHI: {
		description: "Renvoie la valeur de la fonction de densité pour une distribution normale standard.",
		abstract: "Renvoie la valeur de la fonction de densité pour une distribution normale standard.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/phi-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Obligatoire. X est le nombre pour lequel vous souhaitez obtenir la densité pour une distribution normale standard."
		} }
	},
	POISSON_DIST: {
		description: "Renvoie la probabilité d’une variable aléatoire suivant une loi de Poisson. Une application courante de la loi de Poisson est la prédiction du nombre d’événements susceptibles de se produire sur une période de temps déterminée, par exemple, le nombre de voitures qui se présentent à un poste de péage en l’espace d’une minute.",
		abstract: "Renvoie la probabilité d’une variable aléatoire suivant une loi de Poisson. Une application courante de la loi de Poisson est la prédiction du nombre d’événements susceptibles de se produire sur une période de temps déterminée, par exemple, le nombre de voitures qui se présentent à un poste de péage en l’espace d’une minute.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/poisson-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obligatoire. Représente le nombre d’événements."
			},
			mean: {
				name: "mean",
				detail: "Obligatoire. Représente la valeur numérique attendue."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obligatoire. Valeur logique qui détermine la forme de la distribution de probabilité retournée. Si cumulative a la valeur TRUE, POISSON. DIST retourne la probabilité cumulée de Poisson que le nombre d’événements aléatoires se produisant soit compris entre zéro et x inclus ; si la valeur est FALSE, elle renvoie la fonction de masse de probabilité de Poisson qui indique que le nombre d’événements qui se produisent sera exactement x."
			}
		}
	},
	PROB: {
		description: "Renvoie la probabilité que des valeurs d’une plage soient comprises entre deux limites. Si l’argument limite_sup n’est pas fourni, la fonction renvoie la probabilité que les valeurs de l’argument plage_x soient égales à limite_inf.",
		abstract: "Renvoie la probabilité que des valeurs d’une plage soient comprises entre deux limites. Si l’argument limite_sup n’est pas fourni, la fonction renvoie la probabilité que les valeurs de l’argument plage_x soient égales à limite_inf.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/prob-function"
		}],
		functionParameter: {
			xRange: {
				name: "x_range",
				detail: "Obligatoire. Représente la plage des valeurs numériques de x auxquelles sont associées des probabilités."
			},
			probRange: {
				name: "prob_range",
				detail: "Obligatoire. Représente une série de probabilités associée aux valeurs de plage_x."
			},
			lowerLimit: {
				name: "lower_limit",
				detail: "Optionnel. Représente la limite inférieure de la valeur pour laquelle vous recherchez une probabilité."
			},
			upperLimit: {
				name: "upper_limit",
				detail: "Optionnel. Représente la limite supérieure facultative de la valeur pour laquelle vous recherchez une probabilité."
			}
		}
	},
	QUARTILE_EXC: {
		description: "Retourne le quartile du jeu de données, basé sur des valeurs de centile comprises entre 0 et 1, exclusif.",
		abstract: "Retourne le quartile du jeu de données, basé sur des valeurs de centile comprises entre 0 et 1, exclusif.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/quartile-exc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Obligatoire. Représente la matrice ou la plage de cellules de valeurs numériques pour laquelle vous recherchez la valeur du quartile."
			},
			quart: {
				name: "quart",
				detail: "Obligatoire. Indique quelle valeur renvoyer."
			}
		}
	},
	QUARTILE_INC: {
		description: "Les quartiles sont souvent utilisés pour les données relatives aux ventes et aux enquêtes afin de séparer les populations en groupes. Ainsi, vous pouvez utiliser la fonction QUARTILE.INCLURE pour déterminer les vingt-cinq pour cent de revenus les plus élevés d’une population.",
		abstract: "Les quartiles sont souvent utilisés pour les données relatives aux ventes et aux enquêtes afin de séparer les populations en groupes. Ainsi, vous pouvez utiliser la fonction QUARTILE.INCLURE pour déterminer les vingt-cinq pour cent de revenus les plus élevés d’une population.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/quartile-inc-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Obligatoire. Représente la matrice ou la plage de cellules de valeurs numériques pour laquelle vous recherchez la valeur du quartile."
			},
			quart: {
				name: "quart",
				detail: "Obligatoire. Indique quelle valeur renvoyer."
			}
		}
	},
	RANK_AVG: {
		description: "Retourne le rang d’un nombre dans une liste de nombres : sa taille par rapport aux autres valeurs de la liste. Si plusieurs valeurs ont le même rang, le classement moyen est retourné.",
		abstract: "Retourne le rang d’un nombre dans une liste de nombres : sa taille par rapport aux autres valeurs de la liste. Si plusieurs valeurs ont le même rang, le classement moyen est retourné.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/rank-avg-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Représente le nombre dont vous voulez connaître le rang."
			},
			ref: {
				name: "ref",
				detail: "Obligatoire. Représente une matrice ou une référence à une liste de nombres. Les valeurs non numériques dans référence sont ignorées."
			},
			order: {
				name: "order",
				detail: "Optionnel. Représente un numéro qui spécifie comment déterminer le rang de l’argument nombre."
			}
		}
	},
	RANK_EQ: {
		description: "Renvoie le rang d’un nombre dans une liste de nombres. Sa taille est exprimée par rapport aux autres valeurs de la liste ; si deux valeurs, ou plus, possèdent le même rang, le rang supérieur de cet ensemble de valeurs est renvoyé.",
		abstract: "Renvoie le rang d’un nombre dans une liste de nombres. Sa taille est exprimée par rapport aux autres valeurs de la liste ; si deux valeurs, ou plus, possèdent le même rang, le rang supérieur de cet ensemble de valeurs est renvoyé.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/rank-eq-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Représente le nombre dont vous voulez connaître le rang."
			},
			ref: {
				name: "ref",
				detail: "Obligatoire. Représente une matrice ou une référence à une liste de nombres. Les valeurs non numériques dans référence sont ignorées."
			},
			order: {
				name: "order",
				detail: "Optionnel. Représente un numéro qui spécifie comment déterminer le rang de l’argument nombre."
			}
		}
	},
	RSQ: {
		description: "Renvoie la valeur du coefficient de détermination R^2 d’une régression linéaire ajustée aux observations contenues dans les arguments y_connus et x_connus. Pour plus d’informations, voir la Fonction PEARSON . Le coefficient de détermination peut être interprété comme la proportion de la variance de y imputable à la variance de x.",
		abstract: "Renvoie la valeur du coefficient de détermination R^2 d’une régression linéaire ajustée aux observations contenues dans les arguments y_connus et x_connus. Pour plus d’informations, voir la Fonction PEARSON . Le coefficient de détermination peut être interprété comme la proportion de la variance de y imputable à la variance de x.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/rsq-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Obligatoire. Représente une matrice ou une plage de cellules d’observations dépendantes."
			},
			knownXs: {
				name: "known_x's",
				detail: "Obligatoire. Représente l’ensemble des observations indépendantes."
			}
		}
	},
	SKEW: {
		description: "Renvoie l’asymétrie d’une distribution. Cette fonction caractérise le degré d’asymétrie d’une distribution par rapport à sa moyenne. Une asymétrie positive indique une distribution unilatérale décalée vers les valeurs les plus positives. Une asymétrie négative indique une distribution unilatérale décalée vers les valeurs les plus négatives.",
		abstract: "Renvoie l’asymétrie d’une distribution. Cette fonction caractérise le degré d’asymétrie d’une distribution par rapport à sa moyenne. Une asymétrie positive indique une distribution unilatérale décalée vers les valeurs les plus positives. Une asymétrie négative indique une distribution unilatérale décalée vers les valeurs les plus négatives.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/skew-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Number1 est obligatoire, les numéros suivants sont facultatifs. Représentent les 1 à 255 arguments dont vous souhaitez déterminer l’asymétrie. Vous pouvez également utiliser une matrice unique ou une référence à une matrice, au lieu d’arguments séparés par des points-virgules."
			},
			number2: {
				name: "number2",
				detail: "Number1 est obligatoire, les numéros suivants sont facultatifs. Représentent les 1 à 255 arguments dont vous souhaitez déterminer l’asymétrie. Vous pouvez également utiliser une matrice unique ou une référence à une matrice, au lieu d’arguments séparés par des points-virgules."
			}
		}
	},
	SKEW_P: {
		description: "Renvoie l’asymétrie d’une distribution en fonction d’une population : la caractérisation du degré d’asymétrie d’une distribution par rapport à sa moyenne.",
		abstract: "Renvoie l’asymétrie d’une distribution en fonction d’une population : la caractérisation du degré d’asymétrie d’une distribution par rapport à sa moyenne.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/skew-p-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Premier nombre, référence de cellule ou plage dont vous souhaitez obtenir l’asymétrie."
			},
			number2: {
				name: "number2",
				detail: "Nombres, références de cellules ou plages supplémentaires dont vous souhaitez obtenir l’asymétrie, jusqu’à 255 au maximum."
			}
		}
	},
	SLOPE: {
		description: "Renvoie la pente d’une droite de régression linéaire à l’aide de données sur les points d’abscisse et d’ordonnée connus. La pente est la distance verticale divisée par la distance horizontale séparant deux points d’une ligne ; elle exprime le taux de changement le long de la droite de régression.",
		abstract: "Renvoie la pente d’une droite de régression linéaire à l’aide de données sur les points d’abscisse et d’ordonnée connus. La pente est la distance verticale divisée par la distance horizontale séparant deux points d’une ligne ; elle exprime le taux de changement le long de la droite de régression.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/slope-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Obligatoire. Représente une matrice ou une plage de cellules d’observations dépendantes."
			},
			knownXs: {
				name: "known_x's",
				detail: "Obligatoire. Représente l’ensemble des observations indépendantes."
			}
		}
	},
	SMALL: {
		description: "Renvoie la k-ième plus petite valeur d’une série de données. Utilisez cette fonction pour renvoyer des valeurs avec une position relative particulière à l’intérieur d’une série de données.",
		abstract: "Renvoie la k-ième plus petite valeur d’une série de données. Utilisez cette fonction pour renvoyer des valeurs avec une position relative particulière à l’intérieur d’une série de données.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/small-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Obligatoire. Représente une matrice ou une plage de données numériques dans laquelle vous recherchez la k-ième plus petite valeur."
			},
			k: {
				name: "k",
				detail: "Obligatoire. Représente, dans la matrice ou la plage, le rang de la donnée à renvoyer, déterminé à partir de la valeur la plus petite."
			}
		}
	},
	STANDARDIZE: {
		description: "Renvoie une valeur centrée réduite d’une distribution caractérisée par les arguments moyenne et écart_type.",
		abstract: "Renvoie une valeur centrée réduite d’une distribution caractérisée par les arguments moyenne et écart_type.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/standardize-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obligatoire. Représente la valeur à centrer et à réduire."
			},
			mean: {
				name: "mean",
				detail: "Obligatoire. Représente la moyenne arithmétique de la distribution."
			},
			standardDev: {
				name: "standard_dev",
				detail: "Obligatoire. Représente l’écart type de la distribution."
			}
		}
	},
	STDEV_P: {
		description: "L’écart type mesure la dispersion des valeurs par rapport à la moyenne (valeur moyenne).",
		abstract: "L’écart type mesure la dispersion des valeurs par rapport à la moyenne (valeur moyenne).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/stdev-p-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obligatoire. Premier argument numérique correspondant à une population."
			},
			number2: {
				name: "number2",
				detail: "Optionnel. Arguments numériques 2 à 254 correspondant à une population entière. Vous pouvez aussi utiliser une matrice ou une référence à une matrice plutôt que des arguments séparés par des points-virgules."
			}
		}
	},
	STDEV_S: {
		description: "L’écart type mesure la dispersion des valeurs par rapport à la moyenne (valeur moyenne).",
		abstract: "L’écart type mesure la dispersion des valeurs par rapport à la moyenne (valeur moyenne).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/stdev-s-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obligatoire. Premier argument numérique correspondant à un échantillon de population. Vous pouvez aussi utiliser une matrice ou une référence à une matrice plutôt que des arguments séparés par des points-virgules."
			},
			number2: {
				name: "number2",
				detail: "Optionnel. Arguments numériques 2 à 254 correspondant à un échantillon de population. Vous pouvez aussi utiliser une matrice ou une référence à une matrice plutôt que des arguments séparés par des points-virgules."
			}
		}
	},
	STDEVA: {
		description: "Estime l’écart type à partir d’un échantillon, y compris les nombres, le texte et les valeurs logiques.",
		abstract: "Estime l’écart type à partir d’un échantillon, y compris les nombres, le texte et les valeurs logiques.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/stdeva-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Premier argument de valeur correspondant à un échantillon d’une population. Vous pouvez aussi utiliser un seul tableau ou une référence à un tableau au lieu d’arguments séparés par des virgules."
			},
			value2: {
				name: "value2",
				detail: "Arguments de valeur 2 à 254 correspondant à un échantillon d’une population. Vous pouvez aussi utiliser un seul tableau ou une référence à un tableau au lieu d’arguments séparés par des virgules."
			}
		}
	},
	STDEVPA: {
		description: "Calcule l’écart type d’une population en prenant en compte toute la population et en utilisant les arguments spécifiés, y compris le texte et les valeurs logiques. L’écart type mesure la dispersion des valeurs par rapport à la moyenne (valeur moyenne).",
		abstract: "Calcule l’écart type d’une population en prenant en compte toute la population et en utilisant les arguments spécifiés, y compris le texte et les valeurs logiques. L’écart type mesure la dispersion des valeurs par rapport à la moyenne (valeur moyenne).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/stdevpa-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Value1 est obligatoire, les valeurs suivantes sont facultatives. Représentent 1 à 255 valeurs correspondant à une population. Vous pouvez aussi utiliser une matrice ou une référence à une matrice plutôt que des arguments séparés par des points-virgules."
			},
			value2: {
				name: "value2",
				detail: "Value1 est obligatoire, les valeurs suivantes sont facultatives. Représentent 1 à 255 valeurs correspondant à une population. Vous pouvez aussi utiliser une matrice ou une référence à une matrice plutôt que des arguments séparés par des points-virgules."
			}
		}
	},
	STEYX: {
		description: "Renvoie l’erreur-type de la valeur y prévue pour chaque x de la régression. L’erreur type est une mesure du degré d’erreur dans la prévision de y à partir d’une valeur individuelle x.",
		abstract: "Renvoie l’erreur-type de la valeur y prévue pour chaque x de la régression. L’erreur type est une mesure du degré d’erreur dans la prévision de y à partir d’une valeur individuelle x.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/steyx-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Obligatoire. Représente une matrice ou une plage d’observations dépendantes."
			},
			knownXs: {
				name: "known_x's",
				detail: "Obligatoire. Représente une matrice ou une plage d’observations indépendantes."
			}
		}
	},
	T_DIST: {
		description: "Renvoie la probabilité de la distribution t de Student.",
		abstract: "Renvoie la probabilité de la distribution t de Student.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/t-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Valeur numérique à laquelle évaluer la distribution."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Entier indiquant le nombre de degrés de liberté."
			},
			cumulative: {
				name: "cumulative",
				detail: "Valeur logique qui détermine la forme de la fonction. Si cumulative vaut TRUE, T.DIST renvoie la fonction de distribution cumulée ; sinon, la fonction de densité de probabilité."
			}
		}
	},
	T_DIST_2T: {
		description: "Renvoie la probabilité de la distribution t de Student bilatérale.",
		abstract: "Renvoie la probabilité de la distribution t de Student bilatérale.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/t-dist-2t-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Valeur numérique à laquelle évaluer la distribution."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Entier indiquant le nombre de degrés de liberté."
			}
		}
	},
	T_DIST_RT: {
		description: "Renvoie la probabilité de la distribution t de Student unilatérale à droite.",
		abstract: "Renvoie la probabilité de la distribution t de Student unilatérale à droite.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/t-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obligatoire. Représente la valeur numérique à laquelle la distribution doit être évaluée."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Obligatoire. Représente un nombre entier indiquant le nombre de degrés de liberté."
			}
		}
	},
	T_INV: {
		description: "Renvoie l’inverse de la probabilité de la distribution t de Student.",
		abstract: "Renvoie l’inverse de la probabilité de la distribution t de Student.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/t-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obligatoire. Représente la probabilité associée à la loi T de Student."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Obligatoire. Représente le nombre de degrés de liberté utilisés pour caractériser la distribution."
			}
		}
	},
	T_INV_2T: {
		description: "Renvoie l’inverse de la probabilité de la distribution t de Student bilatérale.",
		abstract: "Renvoie l’inverse de la probabilité de la distribution t de Student bilatérale.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/t-inv-2t-function"
		}],
		functionParameter: {
			probability: {
				name: "probability",
				detail: "Obligatoire. Représente la probabilité associée à la loi T de Student."
			},
			degFreedom: {
				name: "degFreedom",
				detail: "Obligatoire. Représente le nombre de degrés de liberté utilisés pour caractériser la distribution."
			}
		}
	},
	T_TEST: {
		description: "Renvoie la probabilité associée à un test t de Student.",
		abstract: "Renvoie la probabilité associée à un test t de Student.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/t-test-function"
		}],
		functionParameter: {
			array1: {
				name: "array1",
				detail: "Obligatoire. Représente la première série de données."
			},
			array2: {
				name: "array2",
				detail: "Obligatoire. Représente la seconde série de données."
			},
			tails: {
				name: "tails",
				detail: "Obligatoire. Indique le type de distribution à renvoyer : unilatérale ou bilatérale. Si uni/bilatéral = 1, T.TEST utilise la distribution unilatérale; si uni/bilatéral = 2, il utilise la distribution bilatérale."
			},
			type: {
				name: "type",
				detail: "Obligatoire. Représente le type de test T à effectuer."
			}
		}
	},
	TREND: {
		description: "La fonction TREND retourne des valeurs le long d’une tendance linéaire. Il ajuste une ligne droite (à l’aide de la méthode des moindres carrés) aux known_y et known_x du tableau. TREND retourne les valeurs y le long de cette ligne pour le tableau de new_x que vous spécifiez.",
		abstract: "La fonction TREND retourne des valeurs le long d’une tendance linéaire. Il ajuste une ligne droite (à l’aide de la méthode des moindres carrés) aux known_y et known_x du tableau. TREND retourne les valeurs y le long de cette ligne pour le tableau de new_x que vous spécifiez.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/trend-function"
		}],
		functionParameter: {
			knownYs: {
				name: "known_y's",
				detail: "Ensemble de valeurs y que vous connaissez déjà dans la relation y = mx + b Si la matrice définie par l’argument y_connus occupe une seule colonne, chaque colonne de l’argument x_connus est interprétée comme étant une variable distincte. Si la matrice définie par l’argument y_connus occupe une seule ligne, chaque ligne de l’argument x_connus est interprétée comme étant une variable distincte."
			},
			knownXs: {
				name: "known_x's",
				detail: "Ensemble facultatif de valeurs x que vous connaissez peut-être déjà dans la relation y = mx + b L’argument x_connus peut contenir une ou plusieurs séries de variables. Si vous utilisez une seule variable, les arguments y_connus et x_connus peuvent être des plages de forme différente, à condition qu’elles aient la même dimension. Si vous utilisez plusieurs variables, l’argument y_connus doit être un vecteur (en d’autres termes, une plage comportant une seule ligne ou une seule colonne). Si l’argument x_connus est omis, il est supposé égal à la matrice {1.2.3....}, de même ordre que l’argument y_connus."
			},
			newXs: {
				name: "new_x's",
				detail: "Nouvelles valeurs x pour lesquelles vous souhaitez que TREND retourne les valeurs y correspondantes L’argument x_nouveaux doit comporter une colonne (ou une ligne) pour chaque variable indépendante, comme c’est le cas pour l’argument x_connus. Par conséquent, si l’argument y_connus occupe une seule colonne, les arguments x_connus et x_nouveaux doivent avoir le même nombre de colonnes. Si l’argument y_connus occupe une seule ligne, les arguments x_connus et x_nouveaux doivent avoir le même nombre de lignes. Si l’argument x_nouveaux est omis, l’argument par défaut est l’argument x_connus. Si les deux arguments x_connus et x_nouveaux sont omis, les matrices par défaut sont la matrice {1.2.3....}, de même ordre que l’argument y_connus."
			},
			constb: {
				name: "const",
				detail: "Valeur logique spécifiant s’il faut forcer la constante b à être égale à 0 Si l’argument constante est VRAI ou omis, la constante b est calculée normalement. Si l’argument constante est FAUX, b est égal à 0 (zéro) et les valeurs m sont ajustées de façon à ce que y = mx."
			}
		}
	},
	TRIMMEAN: {
		description: "Renvoie la moyenne de l’intérieur d’une série de données. La fonction MOYENNE.REDUITE calcule la moyenne d’une série de données après avoir éliminé un pourcentage d’observations aux extrémités inférieure et supérieure de la distribution. Vous pouvez utiliser cette fonction lorsque vous voulez exclure de votre analyse les observations extrêmes.",
		abstract: "Renvoie la moyenne de l’intérieur d’une série de données. La fonction MOYENNE.REDUITE calcule la moyenne d’une série de données après avoir éliminé un pourcentage d’observations aux extrémités inférieure et supérieure de la distribution. Vous pouvez utiliser cette fonction lorsque vous voulez exclure de votre analyse les observations extrêmes.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/trimmean-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Obligatoire. Représente la matrice ou la plage de valeurs à réduire et sur laquelle calculer la moyenne."
			},
			percent: {
				name: "percent",
				detail: "Obligatoire. Représente le nombre fractionnaire d’observations à exclure du calcul. Par exemple, si l’argument pourcentage est égal à 0,2 et que la série de données contient 20 observations, 4 d’entre elles seront éliminées (20 x 0,2), 2 au début et 2 à la fin de la série."
			}
		}
	},
	VAR_P: {
		description: "Calcule la variance d’après la population entière, en ignorant les valeurs logiques et le texte de la population.",
		abstract: "Calcule la variance d’après la population entière.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/var-p-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obligatoire. Premier argument numérique correspondant à une population."
			},
			number2: {
				name: "number2",
				detail: "Optionnel. Arguments numériques 2 à 254 correspondant à une population entière."
			}
		}
	},
	VAR_S: {
		description: "Estime la variance à partir d’un échantillon, en ignorant les valeurs logiques et le texte de l’échantillon.",
		abstract: "Estime la variance à partir d’un échantillon.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/var-s-function"
		}],
		functionParameter: {
			number1: {
				name: "number1",
				detail: "Obligatoire. Premier argument numérique correspondant à un échantillon de population."
			},
			number2: {
				name: "number2",
				detail: "Optionnel. Arguments numériques 2 à 254 correspondant à un échantillon de population."
			}
		}
	},
	VARA: {
		description: "Calcule la variance sur la base d’un échantillon.",
		abstract: "Calcule la variance sur la base d’un échantillon.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/vara-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Value1 est obligatoire, les valeurs suivantes sont facultatives. Représentent les 1 à 255 arguments de valeurs correspondant à l’échantillon de la population."
			},
			value2: {
				name: "value2",
				detail: "Value1 est obligatoire, les valeurs suivantes sont facultatives. Représentent les 1 à 255 arguments de valeurs correspondant à l’échantillon de la population."
			}
		}
	},
	VARPA: {
		description: "Calcule la variance sur la base de l’ensemble de la population.",
		abstract: "Calcule la variance sur la base de l’ensemble de la population.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/varpa-function"
		}],
		functionParameter: {
			value1: {
				name: "value1",
				detail: "Value1 est obligatoire, les valeurs suivantes sont facultatives. Représentent les 1 à 255 arguments de valeurs correspondant à une population."
			},
			value2: {
				name: "value2",
				detail: "Value1 est obligatoire, les valeurs suivantes sont facultatives. Représentent les 1 à 255 arguments de valeurs correspondant à une population."
			}
		}
	},
	WEIBULL_DIST: {
		description: "Renvoie la probabilité d’une variable aléatoire suivant une loi Weibull. Utilisez cette distribution dans une analyse de fiabilité telle que le calcul du temps moyen de fonctionnement sans panne d’un appareil.",
		abstract: "Renvoie la probabilité d’une variable aléatoire suivant une loi Weibull. Utilisez cette distribution dans une analyse de fiabilité telle que le calcul du temps moyen de fonctionnement sans panne d’un appareil.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/weibull-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Obligatoire. Représente la variable avec laquelle la fonction doit être calculée."
			},
			alpha: {
				name: "alpha",
				detail: "Obligatoire. Représente un paramètre de la distribution."
			},
			beta: {
				name: "beta",
				detail: "Obligatoire. Représente un paramètre de la distribution."
			},
			cumulative: {
				name: "cumulative",
				detail: "Obligatoire. Détermine la forme de la fonction."
			}
		}
	},
	Z_TEST: {
		description: "Pour plus d’informations sur l’utilisation de Z.TEST dans une formule pour calculer une valeur de probabilité bilatérale, voir la section « Notes » ci-dessous.",
		abstract: "Pour plus d’informations sur l’utilisation de Z.TEST dans une formule pour calculer une valeur de probabilité bilatérale, voir la section « Notes » ci-dessous.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/z-test-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Obligatoire. Représente la matrice ou la plage de données par rapport à laquelle tester x."
			},
			x: {
				name: "x",
				detail: "Obligatoire. Représente la valeur à tester."
			},
			sigma: {
				name: "sigma",
				detail: "Optionnel. Représente l’écart type (connu) de la population. Si l’argument est omis, la valeur de l’argument par défaut est l’écart type de l’échantillon."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/text/fr-FR.ts
const locale$3 = {
	ASC: {
		description: "En ce qui concerne les langues à jeu de caractères codés sur deux octets (DBCS, Double-byte Character Set), la fonction remplace les caractères à pleine chasse (codés sur deux octets) en caractères à demi-chasse (codés sur un octet).",
		abstract: "En ce qui concerne les langues à jeu de caractères codés sur deux octets (DBCS, Double-byte Character Set), la fonction remplace les caractères à pleine chasse (codés sur deux octets) en caractères à demi-chasse (codés sur un octet).",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/asc-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Obligatoire. Représente le texte ou une référence à une cellule contenant le texte que vous souhaitez modifier. Si le texte ne contient pas de lettres à pleine chasse, il n’est pas modifié."
		} }
	},
	ARRAYTOTEXT: {
		description: "La fonction ARRAYTOTEXT renvoie une matrice de valeurs de texte à partir de toute plage spécifiée. Elle transfère les valeurs de texte inchangées et convertit les valeurs non textuelles en texte.",
		abstract: "La fonction ARRAYTOTEXT renvoie une matrice de valeurs de texte à partir de toute plage spécifiée. Elle transfère les valeurs de texte inchangées et convertit les valeurs non textuelles en texte.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/arraytotext-function"
		}],
		functionParameter: {
			array: {
				name: "array",
				detail: "Matrice à renvoyer comme texte. Obligatoire."
			},
			format: {
				name: "format",
				detail: "Le format des données retournées. Facultatif. Il peut s’agir de l’une des deux valeurs : 0 Valeur par défaut. Format concis facile à lire. Le texte renvoyé est identique au texte rendu dans une cellule dans laquelle une mise en forme générale est appliquée. 1 Format strict qui inclut des caractères d’échappement et des délimiteurs de lignes. Génère une chaîne qui peut être analysée lors de la saisie dans la barre de formule. Encapsule les chaînes renvoyées entre guillemets, à l’exception des valeurs booléennes, des nombres et des erreurs."
			}
		}
	},
	BAHTTEXT: {
		description: "Convertit un nombre en texte en langue thaï et ajoute le suffixe « Baht »",
		abstract: "Convertit un nombre en texte en langue thaï et ajoute le suffixe « Baht »",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/bahttext-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire. Un nombre que vous convertissez en texte, une référence à une cellule contenant un nombre ou une formule qui retourne un nombre."
		} }
	},
	CHAR: {
		description: "Renvoie le caractère spécifié par un nombre. Utilisez CAR pour convertir en caractères des numéros de pages de codes provenant de fichiers stockés sur d’autres types d’ordinateurs.",
		abstract: "Renvoie le caractère spécifié par un nombre. Utilisez CAR pour convertir en caractères des numéros de pages de codes provenant de fichiers stockés sur d’autres types d’ordinateurs.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/char-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire. Représente un nombre compris entre 1 et 255, indiquant le caractère recherché. Ce dernier provient du jeu de caractères utilisé par votre ordinateur. Remarque Excel sur le Web prend uniquement en charge CHAR(9), CHAR(10), CHAR(13) et CHAR(32) et versions ultérieures."
		} }
	},
	CLEAN: {
		description: "Supprime tous les caractères de contrôle du texte. Utilisez EPURAGE pour du texte importé d’autres applications contenant des caractères qui ne pourront peut-être pas être imprimés sous votre système d’exploitation. Par exemple, la fonction EPURAGE vous permet de supprimer certains codes de bas niveau généralement placés par le système au début et à la fin des fichiers de données, et qui ne peuvent pas être imprimés.",
		abstract: "Supprime tous les caractères de contrôle du texte. Utilisez EPURAGE pour du texte importé d’autres applications contenant des caractères qui ne pourront peut-être pas être imprimés sous votre système d’exploitation. Par exemple, la fonction EPURAGE vous permet de supprimer certains codes de bas niveau généralement placés par le système au début et à la fin des fichiers de données, et qui ne peuvent pas être imprimés.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/clean-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Obligatoire. Représente toute information d’une feuille de calcul dont vous voulez supprimer les caractères non imprimables."
		} }
	},
	CODE: {
		description: "Renvoie le numéro de code du premier caractère du texte. Le code renvoyé correspond au jeu de caractères utilisé par votre ordinateur.",
		abstract: "Renvoie le numéro de code du premier caractère du texte. Le code renvoyé correspond au jeu de caractères utilisé par votre ordinateur.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/code-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Obligatoire. Texte dont vous voulez obtenir le code du premier caractère."
		} }
	},
	CONCAT: {
		description: "La fonction CONCAT combine le texte de plusieurs plages et/ou chaînes, mais elle ne fournit pas d’arguments délimiteur ou IgnoreEmpty.",
		abstract: "La fonction CONCAT combine le texte de plusieurs plages et/ou chaînes, mais elle ne fournit pas d’arguments délimiteur ou IgnoreEmpty.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/concat-function"
		}],
		functionParameter: {
			text1: {
				name: "text1",
				detail: "Élément de texte à joindre. Chaîne, ou tableau de chaînes, par exemple une plage de cellules."
			},
			text2: {
				name: "text2",
				detail: "Autres éléments de texte à joindre. Vous pouvez faire figurer jusqu’à 253 arguments de texte. Il peut s’agir de chaînes ou de tableaux de chaînes, comme une plage de cellules."
			}
		}
	},
	CONCATENATE: {
		description: "La fonction CONCATENER , qui fait partie des fonctions de texte permet de joindre plusieurs chaînes au sein d’une seule chaîne.",
		abstract: "La fonction CONCATENER , qui fait partie des fonctions de texte permet de joindre plusieurs chaînes au sein d’une seule chaîne.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/concatenate-function"
		}],
		functionParameter: {
			text1: {
				name: "text1",
				detail: "Premier élément à joindre. Il peut s’agir d’une valeur texte, d’un nombre ou d’une référence de cellule."
			},
			text2: {
				name: "text2",
				detail: "Éléments de texte supplémentaires à joindre. Vous pouvez avoir jusqu’à 255 éléments, pour un total de 8 192 caractères."
			}
		}
	},
	DBCS: {
		description: "La fonction décrite dans cette rubrique d’aide convertit des lettres à demi-chasse (codées sur un octet) à l’intérieur d’une chaîne de caractères en caractères à pleine chasse (codés sur deux octets). Le nom de la fonction (et du caractère qu’elle ajoute) dépend de vos paramètres de langue.",
		abstract: "La fonction décrite dans cette rubrique d’aide convertit des lettres à demi-chasse (codées sur un octet) à l’intérieur d’une chaîne de caractères en caractères à pleine chasse (codés sur deux octets). Le nom de la fonction (et du caractère qu’elle ajoute) dépend de vos paramètres de langue.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/dbcs-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Obligatoire. Représente le texte ou une référence à une cellule contenant le texte que vous souhaitez modifier. Si l’argument texte ne contient pas de caractères Anglais ou Katakana à demi-chasse, le texte n’est pas modifié."
		} }
	},
	DOLLAR: {
		description: "La fonction DOLLAR , l’une des fonctions TEXT , convertit un nombre en texte à l’aide du format monétaire, avec les décimales arrondies au nombre d’emplacements que vous spécifiez. DOLLAR utilise $#,##0.00_) ; Format de nombre ($#,##0.00), bien que le symbole monétaire appliqué dépend de vos paramètres de langue locale.",
		abstract: "La fonction DOLLAR , l’une des fonctions TEXT , convertit un nombre en texte à l’aide du format monétaire, avec les décimales arrondies au nombre d’emplacements que vous spécifiez. DOLLAR utilise $#,##0.00_) ; Format de nombre ($#,##0.00), bien que le symbole monétaire appliqué dépend de vos paramètres de langue locale.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/dollar-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Représente un nombre, une référence à une cellule contenant un nombre ou une formule qui renvoie un nombre."
			},
			decimals: {
				name: "decimals",
				detail: "Optionnel. Représente le nombre de chiffres après la virgule. Si cette valeur est négative, le nombre est arrondi à gauche de la virgule décimale. Si décimales est omis, le nombre de décimales par défaut est 2."
			}
		}
	},
	EXACT: {
		description: "Compare deux chaînes de texte et renvoie la valeur VRAI si elles sont identiques ou la valeur FAUX dans le cas contraire. EXACT respecte la casse, mais ne tient pas compte des différences de mise en forme. Utilisez EXACT pour tester la conformité d’un texte tapé dans un document.",
		abstract: "Compare deux chaînes de texte et renvoie la valeur VRAI si elles sont identiques ou la valeur FAUX dans le cas contraire. EXACT respecte la casse, mais ne tient pas compte des différences de mise en forme. Utilisez EXACT pour tester la conformité d’un texte tapé dans un document.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/exact-function"
		}],
		functionParameter: {
			text1: {
				name: "text1",
				detail: "Obligatoire. Représente la première chaîne de texte."
			},
			text2: {
				name: "text2",
				detail: "Obligatoire. Représente la seconde chaîne de texte."
			}
		}
	},
	FIND: {
		description: "Recherche une valeur textuelle dans une autre en respectant la casse.",
		abstract: "Recherche une valeur textuelle dans une autre en respectant la casse.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/this-article-has-been-retired"
		}],
		functionParameter: {
			findText: {
				name: "find_text",
				detail: "Texte à rechercher."
			},
			withinText: {
				name: "within_text",
				detail: "Texte contenant le texte à rechercher."
			},
			startNum: {
				name: "start_num",
				detail: "Indique le caractère auquel commencer la recherche. Si start_num est omis, sa valeur est 1."
			}
		}
	},
	FINDB: {
		description: "Recherche une valeur textuelle dans une autre en respectant la casse.",
		abstract: "Recherche une valeur textuelle dans une autre en respectant la casse.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/this-article-has-been-retired"
		}],
		functionParameter: {
			findText: {
				name: "find_text",
				detail: "Texte à rechercher."
			},
			withinText: {
				name: "within_text",
				detail: "Texte contenant le texte à rechercher."
			},
			startNum: {
				name: "start_num",
				detail: "Indique le caractère auquel commencer la recherche. Si start_num est omis, sa valeur est 1."
			}
		}
	},
	FIXED: {
		description: "Arrondit un nombre au nombre de décimales spécifié, lui applique le format décimal, à l’aide d’une virgule et d’espaces, et renvoie le résultat sous forme de texte.",
		abstract: "Arrondit un nombre au nombre de décimales spécifié, lui applique le format décimal, à l’aide d’une virgule et d’espaces, et renvoie le résultat sous forme de texte.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/fixed-function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Obligatoire. Représente le nombre que vous voulez arrondir et convertir en texte."
			},
			decimals: {
				name: "decimals",
				detail: "Optionnel. Représente le nombre de chiffres après la virgule."
			},
			noCommas: {
				name: "no_commas",
				detail: "Optionnel. Représente une valeur logique qui, lorsqu’elle est VRAI, permet d’éviter que des virgules soient insérées dans le texte renvoyé par CTXT."
			}
		}
	},
	LEFT: {
		description: "Renvoie les caractères les plus à gauche d’une valeur textuelle.",
		abstract: "Renvoie les caractères les plus à gauche d’une valeur textuelle.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/left-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Chaîne de texte contenant les caractères à extraire."
			},
			numChars: {
				name: "num_chars",
				detail: "Indique le nombre de caractères que LEFT doit extraire."
			}
		}
	},
	LEFTB: {
		description: "Renvoie les caractères les plus à gauche d’une valeur textuelle.",
		abstract: "Renvoie les caractères les plus à gauche d’une valeur textuelle.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/left-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Chaîne de texte contenant les caractères à extraire."
			},
			numBytes: {
				name: "num_bytes",
				detail: "Indique le nombre de caractères que LEFTB doit extraire en fonction des octets."
			}
		}
	},
	LEN: {
		description: "Renvoie le nombre de caractères d’une chaîne de texte.",
		abstract: "Renvoie le nombre de caractères d’une chaîne de texte.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/len-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Texte dont vous souhaitez connaître la longueur. Les espaces comptent comme des caractères."
		} }
	},
	LENB: {
		description: "Renvoie le nombre d’octets utilisés pour représenter les caractères d’une chaîne de texte.",
		abstract: "Renvoie le nombre d’octets utilisés pour représenter les caractères d’une chaîne de texte.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/len-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Texte dont vous souhaitez connaître la longueur. Les espaces comptent comme des caractères."
		} }
	},
	LOWER: {
		description: "Convertit toutes les lettres majuscules d’une chaîne de texte en lettres minuscules.",
		abstract: "Convertit toutes les lettres majuscules d’une chaîne de texte en lettres minuscules.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/lower-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Obligatoire. Représente le texte à convertir en caractères minuscules. La fonction MINUSCULE ne modifie pas les caractères du texte qui ne sont pas des lettres."
		} }
	},
	MID: {
		description: "Renvoie un nombre donné de caractères d’une chaîne de texte à partir de la position indiquée.",
		abstract: "Renvoie un nombre donné de caractères d’une chaîne de texte à partir de la position indiquée.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/mid-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Chaîne de texte contenant les caractères à extraire."
			},
			startNum: {
				name: "start_num",
				detail: "Position du premier caractère de text à extraire."
			},
			numChars: {
				name: "num_chars",
				detail: "Indique le nombre de caractères que MID doit extraire."
			}
		}
	},
	MIDB: {
		description: "Renvoie un nombre donné de caractères d’une chaîne de texte à partir de la position indiquée.",
		abstract: "Renvoie un nombre donné de caractères d’une chaîne de texte à partir de la position indiquée.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/mid-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Chaîne de texte contenant les caractères à extraire."
			},
			startNum: {
				name: "start_num",
				detail: "Position du premier caractère de text à extraire."
			},
			numBytes: {
				name: "num_bytes",
				detail: "Indique le nombre de caractères que MIDB doit extraire en fonction des octets."
			}
		}
	},
	NUMBERSTRING: {
		description: "Convertit des nombres en chaînes de caractères chinoises.",
		abstract: "Convertit des nombres en chaînes de caractères chinoises.",
		links: [{
			title: "Instruction",
			url: "https://www.wps.cn/learning/course/detail/id/340.html?chan=pc_kdocs_function"
		}],
		functionParameter: {
			number: {
				name: "number",
				detail: "Valeur convertie en chaîne chinoise."
			},
			type: {
				name: "type",
				detail: "Type du résultat renvoyé. \n1. Chinois en minuscules \n2. Chinois en majuscules \n3. Caractères chinois de lecture et d’écriture"
			}
		}
	},
	NUMBERVALUE: {
		description: "Convertit un texte en nombre en fonction de paramètres régionaux.",
		abstract: "Convertit un texte en nombre en fonction de paramètres régionaux.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/numbervalue-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Obligatoire. Le texte à convertir en nombre."
			},
			decimalSeparator: {
				name: "decimal_separator",
				detail: "Optionnel. Le caractère utilisé pour séparer l’entier et la partie fractionnaire du résultat."
			},
			groupSeparator: {
				name: "group_separator",
				detail: "Optionnel. Le caractère utilisé pour séparer les regroupements de nombres, par exemple pour séparer les milliers des centaines et les millions des milliers."
			}
		}
	},
	PHONETIC: {
		description: "Extrait les caractères phonétiques (furigana) d’une chaîne de texte.",
		abstract: "Extrait les caractères phonétiques (furigana) d’une chaîne de texte.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/phonetic-function"
		}],
		functionParameter: { reference: {
			name: "Référence",
			detail: "Obligatoire. Représente une chaîne de texte, ou une référence à une cellule unique ou à une plage de cellules contenant une chaîne de texte furigana."
		} }
	},
	PROPER: {
		description: "Met en majuscule la première lettre de chaque chaîne de caractères et toute lettre d’un texte qui suit un caractère non alphabétique. Toutes les autres lettres sont converties en lettres minuscules.",
		abstract: "Met en majuscule la première lettre de chaque chaîne de caractères et toute lettre d’un texte qui suit un caractère non alphabétique. Toutes les autres lettres sont converties en lettres minuscules.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/proper-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Obligatoire. Représente un texte entre guillemets, une formule qui renvoie du texte ou une référence à une cellule contenant un texte dont vous voulez que certaines lettres soient en majuscules."
		} }
	},
	REGEXEXTRACT: {
		description: "Extrait les premières sous-chaînes correspondant à une expression régulière.",
		abstract: "Extrait les premières sous-chaînes correspondant à une expression régulière.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3098244?hl=fr"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Astuce : L'exemple ci-dessus renvoie deux colonnes de données, \"extraire\" (première) et \"valeurs\" (seconde)."
			},
			regularExpression: {
				name: "regular_expression",
				detail: "La première partie de text qui correspond à cette expression est renvoyée."
			}
		}
	},
	REGEXMATCH: {
		description: "Indique si une partie d'un texte correspond à une expression régulière.",
		abstract: "Indique si une partie d'un texte correspond à une expression régulière.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3098292?hl=fr"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "texte à tester par rapport à l'expression régulière."
			},
			regularExpression: {
				name: "regular_expression",
				detail: "expression régulière à tester par rapport au texte."
			}
		}
	},
	REGEXREPLACE: {
		description: "Remplace une partie d'une chaîne de texte par une autre chaîne en utilisant des expressions régulières.",
		abstract: "Remplace une partie d'une chaîne de texte par une autre chaîne en utilisant des expressions régulières.",
		links: [{
			title: "Instruction",
			url: "https://support.google.com/docs/answer/3098245?hl=fr"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "texte dont une partie doit être remplacée."
			},
			regularExpression: {
				name: "regular_expression",
				detail: "expression régulière. Toutes les instances présentant une correspondance avec texte seront remplacées."
			},
			replacement: {
				name: "replacement",
				detail: "texte à insérer dans le texte d'origine."
			}
		}
	},
	REPLACE: {
		description: "Remplace des caractères dans un texte.",
		abstract: "Remplace des caractères dans un texte.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/replace-function"
		}],
		functionParameter: {
			oldText: {
				name: "old_text",
				detail: "Texte dans lequel vous souhaitez remplacer certains caractères."
			},
			startNum: {
				name: "start_num",
				detail: "Position du caractère dans old_text à remplacer par new_text."
			},
			numChars: {
				name: "num_chars",
				detail: "Nombre de caractères dans old_text que REPLACE doit remplacer par new_text."
			},
			newText: {
				name: "new_text",
				detail: "Texte qui remplace les caractères dans old_text."
			}
		}
	},
	REPLACEB: {
		description: "Remplace des caractères dans un texte.",
		abstract: "Remplace des caractères dans un texte.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/replace-function"
		}],
		functionParameter: {
			oldText: {
				name: "old_text",
				detail: "Texte dans lequel vous souhaitez remplacer certains caractères."
			},
			startNum: {
				name: "start_num",
				detail: "Position du caractère dans old_text à remplacer par new_text."
			},
			numBytes: {
				name: "num_bytes",
				detail: "Nombre d’octets dans old_text que REPLACEB doit remplacer par new_text."
			},
			newText: {
				name: "new_text",
				detail: "Texte qui remplace les caractères dans old_text."
			}
		}
	},
	REPT: {
		description: "Répète un texte un certain nombre de fois. Utilisez la fonction REPT pour remplir une cellule avec plusieurs instances d’une chaîne de texte.",
		abstract: "Répète un texte un certain nombre de fois. Utilisez la fonction REPT pour remplir une cellule avec plusieurs instances d’une chaîne de texte.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/rept-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Obligatoire. Représente le texte à répéter."
			},
			numberTimes: {
				name: "number_times",
				detail: "Obligatoire. Représente un nombre positif indiquant le nombre de répétitions de la chaîne de texte."
			}
		}
	},
	RIGHT: {
		description: "Renvoie les caractères les plus à droite d’une valeur textuelle.",
		abstract: "Renvoie les caractères les plus à droite d’une valeur textuelle.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/right-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Chaîne de texte contenant les caractères à extraire."
			},
			numChars: {
				name: "num_chars",
				detail: "Indique le nombre de caractères que RIGHT doit extraire."
			}
		}
	},
	RIGHTB: {
		description: "Renvoie les caractères les plus à droite d’une valeur textuelle.",
		abstract: "Renvoie les caractères les plus à droite d’une valeur textuelle.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/right-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Chaîne de texte contenant les caractères à extraire."
			},
			numBytes: {
				name: "num_bytes",
				detail: "Indique le nombre de caractères que RIGHTB doit extraire en fonction des octets."
			}
		}
	},
	SEARCH: {
		description: "Recherche une valeur textuelle dans une autre sans respecter la casse.",
		abstract: "Recherche une valeur textuelle dans une autre sans respecter la casse.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/search-function"
		}],
		functionParameter: {
			findText: {
				name: "find_text",
				detail: "Texte à rechercher."
			},
			withinText: {
				name: "within_text",
				detail: "Texte contenant le texte à rechercher."
			},
			startNum: {
				name: "start_num",
				detail: "Indique le caractère auquel commencer la recherche. Si start_num est omis, sa valeur est 1."
			}
		}
	},
	SEARCHB: {
		description: "Recherche une valeur textuelle dans une autre sans respecter la casse.",
		abstract: "Recherche une valeur textuelle dans une autre sans respecter la casse.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/search-function"
		}],
		functionParameter: {
			findText: {
				name: "find_text",
				detail: "Texte à rechercher."
			},
			withinText: {
				name: "within_text",
				detail: "Texte contenant le texte à rechercher."
			},
			startNum: {
				name: "start_num",
				detail: "Indique le caractère auquel commencer la recherche. Si start_num est omis, sa valeur est 1."
			}
		}
	},
	SUBSTITUTE: {
		description: "Remplace new_text old_text dans une chaîne de texte. Utilisez SUBSTITUTE lorsque vous souhaitez remplacer du texte spécifique dans une chaîne de texte ; utilisez REPLACE lorsque vous souhaitez remplacer tout texte qui se trouve à un emplacement spécifique dans une chaîne de texte.",
		abstract: "Remplace new_text old_text dans une chaîne de texte. Utilisez SUBSTITUTE lorsque vous souhaitez remplacer du texte spécifique dans une chaîne de texte ; utilisez REPLACE lorsque vous souhaitez remplacer tout texte qui se trouve à un emplacement spécifique dans une chaîne de texte.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/substitute-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Obligatoire. Représente le texte ou la référence à une cellule contenant le texte dont vous voulez remplacer certains caractères."
			},
			oldText: {
				name: "old_text",
				detail: "Obligatoire. Représente le texte à remplacer."
			},
			newText: {
				name: "new_text",
				detail: "Obligatoire. Représente le texte qui doit remplacer ancien_texte."
			},
			instanceNum: {
				name: "instance_num",
				detail: "Optionnel. Spécifie quelle occurrence de ancien_texte vous souhaitez remplacer par nouveau_texte. Si vous spécifiez no_position, seule l’occurrence correspondante de ancien_texte est remplacée. Sinon, toutes les occurrences de ancien_texte dans texte sont remplacées par nouveau_texte."
			}
		}
	},
	T: {
		description: "Renvoie le texte auquel l’argument valeur fait référence.",
		abstract: "Renvoie le texte auquel l’argument valeur fait référence.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/t-function"
		}],
		functionParameter: { value: {
			name: "value",
			detail: "Obligatoire. Représente la valeur à tester."
		} }
	},
	TEXT: {
		description: "La fonction TEXTE vous permet de modifier la manière dont un nombre est affiché en lui appliquant une mise en forme qui utilise des codes de format . Cela peut vous être utile lorsque vous souhaitez afficher des nombres dans un format plus lisible, ou quand vous souhaitez combiner des nombres à du texte ou des symboles.",
		abstract: "La fonction TEXTE vous permet de modifier la manière dont un nombre est affiché en lui appliquant une mise en forme qui utilise des codes de format . Cela peut vous être utile lorsque vous souhaitez afficher des nombres dans un format plus lisible, ou quand vous souhaitez combiner des nombres à du texte ou des symboles.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/text-function"
		}],
		functionParameter: {
			value: {
				name: "value",
				detail: "Valeur numérique que vous souhaitez convertir en texte."
			},
			formatText: {
				name: "format_text",
				detail: "Chaîne de texte qui définit la mise en forme à appliquer à la valeur fournie."
			}
		}
	},
	TEXTAFTER: {
		description: "Retourne le texte qui se trouve après le caractère ou la chaîne de caractères donnés. C’est l’opposé de la fonction TEXTE.AVANTE.",
		abstract: "Retourne le texte qui se trouve après le caractère ou la chaîne de caractères donnés. C’est l’opposé de la fonction TEXTE.AVANTE.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/textafter-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Texte dans lequel effectuer la recherche. Les caractères génériques ne sont pas autorisés."
			},
			delimiter: {
				name: "delimiter",
				detail: "Texte qui marque le point après lequel extraire."
			},
			instanceNum: {
				name: "instance_num",
				detail: "Occurrence du délimiteur après laquelle extraire le texte."
			},
			matchMode: {
				name: "match_mode",
				detail: "Détermine si la recherche respecte la casse. Par défaut, elle respecte la casse."
			},
			matchEnd: {
				name: "match_end",
				detail: "Traite la fin du texte comme un délimiteur. Par défaut, le texte doit correspondre exactement."
			},
			ifNotFound: {
				name: "if_not_found",
				detail: "Valeur renvoyée si aucune correspondance n’est trouvée. Par défaut, #N/A est renvoyé."
			}
		}
	},
	TEXTBEFORE: {
		description: "Retourne le texte qui se trouve avant un caractère ou une chaîne de caractères donnés. C’est l’opposé de la fonction TEXTAFTER .",
		abstract: "Retourne le texte qui se trouve avant un caractère ou une chaîne de caractères donnés. C’est l’opposé de la fonction TEXTAFTER .",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/textbefore-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Texte dans lequel effectuer la recherche. Les caractères génériques ne sont pas autorisés."
			},
			delimiter: {
				name: "delimiter",
				detail: "Texte qui marque le point avant lequel extraire."
			},
			instanceNum: {
				name: "instance_num",
				detail: "Occurrence du délimiteur avant laquelle extraire le texte."
			},
			matchMode: {
				name: "match_mode",
				detail: "Détermine si la recherche respecte la casse. Par défaut, elle respecte la casse."
			},
			matchEnd: {
				name: "match_end",
				detail: "Traite le début du texte comme un délimiteur. Par défaut, le texte doit correspondre exactement."
			},
			ifNotFound: {
				name: "if_not_found",
				detail: "Valeur renvoyée si aucune correspondance n’est trouvée. Par défaut, #N/A est renvoyé."
			}
		}
	},
	TEXTJOIN: {
		description: "La fonction JOINDRE.TEXTE combine le texte à partir de plusieurs plages et/ou chaînes, et inclut un séparateur que vous spécifiez entre chaque valeur de texte à combiner. Si le séparateur est une chaîne de texte vide, cette fonction concatène effectivement les plages.",
		abstract: "La fonction JOINDRE.TEXTE combine le texte à partir de plusieurs plages et/ou chaînes, et inclut un séparateur que vous spécifiez entre chaque valeur de texte à combiner. Si le séparateur est une chaîne de texte vide, cette fonction concatène effectivement les plages.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/textjoin-function"
		}],
		functionParameter: {
			delimiter: {
				name: "delimiter",
				detail: "Chaîne de texte, vide ou constituée d’un ou plusieurs caractères entre guillemets, ou référence à une chaîne de texte valide. Si un nombre est fourni, il sera traité comme du texte."
			},
			ignoreEmpty: {
				name: "ignore_empty",
				detail: "Si la valeur est TRUE, ignore les cellules vides."
			},
			text1: {
				name: "text1",
				detail: "Élément de texte à joindre. Chaîne de texte, ou tableau de chaînes, par exemple une plage de cellules."
			},
			text2: {
				name: "text2",
				detail: "Autres éléments de texte à joindre. Vous pouvez faire figurer jusqu’à 252 arguments de texte, texte1 compris. Il peut s’agir de chaînes de texte ou de tableaux de chaînes, comme une plage de cellules."
			}
		}
	},
	TEXTSPLIT: {
		description: "La fonction FRACTIONNER.TEXTE fonctionne de la même manière que l’Assistant Texte à colonnes , mais sous forme de formule. Il vous permet de fractionner les colonnes ou vers le bas par lignes. Il s’agit de l’inverse de la fonction TEXTJOIN .",
		abstract: "La fonction FRACTIONNER.TEXTE fonctionne de la même manière que l’Assistant Texte à colonnes , mais sous forme de formule. Il vous permet de fractionner les colonnes ou vers le bas par lignes. Il s’agit de l’inverse de la fonction TEXTJOIN .",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/textsplit-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Texte à fractionner. Obligatoire."
			},
			colDelimiter: {
				name: "col_delimiter",
				detail: "Texte qui marque le point où le texte doit être renversé dans les colonnes."
			},
			rowDelimiter: {
				name: "row_delimiter",
				detail: "Texte qui marque le point où renverser le texte vers le bas des lignes. Facultatif."
			},
			ignoreEmpty: {
				name: "ignore_empty",
				detail: "Spécifiez TRUE pour ignorer les délimiteurs consécutifs. La valeur par défaut est FALSE, qui crée une cellule vide. Facultatif."
			},
			matchMode: {
				name: "match_mode",
				detail: "Spécifiez 1 pour effectuer une correspondance ne respectant pas la casse. La valeur par défaut est 0, ce qui correspond à une correspondance respectant la casse. Facultatif."
			},
			padWith: {
				name: "pad_with",
				detail: "Valeur avec laquelle compléter le résultat. La valeur par défaut est #N/A."
			}
		}
	},
	TRIM: {
		description: "Supprime tous les espaces de texte à l’exception des espaces simples entre les mots. Exécutez la fonction SUPPRESPACE sur le texte provenant d’autres applications et dont l’espacement peut être irrégulier.",
		abstract: "Supprime tous les espaces de texte à l’exception des espaces simples entre les mots. Exécutez la fonction SUPPRESPACE sur le texte provenant d’autres applications et dont l’espacement peut être irrégulier.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/trim-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Texte dont vous souhaitez supprimer les espaces. Le texte doit être contenu entre guillemets."
		} }
	},
	UNICHAR: {
		description: "Renvoie le caractère unicode référencé par la valeur numérique donnée.",
		abstract: "Renvoie le caractère unicode référencé par la valeur numérique donnée.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/unichar-function"
		}],
		functionParameter: { number: {
			name: "number",
			detail: "Obligatoire. Nombre est le nombre unicode qui représente le caractère."
		} }
	},
	UNICODE: {
		description: "Renvoie le nombre (point de code) qui correspond au premier caractère du texte.",
		abstract: "Renvoie le nombre (point de code) qui correspond au premier caractère du texte.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/unicode-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Obligatoire. Texte est le caractère pour lequel vous souhaitez obtenir la valeur unicode."
		} }
	},
	UPPER: {
		description: "Convertit un texte en majuscules.",
		abstract: "Convertit un texte en majuscules.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/upper-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Obligatoire. Représente le texte que vous voulez convertir en caractères majuscules. L’argument texte peut être une référence ou une chaîne de caractères."
		} }
	},
	VALUE: {
		description: "Convertit en nombre une chaîne de caractères représentant un nombre.",
		abstract: "Convertit en nombre une chaîne de caractères représentant un nombre.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/value-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Obligatoire. Représente le texte placé entre guillemets ou une référence à une cellule contenant le texte que vous voulez convertir."
		} }
	},
	VALUETOTEXT: {
		description: "La fonction VALEUR.EN.TEXTE renvoie le texte d’une valeur spécifiée. Elle transfère les valeurs de texte inchangées et convertit les valeurs non textuelles en texte.",
		abstract: "La fonction VALEUR.EN.TEXTE renvoie le texte d’une valeur spécifiée. Elle transfère les valeurs de texte inchangées et convertit les valeurs non textuelles en texte.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/valuetotext-function"
		}],
		functionParameter: {
			value: {
				name: "value",
				detail: "La valeur à renvoyer comme texte. Obligatoire."
			},
			format: {
				name: "format",
				detail: "Le format des données retournées. Facultatif. Il peut s’agir de l’une des deux valeurs : 0 Valeur par défaut. Format concis facile à lire. Le texte renvoyé est identique au texte rendu dans une cellule dans laquelle une mise en forme générale est appliquée. 1 Format strict qui inclut des caractères d’échappement et des délimiteurs de lignes. Génère une chaîne qui peut être analysée lors de la saisie dans la barre de formule. Encapsule les chaînes renvoyées entre guillemets, à l’exception des valeurs booléennes, des nombres et des erreurs."
			}
		}
	},
	CALL: {
		description: "Appelle une procédure dans la bibliothèque de liens dynamiques ou de ressource de code. Cette fonction adopte deux formes de syntaxe. Utilisez la première uniquement avec une ressource de code préalablement mise en registre et utilisant des arguments de la fonction REGISTRE. Utilisez la syntaxe 2a ou 2b pour appeler et mettre en registre simultanément une ressource de code.",
		abstract: "Appelle une procédure dans la bibliothèque de liens dynamiques ou de ressource de code. Cette fonction adopte deux formes de syntaxe. Utilisez la première uniquement avec une ressource de code préalablement mise en registre et utilisant des arguments de la fonction REGISTRE. Utilisez la syntaxe 2a ou 2b pour appeler et mettre en registre simultanément une ressource de code.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/call-function"
		}],
		functionParameter: {
			moduleText: {
				name: "Module_text",
				detail: "Obligatoire. Représente un texte entre guillemets qui spécifie le nom de la bibliothèque de liens dynamiques contenant la procédure dans Microsoft Excel pour Windows."
			},
			procedure: {
				name: "Procédure",
				detail: "Obligatoire. Représente un texte qui spécifie le nom de la fonction dans la DLL dans Microsoft Excel pour Windows. Vous pouvez aussi utiliser la valeur ordinale de la fonction à partir de l’instruction EXPORTS dans le fichier de définition de module (.DEF). La valeur ordinale ne doit pas être sous forme de texte."
			},
			typeText: {
				name: "Type_text",
				detail: "Obligatoire. Représente un texte qui spécifie le type de données de la valeur renvoyée et les types de données de tous les arguments de la DLL ou de la ressource de code. La première lettre de l’argument type_texte spécifie la valeur renvoyée. Les codes utilisés pour l’argument type_texte sont décrits en détail dans la rubrique Utilisation des fonctions FONCTION.APPELANTE et REGISTRE . Pour des DLL ou des ressources de code (XML) autonomes, vous pouvez omettre cet argument."
			},
			argument1: {
				name: "Argument1 ,...",
				detail: "Optionnel. Représentent les arguments à entrer dans la procédure."
			}
		}
	},
	EUROCONVERT: {
		description: "Convertit un chiffre en euros, convertit dans les devises européennes un chiffre en euros ou convertit un chiffre d’une devise de la zone euro dans une autre en utilisant l’euro comme intermédiaire (triangulation). Les devises disponibles pour cette conversion sont celles des pays membres de l’Union Européenne (UE) qui ont adopté l’euro. Cette fonction utilise des taux de conversion fixes établis par l’UE.",
		abstract: "Convertit un chiffre en euros, convertit dans les devises européennes un chiffre en euros ou convertit un chiffre d’une devise de la zone euro dans une autre en utilisant l’euro comme intermédiaire (triangulation). Les devises disponibles pour cette conversion sont celles des pays membres de l’Union Européenne (UE) qui ont adopté l’euro. Cette fonction utilise des taux de conversion fixes établis par l’UE.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/euroconvert-function"
		}],
		functionParameter: {
			number: {
				name: "Nombre",
				detail: "Obligatoire. Il s’agit de la valeur de la devise que vous souhaitez convertir, ou d’une référence à une cellule qui contient cette valeur."
			},
			source: {
				name: "Source",
				detail: "Obligatoire. Il s’agit d’une chaîne de trois lettres ou une référence à une cellule contenant cette chaîne, qui correspond au code ISO de la devise source. Les codes de devises suivants sont disponibles dans la fonction EUROCONVERT :"
			},
			target: {
				name: "Cible",
				detail: "Obligatoire. Il s’agit d’une chaîne de trois lettres ou une référence de cellule, qui correspond au code ISO de la devise dans laquelle vous souhaitez convertir le nombre. Voir la table Source précédente pour obtenir les codes ISO."
			},
			fullPrecision: {
				name: "Full_precision",
				detail: "Obligatoire. Représente une valeur logique (VRAI ou FAUX) ou une expression qui renvoie une valeur VRAI ou FAUX, qui indique comment afficher le résultat."
			},
			triangulationPrecision: {
				name: "Triangulation_precision",
				detail: "Obligatoire. Représente un entier supérieur ou égal à 3 qui indique le nombre de chiffres significatifs à utiliser pour la valeur intermédiaire en euros lors de la conversion entre deux devises faisant partie de la zone euro. Si vous ne spécifiez pas cet argument, Excel n’arrondit pas la valeur intermédiaire en euros. Si vous spécifiez cet argument lors de la conversion en euros d’une devise appartenant à la zone euro, Excel calcule la valeur intermédiaire en euros, qui peut ensuite être convertie en devise appartenant à la zone euro."
			}
		}
	},
	REGISTER_ID: {
		description: "Renvoie l’identifiant d’inscription de la bibliothèque de liens dynamiques (DLL) ou de la ressource de code spécifiée précédemment inscrite.",
		abstract: "Renvoie l’identifiant d’inscription de la bibliothèque de liens dynamiques (DLL) ou de la ressource de code spécifiée précédemment inscrite.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/register-id-function"
		}],
		functionParameter: {
			moduleText: {
				name: "Module_text",
				detail: "Obligatoire. Représente le texte spécifiant le nom de la DLL qui contient la fonction, dans Microsoft Excel pour Windows."
			},
			procedure: {
				name: "Procédure",
				detail: "Obligatoire. Représente un texte qui spécifie le nom de la fonction dans la DLL dans Microsoft Excel pour Windows. Vous pouvez également utiliser la valeur ordinale de la fonction tirée de l’instruction EXPORTS du fichier de définition de module (.DEF). La valeur ordinale ou le numéro d’identification de la ressource ne doit pas être sous forme de texte."
			},
			typeText: {
				name: "Type_text",
				detail: "Optionnel. Représente le texte indiquant à la DLL le type de données de la valeur renvoyée et celui de tous les arguments. La première lettre de l’argument type_texte spécifie la valeur de retour. Si la fonction ou la ressource de code est déjà mise en Registre, vous pouvez omettre cet argument."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/univer/fr-FR.ts
const locale$2 = {};

//#endregion
//#region src/locale/function-list/web/fr-FR.ts
const locale$1 = {
	ENCODEURL: {
		description: "La fonction ENCODEURL retourne une chaîne encodée en URL, en remplaçant certains caractères non alphanumériques par le symbole de pourcentage (%) et un nombre hexadécimal.",
		abstract: "La fonction ENCODEURL retourne une chaîne encodée en URL, en remplaçant certains caractères non alphanumériques par le symbole de pourcentage (%) et un nombre hexadécimal.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/encodeurl-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Chaîne à encoder au format URL."
		} }
	},
	FILTERXML: {
		description: "La fonction FILTERXML retourne des données spécifiques à partir de contenu XML à l’aide du xpath spécifié.",
		abstract: "La fonction FILTERXML retourne des données spécifiques à partir de contenu XML à l’aide du xpath spécifié.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/filterxml-function"
		}],
		functionParameter: {
			xml: {
				name: "xml",
				detail: "Chaîne au format XML valide."
			},
			xpath: {
				name: "xpath",
				detail: "Chaîne au format XPath standard."
			}
		}
	},
	WEBSERVICE: {
		description: "La fonction WEBSERVICE retourne des données à partir d’un service web sur Internet ou intranet.",
		abstract: "La fonction WEBSERVICE retourne des données à partir d’un service web sur Internet ou intranet.",
		links: [{
			title: "Instruction",
			url: "https://support.microsoft.com/fr-fr/excel/functions/webservice-function"
		}],
		functionParameter: { url: {
			name: "url",
			detail: "L’URL du service web."
		} }
	}
};

//#endregion
//#region src/locale/fr-FR.ts
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