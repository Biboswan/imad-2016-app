var express = require('express');
var morgan = require('morgan');
var path = require('path');
var app = express();
app.use(morgan('combined'));
var Pool=require('pg').Pool;
var config =
{
    user :'biboswan',
    database:'biboswan',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

var pool = new Pool(config);
app.get('/visited', function (req, res) {
    pool.query('UPDATE "Visited" SET count=count+1 RETURNING count',function(err,result){    
          res.send((result.rows[0].count).toString());
    });
   
});

var counter =0,x=0;

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'open.html'));
});
app.get('/ui/logoB', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'logoB.jpg'));
});
app.get('/ui/A1', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'A1.html'));
});
app.get('/ui/A2', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'A2.html'));
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/me1', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'me1.png'));
});
app.get('/ui/Info', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Info.html'));
});
app.get('/:img', function (req, res) {
    var img=req.params.img;
  res.sendFile(path.join(__dirname, '', img+'.jpg'));
});


  app.get('/counter', function (req, res) {
      counter=counter+1;
      
  res.send(counter.toString());
});

 app.get('/ui/main', function (req, res) {
     res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
var comarr=[];
app.get('/submit-comment', function (req, res) {//submit-name?name=xxxx
    var com =req.query.comment;
    comarr.push(com);
     res.send(JSON.stringify(comarr));
});
app.get('/ui/home', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));})
  app.get('/ui/p1', function (req, res) {
     res.sendFile(path.join(__dirname, 'ui','p1.png'));})

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});