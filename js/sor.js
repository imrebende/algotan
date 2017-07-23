//Kivesz egy elemet a sorból
function sorbol() {
    $("#kivettErtek").val($("#sE td:first-of-type").text());
    $("#sE td").first().remove();
    $("#hiba").text("");

    if ($("#sE td").length === 0) {
        $("#hiba").text("Nincs több elem");
        $(".sorNyil").addClass("hidden");
    }
}

function elso() {
    $("#elsoElem").val($("#sE td:first-of-type").text());
}

//Betesz egy elemet a sorba
function sorba() {
    //Ha az érték nem üres
    if ($("#betettErtek").val() !== "") {
        $("#sE tbody tr").append("<td>" + $("#betettErtek").val() + "</td>");
        $("#betettErtek").val("");
        $("#hiba").text("");
        $(".sorNyil").removeClass("hidden");
    }
}