import { BrowserRouter, Route, Routes } from "react-router-dom";
import './styles/app.css';

import IndexLayout from "./components/index/IndexLayout";
import MainLayout from "./components/main/MainLayout";

import Login from "./components/index/Login";
import Register from "./components/index/Register";
import About from "./components/index/About";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<IndexLayout component={<Login />} />} />
        <Route path="/register" element={<IndexLayout component={<Register />} />} />
        <Route path="/about" element={<IndexLayout component={<About />} />} />
        <Route path="/profile" element={<MainLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
