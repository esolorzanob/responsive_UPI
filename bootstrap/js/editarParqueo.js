window.onload = function () {
    var idparqueos = window.location.search;
    idparqueos = idparqueos.replace("?", "");
    if (idparqueos) {
        $('#menuAdmin').toggle();
        listarAreasEnParqueo();
        traerID(idparqueos);
    } else {
        alert("Usted no tiene permiso para accesar esta página");
        window.location.href = "/";
    }
}