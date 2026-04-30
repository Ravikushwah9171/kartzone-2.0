/* ================= DATA LAYER (Advanced AI Metadata) ================= */
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
    },
    { 
        id: 'p6', name: 'Premium Swiss Chocolate Box', price: 1500, rating: 4.9, category: 'Home', 
        image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&q=80', 
        desc: 'A comforting box of assorted premium chocolates.', specs: ['24 pieces', 'Dark & Milk', 'Handcrafted'], 
        isWearable: false, tag: 'Recommended', trustScore: 99, ecoScore: 8, pricePrediction: 'Buy Now', hiddenCosts: 'None', regretRisk: 'Very Low', emotionTags: ['sad', 'mood off', 'comforting']
    },
    {
        id: 'p7', name: 'Nike Air Force 1 Sneakers', price: 8495, rating: 4.8, category: 'Fashion', 
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80', 
        desc: 'Classic streetwear sneakers with comfortable cushioning.', specs: ['Leather upper', 'Rubber sole', 'Classic fit'], 
        isWearable: true, tag: 'Trending', trustScore: 94, ecoScore: 4, pricePrediction: 'Wait (Upcoming Sale)', hiddenCosts: 'None', regretRisk: 'Low', emotionTags: ['stylish', 'comfortable']
    },
    {
        id: 'p8', name: 'Dyson V15 Detect Cordless Vacuum', price: 74900, rating: 4.7, category: 'Home', 
        image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&q=80', 
        desc: 'Powerful, intelligent cordless vacuum with laser illumination.', specs: ['Laser detection', '60 min runtime', 'HEPA filter'], 
        isWearable: false, tag: 'Recommended', trustScore: 91, ecoScore: 7, pricePrediction: 'Buy Now', hiddenCosts: 'Extra attachments cost ₹5000+.', regretRisk: 'Low', emotionTags: ['clean', 'productive']
    },
    {
        id: 'p9', name: 'Levi\'s Men\'s 511 Slim Fit Jeans', price: 2599, rating: 4.5, category: 'Fashion', 
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80', 
        desc: 'A modern slim with room to move.', specs: ['Stretch denim', 'Zip fly', '5-pocket styling'], 
        isWearable: true, tag: 'Trending', trustScore: 89, ecoScore: 5, pricePrediction: 'Buy Now', hiddenCosts: 'None', regretRisk: 'Low', emotionTags: ['casual', 'comfortable']
    },
    {
        id: 'p10', name: 'Philips Essential Air Fryer', price: 6999, rating: 4.6, category: 'Home', 
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80', 
        desc: 'Healthy frying with Rapid Air Technology.', specs: ['4.1L Capacity', 'NutriU App', 'Auto shut-off'], 
        isWearable: false, tag: 'Recommended', trustScore: 93, ecoScore: 8, pricePrediction: 'Buy Now', hiddenCosts: 'Baking accessories not included.', regretRisk: 'Low', emotionTags: ['healthy', 'cooking']
    },
    {
        id: 'p11', name: 'OnePlus 55" Q1 Series 4K Android TV', price: 59999, rating: 4.4, category: 'Electronics', 
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80', 
        desc: 'Immersive QLED display with sliding soundbar.', specs: ['4K QLED', 'Android TV', '50W Soundbar'], 
        isWearable: false, tag: 'Trending', trustScore: 85, ecoScore: 5, pricePrediction: 'Wait (New model soon)', hiddenCosts: 'Wall mount installation charges extra.', regretRisk: 'Medium', emotionTags: ['entertainment', 'relaxed']
    },
    {
        id: 'p12', name: 'Atomic Habits by James Clear', price: 499, rating: 4.9, category: 'Home', 
        image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80', 
        desc: 'An easy & proven way to build good habits & break bad ones.', specs: ['Paperback', 'Self-help', '320 pages'], 
        isWearable: false, tag: 'Recommended', trustScore: 99, ecoScore: 9, pricePrediction: 'Buy Now', hiddenCosts: 'None', regretRisk: 'Very Low', emotionTags: ['motivated', 'productive'], socialTrust: 'Trending among 3000+ users'
    },
    {
        id: 'p13', name: 'Premium Cotton Navy Blue T-Shirt', price: 999, rating: 4.6, category: 'Clothing', 
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80', 
        desc: '100% pure cotton, breathable and perfect for summers.', specs: ['Regular fit', 'Machine washable', 'Bio-washed'], 
        isWearable: true, tag: 'Trending', trustScore: 95, ecoScore: 8, pricePrediction: 'Buy Now', hiddenCosts: 'None', regretRisk: 'Low', emotionTags: ['casual', 'comfortable', 'stylish'], socialTrust: '5000+ users bought this'
    },
    {
        id: 'p14', name: 'Slim Fit Black Denim Jeans', price: 2499, rating: 4.7, category: 'Clothing', 
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80', 
        desc: 'Classic black denim with a modern slim fit cut.', specs: ['Stretchable', 'Durable fabric', 'YKK Zip'], 
        isWearable: true, tag: 'Trending', trustScore: 92, ecoScore: 7, pricePrediction: 'Wait (Upcoming Sale)', hiddenCosts: 'None', regretRisk: 'Low', emotionTags: ['formal', 'stylish', 'cool'], socialTrust: '8000+ users bought this'
    },
    {
        id: 'p15', name: 'Oversized Pastel Pink Hoodie', price: 1899, rating: 4.5, category: 'Clothing', 
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80', 
        desc: 'Comfy oversized hoodie for the perfect aesthetic look.', specs: ['Fleece lined', 'Kangaroo pocket', 'Unisex'], 
        isWearable: true, tag: 'Recommended', trustScore: 89, ecoScore: 6, pricePrediction: 'Buy Now', hiddenCosts: 'None', regretRisk: 'Low', emotionTags: ['cozy', 'relaxed', 'aesthetic'], socialTrust: '3000+ users bought this'
    },
    {
        id: 'p16', name: 'Classic Brown Leather Jacket', price: 4999, rating: 4.8, category: 'Clothing', 
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80', 
        desc: 'Timeless leather jacket for a rugged, stylish appearance.', specs: ['Genuine leather', 'Polyester lining', 'Multiple pockets'], 
        isWearable: true, tag: 'Trending', trustScore: 94, ecoScore: 4, pricePrediction: 'Wait (Drops in Nov)', hiddenCosts: 'Leather care kit not included.', regretRisk: 'Medium', emotionTags: ['bold', 'stylish', 'rugged'], socialTrust: '1500+ users bought this'
    }
];

// Generate 10,000+ simulated products to create massive scale
const categories = ['Electronics', 'Fashion', 'Home', 'Appliances', 'Books'];
const emotions = ['excited', 'relaxed', 'productive', 'gaming', 'stylish'];
for(let i=13; i<=10000; i++) {
    const rCat = categories[Math.floor(Math.random()*categories.length)];
    const rEm = emotions[Math.floor(Math.random()*emotions.length)];
    products.push({
        id: 'p'+i, 
        name: 'KARTZONE Premium ' + rCat + ' Item #' + i, 
        price: Math.floor(Math.random()*50000) + 500, 
        rating: (Math.random() * (5 - 3) + 3).toFixed(1), 
        category: rCat, 
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', 
        desc: 'High quality automatically generated product for massive inventory testing.', 
        specs: ['Premium Build', '1 Year Warranty'], 
        isWearable: rCat === 'Fashion', 
        tag: Math.random() > 0.8 ? 'Trending' : '', 
        trustScore: Math.floor(Math.random()*30)+70, 
        ecoScore: Math.floor(Math.random()*10), 
        pricePrediction: Math.random() > 0.5 ? 'Buy Now' : 'Wait', 
        hiddenCosts: 'None', 
        regretRisk: 'Medium', 
        emotionTags: [rEm]
    });
}

/* ================= STATE MANAGEMENT ================= */
let state = {
    cart: JSON.parse(localStorage.getItem('shop_cart')) || [],
    wishlist: JSON.parse(localStorage.getItem('shop_wishlist')) || [],
    orders: [], // Will fetch from backend
    token: localStorage.getItem('shop_token') || null,
    user: JSON.parse(localStorage.getItem('shop_user')) || null,
    currentProduct: null,
    isLoginMode: true,
    view: 'home'
};

const API_BASE = 'http://localhost:5000/api';

async function apiCall(endpoint, method = 'GET', body = null) {
    const headers = { 'Content-Type': 'application/json' };
    if (state.token) headers['Authorization'] = `Bearer ${state.token}`;
    
    const config = { method, headers };
    if (body) config.body = JSON.stringify(body);
    
    const res = await fetch(`${API_BASE}${endpoint}`, config);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'API Error');
    return data;
}

// Formatting utility for INR
const formatPrice = (price) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

function init() {
    renderGrids();
    updateAuthUI();
    updateCartUI();
}

function renderGrids() {
    renderGridHTML('trending-grid', products.filter(p => p.tag === 'Trending'));
    renderGridHTML('recommended-grid', products.filter(p => p.tag === 'Recommended'));
    renderRecentGrid();
}

/* ================= DYNAMIC RENDERING ================= */
function renderGridHTML(elementId, prodArray) {
    const el = document.getElementById(elementId);
    if(!el) return;
    if(prodArray.length === 0) { el.innerHTML = '<p style="color:var(--gray)">No products found.</p>'; return; }
    
    // Cap at 40 items to prevent the browser from crashing with 10,000 items
    const displayLimit = elementId === 'search-grid' ? 40 : 8; 
    const renderArray = prodArray.slice(0, displayLimit);
    
    el.innerHTML = renderArray.map(p => `
        <div class="product-card" onclick="openProductPage('${p.id}')">
            <img src="${p.image}" alt="${p.name}" class="product-img">
            <div class="product-title">${p.name}</div>
            <div class="product-rating">⭐⭐⭐⭐⭐ ${p.rating}</div>
            ${p.socialTrust ? `<div class="social-trust">${p.socialTrust}</div>` : ''}
            <div class="product-price">${formatPrice(p.price)}</div>
            <div class="card-actions">
                <button class="btn-add-cart" onclick="event.stopPropagation(); addToCart('${p.id}')">Add to Cart</button>
                <button class="btn-wishlist ${state.wishlist.includes(p.id) ? 'active' : ''}" onclick="event.stopPropagation(); toggleWishlist('${p.id}')">❤️</button>
            </div>
        </div>
    `).join('');
}

/* ================= VIEWS & NAVIGATION ================= */
function showView(viewName) {
    document.querySelectorAll('[id^="view-"]').forEach(v => v.style.display = 'none');
    const target = document.getElementById('view-' + viewName);
    if(target) target.style.display = 'block';
    if(viewName === 'home') document.getElementById('search-results-container').style.display = 'none';
    if(viewName === 'orders') renderOrders();
    if(viewName === 'profile') renderProfile();
    window.scrollTo(0,0);
}

function renderProfile() {
    if(!state.user) return openAuthModal();
    document.getElementById('profile-name').textContent = state.user.name;
    document.getElementById('profile-email').textContent = state.user.email;
}

function editAddress() {
    const newAddr = prompt("Enter your shipping address:", "123 Main St, New Delhi, India");
    if(newAddr) {
        document.getElementById('checkout-address').textContent = newAddr;
        showToast("Address updated!");
    }
}

async function renderOrders() {
    const container = document.getElementById('orders-container');
    container.innerHTML = '<p style="text-align:center; padding:40px;">Loading your orders...</p>';
    
    try {
        const orders = await apiCall('/orders');
        state.orders = orders;
        
        if(state.orders.length === 0) {
            container.innerHTML = `<p style="color:var(--gray); text-align:center; padding:40px;">You haven't placed any orders yet.</p>`;
            return;
        }
        
        container.innerHTML = state.orders.map(order => `
            <div class="checkout-card">
                <div style="display:flex; justify-content:space-between; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:10px;">
                    <div>
                        <div style="font-size:0.75rem; color:var(--gray);">ORDER PLACED</div>
                        <div style="font-weight:600;">${new Date(order.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div>
                        <div style="font-size:0.75rem; color:var(--gray);">TOTAL</div>
                        <div style="font-weight:600;">${formatPrice(order.total)}</div>
                    </div>
                    <div>
                        <div style="font-size:0.75rem; color:var(--gray);">ORDER # ${order._id.slice(-6).toUpperCase()}</div>
                    </div>
                </div>
                ${order.items.map(item => {
                    const p = products.find(prod => prod.id === item.id);
                    return `
                        <div style="display:flex; gap:15px; align-items:center; margin-top:10px;">
                            <img src="${p?.image}" style="width:50px; height:50px; object-fit:contain;">
                            <div>
                                <div style="font-size:0.9rem; font-weight:600; color:var(--accent);">${p?.name || item.name}</div>
                                <div style="font-size:0.8rem; color:var(--gray);">Qty: ${item.qty}</div>
                            </div>
                        </div>
                    `;
                }).join('')}
                <div style="margin-top:15px; display:flex; gap:10px;">
                    <button class="btn-primary" style="width:auto; padding:5px 15px; font-size:0.85rem;" onclick="showToast('Tracking info not available yet')">Track Package</button>
                    <button class="btn-secondary" style="width:auto; padding:5px 15px; font-size:0.85rem;" onclick="showToast('Invoice generated')">View Invoice</button>
                </div>
            </div>
        `).join('');
    } catch (err) {
        container.innerHTML = `<p style="color:var(--danger); text-align:center; padding:40px;">Error loading orders: ${err.message}</p>`;
    }
}

function openProductPage(id) {
    const p = products.find(x => x.id === id);
    if(!p) return;
    state.currentProduct = p;

    // Update Recently Viewed
    state.recent = state.recent.filter(x => x !== id);
    state.recent.unshift(id);
    if(state.recent.length > 4) state.recent.pop();
    localStorage.setItem('shop_recent', JSON.stringify(state.recent));
    renderRecentGrid();

    // Render Product Detail HTML dynamically with Advanced AI modules
    const priceColor = p.pricePrediction.includes('Wait') ? 'var(--danger)' : 'var(--success)';

    document.getElementById('pd-content').innerHTML = `
        <div class="pd-gallery">
            <img src="${p.image}" class="pd-main-img" alt="${p.name}">
            <div style="display:flex; justify-content:center; gap:15px; margin-top:10px;">
                <div class="ai-badge trust-badge">🛡️ ${p.trustScore}% Real Reviews (AI Verified)</div>
                <div class="ai-badge eco-badge">🌱 ${p.ecoScore}/10 Eco-Score</div>
            </div>
        </div>
        <div class="pd-info">
            <h1 class="pd-title">${p.name}</h1>
            <div class="pd-rating">⭐⭐⭐⭐⭐ ${p.rating}</div>
            <div class="pd-price">${formatPrice(p.price)}</div>
            <p class="pd-desc">${p.desc}</p>
            
            <div style="background:#f0fdf4; border:1px solid #bbf7d0; padding:15px; border-radius:8px; margin-bottom:20px;">
                <h4 style="color:var(--success); margin-bottom:5px;">💡 AI Buying Advice</h4>
                <p style="font-size:0.9rem;"><strong>Price Predictor:</strong> <span style="color:${priceColor}; font-weight:bold;">${p.pricePrediction}</span></p>
                <p style="font-size:0.9rem; margin-top:5px;"><strong>Hidden Costs:</strong> ${p.hiddenCosts}</p>
                <p style="font-size:0.9rem; margin-top:5px;"><strong>Regret Risk:</strong> ${p.regretRisk}</p>
            </div>

            <ul class="pd-specs">${p.specs.map(s => `<li>${s}</li>`).join('')}</ul>
        </div>
        <div class="pd-action-box">
            <div class="pd-price">${formatPrice(p.price)}</div>
            <div style="color:var(--success); font-weight:500; margin-bottom:15px;">In Stock</div>
            <button class="btn-primary" onclick="addToCart('${p.id}')">Add to Cart</button>
            ${p.isWearable ? `<button class="btn-try-ai" onclick="openTryOnModal('${p.image}')">🤖 Try with AI</button>` : ''}
            
            <div class="social-box">
                <h4 style="margin-bottom:10px;">👥 Group Decision Maker</h4>
                <div class="social-stats" id="social-stats-container"></div>
                <div style="display:flex; gap:10px; margin-bottom:10px;">
                    <button class="btn-vote" onclick="castVote(true)">👍</button>
                    <button class="btn-vote" onclick="castVote(false)">👎</button>
                </div>
                <div style="display:flex; gap:10px;">
                    <button class="btn-share" onclick="shareProduct()">🔗 Share</button>
                    <button class="btn-secondary" style="flex-grow:1; font-size:0.85rem;" onclick="generateAiSummary()">🤖 AI Summary</button>
                </div>
            </div>
        </div>
    `;
    
    initSocialVotes(p.id);
    showView('product');
}

/* ================= CART SYSTEM ================= */
function toggleCart() {
    document.getElementById('cart-drawer').classList.toggle('active');
    document.getElementById('main-overlay').classList.toggle('active');
}

function addToCart(id) {
    const p = products.find(x => x.id === id);
    const item = state.cart.find(x => x.id === id);
    if(item) item.qty++;
    else state.cart.push({...p, qty: 1});
    saveCart(); showToast('Added to Cart'); updateCartUI();
}

function updateCartQty(id, delta) {
    const item = state.cart.find(x => x.id === id);
    if(!item) return;
    item.qty += delta;
    if(item.qty <= 0) state.cart = state.cart.filter(x => x.id !== id);
    saveCart(); updateCartUI();
}

function removeCartItem(id) {
    state.cart = state.cart.filter(x => x.id !== id);
    saveCart(); updateCartUI();
}

function saveCart() { localStorage.setItem('shop_cart', JSON.stringify(state.cart)); }

function updateCartUI() {
    const totalItems = state.cart.reduce((sum, i) => sum + i.qty, 0);
    document.getElementById('cart-count').textContent = totalItems;
    const container = document.getElementById('cart-items');
    let totalCost = 0;
    
    if(state.cart.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:var(--gray); margin-top:20px;">Cart is empty</p>';
    } else {
        container.innerHTML = state.cart.map(item => {
            totalCost += item.price * item.qty;
            return `
            <div class="cart-item">
                <img src="${item.image}" alt="">
                <div style="flex-grow:1;">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${formatPrice(item.price)}</div>
                    <div class="qty-controls">
                        <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)">-</button>
                        <span style="font-weight:500;">${item.qty}</span>
                        <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
                        <button class="remove-btn" onclick="removeCartItem('${item.id}')">Remove</button>
                    </div>
                </div>
            </div>`;
        }).join('');
    }
    document.getElementById('cart-total-price').textContent = formatPrice(totalCost);
}

function checkout() {
    if(!state.user) {
        showToast("Please sign in to checkout");
        return openAuthModal();
    }
    if(state.cart.length === 0) return showToast("Your cart is empty");
    
    showView('checkout');
    renderCheckoutSummary();
}

function renderCheckoutSummary() {
    const list = document.getElementById('checkout-items-list');
    const subTotalEl = document.getElementById('summary-subtotal');
    const totalEl = document.getElementById('summary-total');
    
    let subtotal = 0;
    list.innerHTML = state.cart.map(item => {
        const p = products.find(prod => prod.id === item.id);
        if(!p) return '';
        subtotal += p.price * item.qty;
        return `
            <div class="checkout-item">
                <img src="${p.image}" alt="${p.name}">
                <div class="checkout-item-info">
                    <div class="checkout-item-title">${p.name}</div>
                    <div class="checkout-item-price">${formatPrice(p.price)} x ${item.qty}</div>
                </div>
            </div>
        `;
    }).join('');
    
    subTotalEl.textContent = formatPrice(subtotal);
    totalEl.textContent = formatPrice(subtotal); // Since delivery/promo cancel out in my template
}

async function placeOrder() {
    if(state.cart.length === 0) return;
    
    const orderTotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    try {
        showToast("Processing Order...");
        const res = await apiCall('/orders', 'POST', {
            items: state.cart,
            total: orderTotal
        });
        
        state.cart = [];
        saveCart();
        updateCartUI();
        showToast("✅ Order Placed! Order ID: #" + res.orderId.slice(-6).toUpperCase());
        showView('orders');
        window.scrollTo(0,0);
    } catch (err) {
        showToast("❌ Order Failed: " + err.message);
    }
}

/* ================= LOGIN / SIGNUP ================= */
function openAuthModal() {
    if(state.user) return showView('orders'); // If logged in, go to orders instead of opening modal
    document.getElementById('auth-modal').classList.add('active');
    document.getElementById('main-overlay').classList.add('active');
}

function logoutUser() {
    state.user = null;
    state.token = null;
    localStorage.removeItem('shop_user');
    localStorage.removeItem('shop_token');
    updateAuthUI(); 
    showToast("Successfully signed out."); 
    showView('home');
}

function toggleAuthMode() {
    state.isLoginMode = !state.isLoginMode;
    document.getElementById('auth-title').textContent = state.isLoginMode ? 'Sign-In' : 'Create Account';
    document.getElementById('auth-name-group').style.display = state.isLoginMode ? 'none' : 'block';
    document.getElementById('auth-submit-btn').textContent = state.isLoginMode ? 'Login' : 'Signup';
    document.getElementById('auth-toggle-link').textContent = state.isLoginMode ? 'Create your account' : 'Sign in instead';
    document.getElementById('auth-error').textContent = '';
}

document.getElementById('auth-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('auth-email').value.trim();
    const pass = document.getElementById('auth-password').value.trim();
    const err = document.getElementById('auth-error');
    err.textContent = ''; 

    // --- STRICT VALIDATION ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        err.textContent = "Please enter a valid email address.";
        return;
    }
    if (pass.length < 4) {
        err.textContent = "Password must be at least 4 characters long.";
        return;
    }

    try {
        const endpoint = state.isLoginMode ? '/auth/login' : '/auth/signup';
        const body = state.isLoginMode ? { email, password: pass } : { 
            name: document.getElementById('auth-name').value.trim(), 
            email, 
            password: pass 
        };
        
        const res = await apiCall(endpoint, 'POST', body);
        state.user = res.user;
        state.token = res.token;
        loginSuccess();
    } catch (err) {
        err.textContent = err.message;
    }
});

function loginSuccess() {
    localStorage.setItem('shop_user', JSON.stringify(state.user));
    localStorage.setItem('shop_token', state.token);
    updateAuthUI(); 
    closeAllModals(); 
    showToast(`Welcome, ${state.user.name}!`);
    if(state.view === 'checkout') renderCheckoutSummary();
    if(state.view === 'orders') renderOrders();
}

function demoLogin() {
    state.user = { name: 'Demo User', email: 'demo@kartzone.com' };
    loginSuccess();
}

function updateAuthUI() {
    const greeting = document.getElementById('nav-user-greeting');
    const action = document.getElementById('nav-user-action');
    const authNavBtn = document.getElementById('auth-nav-btn');

    if(state.user) {
        greeting.textContent = `Hello, ${state.user.name.split(' ')[0]}`; 
        action.textContent = "Account & Lists";
        authNavBtn.onclick = () => showView('profile');
    } else {
        greeting.textContent = "Hello, sign in"; 
        action.textContent = "Account & Lists";
        authNavBtn.onclick = () => openAuthModal();
    }
}

/* ================= VOICE SEARCH ================= */
function startVoiceSearch(targetInputId) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Voice search is not supported in this browser.");
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN'; // Supports English/Hindi (Hinglish) accents
    showToast("Listening... Speak now.");
    
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        document.getElementById(targetInputId).value = transcript;
        showToast("Parsed: " + transcript);
        if(targetInputId === 'ai-input') handleAskAI();
        else handleRealtimeSearch();
    };
    recognition.start();
}

/* ================= SEARCH & AI SUGGESTION ================= */
function handleRealtimeSearch() {
    const q = document.getElementById('search-input').value.toLowerCase();
    const container = document.getElementById('search-results-container');
    if(!q) { container.style.display = 'none'; return; }
    const results = products.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    renderGridHTML('search-grid', results);
    document.getElementById('search-results-title').innerHTML = `🔍 Search Results`;
    container.style.display = 'block'; showView('home');
}

function handleAskAI() {
    const q = document.getElementById('ai-input').value.toLowerCase();
    if(!q) return;
    
    let results = [];
    let reason = "Based on your query, here are the best matches:";

    // Hinglish & Budget Parsing Logic
    let budgetMatch = q.match(/(under|below|me)?\s*(?:₹|rs\.?)?\s*(\d+,?\d*)\s*(k|thousand)?/i);
    let budget = null;
    if(budgetMatch && budgetMatch[2]) {
        budget = parseInt(budgetMatch[2].replace(/,/g, ''));
        if(budgetMatch[3] && budgetMatch[3].toLowerCase() === 'k') budget *= 1000;
        else if (budget < 100) budget *= 1000; // Assume "10 me" means 10k
    }

    // Emotion Parsing
    if(q.includes('mood off') || q.includes('sad') || q.includes('depressed')) {
        results = products.filter(p => p.emotionTags.includes('mood off') || p.emotionTags.includes('comforting'));
        reason = "Awww, mood off hai? 🥺 Here are some things guaranteed to cheer you up!";
    } 
    // Budget & Gaming/Camera Parsing
    else if(budget) {
        results = products.filter(p => p.price <= budget);
        if(q.includes('gaming')) results = results.filter(p => p.emotionTags.includes('gaming') || p.specs.join(' ').toLowerCase().includes('snapdragon'));
        reason = `AI Analysis: Best value-for-money options under ${formatPrice(budget)} with low regret risk.`;
    }
    // Fallback
    else {
        results = products.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
    }

    if(results.length === 0) results = products; // Fallback

    const container = document.getElementById('search-results-container');
    document.getElementById('search-results-title').innerHTML = `✨ AI Analysis <div style="font-size:0.9rem; color:var(--gray); font-weight:normal; margin-top:5px;">${reason}</div>`;
    
    // Render Comparative View instead of standard grid
    renderComparativeGrid(results);
    container.style.display = 'block';
    showView('home');
}

function renderComparativeGrid(prodArray) {
    const el = document.getElementById('search-grid');
    el.innerHTML = prodArray.map(p => `
        <div class="product-card" onclick="openProductPage('${p.id}')" style="border: 2px solid ${p.regretRisk==='Low' ? 'var(--success)' : 'var(--accent)'};">
            ${p.regretRisk==='Low' ? `<div style="background:var(--success); color:white; font-size:0.8rem; padding:3px 10px; border-radius:10px; position:absolute; top:-10px; left:10px;">Safe Buy</div>` : ''}
            <img src="${p.image}" alt="${p.name}" class="product-img">
            <div class="product-title">${p.name}</div>
            <div class="product-rating">⭐⭐⭐⭐⭐ ${p.rating}</div>
            ${p.socialTrust ? `<div class="social-trust">${p.socialTrust}</div>` : ''}
            <div class="product-price">${formatPrice(p.price)}</div>
            <div style="font-size:0.85rem; color:var(--gray); margin-bottom:10px;">
                <strong>Hidden Costs:</strong> ${p.hiddenCosts}<br>
                <strong>Trust:</strong> ${p.trustScore}%
            </div>
            <button class="btn-add-cart" onclick="event.stopPropagation(); addToCart('${p.id}')">Add to Cart</button>
        </div>
    `).join('');
}

/* ================= AI TRY-BEFORE-BUY ================= */
function openTryOnModal(imgUrl) {
    document.getElementById('ai-overlay-img').src = imgUrl;
    document.getElementById('ai-modal').classList.add('active');
    document.getElementById('main-overlay').classList.add('active');
}

async function startWebcam() {
    const video = document.getElementById('webcam-video');
    document.getElementById('user-uploaded-img').style.display = 'none';
    video.style.display = 'block';
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
    } catch(e) { alert("Webcam access denied. Cannot simulate AR."); }
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgEl = document.getElementById('user-uploaded-img');
            const video = document.getElementById('webcam-video');
            video.style.display = 'none';
            if(video.srcObject) video.srcObject.getTracks().forEach(t => t.stop());
            imgEl.src = e.target.result;
            imgEl.style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
}

/* ================= SOCIAL RECOMMENDATION & GROUP DECISION ================= */
function initSocialVotes(id) {
    if(!state.social[id]) {
        const total = Math.floor(Math.random() * 50) + 10;
        const up = Math.floor(total * 0.8);
        state.social[id] = { up, total };
    }
    updateSocialUI(id);
}

function updateSocialUI(id) {
    const s = state.social[id];
    const pct = Math.round((s.up / s.total) * 100) || 0;
    document.getElementById('social-stats-container').innerHTML = `
        <div class="stat-item"><div class="stat-val">${pct}%</div><div>Recommend</div></div>
        <div class="stat-item"><div class="stat-val" style="color:var(--accent)">${s.total}</div><div>Friends Voted</div></div>
    `;
}

function castVote(isUp) {
    if(!state.currentProduct) return;
    const id = state.currentProduct.id;
    state.social[id].total++;
    if(isUp) state.social[id].up++;
    localStorage.setItem('shop_social', JSON.stringify(state.social));
    updateSocialUI(id);
    showToast(isUp ? "You recommended this!" : "You downvoted this");
}

function generateAiSummary() {
    if(!state.currentProduct) return;
    const s = state.social[state.currentProduct.id];
    const pct = Math.round((s.up / s.total) * 100);
    let summary = `AI Summary: Based on ${s.total} friend opinions, `;
    if(pct > 80) summary += `everyone strongly agrees this is a safe, high-value purchase.`;
    else if(pct > 50) summary += `opinions are mixed. Make sure you really need it!`;
    else summary += `your friends think this is a bad idea. Reconsider!`;
    alert(summary);
}

function shareProduct() {
    navigator.clipboard.writeText(window.location.href);
    showToast("Link copied! Share with friends to get votes.");
}

/* ================= EXTRA SMART FEATURES ================= */
function toggleWishlist(id) {
    if(state.wishlist.includes(id)) state.wishlist = state.wishlist.filter(x => x !== id);
    else state.wishlist.push(id);
    localStorage.setItem('shop_wishlist', JSON.stringify(state.wishlist));
    renderGrids(); showToast("Wishlist updated");
}

function renderRecentGrid() {
    const recentTitle = document.getElementById('recent-title');
    if(state.recent.length === 0) { recentTitle.style.display = 'none'; return; }
    recentTitle.style.display = 'block';
    const arr = state.recent.map(id => products.find(p => p.id === id)).filter(Boolean);
    renderGridHTML('recent-grid', arr);
}

function filterCategory(cat) {
    const results = products.filter(p => p.category === cat);
    renderGridHTML('search-grid', results);
    document.getElementById('search-results-container').style.display = 'block';
    document.getElementById('search-results-title').innerHTML = `${cat} Category`;
    showView('home');
}

/* ================= UTILS ================= */
function closeAllModals() {
    document.querySelectorAll('.overlay, .cart-drawer, .auth-modal, .ai-modal').forEach(el => el.classList.remove('active'));
    const video = document.getElementById('webcam-video');
    if(video.srcObject) video.srcObject.getTracks().forEach(track => track.stop());
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

// Run Application
init();

/* ================= FLOATING AI CHATBOT ================= */
function toggleChatbot() {
    const win = document.getElementById('chatbot-window');
    win.classList.toggle('active');
    if(win.classList.contains('active')) {
        document.getElementById('chat-input').focus();
    }
}

function handleChatKeyPress(e) {
    if(e.key === 'Enter') sendChatMessage();
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    if(!msg) return;

    appendMessage('user', msg);
    input.value = '';

    // Mock AI Response Logic
    setTimeout(() => {
        let response = "I'm not sure about that. Can you try asking about phones, headphones, or your cart?";
        const lowerMsg = msg.toLowerCase();
        
        if(lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
            response = "Hello! Looking for anything specific today?";
        } else if(lowerMsg.includes('cart')) {
            response = "You have " + state.cart.length + " items in your cart.";
        } else if(lowerMsg.includes('gaming')) {
            response = "For gaming, I highly recommend the Poco X5 Pro 5G! It has a Snapdragon 778G and a 120Hz display.";
        } else if(lowerMsg.includes('mood') || lowerMsg.includes('sad')) {
            response = "If your mood is off, maybe some Premium Swiss Chocolates will help! Check them out on our home page.";
        } else if(lowerMsg.includes('laptop') || lowerMsg.includes('macbook')) {
            response = "We have the Apple MacBook Pro 14 M3 in stock! It's our most powerful laptop for professionals.";
        }

        appendMessage('bot', response);
    }, 600); // simulated delay
}

function appendMessage(sender, text) {
    const container = document.getElementById('chatbot-messages');
    const div = document.createElement('div');
    div.className = sender === 'user' ? 'user-msg' : 'bot-msg';
    div.textContent = text;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}
