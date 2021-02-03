import React from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Login.css";
import Header from "../../Misc/Header";
import TextField from "../../Misc/TextField";
import Button from "../../Misc/Button";
import LangChanger from "../../Misc/LangChanger";

function Login() {

  const { t } = useTranslation();
  const history = useHistory();

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

            <TextField placeholder={t("screens.login.labels.login")} style={{width: "auto"}}/>
            <div style={{height: ".5em"}} />
            <TextField type="password" placeholder={t("screens.login.labels.password")} />

            <div style={{height: "2em"}} />

            <Button>
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