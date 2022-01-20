import React, { useState, useReducer } from "react";
import { useImmerReducer } from "use-immer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Axios from "axios";

import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";

// My Components
import Header from "./components/Header";
import HomeGuest from "./components/HomeGuest";
import Home from "./components/Home";
import About from "./components/About";
import Terms from "./components/Terms";
import Footer from "./components/Footer";
import CreatePost from "./components/CreatePost";
import ViewSinglePost from "./components/ViewSinglePost";
import FlashMess from "./components/FlashMess";

Axios.defaults.baseURL = "http://localhost:8080";

function App() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("complexappToken")),
    flashMess: [],
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true;
        break;
      case "logout":
        draft.loggedIn = false;
        break;
      case "flashMessage":
        draft.flashMess.push(action.value);
        break;
      default:
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMess messages={state.flashMess} />
          <Header />
          <Routes>
            <Route path="/" element={state.loggedIn ? <Home /> : <HomeGuest />} />
            <Route path="/post/:id" element={<ViewSinglePost />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
