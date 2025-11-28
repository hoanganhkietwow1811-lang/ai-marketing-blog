import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Blog from './pages/Blog';
import CaseStudies from './pages/CaseStudies';
import PostDetail from './pages/PostDetail';
import About from './pages/About';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import CaseGuide from './pages/CaseGuide';
import MarketingRoadmap from './pages/MarketingRoadmap';

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Auth Routes - No Layout */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Admin Route - No Layout */}
            <Route path="/admin" element={<AdminDashboard />} />
            
            {/* Public Routes - With Layout */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/blog" element={<Layout><Blog /></Layout>} />
            <Route path="/case-studies" element={<Layout><CaseStudies /></Layout>} />
            <Route path="/case-guide" element={<Layout><CaseGuide /></Layout>} />
            <Route path="/roadmap" element={<Layout><MarketingRoadmap /></Layout>} />
            <Route path="/post/:id" element={<Layout><PostDetail /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/resources" element={<Layout><Resources /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;