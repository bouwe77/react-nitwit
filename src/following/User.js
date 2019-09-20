import React from "react";

import styles from "./User.module.css";
import FollowToggle from "./FollowToggle";

class User extends React.Component {
  toggleFollowing = () => {
    this.props.toggleFollowing(this.props.user.user);
  };

  render = () => {
    var { user, youAreFollowing, isFollowingYou } = this.props.user;

    var followsYou = isFollowingYou ? "follows you" : "";

    return (
      <div className={styles["user-container"]}>
        <div className={styles.parent}>
          <div className={styles.child}>
            <b>{user}</b> <i>{followsYou}</i>
          </div>
          <div className={styles.child}>
            <FollowToggle
              youAreFollowing={youAreFollowing}
              toggleFollowing={this.toggleFollowing}
            />
          </div>
        </div>
      </div>
    );
  };
}

export default User;
