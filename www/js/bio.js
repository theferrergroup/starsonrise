$(document).on("pageshow","#bio",function(event, ui){

    $("#liBack").click(function(){
        $.mobile.changePage("prospect.html",{ transition : "fade" });
    });
    var sIdentificador = localStorage.getItem("idUsuario");
    $("#btGuardarBio").click(function(){
        var sBio=document.formBio.tBio.value;
        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, sBioPhp:sBio, Mandato:'GuardarBio'
            },
            url:globalURL,
            method:'POST',
            beforeSend:function(){
                $('.cargando').fadeIn();
            },success:function(respuesta){  
                alert(respuesta);
            },error:function(jqXHR, textStatus, errorThrown){
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });
       
    });

    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador, Mandato:'MostrarBio'
        },
        url:'http://condominioagil.com/diamond/appmovil/ajaxService.php',
        method:'POST',
        beforeSend:function(){
            $('.cargando').fadeIn();
        },success:function(respuesta){  
            $("#tBio").text(respuesta);
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown, true);
        }
    });


});

