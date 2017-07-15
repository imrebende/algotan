$('.dropdown-menu').click(function(event){
    event.stopPropagation();
});

//DOM létrehozása után lefutó függvény
$(function() {
  //Minta bemenetet adok a tömb input mezőjébe
  $("#bemenet").val("4,3,6,8,2,3,9");
  $("#bemenet2").val("4,3,6,8,2,3,9");
  $("#logKerBemenet").val("1,2,3,4,5,6,7,8,9");
  $("#bemenetSimple").val("12");

	//Nyelvi elemek beállítása
	language_complete = navigator.language.split("-");
	language = (language_complete[0]);
	i18n.init({ lng: "hu" }, function() {
		$("html").i18n();
	});

	//Tooltipek bekapcsolása
	$('[data-toggle="tooltip"]').tooltip();

	if($("#algoritmus-reszletek")) {
		templateBetoltes("algoritmus-reszletek", "#algoritmus-reszletek");
	}

	if($("footer.footer")) {
		templateBetoltes("footer", "footer.footer");
	}

	if($("#navbar")) {
		templateBetoltes("navbar", "#navbar");
	}
});

function elozo(){
	pause();
	$(".btn-play").removeClass("disabled");
	elozoAllas();
}

function kovetkezo(){
	pause();
	$(".btn-play").removeClass("disabled");
	kovetkezoAllas();
}

//Lejátsza az algoritmust
function play(){
	pause();
	$(".btn-play").removeClass("disabled");
	$("#playGomb").addClass("disabled");
	var k;
	if($(".valtozo").length !== 0){
		k = $(".valtozo").length - $(".valtozo").index($(".valtozo.active")) - 1;
	} else if($(".tomb").length !== 0){
		k = $(".tomb").length - $(".tomb").index($(".tomb.active")) - 1;
	}
	lejatszas(k);
}

//Az algoritmus elejére állítja az állást
function stop(){
	pause();
	$(".btn-play").removeClass("disabled");
	$("#stopGomb").addClass("disabled");
	$("#valtozok .active").addClass("hidden").removeClass("active");
	$("#valtozok div").first().addClass("active").removeClass("hidden");
	$("#tombok .active").addClass("hidden").removeClass("active");
	$("#tombok div").first().addClass("active").removeClass("hidden");
	barValtoztatasa();
	szovegValtoztatas();
	tombValtoztatas();
}

//Az időzített függvény elsütések megszüntetése
function pause(){
	$(".btn-play").removeClass("disabled");
	for (var i = 0; i < timeouts.length; i++) {
		clearTimeout(timeouts[i]);
	}
	timeouts = [];
}

function fuggvenyElottiInit(){
	$("#valtozok").text("");
	$("#tombok").text("");
	pause();
	$("#eredmenyek").addClass("hidden");
	$("#hibasbemenet").removeClass("hidden");
}

function progTetelStart(tetel) {
    fuggvenyElottiInit();
    var bemenet = $("#bemenet").val();
    if(tombEllenorzes(bemenet)) {
        var t = tombAtalakitas(bemenet.replace(" ","").split(","));
        if(tetel == "osszegzes") {
            osszegzes(t);
        }
        $("#eredmenyek").removeClass("hidden");
        $("#hibasbemenet").addClass("hidden");
    }
}

function osszegStart(){
	fuggvenyElottiInit();
	if(tombEllenorzes($("#bemenet").val())) {
		var t = tombAtalakitas($("#bemenet").val().replace(" ","").split(","));
		osszegzes(t);
		$("#eredmenyek").removeClass("hidden");
		$("#hibasbemenet").addClass("hidden");
	}
}

function megszamolasStart(){
	fuggvenyElottiInit();
	if(tombEllenorzes($("#bemenet").val()) && $("#feltetel").val()) {
		var t = tombAtalakitas($("#bemenet").val().replace(" ","").split(","));
		megszamolas(t, $("#relaciosJel").val(), $("#feltetel").val());
		$("#eredmenyek").removeClass("hidden");
		$("#hibasbemenet").addClass("hidden");
	}
}

function keresesStart(){
	fuggvenyElottiInit();
	if(tombEllenorzes($("#bemenet").val()) && $("#feltetel").val()) {
		var t = tombAtalakitas($("#bemenet").val().replace(" ","").split(","));
		kereses(t, $("#relaciosJel").val(), $("#feltetel").val());
		$("#eredmenyek").removeClass("hidden");
		$("#hibasbemenet").addClass("hidden");
	}
}

function maxKivStart(){
	fuggvenyElottiInit();
	if(tombEllenorzes($("#bemenet").val())) {
		var t = tombAtalakitas($("#bemenet").val().replace(" ","").split(","));
		maximumKivalasztas(t);
		$("#eredmenyek").removeClass("hidden");
		$("#hibasbemenet").addClass("hidden");
	}
}

function logkerStart(){
	fuggvenyElottiInit();
	if(tombEllenorzes($("#logKerBemenet").val()) && $("#feltetel").val()) {
		var t = tombAtalakitas($("#logKerBemenet").val().replace(" ","").split(","));
		if(tombRendezettE(t)){
			logKereses(t, $("#feltetel").val());
			$("#eredmenyek").removeClass("hidden");
			$("#hibasbemenet").addClass("hidden");
		} else {
			//TODO Rendezettség hiba
		}
	}
}

function masolasStart(){
	fuggvenyElottiInit();
	if(tombEllenorzes($("#bemenet").val())) {
		var t = tombAtalakitas($("#bemenet").val().replace(" ","").split(","));
		masolas(t);
		$("#eredmenyek").removeClass("hidden");
		$("#hibasbemenet").addClass("hidden");
	}
}

function kivalogatasStart(){
	fuggvenyElottiInit();
	if(tombEllenorzes($("#bemenet").val()) && $("#feltetel").val()) {
		var t = tombAtalakitas($("#bemenet").val().replace(" ","").split(","));
		kivalogatas(t, $("#relaciosJel").val(), $("#feltetel").val());
		$("#eredmenyek").removeClass("hidden");
		$("#hibasbemenet").addClass("hidden");
	}
}

function szetvalogatasStart(){
	fuggvenyElottiInit();
	if(tombEllenorzes($("#bemenet").val()) && $("#feltetel").val()) {
		var t = tombAtalakitas($("#bemenet").val().replace(" ","").split(","));
		szetvalogatas(t, $("#relaciosJel").val(), $("#feltetel").val());
		$("#eredmenyek").removeClass("hidden");
		$("#hibasbemenet").addClass("hidden");
	}
}

function bubrendStart() {
	fuggvenyElottiInit();
	if(tombEllenorzes($("#bemenet").val())) {
		var t = tombAtalakitas($("#bemenet").val().replace(" ","").split(","));
		buborekosRendezes(t);
		$("#eredmenyek").removeClass("hidden");
		$("#hibasbemenet").addClass("hidden");
	}
}

function minKivRendStart() {
	fuggvenyElottiInit();
	if(tombEllenorzes($("#bemenet").val())) {
		var t = tombAtalakitas($("#bemenet").val().replace(" ","").split(","));
		minKivRendezes(t);
		$("#eredmenyek").removeClass("hidden");
		$("#hibasbemenet").addClass("hidden");
	}
}

function metszetStart() {
	fuggvenyElottiInit();
	if(tombEllenorzes($("#bemenet").val()) && tombEllenorzes($("#bemenet2").val())) {
		var t = tombAtalakitas($("#bemenet").val().replace(" ","").split(","));
		var t2 = tombAtalakitas($("#bemenet2").val().replace(" ","").split(","));
		metszet(t, t2);
		$("#eredmenyek").removeClass("hidden");
		$("#hibasbemenet").addClass("hidden");
	}
}

function unioStart() {
	fuggvenyElottiInit();
	if(tombEllenorzes($("#bemenet").val()) && tombEllenorzes($("#bemenet2").val())) {
		var t = tombAtalakitas($("#bemenet").val().replace(" ","").split(","));
		var t2 = tombAtalakitas($("#bemenet2").val().replace(" ","").split(","));
		unio(t, t2);
		$("#eredmenyek").removeClass("hidden");
		$("#hibasbemenet").addClass("hidden");
	}
}

function gyorsRendStart() {
	fuggvenyElottiInit();
	if(tombEllenorzes($("#bemenet").val())) {
		var t = tombAtalakitas($("#bemenet").val().replace(" ","").split(","));
		gyorsRendezes(t);
		$("#eredmenyek").removeClass("hidden");
		$("#hibasbemenet").addClass("hidden");
	}
}

function osszefesulesesRendezesStart() {
	fuggvenyElottiInit();
	if(tombEllenorzes($("#bemenet").val())) {
		var t = tombAtalakitasIndexekkel($("#bemenet").val().replace(" ","").split(","));
		osszefesulesesRendezes(t, t);
		$("#eredmenyek").removeClass("hidden");
		$("#hibasbemenet").addClass("hidden");
		elsoLepesMegjelenitese();
		barValtoztatasa();
		szovegValtoztatas();
		play();
	}
}

function osszegzesSzamok() {
	$("#bemenet").val("4,3,6,8,2,3,9");
}

function osszegzesSzoveg() {
	$("#bemenet").val("a,b,cd,ef");
}

function templateBetoltes(templateUrl, whereTo) {
	$.when(
		$.ajax({
			url:"templates/" + templateUrl + ".hbs"
		})
	).done(function(html){
		var parsedHtml = $.parseXML(html);
		var template = Handlebars.compile( new XMLSerializer().serializeToString(parsedHtml));
		$(template({})).appendTo(whereTo);
		i18n.init({ lng: "hu" }, function() {
			$(whereTo).i18n();
		});
	});
}