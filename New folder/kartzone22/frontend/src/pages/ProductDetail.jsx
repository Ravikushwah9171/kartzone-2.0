import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, AlertTriangle, TrendingDown, Clock, 
  ThumbsUp, ThumbsDown, Info, ShoppingCart, ArrowLeft,
  ChevronRight, BarChart3, AlertCircle, Heart, Star,
  Package, Truck, RotateCcw, Zap, CheckCircle2
} from 'lucide-react';
import api from '../api/api';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [addedToCart, setAddedToCart] = useState(false);
  const [wishlist, setWishlist] = useState(false);

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(i => i._id === product._id);
    if (!existing) {
      cart.push({ ...product, qty: 1 });
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    setTimeout(() => setAddedToCart(false), 2500);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-slate-500 font-medium animate-pulse">Loading AI Insights...</p>
      </div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <p className="text-2xl font-bold text-slate-800">Product Not Found</p>
        <button onClick={() => navigate('/')} className="text-blue-600 font-medium hover:underline">Back to Home</button>
      </div>
    </div>
  );

  const avgRating = product.reviews?.length
    ? (product.reviews.reduce((a, r) => a + r.rating, 0) / product.reviews.length).toFixed(1)
    : '4.5';

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Products
        </button>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-[48px] p-8 lg:p-12 shadow-sm border border-slate-100">
          {/* LEFT: Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square rounded-[36px] overflow-hidden bg-slate-100"
            >
              <img
                src={product.image}
                className="w-full h-full object-cover"
                alt={product.name}
                onError={e => e.target.src = 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=800'}
              />
              <button
                onClick={() => setWishlist(!wishlist)}
                className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-lg transition-all hover:scale-110"
              >
                <Heart className={`w-6 h-6 transition-colors ${wishlist ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
              </button>
              {product.futurePricePrediction?.suggestion === 'Buy Now' && (
                <div className="absolute top-6 left-6 bg-green-500 text-white px-4 py-2 rounded-2xl text-xs font-bold uppercase shadow-lg">
                  🔥 Hot Deal
                </div>
              )}
            </motion.div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-4 gap-3">
              {[...Array(4)].map((_, n) => (
                <div key={n} className={`aspect-square rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${n === 0 ? 'border-blue-500' : 'border-slate-100 hover:border-slate-300'}`}>
                  <img
                    src={product.image}
                    className="w-full h-full object-cover"
                    alt=""
                    onError={e => e.target.src = 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=800'}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Info */}
          <div className="space-y-6 flex flex-col">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">{product.brand}</span>
              <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">{product.category}</span>
              <span className="bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> AI Verified
              </span>
            </div>

            {/* Name + Rating */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight mb-3">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(avgRating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200 fill-slate-200'}`} />
                  ))}
                  <span className="text-sm font-bold text-slate-700 ml-1">{avgRating}</span>
                </div>
                <span className="text-sm text-slate-400">({product.reviews?.length || 0} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-end gap-4">
              <p className="text-4xl font-black text-slate-900">₹{product.price?.toLocaleString('en-IN')}</p>
              {product.priceHistory?.length > 1 && (
                <div className="pb-1 text-sm text-green-600 font-bold flex items-center gap-1 bg-green-50 px-3 py-1.5 rounded-xl">
                  <TrendingDown className="w-4 h-4" />
                  Was ₹{product.priceHistory[0]?.price?.toLocaleString('en-IN')}
                </div>
              )}
            </div>

            {/* AI Score Strip */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Value', value: product.aiScores?.valueForMoney, color: 'blue' },
                { label: 'Trust', value: product.aiScores?.trustScore, color: 'green' },
                { label: 'Durability', value: product.aiScores?.durability, color: 'purple' },
              ].map(s => (
                <div key={s.label} className={`bg-${s.color}-50 p-4 rounded-2xl text-center border border-${s.color}-100`}>
                  <p className={`text-2xl font-black text-${s.color}-700`}>{s.value}%</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            <p className="text-slate-600 leading-relaxed">{product.description}</p>

            {/* Delivery Info */}
            <div className="bg-slate-50 rounded-2xl p-4 space-y-3">
              {[
                { icon: <Truck className="w-4 h-4 text-green-500" />, text: 'Free Delivery on this product' },
                { icon: <RotateCcw className="w-4 h-4 text-blue-500" />, text: '10-day easy return policy' },
                { icon: <Package className="w-4 h-4 text-purple-500" />, text: 'Secure packaging guaranteed' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-slate-600">
                  {item.icon} {item.text}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 pt-2 mt-auto">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className={`flex-grow h-16 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-xl ${addedToCart ? 'bg-green-500 shadow-green-200' : 'bg-slate-900 hover:bg-blue-600 shadow-slate-200'}`}
              >
                <AnimatePresence mode="wait">
                  {addedToCart ? (
                    <motion.span key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-white">
                      <CheckCircle2 className="w-6 h-6" /> Added to Cart!
                    </motion.span>
                  ) : (
                    <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-white">
                      <ShoppingCart className="w-6 h-6" /> Add to Cart
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
              <button className="w-16 h-16 rounded-2xl bg-blue-50 border-2 border-blue-100 flex items-center justify-center hover:bg-blue-100 transition-all">
                <Zap className="w-6 h-6 text-blue-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl w-fit mb-8">
            {['overview', 'specs', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-xl text-sm font-bold capitalize transition-all ${activeTab === tab ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Price Predictor */}
                <div className="md:col-span-1 bg-slate-900 text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10"><Clock className="w-32 h-32" /></div>
                  <div className="relative z-10">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">AI Price Predictor</h3>
                    <p className="text-slate-300 text-xs mb-2">Predicted Low Price</p>
                    <p className="text-4xl font-black mb-4">₹{product.futurePricePrediction?.predictedPrice?.toLocaleString('en-IN')}</p>
                    <span className={`px-5 py-2 rounded-full text-sm font-bold ${product.futurePricePrediction?.suggestion === 'Buy Now' ? 'bg-green-500' : 'bg-yellow-500 text-slate-900'}`}>
                      {product.futurePricePrediction?.suggestion === 'Buy Now' ? '✅ Buy Now' : '⏳ Wait for Sale'}
                    </span>
                    <p className="text-slate-400 text-xs mt-4 leading-relaxed">
                      {product.futurePricePrediction?.suggestion === 'Wait'
                        ? "Price thoda aur girne wala hai. 15–30 din wait karein."
                        : "Price stable hai aur badhne wala hai. Abhi lena best rahega!"}
                    </p>
                  </div>
                </div>

                {/* Pros & Cons */}
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white p-8 rounded-[40px] border border-slate-100 space-y-4">
                    <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                      <ThumbsUp className="w-5 h-5" /> Why people love it
                    </div>
                    <ul className="space-y-3">
                      {product.pros?.map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <ChevronRight className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white p-8 rounded-[40px] border border-slate-100 space-y-4">
                    <div className="flex items-center gap-2 text-red-500 font-bold text-sm">
                      <ThumbsDown className="w-5 h-5" /> Hidden Realities
                    </div>
                    <ul className="space-y-3">
                      {product.cons?.map((c, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" /> {c}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Hidden Costs */}
                  <div className="sm:col-span-2 bg-orange-50 p-6 rounded-3xl border border-orange-100 flex items-start gap-4">
                    <div className="bg-white p-3 rounded-2xl shadow-sm text-orange-500 shrink-0"><Info className="w-5 h-5" /></div>
                    <div>
                      <h3 className="font-bold text-orange-900 mb-1">Hidden Cost Detector</h3>
                      <p className="text-sm text-orange-700">{product.hiddenCosts?.join(' • ')}</p>
                    </div>
                  </div>

                  {/* Trust Score Ring */}
                  <div className="sm:col-span-2 bg-white p-8 rounded-[40px] border border-slate-100 flex items-center gap-8">
                    <div className="relative w-32 h-32 shrink-0">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-100" />
                        <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="10" fill="transparent"
                          strokeDasharray={352} strokeDashoffset={352 - (352 * (product.aiScores?.trustScore || 0)) / 100}
                          className="text-blue-500 transition-all duration-1000" strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-black text-slate-900">{product.aiScores?.trustScore}%</span>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Trust</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-slate-900 mb-2">Review Trust Score</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        Humne 1000+ reviews scan kiye bots aur fake sellers ko filter karne ke liye. Yeh score genuine user feedback pe based hai.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'specs' && (
              <motion.div key="specs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-sm">
                  {product.specifications && Object.keys(product.specifications).length > 0 ? (
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                          <th className="text-left py-5 px-8 text-xs font-black text-slate-400 uppercase tracking-widest w-1/3">Specification</th>
                          <th className="text-left py-5 px-8 text-xs font-black text-slate-400 uppercase tracking-widest">Value</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {Object.entries(product.specifications).map(([key, val]) => (
                          <tr key={key} className="hover:bg-slate-50 transition-colors">
                            <td className="py-5 px-8 text-sm font-bold text-slate-500 capitalize">{key}</td>
                            <td className="py-5 px-8 text-sm font-bold text-slate-900">{String(val)}</td>
                          </tr>
                        ))}
                        <tr className="hover:bg-slate-50"><td className="py-5 px-8 text-sm font-bold text-slate-500">Brand</td><td className="py-5 px-8 text-sm font-bold text-slate-900">{product.brand}</td></tr>
                        <tr className="hover:bg-slate-50"><td className="py-5 px-8 text-sm font-bold text-slate-500">Category</td><td className="py-5 px-8 text-sm font-bold text-slate-900">{product.category}</td></tr>
                        <tr className="hover:bg-slate-50"><td className="py-5 px-8 text-sm font-bold text-slate-500">Regret Prediction</td>
                          <td className="py-5 px-8">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.aiScores?.regretPrediction === 'Zero' || product.aiScores?.regretPrediction === 'Low' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                              {product.aiScores?.regretPrediction}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-center py-16 text-slate-400">
                      <BarChart3 className="w-10 h-10 mx-auto mb-3 opacity-30" />
                      <p>No detailed specifications available.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div key="reviews" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                {product.reviews?.length > 0 ? product.reviews.map((r, i) => (
                  <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {r.user?.[0] || 'A'}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{r.user}</p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, si) => (
                              <Star key={si} className={`w-3 h-3 ${si < r.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200 fill-slate-200'}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      {r.isFake && (
                        <span className="bg-red-50 text-red-500 px-3 py-1 rounded-full text-xs font-bold border border-red-100">
                          ⚠️ AI: Suspicious Review
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{r.comment}</p>
                  </div>
                )) : (
                  <div className="text-center py-16 bg-white rounded-[40px] border border-slate-100">
                    <Star className="w-10 h-10 mx-auto mb-3 text-slate-200 fill-slate-200" />
                    <p className="text-slate-500 font-medium">No reviews yet. Be the first!</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
