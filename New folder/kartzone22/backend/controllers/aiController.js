const OpenAI = require('openai');
const Product = require('../models/Product');

const openai = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_key_here' 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) 
  : null;

exports.getAssistantResponse = async (req, res) => {
  try {
    const { query, budget, preferences } = req.body;

    // Search for relevant products in DB to provide context to AI
    const products = await Product.find({
      $or: [
        { name: { $regex: query.split(' ').join('|'), $options: 'i' } },
        { category: { $regex: query.split(' ').join('|'), $options: 'i' } }
      ]
    }).limit(3);

    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_key_here') {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are 'KartZone AI', a helpful shopping assistant for middle-class Indian users. Respond in a friendly mix of Hindi and English (Hinglish). Focus on value for money, durability, and practical advice. Use the provided product data if available."
          },
          {
            role: "user",
            content: `User Query: ${query}\nBudget: ${budget}\nProducts found: ${JSON.stringify(products)}`
          }
        ],
      });

      return res.json({
        answer: completion.choices[0].message.content,
        suggestedProducts: products
      });
    } else {
      // Mock AI Response for Demo
      const mockResponse = `Ji bilkul! ₹${budget || 'budget'} ke range mein aapke liye best options dhund liye hain. ${products.length > 0 ? products[0].name + ' ek bahut accha choice hai.' : 'Filhal specific results nahi mile, par aap category filter use kar sakte hain.'} Yeh durable bhi hai aur value for money bhi. Kya main iske pros and cons batau?`;
      
      return res.json({
        answer: mockResponse,
        suggestedProducts: products
      });
    }
  } catch (error) {
    res.status(500).json({ message: "AI Assistant Error", error: error.message });
  }
};

exports.getMoodRecommendations = async (req, res) => {
  try {
    const { mood } = req.body;
    let category = 'Lifestyle';
    
    if (mood.toLowerCase().includes('sad') || mood.toLowerCase().includes('off')) {
      category = 'Self-care';
    } else if (mood.toLowerCase().includes('happy')) {
      category = 'Entertainment';
    }

    const products = await Product.find({ category: { $regex: category, $options: 'i' } }).limit(4);
    
    res.json({
      moodMessage: `Hum samajhte hain aapka mood ${mood} hai. Thoda self-care ho jaye?`,
      products
    });
  } catch (error) {
    res.status(500).json({ message: "Mood Shop Error" });
  }
};

exports.getProductAIInsights = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    
    res.json({
      aiScores: product.aiScores,
      pricePrediction: product.futurePricePrediction,
      trustAnalysis: {
        fakeReviews: product.reviews.filter(r => r.isFake).length,
        genuineReviews: product.reviews.filter(r => !r.isFake).length,
        trustScore: product.aiScores.trustScore
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Insights Error" });
  }
};
