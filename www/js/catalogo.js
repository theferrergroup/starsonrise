$(document).on("pageshow","#catalogo",function(event, ui){

    $("#liCerrar").click(function(){
        $.mobile.changePage("perfil.html",{ transition : "fade" });
    });
    
    var sIdentificador = localStorage.getItem("idUsuario");
    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador,Mandato:'Catalogo'
        },
        url:globalURL,
        method:'POST',
        beforeSend:function(){
            $('.cargando').fadeIn();
        },success:function(respuesta){
            if(respuesta=="Undefined Catalogue"){
                $("#hdHeadPanel").text(respuesta);
            }else{
                var aCatalogo = JSON.parse(respuesta);
                var imagen1 = new Image();
                var imagen2 = new Image();
                var imagen3 = new Image();
                var imagen4 = new Image();
                $.each( aCatalogo, function( i, value ) {
                    imagen1.src = value["vcCatalogo1"];
                    imagen1.height=150;
                    localStorage.setItem("Catalogo1",imagen1.src);
                    imagen2.src = value["vcCatalogo2"];
                    imagen2.height=150;
                    localStorage.setItem("Catalogo2",imagen2.src);
                    imagen3.src = value["vcCatalogo3"];
                    imagen3.height=150;
                    localStorage.setItem("Catalogo3",imagen3.src);
                    imagen4.src = value["vcCatalogo4"];
                    imagen4.height=150;
                    localStorage.setItem("Catalogo4",imagen4.src);
                });
                $('#foto1').html(imagen1);
                $('#foto2').html(imagen2);
                $('#foto3').html(imagen3);
                $('#foto4').html(imagen4);
                $("#hdHeadPanel").text("sucessfull");
            }
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });

    $("#subircatalogo").click(function(){
        var inputFileImage = document.getElementById("archivoImagen");
        var file = inputFileImage.files[0];
        var data = new FormData();
        data.append("uploadedfile",file);
        $.ajax({
            url:"http://starsonrise.com/diamond/appmovil/subirimagen.php",
            method:"POST",
            contentType:false,
            data:data,
            processData:false,
            cache:false
            ,success:function(respuesta){
                $("#respuesta").text(respuesta);
                var imagenCargada = new Image();
                imagenCargada.src = "http://starsonrise.com/diamond/img/profiles/"+file.name;
                imagenCargada.height=150;
                switch($("#slcFotoCatlogo").val()){
                    case '1':
                        $('#foto1').html(imagenCargada);
                        $('#foto1').trigger('create');
                        localStorage.setItem("Catalogo1",imagenCargada.src);
                        break;
                    case '2':
                        $('#foto2').html(imagenCargada);
                        $('#foto2').trigger('create');
                        localStorage.setItem("Catalogo2",imagenCargada.src);
                        break;
                    case '3':
                        $('#foto3').html(imagenCargada);
                        $('#foto3').trigger('create');
                        localStorage.setItem("Catalogo3",imagenCargada.src);
                        break;
                    case '4':
                        $('#foto4').html(imagenCargada);
                        $('#foto4').trigger('create');
                        localStorage.setItem("Catalogo4",imagenCargada.src);
                        break;
                }
            },error:function(jqXHR, textStatus, errorThrown){
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });
    });

    $("#grabarcatalogo").click(function(){

        var sFoto = "";
        var sNumFoto=$("#slcFotoCatlogo").val();
        switch($("#slcFotoCatlogo").val()){
            case '1':
                sFoto = localStorage.getItem("Catalogo1");
                break;
            case '2':
                sFoto = localStorage.getItem("Catalogo2");
                break;
            case '3':
                sFoto = localStorage.getItem("Catalogo3");
                break;
            case '4':
                sFoto = localStorage.getItem("Catalogo4");
                break;
        }
        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, sDireccionFotoPhp:sFoto, sNumFotoPhp:sNumFoto, Mandato:'GrabarFotoCatalogo'
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

});

