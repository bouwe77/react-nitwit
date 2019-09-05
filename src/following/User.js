import React from "react";

import FollowToggle from "./FollowToggle";

class User extends React.Component {
  toggleFollowing = () => {
    this.props.toggleFollowing(this.props.user.user);
  };

  render = () => {
    var { user, youAreFollowing, isFollowingYou } = this.props.user;

    var followsYou = isFollowingYou ? "follows you" : "";

    return (
      <div>
        <div>
          <b>{user}</b> <i>{followsYou}</i>
        </div>
        <div>
          <FollowToggle
            youAreFollowing={youAreFollowing}
            toggleFollowing={this.toggleFollowing}
          />
        </div>
      </div>
    );
  };
}

export default User;
