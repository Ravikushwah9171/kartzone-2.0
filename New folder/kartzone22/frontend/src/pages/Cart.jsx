import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Trash2, ChevronRight, ShieldCheck, CreditCard, MapPin, CheckCircle, Plus, Minus, Tag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [step, setStep] = useState(1);
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load from localStorage cart, or use demo items if empty
    const stored = JSON.parse(localStorage.getItem('cart') || '[]');
    if (stored.length > 0) {
      setItems(stored);
    } else {
      setItems([
        {
          _id: 'demo1',
          name: 'Samsung Galaxy S24 Ultra',
          price: 129999,
          image: 'https://images.unsplash.com/photo-1707223363066-e8220970a045?auto=format&fit=crop&q=80&w=200',
          qty: 1,
          brand: 'Samsung'
        },
        {
          _id: 'demo2',
          name: 'Sony WH-1000XM5',
          price: 29999,
          image: 'https://images.unsplash.com/photo-1618366712277-70ae533a57df?auto=format&fit=crop&q=80&w=200',
          qty: 1,
          brand: 'Sony'
        }
      ]);
    }
  }, []);

  const syncCart = (newItems) => {
    setItems(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));
  };

  const removeItem = (id) => syncCart(items.filter(i => i._id !== id));

  const changeQty = (id, delta) => {
    const updated = items.map(i => i._id === id ? { ...i, qty: Math.max(1, (i.qty || 1) + delta) } : i);
    syncCart(updated);
  };

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'KARTZONE10') {
      setCouponApplied(true);
    }
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * (item.qty || 1), 0);
  const discount = couponApplied ? Math.floor(subtotal * 0.1) : 0;
  const total = subtotal - discount;

  const nextStep = () => setStep(s => s + 1);

  const stepLabels = ['Cart', 'Shipping', 'Payment'];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-2">
          {stepLabels.map((label, i) => {
            const s = i + 1;
            return (
              <div key={s} className="flex items-center gap-2 shrink-0">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= s ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-slate-400 border border-slate-200'}`}>
                  {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                </div>
                <span className={`text-sm font-bold whitespace-nowrap ${step >= s ? 'text-slate-900' : 'text-slate-400'}`}>{label}</span>
                {s < 3 && <div className="w-12 h-px bg-slate-200 mx-1" />}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Steps */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Cart */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                  <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3 mb-6">
                    <ShoppingBag className="text-blue-600" /> My Cart
                  </h2>
                  {items.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-slate-200">
                      <ShoppingBag className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                      <p className="text-slate-500 font-medium mb-4">Your cart is empty</p>
                      <Link to="/" className="text-blue-600 font-bold hover:underline">Browse Products</Link>
                    </div>
                  ) : (
                    items.map((item) => (
                      <motion.div
                        key={item._id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-white p-6 rounded-[32px] border border-slate-100 flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                          <img
                            src={item.image}
                            className="w-full h-full object-cover"
                            alt={item.name}
                            onError={e => e.target.src = 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=200'}
                          />
                        </div>
                        <div className="flex-grow min-w-0">
                          <p className="text-xs font-bold text-slate-400 uppercase mb-1">{item.brand}</p>
                          <h3 className="font-bold text-slate-900 truncate">{item.name}</h3>
                          <p className="text-blue-600 font-black mt-1">₹{item.price?.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
                            <button onClick={() => changeQty(item._id, -1)} className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-slate-50 transition-all">
                              <Minus className="w-3 h-3 text-slate-600" />
                            </button>
                            <span className="w-6 text-center font-bold text-sm">{item.qty || 1}</span>
                            <button onClick={() => changeQty(item._id, 1)} className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-slate-50 transition-all">
                              <Plus className="w-3 h-3 text-slate-600" />
                            </button>
                          </div>
                          <button onClick={() => removeItem(item._id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </motion.div>
                    ))
                  )}

                  {/* Coupon */}
                  {items.length > 0 && (
                    <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
                      <div className="flex items-center gap-2 mb-4 text-slate-700 font-bold">
                        <Tag className="w-4 h-4" /> Apply Coupon
                      </div>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="Try: KARTZONE10"
                          className="flex-grow bg-slate-50 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-blue-500 transition-all font-mono"
                          value={coupon}
                          onChange={e => setCoupon(e.target.value)}
                        />
                        <button
                          onClick={applyCoupon}
                          className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all ${couponApplied ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                        >
                          {couponApplied ? '✓ Applied!' : 'Apply'}
                        </button>
                      </div>
                      {couponApplied && <p className="text-green-600 text-xs font-bold mt-2">🎉 10% off applied successfully!</p>}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 2: Shipping */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
                  <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3 mb-6">
                    <MapPin className="text-blue-600" /> Delivery Address
                  </h2>
                  <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {[
                        { label: 'Full Name', placeholder: 'Rahul Kumar', type: 'text' },
                        { label: 'Phone Number', placeholder: '+91 98765 43210', type: 'tel' },
                        { label: 'Email Address', placeholder: 'rahul@email.com', type: 'email' },
                        { label: 'PIN Code', placeholder: '110001', type: 'text' },
                      ].map(f => (
                        <div key={f.label} className="space-y-2">
                          <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">{f.label}</label>
                          <input type={f.type} className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 focus:ring-2 focus:ring-blue-500 transition-all" placeholder={f.placeholder} />
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Address</label>
                      <textarea className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 focus:ring-2 focus:ring-blue-500 transition-all resize-none" rows="3" placeholder="House No., Street, Area, City, State" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
                  <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3 mb-6">
                    <CreditCard className="text-blue-600" /> Payment Method
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: 'UPI', sub: 'Google Pay, PhonePe, Paytm', emoji: '📱', popular: true },
                      { label: 'Credit / Debit Card', sub: 'Visa, Mastercard, RuPay', emoji: '💳', popular: false },
                      { label: 'Net Banking', sub: 'All major banks supported', emoji: '🏦', popular: false },
                      { label: 'Cash on Delivery', sub: 'Pay when delivered', emoji: '💵', popular: false },
                    ].map((m) => (
                      <button key={m.label} className="bg-white p-6 rounded-[28px] border-2 border-slate-100 text-left hover:border-blue-500 hover:shadow-xl transition-all group relative overflow-hidden">
                        {m.popular && <div className="absolute top-3 right-3 bg-blue-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full">Popular</div>}
                        <div className="text-3xl mb-3">{m.emoji}</div>
                        <p className="font-bold text-slate-900">{m.label}</p>
                        <p className="text-xs text-slate-400 mt-1">{m.sub}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Success */}
              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16 bg-white rounded-[48px] border border-slate-100 shadow-sm px-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="w-28 h-28 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8"
                  >
                    <CheckCircle className="w-14 h-14" />
                  </motion.div>
                  <h2 className="text-4xl font-black text-slate-900 mb-4">Order Placed! 🎉</h2>
                  <p className="text-slate-500 max-w-md mx-auto mb-2">
                    Aapka order confirmation email bhej diya gaya hai.
                  </p>
                  <p className="text-slate-400 text-sm mb-8">KartZone AI delivery monitor kar raha hai.</p>
                  <div className="flex gap-4 justify-center">
                    <button onClick={() => { localStorage.removeItem('cart'); navigate('/'); }} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all">
                      Continue Shopping
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Summary */}
          {step < 4 && (
            <div className="space-y-6">
              <div className="bg-slate-900 text-white p-8 rounded-[40px] shadow-2xl">
                <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                <div className="space-y-3 mb-6">
                  {items.map(item => (
                    <div key={item._id} className="flex justify-between text-slate-400 text-sm">
                      <span className="truncate mr-2">{item.name} ×{item.qty || 1}</span>
                      <span className="text-white font-bold shrink-0">₹{(item.price * (item.qty || 1)).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                  <div className="border-t border-white/10 pt-3 flex justify-between text-slate-400">
                    <span>Shipping</span><span className="text-green-400 font-bold">FREE</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-green-400 font-bold">
                      <span>Discount (10%)</span><span>-₹{discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="border-t border-white/10 pt-3 flex justify-between text-xl font-black">
                    <span>Total</span><span className="text-blue-400">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <button
                  onClick={nextStep}
                  disabled={items.length === 0}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {step === 3 ? '🎉 Place Order' : 'Proceed'} <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-blue-900">AI Trust Guarantee</p>
                  <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                    100% Genuine products verified by KartZone AI. Secure & encrypted checkout.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
