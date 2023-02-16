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

import YourConnections from "./components/main/YourConnections";
import AllConnections from "./components/main/FindConnections";
import FindConnections from "./components/main/FindConnections";
import Requests from "./components/main/Requests";

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
  const [connections, setConnections] = React.useState();
  const [requests, setRequests] = React.useState();
  const [allUsers, setAllUsers] = React.useState();

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
        getAllUsers();

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
    console.log(json);
    setPosts(json[0].posts);
    setConnections(json[0].connections);
    setRequests(json[0].requests);
    setName({ "firstName": json[0].firstName, "lastName": json[0].lastName });
  }

  const getAllUsers = async () => {
    const response = await fetch(`http://localhost:4001/user/`, {
      headers: {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      } 
    });
    const json = await response.json();
    setAllUsers(json);
  }

  React.useEffect(() => {


      checkLoginStatus();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<IndexLayout component={<Login loggedIn={loggedIn} />} />} />
        <Route path="/register" element={<IndexLayout component={<Register loggedIn={loggedIn} />} />} />
        <Route path="/about" element={<IndexLayout component={<About />} />} />
        <Route path="/profile" element={<MainLayout name={name} component={<Profile posts={posts} loggedIn={loggedIn} />} />} />
        <Route path="/connections" element={<MainLayout name={name} component={<YourConnections connections={connections} loggedIn={loggedIn} />} />} />
        <Route path="/find-connections" element={<MainLayout name={name} component={<FindConnections allUsers={allUsers} loggedIn={loggedIn} />} />} />
        <Route path="/requests" element={<MainLayout name={name} component={<Requests requests={requests} loggedIn={loggedIn} />} />} />
        <Route path="/feed" element={<MainLayout name={name} component={<Feed post={testPost} loggedIn={loggedIn} />} />} />
        <Route path="/liked" element={<MainLayout name={name} component={<Liked post={testPost} loggedIn={loggedIn} />} />} />
        <Route path="/preferences" element={<MainLayout name={name} component={<Preferences />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
