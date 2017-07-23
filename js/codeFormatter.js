$(function () {

    //console.log($("#implementation").text().replace("\t", ""));

    $("#example").append(codeFormatter($("#implementation").text()));

});

/**
 * Kódformázó függvény
 */
function codeFormatter(code) {

    var formattedCode = code;

    //Kulcsszavak
    var cplusplusKeywords = ["int", "double", "for", "if"];

    //Kulcsszavak kiszínezése
    _.each(cplusplusKeywords, function (keyword) {
        console.log(keyword);
        formattedCode = formattedCode.replace(keyword, '<span class="cppKeyword">' + keyword + '</span>');
    });

    //Sortördelések
    formattedCode = '<p class="line">' + formattedCode;
    formattedCode = formattedCode.replace("{", '{</p><p class="line">');

    return formattedCode;
}