import React, { useState, useEffect } from "react";
import axios from "axios";
import Timeline from "./Timeline";
import Header from "./Header";
import Compose from "./Compose";

function App() {
  const [posts, setPosts] = useState([]);

  function addPost(content) {
    // Remember the posts before the new one is added.
    const prevPosts = posts;

    // Add new post to state BEFORE posting it to the API (i.e. "optimistic updates")
    let newPost = { user: "bouwe", content };
    setPosts([newPost, ...posts]);

    newPost = { content };
    // Post the new ToDo to the API.
    axios
      .post("https://nitwit-api.azurewebsites.net/users/bouwe/posts", newPost)
      .catch(error => {
        // Posting to the API failed so "rollback" the state to the previous posts.
        setPosts(prevPosts);
        console.log(error, error.request, error.response, error.config);
      });
  }

  useEffect(() => {
    function getPosts() {
      axios
        .get("https://nitwit-api.azurewebsites.net/users/bouwe/timeline")
        .then(res => {
          setPosts(res.data);
        })
        .catch(error => {
          console.log(error, error.request, error.response, error.config);
        });
    }
    getPosts();
  }, []);

  return (
    <div className="App">
      <Header />
      <Compose addPost={addPost} />
      <Timeline posts={posts} />
    </div>
  );
}
export default App;
