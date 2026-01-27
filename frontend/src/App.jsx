import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink, Outlet } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import LandingPage from './pages/LandingPage';
import AdvisorBot3D from './components/AdvisorBot3D';
import CropVisualization3D from './components/CropVisualization3D';
import SoilAnalysis3D from './components/SoilAnalysis3D';
import Planner from './components/Planner';
import Reminders from './components/Reminders';
import './App.css';

// Dashboard Layout Component
const DashboardLayout = ({ onLogout, isDarkMode, toggleTheme }) => {
  return (
    <>
      <header className="navbar">
        <div className="logo">FarmWise</div>

        <nav className="menu">
          <NavLink to="/dashboard/soil" className={({ isActive }) => isActive ? 'active' : ''}>SOIL</NavLink>
          <NavLink to="/dashboard/crop" className={({ isActive }) => isActive ? 'active' : ''}>CROP</NavLink>
          <NavLink to="/dashboard/planner" className={({ isActive }) => isActive ? 'active' : ''}>PLANNER</NavLink>
          <NavLink to="/dashboard/advisor" className={({ isActive }) => isActive ? 'active' : ''}>ADVISOR</NavLink>
          <NavLink to="/dashboard/reminders" className={({ isActive }) => isActive ? 'active' : ''}>REMINDERS</NavLink>
        </nav>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <div className="theme" onClick={toggleTheme} title="Toggle Theme">
            {isDarkMode ? '☀️' : '🌙'}
          </div>
          <button
            onClick={onLogout}
            style={{
              background: 'none',
              border: '1px solid #ff4d4f',
              color: '#ff4d4f',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px'
            }}
            title="Logout"
          >
            🚪
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <Outlet />
    </>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  if (loading) return null; // Or a loading spinner

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Public Routes */}
        <Route path="/signup" element={<SignUp />} />

        <Route path="/signin" element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <SignIn onSuccess={handleLoginSuccess} />
        } />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={
          isAuthenticated ? (
            <DashboardLayout
              onLogout={handleLogout}
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
            />
          ) : (
            <Navigate to="/signin" />
          )
        }>
          <Route index element={<Navigate to="advisor" replace />} />
          <Route path="advisor" element={<AdvisorBot3D />} />
          <Route path="crop" element={<CropVisualization3D />} />
          <Route path="soil" element={<SoilAnalysis3D />} />
          <Route path="planner" element={<Planner />} />
          <Route path="reminders" element={<Reminders />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
