//Másolás tétel
function masolas(t) {
    tombKiirasa(t);
    var masoltT = [];
    valtozokKiirasa({nev: "B", ertek: masoltT}, "");
    for (var i = 0; i < t.length; i++) {
        masoltT.push(t[i]);
        valtozokKiirasa({nev: "B", ertek: masoltT}, {nev: "I", ertek: i + 1}, "ciklusLepes");
    }
    megjelenitesInit();
}

//Kiválogatás tétel
function kivalogatas(t, relJel, felt) {
    tombKiirasa(t);
    var a = [];
    if (parseFloat(felt)) {
        felt = parseFloat(felt);
    }
    for (var i = 0; i < t.length; i++) {
        valtozokKiirasa({nev: "B", ertek: a}, {nev: "I", ertek: i + 1}, "ciklusLepes");
        if (feltetel(t[i], relJel, felt)) {
            a.push(t[i]);
            valtozokKiirasa({nev: "B", ertek: a}, {nev: "I", ertek: i + 1}, "elemBerakas");
        }
    }
    megjelenitesInit();
}

//Szétválogatás
function szetvalogatas(t, relJel, felt) {
    tombKiirasa(t);
    var a = [], b = [];
    if (parseFloat(felt)) {
        felt = parseFloat(felt);
    }
    valtozokKiirasa({nev: "B", ertek: a}, {nev: "C", ertek: b}, "");
    for (var i = 0; i < t.length; i++) {
        if (feltetel(t[i], relJel, felt)) {
            a.push(t[i]);
            valtozokKiirasa({nev: "B", ertek: a}, {nev: "C", ertek: b}, {nev: "I", ertek: i + 1}, "elemBerakas");
        } else {
            b.push(t[i]);
            valtozokKiirasa({nev: "B", ertek: a}, {nev: "C", ertek: b}, {nev: "I", ertek: i + 1}, "elemBerakas2");
        }
    }
    megjelenitesInit();
}

//a és b tömb metszete
function metszet(a, b) {
    var db = 0;
    var c = [];
    tombKiirasa(c);
    valtozokKiirasa({nev: "a", ertek: a}, {nev: "b", ertek: b}, "");
    for (var i = 0; i < a.length; i++) {
        valtozokKiirasa({nev: "a", ertek: a}, {nev: "b", ertek: b}, "ciklusLepes");
        tombKiirasa(c);
        var j = 0;
        while (j < b.length && a[i] !== b[j]) {
            j++;
        }
        if (j < b.length) {
            c[db++] = a[i];
            valtozokKiirasa({nev: "a", ertek: a}, {nev: "b", ertek: b}, "metszetBerakas");
            tombKiirasa(c);
        }
    }
    megjelenitesInit();
}

//a és b tömb uniója
function unio(a, b) {
    var c = a.slice();
    var db = a.length;
    for (var j = 0; j < b.length; j++) {
        valtozokKiirasa({nev: "a", ertek: a}, {nev: "b", ertek: b}, "ciklusLepes");
        tombKiirasa(c);
        var i = 0;
        while (i < a.length && a[i] !== b[j]) {
            i++;
        }
        if (i >= a.length) {
            c[db++] = b[j];
            valtozokKiirasa({nev: "a", ertek: a}, {nev: "b", ertek: b}, "unioBerakas");
            tombKiirasa(c);
        }
    }
    megjelenitesInit();
}