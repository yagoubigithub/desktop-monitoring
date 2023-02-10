
const isAuthenticated = () =>{
    if(typeof window === undefined){
      return false;
    }
    if(localStorage.getItem("jwt")){
     
      const jwt = JSON.parse(localStorage.getItem("jwt"));
      document.addEventListener("readystatechange" ,  ()=>{
        document.getElementById("admin_name").innerText = jwt.user.email
       
      })
      return jwt;
    }else{
      return false;
    }
  }
 
