const Product = require('../models/Product');

const mockProducts = [
  {
    _id: "mock1",
    name: "Samsung Galaxy S24 Ultra",
    description: "The ultimate AI smartphone with 200MP camera, Snapdragon 8 Gen 3, and integrated S-Pen.",
    price: 129999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1707223363066-e8220970a045?auto=format&fit=crop&q=80&w=800",
    brand: "Samsung",
    aiScores: { valueForMoney: 75, durability: 92, trustScore: 98, regretPrediction: "Low" },
    pros: ["Best-in-class display", "Incredible Zoom", "7 years of updates"],
    cons: ["Very expensive", "Large size can be bulky"],
    hiddenCosts: ["Charger sold separately (₹1,500)"],
    futurePricePrediction: { predictedPrice: 119999, suggestion: "Wait" }
  },
  {
    _id: "mock2",
    name: "ASUS ROG Zephyrus G14",
    description: "The gold standard for portable gaming. 14-inch powerhouse with RTX 4060 and Ryzen 9.",
    price: 145999,
    category: "Electronics",
    image: "/assets/gaming_laptop.png",
    brand: "ASUS",
    aiScores: { valueForMoney: 88, durability: 85, trustScore: 94, regretPrediction: "Zero" },
    pros: ["Insane portability", "OLED Display", "Great battery life"],
    cons: ["Gets quite hot", "Soldered RAM"],
    hiddenCosts: ["External cooling pad (₹1,200)"],
    futurePricePrediction: { predictedPrice: 145999, suggestion: "Buy Now" }
  }
];

exports.getProducts = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, brand } = req.query;
    let query = {};
    
    if (category && category !== 'All') query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };
    if (brand) query.brand = brand;

    let products = await Product.find(query);
    
    // Fallback to mock data if DB is empty or disconnected
    if (products.length === 0 && !search && (!category || category === 'All')) {
      products = mockProducts;
    }

    res.json(products);
  } catch (error) {
    console.error("DB Error, using mock data fallback");
    res.json(mockProducts);
  }
};

exports.getProductById = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      product = mockProducts.find(p => p._id === req.params.id);
    }
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    const product = mockProducts.find(p => p._id === req.params.id);
    if (product) return res.json(product);
    res.status(500).json({ message: 'Error fetching product' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product' });
  }
};
