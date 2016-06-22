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