import React, { useEffect, useState } from "react";
import axios from "axios";

import settings from "../../settings";
import Timeline from "./Timeline";
import Compose from "./Compose";

function TimelineContainer() {
  const [posts, setPosts] = useState([]);

  function addPost(content) {
    // Remember the posts before the new one is added.
    const prevPosts = posts;

    // Add new post to state BEFORE posting it to the API (i.e. "optimistic updates")
    let newPost = { user: settings.user, content };
    setPosts([newPost, ...posts]);

    // Post the new post to the API.
    newPost = { content };
    axios.post(settings.postsUrl, newPost).catch(error => {
      // Posting to the API failed so "rollback" the state to the previous posts.
      setPosts(prevPosts);
      handle(error);
    });
  }

  // Get the timeline from the REST API when the component is rendered for the first time.
  useEffect(() => {
    function getTimeline() {
      axios
        .get(settings.timelineUrl)
        .then(res => {
          setPosts(res.data);
        })
        .catch(error => {
          handle(error);
        });
    }
    getTimeline();
  }, []);

  function handle(error) {
    console.log(error, error.request, error.response, error.config);
  }

  return (
    <>
      <Compose addPost={addPost} />
      <Timeline posts={posts} />
    </>
  );
}

export default TimelineContainer;
