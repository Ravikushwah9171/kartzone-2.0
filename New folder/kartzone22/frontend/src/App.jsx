import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductDetail from './pages/ProductDetail';
import Dashboard from './pages/Dashboard';
import MoodShop from './pages/MoodShop';
import Cart from './pages/Cart';
import AIAssistant from './components/AIAssistant';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar user={user} setUser={setUser} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/mood-shop" element={<MoodShop />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <AIAssistant />
        <footer className="bg-slate-900 text-white py-8 text-center">
          <p>© 2024 KartZone AI. Made with ❤️ for Bharat.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
