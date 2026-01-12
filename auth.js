// ========================================
// AUTHENTICATION FUNCTIONALITY
// ========================================

// Check if user is logged in on page load
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
    initializeAuthForms();
});

// Check login status and update UI
function checkLoginStatus() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        updateNavForLoggedInUser(user);
    }
}

// Update navigation for logged-in users
function updateNavForLoggedInUser(user) {
    const navActions = document.querySelector('.nav-actions');
    if (!navActions) return;

    // Check if user menu already exists
    if (document.querySelector('.user-menu')) return;

    // Create user menu
    const userMenu = document.createElement('div');
    userMenu.className = 'user-menu';
    userMenu.innerHTML = `
        <button class="user-button" id="userButton">
            <span class="user-avatar">👤</span>
            <span class="user-name">${user.firstName}</span>
        </button>
        <div class="user-dropdown" id="userDropdown">
            <a href="#" class="dropdown-item">
                <span>👤</span> My Profile
            </a>
            <a href="#" class="dropdown-item">
                <span>📦</span> My Orders
            </a>
            <a href="#" class="dropdown-item">
                <span>⚙️</span> Settings
            </a>
            <hr class="dropdown-divider">
            <a href="#" class="dropdown-item" id="logoutBtn">
                <span>🚪</span> Logout
            </a>
        </div>
    `;

    // Insert before cart icon
    const cartIcon = navActions.querySelector('.cart-icon');
    navActions.insertBefore(userMenu, cartIcon);

    // Add event listeners
    const userButton = document.getElementById('userButton');
    const userDropdown = document.getElementById('userDropdown');
    const logoutBtn = document.getElementById('logoutBtn');

    userButton.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!userMenu.contains(e.target)) {
            userDropdown.classList.remove('active');
        }
    });

    // Logout functionality
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
    });
}

// Initialize auth forms
function initializeAuthForms() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
}

// Handle login
function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Find user
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Save current user
        localStorage.setItem('currentUser', JSON.stringify({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            city: user.city
        }));

        // Show success message
        showNotification('Login successful! Welcome back ' + user.firstName, 'success');

        // Redirect to home page after 1 second
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        showNotification('Invalid email or password. Please try again.', 'error');
    }
}

// Handle signup
function handleSignup(e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('phone').value;
    const city = document.getElementById('city').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;

    // Validation
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }

    if (!agreeTerms) {
        showNotification('Please agree to the Terms & Conditions', 'error');
        return;
    }

    // Get existing users
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if email already exists
    if (users.some(u => u.email === email)) {
        showNotification('Email already registered. Please login.', 'error');
        return;
    }

    // Create new user
    const newUser = {
        id: Date.now(),
        firstName,
        lastName,
        email,
        phone,
        city,
        password,
        createdAt: new Date().toISOString()
    };

    // Save user
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Auto login
    localStorage.setItem('currentUser', JSON.stringify({
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phone: newUser.phone,
        city: newUser.city
    }));

    // Show success message
    showNotification('Account created successfully! Welcome ' + firstName, 'success');

    // Redirect to home page
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    showNotification('Logged out successfully', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Hide notification after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Forgot password (placeholder)
document.addEventListener('DOMContentLoaded', () => {
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Password reset functionality will be implemented soon. Please contact support.', 'info');
        });
    }
});
