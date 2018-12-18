$(document).on("pageshow","#perfil",function(event, ui){

    var sIdentificador = localStorage.getItem("idUsuario");
    var stipoUsuario = localStorage.getItem("tipoUsuario");

    

    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador,Mandato:'PerfilUsuario'
        },
        url:globalURL,
        method:'POST',
        beforeSend:function(){
            $('.cargando').fadeIn();
        },success:function(respuesta){
            var aPerfil = JSON.parse(respuesta);
            var imagen = new Image();
            $.each( aPerfil, function( i, value ) {
                imagen.src = value["DireccionFoto"];
                imagen.height=100;
                localStorage.setItem("FotoPerfil",imagen.src);
                $("#hdHeadPanel").text(value["Nombre"]);  
            });
            $('#foto').html(imagen);
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });

    $("#subirimagen").click(function(){
        var inputFileImage = document.getElementById("archivoImagen");
        var file = inputFileImage.files[0];
        var data = new FormData();
        data.append("uploadedfile",file);
        $.ajax({
            url:"http://condominioagil.com/appMovil/subirimagen.php",
            method:"POST",
            contentType:false,
            data:data,
            processData:false,
            cache:false
            ,success:function(respuesta){
                $("#respuesta").text(respuesta);
                var imagenCargada = new Image();
                imagenCargada.src = "http://condominioagil.com/diamond/img/profiles/"+file.name;
                imagenCargada.height=100;
                $('#foto').html(imagenCargada);
                $('#foto').trigger('create');
                localStorage.setItem("FotoPerfil",imagenCargada.src);
            },error:function(jqXHR, textStatus, errorThrown){
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });
    });

    $("#grabarcambios").click(function(){

        var sFoto = localStorage.getItem("FotoPerfil");
        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, sDireccionFotoPhp:sFoto, Mandato:'GrabarFotoPerfil'
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

    switch(stipoUsuario){
        case '1':
            $("#liCerrar").click(function(){
                $.mobile.changePage("prospect.html",{ transition : "fade" });
            });
            $("#liPortada").click(function(){
                $.mobile.changePage("portada.html",{ transition : "fade" });
            });
            $("#liCatalogo").click(function(){
                $.mobile.changePage("catalogo.html",{ transition : "fade" });
            });
            $("#liCuenta").click(function(){
                $.mobile.changePage("configcuenta.html",{ transition : "fade" });
            });
            break;
            
        case '2':
            $("#liCerrar").click(function(){
                $.mobile.changePage("finder.html",{ transition : "fade" });
            });
            $("#liCuenta").click(function(){
                $.mobile.changePage("configcuenta.html",{ transition : "fade" });
            });
            break;

        case '3':
            $("#liCerrar").click(function(){
                $.mobile.changePage("staff.html",{ transition : "fade" });
            });
            $("#liCuenta").click(function(){
                $.mobile.changePage("configcuenta.html",{ transition : "fade" });
            });
            $("#liCatalogo").hide();
            $("#liPortada").hide();
            break;
    }

});

