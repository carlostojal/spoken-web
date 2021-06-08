import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import swal from "@sweetalert/with-react";

import SessionChecker from "../../Misc/SessionChecker";
import Header from "../../Misc/Header";
import Post from "../../Misc/Post";
import Button from "../../Misc/Button";
import Nav from "../../Misc/Nav";
import queries from "./queries";

function User() {

  let { id: userId } = useParams();

  const { t } = useTranslation();

  if(userId) {
    if(userId === "me")
      userId = null;
  }
  
  const [posts, setPosts] = useState([]);
  const [followState, setFollowState] = useState(null);

  const { data: userData } = useQuery(queries.GET_USER_DATA, {
    variables: {
      id: userId === "me" ? null : userId
    }
  });

  const { data: postsData } = useQuery(queries.GET_USER_POSTS, {
    variables: {
      page: 1,
      perPage: 15,
      user_id:  userId
    }
  });

  // check if the user is followed
  const { data: followData, loading: followLoading, error: followError } = useQuery(queries.CHECK_FOLLOW, {
    variables: {
      user_id: userId
    },
    fetchPolicy: "network-only"
  });

  // do / undo the follow
  const [doFollow, { loading: doFollowLoading, error: doFollowError }] = useMutation(queries.FOLLOW, {
    variables: {
      user_id: userId
    },
    fetchPolicy: "no-cache"
  });

  useEffect(() => {
    if(postsData && postsData.getUserPosts)
      setPosts(postsData.getUserPosts);
  }, [postsData]);
  
  useEffect(() => {

    if(followData && followData.checkFollow)
      setFollowState("followed");
    else if(followError && followError.message === "NOT_ACCEPTED")
      setFollowState("requested");
    else if(followData && !followData.checkFollow)
      setFollowState("not_followed");

  }, [followData, followError]);

  useEffect(() => {

    if(doFollowError)
      swal(t("strings.error"), t("errors.generic"));

  }, [doFollowError, t]);

  console.log(followState);

  return (
    <>
      <SessionChecker />
      <Nav />
      <Header subtitle={userData && userData.getUserData ? `${userData.getUserData.name} ${userData.getUserData.surname}` : "..." }>
        { userData && userData.getUserData ? userData.getUserData.username : "..." }
      </Header>
      { userData && userData.getUserData && userData.getUserData._id !== JSON.parse(localStorage.getItem("user"))._id &&
        <div style={{display: "flex", maxWidth: "30em", flexDirection: "column", marginTop: "1em"}}>
          <Button
            onClick={() => {
              doFollow();
              if(followState === "followed" || followState === "requested") {
                setFollowState("not_followed");
              } else if(followState === "not_followed") {
                console.log(userData);
                if(userData && userData.getUserData) {
                  if(userData.getUserData.profile_privacy_type === "public")
                    setFollowState("followed");
                  else if(userData.getUserData.profile_privacy_type === "private")
                    setFollowState("requested");
                  else
                    setFollowState(null);
                }
              } else {
                setFollowState(null);
              }
            }}
            loading={followLoading || doFollowLoading}
          >
              <>
                { !followState &&
                  "..."
                }
                { followState === "followed" &&
                  t("screens.profile.labels.unfollow")
                }
                { followState === "not_followed" &&
                  t("screens.profile.labels.follow")
                }
                { followState === "requested" &&
                  t("screens.profile.labels.requested")
                }
              </>
          </Button>
        </div>
      }
      <div style={{marginTop: "1em"}}>
        { posts.map((post) => {
            return (
              <div key={post._id} style={{width: "40em", maxWidth: "100%", marginLeft: "auto", marginRight: "auto"}}>
                <Post post={post} />
              </div>
            );
        })}
      </div>
    </>
  )

}

export default User;