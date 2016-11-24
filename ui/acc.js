
            var submit=document.getElementById('register');
            submit.onclick = function(){
            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {
            if (request.readyState === XMLHttpRequest.DONE) {
          
              if (request.status === 200) {
                  alert('Account created successfully');
                  submit.value = 'Submited!';
              } else {
                  alert('Could not create the account');
              }
          }
        };
                  
                  var username = document.getElementById('username').value;
                  var password = document.getElementById('pwd').value;
                  var name = document.getElementById('name');
                  var dob = document.getElementById('dob');
                  var email = document.getElementById('email');
                  var sex = document.getElementById('sex');
                  request.open('POST', '/create-user', true);
                  request.setRequestHeader('Content-Type', 'application/json');
                  request.send(JSON.stringify({username: username, password: password,name:name,dob:dob,email:email,sex:sex}));  
                  submit.value = 'Submiting...';
    
          };




      
      
    
