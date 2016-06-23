//M�sol�s t�tel
function masolas(t){
	tombKiirasa(t);
	var masoltT = [];
	valtozokKiirasa({nev: "B", ertek: masoltT}, "");
	for(var i = 0; i < t.length; i++){
		masoltT.push(t[i]);
		valtozokKiirasa({nev: "B", ertek: masoltT}, {nev: "i", ertek: i+1}, "ciklusLepes");
	}
	elsoLepesMegjelenitese();
	barValtoztatasa();
	szovegValtoztatas();
	play();
}

//Kiv�logat�s t�tel
function kivalogatas(t, relJel, felt){
	tombKiirasa(t);
	var a = [];
	if(parseFloat(felt)){
		felt = parseFloat(felt);
	}
	for(var i = 0; i < t.length; i++){
		valtozokKiirasa({nev: "B", ertek: a}, {nev: "i", ertek: i+1}, "");
		if(feltetel(t[i], relJel, felt)){
			a.push(t[i]);
			valtozokKiirasa({nev: "B", ertek: a}, {nev: "i", ertek: i+1}, "");
		}
	}
	elsoLepesMegjelenitese();
	barValtoztatasa();
	szovegValtoztatas();
	play();
}

//Sz�tv�logat�s
function szetvalogatas(t, relJel, felt){
	tombKiirasa(t);
	var a = [], b = [];
	if(parseFloat(felt)){
		felt = parseFloat(felt);
	}
	valtozokKiirasa({nev: "B", ertek: a}, {nev: "C", ertek: b}, "");
	for(var i = 0; i < t.length; i++){
		if(feltetel(t[i], relJel, felt)){
			a.push(t[i]);
			valtozokKiirasa({nev: "B", ertek: a}, {nev: "C", ertek: b}, {nev: "i", ertek: i+1}, "");
		}
		else{
			b.push(t[i]);
			valtozokKiirasa({nev: "B", ertek: a}, {nev: "C", ertek: b}, {nev: "i", ertek: i+1}, "");
		}
	}
	elsoLepesMegjelenitese();
	barValtoztatasa();
	szovegValtoztatas();
	play();
}

//a �s b t�mb metszete
function metszet(a, b){
	var db = 0;
	var c = [];
	tombKiirasa(c);
	valtozokKiirasa({nev: "a", ertek: a}, {nev: "b", ertek: b}, "");
	for(var i = 0; i < a.length; i++){
		var j = 0;
		while(j < b.length && a[i] !== b[i]){
			j++;
		}
		if(j < b.length){
			c[db] = a[i];
			valtozokKiirasa({nev: "a", ertek: a}, {nev: "b", ertek: b}, "");
			tombKiirasa(c);
			db++;
		}
	}
	elsoLepesMegjelenitese();
	barValtoztatasa();
	szovegValtoztatas();
	play();
}

//a �s b t�mb uni�ja
function unio(a, b){
	var c = a;
	for(var j = 0; j < b.length; j++){
		var i = 0;
		while(i < a.length && a[i] !== b[i]){
			i++;
		}
		if(i > a.length){
			c[db] = b[j];
			db++;
		}
	}
}