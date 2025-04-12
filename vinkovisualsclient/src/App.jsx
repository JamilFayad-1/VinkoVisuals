import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { memo } from 'react';
import LandingPage from './pages/LandingPage/LandingPage';
import Header from './components/Header/Header';
import { ReactLenis, useLenis } from 'lenis/react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";
import * as THREE from "three";

const MemoizedHeader = memo(Header);

gsap.registerPlugin(ScrollTrigger);

function App() {

  return (
    <Router>
      <ReactLenis root>
        <MemoizedHeader />
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </ReactLenis>
    </Router>
  );
}

export default App;
