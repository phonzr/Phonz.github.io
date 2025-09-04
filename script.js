// Meme data with more variety
const memeData = [
    {
        id: 1,
        title: "Distracted Boyfriend",
        url: "https://i.imgflip.com/1bgw.jpg"
    },
    {
        id: 2,
        title: "Two Buttons",
        url: "https://i.imgflip.com/1g8my4.jpg"
    },
    {
        id: 3,
        title: "Drake Hotline Bling",
        url: "https://i.imgflip.com/30b1gx.jpg"
    },
    {
        id: 4,
        title: "Change My Mind",
        url: "https://i.imgflip.com/24y43o.jpg"
    },
    {
        id: 5,
        title: "Batman Slapping Robin",
        url: "https://i.imgflip.com/9ehk.jpg"
    },
    {
        id: 6,
        title: "Woman Yelling at Cat",
        url: "https://i.imgflip.com/2hgfw.jpg"
    },
    {
        id: 7,
        title: "Waiting Skeleton",
        url: "https://i.imgflip.com/2fm6x.jpg"
    },
    {
        id: 8,
        title: "Expanding Brain",
        url: "https://i.imgflip.com/1jwh0h.jpg"
    },
    {
        id: 9,
        title: "Surprised Pikachu",
        url: "https://i.imgflip.com/2kbn1e.jpg"
    },
    {
        id: 10,
        title: "Is This A Pigeon",
        url: "https://i.imgflip.com/1o00in.jpg"
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
const mainContent = document.querySelector('.main-content');
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

// Variables
let currentIndex = 0;
const memesPerLoad = 4;
let isAnimating = false;

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
function initCursor() {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        gsap.to(cursorFollower, {
            left: e.clientX,
            top: e.clientY,
            duration: 0.5,
            ease: 'power1.out'
        });
    });

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .meme-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorFollower.classList.add('cursor-follower-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorFollower.classList.remove('cursor-follower-hover');
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
