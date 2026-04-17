// ==================== PRODUCT DATABASE ==================== 
const products = [
    // MAIN FOODS - Taiwan
    { id: 1, name: 'Braised Pork Rice', country: 'Taiwan', category: 'main', price: 95, emoji: '🍚' },
    { id: 2, name: 'Chicken Bento', country: 'Taiwan', category: 'main', price: 135, emoji: '🍱' },
    { id: 3, name: 'Beef Noodle Bowl', country: 'Taiwan', category: 'main', price: 165, emoji: '🍜' },
    
    // MAIN FOODS - Philippines
    { id: 4, name: 'Chicken Adobo Bowl', country: 'Philippines', category: 'main', price: 149, emoji: '🍗' },
    { id: 5, name: 'Pancit Canton', country: 'Philippines', category: 'main', price: 139, emoji: '🍝' },
    { id: 6, name: 'Tocino Rice Plate', country: 'Philippines', category: 'main', price: 145, emoji: '🍚' },
    
    // MAIN FOODS - Japan
    { id: 7, name: 'Chicken Katsu Curry', country: 'Japan', category: 'main', price: 179, emoji: '🍱' },
    { id: 8, name: 'Teriyaki Chicken Rice', country: 'Japan', category: 'main', price: 169, emoji: '🍚' },
    { id: 9, name: 'Sushi Roll Box', country: 'Japan', category: 'main', price: 185, emoji: '🍣' },
    
    // MAIN FOODS - Korea
    { id: 10, name: 'Bibimbap Bowl', country: 'Korea', category: 'main', price: 175, emoji: '🥘' },
    { id: 11, name: 'Korean Fried Chicken Rice', country: 'Korea', category: 'main', price: 189, emoji: '🍗' },
    { id: 12, name: 'Kimchi Pork Bowl', country: 'Korea', category: 'main', price: 169, emoji: '🌶️' },
    
    // MAIN FOODS - Thailand
    { id: 13, name: 'Pad Thai Chicken', country: 'Thailand', category: 'main', price: 165, emoji: '🍜' },
    { id: 14, name: 'Green Curry Rice', country: 'Thailand', category: 'main', price: 175, emoji: '🥘' },
    { id: 15, name: 'Basil Pork Rice', country: 'Thailand', category: 'main', price: 155, emoji: '🌿' },
    
    // DRINKS - Taiwan
    { id: 16, name: 'Bubble Milk Tea', country: 'Taiwan', category: 'drinks', price: 65, emoji: '🧋' },
    { id: 17, name: 'Winter Melon Tea', country: 'Taiwan', category: 'drinks', price: 55, emoji: '🍵' },
    { id: 18, name: 'Lemon Green Tea', country: 'Taiwan', category: 'drinks', price: 60, emoji: '🍋' },
    
    // DRINKS - Philippines
    { id: 19, name: 'Calamansi Juice', country: 'Philippines', category: 'drinks', price: 60, emoji: '🍊' },
    { id: 20, name: 'Halo-Halo Shake', country: 'Philippines', category: 'drinks', price: 85, emoji: '🥤' },
    
    // DRINKS - Japan
    { id: 21, name: 'Matcha Latte', country: 'Japan', category: 'drinks', price: 80, emoji: '🍵' },
    { id: 22, name: 'Yuzu Soda', country: 'Japan', category: 'drinks', price: 75, emoji: '🥤' },
    
    // DRINKS - Korea
    { id: 23, name: 'Korean Grape Soda', country: 'Korea', category: 'drinks', price: 65, emoji: '🍇' },
    
    // DRINKS - Thailand
    { id: 24, name: 'Thai Milk Tea', country: 'Thailand', category: 'drinks', price: 70, emoji: '🧋' },
    { id: 25, name: 'Mango Smoothie', country: 'Thailand', category: 'drinks', price: 85, emoji: '🥭' },
    
    // SIDES / DESSERTS
    { id: 26, name: 'Taiwanese Popcorn Chicken', country: 'Taiwan', category: 'sides', price: 89, emoji: '🍗' },
    { id: 27, name: 'Lumpia Rolls', country: 'Philippines', category: 'sides', price: 79, emoji: '🥟' },
    { id: 28, name: 'Gyoza Dumplings', country: 'Japan', category: 'sides', price: 95, emoji: '🥟' },
    { id: 29, name: 'Kimchi Fries', country: 'Korea', category: 'sides', price: 99, emoji: '🍟' },
    { id: 30, name: 'Thai Coconut Jelly', country: 'Thailand', category: 'sides', price: 75, emoji: '🍮' }
];

// ==================== CART MANAGEMENT ==================== 
let cart = JSON.parse(localStorage.getItem('bentogo_cart')) || [];

function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const product = products.find(p => p.id === id);
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1,
            country: product.country,
            emoji: product.emoji
        });
    }
    
    saveCart();
    updateCartBadge();
    showToast(`Added ${name} to cart!`, 'success');
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartBadge();
    renderCart();
}

function updateQuantity(id, quantity) {
    const item = cart.find(item => item.id === id);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(id);
        } else {
            item.quantity = quantity;
            saveCart();
            renderCart();
        }
    }
}

function saveCart() {
    localStorage.setItem('bentogo_cart', JSON.stringify(cart));
}

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (badge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = totalItems > 0 ? totalItems : '0';
    }
}

// ==================== MENU PAGE FUNCTIONS ==================== 
function renderMenuGrid(filteredProducts = products) {
    const menuGrid = document.getElementById('menuGrid');
    const emptyState = document.getElementById('emptyState');
    
    if (!menuGrid) return;
    
    if (filteredProducts.length === 0) {
        menuGrid.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    menuGrid.style.display = 'grid';
    emptyState.style.display = 'none';
    
    menuGrid.innerHTML = filteredProducts.map(product => `
        <div class="menu-card">
            <div class="menu-card-image" style="background: linear-gradient(135deg, hsl(${Math.random() * 360}, 70%, 70%), hsl(${Math.random() * 360}, 70%, 60%));">
                <div class="menu-card-icon">${product.emoji}</div>
            </div>
            <div class="menu-card-content">
                <span class="menu-card-badge">${product.country}</span>
                <h3 class="menu-card-title">${product.name}</h3>
                <p class="menu-card-category">${capitalizeCategory(product.category)}</p>
                <p class="menu-card-price">₱${product.price}</p>
                <button class="menu-card-button" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function capitalizeCategory(cat) {
    const map = { 'main': 'Main Dish', 'drinks': 'Beverage', 'sides': 'Sides & Desserts' };
    return map[cat] || cat;
}

let currentCountryFilter = 'all';
let currentCategoryFilter = 'all';
let currentSort = 'none';

function filterByCountry(country) {
    currentCountryFilter = country;
    applyFilters();
    
    // Update active button
    document.querySelectorAll('[data-filter="' + country + '"]').forEach(btn => {
        btn.classList.add('active');
    });
}

function filterByCategory(category) {
    currentCategoryFilter = category;
    applyFilters();
    
    // Update active button
    document.querySelectorAll('[data-filter="' + category + '"]').forEach(btn => {
        btn.classList.add('active');
    });
}

function applyFilters() {
    let filtered = products.filter(product => {
        const countryMatch = currentCountryFilter === 'all' || product.country.toLowerCase() === currentCountryFilter;
        const categoryMatch = currentCategoryFilter === 'all' || product.category === currentCategoryFilter;
        return countryMatch && categoryMatch;
    });
    
    if (currentSort === 'asc') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'desc') {
        filtered.sort((a, b) => b.price - a.price);
    }
    
    renderMenuGrid(filtered);
}

function sortByPrice(direction) {
    currentSort = direction;
    applyFilters();
}

function searchMenu() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const query = searchInput.value.toLowerCase();
    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query)
    );
    
    renderMenuGrid(filtered);
}

// ==================== CART PAGE FUNCTIONS ==================== 
function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        if (cartItemsContainer) cartItemsContainer.style.display = 'none';
        if (emptyCart) emptyCart.style.display = 'block';
        if (checkoutBtn) checkoutBtn.disabled = true;
    } else {
        if (cartItemsContainer) cartItemsContainer.style.display = 'block';
        if (emptyCart) emptyCart.style.display = 'none';
        if (checkoutBtn) checkoutBtn.disabled = false;
        
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.emoji}</div>
                <div class="cart-item-content">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-country">${item.country}</div>
                    <div class="cart-item-price">₱${item.price}</div>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <div class="qty-display">${item.quantity}</div>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `).join('');
    }
    
    updateOrderSummary();
}

function updateOrderSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = cart.length > 0 ? 50 : 0;
    const tax = subtotal * 0.05;
    const total = subtotal + deliveryFee + tax;
    
    const subtotalEl = document.getElementById('subtotal');
    const deliveryFeeEl = document.getElementById('deliveryFee');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) subtotalEl.textContent = '₱' + subtotal.toFixed(2);
    if (deliveryFeeEl) deliveryFeeEl.textContent = cart.length > 0 ? '₱50.00' : '₱0.00';
    if (taxEl) taxEl.textContent = '₱' + tax.toFixed(2);
    if (totalEl) totalEl.textContent = '₱' + total.toFixed(2);
}

function checkout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 50 + (cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.05);
    
    showToast(`Order confirmed! Total: ₱${total.toFixed(2)}. Thank you for ordering!`, 'success');
    
    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('bentogo_orders')) || [];
    orders.push({
        orderId: '#ORD' + String(orders.length + 1).padStart(3, '0'),
        items: [...cart],
        total: total,
        date: new Date().toLocaleDateString(),
        status: 'Pending'
    });
    localStorage.setItem('bentogo_orders', JSON.stringify(orders));
    
    // Clear cart
    cart = [];
    saveCart();
    updateCartBadge();
    renderCart();
}

// ==================== LOGIN PAGE FUNCTIONS ==================== 
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('bentogo_user', JSON.stringify({ username: username, role: 'admin' }));
        showToast('Login successful!', 'success');
        setTimeout(() => {
            window.location.href = 'admin.html';
        }, 1000);
    } else {
        showToast('Invalid credentials. Try admin/admin123', 'error');
    }
}

function logout() {
    localStorage.removeItem('bentogo_user');
    showToast('Logged out successfully!', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// ==================== ADMIN PAGE FUNCTIONS ==================== 
function showDashboard() {
    switchAdminSection('dashboard');
}

function showProducts() {
    switchAdminSection('products');
}

function showOrders() {
    switchAdminSection('orders');
}

function showCustomers() {
    switchAdminSection('customers');
}

function showSettings() {
    switchAdminSection('settings');
}

function switchAdminSection(sectionId) {
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.querySelectorAll('.admin-menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const section = document.getElementById(sectionId);
    if (section) section.classList.add('active');
    
    document.querySelector(`[onclick="show${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}()"]`)?.classList.add('active');
}

function editProduct(id) {
    showToast('Edit product #' + id, 'info');
}

function deleteProduct(id) {
    if (confirm('Delete this product?')) {
        showToast('Product deleted', 'success');
    }
}

function addNewProduct() {
    showToast('Add new product form would open', 'info');
}

function viewOrder(id) {
    showToast('View order #' + id, 'info');
}

function viewCustomer(id) {
    showToast('View customer #' + id, 'info');
}

// ==================== TOAST NOTIFICATIONS ==================== 
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// ==================== NEWSLETTER ==================== 
function handleNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    showToast(`Thanks for subscribing with ${email}!`, 'success');
    event.target.reset();
}

// ==================== SCROLL TO TOP ==================== 
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleScrollButton() {
    const scrollBtn = document.getElementById('scrollToTop');
    if (!scrollBtn) return;
    
    if (window.scrollY > 300) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
}

// ==================== MOBILE MENU TOGGLE ==================== 
function setupMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}

// ==================== SEARCH FUNCTIONALITY ==================== 
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', searchMenu);
    }
}

// ==================== INITIALIZATION ==================== 
document.addEventListener('DOMContentLoaded', () => {
    // Update cart badge
    updateCartBadge();
    
    // Render menu if on menu page
    if (document.getElementById('menuGrid')) {
        renderMenuGrid();
        setupSearch();
    }
    
    // Render cart if on cart page
    if (document.getElementById('cartItems')) {
        renderCart();
    }
    
    // Setup mobile menu
    setupMobileMenu();
    
    // Check admin access
    checkAdminAccess();
});

function checkAdminAccess() {
    const adminLinks = document.querySelectorAll('.admin-link');
    adminLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const user = JSON.parse(localStorage.getItem('bentogo_user'));
            if (!user) {
                e.preventDefault();
                showToast('Please login to access admin panel', 'error');
                window.location.href = 'login.html';
            }
        });
    });
}

// ==================== SCROLL EVENTS ==================== 
window.addEventListener('scroll', handleScrollButton);

// ==================== DEMO DATA GENERATOR ==================== 
function generateDemoOrders() {
    const orders = [
        { orderId: '#ORD001', customer: 'Maria Santos', items: 2, total: 340, date: '2024-04-15', status: 'Completed' },
        { orderId: '#ORD002', customer: 'John Doe', items: 1, total: 179, date: '2024-04-15', status: 'Pending' },
        { orderId: '#ORD003', customer: 'Lisa Wong', items: 2, total: 368, date: '2024-04-14', status: 'Completed' },
        { orderId: '#ORD004', customer: 'Kenji Tanaka', items: 1, total: 165, date: '2024-04-14', status: 'Completed' }
    ];
    localStorage.setItem('bentogo_demo_orders', JSON.stringify(orders));
}

// Initialize demo orders
generateDemoOrders();
