function faktorialisStart() {
    fuggvenyElottiInit();
    if ($("#bemenetSimple").val()) {
        faktorialis($("#bemenetSimple").val());
        $("#eredmenyek").removeClass("hidden");
        $("#hibasbemenet").addClass("hidden");
    }
}

function faktorialis(n) {
    var fakt = 1;
    valtozokKiirasa({nev: "fakt", ertek: fakt}, "elsoLepes");
    for (var i = 2; i <= n; i++) {
        valtozokKiirasa({nev: "i", ertek: i}, {nev: "fakt", ertek: fakt}, "ciklusLepes");
        fakt *= i;
        valtozokKiirasa({nev: "i", ertek: i}, {nev: "fakt", ertek: fakt}, "faktorialisLepes");
    }
    megjelenitesInit();
}