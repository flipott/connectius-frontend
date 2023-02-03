import { BrowserRouter, Route, Routes } from "react-router-dom";
import './styles/app.css';
import IndexLayout from "./components/index/IndexLayout";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
