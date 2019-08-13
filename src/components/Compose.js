import React, { useState } from "react";

function Compose(props) {
  const [content, setContent] = useState("");

  function changeContent(event) {
    var textbox = event.target;
    setContent(textbox.value);
  }

  function submit(event) {
    event.preventDefault();
    props.addPost(content);
  }

  return (
    <form onSubmit={submit}>
      <textarea value={content} onChange={changeContent} />
      <button type="submit">OK</button>
    </form>
  );
}

export default Compose;
