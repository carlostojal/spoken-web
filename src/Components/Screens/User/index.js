import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import queries from "./queries";

import SessionChecker from "../../Misc/SessionChecker";
import Header from "../../Misc/Header";
import Post from "../../Misc/Post";

function User() {

  let { id: userId } = useParams();

  if(userId) {
    if(userId === "me")
      userId = null;
    else
      userId = parseInt(userId)
  }
  
  const [posts, setPosts] = useState([]);

  const { data: userData } = useQuery(queries.GET_USER_DATA, {
    variables: {
      id: userId === "me" ? null : parseInt(userId)
    }
  });

  const { data: postsData } = useQuery(queries.GET_USER_POSTS, {
    variables: {
      page: 1,
      perPage: 15,
      user_id:  parseInt(userId)
    }
  });

  useEffect(() => {
    if(postsData && postsData.getUserPosts)
      setPosts(postsData.getUserPosts);
  }, [postsData]);

  return (
    <>
      <SessionChecker />
      <Header subtitle={userData && userData.getUserData ? `${userData.getUserData.name} ${userData.getUserData.surname}` : "..." }>
        { userData && userData.getUserData ? userData.getUserData.username : "..." }
      </Header>
      <div>
      {
        posts.map((post) => (
          <>
            <div style={{height: "1em"}}></div>
            <Post post={post} key={post.id} />
          </>
        ))
      }
      </div>
    </>
  )

}

export default User;