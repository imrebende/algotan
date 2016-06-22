//Kivesz egy elemet a veremből
function verembol() {
	if($("#vE tr").length === 0){
		$("#hiba").text("Nincs több elem");
	}
	else {
		$("#kivettErtek").val($("#vE tr:first-of-type td").text());
		$("#vE tr").first().remove();
		$("#hiba").text("");
	}
}

//Betesz egy elemet a verembe (tetejére)
function verembe() {
	$("<tr><td>" + $("#betettErtek").val() + "</td></tr>").insertBefore("#vE tr:first-of-type");
}

//Megnézi a veremből lévő legfelső elemet
function teto() {
	$("#kivettErtek").val($("#vE tr:first-of-type").val());
}

//Megnézi, hogy üres-e a verem
function urese() {
	//if(){}
}