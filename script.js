const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if(menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const icon = menuToggle.querySelector('i');
        if(navMenu.classList.contains('open')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = document.querySelector('.menu-toggle i');
        if(icon) icon.className = 'fas fa-bars';
    });
});

const videoData = {
    latest: [
        { title: "AI Superbike Full Build Process", views: "1.2M views", time: "2 weeks ago", duration: "12:45", img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=350" },
        { title: "Capsule EV Drive & Test Run", views: "980K views", time: "3 weeks ago", duration: "10:32", img: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=350" }
    ],
    popular: [
        { title: "Building a Functional Hubless Bicycle from Scratch!", views: "5.4M views", time: "1 year ago", duration: "18:14", img: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=350" },
        { title: "Transforming Old Junk into an Offroad Delivery Droid", views: "3.1M views", time: "8 months ago", duration: "15:20", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=350" }
    ],
    playlist: [
        { title: "Robotics Systems Full Engineering Playlists", views: "12 videos", time: "Updated Yesterday", duration: "PLAYLIST", img: "https://images.unsplash.com/photo-1608962714026-af9a77909d38?auto=format&fit=crop&q=80&w=350" },
        { title: "Electric Vehicle Concepts Complete Engineering Log", views: "8 videos", time: "Updated 2 weeks ago", duration: "PLAYLIST", img: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=350" }
    ],
    shorts: [
        { title: "Testing the Hubless wheel load capacity!", views: "12M views", time: "5 days ago", duration: "0:58", img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=350" },
        { title: "When your robot learns to balance itself 😂", views: "8.4M views", time: "1 month ago", duration: "0:42", img: "https://images.unsplash.com/photo-1608962714026-af9a77909d38?auto=format&fit=crop&q=80&w=350" }
    ]
};

function renderVideos(category) {
    const grid = document.getElementById('videoGrid');
    if(!grid) return;
    grid.innerHTML = ''; 
    
    videoData[category].forEach(vid => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = `
            <div class="video-thumb">
                <img src="${vid.img}" alt="${vid.title}">
                <div class="duration-badge">${vid.duration}</div>
            </div>
            <div class="video-details">
                <h4>${vid.title}</h4>
                <div class="video-meta">${vid.views} &bull; ${vid.time}</div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function switchTab(category) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.getAttribute('onclick').includes(category)) {
            btn.classList.add('active');
        }
    });
    renderVideos(category);
}

document.addEventListener('DOMContentLoaded', () => {
    renderVideos('latest');
});

/* --- MEDIA SECTION DATA & DYNAMIC CARDS RENDER --- */
const mediaData = [
    { name: "संदेश", color: "#ffffff", img: "zee-logo.png" },
    { name: "राजस्थान पत्रिका", color: "#ffffff", icon: "fa-pen-fancy" },
    { name: "दिव्य भास्कर", color: "#ffffff", icon: "fa-star" },
    { name: "ZEE NEWS", color: "#ffcc00", img: "zee-logo.png" },
    { name: "ABP NEWS", color: "#ffffff", icon: "fa-broadcast" },
    { name: "आज तक", color: "#ff0000", icon: "fa-clock" }
];

function renderMediaCards() {
    const track = document.getElementById('mediaTrack');
    track.innerHTML = ''; // Clear existing
    
    // Infinite loop ke liye data ko double karna padta hai (Seamless scroll)
    const doubleData = [...mediaData, ...mediaData];
    
    doubleData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'media-card';
        
        // Yahan aap placeholder icon ki jagah apna <img> daal sakte hain
        card.innerHTML = `
            <div class="media-img-wrap">
                <!-- Replace icon with your actual logo <img src="logo.png"> -->
                <img src="${item.img}" alt="${item.name}">
            </div>
            <div class="media-name">${item.name}</div>
        `;
        track.appendChild(card);
    });
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
    renderMediaCards();
});

/* --- VIDEO POPUP LOGIC (Play Buttons) --- */
const modal = document.getElementById('videoModal');
const iframe = document.getElementById('videoIframe');
const closeBtn = document.querySelector('.close-btn');
const playBtns = document.querySelectorAll('.play-overlay'); // Saare play buttons select honge

// Click karne par popup kholna
playBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation(); // Form submit ya page refresh hone se rokta hai
        const videoId = this.getAttribute('data-video-id');
        if(videoId) {
            // YouTube Embed URL mein autoplay add kar diya
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
            modal.style.display = 'flex'; // Popup show kar do
        }
    });
});

// Popup Band karne ka function
function closeModal() {
    iframe.src = ''; // 👈 Zaroori hai! Video completely stop ho jati hai
    modal.style.display = 'none';
}

// Close Button ('X') par click
closeBtn.addEventListener('click', closeModal);

// Popup ke bahar (background) click karne par band ho
window.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

// Keyboard se 'ESC' dabane par band ho
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
    }
});