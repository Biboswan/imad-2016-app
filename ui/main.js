
var counter=0;
var button=document.getElementById('press');
button.onclick=function()
{
    counter=counter+1;
    document.getElementById('count').innerHTML=counter.toString();
};
