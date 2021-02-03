import React from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Signup.css";
import Header from "../../Misc/Header";
import TextField from "../../Misc/TextField";
import DateField from "../../Misc/DateField";
import Button from "../../Misc/Button";

function Signup() {

  const { t } = useTranslation();
  const history = useHistory();

  const onLogin = () => {
    history.push("login");
  } 

  return (
    <div>
      <Header subtitle={t("screens.signup.subtitle")}>
        { t("screens.signup.title") }
      </Header>
      <div id="form">
        <div style={{width: "20em", display: "flex", flexDirection: "column"}}>

            <TextField placeholder={t("screens.signup.labels.name")} style={{width: "auto"}}/>
            <div style={{height: ".5em"}} />
            <TextField placeholder={t("screens.signup.labels.surname")} />
            <div style={{height: ".5em"}} />
            <DateField placeholder={t("screens.signup.labels.birthdate")} />
            <div style={{height: ".5em"}} />
            <TextField type="email" placeholder={t("screens.signup.labels.email")} />
            <div style={{height: ".5em"}} />
            <TextField placeholder={t("screens.signup.labels.username")} />
            <div style={{height: ".5em"}} />
            <TextField type="password" placeholder={t("screens.signup.labels.password")} />
            <div style={{height: ".5em"}} />

            <div style={{height: "2em"}} />

            <Button>
              { t("screens.signup.labels.signup") }
            </Button>
            <div style={{height: ".5em"}} />
            <Button type="secondary" onClick={() => onLogin()}>
              { t("screens.signup.labels.return_to_login") }
            </Button>
        </div>
      </div>
    </div>
  );
}

export default Signup;