
var button=document.getElementById('press');
button.onclick=function()
{
    var request= new XMLHttpRequest();
    request.onreadystatechange=function()
    {
        if(request.readyState===XMLHttpRequest.DONE)
        {
        if(request.status===200)
        {
        var counter=request.responseText;
        var span=document.getElementById('count');
        span.innerHTML=counter.toString();
    };
        };
    };

    request.open('GET','http://biboswan.imad.hasura-app.io/counter',true);
    request.send(null);
};
var Inputnam=document.getElementById('name');
var name=Inputnam.value;
document.getElementById('accept').onclick=function()
{
    var namarr=['name1','name2','name3','name4'];
    var list='';
    for(var i=0;i<namarr.length;i++)
    {
        list+='<li>'+namar[i]+'</li>';
    }
    var ol=document.getElementById('list');
    ol.innerHTML=list;
    
};
