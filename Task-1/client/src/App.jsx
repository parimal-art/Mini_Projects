import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { API_URL } from './config';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

// Pages
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AuthPage from './pages/AuthPage';
import UserProfile from './pages/UserProfile'; // Matches the file we created

// Helper wrapper to handle navigation after login
function AuthHandler({ type, onLogin, onError }) {
  const navigate = useNavigate();
  return (
    <AuthPage 
      type={type} 
      onComplete={(userData, token) => {
        onLogin(userData, token);
        navigate('/dashboard');
      }} 
      onError={onError} 
    />
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [authLoading, setAuthLoading] = useState(true);
  const [artworks, setArtworks] = useState([]);
  const [loadingArt, setLoadingArt] = useState(true);
  const [error, setError] = useState('');

  // Initialization
  useEffect(() => {
    checkAuth();
    fetchArtworks();
  }, []);

  const checkAuth = () => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setAuthLoading(false);
  };

  const fetchArtworks = async () => {
    try {
      const res = await fetch(`${API_URL}/api/artworks`);
      const data = await res.json();
      if (res.ok) {
        setArtworks(data);
      }
    } catch (err) {
      console.error("Error fetching art:", err);
      setError("Failed to load gallery (Is the server running?)");
    } finally {
      setLoadingArt(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setToken('');
    // Navigation is handled by the Navbar or conditional rendering
  };

  const handleLoginSuccess = (userData, userToken) => {
    localStorage.setItem('token', userToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setToken(userToken);
  };

  if (authLoading) return <LoadingScreen />;

  return (
    <Router>
      <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-rose-200">
        <Navbar user={user} onLogout={handleLogout} />
        
        <main className="container mx-auto px-4 py-6">
          {error && (
            <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-sm flex items-center justify-between">
              <p>{error}</p>
              <button onClick={() => setError('')} className="text-sm font-bold">Dismiss</button>
            </div>
          )}

          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage artworks={artworks} loading={loadingArt} />} />
            
            {/* Login Route */}
            <Route path="/login" element={
               user ? <Navigate to="/dashboard" /> : 
               <AuthHandler type="login" onLogin={handleLoginSuccess} onError={setError} />
            } />
            
            {/* Signup Route */}
            <Route path="/signup" element={
               user ? <Navigate to="/dashboard" /> : 
               <AuthHandler type="signup" onLogin={handleLoginSuccess} onError={setError} />
            } />
            
            {/* Dashboard (Protected) */}
            <Route path="/dashboard" element={
              user ? 
              <Dashboard user={user} token={token} artworks={artworks} refreshArt={fetchArtworks} /> : 
              <Navigate to="/login" />
            } />
            
            {/* Public Profile Route */}
            {/* Note: We don't pass 'artworks' here because UserProfile fetches its own data */}
            <Route path="/profile/:userId/:username?" element={<UserProfile />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}