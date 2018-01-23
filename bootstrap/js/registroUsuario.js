window.onload = function(){
    var usuarioLogueado = sessionStorage.getItem("usuarioLogueado");
    if(!usuarioLogueado){
       
    }else{
        usuarioLogueado = JSON.parse(usuarioLogueado);
        if(usuarioLogueado.rol == "0"){
            $('#menuAdmin').toggle();
        }else{
            $('#menuUsuario').toggle();
        }
    }
}