let steps = [];
let actStep = 0;

function elozoNew() {
    if (actStep > 0) {
        pause();
        $(".btn-play").removeClass("disabled");
        elozoAllasNew();
    }
}

function kovetkezoNew() {
    if (actStep < steps.length - 1) {
        pause();
        $(".btn-play").removeClass("disabled");
        kovetkezoAllasNew();
    }
}

//Lejátsza az algoritmust
function playNew() {
    pause();
    $(".btn-play").removeClass("disabled");
    $("#playGomb").addClass("disabled");
    lejatszasNew(steps.length);
    szovegValtoztatasNew();
}

//Az algoritmus elejére állítja az állást
function stopNew() {
    pause();
    $(".btn-play").removeClass("disabled");
    $("#stopGomb").addClass("disabled");
    actStep = 0;
    display(steps[actStep], actStep);
    barValtoztatasaNew();
    szovegValtoztatasNew();
}

//let timeouts = [];
function lejatszasNew(k) {
    for (var i = 0; i < k; i++) {
        timeouts.push(setTimeout(kovetkezoAllasNew, (i + 1) * 2200));
    }
    timeouts.push(setTimeout(pause, k * 2200 + 1));
}

function kovetkezoAllasNew() {
    display(steps[++actStep], actStep);
    barValtoztatasaNew();
    szovegValtoztatasNew();
}

function elozoAllasNew() {
    display(steps[--actStep], actStep);
    barValtoztatasaNew();
    szovegValtoztatasNew();
}

function barValtoztatasaNew() {
    let allas = (actStep + 1) / steps.length;
    $("#algo-progressbar").animate({
        width: (allas * 100) + "%"
    }, 0, function () {
    });
}

function szovegValtoztatasNew() {
    $(".utasitas").addClass("hidden");
    $("." + steps[actStep].type).removeClass("hidden");
}