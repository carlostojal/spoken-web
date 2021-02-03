import React from 'react';
import { ApolloProvider } from "@apollo/client";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';

import client from "./apollo_config";
import "./i18n_config";
import Login from './Components/Screens/Login';
import Signup from "./Components/Screens/Signup";
import Home from "./Components/Screens/Home";

require("dotenv").config();

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Signup />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
