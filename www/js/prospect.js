$(document).on("pageshow","#prospect",function(event, ui){

    $("#btPerfil").click(function(){
        $.mobile.changePage("perfil.html",{ transition : "fade" });
    });
    $("#liCerrar").click(function(){
        $.mobile.changePage("inicio.html",{ transition : "fade" });
    });
    $("#btBio").click(function(){
        $.mobile.changePage("bio.html",{ transition : "fade" });
    });
    var sIdentificador = localStorage.getItem("idUsuario");
    
});

