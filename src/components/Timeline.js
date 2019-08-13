import React from "react";
import Post from "./Post";

function Timeline(props) {
  return (
    <>
      {props.posts.map((post, index) => (
        <Post post={post} key={index} />
      ))}
    </>
  );
}

export default Timeline;
