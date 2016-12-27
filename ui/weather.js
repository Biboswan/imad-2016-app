 var cname,i,api;
            function getapi()
            {
              request= new XMLHttpRequest();
              request.onreadystatechange=function()
            {
             if(request.readyState===XMLHttpRequest.DONE)
           {
             if(request.status===200)
             {
               api=request.responseText;
             }
             else
             {
              alert('dataservice not available presently')
             }
            }
          }
          request.open('GET','/apikey',true);
          request.send(null);
        }
           getapi();
            function getlocationkey(){
            var city=document.getElementById('city');
            var citylist=document.getElementById('citylist');
            citylist.innerHTML='';
            cname = city.value;console.log(cname);
            $.ajax({
             type:"GET",
              url:'http://dataservice.accuweather.com/locations/v1/cities/autocomplete?q='+cname+'&apikey='+api+'&details=true&language=en-us',
          
              dataType: "jsonp",
              success:function parse_response(data){
            console.log('called');
           var length=data.length;
          console.log(data[0].LocalizedName);
      for(i=0;i<length;i++)
      {
      citylist.innerHTML+=`<option value=${data[i].LocalizedName}>${data[i].Key}<option>`;
      }
    }
               });
          
       }      
       function getweather() {
        cname=document.getElementById('city').value;
        var citylist=document.getElementById('citylist');
        length=citylist.options.length;
        for(i=0;i<length;i++){
          if(cname===citylist.options[i].value){
            var key=citylist.options[i].innerHTML;break;
          }
       }
       $.ajax({
             type:"GET",
              url:'http://dataservice.accuweather.com/currentconditions/v1/'+key+'?apikey='+api+'&details=true&language=en-us&getphotos=true',
              dataType: "jsonp",
              success:function parse_response(data){
                document.getElementById('weathericon').src=data[0].Photos[0].PortraitLink;
                var DyoN;
                if(data[0].IsDayTime){
                 DyoN='Day';
                }
               else{
                DyoN='Night'
              }
               document.getElementById('IsDayTime').innerHTML=  'Day/Night        : '+DyoN;
               document.getElementById('WeatherText').innerHTML='Weather          : '+data[0].WeatherText;
               document.getElementById('Temperature.Metric.Value').innerHTML='Temperature      : '+data[0].Temperature.Metric.Value+' C';
               document.getElementById('DewPoint').innerHTML='DewPoint         :'+data[0].DewPoint.Metric.Value+' C';
               document.getElementById('UVIndexText').innerHTML='UVIndex         :'+data[0].UVIndexText;
               document.getElementById('Pressure.Metric.Value').innerHTML='Pressue         :'+data[0].Pressure.Metric.Value+' mb';
               document.getElementById('PressureTendency.LocalizedText').innerHTML='PressureTendency:'+data[0].PressureTendency.LocalizedText;
               document.getElementById('PrecipitationSummary.Past24Hours').innerHTML='Precipitation(Past24Hours):'+data[0].PrecipitationSummary.Past24Hours.Metric.Value+' mm';

              }
             });
          }
