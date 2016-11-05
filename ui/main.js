var counter,content,request;
       request= new XMLHttpRequest();
    request.onreadystatechange=function()
    {
        if(request.readyState===XMLHttpRequest.DONE)
        {
        if(request.status===200)
        {
           counter=request.responseText;
           content=document.getElementById('c')
        content.innerHTML=counter.toString();
        }
        }
    }
     request.open('GET',`http://biboswan.imad.hasura-app.io/visited`,true);
      request.send(null);
      
      
      
       navigator.getBattery().then(function(battery) {
         function updateAllBatteryInfo(){
           updateChargeInfo();
           updateLevelInfo();
           updateChargingInfo();
           updateDischargingInfo();
  }
       
  updateAllBatteryInfo();

  battery.addEventListener('chargingchange', function(){
    updateChargeInfo();
  });
  function updateChargeInfo(){
    console.log("Battery charging? "
                + (battery.charging ? "Yes" : "No"));
  }

  battery.addEventListener('levelchange', function(){
    updateLevelInfo();
  });
  function updateLevelInfo(){
    console.log("Battery level: "
                + battery.level * 100 + "%");
  }

  battery.addEventListener('chargingtimechange', function(){
    updateChargingInfo();
  });
  function updateChargingInfo(){
    console.log("Battery charging time: "
                 + battery.chargingTime + " seconds");
}
battery.addEventListener('dischargingtimechange', function(){
    updateDischargingInfo();
  });
  function updateDischargingInfo(){
    console.log("Battery discharging time: "
                 + battery.dischargingTime + " seconds");
  }

})

var battery  = navigator.battery;
var level  = battery.level * 100;
  levelBar = $('.level');
if (battery.charging) {
  levelBar.addClass('charging');
} else if (level > 65) {
  levelBar.addClass('high');
} else if (level >= 35 ) {
  levelBar.addClass('med');
} else {
  levelBar.addClass('low');
}
if (!battery.charging) {
  levelBar.css('width', level + '%');
}



    
    var img=document.getElementById('bibo');
    var marginleft=0;
  function moveRight()
{
	marginleft++;
	img.style.marginLeft=marginleft+'px';
}

img.onclick=function()
{
	setInterval(moveRight,20);
};
        
    

 


   
 






       



