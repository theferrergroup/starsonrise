$(document).on("pageshow","#index",function(event,ui){

    $('#btAccept').click(function(){

        $.mobile.changePage("inicio.html",{ transition : "fade" });
    });
    
   
  
    
});