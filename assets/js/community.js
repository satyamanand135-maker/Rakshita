// Simple Reddit-Style Community System for Rakshita
document.addEventListener('DOMContentLoaded', function() {
    initializeCommunity();
});

// Global variables for community
let communityPosts = [];
let selectedRating = 0;

// Utility Functions (needed by community system)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add notification styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 3000;
                max-width: 400px;
                padding: 1rem;
                border-radius: 10px;
                box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
                animation: slideInRight 0.3s ease;
            }
            
            .notification.success {
                background: #10b981;
                color: white;
            }
            
            .notification.error {
                background: #ef4444;
                color: white;
            }
            
            .notification.info {
                background: #3b82f6;
                color: white;
            }
            
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 1rem;
            }
            
            .notification-content button {
                background: none;
                border: none;
                color: inherit;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Get real address from coordinates using multiple services
async function getRealAddress(latitude, longitude) {
    console.log(`🔍 Getting address for: ${latitude}, ${longitude}`);
    
    // Using more reliable geocoding services
    const services = [
        {
            name: 'OpenCage',
            url: `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=demo&language=en&pretty=1`,
            parser: (data) => {
                if (data && data.results && data.results.length > 0) {
                    return data.results[0].formatted || null;
                }
                return null;
            }
        },
        {
            name: 'LocationIQ',
            url: `https://us1.locationiq.com/v1/reverse.php?key=demo&lat=${latitude}&lon=${longitude}&format=json`,
            parser: (data) => {
                if (data && data.display_name) {
                    return data.display_name;
                }
                return null;
            }
        },
        {
            name: 'BigDataCloud',
            url: `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
            parser: (data) => {
                if (data && (data.locality || data.city || data.countryName)) {
                    const parts = [];
                    if (data.locality) parts.push(data.locality);
                    if (data.city && data.city !== data.locality) parts.push(data.city);
                    if (data.principalSubdivision) parts.push(data.principalSubdivision);
                    if (data.countryName) parts.push(data.countryName);
                    return parts.length > 0 ? parts.join(', ') : null;
                }
                return null;
            }
        }
    ];
    
    for (const service of services) {
        try {
            console.log(`📡 Trying ${service.name}...`);
            
            // Add timeout to prevent hanging
            const controller = new AbortController();
            const timeoutId = setTimeout(() => {
                console.log(`⏰ ${service.name} timeout after 10 seconds`);
                controller.abort();
            }, 10000);
            
            const response = await fetch(service.url, {
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Rakshita-Community/2.0'
                }
            });
            
            clearTimeout(timeoutId);
            
            if (response.ok) {
                const data = await response.json();
                const address = service.parser(data);
                if (address) {
                    console.log(`✅ ${service.name} success: ${address}`);
                    return address;
                }
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log(`⏰ ${service.name} timed out`);
            } else {
                console.log(`❌ ${service.name} failed: ${error.message}`);
            }
            continue;
        }
    }
    
    // If all services fail, return coordinates
    throw new Error('Address lookup failed - all services unavailable');
}

function initializeCommunity() {
    console.log('Initializing simple community system...');
    
    // Setup tab switching
    setupTabs();
    
    // Setup star rating
    setupStarRating();
    
    // Setup form submission
    setupFormSubmission();
    
    // Setup location button
    setupLocationButton();
    
    // Load initial posts
    loadInitialPosts();
    
    // Setup filters
    setupFilters();
}

// Tab Management
function setupTabs() {
    const tabs = document.querySelectorAll('.community-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            switchTab(targetTab);
        });
    });
}

function switchTab(tabName) {
    // Remove active class from all tabs and contents
    document.querySelectorAll('.community-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Add active class to selected tab and content
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
    
    // Load content based on tab
    if (tabName === 'feed') {
        loadPosts();
    } else if (tabName === 'browse') {
        loadBrowseReviews();
    }
}

// Star Rating System
function setupStarRating() {
    const stars = document.querySelectorAll('#star-rating .star');
    const ratingText = document.getElementById('rating-text');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.dataset.rating);
            updateStarDisplay();
            updateRatingText();
        });
        
        star.addEventListener('mouseover', function() {
            const hoverRating = parseInt(this.dataset.rating);
            highlightStars(hoverRating);
        });
    });
    
    document.getElementById('star-rating').addEventListener('mouseleave', function() {
        updateStarDisplay();
    });
}

function highlightStars(rating) {
    const stars = document.querySelectorAll('#star-rating .star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.style.color = '#fbbf24';
        } else {
            star.style.color = '#d1d5db';
        }
    });
}

function updateStarDisplay() {
    highlightStars(selectedRating);
}

function updateRatingText() {
    const ratingText = document.getElementById('rating-text');
    const descriptions = {
        1: '⭐ Very Unsafe',
        2: '⭐⭐ Unsafe', 
        3: '⭐⭐⭐ Moderate',
        4: '⭐⭐⭐⭐ Safe',
        5: '⭐⭐⭐⭐⭐ Very Safe'
    };
    ratingText.textContent = descriptions[selectedRating] || 'Click to rate';
}

// Form Submission
function setupFormSubmission() {
    const form = document.getElementById('post-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        submitPost();
    });
}

function submitPost() {
    const title = document.getElementById('post-title').value.trim();
    const location = document.getElementById('post-location').value.trim();
    const category = document.getElementById('post-category').value;
    const content = document.getElementById('post-content').value.trim();
    const anonymous = document.getElementById('anonymous-post').checked;
    
    // Validation
    if (!title || !content) {
        showNotification('Please fill in title and content', 'error');
        return;
    }
    
    if (selectedRating === 0) {
        showNotification('Please select a safety rating', 'error');
        return;
    }
    
    // Create post object
    const post = {
        id: Date.now().toString(),
        title: title,
        location: location,
        category: category,
        content: content,
        rating: selectedRating,
        author: anonymous ? 'Anonymous' : (window.currentUser?.name || 'Anonymous'),
        timestamp: new Date().toISOString(),
        upvotes: 0,
        downvotes: 0,
        comments: []
    };
    
    // Add to posts array
    communityPosts.unshift(post);
    
    // Save to storage
    savePosts();
    
    // Clear form
    clearForm();
    
    // Show success message
    showNotification('Post shared successfully! 🎉', 'success');
    
    // Switch to feed tab
    switchTab('feed');
}

function clearForm() {
    document.getElementById('post-form').reset();
    selectedRating = 0;
    updateStarDisplay();
    updateRatingText();
}

// Location Button
function setupLocationButton() {
    const locationBtn = document.getElementById('get-location');
    locationBtn.addEventListener('click', function() {
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        this.disabled = true;
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const address = await getRealAddress(position.coords.latitude, position.coords.longitude);
                        document.getElementById('post-location').value = address;
                        showNotification('Location added! 📍', 'success');
                    } catch (error) {
                        const coords = `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`;
                        document.getElementById('post-location').value = coords;
                        showNotification('Coordinates added 📍', 'info');
                    }
                    this.innerHTML = '<i class="fas fa-crosshairs"></i>';
                    this.disabled = false;
                },
                (error) => {
                    showNotification('Could not get location', 'error');
                    this.innerHTML = '<i class="fas fa-crosshairs"></i>';
                    this.disabled = false;
                }
            );
        } else {
            showNotification('Geolocation not supported', 'error');
            this.innerHTML = '<i class="fas fa-crosshairs"></i>';
            this.disabled = false;
        }
    });
}

// Load Posts
function loadInitialPosts() {
    // Load from storage or create demo posts
    const savedPosts = localStorage.getItem('rakshita_community_posts');
    if (savedPosts) {
        communityPosts = JSON.parse(savedPosts);
    } else {
        communityPosts = createDemoPosts();
        savePosts();
    }
    
    loadPosts();
}

function createDemoPosts() {
    return [
        {
            id: '1',
            title: 'Very safe area near India Gate Metro',
            location: 'India Gate, New Delhi',
            category: 'safe',
            content: 'Visited this area yesterday evening with my family. Excellent lighting, lots of police presence, and many families around. The metro station is well-connected and safe. Highly recommend for tourists.',
            rating: 5,
            author: 'Sarah Chen',
            timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
            upvotes: 24,
            downvotes: 1,
            comments: []
        },
        {
            id: '2',
            title: 'Avoid Karol Bagh market after 9 PM',
            location: 'Karol Bagh Market, New Delhi',
            category: 'warning',
            content: 'Went shopping here last night and felt unsafe. Poor lighting in side streets, limited police presence after 8 PM. Some areas have construction work making it darker. Better to visit during daytime.',
            rating: 2,
            author: 'Anonymous',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
            upvotes: 18,
            downvotes: 3,
            comments: []
        },
        {
            id: '3',
            title: 'Great coffee shop with safe environment',
            location: 'Khan Market, New Delhi',
            category: 'tip',
            content: 'Found this amazing coffee shop in Khan Market. Very safe area, well-lit, good WiFi for digital nomads. Open until 10 PM. Perfect for solo travelers looking for a safe place to work.',
            rating: 4,
            author: 'Raj Patel',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
            upvotes: 15,
            downvotes: 0,
            comments: []
        }
    ];
}

function loadPosts() {
    const container = document.getElementById('posts-container');
    if (!container) return;
    
    if (communityPosts.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-comments"></i>
                <h4>No posts yet</h4>
                <p>Be the first to share a safety experience!</p>
                <button class="btn-primary" onclick="switchTab('write')">
                    <i class="fas fa-plus"></i> Write First Post
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = communityPosts.map(post => createPostCard(post)).join('');
}

function createPostCard(post) {
    const timeAgo = getTimeAgo(post.timestamp);
    const categoryEmoji = getCategoryEmoji(post.category);
    const stars = '★'.repeat(post.rating) + '☆'.repeat(5 - post.rating);
    
    return `
        <div class="post-card" data-post-id="${post.id}">
            <div class="post-header">
                <div class="post-category ${post.category}">
                    ${categoryEmoji} ${getCategoryName(post.category)}
                </div>
                <div class="post-rating">
                    <span class="stars">${stars}</span>
                    <span class="rating-num">${post.rating}/5</span>
                </div>
            </div>
            
            <h3 class="post-title">${post.title}</h3>
            
            ${post.location ? `<div class="post-location">📍 ${post.location}</div>` : ''}
            
            <div class="post-content">${post.content}</div>
            
            <div class="post-footer">
                <div class="post-meta">
                    <span class="post-author">by ${post.author}</span>
                    <span class="post-time">${timeAgo}</span>
                </div>
                
                <div class="post-actions">
                    <button class="vote-btn upvote" onclick="votePost('${post.id}', 'up')">
                        <i class="fas fa-arrow-up"></i>
                        <span>${post.upvotes}</span>
                    </button>
                    <button class="vote-btn downvote" onclick="votePost('${post.id}', 'down')">
                        <i class="fas fa-arrow-down"></i>
                        <span>${post.downvotes}</span>
                    </button>
                    <button class="action-btn" onclick="sharePost('${post.id}')">
                        <i class="fas fa-share"></i>
                        Share
                    </button>
                </div>
            </div>
        </div>
    `;
}

function getCategoryEmoji(category) {
    const emojis = {
        safe: '✅',
        warning: '⚠️',
        tip: '💡',
        emergency: '🚨',
        transport: '🚌',
        nightlife: '🌙'
    };
    return emojis[category] || '📝';
}

function getCategoryName(category) {
    const names = {
        safe: 'Safe Area',
        warning: 'Safety Warning',
        tip: 'Safety Tip',
        emergency: 'Emergency Report',
        transport: 'Transport Safety',
        nightlife: 'Nighttime Safety'
    };
    return names[category] || 'General';
}

// Voting System
function votePost(postId, voteType) {
    const post = communityPosts.find(p => p.id === postId);
    if (!post) return;
    
    if (voteType === 'up') {
        post.upvotes++;
    } else {
        post.downvotes++;
    }
    
    savePosts();
    loadPosts();
    
    showNotification('Vote recorded! 👍', 'success');
}

function sharePost(postId) {
    const post = communityPosts.find(p => p.id === postId);
    if (!post) return;
    
    if (navigator.share) {
        navigator.share({
            title: post.title,
            text: post.content,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(`${post.title}\n\n${post.content}\n\nShared from Rakshita Safety App`).then(() => {
            showNotification('Post copied to clipboard! 📋', 'success');
        });
    }
}

// Browse Reviews
function loadBrowseReviews() {
    const reviewsList = document.getElementById('reviews-list');
    if (!reviewsList) return;
    
    const filteredPosts = filterPosts();
    
    if (filteredPosts.length === 0) {
        reviewsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h4>No reviews found</h4>
                <p>Try adjusting your filters or write the first review!</p>
            </div>
        `;
        return;
    }
    
    reviewsList.innerHTML = filteredPosts.map(post => createReviewCard(post)).join('');
}

function createReviewCard(post) {
    const timeAgo = getTimeAgo(post.timestamp);
    const categoryEmoji = getCategoryEmoji(post.category);
    const stars = '★'.repeat(post.rating) + '☆'.repeat(5 - post.rating);
    
    return `
        <div class="review-card">
            <div class="review-header">
                <div class="review-category ${post.category}">
                    ${categoryEmoji} ${getCategoryName(post.category)}
                </div>
                <div class="review-rating">
                    <span class="stars">${stars}</span>
                </div>
            </div>
            
            <h4 class="review-title">${post.title}</h4>
            
            ${post.location ? `<div class="review-location">📍 ${post.location}</div>` : ''}
            
            <div class="review-content">${post.content}</div>
            
            <div class="review-footer">
                <div class="review-meta">
                    <span>by ${post.author}</span>
                    <span>${timeAgo}</span>
                </div>
                <div class="review-votes">
                    ${post.upvotes} helpful
                </div>
            </div>
        </div>
    `;
}

// Filters
function setupFilters() {
    const categoryFilter = document.getElementById('filter-category');
    const ratingFilter = document.getElementById('filter-rating');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', loadBrowseReviews);
    }
    
    if (ratingFilter) {
        ratingFilter.addEventListener('change', loadBrowseReviews);
    }
}

function filterPosts() {
    const categoryFilter = document.getElementById('filter-category')?.value;
    const ratingFilter = document.getElementById('filter-rating')?.value;
    
    let filtered = [...communityPosts];
    
    if (categoryFilter) {
        filtered = filtered.filter(post => post.category === categoryFilter);
    }
    
    if (ratingFilter) {
        const minRating = parseInt(ratingFilter);
        filtered = filtered.filter(post => post.rating >= minRating);
    }
    
    return filtered;
}

// Storage
function savePosts() {
    localStorage.setItem('rakshita_community_posts', JSON.stringify(communityPosts));
}

// Utility Functions
function getTimeAgo(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now - time) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

// Global functions
window.switchTab = switchTab;
window.clearForm = clearForm;
window.votePost = votePost;
window.sharePost = sharePost;

console.log('✅ Simple Community System loaded successfully!');