import React from "react";

import styles from "./Post.module.css";
import timeSince from "./timeSince";

function Post({ post }) {
  return (
    <>
      <div className={styles["post-wrapper"]}>
        <b>{post.user}</b> <i>{timeSince(post.created)}</i>
        <div>{post.content}</div>
      </div>
    </>
  );
}

export default Post;
