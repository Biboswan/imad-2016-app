function isadder (data)
{
 var request= new XMLHttpRequest();
     
    request.onreadystatechange=function()
    {
        if(request.readyState===XMLHttpRequest.DONE)
        {
        if(request.status===200)
        {
        var counter=request.responseText;
        var content=document.getElementById(data.id)
        content.innerHTML=counter.toString();
        }
        }
    }
   request.open('GET',`http://biboswan.imad.hasura-app.io${data.path}`,true);
    request.send(null);
    return;
}

var objarr={
obj1:{
    id:'c',
    path:'/visitor'
},
obj2:{
    id:'count',
    path:'/counter'
}
};
if(window.location.pathname==='/ui/home')
{
    var button=document.getElementById('press');
    button.onclick=function()
{
    isadder(objarr[obj1]);
    
}
}
 if(window.location.pathname==='/')
 isadder(objarr[obj2]);







       



