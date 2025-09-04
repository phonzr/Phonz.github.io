// Meme data with additional metadata
const memes = [
    {
        id: 1,
        title: "Distracted Boyfriend",
        url: "https://i.imgflip.com/1bgw.jpg",
        category: "funny",
        tags: ["dating", "relationships", "funny"],
        likes: 1243,
        comments: 89,
        shares: 45,
        views: 15000,
        author: "meme_lord",
        timestamp: "2023-05-15T14:30:00Z"
    },
    {
        id: 2,
        title: "Drake Hotline Bling",
        url: "https://i.imgflip.com/30b1gx.jpg",
        category: "reaction",
        tags: ["drake", "music", "reaction"],
        likes: 987,
        comments: 67,
        shares: 32,
        views: 12000,
        author: "drake_fan_42",
        timestamp: "2023-05-14T09:15:00Z"
    },
    {
        id: 3,
        title: "Two Buttons",
        url: "https://i.imgflip.com/1g8my4.jpg",
        category: "decisions",
        tags: ["choices", "funny", "dilemma"],
        likes: 1567,
        comments: 123,
        shares: 78,
        views: 25000,
        author: "the_chooser",
        timestamp: "2023-05-13T16:45:00Z"
    },
    {
        id: 4,
        title: "Batman Slapping Robin",
        url: "https://i.imgflip.com/9ehk.jpg",
        category: "comics",
        tags: ["batman", "robin", "dc", "comics"],
        likes: 2034,
        comments: 156,
        shares: 94,
        views: 30000,
        author: "comic_geek",
        timestamp: "2023-05-12T11:20:00Z"
    },
    {
        id: 5,
        title: "Expanding Brain",
        url: "https://i.imgflip.com/1jwh0h.jpg",
        category: "meme",
        tags: ["brain", "thinking", "evolution"],
        likes: 1789,
        comments: 134,
        shares: 67,
        views: 28000,
        author: "big_thinker",
        timestamp: "2023-05-11T14:10:00Z"
    },
    {
        id: 6,
        title: "Left Exit 12 Off Ramp",
        url: "https://i.imgflip.com/1bij.jpg",
        category: "funny",
        tags: ["driving", "signs", "funny"],
        likes: 1456,
        comments: 98,
        shares: 54,
        views: 19000,
        author: "road_warrior",
        timestamp: "2023-05-10T10:30:00Z"
    },
    {
        id: 7,
        title: "Waiting Skeleton",
        url: "https://i.imgflip.com/9vct.jpg",
        category: "reaction",
        tags: ["waiting", "time", "funny"],
        likes: 1123,
        comments: 76,
        shares: 43,
        views: 16000,
        author: "skeleton_crew",
        timestamp: "2023-05-09T08:15:00Z"
    },
    {
        id: 8,
        title: "Y'all Got Any More Of That",
        url: "https://i.imgflip.com/24y43o.jpg",
        category: "reaction",
        tags: ["addiction", "funny", "reaction"],
        likes: 1654,
        comments: 112,
        shares: 67,
        views: 22000,
        author: "meme_addict",
        timestamp: "2023-05-08T13:25:00Z"
    },
    {
        id: 9,
        title: "One Does Not Simply",
        url: "https://i.imgflip.com/1bij.jpg",
        category: "lotr",
        tags: ["lord of the rings", "boromir", "funny"],
        likes: 1987,
        comments: 143,
        shares: 89,
        views: 32000,
        author: "lotr_fan",
        timestamp: "2023-05-07T15:40:00Z"
    },
    {
        id: 10,
        title: "Change My Mind",
        url: "https://i.imgflip.com/24y43o.jpg",
        category: "debate",
        tags: ["opinion", "discussion", "funny"],
        likes: 1765,
        comments: 154,
        shares: 98,
        views: 28000,
        author: "debate_lord",
        timestamp: "2023-05-06T12:20:00Z"
    },
    {
        id: 11,
        title: "One Does Not Simply",
        url: "https://i.imgflip.com/1bij.jpg"
    },
    {
        id: 12,
        title: "Ancient Aliens Guy",
        url: "https://i.imgflip.com/1igkv0.jpg"
    },
    {
        id: 13,
        title: "Disaster Girl",
        url: "https://i.imgflip.com/23ls.jpg"
    },
    {
        id: 14,
        title: "Y U No",
        url: "https://i.imgflip.com/9vct.jpg"
    },
    {
        id: 15,
        title: "Grumpy Cat",
        url: "https://i.imgflip.com/9vct.jpg"
    },
    {
        id: 16,
        title: "Success Kid",
        url: "https://i.imgflip.com/1bij.jpg"
    }
];

// DOM Elements
const memeContainer = document.getElementById('memeContainer');
const loadMoreBtn = document.getElementById('loadMore');
const loadingScreen = document.getElementById('loadingScreen');
const preloader = document.getElementById('preloader');
const mainContent = document.querySelector('.main-content');
const searchInput = document.querySelector('.search-bar input');
const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.querySelector('.sidebar-toggle');
const settingsBtn = document.querySelector('.settings-btn');
const settingsPanel = document.querySelector('.settings-panel');
const closeSettings = document.querySelector('.close-settings');
const themeToggle = document.getElementById('themeToggle');
const notificationContainer = document.getElementById('notificationContainer');

// App State
let currentPage = 1;
const memesPerPage = 12;
let isLoading = false;
let allMemes = [...memes]; // Create a copy of the original memes array

// Initialize the app
function init() {
    // Start preloader
    startPreloader();
    
    // Initialize UI components
    initUI();
    
    // Initialize event listeners
    initEventListeners();
    
    // Initialize animations
    initAnimations();
    
    // Load initial memes after preloader
    setTimeout(() => {
        loadMemes();
        
        // Hide preloader and show loading screen
        hidePreloader();
        showLoadingScreen();
    }, 1500);
}

// Start preloader animation
function startPreloader() {
    const preloaderStatus = document.querySelector('.preloader-status');
    const progressBar = document.querySelector('.preloader-progress .progress-bar');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
        }
        
        // Update progress bar
        progressBar.style.width = `${progress}%`;
        
        // Update status text based on progress
        if (progress < 30) {
            preloaderStatus.textContent = 'Initializing...';
        } else if (progress < 60) {
            preloaderStatus.textContent = 'Loading assets...';
        } else if (progress < 90) {
            preloaderStatus.textContent = 'Preparing UI...';
        } else {
            preloaderStatus.textContent = 'Almost there...';
        }
    }, 100);
}

// Hide preloader
function hidePreloader() {
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
}

// Show loading screen
function showLoadingScreen() {
    loadingScreen.style.display = 'flex';
    
    // Force reflow to enable animation
    void loadingScreen.offsetWidth;
    
    loadingScreen.style.opacity = '1';
    
    // Simulate loading progress
    let progress = 0;
    const loadingProgress = document.querySelector('.loading-progress-bar');
    const memesLoadedEl = document.querySelector('.loading-stats .stat:first-child span');
    const loadingSpeedEl = document.querySelector('.loading-stats .stat:nth-child(2) span');
    
    const interval = setInterval(() => {
        progress += Math.random() * 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Hide loading screen with delay
            setTimeout(() => {
                hideLoadingScreen();
            }, 500);
        }
        
        // Update progress bar
        loadingProgress.style.width = `${progress}%`;
        
        // Update loading stats
        const memesLoaded = Math.floor((progress / 100) * memes.length);
        if (memesLoadedEl) memesLoadedEl.textContent = memesLoaded;
        
        // Simulate loading speed
        const speed = (Math.random() * 5 + 1).toFixed(1);
        if (loadingSpeedEl) loadingSpeedEl.textContent = speed;
        
    }, 100);
}

// Hide loading screen
function hideLoadingScreen() {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        // Show main content
        mainContent.style.opacity = '1';
        // Show notification
        showNotification('success', 'Welcome to Meme Gallery!', 'Start exploring the latest and greatest memes.');
    }, 500);
}

// Initialize UI components
function initUI() {
    // Initialize custom cursor
    initCustomCursor();
    
    // Initialize tooltips
    initTooltips();
    
    // Set initial theme
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        if (themeToggle) themeToggle.checked = true;
    }
}

// Initialize event listeners
function initEventListeners() {
    // Load more button
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreMemes);
    }
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Sidebar toggle
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Settings panel
    if (settingsBtn) {
        settingsBtn.addEventListener('click', toggleSettingsPanel);
    }
    
    if (closeSettings) {
        closeSettings.addEventListener('click', toggleSettingsPanel);
    }
    
    // Close settings when clicking outside
    document.addEventListener('click', (e) => {
        if (settingsPanel && !settingsPanel.contains(e.target) && 
            settingsBtn && !settingsBtn.contains(e.target) && 
            settingsPanel.classList.contains('show')) {
            toggleSettingsPanel();
        }
    });
    
    // Theme toggler
    if (themeToggle) {
        themeToggle.addEventListener('change', toggleTheme);
    }
}

// Toggle sidebar
function toggleSidebar() {
    document.body.classList.toggle('sidebar-collapsed');
    localStorage.setItem('sidebarCollapsed', document.body.classList.contains('sidebar-collapsed'));
}

// Toggle settings panel
function toggleSettingsPanel() {
    settingsPanel.classList.toggle('show');
    
    // Toggle body scroll when settings are open
    if (settingsPanel.classList.contains('show')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Toggle dark/light theme
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    
    // Save preference to localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Initialize custom cursor
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;
    
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor animation
    const updateCursor = () => {
        // Ease for main cursor
        posX += (mouseX - posX) / 9;
        posY += (mouseY - posY) / 9;
        
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        cursorFollower.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
        
        requestAnimationFrame(updateCursor);
    };
    
    updateCursor();
    
    // Hover effects
    const hoverElements = ['a', 'button', '.meme-card', '.btn', 'input', 'select', 'textarea'];
    hoverElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
                cursorFollower.classList.add('cursor-follower-hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
                cursorFollower.classList.remove('cursor-follower-hover');
            });
        });
    });
}

// Initialize tooltips
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(el => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = el.getAttribute('data-tooltip');
        document.body.appendChild(tooltip);
        
        el.addEventListener('mouseenter', (e) => {
            const rect = el.getBoundingClientRect();
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
            
            // Position tooltip above the element
            tooltip.style.bottom = `${window.innerHeight - rect.top + 10}px`;
            tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
        });
        
        el.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            tooltip.style.visibility = 'hidden';
        });
    });
}

// Show notification
function showNotification(type, title, message, duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas fa-${icons[type] || 'info-circle'}"></i>
        </div>
        <div class="notification-content">
            <h4 class="notification-title">${title}</h4>
            <p class="notification-message">${message}</p>
        </div>
        <button class="notification-close">&times;</button>
        <div class="notification-progress">
            <div class="notification-progress-bar"></div>
        </div>
    `;
    
    notificationContainer.appendChild(notification);
    
    // Trigger reflow to enable animation
    void notification.offsetWidth;
    
    // Show notification
    notification.classList.add('show');
    
    // Auto-remove notification after duration
    const timeout = setTimeout(() => {
        hideNotification(notification);
    }, duration);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(timeout);
        hideNotification(notification);
    });
    
    // Progress bar animation
    const progressBar = notification.querySelector('.notification-progress-bar');
    progressBar.style.animation = `progress ${duration}ms linear`;
    
    // Hover to pause
    notification.addEventListener('mouseenter', () => {
        progressBar.style.animationPlayState = 'paused';
    });
    
    notification.addEventListener('mouseleave', () => {
        progressBar.style.animationPlayState = 'running';
    });
}

// Hide notification
function hideNotification(notification) {
    notification.classList.remove('show');
    notification.classList.add('hide');
    
    // Remove from DOM after animation
    setTimeout(() => {
        notification.remove();
    }, 300);
}

// Handle search input
function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    
    // Reset to all memes if search is empty
    if (query === '') {
        allMemes = [...memes];
        currentPage = 1;
        memeContainer.innerHTML = '';
        loadMemes();
        return;
    }
    
    // Filter memes based on search query
    allMemes = memes.filter(meme => 
        meme.title.toLowerCase().includes(query) || 
        (meme.tags && meme.tags.some(tag => tag.toLowerCase().includes(query)))
    );
    
    // Reset pagination and reload memes
    currentPage = 1;
    memeContainer.innerHTML = '';
    loadMemes();
}

// Load memes into the grid
function loadMemes() {
    if (isLoading) return;
    
    isLoading = true;
    
    // Show loading state on button if it exists
    if (loadMoreBtn) {
        loadMoreBtn.disabled = true;
        loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    }
    
    // Simulate API call delay
    setTimeout(() => {
        const startIndex = (currentPage - 1) * memesPerPage;
        const endIndex = startIndex + memesPerPage;
        const memesToShow = allMemes.slice(startIndex, endIndex);
        
        // Create meme cards
        memesToShow.forEach(meme => {
            createMemeCard(meme);
        });
        
        // Update pagination
        currentPage++;
        
        // Check if we've reached the end of available memes
        if (endIndex >= allMemes.length && loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        } else if (loadMoreBtn) {
            loadMoreBtn.disabled = false;
            loadMoreBtn.innerHTML = 'Load More <i class="fas fa-arrow-down"></i>';
        }
        
        // Initialize animations for new elements
        initAnimations();
        
        isLoading = false;
        
    }, 800); // Simulate network delay
}

// Create a meme card element
function createMemeCard(meme) {
    const card = document.createElement('div');
    card.className = 'meme-card';
    card.setAttribute('data-id', meme.id);
    
    // Format numbers for display
    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num;
    };
    
    // Format timestamp
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };
    
    card.innerHTML = `
        <div class="meme-card-inner">
            <div class="meme-image">
                <img src="${meme.url}" alt="${meme.title}" loading="lazy">
                <div class="meme-overlay">
                    <div class="meme-tags">
                        ${meme.tags ? meme.tags.slice(0, 3).map(tag => 
                            `<span class="meme-tag">${tag}</span>`).join('') : ''}
                    </div>
                    <div class="meme-actions">
                        <button class="meme-btn" data-action="like" data-tooltip="Like">
                            <i class="far fa-heart"></i>
                            <span>${formatNumber(meme.likes || 0)}</span>
                        </button>
                        <button class="meme-btn" data-action="comment" data-tooltip="Comment">
                            <i class="far fa-comment"></i>
                            <span>${formatNumber(meme.comments || 0)}</span>
                        </button>
                        <button class="meme-btn" data-action="share" data-tooltip="Share">
                            <i class="fas fa-share"></i>
                            <span>Share</span>
                        </button>
                        <button class="meme-btn" data-action="save" data-tooltip="Save">
                            <i class="far fa-bookmark"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="meme-info">
                <h3 class="meme-title">${meme.title}</h3>
                <div class="meme-meta">
                    <span class="meme-views">
                        <i class="far fa-eye"></i> ${formatNumber(meme.views || 0)}
                    </span>
                    <span class="meme-date">${formatDate(meme.timestamp || new Date().toISOString())}</span>
                </div>
                <div class="meme-author">
                    <span class="author-avatar">
                        <i class="fas fa-user"></i>
                    </span>
                    <span class="author-name">${meme.author || 'Anonymous'}</span>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners
    const likeBtn = card.querySelector('[data-action="like"]');
    const commentBtn = card.querySelector('[data-action="comment"]');
    const shareBtn = card.querySelector('[data-action="share"]');
    const saveBtn = card.querySelector('[data-action="save"]');
    
    if (likeBtn) {
        likeBtn.addEventListener('click', (e) => handleLike(e, meme.id));
    }
    
    if (commentBtn) {
        commentBtn.addEventListener('click', () => openComments(meme.id));
    }
    
    if (shareBtn) {
        shareBtn.addEventListener('click', () => shareMeme(meme));
    }
    
    if (saveBtn) {
        saveBtn.addEventListener('click', (e) => handleSave(e, meme.id));
    }
    
    // Add click event to open lightbox
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.meme-btn')) {
            openLightbox(meme);
        }
    });
    
    memeContainer.appendChild(card);
}

// Handle like action
function handleLike(e, memeId) {
    e.stopPropagation();
    const likeBtn = e.currentTarget;
    const isLiked = likeBtn.classList.toggle('liked');
    
    // Update icon
    const icon = likeBtn.querySelector('i');
    icon.classList.toggle('far');
    icon.classList.toggle('fas');
    
    // Update like count
    const likeCount = likeBtn.querySelector('span');
    let count = parseInt(likeCount.textContent.replace(/[^0-9]/g, '')) || 0;
    count = isLiked ? count + 1 : Math.max(0, count - 1);
    likeCount.textContent = formatNumber(count);
    
    // Show feedback
    showNotification('success', isLiked ? 'Liked!' : 'Like removed', 
        isLiked ? 'Added to your liked memes' : 'Removed from your liked memes');
}

// Handle save action
function handleSave(e, memeId) {
    e.stopPropagation();
    const saveBtn = e.currentTarget;
    const isSaved = saveBtn.classList.toggle('saved');
    
    // Update icon
    const icon = saveBtn.querySelector('i');
    icon.classList.toggle('far');
    icon.classList.toggle('fas');
    
    // Show feedback
    showNotification('success', isSaved ? 'Saved!' : 'Removed', 
        isSaved ? 'Added to your saved memes' : 'Removed from your saved memes');
}

// Open lightbox with meme details
function openLightbox(meme) {
    // Create lightbox if it doesn't exist
    let lightbox = document.querySelector('.lightbox');
    
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        document.body.appendChild(lightbox);
    }
    
    // Format numbers for display
    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num;
    };
    
    // Format timestamp
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    
    // Lightbox content
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">
                <i class="fas fa-times"></i>
            </button>
            <div class="lightbox-image">
                <img src="${meme.url}" alt="${meme.title}">
            </div>
            <div class="lightbox-info">
                <div class="lightbox-header">
                    <h2>${meme.title}</h2>
                    <div class="lightbox-actions">
                        <button class="btn btn-icon" data-action="like" title="Like">
                            <i class="far fa-heart"></i>
                            <span>${formatNumber(meme.likes || 0)}</span>
                        </button>
                        <button class="btn btn-icon" data-action="save" title="Save">
                            <i class="far fa-bookmark"></i>
                        </button>
                        <button class="btn btn-icon" data-action="share" title="Share">
                            <i class="fas fa-share"></i>
                        </button>
                    </div>
                </div>
                
                <div class="lightbox-meta">
                    <div class="author-info">
                        <div class="author-avatar">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="author-details">
                            <span class="author-name">${meme.author || 'Anonymous'}</span>
                            <span class="post-date">${formatDate(meme.timestamp || new Date().toISOString())}</span>
                        </div>
                    </div>
                    <div class="meme-stats">
                        <div class="stat">
                            <i class="far fa-eye"></i>
                            <span>${formatNumber(meme.views || 0)} views</span>
                        </div>
                        <div class="stat">
                            <i class="far fa-comment"></i>
                            <span>${formatNumber(meme.comments || 0)} comments</span>
                        </div>
                        <div class="stat">
                            <i class="fas fa-share"></i>
                            <span>${formatNumber(meme.shares || 0)} shares</span>
                        </div>
                    </div>
                </div>
                
                ${meme.tags && meme.tags.length > 0 ? `
                <div class="lightbox-tags">
                    ${meme.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                </div>
                ` : ''}
                
                <div class="lightbox-comments">
                    <h3>Comments</h3>
                    <div class="comment-form">
                        <div class="comment-avatar">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="comment-input">
                            <input type="text" placeholder="Add a comment...">
                            <button class="btn btn-primary">Post</button>
                        </div>
                    </div>
                    <div class="comments-list">
                        <div class="comment">
                            <div class="comment-avatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="comment-content">
                                <div class="comment-header">
                                    <span class="comment-author">User123</span>
                                    <span class="comment-date">2 hours ago</span>
                                </div>
                                <p>This is a sample comment. In a real app, this would be loaded from a server.</p>
                                <div class="comment-actions">
                                    <button>Like</button>
                                    <span>5 likes</span>
                                    <button>Reply</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Show lightbox
    document.body.style.overflow = 'hidden';
    lightbox.classList.add('show');
    
    // Add event listeners
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const likeBtn = lightbox.querySelector('[data-action="like"]');
    const saveBtn = lightbox.querySelector('[data-action="save"]');
    const shareBtn = lightbox.querySelector('[data-action="share"]');
    
    // Close lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('show');
        document.body.style.overflow = '';
        
        // Remove lightbox after animation
        setTimeout(() => {
            if (lightbox && lightbox.parentNode) {
                lightbox.parentNode.removeChild(lightbox);
            }
        }, 300);
    };
    
    // Close on escape key
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', handleKeyDown);
        }
    };
    
    // Close on overlay click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    
    // Like button
    if (likeBtn) {
        likeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isLiked = likeBtn.classList.toggle('liked');
            const icon = likeBtn.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            
            // Update like count
            const likeCount = likeBtn.querySelector('span');
            let count = parseInt(likeCount.textContent.replace(/[^0-9]/g, '')) || 0;
            count = isLiked ? count + 1 : Math.max(0, count - 1);
            likeCount.textContent = formatNumber(count);
        });
    }
    
    // Save button
    if (saveBtn) {
        saveBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            saveBtn.classList.toggle('saved');
            const icon = saveBtn.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
        });
    }
    
    // Share button
    if (shareBtn) {
        shareBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            shareMeme(meme);
        });
    }
    
    // Add keyboard event listener
    document.addEventListener('keydown', handleKeyDown);
}

// Share meme
function shareMeme(meme) {
    if (navigator.share) {
        navigator.share({
            title: meme.title,
            text: `Check out this meme: ${meme.title}`,
            url: meme.url,
        })
        .then(() => showNotification('success', 'Shared!', 'Meme shared successfully'))
        .catch(err => console.error('Error sharing:', err));
    } else {
        // Fallback for browsers that don't support Web Share API
        const shareUrl = `https://example.com/share?url=${encodeURIComponent(meme.url)}&title=${encodeURIComponent(meme.title)}`;
        window.open(shareUrl, '_blank');
        showNotification('info', 'Share', 'Share dialog opened in a new window');
    }
}

// Open comments section
function openComments(memeId) {
    // In a real app, this would load comments from a server
    // For now, we'll just open the lightbox which has a comments section
    const meme = memes.find(m => m.id === memeId);
    if (meme) {
        openLightbox(meme);
    }
}

// Load more memes when button is clicked
function loadMoreMemes() {
    if (!isLoading) {
        loadMemes();
    }
}

// Initialize animations with GSAP
function initAnimations() {
    // Animate meme cards on scroll
    gsap.utils.toArray('.meme-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });
    
    // Animate hero section
    gsap.from('.hero-content', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-image', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out'
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if GSAP is loaded
    if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
        gsap.registerPlugin(ScrollTrigger);
    }
    
    // Initialize the app
    init();
    
    // Initialize tooltips
    initTooltips();
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reinitialize tooltips on resize
        initTooltips();
    }, 250);
});

// Handle scroll events for header
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scrolling down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scrolling up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Initialize service worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Helper function to format numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Initialize cursor effects
function initCursorEffects() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const interactiveElements = document.querySelectorAll('a, button, .meme-card');
    
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }
        if (cursorFollower) {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }
    });
    
    // Add hover effects for interactive elements
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursor) cursor.classList.add('cursor-hover');
            if (cursorFollower) cursorFollower.classList.add('cursor-follower-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            if (cursor) cursor.classList.remove('cursor-hover');
            if (cursorFollower) cursorFollower.classList.remove('cursor-follower-hover');
        });
    });
}

// Loading Screen Animation
function initLoadingScreen() {
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        
        // Show main content with fade in
        mainContent.style.opacity = '1';
        
        // Initialize animations after loading
        initAnimations();
        
        // Load initial memes
        loadMemes();
        
        // Initialize particles
        createParticles();
        
    }, 3000); // 3 second loading screen
}

// Create floating particles
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);
    
    const particleCount = 20;
    const colors = ['#00f0ff', '#ff00e6', '#ffcc00', '#00ff88'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 3px and 8px
        const size = Math.random() * 5 + 3;
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random animation duration between 10s and 30s
        const duration = Math.random() * 20 + 10;
        
        // Random delay up to 5s
        const delay = Math.random() * 5;
        
        // Random color
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = color;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `-${delay}s`;
        
        // Add to container
        particlesContainer.appendChild(particle);
    }
}

// Initialize animations with GSAP
function initAnimations() {
    // Animate header elements
    gsap.from('.glitch', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5
    });
    
    gsap.from('.subtitle', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.8
    });
    
    // Scroll down button animation
    gsap.to('.scroll-down', {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'sine.inOut'
    });
    
    // Scroll to content on arrow click
    document.querySelector('.scroll-down').addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
    
    // Animate meme cards on scroll
    gsap.utils.toArray('.meme-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power2.out'
        });
    });
}

// Load memes function
function loadMemes() {
    if (isAnimating) return;
    isAnimating = true;
    
    const endIndex = Math.min(currentIndex + memesPerLoad, memeData.length);
    
    // Create a document fragment to improve performance
    const fragment = document.createDocumentFragment();
    
    for (let i = currentIndex; i < endIndex; i++) {
        const meme = memeData[i];
        if (!meme) continue;
        
        const memeCard = document.createElement('div');
        memeCard.className = 'meme-card fade-in-up';
        
        // Create image element with loading="lazy" for better performance
        const img = document.createElement('img');
        img.src = meme.url;
        img.alt = meme.title;
        img.loading = 'lazy';
        img.className = 'meme-img';
        
        const title = document.createElement('div');
        title.className = 'meme-title';
        title.textContent = meme.title;
        
        memeCard.appendChild(img);
        memeCard.appendChild(title);
        
        // Add hover effect with GSAP
        memeCard.addEventListener('mouseenter', () => {
            gsap.to(memeCard, {
                scale: 1.02,
                y: -5,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        memeCard.addEventListener('mouseleave', () => {
            gsap.to(memeCard, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        // Add click effect
        memeCard.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create a lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${meme.url}" alt="${meme.title}">
                    <div class="lightbox-close">&times;</div>
                </div>
            `;
            
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            // Close lightbox
            const closeBtn = lightbox.querySelector('.lightbox-close');
            closeBtn.addEventListener('click', () => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
            });
            
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = '';
                }
            });
            
            // Add lightbox animation
            gsap.from(lightbox, {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            gsap.from(lightbox.querySelector('.lightbox-content'), {
                y: 30,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.out',
                delay: 0.1
            });
        });
        
        fragment.appendChild(memeCard);
    }
    
    // Append all cards at once
    memeContainer.appendChild(fragment);
    
    currentIndex = endIndex;
    
    // Hide load more button if all memes are loaded
    if (currentIndex >= memeData.length) {
        loadMoreBtn.style.display = 'none';
    }
    
    // Re-initialize animations for new elements
    initAnimations();
    
    isAnimating = false;
}

// Load more button click event with animation
loadMoreBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Add a nice click animation
    gsap.to(loadMoreBtn, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: loadMemes
    });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initLoadingScreen();
    
    // Add smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll reveal effect for elements
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });
    
    // Add parallax effect to header
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const header = document.querySelector('header');
        
        if (header) {
            header.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    });
});
