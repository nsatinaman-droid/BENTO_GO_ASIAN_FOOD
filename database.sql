-- ==================== BENTOGO DATABASE SCHEMA ====================
-- This SQL schema is for future upgrades from static HTML/JS to PHP/MySQL backend
-- Current version uses localStorage for data persistence

-- ==================== CREATE TABLES ====================

-- CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- MENU ITEMS TABLE
CREATE TABLE IF NOT EXISTS menu_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    country VARCHAR(50) NOT NULL,
    category_id INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_path VARCHAR(255),
    emoji VARCHAR(10),
    stock_quantity INT DEFAULT 100,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- CUSTOMERS TABLE
CREATE TABLE IF NOT EXISTS customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(50),
    postal_code VARCHAR(20),
    country VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_number VARCHAR(20) NOT NULL UNIQUE,
    customer_id INT NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    delivery_fee DECIMAL(10, 2) DEFAULT 50.00,
    tax DECIMAL(10, 2) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('Pending', 'Confirmed', 'Preparing', 'Ready', 'Completed', 'Cancelled') DEFAULT 'Pending',
    payment_method VARCHAR(50),
    delivery_address TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    menu_item_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    special_instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);

-- REVIEWS TABLE
CREATE TABLE IF NOT EXISTS reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    customer_id INT NOT NULL,
    menu_item_id INT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);

-- PROMOTIONS TABLE
CREATE TABLE IF NOT EXISTS promotions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    discount_type ENUM('percentage', 'fixed') NOT NULL,
    discount_value DECIMAL(10, 2) NOT NULL,
    min_order_amount DECIMAL(10, 2),
    max_uses INT,
    current_uses INT DEFAULT 0,
    start_date DATETIME,
    end_date DATETIME,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ADMIN USERS TABLE
CREATE TABLE IF NOT EXISTS admin_users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'manager', 'staff') DEFAULT 'staff',
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==================== INSERT SAMPLE DATA ====================

-- Insert Categories
INSERT INTO categories (name, description) VALUES
('Main Dishes', 'Signature rice bowls and noodle dishes'),
('Beverages', 'Premium drinks and tea'),
('Sides & Desserts', 'Appetizers and sweet treats');

-- Insert Menu Items (Taiwan)
INSERT INTO menu_items (name, description, country, category_id, price, emoji, stock_quantity) VALUES
('Braised Pork Rice', 'Tender braised pork over fluffy rice', 'Taiwan', 1, 95.00, '🍚', 100),
('Chicken Bento', 'Traditional bento with chicken and sides', 'Taiwan', 1, 135.00, '🍱', 100),
('Beef Noodle Bowl', 'Rich braised beef with hand-pulled noodles', 'Taiwan', 1, 165.00, '🍜', 100),
('Bubble Milk Tea', 'Classic bubble tea with tapioca pearls', 'Taiwan', 2, 65.00, '🧋', 150),
('Winter Melon Tea', 'Refreshing winter melon iced tea', 'Taiwan', 2, 55.00, '🍵', 150),
('Lemon Green Tea', 'Fresh lemon with green tea', 'Taiwan', 2, 60.00, '🍋', 150),
('Taiwanese Popcorn Chicken', 'Crispy fried chicken bites', 'Taiwan', 3, 89.00, '🍗', 80);

-- Insert Menu Items (Philippines)
INSERT INTO menu_items (name, description, country, category_id, price, emoji, stock_quantity) VALUES
('Chicken Adobo Bowl', 'Tender chicken in savory-sweet sauce', 'Philippines', 1, 149.00, '🍗', 100),
('Pancit Canton', 'Stir-fried egg noodles with chicken', 'Philippines', 1, 139.00, '🍝', 100),
('Tocino Rice Plate', 'Sweet cured pork over rice', 'Philippines', 1, 145.00, '🍚', 100),
('Calamansi Juice', 'Fresh citrus juice blend', 'Philippines', 2, 60.00, '🍊', 120),
('Halo-Halo Shake', 'Blended tropical drink with toppings', 'Philippines', 2, 85.00, '🥤', 100),
('Lumpia Rolls', 'Crispy spring rolls', 'Philippines', 3, 79.00, '🥟', 80);

-- Insert Menu Items (Japan)
INSERT INTO menu_items (name, description, country, category_id, price, emoji, stock_quantity) VALUES
('Chicken Katsu Curry', 'Crispy katsu with golden curry sauce', 'Japan', 1, 179.00, '🍱', 100),
('Teriyaki Chicken Rice', 'Glazed chicken with teriyaki sauce', 'Japan', 1, 169.00, '🍚', 100),
('Sushi Roll Box', 'Assorted sushi rolls selection', 'Japan', 1, 185.00, '🍣', 80),
('Matcha Latte', 'Creamy matcha green tea latte', 'Japan', 2, 80.00, '🍵', 120),
('Yuzu Soda', 'Refreshing yuzu citrus soda', 'Japan', 2, 75.00, '🥤', 120),
('Gyoza Dumplings', 'Pan-fried pork and vegetable dumplings', 'Japan', 3, 95.00, '🥟', 80);

-- Insert Menu Items (Korea)
INSERT INTO menu_items (name, description, country, category_id, price, emoji, stock_quantity) VALUES
('Bibimbap Bowl', 'Mixed vegetables and beef over rice', 'Korea', 1, 175.00, '🥘', 100),
('Korean Fried Chicken Rice', 'Crispy, spicy fried chicken', 'Korea', 1, 189.00, '🍗', 100),
('Kimchi Pork Bowl', 'Spicy kimchi with tender pork', 'Korea', 1, 169.00, '🌶️', 100),
('Korean Grape Soda', 'Sweet grape-flavored soda', 'Korea', 2, 65.00, '🍇', 120),
('Kimchi Fries', 'Crispy fries with spicy kimchi', 'Korea', 3, 99.00, '🍟', 80);

-- Insert Menu Items (Thailand)
INSERT INTO menu_items (name, description, country, category_id, price, emoji, stock_quantity) VALUES
('Pad Thai Chicken', 'Stir-fried rice noodles with chicken', 'Thailand', 1, 165.00, '🍜', 100),
('Green Curry Rice', 'Fragrant green curry with rice', 'Thailand', 1, 175.00, '🥘', 100),
('Basil Pork Rice', 'Holy basil pork over jasmine rice', 'Thailand', 1, 155.00, '🌿', 100),
('Thai Milk Tea', 'Sweet condensed milk tea', 'Thailand', 2, 70.00, '🧋', 120),
('Mango Smoothie', 'Fresh mango fruit smoothie', 'Thailand', 2, 85.00, '🥭', 100),
('Thai Coconut Jelly', 'Sweet coconut dessert', 'Thailand', 3, 75.00, '🍮', 80);

-- Insert Sample Admin User
INSERT INTO admin_users (username, email, password_hash, role) VALUES
('admin', 'admin@bentogo.com', SHA2('admin123', 256), 'admin');

-- ==================== CREATE VIEWS ====================

-- View: Revenue Summary
CREATE VIEW revenue_summary AS
SELECT 
    DATE(created_at) as date,
    COUNT(*) as order_count,
    SUM(total_amount) as daily_revenue,
    AVG(total_amount) as avg_order_value
FROM orders
WHERE status IN ('Completed', 'Ready')
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- View: Popular Items
CREATE VIEW popular_items AS
SELECT 
    mi.id,
    mi.name,
    mi.country,
    COUNT(oi.id) as times_ordered,
    SUM(oi.quantity) as total_quantity,
    AVG(r.rating) as avg_rating
FROM menu_items mi
LEFT JOIN order_items oi ON mi.id = oi.menu_item_id
LEFT JOIN reviews r ON mi.id = r.menu_item_id
GROUP BY mi.id
ORDER BY times_ordered DESC;

-- View: Customer Orders
CREATE VIEW customer_orders AS
SELECT 
    c.id,
    c.username,
    c.email,
    COUNT(o.id) as total_orders,
    SUM(o.total_amount) as total_spent,
    MAX(o.created_at) as last_order_date
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id
ORDER BY total_spent DESC;

-- ==================== CREATE INDEXES ====================

CREATE INDEX idx_order_customer ON orders(customer_id);
CREATE INDEX idx_order_status ON orders(status);
CREATE INDEX idx_order_date ON orders(created_at);
CREATE INDEX idx_menu_country ON menu_items(country);
CREATE INDEX idx_menu_category ON menu_items(category_id);
CREATE INDEX idx_customer_email ON customers(email);
CREATE INDEX idx_review_rating ON reviews(rating);

-- ==================== FUTURE UPGRADE NOTES ====================
/*
MIGRATION STEPS FROM CURRENT STATE TO FULL PHP/MYSQL:

1. Setup XAMPP or similar PHP development environment
2. Create MySQL database and import this schema
3. Develop PHP backend:
   - User authentication system
   - Product management API
   - Order processing system
   - Payment integration
   - Admin dashboard with real database queries
4. Replace localStorage with API calls to PHP backend
5. Implement session management
6. Add security features:
   - Input validation
   - SQL injection prevention
   - CSRF protection
   - Password hashing (bcrypt)
7. Deploy to web server

FEATURES TO ADD:
- User registration and authentication
- Real payment processing (Stripe, PayPal)
- Order tracking in real-time
- Review and rating system
- Promotional code system
- Inventory management
- Multi-language support
- AI chatbot for customer service
- Email notifications
- SMS order updates
- Integration with delivery services
*/