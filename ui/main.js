
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

});
function battstatus()
{
    navigator.getBattery().then(function(battery)
    {
        var batt=document.getElementById('battery');
        batt.style.width=battery.level*70+'px';
        batt.innerHTML=Math.round(battery.level*100)+'%';
});
}
var interval=setInterval(battstatus,1000);
var create_accHTML='<a href="/ui/acc-form" class="btn btn-info">Create Account</a>';
var loginHTML='<a data-toggle="modal" data-target="#myModal" class="btn btn-info">Login</a>';
var logoutHTML='<a class="btn btn-info" onclick=Logout()>Logout</a>';
var submit=document.getElementById('login-btn');
var commHTML =`<textarea id="comment_text" rows="5" cols="100" placeholder="Enter your comment here..."></textarea>
	        <br/>
	        <input type="submit" id="com-sub" value="comment" onclick=commSubmit()/>
	        <br/>`;
          submit.onclick = function(){
            var request2 = new XMLHttpRequest();
        request2.onreadystatechange = function () {
          if (request2.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request2.status === 200) {
                  submit.innerHTML = 'Logged!';
                    loadLoggedInUser(username);
              } else if (request2.status === 403) {
                 alert('Invalid credentials. Try again?');
                  submit.innerHTML = 'Login';
              } else if (request2.status === 500) {
                  alert('Something went wrong on the server');
                  submit.innerHTML = 'Login';
              } else {
                  alert('Something went wrong on the server');
                  submit.innerHTML = 'Login';
              }
          }
        };
                
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        request2.open('POST', '/login', true);
        request2.setRequestHeader('Content-Type', 'application/json');
        request2.send(JSON.stringify({username: username, password: password}));  
        submit.innerHTML = 'Logging in...';
        
};

function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200)
            {
                console.log('checking');
                loadLoggedInUser(this.responseText);
            } else {
                 loadUnknownUser();
            }
        }
        
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}
function loadLoggedInUser(username)
{
    document.getElementById('create_acc').innerHTML='';
    document.getElementById('log').innerHTML='';
    document.getElementById('logout').innerHTML=logoutHTML; 
    document.getElementById('user_icon').innerHTML='<span class="glyphicon glyphicon-user glyphicon-lg">Hi '+username+'</span>';
    document.getElementById('comm').innerHTML=commHTML;
}
function loadUnknownUser()
{
     document.getElementById('logout').innerHTML='';
     document.getElementById('user_icon').innerHTML='';
     document.getElementById('create_acc').innerHTML=create_accHTML;
     document.getElementById('log').innerHTML=loginHTML;
     
}
function Logout()
{
     var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200)
            {
                loadUnknownUser();
            }
        }
    };
    request.open('GET', '/logout', true);
    request.send(null);
    
}
function commSubmit(){
    var text=document.getElementById('comment_text').innerHTML;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200)
            {
                
            }
        }
    };
        request.open('POST', '/submit-comment', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({ pathname:window.location.path,date:"new Date().toDateString()+', '+new Date().toLocaleTimeString()",commtext:text}));
    
}
         
  loadLogin ();
  
      
    