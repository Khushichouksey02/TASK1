import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Authors from "./Authors";
import Navbar from "./Navbar";
import Posts from "./Posts";
import Addpost from "./Addpost";
import './App.css'
import AuthorDetails from "./AuthorDetails";
import Topcomment from "./Topcomment";
import Toplike from "./Toplike";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Authors" element={<Authors />} />
      <Route path="/Posts" element={<Posts/>}/>
      <Route path="/AuthorDetails" element={<AuthorDetails/>}/>
      <Route path="/Topcomment" element={<Topcomment/>}/>
      <Route path="/Toplike" element={<Toplike/>}/>
      <Route path="/Addpost" element={<Addpost/>}/>
    </Routes>
    </Router>
  );
}

export default App;
