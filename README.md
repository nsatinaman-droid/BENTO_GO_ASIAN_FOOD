# 🍱 BentoGo - Fast Asian Flavors Across Asia

A premium, professional multi-page website for BentoGo, a fast food chain offering authentic Asian cuisine from 5 countries: Taiwan, Philippines, Japan, Korea, and Thailand.

## ✨ Project Overview

BentoGo is a complete, production-ready website built with pure HTML5, CSS3, and Vanilla JavaScript. It features a beautiful modern design, responsive layout, full e-commerce functionality, and an admin dashboard—all without requiring any backend server or framework.

### Key Features

✅ **Professional UI/UX Design**
- Modern, premium aesthetic matching high-end food brands
- Smooth animations and transitions
- Glassmorphic and card-based design patterns
- Premium color palette (Deep Red, Warm Orange, Gold)

✅ **Fully Responsive**
- Mobile-first responsive design
- Optimized for tablets and desktops
- Touch-friendly interface
- Adaptive layouts

✅ **Complete E-Commerce**
- Product menu with 30 authentic Asian dishes
- Advanced filtering (country, category, price sort)
- Search functionality
- Shopping cart with quantity management
- Order summary with tax and delivery calculations
- Checkout system

✅ **Admin Dashboard**
- KPI metrics and analytics
- Sales overview charts
- Product management
- Order tracking
- Customer management
- Settings panel

✅ **Data Persistence**
- localStorage-based cart system
- Order history storage
- Demo data generator

✅ **GitHub Pages Ready**
- No server dependencies
- Pure static files
- Relative paths only
- Works with GitHub Pages deployment

## 🛠 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **JavaScript (Vanilla)** - No frameworks or libraries
- **localStorage** - Client-side data persistence
- **SQL Schema** - For future PHP/MySQL upgrade

## 📁 Project Structure

```
BentoGo/
├── index.html              # Homepage
├── menu.html               # Menu page with filters
├── cart.html               # Shopping cart
├── login.html              # Login page
├── admin.html              # Admin dashboard
├── style.css               # Complete styling
├── script.js               # All JavaScript functionality
├── database.sql            # SQL schema for future upgrades
├── README.md               # This file
└── assets/
    └── images/
        └── products/       # Product images (currently using emojis)
```

## 🚀 How to Run Locally

### Option 1: Direct File Opening
1. Download/Clone the BentoGo folder
2. Open `index.html` directly in your web browser
3. Navigate through the site using the menu

### Option 2: Live Server (Recommended)
1. Install VS Code Live Server extension
2. Right-click `index.html` → "Open with Live Server"
3. Site will open at `http://localhost:5500`

### Option 3: Python Server
```bash
# Python 3
cd BentoGo
python -m http.server 8000

# Then visit http://localhost:8000
```

### Option 4: Node.js Server
```bash
# Using http-server
npx http-server
```

## 📤 How to Upload to GitHub Pages

### Step 1: Create a GitHub Repository
```bash
cd BentoGo
git init
git add .
git commit -m "Initial commit: BentoGo website"
```

### Step 2: Create GitHub Repository Online
1. Go to https://github.com/new
2. Create a new repository named `bentogo`
3. Copy the repository URL

### Step 3: Push Your Code
```bash
git remote add origin https://github.com/YOUR-USERNAME/bentogo.git
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to your repository Settings
2. Scroll to "GitHub Pages" section
3. Select "Deploy from a branch"
4. Choose `main` branch and `/root` folder
5. Click Save

### Step 5: Access Your Site
Your site will be live at: `https://YOUR-USERNAME.github.io/bentogo/`

## 🔐 Login Credentials

**Demo Admin Account:**
- Username: `admin`
- Password: `admin123`

Access the admin dashboard at `/admin.html`

## 📱 Features Breakdown

### Homepage (index.html)
- Sticky navigation with cart badge
- Hero section with CTA buttons
- "Why Choose Us" feature cards
- Featured products showcase
- Country highlights section
- Customer testimonials
- Newsletter signup
- Premium footer

### Menu Page (menu.html)
- Search bar with real-time filtering
- Country filters (Taiwan, Philippines, Japan, Korea, Thailand)
- Category filters (Main, Drinks, Sides)
- Price sorting (Low to High / High to Low)
- Responsive product grid
- Product cards with:
  - Emoji icons (placeholder for images)
  - Country badges
  - Category labels
  - Pricing
  - "Add to Cart" buttons
  - Hover lift animations

### Shopping Cart (cart.html)
- List of cart items with images
- Quantity adjustment buttons
- Remove item buttons
- Order summary card with:
  - Subtotal calculation
  - Delivery fee
  - Tax (5%)
  - Total
- Checkout button
- Continue shopping link
- Empty cart state with CTA

### Login Page (login.html)
- Split-screen layout
- Left: Brand showcase with features
- Right: Login form
- Username/password fields
- "Remember me" checkbox
- Demo credentials display
- Professional card UI

### Admin Dashboard (admin.html)
- Sidebar navigation
- Top navigation bar with logout
- Dashboard view with:
  - 4 KPI cards (products, orders, revenue, low stock)
  - Sales chart visualization
  - Recent sales table
- Products management table
- Orders tracking table
- Customers management table
- Settings panel

## 🎨 Design & Styling

### Color Palette
- **Primary**: #c41e3a (Deep Red)
- **Secondary**: #ff6b1a (Warm Orange)
- **Accent**: #ffd700 (Gold)
- **Dark**: #1a1a1a (Charcoal Black)
- **Light**: #f8f8f8 (Soft Gray)

### CSS Features
- CSS Variables for easy theming
- Mobile-first responsive design
- Smooth transitions and animations
- Box shadows for depth
- Rounded corners for modern feel
- Gradient backgrounds

### Responsive Breakpoints
- Mobile: < 480px
- Tablet: 481px - 768px
- Desktop: > 769px

## 💾 Data Storage

All data is stored in browser's localStorage:
- **bentogo_cart** - Shopping cart items
- **bentogo_orders** - Order history
- **bentogo_user** - Logged-in user info

This data persists across sessions but is local to each browser.

## 📊 Menu Items (30 Total)

### Main Dishes (15)
- 3 Taiwan items
- 3 Philippines items
- 3 Japan items
- 3 Korea items
- 3 Thailand items

### Beverages (10)
- 3 Taiwan
- 2 Philippines
- 2 Japan
- 1 Korea
- 2 Thailand

### Sides & Desserts (5)
- 1 Taiwan
- 1 Philippines
- 1 Japan
- 1 Korea
- 1 Thailand

## 🔄 JavaScript Functionality

### Core Functions
- `addToCart(id, name, price)` - Add product to cart
- `removeFromCart(id)` - Remove item from cart
- `updateQuantity(id, qty)` - Change item quantity
- `renderMenuGrid()` - Display menu items
- `filterByCountry()` - Filter products by country
- `filterByCategory()` - Filter by category
- `sortByPrice()` - Sort by price
- `searchMenu()` - Real-time search
- `renderCart()` - Display cart items
- `updateOrderSummary()` - Calculate totals
- `checkout()` - Process order
- `handleLogin()` - Authenticate user
- `showToast()` - Display notifications

### Admin Functions
- `switchAdminSection()` - Navigate admin pages
- `editProduct()` - Edit product
- `deleteProduct()` - Delete product
- `addNewProduct()` - Create new product
- `viewOrder()` - View order details
- `viewCustomer()` - View customer info

## 🎯 Product Image Setup

Currently, the website uses emoji icons as placeholders. To add real product images:

1. Create image files in `/assets/images/products/`
2. Name them descriptively (e.g., `braised-pork-rice.jpg`)
3. Update `script.js` to reference image paths instead of emojis

Example:
```javascript
// Current (emoji)
{ id: 1, name: 'Braised Pork Rice', emoji: '🍚' }

// With images
{ id: 1, name: 'Braised Pork Rice', image: 'assets/images/products/braised-pork-rice.jpg' }
```

## 📈 Future Upgrade Path

### Phase 1: PHP/MySQL Backend
```
Requirements:
- XAMPP or similar
- PHP 7.4+
- MySQL 5.7+

Steps:
1. Set up local PHP server
2. Import database.sql
3. Create API endpoints
4. Replace localStorage with API calls
```

### Phase 2: Advanced Features
- Real user authentication
- Payment gateway integration (Stripe/PayPal)
- Email notifications
- SMS order updates
- Real-time inventory sync
- Multi-language support

### Phase 3: AI & Automation
- Chatbot for customer support
- Recommendation engine
- Delivery integration
- SMS/Email marketing

## 🔒 Security Notes

### Current (Static) Version
- No sensitive data transmission
- Client-side only operations
- Safe for demo/prototype

### When Upgrading to Backend
- Implement proper authentication
- Use HTTPS only
- Hash passwords with bcrypt
- Validate all inputs server-side
- Prevent SQL injection
- Implement CSRF protection
- Use prepared statements

## 📱 Browser Compatibility

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Known Limitations

- Uses localStorage (limited to ~5-10MB)
- No real payment processing
- No email notifications
- No inventory syncing
- Demo data is hardcoded

## 📝 Code Quality

✅ **Clean & Organized**
- Semantic HTML5
- CSS variables for maintainability
- Well-commented JavaScript
- Logical file structure

✅ **Performance**
- No external dependencies
- Minimal CSS/JS
- Fast load times
- Optimized images

✅ **Accessibility**
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Readable color contrast

## 🎓 Educational Value

This project is perfect for learning:
- Responsive web design
- Vanilla JavaScript DOM manipulation
- CSS Grid and Flexbox
- localStorage API
- Form handling
- Mobile-first design approach
- UI/UX best practices
- Professional code organization

## 📞 Support & Contact

**BentoGo Contact:**
- Email: hello@bentogo.com
- Phone: +63 2 8888 BENTO
- Website: https://bentogo.example.com

## 📄 License

This project is provided as a complete starter template. Feel free to customize and use for your own food delivery business.

## 🎉 Credits

Built as a premium fast-food chain website demonstration showcasing:
- Professional web design
- E-commerce functionality
- Responsive layout
- Admin dashboard
- Modern CSS practices
- Vanilla JavaScript proficiency

---

**Last Updated**: April 2024
**Version**: 1.0
**Status**: Production Ready ✅
