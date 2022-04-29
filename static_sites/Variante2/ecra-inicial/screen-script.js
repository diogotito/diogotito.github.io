(function () {
    'use strict';
    
    function ligar(idElem, url) {
        var elem = document.getElementById(idElem);
        elem.addEventListener("click", function (e) {
            location.assign(url);
        });
    }
    
    document.addEventListener("DOMContentLoaded", function (e) {
        ligar("interagir",    "../ecra-interagir/index.html");
        ligar("pedir-comida", "../ecra-comida/index.html");
        ligar("social",       "../ecra-social/index.html");
    });
    
}());
