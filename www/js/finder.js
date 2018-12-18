$(document).on("pageshow","#finder",function(event, ui){

    $("#btPerfil").click(function(){
        $.mobile.changePage("perfil.html",{ transition : "fade" });
    });
    $("#liBack").click(function(){
        $.mobile.changePage("inicio.html",{ transition : "fade" });
    });
    var sIdentificador = localStorage.getItem("idUsuario");
    var sOrden="Order By Name";
    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador, sOrdenPhp:sOrden, Mandato:'VerDiamonds'
        },
        url:globalURL,
        method:'POST',
        beforeSend:function(){
            $('.cargando').fadeIn();
        },success:function(respuesta){  
            var aLista = JSON.parse(respuesta);
            localStorage.setItem("Diamonds",JSON.stringify(aLista));
            var aDiamonds = JSON.parse(localStorage.getItem("Diamonds"));
            for (x=0;x<aDiamonds.length;x++){
                $('#listaFinders').append('<h2 style="color: black;">'+aDiamonds[x]['Nombre']+'</h2>');
                $('#listaFinders').append('<img id="'+aDiamonds[x]['IDUsuario']+'" class="sushi-img" src='+aDiamonds[x]['DireccionFoto']+'>');
                $('#listaFinders').append('<button class="icon-heart" id="btMeGusta"'+aDiamonds[x]['IDUsuario']+'> </button> <h3 style="color: black;">'+aDiamonds[x]['Likes']+'</h2><br/><br/>');
                localStorage.setItem("DiamondActivo",x);
                localStorage.setItem("IDiamond",aDiamonds[x]['IDUsuario']);
                if(x==0){
                    return false;
                }
            }
 
            $('#listaFinders').show(100);
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });
    

    $("#btDiamond").click(function(){
        $.mobile.changePage("diamond.html",{ transition : "fade" });
    });


    $("#btOrden").click(function(){
        var sOrden="Order By Name";
        if($("#btOrden").text()=="Order by Name"){
            $("#btOrden").html('<span class="icon-heart"></span> Order by Likes');
            sOrden="Order by Name";
        }else{
            $("#btOrden").text("Order by Name");
            sOrden="Order by Likes";
        }
        $.ajax({
            data:{
                sCodigoWebPhp:sIdentificador, sOrdenPhp:sOrden, Mandato:'VerDiamonds'
            },
            url:globalURL,
            method:'POST',
            beforeSend:function(){
                $('.cargando').fadeIn();
            },success:function(respuesta){  
                var aLista = JSON.parse(respuesta);
                localStorage.setItem("Diamonds",JSON.stringify(aLista));
                var aDiamonds = JSON.parse(localStorage.getItem("Diamonds"));
                $('#listaFinders').empty;
                for (x=0;x<aDiamonds.length;x++){
                    $('#listaFinders').append('<h2 style="color: black;">'+aDiamonds[x]['Nombre']+'</h2>');
                    $('#listaFinders').append('<img id="'+aDiamonds[x]['IDUsuario']+'" class="sushi-img" src='+aDiamonds[x]['DireccionFoto']+'>');
                    $('#listaFinders').append('<button class="icon-heart" id="btMeGusta"'+aDiamonds[x]['IDUsuario']+'> </button> <h3 style="color: black;">'+aDiamonds[x]['Likes']+'</h2><br/><br/>');
                    localStorage.setItem("DiamondActivo",x);
                    localStorage.setItem("IDiamond",aDiamonds[x]['IDUsuario']);
                    if(x==0){
                        return false;
                    }
                }
     
                $('#listaFinders').show(100);
            },error:function(jqXHR, textStatus, errorThrown){
                ajax_error(jqXHR, textStatus, errorThrown,true);
            }
        });
    });


    $("#btnRestar").click(function(){
        var proximo=0;
        proximo=parseInt(localStorage.getItem("DiamondActivo"))-1;
        var aDiamonds = JSON.parse(localStorage.getItem("Diamonds"));
        for (x=0;x<aDiamonds.length;x++){
            $('#listaFinders').empty();
            if(x==proximo){
                $('#listaFinders').append('<h2 style="color: black;">'+aDiamonds[x]['Nombre']+'</h2>');
                $('#listaFinders').append('<img id="'+aDiamonds[x]['IDUsuario']+'" class="sushi-img" src='+aDiamonds[x]['DireccionFoto']+'>');
                $('#listaFinders').append('<button class="icon-heart" id="btMeGusta"'+aDiamonds[x]['IDUsuario']+'> </button> <h3 style="color: black;">'+aDiamonds[x]['Likes']+'</h2><br/><br/>');
                localStorage.setItem("DiamondActivo",x);
                localStorage.setItem("IDiamond",aDiamonds[x]['IDUsuario']);
                $('#listaFinders').show(100);
                return false;
            }
        }

    });


    $("#btnSumar").click(function(){
        var proximo=0;
        proximo=parseInt(localStorage.getItem("DiamondActivo"))+1;
        var aDiamonds = JSON.parse(localStorage.getItem("Diamonds"));
        for (x=0;x<aDiamonds.length;x++){
            $('#listaFinders').empty();
            if(x==proximo){
                $('#listaFinders').append('<h2 style="color: black;">'+aDiamonds[x]['Nombre']+'</h2>');
                $('#listaFinders').append('<img id="'+aDiamonds[x]['IDUsuario']+'" class="sushi-img" src='+aDiamonds[x]['DireccionFoto']+'>');
                $('#listaFinders').append('<button class="icon-heart" id="btMeGusta"'+aDiamonds[x]['IDUsuario']+'> </button> <h3 style="color: black;">'+aDiamonds[x]['Likes']+'</h2><br/><br/>');
                localStorage.setItem("DiamondActivo",x);
                localStorage.setItem("IDiamond",aDiamonds[x]['IDUsuario']);
                $('#listaFinders').show(100);
                return false;
            }
        }

    });
});

