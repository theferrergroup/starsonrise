$(document).on("pageshow","#staff",function(event, ui){

    $("#btPerfil").click(function(){
        $.mobile.changePage("perfil.html",{ transition : "fade" });
    });
    $("#btAtras").click(function(){
        $.mobile.changePage("inicio.html",{ transition : "fade" });
    });
    
    
    $("#btLicencias").click(function(){
        $.mobile.changePage("stafflicense.html",{ transition : "fade" });
    });
    
    /*$.ajax({
        data:{
            sCodigoWebPhp:sIdentificador,Mandato:'Mensajes'
        },
        url:'http://condominioagil.com/appMovil/ajaxService.php',
        method:'POST',
        beforeSend:function(){
            $('.cargando').fadeIn();
        },success:function(respuesta){  
            var aMensajes = JSON.parse(respuesta);
            $.each( aMensajes, function( i, value ) {
                $("#h4Mensaje").text(value['sms_mensaje']);
            });
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });*/
});

