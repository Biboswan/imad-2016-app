
var path=window.location.pathname;
if(path==='/ui/home')
{
    var button=document.getElementById('press');
    button.onclick=function()
{
    isadder('count');
    
}
}

isadder('c'); 



function isadder (id)
{
     request.open('GET',`http://biboswan.imad.hasura-app.io${path}`,true);
 var request= new XMLHttpRequest();
     
    request.onreadystatechange=function()
    {
        if(request.readyState===XMLHttpRequest.DONE)
        {
        if(request.status===200)
        {
        var counter=request.responseText;
        document.getElementById(id).innerHTML=counter.toString();
        }
        }
    }
   
    request.send(null);
};

       



