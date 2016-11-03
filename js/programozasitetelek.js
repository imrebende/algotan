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
	if(l){
		valtozokKiirasa({nev: "i", ertek: i, class: "blueElem"}, {nev: "l", ertek: l, class: "blueElem"}, "");
	} else {
		valtozokKiirasa({nev: "l", ertek: l, class: "blueElem"}, "");
	}
	megjelenitesInit();
}

//Logaritmikus keresés
function logKereses(t, searchElement) {
	var u = 0;
    var v = t.length - 1;
    var currentIndex;
    var currentElement;
	var l = false;  
	valtozokKiirasa({nev: "u", ertek: u + 1}, {nev: "v", ertek: v + 1}, {nev: "t", ertek: t}, "elsoLepes");
	var vizsgaltIndexek = [];
	for(var i = u; i <= v; i++) vizsgaltIndexek.push(i);
	tombKiirasa(t, vizsgaltIndexek, [(u + v) / 2 | 0], "");
   	while (u <= v && !l) {
       	currentIndex = (u + v) / 2 | 0;
       	currentElement = t[currentIndex];
       	if (currentElement < searchElement) {
           	u = currentIndex + 1;
       	} else if (currentElement > searchElement) {
           	v = currentIndex - 1;
       	} else {
          	l = true;
       	}
		valtozokKiirasa({nev: "u", ertek: u + 1}, {nev: "v", ertek: v + 1}, {nev: "i", ertek: ((u + v) / 2 | 0) + 1}, {nev: "l", ertek: l}, {nev: "t", ertek: t.slice(u, v + 1)}, "ciklusLepes");
		vizsgaltIndexek = [];
		for(var i = u; i <= v; i++) vizsgaltIndexek.push(i);
		tombKiirasa(t, vizsgaltIndexek, [(u + v) / 2 | 0], "");
    }
	if(l){
		valtozokKiirasa({nev: "i", ertek: ((u + v) / 2 | 0) + 1, class: "blueElem"}, {nev: "l", ertek: l, class: "blueElem"}, "ciklusLepes");
	} else {
		valtozokKiirasa({nev: "l", ertek: l, class: "blueElem"}, "ciklusLepes");
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