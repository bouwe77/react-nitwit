import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

import settings from "../../settings";
import Timeline from "./Timeline";
import Compose from "./Compose";

function TimelineContainer() {
  const [posts, setPosts] = useState([]);
  const [etag, setEtag] = useState(null);

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
      console.log(error, error.request, error.response, error.config);
    });
  }

  // The 'getTimeline' function makes the dependencies of useEffect Hook change on every render.
  // To fix this, wrap the 'getTimeline' definition into its own useCallback() Hook.
  const getTimeline = useCallback(() => {
    axios
      .get(settings.timelineUrl, {
        headers: { "If-None-Match": etag },
        validateStatus: function(status) {
          return status < 400; // All status codes below 400 are valid
        }
      })
      .then(res => {
        if (etag !== res.headers.etag) {
          setEtag(res.headers.etag);
        }
        if (res.status === 200) setPosts(res.data);
      })
      .catch(error => {
        console.log(error, error.request, error.response, error.config);
      });
  }, [etag]);

  // Get the timeline from the REST API when the component is rendered for the first time and after each page refresh.
  useEffect(() => {
    getTimeline();
  }, [getTimeline]);

  // Get the timeline from the REST API every x seconds to make the app realtime(ish).
  useEffect(() => {
    const interval = setInterval(() => {
      getTimeline();
    }, 30000);
    return () => clearInterval(interval);
  }, [getTimeline]);

  return (
    <>
      <Compose addPost={addPost} />
      <Timeline posts={posts} />
    </>
  );
}

export default TimelineContainer;
