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
import Search from "./Components/Screens/Search";
import User from "./Components/Screens/User";
import Download from "./Components/Screens/Download";

require("dotenv").config();

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
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
            <Route exact path="/search">
              <Search />
            </Route>
            <Route path="/user/:id">
              <User />
            </Route>
            <Route path="/download">
              <Download />
            </Route>
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
