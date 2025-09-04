// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Sample video data (replace with your actual video data)
const videos = [
    {
        id: 1,
        title: 'Amazing Nature Scenes',
        thumbnail: 'https://source.unsplash.com/random/600x400/?nature,water',
        views: '1.2M',
        duration: '4:32'
    },
    {
        id: 2,
        title: 'City Time Lapse',
        thumbnail: 'https://source.unsplash.com/random/600x400/?city,night',
        views: '856K',
        duration: '3:15'
    },
    {
        id: 3,
        title: 'Mountain Adventure',
        thumbnail: 'https://source.unsplash.com/random/600x400/?mountain',
        views: '2.1M',
        duration: '5:47'
    },
    {
        id: 4,
        title: 'Ocean Waves',
        thumbnail: 'https://source.unsplash.com/random/600x400/?ocean,beach',
        views: '1.5M',
        duration: '3:52'
    },
    {
        id: 5,
        title: 'Wildlife Documentary',
        thumbnail: 'https://source.unsplash.com/random/600x400/?wildlife',
        views: '3.7M',
        duration: '8:23'
    },
    {
        id: 6,
        title: 'Aerial Drone Footage',
        thumbnail: 'https://source.unsplash.com/random/600x400/?drone,view',
        views: '1.9M',
        duration: '4:15'
    }
];

// Load videos
const videoContainer = document.getElementById('videoContainer');
const loadMoreBtn = document.getElementById('loadMore');
let currentPage = 1;
const videosPerPage = 6;

const displayVideos = (page) => {
    const start = (page - 1) * videosPerPage;
    const end = start + videosPerPage;
    const videosToShow = videos.slice(0, end);
    
    videoContainer.innerHTML = videosToShow.map(video => `
        <div class="video-card animate-on-scroll">
            <div class="video-thumbnail">
                <img src="${video.thumbnail}" alt="${video.title}">
                <div class="play-button">
                    <i class="fas fa-play"></i>
                </div>
                <span class="duration">${video.duration}</span>
            </div>
            <div class="video-info">
                <h3>${video.title}</h3>
                <div class="video-meta">
                    <span><i class="far fa-eye"></i> ${video.views}</span>
                    <span><i class="far fa-clock"></i> ${video.duration}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    if (end >= videos.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
};

// Load more videos
loadMoreBtn.addEventListener('click', () => {
    currentPage++;
    displayVideos(currentPage);
});

// Initial load
displayVideos(currentPage);

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Add animation to elements when they come into view
const animateElements = document.querySelectorAll('.animate-text');
const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

animateOnScrollElements.forEach(element => {
    observer.observe(element);
});