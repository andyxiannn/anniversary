// Password configuration - Change this to your desired password
const PASSWORD = "30092023"; // Change this to your secret password

// Authentication state
let isAuthenticated = true;

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

// Gallery configuration
const PHOTO_FOLDER = './Photo/';
const VIDEO_FOLDER = './Videos/';

// File lists - updated with actual filenames containing dates
const PHOTO_FILES = [
    'First Date with Cookies_18092023.JPEG',
    'First time bring you to meet my parents_03122023.JPG',
    'Flower for your Birthday_30102023.JPG',
    'Our anniversary 2_29092024.JPEG',
    'Our anniversary 3_29092024.JPG',
    'Our anniversary_29092024.JPEG',
    'Our first concert with DuaLipa_24112024.JPG',
    'Our First Date at Penang Bridge_07102023.JPG',
    'Our first drawing_07112024.JPG',
    'Our first Golf_02062024.JPG',
    'Our first hiking_05112023.JPG',
    'Our first Oranges_09112024.JPEG',
    'Our first ourdoor photograph_07122023.JPEG',
    'Our first time attending wedding_08032025.JPG',
    'Our first time roller skate together_08122023.JPG',
    'Our first time went to farm_22062025.JPG',
    'Our first time won prize in Pesta_10122023.JPG',
    'Our first trip to Korea_03112024.JPG',
    'Our First Valentines 2024_15022024.JPG',
    'Our official First Date_01102023.JPG',
    'Our picnic with Cookies_16122024.JPG',
    'Our Valentine_14022025.JPG',
    'Your first Birthday after togerther_30102023.JPG',
    'Your First hand-made mooncake_01102023.jpg'
];

const VIDEO_FILES = [
    'Anniverssary.MP4',
    'Jeju Hike.MP4',
    'Silver Grass Jeju.MP4'
];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    startCounters();
    initializeGallery();
    initializeBackgroundMusic();
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

// Function to extract description from filename
function getDescriptionFromFilename(filename) {
    // Remove file extension and date suffix (_DDMMYYYY)
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, "").replace(/_\d{8}$/, "");
    
    // Create a more natural description
    let description = nameWithoutExt
        .replace(/Our first/gi, '💕 Our first')
        .replace(/Our/gi, '💑 Our')
        .replace(/Your/gi, '🥰 Your')
        .replace(/First Date/gi, '💕 First Date')
        .replace(/anniversary/gi, '🎉 Anniversary')
        .replace(/Birthday/gi, '🎂 Birthday')
        .replace(/Valentine/gi, '💝 Valentine\'s Day')
        .replace(/wedding/gi, '💒 Wedding')
        .replace(/concert/gi, '🎵 Concert')
        .replace(/hiking/gi, '🥾 Hiking Adventure')
        .replace(/trip/gi, '✈️ Trip')
        .replace(/Korea/gi, '🇰🇷 Korea')
        .replace(/Jeju/gi, '🏝️ Jeju Island')
        .replace(/picnic/gi, '🧺 Picnic')
        .replace(/drawing/gi, '🎨 Drawing')
        .replace(/Golf/gi, '⛳ Golf')
        .replace(/farm/gi, '🚜 Farm Visit')
        .replace(/roller skate/gi, '⛸️ Roller Skating')
        .replace(/Pesta/gi, '🏆 Pesta Competition')
        .replace(/mooncake/gi, '🥮 Mooncake Making')
        .replace(/Cookies/gi, '🍪 Cookies')
        .replace(/Flower/gi, '🌸 Flowers')
        .replace(/parents/gi, '👨‍👩‍👧‍👦 Parents')
        .replace(/Bridge/gi, '🌉 Bridge')
        .replace(/Oranges/gi, '🍊 Oranges')
        .replace(/photograph/gi, '📸 Photography')
        .replace(/Silver Grass/gi, '🌾 Silver Grass Field')
        .replace(/Together/gi, '💕 Together');
    
    // Clean up any extra spaces
    description = description.replace(/\s+/g, ' ').trim();
    
    return description;
}

// Function to get romantic subtitle based on filename
function getSubtitleFromFilename(filename) {
    // Remove date suffix for better matching
    const name = filename.replace(/_\d{8}\./, '.').toLowerCase();
    
    if (name.includes('first date')) return 'Where our love story began ✨';
    if (name.includes('anniversary')) return 'Celebrating our love 💖';
    if (name.includes('valentine')) return 'A day of romance and love 💕';
    if (name.includes('birthday')) return 'Making your special day magical 🎉';
    if (name.includes('parents')) return 'Meeting the family 👨‍👩‍👧‍👦';
    if (name.includes('wedding')) return 'Celebrating love together 💒';
    if (name.includes('korea') || name.includes('jeju')) return 'Adventures in beautiful Korea 🇰🇷';
    if (name.includes('hiking')) return 'Conquering heights together ⛰️';
    if (name.includes('concert')) return 'Music and memories 🎵';
    if (name.includes('golf')) return 'Sporting fun together ⛳';
    if (name.includes('farm')) return 'Country life adventures 🌾';
    if (name.includes('picnic')) return 'Perfect outdoor moments 🧺';
    if (name.includes('roller skate')) return 'Rolling into fun times ⛸️';
    if (name.includes('drawing')) return 'Creating art together 🎨';
    if (name.includes('mooncake')) return 'Homemade with love 🥮';
    if (name.includes('cookies')) return 'Sweet treats and sweeter moments 🍪';
    if (name.includes('flower')) return 'Blooming with love 🌸';
    if (name.includes('together')) return 'Our journey through time 💕';
    
    return 'Another beautiful memory we share 💝';
}

// Function to extract date from filename with date suffix
function getEstimatedDate(filename) {
    // Extract date from filename format: "filename_DDMMYYYY.ext"
    const dateMatch = filename.match(/_(\d{2})(\d{2})(\d{4})\./);
    
    if (dateMatch) {
        const [, day, month, year] = dateMatch;
        // Create date object (month is 0-indexed in JavaScript)
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }
    
    // Fallback for files without date suffix
    return new Date('2023-10-01');
}

// Function to format date for display
function formatDate(date) {
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Function to load photos
function loadPhotos() {
    const photosGrid = document.getElementById('photos-grid');
    const loading = document.getElementById('gallery-loading');
    
    loading.classList.add('show');
    photosGrid.innerHTML = '';    // Create photo items with estimated dates and sort by date (ascending - oldest first)
    const photoItems = PHOTO_FILES.map(filename => ({
        filename,
        date: getEstimatedDate(filename),
        description: getDescriptionFromFilename(filename),
        subtitle: getSubtitleFromFilename(filename)
    })).sort((a, b) => a.date.getTime() - b.date.getTime()); // Ensure ascending order
    
    // Debug: Log the sorted order
    console.log('Photos sorted by date (oldest to newest):');
    photoItems.forEach(item => {
        console.log(`${formatDate(item.date)} - ${item.filename}`);
    });
    
    setTimeout(() => {
        photoItems.forEach((item, index) => {
            const galleryItem = createPhotoItem(item, index);
            photosGrid.appendChild(galleryItem);
        });
        
        loading.classList.remove('show');
    }, 500);
}

// Function to load videos
function loadVideos() {
    const videosGrid = document.getElementById('videos-grid');
    const loading = document.getElementById('gallery-loading');
    
    loading.classList.add('show');
    videosGrid.innerHTML = '';    // Create video items with estimated dates and sort by date (ascending - oldest first)
    const videoItems = VIDEO_FILES.map(filename => ({
        filename,
        date: getEstimatedDate(filename),
        description: getDescriptionFromFilename(filename),
        subtitle: getSubtitleFromFilename(filename)
    })).sort((a, b) => a.date.getTime() - b.date.getTime()); // Ensure ascending order
    
    setTimeout(() => {
        videoItems.forEach((item, index) => {
            const galleryItem = createVideoItem(item, index);
            videosGrid.appendChild(galleryItem);
        });
        
        loading.classList.remove('show');
    }, 500);
}

// Function to create photo item
function createPhotoItem(item, index) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.style.animationDelay = `${index * 0.1}s`;
    
    galleryItem.innerHTML = `
        <div class="media-container">
            <img src="${PHOTO_FOLDER}${item.filename}" alt="${item.description}" loading="lazy">
            <div class="overlay">
                <h3>${item.description}</h3>
                <p>${item.subtitle}</p>
                <div class="date-info">${formatDate(item.date)}</div>
            </div>
        </div>
    `;
    
    // Add click handler for lightbox
    galleryItem.addEventListener('click', () => {
        openLightbox(PHOTO_FOLDER + item.filename, item.description, item.subtitle, 'image');
    });
    
    return galleryItem;
}

// Function to create video item
function createVideoItem(item, index) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.style.animationDelay = `${index * 0.1}s`;
    
    galleryItem.innerHTML = `
        <div class="media-container">
            <video preload="metadata">
                <source src="${VIDEO_FOLDER}${item.filename}" type="video/mp4">
            </video>
            <div class="video-overlay">
                <i class="fas fa-play"></i>
            </div>
            <div class="overlay">
                <h3>${item.description}</h3>
                <p>${item.subtitle}</p>
                <div class="date-info">${formatDate(item.date)}</div>
            </div>
        </div>
    `;
    
    // Add click handler for lightbox
    galleryItem.addEventListener('click', () => {
        openLightbox(VIDEO_FOLDER + item.filename, item.description, item.subtitle, 'video');
    });
    
    return galleryItem;
}

// Lightbox functionality
function openLightbox(src, title, subtitle, type) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    const mediaElement = type === 'video' 
        ? `<video controls autoplay><source src="${src}" type="video/mp4"></video>`
        : `<img src="${src}" alt="${title}">`;
    
    lightbox.innerHTML = `
        <div class="lightbox-content">
            ${mediaElement}
            <button class="lightbox-close">&times;</button>
            <div class="lightbox-info">
                <h3>${title}</h3>
                <p>${subtitle}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    setTimeout(() => lightbox.classList.add('show'), 10);
    
    // Close handlers
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    
    // ESC key handler
    document.addEventListener('keydown', handleEscKey);
    
    function closeLightbox() {
        lightbox.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(lightbox);
            document.removeEventListener('keydown', handleEscKey);
        }, 300);
    }
    
    function handleEscKey(e) {
        if (e.key === 'Escape') closeLightbox();
    }
}

// Gallery navigation
function initializeGallery() {
    const galleryNavBtns = document.querySelectorAll('.gallery-nav-btn');
    const galleryContents = document.querySelectorAll('.gallery-content');
    
    // Load photos by default
    loadPhotos();
    
    galleryNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const galleryType = btn.getAttribute('data-gallery');
            
            // Update active button
            galleryNavBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update active content
            galleryContents.forEach(content => content.classList.remove('active'));
            
            if (galleryType === 'photos') {
                document.getElementById('photos-gallery').classList.add('active');
                if (document.getElementById('photos-grid').children.length === 0) {
                    loadPhotos();
                }
            } else if (galleryType === 'videos') {
                document.getElementById('videos-gallery').classList.add('active');
                if (document.getElementById('videos-grid').children.length === 0) {
                    loadVideos();
                }
            }
        });
    });
}

// Background Music Control
let bgMusic = null;
let musicToggle = null;
let isMusicPlaying = false;

function initializeBackgroundMusic() {
    bgMusic = document.getElementById('bgMusic');
    musicToggle = document.getElementById('musicToggle');
    
    if (bgMusic && musicToggle) {
        // Set initial volume (not too loud)
        bgMusic.volume = 0.3;
        
        // Music toggle button event
        musicToggle.addEventListener('click', toggleBackgroundMusic);
        
        // Auto-play music when user first interacts with the site
        document.addEventListener('click', startMusicOnFirstInteraction, { once: true });
        
        // Handle music ended event (though it should loop)
        bgMusic.addEventListener('ended', () => {
            if (isMusicPlaying) {
                bgMusic.currentTime = 0;
                bgMusic.play().catch(e => console.log('Music play failed:', e));
            }
        });
        
        // Handle music loading
        bgMusic.addEventListener('canplaythrough', () => {
            console.log('Background music loaded successfully');
        });
        
        bgMusic.addEventListener('error', (e) => {
            console.log('Background music failed to load:', e);
            musicToggle.style.display = 'none'; // Hide button if music fails to load
        });
    }
}

function startMusicOnFirstInteraction() {
    if (bgMusic && !isMusicPlaying) {
        playBackgroundMusic();
    }
}

function toggleBackgroundMusic() {
    if (isMusicPlaying) {
        pauseBackgroundMusic();
    } else {
        playBackgroundMusic();
    }
}

function playBackgroundMusic() {
    if (bgMusic) {
        bgMusic.play().then(() => {
            isMusicPlaying = true;
            musicToggle.classList.add('playing');
            musicToggle.classList.remove('muted');
            musicToggle.title = 'Pause Background Music';
            console.log('Background music started');
        }).catch(e => {
            console.log('Failed to play background music:', e);
        });
    }
}

function pauseBackgroundMusic() {
    if (bgMusic) {
        bgMusic.pause();
        isMusicPlaying = false;
        musicToggle.classList.remove('playing');
        musicToggle.classList.add('muted');
        musicToggle.title = 'Play Background Music';
        console.log('Background music paused');
    }
}

// Volume control functions
function adjustMusicVolume(volume) {
    if (bgMusic) {
        bgMusic.volume = Math.max(0, Math.min(1, volume));
    }
}
