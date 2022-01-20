import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Axios from "axios";

import Header from "./components/Header";
import HomeGuest from "./components/HomeGuest";
import Home from "./components/Home";
import About from "./components/About";
import Terms from "./components/Terms";
import Footer from "./components/Footer";
import CreatePost from "./components/CreatePost";
import ViewSinglePost from "./components/ViewSinglePost";
import FlashMess from "./components/FlashMess";
import ExampleContext from "./ExampleContext";

Axios.defaults.baseURL = "http://localhost:8080";

function App() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("complexappToken")));
  const [flashMess, setFlashMess] = useState([]);

  const addFlashMess = (msg) => {
    setFlashMess((prev) => prev.concat(msg));
  };

  return (
    <ExampleContext.Provider value={{ addFlashMess, setLoggedIn }}>
      <BrowserRouter>
        <FlashMess messages={flashMess} />
        <Header loggedIn={loggedIn} />
        <Routes>
          <Route path="/" element={loggedIn ? <Home /> : <HomeGuest />} />
          <Route path="/post/:id" element={<ViewSinglePost />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ExampleContext.Provider>
  );
}

export default App;
