import React, { Component } from 'react';
import { BrowserRouter , Route, Switch } from 'react-router-dom';
import './App.scss';

// Containers
import { DefaultLayout } from './containers';
// Pages
import { Login, Page404, Page500, Register } from './views/Pages';

// import { renderRoutes } from 'react-router-config';
import PrivateRoute from './privateRoute.js'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route  path="/login" name="Login Page" component={Login} />
          <Route  path="/register" name="Register Page" component={Register} />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <PrivateRoute path="/" name="Home" component={DefaultLayout} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
