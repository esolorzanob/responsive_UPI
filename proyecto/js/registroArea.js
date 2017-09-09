window.onload = function(){
    var usuarioLogueado = sessionStorage.getItem("usuarioLogueado");
    if(!usuarioLogueado){
       alert("No tiene permiso para estar aqui");
       window.location.href = "/";
    }else{
        usuarioLogueado = JSON.parse(usuarioLogueado);
        if(usuarioLogueado.rol == "0"){
            $('#menuAdmin').toggle();
        }else{
            alert("No tiene permiso para estar aqui");
            window.location.href = "/";
        }
    }
}