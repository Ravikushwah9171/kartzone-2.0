import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import { ShoppingCart, User, Search, Mic, LogOut, Trash2 } from 'lucide-react';

const AuthContext = createContext();

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [cart, setCart] = useState([]);
  const [view, setView] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    } else {
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [user]);

  const login = async (email, password) => {
    console.log('Attempting login...', email);
    const res = await axios.post('/api/auth/login', { email, password });
    setUser(res.data);
    return res.data;
  };

  const signup = async (name, email, password) => {
    console.log('Attempting signup...', email);
    const res = await axios.post('/api/auth/signup', { name, email, password });
    setUser(res.data);
    return res.data;
  };

  const logout = () => {
    console.log('Logging out...');
    setUser(null);
    setCart([]);
    setView('home');
  };

  const placeOrder = async (items, total) => {
    console.log('Placing order...', items.length, 'items');
    try {
      const res = await axios.post('/api/orders', { items, total });
      setCart([]);
      setView('orders');
      return res.data;
    } catch (err) {
      console.error('Order failed:', err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, placeOrder }}>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
        <Navbar cartCount={cart.length} user={user} setView={(v) => { console.log('Changing view to:', v); setView(v); }} />
        <main className="container mx-auto p-4 relative z-10">
          {view === 'home' && <HomeView 
            addToCart={(p) => { console.log('Adding to cart:', p.name); setCart([...cart, p]); }} 
            onProductClick={(id) => { setSelectedProductId(id); setView('product'); }}
          />}
          {view === 'product' && <ProductDetailView id={selectedProductId} addToCart={(p) => setCart([...cart, p])} />}
          {view === 'login' && <AuthView type="login" setView={setView} />}
          {view === 'signup' && <AuthView type="signup" setView={setView} />}
          {view === 'orders' && <OrdersView />}
          {view === 'cart' && <CartView cart={cart} setCart={setCart} placeOrder={placeOrder} setView={setView} />}
        </main>
      </div>
    </AuthContext.Provider>
  );
}

function Navbar({ cartCount, user, setView }) {
  return (
    <nav className="sticky top-0 z-50 bg-[#131921] text-white p-3 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold cursor-pointer" onClick={() => setView('home')}>
          KART<span className="text-orange-400">ZONE</span>
        </div>
        
        <div className="flex-1 max-w-2xl mx-4 flex bg-white rounded-md overflow-hidden">
          <input type="text" className="flex-1 p-2 text-black outline-none" placeholder="Search products..." />
          <button className="bg-orange-400 p-2 text-black hover:bg-orange-500 transition"><Search size={20} /></button>
        </div>

        <div className="flex items-center gap-6">
          <div className="cursor-pointer flex flex-col items-end" onClick={() => setView(user ? 'orders' : 'login')}>
            <p className="text-xs text-gray-400">Hello, {user ? user.user.name : 'sign in'}</p>
            <p className="font-bold">Orders & Profile</p>
          </div>
          <div className="relative cursor-pointer" onClick={() => setView('cart')}>
            <ShoppingCart size={30} />
            <span className="absolute -top-2 -right-2 bg-orange-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}

function HomeView({ addToCart, onProductClick }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-20 text-xl">Loading premium products...</div>;

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(p => (
          <div key={p.id} onClick={() => onProductClick(p.id)} className="cursor-pointer bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition border border-slate-100 flex flex-col group">
            <div className="overflow-hidden h-48 mb-4">
              <img src={p.image} alt={p.name} className="h-full w-full object-contain group-hover:scale-105 transition duration-300" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2 line-clamp-2">{p.name}</h3>
            <div className="flex items-center gap-1 mb-2">
              <span className="text-orange-400 text-sm">⭐⭐⭐⭐⭐</span>
              <span className="text-xs text-slate-500">{p.rating}</span>
            </div>
            <div className="text-xl font-bold mb-4">₹{p.price.toLocaleString('en-IN')}</div>
            <button 
              onClick={(e) => { e.stopPropagation(); addToCart(p); }}
              className="mt-auto w-full bg-orange-400 py-2 rounded font-semibold hover:bg-orange-500 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductDetailView({ id, addToCart }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading product details...</div>;
  if (!product) return <div className="text-center py-20">Product not found.</div>;

  return (
    <div className="max-w-6xl mx-auto py-8 bg-white p-8 rounded-xl shadow-lg mt-6 flex flex-col md:flex-row gap-10">
      <div className="flex-1">
        <img src={product.image} alt={product.name} className="w-full h-[400px] object-contain" />
      </div>
      <div className="flex-1 space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">{product.name}</h1>
        <div className="flex items-center gap-2">
          <span className="text-orange-400 text-xl font-bold">⭐⭐⭐⭐⭐ {product.rating}</span>
          <span className="text-slate-500 border-l pl-2">AI Verified Reviews</span>
        </div>
        <div className="text-4xl font-extrabold text-slate-900">₹{product.price.toLocaleString('en-IN')}</div>
        <p className="text-slate-600 text-lg leading-relaxed">{product.desc}</p>
        
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
          <h4 className="font-bold text-orange-800 mb-2">💡 AI Buying Advice</h4>
          <p className="text-sm text-orange-700"><strong>Price Prediction:</strong> {product.pricePrediction}</p>
          <p className="text-sm text-orange-700"><strong>Regret Risk:</strong> {product.regretRisk}</p>
        </div>

        <div className="space-y-2">
          <h4 className="font-bold">Key Specifications:</h4>
          <ul className="list-disc list-inside text-slate-600">
            {product.specs.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>

        <button 
          onClick={() => addToCart(product)}
          className="w-full bg-orange-400 py-4 rounded-xl text-xl font-bold hover:bg-orange-500 transition shadow-lg"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

function AuthView({ type, setView }) {
  const { login, signup } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === 'login') await login(formData.email, formData.password);
      else await signup(formData.name, formData.email, formData.password);
      setView('home');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-6">{type === 'login' ? 'Sign-In' : 'Create Account'}</h2>
      {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm border border-red-100">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {type === 'signup' && (
          <div>
            <label className="block text-sm font-semibold mb-1">Your Name</label>
            <input type="text" className="w-full border p-2 rounded focus:ring-2 ring-orange-200 outline-none" 
              onChange={e => setFormData({...formData, name: e.target.value})} required />
          </div>
        )}
        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input type="email" className="w-full border p-2 rounded focus:ring-2 ring-orange-200 outline-none" 
            onChange={e => setFormData({...formData, email: e.target.value})} required />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Password</label>
          <input type="password" className="w-full border p-2 rounded focus:ring-2 ring-orange-200 outline-none" 
            onChange={e => setFormData({...formData, password: e.target.value})} required />
        </div>
        <button type="submit" className="w-full bg-orange-400 py-3 rounded-md font-bold hover:bg-orange-500 transition shadow-md">
          {type === 'login' ? 'Continue' : 'Create your KARTZONE account'}
        </button>
      </form>
      <div className="mt-6 text-center text-sm">
        <span className="text-gray-500">{type === 'login' ? "New to KARTZONE?" : "Already have an account?"}</span>{' '}
        <button className="text-blue-600 hover:underline" onClick={() => setView(type === 'login' ? 'signup' : 'login')}>
          {type === 'login' ? 'Create your account' : 'Sign in'}
        </button>
      </div>
    </div>
  );
}

function OrdersView() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    axios.get('/api/orders')
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-20">Loading your orders...</div>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Orders</h2>
        <button onClick={logout} className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold">
          <LogOut size={18} /> Logout
        </button>
      </div>
      {orders.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center text-slate-500">
          You haven't placed any orders yet.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <div className="flex justify-between border-bottom pb-4 mb-4 border-b border-slate-100">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Order ID</p>
                  <p className="font-mono text-sm">#{order._id.slice(-8).toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Date</p>
                  <p className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Total</p>
                  <p className="text-sm font-bold">₹{order.total.toLocaleString('en-IN')}</p>
                </div>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex-shrink-0 flex items-center gap-2 bg-slate-50 p-2 rounded">
                    <img src={item.image} alt="" className="w-12 h-12 object-contain" />
                    <div>
                      <p className="text-xs font-semibold line-clamp-1 w-32">{item.name}</p>
                      <p className="text-xs text-slate-500">Qty: {item.qty}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CartView({ cart, setCart, placeOrder, setView }) {
  const total = cart.reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0);

  const handlePlaceOrder = async () => {
    try {
      await placeOrder(cart, total);
      alert("Order placed successfully!");
    } catch (err) {
      alert("Failed to place order. Are you logged in?");
      setView('login');
    }
  };

  if (cart.length === 0) return (
    <div className="text-center py-20 bg-white rounded-xl shadow-lg max-w-2xl mx-auto mt-10">
      <ShoppingCart size={64} className="mx-auto text-slate-300 mb-4" />
      <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
      <p className="text-slate-500 mb-6">Looks like you haven't added anything yet.</p>
      <button onClick={() => setView('home')} className="bg-orange-400 px-6 py-2 rounded font-bold hover:bg-orange-500 transition">
        Shop Now
      </button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-8 flex flex-col md:flex-row gap-8">
      <div className="flex-1 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
        {cart.map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 flex gap-4 items-center">
            <img src={item.image} alt="" className="w-20 h-20 object-contain" />
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-orange-600 font-bold">₹{item.price.toLocaleString('en-IN')}</p>
            </div>
            <button 
              onClick={() => setCart(cart.filter((_, i) => i !== idx))}
              className="text-slate-400 hover:text-red-500 transition p-2"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
      <div className="w-full md:w-80 h-fit bg-white p-6 rounded-lg shadow-md border border-slate-200">
        <h3 className="text-lg font-bold mb-4">Order Summary</h3>
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>₹{total.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between mb-4 text-green-600">
          <span>Shipping</span>
          <span>FREE</span>
        </div>
        <div className="border-t pt-4 flex justify-between font-bold text-xl mb-6">
          <span>Total</span>
          <span>₹{total.toLocaleString('en-IN')}</span>
        </div>
        <button 
          onClick={handlePlaceOrder}
          className="w-full bg-orange-400 py-3 rounded-md font-bold hover:bg-orange-500 transition shadow-md"
        >
          Proceed to Buy
        </button>
      </div>
    </div>
  );
}
