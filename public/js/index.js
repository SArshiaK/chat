
function signup() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const pname = document.getElementById("pname").value;
    const phone = document.getElementById("phone").value;
    const todo = {
      userName: username,
      password: password,
      profileName: pname,
      phoneNumber: phone,
      
    };
    fetch('http://localhost:3000/api/user/signup', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(response => response.json())
    .then(json => {
        // console.log(json.response._id);
        // document.cookie = "senderId=" + json.response._id + json.response.token;
        document.cookie = json.response.token;
    });
}


function login(){
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const todo = {
    userName: username,
    password: password
  };

  fetch('http://localhost:3000/api/user/login', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(response => response.json())
    .then(json => {
        // console.log(json.response._id);
        // console.log(json.response.token);
        console.log(json)
        
        // document.cookie = "senderId=" + json.response._id + json.response.token;
        document.cookie = json.response.token;
        window.location.href="http://localhost:3000/public/sendmessage.html";
    });

}