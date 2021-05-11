import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import postDateFormat from "../../../helpers/postDateFormat";
import "./Post.css";

function Post({ post }) {

  console.log(post);

  const [timeFormatted, setTimeFormatted] = useState("");

  const history = useHistory();

  useEffect(() => {
    const time = postDateFormat(parseInt(post.time));
    setTimeFormatted(`${time.value}${time.unit}`);
  }, [post]);

  return (
    <div className="post">
      <div className="post_header">
        <div className="post_user" onClick={() => history.push(`/user/${post.poster.id}`)}>
          <p className="post_user_username">{post.poster.username}</p>
          <p className="post_user_name">{`${post.poster.name} ${post.poster.surname}`}</p>
        </div>
        <div className="post_time">
          { timeFormatted }
        </div>
      </div>
      <div className="post_body">
        <img src={post.media.url} className="post_img" alt={post.text} />
        <div className="post_text">
          {post.text}
        </div>
      </div>
    </div>
  );
}

export default Post;