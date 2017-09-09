
function listarAreasEnParqueo() {
    var area = {
        metodo: "selectAll"
    }
    $.ajax({
        url: "../php/areas.php",
        method: "POST",
        data: area,
        error: function (xhr) {
            console.log(xhr.statusText);
        },
        success: function (area_response) {
            var areas = JSON.parse(area_response);
            areas.map(function (area) {
                $('<option>').val(area.idareas).text(area.nombre).appendTo('#listaAreas');
            });
        }
    });
    return false;
}

function registrar() {
    var parqueo = {
        metodo: "insert",
        numero: $('#numero').val(),
        area: $('#listaAreas').val()
    }
    $.ajax({
        url: "../php/parqueos.php",
        method: "POST",
        data: parqueo,
        error: function (xhr) {
            console.log(xhr.statusText);
        },
        success: function (area_response) {
                if (area_response == "Exito") {
                    $('#mensaje').text("Parqueo registrado con éxito!");
                } else {
                    $('#mensaje').text("Error al registrar parqueo");
                }
            }
    });
    return false;
}

function listarParqueos() {
    var area = {
        metodo: "selectAll",
    }
    $.ajax({
        url: "../php/parqueos.php",
        method: "POST",
        data: area,
        error: function (xhr) {
            console.log(xhr.statusText);
        },
        success: function (parqueo_response) {
            var parqueos = JSON.parse(parqueo_response);
            parqueos.map(function (parqueo) {
                var fila = document.createElement("tr");
                //nombre
                var nombre = document.createElement("td");
                $(nombre).text(parqueo.numero);
                $(fila).append(nombre);
                //area
                var area = document.createElement("td");
                $(area).text(parqueo.area);
                $(fila).append(area);
                //editar
                var editar = document.createElement("td");
                $(editar).html("<a href=\"editarParqueo.html?" + parqueo.idparqueos + "\"><i class=\"fa fa-lg fa-pencil-square-o verde\" aria-hidden=\"true\"></i></a>");
                $(editar).addClass("botonTabla");
                $(fila).append(editar);
                //borrar
                var borrar = document.createElement("td");
                $(borrar).html("<i class=\"fa fa-lg fa-trash-o rojo\" aria-hidden=\"true\"></i>");
                $(borrar).addClass("botonTabla");
                $(fila).append(borrar);
                //pegar la fila a la tabla
                $('#listaArea').append(fila);
            });
        }
    });
    return false;
}

function traerID(idparqueos) {
    var parqueo = {
        metodo: "selectID",
        idparqueos: idparqueos
    }
    $.ajax({
        url: "../php/parqueos.php",
        method: "POST",
        data: parqueo,
        error: function (xhr) {
            console.log(xhr.statusText);
        },
        success: function (parqueo_response) {
            var parqueo = JSON.parse(parqueo_response);
            $('#numero').val(parqueo.numero);
            $('#listaAreas').val(parqueo.areas_idAreas);
            $('#idparqueos').val(parqueo.idparqueos);
        }
    });
    return false;
}

function editar() {
    var user = {
        metodo: "update",
        numero: $('#numero').val(),
        area: $('#listaAreas').val(),
        idparqueos: $('#idparqueos').val()
    }
   
    $.ajax({
        url: "../php/parqueos.php",
        method: "POST",
        data: user,
        error: function (xhr) {
            console.log(xhr.statusText);
        },
        success: function (area_response) {
            if (area_response == "Exito") {
                $('#mensaje').text("Parqueo editado con éxito!");
            } else {
                $('#mensaje').text("Error al editar parqueo");
            }
        }
    });
    return false;
}

function salir() {
    sessionStorage.removeItem("usuarioLogueado");
    alert("Gracias por usar la aplicación");
    window.location.href = "/";
}