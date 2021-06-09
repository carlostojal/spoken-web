import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client";
import swal from "@sweetalert/with-react";
import "./Signup.css";
import queries from "./queries";
import Header from "../../Misc/Header";
import TextField from "../../Misc/TextField";
import DateField from "../../Misc/DateField";
import Button from "../../Misc/Button";

function Signup() {

  const { t } = useTranslation();
  const history = useHistory();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [doRegister, { data: registerData, loading: registerLoading, error: registerError }] = useMutation(queries.REGISTER_USER, {
    onError: (e) => {
      console.error(e);
    }
  });

  useEffect(() => {

    if(registerError) {
      if(registerError.message)
        swal(t("strings.error"), t(`errors.${registerError.message.toLowerCase()}`), "warning");
      else
        swal(t("strings.error"), t("errors.generic"), "error");
    }

  }, [registerError, t]);

  useEffect(() => {

    if(registerData && registerData.registerUser) {
      swal(t("strings.success"), t("screens.signup.labels.success"), "success");
      history.push("login");
    }
  }, [registerData, history, t]);

  return (
    <div>
      <Header subtitle={t("screens.signup.subtitle")}>
        { t("screens.signup.title") }
      </Header>
      <div id="form">
        <div style={{width: "20em", display: "flex", flexDirection: "column"}}>

            <TextField placeholder={t("screens.signup.labels.name")} style={{width: "auto"}} onChange={(e) => setName(e.target.value) }/>
            <div style={{height: ".5em"}} />
            <TextField placeholder={t("screens.signup.labels.surname")} onChange={(e) => setSurname(e.target.value)} />
            <div style={{height: ".5em"}} />
            <DateField placeholder={t("screens.signup.labels.birthdate")} onChange={(e) => setBirthdate(new Date(e.target.value).getTime().toString())} />
            <div style={{height: ".5em"}} />
            <TextField type="email" placeholder={t("screens.signup.labels.email")} onChange={(e) => setEmail(e.target.value)} />
            <div style={{height: ".5em"}} />
            <TextField placeholder={t("screens.signup.labels.username")} onChange={(e) => setUsername(e.target.value)} />
            <div style={{height: ".5em"}} />
            <TextField type="password" placeholder={t("screens.signup.labels.password")} onChange={(e) => setPassword(e.target.value)} />
            <div style={{height: ".5em"}} />

            <div style={{height: "2em"}} />

            <Button loading={registerLoading} onClick={() => {
              
              doRegister({
                variables: {
                  name,
                  surname,
                  birthdate,
                  email,
                  username,
                  password,
                  profile_type: "personal",
                  profile_privacy_type: "public"
                }
              });

            }}>
              { t("screens.signup.labels.signup") }
            </Button>
            <div style={{height: ".5em"}} />
            <Button type="secondary" onClick={() => history.push("login")}>
              { t("screens.signup.labels.return_to_login") }
            </Button>
        </div>
      </div>
    </div>
  );
}

export default Signup;