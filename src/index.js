
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import Login from "views/pages/Login.js";
import DPage from "views/pages/DPage.js";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.2.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers';
import reduxThunk from 'redux-thunk';

const store = createStore(
  reducers,
  {},
  applyMiddleware(reduxThunk)
)

const hist = createBrowserHistory();
//5f6943823650d69724b0bff2
ReactDOM.render(
  <Provider store={ store }>
    <Router history={hist}>
      <Switch>
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path="/login" component={Login} />
        <Route path="/dpage/:id" render={(props) => <DPage {...props} />} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
