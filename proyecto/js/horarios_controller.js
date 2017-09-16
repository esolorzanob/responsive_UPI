

function registrarHorario() {
    var horario = {
        metodo: "insert",
        nombre: $('#nombre').val(),
    }
    $.ajax({
        url: "../php/horario.php",
        method: "POST",
        data: horario,
        error: function (xhr) {
            console.log(xhr.statusText);
        },
        success: function (horario_response) {
                if (horario_response == "Exito") {
                    $('#mensaje').text("Horario registrada con éxito!");
                } else {
                    $('#mensaje').text("Error al registrar horario");
                }
            }
    });
    return false;
}

function listarHorarios() {
    var horario = {
        metodo: "selectAll",
    }
    $.ajax({
        url: "../php/horario.php",
        method: "POST",
        data: horario,
        error: function (xhr) {
            console.log(xhr.statusText);
        },
        success: function (horario_response) {
            var horarios = JSON.parse(horario_response);
            horarios.map(function (horario) {
                var fila = document.createElement("tr");
                //nombre
                var nombre = document.createElement("td");
                $(nombre).text(horario.nombre);
                $(fila).append(nombre);
                
                //editar
                var editar = document.createElement("td");
                $(editar).html("<a href=\"editarHorarios.html?" + horario.idhorarios + "\"><i class=\"fa fa-lg fa-pencil-square-o verde\" aria-hidden=\"true\"></i></a>");
                $(editar).addClass("botonTabla");
                $(fila).append(editar);
                //borrar
                var borrar = document.createElement("td");
                $(borrar).html("<i class=\"fa fa-lg fa-trash-o rojo\" aria-hidden=\"true\"></i>");
                $(borrar).addClass("botonTabla");
                $(fila).append(borrar);
                //pegar la fila a la tabla
                $('#listaHorarios').append(fila);
            });
        }
    });
    return false;
}

function traerID(idHorario) {
    var horario = {
        metodo: "selectID",
        idhorarios: idHorario
    }
    $.ajax({
        url: "../php/horario.php",
        method: "POST",
        data: horario,
        error: function (xhr) {
            console.log(xhr.statusText);
        },
        success: function (horario_response) {
            var horario = JSON.parse(horario_response);
            $('#nombre').val(horario.nombre);
            $('#idhorarios').val(horario.idhorarios);
        }
    });
    return false;
}

function editar() {
    var horario = {
        metodo: "update",
        nombre: $('#nombre').val(),
        idhorarios: $('#idhorarios').val()
    }
   
    $.ajax({
        url: "../php/horario.php",
        method: "POST",
        data: horario,
        error: function (xhr) {
            console.log(xhr.statusText);
        },
        success: function (horario_response) {
            if (horario_response == "Exito") {
                $('#mensaje').text("horario editada con éxito!");
            } else {
                $('#mensaje').text("Error al editar horario");
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