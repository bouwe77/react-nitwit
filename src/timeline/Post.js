import React from "react";

import styles from "./Post.module.css";
import timeSince from "./timeSince";

function Post({ post }) {
  return (
    <>
      <div className={styles.poep}>
        <b>{post.user}</b> <i>{timeSince(post.created)}</i>
        <p>{post.content}</p>
      </div>
    </>
  );
}

export default Post;
