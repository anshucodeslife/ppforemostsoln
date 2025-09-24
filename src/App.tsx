import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LiveWebinar from './pages/LiveWebinar';
import Courses from './pages/Courses';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import OurTeam from './pages/OurTeam';
import CareersPage from './pages/Careers';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/live-webinar" element={<LiveWebinar />} />
        <Route path="/Courses" element={<Courses />} />
          <Route path="/our-team" element={<OurTeam />} />
        <Route path="/careers" element={<CareersPage />} />
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};
export default App;
