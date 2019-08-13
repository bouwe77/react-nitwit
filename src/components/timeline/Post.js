import React from "react";

import timeSince from "../../functions/timeSince";

function Post({ post }) {
  return (
    <p>
      <b>{post.user}</b> <i>{timeSince(post.created)}</i>
      <br />
      {post.content}
    </p>
  );
}

export default Post;
