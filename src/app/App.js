import React, { useState } from "react";

import Header from "./Header";
import TimelineContainer from "../timeline/TimelineContainer";
import FollowingContainer from "../following/FollowingContainer";

function App() {
  const [showTimeline, setShowTimeline] = useState(true);

  return (
    <div className="app">
      <Header
        showTimeline={() => setShowTimeline(true)}
        showFollowing={() => setShowTimeline(false)}
      />
      <div className="container">
        {showTimeline ? <TimelineContainer /> : <FollowingContainer />}
      </div>
    </div>
  );
}

export default App;
