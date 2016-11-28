             
             var submit=document.getElementById('register');
             submit.onclick =function(){
             var request = new XMLHttpRequest();
            request.onreadystatechange = function () {
            if (request.readyState === XMLHttpRequest.DONE) {
          
              if (request.status === 200) {
                  alert('Account created successfully');
                  submit.value = 'Submited!';
                  alert(request.responseText);
              } else {
                  alert('Could not create the account');
                  alert(request.responseText);
                  submit.value = 'Submit';
              }
          }
        };
                 
                  var username = document.getElementById('username').value;
                  var password = document.getElementById('pwd').value;
                  var name = document.getElementById('name').value;
                  var dob = document.getElementById('dob').value;
                  var email = document.getElementById('email').value;
                  var i,sex;
                  for(i=1;i<=3;i++)
                  {
                  sex = document.getElementById('sex'+i);
                  if(sex.checked===true){break;}
                  }
                  //var formdata = new FormData(document.getElementById('acc-form'));
                  request.open('POST', '/create-user', true);
                  request.setRequestHeader('Content-Type', 'application/json');
                  //request.send(formdata);
                  request.send(JSON.stringify({username: username, password: password,name:name,dob:dob,email:email,sex:sex.value}));  
                  submit.value = 'Submiting...';
                   
          };
          document.getElementById('exit').onclick= function(){
              window.close();
          };
         
   



      
      
    
