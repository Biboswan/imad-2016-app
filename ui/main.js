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
function battstatus()
{
    navigator.getBattery().then(function(battery)
    {
        var batt=document.getElementById('battery');
batt.style.width=battery.level*70+'px';
batt.innerHTML=battery.level*100+'%';
})
}
var interval=setInterval(battstatus,1000);

var submit=document.getElementById('register').onclick=function(){
            var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
          
              if (request.status === 200) {
                  alert('Account created successfully');
                  submit.value = 'Submited!';
              } else {
                  alert('Could not create the account');
              }
          }
        };
                  
                  var username = document.getElementById('username').value;
                  var password = document.getElementById('pwd').value;
                  var name = document.getElementById('name');
                  var dob = document.getElementById('dob');
                  var email = document.getElementById('email');
                  var sex = document.getElementById('sex');
                  request.open('POST', '/create-user', true);
                  request.setRequestHeader('Content-Type', 'application/json');
                  request.send(JSON.stringify({username: username, password: password,name:name,dob:dob,email:email,sex:sex}));  
                  submit.value = 'Submiting...';
    
    };

                  
            




      
      
    