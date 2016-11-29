document.getElementById('commonpart').innerHTML=`<div>
            <ul class="list-inline">
       <li><img id='bibo' src="/ui/me1" class="fram img-medium"/></li>
       <li style="float:right"><div style="width:90px;height:40px;background-color:rgba(221, 221, 221, 0.82)" id="battery-box">
            <div id="battery" style="background-color:#607D8B;height:40px">       
            </div>
            </div></li>
            </ul>
        </div>
            <nav class="navbar navbar-inverse">
            <div class="container-fluid">
            <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
            <span class="icon-bar"></span>                        
            </button>
            <a class="navbar-brand" href="#">Menu</a>
            </div>
           <div class="collapse navbar-collapse" id="myNavbar">
           <ul class="nav navbar-nav">
  <li class="active"><a href="/ui/home">Home</a></li>
   <li><a href="/ui/Info">Acknowled..</a></li>
  <li><a href="/ui/A1">Ambitions</a></li>
   <li class="dropdown">
    <a class= "dropdown-toggle" data-toggle="dropdown">PresentWherabouts
    <span class="caret"></span></a>
    <ul class="dropdown-menu">
      <li><a href="/ui/A2">Durga Puja</a></li>
      <li><a href="/ui/cs-uni">CSE-United</a></li>
      </ul>
</li>
</ul>
<ul class="nav navbar-nav navbar-right">
<li id="create_acc"></li>
<li id="log"></li>
<li id="logout"></li>
<li id="user_icon"></li>
</ul>
</div>
</div>
</nav>
<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">
   <div class="modal-content">
       <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Login to comment/like/much more</h4>
      </div>
      <div class="modal-body">
          <form>
          <input id="username" type="text"  placeholder="username">
          <input id="password" type="password" placeholder="password">
          </form>
      </div>
      <div class="modal-footer center">
        <button id="login-btn" class="btn btn-success">Login</button>
      </div>
    </div>
  </div>
</div>`;
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
      var status='';
    if(battery.charging)
    { status='charging';}
    else{status='discharging';}
 $('#battery-box').attr('data-original-title',status);
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
$(document).ready(function(){
$('#battery-box').tooltip({title:status,placement:"bottom"});
});
function battstatus()
{
    navigator.getBattery().then(function(battery)
    {
        var batt=document.getElementById('battery');
        batt.style.width=battery.level*90+'px';
        batt.innerHTML=Math.round(battery.level*100)+'%';
});
}

var interval=setInterval(battstatus,1000);
 var path=window.location.pathname;
var create_accHTML='<a href="#" class="btn btn-info" onclick=window.open("http://biboswan.imad.hasura-app.io/ui/acc-form")>Create Account</a>';
var loginHTML='<a data-toggle="modal" data-target="#myModal" class="btn btn-info"><span class="glyphicon glyphicon-log-in"></span>Login</a>';
var logoutHTML='<a class="btn btn-info" onclick=Logout()><span class="glyphicon glyphicon-log-out"></span>Logout</a>';
var commHTML =`<textarea id="comment_text" rows="5" cols="80" placeholder="Enter your comment here..." style="background:linear-gradient(to right, rgb(194, 230, 234)63%, grey)"></textarea>
	        <br/>`;
	        var create_acc=  document.getElementById('create_acc');
            var log=document.getElementById('log');
            var logout=document.getElementById('logout');
            var user_icon=document.getElementById('user_icon');
            document.getElementById('comm').innerHTML=commHTML;
            var comment_text= document.getElementById('comment_text');
            var combutn =document.getElementById('combutn');
            var submit=document.getElementById('login-btn');
	       
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
    if(path!=="/ui/home"){countlikes();}
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
      create_acc.innerHTML='';
      log .innerHTML='';
      logout.innerHTML=logoutHTML; 
      user_icon.innerHTML='<a href="#"><span class="glyphicon glyphicon-user"></span>Hi '+username+'</a>';
    $("#comment_text").removeAttr('disabled');
     comment_text.style.cursor = "text";
     combutn.innerHTML='<button onclick=commSubmit()>comment</button><br/>';
     if(path!=="/ui/home"){  $("#act-likbutn").removeAttr('disabled');}
     
   
}
function loadUnknownUser()
{
     logout.innerHTML='';
     user_icon.innerHTML='';
     create_acc.innerHTML=create_accHTML;
     log.innerHTML=loginHTML;
     $("#comment_text").attr('disabled','disabled');
     comment_text.style.cursor = "not-allowed";
     combutn.innerHTML='<button>comment</button><br/>';
     submit.innerHTML = 'Login';
    if(path!=="/ui/home"){  $("#act-likbutn").attr('disabled','disabled');}
     
     
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
              document.getElementById('comment_text').value='';
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
                alert(this.responseText);
            }
        }
        
    };
    
    request.open('GET', '/load-comments?path='+window.location.pathname, true);
    request.send(null);
}
function countlikes()
{
     var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200)
            {
                document.getElementById('likebutn').innerHTML=`<button id="act-likbutn" onclick=likeclick() disabled>likes<span id='countlike' class="glyphicon glyphicon-thumbs-up"></span></button>`;;
                 document.getElementById('countlike').innerHTML=' '+request.responseText;
            }
            else{
                alert(this.responseText+' coundnt load likes');
            }
        }
    };
     request.open('GET', '/count-likes?path='+window.location.pathname, true);
    request.send(null);
}
function likeclick()
{
    
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200)
            {
                var countlike=document.getElementById('countlike');
                countlike.innerHTML=toString(Number((countlike.innerHTML).trim())+1);
           }
        else{
              alert(request.responseText+'Like not accepted ,I think u hv liked already!');
            }
         }
    };
     request.open('GET', '/accept-like?path='+window.location.pathname, true);
    request.send(null);
}

    
  loadLogin();
  loadComments();
  
      
    