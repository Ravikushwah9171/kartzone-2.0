import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Bot } from 'lucide-react';
import api from '../api/api';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Namaste! 🙏 Main hoon KartZone AI. Aapke budget aur zarurat ke hisaab se best product dhundne mein help kar sakta hoon. Poochiye kya chahiye?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await api.post('/ai/assistant', { 
        query: input,
        budget: 15000 // Mock budget or fetch from user profile
      });
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.data.answer,
        suggestions: response.data.suggestedProducts
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, thodi problem ho gayi. Please try again!' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-2xl w-[350px] sm:w-[400px] h-[500px] mb-4 flex flex-col border border-slate-100 overflow-hidden"
          >
            {/* Header */}
            <div className="premium-gradient p-4 flex justify-between items-center">
              <div className="flex items-center gap-2 text-white">
                <div className="bg-white/20 p-1.5 rounded-lg">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">KartZone AI Assistant</h3>
                  <p className="text-[10px] opacity-80">Always active for you</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-3 text-sm shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                  }`}>
                    {msg.content}
                    
                    {msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Recommended Products:</p>
                        {msg.suggestions.map((p, i) => (
                          <div key={i} className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                            <img src={p.image} className="w-8 h-8 rounded object-cover" alt="" />
                            <span className="text-xs font-medium truncate">{p.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-tl-none p-3 shadow-sm border border-slate-100">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-75"></div>
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-100 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask anything (e.g. Best phone under 15k)"
                  className="flex-grow bg-slate-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 transition-all"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button 
                  onClick={handleSend}
                  className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="premium-gradient p-4 rounded-full shadow-2xl text-white flex items-center gap-2 group overflow-hidden"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="max-w-0 group-hover:max-w-[100px] transition-all duration-300 overflow-hidden whitespace-nowrap text-sm font-medium">
          Ask AI
        </span>
      </motion.button>
    </div>
  );
};

export default AIAssistant;
