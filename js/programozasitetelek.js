//Összegzés tétel
function osszegzes(t){
	tombKiirasa(t);
	var s;
	if(t[0] >= 0 && t[0] <= 9){
		s = 0;
	} else{
		s = "";
	}
	valtozokKiirasa({nev: "S", ertek: s}, "elsoOsszeg");
	for (i = 0; i < t.length; i++) {
		valtozokKiirasa({nev: "S", ertek: s}, {nev: "i", ertek: i + 1}, "ciklusLepes");
		s += t[i];
		valtozokKiirasa({nev: "S", ertek: s}, {nev: "i", ertek: i + 1}, "osszegNoveles");
	}
	megjelenitesInit();
}

//Megszámolás tétel
function megszamolas(t, relaciosJel, felt){
	tombKiirasa(t);	
	var d = 0;
	valtozokKiirasa({nev: "DB", ertek: d}, "elsoDb");
	for(var i = 0; i < t.length; i++){
		valtozokKiirasa({nev: "DB", ertek: d}, {nev: "i", ertek: i + 1}, "ciklusLepes");
		if(feltetel(t[i], relaciosJel, felt)){
			d++;
			valtozokKiirasa({nev: "DB", ertek: d}, {nev: "i", ertek: i + 1}, "dbValtozas");
		}
	}
	megjelenitesInit();
}

//Keresés tétel
function kereses(t, relaciosJel, felt) {
	tombKiirasa(t);	
	var l = false;
	var i = 0;
	valtozokKiirasa({nev: "i", ertek: i}, {nev: "l", ertek: l}, "elsoLepes");
	while (!l && i < t.length) {
		l = feltetel(t[i], relaciosJel, felt);
		valtozokKiirasa({nev: "i", ertek: i + 1}, {nev: "l", ertek: l}, "feltetelVizsgalat");
		i++;
		valtozokKiirasa({nev: "i", ertek: i + 1}, {nev: "l", ertek: l}, "ciklusLepes");
	}
	megjelenitesInit();
}

//Logaritmikus keresés
function logKereses(t, searchElement) {
	tombKiirasa(t);
	var minIndex = 0;
    var maxIndex = t.length - 1;
    var currentIndex;
    var currentElement;
	var l = false;  
	valtozokKiirasa({nev: "minIndex", ertek: minIndex + 1}, {nev: "maxIndex", ertek: maxIndex + 1}, {nev: "t", ertek: t}, "");
   	while (minIndex <= maxIndex && !l) {
       	currentIndex = (minIndex + maxIndex) / 2 | 0;
       	currentElement = t[currentIndex];
       	if (currentElement < searchElement) {
           	minIndex = currentIndex + 1;
       	} else if (currentElement > searchElement) {
           	maxIndex = currentIndex - 1;
       	} else {
          	l = true;
       	}
		valtozokKiirasa({nev: "minIndex", ertek: minIndex + 1}, {nev: "maxIndex", ertek: maxIndex + 1}, {nev: "currentIndex", ertek: currentIndex + 1}, {nev: "l", ertek: l}, {nev: "t", ertek: t.slice(minIndex, maxIndex+1)}, "ciklusLepes");
    }
	megjelenitesInit();
}

//Maximum-kiválasztás tétel
function maximumKivalasztas(t) {
	tombKiirasa(t);
	var maxh = 0;
	valtozokKiirasa({nev: "MAX", ertek: maxh + 1}, "elsoMax");
	for (i = 1; i < t.length; i++) {
		valtozokKiirasa({nev: "MAX", ertek: maxh + 1}, {nev: "i", ertek: i + 1}, "ciklusLepes");
		if(t[i] > t[maxh]) {
			maxh = i;
			valtozokKiirasa({nev: "MAX", ertek: maxh + 1}, {nev: "i", ertek: i + 1}, "maxValtozas");
		}
	}
	megjelenitesInit();
}