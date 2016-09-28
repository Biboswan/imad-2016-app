console.log('Loaded!');
var count=0;
var button=document.getElementById('press');
button.oneclick=function()
{
    count=count+1;
    document.getElementById('count').innerHTML=count.toString();
}