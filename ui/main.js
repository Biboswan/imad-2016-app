
var button=document.getElementById('press');
button.onclick=function()
{
    var request= new XMLHttpLRequests();
    request.onreadystatechange=function()
    {
        if(request.readyState===XMLHttpRequests.DONE)
        if(request.status===200)
        var counter=request.responseText;
        var span=document.getElementById('count');
        span.innerHTML=counter.toString();
    };
};
    request.open('GET','http://biboswan.imad.hasura.io/counter',true);
    request.send(null);
    
