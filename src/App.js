import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import './styles/app.css';

import IndexLayout from "./components/index/IndexLayout";
import MainLayout from "./components/main/MainLayout";

import Login from "./components/index/Login";
import Register from "./components/index/Register";
import About from "./components/index/About";

import Profile from "./components/main/Profile";
import Feed from "./components/main/Feed";
import Liked from "./components/main/Liked";
import Preferences from "./components/main/Preferences";


const testPost = {
  "firstName": "Phil",
  "lastName": "Ott",
  "body": "I'm testing this out again.",
  "comments": [],
  "likes": [],
  "time": "2023-02-05T03:19:40.616Z",
  "__v": 0
}

function App() {

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [posts, setPosts] = React.useState();
  const [name, setName] = React.useState();

  React.useEffect(() => {
      const checkLoginStatus = async () => {
          const response = await fetch("http://localhost:4001/auth", {
              headers: {
                  Authorization: `Bearer ${window.localStorage.getItem("token")}`
              }
          }); 
          const json = await response.json();
          if (json["result"] === "true") {
              setLoggedIn(true);
              getLoginItems();

          } else {
              setLoggedIn(false);
          }
      };

      const getLoginItems = async () => {
        const response = await fetch(`http://localhost:4001/user/${localStorage.getItem("user")}`, {
          headers: {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
          }
        });
        const json = await response.json();
        setPosts(json[0].posts);
        setName({ "firstName": json[0].firstName, "lastName": json[0].lastName });
      }

      checkLoginStatus();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<IndexLayout component={<Login loggedIn={loggedIn} />} />} />
        <Route path="/register" element={<IndexLayout component={<Register loggedIn={loggedIn} />} />} />
        <Route path="/about" element={<IndexLayout component={<About />} />} />
        <Route path="/profile" element={<MainLayout name={name} component={<Profile posts={posts} loggedIn={loggedIn} />} />} />
        <Route path="/feed" element={<MainLayout name={name} component={<Feed post={testPost} loggedIn={loggedIn} />} />} />
        <Route path="/liked" element={<MainLayout name={name} component={<Liked post={testPost} />} />} />
        <Route path="/preferences" element={<MainLayout name={name} component={<Preferences />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
