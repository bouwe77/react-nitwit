import React, { useState } from "react";

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
      <textarea onChange={handleChangeContent} value={content} />
      <button type="submit">OK</button>
    </form>
  );
}

export default Compose;