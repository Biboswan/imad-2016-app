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
  <li><a href="/ui/A1">Ambitions</a></li>
   <li class="dropdown">
    <a class= "dropdown-toggle" data-toggle="dropdown">PresentWherabouts
    <span class="caret"></span></a>
    <ul class="dropdown-menu">
      <li><a href="/ui/A2">Durga Puja</a></li>
      <li><a href="/ui/cs-uni">CSE-United</a></li>
      </ul>
</li>
<li><a href="/ui/Artcles">Articles</a></li>
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
var cols="80";
if(window.innerWidth<300){
cols="40";}

var create_accHTML='<a href="#" class="btn btn-info" onclick=window.open("http://biboswan.imad.hasura-app.io/ui/acc-form")>Create Account</a>';
var loginHTML='<a data-toggle="modal" data-target="#myModal" class="btn btn-info"><span class="glyphicon glyphicon-log-in"></span>Login</a>';
var logoutHTML='<a class="btn btn-info" onclick=Logout()><span class="glyphicon glyphicon-log-out"></span>Logout</a>';
var create_acc=  document.getElementById('create_acc');
            var log=document.getElementById('log');
            var logout=document.getElementById('logout');
            var user_icon=document.getElementById('user_icon');
            var submit=document.getElementById('login-btn');
            var add_article=document.getElementById('add_article');

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

/*function myFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";

        }
    }
}*/
function loadLoggedInUser(username)
{
      create_acc.innerHTML='';
      log .innerHTML='';
      logout.innerHTML=logoutHTML; 
      user_icon.innerHTML='<a href="#"><span class="glyphicon glyphicon-user"></span>Hi '+username+'</a>';
      add_article.style.display=block;
}
function loadUnknownUser()
{
     logout.innerHTML='';
     user_icon.innerHTML='';
     create_acc.innerHTML=create_accHTML;
     log.innerHTML=loginHTML;
     submit.innerHTML = 'Login';
     add_article.style.display=none;
     
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
loadLogin();
   document.getElementById('footer').innerHTML=`<div class ="center follow" >
        follow me on
        <a href="https://www.facebook.com/Biboswan" style="margin-top:8px;">
    <img src="http://icons.iconarchive.com/icons/hopstarter/rounded-square/256/Social-Network-Facebook-icon.png" style="height:30px;"/>
    </a>
    </div>`;
    var article_sec= document.getElementById('article_sec');
function categorised()
{
    var cat_art;
     var request = new XMLHttpRequest();
     var category= document.getElementById('category').value;
     request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200)
            { cat_art=JSON.parse(request.responseText); 
               loadarticles(cat_art);
                cat_tags(category);
            }
            else{
                alert(request.responseText+' couldnt load articles');
            }
            }
           };
        request.open('GET', '/categorised?category='+category, true);
        request.send(null);
}
 
function cat_tags(category)
{
    var tags;
        request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200)
            { tags=JSON.parse(request.responseText); }
            else{
                alert(request.responseText+' couldnt load tags');
            }
            }
           };
        request.open('GET', '/cat_tags?category='+category, true);
        request.send(null);
}
function loadarticles(cat_art)
{   var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var length=cat_art.rows.length;
    var temp, Art_indexHTML='',datem,date;
    for(var i=0;i<length;i++)
    {   date =new Date( cat_art.rows[i].timestamp);
        datem=${date.toLocaleDateString('en-US', options))+', '+ $(date.toLocaleTimeString);
        temp=`<h2>${cat_art.rows[i].title}</h2>
        <p>Posted by author:${cat_art.rows[i].username} on<small>${datem}</small></p></br>`
         Art_indexHTML= Art_indexHTML+temp;
    }
    article_sec.innerHTML=Art_indexHTML;
    }
        
 
    
    
    
    
    
    
    
    
    
    
    
    
     