

function registrarArea() {
    var area = {
        metodo: "insert",
        nombre: $('#nombre').val(),
    }
    $.ajax({
        url: "../php/areas.php",
        method: "POST",
        data: area,
        error: function (xhr) {
            console.log(xhr.statusText);
        },
        success: function (area_response) {
                if (area_response == "Exito") {
                    $('#mensaje').text("Area registrada con éxito!");
                } else {
                    $('#mensaje').text("Error al registrar area");
                }
            }
    });
    return false;
}

function listarAreas() {
    var area = {
        metodo: "selectAll",
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
                var fila = document.createElement("tr");
                //nombre
                var nombre = document.createElement("td");
                $(nombre).text(area.nombre);
                $(fila).append(nombre);
                
                //editar
                var editar = document.createElement("td");
                $(editar).html("<a href=\"editarAreas.html?" + area.idareas + "\"><i class=\"fa fa-lg fa-pencil-square-o verde\" aria-hidden=\"true\"></i></a>");
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

function traerID(idArea) {
    var area = {
        metodo: "selectID",
        idareas: idArea
    }
    $.ajax({
        url: "../php/areas.php",
        method: "POST",
        data: area,
        error: function (xhr) {
            console.log(xhr.statusText);
        },
        success: function (area_response) {
            var area = JSON.parse(area_response);
            $('#nombre').val(area.nombre);
            $('#idareas').val(area.idareas);
        }
    });
    return false;
}

function editar() {
    var area = {
        metodo: "update",
        nombre: $('#nombre').val(),
        idareas: $('#idareas').val()
    }
   
    $.ajax({
        url: "../php/areas.php",
        method: "POST",
        data: area,
        error: function (xhr) {
            console.log(xhr.statusText);
        },
        success: function (area_response) {
            if (area_response == "Exito") {
                $('#mensaje').text("Area editada con éxito!");
            } else {
                $('#mensaje').text("Error al editar area");
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