const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const sampleProducts = [
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "The ultimate AI smartphone with 200MP camera, Snapdragon 8 Gen 3, and integrated S-Pen. Built for productivity and high-end photography.",
    price: 129999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1707223363066-e8220970a045?auto=format&fit=crop&q=80&w=800",
    brand: "Samsung",
    specifications: { ram: "12GB", storage: "256GB", display: "6.8\" Dynamic AMOLED 2X", battery: "5000mAh" },
    aiScores: { valueForMoney: 75, durability: 92, trustScore: 98, regretPrediction: "Low" },
    pros: ["Best-in-class display", "Incredible Zoom", "7 years of updates"],
    cons: ["Very expensive", "Large size can be bulky"],
    hiddenCosts: ["Charger sold separately (₹1,500)", "Screen protector recommended (₹800)"],
    priceHistory: [
      { date: new Date('2024-01-01'), price: 134999 },
      { date: new Date(), price: 129999 }
    ],
    futurePricePrediction: { predictedPrice: 119999, suggestion: "Wait" },
    reviews: [
      { user: "Vikram R.", comment: "Display is magic. Battery lasts all day.", rating: 5, isFake: false },
      { user: "Ananya S.", comment: "Camera is good but slight lag in shutter.", rating: 4, isFake: false }
    ]
  },
  {
    name: "ASUS ROG Zephyrus G14",
    description: "The gold standard for portable gaming. 14-inch powerhouse with RTX 4060 and Ryzen 9. Perfect for creators and gamers on the go.",
    price: 145999,
    category: "Electronics",
    image: "/assets/gaming_laptop.png",
    brand: "ASUS",
    specifications: { gpu: "RTX 4060", cpu: "Ryzen 9 8945HS", ram: "16GB", ssd: "1TB" },
    aiScores: { valueForMoney: 88, durability: 85, trustScore: 94, regretPrediction: "Zero" },
    pros: ["Insane portability", "OLED Display", "Great battery life for gaming"],
    cons: ["Gets quite hot", "Soldered RAM"],
    hiddenCosts: ["External cooling pad (₹1,200)"],
    priceHistory: [
      { date: new Date('2024-02-01'), price: 155999 },
      { date: new Date(), price: 145999 }
    ],
    futurePricePrediction: { predictedPrice: 145999, suggestion: "Buy Now" },
    reviews: [
      { user: "GamerPro", comment: "Best 14 inch laptop ever. Period.", rating: 5, isFake: false }
    ]
  },
  {
    name: "Sony WH-1000XM5",
    description: "Industry-leading noise cancellation. 30 hours of battery life and crystal clear calling. The choice for audiophiles and frequent travelers.",
    price: 29999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1618366712277-70ae533a57df?auto=format&fit=crop&q=80&w=800",
    brand: "Sony",
    specifications: { battery: "30h", driver: "30mm", noiseCancelling: "Yes", weight: "250g" },
    aiScores: { valueForMoney: 82, durability: 80, trustScore: 96, regretPrediction: "Low" },
    pros: ["Best ANC in class", "Lightweight", "Multipoint connection"],
    cons: ["Doesn't fold", "Case is bulky"],
    hiddenCosts: ["None"],
    priceHistory: [
      { date: new Date('2024-01-15'), price: 32999 },
      { date: new Date(), price: 29999 }
    ],
    futurePricePrediction: { predictedPrice: 26999, suggestion: "Wait" },
    reviews: []
  },
  {
    name: "Philips Air Fryer XL",
    description: "Cook healthy with up to 90% less fat. 6.2L capacity, perfect for a family of 5. Smart Sensing technology for perfect results.",
    price: 8999,
    category: "Home Appliances",
    image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=800",
    brand: "Philips",
    specifications: { capacity: "6.2L", power: "2000W", presets: "7" },
    aiScores: { valueForMoney: 95, durability: 90, trustScore: 98, regretPrediction: "Zero" },
    pros: ["Healthier cooking", "Easy to clean", "Large capacity"],
    cons: ["Large footprint", "Learning curve for some recipes"],
    hiddenCosts: ["Parchment paper liners (₹300/mo)"],
    priceHistory: [
      { date: new Date('2024-03-01'), price: 10999 },
      { date: new Date(), price: 8999 }
    ],
    futurePricePrediction: { predictedPrice: 8999, suggestion: "Buy Now" },
    reviews: []
  },
  {
    name: "Boat Stone 650 Speaker",
    description: "Portable Bluetooth speaker with 10W output and 7 hours playback. Rugged design for outdoor adventures.",
    price: 1599,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1608156639585-34052e81c99f?auto=format&fit=crop&q=80&w=800",
    brand: "boAt",
    aiScores: { valueForMoney: 88, durability: 80, trustScore: 85, regretPrediction: "Low" },
    pros: ["Heavy bass", "Water resistant", "Rugged build"],
    cons: ["Charging takes time", "No AUX cable included"],
    hiddenCosts: ["Micro USB charger (if you don't have one)"],
    priceHistory: [{ date: new Date(), price: 1599 }],
    futurePricePrediction: { predictedPrice: 1499, suggestion: "Buy Now" },
    reviews: []
  }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/kartzone')
  .then(async () => {
    console.log('Connected to MongoDB for seeding...');
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log('✅ Seeded database successfully!');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
