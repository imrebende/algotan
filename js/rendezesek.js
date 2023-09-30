//Kicserél két elemet a t tömbben
function csere(t, a, b) {
    t[b] = [t[a], t[a] = t[b]][0];
}

//Buborékos rendezés
function buborekosRendezes(t) {
    var joHelyenLevoElemek = [];
    for (var i = t.length - 1; i > 0; i--) {
        tombKiirasa(t, [], joHelyenLevoElemek, "ciklusLepes");
        for (var j = 0; j <= i - 1; j++) {
            tombKiirasa(t, [j, j + 1], joHelyenLevoElemek, "belsoCiklusLepes");
            if (t[j] > t[j + 1]) {
                csere(t, j, j + 1);
                tombKiirasa(t, [j, j + 1], joHelyenLevoElemek, "csereLepes");
            }
        }
        joHelyenLevoElemek.push(i);
        tombKiirasa(t, [j, j + 1], joHelyenLevoElemek, "helyereKerult");
    }
    joHelyenLevoElemek.push(0);
    tombKiirasa(t, [j, j + 1], joHelyenLevoElemek, "");
    megjelenitesInit();
}

//Minimum kiválasztásos rendezés
function minKivRendezes(t) {
    var joHelyenLevoElemek = [];
    for (var i = 0; i < t.length; i++) {
        tombKiirasa(t, [i, minI], joHelyenLevoElemek, "ciklusLepesMin");
        var minI = i;
        for (var j = i + 1; j < t.length; j++) {
            if (t[minI] > t[j]) {
                minI = j;
            }
        }
        tombKiirasa(t, [i, minI], joHelyenLevoElemek, "csereLepes");
        csere(t, i, minI);
        joHelyenLevoElemek.push(i);
        tombKiirasa(t, [i, minI], joHelyenLevoElemek, "csereLepes");
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

    for (var v = bal; v < jobb; v++) {
        if (tomb[v] < pivotValue) {
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
    if (typeof bal !== 'number') {
        bal = 0;
    }
    if (typeof jobb !== 'number') {
        jobb = tomb.length - 1;
    }

    if (bal < jobb) {
        pivot = bal + Math.ceil((jobb - bal) * 0.5);
        var newPivot = feloszt(tomb, pivot, bal, jobb);

        gyorsRendezes(tomb, bal, newPivot - 1);
        gyorsRendezes(tomb, newPivot + 1, jobb);
    }

    elsoLepesMegjelenitese();
    barValtoztatasa();
    szovegValtoztatas();
    play();
}

//Két rendezett tömböt összefésül
function osszefesules(bal, jobb, eredeti) {
    var eredmeny = [],
        ib = 0,
        ij = 0;

    var vizsgaltIndexek = [];

    while (ib < bal.length && ij < jobb.length) {
        if (bal[ib].value < jobb[ij].value) {
            vizsgaltIndexek.push(bal[ib].index);
            eredmeny.push(bal[ib++]);
        } else {
            vizsgaltIndexek.push(jobb[ij].index);
            eredmeny.push(jobb[ij++]);
        }
    }
    eredmeny = eredmeny.concat(bal.slice(ib)).concat(jobb.slice(ij));

    while (ib < bal.length) {
        vizsgaltIndexek.push(bal[ib++].index);
    }
    while (ij < jobb.length) {
        vizsgaltIndexek.push(jobb[ij++].index);
    }
    vizsgaltIndexek.sort();

    for (var i = 0; i < vizsgaltIndexek.length; i++) {
        eredeti[vizsgaltIndexek[i]] = eredmeny[i];
    }

    valtozokKiirasa({nev: "bal", ertek: tombObjValues(bal)}, {
        nev: "jobb",
        ertek: tombObjValues(jobb)
    }, {nev: "eredmeny", ertek: tombObjValues(eredmeny)}, "");
    tombKiirasa(tombObjValues(eredeti), vizsgaltIndexek, "");

    return eredmeny;
}

//Összefésüléses rendezés
function osszefesulesesRendezes(elemek, eredeti) {

    if (elemek.length < 2) {
        return elemek;
    }

    var kozep = Math.floor(elemek.length / 2),
        bal = elemek.slice(0, kozep),
        jobb = elemek.slice(kozep);

    return osszefesules(osszefesulesesRendezes(bal, eredeti), osszefesulesesRendezes(jobb, eredeti), eredeti);
}