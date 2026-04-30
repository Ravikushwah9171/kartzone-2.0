const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: String,
  comment: String,
  rating: Number,
  isFake: { type: Boolean, default: false },
  aiAnalysis: String
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  brand: String,
  specifications: mongoose.Schema.Types.Mixed,
  
  // AI Insights
  aiScores: {
    valueForMoney: { type: Number, min: 0, max: 100 },
    durability: { type: Number, min: 0, max: 100 },
    trustScore: { type: Number, min: 0, max: 100 },
    regretPrediction: { type: String } // e.g., "Low", "Medium", "High"
  },
  
  pros: [String],
  cons: [String],
  hiddenCosts: [String],
  
  priceHistory: [{
    date: { type: Date, default: Date.now },
    price: Number
  }],
  
  futurePricePrediction: {
    predictedPrice: Number,
    suggestion: { type: String, enum: ['Buy Now', 'Wait'] }
  },
  
  reviews: [reviewSchema]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
