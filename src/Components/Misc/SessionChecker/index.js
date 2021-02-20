import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import queries from "./queries";

export default function SessionChecker(props) {

  const history = useHistory();

  const { loading: refreshLoading, data: refreshData, error: refreshError } = useQuery(queries.REFRESH_TOKEN);

  let out = null;

  useEffect(() => {
    if(refreshData) {
      console.log(refreshData);
    }
  }, [refreshData]);

  useEffect(() => {
    if(refreshError) {
      console.log(refreshError);
      history.replace("/login");
    }
  }, [refreshError]);

  return out;
}