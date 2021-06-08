import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/client";
import SessionChecker from "../../Misc/SessionChecker";
import Header from "../../Misc/Header";
import queries from "./queries";
import Nav from "../../Misc/Nav";
import Post from "../../Misc/Post";

export default function Home() {

  const { t } = useTranslation();

  const [salutation, setSalutation] = useState(null);
  const [feed, setFeed] = useState([]);

  const { data: userData } = useQuery(queries.GET_USER_DATA);
  const { data: feedData } = useQuery(queries.GET_FEED);

  useEffect(() => {
    
    const currentHours = parseInt(new Date().getHours());

    if(currentHours >= 6 && currentHours < 12)
      setSalutation(t("screens.feed.labels.good_morning"));
    else if(currentHours >= 12 && currentHours < 20)
      setSalutation(t("screens.feed.labels.good_afternoon"));
    else
      setSalutation(t("screens.feed.labels.good_evening"));
  }, [t]);

  useEffect(() => {
    if(userData && userData.getUserData)
      localStorage.setItem("user", JSON.stringify(userData.getUserData));
  }, [userData]);

  useEffect(() => {
    if(feedData && feedData.getUserFeed) {
      setFeed(feedData.getUserFeed);
    }
  }, [feedData]);

  return (
    <>
      <SessionChecker />
      <Header subtitle={userData && userData.getUserData ? userData.getUserData.name : "..."}>
        { salutation }
      </Header>
      <Nav />
      <div style={{marginTop: "1em"}}>
        { feed.map((post) => {
          return (
            <div key={post._id} style={{width: "40em", maxWidth: "100%", marginLeft: "auto", marginRight: "auto"}}>
              <Post post={post} />
            </div>
          );
        })}
      </div>
    </>
  );
}