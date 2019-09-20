import React, { useState } from "react";

import styles from "./Compose.module.css";

function Compose({ addPost }) {
  const [content, setContent] = useState("");

  function handleChangeContent(event) {
    var textbox = event.target;
    setContent(textbox.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    addPost(content);
    setContent("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles["compose-wrapper"]}>
        <textarea
          onChange={handleChangeContent}
          value={content}
          placeholder="Write something..."
        />
        <button type="submit">OK</button>
      </div>
    </form>
  );
}

export default Compose;
