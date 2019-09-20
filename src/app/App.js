import React, { useState } from "react";

import Header from "./Header";
import TimelineContainer from "../timeline/TimelineContainer";
import FollowingContainer from "../following/FollowingContainer";

function App() {
  const [showTimeline, setShowTimeline] = useState(true);

  return (
    <div className="container">
      <Header
        showTimeline={() => setShowTimeline(true)}
        showFollowing={() => setShowTimeline(false)}
      />
      {showTimeline ? <TimelineContainer /> : <FollowingContainer />}
    </div>
  );
}

export default App;
