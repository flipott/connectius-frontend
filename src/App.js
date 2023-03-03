import { Route, Routes, HashRouter } from "react-router-dom";
import React from "react";
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

  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<IndexLayout component={<Login />} />} />
        <Route path="/register" element={<IndexLayout component={<Register />} />} />
        <Route path="/about" element={<IndexLayout component={<About />} />} />
        <Route path="/profile" element={<MainLayout component={<Profile />} />} />
        <Route path="/connections" element={<MainLayout component={<YourConnections />} />} />
        <Route path="/connections/:connectionId" element={<MainLayout component={<ConnectedProfile />} />} />
        <Route path="/find-connections" element={<MainLayout component={<FindConnections />} />} />
        <Route path="/requests" element={<MainLayout component={<Requests />} />} />
        <Route path="/feed" element={<MainLayout component={<Feed />} />} />
        <Route path="/liked" element={<MainLayout component={<Liked />} />} />
        <Route path="/preferences" element={<MainLayout component={<Preferences />} />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
