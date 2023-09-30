//Tömb elemeinek átalakítása számmá, amennyiben ez lehetséges
function tombAtalakitas(t) {
    var a = [];
    for (var i = 0; i < t.length; i++) {
        if (parseFloat(t[i])) {
            a[i] = parseFloat(t[i]);
        } else {
            a[i] = t[i];
        }
    }
    return a;
}

function tombAtalakitasIndexekkel(t) {
    var a = [];
    for (var i = 0; i < t.length; i++) {
        var akt = {};
        if (parseFloat(t[i])) {
            akt.value = parseFloat(t[i]);
        } else {
            akt.value = t[i];
        }
        akt.index = i;
        a.push(akt);
    }
    return a;
}

//Ellenőrzi, hogy egy tömb rendezett e
function tombRendezettE(t) {
    var l = true, i = 0;
    while (l && i < t.length - 1) {
        l = (t[i] <= t[i + 1]);
        i++;
    }
    return l;
}

//Ellenörzi a tömb tartalmát, hogy csak számok, vagy szövegek lehessenek, illetve, hogy jól legyenek a vesszők
function tombEllenorzes(t) {
    var i = 0;
    while (i < t.length) {
        if (!((t[i] >= 0 && t[i] <= 9) || (t[i] >= 'a' && t[i] <= 'z') || t[i] === ',' || t[i] === '-' || t[i] === '.')) {
            return false;
        }
        i++;
    }
    return !(t[t.length - 1] === ',' || t[0] === ',') && t.length != 0;
}

function tombObjValues(t) {
    var a = [];
    for (var i = 0; i < t.length; i++) {
        a[i] = t[i].value;
    }
    return a;
}

function tombObjIndexes(t) {
    var a = [];
    for (var i = 0; i < t.length; i++) {
        a[i] = t[i].index;
    }
    return a;
}

//Tömb kiírása a "tomb" id-vel rendelkező tartományba
function tombKiirasa(t, a, b, szoveg) {
    var tombClass = "";
    if (szoveg) {
        tombClass = szoveg;
    }
    var tombSzoveg = "";
    tombSzoveg += '<div class="tomb hidden ' + tombClass + '">[ ';
    for (var i = 0; i < t.length; i++) {
        var className = "";
        if (i === parseFloat(a) || i === parseFloat(b) || ($.isArray(a) && a.indexOf(i) >= 0)) {
            className = "blueTombElem";
        }
        if ($.isArray(b) && b.indexOf(i) >= 0) {
            className = "greenTombElem";
        }
        tombSzoveg += '<span class="elem ' + className + ' ">' + t[i] + '</span>';
        if (i !== t.length - 1) {
            tombSzoveg += ", ";
        }
    }
    tombSzoveg += ' ]</div>';
    $("#tombok").append(tombSzoveg);
}

//Az algoritmus állása alapján kiszínezi, hogy hol tartunk a tömbben
function tombValtoztatas() {
    //Színezések eltüntetése
    $("#tombok .elem").removeClass("blueElem").removeClass("greenElem");

    //i változó színezése kékké
    //TODO törlés
    var iValue = $("div.valtozo.active .ertek.I").text();
    if (iValue > 0) {
        $("#tombok .elem:nth-of-type(" + iValue + ")").addClass("blueElem");
    }

    var iValue = $("div.valtozo.active .ertek.I").text();
    if (iValue > 0) {
        $("#tombok .elem:nth-of-type(" + iValue + ")").addClass("blueElem");
    }

    //maxh változó színezése zölddé
    var maxhValue = $("div.valtozo.active .ertek.MAX").text();
    if (maxhValue > 0) {
        $("#tombok .elem:nth-of-type(" + maxhValue + ")").addClass("greenElem");
    }

    //Megszámolásnál jelöljük a jó elemeket
    var i = $("div.valtozo .ertek.I").first().text();
    var j = 0;
    while (i < iValue) {
        if ($("div.valtozo:nth-of-type(" + j + ")").hasClass("dbValtozas") || $("div.valtozo:nth-of-type(" + j + ")").hasClass("elemBerakas")) {
            $("#tombok .elem:nth-of-type(" + i + ")").addClass("greenElem");
        }
        j++;
        if (j > $("div.valtozo").length) {
            break;
        }
        i = $("div.valtozo:nth-of-type(" + j + ") .ertek.I").text();
    }
    if ($("div.valtozo.active").hasClass("dbValtozas")) {
        $("#tombok .elem:nth-of-type(" + iValue + ")").addClass("greenElem")
    } else if ($("div.valtozo.active").hasClass("elemBerakas")) {
        $("#tombok .elem:nth-of-type(" + iValue + ")").addClass("greenElem")
    }

    //Keresésnél megtalált elem jelölése
    /*var keresesLogikai = $("div.valtozo.active .ertek.l").text();
     if(keresesLogikai === "true"){
     $("#tombok .elem:nth-of-type(" + iValue + ")").addClass("greenElem");
     }*/

}

function elsoLepesMegjelenitese() {
    $("#tombok div").first().removeClass("hidden").addClass("active");
    $("#valtozok div").first().removeClass("hidden").addClass("active");
}

function barValtoztatasa() {
    var allas;
    if ($(".valtozo").length !== 0) {
        allas = ($(".valtozo").index($(".valtozo.active")) + 1) / $(".valtozo").length;
        $("#algo-progressbar").animate({
            width: (allas * 100) + "%"
        }, 0, function () {
        });
    } else if ($(".tomb").length !== 0) {
        allas = ($(".tomb").index($(".tomb.active")) + 1) / $(".tomb").length;
        $("#algo-progressbar").animate({
            width: (allas * 100) + "%"
        }, 0, function () {
        });
    }
}

function magyarazatValtoztatas(valtozo, ertek) {
    $("#magyarazat").text("A " + valtozo + " változó értéke " + ertek + " lett.");
}

function magyarazatValtoztatasSzoveg(szoveg) {
    $("#magyarazat").text(szoveg);
}

//Az algoritmusban jelzi, hogy a program éppen hol tart
function szovegValtoztatas() {
    $(".utasitas").addClass("hidden");
    if ($("#valtozok .active").hasClass("ciklusLepes")) {
        $(".ciklusLepesNyil").removeClass("hidden");
        magyarazatValtoztatas("I", $("#valtozok .active .ertek.I").text());
    } else if ($("#valtozok .active").hasClass("maxValtozas")) {
        $(".maxValtozasNyil").removeClass("hidden");
        magyarazatValtoztatas("MAX", $("#valtozok .active .ertek.MAX").text());
    } else if ($("#valtozok .active").hasClass("elsoMax")) {
        $(".elsoMaxNyil").removeClass("hidden");
        magyarazatValtoztatas("MAX", $("#valtozok .active .ertek.MAX").text());
    } else if ($("#valtozok .active").hasClass("osszegNoveles")) {
        $(".osszegNovelesNyil").removeClass("hidden");
        magyarazatValtoztatas("S", $("#valtozok .active .ertek.S").text());
    } else if ($("#valtozok .active").hasClass("elsoOsszeg")) {
        $(".elsoOsszegNyil").removeClass("hidden");
        magyarazatValtoztatas("S", $("#valtozok .active .ertek.S").text());
    } else if ($("#valtozok .active").hasClass("elsoDb")) {
        $(".elsoDbNyil").removeClass("hidden");
        magyarazatValtoztatas("DB", $("#valtozok .active .ertek.DB").text());
    } else if ($("#valtozok .active").hasClass("dbValtozas")) {
        $(".dbValtozasNyil").removeClass("hidden");
        magyarazatValtoztatas("DB", $("#valtozok .active .ertek.DB").text());
    } else if ($("#valtozok .active").hasClass("elsoLepes")) {
        $(".elsoLepesNyil").removeClass("hidden");
        magyarazatValtoztatas("i", 1);
    } else if ($("#valtozok .active").hasClass("faktorialisLepes")) {
        $(".faktorialisLepesNyil").removeClass("hidden");
        magyarazatValtoztatas("fakt", $("#valtozok .active .ertek.fakt").text());
    } else if ($("#valtozok .active").hasClass("elemBerakas")) {
        $(".elemBerakasNyil").removeClass("hidden");
        //magyarazatValtoztatas("fakt", $("#valtozok .active .ertek.fakt").text());
    } else if ($("#valtozok .active").hasClass("elemBerakas2")) {
        $(".elemBerakas2Nyil").removeClass("hidden");
        //magyarazatValtoztatas("fakt", $("#valtozok .active .ertek.fakt").text());
    } else if ($("#valtozok .active").hasClass("feltetelVizsgalat")) {
        $(".feltetelVizsgalatNyil").removeClass("hidden");
        magyarazatValtoztatas("l", $("#valtozok .active .ertek.l").text());
    } else if ($("#valtozok .active").hasClass("unioBerakas")) {
        $(".unioBerakasNyil").removeClass("hidden");
        magyarazatValtoztatasSzoveg("Az eredménytömbbe új érték került.");
    } else if ($("#valtozok .active").hasClass("metszetBerakas")) {
        $(".metszetBerakasNyil").removeClass("hidden");
        magyarazatValtoztatasSzoveg("Az eredménytömbbe új érték került.");
    }

    if ($("#tombok .active").hasClass("csereLepes")) {
        $(".csereLepesNyil").removeClass("hidden");
        magyarazatValtoztatasSzoveg("Elemek cseréje a tömbben.");
    } else if ($("#tombok .active").hasClass("ciklusLepes")) {
        $(".ciklusLepesNyil").removeClass("hidden");
        magyarazatValtoztatasSzoveg("");
    } else if ($("#tombok .active").hasClass("ciklusLepesMin")) {
        $(".ciklusLepesMinNyil").removeClass("hidden");
        magyarazatValtoztatasSzoveg("Következő minimum keresése.");
    } else if ($("#tombok .active").hasClass("belsoCiklusLepes")) {
        $(".belsoCiklusLepesNyil").removeClass("hidden");
        magyarazatValtoztatasSzoveg("Elemek összehasonlítása.");
    } else if ($("#tombok .active").hasClass("helyereKerult")) {
        magyarazatValtoztatasSzoveg("Az elem a helyére került.");
    }

    //Utasítás sorának meghatározása
    $(".active-line").removeClass("active-line");
    $(".utasitas:not(.hidden)").parent().addClass("active-line");
}

//Változók kiírása a "valtozok" id-vel rendelkező tartományba
function valtozokKiirasa() {
    var s = '<div class="valtozo hidden ' + arguments[arguments.length - 1] + '">';
    for (var i = 0; i < arguments.length - 1; i++) {
        if ($.isArray(arguments[i].ertek)) {
            s += '<div data-variable-name="' + arguments[i].nev + '" data-variable-value="' + arguments[i].ertek + '"><div class="nev">' + arguments[i].nev + '</div>: <div class="ertek ' + arguments[i].nev + " " + arguments[i].class + '">[ ' + arguments[i].ertek + " ]</div></div>";
        } else {
            s += '<div data-variable-name="' + arguments[i].nev + '" data-variable-value="' + arguments[i].ertek + '"><div class="nev">' + arguments[i].nev + '</div>: <div class="ertek ' + arguments[i].nev + " " + arguments[i].class + '">' + arguments[i].ertek + "</div></div>";
        }
    }
    s += '</div>';
    $("#valtozok").append(s);
}

//A változók következő állásának betöltése
function kovetkezoAllas() {
    //Következő változó állás betöltése, ha van
    var activeValtozok = $("#valtozok .active");
    if (activeValtozok.next().length > 0) {
        activeValtozok.next().addClass("active").removeClass("hidden");
        activeValtozok.addClass("hidden").removeClass("active");
        allasValtoztatasFunction();
    }
    //Következő tömb állás betöltése, ha van
    var activeTombok = $("#tombok .active");
    if (activeTombok.next().length > 0) {
        activeTombok.next().addClass("active").removeClass("hidden");
        activeTombok.addClass("hidden").removeClass("active");
        allasValtoztatasFunction();
    }
}

//A változók előző állásának betöltése
function elozoAllas() {
    var activeValtozok = $("#valtozok .active");
    if (activeValtozok.prev().length > 0) {
        activeValtozok.prev().addClass("active").removeClass("hidden");
        activeValtozok.last().addClass("hidden").removeClass("active");
        allasValtoztatasFunction();
    }
    var activeTombok = $("#tombok .active");
    if (activeTombok.prev().length > 0) {
        activeTombok.prev().addClass("active").removeClass("hidden");
        activeTombok.last().addClass("hidden").removeClass("active");
        allasValtoztatasFunction();
    }
}

//Lejátsza a folyamatot 3mp/lépés sebességgel
var timeouts = [];
function lejatszas(k) {
    tombValtoztatas();
    for (var i = 0; i < k; i++) {
        timeouts.push(setTimeout(kovetkezoAllas, (i + 1) * 2200));
    }
    timeouts.push(setTimeout(pause, k * 2200 + 1));
}

function tooltipModositas() {
    $.each($(".valtozo.active > div"), function (index, value) {
        $("." + $(value).attr("data-variable-name") + "-data").attr("data-original-title", $(value).attr("data-variable-value"));
    });
}

function allasValtoztatasFunction() {
    tombValtoztatas();
    szovegValtoztatas();
    barValtoztatasa();
    tooltipModositas();
}

function megjelenitesInit() {
    elsoLepesMegjelenitese();
    tooltipModositas();
    barValtoztatasa();
    szovegValtoztatas();
    play();
}