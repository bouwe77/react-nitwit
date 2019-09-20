import React from "react";

import styles from "./Header.module.css";

function Header({ showTimeline, showFollowing }) {
  return (
    <div className={styles.header}>
      <div>
        <a href="/">
          <img
            src="https://fontmeme.com/permalink/190618/9e3030abcf79d598d68c87c766e2f03c.png"
            alt="nitwit"
            height="60"
          />
        </a>
      </div>
      <div>
        <ul>
          <li>
            <a href="#" onClick={() => showTimeline()}>
              timeline
            </a>
          </li>
          <li>
            <a href="#" onClick={() => showFollowing()}>
              following
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
