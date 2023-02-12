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
  const [details, setDetails] = React.useState();

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
          } else {
              setLoggedIn(false);
          }
      };
      checkLoginStatus();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<IndexLayout component={<Login loggedIn={loggedIn} />} />} />
        <Route path="/register" element={<IndexLayout component={<Register />} />} />
        <Route path="/about" element={<IndexLayout component={<About />} />} />
        <Route path="/profile" element={<MainLayout component={<Profile post={testPost} />} />} />
        <Route path="/feed" element={<MainLayout component={<Feed post={testPost} />} />} />
        <Route path="/liked" element={<MainLayout component={<Liked post={testPost} />} />} />
        <Route path="/preferences" element={<MainLayout component={<Preferences />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
