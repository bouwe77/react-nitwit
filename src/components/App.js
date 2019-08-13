import React from "react";

import Header from "./Header";
import TimelineContainer from "./timeline/TimelineContainer";
import FollowingContainer from "./following/FollowingContainer";

function App() {
  return (
    <>
      <Header />
      <FollowingContainer />
      <TimelineContainer />
    </>
  );
}
export default App;
