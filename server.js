var express = require('express');
var morgan = require('morgan');
var path = require('path');
var app = express();
app.use(morgan('combined'));
var Pool=require('pg').Pool;
const crypto = require('crypto');
var BodyParser=require('body-parser');
app.use(BodyParser.json());
var session =require('express-session');
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30}
}));
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
/*var http = require('http');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');*/


function hashed(input,salt){
    var hash = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512').toString('HEX');
    return ["pbkdf2","10000",salt,hash].join('&');
}

app.post('/create-user',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    var name = req.body.name;
    var dob = req.body.dob;
    var email =req.body.email;
    var sex = req.body.sex;
  if (username.trim()===''||password.trim()===''||email.trim()===''){
    res.status(403).send("Invalid credentials entered");}
    var hashpass=hashed(password,crypto.randomBytes(128).toString('hex'));
    pool.query('INSERT into "Users" (username,password,"full name","D.O.B",emailid,sex) VALUES ($1,$2,$3,$4,$5,$6)',[username,hashpass,name,dob,email,sex],function(err,result){ if (err) {
          res.status(500).send(err.toString());
      } else {
         
     res.send('Now u can login :'+username);
 }
});
});
app.post('/login', function (req, res) {
   var username = req.body.username;
   var password = req.body.password;
   
   pool.query('SELECT * FROM "Users" WHERE username = $1', [username], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          if (result.rows.length === 0) {
              res.status(403).send('username/password is invalid');
          } else {
              // Match the password
              var dbString = result.rows[0].password;
              var salt = dbString.split('&')[2];
              var hashedPassword = hashed(password, salt); // Creating a hash based on the password submitted and the original salt
              if (hashedPassword === dbString) {
                
             req.session.auth = {userId: result.rows[0].id};
                
                res.send('credentials correct!');
                
              } else {
                res.status(403).send('username/password is invalid');
              }
          }
      }
   });
});
app.get('/check-login', function (req, res) {
   if (req.session && req.session.auth && req.session.auth.userId) {
       // Load the user object
       pool.query('SELECT * FROM "Users" WHERE id = $1', [req.session.auth.userId], function (err, result) {
           if (err) {
              res.status(500).send(err.toString());
           } else {
              res.send(result.rows[0].username);    
           }
       });
   } else {
       res.status(400).send('You are not logged in');
   }
});
app.get('/logout', function (req, res) {
   delete req.session.auth;
   res.send('You are now logged out');
});
app.post('/submit-comment', function (req, res) {
    var path = req.body.pathname;
    var date = req.body.date;
    var commtext = req.body.commtext;
    var username='';
    pool.query('SELECT * FROM "Users" WHERE id = $1', [req.session.auth.userId], function (err, result) {
           if (err) {
              res.status(500).send(err.toString());
           } else {
             username=result.rows[0].username; 
             pool.query('INSERT into "'+ path +'"VALUES ($1,$2,$3)',[username,date,commtext],function(err,result){ if (err) {
          res.status(500).send(err.toString());
      } else {
     res.send(username);
           }
       });
 }
});
});
app.get('/load-comments',function (req, res){
    var path=req.query.path;
    pool.query('SELECT * FROM "'+ path +'"',function (err, result) {
             if (err) {
              res.status(500).send(err.toString());
           } else {
               res.send(JSON.stringify(result));
           }
          });
});
app.get('/count-likes',function(req,res){
    var path=req.query.path+'L';
    pool.query('SELECT COUNT (*) FROM "'+ path +'"',function(err,result) {
        if (err) {
              res.status(500).send(err.toString());
           } else {
               res.send((result.rows[0].count).toString());
           }
    });
});
app.get('/accept-like',function(req,res){
    var path=req.query.path +'L';
    var username='';
    console.log(path);
    pool.query('SELECT * FROM "Users" WHERE id = $1', [req.session.auth.userId], function (err, result) {
           if (err) {
              res.status(500).send(err.toString());
           } else {
             username=result.rows[0].username;
    pool.query('INSERT into "'+ path +'" ("username") VALUES ($1)',[username],function(err,result) {
        if (err) {
              res.status(500).send(err.toString());
           } else {
               res.send('sucess');
           }
    });
           }
});
});
app.get('/categorised',function(req,res){
    pool.query('SELECT "Users".username,"Articles".title,"Articles".timestamp,"Articles".content FROM "Users","Articles" WHERE "Articles".category=$1 AND "Articles".author_id="Users".id ORDER BY "Articles".timestamp DESC',[req.query.category],function(err,result) {
        if (err) {
              res.status(500).send(err.toString());
           } else {
              
               res.send(JSON.stringify(result));
           }
    });
});
 


app.post('/art_bysearch',function(req,res){ 
var word=JSON.parse(req.body.words),index=word.length-1,wordlowr=[];
while(index!==-1){
wordlowr.push(word[index--].toLowerCase());}
pool.query('SELECT DISTINCT "Users".username,"Articles".title,"Articles".timestamp,"Articles".content FROM "Users","Articles","articles_tag" WHERE "articles_tag".tag =ANY($1::text[]) AND "articles_tag".article_id="Articles".id AND "Articles".author_id="Users".id ORDER BY "Articles".timestamp DESC',[wordlowr],function(err,result) {
        if (err) {
              res.status(500).send(err.toString());
           } else {
              
               res.send(JSON.stringify(result));
           }
    });
}); 

   app.post('/submit_art', function(req,res){ 
       var title=req.body.title;
       var category=req.body.category;
       var article_text=req.body.article_text;
       var tags=JSON.parse(req.body.tags),index=tags.length-1,tagslowr=[];
       while(index!==-1){
       tagslowr.push(tags[index--].toLowerCase())};
       pool.query('INSERT into "Articles"(author_id,title,content,category,timestamp) VALUES($1,$2,$3,$4,$5) RETURNING id',[req.session.auth.userId,title,article_text,category,current_timestamp],function(err,result) {
        if (err) {
              res.status(500).send(err.toString());
           } else {
               var art_id=result.rows[0].id;
               pool.query('INSERT into "articles_tag" VALUES($1,$2::text[])',[art_id,tagslowr],function(err,result) {
        if (err) {
              res.status(500).send(err.toString());
           } else {
              
               res.send('Article submitted');
           }
               });
           }
       });
       
       
   });
var counter =0,x=0;

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'open.html'));
});
app.get('/logoB', function (req, res) {
  res.sendFile(path.join(__dirname, '', 'logoB.jpg'));
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
  res.sendFile(path.join(__dirname, 'ui', 'blog pic.jpg'));
});
app.get('/ui/Ackn', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Info.html'));
});
app.get('/:img', function (req, res) {
    var img=req.params.img;
  res.sendFile(path.join(__dirname, '', img+'.jpg'));
});
app.get('/ui/cs-uni', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'cs-uni.html'));
});
app.get('/ui/acc-form', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'acc_form.html'));
});

  app.get('/ui/open', function (req, res) {
      res.sendFile(path.join(__dirname, 'ui', 'open.js'));
});

 app.get('/ui/acc', function (req, res) {
     res.sendFile(path.join(__dirname, 'ui', 'acc.js'));
});
app.get('/ui/main', function (req, res) {
     res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/home', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));});
  app.get('/ui/p1', function (req, res) {
     res.sendFile(path.join(__dirname, 'ui','p1.png'));});
     
     app.get('/ui/articlescpt',function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'articles.js'));});
  
 app.get('/ui/articles',function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Articles.html'));});
  app.get('/bpln_pic',function (req, res) {
  res.sendFile(path.join(__dirname, '', 'bpln_pic.png'));});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});