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
       var battery  = navigator.batter;
        var level  = battery.level * 100;
        levelBar = $('.level');
        console.log($(levelBar));

    
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
        
    

 


   
 






       



