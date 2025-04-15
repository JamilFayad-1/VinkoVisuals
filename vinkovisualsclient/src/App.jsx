import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { memo } from 'react';
import LandingPage from './pages/LandingPage/LandingPage';
import Header from './components/Header/Header';
import { ReactLenis } from 'lenis/react';
import React from "react";

const MemoizedHeader = memo(Header);

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
