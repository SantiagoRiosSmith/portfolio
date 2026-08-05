import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <nav className="navbar">

        <h2 className="logo">Santiago Rios Smith</h2>

        <ul className="nav-links">

          <li><Link to="/">Home</Link></li>

          <li><Link to="/about">About</Link></li>

          <li><Link to="/projects">Projects</Link></li>

          <li><Link to="/contact">Contact</Link></li>

        </ul>

      </nav>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/projects" element={<Projects />} />

        <Route path="/contact" element={<Contact />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;