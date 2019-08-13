import React from "react";

function Post({ post }) {
  return (
    <p>
      <b>{post.user}</b>
      <br />
      {post.content}
    </p>
  );
}

export default Post;
