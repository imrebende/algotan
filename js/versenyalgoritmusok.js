function mohoStart(){
	fuggvenyElottiInit();
	var t = [];
	for(var i = 0; i < 3; i++){
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
	console.log(tomb);
	tomb.sort(function(a, b){return a.veg - b.veg});
	console.log(tomb);
	
	var db = 0;
	var eredmeny = [];
	var utolsoVege = 0;
	for(var i = 0; i < 3; i++){
		if(utolsoVege < tomb[i].kezd){
			utolsoVege = tomb[i].veg - 1;
			eredmeny.push(utolsoVege);
			valtozokKiirasa({nev: "eredmeny", ertek: eredmeny}, "");
		}
	}
	megjelenitesInit();
	console.log(eredmeny);
}