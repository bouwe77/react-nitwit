import React from "react";

import styles from "./FollowToggle.module.css";

export default class FollowToggle extends React.Component {
  handleToggle = () => {
    this.props.toggleFollowing();
  };

  getToggle = checked => (
    <label className={styles.switch}>
      <input type="checkbox" checked={checked} onChange={this.handleToggle} />
      <div className={`${styles.slider} ${styles.round}`}>
        <span className={styles.on}>Following</span>
        <span className={styles.off}>Follow?</span>
      </div>
    </label>
  );

  Follow = () => this.getToggle(false);
  Unfollow = () => this.getToggle(true);

  render = () => {
    const Button = this.props.youAreFollowing ? this.Unfollow : this.Follow;
    return <Button />;
  };
}
