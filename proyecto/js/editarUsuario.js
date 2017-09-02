window.onload = function(){
    var idUsuario = window.location.search;
    idUsuario = idUsuario.replace("?","");
    if(idUsuario){
        $('#menuAdmin').toggle();
        traerID(idUsuario);
    }else{
        var usuarioLogueado = sessionStorage.getItem("usuarioLogueado");
        if(usuarioLogueado){
            $('#menuUsuario').toggle();
            usuarioLogueado = JSON.parse(usuarioLogueado);
            traerID(usuarioLogueado.idusuarios);
        }else{
            alert("Usted no tiene permiso para accesar esta página");
            window.location.href = "/";
        }
    }
    
}