//Kivesz egy elemet a sorb�l
function sorbol(){
	if($("#sE td").length === 0){
		$("#hiba").text("Nincs t�bb elem");
	}
	else {
		$("#kivettErtek").val($("#sE td:last-of-type").text());
		$("#sE td").last().remove();
		$("#hiba").text("");
	}
}

//Betesz egy elemet a sorba
function sorba(){
	//Ha az �rt�k nem �res
	if($("#betettErtek").val() !== ""){
		$("<td>" + $("#betettErtek").val() + "</td>").insertAfter("#sE td:last-of-type");
		$("#betettErtek").val("");
	}
}