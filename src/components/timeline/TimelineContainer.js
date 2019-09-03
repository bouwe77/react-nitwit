import React, { useEffect } from "react";

import Timeline from "./Timeline";
import Compose from "./Compose";
import useTimeline from "../../hooks/useTimeline";

function TimelineContainer() {
  const [timeline, refreshTimeline, addPost] = useTimeline();

  // Get the timeline from the REST API when the component is rendered for the first time and after each page refresh.
  useEffect(() => {
    refreshTimeline();
  }, [refreshTimeline]);

  // Get the timeline from the REST API every x seconds to make the app realtime(ish).
  useEffect(() => {
    const interval = setInterval(() => {
      refreshTimeline();
    }, 5000);
    return () => clearInterval(interval);
  }, [refreshTimeline]);

  return (
    <>
      <Compose addPost={addPost} />
      <Timeline posts={timeline} />
    </>
  );
}

export default TimelineContainer;
