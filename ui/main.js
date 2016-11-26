
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
	        <button onclick=commSubmit()>comment</button>
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
     document.getElementById('comm').innerHTML='';
     
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
    var commtext=xssFilters.inHTMLComment(document.getElementById('comment_text').value);
    console.log('check');
    var date=new Date().toDateString()+', '+new Date().toLocaleTimeString();
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200)
            {
                console.log('check2');
             AppendComment(this.responseText,date,commtext);   
            }
            else
            {
               alert(this.responseText) ;
            }
        }
    };
        request.open('POST', '/submit-comment', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({ pathname:(window.location.pathname),date:date,commtext:commtext}));
    
}
function AppendComment(username,date,commtext)
{
          username=username+' ';
          var commentsHTML=`<div class="media">
           <div class="media-left">
           <div class="media-body">
               <h4 class="media-heading">${username}<small><i>Posted on ${date}</i></small></h4>
               <p>${commtext}</p>
	      </div>
	      </div>
	      </div>`;
	   var commentlist = document.getElementById('comment-list');
	   commentlist.innerHTML=commentsHTML+(commentlist.innerHTML);
      // commentlist.insertBefore(commentsHTML,commentlist.childNodes[2]);
}
function loadComments()
{
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200)
            {
               var oldComments=JSON.parse(request.responseText);
               var Comlength=oldComments.rows.length;
               for(var i=0;i<Comlength;i++)
               {
                AppendComment(oldComments.rows[i].username,oldComments.rows[i].date,oldComments.rows[i].comment);
               }
               
            } else {
                alert('this.responseText');
            }
        }
        
    };
    
    request.open('GET', '/load-comments?path='+window.location.pathname, true);
    request.send(null);
}
    
         
  loadLogin ();
  loadComments();
  
      
    