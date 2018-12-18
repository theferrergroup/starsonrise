$(document).on("pageshow","#configcuenta",function(event, ui){
    var sIdentificador=localStorage.getItem("idUsuario");
    var sEstatus=localStorage.getItem("iEstatus");

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
            $.each( aPerfil, function( i, value ) {
                $("#tUsuario").val(value["Nombre"]);
                $("#tEmail").val(value["Email"]);
                $("#tUsuario").val(value["Nombre"]);
                $("#tClave1").val(value["Password"]);
                $("#tCiudad").val(value["vcCiudad"]);
                var shtml='';
                switch(value["IDTipo"]){
                    case '1':
                        shtml='<option value="01" selected >Diamond</option><option value="02" >Finder</option><option value="03"  >Staff</option>';
                        break;
                    case '2':
                        shtml='<option value="01" >Diamond</option><option value="02" selected >Finder</option><option value="03"  >Staff</option>';
                        break;
                    case '3':
                        shtml='<option value="01" >Diamond</option><option value="02" >Finder</option><option value="03" selected >Staff</option>';
                        break;
                }
                $("#espaciotipo").html('<select id="slcTipo">'+shtml+'</select>');
                switch(value["IDCategoria"]){
                    case '0':
                        shtml='<option value="01" selected >-----------</option>';
                        break;
                    case '1':
                        shtml='<option value="01" selected >Rubi (Kids and Family)</option>';
                        break;
                    case '2':
                        shtml='<option value="02" selected>Zafiro (Your Pet)</option>';
                        break;
                    case '3':
                        shtml='<option value="03" selected>Designer</option>';
                        break;
                    case '4':
                        shtml='<option value="04" selected>Make Up Artist</option>';
                        break;
                    case '5':
                        shtml='<option value="05" selected>Photographer</option>';
                        break;
                    case '6':
                        shtml='<option value="06" selected>Dress Designer</option>';
                        break;
                }
                $("#espaciotipo").append('<label style="color: black;" >Category</label><select id="slcCategory">'+shtml+'</select>');
                $("#espaciotipo").trigger('create');
                var sEstado=value["vcEstado"];
                $("#slcEstado option[value='"+sEstado+"']").attr("selected",true);
            });
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });

    $("#slcCategory").click(function(){
        $("#slcCategory option").remove();
        $("#slcCategory").append('<option value="00" ">---------</option>');
        $("#slcCategory").append('<option value="01" ">Rubi (Kids and Family)</option>');
        $("#slcCategory").append('<option value="02" ">Zafiro (Your Pet)</option>');
        $("#slcCategory").append('<option value="00" ">Without Category</option>');
        $("#slcCategory").append('<option value="03" ">Designer</option>');
        $("#slcCategory").append('<option value="04" ">Make Up Artist</option>');
        $("#slcCategory").append('<option value="05" ">Photographer</option>');
        $("#slcCategory").append('<option value="06" ">Dress Designer</option>');
    });

    $("#slcTipo").change(function(){
        var sCat=$("#slcTipo").val();
        switch(sCat){
            case '01':
                $("#slcCategory option").remove();
                $("#slcCategory").append('<option value="00" ">---------</option>');
                $("#slcCategory").append('<option value="01" ">Rubi (Kids and Family)</option>');
                $("#slcCategory").append('<option value="02" ">Zafiro (Your Pet)</option>');
                break;
            case '02':
                $("#slcCategory option").remove();
                $("#slcCategory").append('<option value="00" ">---------</option>');
                $("#slcCategory").append('<option value="00" ">Without Category</option>');
                break;
            case '03':
                $("#slcCategory option").remove();
                $("#slcCategory").append('<option value="00" ">---------</option>');
                $("#slcCategory").append('<option value="03" ">Designer</option>');
                $("#slcCategory").append('<option value="04" ">Make Up Artist</option>');
                $("#slcCategory").append('<option value="05" ">Photographer</option>');
                $("#slcCategory").append('<option value="06" ">Dress Designer</option>');
                break;
            default:
                $("#slcCategory option").remove();
        }
    });

    $("#btModificar").click(function(){
        var sUsuario=document.formContacto.tUsuario.value;
        var sClave1=document.formContacto.tClave1.value;
        var sClave2=document.formContacto.tClave2.value;
        var sEmail=document.formContacto.tEmail.value;
        var sCiudad=document.formContacto.tCiudad.value;
        var sTipo=document.formContacto.slcTipo.value;
        var sCategoria=document.formContacto.slcCategory.value;
        var sEstado=document.formContacto.slcEstado.value;
        if (sClave1==sClave2){
            $("#btModificar").html("<span class='icon-hour-glass'></span> Wait for answer");
            $("#btModificar").css("background-color","orange");
            $.ajax({
                data:{
                    sEstadoPhp:sEstado, sCiudadPhp:sCiudad, sCodigoWebPhp:sIdentificador, sEmailPhp:sEmail, sUsuarioPhp:sUsuario, sClavePhp:sClave1, sTipoPhp:sTipo, sCategoriaPhp:sCategoria, Mandato:'RegistrarCuenta'
                },
                url:globalURL,
                method:'POST',
                beforeSend:function(){
                    $('.cargando').fadeIn();
                },success:function(respuesta){  
                    if(respuesta=="A+++"){
                        $("#btModificar").html('<span class="icon-checkmark"></span> Update <span class="icon-happy"></span>');
                        $("#btModificar").css("background-color","green");
                    }else{
                        alert(respuesta);
                        $("#btModificar").html("<span class='icon-sad'></span> try again");
                        $("#btModificar").css("background-color","red");
                    }
                },error:function(jqXHR, textStatus, errorThrown){
                    ajax_error(jqXHR, textStatus, errorThrown,true);
                }
            });
        }else{
            alert("Wrong Data :(");
        }
    });
    $("#btRubi").click(function(){
        $.mobile.changePage("perfilrubi.html",{ transition : "fade" });
    });
    $("#btZafiro").click(function(){
        $.mobile.changePage("perfilzafiro.html",{ transition : "fade" });
    });

    $("#liAtrasConfig").click(function(){
        var sExiste=localStorage.getItem("idUsuario");
        var sTipo=localStorage.getItem("tipoUsuario");
        if(parseInt(sExiste,10)>0){

            switch(sTipo){
                case "1":
                    $.mobile.changePage("perfil.html",{ transition : "fade" });
                    break;
                case "2":
                    $.mobile.changePage("finder.html",{ transition : "fade" });
                    break;
                case "3":
                    $(":mobile-pagecontainer").pagecontainer("change", "staff.html", { transition : "fade", changeHash:true });
                    break;
                default:
                    alert("Wrong Data");
            }
        }else{
           $.mobile.changePage("inicio.html",{ transition : "fade" });
        }        
    });
});
