import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';

import "./i18n_config";
import Login from './Components/Screens/Login';
import Signup from "./Components/Screens/Signup";

require("dotenv").config();

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Signup />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
