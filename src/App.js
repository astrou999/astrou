import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import PlayPage from "./PlayPage";
import NotFound from "./NotFound";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <LandingPage /> } />
        <Route path="/play" element={ <PlayPage /> } />
        <Route path="/lottery" element={ <NotFound /> } />
        <Route path="/pottery" element={ <NotFound /> } />
        <Route path="/prediction" id="projects333" element={ <NotFound /> } />
      </Routes>
    </div>
  );
}

export default App;
