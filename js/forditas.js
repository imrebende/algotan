var relaciosJelek = ["<", "=", ">"];

function feltetel(a, op, b){
	switch(op) {
		case "=":
			return a == b;
			break;
		case ">":
			return a > b;
			break;
		case ">=":
			return a >= b;
			break;
		case "<":
			return a < b;
			break;
		case "<=":
			return a <= b;
			break;
		} 
}

function muvelet(a, op, b){
	switch(op) {
		case "+":
			return a + b;
			break;
		case "-":
			return a - b;
			break;
		case "*":
			return a * b;
			break;
		case "div":
			return a / b;
			break;
		case "mod":
			return a % b;
			break;
		} 
}

/*function ertelmezo(utasitasok){
	
}

function forCiklus(kezdet, veg, lepes, utasitasok){
	for(var i = kezdet; i < veg; i+=lepes){
		ertelmezo(utasitasok);
	}
}

function kiiras(szoveg){
	console.log(szoveg);
}*/