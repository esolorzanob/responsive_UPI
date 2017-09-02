function login() {
    var user = {
        metodo: "select",
        username: $('#username').val(),
        password: $('#password').val()
    }
    $.ajax({
        url: "../php/usuario.php",
        method: "POST",
        data: user,
        error: function (xhr) {
            console.log(xhr.statusText);
        },
        success: function (usuario_response) {
            if (usuario_response == "Error") {
                $('#mensaje').text("El usuario digitado no existe");
            } else {
                var usuarioGuardado = JSON.parse(usuario_response);
                if (usuarioGuardado.password == user.password) {
                    sessionStorage.setItem("usuarioLogueado", usuario_response);
                    window.location.href = "principal.html";
                } else {
                    $('#mensaje').text("El password es incorrecto");
                }
            }
        }
    });
    return false;
}

function registrar() {
    var user = {
        metodo: "insert",
        nombre: $('#nombre').val(),
        apellidos: $('#apellidos').val(),
        telefono: $('#telefono').val(),
        correo: $('#correo').val(),
        provincia: $('#provincia').val(),
        genero: $('input[name="gen"]:checked').val(),
        username: $('#username').val(),
        password: $('#password').val(),
        rol: "1"
    }
    console.log(JSON.stringify(user));
    $.ajax({
        url: "../php/usuario.php",
        method: "POST",
        data: user,
        error: function (xhr) {
            console.log(xhr.statusText);
        },
        success: function (usuario_response) {
            var usuarioLogueado = sessionStorage.getItem('usuarioLogueado');
            if(usuarioLogueado){
                if (usuario_response == "Exito") {
                    $('#mensaje').text("Usuario registrado con éxito!");
                } else {
                    $('#mensaje').text("Error al registrar usuario");
                }
            }else{
                alert("Se ha registrado con éxito!");
                window.location.href = "/";
            }
            
        }
    });
    return false;
}

function listarUsuarios() {
    var user = {
        metodo: "selectAll",
    }
    $.ajax({
        url: "../php/usuario.php",
        method: "POST",
        data: user,
        error: function (xhr) {
            console.log(xhr.statusText);
        },
        success: function (usuario_response) {
            var usuarios = JSON.parse(usuario_response);
            usuarios.map(function (usuario) {
                var fila = document.createElement("tr");
                //nombre
                var nombre = document.createElement("td");
                $(nombre).text(usuario.nombre);
                $(fila).append(nombre);
                //apellidos
                var apellidos = document.createElement("td");
                $(apellidos).text(usuario.apellidos);
                $(fila).append(apellidos);
                //correo
                var correo = document.createElement("td");
                $(correo).text(usuario.correo);
                $(fila).append(correo);
                //telefono
                var telefono = document.createElement("td");
                $(telefono).text(usuario.telefono);
                $(fila).append(telefono);
                //provincia
                var provincia = document.createElement("td");
                $(provincia).text(usuario.provincia);
                $(fila).append(provincia);
                //genero
                var genero = document.createElement("td");
                $(genero).text(usuario.genero);
                $(fila).append(genero);
                //editar
                var editar = document.createElement("td");
                $(editar).html("<a href=\"editarUsuario.html?" + usuario.idusuarios + "\"><i class=\"fa fa-lg fa-pencil-square-o verde\" aria-hidden=\"true\"></i></a>");
                $(editar).addClass("botonTabla");
                $(fila).append(editar);
                //borrar
                var borrar = document.createElement("td");
                $(borrar).html("<i class=\"fa fa-lg fa-trash-o rojo\" aria-hidden=\"true\"></i>");
                $(borrar).addClass("botonTabla");
                $(fila).append(borrar);
                //pegar la fila a la tabla
                $('#listaUsuario').append(fila);
            });
        }
    });
    return false;
}

function traerID(idUsuario) {
    var user = {
        metodo: "selectID",
        idusuarios: idUsuario
    }
    $.ajax({
        url: "../php/usuario.php",
        method: "POST",
        data: user,
        error: function (xhr) {
            console.log(xhr.statusText);
        },
        success: function (usuario_response) {
            var usuario = JSON.parse(usuario_response);
            $('#nombre').val(usuario.nombre);
            $('#apellidos').val(usuario.apellidos);
            $('#telefono').val(usuario.telefono);
            $('#correo').val(usuario.correo);
            $('#provincia').val(usuario.provincia);
            $('input[value="'+usuario.genero+'"]').prop("checked",true);
            $('#username').val(usuario.username);
            $('#password').val(usuario.password);
            $('#idusuarios').val(usuario.idusuarios);
        }
    });
    return false;
}

function editar() {
    var user = {
        metodo: "update",
        nombre: $('#nombre').val(),
        apellidos: $('#apellidos').val(),
        telefono: $('#telefono').val(),
        correo: $('#correo').val(),
        provincia: $('#provincia').val(),
        genero: $('input[name="gen"]:checked').val(),
        username: $('#username').val(),
        password: $('#password').val(),
        idusuarios: $('#idusuarios').val(),
        rol: "1"
    }
    console.log(JSON.stringify(user));
    $.ajax({
        url: "../php/usuario.php",
        method: "POST",
        data: user,
        error: function (xhr) {
            console.log(xhr.statusText);
        },
        success: function (usuario_response) {
            if (usuario_response == "Exito") {
                $('#mensaje').text("Usuario editado con éxito!");
            } else {
                $('#mensaje').text("Error al editar usuario");
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