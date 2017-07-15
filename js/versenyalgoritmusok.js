$( function() {
	for(var i = 0; i < 3; i++){
		sliderGenerator($(".slider").length);
	}
} );

function ujSlider(){
	sliderGenerator($(".slider").length);
}

function sliderGenerator(num){
	$("#sliders").append( "<div class='slider-container' id='slider-" + num + "'><div class='sliderCimke'>" + (num + 1) + ". ( <span id='amount" + num + "'></span> ) <button class='btn btn-xs btn-danger' id='sliderTorles" + num + "' onclick='sliderTorles(" + num + ")'><span class='glyphicon glyphicon-remove'></span>&nbsp;</button></div> <div id='slider-range" + num + "' class='slider'></div></div>" );

	$( "#slider-range" + num ).slider({
		range: true,
		min: 0,
		max: 500,
		values: [ 75, 300 ],
		slide: function( event, ui ) {
			$( "#amount" + num ).html( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
		}
	});
	$( "#amount" + num).html( $( "#slider-range" + num ).slider( "values", 0 ) +
		" - " + $( "#slider-range" + num ).slider( "values", 1 ) );
}

function sliderTorles(num){
	$( "#slider-" + num ).remove();
}

function mohoStart(){
	fuggvenyElottiInit();
	var t = [];
	for(var i = 0; i < $(".slider").length; i++){
		var tmp = {};
		tmp.kezd = $( "#slider-range" + i ).slider( "option", "values" )[0];
		tmp.veg = $( "#slider-range" + i ).slider( "option", "values" )[1];
		t.push(tmp);
	}
	moho(t);
	$("#eredmenyek").removeClass("hidden");
	$("#hibasbemenet").addClass("hidden");
}

function moho(tomb){
	tomb.sort(function(a, b){return a.veg - b.veg});
	
	var db = 0;
	var eredmeny = [];
	var utolsoVege = 0;
	for(var i = 0; i < 3; i++){
		if(utolsoVege < tomb[i].kezd){
			utolsoVege = tomb[i].veg - 1;
			eredmeny.push(utolsoVege);
		}
		valtozokKiirasa({nev: "eredmeny", ertek: eredmeny}, "");
	}
	megjelenitesInit();
}