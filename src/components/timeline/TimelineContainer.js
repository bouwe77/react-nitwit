import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

import settings from "../../settings";
import Timeline from "./Timeline";
import Compose from "./Compose";

function TimelineContainer() {
  const [timeline, setTimeline] = useState([]);
  const [etag, setEtag] = useState(null);

  function addPost(content) {
    // Remember the timeline before the new post is added.
    const prevTimeline = timeline;

    // Add new post to state BEFORE posting it to the API (i.e. "optimistic updates")
    let newPost = { user: settings.user, content };
    setTimeline([newPost, ...timeline]);

    // Post the new post to the API.
    newPost = { content };
    axios.post(settings.postsUrl, newPost).catch(error => {
      // Posting to the API failed so "rollback" the state to the previous posts.
      setTimeline(prevTimeline);
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
        console.log(res.status);
        if (etag !== res.headers.etag) {
          setEtag(res.headers.etag);
        }
        if (res.status === 200) setTimeline(res.data);
      })
      .catch(error => {
        console.log(error, error.request, error.response, error.config);
      });
  }, [etag]);

  function getStuff() {
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
        if (res.status === 200) setTimeline(res.data);
      })
      .catch(error => {
        console.log(error, error.request, error.response, error.config);
      });
  }

  // Get the timeline from the REST API when the component is rendered for the first time and after each page refresh.
  useEffect(() => {
    console.log("useEffect once");

    getStuff();
  }, [getStuff]);

  // Get the timeline from the REST API every x seconds to make the app realtime(ish).
  useEffect(() => {
    console.log("useEffect interval");

    const interval = setInterval(() => {
      getStuff();
    }, 600000);
    return () => clearInterval(interval);
  }, [getStuff]);

  return (
    <>
      <Compose addPost={addPost} />
      <Timeline posts={timeline} />
    </>
  );
}

export default TimelineContainer;
