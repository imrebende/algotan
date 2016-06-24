//Kicserél két elemet a t tömbben
function csere(t, a, b){
	t[b] = [t[a], t[a] = t[b]][0];
}

//Buborékos rendezés
function buborekosRendezes(t){
	for(var i = t.length - 1; i > 0; i--) {
		for(var j = 0; j <= i-1; j++) {
			tombKiirasa(t, j, j + 1, "ciklusLepes");
			if(t[j] > t[j + 1]) {
				csere(t, j, j+1);
				tombKiirasa(t, j, j + 1, "csereLepes");
			}
		}
	}
	elsoLepesMegjelenitese();
	barValtoztatasa();
	szovegValtoztatas();
	play();
}

//Minimum kiválasztásos rendezés
function minKivRendezes(t){
	for(var i = 0; i < t.length; i++){
		minI = i;
		for(var j = i + 1; j < t.length; j++){
			if(t[minI] > t[j]){
				minI = j;
			}
		}
		tombKiirasa(t, i, minI, "csereLepes");
		csere(t, i, minI);
		tombKiirasa(t, i, minI, "csereLepes");
	}
	elsoLepesMegjelenitese();
	barValtoztatasa();
	szovegValtoztatas();
	play();
}

function feloszt(tomb, pivot, bal, jobb) {

	var index = bal,
    pivotValue = tomb[pivot];

	tombKiirasa(tomb, pivot, jobb, "csereLepes");  
    csere(tomb, pivot, jobb);
	tombKiirasa(tomb, pivot, jobb, "csereLepes");

    for(var v = bal; v < jobb; v++) {

		if(tomb[v] < pivotValue) {
			tombKiirasa(tomb, v, index, "csereLepes");  
			csere(tomb, v, index);
			tombKiirasa(tomb, v, index, "csereLepes");
			index++;
		}
    }

    csere(tomb, jobb, index);

    return index;
}

function gyorsRendezes(tomb, bal, jobb) {
    var pivot = null;
    if(typeof bal !== 'number') {
      bal = 0;
    }
    if(typeof jobb !== 'number') {
      jobb = tomb.length - 1;
    }

    if(bal < jobb) {
      pivot     = bal + Math.ceil((jobb - bal) * 0.5);
      newPivot  = feloszt(tomb, pivot, bal, jobb);

      gyorsRendezes(tomb, bal, newPivot - 1);
      gyorsRendezes(tomb, newPivot + 1, jobb);
    }
	
	elsoLepesMegjelenitese();
	barValtoztatasa();
	szovegValtoztatas();
	play();
}

//Két rendezett tömböüt összefésül
function osszefesules(bal, jobb){
	var eredmeny = [],
		ib = 0,
		ij = 0;
		
	while (ib < bal.length && ij < jobb.length){
		if (bal[ib] < jobb[ij]){
			eredmeny.push(bal[ib++]);
		} else {
			eredmeny.push(jobb[ij++]);
		}
	}

	eredmeny = eredmeny.concat(bal.slice(ib)).concat(jobb.slice(ij));
	
	valtozokKiirasa({nev: "bal", ertek: bal}, {nev: "jobb", ertek: jobb}, {nev: "eredmeny", ertek: eredmeny}, "");
	
	return eredmeny;
}

//Összefésüléses rendezés
function osszefesulesesRendezes(elemek){

	if (elemek.length < 2) {
		return elemek;
	}

	var kozep = Math.floor(elemek.length / 2),
		bal    = elemek.slice(0, kozep),
		jobb   = elemek.slice(kozep);
		
	return osszefesules(osszefesulesesRendezes(bal), osszefesulesesRendezes(jobb));
}