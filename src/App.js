import { BrowserRouter, Route, Routes } from "react-router-dom";
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
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<IndexLayout component={<Login />} />} />
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
