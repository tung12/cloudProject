import React, { Component } from 'react';
import { Button, FormGroup, Label, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../login/Login.css";
import { MAIN_API } from "../../service/apiService";
class Register extends Component {

  /**
   *
   */
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
    this.state = {
      username : "",
      password : "",
      repassword: "",
      error:"",
      showModalError:true
    }
  }

  checkLengthPassword = (pass)=> {
      if (pass.length <6){
          
      }
  }

  checkSamePassword = () => {
    var password = this.state.password;
    var repassword =  this.state.repassword;

    if(password == repassword){

    }
  }

  register = () => {
    MAIN_API({
      url: "/register",
      method: "post",
      data: {
        username: this.state.username,
        password: this.state.password
      },
      headers: {
        "Content-Type":"application/json"
      }
    })
      .then(res => {
        console.log(res);
        
        
      }).catch();
  }

  

  render() {
    return (
    <div className="LoginPage">
   
    <FormGroup className="FormLogin" >
         <Label className="NameForm">Register</Label>
         <FormControl type="text" placeholder="Username" onChange={e =>{
           var newState = Object.assign({},this.state,{
             username : e.target.value
           })
           this.setState(newState);
         }}/>
         <FormControl type="password" placeholder="Password"  onChange={e =>{
           var newState = Object.assign({},this.state,{
             password : e.target.value
           })
         }}/>
         <FormControl type="password" placeholder="Re-Password" onChange={e =>{
           var newState = Object.assign({},this.state,{
             repassword : e.target.value
           })
         }}/>
         <Button className="btn" onClick={() => this.register()}>Register</Button>
         <Link to="/login" className="link">Login now?</Link>
     </FormGroup>
        </div>
     
    );
  }
}

export default Register;
