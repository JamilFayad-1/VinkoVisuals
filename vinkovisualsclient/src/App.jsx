// App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { memo } from 'react';
import LandingPage from './pages/LandingPage/LandingPage';
import Header from './components/Header/Header';
import { ReactLenis, useLenis } from 'lenis/react'

const MemoizedHeader = memo(Header);

function App() {

  const lenis = useLenis(({ scroll }) => {
  })

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
