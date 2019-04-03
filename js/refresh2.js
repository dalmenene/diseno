

var map; // creamos variables
    var pickini;
    var pickend;
    var marker;
    var coordenadas;
    var circulo;
    var miref=[];
    var coorhist;
    var coorhist1 = [];
    var limsup;
    var rectangle;
    var infoWindow;
    var lat;
    var lon;
    var datet = [];
    var markers2 = []; 
    var sw=0;
    var inicio;
    var fin;
var L;
var startDate;
var endDate;
$(function() {
  $('input[name="datetimes"]').daterangepicker({
    timePicker: true,
    "timePicker24Hour": true,
    startDate: moment().startOf('hour'),
    endDate: moment().startOf('hour').add(32, 'hour'),
    "drops": "up",    
    locale: {
      format: 'M/DD hh:mm A'
    }
  }, );
  
});






function cent(){
     
    if (sw==1){
        var drp = $('#data').data('daterangepicker');
        
        startDate=drp.startDate._d.toISOString();
        
        endDate= drp.endDate._d.toISOString();
       
        
         
          
             
    
              inicio = startDate.replace("T", " ");
              fin = endDate.replace("T"," ");
               inicio = inicio.replace(".000Z", "");
              fin = fin.replace(".000Z","");
              console.log(inicio);
          
       
           var dat = inicio + ":" + fin;
          
           
        
           
               var return_first = function(){
                         var tmp = null;
                         $.ajax({
                           'async': false,
                           'type': "POST",
                           'global': false,
                           'dataType': 'html',
                           'url': "data2.php",
                           'data' : { desde : inicio, hasta : fin },
                           'success': function (data) {
                            tmp = data;
                    }
            });
                return tmp;
                   
            }();
                  
             
                
                    var polylinePoints = [
            
         ];
         
         var polylineOptions = {
               color: 'blue',
               weight: 6,
               opacity: 0.9
             };
                   
                   
                coorhist = return_first.split("\n");
                limsup = coorhist.length - 1;
                for(var k = 0; k < coorhist.length - 1; k++) {
                coorhist1 = coorhist[k].split(" ");
                    lat = coorhist1[0];
                   lon = coorhist1[1];
                    console.log(lat+" "+lon);
                   polylinePoints.push([lat,lon]);
                
                    if(k==0 ){
                        map.removeLayer(t1);
                     t1=L.marker([lat, lon],{draggable: true}).addTo(map); 
                        map.setView([lat,lon], map.getZoom());
                       }
                    if(k == (coorhist.length - 2)){
                        map.removeLayer(t2);
                      t2=L.marker([lat, lon],{draggable: true}).addTo(map); 
                       }
                     
                }
                        //
                   map.removeLayer(polyline);
                    polyline = new L.Polyline(polylinePoints, polylineOptions);                               

    map.addLayer(polyline);  
                   
              
               
               
               
           
} 
               
               else{ sw=1;}
               }
 var map;
var t1;
var t2;
var polyline;
 function initMap() { // Inicio el mapa con los recursos que me da api

   map = L.map('map').
     setView([11, 72],
     15);
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
maxZoom: 20
}).addTo(map);
     L.control.scale().addTo(map);
    t1= L.marker([50, 21],{draggable: true}).addTo(map);
     t2= L.marker([50, 21],{draggable: true}).addTo(map);
    
  map.attributionControl.setPrefix(''); // Don't show the 'Powered by Leaflet' text.

         //Define an array of Latlng objects (points along the line)
   

   var polylinePoints = [
            
         ];
         
         var polylineOptions = {
               color: 'blue',
               weight: 6,
               opacity: 0.9
             };
                
polyline = new L.Polyline(polylinePoints, polylineOptions);                               

    map.addLayer(polyline);       
    
    }




