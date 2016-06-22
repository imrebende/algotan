//Kivesz egy elemet a sorból
function sorbol(){
	if($("#sE td").length === 0){
		$("#hiba").text("Nincs több elem");
	}
	else {
		$("#kivettErtek").val($("#sE td:last-of-type").text());
		$("#sE td").last().remove();
		$("#hiba").text("");
	}
}

//Betesz egy elemet a sorba
function sorba(){
	//Ha az érték nem üres
	if($("#betettErtek").val() !== ""){
		$("<td>" + $("#betettErtek").val() + "</td>").insertAfter("#sE td:last-of-type");
		$("#betettErtek").val("");
	}
}