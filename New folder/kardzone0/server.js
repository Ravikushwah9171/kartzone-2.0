require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'kartzone_secret';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kartzone';

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');

// ── Models ──────────────────────────────────────────────
const userSchema = new mongoose.Schema({
  name: String, email: { type: String, unique: true }, password: String,
  addresses: Array, role: { type: String, default: 'user' }, cart: Array
});

const productSchema = new mongoose.Schema({
  name: String, price: Number, discount: Number, rating: Number,
  category: String, subcategory: String, stock: Number,
  image: String, desc: String, specs: Array,
  priceHistory: [Number], trustScore: Number,
  reviewSummary: { pros: [String], cons: [String] },
  pricePrediction: String,
  votes: { yes: { type: Number, default: 0 }, no: { type: Number, default: 0 } },
  reviews: [{ user: String, rating: Number, comment: String, isFake: Boolean, date: Date }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
productSchema.index({ name: 'text', category: 'text', subcategory: 'text', desc: 'text' });
const Product = mongoose.model('Product', productSchema);

// ── Full 10,000 Product Advisor Generator ─────────────────
async function seedAdvisorDatabase() {
  const count = await Product.countDocuments();
  if (count >= 1000) return; // Reduced to 1000 for faster memory-server seeding
  
  console.log('⏳ Generating AI Advisor Catalog (Premium Images)...');
  await Product.deleteMany({});

  const cats = {
    'Electronics': ['TV', 'Headphones', 'Camera'],
    'Mobiles': ['Smartphones', 'Accessories'],
    'Laptops': ['Gaming', 'Office'],
    'Fashion': ['Shoes', 'Men', 'Women', 'Trending'],
    'Home Appliances': ['Fridge', 'Washing Machine', 'AC', 'Microwave'],
    'Stationery': ['Books', 'Pens']
  };

  const brands = {
    'Electronics': ['Sony', 'Samsung', 'LG', 'Canon', 'boAt'],
    'Mobiles': ['Apple', 'Samsung', 'OnePlus', 'Google'],
    'Laptops': ['Dell', 'HP', 'Apple', 'Lenovo', 'Asus'],
    'Fashion': ['Nike', 'Adidas', 'Puma', 'Zara', 'H&M'],
    'Home Appliances': ['Whirlpool', 'Samsung', 'LG', 'Haier'],
    'Stationery': ['Parker', 'Classmate', 'Luxor']
  };

  // Pre-defined premium product images
  const premiumImages = {
    'Electronics': [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80'
    ],
    'Mobiles': [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=80',
      'https://images.unsplash.com/photo-1601784551446-20c9e07cd294?w=800&q=80'
    ],
    'Laptops': [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
      'https://images.unsplash.com/photo-1531297172868-9441504a7974?w=800&q=80',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80'
    ],
    'Fashion': [
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80',
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80'
    ],
    'Home Appliances': [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&q=80'
    ],
    'Stationery': [
      'https://images.unsplash.com/photo-1568283626154-15f9d1e4c703?w=800&q=80',
      'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=800&q=80',
      'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&q=80'
    ]
  };

  const products = [];
  const categories = Object.keys(cats);

  for (let i = 1; i <= 1000; i++) {
    const cat = categories[i % categories.length];
    const sub = cats[cat][i % cats[cat].length];
    const brand = brands[cat][i % brands[cat].length];
    const price = Math.floor(Math.random() * 150000) + 500;
    
    // Pick a random premium image for the category
    const imgArray = premiumImages[cat];
    const randomImage = imgArray[Math.floor(Math.random() * imgArray.length)];
    
    products.push({
      name: `${brand} ${sub} ${100 + (i % 900)}`,
      price,
      discount: Math.floor(Math.random() * 50) + 5,
      rating: (Math.random() * 2 + 3).toFixed(1),
      category: cat,
      subcategory: sub,
      stock: Math.floor(Math.random() * 100) + 10,
      image: randomImage,
      desc: `Premium quality ${brand} ${sub} designed for excellence and durability.`,
      specs: [`Brand: ${brand}`, `Model: ${sub}-X${i}`, "Warranty: 1 Year"],
      priceHistory: Array.from({ length: 6 }, () => price + Math.floor(Math.random() * 2000 - 1000)),
      trustScore: Math.floor(Math.random() * 30) + 70,
      reviewSummary: { 
        pros: ["Great value", "Reliable performance"], 
        cons: ["Limited stock"] 
      },
      pricePrediction: i % 2 === 0 ? "Buy Now" : "Wait for Drop",
      reviews: [{ user: "AI Analyst", rating: 5, comment: "High quality verified.", isFake: false, date: new Date() }]
    });

    if (i % 500 === 0) {
      await Product.insertMany(products);
      products.length = 0;
      console.log(`✅ ${i} products seeded with real-world images...`);
    }
  }
  console.log('🚀 Premium AI Catalog Database Ready!');
}

// ── Auth Middleware ──────────────────────────────────────
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Login required' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch { res.status(401).json({ message: 'Invalid session' }); }
};

// ── API Routes ──────────────────────────────────────────
app.get('/api/products', async (req, res) => {
  const { page=1, limit=20, q, category, minDiscount, sort } = req.query;
  const filter = {};
  
  if (q) {
    filter.$or = [
      { name: { $regex: q, $options: 'i' } },
      { category: { $regex: q, $options: 'i' } },
      { subcategory: { $regex: q, $options: 'i' } }
    ];
  }
  
  if (category && category !== 'All') {
    if (category === 'Trending') {
      filter.subcategory = 'Trending';
    } else {
      filter.category = category;
    }
  }
  
  if (minDiscount) filter.discount = { $gte: parseInt(minDiscount) };
  
  let sortObj = { createdAt: -1 };
  if (sort === 'price_asc') sortObj = { price: 1 };
  else if (sort === 'price_desc') sortObj = { price: -1 };
  else if (sort === 'rating') sortObj = { rating: -1 };

  try {
    const products = await Product.find(filter).limit(limit * 1).skip((page - 1) * limit).sort(sortObj);
    const total = await Product.countDocuments(filter);
    res.json({ products, total, pages: Math.ceil(total / limit) });
  } catch (e) {
    res.status(500).json({ message: "Database Error" });
  }
});

app.get('/api/ai/recommend', async (req, res) => {
  const { query } = req.query;
  const products = await Product.find({ 
    $or: [{ name: { $regex: query, $options: 'i' } }, { category: { $regex: query, $options: 'i' } }]
  }).limit(3);
  res.json(products.map(p => ({
    ...p._doc,
    aiReason: "Top rated for performance and value in this category.",
    pros: p.reviewSummary.pros,
    cons: p.reviewSummary.cons
  })));
});

app.post('/api/admin/products', auth, upload.single('image'), async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  try {
    if (!req.file) return res.status(400).json({ message: 'Product image is required' });
    
    const { name, price, category, subcategory, desc, discount, specs, stock } = req.body;
    const p = await Product.create({
      name, 
      price: parseFloat(price), 
      category, 
      subcategory, 
      desc, 
      discount: parseInt(discount) || 0,
      image: `/uploads/${req.file.filename}`,
      rating: 5, 
      stock: parseInt(stock) || 50,
      specs: specs ? specs.split(',').map(s => s.trim()) : [],
      priceHistory: [price, price, price, price, price, price],
      trustScore: 100, 
      reviewSummary: { pros: ["New Arrival"], cons: [] },
      pricePrediction: "Buy Now"
    });
    res.json(p);
  } catch (e) { 
    console.error('Upload Error:', e.message);
    res.status(500).json({ message: 'Server error during upload: ' + e.message }); 
  }
});

// ── Group Decision & Voting ──────────────────────────────
app.post('/api/products/:id/vote', auth, async (req, res) => {
  try {
    const { vote } = req.body; // 'yes' or 'no'
    const p = await Product.findById(req.params.id);
    if (vote === 'yes') p.votes.yes += 1;
    else p.votes.no += 1;
    await p.save();
    res.json(p.votes);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

app.get('/api/products/:id/review-analysis', async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    const positive = p.reviews.filter(r => r.rating >= 4).length;
    const summary = positive > p.reviews.length / 2 
      ? "Most users loved the performance and value! ✨" 
      : "Some users have concerns about durability. ⚠️";
    res.json({ summary, trustScore: p.trustScore });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

app.get('/api/admin/analytics', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const totalProducts = await Product.countDocuments();
  const totalUsers = await User.countDocuments();
  res.json({ sales: 0, orders: 0, products: totalProducts, users: totalUsers, recentOrders: [] });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if(!user || user.password !== password) return res.status(400).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id, email, name: user.name, role: user.role }, JWT_SECRET);
  res.json({ user, token });
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

async function startServer() {
  const { MongoMemoryServer } = require('mongodb-memory-server');
  let uri = MONGO_URI;
  
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
    console.log('✅ Connected to Local MongoDB');
  } catch (err) {
    console.warn('⚠️ Local MongoDB not found. Starting In-Memory MongoDB for full backend functionality...');
    const mongod = await MongoMemoryServer.create();
    uri = mongod.getUri();
    await mongoose.connect(uri);
    console.log('✅ Connected to In-Memory MongoDB successfully!');
  }
  
  await seedAdvisorDatabase();
  app.listen(3000, () => console.log('🚀 KARTZONE Running at http://localhost:3000'));
}

startServer();

