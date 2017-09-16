
function listarTurnos() {
    var horario = {
        metodo: "selectAll"
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
                $('<option>').val(horario.idhorarios).text(horario.nombre).appendTo('#turnos');
            });
        }
    });
    return false;
}

function solicitarParqueo() {
    var usuario = JSON.parse(sessionStorage.getItem('usuarioLogueado'));
    var parqueo = {
        metodo: "solicitar",
        fecha: $('#fecha').val(),
        turno: $('#turnos').val(),
        usuario: usuario.idusuarios,
        area: usuario.rol
    }
    
    $.ajax({
        url: "../php/solicitarParqueos.php",
        method: "POST",
        data: parqueo,
        error: function (xhr) {
            console.log(xhr.statusText);
        },
        success: function (solicitar_response) {
            var master = JSON.parse(solicitar_response);
            var parqueos = master[0];
            var parqueosOcupados = master[1];
            var bandera = true;
            var contador = 0;
            
            while(bandera){
                var ocupado = false;
                parqueosOcupados.map(function(e){
                    console.log(parqueos[contador].idparqueos + " " + e.idparqueos );
                    if(parqueos[contador].idparqueos == e.idparqueos){
                       ocupado = true;
                    }
                });
                if(ocupado){
                    if(contador < parqueos.length){
                        contador++;
                    }else{
                        alert('todo ocupado');
                    }  
                }else{
                    alert("Espacio Vacio" + parqueos[contador].numero);
                    bandera = false;
                }
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