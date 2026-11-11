//#region src/locale/function-list/array/sk-SK.ts
const locale$15 = {
	ARRAY_CONSTRAIN: {
		description: "Obmedzí výsledok poľa na zadanú veľkosť.",
		abstract: "Obmedzí výsledok poľa na zadanú veľkosť.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.google.com/docs/answer/3267036?hl=sk"
		}],
		functionParameter: {
			inputRange: {
				name: "vstupný_rozsah",
				detail: "Rozsah na obmedzenie."
			},
			numRows: {
				name: "počet_riadkov",
				detail: "Počet riadkov, ktoré má výsledok obsahovať."
			},
			numCols: {
				name: "počet_stĺpcov",
				detail: "Počet stĺpcov, ktoré má výsledok obsahovať."
			}
		}
	},
	FLATTEN: {
		description: "Zploští všetky hodnoty z jedného alebo viacerých rozsahov do jedného stĺpca.",
		abstract: "Zploští všetky hodnoty z jedného alebo viacerých rozsahov do jedného stĺpca.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.google.com/docs/answer/10307761?hl=sk"
		}],
		functionParameter: {
			range1: {
				name: "rozsah1",
				detail: "Prvý rozsah na zploštenie."
			},
			range2: {
				name: "rozsah2",
				detail: "Ďalšie rozsahy na zploštenie."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/compatibility/sk-SK.ts
const locale$14 = {
	BETADIST: {
		description: "Vráti hodnotu funkcie kumulatívnej hustoty rozdelenia pravdepodobnosti beta. Rozdelenie beta sa používa na skúmanie zmeny percentuálnej časti určitého javu pre dané výbery, napríklad časti dňa, počas ktorej ľudia pozerajú televíziu.",
		abstract: "Vráti hodnotu funkcie kumulatívnej hustoty rozdelenia pravdepodobnosti beta. Rozdelenie beta sa používa na skúmanie zmeny percentuálnej časti určitého javu pre dané výbery, napríklad časti dňa, počas ktorej ľudia pozerajú televíziu.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/betadist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Povinný argument. Predstavuje hodnotu medzi hodnotami argumentov A a B, pre ktorú chcete zistiť hodnotu funkcie."
			},
			alpha: {
				name: "alfa",
				detail: "Povinné. Parameter rozdelenia."
			},
			beta: {
				name: "beta",
				detail: "Povinné. Parameter rozdelenia."
			},
			A: {
				name: "A",
				detail: "Dolná hranica pre interval hodnôt x."
			},
			B: {
				name: "B",
				detail: "B Voliteľný argument. Horná hranica pre interval hodnôt x."
			}
		}
	},
	BETAINV: {
		description: "Vráti inverznú hodnotu kumulatívnej funkcie hustoty pravdepodobnosti beta pre zadané beta rozdelenie. To znamená, že ak pravdepodobnosť = BETADIST(x,...), potom BETAINV(pravdepodobnosť,...) = x. Rozdelenie beta možno použiť na plánovanie projektov pre modelovanie pravdepodobnej doby ukončenia, ak je zadaná očakávaná doba ukončenia a premenlivosť.",
		abstract: "Vráti inverznú hodnotu kumulatívnej funkcie hustoty pravdepodobnosti beta pre zadané beta rozdelenie. To znamená, že ak pravdepodobnosť = BETADIST(x,...), potom BETAINV(pravdepodobnosť,...) = x. Rozdelenie beta možno použiť na plánovanie projektov pre modelovanie pravdepodobnej doby ukončenia, ak je zadaná očakávaná doba ukončenia a premenlivosť.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/betainv-function"
		}],
		functionParameter: {
			probability: {
				name: "pravdepodobnosť",
				detail: "Povinné. Pravdepodobnosť spojená s rozdelením beta."
			},
			alpha: {
				name: "alfa",
				detail: "Povinné. Parameter rozdelenia."
			},
			beta: {
				name: "beta",
				detail: "Povinné. Predstavuje parameter rozdelenia."
			},
			A: {
				name: "A",
				detail: "Dolná hranica pre interval hodnôt x."
			},
			B: {
				name: "B",
				detail: "B Voliteľný argument. Horná hranica pre interval hodnôt x."
			}
		}
	},
	BINOMDIST: {
		description: "Vráti hodnotu binomického rozdelenia pravdepodobnosti diskrétnych veličín. Funkcia BINOMDIST sa používa pri problémoch s pevným počtom testov alebo pokusov, keď výsledkom pokusu môže byť iba úspech alebo neúspech, pokusy sú nezávislé a pravdepodobnosť úspechu je počas trvania experimentu konštantná. Funkciou BINOMDIST napríklad môžete vypočítať, aká je pravdepodobnosť, že dve z ďalších troch narodených detí budú chlapci.",
		abstract: "Vráti hodnotu binomického rozdelenia pravdepodobnosti diskrétnych veličín. Funkcia BINOMDIST sa používa pri problémoch s pevným počtom testov alebo pokusov, keď výsledkom pokusu môže byť iba úspech alebo neúspech, pokusy sú nezávislé a pravdepodobnosť úspechu je počas trvania experimentu konštantná. Funkciou BINOMDIST napríklad môžete vypočítať, aká je pravdepodobnosť, že dve z ďalších troch narodených detí budú chlapci.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/binomdist-function"
		}],
		functionParameter: {
			numberS: {
				name: "počet_uspechov",
				detail: "Povinné. Počet úspešných pokusov."
			},
			trials: {
				name: "pokusy",
				detail: "Povinné. Počet nezávislých pokusov."
			},
			probabilityS: {
				name: "pravdepodobnosť_uspechu",
				detail: "Povinné. Pravdepodobnosť úspechu pre každý pokus."
			},
			cumulative: {
				name: "kumulatívne",
				detail: "Povinné. Logická hodnota, ktorá určuje tvar funkcie. Ak je hodnotou argumentu kumulatívne (súčet) logická hodnota TRUE, funkcia BINOMDIST vráti súčtovú distribučnú funkciu, teda pravdepodobnosť navyššej number_s úspešných pokusov. Ak má hodnotu FALSE, vráti hustotu pravdepodobnosti, teda pravdepodobnosť number_s úspechu."
			}
		}
	},
	CHIDIST: {
		description: "Vráti pravostrannú pravdepodobnosť pre rozdelenie chí-kvadrát. Rozdelenie ?2 je spojené s testom ?2. Test ?2 porovnáva pozorované a očakávané hodnoty. Pri genetickom experimente môžete napríklad predpokladať, že nasledujúca generácia rastlín bude mať určitú farbu kvetov. Porovnaním pozorovaných a očakávaných výsledkov môžete zistiť, či platí pôvodný predpoklad.",
		abstract: "Vráti pravostrannú pravdepodobnosť pre rozdelenie chí-kvadrát. Rozdelenie ?2 je spojené s testom ?2. Test ?2 porovnáva pozorované a očakávané hodnoty. Pri genetickom experimente môžete napríklad predpokladať, že nasledujúca generácia rastlín bude mať určitú farbu kvetov. Porovnaním pozorovaných a očakávaných výsledkov môžete zistiť, či platí pôvodný predpoklad.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/chidist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Povinný argument. Hodnota, pre ktorú chcete zistiť hodnotu rozdelenia."
			},
			degFreedom: {
				name: "stupne_voľnosti",
				detail: "Povinné. Počet stupňov voľnosti."
			}
		}
	},
	CHIINV: {
		description: "Vráti inverznú hodnotu pravostrannej pravdepodobnosti rozdelenia chí-kvadrát. Ak pravdepodobnosť = CHIDIST(x,...), potom CHIINV(pravdepodobnosť,...) = x. Táto funkcia slúži na porovnávanie zaznamenaných a očakávaných výsledkov, na základe ktorého možno rozhodnúť, či platí pôvodný predpoklad.",
		abstract: "Vráti inverznú hodnotu pravostrannej pravdepodobnosti rozdelenia chí-kvadrát. Ak pravdepodobnosť = CHIDIST(x,...), potom CHIINV(pravdepodobnosť,...) = x. Táto funkcia slúži na porovnávanie zaznamenaných a očakávaných výsledkov, na základe ktorého možno rozhodnúť, či platí pôvodný predpoklad.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/chiinv-function"
		}],
		functionParameter: {
			probability: {
				name: "pravdepodobnosť",
				detail: "Povinné. Pravdepodobnosť spojená s rozdelením chí-kvadrát."
			},
			degFreedom: {
				name: "stupne_voľnosti",
				detail: "Povinné. Počet stupňov voľnosti."
			}
		}
	},
	CHITEST: {
		description: "Počíta test nezávislosti. Funkcia CHITEST vráti hodnotu rozdelenia chí-kvadrát (χ2) pre štatistiku a príslušné stupne voľnosti. Testy χ2 umožňujú určiť, či sú očakávané výsledky potvrdené experimentom.",
		abstract: "Počíta test nezávislosti. Funkcia CHITEST vráti hodnotu rozdelenia chí-kvadrát (χ2) pre štatistiku a príslušné stupne voľnosti. Testy χ2 umožňujú určiť, či sú očakávané výsledky potvrdené experimentom.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/chitest-function"
		}],
		functionParameter: {
			actualRange: {
				name: "skutočný_rozsah",
				detail: "Povinné. Rozsah údajov obsahujúci pozorovania, ktoré chcete testovať a porovnávať s predpokladanými výsledkami."
			},
			expectedRange: {
				name: "očakávaný_rozsah",
				detail: "Povinné. Rozsah údajov obsahujúci podiel súčinu súčtov riadkov a stĺpcov a celkového súčtu."
			}
		}
	},
	CONFIDENCE: {
		description: "Vráti interval spoľahlivosti pre strednú hodnotu populácie použitím normálneho rozdelenia.",
		abstract: "Vráti interval spoľahlivosti pre strednú hodnotu populácie použitím normálneho rozdelenia.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/confidence-function"
		}],
		functionParameter: {
			alpha: {
				name: "alfa",
				detail: "Povinné. Hladina významnosti, pomocou ktorej sa počíta koeficient spoľahlivosti. Koeficient spoľahlivosti sa rovná 100*(1 - alfa)%, čiže ak sa argument alfa rovná 0,05, tak koeficient spoľahlivosti je 95%."
			},
			standardDev: {
				name: "štandardná_odchýlka",
				detail: "Povinné. Smerodajná odchýlka základného súboru pre danú oblasť údajov a predpokladá sa že je známa."
			},
			size: {
				name: "veľkosť",
				detail: "Povinné. Veľkosť vzorky."
			}
		}
	},
	COVAR: {
		description: "Vráti hodnotu kovariancie, priemernú hodnotu súčinu odchýlok pre všetky dvojice údajových bodov v dvoch množinách údajov.",
		abstract: "Vráti hodnotu kovariancie, priemernú hodnotu súčinu odchýlok pre všetky dvojice údajových bodov v dvoch množinách údajov.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/covar-function"
		}],
		functionParameter: {
			array1: {
				name: "pole1",
				detail: "Povinné. Prvý rozsah buniek s celými číslami."
			},
			array2: {
				name: "pole2",
				detail: "Povinné. Druhý rozsah buniek s celými číslami."
			}
		}
	},
	CRITBINOM: {
		description: "Vráti najmenšiu hodnotu, pre ktorú má distribučná funkcia binomického rozdelenia hodnotu väčšiu alebo rovnajúcu sa hodnote kritéria. Táto funkcia sa používa na kontrolu a zaisťovanie kvality. Funkciu CRITBINOM môžete napríklad použiť na určenie najväčšieho možného počtu chybných súčiastok, ktoré môžu opustiť výrobnú linku bez toho, aby bolo treba odmietnuť celú sériu.",
		abstract: "Vráti najmenšiu hodnotu, pre ktorú má distribučná funkcia binomického rozdelenia hodnotu väčšiu alebo rovnajúcu sa hodnote kritéria. Táto funkcia sa používa na kontrolu a zaisťovanie kvality. Funkciu CRITBINOM môžete napríklad použiť na určenie najväčšieho možného počtu chybných súčiastok, ktoré môžu opustiť výrobnú linku bez toho, aby bolo treba odmietnuť celú sériu.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/critbinom-function"
		}],
		functionParameter: {
			trials: {
				name: "pokusy",
				detail: "Povinné. Počet Bernoulliho pokusov."
			},
			probabilityS: {
				name: "pravdepodobnosť_uspechu",
				detail: "Povinné. Pravdepodobnosť úspechu pre každý pokus."
			},
			alpha: {
				name: "alfa",
				detail: "Povinné. Hodnota kritéria."
			}
		}
	},
	EXPONDIST: {
		description: "Vráti hodnotu distribučnej funkcie alebo hustoty exponenciálneho rozdelenia. Funkcia EXPONDIST sa používa na modelovanie času medzi udalosťami, napríklad doba, za ktorú bankomat vydá peniaze. Pomocou funkcie EXPONDIST napríklad môžete vypočítať pravdepodobnosť, že tento proces trvá najviac 1 minútu.",
		abstract: "Vráti hodnotu distribučnej funkcie alebo hustoty exponenciálneho rozdelenia. Funkcia EXPONDIST sa používa na modelovanie času medzi udalosťami, napríklad doba, za ktorú bankomat vydá peniaze. Pomocou funkcie EXPONDIST napríklad môžete vypočítať pravdepodobnosť, že tento proces trvá najviac 1 minútu.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/expondist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Povinný argument. Hodnota funkcie."
			},
			lambda: {
				name: "lambda",
				detail: "Povinné. Hodnota parametra."
			},
			cumulative: {
				name: "kumulatívne",
				detail: "Povinné. Logická hodnota, ktorá určuje, aký typ funkcie sa má poskytnúť. Ak má argument kumulatívne hodnotu TRUE, funkcia EXPONDIST vráti súčtovú distribučnú funkciu. Ak má hodnotu FALSE, vráti funkciu hustoty rozdelenia pravdepodobnosti."
			}
		}
	},
	FDIST: {
		description: "Vráti hodnotu (pravostranného) rozdelenia pravdepodobnosti F (stupeň rozdielnosti) pre dve množiny údajov. Pomocou tejto funkcie možno určiť, či majú dve množiny údajov rôzne stupne odlišnosti. Môžete napríklad skúmať výsledky prijímacích skúšok na strednú školu u mužov a u žien a určiť, či existujú odlišnosti.",
		abstract: "Vráti hodnotu (pravostranného) rozdelenia pravdepodobnosti F (stupeň rozdielnosti) pre dve množiny údajov. Pomocou tejto funkcie možno určiť, či majú dve množiny údajov rôzne stupne odlišnosti. Môžete napríklad skúmať výsledky prijímacích skúšok na strednú školu u mužov a u žien a určiť, či existujú odlišnosti.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/fdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Povinný argument. Hodnota, pre ktorú chcete funkciu vyhodnotiť."
			},
			degFreedom1: {
				name: "stupne_voľnosti1",
				detail: "Povinné. Počet stupňov voľnosti v čitateli."
			},
			degFreedom2: {
				name: "stupne_voľnosti2",
				detail: "Povinné. Počet stupňov voľnosti v menovateli."
			}
		}
	},
	FINV: {
		description: "Vráti inverznú hodnotu (sprava ohraničeného) rozdelenia pravdepodobnosti F. Ak p = F.DIST.RT(x,...), potom F.INV.RT(p,...) = x. Ak p = FDIST(x,...), potom FINV(p,...) = x.",
		abstract: "Vráti inverznú hodnotu (sprava ohraničeného) rozdelenia pravdepodobnosti F. Ak p = F.DIST.RT(x,...), potom F.INV.RT(p,...) = x. Ak p = FDIST(x,...), potom FINV(p,...) = x.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/finv-function"
		}],
		functionParameter: {
			probability: {
				name: "pravdepodobnosť",
				detail: "Povinné. Predstavuje pravdepodobnosť spojenú s kumulatívnym rozdelením F."
			},
			degFreedom1: {
				name: "stupne_voľnosti1",
				detail: "Povinné. Počet stupňov voľnosti v čitateli."
			},
			degFreedom2: {
				name: "stupne_voľnosti2",
				detail: "Povinné. Počet stupňov voľnosti v menovateli."
			}
		}
	},
	FTEST: {
		description: "Vráti výsledok F-testu. F-test vráti dvojstrannú pravdepodobnosť významnej odlišnosti rozptylov v argumentoch pole1 a pole2. Pomocou tejto funkcie možno zistiť, či sa rozptyly dvoch vzoriek líšia. Ak napríklad porovnáte výsledky testov z dvoch rozličných typov škôl (štátna a súkromná), môžete zistiť, či majú tieto školy rozdielny rozptyl výsledkov testov.",
		abstract: "Vráti výsledok F-testu. F-test vráti dvojstrannú pravdepodobnosť významnej odlišnosti rozptylov v argumentoch pole1 a pole2. Pomocou tejto funkcie možno zistiť, či sa rozptyly dvoch vzoriek líšia. Ak napríklad porovnáte výsledky testov z dvoch rozličných typov škôl (štátna a súkromná), môžete zistiť, či majú tieto školy rozdielny rozptyl výsledkov testov.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/ftest-function"
		}],
		functionParameter: {
			array1: {
				name: "pole1",
				detail: "Povinné. Prvé pole alebo rozsah údajov."
			},
			array2: {
				name: "pole2",
				detail: "Povinné. Druhé pole alebo rozsah údajov."
			}
		}
	},
	GAMMADIST: {
		description: "Vráti hodnotu distribučnej funkcie alebo hustoty rozdelenia gama. Táto funkcia sa používa napríklad na skúmanie premenných, ktoré môžu mať zošikmené rozdelenie. Rozdelenie gama sa obvykle používa na analýzu radov.",
		abstract: "Vráti hodnotu distribučnej funkcie alebo hustoty rozdelenia gama. Táto funkcia sa používa napríklad na skúmanie premenných, ktoré môžu mať zošikmené rozdelenie. Rozdelenie gama sa obvykle používa na analýzu radov.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/gammadist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Povinný argument. Hodnota, pre ktorú chcete zistiť hodnotu rozdelenia."
			},
			alpha: {
				name: "alfa",
				detail: "Povinné. Parameter rozdelenia."
			},
			beta: {
				name: "beta",
				detail: "Povinné. Parameter rozdelenia. Ak beta = 1, funkcia GAMMADIST vráti štandardné rozdelenie gama."
			},
			cumulative: {
				name: "kumulatívne",
				detail: "Povinné. Logická hodnota, ktorá určuje tvar funkcie. Ak má tento argument hodnotu TRUE, funkcia GAMMADIST vráti súčtovú distribučnú funkciu. Ak má hodnotu FALSE, vráti funkciu hustoty rozdelenia pravdepodobnosti."
			}
		}
	},
	GAMMAINV: {
		description: "Vráti inverznú funkciu ku (kumulatívnej) distribučnej funkcii rozdelenia gama. Ak p = GAMMADIST(x,...), potom GAMMAINV(p,...) = x. Táto funkcia sa používa na skúmanie premennej s možným asymetrickým (šikmým) rozdelením.",
		abstract: "Vráti inverznú funkciu ku (kumulatívnej) distribučnej funkcii rozdelenia gama. Ak p = GAMMADIST(x,...), potom GAMMAINV(p,...) = x. Táto funkcia sa používa na skúmanie premennej s možným asymetrickým (šikmým) rozdelením.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/gammainv-function"
		}],
		functionParameter: {
			probability: {
				name: "pravdepodobnosť",
				detail: "Povinné. Pravdepodobnosť spojená s rozdelením gama."
			},
			alpha: {
				name: "alfa",
				detail: "Povinné. Parameter rozdelenia."
			},
			beta: {
				name: "beta",
				detail: "Povinné. Parameter rozdelenia. Ak beta = 1, funkcia GAMMAINV vráti štandardné rozdelenie gama."
			}
		}
	},
	HYPGEOMDIST: {
		description: "Vráti hodnotu funkcie hypergeometrického rozdelenia. Funkcia HYPGEOMDIST vráti pravdepodobnosť, že bude práve daný počet úspešných pozorovaní vo vzorke, ak je daná veľkosť vzorky, počet úspešných pozorovaní v základnom súbore a veľkosť základného súboru. Funkcia HYPGEOMDIST sa používa pri problémoch týkajúcich sa konečného základného súboru, pričom môžu byť jednotlivé pozorovania úspešné alebo neúspešné a kde je pravdepodobnosť vybratia každej podmnožiny danej veľkosti rovnaká.",
		abstract: "Vráti hodnotu funkcie hypergeometrického rozdelenia. Funkcia HYPGEOMDIST vráti pravdepodobnosť, že bude práve daný počet úspešných pozorovaní vo vzorke, ak je daná veľkosť vzorky, počet úspešných pozorovaní v základnom súbore a veľkosť základného súboru. Funkcia HYPGEOMDIST sa používa pri problémoch týkajúcich sa konečného základného súboru, pričom môžu byť jednotlivé pozorovania úspešné alebo neúspešné a kde je pravdepodobnosť vybratia každej podmnožiny danej veľkosti rovnaká.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/hypgeomdist-function"
		}],
		functionParameter: {
			sampleS: {
				name: "úspechy_vzorka",
				detail: "Povinné. Počet úspešných pozorovaní v základnom súbore."
			},
			numberSample: {
				name: "veľkosť_vzorky",
				detail: "Povinné. Počet prvkov vo výberovom súbore."
			},
			populationS: {
				name: "úspechy_populácia",
				detail: "Povinné. Počet úspešných pozorovaní vo vzorke."
			},
			numberPop: {
				name: "veľkosť_populácie",
				detail: "Povinné. Počet prvkov základného súboru."
			}
		}
	},
	LOGINV: {
		description: "Vráti inverznú lognormálnu kumulatívnu distribučnú funkciu x, kde ln(x) má normálnu distribúciu s parametrami stredná_hodnota a smerodajná_odchýlka. Ak p = LOGNORMDIST(x;...), potom LOGINV(p;...) = x.",
		abstract: "Vráti inverznú lognormálnu kumulatívnu distribučnú funkciu x, kde ln(x) má normálnu distribúciu s parametrami stredná_hodnota a smerodajná_odchýlka. Ak p = LOGNORMDIST(x;...), potom LOGINV(p;...) = x.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/loginv-function"
		}],
		functionParameter: {
			probability: {
				name: "pravdepodobnosť",
				detail: "Povinné. Pravdepodobnosť spojená s lognormálnou distribúciou."
			},
			mean: {
				name: "priemer",
				detail: "Povinné. Stredná hodnota hodnôt ln(x)."
			},
			standardDev: {
				name: "štandardná_odchýlka",
				detail: "Povinné. Smerodajná odchýlka hodnôt ln(x)."
			}
		}
	},
	LOGNORMDIST: {
		description: "Vráti hodnotu distribučnej funkcie súčtového lognormálneho rozdelenia pre hodnotu x, kde ln(x) má normálne rozdelenie s parametrami stredná_hodnota a smerodajná_odchýlka. Táto funkcia sa používa na analýzu údajov, ktoré boli transformované logaritmickou funkciou.",
		abstract: "Vráti hodnotu distribučnej funkcie súčtového lognormálneho rozdelenia pre hodnotu x, kde ln(x) má normálne rozdelenie s parametrami stredná_hodnota a smerodajná_odchýlka. Táto funkcia sa používa na analýzu údajov, ktoré boli transformované logaritmickou funkciou.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/lognormdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Povinný argument. Hodnota, pre ktorú chcete funkciu vyhodnotiť."
			},
			mean: {
				name: "priemer",
				detail: "Povinné. Stredná hodnota hodnôt ln(x)."
			},
			standardDev: {
				name: "štandardná_odchýlka",
				detail: "Povinné. Smerodajná odchýlka hodnôt ln(x)."
			}
		}
	},
	MODE: {
		description: "Povedzme, že chcete zistiť najbežnejší počet druhov vtákov pozorovaných vo vzorke počtov vtákov v kritickej mokradi, za 30 rokov, alebo chcete zistiť najčastejšie sa vyskytujúci počet telefonických hovorov v centre telefonickej podpory mimo špičky. Ak chcete vypočítať modus skupiny čísel, použite funkciu MODE .",
		abstract: "Povedzme, že chcete zistiť najbežnejší počet druhov vtákov pozorovaných vo vzorke počtov vtákov v kritickej mokradi, za 30 rokov, alebo chcete zistiť najčastejšie sa vyskytujúci počet telefonických hovorov v centre telefonickej podpory mimo špičky. Ak chcete vypočítať modus skupiny čísel, použite funkciu MODE .",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/mode-function"
		}],
		functionParameter: {
			number1: {
				name: "číslo1",
				detail: "Povinné. Prvý číselný argument, pre ktorý chcete vypočítať modus."
			},
			number2: {
				name: "číslo2",
				detail: "Voliteľný argument. 2 až 255 číselných argumentov, pre ktoré chcete vypočítať modus. Namiesto argumentov oddelených čiarkami môžete použiť jedno pole alebo odkaz na pole."
			}
		}
	},
	NEGBINOMDIST: {
		description: "Vráti hodnotu funkcie záporného binomického rozdelenia. Funkcia NEGBINOMDIST vráti pravdepodobnosť toho, že dôjde k číslo_f neúspechom, kým nastane číslo_s úspechov pri konštantnej pravdepodobnosti úspechu vyjadrenej hodnotou pravdepodobnosť_úspechu. Táto funkcia má podobný tvar aj význam ako binomické rozdelenie, s tým rozdielom, že počet úspešných pozorovaní je pevný a počet pokusov premenlivý. Podobne ako pri binomickom rozdelení, jednotlivé pokusy sa považujú za nezávislé.",
		abstract: "Vráti hodnotu funkcie záporného binomického rozdelenia. Funkcia NEGBINOMDIST vráti pravdepodobnosť toho, že dôjde k číslo_f neúspechom, kým nastane číslo_s úspechov pri konštantnej pravdepodobnosti úspechu vyjadrenej hodnotou pravdepodobnosť_úspechu. Táto funkcia má podobný tvar aj význam ako binomické rozdelenie, s tým rozdielom, že počet úspešných pozorovaní je pevný a počet pokusov premenlivý. Podobne ako pri binomickom rozdelení, jednotlivé pokusy sa považujú za nezávislé.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/negbinomdist-function"
		}],
		functionParameter: {
			numberF: {
				name: "počet_neúspechov",
				detail: "Povinné. Počet neúspešných pokusov."
			},
			numberS: {
				name: "počet_uspechov",
				detail: "Povinné. Prahová hodnota počtu úspešných pokusov."
			},
			probabilityS: {
				name: "pravdepodobnosť_uspechu",
				detail: "Povinné. Pravdepodobnosť úspechu."
			}
		}
	},
	NORMDIST: {
		description: "Funkcia NORMDIST vráti hodnotu distribučnej funkcie alebo hustoty normálneho rozdelenia pre zadanú strednú hodnotu a smerodajnú odchýlku. Táto funkcia má v štatistike široké použitie, vrátane testovania hypotéz.",
		abstract: "Funkcia NORMDIST vráti hodnotu distribučnej funkcie alebo hustoty normálneho rozdelenia pre zadanú strednú hodnotu a smerodajnú odchýlku. Táto funkcia má v štatistike široké použitie, vrátane testovania hypotéz.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/normdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Povinný argument. Hodnota, pre ktorú chcete vypočítať rozdelenie."
			},
			mean: {
				name: "priemer",
				detail: "Povinné. Aritmetický priemer rozdelenia"
			},
			standardDev: {
				name: "štandardná_odchýlka",
				detail: "Povinné. Smerodajná odchýlka rozdelenia"
			},
			cumulative: {
				name: "kumulatívne",
				detail: "Povinné. Logická hodnota, ktorá určuje tvar funkcie. Ak má tento argument hodnotu TRUE, funkcia NORMDIST vráti súčtovú distribučnú funkciu. ak má argument kumulatívne hodnotu FALSE, vráti hustotu rozdelenia pravdepodobnosti."
			}
		}
	},
	NORMINV: {
		description: "Vráti inverznú funkciu k distribučnej funkcii normálneho rozdelenia pre zadanú strednú hodnotu a smerodajnú odchýlku.",
		abstract: "Vráti inverznú funkciu k distribučnej funkcii normálneho rozdelenia pre zadanú strednú hodnotu a smerodajnú odchýlku.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/norminv-function"
		}],
		functionParameter: {
			probability: {
				name: "pravdepodobnosť",
				detail: "Povinné. Pravdepodobnosť zodpovedajúca normálnemu rozdeleniu."
			},
			mean: {
				name: "priemer",
				detail: "Povinné. Aritmetický priemer rozdelenia."
			},
			standardDev: {
				name: "štandardná_odchýlka",
				detail: "Povinné. Smerodajná odchýlka rozdelenia."
			}
		}
	},
	NORMSDIST: {
		description: "Vráti hodnotu distribučnej funkcie štandardného normálneho rozdelenia. Toto rozdelenie má strednú hodnotu 0 a smerodajnú odchýlku 1. Táto funkcia sa používa miesto tabuľky pre výpočet integrálu pod krivkou štandardného normálneho rozdelenia.",
		abstract: "Vráti hodnotu distribučnej funkcie štandardného normálneho rozdelenia. Toto rozdelenie má strednú hodnotu 0 a smerodajnú odchýlku 1. Táto funkcia sa používa miesto tabuľky pre výpočet integrálu pod krivkou štandardného normálneho rozdelenia.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/normsdist-function"
		}],
		functionParameter: { z: {
			name: "z",
			detail: "Povinný argument. Hodnota, pre ktorú chcete vypočítať rozdelenie."
		} }
	},
	NORMSINV: {
		description: "Vráti inverznú funkciu k distribučnej funkcii štandardného normálneho rozdelenia. Toto rozdelenie má strednú hodnotu 0 a smerodajnú odchýlku 1.",
		abstract: "Vráti inverznú funkciu k distribučnej funkcii štandardného normálneho rozdelenia. Toto rozdelenie má strednú hodnotu 0 a smerodajnú odchýlku 1.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/normsinv-function"
		}],
		functionParameter: { probability: {
			name: "pravdepodobnosť",
			detail: "Povinné. Pravdepodobnosť zodpovedajúca normálnemu rozdeleniu."
		} }
	},
	PERCENTILE: {
		description: "Vráti K-ty percentil v rozsahu hodnôt. Táto funkcia sa používa na stanovenie prahových hodnôt. Umožňuje napríklad preskúmať kandidátov, ktorí dosiahli aspoň 90-ty percentil.",
		abstract: "Vráti K-ty percentil v rozsahu hodnôt. Táto funkcia sa používa na stanovenie prahových hodnôt. Umožňuje napríklad preskúmať kandidátov, ktorí dosiahli aspoň 90-ty percentil.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/percentile-function"
		}],
		functionParameter: {
			array: {
				name: "pole",
				detail: "Povinné. Pole alebo rozsah údajov, ktoré určujú relatívne umiestnenie."
			},
			k: {
				name: "k",
				detail: "Povinný argument. Hodnota percentilu z uzavretého intervalu 0..1."
			}
		}
	},
	PERCENTRANK: {
		description: "Funkcia PERCENTRANK vráti poradie hodnoty v množine údajov, vyjadrené percentuálnou časťou množiny údajov – v podstate ide o relatívne umiestnenie hodnoty v rámci celej množiny údajov. Funkciu PERCENTRANK môžete použiť napríklad na určenie poradia výsledkov testu jednotlivca v poli všetkých výsledkov toho istého testu.",
		abstract: "Funkcia PERCENTRANK vráti poradie hodnoty v množine údajov, vyjadrené percentuálnou časťou množiny údajov – v podstate ide o relatívne umiestnenie hodnoty v rámci celej množiny údajov. Funkciu PERCENTRANK môžete použiť napríklad na určenie poradia výsledkov testu jednotlivca v poli všetkých výsledkov toho istého testu.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/percentrank-function"
		}],
		functionParameter: {
			array: {
				name: "pole",
				detail: "Povinné. Rozsah údajov (alebo preddefinované pole) číselných hodnôt, v ktorých sa určuje percentuálne poradie."
			},
			x: {
				name: "x",
				detail: "Povinný argument. Hodnota, ktorej poradie v rámci poľa chcete zistiť."
			},
			significance: {
				name: "významnosť",
				detail: "Voliteľný argument. Hodnota určujúca počet desatinných miest, na ktoré bude vracaná hodnota zaokrúhlená. Ak túto hodnotu nezadáte, funkcia PERCENTRANK použije 3 desatinné miesta (0,xxx)."
			}
		}
	},
	POISSON: {
		description: "Vráti hodnoty Poissonovho rozdelenia. Poissonovo rozdelenie sa obvykle používa na určenie pravdepodobného počtu prípadov za jednotku času, ako napríklad počet automobilov prichádzajúcich na colnicu za jednu minútu.",
		abstract: "Vráti hodnoty Poissonovho rozdelenia. Poissonovo rozdelenie sa obvykle používa na určenie pravdepodobného počtu prípadov za jednotku času, ako napríklad počet automobilov prichádzajúcich na colnicu za jednu minútu.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/poisson-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Povinný argument. Počet prípadov."
			},
			mean: {
				name: "priemer",
				detail: "Povinné. Očakávaná číselná hodnota."
			},
			cumulative: {
				name: "kumulatívne",
				detail: "Povinné. Logická hodnota určujúca formu vráteného rozdelenia pravdepodobnosti. Ak má tento argument hodnotu TRUE, vráti funkcia POISSON distribučnú funkciu Poissonovho rozdelenia pravdepodobnosti s tým, že počet náhodných prípadov bude v intervale nula až x. Ak má argument hodnotu FALSE, vráti sa pravdepodobnostná funkcia Poissonovho rozdelenia tak, že počet prípadov bude práve x."
			}
		}
	},
	QUARTILE: {
		description: "Vráti kvartil množiny údajov. Kvartily sa často používajú pri spracovaní údajov o predaji alebo prieskume na rozdelenie populácie do skupín. Funkciu QUARTILE môžete napríklad použiť na vyhľadanie najvyšších 25 percent príjmu v populácii.",
		abstract: "Vráti kvartil množiny údajov. Kvartily sa často používajú pri spracovaní údajov o predaji alebo prieskume na rozdelenie populácie do skupín. Funkciu QUARTILE môžete napríklad použiť na vyhľadanie najvyšších 25 percent príjmu v populácii.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/quartile-function"
		}],
		functionParameter: {
			array: {
				name: "pole",
				detail: "Povinné. Pole alebo rozsah buniek obsahujúcich číselné hodnoty, z ktorých chcete kvartil vypočítať."
			},
			quart: {
				name: "kvartil",
				detail: "Povinné. Určuje vrátenú hodnotu."
			}
		}
	},
	RANK: {
		description: "Vráti relatívnu veľkosť čísla v zozname čísel. Relatívna veľkosť čísla je jeho veľkosť v porovnaní s ostatnými hodnotami v zozname. (Ak by ste zoznam zoradili, umiestnenie čísla by bola jeho relatívna veľkosť).",
		abstract: "Vráti relatívnu veľkosť čísla v zozname čísel. Relatívna veľkosť čísla je jeho veľkosť v porovnaní s ostatnými hodnotami v zozname. (Ak by ste zoznam zoradili, umiestnenie čísla by bola jeho relatívna veľkosť).",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/rank-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Povinné. Číslo, ktorého relatívnu veľkosť chcete nájsť."
			},
			ref: {
				name: "odkaz",
				detail: "Povinné. Odkaz na zoznam čísel. Hodnoty, ktoré nie sú čísla, sú v parametri odkaz ignorované."
			},
			order: {
				name: "poradie",
				detail: "Voliteľný argument. Číslo určujúce spôsob zisťovania relatívnej veľkosti čísla. Ak je parameter poradie 0 (nula) alebo vynechaný, program Microsoft Excel určí relatívnu veľkosť čísla, ako keby bol zoznam v parametri odkaz zoradený zostupne. Ak má parameter poradie nenulovú hodnotu, program Microsoft Excel určí relatívnu veľkosť čísla, ako keby bol zoznam v parametri odkaz zoradený vzostupne."
			}
		}
	},
	STDEV: {
		description: "Odhadne smerodajnú odchýlku podľa výberového súboru. Smerodajná odchýlka vyjadruje, ako sa hodnoty líšia od priemernej hodnoty (strednej hodnoty).",
		abstract: "Odhadne smerodajnú odchýlku podľa výberového súboru. Smerodajná odchýlka vyjadruje, ako sa hodnoty líšia od priemernej hodnoty (strednej hodnoty).",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/stdev-function"
		}],
		functionParameter: {
			number1: {
				name: "číslo1",
				detail: "Povinné. Číselný argument 1 zodpovedajúci výberovému súboru."
			},
			number2: {
				name: "číslo2",
				detail: "Voliteľný argument. Číselné argumenty 2 až 255 zodpovedajúce výberovému súboru. Namiesto argumentov oddelených bodkočiarkami môžete použiť jedno pole alebo odkaz na pole."
			}
		}
	},
	STDEVP: {
		description: "Vypočíta smerodajnú odchýlku základného súboru, ktorý bol zadaný ako argument. Smerodajná odchýlka vyjadruje, ako sa hodnoty odlišujú od priemeru (strednej hodnoty).",
		abstract: "Vypočíta smerodajnú odchýlku základného súboru, ktorý bol zadaný ako argument. Smerodajná odchýlka vyjadruje, ako sa hodnoty odlišujú od priemeru (strednej hodnoty).",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/stdevp-function"
		}],
		functionParameter: {
			number1: {
				name: "číslo1",
				detail: "Povinné. Číselný argument 1 zodpovedajúci základnému súboru."
			},
			number2: {
				name: "číslo2",
				detail: "Voliteľný argument. Číselné argumenty 2 až 255 zodpovedajúce základnému súboru. Namiesto argumentov oddelených bodkočiarkami môžete použiť jedno pole alebo odkaz na pole."
			}
		}
	},
	TDIST: {
		description: "Vracia hladinu významnosti (pravdepodobnosť) pre funkciu Studentovho t-rozdelenia, kde x je vypočítaná číselná hodnota parametra t, pre ktorú sa zisťuje hladina významnosti. T-rozdelenie sa používa pri testovaní hypotéz o malých vzorkách údajov. Funkcia sa používa namiesto tabuľky kritických hodnôt t-rozdelenia.",
		abstract: "Vracia hladinu významnosti (pravdepodobnosť) pre funkciu Studentovho t-rozdelenia, kde x je vypočítaná číselná hodnota parametra t, pre ktorú sa zisťuje hladina významnosti. T-rozdelenie sa používa pri testovaní hypotéz o malých vzorkách údajov. Funkcia sa používa namiesto tabuľky kritických hodnôt t-rozdelenia.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/tdist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Povinný argument. Číselná hodnota, pre ktorú sa zisťuje hodnota rozdelenia."
			},
			degFreedom: {
				name: "stupne_voľnosti",
				detail: "Povinné. Celé číslo určujúce počet stupňov voľnosti."
			},
			tails: {
				name: "chvosty",
				detail: "Povinné. Určuje, či ide o jednostranné alebo obojstranné rozdelenie. Ak strany = 1, funkcia TDIST vracia jednostranné rozdelenie. Ak strany = 2, funkcia TDIST vracia obojstranné rozdelenie."
			}
		}
	},
	TINV: {
		description: "Vráti obojstranné inverzné Studentovo t-rozdelenie.",
		abstract: "Vráti obojstranné inverzné Studentovo t-rozdelenie.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/tinv-function"
		}],
		functionParameter: {
			probability: {
				name: "pravdepodobnosť",
				detail: "Povinné. Pravdepodobnosť spojená s obojstranným Studentovým t-rozdelením."
			},
			degFreedom: {
				name: "stupne_voľnosti",
				detail: "Povinné. Počet stupňov voľnosti, ktorými je možné rozdelenie charakterizovať."
			}
		}
	},
	TTEST: {
		description: "Vráti pravdepodobnosť súvisiacu so Studentovým t-testom. Funkcia TTEST sa používa na určenie pravdepodobnosti pôvodu dvoch vzoriek z dvoch základných súborov s rovnakou priemernou hodnotou.",
		abstract: "Vráti pravdepodobnosť súvisiacu so Studentovým t-testom. Funkcia TTEST sa používa na určenie pravdepodobnosti pôvodu dvoch vzoriek z dvoch základných súborov s rovnakou priemernou hodnotou.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/ttest-function"
		}],
		functionParameter: {
			array1: {
				name: "pole1",
				detail: "Povinné. Prvá množina údajov."
			},
			array2: {
				name: "pole2",
				detail: "Povinné. Druhá množina údajov."
			},
			tails: {
				name: "chvosty",
				detail: "Povinné. Určuje, či ide o jednostranné alebo obojstranné rozdelenie. Ak strany = 1, funkcia TTEST vracia jednostranné rozdelenie. Ak strany = 2, funkcia TTEST vracia obojstranné rozdelenie."
			},
			type: {
				name: "typ",
				detail: "Povinné. Druh vykonaného t-testu."
			}
		}
	},
	VAR: {
		description: "Odhadne rozptyl na základe vzorky.",
		abstract: "Odhadne rozptyl na základe vzorky.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/var-function"
		}],
		functionParameter: {
			number1: {
				name: "číslo1",
				detail: "Povinné. Číselný argument 1 zodpovedajúci výberovému súboru."
			},
			number2: {
				name: "číslo2",
				detail: "Voliteľný argument. Číselné argumenty 2 až 255 zodpovedajúce výberovému súboru."
			}
		}
	},
	VARP: {
		description: "Vypočíta rozptyl na základe celého základného súboru.",
		abstract: "Vypočíta rozptyl na základe celého základného súboru.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/varp-function"
		}],
		functionParameter: {
			number1: {
				name: "číslo1",
				detail: "Povinné. Číselný argument 1 zodpovedajúci základnému súboru."
			},
			number2: {
				name: "číslo2",
				detail: "Voliteľný argument. Číselné argumenty 2 až 255 zodpovedajúce základnému súboru."
			}
		}
	},
	WEIBULL: {
		description: "Vráti hodnotu Weibullovho rozdelenia. Toto rozdelenie sa používa na analýzu spoľahlivosti, ako je napríklad výpočet stredného času medzi poruchami prístroja.",
		abstract: "Vráti hodnotu Weibullovho rozdelenia. Toto rozdelenie sa používa na analýzu spoľahlivosti, ako je napríklad výpočet stredného času medzi poruchami prístroja.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/weibull-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Povinný argument. Hodnota, pre ktorú chcete funkciu vyhodnotiť."
			},
			alpha: {
				name: "alfa",
				detail: "Povinné. Parameter rozdelenia."
			},
			beta: {
				name: "beta",
				detail: "Povinné. Parameter rozdelenia."
			},
			cumulative: {
				name: "kumulatívne",
				detail: "Povinné. Určuje tvar funkcie."
			}
		}
	},
	ZTEST: {
		description: "Vráti jednostrannú hodnotu pravdepodobnosti z-testu. Pre danú predpokladanú strednú hodnotu základného súboru μ0 funkcia ZTEST vráti pravdepodobnosť, s akou bude stredná hodnota vzorky väčšia ako priemerná hodnota pozorovaní v množine údajov (poli) — teda ako zistená stredná hodnota vzorky.",
		abstract: "Vráti jednostrannú hodnotu pravdepodobnosti z-testu. Pre danú predpokladanú strednú hodnotu základného súboru μ0 funkcia ZTEST vráti pravdepodobnosť, s akou bude stredná hodnota vzorky väčšia ako priemerná hodnota pozorovaní v množine údajov (poli) — teda ako zistená stredná hodnota vzorky.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/ztest-function"
		}],
		functionParameter: {
			array: {
				name: "pole",
				detail: "Povinné. Pole alebo rozsah údajov, vzhľadom na ktoré sa bude testovať hodnota x."
			},
			x: {
				name: "x",
				detail: "Povinný argument. Testovaná hodnota."
			},
			sigma: {
				name: "sigma",
				detail: "Voliteľný argument. Smerodajná odchýlka (známa) základného súboru. Ak sa vynechá, použije sa smerodajná odchýlka vzorky."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/cube/sk-SK.ts
const locale$13 = {
	CUBEKPIMEMBER: {
		description: "Vráti vlastnosť kľúčového indikátora výkonu (KPI) a v bunke zobrazí názov KPI. Kľúčový indikátor výkonu (KPI) je kvantitatívna miera, ako napríklad hrubý mesačný zisk alebo štvrťročná fluktuácia zamestnancov, ktoré sa používajú na sledovanie výkonu organizácie.",
		abstract: "Vráti vlastnosť kľúčového indikátora výkonu (KPI) a v bunke zobrazí názov KPI. Kľúčový indikátor výkonu (KPI) je kvantitatívna miera, ako napríklad hrubý mesačný zisk alebo štvrťročná fluktuácia zamestnancov, ktoré sa používajú na sledovanie výkonu organizácie.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/cubekpimember-function"
		}],
		functionParameter: {
			connection: {
				name: "Pripojenie",
				detail: "Povinné. Predstavuje textový reťazec názvu pripojenia ku kocke."
			},
			kpiName: {
				name: "Kpi_name",
				detail: "Povinné. Predstavuje textový reťazec názvu indikátora KPI v kocke."
			},
			kpiProperty: {
				name: "Kpi_property",
				detail: "Povinné. Predstavuje vrátený komponent indikátora KPI a môže byť jedným z nasledovných:"
			},
			caption: {
				name: "Titulky",
				detail: "Voliteľný argument. Predstavuje alternatívny textový reťazec, ktorý sa zobrazí v bunke namiesto argumentov názov_kuv a vlastnosť_kuv."
			}
		}
	},
	CUBEMEMBER: {
		description: "Vráti člen alebo n-ticu kocky. Používa sa na overenie existencie člena alebo n-tice v kocke.",
		abstract: "Vráti člen alebo n-ticu kocky. Používa sa na overenie existencie člena alebo n-tice v kocke.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/cubemember-function"
		}],
		functionParameter: {
			connection: {
				name: "Pripojenie",
				detail: "Povinné. Predstavuje textový reťazec názvu pripojenia ku kocke."
			},
			memberExpression: {
				name: "Member_expression",
				detail: "Povinné. Predstavuje textový reťazec multidimenzionálneho výrazu (MDX), ktorý sa vyhodnocuje ako jedinečný člen v kocke. Argument členský_výraz môže byť n-tica určená ako rozsah buniek alebo pole konštánt."
			},
			caption: {
				name: "Titulky",
				detail: "Voliteľný argument. Predstavuje textový reťazec, ktorý sa zobrazí v bunke namiesto nadpisu (ak je definovaný) z kocky. Ak je vrátená n-tica, použije sa nadpis posledného člena n-tice."
			}
		}
	},
	CUBEMEMBERPROPERTY: {
		description: "Funkcia CUBEMEMBERPROPERTY , jedna z funkcií kocky v Exceli, vráti hodnotu vlastnosti člena kocky. Používa sa na overenie existencie názvu člena kocky a vráti určitú vlastnosť tohto člena.",
		abstract: "Funkcia CUBEMEMBERPROPERTY , jedna z funkcií kocky v Exceli, vráti hodnotu vlastnosti člena kocky. Používa sa na overenie existencie názvu člena kocky a vráti určitú vlastnosť tohto člena.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/cubememberproperty-function"
		}],
		functionParameter: {
			connection: {
				name: "Pripojenie",
				detail: "Povinné. Predstavuje textový reťazec názvu pripojenia ku kocke."
			},
			memberExpression: {
				name: "Member_expression",
				detail: "Povinné. Predstavuje textový reťazec multidimenzionálneho výrazu (MDX) člena kocky."
			},
			property: {
				name: "Vlastnosť",
				detail: "Povinné. Predstavuje textový reťazec názvu vrátenej vlastnosti alebo referenciu na bunku obsahujúcu názov vlastnosti."
			}
		}
	},
	CUBERANKEDMEMBER: {
		description: "Vráti n-tého alebo zoradeného člena množiny. Používa sa na vrátenie jedného alebo viacerých prvkov množiny, ako napríklad najpredávanejšieho interpreta alebo 10 najlepších študentov.",
		abstract: "Vráti n-tého alebo zoradeného člena množiny. Používa sa na vrátenie jedného alebo viacerých prvkov množiny, ako napríklad najpredávanejšieho interpreta alebo 10 najlepších študentov.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/cuberankedmember-function"
		}],
		functionParameter: {
			connection: {
				name: "Pripojenie",
				detail: "Povinné. Predstavuje textový reťazec názvu pripojenia ku kocke."
			},
			setExpression: {
				name: "Set_expression",
				detail: "Povinné. Predstavuje textový reťazec výrazu množiny, ako napríklad \"{[Položka1].children}\". Argumentom výraz_množiny môže byť aj funkcia CUBESET alebo odkaz na bunku obsahujúcu funkciu CUBESET."
			},
			rank: {
				name: "Pozícia",
				detail: "Povinné. Predstavuje celočíselnú hodnotu určujúcu, ktorá najvyššia hodnota sa má vrátiť. Ak má argument poradie hodnotu 1, vráti sa najvyššia hodnota, ak má argument poradie hodnotu 2, vráti sa druhá najvyššia hodnota, atď. Ak chcete vrátiť prvých 5 hodnôt, použite funkciu CUBERANKEDMEMBER päťkrát a zakaždým určite odlišný argument poradie, od 1 po 5."
			},
			caption: {
				name: "Titulky",
				detail: "Voliteľný argument. Predstavuje textový reťazec, ktorý sa zobrazí v bunke namiesto nadpisu (ak je definovaný) z kocky."
			}
		}
	},
	CUBESET: {
		description: "Definuje vypočítavanú množinu členov alebo n-tíc odoslaním výrazu pre množinu do kocky na serveri, ktorý vytvára množinu, a potom ju odošle programu Microsoft Excel.",
		abstract: "Definuje vypočítavanú množinu členov alebo n-tíc odoslaním výrazu pre množinu do kocky na serveri, ktorý vytvára množinu, a potom ju odošle programu Microsoft Excel.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/cubeset-function"
		}],
		functionParameter: {
			connection: {
				name: "Pripojenie",
				detail: "Povinné. Predstavuje textový reťazec názvu pripojenia ku kocke."
			},
			setExpression: {
				name: "Set_expression",
				detail: "Povinné. Predstavuje textový reťazec výrazu množiny, ktorého výsledkom je množina členov alebo n-tíc. Argumentom výraz_množiny môže byť aj odkaz na rozsah buniek programu Excel obsahujúci jeden alebo viacero členov, n-tíc alebo množín obsiahnutých v množine."
			},
			caption: {
				name: "Titulky",
				detail: "Voliteľný argument. Predstavuje textový reťazec, ktorý sa zobrazí v bunke namiesto nadpisu (ak je definovaný) z kocky."
			},
			sortOrder: {
				name: "Sort_order",
				detail: "Voliteľný argument. Predstavuje druh radenia, aké sa v prípade jeho zadania vykoná, pričom môže byť jedným z nasledovných:"
			},
			sortBy: {
				name: "Sort_by",
				detail: "Voliteľný argument. Predstavuje textový reťazec hodnoty, podľa ktorej sa má zoraďovať. Ak napríklad chcete získať mesto s najvyšším predajom, set_expression by predstavovala množina miest a sort_by bola miera predaja. Ak by sme chceli získať mesto s najvyššou populáciou, set_expression by išlo o množinu miest a sort_by by bola miera počtu obyvateľov. Ak sort_order vyžaduje sort_by a sort_by nie je zadaná, funkcia CUBESET vráti #VALUE! chybové hlásenie."
			}
		}
	},
	CUBESETCOUNT: {
		description: "Vráti počet položiek v množine.",
		abstract: "Vráti počet položiek v množine.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/cubesetcount-function"
		}],
		functionParameter: { set: {
			name: "Nastaviť",
			detail: "Povinné. Predstavuje textový reťazec výrazu programu Microsoft Excel, ktorý nadobúda hodnotu množiny definovanej funkciou CUBESET. Argumentom množina môže byť aj funkcia CUBESET alebo odkaz na bunku obsahujúcu funkciu CUBESET."
		} }
	},
	CUBEVALUE: {
		description: "Vráti súhrnnú hodnotu kocky.",
		abstract: "Vráti súhrnnú hodnotu kocky.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/cubevalue-function"
		}],
		functionParameter: {
			connection: {
				name: "Pripojenie",
				detail: "Povinné. Predstavuje textový reťazec názvu pripojenia ku kocke."
			},
			memberExpression: {
				name: "Member_expression",
				detail: "Voliteľný argument. Predstavuje textový reťazec multidimenzionálneho výrazu (MDX), ktorý sa vyhodnocuje ako jedinečný člen alebo n-tica v kocke. Argumentom členský_výraz môže byť aj množina definovaná funkciou CUBESET. Argument členský_výraz používajte ako rozdeľovač, ktorým definujete časť kocky, ktorej agregátnu hodnotu chcete vrátiť. Ak argument členský_výraz neurčuje žiadnu mieru, použije sa predvolená miera kocky."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/database/sk-SK.ts
const locale$12 = {
	DAVERAGE: {
		description: "Vypočíta priemer tých hodnôt poľa (stĺpca) zoznamu alebo databázy, ktoré spĺňajú zadané kritériá.",
		abstract: "Vypočíta priemer tých hodnôt poľa (stĺpca) zoznamu alebo databázy, ktoré spĺňajú zadané kritériá.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/daverage-function"
		}],
		functionParameter: {
			database: {
				name: "databáza",
				detail: "je rozsah buniek tvoriacich zoznam alebo databázu. Databáza je zoznam súvisiacich údajov, v ktorom riadky so súvisiacimi informáciami predstavujú záznamy a stĺpce s údajmi predstavujú polia. Prvý riadok zoznamu obsahuje označenia jednotlivých stĺpcov."
			},
			field: {
				name: "pole",
				detail: "označuje, ktorý stĺpec funkcia používa. Zadajte názov stĺpca ako text v úvodzovkách, napríklad \"Vek\" alebo \"Výnos\", alebo ako číslo označujúce pozíciu stĺpca v zozname: 1 pre prvý stĺpec, 2 pre druhý stĺpec, a tak ďalej."
			},
			criteria: {
				name: "kritériá",
				detail: "je rozsah buniek, ktorý obsahuje zadané podmienky. Pre argument kritériá môžete použiť ľubovoľný rozsah, ak obsahuje aspoň jedno označenie stĺpca a aspoň jednu bunku pod týmto označením, ktorá určuje podmienku pre stĺpec."
			}
		}
	},
	DCOUNT: {
		description: "Spočíta bunky obsahujúce čísla v poli (stĺpci) zoznamu alebo databázy, ktoré spĺňajú zadané kritériá.",
		abstract: "Spočíta bunky obsahujúce čísla v poli (stĺpci) zoznamu alebo databázy, ktoré spĺňajú zadané kritériá.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/dcount-function"
		}],
		functionParameter: {
			database: {
				name: "databáza",
				detail: "Povinné. Rozsah buniek tvoriacich zoznam alebo databázu. Databáza je zoznam súvisiacich údajov, v ktorom riadky so súvisiacimi informáciami predstavujú záznamy a stĺpce s údajmi predstavujú polia. Prvý riadok zoznamu obsahuje označenia jednotlivých stĺpcov."
			},
			field: {
				name: "pole",
				detail: "Povinné. Označuje, ktorý stĺpec funkcia používa. Zadajte názov stĺpca ako text v úvodzovkách, napríklad \"Vek\" alebo \"Výnos\", alebo ako číslo označujúce pozíciu stĺpca v zozname: 1 pre prvý stĺpec, 2 pre druhý stĺpec, a tak ďalej."
			},
			criteria: {
				name: "kritériá",
				detail: "Povinné. Rozsah buniek, ktorý obsahuje dané podmienky. Pre argument kritériá môžete použiť ľubovoľný rozsah, ak argument obsahuje aspoň jedno označenie stĺpca a aspoň jednu bunku pod týmto označením, ktorá určuje podmienku pre stĺpec."
			}
		}
	},
	DCOUNTA: {
		description: "Vráti počet buniek v poli (stĺpci) zoznamu alebo databázy, ktoré spĺňajú zadané kritériá.",
		abstract: "Vráti počet buniek v poli (stĺpci) zoznamu alebo databázy, ktoré spĺňajú zadané kritériá.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/dcounta-function"
		}],
		functionParameter: {
			database: {
				name: "databáza",
				detail: "Povinné. Rozsah buniek tvoriacich zoznam alebo databázu. Databáza je zoznam súvisiacich údajov, v ktorom riadky so súvisiacimi informáciami predstavujú záznamy a stĺpce s údajmi predstavujú polia. Prvý riadok zoznamu obsahuje označenia jednotlivých stĺpcov."
			},
			field: {
				name: "pole",
				detail: "Voliteľný argument. Označuje, ktorý stĺpec funkcia používa. Zadajte názov stĺpca ako text v úvodzovkách, napríklad \"Vek\" alebo \"Výnos\", alebo ako číslo označujúce pozíciu stĺpca v zozname: 1 pre prvý stĺpec, 2 pre druhý stĺpec, a tak ďalej."
			},
			criteria: {
				name: "kritériá",
				detail: "Povinné. Rozsah buniek, ktorý obsahuje dané podmienky. Pre argument kritériá môžete použiť ľubovoľný rozsah, ak obsahuje aspoň jedno označenie stĺpca a aspoň jednu bunku pod týmto označením, ktorá určuje podmienku pre stĺpec."
			}
		}
	},
	DGET: {
		description: "Zo stĺpca zoznamu alebo z databázy vyberie jednu hodnotu, ktorá spĺňa zadané kritériá.",
		abstract: "Zo stĺpca zoznamu alebo z databázy vyberie jednu hodnotu, ktorá spĺňa zadané kritériá.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/dget-function"
		}],
		functionParameter: {
			database: {
				name: "databáza",
				detail: "Povinné. Rozsah buniek tvoriacich zoznam alebo databázu. Databáza je zoznam súvisiacich údajov, v ktorom riadky so súvisiacimi informáciami predstavujú záznamy a stĺpce s údajmi predstavujú polia. Prvý riadok zoznamu obsahuje označenia jednotlivých stĺpcov."
			},
			field: {
				name: "pole",
				detail: "Povinné. Označuje, ktorý stĺpec funkcia používa. Zadajte názov stĺpca ako text v úvodzovkách, napríklad \"Vek\" alebo \"Výnos\", alebo ako číslo označujúce pozíciu stĺpca v zozname: 1 pre prvý stĺpec, 2 pre druhý stĺpec, a tak ďalej."
			},
			criteria: {
				name: "kritériá",
				detail: "Povinné. Rozsah buniek, ktorý obsahuje dané podmienky. Pre argument kritériá môžete použiť ľubovoľný rozsah, ak obsahuje aspoň jedno označenie stĺpca a aspoň jednu bunku pod týmto označením, ktorá určuje podmienku pre stĺpec."
			}
		}
	},
	DMAX: {
		description: "Vráti maximálnu hodnotu v poli (stĺpci) zoznamu alebo databázy, ktorá spĺňa zadané kritériá.",
		abstract: "Vráti maximálnu hodnotu v poli (stĺpci) zoznamu alebo databázy, ktorá spĺňa zadané kritériá.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/dmax-function"
		}],
		functionParameter: {
			database: {
				name: "databáza",
				detail: "Povinné. Rozsah buniek tvoriacich zoznam alebo databázu. Databáza je zoznam súvisiacich údajov, v ktorom riadky so súvisiacimi informáciami predstavujú záznamy a stĺpce s údajmi predstavujú polia. Prvý riadok zoznamu obsahuje označenia jednotlivých stĺpcov."
			},
			field: {
				name: "pole",
				detail: "Povinné. Označuje, ktorý stĺpec funkcia používa. Zadajte názov stĺpca ako text v úvodzovkách, napríklad \"Vek\" alebo \"Výnos\", alebo ako číslo označujúce pozíciu stĺpca v zozname: 1 pre prvý stĺpec, 2 pre druhý stĺpec, a tak ďalej."
			},
			criteria: {
				name: "kritériá",
				detail: "Povinné. Rozsah buniek, ktorý obsahuje dané podmienky. Pre argument kritériá môžete použiť ľubovoľný rozsah, ak obsahuje aspoň jedno označenie stĺpca a aspoň jednu bunku pod týmto označením, ktorá určuje podmienku pre stĺpec."
			}
		}
	},
	DMIN: {
		description: "Vráti minimálnu hodnotu v poli (stĺpci) zoznamu alebo databázy, ktorá spĺňa zadané kritériá.",
		abstract: "Vráti minimálnu hodnotu v poli (stĺpci) zoznamu alebo databázy, ktorá spĺňa zadané kritériá.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/dmin-function"
		}],
		functionParameter: {
			database: {
				name: "databáza",
				detail: "Povinné. Rozsah buniek tvoriacich zoznam alebo databázu. Databáza je zoznam súvisiacich údajov, v ktorom riadky so súvisiacimi informáciami predstavujú záznamy a stĺpce s údajmi predstavujú polia. Prvý riadok zoznamu obsahuje označenia jednotlivých stĺpcov."
			},
			field: {
				name: "pole",
				detail: "Povinné. Označuje, ktorý stĺpec funkcia používa. Zadajte názov stĺpca ako text v úvodzovkách, napríklad \"Vek\" alebo \"Výnos\", alebo ako číslo označujúce pozíciu stĺpca v zozname: 1 pre prvý stĺpec, 2 pre druhý stĺpec, a tak ďalej."
			},
			criteria: {
				name: "kritériá",
				detail: "Povinné. Rozsah buniek, ktorý obsahuje dané podmienky. Pre argument kritériá môžete použiť ľubovoľný rozsah, ak obsahuje aspoň jedno označenie stĺpca a aspoň jednu bunku pod týmto označením, ktorá určuje podmienku pre stĺpec."
			}
		}
	},
	DPRODUCT: {
		description: "Vynásobí hodnoty v poli (stĺpci) položiek zoznamu alebo databázy, ktoré spĺňajú zadané kritériá.",
		abstract: "Vynásobí hodnoty v poli (stĺpci) položiek zoznamu alebo databázy, ktoré spĺňajú zadané kritériá.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/dproduct-function"
		}],
		functionParameter: {
			database: {
				name: "databáza",
				detail: "Povinné. Rozsah buniek tvoriacich zoznam alebo databázu. Databáza je zoznam súvisiacich údajov, v ktorom riadky so súvisiacimi informáciami predstavujú záznamy a stĺpce s údajmi predstavujú polia. Prvý riadok zoznamu obsahuje označenia jednotlivých stĺpcov."
			},
			field: {
				name: "pole",
				detail: "Povinné. Označuje, ktorý stĺpec funkcia používa. Zadajte názov stĺpca ako text v úvodzovkách, napríklad \"Vek\" alebo \"Výnos\", alebo ako číslo označujúce pozíciu stĺpca v zozname: 1 pre prvý stĺpec, 2 pre druhý stĺpec, a tak ďalej."
			},
			criteria: {
				name: "kritériá",
				detail: "Povinné. Rozsah buniek, ktorý obsahuje dané podmienky. Pre argument kritériá môžete použiť ľubovoľný rozsah, ak obsahuje aspoň jedno označenie stĺpca a aspoň jednu bunku pod týmto označením, ktorá určuje podmienku pre stĺpec."
			}
		}
	},
	DSTDEV: {
		description: "Pomocou čísel vzorky, ktoré v poli (stĺpci) položiek zoznamu alebo databázy spĺňajú zadané kritériá, odhadne smerodajnú odchýlku základného súboru.",
		abstract: "Pomocou čísel vzorky, ktoré v poli (stĺpci) položiek zoznamu alebo databázy spĺňajú zadané kritériá, odhadne smerodajnú odchýlku základného súboru.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/dstdev-function"
		}],
		functionParameter: {
			database: {
				name: "databáza",
				detail: "Povinné. Rozsah buniek tvoriacich zoznam alebo databázu. Databáza je zoznam súvisiacich údajov, v ktorom riadky so súvisiacimi informáciami predstavujú záznamy a stĺpce s údajmi predstavujú polia. Prvý riadok zoznamu obsahuje označenia jednotlivých stĺpcov."
			},
			field: {
				name: "pole",
				detail: "Povinné. Označuje, ktorý stĺpec funkcia používa. Zadajte názov stĺpca ako text v úvodzovkách, napríklad \"Vek\" alebo \"Výnos\", alebo ako číslo označujúce pozíciu stĺpca v zozname: 1 pre prvý stĺpec, 2 pre druhý stĺpec, a tak ďalej."
			},
			criteria: {
				name: "kritériá",
				detail: "Povinné. Rozsah buniek, ktorý obsahuje dané podmienky. Pre argument kritériá môžete použiť ľubovoľný rozsah, ak obsahuje aspoň jedno označenie stĺpca a aspoň jednu bunku pod týmto označením, ktorá určuje podmienku pre stĺpec."
			}
		}
	},
	DSTDEVP: {
		description: "Vypočíta smerodajnú odchýlku základného súboru pomocou tých čísel celého základného súboru, ktoré v poli (stĺpci) položiek zoznamu alebo databázy spĺňajú zadané kritériá.",
		abstract: "Vypočíta smerodajnú odchýlku základného súboru pomocou tých čísel celého základného súboru, ktoré v poli (stĺpci) položiek zoznamu alebo databázy spĺňajú zadané kritériá.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/dstdevp-function"
		}],
		functionParameter: {
			database: {
				name: "databáza",
				detail: "Povinné. Rozsah buniek tvoriacich zoznam alebo databázu. Databáza je zoznam súvisiacich údajov, v ktorom riadky so súvisiacimi informáciami predstavujú záznamy a stĺpce s údajmi predstavujú polia. Prvý riadok zoznamu obsahuje označenia jednotlivých stĺpcov."
			},
			field: {
				name: "pole",
				detail: "Povinné. Označuje, ktorý stĺpec funkcia používa. Zadajte názov stĺpca ako text v úvodzovkách, napríklad \"Vek\" alebo \"Výnos\", alebo ako číslo označujúce pozíciu stĺpca v zozname: 1 pre prvý stĺpec, 2 pre druhý stĺpec, a tak ďalej."
			},
			criteria: {
				name: "kritériá",
				detail: "Povinné. Rozsah buniek, ktorý obsahuje dané podmienky. Pre argument kritériá môžete použiť ľubovoľný rozsah, ak obsahuje aspoň jedno označenie stĺpca a aspoň jednu bunku pod týmto označením, ktorá určuje podmienku pre stĺpec."
			}
		}
	},
	DSUM: {
		description: "V zozname alebo databáze poskytuje DSUM súčet čísel v poliach (stĺpcoch) záznamov, ktoré spĺňajú zadané podmienky.",
		abstract: "V zozname alebo databáze poskytuje DSUM súčet čísel v poliach (stĺpcoch) záznamov, ktoré spĺňajú zadané podmienky.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/dsum-function"
		}],
		functionParameter: {
			database: {
				name: "databáza",
				detail: "Povinné. Toto je rozsah buniek tvoriacich zoznam alebo databázu. Databáza je zoznam súvisiacich údajov, v ktorom riadky so súvisiacimi informáciami predstavujú záznamy a stĺpce s údajmi predstavujú polia . Prvý riadok zoznamu obsahuje označenia jednotlivých stĺpcov."
			},
			field: {
				name: "pole",
				detail: "Povinné. Táto možnosť určuje, ktorý stĺpec funkcia používa. Zadajte označenie stĺpca v úvodzovkách, napríklad \"Vek\" alebo \"Výnos\". Prípadne môžete zadať číslo (bez úvodzoviek), ktoré predstavuje pozíciu stĺpca v zozname: napríklad 1 pre prvý stĺpec, 2 pre druhý stĺpec a tak ďalej."
			},
			criteria: {
				name: "kritériá",
				detail: "Povinné. Toto je rozsah buniek, ktorý obsahuje dané podmienky. Pre argument kritériá môžete použiť ľubovoľný rozsah, ak obsahuje aspoň jedno označenie stĺpca a aspoň jednu bunku pod týmto označením, ktorá určuje podmienku pre stĺpec."
			}
		}
	},
	DVAR: {
		description: "Na základe čísiel vzorky, ktoré v poli (stĺpci) položiek zoznamu alebo databázy spĺňajú zadané kritériá, odhadne odchýlku od základného súboru.",
		abstract: "Na základe čísiel vzorky, ktoré v poli (stĺpci) položiek zoznamu alebo databázy spĺňajú zadané kritériá, odhadne odchýlku od základného súboru.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/dvar-function"
		}],
		functionParameter: {
			database: {
				name: "databáza",
				detail: "Povinné. Rozsah buniek tvoriacich zoznam alebo databázu. Databáza je zoznam súvisiacich údajov, v ktorom riadky so súvisiacimi informáciami predstavujú záznamy a stĺpce s údajmi predstavujú polia. Prvý riadok zoznamu obsahuje označenia jednotlivých stĺpcov."
			},
			field: {
				name: "pole",
				detail: "Povinné. Označuje, ktorý stĺpec funkcia používa. Zadajte názov stĺpca ako text v úvodzovkách, napríklad \"Vek\" alebo \"Výnos\", alebo ako číslo označujúce pozíciu stĺpca v zozname: 1 pre prvý stĺpec, 2 pre druhý stĺpec, a tak ďalej."
			},
			criteria: {
				name: "kritériá",
				detail: "Povinné. Rozsah buniek, ktorý obsahuje dané podmienky. Pre argument kritériá môžete použiť ľubovoľný rozsah, ak obsahuje aspoň jedno označenie stĺpca a aspoň jednu bunku pod týmto označením, ktorá určuje podmienku pre stĺpec."
			}
		}
	},
	DVARP: {
		description: "Vypočíta odchýlku od základného súboru z čísel celého základného súboru, ktoré v poli (stĺpci) položiek zoznamu alebo databázy spĺňajú zadané kritériá.",
		abstract: "Vypočíta odchýlku od základného súboru z čísel celého základného súboru, ktoré v poli (stĺpci) položiek zoznamu alebo databázy spĺňajú zadané kritériá.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/dvarp-function"
		}],
		functionParameter: {
			database: {
				name: "databáza",
				detail: "Povinné. Rozsah buniek tvoriacich zoznam alebo databázu. Databáza je zoznam súvisiacich údajov, v ktorom riadky so súvisiacimi informáciami predstavujú záznamy a stĺpce s údajmi predstavujú polia. Prvý riadok zoznamu obsahuje označenia jednotlivých stĺpcov."
			},
			field: {
				name: "pole",
				detail: "Povinné. Označuje, ktorý stĺpec funkcia používa. Zadajte názov stĺpca ako text v úvodzovkách, napríklad \"Vek\" alebo \"Výnos\", alebo ako číslo označujúce pozíciu stĺpca v zozname: 1 pre prvý stĺpec, 2 pre druhý stĺpec, a tak ďalej."
			},
			criteria: {
				name: "kritériá",
				detail: "Povinné. Rozsah buniek, ktorý obsahuje dané podmienky. Pre argument kritériá môžete použiť ľubovoľný rozsah, ak obsahuje aspoň jedno označenie stĺpca a aspoň jednu bunku pod týmto označením, ktorá určuje podmienku pre stĺpec."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/date/sk-SK.ts
const locale$11 = {
	DATE: {
		description: "Vracia sériové číslo konkrétneho dátumu",
		abstract: "Vracia sériové číslo konkrétneho dátumu",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/date-function"
		}],
		functionParameter: {
			year: {
				name: "rok",
				detail: "Hodnota argumentu rok môže obsahovať jednu až štyri číslice. Excel interpretuje argument rok podľa dátumového systému vášho počítača. Predvolene Univer používa dátumový systém 1900, takže prvý dátum je 1. január 1900."
			},
			month: {
				name: "mesiac",
				detail: "Kladné alebo záporné celé číslo predstavujúce mesiac roka od 1 do 12 (január až december)."
			},
			day: {
				name: "deň",
				detail: "Kladné alebo záporné celé číslo predstavujúce deň v mesiaci od 1 do 31."
			}
		}
	},
	DATEDIF: {
		description: "Vypočíta počet dní, mesiacov alebo rokov medzi dvoma dátumami. Táto funkcia je užitočná vo vzorcoch, kde potrebujete vypočítať vek.",
		abstract: "Vypočíta počet dní, mesiacov alebo rokov medzi dvoma dátumami",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/datedif-function"
		}],
		functionParameter: {
			startDate: {
				name: "začiatočný_dátum",
				detail: "Dátum, ktorý predstavuje prvý alebo počiatočný dátum daného obdobia. Dátumy možno zadať ako textové reťazce v úvodzovkách (napríklad \"30.1.2001\"), ako poradové čísla (napríklad 36921, čo predstavuje 30. január 2001, ak používate kalendárny systém 1900) alebo ako výsledok iných vzorcov alebo funkcií (napríklad DATEVALUE(\"30.1.2001\"))."
			},
			endDate: {
				name: "koncový_dátum",
				detail: "Dátum, ktorý predstavuje koncový dátum príslušného obdobia."
			},
			unit: {
				name: "jednotka",
				detail: "Typ informácie, ktorá sa má vrátiť, kde: Jednotka****Vráti\" Y \"Počet celých rokov v príslušnom období.\" M \"Počet celých mesiacov v príslušnom období.\" D \"Počet dní v príslušnom období.\" MD: \" Rozdiel medzi dňami v start_date a end_date. Mesiace a roky dátumov sa ignorujú. Dôležité: Z dôvodu známych obmedzení argumentu \"MD\" neodporúčame jeho použitie. Pozrite si nižšie časť o známych problémoch.\" YM \"Rozdiel medzi mesiacmi v start_date a end_date. Dni a roky dátumov sa ignorujú\" YD \"Rozdiel medzi dňami start_date a end_date. Roky dátumov sa ignorujú."
			}
		}
	},
	DATEVALUE: {
		description: "Konvertuje dátum v textovej forme na sériové číslo.",
		abstract: "Konvertuje dátum v textovej forme na sériové číslo",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/datevalue-function"
		}],
		functionParameter: { dateText: {
			name: "text_dátumu",
			detail: "Text, ktorý predstavuje dátum vo formáte dátumu Excelu, alebo odkaz na bunku s takýmto textom. Napríklad \"1/30/2008\" alebo \"30-Jan-2008\" sú textové reťazce v úvodzovkách, ktoré predstavujú dátumy. Pri použití predvoleného dátumového systému v Microsoft Excel pre Windows musí argument date_text predstavovať dátum medzi 1. januárom 1900 a 31. decembrom 9999. Funkcia DATEVALUE vráti chybu #VALUE!, ak hodnota argumentu date_text je mimo tohto rozsahu. Ak je rok v argumente date_text vynechaný, funkcia DATEVALUE použije aktuálny rok z interných hodín počítača. Informácia o čase v argumente date_text sa ignoruje."
		} }
	},
	DAY: {
		description: "Vracia deň z dátumu reprezentovaného sériovým číslom. Deň je celé číslo od 1 do 31.",
		abstract: "Konvertuje sériové číslo na deň v mesiaci",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/day-function"
		}],
		functionParameter: { serialNumber: {
			name: "sériové_číslo",
			detail: "Dátum, pre ktorý chcete nájsť deň. Dátumy zadávajte pomocou funkcie DATE alebo ako výsledky iných vzorcov či funkcií. Napríklad použite DATE(2008,5,23) pre 23. máj 2008."
		} }
	},
	DAYS: {
		description: "Vráti počet dní medzi dvomi dátumami.",
		abstract: "Vráti počet dní medzi dvomi dátumami.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/days-function"
		}],
		functionParameter: {
			endDate: {
				name: "koncový_dátum",
				detail: "Povinné. Počiatočný_dátum a koncový_dátum sú dva dátumy, medzi ktorými chcete spočítať počet dní."
			},
			startDate: {
				name: "začiatočný_dátum",
				detail: "Povinné. Počiatočný_dátum a koncový_dátum sú dva dátumy, medzi ktorými chcete spočítať počet dní."
			}
		}
	},
	DAYS360: {
		description: "Vypočíta počet dní medzi dvoma dátumami na základe 360-dňového roka",
		abstract: "Vypočíta počet dní medzi dvoma dátumami na základe 360-dňového roka",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/days360-function"
		}],
		functionParameter: {
			startDate: {
				name: "začiatočný_dátum",
				detail: "Start_date a end_date sú dva dátumy, medzi ktorými chcete zistiť počet dní."
			},
			endDate: {
				name: "koncový_dátum",
				detail: "Start_date a end_date sú dva dátumy, medzi ktorými chcete zistiť počet dní."
			},
			method: {
				name: "metóda",
				detail: "Logická hodnota určujúca, či použiť americkú alebo európsku metódu výpočtu."
			}
		}
	},
	EDATE: {
		description: "Vracia sériové číslo dátumu, ktorý je o zadaný počet mesiacov pred alebo po zadanom dátume (start_date). Funkciu EDATE použite na výpočet dátumov splatnosti alebo termínov, ktoré pripadajú na rovnaký deň v mesiaci ako dátum vydania.",
		abstract: "Vracia sériové číslo dátumu, ktorý je o zadaný počet mesiacov pred alebo po začiatočnom dátume",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/edate-function"
		}],
		functionParameter: {
			startDate: {
				name: "začiatočný_dátum",
				detail: "Dátum, ktorý predstavuje začiatočný dátum. Dátumy zadávajte pomocou funkcie DATE alebo ako výsledky iných vzorcov či funkcií. Napríklad použite DATE(2008,5,23) pre 23. máj 2008. Problémy môžu nastať, ak sú dátumy zadané ako text."
			},
			months: {
				name: "mesiace",
				detail: "Počet mesiacov pred alebo po start_date. Kladná hodnota vráti budúci dátum, záporná hodnota vráti minulý dátum."
			}
		}
	},
	EOMONTH: {
		description: "Vracia sériové číslo posledného dňa mesiaca pred alebo po zadanom počte mesiacov",
		abstract: "Vracia sériové číslo posledného dňa mesiaca pred alebo po zadanom počte mesiacov",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/eomonth-function"
		}],
		functionParameter: {
			startDate: {
				name: "začiatočný_dátum",
				detail: "Dátum, ktorý predstavuje začiatočný dátum."
			},
			months: {
				name: "mesiace",
				detail: "Počet mesiacov pred alebo po start_date."
			}
		}
	},
	EPOCHTODATE: {
		description: "Konvertuje Unix epoch timestamp v sekundách, milisekundách alebo mikrosekundách na dátum a čas v koordinovanom univerzálnom čase (UTC).",
		abstract: "Konvertuje Unix epoch timestamp v sekundách, milisekundách alebo mikrosekundách na dátum a čas v koordinovanom univerzálnom čase (UTC).",
		links: [{
			title: "Inštrukcia",
			url: "https://support.google.com/docs/answer/13193461?hl=sk"
		}],
		functionParameter: {
			timestamp: {
				name: "časová_pečiatka",
				detail: "Unix epoch časová pečiatka v sekundách, milisekundách alebo mikrosekundách."
			},
			unit: {
				name: "jednotka",
				detail: "Jednotka času, v ktorej je časová pečiatka vyjadrená. Predvolene 1: \n1 znamená sekundy. \n2 znamená milisekundy.\n3 znamená mikrosekundy."
			}
		}
	},
	HOUR: {
		description: "Konvertuje sériové číslo na hodinu",
		abstract: "Konvertuje sériové číslo na hodinu",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/hour-function"
		}],
		functionParameter: { serialNumber: {
			name: "sériové_číslo",
			detail: "Dátum, pre ktorý chcete nájsť hodinu. Dátumy zadávajte pomocou funkcie DATE alebo ako výsledky iných vzorcov či funkcií. Napríklad použite DATE(2008,5,23) pre 23. máj 2008."
		} }
	},
	ISOWEEKNUM: {
		description: "Vracia číslo ISO týždňa v roku pre daný dátum",
		abstract: "Vracia číslo ISO týždňa v roku pre daný dátum",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/isoweeknum-function"
		}],
		functionParameter: { date: {
			name: "dátum",
			detail: "Dátum je kód dátumu/času používaný Excelom na výpočty dátumu a času."
		} }
	},
	MINUTE: {
		description: "Vráti minúty časovej hodnoty. Minúta je daná ako celé číslo z intervalu od 0 do 59.",
		abstract: "Vráti minúty časovej hodnoty. Minúta je daná ako celé číslo z intervalu od 0 do 59.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/minute-function"
		}],
		functionParameter: { serialNumber: {
			name: "sériové_číslo",
			detail: "Povinné. Časový údaj obsahujúci minútu, ktorú chcete nájsť. Čas možno zadať ako textový reťazec v úvodzovkách (napríklad \"18:45\"), ako desatinné číslo (napríklad 0,78125, čo zodpovedá času 18:45) alebo ako výsledok iných vzorcov alebo funkcií (napríklad TIMEVALUE(\"18:45\"))."
		} }
	},
	MONTH: {
		description: "Vráti mesiac dátumu, ktorý je vyjadrený poradovým číslom. Mesiac je daný ako celé číslo z intervalu od 1 (január) do 12 (december).",
		abstract: "Vráti mesiac dátumu, ktorý je vyjadrený poradovým číslom. Mesiac je daný ako celé číslo z intervalu od 1 (január) do 12 (december).",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/month-function"
		}],
		functionParameter: { serialNumber: {
			name: "sériové_číslo",
			detail: "Povinné. Dátum v mesiaci, ktorý sa pokúšate nájsť. Dátumy by sa mali zadávať pomocou funkcie DATE alebo ako výsledok iných vzorcov alebo funkcií. Pre 23. Ak zadáte dátum ako text, môžu sa vyskytnúť problémy."
		} }
	},
	NETWORKDAYS: {
		description: "Vracia počet celých pracovných dní medzi dvoma dátumami",
		abstract: "Vracia počet celých pracovných dní medzi dvoma dátumami",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/networkdays-function"
		}],
		functionParameter: {
			startDate: {
				name: "začiatočný_dátum",
				detail: "Dátum, ktorý predstavuje začiatočný dátum."
			},
			endDate: {
				name: "koncový_dátum",
				detail: "Dátum, ktorý predstavuje koncový dátum."
			},
			holidays: {
				name: "sviatky",
				detail: "Voliteľný rozsah jedného alebo viacerých dátumov, ktoré sa majú vylúčiť z pracovného kalendára, napríklad štátne sviatky a pohyblivé sviatky."
			}
		}
	},
	NETWORKDAYS_INTL: {
		description: "Vráti počet celých pracovných dní medzi dvoma dátumami s použitím parametrov určujúcich, ktoré dni sú víkendové a koľko ich je. Víkendové dni a dni určené ako sviatky sa nepovažujú za pracovné dni.",
		abstract: "Vráti počet celých pracovných dní medzi dvoma dátumami s použitím parametrov určujúcich, ktoré dni sú víkendové a koľko ich je. Víkendové dni a dni určené ako sviatky sa nepovažujú za pracovné dni.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/networkdays-intl-function"
		}],
		functionParameter: {
			startDate: {
				name: "začiatočný_dátum",
				detail: "Dátum, ktorý predstavuje začiatočný dátum."
			},
			endDate: {
				name: "koncový_dátum",
				detail: "Dátum, ktorý predstavuje koncový dátum."
			},
			weekend: {
				name: "víkend",
				detail: "Číslo alebo reťazec určujúci, kedy nastávajú víkendy."
			},
			holidays: {
				name: "sviatky",
				detail: "Voliteľný rozsah jedného alebo viacerých dátumov, ktoré sa majú vylúčiť z pracovného kalendára, napríklad štátne sviatky a pohyblivé sviatky."
			}
		}
	},
	NOW: {
		description: "Vráti poradové číslo aktuálneho dátumu a času. Ak bola bunka pred zadaním funkcie nastavená na formát Všeobecné , program Excel zmení formát bunky na ten formát dátumu a času, ktorý je v počítači zadaný v rámci miestnych nastavení pre dátum a čas. Formát dátumu a času pre bunku môžete zmeniť pomocou príkazov v skupine Číslo na karte Domov na páse s nástrojmi.",
		abstract: "Vráti poradové číslo aktuálneho dátumu a času. Ak bola bunka pred zadaním funkcie nastavená na formát Všeobecné , program Excel zmení formát bunky na ten formát dátumu a času, ktorý je v počítači zadaný v rámci miestnych nastavení pre dátum a čas. Formát dátumu a času pre bunku môžete zmeniť pomocou príkazov v skupine Číslo na karte Domov na páse s nástrojmi.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/now-function"
		}],
		functionParameter: {}
	},
	SECOND: {
		description: "Vracia sekundy časovej hodnoty. Sekunda je daná ako celé číslo z intervalu od 0 (nuly) do 59.",
		abstract: "Vracia sekundy časovej hodnoty. Sekunda je daná ako celé číslo z intervalu od 0 (nuly) do 59.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/second-function"
		}],
		functionParameter: { serialNumber: {
			name: "sériové_číslo",
			detail: "Povinné. Časový údaj obsahujúci sekundu, ktorú chcete vyhľadať. Čas možno zadať ako textový reťazec v úvodzovkách (napríklad \"18:45\"), ako desatinné číslo (napríklad 0,78125, čo predstavuje čas 18:45) alebo ako výsledok iných vzorcov alebo funkcií (napríklad TIMEVALUE(\"18:45\"))."
		} }
	},
	TIME: {
		description: "Vracia sériové číslo konkrétneho času.",
		abstract: "Vracia sériové číslo konkrétneho času",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/time-function"
		}],
		functionParameter: {
			hour: {
				name: "hodina",
				detail: "Číslo od 0 do 32767 predstavujúce hodinu. Akákoľvek hodnota väčšia ako 23 sa vydelí 24 a zvyšok sa použije ako hodina. Napríklad TIME(27,0,0) = TIME(3,0,0) = .125 alebo 3:00 AM."
			},
			minute: {
				name: "minúta",
				detail: "Číslo od 0 do 32767 predstavujúce minútu. Akákoľvek hodnota väčšia ako 59 sa prepočíta na hodiny a minúty. Napríklad TIME(0,750,0) = TIME(12,30,0) = .520833 alebo 12:30 PM."
			},
			second: {
				name: "sekunda",
				detail: "Číslo od 0 do 32767 predstavujúce sekundu. Akákoľvek hodnota väčšia ako 59 sa prepočíta na hodiny, minúty a sekundy. Napríklad TIME(0,0,2000) = TIME(0,33,22) = .023148 alebo 12:33:20 AM."
			}
		}
	},
	TIMEVALUE: {
		description: "Konvertuje čas v textovej forme na sériové číslo.",
		abstract: "Konvertuje čas v textovej forme na sériové číslo",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/timevalue-function"
		}],
		functionParameter: { timeText: {
			name: "text_času",
			detail: "Textový reťazec, ktorý predstavuje čas v niektorom z formátov času Microsoft Excelu; napríklad \"6:45 PM\" alebo \"18:45\" sú textové reťazce v úvodzovkách, ktoré predstavujú čas."
		} }
	},
	TO_DATE: {
		description: "Konvertuje zadané číslo na dátum.",
		abstract: "Konvertuje zadané číslo na dátum.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.google.com/docs/answer/3094239?hl=sk"
		}],
		functionParameter: { value: {
			name: "hodnota",
			detail: "Argument alebo odkaz na bunku, ktorý sa má previesť na dátum."
		} }
	},
	TODAY: {
		description: "Vracia sériové číslo dnešného dátumu",
		abstract: "Vracia sériové číslo dnešného dátumu",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/today-function"
		}],
		functionParameter: {}
	},
	WEEKDAY: {
		description: "Konvertuje sériové číslo na deň v týždni",
		abstract: "Konvertuje sériové číslo na deň v týždni",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/weekday-function"
		}],
		functionParameter: {
			serialNumber: {
				name: "sériové_číslo",
				detail: "Postupné číslo, ktoré predstavuje dátum dňa, ktorý chcete nájsť."
			},
			returnType: {
				name: "typ_návratu",
				detail: "Číslo, ktoré určuje typ návratovej hodnoty."
			}
		}
	},
	WEEKNUM: {
		description: "Konvertuje sériové číslo na číslo predstavujúce poradie týždňa v roku",
		abstract: "Konvertuje sériové číslo na číslo predstavujúce poradie týždňa v roku",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/weeknum-function"
		}],
		functionParameter: {
			serialNumber: {
				name: "sériové_číslo",
				detail: "Dátum v rámci týždňa."
			},
			returnType: {
				name: "typ_návratu",
				detail: "Číslo, ktoré určuje, ktorý deň je začiatkom týždňa. Predvolene 1."
			}
		}
	},
	WORKDAY: {
		description: "Vracia sériové číslo dátumu pred alebo po zadanom počte pracovných dní",
		abstract: "Vracia sériové číslo dátumu pred alebo po zadanom počte pracovných dní",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/workday-function"
		}],
		functionParameter: {
			startDate: {
				name: "začiatočný_dátum",
				detail: "Dátum, ktorý predstavuje začiatočný dátum."
			},
			days: {
				name: "dni",
				detail: "Počet dní, ktoré nie sú víkend ani sviatok, pred alebo po start_date. Kladná hodnota vráti budúci dátum; záporná hodnota vráti minulý dátum."
			},
			holidays: {
				name: "sviatky",
				detail: "Voliteľný rozsah jedného alebo viacerých dátumov, ktoré sa majú vylúčiť z pracovného kalendára, napríklad štátne sviatky a pohyblivé sviatky."
			}
		}
	},
	WORKDAY_INTL: {
		description: "Vracia sériové číslo dátumu pred alebo po zadanom počte pracovných dní s parametrami, ktoré určujú, ktoré a koľko dní sú víkendové",
		abstract: "Vracia sériové číslo dátumu pred alebo po zadanom počte pracovných dní s parametrami, ktoré určujú, ktoré a koľko dní sú víkendové",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/workday-intl-function"
		}],
		functionParameter: {
			startDate: {
				name: "začiatočný_dátum",
				detail: "Dátum, ktorý predstavuje začiatočný dátum."
			},
			days: {
				name: "dni",
				detail: "Počet dní, ktoré nie sú víkend ani sviatok, pred alebo po start_date. Kladná hodnota vráti budúci dátum; záporná hodnota vráti minulý dátum."
			},
			weekend: {
				name: "víkend",
				detail: "Číslo alebo reťazec určujúci, kedy nastávajú víkendy."
			},
			holidays: {
				name: "sviatky",
				detail: "Voliteľný rozsah jedného alebo viacerých dátumov, ktoré sa majú vylúčiť z pracovného kalendára, napríklad štátne sviatky a pohyblivé sviatky."
			}
		}
	},
	YEAR: {
		description: "Vracia rok zodpovedajúci dátumu. Rok je vrátený ako celé číslo v rozsahu 1900-9999.",
		abstract: "Konvertuje sériové číslo na rok",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/year-function"
		}],
		functionParameter: { serialNumber: {
			name: "sériové_číslo",
			detail: "Dátum roka, ktorý chcete zistiť. Dátumy zadávajte pomocou funkcie DATE alebo ako výsledky iných vzorcov či funkcií. Napríklad použite DATE(2008,5,23) pre 23. máj 2008. Problémy môžu nastať, ak sú dátumy zadané ako text."
		} }
	},
	YEARFRAC: {
		description: "Vracia zlomok roka predstavujúci počet celých dní medzi start_date a end_date",
		abstract: "Vracia zlomok roka predstavujúci počet celých dní medzi start_date a end_date",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/yearfrac-function"
		}],
		functionParameter: {
			startDate: {
				name: "začiatočný_dátum",
				detail: "Dátum, ktorý predstavuje začiatočný dátum."
			},
			endDate: {
				name: "koncový_dátum",
				detail: "Dátum, ktorý predstavuje koncový dátum."
			},
			basis: {
				name: "základ",
				detail: "Typ základu počtu dní, ktorý sa má použiť."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/engineering/sk-SK.ts
const locale$10 = {
	BESSELI: {
		description: "Vracia modifikovanú Besselovu funkciu In(x)",
		abstract: "Vracia modifikovanú Besselovu funkciu In(x)",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/besseli-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Hodnota, pri ktorej chcete vyhodnotiť funkciu."
			},
			n: {
				name: "n",
				detail: "Rád Besselovej funkcie. Ak n nie je celé číslo, skráti sa."
			}
		}
	},
	BESSELJ: {
		description: "Vracia Besselovu funkciu Jn(x)",
		abstract: "Vracia Besselovu funkciu Jn(x)",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/besselj-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Hodnota, pri ktorej chcete vyhodnotiť funkciu."
			},
			n: {
				name: "n",
				detail: "Rád Besselovej funkcie. Ak n nie je celé číslo, skráti sa."
			}
		}
	},
	BESSELK: {
		description: "Vracia modifikovanú Besselovu funkciu Kn(x)",
		abstract: "Vracia modifikovanú Besselovu funkciu Kn(x)",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/besselk-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Hodnota, pri ktorej chcete vyhodnotiť funkciu."
			},
			n: {
				name: "n",
				detail: "Rád Besselovej funkcie. Ak n nie je celé číslo, skráti sa."
			}
		}
	},
	BESSELY: {
		description: "Vracia Besselovu funkciu Yn(x)",
		abstract: "Vracia Besselovu funkciu Yn(x)",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/bessely-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Hodnota, pri ktorej chcete vyhodnotiť funkciu."
			},
			n: {
				name: "n",
				detail: "Rád Besselovej funkcie. Ak n nie je celé číslo, skráti sa."
			}
		}
	},
	BIN2DEC: {
		description: "Konvertuje binárne číslo na desiatkové",
		abstract: "Konvertuje binárne číslo na desiatkové",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/bin2dec-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Binárne číslo, ktoré chcete previesť."
		} }
	},
	BIN2HEX: {
		description: "Konvertuje binárne číslo na hexadecimálne",
		abstract: "Konvertuje binárne číslo na hexadecimálne",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/bin2hex-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Binárne číslo, ktoré chcete previesť."
			},
			places: {
				name: "počet_znakov",
				detail: "Počet znakov, ktoré sa majú použiť."
			}
		}
	},
	BIN2OCT: {
		description: "Skonvertuje binárne číslo na osmičkové.",
		abstract: "Skonvertuje binárne číslo na osmičkové.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/bin2oct-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Povinné. Binárne číslo, ktoré chcete skonvertovať. Číslo nesmie obsahovať viac než 10 znakov (10 bitov). Najvýznamnejší bit čísla je bit znamienka. Zvyšných 9 bitov určuje veľkosť čísla. Záporné čísla sa vyjadrujú pomocou binárnej doplnkovej notácie."
			},
			places: {
				name: "počet_znakov",
				detail: "Voliteľný argument. Počet znakov, ktoré sa majú použiť. Ak je tento argument vynechaný, funkcia BIN2OCT používa najmenší potrebný počet znakov. Tento argument je užitočný, ak chcete výslednú hodnotu doplniť zľava nulami."
			}
		}
	},
	BITAND: {
		description: "Vráti bitový operátor AND dvoch čísel.",
		abstract: "Vráti bitový operátor AND dvoch čísel.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/bitand-function"
		}],
		functionParameter: {
			number1: {
				name: "číslo1",
				detail: "Povinné. Hodnota musí byť v formáte desatinného čísla a väčšia alebo rovná 0."
			},
			number2: {
				name: "číslo2",
				detail: "Povinné. Hodnota musí byť v formáte desatinného čísla a väčšia alebo rovná 0."
			}
		}
	},
	BITLSHIFT: {
		description: "Vracia hodnotu number posunutú doľava o shift_amount bitov",
		abstract: "Vracia hodnotu number posunutú doľava o shift_amount bitov",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/bitlshift-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Číslo musí byť celé a väčšie alebo rovné 0."
			},
			shiftAmount: {
				name: "posun",
				detail: "Posun musí byť celé číslo."
			}
		}
	},
	BITOR: {
		description: "Vracia bitový OR dvoch čísel",
		abstract: "Vracia bitový OR dvoch čísel",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/bitor-function"
		}],
		functionParameter: {
			number1: {
				name: "číslo1",
				detail: "Musí byť v desiatkovej forme a väčšie alebo rovné 0."
			},
			number2: {
				name: "číslo2",
				detail: "Musí byť v desiatkovej forme a väčšie alebo rovné 0."
			}
		}
	},
	BITRSHIFT: {
		description: "Vracia hodnotu number posunutú doprava o shift_amount bitov",
		abstract: "Vracia hodnotu number posunutú doprava o shift_amount bitov",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/bitrshift-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Číslo musí byť celé a väčšie alebo rovné 0."
			},
			shiftAmount: {
				name: "posun",
				detail: "Posun musí byť celé číslo."
			}
		}
	},
	BITXOR: {
		description: "Vracia bitový XOR (exkluzívne OR) dvoch čísel",
		abstract: "Vracia bitový XOR (exkluzívne OR) dvoch čísel",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/bitxor-function"
		}],
		functionParameter: {
			number1: {
				name: "číslo1",
				detail: "Musí byť v desiatkovej forme a väčšie alebo rovné 0."
			},
			number2: {
				name: "číslo2",
				detail: "Musí byť v desiatkovej forme a väčšie alebo rovné 0."
			}
		}
	},
	COMPLEX: {
		description: "Konvertuje reálne a imaginárne koeficienty na komplexné číslo",
		abstract: "Konvertuje reálne a imaginárne koeficienty na komplexné číslo",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/complex-function"
		}],
		functionParameter: {
			realNum: {
				name: "reálna_časť",
				detail: "Reálny koeficient komplexného čísla."
			},
			iNum: {
				name: "imaginárna_časť",
				detail: "Imaginárny koeficient komplexného čísla."
			},
			suffix: {
				name: "sufix",
				detail: "Sufix imaginárnej zložky komplexného čísla. Ak je vynechaný, predpokladá sa \"i\"."
			}
		}
	},
	CONVERT: {
		description: "Konvertuje číslo z jednej sústavy mier na inú",
		abstract: "Konvertuje číslo z jednej sústavy mier na inú",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/convert-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Hodnota v jednotkách from_unit, ktorú chcete previesť."
			},
			fromUnit: {
				name: "z_jednotky",
				detail: "Jednotky pre číslo."
			},
			toUnit: {
				name: "na_jednotky",
				detail: "Jednotky výsledku."
			}
		}
	},
	DEC2BIN: {
		description: "Konvertuje desiatkové číslo na binárne",
		abstract: "Konvertuje desiatkové číslo na binárne",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/dec2bin-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Desiatkové číslo, ktoré chcete previesť."
			},
			places: {
				name: "počet_znakov",
				detail: "Počet znakov, ktoré sa majú použiť."
			}
		}
	},
	DEC2HEX: {
		description: "Konvertuje desiatkové číslo na hexadecimálne",
		abstract: "Konvertuje desiatkové číslo na hexadecimálne",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/dec2hex-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Desiatkové číslo, ktoré chcete previesť."
			},
			places: {
				name: "počet_znakov",
				detail: "Počet znakov, ktoré sa majú použiť."
			}
		}
	},
	DEC2OCT: {
		description: "Konvertuje desiatkové číslo na oktalové",
		abstract: "Konvertuje desiatkové číslo na oktalové",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/dec2oct-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Desiatkové číslo, ktoré chcete previesť."
			},
			places: {
				name: "počet_znakov",
				detail: "Počet znakov, ktoré sa majú použiť."
			}
		}
	},
	DELTA: {
		description: "Testuje, či sú dve hodnoty rovnaké",
		abstract: "Testuje, či sú dve hodnoty rovnaké",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/delta-function"
		}],
		functionParameter: {
			number1: {
				name: "číslo1",
				detail: "Prvé číslo."
			},
			number2: {
				name: "číslo2",
				detail: "Druhé číslo. Ak je vynechané, number2 sa považuje za nulu."
			}
		}
	},
	ERF: {
		description: "Vracia funkciu chyby",
		abstract: "Vracia funkciu chyby",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/erf-function"
		}],
		functionParameter: {
			lowerLimit: {
				name: "dolná_hranica",
				detail: "Dolná hranica pre integráciu ERF."
			},
			upperLimit: {
				name: "horná_hranica",
				detail: "Horná hranica pre integráciu ERF. Ak je vynechaná, ERF integruje medzi nulu a lower_limit."
			}
		}
	},
	ERF_PRECISE: {
		description: "Vracia funkciu chyby",
		abstract: "Vracia funkciu chyby",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/erf-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Dolná hranica pre integráciu ERF.PRECISE."
		} }
	},
	ERFC: {
		description: "Vracia doplnkovú funkciu chyby",
		abstract: "Vracia doplnkovú funkciu chyby",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/erfc-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Dolná hranica pre integráciu ERFC."
		} }
	},
	ERFC_PRECISE: {
		description: "Vracia doplnkovú funkciu ERF integrovanú od x po nekonečno",
		abstract: "Vracia doplnkovú funkciu ERF integrovanú od x po nekonečno",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/erfc-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Dolná hranica pre integráciu ERFC.PRECISE."
		} }
	},
	GESTEP: {
		description: "Testuje, či je číslo väčšie alebo rovné prahovej hodnote",
		abstract: "Testuje, či je číslo väčšie alebo rovné prahovej hodnote",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/gestep-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Hodnota, ktorá sa testuje voči prahu."
			},
			step: {
				name: "prah",
				detail: "Prahová hodnota. Ak je step vynechaný, GESTEP použije nulu."
			}
		}
	},
	HEX2BIN: {
		description: "Konvertuje hexadecimálne číslo na binárne",
		abstract: "Konvertuje hexadecimálne číslo na binárne",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/hex2bin-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Hexadecimálne číslo, ktoré chcete previesť."
			},
			places: {
				name: "počet_znakov",
				detail: "Počet znakov, ktoré sa majú použiť."
			}
		}
	},
	HEX2DEC: {
		description: "Konvertuje hexadecimálne číslo na desiatkové",
		abstract: "Konvertuje hexadecimálne číslo na desiatkové",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/hex2dec-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Hexadecimálne číslo, ktoré chcete previesť."
		} }
	},
	HEX2OCT: {
		description: "Konvertuje hexadecimálne číslo na oktalové",
		abstract: "Konvertuje hexadecimálne číslo na oktalové",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/hex2oct-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Hexadecimálne číslo, ktoré chcete previesť."
			},
			places: {
				name: "počet_znakov",
				detail: "Počet znakov, ktoré sa majú použiť."
			}
		}
	},
	IMABS: {
		description: "Vracia absolútnu hodnotu (modul) komplexného čísla",
		abstract: "Vracia absolútnu hodnotu (modul) komplexného čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/imabs-function"
		}],
		functionParameter: { inumber: {
			name: "komplexné_číslo",
			detail: "Komplexné číslo, pre ktoré chcete absolútnu hodnotu."
		} }
	},
	IMAGINARY: {
		description: "Vráti imaginárny koeficient komplexného čísla zadaného vo formáte x + yi alebo x + yj.",
		abstract: "Vráti imaginárny koeficient komplexného čísla zadaného vo formáte x + yi alebo x + yj.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/imaginary-function"
		}],
		functionParameter: { inumber: {
			name: "komplexné_číslo",
			detail: "Povinné. Komplexné číslo, ktorého imaginárny koeficient chcete zistiť."
		} }
	},
	IMARGUMENT: {
		description: "Vracia argument theta, uhol vyjadrený v radiánoch",
		abstract: "Vracia argument theta, uhol vyjadrený v radiánoch",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/imargument-function"
		}],
		functionParameter: { inumber: {
			name: "komplexné_číslo",
			detail: "Komplexné číslo, pre ktoré chcete argument theta."
		} }
	},
	IMCONJUGATE: {
		description: "Vracia komplexne združené číslo",
		abstract: "Vracia komplexne združené číslo",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/imconjugate-function"
		}],
		functionParameter: { inumber: {
			name: "komplexné_číslo",
			detail: "Komplexné číslo, pre ktoré chcete združené číslo."
		} }
	},
	IMCOS: {
		description: "Vracia kosínus komplexného čísla",
		abstract: "Vracia kosínus komplexného čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/imcos-function"
		}],
		functionParameter: { inumber: {
			name: "komplexné_číslo",
			detail: "Komplexné číslo, pre ktoré chcete kosínus."
		} }
	},
	IMCOSH: {
		description: "Vracia hyperbolický kosínus komplexného čísla",
		abstract: "Vracia hyperbolický kosínus komplexného čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/imcosh-function"
		}],
		functionParameter: { inumber: {
			name: "komplexné_číslo",
			detail: "Komplexné číslo, pre ktoré chcete hyperbolický kosínus."
		} }
	},
	IMCOT: {
		description: "Vracia kotangens komplexného čísla",
		abstract: "Vracia kotangens komplexného čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/imcot-function"
		}],
		functionParameter: { inumber: {
			name: "komplexné_číslo",
			detail: "Komplexné číslo, pre ktoré chcete kotangens."
		} }
	},
	IMCOTH: {
		description: "Vracia hyperbolický kotangens komplexného čísla",
		abstract: "Vracia hyperbolický kotangens komplexného čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.google.com/docs/answer/9366256?hl=sk"
		}],
		functionParameter: { inumber: {
			name: "komplexné_číslo",
			detail: "Komplexné číslo, pre ktoré chcete hyperbolický kotangens."
		} }
	},
	IMCSC: {
		description: "Vracia kosekans komplexného čísla",
		abstract: "Vracia kosekans komplexného čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/imcsc-function"
		}],
		functionParameter: { inumber: {
			name: "komplexné_číslo",
			detail: "Komplexné číslo, pre ktoré chcete kosekans."
		} }
	},
	IMCSCH: {
		description: "Vracia hyperbolický kosekans komplexného čísla",
		abstract: "Vracia hyperbolický kosekans komplexného čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/imcsch-function"
		}],
		functionParameter: { inumber: {
			name: "komplexné_číslo",
			detail: "Komplexné číslo, pre ktoré chcete hyperbolický kosekans."
		} }
	},
	IMDIV: {
		description: "Vracia podiel dvoch komplexných čísel",
		abstract: "Vracia podiel dvoch komplexných čísel",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/imdiv-function"
		}],
		functionParameter: {
			inumber1: {
				name: "čitateľ",
				detail: "Komplexný čitateľ alebo delenec."
			},
			inumber2: {
				name: "menovateľ",
				detail: "Komplexný menovateľ alebo deliteľ."
			}
		}
	},
	IMEXP: {
		description: "Vracia exponenciálu komplexného čísla",
		abstract: "Vracia exponenciálu komplexného čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/imexp-function"
		}],
		functionParameter: { inumber: {
			name: "komplexné_číslo",
			detail: "Komplexné číslo, pre ktoré chcete exponenciálu."
		} }
	},
	IMLN: {
		description: "Vracia prirodzený logaritmus komplexného čísla",
		abstract: "Vracia prirodzený logaritmus komplexného čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/imln-function"
		}],
		functionParameter: { inumber: {
			name: "komplexné_číslo",
			detail: "Komplexné číslo, pre ktoré chcete prirodzený logaritmus."
		} }
	},
	IMLOG: {
		description: "Vracia logaritmus komplexného čísla so zadaným základom",
		abstract: "Vracia logaritmus komplexného čísla so zadaným základom",
		links: [{
			title: "Inštrukcia",
			url: "https://support.google.com/docs/answer/9366486?hl=sk"
		}],
		functionParameter: {
			inumber: {
				name: "komplexné_číslo",
				detail: "Komplexné číslo, pre ktoré chcete vypočítať logaritmus so zadaným základom."
			},
			base: {
				name: "základ",
				detail: "Základ použitý pri výpočte logaritmu."
			}
		}
	},
	IMLOG10: {
		description: "Vracia logaritmus komplexného čísla so základom 10",
		abstract: "Vracia logaritmus komplexného čísla so základom 10",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/imlog10-function"
		}],
		functionParameter: { inumber: {
			name: "komplexné_číslo",
			detail: "Komplexné číslo, pre ktoré chcete bežný logaritmus."
		} }
	},
	IMLOG2: {
		description: "Vracia logaritmus komplexného čísla so základom 2",
		abstract: "Vracia logaritmus komplexného čísla so základom 2",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/imlog2-function"
		}],
		functionParameter: { inumber: {
			name: "komplexné_číslo",
			detail: "Komplexné číslo, pre ktoré chcete logaritmus so základom 2."
		} }
	},
	IMPOWER: {
		description: "Vracia komplexné číslo umocnené na celé číslo",
		abstract: "Vracia komplexné číslo umocnené na celé číslo",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/impower-function"
		}],
		functionParameter: {
			inumber: {
				name: "komplexné_číslo",
				detail: "Komplexné číslo, ktoré chcete umocniť."
			},
			number: {
				name: "exponent",
				detail: "Exponent, na ktorý chcete komplexné číslo umocniť."
			}
		}
	},
	IMPRODUCT: {
		description: "Vracia súčin 1 až 255 komplexných čísel",
		abstract: "Vracia súčin 1 až 255 komplexných čísel",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/improduct-function"
		}],
		functionParameter: {
			inumber1: {
				name: "komplexné_číslo1",
				detail: "1 až 255 komplexných čísel na násobenie."
			},
			inumber2: {
				name: "komplexné_číslo2",
				detail: "1 až 255 komplexných čísel na násobenie."
			}
		}
	},
	IMREAL: {
		description: "Vracia reálny koeficient komplexného čísla",
		abstract: "Vracia reálny koeficient komplexného čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/imreal-function"
		}],
		functionParameter: { inumber: {
			name: "komplexné_číslo",
			detail: "Komplexné číslo, pre ktoré chcete reálny koeficient."
		} }
	},
	IMSEC: {
		description: "Vracia sekans komplexného čísla",
		abstract: "Vracia sekans komplexného čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/imsec-function"
		}],
		functionParameter: { inumber: {
			name: "komplexné_číslo",
			detail: "Komplexné číslo, pre ktoré chcete sekans."
		} }
	},
	IMSECH: {
		description: "Vracia hyperbolický sekans komplexného čísla",
		abstract: "Vracia hyperbolický sekans komplexného čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/imsech-function"
		}],
		functionParameter: { inumber: {
			name: "komplexné_číslo",
			detail: "Komplexné číslo, pre ktoré chcete hyperbolický sekans."
		} }
	},
	IMSIN: {
		description: "Vracia sínus komplexného čísla",
		abstract: "Vracia sínus komplexného čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/imsin-function"
		}],
		functionParameter: { inumber: {
			name: "komplexné_číslo",
			detail: "Komplexné číslo, pre ktoré chcete sínus."
		} }
	},
	IMSINH: {
		description: "Vracia hyperbolický sínus komplexného čísla",
		abstract: "Vracia hyperbolický sínus komplexného čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/imsinh-function"
		}],
		functionParameter: { inumber: {
			name: "komplexné_číslo",
			detail: "Komplexné číslo, pre ktoré chcete hyperbolický sínus."
		} }
	},
	IMSQRT: {
		description: "Vracia druhú odmocninu komplexného čísla",
		abstract: "Vracia druhú odmocninu komplexného čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/imsqrt-function"
		}],
		functionParameter: { inumber: {
			name: "komplexné_číslo",
			detail: "Komplexné číslo, pre ktoré chcete druhú odmocninu."
		} }
	},
	IMSUB: {
		description: "Vracia rozdiel dvoch komplexných čísel",
		abstract: "Vracia rozdiel dvoch komplexných čísel",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/imsub-function"
		}],
		functionParameter: {
			inumber1: {
				name: "komplexné_číslo1",
				detail: "komplexné_číslo1."
			},
			inumber2: {
				name: "komplexné_číslo2",
				detail: "komplexné_číslo2."
			}
		}
	},
	IMSUM: {
		description: "Vracia súčet komplexných čísel",
		abstract: "Vracia súčet komplexných čísel",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/imsum-function"
		}],
		functionParameter: {
			inumber1: {
				name: "komplexné_číslo1",
				detail: "1 až 255 komplexných čísel na sčítanie."
			},
			inumber2: {
				name: "komplexné_číslo2",
				detail: "1 až 255 komplexných čísel na sčítanie."
			}
		}
	},
	IMTAN: {
		description: "Vracia tangens komplexného čísla",
		abstract: "Vracia tangens komplexného čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/imtan-function"
		}],
		functionParameter: { inumber: {
			name: "komplexné_číslo",
			detail: "Komplexné číslo, pre ktoré chcete tangens."
		} }
	},
	IMTANH: {
		description: "Vracia hyperbolický tangens komplexného čísla",
		abstract: "Vracia hyperbolický tangens komplexného čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.google.com/docs/answer/9366655?hl=sk"
		}],
		functionParameter: { inumber: {
			name: "komplexné_číslo",
			detail: "Komplexné číslo, pre ktoré chcete hyperbolický tangens."
		} }
	},
	OCT2BIN: {
		description: "Konvertuje oktalové číslo na binárne",
		abstract: "Konvertuje oktalové číslo na binárne",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/oct2bin-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Oktalové číslo, ktoré chcete previesť."
			},
			places: {
				name: "počet_znakov",
				detail: "Počet znakov, ktoré sa majú použiť."
			}
		}
	},
	OCT2DEC: {
		description: "Konvertuje oktalové číslo na desiatkové",
		abstract: "Konvertuje oktalové číslo na desiatkové",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/oct2dec-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Oktalové číslo, ktoré chcete previesť."
		} }
	},
	OCT2HEX: {
		description: "Konvertuje oktalové číslo na hexadecimálne",
		abstract: "Konvertuje oktalové číslo na hexadecimálne",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/oct2hex-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Oktalové číslo, ktoré chcete previesť."
			},
			places: {
				name: "počet_znakov",
				detail: "Počet znakov, ktoré sa majú použiť."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/financial/sk-SK.ts
const locale$9 = {
	ACCRINT: {
		description: "Vracia nahromadený úrok pre cenný papier s periodickým úročením",
		abstract: "Vracia nahromadený úrok pre cenný papier s periodickým úročením",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/accrint-function"
		}],
		functionParameter: {
			issue: {
				name: "dátum_emisie",
				detail: "Dátum emisie cenného papiera."
			},
			firstInterest: {
				name: "prvý_úrokový_dátum",
				detail: "Dátum prvej úrokovej platby cenného papiera."
			},
			settlement: {
				name: "dátum_vysporiadania",
				detail: "Dátum splatnosti cenného papiera."
			},
			rate: {
				name: "sadzba",
				detail: "Ročná kupónová sadzba cenného papiera."
			},
			par: {
				name: "menovitá_hodnota",
				detail: "Menovitá hodnota cenného papiera."
			},
			frequency: {
				name: "frekvencia",
				detail: "Počet kupónových platieb za rok."
			},
			basis: {
				name: "základ",
				detail: "Typ základu počtu dní, ktorý sa má použiť."
			},
			calcMethod: {
				name: "metóda_výpočtu",
				detail: "Logická hodnota: úrok sa počíta od dátumu emisie = TRUE alebo sa ignoruje; úrok sa počíta od dátumu poslednej kupónovej platby = FALSE."
			}
		}
	},
	ACCRINTM: {
		description: "Vracia nahromadený úrok pre cenný papier, ktorý vypláca úrok pri splatnosti",
		abstract: "Vracia nahromadený úrok pre cenný papier, ktorý vypláca úrok pri splatnosti",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/accrintm-function"
		}],
		functionParameter: {
			issue: {
				name: "dátum_emisie",
				detail: "Dátum emisie cenného papiera."
			},
			settlement: {
				name: "dátum_vysporiadania",
				detail: "Dátum splatnosti cenného papiera."
			},
			rate: {
				name: "sadzba",
				detail: "Ročná kupónová sadzba cenného papiera."
			},
			par: {
				name: "menovitá_hodnota",
				detail: "Menovitá hodnota cenného papiera."
			},
			basis: {
				name: "základ",
				detail: "Typ základu počtu dní, ktorý sa má použiť."
			}
		}
	},
	AMORDEGRC: {
		description: "Vracia odpisy pre každé účtovné obdobie pomocou odpisového koeficientu",
		abstract: "Vracia odpisy pre každé účtovné obdobie pomocou odpisového koeficientu",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/amordegrc-function"
		}],
		functionParameter: {
			cost: {
				name: "obstarávacia_cena",
				detail: "Obstarávacia cena majetku."
			},
			datePurchased: {
				name: "dátum_nákupu",
				detail: "Dátum nákupu majetku."
			},
			firstPeriod: {
				name: "prvé_obdobie",
				detail: "Dátum konca prvého obdobia."
			},
			salvage: {
				name: "zostatková_hodnota",
				detail: "Zostatková hodnota na konci životnosti majetku."
			},
			period: {
				name: "obdobie",
				detail: "Obdobie."
			},
			rate: {
				name: "sadzba",
				detail: "Sadzba odpisovania."
			},
			basis: {
				name: "základ",
				detail: "Základ roka, ktorý sa má použiť."
			}
		}
	},
	AMORLINC: {
		description: "Vracia odpisy pre každé účtovné obdobie",
		abstract: "Vracia odpisy pre každé účtovné obdobie",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/amorlinc-function"
		}],
		functionParameter: {
			cost: {
				name: "obstarávacia_cena",
				detail: "Obstarávacia cena majetku."
			},
			datePurchased: {
				name: "dátum_nákupu",
				detail: "Dátum nákupu majetku."
			},
			firstPeriod: {
				name: "prvé_obdobie",
				detail: "Dátum konca prvého obdobia."
			},
			salvage: {
				name: "zostatková_hodnota",
				detail: "Zostatková hodnota na konci životnosti majetku."
			},
			period: {
				name: "obdobie",
				detail: "Obdobie."
			},
			rate: {
				name: "sadzba",
				detail: "Sadzba odpisovania."
			},
			basis: {
				name: "základ",
				detail: "Základ roka, ktorý sa má použiť."
			}
		}
	},
	COUPDAYBS: {
		description: "Vracia počet dní od začiatku kupónového obdobia po dátum vysporiadania",
		abstract: "Vracia počet dní od začiatku kupónového obdobia po dátum vysporiadania",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/coupdaybs-function"
		}],
		functionParameter: {
			settlement: {
				name: "dátum_vysporiadania",
				detail: "Dátum vysporiadania cenného papiera."
			},
			maturity: {
				name: "dátum_splatnosti",
				detail: "Dátum splatnosti cenného papiera."
			},
			frequency: {
				name: "frekvencia",
				detail: "Počet kupónových platieb za rok."
			},
			basis: {
				name: "základ",
				detail: "Typ základu počtu dní, ktorý sa má použiť."
			}
		}
	},
	COUPDAYS: {
		description: "Vracia počet dní v kupónovom období, ktoré obsahuje dátum vysporiadania",
		abstract: "Vracia počet dní v kupónovom období, ktoré obsahuje dátum vysporiadania",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/coupdays-function"
		}],
		functionParameter: {
			settlement: {
				name: "dátum_vysporiadania",
				detail: "Dátum vysporiadania cenného papiera."
			},
			maturity: {
				name: "dátum_splatnosti",
				detail: "Dátum splatnosti cenného papiera."
			},
			frequency: {
				name: "frekvencia",
				detail: "Počet kupónových platieb za rok."
			},
			basis: {
				name: "základ",
				detail: "Typ základu počtu dní, ktorý sa má použiť."
			}
		}
	},
	COUPDAYSNC: {
		description: "Vracia počet dní od dátumu vysporiadania do ďalšieho kupónového dátumu",
		abstract: "Vracia počet dní od dátumu vysporiadania do ďalšieho kupónového dátumu",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/coupdaysnc-function"
		}],
		functionParameter: {
			settlement: {
				name: "dátum_vysporiadania",
				detail: "Dátum vysporiadania cenného papiera."
			},
			maturity: {
				name: "dátum_splatnosti",
				detail: "Dátum splatnosti cenného papiera."
			},
			frequency: {
				name: "frekvencia",
				detail: "Počet kupónových platieb za rok."
			},
			basis: {
				name: "základ",
				detail: "Typ základu počtu dní, ktorý sa má použiť."
			}
		}
	},
	COUPNCD: {
		description: "Vracia nasledujúci kupónový dátum po dátume vysporiadania",
		abstract: "Vracia nasledujúci kupónový dátum po dátume vysporiadania",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/coupncd-function"
		}],
		functionParameter: {
			settlement: {
				name: "dátum_vysporiadania",
				detail: "Dátum vysporiadania cenného papiera."
			},
			maturity: {
				name: "dátum_splatnosti",
				detail: "Dátum splatnosti cenného papiera."
			},
			frequency: {
				name: "frekvencia",
				detail: "Počet kupónových platieb za rok."
			},
			basis: {
				name: "základ",
				detail: "Typ základu počtu dní, ktorý sa má použiť."
			}
		}
	},
	COUPNUM: {
		description: "Vracia počet kupónov splatných medzi dátumom vysporiadania a dátumom splatnosti",
		abstract: "Vracia počet kupónov splatných medzi dátumom vysporiadania a dátumom splatnosti",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/coupnum-function"
		}],
		functionParameter: {
			settlement: {
				name: "dátum_vysporiadania",
				detail: "Dátum vysporiadania cenného papiera."
			},
			maturity: {
				name: "dátum_splatnosti",
				detail: "Dátum splatnosti cenného papiera."
			},
			frequency: {
				name: "frekvencia",
				detail: "Počet kupónových platieb za rok."
			},
			basis: {
				name: "základ",
				detail: "Typ základu počtu dní, ktorý sa má použiť."
			}
		}
	},
	COUPPCD: {
		description: "Vracia predchádzajúci kupónový dátum pred dátumom vysporiadania",
		abstract: "Vracia predchádzajúci kupónový dátum pred dátumom vysporiadania",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/couppcd-function"
		}],
		functionParameter: {
			settlement: {
				name: "dátum_vysporiadania",
				detail: "Dátum vysporiadania cenného papiera."
			},
			maturity: {
				name: "dátum_splatnosti",
				detail: "Dátum splatnosti cenného papiera."
			},
			frequency: {
				name: "frekvencia",
				detail: "Počet kupónových platieb za rok."
			},
			basis: {
				name: "základ",
				detail: "Typ základu počtu dní, ktorý sa má použiť."
			}
		}
	},
	CUMIPMT: {
		description: "Vracia kumulatívny zaplatený úrok medzi dvoma obdobiami",
		abstract: "Vracia kumulatívny zaplatený úrok medzi dvoma obdobiami",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/cumipmt-function"
		}],
		functionParameter: {
			rate: {
				name: "sadzba",
				detail: "Úroková sadzba."
			},
			nper: {
				name: "počet_období",
				detail: "Celkový počet platobných období."
			},
			pv: {
				name: "súčasná_hodnota",
				detail: "Súčasná hodnota."
			},
			startPeriod: {
				name: "začiatočné_obdobie",
				detail: "Prvé obdobie vo výpočte. Platobné obdobia sú očíslované od 1."
			},
			endPeriod: {
				name: "koncové_obdobie",
				detail: "Posledné obdobie vo výpočte."
			},
			type: {
				name: "typ",
				detail: "Časovanie platby."
			}
		}
	},
	CUMPRINC: {
		description: "Vracia kumulatívnu istinu zaplatenú na úvere medzi dvoma obdobiami",
		abstract: "Vracia kumulatívnu istinu zaplatenú na úvere medzi dvoma obdobiami",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/cumprinc-function"
		}],
		functionParameter: {
			rate: {
				name: "sadzba",
				detail: "Úroková sadzba."
			},
			nper: {
				name: "počet_období",
				detail: "Celkový počet platobných období."
			},
			pv: {
				name: "súčasná_hodnota",
				detail: "Súčasná hodnota."
			},
			startPeriod: {
				name: "začiatočné_obdobie",
				detail: "Prvé obdobie vo výpočte. Platobné obdobia sú očíslované od 1."
			},
			endPeriod: {
				name: "koncové_obdobie",
				detail: "Posledné obdobie vo výpočte."
			},
			type: {
				name: "typ",
				detail: "Časovanie platby."
			}
		}
	},
	DB: {
		description: "Vracia odpisy majetku za zadané obdobie pomocou metódy pevne klesajúceho zostatku",
		abstract: "Vracia odpisy majetku za zadané obdobie pomocou metódy pevne klesajúceho zostatku",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/db-function"
		}],
		functionParameter: {
			cost: {
				name: "obstarávacia_cena",
				detail: "Počiatočná cena majetku."
			},
			salvage: {
				name: "zostatková_hodnota",
				detail: "Hodnota na konci odpisovania (niekedy nazývaná zostatková hodnota majetku)."
			},
			life: {
				name: "životnosť",
				detail: "Počet období, počas ktorých sa majetok odpisuje (užitočná životnosť majetku)."
			},
			period: {
				name: "obdobie",
				detail: "Obdobie, za ktoré chcete vypočítať odpisy."
			},
			month: {
				name: "mesiac",
				detail: "Počet mesiacov v prvom roku. Ak sa mesiac vynechá, predpokladá sa 12."
			}
		}
	},
	DDB: {
		description: "Vracia odpisy majetku za zadané obdobie pomocou metódy dvojnásobne klesajúceho zostatku alebo inej metódy, ktorú zadáte",
		abstract: "Vracia odpisy majetku za zadané obdobie pomocou metódy dvojnásobne klesajúceho zostatku alebo inej metódy, ktorú zadáte",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/ddb-function"
		}],
		functionParameter: {
			cost: {
				name: "obstarávacia_cena",
				detail: "Počiatočná cena majetku."
			},
			salvage: {
				name: "zostatková_hodnota",
				detail: "Hodnota na konci odpisovania (niekedy nazývaná zostatková hodnota majetku)."
			},
			life: {
				name: "životnosť",
				detail: "Počet období, počas ktorých sa majetok odpisuje (užitočná životnosť majetku)."
			},
			period: {
				name: "obdobie",
				detail: "Obdobie, za ktoré chcete vypočítať odpisy."
			},
			factor: {
				name: "faktor",
				detail: "Sadzba, akou zostatok klesá. Ak je faktor vynechaný, predpokladá sa 2 (metóda dvojnásobne klesajúceho zostatku)."
			}
		}
	},
	DISC: {
		description: "Vracia diskontnú sadzbu pre cenný papier",
		abstract: "Vracia diskontnú sadzbu pre cenný papier",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/disc-function"
		}],
		functionParameter: {
			settlement: {
				name: "dátum_vysporiadania",
				detail: "Dátum vysporiadania cenného papiera."
			},
			maturity: {
				name: "dátum_splatnosti",
				detail: "Dátum splatnosti cenného papiera."
			},
			pr: {
				name: "cena",
				detail: "Cena cenného papiera na 100 $ menovitej hodnoty."
			},
			redemption: {
				name: "výkupná_hodnota",
				detail: "Výkupná hodnota cenného papiera na 100 $ menovitej hodnoty."
			},
			basis: {
				name: "základ",
				detail: "Typ základu počtu dní, ktorý sa má použiť."
			}
		}
	},
	DOLLARDE: {
		description: "Konvertuje dolárovú cenu vyjadrenú ako zlomok na dolárovú cenu vyjadrenú ako desatinné číslo",
		abstract: "Konvertuje dolárovú cenu vyjadrenú ako zlomok na dolárovú cenu vyjadrenú ako desatinné číslo",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/dollarde-function"
		}],
		functionParameter: {
			fractionalDollar: {
				name: "zlomkový_dolár",
				detail: "Číslo vyjadrené ako celá časť a zlomková časť, oddelené desatinným symbolom."
			},
			fraction: {
				name: "zlomok",
				detail: "Celé číslo použité v menovateli zlomku."
			}
		}
	},
	DOLLARFR: {
		description: "Konvertuje dolárovú cenu vyjadrenú ako desatinné číslo na dolárovú cenu vyjadrenú ako zlomok",
		abstract: "Konvertuje dolárovú cenu vyjadrenú ako desatinné číslo na dolárovú cenu vyjadrenú ako zlomok",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/dollarfr-function"
		}],
		functionParameter: {
			decimalDollar: {
				name: "desatinný_dolár",
				detail: "Desatinné číslo."
			},
			fraction: {
				name: "zlomok",
				detail: "Celé číslo použité v menovateli zlomku."
			}
		}
	},
	DURATION: {
		description: "Vracia ročnú duráciu cenného papiera s periodickými úrokovými platbami",
		abstract: "Vracia ročnú duráciu cenného papiera s periodickými úrokovými platbami",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/duration-function"
		}],
		functionParameter: {
			settlement: {
				name: "dátum_vysporiadania",
				detail: "Dátum vysporiadania cenného papiera."
			},
			maturity: {
				name: "dátum_splatnosti",
				detail: "Dátum splatnosti cenného papiera."
			},
			coupon: {
				name: "kupón",
				detail: "Ročná kupónová sadzba cenného papiera."
			},
			yld: {
				name: "výnos",
				detail: "Ročný výnos cenného papiera."
			},
			frequency: {
				name: "frekvencia",
				detail: "Počet kupónových platieb za rok."
			},
			basis: {
				name: "základ",
				detail: "Typ základu počtu dní, ktorý sa má použiť."
			}
		}
	},
	EFFECT: {
		description: "Vracia efektívnu ročnú úrokovú sadzbu",
		abstract: "Vracia efektívnu ročnú úrokovú sadzbu",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/effect-function"
		}],
		functionParameter: {
			nominalRate: {
				name: "nominálna_sadzba",
				detail: "Nominálna úroková sadzba."
			},
			npery: {
				name: "období_za_rok",
				detail: "Počet kapitalizačných období za rok."
			}
		}
	},
	FV: {
		description: "Funkcia FV , jedna z finančných funkcií , vypočíta budúcu hodnotu investície na základe konštantnej úrokovej sadzby. Funkciu FV môžete použiť pri pravidelných konštantných platbách alebo pri jednorazovej platbe.",
		abstract: "Funkcia FV , jedna z finančných funkcií , vypočíta budúcu hodnotu investície na základe konštantnej úrokovej sadzby. Funkciu FV môžete použiť pri pravidelných konštantných platbách alebo pri jednorazovej platbe.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/fv-function"
		}],
		functionParameter: {
			rate: {
				name: "sadzba",
				detail: "Povinné. Úroková sadzba za dané obdobie."
			},
			nper: {
				name: "počet_období",
				detail: "Povinné. Celkový počet platobných období v danom intervale."
			},
			pmt: {
				name: "splátka",
				detail: "Povinné. Platba (splátka) uskutočnená v jednotlivých obdobiach, ktorá sa nemení počas daného intervalu. V typickom prípade splátka obsahuje hodnotu istiny a úrokov, ale neobsahuje iné poplatky ani dane. Ak sa argument plt vynechá, musíte zadať argument sh."
			},
			pv: {
				name: "súčasná_hodnota",
				detail: "Voliteľný argument. Súčasná hodnota, čiže celková čiastka, určujúca súčasnú hodnotu budúcich platieb. Ak sa tento argument vynechá, predpokladá sa, že má hodnotu 0 (nula) a musíte zadať argument plt."
			},
			type: {
				name: "typ",
				detail: "Voliteľný argument. Číslo 0 alebo 1, ktoré vyjadruje, kedy sú sumy splatné. Ak sa tento argument vynechá, predpokladá sa, že má hodnotu 0."
			}
		}
	},
	FVSCHEDULE: {
		description: "Vráti budúcu hodnotu začiatočnej istiny po priradení série zložených úrokových sadzieb. Funkcia FVSCHEDULE sa používa na výpočet budúcej hodnoty investície s premennou alebo nastaviteľnou sadzbou.",
		abstract: "Vráti budúcu hodnotu začiatočnej istiny po priradení série zložených úrokových sadzieb. Funkcia FVSCHEDULE sa používa na výpočet budúcej hodnoty investície s premennou alebo nastaviteľnou sadzbou.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/fvschedule-function"
		}],
		functionParameter: {
			principal: {
				name: "istina",
				detail: "Povinné. Súčasná hodnota."
			},
			schedule: {
				name: "rozpis",
				detail: "Povinné. Séria zložených úrokových sadzieb."
			}
		}
	},
	INTRATE: {
		description: "Vráti úrokovú sadzbu plne investovaného cenného papiera.",
		abstract: "Vráti úrokovú sadzbu plne investovaného cenného papiera.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/intrate-function"
		}],
		functionParameter: {
			settlement: {
				name: "dátum_vysporiadania",
				detail: "Povinné. Dátum vyrovnania cenného papiera. Dátum vyrovnania cenného papiera je dátum predaja cenného papiera klientovi. Musí byť neskorší než dátum emisie."
			},
			maturity: {
				name: "dátum_splatnosti",
				detail: "Povinné. Dátum splatnosti cenného papiera. Je to dátum, keď sa končí platnosť cenného papiera."
			},
			investment: {
				name: "investícia",
				detail: "Povinné. Suma investovaná do cenného papiera."
			},
			redemption: {
				name: "výkupná_hodnota",
				detail: "Povinné. Zaručená cena cenného papiera pri splatnosti."
			},
			basis: {
				name: "základ",
				detail: "Voliteľný argument. Typ denného základu, ktorý chcete použiť."
			}
		}
	},
	IPMT: {
		description: "Vypočíta výšku platby úroku v určitom úrokovom období pri pravidelných konštantných splátkach a konštantnej úrokovej sadzbe.",
		abstract: "Vypočíta výšku platby úroku v určitom úrokovom období pri pravidelných konštantných splátkach a konštantnej úrokovej sadzbe.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/ipmt-function"
		}],
		functionParameter: {
			rate: {
				name: "sadzba",
				detail: "Povinné. Úroková sadzba za dané obdobie."
			},
			per: {
				name: "obdobie",
				detail: "Povinné. Obdobie, pre ktoré chcete vypočítať úrok. Musí byť v intervale od 1 do hodnoty argumentu pobd."
			},
			nper: {
				name: "počet_období",
				detail: "Povinné. Celkový počet platobných období v danom intervale."
			},
			pv: {
				name: "súčasná_hodnota",
				detail: "Povinné. Súčasná hodnota, čiže celková čiastka určujúca súčasnú hodnotu budúcich platieb."
			},
			fv: {
				name: "budúca_hodnota",
				detail: "Voliteľný argument. Budúca hodnota alebo hotovostný zostatok, ktorý chcete dosiahnuť po zaplatení poslednej platby. Ak je tento argument vynechaný, predpokladá sa, že má hodnotu 0 (budúca hodnota pôžičky pre uvedený príklad je 0)."
			},
			type: {
				name: "typ",
				detail: "Voliteľný argument. Číslo 0 alebo 1, ktoré vyjadruje, kedy sú sumy splatné. Ak sa tento argument vynechá, predpokladá sa, že má hodnotu 0."
			}
		}
	},
	IRR: {
		description: "Vracia vnútornú mieru návratnosti pre sériu peňažných tokov",
		abstract: "Vracia vnútornú mieru návratnosti pre sériu peňažných tokov",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/irr-function"
		}],
		functionParameter: {
			values: {
				name: "hodnoty",
				detail: "Pole alebo odkaz na bunky, ktoré obsahujú čísla, pre ktoré chcete vypočítať vnútornú mieru návratnosti.\n1.Hodnoty musia obsahovať aspoň jednu kladnú a jednu zápornú hodnotu, aby sa dala vypočítať vnútorná miera návratnosti.\n2.IRR používa poradie hodnôt na interpretáciu poradia peňažných tokov. Uistite sa, že zadáte hodnoty platieb a príjmov v požadovanom poradí.\n3.Ak pole alebo argument odkazu obsahuje text, logické hodnoty alebo prázdne bunky, tieto hodnoty sa ignorujú."
			},
			guess: {
				name: "odhad",
				detail: "Číslo, ktoré odhadujete ako blízke výsledku IRR."
			}
		}
	},
	ISPMT: {
		description: "Vypočíta úrok zaplatený počas konkrétneho obdobia investície",
		abstract: "Vypočíta úrok zaplatený počas konkrétneho obdobia investície",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/ispmt-function"
		}],
		functionParameter: {
			rate: {
				name: "sadzba",
				detail: "Úroková sadzba investície."
			},
			per: {
				name: "obdobie",
				detail: "Obdobie, pre ktoré chcete zistiť úrok, a musí byť medzi 1 a nper."
			},
			nper: {
				name: "počet_období",
				detail: "Celkový počet platobných období investície."
			},
			pv: {
				name: "súčasná_hodnota",
				detail: "Súčasná hodnota investície. Pri úvere je pv výška úveru."
			}
		}
	},
	MDURATION: {
		description: "Vracia modifikovanú Macaulayho duráciu pre cenný papier s predpokladanou menovitou hodnotou 100 $",
		abstract: "Vracia modifikovanú Macaulayho duráciu pre cenný papier s predpokladanou menovitou hodnotou 100 $",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/mduration-function"
		}],
		functionParameter: {
			settlement: {
				name: "dátum_vysporiadania",
				detail: "Dátum vysporiadania cenného papiera."
			},
			maturity: {
				name: "dátum_splatnosti",
				detail: "Dátum splatnosti cenného papiera."
			},
			coupon: {
				name: "kupón",
				detail: "Ročná kupónová sadzba cenného papiera."
			},
			yld: {
				name: "výnos",
				detail: "Ročný výnos cenného papiera."
			},
			frequency: {
				name: "frekvencia",
				detail: "Počet kupónových platieb za rok."
			},
			basis: {
				name: "základ",
				detail: "Typ základu počtu dní, ktorý sa má použiť."
			}
		}
	},
	MIRR: {
		description: "Vracia vnútornú mieru návratnosti, pri ktorej sú kladné a záporné peňažné toky financované rôznymi sadzbami",
		abstract: "Vracia vnútornú mieru návratnosti, pri ktorej sú kladné a záporné peňažné toky financované rôznymi sadzbami",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/mirr-function"
		}],
		functionParameter: {
			values: {
				name: "hodnoty",
				detail: "Pole alebo odkaz na bunky, ktoré obsahujú čísla. Tieto čísla predstavujú sériu platieb (záporné hodnoty) a príjmov (kladné hodnoty) v pravidelných obdobiach.\n1.Hodnoty musia obsahovať aspoň jednu kladnú a jednu zápornú hodnotu, aby sa dala vypočítať modifikovaná vnútorná miera návratnosti. Inak MIRR vráti chybu #DIV/0!.\n2.Ak pole alebo argument odkazu obsahuje text, logické hodnoty alebo prázdne bunky, tieto hodnoty sa ignorujú; bunky s hodnotou nula sa však zahrnú."
			},
			financeRate: {
				name: "finančná_sadzba",
				detail: "Úroková sadzba, ktorú platíte za peniaze použité v peňažných tokoch."
			},
			reinvestRate: {
				name: "reinvestičná_sadzba",
				detail: "Úroková sadzba, ktorú získate z peňažných tokov pri ich reinvestovaní."
			}
		}
	},
	NOMINAL: {
		description: "Vracia ročnú nominálnu úrokovú sadzbu",
		abstract: "Vracia ročnú nominálnu úrokovú sadzbu",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/nominal-function"
		}],
		functionParameter: {
			effectRate: {
				name: "efektívna_sadzba",
				detail: "Efektívna úroková sadzba."
			},
			npery: {
				name: "období_za_rok",
				detail: "Počet kapitalizačných období za rok."
			}
		}
	},
	NPER: {
		description: "Vracia počet období pre investíciu",
		abstract: "Vracia počet období pre investíciu",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/nper-function"
		}],
		functionParameter: {
			rate: {
				name: "sadzba",
				detail: "Úroková sadzba na obdobie."
			},
			pmt: {
				name: "splátka",
				detail: "Platba vykonaná v každom období; počas životnosti anuity sa nemôže meniť."
			},
			pv: {
				name: "súčasná_hodnota",
				detail: "Súčasná hodnota, alebo jednorazová suma, ktorú má séria budúcich platieb dnes."
			},
			fv: {
				name: "budúca_hodnota",
				detail: "Budúca hodnota, alebo hotovostný zostatok, ktorý chcete dosiahnuť po poslednej platbe."
			},
			type: {
				name: "typ",
				detail: "Číslo 0 alebo 1 a určuje, kedy sú platby splatné."
			}
		}
	},
	NPV: {
		description: "Vracia čistú súčasnú hodnotu investície na základe série periodických peňažných tokov a diskontnej sadzby",
		abstract: "Vracia čistú súčasnú hodnotu investície na základe série periodických peňažných tokov a diskontnej sadzby",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/npv-function"
		}],
		functionParameter: {
			rate: {
				name: "sadzba",
				detail: "Diskontná sadzba počas jedného obdobia."
			},
			value1: {
				name: "hodnota1",
				detail: "1 až 254 argumentov predstavujúcich platby a príjmy."
			},
			value2: {
				name: "hodnota2",
				detail: "1 až 254 argumentov predstavujúcich platby a príjmy."
			}
		}
	},
	ODDFPRICE: {
		description: "Vracia cenu na 100 $ menovitej hodnoty cenného papiera s nepravidelným prvým obdobím",
		abstract: "Vracia cenu na 100 $ menovitej hodnoty cenného papiera s nepravidelným prvým obdobím",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/oddfprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "dátum_vysporiadania",
				detail: "Dátum vysporiadania cenného papiera."
			},
			maturity: {
				name: "dátum_splatnosti",
				detail: "Dátum splatnosti cenného papiera."
			},
			issue: {
				name: "dátum_emisie",
				detail: "Dátum emisie cenného papiera."
			},
			firstCoupon: {
				name: "prvý_kupón",
				detail: "Dátum prvého kupónu cenného papiera."
			},
			rate: {
				name: "sadzba",
				detail: "Úroková sadzba cenného papiera."
			},
			yld: {
				name: "výnos",
				detail: "Ročný výnos cenného papiera."
			},
			redemption: {
				name: "výkupná_hodnota",
				detail: "Výkupná hodnota cenného papiera na 100 $ menovitej hodnoty."
			},
			frequency: {
				name: "frekvencia",
				detail: "Počet kupónových platieb za rok. Pre ročné platby frekvencia = 1; pre polročné frekvencia = 2; pre štvrťročné frekvencia = 4."
			},
			basis: {
				name: "základ",
				detail: "Typ základu počtu dní, ktorý sa má použiť."
			}
		}
	},
	ODDFYIELD: {
		description: "Vracia výnos cenného papiera s nepravidelným prvým obdobím",
		abstract: "Vracia výnos cenného papiera s nepravidelným prvým obdobím",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/oddfyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "dátum_vysporiadania",
				detail: "Dátum vysporiadania cenného papiera."
			},
			maturity: {
				name: "dátum_splatnosti",
				detail: "Dátum splatnosti cenného papiera."
			},
			issue: {
				name: "dátum_emisie",
				detail: "Dátum emisie cenného papiera."
			},
			firstCoupon: {
				name: "prvý_kupón",
				detail: "Dátum prvého kupónu cenného papiera."
			},
			rate: {
				name: "sadzba",
				detail: "Úroková sadzba cenného papiera."
			},
			pr: {
				name: "cena",
				detail: "Cena cenného papiera."
			},
			redemption: {
				name: "výkupná_hodnota",
				detail: "Výkupná hodnota cenného papiera na 100 $ menovitej hodnoty."
			},
			frequency: {
				name: "frekvencia",
				detail: "Počet kupónových platieb za rok. Pre ročné platby frekvencia = 1; pre polročné frekvencia = 2; pre štvrťročné frekvencia = 4."
			},
			basis: {
				name: "základ",
				detail: "Typ základu počtu dní, ktorý sa má použiť."
			}
		}
	},
	ODDLPRICE: {
		description: "Vracia cenu na 100 $ menovitej hodnoty cenného papiera s nepravidelným posledným obdobím",
		abstract: "Vracia cenu na 100 $ menovitej hodnoty cenného papiera s nepravidelným posledným obdobím",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/oddlprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "dátum_vysporiadania",
				detail: "Dátum vysporiadania cenného papiera."
			},
			maturity: {
				name: "dátum_splatnosti",
				detail: "Dátum splatnosti cenného papiera."
			},
			lastInterest: {
				name: "posledný_kupón",
				detail: "Dátum posledného kupónu cenného papiera."
			},
			rate: {
				name: "sadzba",
				detail: "Úroková sadzba cenného papiera."
			},
			yld: {
				name: "výnos",
				detail: "Ročný výnos cenného papiera."
			},
			redemption: {
				name: "výkupná_hodnota",
				detail: "Výkupná hodnota cenného papiera na 100 $ menovitej hodnoty."
			},
			frequency: {
				name: "frekvencia",
				detail: "Počet kupónových platieb za rok. Pre ročné platby frekvencia = 1; pre polročné frekvencia = 2; pre štvrťročné frekvencia = 4."
			},
			basis: {
				name: "základ",
				detail: "Typ základu počtu dní, ktorý sa má použiť."
			}
		}
	},
	ODDLYIELD: {
		description: "Vracia výnos cenného papiera s nepravidelným posledným obdobím",
		abstract: "Vracia výnos cenného papiera s nepravidelným posledným obdobím",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/oddlyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "dátum_vysporiadania",
				detail: "Dátum vysporiadania cenného papiera."
			},
			maturity: {
				name: "dátum_splatnosti",
				detail: "Dátum splatnosti cenného papiera."
			},
			lastInterest: {
				name: "posledný_kupón",
				detail: "Dátum posledného kupónu cenného papiera."
			},
			rate: {
				name: "sadzba",
				detail: "Úroková sadzba cenného papiera."
			},
			pr: {
				name: "cena",
				detail: "Cena cenného papiera."
			},
			redemption: {
				name: "výkupná_hodnota",
				detail: "Výkupná hodnota cenného papiera na 100 $ menovitej hodnoty."
			},
			frequency: {
				name: "frekvencia",
				detail: "Počet kupónových platieb za rok. Pre ročné platby frekvencia = 1; pre polročné frekvencia = 2; pre štvrťročné frekvencia = 4."
			},
			basis: {
				name: "základ",
				detail: "Typ základu počtu dní, ktorý sa má použiť."
			}
		}
	},
	PDURATION: {
		description: "Vracia počet období potrebných, aby investícia dosiahla zadanú hodnotu",
		abstract: "Vracia počet období potrebných, aby investícia dosiahla zadanú hodnotu",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/pduration-function"
		}],
		functionParameter: {
			rate: {
				name: "sadzba",
				detail: "Sadzba je úroková sadzba na obdobie."
			},
			pv: {
				name: "súčasná_hodnota",
				detail: "Pv je súčasná hodnota investície."
			},
			fv: {
				name: "budúca_hodnota",
				detail: "Fv je požadovaná budúca hodnota investície."
			}
		}
	},
	PMT: {
		description: "Vracia periodickú platbu pre anuitu",
		abstract: "Vracia periodickú platbu pre anuitu",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/pmt-function"
		}],
		functionParameter: {
			rate: {
				name: "sadzba",
				detail: "Úroková sadzba na obdobie."
			},
			nper: {
				name: "počet_období",
				detail: "Celkový počet platobných období v anuite."
			},
			pv: {
				name: "súčasná_hodnota",
				detail: "Súčasná hodnota, alebo jednorazová suma, ktorú má séria budúcich platieb dnes."
			},
			fv: {
				name: "budúca_hodnota",
				detail: "Budúca hodnota, alebo hotovostný zostatok, ktorý chcete dosiahnuť po poslednej platbe."
			},
			type: {
				name: "typ",
				detail: "Číslo 0 alebo 1 a určuje, kedy sú platby splatné."
			}
		}
	},
	PPMT: {
		description: "Vracia platbu na istinu za investíciu pre zadané obdobie",
		abstract: "Vracia platbu na istinu za investíciu pre zadané obdobie",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/ppmt-function"
		}],
		functionParameter: {
			rate: {
				name: "sadzba",
				detail: "Úroková sadzba na obdobie."
			},
			per: {
				name: "obdobie",
				detail: "Obdobie, pre ktoré chcete zistiť úrok, a musí byť v rozsahu 1 až nper."
			},
			nper: {
				name: "počet_období",
				detail: "Celkový počet platobných období v anuite."
			},
			pv: {
				name: "súčasná_hodnota",
				detail: "Súčasná hodnota, alebo jednorazová suma, ktorú má séria budúcich platieb dnes."
			},
			fv: {
				name: "budúca_hodnota",
				detail: "Budúca hodnota, alebo hotovostný zostatok, ktorý chcete dosiahnuť po poslednej platbe."
			},
			type: {
				name: "typ",
				detail: "Číslo 0 alebo 1 a určuje, kedy sú platby splatné."
			}
		}
	},
	PRICE: {
		description: "Vracia cenu na 100 $ menovitej hodnoty cenného papiera, ktorý vypláca periodický úrok",
		abstract: "Vracia cenu na 100 $ menovitej hodnoty cenného papiera, ktorý vypláca periodický úrok",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/price-function"
		}],
		functionParameter: {
			settlement: {
				name: "dátum_vysporiadania",
				detail: "Dátum vysporiadania cenného papiera."
			},
			maturity: {
				name: "dátum_splatnosti",
				detail: "Dátum splatnosti cenného papiera."
			},
			rate: {
				name: "sadzba",
				detail: "Úroková sadzba cenného papiera."
			},
			yld: {
				name: "výnos",
				detail: "Ročný výnos cenného papiera."
			},
			redemption: {
				name: "výkupná_hodnota",
				detail: "Výkupná hodnota cenného papiera na 100 $ menovitej hodnoty."
			},
			frequency: {
				name: "frekvencia",
				detail: "Počet kupónových platieb za rok. Pre ročné platby frekvencia = 1; pre polročné frekvencia = 2; pre štvrťročné frekvencia = 4."
			},
			basis: {
				name: "základ",
				detail: "Typ základu počtu dní, ktorý sa má použiť."
			}
		}
	},
	PRICEDISC: {
		description: "Vracia cenu na 100 $ menovitej hodnoty diskontovaného cenného papiera",
		abstract: "Vracia cenu na 100 $ menovitej hodnoty diskontovaného cenného papiera",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/pricedisc-function"
		}],
		functionParameter: {
			settlement: {
				name: "dátum_vysporiadania",
				detail: "Dátum vysporiadania cenného papiera."
			},
			maturity: {
				name: "dátum_splatnosti",
				detail: "Dátum splatnosti cenného papiera."
			},
			discount: {
				name: "diskont",
				detail: "Diskontná sadzba cenného papiera."
			},
			redemption: {
				name: "výkupná_hodnota",
				detail: "Výkupná hodnota cenného papiera na 100 $ menovitej hodnoty."
			},
			basis: {
				name: "základ",
				detail: "Typ základu počtu dní, ktorý sa má použiť."
			}
		}
	},
	PRICEMAT: {
		description: "Vracia cenu na 100 $ menovitej hodnoty cenného papiera, ktorý vypláca úrok pri splatnosti",
		abstract: "Vracia cenu na 100 $ menovitej hodnoty cenného papiera, ktorý vypláca úrok pri splatnosti",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/pricemat-function"
		}],
		functionParameter: {
			settlement: {
				name: "dátum_vysporiadania",
				detail: "Dátum vysporiadania cenného papiera."
			},
			maturity: {
				name: "dátum_splatnosti",
				detail: "Dátum splatnosti cenného papiera."
			},
			issue: {
				name: "dátum_emisie",
				detail: "Dátum emisie cenného papiera."
			},
			rate: {
				name: "sadzba",
				detail: "Úroková sadzba cenného papiera."
			},
			yld: {
				name: "výnos",
				detail: "Ročný výnos cenného papiera."
			},
			basis: {
				name: "základ",
				detail: "Typ základu počtu dní, ktorý sa má použiť."
			}
		}
	},
	PV: {
		description: "Vracia súčasnú hodnotu investície",
		abstract: "Vracia súčasnú hodnotu investície",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/pv-function"
		}],
		functionParameter: {
			rate: {
				name: "sadzba",
				detail: "Úroková sadzba na obdobie."
			},
			nper: {
				name: "počet_období",
				detail: "Celkový počet platobných období v anuite."
			},
			pmt: {
				name: "splátka",
				detail: "Platba vykonaná v každom období; počas životnosti anuity sa nemôže meniť."
			},
			fv: {
				name: "budúca_hodnota",
				detail: "Budúca hodnota, alebo hotovostný zostatok, ktorý chcete dosiahnuť po poslednej platbe."
			},
			type: {
				name: "typ",
				detail: "Číslo 0 alebo 1 a určuje, kedy sú platby splatné."
			}
		}
	},
	RATE: {
		description: "Vracia úrokovú sadzbu na obdobie anuity",
		abstract: "Vracia úrokovú sadzbu na obdobie anuity",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/rate-function"
		}],
		functionParameter: {
			nper: {
				name: "počet_období",
				detail: "Celkový počet platobných období v anuite."
			},
			pmt: {
				name: "splátka",
				detail: "Platba vykonaná v každom období; počas životnosti anuity sa nemôže meniť."
			},
			pv: {
				name: "súčasná_hodnota",
				detail: "Súčasná hodnota, alebo jednorazová suma, ktorú má séria budúcich platieb dnes."
			},
			fv: {
				name: "budúca_hodnota",
				detail: "Budúca hodnota, alebo hotovostný zostatok, ktorý chcete dosiahnuť po poslednej platbe."
			},
			type: {
				name: "typ",
				detail: "Číslo 0 alebo 1 a určuje, kedy sú platby splatné."
			},
			guess: {
				name: "odhad",
				detail: "Váš odhad, aká bude sadzba."
			}
		}
	},
	RECEIVED: {
		description: "Vracia sumu prijatú pri splatnosti pre plne investovaný cenný papier",
		abstract: "Vracia sumu prijatú pri splatnosti pre plne investovaný cenný papier",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/received-function"
		}],
		functionParameter: {
			settlement: {
				name: "dátum_vysporiadania",
				detail: "Dátum vysporiadania cenného papiera."
			},
			maturity: {
				name: "dátum_splatnosti",
				detail: "Dátum splatnosti cenného papiera."
			},
			investment: {
				name: "investícia",
				detail: "Suma investovaná do cenného papiera."
			},
			discount: {
				name: "diskont",
				detail: "Diskontná sadzba cenného papiera."
			},
			basis: {
				name: "základ",
				detail: "Typ základu počtu dní, ktorý sa má použiť."
			}
		}
	},
	RRI: {
		description: "Vracia ekvivalentnú úrokovú sadzbu pre rast investície",
		abstract: "Vracia ekvivalentnú úrokovú sadzbu pre rast investície",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/rri-function"
		}],
		functionParameter: {
			nper: {
				name: "počet_období",
				detail: "Nper je počet období investície."
			},
			pv: {
				name: "súčasná_hodnota",
				detail: "Pv je súčasná hodnota investície."
			},
			fv: {
				name: "budúca_hodnota",
				detail: "Fv je budúca hodnota investície."
			}
		}
	},
	SLN: {
		description: "Vracia lineárny odpis majetku za jedno obdobie",
		abstract: "Vracia lineárny odpis majetku za jedno obdobie",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/sln-function"
		}],
		functionParameter: {
			cost: {
				name: "obstarávacia_cena",
				detail: "Počiatočná cena majetku."
			},
			salvage: {
				name: "zostatková_hodnota",
				detail: "Hodnota na konci odpisovania (niekedy nazývaná zostatková hodnota majetku)."
			},
			life: {
				name: "životnosť",
				detail: "Počet období, počas ktorých sa majetok odpisuje (užitočná životnosť majetku)."
			}
		}
	},
	SYD: {
		description: "Vracia odpis podľa súčtu číslic rokov majetku za zadané obdobie",
		abstract: "Vracia odpis podľa súčtu číslic rokov majetku za zadané obdobie",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/syd-function"
		}],
		functionParameter: {
			cost: {
				name: "obstarávacia_cena",
				detail: "Počiatočná cena majetku."
			},
			salvage: {
				name: "zostatková_hodnota",
				detail: "Hodnota na konci odpisovania (niekedy nazývaná zostatková hodnota majetku)."
			},
			life: {
				name: "životnosť",
				detail: "Počet období, počas ktorých sa majetok odpisuje (užitočná životnosť majetku)."
			},
			per: {
				name: "obdobie",
				detail: "Obdobie a musí používať rovnaké jednotky ako životnosť."
			}
		}
	},
	TBILLEQ: {
		description: "Vracia výnos ekvivalentný dlhopisu pre pokladničnú poukážku",
		abstract: "Vracia výnos ekvivalentný dlhopisu pre pokladničnú poukážku",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/tbilleq-function"
		}],
		functionParameter: {
			settlement: {
				name: "dátum_vysporiadania",
				detail: "Dátum vysporiadania pokladničnej poukážky."
			},
			maturity: {
				name: "dátum_splatnosti",
				detail: "Dátum splatnosti pokladničnej poukážky."
			},
			discount: {
				name: "diskont",
				detail: "Diskontná sadzba pokladničnej poukážky."
			}
		}
	},
	TBILLPRICE: {
		description: "Vracia cenu na 100 $ menovitej hodnoty pre pokladničnú poukážku",
		abstract: "Vracia cenu na 100 $ menovitej hodnoty pre pokladničnú poukážku",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/tbillprice-function"
		}],
		functionParameter: {
			settlement: {
				name: "dátum_vysporiadania",
				detail: "Dátum vysporiadania pokladničnej poukážky."
			},
			maturity: {
				name: "dátum_splatnosti",
				detail: "Dátum splatnosti pokladničnej poukážky."
			},
			discount: {
				name: "diskont",
				detail: "Diskontná sadzba pokladničnej poukážky."
			}
		}
	},
	TBILLYIELD: {
		description: "Vracia výnos pre pokladničnú poukážku",
		abstract: "Vracia výnos pre pokladničnú poukážku",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/tbillyield-function"
		}],
		functionParameter: {
			settlement: {
				name: "dátum_vysporiadania",
				detail: "Dátum vysporiadania pokladničnej poukážky."
			},
			maturity: {
				name: "dátum_splatnosti",
				detail: "Dátum splatnosti pokladničnej poukážky."
			},
			pr: {
				name: "cena",
				detail: "Cena pokladničnej poukážky na 100 $ menovitej hodnoty."
			}
		}
	},
	VDB: {
		description: "Vracia odpisy majetku za zadané alebo čiastočné obdobie pomocou metódy klesajúceho zostatku",
		abstract: "Vracia odpisy majetku za zadané alebo čiastočné obdobie pomocou metódy klesajúceho zostatku",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/vdb-function"
		}],
		functionParameter: {
			cost: {
				name: "obstarávacia_cena",
				detail: "Počiatočná cena majetku."
			},
			salvage: {
				name: "zostatková_hodnota",
				detail: "Hodnota na konci odpisovania (niekedy nazývaná zostatková hodnota majetku)."
			},
			life: {
				name: "životnosť",
				detail: "Počet období, počas ktorých sa majetok odpisuje (užitočná životnosť majetku)."
			},
			startPeriod: {
				name: "začiatočné_obdobie",
				detail: "Začiatočné obdobie, pre ktoré chcete vypočítať odpisy."
			},
			endPeriod: {
				name: "koncové_obdobie",
				detail: "Koncové obdobie, pre ktoré chcete vypočítať odpisy."
			},
			factor: {
				name: "faktor",
				detail: "Sadzba, akou zostatok klesá. Ak je faktor vynechaný, predpokladá sa 2 (metóda dvojnásobne klesajúceho zostatku)."
			},
			noSwitch: {
				name: "neprepínať",
				detail: "Logická hodnota určujúca, či sa má prepnúť na lineárne odpisovanie, keď je odpis vyšší ako výpočet metódou klesajúceho zostatku."
			}
		}
	},
	XIRR: {
		description: "Vracia vnútornú mieru návratnosti pre rozvrh peňažných tokov, ktorý nemusí byť periodický",
		abstract: "Vracia vnútornú mieru návratnosti pre rozvrh peňažných tokov, ktorý nemusí byť periodický",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/xirr-function"
		}],
		functionParameter: {
			values: {
				name: "hodnoty",
				detail: "Séria peňažných tokov, ktorá zodpovedá rozvrhu platieb podľa dátumov. Prvá platba je voliteľná a zodpovedá nákladu alebo platbe na začiatku investície. Ak je prvá hodnota náklad alebo platba, musí byť záporná. Všetky nasledujúce platby sú diskontované na základe 365-dňového roka. Séria hodnôt musí obsahovať aspoň jednu kladnú a jednu zápornú hodnotu."
			},
			dates: {
				name: "dátumy",
				detail: "Rozvrh dátumov platieb, ktorý zodpovedá peňažným tokom. Dátumy môžu byť v ľubovoľnom poradí."
			},
			guess: {
				name: "odhad",
				detail: "Číslo, ktoré odhadujete ako blízke výsledku XIRR."
			}
		}
	},
	XNPV: {
		description: "Vracia čistú súčasnú hodnotu pre rozvrh peňažných tokov, ktorý nemusí byť periodický",
		abstract: "Vracia čistú súčasnú hodnotu pre rozvrh peňažných tokov, ktorý nemusí byť periodický",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/xnpv-function"
		}],
		functionParameter: {
			rate: {
				name: "sadzba",
				detail: "Diskontná sadzba, ktorá sa má použiť na peňažné toky."
			},
			values: {
				name: "hodnoty",
				detail: "Séria peňažných tokov, ktorá zodpovedá rozvrhu platieb podľa dátumov. Prvá platba je voliteľná a zodpovedá nákladu alebo platbe na začiatku investície. Ak je prvá hodnota náklad alebo platba, musí byť záporná. Všetky nasledujúce platby sú diskontované na základe 365-dňového roka. Séria hodnôt musí obsahovať aspoň jednu kladnú a jednu zápornú hodnotu."
			},
			dates: {
				name: "dátumy",
				detail: "Rozvrh dátumov platieb, ktorý zodpovedá peňažným tokom. Dátumy môžu byť v ľubovoľnom poradí."
			}
		}
	},
	YIELD: {
		description: "Vracia výnos cenného papiera, ktorý vypláca periodický úrok",
		abstract: "Vracia výnos cenného papiera, ktorý vypláca periodický úrok",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/yield-function"
		}],
		functionParameter: {
			settlement: {
				name: "dátum_vysporiadania",
				detail: "Dátum vysporiadania cenného papiera."
			},
			maturity: {
				name: "dátum_splatnosti",
				detail: "Dátum splatnosti cenného papiera."
			},
			rate: {
				name: "sadzba",
				detail: "Úroková sadzba cenného papiera."
			},
			pr: {
				name: "cena",
				detail: "Cena cenného papiera na 100 $ menovitej hodnoty."
			},
			redemption: {
				name: "výkupná_hodnota",
				detail: "Výkupná hodnota cenného papiera na 100 $ menovitej hodnoty."
			},
			frequency: {
				name: "frekvencia",
				detail: "Počet kupónových platieb za rok. Pre ročné platby frekvencia = 1; pre polročné frekvencia = 2; pre štvrťročné frekvencia = 4."
			},
			basis: {
				name: "základ",
				detail: "Typ základu počtu dní, ktorý sa má použiť."
			}
		}
	},
	YIELDDISC: {
		description: "Vracia ročný výnos pre diskontovaný cenný papier; napríklad pokladničnú poukážku",
		abstract: "Vracia ročný výnos pre diskontovaný cenný papier; napríklad pokladničnú poukážku",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/yielddisc-function"
		}],
		functionParameter: {
			settlement: {
				name: "dátum_vysporiadania",
				detail: "Dátum vysporiadania cenného papiera."
			},
			maturity: {
				name: "dátum_splatnosti",
				detail: "Dátum splatnosti cenného papiera."
			},
			pr: {
				name: "cena",
				detail: "Cena cenného papiera na 100 $ menovitej hodnoty."
			},
			redemption: {
				name: "výkupná_hodnota",
				detail: "Výkupná hodnota cenného papiera na 100 $ menovitej hodnoty."
			},
			basis: {
				name: "základ",
				detail: "Typ základu počtu dní, ktorý sa má použiť."
			}
		}
	},
	YIELDMAT: {
		description: "Vracia ročný výnos cenného papiera, ktorý vypláca úrok pri splatnosti",
		abstract: "Vracia ročný výnos cenného papiera, ktorý vypláca úrok pri splatnosti",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/yieldmat-function"
		}],
		functionParameter: {
			settlement: {
				name: "dátum_vysporiadania",
				detail: "Dátum vysporiadania cenného papiera."
			},
			maturity: {
				name: "dátum_splatnosti",
				detail: "Dátum splatnosti cenného papiera."
			},
			issue: {
				name: "dátum_emisie",
				detail: "Dátum emisie cenného papiera."
			},
			rate: {
				name: "sadzba",
				detail: "Úroková sadzba cenného papiera."
			},
			pr: {
				name: "cena",
				detail: "Cena cenného papiera na 100 $ menovitej hodnoty."
			},
			basis: {
				name: "základ",
				detail: "Typ základu počtu dní, ktorý sa má použiť."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/information/sk-SK.ts
const locale$8 = {
	CELL: {
		description: "Vracia informácie o formátovaní, umiestnení alebo obsahu bunky",
		abstract: "Vracia informácie o formátovaní, umiestnení alebo obsahu bunky",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/cell-function"
		}],
		functionParameter: {
			infoType: {
				name: "typ_informácie",
				detail: "Textová hodnota, ktorá určuje, aký typ informácie o bunke chcete vrátiť."
			},
			reference: {
				name: "odkaz",
				detail: "Bunka, o ktorej chcete informácie."
			}
		}
	},
	ERROR_TYPE: {
		description: "Vracia číslo zodpovedajúce typu chyby",
		abstract: "Vracia číslo zodpovedajúce typu chyby",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/error-type-function"
		}],
		functionParameter: { errorVal: {
			name: "hodnota_chyby",
			detail: "Hodnota chyby, ktorej identifikačné číslo chcete zistiť."
		} }
	},
	INFO: {
		description: "Vracia informácie o aktuálnom prevádzkovom prostredí",
		abstract: "Vracia informácie o aktuálnom prevádzkovom prostredí",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/info-function"
		}],
		functionParameter: { typeText: {
			name: "Typ textu",
			detail: "Text určujúci typ informácie, ktorá sa má vrátiť."
		} }
	},
	ISBETWEEN: {
		description: "Kontroluje, či je zadané číslo medzi dvoma inými číslami, inkluzívne alebo exkluzívne.",
		abstract: "Kontroluje, či je zadané číslo medzi dvoma inými číslami, inkluzívne alebo exkluzívne.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.google.com/docs/answer/10538337?hl=sk"
		}],
		functionParameter: {
			valueToCompare: {
				name: "porovnávaná_hodnota",
				detail: "Hodnota, ktorá sa má testovať, či je medzi `lower_value` a `upper_value`."
			},
			lowerValue: {
				name: "dolná_hodnota",
				detail: "Dolná hranica rozsahu hodnôt, do ktorého môže `value_to_compare` spadať."
			},
			upperValue: {
				name: "horná_hodnota",
				detail: "Horná hranica rozsahu hodnôt, do ktorého môže `value_to_compare` spadať."
			},
			lowerValueIsInclusive: {
				name: "dolná_hranica_inkluzívna",
				detail: "Či rozsah hodnôt zahŕňa `lower_value`. Predvolene TRUE."
			},
			upperValueIsInclusive: {
				name: "horná_hranica_inkluzívna",
				detail: "Či rozsah hodnôt zahŕňa `upper_value`. Predvolene TRUE."
			}
		}
	},
	ISBLANK: {
		description: "Vracia TRUE, ak je hodnota prázdna",
		abstract: "Vracia TRUE, ak je hodnota prázdna",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "hodnota",
			detail: "Hodnota, ktorú chcete otestovať. Argument value môže byť prázdna bunka, chyba, logická hodnota, text, číslo alebo odkaz, prípadne názov odkazujúci na niektorú z týchto hodnôt."
		} }
	},
	ISDATE: {
		description: "Vracia, či je hodnota dátum.",
		abstract: "Vracia, či je hodnota dátum.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.google.com/docs/answer/9061381?hl=sk"
		}],
		functionParameter: { value: {
			name: "hodnota",
			detail: "Hodnota, ktorá sa má overiť ako dátum."
		} }
	},
	ISEMAIL: {
		description: "Kontroluje, či je hodnota platná e-mailová adresa",
		abstract: "Kontroluje, či je hodnota platná e-mailová adresa",
		links: [{
			title: "Inštrukcia",
			url: "https://support.google.com/docs/answer/3256503?hl=sk"
		}],
		functionParameter: { value: {
			name: "hodnota",
			detail: "Hodnota, ktorá sa má overiť ako e-mailová adresa."
		} }
	},
	ISERR: {
		description: "Vracia TRUE, ak je hodnota ľubovoľná chyba okrem #N/A",
		abstract: "Vracia TRUE, ak je hodnota ľubovoľná chyba okrem #N/A",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "hodnota",
			detail: "Hodnota, ktorú chcete otestovať. Argument value môže byť prázdna bunka, chyba, logická hodnota, text, číslo alebo odkaz, prípadne názov odkazujúci na niektorú z týchto hodnôt."
		} }
	},
	ISERROR: {
		description: "Vracia TRUE, ak je hodnota ľubovoľná chyba",
		abstract: "Vracia TRUE, ak je hodnota ľubovoľná chyba",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "hodnota",
			detail: "Hodnota, ktorú chcete otestovať. Argument value môže byť prázdna bunka, chyba, logická hodnota, text, číslo alebo odkaz, prípadne názov odkazujúci na niektorú z týchto hodnôt."
		} }
	},
	ISEVEN: {
		description: "Vráti hodnotu TRUE, ak je číslo párne. Vráti hodnotu FALSE, ak je číslo nepárne.",
		abstract: "Vráti hodnotu TRUE, ak je číslo párne. Vráti hodnotu FALSE, ak je číslo nepárne.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/iseven-function"
		}],
		functionParameter: { value: {
			name: "hodnota",
			detail: "Povinné. Hodnota, ktorá sa má testovať. Ak číslo nie je celým číslom, skráti sa."
		} }
	},
	ISFORMULA: {
		description: "Vracia TRUE, ak odkazuje na bunku, ktorá obsahuje vzorec",
		abstract: "Vracia TRUE, ak odkazuje na bunku, ktorá obsahuje vzorec",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/isformula-function"
		}],
		functionParameter: { reference: {
			name: "odkaz",
			detail: "Odkaz na bunku, ktorú chcete otestovať."
		} }
	},
	ISLOGICAL: {
		description: "Vracia TRUE, ak je hodnota logická",
		abstract: "Vracia TRUE, ak je hodnota logická",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "hodnota",
			detail: "Hodnota, ktorú chcete otestovať. Argument value môže byť prázdna bunka, chyba, logická hodnota, text, číslo alebo odkaz, prípadne názov odkazujúci na niektorú z týchto hodnôt."
		} }
	},
	ISNA: {
		description: "Vracia TRUE, ak je hodnota chybová hodnota #N/A",
		abstract: "Vracia TRUE, ak je hodnota chybová hodnota #N/A",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "hodnota",
			detail: "Hodnota, ktorú chcete otestovať. Argument value môže byť prázdna bunka, chyba, logická hodnota, text, číslo alebo odkaz, prípadne názov odkazujúci na niektorú z týchto hodnôt."
		} }
	},
	ISNONTEXT: {
		description: "Vracia TRUE, ak hodnota nie je text",
		abstract: "Vracia TRUE, ak hodnota nie je text",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "hodnota",
			detail: "Hodnota, ktorú chcete otestovať. Argument value môže byť prázdna bunka, chyba, logická hodnota, text, číslo alebo odkaz, prípadne názov odkazujúci na niektorú z týchto hodnôt."
		} }
	},
	ISNUMBER: {
		description: "Vracia TRUE, ak je hodnota číslo",
		abstract: "Vracia TRUE, ak je hodnota číslo",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "hodnota",
			detail: "Hodnota, ktorú chcete otestovať. Argument value môže byť prázdna bunka, chyba, logická hodnota, text, číslo alebo odkaz, prípadne názov odkazujúci na niektorú z týchto hodnôt."
		} }
	},
	ISODD: {
		description: "Vracia TRUE, ak je číslo nepárne",
		abstract: "Vracia TRUE, ak je číslo nepárne",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/isodd-function"
		}],
		functionParameter: { value: {
			name: "hodnota",
			detail: "Hodnota, ktorú chcete otestovať. Ak číslo nie je celé, skráti sa."
		} }
	},
	ISOMITTED: {
		description: "Kontroluje, či v LAMBDA chýba hodnota a vráti TRUE alebo FALSE",
		abstract: "Kontroluje, či v LAMBDA chýba hodnota a vráti TRUE alebo FALSE",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/isomitted-function"
		}],
		functionParameter: { argument: {
			name: "Argument",
			detail: "Hodnota, pri ktorej sa testuje vynechanie, napríklad parameter funkcie LAMBDA."
		} }
	},
	ISREF: {
		description: "Vracia TRUE, ak je hodnota odkaz",
		abstract: "Vracia TRUE, ak je hodnota odkaz",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "hodnota",
			detail: "Hodnota, ktorú chcete otestovať. Argument value môže byť prázdna bunka, chyba, logická hodnota, text, číslo alebo odkaz, prípadne názov odkazujúci na niektorú z týchto hodnôt."
		} }
	},
	ISTEXT: {
		description: "Vracia TRUE, ak je hodnota text",
		abstract: "Vracia TRUE, ak je hodnota text",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/is-functions"
		}],
		functionParameter: { value: {
			name: "hodnota",
			detail: "Hodnota, ktorú chcete otestovať. Argument value môže byť prázdna bunka, chyba, logická hodnota, text, číslo alebo odkaz, prípadne názov odkazujúci na niektorú z týchto hodnôt."
		} }
	},
	ISURL: {
		description: "Kontroluje, či je hodnota platná adresa URL.",
		abstract: "Kontroluje, či je hodnota platná adresa URL.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.google.com/docs/answer/3256501?hl=sk"
		}],
		functionParameter: { value: {
			name: "hodnota",
			detail: "Hodnota, ktorá sa má overiť ako URL."
		} }
	},
	N: {
		description: "Vracia hodnotu prevedenú na číslo",
		abstract: "Vracia hodnotu prevedenú na číslo",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/n-function"
		}],
		functionParameter: { value: {
			name: "hodnota",
			detail: "Hodnota, ktorú chcete previesť."
		} }
	},
	NA: {
		description: "Vracia chybovú hodnotu #N/A",
		abstract: "Vracia chybovú hodnotu #N/A",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/na-function"
		}],
		functionParameter: {}
	},
	SHEET: {
		description: "Vracia číslo hárka odkazovaného hárka",
		abstract: "Vracia číslo hárka odkazovaného hárka",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/sheet-function"
		}],
		functionParameter: { value: {
			name: "hodnota",
			detail: "Hodnota je názov hárka alebo odkaz, pre ktorý chcete číslo hárka. Ak je value vynechané, SHEET vráti číslo hárka, ktorý obsahuje funkciu."
		} }
	},
	SHEETS: {
		description: "Vracia počet hárkov v zošite",
		abstract: "Vracia počet hárkov v zošite",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/sheets-function"
		}],
		functionParameter: {}
	},
	TYPE: {
		description: "Vracia číslo označujúce dátový typ hodnoty",
		abstract: "Vracia číslo označujúce dátový typ hodnoty",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/type-function"
		}],
		functionParameter: { value: {
			name: "hodnota",
			detail: "Môže to byť ľubovoľná hodnota, napríklad číslo, text, logická hodnota a podobne."
		} }
	}
};

//#endregion
//#region src/locale/function-list/logical/sk-SK.ts
const locale$7 = {
	AND: {
		description: "Vracia TRUE, ak sú všetky jeho argumenty TRUE",
		abstract: "Vracia TRUE, ak sú všetky jeho argumenty TRUE",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/and-function"
		}],
		functionParameter: {
			logical1: {
				name: "logická_hodnota1",
				detail: "Prvá podmienka, ktorú chcete otestovať; môže sa vyhodnotiť na TRUE alebo FALSE."
			},
			logical2: {
				name: "logická_hodnota2",
				detail: "Ďalšie podmienky, ktoré chcete otestovať; môžu sa vyhodnotiť na TRUE alebo FALSE, maximálne 255 podmienok."
			}
		}
	},
	BYCOL: {
		description: "Použije LAMBDA na každý stĺpec a vráti pole výsledkov",
		abstract: "Použije LAMBDA na každý stĺpec a vráti pole výsledkov",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/bycol-function"
		}],
		functionParameter: {
			array: {
				name: "pole",
				detail: "Pole, ktoré sa má spracovať po stĺpcoch."
			},
			lambda: {
				name: "lambda",
				detail: "LAMBDA, ktorá berie stĺpec ako jeden parameter a vypočíta jeden výsledok. LAMBDA má jeden parameter: stĺpec z poľa."
			}
		}
	},
	BYROW: {
		description: "Použije LAMBDA na každý riadok a vráti pole výsledkov",
		abstract: "Použije LAMBDA na každý riadok a vráti pole výsledkov",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/byrow-function"
		}],
		functionParameter: {
			array: {
				name: "pole",
				detail: "Pole, ktoré sa má spracovať po riadkoch."
			},
			lambda: {
				name: "lambda",
				detail: "LAMBDA, ktorá berie riadok ako jeden parameter a vypočíta jeden výsledok. LAMBDA má jeden parameter: riadok z poľa."
			}
		}
	},
	FALSE: {
		description: "Vracia logickú hodnotu FALSE.",
		abstract: "Vracia logickú hodnotu FALSE.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/false-function"
		}],
		functionParameter: {}
	},
	IF: {
		description: "Určuje logický test, ktorý sa má vykonať",
		abstract: "Určuje logický test, ktorý sa má vykonať",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/if-function"
		}],
		functionParameter: {
			logicalTest: {
				name: "logický_test",
				detail: "Podmienka, ktorú chcete otestovať."
			},
			valueIfTrue: {
				name: "hodnota_ak_true",
				detail: "Hodnota, ktorú chcete vrátiť, ak je výsledok logical_test TRUE."
			},
			valueIfFalse: {
				name: "hodnota_ak_false",
				detail: "Hodnota, ktorú chcete vrátiť, ak je výsledok logical_test FALSE."
			}
		}
	},
	IFERROR: {
		description: "Vracia zadanú hodnotu, ak sa vzorec vyhodnotí na chybu; inak vráti výsledok vzorca",
		abstract: "Vracia zadanú hodnotu, ak sa vzorec vyhodnotí na chybu; inak vráti výsledok vzorca",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/iferror-function"
		}],
		functionParameter: {
			value: {
				name: "hodnota",
				detail: "Argument, ktorý sa kontroluje na chybu."
			},
			valueIfError: {
				name: "hodnota_ak_chyba",
				detail: "Hodnota, ktorá sa vráti, ak sa vzorec vyhodnotí na chybu. Vyhodnocujú sa chyby: #N/A, #VALUE!, #REF!, #DIV/0!, #NUM!, #NAME? alebo #NULL!."
			}
		}
	},
	IFNA: {
		description: "Vracia zadanú hodnotu, ak sa výraz vyhodnotí na #N/A; inak vráti výsledok výrazu",
		abstract: "Vracia zadanú hodnotu, ak sa výraz vyhodnotí na #N/A; inak vráti výsledok výrazu",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/ifna-function"
		}],
		functionParameter: {
			value: {
				name: "hodnota",
				detail: "Argument, ktorý sa kontroluje na chybu #N/A."
			},
			valueIfNa: {
				name: "hodnota_ak_na",
				detail: "Hodnota, ktorá sa vráti, ak sa vzorec vyhodnotí na chybu #N/A."
			}
		}
	},
	IFS: {
		description: "Skontroluje, či je splnená jedna alebo viac podmienok, a vráti hodnotu zodpovedajúcu prvej TRUE podmienke.",
		abstract: "Skontroluje, či je splnená jedna alebo viac podmienok, a vráti hodnotu zodpovedajúcu prvej TRUE podmienke.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/ifs-function"
		}],
		functionParameter: {
			logicalTest1: {
				name: "logický_test1",
				detail: "Podmienka, ktorá sa vyhodnotí na TRUE alebo FALSE."
			},
			valueIfTrue1: {
				name: "hodnota_ak_true1",
				detail: "Výsledok, ktorý sa vráti, ak logical_test1 je TRUE. Môže byť prázdny."
			},
			logicalTest2: {
				name: "logický_test2",
				detail: "Podmienka, ktorá sa vyhodnotí na TRUE alebo FALSE."
			},
			valueIfTrue2: {
				name: "hodnota_ak_true2",
				detail: "Výsledok, ktorý sa vráti, ak logical_testN je TRUE. Každá hodnota value_if_trueN zodpovedá podmienke logical_testN. Môže byť prázdny."
			}
		}
	},
	LAMBDA: {
		description: "Použite funkciu LAMBDA na vytvorenie vlastných, opakovane použiteľných funkcií a volajte ich priateľským názvom. Nová funkcia je dostupná v celom zošite a používa sa ako natívne funkcie Excelu.",
		abstract: "Vytvára vlastné, opakovane použiteľné funkcie a volá ich priateľským názvom",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/lambda-function"
		}],
		functionParameter: {
			parameter: {
				name: "parameter",
				detail: "Hodnota, ktorú chcete odovzdať funkcii, napríklad odkaz na bunku, reťazec alebo číslo. Môžete zadať až 253 parametrov. Tento argument je voliteľný."
			},
			calculation: {
				name: "výpočet",
				detail: "Vzorec, ktorý chcete vykonať a vrátiť ako výsledok funkcie. Musí byť posledným argumentom a musí vrátiť výsledok. Tento argument je povinný."
			}
		}
	},
	LET: {
		description: "Priraďuje názvy výsledkom výpočtov",
		abstract: "Priraďuje názvy výsledkom výpočtov",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/let-function"
		}],
		functionParameter: {
			name1: {
				name: "názov1",
				detail: "Prvý názov na priradenie. Musí začínať písmenom. Nesmie byť výstupom vzorca ani byť v konflikte so syntaxou rozsahu."
			},
			nameValue1: {
				name: "hodnota_názvu1",
				detail: "Hodnota, ktorá sa priradí k názvu1."
			},
			calculationOrName2: {
				name: "výpočet_alebo_názov2",
				detail: "Jedno z nasledujúcich:\n1.Výpočet, ktorý používa všetky názvy v rámci LET. Tento musí byť posledným argumentom v LET.\n2.Druhý názov na priradenie k druhej hodnote. Ak je zadaný názov, hodnota_názvu2 a výpočet_alebo_názov3 sú povinné."
			},
			nameValue2: {
				name: "hodnota_názvu2",
				detail: "Hodnota, ktorá sa priradí k výpočet_alebo_názov2."
			},
			calculationOrName3: {
				name: "výpočet_alebo_názov3",
				detail: "Jedno z nasledujúcich:\n1.Výpočet, ktorý používa všetky názvy v rámci LET. Posledný argument LET musí byť výpočet.\n2.Tretí názov na priradenie k tretej hodnote. Ak je zadaný názov, hodnota_názvu3 a výpočet_alebo_názov4 sú povinné."
			}
		}
	},
	MAKEARRAY: {
		description: "Vracia vypočítané pole so zadanou veľkosťou riadkov a stĺpcov použitím LAMBDA",
		abstract: "Vracia vypočítané pole so zadanou veľkosťou riadkov a stĺpcov použitím LAMBDA",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/makearray-function"
		}],
		functionParameter: {
			number1: {
				name: "riadky",
				detail: "Počet riadkov v poli. Musí byť väčší ako nula."
			},
			number2: {
				name: "stĺpce",
				detail: "Počet stĺpcov v poli. Musí byť väčší ako nula."
			},
			value3: {
				name: "lambda",
				detail: "LAMBDA, ktorá sa volá na vytvorenie poľa. LAMBDA berie dva parametre: row (index riadka poľa), col (index stĺpca poľa)."
			}
		}
	},
	MAP: {
		description: "Vracia pole vytvorené mapovaním každej hodnoty v poli/poliach na novú hodnotu použitím LAMBDA.",
		abstract: "Vracia pole vytvorené mapovaním každej hodnoty v poli/poliach na novú hodnotu použitím LAMBDA.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/map-function"
		}],
		functionParameter: {
			array1: {
				name: "pole1",
				detail: "Pole1, ktoré sa má mapovať."
			},
			array2: {
				name: "pole2",
				detail: "Pole2, ktoré sa má mapovať."
			},
			lambda: {
				name: "lambda",
				detail: "LAMBDA, ktorá musí byť posledným argumentom a musí mať parameter pre každé odovzdané pole."
			}
		}
	},
	NOT: {
		description: "Obráti logiku svojho argumentu.",
		abstract: "Obráti logiku svojho argumentu.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/not-function"
		}],
		functionParameter: { logical: {
			name: "logická_hodnota",
			detail: "Podmienka, ktorej logiku chcete obrátiť; môže sa vyhodnotiť na TRUE alebo FALSE."
		} }
	},
	OR: {
		description: "Vracia TRUE, ak sa aspoň jeden argument vyhodnotí na TRUE, a FALSE, ak sa všetky argumenty vyhodnotia na FALSE.",
		abstract: "Vracia TRUE, ak je aspoň jeden argument TRUE",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/or-function"
		}],
		functionParameter: {
			logical1: {
				name: "logická_hodnota1",
				detail: "Prvá podmienka, ktorú chcete otestovať; môže sa vyhodnotiť na TRUE alebo FALSE."
			},
			logical2: {
				name: "logická_hodnota2",
				detail: "Ďalšie podmienky, ktoré chcete otestovať; môžu sa vyhodnotiť na TRUE alebo FALSE, maximálne 255 podmienok."
			}
		}
	},
	REDUCE: {
		description: "Redukuje pole na akumulovanú hodnotu použitím LAMBDA na každú hodnotu a vráti celkovú hodnotu v akumulátore.",
		abstract: "Redukuje pole na akumulovanú hodnotu použitím LAMBDA na každú hodnotu a vráti celkovú hodnotu v akumulátore.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/reduce-function"
		}],
		functionParameter: {
			initialValue: {
				name: "počiatočná_hodnota",
				detail: "Nastaví počiatočnú hodnotu akumulátora."
			},
			array: {
				name: "pole",
				detail: "Pole, ktoré sa má redukovať."
			},
			lambda: {
				name: "lambda",
				detail: "LAMBDA, ktorá sa volá na redukciu poľa. LAMBDA berie tri parametre: 1.Hodnota sčítaná a vrátená ako finálny výsledok. 2.Aktuálna hodnota z poľa. 3.Výpočet použitý na každý prvok poľa."
			}
		}
	},
	SCAN: {
		description: "Prechádza pole použitím LAMBDA na každú hodnotu a vráti pole, ktoré obsahuje všetky medzivýsledky.",
		abstract: "Prechádza pole použitím LAMBDA na každú hodnotu a vráti pole, ktoré obsahuje všetky medzivýsledky.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/scan-function"
		}],
		functionParameter: {
			initialValue: {
				name: "počiatočná_hodnota",
				detail: "Nastaví počiatočnú hodnotu akumulátora."
			},
			array: {
				name: "pole",
				detail: "Pole, ktoré sa má prechádzať."
			},
			lambda: {
				name: "lambda",
				detail: "LAMBDA, ktorá sa volá na prechádzanie poľa. LAMBDA berie tri parametre: 1.Hodnota sčítaná a vrátená ako finálny výsledok. 2.Aktuálna hodnota z poľa. 3.Výpočet použitý na každý prvok poľa."
			}
		}
	},
	SWITCH: {
		description: "Vyhodnotí výraz voči zoznamu hodnôt a vráti výsledok zodpovedajúci prvej zhodnej hodnote. Ak zhoda neexistuje, môže sa vrátiť voliteľná predvolená hodnota.",
		abstract: "Vyhodnotí výraz voči zoznamu hodnôt a vráti výsledok zodpovedajúci prvej zhodnej hodnote.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/switch-function"
		}],
		functionParameter: {
			expression: {
				name: "výraz",
				detail: "Výraz je hodnota (napríklad číslo, dátum alebo text), ktorá sa porovnáva s value1…value126."
			},
			value1: {
				name: "hodnota1",
				detail: "HodnotaN je hodnota, ktorá sa porovnáva s výrazom."
			},
			result1: {
				name: "výsledok1",
				detail: "VýsledokN je hodnota, ktorá sa vráti, keď zodpovedajúci argument hodnotaN zodpovedá výrazu. VýsledokN musí byť zadaný pre každú zodpovedajúcu hodnotuN."
			},
			defaultOrValue2: {
				name: "predvolené_alebo_hodnota2",
				detail: "Predvolené je hodnota, ktorá sa vráti, ak sa nenájde zhoda v hodnotách hodnotaN. Argument Predvolené je rozpoznaný tým, že nemá zodpovedajúci výsledokN (pozri príklady). Predvolené musí byť posledným argumentom funkcie."
			},
			result2: {
				name: "výsledok2",
				detail: "VýsledokN je hodnota, ktorá sa vráti, keď zodpovedajúci argument hodnotaN zodpovedá výrazu. VýsledokN musí byť zadaný pre každú zodpovedajúcu hodnotuN."
			}
		}
	},
	TRUE: {
		description: "Vracia logickú hodnotu TRUE.",
		abstract: "Vracia logickú hodnotu TRUE.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/true-function"
		}],
		functionParameter: {}
	},
	XOR: {
		description: "Vracia TRUE, ak sa nepárny počet argumentov vyhodnotí na TRUE, a FALSE, ak sa párny počet argumentov vyhodnotí na TRUE.",
		abstract: "Vracia TRUE, ak je nepárny počet argumentov TRUE",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/xor-function"
		}],
		functionParameter: {
			logical1: {
				name: "logická_hodnota1",
				detail: "Prvá podmienka, ktorú chcete otestovať; môže sa vyhodnotiť na TRUE alebo FALSE."
			},
			logical2: {
				name: "logická_hodnota2",
				detail: "Ďalšie podmienky, ktoré chcete otestovať; môžu sa vyhodnotiť na TRUE alebo FALSE, maximálne 255 podmienok."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/lookup/sk-SK.ts
const locale$6 = {
	ADDRESS: {
		description: "Vráti adresu bunky v hárku podľa zadaného čísla riadka a stĺpca. Napríklad ADDRESS(2,3) vráti $C$2. Ďalší príklad: ADDRESS(77,300) vráti $KN$77. Na poskytnutie argumentov riadka a stĺpca môžete použiť iné funkcie, napríklad ROW a COLUMN.",
		abstract: "Vráti odkaz ako text na jednu bunku v hárku",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/address-function"
		}],
		functionParameter: {
			row_num: {
				name: "číslo_riadka",
				detail: "Číselná hodnota, ktorá určuje číslo riadka použité v odkaze na bunku."
			},
			column_num: {
				name: "číslo_stĺpca",
				detail: "Číselná hodnota, ktorá určuje číslo stĺpca použité v odkaze na bunku."
			},
			abs_num: {
				name: "typ_odkazu",
				detail: "Číselná hodnota, ktorá určuje typ odkazu, ktorý sa má vrátiť."
			},
			a1: {
				name: "štýl_odkazu",
				detail: "Logická hodnota, ktorá určuje štýl odkazu A1 alebo R1C1. V štýle A1 sú stĺpce označené písmenami a riadky číslami. V štýle R1C1 sú stĺpce aj riadky označené číslami. Ak je argument A1 TRUE alebo vynechaný, ADDRESS vráti odkaz v štýle A1; ak je FALSE, vráti odkaz v štýle R1C1."
			},
			sheet_text: {
				name: "názov_hárka",
				detail: "Textová hodnota určujúca názov hárka, ktorý sa použije ako externý odkaz. Napríklad vzorec =ADDRESS(1,1,,,\"Sheet2\") vráti Sheet2!$A$1. Ak je sheet_text vynechaný, názov hárka sa nepoužije a vrátená adresa sa vzťahuje na aktuálny hárok."
			}
		}
	},
	AREAS: {
		description: "Vracia počet oblastí v odkaze",
		abstract: "Vracia počet oblastí v odkaze",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/areas-function"
		}],
		functionParameter: { reference: {
			name: "odkaz",
			detail: "Odkaz na bunku alebo rozsah buniek, ktorý môže odkazovať na viacero oblastí."
		} }
	},
	CHOOSE: {
		description: "Vyberá hodnotu zo zoznamu hodnôt.",
		abstract: "Vyberá hodnotu zo zoznamu hodnôt",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/choose-function"
		}],
		functionParameter: {
			indexNum: {
				name: "index",
				detail: "Určuje, ktorý argument hodnoty sa má vybrať. Index_num musí byť číslo medzi 1 a 254, alebo vzorec či odkaz na bunku obsahujúcu číslo medzi 1 a 254.\nAk index_num = 1, CHOOSE vráti value1; ak je 2, vráti value2 atď.\nAk je index_num menší než 1 alebo väčší než počet hodnôt, CHOOSE vráti chybu #VALUE!.\nAk je index_num zlomok, skráti sa na najbližšie nižšie celé číslo."
			},
			value1: {
				name: "hodnota1",
				detail: "CHOOSE vyberá hodnotu alebo akciu podľa index_num. Argumenty môžu byť čísla, odkazy na bunky, definované názvy, vzorce, funkcie alebo text."
			},
			value2: {
				name: "hodnota2",
				detail: "1 až 254 argumentov hodnôt."
			}
		}
	},
	CHOOSECOLS: {
		description: "Vracia zadané stĺpce z poľa",
		abstract: "Vracia zadané stĺpce z poľa",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/choosecols-function"
		}],
		functionParameter: {
			array: {
				name: "pole",
				detail: "Pole obsahujúce stĺpce, ktoré sa majú vrátiť v novom poli."
			},
			colNum1: {
				name: "číslo_stĺpca1",
				detail: "Prvý stĺpec, ktorý sa má vrátiť."
			},
			colNum2: {
				name: "číslo_stĺpca2",
				detail: "Ďalšie stĺpce, ktoré sa majú vrátiť."
			}
		}
	},
	CHOOSEROWS: {
		description: "Vracia zadané riadky z poľa",
		abstract: "Vracia zadané riadky z poľa",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/chooserows-function"
		}],
		functionParameter: {
			array: {
				name: "pole",
				detail: "Pole obsahujúce riadky, ktoré sa majú vrátiť v novom poli."
			},
			rowNum1: {
				name: "číslo_riadka1",
				detail: "Prvé číslo riadka, ktoré sa má vrátiť."
			},
			rowNum2: {
				name: "číslo_riadka2",
				detail: "Ďalšie čísla riadkov, ktoré sa majú vrátiť."
			}
		}
	},
	COLUMN: {
		description: "Vracia číslo stĺpca zadaného odkazu.",
		abstract: "Vracia číslo stĺpca odkazu",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/column-function"
		}],
		functionParameter: { reference: {
			name: "odkaz",
			detail: "Bunka alebo rozsah buniek, pre ktoré chcete vrátiť číslo stĺpca."
		} }
	},
	COLUMNS: {
		description: "Vracia počet stĺpcov v poli alebo odkaze.",
		abstract: "Vracia počet stĺpcov v odkaze",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/columns-function"
		}],
		functionParameter: { array: {
			name: "pole",
			detail: "Pole, vzorec poľa alebo odkaz na rozsah buniek, pre ktorý chcete počet stĺpcov."
		} }
	},
	DROP: {
		description: "Vylúči zadaný počet riadkov alebo stĺpcov zo začiatku alebo konca poľa",
		abstract: "Vylúči zadaný počet riadkov alebo stĺpcov zo začiatku alebo konca poľa",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/drop-function"
		}],
		functionParameter: {
			array: {
				name: "pole",
				detail: "Pole, z ktorého sa majú odstrániť riadky alebo stĺpce."
			},
			rows: {
				name: "riadky",
				detail: "Počet riadkov, ktoré sa majú odstrániť. Záporná hodnota odstráni z konca poľa."
			},
			columns: {
				name: "stĺpce",
				detail: "Počet stĺpcov, ktoré sa majú odstrániť. Záporná hodnota odstráni z konca poľa."
			}
		}
	},
	EXPAND: {
		description: "Rozšíri alebo vyplní pole na zadané rozmery riadkov a stĺpcov",
		abstract: "Rozšíri alebo vyplní pole na zadané rozmery riadkov a stĺpcov",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/expand-function"
		}],
		functionParameter: {
			array: {
				name: "pole",
				detail: "Pole, ktoré sa má rozšíriť."
			},
			rows: {
				name: "riadky",
				detail: "Počet riadkov v rozšírenom poli. Ak chýba, riadky sa nerozšíria."
			},
			columns: {
				name: "stĺpce",
				detail: "Počet stĺpcov v rozšírenom poli. Ak chýba, stĺpce sa nerozšíria."
			},
			padWith: {
				name: "doplnit_s",
				detail: "Hodnota, ktorou sa má doplniť. Predvolene je #N/A."
			}
		}
	},
	FILTER: {
		description: "Filtruje rozsah údajov podľa kritérií, ktoré určíte",
		abstract: "Filtruje rozsah údajov podľa kritérií, ktoré určíte",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/filter-function"
		}],
		functionParameter: {
			array: {
				name: "pole",
				detail: "Rozsah alebo pole, ktoré sa má filtrovať."
			},
			include: {
				name: "zahrnúť",
				detail: "Pole logických hodnôt, kde TRUE znamená, že riadok alebo stĺpec sa má ponechať."
			},
			ifEmpty: {
				name: "ak_prázdne",
				detail: "Hodnota, ktorá sa vráti, ak nič nezostane."
			}
		}
	},
	FORMULATEXT: {
		description: "Vracia vzorec v zadanom odkaze ako text",
		abstract: "Vracia vzorec v zadanom odkaze ako text",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/formulatext-function"
		}],
		functionParameter: { reference: {
			name: "odkaz",
			detail: "Odkaz na bunku alebo rozsah buniek."
		} }
	},
	GETPIVOTDATA: {
		description: "Nižšie zobrazená snímka obrazovky znázorňuje rozloženie kontingenčnej tabuľky použité v ďalších častiach. V tomto príklade funkcia =GETPIVOTDATA(\"Predaj\";A3) vráti celkovú čiastku predaja:",
		abstract: "Nižšie zobrazená snímka obrazovky znázorňuje rozloženie kontingenčnej tabuľky použité v ďalších častiach. V tomto príklade funkcia =GETPIVOTDATA(\"Predaj\";A3) vráti celkovú čiastku predaja:",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/getpivotdata-function"
		}],
		functionParameter: {
			dataField: {
				name: "údajové_pole",
				detail: "Názov poľa kontingenčnej tabuľky obsahujúce údaje, ktoré chcete načítať. Musí byť v úvodzovkách."
			},
			pivotTable: {
				name: "kontingenčná_tabuľka",
				detail: "Odkaz na bunku, rozsah buniek alebo pomenovaný rozsah v kontingenčnej tabuľke obsahujúcej požadované údaje."
			},
			field1: {
				name: "pole1",
				detail: "Voliteľná dvojica názvu poľa a položky opisujúca údaje, ktoré chcete načítať."
			},
			item1: {
				name: "položka1",
				detail: "Voliteľná dvojica názvu poľa a položky opisujúca údaje, ktoré chcete načítať."
			}
		}
	},
	HLOOKUP: {
		description: "Vyhľadá hodnotu v hornom riadku tabuľky alebo poľa hodnoty a potom vráti hodnotu v tom istom stĺpci počnúc riadkom, ktorý ste v tabuľke alebo poli zadali. Funkcia HLOOKUP sa používa pri vyhľadávaní hodnôt v zadaných riadkoch tabuľky, v ktorej sú porovnávané hodnoty zoradené v prvom riadku tabuľky. Pri vyhľadávaní hodnôt v tabuľke, v ktorej sú porovnávané hodnoty zoradené v prvom stĺpci tabuľky, sa používa funkcia VLOOKUP.",
		abstract: "Vyhľadá hodnotu v hornom riadku tabuľky alebo poľa hodnoty a potom vráti hodnotu v tom istom stĺpci počnúc riadkom, ktorý ste v tabuľke alebo poli zadali. Funkcia HLOOKUP sa používa pri vyhľadávaní hodnôt v zadaných riadkoch tabuľky, v ktorej sú porovnávané hodnoty zoradené v prvom riadku tabuľky. Pri vyhľadávaní hodnôt v tabuľke, v ktorej sú porovnávané hodnoty zoradené v prvom stĺpci tabuľky, sa používa funkcia VLOOKUP.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/hlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "hľadaná_hodnota",
				detail: "Povinné. Hodnota, ktorá sa nachádza v prvom riadku tabuľky. Vyhľadávaná_hodnota môže byť hodnotou, odkazom na bunku alebo textovým reťazcom."
			},
			tableArray: {
				name: "tabuľka",
				detail: "Povinné. Tabuľka s informáciami, kde sa hľadajú údaje. Použite odkaz na rozsah alebo názov rozsahu. Hodnoty v prvom riadku tabuľky môžu byť textové, číselné alebo logické. Ak má argument rozsah hodnotu TRUE, musia byť hodnoty v prvom riadku tabuľky zoradené zostupne: ... -2, -1, 0, 1, 2, ..., A-Z, FALSE, TRUE; inak môže funkcia HLOOKUP vrátiť nesprávnu hodnotu. Ak má argument rozsah hodnotu FALSE, hodnoty v prvom riadku tabuľky nemusia byť zoradené. Nerozlišujú sa malé a veľké písmená. Hodnoty sa zoradia vo vzostupnom poradí, zľava doprava. Ďalšie informácie nájdete v téme Zoraďovanie údajov v rozsahu alebo tabuľke ."
			},
			rowIndexNum: {
				name: "číslo_riadka",
				detail: "Povinné. Číslo riadka v argumente pole_tabuľky, z ktorého sa vráti hodnota. Argument číslo_indexu_riadka s hodnotou 1 vráti hodnotu prvého riadka v argumente pole_tabuľky, argument číslo_indexu_riadka s hodnotou 2 vráti hodnotu druhého riadka v argumente pole_tabuľky a tak ďalej. Ak je hodnota argumentu číslo_indexu_riadka menšia ako 1, funkcia HLOOKUP vráti chybovú hodnotu #HODNOTA!, ak je hodnota argumentu číslo_indexu_riadka väčšia ako počet riadkov v argumente pole_tabuľky, funkcia HLOOKUP vráti chybovú hodnotu #ODKAZ! ."
			},
			rangeLookup: {
				name: "približná_zhoda",
				detail: "Voliteľný argument. Logická hodnota, ktorá určuje, či má funkcia HLOOKUP vyhľadať úplnú alebo približnú zhodu. Ak je hodnota TRUE alebo nie je zadaná, vráti približnú zhodu. Inými slovami, ak sa nenájde presná zhoda, vráti sa ďalšia najväčšia hodnota, ktorá je menšia ako hodnota argumentu vyhľadávaná_hodnota. Ak je hodnota FALSE, funkcia HLOOKUP nájde presnú zhodu. Ak v niektorom prípade nenájde, vráti sa chybová hodnota #NEDOSTUPNÝ."
			}
		}
	},
	HSTACK: {
		description: "Pripojí polia vodorovne a v postupnosti, aby sa vrátilo väčšie pole.",
		abstract: "Pripojí polia vodorovne a v postupnosti, aby sa vrátilo väčšie pole.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/hstack-function"
		}],
		functionParameter: {
			array1: {
				name: "pole",
				detail: "Maximum počtu riadkov z každého argumentu poľa."
			},
			array2: {
				name: "pole",
				detail: "Skombinovaný počet všetkých stĺpcov z každého argumentu poľa."
			}
		}
	},
	HYPERLINK: {
		description: "Vytvorí hypertextový odkaz v bunke.",
		abstract: "Vytvorí hypertextový odkaz v bunke.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.google.com/docs/answer/3093313?hl=sk"
		}],
		functionParameter: {
			url: {
				name: "url",
				detail: "Úplná URL adresa odkazu v úvodzovkách alebo odkaz na bunku, ktorá takúto URL obsahuje."
			},
			linkLabel: {
				name: "popis",
				detail: "Text, ktorý sa má zobraziť v bunke ako odkaz, v úvodzovkách alebo odkaz na bunku s takýmto textom."
			}
		}
	},
	IMAGE: {
		description: "Vracia obrázok zo zadaného zdroja",
		abstract: "Vracia obrázok zo zadaného zdroja",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/image-function"
		}],
		functionParameter: {
			source: {
				name: "zdroj",
				detail: "URL cesta súboru obrázka s protokolom \"https\"."
			},
			altText: {
				name: "alternatívny_text",
				detail: "Alternatívny text, ktorý popisuje obrázok pre prístupnosť."
			},
			sizing: {
				name: "veľkosť",
				detail: "Určuje rozmery obrázka."
			},
			height: {
				name: "výška",
				detail: "Vlastná výška obrázka v pixeloch."
			},
			width: {
				name: "šírka",
				detail: "Vlastná šírka obrázka v pixeloch."
			}
		}
	},
	INDEX: {
		description: "Vracia odkaz na bunku na prieniku zadaného riadka a stĺpca. Ak je odkaz z viacerých nesusediacich výberov, môžete určiť, ktorý výber použiť.",
		abstract: "Používa index na výber hodnoty z odkazu alebo poľa",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/index-function"
		}],
		functionParameter: {
			reference: {
				name: "odkaz",
				detail: "Odkaz na jeden alebo viac rozsahov buniek."
			},
			rowNum: {
				name: "číslo_riadka",
				detail: "Číslo riadka v odkaze, z ktorého sa má vrátiť odkaz."
			},
			columnNum: {
				name: "číslo_stĺpca",
				detail: "Číslo stĺpca v odkaze, z ktorého sa má vrátiť odkaz."
			},
			areaNum: {
				name: "číslo_oblasti",
				detail: "Vyberie rozsah v odkaze, z ktorého sa má vrátiť prienik row_num a column_num."
			}
		}
	},
	INDIRECT: {
		description: "Vracia odkaz určený textovým reťazcom. Odkazy sa okamžite vyhodnotia a zobrazia svoj obsah.",
		abstract: "Vracia odkaz určený textovou hodnotou",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/indirect-function"
		}],
		functionParameter: {
			refText: {
				name: "text_odkazu",
				detail: "Odkaz na bunku, ktorá obsahuje odkaz v štýle A1 alebo R1C1, názov definovaný ako odkaz, alebo odkaz na bunku ako textový reťazec."
			},
			a1: {
				name: "a1",
				detail: "Logická hodnota, ktorá určuje, aký typ odkazu obsahuje bunka ref_text."
			}
		}
	},
	LOOKUP: {
		description: "Použite, keď potrebujete hľadať v jednom riadku alebo stĺpci a nájsť hodnotu z rovnakej pozície v druhom riadku alebo stĺpci",
		abstract: "Vyhľadáva hodnoty vo vektore alebo poli",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/lookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "hľadaná_hodnota",
				detail: "Hodnota, ktorú LOOKUP hľadá v prvom vektore. Môže to byť číslo, text, logická hodnota alebo názov či odkaz na hodnotu."
			},
			lookupVectorOrArray: {
				name: "vyhľadávací_vektor_či_pole",
				detail: "Rozsah obsahujúci iba jeden riadok alebo jeden stĺpec."
			},
			resultVector: {
				name: "výsledný_vektor",
				detail: "Rozsah obsahujúci iba jeden riadok alebo jeden stĺpec. Argument result_vector musí mať rovnakú veľkosť ako lookup_vector."
			}
		}
	},
	MATCH: {
		description: "Funkcia MATCH vyhľadá zadanú položku v rozsahu buniek a vráti jej relatívnu pozíciu v rozsahu.",
		abstract: "Vyhľadáva hodnoty v odkaze alebo poli",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/match-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "hľadaná_hodnota",
				detail: "Hodnota, ktorú chcete nájsť v lookup_array."
			},
			lookupArray: {
				name: "vyhľadávacie_pole",
				detail: "Rozsah buniek, v ktorom sa vyhľadáva."
			},
			matchType: {
				name: "typ_zhody",
				detail: "Číslo -1, 0 alebo 1."
			}
		}
	},
	OFFSET: {
		description: "Vracia odkaz posunutý od zadaného odkazu",
		abstract: "Vracia odkaz posunutý od zadaného odkazu",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/offset-function"
		}],
		functionParameter: {
			reference: {
				name: "odkaz",
				detail: "Odkaz, od ktorého chcete posun odvodzovať."
			},
			rows: {
				name: "riadky",
				detail: "Počet riadkov nahor alebo nadol, o ktoré má odkaz ukazovať ľavý horný roh výsledku."
			},
			cols: {
				name: "stĺpce",
				detail: "Počet stĺpcov doľava alebo doprava, o ktoré má odkaz ukazovať ľavý horný roh výsledku."
			},
			height: {
				name: "výška",
				detail: "Výška v počte riadkov, ktorú má mať vrátený odkaz. Výška musí byť kladné číslo."
			},
			width: {
				name: "šírka",
				detail: "Šírka v počte stĺpcov, ktorú má mať vrátený odkaz. Šírka musí byť kladné číslo."
			}
		}
	},
	ROW: {
		description: "Vracia číslo riadka odkazu",
		abstract: "Vracia číslo riadka odkazu",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/row-function"
		}],
		functionParameter: { reference: {
			name: "odkaz",
			detail: "Bunka alebo rozsah buniek, pre ktoré chcete číslo riadka."
		} }
	},
	ROWS: {
		description: "Vracia počet riadkov v poli alebo odkaze.",
		abstract: "Vracia počet riadkov v odkaze",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/rows-function"
		}],
		functionParameter: { array: {
			name: "pole",
			detail: "Pole, vzorec poľa alebo odkaz na rozsah buniek, pre ktorý chcete počet riadkov."
		} }
	},
	RTD: {
		description: "Získava údaje v reálnom čase z programu, ktorý podporuje automatizáciu COM",
		abstract: "Získava údaje v reálnom čase z programu, ktorý podporuje automatizáciu COM",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/rtd-function"
		}],
		functionParameter: {
			progId: {
				name: "Identifikátor programu",
				detail: "Identifikátor lokálne nainštalovaného doplnku automatizácie COM."
			},
			server: {
				name: "Server",
				detail: "Názov servera doplnku; pre lokálny server použite prázdny reťazec."
			},
			topic1: {
				name: "Téma 1",
				detail: "Prvý text určujúci údaje v reálnom čase, ktoré sa majú načítať."
			},
			topic2: {
				name: "Téma 2",
				detail: "Voliteľné. Ďalšie texty určujúce údaje v reálnom čase."
			}
		}
	},
	SORT: {
		description: "Zoradí obsah rozsahu alebo poľa",
		abstract: "Zoradí obsah rozsahu alebo poľa",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/sort-function"
		}],
		functionParameter: {
			array: {
				name: "pole",
				detail: "Rozsah alebo pole, ktoré sa má zoradiť."
			},
			sortIndex: {
				name: "index_zoradenia",
				detail: "Číslo určujúce poradie triedenia (podľa riadkov alebo stĺpcov)."
			},
			sortOrder: {
				name: "poradie",
				detail: "Číslo predstavujúce požadované poradie: 1 pre vzostupné (predvolené), -1 pre zostupné."
			},
			byCol: {
				name: "podľa_stĺpcov",
				detail: "Logická hodnota určujúca smer triedenia; FALSE triedi podľa riadkov (predvolené), TRUE podľa stĺpcov."
			}
		}
	},
	SORTBY: {
		description: "Zoradí obsah rozsahu alebo poľa podľa hodnôt v zodpovedajúcom rozsahu alebo poli",
		abstract: "Zoradí obsah rozsahu alebo poľa podľa hodnôt v zodpovedajúcom rozsahu alebo poli",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/sortby-function"
		}],
		functionParameter: {
			array: {
				name: "pole",
				detail: "Rozsah alebo pole, ktoré sa má zoradiť."
			},
			byArray1: {
				name: "podľa_pola1",
				detail: "Rozsah alebo pole, podľa ktorého sa má triediť."
			},
			sortOrder1: {
				name: "poradie1",
				detail: "Číslo predstavujúce požadované poradie: 1 pre vzostupné (predvolené), -1 pre zostupné."
			},
			byArray2: {
				name: "podľa_pola2",
				detail: "Rozsah alebo pole, podľa ktorého sa má triediť."
			},
			sortOrder2: {
				name: "poradie2",
				detail: "Číslo predstavujúce požadované poradie: 1 pre vzostupné (predvolené), -1 pre zostupné."
			}
		}
	},
	TAKE: {
		description: "Vracia zadaný počet súvislých riadkov alebo stĺpcov zo začiatku alebo konca poľa",
		abstract: "Vracia zadaný počet súvislých riadkov alebo stĺpcov zo začiatku alebo konca poľa",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/take-function"
		}],
		functionParameter: {
			array: {
				name: "pole",
				detail: "Pole, z ktorého sa majú vziať riadky alebo stĺpce."
			},
			rows: {
				name: "riadky",
				detail: "Počet riadkov, ktoré sa majú vziať. Záporná hodnota berie z konca poľa."
			},
			columns: {
				name: "stĺpce",
				detail: "Počet stĺpcov, ktoré sa majú vziať. Záporná hodnota berie z konca poľa."
			}
		}
	},
	TOCOL: {
		description: "Vráti pole v jednom stĺpci",
		abstract: "Vráti pole v jednom stĺpci",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/tocol-function"
		}],
		functionParameter: {
			array: {
				name: "pole",
				detail: "Pole alebo odkaz, ktoré sa má vrátiť ako stĺpec."
			},
			ignore: {
				name: "ignorovať",
				detail: "Či sa majú ignorovať určité typy hodnôt. Predvolene sa neignoruje nič. Zadajte jednu z možností:\n0 Zachovať všetky hodnoty (predvolené)\n1 Ignorovať prázdne\n2 Ignorovať chyby\n3 Ignorovať prázdne a chyby"
			},
			scanByColumn: {
				name: "skenovať_po_stĺpcoch",
				detail: "Skenovať pole po stĺpcoch. Predvolene sa pole skenuje po riadkoch. Skenovanie určuje, či sa hodnoty usporiadajú podľa riadkov alebo stĺpcov."
			}
		}
	},
	TOROW: {
		description: "Vráti pole v jednom riadku",
		abstract: "Vráti pole v jednom riadku",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/torow-function"
		}],
		functionParameter: {
			array: {
				name: "pole",
				detail: "Pole alebo odkaz, ktoré sa má vrátiť ako riadok."
			},
			ignore: {
				name: "ignorovať",
				detail: "Či sa majú ignorovať určité typy hodnôt. Predvolene sa neignoruje nič. Zadajte jednu z možností:\n0 Zachovať všetky hodnoty (predvolené)\n1 Ignorovať prázdne\n2 Ignorovať chyby\n3 Ignorovať prázdne a chyby"
			},
			scanByColumn: {
				name: "skenovať_po_stĺpcoch",
				detail: "Skenovať pole po stĺpcoch. Predvolene sa pole skenuje po riadkoch. Skenovanie určuje, či sa hodnoty usporiadajú podľa riadkov alebo stĺpcov."
			}
		}
	},
	TRANSPOSE: {
		description: "Vracia transpozíciu poľa",
		abstract: "Vracia transpozíciu poľa",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/transpose-function"
		}],
		functionParameter: { array: {
			name: "pole",
			detail: "Rozsah buniek alebo pole v hárku."
		} }
	},
	UNIQUE: {
		description: "Vracia zoznam jedinečných hodnôt v zozname alebo rozsahu",
		abstract: "Vracia zoznam jedinečných hodnôt v zozname alebo rozsahu",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/unique-function"
		}],
		functionParameter: {
			array: {
				name: "pole",
				detail: "Rozsah alebo pole, z ktorého sa vracajú jedinečné riadky alebo stĺpce."
			},
			byCol: {
				name: "podľa_stĺpcov",
				detail: "Logická hodnota: porovnáva riadky navzájom a vráti jedinečné hodnoty = FALSE alebo vynechané; porovnáva stĺpce navzájom a vráti jedinečné hodnoty = TRUE."
			},
			exactlyOnce: {
				name: "len_raz",
				detail: "Logická hodnota: vráti riadky alebo stĺpce, ktoré sa v poli vyskytujú len raz = TRUE; vráti všetky odlišné riadky alebo stĺpce = FALSE alebo vynechané."
			}
		}
	},
	VLOOKUP: {
		description: "Použite VLOOKUP, keď potrebujete nájsť hodnoty v tabuľke alebo rozsahu podľa riadku. Napríklad vyhľadať cenu dielu podľa čísla dielu, alebo meno zamestnanca podľa jeho ID.",
		abstract: "Vyhľadá v prvom stĺpci poľa a vráti hodnotu z riadka",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/vlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "hľadaná_hodnota",
				detail: "Hodnota, ktorú chcete vyhľadať. Musí byť v prvom stĺpci rozsahu buniek zadaného v argumente table_array."
			},
			tableArray: {
				name: "tabuľka",
				detail: "Rozsah buniek, v ktorom VLOOKUP hľadá hľadanú hodnotu a hodnotu na vrátenie. Môžete použiť pomenovaný rozsah alebo tabuľku; v argumente možno použiť názvy namiesto odkazov na bunky."
			},
			colIndexNum: {
				name: "číslo_stĺpca",
				detail: "Číslo stĺpca (začína 1 pre ľavý stĺpec table_array), ktorý obsahuje hodnotu na vrátenie."
			},
			rangeLookup: {
				name: "približná_zhoda",
				detail: "Logická hodnota určujúca, či má VLOOKUP nájsť približnú alebo presnú zhodu: Približná zhoda - 1/TRUE, Presná zhoda - 0/FALSE."
			}
		}
	},
	VSTACK: {
		description: "Pripojí polia vertikálne a postupne, aby vrátilo väčšie pole",
		abstract: "Pripojí polia vertikálne a postupne, aby vrátilo väčšie pole",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/vstack-function"
		}],
		functionParameter: {
			array1: {
				name: "pole",
				detail: "Polia, ktoré sa majú pripojiť."
			},
			array2: {
				name: "pole",
				detail: "Polia, ktoré sa majú pripojiť."
			}
		}
	},
	WRAPCOLS: {
		description: "Zalomením podľa stĺpcov rozdelí zadaný riadok alebo stĺpec hodnôt po zadanom počte prvkov",
		abstract: "Zalomením podľa stĺpcov rozdelí zadaný riadok alebo stĺpec hodnôt po zadanom počte prvkov",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/wrapcols-function"
		}],
		functionParameter: {
			vector: {
				name: "vektor",
				detail: "Vektor alebo odkaz, ktorý sa má zalomiť."
			},
			wrapCount: {
				name: "počet_na_stĺpec",
				detail: "Maximálny počet hodnôt v každom stĺpci."
			},
			padWith: {
				name: "doplnit_s",
				detail: "Hodnota, ktorou sa má doplniť. Predvolene je #N/A."
			}
		}
	},
	WRAPROWS: {
		description: "Zalomením podľa riadkov rozdelí zadaný riadok alebo stĺpec hodnôt po zadanom počte prvkov",
		abstract: "Zalomením podľa riadkov rozdelí zadaný riadok alebo stĺpec hodnôt po zadanom počte prvkov",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/wraprows-function"
		}],
		functionParameter: {
			vector: {
				name: "vektor",
				detail: "Vektor alebo odkaz, ktorý sa má zalomiť."
			},
			wrapCount: {
				name: "počet_na_riadok",
				detail: "Maximálny počet hodnôt v každom riadku."
			},
			padWith: {
				name: "doplnit_s",
				detail: "Hodnota, ktorou sa má doplniť. Predvolene je #N/A."
			}
		}
	},
	XLOOKUP: {
		description: "Vyhľadáva v rozsahu alebo poli a vráti položku zodpovedajúcu prvej nájdenej zhode. Ak zhoda neexistuje, XLOOKUP môže vrátiť najbližšiu (približnú) zhodu.",
		abstract: "Vyhľadáva v rozsahu alebo poli a vráti položku zodpovedajúcu prvej nájdenej zhode.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/xlookup-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "hľadaná_hodnota",
				detail: "Hodnota, ktorú chcete hľadať. Ak je vynechaná, XLOOKUP vráti prázdne bunky, ktoré nájde v lookup_array."
			},
			lookupArray: {
				name: "vyhľadávacie_pole",
				detail: "Pole alebo rozsah, v ktorom sa má hľadať."
			},
			returnArray: {
				name: "návratové_pole",
				detail: "Pole alebo rozsah, ktorý sa má vrátiť."
			},
			ifNotFound: {
				name: "ak_nenájdené",
				detail: "Ak sa nenájde platná zhoda, vráti sa text [if_not_found], ktorý zadáte. Ak [if_not_found] chýba, vráti sa #N/A."
			},
			matchMode: {
				name: "režim_zhody",
				detail: "Určuje typ zhody: 0 - Presná zhoda. Ak sa nenájde, vráti #N/A (predvolené). -1 - Presná zhoda; ak sa nenájde, vráti najbližšiu menšiu položku. 1 - Presná zhoda; ak sa nenájde, vráti najbližšiu väčšiu položku. 2 - Zástupná zhoda, kde *, ?, a ~ majú špeciálny význam."
			},
			searchMode: {
				name: "režim_hľadania",
				detail: "Určuje režim hľadania: 1 - Hľadanie od prvej položky (predvolené). -1 - Hľadanie odzadu (od poslednej položky). 2 - Binárne hľadanie s predpokladom vzostupného zoradenia lookup_array. Ak nie je zoradené, výsledok môže byť nesprávny. -2 - Binárne hľadanie s predpokladom zostupného zoradenia lookup_array. Ak nie je zoradené, výsledok môže byť nesprávny."
			}
		}
	},
	XMATCH: {
		description: "Vyhľadá zadanú položku v poli alebo rozsahu buniek a vráti jej relatívnu pozíciu.",
		abstract: "Vracia relatívnu pozíciu položky v poli alebo rozsahu buniek.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/xmatch-function"
		}],
		functionParameter: {
			lookupValue: {
				name: "hľadaná_hodnota",
				detail: "Hľadaná hodnota."
			},
			lookupArray: {
				name: "vyhľadávacie_pole",
				detail: "Pole alebo rozsah, v ktorom sa má hľadať."
			},
			matchMode: {
				name: "režim_zhody",
				detail: "Určuje typ zhody:\n0 - Presná zhoda (predvolené)\n-1 - Presná zhoda alebo najbližšia menšia položka\n1 - Presná zhoda alebo najbližšia väčšia položka\n2 - Zástupná zhoda, kde *, ?, a ~ majú špeciálny význam."
			},
			searchMode: {
				name: "režim_hľadania",
				detail: "Určuje typ hľadania:\n1 - Hľadať od začiatku (predvolené)\n-1 - Hľadať odzadu.\n2 - Binárne hľadanie s predpokladom vzostupného zoradenia lookup_array. Ak nie je zoradené, výsledok môže byť nesprávny.\n-2 - Binárne hľadanie s predpokladom zostupného zoradenia lookup_array. Ak nie je zoradené, výsledok môže byť nesprávny."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/math/sk-SK.ts
const locale$5 = {
	ABS: {
		description: "Vracia absolútnu hodnotu čísla. Absolútna hodnota čísla je číslo bez znamienka.",
		abstract: "Vracia absolútnu hodnotu čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/abs-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Reálne číslo, ktorého absolútnu hodnotu chcete."
		} }
	},
	ACOS: {
		description: "Vracia arkuskosínus (inverzný kosínus) čísla. Arkuskosínus čísla je uhol, ktorého kosínus je číslo. Uhol je v radiánoch v rozsahu 0 až pi.",
		abstract: "Vracia arkuskosínus čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/acos-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Kosínus požadovaného uhla; musí byť v rozsahu od -1 do 1."
		} }
	},
	ACOSH: {
		description: "Vracia inverzný hyperbolický kosínus čísla. Číslo musí byť väčšie alebo rovné 1. Inverzný hyperbolický kosínus čísla je hodnota, ktorej hyperbolický kosínus je číslo, takže ACOSH(COSH(číslo)) sa rovná číslu.",
		abstract: "Vracia inverzný hyperbolický kosínus čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/acosh-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Ľubovoľné reálne číslo väčšie alebo rovné 1."
		} }
	},
	ACOT: {
		description: "Vracia hlavné hodnoty arkuskotangensu (inverzného kotangensu) čísla.",
		abstract: "Vracia arkuskotangens čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/acot-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Číslo je kotangens požadovaného uhla. Musí to byť reálne číslo."
		} }
	},
	ACOTH: {
		description: "Vracia hyperbolický arkuskotangens čísla",
		abstract: "Vracia hyperbolický arkuskotangens čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/acoth-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Absolútna hodnota čísla musí byť väčšia ako 1."
		} }
	},
	AGGREGATE: {
		description: "Vracia agregovanú hodnotu v zozname alebo databáze",
		abstract: "Vracia agregovanú hodnotu v zozname alebo databáze",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/aggregate-function"
		}],
		functionParameter: {
			functionNum: {
				name: "číslo_funkcie",
				detail: "Číslo 1 až 19, ktoré určuje, ktorú funkciu použiť."
			},
			options: {
				name: "možnosti",
				detail: "Číselná hodnota, ktorá určuje, ktoré hodnoty sa majú v rozsahu hodnotenia pre funkciu ignorovať."
			},
			ref1: {
				name: "odkaz1",
				detail: "Prvý číselný argument pre funkcie, ktoré používajú viac číselných argumentov, pre ktoré chcete agregovanú hodnotu."
			},
			ref2: {
				name: "odkaz2",
				detail: "Číselné argumenty 2 až 252, pre ktoré chcete agregovanú hodnotu."
			}
		}
	},
	ARABIC: {
		description: "Konvertuje rímske číslo na arabské číslo",
		abstract: "Konvertuje rímske číslo na arabské číslo",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/arabic-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Reťazec v úvodzovkách, prázdny reťazec (\"\"), alebo odkaz na bunku obsahujúcu text."
		} }
	},
	ASIN: {
		description: "Vracia arkussínus čísla.",
		abstract: "Vracia arkussínus čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/asin-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Sínus požadovaného uhla; musí byť v rozsahu od -1 do 1."
		} }
	},
	ASINH: {
		description: "Vracia inverzný hyperbolický sínus čísla.",
		abstract: "Vracia inverzný hyperbolický sínus čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/asinh-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Ľubovoľné reálne číslo."
		} }
	},
	ATAN: {
		description: "Vracia arkustangens čísla.",
		abstract: "Vracia arkustangens čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/atan-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Tangens požadovaného uhla."
		} }
	},
	ATAN2: {
		description: "Vráti arkustangens alebo inverzný tangens zadaných súradníc x a y. Arkustangens je uhol, ktorý zviera os x a priamka obsahujúca počiatok (0, 0) a bod so súradnicami (x_num, y_num). Uhol je daný v radiánoch medzi -pí a pí, okrem -pí.",
		abstract: "Vráti arkustangens alebo inverzný tangens zadaných súradníc x a y. Arkustangens je uhol, ktorý zviera os x a priamka obsahujúca počiatok (0, 0) a bod so súradnicami (x_num, y_num). Uhol je daný v radiánoch medzi -pí a pí, okrem -pí.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/atan2-function"
		}],
		functionParameter: {
			xNum: {
				name: "x_číslo",
				detail: "Povinné. je Súradnica x bodu."
			},
			yNum: {
				name: "y_číslo",
				detail: "Povinné. Súradnica y bodu."
			}
		}
	},
	ATANH: {
		description: "Vráti inverzný hyperbolický tangens čísla. Číslo musí byť väčšie než -1 a menšie než 1. Inverzný hyperbolický tangens je hodnota, ktorej hyperbolický tangens je dané číslo , takže ATANH(TANH(číslo)) = číslo .",
		abstract: "Vráti inverzný hyperbolický tangens čísla. Číslo musí byť väčšie než -1 a menšie než 1. Inverzný hyperbolický tangens je hodnota, ktorej hyperbolický tangens je dané číslo , takže ATANH(TANH(číslo)) = číslo .",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/atanh-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Povinné. Ľubovoľné reálne číslo v intervale od 1 do -1."
		} }
	},
	BASE: {
		description: "Konvertuje číslo na textové vyjadrenie s daným základom sústavy (základ).",
		abstract: "Konvertuje číslo na textové vyjadrenie s daným základom sústavy (základ).",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/base-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Povinné. Číslo, ktoré chcete skonvertovať. Musí to byť celé číslo väčšie ako alebo rovné 0 a menšie ako 2^53."
			},
			radix: {
				name: "základ",
				detail: "Povinné. Základ sústavy, na ktorý chcete skonvertovať číslo. Musí to byť celé číslo väčšie alebo rovné 0 a menšie alebo rovné 36."
			},
			minLength: {
				name: "minimálna_dĺžka",
				detail: "Voliteľný argument. Minimálna dĺžka vráteného reťazca. Musí to byť celé číslo väčšia alebo rovné 0."
			}
		}
	},
	CEILING: {
		description: "Zaokrúhľuje číslo nahor na najbližšie celé číslo alebo na najbližší násobok významnosti",
		abstract: "Zaokrúhľuje číslo nahor na najbližšie celé číslo alebo na najbližší násobok významnosti",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/ceiling-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Hodnota, ktorú chcete zaokrúhliť."
			},
			significance: {
				name: "významnosť",
				detail: "Násobok, na ktorý chcete číslo zaokrúhliť."
			}
		}
	},
	CEILING_MATH: {
		description: "Zaokrúhľuje číslo nahor na najbližšie celé číslo alebo na najbližší násobok významnosti",
		abstract: "Zaokrúhľuje číslo nahor na najbližšie celé číslo alebo na najbližší násobok významnosti",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/ceiling-math-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Hodnota, ktorú chcete zaokrúhliť."
			},
			significance: {
				name: "významnosť",
				detail: "Násobok, na ktorý chcete číslo zaokrúhliť."
			},
			mode: {
				name: "režim",
				detail: "Pri záporných číslach určuje, či sa číslo zaokrúhľuje smerom k nule alebo od nuly."
			}
		}
	},
	CEILING_PRECISE: {
		description: "Zaokrúhľuje číslo na najbližšie celé číslo alebo na najbližší násobok významnosti. Bez ohľadu na znamienko čísla sa zaokrúhľuje nahor.",
		abstract: "Zaokrúhľuje číslo na najbližšie celé číslo alebo na najbližší násobok významnosti. Bez ohľadu na znamienko čísla sa zaokrúhľuje nahor.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/ceiling-precise-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Hodnota, ktorú chcete zaokrúhliť."
			},
			significance: {
				name: "významnosť",
				detail: "Násobok, na ktorý chcete číslo zaokrúhliť."
			}
		}
	},
	COMBIN: {
		description: "Vracia počet kombinácií pre daný počet objektov",
		abstract: "Vracia počet kombinácií pre daný počet objektov",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/combin-function"
		}],
		functionParameter: {
			number: {
				name: "počet",
				detail: "Počet položiek."
			},
			numberChosen: {
				name: "počet_vybraných",
				detail: "Počet položiek v každej kombinácii."
			}
		}
	},
	COMBINA: {
		description: "Vracia počet kombinácií s opakovaním pre daný počet položiek",
		abstract: "Vracia počet kombinácií s opakovaním pre daný počet položiek",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/combina-function"
		}],
		functionParameter: {
			number: {
				name: "počet",
				detail: "Počet položiek."
			},
			numberChosen: {
				name: "počet_vybraných",
				detail: "Počet položiek v každej kombinácii."
			}
		}
	},
	COS: {
		description: "Vracia kosínus čísla.",
		abstract: "Vracia kosínus čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/cos-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Uhol v radiánoch, pre ktorý chcete kosínus."
		} }
	},
	COSH: {
		description: "Vracia hyperbolický kosínus čísla",
		abstract: "Vracia hyperbolický kosínus čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/cosh-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Ľubovoľné reálne číslo, pre ktoré chcete hyperbolický kosínus."
		} }
	},
	COT: {
		description: "Vracia kotangens uhla",
		abstract: "Vracia kotangens uhla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/cot-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Uhol v radiánoch, pre ktorý chcete kotangens."
		} }
	},
	COTH: {
		description: "Vracia hyperbolický kotangens čísla",
		abstract: "Vracia hyperbolický kotangens čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/coth-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Ľubovoľné reálne číslo, pre ktoré chcete hyperbolický kotangens."
		} }
	},
	CSC: {
		description: "Vracia kosekans uhla",
		abstract: "Vracia kosekans uhla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/csc-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Uhol v radiánoch, pre ktorý chcete kosekans."
		} }
	},
	CSCH: {
		description: "Vracia hyperbolický kosekans uhla",
		abstract: "Vracia hyperbolický kosekans uhla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/csch-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Uhol v radiánoch, pre ktorý chcete hyperbolický kosekans."
		} }
	},
	DECIMAL: {
		description: "Konvertuje textové vyjadrenie čísla v zadanom základe na desiatkové číslo",
		abstract: "Konvertuje textové vyjadrenie čísla v zadanom základe na desiatkové číslo",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/decimal-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Dĺžka reťazca Text musí byť menšia alebo rovná 255 znakom."
			},
			radix: {
				name: "základ",
				detail: "Základ, do ktorého chcete číslo previesť. Musí to byť celé číslo väčšie alebo rovné 2 a menšie alebo rovné 36."
			}
		}
	},
	DEGREES: {
		description: "Konvertuje radiány na stupne",
		abstract: "Konvertuje radiány na stupne",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/degrees-function"
		}],
		functionParameter: { angle: {
			name: "uhol",
			detail: "Uhol v radiánoch, ktorý chcete previesť."
		} }
	},
	EVEN: {
		description: "Zaokrúhľuje číslo nahor na najbližšie párne celé číslo",
		abstract: "Zaokrúhľuje číslo nahor na najbližšie párne celé číslo",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/even-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Hodnota, ktorú chcete zaokrúhliť."
		} }
	},
	EXP: {
		description: "Vracia e umocnené na zadané číslo",
		abstract: "Vracia e umocnené na zadané číslo",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/exp-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Exponent použitý na základ e."
		} }
	},
	FACT: {
		description: "Vracia faktoriál čísla",
		abstract: "Vracia faktoriál čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/fact-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Nezáporné číslo, pre ktoré chcete faktoriál. Ak číslo nie je celé, bude skrátené."
		} }
	},
	FACTDOUBLE: {
		description: "Vracia dvojitý faktoriál čísla",
		abstract: "Vracia dvojitý faktoriál čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/factdouble-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Nezáporné číslo, pre ktoré chcete dvojitý faktoriál. Ak číslo nie je celé, bude skrátené."
		} }
	},
	FLOOR: {
		description: "Zaokrúhľuje číslo nadol, smerom k nule",
		abstract: "Zaokrúhľuje číslo nadol, smerom k nule",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/floor-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Hodnota, ktorú chcete zaokrúhliť."
			},
			significance: {
				name: "významnosť",
				detail: "Násobok, na ktorý chcete číslo zaokrúhliť."
			}
		}
	},
	FLOOR_MATH: {
		description: "Zaokrúhľuje číslo nadol na najbližšie celé číslo alebo na najbližší násobok významnosti",
		abstract: "Zaokrúhľuje číslo nadol na najbližšie celé číslo alebo na najbližší násobok významnosti",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/floor-math-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Hodnota, ktorú chcete zaokrúhliť."
			},
			significance: {
				name: "významnosť",
				detail: "Násobok, na ktorý chcete číslo zaokrúhliť."
			},
			mode: {
				name: "režim",
				detail: "Pri záporných číslach určuje, či sa číslo zaokrúhľuje smerom k nule alebo od nuly."
			}
		}
	},
	FLOOR_PRECISE: {
		description: "Zaokrúhľuje číslo nadol na najbližšie celé číslo alebo na najbližší násobok významnosti. Bez ohľadu na znamienko čísla sa zaokrúhľuje nadol.",
		abstract: "Zaokrúhľuje číslo nadol na najbližšie celé číslo alebo na najbližší násobok významnosti.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/floor-precise-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Hodnota, ktorú chcete zaokrúhliť."
			},
			significance: {
				name: "významnosť",
				detail: "Násobok, na ktorý chcete číslo zaokrúhliť."
			}
		}
	},
	GCD: {
		description: "Vracia najväčší spoločný deliteľ",
		abstract: "Vracia najväčší spoločný deliteľ",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/gcd-function"
		}],
		functionParameter: {
			number1: {
				name: "číslo1",
				detail: "Na výpočet prvého čísla pre najväčší spoločný deliteľ môžete namiesto parametrov oddelených čiarkou použiť aj jedno pole alebo odkaz na pole."
			},
			number2: {
				name: "číslo2",
				detail: "Druhé číslo, pre ktoré sa má nájsť najväčší spoločný deliteľ. Týmto spôsobom možno zadať až 255 čísel."
			}
		}
	},
	INT: {
		description: "Zaokrúhľuje číslo nadol na najbližšie celé číslo",
		abstract: "Zaokrúhľuje číslo nadol na najbližšie celé číslo",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/int-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Reálne číslo, ktoré chcete zaokrúhliť nadol na celé číslo."
		} }
	},
	ISO_CEILING: {
		description: "Vracia číslo zaokrúhlené nahor na najbližšie celé číslo alebo na najbližší násobok významnosti",
		abstract: "Vracia číslo zaokrúhlené nahor na najbližšie celé číslo alebo na najbližší násobok významnosti",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/iso-ceiling-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Hodnota, ktorú chcete zaokrúhliť."
			},
			significance: {
				name: "významnosť",
				detail: "Násobok, na ktorý chcete číslo zaokrúhliť."
			}
		}
	},
	LCM: {
		description: "Vracia najmenší spoločný násobok",
		abstract: "Vracia najmenší spoločný násobok",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/lcm-function"
		}],
		functionParameter: {
			number1: {
				name: "číslo1",
				detail: "Na výpočet prvého čísla pre najmenší spoločný násobok môžete namiesto parametrov oddelených čiarkou použiť aj jedno pole alebo odkaz na pole."
			},
			number2: {
				name: "číslo2",
				detail: "Druhé číslo, pre ktoré sa má nájsť najmenší spoločný násobok. Týmto spôsobom možno zadať až 255 čísel."
			}
		}
	},
	LN: {
		description: "Vracia prirodzený logaritmus čísla",
		abstract: "Vracia prirodzený logaritmus čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/ln-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Kladné reálne číslo, pre ktoré chcete prirodzený logaritmus."
		} }
	},
	LOG: {
		description: "Vracia logaritmus čísla pri zadanom základe",
		abstract: "Vracia logaritmus čísla pri zadanom základe",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/log-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Kladné reálne číslo, pre ktoré chcete logaritmus."
			},
			base: {
				name: "základ",
				detail: "Základ logaritmu. Ak je vynechaný, predpokladá sa 10."
			}
		}
	},
	LOG10: {
		description: "Vracia logaritmus čísla so základom 10",
		abstract: "Vracia logaritmus čísla so základom 10",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/log10-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Kladné reálne číslo, pre ktoré chcete logaritmus so základom 10."
		} }
	},
	MDETERM: {
		description: "Vracia determinant matice poľa",
		abstract: "Vracia determinant matice poľa",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/mdeterm-function"
		}],
		functionParameter: { array: {
			name: "pole",
			detail: "Číselné pole s rovnakým počtom riadkov a stĺpcov."
		} }
	},
	MINVERSE: {
		description: "Vracia inverznú maticu poľa",
		abstract: "Vracia inverznú maticu poľa",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/minverse-function"
		}],
		functionParameter: { array: {
			name: "pole",
			detail: "Číselné pole s rovnakým počtom riadkov a stĺpcov."
		} }
	},
	MMULT: {
		description: "Vracia maticový súčin dvoch polí",
		abstract: "Vracia maticový súčin dvoch polí",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/mmult-function"
		}],
		functionParameter: {
			array1: {
				name: "pole1",
				detail: "Polia, ktoré chcete vynásobiť."
			},
			array2: {
				name: "pole2",
				detail: "Polia, ktoré chcete vynásobiť."
			}
		}
	},
	MOD: {
		description: "Vracia zvyšok po delení čísla deliteľom. Výsledok má rovnaké znamienko ako deliteľ.",
		abstract: "Vracia zvyšok po delení",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/mod-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Číslo, pre ktoré chcete zistiť zvyšok."
			},
			divisor: {
				name: "deliteľ",
				detail: "Číslo, ktorým chcete deliť číslo."
			}
		}
	},
	MROUND: {
		description: "Vracia číslo zaokrúhlené na požadovaný násobok",
		abstract: "Vracia číslo zaokrúhlené na požadovaný násobok",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/mround-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Hodnota, ktorú chcete zaokrúhliť."
			},
			multiple: {
				name: "násobok",
				detail: "Násobok, na ktorý chcete číslo zaokrúhliť."
			}
		}
	},
	MULTINOMIAL: {
		description: "Vracia multinomický koeficient pre množinu čísel",
		abstract: "Vracia multinomický koeficient pre množinu čísel",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/multinomial-function"
		}],
		functionParameter: {
			number1: {
				name: "číslo1",
				detail: "Prvá hodnota alebo rozsah použitý vo výpočte."
			},
			number2: {
				name: "číslo2",
				detail: "Ďalšie hodnoty alebo rozsahy použité vo výpočtoch."
			}
		}
	},
	MUNIT: {
		description: "Vracia jednotkovú maticu pre zadaný rozmer",
		abstract: "Vracia jednotkovú maticu pre zadaný rozmer",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/munit-function"
		}],
		functionParameter: { dimension: {
			name: "rozmer",
			detail: "Rozmer je celé číslo určujúce rozmer jednotkovej matice, ktorú chcete vrátiť. Vracia pole. Rozmer musí byť väčší ako nula."
		} }
	},
	ODD: {
		description: "Zaokrúhľuje číslo nahor na najbližšie nepárne celé číslo",
		abstract: "Zaokrúhľuje číslo nahor na najbližšie nepárne celé číslo",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/odd-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Hodnota, ktorú chcete zaokrúhliť."
		} }
	},
	PI: {
		description: "Vracia hodnotu čísla pí",
		abstract: "Vracia hodnotu čísla pí",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/pi-function"
		}],
		functionParameter: {}
	},
	POWER: {
		description: "Vracia výsledok čísla umocneného na zadaný exponent.",
		abstract: "Vracia výsledok čísla umocneného na zadaný exponent",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/power-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Základné číslo. Môže byť ľubovoľné reálne číslo."
			},
			power: {
				name: "exponent",
				detail: "Exponent, na ktorý sa základné číslo umocní."
			}
		}
	},
	PRODUCT: {
		description: "Násobí všetky čísla zadané ako argumenty a vracia súčin.",
		abstract: "Násobí svoje argumenty",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/product-function"
		}],
		functionParameter: {
			number1: {
				name: "číslo1",
				detail: "Prvé číslo alebo rozsah, ktorý chcete násobiť."
			},
			number2: {
				name: "číslo2",
				detail: "Ďalšie čísla alebo rozsahy, ktoré chcete násobiť, maximálne 255 argumentov."
			}
		}
	},
	QUOTIENT: {
		description: "Vracia celočíselnú časť podielu",
		abstract: "Vracia celočíselnú časť podielu",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/quotient-function"
		}],
		functionParameter: {
			numerator: {
				name: "čitateľ",
				detail: "Deliteľné číslo."
			},
			denominator: {
				name: "menovateľ",
				detail: "Deliteľ."
			}
		}
	},
	RADIANS: {
		description: "Konvertuje stupne na radiány",
		abstract: "Konvertuje stupne na radiány",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/radians-function"
		}],
		functionParameter: { angle: {
			name: "uhol",
			detail: "Uhol v stupňoch, ktorý chcete previesť."
		} }
	},
	RAND: {
		description: "Vracia náhodné číslo medzi 0 a 1",
		abstract: "Vracia náhodné číslo medzi 0 a 1",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/rand-function"
		}],
		functionParameter: {}
	},
	RANDARRAY: {
		description: "Vracia pole náhodných čísel medzi 0 a 1. Môžete však určiť počet riadkov a stĺpcov, minimálne a maximálne hodnoty a či sa majú vrátiť celé čísla alebo desatinné hodnoty.",
		abstract: "Vracia pole náhodných čísel medzi 0 a 1.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/randarray-function"
		}],
		functionParameter: {
			rows: {
				name: "riadky",
				detail: "Počet riadkov, ktoré sa majú vrátiť."
			},
			columns: {
				name: "stĺpce",
				detail: "Počet stĺpcov, ktoré sa majú vrátiť."
			},
			min: {
				name: "min",
				detail: "Minimálne číslo, ktoré sa má vrátiť."
			},
			max: {
				name: "max",
				detail: "Maximálne číslo, ktoré sa má vrátiť."
			},
			wholeNumber: {
				name: "celé_číslo",
				detail: "Určuje, či sa má vrátiť celé číslo alebo desatinná hodnota."
			}
		}
	},
	RANDBETWEEN: {
		description: "Vracia náhodné číslo medzi číslami, ktoré zadáte",
		abstract: "Vracia náhodné číslo medzi číslami, ktoré zadáte",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/randbetween-function"
		}],
		functionParameter: {
			bottom: {
				name: "dolná_hranica",
				detail: "Najmenšie celé číslo, ktoré RANDBETWEEN vráti."
			},
			top: {
				name: "horná_hranica",
				detail: "Najväčšie celé číslo, ktoré RANDBETWEEN vráti."
			}
		}
	},
	ROMAN: {
		description: "Konvertuje arabské číslo na rímske číslo ako text",
		abstract: "Konvertuje arabské číslo na rímske číslo ako text",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/roman-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Arabské číslo, ktoré chcete previesť."
			},
			form: {
				name: "forma",
				detail: "Číslo určujúce typ rímskeho čísla. Štýl rímskeho čísla sa pohybuje od klasického po zjednodušený a s rastúcou hodnotou form je stručnejší."
			}
		}
	},
	ROUND: {
		description: "Zaokrúhľuje číslo na zadaný počet číslic",
		abstract: "Zaokrúhľuje číslo na zadaný počet číslic",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/round-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Číslo, ktoré chcete zaokrúhliť."
			},
			numDigits: {
				name: "počet_číslic",
				detail: "Počet číslic, na ktorý chcete argument číslo zaokrúhliť."
			}
		}
	},
	ROUNDBANK: {
		description: "Zaokrúhľuje číslo bankárskym zaokrúhľovaním",
		abstract: "Zaokrúhľuje číslo bankárskym zaokrúhľovaním",
		links: [{
			title: "Inštrukcia",
			url: ""
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Číslo, ktoré chcete zaokrúhliť bankárskym zaokrúhľovaním."
			},
			numDigits: {
				name: "počet_číslic",
				detail: "Počet číslic, na ktorý chcete zaokrúhliť bankárskym spôsobom."
			}
		}
	},
	ROUNDDOWN: {
		description: "Zaokrúhľuje číslo nadol, smerom k nule",
		abstract: "Zaokrúhľuje číslo nadol, smerom k nule",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/rounddown-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Číslo, ktoré chcete zaokrúhliť."
			},
			numDigits: {
				name: "počet_číslic",
				detail: "Počet číslic, na ktorý chcete argument číslo zaokrúhliť."
			}
		}
	},
	ROUNDUP: {
		description: "Zaokrúhľuje číslo nahor, smerom od nuly",
		abstract: "Zaokrúhľuje číslo nahor, smerom od nuly",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/roundup-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Číslo, ktoré chcete zaokrúhliť."
			},
			numDigits: {
				name: "počet_číslic",
				detail: "Počet číslic, na ktorý chcete argument číslo zaokrúhliť."
			}
		}
	},
	SEC: {
		description: "Vracia sekans uhla",
		abstract: "Vracia sekans uhla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/sec-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Číslo je uhol v radiánoch, pre ktorý chcete sekans."
		} }
	},
	SECH: {
		description: "Vracia hyperbolický sekans uhla",
		abstract: "Vracia hyperbolický sekans uhla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/sech-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Číslo je uhol v radiánoch, pre ktorý chcete hyperbolický sekans."
		} }
	},
	SERIESSUM: {
		description: "Vracia súčet mocninového radu podľa vzorca",
		abstract: "Vracia súčet mocninového radu podľa vzorca",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/seriessum-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Vstupná hodnota do mocninového radu."
			},
			n: {
				name: "n",
				detail: "Počiatočný exponent, na ktorý chcete umocniť x."
			},
			m: {
				name: "m",
				detail: "Krok, o ktorý sa zvyšuje n pre každý člen radu."
			},
			coefficients: {
				name: "koeficienty",
				detail: "Súbor koeficientov, ktorými sa násobí každá ďalšia mocnina x."
			}
		}
	},
	SEQUENCE: {
		description: "Generuje zoznam postupných čísel v poli, napríklad 1, 2, 3, 4",
		abstract: "Generuje zoznam postupných čísel v poli, napríklad 1, 2, 3, 4",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/sequence-function"
		}],
		functionParameter: {
			rows: {
				name: "riadky",
				detail: "Počet riadkov, ktoré sa majú vrátiť."
			},
			columns: {
				name: "stĺpce",
				detail: "Počet stĺpcov, ktoré sa majú vrátiť."
			},
			start: {
				name: "začiatok",
				detail: "Prvé číslo v postupnosti."
			},
			step: {
				name: "krok",
				detail: "Hodnota, o ktorú sa zvyšuje každý ďalší prvok poľa."
			}
		}
	},
	SIGN: {
		description: "Vracia znamienko čísla",
		abstract: "Vracia znamienko čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/sign-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Ľubovoľné reálne číslo."
		} }
	},
	SIN: {
		description: "Vracia sínus zadaného uhla",
		abstract: "Vracia sínus zadaného uhla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/sin-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Uhol v radiánoch, pre ktorý chcete sínus."
		} }
	},
	SINH: {
		description: "Vracia hyperbolický sínus čísla",
		abstract: "Vracia hyperbolický sínus čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/sinh-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Ľubovoľné reálne číslo."
		} }
	},
	SQRT: {
		description: "Vracia kladnú druhú odmocninu",
		abstract: "Vracia kladnú druhú odmocninu",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/sqrt-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Číslo, pre ktoré chcete druhú odmocninu."
		} }
	},
	SQRTPI: {
		description: "Vracia druhú odmocninu z (číslo * pí)",
		abstract: "Vracia druhú odmocninu z (číslo * pí)",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/sqrtpi-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Číslo, ktorým sa násobí pí."
		} }
	},
	SUBTOTAL: {
		description: "Vracia medzisúčet v zozname alebo databáze.",
		abstract: "Vracia medzisúčet v zozname alebo databáze",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/subtotal-function"
		}],
		functionParameter: {
			functionNum: {
				name: "číslo_funkcie",
				detail: "Číslo 1-11 alebo 101-111, ktoré určuje funkciu pre medzisúčet. 1-11 zahŕňa ručne skryté riadky, zatiaľ čo 101-111 ich vylučuje; filtrované bunky sa vždy vylučujú."
			},
			ref1: {
				name: "odkaz1",
				detail: "Prvý pomenovaný rozsah alebo odkaz, pre ktorý chcete medzisúčet."
			},
			ref2: {
				name: "odkaz2",
				detail: "Pomenované rozsahy alebo odkazy 2 až 254, pre ktoré chcete medzisúčet."
			}
		}
	},
	SUM: {
		description: "Môžete sčítať jednotlivé hodnoty, odkazy na bunky alebo rozsahy, alebo kombináciu všetkých troch.",
		abstract: "Sčíta svoje argumenty",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/sum-function"
		}],
		functionParameter: {
			number1: {
				name: "Číslo 1",
				detail: "Prvé číslo, ktoré chcete sčítať. Číslo môže byť napríklad 4, odkaz na bunku ako B6 alebo rozsah buniek ako B2:B8."
			},
			number2: {
				name: "Číslo 2",
				detail: "Druhé číslo, ktoré chcete sčítať. Týmto spôsobom môžete zadať až 255 čísel."
			}
		}
	},
	SUMIF: {
		description: "Sčíta hodnoty v rozsahu, ktoré spĺňajú zadané kritériá.",
		abstract: "Sčíta bunky určené daným kritériom",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/sumif-function"
		}],
		functionParameter: {
			range: {
				name: "rozsah",
				detail: "Rozsah buniek, ktoré chcete vyhodnotiť podľa kritérií."
			},
			criteria: {
				name: "kritérium",
				detail: "Kritérium vo forme čísla, výrazu, odkazu na bunku, textu alebo funkcie, ktoré určuje, ktoré bunky sa majú sčítať. Môžu sa použiť zástupné znaky - otáznik (?) pre ľubovoľný jeden znak, hviezdička (*) pre ľubovoľnú postupnosť znakov. Ak chcete nájsť skutočný otáznik alebo hviezdičku, zadajte pred znak tildy (~)."
			},
			sumRange: {
				name: "rozsah_súčtu",
				detail: "Skutočné bunky na sčítanie, ak chcete sčítať iné bunky než tie, ktoré sú uvedené v argumente range. Ak argument sum_range vynecháte, Excel sčíta bunky uvedené v argumente range (tie isté bunky, na ktoré sa uplatnia kritériá)."
			}
		}
	},
	SUMIFS: {
		description: "Sčíta všetky argumenty, ktoré spĺňajú viaceré kritériá.",
		abstract: "Sčíta všetky argumenty, ktoré spĺňajú viaceré kritériá.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/sumifs-function"
		}],
		functionParameter: {
			sumRange: {
				name: "rozsah_súčtu",
				detail: "Rozsah buniek, ktoré sa majú sčítať."
			},
			criteriaRange1: {
				name: "rozsah_kritéria1",
				detail: "Rozsah, ktorý sa testuje podľa kritéria1. Rozsah_kritéria1 a kritérium1 tvoria vyhľadávací pár, kde sa v rozsahu hľadajú konkrétne kritériá. Keď sa položky v rozsahu nájdu, ich zodpovedajúce hodnoty v rozsahu_súčtu sa sčítajú."
			},
			criteria1: {
				name: "kritérium1",
				detail: "Kritérium, ktoré určuje, ktoré bunky v rozsah_kritéria1 sa sčítajú. Napríklad kritérium môže byť 32, \">32\", B4, \"jablká\" alebo \"32\"."
			},
			criteriaRange2: {
				name: "rozsah_kritéria2",
				detail: "Ďalšie rozsahy. Môžete zadať až 127 párov rozsahov."
			},
			criteria2: {
				name: "kritérium2",
				detail: "Ďalšie súvisiace kritériá. Môžete zadať až 127 párov kritérií."
			}
		}
	},
	SUMPRODUCT: {
		description: "Vracia súčet súčinov zodpovedajúcich prvkov polí",
		abstract: "Vracia súčet súčinov zodpovedajúcich prvkov polí",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/sumproduct-function"
		}],
		functionParameter: {
			array1: {
				name: "pole",
				detail: "Prvý argument poľa, ktorého prvky chcete vynásobiť a potom sčítať."
			},
			array2: {
				name: "pole",
				detail: "Argumenty polí 2 až 255, ktorých prvky chcete vynásobiť a potom sčítať."
			}
		}
	},
	SUMSQ: {
		description: "Vracia súčet druhých mocnín argumentov",
		abstract: "Vracia súčet druhých mocnín argumentov",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/sumsq-function"
		}],
		functionParameter: {
			number1: {
				name: "číslo1",
				detail: "Na umocnenie a nájdenie prvého čísla môžete namiesto parametrov oddelených čiarkou použiť aj jedno pole alebo odkaz na pole."
			},
			number2: {
				name: "číslo2",
				detail: "Druhé číslo, ktoré sa má umocniť a sčítať. Týmto spôsobom možno zadať až 255 čísel."
			}
		}
	},
	SUMX2MY2: {
		description: "Vracia súčet rozdielov druhých mocnín zodpovedajúcich hodnôt v dvoch poliach",
		abstract: "Vracia súčet rozdielov druhých mocnín zodpovedajúcich hodnôt v dvoch poliach",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/sumx2my2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "pole_x",
				detail: "Prvé pole alebo rozsah hodnôt."
			},
			arrayY: {
				name: "pole_y",
				detail: "Druhé pole alebo rozsah hodnôt."
			}
		}
	},
	SUMX2PY2: {
		description: "Vracia súčet súčtov druhých mocnín zodpovedajúcich hodnôt v dvoch poliach",
		abstract: "Vracia súčet súčtov druhých mocnín zodpovedajúcich hodnôt v dvoch poliach",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/sumx2py2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "pole_x",
				detail: "Prvé pole alebo rozsah hodnôt."
			},
			arrayY: {
				name: "pole_y",
				detail: "Druhé pole alebo rozsah hodnôt."
			}
		}
	},
	SUMXMY2: {
		description: "Vracia súčet druhých mocnín rozdielov zodpovedajúcich hodnôt v dvoch poliach",
		abstract: "Vracia súčet druhých mocnín rozdielov zodpovedajúcich hodnôt v dvoch poliach",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/sumxmy2-function"
		}],
		functionParameter: {
			arrayX: {
				name: "pole_x",
				detail: "Prvé pole alebo rozsah hodnôt."
			},
			arrayY: {
				name: "pole_y",
				detail: "Druhé pole alebo rozsah hodnôt."
			}
		}
	},
	TAN: {
		description: "Vracia tangens čísla.",
		abstract: "Vracia tangens čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/tan-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Uhol v radiánoch, pre ktorý chcete tangens."
		} }
	},
	TANH: {
		description: "Vracia hyperbolický tangens čísla.",
		abstract: "Vracia hyperbolický tangens čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/tanh-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Ľubovoľné reálne číslo."
		} }
	},
	TRUNC: {
		description: "Skráti číslo na celé číslo",
		abstract: "Skráti číslo na celé číslo",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/trunc-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Číslo, ktoré chcete skrátiť."
			},
			numDigits: {
				name: "počet_číslic",
				detail: "Číslo určujúce presnosť skrátenia. Predvolená hodnota num_digits je 0 (nula)."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/statistical/sk-SK.ts
const locale$4 = {
	AVEDEV: {
		description: "Vracia priemer absolútnych odchýlok dátových bodov od ich priemeru.",
		abstract: "Vracia priemer absolútnych odchýlok dátových bodov od ich priemeru",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/avedev-function"
		}],
		functionParameter: {
			number1: {
				name: "číslo1",
				detail: "Prvé číslo, odkaz na bunku alebo rozsah, pre ktorý chcete priemer."
			},
			number2: {
				name: "číslo2",
				detail: "Ďalšie čísla, odkazy na bunky alebo rozsahy, pre ktoré chcete priemer, maximálne 255."
			}
		}
	},
	AVERAGE: {
		description: "Vracia priemer (aritmetický priemer) argumentov.",
		abstract: "Vracia priemer svojich argumentov",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/average-function"
		}],
		functionParameter: {
			number1: {
				name: "číslo1",
				detail: "Prvé číslo, odkaz na bunku alebo rozsah, pre ktorý chcete priemer."
			},
			number2: {
				name: "číslo2",
				detail: "Ďalšie čísla, odkazy na bunky alebo rozsahy, pre ktoré chcete priemer, maximálne 255."
			}
		}
	},
	AVERAGE_WEIGHTED: {
		description: "Nájde vážený priemer množiny hodnôt na základe hodnôt a zodpovedajúcich váh.",
		abstract: "Nájde vážený priemer množiny hodnôt na základe hodnôt a zodpovedajúcich váh.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.google.com/docs/answer/9084098?hl=sk"
		}],
		functionParameter: {
			values: {
				name: "hodnoty",
				detail: "Hodnoty, pre ktoré sa má vypočítať priemer."
			},
			weights: {
				name: "váhy",
				detail: "Zodpovedajúci zoznam váh, ktoré sa majú použiť."
			},
			additionalValues: {
				name: "ďalšie_hodnoty",
				detail: "Ďalšie hodnoty na spriemerovanie."
			},
			additionalWeights: {
				name: "ďalšie_váhy",
				detail: "Ďalšie váhy, ktoré sa majú použiť."
			}
		}
	},
	AVERAGEA: {
		description: "Vracia priemer svojich argumentov vrátane čísel, textu a logických hodnôt.",
		abstract: "Vracia priemer svojich argumentov vrátane čísel, textu a logických hodnôt",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/averagea-function"
		}],
		functionParameter: {
			value1: {
				name: "hodnota1",
				detail: "Prvé číslo, odkaz na bunku alebo rozsah, pre ktorý chcete priemer."
			},
			value2: {
				name: "hodnota2",
				detail: "Ďalšie čísla, odkazy na bunky alebo rozsahy, pre ktoré chcete priemer, maximálne 255."
			}
		}
	},
	AVERAGEIF: {
		description: "Vracia priemer (aritmetický priemer) všetkých buniek v rozsahu, ktoré spĺňajú dané kritérium.",
		abstract: "Vracia priemer (aritmetický priemer) všetkých buniek v rozsahu, ktoré spĺňajú dané kritérium",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/averageif-function"
		}],
		functionParameter: {
			range: {
				name: "rozsah",
				detail: "Jedna alebo viac buniek na spriemerovanie vrátane čísel alebo názvov, polí alebo odkazov, ktoré obsahujú čísla."
			},
			criteria: {
				name: "kritérium",
				detail: "Kritérium vo forme čísla, výrazu, odkazu na bunku alebo textu, ktoré určuje, ktoré bunky sa spriemerujú. Napríklad kritérium môže byť 32, \"32\", \">32\", \"jablká\" alebo B4."
			},
			averageRange: {
				name: "rozsah_priemeru",
				detail: "Skutočná množina buniek na spriemerovanie. Ak je vynechaná, použije sa rozsah."
			}
		}
	},
	AVERAGEIFS: {
		description: "Vracia priemer (aritmetický priemer) všetkých buniek, ktoré spĺňajú viacero kritérií.",
		abstract: "Vracia priemer (aritmetický priemer) všetkých buniek, ktoré spĺňajú viacero kritérií",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/averageifs-function"
		}],
		functionParameter: {
			averageRange: {
				name: "rozsah_priemeru",
				detail: "Jedna alebo viac buniek na spriemerovanie vrátane čísel alebo názvov, polí alebo odkazov, ktoré obsahujú čísla."
			},
			criteriaRange1: {
				name: "rozsah_kritéria1",
				detail: "Množina buniek, ktoré sa vyhodnocujú podľa kritéria."
			},
			criteria1: {
				name: "kritérium1",
				detail: "Používa sa na určenie buniek, pre ktoré sa vypočíta priemer. Napríklad kritérium môže byť 32, \"32\", \">32\", \"jablko\" alebo B4."
			},
			criteriaRange2: {
				name: "rozsah_kritéria2",
				detail: "Ďalšie rozsahy. Môžete zadať až 127 rozsahov."
			},
			criteria2: {
				name: "kritérium2",
				detail: "Ďalšie súvisiace kritériá. Môžete zadať až 127 kritérií."
			}
		}
	},
	BETA_DIST: {
		description: "Vracia kumulatívnu distribučnú funkciu beta rozdelenia",
		abstract: "Vracia kumulatívnu distribučnú funkciu beta rozdelenia",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/beta-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Hodnota medzi A a B, v ktorej sa má funkcia vyhodnotiť."
			},
			alpha: {
				name: "alfa",
				detail: "Parameter rozdelenia."
			},
			beta: {
				name: "beta",
				detail: "Parameter rozdelenia."
			},
			cumulative: {
				name: "kumulatívne",
				detail: "Logická hodnota, ktorá určuje formu funkcie. Ak je kumulatívne TRUE, BETA.DIST vráti kumulatívnu distribučnú funkciu; ak FALSE, vráti hustotu pravdepodobnosti."
			},
			A: {
				name: "A",
				detail: "Dolná hranica intervalu x."
			},
			B: {
				name: "B",
				detail: "Horná hranica intervalu x."
			}
		}
	},
	BETA_INV: {
		description: "Vracia inverznú hodnotu kumulatívnej distribučnej funkcie pre zadané beta rozdelenie",
		abstract: "Vracia inverznú hodnotu kumulatívnej distribučnej funkcie pre zadané beta rozdelenie",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/beta-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "pravdepodobnosť",
				detail: "Pravdepodobnosť spojená s beta rozdelením."
			},
			alpha: {
				name: "alfa",
				detail: "Parameter rozdelenia."
			},
			beta: {
				name: "beta",
				detail: "Parameter rozdelenia."
			},
			A: {
				name: "A",
				detail: "Dolná hranica intervalu x."
			},
			B: {
				name: "B",
				detail: "Horná hranica intervalu x."
			}
		}
	},
	BINOM_DIST: {
		description: "Vracia pravdepodobnosť binomického rozdelenia pre jednotlivý počet úspechov",
		abstract: "Vracia pravdepodobnosť binomického rozdelenia pre jednotlivý počet úspechov",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/binom-dist-function"
		}],
		functionParameter: {
			numberS: {
				name: "počet_úspechov",
				detail: "Počet úspechov v pokusoch."
			},
			trials: {
				name: "pokusy",
				detail: "Počet nezávislých pokusov."
			},
			probabilityS: {
				name: "pravdepodobnosť_úspechu",
				detail: "Pravdepodobnosť úspechu v každom pokuse."
			},
			cumulative: {
				name: "kumulatívne",
				detail: "Logická hodnota, ktorá určuje formu funkcie. Ak je kumulatívne TRUE, BINOM.DIST vráti kumulatívnu distribučnú funkciu; ak FALSE, vráti hustotu pravdepodobnosti."
			}
		}
	},
	BINOM_DIST_RANGE: {
		description: "Vracia pravdepodobnosť výsledku pokusu pomocou binomického rozdelenia",
		abstract: "Vracia pravdepodobnosť výsledku pokusu pomocou binomického rozdelenia",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/binom-dist-range-function"
		}],
		functionParameter: {
			trials: {
				name: "pokusy",
				detail: "Počet nezávislých pokusov."
			},
			probabilityS: {
				name: "pravdepodobnosť_úspechu",
				detail: "Pravdepodobnosť úspechu v každom pokuse."
			},
			numberS: {
				name: "počet_úspechov",
				detail: "Počet úspechov v pokusoch."
			},
			numberS2: {
				name: "počet_úspechov2",
				detail: "Ak je zadaný, vráti pravdepodobnosť, že počet úspešných pokusov bude medzi number_s a number_s2."
			}
		}
	},
	BINOM_INV: {
		description: "Vracia najmenšiu hodnotu, pre ktorú je kumulatívne binomické rozdelenie menšie alebo rovné kritériu",
		abstract: "Vracia najmenšiu hodnotu, pre ktorú je kumulatívne binomické rozdelenie menšie alebo rovné kritériu",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/binom-inv-function"
		}],
		functionParameter: {
			trials: {
				name: "pokusy",
				detail: "Počet Bernoulliho pokusov."
			},
			probabilityS: {
				name: "pravdepodobnosť_úspechu",
				detail: "Pravdepodobnosť úspechu v každom pokuse."
			},
			alpha: {
				name: "alfa",
				detail: "Hodnota kritéria."
			}
		}
	},
	CHISQ_DIST: {
		description: "Vracia ľavostrannú pravdepodobnosť chí-kvadrát rozdelenia.",
		abstract: "Vracia ľavostrannú pravdepodobnosť chí-kvadrát rozdelenia.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/chisq-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Hodnota, v ktorej chcete rozdelenie vyhodnotiť."
			},
			degFreedom: {
				name: "stupne_voľnosti",
				detail: "Počet stupňov voľnosti."
			},
			cumulative: {
				name: "kumulatívne",
				detail: "Logická hodnota, ktorá určuje formu funkcie. Ak je kumulatívne TRUE, CHISQ.DIST vráti kumulatívnu distribučnú funkciu; ak FALSE, vráti hustotu pravdepodobnosti."
			}
		}
	},
	CHISQ_DIST_RT: {
		description: "Vracia pravostrannú pravdepodobnosť chí-kvadrát rozdelenia.",
		abstract: "Vracia pravostrannú pravdepodobnosť chí-kvadrát rozdelenia.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/chisq-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Hodnota, v ktorej chcete rozdelenie vyhodnotiť."
			},
			degFreedom: {
				name: "stupne_voľnosti",
				detail: "Počet stupňov voľnosti."
			}
		}
	},
	CHISQ_INV: {
		description: "Vracia inverznú hodnotu ľavostrannej pravdepodobnosti chí-kvadrát rozdelenia.",
		abstract: "Vracia inverznú hodnotu ľavostrannej pravdepodobnosti chí-kvadrát rozdelenia.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/chisq-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "pravdepodobnosť",
				detail: "Pravdepodobnosť spojená s chí-kvadrát rozdelením."
			},
			degFreedom: {
				name: "stupne_voľnosti",
				detail: "Počet stupňov voľnosti."
			}
		}
	},
	CHISQ_INV_RT: {
		description: "Vracia inverznú hodnotu pravostrannej pravdepodobnosti chí-kvadrát rozdelenia.",
		abstract: "Vracia inverznú hodnotu pravostrannej pravdepodobnosti chí-kvadrát rozdelenia.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/chisq-inv-rt-function"
		}],
		functionParameter: {
			probability: {
				name: "pravdepodobnosť",
				detail: "Pravdepodobnosť spojená s chí-kvadrát rozdelením."
			},
			degFreedom: {
				name: "stupne_voľnosti",
				detail: "Počet stupňov voľnosti."
			}
		}
	},
	CHISQ_TEST: {
		description: "Vracia test nezávislosti",
		abstract: "Vracia test nezávislosti",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/chisq-test-function"
		}],
		functionParameter: {
			actualRange: {
				name: "skutočný_rozsah",
				detail: "Rozsah údajov, ktorý obsahuje pozorované hodnoty."
			},
			expectedRange: {
				name: "očakávaný_rozsah",
				detail: "Rozsah údajov, ktorý obsahuje očakávané hodnoty."
			}
		}
	},
	CONFIDENCE_NORM: {
		description: "Vracia interval spoľahlivosti pre priemer populácie pri použití normálneho rozdelenia",
		abstract: "Vracia interval spoľahlivosti pre priemer populácie pri použití normálneho rozdelenia",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/confidence-norm-function"
		}],
		functionParameter: {
			alpha: {
				name: "alfa",
				detail: "Úroveň významnosti použitá na výpočet úrovne spoľahlivosti."
			},
			standardDev: {
				name: "štandardná_odchýlka",
				detail: "Štandardná odchýlka populácie."
			},
			size: {
				name: "veľkosť",
				detail: "Veľkosť výberu."
			}
		}
	},
	CONFIDENCE_T: {
		description: "Vracia interval spoľahlivosti pre priemer populácie pri použití t-rozdelenia",
		abstract: "Vracia interval spoľahlivosti pre priemer populácie pri použití t-rozdelenia",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/confidence-t-function"
		}],
		functionParameter: {
			alpha: {
				name: "alfa",
				detail: "Úroveň významnosti použitá na výpočet úrovne spoľahlivosti."
			},
			standardDev: {
				name: "štandardná_odchýlka",
				detail: "Štandardná odchýlka populácie."
			},
			size: {
				name: "veľkosť",
				detail: "Veľkosť výberu."
			}
		}
	},
	CORREL: {
		description: "Vracia korelačný koeficient medzi dvoma množinami údajov",
		abstract: "Vracia korelačný koeficient medzi dvoma množinami údajov",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/correl-function"
		}],
		functionParameter: {
			array1: {
				name: "pole1",
				detail: "Prvá množina hodnôt buniek."
			},
			array2: {
				name: "pole2",
				detail: "Druhá množina hodnôt buniek."
			}
		}
	},
	COUNT: {
		description: "Počíta počet buniek obsahujúcich čísla v zozname argumentov.",
		abstract: "Počíta počet buniek v zozname argumentov, ktoré obsahujú čísla",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/count-function"
		}],
		functionParameter: {
			value1: {
				name: "hodnota1",
				detail: "Prvá položka, odkaz na bunku alebo rozsah, v ktorom chcete spočítať čísla."
			},
			value2: {
				name: "hodnota2",
				detail: "Ďalšie položky, odkazy na bunky alebo rozsahy, v ktorých chcete spočítať čísla, maximálne 255."
			}
		}
	},
	COUNTA: {
		description: "Počíta počet neprázdnych buniek v zozname argumentov.",
		abstract: "Počíta počet neprázdnych buniek v zozname argumentov",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/counta-function"
		}],
		functionParameter: {
			value1: {
				name: "hodnota1",
				detail: "Prvé číslo, odkaz na bunku alebo rozsah, pre ktorý chcete priemer."
			},
			value2: {
				name: "hodnota2",
				detail: "Ďalšie čísla, odkazy na bunky alebo rozsahy, pre ktoré chcete priemer, maximálne 255."
			}
		}
	},
	COUNTBLANK: {
		description: "Počíta počet prázdnych buniek v zadanom rozsahu buniek.",
		abstract: "Počíta počet prázdnych buniek v zadanom rozsahu buniek",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/countblank-function"
		}],
		functionParameter: { range: {
			name: "rozsah",
			detail: "Rozsah, z ktorého chcete spočítať prázdne bunky."
		} }
	},
	COUNTIF: {
		description: "Počíta počet buniek v rozsahu, ktoré spĺňajú zadané kritérium.",
		abstract: "Počíta počet buniek v rozsahu, ktoré spĺňajú zadané kritérium",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/use-the-countif-function-in-microsoft-excel"
		}],
		functionParameter: {
			range: {
				name: "rozsah",
				detail: "Rozsah buniek, ktoré chcete spočítať."
			},
			criteria: {
				name: "kritérium",
				detail: "Kritérium vo forme čísla, výrazu, odkazu na bunku alebo textu, ktoré určuje, ktoré bunky sa budú počítať. Napríklad kritérium môže byť 32, \">32\", B4, \"jablká\" alebo \"32\"."
			}
		}
	},
	COUNTIFS: {
		description: "Počíta počet buniek v rozsahu, ktoré spĺňajú viacero kritérií.",
		abstract: "Počíta počet buniek v rozsahu, ktoré spĺňajú viacero kritérií",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/countifs-function"
		}],
		functionParameter: {
			criteriaRange1: {
				name: "rozsah_kritéria1",
				detail: "Prvý rozsah, v ktorom sa vyhodnotia kritériá."
			},
			criteria1: {
				name: "kritérium1",
				detail: "Kritérium, ktoré určuje, ktoré bunky v rozsah_kritéria1 sa budú počítať."
			},
			criteriaRange2: {
				name: "rozsah_kritéria2",
				detail: "Ďalšie rozsahy. Môžete zadať až 127 párov rozsahov."
			},
			criteria2: {
				name: "kritérium2",
				detail: "Ďalšie súvisiace kritériá. Môžete zadať až 127 párov kritérií."
			}
		}
	},
	COVARIANCE_P: {
		description: "Vracia kovarianciu populácie, priemer súčinov odchýlok pre každý dátový bod.",
		abstract: "Vracia kovarianciu populácie",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/covariance-p-function"
		}],
		functionParameter: {
			array1: {
				name: "pole1",
				detail: "Prvý rozsah hodnôt buniek."
			},
			array2: {
				name: "pole2",
				detail: "Druhý rozsah hodnôt buniek."
			}
		}
	},
	COVARIANCE_S: {
		description: "Vracia kovarianciu vzorky, priemer súčinov odchýlok pre každý dátový bod.",
		abstract: "Vracia kovarianciu vzorky",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/covariance-s-function"
		}],
		functionParameter: {
			array1: {
				name: "pole1",
				detail: "Prvý rozsah hodnôt buniek."
			},
			array2: {
				name: "pole2",
				detail: "Druhý rozsah hodnôt buniek."
			}
		}
	},
	DEVSQ: {
		description: "Vracia súčet druhých mocnín odchýlok dátových bodov od ich priemeru.",
		abstract: "Vracia súčet druhých mocnín odchýlok dátových bodov od ich priemeru",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/devsq-function"
		}],
		functionParameter: {
			number1: {
				name: "číslo1",
				detail: "Prvý argument, pre ktorý chcete vypočítať odchýlky."
			},
			number2: {
				name: "číslo2",
				detail: "Ďalšie argumenty, pre ktoré chcete vypočítať odchýlky, maximálne 255."
			}
		}
	},
	EXPON_DIST: {
		description: "Vracia exponenciálne rozdelenie.",
		abstract: "Vracia exponenciálne rozdelenie",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/expon-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Hodnota funkcie."
			},
			lambda: {
				name: "lambda",
				detail: "Hodnota parametra."
			},
			cumulative: {
				name: "kumulatívne",
				detail: "Logická hodnota, ktorá určuje formu funkcie. Ak je kumulatívne TRUE, EXPON.DIST vráti kumulatívnu distribučnú funkciu; ak FALSE, vráti hustotu pravdepodobnosti."
			}
		}
	},
	F_DIST: {
		description: "Vracia F-rozdelenie pravdepodobnosti.",
		abstract: "Vracia F-rozdelenie pravdepodobnosti",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/f-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Hodnota, v ktorej chcete vyhodnotiť funkciu."
			},
			degFreedom1: {
				name: "stupne_voľnosti1",
				detail: "Počet stupňov voľnosti v čitateli."
			},
			degFreedom2: {
				name: "stupne_voľnosti2",
				detail: "Počet stupňov voľnosti v menovateli."
			},
			cumulative: {
				name: "kumulatívne",
				detail: "Logická hodnota, ktorá určuje formu funkcie. Ak je kumulatívne TRUE, F.DIST vráti kumulatívnu distribučnú funkciu; ak FALSE, vráti hustotu pravdepodobnosti."
			}
		}
	},
	F_DIST_RT: {
		description: "Vracia pravostrannú pravdepodobnosť F-rozdelenia.",
		abstract: "Vracia pravostrannú pravdepodobnosť F-rozdelenia",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/f-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Hodnota, v ktorej chcete vyhodnotiť funkciu."
			},
			degFreedom1: {
				name: "stupne_voľnosti1",
				detail: "Počet stupňov voľnosti v čitateli."
			},
			degFreedom2: {
				name: "stupne_voľnosti2",
				detail: "Počet stupňov voľnosti v menovateli."
			}
		}
	},
	F_INV: {
		description: "Vracia inverznú hodnotu F-rozdelenia pravdepodobnosti.",
		abstract: "Vracia inverznú hodnotu F-rozdelenia pravdepodobnosti",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/f-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "pravdepodobnosť",
				detail: "Pravdepodobnosť spojená s F-rozdelením."
			},
			degFreedom1: {
				name: "stupne_voľnosti1",
				detail: "Počet stupňov voľnosti v čitateli."
			},
			degFreedom2: {
				name: "stupne_voľnosti2",
				detail: "Počet stupňov voľnosti v menovateli."
			}
		}
	},
	F_INV_RT: {
		description: "Vracia inverznú hodnotu pravostrannej pravdepodobnosti F-rozdelenia.",
		abstract: "Vracia inverznú hodnotu pravostrannej pravdepodobnosti F-rozdelenia",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/f-inv-rt-function"
		}],
		functionParameter: {
			probability: {
				name: "pravdepodobnosť",
				detail: "Pravdepodobnosť spojená s F-rozdelením."
			},
			degFreedom1: {
				name: "stupne_voľnosti1",
				detail: "Počet stupňov voľnosti v čitateli."
			},
			degFreedom2: {
				name: "stupne_voľnosti2",
				detail: "Počet stupňov voľnosti v menovateli."
			}
		}
	},
	F_TEST: {
		description: "Vracia výsledok F-testu.",
		abstract: "Vracia výsledok F-testu",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/f-test-function"
		}],
		functionParameter: {
			array1: {
				name: "pole1",
				detail: "Prvá matica alebo rozsah údajov."
			},
			array2: {
				name: "pole2",
				detail: "Druhá matica alebo rozsah údajov."
			}
		}
	},
	FISHER: {
		description: "Vracia Fisherovu transformáciu.",
		abstract: "Vracia Fisherovu transformáciu",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/fisher-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Číselná hodnota, pre ktorú chcete transformáciu."
		} }
	},
	FISHERINV: {
		description: "Vracia inverznú Fisherovu transformáciu.",
		abstract: "Vracia inverznú Fisherovu transformáciu",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/fisherinv-function"
		}],
		functionParameter: { y: {
			name: "y",
			detail: "Hodnota, pre ktorú chcete inverznú transformáciu."
		} }
	},
	FORECAST: {
		description: "Vracia predpovedanú hodnotu na základe lineárneho trendu.",
		abstract: "Vracia predpovedanú hodnotu na základe lineárneho trendu",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/forecast-and-forecast-linear-functions"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Hodnota x, pre ktorú chcete predpoveď."
			},
			knownYs: {
				name: "známe_y",
				detail: "Závislé hodnoty vynesené v známom rozsahu."
			},
			knownXs: {
				name: "známe_x",
				detail: "Nezávislé hodnoty vynesené v známom rozsahu."
			}
		}
	},
	FORECAST_ETS: {
		description: "Vracia budúcu hodnotu na základe existujúcich (historických) hodnôt pomocou exponenciálneho vyhladzovania (ETS).",
		abstract: "Vracia budúcu hodnotu na základe existujúcich (historických) hodnôt pomocou exponenciálneho vyhladzovania (ETS)",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/forecast-ets-function"
		}],
		functionParameter: {
			targetDate: {
				name: "Cieľový dátum",
				detail: "Údajový bod, pre ktorý chcete predpovedať hodnotu."
			},
			values: {
				name: "Hodnoty",
				detail: "Historické hodnoty použité na prognózu."
			},
			timeline: {
				name: "Časová os",
				detail: "Nezávislý rozsah alebo pole číselných dátumov či časov s konštantným krokom."
			},
			seasonality: {
				name: "Sezónnosť",
				detail: "Voliteľné. 1 pre automatické zistenie a 0 bez sezónnosti."
			},
			dataCompletion: {
				name: "Doplnenie údajov",
				detail: "Voliteľné. Použite 1 na interpoláciu chýbajúcich bodov alebo 0 na ich nahradenie nulou."
			},
			aggregation: {
				name: "Agregácia",
				detail: "Voliteľné. Hodnota 1 až 7 určuje agregáciu duplicitných časových pečiatok."
			}
		}
	},
	FORECAST_ETS_CONFINT: {
		description: "Vracia interval spoľahlivosti pre predpovedanú hodnotu v zadanom cieľovom dátume.",
		abstract: "Vracia interval spoľahlivosti pre predpovedanú hodnotu v zadanom cieľovom dátume",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/forecast-ets-confint-function"
		}],
		functionParameter: {
			targetDate: {
				name: "Cieľový dátum",
				detail: "Údajový bod, pre ktorý chcete predpovedať hodnotu."
			},
			values: {
				name: "Hodnoty",
				detail: "Historické hodnoty použité na prognózu."
			},
			timeline: {
				name: "Časová os",
				detail: "Nezávislý rozsah alebo pole číselných dátumov či časov s konštantným krokom."
			},
			confidenceLevel: {
				name: "Úroveň spoľahlivosti",
				detail: "Voliteľné. Číslo od 0 do 1; predvolená hodnota je 0,95."
			},
			seasonality: {
				name: "Sezónnosť",
				detail: "Voliteľné. 1 pre automatické zistenie a 0 bez sezónnosti."
			},
			dataCompletion: {
				name: "Doplnenie údajov",
				detail: "Voliteľné. Použite 1 na interpoláciu chýbajúcich bodov alebo 0 na ich nahradenie nulou."
			},
			aggregation: {
				name: "Agregácia",
				detail: "Voliteľné. Hodnota 1 až 7 určuje agregáciu duplicitných časových pečiatok."
			}
		}
	},
	FORECAST_ETS_SEASONALITY: {
		description: "Vracia dĺžku sezónneho vzoru pre zadané časové údaje.",
		abstract: "Vracia dĺžku sezónneho vzoru pre zadané časové údaje",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/forecast-ets-seasonality-function"
		}],
		functionParameter: {
			values: {
				name: "Hodnoty",
				detail: "Historické hodnoty použité na prognózu."
			},
			timeline: {
				name: "Časová os",
				detail: "Nezávislý rozsah alebo pole číselných dátumov či časov s konštantným krokom."
			},
			dataCompletion: {
				name: "Doplnenie údajov",
				detail: "Voliteľné. Použite 1 na interpoláciu chýbajúcich bodov alebo 0 na ich nahradenie nulou."
			},
			aggregation: {
				name: "Agregácia",
				detail: "Voliteľné. Hodnota 1 až 7 určuje agregáciu duplicitných časových pečiatok."
			}
		}
	},
	FORECAST_ETS_STAT: {
		description: "Vracia štatistickú hodnotu pre predikciu ETS.",
		abstract: "Vracia štatistickú hodnotu pre predikciu ETS",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/forecast-ets-stat-function"
		}],
		functionParameter: {
			values: {
				name: "Hodnoty",
				detail: "Historické hodnoty použité na prognózu."
			},
			timeline: {
				name: "Časová os",
				detail: "Nezávislý rozsah alebo pole číselných dátumov či časov s konštantným krokom."
			},
			statisticType: {
				name: "Typ štatistiky",
				detail: "Hodnota 1 až 8 určuje vrátenú štatistiku prognózy."
			},
			seasonality: {
				name: "Sezónnosť",
				detail: "Voliteľné. 1 pre automatické zistenie a 0 bez sezónnosti."
			},
			dataCompletion: {
				name: "Doplnenie údajov",
				detail: "Voliteľné. Použite 1 na interpoláciu chýbajúcich bodov alebo 0 na ich nahradenie nulou."
			},
			aggregation: {
				name: "Agregácia",
				detail: "Voliteľné. Hodnota 1 až 7 určuje agregáciu duplicitných časových pečiatok."
			}
		}
	},
	FORECAST_LINEAR: {
		description: "Vracia predpovedanú hodnotu na základe lineárneho trendu.",
		abstract: "Vracia predpovedanú hodnotu na základe lineárneho trendu",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/forecast-and-forecast-linear-functions"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Hodnota x, pre ktorú chcete predpoveď."
			},
			knownYs: {
				name: "známe_y",
				detail: "Závislé hodnoty vynesené v známom rozsahu."
			},
			knownXs: {
				name: "známe_x",
				detail: "Nezávislé hodnoty vynesené v známom rozsahu."
			}
		}
	},
	FREQUENCY: {
		description: "Vracia frekvenčné rozdelenie ako vertikálne pole.",
		abstract: "Vracia frekvenčné rozdelenie ako vertikálne pole",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/frequency-function"
		}],
		functionParameter: {
			dataArray: {
				name: "pole_údajov",
				detail: "Pole alebo odkaz na súbor hodnôt, pre ktoré chcete vypočítať frekvencie."
			},
			binsArray: {
				name: "pole_tried",
				detail: "Pole alebo odkaz na intervaly, do ktorých chcete hodnoty v data_array rozdeliť."
			}
		}
	},
	GAMMA: {
		description: "Vracia hodnotu funkcie gama.",
		abstract: "Vracia hodnotu funkcie gama",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/gamma-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Vstupná hodnota pre funkciu gama."
		} }
	},
	GAMMA_DIST: {
		description: "Vracia rozdelenie gama.",
		abstract: "Vracia rozdelenie gama",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/gamma-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Hodnota, pri ktorej chcete vyhodnotiť rozdelenie."
			},
			alpha: {
				name: "alfa",
				detail: "Parameter rozdelenia."
			},
			beta: {
				name: "beta",
				detail: "Parameter rozdelenia."
			},
			cumulative: {
				name: "kumulatívne",
				detail: "Logická hodnota, ktorá určuje formu funkcie. Ak je kumulatívne TRUE, GAMMA.DIST vráti kumulatívnu distribučnú funkciu; ak FALSE, vráti hustotu pravdepodobnosti."
			}
		}
	},
	GAMMA_INV: {
		description: "Vracia inverznú hodnotu kumulatívnej distribučnej funkcie pre rozdelenie gama.",
		abstract: "Vracia inverznú hodnotu kumulatívnej distribučnej funkcie pre rozdelenie gama",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/gamma-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "pravdepodobnosť",
				detail: "Pravdepodobnosť spojená s rozdelením gama."
			},
			alpha: {
				name: "alfa",
				detail: "Parameter rozdelenia."
			},
			beta: {
				name: "beta",
				detail: "Parameter rozdelenia."
			}
		}
	},
	GAMMALN: {
		description: "Vracia prirodzený logaritmus funkcie gama.",
		abstract: "Vracia prirodzený logaritmus funkcie gama",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/gammaln-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Hodnota, pre ktorú chcete prirodzený logaritmus funkcie gama."
		} }
	},
	GAMMALN_PRECISE: {
		description: "Vracia prirodzený logaritmus funkcie gama, presný výpočet.",
		abstract: "Vracia prirodzený logaritmus funkcie gama, presný výpočet",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/gammaln-precise-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Hodnota, pre ktorú chcete prirodzený logaritmus funkcie gama."
		} }
	},
	GAUSS: {
		description: "Vracia pravdepodobnosť, že náhodná premenná zo štandardného normálneho rozdelenia je menšia než zadaná hodnota.",
		abstract: "Vracia pravdepodobnosť, že náhodná premenná zo štandardného normálneho rozdelenia je menšia než zadaná hodnota",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/gauss-function"
		}],
		functionParameter: { z: {
			name: "z",
			detail: "Hodnota, pri ktorej chcete vyhodnotiť rozdelenie."
		} }
	},
	GEOMEAN: {
		description: "Vracia geometrický priemer.",
		abstract: "Vracia geometrický priemer",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/geomean-function"
		}],
		functionParameter: {
			number1: {
				name: "číslo1",
				detail: "Prvé číslo, odkaz na bunku alebo rozsah, pre ktorý chcete geometrický priemer."
			},
			number2: {
				name: "číslo2",
				detail: "Ďalšie čísla, odkazy na bunky alebo rozsahy, pre ktoré chcete geometrický priemer, maximálne 255."
			}
		}
	},
	GROWTH: {
		description: "Vracia predpovedané hodnoty exponenciálneho trendu.",
		abstract: "Vracia predpovedané hodnoty exponenciálneho trendu",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/growth-function"
		}],
		functionParameter: {
			knownYs: {
				name: "známe_y",
				detail: "Závislé hodnoty vynesené v známom rozsahu."
			},
			knownXs: {
				name: "známe_x",
				detail: "Nezávislé hodnoty vynesené v známom rozsahu."
			},
			newXs: {
				name: "nové_x",
				detail: "Nové hodnoty x, pre ktoré chcete vypočítať nové y."
			},
			constb: {
				name: "konštanta_b",
				detail: "Logická hodnota určujúca, či vynútiť konštantu b na hodnotu 1. Ak je TRUE alebo vynechaná, b sa vypočíta normálne. Ak je FALSE, b sa nastaví na 1."
			}
		}
	},
	HARMEAN: {
		description: "Vracia harmonický priemer.",
		abstract: "Vracia harmonický priemer",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/harmean-function"
		}],
		functionParameter: {
			number1: {
				name: "číslo1",
				detail: "Prvé číslo, odkaz na bunku alebo rozsah, pre ktorý chcete harmonický priemer."
			},
			number2: {
				name: "číslo2",
				detail: "Ďalšie čísla, odkazy na bunky alebo rozsahy, pre ktoré chcete harmonický priemer, maximálne 255."
			}
		}
	},
	HYPGEOM_DIST: {
		description: "Vracia hypergeometrické rozdelenie.",
		abstract: "Vracia hypergeometrické rozdelenie",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/hypgeom-dist-function"
		}],
		functionParameter: {
			sampleS: {
				name: "vzorka_úspechov",
				detail: "Počet úspechov vo vzorke."
			},
			numberSample: {
				name: "veľkosť_vzorky",
				detail: "Veľkosť vzorky."
			},
			populationS: {
				name: "populácia_úspechov",
				detail: "Počet úspechov v populácii."
			},
			numberPop: {
				name: "veľkosť_populácie",
				detail: "Veľkosť populácie."
			},
			cumulative: {
				name: "kumulatívne",
				detail: "Logická hodnota, ktorá určuje formu funkcie. Ak je kumulatívne TRUE, HYPGEOM.DIST vráti kumulatívnu distribučnú funkciu; ak FALSE, vráti hustotu pravdepodobnosti."
			}
		}
	},
	INTERCEPT: {
		description: "Vracia priesečník regresnej priamky.",
		abstract: "Vracia priesečník regresnej priamky",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/intercept-function"
		}],
		functionParameter: {
			knownYs: {
				name: "známe_y",
				detail: "Závislé hodnoty vynesené v známom rozsahu."
			},
			knownXs: {
				name: "známe_x",
				detail: "Nezávislé hodnoty vynesené v známom rozsahu."
			}
		}
	},
	KURT: {
		description: "Vracia špicatosť množiny údajov.",
		abstract: "Vracia špicatosť množiny údajov",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/kurt-function"
		}],
		functionParameter: {
			number1: {
				name: "číslo1",
				detail: "Prvé číslo, odkaz na bunku alebo rozsah, pre ktoré chcete špicatosť."
			},
			number2: {
				name: "číslo2",
				detail: "Ďalšie čísla, odkazy na bunky alebo rozsahy, pre ktoré chcete špicatosť, maximálne 255."
			}
		}
	},
	LARGE: {
		description: "Vracia k-tú najväčšiu hodnotu v množine údajov.",
		abstract: "Vracia k-tú najväčšiu hodnotu v množine údajov",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/large-function"
		}],
		functionParameter: {
			array: {
				name: "pole",
				detail: "Pole alebo rozsah údajov, z ktorého chcete získať najväčšiu hodnotu."
			},
			k: {
				name: "k",
				detail: "Poradie hodnoty v množine údajov."
			}
		}
	},
	LINEST: {
		description: "Vracia štatistiky pre priamku podľa metódy najmenších štvorcov.",
		abstract: "Vracia štatistiky pre priamku podľa metódy najmenších štvorcov",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/linest-function"
		}],
		functionParameter: {
			knownYs: {
				name: "známe_y",
				detail: "Sada závislých údajov (y) vo funkcii y = mx + b."
			},
			knownXs: {
				name: "známe_x",
				detail: "Sada nezávislých údajov (x) vo funkcii y = mx + b."
			},
			constb: {
				name: "konštanta_b",
				detail: "Logická hodnota, ktorá určuje, či sa má priamka pretínať s osou y v bode 0."
			},
			stats: {
				name: "štatistiky",
				detail: "Logická hodnota, ktorá určuje, či majú byť vrátené doplnkové regresné štatistiky."
			}
		}
	},
	LOGEST: {
		description: "Vracia štatistiky pre exponenciálnu krivku podľa metódy najmenších štvorcov.",
		abstract: "Vracia štatistiky pre exponenciálnu krivku podľa metódy najmenších štvorcov",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/logest-function"
		}],
		functionParameter: {
			knownYs: {
				name: "známe_y",
				detail: "Sada závislých údajov (y) v exponenciálnej krivke y = b*m^x."
			},
			knownXs: {
				name: "známe_x",
				detail: "Sada nezávislých údajov (x) v exponenciálnej krivke y = b*m^x."
			},
			constb: {
				name: "konštanta_b",
				detail: "Logická hodnota, ktorá určuje, či sa má b vynútiť na hodnotu 1. Ak je TRUE alebo vynechaná, b sa vypočíta normálne. Ak je FALSE, b sa nastaví na 1."
			},
			stats: {
				name: "štatistiky",
				detail: "Logická hodnota, ktorá určuje, či majú byť vrátené doplnkové regresné štatistiky."
			}
		}
	},
	LOGNORM_DIST: {
		description: "Vracia lognormálne rozdelenie.",
		abstract: "Vracia lognormálne rozdelenie",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/lognorm-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Hodnota, pri ktorej chcete vyhodnotiť funkciu."
			},
			mean: {
				name: "priemer",
				detail: "Priemer logaritmu."
			},
			standardDev: {
				name: "štandardná_odchýlka",
				detail: "Štandardná odchýlka logaritmu."
			},
			cumulative: {
				name: "kumulatívne",
				detail: "Logická hodnota, ktorá určuje formu funkcie. Ak je kumulatívne TRUE, LOGNORM.DIST vráti kumulatívnu distribučnú funkciu; ak FALSE, vráti hustotu pravdepodobnosti."
			}
		}
	},
	LOGNORM_INV: {
		description: "Vracia inverznú hodnotu lognormálneho rozdelenia.",
		abstract: "Vracia inverznú hodnotu lognormálneho rozdelenia",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/lognorm-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "pravdepodobnosť",
				detail: "Pravdepodobnosť zodpovedajúca lognormálnemu rozdeleniu."
			},
			mean: {
				name: "priemer",
				detail: "Priemer logaritmu."
			},
			standardDev: {
				name: "štandardná_odchýlka",
				detail: "Štandardná odchýlka logaritmu."
			}
		}
	},
	MARGINOFERROR: {
		description: "Vypočíta hranicu chyby z rozsahu hodnôt a úrovne spoľahlivosti.",
		abstract: "Vypočíta hranicu chyby z rozsahu hodnôt a úrovne spoľahlivosti",
		links: [{
			title: "Inštrukcia",
			url: "https://support.google.com/docs/answer/12487850?hl=sk"
		}],
		functionParameter: {
			range: {
				name: "rozsah",
				detail: "Rozsah hodnôt použitý na výpočet hranice chyby."
			},
			confidence: {
				name: "spoľahlivosť",
				detail: "Požadovaná úroveň spoľahlivosti v intervale (0, 1)."
			}
		}
	},
	MAX: {
		description: "Vracia najväčšie číslo v množine hodnôt.",
		abstract: "Vracia najväčšie číslo v množine hodnôt",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/max-function"
		}],
		functionParameter: {
			number1: {
				name: "číslo1",
				detail: "Prvé číslo, odkaz na bunku alebo rozsah, pre ktorý chcete maximum."
			},
			number2: {
				name: "číslo2",
				detail: "Ďalšie čísla, odkazy na bunky alebo rozsahy, pre ktoré chcete maximum, maximálne 255."
			}
		}
	},
	MAXA: {
		description: "Vracia najväčšiu hodnotu v zozname argumentov vrátane logických hodnôt a textu.",
		abstract: "Vracia najväčšiu hodnotu v zozname argumentov vrátane logických hodnôt a textu",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/maxa-function"
		}],
		functionParameter: {
			value1: {
				name: "hodnota1",
				detail: "Prvá hodnota, odkaz na bunku alebo rozsah, pre ktorý chcete maximum."
			},
			value2: {
				name: "hodnota2",
				detail: "Ďalšie hodnoty, odkazy na bunky alebo rozsahy, pre ktoré chcete maximum, maximálne 255."
			}
		}
	},
	MAXIFS: {
		description: "Vracia maximálnu hodnotu medzi bunkami určenými zadanými kritériami.",
		abstract: "Vracia maximálnu hodnotu medzi bunkami určenými zadanými kritériami",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/maxifs-function"
		}],
		functionParameter: {
			maxRange: {
				name: "rozsah_maxima",
				detail: "Skutočný rozsah buniek, z ktorých sa má určiť maximum."
			},
			criteriaRange1: {
				name: "rozsah_kritéria1",
				detail: "Prvý rozsah, v ktorom sa vyhodnotia kritériá."
			},
			criteria1: {
				name: "kritérium1",
				detail: "Kritérium, ktoré určuje, ktoré bunky sa vyhodnocujú v rozsah_kritéria1."
			},
			criteriaRange2: {
				name: "rozsah_kritéria2",
				detail: "Ďalšie rozsahy. Môžete zadať až 127 párov rozsahov."
			},
			criteria2: {
				name: "kritérium2",
				detail: "Ďalšie súvisiace kritériá. Môžete zadať až 127 párov kritérií."
			}
		}
	},
	MEDIAN: {
		description: "Vracia medián daných čísel.",
		abstract: "Vracia medián daných čísel",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/median-function"
		}],
		functionParameter: {
			number1: {
				name: "číslo1",
				detail: "Prvé číslo, odkaz na bunku alebo rozsah, pre ktorý chcete medián."
			},
			number2: {
				name: "číslo2",
				detail: "Ďalšie čísla, odkazy na bunky alebo rozsahy, pre ktoré chcete medián, maximálne 255."
			}
		}
	},
	MIN: {
		description: "Vracia najmenšie číslo v množine hodnôt.",
		abstract: "Vracia najmenšie číslo v množine hodnôt",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/min-function"
		}],
		functionParameter: {
			number1: {
				name: "číslo1",
				detail: "Prvé číslo, odkaz na bunku alebo rozsah, pre ktorý chcete minimum."
			},
			number2: {
				name: "číslo2",
				detail: "Ďalšie čísla, odkazy na bunky alebo rozsahy, pre ktoré chcete minimum, maximálne 255."
			}
		}
	},
	MINA: {
		description: "Vracia najmenšiu hodnotu v zozname argumentov vrátane logických hodnôt a textu.",
		abstract: "Vracia najmenšiu hodnotu v zozname argumentov vrátane logických hodnôt a textu",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/mina-function"
		}],
		functionParameter: {
			value1: {
				name: "hodnota1",
				detail: "Prvá hodnota, odkaz na bunku alebo rozsah, pre ktorý chcete minimum."
			},
			value2: {
				name: "hodnota2",
				detail: "Ďalšie hodnoty, odkazy na bunky alebo rozsahy, pre ktoré chcete minimum, maximálne 255."
			}
		}
	},
	MINIFS: {
		description: "Vracia minimálnu hodnotu medzi bunkami určenými zadanými kritériami.",
		abstract: "Vracia minimálnu hodnotu medzi bunkami určenými zadanými kritériami",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/minifs-function"
		}],
		functionParameter: {
			minRange: {
				name: "rozsah_minima",
				detail: "Skutočný rozsah buniek, z ktorých sa má určiť minimum."
			},
			criteriaRange1: {
				name: "rozsah_kritéria1",
				detail: "Prvý rozsah, v ktorom sa vyhodnotia kritériá."
			},
			criteria1: {
				name: "kritérium1",
				detail: "Kritérium, ktoré určuje, ktoré bunky sa vyhodnocujú v rozsah_kritéria1."
			},
			criteriaRange2: {
				name: "rozsah_kritéria2",
				detail: "Ďalšie rozsahy. Môžete zadať až 127 párov rozsahov."
			},
			criteria2: {
				name: "kritérium2",
				detail: "Ďalšie súvisiace kritériá. Môžete zadať až 127 párov kritérií."
			}
		}
	},
	MODE_MULT: {
		description: "Vracia vertikálne pole najčastejšie sa vyskytujúcich hodnôt v množine údajov.",
		abstract: "Vracia vertikálne pole najčastejšie sa vyskytujúcich hodnôt v množine údajov",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/mode-mult-function"
		}],
		functionParameter: {
			number1: {
				name: "číslo1",
				detail: "Prvé číslo, odkaz na bunku alebo rozsah, pre ktorý chcete najčastejšiu hodnotu."
			},
			number2: {
				name: "číslo2",
				detail: "Ďalšie čísla, odkazy na bunky alebo rozsahy, pre ktoré chcete najčastejšiu hodnotu, maximálne 255."
			}
		}
	},
	MODE_SNGL: {
		description: "Vracia najčastejšie sa vyskytujúcu hodnotu v množine údajov.",
		abstract: "Vracia najčastejšie sa vyskytujúcu hodnotu v množine údajov",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/mode-sngl-function"
		}],
		functionParameter: {
			number1: {
				name: "číslo1",
				detail: "Prvé číslo, odkaz na bunku alebo rozsah, pre ktorý chcete najčastejšiu hodnotu."
			},
			number2: {
				name: "číslo2",
				detail: "Ďalšie čísla, odkazy na bunky alebo rozsahy, pre ktoré chcete najčastejšiu hodnotu, maximálne 255."
			}
		}
	},
	NEGBINOM_DIST: {
		description: "Vracia negatívne binomické rozdelenie.",
		abstract: "Vracia negatívne binomické rozdelenie",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/negbinom-dist-function"
		}],
		functionParameter: {
			numberF: {
				name: "počet_neúspechov",
				detail: "Počet neúspechov."
			},
			numberS: {
				name: "počet_úspechov",
				detail: "Hraničný počet úspechov."
			},
			probabilityS: {
				name: "pravdepodobnosť_úspechu",
				detail: "Pravdepodobnosť úspechu."
			},
			cumulative: {
				name: "kumulatívne",
				detail: "Logická hodnota, ktorá určuje formu funkcie. Ak je kumulatívne TRUE, NEGBINOM.DIST vráti kumulatívnu distribučnú funkciu; ak FALSE, vráti hustotu pravdepodobnosti."
			}
		}
	},
	NORM_DIST: {
		description: "Vracia normálne rozdelenie.",
		abstract: "Vracia normálne rozdelenie",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/norm-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Hodnota, pri ktorej chcete vyhodnotiť rozdelenie."
			},
			mean: {
				name: "priemer",
				detail: "Aritmetický priemer rozdelenia."
			},
			standardDev: {
				name: "štandardná_odchýlka",
				detail: "Štandardná odchýlka rozdelenia."
			},
			cumulative: {
				name: "kumulatívne",
				detail: "Logická hodnota, ktorá určuje formu funkcie. Ak je kumulatívne TRUE, NORM.DIST vráti kumulatívnu distribučnú funkciu; ak FALSE, vráti hustotu pravdepodobnosti."
			}
		}
	},
	NORM_INV: {
		description: "Vracia inverznú hodnotu normálneho kumulatívneho rozdelenia.",
		abstract: "Vracia inverznú hodnotu normálneho kumulatívneho rozdelenia",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/norm-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "pravdepodobnosť",
				detail: "Pravdepodobnosť zodpovedajúca normálnemu rozdeleniu."
			},
			mean: {
				name: "priemer",
				detail: "Aritmetický priemer rozdelenia."
			},
			standardDev: {
				name: "štandardná_odchýlka",
				detail: "Štandardná odchýlka rozdelenia."
			}
		}
	},
	NORM_S_DIST: {
		description: "Vracia štandardné normálne rozdelenie.",
		abstract: "Vracia štandardné normálne rozdelenie",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/norm-s-dist-function"
		}],
		functionParameter: {
			z: {
				name: "z",
				detail: "Hodnota, pri ktorej chcete vyhodnotiť rozdelenie."
			},
			cumulative: {
				name: "kumulatívne",
				detail: "Logická hodnota, ktorá určuje formu funkcie. Ak je kumulatívne TRUE, NORM.S.DIST vráti kumulatívnu distribučnú funkciu; ak FALSE, vráti hustotu pravdepodobnosti."
			}
		}
	},
	NORM_S_INV: {
		description: "Vracia inverznú hodnotu štandardného normálneho kumulatívneho rozdelenia.",
		abstract: "Vracia inverznú hodnotu štandardného normálneho kumulatívneho rozdelenia",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/norm-s-inv-function"
		}],
		functionParameter: { probability: {
			name: "pravdepodobnosť",
			detail: "Pravdepodobnosť zodpovedajúca štandardnému normálnemu rozdeleniu."
		} }
	},
	PEARSON: {
		description: "Vracia Pearsonov korelačný koeficient.",
		abstract: "Vracia Pearsonov korelačný koeficient",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/pearson-function"
		}],
		functionParameter: {
			array1: {
				name: "pole1",
				detail: "Prvý rozsah hodnôt buniek."
			},
			array2: {
				name: "pole2",
				detail: "Druhý rozsah hodnôt buniek."
			}
		}
	},
	PERCENTILE_EXC: {
		description: "Vracia k-tý percentil hodnôt v rozsahu (exkluzívne).",
		abstract: "Vracia k-tý percentil hodnôt v rozsahu (exkluzívne)",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/percentile-exc-function"
		}],
		functionParameter: {
			array: {
				name: "pole",
				detail: "Pole alebo rozsah údajov, pre ktorý chcete percentil."
			},
			k: {
				name: "k",
				detail: "Hodnota percentilu v rozsahu 0 až 1 (exkluzívne)."
			}
		}
	},
	PERCENTILE_INC: {
		description: "Vracia k-tý percentil hodnôt v rozsahu (inkluzívne).",
		abstract: "Vracia k-tý percentil hodnôt v rozsahu (inkluzívne)",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/percentile-inc-function"
		}],
		functionParameter: {
			array: {
				name: "pole",
				detail: "Pole alebo rozsah údajov, pre ktorý chcete percentil."
			},
			k: {
				name: "k",
				detail: "Hodnota percentilu v rozsahu 0 až 1 (inkluzívne)."
			}
		}
	},
	PERCENTRANK_EXC: {
		description: "Vracia percentilové poradie hodnoty v množine údajov (exkluzívne).",
		abstract: "Vracia percentilové poradie hodnoty v množine údajov (exkluzívne)",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/percentrank-exc-function"
		}],
		functionParameter: {
			array: {
				name: "pole",
				detail: "Pole alebo rozsah údajov, pre ktorý chcete percentilové poradie."
			},
			x: {
				name: "x",
				detail: "Hodnota, pre ktorú chcete percentilové poradie."
			},
			significance: {
				name: "presnosť",
				detail: "Voliteľná hodnota, ktorá určuje počet významných číslic výsledku."
			}
		}
	},
	PERCENTRANK_INC: {
		description: "Vracia percentilové poradie hodnoty v množine údajov (inkluzívne).",
		abstract: "Vracia percentilové poradie hodnoty v množine údajov (inkluzívne)",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/percentrank-inc-function"
		}],
		functionParameter: {
			array: {
				name: "pole",
				detail: "Pole alebo rozsah údajov, pre ktorý chcete percentilové poradie."
			},
			x: {
				name: "x",
				detail: "Hodnota, pre ktorú chcete percentilové poradie."
			},
			significance: {
				name: "presnosť",
				detail: "Voliteľná hodnota, ktorá určuje počet významných číslic výsledku."
			}
		}
	},
	PERMUT: {
		description: "Vracia počet permutácií pre daný počet objektov.",
		abstract: "Vracia počet permutácií pre daný počet objektov",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/permut-function"
		}],
		functionParameter: {
			number: {
				name: "počet",
				detail: "Celkový počet objektov."
			},
			numberChosen: {
				name: "počet_zvolených",
				detail: "Počet objektov v každej permutácii."
			}
		}
	},
	PERMUTATIONA: {
		description: "Vracia počet permutácií s opakovaním pre daný počet objektov.",
		abstract: "Vracia počet permutácií s opakovaním pre daný počet objektov",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/permutationa-function"
		}],
		functionParameter: {
			number: {
				name: "počet",
				detail: "Celkový počet objektov."
			},
			numberChosen: {
				name: "počet_zvolených",
				detail: "Počet objektov v každej permutácii."
			}
		}
	},
	PHI: {
		description: "Vracia hodnotu hustoty pravdepodobnosti pre štandardné normálne rozdelenie.",
		abstract: "Vracia hodnotu hustoty pravdepodobnosti pre štandardné normálne rozdelenie",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/phi-function"
		}],
		functionParameter: { x: {
			name: "x",
			detail: "Hodnota, pre ktorú chcete vypočítať hustotu pravdepodobnosti."
		} }
	},
	POISSON_DIST: {
		description: "Vracia Poissonovo rozdelenie.",
		abstract: "Vracia Poissonovo rozdelenie",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/poisson-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Počet udalostí."
			},
			mean: {
				name: "priemer",
				detail: "Očakávaná hodnota."
			},
			cumulative: {
				name: "kumulatívne",
				detail: "Logická hodnota, ktorá určuje formu funkcie. Ak je kumulatívne TRUE, POISSON.DIST vráti kumulatívnu distribučnú funkciu; ak FALSE, vráti pravdepodobnostnú hmotnostnú funkciu."
			}
		}
	},
	PROB: {
		description: "Vracia pravdepodobnosť, že hodnoty v rozsahu budú medzi dvoma limitmi.",
		abstract: "Vracia pravdepodobnosť, že hodnoty v rozsahu budú medzi dvoma limitmi",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/prob-function"
		}],
		functionParameter: {
			xRange: {
				name: "rozsah_x",
				detail: "Rozsah číselných hodnôt x."
			},
			probRange: {
				name: "rozsah_pravdepodobností",
				detail: "Rozsah pravdepodobností priradených hodnotám v rozsah_x."
			},
			lowerLimit: {
				name: "dolná_hranica",
				detail: "Dolná hranica hodnoty, pre ktorú chcete vypočítať pravdepodobnosť."
			},
			upperLimit: {
				name: "horná_hranica",
				detail: "Horná hranica hodnoty, pre ktorú chcete vypočítať pravdepodobnosť. Ak je vynechaná, PROB vráti pravdepodobnosť, že x je rovné dolnej hranici."
			}
		}
	},
	QUARTILE_EXC: {
		description: "Vracia kvartil množiny údajov (exkluzívne).",
		abstract: "Vracia kvartil množiny údajov (exkluzívne)",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/quartile-exc-function"
		}],
		functionParameter: {
			array: {
				name: "pole",
				detail: "Pole alebo rozsah údajov, pre ktorý chcete kvartil."
			},
			quart: {
				name: "kvartil",
				detail: "Hodnota, ktorá určuje, ktorý kvartil chcete vrátiť."
			}
		}
	},
	QUARTILE_INC: {
		description: "Vracia kvartil množiny údajov (inkluzívne).",
		abstract: "Vracia kvartil množiny údajov (inkluzívne)",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/quartile-inc-function"
		}],
		functionParameter: {
			array: {
				name: "pole",
				detail: "Pole alebo rozsah údajov, pre ktorý chcete kvartil."
			},
			quart: {
				name: "kvartil",
				detail: "Hodnota, ktorá určuje, ktorý kvartil chcete vrátiť."
			}
		}
	},
	RANK_AVG: {
		description: "Vracia poradie čísla v zozname čísel s použitím priemeru rovnakých hodnôt.",
		abstract: "Vracia poradie čísla v zozname čísel s použitím priemeru rovnakých hodnôt",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/rank-avg-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Číslo, ktorého poradie chcete nájsť."
			},
			ref: {
				name: "odkaz",
				detail: "Zoznam čísel, podľa ktorých sa určuje poradie čísla."
			},
			order: {
				name: "poradie",
				detail: "Číslo určujúce, ako sa má číslo zoradiť. Ak je 0 alebo vynechané, zoradí sa zostupne; ak je nenulové, vzostupne."
			}
		}
	},
	RANK_EQ: {
		description: "Vracia poradie čísla v zozname čísel.",
		abstract: "Vracia poradie čísla v zozname čísel",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/rank-eq-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Číslo, ktorého poradie chcete nájsť."
			},
			ref: {
				name: "odkaz",
				detail: "Zoznam čísel, podľa ktorých sa určuje poradie čísla."
			},
			order: {
				name: "poradie",
				detail: "Číslo určujúce, ako sa má číslo zoradiť. Ak je 0 alebo vynechané, zoradí sa zostupne; ak je nenulové, vzostupne."
			}
		}
	},
	RSQ: {
		description: "Vracia druhú mocninu Pearsonovho korelačného koeficientu.",
		abstract: "Vracia druhú mocninu Pearsonovho korelačného koeficientu",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/rsq-function"
		}],
		functionParameter: {
			knownYs: {
				name: "známe_y",
				detail: "Závislé hodnoty vynesené v známom rozsahu."
			},
			knownXs: {
				name: "známe_x",
				detail: "Nezávislé hodnoty vynesené v známom rozsahu."
			}
		}
	},
	SKEW: {
		description: "Vracia šikmosť rozdelenia.",
		abstract: "Vracia šikmosť rozdelenia",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/skew-function"
		}],
		functionParameter: {
			number1: {
				name: "číslo1",
				detail: "Prvé číslo, odkaz na bunku alebo rozsah, pre ktorý chcete šikmosť."
			},
			number2: {
				name: "číslo2",
				detail: "Ďalšie čísla, odkazy na bunky alebo rozsahy, pre ktoré chcete šikmosť, maximálne 255."
			}
		}
	},
	SKEW_P: {
		description: "Vracia šikmosť populácie na základe celej populácie.",
		abstract: "Vracia šikmosť populácie na základe celej populácie",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/skew-p-function"
		}],
		functionParameter: {
			number1: {
				name: "číslo1",
				detail: "Prvé číslo, odkaz na bunku alebo rozsah, pre ktorý chcete šikmosť."
			},
			number2: {
				name: "číslo2",
				detail: "Ďalšie čísla, odkazy na bunky alebo rozsahy, pre ktoré chcete šikmosť, maximálne 255."
			}
		}
	},
	SLOPE: {
		description: "Vracia smernicu regresnej priamky.",
		abstract: "Vracia smernicu regresnej priamky",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/slope-function"
		}],
		functionParameter: {
			knownYs: {
				name: "známe_y",
				detail: "Závislé hodnoty vynesené v známom rozsahu."
			},
			knownXs: {
				name: "známe_x",
				detail: "Nezávislé hodnoty vynesené v známom rozsahu."
			}
		}
	},
	SMALL: {
		description: "Vracia k-tú najmenšiu hodnotu v množine údajov.",
		abstract: "Vracia k-tú najmenšiu hodnotu v množine údajov",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/small-function"
		}],
		functionParameter: {
			array: {
				name: "pole",
				detail: "Pole alebo rozsah údajov, z ktorého chcete získať najmenšiu hodnotu."
			},
			k: {
				name: "k",
				detail: "Poradie hodnoty v množine údajov."
			}
		}
	},
	STANDARDIZE: {
		description: "Vracia normalizovanú hodnotu z rozdelenia.",
		abstract: "Vracia normalizovanú hodnotu z rozdelenia",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/standardize-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Hodnota, ktorá sa má normalizovať."
			},
			mean: {
				name: "priemer",
				detail: "Aritmetický priemer rozdelenia."
			},
			standardDev: {
				name: "štandardná_odchýlka",
				detail: "Štandardná odchýlka rozdelenia."
			}
		}
	},
	STDEV_P: {
		description: "Vypočíta štandardnú odchýlku na základe celej populácie.",
		abstract: "Vypočíta štandardnú odchýlku na základe celej populácie",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/stdev-p-function"
		}],
		functionParameter: {
			number1: {
				name: "číslo1",
				detail: "Prvé číslo, odkaz na bunku alebo rozsah, pre ktorý chcete štandardnú odchýlku."
			},
			number2: {
				name: "číslo2",
				detail: "Ďalšie čísla, odkazy na bunky alebo rozsahy, pre ktoré chcete štandardnú odchýlku, maximálne 255."
			}
		}
	},
	STDEV_S: {
		description: "Odhaduje štandardnú odchýlku na základe vzorky.",
		abstract: "Odhaduje štandardnú odchýlku na základe vzorky",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/stdev-s-function"
		}],
		functionParameter: {
			number1: {
				name: "číslo1",
				detail: "Prvé číslo, odkaz na bunku alebo rozsah, pre ktorý chcete štandardnú odchýlku."
			},
			number2: {
				name: "číslo2",
				detail: "Ďalšie čísla, odkazy na bunky alebo rozsahy, pre ktoré chcete štandardnú odchýlku, maximálne 255."
			}
		}
	},
	STDEVA: {
		description: "Odhaduje štandardnú odchýlku na základe vzorky, vrátane čísel, textu a logických hodnôt.",
		abstract: "Odhaduje štandardnú odchýlku na základe vzorky, vrátane čísel, textu a logických hodnôt",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/stdeva-function"
		}],
		functionParameter: {
			value1: {
				name: "hodnota1",
				detail: "Prvá hodnota, odkaz na bunku alebo rozsah, pre ktorý chcete štandardnú odchýlku."
			},
			value2: {
				name: "hodnota2",
				detail: "Ďalšie hodnoty, odkazy na bunky alebo rozsahy, pre ktoré chcete štandardnú odchýlku, maximálne 255."
			}
		}
	},
	STDEVPA: {
		description: "Vypočíta štandardnú odchýlku na základe celej populácie, vrátane čísel, textu a logických hodnôt.",
		abstract: "Vypočíta štandardnú odchýlku na základe celej populácie, vrátane čísel, textu a logických hodnôt",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/stdevpa-function"
		}],
		functionParameter: {
			value1: {
				name: "hodnota1",
				detail: "Prvá hodnota, odkaz na bunku alebo rozsah, pre ktorý chcete štandardnú odchýlku."
			},
			value2: {
				name: "hodnota2",
				detail: "Ďalšie hodnoty, odkazy na bunky alebo rozsahy, pre ktoré chcete štandardnú odchýlku, maximálne 255."
			}
		}
	},
	STEYX: {
		description: "Vracia štandardnú chybu predikcie pre y-hodnoty v regresii.",
		abstract: "Vracia štandardnú chybu predikcie pre y-hodnoty v regresii",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/steyx-function"
		}],
		functionParameter: {
			knownYs: {
				name: "známe_y",
				detail: "Závislé hodnoty vynesené v známom rozsahu."
			},
			knownXs: {
				name: "známe_x",
				detail: "Nezávislé hodnoty vynesené v známom rozsahu."
			}
		}
	},
	T_DIST: {
		description: "Vracia t-rozdelenie.",
		abstract: "Vracia t-rozdelenie",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/t-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Hodnota, pri ktorej chcete vyhodnotiť rozdelenie."
			},
			degFreedom: {
				name: "stupne_voľnosti",
				detail: "Počet stupňov voľnosti."
			},
			cumulative: {
				name: "kumulatívne",
				detail: "Logická hodnota, ktorá určuje formu funkcie. Ak je kumulatívne TRUE, T.DIST vráti kumulatívnu distribučnú funkciu; ak FALSE, vráti hustotu pravdepodobnosti."
			}
		}
	},
	T_DIST_2T: {
		description: "Vracia obojstrannú pravdepodobnosť t-rozdelenia.",
		abstract: "Vracia obojstrannú pravdepodobnosť t-rozdelenia",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/t-dist-2t-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Hodnota, pri ktorej chcete vyhodnotiť rozdelenie."
			},
			degFreedom: {
				name: "stupne_voľnosti",
				detail: "Počet stupňov voľnosti."
			}
		}
	},
	T_DIST_RT: {
		description: "Vracia pravostrannú pravdepodobnosť t-rozdelenia.",
		abstract: "Vracia pravostrannú pravdepodobnosť t-rozdelenia",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/t-dist-rt-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Hodnota, pri ktorej chcete vyhodnotiť rozdelenie."
			},
			degFreedom: {
				name: "stupne_voľnosti",
				detail: "Počet stupňov voľnosti."
			}
		}
	},
	T_INV: {
		description: "Vracia inverznú hodnotu t-rozdelenia.",
		abstract: "Vracia inverznú hodnotu t-rozdelenia",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/t-inv-function"
		}],
		functionParameter: {
			probability: {
				name: "pravdepodobnosť",
				detail: "Pravdepodobnosť spojená s t-rozdelením."
			},
			degFreedom: {
				name: "stupne_voľnosti",
				detail: "Počet stupňov voľnosti."
			}
		}
	},
	T_INV_2T: {
		description: "Vracia inverznú hodnotu obojstrannej t-distribúcie.",
		abstract: "Vracia inverznú hodnotu obojstrannej t-distribúcie",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/t-inv-2t-function"
		}],
		functionParameter: {
			probability: {
				name: "pravdepodobnosť",
				detail: "Pravdepodobnosť spojená s t-rozdelením."
			},
			degFreedom: {
				name: "stupne_voľnosti",
				detail: "Počet stupňov voľnosti."
			}
		}
	},
	T_TEST: {
		description: "Vracia pravdepodobnosť spojenú so Studentovým t-testom.",
		abstract: "Vracia pravdepodobnosť spojenú so Studentovým t-testom",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/t-test-function"
		}],
		functionParameter: {
			array1: {
				name: "pole1",
				detail: "Prvá množina údajov."
			},
			array2: {
				name: "pole2",
				detail: "Druhá množina údajov."
			},
			tails: {
				name: "chvosty",
				detail: "Určuje počet chvostov distribúcie. Ak tails = 1, ide o jednostranný test; ak tails = 2, ide o obojstranný test."
			},
			type: {
				name: "typ",
				detail: "Číslo určujúce typ t-testu."
			}
		}
	},
	TREND: {
		description: "Vracia hodnoty pozdĺž lineárneho trendu.",
		abstract: "Vracia hodnoty pozdĺž lineárneho trendu",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/trend-function"
		}],
		functionParameter: {
			knownYs: {
				name: "známe_y",
				detail: "Závislé hodnoty vynesené v známom rozsahu."
			},
			knownXs: {
				name: "známe_x",
				detail: "Nezávislé hodnoty vynesené v známom rozsahu."
			},
			newXs: {
				name: "nové_x",
				detail: "Nové hodnoty x, pre ktoré chcete vypočítať nové y."
			},
			constb: {
				name: "konštanta_b",
				detail: "Logická hodnota, ktorá určuje, či má byť priesečník nastavený na 0."
			}
		}
	},
	TRIMMEAN: {
		description: "Vracia priemer vylúčením percenta dátových bodov na oboch koncoch.",
		abstract: "Vracia priemer vylúčením percenta dátových bodov na oboch koncoch",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/trimmean-function"
		}],
		functionParameter: {
			array: {
				name: "pole",
				detail: "Pole alebo rozsah údajov, ktoré chcete spriemerovať."
			},
			percent: {
				name: "percento",
				detail: "Percento dátových bodov, ktoré sa má vylúčiť z výpočtu."
			}
		}
	},
	VAR_P: {
		description: "Vypočíta rozptyl na základe celej populácie.",
		abstract: "Vypočíta rozptyl na základe celej populácie",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/var-p-function"
		}],
		functionParameter: {
			number1: {
				name: "číslo1",
				detail: "Prvé číslo, odkaz na bunku alebo rozsah, pre ktorý chcete rozptyl."
			},
			number2: {
				name: "číslo2",
				detail: "Ďalšie čísla, odkazy na bunky alebo rozsahy, pre ktoré chcete rozptyl, maximálne 255."
			}
		}
	},
	VAR_S: {
		description: "Odhaduje rozptyl na základe vzorky.",
		abstract: "Odhaduje rozptyl na základe vzorky",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/var-s-function"
		}],
		functionParameter: {
			number1: {
				name: "číslo1",
				detail: "Prvé číslo, odkaz na bunku alebo rozsah, pre ktorý chcete rozptyl."
			},
			number2: {
				name: "číslo2",
				detail: "Ďalšie čísla, odkazy na bunky alebo rozsahy, pre ktoré chcete rozptyl, maximálne 255."
			}
		}
	},
	VARA: {
		description: "Odhaduje rozptyl na základe vzorky vrátane čísel, textu a logických hodnôt.",
		abstract: "Odhaduje rozptyl na základe vzorky vrátane čísel, textu a logických hodnôt",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/vara-function"
		}],
		functionParameter: {
			value1: {
				name: "hodnota1",
				detail: "Prvá hodnota, odkaz na bunku alebo rozsah, pre ktorý chcete rozptyl."
			},
			value2: {
				name: "hodnota2",
				detail: "Ďalšie hodnoty, odkazy na bunky alebo rozsahy, pre ktoré chcete rozptyl, maximálne 255."
			}
		}
	},
	VARPA: {
		description: "Vypočíta rozptyl na základe celej populácie vrátane čísel, textu a logických hodnôt.",
		abstract: "Vypočíta rozptyl na základe celej populácie vrátane čísel, textu a logických hodnôt",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/varpa-function"
		}],
		functionParameter: {
			value1: {
				name: "hodnota1",
				detail: "Prvá hodnota, odkaz na bunku alebo rozsah, pre ktorý chcete rozptyl."
			},
			value2: {
				name: "hodnota2",
				detail: "Ďalšie hodnoty, odkazy na bunky alebo rozsahy, pre ktoré chcete rozptyl, maximálne 255."
			}
		}
	},
	WEIBULL_DIST: {
		description: "Vracia Weibullovo rozdelenie.",
		abstract: "Vracia Weibullovo rozdelenie",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/weibull-dist-function"
		}],
		functionParameter: {
			x: {
				name: "x",
				detail: "Hodnota, pri ktorej chcete vyhodnotiť funkciu."
			},
			alpha: {
				name: "alfa",
				detail: "Parameter rozdelenia."
			},
			beta: {
				name: "beta",
				detail: "Parameter rozdelenia."
			},
			cumulative: {
				name: "kumulatívne",
				detail: "Logická hodnota, ktorá určuje formu funkcie. Ak je kumulatívne TRUE, WEIBULL.DIST vráti kumulatívnu distribučnú funkciu; ak FALSE, vráti hustotu pravdepodobnosti."
			}
		}
	},
	Z_TEST: {
		description: "Vracia obojstrannú P-hodnotu z-testu.",
		abstract: "Vracia obojstrannú P-hodnotu z-testu",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/z-test-function"
		}],
		functionParameter: {
			array: {
				name: "pole",
				detail: "Pole alebo rozsah údajov, na ktoré sa z-test vzťahuje."
			},
			x: {
				name: "x",
				detail: "Testovaná hodnota."
			},
			sigma: {
				name: "sigma",
				detail: "Štandardná odchýlka populácie. Ak je vynechaná, použije sa štandardná odchýlka vzorky."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/text/sk-SK.ts
const locale$3 = {
	ASC: {
		description: "Mení plnošírkové (dvojbajtové) anglické písmená alebo katakanu v textovom reťazci na polovičnú šírku (jednobajtové) znaky",
		abstract: "Mení plnošírkové (dvojbajtové) anglické písmená alebo katakanu v textovom reťazci na polovičnú šírku (jednobajtové) znaky",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/asc-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Text alebo odkaz na bunku obsahujúcu text, ktorý chcete zmeniť. Ak text neobsahuje žiadne plnošírkové písmená, text sa nezmení."
		} }
	},
	ARRAYTOTEXT: {
		description: "Vracia pole textových hodnôt z ľubovoľného zadaného rozsahu",
		abstract: "Vracia pole textových hodnôt z ľubovoľného zadaného rozsahu",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/arraytotext-function"
		}],
		functionParameter: {
			array: {
				name: "pole",
				detail: "Pole, ktoré sa má vrátiť ako text."
			},
			format: {
				name: "formát",
				detail: "Formát vrátených údajov. Môže byť jedna z dvoch hodnôt: \n0 Predvolené. Stručný formát, ktorý sa ľahko číta. \n1 Prísny formát, ktorý obsahuje escape znaky a oddeľovače riadkov. Generuje reťazec, ktorý možno analyzovať po vložení do riadka vzorcov. Vrátené reťazce uzatvára do úvodzoviek okrem logických hodnôt, čísel a chýb."
			}
		}
	},
	BAHTTEXT: {
		description: "Konvertuje číslo na text pomocou menového formátu baht",
		abstract: "Konvertuje číslo na text pomocou menového formátu baht",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/bahttext-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Číslo, ktoré chcete previesť na text, alebo odkaz na bunku obsahujúcu číslo, alebo vzorec, ktorý vyhodnotí číslo."
		} }
	},
	CHAR: {
		description: "Vracia znak zadaný číselným kódom",
		abstract: "Vracia znak zadaný číselným kódom",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/char-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Číslo medzi 1 a 255 určujúce, ktorý znak chcete. Znak je z množiny znakov používanej vaším počítačom."
		} }
	},
	CLEAN: {
		description: "Odstráni z textu všetky netlačiteľné znaky",
		abstract: "Odstráni z textu všetky netlačiteľné znaky",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/clean-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Ľubovoľné informácie z hárka, z ktorých chcete odstrániť netlačiteľné znaky."
		} }
	},
	CODE: {
		description: "Vracia číselný kód prvého znaku v textovom reťazci",
		abstract: "Vracia číselný kód prvého znaku v textovom reťazci",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/code-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Text, pre ktorý chcete kód prvého znaku."
		} }
	},
	CONCAT: {
		description: "Spája text z viacerých rozsahov a/alebo reťazcov, ale neposkytuje argumenty oddeľovača ani ignorovania prázdnych.",
		abstract: "Spája text z viacerých rozsahov a/alebo reťazcov",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/concat-function"
		}],
		functionParameter: {
			text1: {
				name: "text1",
				detail: "Textová položka na spojenie. Reťazec alebo pole reťazcov, napríklad rozsah buniek."
			},
			text2: {
				name: "text2",
				detail: "Ďalšie textové položky na spojenie. Môže byť maximálne 253 textových argumentov pre textové položky. Každá môže byť reťazec alebo pole reťazcov, napríklad rozsah buniek."
			}
		}
	},
	CONCATENATE: {
		description: "Spojí niekoľko textových položiek do jednej textovej položky",
		abstract: "Spojí niekoľko textových položiek do jednej textovej položky",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/concatenate-function"
		}],
		functionParameter: {
			text1: {
				name: "text1",
				detail: "Prvá položka na spojenie. Položka môže byť textová hodnota, číslo alebo odkaz na bunku."
			},
			text2: {
				name: "text2",
				detail: "Ďalšie textové položky na spojenie. Môžete mať až 255 položiek, spolu najviac 8 192 znakov."
			}
		}
	},
	DBCS: {
		description: "Mení polovičnú šírku (jednobajtové) anglické písmená alebo katakanu v textovom reťazci na plnú šírku (dvojbajtové) znaky",
		abstract: "Mení polovičnú šírku (jednobajtové) anglické písmená alebo katakanu v textovom reťazci na plnú šírku (dvojbajtové) znaky",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/dbcs-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Text alebo odkaz na bunku obsahujúcu text, ktorý chcete zmeniť. Ak text neobsahuje žiadne polovičné anglické písmená alebo katakanu, text sa nezmení."
		} }
	},
	DOLLAR: {
		description: "Konvertuje číslo na text pomocou menového formátu",
		abstract: "Konvertuje číslo na text pomocou menového formátu",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/dollar-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Číslo, odkaz na bunku obsahujúcu číslo alebo vzorec, ktorý vyhodnotí číslo."
			},
			decimals: {
				name: "desatinné_miesta",
				detail: "Počet číslic napravo od desatinnej čiarky. Ak je záporný, číslo sa zaokrúhli doľava od desatinnej čiarky. Ak decimals vynecháte, predpokladá sa 2."
			}
		}
	},
	EXACT: {
		description: "Overí, či sú dve textové hodnoty identické",
		abstract: "Overí, či sú dve textové hodnoty identické",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/exact-function"
		}],
		functionParameter: {
			text1: {
				name: "text1",
				detail: "Prvý textový reťazec."
			},
			text2: {
				name: "text2",
				detail: "Druhý textový reťazec."
			}
		}
	},
	FIND: {
		description: "Vyhľadá jeden text v inom (rozlišuje veľkosť písmen)",
		abstract: "Vyhľadá jeden text v inom (rozlišuje veľkosť písmen)",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/this-article-has-been-retired"
		}],
		functionParameter: {
			findText: {
				name: "hľadaný_text",
				detail: "Text, ktorý chcete nájsť."
			},
			withinText: {
				name: "v_text",
				detail: "Text obsahujúci hľadaný text."
			},
			startNum: {
				name: "počiatočná_pozícia",
				detail: "Určuje znak, od ktorého sa má začať hľadanie. Ak start_num vynecháte, predpokladá sa 1."
			}
		}
	},
	FINDB: {
		description: "Vyhľadá jeden text v inom (rozlišuje veľkosť písmen)",
		abstract: "Vyhľadá jeden text v inom (rozlišuje veľkosť písmen)",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/this-article-has-been-retired"
		}],
		functionParameter: {
			findText: {
				name: "hľadaný_text",
				detail: "Text, ktorý chcete nájsť."
			},
			withinText: {
				name: "v_text",
				detail: "Text obsahujúci hľadaný text."
			},
			startNum: {
				name: "počiatočná_pozícia",
				detail: "Určuje znak, od ktorého sa má začať hľadanie. Ak start_num vynecháte, predpokladá sa 1."
			}
		}
	},
	FIXED: {
		description: "Formátuje číslo ako text s pevným počtom desatinných miest",
		abstract: "Formátuje číslo ako text s pevným počtom desatinných miest",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/fixed-function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Číslo, ktoré chcete zaokrúhliť a previesť na text."
			},
			decimals: {
				name: "desatinné_miesta",
				detail: "Počet číslic napravo od desatinnej čiarky. Ak je záporný, číslo sa zaokrúhli doľava od desatinnej čiarky. Ak decimals vynecháte, predpokladá sa 2."
			},
			noCommas: {
				name: "bez_čiark",
				detail: "Logická hodnota, ktorá ak je TRUE, zabráni funkcii FIXED zahrnúť čiarky do vráteného textu."
			}
		}
	},
	LEFT: {
		description: "Vracia najľavejšie znaky z textovej hodnoty",
		abstract: "Vracia najľavejšie znaky z textovej hodnoty",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/left-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Textový reťazec obsahujúci znaky, ktoré chcete extrahovať."
			},
			numChars: {
				name: "počet_znakov",
				detail: "Určuje počet znakov, ktoré má funkcia LEFT extrahovať."
			}
		}
	},
	LEFTB: {
		description: "Vracia najľavejšie znaky z textovej hodnoty",
		abstract: "Vracia najľavejšie znaky z textovej hodnoty",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/left-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Textový reťazec obsahujúci znaky, ktoré chcete extrahovať."
			},
			numBytes: {
				name: "počet_bajtov",
				detail: "Určuje počet znakov, ktoré má LEFTB extrahovať, podľa bajtov."
			}
		}
	},
	LEN: {
		description: "Vracia počet znakov v textovom reťazci",
		abstract: "Vracia počet znakov v textovom reťazci",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/len-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Text, ktorého dĺžku chcete zistiť. Medzery sa počítajú ako znaky."
		} }
	},
	LENB: {
		description: "Vracia počet bajtov použitých na reprezentáciu znakov v textovom reťazci.",
		abstract: "Vracia počet bajtov použitých na reprezentáciu znakov v textovom reťazci",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/len-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Text, ktorého dĺžku chcete zistiť. Medzery sa počítajú ako znaky."
		} }
	},
	LOWER: {
		description: "Konvertuje text na malé písmená.",
		abstract: "Konvertuje text na malé písmená",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/lower-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Text, ktorý chcete previesť na malé písmená."
		} }
	},
	MID: {
		description: "Vracia zadaný počet znakov z textového reťazca od určenej pozície.",
		abstract: "Vracia zadaný počet znakov z textového reťazca od určenej pozície",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/mid-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Textový reťazec obsahujúci znaky, ktoré chcete extrahovať."
			},
			startNum: {
				name: "počiatočná_pozícia",
				detail: "Pozícia prvého znaku, ktorý chcete v texte extrahovať."
			},
			numChars: {
				name: "počet_znakov",
				detail: "Určuje počet znakov, ktoré má funkcia MID extrahovať."
			}
		}
	},
	MIDB: {
		description: "Vracia zadaný počet znakov z textového reťazca od určenej pozície",
		abstract: "Vracia zadaný počet znakov z textového reťazca od určenej pozície",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/mid-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Textový reťazec obsahujúci znaky, ktoré chcete extrahovať."
			},
			startNum: {
				name: "počiatočná_pozícia",
				detail: "Pozícia prvého znaku, ktorý chcete v texte extrahovať."
			},
			numBytes: {
				name: "počet_bajtov",
				detail: "Určuje počet znakov, ktoré má funkcia MIDB extrahovať, podľa bajtov."
			}
		}
	},
	NUMBERSTRING: {
		description: "Konvertuje čísla na čínske reťazce",
		abstract: "Konvertuje čísla na čínske reťazce",
		links: [{
			title: "Inštrukcia",
			url: "https://www.wps.cn/learning/course/detail/id/340.html?chan=pc_kdocs_function"
		}],
		functionParameter: {
			number: {
				name: "číslo",
				detail: "Hodnota prevedená na čínsky reťazec."
			},
			type: {
				name: "typ",
				detail: "Typ vráteného výsledku. \n1. Čínske malé znaky \n2. Čínske veľké znaky \n3. Čínske znaky na čítanie a písanie"
			}
		}
	},
	NUMBERVALUE: {
		description: "Konvertuje text na číslo nezávisle od národného nastavenia",
		abstract: "Konvertuje text na číslo nezávisle od národného nastavenia",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/numbervalue-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Text, ktorý sa má previesť na číslo."
			},
			decimalSeparator: {
				name: "desatinný_oddeľovač",
				detail: "Znak použitý na oddelenie celej a zlomkovej časti výsledku."
			},
			groupSeparator: {
				name: "oddeľovač_skupín",
				detail: "Znak použitý na oddelenie skupín číslic."
			}
		}
	},
	PHONETIC: {
		description: "Extrahuje fonetické (furigana) znaky z textového reťazca",
		abstract: "Extrahuje fonetické (furigana) znaky z textového reťazca",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/phonetic-function"
		}],
		functionParameter: { reference: {
			name: "Odkaz",
			detail: "Text, rozsah alebo odkaz obsahujúci fonetický text, ktorý sa má extrahovať."
		} }
	},
	PROPER: {
		description: "Zmení prvé písmeno v každom slove na veľké",
		abstract: "Zmení prvé písmeno v každom slove na veľké",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/proper-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Text v úvodzovkách, vzorec vracajúci text alebo odkaz na bunku s textom, ktorý chcete čiastočne kapitalizovať."
		} }
	},
	REGEXEXTRACT: {
		description: "Extrahuje prvý zodpovedajúci podreťazec podľa regulárneho výrazu.",
		abstract: "Extrahuje prvý zodpovedajúci podreťazec podľa regulárneho výrazu.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.google.com/docs/answer/3098244?hl=sk"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Vstupný text."
			},
			regularExpression: {
				name: "regulárny_výraz",
				detail: "Vráti sa prvá časť textu, ktorá zodpovedá tomuto výrazu."
			}
		}
	},
	REGEXMATCH: {
		description: "Určuje, či časť textu zodpovedá regulárnemu výrazu.",
		abstract: "Určuje, či časť textu zodpovedá regulárnemu výrazu.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.google.com/docs/answer/3098292?hl=sk"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Text, ktorý sa má otestovať proti regulárnemu výrazu."
			},
			regularExpression: {
				name: "regulárny_výraz",
				detail: "Regulárny výraz, podľa ktorého sa text testuje."
			}
		}
	},
	REGEXREPLACE: {
		description: "Nahradí časť textového reťazca iným reťazcom pomocou regulárnych výrazov.",
		abstract: "Nahradí časť textového reťazca iným reťazcom pomocou regulárnych výrazov.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.google.com/docs/answer/3098245?hl=sk"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Text, ktorého časť sa nahradí."
			},
			regularExpression: {
				name: "regulárny_výraz",
				detail: "Regulárny výraz. Všetky zhodné výskyty v texte sa nahradia."
			},
			replacement: {
				name: "náhrada",
				detail: "Text, ktorý sa vloží do pôvodného textu."
			}
		}
	},
	REPLACE: {
		description: "Nahrádza znaky v texte",
		abstract: "Nahrádza znaky v texte",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/replace-function"
		}],
		functionParameter: {
			oldText: {
				name: "starý_text",
				detail: "Text, v ktorom chcete nahradiť niektoré znaky."
			},
			startNum: {
				name: "počiatočná_pozícia",
				detail: "Pozícia znaku v old_text, ktorý chcete nahradiť new_text."
			},
			numChars: {
				name: "počet_znakov",
				detail: "Počet znakov v old_text, ktoré má REPLACE nahradiť new_text."
			},
			newText: {
				name: "nový_text",
				detail: "Text, ktorý nahradí znaky v old_text."
			}
		}
	},
	REPLACEB: {
		description: "Nahrádza znaky v texte",
		abstract: "Nahrádza znaky v texte",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/replace-function"
		}],
		functionParameter: {
			oldText: {
				name: "starý_text",
				detail: "Text, v ktorom chcete nahradiť niektoré znaky."
			},
			startNum: {
				name: "počiatočná_pozícia",
				detail: "Pozícia znaku v old_text, ktorý chcete nahradiť new_text."
			},
			numBytes: {
				name: "počet_bajtov",
				detail: "Počet bajtov v old_text, ktoré má REPLACEB nahradiť new_text."
			},
			newText: {
				name: "nový_text",
				detail: "Text, ktorý nahradí znaky v old_text."
			}
		}
	},
	REPT: {
		description: "Opakuje text zadaný početkrát",
		abstract: "Opakuje text zadaný početkrát",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/rept-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Text, ktorý chcete opakovať."
			},
			numberTimes: {
				name: "počet_opakovaní",
				detail: "Kladné číslo určujúce, koľkokrát sa text zopakuje."
			}
		}
	},
	RIGHT: {
		description: "Vracia najpravejšie znaky z textovej hodnoty",
		abstract: "Vracia najpravejšie znaky z textovej hodnoty",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/right-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Textový reťazec obsahujúci znaky, ktoré chcete extrahovať."
			},
			numChars: {
				name: "počet_znakov",
				detail: "Určuje počet znakov, ktoré má RIGHT extrahovať."
			}
		}
	},
	RIGHTB: {
		description: "Vracia najpravejšie znaky z textovej hodnoty",
		abstract: "Vracia najpravejšie znaky z textovej hodnoty",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/right-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Textový reťazec obsahujúci znaky, ktoré chcete extrahovať."
			},
			numBytes: {
				name: "počet_bajtov",
				detail: "Určuje počet znakov, ktoré má RIGHTB extrahovať, podľa bajtov."
			}
		}
	},
	SEARCH: {
		description: "Vyhľadá jeden text v inom (nerozlišuje veľkosť písmen)",
		abstract: "Vyhľadá jeden text v inom (nerozlišuje veľkosť písmen)",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/search-function"
		}],
		functionParameter: {
			findText: {
				name: "hľadaný_text",
				detail: "Text, ktorý chcete nájsť."
			},
			withinText: {
				name: "v_text",
				detail: "Text obsahujúci hľadaný text."
			},
			startNum: {
				name: "počiatočná_pozícia",
				detail: "Určuje znak, od ktorého sa má začať hľadanie. Ak start_num vynecháte, predpokladá sa 1."
			}
		}
	},
	SEARCHB: {
		description: "Vyhľadá jeden text v inom (nerozlišuje veľkosť písmen)",
		abstract: "Vyhľadá jeden text v inom (nerozlišuje veľkosť písmen)",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/search-function"
		}],
		functionParameter: {
			findText: {
				name: "hľadaný_text",
				detail: "Text, ktorý chcete nájsť."
			},
			withinText: {
				name: "v_text",
				detail: "Text obsahujúci hľadaný text."
			},
			startNum: {
				name: "počiatočná_pozícia",
				detail: "Určuje znak, od ktorého sa má začať hľadanie. Ak start_num vynecháte, predpokladá sa 1."
			}
		}
	},
	SUBSTITUTE: {
		description: "Nahrádza starý text novým v textovom reťazci",
		abstract: "Nahrádza starý text novým v textovom reťazci",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/substitute-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Text alebo odkaz na bunku obsahujúcu text, v ktorom chcete nahradiť znaky."
			},
			oldText: {
				name: "starý_text",
				detail: "Text, ktorý chcete nahradiť."
			},
			newText: {
				name: "nový_text",
				detail: "Text, ktorým chcete nahradiť old_text."
			},
			instanceNum: {
				name: "poradie_výskytu",
				detail: "Určuje, ktorý výskyt old_text sa má nahradiť new_text. Ak zadáte instance_num, nahradí sa len tento výskyt; inak sa nahradia všetky výskyty old_text v texte."
			}
		}
	},
	T: {
		description: "Konvertuje svoje argumenty na text",
		abstract: "Konvertuje svoje argumenty na text",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/t-function"
		}],
		functionParameter: { value: {
			name: "hodnota",
			detail: "Hodnota, ktorú chcete otestovať."
		} }
	},
	TEXT: {
		description: "Formátuje číslo a konvertuje ho na text",
		abstract: "Formátuje číslo a konvertuje ho na text",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/text-function"
		}],
		functionParameter: {
			value: {
				name: "hodnota",
				detail: "Číselná hodnota, ktorú chcete previesť na text."
			},
			formatText: {
				name: "formát_textu",
				detail: "Textový reťazec, ktorý definuje formátovanie, ktoré sa má použiť na zadanú hodnotu."
			}
		}
	},
	TEXTAFTER: {
		description: "Vracia text, ktorý sa nachádza za daným znakom alebo reťazcom",
		abstract: "Vracia text, ktorý sa nachádza za daným znakom alebo reťazcom",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/textafter-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Text, v ktorom hľadáte. Zástupné znaky nie sú povolené."
			},
			delimiter: {
				name: "oddeľovač",
				detail: "Text, ktorý označuje bod, pred ktorým chcete extrahovať text."
			},
			instanceNum: {
				name: "poradie_výskytu",
				detail: "Výskyt oddeľovača, pred ktorým chcete extrahovať text."
			},
			matchMode: {
				name: "režim_zhody",
				detail: "Určuje, či sa pri hľadaní rozlišujú veľké a malé písmená. Predvolene sa rozlišuje."
			},
			matchEnd: {
				name: "zhoda_na_konci",
				detail: "Považuje koniec textu za oddeľovač. Predvolene sa vyžaduje presná zhoda."
			},
			ifNotFound: {
				name: "ak_nenájdené",
				detail: "Hodnota vrátená, ak sa nenájde zhoda. Predvolene sa vracia #N/A."
			}
		}
	},
	TEXTBEFORE: {
		description: "Vracia text, ktorý sa nachádza pred daným znakom alebo reťazcom",
		abstract: "Vracia text, ktorý sa nachádza pred daným znakom alebo reťazcom",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/textbefore-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Text, v ktorom hľadáte. Zástupné znaky nie sú povolené."
			},
			delimiter: {
				name: "oddeľovač",
				detail: "Text, ktorý označuje bod, za ktorým chcete extrahovať text."
			},
			instanceNum: {
				name: "poradie_výskytu",
				detail: "Výskyt oddeľovača, za ktorým chcete extrahovať text."
			},
			matchMode: {
				name: "režim_zhody",
				detail: "Určuje, či sa pri hľadaní rozlišujú veľké a malé písmená. Predvolene sa rozlišuje."
			},
			matchEnd: {
				name: "zhoda_na_konci",
				detail: "Považuje koniec textu za oddeľovač. Predvolene sa vyžaduje presná zhoda."
			},
			ifNotFound: {
				name: "ak_nenájdené",
				detail: "Hodnota vrátená, ak sa nenájde zhoda. Predvolene sa vracia #N/A."
			}
		}
	},
	TEXTJOIN: {
		description: "Text: Spája text z viacerých rozsahov a/alebo reťazcov",
		abstract: "Text: Spája text z viacerých rozsahov a/alebo reťazcov",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/textjoin-function"
		}],
		functionParameter: {
			delimiter: {
				name: "oddeľovač",
				detail: "Textový reťazec, buď prázdny alebo jeden či viac znakov v dvojitých úvodzovkách, alebo odkaz na platný textový reťazec."
			},
			ignoreEmpty: {
				name: "ignorovať_prázdne",
				detail: "Ak TRUE, ignoruje prázdne bunky."
			},
			text1: {
				name: "text1",
				detail: "Textová položka na spojenie. Textový reťazec alebo pole reťazcov, napríklad rozsah buniek."
			},
			text2: {
				name: "text2",
				detail: "Ďalšie textové položky na spojenie. Môže byť maximálne 252 textových argumentov vrátane text1. Každá môže byť textový reťazec alebo pole reťazcov, napríklad rozsah buniek."
			}
		}
	},
	TEXTSPLIT: {
		description: "Rozdelí textové reťazce pomocou oddeľovačov stĺpcov a riadkov",
		abstract: "Rozdelí textové reťazce pomocou oddeľovačov stĺpcov a riadkov",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/textsplit-function"
		}],
		functionParameter: {
			text: {
				name: "text",
				detail: "Text, ktorý sa má rozdeliť."
			},
			colDelimiter: {
				name: "oddeľovač_stĺpcov",
				detail: "Znak alebo reťazec, podľa ktorého sa delí stĺpec."
			},
			rowDelimiter: {
				name: "oddeľovač_riadkov",
				detail: "Znak alebo reťazec, podľa ktorého sa delí riadok."
			},
			ignoreEmpty: {
				name: "ignorovať_prázdne",
				detail: "Či sa majú ignorovať prázdne bunky. Predvolene FALSE."
			},
			matchMode: {
				name: "režim_zhody",
				detail: "Hľadá zhodu oddeľovača v texte. Predvolene sa rozlišuje veľkosť písmen."
			},
			padWith: {
				name: "doplnit_s",
				detail: "Hodnota použitá na doplnenie. Predvolene sa použije #N/A."
			}
		}
	},
	TRIM: {
		description: "Odstráni z textu všetky medzery okrem jednotlivých medzi slovami.",
		abstract: "Odstráni medzery z textu",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/trim-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Text, z ktorého chcete odstrániť medzery."
		} }
	},
	UNICHAR: {
		description: "Vracia znak Unicode, na ktorý odkazuje zadaná číselná hodnota",
		abstract: "Vracia znak Unicode, na ktorý odkazuje zadaná číselná hodnota",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/unichar-function"
		}],
		functionParameter: { number: {
			name: "číslo",
			detail: "Číslo je Unicode kód reprezentujúci znak."
		} }
	},
	UNICODE: {
		description: "Vracia číslo (kódový bod), ktorý zodpovedá prvému znaku textu",
		abstract: "Vracia číslo (kódový bod), ktorý zodpovedá prvému znaku textu",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/unicode-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Text je znak, pre ktorý chcete Unicode hodnotu."
		} }
	},
	UPPER: {
		description: "Konvertuje text na veľké písmená",
		abstract: "Konvertuje text na veľké písmená",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/upper-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Text, ktorý chcete previesť na veľké písmená."
		} }
	},
	VALUE: {
		description: "Konvertuje textový argument na číslo",
		abstract: "Konvertuje textový argument na číslo",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/value-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Text v úvodzovkách alebo odkaz na bunku obsahujúcu text, ktorý chcete previesť na číslo."
		} }
	},
	VALUETOTEXT: {
		description: "Vracia text z ľubovoľnej zadanej hodnoty",
		abstract: "Vracia text z ľubovoľnej zadanej hodnoty",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/valuetotext-function"
		}],
		functionParameter: {
			value: {
				name: "hodnota",
				detail: "Hodnota, ktorá sa má vrátiť ako text."
			},
			format: {
				name: "formát",
				detail: "Formát vrátených údajov. Môže byť jedna z dvoch hodnôt: \n0 Predvolené. Stručný formát, ktorý sa ľahko číta. \n1 Prísny formát, ktorý obsahuje escape znaky a oddeľovače riadkov. Generuje reťazec, ktorý možno analyzovať po vložení do riadka vzorcov. Vrátené reťazce uzatvára do úvodzoviek okrem logických hodnôt, čísel a chýb."
			}
		}
	},
	CALL: {
		description: "Volá procedúru v dynamickej knižnici alebo kódovom zdroji",
		abstract: "Volá procedúru v dynamickej knižnici alebo kódovom zdroji",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/call-function"
		}],
		functionParameter: {
			moduleText: {
				name: "Text modulu",
				detail: "Názov dynamicky prepájanej knižnice (DLL), ktorá obsahuje procedúru."
			},
			procedure: {
				name: "Procedúra",
				detail: "Názov alebo poradové číslo procedúry v knižnici DLL."
			},
			typeText: {
				name: "Text typu",
				detail: "Text určujúci typy údajov argumentov a vrátenej hodnoty."
			},
			argument1: {
				name: "Argument 1",
				detail: "Voliteľné. Prvý argument odovzdaný procedúre."
			}
		}
	},
	EUROCONVERT: {
		description: "Konvertuje číslo na eurá, konvertuje číslo z eur na menu členského štátu eurozóny alebo konvertuje číslo z jednej meny eurozóny na inú pomocou eura ako sprostredkovateľa (triangulácia)",
		abstract: "Konvertuje číslo na eurá, konvertuje číslo z eur na menu členského štátu eurozóny alebo konvertuje číslo z jednej meny eurozóny na inú pomocou eura ako sprostredkovateľa (triangulácia)",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/euroconvert-function"
		}],
		functionParameter: {
			number: {
				name: "Číslo",
				detail: "Hodnota meny, ktorá sa má skonvertovať."
			},
			source: {
				name: "Zdroj",
				detail: "Kód zdrojovej meny."
			},
			target: {
				name: "Cieľ",
				detail: "Kód cieľovej meny."
			},
			fullPrecision: {
				name: "Úplná presnosť",
				detail: "Logická hodnota určujúca zaokrúhľovanie podľa pravidiel meny."
			},
			triangulationPrecision: {
				name: "Presnosť triangulácie",
				detail: "Voliteľné. Počet platných číslic pri medziprevode cez euro."
			}
		}
	},
	REGISTER_ID: {
		description: "Vracia ID registrácie zadanej dynamickej knižnice (DLL) alebo kódového zdroja, ktorý bol predtým zaregistrovaný",
		abstract: "Vracia ID registrácie zadanej dynamickej knižnice (DLL) alebo kódového zdroja, ktorý bol predtým zaregistrovaný",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/register-id-function"
		}],
		functionParameter: {
			moduleText: {
				name: "Text modulu",
				detail: "Názov knižnice DLL alebo zdroja kódu obsahujúceho procedúru."
			},
			procedure: {
				name: "Procedúra",
				detail: "Názov alebo poradové číslo procedúry."
			},
			typeText: {
				name: "Text typu",
				detail: "Voliteľné. Text určujúci typy údajov argumentov a vrátenej hodnoty."
			}
		}
	}
};

//#endregion
//#region src/locale/function-list/univer/sk-SK.ts
const locale$2 = {};

//#endregion
//#region src/locale/function-list/web/sk-SK.ts
const locale$1 = {
	ENCODEURL: {
		description: "Funkcia ENCODEURL vráti reťazec zakódovaný URL a niektoré nealfanumerické znaky nahradí symbolom percenta (%) a šestnástkovým číslom.",
		abstract: "Funkcia ENCODEURL vráti reťazec zakódovaný URL a niektoré nealfanumerické znaky nahradí symbolom percenta (%) a šestnástkovým číslom.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/encodeurl-function"
		}],
		functionParameter: { text: {
			name: "text",
			detail: "Reťazec, ktorého URL adresa sa má zakódovať"
		} }
	},
	FILTERXML: {
		description: "Funkcia FILTERXML vráti určité údaje z obsahu XML s použitím zadanej xpath.",
		abstract: "Funkcia FILTERXML vráti určité údaje z obsahu XML s použitím zadanej xpath.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/filterxml-function"
		}],
		functionParameter: {
			xml: {
				name: "xml",
				detail: "Reťazec v platnom formáte XML."
			},
			xpath: {
				name: "xpath",
				detail: "Reťazec v štandardnom formáte XPath."
			}
		}
	},
	WEBSERVICE: {
		description: "Funkcia WEBSERVICE vráti údaje z webovej služby na internete alebo intranete.",
		abstract: "Funkcia WEBSERVICE vráti údaje z webovej služby na internete alebo intranete.",
		links: [{
			title: "Inštrukcia",
			url: "https://support.microsoft.com/sk-sk/excel/functions/webservice-function"
		}],
		functionParameter: { url: {
			name: "url",
			detail: "Adresa URL webovej služby."
		} }
	}
};

//#endregion
//#region src/locale/sk-SK.ts
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