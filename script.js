// ========================================
// GLOBAL VARIABLES & STATE
// ========================================
let cart = [];
let currency = 'PKR';
const exchangeRate = 280; // 1 USD = 280 PKR (approximate)

// Sample product data
const products = {
    1: { 
        id: 1, 
        name: 'Premium Red Sindhi Cattle', 
        price: 180000, 
        category: 'cattle', 
        breed: 'Red Sindhi',
        breedUrdu: 'گائے',
        weight: 350,
        age: '4 Teeth (2 Years)',
        location: 'Karachi, Sindh',
        images: ['red-sindhi-1.jpg', 'red-sindhi-2.jpg', 'red-sindhi-2 (1).jpg', 'red-sindhi-3.jpg'],
        ageRequirement: '2+ years for cattle'
    },
    2: { 
        id: 2, 
        name: 'Sahiwal Bull', 
        price: 165000, 
        category: 'cattle', 
        breed: 'Sahiwal',
        breedUrdu: 'بیل',
        weight: 320,
        age: 'Donda',
        location: 'Lahore, Punjab',
        images: ['sahiwal Front View.jpg'],
        ageRequirement: '2+ years for cattle'
    },
    3: { 
        id: 3, 
        name: 'Cholistani Bull', 
        price: 195000, 
        category: 'cattle', 
        breed: 'Cholistani',
        breedUrdu: 'بیل',
        weight: 380,
        age: '6 Teeth',
        location: 'Multan, Punjab',
        images: ['Cholistani Front View.jpg'],
        ageRequirement: '2+ years for cattle'
    },
    4: { 
        id: 4, 
        name: 'Premium Beetal Goat', 
        price: 45000, 
        category: 'goats', 
        breed: 'Beetal',
        breedUrdu: 'بکرا',
        weight: 55,
        age: '2 Teeth',
        location: 'Lahore, Punjab',
        images: ['Beetal Goat Front View.jpg'],
        ageRequirement: '1+ years for goats'
    },
    5: { 
        id: 5, 
        name: 'Teddy Goat', 
        price: 38000, 
        category: 'goats', 
        breed: 'Teddy',
        breedUrdu: 'بکرا',
        weight: 48,
        age: 'Donda',
        location: 'Faisalabad, Punjab',
        images: ['Teddy Goat Front View.jpg'],
        ageRequirement: '1+ years for goats'
    },
    6: { 
        id: 6, 
        name: 'Kamori Goat', 
        price: 52000, 
        category: 'goats', 
        breed: 'Kamori',
        breedUrdu: 'بکرا',
        weight: 62,
        age: '4 Teeth',
        location: 'Hyderabad, Sindh',
        images: ['Kamori Goat Front View.jpg'],
        ageRequirement: '1+ years for goats'
    },
    7: { 
        id: 7, 
        name: 'Kachhi Sheep', 
        price: 42000, 
        category: 'sheep', 
        breed: 'Kachhi',
        breedUrdu: 'بھیڑ',
        weight: 45,
        age: '2 Teeth',
        location: 'Quetta, Balochistan',
        images: ['Kachhi Sheep Front View.jpg'],
        ageRequirement: '1+ years for sheep'
    },
    8: { 
        id: 8, 
        name: 'Lohi Sheep', 
        price: 48000, 
        category: 'sheep', 
        breed: 'Lohi',
        breedUrdu: 'بھیڑ',
        weight: 52,
        age: 'Donda',
        location: 'Lahore, Punjab',
        images: ['Lohi Sheep Front View.jpg'],
        ageRequirement: '1+ years for sheep'
    },
    9: { 
        id: 9, 
        name: 'Harnai Sheep', 
        price: 54000, 
        category: 'sheep', 
        breed: 'Harnai',
        breedUrdu: 'بھیڑ',
        weight: 58,
        age: '4 Teeth',
        location: 'Quetta, Balochistan',
        images: ['Harnai Sheep Front View.jpg'],
        ageRequirement: '1+ years for sheep'
    },
    10: { 
        id: 10, 
        name: 'Premium Dromedary Camel', 
        price: 320000, 
        category: 'camels', 
        breed: 'Dromedary',
        breedUrdu: 'اونٹ',
        weight: 520,
        age: '6 Teeth',
        location: 'Bahawalpur, Punjab',
        images: ['Camel Front View.jpg'],
        ageRequirement: '5+ years for camels'
    },
    11: { 
        id: 11, 
        name: 'Dromedary Camel (Bari)', 
        price: 295000, 
        category: 'camels', 
        breed: 'Dromedary',
        breedUrdu: 'اونٹ',
        weight: 480,
        age: '5 Teeth',
        location: 'Rahimyar Khan, Punjab',
        images: ['Camel Alternate View.jpg'],
        ageRequirement: '5+ years for camels'
    },
    12: { 
        id: 12, 
        name: 'Champion Beetal Goat', 
        price: 50000, 
        category: 'goats', 
        breed: 'Beetal',
        breedUrdu: 'بکرا',
        weight: 60,
        age: '4 Teeth',
        location: 'Islamabad',
        images: ['Beetal Goat (Alternate View).jpg'],
        ageRequirement: '1+ years for goats'
    }
};

// ========================================
// MOBILE MENU TOGGLE
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && !navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            if (mobileMenuToggle) mobileMenuToggle.textContent = '☰';
        }
    });

    // Load cart from localStorage
    loadCart();
    updateCartUI();
    
    // Update navigation for logged-in users
    updateAuthNav();
});

// Update navigation based on auth status
function updateAuthNav() {
    const currentUser = localStorage.getItem('currentUser');
    const loginBtn = document.getElementById('loginNavBtn');
    const signupBtn = document.getElementById('signupNavBtn');
    
    if (currentUser && loginBtn && signupBtn) {
        // Hide login/signup buttons for logged-in users
        loginBtn.style.display = 'none';
        signupBtn.style.display = 'none';
    }
}

// ========================================
// CURRENCY TOGGLE
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const currencyToggle = document.getElementById('currencyToggle');
    
    if (currencyToggle) {
        currencyToggle.addEventListener('click', () => {
            currency = currency === 'PKR' ? 'USD' : 'PKR';
            currencyToggle.textContent = currency;
            updateAllPrices();
        });
    }
});

function formatPrice(price) {
    if (currency === 'USD') {
        const usdPrice = Math.round(price / exchangeRate);
        return `$${usdPrice.toLocaleString()}`;
    }
    return `PKR ${price.toLocaleString()}`;
}

function updateAllPrices() {
    // Update prices on shop page
    document.querySelectorAll('.price-amount').forEach(el => {
        const pkrPrice = parseInt(el.dataset.pkr || el.textContent.replace(/[^\d]/g, ''));
        el.dataset.pkr = pkrPrice;
        el.textContent = formatPrice(pkrPrice);
    });

    // Update cart total
    updateCartUI();
}

// ========================================
// SHOPPING CART FUNCTIONALITY
// ========================================
function loadCart() {
    const savedCart = localStorage.getItem('qurbanifyCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

function saveCart() {
    localStorage.setItem('qurbanifyCart', JSON.stringify(cart));
}

function addToCart(productId) {
    const product = products[productId];
    if (!product) {
        alert('Product not found');
        return;
    }

    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        alert('This animal is already in your cart');
        return;
    }

    cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
    });

    saveCart();
    updateCartUI();
    openCart();
    
    // Show success message
    showNotification('Added to cart successfully!');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function clearCart() {
    if (cart.length === 0) {
        alert('Your cart is already empty');
        return;
    }
    
    if (confirm('Are you sure you want to clear all items from your cart?')) {
        cart = [];
        saveCart();
        updateCartUI();
        showNotification('Cart cleared successfully!');
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (cartCount) {
        cartCount.textContent = cart.length;
    }

    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        } else {
            cartItems.innerHTML = cart.map(item => {
                const product = products[item.id];
                const imagePath = product && product.images && product.images[0] 
                    ? `images/products/${product.images[0]}` 
                    : 'images/placeholder.jpg';
                const breed = product ? product.breed : '';
                const weight = product ? product.weight : '';
                
                return `
                <div class="cart-item-large">
                    <div class="cart-item-image">
                        <img src="${imagePath}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p class="cart-item-breed">Breed: ${breed}${weight ? ' • ' + weight + ' kg' : ''}</p>
                        <p class="cart-item-price">${formatPrice(item.price)}</p>
                    </div>
                    <button onclick="removeFromCart(${item.id})" class="cart-item-remove" title="Remove item">&times;</button>
                </div>
            `;
            }).join('');
        }
    }

    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotal.textContent = formatPrice(total);
    }
    
    // Update second total display in payment view
    const cartTotal2 = document.getElementById('cartTotal2');
    if (cartTotal2) {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotal2.textContent = formatPrice(total);
    }
    
    // Reset to cart view when cart is updated
    showCartView();
}

function showCartView() {
    const cartView = document.getElementById('cartView');
    const paymentView = document.getElementById('paymentView');
    const continueBtn = document.getElementById('continueToPaymentBtn');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (cartView) cartView.style.display = 'block';
    if (paymentView) paymentView.style.display = 'none';
    if (continueBtn) continueBtn.style.display = cart.length > 0 ? 'block' : 'none';
    if (checkoutBtn) checkoutBtn.style.display = 'none';
}

function showPaymentView() {
    const cartView = document.getElementById('cartView');
    const paymentView = document.getElementById('paymentView');
    const continueBtn = document.getElementById('continueToPaymentBtn');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (cartView) cartView.style.display = 'none';
    if (paymentView) paymentView.style.display = 'block';
    if (continueBtn) continueBtn.style.display = 'none';
    if (checkoutBtn) checkoutBtn.style.display = 'block';
}

function openCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
        cartSidebar.classList.add('active');
        showCartView();
    }
}

function closeCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
        cartSidebar.classList.remove('active');
    }
}

// Cart event listeners
document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cartIcon');
    const closeCartBtn = document.getElementById('closeCart');
    const checkoutBtn = document.getElementById('checkoutBtn');

    if (cartIcon) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });
    }

    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCart);
    }

    const clearCartBtn = document.getElementById('clearCartBtn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }

    const continueToPaymentBtn = document.getElementById('continueToPaymentBtn');
    if (continueToPaymentBtn) {
        continueToPaymentBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty');
                return;
            }
            showPaymentView();
        });
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty');
                return;
            }
            
            // Get selected payment method
            const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked');
            const paymentMethod = selectedPayment ? selectedPayment.value : 'bop';
            
            let paymentName = '';
            switch(paymentMethod) {
                case 'bop':
                    paymentName = 'Bank of Punjab';
                    break;
                case 'jazzcash':
                    paymentName = 'JazzCash';
                    break;
                case 'easypaisa':
                    paymentName = 'Easypaisa';
                    break;
                case 'bank_transfer':
                    paymentName = 'Bank Transfer';
                    break;
                case 'cod':
                    paymentName = 'Cash on Delivery';
                    break;
                default:
                    paymentName = 'Bank of Punjab';
            }
            
            const total = cart.reduce((sum, item) => sum + item.price, 0);
            alert(`Order Summary:\n\nPayment Method: ${paymentName}\nTotal: ${formatPrice(total)}\n\nCheckout functionality will be implemented. For now, please contact us via WhatsApp to complete your order.`);
            // In production, this would redirect to checkout page with payment method
        });
    }

    // Close cart when clicking outside
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
        document.addEventListener('click', (e) => {
            if (!cartSidebar.contains(e.target) && !cartIcon.contains(e.target) && cartSidebar.classList.contains('active')) {
                closeCart();
            }
        });
    }
});

// ========================================
// SHOP PAGE FILTERS
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.getElementById('productsGrid');
    const sortSelect = document.getElementById('sortSelect');
    const resetFiltersBtn = document.getElementById('resetFilters');

    if (productsGrid) {
        // Filter functionality
        const filterCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
        filterCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', applyFilters);
        });

        // Sort functionality
        if (sortSelect) {
            sortSelect.addEventListener('change', applySorting);
        }

        // Reset filters
        if (resetFiltersBtn) {
            resetFiltersBtn.addEventListener('click', () => {
                filterCheckboxes.forEach(checkbox => {
                    checkbox.checked = checkbox.value === 'all' || checkbox.name === 'qurbani';
                });
                applyFilters();
            });
        }
    }
});

function applyFilters() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    const products = productsGrid.querySelectorAll('.product-card');
    let visibleCount = 0;

    // Get selected filters
    const selectedCategories = getSelectedFilters('category');
    const selectedBreeds = getSelectedFilters('breed');
    const selectedWeights = getSelectedFilters('weight');
    const selectedPrices = getSelectedFilters('price');

    products.forEach(product => {
        let show = true;

        // Category filter
        if (selectedCategories.length > 0 && !selectedCategories.includes('all')) {
            const category = product.dataset.category;
            if (!selectedCategories.includes(category)) {
                show = false;
            }
        }

        // Breed filter
        if (selectedBreeds.length > 0) {
            const breed = product.dataset.breed;
            if (!selectedBreeds.includes(breed)) {
                show = false;
            }
        }

        // Weight filter
        if (selectedWeights.length > 0) {
            const weight = parseInt(product.dataset.weight);
            let weightMatch = false;
            selectedWeights.forEach(range => {
                const [min, max] = range.split('-').map(v => v.replace('+', '') ? parseInt(v.replace('+', '')) : Infinity);
                if (range.includes('+')) {
                    if (weight >= min) weightMatch = true;
                } else {
                    if (weight >= min && weight <= max) weightMatch = true;
                }
            });
            if (!weightMatch) show = false;
        }

        // Price filter
        if (selectedPrices.length > 0) {
            const price = parseInt(product.dataset.price);
            let priceMatch = false;
            selectedPrices.forEach(range => {
                const [min, max] = range.split('-').map(v => v.replace('+', '') ? parseInt(v.replace('+', '')) : Infinity);
                if (range.includes('+')) {
                    if (price >= min) priceMatch = true;
                } else {
                    if (price >= min && price <= max) priceMatch = true;
                }
            });
            if (!priceMatch) show = false;
        }

        product.style.display = show ? 'block' : 'none';
        if (show) visibleCount++;
    });

    // Update results count
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        resultsCount.textContent = visibleCount;
    }
}

function getSelectedFilters(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    return Array.from(checkboxes).map(cb => cb.value);
}

function applySorting() {
    const productsGrid = document.getElementById('productsGrid');
    const sortSelect = document.getElementById('sortSelect');
    if (!productsGrid || !sortSelect) return;

    const products = Array.from(productsGrid.querySelectorAll('.product-card'));
    const sortValue = sortSelect.value;

    products.sort((a, b) => {
        const priceA = parseInt(a.dataset.price);
        const priceB = parseInt(b.dataset.price);
        const weightA = parseInt(a.dataset.weight);
        const weightB = parseInt(b.dataset.weight);

        switch (sortValue) {
            case 'price-low':
                return priceA - priceB;
            case 'price-high':
                return priceB - priceA;
            case 'weight-low':
                return weightA - weightB;
            case 'weight-high':
                return weightB - weightA;
            default:
                return 0;
        }
    });

    products.forEach(product => productsGrid.appendChild(product));
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-green);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// URL PARAMETER HANDLING (for category links)
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category) {
        // Uncheck "all" and check the specific category
        const allCheckbox = document.querySelector('input[name="category"][value="all"]');
        if (allCheckbox) allCheckbox.checked = false;
        
        const categoryCheckbox = document.querySelector(`input[name="category"][value="${category}"]`);
        if (categoryCheckbox) {
            categoryCheckbox.checked = true;
            applyFilters();
        }
    }
});

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#!') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ========================================
// MAKE FUNCTIONS GLOBAL FOR INLINE ONCLICK
// ========================================
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.openCart = openCart;
window.closeCart = closeCart;

// ========================================
// PRODUCT DETAIL PAGE DYNAMIC LOADING
// ========================================
function loadProductDetails() {
    // Get product ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (!productId || !products[productId]) {
        console.log('Product not found, showing default product');
        return; // Keep default product displayed
    }
    
    const product = products[productId];
    
    // Update page title
    document.title = `${product.name} | e-Qurbanify`;
    
    // Update main product image
    const mainImage = document.getElementById('mainImage');
    if (mainImage && product.images && product.images.length > 0) {
        mainImage.innerHTML = `<img src="images/products/${product.images[0]}" alt="${product.name}">`;
    }
    
    // Update thumbnail gallery - show only this product's images
    const thumbnailGallery = document.querySelector('.thumbnail-gallery');
    if (thumbnailGallery && product.images && product.images.length > 0) {
        let thumbnailsHTML = '';
        product.images.forEach((image, index) => {
            const activeClass = index === 0 ? 'active' : '';
            thumbnailsHTML += `
                <div class="thumbnail ${activeClass}" onclick="changeImage('images/products/${image}', this)">
                    <img src="images/products/${image}" alt="${product.name} ${index + 1}">
                </div>
            `;
        });
        thumbnailGallery.innerHTML = thumbnailsHTML;
    }
    
    // Update product title and subtitle
    const productTitle = document.querySelector('.product-title-section h1');
    if (productTitle) {
        productTitle.textContent = product.name;
    }
    
    const productSubtitle = document.querySelector('.product-subtitle');
    if (productSubtitle) {
        productSubtitle.textContent = `Breed: ${product.breed} • ${product.breedUrdu}`;
    }
    
    // Update price
    const priceMain = document.querySelector('.price-main');
    if (priceMain) {
        priceMain.textContent = `PKR ${product.price.toLocaleString()}`;
    }
    
    const priceUsd = document.querySelector('.price-usd');
    if (priceUsd) {
        const usdPrice = Math.round(product.price / exchangeRate);
        priceUsd.textContent = `≈ $${usdPrice} USD`;
    }
    
    // Update product info grid
    const infoItems = document.querySelectorAll('.info-item');
    if (infoItems.length >= 4) {
        // Live Weight
        infoItems[0].querySelector('.info-value').textContent = `${product.weight} kg`;
        
        // Age/Teeth Status
        infoItems[1].querySelector('.info-value').textContent = product.age;
        
        // Farm Location
        infoItems[2].querySelector('.info-value').textContent = product.location;
        
        // Breed Type
        infoItems[3].querySelector('.info-value').textContent = product.breed;
    }
    
    // Update compliance section age requirement
    const complianceList = document.querySelector('.compliance-list');
    if (complianceList) {
        const firstLi = complianceList.querySelector('li:first-child');
        if (firstLi) {
            firstLi.textContent = `Meets Islamic age requirement for Qurbani (${product.ageRequirement})`;
        }
    }
    
    // Update add to cart button with correct product ID
    const addToCartBtn = document.querySelector('.action-buttons .btn-primary');
    if (addToCartBtn) {
        addToCartBtn.setAttribute('onclick', `addToCart(${product.id})`);
    }
    
    console.log(`Loaded product details for: ${product.name}`);
}

// Load product details when DOM is ready (only on product-detail.html)
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on product detail page by looking for specific elements
    if (document.querySelector('.product-detail-section')) {
        loadProductDetails();
    }
});

console.log('e-Qurbanify scripts loaded successfully');
