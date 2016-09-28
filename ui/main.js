
var counter=0;
var button=document.getElementById('press');
button.oneclick=function()
{
    counter=counter+1;
    document.getElementById('count').innerHTML=counter.toString();
};
