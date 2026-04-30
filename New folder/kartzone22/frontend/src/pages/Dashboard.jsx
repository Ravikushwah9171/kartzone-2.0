import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Bookmark, History, CreditCard, User, Wallet, Sparkles, TrendingUp } from 'lucide-react';
import api from '../api/api';

const Dashboard = ({ user }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/auth/profile');
      setProfile(res.data);
    } catch (err) {
      console.error("Profile error");
    } finally {
      setLoading(false);
    }
  };

  const handleBudgetChange = async (newBudget) => {
    setProfile({ ...profile, budget: newBudget });
    try {
      await api.put('/auth/profile', { budget: newBudget });
    } catch (err) {
      console.error("Failed to save budget");
    }
  };

  if (!user) return <div className="h-screen flex items-center justify-center">Please login to view dashboard.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <div className="w-full lg:w-80 space-y-4">
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm text-center">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-4xl font-bold mx-auto mb-6">
              {user?.name?.[0] || 'U'}
            </div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-slate-500 text-sm">{user.email}</p>
          </div>

          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
            {[
              { icon: <User />, label: 'Profile', active: true },
              { icon: <Wallet />, label: 'My Budget' },
              { icon: <Bookmark />, label: 'Saved Products' },
              { icon: <History />, label: 'Search History' },
              { icon: <CreditCard />, label: 'Orders' },
              { icon: <Settings />, label: 'Settings' },
            ].map((item, i) => (
              <button 
                key={i} 
                className={`w-full flex items-center gap-4 px-8 py-5 text-sm font-bold transition-all ${
                  item.active ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className={item.active ? 'text-blue-400' : 'text-slate-400'}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-600 text-white p-8 rounded-[40px] shadow-xl shadow-blue-200">
               <div className="flex justify-between items-start mb-6">
                 <Wallet className="w-8 h-8 opacity-60" />
                 <Sparkles className="w-5 h-5 text-blue-300" />
               </div>
               <p className="text-blue-100 text-xs font-bold uppercase mb-1">Shopping Budget</p>
               <h3 className="text-3xl font-bold">₹{profile?.budget?.toLocaleString('en-IN') || '0'}</h3>
            </div>
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
               <div className="flex justify-between items-start mb-6">
                 <TrendingUp className="text-green-500 w-8 h-8" />
               </div>
               <p className="text-slate-400 text-xs font-bold uppercase mb-1">AI Savings</p>
               <h3 className="text-3xl font-bold">₹1,240</h3>
            </div>
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
               <div className="flex justify-between items-start mb-6">
                 <Bookmark className="text-purple-500 w-8 h-8" />
               </div>
               <p className="text-slate-400 text-xs font-bold uppercase mb-1">Saved Items</p>
               <h3 className="text-3xl font-bold">12</h3>
            </div>
          </div>

          {/* Budget Planner */}
          <div className="bg-white p-10 rounded-[50px] border border-slate-100 shadow-sm">
             <div className="flex justify-between items-center mb-8">
                <div>
                   <h3 className="text-2xl font-bold">Budget Planner</h3>
                   <p className="text-slate-500 text-sm">Adjust your monthly shopping goal.</p>
                </div>
                <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-2xl font-bold">
                   ₹{profile?.budget?.toLocaleString('en-IN') || '0'}
                </div>
             </div>
             
             <input 
                type="range" 
                min="1000" 
                max="100000" 
                step="500"
                value={profile?.budget || 15000}
                onChange={(e) => handleBudgetChange(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600 mb-6"
             />

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-6 rounded-3xl">
                   <p className="text-xs font-bold text-slate-400 uppercase mb-2">Can Afford</p>
                   <p className="text-lg font-bold">Redmi Note 13 Pro+</p>
                   <p className="text-xs text-green-600 font-medium mt-1">✓ Within budget</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl">
                   <p className="text-xs font-bold text-slate-400 uppercase mb-2">Savings Potential</p>
                   <p className="text-lg font-bold">₹2,500/mo</p>
                   <p className="text-xs text-blue-600 font-medium mt-1">If you wait for sale</p>
                </div>
             </div>
          </div>

          {/* AI Insights Panel */}
          <div className="bg-slate-900 text-white p-10 rounded-[50px] shadow-2xl relative overflow-hidden">
             <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Sparkles className="text-blue-400" /> Monthly AI Insights
                </h3>
                <div className="space-y-6">
                   <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-md">
                      <p className="text-sm font-medium mb-2">Shopping Pattern:</p>
                      <p className="text-slate-300 italic">"Aap mostly electronics aur gadgets mein interest dikhate hain. Agle mahine big sale aane wali hai, hum recommend karte hain thoda wait karein."</p>
                   </div>
                   <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-md">
                      <p className="text-sm font-medium mb-2">Top Recommendation for You:</p>
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center font-bold">RB</div>
                         <div>
                            <p className="font-bold">Realme Buds Air 5</p>
                            <p className="text-[10px] text-blue-300">Perfect match for your current budget.</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
