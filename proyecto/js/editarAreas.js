window.onload = function () {
    var idArea = window.location.search;
    idArea = idArea.replace("?", "");
    if (idArea) {
        $('#menuAdmin').toggle();
        traerID(idArea);
    } else {
        alert("Usted no tiene permiso para accesar esta página");
        window.location.href = "/";
    }
}