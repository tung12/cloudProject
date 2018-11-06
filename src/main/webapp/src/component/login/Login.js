import React, { Component } from 'react';
import { Button,Form,InputGroup, FormGroup, Label, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "react-loader";
import { MAIN_API } from "../../service/apiService";
import "./Login.css";
import "../../App.css";
import Register from '../register/Register';
class Login extends Component {
  constructor(props){
    super(props);
    this.state ={
      username :"",
      password :"",
      loader:"loader"
    };
  }


  login = () => {
    
    MAIN_API({
      url: "/login",
      method: "post",
      data: {
        username: this.state.username,
        password: this.state.password
      },
      headers: {
        "Content-Type":"multipart/form-data"
      }
    })
      .then(res => {
        console.log(res);

      }).catch();
  }


  render() {
    return (
        <div className="LoginPage">
        <Loader type="pacman" className={this.state.loader} />
    <FormGroup className="FormLogin" >
          <Label className="NameForm">Login</Label>
         <FormControl type="text" placeholder="Username" onChange={ e => {
            let newState = Object.assign({},this.state,{
              username : e.target.value
            });
            this.setState(newState);
         }}/>
         <FormControl type="password" placeholder="Password" onChange={ e => {
            let newState = Object.assign({},this.state,{
              password : e.target.value
            });
            this.setState(newState);
         }}/>
         <Link to="/register" className="link">You don't have account?</Link>
         <Button className="btn" onClick={() => this.login()}>Login</Button>
     </FormGroup>
        </div>

    );
  }


}


export default Login;
