import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client";
import SessionChecker from "../../Misc/SessionChecker";
import Header from "../../Misc/Header";
import queries from "./queries";

export default function Home() {

  const { t } = useTranslation();

  const [salutation, setSalutation] = useState(null);

  const { data: userData } = useQuery(queries.GET_USER_DATA);

  useEffect(() => {
    
    const currentHours = parseInt(new Date().getHours());

    if(currentHours >= 6 && currentHours < 12)
      setSalutation(t("screens.feed.labels.good_morning"));
    else if(currentHours >= 12 && currentHours < 20)
      setSalutation(t("screens.feed.labels.good_afternoon"));
    else
      setSalutation(t("screens.feed.labels.good_evening"));
  }, [t]);

  return (
    <>
      <SessionChecker />
      <Header subtitle={userData && userData.getUserData ? userData.getUserData.name : "..."}>
        { salutation }
      </Header>
    </>
  );
}