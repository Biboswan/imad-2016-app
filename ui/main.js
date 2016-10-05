
var button=document.getElementById('press');
button.onclick=function()
{
    var request= new XMLHttpRequest();
     request.open('GET','http://biboswan.imad.hasura-app.io/counter',true);
     request.send(null);
    request.onreadystatechange=function()
    {
        if(request.readyState===XMLHttpRequest.DONE)
        {
        if(request.status===200)
        {
        var counter=request.responseText;
        var span=document.getElementById('count');
        span.innerHTML=counter.toString();
    }
        }
    }

   
}
