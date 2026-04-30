import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, LogOut, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Live cart count from localStorage
  useEffect(() => {
    const updateCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.reduce((a, i) => a + (i.qty || 1), 0));
    };
    updateCount();
    window.addEventListener('storage', updateCount);
    // Poll every second for same-tab updates
    const interval = setInterval(updateCount, 1000);
    return () => { window.removeEventListener('storage', updateCount); clearInterval(interval); };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setMobileMenu(false);
    navigate('/');
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
    }
  };

  return (
    <>
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="premium-gradient p-1.5 rounded-xl">
                <Sparkles className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                KartZone
              </span>
            </Link>

            {/* Desktop Search */}
            <div className="hidden md:flex items-center bg-slate-100 rounded-2xl px-4 py-2 w-80 lg:w-96 gap-2">
              <Search className="text-slate-400 w-4 h-4 shrink-0" />
              <input
                type="text"
                placeholder="Search with AI..."
                className="bg-transparent border-none focus:outline-none text-sm w-full text-slate-700 placeholder:text-slate-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-5">
              <Link to="/mood-shop" className="text-sm font-bold text-slate-500 hover:text-purple-600 transition-colors whitespace-nowrap">
                ✨ Mood Shop
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative text-slate-600 hover:text-blue-600 transition-colors">
                <ShoppingCart className="w-6 h-6" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              {user ? (
                <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
                  <div className="hidden lg:block text-right">
                    <p className="text-[10px] text-slate-400 font-bold uppercase leading-none">Namaste,</p>
                    <p className="text-xs font-bold text-slate-700">{user?.name?.split(' ')[0]}</p>
                  </div>
                  <Link to="/dashboard" className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 p-0.5 hover:scale-105 transition-transform">
                    <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center text-blue-600 font-black text-sm">
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                  </Link>
                  <button onClick={handleLogout} className="text-slate-300 hover:text-red-400 transition-colors">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 pl-4 border-l border-slate-100">
                  <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Login</Link>
                  <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile */}
            <div className="flex md:hidden items-center gap-3">
              <button onClick={() => setSearchOpen(true)} className="text-slate-600 hover:text-blue-600">
                <Search className="w-5 h-5" />
              </button>
              <Link to="/cart" className="relative text-slate-600 hover:text-blue-600">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>
                )}
              </Link>
              <button onClick={() => setMobileMenu(!mobileMenu)} className="text-slate-600">
                {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-slate-100 bg-white overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                <Link to="/mood-shop" onClick={() => setMobileMenu(false)} className="block font-bold text-slate-700 hover:text-purple-600 py-2">✨ Mood Shop</Link>
                {user ? (
                  <>
                    <Link to="/dashboard" onClick={() => setMobileMenu(false)} className="block font-bold text-slate-700 hover:text-blue-600 py-2">Dashboard</Link>
                    <button onClick={handleLogout} className="block text-red-500 font-bold py-2">Logout</button>
                  </>
                ) : (
                  <div className="flex gap-3 pt-2">
                    <Link to="/login" onClick={() => setMobileMenu(false)} className="flex-1 text-center border border-slate-200 text-slate-700 font-bold py-3 rounded-2xl">Login</Link>
                    <Link to="/signup" onClick={() => setMobileMenu(false)} className="flex-1 text-center bg-blue-600 text-white font-bold py-3 rounded-2xl">Sign Up</Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-start pt-20 px-4"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="w-full max-w-xl mx-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-white rounded-2xl flex items-center gap-3 px-5 py-4 shadow-2xl">
                <Search className="text-slate-400 w-5 h-5 shrink-0" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search products..."
                  className="flex-grow border-none focus:outline-none text-base text-slate-800"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                />
                <button onClick={() => setSearchOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
