//Kivesz egy elemet a veremből
function verembol() {
    $("#kivettErtek").val($("#vE tr:first-of-type td").text());
    $("#vE tr").first().remove();
    $("#hiba").text("");

    if ($("#vE tr").length === 0) {
        $("#hiba").text("Nincs több elem");
    }
}

//Betesz egy elemet a verembe (tetejére)
function verembe() {
    if ($("#betettErtek").val() != "") {
        $("#vE").prepend("<tr><td>" + $("#betettErtek").val() + "</td></tr>");
        $("#hiba").text("");
        $("#betettErtek").val("");
    }
}

//Megnézi a veremből lévő legfelső elemet
function teto() {
    $("#teto").val($("#vE tr:first-of-type td").text());
}
