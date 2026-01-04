// --- CONFIGURATION: APNI IMAGES YAHAN DEFINE KAREIN ---
const products = [
    {
        id: 1,
        brand: "Vincent Chase",
        name: "Emerald Round Classics",
        price: 1499,
        tag: "Bestseller",
        // Niche: Agar aapke folder me image hai to: "images/lens1.jpg" likhein
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        brand: "John Jacobs",
        name: "Gold Rim Aviators",
        price: 2999,
        tag: "New",
        image: "https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        brand: "Lenskart Air",
        name: "Matte Black Wayfarer",
        price: 1200,
        tag: "Lightweight",
        image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        brand: "Hooper",
        name: "Transparent Crystal",
        price: 1850,
        tag: "Trendy",
        image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
];

let cart = [];

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});

// --- LOAD PRODUCTS INTO GRID ---
function loadProducts() {
    const grid = document.getElementById('product-grid');
    
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <span class="card-badge">${product.tag}</span>
            <div class="img-wrap">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="info-wrap">
                <div class="brand">${product.brand}</div>
                <h3 class="title">${product.name}</h3>
                <div class="price-flex">
                    <span class="price">₹${product.price}</span>
                    <button class="add-btn" onclick="addToCart(${product.id})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// --- CART LOGIC ---
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);

    if(existing) {
        existing.qty++;
    } else {
        cart.push({...product, qty: 1});
    }

    updateCart();
    toggleCart(); // Open cart automatically
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function updateCart() {
    // 1. Update Badge
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById('cart-count').innerText = count;

    // 2. Update HTML
    const cartBox = document.getElementById('cart-items');
    const totalBox = document.getElementById('total-price');

    if(cart.length === 0) {
        cartBox.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
        totalBox.innerText = '₹0';
        return;
    }

    let total = 0;
    cartBox.innerHTML = cart.map(item => {
        total += item.price * item.qty;
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="img">
                <div>
                    <h4>${item.name}</h4>
                    <p>₹${item.price} x ${item.qty}</p>
                    <small onclick="removeFromCart(${item.id})" style="color:red; cursor:pointer;">Remove</small>
                </div>
            </div>
        `;
    }).join('');

    totalBox.innerText = '₹' + total;
}

// --- UI FUNCTIONS ---
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    sidebar.classList.toggle('open');
}