const reg_form = document.getElementById("reg_form");
const reg_username = document.getElementById("reg_username");
const reg_password = document.getElementById("reg_password");
const reg_email = document.getElementById("reg_email");
const reg_error = document.getElementById("reg_error");





reg_form.addEventListener("submit" ,  (event)=>{
    event.preventDefault();


    const username = reg_username.value;
    const password = reg_password.value;
    const email = reg_email.value; 


    console.log(username, password, email);
    


    signup({ username, email, password }).then(
        (data) => {
          if (data.error|| data.err) {
            reg_error.innerHTML = data.error|| data.err;
          } else {
            authenticate(data, ()=>{
             
                console.log("success" , data);
            })
          }
        }
      );

});


const authenticate = (data, next) => {

    if(typeof window !== "undefined"){
        localStorage.setItem('jwt',JSON.stringify(data))
        next()

    }
  }



 const signup = (user) => {
    return fetch(`${API}/users/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
    })
      .then((responce) => {
        return responce.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };





//login
const login_form = document.getElementById("login_form");

const login_password = document.getElementById("login_password");
const login_email = document.getElementById("login_email");
const login_error = document.getElementById("login_error");


  login_form.addEventListener("submit" ,  (event)=>{
    event.preventDefault();


    
    const password = login_password.value;
    const email = login_email.value; 


    


    signin({ email, password }).then(
        (data) => {
          if (data.error|| data.err) {
            login_error.innerHTML = data.error|| data.err;
          } else {
            authenticate(data, ()=>{
             
                console.log("success" , data);
            })
          }
        }
      );

});



const signin = (user) => {
    return fetch(`${API}/users/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
    })
      .then((responce) => {
        return responce.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };


  

