import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ShieldCheck, Zap, ArrowRight, Heart, Sparkles } from 'lucide-react';
import api from '../api/api';
import { Link, useLocation } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const location = useLocation();

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, location.search]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const searchParams = new URLSearchParams(location.search);
      const searchTerm = searchParams.get('search') || '';
      
      let url = `/products?category=${selectedCategory === 'All' ? '' : selectedCategory}`;
      if (searchTerm) url += `&search=${searchTerm}`;
      
      const response = await api.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section */}
      <section className="relative h-[550px] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <img 
            src="/assets/kartzone_hero_banner_1777484692313.png" 
            className="w-full h-full object-cover opacity-60" 
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-blue-500/20 text-blue-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 inline-block border border-blue-500/30">
              Bharat's Smartest Shopping App
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Aapka <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Personal AI</span> Shopping Expert.
            </h1>
            <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Compare prices, find genuine reviews, and get value-for-money advice in Hinglish.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2">
                Start AI Search <ArrowRight className="w-5 h-5" />
              </button>
              <Link to="/mood-shop" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg backdrop-blur-md transition-all">
                Mood Based Shop
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {['₹10k me gaming phone', 'Best Mixer Grinder', 'Wait for Diwali Sale?', 'Budget ANC Headphones'].map((text) => (
                <button 
                  key={text}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white px-4 py-2 rounded-xl text-xs font-medium transition-all backdrop-blur-sm"
                >
                  {text}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <TrendingUp className="text-blue-500" />, title: "Price Predictor", desc: "AI tells you if you should Buy Now or Wait for sale." },
          { icon: <ShieldCheck className="text-green-500" />, title: "Trust Score", desc: "No more fake reviews. We analyze reality for you." },
          { icon: <Zap className="text-yellow-500" />, title: "Value for Money", desc: "We calculate durability and hidden costs instantly." }
        ].map((f, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
          >
            <div className="bg-slate-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
              {f.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Product Feed */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">AI-Selected for You</h2>
            <p className="text-slate-500">Based on value score, durability, and Bharat's market trends.</p>
          </div>
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
            {['All', 'Electronics', 'Home Appliances', 'Accessories'].map((cat) => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 ${
                  selectedCategory === cat 
                    ? 'bg-white shadow-sm text-blue-600' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(n => (
              <div key={n} className="h-[450px] bg-slate-200 animate-pulse rounded-[40px]"></div>
            ))}
          </div>
        ) : (
          <>
            {products.length === 0 ? (
              <div className="text-center py-20 bg-slate-50 rounded-[40px] border border-dashed border-slate-200">
                <p className="text-slate-400 font-medium">No products found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((p, idx) => (
                  <motion.div 
                    key={p._id || idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group bg-white rounded-[40px] border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
                  >
                    <div className="relative h-72 overflow-hidden">
                      <img 
                        src={p.image} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        alt={p.name} 
                        onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=800'}
                      />
                      <div className="absolute top-6 right-6 flex flex-col gap-2">
                        <button className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-sm text-slate-400 hover:text-red-500 hover:scale-110 transition-all">
                          <Heart className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="absolute bottom-6 left-6">
                        <div className="bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-bold px-4 py-2 rounded-xl uppercase tracking-wider shadow-lg">
                          {p.aiScores?.valueForMoney}% Value Score
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-xl group-hover:text-blue-600 transition-colors leading-tight">{p.name}</h3>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl font-black text-slate-900">₹{p.price.toLocaleString('en-IN')}</span>
                        {p.priceHistory?.length > 1 && p.price < p.priceHistory[0].price && (
                           <span className="text-sm text-green-500 font-bold flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-lg">
                             <TrendingUp className="w-3 h-3" /> Price Drop
                           </span>
                        )}
                      </div>
                      <p className="text-slate-500 text-sm line-clamp-2 mb-6 leading-relaxed flex-grow">{p.description}</p>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-grow bg-slate-100 h-2 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${p.aiScores?.trustScore}%` }}
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full" 
                            ></motion.div>
                          </div>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{p.aiScores?.trustScore}% Trust</span>
                        </div>

                        <Link 
                          to={`/product/${p._id}`}
                          className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all hover:gap-4 shadow-lg shadow-slate-200"
                        >
                          View AI Insights <ArrowRight className="w-5 h-5" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {/* AI Newsletter / Banner */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-[50px] p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-10">
             <Sparkles className="w-64 h-64" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl font-bold mb-4">Aapka Budget, Hamari Intelligence.</h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Join 50,000+ smart shoppers receiving AI alerts on price drops and hidden product defects. Bilkul free!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 w-full"
              />
              <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-all whitespace-nowrap shadow-xl">
                Get Early Alerts
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
