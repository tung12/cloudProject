import React, { Component } from 'react';
import { Alert,Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { MAIN_API } from "../../../service/apiService";
import { Redirect } from "react-router-dom";
class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username:"",
      password:"",
      isLoggined: false,
      isError: false
    }
    this.login = this.login.bind(this);
}



login = () => {
  console.log(this.state.username);
  console.log(this.state.password);
  MAIN_API({
    url: "/login",
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
      console.log(res.headers);
      localStorage.setItem('token', res.headers.authorization);
      this.setState(() => ({
        isLoggined: true
      }))
    }).catch(error => {
      localStorage.clear();
      this.setState(() => ({
        isError: true
      }))
  });
}

enterPressed = (event) =>{
  var code = event.keyCode || event.which;
    if(code === 13) { 
      this.login();
    } 
}


  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    if (this.state.isLoggined || localStorage.getItem('token')) {
        return <Redirect to={from}/>
    }
    const enabled =
          this.state.username.length > 0 &&
          this.state.password.length > 0;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username"
                        onChange={e =>{
                          var newState = Object.assign({},this.state,{
                            username : e.target.value
                          })
                          this.setState(newState);
                        }
                      }
                      onKeyPress={(e)=> this.enterPressed(e)}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password"
                        onChange={e =>{
                          var newState = Object.assign({},this.state,{
                            password : e.target.value
                          })
                          this.setState(newState);
                        }
                        
                      }
                      onKeyPress={(e)=> this.enterPressed(e)}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={() => this.login()} disabled ={!enabled}>Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                      <Alert color="danger" isOpen={this.state.isError}>
        Sai tài khoản hoặc mật khẩu . Vui lòng đăng nhập lại!
      </Alert>
                    
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Button color="primary" className="mt-3" active>Register Now!</Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>

      </div>
    );
  }
}

export default Login;
