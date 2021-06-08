import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import {  useTranslation } from "react-i18next";
import { Spinner } from "react-bootstrap";
import swal from "@sweetalert/with-react";
import Nav from "../../Misc/Nav";
import TextField from "../../Misc/TextField";
import SessionChecker from "../../Misc/SessionChecker";
import queries from "./queries";
import ListUser from "../../Misc/ListUser";

function Search() {

  const { t } = useTranslation();

  const [searchUser, { data: userData, loading: userLoading, error: userError }] = useLazyQuery(queries.USER_SEARCH);

  useEffect(() => {
    if(userError)
      swal(t("strings.error"), t("errors.generic"), "error");
  }, [userError, t]);

  return (
    <>
      <SessionChecker />
      <Nav />
      <div style={{width: "100%", display: "flex", flexDirection: "column"}}>
        <TextField placeholder={t("screens.search.labels.search")} onChange={(e) => {
          searchUser({
            variables: {
              query: e.target.value
            }
          });
        }} />
      </div>
      { userLoading && 
        <Spinner color="orange" />
      }
      { userData && userData.userSearch && userData.userSearch.map((user) => {

        return (
          <ListUser key={user._id} user={user} />
        );
      })}
    </>
  );
}

export default Search;