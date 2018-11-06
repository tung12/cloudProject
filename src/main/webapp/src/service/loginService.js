import Axios from "axios";

export function checkLogin() {
  var token= localStorage.getItem('token');
    alert(token);
    if (typeof(token) != 'undefined' || token != null) {
      console.log("true");
      
       return true;
    } else {
      console.log("false");

       return false;
    }
}
