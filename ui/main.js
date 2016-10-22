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
     request.open('GET',`http://biboswan.imad.hasura-app.io/visitor`,true);
      request.send(null);
       var button=document.getElementById('press');
    button.onclick=function()
{
     request= new XMLHttpRequest();
    request.onreadystatechange=function()
    {
        if(request.readyState===XMLHttpRequest.DONE)
        {
        if(request.status===200)
        {
         counter=request.responseText;
         content=document.getElementById('count')
         content.innerHTML=counter.toString();
        }
        }
    }
   request.open('GET',`http://biboswan.imad.hasura-app.io/counter`,true);
    request.send(null);
    }
    draw=function()
    {
        ellipse(mousex,mousey,3,3);
    }
        
    

 


   
 






       



