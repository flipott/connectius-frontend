import { BrowserRouter, Route, Routes } from "react-router-dom";
import { React, useState, useEffect} from "react";
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
import FindConnections from "./components/main/FindConnections";
import Requests from "./components/main/Requests";
import ConnectedProfile from "./components/main/ConnectedProfile";

function App() {

  
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState();
  const [profilePicture, setProfilePicture] = useState();

  const checkLoginStatus = async () => {
    try {
      const response = await fetch("https://connectius-api-moiqj.ondigitalocean.app/auth", {
        headers: {
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        }
      }); 
      const json = await response.json();
      if (json["result"] === "true") {
          setLoggedIn(true);
          await getLoginItems();

      } else {
          setLoggedIn(false);
      }
    } catch(error) {
      console.error(error);
    }
  };

  const getLoginItems = async () => {
    try {
      const response = await fetch(`https://connectius-api-moiqj.ondigitalocean.app/user/${localStorage.getItem("user")}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      const json = await response.json();
      setName({ "firstName": json[0].firstName, "lastName": json[0].lastName });
      setProfilePicture(json[0].profilePicture);
    } catch(error) {
      console.error(error);
    }
  }

  useEffect(() => {
      checkLoginStatus();
  }, []);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route exact path="/" element={<IndexLayout loggedIn={loggedIn} component={<Login loggedIn={loggedIn} />} />} />
        <Route path="/register" element={<IndexLayout loggedIn={loggedIn} component={<Register loggedIn={loggedIn} />} />} />
        <Route path="/about" element={<IndexLayout loggedIn={loggedIn} component={<About />} />} />
        <Route path="/profile" element={<MainLayout name={name} profilePicture={profilePicture} component={<Profile profilePicture={profilePicture} />} />} />
        <Route path="/connections" element={<MainLayout name={name} profilePicture={profilePicture} component={<YourConnections />} />} />
        <Route path="/connections/:connectionId" element={<MainLayout name={name} profilePicture={profilePicture} component={<ConnectedProfile />} />} />
        <Route path="/find-connections" element={<MainLayout name={name} profilePicture={profilePicture} component={<FindConnections />} />} />
        <Route path="/requests" element={<MainLayout name={name} profilePicture={profilePicture} component={<Requests />} />} />
        <Route path="/feed" element={<MainLayout name={name} profilePicture={profilePicture} component={<Feed />} />} />
        <Route path="/liked" element={<MainLayout name={name} profilePicture={profilePicture} component={<Liked />} />} />
        <Route path="/preferences" element={<MainLayout name={name} profilePicture={profilePicture} component={<Preferences />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
