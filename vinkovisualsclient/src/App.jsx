// App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { memo } from 'react';
import LandingPage from './pages/LandingPage/LandingPage';
import Header from './components/Header/Header';

const MemoizedHeader = memo(Header);

function App() {
  return (
    <Router>
      <MemoizedHeader />
      <Routes>
        <Route path="/" element={<LandingPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
