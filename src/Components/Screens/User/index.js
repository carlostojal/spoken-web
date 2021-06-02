import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import queries from "./queries";

import SessionChecker from "../../Misc/SessionChecker";
import Header from "../../Misc/Header";
import Post from "../../Misc/Post";
import Nav from "../../Misc/Nav";

function User() {

  let { id: userId } = useParams();

  if(userId) {
    if(userId === "me")
      userId = null;
  }
  
  const [posts, setPosts] = useState([]);

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
      <Nav />
      <div>
      { posts.map((post) => {
          return <Post post={post} key={post._id} />
      })}
      </div>
    </>
  )

}

export default User;