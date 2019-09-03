import { useState } from "react";
import axios from "axios";
import settings from "../settings";

export default () => {
  const [timeline, setTimeline] = useState([]);
  const [etag, setEtag] = useState(null);

  const getTimeline = () => {
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
  };

  const addPost = content => {
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
  };

  return [timeline, getTimeline, addPost];
};
