//DOM létrehozása után lefutó függvény
$(function() {
  //Minta bemenetet adok a tömb input mezőjébe
  $("#bemenet").val("4,3,6,8,2,3,9");
  $("#logKerBemenet").val("1,2,3,4,5,6,7,8,9");
  
  //Footer beszúrása
  $("footer.footer .container").text("Készítette: Bende Imre ( Témavezető: Dr. Zsakó László )");
  
  //Menü beszúrása
  $("#navbar").append('\
	<ul class="nav navbar-nav">\
		<li id="kezdooldal"><a href="index" data-i18n="label.menu.kezdooldal"></a></li>\
		<li id="progtetelek" class="dropdown">\
			<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" data-i18n="[html]label.menu.progtetelek"><span class="caret"></span></a>\
			<ul class="dropdown-menu">\
				<li><a href="osszegzes" data-i18n="progtetel.osszegzes.nev"></a></li>\
				<li><a href="megszamolas" data-i18n="progtetel.megszamolas.nev"></a></li>\
				<li><a href="maximumkivalasztas" data-i18n="progtetel.maxkiv.nev"></a></li>\
				<li><a href="kereses" data-i18n="progtetel.kereses.nev"></a></li>\
				<li><a href="logaritmikus-kereses" data-i18n="progtetel.logker.nev"></a></li>\
				<li><a href="masolas" data-i18n="progtetel.masolas.nev"></a></li>\
				<li><a href="kivalogatas" data-i18n="progtetel.kivalogatas.nev"></a></li>\
				<li><a href="szetvalogatas" data-i18n="progtetel.szetvalogatas.nev"></a></li>\
				<li><a href="metszet" data-i18n="progtetel.metszet.nev"></a></li>\
				<li><a href="unio" data-i18n="progtetel.unio.nev"></a></li>\
			</ul>\
		</li>\
	<li id="rendezesek" class="dropdown">\
		<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" data-i18n="[html]label.menu.rendezesek"></a>\
		<ul class="dropdown-menu">\
			<li><a href="buborekos-rendezes" data-i18n="rendezes.buborekos.nev"></a></li>\
			<li><a href="minkivalasztasos-rendezes" data-i18n="rendezes.minkiv.nev"></a></li>\
			<li><a href="gyorsrendezes" data-i18n="rendezes.gyorsrendezes.nev"></a></li>\
			<li><a href="osszefesuleses-rendezes" data-i18n="rendezes.osszefesulesesrendezes.nev"></a></li>\
		</ul>\
	</li>\
	<li class="dropdown">\
		<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" data-i18n="[html]label.menu.grafalgoritmusok"></a>\
		<ul class="dropdown-menu">\
		</ul>\
	</li>\
		<li class="dropdown">\
		<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" data-i18n="[html]label.menu.adatszerkezetek"></a>\
		<ul class="dropdown-menu">\
			<li><a href="verem" data-i18n="adatszerkezet.verem.nev"></a></li>\
			<li><a href="sor" data-i18n="adatszerkezet.sor.nev"></a></li>\
		</ul>\
	</li>\
	</ul>');
	
	//Nyelvi elemek beállítása
	language_complete = navigator.language.split("-");
	language = (language_complete[0]);
  
	i18n.init({ lng: "hu" }, function() {
		$("html").i18n();
	});
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
	}
	else if($(".tomb").length !== 0){
		k = $(".tomb").length - $(".tomb").index($(".tomb.active")) - 1;
	}
	lejatszas(k);
}

//Az algoritmus elejére állítja az állást
function stop(){
	pause();
	$(".btn-play").removeClass("disabled");
	$("#stopGomb").addClass("disabled");
	$("#valtozok .active").addClass("hidden");
	$("#valtozok .active").removeClass("active");
	$("#valtozok div").first().addClass("active");
	$("#valtozok div").first().removeClass("hidden");
	$("#tombok .active").addClass("hidden");
	$("#tombok .active").removeClass("active");
	$("#tombok div").first().addClass("active");
	$("#tombok div").first().removeClass("hidden");
	barValtoztatasa();
	szovegValtoztatas()
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
}

function osszegStart(){
	fuggvenyElottiInit();
	
	if(tombEllenorzes($("#bemenet").val())) {
		var t = tombAtalakitas($("#bemenet").val().replace(" ","").split(","));
		osszegzes(t);
		$("#eredmenyek").removeClass("hidden");
		$("#hibasbemenet").addClass("hidden");
	}
	else {
		$("#eredmenyek").addClass("hidden");
		$("#hibasbemenet").removeClass("hidden");
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
	else {
		$("#eredmenyek").addClass("hidden");
		$("#hibasbemenet").removeClass("hidden");
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
	else {
		$("#eredmenyek").addClass("hidden");
		$("#hibasbemenet").removeClass("hidden");
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
	else {
		$("#eredmenyek").addClass("hidden");
		$("#hibasbemenet").removeClass("hidden");
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
		}
		else {
			
		}
	}
	else {
		$("#eredmenyek").addClass("hidden");
		$("#hibasbemenet").removeClass("hidden");
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
	else {
		$("#eredmenyek").addClass("hidden");
		$("#hibasbemenet").removeClass("hidden");
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
	else {
		$("#eredmenyek").addClass("hidden");
		$("#hibasbemenet").removeClass("hidden");
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
	else {
		$("#eredmenyek").addClass("hidden");
		$("#hibasbemenet").removeClass("hidden");
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
	else {
		$("#eredmenyek").addClass("hidden");
		$("#hibasbemenet").removeClass("hidden");
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
	else {
		$("#eredmenyek").addClass("hidden");
		$("#hibasbemenet").removeClass("hidden");
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
	else {
		$("#eredmenyek").addClass("hidden");
		$("#hibasbemenet").removeClass("hidden");
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
	else {
		$("#eredmenyek").addClass("hidden");
		$("#hibasbemenet").removeClass("hidden");
	}
}

function osszefesulesesRendezesStart() {
	fuggvenyElottiInit();
	
	if(tombEllenorzes($("#bemenet").val())) {
		var t = tombAtalakitas($("#bemenet").val().replace(" ","").split(","));
		osszefesulesesRendezes(t);
		$("#eredmenyek").removeClass("hidden");
		$("#hibasbemenet").addClass("hidden");
		elsoLepesMegjelenitese();
		barValtoztatasa();
		szovegValtoztatas();
		play();
	}
	else {
		$("#eredmenyek").addClass("hidden");
		$("#hibasbemenet").removeClass("hidden");
	}
}