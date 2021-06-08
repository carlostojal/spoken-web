import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import queries from "./queries";

export default function SessionChecker(props) {

  const history = useHistory();

  const [refreshSession, { data: refreshData, error: refreshError }] = useLazyQuery(queries.REFRESH_TOKEN);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  useEffect(() => {
    if(refreshData)
      localStorage.setItem("tokens", JSON.stringify(refreshData.refreshToken));
  }, [refreshData]);

  useEffect(() => {
    if(refreshError) {
      console.log(refreshError);
      history.replace("/login");
    }
  }, [refreshError, history]);

  return null;
}