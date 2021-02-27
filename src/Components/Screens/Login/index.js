import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLazyQuery } from "@apollo/client";
import swal from "@sweetalert/with-react";
import "./Login.css";
import Header from "../../Misc/Header";
import TextField from "../../Misc/TextField";
import Button from "../../Misc/Button";
import LangChanger from "../../Misc/LangChanger";
import queries from "./queries";

function Login() {

  const { t } = useTranslation();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [doLogin, { loading: loginLoading, data: loginData, error: loginError }] = useLazyQuery(queries.GET_TOKEN, {
    fetchPolicy: "network-only"
  });

  useEffect(() => {
    if(loginData && loginData.getToken) {
      localStorage.setItem("access_token", loginData.getToken);
      history.replace("/");
    }
  }, [loginData, history]);

  useEffect(() => {
    if(loginError)
      swal(t("strings.error"), t(`errors.${loginError.graphQLErrors[0].message.toLowerCase()}`), "warning");
  }, [loginError, t]);

  const onUsernameChange = (username) => {
    setUsername(username);
  }

  const onPasswordChange = (password) => {
    setPassword(password);
  }

  const onLogin = () => {
    if(username === "" || password === "")
      swal(t("strings.error"), t("errors.empty_fields"), "warning");
    else
      doLogin({ variables: { username, password } });
  }

  const onRegister = () => {
    history.push("/register");
  }

  return (
    <div>
      <Header subtitle={t("screens.login.subtitle")}>
        { t("screens.login.title") }
      </Header>
      <div id="form">
        <div style={{width: "20em", maxWidth: "100%", display: "flex", flexDirection: "column"}}>

            <TextField placeholder={t("screens.login.labels.login")} style={{width: "auto"}} onChange={(e) => onUsernameChange(e.target.value)}/>
            <div style={{height: ".5em"}} />
            <TextField type="password" placeholder={t("screens.login.labels.password")} onChange={(e) => onPasswordChange(e.target.value)}/>

            <div style={{height: "2em"}} />

            <Button onClick={() => onLogin()} loading={loginLoading}>
              { t("screens.login.labels.login_btn") }
            </Button>
            <div style={{height: ".5em"}} />
            <Button type="secondary" onClick={() => onRegister()}>
              { t("screens.login.labels.register") }
            </Button>

        </div>
      </div>
      <div style={{right: 0, bottom: 0}}>
        <LangChanger />
      </div>
    </div>
  );
}

export default Login;