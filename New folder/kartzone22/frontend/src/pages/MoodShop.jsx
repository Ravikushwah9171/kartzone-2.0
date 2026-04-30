import { useState } from 'react';
import { motion } from 'framer-motion';
import { Smile, Frown, Zap, Coffee, Music, Heart, ArrowRight } from 'lucide-react';
import api from '../api/api';
import { Link } from 'react-router-dom';

const MoodShop = () => {
  const [mood, setMood] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  const moods = [
    { icon: <Smile className="text-yellow-500" />, label: 'Happy', value: 'happy' },
    { icon: <Frown className="text-blue-500" />, label: 'Sad/Off', value: 'sad' },
    { icon: <Zap className="text-purple-500" />, label: 'Energetic', value: 'energetic' },
    { icon: <Coffee className="text-amber-700" />, label: 'Productive', value: 'productive' },
    { icon: <Music className="text-pink-500" />, label: 'Relaxed', value: 'relaxed' },
    { icon: <Heart className="text-red-500" />, label: 'Romantic', value: 'romantic' }
  ];

  const moodFallbacks = {
    happy: { moodMessage: "Aaj ka vibe hai Happy Shopping! 🎉", products: [] },
    sad: { moodMessage: "Kuch acha lelo — self-care zaroori hai! 🛍️", products: [] },
    energetic: { moodMessage: "Full energy mode — best gadgets for you! ⚡", products: [] },
    productive: { moodMessage: "Productivity boost ke liye best picks! 💡", products: [] },
    relaxed: { moodMessage: "Chill karo, premium comfort picks! 🌿", products: [] },
    romantic: { moodMessage: "Special someone ke liye best gifts! ❤️", products: [] },
  };

  const handleMoodSelect = async (m) => {
    setMood(m);
    setLoading(true);
    try {
      const res = await api.post('/ai/mood-shop', { mood: m });
      setRecommendations(res.data);
    } catch (err) {
      // Fallback: show mock mood message + fetch real products
      try {
        const productsRes = await api.get('/products');
        const fallback = moodFallbacks[m] || { moodMessage: "Aapke liye best picks!", products: [] };
        setRecommendations({ ...fallback, products: productsRes.data.slice(0, 3) });
      } catch {
        setRecommendations(moodFallbacks[m] || { moodMessage: "Kuch acha dhundh rahe hain...", products: [] });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 italic font-serif text-slate-800">How are you feeling today?</h1>
        <p className="text-slate-500 max-w-xl mx-auto">AI will suggest the perfect products to match your current vibe.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20">
        {moods.map((m) => (
          <motion.button
            key={m.value}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleMoodSelect(m.value)}
            className={`p-8 rounded-[32px] border transition-all flex flex-col items-center gap-4 ${
              mood === m.value 
                ? 'bg-slate-900 text-white border-slate-900 shadow-xl' 
                : 'bg-white text-slate-600 border-slate-100 hover:border-slate-300 shadow-sm'
            }`}
          >
            <div className={`p-4 rounded-2xl ${mood === m.value ? 'bg-white/20' : 'bg-slate-50'}`}>
              {m.icon}
            </div>
            <span className="font-bold">{m.label}</span>
          </motion.button>
        ))}
      </div>

      {loading && (
        <div className="text-center py-20">
          <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-500 font-medium">AI is analyzing your vibe...</p>
        </div>
      )}

      {recommendations && !loading && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-10"
        >
          <div className="bg-slate-900 text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-10">
                <Smile className="w-64 h-64" />
             </div>
             <div className="relative z-10 max-w-2xl">
                <h2 className="text-3xl font-bold mb-4">{recommendations.moodMessage}</h2>
                <p className="text-slate-400">Based on your mood, we've picked these special items to make your day even better.</p>
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendations.products.map((p) => (
              <motion.div 
                key={p._id}
                className="bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="h-64 overflow-hidden">
                  <img src={p.image} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold mb-2">{p.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-bold">₹{p.price.toLocaleString('en-IN')}</span>
                    <Link to={`/product/${p._id}`} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-all">
                      <ArrowRight className="w-5 h-5 text-slate-600" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MoodShop;
