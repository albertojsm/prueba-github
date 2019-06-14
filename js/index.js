
$(function(){

    fillComboBox();    

    //muestra por pantalla los iconos de los items en el inventario de un personaje
    $("#inventarioPersonaje").click(function(){
        let nombrePersonaje=document.getElementById("personajesComboBox").value;
        nombrePersonaje= nombrePersonaje.split('_').join(' ');
        let api = $("#numeroApi").val();
        let arrayItemsPersonaje;
        let arrayItemsIcon;
       
        $.ajax({            
            url : "https://api.guildwars2.com/v2/characters/" + nombrePersonaje + "?access_token=" + api ,
            method : "GET" ,
            dataType: "json",
            success : function(response){               
                arrayItemsPersonaje=obtenerItems(response);
                arrayItemsIcon=agregarDatosItems(arrayItemsPersonaje);                
                crearEstructuraInventario(arrayItemsIcon);                
            }
        });
    });

    

    //rellena la combo box con los nombres de los personajes de la cuenta con la api asociada
    function fillComboBox(){
        var api = $("#numeroApi").val();

        $.ajax({            
            url : "https://api.guildwars2.com/v2/characters?access_token=" + api ,
            method : "GET" ,
            data : {api},
            dataType: "json",
            success : function(response){                             
                var comboBoxPersonajes="<select id='personajesComboBox' class='float-right' onchange='obtenerNombre();'>";               
                for(var key in response){                
                   var personaje=response[key];
                   var personajeSinEspacios = personaje.split(' ').join('_');
                   comboBoxPersonajes +=    "<option value= " + personajeSinEspacios + ">" 
                                            + personaje + "</option>";                   
                } 
                personaje +="</select>";                
                $("#personajesDiv").append(comboBoxPersonajes);               
            }            
        });
    }    
    $("#botonPersonaje").click(function(){
        console.log(datosCompletosPersonajes);
    });
});

//obtengo nombre del personaje de la combo box
function obtenerNombre(){
    console.log(document.getElementById("personajesComboBox").value);
}

////INVENTARIO INVENTARIO INVENTARIO INVENTARIO INVENTARIO INVENTARIO INVENTARIO INVENTARIO INVENTARIO 

//le paso el json con las bolsas y me devuelve array con items
function obtenerItems(response){

    let bagData=response.bags;        
    let items=[];
    let string ="{";
       

    //console.log(bagData);
    for(var key in bagData){
        string+="'" + key + "' : ";
        for(var key2 in bagData[key].inventory){
            string+="[";
            if(bagData[key].inventory[key2]==null){               
                string+="{id:null,count:null,icon:null},";
            }else{               
                var id=bagData[key].inventory[key2].id;
                var count=bagData[key].inventory[key2].count;
                var icon="";
                string+="{id:" + id + ",count:" + count + ",icon:" + icon +"},";
            }
            
        }
        string+="}]";
        items.push(string);
        string="{";
    }
    //console.log(items);
    return items;
}

//crea la estructura para el inventario del personaje
function crearEstructuraInventario(arrayDatosItems){    
    
    for(var key in arrayDatosItems){
        for(var key2 in arrayDatosItems[key]){     
        }            
    }    
}

//obtengo todos los datos referentes a los items y los agrego al array arrayIds
function agregarDatosItems(array){

    let stringIds="";
    let condicionParada=0;
    console.log(array);
    arrayIds=JSON.parse(array);
    
    console.log(arrayIds);
   
    /*for(var key in arrayIds){        
            stringIds+=arrayIds[key].id + ",";
            condicionParada++;                      
            if(condicionParada==arrayIds[key].length){
                condicionParada=0;
                $.ajax({
                    url: "https://api.guildwars2.com/v2/items?ids=" + stringIds ,
                    method : "GET" ,
                    success : function(response){                       
                        for(var key in arrayIds){                                 
                                for(var key2 in response){                               
                                        if(arrayIds[key].id==response[key2].id){                                 
                                            arrayIds[key].icon=response[key2].icon;                                                                                                                     
                                        }                                    
                                }                            
                        }
                    }
                });
                stringIds="";
            }                  
    }*/
    return arrayIds;    
}

////INVENTARIO INVENTARIO INVENTARIO INVENTARIO INVENTARIO INVENTARIO INVENTARIO INVENTARIO INVENTARIO 
