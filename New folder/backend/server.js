const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const stripe = require('stripe');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// --- Mock Database (In-Memory Fallback) ---
let usersMock = [];
let ordersMock = [];
const products = [
    { 
        id: 'p1', name: 'Apple iPhone 15 Pro Max (256GB)', price: 159900, rating: 4.8, category: 'Electronics', 
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80', 
        desc: 'Titanium design with A17 Pro chip and Action button.', specs: ['A17 Pro', 'Titanium build', '48MP Camera'], 
        isWearable: false, tag: 'Trending', trustScore: 98, ecoScore: 7, pricePrediction: 'Wait (Drops in Oct)', hiddenCosts: 'Charger adapter not included.', regretRisk: 'Low', emotionTags: ['productive', 'professional', 'premium']
    },
    { 
        id: 'p2', name: 'Sony WH-1000XM5 Wireless ANC Headphones', price: 29990, rating: 4.7, category: 'Electronics', 
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80', 
        desc: 'Industry-leading noise canceling over-ear headphones.', specs: ['Wireless', '30-hour battery', 'Noise Canceling'], 
        isWearable: true, tag: 'Recommended', trustScore: 92, ecoScore: 6, pricePrediction: 'Buy Now', hiddenCosts: 'None', regretRisk: 'Low', emotionTags: ['relaxed', 'focus', 'music']
    },
    { 
        id: 'p3', name: 'Ray-Ban Classic Wayfarer Sunglasses', price: 12500, rating: 4.6, category: 'Fashion', 
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80', 
        desc: 'Iconic sunglasses featuring a classic shape.', specs: ['Polarized', 'UV Protection', 'Acetate Frame'], 
        isWearable: true, tag: 'Trending', trustScore: 88, ecoScore: 5, pricePrediction: 'Buy Now', hiddenCosts: 'Premium cleaning kit sold separately.', regretRisk: 'Medium', emotionTags: ['stylish', 'cool']
    },
    { 
        id: 'p4', name: 'Samsung Galaxy S24 Ultra (512GB)', price: 129999, rating: 4.9, category: 'Electronics', 
        image: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?w=800&q=80', 
        desc: 'Epic smartphone powered by Galaxy AI.', specs: ['Snapdragon 8 Gen 3', '200MP Camera', 'S Pen Included'], 
        isWearable: false, tag: 'Recommended', trustScore: 95, ecoScore: 6, pricePrediction: 'Wait (Price High)', hiddenCosts: 'Charger brick not in box (costs ₹1500).', regretRisk: 'Low', emotionTags: ['excited', 'techy']
    },
    { 
        id: 'p5', name: 'Poco X5 Pro 5G (Gaming Focus)', price: 19999, rating: 4.3, category: 'Electronics', 
        image: 'https://images.unsplash.com/photo-1598327105666-5b89351cb31b?w=800&q=80', 
        desc: 'Best budget gaming phone with solid camera.', specs: ['Snapdragon 778G', '120Hz AMOLED', '108MP Camera'], 
        isWearable: false, tag: 'Trending', trustScore: 78, ecoScore: 4, pricePrediction: 'Buy Now', hiddenCosts: 'Contains pre-installed bloatware apps.', regretRisk: 'Medium', emotionTags: ['gaming', 'budget', 'excited']
    }
];
let isUsingMockDB = false;

// --- Database Connection ---
const MONGODB_URI = process.env.MONGODB_URI;
const DB_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const connectDB = async () => {
    try {
        const uri = (!MONGODB_URI || MONGODB_URI.includes('<username>')) 
            ? 'mongodb://localhost:27017/kartzone' 
            : MONGODB_URI;
        
        await mongoose.connect(uri, DB_OPTIONS);
        console.log(`✅ Connected to MongoDB: ${uri.includes('localhost') ? 'Local' : 'Atlas'}`);
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err.message);
        console.log('⚠️ WARNING: MongoDB not found. Falling back to In-Memory Mock Database.');
        console.log('💡 Note: Data will be lost when the server restarts.');
        isUsingMockDB = true;
    }
};
connectDB();

// --- Stripe Initialization ---
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock_key');

// --- Models ---
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
});

const OrderSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.Mixed, // Supports ObjectId or String ID
    items: Array,
    total: Number,
    paymentStatus: String,
    paymentId: String,
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
const Order = mongoose.model('Order', OrderSchema);

// --- Auth Middleware ---
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// --- API Routes ---

// 1. Auth: Signup
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (isUsingMockDB) {
            if (usersMock.find(u => u.email === email)) return res.status(400).json({ message: 'Email already exists' });
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = { _id: Date.now().toString(), name, email, password: hashedPassword, orders: [] };
            usersMock.push(user);
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '7d' });
            return res.status(201).json({ token, user: { name: user.name, email: user.email } });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '7d' });
        res.status(201).json({ token, user: { name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: 'Error creating account', error: err.message });
    }
});

// 2. Auth: Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = isUsingMockDB 
            ? usersMock.find(u => u.email === email)
            : await User.findOne({ email });

        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id || user.id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '7d' });
        res.json({ token, user: { name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// 3. Orders: Place Order
app.post('/api/orders', authenticate, async (req, res) => {
    try {
        const { items, total, paymentId } = req.body;
        
        if (isUsingMockDB) {
            const order = { 
                _id: 'ORD' + Date.now(),
                userId: req.userId, 
                items, 
                total, 
                paymentStatus: 'Success', 
                paymentId: paymentId || 'manual_pay',
                createdAt: new Date()
            };
            ordersMock.push(order);
            return res.status(201).json({ message: 'Order placed successfully (Mock)', orderId: order._id });
        }

        const order = new Order({ 
            userId: req.userId, 
            items, 
            total, 
            paymentStatus: 'Success', 
            paymentId: paymentId || 'manual_pay' 
        });
        await order.save();
        await User.findByIdAndUpdate(req.userId, { $push: { orders: order._id } });
        
        res.status(201).json({ message: 'Order placed successfully', orderId: order._id });
    } catch (err) {
        res.status(500).json({ message: 'Order error', error: err.message });
    }
});

// 4. Orders: Fetch User Orders
app.get('/api/orders', authenticate, async (req, res) => {
    try {
        if (isUsingMockDB) {
            const orders = ordersMock.filter(o => o.userId === req.userId);
            return res.json(orders);
        }
        const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching orders', error: err.message });
    }
});

// 5. Products: Fetch All Products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// 6. Products: Fetch Single Product
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
});

// Root route: Interactive API Explorer
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>KARTZONE | API Explorer</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; padding: 40px; background: #f4f7f6; color: #333; }
                .container { max-width: 800px; margin: auto; background: white; padding: 30px; border-radius: 12px; shadow: 0 4px 6px rgba(0,0,0,0.1); }
                h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
                .endpoint { background: #eef2f3; padding: 15px; border-radius: 8px; margin-bottom: 15px; border-left: 5px solid #3498db; }
                .method { font-weight: bold; color: #e67e22; margin-right: 10px; }
                .url { font-family: monospace; color: #2980b9; }
                .btn { display: inline-block; background: #3498db; color: white; padding: 8px 16px; border-radius: 4px; text-decoration: none; margin-top: 10px; transition: 0.3s; }
                .btn:hover { background: #2980b9; }
                .status { color: #27ae60; font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🚀 KARTZONE Backend API Explorer</h1>
                <p>Status: <span class="status">ONLINE</span> | Port: 5000</p>
                <p>This backend provides the data and logic for your KARTZONE application. You can test the endpoints below.</p>
                
                <div class="endpoint">
                    <span class="method">GET</span> <span class="url">/api/products</span>
                    <p>Fetch all available products in the inventory.</p>
                    <a href="/api/products" class="btn">Test Endpoint →</a>
                </div>

                <div class="endpoint">
                    <span class="method">POST</span> <span class="url">/api/auth/signup</span>
                    <p>Register a new user account. (Requires JSON body)</p>
                </div>

                <div class="endpoint">
                    <span class="method">POST</span> <span class="url">/api/auth/login</span>
                    <p>Authenticate and receive a JWT token. (Requires JSON body)</p>
                </div>

                <div class="endpoint">
                    <span class="method">GET</span> <span class="url">/api/orders</span>
                    <p>Fetch order history for the logged-in user. (Requires Auth Token)</p>
                </div>

                <p style="margin-top:30px; font-size:0.9rem; color:#7f8c8d;">
                    Note: To use POST endpoints or protected GETs, use a tool like Postman or the integrated KARTZONE Frontend.
                </p>
            </div>
        </body>
        </html>
    `);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 Backend APIs active at http://localhost:${PORT}/api`);
});

