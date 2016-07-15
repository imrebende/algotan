//Kivesz egy elemet a veremből
function verembol() {
	$("#kivettErtek").val($("#vE tr:first-of-type td").text());
	$("#vE tr").first().remove();
	$("#hiba").text("");
		
	if($("#vE tr").length === 0){
		$("#hiba").text("Nincs több elem");
		$(".veremNyil").addClass("hidden");
	}
}

//Betesz egy elemet a verembe (tetejére)
function verembe() {
	$("#vE").prepend("<tr><td>" + $("#betettErtek").val() + "</td></tr>");
	$(".veremNyil").removeClass("hidden");
}

//Megnézi a veremből lévő legfelső elemet
function teto() {
	$("#kivettErtek").val($("#vE tr:first-of-type").val());
}

//Megnézi, hogy üres-e a verem
function urese() {
	//if(){}
}