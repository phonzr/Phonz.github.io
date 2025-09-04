// Meme data (you can replace with API calls to Imgur/Reddit/other meme APIs)
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
    }
];

// DOM Elements
const memeContainer = document.getElementById('memeContainer');
const loadMoreBtn = document.getElementById('loadMore');

// Variables
let currentIndex = 0;
const memesPerLoad = 6;

// Load initial memes
function loadMemes() {
    const endIndex = Math.min(currentIndex + memesPerLoad, memeData.length);
    
    for (let i = currentIndex; i < endIndex; i++) {
        const meme = memeData[i];
        if (!meme) continue;
        
        const memeCard = document.createElement('div');
        memeCard.className = 'meme-card';
        memeCard.innerHTML = `
            <img src="${meme.url}" alt="${meme.title}" class="meme-img" loading="lazy">
            <div class="meme-title">${meme.title}</div>
        `;
        
        // Add click effect
        memeCard.addEventListener('click', () => {
            memeCard.classList.add('clicked');
            setTimeout(() => {
                memeCard.classList.remove('clicked');
            }, 200);
            
            // Optional: Open image in new tab on click
            window.open(meme.url, '_blank');
        });
        
        memeContainer.appendChild(memeCard);
    }
    
    currentIndex = endIndex;
    
    // Hide load more button if all memes are loaded
    if (currentIndex >= memeData.length) {
        loadMoreBtn.style.display = 'none';
    }
}

// Load more button click event
loadMoreBtn.addEventListener('click', loadMemes);

// Add some fun hover effects
const cards = document.querySelectorAll('.meme-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// Add confetti effect when page loads
setTimeout(() => {
    const colors = ['#ff6b6b', '#4ecdc4', '#ffd166', '#a5ffd6', '#ff9f1c'];
    
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.top = '0';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.opacity = '0';
        confetti.style.pointerEvents = 'none';
        confetti.style.transform = 'scale(0)';
        confetti.style.transition = 'transform 0.5s ease-out, opacity 1s ease-out, top 2s ease-in-out';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.style.opacity = '0.8';
            confetti.style.transform = 'scale(1)';
        }, 10);
        
        setTimeout(() => {
            confetti.style.top = '100vh';
            confetti.style.opacity = '0';
            confetti.style.transform = 'scale(0.5)';
            
            // Remove confetti after animation
            setTimeout(() => {
                document.body.removeChild(confetti);
            }, 2000);
        }, 100);
    }
    
    // Create initial confetti
    for (let i = 0; i < 50; i++) {
        setTimeout(createConfetti, i * 50);
    }
}, 3000); // Wait for intro animation to finish

// Load initial set of memes
loadMemes();
