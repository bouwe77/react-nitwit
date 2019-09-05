import React from "react";

import Timeline from "./Timeline";
import Compose from "./Compose";
import useTimeline from "../../hooks/useTimeline";

function TimelineContainer() {
  const [timeline, addPost] = useTimeline();

  return (
    <>
      <Compose addPost={addPost} />
      <Timeline posts={timeline} />
    </>
  );
}

export default TimelineContainer;
