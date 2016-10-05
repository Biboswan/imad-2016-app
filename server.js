var express = require('express');
var morgan = require('morgan');
var path = require('path');
var counter =0;

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
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
  app.get('/counter', function (req, res) {
      counter=counter+1;
  res.send(counter.toString());
});
 app.get('/ui/main', function (req, res) {
     res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
var namarr=[];
app.get('/submit-name/:name', function (req, res) {
    var nam =req.params.name;
    namarr.push(nam);
     res.send(JSON.stringify(namarr));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
