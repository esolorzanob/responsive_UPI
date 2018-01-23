window.onload = function () {
    var idHorario = window.location.search;
    idHorario = idHorario.replace("?", "");
    if (idHorario) {
        $('#menuAdmin').toggle();
        traerID(idHorario);
    } else {
        alert("Usted no tiene permiso para accesar esta página");
        window.location.href = "/";
    }
}