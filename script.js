// Password configuration - Change this to your desired password
const PASSWORD = "ourlove2025"; // Change this to your secret password

// Authentication state
let isAuthenticated = false;

// DOM elements
const loginScreen = document.getElementById('loginScreen');
const mainContent = document.getElementById('mainContent');
const loginForm = document.getElementById('loginForm');
const passwordInput = document.getElementById('passwordInput');
const errorMessage = document.getElementById('errorMessage');
const logoutBtn = document.getElementById('logoutBtn');

// Navigation elements
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('.section');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    startCounters();
});

function initializeApp() {
    // Check if user is already authenticated (stored in session)
    if (sessionStorage.getItem('authenticated') === 'true') {
        showMainContent();
    } else {
        showLoginScreen();
    }
}

function setupEventListeners() {
    // Login form submission
    loginForm.addEventListener('submit', handleLogin);
    
    // Logout button
    logoutBtn.addEventListener('click', handleLogout);
    
    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // Enter key on password input
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleLogin(e);
        }
    });
}

function handleLogin(e) {
    e.preventDefault();
    
    const enteredPassword = passwordInput.value.trim();
    
    if (enteredPassword === PASSWORD) {
        // Correct password
        sessionStorage.setItem('authenticated', 'true');
        showSuccessMessage();
        setTimeout(() => {
            showMainContent();
        }, 1000);
    } else {
        // Wrong password
        showErrorMessage('Incorrect password. Try again! 💕');
        passwordInput.value = '';
        passwordInput.focus();
        
        // Add shake animation
        passwordInput.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            passwordInput.style.animation = '';
        }, 500);
    }
}

function handleLogout() {
    sessionStorage.removeItem('authenticated');
    showLoginScreen();
    passwordInput.value = '';
    errorMessage.textContent = '';
    errorMessage.classList.remove('show');
}

function showLoginScreen() {
    loginScreen.classList.remove('hidden');
    mainContent.classList.add('hidden');
    passwordInput.focus();
}

function showMainContent() {
    loginScreen.classList.add('hidden');
    mainContent.classList.remove('hidden');
    
    // Show home section by default
    showSection('home');
}

function showErrorMessage(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    
    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 3000);
}

function showSuccessMessage() {
    errorMessage.textContent = 'Welcome to our love story! 💕';
    errorMessage.style.color = '#4CAF50';
    errorMessage.classList.add('show');
}

function handleNavigation(e) {
    e.preventDefault();
    
    const targetSection = e.target.getAttribute('data-section');
    showSection(targetSection);
    
    // Update active nav link
    navLinks.forEach(link => link.classList.remove('active'));
    e.target.classList.add('active');
}

function showSection(sectionId) {
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
}

function startCounters() {
    // Set your relationship start date here
    const relationshipStart = new Date('2023-09-30'); // Change this to your actual start date
    
    function updateCounters() {
        const now = new Date();
        const timeDiff = now - relationshipStart;
        
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor(timeDiff / (1000 * 60));
        
        // Animate counter updates
        animateCounter('daysCounter', days);
        animateCounter('hoursCounter', hours);
        animateCounter('minutesCounter', minutes);
    }
    
    // Update counters every minute
    updateCounters();
    setInterval(updateCounters, 60000);
}

function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const currentValue = parseInt(element.textContent) || 0;
    const increment = Math.ceil((targetValue - currentValue) / 10);
    
    if (currentValue < targetValue) {
        element.textContent = Math.min(currentValue + increment, targetValue);
        setTimeout(() => animateCounter(elementId, targetValue), 50);
    } else {
        element.textContent = targetValue.toLocaleString();
    }
}

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add CSS for shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Add click effect to gallery items
document.addEventListener('click', function(e) {
    if (e.target.closest('.gallery-item')) {
        const item = e.target.closest('.gallery-item');
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            item.style.transform = '';
        }, 150);
    }
});

// Add heart particle effect on successful login
function createHeartParticles() {
    const colors = ['#ff6b6b', '#ff8e8e', '#ffa8a8', '#ffcccc'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💕';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '100vh';
            heart.style.fontSize = Math.random() * 20 + 10 + 'px';
            heart.style.zIndex = '9999';
            heart.style.pointerEvents = 'none';
            heart.style.animation = `floatUp ${Math.random() * 3 + 2}s ease-out forwards`;
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, i * 100);
    }
}

// Add the floatUp animation
const heartStyle = document.createElement('style');
heartStyle.textContent = `
    @keyframes floatUp {
        to {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(heartStyle);

// Console message for developers
console.log(`
💕 Welcome to Our Anniversary Website! 💕

This website was created with love for a special anniversary.
To customize this website:

1. Change the password in script.js (line 2)
2. Update the relationship start date in script.js (line 147)
3. Replace image placeholders with your actual photos
4. Customize the timeline events and memory cards
5. Update the text content to match your story

Made with ❤️ for love!
`);

// Prevent right-click context menu (optional security measure)
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Disable F12 and other developer shortcuts (optional)
document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
    }
});
